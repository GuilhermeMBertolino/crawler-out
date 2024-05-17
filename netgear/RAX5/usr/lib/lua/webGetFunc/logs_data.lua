-- Get functions for log info
local os = require "os"
local log    = require "luci.log"
local sys    = require "luci.sys"

local M = {}

local uci = require "uci".cursor()

function convertIntToBool(s)

    local ret = "false"

    if s == "1" then
        ret = "true"
    else
        ret = "false"
    end

    return ret

end

function getCurrentTime()

    local handle = io.popen("date +%c", "r")
    local data = handle:read("*a")
    handle:close()
    return data

end

function M.createLogData()

    -- os.execute("mkdir -p /www/files")
    -- os.execute("logread > /www/files/system.log")

end

function getCheckboxVal_allowedSite()

    local ret = uci:get("logs", "@logs[0]", "allowedSite") or "1"
    return convertIntToBool(ret)

end

function getCheckboxVal_blockedSite()

    local ret = uci:get("logs", "@logs[0]", "blockedSite") or "1"
    return convertIntToBool(ret)

end

function getCheckboxVal_webAccess()

    local ret = uci:get("logs", "@logs[0]", "webAccess") or "1"
    return convertIntToBool(ret)

end

function getCheckboxVal_routerOp()

    local ret = uci:get("logs", "@logs[0]", "routerOp") or "1"
    return convertIntToBool(ret)

end

function getCheckboxVal_knownAttack()

    local ret = uci:get("logs", "@logs[0]", "knownAttack") or "1"
    return convertIntToBool(ret)

end

function getCheckboxVal_portForwarding()

    local ret = uci:get("logs", "@logs[0]", "portForwarding") or "1"
    return convertIntToBool(ret)

end

function getCheckboxVal_wlan()

    local ret = uci:get("logs", "@logs[0]", "wlan") or "1"
    return convertIntToBool(ret)

end

function getCheckboxVal_wlanSchedule()

    local ret = uci:get("logs", "@logs[0]", "wlanSchedule") or "1"
    return convertIntToBool(ret)

end

function getCheckboxVal_readyShare()

    local ret = uci:get("logs", "@logs[0]", "readyShare") or "1"
    return convertIntToBool(ret)

end

function getCheckboxVal_vpn()

    local ret = uci:get("logs", "@logs[0]", "vpn") or "1"
    return convertIntToBool(ret)

end

function file_exists(file)
  local f = io.open(file, "rb")
  if f then f:close() end
  return f ~= nil
end

-- get all lines from a file, returns an empty
-- list/table if the file does not exist
function lines_from(file)
  if not file_exists(file) then return {} end
  local lines = {}
  for line in io.lines(file) do
    lines[#lines + 1] = line
  end
  return lines
end

M["currentTime"] = getCurrentTime()

M["allowedSite"]    = getCheckboxVal_allowedSite()
M["blockedSite"]    = getCheckboxVal_blockedSite()
M["webAccess"]      = getCheckboxVal_webAccess()
M["routerOp"]       = getCheckboxVal_routerOp()
M["knownAttack"]    = getCheckboxVal_knownAttack()
M["portForwarding"] = getCheckboxVal_portForwarding()
M["wlan"]           = getCheckboxVal_wlan()
M["wlanSchedule"]   = getCheckboxVal_wlanSchedule()
M["readyShare"]     = getCheckboxVal_readyShare()
M["vpn"]            = getCheckboxVal_vpn()

ntgrTagMapToGui = {
    site_allowed = "allowedSite",
    site_blocked = "blockedSite",
    Webaccess = "webAccess",
    RouterOp = "routerOp",
    attack = "knownAttack",
    PortFw_Tr = "portForwarding",
    Wlan = "wlan",
    wlanSchedule = "wlanSchedule",
    readyShare = "readyShare",
    VPN = "vpn"
}

local GUI_LOG_FILE = "/var/log/system.log"
local CUST_LOG_FILE = "/var/log/cust_system.log"
local rawLog = "/var/log/log"
local logPath = GUI_LOG_FILE
local tag, context, logTag = "", "", ""
local MUST_SHOW = "MustDisplay"
local isGUIAction = "false"

if #arg == 1 and arg[0] == "/usr/bin/cgilua.cgi" then
    isGUIAction = "true"
    logPath = GUI_LOG_FILE
else
    isGUIAction = "false"
    logPath = CUST_LOG_FILE
end

local lines = lines_from(rawLog)
local logsFile = io.open(logPath, "w")
io.output(logsFile)

for k,v in pairs(lines) do
        logTag = v:match("^%[(%S+)%]")
        if logTag == MUST_SHOW then
            tag, context = v:match("^%[(%S+)%](.*)")
        end
        if isGUIAction == "true" then
            if M[ntgrTagMapToGui[logTag]] == "true" then
                tag, context = v:match("^%[(%S+)%](.*)")
            end
        else
            for kk = 1, #arg do
                if logTag == arg[kk] then
                    tag, context = v:match("^%[(%S+)%](.*)")
                end
            end
        end
        io.write(context.."\n")
end

io.close(logsFile)

return M
