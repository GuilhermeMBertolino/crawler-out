--[[
Copyright(c) 2008-2016 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  speed_test.lua
Details :  speed test configure model
Author  :  Zhu Junjie <zhujunjie@tp-link.net>
Version :  1.0.0
Date    :  2 June, 2016
]]--

module("luci.model.speed_test", package.seeall)

local sys = require "luci.sys"
local utl = require "luci.util"
local uci = require "luci.model.uci"
local string = require "string"
local ubus	= require "ubus"
local form  = require "luci.tools.form"
local dbg	= require "luci.tools.debug"

local SCRIPT_SPEED_TEST = "/etc/speed-test/speed_test.sh &"
local FILE_SPEED_TEST_RESULT = "/tmp/log/speed_test.result"
local FLAG_SPEED_TEST_END = "SPEED TEST COMPLETED"

--- check if the speed-test program is running.
-- @param N/A 
-- @return bool true or false
local function check_spt_running()
    local i
    local file_res
    local res_text
    local spt_completed = flase
    local pid = sys.exec("pidof speed-test")

    -- parse the file /tmp/log/speed_test.result, try to find the FLAG_SPEED_TEST_END.
    file_res = io.open(FILE_SPEED_TEST_RESULT, "r")
    if not file_res then
       if pid and tonumber(pid) ~= nil then
           return true
       else
           return false
       end
    end
    
    res_text = file_res:read("*all")
    file_res:close()
    
    i, _ = string.find(res_text, FLAG_SPEED_TEST_END)
    if i then
        spt_completed = true
    end
    -- if the legal pid is found or the FLAG_SPEED_TEST_END is not found, we tread it as running.
    if pid and tonumber(pid) ~= nil or not spt_completed then
        return true
    end
    
    return false
end

--- check if the wan connection is connected
-- @param N/A 
-- @return true/false
local function check_wan_connected()
    local _ubus = ubus.connect()

    if _ubus then
        local data = _ubus:call("network.interface.wan", "status", {})
        _ubus:close()
        if data then
            if data["linkstate"] and data["state"] == "connected" then
                return true
            end
        end
    end
    
    return false
end


--- get up speed and down speed from the file /tmp/log/speed_test.result
-- @param N/A 
-- @return upstream speed, downstream spped 
local function get_spt_speed()
    local file_res
    local res_text
    local speed
    local u_speed = -1
    local d_speed = -1
    local i

	file_res = io.open(FILE_SPEED_TEST_RESULT, "r")
    if not file_res then
       return u_speed, d_speed
    end

    res_text = file_res:read("*all")
    file_res:close()

    -- download speed test result is in the format "download: 830228" with a seperate line
    i, _, speed = string.find(res_text, "\ndownload:%s*(%d+)")
    if i then
        d_speed = tonumber(speed)
    end

    -- upload speed test result is in the format "upload: 894864" with a seperate line
    i, _, speed = string.find(res_text, "\nupload:%s*(%d+)")
    if i then
        u_speed = tonumber(speed)
    end
	
    return u_speed, d_speed
end

-- Encapsulate speed test module, class
SPEED_TEST_INST = utl.class()

function SPEED_TEST_INST:__init__()
    self.module = "speed_test"
    self.config = "speed_test"
    self.uci = uci.cursor()
end

local function comps(a, b)
    return tonumber(a.test_time) > tonumber(b.test_time)
end

