--[[
Copyright(c) 2008-2014 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  login.lua
Details :  Controller for login webpage. No authentication for running this script, so be cautious
Author  :  Ye Qianchuan <yeqianchuan@tp-link.net>
Version :  1.0.0
Date    :  28 Apr, 2014
]]--

module("luci.controller.login", package.seeall)

local ctl = require "luci.model.controller"
local nixio = require "nixio"
local fs = require "nixio.fs"
local sys = require "luci.sys"
local util = require "luci.util"
local pwdrec = require "luci.model.passwd_recovery"
local dbg = require "luci.tools.debug"
local _lock
local ATTEMPTS_LOCKFILE = "/var/run/luci-attempts.lock"
local ATTEMPTS_FILE = "/tmp/luci-attempts"
local ATTEMPTS_INTERVAL = 2 * 60 * 60
local ATTEMPTS_MAX = 10
local accmgnt   = require "luci.model.accountmgnt"
local asycrypto = require("luci.model.asycrypto").Crypto("rsa")
local uci = require "luci.model.uci"
local uci_r = uci.cursor()
local service = require "luci.service"
local logm  = require "luci.model.log"
local AUTO_UPDATE_LOCKFILE = "/tmp/auto_update_lock.lua"

local CLOUD_SETUP_TM_HOMECARE = "/usr/sbin/cloud_setupTMHomecare"

--syslog define
local PROJ_LOG_ID_REMOTE_MN=282
--MSG(REMOTE_MN_LOGIN, 55, INF, "remote client ip %1 log in.")
local REMOTE_MN_LOGIN=55
  
local function lock(w)
    _lock = nixio.open(ATTEMPTS_LOCKFILE, "w", 600)
    _lock:flock(w and "ex" or "sh")
end

local function unlock()
    _lock:close()
    _lock = nil
end

local function read_attempts()
    if not fs.access(ATTEMPTS_FILE, "r") then
        return {}
    end

    lock()
    local blob = fs.readfile(ATTEMPTS_FILE)
    unlock()

    local func = loadstring(blob)
    setfenv(func, {})
    local attempts = func()
    assert(type(attempts) == "table")
    return attempts
end

local function write_attempts(attempts)
    lock(true)
    local f = nixio.open(ATTEMPTS_FILE, "w", 600)
    f:writeall(util.get_bytecode(attempts))
    f:close()
    unlock()
end

local function reap_attempts(attempts)
    for k, v in pairs(attempts) do
        if v.ltime + ATTEMPTS_INTERVAL < sys.uptime() then
            attempts[k] = nil
        end
    end
end

