-- Get functions for LAN
local M = {}

local uci  = require "luci.model.uci".cursor()
local uci_st = require "luci.model.uci".cursor_state()
local json = require "luci.json"
local sys  = require "luci.sys"
local netUtils = require "commonFunc.netUtils"
local log = require "luci.log" -- for debug

local deviceName = uci:get("system", "@system[0]", "hostname")
local wanMode = uci:get("network", "inet_global", "wan_mode")
local ifstatus_wan = luci.sys.exec("ifstatus wan 2>/dev/null")
local wan_status = json.decode(ifstatus_wan)

function M.getDeviceName()
    local hostname = uci:get("system", "@system[0]", "hostname")
    return hostname
end

function M.getLanInstanceMac()
    local mac = luci.sys.exec("ifconfig br-lan |grep HWaddr|awk '{printf $5}'")
    return mac
end

function M.getLanInstanceIpAddr()
    local ipaddr = uci:get("network", "lan", "ipaddr")
    return ipaddr
end

function M.getLanInstanceIpMask()
    local netmask = uci:get("network", "lan", "netmask")
    return netmask
end

function M.getLanDhcpv4Enable()
    local dhcpv4 = uci:get("dhcp", "lan", "dhcpv4")

    if dhcpv4 == "server" then
        dhcpv4_enable = "true"
    else -- disabled: false
        dhcpv4_enable = "false"
    end

    return dhcpv4_enable
end

function M.getLanDhcpv4EnableForAdv()
     local dhcpv4 = uci:get("dhcp", "lan", "dhcpv4")

    if dhcpv4 == "server" then
        dhcpv4_enable = "On"
    else -- disabled: Off
        dhcpv4_enable = "Off"
    end

    return dhcpv4_enable
end

function  M.getDhcpv4PoolStart()
    local  start_ip = uci:get("dhcp", "lan", "start_ip")
    return start_ip
end

function M.getDhcpv4PoolEnd()
    local end_ip = uci:get("dhcp", "lan", "end_ip")
    return end_ip
end

function M.getLanMacAddr()
    local lanMac = luci.sys.exec("ifconfig br-lan | grep HWaddr | awk -F ' ' '{print$5}'")
    return lanMac
end

function M.getRipDirection()
    local rip_dir = uci:get("routing", "rip_wan", "rip_dir");

    return rip_dir;
end

function M.getRipVersion()
    local enable = uci:get("routing", "@rip[0]", "enable");
    local rip_ver = uci:get("routing", "rip_wan", "rip_ver");

    if (enable == "0") then
        rip_ver = "disable";
    end

    return rip_ver;
end

-- For wan settings
function M.get_wanMode()
    if(wanMode ~= nil) then
        return wanMode
    else
        return "DHCP" --default
    end
end

function M.get_ipv6Type()

    local proto = uci:get("network", "wan_v6", "proto")
    return proto

end

function M.getLoginType()
    if(wanMode == "PPPoE") then
        return "PPPoE"
    elseif(wanMode == "L2TP") then
        return "L2TP"
    elseif(wanMode == "PPTP") then
        return "PPTP"
    else
        return nil
    end
end

function M.getDeviceName()
    if(deviceName ~= nil) then
        return deviceName
    else
        return ""
    end
end

function M.getDhcpv4DomainName()
    local domain = uci:get("network", "inet_ether", "domain_name")
    if(domain == nil) then
        domain = ""
    end
    return domain
end

function M.getWanConnectionType()
    if(wanMode == "DHCP") then
        return "MRS024";
    elseif(wanMode == "Static") then
        return "SWP050";
    elseif(wanMode == "PPPoE") then
        return "SWP016";
    elseif(wanMode == "PPTP") then
        return "SWP017";
    elseif(wanMode == "L2TP") then
        return "SBS037";
    end
end

-- For wan-ether settings
function M.getWanEtherIpType()
    local iptype = uci:get("network", "inet_ether", "iptype")
    if(iptype == nil) then
        iptype = "dynamic"
    end

    return iptype
end

