local dbg = require "luci.tools.debug"
local sys = require "luci.sys"
local cloudError = require "cloud.cloud_error"
local uci = require "luci.model.uci"
local uci_r = uci.cursor()
local ERR_CODE = cloudError.ERR_CODE
local ERR_MSG = cloudError.ERR_MSG
local json = require "luci.json"
local nixio = require "nixio"
local dbg = require "luci.tools.debug"
local socket = require "socket"

function pfcall(data)
    local ubus = require "ubus"
    local _ubus = ubus.connect()
    local UBUS_OBJECT = "PFClient"
	local returnData
	--dbg.print("prepare transfer")
	
	--dbg.print("passthrough req:" .. json.encode(data.params.requestData))
	
	-- The third-party apps	
	local alexa_support = uci_r:get_profile("alexa", "alexa_support") or "no"
	local ifttt_support = uci_r:get_profile("ifttt", "ifttt_support") or "no"
	local smart_home_support = uci_r:get_profile("smart_home", "support") or "no"

	if alexa_support == "yes" or ifttt_support == "yes" or smart_home_support == "yes" then
		local AppsError = require "cloud.tp_apps.tp_app_error"

		-- support alexa and ifttt below.
		if data.params.requestData.type then
			if alexa_support == "yes" and data.params.requestData.type == "ALEXA" then
				local alexa = require "cloud.tp_apps.alexa"
				returnData = alexa.run(data.params.requestData)
			elseif ifttt_support == "yes" and data.params.requestData.type == "IFTTT" then
				local ifttt = require "cloud.tp_apps.ifttt"
				returnData = ifttt.run(data.params.requestData)
			elseif smart_home_support == "yes" and data.params.requestData.type == "SOHO_SMART_HOME" then
				local smart_home = require "cloud.smart_home.smart_home"
				returnData = smart_home.run(data.params.requestData)
			-- else
			-- 	returnData = {["error_code"] = AppsError.ERROR_MSG.ERROR_UNSUPPORTED_TYPE[1]}
			end
			if returnData ~= nil then
				return {["result"]={["responseData"]=returnData},["error_code"]=0}
			end
		end	
	end
	-- support alexa and ifttt above.
	
	if data.params.requestData.sn then
		data.params.requestData.sn = tostring(data.params.requestData.sn)
	end
	
    returnData = _ubus:call(UBUS_OBJECT, "passthrough", data.params.requestData)
	if data.params.requestData.sn then
		data.params.requestData.sn = tonumber(data.params.requestData.sn)
	end
	
	--[[
	if data then
		dbg.print("return Data:")
		dbg.print(json.encode(returnData))
	else
		dbg.print("error")
	end
	]]--
	
	return {["result"]={["responseData"]=returnData},["error_code"]=0}
end

function run(data)
    local ret = {}
    -- data param check first
    if data == nil or data.params == nil or data.params.requestData == nil then
        dbg.print("passthrough data/params/params.requestData can not be nil")
        ret[ERR_CODE] = cloudError.ERROR_MSG.ERROR_PARAMETER_INVALID[1]
        ret[ERR_MSG] = cloudError.ERROR_MSG.ERROR_PARAMETER_INVALID[2]
        return ret
    end
    
    --local startTime = socket.gettime()
    --dbg.print("[CFH_time] start_time:" .. json.encode(startTime) .. "req_data:" .. json.encode(data.params.requestData))
    
    tbl = pfcall(data)
    
    --[[
    local endTime = socket.gettime()
    dbg.print("[CFH_time] end_time:" .. json.encode(endTime) .. "res_data:" .. json.encode(tbl))
    local consume_time = endTime - startTime
    dbg.print("######[CFH_time][consume_time]:" .. json.encode(consume_time))
    --dbg.print("passthrough res:" .. json.encode(tbl))
    ]]--
    
    return tbl
end
