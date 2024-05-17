-- Get functions for Wireless
local M = {}

local uci  = require "luci.model.uci".cursor()
local uci_st = require "luci.model.uci".cursor_state()
local json = require "luci.json"
local sys  = require "luci.sys"
local netUtils = require "commonFunc.netUtils"
local log = require "luci.log" -- for debug

local wifiUtil_convert = require "commonFunc.wifiUtils_convertWifiSettings"

function getWiFiUciSection( whichBand, primaryOrGuest )
    local NTGR_WiFi_section = MTK_DEF_2G_PRIMARY_IFNAME --"ra0"
    if primaryOrGuest == nil then primaryOrGuest = "primary" end

    if whichBand == "2.4G" then
        if primaryOrGuest == "primary" then
            NTGR_WiFi_section = MTK_DEF_2G_PRIMARY_IFNAME
        elseif primaryOrGuest == "guest" then
            NTGR_WiFi_section = MTK_DEF_2G_GUEST_IFNAME
        elseif primaryOrGuest == "client" then
            NTGR_WiFi_section = MTK_DEF_2G_CLIENT_IFNAME
        else
           return nil
        end
    elseif whichBand == "5G" then
        if primaryOrGuest == "primary" then
            NTGR_WiFi_section = MTK_DEF_5G_PRIMARY_IFNAME
        elseif primaryOrGuest == "guest" then
            NTGR_WiFi_section = MTK_DEF_5G_GUEST_IFNAME
        elseif primaryOrGuest == "client" then
            NTGR_WiFi_section = MTK_DEF_5G_CLIENT_IFNAME
        else
           return nil
        end
    else return nil end

    return NTGR_WiFi_section
end

function M.getWifiRegion()
    local wifi_regioin = "US"
    local nmrpSku = uci_st:get("netgear", "board", "sku")
    local ipLocation_region = uci_st:get("ipLocation", "info", "country")

    --2022.05.26, PegaBU6, YochengLian, To support PA Sku(Pan north America Sku). The default country shold be "Canada".
    --SKU_Consolidation_V0.8_5_2022050.pptx, page 8.
    --PA Sku also NOT allow user to change the wifiRegion from GUI.(Gray-out field on GUI.)
    --2022.07.21, PegaBU6, YochengLian, Netgear PE urgent requirement to sync PA Sku behavior for US and CA sku and for beta user release.
    if nmrpSku~= nil and (nmrpSku == "PA" or nmrpSku == "US" or nmrpSku == "CA") then
        if ipLocation_region ~= nil and type(ipLocation_region) == type("") then
            local autoWifiRegion_for_PAS = getAutoWifiRegionMapping(ipLocation_region)
            if autoWifiRegion_for_PAS ~= nil and type(autoWifiRegion_for_PAS) == type("") then
                wifi_regioin = autoWifiRegion_for_PAS
            else
                wifi_regioin = "CA"
            end
        else --ipLocation_region == nil
            wifi_regioin = "CA"
        end
    else
        wifi_regioin = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "wifiRegion")
        if wifi_regioin == nil then
            wifi_regioin = "US"
        end
    end

    return wifi_regioin
end

function M.getNmrp_sku()
    local nmrp_sku = "US"

    nmrp_sku = uci_st:get("netgear", "board", "sku")
    return (nmrp_sku ~= nil and nmrp_sku or "US")
end

function M.getRegionNo()
    local region_number = "0x0002"

    --TODO: get real "region number" from NMRP setting if needed.
    return region_number
end

function M.getEnableAX()
    local enableAX = "true"

    if uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "enableAX") == "true" or
       uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "enableAX") == "true" then
       enableAX = "true"
    else
       enableAX = "false"
    end
    return (enableAX ~= nil and enableAX or "true")
end

function M.getEnableOFDMA( whichBand )
    local enableOFDMA = "false"

    local uciWiFi_section = getWiFiUciSection(whichBand)
    if uciWiFi_section == nil then return false end

    enableOFDMA = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, uciWiFi_section, "enableOFDMA")
    return (enableOFDMA ~= nil and enableOFDMA or "false")
end

