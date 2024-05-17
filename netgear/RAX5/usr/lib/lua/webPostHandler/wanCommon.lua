-- Licensed to the public under the Apache License 2.0.
-- Licensed to the public under the Apache License 2.0.
local M = {}
local log    = require "luci.log"
local sys  = require "luci.sys"
local wanSetup = require "webGetFunc.wanSetup"

local function wanConfig_pppoeIpAddr(ipType, ipAddr)
    local pppoeOption="/etc/ppp/options"
    if(ipType == nil) then
        return false
    end
    -- Reset pppoe option settings(dynamic)
    sys.exec("sed -i \"s|^#noipdefault|noipdefault|\" "..pppoeOption)
    sys.exec("sed -i \"s|^#ipcp-accept-local|ipcp-accept-local|\" "..pppoeOption)
    sys.exec("sed -i \"/^\\([0-9]\\{1,3\\}.\\)\\{3\\}\\([0-9]\\{1,3\\}\\):\\([0-9]\\{1,3\\}.\\)\\{3\\}\\([0-9]\\{1,3\\}\\)/d\" "..pppoeOption)

    -- Set pppoe static ip 
    if(ipType == "fixed" and ipAddr ~= nil) then
        sys.exec("sed -i \"s|^noipdefault|#noipdefault|\" "..pppoeOption)
        sys.exec("sed -i \"s|^ipcp-accept-local|#ipcp-accept-local|\" "..pppoeOption)
        sys.exec("echo \""..ipAddr..":0.0.0.0\" >> "..pppoeOption)
    end
end

function M.wanConfig_Default(caller_uci)
--Note: The following UCI actions depend on caller_uci, top caller should be in charge of commiting the changes.
--Reset network interfaces for wan mode changing
    if(caller_uci == nil) then
        log.console("[wanConfig_Default] ERROR: invalid caller_uci")
        return false
    end
    --default 'wan' section
    caller_uci:delete("network", "wan")
    caller_uci:section("network", "interface", "wan", {
        ifname  = "eth1",
        proto   = "dhcp",
        metric  = '20'
        })
    --default 'pptp' section
    caller_uci:delete("network", "pptp")
    caller_uci:section("network", "interface", "pptp", {
        disabled  = "1",
        proto  = "pptp",
        auto   = "1"
        })
    --default 'l2tp' section
    caller_uci:delete("network", "l2tp")
    caller_uci:section("network", "interface", "l2tp", {
        proto  = "l2tp",
        auto   = "0"
        })
    return true
end

