-- Licensed to the public under the Apache License 2.0.
local M = {}
local uci    = require "luci.model.uci".cursor()
local log    = require "luci.log"
local validator = require "commonFunc.validator"
local netutils = require "commonFunc.netUtils"
local v6disable = require "webPostHandler.ipv6Disable"
local v6autocfg = require "webPostHandler.ipv6AutoConfig"

log.debug(0)

function wan6rd_validator(parm, value)
    local ret = false
    if (parm == "ipv4BoderAddr" and value ~= nil) then
        ret = netutils.checkIpv4Format(value)
    elseif (parm == "ipv4BoderMaskLen") then
        if (tonumber(value) > 0 and tonumber(value) < 33) then
            ret = true
        end
    elseif (parm == "prefix" and value ~= nil) then
        for w in value:gmatch("([^:]+)") do
            if (w:match("^([a-fA-F0-9:]+)$") ~= nil) then
                ret = true
            else
                ret = false
                break
            end
        end
    elseif (parm == "prefixLength" and value ~= nil) then
        if (tonumber(value) > 0 and tonumber(value) < 128) then
            ret = true
        end
    end

    return ret
end

local wan6rdconfig_maps =
{
    prefix              = { data_type = "ipv6_prefix", handler = wan6rd_validator },
    prefixLength        = { data_type = "ipv6_prefix_len", handler = wan6rd_validator },
    ipv4BoderAddr       = { data_type = "ipv4_addr", handler = wan6rd_validator },
    ipv4BoderMaskLen    = { data_type = "ipv4_mask_len", handler = wan6rd_validator },
    dns1                = { data_type = "ipv6_addr", handler = nil },
    dns2                = { data_type = "ipv6_addr", handler = nil },
    lanIpAddr           = { data_type = "ipv6_lan", handler = nil },
    enableInterfaceId   = { data_type = "ipv6_intfidstatus", handler = nil },
    lanInterfaceId      = { data_type = "ipv6_intfid", handler = nil },
    filter              = { data_type = "ipv6_filter", handler = nil }
};

function ipv6Cfg(prefix, len)
    local pref = prefix.."::"
    uci:set("network", "wan_v6", "ip6prefix", pref)
    uci:set("network", "wan_v6", "ip6prefixlen", len)
end

function ipv6BorderSet(bd_ip, len)
    uci:set("network", "wan_v6", "peeraddr", bd_ip)
    uci:set("network", "wan_v6", "ip4prefixlen", len)
end

function M.ipv6rdTunnel_handler(json)
    log.console_r(json)
    if (validator.post_data_validate(json, wan6rdconfig_maps) == false) then
        log.print("Failed to parse the input JSON data!!!");
        return {status="error", message=tostring(json) };
    end

    --wan
    v6disable.checkIpv6TypeChange(json["v6Type"])
    uci:set("network", "wan_v6", "conntype", json["v6Type"])
    uci:set("network", "wan_v6", "proto", "6rd")
    ipv6Cfg(json["prefix"], json["prefixLength"])
    ipv6BorderSet(json["ipv4BoderAddr"], json["ipv4BoderMaskLen"])
    --dns
    v6autocfg.ipv6DnsSet(json["dnsType"], json["dns1"], json["dns2"])
    --lan
    v6autocfg.ipv6LanSet(json["lanIpAddr"], json["enableInterfaceId"], json["lanInterfaceId"])
    --firewall
    v6autocfg.ipv6FwSet(json["filter"])
    --commit & apply the settings
	uci:commit("network")
    --post function must use table.insert(changed_config, "xxxx") to replace uci:apply("xxxx")
    table.insert(changed_config, "network")

	return {status="success", message="Finish IPv6 Setup"}
end

return M