function M.getWanEtherIpAddr()
    local iptype = M.getWanEtherIpType()
    local wan_ip
    if(iptype == "fixed") then
        --get saved wan ip
        wan_ip = uci:get("network", "inet_ether", "ipaddr")
    elseif(wanMode == "DHCP") then
        --dynamic ip, still need to return current ip address for GUI display
        if(wan_status and wan_status["ipv4-address"] and wan_status["ipv4-address"][1] and wan_status["ipv4-address"][1]["address"]) then
            wan_ip = wan_status["ipv4-address"][1]["address"]
        end
    end

    if(wan_ip == nil) then
        wan_ip = ""
    end

    return wan_ip
end

function M.getWanEtherIpMask()
    local iptype = M.getWanEtherIpType()
    local wan_mask
    if(iptype == "fixed") then
        --get saved wan mask
        wan_mask = uci:get("network", "inet_ether", "netmask")
    elseif(wanMode == "DHCP") then
        --dynamic, still need to return current mask for GUI display
        if(wan_status and wan_status["ipv4-address"] and wan_status["ipv4-address"][1] and wan_status["ipv4-address"][1]["mask"]) then
            -- need to convert bits-number into dot-decimal format
            wan_mask= netUtils.convert_bits_mask_to_dot_decimal(wan_status["ipv4-address"][1]["mask"])
        end
    end

    if(wan_mask == nil) then
        wan_mask = ""
    end
    return wan_mask
end

function M.getWanEtherGateway()
    local iptype = M.getWanEtherIpType()
    local wan_gw
    if(iptype == "fixed") then
        --get saved wan gateway
        wan_gw = uci:get("network", "inet_ether", "gateway")
    elseif(wanMode == "DHCP") then
        --dynamic, still need to return current gateway for GUI display
        if(wan_status and wan_status["route"] and wan_status["route"][1] and wan_status["route"][1]["target"]) then
            wan_gw = wan_status["route"][1]["target"]
            if(wan_gw == "0.0.0.0") then
                wan_gw = wan_status["route"][1]["nexthop"]
            end
        end
    end

    if(wan_gw == nil or wan_gw == "0.0.0.0") then
        wan_gw = ""
    end
    return wan_gw
end

function M.getDNStype()
    local dnsType = uci:get("network", "inet_global", "wan_dnstype")
    return dnsType
end

function M.getDNSServerIpAddr(idx)
    local dnsType = M.getDNStype()
    local dns
    if(dnsType == "fixed") then
        dns = uci:get("network", "inet_global", "wan_dns"..idx)
    else
        if(wan_status and wan_status["dns-server"] and wan_status["dns-server"][tonumber(idx)]) then
            dns = wan_status["dns-server"][tonumber(idx)]
        end
    end
    if(dns== nil or dns == "0.0.0.0") then
        dns = ""
    end
    return dns
end

function M.getWANMacSelect()
    local macSelect = uci:get("network", "inet_global", "mac_clone")
    local client_mac = M.getClientMac()
    local user_mac = M.getWANMacUser()

    -- Change to "user" if client_mac is different from user_mac
    -- it seems to be set from different PC, select "user" will not be confusing
    if (macSelect == "pc") and (client_mac ~= user_mac) then
        macSelect = "user"
    end
    return macSelect
end

function M.getWANCloneMac()
    local macSelect = M.getWANMacSelect();

    if (macSelect == "default") then
            return M.getWANMacDefault();
    elseif (macSelect == "pc") then
            return M.getClientMac();
    elseif (macSelect == "user") then
            return M.getWANMacUser();
    end
end

function M.getWanMacAddr()
    local ifname = uci:get("network", "wan", "ifname")
    local lanMac = luci.sys.exec("ifconfig ".. ifname .." | grep HWaddr | awk -F ' ' '{printf$5}'")
    return lanMac
end

function M.getWANMacDefault()
    local mac_addr = uci_st:get("netgear", "board", "wan_mac")
    if (mac_addr == nil) then -- should not happen
        mac_addr = ""
    end
    return mac_addr
end

