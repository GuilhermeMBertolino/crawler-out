local dbg = require "luci.tools.debug"
local sys = require "luci.sys"
local cloudError = require "cloud.cloud_error"
local ERR_CODE = cloudError.ERR_CODE
local ERR_MSG = cloudError.ERR_MSG

local function newFirmware(msg)
    local ret = {}
    local data = msg.params.data or {}
    local msgId = data.msgId
    local data_time = data.time
    local content = data.content
    local fwNotifyType = data.fwNotifyType

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
        sys.fork_exec("cloud_getFwList") --get new firmware info from cloud.
    end
    return ret
end

local dispatch_tbl = {
    ["newFirmware"] = newFirmware
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
