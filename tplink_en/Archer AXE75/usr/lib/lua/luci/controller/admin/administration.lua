--[[
Copyright(c) 2008-2014 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  administration.lua
Details :  Change account, enable password recovery, local and remote management.
Author  :  Zhang Zhongwei <zhangzhongwei@tp-link.net>
Version :  1.0.0
Date    :  03 Apr, 2014
]]--
module("luci.controller.admin.administration", package.seeall)


local nixio  = require "nixio"
local uci    = require "luci.model.uci"
local dtypes = require "luci.tools.datatypes"
local ctypes = require "luci.model.checktypes"
local dbg    = require "luci.tools.debug"
local ctl    = require "luci.model.controller"
local json = require "luci.json"
local sys = require "luci.sys"
local ubus   = require "ubus"

local uci_r = uci.cursor()

local ADMINCFG = "administration"              -- Config file name.
local ACCMGNT  = "accountmgnt"                 -- Config file name.

local MIN_EMAIL_LEN = 2
local MAX_EMAIL_LEN = 32
local MIN_EMAIL_USER_LEN = 2
local MAX_EMAIL_USER_LEN = 32

local LOG_ID_ACCOUNT = 280
local LOG_ID_LOCAL = 281
local LOG_ID_REMOTE = 282

-- For account management.
local ENABLE_AUTH       = 51
local DISABLE_AUTH      = 52
local SET_EMAIL         = 53
local UPDATE_SESSION    = 54
local RESTART_USB       = 55
local INVALID_VERCODE   = 56
local VERCODE_TIMEOUT   = 57
local VERCODE_NOT_GEN   = 58
local PWDREC_SEV_START  = 59
local PWDREC_SEV_STOP   = 60
local UPDATE_ACCOUNT    = 101
local RESET_ACCOUNT     = 102
local UPDATE_ACC_FAILED = 103
local SET_EMAIL_FAILED  = 104

-- For local management.
local INSERT_DEVICE    = 51
local UPDATE_DEVICE    = 52
local DELETE_DEVICE    = 53
local MODE_ALL         = 101
local MODE_PARTIAL     = 102
local INVALID_MAC_ADR  = 54
local NO_DEVICE_FOUND  = 152
local INSERT_FAILED    = 203
local UPDATE_FAILED    = 204
local DELETE_FAILED    = 205
-- add for https
local LOCAL_HTTPS_ON    = 103
local LOCAL_HTTPS_OFF   = 104

-- For remote management.
local UPDATE_REMOTE    = 51
local UPDATE_REMOTE_P  = 52
-- add for https
local UPDATE_REMOTE_HTTPS   = 53
local UPDATE_REMOTE_HTTPS_P = 54
local INVALID_PORT_ADR = 151

-- For all.
local SERVICE_START     = 504
local SERVICE_STOP      = 505
local REACH_MAX_RULES   = 701
local INVALID_HTTP_ARGS = 702


--- Run the command and print the command to the serial window.
-- @param cmd Command to be run.
-- @return #bool True if command was running successfully.
local function exec(cmd)
    dbg(cmd)
    return luci.sys.fork_call(cmd)
end

function compact_account_data(oacc, opwd, nacc, npwd, cpwd)
    return {
        old_acc = oacc,
        old_pwd = opwd,
        new_acc = nacc,
        new_pwd = npwd,
        cfm_pwd = cpwd
    }
end

--- Read the password recovery info but not the account and password.
-- @param formvalues Values from web request.
-- @return #table Data of password recovery info to be return.
function account_read(formvalues)
    local asycrypto = require("luci.model.asycrypto").Crypto("rsa")
    local pubkey = asycrypto.read_pubkey()
    local keys   = {pubkey.n, pubkey.e}

    return compact_account_data("", keys, "", keys, keys)
end

--- Change the session status.
-- @param olduser The old username.
-- @param username The new username.
-- @return N/A
function session_update(olduser, username)
    local log   = require("luci.model.log").Log(LOG_ID_ACCOUNT)
    local sauth = require "luci.sauth"
    local sess  = require "luci.dispatcher".context.authsession
    local sdat  = sauth.read(sess)
    if sdat and sdat.user == olduser or olduser == false then
        log(UPDATE_SESSION)
        sauth.write(sess, {
            addr   = sdat.addr,
            remote = sdat.remote,
            user   = username,
            token  = sdat.token,
            secret = sdat.secret,
            hash   = sdat.hash,
            aeskey = sdat.aeskey,
            aesiv  = sdat.aesiv,
            seqnum = sdat.seqnum
        })
    end
end

--- Read the password recovery config from config file.
-- @param  has_pwd Whether return the password.
-- @return #table
function recovery_cfg_read(has_pwd)
    return {
        enable_rec  = uci_r:get(ADMINCFG, "account", "recovery"),
        enable_auth = uci_r:get(ADMINCFG, "account", "authentication"),
        from        = uci_r:get(ADMINCFG, "account", "from"),
        to          = uci_r:get(ADMINCFG, "account", "to"),
        smtp        = uci_r:get(ADMINCFG, "account", "smtp"),
        username    = uci_r:get(ADMINCFG, "account", "username"),
        password    = has_pwd and uci_r:get(ADMINCFG, "account", "password") or nil
    }
end

--- Update the new recovery email info.
-- @param  values The info of the recovery email info.
-- @return #bool True if email info update successfully, or false.
function recovery_cfg_update(values)
    uci_r:set(ADMINCFG, "account", "recovery",       values["enable_rec"])
    uci_r:set(ADMINCFG, "account", "authentication", values["enable_auth"])

    if values["enable_rec"] == "on" then
        uci_r:set(ADMINCFG, "account", "from", values["from"])
        uci_r:set(ADMINCFG, "account", "to",   values["to"])
        uci_r:set(ADMINCFG, "account", "smtp", values["smtp"])

        if values["enable_auth"] == "on" then
            uci_r:set(ADMINCFG, "account", "username", values["username"])
            uci_r:set(ADMINCFG, "account", "password", values["password"])
        end
    end

    uci_r:commit(ADMINCFG)
    return true
end

