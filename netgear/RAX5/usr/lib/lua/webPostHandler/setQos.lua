-- Licensed to the public under the Apache License 2.0.
local M = {}
local uci = require "luci.model.uci".cursor()
local log = require("luci.log") -- for debug
local validator = require "commonFunc.validator"

log.debug(0)

function qos_validator(parm, value)
    ret = false

    if parm == "speedMethod" and value ~= nil then
        if value == "speedtest" or value == "manually" then
            ret = true
        end
    elseif parm == "downSpeed" or parm == "upSpeed" or parm == "manuallyDownSpeed" or 
    parm == "manuallyUpSpeed" and value ~= nil then
        if tonumber(value) ~= nil then
            ret = true
        end
    end

    return ret
end

local qos_maps =
{
    enableQos         = { data_type = "boolean", handler = nil},
    speedMethod       = { data_type = "",  handler = qos_validator},
    downSpeed         = { data_type = "",   handler = qos_validator},
    upSpeed           = { data_type = "",   handler = qos_validator},
    manuallyDownSpeed = { data_type = "",   handler = qos_validator},
    manuallyUpSpeed   = { data_type = "",   handler = qos_validator}
};

function M.setQos_handler(json)
    log.console_r(json)

    if (validator.post_data_validate(json, qos_maps) == false) then
        log.print("Failed to parse the input JSON data!!!")
        return {status="error", message=tostring(json) }
    end
  
    uci:set("qos", "wan", "enabled", json.enableQos)
    uci:set("qos", "wan", "method", json.speedMethod)
    if json.speedMethod == "manually" then
        -- reset speedtest rate
        uci:set("qos", "wan", "download", "0")
        uci:set("qos", "wan", "upload", "0")
        -- convert to Kbit
        uci:set("qos", "wan", "manual_download", tonumber(json.manuallyDownSpeed)*1000)
        uci:set("qos", "wan", "manual_upload", tonumber(json.manuallyUpSpeed)*1000)
    else
        -- reset manually rate
        uci:set("qos", "wan", "download", tonumber(json.downSpeed)*1000)
        uci:set("qos", "wan", "upload", tonumber(json.upSpeed)*1000)
        uci:set("qos", "wan", "manual_download", "0")
        uci:set("qos", "wan", "manual_upload", "0")
    end

    --commit & apply the settings
	uci:commit("qos")
    table.insert(changed_config, "qos")
    
    return {status="success", message="Finish Qos Setup"}
end

return M