--Licensed to the public under the Apache License 2.0

local M = {}
local os = require "os"
local nixio = require "nixio"
local sha2 = require "sha2"
local uci = require "luci.model.uci".cursor()
local sys = require "luci.sys"
local log = require "luci.log"
local validator = require "commonFunc.validator"
local pwdCommon = require "webPostHandler.passwdCommon"

local answer_maps = {
    question1          = { data_type = "pwd_qun",      handler = nil },
    answer1            = { data_type = "pwd_ans",      handler = nil },
    question2          = { data_type = "pwd_qun",      handler = nil },
    answer2            = { data_type = "pwd_ans",      handler = nil }
}

function M.checkAnswer_handler(json)
    log.debug(0)
    log.print_r(json)
    log.print("checkAnswer:",json.question1,json.answer1,json.question2,json.answer2)
    local question1_org = uci:get("loginpwd","config","question1")
    local question2_org = uci:get("loginpwd","config","question2")
    local Acheck1, Acheck2 = false, false
	
	if (validator.post_data_validate(json, answer_maps) == false) then
        log.print("Failed to parse the input JSON data!!!");
        return {status="error", message=tostring(json) };
    end

    if ( question1_org == json.question1 ) then
        if (json.answer1 ~= nil ) and (string.len(json.answer1) > 0)then
            local answer1_org =  uci:get("loginpwd","config","answer1")
            local answer1 = nixio.bin.b64decode(json.answer1)
			local hash_ans1_bin = sha2.sha256(answer1)
			local ans1_org_bin = pwdCommon.hextobin(answer1_org)

            --if ( hash_answer1 == answer1_org ) then
			if ( hash_ans1_bin == ans1_org_bin ) then
                Acheck1 = true
            end
        end
    end
    
    if ( question2_org == json.question2 ) then
        if (json.answer2 ~= nil ) and (string.len(json.answer2) > 0)then
            local answer2_org =  uci:get("loginpwd","config","answer2")
            local answer2 = nixio.bin.b64decode(json.answer2)
			local hash_ans2_bin = sha2.sha256(answer2)
			local ans2_org_bin = pwdCommon.hextobin(answer2_org)

            if ( ans2_org_bin == hash_ans2_bin ) then
                Acheck2 = true
            end
        end
    end

    if ( Acheck1 and Acheck2 ) then
        local flags = nixio.open_flags("creat","rdonly")
        local fd = nixio.open("/tmp/check_ans",flags)
        fd:close()
        return {status = "success", message = "Finish check security answer"}
    else
        return {status = "failure", message = "security answer is not match"}
    end

end
return M
