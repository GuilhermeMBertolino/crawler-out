-- Set function for LED Control Setting
local M = {}
local uci = require "luci.model.uci".cursor()
local log require "luci.log" -- for debug

function M.led_handler(json)
    if json.enableLed == "0" then -- set led_on = 0, led_blinking = x
        uci:set("led_ctl", "setting", "on", "0")
        uci:commit("led_ctl")
        table.insert(changed_config, "led_ctl")
    elseif json.enableLed == "1" then -- set led_on = 1, led_blinking = 0
        uci:set("led_ctl", "setting", "on", "1")
        uci:set("led_ctl", "setting", "blinking", "0")
        uci:commit("led_ctl")
        table.insert(changed_config, "led_ctl")
    else -- set led_on = 1, led_blinking = 1
        uci:set("led_ctl", "setting", "on", "1")
        uci:set("led_ctl", "setting", "blinking", "1")
        uci:commit("led_ctl")
        table.insert(changed_config, "led_ctl")
    end

    return {status="success", message="Finish LED Setting"}

end
return M
