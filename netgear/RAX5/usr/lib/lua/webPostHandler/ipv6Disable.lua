-- Licensed to the public under the Apache License 2.0.
local M = {}
local uci    = require "luci.model.uci".cursor()
local log    = require "luci.log"
local sys    = require "luci.sys"

log.debug(0)

function M.ipv6DefAutoCfg()
    uci:set("network", "wan_v6", "dnstype", "dynamic")
    uci:delete("network", "wan_v6", "dns")
    uci:delete("network", "wan_v6", "reqaddress")
    uci:delete("network", "wan_v6", "userclass")
    uci:delete("network", "wan_v6", "search")
    uci:set("dhcp", "lan", "v6_mode", "auto")
    uci:set("dhcp", "lan", "dhcpv6_na", "0")
    uci:set("dhcp", "lan", "dhcpv6_pd", "0")
    uci:set("dhcp", "lan", "ra_management", "0")
    uci:set("dhcp", "lan", "ra_prefix", "1")
    uci:set("dhcp", "lan", "ra_default", "0")
    uci:set("dhcp", "lan", "use_interfaceid", "false")
    uci:set("network", "lan", "ip6ifaceid", "eui64")
    uci:set("firewall", "@defaults[0]", "ipv6_filter", "secured")
    uci:commit("network")
    uci:commit("dhcp")
    uci:commit("firewall")
end

function M.ipv6DefFixed()
    uci:set("network", "wan_v6", "dnstype", "dynamic")
    uci:delete("network", "wan_v6", "ip6addr")
    uci:delete("network", "wan_v6", "ip6gw")
    uci:delete("network", "wan_v6", "dns")
    uci:set("dhcp", "lan", "v6_mode", "auto")
    uci:set("dhcp", "lan", "dhcpv6_na", "0")
    uci:set("dhcp", "lan", "dhcpv6_pd", "0")
    uci:set("dhcp", "lan", "ra_management", "0")
    uci:set("dhcp", "lan", "ra_prefix", "1")
    uci:set("dhcp", "lan", "ra_default", "0")
    uci:delete("network", "lan", "ip6addr")
    uci:set("firewall", "@defaults[0]", "ipv6_filter", "secured")
    uci:commit("network")
    uci:commit("dhcp")
    uci:commit("firewall")
end

function M.ipv6DefDisable(type)
    --wan
    uci:set("network", "wan_v6", "proto", "none")
    uci:set("network", "wan_v6", "conntype", type)
    --lan
    uci:set("dhcp", "lan", "dhcpv6", "disabled")
    uci:set("dhcp", "lan", "ra", "disabled")
    uci:commit("network")
    uci:commit("dhcp")
end

function M.ipv6DefPthru()
    uci:delete("network", "wan_v6pthru")
    uci:commit("network")
end
    
function M.ipv6Def6to4()
    uci:set("network", "wan_v6", "dnstype", "dynamic")
    uci:delete("network", "wan_v6", "dns")
    uci:delete("network", "wan_v6", "6to4_relay")
    uci:delete("network", "wan_v6", "remote")
    uci:set("dhcp", "lan", "v6_mode", "auto")
    uci:set("dhcp", "lan", "dhcpv6_na", "0")
    uci:set("dhcp", "lan", "dhcpv6_pd", "0")
    uci:set("dhcp", "lan", "ra_management", "0")
    uci:set("dhcp", "lan", "ra_prefix", "1")
    uci:set("dhcp", "lan", "ra_default", "0")
    uci:set("dhcp", "lan", "use_interfaceid", "false")
    uci:set("network", "lan", "ip6ifaceid", "eui64")
    uci:set("firewall", "@defaults[0]", "ipv6_filter", "secured")
    uci:commit("network")
    uci:commit("dhcp")
    uci:commit("firewall")
end

