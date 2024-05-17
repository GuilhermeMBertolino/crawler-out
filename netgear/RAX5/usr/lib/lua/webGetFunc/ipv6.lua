-- Functions for IPV6
local M = {}

local uci  = require "luci.model.uci".cursor()
local json = require "luci.json"
local sys  = require "luci.sys"
local util = require "luci.util"
local log = require "luci.log" -- for debug
local inet = require "webGetFunc.interface"

log.debug(0)

function M.getSelectVal_v6Type()
    local conntype = uci:get("network", "wan_v6", "conntype")
    return conntype
end

function getWan6Ip()
    local ip = ""
    local ifstatus_wan6 = sys.exec("ifstatus wan_v6 2>/dev/null")
    local wan6 = json.decode(ifstatus_wan6)

    if (wan6 ~= nil) then
        if (wan6["ipv6-address"] and wan6["ipv6-address"][1] and  wan6["ipv6-address"][1]["address"]) then
            ip =  wan6["ipv6-address"][1]["address"]
        end
    end
    return ip
end

function getWan6Gateway()
    local gatewayIp = ""
    local ifstatus_wan6 = sys.exec("ifstatus wan_v6 2>/dev/null")
    local wan6 = json.decode(ifstatus_wan6)

    if (wan6 ~= nil) then
        if (wan6["route"] and wan6["route"][1] and  wan6["route"][1]["nexthop"]) then
            gatewayIp =  wan6["route"][1]["nexthop"]
        end
    end

    if (gatewayIp == nil or gatewayIp == "" or gatewayIp == "::") then
        gatewayIp = sys.exec("ip -6 route | grep 'default' | head -n 1 | awk {'printf $5'}")
    end

    return gatewayIp
end

function getDnsServerIpAddr6(idx)
    local ifstatus_wan6 = sys.exec("ifstatus wan_v6 2>/dev/null")
    local wan6_status = json.decode(ifstatus_wan6)
    local dns6 = ""

    if (wan6_status ~= nil) then
        if ( wan6_status["dns-server"] and wan6_status["dns-server"][tonumber(idx)] ) then
            dns6 = wan6_status["dns-server"][tonumber(idx)]
        end
    end

    if (dns6 == nil or dns6 == "") then
        if(getDns6type() == "fixed") then
            local dns = uci:get_list("network", "wan2", "dns")
            dns6 = dns[tonumber(idx)] and dns[tonumber(idx)] or ""
        else
            dns6 = ""
        end
    end

    return dns6
end

function getIPv6LanPrefixAddrStatic()
    local v6LanAddr=""
    local v6LanPrefix=""
    local v6LanPrefixAddr=""

    local ifstatus_lan6 = sys.exec("ifstatus lan 2>/dev/null")
    local lan6 = json.decode(ifstatus_lan6)

    if (lan6 ~= nil) then
        if (lan6["ipv6-address"] and lan6["ipv6-address"][1] and lan6["ipv6-address"][1]["address"] and lan6["ipv6-address"][1]["mask"] ) then
            v6LanAddr = lan6["ipv6-address"][1]["address"]
            v6LanPrefix = lan6["ipv6-address"][1]["mask"]
        end
    end

    if ( v6LanAddr == nil or v6LanPrefix == nil) then
        v6LanPrefixAddr = ""
    end

    v6LanPrefixAddr = v6LanAddr.."/"..v6LanPrefix

    return v6LanPrefixAddr
end

function getIPv6LanPrefixAddrNonStatic()
    local v6LanAddr=""
    local v6LanPrefix=""
    local v6LanPrefixAddr=""

    local ifstatus_lan6 = sys.exec("ifstatus lan 2>/dev/null")
    local lan6 = json.decode(ifstatus_lan6)

    if (lan6 ~= nil) then
        if (lan6["ipv6-prefix-assignment"] and lan6["ipv6-prefix-assignment"][1] and lan6["ipv6-prefix-assignment"][1]["address"] and lan6["ipv6-prefix-assignment"][1]["mask"]) then
            local v6LanAddr = lan6["ipv6-prefix-assignment"][1]["address"]
            local v6LanPrefix = lan6["ipv6-prefix-assignment"][1]["mask"]
        end
    end

    if ( v6LanAddr == nil or v6LanPrefix == nil) then
        v6LanPrefixAddr = ""
    end

    v6LanPrefixAddr = v6LanAddr.."/"..v6LanPrefix

    return v6LanPrefixAddr
