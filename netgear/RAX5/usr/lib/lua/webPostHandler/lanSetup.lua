-- Licensed to the public under the Apache License 2.0.
local M = {}
local os     = require "os"
local uci    = require "luci.model.uci".cursor()
local sys    = require "luci.sys"
local log    = require "luci.log"
local validator = require "commonFunc.validator"

local lan_setup_maps =
    {
        ipAddr              = { data_type = "ipv4_addr",     handler = nil },
        netmask             = { data_type = "ipv4_netmask",  handler = nil },
        ripDirection        = { data_type = "rip_dir",      handler = nil },
        ripVersion          = { data_type = "rip_ver",      handler = nil },
        enableDhcpServer    = { data_type = "boolean",        handler = nil },
        startAddr           = { data_type = "ipv4_addr",     handler = lanSetup_validator },
        endAddr             = { data_type = "ipv4_addr",     handler = lanSetup_validator }
    };

function lanSetup_validator(parm, value)
    -- custom handler function only be called at default datatype validate fail.
    local ret = false;
    
--    if (parm == "startAddr") then
--        log.console("Run startAddr validator");
--        ret = true;
--    elseif (parm == "endAddr") then
--        log.console("Run endAddr validator");
--        ret = true;
--    end
    
    return ret;
end

-------------------------------------------------------------------------------
-- Check if LAN subnet is changed and the subnet range is from small to big
-- @param subnet_orig - original LAN subnet mask address
-- @param subnet_new - new LAN subnet mask address
-- @return true - subnet range from small to big    false - subnet range from big to small or no change
local function  subnet_change_bigger(subnet_orig, subnet_new)
    local ifNewSubnetBigger = false
    local old_byte1, old_byte2, old_byte3, old_byte4 = subnet_orig:match("^(%d+).(%d+).(%d+).(%d+)")
    local new_byte1, new_byte2, new_byte3, new_byte4 = subnet_new:match("^(%d+).(%d+).(%d+).(%d+)")

    log.console("Old subnet:", old_byte1, old_byte2, old_byte3, old_byte4)
    log.console("New subnet:", new_byte1, new_byte2, new_byte3, new_byte4)

    -- suppose subnet mask in valid
    -- that is, when written in binary, has to consist of only consecutive 1's and then 0's, but no intermittent mixing.
    if new_byte1 > old_byte1 or new_byte2 > old_byte2 or new_byte3 > old_byte3 or new_byte4 > old_byte4 then
        log.console("new subnet is smaller")
        ifNewSubnetBigger = false
    elseif new_byte1 < old_byte1 or new_byte2 < old_byte2 or new_byte3 < old_byte3 or new_byte4 < old_byte4 then
        log.console("new subnet is bigger")
        ifNewSubnetBigger = true
    else
        log.console("new subnet is the same as old subnet!")
    end

    return ifNewSubnetBigger
end

-------------------------------------------------------------------------------
-- Reconstruct ip address for some configurations, ex. address reservation table, DMZ, port forwarding/triggering etc.
-- @param lan_ip - new LAN ip address
-- @param target_ip - ip address need to be updated
local function reconstruct_ip(lan_ip, target_ip)
    -- split lan ip
    local lan_subnet,lan_lastbyte = lan_ip:match("(%d+.%d+.%d+).(%d+)")
    log.console("Split new lan ip as:", lan_subnet, lan_lastbyte)

    -- split target ip
    local tagetip_byte1_3, targetip_lastbyte = target_ip:match("(%d+.%d+.%d+).(%d+)")
    log.console("Split target ip as:", tagetip_byte1_3, targetip_lastbyte)

    -- combine and get new ip
    local new_target_ip = lan_subnet.."."..targetip_lastbyte
    log.console("New target ip:", new_target_ip)

    return new_target_ip
end

