local dbg = require "luci.tools.debug"
local sys = require "luci.sys"
local cloudError = require "cloud.cloud_error"
local uci = require "luci.model.uci"
local uci_r = uci.cursor()
local ERR_CODE = cloudError.ERR_CODE
local ERR_MSG = cloudError.ERR_MSG
local json = require "luci.json"

function pfcall(data)
    local ubus = require "ubus"
    local _ubus = ubus.connect()
    local UBUS_OBJECT = "PFClient"
	local returnData
	--dbg.print("prepare transfer")
	
	
		dbg.print(json.encode(data.params.requestData))
	
	if data.params.requestData.sn then
		data.params.requestData.sn = tostring(data.params.requestData.sn)
	end
	
    returnData = _ubus:call(UBUS_OBJECT, "passthrough", data.params.requestData)
	if data.params.requestData.sn then
		data.params.requestData.sn = tonumber(data.params.requestData.sn)
	end
	if data then
		dbg.print("return Data:")
		dbg.print(json.encode(returnData))
	else
		dbg.print("error")
	end
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

    tbl = pfcall(data)

    return tbl
end
