
local M = {}

local uci  = require "luci.model.uci".cursor()
local uci_st = require "luci.model.uci".cursor_state()
local log = require("luci.log") -- for debug
local sys = require "luci.sys"

function M.getMlang_ddnsStatus()
    log.debug(0)
    log.console("===DEBUG===::getMlang_ddnsStatus")
    local enableDdns = uci:get("ddns", "myddns_ipv4", "enabled")
    local updateStatus = uci:get("ddns", "myddns_ipv4", "updatestatus")
    local mlang = ""

    if enableDdns == "0" then
        -- Dynamic DNS service is not enabled
        mlang = "ADD006"
        return mlang
    end

    local internetStatus = uci_st:get("network", "inet", "up")
    if internetStatus == '1' then
        local wanInfName = uci_st:get("network", "inet", "ifname")
        local wanIp = sys.exec("ifconfig $wanInfName 2>/dev/null|awk '/inet addr:/ {print $2}'|sed 's/addr://'")
        if wanIp == "" then
            updateStatus = 'NoUpdateAction'
        end
    end

    if updateStatus == 'HostnameUpdateSuccess' then
        --"updated successfully at"
        mlang = "ADD008"
    elseif updateStatus == 'HostNameError' then
        --"Update failed. Host Name is not correct."
        mlang = "ADD010"
    elseif updateStatus == 'AuthenticationFail' then
         --"Authentication failed. User Name/Password is not correct."
        mlang = "ADDE31"
    elseif updateStatus == 'NoUpdateAction' then
        --"No update action. There is no IP address on the Internet port."
        mlang= "ADD007"
    elseif updateStatus ==  'HostnameUpdateFail' then
        --"Update failed. Feature unavailable."
        mlang= "ADDE33"
    elseif updateStatus ==  'ProividerNotReachable' then
        -- "Update failed at <time>, <date>. The service provider is not reachable. Will try again later."
        mlang= "ADDE32"
    elseif updateStatus ==  'BlockedByServer' then
        -- "Update failed. Client blocked by server. Please contact DDNS provider customer service."
        mlang= "ADDE34"
    end

    return mlang;
end

function M.getDdnsHostname()
    log.debug(0)
    log.console("===DEBUG===::getDdnsHostname")
    local hostname = uci:get("ddns", "myddns_ipv4", "lookup_host")
    local serviceName = uci:get("ddns", "myddns_ipv4", "service_name")
    if serviceName == "netgear" then
        hostname = hostname..".mynetgear.com"
    end

    return hostname
end

function M.getDdnsUpdateDatetime()
    log.debug(0)
    log.console("===DEBUG===::getDdnsUpdateDatetime")
    -- check if the file exists
    local f = io.open("/etc/ddns_lastupdate", "r")
    if f == nil then
        return "no time record"
    end
    -- generate <time>, <date> format by command: date -d @1638947420 +'%R %p, %m/%d/%Y'
    -- ex. 07:10 AM, 12/08/2021
    local lastUpdateTime = sys.exec('cat /etc/ddns_lastupdate'):match("^(%d+)")
    local date_cmd = "date -d @"..lastUpdateTime.." +'%R %p, %m/%d/%Y'"
    local lastUpdateTimeStr = sys.exec(date_cmd)

    return lastUpdateTimeStr
end

function M.getDdnsUpdateDatetimeNotReachable()
    log.debug(0)
    log.console("===DEBUG===::getDdnsUpdateDatetimeNotReachable")
    -- check if the file exists
    local f = io.open("/var/run/ddns/ddns_update_notreachable", "r")
    if f == nil then
        return "no time record"
    end
    -- generate <time>, <date> format
    local notReachableDateTime = sys.exec('cat /var/run/ddns/ddns_update_notreachable'):match("^(%d+)")
    local date_cmd = "date -d @"..notReachableDateTime.." +'%R %p, %m/%d/%Y'"
    local notReachableDateTimeStr = sys.exec(date_cmd)

    return notReachableDateTimeStr
end

return M
