--[[
Copyright(c) 2008-2014 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  modify_schedule_list.lua
Details :  Ubus and uci client for client management.
Author  :  Ye Qianchuan <yeqianchuan@tp-link.net>
Author  :  Jin Xuexue <jinxuexue@tp-link.net>
Author  :  Wang Lian <wanglian@tp-link.net>
Version :  1.0.1
Date    :  15July, 2016
History :  \arg 1.0.1, 04July, 2016
           \arg 1.0.0, 07 Mar, 2014
]]--


module("luci.model.modify_schedule_list", package.seeall)

local ctl    = require "luci.model.controller"
local schedule_client_file = "/var/run/schedule_client"
local nixio  = require "nixio"
local fs	 = nixio.fs
local Locker = require("luci.model.locker").Locker
local uci    = require "luci.model.uci"
local uci_s = uci.cursor()  
local json = require "luci.json"
local dbg = require "luci.tools.debug"

local nat_m = require "luci.model.nat"
local Nat = nat_m.NAT_INST()

ALEXA_REPORT_LOCK = "/var/run/alexa-report.lock"
ALEXA_SCHEDULE_LOCK = "/var/run/alexa-schedule.lock"

local function extend_mac(mac)
	--B0BE76835E01 --> B0-BE-76-83-5E-01
    local result = ""
    for i=1, #mac do
        result = result .. string.sub(mac, i, i)
        if i % 2 == 0 and i ~= #mac then
            result = result .. '-'
        end
    end
    return result
end


function check_client_config(mac)
	--dbg.printf("{modify_schedule_list.lua}[check_client_config]mac: 	" .. json.encode(mac))  
	local client_mgmt = require "luci.model.client_mgmt"  
	local tm_client_mgmt = require "luci.model.tm_clientmgmt"
	local access_list = tm_client_mgmt.get_access_client_list()	
	local deviceMap = tm_client_mgmt.get_client_type_list()
    local uci_c = uci.cursor()
    --local mac = extend_mac(mac)
    local tmp_mac = extend_mac(mac)
    local client = {}
    local success_find = false
    for _, val in ipairs(access_list) do 
    	if tmp_mac == val.mac then
    		success_find = true   	
	    	client.mac = mac
	    	-- get hostname and alias
			uci_c:foreach("history_list", "list",
		        function(section)
		            --if section.mac == client.mac:gsub("-", ""):upper() then
		            if section.mac == client.mac then
		            	client.hostname = uci_c:get("history_list", section[".name"], "hostname")
						client.alias = uci_c:get("history_list", section[".name"], "nickname") or client.hostname
		            end
		        end
		    )
    		client.type = tm_client_mgmt.get_client_type(mac, deviceMap)
    		--dbg.printf("{modify_schedule_list.lua}[check_client_config]client: 	" .. json.encode(client))
    		return client
    	end
    end 	
    return nil
end


local function write_to_file(file, data)
    local fp = io.open(file, "w")
    if fp == nil then
        dbg("error open file failed:" .. file)
        return false
    end
    fp:write(json.encode(data))
    fp:close()
    return true
end

local function read_from_file(file)
    local fp = io.open(file, "r")
    local data = nil
    if fp == nil then
        dbg("error open file failed:" .. file)
    else
        local lines = fp:read("*all")
        fp:close()
        data = json.decode(lines)
    end
	--dbg.print("{modify_schedule_list.lua}[read_from_file] data:	" .. json.encode(data))
	return data
end

local function is_nil_table(data)
    if data == nil then
        return true
    end
    for _, v in pairs(data) do
        return false
    end
    return true
end

local function search_item(old_item, maclist)
	if old_item == nil or old_item.mac == nil or is_nil_table(maclist) then
		return nil
	end

	local ret
	for _, t in pairs(maclist) do
		if t.mac and t.mac == old_item.mac then
			ret = t
			break
		end
	end

	return ret
end

