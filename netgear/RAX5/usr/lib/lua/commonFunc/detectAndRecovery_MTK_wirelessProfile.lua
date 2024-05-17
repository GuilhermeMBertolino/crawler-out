#!/usr/bin/lua

local log = require "luci.log"
    log.debug(0)
local wifiUtil_convert = require "commonFunc.wifiUtils_convertWifiSettings"

local isWifi2GProfile_corrupted = "false"
local isWifi5GProfile_corrupted = "false"

isWifi2GProfile_corrupted = wifiUtil_convert.detect_MTK_wireless_profile_corrupt("2.4G")
isWifi5GProfile_corrupted = wifiUtil_convert.detect_MTK_wireless_profile_corrupt("5G")

wifiUtil_convert.recovery_MTK_wirelessProfile_from_uciDB(isWifi2GProfile_corrupted, isWifi5GProfile_corrupted)

