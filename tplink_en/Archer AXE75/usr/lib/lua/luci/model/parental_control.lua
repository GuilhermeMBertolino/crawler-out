--[[
Copyright(c) 2016-2022 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  parental_control.lua
Details :  function for trend micro parental control
Author  :  Wang Lian <wanglian@tp-link.net>
Version :  1.0.0
Date    :  12Oct, 2016
History :  12Oct, 2016, Wang Lian, create the file.
]]--

module("luci.model.parental_control", package.seeall)

local ubus   = require "ubus"
local nixio  = require "nixio"
local string = require "string"
local sys    = require "luci.sys"
local util   = require "luci.util"
local uci    = require "luci.model.uci"
local dbg    = require "luci.tools.debug"
local json   = require "luci.json"
local clientmgmt = require "luci.model.tm_clientmgmt"
local nat_m = require "luci.model.nat"
local Nat = nat_m.NAT_INST()

local uci_r   = uci.cursor()
local uci_t  = uci.cursor("/tmp/tmp-device-config")

local PROC_PCTL = "/proc/pctl/"
local PC_RELOAD_CMD = "/etc/init.d/parental_control reload"
local PC_CONFIG_NAME = "parental_control_v2"
local QOS_RESTART_CMD = "/etc/init.d/qos restart &"
local PC_RESTART_CMD = "/etc/init.d/parental_control restart"
local PC_STOP_CMD = "/etc/init.d/parental_control stop no_stop_device"
local PC_PROFILE_NAME = "parental_control_v2"

local _owner_list
local _id_used

local FILTER_TBL = {
    tyke = {
        categories_list = {            
            "adult_content",
			"gambling",
			"sex_education"
        },
		prefilter_list = {
            "online_communications",
            "social_network",
            "pay_to_surf",
            "media",
            "download",
            "games"
        },
        website_list = {

        }
    },

    pre_teen = {
        categories_list = {
            "adult_content",
			"gambling"
        },
		prefilter_list = {
            "social_network"
        },
        website_list = {

        }
    },

    teen = {
        categories_list = {            
			"adult_content",
			"gambling"
        },
		prefilter_list = {
        
        },
        website_list = {

        }
    },

    adult = {
        categories_list = {
        
        },
		prefilter_list = {
		
		},
        website_list = {

        }
    },
	all = {
		categories_list = {
			"adult_content",
			"gambling",
			"sex_education",
			"online_communications",
			"social_network",
			"pay_to_surf",
			"media",
			"download",
			"games"
		},
		prefilter_list = {
		
		},
		website_list = {

        }
	}
}

Parentctl = util.class()

function _print_tbl(data)
    if type(data) == "table" then
        for i, v in pairs(data) do
            dbg.print(i .. " = " .. tostring(data[i]))
            if type(data[i]) == "table" then
                _print_tbl(data[i])         
            end
        end
    end
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
    local max_num = uci_r:get_profile(PC_CONFIG_NAME, "max_owner") or "4"
    return tonumber(max_num)
end

local function get_max_client()
    local max_num = uci_r:get_profile(PC_CONFIG_NAME, "max_dev") or "8"
    return tonumber(max_num)
end

local function get_max_key()
    local max_num = uci_r:get_profile(PC_CONFIG_NAME, "max_key") or "32"
    return tonumber(max_num)
end

local function flush_log_in_kernel(owner_id)
	os.execute("echo f > /proc/pctl/"..owner_id)
end

local function get_remain_owner_num()    
    if not _owner_list then
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

    local owner_num = #_owner_list
    local max_num = get_max_owner()
    
    return (max_num - owner_num)
end

local function website_is_blocked(owner_id, url)
	local website_list = uci_r:get(PC_CONFIG_NAME, owner_id, "website")
	if website_list and #website_list > 0 then
		for i = 1, #website_list do
			if website_list[i] == url then
				return true
			end
		end
	end
	return false
end

