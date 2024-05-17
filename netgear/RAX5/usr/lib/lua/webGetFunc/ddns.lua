-- Get functions for LAN
local M = {}

local uci  = require "luci.model.uci".cursor()
local uci_st = require "luci.model.uci".cursor(nil, "/var/state")
local log = require("luci.log") -- for debug

function M.getCheckboxVal_enableDdns()
    log.debug(0)
    log.console("===DEBUG===::getCheckboxVal_enableDdns")
    local enableDdns = uci:get("ddns", "myddns_ipv4", "enabled")

    if enableDdns == nil then
        return "false"
    end

    if enableDdns == "1" then
        enableDdns = "true"
    else
        enableDdns = "false"
    end

    return enableDdns
end

function M.getSelectVal_ddnsService()
    log.debug(0)
    log.console("===DEBUG===::getSelectVal_ddnsService")
    local ddnsService = ""
    local service_name = uci:get("ddns", "myddns_ipv4", "service_name")

    if service_name == "no-ip.com" then
        ddnsService = "noip"
    elseif service_name == "dyndns.org" then
        ddnsService = "dyndns"
    elseif service_name == "netgear" then
        ddnsService = "netgear"
    end

    return ddnsService
end

function M.getRadioVal_haveNetgearAccount()
    log.debug(0)
    log.console("===DEBUG===::getRadioVal_haveNetgearAccount")
    local haveNtgrAccount
    local ddnsStatus = uci:get("ddns", "myddns_ipv4", "updatestatus")

    if ddnsStatus == nil  or ddnsStatus == "" then
        haveNtgrAccount = "no"
    else
        haveNtgrAccount = "yes"
    end

    return haveNtgrAccount
end

function M.getTextVal_hostName()
    log.debug(0)
    log.console("===DEBUG===::getTextVal_hostName")
    local lookup_host = uci:get("ddns", "myddns_ipv4", "lookup_host")

    if lookup_host == nil then
        return ""
    end

    return lookup_host
end

function M.getTextVal_NtgrEmail()
    log.debug(0)
    -- for provider NETGEAR ntgr_email
    log.console("===DEBUG===::getTextVal_NtgrEmail")
    local ntgrEmail = uci:get("ddns", "myddns_ipv4", "ntgr_email")

    if ntgrEmail == nil then
        return ""
    end

    return ntgrEmail
end

function M.getTextVal_username()
    log.debug(0)
    log.console("===DEBUG===::getTextVal_username")
    local username = uci:get("ddns", "myddns_ipv4", "username")
    log.console("===DEBUG===::username", username)
    if username == nil then
        return ""
    end

    return username
end

function M.getTextVal_password()
    log.debug(0)
    log.console("===DEBUG===::getTextVal_password")
    local password = uci:get("ddns", "myddns_ipv4", "password")
    if password == nil then
        return ""
    end

    return password
end

function M.getNtgrDdnsStatus()
    log.debug(0)
    log.console("===DEBUG===::getNtgrDdnsStatus")
    local ddnsStatus = uci:get("ddns", "myddns_ipv4", "updatestatus")

    if ddnsStatus == nil then
        return ""
    end

    return ddnsStatus
end

function M.getMlangVal_msgNetgearUpdateFail()
    log.debug(0)
    log.console("===DEBUG===::getMlangVal_msgNetgearUpdateFail")
    local errorCode = uci:get("ddns", "myddns_ipv4", "errorCode")
    local internetStatus = uci_st:get("network", "inet", "up")

    if ( internetStatus == '0' ) then
        --"The Internet connection is down, please connect to the Internet first"
        return "AQSE16"
    end

    if (errorCode == "1") then
        --"Unable to reach the DDNS server, please check your Internet connection or try again later"
        return "ADDE20"
    elseif (errorCode == "2") then
        --"Unable to complete the job, reason:"
        return "ADDE19"
    elseif (errorCode == "100") then
        --"The specified hostname is not a valid DNS name"
        return "ADDE11"
    elseif (errorCode == "101") then
        local haveNtgrAccount = uci:get("ddns", "myddns_ipv4", "have_ntgr_account")
        if (haveNtgrAccount == "yes") then
            --"Account authentication failed"
            return "ADDE14"
        elseif (haveNtgrAccount == "no") then
            --"The email has already been registered with a different password"
            return "ADDE13"
        end
    elseif (errorCode == "111") then
        --"The email/account specified does not exist"
        return "ADDE12"
    elseif (errorCode == "113") then
        --"The specified hostname is not available"
        return "ADDE15"
    elseif (errorCode == "115") then
        --"You have reached the maximum number of hostnames that you can create for this account, you can"
        return "ADDE16"
    elseif (errorCode == "200") then
        --"The email/account specified is banned by No-IP"
        return "ADDE35"
    elseif (errorCode == "201") then
        --"The email/account specified is banned by No-IP"
        return "ADDE36"
    else
        return ""
    end
end

function M.getMlangVal_msgNetgearUpdateFail_continue()
    log.debug(0)
    log.console("===DEBUG===::getMlangVal_msgNetgearUpdateFail_continue")
    local errorCode = uci:get("ddns", "myddns_ipv4", "errorCode")

    if (errorCode == "115")  then
        --"click here"
        return "ADDE17"
    elseif (errorCode == "2") then
        --Update failed for unknown reason. Will try again later.
        return "ADDE22"
    else
        return ""
    end
end

function M.getMlangVal_msgNetgearUpdateFail_continue2()
    log.debug(0)
    log.console("===DEBUG===::getMlangVal_msgNetgearUpdateFail_continue2")
    local errorCode = uci:get("ddns", "myddns_ipv4", "errorCode")

    if (errorCode == "115")  then
        --"to login to your account to upgrade your account or to remove an unwanted hostname"
        return "ADDE18"
    else
        return ""
    end
end

function M.getOpenVpnStatus()

    local enableOpenvpn = uci:get("openvpn", "openvpn_tun", "enabled") or "0"

    if enableOpenvpn == "1" then
        return "true"
    else
        return "false"
    end
end

return M