function login(http_form)
    local data = {}
    local log  = logm.Log(PROJ_LOG_ID_REMOTE_MN)

    local sauth = require "luci.sauth"
    local sys = require "luci.sys"
    local ctypes = require "luci.model.checktypes"

    local user = http_form["username"] or "admin"
    local pass = http_form["password"]
    local confirm = http_form["confirm"] or "false"

    local ipaddr = sys.getenv("REMOTE_ADDR")

    local macaddr
    local remote = not ctypes.check_ip_in_lan(ipaddr)

    local cm = require "luci.model.client_mgmt"
    if not remote then
        macaddr = cm.get_mac_by_ip(ipaddr)
        assert(macaddr, "lan mac is nil!")
    end
    local addr = remote and ipaddr or macaddr

	if fs.access(AUTO_UPDATE_LOCKFILE, "r") then
		return false, "auto upgrading", {}
	end

    local attempts = read_attempts()
    reap_attempts(attempts)
    local att = attempts[addr] or {attempts = 0}
    if att.attempts >= ATTEMPTS_MAX then
        data = {}
        data.failureCount = att.attempts
        data.attemptsAllowed = ATTEMPTS_MAX - att.attempts
        return false, "exceeded max attempts", data
    end

    local acc_check = require("luci.model.accountmgnt").check
    local r,e = acc_check(user, pass)
    if r then
        attempts[addr] = nil
        write_attempts(attempts)
    else
        att.attempts = att.attempts + 1
        att.ltime = sys.uptime()
        attempts[addr] = att
        write_attempts(attempts)
		data = {}
		data.failureCount = att.attempts
		data.attemptsAllowed = ATTEMPTS_MAX - att.attempts
		data.errorcode = e
        return false, "login failed", data
    end

    local allow, sid, sdat = sauth.limit(addr, remote)
    if not allow then
        data.logined_user = sdat.user
        data.logined_remote = sdat.remote
        if sdat.remote then
            data.logined_ip = sdat.addr
        else
            data.logined_mac = sdat.addr
            local client = cm.get_client_by("mac", data.logined_mac)
            if client then
                data.logined_ip = client.ip
                data.logined_host = client.hostname
            end
        end
		if confirm == "false" then
			return false, "user conflict", {}
		end
    end

    local token = sys.uniqueid(16)
    if sid then
        sauth.kill(sid)
    end

    local http = require "luci.http"
    local hash = service.get_user_hash()
    local aes = http.get_aeskey()
    local seqnum = http.get_seqnum()
    sid = sys.uniqueid(16)
    sauth.write(sid, {
                    addr = addr,
                    remote = remote,
                    user = user,
                    token = token,
                    secret = sys.uniqueid(16),
                    hash = hash,
                    aeskey = aes and aes.key or nil,
                    aesiv = aes and aes.iv or nil,
                    seqnum = seqnum
    })

    local dl = require "luci.controller.domain_login"
    dl.tips_cancel()

    http.header("Set-Cookie", "sysauth=" .. sid
                    .. ";path=" .. sys.getenv("SCRIPT_NAME") or "")
    data.stok = token

	local filename = "/tmp/applogin_flag"
	if nixio.fs.access(filename) then
		if confirm == "true" then
			kickoff_app()
			sys.call("rm -f /tmp/applogin_flag")
		else
			return false, "user conflict", {}
		end
	end

    local remind_later = uci_r:get("cloud_config", "new_firmware", "remind_later")
    local login_count = uci_r:get("cloud_config", "new_firmware", "login_count") or "1"
    local upgrade_type = uci_r:get("cloud_config", "upgrade_info", "type") or "0"

    if remind_later == "1" and upgrade_type == "1" then
        login_count = tonumber(login_count) + 1
        uci_r:set("cloud_config", "new_firmware", "login_count", tostring(login_count))
        uci_r:commit("cloud_config")
    end

    if remote then
        log(REMOTE_MN_LOGIN, ipaddr)
    end

    return data
end

function read_keys(http_form)
    local asycrypto = require("luci.model.asycrypto").Crypto("rsa")
    local uci_r = require("luci.model.uci").cursor()
    local pubkey = asycrypto.read_pubkey()
    local keys   = { pubkey.n, pubkey.e } 
    local data = { username = "", password = keys}

    if uci_r:get_profile("cloud", "https_client") == 1 then
        local mode = uci_r:get("sysmode", "sysmode", "mode")
        if nil == uci_r:get("sysmode", "sysmode", "support") or nil == mode then
            data["mode"] = "router"
        else
            data["mode"] = mode
        end
    end

    return data
end

function read_recovery(http_form)
    return pwdrec.recovery_read()
end

function write_recovery(http_form)
    return pwdrec.recovery_write(http_form)
end

function read_vercode(http_form)
    return pwdrec.vercode_get()
end

function check_vercode(http_form)
    return pwdrec.vercode_check(http_form.vercode)
end

function check_factory_default()
    local uci_r = require("luci.model.uci").cursor()
    if uci_r:get_profile("cloud", "https_client") ~= 1 then
        return {["is_default"] = accmgnt.is_dft_cfg(), ["cloud_ever_login"] = accmgnt.cloud_account_exist()}
    else
        return {["is_default"] = accmgnt.is_dft_cfg()}
    end
end

function restart_wportal()
	sys.fork_call("wportalctrl -c")
	sys.fork_call("echo \"stop\" > /tmp/wportal/status")
	sys.fork_call("/etc/hotplug.d/iface/99-wportal")
end