--- Check the validity of the recovery email info.
-- @param  email The info of recovery email to be check.
-- @return #bool Return true if the info is ok, or false.
function recovery_cfg_check(email)
    if not ctypes.check_onoff(email.enable_rec) or not ctypes.check_onoff(email.enable_auth) then
        return false
    end

    if email.enable_rec == "on" then
        if not ctypes.check_rangelen(email.from, MIN_EMAIL_LEN, MAX_EMAIL_LEN)
            or not ctypes.check_rangelen(email.to, MIN_EMAIL_LEN, MAX_EMAIL_LEN)
            or not ctypes.check_rangelen(email.smtp, MIN_EMAIL_LEN, MAX_EMAIL_LEN)
        then
            return false
        end

        if email.enable_auth == "on"
            and (not ctypes.check_rangelen(email.username, MIN_EMAIL_USER_LEN, MAX_EMAIL_USER_LEN)
            or not ctypes.check_rangelen(email.password, MIN_EMAIL_USER_LEN, MAX_EMAIL_USER_LEN)
            or not ctypes.check_ascii_visible(email.username)
            or not ctypes.check_ascii_visible(email.password))
            -- or email.from ~= email.username)
        then
            return false
        end
    end
    return true
end

--- Check the validity of the device info.
-- @param  dev The info of a device.
-- @return #bool Return true if the info is ok, or false.
function local_dev_data_check(dev)
    if not dev or type(dev) ~= "table"
        or not ctypes.check_mac(dev.mac)
        or not ctypes.check_onoff(dev.enable)
    then
        return false
    end
    return true
end

--- Check the validity of the remote management config.
-- @param  values The info of the config.
-- @return #bool Return true if the info is ok, or false.
function remote_cfg_check(values)
    if not ctypes.check_in(values.enable, {"off", "all", "partial"}) then
        return false
    end

    if values.enable == "partial" then
        if not ctypes.check_unicast_ipv4(values.ipaddr)
            or ctypes.check_ip_in_lan(values.ipaddr)
        then
            return false
        end
    end

    if values.enable ~= "off" then
        if not ctypes.check_range(values.port, 1024, 65535)
            and values.port ~= "80"
        then
            return false
        end
    end
    return true
end

--- Read the remote management config from config file.
-- @param  N/A.
-- @return #table
function remote_cfg_read()
    return {
        enable = uci_r:get(ADMINCFG, "remote", "enable"),
        port   = uci_r:get(ADMINCFG, "remote", "port"),
        ipaddr = uci_r:get(ADMINCFG, "remote", "ipaddr")
    }
end

--- Update the remote management config to the config file.
-- @param  values.
-- @return #table
function remote_cfg_update(values)
    uci_r:set(ADMINCFG, "remote", "enable", values.enable)
    if values.enable ~= "off" then
        uci_r:set(ADMINCFG, "remote", "port", values.port)
        if values.enable == "partial" then
            uci_r:set(ADMINCFG, "remote", "ipaddr", values.ipaddr)
        end
    end
    uci_r:commit(ADMINCFG)
end

--- Update the account, password.
-- @param formvalues Values from web request.
-- @return #bool True if update success.
-- @return #bool, #string False if update failed and return error code.
function account_update(formvalues)
    local log       = require("luci.model.log").Log(LOG_ID_ACCOUNT)
    local accmgnt   = require "luci.model.accountmgnt"
    local asycrypto = require("luci.model.asycrypto").Crypto("rsa")

    local acc_tbl = {
        old_acc = formvalues["old_acc"] or "",
        old_pwd = formvalues["old_pwd"] or "",
        new_acc = formvalues["new_acc"] or "",
        new_pwd = formvalues["new_pwd"] or "",
        cfm_pwd = formvalues["cfm_pwd"] or ""
    }

    --when not input old account
    if acc_tbl.old_acc == ""
    then
        local accounts = accmgnt.get_name()
        if accounts and #accounts==1
        then
            acc_tbl.old_acc = accounts[1]
        end
    end

    --when not input new account
    if acc_tbl.new_acc == ""
    then
        acc_tbl.new_acc = acc_tbl.old_acc
    end
                            
    local new_pwd = asycrypto.decrypt(acc_tbl.new_pwd) or ""
    local cfm_pwd = asycrypto.decrypt(acc_tbl.cfm_pwd) or ""

    if new_pwd == cfm_pwd and accmgnt.update(acc_tbl.new_acc, 
        acc_tbl.new_pwd, acc_tbl.old_acc, acc_tbl.old_pwd) 
    then
        log(UPDATE_ACCOUNT, acc_tbl.new_acc)  -- Update account (XXX) success

        -- Update the new user to the session, so that user don't need to login again.
        session_update(acc_tbl.old_acc, acc_tbl.new_acc)

        return true
    end

    log(UPDATE_ACC_FAILED, acc_tbl.new_acc)   -- Update account (XXX) failed
    return false, "update account failed"
end

--- Update the account, password.
-- @param formvalues Values from web request.
-- @return #table Data of password info to be return.
-- @return #bool, #string False if update failed and return error code.
function account_mobile_update(formvalues)
    local log       = require("luci.model.log").Log(LOG_ID_ACCOUNT)
    local accmgnt   = require "luci.model.accountmgnt"
    local asycrypto = require("luci.model.asycrypto").Crypto("rsa")
    local new_pwd   = asycrypto.decrypt(formvalues.new_pwd)

    if accmgnt.update(formvalues.new_acc, formvalues.new_pwd,
        formvalues.old_acc, formvalues.old_pwd)
    then
        log(UPDATE_ACCOUNT, formvalues.new_acc)  -- Update account (XXX) success
        session_update(formvalues.old_acc, formvalues.new_acc)
        return {
            old_acc = formvalues.old_acc,
            old_pwd = formvalues.old_pwd,
            new_acc = formvalues.new_acc,
            new_pwd = formvalues.new_pwd,
            cfm_pwd = formvalues.cfm_pwd
        }
    end

    log(UPDATE_ACC_FAILED, formvalues.new_acc)   -- Update account (XXX) failed
    return false, "update account failed"
end

