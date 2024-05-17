-- Get functions for VPN Service
local M = {}

local uci  = require "luci.model.uci".cursor()
local log = require("luci.log") -- for debug

function M.getOpenVpnEnable()
    local enableOpenvpn = uci:get("openvpn", "openvpn_tun", "enabled")

    if enableOpenvpn == nil then
        return "false"
    end

    if enableOpenvpn == "1" then
        enableOpenvpn = "true"
    else
        enableOpenvpn = "false"
    end

    return enableOpenvpn
end

function M.getOpenVpnTunType()
    local openvpnTunType = uci:get("openvpn", "openvpn_tun", "proto")

    if ( openvpnTunType == "tcp" or openvpnTunType == "tcp") then
        openvpnTunType = "TCP"
    else
        openvpnTunType = "UDP"
    end

    return openvpnTunType
end

function M.getOpenVpnTunPort()
    local openvpnTunPort = uci:get("openvpn", "openvpn_tun", "dest_port")

    return openvpnTunPort
end

function M.getOpenVpnTapType()
    local openvpnTapType = uci:get("openvpn", "openvpn_tap", "proto")

    if ( openvpnTapType == "tcp" or openvpnTapType == "tcp") then
        openvpnTapType = "TCP"
    else
        openvpnTapType = "UDP"
    end

    return openvpnTapType
end

function M.getOpenVpnTapPort()
    local openvpnTapPort = uci:get("openvpn", "openvpn_tap", "dest_port")

    return openvpnTapPort
end

function M.getOpenVpnAccessType()
    local openvpnAccessType = uci:get("openvpn", "global", "access_type")

    return openvpnAccessType
end

return M

