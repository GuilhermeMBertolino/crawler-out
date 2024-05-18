--[[
Copyright(c) 2008-2014 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  timesetting.lua
Details :  controller for time settings webpage
Author  :  Wen Kun <wenkun@tp-link.net>
Version :  1.0.0
Date    :  17Mar, 2014
]]--

local uci               = require "luci.model.uci"
local fs                = require "luci.fs"
local dbg               = require "luci.tools.debug"
local dt                = require "luci.tools.datatypes"
local nixio             = require "nixio"
local sys               = require "luci.sys"
local json              = require "luci.json"
local ctl               = require "luci.model.controller"
local cloud_dst			= require "cloud_req.cloud_getDst"

local uci_r = uci.cursor()
local uci_s = uci.cursor_state()

module("luci.controller.admin.timesetting", package.seeall)

local TIME_SETTINGS_SHELL = "/etc/init.d/time_settings"
local RELOAD = "reload"

local NTP_STATUS_TBL = {success = "747301", failed = "747302", waiting = "747303"}

local TIMEZONE_PATH = "/www/webpages/data/timezone.json"

local TZ = {
    { 'GMT-12:00', 'Etc/GMT+12'},
    { 'GMT-11:00', 'Etc/GMT+11'},
    { 'GMT-10:00', 'US/Hawaii'},
    { 'GMT-09:00', 'US/Alaska'},
    { 'GMT-08:00', 'US/Pacific'},
    { 'GMT-07:00', 'US/Mountain'},
    { 'GMT-06:00', 'US/Central'},
    { 'GMT-05:00', 'US/Eastern'},
    { 'GMT-04:30', 'America/Caracas'},
    { 'GMT-04:00', 'Canada/Atlantic'},
    { 'GMT-03:30', 'Canada/Newfoundland'},
    { 'GMT-03:00', 'America/Buenos_Aires'},
    { 'GMT-02:00', 'Etc/GMT+2'},
    { 'GMT-01:00', 'Atlantic/Azores'},
    { 'GMT-00:00', 'Europe/Dublin'},
    { 'GMT+01:00', 'Europe/Berlin'},
    { 'GMT+02:00', 'Europe/Athens'},
    { 'GMT+03:00', 'Asia/Baghdad'},
    { 'GMT+03:30', 'Asia/Tehran'},
    { 'GMT+04:00', 'Asia/Muscat'},
    { 'GMT+04:30', 'Asia/Kabul'},
    { 'GMT+05:00', 'Asia/Karachi'},
    { 'GMT+05:30', 'Asia/Kolkata'},
    { 'GMT+05:45', 'Asia/Kathmandu'},
    { 'GMT+06:00', 'Asia/Dhaka'},
    { 'GMT+06:30', 'Asia/Rangoon'},
    { 'GMT+07:00', 'Asia/Bangkok'},
    { 'GMT+08:00', 'Asia/Shanghai'},
    { 'GMT+09:00', 'Asia/Tokyo'},
    { 'GMT+09:30', 'Australia/Darwin'},
    { 'GMT+10:00', 'Australia/Brisbane'},
    { 'GMT+11:00', 'Asia/Magadan'},
    { 'GMT+12:00', 'Pacific/Fiji'},
    { 'GMT+13:00', 'Pacific/Tongatapu'},
}

