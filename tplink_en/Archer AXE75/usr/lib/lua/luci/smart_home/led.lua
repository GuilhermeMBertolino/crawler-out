#! /usr/bin/env lua
--
-- led.lua
-- Copyright (C) 2019 tpuser <tpuser@liushuaiwei>
--
-- Distributed under terms of the MIT license.
--

module("luci.smart_home.led", package.seeall)

local ctl =  require "luci.model.smart_home_controller"
local ctl_ledgeneral =  require "luci.controller.admin.ledgeneral"
local _M = {}
local dbg = require "luci.tools.debug"
local json = require "luci.json"

function _M.version()
    return '1.0'
end

local function query_led(data)
	local result = {}
    if data.data.enable == "on" then
    	result.enabled = true
    else
    	result.enabled = false
    end
    return result
end

local function execute_led(data)
    local result = {}
    return result
end

local function led_params_transfer(data)
	if not data then
		return -1011
	end
	
    local result = {}
    if data.enabled == true then
    	result.enable = "on"
    elseif data.enabled == false then
    	result.enable = "off"
    else
    	return -1101
    end
    return result
end
local dispatch_tbl = {  
    ["query"] = {
        ctl = ctl_ledgeneral,
        form = "setting",
        oper = "read",
        cb = query_led
    },
    ["execute"] = {
        ctl = ctl_ledgeneral,
        form = "setting",
        oper = "write",
        cb = execute_led,
        pre_hook = led_params_transfer,
    },
}

function _M.dispatch(form)
    return ctl.dispatch(dispatch_tbl, form)
end

return _M


