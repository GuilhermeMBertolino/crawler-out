
--This wifi utility lua is using to convert the wireless settings(in LUA table format) between MTK and Netgear.
--For Netgear, it should be like GUI/SOAP structure or API. The idea is for easyily access by upper layer application, such as cgi or SOAP daemon.
--For MTK, it is using to create/combine(merge) to final LUA table of wireless settings. Then MTK wifi LUA API can easily use it to save/reload wifi functions.
local M = {}

function __FILE__() return debug.getinfo(2, 'S').short_src end -- or use .source
function __FUNCTION__() return debug.getinfo(2, 'n').name end
function __LINE__() return debug.getinfo(2, 'l').currentline end

package.path = '/lib/wifi/?.lua;'..package.path
local mtkwifi = require("mtkwifi")
require "commonFunc.wifiUtils_secModeMapping"
require "commonFunc.wifiUtils_wifiCountryCodeMapping"
require "commonFunc.wifiUtils_commDefs"
local netUtil = require "commonFunc.netUtils"
local interface = require "webGetFunc.interface"

local posix = require("posix")
local uci = require "luci.model.uci".cursor()
local uci_st = require "luci.model.uci".cursor(nil, "/var/state")
local json = require "luci.json"
local log = require "luci.log"
local sys  = require "luci.sys"
    log.debug(0)

local EBTABLES = "/usr/sbin/ebtables " --locally ebtables execution definition. Must have one space char at last for concatenating ebtables parameters.

log.console("\n")
log.console("====Debug Print, Start of "..__FILE__().."====")

local mtk_wirelessSettings_defValue = {
    DefaultKeyID = "1",
    FragThreshold = "2346",
    HT_AMSDU = "1",
    HT_AutoBA = "1",
    HT_GI = "1", --TODO: Check does GUI have this item or not.
    HT_LDPC = "1",
    HT_OpMode = "0",
    HT_PROTECT = "1",
    HT_STBC = "1",
    IEEE8021X = "0",
    IgmpSnEnable = "0", --TODO: should add UCI option to control. The "WAN Setup" has "IGMP Proxying" item.
    Key1Type = "0",
    Key2Type = "0",
    Key3Type = "0",
    Key4Type = "0",
    -- PMFMFPC = "1", -- Matt,20221024.Change MFPC behavior. the value should changed by security mode.
    PMFSHA256 = "0",
    PreAuth = "0", --Enable or disable WPA2 pre-Authentication mode. '0': disable, '1': enable.
    --RekeyMethod
    -- Matt, 20221025. MTK said this parameter should be disabled.
    VHT_BW_SIGNAL = "0", --Enable or disable 11ac bandwidth signaling. '0':disable, '1':static, '2':dynamic.
    VHT_LDPC = "1",
    VHT_SGI = "1",
    VHT_STBC = "1",
    WdsEnable = "0",
    WmmCapable = "1",
    WscConfMode = "7", --Configure WPS role. 3 bits integer. b'000(0): Disable, b'001(1): Enrollee, b'010(2): Proxy, b'100(4): Registrar.
    WscConfStatus = "2" --'1': AP is unconfigured, '2': AP is configured.
}

local mtk_wirelessSettings_specialAppendList = {
--    WdsPhyMode = "CCK", --==>be extend to "WdsPhyMode=CCK;CCK;CCK;CCK"
    WdsPhyMode = "CCK;CCK;CCK;CCK",
    --WEP1Type2 = "1",
    --WEP4Type2 = "1",
    --WEP3Type2 = "1",
    --WEP2Type2 = "1",
    WPSRadio = "0" --TODO: should add UCI option to control.
}

--Description: Append or simply assign default value to MTK's wireless setting config. It's special handling for the options may not provide to set from GUI/SOAP.
function set_wirelessSettings_defaultItems(wirelessSetting_luaTable, enableGuestNetwork)

    for key, value in pairs(mtk_wirelessSettings_defValue) do
        if enableGuestNetwork == "true" then
            wirelessSetting_luaTable[key] = (value..";"..value)
        else
            wirelessSetting_luaTable[key] = value
        end
    end
end

--Description: Special assign or delete for MTK's wireless setting config. Just observe MTK's Luci sample GUI did that. We don't know the correctly reason or assign for these options.
function set_wirelessSettings_specialItems(wirelessSetting_luaTable, enableGuestNetwork)

    for key, value in pairs(mtk_wirelessSettings_specialAppendList) do
        if enableGuestNetwork == "true" then
            wirelessSetting_luaTable[key] = value
        else
            if key == "WdsPhyMode" then
                wirelessSetting_luaTable[key] = "0"
            else
                wirelessSetting_luaTable[key] = nil
            end
        end
    end
end

function file_exists( name )
    local f=io.open(name,"r")
    if f~=nil then io.close(f) return true else return false end
end

local __mtkwifi_reload = function (devname)
    local wifi_restart = false
    local wifi_reload = false
    local profiles = mtkwifi.search_dev_and_profile()

    --for dev,profile in pairs(profiles) do
    --    if not devname or devname == dev then
    --        local diff = mtkwifi.diff_profile(profile)
    --        __process_settings_before_apply(dev, profile, diff)

    --        if diff.BssidNum or diff.WHNAT or diff.E2pAccessMode or diff.HT_RxStream or diff.HT_TxStream or diff.HE_LDPC or diff.WdsEnable then
    --            -- Addition or deletion of a vif requires re-installation of the driver.
    --            -- Change in WHNAT setting also requires re-installation of the driver.
    --            -- Driver will be re-installed by "wifi restart" command.
    --            wifi_restart = true
    --        else
    --            wifi_reload = true
    --        end

    --    end
    --end
    wifi_reload = true --Yocheng test, force doing "wifi reload" for applying newly setting.

    if wifi_restart then
        os.execute("wifi restart "..(devname or ""))
        log.console("wifi restart "..(devname or ""))
    elseif wifi_reload then
        os.execute("wifi reload "..(devname or ""))
        log.console("wifi reload "..(devname or ""))
    end

    for dev,profile in pairs(profiles) do
        if not devname or devname == dev then
            -- keep a backup for this commit
            -- it will be used in mtkwifi.diff_profile()
            os.execute("cp -f "..profile.." "..mtkwifi.__profile_applied_settings_path(profile))
            log.console("cp -f "..profile.." "..mtkwifi.__profile_applied_settings_path(profile))
        end
    end

    if map_help then
        local easymesh_applied_path = mtkwifi.__profile_applied_settings_path(mtkwifi.__read_easymesh_profile_path())
        os.execute("cp -f "..mtkwifi.__read_easymesh_profile_path().." "..easymesh_applied_path)
    end

    --Post action for MTK's workaround suggestion, ifconfig guestNetwork interface down if needed.
    wifiReload_postAction("2.4G", "0s")
    wifiReload_postAction("5G", "0s")
end

--Description: Internal using, for Netgear WiFi GUI and NTGR_WiFi uci, in actually the "mode" means whcich bandwidth be selected or be showed on uci/GUI.
--Input parameters:
--        whichBand: "2.4G" or "5G".
--        mtkWifiCfgs: a LUA table, that shold be generated and mapped from MTK's wireless setting config(mt7915.dbdc.b0.dat or mt7915.dbdc.b1.dat).
--        idx: vif index in MTK's wireless setting config. In most case, this value should be "1" for wireless radio characteristic. (Primary and Guest Network should using same wireless radio setting.)
--Output values:
--        one of "1" or "2" or "3". It's mapping to NTGR wifi GUI, "mode" selection list.
function getNTGR_wifiBwMode(whichBand, mtkWifiCfgs, idx)
    if type(wifiCfgs) ~= "table" then
        return "3"
    end

    local tmpWirelessMode = mtkwifi.__split(mtkWifiCfgs["WirelessMode"], ";")[tonumber(idx)]
    local tmpHT_BW = mtkwifi.__split(mtkWifiCfgs["HT_BW"], ";")[tonumber(idx)]
    local tmpVHT_BW = mtkwifi.__split(mtkWifiCfgs["VHT_BW"], ";")[tonumber(idx)]
    if whichBand == "2.4G" then
        if tmpWirelessMode == "16" or  tmpWirelessMode == "9" then
            if tmpHT_BW == "0" then
                return "2"
            elseif tmpHT_BW == "1" then
                return "3"
            end
        elseif tmpWirelessMode == "0" then
            if tmpHT_BW == "0" then
                return "1"
            --elseif tmpHT_BW == "1" then --Should NOT have this combination, WiFi GUI only support "54 Mbps", it should be g mode + 20Mhz bandwidth.
            --    return "2"
            end
        end
    elseif whichBand == "5G" then
        if tmpVHT_BW == "0" then --NO VHT, it means no 80MHz, 160MHz, 80+80MHz.
            if tmpHT_BW == "0" then --HT_BW is 20MHz, and VHT_BW is disable.
                return "1"
            elseif tmpHT_BW == "1" then --20/40 MHz
                return "2"
            end
        elseif tmpVHT_BW == "1" then --80MHz
            return "3"
        --elseif tmpVHT_BW == "2" then --160MHz, RAX5 not support.
        --elseif tmpVHT_BW == "3" then --80+80MHz, RAX5 not support.
        end
    end

    log.console("Can't find wifi mode + bandwidth combination for GUI showing, Use constant \"3\" to instead of. Please Debug it.")
    return "3"
end