local function write_runtime_file(maclist)

	local new_maclist = {}
	if maclist == nil then
		dbg("write_runtime_file maclist nil")
		return
	end

	--dbg("append maclist:%s" % json.encode(maclist))
	old_maclist = read_from_file(schedule_client_file)
	--dbg("read old_maclist:%s" % json.encode(old_maclist))
	if is_nil_table(old_maclist) then
		dbg("old_maclist is nil, just write")
		write_to_file(schedule_client_file, maclist)
		return
	end

	local old_item
	for _, old_item in pairs(old_maclist) do
		local t = search_item(old_item, maclist)

		if t then

			if t.cfg_block == nil then
				t.cfg_block = t.block
			end

			table.insert(new_maclist, t)
		else
			table.insert(new_maclist, old_item)
		end
	end

	local new_item
	for _, new_item in pairs(maclist) do
		local t = search_item(new_item, new_maclist)
		if not t then
			dbg("add new item(%s) to list" % json.encode(new_item))
			table.insert(new_maclist, new_item)
		end
	end

	--dbg("write new_maclist:%s" % json.encode(new_maclist))
	write_to_file(schedule_client_file, new_maclist)

end

function update_schedule_runtime_file(maclist)
	--dbg("update_schedule_runtime_file get maclist:%s" % json.encode(maclist))
	local schedule_lock = Locker(ALEXA_REPORT_LOCK)
	local pid = nixio.getpid()
	if schedule_lock == nil or maclist == nil then
		dbg("schedule_lock/maclist nil")
		return
	end

	if not fs.access(schedule_client_file) then
		dbg("create %s" % json.encode(schedule_client_file))
		os.execute("touch " .. schedule_client_file)
	end

	if schedule_lock:tlock() then
		write_runtime_file(maclist)
	else
		dbg(schedule_client_file .. " is locking!" .. pid .. " Wait...")
		schedule_lock:lock()
		write_runtime_file(maclist)
	end

	schedule_lock:close()

end


function read_schedule_runtime_file(filename)

	local schedule_lock = Locker(ALEXA_REPORT_LOCK)
	local maclist
	local f
	local pid = nixio.getpid()
	if schedule_lock == nil then
		dbg("schedule_lock nil")
		return
	end

	if filename == nil then
		dbg("nil filename, use default file" .. schedule_client_file)
		f = schedule_client_file
	else
		f = filename
	end

	if schedule_lock:tlock() then
		maclist = read_from_file(f)
	else
		dbg(f .. " is locking!" .. pid .. " Wait...")
		schedule_lock:lock()
		maclist = read_from_file(f)
	end

	schedule_lock:close()
	return maclist

end

function set_smart_home_client(client, block)
	if client == nil or client.mac == nil or client.cause == nil then
		dbg("set_smart_home_client params invalid(%s)" % json.encode(client))
		return
	end

    local mac = client.mac:gsub("-", ""):upper()
    local info = {}

	info.name = client.alias or client.hostname                
	info.mac = extend_mac(mac)
	info.mac = client.mac
	info.type  = "other"

	info.cause = client.cause
	if client.start_time and client.stop_time then
		info.start_time = client.start_time
		info.stop_time = client.stop_time
	end

	if block then
		info.pause = 1
	else
		info.pause = 0
	end
	uci_s:section("smart_home", "client", mac, info)
	--uci_s:commit("smart_home")

end


function commit_smart_home_client()
	--store access client info from TEMP_UCI_PATH to device-config
    --store_access_client_info()
    return uci_s:commit("smart_home")
end


local function compare_status(params, client, maclist_all)

	--dbg("compare_status:%s" % json.encode(client))
	if params == nil or client == nil or 
		client.mac == nil then
		return false
	end

	if maclist_all == nil then
		dbg("no record found, so it's a new device")
		return true
	end

	local found = false
	for _, item in pairs(maclist_all) do
		if item.mac == client.mac then
			found = true
			if item.block == params.block and 
				item.start_time == params.start_time and
				item.stop_time == params.stop_time then
				dbg("%s block is %s, no change" % 
				{json.encode(client.mac), json.encode(params.block)})
				return false
			else
				dbg("%s block is %s, change" % 
				{json.encode(client.mac), json.encode(params.block)})
				return true
			end
		end

		if found == true then
			break
		end
	end

	if not found then
		dbg("fail to find %s in maclist, save it..." % json.encode(client.mac))
		return true
	end

end