function set_initial_pwd(http_form)
    local data = {}
    local log  = logm.Log(PROJ_LOG_ID_REMOTE_MN)
	
	if accmgnt.is_dft_cfg() == false then
		restart_wportal()
		return false, "have set", data
	end
	
    local sauth = require "luci.sauth"
    local sys = require "luci.sys"
    local ctypes = require "luci.model.checktypes"
	
    local ipaddr = sys.getenv("REMOTE_ADDR")

    local macaddr
    local remote = not ctypes.check_ip_in_lan(ipaddr)

    local cm = require "luci.model.client_mgmt"
    if not remote then
        macaddr = cm.get_mac_by_ip(ipaddr)
        assert(macaddr, "lan mac is nil!")
    end
    local addr = remote and ipaddr or macaddr

	if fs.access(AUTO_UPDATE_LOCKFILE, "r") then
		return false, "auto upgrading", {}
	end

    local allow, sid, sdat = sauth.limit(addr, remote)
    if not allow then
        data.logined_user = sdat.user
        data.logined_remote = sdat.remote
        if sdat.remote then
            data.logined_ip = sdat.addr
        else
            data.logined_mac = sdat.addr
            local client = cm.get_client_by("mac", data.logined_mac)
            if client then
                data.logined_ip = client.ip
                data.logined_host = client.hostname
            end
        end

        local uci_r = require("luci.model.uci").cursor()
        local preempt = uci_r:get("administration", "login", "preempt")
        if preempt == "off" then
            return false, "user conflict", data
        end
    end

    local attempts = read_attempts()
    reap_attempts(attempts)
    local att = attempts[addr] or {attempts = 0}
    if att.attempts >= ATTEMPTS_MAX then
		data = {}
		data.failureCount = att.attempts
		data.attemptsAllowed = ATTEMPTS_MAX - att.attempts
        return false, "exceeded max attempts", data
    end

   local acc_tbl = {
        old_acc = "admin",
        new_acc = "admin",
        new_pwd = http_form["password"] or "",
        cfm_flag = http_form["confirm"]
    }

    local new_pwd = asycrypto.decrypt(acc_tbl.new_pwd) or ""
    local cfm_flag = acc_tbl.cfm_flag

    if not cfm_flag or not accmgnt.set(acc_tbl.new_acc, acc_tbl.new_pwd) then
        att.attempts = att.attempts + 1
        att.ltime = sys.uptime()
        attempts[addr] = att
        write_attempts(attempts)
		data = {}
		data.failureCount = att.attempts
		data.attemptsAllowed = ATTEMPTS_MAX - att.attempts
        return false, "login failed", data
    end

    local token = sys.uniqueid(16)
    if sid then
        sauth.kill(sid)
    end

    local http = require "luci.http"
    local hash = service.get_user_hash()
    local aes = http.get_aeskey()
    local seqnum = http.get_seqnum()
    sid = sys.uniqueid(16)
    sauth.write(sid, {
                    addr = addr,
                    remote = remote,
                    user = acc_tbl.new_acc,
                    token = token,
                    secret = sys.uniqueid(16),
                    hash = hash,
                    aeskey = aes and aes.key or nil,
                    aesiv = aes and aes.iv or nil,
                    seqnum = seqnum
    })

    local dl = require "luci.controller.domain_login"
    dl.tips_cancel()

    http.header("Set-Cookie", "sysauth=" .. sid
                    .. ";path=" .. sys.getenv("SCRIPT_NAME") or "")
    data.stok = token
	restart_wportal()

    if remote then
        log(REMOTE_MN_LOGIN, ipaddr)
    end

    return data
	
end

