local M = { }

local uci = require "luci.model.uci".cursor()
local uci_st = require "luci.model.uci".cursor(nil, "/var/state")
local json = require "luci.json"
local sys  = require "luci.sys"
local netUtils = require "commonFunc.netUtils"
local log = require "luci.log" -- for debug

log.print("[trafficMeter_warning] lua in '/usr/lib/lua/webGetFunc' !")

function M.getTextVal_popMessage()
	local ret = uci:get("tm", "tm_control", "waterMark")
	return ret
end

function M.getMlangVal_limitUnit()
	local ret = uci:get("tm", "tm_control", "volcontrl")
	if (ret == "true") then
		return "ATM044"
	else
		return "ATM043"
	end
end

function M.getSpanVal_current_time()
	local ret = uci_st:get("tm", "tm_statistics", "current_data_time")
	return ret
end

function M.getTextVal_limitReachStatus()
	local ret = uci:get("tm", "tm_control", "warterMarkStatus")
	return ret
end

function M.getSpanVal_messageWarningTime()
	local ret = uci_st:get("tm", "tm_statistics", "warningTime")
	return ret
end

return M
