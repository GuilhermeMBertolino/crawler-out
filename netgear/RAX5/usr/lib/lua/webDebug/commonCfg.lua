local cgilua = require "cgilua"
local os = require"os"
local sys  = require "luci.sys"
local uci = require "luci.model.uci".cursor()
local uci_st = require "luci.model.uci".cursor(nil, "/var/state")
local log = require "luci.log"
local file = require "commonFunc.file"
local json = require "luci.json"
--local lpeg = require "lpeg"
--lpeg.locale(lpeg)

local M = {}
local debugresult = ""
local debuginfo = {}
local debugconf = {}
local config_path = "/etc/debug.conf"
local ini = {}

function ini.load(fileName)
    assert(type(fileName) == 'string', 'Parameter "fileName" must be a string.');
    local file = assert(io.open(fileName, 'r'), 'Error loading file : ' .. fileName);
    local data = {};
--  local section;
    for line in file:lines() do

--      local tempSection = line:match('^%[([^%[%]]+)%]$');
--[[        if(tempSection)then
            section = tonumber(tempSection) and tonumber(tempSection) or tempSection;
            log.console("section=" ,section)
            data[section] = data[section] or {};
        end
    --]]

        local param, value = line:match('^([%w|_]+)%s-=%s-(.+)$');
        if(param and value ~= nil)then
            if(tonumber(value))then
                value = tonumber(value);
            elseif(value == 'true')then
                value = true;
            elseif(value == 'false')then
                value = false;
            end
            if(tonumber(param))then
                param = tonumber(param);
            end
--            log.console("param = ",param,"value = ",value)
            data[param] = value;
        end
    end
    file:close();
    return data;
end


function M.getModelNameStr(notEmbed)
    local modelName = ""
    modelName = uci_st:get("netgear", "board", "model")
    if (modelName == nil) then return "" end

    if notEmbed == nil then
        cgilua.put(modelName)
    else
        return modelName
    end
end

function M.getFirmwareVer(notEmbed)
    local fwVer = ""
    fwVer = uci_st:get("netgear", "fw", "cur_ver")
    if (fwVer == nil) then return "" end

    if notEmbed == nil then
        cgilua.put(fwVer)
    else
        return fwVer
    end
end

function M.getDebugConfigurefile()

    local config_path = "/etc/debug.conf"
    local debug_info_path = "/var/debug_info"
    local debugpageresult_path = "/var/debugresult"

    if (file.file_exists("/usr/sbin/debug_info.sh")) then
        sys.exec("sh /usr/sbin/debug_info.sh")
    end

    if (file.file_exists('/var/debug.conf')) then
        config_path='/var/debug.conf';
    else
        sys.exec("cp /etc/debug.conf /var/debug.conf")
    end

    if (file.file_exists(debugpageresult_path)) then
        local debugresult_handle = io.open(debugpageresult_path,"r");
        debugresult = debugresult_handle:read()
        debugresult_handle:close()
    end

    if (file.file_exists(debug_info_path)) then
        debuginfo = ini.load(debug_info_path)
    end

    if (file.file_exists(config_path)) then
        debugconf = ini.load(config_path)
    end
end