--Function Name: update_NTGR_WiFi_uci()
--Input parameters: None.
--Output parameters: None.
--Description: When access this functoin one time, it will sync data from MTK wireless setting profile(.dat) to NTGR_WiFi uci.
--             Use /etc/config/NTGR_WiFi to store non-volatile and valid wireless parameters for Netgear style applications(GUI or SOAP or DAL etc...).
function M.update_NTGR_WiFi_uci( )
    local shuci = require("shuci")

    profilePathes = {MTK_2GWIFI_PROFILE, MTK_5GWIFI_PROFILE}
    devices = {"2G_INTF", "5G_INTF"}
    ifname_prefixes = {"ra", "rax"}
    local isNTGR_WiFi_uci_existed = file_exists(NTGR_WIFI_UCI_CONFIG_NAME)

    local uci = {}

    local i = 1 -- index of wifi-iface
    local ifaceCount = 1
        uci["iface"] = {}
    uci["wifi-device"]={}
    while i <= #profilePathes do
        uci["wifi-device"][i]={}
        local cfgs = mtkwifi.load_profile(profilePathes[i])
        uci["wifi-device"][i][".name"] = devices[i] --T.B.D: Set more useful information to this field.
        uci["wifi-device"][i]["type"] = devices[i] --T.B.D: Set more useful information to this field.
        --uci["wifi-device"][i]["vendor"] = "ralink"
        uci["wifi-device"][i]["iface"] = {}

        local j = 1
        log.console(__FUNCTION__().."\:"..__LINE__()..", cfgs.BssidNum="..cfgs.BssidNum)
        while j <= NTGR_WIFI_MAX_BSS_NUM do --No metter GuestNetwork setup or not, we need create all 2.4G/5G * primary/guest settings(in UCI format) for GUI showing.
            log.console(__FUNCTION__().."\:"..__LINE__()..", ifaceCount="..ifaceCount)
            uci["iface"][ifaceCount] = {}
            local iface = uci["iface"][ifaceCount]
            iface[".name"] = ifname_prefixes[i]..tostring(j-1) --Note: The value in ".name" can not contain '.' or it will cause "uci show" abnormally.
            iface["ifname"] = ifname_prefixes[i]..tostring(j-1)
            local ssid_idx = "SSID"..(j)
            iface["SSID"] = cfgs[ssid_idx]
            if ssid_idx == "SSID1" then --Fill UCI options for primary wifi network specifically.
                if isNTGR_WiFi_uci_existed == false then --If the NTGR_WiFi uci never existed, we set the "radioOn" to "true" as default value.
                    iface["radioOn"] = "true"
                    iface["wifiScheduleEnable"] = "false" --TODO: fill real value when wifi schedule implemented.
                    --2022.05.26, PegaBU6, YochengLian, Implemented for PA Sku and here is first time sync wifi driver dat file to UCI after factory default.
                    --The default countryCode in wifi driver dat file already be handled by uci-default/31_sync-pdata. No need to change for PA Sku implementation.
                    iface["wifiRegion"] = getWifiGUI_RegionByISO3166(mtkwifi.__split(cfgs["CountryCode"], ";")[tonumber(j)])
                end
                local tmpWirelessMode = mtkwifi.__split(cfgs["WirelessMode"], ";")[tonumber(j)]
                if tmpWirelessMode == "16" or tmpWirelessMode == "17" then
                    iface["enableAX"] = "true"
                else
                    iface["enableAX"] = "false"
                end
                --For now(2021.10.19), Netgear Home Router Spec 16a does NOT describe about OFDMA GUI item how to display "checked" or "un-check".
                --Checked with RAX30 implementation, they use OFDMA-DL + OFDMA-UL both enable/disable in same time. (Note: RAX30 is Broadcom platform.)
                --We also using same checking principle to show the OFDMA enable/disable for 2.4G and 5G interface.
                --It still needs to check with MTK where it is correctly value or not.
                if mtkwifi.__split(cfgs["MuOfdmaDlEnable"], ";")[tonumber(j)] == "true" and mtkwifi.__split(cfgs["MuOfdmaUlEnable"], ";")[tonumber(j)] == "true" then
                    iface["enableOFDMA"] = "true"
                else
                    iface["enableOFDMA"] = "false"
                end
                --By MTK WCNR00251947 suggestion, in MT7915 and using standalone Bandteering2.0. The wireless profile .dat file needs to set "MapMode=2" and "BandSteering=0".
                --"MapMode=2" represents using "BandSteering2.0"(BS2.0).
                if mtkwifi.__split(cfgs["BandSteering"], ";")[tonumber(j)] == "0" and mtkwifi.__split(cfgs["MapMode"], ";")[tonumber(j)] == "2" then
                    iface["smartConnect"] = "true"
                else
                    iface["smartConnect"] = "false"
                end
                iface["channel"] = mtkwifi.__split(cfgs["Channel"], ";")[tonumber(j)]
                iface["ctsrtsThreshhold"] = mtkwifi.__split(cfgs["RTSThreshold"], ";")[tonumber(j)]
                iface["txPreambleMode"] = mtkwifi.__split(cfgs["TxPreamble"], ";")[tonumber(j)] --Watch out, the '2' means "Auto" for/from MTK's wireless profile settings.
                iface["txTPC"] = mtkwifi.__split(cfgs["TxPower"], ";")[tonumber(j)]
                --if mtkwifi.__split(cfgs["MuMimoDlEnable"], ";")[tonumber(j)] == "1" and mtkwifi.__split(cfgs["MuMimoUlEnable"], ";")[tonumber(j)] == "1" then
                if mtkwifi.__split(cfgs["MuMimoDlEnable"], ";")[tonumber(j)] == "1" then
                    iface["enableMuMimo"] = "true"
                else
                    iface["enableMuMimo"] = "false"
                end
                if mtkwifi.__split(cfgs["ITxBfEn"], ";")[tonumber(j)] == "1" then
                    iface["enableBeamforming"] = "true"
                else
                    iface["enableBeamforming"] = "false"
                end
                --Matt, 20221024. Change PMFMFPR behavior. The value should be changed by security mode. Here, always return false to UCI db.
                iface["disablePMF"] = "false"
                --if mtkwifi.__split(cfgs["PMFMFPR"], ";")[tonumber(j)] == "0" then
                --    iface["disablePMF"] = "true"
                --else
                --    iface["disablePMF"] = "false"
                --end
                if mtkwifi.__split(cfgs["VOW_Airtime_Fairness_En"], ";")[tonumber(j)] == "1" then
                    iface["enableATF"] = "true"
                else
                    iface["enableATF"] = "false"
                end
                local tmpVifIdx = j
                if devices[i] == "2G_INTF" then --2.4G specific characteristic.
                    if cfgs["HT_BSSCoexistence"] == "1" then
                        iface["BSSCoexistence"] = "true"
                    else
                        iface["BSSCoexistence"] = "false"
                    end
                    iface["bwMode"] = getNTGR_wifiBwMode("2.4G", cfgs, tmpVifIdx) --In most case, the vifIdx should be "1" to get wifi radio bandwidth.
                elseif devices[i] == "5G_INTF" then --5G specific characteristic.
                    iface["bwMode"] = getNTGR_wifiBwMode("5G", cfgs, tmpVifIdx) --In most case, the vifIdx should be "1" to get wifi radio bandwidth.
                end
            elseif ssid_idx == "SSID2" then --Fill UCI options for guest wifi network specifically.
                if isNTGR_WiFi_uci_existed == false then --If the NTGR_WiFi uci never existed, we set the "guestEnable" to "false" as default value.
                    iface["guestEnable"] = "false"
                else
                --if tonumber(cfgs.BssidNum) > 1 then --Try to follow MTK's workaround suggestion, always set BssidNum=2 for 2.4G and 5G to avoid reboot DUT to apply correctly Guest Network setting.
                --    iface["guestEnable"] = "true"
                --else
                --    iface["guestEnable"] = "false"
                --end
                end
                if mtkwifi.__split(cfgs["NoForwarding"], ";")[tonumber(j)] ~= nil and mtkwifi.__split(cfgs["NoForwarding"], ";")[tonumber(j)] == "0" then
                    iface["allowAccessLAN"] = "true"
                else
                    iface["allowAccessLAN"] = "false" --default value.
                end
            else --If there's SSID3 or SSID4 or more in the future.
                iface["mode"] = "ap" --Dummy value, T.B.D: Set more useful information to this field.
                iface["network"] = "wlan" --Dummy value, T.B.D: Set more useful information to this field.
            end

            --log.console("mtkwifi\.__split\(wifiCfgs\.HideSSID\,\"\;\"\)\[1\]="..mtkwifi.__split(wifiCfgs.HideSSID,";")[1])
            --log.console("mtkwifi\.__split\(wifiCfgs\.HideSSID\,\"\;\"\)\[2\]="..mtkwifi.__split(wifiCfgs.HideSSID,";")[2])
            if mtkwifi.__split(cfgs["HideSSID"],";")[tonumber(j)] ~= nil and mtkwifi.__split(cfgs["HideSSID"],";")[tonumber(j)] == "1" then
                iface["SSIDBroadcast"] = "false"
            else
                iface["SSIDBroadcast"] = "true" --default value.
            end

            iface["securityType"] = getWifiSecModeByDesc( mtkwifi.__split(cfgs["AuthMode"],";")[tonumber(j)] )
            iface["wpaPassphrase"] = cfgs["WPAPSK"..(j)]
            --For Netgear GUI's definition, only value "4"(WPA1WPA2) represent the security using RADUIS related setting and we will fill it in NTGR_WiFi uci.
            if iface["securityType"] == "4" then
                iface["encryptMode"] = getWifiRadiusEncModeByDesc( mtkwifi.__split(cfgs["EncrypType"],";")[tonumber(j)] )
                iface["reKeyInterval"] = mtkwifi.__split(cfgs["RekeyInterval"],";")[tonumber(j)] --Group key rekey(update key) interval in actually. However, NTGR GUI no more show it up.
                iface["radiusIP"] = mtkwifi.__split(cfgs["RADIUS_Server"],";")[tonumber(j)]
                iface["radiusPort"] = mtkwifi.__split(cfgs["RADIUS_Port"],";")[tonumber(j)]
                iface["radiusSecret"] = mtkwifi.__split(cfgs["RADIUS_Key"..(j)],";")[tonumber(j)]
            else
                if isNTGR_WiFi_uci_existed == false then --If the NTGR_WiFi uci never existed, we need to fill the "encryptMode" item in NTGR_WiFi uci if the security type is not RADIUS.
                    if iface["securityType"] == "1" then
                        iface["encryptMode"] = "-1" --NONE
                    elseif iface["securityType"] == "3" then
                        iface["encryptMode"] = "1" --TKIPAES
                    else --The '2'(WPA2PSK), '5'(WPA3PSK), '6'(WPA2PSKWPA3PSK) GUI security options.
                        iface["encryptMode"] = "0" --AES
                    end
                end
            end

            ifaceCount=ifaceCount+1
            j=j+1
        end
        i=i+1
    end
    if isNTGR_WiFi_uci_existed == false then
        local iface
        uci["iface"][ifaceCount] = {}
        iface = uci["iface"][ifaceCount]
        iface[".name"] = MTK_DEF_2G_CLIENT_IFNAME --Note: The value in ".name" can not contain '.' or it will cause "uci show" abnormally.
        iface["ifname"] = MTK_DEF_2G_CLIENT_IFNAME
        ifaceCount=ifaceCount+1
        uci["iface"][ifaceCount] = {}
        iface = uci["iface"][ifaceCount]
        iface[".name"] = MTK_DEF_5G_CLIENT_IFNAME --Note: The value in ".name" can not contain '.' or it will cause "uci show" abnormally.
        iface["ifname"] = MTK_DEF_5G_CLIENT_IFNAME
    end

    --log.console_r(uci)
    shuci.encode(uci, "\/etc\/config\/"..NTGR_WIFI_UCI_CONFIG_NAME)
end

function create_mtk_wireless_setting_table( devname )
    local devs = mtkwifi.get_all_devs()
    local wifiProfile = devs[devname].profile
    assert(type(wifiProfile) == "string", "type of wifiProfile is NOT string, abort to execute!")
    local wifiSettingTable = mtkwifi.load_profile(wifiProfile)

    return wifiSettingTable
end