--- Set the account in first time using router.
-- @param formvalues Values from web request.
-- @return #bool True if update success.
-- @return #bool, #string False if update failed and return error code.
function account_set(formvalues)
    local log       = require("luci.model.log").Log(LOG_ID_ACCOUNT)
    local accmgnt   = require "luci.model.accountmgnt"
    local asycrypto = require("luci.model.asycrypto").Crypto("rsa")
    local new_pwd   = asycrypto.decrypt(formvalues.new_pwd)

    if accmgnt.set(formvalues.new_acc, formvalues.new_pwd) then
        session_update(false, formvalues.new_acc)
        local users   = accmgnt.get_name()
        if not users then
            old_acc = "admin"
        else
            old_acc = type(users) == "table" and users[1] or users
            old_acc = old_acc or "admin"
        end
        log(UPDATE_ACCOUNT, formvalues.new_acc)  -- Update account (XXX) success
        return true
    end

    log(UPDATE_ACC_FAILED)   -- Update account (XXX) failed
    return false, "Set account failed"
end

--For TMP Server to restart the wportal 
function app_restart_wportal()
    sys.fork_exec("wportalctrl -c")
    sys.fork_exec("echo \"stop\" > /tmp/wportal/status")
    sys.fork_exec("/etc/hotplug.d/iface/99-wportal")
end

--- For TMP Server.
-- @param formvalues Values from web request.
-- @return #bool True if update success.
-- @return #bool, #string False if update failed and return error code.
function account_appset(formvalues)
    local log       = require("luci.model.log").Log(LOG_ID_ACCOUNT)
    local accmgnt   = require "luci.model.accountmgnt"

	--[[
		app use username = 'dropbear'
		c9  use username = 'admin'
		so when app sets new passwd, make username = 'admin' not 'dropbear'
		and don't verify app's username 
	]]
--    local new_acc = "admin"                                                         
--    local new_acc = formvalues["new_acc"]                                           
    local old_acc                                                                     
    local users   = accmgnt.get_name()                                                
    if not users then                                                                 
        old_acc = "admin"                                                             
    else                                                                     
        old_acc = type(users) == "table" and users[1] or users                        
        old_acc = old_acc or "admin"                                                  
    end                                                                               
    local new_acc = old_acc
    local new_pwd = formvalues["new_pwd"]

    if accmgnt.set_no_encrypt(new_acc, new_pwd) then
        log(UPDATE_ACCOUNT, new_acc)  -- Update account (XXX) success
        app_restart_wportal()
        return true
    end

    log(UPDATE_ACC_FAILED)   -- Update account (XXX) failed
    return false, "Set account failed"
end

--- For TMP Server.
-- @param formvalues Values from web request.
-- @return #bool True if update success.
-- @return #bool, #string False if update failed and return error code.
function account_appget(formvalues)
    local accmgnt   = require "luci.model.accountmgnt"
    local users  = accmgnt.get_name()
    local username = type(users) == "table" and users[1] or users
    username = username or "admin"

	if accmgnt.cloud_account_exist() then
		username = accmgnt.get_last_cloud_account()
	end
    local password = accmgnt.get_password(username) or "admin"

    return {
        username = username,
        password = password
    }
end

--- For MCU.
-- @param formvalues Values from web request.
-- @return #bool True if update success.
-- @return #bool, #string False if update failed and return error code.
function account_mcu_write(formvalues, check_name)
    local log     = require("luci.model.log").Log(LOG_ID_ACCOUNT)
    local accmgnt = require "luci.model.accountmgnt"
    local olduser = formvalues["old_acc"]
    local newuser = formvalues["new_acc"]
    local oldpwd  = formvalues["old_pwd"]
    local newpwd  = formvalues["new_pwd"]

    if not check_name then
        local users = accmgnt.get_name()
        olduser = (type(users) == "table" and users[1] or users) or "admin"
        newuser = olduser
    end

    if oldpwd then
        if accmgnt.update_no_encrypt(newuser, newpwd, olduser, oldpwd) then
            log(UPDATE_ACCOUNT, newuser)  -- Update account (XXX) success
            return true
        end
    else
        if accmgnt.set_no_encrypt(newuser, newpwd) then
            log(UPDATE_ACCOUNT, newuser)  -- Update account (XXX) success
            return true
        end
    end

    log(UPDATE_ACC_FAILED)   -- Update account (XXX) failed
    return false, "Set account failed"
end

--- For MCU.
-- @param formvalues Values from web request.
-- @return #bool True if update success.
-- @return #bool, #string False if update failed and return error code.
function account_mcu_read(formvalues)
	local accmgnt  = require "luci.model.accountmgnt"
    local accounts = accmgnt.get_name()
    local password = accmgnt.get_password(accounts[1])

    return {
        acc = accounts[1],
        pwd = password
    }
end

function account_mcu_check(formvalues, check_name)
    local accmgnt  = require "luci.model.accountmgnt"
    local username = formvalues["old_acc"]
    local password = formvalues["old_pwd"]

    if not check_name then
        local users = accmgnt.get_name()
        username = (type(users) == "table" and users[1] or users) or "admin"
    end

    if accmgnt.check_no_encrypt(username, password) then
        return true
    end

    return false
end

--- Read the password recovery info but not the account and password.
-- @param formvalues Values from web request.
-- @return #table Data of password recovery info to be return.
function recovery_read(formvalues)
    local asycrypto = require("luci.model.asycrypto").Crypto("rsa")
    local pubkey = asycrypto.read_pubkey()
    local keys   = {pubkey.n, pubkey.e}
    local data       = recovery_cfg_read(false)
    data["password"] = keys
    data["hide_password_recovery"] = uci_r:get_profile("administration", "hide_password_recovery") or "no"
    return data
end

--- Check the validity of the recovery email info.
-- @param  email The info of recovery email to be check.
-- @return #bool Return true if the info is ok, or false.
function email_check(email)
    if email.enable_rec == "on" then
        if #email.from < 2 or #email.from > 32
            or #email.to < 2 or #email.to > 32
            or #email.smtp < 2 or #email.smtp > 32 
        then
            return false
        end

        if email.enable_auth == "on" then
            if #email.username < 2 or #email.username > 32
                or #email.password < 2 or #email.password > 32
                or email.username:find("[%s%c]") or email.password:find("[%s%c]")
            then
                return false
            end
        end
    end
    return true
