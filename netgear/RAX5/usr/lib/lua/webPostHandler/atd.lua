-- Licensed to the public under the Apache License 2.0.
local M = {}
local os        = require "os"
local uci       = require "luci.model.uci".cursor()
local sys       = require "luci.sys"
local log       = require "luci.log"
local validator = require "commonFunc.validator"

require "commonFunc.ntpCommon"

local timeZoneNew, timeZoneNameNew, autoDaylightSavingNew

local atd_setup_maps = {
    timeZonestate      = { data_type = "number",       handler = nil },
    timeZone           = { data_type = "time_zone",    handler = nil },
    autoDaylightSaving = { data_type = "boolean",      handler = nil }
}

local function init(json)
    timeZoneNew = ""
    timeZoneNameNew = json.timeZone
    autoDaylightSavingNew = boolToNum(json.autoDaylightSaving)
end

local function getNtpServerByZoneName()
    local ntp_server_1 = ""
    local ntp_server_2 = ""
    local local_time_zone = ""
    local i = 1

    while ("" ~= ntpList[i].timeZone)
    do
        if ntpList[i].timeZoneName == timeZoneNameNew then
            if "0" == autoDaylightSavingNew then
                local_time_zone = ntpList[i].timeZone
            else
                local_time_zone = ntpList[i].timeZoneDst
            end

            ntp_server_1 = ntpList[i].priNTPServer
            ntp_server_2 = ntpList[i].secNTPServer

            return local_time_zone, {ntp_server_1, ntp_server_2}
        end
        i = i + 1
    end

    log.console("[Error] Cannot find timezone "..timeZoneNew.." in the ntpList.")
    return local_time_zone, {ntp_server_1, ntp_server_2}
end



function M.atd_handler(json)
    if (false == validator.post_data_validate(json, atd_setup_maps)) then
        log.print("Failed to parse the input JSON data!!!");
        return { status="error", message=tostring(json) };
    end

    init(json)
    local localTimeZone, ntpServers = getNtpServerByZoneName()

    uci:set("system", "ntp", "auto_daylight_saving", autoDaylightSavingNew)
    uci:set("system", "@system[0]", "timezone_name", timeZoneNameNew)
    uci:set("system", "@system[0]", "timezone", localTimeZone)
    uci:set("system", "@system[0]", "timezone_state", '1')
    uci:delete("system", "ntp", "server")
    uci:set_list("system", "ntp", "server", ntpServers)

    uci:commit("system")
    table.insert(changed_config, "system")

    return {status="success", message="Finish NTP Settings"}
end

return M