function create_mtk_wireless_setting_table_forRecovery( devname )
    --local devs = mtkwifi.get_all_devs()
    --local wifiProfile = devs[devname].profile
    --assert(type(wifiProfile) == "string", "type of wifiProfile is NOT string, abort to execute!")
    local wifiSettingTable = nil
    if devname == MTK_2GWIFI_DEVNAME then
        wifiSettingTable = mtkwifi.load_profile("/rom/"..MTK_2GWIFI_PROFILE)
    elseif devname == MTK_5GWIFI_DEVNAME then
        wifiSettingTable = mtkwifi.load_profile("/rom"..MTK_5GWIFI_PROFILE)
    end

    return wifiSettingTable
end

--Description: This functoin is using to compare two lua table(wireless settings).
--             It also compares the setting to write to/read from "/etc/map/mapd_user.cfg", that's for smartConnect feature.
--Return Values: 1st, true or false, if any wireless changed.
--               2nd, true or false, special check for "MapMode" + "BandSteering". Refer from MTK's implement, althoughput we don't have "/usr/bin/map_restart.sh" for now.
--                                   But we still leave dotted line for future.
function compare_new_and_curr_wirelessSettings(whichBand, new_wifiSettingTable, curr_wifiSettingTable)

    local mapModeChanged = false
    if (new_wifiSettingTable["MapMode"] ~= curr_wifiSettingTable["MapMode"]) or (new_wifiSettingTable["BandSteering"] ~= curr_wifiSettingTable["BandSteering"]) then
        mapModeChanged = true
    end

    for key, value in pairs(curr_wifiSettingTable) do --Maybe we need create a constant structure
                                                      --(list which wireless settings need to check)
                                                      --rather than using one of new or old setting as base-line.
        -- if key == "Channel" then --special key for different checking by 2.4G and 5G needed.
        --     if whichBand == "2.4G" then
        --         -- Do special compare for wifi 2.4G.
        --     elseif whichBand == "5G" then
        --         -- Do special compare for wifi 5G.
        --     end
        -- else
        if curr_wifiSettingTable[key] ~= new_wifiSettingTable[key] then
            log.console("\tGot new wireless setting, for "..whichBand..", key="..key..", currValue="..tostring(curr_wifiSettingTable[key])..", newValue="..tostring(new_wifiSettingTable[key]))
            return true, mapModeChanged
        end
    end

    for key, value in pairs(new_wifiSettingTable) do  --Maybe we need create a constant structure
                                                      --(list which wireless settings need to check)
                                                      --rather than using one of new or old setting as base-line.
        -- if key == "Channel" then --special key for different checking by 2.4G and 5G needed.
        --     if whichBand == "2.4G" then
        --         -- Do special compare for wifi 2.4G.
        --     elseif whichBand == "5G" then
        --         -- Do special compare for wifi 5G.
        --     end
        -- else
        if new_wifiSettingTable[key] ~= curr_wifiSettingTable[key] then
            log.cosole("\tGot new wireless setting, for "..whichBand..", key="..key..", currValue="..tostring(curr_wifiSettingTable[key])..", newValue="..tostring(new_wifiSettingTable[key]))
            return true, mapModeChanged
        end
    end
    return false, mapModeChanged
end

--Refer package/luci/applications/luci-app-mtk/luasrc/controller/mtkwifi.lua, map_cfg().
--Description: This function includes comparsion and migration about the newly mpad's user config to currently one.
--Return value: true --/etc/map/mapd_user.cfg has different or newly item/value.
--              false --Not found newly item/value be changed in /etc/map/mapd_user.cfg
function write_mapd_cfg( newMpadUserCfg_luaTable )
    local mapdUserCfg_changed = false
    local easymesh_cfgs = mtkwifi.load_profile(mtkwifi.__write_easymesh_profile_path())
    --assert(easymesh_cfgs)
    assert(easymesh_cfgs, __FUNCTION__()..":"..__LINE__()..", Could not get currently mapd user cfg, abort to execute!")
    assert(newMpadUserCfg_luaTable, __FUNCTION__()..":"..__LINE__()..", Could not get newly mapd user cfg, abort to execute!")
    for k,v in pairs( newMpadUserCfg_luaTable ) do
        if type(v) ~= type("") and type(v) ~= type(0) then
            log.console("map_cfg: Invalid value type for "..k..","..type(v))
        elseif string.byte(k) ~= string.byte("_") then
        --I think the '_' in line-head may be used internally by MTK's wireless driver or it's like comment(like '#' in line-head).
        --Other key-value tuple without this line-head should be normally setting.
            if (easymesh_cfgs[k] == nil) or (easymesh_cfgs[k] and easymesh_cfgs[k] ~= v) then
                log.console("map_cfg: Adding/Copying key:"..k..","..type(v))
                easymesh_cfgs[k] = v or ""
                mapdUserCfg_changed = true
            elseif v == nil then
                log.console("map_cfg: Try to remove key:"..k..","..type(v)..", Action NOT support!")
            end
        end
    end

    --local bands = mtkwifi.detect_triband()
    --if bands ~= 3 then
    --    easymesh_cfgs['BhPriority5GH'] = easymesh_cfgs['BhPriority5GL']
    --end

    --We may not need this. save_easymesh_driver_profile(easymesh_cfgs)
    if mapdUserCfg_changed == true then
        mtkwifi.save_write_easymesh_profile(easymesh_cfgs)
    end
    --if http.formvalue("__apply") then
    --    if mtkwifi.exists("/usr/bin/map_restart.sh") then
    --        mtkwifi.__run_in_child_env(exec_map_restart)
    --    else
    --        mtkwifi.__run_in_child_env(__mtkwifi_reload)
    --    end

    --    local url_to_visit_after_reload = luci.dispatcher.build_url("admin", "mtk", "multi_ap")
    --    luci.http.redirect(luci.dispatcher.build_url("admin", "mtk", "wifi", "loading",url_to_visit_after_reload))
    --else
    --    luci.http.redirect(luci.dispatcher.build_url("admin", "mtk", "multi_ap"))
    --end

    return mapdUserCfg_changed
end