function M.getClientIpAddress()
  -- todo , need to change php to lua for convert IPv6 format with IPv4
  -- IPv6 ::ffff:192.0.2.123 need to convert
  --local v4mapped_prefix_hex = '00000000000000000000ffff';
  --local v4mapped_prefix_bin = pack("H*", $v4mapped_prefix_hex);
  local nixio = require"nixio"
  local addr = nixio.getenv("REMOTE_ADDR") or ""
  --local addr_bin = inet_pton($addr);
--[[
  if( addr_bin === FALSE ) {
  // Unparsable? How did they connect?!?
    die('Invalid IP address');
  }
  if( substr(addr_bin, 0, strlen(v4mapped_prefix_bin)) == v4mapped_prefix_bin)
  {
    // Strip prefix
   addr_bin = substr(addr_bin, strlen(v4mapped_prefix_bin));
  }
  addr = inet_ntop(addr_bin);
]]
  return addr --xxx.xxx.xxx.xxx/xxxx::xxxx:xxxx
end

function M.getClientMac()

  local ipaddr = M.getClientIpAddress()
  local lookup_cmd = ""

  if ipaddr == "" then
    return ""
  end

  if #{ipaddr:match('(%d+%.%d+%.%d+%.%d+)$')}  == 1 then
    lookup_cmd = '/usr/sbin/ip -4 ne ls '..ipaddr
  elseif #{ipaddr:match('(.+:+.+)')}  == 1 then
    lookup_cmd = '/usr/sbin/ip -6 ne ls '..ipaddr
  else
    return ""
  end

  local exec  = require "luci.util".exec
  local res = exec(lookup_cmd);

  if #res > 0 then
    if string.find(res,ipaddr) ~= nil then
        local cols =  {}
        for v in string.gmatch(res,'(%S+)') do
            table.insert(cols,v)
        end
        -- log.console("Found client MAC address:"..tostring(cols[5]))
        return string.upper(cols[5])
    end
  end

  return ""
end

function M.getWANMacUser()
    -- return WAN MAC when macSelect is "default" for initial value
    local macSelect = uci:get("network", "inet_global", "mac_clone")
    if (macSelect == "default") then
        return M.getWANMacDefault()
    end

    local mac_addr = uci:get("network", "inet_global", "mac_addr")
    if (mac_addr == nil) then -- should not happen
        mac_addr = ""
    end
    return mac_addr
end

function M.getCircleActivationStatus()
    -- ToDo: Need to implement when Circle feature is implemented
    return "none"
end

-- For wan-pppoe settings
function M.getPppoeUsername()
    local username = uci:get("network", "inet_pppoe", "username")
    return username
end

function M.getPppoePassword()
    local password = uci:get("network", "inet_pppoe", "password")
    return password
end

function M.getPppoeServiceName()
    local serviceName = uci:get("network", "inet_pppoe", "service")
    return serviceName
end

function M.getPppoeMode_autoid()
    local mode = uci:get("network", "inet_pppoe", "conn_mode")

    if(mode == "onDemand") then
        return "Dail on Demand"
    elseif(mode == "always") then
        return "Always On"
    elseif(mode == "manually") then
        return "Manually Connect"
    else
        -- default
        return "Dail on Demand"
    end
end

function M.getPppoeIdleTime()
    local idleTimeout = uci:get("network", "inet_pppoe", "idle_timeout")
    if(idleTimeout == nil) then
        idleTimeout = 5
    end
    return idleTimeout
end

function M.getPppoeIpType()
    local iptype = uci:get("network", "inet_pppoe", "iptype")
    if(iptype == nil) then
        iptype = "dynamic"
    end
    return iptype
end

function M.getWanPppoeIpAddr()
    local iptype = M.getPppoeIpType()
    local wan_ip

    if(iptype == "fixed") then
        --get saved wan ip
        wan_ip = uci:get("network", "inet_pppoe", "ipaddr")
    elseif(wanMode == "PPPoE") then
        --dynamic ip, still need to return current ip address for GUI display
        if(wan_status and wan_status["ipv4-address"] and wan_status["ipv4-address"][1] and wan_status["ipv4-address"][1]["address"]) then
            wan_ip = wan_status["ipv4-address"][1]["address"]
        end
    end

    if(wan_ip == nil) then
        wan_ip = ""
    end

    return wan_ip