function M.wanConfig_Reload(caller_uci)
--Note: The following UCI actions depend on caller_uci, top caller should be in charge of commiting the changes.
--Apply saved config to WAN interfaces
    if(caller_uci == nil) then
        log.console("[wanConfig_Reload] ERROR: invalid caller_uci")
        return false
    end
    --1. Reset WAN config before changing mode
    M.wanConfig_Default(caller_uci)
    
    --2. Read current config to apply
    local wan_mode, proto
    local iptype, ipaddr, netmask, gateway
    local username, password, service, server, mode, idle_timeout
    local hostname, domain_name, mtu, old_mtu
    -- wan mode options
    wan_mode = caller_uci:get("network", "inet_global", "wan_mode")
    if(wan_mode == "DHCP") then
        -- get saved config
        proto = caller_uci:get("network", "inet_ether", "proto")
        hostname = caller_uci:get("system", "@system[0]", "hostname")
        domain_name = caller_uci:get("network", "inet_ether", "domain_name")
        mtu = caller_uci:get("network", "inet_ether", "mtu")
        -- set run-time config
        caller_uci:set("network", "wan", "proto", proto)
        caller_uci:set("network", "wan", "hostname", hostname)
        if(domain_name ~= nil) then
            caller_uci:set("network", "wan", "domain_name", domain_name)
        end
        -- MTU
        caller_uci:set("network", "wan", "mtu", mtu)
    elseif(wan_mode == "Static") then
        -- get saved config
        proto = caller_uci:get("network", "inet_ether", "proto")
        ipaddr = caller_uci:get("network", "inet_ether", "ipaddr")
        netmask = caller_uci:get("network", "inet_ether", "netmask")
        gateway = caller_uci:get("network", "inet_ether", "gateway")
        mtu = caller_uci:get("network", "inet_ether", "mtu")
        -- set run-time config
        caller_uci:set("network", "wan", "proto", proto)
        if (ipaddr ~= nil) then
            caller_uci:set("network", "wan", "ipaddr", ipaddr)
        end
        if (netmask ~= nil) then
            caller_uci:set("network", "wan", "netmask", netmask)
        end
        if (gateway ~= nil) then
            caller_uci:set("network", "wan", "gateway", gateway)
        end
        -- MTU
        caller_uci:set("network", "wan", "mtu", mtu)
    elseif(wan_mode == "PPPoE") then
        -- get saved config
        proto = caller_uci:get("network", "inet_pppoe", "proto")
        username = caller_uci:get("network", "inet_pppoe", "username")
        password = caller_uci:get("network", "inet_pppoe", "password")
        service = caller_uci:get("network", "inet_pppoe", "service")
        iptype = caller_uci:get("network", "inet_pppoe", "iptype")
        ipaddr = caller_uci:get("network", "inet_pppoe", "ipaddr")
        mode = caller_uci:get("network", "inet_pppoe", "conn_mode")
        idle_timeout = caller_uci:get("network", "inet_pppoe", "idle_timeout")
        mtu = caller_uci:get("network", "inet_pppoe", "mtu")
        -- set run-time config
        caller_uci:set("network", "wan", "proto", proto)
        -- Set iptype and ipaddr
        wanConfig_pppoeIpAddr(iptype, ipaddr)

        caller_uci:set("network", "wan", "username", username)
        if(password ~= nil) then
            caller_uci:set("network", "wan", "password", password)
        end
        if(service ~= nil) then
            caller_uci:set("network", "wan", "service", service)
        end
        if(mode == "onDemand") then
            if(tonumber(idle_timeout) == 0) then
                caller_uci:set("network", "wan", "keepalive", "5 5")
            else
                caller_uci:set("network", "wan", "demand", tonumber(idle_timeout)*60)
            end
        elseif(mode == "always") then
            caller_uci:set("network", "wan", "keepalive", "5 5")
        elseif(mode == "manually") then
            caller_uci:set("network", "wan", "auto", "0")
        end
        -- MTU
        caller_uci:set("network", "wan", "mtu", mtu)
    elseif(wan_mode == "PPTP") then
        -- get saved config
        proto = caller_uci:get("network", "inet_pptp", "proto")
        username = caller_uci:get("network", "inet_pptp", "username")
        password = caller_uci:get("network", "inet_pptp", "password")
        server = caller_uci:get("network", "inet_pptp", "server")
        iptype = caller_uci:get("network", "inet_pptp", "iptype")
        ipaddr = caller_uci:get("network", "inet_pptp", "ipaddr")
        netmask = caller_uci:get("network", "inet_pptp", "netmask")
        gateway = caller_uci:get("network", "inet_pptp", "gateway")
        mode = caller_uci:get("network", "inet_pptp", "conn_mode")
        idle_timeout = caller_uci:get("network", "inet_pptp", "idle_timeout")
        mtu = caller_uci:get("network", "inet_pptp", "mtu")
        -- set run-time config
        caller_uci:set("network", "wan", "proto", proto)
        if(iptype == "fixed") then
            caller_uci:set("network", "wan", "proto", "static")
            caller_uci:set("network", "wan", "ipaddr", ipaddr)
            caller_uci:set("network", "wan", "netmask", netmask)
            caller_uci:set("network", "wan", "gateway", gateway)
        else
            caller_uci:set("network", "wan", "proto", "dhcp")
        end
        caller_uci:set("network", "pptp", "disabled", "")
        caller_uci:set("network", "pptp", "username", username)
        caller_uci:set("network", "pptp", "password", password)
        caller_uci:set("network", "pptp", "server", server)
        if(mode == "onDemand") then
            if(tonumber(idle_timeout) == 0) then
                caller_uci:set("network", "pptp", "auto", "1")
            else
                caller_uci:set("network", "pptp", "demand", tonumber(idle_timeout)*60)
            end
        elseif(mode == "always") then
            caller_uci:set("network", "pptp", "auto", "1")
        elseif(mode == "manually") then
            caller_uci:set("network", "pptp", "auto", "0")
        end
        -- MTU
        caller_uci:set("network", "pptp", "mtu", mtu)
    elseif(wan_mode == "L2TP") then
        -- get saved config
        proto = caller_uci:get("network", "inet_l2tp", "proto")
        username = caller_uci:get("network", "inet_l2tp", "username")
        password = caller_uci:get("network", "inet_l2tp", "password")
        server = caller_uci:get("network", "inet_l2tp", "server")
        iptype = caller_uci:get("network", "inet_l2tp", "iptype")
        ipaddr = caller_uci:get("network", "inet_l2tp", "ipaddr")
        netmask = caller_uci:get("network", "inet_l2tp", "netmask")
        gateway = caller_uci:get("network", "inet_l2tp", "gateway")
        mode = caller_uci:get("network", "inet_l2tp", "conn_mode")
        idle_timeout = caller_uci:get("network", "inet_l2tp", "idle_timeout")
        mtu = caller_uci:get("network", "inet_l2tp", "mtu")
        -- set run-time config
        if(iptype == "fixed") then
            caller_uci:set("network", "wan", "proto", "static")
            caller_uci:set("network", "wan", "ipaddr", ipaddr)
            caller_uci:set("network", "wan", "netmask", netmask)
            caller_uci:set("network", "wan", "gateway", gateway)
        else
            caller_uci:set("network", "wan", "proto", "dhcp")
        end
        caller_uci:set("network", "l2tp", "username", username)
        caller_uci:set("network", "l2tp", "password", password)
        caller_uci:set("network", "l2tp", "server", server)
        if(mode == "onDemand") then
            if(tonumber(idle_timeout) == 0) then
                caller_uci:set("network", "l2tp", "auto", "1")
            else
                caller_uci:set("network", "l2tp", "demand", tonumber(idle_timeout)*60)
            end
        elseif(mode == "always") then
            caller_uci:set("network", "l2tp", "auto", "1")
        elseif(mode == "manually") then
            caller_uci:set("network", "l2tp", "auto", "0")
        end
        -- MTU
        caller_uci:set("network", "l2tp", "mtu", mtu)
    else
        -- mode error
        log.console("[wanConfig_Reload] ERROR: Invalid mode: "..wan_mode)
        return false
    end

    -- global options
    local dnstype, dns1, dns2
    local mac_clone, mac_addr
    dnstype = caller_uci:get("network", "inet_global", "wan_dnstype")
    if(dnstype == "fixed") then
        --fixed dns
        -- get saved config
        dns1 = caller_uci:get("network", "inet_global", "wan_dns1")
        dns2 = caller_uci:get("network", "inet_global", "wan_dns2")
        -- set run-time config
        caller_uci:set("network", "wan", "peerdns", 0)
        if(dns1 == nil) then
            dns1 = ""
        end
        if(dns2 == nil) then
            dns2 = ""
        end
        if (dns1 ~= "" or dns2 ~= "") then
            local my_dns = string.format("%s %s", dns1, dns2)
            caller_uci:set("network", "wan", "dns", my_dns)
        end
    else
        --dynamic dns
        caller_uci:delete("network", "wan", "dns")
        caller_uci:set("network", "wan", "peerdns", 1)
    end
    -- [ToDo]: mac_clone feature is not yet implemented
    --[[
    mac_clone = caller_uci:get("network", "inet_global", "mac_clone")
    if(mac_clone == "pc") then
        mac_addr = "00:00:00:00:00:00"
    elseif(mac_clone == "user") then
        mac_addr = caller_uci:get("network", "inet_global", "mac_addr")
    else    -- Default
        mac_addr = "00:00:00:00:00:00"
    end
    --]]
    --commit settings
