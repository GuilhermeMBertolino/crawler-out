-- Lua can call cloud API via ubus.
module("cloud_req.cloud_comm", package.seeall)

local json  = require "luci.json"
local dbg   = require "luci.tools.debug"
local ubus  = require "ubus"
local _ubus = ubus.connect()

local UBUS_OBJECT = "cloud_client"

local CLOUD_CONFIG_FILE = "/etc/cloud_config.cfg"

local SPECIAL_ID_TBL = {
    ["00000000"] = "UN",
    ["55530000"] = "US",
    ["45550000"] = "EU",
    ["4B520000"] = "KR",
    ["42520000"] = "BR",
    ["4A500000"] = "JP",
    ["43410000"] = "CA",
    ["41550000"] = "AU",
    ["52550000"] = "RU",
    ["54570000"] = "TW"        
}

function get_config_timeout()
    local f = io.open(CLOUD_CONFIG_FILE, "r")
    if not f then
        return nil, "open file"
    end

    local data = json.decode(f:read("*a"))
    f:close()
    
    if not data or not data.default or not data.default.request_timeout_ms then
        return false, "get data"
    end

    return tonumber(data.default.request_timeout_ms)
end

function send_request_sync(req, timeout_ms, flag)
	local args = {}
	
	dbg.print("req:",json.encode(req))
	args.cloud_request_string = json.encode(req)
	args.cloud_request_timeout_ms = timeout_ms
	args.cloud_request_flag = flag
	
	local ret = nil                                                
	if _ubus then                                                  
		ret = _ubus:call(UBUS_OBJECT, "send_request_sync", args)
	end
	
	if ret == nil then
		return -1000
	end
	
	dbg.print("re:", ret.re)
	if ret.re == 0 then                     
		dbg.print(ret.response)             
	end	
	
	return ret.re, json.decode(ret.response)
end

function send_request_async(req, timeout_ms, flag)
	local args = {}
	
	args.cloud_request_string = req
	args.cloud_request_timeout_ms = timeout_ms
	args.cloud_request_flag = flag
	
	local ret = nil
	if _ubus then
		ret = _ubus:call(UBUS_OBJECT, "send_request_async", args)
	end

	if ret == nil then
		return -1000
	end
	
	return ret
end

function cloud_notify(event)
	local args = {}

	args.cloud_notify_event	= event
	local ret = _ubus:call(UBUS_OBJECT, "notify", args)
	return true
end

function get_link_status()    
	local ret = _ubus:call(UBUS_OBJECT, "get_link_status", {})
	
	if ret == nil then
		return -1000
	end	
	
	return ret.re
end

function TrimStr(str)
    str = str or ""
	
	if str ~= "" then
		local tmpstr = string.gsub(str, "-", "") or ""
		str = string.match(tmpstr, "%w+") or ""
		str = string.upper(str) or ""
	end
	
    return str
end

function get_device_model_ver()
    local sys = require("luci.sys")
    local uci_r = require("luci.model.uci").cursor()
    local with_sid_ver = uci_r:get_profile("cloud", "device_model_with_sid_ver") or "no"

    local device_model = string.gsub(sys.exec("getfirm MODEL"), "%c", "")
    local hard_ver = string.gsub(sys.exec("getfirm HARDVERSION"), "%c", "")
    
    local device_info = {}
    device_info.device_model = device_model
    device_info.hard_ver = hard_ver
    
    if with_sid_ver == "yes" then
        local special_id = (sys.exec("getfirm SPECIAL_ID")):trim()
        local sid_ver = SPECIAL_ID_TBL[special_id]
        if sid_ver then
            device_info.device_model = "%s(%s)" % {device_model, sid_ver}    
        end
        device_info.hard_ver = string.match(hard_ver, "%w+.%w+")
    end

    return device_info
end

function downloadurl_escape(w)
    pattern = "[%`%#%$%;]"
    s = string.gsub(w, pattern, function(c)
        local t = string.format("%%%02X", string.byte(c))
        return t
    end)
    return s
end