end

-- For wan-pptp settings
function M.getPptpUsername()
    local username = uci:get("network", "inet_pptp", "username")
    return username
end

function M.getPptpPassword()
    local password = uci:get("network", "inet_pptp", "password")
    return password
end

function M.getPptpMode_autoid()
    local mode = uci:get("network", "inet_pptp", "conn_mode")

    if(mode == "onDemand") then
        return "Dail on Demand"
    elseif(mode == "always") then
        return "Always On"
    elseif(mode == "manually") then
        return "Manually Connect"
    else
        -- default
        return "Dail on Demand"
    end
end

function M.getPptpIdleTime()
    local idleTimeout = uci:get("network", "inet_pptp", "idle_timeout")
    if(idleTimeout == nil) then
        idleTimeout = 5
    end
    return idleTimeout
end

function M.getPptpIpType()
    local iptype = uci:get("network", "inet_pptp", "iptype")
    if(iptype == nil) then
        iptype = "dynamic"
    end
    return iptype
end

function M.getPptpIpAddr()
    local iptype = uci:get("network", "inet_pptp", "iptype")
    local ipaddr
    if(iptype == "fixed") then
        ipaddr = uci:get("network", "inet_pptp", "ipaddr")
    end
    if(ipaddr == nil) then
        ipaddr = ""
    end
    return ipaddr
end

function M.getPptpIpMask()
    local iptype = uci:get("network", "inet_pptp", "iptype")
    local netmask
    if(iptype == "fixed") then
        netmask = uci:get("network", "inet_pptp", "netmask")
    end
    if(netmask == nil) then
        netmask = ""
    end
    return netmask
end

function M.getPptpServerAddr()
    local server = uci:get("network", "inet_pptp", "server")
    if(server == nil) then
        server = ""
    end
    return server
end

function M.getPptpGateway()
    local iptype = uci:get("network", "inet_pptp", "iptype")
    local gateway
    if(iptype == "fixed") then
        gateway = uci:get("network", "inet_pptp", "gateway")
    end
    if(gateway == nil) then
        gateway = ""
    end
    return gateway
end

function M.getPptpConnectId()
    local connectId = uci:get("network", "inet_pptp", "connect_id")
    if(connectId == nil) then
        connectId = ""
    end
    return connectId
end

-- For wan-l2tp settings
function M.getL2tpUsername()
    local username = uci:get("network", "inet_l2tp", "username")
    if(username == nil) then
        username = ""
    end
    return username
end

function M.getL2tpPassword()
    local password = uci:get("network", "inet_l2tp", "password")
    if(password == nil) then
        password = ""
    end
    return password
end

function M.getL2tpMode_autoid()
    local mode = uci:get("network", "inet_l2tp", "conn_mode")

    if(mode == "onDemand") then
        return "Dail on Demand"
    elseif(mode == "always") then
        return "Always On"
    elseif(mode == "manually") then
        return "Manually Connect"
    else
        -- default
        return "Dail on Demand"
    end
end

function M.getL2tpIdleTime()
    local idleTimeout = uci:get("network", "inet_l2tp", "idle_timeout")
    if(idleTimeout == nil) then
        idleTimeout = 5
    end
    return idleTimeout
end

function M.getL2tpIpType()
    local iptype = uci:get("network", "inet_l2tp", "iptype")
    if(iptype == nil) then
        iptype = "dynamic"
    end
    return iptype
end

function M.getL2tpIpAddr()
    local iptype = uci:get("network", "inet_l2tp", "iptype")
    local ipaddr
    if(iptype == "fixed") then
        ipaddr = uci:get("network", "inet_l2tp", "ipaddr")
    end
    if(ipaddr == nil) then
        ipaddr = ""
    end
    return ipaddr
end

function M.getL2tpIpMask()
    local iptype = uci:get("network", "inet_l2tp", "iptype")
    local netmask
    if(iptype == "fixed") then
        netmask = uci:get("network", "inet_l2tp", "netmask")
    end
    if(netmask == nil) then
        netmask = ""
    end
    return netmask
