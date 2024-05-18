--[[
Copyright(c) 2018 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  onemesh_network.lua
Details :  onemesh_network http response operation
Author  :  leiyaoyao  <leiyaoyao@tp-link.net>
Version :  1.0.0
Date    :  24May, 2018
]]--

module("luci.model.one_mesh", package.seeall)

local sys = require "luci.sys"
local dbg  = require "luci.tools.debug"
local json = require "luci.json"
local uci  = require "luci.model.uci"
local ubus = require "ubus"
local nw   = require "luci.model.nwcache"
local form = require "luci.tools.form"
local bit  = require "bit"
local wlan = require "luci.model.wireless"
local nixio = require "nixio"

local uci_r = uci.cursor()
form = form.Form(uci_r, {"mac"})
local UBUS_OBJECT = "client_mgmt"

local CLIENT_LIST = "/tmp/client_list.json" -- save online clients
local MESH_DEV_LIST  = "/tmp/sync-server/onemesh_client_list"
local AVAIL_DEV_LIST = "/tmp/sync-server/onemesh_dev_available_list"

local syncFileLock = "/var/run/one_mesh_file.lck"
local clientListLock = "/var/run/client_list_json.lck"

local ONEMESH_SYNC_WIFI_TMP_JSON="/tmp/onemesh_sync_wifi_tmp_json"

local TPMESH_OP_ADD_SLAVE = "0x1003"
local TPMESH_OP_REMOVE_SLAVE = "0x1004"

local one_mesh_lock
local client_list_lock

local function lock(w)
    one_mesh_lock = nixio.open(syncFileLock, "w", 600)
    one_mesh_lock:flock(w and "ex" or "sh")
end

local function unlock()
    one_mesh_lock:close()
    one_mesh_lock = nil
end

local function client_lock(w)
    client_list_lock = nixio.open(clientListLock, "w", 600)
    client_list_lock:flock(w and "ex" or "sh")
end

local function client_unlock()
    client_list_lock:close()
    client_list_lock = nil
end


local function TrimStr(str)
    local tmpstr = str
	tmpstr = string.gsub(tmpstr, "-", "")
	tmpstr = string.gsub(tmpstr, ":", "")
    str = string.match(tmpstr, "%w+")
    str = str:upper()
    return str
end

local function is_nil_table(data)
    if nil == data then
        return true
    end
    for _, v in pairs(data) do
        return false
    end
    return true
end

local function get_table_len(data)
	local count = 0
	if nil == data then
        return count
    end
	for k, v in pairs(data) do
		count = count + 1
	end
	return count
end

-- sync-server updates /tmp/sync-server/onemesh_client_list
local function read_from_file(file)
    local data
	lock(true)
    local fp = io.open(file, "r")
	if nil == fp then
        --dbg("error open file failed:" .. file)
    else
        local lines = fp:read("*all")
		fp:close()
		data = json.decode(lines)
		if is_nil_table(data) then
			dbg("\n[error]luci.json.decode return nil! file : " .. file .. "\n")
		end
    end
	unlock()
	return data
end

local function _print_tbl(data)
    if "table" == type(data) then
        for i, v in pairs(data) do
            dbg(i .. " = " .. tostring(data[i]))
            if "table" == type(data[i]) then
				dbg("\ndata[" .. i .."] is table")
                _print_tbl(data[i])         
            end
        end
    end
end

local function get_router_mac()
	local nw  = nw.init()
    local net = nw:get_network("lan")
    local ifc = net and net:get_interface()
	local mac = ifc:mac()
    return mac:gsub(":", "-"):upper()
end

local function get_router_ip()
	local nw  = nw.init()
    local net = nw:get_network("lan")
    local ip  = net and net:ipaddr()
	return ip
end

local function get_etc_sclist()
	local etc_sclist = {}
	uci_r:foreach("onemesh_client", "device",
        function(section)
			local mac = (uci_r:get("onemesh_client", section[".name"], "mac")):gsub(":", "-"):upper()
            etc_sclist[mac] = uci_r:get_all("onemesh_client", section[".name"])
            etc_sclist[mac].mac = mac
        end
    )
	return etc_sclist
end

local function get_nickname(input_mac)
	local nickname
	uci_r:foreach("history_list", "list",
        function(section)
            if input_mac == section.mac then
				nickname = uci_r:get("history_list", section[".name"], "nickname")
            end
        end
    )
	return nickname
