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
                return false, "user conflict"
            end
        end

    local token = sys.uniqueid(16)
    if sid then
        sauth.kill(sid)
    end

    sid = sys.uniqueid(16)
    sauth.write(sid, {
                    addr = addr,
                    remote = remote,
                    user = user,
                    token = token,
                    secret = sys.uniqueid(16)
    })

    local dl = require "luci.controller.domain_login"
    dl.tips_cancel()

    local http = require "luci.http"
    http.header("Set-Cookie", "sysauth=" .. sid
                    .. ";path=" .. sys.getenv("SCRIPT_NAME") or "")
    data.stok = token
	
	local filename = "/tmp/applogin_flag"
	if nixio.fs.access(filename) then
		if confirm == "true" then
	kickoff_app()
			sys.call("rm -f /tmp/applogin_flag")
		else
			return false, "user conflict"
		end
	end
    return data
end

function read_keys(http_form)
    local asycrypto = require("luci.model.asycrypto").Crypto("rsa")
    local pubkey = asycrypto.read_pubkey()
    local keys   = { pubkey.n, pubkey.e } 
    return {
        username = "",
        password = keys
    }
end

function read_recovery(http_form)
    return pwdrec.recovery_read()
end

function read_vercode(http_form)
    return pwdrec.vercode_get()
end

function check_vercode(http_form)
    return pwdrec.vercode_check(http_form.vercode)
end

function check_factory_default()
    return {["is_default"] = accmgnt.is_dft_cfg(), ["cloud_ever_login"] = accmgnt.cloud_account_exist()}
end

function restart_wportal()
	sys.fork_exec("wportalctrl -c")
	sys.fork_exec("echo \"stop\" > /tmp/wportal/status")
	sys.fork_exec("/etc/hotplug.d/iface/99-wportal")
end

function set_initial_pwd(http_form)
    local data = {}

	
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

	local administration = require("luci.controller.admin.administration")
	administration.usbshare_update(acc_tbl.old_acc, acc_tbl.new_acc, new_pwd) 
	
    local token = sys.uniqueid(16)
    if sid then
        sauth.kill(sid)
    end

    sid = sys.uniqueid(16)
    sauth.write(sid, {
                    addr = addr,
                    remote = remote,
                    user = acc_tbl.new_acc,
                    token = token,
                    secret = sys.uniqueid(16)
    })

    local dl = require "luci.controller.domain_login"
    dl.tips_cancel()

    local http = require "luci.http"
    http.header("Set-Cookie", "sysauth=" .. sid
                    .. ";path=" .. sys.getenv("SCRIPT_NAME") or "")
    data.stok = token
	restart_wportal()
    return data
	
end

function cloud_login(http_form)
    local data = {}

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
	local ret, err_code = account.cloud_bind_and_login(user, pass)
	if ret == false then
		local accountmgnt = require("luci.model.accountmgnt")
		local acc_check = accountmgnt.cloud_acc_check
		--20601 means password error and 20600 means cloud account error
		if tonumber(err_code) ~= -20601 and tonumber(err_code) ~= -20600 and 
			tonumber(err_code) ~= -20200 and tonumber(err_code) ~= -20615 and 
			tonumber(err_code) ~= -20602 and tonumber(err_code) ~= -20661 and 
			tonumber(err_code) ~= -20580 then

			if	acc_check(user, pass) then
				attempts[addr] = nil
				write_attempts(attempts)
			else
				att.attempts = att.attempts + 1
				att.ltime = sys.uptime()
				attempts[addr] = att
				write_attempts(attempts)
				data = {}
				data.errorcode = -20601
				data.failureCount = att.attempts
				data.attemptsAllowed = ATTEMPTS_MAX - att.attempts
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

    sid = sys.uniqueid(16)
    sauth.write(sid, {
                    addr = addr,
                    remote = remote,
                    user = user,
                    token = token,
                    secret = sys.uniqueid(16)
    })

    local dl = require "luci.controller.domain_login"
    dl.tips_cancel()

    local http = require "luci.http"
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
    return data
end

function get_device_token()
	local CLOUD_TMP_DIR = "/tmp/cloud/"
	local TOKEN_VALUE_FILE = CLOUD_TMP_DIR .. "cloud_token"
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

function get_deviceInfo()
	local uci_r = require("luci.model.uci").cursor()
	local cloudUserName = uci_r:get("cloud_config", "login", "username")
	local role = uci_r:get("cloud_config", "login", "role")
	local cloud = require "cloud_req.cloud_comm"
	local model = cloud.TrimStr(sys.exec("getfirm MODEL"))

	return {["cloudUserName"] = cloudUserName, ["role"] = tonumber(role), ["model"] = model}
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
		\x02\x9e\x8c\x6a	checksum
		\x01\x01\x06\x00	01:bussinesstype 01:version 0600:opcode
		\x00\x00\x00\x00
	]]

function kickoff_app()
	local ubus = require "ubus"
    local _ubus = ubus.connect()
    local UBUS_OBJECT = "PFClient"

	local requestData = {["type"]="tmp_app",["method"]="connect",["token"]="c9c9c9c9c9c9c9c9c9c9c9c9c9c9c9c9"}
	_ubus:call(UBUS_OBJECT, "passthrough", requestData)
	requestData = {["sn"]=0,["method"]="transfer",["token"]="c9c9c9c9c9c9c9c9c9c9c9c9c9c9c9c9",["raw_data"]="AQABAA=="}
	_ubus:call(UBUS_OBJECT, "passthrough", requestData)
	requestData = {["sn"]=0,["method"]="transfer",["token"]="c9c9c9c9c9c9c9c9c9c9c9c9c9c9c9c9",["raw_data"]="AQACAAEABQAACAAAAAAAAAKejGoBAQYAAAAAAA=="}
	_ubus:call(UBUS_OBJECT, "passthrough", requestData)
end

local dispatch_tbl = {
    login = {
        ["login"] = {cb = login},
        ["read"] = {cb = read_keys}
    },
    password = {
        ["read"] = {cb = read_recovery}
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
}

function dispatch(http_form)
    return ctl.dispatch(dispatch_tbl, http_form)
end

function _index()
    return ctl._index(dispatch)
end

function index()
    entry({"login"}, call("_index")).leaf = true
end
