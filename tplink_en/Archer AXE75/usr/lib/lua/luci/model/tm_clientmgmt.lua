--[[
Copyright(c) 2008-2014 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  tm_clientmgmt.lua
Details :  Ubus and uci client for client management.
Author  :  Ye Qianchuan <yeqianchuan@tp-link.net>
Author  :  Jin Xuexue <jinxuexue@tp-link.net>
Author  :  Wang Lian <wanglian@tp-link.net>
Version :  1.0.1
Date    :  15July, 2016
History :  \arg 1.0.1, 04July, 2016
           \arg 1.0.0, 07 Mar, 2014
]]--

module ("luci.model.tm_clientmgmt", package.seeall)

local sys    = require "luci.sys"
local dbg    = require "luci.tools.debug"
local uci    = require "luci.model.uci"
local json   = require "luci.json"
local ubus   = require "ubus"
local one_mesh = require "luci.model.one_mesh"
local _ubus
local clientmgmt        = require "luci.model.client_mgmt"

local UBUS_OBJECT = "client_mgmt"

local uci_s = uci.cursor()

local CLIENT_TYPE_TBL = {
    ["0"] = "other",
    ["1"] = "pc",
    ["2"] = "phone",
    ["3"] = "laptop",
    ["4"] = "tablet",
    ["5"] = "entertainment",
    ["6"] = "printer",
    ["7"] = "iot_device"
}

-- Homeshiled Tether
local TETHER_CLIENT_TYPE_TBL = {
    ["Audio & Video"]      = "entertainment",
    ["Engineering"]        = "other",
    ["Home & Office"]      = "other",
    ["Mobile"]             = "phone",
    ["Network"]            = "other",
    ["Server"]             = "other",
    ["Smart Home"]         = "iot_device",
    ["Others"]             = "other",
    ["Router"]             = "other",
    ["Wi-Fi Extender"]     = "other",
    ["Computer"]           = "pc",
    ["Desktop"]            = "pc",
    ["Laptop"]             = "laptop",
    ["Tablet"]             = "tablet",
    ["Printer"]            = "printer",
    ["Scanner"]            = "other",
    ["Television"]         = "entertainment",
    ["Game Console"]       = "entertainment",
    ["Smart Plug"]         = "iot_device",
    ["Smart Watch"]        = "entertainment",
    ["Smart Fridge"]       = "iot_device",
    ["Light"]              = "iot_device",
    ["IP Camera"]          = "iot_device",
    ["Thermostat"]         = "other",
    ["Voice Control"]      = "entertainment",
    ["Doorbell"]           = "entertainment"
}

local PROC_DEVICES = "/proc/pctl/devices"
local support_onemesh = uci_s:get_profile("onemesh", "onemesh_support") or "no"

local function TrimStr(str)
    local tmpstr = str
	tmpstr = string.gsub(tmpstr, "-", "")
    if support_onemesh == "yes" then
        tmpstr = string.gsub(tmpstr, ":", "")
    end
    str = string.match(tmpstr, "%w+")
    str = str:upper()
    return str
end

local function TrimStr2(str)
    local tmpstr = str
	tmpstr = string.gsub(tmpstr, "-", "")
    tmpstr = string.gsub(tmpstr, ":", "")
    str = string.match(tmpstr, "%w+")
    str = str:upper()
    return str
end

--- Connect ubus for getting data later.
function init()
	_ubus = ubus.connect()
end

