#!/usr/bin/env lua

local tsched_conf = require "tsched_conf"

local function config_convert_calendar(calendar)
	return tsched_conf.convert_calendar(calendar)
end

if arg[1] == "convert_calendar" then
	print(config_convert_calendar(arg[2]))
else
	print("false")
end

