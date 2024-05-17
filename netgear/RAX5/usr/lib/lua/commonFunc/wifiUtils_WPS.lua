
--This wifi utility lua is to create WPS related API function for Netgear GUI calling.
local M = {}

function __FILE__() return debug.getinfo(2, 'S').short_src end -- or use .source
function __FUNCTION__() return debug.getinfo(2, 'n').name end
function __LINE__() return debug.getinfo(2, 'l').currentline end

package.path = '/lib/wifi/?.lua;'..package.path
local mtkwifi = require("mtkwifi")
local ioctl_help = require "ioctl_helper" --require the "/usr/lib/lua/ioctl_helper.so".
require "commonFunc.wifiUtils_secModeMapping"
require "commonFunc.wifiUtils_wifiCountryCodeMapping"
require "commonFunc.wifiUtils_commDefs"

--local posix = require("posix")
--local uci = require "luci.model.uci".cursor()
--local json = require "luci.json"
local sys  = require "luci.sys"
local log = require "luci.log"
    log.debug(0)

function M.start_WPS_PBC_procedure()
    local is2gWifi_intf_up = sys.exec("ip link show "..MTK_DEF_2G_PRIMARY_IFNAME.." | grep LOWER_UP \-c")
    local is5gWifi_intf_up = sys.exec("ip link show "..MTK_DEF_5G_PRIMARY_IFNAME.." | grep LOWER_UP \-c")
    if tonumber(is2gWifi_intf_up) > 0 then
        os.execute("iwpriv ra0 set WscStop=1")
        os.execute("iwpriv ra0 set WscConfMode=7")
        os.execute("iwpriv ra0 set WscConfStatus=2")
        os.execute("iwpriv ra0 set WscMode=2")
        os.execute("iwpriv ra0 set WscGetConf=1")
        os.execute("(sleep 120 && iwpriv ra0 set WscStop=1) &")
    end

    if tonumber(is5gWifi_intf_up) > 0 then
        os.execute("iwpriv rax0 set WscStop=1")
        os.execute("iwpriv rax0 set WscConfMode=7")
        os.execute("iwpriv rax0 set WscConfStatus=2")
        os.execute("iwpriv rax0 set WscMode=2")
        os.execute("iwpriv rax0 set WscGetConf=1")
        os.execute("(sleep 120 && iwpriv rax0 set WscStop=1) &")
    end
end

function M.stop_WPS_PBC_procedure()
    os.execute("iwpriv ra0 set WscStop=1")
    os.execute("iwpriv rax0 set WscStop=1")
end

function M.start_WPS_clientPIN_procedure( clientPIN )
    local is2gWifi_intf_up = sys.exec("ip link show "..MTK_DEF_2G_PRIMARY_IFNAME.." | grep LOWER_UP \-c")
    local is5gWifi_intf_up = sys.exec("ip link show "..MTK_DEF_5G_PRIMARY_IFNAME.." | grep LOWER_UP \-c")
    if tonumber(is2gWifi_intf_up) > 0 then
        os.execute("iwpriv ra0 set WscStop=1")
        os.execute("iwpriv ra0 set WscConfMode=7")
        os.execute("iwpriv ra0 set WscConfStatus=2")
        os.execute("iwpriv ra0 set WscMode=1")
        --os.execute("iwpriv ra0 set WscVendorPinCode="..clientPIN)
        os.execute("iwpriv ra0 set WscPinCode="..clientPIN)
        os.execute("iwpriv ra0 set WscGetConf=1")
        os.execute("(sleep 120 && iwpriv ra0 set WscStop=1) &")
    end

    if tonumber(is5gWifi_intf_up) > 0 then
        os.execute("iwpriv rax0 set WscStop=1")
        os.execute("iwpriv rax0 set WscConfMode=7")
        os.execute("iwpriv rax0 set WscConfStatus=2")
        os.execute("iwpriv rax0 set WscMode=1")
        --os.execute("iwpriv rax0 set WscVendorPinCode="..clientPIN)
        os.execute("iwpriv rax0 set WscPinCode="..clientPIN)
        os.execute("iwpriv rax0 set WscGetConf=1")
        os.execute("(sleep 120 && iwpriv rax0 set WscStop=1) &")
    end
