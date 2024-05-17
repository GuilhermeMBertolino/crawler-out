-- Get function for password 
local M = {}

local uci = require "luci.model.uci".cursor()
local json = require "luci.json"
local sys = require "luci.sys"
local log require "luci.log" -- for debug

function M.getEanbleWsm()

    local Wsm_enable = uci:get("WebServiceManagement","config","enable_wsm")
    local retVal = "false"     

    if Wsm_enable == "1" then
        retVal = "true"
    end
    
    return retVal
   
end
return M