function cloud_login(http_form)
    local data = {}
    local log  = logm.Log(PROJ_LOG_ID_REMOTE_MN)

    local sauth = require "luci.sauth"
    local sys = require "luci.sys"
    local ctypes = require "luci.model.checktypes"

    local user = http_form["username"]
    local pass = http_form["password"]
    local confirm = http_form["confirm"] or "false"

    local ipaddr = sys.getenv("REMOTE_ADDR")

    local macaddr
    local remote = not ctypes.check_ip_in_lan(ipaddr)

    local cm = require "luci.model.client_mgmt"
    if not remote then
        macaddr = cm.get_mac_by_ip(ipaddr)
        assert(macaddr, "lan mac is nil!")
    end
    local addr = remote and ipaddr or macaddr

	if fs.access(AUTO_UPDATE_LOCKFILE, "r") then
		return false, "auto upgrading", {}
	end

	local attempts = read_attempts()
    reap_attempts(attempts)
    local att = attempts[addr] or {attempts = 0}
    if att.attempts >= ATTEMPTS_MAX then
		data = {}
		data.failureCount = att.attempts
		data.attemptsAllowed = ATTEMPTS_MAX - att.attempts
        return false, "exceeded max attempts", data
    end

    pass = asycrypto.decrypt(pass)
    if not pass then
        return false 
    end

	local account = require("luci.controller.admin.cloud_account")
	local uci_r = require("luci.model.uci").cursor()
	local mode = uci_r:get("sysmode", "sysmode", "mode")
	local ret
	if mode == "ap" then
		ret = false
	else
		ret, err_code = account.cloud_bind_and_login(user, pass)
	end

	if ret == false then
		local accountmgnt = require("luci.model.accountmgnt")
		local acc_check = accountmgnt.cloud_acc_check
		--20601 means password error and 20600 means cloud account error
		if tonumber(err_code) ~= -20601 and tonumber(err_code) ~= -20600 and 
			tonumber(err_code) ~= -20200 and tonumber(err_code) ~= -20615 and 
			tonumber(err_code) ~= -20602 and tonumber(err_code) ~= -20661 and 
			tonumber(err_code) ~= -20580 then
			
			local r,e = acc_check(user, pass)
			if r then
				attempts[addr] = nil
				write_attempts(attempts)
			else
				att.attempts = att.attempts + 1
				att.ltime = sys.uptime()
				attempts[addr] = att
				write_attempts(attempts)
				data = {}
				data.failureCount = att.attempts
				data.attemptsAllowed = ATTEMPTS_MAX - att.attempts
				data.errorcode = e
				data.ownerAccount = accountmgnt.get_last_cloud_account() or ""
				return false, "login failed", data
			end
	else
		return false, "login failed", {["errorcode"] = tostring(err_code)}
		end
	end

	local allow, sid, sdat = sauth.limit(addr, remote)
    if not allow then
        data.logined_user = sdat.user
        data.logined_remote = sdat.remote
        if sdat.remote then
            data.logined_ip = sdat.addr
        else
            data.logined_mac = sdat.addr
            local client = cm.get_client_by("mac", data.logined_mac)
            if client then
                data.logined_ip = client.ip
                data.logined_host = client.hostname
            end
        end
		if confirm == "false" then
			return false, "user conflict", {}
		end
    end
		
    local token = sys.uniqueid(16)
    if sid then
        sauth.kill(sid)
    end

    local http = require "luci.http"
    local hash = service.get_user_hash()
    local aes = http.get_aeskey()
    local seqnum = http.get_seqnum()
    sid = sys.uniqueid(16)
    sauth.write(sid, {
                    addr = addr,
                    remote = remote,
                    user = user,
                    token = token,
                    secret = sys.uniqueid(16),
                    hash = hash,
                    aeskey = aes and aes.key or nil,
                    aesiv = aes and aes.iv or nil,
                    seqnum = seqnum
    })

    local dl = require "luci.controller.domain_login"
    dl.tips_cancel()

    http.header("Set-Cookie", "sysauth=" .. sid
                    .. ";path=" .. sys.getenv("SCRIPT_NAME") or "")
    data.stok = token
	local filename = "/tmp/applogin_flag"
	if nixio.fs.access(filename) then
		if confirm == "true" then
			kickoff_app()
			sys.call("rm -f /tmp/applogin_flag")
		else
			return false, "user conflict", {}
		end
	end

    local remind_later = uci_r:get("cloud_config", "new_firmware", "remind_later")
    local login_count = uci_r:get("cloud_config", "new_firmware", "login_count") or "1"
    local upgrade_type = uci_r:get("cloud_config", "upgrade_info", "type") or "0"

    if remind_later == "1" and upgrade_type == "1" then
        login_count = tonumber(login_count) + 1
        uci_r:set("cloud_config", "new_firmware", "login_count", tostring(login_count))
        uci_r:commit("cloud_config")
    end

    if remote then
        log(REMOTE_MN_LOGIN, ipaddr)
    end

    return data	
end

function cloud_get_bind_status(http_form)
    -- only get bind status from local uci for acting quickly
    local uci_r = require("luci.model.uci").cursor()
    local bind_status = uci_r:get("cloud_config", "device_status", "bind_status")
    local need_unbind = uci_r:get("cloud_config", "device_status", "need_unbind")
    local isBinded = false
    if tonumber(bind_status) == 1 or tonumber(need_unbind) == 1 then
        isBinded = true
    end

    return {["isbind"] = isBinded} 
