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
local ctypes    = require "luci.model.checktypes"

local uci_r     = require("luci.model.uci").cursor()
local asycrypto = require("luci.model.asycrypto").Crypto("rsa")
local dtypes	= require "luci.tools.datatypes"
local sys 		= require "luci.sys"
local ACCCFG  = "accountmgnt"
local TMPKEY  = "who are you?"
local LOGIN_ACCOUNT_ERROR="-5001"
local LOGIN_PASSWD_ERROR="-5002"

local MIN_USERNAME = 1
local MAX_USERNAME = 15
local MIN_PASSWORD = 1
local MAX_PASSWORD = 32

----------------------------- Tools ----------------------------------

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
        return nil 
    end

    local pwd_str = ""
    local binpwd = nixio.bin.b64decode(password)
    if crypto.crypt_used_openssl() then
        local pwd = crypto.dec(binpwd, TMPKEY, true)
        local tmp = pwd()
        while tmp do
            pwd_str = pwd_str .. tmp
            tmp = pwd()
        end
    else
        pwd_str = crypto.wolfssl_enc_dec(binpwd, false)
    end
    return pwd_str
end

--- Check whether the account string is valid. (no encrypt)
---- @param  username
---- @param  password
---- @return bool
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

--- Check whether the strings of name and password are valid.
-- @param  username
-- @param  password
-- @return bool
function validity_check(username, password)
    if not ctypes.check_rangelen(username, MIN_USERNAME, MAX_USERNAME)
        or not account_str_valid(username) then
        return false
    end

    if not ctypes.check_rangelen(password, MIN_PASSWORD, MAX_PASSWORD)
        or not ascii_visible_check(password) then
        return false
    end
    return password
end

----------------------------- Tools ----------------------------------


----------------------------- Actions --------------------------------

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

    uci_r:foreach(ACCCFG, ACCOUNT_CFG_NAME,
        function(section)
            if section["password"] then
                defaultflag = false
            end
        end
    )
    
    if uci_r:get_profile("cloud", "https_client") ~= 1 then
        local need_unbind = uci_r:get("cloud_config", "device_status", "need_unbind")
        uci_r:foreach(ACCCFG, CLOUD_ACCOUNT_CFG_NAME,
            function(section)
                if section["password"] and tonumber(need_unbind) == 0 then
                    defaultflag = false
                end
            end
        )
    end

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

--- Get last account username and password.
function get_last_account_password()
    local account = {}
    local cfg_name = ACCOUNT_CFG_NAME

    if cloud_account_exist() then
        cfg_name = CLOUD_ACCOUNT_CFG_NAME
    end

    uci_r:foreach(ACCCFG, cfg_name,
        function(section)
            if section["username"] then
                account.username = section["username"]
                if section["password"] then
                    account.password = aes_decrypt(section["password"])
                end
            end
        end
    )

    return account
end