function save_last_record()
	-- get the result and store them to the config.
	local u_speed = -1
	local d_speed = -1
	local spt_time = os.time()
	local new_record = {}
	local uci_s = uci.cursor()
	local max_num = uci_s:get_profile("speed_test", "max_record") or "100"
	local spt_history = {}
	
	u_speed, d_speed = get_spt_speed()

	-- In case speed-test program(ookla) exit normally without a correct result, for example 
	-- license expired.
	if u_speed >= 0 and d_speed >= 0 then
		-- set the config for speed test.
		uci_s:set("speed_test", "spt_result", "up_speed", u_speed)
		uci_s:set("speed_test", "spt_result", "down_speed", d_speed)
		uci_s:set("speed_test", "spt_result", "test_time", spt_time)

		new_record.up_speed = u_speed
		new_record.down_speed = d_speed
		new_record.test_time = spt_time
		
		-- 1. check history num
		uci_s:foreach("speed_test", "record",
			function(section)
				local hist = section
				spt_history[#spt_history + 1] = hist
			end
		)   
		
		-- 2. if exceeds max_num, delete one
		if (#spt_history) >= tonumber(max_num) then
			table.sort(spt_history, comps) 
			local hist = spt_history[#spt_history]
			uci_s:delete("speed_test", hist[".name"])
		end
		
		-- 3. set
		uci_s:section("speed_test", "record", tostring(new_record.test_time), new_record)
		
		-- 4. commit
		uci_s:commit("speed_test")
		
	end

	-- write the completed flag.
	-- dbg.print("write the completed flag")
	sys.fork_call("echo " .. FLAG_SPEED_TEST_END .. " >> " .. FILE_SPEED_TEST_RESULT)
	
	return 0
end

--- start the speed-test program if it is not running.
-- @param N/A 
-- @return number of the start time. -1 for start error, positive for speed test start time.
function SPEED_TEST_INST:start_spt()
    local running = check_spt_running()
    local start_time = 0
    
    if running then
		-- dbg.print("speed test is running")
        return start_time
    end

	local code = sys.fork_call(SCRIPT_SPEED_TEST)

	if code ~= 0 then
		-- write the completed flag.
		sys.fork_call("sleep 1")
		sys.fork_call("echo " .. FLAG_SPEED_TEST_END .. " >> " .. FILE_SPEED_TEST_RESULT)
		-- should never get here.
		return -1
	end

   
	start_time = os.time()
	return start_time
end

--- stop the speed-test program if it is not running.
-- @param N/A 
-- @return bool true or false, false for not running, true for stop ok.
function SPEED_TEST_INST:stop_spt()
    local running = check_spt_running()
    if not running then
        return false
    end

    -- speed_test.sh must be killed first to return an error code.
    sys.fork_call("killall speed_test.sh")
    sys.fork_call("killall speed-test")
	
	sys.fork_call("sleep 1")
    sys.fork_call("echo " .. FLAG_SPEED_TEST_END .. " >> " .. FILE_SPEED_TEST_RESULT)
    
    return true
end

--- auto start speed test when connecting to internet after first configuration.
-- @param N/A
-- @return start time in numeric format. -1 for no need to run, 0 for not ready and
--         positive for speed test start time.
function SPEED_TEST_INST:auto_start_spt()
    local last_spt_time = tonumber(self.uci:get(self.config, "spt_result", "test_time"))
    local wan_connected = false

	-- in case uci is not ready
    if not last_spt_time then
        return 0
    end

    -- if there is data in config
    if last_spt_time ~= 0 then
        return -1
    end

    -- check 3 times for wan connection
    for i = 1, 3 do
        wan_connected = check_wan_connected()
        if not wan_connected then
            return 0
        end
        sys.fork_call("sleep 1")
    end

    -- do the really test.
    return self:start_spt()
end

--- clear all the history result for speed test including the recent one.
-- @param N/A
-- @return clear time in numeric format.
function SPEED_TEST_INST:clear_spt_history()
	
    -- clear recent speed test result.
	self.uci:set(self.config, "spt_result", "up_speed", -1)
	self.uci:set(self.config, "spt_result", "down_speed", -1)
	self.uci:set(self.config, "spt_result", "test_time", 0)
	
	self.uci:foreach(self.config, "record",
        function(section)
			self.uci:delete(self.config, section[".name"])
		end
    )
	-- commit config
	self.uci:commit(self.config)

	return true
end

--- get speed test result.
-- @param N/A 
-- @return table for the result.
function SPEED_TEST_INST:get_spt_result()
    local res = {}
    local running = check_spt_running()

    -- if running, use the value in /tmp/log/speed_test.result
    	local u_speed = -1
        local d_speed = -1
    if running then
        u_speed, d_speed = get_spt_speed()
        
		res.up_speed = u_speed
		res.down_speed = d_speed
		res.test_time = os.time()
        if d_speed == -1 then
            res.status = "down_test"
		else
			res.status = "up_test"
        end
	else
		u_speed, d_speed = get_spt_speed()
		if u_speed == -1 or d_speed == -1 then
			res.status = "fail"
		else
			res.status = "idle"
		end
		
		res.up_speed = tonumber(self.uci:get(self.config, "spt_result", "up_speed"))
		res.down_speed = tonumber(self.uci:get(self.config, "spt_result", "down_speed"))
		res.test_time = tonumber(self.uci:get(self.config, "spt_result", "test_time"))
    end
    
    return res
end

--- get latest speed test result.
-- @param N/A 
-- @return table for the result.
function SPEED_TEST_INST:get_latest_spt_result()
    local res = {}
    local running = check_spt_running()

    local u_speed = -1
    local d_speed = -1
    
    u_speed, d_speed = get_spt_speed()
    
    res.up_speed = u_speed
    res.down_speed = d_speed
    if d_speed == -1 then
        res.status = running == true and "down_test" or "idle"
    elseif u_speed == -1 then
        res.status = running == true and "up_test" or "idle"
    else
        res.status = "idle"
    end
    
    return res
end

--- get speed test month history result
-- @param N/A 
-- @return the best and worst speed test history result in the last month.
function SPEED_TEST_INST:get_spt_history()
    local history_list = {}
	
	self.uci:foreach(self.config, "record",
        function(section)
			local record = {}
			record.up_speed = section.up_speed
			record.down_speed = section.down_speed
			record.test_time = section.test_time
			history_list[#history_list + 1] = record
		end
    )
	table.sort(history_list, comps) 
    return history_list
end


function SPEED_TEST_INST:tmp_get_speedtest_history(app_form)
	local data = luci.json.decode(app_form.data)
	if not data and type(data) ~= "table" then
		dbg.print("invalid data")
		return {errorcode="invalid new params"}
	end
	
	local start_index = tonumber(data.start_index)
	local amount = tonumber(data.amount)
	
	local total = 0
	local res = {}
	local result = {}
	
	local history_all = {}
	self.uci:foreach(self.config, "record",
	function(section)
		local hist = section
		history_all[#history_all + 1] = hist
	end
	)
	table.sort(history_all, comps)
	
	local history_list = {}
	for _, v in ipairs(history_all) do
		if total >= start_index and total < start_index + amount then
			local record = {}
			record.up_speed = v.up_speed
			record.down_speed = v.down_speed
			record.test_time = v.test_time
			history_list[#history_list + 1] = record
		end
		total = total + 1
	end
	
	--[[local history_list = {}
	self.uci:foreach(self.config, "record",
	function(section)
		if total >= start_index and total < start_index + amount then
			local record = {}
			record.up_speed = section.up_speed
			record.down_speed = section.down_speed
			record.test_time = section.test_time
			history_list[#history_list + 1] = record
		end
		total = total + 1
	end
    )]]--
	
	result.start_index = start_index
	result.amount = #history_list
	result.sum = total
	result.history_list = history_list
	
	res.result = luci.json.encode(result)
    return res
end