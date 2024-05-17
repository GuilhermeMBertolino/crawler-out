
--For LUA
function __FILE__() return debug.getinfo(2, 'S').short_src end -- or use .source
function __FUNCTION__() return debug.getinfo(2, 'n').name end
function __LINE__() return debug.getinfo(2, 'l').currentline end

local M = {}
local os     = require "os"
local uci    = require "luci.model.uci".cursor()
local uci_st = require "luci.model.uci".cursor(nil, "/var/state")
local sys    = require "luci.sys"
local validator = require "commonFunc.validator"
local log    = require "luci.log"
    log.debug(0)

--local mtkwifi = require("mtkwifi")

local netUtils = require "commonFunc.netUtils"
--require "commonFunc.wifiUtils_secModeMapping"
require "commonFunc.wifiUtils_commDefs"

function guestNetwork_validator(parm, value, json)
    -- custom handler function only be called at default datatype validate fail.
    local ret = false
    local whichBand = "2G"
    if string.sub(parm, 1, 2) == "5G" then
        whichBand = "5G"
    end

    --Default no assign WPAPSK passphrase for Guest Network. Must allow this case for none secutiry setting.
    if parm == (whichBand.."Password") and json[whichBand.."Security"] == "1" and value == "" then
        ret = true
    end
    return ret
end

local guest_network_maps = {
    ["2GEnableGuest"]   = { data_type = "boolean",    handler = nil },
    ["2GSsid"]      = { data_type = "wlan_ssid",    handler = nil },
    ["2GSsidBroadcast"] = { data_type = "boolean",    handler = nil },
    ["2GAllowAccessLocal"]  = { data_type = "boolean",    handler = nil },
    ["2GSecurity"]  = { data_type = "wlan_sec",    handler = nil },
    ["2GPassword"]  = { data_type = "wlan_wpakey",    handler = guestNetwork_validator },
    ["5GEnableGuest"]   = { data_type = "boolean",    handler = nil },
    ["5GSsid"]      = { data_type = "wlan_ssid",    handler = nil },
    ["5GSsidBroadcast"] = { data_type = "boolean",    handler = nil },
    ["5GAllowAccessLocal"]  = { data_type = "boolean",    handler = nil },
    ["5GSecurity"]  = { data_type = "wlan_sec",    handler = nil },
    ["5GPassword"]  = { data_type = "wlan_wpakey",    handler = guestNetwork_validator }
};

function file_exists( name )
    local f=io.open(name,"r")
    if f~=nil then io.close(f) return true else return false end
end

function setEncryptMode(json, elementName, uciSection, uci_st)
    if json[elementName] == "1" then --OPEN
        uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, uciSection, "encryptMode", "-1") --NONE
    elseif json[elementName] == "2" then --WPA2PSK
        uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, uciSection, "encryptMode", "0") --AES
    elseif json[elementName] == "3" then --WPA2PSK
        uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, uciSection, "encryptMode", "1") --TKIPAES
    elseif json[elementName] == "5" or json[elementName] == "6" then --WPA3PSK and WPA2PSKWPA3PSK
        uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, uciSection, "encryptMode", "0") --AES
    end
end