local function get_insights_daily_table(owner_id, daily_data)
    local daily_table = {}
    local website_list = {}
    local totalMinuts
    local lastChkTs
    local daysIdx = 0
    local pos

    if not daily_data or type(daily_data) ~= "string" then
        daily_table.spend_online = 0
        daily_table.website_list = website_list
        return daily_table
    end

    -- The daily_data is in the format below: (10 url,minuts entries at most)
    -- '630;1484097562;www.baidu.com,240;www.baidu.com,240;www.baidu.com,240;www.baidu.com,240;www.baidu.com,240;
    -- www.baidu.com,240;www.baidu.com,240;www.baidu.com,240;www.baidu.com,240;'
    _, pos, totalMinuts, lastChkTs = string.find(daily_data, "^(%d+);(%d+);")
    if not totalMinuts or tonumber(totalMinuts) <= 0 then
        daily_table.spend_online = 0
    else
        daily_table.spend_online = totalMinuts
        local url
        local minutes
        local s = string.sub(daily_data, pos + 1)
        for url, minutes in string.gfind(s, "([^,;]+),(%d+);") do
            local web_entry = {}
            web_entry.website = url
			web_entry.block = website_is_blocked(owner_id, url)
            web_entry.spend_online = minutes
            website_list[#website_list + 1] = web_entry
        end
    end
	daily_table.website_list = website_list
	
	if lastChkTs and tonumber(lastChkTs) > 0 then
        for i = 0, 6 do
            if os.date("%x", lastChkTs + 86400 * i) == os.date("%x", os.time()) then
                daysIdx = i + 1
            end
        end
    end
	
    return daily_table, daysIdx
end

local function get_insights_history_list(owner_id, history)
    local history_list = {}
    local s
    
    if not history or type(history) ~= "table" then
        return history_list
    end

    -- The history list entry is in the format below:
    -- ask.csdn.net,1480399366;
    for _, s in ipairs(history) do
        local access_ts
        local url
        for url, access_ts in string.gfind(s, "([^,;]+),(%d+);") do
            local histoty_entry = {}
            histoty_entry.website = url
            histoty_entry.access_timestamp = access_ts
			histoty_entry.block = website_is_blocked(owner_id, url)
            history_list[#history_list + 1] = histoty_entry
        end
    end
    
    return history_list
end

local function get_dev_support_app_list()
    local version = 0
    local list = {}
    local app_text
    local i
    local j

    local file_app_list = io.open("/tmp/tm-shn/list_pc_filter_apps.db", "r")
    if not file_app_list then
       return version, list
    end
    
    app_text = file_app_list:read("*all")
    file_app_list:close()

    -- Version: 1
    i, j, version = string.find(app_text, "^Version: (%d+)\n")
    if tonumber(version) <= 0 then
        return 0, list
    end

    -- 1,2,0,Yahoo Messenger
	local name
    for name in string.gfind(app_text, "%d+,%d+,%d+,([^,\n]+)\n") do
        local app = {}
        app.name = name
        list[#list + 1] = app
    end

    return version, list
end

local function time_to_int(timeinfo_array)
    local result = 0
	if not timeinfo_array then
		return result
	end
    for i, v in pairs(timeinfo_array) do
        if v == 1 then
            result = result + math.pow(2, (i-1))
        end
    end
    return result
end

local function time_to_array(timeinfo_int)
    local result = {}
	if not timeinfo_int then
		return result
	end
    local tmp_var = 0
    for i = 1, 24 do 
        tmp_var = timeinfo_int%2
        timeinfo_int = math.floor(timeinfo_int/2)
        result[#result + 1] = tmp_var
    end
    return result
end

local function get_online_total(owner_id)
	local res = 0
	
	local f = io.open(PROC_PCTL..owner_id,"r")
	if f then
		local head = f:read("*line")
		h_minutes, h_timestamp, num = string.match(head, "(%d+) (%d+) (%d+)") 
		res = h_minutes
		f:close()
	else
		dbg.print("open "..PROC_PCTL..owner_id.."failed.\n")
	end
	
    return res
end

function old_to_new_params_convert()
	local owner_list = {}
	uci_r:foreach(PC_CONFIG_NAME, "owner",
		function(section)
			local owner = {}
			local hours = {}
			local begin_time
			local end_time
			local time_array = {}
			-- 1-7, mon-sun
			for i=1,7 do
				time_array[i] = {}
					for j=1,24 do
						time_array[i][j] = 1
				end
			end
			
			owner.owner_id = section.owner_id

			if not section.website_type then
				owner.website_type = "1"
			end
			
			if not section.workday_begin and not section.workday_end and not section.weekend_begin and not section.weekend_end then 
				owner_list[#owner_list + 1] = owner
				return
			end
			
			workday_begin = tonumber(section.workday_begin)
			workday_end = tonumber(section.workday_end)
			weekend_begin = tonumber(section.weekend_begin)
			weekend_end = tonumber(section.weekend_end)

			-- workdays
			if section.workday_bedtime == "1" then
				-- get the time period
				integer, decimal = math.modf(workday_begin/60)
				if decimal >= 0.5 then
					begin_time = integer + 1
				else
					begin_time = integer
				end
				integer, decimal = math.modf(workday_end/60)
				if decimal >= 0.5 then
					end_time = integer + 1
				else
					end_time = integer
				end

				-- start transfer time params
				if begin_time > end_time then
					-- Monday to Thursday, limit both morning and night
					for i=1,4 do
						for j=1,24 do
							-- morning
							if j > 0 and j <= end_time then
								time_array[i][j] = 0
							end
							-- night
							if j > begin_time and j <= 24 then
								time_array[i][j] = 0
							end
						end
					end

					
					for j=1,24 do
						-- Only limit morning on Friday
						if j > 0 and j <= end_time then
							time_array[5][j] = 0
						end
						-- Only limit night on Sunday
						if j > begin_time and j <= 24 then
							time_array[7][j] = 0
						end
					end
				else
					-- In this case no Friday or Saturday
					-- Monday to Thursday, limit both morning and night
					for i=1,4 do
						for j=1,24 do
							if j > begin_time and j <= end_time then
								time_array[i][j] = 0
							end
						end
					end
					
					-- Sunday, limit both morning and night
					for j=1,24 do
						if j > begin_time and j <= end_time then
							time_array[7][j] = 0
						end
					end
				end
			end

			--weekend
			if section.weekend_bedtime == "1" then
				-- get the time period
				integer, decimal = math.modf(weekend_begin/60)
				if decimal >= 0.5 then
					begin_time = integer + 1
				else
					begin_time = integer
				end
				integer, decimal = math.modf(weekend_end/60)
				if decimal >= 0.5 then
					end_time = integer + 1
				else
					end_time = integer
				end

				-- start transfer time params
				if begin_time > end_time then
					
					for j=1,24 do
						-- Only limit night on Friday
						if j > begin_time and j <= 24 then
							time_array[5][j] = 0
						end

						-- Only limit morning on Sunday
						if j > 0 and j <= end_time then
							time_array[7][j] = 0
						end

						-- Limit both morning and night on Saturday
						if j > begin_time and j <= 24 then
							time_array[6][j] = 0
						end
						if j > 0 and j <= end_time then
							time_array[6][j] = 0
						end
					end
				else
					-- In this case only limit Friday and Saturday
					for j=1,24 do
						if j > begin_time and j <= end_time then
							time_array[5][j] = 0
							time_array[6][j] = 0
						end
					end	
				end
			end
			
			owner.mon_time = time_to_int(time_array[1])
			owner.tue_time = time_to_int(time_array[2])
			owner.wed_time = time_to_int(time_array[3])
			owner.thu_time = time_to_int(time_array[4])
			owner.fri_time = time_to_int(time_array[5])
			owner.sat_time = time_to_int(time_array[6])
			owner.sun_time = time_to_int(time_array[7])
			owner.workday_bedtime = ""
			owner.workday_begin = ""
			owner.workday_end = ""
			owner.weekend_bedtime = ""
			owner.weekend_begin = ""
			owner.weekend_end = ""
			owner.website_type = "1"
			
			owner_list[#owner_list + 1] = owner
		end
	)
	
	for i, owner in ipairs(owner_list) do
		-- save in config
		uci_r:section(PC_CONFIG_NAME, "owner", owner.owner_id, owner)
		uci_r:commit(PC_CONFIG_NAME)
	end
end

function Parentctl:__init__()
    -- Delay connecting ubus
    --_ubus = ubus.connect()
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

function Parentctl:commit()
    --local stat = uci_r:commit(PC_CONFIG_NAME, "client_mgmt", "blacklist")   
	local stat = uci_r:commit(PC_CONFIG_NAME)
    if not stat then        
        return false, "Parentctl commit failed."
    end
	
	sys.fork_exec(PC_RELOAD_CMD)
	
    return stat
end

function Parentctl:read_settings()
    local ret = {enable = uci_r:get(PC_CONFIG_NAME, "settings", "enable"), 
                 host_mac = string.gsub(string.gsub(sys.exec("getfirm MAC"), "-", ""), "\n", ""),
				 max_client = uci_r:get_profile(PC_PROFILE_NAME, "max_dev")}
    return ret
end

function Parentctl:write_settings(http_form)
    uci_r:set(PC_CONFIG_NAME, "settings", "enable", http_form.enable)
    uci_r:commit(PC_CONFIG_NAME)
	if http_form.enable == "on" then
		sys.fork_exec(PC_RESTART_CMD)
	else
		sys.fork_exec(PC_STOP_CMD)
	end
    return self:read_settings()
end

function Parentctl:get_default_filter()
    local filter_list = {}

    for key, val in pairs(FILTER_TBL) do
        local filter = {}
        filter.filter_level = key
        filter.categories_list = val.categories_list
		filter.prefilter_list = val.prefilter_list
		filter.website_list = val.website_list
        filter_list[#filter_list + 1] = filter
    end

    return filter_list
end

function Parentctl:get_default_limit()
	local default_limit = {}
	
	default_limit.profile_len = get_max_owner()
	default_limit.devices_len = get_max_client()
	default_limit.category_len = get_max_key()
	
	return default_limit
end

function Parentctl:get_owner_list()
    local support_pctl_v2_optimize = uci_r:get_profile(PC_PROFILE_NAME, "support_pctl_v2_optimize") or "no"
    local owner_list = {}

    uci_r:foreach(PC_CONFIG_NAME, "owner",
        function(section)
            local owner = {}
            owner.owner_id = section.owner_id
			owner.key = section.owner_id
            owner.name = section.name
            if section.blocked == "1" then
                owner.internet_blocked = true
            else
                owner.internet_blocked = false
            end

            if support_pctl_v2_optimize == "yes" then
                -- website type
                if section.website_type == "2" then
                    owner.website_type = "white"
                else
                    owner.website_type = "black"
                end
                -- black website list
                owner.black_website_list = section.website or {}
                -- white website list
                owner.white_website_list = section.website_white or {}
            else
                owner.website_list = section.website or {}
            end

            if section.workday_limit == "1" then
                owner.enable_workday_time_limit = true
                owner.workday_daily_time = section.workday_time
            else
                owner.enable_workday_time_limit = false
                owner.workday_daily_time = section.workday_time or "120"
            end
            if section.weekend_limit == "1" then
                owner.enable_weekend_time_limit = true
                owner.weekend_daily_time = section.weekend_time
            else
                owner.enable_weekend_time_limit = false
                owner.weekend_daily_time = section.weekend_time or "120"
            end

			if support_pctl_v2_optimize == "yes" then
				owner.sun_time = time_to_array(section.sun_time)
				owner.mon_time = time_to_array(section.mon_time)
				owner.tue_time = time_to_array(section.tue_time)
				owner.wed_time = time_to_array(section.wed_time)
				owner.thu_time = time_to_array(section.thu_time)
				owner.fri_time = time_to_array(section.fri_time)
				owner.sat_time = time_to_array(section.sat_time)
				owner.online_total = get_online_total(owner.owner_id)
			else
                if section.workday_bedtime == "1" then
                    owner.enable_workday_bed_time = true
                    owner.workday_bed_time_begin = section.workday_begin
                    owner.workday_bed_time_end = section.workday_end
                else
                    owner.enable_workday_bed_time = false
                    owner.workday_bed_time_begin = section.workday_begin or "1320"
                    owner.workday_bed_time_end = section.workday_end or "420"
                end
                if section.weekend_bedtime == "1" then
                    owner.enable_weekend_bed_time = true
                    owner.weekend_bed_time_begin = section.weekend_begin
                    owner.weekend_bed_time_end = section.weekend_end
                else
                    owner.enable_weekend_bed_time = false
                    owner.weekend_bed_time_begin = section.weekend_begin or "1320"
                    owner.weekend_bed_time_end = section.weekend_end or "420"
                end
            end
			
			owner.client_list = clientmgmt.get_client_list_by(owner.owner_id)
			-- dbg.print(owner.client_list)
			
            owner_list[#owner_list + 1] = owner
        end
    )

    return owner_list
end


function Parentctl:insert_owner(http_form)
	local support_pctl_v2_optimize = uci_r:get_profile(PC_PROFILE_NAME, "support_pctl_v2_optimize") or "no"
	local key = http_form.key
	local new_owner = http_form["new"]
    local new_owner = luci.json.decode(new_owner)

    if not new_owner and type(new_owner) ~= "table" then
        return {errorcode="invalid new params"}
    end
	
	-- 1. check num
    local remain_num = get_remain_owner_num()
    if 1 > remain_num then
        return false, "owner num exceeds max num limit"
    end

    -- 2. check used id
    if not _id_used then
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

    -- 3. add owner
    local max_owner = get_max_owner()
    local owner = {}

    -- get id
    local id = 0
    while not owner.owner_id and id < max_owner do
        if not _id_used[id] then
        owner.owner_id = id
        _id_used[id] = true
			break
		end
		id = id + 1
	end

	-- client list
	local cli = {}
	cli.owner_id = owner.owner_id
	cli.client_list = new_owner.client_list 
	local res, errorcode = self:add_clients(cli)
	if not res then
		return res, errorcode
	end

	-- block
	owner.name = new_owner.name
	if new_owner.internet_blocked == true then
		owner.blocked = "1"
	else
		owner.blocked = "0"
	end

	-- filter
	--owner.filter_level = new_owner.filter_level
	--local category = new_owner.categories_list
	--if #category > 0 then            
	--	owner.category = category
	--end
	if support_pctl_v2_optimize == "yes" then
		-- website type
		if new_owner.website_type == "white" then
			owner.website_type = "2"
		else
			owner.website_type = "1"
		end
		-- black website list
		local website = new_owner.black_website_list
		if website and #website > 0 then
			owner.website = website
		end
		-- white website list
		local website_white = new_owner.white_website_list
		if website_white and #website_white > 0 then
			owner.website_white = website_white
		end
	else
		local website = new_owner.website_list
		if website and #website > 0 then
			owner.website = website
		end
	end

	-- time limits
	if new_owner.enable_workday_time_limit == true then
		owner.workday_limit = "1"
	else
		owner.workday_limit = "0"
	end
	owner.workday_time = new_owner.workday_daily_time
			
	if new_owner.enable_weekend_time_limit == true then
		owner.weekend_limit = "1"
	else
		owner.weekend_limit = "0"
	end
	owner.weekend_time = new_owner.weekend_daily_time

	if support_pctl_v2_optimize == "yes" then
        owner.sun_time = time_to_int(new_owner.sun_time)
        owner.mon_time = time_to_int(new_owner.mon_time)
        owner.tue_time = time_to_int(new_owner.tue_time)
        owner.wed_time = time_to_int(new_owner.wed_time)
        owner.thu_time = time_to_int(new_owner.thu_time)
        owner.fri_time = time_to_int(new_owner.fri_time)
        owner.sat_time = time_to_int(new_owner.sat_time)
    else
		-- bed time
		if new_owner.enable_workday_bed_time == true then
			owner.workday_bedtime = "1"
		else
			owner.workday_bedtime = "0"
		end
		owner.workday_begin = new_owner.workday_bed_time_begin
		owner.workday_end = new_owner.workday_bed_time_end
			
		if new_owner.enable_weekend_bed_time == true then
			owner.weekend_bedtime = "1"
		else
			owner.weekend_bedtime = "0"
		end
		owner.weekend_begin = new_owner.weekend_bed_time_begin
		owner.weekend_end = new_owner.weekend_bed_time_end
	end

	-- save in config
	local res = uci_r:section(PC_CONFIG_NAME, "owner", owner.owner_id, owner)
	if not res then
		return res, "uci section failed"
	end

    res = self:commit()
	if res then
		-- sync HNAT
		Nat:sync_hnat_status()
		
		return self:get_owner_list()
	end
end

function Parentctl:update_owner(http_form)
	local support_pctl_v2_optimize = uci_r:get_profile(PC_PROFILE_NAME, "support_pctl_v2_optimize") or "no"
	local key = http_form.key
	local new_owner = http_form["new"]
    local owner = luci.json.decode(new_owner)

    if not owner and type(owner) ~= "table" then
        return {errorcode="invalid new params"}
    end
    
    local info = {}
    info.owner_id = owner.owner_id    
    info.name = owner.name

    -- block    
    if owner.internet_blocked then
        self:block_owner(owner)
    end

    -- filter
    if support_pctl_v2_optimize == "yes" then
        -- website type
        if owner.website_type == "white" then
            info.website_type = "2"
        else
            info.website_type = "1"
        end
        -- black website list
        uci_r:delete(PC_CONFIG_NAME, info.owner_id, "website")
        local website = owner.black_website_list
        if website and #website > 0 then
            info.website = website
        end
        -- white website list
        uci_r:delete(PC_CONFIG_NAME, info.owner_id, "website_white")
        local website_white = owner.white_website_list
        if website_white and #website_white > 0 then
            info.website_white = website_white
        end
    else
	    uci_r:delete(PC_CONFIG_NAME, info.owner_id, "website")
	    local website = owner.website_list
	    if website and #website > 0 then
	        info.website = website
	    end
    end
        
    -- client list    
    if owner.client_list then
		clientmgmt.remove_client_list_for(owner.owner_id)  
        
        local cli = {}
        cli.owner_id = owner.owner_id
        cli.client_list = owner.client_list
		
        local res, errorcode = self:add_clients(cli)
        if not res then
            return res, errorcode
        end
    end

    -- time limits
	if owner.enable_workday_time_limit == true then
		info.workday_limit = "1"
	else
		info.workday_limit = "0"
	end
	info.workday_time = owner.workday_daily_time
			
	if owner.enable_weekend_time_limit == true then
		info.weekend_limit = "1"
	else
		info.weekend_limit = "0"            
	end
	info.weekend_time = owner.weekend_daily_time

	-- bed time
    if support_pctl_v2_optimize == "yes" then
        info.sun_time = time_to_int(owner.sun_time)
        info.mon_time = time_to_int(owner.mon_time)
        info.tue_time = time_to_int(owner.tue_time)
        info.wed_time = time_to_int(owner.wed_time)
        info.thu_time = time_to_int(owner.thu_time)
        info.fri_time = time_to_int(owner.fri_time)
        info.sat_time = time_to_int(owner.sat_time)
    else
		if owner.enable_workday_bed_time == true then
			info.workday_bedtime = "1"
		else
			info.workday_bedtime = "0"            
		end
		info.workday_begin = owner.workday_bed_time_begin
		info.workday_end = owner.workday_bed_time_end
			
		if owner.enable_weekend_bed_time == true then
			info.weekend_bedtime = "1"
		else
			info.weekend_bedtime = "0"            
		end
		info.weekend_begin = owner.weekend_bed_time_begin
		info.weekend_end = owner.weekend_bed_time_end
	end

    -- save in config
    local res = uci_r:section(PC_CONFIG_NAME, "owner", info.owner_id, info)
    if not res then
        return res, "uci section failed"
    end

    res = self:commit()	
	if res then
		return self:get_owner_list()
	end
end

function Parentctl:remove_owner(http_form)
	local owner_id = http_form.key
	
	--need to check whether owner_id is legal,as it may hacked by code injection...
	if owner_id ~= nil and tonumber(owner_id) == nil then
		return {errorcode="Invalid owner_id!"}
	end
    -- remove client list
	clientmgmt.remove_client_list_for(owner_id)  
        
    -- filter and time
    uci_r:delete(PC_CONFIG_NAME, owner_id)

	flush_log_in_kernel(owner_id)
	
    local res = self:commit()
	if res then
		-- sync HNAT
		Nat:sync_hnat_status()
		
		local data = {
			[1] = {
				success = true,
				key = http_form.key,
				index = http_form.index
			}
		}
		return data
	end
end


function Parentctl:block_owner(owner)
    local blocked = uci_r:get_bool(PC_CONFIG_NAME, owner.owner_id, "blocked")

    if blocked ~= owner.internet_blocked then
        local info = {}
        info.owner_id = owner.owner_id

        -- get client list of owner
        if owner.internet_blocked == true then
            info.blocked = "1"
        else
            info.blocked = "0"
        end
        uci_r:section(PC_CONFIG_NAME, "owner", info.owner_id, info)

        return self:commit()
    end

    return true
end

function Parentctl:get_insights(owner_id)
	local support_pctl_v2_optimize = uci_r:get_profile(PC_PROFILE_NAME, "support_pctl_v2_optimize") or "no"
    local res = {}
    res.owner_id = owner_id
    local insights = {}
	
	local f = io.open(PROC_PCTL..owner_id,"r")
	if f then
		for i=1,7 do
			local insightsEntry = {}
			local website_list = {}
			local per_hour = {}
			local head = f:read("*line")
			
			h_minutes, h_timestamp, num = string.match(head, "(%d+) (%d+) (%d+)") 
			--print("head: "..h_minutes.." "..h_timestamp.." "..num)
			insightsEntry.spend_online = h_minutes

			local tmp_array = string.split(head, " ")
			local h_time_limit
			if i == 1 then
				h_time_limit = tmp_array[5]
			else
				h_time_limit = tmp_array[4]
			end
			
			if h_time_limit ~= nil then
				h_time_limit = tonumber(h_time_limit)
			else
				h_time_limit = -1
			end

			if num ~= "0" or h_minutes ~= "0" or h_timestamp ~= "0" then
				local tmp = f:read("*line")
				--remove empty characters from the begin and end of a string
				tmp = string.gsub(tmp, "^%s*(.-)%s*$", "%1")
				--string to array
				per_hour = string.split(tmp, " ")
			else
				for j=1, 24 do
					per_hour[#per_hour + 1] = "0"
				end
			end
			if support_pctl_v2_optimize == "yes" then
				insightsEntry.per_hour = per_hour
				
				if i == 1 then
					-- update current time_limit immediately
					local now_week = os.date("%a")
					local tmp_limit
					local tmp_time_limit
					if now_week == "Sun" or now_week == "Sat" then
						tmp_limit = uci_r:get(PC_CONFIG_NAME, tostring(owner_id), "weekend_limit")
						if tmp_limit == "1" then
							tmp_time_limit = uci_r:get(PC_CONFIG_NAME, tostring(owner_id), "weekend_time")
							insightsEntry.time_limit = tmp_time_limit
						else
							insightsEntry.time_limit = -1
						end
					else
						tmp_limit = uci_r:get(PC_CONFIG_NAME, tostring(owner_id), "workday_limit")
						if tmp_limit == "1" then
							tmp_time_limit = uci_r:get(PC_CONFIG_NAME, tostring(owner_id), "workday_time")
							insightsEntry.time_limit = tmp_time_limit
						else
							insightsEntry.time_limit = -1
						end
					end
				else
					insightsEntry.time_limit = h_time_limit
				end
			end
            
			for j=1,num do
				local web_entry = {}
				local detail = f:read("*line")
				_,url,d_minutes,d_count,d_timestamp = string.match(detail, "(%d+) ([^,;]+) (%d+) (%d+) (%d+)")
				--print("detail: "..url.." "..d_minutes.." "..d_timestamp)
				web_entry.website = url
				web_entry.block = website_is_blocked(owner_id, url)
				web_entry.spend_online = d_minutes
				website_list[#website_list + 1] = web_entry
			end
			table.sort(website_list, function(a,b) return tonumber(a.spend_online) > tonumber(b.spend_online) end)
			if support_pctl_v2_optimize ~= "yes" then
				while #website_list > 10 do
					table.remove(website_list, #website_list)
				end
			end
			insightsEntry.website_list = website_list
			insights[i] = insightsEntry
		end
		f:close()
	else
		dbg.print("open "..PROC_PCTL..owner_id.."failed.\n")
        for i = 1, 7 do
            local insightsEntry = {}
            insightsEntry.spend_online = 0
            insightsEntry.website_list = {}
            insights[i] = insightsEntry
        end		
	end
	
    res.insights = insights
    return res
end

function Parentctl:get_insight_history(owner_id)
	local support_pctl_v2_optimize = uci_r:get_profile(PC_PROFILE_NAME, "support_pctl_v2_optimize") or "no"
    local res = {}
    res.owner_id = owner_id

    local history_list = {}

	local f = io.open(PROC_PCTL..owner_id,"r")
	if f then
		for i=1,7 do
            local per_hour = {}
			local head = f:read("*line")
			h_minutes, h_timestamp, num = string.match(head, "(%d+) (%d+) (%d+)") 

			if num ~= "0" or h_minutes ~= "0" or h_timestamp ~= "0" then
                local tmp = f:read("*line")
                --remove empty characters from the begin and end of a string
                tmp = string.gsub(tmp, "^%s*(.-)%s*$", "%1")
                --string to array
                per_hour = string.split(tmp, " ")
            else
                for j=1, 24 do
                    per_hour[#per_hour + 1] = "0"
                end
            end
            if support_pctl_v2_optimize == "yes" then
                insightsEntry.per_hour = per_hour
            end
			
			for j=1,num do
				local web_entry = {}
				local detail = f:read("*line")
				_,url,d_minutes,d_count,d_timestamp = string.match(detail, "(%d+) ([^,;]+) (%d+) (%d+) (%d+)")
				web_entry.website = url
				web_entry.block = website_is_blocked(owner_id, url)
				web_entry.access_timestamp = d_timestamp
				history_list[#history_list + 1] = web_entry
			end
		end
		f:close()
	else
		dbg.print("open "..PROC_PCTL..owner_id.."failed.\n")	
	end	
    
    res.history = history_list

    return res
end

function Parentctl:add_clients(owner)
    local client_list = owner.client_list

    local cur_time = os.time()
    for i, v in ipairs(client_list) do
        local client = {}
        local mac = v.mac or v
        client.mac = mac:gsub(":", "-"):upper()
        client.owner_id = owner.owner_id        
        client.name = v.name   
        client.type = v.client_type  
        client.access_time = cur_time
		
        local res, error_code = clientmgmt.set_client_info(client)
        if not res then
            return res, error_code
        end        
    end

    return true
end

function Parentctl:filter_website(http_form)
	local new_website = {}
    local old_website = uci_r:get_list(PC_CONFIG_NAME, http_form.owner_id, "website")
	
	for i = 1, #old_website do
		if old_website[i] ~= http_form.website then
			new_website[#new_website + 1] = old_website[i]
		end
	end
	if http_form.blocked_status == "true" then
		new_website[#new_website + 1] = http_form.website
	end
	uci_r:delete(PC_CONFIG_NAME, http_form.owner_id, "website")
	if #new_website ~= 0 then
		uci_r:set_list(PC_CONFIG_NAME, http_form.owner_id, "website", new_website)
	end

    return self:commit()
end

function Parentctl:get_default_website()
    local app_list = {}
    local version

    version, app_list = get_dev_support_app_list()
    
    return app_list
end


function Parentctl:get_client_list()
	--return client_list
	return clientmgmt.get_access_client_list()
end


function Parentctl:tmp_read_settings()
    local ret = {}
    local result = {}
    local enable = uci_r:get(PC_CONFIG_NAME, "settings", "enable") == "on" and true or false
    result.enable = enable
    ret.result = luci.json.encode(result)
    return ret
end

function Parentctl:tmp_write_settings(app_form)
    local ret = {}
    local result = {}
    local data = luci.json.decode(app_form.data)
    uci_r:set(PC_CONFIG_NAME, "settings", "enable", data.enable == true and "on" or "off")
    uci_r:commit(PC_CONFIG_NAME)
    if data.enable == true then
        sys.fork_exec(PC_RESTART_CMD)
    else
        sys.fork_exec(PC_STOP_CMD)
    end
    local ret = {}
    local result = {}
    ret.result = luci.json.encode(result)
    return ret
end

function Parentctl:tmp_get_owner_list(app_form)
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
    local owner_list = {}
	
    uci_r:foreach(PC_CONFIG_NAME, "owner",
        function(section)
            local owner = {}
			if total >=start_index and total < start_index + amount then
				owner.owner_id = tonumber(section.owner_id)
				owner.name = nixio.bin.b64encode(section.name)
				owner.internet_blocked = tonumber(section.blocked)
				
				--local insights_today_data = uci_t:get("pc_insights", tostring(owner.owner_id), "day_1")
				local insights_today_data = self:get_insights(section.owner_id)
				if insights_today_data then
					--local insights_today_table , _= get_insights_daily_table(owner.owner_id, insights_today_data)
					local insights_today_table  = insights_today_data.insights
					owner.insights = tonumber(insights_today_table[1].spend_online)
				else
					owner.insights = 0
				end

				owner.filter_level = section.filter_level

				if section.workday_limit == "1" then
					owner.workday_daily_time = tonumber(section.workday_time)
				else
					owner.workday_daily_time = -1
				end
				if section.weekend_limit == "1" then
					owner.weekend_daily_time = tonumber(section.weekend_time)
				else
					owner.weekend_daily_time = -1
				end
				
				local client_list = clientmgmt.get_client_list_by(tostring(owner.owner_id))
				owner.client_num = #client_list

				owner_list[#owner_list + 1] = owner
			end
			total = total + 1
        end
    )
	
	result.owner_list = owner_list
	result.owner_max = get_max_owner()
	result.filter_website_max = get_max_key()
	result.client_per_owner_max = get_max_client()
	result.sum = total
	result.amount = #owner_list
	result.start_index = start_index

     --res.result = luci.json.encode(result)
    return result
end

function Parentctl:tmp_insert_owner(app_form)
    local support_pctl_v2_optimize = uci_r:get_profile(PC_PROFILE_NAME, "support_pctl_v2_optimize") or "no"
    if support_pctl_v2_optimize == "yes" then
        local data = luci.json.decode(app_form.data)
        local time_limits = data.time_limits
        if not data and type(data) ~= "table" then
            dbg.print("invalid data")
            return {errorcode="invalid new params"}
        end
        if data.name == nil or data.internet_blocked == nil 
        or time_limits.enable_workday_time_limit == nil or time_limits.workday_daily_time == nil 
        or time_limits.enable_weekend_time_limit == nil or time_limits.weekend_daily_time == nil 
        or data.allow_time_list == nil then
            dbg.print("invalid data")
            return {errorcode="invalid new params"}
        end
        app_form.data = nil
        app_form.name = data.name
        app_form.internet_blocked = data.internet_blocked
        app_form.enable_workday_time_limit = time_limits.enable_workday_time_limit == true and "1" or "0"
        app_form.workday_daily_time = time_limits.workday_daily_time
        app_form.enable_weekend_time_limit = time_limits.enable_weekend_time_limit == true and "1" or "0"
        app_form.weekend_daily_time = time_limits.weekend_daily_time
        app_form.allow_time_list = data.allow_time_list
    end
    
	--local data = app_form
	local data = {} 
	local ret = {}
	local result = {}
	local l_time_limits = {}
	local l_bed_time = {}
    local allow_time_list = {}
	
	l_time_limits.enable_workday_time_limit = tonumber(app_form.enable_workday_time_limit)
	l_time_limits.workday_daily_time = app_form.workday_daily_time
	l_time_limits.enable_weekend_time_limit = tonumber(app_form.enable_weekend_time_limit)
	l_time_limits.weekend_daily_time = app_form.weekend_daily_time

	if support_pctl_v2_optimize == "yes" then
        allow_time_list = app_form.allow_time_list
    else
		l_bed_time.enable_workday_bed_time = tonumber(app_form.enable_workday_bed_time)
		l_bed_time.workday_bed_time_begin = app_form.workday_bed_time_begin
		l_bed_time.workday_bed_time_end = app_form.workday_bed_time_end
		l_bed_time.enable_weekend_bed_time = tonumber(app_form.enable_weekend_bed_time)
		l_bed_time.weekend_bed_time_begin = app_form.weekend_bed_time_begin
		l_bed_time.weekend_bed_time_end = app_form.weekend_bed_time_end
	end
	
	data.name = app_form.name
	data.internet_blocked = app_form.internet_blocked
	data.time_limits = l_time_limits
	if support_pctl_v2_optimize == "yes" then
        data.allow_time_list = allow_time_list
    else
		data.bed_time = l_bed_time
	end

	--dbg.dumptable(app_form)	
	-- 1. check num
    
	local remain_num = get_remain_owner_num()
    if 1 > remain_num then
		dbg.print("owner num exceeds max num limit")
        return false, "owner num exceeds max num limit"
    end

    -- 2. check used id
    if not _id_used then
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

    -- 3. add owner
    local max_owner = get_max_owner()
    local owner = {}

    -- get id
    local id = 0
    while not owner.owner_id and id < max_owner do
        if not _id_used[id] then
        owner.owner_id = id
        _id_used[id] = true
			break
		end
		id = id + 1
	end

	-- block
	owner.name = nixio.bin.b64decode(data.name)
	if data.internet_blocked == 1 then
		owner.blocked = "1"
	else
		owner.blocked = "0"
	end
	-- time limits
	local time_limits = data.time_limits
	--if time_limits.enable_workday_time_limit == true then
	if time_limits.enable_workday_time_limit == 1 then
		owner.workday_limit = "1"
		owner.workday_time = time_limits.workday_daily_time
	else
		owner.workday_limit = "0"
	end
	--if time_limits.enable_weekend_time_limit == true then
	if time_limits.enable_weekend_time_limit == 1 then
		owner.weekend_limit = "1"
		owner.weekend_time = time_limits.weekend_daily_time
	else
		owner.weekend_limit = "0"
	end

	if support_pctl_v2_optimize == "yes" then
        -- allow time list
        owner.sun_time = data.allow_time_list[1]
        owner.mon_time = data.allow_time_list[2]
        owner.tue_time = data.allow_time_list[3]
        owner.wed_time = data.allow_time_list[4]
        owner.thu_time = data.allow_time_list[5]
        owner.fri_time = data.allow_time_list[6]
        owner.sat_time = data.allow_time_list[7]
    else
		-- bed time
		local bed_time = data.bed_time
		--if bed_time.enable_workday_bed_time == true then
		if bed_time.enable_workday_bed_time == 1 then
			owner.workday_bedtime = "1"
			owner.workday_begin = bed_time.workday_bed_time_begin
			owner.workday_end = bed_time.workday_bed_time_end
		else
			owner.workday_bedtime = "0"
		end
		--if bed_time.enable_weekend_bed_time == true then
		if bed_time.enable_weekend_bed_time == 1 then
			owner.weekend_bedtime = "1"
			owner.weekend_begin = bed_time.weekend_bed_time_begin
			owner.weekend_end = bed_time.weekend_bed_time_end
		else
			owner.weekend_bedtime = "0"
		end
	end
	
	owner.filter_level = "adult"
	-- save in config
	local res = uci_r:section(PC_CONFIG_NAME, "owner", tostring(owner.owner_id), owner)
	if not res then
		return res, "uci section failed"
	end

    self:commit()
	
	-- sync HNAT
	Nat:sync_hnat_status()
	
	result.owner_id = owner.owner_id
	
	if support_pctl_v2_optimize == "yes" then
        ret.result = luci.json.encode(result)
        return ret
    else
		return result
	end
	--ret.result = luci.json.encode(result)
	--return ret
end

function Parentctl:tmp_remove_owner(app_form)
	--[[
	local data = luci.json.decode(app_form.data)
	if not data and type(data) ~= "table" then
		dbg.print("invalid data")
		return {errorcode="invalid new params"}
	end
	]]--
	local data = app_form
	local owner_list = luci.json.decode(data.owner_list)
	
	
	for i, v in ipairs(owner_list) do
		-- remove client list
		clientmgmt.remove_client_list_for(v)  
		-- filter and time
		uci_r:delete(PC_CONFIG_NAME, v)
	end

    self:commit()
	
	-- sync HNAT
	Nat:sync_hnat_status()
	
	local ret = {}
	local result = {}
	
	return result
	--ret.result = luci.json.encode(result)
	--return ret
end

function Parentctl:tmp_get_time_limit(app_form)
	local support_pctl_v2_optimize = uci_r:get_profile(PC_PROFILE_NAME, "support_pctl_v2_optimize") or "no"
	if support_pctl_v2_optimize == "yes" then
		local data = luci.json.decode(app_form.data)
		if not data and type(data) ~= "table" then
			dbg.print("invalid data")
			return {errorcode="invalid new params"}
		end
		app_form = data
	end
	local data = app_form
	local result = {}
    local owner_id = tonumber(data.owner_id)
	
	dbg.dumptable(data)

    uci_r:foreach(PC_CONFIG_NAME, "owner",
        function(section)
			--dbg.dumptable(section)
			if tonumber(section.owner_id) == owner_id then
				local time_limits = {}
				dbg.print("owner_id")
				if section.workday_limit == "1" then
					time_limits.enable_workday_time_limit = true
					time_limits.workday_daily_time = tonumber(section.workday_time)
				else
					time_limits.enable_workday_time_limit = false
					time_limits.workday_daily_time = tonumber(section.workday_time or "120")
				end
				if section.weekend_limit == "1" then
					time_limits.enable_weekend_time_limit = true
					time_limits.weekend_daily_time = tonumber(section.weekend_time)
				else
					time_limits.enable_weekend_time_limit = false
					time_limits.weekend_daily_time = tonumber(section.weekend_time or "120")
				end
				result.time_limits = time_limits

				if support_pctl_v2_optimize == "yes" then
					-- allow time list
					local allow_time_list = {}
					allow_time_list[1] = tonumber(section.sun_time)
					allow_time_list[2] = tonumber(section.mon_time)
					allow_time_list[3] = tonumber(section.tue_time)
					allow_time_list[4] = tonumber(section.wed_time)
					allow_time_list[5] = tonumber(section.thu_time)
					allow_time_list[6] = tonumber(section.fri_time)
					allow_time_list[7] = tonumber(section.sat_time)
					result.allow_time_list = allow_time_list
				else
					-- bed time
					local bed_time = {}
					if section.workday_bedtime == "1" then
						bed_time.enable_workday_bed_time = true
						bed_time.workday_bed_time_begin = section.workday_begin
						bed_time.workday_bed_time_end = section.workday_end
					else
						bed_time.enable_workday_bed_time = false
						bed_time.workday_bed_time_begin = section.workday_begin or "1320"
						bed_time.workday_bed_time_end = section.workday_end or "420"
					end
					if section.weekend_bedtime == "1" then
						bed_time.enable_weekend_bed_time = true
						bed_time.weekend_bed_time_begin = section.weekend_begin
						bed_time.weekend_bed_time_end = section.weekend_end
					else
						bed_time.enable_weekend_bed_time = false
						bed_time.weekend_bed_time_begin = section.weekend_begin or "1320"
						bed_time.weekend_bed_time_end = section.weekend_end or "420"
					end
					result.bed_time = bed_time
				end
			end
        end
    )
	
	local res = {}
	res.enable_workday_time_limit = result.time_limits.enable_workday_time_limit == true and 1 or 0
	res.workday_daily_time = result.time_limits.workday_daily_time
	res.enable_weekend_time_limit = result.time_limits.enable_weekend_time_limit == true and 1 or 0
	res.weekend_daily_time = result.time_limits.weekend_daily_time

	if support_pctl_v2_optimize == "yes" then
		res.allow_time_list = result.allow_time_list
	else
		res.enable_workday_bed_time = result.bed_time.enable_workday_bed_time  == true and 1 or 0
		res.workday_bed_time_begin = result.bed_time.workday_bed_time_begin
		res.workday_bed_time_end = result.bed_time.workday_bed_time_end
		res.enable_weekend_bed_time = result.bed_time.enable_weekend_bed_time  == true and 1 or 0
		res.weekend_bed_time_begin = result.bed_time.weekend_bed_time_begin
		res.weekend_bed_time_end = result.bed_time.weekend_bed_time_end
	end

	if support_pctl_v2_optimize == "yes" then
		local ret = {}
		ret.result = luci.json.encode(result)
		return ret
	else
		return res
	end
	--dbg.dumptable(result)
	--local ret = {}
	--ret.result = luci.json.encode(result)
	--return ret
end

function Parentctl:tmp_set_time_limit(app_form)
	local support_pctl_v2_optimize = uci_r:get_profile(PC_PROFILE_NAME, "support_pctl_v2_optimize") or "no"
	if support_pctl_v2_optimize == "yes" then
		local data = luci.json.decode(app_form.data)
		local time_limits = data.time_limits
		if not data and type(data) ~= "table" then
			dbg.print("invalid data")
			return {errorcode="invalid new params"}
		end
		if data.owner_id == nil or data.allow_time_list == nil 
		or time_limits.enable_workday_time_limit == nil or time_limits.workday_daily_time == nil 
		or time_limits.enable_weekend_time_limit == nil or time_limits.weekend_daily_time == nil then
			dbg.print("invalid data")
			return {errorcode="invalid new params"}
		end
		app_form.data = nil
		app_form.owner_id = data.owner_id
		app_form.enable_workday_time_limit = time_limits.enable_workday_time_limit == true and "1" or "0"
		app_form.workday_daily_time = time_limits.workday_daily_time
		app_form.enable_weekend_time_limit = time_limits.enable_weekend_time_limit == true and "1" or "0"
		app_form.weekend_daily_time = time_limits.weekend_daily_time
		app_form.allow_time_list = data.allow_time_list
	end
	local data = app_form
	local owner = {}
    owner.owner_id = data.owner_id    
	
	dbg.dumptable(data)
    -- time limits
	local time_limits = {}
	-- bed time
	local bed_time = {}
	time_limits.enable_workday_time_limit = tonumber(data.enable_workday_time_limit)  --== true and 1 or 0
	time_limits.workday_daily_time = data.workday_daily_time
	time_limits.enable_weekend_time_limit = tonumber(data.enable_weekend_time_limit)  -- == true and 1 or 0
	time_limits.weekend_daily_time = data.weekend_daily_time

	if support_pctl_v2_optimize == "yes" then
		allow_time_list = data.allow_time_list
	else
		bed_time.enable_workday_bed_time = tonumber(data.enable_workday_bed_time)  -- == true and 1 or 0
		bed_time.workday_bed_time_begin = data.workday_bed_time_begin
		bed_time.workday_bed_time_end = data.workday_bed_time_end
		bed_time.enable_weekend_bed_time = tonumber(data.enable_weekend_bed_time)  -- == true and 1 or 0
		bed_time.weekend_bed_time_begin = data.weekend_bed_time_begin
		bed_time.weekend_bed_time_end = data.weekend_bed_time_end
	end
	
	--if time_limits.enable_workday_time_limit == true then
	if time_limits.enable_workday_time_limit == 1 then
		owner.workday_limit = "1"
		owner.workday_time = time_limits.workday_daily_time
	else
		owner.workday_limit = "0"
	end
	--if time_limits.enable_weekend_time_limit == true then
	if time_limits.enable_weekend_time_limit == 1 then
		owner.weekend_limit = "1"
		owner.weekend_time = time_limits.weekend_daily_time
	else
		owner.weekend_limit = "0"
	end

	if support_pctl_v2_optimize == "yes" then
		-- allow time list
		owner.sun_time = data.allow_time_list[1]
		owner.mon_time = data.allow_time_list[2]
		owner.tue_time = data.allow_time_list[3]
		owner.wed_time = data.allow_time_list[4]
		owner.thu_time = data.allow_time_list[5]
		owner.fri_time = data.allow_time_list[6]
		owner.sat_time = data.allow_time_list[7]
	else
		--if bed_time.enable_workday_bed_time == true then
		if bed_time.enable_workday_bed_time == 1 then
			owner.workday_bedtime = "1"
			owner.workday_begin = bed_time.workday_bed_time_begin
			owner.workday_end = bed_time.workday_bed_time_end
		else
			owner.workday_bedtime = "0"
		end
		--if bed_time.enable_weekend_bed_time == true then
		if bed_time.enable_weekend_bed_time == 1 then
			owner.weekend_bedtime = "1"
			owner.weekend_begin = bed_time.weekend_bed_time_begin
			owner.weekend_end = bed_time.weekend_bed_time_end
		else
			owner.weekend_bedtime = "0"
		end
	end

    -- save in config
    local res = uci_r:section(PC_CONFIG_NAME, "owner", tostring(owner.owner_id), owner)
    if not res then
        return res, "uci section failed"
    end

	self:commit()
	
	local ret = {}
	local result = {}
	
	if support_pctl_v2_optimize == "yes" then
		ret.result = luci.json.encode(result)
		return ret
	else
		return result
	end
	--ret.result = luci.json.encode(result)
	--return ret
end

function Parentctl:tmp_get_filter(app_form)
	--[[ 
	local data = luci.json.decode(app_form.data)
	if not data and type(data) ~= "table" then
		dbg.print("invalid data")
		return {errorcode="invalid new params"}
	end
	]]--
	local data = app_form
	local owner_id = data.owner_id
	local start_index = data.start_index
	local amount = data.amount
	local total = 0
	local websites = {}
	local res = {}
	local result = {}
	--local filter_website_list = "["

	uci_r:foreach(PC_CONFIG_NAME, "owner",
        function(section)
            if tonumber(section.owner_id) == owner_id then
				local website_list = section.website
				result.filter_level = section.filter_level
				if start_index == 0 then
					result.filter_categories_list = section.category or {}
				end
				if website_list then
					for i, v in ipairs(website_list) do
						if total >= start_index and total < (start_index + amount) then
							websites[#websites + 1] = v
							--[[
							filter_website_list = filter_website_list .."\"" .. v .. "\""
							if total ~= start_index + amount -1 then
								filter_website_list = filter_website_list .. "," 
							end
							]]--
						end
						total = total + 1
					end
				end
			end
        end
    )
	--filter_website_list = filter_website_list .."]"
	result.owner_id = owner_id
	result.start_index = start_index
	result.amount = #websites
	result.sum = total
	--result.filter_website_list = filter_website_list
	result.filter_website_list = luci.json.encode(websites)


	dbg.dumptable(result)

	return result
	--res.result = luci.json.encode(result)
    --return res
end

function Parentctl:tmp_set_filter(app_form)
	--[[
	local data = luci.json.decode(app_form.data)
	if not data and type(data) ~= "table" then
		dbg.print("invalid data")
		return {errorcode="invalid new params"}
	end
	]]--
	local data = app_form
	local owner_id = data.owner_id
	local start_index = data.start_index
    if start_index == 0 then
        local filter_level = data.filter_level
		if filter_level then
			uci_r:set(PC_CONFIG_NAME, tostring(owner_id), "filter_level", filter_level)
		end
        
        local category = data.filter_categories_list
        if #category > 0 then            
			uci_r:delete(PC_CONFIG_NAME, tostring(owner_id), "category") 
            uci_r:set_list(PC_CONFIG_NAME, tostring(owner_id), "category", category)
        end
		
        local website = data.filter_website_list
        if website and #website > 0 then
			uci_r:delete(PC_CONFIG_NAME, tostring(owner_id), "website")
            uci_r:set_list(PC_CONFIG_NAME, tostring(owner_id), "website", website)
        end
	else
		local old_website = uci_r:get_list(PC_CONFIG_NAME, tostring(owner_id), "website")
		local website = data.filter_website_list
		
		for i = 1, #website do
			old_website[#old_website + 1] = website[i]
		end
		
		if #old_website ~= 0 then
			uci_r:delete(PC_CONFIG_NAME, tostring(owner_id), "website")
			uci_r:set_list(PC_CONFIG_NAME, tostring(owner_id), "website", new_website)
		end
    end
	
	self:commit()
	
	local ret = {}
	local result = {}
	
	return result
	--ret.result = luci.json.encode(result)
	--return ret
end

function Parentctl:tmp_edit_owner(app_form)
	--[[
	local data = luci.json.decode(app_form.data)
	if not data and type(data) ~= "table" then
		dbg.print("invalid data")
		return {errorcode="invalid new params"}
	end
	]]--

	local data = app_form
	local owner = {}
    owner.owner_id = data.owner_id    
    
    owner.name = nixio.bin.b64decode(data.name)
	--if data.internet_blocked == true then
	if tonumber(data.internet_blocked) == 1 then
		owner.blocked = "1"
	else
		owner.blocked = "0"
	end

    -- save in config
    local res = uci_r:section(PC_CONFIG_NAME, "owner", owner.owner_id, owner)
    if not res then
        return res, "uci section failed"
    end

	self:commit()
	
	local ret = {}
	local result = {}

	return result
	--ret.result = luci.json.encode(result)
	--return ret
end

function Parentctl:tmp_get_client_list(app_form)
	--[[
	local data = luci.json.decode(app_form.data)
	if not data and type(data) ~= "table" then
		dbg.print("invalid data")
		return {errorcode="invalid new params"}
	end
	]]--
	local data = app_form
	
	local start_index = tonumber(data.start_index)
	local amount = tonumber(data.amount)
	
	local total = 0
	local res = {}
	local result = {}
	
	local owner_id = data.owner_id
	local client_list = {}
	
	local clients = clientmgmt.get_client_list_by(tostring(owner_id))
	for i, v in ipairs(clients) do
        if total >= start_index and total < start_index + amount then
			v.name = nixio.bin.b64encode(v.name)
			client_list[#client_list + 1] = v
		end
		total = total + 1
    end
	
	result.owner_id = owner_id
	result.start_index = start_index
	result.amount = #client_list
	result.sum = total
	result.client_list = client_list
	
	return result
	--res.result = luci.json.encode(result)
    --return res
end

function Parentctl:tmp_add_client_list(app_form)
	--[[
	local data = luci.json.decode(app_form.data)
	if not data and type(data) ~= "table" then
		dbg.print("invalid data")
		return {errorcode="invalid new params"}
	end
	]]--
	local data = app_form
	
	dbg.dumptable(data)
	local cli = {}
	cli.owner_id = data.owner_id
	local client_list = luci.json.decode(data.client_list)
	--local client_list = data.client_list
	--dbg.dumptable(client_list)
	
	--local test = "[{\"mac\":\"74-D4-35-A1-0C-CB\",\"name\":\"VU5LTk9xTg==\",\"\client_type\":\"other\"}, {\"mac\":\"74-51-BA-E2-F6-60\",\"name\":\"Kg==\",\"\client_type\":\"other\"} ]"
	--local client_list = luci.json.decode(test) 

	for i, v in ipairs(client_list) do
		v.name = nixio.bin.b64decode(v.name)
    end
	cli.client_list = client_list
	

	local res, errorcode = self:add_clients(cli)
	if not res then
		return res, errorcode
	end

	-- NOTE: Add pc reload op after set device mac to client_mgmt!!
	sys.fork_exec(PC_RELOAD_CMD)

	local ret = {}
	local result = {}
	
	return result
	--ret.result = luci.json.encode(result)
	--return ret
end

function Parentctl:tmp_del_client_list(app_form)
	--[[
	local data = luci.json.decode(app_form.data)
	if not data and type(data) ~= "table" then
		dbg.print("invalid data")
		return {errorcode="invalid new params"}
	end
	]]--	
	local data = app_form
	
	local owner_id = tonumber(data.owner_id)
	--local client_list = data.client_list
	local client_list = luci.json.decode(data.clientmac_list)
	
	--dbg.dumptable(client_list)

	if owner_id and client_list then
		clientmgmt.remove_client_list(owner_id, client_list)
	end
	
	sys.fork_exec(PC_RELOAD_CMD)
	local ret = {}
	local result = {}
	
	return result
	--ret.result = luci.json.encode(result)
	--return ret
end

function Parentctl:tmp_get_insights(app_form)
	local support_pctl_v2_optimize = uci_r:get_profile(PC_PROFILE_NAME, "support_pctl_v2_optimize") or "no"
	if support_pctl_v2_optimize == "yes" then
		local data = luci.json.decode(app_form.data)
		if not data and type(data) ~= "table" then
			dbg.print("invalid data")
			return {errorcode="invalid new params"}
		end
		app_form.owner_id = data.owner_id
		if data.start_index and data.amount then
			app_form.start_index = data.start_index
			app_form.amount = data.amount
		end
	end

	local data = app_form
	local ret = {}
	local result = {}
	local owner_id = data.owner_id
	local res = self:get_insights(owner_id)
	
	local insights_old = res.insights
	local insights_new = {}

	local start_index = 0
	local amount = 0
	local total = 0
	local real_total = 0
	
	if support_pctl_v2_optimize == "yes" then
		if not data.start_index or not data.amount then
			for i, v in ipairs(insights_old) do
				local dayinsight = {}
				dayinsight.spend_online = tonumber(v.spend_online)
				dayinsight.time_limit = tonumber(v.time_limit)
				local website_list_old = v.website_list
				local website_list_new = {}
				local website_list_elem = {}
				local per_hour_num = {}

				for j=1, 24 do
					per_hour_num[#per_hour_num + 1] = tonumber(v.per_hour[j])
				end
				dayinsight.online_time_usage = per_hour_num
			
				for j, web in ipairs(website_list_old)  do 
					if j > 10 then
						break
					end
					website_list_elem = {}
					website_list_elem.website = web.website
					website_list_elem.spend_online = tonumber(web.spend_online)
					website_list_new[#website_list_new + 1] = website_list_elem
				end
				dayinsight.website_list = website_list_new	
				insights_new[#insights_new + 1]= dayinsight
			end

			result.owner_id = owner_id
			result.insights = insights_new
			--dbg.print("[tmp_get_insights] no index result: " .. luci.json.encode(result))
			ret.result = luci.json.encode(result)
			return ret
		else
			start_index = data.start_index
			amount = data.amount
			for i, v in ipairs(insights_old) do
				local dayinsight = {}
				local website_list_old = v.website_list
				local website_list_new = {}
				local website_list_elem = {}
				local per_hour_num = {}

				if start_index == 0 then
					dayinsight.spend_online = tonumber(v.spend_online)
					dayinsight.time_limit = tonumber(v.time_limit)
					for j=1, 24 do
						per_hour_num[#per_hour_num + 1] = tonumber(v.per_hour[j])
					end
					dayinsight.online_time_usage = per_hour_num
				end
			
				for j , web in ipairs(website_list_old)  do 
					if total >= start_index and total < start_index + amount then
						website_list_elem = {}
						website_list_elem.website = web.website
						website_list_elem.spend_online = tonumber(web.spend_online)
						website_list_new[#website_list_new + 1] = website_list_elem
						real_total = real_total + 1
					end
					total = total + 1
				end

				dayinsight.website_list = website_list_new			
				insights_new[#insights_new + 1]= dayinsight
			end

			result.owner_id = owner_id
			result.start_index = data.start_index
			result.amount = real_total
			result.sum = total
			result.insights = insights_new
			--dbg.print("[tmp_get_insights] index: " .. luci.json.encode(result))
			ret.result = luci.json.encode(result)
			return ret
		end
	else
		for i, v in ipairs(insights_old) do
			local dayinsight = {}
			dayinsight.spend_online = v.spend_online
			local website_list_old = v.website_list
			local website_list_new = "["
		
			for j , web in ipairs(website_list_old)  do   
				website_list_new = website_list_new  ..  "{\"" .. web.website  .. "\"," .. web.spend_online ..  "}"
				if j < #website_list_old then
				 website_list_new = website_list_new .. ","
				end
			end
		
			if #website_list_old  == 0 then
				dayinsight.website_list =   "[{\"\",0}]"
			else 
				dayinsight.website_list =  website_list_new .. "]"
			end
			
			insights_new[#insights_new + 1]= dayinsight
		end
		--result.insights = res.insights
		--result.insight = res.insights
		result.owner_id = owner_id
		result.insights = insights_new	
		return result
	end
end

function Parentctl:tmp_get_history(app_form)
	--[[
	local data = luci.json.decode(app_form.data)
	if not data and type(data) ~= "table" then
		dbg.print("invalid data")
		return {errorcode="invalid new params"}
	end
	]]--
	local data = app_form
	local start_index = tonumber(data.start_index)
	local amount = tonumber(data.amount)
	local owner_id = tonumber(data.owner_id)
	
	local total = 0
	local res = {}
	local result = {}
	
	local history = {}

    --[[
	uci_t:foreach("pc_insights", "owner",
    function(section)
        if owner_id == tonumber(section.owner_id) then
            history = get_insights_history_list( owner_id, section.history)
        end
    end
    )
	]]--
	local t_get_history = {}
	t_get_history = self:get_insight_history(data.owner_id)
	history = t_get_history.history

	local history_list = {}
	local history_list_new = "["
	
	for i, v in ipairs(history) do
        if total >= start_index and total < start_index + amount then
			history_list[#history_list + 1] = v
			history_list_new = history_list_new .. "{\""..v.website .."\"," ..v.access_timestamp.."}"
			if total < start_index + amount -1 then 
				history_list_new = history_list_new .. ","
			end
		end
		total = total + 1
    end
	
	history_list_new = history_list_new .. "]"	
	result.owner_id = owner_id
	result.start_index = start_index
	result.amount = #history_list
	result.sum = total
	--result.history = history_list
	--result.history = luci.json.encode(history_list)
	result.history = history_list_new
	--result.history = luci.json.encode(history_list_new)

	return result
    --res.result = luci.json.encode(result)
	--return res
end

function Parentctl:tmp_clear_history(app_form)
	--[[
	local data = luci.json.decode(app_form.data)
	if not data and type(data) ~= "table" then
		dbg.print("invalid data")
		return {errorcode="invalid new params"}
	end
	]]--
	local data = app_form
	local owner_id = data.owner_id
	--TODO
	
	local ret = {}
	local result = {}
	
	return result
	--ret.result = luci.json.encode(result)
	--return ret
end

function Parentctl:tmp_block_website(app_form)
	--[[
	local data = luci.json.decode(app_form.data)
	if not data and type(data) ~= "table" then
		dbg.print("invalid data")
		return {errorcode="invalid new params"}
	end
	]]--
	local data = app_form
	local owner_id = data.owner_id
	local website = data.website
	
	local new_website = {}
    --local old_website = uci_r:get_list(PC_CONFIG_NAME, http_form.owner_id, "website")
    local old_website = uci_r:get_list(PC_CONFIG_NAME, owner_id, "website")
	
	for i = 1, #old_website do
		if old_website[i] ~= website then
			new_website[#new_website + 1] = old_website[i]
		end
	end
	
	new_website[#new_website + 1] = website
	
	uci_r:delete(PC_CONFIG_NAME, tostring(owner_id), "website")
	if #new_website ~= 0 then
		uci_r:set_list(PC_CONFIG_NAME, tostring(owner_id), "website", new_website)
	end

    self:commit()
	
	local ret = {}
	local result = {}
	
	return result
	--ret.result = luci.json.encode(result)
	--return ret
end

function Parentctl:tmp_get_default_filter(app_form)
    local filter_level_list = {}
	local filter_list = {}
	local res = {}

    for key, val in pairs(FILTER_TBL) do
        local filter = {}
		local filter_level_detail = {}
        filter.filter_level = key
        filter_level_detail.categories_list = val.categories_list
		filter_level_detail.prefilter_list = val.prefilter_list
		filter_level_detail.website_list = val.website_list
		filter.filter_level_detail = filter_level_detail
        filter_level_list[#filter_level_list + 1] = filter
    end
	
	--filter_list.filter_website_file_ver,_ = get_dev_support_app_list()
	filter_list.filter_website_file_ver = get_dev_support_app_list()
	filter_list.filter_website_file_path = "/tmp/tm-shn/list_pc_filter_apps.db"
	filter_list.filter_level_list = filter_level_list
	
	return filter_list
	--res.result = luci.json.encode(filter_list)
    --return res
end

function Parentctl:tmp_get_website(app_form)
	local support_pctl_v2_optimize = uci_r:get_profile(PC_PROFILE_NAME, "support_pctl_v2_optimize") or "no"
	if support_pctl_v2_optimize == "yes" then
		local data = luci.json.decode(app_form.data)
		if not data and type(data) ~= "table" then
			dbg.print("invalid data")
			return {errorcode="invalid new params"}
		end
		app_form = data
	end
	
	local data = app_form
	local result = {}
	local owner_id =  tonumber(data.owner_id)
	local start_index = tonumber(data.start_index)
	local amount = tonumber(data.amount)

    local allwebsite = uci_r:get_list(PC_CONFIG_NAME, owner_id, "website")
	local website_list = {}
	local website_list_white = {}
	local total = 0
	--local filter_website_list = "["

	dbg.dumptable(app_form)

	for i, v in ipairs(allwebsite) do
        if total >= start_index and total < start_index + amount then
			website_list[#website_list + 1] = v
		end
		total = total + 1
    end

    if support_pctl_v2_optimize == "yes" then
    	allwebsite = uci_r:get_list(PC_CONFIG_NAME, owner_id, "website_white")
		for i, v in ipairs(allwebsite) do
		    if total >= start_index and total < start_index + amount then
				website_list_white[#website_list_white + 1] = v
			end
			total = total + 1
		end
    end
	
	--filter_website_list = filter_website_list .. "]" 
	
	result.owner_id = owner_id
	result.start_index = start_index
	result.sum = total

	if support_pctl_v2_optimize == "yes" then
		result.amount = #website_list + #website_list_white
		result.cur_mode = uci_r:get(PC_CONFIG_NAME, owner_id, "website_type") or "1"
		result.filter_website_list = website_list
		result.filter_website_list_wl = website_list_white
		local ret = {}
		ret.result = luci.json.encode(result)
		return ret
    else
		result.amount = #website_list
		--result.filter_website_list = website_list
		--result.filter_website_list = filter_website_list
		result.filter_website_list = luci.json.encode(website_list)
	    result.filter_level = ""
		result.filter_categories_list = ""
		--res.result = luci.json.encode(result)
		
		--dbg.dumptable(result)

		return result
		--ret.result = luci.json.encode(result)
		--return ret
	end
end


function Parentctl:tmp_set_website(app_form)
	local support_pctl_v2_optimize = uci_r:get_profile(PC_PROFILE_NAME, "support_pctl_v2_optimize") or "no"
	if support_pctl_v2_optimize == "yes" then
		local data = luci.json.decode(app_form.data)
		if not data and type(data) ~= "table" then
			dbg.print("invalid data")
			return {errorcode="invalid new params"}
		end
		app_form = data
	end
	
	local data = app_form
	local owner_id = data.owner_id
	local new_website = luci.json.decode(data.filter_website_list)
	local new_website_wl
	local website_type

	local start_index = data.start_index
	local amount = data.amount

	if support_pctl_v2_optimize == "yes" then
		website_type = data.cur_mode or "1"
		if website_type ~= nil then
			uci_r:set(PC_CONFIG_NAME, tostring(owner_id), "website_type", website_type)
		end

		if website_type == 1 or website_type == "1" then
			-- black list
			new_website = data.filter_website_list
			if tonumber(start_index) ~= 0 then
				local old_website = uci_r:get_list(PC_CONFIG_NAME, owner_id, "website")
				local old_amount = #old_website
				for i = 1, amount do
					old_website[i+old_amount] = new_website[i]
				end
				uci_r:delete(PC_CONFIG_NAME, tostring(owner_id), "website")
				uci_r:set_list(PC_CONFIG_NAME, tostring(owner_id), "website", old_website)
			else	
				uci_r:delete(PC_CONFIG_NAME, tostring(owner_id), "website")
				if #new_website ~= 0 then
					uci_r:set_list(PC_CONFIG_NAME, tostring(owner_id), "website", new_website)
				end
			end
		else
			-- white list
			new_website_wl = data.filter_website_list_wl
			if tonumber(start_index) ~= 0 then
				local old_website_wl = uci_r:get_list(PC_CONFIG_NAME, owner_id, "website_white")
				local old_amount_wl = #old_website_wl
				for i = 1, amount do
					old_website_wl[i+old_amount_wl] = new_website_wl[i]
				end
				uci_r:delete(PC_CONFIG_NAME, tostring(owner_id), "website_white")
				uci_r:set_list(PC_CONFIG_NAME, tostring(owner_id), "website_white", old_website_wl)
			else	
				uci_r:delete(PC_CONFIG_NAME, tostring(owner_id), "website_white")
				if #new_website_wl ~= 0 then
					uci_r:set_list(PC_CONFIG_NAME, tostring(owner_id), "website_white", new_website_wl)
				end
			end
		end
	else
		if tonumber(start_index) ~= 0 then
			local old_website = uci_r:get_list(PC_CONFIG_NAME, owner_id, "website")
			local old_amount = #old_website
			for i = 1, amount do
				old_website[i+old_amount] = new_website[i]
			end
			uci_r:delete(PC_CONFIG_NAME, tostring(owner_id), "website")
			uci_r:set_list(PC_CONFIG_NAME, tostring(owner_id), "website", old_website)
		else
			uci_r:delete(PC_CONFIG_NAME, tostring(owner_id), "website")
			if #new_website ~= 0 then
				uci_r:set_list(PC_CONFIG_NAME, tostring(owner_id), "website", new_website)
			end
		end
	end

    self:commit()

	local ret = {}
	local result = {}
	if support_pctl_v2_optimize == "yes" then
		ret.result = luci.json.encode(result)
		return ret
	else
		return result
	end
	--ret.result = luci.json.encode(result)
	--return ret
end

function Parentctl:tmp_set_clientV2(app_form)
	--data = luci.json.decode(data)
	local data = {}
	local res = {}

	dbg.dumptable(app_form)
	data.mac = app_form.mac
	data.name = nixio.bin.b64decode(app_form.name)
	
	data.type = app_form.client_type
	data.owner_id = tonumber(app_form.owner_id)

	if tonumber(app_form.enable_priority) == 1 then 
		data.prio = "on"
		data.time_period = tonumber(app_form.time_period)
		if data.time_period ~= 4294967295 then
			data.prio_time = os.time() + tonumber(data.time_period)*3600
		else
			data.time_period = -1
			data.prio_time = -1
		end
	else
		data.prio = "off"
		data.prio_time = ""
		data.time_period = ""
	end

	--[[
	local client_list = app_form.client_list
	for i, v in ipairs(client_list) do
		v.name = nixio.bin.b64decode(v.name)
    end
	app_form.client_list = client_list
	]]--
	--dbg.dumptable(app_form)		
	--return  clientmgmt.batch_set_client_info(data)	
	--return  clientmgmt.set_client_info(app_form)	
	--return  clientmgmt.set_client_info(data)	
	local mac = TrimStr(data.mac)
	local typ = uci_r:get("client_mgmt", mac, "type") or "other"
	dbg.printf("[avira debug]: This device type is " .. typ .. ", mac is " .. data.mac)
	if data.type ~= typ then
		data.client_type_changed = "true"
	end	
	res = clientmgmt.set_client_info(data)
	sys.fork_exec(QOS_RESTART_CMD)
	sys.fork_exec(PC_RELOAD_CMD)

	return res
end