function M.GetPageCfg(element)

    local pageStr = ""

    if (file.file_exists(config_path) == false) then
        return
    end

    if ( element == "debugresult" ) then
        if ( ( debugresult ~= nil ) or ( debugresult ~= "" ) ) then
             pageStr = debugresult;
        end
    end

    if ( element == "flashUsed" ) then
        pageStr = debuginfo["FLASH_USAGE"]
    end

    if (  element == "flashTotal" ) then
        pageStr = debuginfo["FLASH_TOTAL"]
    end

    if ( element == "cpu1Usage" ) then
        pageStr = debuginfo["CPU1_USAGE"]
    end

    if ( element == "cpu2Usage" ) then
        pageStr = debuginfo['CPU2_USAGE']
    end

    if ( element == "cpu3Usage" ) then
        pageStr = debuginfo["CPU3_USAGE"]
    end

    if ( element == "cpu4Usage" ) then
        pageStr = debuginfo["CPU4_USAGE"]
    end

    if ( element == "activatedSessions" ) then
         pageStr = debuginfo["CUR_SESSIONS"]
    end

    if ( element == "totalSessions") then
        pageStr = debuginfo["MAX_SESSIONS"]
    end

    if ( element == "sysUptime" ) then
         pageStr = debuginfo["SYSTEM_UPTIME"]
    end

    if ( ( element == "skuName" ) or ( element == "nmrpRegion" ) ) then
         pageStr = debuginfo["SKU"]
    end

    if ( element == "memUsed" ) then
         pageStr = debuginfo["MEMORY_USAGE"]
    end

    if ( element == "memTotal") then
        pageStr = debuginfo["MEMORY_TOTAL"]
    end

    if ( element == "wlanDriverVersion" ) then
        pageStr = debuginfo["WLAN_DRIVER_VER"]
    end

    if ( element == "Start_When_Boot_Up" ) then
        if ( debugconf["LOG_WHEN_BOOTUP"] == "DISABLE" ) then
            pageStr = "Off"
        else
            pageStr = "On"
        end
    end

    if ( element == "select_systemMemory") then
        if ( debugconf["CAPTURE_STORE_LOCATION"] == "STORE_IN_SYSTEM_MEMORY" ) then
            pageStr = "selected"
        end
    end

    if ( element == "select_USBStorage" ) then
        if ( debugconf["CAPTURE_STORE_LOCATION"] == "STORE_IN_USB_STORAGE") then
            pageStr = "selected"
        end
    end

    if ( element == "capture_in_process" ) then
        if ( debugconf["CAPTURE_STATE"] ~= "DISABLED") then
            pageStr = debugconf["CAPTURE_STATE"]
        end
    end

    if ( element == "dump_LAN_WAN_pkt" ) then
        if ( debugconf["PACKETCAPTURE"] == "DISABLE" ) then
            pageStr = "Off"
        else
            pageStr = "On"
        end
    end

    if ( element == "WAN_port_mirror_to_LAN_port" ) then
        if ( debugconf["WANMIRROR"] == "DISABLE" ) then
            pageStr = "Off"
        else
            pageStr = "On"
        end
    end

    if ( element == "dal_logs" ) then
        if ( debugconf["DAL_LOGS"] == "DISABLE" ) then
            pageStr = "Off"
        else
            pageStr = "On"
        end
    end

    if ( element == "ra_log" ) then
        if ( ( debugconf["RA_LOG"] == "ENABLE") or ( file.file_exists("/etc/rabin/enable_ra_log") ) ) then
            pageStr = "On"
        else
            pageStr = "Off"
        end
    end

    if ( element == "IPv6Ping_External_to_Internal" ) then
        if ( debugconf["ALLOWIPV6PING"] == "DISABLE" ) then
            pageStr = "Off"
        else
            pageStr = "On"
        end
    end

    if ( element == "xagentEn" ) then
        if (  debugconf["XAGENT"] == "DISABLE" ) then
            pageStr = "Off"
        else
            pageStr = "On"
        end
    end
      --[[
      /*if (strcmp($element,"raStageDev") == 0){
         if ($conf['RA_MODE'] == "DEV")
            echo "1";
         else
            echo "0";
      }
      if (strcmp($element,"raStageProd") == 0){
         if ($conf['RA_MODE'] == "PRD")
            echo "1";
         else
            echo "0";
      }
       --]]
    if ( element == "ReadyCloudTestServer" ) then
        if ( debugconf["READYCLOUD_TEST_SERVER"] == "DISABLE" ) then
            pageStr = "Off"
        else
            pegaStr = "On"
        end
    end

    if ( ( element == "raServerIP" ) or ( element == "ServerIP" ) ) then
        pageStr = debugconf["RA_SERVERIP"]
    end
    if ( ( element == "raHTTPServerIP" ) or (element == "HTTPServerIP" ) ) then
        pageStr = debugconf['RA_HTTPSERVERIP']
    end
    if ( (element == "raServerPath") or ( element == "ServerPath") ) then
        pageStr = debugconf['RA_SERVERPATH']
    end
    if ( ( element == "raInitStartTime" ) or ( element == "InitStartTime" ) ) then
         pageStr = debugconf['RA_INITSTARTTIME']
    end

--    log.console("pageStr = ",pageStr)
    if pageStr == "EMPTY" then
        pageStr = ""
    end
    cgilua.put(pageStr)
end

function isRA_Manual()

    local file = io.popen("ra_nvram get RA_isManual | xargs echo -n")
    local isManual = 0

    if file then
        isManual = file:read("*l")
        file:close()

        if isManual == nil then
            isManual=0
        end
    end

    if tonumber(isManual) == 1 then
        return true
    else
        return false
    end
end

function M.getRAStage()
    local file = io.popen("ra_nvram get RA_stage | xargs echo -n")
    local raStage = ""

    if file then
        raStage = file:read("*l")
        file:close()
        --log.console("raStage = ",raStage)
    end
    cgilua.put(raStage)
end

function M.getRADebugPrint()
    local file = io.popen("ra_nvram get RA_debug_print | xargs echo -n")
    local raDebug = ""
    if file then
        raDebug = file:read("*l")
        file:close()
--        log.console("raDebug = ",raDebug)
    end

    if ( raDebug == "1" ) then
        raDebug = "On";
    else
        raDebug = "Off";
    end

    cgilua.put(raDebug)
end

function M.getRAEDefault()
    local file = io.popen("ra_nvram get RA_isManual | xargs echo -n")
    local raeDefault = ""
    if file then
        raeDefault = file:read("*l")
        file:close()
        --log.console("raeDefault = ",raeDefault)
    end

    -- In ra_nvram, RA_isManual=0 mean default
    if ( raeDefault == "0" ) then
        raeDefault = "On";
    else
        raeDefault = "Off";
    end

    cgilua.put(raeDefault)
end

function M.getDebugInterval()
    local file = io.popen("ra_nvram get RA_debug_DailyReportTime | xargs echo -n")
    if file then
        local debugInterval = file:read("*l")
        if debugInterval then
            debugInterval = string.gsub(debugInterval, "%s+", "")
--            log.console ("debug Interval = ",debugInterval)
            if ( debugInterval == "" ) then
                cgilua.put("0")
            else
                cgilua.put(debugInterval)
            end
        else
            cgilua.put( "0")
        end
        file:close()
    else
        cgilua.put( "0")
    end
end

function M.getUpdateInterval()
    local file = io.popen ("cat /etc/rabin/raePolicy.json | grep 'updaterInternal' | cut -d '\"' -f4 | xargs echo -n")
    if file then
        local updaterInternal = file:read("*l")
        if updaterInternal then
            updaterInternal = string.gsub(updaterInternal, "%s+", "")
--            log.console ("debug updater = ",updaterInternal)
            if ( updaterInternal == "" ) then
                cgilua.put("0")
            else
                cgilua.put(updaterInternal)
            end
        else
            cgilua.put("0")
        end
        file:close()
    else
        cgilua.put("0")
    end
end



return M