local TZ_NEW = {
    { "0",    '0',   'Etc/GMT+12' },
    { "60",   '1',   'Etc/GMT+11' },
	{ "120",  '2',   'Etc/GMT+10' },
    { "120",  '3',   'US/Aleutian' },
    { "120",  '4',   'US/Hawaii' },
    { "150",  '5',   'Pacific/Marquesas' },
    { "180",  '6',   'Etc/GMT+9' },
    { "180",  '7',   'US/Alaska' },
    { "240",  '8',   'Etc/GMT+8' },
    { "240",  '9',   'US/Pacific', 'Canada/Pacific' },
    { "300",  '10',  'Etc/GMT+7' },
    { "300",  '11',  'US/Arizona' },
    { "300",  '12',  'America/Chihuahua', 'America/La_Paz', 'America/Mazatlan' },
    { "300",  '13',  'US/Mountain', 'Canada/Mountain' },
    { "360",  '14',  'Etc/GMT+6' },
    { "360",  '15',  'US/Central', 'Canada/Central' },
    { "360",  '16',  'Pacific/Easter' },
    { "360",  '17',  'America/Mexico_City', 'America/Monterrey' },
    { "360",  '18',  'Canada/Saskatchewan' },
    { "420",  '19',  'Etc/GMT+5' },
    { "420",  '20',  'America/Bogota', 'America/Lima', 'America/Rio_Branco' },
    { "420",  '21',  'US/Eastern', 'Canada/Eastern' },
    { "420",  '22',  'America/Port-au-Prince' },		-- Haiti: ios return America/Port-au-Prince
    { "420",  '23',  'America/Havana' },
    { "420",  '24',  'US/East-Indiana' },
    { "480",  '25',  'Etc/GMT+4' },
    { "480",  '26',  'America/Caracas' },
    { "480",  '27',  'America/Asuncion' },
    { "480",  '28',  'Canada/Atlantic' },
    { "480",  '29',  'America/Cuiaba' },
    { "480",  '30',  'America/Manaus', 'America/Argentina/San_Juan' },
    { "480",  '31',  'America/Santiago' },
    { "480",  '32',  'America/Grand_Turk' },		-- Turks and Caicos: ios return America/Grand_Turk
    { "510",  '33',  'Canada/Newfoundland' },
    { "540",  '34',  'Etc/GMT+3' },
    { "540",  '35',  'America/Araguaina' },
    { "540",  '36',  'America/Sao_Paulo' },		-- Brasilia: ios return America/Sao_Paulo
    { "540",  '37',  'America/Cayenne', 'America/Fortaleza' },
    { "540",  '38',  'America/Buenos_Aires' },
    { "540",  '39',  'America/Godthab' },
    { "540",  '40',  'America/Montevideo' },
--    { "540",  '38',  'America/Punta_Arenas' },		-- Punta Arenas: ios return America/Punta_Arenas but not in zone tbl
    { "540",  '41',  'America/Miquelon' },
    { "540",  '42',  'America/El_Salvador' },
    { "600",  '43',  'Etc/GMT+2' },
    { "660",  '44',  'Etc/GMT+1' },
    { "660",  '45',  'Atlantic/Azores' },
    { "660",  '46',  'Atlantic/Cape_Verde' },
    { "720",  '47',  'Etc/GMT+0' },
    { "720",  '48',  'Africa/Casablanca' },
    { "720",  '49',  'Europe/Dublin', 'Europe/Lisbon', 'Europe/London' },
    { "720",  '50',  'Africa/Monrovia', 'Atlantic/Reykjavik' },
    { "780",  '51',  'Etc/GMT-1' },
    { "780",  '52',  'Europe/Amsterdam', 'Europe/Berlin', 'Europe/Rome', 'Europe/Stockholm', 'Europe/Vienna' },
    { "780",  '53',  'Europe/Belgrade', 'Europe/Bratislava', 'Europe/Budapest', 'Europe/Ljubljana', 'Europe/Prague' },
    { "780",  '54',  'Europe/Brussels', 'Europe/Copenhagen', 'Europe/Madrid', 'Europe/Paris' },
    { "780",  '55',  'Europe/Sarajevo', 'Europe/Skopje', 'Europe/Warsaw', 'Europe/Zagreb' },
    { "780",  '56',  'Africa/Windhoek' },
    { "840",  '57',  'Etc/GMT-2' },
    { "840",  '58',  'Asia/Amman' },
    { "840",  '59',  'Europe/Athens', 'Europe/Bucharest' },
    { "840",  '60',  'Asia/Beirut' },
    { "840",  '61',  'Africa/Cairo' },
    { "840",  '62',  'Europe/Chisinau' },
    { "840",  '63',  'Asia/Damascus' },
    { "840",  '64',  'Asia/Gaza', 'Asia/Hebron' },
    { "840",  '65',  'Africa/Harare' },
    { "840",  '66',  'Europe/Helsinki', 'Europe/Riga', 'Europe/Sofia', 'Europe/Tallinn', 'Europe/Vilnius' },
    { "840",  '67',  'Asia/Jerusalem' },
    { "840",  '68',  'Europe/Kaliningrad' },
    { "840",  '69',  'Africa/Tripoli' },
    { "900",  '70',  'Etc/GMT-3' },
    { "900",  '71',  'Asia/Baghdad' },
    { "900",  '72',  'Europe/Istanbul' },
    { "900",  '73',  'Asia/Kuwait', 'Asia/Riyadh' },
    { "900",  '74',  'Europe/Minsk' },
    { "900",  '75',  'Europe/Moscow', 'Europe/Volgograd' },
    { "900",  '76',  'Africa/Nairobi' },
    { "930",  '77',  'Asia/Tehran' },
    { "960",  '78',  'Etc/GMT-4' },
    { "960",  '79',  'Asia/Muscat' },
    { "960",  '80',  'Europe/Astrakhan', 'Europe/Ulyanovsk' },
    { "960",  '81',  'Asia/Baku' },
    { "960",  '82',  'Europe/Samara' },
    { "960",  '83',  'Indian/Mauritius' },
--    { "960",  '79', '(UTC+04:00) Saratov' },		-- Saratov: ios return Europe/Saratov but not in zone tbl
    { "960",  '84',  'Asia/Tbilisi' },
    { "960",  '85',  'Asia/Yerevan' },
    { "990",  '86',  'Asia/Kabul' },
    { "1020", '87',  'Etc/GMT-5' },
    { "1020", '88',  'Asia/Ashgabat', 'Asia/Tashkent' },
    { "1020", '89',  'Asia/Yekaterinburg' },
    { "1020", '90',  'Asia/Karachi' },		-- Islamabad: ios return Asia/Karachi
    { "1050", '91',  'Asia/Kolkata' },		-- Chennai/Mumbai/New Delhi: ios return kolkata
    { "1050", '92',  'Asia/Colombo' },		--NOT FOUND ZONE
    { "1065", '93',  'Asia/Kathmandu' },
	{ "1080", '94',  'Etc/GMT-6'},
    { "1080", '95',  'Asia/Almaty' },		-- Astana: ios return Asia/Almaty
    { "1080", '96',  'Asia/Dhaka' },
    { "1080", '97',  'Asia/Omsk' },
    { "1110", '98',  'Asia/Rangoon' },
    { "1140", '99',  'Etc/GMT-7' },
    { "1140", '100', 'Asia/Bangkok', 'Asia/Saigon', 'Asia/Jakarta' },		-- Hanoi: ios return Asia/Saigon
    { "1140", '101', 'Asia/Barnaul' },
    { "1140", '102', 'Asia/Hovd' },
    { "1140", '103', 'Asia/Krasnoyarsk' },
    { "1140", '104', 'Asia/Novosibirsk' },
    { "1140", '105', 'Asia/Tomsk' },
    { "1200", '106', 'Etc/GMT-8' },
    { "1200", '107', 'Asia/Chongqing', 'Asia/Hong_Kong', 'Hongkong', 'Asia/Urumqi', 'Asia/Shanghai' },
    { "1200", '108', 'Asia/Kuala_Lumpur', 'Asia/Irkutsk' },
    { "1200", '109', 'Asia/Singapore' },
    { "1200", '110', 'Australia/Perth' },
    { "1200", '111', 'Asia/Taipei' },
    { "1200", '112', 'Asia/Ulaanbaatar' },
    { "1230", '113', 'Asia/Pyongyang' },
    { "1245", '114', 'Australia/Eucla' },
    { "1260", '115', 'Etc/GMT-9' },
    { "1260", '116', 'Asia/Chita' },
    { "1260", '117', 'Asia/Tokyo' },		-- Osaka: ios return Asia/Tokyo
    { "1260", '118', 'Asia/Seoul' },
    { "1260", '119', 'Asia/Yakutsk' },
    { "1290", '120', 'Australia/Adelaide' },
    { "1290", '121', 'Australia/Darwin' },
    { "1320", '122', 'Etc/GMT-10' },
    { "1320", '123', 'Australia/Brisbane' },
    { "1320", '124', 'Australia/Canberra', 'Australia/Melbourne', 'Australia/Sydney' },
    { "1320", '125', 'Pacific/Guam', 'Pacific/Port_Moresby' },
    { "1320", '126', 'Australia/Hobart' },
    { "1320", '127', 'Asia/Vladivostok' },
    { "1350", '128', 'Australia/Lord_Howe' },
    { "1380", '129', 'Etc/GMT-11' },
    { "1380", '130', 'Pacific/Bougainville' },
    { "1380", '131', 'Asia/Magadan' },
    { "1380", '132', 'Pacific/Norfolk' },
    { "1380", '133', 'Asia/Sakhalin' },
    { "1380", '134', 'Pacific/Guadalcanal', 'Pacific/Noumea' },		-- Solomon Is.: ios return Guadalcanal; New Caledonia: Noumea
    { "1440", '135', 'Etc/GMT-12' },
    { "1440", '136', 'Asia/Anadyr', 'Asia/Kamchatka' },		-- Petropavlovsk-Kamchatsky: ios return Asia/Kamchatka
    { "1440", '137', 'Pacific/Auckland' },		-- Wellington: ios return Auckland
    { "1440", '138', 'Pacific/Fiji' },
    { "1485", '139', 'Pacific/Chatham' },
    { "1500", '140', 'Etc/GMT-13' },
    { "1500", '141', 'Pacific/Tongatapu' },		--Nuku'alofa: ios return Tongatapu
    { "1500", '142', 'Pacific/Samoa' },
    { "1560", '143', 'Pacific/Kiritimati' },
}

