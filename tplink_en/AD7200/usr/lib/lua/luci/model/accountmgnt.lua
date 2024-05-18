--[[
Copyright(c) 2013 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  accountmgnt.lua
Details :  Account management for web server login user.
Author  :  Zhang Zhongwei <zhangzhongwei@tp-link.net>
Version :  1.0.0
Date    :  15 Apr, 2014
]]--

module ("luci.model.accountmgnt", package.seeall)


local nixio     = require "nixio"
local dbg       = require "luci.tools.debug"
local crypto    = require "luci.model.crypto"

local uci_r     = require("luci.model.uci").cursor()
local asycrypto = require("luci.model.asycrypto").Crypto("rsa")
local sys 		= require "luci.sys"
local dtypes   = require "luci.tools.datatypes"

local timeset   = require "luci.controller.admin.timesetting"

local ACCCFG  = "accountmgnt"
local TMPKEY  = "who are you?"

--- Encrypt the password by using AES algorithm.
-- @param  password    Password to be encrypted. 
-- @return             String after encrypted (in base64 format).
function aes_encrypt(password)
    if not password then 
        return false 
    end
    
    local pwd = crypto.enc(password, TMPKEY, true)
    local tmp = pwd()
    local pwd_str = ""
    while tmp do
        pwd_str = pwd_str .. tmp
        tmp = pwd()
    end
    return nixio.bin.b64encode(pwd_str)
end

--- Decrypt the password by using AES algorithm.
-- @param  password    Password to be decrypted (in base64 format). 
-- @return             String after decrypted.
function aes_decrypt(password)
    if not password then
        return false 
    end

    local binpwd = nixio.bin.b64decode(password)
    local pwd = crypto.dec(binpwd, TMPKEY, true)
    local tmp = pwd()
    local pwd_str = ""
    while tmp do
        pwd_str = pwd_str .. tmp
        tmp = pwd()
    end
    return pwd_str
end

