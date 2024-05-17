#!/usr/bin/lua

local log = require "luci.log"
    log.debug(0)
--log.console("debug test")
local wifiUtil_convert = require "commonFunc.wifiUtils_convertWifiSettings"
wifiUtil_convert.apply_wifiSettings()