--- Time settings parameter table
local TS_TBL  = {'timezone', 'date', 'time', 'ntp_svr1', 'ntp_svr2', 'gmt_status',}

--- Daylight saving parameter table
local DST_TBL = {'dst_enable', 'start_month', 'start_week', 'start_day', 'start_hour',
                'end_month', 'end_week', 'end_day', 'end_hour',}
local DFT_DST_TBL = {start_month="Mar", start_week="2nd", start_day="Sun", start_hour="2am", end_month="Nov", end_week="1st", end_day="Sun", end_hour="2am", dst_status="Daylight Saving Time is on."}
local WEEK_TBL = {['1st']=1, ['2nd']=2, ['3rd']=3, ['4th']=4, ['5th']=5}
local DAY_TBL  = {Mon=1, Tues=2, Wed=3, Thur=4, Fri=5, Sat=6, Sun=7}
local MON_TBL  = {Jan=1, Feb=2, Mar=3, Apr=4, May=5, Jun=6, Jul=7, Aug=8, Sep=9, Oct=10, Nov=11, Dec=12}


local WEB_MON_TBL = {"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"}
local WEB_DAY_TBL = {"Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"}
local TMP_MON_TBL = {"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"}
local TMP_DAY_TBL = {"Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"}

local function parse_timezone(zone, cmd)
    if not zone or not cmd then
        return false
    end

    local index = (cmd == "tonumber") and 2 or 1
    local ret

    for k, v in ipairs(TZ) do
        if v[index] == zone then
            ret = (cmd == "tonumber") and v[1] or v
            break
        end
    end
    return ret
end

local function parse_timezone_new(zone, cmd)
	if not zone or not cmd then
		return false
	end

	local index
	local ret
	if cmd == "zoneId" then
		for k, v in ipairs(TZ_NEW) do
			for index=3, #v, 1 do
				if v[index] == zone then
					ret = v[2]
					return ret
				end
			end
		end
	elseif cmd == "key" then
		index = 1
	else
		index = 2
	end

	if cmd == "zoneId" then
		return ret
	end

	for k, v in ipairs(TZ_NEW) do
		if v[index] == zone then
			ret = (cmd == "key") and v[3] or v
			return ret
		end
	end
end


local function parse_zoneid_new(zone)
    if not zone then
        return false
    end

    local index
    local ret
    for k, v in ipairs(TZ_NEW) do
        for index=3, #v, 1 do
            if v[index] == zone then
                ret = v[1]
                return ret
            end
        end
    end

    return nil
end


