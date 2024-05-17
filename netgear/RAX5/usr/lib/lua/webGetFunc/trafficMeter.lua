local M = { }

local uci = require "luci.model.uci".cursor()
local uci_st = require "luci.model.uci".cursor(nil, "/var/state")
local json = require "luci.json"
local sys  = require "luci.sys"
local netUtils = require "commonFunc.netUtils"
local log = require "luci.log" -- for debug


function M.getTrafficMeterEnable()
	local ret = uci:get("tm", "tm_control", "traffic_on")
        return ret
end

function M.getTmType()
	local volume_contrl = uci:get("tm", "tm_control", "volcontrl")
	local time_control = uci:get("tm", "tm_control", "timecontrl")

	if (volume_contrl == "true" and time_control == "false") then
	  return "volControl"
	elseif (volume_contrl == "false" and time_control == "true") then
	  return "timeControl"
	end
end

function M.getControlType()
	local ret = uci:get("tm", "tm_control", "contrl_type")
        return ret
end

function M.getVolMonthlyLimit()
	local ret = uci:get("tm", "tm_control", "volume_monthly_limit")
        return ret
end

function M.getVolRoundUp()
	local ret = uci:get("tm", "tm_control", "round_up_volume")
        return ret
end

function M.getTimeControlLimit()
	local ret = uci:get("tm", "tm_control", "conntime_monthly_limit")
        return ret
end

function M.getCounterDay()
	local ret = uci:get("tm", "tm_control", "day")
        return ret
end

function M.getCounterHour()
	local ret = uci:get("tm", "tm_control", "hour")
        return ret
end

function M.getCounterMin()
	local ret = uci:get("tm", "tm_control", "min")
        return ret
end

function M.getAmPmSel()
	local ret = uci:get("tm", "tm_control", "ampm_sel")
        return ret
end

function M.getPopMessage()
	local ret = uci:get("tm", "tm_control", "waterMark")
        return ret
end

function M.getTurnLed()
	local ret = uci:get("tm", "tm_control", "led_on")
        return ret
end

function M.getDisableInternet()
	local ret = uci:get("tm", "tm_control", "block_on")
        return ret
end

function M.getStartTime()
	local ret = uci_st:get("tm", "tm_statistics", "start_data_time")
	return ret
end

function M.getCurrentTime()
	local ret = luci.sys.exec("date")
	return ret
end

function M.getLeftTraffic()
	local ret = uci_st:get("tm", "tm_statistics", "volume_left")
	return ret
end

-- Today tm_statistics Start--
function M.getTodayConnectTime()
	local ret = uci_st:get("tm", "tm_statistics", "today_conntime")
	return ret
end

function M.getTodayUpload()
	local ret = uci_st:get("tm", "tm_statistics", "today_upload")
	return ret
end

function M.getTodayDownload()
	local ret = uci_st:get("tm", "tm_statistics", "today_download")
	return ret
end

function M.getTodayTotal()
	local ret = uci_st:get("tm", "tm_statistics", "today_total")
	return ret
end
-- Today tm_statistics End--

-- Yesterday tm_statistics Start--
function M.getYesterdayConnectTime()
	local ret = uci_st:get("tm", "tm_statistics", "yesterday_conntime")
	return ret
end

function M.getYesterdayUpload()
	local ret = uci_st:get("tm", "tm_statistics", "yesterday_upload")
	return ret
end

function M.getYesterdayDownload()
	local ret = uci_st:get("tm", "tm_statistics", "yesterday_download")
	return ret
end

function M.getYesterdayTotal()
	local ret = uci_st:get("tm", "tm_statistics", "yesterday_total")
	return ret
end
-- Yesterday tm_statistics End--

-- Thisweek tm_statistics Start--
function M.getThisweekConnectTime()
	local ret = uci_st:get("tm", "tm_statistics", "thisweek_conntime")
	return ret
end

function M.getThisweekUpload()
	local ret1 = uci_st:get("tm", "tm_statistics", "thisweek_upload")
	local ret2 = uci_st:get("tm", "tm_statistics", "thisweek_uploadavg")
	local ret = ret1.."/"..ret2
	return ret
