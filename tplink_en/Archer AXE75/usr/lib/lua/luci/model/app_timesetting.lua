--[[
Copyright(c) 2008-2014 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  app_timesetting.lua
Details :  model for time settings
Author  :  Feng Jiashuang <fengjiashuang@tp-link.com.cn>
Version :  1.0.0
Date    :  02Nov, 2017
]]--

module("luci.model.app_timesetting", package.seeall)

local uci               = require "luci.model.uci"
local fs                = require "luci.fs"
local dbg               = require "luci.tools.debug"
local dt                = require "luci.tools.datatypes"
local nixio             = require "nixio"
local sys               = require "luci.sys"
local ctl               = require "luci.model.controller"

local dstRuleTbl				= require "luci.model.dstRuleTbl"

local uci_r = uci.cursor()
local tostring, tonumber = tostring, tonumber

local TZ_NONEXIST = -23101

local WEEK_TBL = {['1st']=1, ['2nd']=2, ['3rd']=3, ['4th']=4, ['5th']=5}
local DAY_TBL  = {Sun=1, Mon=2, Tues=3, Wed=4, Thur=5, Fri=6, Sat=7}
local MON_TBL  = {Jan=1, Feb=2, Mar=3, Apr=4, May=5, Jun=6, Jul=7, Aug=8, Sep=9, Oct=10, Nov=11, Dec=12}

local function debug(arg)
    --[[
    if type(arg) == "string" then
        dbg.print(arg)
    elseif type(arg) == "table" then
        dbg.dumptable(arg)
    end
    ]]--
end

-- Func print lua table.
-- @param    data    table to display on console.
-- @return N/A
local function _print_tbl(data)
	if type(data) == "table" then
		for i, v in pairs(data) do
			debug(i .. " = " .. tostring(data[i]))
			if type(data[i]) == "table" then
				_print_tbl(data[i])
			end
		end
	end
end

local function ts_parse_week(y, m, w, d)
	local week = tonumber(w)
	local dateVal, cmd, cal, month
	if week < -5 or week > 5 then
		-- TODO:Use default rules?
		debug("dst date error!")
		week = 1
	end

	-- week = -1
	if week < 0 then
		-- FORMAT - yyyy-mm-dd hh:mm[:ss]
		dateVal = y .. "-" .. m .. "-1 00:00"
		cmd = '(7+' .. d .. '-1-$(date -d \"' .. dateVal .. '\" +%w))%7+28+1'
		debug(cmd)
		cal = sys.exec(cmd)

		dateVal = y .. "-" .. m .. "-" .. cal .. " 00:00"
		cmd = 'date -d \"' .. dateVal .. '\" +%m'
		month = tonumber(sys.exec(cmd))
		if month ~= tonumber(m) then
			week = week + 5
			debug("diff month  " .. month .. " week " .. tostring(week))
		else
			week = week + 6
			debug("same month  " .. month .. " week " .. tostring(week))
		end
	end

	if week < 1 or week > 5 then
		-- TODO:Use default rules?
		debug("dst date error!")
		week = 1
	end

	return tostring(week)
end

local function ts_get_key(tbl, value)
	--[[ 1. Ensure value type is number.
		 2. Use pairs, ipairs will skip members not in a row.
	]]
	value = tonumber(value)
	for k, v in pairs(tbl) do
		if value == v then
			return k
		end
	end
end

--- Transfer cloud dst string to time
-- @param cloud dst string
-- @return data return timestamp
local function ts_set_dstRule(dstStr, rule)
	debug("dstStr: " .. dstStr)

	--"2016:3:-1:1:60" year, month, weekofmonth, dayofweek, minutes
	local y, m, w, d, minute = dstStr:match("(%d+):(%d+):(%p-%d+):(%d+):(%d+)")
	local day, week, dataVal, cmd, sec, time

	if not y or not m or not w or not d or not minute then
		return false, "dst is invalid."
	end

	day = d - 1
	week = ts_parse_week(y, m, w, day)

	local content = {}
	if rule == "start" then
		content.start_year = y
		content.start_month = ts_get_key(MON_TBL, m)
		content.start_week = ts_get_key(WEEK_TBL, week)
		content.start_day = ts_get_key(DAY_TBL, d)

		hour = math.ceil(minute/60)
		if hour == 0 then
			content.start_hour = "12am"
		elseif hour == 12 then
			content.start_hour = "12pm"
		elseif hour < 12 then
			content.start_hour = hour .. "am"
		else
			hour = hour - 12
			content.start_hour = hour .. "pm"
		end
	elseif rule == "end" then
		-- complete set dst endtime rules, enable dst
		content.dst_enable = "on"
		content.end_year = y
		content.end_month = ts_get_key(MON_TBL, m)
		content.end_week = ts_get_key(WEEK_TBL, week)
		content.end_day = ts_get_key(DAY_TBL, d)

		hour = math.ceil(minute/60)
		if hour == 0 then
			content.end_hour = "12am"
		elseif hour == 12 then
			content.end_hour = "12pm"
		elseif hour < 12 then
			content.end_hour = hour .. "am"
		else
			hour = hour - 12
			content.end_hour = hour .. "pm"
		end

	end

	return true, content