end

local function get_system_uptime()
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

local function get_name_by_mac_oui(mac, mapCache)
	local encode_oui
	local oui
	-- local file = io.open("/etc/MAC_OUI.map", "r")
    
	-- if nil == file then
	-- 	dbg.print("get_name_by_mac_oui can not open MAC_OUI.map")
	-- 	return false
	-- end
	
	if not mac then
		dbg.print("get_name_by_mac_oui can not accept nil mac")
		return false
	end

	local mac_prefix = string.sub(mac:gsub("-", ""):upper(), 1, 6)
	-- local mapCache = file:read("*all")
	local pos = string.find(mapCache, mac_prefix)

	if  pos ~= nil then
		encode_oui = string.match(mapCache, "%S*#(%S*)", pos)
		oui = nixio.bin.b64decode(encode_oui)
	end

	-- file:close()
	return oui or false
end

--- Get one_mesh network's all devices and clients.
-- @param on_off_all   online status, 1-online, 2-offline, 0-all
-- @return             (1)re_list：all RE devices;(2)dut_clist：DUT (( clients;(3)re_clist：RE (( clients;(4)all_clist：DUT (( clients + RE (( clients
function api_arrange_mesh_clients(on_off_all)
	local dut_clist = {} -- key = mac，DUT (( clients
	local re_clist  = {} -- key = mac，RE (( clients
	local all_clist = {} -- DUT (( clients + RE (( clients
	local hist_list = {} -- (1)update ip and hostname (2)and delete 2.4G and 5G station record
	local _ubus 	= ubus.connect()
	

	-- get all clients(temporarily include RE devices which should be deleted later)
	local file = io.open("/etc/MAC_OUI.map", "r")
	local mapCache = nil
	local hist_list_ubus = _ubus:call(UBUS_OBJECT, "get_hist_list", {request_type=on_off_all})
	if "table" == type(hist_list_ubus) then
		for _, client in pairs(hist_list_ubus) do
			local client_info = {}
			local mac = (client.mac):gsub(":", "-"):upper()
			if (file ~= nil and mapCache == nil) then
				mapCache = file:read("*all")
			end
			local oui = get_name_by_mac_oui(mac, mapCache)
			if oui ~= false and client.hostname == "network device" then
				client.hostname = oui
			end
			client_info.ip = client.ip
			client_info.mac = mac
			client_info.wire_type = client.wire_type
			client_info.guest = client.guest
			client_info.device_type = client.device_type
			client_info.access_time=client.access_time
			client_info.connect_status=client.connect_status
			client_info.device_type=client.device_type
			if client.access_uptime ~= nil then
				client_info.access_uptime=client.access_uptime
			end
			client_info.hostname = (client.nickname ~= "") and client.nickname or client.hostname
			client_info.name = client_info.hostname
			all_clist[mac] = client_info
			dut_clist[mac] = client_info
			hist_list[mac] = client_info
		end
	end
	
	-- get all RE devices
	local max_mesh_level = 1  -- 保存mesh网络拓扑树的深度
	local re_list 	  = {} -- key = mac's last 3 bytes, it is unique
	local etc_sclist  = {} -- key = mac, RE device
	local sync_sclist = {} -- StationGrid + RE device
	-- get all stations, read from /tmp/sync-server/onemesh_client_list
	local sta_list = {} -- key = mac

	local mesh_dev_list = read_from_file(MESH_DEV_LIST)
	if nil == mesh_dev_list then
		if file then
			file:close()
		end
		return re_list, dut_clist, re_clist, all_clist
	end

	etc_sclist  = get_etc_sclist()
	sync_sclist = mesh_dev_list.onemesh_client_list
	if "table" ~= type(sync_sclist) then
		if file then
			file:close()
		end
		return re_list, dut_clist, re_clist, all_clist
	end

	for _, device in pairs(sync_sclist) do
		-- RE devices --
		local real_mac = ( device.device.mac ):gsub(":", "-"):upper()
		local tail_mac = string.sub(real_mac, 10)
		all_clist[real_mac] = nil -- delete re device info from all_clist
		dut_clist[real_mac] = nil -- delete re device info from dut_clist
		local re = {}
		re.ip = device.device.ip
		if nil ~= hist_list[real_mac] then
			if "UNKNOWN" ~= hist_list[real_mac].ip and "0.0.0.0" ~= hist_list[real_mac].ip then -- update device's ip with client_mgmt's value
				re.ip = hist_list[real_mac].ip
			end
		end
		re.mac = real_mac
		-- TODO: RE support Tri-band.
		re.mac_5g = device.device.mac_5g or real_mac
		re.mac_24g = device.device.mac_24g or real_mac

		-- AP )) RE, sometimes re shows in history_list by mac_24g or mac_5g, so we should remove them from all_clist.
		local mac_5g = ( re.mac_5g ):gsub(":", "-"):upper()
		local mac_24g = ( re.mac_24g ):gsub(":", "-"):upper()
		all_clist[mac_5g] = nil -- delete re device info from all_clist
		all_clist[mac_24g] = nil -- delete re device info from all_clist
		dut_clist[mac_5g] = nil -- delete re device info from dut_clist
		dut_clist[mac_24g] = nil -- delete re device info from dut_clist

		re.model  = device.device.product_name
		re.device_type = device.device.device_type
		re.status = "connected"
		re.level  = device.device.level
		re.link_speed_24g = device.device.link_speed_24g
		re.link_speed_5g  = device.device.link_speed_5g
		re.bridge_mode = device.device.bridge_mode
		if device.device.signal_strength_24g < device.device.signal_strength_5g then -- get the smaller value as device's actual signal_strength
			local signal = device.device.signal_strength_24g
			if -50 < signal then
				re.signal_strength = 5
			elseif -73 < signal then
				re.signal_strength = 3
			elseif -90 < signal then
				re.signal_strength = 2
			else
				re.signal_strength = 0
			end
		else
			local signal = device.device.signal_strength_5g
			if -50 < signal then
				re.signal_strength = 5
			elseif -75 < signal then
				re.signal_strength = 3
			elseif -90 < signal then
				re.signal_strength = 2
			else
				re.signal_strength = 0
			end
		end

		re.name = re.model
		re.location = ""
		if nil ~= etc_sclist[real_mac] then
			re.name = ( nil ~= etc_sclist[real_mac].name ) and etc_sclist[real_mac].name or re.model
			re.location = ( nil ~= etc_sclist[real_mac].location ) and etc_sclist[real_mac].location or ""
		end

		re.mesh_nclient_num  = 0
		re.mesh_sclient_num  = 0
		re.mesh_sclient_list = {}
		re.mesh_nclient_list = {}

		re_list[tail_mac] = re
		max_mesh_level = ( max_mesh_level < re.level ) and re.level or max_mesh_level
		-- RE devices end --
		-- Stations --
		local stations = device.StationGrid
		if stations ~= nil then
			for _, station in pairs(stations) do
				local real_mac = ( station.mac ):gsub(":", "-"):upper()
				if not ( ( "UNKNOWN" == station.ip or "0.0.0.0" == station.ip ) and "UNKNOWN" == station.name and "network device" == station.name and nil == hist_list[real_mac] ) then -- skip RE's 2.4G and 5G station record
					if nil == sta_list[real_mac] then
						local sta_info = {}
						sta_info.ip   = station.ip
						sta_info.name = station.name
						if sta_info.name == "network device" or sta_info.name == "UNKNOWN" then
							if (file ~= nil and mapCache == nil) then
								mapCache = file:read("*all")
							end
							local oui = get_name_by_mac_oui(real_mac, mapCache)
							if oui ~= false then
								sta_info.name = oui
							end
						end
						if nil ~= hist_list[real_mac] then
							if "UNKNOWN" ~= hist_list[real_mac].ip then
								sta_info.ip = hist_list[real_mac].ip
							end
							if "network device" ~= hist_list[real_mac].name then
								sta_info.name = hist_list[real_mac].name
							end
						end
						sta_info.mac  = real_mac
						sta_info.wire_type = (station.connection_type == "2.4GHz") and "2.4G" or "5G"
						sta_info.config_RE_mac = device.device.mac
						sta_info.parent_RE_mac = device.device.mac
						sta_info.config_RE_level = device.device.level
						sta_info.parent_RE_level = device.device.level
						sta_list[real_mac] = sta_info
					end
					dut_clist[real_mac] = nil -- delete clients )) RE
					-- all_clist[real_mac] = nil -- if real_mac record existed, delete it -- changed by CCy for 4-addr
					if all_clist[real_mac] == nil then
						sta_list[real_mac].not_in_allclist = true
					end
				end
			end
		end
		-- Stations end --
	end

	local cur_time = os.time()
	local cur_uptime = get_system_uptime()
	local old_clist = {}

	client_lock(true)
	local fp = io.open(CLIENT_LIST, "r")
	if nil ~= fp then
		local lines = fp:read("*all")
		fp:close()
		old_clist = json.decode(lines)
		if "table" ~= type(old_clist) then
			old_clist = {}
		end
	end
	client_unlock()

	-- get mesh topo, update re_clist and dut_clist
	for level = 1, max_mesh_level do
		for _, re in pairs(re_list) do
			if level == re.level then
				local real_mac = ( re.mac ):gsub(":", "-"):upper()
				for _, device in pairs(sync_sclist) do
					local real_mac1 = ( device.device.mac ):gsub(":", "-"):upper()
					if real_mac == real_mac1 then
						local stations = device.StationGrid
						local mesh_sclient_num = 0
						local mesh_nclient_num = 0
						local mesh_sclient_list = {}
						local mesh_nclient_list = {}
						local tmp = {} -- avoid repeat station record
						if stations ~= nil then
							for _, station in pairs(stations) do
								local mac = ( station.mac ):gsub(":", "-"):upper()
								local sta_tail_mac = string.sub(mac, 10)
								if nil ~= re_list[sta_tail_mac] then -- station is RE device
									if re_list[sta_tail_mac].level > device.device.level and nil ~= sta_list[mac] and real_mac1 == sta_list[mac].parent_RE_mac and nil == tmp[mac] then -- RE2 )) RE1
										mesh_sclient_list[#mesh_sclient_list + 1] = re_list[sta_tail_mac]
										mesh_sclient_num = mesh_sclient_num + 1
										tmp[mac] = {}
									end
									if nil ~= hist_list[mac] and "UNKNOWN" ~= hist_list[mac].ip then -- update RE2's ip with client_mgmt's ip
										re_list[sta_tail_mac].ip = hist_list[mac].ip
									end
								else
									local is_re = false
									for _, re in pairs(re_list) do
										if sta_tail_mac == string.sub(re.mac_24g, 10) or sta_tail_mac == string.sub(re.mac_5g, 10) then
											is_re = true
										end
									end
									-- station is client
									--if nil ~= sta_list[mac] and real_mac1 == sta_list[mac].parent_RE_mac and nil == tmp[mac] and nil == all_clist[mac] then -- client )) RE
									-- changed by CCy for 4-addr, nil ~= all_clist[mac] means it is online(in master router's client mgmt output)
									-- if a client is in /tmp/sync-server/onemesh_client_list, but not in master router's client mgmt output, then we consider it offline.
									if is_re == false and nil ~= sta_list[mac] and (
										(real_mac1 == sta_list[mac].parent_RE_mac and nil == tmp[mac] and nil ~= all_clist[mac])
										or sta_list[mac].not_in_allclist == true) then
										local tail_mac = string.sub(mac, 10)
										-- local nickname = get_nickname(mac)
										station.connection_type = sta_list[mac].wire_type
										station.ip = sta_list[mac].ip
										station.name = nickname or sta_list[mac].name
										mesh_nclient_list[#mesh_nclient_list + 1] = station
										mesh_nclient_num = mesh_nclient_num + 1
										tmp[mac] = {}
										
										local client_info = {}
										client_info.ip = sta_list[mac].ip
										client_info.mac = mac
										client_info.hostname = nickname or sta_list[mac].name
										client_info.name = client_info.hostname		
										client_info.wire_type = sta_list[mac].wire_type
										client_info.guest = ( nil == station.guest ) and "NON_GUEST" or station.guest
										client_info.device_type = ( nil  == all_clist[mac] ) and "unknown" or all_clist[mac].device_type

										-- update access_time
										if nil ~= old_clist[mac] then
											client_info.access_time = old_clist[mac].access_time -- set first saved access_time
										end

										if nil == client_info.access_time then
											if all_clist[mac] ~= nil then
												client_info.access_time = all_clist[mac].access_time or cur_time -- set first saved access_time
											else
												client_info.access_time = cur_time
											end
										end

										-- update access_uptime, used for spf UI
										if nil ~= old_clist[mac] then
											client_info.access_uptime = old_clist[mac].access_uptime -- set first saved access_uptime
										end

										if nil == client_info.access_uptime then
											-- set first saved access_uptime
											if all_clist[mac] ~= nil then
												client_info.access_uptime = all_clist[mac].access_uptime or cur_uptime
											else
												client_info.access_uptime = cur_uptime
											end
										end

										if nil == client_info.connect_status then
											if all_clist[mac] ~= nil then
												client_info.connect_status = all_clist[mac].connect_status or 0
											else
												client_info.connect_status = 0
											end
										end

										-- update re_clist and all_clist
										re_clist[mac] = client_info
										all_clist[mac] = client_info
									end
								end
							end
						end
						local re_tail_mac = string.sub(real_mac, 10)
						re_list[re_tail_mac].mesh_sclient_num  = mesh_sclient_num
						re_list[re_tail_mac].mesh_nclient_num  = mesh_nclient_num
						re_list[re_tail_mac].mesh_sclient_list = mesh_sclient_list
						re_list[re_tail_mac].mesh_nclient_list = mesh_nclient_list
					end
				end
			end
		end
	end
	if file then
		file:close()
	end
	return re_list, dut_clist, re_clist, all_clist
end

--- Update devices and clients each 30s
function api_timeout_called()
	-- [update client list]
	local all_clist = {}

	--1.get new data
	local re_list, _, _, all_clist = api_arrange_mesh_clients(1)

	--2.update /tmp/client_list.json
	local new_clist = json.encode(all_clist)
	client_lock(true)	
	os.remove(CLIENT_LIST)
	local f = io.open(CLIENT_LIST, "w")
	if (nil ~= f) then
		f:write(new_clist)
		f:close()
	end
	client_unlock()
	
	-- [new RE joined, then update multi-rules modules]
	local etc_sclist = get_etc_sclist()
	local white_list_flag = 0
	-- add RE to white_list
	for _, re in pairs(re_list) do
		if 1 == re.level then
			-- add RE( level = 1 ) to white_list
			local new = {}
			new.real_mac = (re.mac):upper()
			new.name = re.name
			if nil ~= etc_sclist[real_mac] and nil ~= etc_sclist[real_mac].name then
				new.name = etc_sclist[real_mac].name
			end

			-- 修复有些onemesh设备没有mac_24g或mac_5g的情况，如电力猫（有线AP）
			if re.mac_24g ~= nil and re.mac_24g ~= "" then
				new.mac = ( re.mac_24g ):gsub("-", ":"):upper() -- 2.4G mac
				local ret = form:insert("access_control", "white_list", new)
				if ret then
					white_list_flag = 1
				end
			end

			if re.mac_5g ~= nil and re.mac_5g ~= "" then
				new.mac = ( re.mac_5g ):gsub("-", ":"):upper() -- 5G mac
				ret = form:insert("access_control", "white_list", new)
				if ret then
					white_list_flag = 1
				end
			end

			if re.mac ~= nil and re.mac ~= "" then
				new.mac = ( re.mac ):gsub("-", ":"):upper()
				ret = form:insert("access_control", "white_list", new)
				if ret then
					white_list_flag = 1
				end
			end

			-- has sub RE, and only handle this situation : c7((re300((re300, level = 2
			if re.mesh_sclient_num > 0 then
				for _, sub_re in pairs(re.mesh_sclient_list) do
					-- add RE( level = 2 ) to white_list
					-- add 2.4G, 5G, br-lan mac
					local new = {}
					new.real_mac = (sub_re.mac):upper()
					new.name = sub_re.name
					if nil ~= etc_sclist[sub_re.mac] and nil ~= etc_sclist[sub_re.mac].name then
						new.name = etc_sclist[sub_re.mac].name
					end

					-- 修复有些onemesh设备没有mac_24g或mac_5g的情况，如电力猫（有线AP）
					if sub_re.mac_24g ~= nil and sub_re.mac_24g ~= "" then
						new.mac = (sub_re.mac_24g):gsub("-", ":"):upper() -- 2.4G mac
						ret = form:insert("access_control", "white_list", new)
						if ret then
							white_list_flag = 1
						end
					end

					if sub_re.mac_5g ~= nil and sub_re.mac_5g ~= "" then
						new.mac = (sub_re.mac_5g):gsub("-", ":"):upper() -- 5G mac
						local ret = form:insert("access_control", "white_list", new)
						if ret then
							white_list_flag = 1
						end
					end

					if sub_re.mac ~= nil and sub_re.mac ~= "" then
						new.mac = (sub_re.mac):gsub("-", ":"):upper() -- br-lan mac
						ret = form:insert("access_control", "white_list", new)
						if ret then
							white_list_flag = 1
						end
					end
				end
			end
		end
	end
	if 1 == white_list_flag then
		uci_r:commit_without_write_flash("access_control")
		access_control_enable = uci_r:get("access_control", "settings", "enable")
		access_control_mode = uci_r:get("access_control", "settings", "access_mode")
		if access_control_enable == "on" and access_control_mode == "white" then
			sys.fork_exec("/etc/init.d/access_control reload")
	    end
	end
	return all_clist
end

function api_get_mesh_clients()
	local client_list = api_timeout_called() -- UI request : update client_list.json immediately


	if "table" ~= type(client_list) then
		return {}
	end
	return client_list
end

--- get all onemesh-enabled RE devices
function get_sclient_list_all()
	local ret_sclist = {}
	local etc_sclist = {}
	local sync_sclist = {}
	local mesh_dev_list = {}
	
	etc_sclist = get_etc_sclist()
	mesh_dev_list = read_from_file(MESH_DEV_LIST)
	if nil == mesh_dev_list then
		return nil
	end
	
	sync_sclist = mesh_dev_list.onemesh_client_list
	if "table" ~= type(sync_sclist) then
		return ret_sclist
	end
	
	for _, dev in pairs(sync_sclist) do
		local re = {}
		local real_mac = (dev.device.mac):gsub(":", "-"):upper()
		re.mac = real_mac
		re.model = dev.device.product_name
		re.name  = re.model
		re.device_type = dev.device.device_type

		if "DISCONNECT" == (dev.device.connection_type):upper() then
			re.status = "disconnected"
		else
			re.status = "connected"
		end

		if nil ~= etc_sclist[real_mac] then
			re.name = ( nil ~= etc_sclist[real_mac].name ) and etc_sclist[real_mac].name or re.model
			re.location = ( nil == etc_sclist[real_mac].location ) and "" or etc_sclist[real_mac].location
		end
		ret_sclist[#ret_sclist + 1] = re
	end
	
	return ret_sclist
end

function get_available_mesh_dev_list()
	-- TODO: RE support Tri-band.
	local ret_sclist = {}
	local avail_dev_list = {}
	local avail_len = 0
	
	local _ubus = ubus.connect()
	local avail_dev_list  = _ubus:call("tdpServer", "onemesh_available_devices", {})
	if nil == avail_dev_list then
		return nil
	end

	local etc_sclist = get_etc_sclist()
	
	avail_len = get_table_len(avail_dev_list.onemesh_dev_available_list)
	for i = 1, avail_len do
		local avail_dev = {}
		for mac, values in pairs(avail_dev_list.onemesh_dev_available_list[i]) do
			avail_dev.mac = mac
			if "table" == type(values) then
				avail_dev.model = values.model
				if nil ~= etc_sclist[avail_dev.mac] then
					if nil ~= etc_sclist[avail_dev.mac].name then
						avail_dev.model = etc_sclist[avail_dev.mac].name
					end
				end
				avail_dev.device_type = values.device_type
				avail_dev.ip = values.ip
				avail_dev.ssid_24g = values.ssid_24g
				avail_dev.password_24g = values.password_24g
				avail_dev.ssid_5g = values.ssid_5g
				avail_dev.password_5g = values.password_5g																
			end
		end
		ret_sclist[#ret_sclist + 1] = avail_dev
	end
	
	return ret_sclist
end

function get_mesh_topology()
	local ret_sclist = {}
	local re_list, dut_clist, _, _ = api_arrange_mesh_clients(1)
	if "table" ~= type(re_list) then
		return ret_sclist
	end
	
	local re = {}
	for _, v in pairs(re_list) do
		-- return RE list, replace a tree topo
		v.mesh_sclient_num = 0
		v.mesh_sclient_list = {}
		re[#re + 1] = v
	end
	
	ret_sclist.mesh_sclient_num = get_table_len(re)
	ret_sclist.mesh_sclient_list = re
	ret_sclist.name  = uci_r:get("system", "system", "hostname")
	ret_sclist.model = uci_r:get("locale", "sysinfo", "model")
	ret_sclist.device_type = "WirelessRouter"
	ret_sclist.mac  = get_router_mac()
	ret_sclist.ip   = get_router_ip()
	ret_sclist.mesh_nclient_num = get_table_len(dut_clist)
	ret_sclist.mesh_nclient_list = {}
	if "table" == type(dut_clist) then
		for _, client in pairs(dut_clist) do
			ret_sclist.mesh_nclient_list[#ret_sclist.mesh_nclient_list + 1] = client
		end
	end
	
	return ret_sclist
end

function get_device_detail(mac)
	local re_list, _, _, _ = api_arrange_mesh_clients(1)
	local real_mac = (mac):gsub(":", "-"):upper()
	local tail_mac = string.sub(real_mac, 10)
	return re_list[tail_mac]
end

function get_all_re_detail()
	local re_list, _, _, _ = api_arrange_mesh_clients(0)
	return re_list
end

function set_device_detail(http_form)
	local ret_sclist = {}
	local para_mac = http_form.mac
	local set_name = http_form.name
	local set_location = http_form.location

	uci_r:foreach("onemesh_client", "device",
        function(section)
			if para_mac == uci_r:get("onemesh_client", section[".name"], "mac") then
				if set_name ~= nil then
					uci_r:set("onemesh_client", section[".name"], "name", set_name)
				end
				if set_location ~= nil then
					uci_r:set("onemesh_client", section[".name"], "location", set_location)
				end
			end
        end
    )
	uci_r:commit("onemesh_client")
	ret_sclist = get_device_detail(para_mac)
	return ret_sclist
end

function get_result_available_mesh_dev()
	local adev = {}
	-- todo : 实现
	return adev
end

function wireless_status_all(formvalue)
	local support_triband = uci_r:get_profile("wireless", "support_triband") or "no"
    local form = {}
	if support_triband == "no" then
        form = {"wireless_2g", "wireless_5g"}
    else
        form = {"wireless_2g", "wireless_5g", "wireless_5g_2"}
    end
    return wlan.Apcfg(form):read()
end

function manage_available_mesh_dev(args_table)
	local opcode_str
	local found_mac = false
	local ubus_args = {}

	-- dbg.dumptable(args_table)
	if args_table.operation == nil or args_table.mac == nil then 
		return false
	end

	if args_table.operation == "link" then
		opcode_str = TPMESH_OP_ADD_SLAVE

		local support_triband = uci_r:get_profile("wireless", "support_triband") or "no"
	    local status_all = wireless_status_all()
	    if not status_all or type(status_all) ~= "table" then
	        dbg.print("cannot get the wireless status")
			if support_triband == "no" then
				status_all = {["wireless_2g_current_channel"]=-1, ["wireless_5g_current_channel"]=-1}
			else
				status_all = {["wireless_2g_current_channel"]=-1, ["wireless_5g_current_channel"]=-1, ["wireless_5g_2_current_channel"]=-1}
			end
	    end

		local wifi_data = {}
		local ifname_2g = uci_r:get_profile("wireless", "wireless_ifname_2g") or "wl11"
	    local ifname_5g = uci_r:get_profile("wireless", "wireless_ifname_5g") or "wl01"
	    local wifi_24g  = uci_r:get_all("wireless", ifname_2g)
	    local wifi_5g   = uci_r:get_all("wireless", ifname_5g)
	    local RE_2G = uci_r:get_profile("wireless", "wireless_mesh_ifname_2g") or "wl14"
	    local RE_5G = uci_r:get_profile("wireless", "wireless_mesh_ifname_5g") or "wl04"
		local tmp1 = {
			ssid = wifi_24g.ssid,
			encryption = wifi_24g.encryption,
			psk_key = wifi_24g.psk_key or "12345678",
			psk_version = wifi_24g.psk_version,
			psk_cipher = wifi_24g.psk_cipher,
			wep_mode = wifi_24g.wep_mode,
			wep_format1 = wifi_24g.wep_format1,
			wep_type1 = wifi_24g.wep_type1,
			wep_key1 = wifi_24g.wep_key1 or "1234567890",
			-- channel  = uci_r:get_all("wireless", "wifi0", "channel"),
			channel = tonumber(status_all["wireless_2g_current_channel"]),
			enable   = (wifi_24g.enable == "on") and 1 or 0,
	        hide_ssid = (wifi_24g.hidden == "on") and 1 or 0,
			backhaul_ssid = uci_r:get_all("onemesh", RE_2G, "ssid"),
			backhaul_key  = uci_r:get_all("onemesh", RE_2G, "psk_key")
		}
		local tmp2 = {
			ssid = wifi_5g.ssid,
			encryption = wifi_5g.encryption,
			psk_key = wifi_5g.psk_key or "12345678",
			psk_version = wifi_5g.psk_version,
			psk_cipher = wifi_5g.psk_cipher,
			wep_mode = wifi_5g.wep_mode,
			wep_format1 = wifi_5g.wep_format1,
			wep_type1 = wifi_5g.wep_type1,
			wep_key1 = wifi_5g.wep_key1 or "1234567890",
			-- channel  = uci_r:get_all("wireless", "wifi1", "channel"),
			channel = tonumber(status_all["wireless_5g_current_channel"]),
			enable   = (wifi_5g.enable == "on") and 1 or 0,
	        hide_ssid = (wifi_5g.hidden == "on") and 1 or 0,
			backhaul_ssid = uci_r:get_all("onemesh", RE_5G, "ssid"),
			backhaul_key  = uci_r:get_all("onemesh", RE_5G, "psk_key")
		}
		wifi_data["2.4G"] = tmp1
		wifi_data["5G"]   = tmp2

		-- NOTE: add for triband
		if support_triband == "yes" then
			local RE_5G2 = uci_r:get_profile("wireless", "wireless_mesh_ifname_5g_2") or "wl24"
			local ifname_5g2 = uci_r:get_profile("wireless", "wireless_ifname_5g_2") or "wl21"
			local wifi_5g2 = {}
			local tmp3 = {}
			wifi_5g2   = uci_r:get_all("wireless", ifname_5g2)
			tmp3 = {
				ssid = wifi_5g2.ssid,
				encryption = wifi_5g2.encryption,
				psk_key = wifi_5g2.psk_key or "12345678",
				psk_version = wifi_5g2.psk_version,
				psk_cipher = wifi_5g2.psk_cipher,
				wep_mode = wifi_5g2.wep_mode,
				wep_format1 = wifi_5g2.wep_format1,
				wep_type1 = wifi_5g2.wep_type1,
				wep_key1 = wifi_5g2.wep_key1 or "1234567890",
				-- channel  = uci_r:get_all("wireless", "wifi0", "channel"),
				channel = tonumber(status_all["wireless_5g_2_current_channel"]),
				enable   = (wifi_5g2.enable == "on") and 1 or 0,
				hide_ssid = (wifi_5g2.hidden == "on") and 1 or 0,
				backhaul_ssid = uci_r:get_all("onemesh", RE_5G2, "ssid"), -- 隐藏backhaul SSID
				backhaul_key  = uci_r:get_all("onemesh", RE_5G2, "psk_key")   -- 隐藏backhaul 密码
			}
			-- NOTE: 
			wifi_data["5G2"] = tmp3
	    end
		local wifi_msg = json.encode(wifi_data)
	    -- dbg.print(wifi_msg)

	    os.remove(ONEMESH_SYNC_WIFI_TMP_JSON)
	    local f = io.open(ONEMESH_SYNC_WIFI_TMP_JSON, "w")
	    f:write(wifi_msg)
	    f:close()
	    ubus_args.load = ONEMESH_SYNC_WIFI_TMP_JSON
	    ubus_args.timeout = 5
	elseif args_table.operation == "unlink" then
		opcode_str = TPMESH_OP_REMOVE_SLAVE
	else
		return false
	end
	
	local tmp_data = {}
	tmp_data.params = ""

	ubus_args.opcode          = opcode_str
	ubus_args.target_id       = args_table.mac
	ubus_args.target_include_all_sbuf = true
	ubus_args.data = tmp_data

	-- dbg.dumptable(ubus_args)

	local _ubus = ubus.connect()
	local result  = _ubus:call("sync", "request", ubus_args)

	if result == nil then
		return false
	end	
	-- dbg.dumptable(result)

	local mac_list = result.mac_list
	if mac_list == nil then
		return false
	end

	for i = 1, #mac_list do
		if mac_list[i] == args_table.mac then
			found_mac = true
		end
	end	
	-- dbg.printf("found_mac")
	-- dbg.printf(found_mac)

	if found_mac == false then
		return false
	end

	return true, result
end
