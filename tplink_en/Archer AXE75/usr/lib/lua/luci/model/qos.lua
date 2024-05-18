--[[
Copyright(c) 2008-2016 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  qos.lua
Details :  qos for application and device priority
Author  :  Zhu Junjie <zhujunjie@tp-link.net>
Version :  1.0.0
Date    :  8 Nov, 2016
]]--

module("luci.model.qos", package.seeall)

local string = require "string"
local sys    = require "luci.sys"
local io	 = require "io"
local util   = require "luci.util"
local uci    = require "luci.model.uci"
local dbg    = require "luci.tools.debug"
local json  = require "luci.json"
local clientmgmt = require "luci.model.tm_clientmgmt"
local tfs        = require "luci.model.tfstats"
local nat_m = require "luci.model.nat"
local Nat = nat_m.NAT_INST()

local QOS_RESTART_CMD = "/etc/init.d/qos restart &"
local QOS_CONFIG_NAME = "qos_v2"

local CONN_TYPE_TBL = {
	["wired"] = "wired",
	["2.4G"] = "wls_2_4g",
	["5G"] = "wls_5g",
	["2.4G_guest"] = "wls_2_4g_guest",
	["5G_guest"] = "wls_5g_guest",
    ["5G_2"] = "wls_5g_v2",
    ["5G_2_guest"] = "wls_5g_v2_guest",
    ["6G"] = "wls_6g",
    ["6G_guest"] = "wls_6g_guest"
}

--- Get the wireless supports triband or not
-- @para N/A
-- @return
function wireless_support_triband()
	local support_triband
	local uci_r = uci.cursor()
	support_triband = uci_r:get_profile("wireless","support_triband") or "no"
	return support_triband
end

--- Get the wireless supports 6g or not
-- @para N/A
-- @return
function wireless_support_6g()
	local support_6g
	local uci_r = uci.cursor()
	support_6g = uci_r:get_profile("wireless","support_6g") or "no"
	return support_6g
end

local function getConnType(client)
    local ret 
    local wireType = client.wire_type
    local guest = client.guest or ""
    local support_6g = wireless_support_6g()
    
    if guest == "GUEST" then
    	if support_6g == "yes" then
    		if wireType == "2.4G" then
            ret = CONN_TYPE_TBL["2.4G_guest"]
	        elseif wireType == "6G" then
	            ret = CONN_TYPE_TBL["6G_guest"]
	        else
	            ret = CONN_TYPE_TBL["5G_guest"]
	        end
    	else
	        if wireType == "2.4G" then
	            ret = CONN_TYPE_TBL["2.4G_guest"]
	        elseif wireType == "5G_2" then
	            ret = CONN_TYPE_TBL["5G_2_guest"]
	        else
	            ret = CONN_TYPE_TBL["5G_guest"]
	        end
		end
    else
         ret = CONN_TYPE_TBL[wireType]
    end
    
    return  ret 
end

-- Debug console output method.
-- @param    str    String to display on console.
-- @return N/A
function printf(str)
    if str then
        os.execute("echo %q &>/dev/console" % (str))
    end
end

local function _print_tbl(data)
    if type(data) == "table" then
        for i, v in pairs(data) do
            dbg.print(i .. " = " .. tostring(data[i]))
            if type(data[i]) == "table" then
                _print_tbl(data[i])
            end
        end
    end
end

QOS_INST = util.class()
function QOS_INST:__init__()
    self.config = QOS_CONFIG_NAME
    self.uci = uci.cursor()
end

function QOS_INST:get_settings()
    local ret = {}
	
    ret.enable    = self.uci:get(QOS_CONFIG_NAME, "settings", "enable") or "off"
    ret.up_band   = self.uci:get(QOS_CONFIG_NAME, "settings", "up_band") or ""
    ret.down_band = self.uci:get(QOS_CONFIG_NAME, "settings", "down_band") or ""
    ret.up_unit   = self.uci:get(QOS_CONFIG_NAME, "settings", "up_unit") or "kbps"
    ret.down_unit = self.uci:get(QOS_CONFIG_NAME, "settings", "down_unit") or "kbps"
    ret.high      = self.uci:get(QOS_CONFIG_NAME, "settings", "high") or "60"
    ret.middle    = self.uci:get(QOS_CONFIG_NAME, "settings", "middle") or "30"
    ret.low       = self.uci:get(QOS_CONFIG_NAME, "settings", "low") or "10"
    ret.time      = self.uci:get(QOS_CONFIG_NAME, "settings", "time") or "10"
    ret.enable_phy= self.uci:get_profile(QOS_CONFIG_NAME, "by_phy") ~= 0 and "on" or "off"
    ret.enable_app= self.uci:get_profile(QOS_CONFIG_NAME, "by_app") ~= 0 and "on" or "off"
    ret.qos_iptv_compatible = self.uci:get_profile(QOS_CONFIG_NAME, "qos_iptv_compatible") or "no"
    ret.max_wan_speed = self.uci:get_profile(QOS_CONFIG_NAME, "max_wan_speed") or "1000"
    ret.max_up_band = self.uci:get_profile(QOS_CONFIG_NAME, "max_wan_speed") or "1000"
    ret.max_down_band = self.uci:get_profile(QOS_CONFIG_NAME, "max_wan_speed") or "1000"
    
    return ret
end

