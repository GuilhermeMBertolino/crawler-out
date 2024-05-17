-- Get function for password 
local M = {}

local uci = require "luci.model.uci".cursor()
local json = require "luci.json"
local sys = require "luci.sys"
local log require "luci.log" -- for debug

question1_mlang_table = { 
    "genie_97",
    "genie_149",
    "genie_150",
    "genie_145",
    "genie_144",
    "genie_63",
    "genie_142",
    "genie_141",
    "genie_64",
    "genie_138" 
} 

question2_mlang_table = { 
    "genie_97",
    "genie_147",
    "genie_146",
    "genie_140",
    "genie_143",
    "genie_148",
    "genie_62",
    "genie_61",
    "genie_139" 
} 

function M.getEnableReset()
    local enabled = uci:get("loginpwd","config","enable_reset")
    local retEnabled = "false"

    if enabled == "1" then
        retEnabled = "true"
    end

    return retEnabled
end

function M.getQuestion1()
    local question1 = uci:get("loginpwd","config","question1")

    return question1
end

function M.getAnswer1()
    -- for security, only show ************, not to show real value
    return "************"
end

function M.getQuestion2()
    local question2 = uci:get("loginpwd","config","question2")
     
    return question2
end

function M.getAnswer2()
    -- for security, only show ************, not to show real value
    return "************"
end

function M.getLastPasswordResetTime()
    local resetTime = uci:get("loginpwd","config","asswordResetTime")

    if resetTime ~= "9999/12/31 23:59:59" then 
        return resetTime
    end 
end

function M.getMlang_question(question_num)
    local q = 0
    if question_num == 1 then
        q = uci:get("loginpwd","config","question1")
        return question1_mlang_table[q+1]  
    else
        q = uci:get("loginpwd","config","question2")
        return question2_mlang_table[q+1]
    end

end

return M
