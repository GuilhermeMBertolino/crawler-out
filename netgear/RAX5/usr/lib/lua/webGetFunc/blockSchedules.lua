local M = {}

local uci  = require "luci.model.uci".cursor()
local json = require "luci.json"
local log = require "luci.log"

function M.getBlockSchedule_EveryDay()
    local isEveryDay = uci:get("blocksch", "@schedule[0]", "isEveryDay")
    return isEveryDay
end

function M.getBlockSchedule_Sunday()
    local isSunday = uci:get("blocksch", "@schedule[0]", "isSunday")
    return isSunday
end

function M.getBlockSchedule_Monday()
    local isMonday = uci:get("blocksch", "@schedule[0]", "isMonday")
    return isMonday
end

function M.getBlockSchedule_Tuesday()
    local isTuesday = uci:get("blocksch", "@schedule[0]", "isTuesday")
    return isTuesday
end

function M.getBlockSchedule_Wednesday()
    local isWednesday = uci:get("blocksch", "@schedule[0]", "isWednesday")
    return isWednesday
end

function M.getBlockSchedule_Thursday()
    local isThursday = uci:get("blocksch", "@schedule[0]", "isThursday")
    return isThursday
end

function M.getBlockSchedule_Friday()
    local isFriday = uci:get("blocksch", "@schedule[0]", "isFriday")
    return isFriday
end

function M.getBlockSchedule_Saturday()
    local isSaturday = uci:get("blocksch", "@schedule[0]", "isSaturday")
    return isSaturday
end

function M.getBlockSchedule_allDay()
    local allDay = uci:get("blocksch", "@schedule[0]", "allDayBlock")
    return allDay
end

function M.getBlockSchedule_startBT()
    local startBT = uci:get("blocksch", "@schedule[0]", "startBlockTime")
    return startBT
end

function M.getBlockSchedule_endBT()
    local endBT = uci:get("blocksch", "@schedule[0]", "endBlockTime")
    return endBT
end

return M