--Function Name: merge_uciSettings_to_wirelessTable()
--Input parameters:
--        whichBand: "2.4G" or "5G"
--        numOfIntf: How many wireless interface needs to configure in MTK's wireless setting profile. In most case for Netgear style implementation, it should be "2".
--        wifiSettingTable: Target LUA wifi setting table to merge
--        forRecovery: We found unexpected contain in MTK's wireless when booting can cause wireless interface can't be brought up.
--                     The valid value for now is "forRecovery".
--Return values:
--        1. result string
--        2. wireless setting table with merged newly settings that come from Netgear WiFi uci.
--Description: Call this function to merge/sync NTGR_WiFi uci to MTK's wireless settings into LUA table.
--             Return the LUA table if no failed of the merged action.
--function M.merge_uciSettings_to_wirelessTable(whichBand, numOfIntf, wifiSettingTable, uciSection)
function merge_uciSettings_to_wirelessTable( whichBand, forRecovery )
--function merge_uciSettings_to_wirelessTable( whichBand, caller)
--for future and SOAP, if it's coming from SOAP or partially set wireless setting, we using another temporary uci file to store settings
--until all of these partially settings be setup or finish function be called, we apply the setting to real wireless config file(+wifi reload/reboot) and snyc to /var/state/NTGR_WiFi once.
--{
    local uci    = require "luci.model.uci".cursor()
    --local uci_st = require "luci.model.uci".cursor("/var/state", "/var/state") --Naming the local variable with "_st" to mean it's using to access "/var/state" uci.
    --                                                                           --If we want to get/set UCI that mixed /etc/config/XXXX and /var/state/XXXX at same time,
    --                                                                           --the parameters for cursor() should be (nil, "/var/state") or ("/etc/config", "/var/state").
    local targetDevName = nil
    local primaryWiFi_uciSectionName = nil
    local guestWiFi_uciSectionName = nil
    local clientWiFi_uciSectionName = nil
    if whichBand == "2.4G" then
        targetDevName = MTK_2GWIFI_DEVNAME
        primaryWiFi_uciSectionName = MTK_DEF_2G_PRIMARY_IFNAME
        guestWiFi_uciSectionName = MTK_DEF_2G_GUEST_IFNAME
        clientWiFi_uciSectionName = MTK_DEF_2G_CLIENT_IFNAME
    elseif whichBand == "5G" then
        targetDevName = MTK_5GWIFI_DEVNAME
        primaryWiFi_uciSectionName = MTK_DEF_5G_PRIMARY_IFNAME
        guestWiFi_uciSectionName = MTK_DEF_5G_GUEST_IFNAME
        clientWiFi_uciSectionName = MTK_DEF_5G_CLIENT_IFNAME
    else
        return "Invalid band chosed!"
    end

    local new_wifiCfgs = nil
    if type(forRecovery) == type("string") and forRecovery == "forRecovery" then
        new_wifiCfgs = create_mtk_wireless_setting_table_forRecovery(targetDevName)
    else --Normal case.
        new_wifiCfgs = create_mtk_wireless_setting_table(targetDevName)
    end
    if type(new_wifiCfgs) ~= "table" then
        log.force(__FUNCTION__()..":"..__LINE__()..", Cannot get LUA table pointer from input path, abort to merge LUA table for setting wireless!\n")
        return "Failed", nil, nil
    end

    --local new_wifi5gCfgs = create_mtk_wireless_setting_table(MTK_5GWIFI_DEVNAME)
    local wifiPrimary_broadcastSSID = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, primaryWiFi_uciSectionName, "SSIDBroadcast")
    local wifiGuest_broadcastSSID = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, guestWiFi_uciSectionName, "SSIDBroadcast")
    new_wifiCfgs["HideSSID"] = ((wifiPrimary_broadcastSSID == "true" and "0" or "1")..";"..(wifiGuest_broadcastSSID == "true" and "0" or "1"))
    local enableGuestNetwork = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, guestWiFi_uciSectionName, "guestEnable")
    --if enableGuestNetwork == "true" then
    --    new_wifiCfgs["BssidNum"] = "2"
    --else
    --    new_wifiCfgs["BssidNum"] = "1"
    --end
    --For MTK's workaround suggestion, always keeps the "BssidNum" to 2 and uses "ifconfig" to down the guest network interface(ra1 or rax1) if needed.
    new_wifiCfgs["BssidNum"] = "2"

    local allowAccessLAN = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, guestWiFi_uciSectionName, "allowAccessLAN")
    if allowAccessLAN == "true" then
        new_wifiCfgs["NoForwarding"] = "0;0"
        new_wifiCfgs["NoForwardingBTNBSSID"] = "0;0"
    else
        new_wifiCfgs["NoForwarding"] = "0;1"
        new_wifiCfgs["NoForwardingBTNBSSID"] = "0;1"
    end
    if whichBand == "2.4G" then
        local wifi2G_coexistence = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, primaryWiFi_uciSectionName, "BSSCoexistence")
        new_wifiCfgs["HT_BSSCoexistence"] = (wifi2G_coexistence == "true" and "1" or "0")
    end
    if uci:get(NTGR_WIFI_UCI_CONFIG_NAME, primaryWiFi_uciSectionName, "enableOFDMA") == "true" then
        new_wifiCfgs["MuOfdmaDlEnable"] = "1"
        new_wifiCfgs["MuOfdmaUlEnable"] = "1"
    else
        new_wifiCfgs["MuOfdmaDlEnable"] = "0"
        new_wifiCfgs["MuOfdmaUlEnable"] = "0"
    end
    local smartConnect_setting = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, primaryWiFi_uciSectionName, "smartConnect")
    --local mapd_userCfg_luaTable = { DeviceRole = "2", CentralizedSteering = "0"} --SDK default value.
    if smartConnect_setting ~= nil and smartConnect_setting == "true" then
        new_wifiCfgs["MapMode"] = "2"
        new_wifiCfgs["BandSteering"] = "0"
        --mapd_userCfg_luaTable["DeviceRole"] = "1"
        --mapd_userCfg_luaTable["CentralizedSteering"] = "0"
    else
        new_wifiCfgs["MapMode"] = "0"
        new_wifiCfgs["BandSteering"] = "0"
        --mapd_userCfg_luaTable["DeviceRole"] = "2"
        --mapd_userCfg_luaTable["CentralizedSteering"] = "0"
    end
    --needReluanchMapd = write_mapd_cfg( mapd_userCfg_luaTable )
    new_wifiCfgs["SSID1"] = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, primaryWiFi_uciSectionName, "SSID")
    new_wifiCfgs["SSID2"] = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, guestWiFi_uciSectionName, "SSID")
    local enableAX = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, primaryWiFi_uciSectionName, "enableAX")
    local iso3166_countryCode = getISO3166byWifiGUI_Region(uci:get(NTGR_WIFI_UCI_CONFIG_NAME, primaryWiFi_uciSectionName, "wifiRegion"))
    local nmrpSku = uci_st:get("netgear", "board", "sku")
    local ipLocation_region = uci_st:get("ipLocation", "info", "country")
    local PAS_countryCode = getAutoWifiRegionMapping(ipLocation_region)
    --2022.07.21, PegaBU6, YochengLian, Netgear PE urgent requirement to sync PA Sku behavior for US and CA sku and for beta user release.
    if nmrpSku ~= nil and (nmrpSku == "PA" or nmrpSku == "US" or nmrpSku == "CA") then
        if ipLocation_region ~= nil and type(ipLocation_region) == type("") then
            new_wifiCfgs["CountryCode"] = (PAS_countryCode ~= nil and PAS_countryCode or "CA") --If we can't find the country mapping for PA Sku, the default value is CA(Canada).
                                                                                               --SKU_Consolidation_V0.8_5_2022050.pptx, page 8.
                                                                                               --Note: The returned value from getAutoWifiRegionMapping() must be one of ISO3166-1 and it is using to feed to MTK wifi driver.
            local powerTableIndex = getPowerTableIndex_by_NtgrWifiRegion(PAS_countryCode)
            new_wifiCfgs["SkuTableIdx"] = (powerTableIndex ~= nil and powerTableIndex or "1") --If we can't find the power table index mapping, the default value is "1"(for Canada).
        else
            new_wifiCfgs["CountryCode"] = "CA"
        end
    else
        new_wifiCfgs["CountryCode"] = (iso3166_countryCode ~= nil and iso3166_countryCode or "US")
    end
    local bwSelection = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, primaryWiFi_uciSectionName, "bwMode") --The value is mapped to GUI's selection list.
    if whichBand == "2.4G" then
        if  bwSelection == "1" and enableAX == "false" then --WiFi GUI, 54Mbps.
            new_wifiCfgs["WirelessMode"] = (enableGuestNetwork == "true" and "0;0" or "0") --No more WEP security option, "Up to 54Mbps" should be mapping to b/g mixed mode.
            new_wifiCfgs["HT_BW"] = 0 --20 MHz.
        elseif bwSelection == "2" then
            if enableAX == "true" then
                new_wifiCfgs["WirelessMode"] = (enableGuestNetwork == "true" and "16;16" or "16") --bgn/AX mixed mode.
            else
                new_wifiCfgs["WirelessMode"] = (enableGuestNetwork == "true" and "9;9" or "9") --bgn mixed mode.
            end
            new_wifiCfgs["HT_BW"] = "0" --20 MHz.
        elseif bwSelection == "3" then
            if enableAX == "true" then
                new_wifiCfgs["WirelessMode"] = (enableGuestNetwork == "true" and "16;16" or "16") --bgn/AX mixed mode.
            else
                new_wifiCfgs["WirelessMode"] = (enableGuestNetwork == "true" and "9;9" or "9") --bgn mixed mode.
            end
            new_wifiCfgs["HT_BW"] = "1" --20/40 MHz.
        end
        new_wifiCfgs["CountryRegion"] = get24gSupportedChannelByNtgrWirelessRegion(iso3166_countryCode)
        local wifi24g_ChannelSetting = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, primaryWiFi_uciSectionName, "channel")
        if wifi24g_ChannelSetting ~= "0" then
            new_wifiCfgs["AutoChannelSelect"] = "0"
            new_wifiCfgs["Channel"] = wifi24g_ChannelSetting
        else
            new_wifiCfgs["AutoChannelSelect"] = "3"
            new_wifiCfgs["Channel"] = "0"
        end
    elseif whichBand == "5G" then
        if enableAX == "true" then
            new_wifiCfgs["WirelessMode"] = (enableGuestNetwork == "true" and "17;17" or "17") --A/AN/AC/AX mixed mode.
        else
            new_wifiCfgs["WirelessMode"] = (enableGuestNetwork == "true" and "15;15" or "15") --A/AN/AC mixed mode.
        end
        if bwSelection == "1" then --WiFi GUI. 5G rate.
            new_wifiCfgs["HT_BW"] = 0 --20 MHz.
            new_wifiCfgs["VHT_BW"] = "0" --disable VHT.
        elseif bwSelection == "2" then
            new_wifiCfgs["HT_BW"] = "1" --20/40 MHz.
            new_wifiCfgs["VHT_BW"] = "0" --disable VHT.
        elseif bwSelection == "3" then
            new_wifiCfgs["HT_BW"] = "1" --20/40 MHz.
            new_wifiCfgs["VHT_BW"] = "1" --80 MHz.
        end
        --2022.05.27, PegaBU6, YochengLian, To support PA Sku(Pan north America Sku). Set correctly "CountryRegionABand" for PA Sku.
        --2022.07.21, PegaBU6, YochengLian, Netgear PE urgent requirement to sync PA Sku behavior for US and CA sku and for beta user release.
        if nmrpSku ~= nil and (nmrpSku == "PA" or nmrpSku == "US" or nmrpSku == "CA") then
           if PAS_countryCode ~= nil and type(PAS_countryCode) == type("") then
               new_wifiCfgs["CountryRegionABand"] = get5gSupportedChannelByNtgrWirelessRegion(PAS_countryCode)
           else --Worst case, in PA Sku but no get ipLocation "country" info, still use the wifiRegion in UCI to find the mapped "CountryRegionABand" for MTK driver using.
               new_wifiCfgs["CountryRegionABand"] = get5gSupportedChannelByNtgrWirelessRegion(iso3166_countryCode)
           end
        else
            new_wifiCfgs["CountryRegionABand"] = get5gSupportedChannelByNtgrWirelessRegion(iso3166_countryCode)
        end
        new_wifiCfgs["Channel"] = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, primaryWiFi_uciSectionName, "channel")
    end
    new_wifiCfgs["WPAPSK1"] = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, primaryWiFi_uciSectionName, "wpaPassphrase")
    new_wifiCfgs["WPAPSK2"] = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, guestWiFi_uciSectionName, "wpaPassphrase")
    local wifiPrimary_secDesc = getWifiSecDescByChosedNum( uci:get(NTGR_WIFI_UCI_CONFIG_NAME, primaryWiFi_uciSectionName, "securityType") )
    local wifiGuest_secDesc = getWifiSecDescByChosedNum( uci:get(NTGR_WIFI_UCI_CONFIG_NAME, guestWiFi_uciSectionName, "securityType") )
    if wifiGuest_secDesc ~= nil and wifiPrimary_secDesc ~= nil then
        new_wifiCfgs["AuthMode"] = wifiPrimary_secDesc..";"..wifiGuest_secDesc
    elseif wifiGuest_secDesc ~= nil and wifiPrimary_secDesc == nil then
        new_wifiCfgs["AuthMode"] = "OPEN;"..wifiGuest_secDesc
    elseif wifiGuest_secDesc == nil and wifiPrimary_secDesc ~= nil then
        new_wifiCfgs["AuthMode"] = wifiPrimary_secDesc
    else
        if enableGuestNetwork == "true" then
            new_wifiCfgs["AuthMode"] = "OPEN;OPEN"
        else
            new_wifiCfgs["AuthMode"] = "OPEN"
        end
    end

    -- Matt, 20221024. PMFMFPC/PMFMFPR value will depend on the Wi-Fi autumode
    local wifiPrimary_secType = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, primaryWiFi_uciSectionName, "securityType")
    local wifiGuest_secType = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, guestWiFi_uciSectionName, "securityType")
    if enableGuestNetwork ~= "true" then
        wifiGuest_secType = "0" -- for default value
    end
    new_wifiCfgs["PMFMFPC"] = getWifiMFPCByUCISecType(wifiPrimary_secType, wifiGuest_secType)
    new_wifiCfgs["PMFMFPR"] = getWifiMFPRByUCISecType(wifiPrimary_secType, wifiGuest_secType)

    --In therioral, Netgear GUI does not provide guest network to set WPAn enterprise options.
    --But here we still implement the common conversion for WPAn enterprise for each SSID.
    local wifiPrimary_encryptDesc = getWifiRadiusEncDescByChosedNum( uci:get(NTGR_WIFI_UCI_CONFIG_NAME, primaryWiFi_uciSectionName, "encryptMode") )
    local wifiGuest_encryptDesc = getWifiRadiusEncDescByChosedNum( uci:get(NTGR_WIFI_UCI_CONFIG_NAME, guestWiFi_uciSectionName, "encryptMode") )
    if wifiGuest_encryptDesc ~= nil and wifiPrimary_encryptDesc ~= nil then
        new_wifiCfgs["EncrypType"] = wifiPrimary_encryptDesc..";"..wifiGuest_encryptDesc
    elseif wifiGuest_encryptDesc ~= nil and wifiPrimary_encryptDesc == nil then
        new_wifiCfgs["EncrypType"] = "NONE;"..wifiGuest_encryptDesc
    elseif wifiGuest_encryptDesc == nil and wifiPrimary_encryptDesc ~= nil then
        new_wifiCfgs["EncrypType"] = wifiPrimary_encryptDesc
    else
        if enableGuestNetwork == "true" then
            new_wifiCfgs["EncrypType"] = "NONE;NONE"
        else
            new_wifiCfgs["EncrypType"] = "NONE"
        end
    end
    local wifiPrimary_radiusIP = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, primaryWiFi_uciSectionName, "radiusIP")
    local wifiGuest_radiusIP = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, guestWiFi_uciSectionName, "radiusIP")
    if wifiGuest_radiusIP ~= nil and wifiPrimary_radiusIP ~= nil then
        new_wifiCfgs["RADIUS_Server"] = wifiPrimary_radiusIP..";"..wifiGuest_radiusIP
    elseif wifiGuest_radiusIP ~= nil and wifiPrimary_radiusIP == nil then
        new_wifiCfgs["RADIUS_Server"] = "0;"..wifiGuest_radiusIP
    elseif wifiGuest_radiusIP == nil and wifiPrimary_radiusIP ~= nil then
        new_wifiCfgs["RADIUS_Server"] = wifiPrimary_radiusIP
    else
        if enableGuestNetwork == "true" then
            new_wifiCfgs["RADIUS_Server"] = "0;0"
        else
            new_wifiCfgs["RADIUS_Server"] = "0"
        end
    end
    local wifiPrimary_radiusPort = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, primaryWiFi_uciSectionName, "radiusPort")
    local wifiGuest_radiusPort = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, guestWiFi_uciSectionName, "radiusPort")
    if wifiGuest_radiusPort ~= nil and wifiPrimary_radiusPort ~= nil then
        new_wifiCfgs["RADIUS_Port"] = wifiPrimary_radiusPort..";"..wifiGuest_radiusPort
    elseif wifiGuest_radiusPort ~= nil and wifiPrimary_radiusPort == nil then
        new_wifiCfgs["RADIUS_Port"] = "1812;"..wifiGuest_radiusPort
    elseif wifiGuest_radiusPort == nil and wifiPrimary_radiusPort ~= nil then
        new_wifiCfgs["RADIUS_Port"] = wifiPrimary_radiusPort
    else
        if enableGuestNetwork == "true" then
            new_wifiCfgs["RADIUS_Port"] = "1812;1812"
        else
            new_wifiCfgs["RADIUS_Port"] = "1812"
        end
    end
    new_wifiCfgs["RADIUS_Key1"] = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, primaryWiFi_uciSectionName, "radiusSecret")
    new_wifiCfgs["RADIUS_Key2"] = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, guestWiFi_uciSectionName, "radiusSecret")
    local wifiPrimary_reKeyInterval = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, primaryWiFi_uciSectionName, "reKeyInterval")
    local wifiGuest_reKeyInterval = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, guestWiFi_uciSectionName, "reKeyInterval")
    if wifiGuest_reKeyInterval ~= nil and wifiPrimary_reKeyInterval ~= nil then
        new_wifiCfgs["RekeyInterval"] = wifiPrimary_reKeyInterval..";"..wifiGuest_reKeyInterval
        new_wifiCfgs["RekeyMethod"] = "TIME;TIME"
    elseif wifiGuest_reKeyInterval ~= nil and wifiPrimary_reKeyInterval == nil then
        new_wifiCfgs["RekeyInterval"] = "3600;"..wifiGuest_reKeyInterval
        new_wifiCfgs["RekeyMethod"] = "DISABLE;TIME"
    elseif wifiGuest_reKeyInterval == nil and wifiPrimary_reKeyInterval ~= nil then
        new_wifiCfgs["RekeyInterval"] = wifiPrimary_reKeyInterval
        new_wifiCfgs["RekeyMethod"] = "TIME;"
    else
        if enableGuestNetwork == "true" then
            new_wifiCfgs["RekeyInterval"] = "3600;3600"
        else
            new_wifiCfgs["RekeyInterval"] = "3600"
        end
    end

    --Wireless Advanced Settings--
    local ctsrtsThreshold = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, primaryWiFi_uciSectionName, "ctsrtsThreshhold")
    if enableGuestNetwork == "true" then
        new_wifiCfgs["RTSThreshold"] = ctsrtsThreshold..";"..ctsrtsThreshold
    else
        new_wifiCfgs["RTSThreshold"] = ctsrtsThreshold
    end
    new_wifiCfgs["TxPreamble"] = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, primaryWiFi_uciSectionName, "txPreambleMode")
    new_wifiCfgs["TxPower"] = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, primaryWiFi_uciSectionName, "txTPC")
    if uci:get(NTGR_WIFI_UCI_CONFIG_NAME, primaryWiFi_uciSectionName, "enableBeamforming") == "true" then
        new_wifiCfgs["ITxBfEn"] = "1" --Enable implicit TX beamforming.
    else
        new_wifiCfgs["ITxBfEn"] = "0" --Disable implicit TX beamforming.
    end
    if uci:get(NTGR_WIFI_UCI_CONFIG_NAME, primaryWiFi_uciSectionName, "enableMuMimo") == "true" then
        new_wifiCfgs["MuMimoDlEnable"] = "1"
        --new_wifiCfgs["MuMimoUlEnable"] = "1"
    else
        new_wifiCfgs["MuMimoDlEnable"] = "0"
        --new_wifiCfgs["MuMimoUlEnable"] = "0"
    end
    --Matt, 20221024. PMFMFPR will be changed by security mode.
    --if uci:get(NTGR_WIFI_UCI_CONFIG_NAME, primaryWiFi_uciSectionName, "disablePMF") == "true" then
    --    if enableGuestNetwork == "true" then
    --        new_wifiCfgs["PMFMFPR"] = "0;0" --Disable Protection Management Frame Required.
    --    else
    --        new_wifiCfgs["PMFMFPR"] = "0"
    --    end
    --else
    --    if enableGuestNetwork == "true" then
    --        new_wifiCfgs["PMFMFPR"] = "1;1" --Enable Protection Management Frame Required.
    --    else
    --        new_wifiCfgs["PMFMFPR"] = "1" --Enable Protection Management Frame Required.
    --    end
    --end
    if uci:get(NTGR_WIFI_UCI_CONFIG_NAME, primaryWiFi_uciSectionName, "enableATF") == "true" then
        new_wifiCfgs["VOW_Airtime_Fairness_En"] = "1" --ATF ON.
    else
        new_wifiCfgs["VOW_Airtime_Fairness_En"] = "0" --ATF OFF.
    end

    set_wirelessSettings_defaultItems(new_wifiCfgs, enableGuestNetwork)
    set_wirelessSettings_specialItems(new_wifiCfgs, enableGuestNetwork)

    --Wireless Setting of Bridge Mode
    local opMode = uci:get("network", "@opmode[0]", "mode")
    local wifiIF = uci:get("network", "op_br", "wifiIF")
    if opMode and opMode == "bridge" and wifiIF and ((wifiIF == "2G" and whichBand == "2.4G") or (wifiIF == "5G" and whichBand == "5G")) then
        new_wifiCfgs["ApCliEnable"] = "3" --APCLI_MODE_NEVER_START_AP (need enable CONVERTER_MODE_SWITCH_SUPPORT)
        new_wifiCfgs["ApCliSsid"] = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, clientWiFi_uciSectionName, "SSID")
        local securityType = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, clientWiFi_uciSectionName, "securityType")
        if securityType == "0" then --None
            new_wifiCfgs["ApCliAuthMode"] = "OPEN"
            new_wifiCfgs["ApCliEncrypType"] = "NONE"
            new_wifiCfgs["ApCliWPAPSK"] = ""
        elseif securityType == "1" and wifiIF == "2G" then --WPAPSK+TKIP
            new_wifiCfgs["ApCliAuthMode"] = "WPAPSK"
            new_wifiCfgs["ApCliEncrypType"] = "TKIP"
            new_wifiCfgs["ApCliWPAPSK"] = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, clientWiFi_uciSectionName, "wpaPassphrase")
        elseif securityType == "2" then --WPA2PSK+AES
            new_wifiCfgs["ApCliAuthMode"] = "WPA2PSK"
            new_wifiCfgs["ApCliEncrypType"] = "AES"
            new_wifiCfgs["ApCliWPAPSK"] = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, clientWiFi_uciSectionName, "wpaPassphrase")
        else --Unknown
            new_wifiCfgs["ApCliEnable"] = "0"
        end
        new_wifiCfgs["MACRepeaterEn"] = "0"
    else
        new_wifiCfgs["ApCliEnable"] = "0"
    end