end

--{
--    DefKey = 2
--    WscStatus = 'Not used'
--    AuthMode = 'WPA2-PSK'
--    Conf = 2
--    EncType = 'AES'
--    WscResult = 0
--    SSID = 'NETGEAR_RAX5_yo2-5G'
--    WscWPAKey = 'largekey456'
--}
function M.get_WPS_current_profile( ifname )
    wpsCurrentProfile = c_getCurrentWscProfile(ifname)
    --if( if type(wpsCurrentProfile) == "table" then ) then
        log.console_r(wpsCurrentProfile)
        return wpsCurrentProfile
    --else
    --    return nil
    --end
end

--{
--    wps_status = 'Not used'
--    wps_port_secured = 'NO'
--    wps_result = 'Continuing'
--    wps_status_code = 0
--    apcli_get_wps_status = 'OK'
--    Error = 'Port is not secured'
--}
function M.get_WPS_running_status( ifname )
    wpsRunningStatus = c_apcli_get_wps_status(ifname)
    --if( wpsRunningStatus ~= nil and wpsRunningStatus["wps_port_secured"] == "YES" ) then
        --log.console(__FUNCTION__()..":"..__LINE__()..", wpsRunningStatus="..wpsRunningStatus)
        log.console_r(wpsRunningStatus)
        return wpsRunningStatus
    --else
    --    return nil
    --end
end

function mappingTo_GUI_wps_status( wps_status_str )
    if wps_status_str == "Not used" or
       wps_status_str == "Idle" then
        return "0"
    elseif wps_status_str == "Received M7" or
           wps_status_str == "Received M8" or
           wps_status_str == "Configured" then
        return "2" --Success for GUI showing.
    elseif wps_status_str == "WSC Fail(Ignore this if Intel/Marvell registrar used)" or
           wps_status_str == "Sending EAP-Fail" or
           wps_status_str == "WSC_ERROR_HASH_FAIL" or
           wps_status_str == "WSC_ERROR_HMAC_FAIL" or
           wps_status_str == "WSC_ERROR_DEV_PWD_AUTH_FAIL" or
           wps_status_str == "EAP_FAIL_RECEIVED" or
           wps_status_str == "EAP_NONCE_MISMATCH" or
           wps_status_str == "EAP_INVALID_DATA" or
           wps_status_str == "PASSWORD_MISMATCH" or
           wps_status_str == "EAP_REQ_WRONG_SMI" or
           wps_status_str == "EAP_REQ_WRONG_VENDOR_TYPE" then
        return "4" --Failed for GUI showing. Reason is timeout.
    elseif wps_status_str == "PBC_SESSION_OVERLAP" or
           wps_status_str == "PBC:TOO MANY AP" then
        return "8" --Failed for GUI showing. Reason is PBC overlap.
    else
        return "1" --In progressing for GUI showing.
    end
end

