--[[
Copyright(c) 2012-2019 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  blocking.lua
Details :  Controller for blocking webpage
Author  :  Wanghao 
Version :  1.0.0
Date    :  3 Dec, 2019
]]--

module("luci.controller.blocking", package.seeall)

local uci    = require "luci.model.uci"
local dbg    = require "luci.tools.debug"
local sys    = require "luci.sys"
local ctl    = require "luci.model.controller"

local PC_CONFIG_NAME = "parental_control_v2"
local APPLY_INTERNET_TIME = "/usr/sbin/report_upload_time_apply"
local APPLY_WEBSITE_ACCESS = "/usr/sbin/report_upload_url_apply"
local PROC_VERCODE = "/proc/pctl/vercode"
local TMP_VERCODE = "/var/run/vercode"
local TIMEOUT = 60

local function is_safe_url(url)
	-- List of disallowed characters and substrings that could indicate command injection
	local disallowed_patterns = {";", "&", "|", "`", "$", "(", ")", "<", ">", "{", "}", "[", "]", "~", "'", "\""}

	-- Check if the URL contains any of the disallowed patterns
	for _, pattern in ipairs(disallowed_patterns) do
		if string.find(url, pattern, 1, true) then
			return false  -- URL contains a disallowed character or substring
		end
	end
	return true  -- URL is potentially safe
end

function token_check(formvalue)
	local mac = formvalue["mac"]
    local token = formvalue["token"]
	local ctime = os.time()
	local profileId

	--mac = mac:gsub(":", "-"):upper()
    if not mac or not token then
		dbg("Invalid format")
        return false
    end
	
	--validate token
    local fp = io.open(PROC_VERCODE,"r")
	if fp then
		local head = fp:read("*line")
		code, src, mtime = string.match(head, "^(%d+) (.+) (%d+)$")
		fp:close()
	else
		dbg("open file error.")
	end
	
	if code == "0" or mtime == "0" then
		dbg("No valid token generated.")
		return false
	end
	
	if mac ~= src then
		dbg("mac unmatched.")
		return false
	end
	
	local ttime = ctime - mtime
	if ttime > TIMEOUT then
		dbg("token time out.")
		--refresh the token?
		return false
	end
	
	if token ~= code then
		dbg("token unmatched.")
		return false
	end
	
	return true
end

function vercode_check(code)
	local nixio = require "nixio"
    local mtime = nixio.fs.stat(TMP_VERCODE, "mtime")

    if not mtime then 
        return false
    end
    
    local ctime = os.time()
    local ttime = ctime - mtime

    if ttime > TIMEOUT then
        dbg("Verification code is time out!")
        return
    end

    local file = io.open(TMP_VERCODE, "r")
    if not file then
        dbg("Verification code is not generated yet!")
        return false
    end

    local vercode = file:read("*all") or ""
    file:close()

    if code ~= "" and vercode ~= ""
        and tonumber(code) == tonumber(vercode) then
        return true
    end
	
	return false
end

function check(formvalue)
	local uci_r = uci.cursor()
	local status = uci_r:get("cloud_config","device_status", "bind_status") or "0"
	
	if status == "1" then
		return true
	end
	
    return false
end

function get(formvalue)
	local ret = {}
	local vercode = nil
	
	if token_check(formvalue) ~= true then
		ret.success = false
		ret.err_code = 101
		ret.err_info = "invalid token"
		return false, "invalid token", ret
	end
	
	local file = io.open(TMP_VERCODE, "r")

    if file then
        local nixio = require "nixio"
        local mtime = nixio.fs.stat(TMP_VERCODE, "mtime")
        local ctime = os.time()
        local ttime = ctime - mtime

        if ttime < TIMEOUT then
            vercode = file:read("*all")
        end
        file:close()
    end
	
    if not vercode then
        -- Generate and save the verification code.
        local seed = 0
        local data
        local file = io.open("/dev/urandom", "rb")
        
        if file then
            data = file:read(4)
            file:close()
        end
        
        for i = 1, 4 do
            seed = seed * 256 + string.byte(data, i)
        end
		
        math.randomseed(seed%10000000)
        vercode = math.random(100000, 999999)
        file = io.open(TMP_VERCODE, "w")
        if not file then
			dbg("Create verification code failed!")
			ret.success = false
			ret.err_code = 109
			ret.err_info = "Create verification code failed"
			return false, "Create verification code failed", ret
        end

        file:write(vercode)
        file:close()
    end
	
	ret.vercode = vercode
	
    return ret
end

function set(formvalue)
    local uci_r = uci.cursor()
    local apply  = formvalue["apply"]
	local url = formvalue["url"]
    local mac = formvalue["mac"]
    local vercode = formvalue["vercode"]
	local ctime = os.time()
	local profileId = nil
	local ignore_time = nil
	local ignore_website = nil
	local ret = {}
	
	if token_check(formvalue) ~= true then
		ret.success = false
		ret.err_code = 101
		ret.err_info = "invalid token"
		return false, "invalid token", ret
	end

	mac = mac:gsub(":", "-"):upper()
    if not apply or not mac or not vercode then
		dbg("invalid format")
		ret.success = false
		ret.err_code = 102
		ret.err_info = "invalid format"
		return false, "invalid format", ret
    end

	if apply == "website" then
		if not url or not is_safe_url(url) then
			dbg("invalid URL")
			ret.success = false
			ret.err_code = 103
			ret.err_info = "invalid URL"
			return false, "invalid URL", ret
		end
	end

	if apply ~= "time" and apply ~= "website" then
		dbg("invalid apply")
		ret.success = false
		ret.err_code = 104
		ret.err_info = "invalid apply"
		return false, "invalid apply", ret
    end
	
	--validate vercode
	if vercode_check(vercode) ~= true then
		ret.success = false
		ret.err_code = 107
		ret.err_info = "vercode unmatched"
		return false, "vercode unmatched", ret
	end

	--find profile
	uci_r:foreach("client_mgmt", "client",
		function(section)
			local real_mac = section.real_mac or section.mac
			if real_mac == mac then
				profileId = section.owner_id
			end
		end
	)
	
	if not profileId then
		dbg("profileId unmatch.")
		ret.success = false
		ret.err_code = 108
		ret.err_info = "profileId unmatch"
		return false, "profileId unmatch", ret
	end
	
	--ignoring check
	ignore_time = uci_r:get(PC_CONFIG_NAME, tostring(profileId), "ign_online") or "0"
	ignore_website = uci_r:get(PC_CONFIG_NAME, tostring(profileId), "ign_website") or "0"
	
    if apply == "time" and ignore_time ~= "1" then
		sys.call("%s %s" % {APPLY_INTERNET_TIME, profileId})
	else 
		if apply == "website" and ignore_website ~= "1" then
			sys.fork_exec("%s %s %s" % {APPLY_WEBSITE_ACCESS, profileId, url})
		end
    end
    
	ret.success = true
	
    return ret
end

local dispatch_tbl = {
    vercode = {
        ["check"]  = { cb = check },
        ["read"]  = { cb = get },
        ["write"] = { cb = set }
    }
}

function dispatch(http_form)
    return ctl.dispatch(dispatch_tbl, http_form)
end

function _index()
    return ctl._index(dispatch)
end

function index()
    entry({"blocking"}, call("_index")).leaf = true
end
