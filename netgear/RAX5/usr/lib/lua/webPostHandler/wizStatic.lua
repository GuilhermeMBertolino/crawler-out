local M = {}
local wanCommon = require "webPostHandler.wanCommon"
local uci    = require "luci.model.uci".cursor()
local validator = require "commonFunc.validator"
local log = require "luci.log"

function wizStatic_validator(parm, value)
    local ret = false
    if(parm == "dns2") then
        if wanCommon.isFalseOrEmpty(value) == true then
            ret = true
        end
    end
    return ret;
end

-- Matt, 2022/1013. The validation map must be after customizing the handler function.
local wiz_static_maps =
{
    ipAddr = { data_type = "ipv4_addr",     handler = nil },
    netmask = { data_type = "ipv4_netmask",     handler = nil },
    gateway = { data_type = "ipv4_addr",     handler = nil },
    dns1 = { data_type = "ipv4_dns",     handler = nil },
    dns2 = { data_type = "ipv4_dns",     handler = wizStatic_validator }
}

function M.wizStatic_handler(json)

    if (validator.post_data_validate(json, wiz_static_maps) == false) then
        log.print("Failed to parse the input JSON data!!!")
        return {status="error", message=tostring(json) }
    end

    -- MTU settings
    wanCommon.wanCheckMtu(uci, "Static")

    uci:set("network", "inet_ether", "domain_name", "")

    uci:set("network", "inet_global", "wan_mode", "Static")
    uci:set("network", "inet_ether", "proto", "static")
    uci:set("network", "inet_ether", "iptype", "fixed")
    uci:set("network", "inet_ether", "ipaddr", json.ipAddr)
    uci:set("network", "inet_ether", "netmask", json.netmask)
    uci:set("network", "inet_ether", "gateway", json.gateway)
    wanCommon.wanConfig_DNS(uci, "fixed", json.dns1, json.dns2)
    
    wanCommon.wanConfig_Reload(uci)
    uci:commit("network")
    table.insert(changed_config, "network")
    
    return {status="success", message="Finish wizard WAN static Setup"}
end

return M