function M.getSmartConnect()
    local smartConnect = "false"

    smartConnect = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "smartConnect")
    return (smartConnect ~= nil and smartConnect or "false")
end

function M.getSSIDBroadcast( whichBand, primaryOrGuest )
    local ssidBroadcast = "true"

    local uciWiFi_section = getWiFiUciSection(whichBand, primaryOrGuest)
    if uciWiFi_section == nil then return false end

    ssidBroadcast = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, uciWiFi_section, "SSIDBroadcast")
    return (ssidBroadcast ~= nil and ssidBroadcast or "true")
end

function M.getRadioOn( whichBand )
    local radioOn = "true"

    local uciWiFi_section = getWiFiUciSection(whichBand)
    if uciWiFi_section == nil then return false end

    radioOn = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, uciWiFi_section, "radioOn")
    --if uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "radioOn") == "true" then
    --   tmpValue = "true"
    --else
    --   tmpValue = "false"
    --end
    return (radioOn ~= nil and radioOn or "true")
end

function M.getEnableGuestNetwork( whichBand )
    local enableGuest = "false"

    local uciWiFi_section = getWiFiUciSection(whichBand, "guest")
    if uciWiFi_section == nil then return false end

    enableGuest = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, uciWiFi_section, "guestEnable")
    return (enableGuest ~= nil and enableGuest or "false")
end

function M.getCoex( whichBand )
    local coexistence = "true"

    local uciWiFi_section = getWiFiUciSection(whichBand)
    if uciWiFi_section == nil then return false end

    coexistence = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, uciWiFi_section, "BSSCoexistence")
    return (coexistence ~= nil and coexistence or "true")
end

function  M.getSsid( whichBand, primaryOrGuest)
    local ssid = "Netgear_Pseudo"

    local uciWiFi_section = getWiFiUciSection(whichBand, primaryOrGuest)
    if uciWiFi_section == nil then return false end

    ssid = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, uciWiFi_section, "SSID")
    if ssid == nil and primaryOrGuest == "client" then
        ssid = ""
    end
    return (ssid ~= nil and ssid or "Netgear_Pseudo_"..primaryOrGuest.."_"..whichBand)
end

function M.getWifiChannel( whichBand )
    local settingChannel = "6"

    local uciWiFi_section = getWiFiUciSection(whichBand)
    if uciWiFi_section == nil then return false end

    settingChannel = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, uciWiFi_section, "channel")
    -- Convert to number to remove leading zero
    return (tonumber(settingChannel) ~= nil and tonumber(settingChannel) or "")
end

function M.get_runtime_current_channel( ifname )
    local pega_wifi_misc_info = c_get_PEGA_misc_info(ifname)
    --log.force("pega_wifi_misc_info\[\"channel\"\]="..pega_wifi_misc_info["channel"]) --For debug.
    return pega_wifi_misc_info["channel"]
end

function M.get_extensionChannel_mode( ifname )
    local pega_wifi_misc_info = c_get_PEGA_misc_info(ifname)
    --log.force("pega_wifi_misc_info\[\"extension_channel_mode\"\]="..pega_wifi_misc_info["extension_channel_mode"]) --For debug.
    return pega_wifi_misc_info["extension_channel_mode"]
end

function M.get_ht_bw( ifname )
    local pega_wifi_misc_info = c_get_PEGA_misc_info(ifname)
    --log.force("pega_wifi_misc_info\[\"cfg_ht_bw\"\]="..pega_wifi_misc_info["cfg_ht_bw"]) --For debug.
    return pega_wifi_misc_info["cfg_ht_bw"]
end

function M.get_vht_bw( ifname )
    local pega_wifi_misc_info = c_get_PEGA_misc_info(ifname)
    --log.force("pega_wifi_misc_info\[\"cfg_vht_bw\"\]="..pega_wifi_misc_info["cfg_vht_bw"]) --For debug.
    return pega_wifi_misc_info["cfg_vht_bw"]
end

function M.getWiFiMode( whichBand )
    local wifiMode = "3"

    local uciWiFi_section = getWiFiUciSection(whichBand)
    if uciWiFi_section == nil then return false end

    wifiMode = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, uciWiFi_section, "bwMode")
    return (tonumber(wifiMode) ~= nil and wifiMode or "3") --Represent "Speed", it's a combinational value, it can not map to sigle wireless setting/config parameter directly.
