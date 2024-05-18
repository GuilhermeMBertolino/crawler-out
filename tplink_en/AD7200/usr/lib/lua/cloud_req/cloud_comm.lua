-- Lua can call cloud API via ubus.
module("cloud_req.cloud_comm", package.seeall)

local json  = require "luci.json"
local dbg   = require "luci.tools.debug"
local ubus  = require "ubus"
local _ubus = ubus.connect()

local UBUS_OBJECT = "cloud_client"

function send_request_sync(req, timeout_ms, flag)
	local args = {}
	
	dbg.print("req:",json.encode(req))
	args.cloud_request_string = json.encode(req)
	args.cloud_request_timeout_ms = timeout_ms
	args.cloud_request_flag = flag
	
	local ret = _ubus:call(UBUS_OBJECT, "send_request_sync", args)
	
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
	
	local ret = _ubus:call(UBUS_OBJECT, "send_request_async", args)

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

function TrimStr(str)
    local tmpstr = str
    tmpstr = string.gsub(tmpstr, "-", "")
    str = string.match(tmpstr, "%w+")
    str = str:upper()
    return str
end

function downloadurl_escape(w)
    pattern = "[%`%#%$%;]"
    s = string.gsub(w, pattern, function(c)
        local t = string.format("%%%02X", string.byte(c))
        return t
    end)
    return s
end