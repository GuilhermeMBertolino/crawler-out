-- Licensed to the public under the Apache License 2.0.
local M = {}
local os        = require "os"
local uci       = require "luci.model.uci".cursor()
local sys       = require "luci.sys"
local log       = require "luci.log"
local validator = require "commonFunc.validator"

require "commonFunc.ntpCommon"

local preferNtpServerNew, ntpServerNew, timeZoneNew, timeZoneNameNew, autoDaylightSavingNew

function ntp_addr_validator(parm, value)
    return '' == value and true or false
end

local ntp_setup_maps = {
    --buttonHit          = { data_type = "button_hit",   handler = nil },
    --buttonValue        = { data_type = "button_value", handler = nil },
    preferNtpServer    = { data_type = "boolean",      handler = nil },
    ntpServer          = { data_type = "ntp_server",   handler = ntp_addr_validator },
    timeZonestate      = { data_type = "number",       handler = nil },
    timeZone           = { data_type = "time_zone",    handler = nil },
    autoDaylightSaving = { data_type = "boolean",      handler = nil }
}

local function init(json)
    preferNtpServerNew = boolToNum(json.preferNtpServer)
    ntpServerNew = json.ntpServer
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

            if "1" == preferNtpServerNew and preferNtpServerNew then
                ntp_server_1 = ntpServerNew
                -- ntp_server_2 = ntpList[i].priNTPServer
                return local_time_zone, {ntp_server_1}
            else
                ntp_server_1 = ntpList[i].priNTPServer
                ntp_server_2 = ntpList[i].secNTPServer
                return local_time_zone, {ntp_server_1, ntp_server_2}
            end
        end
        i = i + 1
    end

    log.console("[Error] Cannot find timezone "..timeZoneNew.." in the ntpList.")
    return local_time_zone, {ntp_server_1, ntp_server_2}
end



function M.ntp_handler(json)
    if (false == validator.post_data_validate(json, ntp_setup_maps)) then
        log.print("Failed to parse the input JSON data!!!");
        return { status="error", message=tostring(json) };
    end

    init(json)
    local localTimeZone, ntpServers = getNtpServerByZoneName()

    uci:set("system", "ntp", "preferred_ntp_server_enable", preferNtpServerNew)
    uci:set("system", "ntp", "auto_daylight_saving", autoDaylightSavingNew)
    uci:set("system", "ntp", "preferred_ntp_server", ntpServerNew)
    uci:set("system", "@system[0]", "timezone_name", timeZoneNameNew)
    uci:set("system", "@system[0]", "timezone", localTimeZone)

    if preferNtpServerNew == "1" then
        uci:set("system", "@system[0]", "timezone_state", '2')  -- manual
    else
        uci:set("system", "@system[0]", "timezone_state", '0')  -- default
    end

    uci:delete("system", "ntp", "server")
    uci:set_list("system", "ntp", "server", ntpServers)

    uci:commit("system")
    table.insert(changed_config, "system")

    return {status="success", message="Finish NTP Settings"}
end

return M