function M.get_WPS_running_status_forGUI()
    wpsRunningStatus_2G = M.get_WPS_running_status(MTK_DEF_2G_PRIMARY_IFNAME)
    wpsRunningStatus_5G = M.get_WPS_running_status(MTK_DEF_5G_PRIMARY_IFNAME)

    if wpsRunningStatus_2G ~= nil then
        log.console(", wpsRunningStatus_2G\[\"wps_status\"\]="..wpsRunningStatus_2G["wps_status"])
    end
    if wpsRunningStatus_5G ~= nil then
        log.console(", wpsRunningStatus_5G\[\"wps_status\"\]="..wpsRunningStatus_5G["wps_status"])
    end

    tmpWPS_status = "0"
    if mappingTo_GUI_wps_status(wpsRunningStatus_2G["wps_status"]) == "2" or mappingTo_GUI_wps_status(wpsRunningStatus_5G["wps_status"]) == "2"  then
        tmpWPS_status = "2"
    elseif mappingTo_GUI_wps_status(wpsRunningStatus_2G["wps_status"]) == "8" or mappingTo_GUI_wps_status(wpsRunningStatus_5G["wps_status"]) == "8" then
        tmpWPS_status = "8"
    elseif mappingTo_GUI_wps_status(wpsRunningStatus_2G["wps_status"]) == "4" or mappingTo_GUI_wps_status(wpsRunningStatus_5G["wps_status"]) == "4" then
        tmpWPS_status = "4"
    elseif  mappingTo_GUI_wps_status(wpsRunningStatus_2G["wps_status"]) == "1" or mappingTo_GUI_wps_status(wpsRunningStatus_5G["wps_status"]) == "1" then
        tmpWPS_status = "1"
    else
        tmpWPS_status = "0" --initial value.
    end

    log.console(__FUNCTION__()..":"..__LINE__()..", tmpWPS_status="..tmpWPS_status)
    return tmpWPS_status
end

function M.get_WPS_configured_setting_2g_forGUI()
    wpsCurrentProfile_2G = M.get_WPS_current_profile(MTK_DEF_2G_PRIMARY_IFNAME)
    local wps_2g_configured_setting = "true"

    if wpsCurrentProfile_2G ~= nil and type(wpsCurrentProfile_2G["Conf"]) == "number" then
        if tostring(wpsCurrentProfile_2G["Conf"]) == "2" then
            wps_2g_configured_setting = "true"
        elseif tostring(wpsCurrentProfile_2G["Conf"]) == "1" then
            wps_2g_configured_setting = "false"
        else
            log.force(__FUNCTION__()..":"..__LINE__()..", wpsCurrentProfile_2G\[\"Conf\"\]="..wpsCurrentProfile_2G["Conf"]..", Out of valid range!!!!\n")
            wps_2g_configured_setting = "false"
        end
    end

    log.console(__FUNCTION__()..":"..__LINE__()..", wps_2g_configured_setting="..wps_2g_configured_setting)
    return wps_2g_configured_setting
end

function M.get_WPS_configured_setting_5g_forGUI()
    wpsCurrentProfile_5G = M.get_WPS_current_profile(MTK_DEF_5G_PRIMARY_IFNAME)
    local wps_5g_configured_setting = "true"

    if wpsCurrentProfile_5G ~= nil and type(wpsCurrentProfile_5G["Conf"]) == "number" then
        if tostring(wpsCurrentProfile_5G["Conf"]) == "2" then
            wps_5g_configured_setting = "true"
        elseif tostring(wpsCurrentProfile_5G["Conf"]) == "1" then
            wps_5g_configured_setting = "false"
        else
            log.force(__FUNCTION__()..":"..__LINE__()..", wpsCurrentProfile_5G\[\"Conf\"\]="..wpsCurrentProfile_5G["Conf"]..", Out of valid range!!!!\n")
            wps_5g_configured_setting = "false"
        end
    end

    log.console(__FUNCTION__()..":"..__LINE__()..", wps_5g_configured_setting="..wps_5g_configured_setting)
    return wps_5g_configured_setting
end

function M.get_WPS_client_mac_forGUI()
    local mac_2g = c_get_wps_client_macaddr(MTK_DEF_2G_PRIMARY_IFNAME)
    local mac_5g = c_get_wps_client_macaddr(MTK_DEF_5G_PRIMARY_IFNAME)
    local mac = ""

    if mac_2g["macaddr"] ~= "" then
        mac = mac_2g["macaddr"]
    elseif mac_5g["macaddr"] ~= "" then
        mac = mac_5g["macaddr"]
    end

    log.console(__FUNCTION__()..":"..__LINE__()..", client mac="..mac)
    return mac
end

return M
