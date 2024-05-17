local M = {}

local uci_st = require "luci.model.uci".cursor(nil, "/var/state")
local validator = require "commonFunc.validator"
require "commonFunc.wifiUtils_commDefs"
require "commonFunc.wifiUtils_wifiCountryCodeMapping"
local log = require "luci.log"
local installEvents = require "commonFunc.installEvents"

local wlan_setup_maps = {
    smartConnect    = { data_type = "boolean",    handler = nil },
    ["2GSsid"]      = { data_type = "wlan_ssid",    handler = nil },
    ["2GPassword"]  = { data_type = "wlan_wpakey",    handler = nil },
    ["5GSsid"]      = { data_type = "wlan_ssid",    handler = nil },
    ["5GPassword"]  = { data_type = "wlan_wpakey",    handler = nil }
}

function M.wizWifi_handler(json)
    
    local uci = require "luci.model.uci".cursor()

    --Data type validation.
    if (validator.post_data_validate(json, wlan_setup_maps) == false) then
        log.print("Failed to parse the input JSON data!!!");
        return {status="error", message="Data validation failed, "..tostring(json) };
    end

    if json["smartConnect"] == "true" then
        uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "smartConnect", "true")
        uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "smartConnect", "true")
    else
        uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "smartConnect", "false")
        uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "smartConnect", "false")
    end

    uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "SSID", json["2GSsid"]) --TODO: It may need decode from GUI's POST data.
    uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "wpaPassphrase", json["2GPassword"])
    
    uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "SSID", json["5GSsid"]) --TODO: It may need decode from GUI's POST data.
    uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "wpaPassphrase", json["5GPassword"])

    --2022.05.26, PegaBU6, YochengLian, To support PA Sku(Pan north America Sku). The "wifiRegion" for PA sku should follow the auto detected value by xCloud service.
    local nmrpSku = uci_st:get("netgear", "board", "sku")
    --2022.07.21, PegaBU6, YochengLian, Netgear PE urgent requirement to sync PA Sku behavior for US and CA sku and for beta user release.
    if nmrpSku ~= nil and (nmrpSku == "PA" or nmrpSku == "US" or nmrpSku == "CA") then
        local ipLocation_region = uci_st:get("ipLocation", "info", "country")
        --If we can't find the country mapping for PAS, the default value is CA(Canada).
        --SKU_Consolidation_V0.8_5_2022050.pptx, page 8.
        if ipLocation_region ~= nil and type(ipLocation_region) == type("") then
            local autoWifiRegion = getAutoWifiRegionMapping(ipLocation_region)
            if autoWifiRegion ~= nil and type(autoWifiRegion) == type("") then
                uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "wifiRegion", autoWifiRegion)
            else
                uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "wifiRegion", "CA")
            end
        else --ipLocation_region == nil
            uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "wifiRegion", "CA")
        end
    end

    uci_st:save(NTGR_WIFI_UCI_CONFIG_NAME)
    uci_st:commit(NTGR_WIFI_UCI_CONFIG_NAME)
    table.insert(changed_config, NTGR_WIFI_UCI_CONFIG_NAME) --"changed_config" is a global variable.
    
    local exec  = require "luci.util".exec
    exec("puDataStr set wizardCheck WifiConfigured true")
    -- set flags for installEvents after wifi config changing
    -- to check the ssid/passphrase are "default" or "user-defined" according the default settings(2G only)
    installEvents.checkWifi(json["2GSsid"], json["2GPassword"])
    
    return {status="success", message="Finish Wizard WiFi Setup"}
end

return M
