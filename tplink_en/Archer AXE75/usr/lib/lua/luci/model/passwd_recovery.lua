--[[
Copyright(c) 2008-2014 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  passwd_recovery.lua
Details :  Reset the account and password by sending email.
Author  :  Zhang Zhongwei <zhangzhongwei@tp-link.net>
Version :  1.0.0
Date    :  03 Apr, 2014
]]--

module("luci.model.passwd_recovery", package.seeall)

local dbg      = require "luci.tools.debug"
local uci_r    = require("luci.model.uci").cursor()

local TMP_FILE = "/tmp/vercode"
local ATTEMPTS_FILE = "/tmp/vercode-attempts"
local ADMINCFG = "administration"
local TIMEOUT  = 600  -- senconds
local ATTEMPTS_MAX = 5

local MODEL    = uci_r:get("locale", "sysinfo", "model") or "TP-Link"


--- Read the information about whether using email recovery.
-- @param N/A
-- @return      Table
function recovery_read()
    local enable_rec = uci_r:get(ADMINCFG, "account", "recovery") or "off"
    local email      = uci_r:get(ADMINCFG, "account", "to")
    local asycrypto = require("luci.model.asycrypto").Crypto("rsa")
    local pubkey = asycrypto.read_pubkey()
    local keys   = { pubkey.n, pubkey.e }

    if enable_rec == "on" then
        if not email or not email:find("@") then 
            return false 
        end

        local pos = email:find("@")
        local postfix = email:sub(pos)
        local prefix
       
        pos = pos > 0 and pos - 1 or 0
        if pos < 3 then
            prefix = email:sub(1, pos)
        else
            prefix = email:sub(1, 3)
        end
    
        return {
            enable_rec = true,
            email      = prefix .. "**" .. postfix,
            password   = keys
        }
    else
        return { enable_rec = false}
    end
end

--- Get the verification code by email, and save the code in tmp file.
-- @param N/A
-- @return      The result.
function vercode_get()
    local vercode = nil
    local enable_rec = uci_r:get(ADMINCFG, "account", "recovery") or "off"
    if enable_rec ~= "on" then
        return false, "recovery enable is off"
    end

    local file    = io.open(TMP_FILE, "r")

    if file then
        local nixio = require "nixio"
        local mtime = nixio.fs.stat(TMP_FILE, "mtime")
        local ctime = os.time()
        local ttime = ctime - mtime

        if ttime < TIMEOUT then
            vercode = file:read("*all")
        end
        file:close()
    end

    if not vercode then

        -- Generate and save the verification code.
	local seed = 0
        local data
        local file = io.open("/dev/urandom", "rb")
        
        if file then
            data = file:read(4)
            file:close()
        end
        
        for i = 1, 4 do
            seed = seed * 256 + string.byte(data, i)
        end
    
        math.randomseed(seed%10000000)
        vercode = math.random(100000, 999999)
        file    = io.open(TMP_FILE, "w")
        if not file then 
            return false, "Create verification code failed!"
        end

        file:write(vercode)
        file:close()

	luci.sys.fork_call("echo 0 > "..ATTEMPTS_FILE)
    end

    local message = "Please do not reply to this email.\r\n\r\n"
        .. "Your verification code is " .. vercode .. ".\r\n\r\n"

    return vercode_send(message)
end

--- Send email.
-- @param  vercode Verification code to be sent.
-- @return      The result.
function vercode_send(message)
    local email = require "luci.model.email"

    local enable_auth = uci_r:get(ADMINCFG, "account", "authentication")

    -- Get the email information and send the message.
    local username = uci_r:get(ADMINCFG, "account", "username")
    local password = uci_r:get(ADMINCFG, "account", "password")
    local server   = uci_r:get(ADMINCFG, "account", "smtp")
    local from     = uci_r:get(ADMINCFG, "account", "from")
    local to       = uci_r:get(ADMINCFG, "account", "to")

    local head = {
        from    = MODEL .. from,
        to      = to,
        subject = MODEL .. ": Password Recovery!"
    }

    local source = {
        headers = head,
        body = message
    }

    local ret, err = email.send({
        server   = server,
        user     = enable_auth == "on" and username or nil,
        password = enable_auth == "on" and password or nil,
        from     = from,
        rcpt     = to,
    }, source)

    return ret, "00000266"
end

--- Check the verification code. The verification code won't be changed in 10 minutes.
-- @param code      Verification code to be check.
-- @return          The result.
function vercode_check(code)
    if not code then
        return false, "Parameter is null!"
    end

    local log   = require("luci.model.log").Log(280)
    local nixio = require "nixio"
    local mtime = nixio.fs.stat(TMP_FILE, "mtime")

    if not mtime then 
        return false, "00000264"
    end
    
    local ctime = os.time()
    local ttime = ctime - mtime

    if ttime > TIMEOUT then
        log(152)   -- Verification code is time out!
        return false, "00000264"
    end

    local file = io.open(TMP_FILE, "r")
    if not file then
        log(153)   -- Verification code is not generated yet!
        return false, "00000264"
    end

    local vercode = file:read("*all") or ""
    file:close()

    if code ~= "" and vercode ~= ""
        and tonumber(code) == tonumber(vercode) then
		
        return {vercode = code}
    end
	
	local attempts = {}
	file = io.open(ATTEMPTS_FILE, "r")
    if not file then
        attempts = 0
    else
		attempts = tonumber(file:read("*all")) or 0
		file:close()
	end
	attempts = attempts + 1
	if attempts >= ATTEMPTS_MAX then
		luci.sys.fork_call("rm " .. ATTEMPTS_FILE)
		luci.sys.fork_call("rm " .. TMP_FILE)
		return false, "00000265"
	else
		luci.sys.fork_call("echo "..attempts.." > "..ATTEMPTS_FILE)
	end

    log(151)  -- Incorrect verification code
    return false, "00000264"
end

function vercode_check_again(code)
    if not code then
        return false
    end

    local file = io.open(TMP_FILE, "r")
    if not file then
        return false
    end
    local vercode = file:read("*all") or ""
    file:close()

    if code ~= "" and vercode ~= ""
        and tonumber(code) == tonumber(vercode) then
		
        return true
    end

    return false
end

function recovery_write(formvalues)
	if not formvalues or not formvalues.vercode then
        return false, "Parameter is null!"
    end
    
	if vercode_check_again(formvalues.vercode) ~= true then
		luci.sys.fork_call("rm " .. TMP_FILE)
		luci.sys.fork_call("rm " .. ATTEMPTS_FILE)
		return false, "Incorrect verification code!"
	end
	
	local new_acc = formvalues.account or ""
    local new_pwd = formvalues.password or ""
    local cfm_flag = formvalues.confirm or ""
	local accmgnt = require "luci.model.accountmgnt"
	
	if new_acc == "" then
		local accounts = accmgnt.get_name()
        if accounts and #accounts==1 then
            new_acc = accounts[1]
        end
	end
    if cfm_flag and accmgnt.set(new_acc, new_pwd) then
		-- Remove the luci sessions.
		luci.sys.fork_call("rm " .. TMP_FILE)
		luci.sys.fork_call("rm " .. ATTEMPTS_FILE)
		luci.sys.fork_call("rm -rf /tmp/luci*")
		
        return true
    end

    return false, "00000260"
end