function QOS_INST:set_settings(form)
    local ret = {}
    local settings = {"enable", "up_band", "down_band", "up_unit", "down_unit", "high", "middle", "low"}
	local qos_enable
    local upband = tonumber(form["up_band"])
    local downband = tonumber(form["down_band"])
    local realUpband = upband
    local realDownband = downband

    local max_up_band = self.uci:get_profile(QOS_CONFIG_NAME, "max_wan_speed") or "1000"
    local max_down_band = self.uci:get_profile(QOS_CONFIG_NAME, "max_wan_speed") or "1000"

    -- check params
    -- the upband/downband isn't nil and the number is legal
    if upband == nil or downband == nil then
        return false
    end

    -- the unit is legal
    if (form["up_unit"] ~= "mbps") and (form["up_unit"] ~= "kbps")  then
        return false
    end
    if (form["down_unit"] ~= "mbps") and (form["down_unit"] ~= "kbps")  then
        return false
    end

    -- the upband/downband is within the allowed range
    if (form["up_unit"] == "mbps") then
        if upband < 1 or upband > tonumber(max_up_band) then
            return false
        end
    else
        if upband < 1 or upband > 1000 then
            return false
        end
    end
    if (form["down_unit"] == "mbps") then
        if downband < 1 or downband > tonumber(max_down_band) then
            return false
        end
    else
        if downband < 1 or downband > 1000 then
            return false
        end
    end

    -- the number of digits after decimal point of upband/downband meets the requirements
    local up_array = string.split(form["up_band"], ".")
    local down_array = string.split(form["down_band"], ".")
    if up_array[2] ~= nil and #up_array[2] > 2 then
        return false
    end
    if down_array[2] ~= nil and #down_array[2] > 2 then
        return false
    end
    

    for _, set in ipairs(settings) do
        local val = form[set]
		if "enable" == set then
			qos_enable = val
		end
        if val ~= nil then
             self.uci:set(QOS_CONFIG_NAME, "settings", set, val)
        end
    end

	if(form["up_unit"] == "mbps") then
		realUpband = math.floor(upband * 1000)
	else
		realUpband = math.floor(upband * 1.0)
	end
	if(form["down_unit"] == "mbps") then
		realDownband = math.floor(downband * 1000)
	else
		realDownband = math.floor(downband * 1.0)
	end
	
	self.uci:set(QOS_CONFIG_NAME, "settings", "rUpband", realUpband)
	self.uci:set(QOS_CONFIG_NAME, "settings", "rDownband", realDownband)

    self.uci:commit(QOS_CONFIG_NAME)
	sys.fork_exec(QOS_RESTART_CMD)
	
	local boost_qos_compatible = self.uci:get_profile("nat", "boost_qos_compatible") or "no"
	local boost_traffic_compatible = self.uci:get_profile("nat", "boost_traffic_compatible") or "no"	
	if boost_qos_compatible == "no" and boost_traffic_compatible == "no" then
		-- sync traffic_statistics config
		local tfs = require "luci.model.tfstats"
		local tfs_t = tfs.TFS_INST()
		local tfs_enable
		if "on" == qos_enable then -- qos_enable is 'on', then off NAT_Boost and on traffic_statistics
			-- enable traffic_statistics
			tfs_enable = "on"
			tfs_t:set_enable(tfs_enable)
		else -- qos_enable is 'off', then on NAT_Boost and off traffic_statistics
			-- disable traffic_statistics
			tfs_enable = "off"
			tfs_t:set_enable(tfs_enable)
		end
	end

	if boost_qos_compatible == "no" then
		-- sync HNAT
		Nat:sync_hnat_status()
	end
	
    return {}
end

local function sort_devlist(dev_list)
    table.sort(dev_list, function(a,b)
        return (a.deviceName < b.deviceName)
    end)
end

local function TrimStr(str)
    local tmpstr = str
    tmpstr = string.gsub(tmpstr, "-", "")
	tmpstr = string.gsub(tmpstr, ":", "")
    str = string.match(tmpstr, "%w+")
    str = str:upper()
    return str
end

local function get_qos_tfs_info()
	local tfs_info_list = {}
	local tfs_t = tfs.TFS_INST()
	local stats_tbl
	local total
	
	stats_tbl, total = tfs.TFS_INST():load_all_stats()
	
	for _, stats in ipairs(stats_tbl) do
		for k,vt in pairs(stats) do
			if k == "mac" then
				tfs_info_list[TrimStr(vt)] = stats
			end
		end
    end
	
	return tfs_info_list
end

local function get_qos_user_info()
	local user_info_list = {}
	local tmp_qos_user_info
	local user_info_list_text
	local user_info_text
	local start_idx
	local end_idx
	local i
	local j
	local down_cumu
	local down_rate
	local up_cumu
	local up_rate
	
	tmp_qos_user_info = io.popen("/tmp/tm-shn/shn_ctrl -a get_qos_user_info")
	if not tmp_qos_user_info then
		printf("tmp_qos_user_info is nil")
		return user_info_list
	end
	
	user_info_list_text = tmp_qos_user_info:read("*all")
	tmp_qos_user_info:close()
	if not user_info_list_text then
		printf("user_info_list_text is nil")
		return user_info_list
	end
	
	end_idx = string.find(user_info_list_text, "uid")
	while end_idx do
		start_idx = end_idx
		end_idx = string.find(user_info_list_text, "uid", start_idx+1)
		if end_idx then
			user_info_text = string.sub(user_info_list_text, start_idx, end_idx-1)
		else
			user_info_text = string.sub(user_info_list_text, start_idx, -1)
		end
		
		local user_info = {}
		_,_,user_info.mac = string.find(user_info_text, "mac%s*:%s*(%w%w:%w%w:%w%w:%w%w:%w%w:%w%w)")
		user_info.traffic = 0
		user_info.down_rate = 0
		user_info.up_rate = 0
		i,j,down_cumu,down_rate,up_cumu,up_rate = string.find(user_info_text, "\n%s*%d+,%d+%s*(%d+),%s*(%d+).-,%s*.-,%s*.-,%s*%d+:%d+%s*(%d+),%s*(%d+)")
		
		while i do
			user_info.traffic = user_info.traffic + down_cumu + up_cumu
			user_info.down_rate = user_info.down_rate + down_rate
			user_info.up_rate = user_info.up_rate + up_rate
			i,j,down_cumu,down_rate,up_cumu,up_rate = string.find(user_info_text, "\n%s*%d+,%d+%s*(%d+),%s*(%d+).-,%s*.-,%s*.-,%s*%d+:%d+%s*(%d+),%s*(%d+)", j+1)
			
		end
		if user_info.mac then
			user_info_list[TrimStr(user_info.mac)] = user_info
		end
		
	end
	return user_info_list
end