--    uci:commit("network")

    return true
end

function M.wanConfig_MacClone(caller_uci, mac_clone, mac_addr)
--Note: The following UCI actions depend on caller_uci, top caller should be in charge of commiting the changes.
    if (mac_clone == "pc") or (mac_clone == "user") then
        caller_uci:set("network", "inet_global", "mac_clone", mac_clone)
        if(mac_addr ~= nil) then
            caller_uci:set("network", "inet_global", "mac_addr", mac_addr)
        else
            caller_uci:set("network", "inet_global", "mac_addr", "")
        end
    else    -- Default
        caller_uci:set("network", "inet_global", "mac_clone", "default")
    end
end

function M.wanConfig_DNS(caller_uci, dnstype, dns1, dns2)
--Note: The following UCI actions depend on caller_uci, top caller should be in charge of commiting the changes.
    if(dnstype == "fixed") then
        --fixed dns
        -- saved config
        caller_uci:set("network", "inet_global", "wan_dnstype", "fixed")
        if(dns1 ~= nil and dns1 ~= "") then
            caller_uci:set("network", "inet_global", "wan_dns1", dns1)
        else
            caller_uci:set("network", "inet_global", "wan_dns1", "")
        end
        if(dns2 ~= nil and dns2 ~= "") then
            caller_uci:set("network", "inet_global", "wan_dns2", dns2)
        else
            caller_uci:set("network", "inet_global", "wan_dns2", "")
        end
    else
        --dynamic dns
        caller_uci:set("network", "inet_global", "wan_dnstype", "dynamic")
    end
