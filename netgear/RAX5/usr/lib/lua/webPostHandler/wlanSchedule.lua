local M = {}
local uci    = require "luci.model.uci".cursor()
local uci_st = require "luci.model.uci".cursor(nil, "/var/state")
local log = require "luci.log"
local os = require "os"
local sys  = require "luci.sys"
local validator = require "commonFunc.validator"
require "commonFunc.wifiUtils_commDefs"

log.debug(0)

local wifische_maps =
{
    index       = { data_type = "sch_idx",   handler = nil },
    startTime   = { data_type = "time_slot",handler = nil },
    endTime     = { data_type = "time_slot",handler = nil },
    isEveryDay  = { data_type = "boolean",  handler = nil },
    isMonday    = { data_type = "boolean",  handler = nil },
    isTuesday   = { data_type = "boolean",  handler = nil },
    isWednesday = { data_type = "boolean",  handler = nil },
    isThursday  = { data_type = "boolean",  handler = nil },
    isFriday    = { data_type = "boolean",  handler = nil },
    isSaturday  = { data_type = "boolean",  handler = nil },
    isSunday    = { data_type = "boolean",  handler = nil },
    action      = { data_type = "action",   handler = nil }
};

function create_rules(json)
    local index = tonumber(json.index)-1
    local section = ""
    
    if (json.action == "add") then
        uci:foreach(NTGR_WIFI_UCI_CONFIG_NAME, json.wlanRadio,
        function(s)
            index = index + 1
        end)
        uci:add(NTGR_WIFI_UCI_CONFIG_NAME, json.wlanRadio)
    end
    log.console("radio "..json.wlanRadio.." index "..index)

    section = string.format("@%s[%d]", json.wlanRadio, index)
    uci:set(NTGR_WIFI_UCI_CONFIG_NAME, section, "startTime", json.startTime)
    uci:set(NTGR_WIFI_UCI_CONFIG_NAME, section, "endTime", json.endTime)
    uci:set(NTGR_WIFI_UCI_CONFIG_NAME, section, "everyday", json.isEveryDay)
    uci:set(NTGR_WIFI_UCI_CONFIG_NAME, section, "sunday", json.isSunday)
    uci:set(NTGR_WIFI_UCI_CONFIG_NAME, section, "monday", json.isMonday)
    uci:set(NTGR_WIFI_UCI_CONFIG_NAME, section, "tuesday", json.isTuesday)
    uci:set(NTGR_WIFI_UCI_CONFIG_NAME, section, "wednesday", json.isWednesday)
    uci:set(NTGR_WIFI_UCI_CONFIG_NAME, section, "thursday", json.isThursday)
    uci:set(NTGR_WIFI_UCI_CONFIG_NAME, section, "friday", json.isFriday)
    uci:set(NTGR_WIFI_UCI_CONFIG_NAME, section, "saturday", json.isSaturday)
end

function delete_rules(json)
    local index = tonumber(json.index)-1
    local section = string.format("@%s[%d]",json.wlanRadio,index)
    uci:delete(NTGR_WIFI_UCI_CONFIG_NAME, section)
end

function M.wlanSchedule_handler(json)
    local wifi2_schedule_on = ""
    local wifi5_schedule_on = ""
    log.console_r(json)

    if (validator.post_data_validate(json, wifische_maps) == false) then
        log.print("Failed to parse the input JSON data!!!");
        return {status="error", message=tostring(json) };
    end

    if (json.action == "delete") then
        delete_rules(json)
    else
        create_rules(json)
    end

    uci:commit(NTGR_WIFI_UCI_CONFIG_NAME)

    wifi2_schedule_on = uci_st:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "wifiScheduleEnable")
    wifi5_schedule_on = uci_st:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "wifiScheduleEnable")
    if (wifi2_schedule_on == "true" or wifi5_schedule_on == "true") then
        table.insert(changed_config, NTGR_WIFI_UCI_CONFIG_NAME) --"changed_config" is a global variable.
    end

    return {status="success", message="Finish Wireless Schedule Setup"}
end

return M