end

function M.getSecurityType( whichBand, primaryOrGuest )
    local securityType = "2"

    local uciWiFi_section = getWiFiUciSection(whichBand, primaryOrGuest)
    if uciWiFi_section == nil then return false end

    securityType = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, uciWiFi_section, "securityType")
    return (tonumber(securityType) ~= nil and securityType or "2")
end

function M.getWPAPassphrase( whichBand, primaryOrGuest )
    local wpaPassphrase = "PseudoPassword"

    local uciWiFi_section = getWiFiUciSection(whichBand, primaryOrGuest)
    if uciWiFi_section == nil then return false end

    wpaPassphrase = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, uciWiFi_section, "wpaPassphrase")
    if wpaPassphrase == nil and (primaryOrGuest == "guest" or primaryOrGuest == "client")  then
        wpaPassphrase = "" --Netgear Home Router Spec 16a defined the default WPA passphrase is no set. GUI also show it with blank(the default combination for guest network is WPAPSK2 + blank password on GUI showing).
    end
    return (wpaPassphrase ~= nil and wpaPassphrase or "PseudoPassword")
end

function M.getEncryptType( whichBand, primaryOrGuest )
    local encryptType = "0"

    local uciWiFi_section = getWiFiUciSection(whichBand, primaryOrGuest)
    if uciWiFi_section == nil then return false end

    encryptType = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, uciWiFi_section, "encryptMode")
    return (tonumber(encryptType) ~= nil and encryptType or "0")
end

function M.getRadiusGroupRekeyInterval( whichBand )
    local radius_reKey_interval = "3600"

    local uciWiFi_section = getWiFiUciSection(whichBand)
    if uciWiFi_section == nil then return false end

    radius_reKey_interval = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, uciWiFi_section, "reKeyInterval")
    return (tonumber(radius_reKey_interval) ~= nil and radius_reKey_interval or "3600")
end

function M.getRadiusIP( whichBand )
    local radius_ip = ""

    local uciWiFi_section = getWiFiUciSection(whichBand)
    if uciWiFi_section == nil then return false end

    radius_ip = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, uciWiFi_section, "radiusIP")
    return (netUtils.checkIpv4Format( radius_ip ) and radius_ip or "")
end

function M.getRadiusPort( whichBand )
    local radius_port = "1812"

    local uciWiFi_section = getWiFiUciSection(whichBand)
    if uciWiFi_section == nil then return false end

    radius_port = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, uciWiFi_section, "radiusPort")
    return (tonumber(radius_port) ~= nil and radius_port or "1812")
end

function M.getRadiusSecret( whichBand )
    local radius_secret = ""

    local uciWiFi_section = getWiFiUciSection(whichBand)
    if uciWiFi_section == nil then return false end

    radius_secret = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, uciWiFi_section, "radiusSecret")
    return (radius_secret ~= nil and radius_secret or "")
end

function M.getWiFi_5GBandwidth( )
    local wifi_5Gbandwidth = "80MHz"

    local tmpValue = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "bwMode")

    if tmpValue ~= nil then
        if tmpValue == "1" then
            wifi_5Gbandwidth = "20MHz"
        elseif tmpValue == "2" then
            wifi_5Gbandwidth = "40MHz"
        else
            wifi_5Gbandwidth = "80MHz"
        end
    end

    return wifi_5Gbandwidth
end

function M.getEnableAX256QAM()
    local enableAX256QAM = "1"

    return enableAX256QAM
end

function M.getAllowAccessLocal( whichBand )
    local allowAccessLocal = "false"

    local uciWiFi_section = getWiFiUciSection(whichBand, "guest")
    if uciWiFi_section == nil then return false end

    allowAccessLocal = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, uciWiFi_section, "allowAccessLAN")
    return (allowAccessLocal ~= nil and allowAccessLocal or "false")
end

function M.getCtsRtsThreshold( whichBand )
    local ctsRtsThreshold = "2347"

    local uciWiFi_section = getWiFiUciSection(whichBand)
    if uciWiFi_section == nil then return false end

    ctsRtsThreshold = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, uciWiFi_section, "ctsrtsThreshhold")
    return (tonumber(ctsRtsThreshold) ~= nil and ctsRtsThreshold or "2347")
