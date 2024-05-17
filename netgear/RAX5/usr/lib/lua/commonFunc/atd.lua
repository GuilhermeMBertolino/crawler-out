local uci    = require "luci.model.uci".cursor()

local M = {}

function numToBool(num)
    return "1" == num and "true" or "false"
end

function M.getTextVal_timeZonestate()
    return uci:get("system", "@system[0]", "timezone_state")
end

function M.getVal_ActiveTimeZoneState()
    return numToBool(uci:get("system", "@system[0]", "active_timezone_state"))
end

return M