end

function cloud_set_status_bind()
    -- only get bind status from local uci for acting quickly
    local uci_r = require("luci.model.uci").cursor()
    local bind_status = uci_r:get("cloud_config", "device_status", "bind_status")
    local need_unbind = uci_r:get("cloud_config", "device_status", "need_unbind")

    if tonumber(bind_status) ~= 1 or tonumber(need_unbind) == 1 then
        uci_r:set("cloud_config", "device_status", "bind_status", "1")
        uci_r:set("cloud_config", "device_status", "need_unbind", "0")
        uci_r:commit("cloud_config")

        if nixio.fs.access(CLOUD_SETUP_TM_HOMECARE) then
            uci_r:set("homecare", "tm_homecare", "enable", "on")
            uci_r:commit("homecare")                
            sys.fork_exec(CLOUD_SETUP_TM_HOMECARE .. " forceOn")
        end        
    end

    return true
end

function cloud_login_bind(http_form)
    local data = {}
    local log  = logm.Log(PROJ_LOG_ID_REMOTE_MN)
    local sauth = require "luci.sauth"
    local sys = require "luci.sys"
    local ctypes = require "luci.model.checktypes"
    local cloud_https_account = require "cloud_req.cloud_account"

    local user = http_form["username"] or "admin"
    local pass = http_form["password"]
    local account_token = http_form["token"]
    local confirm = http_form["confirm"] or "false"
    
    local ipaddr = sys.getenv("REMOTE_ADDR")

    local macaddr
    local remote = not ctypes.check_ip_in_lan(ipaddr)

    if not account_token then
        return false, "bind failed", {["errorcode"] = "-10000"}
    end

    local cm = require "luci.model.client_mgmt"
    if not remote then
        macaddr = cm.get_mac_by_ip(ipaddr)
        assert(macaddr, "lan mac is nil!")
    end
    local addr = remote and ipaddr or macaddr

	if fs.access(AUTO_UPDATE_LOCKFILE, "r") then
		return false, "auto upgrading", {}
	end

    local attempts = read_attempts()
    reap_attempts(attempts)
    local att = attempts[addr] or {attempts = 0}
    if att.attempts >= ATTEMPTS_MAX then
        data = {}
        data.failureCount = att.attempts
        data.attemptsAllowed = ATTEMPTS_MAX - att.attempts
        return false, "exceeded max attempts", data
    end

    local acc_check = require("luci.model.accountmgnt").check
    if acc_check(user, pass) then
        attempts[addr] = nil
        write_attempts(attempts)
    else
        att.attempts = att.attempts + 1
        att.ltime = sys.uptime()
        attempts[addr] = att
        write_attempts(attempts)
        data = {}
        data.failureCount = att.attempts
        data.attemptsAllowed = ATTEMPTS_MAX - att.attempts
        return false, "login failed", data
    end

    local allow, sid, sdat = sauth.limit(addr, remote)
    if not allow then
        data.logined_user = sdat.user
        data.logined_remote = sdat.remote
        if sdat.remote then
            data.logined_ip = sdat.addr
        else
            data.logined_mac = sdat.addr
            local client = cm.get_client_by("mac", data.logined_mac)
            if client then
                data.logined_ip = client.ip
                data.logined_host = client.hostname
            end
        end

        if confirm == "false" then
            return false, "user conflict", {}
        end
    end

    local filename = "/tmp/applogin_flag"
    if nixio.fs.access(filename) then
        if confirm == "true" then
            kickoff_app()
            fs.unlink(filename)
        else
            return false, "user conflict", {}
        end
    end

    local err_code = cloud_https_account.bind_device(account_token)
    if err_code ~= 0 then
        return false, "bind failed", {["errorcode"] = tostring(err_code)}
    end
    data.role = 0

    local token = sys.uniqueid(16)
    if sid then
        sauth.kill(sid)
    end

    local http = require "luci.http"
    local hash = http.get_hash()
    local aes = http.get_aeskey()
    local seqnum = http.get_seqnum()
    sid = sys.uniqueid(16)
    sauth.write(sid, {
                    addr = addr,
                    remote = remote,
                    user = user,
                    token = token,
                    secret = sys.uniqueid(16),
                    hash = hash,
                    aeskey = aes and aes.key or nil,
                    aesiv = aes and aes.iv or nil,
                    seqnum = seqnum
    })

    local dl = require "luci.controller.domain_login"
    dl.tips_cancel()

    http.header("Set-Cookie", "sysauth=" .. sid
                    .. ";path=" .. sys.getenv("SCRIPT_NAME") or "")
    data.stok = token

    if remote then
        log(REMOTE_MN_LOGIN, ipaddr)
    end

    return data
