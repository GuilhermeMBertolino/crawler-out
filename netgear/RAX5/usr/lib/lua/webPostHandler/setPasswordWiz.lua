local M = {}
local os = require "os"
local nixio = require "nixio"
local sha2 = require "sha2"
local uci = require "luci.model.uci".cursor()
local sys = require "luci.sys"
local log = require "luci.log"
local validator = require "commonFunc.validator"
local pwdCommon = require "webPostHandler.passwdCommon"

function passwdWiz_validator( parm, value, json_data )
    local ret = false;

    if ( not json_data.enableReset ) then

        if ( parm == "answer1") or ( parm == "question1" ) or ( parm == "question2" ) or ( parm == "answer2" ) then
            ret = true
        end
    end
    
    return ret 
end

local passwdWiz_maps = {
    password           = { data_type = "password",      handler = nil },
    enableReset        = { data_type = "boolean",      handler = nil },
    question1          = { data_type = "pwd_qun",      handler = passwdWiz_validator },
    answer1            = { data_type = "pwd_ans",      handler = passwdWiz_validator },
    question2          = { data_type = "pwd_qun",      handler = passwdWiz_validator },
    answer2            = { data_type = "pwd_ans",      handler = passwdWiz_validator }
}

function M.setPasswordWiz_handler(json)

    
    local user = luci.sys.user
    local pegaLoginChanged = false
    local enableReset = uci:get("loginpwd","config","enable_reset")
    local getPasswd = ""
    local answer = ""
    local hash_answer = ""
    local passwd = ""



    if (validator.post_data_validate(json, passwdWiz_maps) == false ) then
        log.print("Failed to parse the input JSON data!!!");
        return {status="error", message=tostring(json) }
    end

    if ( json.password ~= nil ) then 
        if (string.len(json.password) > 0 ) then
            getPasswd = nixio.bin.b64decode(json.password)			
            if ( getPasswd ~= nil ) then
                local rs = user.setpasswd('admin',getPasswd)
				local hash_pwd_bin = sha2.sha256(getPasswd)
                local hash_pwd_hex = pwdCommon.bintohex(hash_pwd_bin)
				
                if rs == 0 then 
                    passwd = user.getpasswd('admin')
                    local file = io.open("/var/user.htpasswd","w")
                    local setpasswd = "admin:"..passwd
                    file:write(setpasswd)
                    file:close()
					uci:set("loginpwd","config","hash256password",hash_pwd_hex)
                else
                    return {status = "failure", message = "set password fail"}
                end
            end
        end
    end
    
    if ( enableReset == "1" ) then
        uci:set("loginpwd","config","question1",json.question1)
        if (json.answer1 ~= nil ) and (string.len(json.answer1) > 0)then
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

    local ts = os.time()
    local getTime = os.date("%Y/%m/%d %H:%M:%S",ts)
    log.console("time = ",getTime)
    uci:set("loginpwd","config","asswordResetTime",getTime)
    
    uci:commit("loginpwd")
    table.insert(changed_config, "loginpwd")
    

    --    local uci = require "luci.model.uci".cursor()
    --    uci:set("netgear", "system", "admin_disable","1")
    --    uci:commit("netgear")

    return {status = "success", message = "Finish wizard set password"} 
end

return M