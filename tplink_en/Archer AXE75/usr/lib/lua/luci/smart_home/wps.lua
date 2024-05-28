#! /usr/bin/env lua
--
-- wps.lua
--

module("luci.smart_home.wps", package.seeall)

local ctl_wps =  require "luci.controller.admin.wireless"
local uci   = require "luci.model.uci"
local sys = require "luci.sys"
local dbg = require "luci.tools.debug"
local json = require "luci.json"
local _M = {}

form_connect = {
	option = "connect",
	smart_home_cause = true
}

form_get_status = {
	option = ""
}

form_get_switch = {
	form = "syspara_wps",
	operation = "read"
}

form_pbc = {
	option = "pbc"
}

function _M.version(mode)
    --if not wps_enabled(mode) then
    --    return nil
    --end
    return "1.0"
end

function _M.wps_advance_status_check()
	local result = {}
	--check whether wps is available or not
	local res = ctl_wps.wireless_wps_connect(form_get_status)
	if res.available == false then
		res = ctl_wps.wireless_predefined_forms(form_get_switch)
		if res.wps == "off" then
			--err_code = AppsError.ERROR_MSG.ERROR_WPS_NOT_WORK_WHEN_SWITCH_OFF[1]
			result.error_code = -1114
			return result
		else
			--err_code = AppsError.ERROR_MSG.ERROR_WPS_NOT_WORK_WHEN_WLS_OFF[1]
			result.error_code = -1111
			return result
		end
	end
end

local function wps_report()
	local uci_r = uci.cursor()
    local smart_home_support = uci_r:get_profile("smart_home", "support") or "no"
    if smart_home_support and smart_home_support == "yes" then
        local smart_home_upload = require "cloud.smart_home.smart_home_upload"
        local cause = smart_home_upload.VOICE
        smart_home_upload.upload_property_change("wps", cause)
    end
end

local function query_wps()
	local result = {}
	result.enabled = true
	result.activated = false
	--check whether wps is available or not
	local res = ctl_wps.smart_home_query_wps(form_get_status)
	if res.available == false then
	-- wps switch is "off"
		res = ctl_wps.wireless_predefined_forms(form_get_switch)
		if res.wps == "off" then
			result.enabled = false
			result.activated = false
		end
	else
	-- wps switch is "on"
		res = ctl_wps.smart_home_query_wps(form_pbc)
		--dbg.printf("[query_wps] res.wps_status: 	    	" .. json.encode(res.wps_status))
		if res.wps_status == "ok" then
			result.activated = true
		end
	end
	
	local res = {}
	res.error_code = 0
	res.result = result
	return res
end

local function execute_wps(data)
	--dbg.printf("[dispatch]data: 	" .. json.encode(data))
	local result = {}
	if not data then
		result.error_code = -1100
		return result
	end
	local enable = data.enabled
	--check whether wps is available or not
	local res = ctl_wps.wireless_wps_connect(form_get_status)
	if res.available == false then
		res = ctl_wps.wireless_predefined_forms(form_get_switch)
		if res.wps == "off" then
			--err_code = AppsError.ERROR_MSG.ERROR_WPS_NOT_WORK_WHEN_SWITCH_OFF[1]
			result.error_code = -1114
			return result
		else
			--err_code = AppsError.ERROR_MSG.ERROR_WPS_NOT_WORK_WHEN_WLS_OFF[1]
			result.error_code = -1111
			return result
		end
	else
		--check whether wps is running
		res = ctl_wps.wireless_wps_connect(form_pbc)
		--dbg.printf("[execute_wps] res.wps_status: 	    	" .. json.encode(res.wps_status))
		if res.wps_status == "na" or res.wps_status == "timeout" 
			or res.wps_status == "success" or res.wps_status == "failed" then
			--run wps connect in the background, it will takes too much time
			if nixio.fork() == 0 then
				ctl_wps.wireless_wps_connect(form_connect)
				os.exit(0)
				result.error_code = 0
			else
				dbg.printf("OK!")
			end
		elseif res.wps_status == "ok" then
			--err_code = AppsError.ERROR_MSG.ERROR_CFG_HAVE_BEEN_SET[1]
			result.error_code = 1
			return result
		else
			result.error_code = -1101
			return result
		end
	end	 
	wps_report()
	result.error_code = 0
	return result
end




local dispatch_tbl = {
    ["query"] = {
        cb = query_wps
    },
    ["execute"] = {
        cb = execute_wps,
    },
}

function _M.dispatch(form)
    --dbg.printf("[dispatch]form: 	" .. json.encode(form))
	local result = {}
	if not form then
		result.error_code = -1101
		return result
	end
	if form.method then
		local fn = dispatch_tbl[form.method]
		result = fn.cb(form.params)
	else
		result.error_code = -1101
	end
	--dbg.printf("[wps.lua dispatch]result: 	" .. json.encode(result))
	return result
end

return _M

