#! /usr/bin/env lua
--
-- nightMode.lua
-- Copyright (C) 2019 tpuser <tpuser@liushuaiwei>
--
-- Distributed under terms of the MIT license.
--
module("luci.smart_home.nightMode", package.seeall)

local ctl =  require "luci.model.smart_home_controller"
local ctl_ledpm =  require "luci.controller.admin.ledpm"
local _M = {}

function _M.version()
    return '1.0'
end

local function minute_to_hour(data)
-- deal the time from smart_home, transfer minute to hour
	local hour = math.floor(data / 60)
	local minute = data % 60
	if hour < 10 then
		hour = "0" .. tostring(hour)
	else
		hour = tostring(hour)
	end
	if minute < 10 then
		minute = "0" .. tostring(minute)
	else
		minute = tostring(minute)
	end
	return hour .. ":" .. minute
end

local function hour_to_minute(data)
-- deal the time from smart_home, transfer hour to minute
	data = data:gsub(":", "")
	local hour, minute
	local result
	tonumber(string.sub(data, 1, 1))
	hour = tonumber(string.sub(data, 1, 2))
	minute = tonumber(string.sub(data, 3, 4))
	result = hour*60 + minute
    return result
end

	
local function query_nightMode(data)          
    local result = {}
    if data.data.enable == "on" then
		result.enabled = true
    else
    	result.enabled = false
    end
    result.startTime = hour_to_minute(data.data.time_start)
    result.endTime = hour_to_minute(data.data.time_end)
    return result
end

local function execute_nightMode(data)
    if data.error_code == 1 and data.msg == "LED disabled" then
        return -1201, "LED disabled"
    end
    return data
end

local function nightMode_params_transfer(data)
	if not data then
		return -1011
	end
	
	local result = {}
	if data.enabled == true then
		result.enable = "on"
	else
		result.enable = "off"
	end
	if data.startTime then
		result.time_start = minute_to_hour(data.startTime)
	end
	if data.endTime then
		result.time_end = minute_to_hour(data.endTime)
	end
    return result
end

local dispatch_tbl = {
    ["query"] = {
        ctl = ctl_ledpm,
        form = "setting",
        oper = "read",
        cb = query_nightMode
    },
    ["execute"] = {
        ctl = ctl_ledpm,
        form = "setting",
        oper = "write",
        cb = execute_nightMode,
        pre_hook = nightMode_params_transfer,
    },
}

function _M.dispatch(form)
    return ctl.dispatch(dispatch_tbl, form)
end

return _M