end

function M.getL2tpServerAddr()
    local server = uci:get("network", "inet_l2tp", "server")
    if(server == nil) then
        server = ""
    end
    return server
end

function M.getL2tpGateway()
    local iptype = uci:get("network", "inet_l2tp", "iptype")
    local gateway
        if(iptype == "fixed") then
            gateway = uci:get("network", "inet_l2tp", "gateway")
        end
    if(gateway == nil) then
        gateway = ""
    end
    return gateway
end

function M.getWANPortStatus()
    local status = (uci_st:get("network", "wan", "link") == "1") and "up" or "down"
    return status
end

function M.getInternetStatusUpDown()
    local status = (uci_st:get("network", "inet", "check") == "1") and "Up" or "Down"
    return status
end

function M.getWANLinkStatusUpDown()
    local status = (uci_st:get("network", "wan", "link") == "1") and "Up" or "Down"
    return status
end

function M.getWizardInternetStatus()
    if M.getWANPortStatus() ==  "down" then
        return "down"
    end
    local cmd_str = "ping -A -c 1 www.netgear.com  1<&-"

    local ret = luci.sys.call(cmd_str)
    log.force(cmd_str..", ret:"..tostring(ret))

    return ret == 0 and "up" or "down"
end

function M.getPppoeMode()
    local mode = uci:get("network", "inet_pppoe", "conn_mode")

    return mode
end

function M.getWanInstanceProtocol()
    local wanMode = uci:get("network", "inet_global", "wan_mode")
    wanMode = string.lower(wanMode)

    return wanMode
end

function M.checkWanIsStatic()
    local isStatic = "false"

    local wanMode = uci:get("network", "inet_global", "wan_mode")
    wanMode = string.lower(wanMode)

    if ( wanMode == "static" ) then
        isStatic = "true"
    end

    if ( (wanMode == "pppoe"  and uci:get("network", "inet_pppoe", "iptype") == "fixed") or
         (wanMode == "pptp"  and uci:get("network", "inet_pptp", "iptype") == "fixed") or
         (wanMode == "l2tp"  and uci:get("network", "inet_l2tp", "iptype") == "fixed") ) then
         isStatic = "true"
    end

    return isStatic
end

function M.getWizardWanDetectType()

    local clientMacAddr = M.getClientMac()
    local cmd_str = "/usr/bin/wandetect -i eth1 -c "..clientMacAddr .." 1<&-"
    local res = 0
    local exec  = require "luci.sys".call

    res = exec(cmd_str);
    log.force("WAN detect return value: "..tostring(res))

    if res == 1 then
        return "dhcp"
    elseif res == 2 then
        return "pppoe"
    elseif res == 3 then
        return "pptp"
    elseif res == 4 then
        return "cloneMac"
    else
        return res
    end

end

function M.getWanIpType()
    local wanIpType
    local wanMode = M.get_wanMode()

    if (wanMode == "Static" or wanMode == "DHCP") then
        wanIpType = M.getWanEtherIpType()
    elseif (wanMode == "PPPoE") then
        wanIpType = M.getPppoeIpType()
    elseif (wanMode == "PPTP") then
        wanIpType = M.getPptpIpType()
    elseif (wanMode == "L2TP") then
        wanIpType = M.getL2tpIpType()
    else
        wanIpType = M.getWanEtherIpType()
    end

    return wanIpType
end

function M.getWanIpAddr()
    local wanIpAddr
    local wanMode = M.get_wanMode()

    if (wanMode == "Static" or wanMode == "DHCP") then
        wanIpAddr = M.getWanEtherIpAddr()
    elseif (wanMode == "PPPoE") then
        wanIpAddr = M.getWanPppoeIpAddr()
    elseif (wanMode == "PPTP") then
        wanIpAddr = M.getPptpIpAddr()
    elseif (wanMode == "L2TP") then
        wanIpAddr = M.getL2tpIpAddr()
    else
        wanIpAddr = M.getWanEtherIpAddr()
    end

    return wanIpAddr
end

return M
