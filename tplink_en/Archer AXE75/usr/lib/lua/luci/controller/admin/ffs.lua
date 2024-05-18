--[[
Copyright(c) 2013 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  ffs.lua
Details :  controller for wiressles.html ffs setting webpage
Author  :  Li Qiang<liqiang@tp-link.net>
Version :  1.0.0
Date    :  2 Nov, 2018
]]--

module("luci.controller.admin.ffs", package.seeall)


local dbg  = require "luci.tools.debug"
local ubus = require "ubus"
local io   = require "io"
local util = require "luci.util"
local sys  = require "luci.sys" 
local uci  = require "luci.model.uci"
local dbg  = require "luci.tools.debug"
local ctl  = require "luci.model.controller"

local uci_r = uci.cursor()

local FFS_CMD_SHELL = "/etc/init.d/ffs"
local START = "start"
local STOP = "stop"
local RESTART = "restart"

function start_action()
    luci.sys.fork_exec("%s %s" %{FFS_CMD_SHELL, START})
end

function stop_action()
    luci.sys.fork_exec("%s %s %s" %{FFS_CMD_SHELL, STOP, "all"})
end

function restart_action()
    luci.sys.fork_exec("%s %s" %{FFS_CMD_SHELL, RESTART})
end

function get_ffs_value(http_form)
    local data = {}
    local ffs_wireless_iface = uci_r:get("amazon_ffs", "ffs", "wireless_iface")

    data.ssid = uci_r:get_first("amazon_ffs", "wifi-iface", "ssid", "simple_setup")
    data.enable = uci_r:get("amazon_ffs", "ffs", "enable") or "on"
    
    return  data
end

function set_ffs_enable(enable)
    local old_enable = uci_r:get("amazon_ffs", "ffs", "enable")
    if old_enable == enable then return end
    
    local ffs_wireless_iface = uci_r:get("amazon_ffs", "ffs", "wireless_iface")
    uci_r:set("amazon_ffs", "ffs", "enable", enable)
    
    uci_r:commit("amazon_ffs")
    
    if enable == "on" then
        start_action()
    else
        stop_action()
    end
end

function set_ffs_value(http_form)
    local data = {}
    
    set_ffs_enable(http_form.enable)
    
    data.enable = http_form.enable 
    data.ssid = http_form.ssid 
    
    return data
end

function tmp_set_ffs_enable(enable)
    set_ffs_enable(enable)
end

--- Dispatch table
local dispatch_tbl = {
    config = {
        ["read"]   = {cb = get_ffs_value},
        ["write"]  = {cb = set_ffs_value}
    }
}

function dispatch(http_form)
    return ctl.dispatch(dispatch_tbl, http_form)
end

function _index()
    return ctl._index(dispatch)
end

--- Module entrance
function index()
    entry({"admin", "ffs"}, call("_index")).leaf = true
end