end

function M.getThisweekDownload()
	local ret1 = uci_st:get("tm", "tm_statistics", "thisweek_download")
	local ret2 = uci_st:get("tm", "tm_statistics", "thisweek_downloadavg")
	local ret = ret1.."/"..ret2
	return ret
end

function M.getThisweekTotal()
	local ret1 = uci_st:get("tm", "tm_statistics", "thisweek_total")
	local ret2 = uci_st:get("tm", "tm_statistics", "thisweek_totalavg")
	local ret = ret1.."/"..ret2
	return ret
end
-- Thisweek tm_statistics End--

-- Thismonth tm_statistics Start--
function M.getThismonthConnectTime()
	local ret = uci_st:get("tm", "tm_statistics", "thismonth_conntime")
	return ret
end

function M.getThismonthUpload()
	local ret1 = uci_st:get("tm", "tm_statistics", "thismonth_upload")
	local ret2 = uci_st:get("tm", "tm_statistics", "thismonth_uploadavg")
	local ret = ret1.."/"..ret2
	return ret
end

function M.getThismonthDownload()
	local ret1 = uci_st:get("tm", "tm_statistics", "thismonth_download")
	local ret2 = uci_st:get("tm", "tm_statistics", "thismonth_downloadavg")
	local ret = ret1.."/"..ret2
	return ret
end

function M.getThismonthTotal()
	local ret1 = uci_st:get("tm", "tm_statistics", "thismonth_total")
	local ret2 = uci_st:get("tm", "tm_statistics", "thismonth_totalavg")
	local ret = ret1.."/"..ret2
	return ret
end
-- Thismonth tm_statistics End--

-- Lastmonth tm_statistics Start--
function M.getLastmonthConnectTime()
	local ret = uci_st:get("tm", "tm_statistics", "lastmonth_conntime")
	return ret
end

function M.getLastmonthUpload()
	local ret1 = uci_st:get("tm", "tm_statistics", "lastmonth_upload")
	local ret2 = uci_st:get("tm", "tm_statistics", "lastmonth_uploadavg")
	local ret = ret1.."/"..ret2
	return ret
end

function M.getLastmonthDownload()
	local ret1 = uci_st:get("tm", "tm_statistics", "lastmonth_download")
	local ret2 = uci_st:get("tm", "tm_statistics", "lastmonth_downloadavg")
	local ret = ret1.."/"..ret2
	return ret
end

function M.getLastmonthTotal()
	local ret1 = uci_st:get("tm", "tm_statistics", "lastmonth_total")
	local ret2 = uci_st:get("tm", "tm_statistics", "lastmonth_totalavg")
	local ret = ret1.."/"..ret2
	return ret
end
-- Lastmonth tm_statistics End--

function M.getWanMode()
	local ret = uci:get("network", "inet_global", "wan_mode")
        return ret
end

-- RAX30 www/tm_block/php/db/trafficMeter_limited_data.php
function M.getSpanVal_monthlyLimit()
	local volume_contrl = uci:get("tm", "tm_control", "volcontrl")
	local volume_monthly_limit = uci:get("tm", "tm_control", "volume_monthly_limit")
	local conntime_monthly_limit = uci:get("tm", "tm_control", "conntime_monthly_limit")

	if (volume_contrl == "true" ) then
	  return volume_monthly_limit
	else
	  return conntime_monthly_limit
	end
end

function M.getMlangVal_limitUnit()
	local volume_contrl = uci:get("tm", "tm_control", "volcontrl")

	if (volume_contrl == "true" ) then
	  ret = "volControl"
	else
	  ret = "timeControl"
	end

        if (ret == "volControl") then
	  return "ATM044"  --Mbytes
	elseif (ret == "timeControl") then
	  return "ATM043"  --hours
	end
end

function M.getTextVal_limitReachStatus()
	local ret = uci:get("tm", "tm_control", "warterMarkStatus")

	if (ret == "1" ) then
	  return "approach_limit"
	elseif (ret == "3" or ret == "4") then
	  return "reach_limit"
	else
	  return "not_reach_limit"
	end
end

return M