end

function M.getPreamble( whichBand )
    local preambleMode = "0"

    local uciWiFi_section = getWiFiUciSection(whichBand)
    if uciWiFi_section == nil then return false end

    preambleMode = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, uciWiFi_section, "txPreambleMode")
    return (tonumber(preambleMode) ~= nil and preambleMode or "0")
end

function M.getTxPower( whichBand )
    local txPower = "100"

    local uciWiFi_section = getWiFiUciSection(whichBand)
    if uciWiFi_section == nil then return false end

    txPower = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, uciWiFi_section, "txTPC")
    return (tonumber(txPower) ~= nil and txPower or "100")
end

function M.getEnableWifiSchedule( whichBand )
    local enableWifiSchedule = "false"

    local uciWiFi_section = getWiFiUciSection(whichBand)
    if uciWiFi_section == nil then return false end

    enableWifiSchedule = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, uciWiFi_section, "wifiScheduleEnable")
    return (enableWifiSchedule ~= nil and enableWifiSchedule or "false")
end

function M.getWpsPin()
    return "12345670" --Hardcode for initially version, implement it after WPS function ready.
end

function M.getWpsPinEnable()
    return "false" --Hardcode for initially version, implement it after WPS function ready.
end

function M.getWpsAutoDisablePin()
    return "false" --Hardcode for initially version, implement it after WPS function ready.
end

function M.getWpsNumOfFailedPin()
    return "3" --Hardcode for initially version, implement it after WPS function ready.
end

function M.getWpsKeepSetting( whichBand )
    return "true" --Hardcode for initially version, implement it after WPS function ready.
 --Hardcode for initially version, implement it after WPS function ready.
end

function M.getEnableBeamforming()
    local  enableBeamforming = "true"

    enableBeamforming = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "enableBeamforming") --Use 2.4G's value as primary key.
    return (enableBeamforming ~= nil and enableBeamforming or "true")
end

function M.getEnableMuMimo()
    local  enableMuMimo = "true"

    enableMuMimo = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "enableMuMimo") --Use 2.4G's value as primary key.
    return (enableMuMimo ~= nil and enableMuMimo or "true")
end

function M.getDisablePMF()
    local  disablePMF = "true"

    disablePMF = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "disablePMF") --Use 2.4G's value as primary key.
    return (disablePMF ~= nil and disablePMF or "true")
end

function M.getEnableATF()
    local  enableATF = "true"

    enableATF = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "enableATF") --Use 2.4G's value as primary key.
    return (enableATF ~= nil and enableATF or "true")
end

function M.getWifiBtnEnable()
    local  wifiBtnStatus = "1"
    return wifiBtnStatus
end

function M.getWifiMacAddr( whichBand, primaryOrGuest )
    local ifname = getWiFiUciSection(whichBand, primaryOrGuest)
    if ifname == nil then return false end

    local tmpMac = luci.sys.exec("ifconfig ".. ifname .." | grep HWaddr | awk -F ' ' '{printf$5}'")
    local wifiMac = string.upper(string.gsub(tmpMac, ":", ""))
    return wifiMac
end

function M.getWifi_if_status( whichBand, primaryOrGuest )
    local ifname = getWiFiUciSection(whichBand, primaryOrGuest)
    if ifname == nil then return false end

    local wifi_intf_status = sys.exec("ip link show "..ifname.." | grep LOWER_UP \-c")
    if tonumber(wifi_intf_status) > 0 then
        return "up"
    else
        return "down"
    end
end

function  M.getBrSsid()
    local ssid
    local uciWiFi_section = MTK_DEF_2G_STA_IFNAME
    local wifiIF = uci:get("network", "op_br", "wifiIF")

    if(wifiIF ~= nil and wifiIF == MTK_DEF_5G_STA_IFNAME) then
        uciWiFi_section = MTK_DEF_5G_STA_IFNAME
    end

    ssid = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, uciWiFi_section, "SSID")
    if(ssid == nil) then
        ssid = ""
    end
    return ssid
end

return M