function M.guestNetwork_handler(json)

    --log.console_r(json)
    --For Debug.
    for k,v in pairs(json) do
        if type(v) == type("") or type(v) == type(0) then
            --nixio.syslog("debug", "post."..k.."="..tostring(v))
            log.console("key="..k..", value="..v)
        else
            --nixio.syslog("debug", "post."..k.." invalid, type="..type(v))
            log.console("Invalid value type. key="..k..", tostring(value)="..tostring(v))
        end
    end

    --1. Try to get the lock from NTGR_WiFi uci. (The "_lock" of each "iface" setting.)
    --    1.1 T.B.D Use "busybox lock" to set lock? and "busybox -u" to un-lock????
    --2. Use uci:set() to set NTGR_WiFi uci from GUI's POST data(JSON format).
    --    2.1 data validation happens in here.
    --        It includes two kind of validation.
    --        2.1.1. Data type validation, suck like integer, string, ipv4 format, ipv6 format etc..
    --        2.1.2. Specific data validation, suck like, value range, enum of input string.
    --        If the result of validation is failed, reture error message to caller.
    --3. Use table.insert() to response Web GUI. And use its' mechanism to execute following point4, 5, 6. 

    --4. Call utility function to convert the NTGR_WiFi's contain to MTK's wireless setitng profile. 
    --    4.1 Try to comapre the currently wireless setting table and newly wireless setting table(already merged input JSON data).
    --5. If the migration and comparsion action are successed, call wifiUtility function to save new settings to MTK's wireless profile and do wifi reload or DUT reboot.
    --   (For now, 2021.10.10, MTK's multiple BSSID may need to "reboot" to apply correctly settings.
    --    We wish this can be fixed and only use "wifi reload" to finish correctly applying.)
    --6. T.B.D unlock /etc/confing/NTGR_WiFi accessing if needed.

    if file_exists("\/var\/state\/"..NTGR_WIFI_UCI_CONFIG_NAME) == false then
        local fp = io.open("\/var\/state\/"..NTGR_WIFI_UCI_CONFIG_NAME, "w+")
        if fp ~= nil then io.close(fp) end
    end
    if file_exists("\/etc\/config\/"..NTGR_WIFI_UCI_CONFIG_NAME) == false then
        local fp = io.open("\/etc\/config\/"..NTGR_WIFI_UCI_CONFIG_NAME, "w+")
        if fp ~= nil then io.close(fp) end
    end

    --Data type validation.
    if (validator.post_data_validate(json, guest_network_maps) == false) then
        log.force("Failed to parse the input JSON data!!!");
        return {status="error", message="Data validation failed, "..tostring(json) };
    end

    if json["2GSecurity"] == "4" or json["5GSecurity"] == "4" then
        log.console("Invalid security option for Guest Network. 2GSecurity="..json["2GSecurity"]..", 5GSecurity="..json["5GSecurity"])
        return {status="error", message="invalid parameter"}
    elseif tonumber(json["2GSecurity"]) < 1 or tonumber(json["2GSecurity"]) > 6 then
        log.console("Invalid security option. 2GSecurity="..json["2GSecurity"]..", it's out of range!")
        return {status="error", message="invalid parameter"}
    elseif tonumber(json["5GSecurity"]) < 1 or tonumber(json["5GSecurity"]) > 6 then
        log.console("Invalid security option. 5GSecurity="..json["5GSecurity"]..", it's out of range!")
        return {status="error", message="invalid parameter"}
    end

    local needReloadNetwork = false
    local opMode = uci:get("network", "@opmode[0]", "mode")
    --2.4G Guest Network Settings--
    uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_GUEST_IFNAME, "guestEnable", json["2GEnableGuest"])
    uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_GUEST_IFNAME, "SSID", json["2GSsid"]) --TODO: It may need decode from GUI's POST data.
    uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_GUEST_IFNAME, "SSIDBroadcast", json["2GSsidBroadcast"])
    --PegaBU6, YochengLian, 2022.08.09, In Netgear HomeRouterSpec 16a, Ch. 17.4.2 In "Guest Network", "Allow guest to access My Local network" must be checked and grey out.
    --Don't change the "allowAccessLAN" setting in AP-Mode.
    if opMode == "router" then
        local cur_2gGuest_allowAccessLAN = uci_st:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_GUEST_IFNAME, "allowAccessLAN")
        uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_GUEST_IFNAME, "allowAccessLAN", json["2GAllowAccessLocal"])
        if cur_2gGuest_allowAccessLAN ~= json["2GAllowAccessLocal"] then
            needReloadNetwork = true
        end
    end
    uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_GUEST_IFNAME, "securityType", json["2GSecurity"])
    if json["2GSecurity"] ~= "4" then
        uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_GUEST_IFNAME, "wpaPassphrase", json["2GPassword"])
        setEncryptMode(json, "2GSecurity", MTK_DEF_2G_GUEST_IFNAME, uci_st)
    end

    --5G Guest Network Settings--
    uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_GUEST_IFNAME, "guestEnable", json["5GEnableGuest"])
    uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_GUEST_IFNAME, "SSID", json["5GSsid"]) --TODO: It may need decode from GUI's POST data.
    uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_GUEST_IFNAME, "SSIDBroadcast", json["5GSsidBroadcast"])
    --PegaBU6, YochengLian, 2022.08.09, In Netgear HomeRouterSpec 16a, Ch. 17.4.2 In "Guest Network", "Allow guest to access My Local network" must be checked and grey out.
    --Don't change the "allowAccessLAN" setting in AP-Mode.
    if opMode == "router" then
        local cur_5gGuest_allowAccessLAN = uci_st:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_GUEST_IFNAME, "allowAccessLAN")
        uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_GUEST_IFNAME, "allowAccessLAN", json["5GAllowAccessLocal"])
        if cur_5gGuest_allowAccessLAN ~= json["5GAllowAccessLocal"] then
            needReloadNetwork = true
        end
    end
    uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_GUEST_IFNAME, "securityType", json["5GSecurity"])
    if json["5GSecurity"] ~= "4" then
        uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_GUEST_IFNAME, "wpaPassphrase", json["5GPassword"])
        setEncryptMode(json, "5GSecurity", MTK_DEF_5G_GUEST_IFNAME, uci_st)
    end

    uci_st:save(NTGR_WIFI_UCI_CONFIG_NAME)

    uci_st:commit(NTGR_WIFI_UCI_CONFIG_NAME)
    table.insert(changed_config, NTGR_WIFI_UCI_CONFIG_NAME) --"changed_config" is a global variable.
    --if needReloadNetwork == true then
    --    table.insert(changed_config, "network")
    --end
    return {status="success", message="Finish GuestNetwork Setup"}
end

return M
