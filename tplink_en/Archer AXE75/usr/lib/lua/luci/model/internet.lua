--[[
Copyright(c) 2008-2014 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  internet.lua
Details :  Internet subroutines for network module
Author  :  Zhu Xianfeng <zhuxianfeng@tp-link.net>
Author  :  Ye Qianchuan <yeqianchuan@tp-link.net>
Version :  1.0.0
Date    :  20 May, 2014
History :  04 Jun, 2014, Zhu Xianfeng, Re-implement.
]]--

module("luci.model.internet", package.seeall)

local bus    = require "ubus"
local nixio  = require "nixio"
local sys    = require "luci.sys"
local util   = require "luci.util"
local ucim   = require "luci.model.uci"
local logm   = require "luci.model.log"
local nlog   = require "luci.model.network_log"
local dbg    = require "luci.tools.debug"

local UCICFG = "portspeed"
local uci    = ucim.cursor()
local log    = logm.Log(nlog.ID)
local ubus
Internet = util.class()

function Internet:__init__()
    -- Delay connecting ubus
end

function Internet:invoke(method, args, path)
    if type(args) ~= "table" then
        args = {args}
    end

    if not self.ubus then
        self.ubus = bus.connect()
        if not self.ubus then
            log(nlog.UBUS_CONN_FAILED)
        end
    end

    path = path or "network.interface"

    return self.ubus:call(path, method, args)
end

function Internet:up(iface)
    local args = {interface = iface}  
    
    if iface == "wan" or iface == "internet" or iface == "wanv6" or iface == "internetv6" or iface == "vpn" then
        log(nlog.UP_WAN, iface)
        self:invoke("up", args)
    end
end

function Internet:down(iface)
    local args = {interface = iface}

    if iface == "wan" or iface == "internet" or iface == "wanv6" or iface == "lanv6" or  iface == "internetv6" or iface == "vpn" then
        log(nlog.DOWN_WAN, iface)
        self:invoke("down", args)
    end
end

function Internet:connect(iface)
    local args = {interface = iface}

    if iface == "wan" or iface == "internet" or iface == "wanv6" or  iface == "internetv6" or iface == "vpn" then
        log(nlog.CONNECT_WAN, iface)
        self:invoke("connect", args)
    end
end

function Internet:disconnect(iface)
    local args = {interface = iface}

    if iface == "wan" or iface == "internet" or iface == "wanv6" or  iface == "internetv6" or iface == "vpn" then
        log(nlog.DISCONNECT_WAN, iface)
        self:invoke("disconnect", args)
        nixio.nanosleep(1, 0)
    end
end

function Internet:reload()
    log(nlog.RELOAD_WAN)
    self:invoke("reload", {}, "network")
    -- Wait 200ms
    nixio.nanosleep(0, 200000000)
end

function Internet:restart()
    log(nlog.RESTART)
    sys.fork_exec("/etc/init.d/network restart")
    -- Wait 2s
    nixio.nanosleep(2, 0)
end

function Internet:status(v6)
    local iface = v6 and "wanv6" or "internet"
    local args = {interface = iface}
    local result = self:invoke("status", args)

    if iface == "internet" and result == nil then
        -- Status of Static IP or DHCP
        result = self:invoke("status", {interface = "wan"})
    end

    -- disconnected/connecting/connected/disconnecting
    if result ~= nil and result.state ~= nil then
        return result.state
    else
        return "disconnected"
    end
end

function Internet:conn_state(iface)
    local args = {interface = iface}
    local result = nil 

    if iface == "wan" or iface == "internet" or iface == "wanv6" or  iface == "internetv6" or iface == "vpn" then
        result = self:invoke("status", args)
    end

    -- disconnected/connecting/connected/disconnecting
    if result ~= nil and result.state ~= nil then
        return result.state
    else
        return "disconnected"
    end
end

function Internet:link_state_wan()
    if not _ubus then
        _ubus = bus.connect()
    end

    local link
    if _ubus then
        local wan = _ubus:call("network.interface.wan", "status", {})
        if wan then
            local ifname = wan.device
            if ifname == "br-wan" then
				ifname = uci:get_profile("wan", "wan_ifname") or uci:get("network", "wan", "ifname")
            end
            wan = _ubus:call("network.device", "status", {name = ifname})
            if wan then
                link = wan.link
            end
        end
    end

    if not link then
        return "unplugged"
    else
        return "plugged"    
    end
