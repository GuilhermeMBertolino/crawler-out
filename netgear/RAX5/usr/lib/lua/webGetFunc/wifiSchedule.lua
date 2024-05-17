local M = {}
local uci  = require "luci.model.uci".cursor()
local json = require "luci.json"
local util = require "luci.util"
local log = require "luci.log" -- for debug
require "commonFunc.wifiUtils_commDefs"

log.debug(0)

function getWeekStr(s)
    local wklist = {}

    if (s.everyday == "true") then
        table.insert(wklist, "Daily")
    else
        if (s.sunday == "true") then
            table.insert(wklist, "Sun.")
        end

        if (s.monday == "true") then
            table.insert(wklist, "Mon.")
        end

        if (s.tuesday == "true") then
            table.insert(wklist, "Tue.")
        end

        if (s.wednesday == "true") then
            table.insert(wklist, "Wed.")
        end

        if (s.thursday == "true") then
            table.insert(wklist, "Thu.")
        end

        if (s.friday == "true") then
            table.insert(wklist, "Fri.")
        end

        if (s.saturday == "true") then
            table.insert(wklist, "Sat.")
        end
    end
    return wklist
end

function conv_booltoint(val)
    if (val == "true") then
        return 1
    else
        return 0
    end
end

function M.get2GwifiScheList()
    local lists = {}
    local count = 1
    local index = 1

    uci:foreach(NTGR_WIFI_UCI_CONFIG_NAME, "2G",
        function(s)

        if (s.everyday == "true") then
            -- for the ui to display correctly
            s.sunday = "true"
            s.monday = "true"
            s.tuesday = "true"
            s.wednesday = "true"
            s.thursday = "true"
            s.friday = "true"
            s.saturday = "true"
        end

        lists[tostring(index)] = {
                __index = index,
                __radio = "2G",
                __starttime = s.startTime,
                __endtime = s.endTime,
                __enSunday = conv_booltoint(s.sunday),
                __enMonday = conv_booltoint(s.monday),
                __enTuesday = conv_booltoint(s.tuesday),
                __enWednesday = conv_booltoint(s.wednesday),
                __enThursday = conv_booltoint(s.thursday),
                __enFriday = conv_booltoint(s.friday),
                __enSaturday = conv_booltoint(s.saturday),
                __week = getWeekStr(s)
            }
            count = count + 1
            index = index + 1
        end)

        return lists
end

function M.get5GwifiScheList()
    local lists = {}
    local count = 1
    local index = 1

    uci:foreach(NTGR_WIFI_UCI_CONFIG_NAME, "5G",
        function(s)

        if (s.everyday == "true") then
            -- for the ui to display correctly
            s.sunday = "true"
            s.monday = "true"
            s.tuesday = "true"
            s.wednesday = "true"
            s.thursday = "true"
            s.friday = "true"
            s.saturday = "true"
        end

        lists[tostring(index)] = {
                __index = index,
                __radio = "5G",
                __starttime = s.startTime,
                __endtime = s.endTime,
                __enSunday = conv_booltoint(s.sunday),
                __enMonday = conv_booltoint(s.monday),
                __enTuesday = conv_booltoint(s.tuesday),
                __enWednesday = conv_booltoint(s.wednesday),
                __enThursday = conv_booltoint(s.thursday),
                __enFriday = conv_booltoint(s.friday),
                __enSaturday = conv_booltoint(s.saturday),
                __week = getWeekStr(s)
            }
            count = count + 1
            index = index + 1
        end)

        return lists
end

return M
