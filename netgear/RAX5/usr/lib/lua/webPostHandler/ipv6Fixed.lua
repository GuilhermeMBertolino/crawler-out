-- Licensed to the public under the Apache License 2.0.
local M = {}
local uci    = require "luci.model.uci".cursor()
local log    = require "luci.log"
local validator = require "commonFunc.validator"
local v6autocfg = require "webPostHandler.ipv6AutoConfig"
local v6disable = require "webPostHandler.ipv6Disable"

log.debug(0)

local fixedconfig_maps =
{
    ipAddr      = { data_type = "ipv6_addr"},
    ipPrefix    = { data_type = "ipv6_prefix"},
    gateway     = { data_type = "ipv6_addr"},
    dns1        = { data_type = "ipv6_addr"},
    dns2        = { data_type = "ipv6_addr"},
    lanIpAddr   = { data_type = "ipv6_lan"},
    lanIp       = { data_type = "ipv6_addr"},
    lanIpPrefix = { data_type = "ipv6_prefix"},
    filter      = { data_type = "ipv6_filter"}
};

function combin_v6ip(v6ip, prefix)
    local ip = v6ip.."/"..prefix
    log.console("fixed v6 ip "..ip)
    return ip
end

function M.ipv6Fixed_handler(json)
    local wan_ip = ""
    local lan_ip = ""
    --log.console_r(json)
    if (validator.post_data_validate(json, fixedconfig_maps) == false) then
        log.print("Failed to parse the input JSON data!!!");
        return {status="error", message=tostring(json) };
    end

    --wan
    v6disable.checkIpv6TypeChange(json["v6Type"])
    wan_ip = combin_v6ip(json["ipAddr"], json["ipPrefix"])
    uci:set("network", "wan_v6", "conntype", json["v6Type"])
    uci:set("network", "wan_v6", "proto", "static")
    uci:set("network", "wan_v6", "ip6addr", wan_ip)
    uci:set("network", "wan_v6", "ip6gw", json["gateway"])
    --dns
    v6autocfg.ipv6DnsSet("fixed", json["dns1"], json["dns2"])
    --lan
    lan_ip = combin_v6ip(json["lanIp"], json["lanIpPrefix"])
    v6autocfg.ipv6LanSet(json["lanIpAddr"], "false", "")
    uci:set("network", "lan", "ip6addr", lan_ip)
    --firewall
    v6autocfg.ipv6FwSet(json["filter"])
    --commit & apply the settings
	uci:commit("network")
    uci:commit("dhcp")
    --TODO:SPI firewall

	--post function must use table.insert(changed_config, "xxxx") to replace uci:apply("xxxx")
    table.insert(changed_config, "network")

	return {status="success", message="Finish IPv6 Setup"}
end

return M