end

function M.isFalseOrEmpty(value)
-- Check if input value is "false" or empty
--Note: Data coming from web page could be "false" or "" to represent EMPTY of input value
    local ret = false
    if(value == "false" or value == "") then
        ret = true
    end
    return ret
end

local function is_def_mtu(mode)
    local mtu = wanSetup.getInputVal_mtuSize()
    local def_mtu = ""
    local ret = true

    if (mode == "DHCP" or mode == "Static") then
        def_mtu = "1500"
    elseif (mode == "PPPoE") then
        def_mtu = "1492"
    elseif (mode == "PPTP") then
        def_mtu = "1436"
    elseif (mode == "L2TP") then
        def_mtu = "1428"
    end

    if (def_mtu ~= "" and def_mtu ~= mtu) then
        ret = false
    end

    return ret
end

local function reset_to_def_mtu(caller_uci, mode)
    if (mode == "DHCP" or mode == "Static") then
        caller_uci:set("network", "inet_ether", "mtu", "1500")
    elseif (mode == "PPPoE") then
        caller_uci:set("network", "inet_pppoe", "mtu", "1492")
    elseif (mode == "PPTP") then
        caller_uci:set("network", "inet_pptp", "mtu", "1436")
    elseif (mode == "L2TP") then
        caller_uci:set("network", "inet_l2tp", "mtu", "1428")
    end
end

function M.wanCheckMtu(caller_uci, mode)
    local wan_change = false
    local old_mode = caller_uci:get("network", "inet_global", "wan_mode")
    local old_mtu = wanSetup.getInputVal_mtuSize()
    local mtu

    if old_mode ~= mode then
        wan_change = true
    end

    if(mode == "DHCP" or mode == "Static") then
        mtu = caller_uci:get("network", "inet_ether", "mtu")
        if wan_change == true then
            if is_def_mtu(old_mode) == false then
                if tonumber(old_mtu) < tonumber(mtu) then
                    caller_uci:set("network", "inet_ether", "mtu", old_mtu)
                else
                    caller_uci:set("network", "inet_ether", "mtu", mtu)
                end
            else
                caller_uci:set("network", "inet_ether", "mtu", "1500")
            end
        end
    elseif(mode == "PPPoE") then
        mtu = caller_uci:get("network", "inet_pppoe", "mtu")
        if wan_change == true then
            if is_def_mtu(old_mode) == false then
                if tonumber(old_mtu) < tonumber(mtu) then
                    caller_uci:set("network", "inet_pppoe", "mtu", old_mtu)
                else
                    caller_uci:set("network", "inet_pppoe", "mtu", mtu)
                end
            else
                caller_uci:set("network", "inet_pppoe", "mtu", "1492")
            end
        end
    elseif(mode == "PPTP") then
        mtu = caller_uci:get("network", "inet_pptp", "mtu")
        if wan_change == true then
            if is_def_mtu(old_mode) == false then
                if tonumber(old_mtu) < tonumber(mtu) then
                    caller_uci:set("network", "inet_pptp", "mtu", old_mtu)
                else
                    caller_uci:set("network", "inet_pptp", "mtu", mtu)
                end
            else
                caller_uci:set("network", "inet_pptp", "mtu", "1436")
            end
        end
    elseif(mode == "L2TP") then
        mtu = caller_uci:get("network", "inet_l2tp", "mtu")
        if wan_change == true then
            if is_def_mtu(old_mode) == false then
                if tonumber(old_mtu) < tonumber(mtu) then
                    caller_uci:set("network", "inet_l2tp", "mtu", old_mtu)
                else
                    caller_uci:set("network", "inet_l2tp", "mtu", mtu)
                end
            else
                caller_uci:set("network", "inet_l2tp", "mtu", "1428")
            end
        end
    end

    if wan_change == true then
        reset_to_def_mtu(caller_uci, old_mode)
    end
end

function M.pingTriggerDialonDemand(caller_uci, mode)
    local blank_state = caller_uci:get("netgear", "system", "blank_state") 
    if blank_state == "1" and mode == "onDemand" then 
        local fork_exec = require"commonFunc.fork".fork_exec
        local cmdStr = "/usr/sbin/ping8888.sh"
        fork_exec(cmdStr)
    end
end

return M