local function check_ntpserver(ntpsvr)
    local ntps = (ntpsvr and type(ntpsvr)=="table") and ntpsvr or {ntpsvr}
    local ret = {}

    for _, v in ipairs(ntps) do
        ret[#ret+1] = dt.host(v) and v or nil
    end
    return (#ret > 0) and ret or false
end

-- @param cal Calibrate Time -- min
local function ts_set_time(date, time, cal)
    local month, day, year = string.match(date, "(%d+)/(%d+)/(%d+)")
    local hour, min, sec = string.match(time, "(%d+):(%d+):(%d+)")
    if month and day and year and hour and min and sec then
		if cal ~= nil then
			min = min + tonumber(cal)
		end
        luci.sys.call("date -s '%04d-%02d-%02d %02d:%d:%02d'" %{
            year, month, day, hour, min, sec
        })
    else
        return false
    end
    return true
end

local function ts_set_time_v2(date, time)
    local year, month, day = string.match(date, "(%d+)-(%d+)-(%d+)")
    local hour, min, sec = string.match(time, "(%d+):(%d+):(%d+)")
    if month and day and year and hour and min and sec then
        luci.sys.call("date -s '%04d-%02d-%02d %02d:%d:%02d'" %{
            year, month, day, hour, min, sec
        })
    else
        return false
    end
    return true
end

local function ts_parse_hours(hour)
    local h, s = hour:match("(%d+)(%S+)")

    if tonumber(h) > 12 or s ~= "am" and s ~= "pm" then
        return false
    end

    if s == "pm" then
        local h = h + 12
        if h > 24 then h = 0 end
        return tostring(h)
    else
        return h
    end
end

--- Load daylight saving settings
-- @param N/A
-- @return data return settings
function ts_load_dst()
    local dstdata = {}
    local defaults = {'off', 'Jan', '1st', 'Mon', '1am', 'Jan', '1st', 'Mon', '1am'}
    local cfg_data = uci_r:get_all("system", "dst")

    for k, v in ipairs(DST_TBL) do
        dstdata[v] = cfg_data and cfg_data[v] or defaults[k]
        --dbg.printf("load: " .. v .. "," .. dstdata[v])
    end

    local cur_time = os.time()
    dstdata.dst_enable = uci_r:get("system", "dst", "dst_enable")
    if dstdata.dst_enable == "off" then
        dstdata.dst_status = ""
    else
        dstdata.dst_status = (os.date("*t", cur_time)).isdst and "up" or "down"
    end

    dstdata.date = os.date("%m/%d/%Y", cur_time)       -- get date of string format, month/day/year
    dstdata.time = os.date("%X", cur_time)             -- get time of string format, 23:48:10
    return dstdata
end

--- Save daylight saving settings
-- @param content settings from webpage
-- @return data return settings
function ts_save_dst(content)
	-- user set dst rules on web
	uci_r:set("systime", "zoneinfo", "dst_rule", "byuser")
	uci_r:commit("systime")

    uci_r:section("system", "dst", "dst", content)
    uci_r:commit("system")

    -- phase parameters
    luci.sys.call("%s %s" %{TIME_SETTINGS_SHELL, RELOAD})
    return ts_load_dst()
end

--- Load time settings
-- @param N/A
-- @return data return settings
function ts_load_settings()
    local sets = {}
    -- Get 24-hour support
    sets.hour24_support = uci_r:get_profile("time_settings", "hour24_support") or "no"

    -- get current type
    sets.type = uci_r:get("system", "ntp", "type")

    -- get current system time
    local cur_time = os.time()
    sets.date = os.date("%m/%d/%Y", cur_time)       -- get date of string format, month/day/year
    sets.time = os.date("%X", cur_time)             -- get time of string format, 23:48:10

    -- get system ntp server
    local ntp_table = uci_r:get("system", "ntp", "server")
    sets.ntp_svr1 = ntp_table and ntp_table[1] or ""
    sets.ntp_svr2 = ntp_table and ntp_table[2] or ""

	--[[ 
		config format: 
		zoneId		v[3] - Asia/Chongqing
		key			v[1] - 1200
		timezone	v[2]
	]]
	-- get time zone
	local key
	local zoneId = uci_r:get("systime", "zoneinfo", "zoneId")

	local timezone = parse_timezone_new(zoneId, "zoneId")
	if not timezone then
		return false, "timezone is error"
	end
	sets.timezone = timezone

    -- Get 24-hour enable
	local sname = uci_r:get_first("system", "system", nil, nil)
    sets.hour24_enable = uci_r:get("system", sname, "hour24_enable") or "on"

    -- Get week day
    sets.day = sys.exec("date"):match("^%a+") or ""

    -- quicksetup is finished or not
    sets.quicksetup = uci_r:get("system", sname, "quicksetup") or "no"

    -- Get time format
    sets.time_format = uci_r:get("system", sname, "time_format") or "UN_FORMAT"

    return sets
end

--- Save time settings
-- @param content settings from webpage
-- @return data return settings
function ts_save_settings(content)
    local ret

    if content.type then
        uci_r:set("system", "ntp", "type", content.type)
    end

    if content.type == "auto" or not content.type then
		-- uci set timezone new
		local timezone = parse_timezone_new(content.timezone, "timezone")
		if not timezone then
			return false, "timezone is error!"
		end
		local cur_tz = uci_r:get("systime", "zoneinfo", "zoneId")
		local new_tz = 1
		for i=3, #timezone, 1 do
			if cur_tz == timezone[i] then
				new_tz = 0
				break
			end
		end
		if new_tz == 1 then
			uci_r:set("systime", "zoneinfo", "zone_rule", "byuser")
			uci_r:set("systime", "zoneinfo", "zoneId", timezone[3])
			uci_r:set("systime", "zoneinfo", "tz_region", timezone[3])
			uci_r:commit("systime")

			-- set dst rules
			local app_timesetting = require("luci.model.app_timesetting")
			app_timesetting.ts_update_dst(timezone[3], "web")
		end
    end

    -- auto mode, set ntp server
    if content.type == "auto" then
        -- uci set ntp server
        local ntpsvr = check_ntpserver({content.ntp_svr1, content.ntp_svr2})
        if (content.ntp_svr1 == "" and content.ntp_svr2 == "") or ntpsvr then
            uci_r:delete("system", "ntp", "server")   -- FIX uci set list bug, do delete before set
            uci_r:set("system", "ntp", "server", ntpsvr or "")
        end

    elseif content.type == "manual" then
        -- set time (time is not in uci config)
        if content.date and content.time then
            ret = ts_set_time(content.date, content.time)
            if not ret then
                return false, "date or time format is error"
            end
            -- update systime state
            uci_s:revert("systime", "core", "sync")
            uci_s:set("systime", "core", "sync", "1")
            uci_s:save("systime")

			local lp5523_flag = uci_r:get_profile("lp5523", "message")
			if lp5523_flag == "chip-on" then  
				local en = uci_r:get("ledpm", "leds", "enable") or "off"
				if en == "on" then
					luci.sys.call("/etc/sbin/leds_night_mode")
				end
			end
        end

    elseif content.type == "pc" then
        -- set time (time is not in uci config)
        if content.date and content.time then
            ret = ts_set_time(content.date, content.time)
            if not ret then
                return false, "date or time format is error"
            end
            -- update systime state
            uci_s:revert("systime", "core", "sync")
            uci_s:set("systime", "core", "sync", "1")
            uci_s:save("systime")

			local lp5523_flag = uci_r:get_profile("lp5523", "message")
			if lp5523_flag == "chip-on" then  
				local en = uci_r:get("ledpm", "leds", "enable") or "off"
				if en == "on" then
					luci.sys.call("/etc/sbin/leds_night_mode")
				end
			end
        end

    end

    -- save uci config & reload
    uci_r:commit("system") -- save time settings
    luci.sys.call("%s %s" %{TIME_SETTINGS_SHELL, RELOAD})

    -- ntpd & wireless_schedule restart
	wireless_schedule = require "luci.controller.admin.wireless"
	local sche_tbl = {}
	local sche_en = uci_r:get("wireless_schedule","set","enable") or "off"
	-- enable by timesetting
	local sche_onoff_byts = uci_r:get("wireless_schedule", "set", "enable_byts")
	local autoreboot_enable = uci_r:get("autoreboot", "reboot", "enable")
	
    if content.type == "auto" then
        sys.fork_exec("env -i /etc/init.d/sysntpd restart >/dev/null")
		if sche_en == "off" and sche_onoff_byts and sche_onoff_byts == "off" then
			sche_tbl.enable = "on"
			wireless_schedule.wireless_schedule_set_all(sche_tbl)
			uci_r:set("wireless_schedule", "set", "enable_byts", "on")
			uci_r:commit("wireless_schedule")
		end
    elseif content.type == "manual" then
        sys.fork_exec("env -i /etc/init.d/sysntpd stop >/dev/null")
	end

	if content.type == "manual" or content.type == "pc" then
		if sche_en == "on" then
			sche_tbl.enable = "off"
			wireless_schedule.wireless_schedule_set_all(sche_tbl)
			uci_r:set("wireless_schedule", "set", "enable_byts", "off")
			uci_r:commit("wireless_schedule")
		end
		if autoreboot_enable == "on" then
			uci_r:set("autoreboot", "reboot", "enable", "off")
			uci_r:commit("autoreboot")
			luci.sys.call("/etc/init.d/auto-reboot stop")
		end
    end
   
    return ts_load_settings()

end

local function write_status_to_file(str)
    local fd = io.open("/tmp/gmt_status.log", "w")
    if type(str) == "string" then
        fd:write(str .. "\n")
    end

    fd:close()
end

--- Get GMT
-- @param content settings from webpage
-- @return data
function ts_act_gmt(content)
    local ntp1 = content.ntp_svr1
    local ntp2 = content.ntp_svr2
    local ntpsvr = check_ntpserver({ntp1, ntp2})

    if ntpsvr then
        local cur_ntpsvr = uci_r:get_list("system", "ntp", "server")
        if (ntpsvr[1] ~= cur_ntpsvr[1] or ntpsvr[2] ~= cur_ntpsvr[2]) then
            uci_r:delete("system", "ntp", "server")   -- FIX uci set list bug, do delete before set
            uci_r:set_list("system", "ntp", "server", ntpsvr)
        end
    else
        return false, "NTP Server is invalid."
    end

    local server_flag = uci_r:get("system", "ntp", "enable_server")
    -- set ntpd to client mode
    if server_flag ~= "off" then
        uci_r:set("system", "ntp", "enable_server", "off")
    end

    uci_r:commit("system")

    -- restart nptd
    luci.sys.call("env -i /etc/init.d/sysntpd stop >/dev/null")

    -- call ntpd cammand to sync time
    if nixio.fork() == 0 then
        local i = nixio.open("/dev/null", "r")
        local o = nixio.open("/dev/null", "w")
        nixio.dup(i, nixio.stdin)
        nixio.dup(o, nixio.stdout)
        i:close()
        o:close()

        local call_ret = 0

        if ntpsvr[1] ~= nil then
            local cmd = string.format("ntpd -p %s -qNn" % ntpsvr[1])
            dbg.printf(cmd)
            call_ret = luci.sys.call(cmd)
            dbg.printf(tostring(call_ret))
        else
            call_ret = 1
        end

        if call_ret == 0 then
            write_status_to_file(NTP_STATUS_TBL.success)
        elseif ntpsvr[2] ~= nil then
            dbg.printf(ntpsvr[2])
            local cmd = string.format("ntpd -p %s -qNn" % ntpsvr[2])
            dbg.printf(cmd)
            local call_ret = luci.sys.call(cmd)
            dbg.printf(tostring(call_ret))
            if call_ret == 0 then
                write_status_to_file(NTP_STATUS_TBL.success)
            else
                write_status_to_file(NTP_STATUS_TBL.failed)
            end
        else
            write_status_to_file(NTP_STATUS_TBL.failed)
        end
        
    else
        write_status_to_file(NTP_STATUS_TBL.waiting)  
    end

    sys.fork_exec("env -i /etc/init.d/sysntpd start >/dev/null")
    
    return ts_save_settings(content)
end

function ts_refresh_gmt(content)
    local status
    if nixio.fs.access("/tmp/gmt_status.log") then
        for line in io.lines("/tmp/gmt_status.log") do
            status = string.match(line, "(%x+)")
        end
    end
    local data, errorcode = ts_load_settings()
    if data then
        data["status"] = status or NTP_STATUS_TBL.failed
        return data
    else
        return false, errorcode
    end
end

function ts_load_timezone()
    local file = io.open(TIMEZONE_PATH, "r")
    if file then
        local jsondata = file:read("*a")
        file:close()

        local tabledata = json.decode(jsondata or "")
        return tabledata and tabledata.data or false
    else
        return false
    end
end

function ts_load_hour24()
    local sets = {}
    local sname = uci_r:get_first("system", "system", nil, nil)
    sets.hour24_enable = uci_r:get("system", sname, "hour24_enable") or "on"

    sets.hour24_support = uci_r:get_profile("time_settings", "hour24_support") or "no"

    -- get current system time
    local cur_time = os.time()
    sets.date = os.date("%m/%d/%Y", cur_time)
    sets.time = os.date("%X", cur_time)

    return sets
end

local tetherTimeZone = 720

function tmp_set_timezone(form)
    local timezone = form.timezone
    timezone = tostring(tonumber(timezone)+tetherTimeZone)
    for _,value in pairs(TZ_NEW) do
        if value[1] == timezone then
            local sname = uci_r:get_first("system", "system", nil, nil)
            local cur_tz = uci_r:get("system", sname, "timezone")
            if cur_tz ~= value[2] then
                uci_r:set("system", sname, "timezone", value[2])
            end
            uci_r:set("system", sname, "sel_tz", "1")

            uci_r:commit("system")
            luci.sys.call("%s %s" %{TIME_SETTINGS_SHELL, RELOAD})
            return true
        end
    end
    return false
end

function ts_save_hour24(content)
    if content.hour24_enable then
        local sname = uci_r:get_first("system", "system", nil, nil)
        uci_r:set("system", sname, "hour24_enable", content.hour24_enable)

        uci_r:commit("system")
    end

    return ts_load_hour24()
end

function ts_sync_settings(content)
    --sync the time from the Tether

	local appTimezone = nil
	local ret
	local dst_tbl = DFT_DST_TBL
	local country
	local timecal = 0
	
	-- 1. Follow tether timezone
	local zoneId
	local tz_region = uci_r:get("systime", "zoneinfo", "tz_region")
	if tz_region then
		for k, v in ipairs(TZ_NEW) do
			for index=3, #v, 1 do
				if v[index] == tz_region then
					zoneId = tz_region
					uci_r:set("systime", "zoneinfo", "zone_rule", "byapp")
					break
				end
			end
			if zoneId then
				break
			end
		end
	end

	if not zoneId then
		-- init zoneId by tether timezone - eg: key=720
		zoneId = parse_timezone_new(content.timezone, "key")
		uci_r:set("systime", "zoneinfo", "zone_rule", "byapp")
	end

	uci_r:set("systime", "zoneinfo", "zoneId", zoneId)
	uci_r:commit("systime")
	luci.sys.call("%s %s" %{TIME_SETTINGS_SHELL, RELOAD})

    ---sync the current time 
	if content.dst ~= nil and content.dst ~= 0 then
		timecal = content.dst
	end

	if content.date and content.time then
		if timecal ~= 0 then
			ret = ts_set_time(content.date, content.time, timecal)
		else
			ret = ts_set_time(content.date, content.time)
		end
        if not ret then
            return false, "date or time format is error"
        end

        uci_s:revert("systime", "core", "sync")
        uci_s:set("systime", "core", "sync", "1")
        uci_s:save("systime")

		local lp5523_flag = uci_r:get_profile("lp5523", "message")
		if lp5523_flag == "chip-on" then  
			local en = uci_r:get("ledpm", "leds", "enable") or "off"
			if en == "on" then
				luci.sys.call("/etc/sbin/leds_night_mode")
			end
		end
    end

    return ret
end


function ts_sync_get_settings(app_form)
    local result = {}


    dbg.printf("")
    dbg.printf("===> opcode 0x0644: tmp_get_time")


    result.zoneid = uci_r:get("systime", "zoneinfo", "zoneId") or "US/Pacific"
    timezone = parse_zoneid_new(result.zoneid);
    result.timezone = tonumber(timezone) or 240
    dbg.printf("timezone: " .. result.timezone)

    local dst_enable = uci_r:get("system", "dst", "dst_enable") or "off"
    local dst_save = uci_r:get("systime", "zoneinfo", "dst_save") or "1:00"
    local hour, min = string.match(dst_save, "(%d+):(%d+)")
    local dst_save_min = tonumber(hour*60 + min) or 60
    result.dst = (dst_enable == "on") and dst_save_min or 0

    result.time = tostring(os.time())

    dbg.printf("====== print return table ======")
    dbg.dumptable(result)
    dbg.printf("====== print return table ======")
    dbg.printf("===> opcode 0x0644: tmp_get_time end")
    dbg.printf("")
    return result
end

local function invalid_args(errorcode)
    errorcode = errorcode or "invalid args"
    return false, errorcode
end

function tmp_timesetings_get(app_form)
	local ret = {}
	local result = {}

    -- get current system time
    local cur_time = os.time()

    result.time = os.date("%X", cur_time)             -- get time of string format, 23:48:10
    result.date = os.date("%Y-%m-%d", cur_time)       -- get date of string format, month/day/year

	result.isSupport24Hour = (uci_r:get_profile("time_settings", "hour24_support") == "yes") and true or false 

    -- Get 24-hour enable
	local sname = uci_r:get_first("system", "system", nil, nil)
    result.is24Hour = (uci_r:get("system", sname, "hour24_enable") == "on") and true or false

	-- get current type
    result.type = uci_r:get("system", "ntp", "type") or "auto"

	-- get time zone
	local key
	local zoneId = uci_r:get("systime", "zoneinfo", "zoneId")

	local key = parse_timezone_new(zoneId, "zoneId")
	if not key then
		return false, "timezone is error!"
	end

    local timezone = 0
	zoneId = 0
	
    for _,value in pairs(TZ_NEW) do
        if value[2] == tostring(key) then
			timezone = tonumber(value[1]) - tetherTimeZone
			zoneId = tonumber(value[2])
        end
    end
	result.timezone = timezone

	result.zoneId = zoneId

	-- get system ntp server
    local ntp_table = uci_r:get("system", "ntp", "server")
    result.ntpServer1 = ntp_table and ntp_table[1] or ""
    result.ntpServer2 = ntp_table and ntp_table[2] or ""


	-- get dst information

	result.dstEnable = (uci_r:get("system", "dst", "dst_enable") == "on") and true or false
	local dstStart = {}
	local dstEnd = {}

    local cfg_data = uci_r:get_all("system", "dst")


	for k, v in ipairs(WEB_MON_TBL) do
		if v == (cfg_data and cfg_data["start_month"] or "Jan") then
			dstStart.month = TMP_MON_TBL[k]	
		end
	end

	for k, v in ipairs(WEB_DAY_TBL) do
		if v == (cfg_data and cfg_data["start_day"] or "Mon") then
			dstStart.day = TMP_DAY_TBL[k]	
		end
	end
	dstStart.week = cfg_data and cfg_data["start_week"] or "1st"
	dstStart.hour = cfg_data and cfg_data["start_hour"] or "1am"

	for k, v in ipairs(WEB_MON_TBL) do
		if v == (cfg_data and cfg_data["end_month"] or "Jan") then
			dstEnd.month = TMP_MON_TBL[k]	
		end
	end

	for k, v in ipairs(WEB_DAY_TBL) do
		if v == (cfg_data and cfg_data["end_day"] or "Mon") then
			dstEnd.day = TMP_DAY_TBL[k]	
		end
	end
	dstEnd.week = cfg_data and cfg_data["end_week"] or "1st"
	dstEnd.hour = cfg_data and cfg_data["end_hour"] or "1am"

	result.dstStartTime = dstStart
	result.dstEndTime = dstEnd

	ret.result = luci.json.encode(result)
	return ret
end


function tmp_timesetings_set(app_form)
	if not app_form then
		dbg.print("invalid_args")
		return invalid_args()
	end

	local data = luci.json.decode(app_form.data)
	if not data and type(data) ~= "table" then
		dbg.print("invalid data")
		return {errorcode="invalid new params"}
	end
	

	-- set 24Hour type

	
	if data.is24Hour ~= nil then
		local is24Hour = (data.is24Hour == true) and "on" or "off"
		uci_r:set("system", "system", "hour24_enable", is24Hour)
	end

	-- set time get type
	if data.type then
		uci_r:set("system", "ntp", "type", data.type)
	end

	-- set date and time in PC or manual MODE
	if data.type ~= "auto" then
		if data.time and data.date then
            local ret1 = ts_set_time_v2(data.date, data.time)
            if not ret1 then
                return false, "date or time format is error"
            end
            -- update systime state
            uci_s:revert("systime", "core", "sync")
            uci_s:set("systime", "core", "sync", "1")
            uci_s:save("systime")

			local lp5523_flag = uci_r:get_profile("lp5523", "message")
			if lp5523_flag == "chip-on" then  
				local en = uci_r:get("ledpm", "leds", "enable") or "off"
				if en == "on" then
					luci.sys.call("/etc/sbin/leds_night_mode")
				end
			end
		end
	end



	--- only set ntpserver when data.type = auto
	if data.type == "auto" then


		-- uci set timezone new
		local timezone = parse_timezone_new(tostring(data.zoneId), "timezone")
		if not timezone then
			return false, "timezone is error!"
		end
		local cur_tz = uci_r:get("systime", "zoneinfo", "zoneId")
		local new_tz = 1
		for i=3, #timezone, 1 do
			if cur_tz == timezone[i] then
				new_tz = 0
				break
			end
		end
		if new_tz == 1 then
			uci_r:set("systime", "zoneinfo", "zone_rule", "byuser")
			uci_r:set("systime", "zoneinfo", "zoneId", timezone[3])
			uci_r:set("systime", "zoneinfo", "tz_region", timezone[3])
			uci_r:commit("systime")

			-- set dst rules
			local app_timesetting = require("luci.model.app_timesetting")
			app_timesetting.ts_update_dst(timezone[3], "web")
		end

		local ntpServer1 = data.ntpServer1
		local ntpServer2 = data.ntpServer2

		local ntpsvr = check_ntpserver({ntpServer1, ntpServer2})
		if (ntpServer1 == "" and ntpServer2 == "") or ntpsvr then
		    uci_r:delete("system", "ntp", "server")   -- FIX uci set list bug, do delete before set
		    uci_r:set("system", "ntp", "server", ntpsvr or "")
		end
	end

	
	if data.dstEnable ~= nil then
		local dstEnable = (data.dstEnable == true) and "on" or "off"
		uci_r:set("system", "dst", "dst_enable", dstEnable)
		uci_r:set("systime", "zoneinfo", "dst_rule", "byuser")
		uci_r:commit("systime")
	end

	local dstStartTime = data.dstStartTime
	local dstEndTime = data.dstEndTime

	if dstStartTime and type(dstStartTime) == "table" and dstEndTime and type(dstEndTime) == "table" then

		for k, v in ipairs(TMP_MON_TBL) do
			if v == dstStartTime.month then
				uci_r:set("system", "dst", "start_month", WEB_MON_TBL[k])
			end
		end

		for k, v in ipairs(TMP_DAY_TBL) do
			if v == dstStartTime.day then
				uci_r:set("system", "dst", "start_day", WEB_DAY_TBL[k])
			end
		end

		for k, v in ipairs(TMP_MON_TBL) do
			if v == dstEndTime.month then
				uci_r:set("system", "dst", "end_month", WEB_MON_TBL[k])
			end
		end

		for k, v in ipairs(TMP_DAY_TBL) do
			if v == dstEndTime.day then
				uci_r:set("system", "dst", "end_day", WEB_DAY_TBL[k])
			end
		end

		uci_r:set("system", "dst", "start_week", dstStartTime.week)
		uci_r:set("system", "dst", "start_hour", dstStartTime.hour)

		uci_r:set("system", "dst", "end_week", dstEndTime.week)
		uci_r:set("system", "dst", "end_hour", dstEndTime.hour)
	end
	uci_r:commit("system")



	luci.sys.call("%s %s" %{TIME_SETTINGS_SHELL, RELOAD})

    -- ntpd & wireless_schedule restart
	wireless_schedule = require "luci.controller.admin.wireless"
	local sche_tbl = {}
	local sche_en = uci_r:get("wireless_schedule","set","enable") or "off"
	-- enable by timesetting
	local sche_onoff_byts = uci_r:get("wireless_schedule", "set", "enable_byts")

	if data.type then
		if data.type == "auto" then
		    sys.fork_exec("env -i /etc/init.d/sysntpd restart >/dev/null")
			if sche_en == "off" and sche_onoff_byts and sche_onoff_byts == "off" then
				sche_tbl.enable = "on"
				wireless_schedule.wireless_schedule_set_all(sche_tbl)
				uci_r:set("wireless_schedule", "set", "enable_byts", "on")
				uci_r:commit("wireless_schedule")
			end
		elseif data.type == "manual" then
		    sys.fork_exec("env -i /etc/init.d/sysntpd stop >/dev/null")
		end

		if data.type == "manual" or data.type == "pc" then
			if sche_en == "on" then
				sche_tbl.enable = "off"
				wireless_schedule.wireless_schedule_set_all(sche_tbl)
				uci_r:set("wireless_schedule", "set", "enable_byts", "off")
				uci_r:commit("wireless_schedule")
			end
		end
	end

	local ret = {}
	local result = {}
	ret.result = luci.json.encode(result)
	return ret

	--luci.sys.call("%s %s" %{TIME_SETTINGS_SHELL, RELOAD})
end

function tmp_get_timezone(app_form)
	local ret = {}
	local result = {}

	local timezoneList = {}


	for k, v in ipairs(TZ_NEW) do
		local section = {}
		section.timezone = tonumber(v[1]) - tetherTimeZone
		section.zoneId = tonumber(v[2])
		timezoneList[#timezoneList + 1] = section
	end
	result.timezoneList = timezoneList
	ret.result = luci.json.encode(result)
	return ret

end

-----------------------------------------------------------------------------------
-----------------------------------------------------------------------------------

local dispatch_tbl = {
    dst = {
        ["read"]  = { cb  = ts_load_dst },
        ["write"] = { cb  = ts_save_dst }        
    },

    settings = {
        ["read"]      = { cb  = ts_load_settings },
        ["write"]     = { cb  = ts_save_settings },
        ["gmt"]       = { cb  = ts_act_gmt }, 
        ["refresh"]   = { cb  = ts_refresh_gmt }
    },

    timezone = {
       ["read"] = { cb = ts_load_timezone }
    },

    tmp_set = {
        ["set"] = { cb = tmp_set_timezone }
    },

    app = {
        ["sync"]      = { cb = ts_sync_settings},
        ["sync_get"]      = { cb = ts_sync_get_settings}
    },

	tmp_timesettings = {
        ["read"]      = { cb = tmp_timesetings_get},
        ["write"]     = { cb = tmp_timesetings_set}
    },
	tmp_timezone = {
		["get"]   	= { cb = tmp_get_timezone }
	},
    hour24 = {
        ["read"]      = { cb  = ts_load_hour24 },
        ["write"]     = { cb  = ts_save_hour24 }
    }
}




function timesetting_dispatch(app_form)
    return ctl.dispatch(dispatch_tbl, app_form)
end

function dispatch(http_form)
    return ctl.dispatch(dispatch_tbl, http_form)
end

function _index()
    return ctl._index(dispatch)
end

function index()
    entry({"admin", "time"}, call("_index")).leaf = true
end
