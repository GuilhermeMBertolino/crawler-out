local json = require "luci.json"
local ubus = require "ubus"
local log    = require "luci.log"
local M = {}

function ubusCall(path, method, arg)
    log.debug(0)
    -- connect ubus server
    local conn = ubus.connect()
    if not conn then
        log.console("Failed to connect to ubusd!")
        return false
    end

    local data = conn:call(path, method, arg)
    conn:close()

    return data
end

-- Trigger RA installEvents via ubus call
-- Note that eventType is required argument
function M.send(eventTypeV,installStateV,soapAPINameV,soapResponseCodeV)
    log.debug(0)

    if(eventTypeV == nil) then
        log.console("required arguments not found!")
        return false
    end
    local arg_list = {}
    if (eventTypeV ~= nil) then
        arg_list["eventType"] = eventTypeV
    end
    if(installStateV ~= nil) then
        arg_list["installState"] = installStateV
    end
    if(soapAPINameV ~= nil) then
        arg_list["soapAPIName"] = soapAPINameV
    end
    if(soapResponseCodeV ~= nil) then
        arg_list["soapResponseCode"] = soapResponseCodeV
    end

    local rtn = ubusCall("ntgr_ra_iot.installEvent", "send", arg_list)
    log.console(json.encode(rtn))
    if(rtn == nil) then
        log.console("ubus call error!")
        return false
    elseif(rtn["result"] == "success") then
        return true
    else
        log.console("ubus return failure!")
        return false
    end

end

-- Set RA state for installEvents via ubus call
function M.setState(installStateV)
    log.debug(0)

    if(installStateV == nil) then
        log.console("required arguments not found!")
        return false
    end
    local arg_list = {}

    arg_list["installState"] = installStateV
    local rtn = ubusCall("ntgr_ra_iot.installEvent", "setState", arg_list)
    log.console(json.encode(rtn))

    if(rtn["result"] == "success") then
        return true
    else
        log.console("ubus return error!")
        return false
    end

end

-- wifi flags for installEvents
function M.checkWifi(ssid, pwd)
    local exec  = require "luci.util".exec
    local wifi_changed = false
    if (ssid ~= nil) then
        local def_ssid = exec("fw_printenv -c /etc/pdata.config -n SSID | awk -F ' ' '{printf$1}'")
        if (ssid==def_ssid) then
            exec("puDataStr set installEvent wifi_default_ssid true")
        else
            exec("puDataStr set installEvent wifi_default_ssid false")
            wifi_changed = true
        end
    end
    
    if (pwd ~= nil) then
        local def_pwd = exec("fw_printenv -c /etc/pdata.config -n passphrase | awk -F ' ' '{printf$1}'")
        if (pwd==def_pwd) then
            exec("puDataStr set installEvent wifi_default_passphrase true")
        else
            exec("puDataStr set installEvent wifi_default_passphrase false")
            wifi_changed = true
        end
    end
    
    if (wifi_changed == true) then
        --send installEvent - "wifi change"
        M.send("wifi change", "WIFI setting apply")
    else
        M.setState("WIFI setting apply")
        
    end
end

-- Set RA info for installEvents by puDataStr
function M.setPuData(option, value)
    local exec  = require "luci.util".exec
    log.debug(0)
    if(option ~= nil and value ~= nil) then
        exec("puDataStr set installEvent "..option.." '"..value.."'")
    end
end

-- Set RA info of hijackPageSeen for installEvents
function M.set_hijackPageSeen()
    local exec  = require "luci.util".exec
    log.debug(0)
    local res = exec("puDataStr get installEvent hijackPageSeen")
    if(res == nil or res == "") then
        M.setPuData("hijackPageSeen", "yes")
    end
end

-- Send "gui access" of installEvents
-- func_name is used to indicate which function is runnung within inner page
function M.send_guiAccess(func_name)
    local exec  = require "luci.util".exec
    local nixio = require "nixio"
    local host_name = nixio.getenv("SERVER_NAME")
    local path = nixio.getenv("SCRIPT_NAME")
    log.debug(0)
    local url = ""
    if(host_name ~= nil) then
        url = host_name
    end
    if(path ~= nil) then
        url = url..path
    end
    if(func_name) then
        url = url.."("..func_name..")"
    end
    M.setPuData("guiUrl", url)
    M.send("gui access")
end

return M

