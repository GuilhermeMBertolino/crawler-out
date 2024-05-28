local dbg = require "luci.tools.debug"
local sys = require "luci.sys"
local cloudError = require "cloud.cloud_error"
local ERR_CODE = cloudError.ERR_CODE
local ERR_MSG = cloudError.ERR_MSG
local uci = require "luci.model.uci"
local uci_r = uci.cursor()

local function newFirmware(msg)
    local ret = {}
    local data = msg.params.data or {}
    local msgId = data.msgId
    local data_time = data.time
    local content = data.content
    local fwNotifyType = data.fwNotifyType
	local auto_update_support = uci_r:get_profile("firmware_upgrade", "auto_update_support") or "no"
    -- parameter check
    if msgId == nil or data_time == nil or content == nil then -- Todo: check fwNotifyType this place?
        dbg.print("Can not find msgId/time/content.")
        ret[ERR_CODE] = cloudError.ERROR_MSG.ERROR_PARAMETER_INVALID[1]
        ret[ERR_MSG] = cloudError.ERROR_MSG.ERROR_PARAMETER_INVALID[2]
    else
        if fwNotifyType ~= nil then
            dbg.print("firmware, fwNotifyType:"..fwNotifyType..", time:"..data_time..", content:"..content..", msgId:"..msgId)
        else
            dbg.print("firmware, time:"..data_time..", content:"..content..", msgId:"..msgId)
        end
        ret[ERR_CODE] = cloudError.ERROR_MSG.ERROR_NONE[1]
		if auto_update_support == "yes" then
			uci_r:set("auto_upgrade", "upgrade", "cloud_push", "1")
			uci_r:commit("auto_upgrade")
		end
        sys.fork_exec("cloud_getFwList") --get new firmware info from cloud.
    end
    return ret
end

local function newSignature(msg)
	local ret = {}
    local data = msg.params.data or {}
    local msgId = data.msgId
    local data_time = data.time     
		
    -- parameter check
    if msgId == nil or data_time == nil then 
        dbg.print("Can not find msgId/time.")
        ret[ERR_CODE] = cloudError.ERROR_MSG.ERROR_PARAMETER_INVALID[1]
        ret[ERR_MSG] = cloudError.ERROR_MSG.ERROR_PARAMETER_INVALID[2]
    else		
        dbg.print("newSignature, time:" .. data_time .. ", msgId:" .. msgId)
        ret[ERR_CODE] = cloudError.ERROR_MSG.ERROR_NONE[1]
        sys.fork_exec("cloud_updateTmSig") --get tm signature from cloud and update.
    end
	return ret
end

local function newDstRule(msg)
	local ret = {}
	local data = msg.params.data or {}
	local msgId = data.msgId
	local data_time = data.time

	-- parameter check
	if msgId == nil or data_time == nil then
		dbg.print("Can not find msgId/time.")
		ret[ERR_CODE] = cloudError.ERROR_MSG.ERROR_PARAMETER_INVALID[1]
		ret[ERR_MSG] = cloudError.ERROR_MSG.ERROR_PARAMETER_INVALID[2]
	else
		dbg.print("newDstRule, time:" .. data_time .. ", msgId:" .. msgId)
		ret[ERR_CODE] = cloudError.ERROR_MSG.ERROR_NONE[1]
		sys.fork_exec("cloud_updateDst") --get dst rule from cloud and update.
	end
	return ret
end

local dispatch_tbl = {
    ["newFirmware"] = newFirmware,
    ["newSignature"] = newSignature,
	["newDstRule"] = newDstRule
}

function run(data)
    local ret = {}
    -- data param check first
    if data == nil or data.params == nil or data.params.data == nil or data.params.data.msgType == nil then
        dbg.print("data/params/params.data/params.data.msgType can not be nil")
        ret[ERR_CODE] = cloudError.ERROR_MSG.ERROR_PARAMETER_INVALID[1]
        ret[ERR_MSG] = cloudError.ERROR_MSG.ERROR_PARAMETER_INVALID[2]
        return ret
    end

    local dispatch_func = dispatch_tbl[data.params.data.msgType]
    if dispatch_func ~= nil and type(dispatch_func) == "function" then
        ret = dispatch_func(data)
    else
        dbg.print("Do not support push msgType:"..data.params.data.msgType)
        return nil
    end
    return ret
end