local function reconstruct_iprange(lan_ip, target_iprange)
    -- split lan ip
    local lan_subnet,lan_lastbyte = lan_ip:match("(%d+.%d+.%d+).(%d+)")
    log.console("Split new lan ip as:", lan_subnet, lan_lastbyte)

    -- split target ip
    local tagetip_byte1_3,targetip_lastbyte1,tagetip_byte1_3,targetip_lastbyte2 = target_iprange:match("(%d+.%d+.%d+).(%d+)-(%d+.%d+.%d+).(%d+)")
    log.console("Split target iprange as:", tagetip_byte1_3, targetip_lastbyte1, targetip_lastbyte2)

    -- combine and get new ip
    local new_target_iprange = lan_subnet.."."..targetip_lastbyte1.."-"..lan_subnet.."."..targetip_lastbyte2
    log.console("New target iprange:", new_target_iprange)

    return new_target_iprange
end

-------------------------------------------------------------------------------
-- Update address reservation table
-- @param lan_ip - new LAN ip address
local function updateAddressReservationTable(lan_ip)
    log.debug(0)
    local new_reserved_ip = ""
    local index = 0
    local host =""

    uci:foreach("dhcp", "host",
        function(s)
        log.console("===DEBUG===:: updateAddressReservationTable s.ip="..s.ip.."  s.name="..s.name.." s.mac="..s.mac)
        new_reserved_ip = reconstruct_ip(lan_ip, s.ip)
        log.console("===DEBUG===::updateAddressReservationTable new reserved ip: "..new_reserved_ip)
        host = string.format("@host[%d]",index)
        uci:set("dhcp", host, "ip", new_reserved_ip)
        index = index + 1
        end)

end

-------------------------------------------------------------------------------
-- Flush address reservation table
local function flushReservationTable()
    uci:foreach("dhcp", "host",
        function(s)
        log.console("===DEBUG===:: flushReservationTable s.ip="..s.ip.."  s.name="..s.name.." s.mac="..s.mac)
        -- always delete the first section since the index will change after one section is deleted
        uci:delete("dhcp", "@host[0]")
        end)

        uci:commit("dhcp")
end

-------------------------------------------------------------------------------
-- Update DMZ ip address
local function updateDmzAddress(lan_ip)
    local old_dmz_ip = uci:get("firewall", "@dmz[0]", "ip")
    local new_dmz_ip = reconstruct_ip(lan_ip, old_dmz_ip)

    uci:set("firewall", "@dmz[0]", "ip", new_dmz_ip)
end

-------------------------------------------------------------------------------
-- Reset DMZ settings
local function resetDmzAddress(lan_ip)
    local idx = 0
    local rst_dmz_ip = string.gsub(lan_ip, "(%d+.%d+.%d+.)(%d+)", '%1').."0"

    uci:foreach("firewall", "include",
        function(s)
            if s.path == "/etc/firewall.d/dmz" then
                uci:set("firewall", "@include["..tostring(idx).."]", "enabled", "0")
            end
            idx = idx + 1
        end
    )
    uci:set("firewall", "@dmz[0]", "ip", rst_dmz_ip)
end

-------------------------------------------------------------------------------
-- Update port forwarding/ triggering ip address
local function updatePortFwTrAddress(lan_ip)
    local index = 0
    uci:foreach("firewall", "redirect",
      function(s)
        pf_redirect = string.format("@redirect[%d]",index)
        local old_dest_ip = uci:get("firewall", pf_redirect, "dest_ip")
        local new_dest_ip = reconstruct_ip(lan_ip, old_dest_ip)
        uci:set("firewall", pf_redirect, "dest_ip", new_dest_ip)
        index = index +1
    end)

   local idx = 0
   uci:foreach("firewall", "trigger",
     function(x)
      pt_trigger = string.format("@trigger[%d]",idx)
      local old_trig_ip = uci:get("firewall", pt_trigger, "trigger_ip")
      if old_trig_ip ~= 'any' then
        local new_trig_ip = reconstruct_ip(lan_ip, old_trig_ip)
        uci:set("firewall", pt_trigger, "trigger_ip", new_trig_ip)
      end
      idx = idx + 1
   end)
end

