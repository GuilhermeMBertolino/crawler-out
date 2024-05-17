
--For LUA
function __FILE__() return debug.getinfo(2, 'S').short_src end -- or use .source
function __FUNCTION__() return debug.getinfo(2, 'n').name end
function __LINE__() return debug.getinfo(2, 'l').currentline end

local M = {}
local os     = require "os"
--local uci    = require "luci.model.uci".cursor()
local uci_st = require "luci.model.uci".cursor(nil, "/var/state")
local sys    = require "luci.sys"
local validator = require "commonFunc.validator"
local log    = require "luci.log"
    log.debug(0)

--local mtkwifi = require("mtkwifi")

local netUtils = require "commonFunc.netUtils"
require "commonFunc.wifiUtils_commDefs"

local wlanAdv_setup_maps = {
    enableBeamforming   = { data_type = "boolean",    handler = nil },
    enableMuMimo    = { data_type = "boolean",    handler = nil },
    disablePMF  = { data_type = "boolean",    handler = nil },
    enable_atf  = { data_type = "boolean",    handler = nil },
    ["2GRadioOn"]   = { data_type = "boolean",    handler = nil },
    ["2GCtsRts"]    = { data_type = "wlan_cts_rts",    handler = nil },
    ["2GPreamble"]  = { data_type = "wlan_peram",    handler = nil },
    ["2GWifiSchedule"]  = { data_type = "boolean",    handler = nil },
    ["5GRadioOn"]   = { data_type = "boolean",    handler = nil },
    ["5GCtsRts"]    = { data_type = "wlan_cts_rts",    handler = nil },
    ["5GPreamble"]  = { data_type = "wlan_peram",    handler = nil },
    ["5GWifiSchedule"]  = { data_type = "boolean",    handler = nil }
};

function file_exists( name )
    local f=io.open(name,"r")
    if f~=nil then io.close(f) return true else return false end
end

function M.wlanAdvSettings_handler(json)

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
    --        2.1.1. Data type validation, suck like integer, string, ipv4 format, ipv6 format etc..  --TODO items.
    --        2.1.2. Specific data validation, suck like, value range, enum of input string.  --TODO items.
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
    if (validator.post_data_validate(json, wlanAdv_setup_maps) == false) then
        log.force("Failed to parse the input JSON data!!!");
        return {status="error", message="Data validation failed, "..tostring(json) };
    end

    --TODO: require lock for access /etc/config/NTGR_WiFi uci file in here.

    --Beamforming enable/disale--
    uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "enableBeamforming", json["enableBeamforming"])
    uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "enableBeamforming", json["enableBeamforming"])
    --MU MIMO enable/disable--
    uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "enableMuMimo", json["enableMuMimo"])
    uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "enableMuMimo", json["enableMuMimo"])
    --PMF enable/disable--
    uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "disablePMF", json["disablePMF"])
    uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "disablePMF", json["disablePMF"])
    --AirTime Fairness enable/disable--
    uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "enableATF", json["enable_atf"])
    uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "enableATF", json["enable_atf"])

    --2.4G Settings--
    uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "radioOn", json["2GRadioOn"]) --TODO: It may need decode from GUI's POST data.
    uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "ctsrtsThreshhold", json["2GCtsRts"])
    uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "txPreambleMode", json["2GPreamble"])
    uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "wifiScheduleEnable", json["2GWifiSchedule"])

    --5G Settings--
    uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "radioOn", json["5GRadioOn"]) --TODO: It may need decode from GUI's POST data.
    uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "ctsrtsThreshhold", json["5GCtsRts"])
    uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "txPreambleMode", json["5GPreamble"])
    uci_st:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "wifiScheduleEnable", json["5GWifiSchedule"])

    uci_st:save(NTGR_WIFI_UCI_CONFIG_NAME)

    uci_st:commit(NTGR_WIFI_UCI_CONFIG_NAME)
    table.insert(changed_config, NTGR_WIFI_UCI_CONFIG_NAME) --"changed_config" is a global variable.

    return {status="success", message="Finish Wireless Advance Setup"}
end

return M