end

--- Update the new recovery email info.
-- @param  email_info The info of the recovery email info.
-- @return #bool True if email info update successfully, or false.
function email_update(email_info)
    if email_info.enable_rec ~= "" then
        uci_r:set(ADMINCFG, "account", "recovery", email_info.enable_rec)
        uci_r:set(ADMINCFG, "account", "authentication", email_info.enable_auth)
        uci_r:set(ADMINCFG, "account", "from", email_info.from)
        uci_r:set(ADMINCFG, "account", "to", email_info.to)
        uci_r:set(ADMINCFG, "account", "smtp", email_info.smtp)
        uci_r:set(ADMINCFG, "account", "username", email_info.username)
        -- Due to the password may be not nil
        if email_info.enable_auth == "on" then
            uci_r:set(ADMINCFG, "account", "password", email_info.password)
        else
            uci_r:set(ADMINCFG, "account", "password", "")
        end
        uci_r:commit(ADMINCFG)
        return true
    end
    return false
end

--- Update the account, password and the password recovery info.
-- @param formvalues Values from web request.
-- @return #table Data of password recovery info to be return if update successfully.
-- @return #bool, #string False if update failed and return error code.
function recovery_update(formvalues)
    local log       = require("luci.model.log").Log(LOG_ID_ACCOUNT)
    local asycrypto = require("luci.model.asycrypto").Crypto("rsa")
    formvalues["password"] = asycrypto.decrypt(formvalues["password"]) or ""

    if recovery_cfg_check(formvalues) and recovery_cfg_update(formvalues) then

        if formvalues["enable_rec"] == "on" then
            log(SET_EMAIL, formvalues["from"], formvalues["to"])
            log(PWDREC_SEV_START)  -- Password recovery service start

            if formvalues["enable_auth"] == "on" then
                log(ENABLE_AUTH)  -- Email account authentication
            else
                log(DISABLE_AUTH)  -- No email account authentication
            end
        else
            log(PWDREC_SEV_STOP)  -- Password recovery service stop
        end

        return recovery_cfg_read(false)
    end

    log(SET_EMAIL_FAILED)  -- Recovery email update failed
    return false, "email check failed"
end

--- Read the local management mode.
-- @param  formvalues Values from web request.
-- @return #table Data will be return.
function local_mgnt_read(formvalues)
    return {mode = uci_r:get(ADMINCFG, "local", "mode") or "all"}
end

--- Enable all the devices on LAN to access the web server
-- @param  uci_r
-- @return N/A
function local_enable_all()
    -- Disable white list rule on firewall.
    exec("fw unload_local_mgnt")

    -- Delete the entries from white list.
    uci_r:foreach(ADMINCFG, "device",
        function(section)
            if dtypes.macaddr(section.mac:gsub("%-", ":"))
                and section.enable == "on" 
            then
                exec("fw del_local_mgnt " .. section.mac)
            end
        end
    )
end

--- Enable some of the devices on LAN to access the web server.
-- @param N/A
-- @return N/A
function local_enable_partial()
    -- Enable the white list rule firewall.
    exec("fw load_local_mgnt")

    -- Add the entries into white list.
    uci_r:foreach(ADMINCFG, "device",
        function(section)
            if dtypes.macaddr(section.mac:gsub("%-", ":"))
                and section.enable == "on" 
            then
                exec("fw add_local_mgnt " .. section.mac)
            end
        end
    )
end

--- Get the MAC address of remote device which requesting for web server operation.
-- @param  N/A
-- @return #string Mac address.
-- @return #bool   False if get host mac address failed.
function get_host_mac()
    local usr_ip   = luci.http.getenv("REMOTE_ADDR")
    if ctypes.check_ipv6(usr_ip) then
        -- support ipv6
        local ip_neigh = luci.sys.net.neightable()
        for _, entry in pairs(ip_neigh) do
            if entry["IP address"] == usr_ip then
                return string.upper(entry["HW address"]:gsub(":", "%-"))
            end
        end
    else
        local arptable = luci.sys.net.arptable()
        for _, entry in pairs(arptable) do
            if entry["IP address"] == usr_ip then
                return string.upper(entry["HW address"]:gsub(":", "%-"))
            end
        end
    end

    return false
end

--- Change the Local MAC Authentication mode.
-- If mode == "all", all the devices on the LAN can access the web server.
-- If mode == "partial", only the devices in the list can access the web server.
-- @param formvalues Values from web request.
-- @return #table Data to be return.
function local_mgnt_write(formvalues)
    local log   = require("luci.model.log").Log(LOG_ID_LOCAL)
    local mode  = formvalues["mode"] or "all"
    local old_mode = uci_r:get(ADMINCFG, "local", "mode") or "all"

    -- If mode is not change, return the result directly.
    if mode ~= old_mode then
        if mode == "all" then
            uci_r:set(ADMINCFG, "local", "mode", mode)
            uci_r:commit(ADMINCFG)

            -- Enable all the devices on firewall.
            local_enable_all()
            log(MODE_ALL)  -- Mode change: enable all
        elseif mode == "partial" then
            local hostmac    = get_host_mac()

            local usr_ip   = luci.http.getenv("REMOTE_ADDR")
            -- not remote
            if hostmac ~= false and ctypes.check_ip_in_lan(usr_ip) then
                local new_device = {mac = hostmac, description = "", enable = "on"}
                local form_m = require("luci.tools.form").Form(uci_r)
                form_m:insert(ADMINCFG, "device", new_device, {"mac"})
            end
            uci_r:set(ADMINCFG, "local", "mode", mode)
            uci_r:commit(ADMINCFG)

            -- TODO: Enable only some of the devices on firewall.
            local_enable_partial()
            log(MODE_PARTIAL)  -- Mode change: enable partial
        end
        sys.fork_exec("[ -f /usr/bin/wportalctrl ] && wportalctrl -c && echo stop > /tmp/wportal/status && /etc/hotplug.d/iface/99-wportal")
    end
    return {mode = mode}