end

function cloud_login_check(http_form)
    local data = {}
    local log  = logm.Log(PROJ_LOG_ID_REMOTE_MN)
    local sauth = require "luci.sauth"
    local sys = require "luci.sys"
    local ctypes = require "luci.model.checktypes"
    local cloud_https_account = require "cloud_req.cloud_account"

    local user = http_form["username"] or "admin"
    local pass = http_form["password"]
    local account_token = http_form["token"]
    local confirm = http_form["confirm"] or "false"
    
    local ipaddr = sys.getenv("REMOTE_ADDR")

    local macaddr
    local remote = not ctypes.check_ip_in_lan(ipaddr)

    if not account_token then
        return false, "bind check failed", {["errorcode"] = "-10000"}
    end

    local cm = require "luci.model.client_mgmt"
    if not remote then
        macaddr = cm.get_mac_by_ip(ipaddr)
        assert(macaddr, "lan mac is nil!")
    end
    local addr = remote and ipaddr or macaddr

	if fs.access(AUTO_UPDATE_LOCKFILE, "r") then
		return false, "auto upgrading", {}
	end

    local attempts = read_attempts()
    reap_attempts(attempts)
    local att = attempts[addr] or {attempts = 0}
    if att.attempts >= ATTEMPTS_MAX then
        data = {}
        data.failureCount = att.attempts
        data.attemptsAllowed = ATTEMPTS_MAX - att.attempts
        return false, "exceeded max attempts", data
    end

    local allow, sid, sdat = sauth.limit(addr, remote)
    if not allow then
        data.logined_user = sdat.user
        data.logined_remote = sdat.remote
        if sdat.remote then
            data.logined_ip = sdat.addr
        else
            data.logined_mac = sdat.addr
            local client = cm.get_client_by("mac", data.logined_mac)
            if client then
                data.logined_ip = client.ip
                data.logined_host = client.hostname
            end
        end

        if confirm == "false" then
            return false, "user conflict", {}
        end
    end

    local filename = "/tmp/applogin_flag"
    if nixio.fs.access(filename) then
        if confirm == "true" then
            kickoff_app()
            fs.unlink(filename)
        else
            return false, "user conflict", {}
        end
    end

    local err_code, ret_data = cloud_https_account.get_accountRole(account_token)
    if err_code ~= 0 then
        return false, "bind check failed", {["errorcode"] = tostring(err_code)}
    end
    if ret_data.role ~= 0 and ret_data.role ~= 1 then
        --This account is not bound to the device. cloud error code -20580
        return false, "bind check failed", {["errorcode"] = "-20580"}
    end
    -- owner or user means device is binded, and refresh the bind status when login
    cloud_set_status_bind()

    --set return data role
    data.role = ret_data.role

    local token = sys.uniqueid(16)
    if sid then
        sauth.kill(sid)
    end

    local http = require "luci.http"
    local hash = http.get_hash()
    local aes = http.get_aeskey()
    local seqnum = http.get_seqnum()
    sid = sys.uniqueid(16)
    sauth.write(sid, {
                    addr = addr,
                    remote = remote,
                    user = user,
                    token = token,
                    secret = sys.uniqueid(16),
                    hash = hash,
                    aeskey = aes and aes.key or nil,
                    aesiv = aes and aes.iv or nil,
                    seqnum = seqnum
    })

    local dl = require "luci.controller.domain_login"
    dl.tips_cancel()

    http.header("Set-Cookie", "sysauth=" .. sid
                    .. ";path=" .. sys.getenv("SCRIPT_NAME") or "")
    data.stok = token

    if remote then
        log(REMOTE_MN_LOGIN, ipaddr)
    end

    return data
end

