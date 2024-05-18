--[[
Copyright(c) 2013 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  avira.lua
Details :  new for avira function.
Author  :  Feng Jiashuang <fengjiashuang@tp-link.com.cn>
Version :  1.0.0
Date    :  15 Sep, 2019
]]--

module ("luci.model.avira", package.seeall)

--	NOTE: require modules
local dbg	= require "luci.tools.debug"
local cli	= require "luci.model.client_mgmt"
local tmcli	= require "luci.model.tm_clientmgmt"
local io	= require "io"
local json	= require "luci.json"
local mesh	= require "luci.model.one_mesh"
local nat_m	= require "luci.model.nat"
local Nat	= nat_m.NAT_INST()
local nixio	= require "nixio"
local sys	= require "luci.sys"
local uci	= require "luci.model.uci"
local uci_r	= uci.cursor()
local util	= require "luci.util"
local wlan	= require "luci.model.wireless"


--	NOTE: avira args

--	TODO: 后续改为配置项
local MAX_OWNER_SUPPORT = 16

local AVIRA_CONFIG_NAME	= "avira"
local PC_CONFIG_NAME	= "parental_control_v2"
local QOS_CONFIG_NAME	= "qos_v2"

local AVIRA_RELOAD_CMD	= "/etc/init.d/avira reload"
local PC_RELOAD_CMD		= "/etc/init.d/parental_control reload"
local QOS_RELOAD_CMD	= "/etc/init.d/qos restart &"
local FT_RELOAD_CMD		= "/etc/init.d/family_time reload"

local PROC_PCTL			= "/proc/pctl/"
local PROC_BLOCK		= "/proc/block/block_insight"

local WLAN_OPTIMIZE_SCAN_IN_PROGRESS	= "/tmp/wlan_optimize_scan_in_progress"
local WLAN_OPTIMIZE_SET_IN_PROGRESS		= "/tmp/wlan_optimize_set_in_progress"
local WLAN_OPTIMIZE_ITEM				= "/tmp/wlan_optimize_item"
local WLAN_OPTIMIZE_SCAN_RESULT_2G		= "/tmp/wlan_optimize_result_2g"
local WLAN_OPTIMIZE_SCAN_RESULT_5G		= "/tmp/wlan_optimize_result_5g"
local WLAN_OPTIMIZE_SCAN_RESULT_5G_2	= "/tmp/wlan_optimize_result_5g_2"
local WLAN_OPTIMIZE_SCAN_RESULT_6G		= "/tmp/wlan_optimize_result_6g"
local WLAN_SCAN_STARTED_FILE					= "/tmp/wlan_scan_started"

local _owner_list
local _id_used

--	NOTE: avira local functions
local function debug(str)
	dbg.printf("[Avira]" .. str)
end

local function debug_tbl(tbl)
	dbg.dumptable(tbl)
end

local function TrimStr(str)
	local tmpstr = str
	tmpstr = string.gsub(tmpstr, "-", "")
	tmpstr = string.gsub(tmpstr, ":", "")
	str = string.match(tmpstr, "%w+")
	str = str:upper()
	return str
end

local function get_max_owner()
	-- TODO:
	local max_num = uci_r:get_profile(PC_CONFIG_NAME, "max_owner") or "16"
	return tonumber(max_num)
end

local function get_max_owner_id()
	-- TODO:
	local max_num = uci_r:get_profile(PC_CONFIG_NAME, "max_owner") or "16"
	return tonumber(max_num)
end

local function get_max_devices()
	local max_num = uci_r:get_profile(PC_CONFIG_NAME, "max_dev") or "32"
	return tonumber(max_num)
end

local function get_max_prio_devices()
	-- TODO:
	local max_num = uci_r:get_profile(PC_CONFIG_NAME, "max_prio_devices") or "64"
	return tonumber(max_num)
end

local function get_max_sites()
	local max_num = uci_r:get_profile(PC_CONFIG_NAME, "max_sites") or "32"
	return tonumber(max_num)
end

local function get_max_freesites()
	local max_num = uci_r:get_profile(PC_CONFIG_NAME, "max_freesites") or "32"
	return tonumber(max_num)
end

local function support_allowed()
	local support = uci_r:get_profile(PC_CONFIG_NAME, "allow_adjust_time") or "no"
	return support
end

local function support_web_search()
	local support = uci_r:get_profile(PC_CONFIG_NAME, "allow_web_search") or "no"
	return support
end

