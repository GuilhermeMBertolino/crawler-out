-- Licensed to the public under the Apache License 2.0.
local M = {}
--local os     = require "os"
local sys   = require "luci.sys"
local uci    = require "luci.model.uci".cursor()
local log    = require "luci.log"
local validator = require "commonFunc.validator"

function ddns_validator(parm, value)
    log.debug(0)
    -- custom handler function only be called at default datatype validate fail.
    local ret = false;

    if (parm == "username") then
        -- for NETGEAR DDNS since username is used for No-IP and DynDNS
        if (value == '') then
            return true
        end
    end
    
    return ret;
end

local ddns_maps =
{
    enableDdns   = { data_type = "boolean",        handler = nil },
    ddnsService  = { data_type = "ddns_service",     handler = nil },
    hostName      = { data_type = "ddns_hostname",     handler = nil },
    username       = { data_type = "ddns_user",     handler = ddns_validator },
    password        = { data_type = "ddns_pwd",     handler = nil }
};

function M.ddns_handler(json)
    log.debug(0)
    log.console_r(json)
    log.console("ddns:", json.enableDdns, json.ddnsService, json.hostName, json.username,  json.password)
    local enableDdns = "0"

    if (validator.post_data_validate(json, ddns_maps) == false) then
        log.console("Failed to parse the input JSON data!!!");
        return {status="error", message=tostring(json) };
    end

    if json.action == "reset" and json.ddnsService == "netgear" then
        json.enableDdns = "false"
        json.password = ""
    end

    if json.enableDdns == "true" then
        enableDdns = "1"
    elseif json.enableDdns == "false" then
        enableDdns = "0"
    end

    local service_name = ""
    if json.ddnsService == "noip" then
        serviceName = "no-ip.com"
    elseif json.ddnsService == "dyndns" then
        serviceName = "dyndns.org"
    elseif json.ddnsService == "netgear" then
        serviceName = "netgear"
    end
    
    -- Per spec, after each successful update, an implementation MUST update the configured domain name with interval as below
    -- DynDNS: every 28 days
    -- Other DDNS service provider: every 24 hours
    local forceInterval = '1' -- force_unit is 'days'
    if json.ddnsService == "dyndns" then
        forceInterval = '28'
    end

    uci:set("ddns", "myddns_ipv4", "enabled", enableDdns)
    uci:set("ddns", "myddns_ipv4", "service_name", serviceName)
    uci:set("ddns", "myddns_ipv4", "lookup_host", json.hostName)
    uci:set("ddns", "myddns_ipv4", "domain", json.hostName)
    uci:set("ddns", "myddns_ipv4", "username", json.username)
    uci:set("ddns", "myddns_ipv4", "password", json.password)
    uci:set("ddns", "myddns_ipv4", "force_interval", forceInterval)
    uci:set("ddns", "myddns_ipv4", "ntgr_email", json.email)
    if json.action == "reset" and json.ddnsService == "netgear" then
        uci:set("ddns", "myddns_ipv4", "clientId", "")
        uci:set("ddns", "myddns_ipv4", "clientKey", "")
        uci:set("ddns", "myddns_ipv4", "updatestatus", "")
        uci:set("ddns", "myddns_ipv4", "registered", "0")
    end
    uci:commit("ddns")

    table.insert(changed_config, "ddns")

    return {status="success", message="Finish Dynamic DNS"}
end

return M