end

--- Get the max limited number of the devices.
-- @param  N/A
-- @return #table Data of the max limited number of the devices.
function local_max_devs()
    return {max_rules = uci_r:get_profile("local_mgnt", "max_dev") or 32}
end

--- Read the info of all the devices that are allowed to access the web server.
-- @param formvalues Values from web request.
-- @return #table Data to be return.
function local_devs_read(formvalues)
    local hostmac = get_host_mac()
    local data    = {}

    uci_r:foreach(ADMINCFG, "device",
        function(section)
            table.insert(data, {
                mac         = section.mac,
                description = section.mac == hostmac and "Your PC!" or (section.description or ""),
                enable      = section.enable,
                key         = section.mac:gsub("[^%w]", ""),
                host        = section.mac == hostmac and true or false
            })
        end)

    return data
end

--- Insert a device info to the allow list.
-- @param formvalues Values from web request.
-- @return #table Data to be return.
-- @return #bool, #string False if update failed and return error code.
function local_devs_insert(formvalues)
    local log       = require("luci.model.log").Log(LOG_ID_LOCAL)
    local max_rules = uci_r:get_profile("local_mgnt", "max_dev") or 32
    local new_device = json.decode(formvalues["new"])

    if not local_dev_data_check(new_device) then
        log(INVALID_MAC_ADR) -- Invalid MAC address
        return false, "Invalid MAC address!"
    end

    local form_m = require("luci.tools.form").Form(uci_r)
    local count  = form_m:count("administration", "device") or 0

    -- Device count
    if count < max_rules then

        -- MAC address must be capitalized.
        new_device.mac = string.upper(new_device.mac)

        -- If description is nil, it must be "" instead of nil.
        new_device.description = new_device.description or ""

        -- Length of description must be less than 32.
        new_device.description = new_device.description:sub(1, 32)

        -- Insert the entry to the config file.
        if not form_m:insert(ADMINCFG, "device", new_device, {"mac"}) then
            log(INSERT_FAILED, new_device.mac)
            return false, "Insert failed!"
        end

        uci_r:commit(ADMINCFG)
        log(INSERT_DEVICE, new_device.mac)

        if new_device.enable == "on" then
            exec("fw add_local_mgnt " .. new_device.mac)
        end

        local data = new_device
        data.host  = false
        data.key   = new_device.mac:gsub("[^%w]", "")

        sys.fork_exec("[ -f /usr/bin/wportalctrl ] && wportalctrl -c && echo stop > /tmp/wportal/status && /etc/hotplug.d/iface/99-wportal")
        return data
    else
        log(REACH_MAX_RULES)  -- Reach max rules
        return false, "Device's number is out of range!"
    end
end

--- Update a device info from the allow list.
-- @param formvalues Values from web request.
-- @return #table Data to be return.
-- @return #bool, #string False if update failed and return error code.
function local_devs_update(formvalues)
    local log     = require("luci.model.log").Log(LOG_ID_LOCAL)
    local new_device = json.decode(formvalues["new"])
    local old_device = json.decode(formvalues["old"])

    if not local_dev_data_check(new_device) or not local_dev_data_check(old_device)
        or old_device.mac == get_host_mac()
   
    then
        log(INVALID_MAC_ADR) -- Invalid MAC address
        return false, "Invalid MAC address!"
    end

    -- Format the data
    new_device.mac  = string.upper(new_device.mac)
    old_device.mac  = string.upper(old_device.mac)

    -- This value won't be saved.
    new_device.host = ""
    old_device.host = ""

    -- If description is nil, it must be "" instead of nil.
    new_device.description = new_device.description or ""

    -- Length of description must be less than 32.
    new_device.description = new_device.description:sub(1, 32)

    -- Update the entry from the config file.
    local form_m = require("luci.tools.form").Form(uci_r)
    if not form_m:update(ADMINCFG, "device", old_device, new_device, {"mac"}) then
        log(UPDATE_FAILED, new_device.mac)  -- Update failed
        return false, "Update failed!"
    end
    uci_r:commit(ADMINCFG)

    -- TODO: Update the firewall rule.
    exec("fw del_local_mgnt " .. old_device.mac)
    if new_device.enable == "on" then
        exec("fw add_local_mgnt " .. new_device.mac)
    end

    log(UPDATE_DEVICE, new_device.mac)  -- Update success

    local data = new_device
    data.host = false
    data.key  = new_device.mac:gsub("[^%w]", "")

    sys.fork_exec("[ -f /usr/bin/wportalctrl ] && wportalctrl -c && echo stop > /tmp/wportal/status && /etc/hotplug.d/iface/99-wportal")
    return data
end

