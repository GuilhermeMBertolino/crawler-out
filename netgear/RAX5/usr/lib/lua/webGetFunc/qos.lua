-- Get functions for attached devices
local M = {}

local uci  = require "luci.model.uci".cursor()
local log = require("luci.log") -- for debug
local json = require "luci.json"
local sys  = require "luci.sys"

log.debug(0)

-------------------------------------------------------------------------------
function M.getDownSpeedForAttachedDev()
    --local dlSpeed = number_format((float)db_get("Device.X_PEGATRON_COM_IQOS.DownloadSpeed")/1000, 2, '.', '');
    local dlspeed = "100";
    return dlSpeed;
end

function M.getUpSpeedForAttachedDev()
    --local ulSpeed = number_format((float)db_get("Device.X_PEGATRON_COM_IQOS.UploadSpeed")/1000, 2, '.', '');
    local ulSpeed = "100";
    return ulSpeed;
end

-- Functions for Qos
function M.getQosState()
    local enabled = uci:get("qos", "wan", "enabled")
    return enabled
end

function M.getQoS_SpeedTestMethod()
    local method = uci:get("qos", "wan", "method")
    return method
end

function M.downSpeed()
    local down = uci:get("qos", "wan", "download")
    return down
end

function M.upSpeed()
    local up = uci:get("qos", "wan", "upload")
    return up
end

function M.manual_downSpeed()
    local down = uci:get("qos", "wan", "manual_download")
    return down
end

function M.manual_upSpeed()
    local up = uci:get("qos", "wan", "manual_upload")
    return up
end

function M.getApModeInternetStatus()
    local ifstatus_wan = sys.exec("ifstatus wan 2>/dev/null")
    local wan_status = json.decode(ifstatus_wan)
    local status = "down"

    if (wan_status ~= nil and wan_status["up"] == true) then
        status = "up"
    end
    return status
end

function M.speedtest_time()
    local tm = os.date("%a %b %d %X %Y")
    return tm
end

return M