end

function Internet:link_state(iface)
    local args = {interface = iface}
    local result = nil 

    if iface == "wan" or iface == "internet" or iface == "wanv6" or  iface == "internetv6" or iface == "vpn" then
        result = self:invoke("status", args)
    end

    -- "plugged/unplugged"
    if result ~= nil and result.linkstate == true then
        return "plugged"
    else
		-- return "unplugged"
		if luci.sys.call("ubus list | grep -q 'network.interface'") == 0 then
			return "unplugged"
		else
			return "plugged"
		end
    end
end

function Internet:proto(iface)
    local args = {interface = iface}
    local result = nil 

    if iface == "wan" or iface == "internet" or iface == "wanv6" or  iface == "internetv6" then
        result = self:invoke("status", args)
    end
	
    if result ~= nil and result.proto ~= nil then
        return result.proto
    else
        return nil
    end
end

local valid_speed =
{
	["Cap1000"] = {
	    {
	        name    = "auto",
	        speed   = "1000",
	        duplex  = "full",
	        autoneg = "on",
	    },
	    {
	        name    = "1000F",
	        speed   = "1000",
	        duplex  = "full",
	        autoneg = "off",
	    },
	    {
	        name    = "1000H",
	        speed   = "1000",
	        duplex  = "half",
	        autoneg = "off",
	    },
	    {
	        name    = "100F",
	        speed   = "100",
	        duplex  = "full",
	        autoneg = "off",
	    },
	    {
	        name    = "100H",
	        speed   = "100",
	        duplex  = "half",
	        autoneg = "off",
	    },
	    {
	        name    = "10F",
	        speed   = "10",
	        duplex  = "full",
	        autoneg = "off",
	    },
	    {
	        name    = "10H",
	        speed   = "10",
	        duplex  = "half",
	        autoneg = "off",
	    },
    },
    ["Cap2500"] = {
		{
	        name    = "auto",
	        speed   = "2500",
	        duplex  = "full",
	        autoneg = "on",
	    },
	    {
	        name    = "2500F",
	        speed   = "2500",
	        duplex  = "full",
	        autoneg = "off",
	    },
	    {
	        name    = "1000F",
	        speed   = "1000",
	        duplex  = "full",
	        autoneg = "off",
	    },
	    {
	        name    = "100F",
	        speed   = "100",
	        duplex  = "full",
	        autoneg = "off",
	    },
    }
}

function is_valid_speed(speed, capability)
	local cap = capability or "Cap1000"
    for i, v in ipairs(valid_speed[cap]) do
        if string.upper(speed) == string.upper(v.name) then
            return v
        end
    end

    return nil
end

function get_port_speed_profile()
	local profile = {}
	profile.name = "wan"
	profile.cap = "Cap1000"
	
	local wan_port = uci:get("switch", "wan", "switch_port")
	if wan_port then
		local portspeed = uci:get("switch", wan_port, "portspeed")
		if portspeed then
			profile.cap = portspeed
			profile.name = portspeed
		end
	end

	return profile
end

function get_port_speed()
	local profile = get_port_speed_profile()
    local current = uci:get(UCICFG, profile.name, "current")

    return current
end

function set_port_speed(speed)
	local profile = get_port_speed_profile()
    local port = uci:get(UCICFG, profile.name, "port")
    local oldspeed = uci:get(UCICFG, profile.name, "current")

    speed = is_valid_speed(speed, profile.cap)
    if speed == nil then
        return nil
    end

    if speed.name == oldspeed then
        return oldspeed
    end

    local cmd = string.format("portspeed %s %s %s %s 1>/dev/null 2>&1", 
                              port, speed.speed, speed.duplex, speed.autoneg)
    sys.call(cmd)

    uci:set(UCICFG, profile.name, "current", speed.name)
    uci:commit(UCICFG)
    return speed.name
end

function get_supported_speed()
	local profile = get_port_speed_profile()
    local supported = uci:get(UCICFG, profile.name, "supported")
    local result = {}
    local speed = nil

    supported = util.split(supported, ",")
    for i, s in ipairs(supported) do
        speed = is_valid_speed(s, profile.cap)
        if speed ~= nil then
            table.insert(result, speed.name)
        end
    end

    return result
end