-----------------------------------------------------------------------------
-- Reset port forwarding/ triggering settings
local function resetPortFwTrAddress(lan_ip)
    local idx = 0
    local rst_ip = string.gsub(lan_ip, "(%d+.%d+.%d+.)(%d+)", '%1').."0"

    local index = 0
    uci:foreach("firewall", "redirect",
      function(s)
        pf_redirect = string.format("@redirect[%d]",index)
        uci:set("firewall", pf_redirect, "dest_ip", rst_ip)
        index = index +1
    end)

    local idx = 0
    uci:foreach("firewall", "trigger",
     function(x)
      pt_trigger = string.format("@trigger[%d]",idx)
      local old_trig_ip = uci:get("firewall", pt_trigger, "trigger_ip")
      if old_trig_ip ~= 'any' then
        uci:set("firewall", pt_trigger, "trigger_ip", rst_ip)
      end
      idx = idx + 1
    end)
end

------------------------------------------------------------------------------
-- Update block services ip address
local function updateBlockServcieSrcIpAddress(lan_ip)
    local index = 0
    uci:foreach("firewall", "rule",
      function(s)
        blk_rule = string.format("@rule[%d]",index)
        local log_prefix = uci:get("firewall", blk_rule, "log_prefix")
        if log_prefix ~= nil and string.find(log_prefix, "blocked") then
          local old_src_ip = uci:get("firewall", blk_rule, "src_ip")
          --- check [single ip] or [ip range] ---
          log.console("src_ip string len = "..string.len(old_src_ip))
          if string.len(old_src_ip) > 15 then
            local new_src_iprange = reconstruct_iprange(lan_ip, old_src_ip)
            uci:set("firewall", blk_rule, "src_ip", new_src_iprange)
          else
            local new_src_ip = reconstruct_ip(lan_ip, old_src_ip)
            uci:set("firewall", blk_rule, "src_ip", new_src_ip)
          end
        end
        index = index +1
    end)
end
-----------------------------------------------------------------------------
-- Reset block services settings
local function resetblkSrvAddress(lan_ip)
    local index = 0
    local rst_src_ip = string.gsub(lan_ip, "(%d+.%d+.%d+.)(%d+)", '%1').."0"
    uci:foreach("firewall", "rule",
      function(s)
        blk_rule = string.format("@rule[%d]",index)
        local log_prefix = uci:get("firewall", blk_rule, "log_prefix")
        if log_prefix ~= nil and string.find(log_prefix, "blocked") then
          uci:set("firewall", blk_rule, "src_ip", rst_src_ip)
        end
        index = index +1
    end)
end

-------------------------------------------------------------------------------
-- update block site trust ip
local function updateBlkSiteTrustedIp(lan_ip)
   local old_trust_ip = uci:get("firewall", "@BlockSite[0]", "trust_IpAddr")
   local new_trust_ip = reconstruct_ip(lan_ip, old_trust_ip)
   uci:set("firewall", "@BlockSite[0]", "trust_IpAddr", new_trust_ip)
end

-------------------------------------------------------------------------------
-- Reset block site trusted ip
local function resetBlkSiteAddress(lan_ip)
    local rst_ip = string.gsub(lan_ip, "(%d+.%d+.%d+.)(%d+)", '%1').."0"
    uci:set("firewall", "@BlockSite[0]", "allow_TrustIp", "false")
    uci:set("firewall", "@BlockSite[0]", "trust_IpAddr", rst_ip)
end

-------------------------------------------------------------------------------
-- update block site trust ip
local function updateBlkSiteTrustedIp(lan_ip)
   local old_trust_ip = uci:get("firewall", "@BlockSite[0]", "trust_IpAddr")
   local new_trust_ip = reconstruct_ip(lan_ip, old_trust_ip)
   uci:set("firewall", "@BlockSite[0]", "trust_IpAddr", new_trust_ip)
end

-------------------------------------------------------------------------------
-- Reset block site trusted ip
local function resetBlkSiteAddress(lan_ip)
    local rst_ip = string.gsub(lan_ip, "(%d+.%d+.%d+.)(%d+)", '%1').."0"
    uci:set("firewall", "@BlockSite[0]", "allow_TrustIp", "false")
    uci:set("firewall", "@BlockSite[0]", "trust_IpAddr", rst_ip)