--- Get password by account name.
-- @param  username
-- @return password   false means no such account, "" means default config.
function get_password(username)
    if is_dft_cfg() then
        return ""
    end
	
    local lower_username_para

    if uci_r:get_profile("cloud", "https_client") ~= 1 then
        if cloud_account_exist() then
            local password = false
            local havename = false
            uci_r:foreach(ACCCFG, CLOUD_ACCOUNT_CFG_NAME,
                function(section)
                    lower_username_para = string.lower(username)
    		if lower_username_para == string.lower(section["username"]) then
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

function get_password_strictly_with_name(username)
    local password = false
    local have_password = false

    dbg.print("get_password_strictly username ".. username)

    if is_dft_cfg() then
        return ""
    end
    
    local lower_username_para
        
    if cloud_account_exist() then
        uci_r:foreach(ACCCFG, CLOUD_ACCOUNT_CFG_NAME,
            function(section)
                lower_username_para = string.lower(username)
                if lower_username_para == string.lower(section["username"]) then
                    if section["password"] then
                        password = aes_decrypt(section["password"])
                        if password then
                            have_password = true
                        end
                    end
                end
            end
        )
    else
        uci_r:foreach(ACCCFG, ACCOUNT_CFG_NAME,
            function(section)
                dbg.print("section username " .. section["username"])
                if username == section["username"] then
                    password = aes_decrypt(section["password"])
                    dbg.print("section password " .. password)
                    if password then
                        have_password = true
                    end
                end
            end
        )
    end

    if have_password == false then 
        dbg.print("get_password_strictly no password")
        return false
    end
    dbg.print("get_password_strictly password ".. password)
    return password        
end

--- Get local password.
-- @param  N/A
-- @return the local password
function get_localPassword()
    local password = nil
    uci_r:foreach(ACCCFG, ACCOUNT_CFG_NAME,
        function(section)
            if section["password"] then
                password = aes_decrypt(section["password"])
            end
        end
    )

    return password
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
            if password == "admin" then
                return "admin"
            else
                return false, LOGIN_PASSWD_ERROR
            end
        elseif password == aes_decrypt(acc_pwd[username]) then
            return password
        else
            return false, LOGIN_PASSWD_ERROR
        end
    end

    return false, LOGIN_ACCOUNT_ERROR
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

    uci_r:section(ACCCFG, "account", "admin", {
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

    local sname = nil
    uci_r:foreach(ACCCFG, "account",
        function(section)
            if section.username == oldname then
                sname = section[".name"]
            end
        end
    )

    uci_r:section(ACCCFG, "account", sname, {
        username = newname,
        password = aes_encrypt(newpasswd)
    })
    uci_r:commit(ACCCFG)

    return true
end

--- Update the account.
-- @param  username
-- @param  password
-- @return bool
function update(newname, newpasswd, oldname, oldpasswd)
    local newpwd = asycrypto.decrypt(newpasswd)
    local oldpwd = asycrypto.decrypt(oldpasswd)

    return update_no_encrypt(newname, newpwd, oldname, oldpwd)
end

--- Reset the account to "admin/admin".
-- @param  username
-- @param  password
-- @return bool
function reset()
    local b64pwd = aes_encrypt("admin")

    uci_r:delete_all(ACCCFG, "account")

    -- local name = uci_r:add(ACCCFG, "account")
    uci_r:section(ACCCFG, "account", "admin", {
        username = "admin",
        password = b64pwd
    })
    uci_r:commit(ACCCFG)

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

    -- local name = uci_r:add(ACCCFG, "account")
    uci_r:section(ACCCFG, "account", "admin", {
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
	local lower_username_para,username_match
	
    uci_r:foreach(ACCCFG, CLOUD_ACCOUNT_CFG_NAME,
        function(section)

            lower_username_para = string.lower(username)
            if lower_username_para == string.lower(section["username"]) then
                username_match = section["username"]
            end
            acc_pwd[section["username"]] = section["password"] or ""
        end
    )

    if acc_pwd[username_match] then
        if password == aes_decrypt(acc_pwd[username_match]) then
            if not nixio.fs.access(CLOUD_TMP_DIR) then
                sys.call("mkdir -p %s" % {CLOUD_TMP_DIR})
            end
            sys.call("echo 0 > %s" % {LOGIN_STATUS})
            return password
        else
            return false, LOGIN_PASSWD_ERROR
        end
    end

    return false, LOGIN_ACCOUNT_ERROR
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

--- Get cloud username and password.
-- @param  N/A
-- @return username and password
function get_cloudAccount()
    local accounts = {}
	
    uci_r:foreach(ACCCFG, CLOUD_ACCOUNT_CFG_NAME,
        function(section)
            local username = section["username"]
            local password = aes_decrypt(section["password"])
			
            if username and password then
                accounts[#accounts + 1] = {
                    username = username,
                    password = password
                }
            end
        end
    )

    return accounts
end

function set_cloudAccount(username, password)
    if not username or not password then
        return false
    end

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

----------------------------- Actions --------------------------------
