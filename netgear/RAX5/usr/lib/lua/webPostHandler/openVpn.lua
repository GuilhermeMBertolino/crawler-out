-- Licensed to the public under the Apache License 2.0.
local M = {}
--local os     = require "os"
local sys   = require "luci.sys"
local uci    = require "luci.model.uci".cursor()
local log    = require "luci.log"
local validator = require "commonFunc.validator"
local interface = require "webGetFunc.interface"
local wanData  = require "webGetFunc.wanSetup"
local portCheck = require "commonFunc.portCheck"

function openvpn_validator(parm, value)
    log.debug(0)
    -- custom handler function only be called at default datatype validate fail.
    local ret = false;
--[[
    if (parm == "username") then
        -- for NETGEAR DDNS since username is used for No-IP and DynDNS
        if (value == '') then
            return true
        end
    end
--]]
    return ret;
end

local openvpn_maps =
{
    enable = { data_type = "boolean",        handler = nil },
    tunModeType = { data_type = "tcp_udp",        handler = nil },
    tunModePort = { data_type = "port_range",        handler = nil },
    tapModeType = { data_type = "tcp_udp",        handler = nil },
    tapModePort = { data_type = "port_range",        handler = nil },
    clientAccessType = { data_type = "ovpn_acctype",        handler = nil },
    dodTypeChange = { data_type = "boolean",        handler = nil },
};

function convertBoolToInt(s)
    if s == "true" then
        return 1
    else
        return 0
    end
end

function setResponsePing(enable)
    idx = 0
    uci:foreach("firewall", "rule",
        function(s)
            if s.name == "Allow-Ping" then
                uci:set("firewall", "@rule["..tostring(idx).."]", "enabled", enable)
            end
            idx = idx + 1
        end
    )
end

function M.openVpn_handler(json)
    log.debug(0)
    log.console_r(json)
    log.console("OpenVPN:",  json.enable, json.tunModeType,  json.tunModePort, json.buttonValue, json.clientAccessType, json.buttonHit, json.tapModeType, json.tapModePort)
    local enableOpenvpn = "0"
    local wanMode = ""
    local reponsePing = "0"
    local isPortConflict = false

    if (validator.post_data_validate(json, openvpn_maps) == false) then
        log.console("Failed to parse the input JSON data!!!");
        return {status="error", message=tostring(json) };
    end

    -- port conflict check
    -- check if TUN port conflict with the port other features use
    isPortConflict = portCheck.portConflictCheck("vpn", json.tunModePort, json.tunModeType)
    if isPortConflict == true then
        log.force("OpenVPN TUN Port Conflict with other features!!");
        return {status="error", message="VPN Port Conflict" };
    end
    -- check if TAP port conflict with the port other features use
    isPortConflict = portCheck.portConflictCheck("vpn", json.tapModePort, json.tapModeType)
    if isPortConflict == true then
        log.force("OpenVPN TAP Port Conflict with other features!!");
        return {status="error", message="VPN Port Conflict" };
    end

    -- check if TAP port or TUN port conflict with other service port, i.e. upnpd, soapd
    if ( portCheck.portConflictCheckByService(json.tunModePort) == true or portCheck.portConflictCheckByService(json.tapModePort) == true ) then
        log.force("OpenVPN Port Conflict with other the port other services use!!");
        return {status="error", message="VPN Port Conflict" };
    end
    

    if json.enable == "true" then
        enableOpenvpn = "1"
    elseif json.enable == "false" then
        enableOpenvpn = "0"
    end

    -- Per spec requirement, when VPN Service is enabled, “Response to Ping on Internet Port” box is checked
    -- and gray out. When VPN Service is disabled, “Response to Ping on Internet Port” will back to previous user setting.
    if enableOpenvpn == "1" then
        -- VPN Service is enabled
        -- record current status of 'Response to Ping on Internet Port' first
        reponsePing = wanData.getCheckboxVal_responsePing()
        uci:set("openvpn", "global", "responsePing", reponsePing)

        -- then enable 'Response to Ping on Internet Port' on WAN Setup page
        setResponsePing(enableOpenvpn)

    elseif enableOpenvpn == "0" then
        -- VPN Service is disabled
        -- get previous status of 'Response to Ping on Internet Port'
        reponsePing = uci:get("openvpn", "global", "responsePing")

        -- set 'Response to Ping on Internet Port' on WAN Setup page to previous status
        setResponsePing(convertBoolToInt(reponsePing))
    end

    -- protocol should be lower case
    json.tunModeType = string.lower(json.tunModeType)
    json.tapModeType = string.lower(json.tapModeType)

    -- set /etc/config/openvpn
    uci:set("openvpn", "openvpn_tun", "enabled", enableOpenvpn)
    uci:set("openvpn", "openvpn_tun", "proto", json.tunModeType)
    uci:set("openvpn", "openvpn_tun", "dest_port", json.tunModePort)
    uci:set("openvpn", "openvpn_tap", "enabled", enableOpenvpn)
    uci:set("openvpn", "openvpn_tap", "proto", json.tapModeType)
    uci:set("openvpn", "openvpn_tap", "dest_port", json.tapModePort)
    uci:set("openvpn", "global", "access_type", json.clientAccessType)

    uci:commit("openvpn")

    -- set /etc/config/firewall to genereate iptables rules to allow openvpn connection packets
    uci:set("firewall", "openvpn_tun", "enabled", enableOpenvpn)
    uci:set("firewall", "openvpn_tun", "proto", json.tunModeType)
    uci:set("firewall", "openvpn_tun", "dest_port", json.tunModePort)
    uci:set("firewall", "openvpn_tap", "enabled", enableOpenvpn)
    uci:set("firewall", "openvpn_tap", "proto", json.tapModeType)
    uci:set("firewall", "openvpn_tap", "dest_port", json.tapModePort)

    uci:commit("firewall")

    table.insert(changed_config, "openvpn")
    table.insert(changed_config, "firewall")

    -- if PPP(PPPOE/PPTP/L2TP...) Connection Mode is "Dial on Demand" when VPN Service is enabled, 
    -- change it from Dial on Demand to Always On, which is required for a VPN client to connect to the router
    if ( json.dodTypeChange == "true" ) then
        wanMode = interface.get_wanMode()
        log.console("===DEBUG===::wanMode="..wanMode)

        if (wanMode == "PPPoE") then
            uci:set("network", "inet_pppoe", "conn_mode", "always")
        elseif (wanMode == "PPTP") then
            uci:set("network", "inet_pptp", "conn_mode", "always")
        elseif (wanMode == "L2TP") then
            uci:set("network", "inet_l2tp", "conn_mode", "always")
        end

        uci:commit("network")

        table.insert(changed_config, "network")
    end

    return {status="success", message="Finish VPN Service"}
end

return M