function login_check_internet()
    local is_connected = false
    local socket = require("socket")            
    local test = socket.tcp()
    test:settimeout(1000)         
    if sys.call("online-test") ~= 0 then
        is_connected = false
    else
        is_connected = true     
    end
    test:close()
    return is_connected
end

function get_device_token()
	local CLOUD_TMP_DIR = "/tmp/cloud/"
	local TOKEN_VALUE_FILE = CLOUD_TMP_DIR .. "cloud_token_eweb"
	local token = ""
	local origin_url = ""
	local fp
	
	if not nixio.fs.access(TOKEN_VALUE_FILE) then
		sys.call("cloud_getDevToken")
	end
	
	if nixio.fs.access(TOKEN_VALUE_FILE) then
		fp = io.open(TOKEN_VALUE_FILE, "r")
		token = fp:read("*line")
		origin_url = fp:read("*line")
		fp:close()
	end
		
	return {["token"] = token,["origin_url"] = origin_url}
end

function get_eweb_url()
    local CLOUD_TMP_DIR = "/tmp/cloud/"
    local TOKEN_VALUE_FILE = CLOUD_TMP_DIR .. "cloud_token_eweb"
    local token = ""
    local origin_url = ""
    local fp
    
    if not nixio.fs.access(TOKEN_VALUE_FILE) then
        sys.call("cloud_getDevToken")
    end
    
    if nixio.fs.access(TOKEN_VALUE_FILE) then
        fp = io.open(TOKEN_VALUE_FILE, "r")
        token = fp:read("*line")
        origin_url = fp:read("*line")
        fp:close()
    end
    
    return {["origin_url"] = origin_url}
end

function get_deviceInfo()
    local uci_r = require("luci.model.uci").cursor()
    local model = string.gsub(sys.exec("getfirm MODEL"), "\n", "")

    if uci_r:get_profile("cloud", "https_client") ~= 1 then
        local cloudUserName = uci_r:get("cloud_config", "login", "username")
        local role = uci_r:get("cloud_config", "login", "role")
        local cloud = require "cloud_req.cloud_comm"
        return {["cloudUserName"] = cloudUserName, ["role"] = tonumber(role), ["model"] = model}
    else
        return {["model"] = model}
    end
end

-- General controller routines

--[[	
		页面登陆成功后，调用kickoff_app将app客户端踢掉(tether)
		由于不能在设备端直接传递消息给tmpserver，因此调用PFClient接口伪装成云端登陆的app
		通过以token:c9c9c9c9c9c9c9c9c9c9c9c9c9c9c9c9()给tmpserver发送消息，
		清除掉其他app客户端。
		发送三个消息，raw_data中的内容，是经过base64加密的：
		第一个建立和PFClient的连接，
		第二个是客户端关联请求，
		第三个是"客户端回复的关联包最后确认包"+"数据传输包"
		(目前传的opcode为0600的包,获取wan口信息，改成其他的opcode要注意修正checksum的值)
		目的是为了获取包中的bussinesstype，踢掉同类。
		\x01\x00\x02\x00	客户端回复的关联包最后确认包
		\x01\x00\x05\x00	数据传输包(参考：TMP框架协议)
		\x00\x08\x00\x00	08是负载长度
		\x00\x00\x00\x00
		\x02\x9e\x8c\x6a		checksum
		\x01\x01\x06\x00	01:bussinesstype 01:version 0600:opcode
		\x00\x00\x00\x00
	]]--

function kickoff_app()
	local ubus = require "ubus"
    local _ubus = ubus.connect()
    local UBUS_OBJECT = "PFClient"

	local requestData = {["type"]="tmp_app",["method"]="connect",["token"]="c9c9c9c9c9c9c9c9c9c9c9c9c9c9c9c9"}
	_ubus:call(UBUS_OBJECT, "passthrough", requestData)
	requestData = {["sn"]="0",["method"]="transfer",["token"]="c9c9c9c9c9c9c9c9c9c9c9c9c9c9c9c9",["raw_data"]="AQABAA=="}
	_ubus:call(UBUS_OBJECT, "passthrough", requestData)
	requestData = {["sn"]="1",["method"]="transfer",["token"]="c9c9c9c9c9c9c9c9c9c9c9c9c9c9c9c9",["raw_data"]="AQACAAEABQAACAAAAAAAAAKejGoBAQYAAAAAAA=="}
	_ubus:call(UBUS_OBJECT, "passthrough", requestData)