--- Read all the accounts.
-- @param  N/A
-- @return table Table of all the accounts.
function get_name()
    local accounts = {}
    uci_r:foreach(ACCCFG, "account",
        function(section)
            accounts[#accounts + 1] = section["username"]
        end
    )

    if #accounts == 0 then
        return nil
    end

    return accounts
end

local ACCOUNT_CFG_NAME = "account"
local CLOUD_ACCOUNT_CFG_NAME = "cloud_account"

--- Is default config.
-- @param  N/A
-- @return true/false
function is_dft_cfg()
	local defaultflag = true
	local need_unbind = uci_r:get("cloud_config", "device_status", "need_unbind")
	uci_r:foreach(ACCCFG, ACCOUNT_CFG_NAME,
		function(section)
			if section["password"] then
				defaultflag = false
			end
		end
	)
	uci_r:foreach(ACCCFG, CLOUD_ACCOUNT_CFG_NAME,
		function(section)
			if section["password"] and tonumber(need_unbind) == 0 then
				defaultflag = false
			end
		end
	)
	return defaultflag
end

function get_last_cloud_account()
	local account
	account = nil
	uci_r:foreach(ACCCFG, CLOUD_ACCOUNT_CFG_NAME,
			function(section)
				if section["username"] then
					account = section["username"]
				end
			end
		)
	return account
end

--- If have cloud account.
-- @param  N/A
-- @return true/false
function cloud_account_exist()
	local existflag = false
	local need_unbind = uci_r:get("cloud_config", "device_status", "need_unbind")
	
	if tonumber(need_unbind) == 1 then
		return false
	end
	
	uci_r:foreach(ACCCFG, "cloud_account",
		function(section)
			if section["password"] then
				existflag = true
			end
		end
	)
	return existflag
end

--- Get password by account name.
-- @param  username
-- @return password   false means no such account, "" means default config.

function get_password(username)
	if is_dft_cfg() then
		return ""
    end

	if cloud_account_exist() then
    local password = false
		local havename = false
		uci_r:foreach(ACCCFG, CLOUD_ACCOUNT_CFG_NAME,
        function(section)
				if username == section["username"] then
					if section["password"] then
                password = aes_decrypt(section["password"])
            end
					havename = true
				end
        end
    )
    
		return password
	else
		local password = false
		local havename = false
		uci_r:foreach(ACCCFG, ACCOUNT_CFG_NAME,
			function(section)
				--use the first pwd
				if password == false then
					password = aes_decrypt(section["password"])
					if password then
						havename = true
    end
				end
			end
		)
		if havename == false then
			return false
		end
		dbg.print("get_password pwd "..password)
    return password
end
end

--- Check whether the account's name and password are valid.
-- @param  username
-- @param  password Password in hex.
-- @return bool
function check(username, password)
    if not username or not password then
        return false
    end

    password = asycrypto.decrypt(password)
    if not password then
        return false 
    end

    local acc_pwd = {}
    uci_r:foreach(ACCCFG, "account",
        function(section)
            acc_pwd[section["username"]] = section["password"] or ""
        end
    )

    if acc_pwd[username] then
        -- For first time login
        if acc_pwd[username] == "" and username == "admin" then 
            reset()
            return password == "admin" and "admin" or false
        elseif password == aes_decrypt(acc_pwd[username]) then
            return password
        end
    end

    return false
end

--- Check whether the account's name and password are valid. (no encrypt)
-- @param  username
-- @param  password
-- @return bool
function check_no_encrypt(username, password)
    if not username or not password then
        return false
    end

    local acc_pwd = {}
    uci_r:foreach(ACCCFG, "account",
        function(section)
            acc_pwd[section["username"]] = section["password"] or ""
        end
    )

    if acc_pwd[username] then
        -- For first time login
        if acc_pwd[username] == "" and username == "admin" then 
            reset()
            return password == "admin" and "admin" or false
        elseif password == aes_decrypt(acc_pwd[username]) then
            return password
        end
    end

    return false
end

--- Check whether the string's codeset is ASCII. (no encrypt)
-- @param  username
-- @param  password
-- @return bool
function ascii_visible_check(str)
    if not str or str == "" then 
        return false 
    end
    
    local pos = 1
    for pos = 1, #str do
        local num = string.byte(str, pos)
        if num < 33 or num > 126 then 
            return false 
        end
    end
    return true
end

--- Check whether the account string is valid. (no encrypt)
-- @param  username
-- @param  password
-- @return bool
local function account_str_valid(str)
    if str == nil then
        return false
    elseif not dtypes.rangelength(str, 1, 15) then
        return false
    elseif not str:find("^[a-zA-Z0-9_]+$") then
        return false
    end

    return true
end

--- Check whether the strings of name and password are valid.
-- @param  username
-- @param  password
-- @return bool
function validity_check(username, password)
    password = password or ""
    username = username or ""

    if #username > 15 or #username < 1
        or not account_str_valid(username) then
        return false
    end

    if #password > 15 or #password < 1
        or not ascii_visible_check(password) then
        return false
    end
    return password
end

--- Add a new account.
-- @param  username
-- @param  password
-- @return bool
function add(username, password)
    password = asycrypto.decrypt(password)
    if not password or not validity_check(username, password) then
        return false
    end

    -- The same name of user has existed.
    local accounts = get_name()
    if accounts and accounts[username] then 
        return false 
    end

    local b64pwd = aes_encrypt(password)

    uci_r:section(ACCCFG, "account", "", {
        username = username,
        password = b64pwd
    })
    uci_r:commit(ACCCFG)
    return true
end

--- Delete the account.
-- @param  username
-- @param  password
-- @return bool
function delete(username, password)
    if not check(username, password) then
        return false
    end

    local sname
    uci_r:foreach(ACCCFG, "account",
        function(section)
            if section.username == username then
                sname = section[".name"]
            end
        end
    )
    uci_r:delete(ACCCFG, sname)
    uci_r:commit(ACCCFG)
    return true
end

--- Update the account.
-- @param  username
-- @param  password
-- @return bool
function update(newname, newpasswd, oldname, oldpasswd)
    local password = asycrypto.decrypt(newpasswd)
    if not check(oldname, oldpasswd)
        or not validity_check(newname, password)
    then
        return false
    end

    local sname
    uci_r:foreach(ACCCFG, "account",
        function(section)
            if section.username == oldname then
                sname = section[".name"]
            end
        end
    )

    local b64pwd = aes_encrypt(password)

    uci_r:section(ACCCFG, "account", sname, {
        username = newname,
        password = b64pwd
    })
    uci_r:commit(ACCCFG)

    return true
end

--- Update the account( no encrypt ).
-- @param  username
-- @param  password
-- @return bool
function update_no_encrypt(newname, newpasswd, oldname, oldpasswd)
    if not check_no_encrypt(oldname, oldpasswd)
        or not validity_check(newname, newpasswd) 
    then
        return false
    end

    local sname
    uci_r:foreach(ACCCFG, "account",
        function(section)
            if section.username == oldname then
                sname = section[".name"]
            end
        end
    )

    local b64pwd = aes_encrypt(newpasswd)

    uci_r:section(ACCCFG, "account", sname, {
        username = newname,
        password = b64pwd
    })
    uci_r:commit(ACCCFG)

    return true
end

--- Reset the account to "admin/admin".
-- @param  username
-- @param  password
-- @return bool
function reset()
    local b64pwd = aes_encrypt("admin")

    uci_r:delete_all(ACCCFG, "account")

    local name = uci_r:add(ACCCFG, "account")
    uci_r:section(ACCCFG, "account", name, {
        username = "admin",
        password = b64pwd
    })
    timeset.ts_commit_neglect()
    uci_r:commit(ACCCFG)
    timeset.ts_commit_normal()

    return true
end

--- Set the account.
-- @param  username
-- @param  password
-- @return bool
function set_no_encrypt(username, password)
    if not password or not validity_check(username, password) then
        return false
    end

    local b64pwd = aes_encrypt(password)

    uci_r:delete_all(ACCCFG, "account")

    local name = uci_r:add(ACCCFG, "account")
    uci_r:section(ACCCFG, "account", name, {
        username = username,
        password = b64pwd
    })
    uci_r:commit(ACCCFG)

    return true
end

--- Set the account.
-- @param  username
-- @param  password
-- @return bool
function set(username, password)
    password = asycrypto.decrypt(password)
    return set_no_encrypt(username, password)
end


function cloud_acc_check(username, password)
    if not username or not password then
        return false
    end

    local acc_pwd = {}
	local CLOUD_TMP_DIR = "/tmp/cloud/"
	local LOGIN_STATUS = CLOUD_TMP_DIR .. "login_status"
	
    uci_r:foreach(ACCCFG, CLOUD_ACCOUNT_CFG_NAME,
        function(section)
            acc_pwd[section["username"]] = section["password"] or ""
        end
    )

    if acc_pwd[username] then
        if password == aes_decrypt(acc_pwd[username]) then
			if not nixio.fs.access(CLOUD_TMP_DIR) then
				sys.call("mkdir -p %s" % {CLOUD_TMP_DIR})
			end
			sys.call("echo 0 > %s" % {LOGIN_STATUS})
            return password
        end
    end

    return false
end

function get_cloud_username()
    local accounts = {}
    uci_r:foreach(ACCCFG, CLOUD_ACCOUNT_CFG_NAME,
        function(section)
            accounts[#accounts + 1] = section["username"]
        end
    )

    if #accounts == 0 then
        return nil
    end

    return accounts
end

function set_cloudAccount(username, password)
    local b64pwd = aes_encrypt(password)

    uci_r:delete_all(ACCCFG, CLOUD_ACCOUNT_CFG_NAME)

    local name = uci_r:add(ACCCFG, CLOUD_ACCOUNT_CFG_NAME)
    uci_r:section(ACCCFG, CLOUD_ACCOUNT_CFG_NAME, name, {
        username = username,
        password = b64pwd
    })
    uci_r:commit(ACCCFG)

    return true
end