log.console_r(new_wifiCfgs) --TODO: debug message.
    return "Success", new_wifiCfgs, needReluanchMapd

    --local curr_wifiCfgs = create_mtk_wireless_setting_table(MTK_2GWIFI_DEVNAME)
    --local curr_wifi5gCfgs = create_mtk_wireless_setting_table(MTK_5GWIFI_DEVNAME)
--}
end

function __mtkwifi_save_profile(cfgs, path, isProfileSettingsAppliedToDriver)
    -- Create the applied settings backup file before saving the new profile settings only if it does not exist.
    if not mtkwifi.exists(mtkwifi.__profile_applied_settings_path(path)) then
        os.execute("cp -f "..path.." "..mtkwifi.__profile_applied_settings_path(path))
    end
    if isProfileSettingsAppliedToDriver then
        -- It means the some context based profile settings to be saved in DAT file is already applied to the driver.
        -- Find the profile settings which are not applied to the driver before saving the new profile settings
        local diff = mtkwifi.diff_profile(path)
        mtkwifi.save_profile(cfgs, path)
        -- If there are any settings which are not applied to the driver, then do NOT copy and WebUI will display the "need reload to apply changes" message
        -- Otherwise, copy the new profile settings and WebUI will NOT display the "need reload to apply changes" message
        if next(diff) == nil then
            os.execute("cp -f "..path.." "..mtkwifi.__profile_applied_settings_path(path))
        end
    else
        mtkwifi.save_profile(cfgs, path)
    end
end

function mtkWifi_SaveProfileAndReload(wifi2g_changed, wifi5g_changed, new_wifi2gCfgs, new_wifi5gCfgs)
    local devs = mtkwifi.get_all_devs()
    assert(devs, "Could not get devs table, abort to execute!")
    local wifi2Gprofile = devs[MTK_2GWIFI_DEVNAME].profile
    local wifi5Gprofile = devs[MTK_5GWIFI_DEVNAME].profile
    assert(type(wifi2Gprofile) == "string", "type of wifi2Gprofile is NOT string, abort to execute!")
    assert(type(wifi5Gprofile) == "string", "type of wifi5Gprofile is NOT string, abort to execute!")
    if wifi2g_changed == true then
        __mtkwifi_save_profile(new_wifi2gCfgs, wifi2Gprofile, true)
        mtkwifi.__run_in_child_env(__mtkwifi_reload, MTK_2GWIFI_DEVNAME)
    end
    if wifi5g_changed == true then
        __mtkwifi_save_profile(new_wifi5gCfgs, wifi5Gprofile, true)
        mtkwifi.__run_in_child_env(__mtkwifi_reload, MTK_5GWIFI_DEVNAME)
    end
end

