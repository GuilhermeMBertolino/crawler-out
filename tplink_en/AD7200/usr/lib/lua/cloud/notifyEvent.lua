local dbg = require "luci.tools.debug"
local sys = require "luci.sys"
local cloudError = require "cloud.cloud_error"
local uci = require "luci.model.uci"
local uci_r = uci.cursor()
local ERR_CODE = cloudError.ERR_CODE
local ERR_MSG = cloudError.ERR_MSG
local fs  = require "luci.fs"

local function newFirmware(data)
    local ret = {}
    local attr = data.params.attribute or {}
    local fwUpdateType = attr.fwUpdateType
    local displayType = attr.displayType
    local retainedMsgBar = attr.retainedMessageBar
    local content = attr.content
    local msgId = attr.msgId

    -- parameter check
    if fwUpdateType == nil or displayType == nil or retainedMsgBar == nil or content == nil or msgId == nil then
        dbg.print("Can not find fwUpdateType/displayType/retainedMsgBar/content/msgId.")
        ret[ERR_CODE] = cloudError.ERROR_MSG.ERROR_PARAMETER_INVALID[1]
        ret[ERR_MSG] = cloudError.ERROR_MSG.ERROR_PARAMETER_INVALID[2]
    else
        dbg.print("firmware, update type:"..fwUpdateType..", display type:"..displayType..", retain msg bar:"..retainedMsgBar..", content:"..content)
        ret[ERR_CODE] = cloudError.ERROR_MSG.ERROR_NONE[1]
        sys.fork_exec("cloud_getFwList") --get new firmware info from cloud.
    end
    return ret
end

local function legalDevice(data)
    local ret = {}
    dbg.print("notifyEvent:legalDevice")
    --uci_r:set("cloud_config", "device_legality", "illegal", "0")
    --uci_r:commit("cloud_config")

    local CLOUD_TMP_DIR = "/tmp/cloud"
    local CLOUD_ILLEGAL = CLOUD_TMP_DIR .. "/illegal"
    fs.unlink(CLOUD_ILLEGAL)

    ret[ERR_CODE] = cloudError.ERROR_MSG.ERROR_NONE[1]
    return ret
end

local function illegalDevice(data)
    local ret = {}
    if data.params.attribute == nil or data.params.attribute.illegalType == nil then
        dbg.print("illegalType can not be nil")
        ret[ERR_CODE] = cloudError.ERROR_MSG.ERROR_PARAMETER_INVALID[1]
        ret[ERR_MSG] = cloudError.ERROR_MSG.ERROR_PARAMETER_INVALID[2]
    else
        local illegalType = data.params.attribute.illegalType
		
        local CLOUD_TMP_DIR = "/tmp/cloud"
        if not fs.isdirectory(CLOUD_TMP_DIR) then
            fs.mkdir(CLOUD_TMP_DIR, true)
        end

        local CLOUD_ILLEGAL = CLOUD_TMP_DIR .. "/illegal"

        if illegalType > 0 then
            local fp = io.open(CLOUD_ILLEGAL,"w")
            if fp then
                fp:write(tostring(illegalType))
                fp:close()
                ret[ERR_CODE] = cloudError.ERROR_MSG.ERROR_NONE[1]
                ret[ERR_MSG] = cloudError.ERROR_MSG.ERROR_NONE[2]
            else
                ret[ERR_CODE] = cloudError.ERROR_MSG.ERROR_FILE_OP[1]
                ret[ERR_MSG] = cloudError.ERROR_MSG.ERROR_FILE_OP[2]
            end
            --uci_r:set("cloud_config", "device_legality", "illegal", "1")
            --uci_r:set("cloud_config", "device_legality", "illegal_type", tostring(illegalType))
        elseif illegalType == 0 then
            fs.unlink(CLOUD_ILLEGAL)
            ret[ERR_CODE] = cloudError.ERROR_MSG.ERROR_NONE[1]
            ret[ERR_MSG] = cloudError.ERROR_MSG.ERROR_NONE[2]
            --uci_r:set("cloud_config", "device_legality", "illegal", "0")
        end
        --uci_r:commit("cloud_config")

        if illegalType == 1 then
            dbg.print("Device ID doesn't exist.")
        elseif illegalType == 2 then
            dbg.print("Device ID, mac and hwId doesn't match.")
        elseif illegalType == 3 then
            dbg.print("Get device basic information failed.")
        elseif illegalType == 4 then
            dbg.print("Device with ths same ID is already online.")
        elseif illegalType >= 5 then
            dbg.print("Unsupported illegal type:"..illegalType)
        end

        --ret[ERR_CODE] = cloudError.ERROR_MSG.ERROR_NONE[1]
    end
    return ret
end

local function stopConnect(data)
    local ret = {}
    if data.params.attribute == nil or data.params.attribute.reconnectTime == nil or data.params.attribute.reason == nil then
        dbg.print("reconnectTime/reason can not be nil")
        ret[ERR_CODE] = cloudError.ERROR_MSG.ERROR_PARAMETER_INVALID[1]
        ret[ERR_MSG] = cloudError.ERROR_MSG.ERROR_PARAMETER_INVALID[2]
    else
        local reconnectTime = data.params.attribute.reconnectTime
        local reason = data.params.attribute.reason
        dbg.print("reconnectTime:"..reconnectTime)
        dbg.print("reason:"..reason)
        ret[ERR_CODE] = cloudError.ERROR_MSG.ERROR_NONE[1]
    end
    return ret
end

local function heartBeatInterval(data)
    local ret = {}
    if data.params.attribute == nil or data.params.attribute.interval == nil then
        dbg.print("interval can not be nil")
        ret[ERR_CODE] = cloudError.ERROR_MSG.ERROR_PARAMETER_INVALID[1]
        ret[ERR_MSG] = cloudError.ERROR_MSG.ERROR_PARAMETER_INVALID[2]
    else
        local interval = data.params.attribute.interval
        dbg.print("interval:"..interval)
        ret[ERR_CODE] = cloudError.ERROR_MSG.ERROR_NONE[1]
    end
    return ret
end

local dispatch_tbl = {
    ["newFirmware"] = newFirmware,
    ["legalDevice"] = legalDevice,
    ["illegalDevice"] = illegalDevice,
    ["stopConnect"] = stopConnect,
    ["heartBeatInterval"] = heartBeatInterval
}

function run(data)
    local ret = {}
    -- data param check first
    if data == nil or data.params == nil or data.params.event == nil then
        dbg.print("notifyEvent data/params/params.event can not be nil")
        ret[ERR_CODE] = cloudError.ERROR_MSG.ERROR_PARAMETER_INVALID[1]
        ret[ERR_MSG] = cloudError.ERROR_MSG.ERROR_PARAMETER_INVALID[2]
        return ret
    end

    local dispatch_func = dispatch_tbl[data.params.event]
    if dispatch_func ~= nil and type(dispatch_func) == "function" then
        ret = dispatch_func(data)
    else
        dbg.print("Do not support notifyEvent event:"..data.params.event)
        return nil
    end

    return ret
end