end

function getWan6Fixip()
    local ip = uci:get("network", "wan_v6", "ip6addr")
    local addr = ""

    if (ip ~= "" and ip ~= nil) then
        addr = util.split(ip, "/")
        return addr[1]
    else
        return ""
    end
end

function getWan6PrefixLen()
    local ip = uci:get("network", "wan_v6", "ip6addr")
    local addr = ""

    if (ip ~= "" and ip ~= nil) then
        addr = util.split(ip, "/")
        return addr[2]
    else
        return ""
    end
end

function getWan6Gw()
    local gw = uci:get("network", "wan_v6", "ip6gw")

    return gw
end

function getDns6type()
    local dnsType = uci:get("network", "wan_v6", "dnstype")

    return dnsType
end

function getDns(idx)
    local dns = {}
    local ret_dns = ""
        
    dns = uci:get_list("network", "wan_v6", "dns")
    if (idx == 1) then
        ret_dns = dns[1]
    elseif (idx == 2) then
        ret_dns = dns[2]
    end

    return ret_dns
end

function getLan6Ip()
    local ip = ""
    local ifstatus_lan6 = sys.exec("ifstatus lan 2>/dev/null")
    local lan6 = json.decode(ifstatus_lan6)

    if (lan6 ~= nil) then
        if (lan6["ipv6-prefix-assignment"] and lan6["ipv6-prefix-assignment"][1] and
            lan6["ipv6-prefix-assignment"][1]["local-address"] and lan6["ipv6-prefix-assignment"][1]["local-address"]["address"]) then
            ip = lan6["ipv6-prefix-assignment"][1]["local-address"]["address"]
        end
    end
    return ip
end

function getLan6Fixip()
    local ip = uci:get("network", "lan", "ip6addr")
    local addr = ""

    if (ip ~= "" and ip ~= nil) then
        addr = util.split(ip, "/")
        return addr[1]
    else
        return ""
    end
end

function getLan6PrefixLen()
    local ip = uci:get("network", "lan", "ip6addr")
    local addr =""

    if (ip ~= "" and ip ~= nil) then
        addr = util.split(ip, "/")
        return addr[2]
    else
        return ""
    end
end

function getLan6IpType()
    local lan6_mode = uci:get("dhcp", "lan", "v6_mode")

    return lan6_mode
end

-- auto config mode and dhcpv6 mode
function M.getTextVal_AutoConfig_dhcpUserClass()
    local class = uci:get("network", "wan_v6", "userclass")

    return class
end

function M.getTextVal_AutoConfig_dhcpDomain()
    local domain = uci:get("network", "wan_v6", "search")

    return domain
end

function M.getSpanVal_AutoConfig_wan6Ip()
    return getWan6Ip()
end

function M.getRadioVal_AutoConfig_dnsType()
    return getDns6type()
end

function M.getIpVal_AutoConfig_Dns1()
    return getDns(1)
end

function M.getIpVal_AutoConfig_Dns2()
    return getDns(2)
end

function M.getSpanVal_AutoConfig_lan6Ip()
    return getLan6Ip()
end

function M.getRadioVal_AutoConfig_lanIpAddr()
    return getLan6IpType()
end

function M.getCheckboxVal_AutoConfig_enableInterfaceId()
    local use_id = uci:get("dhcp", "lan", "use_interfaceid")
    return use_id
end

function M.getIpVal_AutoConfig_lanInterfaceId()
    local itf_id = ""
    if (M.getCheckboxVal_AutoConfig_enableInterfaceId() == "true") then
        local id = uci:get("network", "lan", "ip6ifaceid")
        itf_id = string.sub(id, 3)
    end

    return itf_id
end

function M.getRadioVal_filter()
    local filter_mode = uci:get("firewall", "@defaults[0]", "ipv6_filter")
    return filter_mode
end

-- fixed mode
function M.getIpVal_ipAddr()
    return getWan6Fixip()
end

function M.getTextVal_ipPrefix()
    return getWan6PrefixLen()
end

function M.getIpVal_gateway()
    return getWan6Gw()
end

function M.getIpVal_lanIp()
    return getLan6Fixip()
end

function M.getTextVal_lanIpPrefix()
    return getLan6PrefixLen()
