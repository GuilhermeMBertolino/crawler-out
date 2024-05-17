-- Licensed to the public under the Apache License 2.0.
local M = {}
local uci    = require "luci.model.uci".cursor()
local log    = require "luci.log"
local sys    = require "luci.sys"
local validator = require "commonFunc.validator"
local v6disable = require "webPostHandler.ipv6Disable"

log.debug(0)

local wanautoconfig_maps =
{
    dhcpUserClass     = { data_type = "ipv6_domain_len"},
    dhcpDomain        = { data_type = "ipv6_domain_len"},
    dns1              = { data_type = "ipv6_addr"},
    dns2              = { data_type = "ipv6_addr"},
    lanIpAddr         = { data_type = "ipv6_lan"},
    enableInterfaceId = { data_type = "ipv6_intfidstatus"},
    lanInterfaceId    = { data_type = "ipv6_intfid"},
    filter            = { data_type = "ipv6_filter"}
};

function M.ipv6DnsSet(type, dns1, dns2)
    local dnsnil = "0000:0000:0000:0000:0000:0000:0000:0000"
    local dns_list = {}
    log.console("dns type "..type)
    log.console("dns1 "..dns1)
    log.console("dns2 "..dns2)
    uci:set("network", "wan_v6", "dnstype", type)
    uci:delete("network", "wan_v6", "dns")
    if (type == "fixed") then
        if (dns1 ~= dnsnil) then
            table.insert(dns_list, dns1)
        end

        if (dns2 ~= dnsnil) then
            table.insert(dns_list, dns2)
        end
        uci:set_list("network", "wan_v6", "dns", dns_list)
    end
    uci:commit("network")
end

function M.ipv6LanSet(mode, use_interfaceid, id)
    local itf_id = "::"..id
    local lan_mode = uci:get("dhcp", "lan", "v6_mode")
    log.console("lanIpAddr "..mode)
    log.console("enableInterfaceId "..use_interfaceid)
    log.console("lanInterfaceId "..id)

    uci:set("dhcp", "lan", "dhcpv6", "server")
    uci:set("dhcp", "lan", "ra", "server")
    uci:set("dhcp", "lan", "v6_mode", mode)
    if mode ~= lan_mode then
        if (mode == "dhcp") then
            uci:set("dhcp", "lan", "dhcpv6_na", "1")
            uci:set("dhcp", "lan", "dhcpv6_pd", "1")
            uci:set("dhcp", "lan", "ra_management", "1")
            uci:set("dhcp", "lan", "ra_prefix", "0")
            uci:set("dhcp", "lan", "ra_default", "2")
        else
            uci:set("dhcp", "lan", "dhcpv6_na", "0")
            uci:set("dhcp", "lan", "dhcpv6_pd", "0")
            uci:set("dhcp", "lan", "ra_management", "0")
            uci:set("dhcp", "lan", "ra_prefix", "1")
            uci:set("dhcp", "lan", "ra_default", "0")
        end
        -- lan down/up
        sys.call("touch /var/state/ipv6changed")
    end
    uci:set("dhcp", "lan", "use_interfaceid", use_interfaceid)
    if (use_interfaceid == "true") then
        uci:set("network", "lan", "ip6ifaceid", itf_id)
    else
        uci:set("network", "lan", "ip6ifaceid", "eui64")
    end
    uci:commit("dhcp")
    uci:commit("network")
end

function M.ipv6FwSet(mode)
    log.console("filer "..mode)
    uci:set("firewall", "@defaults[0]", "ipv6_filter", mode)
    uci:commit("firewall")
end

function M.ipv6UserClassSet(user_class)
    log.console("dhcpUserClass" ..user_class);
    uci:delete("network", "wan_v6", "userclass")
    if (user_class ~= "") then
        uci:set("network", "wan_v6", "userclass", user_class)
    end
    uci:commit("network")
end

function M.ipv6DomainSet(domain)
    log.console("dhcpDomain "..domain)
    uci:delete("network", "wan_v6", "search")
    if (user_class ~= "") then
        uci:set("network", "wan_v6", "search", domain)
    end
    uci:commit("network")
end

function M.ipv6AutoConfig_handler(json)
    --log.console_r(json)
    if (validator.post_data_validate(json, wanautoconfig_maps) == false) then
        log.print("Failed to parse the input JSON data!!!");
        return {status="error", message=tostring(json) };
    end

    --wan
    v6disable.checkIpv6TypeChange(json["v6Type"])
    uci:set("network", "wan_v6", "conntype", json["v6Type"])
    uci:set("network", "wan_v6", "proto", "dhcpv6")
    if (json["v6Type"] == "autoConfig") then
        uci:set("network", "wan_v6", "reqaddress", "try")
    else
        uci:set("network", "wan_v6", "reqaddress", "force")
    end
    M.ipv6UserClassSet(json["dhcpUserClass"])
    M.ipv6DomainSet(json["dhcpDomain"])
    --dns
    M.ipv6DnsSet(json["dnsType"], json["dns1"], json["dns2"])
    --lan
    M.ipv6LanSet(json["lanIpAddr"], json["enableInterfaceId"], json["lanInterfaceId"])
    --firewall
    M.ipv6FwSet(json["filter"])
    --commit & apply the settings
    uci:commit("network")
    uci:commit("dhcp")
    --TODO:SPI firewall

    --post function must use table.insert(changed_config, "xxxx") to replace uci:apply("xxxx")
    table.insert(changed_config, "network")

    return {status="success", message="Finish IPv6 Setup"}
end

return M