--- Get the list of clients with ip mixed and enter.
-- @return		Table of client entries
function get_client_list_qos()
    local _ubus = _ubus or ubus.connect()
    local clist = {}
    if support_onemesh == "yes" then
        clist = one_mesh.api_get_mesh_clients() -- get online clients
    else
        clist = _ubus:call(UBUS_OBJECT, "get_hist_list", {request_type=1})
    end

    local res = {}
    for _, client in ipairs(clist) do
        local mac = client.mac
        if mac then
            for _ , client_cmp in ipairs(clist) do
                if client ~= client_cmp and client_cmp.mac == mac then
                    client_cmp.mac = nil
                    if client.hostname ~= client_cmp.hostname and client.hostname == "network device" then
                        client.hostname = client_cmp.hostname
                    end
                end  
            end

        end
    
        if client.mac then
            -- FIXME: remove inactive clients
            -- remove clients in black list
            local client_mac = TrimStr(client.mac)
            local blk_cli = uci_s:get_all("blacklist", client_mac) 
            if blk_cli then
                client.mac = nil
            end
        end

        if client.mac then
            res[#res + 1] = client
        end
    end

    return res
end

local function get_user_mac()
    -- get user ipaddr from uhttpd
    local user_ip  = sys.getenv("REMOTE_ADDR")
    local user_mac = ""

    -- get user_mac from arp table by user_ip
    for _, v in ipairs(luci.sys.net.arptable()) do
        if user_ip and user_ip == v["IP address"] then
            user_mac = v["HW address"]
            break
        end
    end

    return user_mac
end


local function get_list( list_type )
    local list = {}
    local uci_r = uci.cursor()
	local user_mac = get_user_mac():gsub("-", ":"):upper()
    uci_r:foreach("access_control", list_type,
        function(section)
            list[#list + 1] = uci_r:get_all("access_control", section[".name"])
            list[#list].mac = (list[#list].mac):gsub(":", "-"):upper()
            list[#list].host = (list[#list].mac == user_mac:gsub(":", "-"):upper()) and "HOST" or "NON_HOST"
        end
    )
    return list
end
--- Get the list of clients with ip mixed and enter.
-- @return		Table of client entries
function get_client_list_dev()
    local _ubus = _ubus or ubus.connect()

    if _ubus == nil then
        return {}
    end

    local clist = {}
    local clist_online = {}

    if support_onemesh == "yes" then
        _, _, _, clist = one_mesh.api_arrange_mesh_clients(0) -- get all(online + offline) clients
        one_mesh.api_get_mesh_clients()
    else
        clist = _ubus:call(UBUS_OBJECT, "get_hist_list", {request_type=0})
        --clist_online = _ubus:call(UBUS_OBJECT, "get_hist_list", {request_type=1})
    end
    local black_list  = get_list("black_list")
    local access_enable = uci_s:get("access_control", "settings", "enable") or "off"


    local res = {}
    for _, client in pairs(clist) do
        local mac = client.mac
        if mac then
            for _ , client_cmp in pairs(clist) do
                if client ~= client_cmp and client_cmp.mac == mac then
                    client_cmp.mac = nil
                    if client.hostname ~= client_cmp.hostname and client.hostname == "network device" then
                        client.hostname = client_cmp.hostname
                    end
                end  
            end

        end
    
        if client.mac then
            -- FIXME: remove inactive clients
            -- remove clients in black list
            local client_mac = TrimStr(client.mac)
            local blk_cli = uci_s:get_all("blacklist", client_mac) 
            if blk_cli then
                client.mac = nil
            end
        end
		
	client.online = client.connect_status or 0

        if access_enable == "on" then
    		for _, black in ipairs(black_list) do
    			if black.mac == client.mac  then 
    				client.online = 0 
    			end
    		end
        end

        if client.mac then
            res[#res + 1] = client
        end
    end

    return res
end

local function get_max_client()    
    local max_num = uci_s:get_profile("client_mgmt", "max_dev") or "64"
    return max_num
end

local function comps(a, b)
    return tonumber(a.access_time) < tonumber(b.access_time)
end

----------------user set---------------------------

local function store_client_info(client, need_commit)
    local max_num = get_max_client()

    local clist_u = {}

    -- 1. check client num
    uci_s:foreach("client_mgmt", "client",
        function(section)               
            local cli = section
            --if cli.usr_set ~= nil then                
                clist_u[#clist_u + 1] = cli
            --end
        end
    )   

    -- 2. if exceeds max_num, delete one
    if (#clist_u) >= tonumber(max_num) then
            table.sort(clist_u, comps) 
            local cli = clist_u[1]
        uci_s:delete("client_mgmt", cli[".name"])        
        end

    -- 3. set
    local client_mac = TrimStr(client.mac)
    uci_s:section("client_mgmt", "client", client_mac, client)

    -- 4. commit
    local stat = true
    if need_commit ~= nil and need_commit == true or need_commit == nil then
        stat = uci_s:commit("client_mgmt")
    end

    return stat
end

function set_client_info(client)
	-- 0. first, set client_nickname to history_list.
	if client.name ~= nil and client.mac ~= nil then
		set_client_nickname((client.mac):gsub("-", ""):upper(), client.name)
	end

    -- 1. if in config, set
    local found = false
    uci_s:foreach("client_mgmt", "client",
        function(section)               
            if not found and client.mac == section.mac then
                found = true                   
                uci_s:section("client_mgmt", "client", section[".name"], client)             
            end
        end
    )   

    if found then
        local stat = uci_s:commit("client_mgmt")
        return stat
    end

    -- 2. else try to store
    local ret = store_client_info(client)    

   return ret
end

function batch_set_client_info(client_list)
    
    local found = false
    for k,client in pairs(client_list) do
        found = false
		uci_s:foreach("client_mgmt", "client",
            function(section)               
				if not found and client.mac == section.mac then
                    found = true
                    uci_s:section("client_mgmt", "client", section[".name"], client)          
                end
            end
        )   

        if not found then
            store_client_info(client, false)
        end
    end

    return uci_s:commit("client_mgmt")
end


function remove_client_list_for(owner_id)
	local now = os.time()
	local fg_changed = 0
    uci_s:foreach("client_mgmt", "client",
		function(section)  
			if owner_id == section.owner_id then
				if section.prio_time == nil or tonumber(section.prio_time) ~= -1 and tonumber(section.prio_time) < now then
					uci_s:delete("client_mgmt", section[".name"])
				else
					uci_s:set("client_mgmt", section[".name"], "owner_id", "")
				end
				fg_changed = 1
			end
        end
    )   
    
    if fg_changed == 1 then
    	return uci_s:commit("client_mgmt")
    end	
end

function get_client_list_by(owner_id)
	local client_list = {}
	uci_s:foreach("client_mgmt", "client",
		function(section)
			if section.owner_id == owner_id then
				local client = {}
				client.device_id = section[".name"]
				client.owner_id = section.owner_id
				client.mac = section.mac
				client.client_type = section.type
				client.name = section.name
				client_list[#client_list + 1] = client
			end
		end
    )
	return client_list
end

function get_devices_mac(owner_id)
	local mac_list = {}
	local tmp = {} -- filter one client's multiple records
	uci_s:foreach("client_mgmt", "client",
		function(section)
			if section.owner_id ~= nil and section.owner_id == owner_id then
				local client = {}
				local real_mac = section.real_mac or section.mac
				if nil == tmp[real_mac] then
					mac_list[#mac_list + 1] = real_mac
				end
				tmp[real_mac] = {}
			end
		end
    )
	dbg.dumptable(mac_list)
	return mac_list
end

function get_devices_name(owner_id)
	local online_device_name = {}
	local client_online = one_mesh.api_get_mesh_clients()
	local black_list  = get_list("black_list")
	local tmp = {} -- filter one client's multiple records
	uci_s:foreach("client_mgmt", "client",
		function(section)
			if section.owner_id ~= nil and section.owner_id == owner_id then
				local real_mac = section.real_mac or section.mac
				local online
				if nil == tmp[real_mac] then
					online = false
					for k, v in pairs(client_online) do
						-- NOTE: compare real_mac
						if v.mac == real_mac then
							online = true
							break
						end
					end
					for k, v in ipairs(black_list) do
						if v.mac == real_mac  then 
							online = false
							break
						end
					end
					if online == true then
						online_device_name[#online_device_name + 1] = clientmgmt.match_history_list(real_mac) or section.name or "network device"
					end
					tmp[real_mac] = {}
				end
			end
		end
	)

	dbg.dumptable(online_device_name)
	return online_device_name
end

function get_devices_family()
	local family_devices = {}
	local tmp = {} -- filter one client's multiple records
	uci_s:foreach("client_mgmt", "client",
		function(section)
			if section.family and section.family == "on" then
				local client = {}
				local real_mac = section.real_mac or section.mac
				if nil == tmp[real_mac] then
					family_devices[#family_devices + 1] = real_mac
				end
				tmp[real_mac] = {}
			end
		end
    )
	dbg.dumptable(family_devices)
	return family_devices
end

----------------access_handle-------------------
local TEMP_UCI_PATH = "/tmp/tmp-device-config"
local uci_t = uci.cursor(TEMP_UCI_PATH) 

-- get client type form trend micro
function get_client_type_list()
    local deviceMap = {}
    local f = io.open(PROC_DEVICES,"r")
    if f then
        for line in f:lines() do
			--dbg.print("line="..line)
            device_mac, device_type = string.match(line, "([^,;%s]+) (%d+)")
			--dbg.print(device_mac, device_type)
            deviceMap[device_mac] = device_type;
        end
		f:close()
	else
		dbg.print("open "..PROC_DEVICES.."failed.\n")	
    end

    return deviceMap
end

function get_client_type(mac, deviceMap)
    local t = deviceMap[mac]
    if t ~= nil then
        return CLIENT_TYPE_TBL[t];
    else
        return "other"
    end
end

--- Get client type for Tether/Web
-- client_type priorty: user setting > pctl v2(http User-Agent) > client_mgmt(DHCP etc)
-- @param mac       MAC addr of client
-- @param type      Client type from client-mgmt
-- @param is_tether Is Tether or not
-- @return  Type of client
local function _get_client_type_for(mac, type, is_tether)
    local ret
    local deviceMap = get_client_type_list()
    local client_type_from_user = uci_s:get("client_mgmt", TrimStr(mac), "type") or ""
	local client_type_from_pctl = get_client_type(mac, deviceMap)  or "other"
	local client_type_from_client_mgmt = type or "other"

	if client_type_from_user ~= "" then
        ret =  is_tether and client_type_from_user or (TETHER_CLIENT_TYPE_TBL[client_type_from_user] or "other")
	elseif client_type_from_pctl ~= "other" then
		ret = client_type_from_pctl
    else
        ret = (client_type_from_client_mgmt ~= "unknown") and client_type_from_client_mgmt or "other"
	end

	return ret
end

--- Get client type for Web
local function get_client_type_for_web(mac, type)
	return _get_client_type_for(mac, type, false)
end

--- Get client type for Tether
function get_client_type_for_tether(mac, type)
	return _get_client_type_for(mac, type, true)
end

--eg:"Sun Mon Wed Sat"transfer to "75"(it's BIN is "1001011")
function qos_schedule_to_byte(string)
	if string == nil or string == "" then
		return 0
	end
	local array = string.split(string, " ")
	local weeks = {"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"}
	local byte_val = 0
	for k, v in ipairs(array) do
		for i, v_weeks in ipairs(weeks) do
			if v == v_weeks then
				byte_val = byte_val + math.pow(2, (i-1))
			end
		end
	end
	return byte_val
end

-- get all clients (online and offline)
function get_access_client_list_qos()
    local client_list = {}
    local client_found = {}

    --local history_list = get_client_list_qos()
    local history_list = get_client_list_dev()
    local cur_time = os.time()
	local re_list = {}


    local deviceMap = get_client_type_list()
	if support_onemesh == "yes" then
		re_list   = one_mesh.api_arrange_mesh_clients(0)
    end
	
	local client_type_changed

	--qos schedule
	local is_schedule_supported = uci_s:get_profile("qos", "qos_schedule_support") or "no"

    for i, v in ipairs(history_list) do
    	local tailMac = string.sub(v.mac, 10):gsub(":", "-"):upper()
    	if support_onemesh ~= "yes" or nil == re_list[tailMac] then -- skip RE device
    		local client = {}
    		client.device_id = TrimStr(v.mac)
    		client.ip = v.ip
    		client.mac = v.mac
    		--client.name = v.hostname
    		--client.client_type = get_client_type(v.mac, deviceMap)
    		client.name = v.nickname ~= "" and v.nickname or v.hostname
    		if uci_s:get("client_mgmt", TrimStr(v.mac), "client_type_changed") == "true" then
    			client.client_type = uci_s:get("client_mgmt", TrimStr(v.mac), "type") or get_client_type(v.mac, deviceMap)
    		else
    			client.client_type = uci_s:get("client_mgmt", TrimStr(v.mac), "type") ~= "other" and uci_s:get("client_mgmt", TrimStr(v.mac), "type") or get_client_type(v.mac, deviceMap)
    		end
    		-- client.client_type = get_client_type_for_tether(v.mac, v.device_type) or "other"
    		client.wire_type =  v.wire_type
    		client.guest = v.guest or ""
    		client.online = v.online
    		client.owner_id = tonumber(uci_s:get("client_mgmt", client.device_id, "owner_id")) or -1
    		client.access_time = uci_s:get("client_mgmt", client.device_id, "access_time") or  v.access_time 
    		client.prio = uci_s:get("client_mgmt", client.device_id, "prio") or "off" 
    		client.prio_time = uci_s:get("client_mgmt", client.device_id, "prio_time") or ""
    		client.time_period = uci_s:get("client_mgmt", client.device_id, "time_period") or "-1"
    		client.owner_name = uci_s:get("parental_control_v2", tostring(client.owner_id), "name") or ""
			client_type_changed = uci_s:get("client_mgmt", client.device_id, "client_type_changed") or "false"
			if client_type_changed == "true" then
				client.client_type_changed = true
			else
				client.client_type_changed = false
			end
			--qos schedule
			if is_schedule_supported == "yes" then
				local time_schedule = {}
				local slots = uci_s:get("client_mgmt", client.device_id, "slots") or ""
				local slots_next_day = uci_s:get("client_mgmt", client.device_id, "slots_next_day") or ""
				local repeat_weeks = uci_s:get("client_mgmt", client.device_id, "repeats") or ""
				local time_tmp = string.split(slots, " ")
				local time_begin = time_tmp[1]
				local time_end = time_tmp[2]

				if slots_next_day ~= nil and slots_next_day ~= "" then
					time_tmp = string.split(slots_next_day, " ")
					time_end = time_tmp[2]
				end
				if time_begin ~= nil and time_begin ~= "" and time_end ~= nil and time_end ~= "" then
					time_schedule.slots = string.sub(time_begin,1,2)..":"..string.sub(time_begin,-2).."-"..string.sub(time_end,1,2)..":"..string.sub(time_end,-2)
				else
					time_schedule.slots = ""
				end
				time_schedule.status = uci_s:get("client_mgmt", client.device_id, "status") or "off"
				time_schedule.repeats = qos_schedule_to_byte(repeat_weeks)
				client.time_schedule = time_schedule
				client.time_mode = uci_s:get("client_mgmt", client.device_id, "time_mode") or "period"
				client.schedule_enable = uci_s:get("client_mgmt", client.device_id, "schedule_enable") or "off"
			end
    		client_list[#client_list + 1] = client
    		client_found[client.device_id] = "true"
    	end
    end

	uci_s:foreach("client_mgmt", "client",
        function(section)
			local tailMac = string.sub(section.mac, 10):gsub(":", "-"):upper()
            if client_found[TrimStr(section.mac)] ~= "true" and section.prio == "on" and (support_onemesh ~= "yes" or nil == re_list[tailMac]) then
				local client = {}
                client.device_id = TrimStr(section.mac)
				client.ip = section.ip
				client.mac = section.mac
				client.name = section.name or "network device"
				client.client_type = section.type or "UNKNOWN"
				client.guest = section.guest or ""
				client.wire_type = "offline"
				--client.online = section.wire_type == "UNKNOW" and 0 or 1
				client.online = 0 
				client.access_time = section.access_time or os.time()
				client.owner_id = tonumber(section.owner_id) or -1
				client.owner_name = uci_s:get("parental_control_v2", section.owner_id or "", "name") or ""
				client.prio = section.prio or "off" 
				client.prio_time = section.prio_time or ""
				client.time_period = section.time_period or "-1"
				if section.client_type_changed == "true" then
					client.client_type_changed = true
				else
					client.client_type_changed = false
				end
				--qos schedule
				if is_schedule_supported == "yes" then
					local time_schedule = {}
					local slots = uci_s:get("client_mgmt", client.device_id, "slots") or ""
					local slots_next_day = uci_s:get("client_mgmt", client.device_id, "slots_next_day") or ""
					local repeat_weeks = uci_s:get("client_mgmt", client.device_id, "repeats") or ""
					local time_tmp = string.split(slots, " ")
					local time_begin = time_tmp[1]
					local time_end = time_tmp[2]

					if slots_next_day ~= nil and slots_next_day ~= "" then
						time_tmp = string.split(slots_next_day, " ")
						time_end = time_tmp[2]
					end
					if time_begin ~= nil and time_begin ~= "" and time_end ~= nil and time_end ~= "" then
						time_schedule.slots = string.sub(time_begin,1,2)..":"..string.sub(time_begin,-2).."-"..string.sub(time_end,1,2)..":"..string.sub(time_end,-2)
					else
						time_schedule.slots = ""
					end
					time_schedule.status = uci_s:get("client_mgmt", client.device_id, "status") or "off"
					time_schedule.repeats = qos_schedule_to_byte(repeat_weeks)
					client.time_schedule = time_schedule
					client.time_mode = uci_s:get("client_mgmt", client.device_id, "time_mode") or "period"
					client.schedule_enable = uci_s:get("client_mgmt", client.device_id, "schedule_enable") or "off"
				end
				client_list[#client_list + 1] = client
            end
        end
    )
	
	

    return client_list
end


-- get all clients (online and offline)
function get_access_client_list()
    local client_list = {}
    local client_found = {}

    local history_list = get_client_list_dev()
    local cur_time = os.time()

	local re_list = {}

	if support_onemesh == "yes" then
		re_list = one_mesh.api_arrange_mesh_clients(0)
    end

    for i, v in ipairs(history_list) do
    	-- skip RE device
    	local tailMac = string.sub(v.mac, 10):gsub(":", "-"):upper()
		if support_onemesh ~= "yes" or nil == re_list[tailMac] then
			local client = {}
			client.device_id = TrimStr(v.mac)
			--client.ip = v.ip
			client.mac = v.mac
			--client.name = v.hostname
			--client.client_type = get_client_type(v.mac, deviceMap)
			client.name = v.nickname ~= "" and v.nickname or v.hostname
			client.client_type = get_client_type_for_tether(v.mac, v.device_type) or "other"
			client.owner_id = tonumber(uci_s:get("client_mgmt", client.device_id, "owner_id")) or ""
			client.prio = uci_s:get("client_mgmt", client.device_id, "prio") or "off" 
			client.prio_time = uci_s:get("client_mgmt", client.device_id, "prio_time") or ""
			client.time_period = uci_s:get("client_mgmt", client.device_id, "time_period") or "-1"
			client.online = v.online
			client_list[#client_list + 1] = client
			client_found[client.device_id] = "true"
		end
    end

	uci_s:foreach("client_mgmt", "client",
        function(section)
			local tailMac = string.sub(section.mac, 10):gsub(":", "-"):upper()
            if client_found[TrimStr(section.mac)] ~= "true" and (support_onemesh ~= "yes" or nil == re_list[tailMac]) then
				local client = {}
                client.device_id = TrimStr(section.mac)
				--client.ip = section.ip
				client.mac = section.mac
				client.name = section.name or "network device"
				client.client_type = section.type or "UNKNOWN"
				client.owner_id = tonumber(section.owner_id) or ""
                client.prio = section.prio or "off" 
                client.prio_time = section.prio_time or ""
                client.time_period = section.time_period or "-1"
				client_list[#client_list + 1] = client
            end
        end
    )
	
    return client_list
end

function client_house_keeping()
    local now = os.time()
    local fg_changed = 0
	
    -- del invaild client
    uci_s:foreach("client_mgmt", "client",
        function(section)
            local client = section
                       
            -- for client from parent control setting,there is no prio* settings at all!
            if client.prio == nil and client.prio_time == nil and client.time_period == nil then
                return
            end
                        
        		if client.prio_time == nil or tonumber(client.prio_time) ~= -1 and tonumber(client.prio_time) < now then
								if client.owner_id == nil then
					        uci_s:delete("client_mgmt", client[".name"])
					        fg_changed = 1
								else
									uci_s:set("client_mgmt", client[".name"], "time_period", "")
									uci_s:set("client_mgmt", client[".name"], "prio", "")
									uci_s:set("client_mgmt", client[".name"], "prio_time", "")
									fg_changed = 1
								end
            end
        end
    ) 
    if fg_changed == 1 then
    	uci_s:commit("client_mgmt")
    end
end

function remove_client_list(owner_id, client_list)
	local now = os.time()
	local fg_changed = 0
	
	if client_list then
		for i,v in ipairs(client_list) do
			local name = TrimStr(v)
			local l_owner_id = uci_s:get("client_mgmt", name, "owner_id")
			local l_prio_time = uci_s:get("client_mgmt", name, "prio_time")
			if owner_id == tonumber(l_owner_id) then
				if l_prio_time == nil or tonumber(l_prio_time) ~= -1 and tonumber(l_prio_time) < now then
					uci_s:delete("client_mgmt", name)
				else
					uci_s:set("client_mgmt", name, "owner_id", "")
				end
				fg_changed = 1
			end
		end
		
		if fg_changed == 1 then
			uci_s:commit("client_mgmt")
		end	
	end
end

-------- tether -----
function get_ARP()
    _ubus = _ubus or ubus.connect()
    if _ubus == nil then
        return nil
    else
        return _ubus:call(UBUS_OBJECT, "get_ARP", {})
    end
end

function get_ip_by_mac(mac)
    local arp = get_ARP() or {}
    for _, item in pairs(arp) do
        if item.mac == mac then
            return item.ip
        end
    end
    return nil
end

------- For SPF UI ----------
-- get access client list. request: 0 - ALL, 1 - online, 2 - offline
function get_access_device_list(request, is_speed)
    local client_list = {}
    local client_block = {}

    local _ubus = _ubus or ubus.connect()
	local dev_list = {}
	local re_list = {}
	if support_onemesh == "yes" then
        _, _, _, dev_list = one_mesh.api_arrange_mesh_clients(request)
		re_list   = one_mesh.api_arrange_mesh_clients(0)
    else
		dev_list = _ubus:call(UBUS_OBJECT, "get_hist_list", {request_type=request})
	end

    -- remove clients in black list
    local enable      = uci_s:get("access_control", "settings", "enable")
    local access_mode = uci_s:get("access_control", "settings", "access_mode")
    if enable == "on" and access_mode == "black" then
        uci_s:foreach("access_control", "black_list",
            function(section)
                client_block[TrimStr2(section.mac)] = "true"
            end
        )
    end

    for i, v in pairs(dev_list) do
    	local tailMac = string.sub(v.mac, 10):gsub(":", "-"):upper()
    	if support_onemesh ~= "yes" or nil == re_list[tailMac] then -- skip RE device
            local client = {}
            client.device_id = TrimStr(v.mac)
            client.ip = v.ip
            client.mac = v.mac
            client.access_time = v.access_time
            client.name = v.nickname ~= "" and v.nickname or v.hostname
            client.client_type = get_client_type_for_web(v.mac, v.device_type) or "other"
            client.wire_type =  v.wire_type
            client.guest = v.guest
            client.owner_id = uci_s:get("client_mgmt", client.device_id, "owner_id")
            client.prio = uci_s:get("client_mgmt", client.device_id, "prio") or "off" 
            client.prio_time = uci_s:get("client_mgmt", client.device_id, "prio_time") or -1
            client.time_period = uci_s:get("client_mgmt", client.device_id, "time_period") or -1
            if client_block[TrimStr2(client.mac)] == "true" then
                client.ip = "0.0.0.0"
            end
            --if client.mac and client_block[TrimStr(client.mac)] ~= "true" then
            client_list[#client_list + 1] = client
            --end
        end
    end

    return client_list
end

function set_client_nickname(dev_mac, nick_name)
    local _ubus = _ubus or ubus.connect()
    _ubus:call(UBUS_OBJECT, "set_dev_nickname", {nickname=nick_name,device_mac=dev_mac})
end

-- get access client list. request: 0 - ALL, 1 - online, 2 - offline
function get_access_device_list_with_access_uptime(request, is_speed)
    local client_list = {}
    local client_block = {}
    local all_clist = {}
    local re_list = {}

    local _ubus = _ubus or ubus.connect()
	local dev_list = {}
	local re_list = {}
	if support_onemesh == "yes" then
        _, _, _, dev_list = one_mesh.api_arrange_mesh_clients(request)
		re_list   = one_mesh.api_arrange_mesh_clients(0)
    else
		dev_list = _ubus:call(UBUS_OBJECT, "get_hist_list", {request_type=request})
	end
    
    -- remove clients in black list
    local enable      = uci_s:get("access_control", "settings", "enable")
    local access_mode = uci_s:get("access_control", "settings", "access_mode")
    if enable == "on" and access_mode == "black" then
        uci_s:foreach("access_control", "black_list",
            function(section)
                client_block[TrimStr2(section.mac)] = "true"
            end
        )
    end

    for i, v in pairs(dev_list) do
    	local tailMac = string.sub(v.mac, 10):gsub(":", "-"):upper()
    	if support_onemesh ~= "yes" or nil == re_list[tailMac] then -- skip RE device
            local client = {}
            client.device_id = TrimStr(v.mac)
            client.ip = v.ip
            client.mac = v.mac
            client.access_time = v.access_time
            client.access_uptime = tonumber(v.access_uptime)
            client.name = v.nickname ~= "" and v.nickname or v.hostname
            client.client_type = get_client_type_for_web(v.mac, v.device_type) or "other"
            client.wire_type =  v.wire_type
            client.guest = v.guest
            client.owner_id = uci_s:get("client_mgmt", client.device_id, "owner_id")
            client.prio = uci_s:get("client_mgmt", client.device_id, "prio") or "off" 
            client.prio_time = uci_s:get("client_mgmt", client.device_id, "prio_time") or -1
            client.time_period = uci_s:get("client_mgmt", client.device_id, "time_period") or -1
            if client_block[TrimStr2(client.mac)] == "true" then
                client.ip = "0.0.0.0"
            end
            --if client.mac and client_block[TrimStr(client.mac)] ~= "true" then
            client_list[#client_list + 1] = client
            --end
        end
    end

    return client_list
end