function mtkWifi_SaveProfileOnly(wifi2g_changed, wifi5g_changed, new_wifi2gCfgs, new_wifi5gCfgs)
    local devs = mtkwifi.get_all_devs()
    assert(devs, "Could not get devs table, abort to execute!")
    local wifi2Gprofile = devs[MTK_2GWIFI_DEVNAME].profile
    local wifi5Gprofile = devs[MTK_5GWIFI_DEVNAME].profile
    assert(type(wifi2Gprofile) == "string", "type of wifi2Gprofile is NOT string, abort to execute!")
    assert(type(wifi5Gprofile) == "string", "type of wifi5Gprofile is NOT string, abort to execute!")
    if wifi2g_changed == true then
        __mtkwifi_save_profile(new_wifi2gCfgs, wifi2Gprofile, true)
    end
    if wifi5g_changed == true then
        __mtkwifi_save_profile(new_wifi5gCfgs, wifi5Gprofile, true)
    end
end

--Function Name: init_guest_network_ebtables_chains()
--Input parameters: None.
--Output parameters: None.
--Description: Initially create two ebtables chains to control Guest Network accessing capbility.
--             Two chains are "NTGR_GUEST_NETWORK_CONTROL" in ebtables broute table and "NTGR_GUEST_NETWORK_FORWARD" in ebtables filter table.
function M.init_guest_network_ebtables_chains()
--{
    os.execute(EBTABLES.."-t broute -N NTGR_GUEST_NETWORK_CONTROL")
    os.execute(EBTABLES.."-t broute -D BROUTING -j NTGR_GUEST_NETWORK_CONTROL > /dev/null")
    os.execute(EBTABLES.."-t broute -A BROUTING -j NTGR_GUEST_NETWORK_CONTROL")
    os.execute(EBTABLES.."-t filter -N NTGR_GUEST_NETWORK_FORWARD")
    os.execute(EBTABLES.."-t filter -D FORWARD -j NTGR_GUEST_NETWORK_FORWARD > /dev/null")
    os.execute(EBTABLES.."-t filter -A FORWARD -j NTGR_GUEST_NETWORK_FORWARD")
--}
end

--Function Name: remove_guest_network_ebtables_chains()
--Input parameters: None.
--Output parameters: None.
--Description: Remove two ebtables chains to control Guest Network accessing capbility.
--             Two chains are "NTGR_GUEST_NETWORK_CONTROL" in ebtables broute table and "NTGR_GUEST_NETWORK_FORWARD" in ebtables filter table.
function M.remove_guest_network_ebtables_chains()
    os.execute(EBTABLES.."-t broute -D BROUTING -j NTGR_GUEST_NETWORK_CONTROL > /dev/null")
    os.execute(EBTABLES.."-t filter -D FORWARD -j NTGR_GUEST_NETWORK_FORWARD > /dev/null")
end

--Function Name: add_guest_network_ebtables_chains()
--Input parameters: None.
--Output parameters: None.
--Description: Add two ebtables chains to control Guest Network accessing capbility.
--             Two chains are "NTGR_GUEST_NETWORK_CONTROL" in ebtables broute table and "NTGR_GUEST_NETWORK_FORWARD" in ebtables filter table.
function M.add_guest_network_ebtables_chains()
    os.execute(EBTABLES.."-t broute -N NTGR_GUEST_NETWORK_CONTROL")
    os.execute(EBTABLES.."-t broute -A BROUTING -j NTGR_GUEST_NETWORK_CONTROL")
    os.execute(EBTABLES.."-t filter -N NTGR_GUEST_NETWORK_FORWARD")
    os.execute(EBTABLES.."-t filter -A FORWARD -j NTGR_GUEST_NETWORK_FORWARD")
end

--Function Name: delete_guest_network_ebtables_rules()
--Input parameters:
--        guestNetwork_intf: interface of Guest Network, in RAX5 project, it should be "ra1" or "rax1".
--Output parameters: None.
--Description: Delete ebtables broute table, NTGR_GUEST_NETWORK_CONTROL chain and ebtables filter table, NTGR_GUEST_NETWORK_FORWARD chain accroding choosed Guest Network interface.
--             That two chains are using to do access control for Guest Network. Allow or Deny clients in Guest Network can access LAN's service or not.
function M.delete_guest_network_ebtables_rules( guestNetwork_intf )
--{
    --Flush ebtables rules that to allow or deny Guest Network access LAN services.
    --os.execute(EBTABLES.."-t broute -F NTGR_GUEST_NETWORK_CONTROL")
    --os.execute(EBTABLES.."-t filter -F NTGR_GUEST_NETWORK_FORWARD");
    os.execute("ebtables -t broute -L NTGR_GUEST_NETWORK_CONTROL | grep '\\-i "..guestNetwork_intf.."' | awk '{cmd=\"ebtables -t broute -D NTGR_GUEST_NETWORK_CONTROL \"$0;system(cmd)}'")
    os.execute("ebtables -t filter -L NTGR_GUEST_NETWORK_FORWARD | grep '\\-i "..guestNetwork_intf.."' | awk '{cmd=\"ebtables -t filter -D NTGR_GUEST_NETWORK_FORWARD \"$0;system(cmd)}'")
--}
end

--Function Name: M._block_guest_network()
--Input parameters:
--       wifi_intf: the interface name for ebtables '-i' or '-o' option using.
--       lan_ip_addr: LAN ip address
--       block: "block" or "unblock" to add or delete the ebtables rules for allowing Guest Network access Local Network or not.
--Output parameters: None.
--Description: Porting from RAX40. Use same function name and similiar ebtables rules to block/un-block Guest Network client(can access DUT and LAN side service or not).
function M._block_guest_network(wifi_intf, lan_ip_addr, block)
--{
    local action = ""
    local lan_linklocal_ipv6Addr = ""

    if lan_ip_addr == nil or type(lan_ip_addr) ~= type("string") then
        log.force(__FUNCTION__()..":"..__LINE__()..", 'lan_ip_addr' parameter is nil or it is not string type. Just return and do nothing!!")
        return
    end

    if wifi_intf == nil or type(wifi_intf) ~= type("string") then
        log.force(__FUNCTION__()..":"..__LINE__()..", 'wifi_intf' parameter is nil or it is not string type. Just return and do nothing!!")
        return
    elseif wifi_intf ~= MTK_DEF_2G_GUEST_IFNAME and wifi_intf ~= MTK_DEF_5G_GUEST_IFNAME then
        log.force(__FUNCTION__()..":"..__LINE__()..", 'wifi_intf' parameter is invalid. Just return and do nothing!!")
        return
    end

    if type(block) == type("string") and block == "block" then
        action = "-A"
    elseif type(block) == type("string") and (block == "unblock") then
        action = "-D"
    else
        log.force(__FUNCTION__()..":"..__LINE__()..", 'block' parameter is invalid. Just return and do nothing!!")
        return
    end

    lan_linklocal_ipv6Addr = netUtil.getIPv6_linkLocal_addr(LAN_DEF_BRIDGE_INTF_NAME)
    log.console(__FUNCTION__()..":"..__LINE__()..", action="..action..", wifi_intf="..wifi_intf..", lan_ip_addr="..lan_ip_addr..", lan_linklocal_ipv6Addr="..lan_linklocal_ipv6Addr)

    --DUT's GUI
    os.execute(EBTABLES.."-t broute "..action.." NTGR_GUEST_NETWORK_CONTROL -i "..wifi_intf.." -p ipv4 --ip-protocol tcp --ip-dport 80 --ip-dst "..lan_ip_addr.." -j DROP")
    os.execute(EBTABLES.."-t broute "..action.." NTGR_GUEST_NETWORK_CONTROL -i "..wifi_intf.." -p ipv4 --ip-protocol tcp --ip-dport 443 --ip-dst "..lan_ip_addr.." -j DROP")
    if lan_linklocal_ipv6Addr ~= nil and type(lan_linklocal_ipv6Addr) == type("string") then
        os.execute(EBTABLES.."-t broute "..action.." NTGR_GUEST_NETWORK_CONTROL -i "..wifi_intf.." -p ipv6 --ip6-protocol tcp --ip6-dport 80 --ip6-dst "..lan_linklocal_ipv6Addr.." -j DROP");
        os.execute(EBTABLES.."-t broute "..action.." NTGR_GUEST_NETWORK_CONTROL -i "..wifi_intf.." -p ipv6 --ip6-protocol tcp --ip6-dport 443 --ip6-dst "..lan_linklocal_ipv6Addr.." -j DROP");
    end

    --DUT's USB storage
    --Samba
    --if project_configed_samba_feature or runtime_have_samba_feature then
    os.execute(EBTABLES.."-t broute "..action.." NTGR_GUEST_NETWORK_CONTROL -i "..wifi_intf.." -p ipv4 --ip-protocol tcp --ip-dport 137 --ip-dst "..lan_ip_addr.." -j DROP");
    os.execute(EBTABLES.."-t broute "..action.." NTGR_GUEST_NETWORK_CONTROL -i "..wifi_intf.." -p ipv4 --ip-protocol udp --ip-dport 137 --ip-dst "..lan_ip_addr.." -j DROP");
    os.execute(EBTABLES.."-t broute "..action.." NTGR_GUEST_NETWORK_CONTROL -i "..wifi_intf.." -p ipv4 --ip-protocol udp --ip-dport 138 --ip-dst "..lan_ip_addr.." -j DROP");
    os.execute(EBTABLES.."-t broute "..action.." NTGR_GUEST_NETWORK_CONTROL -i "..wifi_intf.." -p ipv4 --ip-protocol tcp --ip-dport 139 --ip-dst "..lan_ip_addr.." -j DROP");
    os.execute(EBTABLES.."-t broute "..action.." NTGR_GUEST_NETWORK_CONTROL -i "..wifi_intf.." -p ipv4 --ip-protocol tcp --ip-dport 445 --ip-dst "..lan_ip_addr.." -j DROP");
    if lan_linklocal_ipv6Addr ~= nil and type(lan_linklocal_ipv6Addr) == type("string") then
        os.execute(EBTABLES.."-t broute "..action.." NTGR_GUEST_NETWORK_CONTROL -i "..wifi_intf.." -p ipv6 --ip6-protocol tcp --ip6-dport 137 --ip6-dst "..lan_linklocal_ipv6Addr.." -j DROP");
        os.execute(EBTABLES.."-t broute "..action.." NTGR_GUEST_NETWORK_CONTROL -i "..wifi_intf.." -p ipv6 --ip6-protocol udp --ip6-dport 137 --ip6-dst "..lan_linklocal_ipv6Addr.." -j DROP");
        os.execute(EBTABLES.."-t broute "..action.." NTGR_GUEST_NETWORK_CONTROL -i "..wifi_intf.." -p ipv6 --ip6-protocol udp --ip6-dport 138 --ip6-dst "..lan_linklocal_ipv6Addr.." -j DROP");
        os.execute(EBTABLES.."-t broute "..action.." NTGR_GUEST_NETWORK_CONTROL -i "..wifi_intf.." -p ipv6 --ip6-protocol tcp --ip6-dport 139 --ip6-dst "..lan_linklocal_ipv6Addr.." -j DROP");
        os.execute(EBTABLES.."-t broute "..action.." NTGR_GUEST_NETWORK_CONTROL -i "..wifi_intf.." -p ipv6 --ip6-protocol tcp --ip6-dport 445 --ip6-dst "..lan_linklocal_ipv6Addr.." -j DROP");
    end
    --end

    --FTP
    os.execute(EBTABLES.."-t broute "..action.." NTGR_GUEST_NETWORK_CONTROL -i "..wifi_intf.." -p ipv4 --ip-protocol tcp --ip-dport 21 --ip-dst "..lan_ip_addr.." -j DROP");
    if lan_linklocal_ipv6Addr ~= nil and type(lan_linklocal_ipv6Addr) == type("string") then
        os.execute(EBTABLES.."-t broute "..action.." NTGR_GUEST_NETWORK_CONTROL -i "..wifi_intf.." -p ipv6 --ip6-protocol tcp --ip6-dport 21 --ip6-dst "..lan_linklocal_ipv6Addr.." -j DROP");
    end
    -- #PegaCVP#, NETGEAR [RAX40-1141][Guest Wifi]The wireless clients connected Guest WIFI will access local service when disable the option of "Allow guests access....."
    --ICMP
    os.execute(EBTABLES.."-t broute "..action.." NTGR_GUEST_NETWORK_CONTROL -i "..wifi_intf.." -p ipv4 --ip-protocol icmp --ip-dst "..lan_ip_addr.." -j DROP");
    if lan_linklocal_ipv6Addr ~= nil and type(lan_linklocal_ipv6Addr) == type("string") then
        os.execute(EBTABLES.."-t broute "..action.." NTGR_GUEST_NETWORK_CONTROL -i "..wifi_intf.." -p ipv6 --ip6-protocol ipv6-icmp --ip6-dst "..lan_linklocal_ipv6Addr.." -j DROP");
    end

    --[[plan to block
    --Other customize ports
    os.execute(EBTABLES.."-t broute "..action.." NTGR_GUEST_NETWORK_CONTROL -i "..wifi_intf.." -p ipv4 --ip-protocol tcp --ip-dport 1024:65535 --ip-dst "..lan_ip_addr.." -j DROP");
    if lan_linklocal_ipv6Addr ~= nil and type(lan_linklocal_ipv6Addr) == type("string") then
        os.execute(EBTABLES.."-t broute "..action.." NTGR_GUEST_NETWORK_CONTROL -i "..wifi_intf.." -p ipv6 --ip6-protocol tcp --ip6-dport 1024:65535 --ip6-dst "..lan_linklocal_ipv6Addr.." -j DROP");
    end
    --]]
    -- #PegaCVP#, RAX40-632, FORWARD chain is flushed after configuring WAN.
    --Other interfaces
    os.execute(EBTABLES.."-t filter "..action.." NTGR_GUEST_NETWORK_FORWARD -i "..wifi_intf.." -p arp -j ACCEPT");
    os.execute(EBTABLES.."-t filter "..action.." NTGR_GUEST_NETWORK_FORWARD -i "..wifi_intf.." -p ipv4 --ip-proto udp --ip-destination-port 67 -j ACCEPT");
    os.execute(EBTABLES.."-t filter "..action.." NTGR_GUEST_NETWORK_FORWARD -i "..wifi_intf.." -p ipv4 --ip-proto udp --ip-destination-port 68 -j ACCEPT");

    --DHCPv6 client, UDP 546port--
    os.execute(EBTABLES.."-t filter "..action.." NTGR_GUEST_NETWORK_FORWARD -i "..wifi_intf.." -p ipv6 --ip6-proto udp --ip6-destination-port 546 -j ACCEPT");
    --DHCPv6 Server, UDP 547port--
    os.execute(EBTABLES.."-t filter "..action.." NTGR_GUEST_NETWORK_FORWARD -i "..wifi_intf.." -p ipv6 --ip6-proto udp --ip6-destination-port 547 -j ACCEPT");
    --for i = 0, 4 do --Use eth0+ to instead of.
    --    os.execute(EBTABLES..action.." NTGR_GUEST_NETWORK_FORWARD -i "..wifi_intf.." -o "..LAN_PORT_BASE_INTF_NAME.."_"..i.." -j DROP");
    --end
    os.execute(EBTABLES..action.." NTGR_GUEST_NETWORK_FORWARD -i "..wifi_intf.." -o "..LAN_PORT_BASE_INTF_NAME.."+ -j DROP"); --eth0+
    os.execute(EBTABLES..action.." NTGR_GUEST_NETWORK_FORWARD -i "..wifi_intf.." -o "..MTK_DEF_2G_PRIMARY_IFNAME.." -j DROP");
    os.execute(EBTABLES..action.." NTGR_GUEST_NETWORK_FORWARD -i "..wifi_intf.." -o "..MTK_DEF_5G_PRIMARY_IFNAME.." -j DROP");
    os.execute(EBTABLES..action.." NTGR_GUEST_NETWORK_FORWARD -i "..wifi_intf.." -o "..(wifi_intf == MTK_DEF_2G_GUEST_IFNAME and MTK_DEF_5G_GUEST_IFNAME or MTK_DEF_2G_GUEST_IFNAME).." -j DROP");
--}
end