end

function get_sysmode(mode)
	local data = {}
	
	if nil == uci_r:get("sysmode", "sysmode", "support") then
		data["support"] = "no"
	else
		data["support"] = uci_r:get("sysmode", "sysmode", "support")
		mode    = uci_r:get("sysmode", "sysmode", "mode")
		if nil ~= mode then
			data["mode"] = mode
		else
			data["mode"] = "router"
		end
	end

	return data
end

function handshake_getkey(http_form)
    local rsakey = service.read_rsakey()

    if not rsakey then
        return false, "no valid rsa key"
    end

    local data = {}
    data.key = {rsakey.n, rsakey.e} 
    data.seq = service.gen_seqnum()

    return data
end

function get_firmware_info()
    local configtool = require "luci.sys.config"
    local ret = {
        model = configtool.getsysinfo("product_name"), 
        hardware_version = configtool.getsysinfo("HARDVERSION"), 
        firmware_version = configtool.getsysinfo("SOFTVERSION") .. "(" .. string.sub(configtool.getsysinfo("special_id"), 1, 4) .. ")", 
    }
    return ret
end

function check_internet()
    local status = require "luci.controller.admin.status"
    return status.get_internet_status()
end

local dispatch_tbl = {
    keys = {
        ["read"] = {cb = read_keys}
    },
    login = {
        ["login"] = {cb = login},
        ["read"] = {cb = read_keys}
    },
    password = {
        ["read"] = {cb = read_recovery},
        ["write"] = {cb = write_recovery}
    },
    vercode = {
        ["read"] = {cb = read_vercode},
        ["write"] = {cb = check_vercode}
    },
    check_factory_default = {
        ["read"] = {cb = check_factory_default}
    },
	initial_login = {
		["login"] = {cb = set_initial_pwd}
	},
	cloud_login =  {
		["read"] = {cb = read_keys},
		["login"] = {cb = cloud_login}
	},
	get_token = {
        ["read"] = {cb = get_device_token}
    },
	get_deviceInfo = {
        ["read"] = {cb = get_deviceInfo}
    },		
    sysmode = {
        [".super"] = {cb = get_sysmode}
    },
    auth = {
        ["read"]  = { cb = handshake_getkey }
    },
    get_firmware_info = {
        [".super"] = {cb = get_firmware_info}
    },
    check_internet = {
        [".super"] = {cb = check_internet}
    }
}

local dispatch_tbl_new = {
    keys = {
        ["read"] = {cb = read_keys}
    },
    login = {
        ["login"] = {cb = login},
        ["read"] = {cb = read_keys}
    },
    password = {
        ["read"] = {cb = read_recovery},
        ["write"] = {cb = write_recovery}
    },
    vercode = {
        ["read"] = {cb = read_vercode},
        ["write"] = {cb = check_vercode}
    },
    check_factory_default = {
        ["read"] = {cb = check_factory_default}
    },
    initial_login = {
        ["login"] = {cb = set_initial_pwd}
    },
    cloud_login =  {
        ["read"] = {cb = read_keys},
        ["login"] = {cb = cloud_login_check},
        ["bind"] = {cb = cloud_login_bind}
    },
    cloud_bind_status =  {
        ["read"] = {cb = cloud_get_bind_status}
    },
    check_internet = {
        ["read"] = {cb = login_check_internet}
    },
    get_eweb_url = {
        ["read"] = {cb = get_eweb_url}
    },
    get_deviceInfo = {
        ["read"] = {cb = get_deviceInfo}
    },	
    sysmode = {
        [".super"] = {cb = get_sysmode}
    },
    auth = {
        ["read"]  = { cb = handshake_getkey }
    },
    get_firmware_info = {
        [".super"] = {cb = get_firmware_info}
    }
}

function dispatch(http_form)
    local uci_r = require("luci.model.uci").cursor()
    if uci_r:get_profile("cloud", "https_client") ~= 1 then
        return ctl.dispatch(dispatch_tbl, http_form)
    else
        return ctl.dispatch(dispatch_tbl_new, http_form)
    end
end

function _index()
    return ctl._index(dispatch)
end

function index()
    entry({"login"}, call("_index")).leaf = true
end
