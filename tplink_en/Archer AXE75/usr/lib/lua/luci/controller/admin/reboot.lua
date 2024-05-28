--[[
Copyright(c) 2013 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  reboot.lua
Details :  controller for reboot.html webpage
Author  :  Zhu Shuxin<zhushuxin@tp-link.net>
Version :  1.0.0
Date    :  09 Dec, 2015
]]--

module("luci.controller.admin.reboot", package.seeall)

local dbg  = require "luci.tools.debug"
local util = require "luci.util"
local uci  = require "luci.model.uci"
local ctl  = require "luci.model.controller"
local sys  = require "luci.sys"
local fs   = require "luci.fs"

local AUTO_REBOOT_SHELL = "/etc/init.d/auto-reboot"
local RELOAD = "restart"
local STOP = "stop"
local NTP_STATUS_TBL = {success = "747301", failed = "747302", waiting = "747303"}

function get_auto_reboot()
    local uci_r = uci.cursor()
	local data = {}

	data.enable = uci_r:get("autoreboot", "reboot", "enable") or "off"
	data.time = uci_r:get("autoreboot", "reboot", "time") or "03:00"
	data.cycle = uci_r:get("autoreboot", "reboot", "cycle") or "week"

	if data.cycle == "week" then                    
		data.day = uci_r:get("autoreboot", "reboot", "day") or "Mon"
	elseif data.cycle == "month" then                                   
		data.day = uci_r:get("autoreboot", "reboot", "day") or "1"
	end
	
    return data
end

local function check_ntp_fail()
    local fd = io.open("/tmp/gmt_status.log", "r")
    if fd == nil then
        return true
    end
    assert(fd)
    ntp_status = fd:read("*line")
    fd:close()

    if ntp_status ~= NTP_STATUS_TBL.success then
        return true
    else
        return false
    end
end

function set_auto_reboot(form)
    local uci_r = uci.cursor()
    local enable = form.enable
    local time = form.time
    local cycle = form.cycle
    local day = form.day
    local flag = false

    local ntp_enable = uci_r:get("system","ntp","type")
    if ntp_enable ~= "auto" then
        uci_r:set("autoreboot", "reboot", "enable", "off")
        flag = true
    elseif enable then
        uci_r:set("autoreboot", "reboot", "enable", enable)
        flag = true
    else
        return get_auto_reboot()
    end

    if time then
        uci_r:set("autoreboot", "reboot", "time", time)
        flag = true
    end

    if cycle then
        uci_r:set("autoreboot", "reboot", "cycle", cycle)
        flag = true

        if cycle ~= "day" and day then
            uci_r:set("autoreboot", "reboot", "day", day)
        end
    end

    if flag == true then
        uci_r:commit("autoreboot")
    end

    if enable == "off" then
        luci.sys.call("%s %s" %{AUTO_REBOOT_SHELL, STOP})
    else
        luci.sys.call("%s %s" %{AUTO_REBOOT_SHELL, RELOAD})
    end

    return get_auto_reboot()
end

--- Dispatch table
local dispatch_tbl = {
    set = {
        ["read"] = {cb = get_auto_reboot},
        ["write"] = {cb = set_auto_reboot}
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
    entry({"admin", "reboot"}, call("_index")).leaf = true
end
