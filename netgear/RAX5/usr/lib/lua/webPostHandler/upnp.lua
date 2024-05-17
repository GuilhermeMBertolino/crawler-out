--Licensed to the public under the Apache License 2.0

local M = {}
local os = require "os"
local uci = require "luci.model.uci".cursor()
local sys = require "luci.sys"
local log = require "luci.log"
local validator = require "commonFunc.validator"

local upnp_setup_maps =
{
    enableUpnp  = { data_type = "boolean",     handler = nil },
    advPeriod   = { data_type = "unpn_advtime",  handler = nil },
    advTtl      = { data_type = "ttl",      handler = nil }
}    

function M.upnp_handler(json)
    log.debug(0)
    log.print_r(json)
    log.print("upnp:", json.enableUpnp, json.advPeriod, json.advTtl)
    local upnpChanged = false
    local enableUpnp_set = "0"
    
    if (validator.post_data_validate(json, upnp_setup_maps) == false) then
        log.print("Failed to parse the input JSON data!!!");
        return {status="error", message=tostring(json) };
    end

    local enableUpnp_org = uci:get("upnpd", "config", "enabled")
    local advPeriod_org = uci:get("upnpd", "config", "notify_interval")
    local advTtl_org = uci:get("upnpd", "config", "time_to_live")
    
    log.print("upnp get :", enableUpnp_org, advPeriod_org)
    
    if json.enableUpnp == "true" then 
        enableUpnp_set = "1"
        log.console("upnp set enable")
    end
    
    if enableUpnp_org ~= enableUpnp_set then
        uci:set("upnpd", "config", "enabled", enableUpnp_set)
        upnpChanged = true
    end

    if advPeriod_org ~= json.advPeriod then
        uci:set("upnpd", "config", "notify_interval", json.advPeriod)
        upnpChanged = true
    end
    
    if advTtl_org ~= json.advTtl then
        uci:set("upnpd", "config", "time_to_live", json.advTtl)
        upnpChanged = true
    end

    if upnpChanged == true then
        uci:commit("upnpd")
--        luci.sys.call("/etc/init.d/miniupnpd stop >/dev/null")
--        if json.enableUpnp == "true" then
--            luci.sys.call("/etc/init.d/miniupnpd start >/dev/null")
--        end
        table.insert(changed_config, "upnpd")
    end

    return {status="success", message="Finish upnp setup"} 
end  

return M
