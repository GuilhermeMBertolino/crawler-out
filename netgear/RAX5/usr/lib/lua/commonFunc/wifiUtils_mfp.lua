
local M = {}

function __FILE__() return debug.getinfo(2, 'S').short_src end -- or use .source
function __FUNCTION__() return debug.getinfo(2, 'n').name end
function __LINE__() return debug.getinfo(2, 'l').currentline end

package.path = '/lib/wifi/?.lua;'..package.path
local mtkwifi = require("mtkwifi")
require "commonFunc.wifiUtils_commDefs"
require "commonFunc.wifiUtils_secModeMapping"
local sys  = require "luci.sys"
local uci = require "luci.model.uci".cursor()

function M.getMFPC_2G()
    -- Matt, 20221024. PMFMFPC/PMFMFPR value will depend on the Wi-Fi autumode
    local wifiPrimary_secType = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "securityType")
    local wifiGuest_secType = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_GUEST_IFNAME, "securityType")
    local enableGuestNetwork = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_GUEST_IFNAME, "guestEnable")
    
    if enableGuestNetwork ~= "true" then
        wifiGuest_secType = "0" -- for default value
    end

    print(getWifiMFPCByUCISecType(wifiPrimary_secType, wifiGuest_secType))
end

function M.getMFPC_5G()
    -- Matt, 20221024. PMFMFPC/PMFMFPR value will depend on the Wi-Fi autumode
    local wifiPrimary_secType = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "securityType")
    local wifiGuest_secType = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_GUEST_IFNAME, "securityType")
    local enableGuestNetwork = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_GUEST_IFNAME, "guestEnable")
    
    if enableGuestNetwork ~= "true" then
        wifiGuest_secType = "0" -- for default value
    end

    print(getWifiMFPCByUCISecType(wifiPrimary_secType, wifiGuest_secType))
end

function M.getMFPR_2G()
    -- Matt, 20221024. PMFMFPC/PMFMFPR value will depend on the Wi-Fi autumode
    local wifiPrimary_secType = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "securityType")
    local wifiGuest_secType = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_GUEST_IFNAME, "securityType")
    local enableGuestNetwork = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_GUEST_IFNAME, "guestEnable")
    
    if enableGuestNetwork ~= "true" then
        wifiGuest_secType = "0" -- for default value
    end

    print(getWifiMFPRByUCISecType(wifiPrimary_secType, wifiGuest_secType))
end

function M.getMFPR_5G()
    -- Matt, 20221024. PMFMFPC/PMFMFPR value will depend on the Wi-Fi autumode
    local wifiPrimary_secType = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "securityType")
    local wifiGuest_secType = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_GUEST_IFNAME, "securityType")
    local enableGuestNetwork = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_GUEST_IFNAME, "guestEnable")
    
    if enableGuestNetwork ~= "true" then
        wifiGuest_secType = "0" -- for default value
    end

    print(getWifiMFPRByUCISecType(wifiPrimary_secType, wifiGuest_secType))
end

return M
