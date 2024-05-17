--Licensed to the public under the Apache License 2.0

local M = {}
local os = require "os"
local sha2 = require "sha2"
local nixio = require "nixio"
local uci = require "luci.model.uci".cursor()
local sys = require "luci.sys"
local log = require "luci.log"
local validator = require "commonFunc.validator"
local pwdCommon = require "webPostHandler.passwdCommon"

function passwd_validator( parm, value, json_data )

    local ret = false;

    if (parm == "oldPassword") then
        if ( value == nil ) then
            ret = true
        elseif ( string.len(value) == 0 ) then
            ret = true
        end
    end

    if ( not json_data.enableReset ) then

        if ( parm == "answer1") or ( parm == "question1" ) or ( parm == "question2" ) or ( parm == "answer2" ) then
            ret = true
        end
    end

    return ret
end

function M.setPassword(NewPassword)

    local user = luci.sys.user
    local rs = user.setpasswd('admin',NewPassword)
    local hash_pwd_bin = sha2.sha256(NewPassword)
    local hash_pwd_hex = pwdCommon.bintohex(hash_pwd_bin)

    if rs == 0 then
        passwd = user.getpasswd('admin')
        local file = io.open("/var/user.htpasswd","w")
        local setpasswd = "admin:"..passwd
        file:write(setpasswd)
        file:close()
        uci:set("loginpwd","config","hash256password",hash_pwd_hex)
    else
        return false
    end

    return true
end

local passwd_maps = {
    password           = { data_type = "password",      handler = nil },
    oldPassword        = { data_type = "password",      handler = passwd_validator },
    enableReset        = { data_type = "boolean",      handler = nil },
    question1          = { data_type = "pwd_qun",      handler = passwd_validator },
    answer1            = { data_type = "pwd_ans",      handler = passwd_validator },
    question2          = { data_type = "pwd_qun",      handler = passwd_validator },
    answer2            = { data_type = "pwd_ans",      handler = passwd_validator }
}

function M.setPassword_handler(json)
    log.debug(0)
    log.print_r(json)
    log.print("setPassword1",json.password,json.oldPassword,json.enableReset)
    log.print("setPassword2",json.question1,json.answer1,json.question2,json.answer2)
    local user = luci.sys.user
    local PegaLoginChanged = false
    local enableReset_org = uci:get("loginpwd","config","enable_reset")
    local newPasswd = nixio.bin.b64decode(json.password)
    local oldPasswd = ""
    local answer = ""
    local hash_answer = ""
    local enableReset_set = "0"
    local passwd = user.getpasswd('admin')

    if (validator.post_data_validate(json, passwd_maps) == false) then
        log.print("Failed to parse the input JSON data!!!");
        return {status="error", message=tostring(json) };
    end

    local isBlankstate = uci:get("system","netgear","blank_state")

    if( isBlankstate == "0" ) then
        if (json.oldPassword ~= nil ) then
            if (string.len(json.oldPassword) > 0) then
                oldPassword = nixio.bin.b64decode(json.oldPassword)
                local rcheck = user.checkpasswd('admin',oldPassword)
                if ( not rcheck ) then
                    return {status = "success", message = "Password is wrong"}
                end
            else
                return {status = "success", message = "Password is wrong"}
            end
        else
            return {status = "success", message = "Password is wrong"}
        end
    end
    local ret = M.setPassword(newPasswd)
    if ret == false then
        return {status = "failure", message = "Set password fail !!"}
    else
        PegaLoginChanged = true
    end

    if json.enableReset == "true" then
        enableReset_set = "1"
        log.console("enable reset set enable")
    end

    if (enableReset_org ~= enableReset_set) then
        uci:set("loginpwd", "config", "enable_reset",enableReset_set)
        PegaLoginChanged = true
    end

    if json.enableReset == "true" then
        uci:set("loginpwd","config","question1",json.question1)
        if (json.answer1 ~= nil ) and (string.len(json.answer1) > 0) then
            answer = nixio.bin.b64decode(json.answer1)
            local hash_ans1_bin = sha2.sha256(answer)
            hash_answer = pwdCommon.bintohex(hash_ans1_bin)

            uci:set("loginpwd","config","answer1",hash_answer)
            PegaLoginChanged = true
        else
            return {status = "failure", message = "answer1 is empty"}
        end

        uci:set("loginpwd","config","question2",json.question2)
        if (json.answer2 ~= nil ) and (string.len(json.answer2) > 0)then
            answer = nixio.bin.b64decode(json.answer2)
            local hash_ans2_bin = sha2.sha256(answer)
            hash_answer = pwdCommon.bintohex(hash_ans2_bin)

            uci:set("loginpwd","config","answer2",hash_answer)
            PegaLoginChanged = true
        else
            return {status = "failure", message = "answer2 is empty"}
        end

    end

    if PegaLoginChanged == true then
        uci:commit("loginpwd")
        table.insert(changed_config, "loginpwd")
    end

    return {status = "success", message = "Set password successfully!!"}
end
return M