end

-------------------------------------------------------------------------------
-- Handler of LAN ip address or subnet mask change
-- @param subnet_mask_changed - LAN subnet mask changed flag
-- @param lan_ip_changed - LAN ip address changed flag
-- @param new_ip - new LAN ip address
-- @param netmask_orig - original subnet mask
-- @param new_subnetmask - new subnet mask
function M.lanIpSubnetChangeHandler(subnet_mask_changed, lan_ip_changed, new_ip, netmask_orig, new_subnetmask)
    -- Per spec, whenever router¡¦s LAN IP address or subnet is changed, router should automatically comply the corresponding configuration, 
    -- to keep the same configuration, or to flush the configuration.
    if subnet_mask_changed == true then
        local subnet_bigger = subnet_change_bigger(netmask_orig, new_subnetmask)

        if subnet_bigger == true then
            if lan_ip_changed == true then
                log.console("===DEBUG===::subnet changes from small to big and lan ip changed and lan ip also changed")
                -- comply the changes to corresponding configuration: DMZ, port forwarding/triggering, block service site trusted IP, Address Reservation Table.
                updateDmzAddress(new_ip)
                -- update port forwardin/triggering
                updatePortFwTrAddress(new_ip)
                -- update block service/site trusted IP
                updateBlockServcieSrcIpAddress(new_ip)
                updateBlkSiteTrustedIp(new_ip)
                -- update Address Reservation Table
                updateAddressReservationTable(new_ip)
             else
                -- keep the same configuration
            end

        elseif subnet_bigger == false then
            log.console("===DEBUG===:: subnet range is from big to small, flush all the corresponding configuration")
            -- If subnet is changed and the subnet range is from big to small, router SHOULD flush all the corresponding configuration
            resetDmzAddress(new_ip)
            -- flush port forwarding/triggering
            resetPortFwTrAddress(new_ip)
            -- flush block service/site trusted IP
            resetBlkSiteAddress(new_ip)
            resetblkSrvAddress(new_ip)
            -- flush address reservation table
            flushReservationTable()
    end

    elseif lan_ip_changed == true then
        log.console("===DEBUG===::lanSubnetChangeHandler subnet mask is not changed and LAN ip is changed")
        -- subnet mask is not changed and LAN ip is changed
        -- comply the changes to corresponding configuration: DMZ, port forwarding/triggering, block service site trusted IP, Address Reservation Table.
        updateDmzAddress(new_ip)
        -- update port forwarding/triggering
        updatePortFwTrAddress(new_ip)
        -- update block service/site trusted IP
        updateBlockServcieSrcIpAddress(new_ip)
        updateBlkSiteTrustedIp(new_ip)
        -- update Address Reservation Table
        updateAddressReservationTable(new_ip)
    else
        -- both LAN ip and subnet mask not change, keep configuration
    end
end

--[[
 *
 * @brief config RIP parameters for LAN settings
 *
 * @param dir RIP direction : both , in , out
 * @param version RIP version : disable, v1, v2B, v2M
 * @return true is ok, otherwise is error
 * 
 ]]
local function lan_rip_handler(ripDirection, ripVersion)

    --Set RIP enable
    if (ripVersion == "disable") then
        uci:set("routing", "@rip[0]", "enable", "0");
        -- Disable firewall exception rule for RIP
        --uci:set("firewall", "rip", "enabled", "0");
    else
        uci:set("routing", "@rip[0]", "enable", "1");
        -- Enable firewall exception rule for RIP
        --uci:set("firewall", "rip", "enabled", "1");
    end
    
    -- Set All RIP Interface settings
    uci:foreach("routing", "rip_interface_settings",
    function(s)
        if (ripVersion ~= "disable") then
            uci:set("routing", s['.name'], "rip_ver", ripVersion);
        end   
        uci:set("routing", s['.name'], "rip_dir", ripDirection);
    end)
