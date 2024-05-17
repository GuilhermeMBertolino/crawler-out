
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
require "commonFunc.wifiUtils_commDefs"
require "commonFunc.wifiUtils_wifiCountryCodeMapping"

function wlanSetup_validator(parm, value, json)
    -- custom handler function only be called at default datatype validate fail.
    local ret = false
    local whichBand = "2G"
    if string.sub(parm, 1, 2) == "5G" then
        whichBand = "5G"
    end

    if parm == "wifiRegion" then
        ret = isValid_wifiRegion_forNtgr(value)
    elseif parm == "5GChannel" then
        local nmrpSku = uci_st:get("netgear", "board", "sku")
        --2022.05.26, PegaBU6, YochengLian, To support PA Sku(Pan north America Sku). The "Region Number" and "SKU name" are 0x000F and PA, defined in SKU_Consolidation_V0.8_5_2022050.pptx, page 9.
        --And only "US" "wifi Region"(Netgear defined) can use DSRC band(Netgear PE requirement).
        --2022.07.21, PegaBU6, YochengLian, Netgear PE urgent requirement to sync PA Sku behavior for US and CA sku and for beta user release.
        if nmrpSku ~= nil and (nmrpSku == "PA" or nmrpSku == "US" or nmrpSku == "CA") then
            local ipLocation_region = uci_st:get("ipLocation", "info", "country")
            local autoWiFiRegion_Mapped_For_PAS = getAutoWifiRegionMapping(ipLocation_region)
            if autoWiFiRegion_Mapped_For_PAS ~= nil and type(autoWiFiRegion_Mapped_For_PAS) == type("") and autoWiFiRegion_Mapped_For_PAS == "US" and isInDSRC_band(value) == true then
                ret = true
            end
        elseif nmrpSku ~= nil and nmrpSku == "US" and isInDSRC_band(value) == true then
            ret = true
        end
    elseif parm == (whichBand.."RadiusIP") and json[whichBand.."Security"] ~= "4" and value == "false" then
        ret = true
    elseif parm == (whichBand.."RadiusSecret") and json[whichBand.."Security"] ~= "4" and value == "" then
        ret = true
    end
    return ret
end

local wlan_setup_maps = {
    wifiRegion  = { data_type = "wifi_region", handler = wlanSetup_validator }, --In actually we don't have "wifi_region" type in validator library, we need to use additional handler to handle it.
    enableAX    = { data_type = "boolean",    handler = nil },
    smartConnect    = { data_type = "boolean",    handler = nil },
    ["2GOfdma"]     = { data_type = "boolean",    handler = nil },
    ["5GOfdma"]     = { data_type = "boolean",    handler = nil },
    ["2GSsid"]      = { data_type = "wlan_ssid",    handler = nil },
    ["2GMode"]      = { data_type = "wlan_mode",    handler = nil },
    ["2GSsidBroadcast"] = { data_type = "boolean",    handler = nil },
    ["2GCoex"]      = { data_type = "boolean",    handler = nil },
    ["2GChannel"]   = { data_type = "wlan_2g_ch",    handler = nil },
    ["2GSecurity"]  = { data_type = "wlan_sec",    handler = nil },
    ["2GRadiusIP"]  = { data_type = "radius_ipaddr",    handler = wlanSetup_validator },
    ["2GEncryptMode"]   = { data_type = "wlan_encrypt",    handler = nil },
    ["2GRadiusPort"]    = { data_type = "port_range",    handler = nil },
    ["2GRadiusSecret"]  = { data_type = "radius_secret",    handler = wlanSetup_validator },
    ["2GPassword"]  = { data_type = "wlan_wpakey",    handler = nil },
    ["5GSsid"]      = { data_type = "wlan_ssid",    handler = nil },
    ["5GMode"]      = { data_type = "wlan_mode",    handler = nil },
    ["5GSsidBroadcast"] = { data_type = "boolean",    handler = nil },
    ["5GChannel"]   = { data_type = "wlan_5g_ch",    handler = wlanSetup_validator }, --DSRC band upper bound to ch177.
    ["5GSecurity"]  = { data_type = "wlan_sec",    handler = nil },
    ["5GRadiusIP"]  = { data_type = "radius_ipaddr",    handler = wlanSetup_validator },
    ["5GEncryptMode"]   = { data_type = "wlan_encrypt",    handler = nil },
    ["5GRadiusPort"]    = { data_type = "port_range",    handler = nil },
    ["5GRadiusSecret"]  = { data_type = "radius_secret",    handler = wlanSetup_validator },
    ["5GPassword"]  = { data_type = "wlan_wpakey",    handler = nil }
};

function file_exists( name )
    local f=io.open(name,"r")
    if f~=nil then io.close(f) return true else return false end
end