function M.ipv6Def6rd()
    uci:set("network", "wan_v6", "dnstype", "dynamic")
    uci:delete("network", "wan_v6", "dns")
    uci:delete("network", "wan_v6", "ip6prefix")
    uci:delete("network", "wan_v6", "ip6prefixlen")
    uci:delete("network", "wan_v6", "peeraddr")
    uci:delete("network", "wan_v6", "ip4prefixlen")
    uci:set("dhcp", "lan", "v6_mode", "auto")
    uci:set("dhcp", "lan", "dhcpv6_na", "0")
    uci:set("dhcp", "lan", "dhcpv6_pd", "0")
    uci:set("dhcp", "lan", "ra_management", "0")
    uci:set("dhcp", "lan", "ra_prefix", "1")
    uci:set("dhcp", "lan", "ra_default", "0")
    uci:set("dhcp", "lan", "use_interfaceid", "false")
    uci:set("network", "lan", "ip6ifaceid", "eui64")
    uci:set("firewall", "@defaults[0]", "ipv6_filter", "secured")
    uci:commit("network")
    uci:commit("dhcp")
    uci:commit("firewall")
end

function M.ipv6DefPpp()
    uci:delete("network", "wan2")
    uci:delete("network", "wan_v6", "reqaddress")
    uci:delete("network", "wan_v6", "use_v4")
    uci:delete("network", "wan_v6", "ipv6")
    uci:delete("network", "wan", "ipv6")
    uci:set("network", "wan_v6", "dnstype", "dynamic")
    uci:set("network", "wan_v6", "ifname", "eth1")
    uci:set("dhcp", "lan", "v6_mode", "auto")
    uci:set("dhcp", "lan", "dhcpv6_na", "0")
    uci:set("dhcp", "lan", "dhcpv6_pd", "0")
    uci:set("dhcp", "lan", "ra_management", "0")
    uci:set("dhcp", "lan", "ra_prefix", "1")
    uci:set("dhcp", "lan", "use_interfaceid", "false")
    uci:delete("dhcp", "lan", "ra_default")
    uci:set("network", "lan", "ip6ifaceid", "eui64")
    uci:set("firewall", "@defaults[0]", "ipv6_filter", "secured")
    uci:commit("network")
    uci:commit("dhcp")
    uci:commit("firewall")
end

function M.ipv6DefAutoDetect()
    local detect_type = uci:get("network", "wan_v6", "detect_type")
    if (detect_type == "DHCP" or detect_type == "Auto Config") then
        M.ipv6DefAutoCfg()
    elseif (detect_type == "6to4 Tunnel") then
        M.ipv6Def6to4()
    elseif (detect_type == "Pass Through") then
        M.ipv6DefPthru()
    end
    uci:delete("network", "wan_v6", "detect_type")
    uci:commit("network")
    --delete auto detect file
    os.remove("/tmp/over_detect6")
    --os.remove("/tmp/ipv6autodetect")
    --os.remove("/tmp/ipv6autodetect.log")
end

function M.ipv6DelOtherType(conntype)
    if (conntype == "autoConfig" or conntype == "dhcp") then
        M.ipv6DefAutoCfg()
    elseif (conntype == "fixed") then
        M.ipv6DefFixed()
    elseif (conntype == "6rd") then
        M.ipv6Def6rd()
    elseif (conntype == "6to4") then
        M.ipv6Def6to4()
    elseif (conntype == "bridge") then
        M.ipv6DefPthru()
    elseif (conntype == "pppoe") then
        M.ipv6DefPpp()
    elseif (conntype == "autoDetect") then
        M.ipv6DefAutoDetect()
    end
end

function M.checkIpv6TypeChange(type)
    local conntype = uci:get("network", "wan_v6", "conntype")

    if conntype ~= type then
        M.ipv6DelOtherType(conntype)
        -- lan down/up
        sys.call("touch /var/state/ipv6changed")
    end
end
    
function M.ipv6Disable_handler(json)
    --log.console_r(json)
    M.checkIpv6TypeChange(json["v6Type"])
    M.ipv6DefDisable(json["v6Type"])

    --TODO:SPI firewall

    --post function must use table.insert(changed_config, "xxxx") to replace uci:apply("xxxx")
	table.insert(changed_config, "network")

	return {status="success", message="Finish IPv6 Setup"}
end

return M
