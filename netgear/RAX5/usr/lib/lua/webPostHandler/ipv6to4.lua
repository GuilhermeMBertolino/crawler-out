-- Licensed to the public under the Apache License 2.0.
local M = {}
local uci    = require "luci.model.uci".cursor()
local log    = require "luci.log"
local validator = require "commonFunc.validator"
local netutils = require "commonFunc.netUtils"
local v6disable = require "webPostHandler.ipv6Disable"
local v6autocfg = require "webPostHandler.ipv6AutoConfig"
local interface = require "webGetFunc.interface"
local wanCommon = require "webPostHandler.wanCommon"

log.debug(0)

function wan6to4_validator(parm, value)
    if (value ~= "") then
        return netutils.checkIpv4Format(value)
    else
        return true
    end
end

local wan6to4config_maps =
{
    relayRouterIp       = { data_type = "ipv4_addr", handler = wan6to4_validator },
    dns1                = { data_type = "ipv6_addr", handler = nil },
    dns2                = { data_type = "ipv6_addr", handler = nil },
    lanIpAddr           = { data_type = "ipv6_lan", handler = nil },
    enableInterfaceId   = { data_type = "ipv6_intfidstatus", handler = nil },
    lanInterfaceId      = { data_type = "ipv6_intfid", handler = nil },
    filter              = { data_type = "ipv6_filter", handler = nil }
};

function ipv6RelaySet(relay_mode, addr)
    if (relay_mode == "fixed") then
        uci:set("network", "wan_v6", "6to4_relay", relay_mode)
        uci:set("network", "wan_v6", "remote", addr)
    end
end

function set_wan4_connmode()
    local wan_mode = interface.get_wanMode()
    local conn_mode = ""
    local setion_name = ""
    --if v4 wan mode is dial on demand, change v4 wan mode to always on
    --ipv6 pppoe only support always on
    if (wan_mode == "PPPoE") then
        setion_name = "inet_pppoe"
    elseif (wan_mode == "PPTP") then
        setion_name = "inet_pptp"
    elseif (wan_mode == "L2TP") then
        setion_name = "inet_l2tp"
    else
        return
    end

    conn_mode = uci:get("network", setion_name, "conn_mode")
    if (conn_mode == "onDemand") then
        uci:set("network", setion_name, "conn_mode", "always")
    end
    wanCommon.wanConfig_Reload(uci)
end

function M.ipv6to4_handler(json)
    --log.console_r(json)
    if (validator.post_data_validate(json, wan6to4config_maps) == false) then
        log.print("Failed to parse the input JSON data!!!");
        return {status="error", message=tostring(json) };
    end
  
    --wan
    v6disable.checkIpv6TypeChange(json["v6Type"])
    uci:set("network", "wan_v6", "conntype", json["v6Type"])
    uci:set("network", "wan_v6", "proto", "6to4")
    ipv6RelaySet(json["relayRouterType"], json["relayRouterIp"])
    --dns
    v6autocfg.ipv6DnsSet(json["dnsType"], json["dns1"], json["dns2"])
    --lan
    v6autocfg.ipv6LanSet(json["lanIpAddr"], json["enableInterfaceId"], json["lanInterfaceId"])
    --firewall
    v6autocfg.ipv6FwSet(json["filter"])
    --set v4 wan connect mode
    set_wan4_connmode()
    --commit & apply the settings
	uci:commit("network")
    --post function must use table.insert(changed_config, "xxxx") to replace uci:apply("xxxx")
    table.insert(changed_config, "network")

	return {status="success", message="Finish IPv6 Setup"}
end

return M