--- Remove a device info from the allow list.
-- @param formvalues Values from web request.
-- @return #table Data to be return.
-- @return #bool, #string False if update failed and return error code.
function local_devs_remove(formvalues)
    local log       = require("luci.model.log").Log(LOG_ID_LOCAL)
    local keystr   = formvalues["key"]
    local idxstr = formvalues["index"]

    if not keystr or not idxstr then
        log(INVALID_HTTP_ARGS)  -- Invalid http value!
        return false, "Invalid http value!"
    end

    local keytbl  = (type(keystr) == "table") and keystr or {keystr}
    local idxtbl  = (type(idxstr) == "table") and idxstr or {idxstr}
    local hostkey = get_host_mac():gsub("[^%w]", "")

    -- The MAC address of the device which requesting for this operation was not allowed to delete.
    local index, key
    for i, k in pairs(keytbl) do
        if k == hostkey then
            index = idxtbl[i]
            key = keytbl[i]
            table.remove(idxtbl, i)
            table.remove(keytbl, i)
            break
        end
    end

    -- Cache all the entries' MAC address.
    local macs  = {}
    uci_r:foreach(ADMINCFG, "device",
        function(section)
            macs[#macs + 1] = section["mac"]
        end
    )

    -- Delete the entries from the config file.
    local form_m = require("luci.tools.form").Form(uci_r)
    local ret    = form_m:delete(ADMINCFG, "device", keytbl, idxtbl)
    if not ret then
        log(DELETE_FAILED)   -- Delete devices failed.
        return false, "Delete failed!"
    end
    uci_r:commit(ADMINCFG)

    -- Delete the firewall rule from white list.
    local success = false
    for _, entry in pairs(ret)  do
        if entry.success then
            exec("fw del_local_mgnt " .. macs[tonumber(entry.index) + 1])
            success = true
            log(DELETE_DEVICE, macs[tonumber(entry.index) + 1])   -- Delete devices success.
        end
    end

    if success then                   -- It means some of the entries had been deleted successfully.
        if key and index then
            table.insert(ret, {key = key, index = index, success = false})
        end

        sys.fork_exec("[ -f /usr/bin/wportalctrl ] && wportalctrl -c && echo stop > /tmp/wportal/status && /etc/hotplug.d/iface/99-wportal")
        return ret
    else
        log(DELETE_FAILED)   -- Delete devices failed.
        return false, "Delete failed!!"
    end
end

--- Get the existing local device list from client management and wireless.
-- @param formvalues Values from web request.
-- @return #table Data to be return.
-- @return #bool, #string False if update failed and return error code.
function local_devs_view(formvalues)
    local log     = require("luci.model.log").Log(LOG_ID_LOCAL)
    local climgmt = require "luci.model.client_mgmt"
    
    local devs = climgmt.get_client_list_dev()
    if not devs then
        log(NO_DEVICE_FOUND)  -- No device data
        return false, "No device data!"
    end

    local dev_list = {}
    for _, dev in pairs(devs) do
        dev_list[#dev_list + 1] = {
            mac  = dev.mac,
            ip   = dev.ip,
            name = dev.hostname or "network device"
        }
    end

    return dev_list
end

--- Read the local https enable status.
-- @param  formvalues Values from web request.
-- @return #table Data will be return.
function local_mgnt_https_read(formvalues)    
    return {https_enable = uci_r:get(ADMINCFG, "local", "https_enable") or "off"}
end

--- Change the Local HTTPS enable status.
-- If https_enable == "off", devices access the web server via http if remote is off.
-- If https_enable == "on", devices access the web server via https.
-- @param formvalues Values from web request.
-- @return #table Data to be return.
function local_mgnt_https_write(formvalues)
    local log   = require("luci.model.log").Log(LOG_ID_LOCAL)
    local enable  = formvalues["https_enable"] or "off"
    local old_enable = uci_r:get(ADMINCFG, "local", "https_enable") or "off"

    -- If status is not change, return the result directly.    
    if enable ~= old_enable then
        -- reload uhttpd
        local _ubus = ubus.connect()
        local res = _ubus:call("uhttpd", "local_update", {https_enable = enable})
        if not res or not res.re or tonumber(res.re) ~= 0 then
            return false, "reload uhttpd failed!"
        end

        -- save config
        uci_r:set(ADMINCFG, "local", "https_enable", enable)
        uci_r:commit(ADMINCFG)

        -- set firewall rule
        if enable == "on" then
            --exec("fw del_local_https")
            log(LOCAL_HTTPS_ON)  -- HTTPS enable on 
        else
            --exec("fw add_local_https")
            log(LOCAL_HTTPS_OFF)  -- HTTPS enable off 
        end  
    end
    return {https_enable = enable}
end

local function get_wan_ipaddr()	
	local nw      = require("luci.model.nwcache").init()
    local ifaces  = {"internet", "wan"}    
    local net     = nil
    local ipaddr  = nil
    local netmask = nil

    for _, iface in ipairs(ifaces) do
        net = nw:get_network(iface)
        if net then
            ipaddr  = net:ipaddr()
            netmask = net:netmask()
            if ipaddr and netmask then
                return ipaddr
            end
        end
    end

    return "0.0.0.0"
end

--- Read the port and IP address that are opened to the remote devices to access the web server.
-- @param formvalues Values from web request.
-- @return #table DAta to be return.
function remote_mgnt_read_without_https(formvalues)
    return remote_cfg_read()
end

--- Read the port and IP address that are opened to the remote devices to access the web server.
-- @param formvalues Values from web request.
-- @return #table DAta to be return.
function remote_mgnt_read_with_https(formvalues)
    local remoteipaddr = sys.getenv("REMOTE_ADDR")
    local remote = not ctypes.check_ip_in_lan(remoteipaddr)

    local data = {}
    
    -- enable is changed to enable and managers, wl, 2017-10-16
    -- config: enable(off/all/partial)
    -- web: enable(off/on), managers(all/specified)
    local enable = uci_r:get(ADMINCFG, "remote", "enable") or "off"
    if enable == "all" then
        data.enable = "on"
        data.managers = "all"
    elseif enable == "partial" then
        data.enable = "on"
        data.managers = "specified"
    else
        data.enable = "off"
        data.managers = "all"
    end
    
    local wan_ip = get_wan_ipaddr()
    local https_port = uci_r:get(ADMINCFG, "remote", "https_port") or "443"
    data.web_address = "https://%s:%s" % {wan_ip, https_port}
    data.http_port   = uci_r:get(ADMINCFG, "remote", "port") or "80"
    data.https_port   = https_port        
    data.ipaddr = uci_r:get(ADMINCFG, "remote", "ipaddr")
    data.remote = remote
    
    return data
end

--- Read the port and IP address that are opened to the remote devices to access the web server.
-- @param formvalues Values from web request.
-- @return #table DAta to be return.
function remote_mgnt_read(formvalues)
    local data = {}
	
    local https_support = uci_r:get_profile("https_mgnt", "https_support") or "no"

    if https_support == "yes" then
        data = remote_mgnt_read_with_https(formvalues)
    else
        data = remote_mgnt_read_without_https(formvalues)
    end
    
    return data
end

--- Delete a entry from firewall.
-- @param port
-- @param ip
-- @return #bool
function remote_del_entry(enable, port, ip)
    if port then
        if enable == "all" then
            exec("fw del_remote_mgnt port " .. port)
            --exec("nat del http")
        elseif ip and enable == "partial" then
            exec("fw del_remote_mgnt port " .. port .. " ip " .. ip)
            --exec("nat del http")
        end
        return true
    end
    return false
end

--- Add a entry from firewall.
-- @param port
-- @param ip
-- @return #bool
function remote_add_entry(enable, port, ip)
    if port then
        if enable == "all" then
            exec("fw add_remote_mgnt port " .. port)
            --exec("nat add http { 255.255.255.255 " .. port .. " }")
        elseif ip and enable == "partial" then
            exec("fw add_remote_mgnt port " .. port .. " ip " .. ip)
            --exec("nat add http { " .. ip .. " " .. port .. " }")
        end
        return true
    end
    return false
end

--- Delete a entry from firewall.
-- @param http_port
-- @param https_port
-- @param ip
-- @return #bool
function remote_del_entry_with_https(enable, http_port, https_port, ip)
    if http_port and https_port then
        if enable == "all" then
            exec("fw del_remote_mgnt_with_https http_port " .. http_port .. " https_port " .. https_port)
            exec("nat del http")
            exec("nat del https")
        elseif ip and enable == "partial" then
            exec("fw del_remote_mgnt_with_https http_port " .. http_port .. " https_port " .. https_port .. " ip " .. ip)
            exec("nat del http")
            exec("nat del https")
        end
        return true
    end
    return false
end

--- Add a entry from firewall.
-- @param http_port
-- @param https_port
-- @param ip
-- @return #bool
function remote_add_entry_with_https(enable, http_port, https_port, ip)
    if http_port and https_port then
        if enable == "all" then
            exec("fw add_remote_mgnt_with_https http_port " .. http_port .. " https_port " .. https_port)
            exec("nat add http { 255.255.255.255 " .. http_port .. " }")
            exec("nat add https { 255.255.255.255 " .. https_port .. " }")
        elseif ip and enable == "partial" then
            exec("fw add_remote_mgnt_with_https http_port " .. http_port .. " https_port " .. https_port .. " ip " .. ip)
            exec("nat add http { " .. ip .. " " .. http_port .. " }")
            exec("nat add https { " .. ip .. " " .. https_port .. " }")
        end
        return true
    end
    return false
end


--- Change the port and IP address that are opened to the remote devices to access the web server.
-- @param formvalues Values from web request.
-- @return #table Data to return.
function remote_mgnt_write_without_https(formvalues)
    local log    = require("luci.model.log").Log(LOG_ID_REMOTE)
    local enable  = formvalues["enable"]
    local port    = formvalues["port"]
    local ip      = formvalues["ipaddr"]
    local old_cfg = remote_cfg_read()

    if not remote_cfg_check(formvalues) then
            log(INVALID_PORT_ADR)   -- Invalid port or ip
        return false, "Invalid ip or port!"
    end

    remote_cfg_update(formvalues)
    remote_del_entry(old_cfg.enable, old_cfg.port, old_cfg.ipaddr)

    -- Add the new entry to firewall and nat. "255.255.255.255" for all and "0.0.0.0" for none.
    if enable ~= "off" then
        if enable == "all" then
            log(UPDATE_REMOTE_P, port)  -- Save success. port (XX)
        else
            log(UPDATE_REMOTE, ip, port)  -- Save success. IP (XX), port (XX)
        end
        log(SERVICE_START)            -- Service start
        remote_add_entry(enable, port, ip)        
    else
        log(SERVICE_STOP)            -- Service stop
    end

    return remote_cfg_read()
end

--- Change the port and IP address that are opened to the remote devices to access the web server.
-- @param formvalues Values from web request.
-- @return #table Data to return.
function remote_mgnt_write_with_https(formvalues)
    local log    = require("luci.model.log").Log(LOG_ID_REMOTE)
    local remote_en = formvalues["enable"] or "off"
    local http_port  = formvalues["http_port"] or ""
    local https_port = formvalues["https_port"] or ""
    local managers   = formvalues["managers"] or "all"
    local ip     = formvalues["ipaddr"] or ""
    local old_enable = uci_r:get(ADMINCFG, "remote", "enable") or "off"
    local old_port   = uci_r:get(ADMINCFG, "remote", "port") or "80"
    local old_sport  = uci_r:get(ADMINCFG, "remote", "https_port") or "443"
    --local old_managers  = uci_r:get(ADMINCFG, "remote", "managers") or "all"
    local old_ip     = uci_r:get(ADMINCFG, "remote", "ipaddr")

    -- enable is changed to enable and managers, wl, 2017-10-16
    -- config: enable(off/all/partial)
    -- web: enable(off/on), managers(all/specified)
    if remote_en == "on" and managers == "specified" then
        enable = "partial"
    elseif remote_en == "on" then
        enable = "all"
    else
        enable = "off"
    end
    
    -- 1. check params
    if enable ~= "off" then
        if enable == "partial" then
            if ip == "" or not dtypes.ipaddr(ip) or ctypes.check_ip_in_lan(ip)
                or not ctypes.check_unicast_ipv4(ip)
            then
                log(INVALID_PORT_ADR)   -- Invalid port or ip
                return false, "Invalid ip!"
            end
        end

        http_port = tonumber(http_port) or ""
        https_port = tonumber(https_port) or ""
        if http_port == "" or (http_port < 1024 and http_port ~= 80) or http_port > 65535 then
            log(INVALID_PORT_ADR)   -- Invalid port or ip
            return false, "Invalid http port!"
        elseif https_port == "" or (https_port == http_port) or (https_port < 1024 and https_port ~= 443) 
                or https_port > 65535 then
            log(INVALID_PORT_ADR)   -- Invalid port or ip
            return false, "Invalid https port!"
        end
    end
    
    -- 2. update_remote of uhttpd
    local _ubus = ubus.connect()
    local remote_cfg = {}
    remote_cfg.enable = enable
    if enable ~= "off" then
        remote_cfg.http_port = http_port
        remote_cfg.https_port = https_port
    end
    local res = _ubus:call("uhttpd", "remote_update", remote_cfg)
    if not res or not res.re or tonumber(res.re) ~= 0 then
        return false, "reload uhttpd failed!"
    end
    
    -- 3. Save the new config to the file.
    uci_r:set(ADMINCFG, "remote", "enable", enable)
    if enable ~= "off" then
        --uci_r:set(ADMINCFG, "remote", "managers", managers)
        uci_r:set(ADMINCFG, "remote", "port", http_port)
        uci_r:set(ADMINCFG, "remote", "https_port", https_port)
        if enable == "partial" then
            uci_r:set(ADMINCFG, "remote", "ipaddr", ip)
        end
    end
    uci_r:commit(ADMINCFG)

    -- 4. update firewall and nat entry
    -- check nat config, add https if needed
    local nat_norder = uci_r:get("nat", "nat", "norder") or ""
    if not string.find(nat_norder, "https") then
        nat_norder = "https " .. nat_norder
        uci_r:set("nat", "nat", "norder", nat_norder)
        uci_r:commit("nat")
    end    
    
    -- Delete the old entry from firewall and nat.
    remote_del_entry_with_https(old_enable, old_port, old_sport, old_ip)

    -- Add the new entry to firewall and nat. "255.255.255.255" for all and "0.0.0.0" for none.
    if enable ~= "off" then
        if enable == "all" then
            log(UPDATE_REMOTE_HTTPS_P, http_port, https_port)  -- Save success. ports (XX/XX)
        else
            log(UPDATE_REMOTE_HTTPS, ip, http_port, https_port)  -- Save success. IP (xx), ports (XX/XX)
        end
        log(SERVICE_START)            -- Service start
        remote_add_entry_with_https(enable, http_port, https_port, ip)        
    else
        log(SERVICE_STOP)            -- Service stop
    end
    
    return remote_mgnt_read_with_https()
end

--- Change the port and IP address that are opened to the remote devices to access the web server.
-- @param formvalues Values from web request.
-- @return #table Data to return.
function remote_mgnt_write(formvalues)
    local data = {}
	
    local https_support = uci_r:get_profile("https_mgnt", "https_support") or "no"

    if https_support == "yes" then
        data = remote_mgnt_write_with_https(formvalues)
    else
        data = remote_mgnt_write_without_https(formvalues)
    end
    
    return data
end

--- Get DUT IP address.
-- @param mode "LAN" or "WAN"
-- @return #string IP address.
function get_ip(mode)
    local network = require ("luci.model.network").init()
    local net     = network:get_network(mode)
    return net:ipaddr()
end

--- 检查IP是否与DUT的IP统一网段?-- @param mode "LAN" or "WAN"
-- @param ip   IP address to be check.
-- @return #bool True or false.
function check_ip(mode, ip)
    local ip_check
    if mode == "lan" then
        ip_check = get_ip("lan")
    elseif mode == "wan" then
        ip_check = get_ip("wan")
    end

    local pos1 = 0
    local pos2 = 0
    for i = 1, 3 do
        pos1 = ip_check:find("%.", pos1 + 1)
        pos2 = ip:find("%.", pos2 + 1)
    end

    if ip:sub(1, pos2) == ip_check:sub(1, pos1) then 
        return true
    else 
        return false 
    end
end

--- Check if the email work successfully.
-- @param N/A
-- @return #bool True or false.
function recovery_testmail()
    local pwdrec = require "luci.model.passwd_recovery"
    local enable_rec = uci_r:get(ADMINCFG, "account", "recovery") or "off"
    if enable_rec ~= "on" then
        return false, "recovery enable is off"
    end

    local message = "Please do not reply to this email.\r\n\r\n"
        .. "This is a testing mail.\r\n\r\n"

    return pwdrec.vercode_send(message)
end

function login_read()
    local data = {
        preempt = uci_r:get(ADMINCFG, "login", "preempt")
    }
    return data
end

function login_write(http_form)
    local preempt = http_form["preempt"]
    if not ctypes.check_onoff(preempt) then
        return false, "invalid args"
    end

    if login_read().preempt ~= preempt then
        uci_r:set(ADMINCFG, "login", "preempt", preempt)
        uci_r:commit(ADMINCFG)
    end
    return {
        preempt = preempt
    }
end

--- Dispatch table
local dispatch_tbl = {
    ["account"] = {
        ["read"]   = {cb = account_read},
        ["write"]  = {cb = account_update},
        ["set"]    = {cb = account_set},
        ["appset"] = {cb = account_appset},
        ["appget"] = {cb = account_appget},
        ["mcu_read"]  = {cb = account_mcu_read},
        ["mcu_write"] = {cb = account_mcu_write, args = false},
        ["mcu_check"] = {cb = account_mcu_check, args = false},
        ["mobile_write"]     = {cb = account_mobile_update},
    },
    ["recovery"] = {
        ["read"]   = {cb = recovery_read},
        ["write"]  = {cb = recovery_update},
    },
    ["mode"] = {
        ["read"]   = {cb = local_mgnt_read},
        ["write"]  = {cb = local_mgnt_write},
    },
    ["local"] = {
        ["load"]   = {cb = local_devs_read,   others = local_max_devs},
        ["insert"] = {cb = local_devs_insert, others = local_max_devs},
        ["update"] = {cb = local_devs_update, others = local_max_devs},
        ["remove"] = {cb = local_devs_remove, others = local_max_devs},
    },
    ["view"] = {
        ["load"]   = {cb = local_devs_view},
    },
    ["https"] = {
        ["read"]   = {cb = local_mgnt_https_read},
        ["write"]  = {cb = local_mgnt_https_write},
    },
    ["remote"] = {
        ["read"]   = {cb = remote_mgnt_read},
        ["write"]  = {cb = remote_mgnt_write},
    },
    ["testmail"] = {
        [".super"] = {cb = recovery_testmail},
    },
    ["login"] = {
        ["read"] = {cb = login_read},
        ["write"] = {cb = login_write},
    },
}

function dispatch(http_form)
    return ctl.dispatch(dispatch_tbl, http_form)
end

function _index()
    return ctl._index(dispatch)
end

--- Module entrance
function index()
    entry({"admin", "administration"}, call("_index")).leaf = true
end