local function modify_block_client(params)
	--dbg.printf("{modify_schedule_list.lua}[modify_block_client]params: 	%s" % json.encode(params))	
	local result = {}
    local changed_list = nil
	local schedule_client_file = "/var/run/schedule_client"
	local maclist_all = read_schedule_runtime_file(schedule_client_file)
	local forever = 0
	if params == nil or params.clientList == nil then
		dbg("fail to find client list")
		result.error_code = -1100
		return result
	end

	local get_sysmode = require "luci.controller.admin.system"
    local sysmode_result = get_sysmode.get_sysmode()
    local sysmode = sysmode_result.mode
    
	if sysmode == nil or sysmode ~= "router" then
		dbg("smart_home client access is only valid for Router mode...")
		result.error_code = -1118
		return result
	end

	--local execlist = {}
    for _,client in ipairs(params.clientList) do
		local change = compare_status(params, client, maclist_all)
		dbg("change:%s" % json.encode(change))
		if change == true then
            if not changed_list then
                changed_list = {}
            end

			if params.cause and params.start_time and params.stop_time then
				dbg("record schedule status according to cloud command...")
				local maclist = {}
				local item = {}
				item.block = params.block
				item.cfg_block = params.block
				item.mac = client.mac
				item.start_time = params.start_time
				item.stop_time = params.stop_time
				maclist[#maclist+1] = item
				--execlist[#execlist+1] = item	
				--put exec action after sync_hnat_status
				update_schedule_runtime_file(maclist)
				--os.execute("smart_home_schedule exec")
				local schedule_lock = Locker(ALEXA_SCHEDULE_LOCK)
				local pid = nixio.getpid()
				if schedule_lock == nil or maclist == nil then
					dbg("schedule_lock/maclist nil")
					return
				end

				if schedule_lock:tlock() then
					os.execute("smart_home_schedule exec")
				else
					dbg("smart_home_schedule" .. " is locking!" .. pid .. " Wait...")
					schedule_lock:lock()
					os.execute("smart_home_schedule exec")
				end
				schedule_lock:close()
				
				--dbg("!!!execute success!")
			end

            changed_list[#changed_list + 1] = 
			{clientMac=client.mac:gsub("[:-]",""):upper()}
			if params.cause then
				client.cause = params.cause
				if params.start_time and params.stop_time then
					client.start_time = params.start_time
					client.stop_time = params.stop_time
				else
					client.start_time = forever
					client.stop_time = forever
				end
			end

			dbg("client set to smart_home:%s" % json.encode(client))
            set_smart_home_client(client, params.block)
        end
    end
    commit_smart_home_client()
    dbg("changed_list:%s" % json.encode(changed_list))
--[[
	--may change pause list,do sync HNAT
	dbg.printf("----sync in exec")
	Nat:sync_hnat_status()

	for _,item in ipairs(execlist) do
		local maclist = {}
		maclist[#maclist+1] = item
		update_schedule_runtime_file(maclist)
		os.execute("smart_home_schedule exec")
		dbg("!!!execute disable hnat success!")
	end
]]--
    --local support_mode = require "luci.model.mode"
    --if changed_list and support_mode.is_smart_home_support() then

	local smart_home_support = uci_s:get_profile("smart_home", "support") or "no"
    
    if changed_list and smart_home_support == "yes" then
		local smart_home_upload = require "cloud.smart_home.smart_home_upload"
		local cause = smart_home_upload.VOICE
		smart_home_upload.upload_property_change_client("networkPermission", cause, changed_list)
    end
    if params.failList then
        local result = {}
        result.error_code = 0
        result.failList = params.failList
		dbg("failList result:%s" % json.encode(result))
        return result
    end
    result.error_code = 0
    return result
end

--[[
form_ctl = {
["form"] = "black_list",
["operation"] = "modify",
["block"] = internetBlocked,
["clientList"] = clientList,
["failList"] =  failList,
["cause"] = "smart_home",
["start_time"] = start_time,
["stop_time"] = stop_time
}
--]]

local dispatch_tbl = {
    ["black_list"] = {
        ["modify"]  = { cb = modify_block_client },
    }
}

function _M.dispatch(form)
	--dbg.printf("{modify_schedule_list.lua}[dispatch]form: 	" .. json.encode(form))
	local result = {}
	if not form or not form.operation then
		result.error_code = -1101
		return result
	end
	local fn, result
	local params = {}
	params.block = form.block
	params.clientList = form.clientList
	params.failList = form.failList
	params.cause = form.cause
	params.start_time = form.start_time
	params.stop_time = form.stop_time
	
	fn = dispatch_tbl[form.form]
	result = fn[form.operation].cb(params)

	return result
end

return _M

