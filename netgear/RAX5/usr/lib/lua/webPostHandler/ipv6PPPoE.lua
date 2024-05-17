-- Licensed to the public under the Apache License 2.0.
local M = {}
local uci    = require "luci.model.uci".cursor()
local log    = require "luci.log"
local validator = require "commonFunc.validator"
local v6autocfg = require "webPostHandler.ipv6AutoConfig"
local v6disable = require "webPostHandler.ipv6Disable"
local ipv6 = require "webGetFunc.ipv6"
local wanCommon = require "webPostHandler.wanCommon"

log.debug(0)

function wanPppoev6_validator(parm, value)
    local ret = true   
    if (value ~= nil and value ~= "") then
        if (parm == "login" or parm == "password" or parm == "serviceName") then
            if (string.gmatch(value, "^[\x21-\x7f]{1,64}$") == nil) then
                ret = false
            end
        end
    end

    return ret
end

local pppconfig_maps =
{
    usePPPoEv4  = { data_type = "boolean",          handler = nil },
    login       = { data_type = "ppp_user",         handler = wanPppoev6_validator },
    password    = { data_type = "ppp_pwd",          handler = wanPppoev6_validator },
    serviceName = { data_type = "service_name",     handler = wanPppoev6_validator },
    mode        = { data_type = "ppp_mode",         handler = nil },
    dns1        = { data_type = "ipv6_domain_len",  handler = nil },
    dns2        = { data_type = "ipv6_domain_len",  handler = nil },
    lanIpAddr   = { data_type = "ipv6_lan",         handler = nil },
    filter      = { data_type = "ipv6_filter",      handler = nil }
};

function ipv6PppDnsSet(type, dns1, dns2)
    local dnsnil = "0000:0000:0000:0000:0000:0000:0000:0000"
    local dns_list = {}
    log.console("dns type "..type)
    log.console("dns1 "..dns1)
    log.console("dns2 "..dns2)
    uci:set("network", "wan_v6", "dnstype", type)
    uci:delete("network", "wan2", "dns")
    if (type == "fixed") then
        if (dns1 ~= dnsnil) then
            table.insert(dns_list, dns1)
        end

        if (dns2 ~= dnsnil) then
            table.insert(dns_list, dns2)
        end
        uci:set("network", "wan2", "peerdns", 0)
        uci:set_list("network", "wan2", "dns", dns_list)
    else
        uci:set("network", "wan2", "peerdns", 1)
    end
    uci:commit("network")
end

function M.ipv6PPPoE_handler(json)
    --log.console_r(json)
    if (validator.post_data_validate(json, pppconfig_maps) == false) then
        log.print("Failed to parse the input JSON data!!!");
        return {status="error", message=tostring(json) };
    end

    if (ipv6.get_wanMode() == "PPPoE") then
        --if v4 wan mode is pppoe, change v4 wan mode to always on
        --ipv6 pppoe only support always on
        uci:set("network", "inet_pppoe", "conn_mode", "always")
        wanCommon.wanConfig_Reload(uci)
    end
    --wan
    v6disable.checkIpv6TypeChange(json["v6Type"])
    if (json["usePPPoEv4"] == "true") then
        --one ppp session
        uci:set("network", "wan", "ipv6", "1")
        uci:set("network", "wan_v6", "ifname", "@wan")
        uci:set("network", "wan2", "disabled", "1")
    else
        --two ppp session
        uci:set("network", "wan", "ipv6", "0")
        uci:set("network", "wan2", "interface")
        uci:set("network", "wan2", "proto", "pppoe")
        uci:set("network", "wan2", "ipv6", "1")
        uci:set("network", "wan2", "ifname", "eth1")
        uci:set("network", "wan2", "username", json["login"])
        uci:set("network", "wan2", "password", json["password"])
        uci:set("network", "wan2", "service", json["serviceName"])
        uci:set("network", "wan2", "pppconn_mode", json["mode"])
        uci:set("network", "wan_v6", "ifname", "@wan2")
        uci:set("network", "wan2", "disabled", "")
    end
    uci:set("network", "wan_v6", "proto", "dhcpv6")
    uci:set("network", "wan_v6", "ipv6", "1")
    uci:set("network", "wan_v6", "reqaddress", "try")
    uci:set("network", "wan_v6", "conntype", json["v6Type"])
    uci:set("network", "wan_v6", "use_v4", json["usePPPoEv4"])
    --dns
    ipv6PppDnsSet(json["dnsType"], json["dns1"], json["dns2"])
    --lan
    v6autocfg.ipv6LanSet(json["lanIpAddr"], json["enableInterfaceId"], json["lanInterfaceId"])
    --firewall
    v6autocfg.ipv6FwSet(json["filter"])
    --commit & apply the settings
	uci:commit("network")
    --TODO:SPI firewall

	--post function must use table.insert(changed_config, "xxxx") to replace uci:apply("xxxx")
    table.insert(changed_config, "network")

	return {status="success", message="Finish IPv6 Setup"}
end

return M
