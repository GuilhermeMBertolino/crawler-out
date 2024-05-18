--[[
Copyright(c) 2008-2014 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  mcu.lua
Details :  read/write mcu-config for mcu UI
Author  :  Fan CunLian <fancunlian@tp-link.net>
Version :  1.0.0
Date    :  5Dec, 2014
]]--

module("luci.controller.admin.mcu", package.seeall)

local uci               = require "luci.model.uci"
local ctl               = require "luci.model.controller"

UCICFG = "mcu"
uci_r = uci.cursor();

local function read_cfg(http_form, keys)
	local data = {}
	local value

	for key, val in pairs(keys) do
		value = uci_r:get(UCICFG, "settings", key)
		if value then
			data[key] = value
		end
	end
	
	return data
end

local function write_cfg(http_form, keys)
	local value

	for key, _ in pairs(keys) do
		value = http_form[key]
		if value then
			uci_r:set(UCICFG, "settings", key, value)
		end
	end
	uci_r:commit(UCICFG)

	return read_cfg(http_form, keys)
end

local function read_cfg_pwdswitch(http_form)
	local keys = {["pwd_switch"] = "off"}
	return read_cfg(http_form, keys)
end

local function write_cfg_pwdswitch(http_form)
	local keys = {["pwd_switch"] = "off"}
	return write_cfg(http_form, keys)
end

local function read_cfg_clocksetting(http_form)
	local keys = {["clocktype"] = "0"}
	return read_cfg(http_form, keys)
end

local function write_cfg_clocksetting(http_form)
	local keys = {["clocktype"] = "0"}
	return write_cfg(http_form, keys)
end

local function read_cfg_screen_settings(http_form)
	local keys = {
			["brightness"] = "70",
			["screen_saver_wait_time"] = "3",
			["screen_saver_type"] = "0"
		     }
	return read_cfg(http_form, keys)
end

local function write_cfg_screen_settings(http_form)
	local keys = {
			["brightness"] = "70",
			["screen_saver_wait_time"] = "3",
			["screen_saver_type"] = "0"
		     }
	return write_cfg(http_form, keys)
end

local function read_cfg_calibration(http_form)	
	local o = io.popen("nvram get rftestflag")
	local ret = o:read("*all"):sub(1,1)

	if ret ~= "1" then
		ret = "0"
	end

	return {["rftestflag"] = ret}
end

local dispatch_tbl = {
    pwdswitch = {
        ["read"]  = { cb  = read_cfg_pwdswitch },
        ["write"] = { cb  = write_cfg_pwdswitch}
    },
    clocksetting = {
	["read"] = { cb = read_cfg_clocksetting },
	["write"] = { cb = write_cfg_clocksetting }
    },
    screen_settings = {
	["read"] = { cb = read_cfg_screen_settings },
	["write"] = { cb = write_cfg_screen_settings }
    },
    calibration = {
	["read"] = { cb = read_cfg_calibration }
    }
}

function dispatch(http_form)
    return ctl.dispatch(dispatch_tbl, http_form)
end

function _index()
    return ctl._index(dispatch)
end

function index()
    entry({"admin", "mcu"}, call("_index")).leaf = true
end