function get_remain_owner_num()
	local state = uci_r:get(AVIRA_CONFIG_NAME, "info", "state") or "free"
	local owner_list = {}
		uci_r:foreach(PC_CONFIG_NAME, "owner",
			function(section)
				local owner = section
			if state == "paid" or (state == "free" and (section.available == "true" or section.available == nil)) then
				owner_list[#owner_list + 1] = owner
			end
			end
		)

	local owner_num = #owner_list
	local max_num = get_max_owner()

	return (max_num - owner_num)
end

local function get_max_client()    
	local max_num = uci_r:get_profile("client_mgmt", "max_dev") or "64"
	return max_num
end

local function comps(a, b)
	if a.access_time == nil then
		return false
	elseif b.access_time == nil then
		return true
	end

	return tonumber(a.access_time) < tonumber(b.access_time)
end

local function daytonum(day)
	if day == "Sun" then
		return 64
	elseif day == "Sat" then
		return 1
	elseif day == "Fri" then
		return 2
	elseif day == "Thu" then
		return 4
	elseif day == "Wed" then
		return 8
	elseif day == "Tue" then
		return 16
	elseif day == "Mon" then
		return 32
	end
end

local function numtoday(num)
	local day
	if num == 7 then
		day = "Sun"
	elseif num == 1 then
		day = "Sat"
	elseif num == 2 then
		day = "Fri"
	elseif num == 3 then
		day = "Thu"
	elseif num == 4 then
		day = "Wed"
	elseif num == 5 then
		day = "Tue"
	elseif num == 6 then
		day = "Mon"
	end

	return day
end

local function numtodayarray(num)
	local remain = 0
	local count = 1
	local days = {}
	while num ~= 0 do
		remain = num%2
		if remain == 1 then
			days[#days+1] = numtoday(count)
		end
		num = math.floor(num/2)
		count = count + 1
	end
	return days
end

function cattonum(category)
	if category == "web_search" then
		num = 16384
	elseif category == "adult_content" then
		num = 1024
	elseif category == "sex_education" then
		num = 512
	elseif category == "gambling" then
		num = 64
	elseif category == "online_communications" then
		num = 32
	elseif category == "social_network" then
		num = 16
	elseif category == "pay_to_surf" then
		num = 8
	elseif category == "media" then
		num = 4
	elseif category == "download" then
		num = 2
	elseif category == "games" then
		num = 1
	end

	return num
end

function numtocat(num)
	if num == 15 then
		category = "web_search"
	elseif num == 11 then
		category = "adult_content"
	elseif num == 10 then
		category = "sex_education"
	elseif num == 7 then
		category = "gambling"
	elseif num == 6 then
		category = "online_communications"
	elseif num == 5 then
		category = "social_network"
	elseif num == 4 then
		category = "pay_to_surf"
	elseif num == 3 then
		category = "media"
	elseif num == 2 then
		category = "download"
	elseif num == 1 then
		category = "games"
	end

	return category
end

local function numtocatarray(num)
	local remain = 0
	local count = 1
	local cats = {}
	while num ~= 0 do
		remain = num%2
		if remain == 1 then
			cats[#cats+1] = numtocat(count)
		end
		num = math.floor(num/2)
		count = count + 1
	end
	return cats
end

-- 拆分成获取当天/昨天限制时长，奖励时长，惩罚时长，三个local函数
local function getTimeLimits(ownerId,isToday)
	local timeLimits = 0
	local mode = uci_r:get(PC_CONFIG_NAME, ownerId, "timeLimits_mode") or "everyday"
	local enable = uci_r:get(PC_CONFIG_NAME, ownerId, "timeLimits_enable") or "0"

	if enable == "0" then
		timeLimits = 1440
	else
		local dayName
		if isToday == "1" then
			dayName = os.date("%a")
		else
			dayName = os.date("%a", os.time()-86400)
		end
		if mode == "everyday" then
			timeLimits = uci_r:get(PC_CONFIG_NAME, ownerId, "timeLimits_eve_time") or 1440
		elseif mode == "workingDay" then
			local is_workday = false
			local workdays = uci_r:get(PC_CONFIG_NAME, ownerId, "workdays") or 62
			local days = numtodayarray(tonumber(workdays))
			for k, v in ipairs(days) do
				if dayName == v then
					is_workday = true
					break
				end
			end
			if is_workday then
				local workday_limit = uci_r:get(PC_CONFIG_NAME, ownerId, "workday_limit") or "0"
				if workday_limit == "0" then
					timeLimits = 1440
				else
					timeLimits = uci_r:get(PC_CONFIG_NAME, ownerId, "workday_time") or 1440
				end
			else
				local weekend_limit = uci_r:get(PC_CONFIG_NAME, ownerId, "weekend_limit") or "0"
				if weekend_limit == "0" then
					timeLimits = 1440
				else
					timeLimits = uci_r:get(PC_CONFIG_NAME, ownerId, "weekend_time") or 1440
				end
			end
		elseif mode == "customize" then
			local enableDailyTimeLimit = uci_r:get(PC_CONFIG_NAME, ownerId, "timeLimits_cus_enable") or "0"
			local days = numtodayarray(tonumber(enableDailyTimeLimit))
			local enableTimeLimits = false
			for k, v in ipairs(days) do
				if dayName == v then
					enableTimeLimits = true
					break
				end
			end
			if enableTimeLimits == true then
				dayName = string.lower(dayName) ..  "_time"
				timeLimits = uci_r:get(PC_CONFIG_NAME, ownerId, dayName) or 1440
			else
				timeLimits = 1440
			end
		end
	end

	return tonumber(timeLimits)
end

local function getBonusTime(ownerId, isToday)
	local bonusTime
	if isToday == "1" then
		bonusTime = uci_r:get(PC_CONFIG_NAME, ownerId, "today_bonus_time") or 0
	else
		bonusTime = uci_r:get(PC_CONFIG_NAME, ownerId, "yesterday_bonus_time") or 0
	end
	return tonumber(bonusTime)
end

local function getRewardTime(ownerId, isToday)
	local rewardsTime
	if isToday == "1" then
		rewardsTime = uci_r:get(PC_CONFIG_NAME, ownerId, "today_reward_time") or 0
	else
		rewardsTime = uci_r:get(PC_CONFIG_NAME, ownerId, "yesterday_reward_time") or 0
	end
	return tonumber(rewardsTime)
end

local function store_client_info(client)
	local max_num = get_max_client()
	local tmp = {}
	local clist_u = {}

	-- 1. check client num
	uci_r:foreach("client_mgmt", "client",
		function(section)               
			local cli = section
			local real_mac = uci_r:get("client_mgmt", section[".name"], "real_mac") or uci_r:get("client_mgmt", section[".name"], "mac")
			if nil == tmp[real_mac] then
				tmp[real_mac] = {}
				clist_u[#clist_u + 1] = cli
			end
		end
	)

	-- 2. if exceeds max_num, delete one client's all rules [OneMesh]
	if (#clist_u) >= tonumber(max_num) then
		table.sort(clist_u, comps)
		local cli = clist_u[1]
		local secArray = {}
		secArray[#secArray + 1] = cli[".name"]
		local real_mac = cli.real_mac or cli.mac
		uci_r:foreach("client_mgmt", "client",
			function(section)
				local real_mac1 = uci_r:get("client_mgmt", section[".name"], "real_mac") or uci_r:get("client_mgmt", section[".name"], "mac")
				if real_mac == real_mac1 then
					secArray[#secArray + 1] = section[".name"]
				end
			end
		)
		for _, secName in pairs(secArray) do
			uci_r:delete("client_mgmt", secName)
		end       
	end

	-- 3. set, mac is proxy_mac
	-- add original mac
	local client_mac = TrimStr(client.mac)
	uci_r:section("client_mgmt", "client", client_mac, client)

	return true
end

local function set_client_info(client)
	local found = false
	uci_r:foreach("client_mgmt", "client",
		function(section)
			local proxyMac = section.mac
			local real_mac = section.real_mac or section.mac
			if client.mac == real_mac then
				found = true
				uci_r:section("client_mgmt", "client", section[".name"], client)
				uci_r:set("client_mgmt", section[".name"], "mac", proxyMac)
			end
		end
	)

	if not found then
		store_client_info(client)
	end

	local ret = uci_r:commit("client_mgmt")
	return ret
end

function batch_set_client_info(client_list)
	local found = false
	for k,client in ipairs(client_list) do
		found = false
		uci_r:foreach("client_mgmt", "client",
			function(section)
				if not found and client.mac == section.mac then
					found = true
					uci_r:section("client_mgmt", "client", section[".name"], client)    
				end
			end
		)

		if not found then
			store_client_info(client, false)
		end
	end

	return uci_r:commit("client_mgmt")
end

-- TODO: 修改 set_client_info
local function add_clients(owner)
	local mac_list = owner.mac_list
	local cur_time = os.time()
	for i, v in ipairs(mac_list) do
		local client = {}
		local mac = v

		-- add origin MAC rule
		client.real_mac = mac:gsub(":", "-"):upper()
		client.mac = mac:gsub(":", "-"):upper()
		client.owner_id = owner.owner_id        
		client.access_time = cur_time

		local res, error_code = set_client_info(client)
		if not res then
			--dbg("add real_mac error")
			return res, error_code
		end

		-- delete by CCy, BCM Branch will no support 3-addr onemesh devices,delete virtual mac since there is no mesh.api_get_proxy_mac_list()
		-- add virtual MAC rule
		-- local aheadVirMacs = mesh.api_get_proxy_mac_list()
		-- for aheadVirMac, _ in pairs(aheadVirMacs) do
			-- local config_proxy_mac = aheadVirMac .. string.sub(client.real_mac, 9)
			-- client.mac = (config_proxy_mac):gsub(":", "-"):upper()
			-- if client.real_mac ~= client.mac then
				-- local res, error_code = set_client_info(client)
				-- if not res then
					-- --dbg("add proxy_mac error")
					-- return res, error_code
				-- end
			-- end
		-- end
	end

	return true
end

local function checkPwdStrength(password)
	local len = string.len(password)
	local pwd = {}
	local num_upper = 0
	local num_lower = 0
	local has_char = 0
	local num_digital = 0
	local num_special = 0
	local score = 0

	for i = 1, len do
		pwd[i]=string.sub(password, i, i)
		if pwd[i] >= "a" and pwd[i] <= "z" then
			num_lower = num_lower + 1
		elseif pwd[i] >= "A" and pwd[i] <= "Z" then
			num_upper = num_upper + 1
		elseif pwd[i] >= "0" and pwd[i] <= "9" then
			num_digital = num_digital + 1
		else
			num_special = num_special + 1
		end
	end

	if num_lower > 0 and num_upper > 0 then
		score = score + 20
		has_char = 1
	elseif num_lower > 0 or num_upper > 0 then
		score = score + 10
		has_char = -1
	end

	if num_digital > 1 then
		score = score + 20
	elseif num_digital == 1 then
		score = score + 10
	end

	-- only special, return score directly
	-- password is weak 
	if num_digital == 0 and num_upper == 0 and num_lower == 0 and num_special ~= 0 then 
		debug("score: " .. score)
		score = 10
		return tostring(score)
	end

	if num_special > 1 then
		score = score + 25
	elseif num_special == 1 then
		score = score + 10
	end

	if has_char*num_digital*num_special > 0 then
		score = score + 5
	elseif has_char*num_digital*num_special < 0 then
		score = score + 3
	elseif has_char*num_digital ~= 0 or has_char*num_special ~= 0 or num_digital*num_special ~= 0 then
		score = score + 2
	end

	debug("score: " .. score)
	return tostring(score)
end


-- 7 options marked by "sec_num" number, "sec_num" match the number of "encryption" from UI
local wireless_security_opt_table = {
    {sec = "None",                        sec_num = "0", encryption = "none",    psk_cipher = "auto", psk_version = "auto"},
    {sec = "WPA2-PSK[AES]",               sec_num = "1", encryption = "psk",     psk_cipher = "aes",  psk_version = "rsn"},
    {sec = "WPA2-PSK[AES]+WPA-PSK[TKIP]", sec_num = "2", encryption = "psk",     psk_cipher = "auto", psk_version = "auto"},
    {sec = "WPA3-Personal",               sec_num = "3", encryption = "psk_sae", psk_cipher = "aes",  psk_version = "sae_only"},
    {sec = "WPA3-Personal+WPA2-PSK[AES]", sec_num = "4", encryption = "psk_sae", psk_cipher = "aes",  psk_version = "sae_transition"},
    {sec = "WPA2-Enterprise",             sec_num = "5", encryption = "wpa",     wpa_cipher = "aes",  wpa_version = "rsn"},
    {sec = "WPA/WPA2-Enterprise",         sec_num = "6", encryption = "wpa",     wpa_cipher = "auto", wpa_version = "auto"},
    {sec = "Enhanced Open",               sec_num = "7", encryption = "owe",     psk_cipher = "aes",  psk_version = "owe_only"}
}

-- get the number of encryption by match the args in profiles.
local function encryption_security_opt_trans_read(forms, prefix)
	if not forms or not prefix then
		return "0"
	end
	local encryption
    for i in pairs(wireless_security_opt_table) do
        if forms[prefix.."encryption"] == "wpa" then
            if forms[prefix.."wpa_version"] == wireless_security_opt_table[i].wpa_version and
               forms[prefix.."wpa_cipher"] == wireless_security_opt_table[i].wpa_cipher   then
                encryption = wireless_security_opt_table[i].sec_num or ""
            end
        elseif forms[prefix.."encryption"] == "none"  then
            if forms[prefix.."encryption"] == wireless_security_opt_table[i].encryption then
                encryption = wireless_security_opt_table[i].sec_num or ""
            end
        else
            if forms[prefix.."encryption"] == wireless_security_opt_table[i].encryption   and
               forms[prefix.."psk_cipher"] == wireless_security_opt_table[i].psk_cipher   and
               forms[prefix.."psk_version"] == wireless_security_opt_table[i].psk_version then
                encryption = wireless_security_opt_table[i].sec_num or ""
            end
        end
    end

    return encryption
end

local function checkencryption(data, prefix)
	if not data or not prefix then
		return "unsafe"
	end
	local encryption_num = encryption_security_opt_trans_read(data, prefix)
	if tonumber(encryption_num) == 0 then
		ret = "unsafe"
	elseif tonumber(encryption_num) == 2 then
		ret = "weak"
	else
		ret = "safe"
	end
	return ret
end

local function url_escape(w)
	pattern = "[%`%#%$%;%s]"
	s = string.gsub(w, pattern, function(c)
		local t = string.format("%%%02X", string.byte(c))
		return t
	end)
	return s
end

local function url_escape(w)
	pattern = "[%`%#%$%;%s]"
	s = string.gsub(w, pattern, function(c)
		local t = string.format("%%%02X", string.byte(c))
		return t
	end)
	return s
end

local function http_post(url, reqbody, header)
	local args = {}
	local ret

	if url then
		args.request_url = url_escape(url)
		debug("https get url:", url)
	else
		return -1000
	end

	if reqbody then
		args.request_data = json.encode(reqbody)
		debug("https reqbody:", json.encode(reqbody))
	else
		return -1000
	end

	if header then
		args.request_header = json.encode(header)
		debug("https header:", json.encode(header))
	else
		args.request_header = json.encode({})
	end
	
	ret = _ubus:call(UBUS_OBJECT, "cloud_https_post", args)

	if ret == nil then
		return -1000
	end

	local response = nil
	debug("http session ret:", ret.re)
	if ret.re == 0 then
		debug("http status code: ", ret.status_code)
		if ret.response then
			debug("http response data: ", ret.response)
			response = json.decode(ret.response) or {}
		end
	end
	
	return ret.re, ret.status_code, response
end

local function getOnlineTime(owner_id)
	local spend_online = 0
	local last_online = 0
	local fp = io.open(PROC_PCTL..owner_id,"r")
	if fp then
		local head = fp:read("*line")
		h_minutes, h_timestamp, num, yh_minutes = string.match(head, "(%d+) (%d+) (%d+) (%d+)")
		spend_online = h_minutes
		last_online = yh_minutes
		fp:close()
	else
		debug("Open file error.")
	end

	return spend_online, last_online
end

local function getAllowTime(ownerId, isToday)
	local todayOnline, _ = getOnlineTime(ownerId)
	todayOnline = tonumber(todayOnline)
	local timeLimit = getTimeLimits(ownerId, isToday)
	local bonusTime = getBonusTime(ownerId, isToday)
	local rewardsTime = getRewardTime(ownerId, isToday)
	local allowTime
	allowTime = timeLimit + bonusTime - rewardsTime
	-- adjust reward time

	if allowTime < todayOnline then
		rewardsTime = timeLimit + bonusTime - todayOnline
		if rewardsTime < 0 then
			rewardsTime = 0
		end
		uci_r:set(PC_CONFIG_NAME, ownerId, "today_reward_time", rewardsTime)
		uci_r:commit(PC_CONFIG_NAME)
		allowTime = todayOnline
	end
	return tonumber(allowTime)
end

local function generate_uniqueId()
	-- Generate uniqueId for each profile
	local str = string.sub(tostring(os.time()), -3)
	local seed = 0
	local bytestr
	local number
	local profile_id
	local file = io.open("/dev/urandom", "rb")
	if file then
		bytestr = file:read(4)
		file:close()
	end

	for i = 1, 4 do
		seed = seed * 256 + string.byte(bytestr, i)
	end

	math.randomseed(seed%10000000)
	number = math.random(100000, 999999)
	profile_id = number .. str

	return profile_id
end

local function get_wireless_lock()
	local get_lock_cmd = "pidof lock /var/run/wifi.lock"
	local get_lock_fp = io.popen(get_lock_cmd)
	local pid = ""

	if get_lock_fp then
		local i = 0
		for line in get_lock_fp:lines() do 
			i = i + 1
			if i == 1 then 
				pid = line
			end
		end
		get_lock_fp:close()
	end

	if pid == "" then
		return "unlocked"
	else
		return "locked"
	end
end

local function is_wlan_scan_started()
	local i
	local text 
	local wlan_scan_file = io.open(WLAN_SCAN_STARTED_FILE, "r") 
	
	if not wlan_scan_file then
		return false
	end
	wlan_scan_text = wlan_scan_file:read("*all")
	wlan_scan_file:close()
	
	i, _, text = string.find(wlan_scan_text, "wlan_scan_started:%s*(%d+)")
	if i then
		return true
	else
		return false
	end
end

function check_mac_is_tp(mac_params)
	local ret = false
	local name_tp = "TPLINK"
	local mac = mac_params:gsub("-", ""):upper()
	mac = string.gsub(mac, ":", "")

	local name_mf = cli.get_name_by_mac_oui(mac)

	if name_mf == false then
		return ret
	end
	name_mf = name_mf:gsub("-", ""):upper()
	if string.match(name_mf, name_tp) then
		ret = true
	else
		ret = false
	end

	return ret
end

--	NOTE: avira functions
AVIRA_GATHER = util.class()
function AVIRA_GATHER:__init__()
	self.config = AVIRA_CONFIG_NAME
	self.uci = uci.cursor()
	_owner_list = {}
	_id_used = {}
	uci_r:foreach(PC_CONFIG_NAME, "owner",
		function(section)
			local owner = section
			_owner_list[#_owner_list + 1] = owner
			_id_used[tonumber(section.owner_id)] = true
		end
	)
end

function AVIRA_GATHER:commit(config, cmd)
	local stat = uci_r:commit(config)
	if not stat then        
		return false, config .. " commit failed."
	end

	if cmd ~= nil then
		sys.fork_exec(cmd)
	end

	return stat
end

--	TODO
--	NOTE: avira family care functions
function AVIRA_GATHER:tmp_get_ownerinlist(app_form)
	local data = json.decode(app_form.data)
	local start_index = data.startIndex
	local amount = data.amount

	local total = 0
	local res = {}
	local result = {}
	local owner_list = {}

	debug("")
	debug("===> opcode 0x0510: tmp_get_ownerinlist")
	uci_r:foreach(PC_CONFIG_NAME, "owner",
		function(section)
			local owner = {}
			if total >= start_index and total < start_index + amount then
				owner.ownerId = tonumber(section.owner_id)
				local available = section.available or "true"
				if available == "true" then
					owner.available = true
				else
					owner.available = false
				end
				owner.name = nixio.bin.b64encode(section.name) or "UNKNOWN"
				owner.internetBlocked = tonumber(section.blocked) == 1 and true or false
				onlineTime, lastTime = getOnlineTime(owner.ownerId)
				owner.todayOnlineTime = tonumber(onlineTime) or 0
				local todayTimeLimit = getAllowTime(owner.ownerId, "1")
				owner.todayTotalAllowTime = math.min(tonumber(todayTimeLimit), 1440)
				owner.dailyOnlineTimeDifference = owner.todayOnlineTime - tonumber(lastTime)
				local mac_list = tmcli.get_devices_mac(tostring(section.owner_id))
				owner.allDeviceMac = mac_list
				local online_devices = tmcli.get_devices_name(tostring(section.owner_id))
				owner.onlineDeviceCount = #online_devices
				if not section.profile_id then
					owner.uniqueProfileId = tonumber(generate_uniqueId())
					uci_r:set(PC_CONFIG_NAME, section.owner_id, "profile_id", owner.uniqueProfileId)
					self:commit(PC_CONFIG_NAME, PC_RELOAD_CMD)
				else
					owner.uniqueProfileId = tonumber(section.profile_id)
				end
				if not section.create_time then
					owner.createTime = 0
					uci_r:set(PC_CONFIG_NAME, section.owner_id, "create_time", 0)
					self:commit(PC_CONFIG_NAME)
				else
					owner.createTime = tonumber(section.create_time)
				end
				owner_list[#owner_list + 1] = owner
			end
			total = total + 1
		end
	)

	result.availableOwnerMax = get_max_owner()
	result.totalOwnerMax = MAX_OWNER_SUPPORT
	result.clientPerOwnerMax = get_max_devices()
	result.filterWebsiteMax = get_max_sites()
	result.filterFreeWebsiteMax = get_max_freesites()
	result.isAdjustAllowedTimeSupported = support_allowed() == "yes" and true or false
	result.isFilterCategoryWebSearchSupported = support_web_search() == "yes" and true or false
	result.ownerList = owner_list
	result.sum = total
	result.amount = #owner_list
	result.startIndex = start_index
	res.result = json.encode(result)
	debug("====== print return table ======")
	debug_tbl(result)
	debug("====== print return table ======")
	debug("===> opcode 0x0510: tmp_get_ownerinlist end")
	debug("")
	return res
end

function AVIRA_GATHER:tmp_add_ownerinlist(app_form)
	local data = json.decode(app_form.data)
	local res = {}
	local result = {}

	debug("")
	debug("===> opcode 0x0511: tmp_add_ownerinlist")
	debug_tbl(data)
	-- 1. check remain owner num
	local remain_num = get_remain_owner_num()
	if 1 > remain_num then
		debug("owner num exceeds max num limit")
		return false, "owner num exceeds max num limit"
	end

	-- 2. check used id
	local tmp = {}
	if not _id_used then
		local _owner_list = {}
		local _id_used = {}
		uci_r:foreach(PC_CONFIG_NAME, "owner",
			function(section)
				local owner = section
				_owner_list[#_owner_list + 1] = owner
				_id_used[tonumber(section.owner_id)] = true
			end
		)
	end

	-- 3. add owner
	local max_owner_id = get_max_owner_id()
	local owner = {}

	-- get id
	local id = 0
	while not owner.owner_id and id < max_owner_id do
		if not _id_used[id] then
			owner.owner_id = id
			_id_used[id] = true
			break
		end
		id = id + 1
	end
	debug_tbl(_id_used)

	-- available
	owner.available = "true"

	-- bonus/reward time
	owner.today_bonus_time = 0
	owner.today_reward_time = 0

	-- block
	owner.name = nixio.bin.b64decode(data.name)
	if data.internetBlocked == true then
		owner.blocked = "1"
	else
		owner.blocked = "0"
	end

	-- NOTE: What is news.
	-- Remove timeLimitsMode.
	-- Add bedtime，timeLimits，offTime.
	-- Add everyday, workingDay, customize.

	-- 1. workingDays
	-- workdays: ["Mon", "Tue", "Wed", "Thu", "Fri"] ===> [ 0,1,1,1,1,1,0 ]
	-- Sun: 2^6 = 64, Sat: 32, Fri: 16, Thu: 8, Web: 4, Tue: 2, Mon: 1
	if data.workingDays ~= nil then
		local total = 0
		for k, v in ipairs(data.workingDays) do
			total = total + daytonum(v)
		end
		owner.workdays = total
	end

	-- 2. bedtime
	if data.bedtime ~= nil then
		-- enable: true or false
		if data.bedtime.enable == true then
			owner.bedtime_enable = "1"
		else
			owner.bedtime_enable = "0"
		end
		-- mode: "everyday", "workingDay", "customize"
		if data.bedtime.mode then
			owner.bedtime_mode = data.bedtime.mode
		end
		-- everyday
		if data.bedtime.everyday then
			owner.bedtime_eve_beg = data.bedtime.everyday.bedtimeBegin
			owner.bedtime_eve_end = data.bedtime.everyday.bedtimeEnd
		end
		-- workingDay
		-- _bedtime: workday_enable, weekend enable
		-- _begin  : workday_begin_time, weekend_begin_time
		-- _end    : workday_end_time, weekend_end_time
		if data.bedtime.workingDay then
			if data.bedtime.workingDay[1].enable == true then
				owner.workday_bedtime = "1"
			else
				owner.workday_bedtime = "0"
			end
			if data.bedtime.workingDay[2].enable == true then
				owner.weekend_bedtime = "1"
			else
				owner.weekend_bedtime = "0"
			end
			owner.workday_begin = data.bedtime.workingDay[1].bedtimeBegin
			owner.workday_end = data.bedtime.workingDay[1].bedtimeEnd
			owner.weekend_begin = data.bedtime.workingDay[2].bedtimeBegin
			owner.weekend_end = data.bedtime.workingDay[2].bedtimeEnd
		end
		-- customize
		-- cus_enable: customize_enable, bit format: 01111111 means sunday to monday
		if data.bedtime.customize then
			owner.bedtime_cus_enable = 0
			for i = 1, 7 do
				if data.bedtime.customize[i].enable == true then
					owner.bedtime_cus_enable = owner.bedtime_cus_enable + math.pow(2, 7-i)
				end
			end
			owner.bedtime_sun_beg = data.bedtime.customize[1].bedtimeBegin
			owner.bedtime_sun_end = data.bedtime.customize[1].bedtimeEnd
			owner.bedtime_mon_beg = data.bedtime.customize[2].bedtimeBegin
			owner.bedtime_mon_end = data.bedtime.customize[2].bedtimeEnd
			owner.bedtime_tue_beg = data.bedtime.customize[3].bedtimeBegin
			owner.bedtime_tue_end = data.bedtime.customize[3].bedtimeEnd
			owner.bedtime_wed_beg = data.bedtime.customize[4].bedtimeBegin
			owner.bedtime_wed_end = data.bedtime.customize[4].bedtimeEnd
			owner.bedtime_thu_beg = data.bedtime.customize[5].bedtimeBegin
			owner.bedtime_thu_end = data.bedtime.customize[5].bedtimeEnd
			owner.bedtime_fri_beg = data.bedtime.customize[6].bedtimeBegin
			owner.bedtime_fri_end = data.bedtime.customize[6].bedtimeEnd
			owner.bedtime_sat_beg = data.bedtime.customize[7].bedtimeBegin
			owner.bedtime_sat_end = data.bedtime.customize[7].bedtimeEnd
		end
	end

	-- 3. timeLimits - almost the same to bedtime
	if data.timeLimits ~= nil then
		-- enable: true or false
		if data.timeLimits.enable == true then
			owner.timeLimits_enable = "1"
		else
			owner.timeLimits_enable = "0"
		end
		-- mode: "everyday", "workingDay", "customize"
		if data.timeLimits.mode then
			owner.timeLimits_mode = data.timeLimits.mode
		end
		-- everyday
		if data.timeLimits.everyday then
			owner.timeLimits_eve_time = data.timeLimits.everyday
		end
		-- workingDay
		if data.timeLimits.workingDay then
			if data.timeLimits.workingDay[1].enable == true then
				owner.workday_limit = "1"
			else
				owner.workday_limit = "0"
			end
			if data.timeLimits.workingDay[2].enable == true then
				owner.weekend_limit = "1"
			else
				owner.weekend_limit = "0"
			end
			owner.workday_time = data.timeLimits.workingDay[1].timeLimits
			owner.weekend_time = data.timeLimits.workingDay[2].timeLimits
		end
		-- customize
		if data.timeLimits.customize then
			owner.timeLimits_cus_enable = 0
			for i = 1, 7 do
				if data.timeLimits.customize[i].enable == true then
					owner.timeLimits_cus_enable = owner.timeLimits_cus_enable + math.pow(2, 7-i)
				end
			end
			owner.sun_time = data.timeLimits.customize[1].timeLimits
			owner.mon_time = data.timeLimits.customize[2].timeLimits
			owner.tue_time = data.timeLimits.customize[3].timeLimits
			owner.wed_time = data.timeLimits.customize[4].timeLimits
			owner.thu_time = data.timeLimits.customize[5].timeLimits
			owner.fri_time = data.timeLimits.customize[6].timeLimits
			owner.sat_time = data.timeLimits.customize[7].timeLimits
		end
	end

	-- 4. offTime - almost the same to bedtime
	if data.offTime ~= nil then
		-- enable: true or false
		if data.offTime.enable == true then
			owner.offTime_enable = "1"
		else
			owner.offTime_enable = "0"
		end
		-- mode: "everyday", "workingDay", "customize"
		if data.offTime.mode then
			owner.offTime_mode = data.offTime.mode
		end
		-- everyday
		if data.offTime.everyday then
			owner.offTime_eve_forenoon = data.offTime.everyday[1] + 256*data.offTime.everyday[2] + 65536*data.offTime.everyday[3]
			owner.offTime_eve_afternoon = data.offTime.everyday[4] + 256*data.offTime.everyday[5] + 65536*data.offTime.everyday[6]
		end
		-- workingDay
		if data.offTime.workingDay then
			if data.offTime.workingDay[1].enable == true then
				owner.offTime_wrk_enable = "1"
			else
				owner.offTime_wrk_enable = "0"
			end
			if data.offTime.workingDay[2].enable == true then
				owner.offTime_wek_enable = "1"
			else
				owner.offTime_wek_enable = "0"
			end
			owner.offTime_wrk_forenoon = data.offTime.workingDay[1].offTime[1] + 256*data.offTime.workingDay[1].offTime[2] + 65536*data.offTime.workingDay[1].offTime[3]
			owner.offTime_wrk_afternoon = data.offTime.workingDay[1].offTime[4] + 256*data.offTime.workingDay[1].offTime[5] + 65536*data.offTime.workingDay[1].offTime[6]
			owner.offTime_wek_forenoon = data.offTime.workingDay[2].offTime[1] + 256*data.offTime.workingDay[2].offTime[2] + 65536*data.offTime.workingDay[2].offTime[3]
			owner.offTime_wek_afternoon = data.offTime.workingDay[2].offTime[4] + 256*data.offTime.workingDay[2].offTime[5] + 65536*data.offTime.workingDay[2].offTime[6]
		end
		-- customize
		if data.offTime.customize then
			owner.offTime_cus_enable = 0
			for i = 1, 7 do
				if data.offTime.customize[i].enable == true then
					owner.offTime_cus_enable = owner.offTime_cus_enable + math.pow(2, 7-i)
				end
			end
			owner.sun_forenoon = data.offTime.customize[1].offTime[1] + 256*data.offTime.customize[1].offTime[2] + 65536*data.offTime.customize[1].offTime[3]
			owner.sun_afternoon = data.offTime.customize[1].offTime[4] + 256*data.offTime.customize[1].offTime[5] + 65536*data.offTime.customize[1].offTime[6]
			owner.mon_forenoon = data.offTime.customize[2].offTime[1] + 256*data.offTime.customize[2].offTime[2] + 65536*data.offTime.customize[2].offTime[3]
			owner.mon_afternoon = data.offTime.customize[2].offTime[4] + 256*data.offTime.customize[2].offTime[5] + 65536*data.offTime.customize[2].offTime[6]
			owner.tue_forenoon = data.offTime.customize[3].offTime[1] + 256*data.offTime.customize[3].offTime[2] + 65536*data.offTime.customize[3].offTime[3]
			owner.tue_afternoon = data.offTime.customize[3].offTime[4] + 256*data.offTime.customize[3].offTime[5] + 65536*data.offTime.customize[3].offTime[6]
			owner.wed_forenoon = data.offTime.customize[4].offTime[1] + 256*data.offTime.customize[4].offTime[2] + 65536*data.offTime.customize[4].offTime[3]
			owner.wed_afternoon = data.offTime.customize[4].offTime[4] + 256*data.offTime.customize[4].offTime[5] + 65536*data.offTime.customize[4].offTime[6]
			owner.thu_forenoon = data.offTime.customize[5].offTime[1] + 256*data.offTime.customize[5].offTime[2] + 65536*data.offTime.customize[5].offTime[3]
			owner.thu_afternoon = data.offTime.customize[5].offTime[4] + 256*data.offTime.customize[5].offTime[5] + 65536*data.offTime.customize[5].offTime[6]
			owner.fri_forenoon = data.offTime.customize[6].offTime[1] + 256*data.offTime.customize[6].offTime[2] + 65536*data.offTime.customize[6].offTime[3]
			owner.fri_afternoon = data.offTime.customize[6].offTime[4] + 256*data.offTime.customize[6].offTime[5] + 65536*data.offTime.customize[6].offTime[6]
			owner.sat_forenoon = data.offTime.customize[7].offTime[1] + 256*data.offTime.customize[7].offTime[2] + 65536*data.offTime.customize[7].offTime[3]
			owner.sat_afternoon = data.offTime.customize[7].offTime[4] + 256*data.offTime.customize[7].offTime[5] + 65536*data.offTime.customize[7].offTime[6]
		end
	end

	-- Generate uniqueId for each profile
	owner.profile_id = generate_uniqueId()

	-- Create time for each profile
	owner.create_time = os.time()

	-- save in config
	local ret = uci_r:section(PC_CONFIG_NAME, "owner", owner.owner_id, owner)
	if not ret then
		return ret, "uci section failed"
	end

	self:commit(PC_CONFIG_NAME, PC_RELOAD_CMD)
	--if #_owner_list == 0 then
		-- add the profile first time, if lite , start avira and url-class
		sys.fork_call("/etc/init.d/aviraservicemaster start")
	--end
	Nat:sync_hnat_status()

	result.ownerId = owner.owner_id
	result.uniqueProfileId = owner.profile_id
	result.createTime = owner.create_time
	res.result = json.encode(result)
	debug("====== print return table ======")
	debug_tbl(result)
	debug("====== print return table ======")
	debug("===> opcode 0x0511: tmp_add_ownerinlist end")
	debug("")
	return res
end

function AVIRA_GATHER:tmp_del_ownerinlist(app_form)
	local data = json.decode(app_form.data)
	local owner_list = data.ownerList

	debug("")
	debug("===> opcode 0x0512: tmp_del_ownerinlist")
	debug_tbl(data)
	for i, v in ipairs(owner_list) do
		tmcli.remove_client_list_for(v)  
		uci_r:delete(PC_CONFIG_NAME, v)
	end

	self:commit(PC_CONFIG_NAME, PC_RELOAD_CMD)
	sys.fork_call("/etc/init.d/aviraservicemaster start")
	Nat:sync_hnat_status()

	debug("===> opcode 0x0512: tmp_del_ownerinlist end")
	debug("")
	local ret = {}
	local result = {}
	ret.result = luci.json.encode(result)
	return ret
end

function AVIRA_GATHER:tmp_get_limit(app_form)
	local data = json.decode(app_form.data)
	local result = {}
	local res = {}
	local owner_id = tonumber(data.ownerId)

	debug("")
	debug("===> opcode 0x0513: tmp_get_limit")
	uci_r:foreach(PC_CONFIG_NAME, "owner",
		function(section)
			if tonumber(section.owner_id) == owner_id then
				result.todayOnlineTime, _ = getOnlineTime(owner_id)
				result.todayOnlineTime = tonumber(result.todayOnlineTime)
				local bonusTime = section.today_bonus_time or 0
				local rewardsTime = section.today_reward_time or 0
				result.todayBonusTime = bonusTime - rewardsTime
				-- workdays, default: 62 = 2^5+2^4+2^3+2^2+2^1
				if not section.workdays then
					section.workdays = 62
				end
				result.workingDays = numtodayarray(tonumber(section.workdays))
				-- 1. bedtime
				result.bedtime = {}
				-- enable
				result.bedtime.enable = section.bedtime_enable == "1" and true or false
				-- mode
				result.bedtime.mode = section.bedtime_mode or "everyday"
				-- everyday
				result.bedtime.everyday = {}
				result.bedtime.everyday.bedtimeBegin = section.bedtime_eve_beg and tonumber(section.bedtime_eve_beg) or 0
				result.bedtime.everyday.bedtimeEnd = section.bedtime_eve_end and tonumber(section.bedtime_eve_end) or 0
				-- workingDay
				result.bedtime.workingDay = {{},{}}
				result.bedtime.workingDay[1].enable = section.workday_bedtime == "1" and true or false
				result.bedtime.workingDay[1].bedtimeBegin = section.workday_begin and tonumber(section.workday_begin) or 0
				result.bedtime.workingDay[1].bedtimeEnd = section.workday_end and tonumber(section.workday_end) or 0
				result.bedtime.workingDay[2].enable = section.weekend_bedtime == "1" and true or false
				result.bedtime.workingDay[2].bedtimeBegin = section.weekend_begin and tonumber(section.weekend_begin) or 0
				result.bedtime.workingDay[2].bedtimeEnd = section.weekend_end and tonumber(section.weekend_end) or 0
				-- customize
				result.bedtime.customize = {{},{},{},{},{},{},{}}
				for i = 1,7 do
					result.bedtime.customize[i].enable = false
				end
				if section.bedtime_cus_enable ~= nil then
					local num = tonumber(section.bedtime_cus_enable)
					local remain
					local index = 1
					while num ~= 0 do
						remain = num%2
						if remain ~= 0 then
							result.bedtime.customize[8-index].enable = true
						end
						num = math.floor(num/2)
						index = index + 1
					end
				end
				result.bedtime.customize[1].bedtimeBegin = section.bedtime_sun_beg and tonumber(section.bedtime_sun_beg) or 0
				result.bedtime.customize[1].bedtimeEnd = section.bedtime_sun_end and tonumber(section.bedtime_sun_end) or 0
				result.bedtime.customize[2].bedtimeBegin = section.bedtime_mon_beg and tonumber(section.bedtime_mon_beg) or 0
				result.bedtime.customize[2].bedtimeEnd = section.bedtime_mon_end and tonumber(section.bedtime_mon_end) or 0
				result.bedtime.customize[3].bedtimeBegin = section.bedtime_tue_beg and tonumber(section.bedtime_tue_beg) or 0
				result.bedtime.customize[3].bedtimeEnd = section.bedtime_tue_end and tonumber(section.bedtime_tue_end) or 0
				result.bedtime.customize[4].bedtimeBegin = section.bedtime_wed_beg and tonumber(section.bedtime_wed_beg) or 0
				result.bedtime.customize[4].bedtimeEnd = section.bedtime_wed_end and tonumber(section.bedtime_wed_end) or 0
				result.bedtime.customize[5].bedtimeBegin = section.bedtime_thu_beg and tonumber(section.bedtime_thu_beg) or 0
				result.bedtime.customize[5].bedtimeEnd = section.bedtime_thu_end and tonumber(section.bedtime_thu_end) or 0
				result.bedtime.customize[6].bedtimeBegin = section.bedtime_fri_beg and tonumber(section.bedtime_fri_beg) or 0
				result.bedtime.customize[6].bedtimeEnd = section.bedtime_fri_end and tonumber(section.bedtime_fri_end) or 0
				result.bedtime.customize[7].bedtimeBegin = section.bedtime_sat_beg and tonumber(section.bedtime_sat_beg) or 0
				result.bedtime.customize[7].bedtimeEnd = section.bedtime_sat_end and tonumber(section.bedtime_sat_end) or 0

				-- 2. timeLimits
				result.timeLimits = {}
				-- enable
				result.timeLimits.enable = section.timeLimits_enable == "1" and true or false
				-- mode
				result.timeLimits.mode = section.timeLimits_mode or "everyday"
				-- everyday
				result.timeLimits.everyday = section.timeLimits_eve_time and tonumber(section.timeLimits_eve_time) or 0
				-- workingDay
				result.timeLimits.workingDay = {{},{}}
				result.timeLimits.workingDay[1].enable = section.workday_limit == "1" and true or false
				result.timeLimits.workingDay[1].timeLimits = section.workday_time and tonumber(section.workday_time) or 0
				result.timeLimits.workingDay[2].enable = section.weekend_limit == "1" and true or false
				result.timeLimits.workingDay[2].timeLimits = section.weekend_time and tonumber(section.weekend_time) or 0
				-- customize
				result.timeLimits.customize = {{},{},{},{},{},{},{}}
				for i = 1,7 do
					result.timeLimits.customize[i].enable = false
				end
				if section.timeLimits_cus_enable ~= nil then
					local num = tonumber(section.timeLimits_cus_enable)
					local remain
					local index = 1
					while num ~= 0 do
						remain = num%2
						if remain ~= 0 then
							result.timeLimits.customize[8-index].enable = true
						end
						num = math.floor(num/2)
						index = index + 1
					end
				end
				result.timeLimits.customize[1].timeLimits = section.sun_time and tonumber(section.sun_time) or 0
				result.timeLimits.customize[2].timeLimits = section.mon_time and tonumber(section.mon_time) or 0
				result.timeLimits.customize[3].timeLimits = section.tue_time and tonumber(section.tue_time) or 0
				result.timeLimits.customize[4].timeLimits = section.wed_time and tonumber(section.wed_time) or 0
				result.timeLimits.customize[5].timeLimits = section.thu_time and tonumber(section.thu_time) or 0
				result.timeLimits.customize[6].timeLimits = section.fri_time and tonumber(section.fri_time) or 0
				result.timeLimits.customize[7].timeLimits = section.sat_time and tonumber(section.sat_time) or 0

				-- 3. offTime
				result.offTime = {}
				-- enable
				result.offTime.enable = section.offTime_enable == "1" and true or false
				-- mode
				result.offTime.mode = section.offTime_mode or "everyday"
				-- everyday
				result.offTime.everyday = {}
				local eve_fore = section.offTime_eve_forenoon and tonumber(section.offTime_eve_forenoon) or 0
				local eve_after = section.offTime_eve_afternoon and tonumber(section.offTime_eve_afternoon) or 0
				result.offTime.everyday[1] = math.floor(eve_fore%256)
				result.offTime.everyday[2] = math.floor((eve_fore%65536)/256)
				result.offTime.everyday[3] = math.floor(eve_fore/65536)
				result.offTime.everyday[4] = math.floor(eve_after%256)
				result.offTime.everyday[5] = math.floor((eve_after%65536)/256)
				result.offTime.everyday[6] = math.floor(eve_after/65536)
				-- workingDay
				result.offTime.workingDay = {{},{}}
				result.offTime.workingDay[1].enable = section.offTime_wrk_enable=="1" and true or false
				result.offTime.workingDay[2].enable = section.offTime_wek_enable=="1" and true or false
				result.offTime.workingDay[1].offTime = {}
				result.offTime.workingDay[2].offTime = {}
				local wrk_fore = section.offTime_wrk_forenoon and tonumber(section.offTime_wrk_forenoon) or 0
				local wrk_after = section.offTime_wrk_afternoon and tonumber(section.offTime_wrk_afternoon) or 0
				local wek_fore = section.offTime_wek_forenoon and tonumber(section.offTime_wek_forenoon) or 0
				local wek_after = section.offTime_wek_afternoon and tonumber(section.offTime_wek_afternoon) or 0
				result.offTime.workingDay[1].offTime[1] = math.floor(wrk_fore%256)
				result.offTime.workingDay[1].offTime[2] = math.floor((wrk_fore%65536)/256)
				result.offTime.workingDay[1].offTime[3] = math.floor(wrk_fore/65536)
				result.offTime.workingDay[1].offTime[4] = math.floor(wrk_after%256)
				result.offTime.workingDay[1].offTime[5] = math.floor((wrk_after%65536)/256)
				result.offTime.workingDay[1].offTime[6] = math.floor(wrk_after/65536)
				result.offTime.workingDay[2].offTime[1] = math.floor(wek_fore%256)
				result.offTime.workingDay[2].offTime[2] = math.floor((wek_fore%65536)/256)
				result.offTime.workingDay[2].offTime[3] = math.floor(wek_fore/65536)
				result.offTime.workingDay[2].offTime[4] = math.floor(wek_after%256)
				result.offTime.workingDay[2].offTime[5] = math.floor((wek_after%65536)/256)
				result.offTime.workingDay[2].offTime[6] = math.floor(wek_after/65536)
				-- customize
				result.offTime.customize = {{},{},{},{},{},{},{}}
				for i = 1,7 do
					result.offTime.customize[i].enable = false
				end
				if section.offTime_cus_enable ~= nil then
					local num = tonumber(section.offTime_cus_enable)
					local remain
					local index = 1
					while num ~= 0 do
						remain = num%2
						if remain ~= 0 then
							result.offTime.customize[8-index].enable = true
						end
						num = math.floor(num/2)
						index = index + 1
					end
				end
				for i = 1, 7 do
					result.offTime.customize[i].offTime = {}
				end
				local offTime_array = {}
				offTime_array[1] = section.sun_forenoon and tonumber(section.sun_forenoon) or 0
				offTime_array[2] = section.sun_afternoon and tonumber(section.sun_afternoon) or 0
				offTime_array[3] = section.mon_forenoon and tonumber(section.mon_forenoon) or 0
				offTime_array[4] = section.mon_afternoon and tonumber(section.mon_afternoon) or 0
				offTime_array[5] = section.tue_forenoon and tonumber(section.tue_forenoon) or 0
				offTime_array[6] = section.tue_afternoon and tonumber(section.tue_afternoon) or 0
				offTime_array[7] = section.wed_forenoon and tonumber(section.wed_forenoon) or 0
				offTime_array[8] = section.wed_afternoon and tonumber(section.wed_afternoon) or 0
				offTime_array[9] = section.thu_forenoon and tonumber(section.thu_forenoon) or 0
				offTime_array[10] = section.thu_afternoon and tonumber(section.thu_afternoon) or 0
				offTime_array[11] = section.fri_forenoon and tonumber(section.fri_forenoon) or 0
				offTime_array[12] = section.fri_afternoon and tonumber(section.fri_afternoon) or 0
				offTime_array[13] = section.sat_forenoon and tonumber(section.sat_forenoon) or 0
				offTime_array[14] = section.sat_afternoon and tonumber(section.sat_afternoon) or 0
				for i = 1,7 do
					result.offTime.customize[i].offTime[1] = math.floor(offTime_array[2*i-1]%256)
					result.offTime.customize[i].offTime[2] = math.floor((offTime_array[2*i-1]%65536)/256)
					result.offTime.customize[i].offTime[3] = math.floor(offTime_array[2*i-1]/65536)
					result.offTime.customize[i].offTime[4] = math.floor(offTime_array[2*i]%256)
					result.offTime.customize[i].offTime[5] = math.floor((offTime_array[2*i]%65536)/256)
					result.offTime.customize[i].offTime[6] = math.floor(offTime_array[2*i]/65536)
				end
			end
		end
	)

	res.result = json.encode(result)
	debug("====== print return table ======")
	debug_tbl(result)
	debug("====== print return table ======")
	debug("===> opcode 0x0513: tmp_get_limit end")
	debug("")
	return res
end

function AVIRA_GATHER:tmp_set_limit(app_form)
	local data = json.decode(app_form.data)
	local owner = {}
	owner.owner_id = data.ownerId    

	debug("")
	debug("===> opcode 0x0514: tmp_set_limit")
	debug_tbl(data)

	-- 1. workingDays
	-- workdays: ["Mon", "Tue", "Wed", "Thu", "Fri"] ===> [ 0,1,1,1,1,1,0 ]
	-- Sun: 2^6 = 64, Sat: 32, Fri: 16, Thu: 8, Web: 4, Tue: 2, Mon: 1
	if data.workingDays ~= nil then
		local total = 0
		for k, v in ipairs(data.workingDays) do
			total = total + daytonum(v)
		end
		owner.workdays = total
	end

	-- 2. bedtime
	if data.bedtime ~= nil then
		-- enable: true or false
		if data.bedtime.enable == true then
			owner.bedtime_enable = "1"
		else
			owner.bedtime_enable = "0"
		end
		-- mode: "everyday", "workingDay", "customize"
		if data.bedtime.mode then
			owner.bedtime_mode = data.bedtime.mode
		end
		-- everyday
		if data.bedtime.everyday then
			owner.bedtime_eve_beg = data.bedtime.everyday.bedtimeBegin
			owner.bedtime_eve_end = data.bedtime.everyday.bedtimeEnd
		end
		-- workingDay
		-- _bedtime: workday_enable, weekend enable
		-- _begin  : workday_begin_time, weekend_begin_time
		-- _end    : workday_end_time, weekend_end_time
		if data.bedtime.workingDay then
			if data.bedtime.workingDay[1].enable == true then
				owner.workday_bedtime = "1"
			else
				owner.workday_bedtime = "0"
			end
			if data.bedtime.workingDay[2].enable == true then
				owner.weekend_bedtime = "1"
			else
				owner.weekend_bedtime = "0"
			end
			owner.workday_begin = data.bedtime.workingDay[1].bedtimeBegin
			owner.workday_end = data.bedtime.workingDay[1].bedtimeEnd
			owner.weekend_begin = data.bedtime.workingDay[2].bedtimeBegin
			owner.weekend_end = data.bedtime.workingDay[2].bedtimeEnd
		end
		-- customize
		-- cus_enable: customize_enable, bit format: 01111111 means sunday to monday
		if data.bedtime.customize then
			owner.bedtime_cus_enable = 0
			for i = 1, 7 do
				if data.bedtime.customize[i].enable == true then
					owner.bedtime_cus_enable = owner.bedtime_cus_enable + math.pow(2, 7-i)
				end
			end
			owner.bedtime_sun_beg = data.bedtime.customize[1].bedtimeBegin
			owner.bedtime_sun_end = data.bedtime.customize[1].bedtimeEnd
			owner.bedtime_mon_beg = data.bedtime.customize[2].bedtimeBegin
			owner.bedtime_mon_end = data.bedtime.customize[2].bedtimeEnd
			owner.bedtime_tue_beg = data.bedtime.customize[3].bedtimeBegin
			owner.bedtime_tue_end = data.bedtime.customize[3].bedtimeEnd
			owner.bedtime_wed_beg = data.bedtime.customize[4].bedtimeBegin
			owner.bedtime_wed_end = data.bedtime.customize[4].bedtimeEnd
			owner.bedtime_thu_beg = data.bedtime.customize[5].bedtimeBegin
			owner.bedtime_thu_end = data.bedtime.customize[5].bedtimeEnd
			owner.bedtime_fri_beg = data.bedtime.customize[6].bedtimeBegin
			owner.bedtime_fri_end = data.bedtime.customize[6].bedtimeEnd
			owner.bedtime_sat_beg = data.bedtime.customize[7].bedtimeBegin
			owner.bedtime_sat_end = data.bedtime.customize[7].bedtimeEnd
		end
	end

	-- 3. timeLimits - almost the same to bedtime
	if data.timeLimits ~= nil then
		-- enable: true or false
		if data.timeLimits.enable == true then
			owner.timeLimits_enable = "1"
		else
			owner.timeLimits_enable = "0"
		end
		-- mode: "everyday", "workingDay", "customize"
		if data.timeLimits.mode then
			owner.timeLimits_mode = data.timeLimits.mode
		end
		-- everyday
		if data.timeLimits.everyday then
			owner.timeLimits_eve_time = data.timeLimits.everyday
		end
		-- workingDay
		if data.timeLimits.workingDay then
			if data.timeLimits.workingDay[1].enable == true then
				owner.workday_limit = "1"
			else
				owner.workday_limit = "0"
			end
			if data.timeLimits.workingDay[2].enable == true then
				owner.weekend_limit = "1"
			else
				owner.weekend_limit = "0"
			end
			owner.workday_time = data.timeLimits.workingDay[1].timeLimits
			owner.weekend_time = data.timeLimits.workingDay[2].timeLimits
		end
		-- customize
		if data.timeLimits.customize then
			owner.timeLimits_cus_enable = 0
			for i = 1, 7 do
				if data.timeLimits.customize[i].enable == true then
					owner.timeLimits_cus_enable = owner.timeLimits_cus_enable + math.pow(2, 7-i)
				end
			end
			owner.sun_time = data.timeLimits.customize[1].timeLimits
			owner.mon_time = data.timeLimits.customize[2].timeLimits
			owner.tue_time = data.timeLimits.customize[3].timeLimits
			owner.wed_time = data.timeLimits.customize[4].timeLimits
			owner.thu_time = data.timeLimits.customize[5].timeLimits
			owner.fri_time = data.timeLimits.customize[6].timeLimits
			owner.sat_time = data.timeLimits.customize[7].timeLimits
		end
	end

	-- 4. offTime - almost the same to bedtime
	if data.offTime ~= nil then
		-- enable: true or false
		if data.offTime.enable == true then
			owner.offTime_enable = "1"
		else
			owner.offTime_enable = "0"
		end
		-- mode: "everyday", "workingDay", "customize"
		if data.offTime.mode then
			owner.offTime_mode = data.offTime.mode
		end
		-- everyday
		if data.offTime.everyday then
			owner.offTime_eve_forenoon = data.offTime.everyday[1] + 256*data.offTime.everyday[2] + 65536*data.offTime.everyday[3]
			owner.offTime_eve_afternoon = data.offTime.everyday[4] + 256*data.offTime.everyday[5] + 65536*data.offTime.everyday[6]
		end
		-- workingDay
		if data.offTime.workingDay then
			if data.offTime.workingDay[1].enable == true then
				owner.offTime_wrk_enable = "1"
			else
				owner.offTime_wrk_enable = "0"
			end
			if data.offTime.workingDay[2].enable == true then
				owner.offTime_wek_enable = "1"
			else
				owner.offTime_wek_enable = "0"
			end
			owner.offTime_wrk_forenoon = data.offTime.workingDay[1].offTime[1] + 256*data.offTime.workingDay[1].offTime[2] + 65536*data.offTime.workingDay[1].offTime[3]
			owner.offTime_wrk_afternoon = data.offTime.workingDay[1].offTime[4] + 256*data.offTime.workingDay[1].offTime[5] + 65536*data.offTime.workingDay[1].offTime[6]
			owner.offTime_wek_forenoon = data.offTime.workingDay[2].offTime[1] + 256*data.offTime.workingDay[2].offTime[2] + 65536*data.offTime.workingDay[2].offTime[3]
			owner.offTime_wek_afternoon = data.offTime.workingDay[2].offTime[4] + 256*data.offTime.workingDay[2].offTime[5] + 65536*data.offTime.workingDay[2].offTime[6]
		end
		-- customize
		if data.offTime.customize then
			owner.offTime_cus_enable = 0
			for i = 1, 7 do
				if data.offTime.customize[i].enable == true then
					owner.offTime_cus_enable = owner.offTime_cus_enable + math.pow(2, 7-i)
				end
			end
			owner.sun_forenoon = data.offTime.customize[1].offTime[1] + 256*data.offTime.customize[1].offTime[2] + 65536*data.offTime.customize[1].offTime[3]
			owner.sun_afternoon = data.offTime.customize[1].offTime[4] + 256*data.offTime.customize[1].offTime[5] + 65536*data.offTime.customize[1].offTime[6]
			owner.mon_forenoon = data.offTime.customize[2].offTime[1] + 256*data.offTime.customize[2].offTime[2] + 65536*data.offTime.customize[2].offTime[3]
			owner.mon_afternoon = data.offTime.customize[2].offTime[4] + 256*data.offTime.customize[2].offTime[5] + 65536*data.offTime.customize[2].offTime[6]
			owner.tue_forenoon = data.offTime.customize[3].offTime[1] + 256*data.offTime.customize[3].offTime[2] + 65536*data.offTime.customize[3].offTime[3]
			owner.tue_afternoon = data.offTime.customize[3].offTime[4] + 256*data.offTime.customize[3].offTime[5] + 65536*data.offTime.customize[3].offTime[6]
			owner.wed_forenoon = data.offTime.customize[4].offTime[1] + 256*data.offTime.customize[4].offTime[2] + 65536*data.offTime.customize[4].offTime[3]
			owner.wed_afternoon = data.offTime.customize[4].offTime[4] + 256*data.offTime.customize[4].offTime[5] + 65536*data.offTime.customize[4].offTime[6]
			owner.thu_forenoon = data.offTime.customize[5].offTime[1] + 256*data.offTime.customize[5].offTime[2] + 65536*data.offTime.customize[5].offTime[3]
			owner.thu_afternoon = data.offTime.customize[5].offTime[4] + 256*data.offTime.customize[5].offTime[5] + 65536*data.offTime.customize[5].offTime[6]
			owner.fri_forenoon = data.offTime.customize[6].offTime[1] + 256*data.offTime.customize[6].offTime[2] + 65536*data.offTime.customize[6].offTime[3]
			owner.fri_afternoon = data.offTime.customize[6].offTime[4] + 256*data.offTime.customize[6].offTime[5] + 65536*data.offTime.customize[6].offTime[6]
			owner.sat_forenoon = data.offTime.customize[7].offTime[1] + 256*data.offTime.customize[7].offTime[2] + 65536*data.offTime.customize[7].offTime[3]
			owner.sat_afternoon = data.offTime.customize[7].offTime[4] + 256*data.offTime.customize[7].offTime[5] + 65536*data.offTime.customize[7].offTime[6]
		end
	end

	-- save in config
	local res = uci_r:section(PC_CONFIG_NAME, "owner", tostring(owner.owner_id), owner)
	if not res then
		return res, "uci section failed"
	end
	self:commit(PC_CONFIG_NAME, PC_RELOAD_CMD)

	debug("===> opcode 0x0514: tmp_set_limit end")
	debug("")
	local ret = {}
	local result = {}
	ret.result = luci.json.encode(result)
	return ret
end

function AVIRA_GATHER:tmp_get_filterinfo(app_form)
	local data = json.decode(app_form.data)
	local owner_id = data.owner_id
	local start_index = data.start_index
	local amount = data.amount
	local total = 0
	local websites = {}
	local res = {}
	local result = {}

	debug("")
	debug("===> opcode 0x0425: tmp_get_filterinfo")
	uci_r:foreach(PC_CONFIG_NAME, "owner",
		function(section)
			if tonumber(section.owner_id) == owner_id then
				local website_list = section.website or {}
				local category = 0
				if start_index == 0 then
					category = section.filter_categories_list or 0
					result.filter_categories_list = numtocatarray(tonumber(category))
				end
				if website_list then
					for i, v in ipairs(website_list) do
						if total >= start_index and total < (start_index + amount) then
							websites[#websites + 1] = v
						end
						total = total + 1
					end
				end
			end
		end
	)
	result.owner_id = owner_id
	result.start_index = start_index
	result.amount = #websites
	result.sum = total
	result.filter_website_list = websites

	res.result = json.encode(result)
	debug("====== print return table ======")
	debug_tbl(result)
	debug("====== print return table ======")
	debug("===> opcode 0x0425: tmp_get_filterinfo end")
	debug("")
	return res
end

function AVIRA_GATHER:tmp_set_filterinfo(app_form)
	local data = json.decode(app_form.data)
	local owner_id = data.owner_id
	local start_index = data.start_index

	debug("")
	debug("===> opcode 0x0426: tmp_set_filterinfo")
	if uci_r:get(PC_CONFIG_NAME, owner_id) ~= "owner" then
		return false, "no such owner"
	end
	-- set filter_categories_list only
	if not start_index then
		if data.filter_categories_list then
			local category = 0
			if #data.filter_categories_list >= 0 then
				for k, v in ipairs(data.filter_categories_list) do
					category = category + cattonum(v)
				end
				uci_r:delete(PC_CONFIG_NAME, tostring(owner_id), "filter_categories_list")
				uci_r:set(PC_CONFIG_NAME, tostring(owner_id), "filter_categories_list", category)
			end
		end
	else
		local max_sites = get_max_sites()
		local sites_count = tonumber(data.sum)
		if sites_count > max_sites then
			debug("websites num exceeds max num limit")
			return false, "websites num exceeds max num limit"
		end

		-- set filter_website_list only or set both
		if start_index == 0 then
			if data.filter_categories_list then
				local category = 0
				if #data.filter_categories_list >= 0 then
					for k, v in ipairs(data.filter_categories_list) do
						category = category + cattonum(v)
					end
					uci_r:delete(PC_CONFIG_NAME, tostring(owner_id), "filter_categories_list")
					uci_r:set(PC_CONFIG_NAME, tostring(owner_id), "filter_categories_list", category)
				end
			end
			local website = data.filter_website_list
			if website then
				uci_r:delete(PC_CONFIG_NAME, tostring(owner_id), "website")
				if #website > 0 then
					uci_r:set_list(PC_CONFIG_NAME, tostring(owner_id), "website", website)
				end
			end
		else
			local old_website = uci_r:get_list(PC_CONFIG_NAME, tostring(owner_id), "website")
			local website = data.filter_website_list
			for i = 1, #website do
				old_website[#old_website + 1] = website[i]
			end
			if #old_website ~= 0 then
				uci_r:delete(PC_CONFIG_NAME, tostring(owner_id), "website")
				uci_r:set_list(PC_CONFIG_NAME, tostring(owner_id), "website", old_website)
			end
		end
	end

	self:commit(PC_CONFIG_NAME, PC_RELOAD_CMD)
	-- Use fork_call ? fork_exec may cause recall ?
	sys.fork_call("/etc/init.d/aviraservicemaster start_urlclass")
	debug("===> opcode 0x0426: tmp_set_filterinfo end")
	debug("")
	local ret = {}
	local result = {}
	ret.result = luci.json.encode(result)
	return ret
end

function AVIRA_GATHER:tmp_get_freefilterinfo(app_form)
	local data = json.decode(app_form.data)
	local owner_id = data.ownerId
	local start_index = data.startIndex
	local amount = data.amount
	local total = 0
	local websites_white = {}
	local res = {}
	local result = {}

	debug("")
	debug("===> opcode 0x0517: tmp_get_freefilterinfo")
	uci_r:foreach(PC_CONFIG_NAME, "owner",
		function(section)
			if tonumber(section.owner_id) == owner_id then
				local website_list_white = section.website_white
				if website_list_white then
					for i, v in ipairs(website_list_white) do
						if total >= start_index and total < (start_index + amount) then
							websites_white[#websites_white + 1] = v
						end
						total = total + 1
					end
				end
			end
		end
	)
	result.ownerId = owner_id
	result.startIndex = start_index
	result.amount = #websites_white
	result.sum = total
	result.filterFreeWebsiteList = websites_white

	res.result = json.encode(result)
	debug("====== print return table ======")
	debug_tbl(result)
	debug("====== print return table ======")
	debug("===> opcode 0x0517: tmp_get_freefilterinfo end")
	debug("")
	return res
end

function AVIRA_GATHER:tmp_set_freefilterinfo(app_form)
	local data = json.decode(app_form.data)
	local owner_id = data.ownerId
	local start_index = data.startIndex

	debug("")
	debug("===> opcode 0x0518: tmp_set_freefilterinfo")
	if uci_r:get(PC_CONFIG_NAME, owner_id) ~= "owner" then
		return false, "no such owner"
	end
	local max_freesites = get_max_freesites()
	local freesites_count = tonumber(data.sum)
	if freesites_count > max_freesites then
		debug("free websites num exceeds max num limit")
		return false, "free websites num exceeds max num limit"
	end
	if start_index == 0 then
		local website_white = data.filterFreeWebsiteList
		if website_white then
			uci_r:delete(PC_CONFIG_NAME, tostring(owner_id), "website_white")
			if #website_white > 0 then
				uci_r:set_list(PC_CONFIG_NAME, tostring(owner_id), "website_white", website_white)
			end
		end
	else
		local old_website_white = uci_r:get_list(PC_CONFIG_NAME, tostring(owner_id), "website_white")
		local website_white = data.filterFreeWebsiteList
		for i = 1, #website_white do
			old_website_white[#old_website_white + 1] = website_white[i]
		end
		if #old_website_white ~= 0 then
			uci_r:delete(PC_CONFIG_NAME, tostring(owner_id), "website_white")
			uci_r:set_list(PC_CONFIG_NAME, tostring(owner_id), "website_white", old_website_white)
		end
	end

	self:commit(PC_CONFIG_NAME, PC_RELOAD_CMD)
	debug("===> opcode 0x0518: tmp_set_freefilterinfo end")
	debug("")
	local ret = {}
	local result = {}
	ret.result = luci.json.encode(result)
	return ret
end

function AVIRA_GATHER:tmp_get_familytimeinfo(app_form)
	local res = {}
	local result = {}

	debug("")
	debug("===> opcode 0x0519: tmp_get_familytimeinfo")
	result.enable = uci_r:get(PC_CONFIG_NAME, "familytime", "enable") or false
	local endTime = uci_r:get(PC_CONFIG_NAME, "familytime", "time") or 0
	local remainTime = math.ceil((endTime - os.time())/60)
	if remainTime <= 0 then
		result.time = 0
	else
		result.time = remainTime
	end
	result.endMoment = tonumber(endTime)
	result.deviceMacList = tmcli.get_devices_family()

	res.result = json.encode(result)
	debug("====== print return table ======")
	debug_tbl(result)
	debug("====== print return table ======")
	debug("===> opcode 0x0519: tmp_get_familytimeinfo end")
	debug("")
	return res
end

function AVIRA_GATHER:tmp_set_familytimeinfo(app_form)
	local data = json.decode(app_form.data)
	local client_list = {}
	local family_list = {}
	local familyMacList = {}

	debug("")
	debug("===> opcode 0x0520: tmp_set_familytimeinfo")

	if data.enable ~= nil then
		if data.enable == false then
			uci_r:set(PC_CONFIG_NAME, "familytime", "enable", "false")
			uci_r:set(PC_CONFIG_NAME, "familytime", "time", 0)
		else
			uci_r:set(PC_CONFIG_NAME, "familytime", "enable", "true")
			local endTime = os.time() + data.time*60
			uci_r:set(PC_CONFIG_NAME, "familytime", "time", endTime)
		end
	else
		-- STEP1: Remove all devices.
		familyMacList = tmcli.get_devices_family()
		if familyMacList then
			for k, v in ipairs(familyMacList) do
				local client = {}
				client.mac = v
				client.family = "off"
				family_list[#family_list + 1] = client
			end
		end
		res = batch_set_client_info(family_list)
		if not res then
			debug("STEP1 failed")
			return res, "remove client to uci fail"
		end

		-- STEP2: Add new devices.
		if data.deviceMacList then
			for k, v in ipairs(data.deviceMacList) do
				local client = {}
				client.mac = v
				client.family = "on"
				client_list[#client_list + 1] = client
			end
		end
		if #client_list ~= 0 then
			res = batch_set_client_info(client_list)
			if not res then
				debug("STEP2 failed")
				return res, "add client to uci fail"
			end
		else
			uci_r:set(PC_CONFIG_NAME, "familytime", "enable", "false")
			uci_r:set(PC_CONFIG_NAME, "familytime", "time", 0)
		end
	end

	self:commit(PC_CONFIG_NAME, FT_RELOAD_CMD)
	debug("===> opcode 0x0520: tmp_set_familytimeinfo end")
	debug("")
	local ret = {}
	local result = {}
	ret.result = luci.json.encode(result)
	return ret
end

function AVIRA_GATHER:tmp_get_usage(app_form)
	local data = json.decode(app_form.data)
	local res = {}
	local result = {}
	local todayOnlineTime
	local mode, today, workdays, is_workday, days
	local workday_time, weekend_time, today_time

	local ownerId = data.ownerId

	debug("")
	debug("===> opcode 0x0521: tmp_get_usage")

	todayOnlineTime, _ = getOnlineTime(ownerId)
	local todayTimeLimit = getAllowTime(ownerId, "1")
	result.todayOnlineTime = tonumber(todayOnlineTime)
	result.todayTotalAllowTime = math.min(tonumber(todayTimeLimit), 1440)

	res.result = json.encode(result)
	debug("====== print return table ======")
	debug_tbl(result)
	debug("====== print return table ======")
	debug("===> opcode 0x0521: tmp_get_usage end")
	debug("")
	return res
end

function AVIRA_GATHER:tmp_get_data(app_form)
	local data = json.decode(app_form.data)
	local res = {}
	local result = {}

	debug("")
	debug("===> opcode 0x0522: tmp_get_data")

	local ownerId = data.ownerId	--int
	local day = data.date			--string

	-- NOTE: get response data
	-- 1. get online time and total time
	local onlineTime, todayTimeLimit, isToday
	if day == "today" then
		onlineTime, _ = getOnlineTime(ownerId)
		isToday = "1"
	elseif day == "yesterday" then
		_, onlineTime = getOnlineTime(ownerId)
		isToday = "0"
	end

	-- NOTE: getAllowTime(ownerId, day), day === 1 means today, day === 0 means yesterday
	todayTimeLimit = getAllowTime(ownerId, isToday)
	result.elapsedTime = tonumber(onlineTime)
	result.totalTime = math.min(tonumber(todayTimeLimit), 1440)

	-- 2. get visit/block website
	-- PROC_PCTL	= "/proc/pctl/"
	-- PROC_BLOCK	= "/proc/block/block_insight"
	-- visitWebsiteList: url, count, spendTime
	result.visitWebsiteList = {}
	local fp = io.open(PROC_PCTL..ownerId,"r")
	if fp then
		local head = fp:read("*line")
		local num
		h_minutes, h_timestamp, num, _ = string.match(head, "(%d+) (%d+) (%d+) (%d+)")

		if num ~= "0" or h_minutes ~= "0" or h_timestamp ~= "0" then
			-- The next line is the amount of Internet time per hour. Skip this line
			local tmp = fp:read("*line")
		end

		num = tonumber(num)
		local count = 0
		if day == "today" then
			while count < math.min(num, 5) do
				local t = fp:read("*line")
				local website = {}
				_, website.url, website.spendTime, website.count, _ = string.match(t, "(%d+) ([^,;]+) (%d+) (%d+) (%d+)")
				if website.url ~= nil and #website.url > 0 then
					result.visitWebsiteList[#result.visitWebsiteList+1] = website
					count = count + 1
				end
			end
		else
			-- NOTE: yesterday
			-- ignore today records
			while count < num do
				fp:read("*line")
				count = count + 1
			end
			local y_head = fp:read("*line")
			if y_head then
				local y_num
				_, _, y_num, _ = string.match(y_head, "(%d+) (%d+) (%d+) (%d+)")
				if y_num then
					local y_count = 0
					while y_count < math.min(y_num, 5) do
						local t = fp:read("*line")
						local website = {}
						_, website.url, website.spendTime, website.count, _ = string.match(t, "(%d+) ([^,;]+) (%d+) (%d+) (%d+)")
						if website.url ~= nil and #website.url > 0 then
							result.visitWebsiteList[#result.visitWebsiteList+1] = website
							y_count = y_count + 1
						end
					end
				end
			end
		end
		fp:close()
	else
		debug("Open file error." .. PROC_PCTL .. ownerId)
	end

	result.filterWebsiteList = {}
	fp = io.open(PROC_BLOCK, "r")
	if fp then
		local head = fp:read("*line")
		if head ~= nil then
			local num = tonumber(head)
			--[count]     increase how many lines have been read for specified owner
			--[totalline] increase how many lines have been read
			local count = 0
			local totalline = 0
			if day == "today" then
				while count < math.min(num, 5) do
					totalline = totalline + 1
					if totalline > num then
						break
					end
					local t = fp:read("*line")
					if not t then
						break
					end
					local _, url, blockTimes, mac = string.match(t, "(%d+) ([^,;]+) (%d+) (.+)")
					mac = TrimStr(mac)
					local owner = uci_r:get("client_mgmt", mac, "owner_id") or -1
					if tonumber(owner) == ownerId then
						local website = {}
						website.url = url
						website.count = blockTimes
						result.filterWebsiteList[#result.filterWebsiteList+1] = website
						count = count + 1
					end
				end
			else
				while count < num do
					fp:read("*line")
					count = count + 1
				end
				local y_head = fp:read("*line")
				if y_head ~= nil then
					local y_num = tonumber(y_head)
					local y_count = 0
					--[[
						1. 当前版本不会读取前一天的data
						2. block文件下只会存今天和前一天的数据，读取到y_totalline时已经是最后一行。
						所以现在注释掉，如果有数据结构变更产生影响，请注意取消注释
					]]--
					-- local y_totalline = 0
					while y_count < math.min(y_num, 5) do
					--[[
						y_totalline = y_totalline + 1
						if y_totalline > num then
							break
						end
					]]--
						local t = fp:read("*line")
						if not t then
							break
						end
						local _, url, blockTimes, mac = string.match(t, "(%d+) ([^,;]+) (%d+) (.+)")
						mac = TrimStr(mac)
						local owner = uci_r:get("client_mgmt", mac, "owner_id") or -1
						if tonumber(owner) == ownerId then
							local website = {}
							website.url = url
							website.count = blockTimes
							result.filterWebsiteList[#result.filterWebsiteList+1] = website
							count = count + 1
						end
					end
				end
			end
		end
		fp:close()
	else
		debug("Open file error.".. PROC_BLOCK)
	end

	res.result = json.encode(result)
	debug("====== print return table ======")
	debug_tbl(result)
	debug("====== print return table ======")
	debug("===> opcode 0x0522: tmp_get_data end")
	debug("")
	return res
end

function AVIRA_GATHER:tmp_get_sites(app_form)
	local data = json.decode(app_form.data)
	local res = {}
	local result = {}

	debug("")
	debug("===> opcode 0x0523: tmp_get_sites")

	local ownerId = data.ownerId	--int
	local day = data.date			--string, today/yesterday
	local siteType = data.type		--string website type, block/visit
	local startIndex = data.startIndex	--int
	local amount = data.amount		--int

	-- NOTE: get response data
	-- PROC_PCTL	= "/proc/pctl/"
	-- PROC_BLOCK	= "/proc/block/block_insight"
	-- Init response data
	result.startIndex = startIndex
	result.amount = amount
	result.sum = 0
	result.websiteList = {}
	if siteType == "visit" then
		if startIndex == 0 then
			os.execute("rm -f /tmp/visitList")
			os.execute("cp " .. PROC_PCTL .. ownerId .. " /tmp/visitList")
		end
		local fp = io.open("/tmp/visitList","r")
		if fp then
			local head = fp:read("*line")
			local num
			h_minutes, h_timestamp, num, _ = string.match(head, "(%d+) (%d+) (%d+) (%d+)")

			if num ~= "0" or h_minutes ~= "0" or h_timestamp ~= "0" then
				-- The next line is the amount of Internet time per hour. Skip this line
				local tmp = fp:read("*line")
			end

			num = tonumber(num)
			local total = 0
			if day == "today" then
				local endIndex = math.min(startIndex+amount, num)
				while true do
					local t = fp:read("*line")
					if not t then
						break
					end
					if total >= startIndex and total < endIndex then
						local website = {}
						_, website.url, website.spendTime, website.count, _ = string.match(t, "(%d+) ([^,;]+) (%d+) (%d+) (%d+)")
						result.websiteList[#result.websiteList+1] = website
					elseif total >= endIndex then
						break
					end
					total = total + 1
				end
				result.amount = #result.websiteList
				result.sum = num
			else
				-- NOTE: yesterday
				-- ignore today records
				while total < num do
					fp:read("*line")
					total = total + 1
				end
				local y_head = fp:read("*line")
				if y_head then
					local y_num
					_, _, y_num, _ = string.match(y_head, "(%d+) (%d+) (%d+) (%d+)")
					if y_num then
						local y_total = 0
						local y_endIndex = math.min(startIndex+amount, y_num)
						while true do
							local t = fp:read("*line")
							if not t then
								break
							end
							if y_total >= startIndex and y_total < y_endIndex then
								local website = {}
								_, website.url, website.spendTime, website.count, _ = string.match(t, "(%d+) ([^,;]+) (%d+) (%d+) (%d+)")
								result.websiteList[#result.websiteList+1] = website
							elseif y_total >= y_endIndex then
								break
							end
							y_total = y_total + 1
						end
					end
				end
				result.amount = #result.websiteList
				result.sum = y_num
			end
			fp:close()
		else
			debug("Open file error." .. PROC_PCTL .. ownerId)
		end
	else
		if startIndex == 0 then
			os.execute("rm -f /tmp/blockList")
			os.execute("cp " .. PROC_BLOCK .. " /tmp/blockList")
		end
		local fp = io.open("/tmp/blockList", "r")
		if fp then
			local head = fp:read("*line")
			if head then
				local num = tonumber(head)
				local count = 0
				local total = 0
				local endIndex = startIndex + amount
				if day == "today" then
					while true do
						local t = fp:read("*line")
						if not t then
							break
						end
						local _, url, blockTimes, mac = string.match(t, "(%d+) ([^,;]+) (%d+) (.+)")
						mac = TrimStr(mac)
						local owner = uci_r:get("client_mgmt", mac, "owner_id") or -1
						if tonumber(owner) == ownerId then
							if total >= startIndex and total < endIndex then
								local website = {}
								website.url = url
								website.count = blockTimes
								result.websiteList[#result.websiteList+1] = website
							end
							total = total + 1
						end
						count = count + 1
						if count == num then
							break
						end
					end
					result.amount = #result.websiteList
					result.sum = total
				else
					-- NOTE: yesterday
					-- ignore today records
					while total < num do
						fp:read("*line")
						total = total + 1
					end
					local y_head = fp:read("*line")
					if y_head then
						local y_num = tonumber(y_head)
						local y_total = 0
						if y_num then
							while true do
								local t = fp:read("*line")
								if not t then
									break
								end
								local _, url, blockTimes, mac = string.match(t, "(%d+) ([^,;]+) (%d+) (.+)")
								mac = TrimStr(mac)
								local owner = uci_r:get("client_mgmt", mac, "owner_id") or -1
								if tonumber(owner) == ownerId then
									if y_total >= startIndex and y_total < endIndex then
										local website = {}
										website.url = url
										website.count = blockTimes
										result.websiteList[#result.websiteList+1] = website
									end
									y_total = y_total + 1
								end
								count = count + 1
								if count == y_num then
									break
								end
							end
						end
					end
					result.amount = #result.websiteList
					result.sum = y_total
				end
			end
			fp:close()
		else
			debug("Open file error.".. PROC_BLOCK)
		end
	end

	res.result = json.encode(result)
	debug("====== print return table ======")
	debug_tbl(result)
	debug("====== print return table ======")
	debug("===> opcode 0x0523: tmp_get_sites end")
	debug("")
	return res
end

function AVIRA_GATHER:tmp_ign_req(app_form)
	local data = json.decode(app_form.data)

	debug("")
	debug("===> opcode 0x0524: tmp_ign_req")

	local ownerId = data.ownerId		--int
	local reqType = data.requestType	--string more_online_time/access_website

	-- NOTE: set ignore request type
	if reqType == "more_online_time" then
		uci_r:set(PC_CONFIG_NAME, tostring(ownerId), "ign_online", "1")
	elseif reqType == "access_website" then
		uci_r:set(PC_CONFIG_NAME, tostring(ownerId), "ign_website", "1")
	end
	self:commit(PC_CONFIG_NAME, PC_RELOAD_CMD)

	debug("===> opcode 0x0524: tmp_ign_req end")
	debug("")
	local ret = {}
	local result = {}
	ret.result = luci.json.encode(result)
	return ret
end

function AVIRA_GATHER:tmp_modify_baseinfo(app_form)
	local data = json.decode(app_form.data)
	local owner = {}
	owner.owner_id = data.owner_id
	owner.name = nixio.bin.b64decode(data.name)

	debug("")
	debug("===> opcode 0x0427: tmp_modify_baseinfo")
	if data.internet_blocked == true then
		owner.blocked = "1"
	else
		owner.blocked = "0"
	end

	local res = uci_r:section(PC_CONFIG_NAME, "owner", owner.owner_id, owner)
	if not res then
		return res, "uci section failed"
	end

	self:commit(PC_CONFIG_NAME, PC_RELOAD_CMD)
	debug("===> opcode 0x0427: tmp_modify_baseinfo end")
	debug("")
	local ret = {}
	local result = {}
	ret.result = luci.json.encode(result)
	return ret
end

function AVIRA_GATHER:tmp_get_devicelist(app_form)
	local data = json.decode(app_form.data)
	local res = {}
	local result = {}

	local owner_id = data.owner_id
	local start_index = tonumber(data.start_index)
	local amount = tonumber(data.amount)
	local total = 0
	local client_list = {}
	local client_online = cli.get_client_list()

	debug("")
	debug("===> opcode 0x0428: tmp_get_devicelist")

	local clients = tmcli.get_client_list_by(tostring(owner_id))
	for i, v in ipairs(clients) do
		if total >= start_index and total < start_index + amount then
			local client = {}
			local name = cli.match_history_list(v.mac) or v.name or "network device"
			client.name = nixio.bin.b64encode(name)
			client.mac = v.mac
			client.client_type = v.type or "other"
			client.online = false
			for k, element in ipairs(client_online) do
				-- NOTE: compare mac
				if element.mac == v.mac then
					client.online = true
					break
				end
			end
			client_list[#client_list + 1] = client
		end
		total = total + 1
	end

	result.owner_id = owner_id
	result.start_index = start_index
	result.amount = #client_list
	result.sum = total
	result.client_list = client_list

	res.result = json.encode(result)
	debug("====== print return table ======")
	debug_tbl(result)
	debug("====== print return table ======")
	debug("===> opcode 0x0428: tmp_get_devicelist end")
	debug("")
	return res
end

function AVIRA_GATHER:tmp_set_bonustime(app_form)
	local data = json.decode(app_form.data)
	local owner = {}
	local mins = os.date("%M")
	local hours = os.date("%H")
	local current_mins = mins + hours*60
	local newBonusTime, newRewardsTime

	debug("")
	debug("===> opcode 0x0515: tmp_set_bonustime")
	owner.owner_id = data.ownerId
	if uci_r:get(PC_CONFIG_NAME, owner.owner_id) ~= "owner" then
		return false, "no such owner"
	end
	
	-- NOTE: 添加对Reward功能支持, APP传入参数在"adjustAllowedTime"和"newBonusTime"中二选其一，前者可以为负数，后者只会是正数或者-1。
	-- 1. 把adjustAllowedTime为正数时的数值转换为旧版本的bonusTime，其和上一版本的奖励时长功能完全相同；当值为负数时，转换为正数用于存储和计算。
	if data.adjustAllowedTime ~= nil then
		if data.adjustAllowedTime < 0 then
			newRewardsTime = tonumber(data.adjustAllowedTime) or 0
			newRewardsTime = math.abs(newRewardsTime)
		else
			newBonusTime = tonumber(data.adjustAllowedTime) or 0
			if newBonusTime == 3000 then
				newBonusTime = -1
			end
		end
	elseif data.newBonusTime ~= nil then
		newBonusTime = tonumber(data.newBonusTime) or 0
	else
		return false, "format error"
	end


	if newRewardsTime ~= nil then
		--[[ 2.1 处理惩罚时间，用于减少当天上网总时长，使用上优先减去timeLimits部分，减空后再扣除bonus部分。
				 (1) todayOnline (2) todayTimeLimit (3) todayBonusTime (4) todayRewardsTime
				 reward time should <= remain time
		]]
		local todayOnline, _ = getOnlineTime(owner.owner_id)
		local todayTimeLimit = getTimeLimits(owner.owner_id, "1")
		local todayBonusTime = getBonusTime(owner.owner_id, "1")
		local todayRewardsTime = getRewardTime(owner.owner_id, "1")
		local totalTime = todayTimeLimit + todayBonusTime - todayRewardsTime
		if totalTime > 1440 then
			todayRewardsTime = todayRewardsTime + totalTime - 1440
			totalTime = 1440
		end
		local remainTime = totalTime - todayOnline
		if remainTime < 0 then
			remainTime = 0
		end
		if newRewardsTime == 3000 then
			owner.today_reward_time = todayTimeLimit + todayBonusTime - todayOnline
		else
			newRewardsTime = math.min(newRewardsTime, remainTime)
			owner.today_reward_time = todayRewardsTime + newRewardsTime
		end
	elseif newBonusTime ~= nil then
		--[[ 2.2 处理奖励时长：
			简化原来的跨天处理，只有在当天申请时的时间点加上申请奖励时长超过了24点时，才会产生跨天记录，其他情况下不做处理。
		]]
		local todayBonusTime = getBonusTime(owner.owner_id, "1")
		if newBonusTime == -1 then
			owner.today_bonus_time = 1440 + todayBonusTime
		else
			owner.today_bonus_time = newBonusTime + todayBonusTime
		end
		if owner.today_bonus_time > 1440 then
			local todayRewardsTime = getRewardTime(owner.owner_id, "1")
			local beyondBonusTime = owner.today_bonus_time - 1440
			if beyondBonusTime <= todayRewardsTime then
				owner.today_reward_time = todayRewardsTime - beyondBonusTime
			else
				owner.today_reward_time = 0
			end
			owner.today_bonus_time = 1440
		end
			-- 跨天
		if newBonusTime ~= -1 then
			crossDay = uci_r:get(PC_CONFIG_NAME, owner.owner_id, "cross_day") or "false"
			if crossDay == "false" then
				local endTime = current_mins + newBonusTime
				if endTime > 1440 then
					owner.bonus_end = endTime - 1440
					owner.cross_day = "true"
				end
			end
		end
	else
		return false, "something wrong happened"
	end


	local res = uci_r:section(PC_CONFIG_NAME, "owner", owner.owner_id, owner)
	if not res then
		return res, "uci section failed"
	end

	self:commit(PC_CONFIG_NAME, PC_RELOAD_CMD)
	debug("===> opcode 0x0515: tmp_set_bonustime end")
	debug("")
	local ret = {}
	local result = {}
	ret.result = luci.json.encode(result)
	return ret
end

function AVIRA_GATHER:tmp_set_devicelist(app_form)
	local data = json.decode(app_form.data)
	local cli = {}
	cli.owner_id = data.ownerId
	cli.mac_list = data.allDeviceMac

	debug("")
	debug("===> opcode 0x0516: tmp_set_devicelist")
	local max_dev = get_max_prio_devices()
	local dev_count = #cli.mac_list
	if dev_count > max_dev then
		debug("clients num exceeds max num limit")
		return false, "clients num exceeds max num limit"
	end
	-- NOTE: Step1, remove all clients
	tmcli.remove_client_list_for(tostring(cli.owner_id))

	-- NOTE: Step2, add clients
	local res, errorcode = add_clients(cli)
	if not res then
		return res, errorcode
	end

	-- NOTE: Add pc reload op after set device mac to client_mgmt
	sys.fork_exec(PC_RELOAD_CMD)

	debug("===> opcode 0x0516: tmp_set_devicelist end")
	debug("")
	local ret = {}
	local result = {}
	ret.result = luci.json.encode(result)
	return ret
end
--	NOTE: avira family care functions end

--	NOTE: homecare scan
function AVIRA_GATHER:tmp_scan_start(app_form)
	local data = json.decode(app_form.data)
	local scanType = data.scanType
	local ret, error_code, fp
	local cnt
	local status = "scanning"

	debug("")
	debug("===> opcode 0x0951: scan_start")
	os.execute("rm -f " .. WLAN_SCAN_STARTED_FILE)
	local scan_count = uci_r:get(PC_CONFIG_NAME, "settings", "scan_count") or 0
	if scanType == "networkSecurity" then
		--NOTE: NetworkSecurity scan start
		scan_count = scan_count + 1
		uci_r:set(PC_CONFIG_NAME, "settings", "scan_count", scan_count)
		uci_r:commit(PC_CONFIG_NAME)
	elseif scanType == "devicesSecurity" then
		-- NOTE: devicesSecurity scan start
		scan_count = scan_count + 1
		uci_r:set(PC_CONFIG_NAME, "settings", "scan_count", scan_count)
		uci_r:commit(PC_CONFIG_NAME)

		-- NOTE: fork process to scan.
		local pid = nixio.fork()
		if pid == 0 then
			local cpid = nixio.getpid()
			local file = io.open("/tmp/run/scan_devices.pid", "w")
			if file then
				file:write(cpid)
				file:close()
			end

			if nixio.fs.dir("/tmp/avira") ~= nil then
				os.execute("rm -rf /tmp/avira")
			end
			nixio.fs.mkdir("/tmp/avira")

			local URL = "http://localhost:8888/actions"
			local HEADER = "X-API-Key: 15q263r1-8os4-4o06-849n-29nns1q35383"
			local TYPE = "Content-type: application/json"
			local RESULT_FILE = "/tmp/avira/scan_result"

			if data.clientInfoList ~= nil then
				for k, v in ipairs(data.clientInfoList) do
					cnt = 1
					if status == "timeout" then
						break
					end
					-- NOTE: first, set device data struct
					local device = {}
					local fp, ret
					device.id = v.deviceId
					device.type = "actions"
					local device_attr = {}
					device_attr.actionType = "scan"
					device_attr.mac = v.mac:upper()
					device_attr.scanPorts = true
					device_attr.checkCredentials = {"ssh", "telnet", "httpBasicAuth"}
					device_attr.resultsPath = "/tmp/avira/" .. device_attr.mac .. ".tmp"
					device.attributes = device_attr

					-- NOTE: second, send http request
					fp = io.popen("curl -H \"%s\" -H \"%s\" -X POST -d \'%s\' --connect-timeout 8 %s" % {HEADER, TYPE, json.encode(device), URL})
					if fp then
						ret = fp:read("*all")
						fp:close()
					end

					if ret ~= nil and ret.errors ~= nil and ret.errors.code ~= nil then
						debug("#####scan device[ " .. v.id .. " ] error happened: " .. ret.errors.code .. "#####")
						break
					end

					while not nixio.fs.access(device_attr.resultsPath) do
						if cnt > 10 then
							debug("#####scan device[ " .. v.deviceId .. " ] error happened: Scan timeout!!!#####")
							status = "timeout"
							break
						end
						nixio.nanosleep(3,0)
						cnt = cnt + 1
					end
				end
			end
			-- NOTE: Finish scan, remove pid file!!!
			os.remove("/tmp/run/scan_devices.pid")
		end
	elseif scanType == "networkQuality" then
		--NOTE: networkQuality scan start
		ret = wlan.is_wlan_optimize_support()
		if ret == true then
			scan_count = scan_count + 1
			os.execute("echo -n '1' > " .. WLAN_OPTIMIZE_SCAN_IN_PROGRESS)
			local lock_status = get_wireless_lock()
			if lock_status == "unlocked" then
				wlan.Apcfg():get_best_channel()
				os.execute("echo -e \"wlan_scan_started: 1\"" .. " > " .. WLAN_SCAN_STARTED_FILE)
			end
			uci_r:set(PC_CONFIG_NAME, "settings", "scan_count", scan_count)
			uci_r:commit(PC_CONFIG_NAME)
		else
			debug("===> opcode 0x0951: tmp_scan_start end")
			debug("")
			return ret
		end
	end

	debug("===> opcode 0x0951: tmp_scan_start end")
	debug("")
	local res = {}
	local result = {}
	res.result = luci.json.encode(result)
	return res
end

function AVIRA_GATHER:tmp_scan_stop(app_form)
	local data = json.decode(app_form.data)
	local scanType = data.scanType

	debug("")
	debug("===> opcode 0x0952: tmp_scan_stop")
	if scanType == "networkSecurity" then
		-- do nothing!!
	elseif scanType == "devicesSecurity" then
		-- TODO: kill script !!!
		local file = io.open("/tmp/run/scan_devices.pid", "r")
		local cpid
		if file then
			cpid = file:read("*all")
			file:close()
		end
		if cpid ~= nil then
			nixio.kill(cpid, 9)
		end
		-- NOTE: stop scan, remove pid file!!!
		os.remove("/tmp/run/scan_devices.pid")
	elseif scanType == "networkQuality" then
		-- NOTE: Remove scan record
		os.execute("rm -f " .. WLAN_OPTIMIZE_SCAN_RESULT_2G .. " " .. WLAN_OPTIMIZE_SCAN_RESULT_5G .. " " .. WLAN_OPTIMIZE_SCAN_RESULT_5G_2 .. " " .. WLAN_OPTIMIZE_SCAN_RESULT_6G)
		-- NOTE: Reset scan state
		os.execute("echo -n '0' > " .. WLAN_OPTIMIZE_SCAN_IN_PROGRESS)
		-- NOTE: Reset set state
		os.execute("echo -n '0' > " .. WLAN_OPTIMIZE_SET_IN_PROGRESS)
		os.execute("rm -f " .. WLAN_SCAN_STARTED_FILE)
	end

	debug("===> opcode 0x0952: tmp_scan_stop end")
	debug("")
	local ret = {}
	local result = {}
	ret.result = luci.json.encode(result)
	return ret
end

--[[
	NOTE:
	1. 检测项的状态分为5种，"checking", "waiting", "safe", "unsafe","unknown",分别对应检测中、待检测、安全、不安全、未知。 当启动扫描后，所有未检测到的项目，设备端都要返回"waiting"，当用户突然中断扫描后，所有未检测到的项目，设备端都要返回"unknown"，若该设备从未扫描过，那所有项也返回"unknown"。
	2. 针对信道质量状态信息获取，还增加了”optimizing“这一状态，因为多了信道质量优化这一需求，所以顺便增加一个状态来表明是否正在优化中。
	3. 如何知道某种类型的扫描是否已经结束？
	(1) 对于“扫描网络安全”和“扫描信道质量”来说，只要Get请求中不出现“checking”、 “waiting”或“optimazing”这三种状态，就认为已经扫描结束。
	(2) 对于“扫描设备安全”来说，在Get请求结果中新增加了state字段，当其值为”idle”时，则认为设备安全扫描结束
]]

function AVIRA_GATHER:tmp_get_networkscaninfo(app_form)
	local result = {}
	local res = {}
	local remote = "off"
	local pt_enable = "off"
	local vs_enable = "off"
	local support_triband = wlan.wireless_support_triband()
	local support_6g = wlan.wireless_support_6g()
	local secure_split_support = uci_r:get_profile("avira","secure_split_support") or "no"

	debug("")
	debug("===> opcode 0x0953: tmp_get_networkscaninfo")
	local form = {}
	local strength_2g = {}
	local strength_5g = {}
	local strength_5g_2 = {}
	local strength_6g = {}
	local result = {}
	local wps_form = {}
	local wps_data = {}

	if support_triband == "yes" then
		if support_6g == "yes" then
			form = {"wireless_2g", "wireless_5g", "wireless_6g", "guest_2g", "guest_5g", "guest_6g"}
		else
			form = {"wireless_2g", "wireless_5g", "wireless_5g_2", "guest_2g", "guest_5g", "guest_5g_2"}
		end
	else
		form = {"wireless_2g", "wireless_5g", "guest_2g", "guest_5g"}
	end	
	local data = wlan.Apcfg(form):read()

	wps_form = { "syspara_wps" }
	wps_data = wlan.Apcfg(wps_form):read()

	result.wifiPwdStrengthList = {}
	strength_2g.connType = "2.4G"
	if data.wireless_2g_encryption == "none" then
		strength_2g.pwdStrength = "0"
	else
		strength_2g.pwdStrength = checkPwdStrength(data.wireless_2g_psk_key)
	end
	if secure_split_support == "yes" then
		strength_2g.encryption = checkencryption(data, "wireless_2g_")
	end
	result.wifiPwdStrengthList[#result.wifiPwdStrengthList+1] = strength_2g

	if support_triband == "yes" then
		if support_6g == "yes" then
			strength_5g.connType = "5G"
		else
			strength_5g.connType = "5G-1"
		end
	else
		strength_5g.connType = "5G"
	end
	if data.wireless_5g_encryption == "none" then
		strength_5g.pwdStrength = "0"
	else
		strength_5g.pwdStrength = checkPwdStrength(data.wireless_5g_psk_key)
	end
	if secure_split_support == "yes" then
		strength_5g.encryption = checkencryption(data, "wireless_5g_")
	end
	result.wifiPwdStrengthList[#result.wifiPwdStrengthList+1] = strength_5g

	if support_triband == "yes" then
		if support_6g == "yes" then
			strength_6g.connType = "6G"
			if data.wireless_6g_encryption == "owe" then
				strength_6g.pwdStrength = "0"
			else
				strength_6g.pwdStrength = checkPwdStrength(data.wireless_6g_psk_key)
			end
			result.wifiPwdStrengthList[#result.wifiPwdStrengthList+1] = strength_6g
		else
			strength_5g_2.connType = "5G-2"
			if data.wireless_5g_2_encryption == "none" then
				strength_5g_2.pwdStrength = "0"
			else
				strength_5g_2.pwdStrength = checkPwdStrength(data.wireless_5g_2_psk_key)
			end
			result.wifiPwdStrengthList[#result.wifiPwdStrengthList+1] = strength_5g_2
		end
		if secure_split_support == "yes" then
			strength_5g_2.encryption = checkencryption(data, "wireless_5g_2_")
		end
		result.wifiPwdStrengthList[#result.wifiPwdStrengthList+1] = strength_5g_2
	end

	if support_triband == "yes" then
		if support_6g == "yes" then
			if data.guest_2g_enable == "off" and data.guest_5g_enable == "off" and data.guest_6g_enable == "off" then
				result.guestNetwork = "safe"
			else
				result.guestNetwork = "unsafe"
			end
		else
			if data.guest_2g_enable == "off" and data.guest_5g_enable == "off" and data.guest_5g_2_enable == "off" then
				result.guestNetwork = "safe"
			else
				result.guestNetwork = "unsafe"
			end
		end
	else
		if data.guest_2g_enable == "off" and data.guest_5g_enable == "off" then
			result.guestNetwork = "safe"
		else
			result.guestNetwork = "unsafe"
		end
	end

	result.WPS = wps_data.syspara_wps_wps == "on" and "unsafe" or "safe"

	result.UPnP = uci_r:get("upnpd", "config", "enable_upnp") == "1" and "unsafe" or "safe"
	result.DMZ = uci_r:get("nat", "dmz", "enable") == "on" and "unsafe" or "safe"

	remote = uci_r:get("administration", "remote", "enable") or "off"
	if remote == "all" or remote == "partial" then
		result.viewPageViaWAN = "unsafe"
	else
		result.viewPageViaWAN = "safe"
	end
	result.pingViaWAN = uci_r:get("basic_security", "settings", "wan_ping") == "on" and "unsafe" or "safe"

	uci_r:foreach("nat", "rule_pt",
		function(section)
			if section.enable == "on" then
				pt_enable = section.enable
				return false
			end
		end
	)
	result.portTrigger = pt_enable == "off" and "safe" or "unsafe"

	uci_r:foreach("nat", "rule_vs",
		function(section)
			if section.enable == "on" then
				vs_enable = section.enable
				return false
			end
		end
	)
	result.portForwarding = vs_enable == "off" and "safe" or "unsafe"

	local cloud = require "luci.controller.admin.cloud_account"
	local ret = cloud.get_fw_list()
	if ret == false then
		local need_upgrade = uci_r:get("cloud_config", "new_firmware", "fw_new_notify") or "0"
		if need_upgrade == "1" then
			result.firmwareVer = "unsafe"  -- cloud Unreachable
		else
			result.firmwareVer = "safe"
		end
	elseif ret.latest_flag == true then
		result.firmwareVer = "safe"
	elseif ret.latest_flag == false then
		result.firmwareVer = "unsafe"
	else
		result.firmwareVer = "unknown"
	end

	if secure_split_support == "yes" then
		-- viewPageViaWAN
		local https_support = uci_r:get_profile("https_mgnt", "https_support") or "no"
		local remote_enable
		if https_support == "yes" then
		    remote_enable = uci_r:get("administration", "remote", "enable") or "off"
		    result.viewPageViaWAN = remote_enable == "off" and "safe" or "unsafe"
		else
		    result.viewPageViaWAN = "unsupported"
		end
		-- pingViaWAN
		wan_ping_enable = uci_r:get("basic_security", "settings", "wan_ping") or "off"
		result.pingViaWAN = wan_ping_enable == "off" and "safe" or "unsafe"
	end
	res.result = json.encode(result)
	debug("====== print return table ======")
	debug_tbl(result)
	debug("====== print return table ======")
	debug("===> opcode 0x0953: tmp_get_networkscaninfo end")
	debug("")
	return res
end

function AVIRA_GATHER:tmp_get_devicesscaninfo(app_form)
	local data = json.decode(app_form.data)
	local startIndex = data.startIndex
	local amount = data.amount
	local client_list = {}
	local result = {}
	local res = {}
	local flag_mac_is_tp = false
	local total = 0

	debug("")
	debug("===> opcode 0x0954: tmp_get_devicesscaninfo")

	local prefix_path = "/tmp/avira"
	local iterator = nixio.fs.dir(prefix_path)
	local filename = iterator()

	local status

	while filename do
		-- ignore hidden file
		if filename:find("%.") ~= 1 then
			local statbuf = nixio.fs.stat(prefix_path .. "/" .. filename)
			if statbuf ~= nil then
				if statbuf.type ~= "dir" and string.find(filename, "%.tmp") ~= nil then
					if total >= startIndex and total < startIndex + amount then
						local fp, ret
						local client = {}
						flag_mac_is_tp = false
						fp = io.open("/tmp/avira/"..filename, "r")
						ret = json.decode(fp:read("*all")).data
						client.mac = ret.attributes.mac
						flag_mac_is_tp = check_mac_is_tp(client.mac)
						client.ip = ret.attributes.ip
						client.riskInfo = {}
						-- normal, at risk, vulnerable
						client.riskInfo.status = ret.attributes.status
						client.riskInfo.services = ret.attributes.services or {}
						client.riskInfo.vulnerabilities = {}
						if ret.attributes.vulnerabilities ~= nil then
							for k, v in pairs(ret.attributes.vulnerabilities) do
								if v.service == "ssh" then
									client.riskInfo.vulnerabilities[#client.riskInfo.vulnerabilities+1] = 22
								elseif v.service == "telnet" then
									client.riskInfo.vulnerabilities[#client.riskInfo.vulnerabilities+1] = 23
								elseif v.service == "http" then
									client.riskInfo.vulnerabilities[#client.riskInfo.vulnerabilities+1] = 80
								end
							end
						end
						fp:close()
						if flag_mac_is_tp == true then
							client.riskInfo.status = "normal"
							client.riskInfo.services = {}
							client.riskInfo.vulnerabilities = {}
						end
						client_list[#client_list+1] = client
					end
					total = total + 1
				end
			end
		end
			filename = iterator()
		end

	result.startIndex = startIndex
	result.amount = #client_list
	result.sum = total
	result.clientList = client_list

	if nixio.fs.access("/tmp/run/scan_devices.pid") then
		result.scanState = "scanning"
	else
		result.scanState = "idle"
	end

	res.result = json.encode(result)
	debug("====== print return table ======")
	debug_tbl(result)
	debug("====== print return table ======")
	debug("===> opcode 0x0954: tmp_get_devicesscaninfo end")
	debug("")
	return res
end

local function is_wlan_optimize_need(params)
	if nixio.fs.access(WLAN_OPTIMIZE_ITEM) then
		os.execute("rm " .. WLAN_OPTIMIZE_ITEM)
	end
	local support_triband = wlan.wireless_support_triband()
	local support_6g = wlan.wireless_support_6g()
	dbg.printf("support_triband: " .. support_triband)
	dbg.printf("support_6g: " .. support_6g)
	local best_channel = wlan.Apcfg():get_best_channel_result()

	local cur_channel_2g = wlan.Apcfg("wireless_2g"):read_data().current_channel
	dbg.printf("cur_channel_2g: " .. cur_channel_2g)
	local cur_channel_5g = wlan.Apcfg("wireless_5g"):read_data().current_channel
	dbg.printf("cur_channel_5g: " .. cur_channel_5g)

	local channel_2g_set = 0
	local channel_5g_set = 0    

	local best_channel_2g = nil
	local best_channel_5g = nil     

	local optimize_item = {}
	optimize_item.band2 = {}
	optimize_item.band5 = {}

	local cur_channel_5g_2 = 0
	local cur_channel_6g = 0
	if support_triband == "yes" then
		if support_6g == "yes" then
			cur_channel_6g = wlan.Apcfg("wireless_6g"):read_data().current_channel
			dbg.printf("cur_channel_6g: " .. cur_channel_6g)
		else
			cur_channel_5g_2 = wlan.Apcfg("wireless_5g_2"):read_data().current_channel
			dbg.printf("cur_channel_5g_2: " .. cur_channel_5g_2)
		end
	end

	local channel_5g2_set = 0 
	local best_channel_5g_2 = nil
	optimize_item.band5_2 = {}

	local channel_6g_set = 0 
	local best_channel_6g = nil
	optimize_item.band6 = {}

	if best_channel["band2"] ~= nil and best_channel["band2"].channel ~= nil then
		best_channel_2g = tonumber(best_channel["band2"].channel)
		dbg.printf("best_channel_2g: " .. best_channel_2g)
	end

	if best_channel["band5"] ~= nil and best_channel["band5"].channel ~= nil then
		best_channel_5g = tonumber(best_channel["band5"].channel)
		dbg.printf("best_channel_5g: " .. best_channel_5g)
	end

	if support_6g == "yes" then
		if support_triband == "yes" and best_channel["band6"] ~= nil and best_channel["band6"].channel ~= nil then
			best_channel_6g = tonumber(best_channel["band6"].channel)
			dbg.printf("best_channel_6g: " .. best_channel_6g)
		end
	else
		if support_triband == "yes" and best_channel["band5_2"] ~= nil and best_channel["band5_2"].channel ~= nil then
			best_channel_5g_2 = tonumber(best_channel["band5_2"].channel)
			dbg.printf("best_channel_5g_2: " .. best_channel_5g_2)
		end
	end

	if best_channel_2g == 0 or best_channel_5g == 0 or best_channel_5g_2 == 0 or best_channel_6g == 0 then
		if best_channel_2g ~= nil and best_channel_2g ~= 0 then
			os.execute("echo -n " .. best_channel_2g .. " > " .. WLAN_OPTIMIZE_SCAN_RESULT_2G)
		end
		if best_channel_5g ~= nil and best_channel_5g ~= 0 then
			os.execute("echo -n " .. best_channel_5g .. " > " .. WLAN_OPTIMIZE_SCAN_RESULT_5G)
		end
		if support_6g == "yes" then
			if support_triband == "yes" and best_channel_6g ~= nil and best_channel_6g ~= 0 then
				os.execute("echo -n " .. best_channel_6g .. " > " .. WLAN_OPTIMIZE_SCAN_RESULT_6G)
			end
		else
			if support_triband == "yes" and best_channel_5g_2 ~= nil and best_channel_5g_2 ~= 0 then
				os.execute("echo -n " .. best_channel_5g_2 .. " > " .. WLAN_OPTIMIZE_SCAN_RESULT_5G_2)
			end
		end
		return "checking"
	end

	if nil ~= best_channel_2g and tonumber(cur_channel_2g) ~= best_channel_2g then
		optimize_item.band2.channel = best_channel_2g
		channel_2g_set = 1
	end

	if nil ~= best_channel_5g and tonumber(cur_channel_5g) ~= best_channel_5g then
		optimize_item.band5.channel = best_channel_5g
		channel_5g_set = 1
	end

	if support_6g == "yes" then
		if support_triband == "yes" and nil ~= best_channel_6g and tonumber(cur_channel_6g) ~= best_channel_6g then
			optimize_item.band6.channel = best_channel_6g
			channel_6g_set = 1
		end
	else
		if support_triband == "yes" and nil ~= best_channel_5g_2 and tonumber(cur_channel_5g_2) ~= best_channel_5g_2 then
			optimize_item.band5_2.channel = best_channel_5g_2
			channel_5g2_set = 1
		end
	end

	debug("optimize_item :")
	debug_tbl(optimize_item)

	local f = io.open(WLAN_OPTIMIZE_ITEM, "w")
	local data = json.encode(optimize_item)
	f:write(data)
	f:close()

	os.execute("rm -f " .. WLAN_OPTIMIZE_SCAN_RESULT_2G .. " " .. WLAN_OPTIMIZE_SCAN_RESULT_5G .. " " .. WLAN_OPTIMIZE_SCAN_RESULT_5G_2 .. " " .. WLAN_OPTIMIZE_SCAN_RESULT_6G)
	os.execute("echo -n '0' > " .. WLAN_OPTIMIZE_SCAN_IN_PROGRESS)

	if channel_2g_set == 1 or channel_5g_set == 1 or (support_triband == "yes" and channel_5g2_set == 1) or (support_triband == "yes" and support_6g == "yes" and channel_6g_set == 1) then
		debug("Need to optimize network")
		return true
	else
		debug("No need to optimize network")
		return false
	end
end

-- TODO: best_channel need to redefined.
local function set_best_channel(params)
	if not params then 
		return false
	end

	local need_set = false
	local cfg = {}
	local ap_cfg = nil

	-- 2g
	if params.channel_2g then
		debug("### set_best_channel 2g : " .. params.channel_2g)
		need_set = true
		-- local ap_2g = wlan.Apcfg("wireless_2g", {"channel"})
		-- local cfg = {channel=tostring(params.channel_2g), form="wireless_2g", operation="write"}		
		-- ap_2g:write(cfg)
		cfg["wireless_2g_channel"] = tostring(params.channel_2g)
	end

	-- 5g
	if params.channel_5g then
		debug("### set_best_channel 5g : " .. params.channel_5g)
		need_set = true
		-- local ap_5g = wlan.Apcfg("wireless_5g", {"channel"})
		-- local cfg = {channel=tostring(params.channel_5g), form="wireless_5g", operation="write"}			
		-- ap_5g:write(cfg)
		cfg["wireless_5g_channel"] = tostring(params.channel_5g)
	end

	-- 5g_2
	if wlan.wireless_support_triband() == "yes" then
		if wlan.wireless_support_6g() == "yes" then
			if params.channel_6g then
				debug("### set_best_channel 6g : " .. params.channel_6g)
				need_set = true	
				-- local ap_6g = wlan.Apcfg("wireless_6g", {"channel"})
				-- local cfg = {channel=tostring(params.channel_6g), form="wireless_6g", operation="write"}							
				-- ap_6g:write(cfg)
				cfg["wireless_6g_channel"] = tostring(params.channel_6g)
			end
		else
			if params.channel_5g_2 then
				debug("### set_best_channel 5g_2 : " .. params.channel_5g_2)
				need_set = true	
				-- local ap_5g_2 = wlan.Apcfg("wireless_5g_2", {"channel"})
				-- local cfg = {channel=tostring(params.channel_5g_2), form="wireless_5g_2", operation="write"}							
				-- ap_5g_2:write(cfg)
				cfg["wireless_5g_2_channel"] = tostring(params.channel_5g_2)
			end
		end
	end

	dbg.dumptable(cfg)

	if need_set == true then
		if wlan.wireless_support_triband() == "yes" then
			if wlan.wireless_support_6g() == "yes" then
				ap_cfg = wlan.Apcfg({"wireless_2g", "wireless_5g", "wireless_6g"})
				ap_cfg:write(cfg)
			else
				ap_cfg = wlan.Apcfg({"wireless_2g", "wireless_5g", "wireless_5g_2"})
				ap_cfg:write(cfg)
			end
		else
			ap_cfg = wlan.Apcfg({"wireless_2g", "wireless_5g"})
			ap_cfg:write(cfg)
		end
	end

	os.execute("echo -n '0' > " .. WLAN_OPTIMIZE_SET_IN_PROGRESS)
	return true
end

-- TODO: We now synchronized check if optimize is needed, we may change to asynchronous way
function AVIRA_GATHER:tmp_get_networkqualityinfo()
	local res = {}
	local result = {}
	local scan_in_progress
	local set_in_progress
	local is_need_optimize

	debug("")
	debug("===> opcode 0x0955: tmp_get_networkqualityinfo")

	if nixio.fs.access(WLAN_OPTIMIZE_SCAN_IN_PROGRESS) then
		local f = io.open(WLAN_OPTIMIZE_SCAN_IN_PROGRESS, "r")
		if not f then
			return false, "open file failed"
		end

		scan_in_progress = f:read("*a")
		f:close()
	end

	if nixio.fs.access(WLAN_OPTIMIZE_SET_IN_PROGRESS) then
		local f = io.open(WLAN_OPTIMIZE_SET_IN_PROGRESS, "r")
		if not f then
			return false, "open file failed"
		end

		set_in_progress = f:read("*a")
		f:close()
	end

	if scan_in_progress == "1" then
		local lock_status = get_wireless_lock() 
		if lock_status == "locked" then
			result.channelQuality = "checking"
			os.execute("rm -f " .. WLAN_SCAN_STARTED_FILE)
		else
			local wlan_scan_started = is_wlan_scan_started()
			if wlan_scan_started == false then
				os.execute("echo -e \"wlan_scan_started: 1\"" .. " > " .. WLAN_SCAN_STARTED_FILE)
				wlan.Apcfg():get_best_channel()
				result.channelQuality = "checking"
			else
				is_need_optimize = is_wlan_optimize_need()
				if is_need_optimize == true then
					result.channelQuality = "unsafe"
				elseif is_need_optimize == false then
					result.channelQuality = "safe"
				elseif is_need_optimize == "checking" then
					result.channelQuality = "checking"
				end
			end
		end
	elseif set_in_progress == "1" then
		result.channelQuality = "optimizing"
	else
		if nixio.fs.access(WLAN_OPTIMIZE_ITEM) then
			result.channelQuality = "unsafe"
		else
			result.channelQuality = "safe"
		end
	end

	res.result = json.encode(result)
	debug("====== print return table ======")
	debug_tbl(result)
	debug("====== print return table ======")
	debug("===> opcode 0x0955: tmp_get_networkqualityinfo end")
	debug("")
	return res
end

function AVIRA_GATHER:tmp_optimize_networkquality(app_form)
	local data = json.decode(app_form.data)
	local optimizeType = data.optimizeType
	--	TODO: do optimize

	debug("")
	debug("===> opcode 0x0956: tmp_optimize_networkquality")
	if optimizeType == "channel" then
		local support = wlan.is_wlan_optimize_support()
		if support == false then
			return false
		end

		-- NOTE: Store configure
		local optimize_count = uci_r:get(PC_CONFIG_NAME, "settings", "optimize_count") or 0
		optimize_count = optimize_count + 1
		uci_r:set(PC_CONFIG_NAME, "settings", "optimize_count", optimize_count)
		uci_r:commit(PC_CONFIG_NAME)
		local optimize_item 
		local set_item = {}

		if nixio.fs.access(WLAN_OPTIMIZE_ITEM) then
			local f = io.open(WLAN_OPTIMIZE_ITEM, "r")
			if not f then
				return false, "open file failed"
			end

			optimize_item = json.decode(f:read("*a"))
			f:close()

			if not optimize_item then
				return false, "falied to get wlan_optimize_item info"
			end
		end

		os.execute("echo -n '1' > " .. WLAN_OPTIMIZE_SET_IN_PROGRESS)

		if optimize_item.band2 and optimize_item.band2.channel then
			set_item.channel_2g = optimize_item.band2.channel
		end

		if optimize_item.band5 and optimize_item.band5.channel then
			set_item.channel_5g = optimize_item.band5.channel
		end

		if wlan.wireless_support_triband() == "yes" then
			if wlan.wireless_support_6g() == "yes" then
				if optimize_item.band6 and optimize_item.band6.channel then
					set_item.channel_6g = optimize_item.band6.channel
				end
			else
				if optimize_item.band5_2 and optimize_item.band5_2.channel then
					set_item.channel_5g_2 = optimize_item.band5_2.channel
				end
			end
		end

		local ret = set_best_channel(set_item)

		debug("===> opcode 0x0956: tmp_optimize_networkquality end")
		debug("")
		if not ret then
			return false
		else
			os.execute("rm " .. WLAN_OPTIMIZE_ITEM)
			local res = {}
			local result = {}
			res.result = luci.json.encode(result)
			return res
		end
	else
		debug("===> opcode 0x0956: tmp_optimize_networkquality end")
		debug("")
		return false
	end
end
--	NOTE: homecare scan end

function AVIRA_GATHER:tmp_get_secinfo(app_form)
	local result = {}
	local res = {}

	debug("")
	debug("===> opcode 0x0470: tmp_get_secinfo")
	-- NOTE: default on
	local enable = uci_r:get(PC_CONFIG_NAME, "settings", "sec_enable") or "true"
	if enable == "false" then
		result.enable = false
	else
		result.enable = true
	end

	res.result = json.encode(result)
	debug("====== print return table ======")
	debug_tbl(result)
	debug("====== print return table ======")
	debug("===> opcode 0x0470: tmp_get_secinfo end")
	debug("")
	return res
end

function AVIRA_GATHER:tmp_set_secinfo(app_form)
	local data = json.decode(app_form.data)

	debug("")
	debug("===> opcode 0x0471: tmp_set_secinfo")
	if data.enable == true then
		uci_r:set(PC_CONFIG_NAME, "settings", "sec_enable", "true")
		uci_r:set(PC_CONFIG_NAME, "settings", "sec_state", "true")
	else
		uci_r:set(PC_CONFIG_NAME, "settings", "sec_enable", "false")
		uci_r:set(PC_CONFIG_NAME, "settings", "sec_state", "false")
	end
	self:commit(PC_CONFIG_NAME, PC_RELOAD_CMD)

	debug("===> opcode 0x0471: tmp_set_secinfo end")
	debug("")
	local ret = {}
	local result = {}
	ret.result = luci.json.encode(result)
	return ret
end

function AVIRA_GATHER:tmp_get_secv3info(app_form)
	local result = {}
	local res = {}

	debug("")
	debug("===> opcode 0x0480: tmp_get_secv3info")
	-- NOTE: default on
	local web_sec_enable = uci_r:get(PC_CONFIG_NAME, "settings", "web_sec_enable") or "false"
	if web_sec_enable == "false" then
		result.webProtection = false
	else
		result.webProtection = true
	end

	local intrusion_sec_enable = uci_r:get(PC_CONFIG_NAME, "settings", "intrusion_sec_enable") or "false"
	if intrusion_sec_enable == "false" then
		result.intrusionPrevention = false
	else
		result.intrusionPrevention = true
	end
	
	local iot_sec_enable = uci_r:get(PC_CONFIG_NAME, "settings", "iot_sec_enable") or "false"
	if iot_sec_enable == "false" then
		result.iotPrevention = false
	else
		result.iotPrevention = true
	end

	res.result = json.encode(result)
	debug("====== print return table ======")
	debug_tbl(result)
	debug("====== print return table ======")
	debug("===> opcode 0x0480: tmp_get_secv3info end")
	debug("")
	return res
end

function AVIRA_GATHER:tmp_set_secv3info(app_form)
	local data = json.decode(app_form.data)

	debug("")
	debug("===> opcode 0x0481: tmp_set_secv3info")
	if data.webProtection ~= nil and data.webProtection == true then
		uci_r:set(PC_CONFIG_NAME, "settings", "web_sec_enable", "true")
	else
		uci_r:set(PC_CONFIG_NAME, "settings", "web_sec_enable", "false")
	end

	if data.intrusionPrevention ~= nil and data.intrusionPrevention == true then
		uci_r:set(PC_CONFIG_NAME, "settings", "intrusion_sec_enable", "true")
	else
		uci_r:set(PC_CONFIG_NAME, "settings", "intrusion_sec_enable", "false")
	end
	
	if data.iotPrevention ~= nil and data.iotPrevention == true then
		uci_r:set(PC_CONFIG_NAME, "settings", "iot_sec_enable", "true")
	else
		uci_r:set(PC_CONFIG_NAME, "settings", "iot_sec_enable", "false")
	end

	if data.webProtection == true or data.intrusionPrevention == true or data.iotPrevention == true then
		uci_r:set(PC_CONFIG_NAME, "settings", "sec_enable", "true")
		uci_r:set(PC_CONFIG_NAME, "settings", "sec_state", "true")
	else
		uci_r:set(PC_CONFIG_NAME, "settings", "sec_enable", "false")
		uci_r:set(PC_CONFIG_NAME, "settings", "sec_state", "false")
	end

	self:commit(PC_CONFIG_NAME, PC_RELOAD_CMD)
	
	sys.fork_exec("/etc/init.d/aviraservicemaster reload")

	debug("===> opcode 0x0481: tmp_set_secv3info end")
	debug("")
	local ret = {}
	local result = {}
	ret.result = luci.json.encode(result)
	return ret
end

function AVIRA_GATHER:tmp_cloud_service_state_check(app_form)
	-- Get HomeShield pay status from cloud with interface "/v1/services/get-device-status"
	-- And according to the result, change HomeShield running status.
	debug("")
	debug("===> opcode 0x0463: tmp_cloud_service_state_check")
	local fs = require "luci.fs"
	local check_program = "/usr/sbin/report_get_device_status"
	if fs.isfile(check_program) then
		sys.fork_exec(check_program)
	end
	debug("===> opcode 0x0463: tmp_cloud_service_state_check end")
	debug("")
	return true
end