end

function M.lanSetup_handler(json)
    log.debug(0)
    log.print_r(json)
    log.print("lanSetup:", json.ipAddr, json.netmask, json.deviceName, json.ripDirection, json.ripVersion, json.enableDhcpServer, json.startAddr, json.endAddr)
    local dhcpChanged = false
    local networkChanged = false
    local lan_ip_changed = false
    local subnet_mask_changed = false

    if (validator.post_data_validate(json, lan_setup_maps) == false) then
        log.print("Failed to parse the input JSON data!!!");
        return {status="error", message=tostring(json) };
    end
    
    -- LAN
    local ipaddr_orig = uci:get("network", "lan", "ipaddr")
    local netmask_orig = uci:get("network", "lan", "netmask")

    if ipaddr_orig ~= json.ipAddr then
        uci:set("network", "lan", "ipaddr", json.ipAddr)
        -- Per spec, only a change regarding the router's LAN IP address, subnet mask, or DHCP server pool range has to reset the LAN Ethernet interface.
        luci.sys.call("touch /var/state/dhcpconfigchanged")
        networkChanged = true
        lan_ip_changed = true
    end

    if  netmask_orig ~= json.netmask then
        uci:set("network", "lan", "netmask", json.netmask)
        -- Per spec, only a change regarding the router's LAN IP address, subnet mask, or DHCP server pool range has to reset the LAN Ethernet interface.
        luci.sys.call("touch /var/state/dhcpconfigchanged")
        networkChanged = true
        subnet_mask_changed = true
    end

    -- Per spec, whenever router¡¦s LAN IP address or subnet is changed, router should automatically comply the corresponding configuration, 
    -- to keep the same configuration, or to flush the configuration.
    M.lanIpSubnetChangeHandler(subnet_mask_changed, lan_ip_changed, json.ipAddr, netmask_orig, json.netmask)

    -- rip
    lan_rip_handler(json.ripDirection, json.ripVersion)

    -- Use Router as DHCP Server
    local dhcpServerEnable_orig = uci:get("dhcp", "lan", "dhcpv4")
    local start_ip_orig = uci:get("dhcp", "lan", "start_ip")
    local end_ip_orig = uci:get("dhcp", "lan", "end_ip")

    if json.enableDhcpServer == "true" then
        enableDhcpServer = "server"
    else
        enableDhcpServer = "disabled"
    end
    if dhcpServerEnable_orig ~= enableDhcpServer then
        uci:set("dhcp", "lan", "dhcpv4", enableDhcpServer)
        dhcpChanged = true
    end

    -- DHCP Starting IP Address
    if start_ip_orig ~= json.startAddr then
        uci:set("dhcp", "lan", "start_ip",  json.startAddr)
        -- Per spec, only a change regarding the router's LAN IP address, subnet mask, or DHCP server pool range has to reset the LAN Ethernet interface.
        luci.sys.call("touch /var/state/dhcpconfigchanged")
        dhcpChanged = true
    end

    -- DHCP Ending IP Address
    if end_ip_orig ~= json.endAddr then
        uci:set("dhcp", "lan", "end_ip",  json.endAddr)
        -- Per spec, only a change regarding the router's LAN IP address, subnet mask, or DHCP server pool range has to reset the LAN Ethernet interface.
        luci.sys.call("touch /var/state/dhcpconfigchanged")
        dhcpChanged = true
    end

    if networkChanged == true then
        uci:commit("network")
    end
    
    uci:commit("routing")
    uci:commit("firewall")
    
    if dhcpChanged == true then
        uci:commit("dhcp")
    end

    --post function must use table.insert(changed_config, "xxxx") to replace uci:apply("xxxx")
    if networkChanged == true then
        table.insert(changed_config, "network")
    elseif dhcpChanged == true then
        table.insert(changed_config, "dhcp")
    end
    
    table.insert(changed_config, "routing")
    table.insert(changed_config, "firewall")

    return {status="success", message="Finish LAN Setup"}
end

return M
