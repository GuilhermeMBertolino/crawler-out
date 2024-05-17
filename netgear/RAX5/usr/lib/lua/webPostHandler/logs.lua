local M = {}

local uci    = require "uci".cursor()
local sys    = require "luci.sys"
local log    = require "luci.log"
local validator = require "commonFunc.validator"

local logs_maps = {
    buttonHit           = { data_type = "boolean",      handler = nil },
    internet            = { data_type = "boolean",      handler = nil },
    readyShareMobile    = { data_type = "boolean",      handler = nil },
    allowedSite         = { data_type = "boolean",      handler = nil },
    blockedSite         = { data_type = "boolean",      handler = nil },
    webAccess           = { data_type = "boolean",      handler = nil },
    routerOp            = { data_type = "boolean",      handler = nil },
    knownAttack         = { data_type = "boolean",      handler = nil },
    portForwarding      = { data_type = "boolean",      handler = nil },
    wlan                = { data_type = "boolean",      handler = nil },
    wlanSchedule        = { data_type = "boolean",      handler = nil },
    readyShare          = { data_type = "boolean",      handler = nil },
    vpn                 = { data_type = "boolean",      handler = nil }
}

function M.logs_handler(json)

    function convertBoolToInt(s)
        if s == "true" then
            return 1
        else
            return 0
        end
    end

    if (validator.post_data_validate(json, logs_maps) == false) then
        return {status="error", message=tostring(json) }
    end

    local action = json.buttonValue
    local isEmailEnable = 0
    local email_addr1 = ""
    local email_server = ""
    local email_port = ""

    if action == "apply" then

        uci:set("logs", "@logs[0]", "allowedSite", convertBoolToInt(json.allowedSite))
        uci:set("logs", "@logs[0]", "blockedSite", convertBoolToInt(json.blockedSite))
        uci:set("logs", "@logs[0]", "webAccess", convertBoolToInt(json.webAccess))
        uci:set("logs", "@logs[0]", "routerOp", convertBoolToInt(json.routerOp))
        uci:set("logs", "@logs[0]", "knownAttack", convertBoolToInt(json.knownAttack))
        uci:set("logs", "@logs[0]", "portForwarding", convertBoolToInt(json.portForwarding))
        uci:set("logs", "@logs[0]", "wlan", convertBoolToInt(json.wlan))
        uci:set("logs", "@logs[0]", "wlanSchedule", convertBoolToInt(json.wlanSchedule))
        uci:set("logs", "@logs[0]", "readyShare", convertBoolToInt(json.readyShare))
        uci:set("logs", "@logs[0]", "vpn", convertBoolToInt(json.vpn))
        uci:commit("logs")
        table.insert(changed_config, "logs")
    elseif action == "refresh" then
        -- DoNothing front-end will reload page
    elseif action == "clear" then
        -- clean logread logs, log restart behind log clean for counting correctly
        sys.call("echo '' > /var/log/log")
        sys.call("/etc/init.d/log restart")
        sys.call("logger -t [RouterOp] [Log Cleared]")
    elseif action == "send" then
        -- Send E-mail (Address set by E-mail page)
        isEmailEnable = tonumber(uci:get("email", "@email[0]", "email_enable") or "0")
        if isEmailEnable == 1 then
            email_addr1 = uci:get("email", "@email[0]", "email_addr1")
            email_server = uci:get("email", "@email[0]", "email_server")
            email_port = uci:get("email", "@email[0]", "email_port")
            if email_addr1 ~= nil and email_server ~= nil and email_port ~= nil then
                sys.exec("/usr/sbin/email_log.sh gui_log_action")
                return {status="success", message="send log"}
            end
        end
        return {status="failed", message="send log"}
    end

    return {status="success", message="Done"}
end

return M
