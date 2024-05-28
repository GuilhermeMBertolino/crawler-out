#! /usr/bin/env lua
--
-- networkPermission.lua
-- Copyright (C) 2019 tpuser <tpuser@liushuaiwei>
--
-- Distributed under terms of the MIT license.
--
module ("luci.smart_home.networkPermission", package.seeall)

local ctl =  require "luci.model.smart_home_controller"
local _M = {}
local dbg = require "luci.tools.debug"
local json = require "luci.json"
local smart_home_clientmgmt = require "luci.model.modify_schedule_list"
local sys    = require "luci.sys"
local nixio = require "nixio"
local uci = require "luci.model.uci"
local uci_r = uci.cursor()
local uci_t = uci.cursor_state()
local schedule_client_file = "/var/run/schedule_client"

--local FILE_NTP_SUCCESS = "/tmp/ntp_time_set"

function _M.version()
    return '1.0'
end

local function check_in_ap_mode()
	local sysmode_support = uci_r:get("sysmode", "sysmode", "support") or "no"
	local sysmode =  uci_r:get("sysmode", "sysmode", "mode") or "router"
	if sysmode_support == "yes" and sysmode == "ap"	then
		return true
	else
		return false
	end
end

local function extend_mac(mac)
    local result = ""
    for i=1, #mac do
        result = result .. string.sub(mac, i, i)
        if i % 2 == 0 and i ~= #mac then
            result = result .. ':'
        end
    end
    return result
end

local function check_client_config_history(mac)
    local uci_c = uci.cursor()
    local client = {}
    local success_find = false
    client.mac = mac

	uci_c:foreach("history_list", "list",
        function(section)
            if section.mac == client.mac then
            	success_find = true
            end
        end
    )
    
    if success_find == true then
    	return client
    else
    	return nil
    end
end

local function query_network_permission(data)
    -- dbg("query_network_permission input:    %s" % json.encode(data))
    local result = {}
    local found = false
    local pause = false
    if not data or not data.clientMac then
        return nil
    end
    
    if not check_client_config_history(data.clientMac) then
        result.error_code = -1300
        return result
    end

    local maclist = smart_home_clientmgmt.read_schedule_runtime_file(schedule_client_file)
    if maclist == nil or #maclist <= 0 then
        return {internetBlocked=pause}
    end

    for _, item in pairs(maclist) do
        if item.mac and item.mac == data.clientMac then
            found = true
            dbg("query_network_permission get item:     %s" % json.encode(item))
            pause = item.block
        end

        if found == true then
            break
        end
    end

    result = {internetBlocked=pause}
    if check_in_ap_mode() == true then
    	result = {internetBlocked=false}
    end
    local ret = {}
    ret.error_code = 0
    ret.result = result
    return ret

end

