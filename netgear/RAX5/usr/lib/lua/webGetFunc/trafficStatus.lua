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

-- Thismonth tm_statistics Start--
function M.getThismonthDownload()
	local ret = uci_st:get("tm", "tm_statistics", "thismonth_download")
	return ret
end

function M.getThismonthTotal()
	local ret = uci_st:get("tm", "tm_statistics", "thismonth_total")
	return ret
end
-- Thismonth tm_statistics End--

function M.getVolMonthlyLimit()
	local ret = uci:get("tm", "tm_control", "volume_monthly_limit")
	return ret
end

function M.getControlType()
	local ret = uci:get("tm", "tm_control", "contrl_type")
	return ret
end

function M.getPassedDay()
	local ret = uci_st:get("tm", "tm_statistics", "passedDay")
	return ret
end

function M.getPeriodDay()
	local ret = uci_st:get("tm", "tm_statistics", "periodDay")
	return ret
end


function M.getTmType()
	local volume_contrl = uci:get("tm", "tm_control", "volcontrl")
	local time_control = uci:get("tm", "tm_control", "timecontrl")

	if (volume_contrl == "true" and time_control == "false") then
--	  log.print("volcontrl = "..volume_contrl)
	  return "volControl"
	elseif (volume_contrl == "false" and time_control == "true") then
--	  log.print("timecontrl = "..time_control)
	  return "timeControl"
	end
end

function M.getAmountHourLimited()
	local ret = uci_st:get("tm", "tm_statistics", "hourLimited")
	return ret
end

function M.getAmountHourUsed()
	local ret = uci_st:get("tm", "tm_statistics", "hourUsed")
	return ret
end

function M.getWarterMarkStatus()
       local ret = uci:get("tm", "tm_control", "warterMarkStatus")
       return ret
end

function M.getInterval()
	local ret = uci_st:get("tm", "tm_statistics", "interval")
	if (ret == nil) then
		return "10"
	else
		return ret
	end
end

return M