local function getLanIpAddr()
    local ip = nil
    local ifstatus_lan = sys.exec("ifstatus lan 2>/dev/null")
    local lan = json.decode(ifstatus_lan)

    if (lan ~= nil) then
        if (lan["ipv4-address"] and lan["ipv4-address"][1] and
            lan["ipv4-address"][1]["address"]) then
            ip = lan["ipv4-address"][1]["address"]
        end
    end
    return ip
end

--Function Name: reload_guest_network_accessing()
--Input parameters: None.
--Output parameters: None.
--Description: For easily applying the ebtables rules(to allow/deny Guest Network accessing LAN services).
--             Reduce many decision/combination in /etc/init.d/XXXX or other upper layer application that they only know they should reload ebtables rules but they don't know detail or hard to get DUT's setting.
function M.reload_guest_network_accessing()
--{
    local wifi2gGuest_allowAcccesLAN = (uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_GUEST_IFNAME, "allowAccessLAN") == "true" and "unblock" or "block")
    local wifi5gGuest_allowAcccesLAN = (uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_GUEST_IFNAME, "allowAccessLAN") == "true" and "unblock" or "block")
    local wifi2gGuest_enable = (uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_GUEST_IFNAME, "guestEnable") == "true" and "true" or "false")
    local wifi5gGuest_enable = (uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_GUEST_IFNAME, "guestEnable") == "true" and "true" or "false")
    local lan_ipv4_addr = getLanIpAddr()
    local opMode = uci:get("network", "@opmode[0]", "mode")

    -- Dynamic establish ebtables chain based on guest network isolation settings
    M.remove_guest_network_ebtables_chains()
    --PegaBU6, YochengLian, 2022.08.09, In Netgear HomeRouterSpec 16a, Ch. 17.4.2 In "Guest Network", "Allow guest to access My Local network" must be checked and grey out.
    --Only in router mode needs to re-apply the isolation rules. If it's in AP-mode, we only delete the blocking rules.
    if opMode == "router" then
        if (wifi2gGuest_allowAcccesLAN == "block" and wifi2gGuest_enable == "true") or (wifi5gGuest_allowAcccesLAN == "block" and wifi5gGuest_enable == "true") then
            M.add_guest_network_ebtables_chains()
        end

        if lan_ipv4_addr ~= nil and type(lan_ipv4_addr) == type("string") then --If the LAN ip can't be got by UCI setting, no change ebtables rules of guset network accessing LAN. It might be something wrong.
                                                                               --Netgear Spec(ver 16a) does not support Guest Network in AP mode or Beidge mode. (For now, we don't need to grab LAN ip from run-time command such like "ifconfig" or "ip address".)
            --MTK find the blocking rules in ebtables causes wifi low performance issue. We only add the blocking rule when GuestNetwork is Enabled and allowAccessLAN is "block".
            if wifi2gGuest_allowAcccesLAN == "block" and wifi2gGuest_enable == "true" then
                M.delete_guest_network_ebtables_rules(MTK_DEF_2G_GUEST_IFNAME)
                M._block_guest_network(MTK_DEF_2G_GUEST_IFNAME, lan_ipv4_addr, wifi2gGuest_allowAcccesLAN)
            else
                M.delete_guest_network_ebtables_rules(MTK_DEF_2G_GUEST_IFNAME)
            end
            --MTK find the blocking rules in ebtables causes wifi low performance issue. We only add the blocking rule when GuestNetwork is Enabled and allowAccessLAN is "block".
            if wifi5gGuest_allowAcccesLAN == "block" and wifi5gGuest_enable == "true" then
                M.delete_guest_network_ebtables_rules(MTK_DEF_5G_GUEST_IFNAME)
                M._block_guest_network(MTK_DEF_5G_GUEST_IFNAME, lan_ipv4_addr, wifi5gGuest_allowAcccesLAN)
            else
                M.delete_guest_network_ebtables_rules(MTK_DEF_5G_GUEST_IFNAME)
            end
        end
    end
--}
end

function wifiReload_postAction(whichBand, delayTime)
    local wifiPrimary_Intf = ""
    local wifiGuest_Intf = ""
    local isIgmpSnEnable = tonumber(uci:get("omcproxy", "@defaults[0]", "enable")) or 0

    if tostring(whichBand) == "2.4G" then
        wifiPrimary_Intf = MTK_DEF_2G_PRIMARY_IFNAME
        wifiGuest_Intf = MTK_DEF_2G_GUEST_IFNAME
    elseif tostring(whichBand) == "5G" then
        wifiPrimary_Intf = MTK_DEF_5G_PRIMARY_IFNAME
        wifiGuest_Intf = MTK_DEF_5G_GUEST_IFNAME
    else
        return "Invalid band chosed!"
    end

    local command = "sleep "..tostring(delayTime)
    if uci:get(NTGR_WIFI_UCI_CONFIG_NAME, wifiPrimary_Intf, "radioOn") == "true" then
        command = (command.." && ifconfig "..wifiPrimary_Intf.." up")
        if isIgmpSnEnable == 1 then
            command = (command.." && iwpriv "..wifiPrimary_Intf.." set IgmpSnEnable="..isIgmpSnEnable)
        end
        if uci:get(NTGR_WIFI_UCI_CONFIG_NAME, wifiGuest_Intf, "guestEnable") == "true" then
            command = (command.." && ifconfig "..wifiGuest_Intf.." up")
            if isIgmpSnEnable == 1 then
                command = (command.." && iwpriv "..wifiGuest_Intf.." set IgmpSnEnable="..isIgmpSnEnable)
            end
        else
            command = (command.." && ifconfig "..wifiGuest_Intf.." down")
        end
    else
        command = (command.." && ifconfig "..wifiPrimary_Intf.." down && ifconfig "..wifiGuest_Intf.." down")
    end

    log.console(__FUNCTION__()..":"..__LINE__()..", command="..command)
    os.execute(command)