local function get_client_schedule(data)
	local enable_schedule = false
	local start_time
	local stop_time
	local forever = 0
	local ntp_flag = uci_t:get("systime", "core", "sync")
	if data == nil then
		return enable_schedule
	end

	-- There are six format of time request
	-- 1. startTime only
	-- 2. endTime only
	-- 3. duration only
	-- 4. startTime and duration
	-- 5. endTime and duration
	-- 6. no startTime, endTime and duration
    if data.startTime and data.endTime == nil and data.duration == nil then
        enable_schedule = true
        start_time = tonumber(data.startTime)
        stop_time = forever
    end

    if enable_schedule == false and data.endTime and data.startTime == nil and data.duration == nil then
        --if not nixio.fs.access(FILE_NTP_SUCCESS) then
		if ntp_flag ~= "1" then
            dbg("NTP is not ok.")
        else
            enable_schedule = true
            local cur_time = tonumber((sys.exec("date +%s")):trim()) -- in second
            start_time = cur_time
            stop_time = tonumber(data.endTime)
        end
    end

	if enable_schedule == false and data.duration and data.startTime == nil and data.endTime == nil then
		--if not nixio.fs.access(FILE_NTP_SUCCESS) then
		if ntp_flag ~= "1" then
			dbg("NTP is not ok.")
		else
			enable_schedule = true
			local cur_time = tonumber((sys.exec("date +%s")):trim()) -- in second
			start_time = cur_time
			stop_time = start_time + tonumber(data.duration) * 60
		end
	end

	if enable_schedule == false and data.startTime and data.duration and data.endTime == nil then
		if tonumber(data.startTime) > 0 and tonumber(data.duration) > 0 then
			enable_schedule = true
			start_time = tonumber(data.startTime)
			stop_time = start_time + tonumber(data.duration) * 60
		end
	end

	if enable_schedule == false and data.startTime == nil and data.endTime and data.duration then
		if tonumber(data.endTime) > 0 and tonumber(data.duration) > 0 then
			enable_schedule = true
			stop_time = tonumber(data.endTime)
			start_time = stop_time - tonumber(data.duration) * 60
		end
	end

	if enable_schedule == false and data.startTime == nil and data.endTime == nil and data.duration == nil then
		enable_schedule = true
		start_time = forever
		stop_time = forever
	end

	if data.startTime and data.endTime and data.duration then
		dbg("We do NOT allow all the time parameters appear!")
		enable_schedule = false
	end

	if start_time and stop_time and
		start_time > stop_time and stop_time ~= forever then
		dbg("this seems a expired command...")
		start_time = stop_time - 60
	end

	if enable_schedule == false or start_time == nil or stop_time == nil or start_time < 0 or stop_time < 0 then
		dbg("no valid client schedule params found!")
		dbg("enable_schedule:	%s" % json.encode(enable_schedule))
		dbg("start_time:		%s" % json.encode(start_time))
		dbg("stop_time:			%s" % json.encode(stop_time))
		return false
	end

	return enable_schedule, start_time, stop_time

end

local function permission_params_transfer(data)
	--dbg("{networkPermission.lua}[permission_params_transfer]data:		" .. json.encode(data))
    if not data then
        return nil
    end
    if not data.clientMacList and not data.clientMac then
        return nil
    end
    local params = {}
    local clientList = {}
    local failList
    if data.clientMac then
        local client = smart_home_clientmgmt.check_client_config(data.clientMac)
        -- check whether there is the client in the history list
        if not client then
            return -1300
        end
        clientList[#clientList + 1] = client
    end
    if data.clientMacList then
        for _,clientMac in ipairs(data.clientMacList) do
            local client = smart_home_clientmgmt.check_client_config(clientMac)
            -- check whether there is the client in the history list
            if not client then
                if not failList then
                    failList = {}
                end
                local fail_client = {}
                fail_client.clientMac = clientMac
                fail_client.errorCode = -1300
                failList[#failList + 1] = fail_client
            end
            clientList[#clientList + 1] = client
        end
    end
    params.block = data.internetBlocked
    params.clientList = clientList
    params.failList = failList
    params.cause = "smart_home"

	local enable_schedule, start_time, stop_time = get_client_schedule(data)
	if enable_schedule and enable_schedule == true then
		params.start_time = start_time
		params.stop_time = stop_time
	end

	--dbg("{networkPermission.lua}[permission_params_transfer]data:		%s" % json.encode(params))
    return params
end

local dispatch_tbl = {  
    ["query"] = {
        cb = query_network_permission
    },
    ["schedule"] = {
        ctl = smart_home_clientmgmt,
        form = "black_list",
        oper = "modify",
        pre_hook = permission_params_transfer,
    },
    ["execute"] = {
        ctl = smart_home_clientmgmt,
        form = "black_list",
        oper = "modify",
        -- cb = execute_client_info,
        pre_hook = permission_params_transfer,
    },
}
--[[
form = {
"method": "schedule",
"params": { 
"internetBlocked": true,
"startTime": 1570784749,
"endTime": 1570784999,
"deviceMac":B0BE76835E01,
}
--]]
function _M.dispatch(form)
	--dbg("networkPermission form:	%s" % json.encode(form))
    local ret = ctl.dispatch(dispatch_tbl, form)
	--dbg("networkPermission ret:		%s" % json.encode(ret))
	return ret
end

return _M
