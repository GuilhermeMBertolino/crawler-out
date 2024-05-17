-- Get functions for NTP Settings
local M = {}

local uci  = require "luci.model.uci".cursor()

require "commonFunc.ntpCommon"

function M.getTimezone()
    local timezone = uci:get("system", "@system[0]", "timezone")
    return nil ~= timezone and timezone or "GMT"
end

function M.getTimezoneName()
    local name = uci:get("system", "@system[0]", "timezone_name")
    return nil ~= name and name or "GMT"
end

function M.getPreferredServer()
    local addr = uci:get("system", "ntp", "preferred_ntp_server")
    return nil ~= addr and addr or ""
end

function M.getNtpStatus()

    local NtpSyncFlag = io.open("/tmp/ntp_sync", "r")
    local xCloudSyncFlag = io.open("/tmp/xCloud_syncTime", "r")
    local isNtpSync = false
    local isxCloudSync = false
    local isPreferred = uci:get("system", "ntp", "preferred_ntp_server_enable") or "0"

    if (nil ~= NtpSyncFlag) then
        isNtpSync = true
        io.close(NtpSyncFlag)
    end
    if (nil ~= xCloudSyncFlag) then
        if tonumber(isPreferred) == 0 then
            isxCloudSync = true
        end
        io.close(xCloudSyncFlag)
    end

    if isNtpSync == true or isxCloudSync == true then
        return "Synchronized"
    else
        return "Unsynchronized"
    end
end

function M.getPreferredServerEnable()
    local prefer = uci:get("system", "ntp", "preferred_ntp_server_enable")
    return nil ~= prefer and numToBool(prefer) or "false"
end

function M.getNtpEnabled()
    local enabled = uci:get("system", "ntp", "enabled")
    return nil ~= enabled and enabled or "false"
end

function M.getAutoDaylightSaving()
    local autoDaylightSaving = uci:get("system", "ntp", "auto_daylight_saving")
    return nil ~= autoDaylightSaving and numToBool(autoDaylightSaving) or "false"
end

return M