end

local function ts_check_dst_rules(dstrules)
	--[[
	dst = {}
	dst.startDST = "2016:3:-1:1:60"
	dst.endDST = "2016:10:-1:1:60"
	dst.dstSavings = tostring(60)
	]]--

	local need_commit = 0
	local dstrule_num = #dstrules
	local ret_start, ret_end
	local content_start, content_end
	debug("cloud dstrule num " .. dstrule_num)

	-- Handle empty dstrules
	if next(dstrules) == nil then
		uci_r:set("system", "dst", "dst_enable", "off")
		uci_r:commit_without_write_flash("system")
		return
	end

	-- 1. set dst rules
	for i, v in ipairs(dstrules) do
		ret_start, content_start = ts_set_dstRule(dstrules[i].startDST, "start")
		ret_end, content_end = ts_set_dstRule(dstrules[i].endDST, "end")

		if ret_start == true and ret_end == true then
			need_commit = 1

			-- set dst_save config
			-- web doesn't support minute
			local hour, minute, dst_save
			minute = (dstrules[i].dstSavings)%60
			if minute == 0 then
				hour = (dstrules[i].dstSavings)/60
				dst_save = hour .. ":00"
			else
				if tonumber(dstrules[i].dstSavings) >= 0 then
					hour = math.floor((dstrules[i].dstSavings)/60)
				else
					hour = math.ceil((dstrules[i].dstSavings)/60)
					minute = 60-(dstrules[i].dstSavings)%60
				end
				dst_save = hour .. ":" .. minute
			end
			debug("[ts_check_dst_rules] - dst_save: " .. dst_save)
			uci_r:section("system", "dst", "dst", content_start)
			uci_r:section("system", "dst", "dst", content_end)
			uci_r:set("systime", "zoneinfo", "dst_save", dst_save)
		end
	end

	if need_commit == 1 then
		uci_r:commit_without_write_flash("system")
	end

	return dstrule_num
end

--- Update daylight saving settings
-- @param N/A
-- @return data return settings
function ts_update_dst(zoneId, settype)

	-- 0. Handle nil zoneId
	if not zoneId then
		local zone_rule = uci_r:get("systime", "zoneinfo", "zone_rule") or "no"
		if zone_rule == "byapp" then
			zoneId = uci_r:get("systime", "zoneinfo", "tz_region") or "Etc/GMT+0"
		else
			zoneId = uci_r:get("systime", "zoneinfo", "zoneId") or "Etc/GMT+0"
		end
	end

	-- 1. avoid to set more then once by tether
	if settype == "tether" then
		local tz_region = uci_r:get("systime", "zoneinfo", "tz_region")
		if tz_region and tz_region == zoneId then
			return true
		end
	end

	-- 2. avoid to modify user settings
	local dst_rule = uci_r:get("systime", "zoneinfo", "dst_rule")
	if dst_rule and dst_rule == "byuser" then
		if settype == "tether" then
			uci_r:set("systime", "zoneinfo", "tz_region", zoneId)
			uci_r:commit("systime")
		end
		return true
	end

	-- 3. get dst rules from cloud
	local cloud_dst = require("cloud_req.cloud_getDst")
	local dstrules = nil
	local error_code = nil
	if sys.call("online-test") == 0 then
		dstrules, error_code = cloud_dst.get_dst_ruleList(zoneId)
	end
	if not dstrules then
		if error_code and error_code == TZ_NONEXIST then
			debug("ts_update_dst: time region not supported")
			-- time region not supported
			dstrules = {}
		elseif settype == "auto" then
			return false
		else
			-- save zoneId to config
			if settype == "tether" then
				uci_r:set("systime", "zoneinfo", "tz_region", zoneId)
			end
-- 			-- use default
			local ret = dstRuleTbl.getDstRule(zoneId)
			if next(ret) == nil then
				uci_r:set("system", "dst", "dst_enable", "off")
				uci_r:commit_without_write_flash("system")
			else
				ts_check_dst_rules(ret)
			end
			uci_r:set("systime", "zoneinfo", "dst_rule", "no")
			uci_r:commit("systime")
			return false, error_code
		end
	end

	-- 4. save zoneId to config
	if settype == "tether" then
		uci_r:set("systime", "zoneinfo", "tz_region", zoneId)
	end

	-- 5. check and store dst
	ts_check_dst_rules(dstrules)
	uci_r:set("systime", "zoneinfo", "dst_rule", "bycloud")
	uci_r:set("systime", "zoneinfo", "update_time", os.time())
	uci_r:commit("systime")

	return true
end

-----------------------------------------------------------------------------------
-----------------------------------------------------------------------------------
