-- Get function for LED control Setting
local M = {}
local uci = require "luci.model.uci".cursor()
local log require "luci.log" -- for debug

function M.getRadioVal_enableLed()
    local led_enable = uci:get("led_ctl","setting","on")
    local led_blinking = uci:get("led_ctl","setting","blinking")
    local retVal = "0"

    if led_enable == "0" then
        retVal = "0"
    elseif led_blinking == "0" then
        retVal = "1"
    else
        retVal = "2"
    end

    return retVal
   
end
return M