local function get_list( list_type )
    local list	= {}
	local uci_r = uci.cursor()
    
	uci_r:foreach("access_control", list_type,
        function(section)
            list[#list + 1] = uci_r:get_all("access_control", section[".name"])
            list[#list].mac = (list[#list].mac):gsub(":", "-"):upper()
        end
    )
    return list
end


local function get_block_client_list()	
	local uci_r       = uci.cursor()
	local enable      = uci_r:get("access_control", "settings", "enable")
	local access_mode = uci_r:get("access_control", "settings", "access_mode")
	local black_list  = get_list("black_list")
	local white_list  = get_list("white_list")
	local block_list  = {}

	if enable == "on" then
		if access_mode == "black" then
			for _, black in ipairs(black_list) do
				if black then
					block_list[TrimStr(black.mac)] = black	
				end
			end
		elseif access_mode == "white" then
			for _, white in ipairs(white_list) do
				if white then
					block_list[TrimStr(white.mac)] = white
				end
			end
		end
	end

	return block_list
end	

--eg:"75"(it's BIN is "1001011") transfer to "Sun Mon Wed Sat"
function qos_schedule_to_string(byte_val, next_day)
	local string = ""
	local weeks = {"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"}
	local remainder = 0

	if byte_val == nil or byte_val == 0 then
		return string
	end
	
	if next_day == true then
		local tmp_byte_val = byte_val
		for i=1, 6 do
			tmp_byte_val = math.floor(tmp_byte_val / 2)
		end
		remainder = tmp_byte_val % 2
		byte_val = math.floor(byte_val * 2)
		if remainder == 1 then
			byte_val = byte_val - math.ldexp(byte_val, 7) + 1
		end
	end
	for i=1, 7 do
		remainder = byte_val % 2
		byte_val = math.floor(byte_val / 2)
		if remainder == 1 then
			if string == "" then
				string = weeks[i]
			else
				string = string .. " " .. weeks[i]
			end
		end
	end
	return string
end

function QOS_INST:get_wanspeed_by_tm()
	local up_speed = 0
	local down_speed = 0
	local user_info_list = get_qos_user_info()
    
	for i, v in pairs(user_info_list) do
		up_speed = up_speed + v.up_rate
		down_speed = down_speed + v.down_rate
	end
	
	return up_speed, down_speed
end

--function get_qos_user_info
function QOS_INST:get_device_list(form)
    local priority_list = {}
    local normal_list = {}
	local tfs_info_list = {}
	local is_schedule_supported = self.uci:get_profile("qos", "qos_schedule_support") or "no"
	
	tfs_info_list = get_qos_tfs_info()
    client_list = clientmgmt.get_access_client_list_qos()
	
    for i, v in ipairs(client_list) do
        local client = {}
        client.index = i
		-- client.key = "key-"..i
		client.key = v.mac
        client.deviceName = v.name
        client.deviceType = v.client_type
        client.deviceTag = v.wire_type
        client.mac = v.mac
		local tfs_info = tfs_info_list[TrimStr(client.mac)]
		
		if tfs_info then
			client.trafficUsage = tfs_info.total_byte
			client.uploadSpeed = tfs_info.retx_byte
			client.downloadSpeed = tfs_info.rerx_byte
		else
			client.trafficUsage = 0
			client.uploadSpeed = 0
			client.downloadSpeed = 0
		end	
					
        client.timePeriod = v.time_period
        client.remainTime = 0
        if v.prio == "on" then
            client.enablePriority = true
            if  v.prio_time ~= -1 and v.prio_time ~= "" then
                client.remainTime = v.prio_time - os.time()
            end
        else
            client.enablePriority = false
        end

		--qos schedule
		if is_schedule_supported == "yes" and v.time_mode ~= nil then
			client.time_mode = v.time_mode
			if v.time_schedule ~= nil and client.time_mode == "schedule" then
				local slots = v.time_schedule.slots
				slots = string.split(slots, "-")
				
				client.status = v.time_schedule.status
				client.time_begin = slots[1]
				client.time_end = slots[2]
				client.repeat_weeks = qos_schedule_to_string(v.time_schedule.repeats)
				client.repeat_weeks = string.gsub(client.repeat_weeks, " ", ",")
				client.enablePriority = v.schedule_enable == "on" and true or false
			end
		end
				
        if client.enablePriority == true or client.time_mode == "schedule" then
            priority_list[#priority_list + 1] = client
        elseif v.online == 1 then
            normal_list[#normal_list + 1] = client
        end
    end
    if priority_list then
        sort_devlist(priority_list)
    end
    if normal_list then
        sort_devlist(normal_list)
    end

    for i,v in ipairs(normal_list) do
        table.insert(priority_list, v)
    end

    return priority_list
end

local function AdjustTime(old,new)
    local timeout = {}
    if new.enablePriority == true then
        if new.timePeriod ~= nil and new.timePeriod ~= "-1" and new.timePeriod ~= "Always" then
            timeout = os.time() + tonumber(new.timePeriod)*3600
        else
            timeout = -1
        end
    else
        timeout = -1
    end
    return timeout
end

function QOS_INST:update_device_info(form)
    local old = luci.json.decode(form.old)
    local new = luci.json.decode(form.new)
    local res = {}
    local devinfo = {}
    local is_schedule_supported = self.uci:get_profile("qos", "qos_schedule_support") or "no"
    
    devinfo.mac = new.mac
    devinfo.name = new.deviceName
    devinfo.type = new.deviceType
    
    if new.enablePriority == true then 
        devinfo.prio = "on"
		devinfo.prio_time = AdjustTime(old, new)
		devinfo.time_period = new.timePeriod == "Always" and -1 or new.timePeriod
    else
        devinfo.prio = ""
		devinfo.prio_time = ""
		devinfo.time_period = ""
    end

	--qos schedule
	if is_schedule_supported == "yes" and new.time_mode ~= nil then
		devinfo.time_mode = new.time_mode
		if new.time_begin ~= nil and new.time_end ~= nil and devinfo.time_mode == "schedule" then
			local time_tmp
			local time_begin = string.gsub(string.gsub(new.time_begin, ":", ""), "\n", "")
			local time_end = string.gsub(string.gsub(new.time_end, ":", ""), "\n", "")
			local tmp_repeats = string.gsub(new.repeat_weeks, ",", " ")
			local tmp_repeats_byte = clientmgmt.qos_schedule_to_byte(tmp_repeats)
			
			if #time_begin == 3 then
				time_begin = "0" .. time_begin
			end
			if #time_end == 3 then
				time_end = "0" .. time_end
			end
			
			if time_begin < time_end then
				devinfo.slots = time_begin .. " " .. time_end
				devinfo.slots_next_day = ""
				devinfo.repeats = qos_schedule_to_string(tmp_repeats_byte)
				devinfo.repeats_next_day = ""
			else
				devinfo.slots = time_begin .. " " .. "2400"
				devinfo.slots_next_day = "0000" .. " " .. time_end
				devinfo.repeats = qos_schedule_to_string(tmp_repeats_byte)
				devinfo.repeats_next_day = qos_schedule_to_string(tmp_repeats_byte,true)
			end
			devinfo.status = "off"
			devinfo.schedule_enable = new.enablePriority == true and "on" or "off"
			local now_week = os.date("%a")
			local now_time = os.date("%H%M")

			-- no repeats
			if devinfo.repeats == "" and devinfo.repeats_next_day == "" then
				--flag of no repeats, "on" means that it will be executed, "off" means that it has been executed
				devinfo.no_repeat_exec = "on"
				
				time_tmp = string.split(devinfo.slots, " ")
				time_begin = time_tmp[1]
				time_end = time_tmp[2]
				if now_time > time_begin and now_time < time_end then
					devinfo.status = "on"
				end
				-- no repeats next day
				-- don't neet to deal with it now
			end

			-- repeats
			if devinfo.repeats and devinfo.repeats ~= "" then
				local weeks_array = string.split(devinfo.repeats, " ")
				time_tmp = string.split(devinfo.slots, " ")
				time_begin = time_tmp[1]
				time_end = time_tmp[2]
				for i, v in pairs(weeks_array) do
					if v == now_week then
						if now_time > time_begin and now_time < time_end then
							devinfo.status = "on"
							break
						end
					end
				end
			end
			-- repeats next day
			if devinfo.repeats_next_day and devinfo.repeats_next_day ~= nil then
				local weeks_array_next_day = string.split(devinfo.repeats_next_day, " ")
				time_tmp = string.split(devinfo.slots_next_day, " ")
				time_begin = time_tmp[1]
				time_end = time_tmp[2]
				for i, v in pairs(weeks_array_next_day) do
					if v == now_week then
						if now_time > time_begin and now_time < time_end then
							devinfo.status = "on"
							break
						end
					end
				end
			end
		else
			devinfo.schedule_enable = "off"
		end
	end
	
    --_print_tbl(devinfo)
    res = clientmgmt.set_client_info(devinfo)
    if not res then
        return res, "add client to uci fail"
    end
	
	sys.fork_exec(QOS_RESTART_CMD)
    return self:get_device_list(form)
end

function QOS_INST:batch_update_device_info(form)
    local res = {}
    local devinfo = {}
    local i = 1
    
    local timestamp = AdjustTime(nil, form[1])

    for k,v in pairs(form) do
        devinfo[i] = {}
        devinfo[i].mac = v.mac
        devinfo[i].name = v.deviceName
        devinfo[i].type = v.deviceType
        
        if v.enablePriority == true then 
            devinfo[i].prio = "on"
            devinfo[i].prio_time = timestamp
            devinfo[i].time_period = v.timePeriod == "Always" and -1 or v.timePeriod
        else
            devinfo[i].prio = ""
            devinfo[i].prio_time = ""
            devinfo[i].time_period = ""
        end

        i = i + 1
    end

    --_print_tbl(devinfo)
    res = clientmgmt.batch_set_client_info(devinfo)
    if not res then
        return res, "add client to uci fail"
    end
    
    sys.fork_exec(QOS_RESTART_CMD)
    
    return self:get_device_list()
end

function QOS_INST:update_device_status()
    return clientmgmt.client_house_keeping()
end

function QOS_INST:tmp_get_mode(app_form)
    local result = {}

    result.qos_mode = self.uci:get(self.config, "qos_mode", "mode")

    if result.qos_mode == "custom" then
		local custom_detail = {}
        custom_detail.game = self.uci:get(self.config, "custom_detail", "game")
        custom_detail.media = self.uci:get(self.config, "custom_detail", "media")
        custom_detail.surf = self.uci:get(self.config, "custom_detail", "surf")
        custom_detail.chat = self.uci:get(self.config, "custom_detail", "chat")
        custom_detail.download = self.uci:get(self.config, "custom_detail", "download")
		result.custom_detail = custom_detail
    end

    local ret = {}
	ret.result = luci.json.encode(result)
	return ret
end

function QOS_INST:tmp_set_mode(app_form)
	local data = luci.json.decode(app_form.data)
	if not data and type(data) ~= "table" then
		dbg.print("invalid data")
		return {errorcode="invalid new params"}
	end
	
    local qos_mode = data.qos_mode

    self.uci:set(self.config, "qos_mode", "mode", qos_mode)
    if qos_mode == "custom" then
		local custom_detail = data.custom_detail

        if not custom_detail or not custom_detail.game or not custom_detail.media or
            not custom_detail.surf or not custom_detail.chat or not custom_detail.download then
             return false, "invalid args"
        end

        -- priority set
        self.uci:set(self.config, "custom_detail", "game", custom_detail.game)
        self.uci:set(self.config, "custom_detail", "media", custom_detail.media)
        self.uci:set(self.config, "custom_detail", "surf", custom_detail.surf)
        self.uci:set(self.config, "custom_detail", "chat", custom_detail.chat)
        self.uci:set(self.config, "custom_detail", "download", custom_detail.download)
    end

    local stat = self.uci:commit(self.config)
    if not stat then
        return false, "qos commit failed."
    end
	
	sys.fork_exec(QOS_RESTART_CMD)
	
	-- sync HNAT
	Nat:sync_hnat_status()
	
    local ret = {}
	local result = {}
	ret.result = luci.json.encode(result)
	return ret
end

function QOS_INST:tmp_get_dev_list(app_form)
	local data = luci.json.decode(app_form.data)
	if not data and type(data) ~= "table" then
		dbg.print("invalid data")
		return {errorcode="invalid new params"}
	end
	local start_index = tonumber(data.start_index)
	local amount = tonumber(data.amount)
	--[[
	local start_index = tonumber(app_form.start_index)
	local amount = tonumber(app_form.amount)
	]]--
	
	local total = 0
	local res = {}
	local result = {}
	local uci_s = uci.cursor()

	local dev_list = {}
	local client_list = clientmgmt.get_access_client_list_qos()
	local block_client_list = get_block_client_list()
	local access_mode = uci_s:get("access_control", "settings", "access_mode") or "black"
	local access_enable = uci_s:get("access_control", "settings", "enable") or "off"
	local qos_enable = uci_s:get(QOS_CONFIG_NAME, "settings", "enable") or "off"
	local is_schedule_supported = uci_s:get_profile("qos", "qos_schedule_support") or "no"
    local support_isHighBandwidthOccupancy = uci_s:get_profile("isHighBandwidthOccupancy", "isHighBandwidthOccupancy") or
    "no"
    
	local tfs_info_list = {}
	tfs_info_list = get_qos_tfs_info()

	local traffic_onoff = uci_s:get("tfstats", "switch", "enable") or "off"
    for i, v in ipairs(client_list) do
		if total >= start_index and total < start_index + amount then
			local client = {}
			--client.ip = clientmgmt.get_ip_by_mac(v.mac) or "0.0.0.0"
			client.ip = v.ip or "0.0.0.0"
			client.mac = v.mac
			client.name = nixio.bin.b64encode(v.name)
			client.client_type = v.client_type
			--client.conn_type = v.wire_type
			client.conn_type = getConnType(v) or "wired"
			client.online = v.online==1 and true or false
			--client.online = client.ip~="0.0.0.0" and true or false
			
			local block_client = block_client_list[TrimStr(client.mac)]
			if  access_enable == "on" and access_mode == "black" then 
				if block_client  then
					client.online  = false
				end
			end
			client.access_time = v.access_time
			client.owner_id = tonumber(v.owner_id) or -1
			client.owner_name = nixio.bin.b64encode(v.owner_name) or ""
			client.remain_time = 0
			if v.prio == "on" then
				--client.enable_priority = 1
				if qos_enable == "on" then
					client.enable_priority = true
				else
					client.enable_priority = false
				end
				client.time_period = tonumber(v.time_period)
				if  v.prio_time ~= -1 and v.prio_time ~= "" then
					client.remain_time = v.prio_time - os.time()
				else
					client.remain_time = -1
				end
			else
				--client.enable_priority = 0
				client.enable_priority = false
				client.remain_time = -1
				client.time_period = -1
			end
			
			local user_info = tfs_info_list[TrimStr(client.mac)] 

			if traffic_onoff == "on" then
				client.traffic_usage = 0
			else
				-- No traffic usage
				-- client.traffic_usage = -1
			end

			if user_info then 
				client.traffic_usage = user_info.total_byte
			end

			if v.client_type_changed then
				client.client_type_changed = v.client_type_changed
			end

            if support_isHighBandwidthOccupancy == "yes" then
                local ubus = require "ubus"
                local _ubus = ubus.connect()
                local min_tfstats = _ubus:call("tfstats", "seg_get", { ip = client.ip, type = "minute" })
                if min_tfstats ~= nil then
                    if min_tfstats.data[1].downs + min_tfstats.data[1].ups > 50 * 1024 * 1024 then
                        client.isHighBandwidthOccupancy = true
                    else
                        client.isHighBandwidthOccupancy = false
                    end
                else
                    client.isHighBandwidthOccupancy = false
                end
            end
            
			--qos schedule
			if is_schedule_supported == "yes" then
				local time_schedule = {}
				client.time_mode = v.time_mode or ""
				if v.time_schedule ~= nil then
					time_schedule.status = v.time_schedule.status or ""
					time_schedule.slots = v.time_schedule.slots or ""
					time_schedule.repeats = v.time_schedule.repeats or ""
				end
				client.time_schedule = time_schedule
			end

			dev_list[#dev_list + 1] = client
		end
		total = total + 1
    end
	
	-- check client_type and check conn_type
	--[[
	for i, v in ipairs(dev_list) do
		local tmpType = uci_s:get("client_mgmt", TrimStr(v.mac), "type") or "" 
		local tmpName = uci_s:get("client_mgmt", TrimStr(v.mac), "name") or "" 
		if tmpType ~= "" then 
			v.client_type = tmpType
		end
		if tmpName ~= "" then
			v.name = nixio.bin.b64encode(tmpName)
		end
	end
	]]--
	result.start_index = start_index
	result.amount = #dev_list
	result.sum = total
	result.client_list = dev_list
	--[[
	return result
	]]--
	
	res.result = luci.json.encode(result)
    return res
end

function QOS_INST:tmp_get_dev_speed(app_form)
	--[[
	local data = luci.json.decode(app_form.data)
	if not data and type(data) ~= "table" then
		dbg.print("invalid data")
		return {errorcode="invalid new params"}
	end
	local start_index = tonumber(data.start_index)
	local amount = tonumber(data.amount)
	]]--
	local start_index = tonumber(app_form.start_index)
	local amount = tonumber(app_form.amount)
	
	local total = 0
	local res = {}
	local result = {}
	local dev_list = {}
	local uci_s = uci.cursor()

	local traffic_onoff = uci_s:get("tfstats", "switch", "enable") or "off"
	if traffic_onoff == "off" then
		result.start_index = start_index
		result.amount = 0
		result.sum = 0
		result.client_list_speed = dev_list
		return result
	end

	local client_list = clientmgmt.get_access_client_list_qos()
	--local user_info_list = get_qos_user_info()
	local tfs_info_list = get_qos_tfs_info()

    for i, v in ipairs(client_list) do
		if total >= start_index and total < start_index + amount then
			local client = {}
			client.mac = v.mac
			
			--local user_info = user_info_list[TrimStr(client.mac)]
			local user_info = tfs_info_list[TrimStr(client.mac)]
			if user_info then
				--client.up_speed = tonumber(user_info.up_rate)
				--client.down_speed = tonumber(user_info.down_rate)
				client.up_speed = tonumber(user_info.retx_byte)
				client.down_speed = tonumber(user_info.rerx_byte)
			else
				client.up_speed = 0
				client.down_speed = 0
			end

			dev_list[#dev_list + 1] = client
		end
		total = total + 1
    end
	
	result.start_index = start_index
	result.amount = #dev_list
	result.sum = total
	result.client_list_speed = dev_list
	
	--res.result = luci.json.encode(result)
    --return res
	return result
end

function QOS_INST:tmp_get_online_dev_speed(app_form)
    local start_index = tonumber(app_form.start_index)
    local amount = tonumber(app_form.amount)

    local total = 0
    local res = {}
    local result = {}
    local dev_list = {}
    local uci_s = uci.cursor()
    local wlan_clients_tf
    local lan_clients_tf
    local assoclist
    local traffic_workaround = uci_s:get("tfstats", "switch", "workaround") or "off"
    local qos_enable = self.uci:get("qos_v2", "settings", "enable") or "off"
    local traffic_onoff = uci_s:get("tfstats", "switch", "enable") or "off"
    local wan_type = uci_s:get("network", "wan", "wan_type") or "dhcp"
    --[[
    When "boost_traffic_compatible" and "boost_qos_compatible" are not enabled in profile.xml, the switch state of QoS will affect the switch state in /etc/config/tfstas.switch.enable. In AX23 we cannot directly turn on "boost_traffic_compatible", which will affect other areas. So, to be able to send rate statistics to Tether when using the workaround method, we use the following criteria.
    --]]
    if traffic_workaround == "off" then
        if traffic_onoff == "off" then
            result.start_index = start_index
            result.amount = 0
            result.sum = 0
            result.client_list_speed = dev_list
            return result
        end
    end
    local client_list = clientmgmt.get_access_client_list_qos()
    local tfs_info_list = get_qos_tfs_info()

    if traffic_workaround == "on" and (qos_enable == "off" or wan_type == "v6plus" or wan_type == "dslite") then
        wlan_clients_tf = get_wlan_clients_tf_off_qos()
        lan_clients_tf = get_lan_clients_tf_off_qos()
        assoclist = get_wireless_assoclist()
    end

    for i, v in ipairs(client_list) do
        if total >= start_index and total < start_index + amount and v.online == 1 then
            local client = {}
            client.mac = v.mac

            local user_info = tfs_info_list[TrimStr(client.mac)]
            if user_info then
                client.up_speed = tonumber(user_info.retx_byte)
                client.down_speed = tonumber(user_info.rerx_byte)
            else
                if traffic_workaround == "on" and (qos_enable == "off" or wan_type == "v6plus" or wan_type == "dslite") then
                    local wifi_info = assoclist
                    [TrimStr(v.mac)]                 --Get the wireless client information that is currently online
                    if wifi_info and wlan_clients_tf[1] then --Rate statistics for wireless clients
                        for m, n in ipairs(wlan_clients_tf) do
                            if TrimStr(client.mac) == TrimStr(n.mac) then --Find the matching client in the wireless client rate statistics list
                                client.up_speed = tonumber(wlan_clients_tf[m].upload_bytes)
                                client.down_speed = tonumber(wlan_clients_tf[m].download_bytes)
                            end
                        end
                    elseif v.wire_type == "wired" and lan_clients_tf[1] then --Rate statistics for wired clients
                        for m, n in ipairs(lan_clients_tf) do
                            if TrimStr(client.mac) == TrimStr(n.mac) then --Find the matching client in the list of rate statistics for the wired client
                                client.up_speed = tonumber(lan_clients_tf[m].upload_bytes)
                                client.down_speed = tonumber(lan_clients_tf[m].download_bytes)
                            end
                        end
                    else
                        client.up_speed = 0
                        client.down_speed = 0
                    end
                else
                    client.up_speed = 0
                    client.down_speed = 0
                end
            end

            local ubus = require "ubus"
            local _ubus = ubus.connect()
            local min_tfstats = _ubus:call("tfstats", "seg_get", { ip = v.ip, type = "minute" })
            if min_tfstats ~= nil then
                if min_tfstats.data[1].downs + min_tfstats.data[1].ups > 50 * 1024 * 1024 then
                    client.isHighBandwidthOccupancy = 1
                else
                    client.isHighBandwidthOccupancy = 0
                end
            else
                client.isHighBandwidthOccupancy = 0
            end

            dev_list[#dev_list + 1] = client
        end
        total = total + 1
    end

    result.start_index = start_index
    result.amount = #dev_list
    result.sum = total
    result.client_list_speed = dev_list
    return result
end

function QOS_INST:tmp_get_dev_info(app_form)
	--[[
	local data = luci.json.decode(app_form.data)
	if not data and type(data) ~= "table" then
		dbg.print("invalid data")
		return {errorcode="invalid new params"}
	end
	local client_list = clientmgmt.get_access_client_list_qos()
	local user_info_list = get_qos_user_info()
	
	result.mac = data.mac
	local user_info = user_info_list[TrimStr(data.mac)]
	]]--
	local data = app_form
	local result = {}
	local client_list = clientmgmt.get_access_client_list_qos()
	--local user_info_list = get_qos_user_info()
	local tfs_info_list = get_qos_tfs_info()
	local uci_s = uci.cursor()
	
	result.mac = app_form.mac
	--local user_info = user_info_list[TrimStr(app_form.mac)]
	local user_info = tfs_info_list[TrimStr(app_form.mac)]
	--local user_info = user_info_list[app_form.mac]

	local traffic_onoff = uci_s:get("tfstats", "switch", "enable") or "off"
	if traffic_onoff == "off" then
		result.up_speed = -1
		result.down_speed = -1
	elseif user_info then
		--result.up_speed = tonumber(user_info.up_rate)
		--result.down_speed = tonumber(user_info.down_rate)
		result.up_speed = tonumber(user_info.retx_byte)
		result.down_speed = tonumber(user_info.rerx_byte)
	else
		result.up_speed = 0
		result.down_speed = 0
	end
	
    for i, v in ipairs(client_list) do
		if data.mac == v.mac then
			result.ip = v.ip or "0.0.0.0"
			--result.ip = clientmgmt.get_ip_by_mac(v.mac) or "0.0.0.0"
		end
    end


	return result
	--local ret = {}
	--ret.result = luci.json.encode(result)
    --return ret
end

function QOS_INST:tmp_get_qos_tfs_info()
	return get_qos_tfs_info()
end

function QOS_INST:tmp_get_TrimStr(mac)
	return TrimStr(mac)
end

----- add for SPF UI interface -----
function get_system_uptime()
    local result = 0
    local file = io.open("/proc/uptime", "r")

    if not file then
        dbg.printf("/proc/uptime is null")
        return result
    end

    local line = file:read("*l")
    if not line then 
        return result
    end

    _,_,uptime,idletime= string.find(line, "(%d+%.%d+)%s+(%d+%.%d+)")
    if uptime ~= nil and idletime ~= nil then
        result = tonumber(uptime)
    end

    file:close()
    return result
end

local function get_wireless_assoclist()
    local wlan  = require "luci.model.wireless"
    local ap    =  wlan.Apcfg()
    local sta_list = {}

    local support_triband = wireless_support_triband()
    local support_6g = wireless_support_6g()

    if support_triband == "yes" then
    	if support_6g == "yes" then
    		map = {"2.4GHz", "5GHz", "6GHz", "Guest 2.4GHz", "Guest 5GHz", "Guest 6GHz"}
    	else
        	map = {"2.4GHz", "5GHz-1", "5GHz-2", "Guest 2.4GHz", "Guest 5GHz-1", "Guest 5GHz-2"}
        end
    else
        map = {"2.4GHz", "5GHz", "Guest 2.4GHz", "Guest 5GHz"}
    end

    for _, sta in ipairs(ap:assoclist()) do
        if sta.rx_rate >= 0x7fffffff then
            sta.rx_rate = -1
        end

        if sta.tx_rate >= 0x7fffffff then
            sta.tx_rate = -1
        end

        sta_list[TrimStr(sta.mac)] = {
            mac        = sta.mac,
            type       = map[sta.type],
            encryption = sta.security,
            rxpkts     = sta.tx_packets,
            txpkts     = sta.rx_packets,
            rxrate     = sta.rx_rate,
            txrate     = sta.tx_rate,
            signal     = sta.signal,
        }
    end

    return sta_list
end

function QOS_INST:game_get_device_list(form)
    local priority_list = {}
    local normal_list = {}
	local tfs_info_list = {}
	local current_uptime = get_system_uptime()
 	local assoclist = get_wireless_assoclist()
 	
	tfs_info_list = get_qos_tfs_info()

	client_list = clientmgmt.get_access_device_list_with_access_uptime(1,form)
    client_offline = clientmgmt.get_access_device_list_with_access_uptime(2,form)
    for i, v in ipairs(client_offline) do
        if v.prio == "on" then
            v.wire_type = "offline"
            client_list[#client_list + 1] = v
        end
    end
	
    for i, v in ipairs(client_list) do
        local client = {}
        client.index = i
		-- client.key = "key-"..i
		client.key = TrimStr(v.mac)
        client.deviceName = v.name
        client.deviceType = v.client_type
        client.deviceTag = v.wire_type
        client.mac = v.mac
        client.ip = v.ip

		local tfs_info = tfs_info_list[TrimStr(client.mac)]
		
		if tfs_info then
			client.trafficUsage = tfs_info.total_byte
			client.uploadSpeed = tfs_info.retx_byte
			client.downloadSpeed = tfs_info.rerx_byte
		else
			client.trafficUsage = 0
			client.uploadSpeed = 0
			client.downloadSpeed = 0
		end

		-- online time(s) = current uptime - access_uptime, if client is online,access_time will be the time of adding to network
        if v.wire_type ~= "offline" and current_uptime > v.access_uptime then
            client.onlineTime = current_uptime - v.access_uptime
        else
            client.onlineTime = 0
        end

        -- wifi info (signal,rx rate, tx rate)
        local wifi_info = assoclist[TrimStr(v.mac)]
        -- if not find in assoclist, think it is a wired client,not return data
        if wifi_info then
            client.signal = wifi_info.signal
            client.rxrate = wifi_info.rxrate
            client.txrate = wifi_info.txrate
        end	
		
		-- Qos info 			
        client.timePeriod = v.time_period
        client.remainTime = 0
        if v.prio == "on" then
            client.enablePriority = true
            if  v.prio_time ~= -1 then
                client.remainTime = v.prio_time - os.time()
            end
        else
            client.enablePriority = false
        end

        if client.enablePriority == true then
            priority_list[#priority_list + 1] = client
        else
            normal_list[#normal_list + 1] = client
        end
    end
    if priority_list then
        sort_devlist(priority_list)
    end
    if normal_list then
        sort_devlist(normal_list)
    end

    for i,v in ipairs(normal_list) do
        table.insert(priority_list, v)
    end
    return priority_list
end

function QOS_INST:game_update_device_info(form)
    local old = luci.json.decode(form.old)
    local new = luci.json.decode(form.new)
    local res = {}
    local devinfo = {}
    
    devinfo.mac = new.mac
    devinfo.name = new.deviceName
    devinfo.type = new.deviceType
    
    if new.enablePriority == true then 
        devinfo.prio = "on"
		devinfo.prio_time = AdjustTime(old, new)
		devinfo.time_period = new.timePeriod == "Always" and -1 or new.timePeriod
    else
        devinfo.prio = ""
		devinfo.prio_time = ""
		devinfo.time_period = ""
    end
    --_print_tbl(devinfo)
    res = clientmgmt.set_client_info(devinfo)
    if not res then
        return res, "add client to uci fail"
    end
	
	sys.fork_exec(QOS_RESTART_CMD)
    return self:game_get_device_list(form)
end

local function comps(a, b)
	return tonumber(a.access_time) < tonumber(b.access_time)
end

function QOS_INST:tmp_get_priodevices(app_form)
	local data = json.decode(app_form.data)
	local start_index = tonumber(data.start_index)
	local amount = tonumber(data.amount)
	local result = {}
	local res = {}
	local total = 0
	local schedule_enable = ""

	dbg("")
	dbg("===> opcode 0x0465: tmp_get_priodevices")
	local client_list = {}
	local client_prio_list = clientmgmt.get_access_client_list_qos()

	local is_schedule_supported = self.uci:get_profile("qos", "qos_schedule_support") or "no"

	for i, v in ipairs(client_prio_list) do
		if v.schedule_enable then
			schedule_enable = v.schedule_enable or ""
		end
		if v.prio == "on" or schedule_enable == "on" then
			if total >= start_index and total < start_index + amount then
				local client = {}
				client.mac = v.mac
				client.name = nixio.bin.b64encode(v.name)
				client.client_type = v.client_type
				client.prio_time = v.prio_time
				client.time_period = v.time_period
				client.remain_time = 0
				if v.prio_time ~= -1 and v.prio_time ~= "" then
					client.remain_time = v.prio_time - os.time()
					if client.remain_time < 0 then
						client.remain_time = 0
					end
				end
				--qos schedule
				if is_schedule_supported == "yes" then
					if v.time_mode then
						client.time_mode = v.time_mode
					end
					if v.time_schedule then
						local time_schedule = {}
						time_schedule.status = v.time_schedule.status
						time_schedule.slots = v.time_schedule.slots
						time_schedule.repeats = v.time_schedule.repeats
						client.time_schedule = time_schedule
					end
				end
				client_list[#client_list + 1] = client
			end
			total = total + 1
		end
	end

	local max_num =  self.uci:get_profile("parental_control_v2", "max_prio_devices") or "64"
	result.start_index = start_index
	result.amount = #client_list
	result.sum = total
	--result.is_schedule_supported = is_schedule_supported == "yes" and true or false
	result.client_max = tonumber(max_num)
	result.client_list = client_list

	res.result = json.encode(result)
	dbg("====== print return table ======")
	--debug_tbl(result)
	dbg("====== print return table ======")
	dbg("===> opcode 0x0465: tmp_get_priodevices end")
	dbg("")
	return res
end

function QOS_INST:tmp_add_priodevices(app_form)
	local data = json.decode(app_form.data)
	local res = {}
	local devinfo = {}
	local mac
	local is_schedule_supported = self.uci:get_profile("qos", "qos_schedule_support") or "no"

	dbg("")
	dbg("===> opcode 0x0466: tmp_set_priodevices")
	for k, v in ipairs(data.client_list) do
		local dev = {}
		dev.mac = v.mac
		if v.name ~= nil then
			dev.name = nixio.bin.b64decode(v.name)
		end
		if v.client_type ~= nil then
			dev.type = v.client_type
			mac = string.gsub(v.mac, "-", "")
			mac = string.gsub(mac, ":", "")
			mac = string.match(mac, "%w+")
			mac = mac:upper()
			--mac = TrimStr(v.mac)
			typ = self.uci:get("client_mgmt", mac, "type") or "other"
			dbg("This device type is " .. typ .. ", mac is " .. dev.mac)
			if dev.type ~= typ then
				dev.client_type_changed = "true"
			end
		end
		dev.prio = "on"
		if v.time_period ~= nil and v.time_period ~= -1 then
			dev.prio_time = os.time() + v.time_period*3600
		else
			dev.prio_time = -1
		end
		dev.time_period = v.time_period
		--qos schedule
		if is_schedule_supported == "yes" and v.time_mode ~= nil then
			dev.time_mode = v.time_mode
			if v.time_schedule ~= nil and dev.time_mode == "schedule" then
				local time_tmp = string.split(v.time_schedule.slots, "-")
				local time_begin = string.gsub(string.gsub(time_tmp[1], ":", ""), "\n", "")
				local time_end = string.gsub(string.gsub(time_tmp[2], ":", ""), "\n", "")

				--deal with the special time slots, eg:"8:00"
				if #time_begin == 3 then
					time_begin = "0" .. time_begin
				end
				if #time_end == 3 then
					time_end = "0" .. time_end
				end
				
				if time_begin < time_end then
					dev.slots = time_begin .. " " .. time_end
					dev.slots_next_day = ""
					dev.repeats = qos_schedule_to_string(v.time_schedule.repeats)
					dev.repeats_next_day = ""
				else
					dev.slots = time_begin .. " " .. "2400"
					dev.slots_next_day = "0000" .. " " .. time_end
					dev.repeats = qos_schedule_to_string(v.time_schedule.repeats)
					dev.repeats_next_day = qos_schedule_to_string(v.time_schedule.repeats,true)
				end
				dev.schedule_enable = "on"
				dev.status = "off"
				local now_week = os.date("%a")
				local now_time = os.date("%H%M")
				
				-- no repeats
				if dev.repeats == "" and dev.repeats_next_day == "" then
					--flag of no repeats, "on" means that it will be executed, "off" means that it has been executed
					dev.no_repeat_exec = "on"
					
					time_tmp = string.split(dev.slots, " ")
					time_begin = time_tmp[1]
					time_end = time_tmp[2]
					if now_time > time_begin and now_time < time_end then
						dev.status = "on"
					end
					-- no repeats next day
					-- don't neet to deal with it now
				end

				-- repeats
				if dev.repeats and dev.repeats ~= "" then
					local weeks_array = string.split(dev.repeats, " ")
					time_tmp = string.split(dev.slots, " ")
					time_begin = time_tmp[1]
					time_end = time_tmp[2]
					for i, v in pairs(weeks_array) do
						if v == now_week then
							if now_time > time_begin and now_time < time_end then
								dev.status = "on"
								break
							end
						end
					end
				end
				-- repeats next day
				if dev.repeats_next_day and dev.repeats_next_day ~= "" then
					local weeks_array_next_day = string.split(dev.repeats_next_day, " ")
					time_tmp = string.split(dev.slots_next_day, " ")
					time_begin = time_tmp[1]
					time_end = time_tmp[2]
					for i, v in pairs(weeks_array_next_day) do
						if v == now_week then
							if now_time > time_begin and now_time < time_end then
								dev.status = "on"
								break
							end
						end
					end
				end
			else
				dev.schedule_enable = "off"
			end
		end
		devinfo[#devinfo+1] = dev
	end

	res = clientmgmt.batch_set_client_info(devinfo)

	if not res then
		return res, "add client to uci fail"
	end
	sys.fork_exec(QOS_RESTART_CMD)
	dbg("===> opcode 0x0466: tmp_set_priodevices end")
	dbg("")
	local ret = {}
	local result = {}
	ret.result = luci.json.encode(result)
	return ret
end

function QOS_INST:tmp_del_priodevices(app_form)
	local data = json.decode(app_form.data)
	local res = {}
	local devinfo = {}
	local is_schedule_supported = self.uci:get_profile("qos", "qos_schedule_support") or "no"

	dbg("")
	dbg("===> opcode 0x0467: tmp_del_priodevices")
	for k, v in ipairs(data.client_list) do
		local dev = {}
		dbg("device mac: " .. v)
		dev.mac = v
		dev.prio = "off"
		if is_schedule_supported == "yes" then
			dev.schedule_enable = "off"
		end
		devinfo[#devinfo+1] = dev
	end

	res = clientmgmt.batch_set_client_info(devinfo)
	if not res then
		return res, "add client to uci fail"
	end
	sys.fork_exec(QOS_RESTART_CMD)

	dbg("===> opcode 0x0467: tmp_del_priodevices end")
	dbg("")
	local ret = {}
	local result = {}
	ret.result = luci.json.encode(result)
	return ret
end