end

--6to4
function M.getRadioVal_6to4_relayRouterType()
    local relay_mode = uci:get("network", "wan_v6", "6to4_relay")
    if (relay_mode == nil) then
        relay_mode = "dynamic"
    end
    return relay_mode
end

function M.getIpVal_6to4_relayRouterIp()
    local relay_ip = uci:get("network", "wan_v6", "remote")
    return relay_ip
end

--6rd
function M.getIpVal_6rd_prefix()
    local prefix = uci:get("network", "wan_v6", "ip6prefix")
    if (prefix ~= nil) then
        return prefix:gsub("::", "")
    end
    return prefix
end

function M.getTextVal_6rd_prefixLength()
    local prefix_len = uci:get("network", "wan_v6", "ip6prefixlen")
    return prefix_len
end

function M.getIpVal_6rd_ipv4BoderAddr()
    local addr = uci:get("network", "wan_v6", "peeraddr")
    return addr
end

function M.getTextVal_6rd_ipv4BoderMaskLen()
    local prefix_len = uci:get("network", "wan_v6", "ip4prefixlen")
    return prefix_len
end

-- pppoe
function getPppDns(idx)
    local dns = {}
    local ret_dns = ""
        
    dns = uci:get_list("network", "wan2", "dns")
    if (idx == 1) then
        ret_dns = dns[1]
    elseif (idx == 2) then
        ret_dns = dns[2]
    end

    return ret_dns
end

function M.getCheckboxVal_Pppoe_usePPPoEv4()
    local use_v4 = uci:get("network", "wan_v6", "use_v4")
    if (use_v4 == nil) then
        return "false"
    else
        return use_v4
    end
end

function M.getTextVal_Pppoe_login()
    local login = uci:get("network", "wan2", "username")
    return login
end

function M.getTextVal_Pppoe_password()
    local passwd = uci:get("network", "wan2", "password")
    return passwd
end

function M.getTextVal_Pppoe_serviceName()
    local serv = uci:get("network", "wan2", "service")
    return serv
end

function M.getSelectVal_Pppoe_mode()
    local connmode = uci:get("network", "wan2", "pppconn_mode")
    if (connmode == nil) then
        return "always"
    else
        return connmode
    end
end

function M.getRadioVal_Pppoe_dnsType()
    local dnsType = uci:get("network", "wan2", "peerdns")
    if (dnsType == '0') then
        return "fixed"
    else
        return "dynamic"
    end
end

function M.getIpVal_Pppoe_Dns1()
    return getPppDns(1)
end

function M.getIpVal_Pppoe_Dns2()
    return getPppDns(2)
end

function M.get_wanMode()
    local wanv4_mode = inet.get_wanMode()
    return wanv4_mode
end

function M.getPppoeMode()
    local pppv4_connmode = uci:get("network", "inet_pppoe", "conn_mode")
    return pppv4_connmode
end

function M.getGatewayIpAddr_For_AdvancedHome()
    return getWan6Gateway()
end

function M.getDnsServer_For_AdvancedHome()
    local v6wanDNS, v6Dns1, v6Dns2
    v6Dns1 = getDnsServerIpAddr6(1)
    v6Dns2 = getDnsServerIpAddr6(2)

    if v6Dns1 == "" then
        v6wanDNS = "::"
    else
        v6wanDNS = v6Dns1.."<br>"..v6Dns2
    end

    return v6wanDNS
end

function M.getIPv6LanPrefixAddr()
    local v6Type = uci:get("network", "wan_v6", "proto")
    local v6LanPrefixAddr

    if ( v6Type == "static" ) then
        v6LanPrefixAddr = getIPv6LanPrefixAddrStatic()
    else
        v6LanPrefixAddr = getIPv6LanPrefixAddrNonStatic()
    end

    return v6LanPrefixAddr
end

-- auto detect mode
function M.getWanConnectionStatus()
    local port_state = sys.exec("swconfig dev MT7530 port 0 get link 2>/dev/null")

    if (string.find(port_state, "link:up")) then
        return "up"
    else
        return "down"
    end
end

function M.getMlangVal_AutoDetect_detectResult()
    local type = uci:get("network", "wan_v6", "detect_type")
    if (type == nil) then
        type = M.getWanConnectionStatus()
    end
    return type
end

return M