end

function M.apply_wifiSettings()
--{
    local wifi2G_settingChanged = false
    local wifi5G_settingChanged = false
    local mapMode2G_settingChanged = false
    local mapMode5G_settingChanged = false
    local needReboot = false
    local tmpResult = nil
    local wifi2GSetting_luaTable = {}
    local wifi5GSetting_luaTable = {}

    --4. Call utility function to convert the NTGR_WiFi's contain to MTK's wireless setitng profile.
    --    4.1 Try to comapre the currently wireless setting table and newly wireless setting table(already merged input JSON data).
    --5. If the migration and comparsion action are successed, call wifiUtility function to save new settings to MTK's wireless profile and do wifi reload or DUT reboot.
    --   (For now, 2021.10.10, MTK's multiple BSSID may need to "reboot" to apply correctly settings.
    --    We wish this can be fixed and only use "wifi reload" to finish correctly applying.)
    --6. T.B.D unlock /etc/confing/NTGR_WiFi accessing if needed.

    tmpResult, wifi2GSetting_luaTable = merge_uciSettings_to_wirelessTable("2.4G")
    if tmpResult == "Success" then
        local curr_wifiCfgs = create_mtk_wireless_setting_table(MTK_2GWIFI_DEVNAME)
        wifi2G_settingChanged, mapMode2G_settingChanged = compare_new_and_curr_wirelessSettings("2.4G", wifi2GSetting_luaTable, curr_wifiCfgs)
        if wifi2GSetting_luaTable["BssidNum"] ~= curr_wifiCfgs["BssidNum"] then
            needReboot = true
        end
    end
    tmpResult, wifi5GSetting_luaTable = merge_uciSettings_to_wirelessTable("5G")
    if tmpResult == "Success" then
        local curr_wifiCfgs = create_mtk_wireless_setting_table(MTK_5GWIFI_DEVNAME)
        wifi5G_settingChanged, mapMode5G_settingChanged = compare_new_and_curr_wirelessSettings("5G", wifi5GSetting_luaTable, curr_wifiCfgs)
        if wifi5GSetting_luaTable["BssidNum"] ~= curr_wifiCfgs["BssidNum"] then
            needReboot = true
        end
    end

    --For now, we use wifi 2G setting as mainly config for Netgear Smart Connect feature.
    --So, here is using wifi2GSetting_luaTable's "MapMode" and "BandSteering" to set value in /etc/map/mapd_user.cfg
    local mapd_userCfg_luaTable = { DeviceRole = "2", CentralizedSteering = "0"} --SDK default value.
    if mapMode2G_settingChanged == true then
        --By MTK WCNR00251947 suggestion, in MT7915 and using standalone Bandteering2.0.
        --It must set "DeviceRole=1" and "CentralizedSteering=0" in the "/etc/map/mapd_user.cfg" to statisfy NTGR's "smartConnect" requirement. (For now, it's mapping to "standlone" mode on MTK's 7915 wireless solution.)
        if wifi2GSetting_luaTable["MapMode"] == "2" and wifi2GSetting_luaTable["BandSteering"] == "0" then
            mapd_userCfg_luaTable["DeviceRole"] = "1"
            mapd_userCfg_luaTable["CentralizedSteering"] = "0"
        else
            mapd_userCfg_luaTable["DeviceRole"] = "2"
            mapd_userCfg_luaTable["CentralizedSteering"] = "0"
        end
        local needReluanchMapd = write_mapd_cfg( mapd_userCfg_luaTable )
        --if needReluanchMapd == true then
        --    if mtkwifi.exists("/usr/bin/map_restart.sh") then
        --        mtkwifi.__run_in_child_env(exec_map_restart)
        --    else
        --        mtkwifi.__run_in_child_env(__mtkwifi_reload)
        --    end
        --end
    end

    --Allow or deny Guest Network access service on Local Network--
    ----if wifi2G_settingChanged == true and wifi2GSetting_luaTable["NoForwarding"] ~= nil then
    --    --local wifi2Gguest_allowAcccesLAN = (mtkwifi.__split(wifi2GSetting_luaTable["NoForwarding"], ";")[2] == "0" and "unblock" or "block") --default is deny guest network access LAN services.
    --    local allowAcccesLAN = (uci:get(NTGR_WIFI_UCI_CONFIG_NAME, wifiGuest_Intf, "allowAccessLAN") == "true" and "unblock" or "block")
    --    if allowAcccesLAN == "block" then --Suppose the delete action already did, we do not need to "unblock" it. For now, the "unblock" action is called ebtables with '-D' option.
    --        M.block_guest_network(wifiGuest_Intf, interface.getLanInstanceIpAddr(), allowAcccesLAN)
    --    end
    ----end
    M.reload_guest_network_accessing()

    --log.console(__FUNCTION__()..":"..__LINE__()..", wifi2G_settingChanged="..tostring(wifi2G_settingChanged))
    --log.console(__FUNCTION__()..":"..__LINE__()..", wifi5G_settingChanged="..tostring(wifi5G_settingChanged))
    mtkWifi_SaveProfileAndReload(wifi2G_settingChanged, wifi5G_settingChanged, wifi2GSetting_luaTable, wifi5GSetting_luaTable)
--TODO: un-lock for accessing /etc/config/NTGR_WiFi uci file in here.
--or delete /etc/config/NTGR_WiFi ??
    --log.console(__FUNCTION__()..":"..__LINE__()..", needReboot="..tostring(needReboot))
    --if needReboot == true then
    --    --This 4 "ifconfig down" is using for re-insmod mt_wifi.ko, please always do it before rmmod mt_wifi.ko--
    --    os.execute("ifconfig "..MTK_DEF_2G_PRIMARY_IFNAME.." down")
    --    os.execute("ifconfig "..MTK_DEF_5G_PRIMARY_IFNAME.." down")
    --    os.execute("ifconfig "..MTK_DEF_2G_GUEST_IFNAME.." down")
    --    os.execute("ifconfig "..MTK_DEF_5G_GUEST_IFNAME.." down")
    --    if posix.stat(MT_WIFI_KERNEL_MODULE_PATH) ~= nil and posix.stat(MT_WIFI_KERNEL_MODULE_PATH).st_size > 0 then
    --        os.execute("rmmod mt_wifi && sleep 3")
    --        os.execute("insmod mt_wifi")
    --    end
    --    mtkwifi.__run_in_child_env(__mtkwifi_reload, MTK_2GWIFI_DEVNAME)
    --    mtkwifi.__run_in_child_env(__mtkwifi_reload, MTK_5GWIFI_DEVNAME)
    --    --old school method, really reboot DUT. os.execute("reboot -d 5")
    --end
--}
end

function M.detect_MTK_wireless_profile_corrupt( whichBand )
--{
    local isMTK_wireless_profile_corrupted = "false"
    local profile_path = MTK_2GWIFI_PROFILE

    if whichBand == "2.4G" then
        profile_path = MTK_2GWIFI_PROFILE
    elseif whichBand == "5G" then
        profile_path = MTK_5GWIFI_PROFILE
    else
        log.force("Not support "..whichBand.." band!")
        return nil
    end

    local fp_handler = io.popen("grep \"^Default$\" -c  "..profile_path, "r")
    if fp_handler ~= nil then
        local cmdResult = fp_handler:read("*line")
        if tonumber(cmdResult) >= 1 then
            isMTK_wireless_profile_corrupted = "false"
            log.console(__FUNCTION__()..":"..__LINE__()..", isMTK_wireless_profile_corrupted="..tostring(isMTK_wireless_profile_corrupted)..", profile="..profile_path)
        else
            isMTK_wireless_profile_corrupted = "true"
            log.console(__FUNCTION__()..":"..__LINE__()..", isMTK_wireless_profile_corrupted="..tostring(isMTK_wireless_profile_corrupted)..", profile="..profile_path)
            log.force("\27[91mDetected the MTK's wireless profile, "..profile_path..", corrupted. Please recovery it!!!!\27[0m\n")
        end
    fp_handler:close()
    end
    return isMTK_wireless_profile_corrupted
--}
end

--Function Name: merge_uciSettings_to_wirelessTable()
--Input parameters:
--        isWifi2GProfile_corrupted: does the wireless 2.4G profile corrupted. It should take the value from isWifi5GProfile_corrupted()'s returned.
--        isWifi5GProfile_corrupted: does the wireless 5G profile corrupted. It should take the value from isWifi5GProfile_corrupted()'s returned.
--Return values:
--        None.
--Description: Use the templated wireless profile(in /rom) and merged DB(NTGR_WiFi)+currently profile setting as recovered wireless profiles(2.4G and 5G)
--             Extend this function if there's more than two wireless band.
function M.recovery_MTK_wirelessProfile_from_uciDB( isWifi2GProfile_corrupted, isWifi5GProfile_corrupted )
    local tmpResult = nil --No really use, just receive the returned value.
    local regen_wifi2G_profile = false
    local regen_wifi5G_profile = false
    local wifi2GSetting_luaTable = {}
    local wifi5GSetting_luaTable = {}
    log.console(__FUNCTION__()..":"..__LINE__()..", isWifi2GProfile_corrupted="..isWifi2GProfile_corrupted)
    log.console(__FUNCTION__()..":"..__LINE__()..", isWifi5GProfile_corrupted="..isWifi5GProfile_corrupted)

    if isWifi2GProfile_corrupted ~= nil and isWifi2GProfile_corrupted == "true" then
        tmpResult, wifi2GSetting_luaTable = merge_uciSettings_to_wirelessTable("2.4G", "forRecovery")
        os.execute("echo \"$(cat /rom/"..MTK_2GWIFI_PROFILE.."; cat "..MTK_2GWIFI_PROFILE..")\" > "..MTK_2GWIFI_PROFILE)
        regen_wifi2G_profile = true
    end
    if isWifi5GProfile_corrupted ~= nil and isWifi5GProfile_corrupted == "true" then
        tmpResult, wifi5GSetting_luaTable = merge_uciSettings_to_wirelessTable("5G", "forRecovery")
        os.execute("echo \"$(cat /rom/"..MTK_5GWIFI_PROFILE.."; cat "..MTK_5GWIFI_PROFILE..")\" > "..MTK_5GWIFI_PROFILE)
        regen_wifi5G_profile = true
    end

    --mtkWifi_SaveProfileOnly(true, true, wifi2GSetting_luaTable, wifi5GSetting_luaTable)
    mtkWifi_SaveProfileOnly(regen_wifi2G_profile, regen_wifi5G_profile, wifi2GSetting_luaTable, wifi5GSetting_luaTable)
    log.force("\27[93mRecovered the MTK's wireless profile(s) !!!!\27[0m\n")
end

return M