function M.wlanSetup_handler(json)

    --log.console_r(json)
    --For debug.
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
    --5. If the migration and comparsion action are successed, call wifiUtility function to save new settings to MTK's wireless profile and do wifi reload.
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
    if (validator.post_data_validate(json, wlan_setup_maps) == false) then
        log.force("Failed to parse the input JSON data!!!");
        return {status="error", message="Data validation failed, "..tostring(json) };
    end

    --TODO: require lock for access /etc/config/NTGR_WiFi uci file in here.

    local nmrpSku = uci_st:get("netgear", "board", "sku")
    --Netgear Spec only allow WW and AU sku can change the run-time wifi region(wifi country in actually).
    --2022.05.26, PegaBU6, YochengLian, To support PA Sku(Pan north America Sku). The "wifiRegion" should come from ipLocation info on GUI(gray-out), so the UCI could be changed by the value.
    --2022.07.21, PegaBU6, YochengLian, Netgear PE urgent requirement to sync PA Sku behavior for US and CA sku and for beta user release.
    if nmrpSku ~= nil and (nmrpSku == "WW" or nmrpSku == "AU" or (nmrpSku == "PA" or nmrpSku == "US" or nmrpSku == "CA")) then
        uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "wifiRegion", json["wifiRegion"])
        uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "wifiRegion", json["wifiRegion"])
    --else --No change wifiRegion in UCI if the nmrpSku can't be got. Follow defult or current value.
    end
    if json["enableAX"] == "true" then
        uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "enableAX", "true")
        uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "enableAX", "true")
    else
        uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "enableAX", "false")
        uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "enableAX", "false")
    end
    uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "enableOFDMA", json["2GOfdma"])
    uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "enableOFDMA", json["5GOfdma"])
    if json["smartConnect"] == "true" then
        uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "smartConnect", "true")
        uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "smartConnect", "true")
    else
        uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "smartConnect", "false")
        uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "smartConnect", "false")
    end

    --2.4G Settings--
    uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "SSID", json["2GSsid"]) --TODO: It may need decode from GUI's POST data.
    uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "bwMode", json["2GMode"])
    uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "SSIDBroadcast", json["2GSsidBroadcast"])
    uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "BSSCoexistence", json["2GCoex"])
    uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "channel", json["2GChannel"])
    uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "securityType", json["2GSecurity"])
    if json["2GSecurity"] == "4" then
        uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "radiusIP", json["2GRadiusIP"])
        uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "encryptMode", json["2GEncryptMode"])
        uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "radiusPort", json["2GRadiusPort"])
        uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "radiusSecret", json["2GRadiusSecret"])
        uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "reKeyInterval", "3600") --Netgear GUI no more provide this option to set. --json["2GGroupKeyInt"]
    else
        uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "wpaPassphrase", json["2GPassword"])
        if json["2GSecurity"] == "1" then --OPEN
            uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "encryptMode", "-1") --NONE
        elseif json["2GSecurity"] == "2" then --WPA2PSK
            uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "encryptMode", "0") --AES
        elseif json["2GSecurity"] == "3" then --WPA2PSK
            uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "encryptMode", "1") --TKIPAES
        elseif json["2GSecurity"] == "5" or json["2GSecurity"] == "6" then --WPA3PSK and WPA2PSKWPA3PSK
            uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "encryptMode", "0") --AES
        end
    end

    --5G Settings--
    uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "SSID", json["5GSsid"]) --TODO: It may need decode from GUI's POST data.
    uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "bwMode", json["5GMode"])
    uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "SSIDBroadcast", json["5GSsidBroadcast"])
    uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "channel", json["5GChannel"])
    uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "securityType", json["5GSecurity"])
    if json["5GSecurity"] == "4" then
        uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "radiusIP", json["5GRadiusIP"])
        uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "encryptMode", json["5GEncryptMode"])
        uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "radiusPort", json["5GRadiusPort"])
        uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "radiusSecret", json["5GRadiusSecret"])
        uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "reKeyInterval", "3600") --Netgear GUI no more provide this option to set. --json["2GGroupKeyInt"]
    else
        uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "wpaPassphrase", json["5GPassword"])
        if json["5GSecurity"] == "1" then --OPEN
            uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "encryptMode", "-1") --NONE
        elseif json["5GSecurity"] == "2" then --WPA2PSK
            uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "encryptMode", "0") --AES
        elseif json["5GSecurity"] == "3" then --WPA2PSK
            uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "encryptMode", "1") --TKIPAES
        elseif json["5GSecurity"] == "5" or json["5GSecurity"] == "6" then --WPA3PSK and WPA2PSKWPA3PSK
            uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "encryptMode", "0") --AES
        end
    end

    uci_st:save(NTGR_WIFI_UCI_CONFIG_NAME)

    uci_st:commit(NTGR_WIFI_UCI_CONFIG_NAME)
    table.insert(changed_config, NTGR_WIFI_UCI_CONFIG_NAME) --"changed_config" is a global variable.

    return {status="success", message="Finish Wireless Setup"}
end

return M
