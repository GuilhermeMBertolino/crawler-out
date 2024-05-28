--[[
Copyright(c) 2008-2014 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  wireless.lua
Details :  Web controller for wireless module.
Author  :  Chen Jinfu <chenjinfu@tp-link.net>
Version :  1.0.0
Date    :  24Feb, 2014
]]--
local wlan  = require "luci.model.wireless"
local uci   = require "luci.model.uci"
local uci_r = uci.cursor()
local dbg   = require "luci.tools.debug"
local io	 = require "io"
local ctl   = require "luci.model.controller"
--add by zhangshengbo
local sys       = require "luci.sys"
local util  = require "luci.util"

module("luci.controller.admin.wireless", package.seeall)

local week = {"mon", "tue", "wed", "thu", "fri", "sat", "sun"}

-- Process WPS PIN HTTP request.
-- @param N/A
-- @return N/A
function wireless_wps_pin(formvalue)
    local option = formvalue["option"]
    local label  = formvalue["wps_label"]
    local ap     = wlan.Apcfg("wps_pin", {"wps_label", "wps_pin"})
    local cfg    = nil
    local data   = {}
    local result = true

    if option == "generate" or option == "default" then
        cfg = {wps_pin = option}
    elseif label == "on" or label == "off" then
        cfg = {wps_label = label}
    end

    -- Is there any commit?
    if cfg then
        local oldcfg = ap:read_data()

        ap:write(cfg)
        data = ap:read()

        -- Apply WPS config if any changed.
        if oldcfg.wps_label ~= data.wps_label or
            oldcfg.wps_pin ~= data.wps_pin 
        then
            ap:wps_cmd("ap_pin", data)
        end
    else
        data = ap:read()
        data.lock_2g = "disable"
        data.lock_5g = "disable"
        local support_triband = wireless_support_triband()
        local support_6g = wireless_support_6g()
        if support_triband == "yes" then
            if support_6g == "yes" then
                data.lock_6g = "disable"
            else
                data.lock_5g_2 = "disable"
            end
        end
        result = ap:wps_cmd("pin_lock", data)
    end

    return data
end

-- Smart_home query wps request.
-- @param N/A
-- @return N/A
function smart_home_query_wps(formvalue)
    local option = formvalue["option"]
    local ap     = wlan.Apcfg("wps_pin", {"wps_timeout", "disabled"})
    local data   = {wps_status = "ok"}
    local result = true

    -- Query PBC method connect status
    if option == "pbc" then
        data.method = "pbc"
        result      = ap:wps_cmd("status", data)
        data.method = nil

    -- Add a WPS device by PBC or PIN method
    elseif option == "connect" then
        result   = ap:wps_cmd("pbc", data)
        file = require("io").popen("tp_wps_led &")
        if file then
            file:close()
        end
        
    -- Default response: 'wps_timeout' and 'available'.
    else
        data = ap:read_data()
        data.wps_timeout = data.wps_timeout + 1000
        data.available   = ap:wps_cmd()
    end
	
    if result then
        return data
    else
        return false, "wps connect error", data
    end
end

-- Process WPS Connection HTTP request.
-- @param N/A
-- @return N/A
function wireless_wps_connect(formvalue)
    local option = formvalue["option"]
    local ap     = wlan.Apcfg("wps_pin", {"wps_timeout", "disabled"})
    local data   = {wps_status = "ok"}
    local result = true
	local lp5523_flag = uci_r:get_profile("lp5523", "message")
	local hapd_flag = uci_r:get_profile("wireless", "wps_hostapd_support") or "no"
	
	--add by zhangshengbo to match wps led with hostapd
	--wps led complete in hostapd
	--not up tp_wps_led
	--dbg("hapd_flag " .. hapd_flag)
	
    -- Query PIN method connect status
    if option == "pin" then
        data.method = "pin"
        result      = ap:wps_cmd("status", data)
        data.method = nil

    -- Query PBC method connect status
    elseif option == "pbc" then
        data.method = "pbc"
        result      = ap:wps_cmd("status", data)
        data.method = nil

    -- Cancel PBC and PIN connect
    elseif option == "cancel" then
        result = ap:wps_cmd("cancel", data)
		--added by zhangshengbo
		if lp5523_flag == "chip-on" then
			luci.sys.exec("ubus send leds '{\"action\" : \"3\",\"status\" : \"9\"}'")
			local online_status = util.exec("online-test ; echo $?")
			online_status = tonumber(online_status) or 2
			if online_status == 0 then
				util.exec("ubus send leds '{\"action\" : \"1\",\"status\" : \"1\"}'")
			elseif online_status == 1 then
				util.exec("ubus send leds '{\"action\" : \"1\",\"status\" : \"0\"}'")
			else
				util.exec("echo 'online-test failed in wireless.lua!!!' > /dev/console")
				for index = 3,1,-1
				do
					online_status = util.exec("online-test ; echo $?")
					online_status = tonumber(online_status) or 2
					if online_status == 0 then
						util.exec("ubus send leds '{\"action\" : \"1\",\"status\" : \"1\"}'")
						break
					elseif online_status == 1 then
						util.exec("ubus send leds '{\"action\" : \"1\",\"status\" : \"0\"}'")
						break
					else
						util.exec("echo 'online-test failed in wireless.lua!!!' > /dev/console")
					end
				end
			end
		end
		
		if hapd_flag ~= "yes" then
			file = require("io").popen("killall tp_wps_led")
			if file then
				file:close()
			end
		end

    -- Add a WPS device by PBC or PIN method
    elseif option == "connect" then
        local pin = formvalue["wps_pin"]

        -- Use PIN method if a PIN number is given.
        if pin and pin ~= "" then
            data.pin = pin
            result   = ap:wps_cmd("pin", data)
            data.pin = nil
        else
			result   = ap:wps_cmd("pbc", data)
        end

        if hapd_flag ~= "yes" then
			file = require("io").popen("tp_wps_led &")
			if file then
				file:close()
			end
		end

    -- Default response: 'wps_timeout' and 'available'.
    else
        data = ap:read_data()
        data.wps_timeout = data.wps_timeout + 1000
        data.available   = ap:wps_cmd()
    end

	-- smart_home report below
    if data.wps_status and data.wps_status ~= "ok" then
        local smart_home_support = uci_r:get_profile("smart_home", "support") or "no"
        if smart_home_support and smart_home_support == "yes" then
            local smart_home_upload = require "cloud.smart_home.smart_home_upload"
            local cause = smart_home_upload.APP
            if formvalue.smart_home_cause then
                cause = smart_home_upload.VOICE
            end
            smart_home_upload.upload_property_change("wps", cause)
        end
    end
    -- smart_home report above
	
    if result then
        return data
    else
        return false, "wps connect error", data
    end
end

-- Process wireless statistics HTTP request.
-- @param N/A
-- @return N/A
function wireless_statistics(formvalue)
    local operate  = formvalue["operation"] or "read"
    local map      = {}
    local ap       = wlan.Apcfg()
    local sta_list = {}
    local support_triband = wireless_support_triband()
    local support_6g = wireless_support_6g()

    if support_triband == "yes" then
        if support_6g == "yes" then
            map = {"2.4GHz", "5GHz-1", "6GHz", "Guest 2.4GHz", "Guest 5GHz-1", "Guest 6GHz"}
        else
            map = {"2.4GHz", "5GHz-1", "5GHz-2", "Guest 2.4GHz", "Guest 5GHz-1", "Guest 5GHz-2"}
        end
    else
        map = {"2.4GHz", "5GHz", "Guest 2.4GHz", "Guest 5GHz"}
    end

    if operate == "read" or operate == "load" then
        for _, sta in ipairs(ap:assoclist()) do
            sta_list[#sta_list + 1 ] = {
                mac        = sta.mac,
                type       = map[sta.type],
                encryption = sta.security,
                rxpkts     = sta.tx_packets,
                txpkts     = sta.rx_packets,
            }
        end
    end

    return sta_list
end

-- Process 2G survey HTTP request.
-- @param N/A
-- @return N/A
function wireless_survey_2g(formvalue)
    local ap = wlan.Apcfg()
    local ap_list = ap and ap:scanlist(true, false, false, false)
    return ap_list
end

-- Process 5G survey HTTP request.
-- @param N/A
-- @return N/A
function wireless_survey_5g(formvalue)
    local ap = wlan.Apcfg()
    local ap_list = ap and ap:scanlist(false, true, false, false)
    return ap_list
end

-- Process 5G_2 survey HTTP request.
-- @param N/A
-- @return N/A
function wireless_survey_5g_2(formvalue)
    local ap = wlan.Apcfg()
    local ap_list = ap and ap:scanlist(false, false, true, false)
    return ap_list
end

-- Process 6G survey HTTP request.
-- @param N/A
-- @return N/A
function wireless_survey_6g(formvalue)
    local ap = wlan.Apcfg()
    local ap_list = ap and ap:scanlist(false, false, false, true)
    return ap_list
end

-- Process wireless devlist HTTP request.
-- @param N/A
-- @return N/A
function wireless_devlist(formvalue)
    local client   = require("luci.model.client_mgmt")
    local operate  = formvalue["operation"] or "read"
    local map      = {"Wireless 2.4GHz", "Wireless 5GHz", "Guest 2.4GHz", "Guest 5GHz"}
    local ap       = wlan.Apcfg()

    local dev_list = {}
    
    if operate == "read" or operate == "load" then
        local pc_list  = (client and client.get_client_list()) or {}
        local sta_list = (ap and ap:assoclist()) or {}

        -- If a sta is not in the client list, output it first.
        for _, sta in ipairs(sta_list) do
            local found = false
            for _, pc in ipairs(pc_list) do
                if sta.mac == pc.mac then
                    found = true
                    pc.wire_type = map[sta.type]
                    break
                end
            end

            if not found then
                dev_list[#dev_list + 1] = {
                    mac = sta.mac,
                    ip = "0.0.0.0",
                    name = "UNKNOW",
                    type = map[sta.type]
                }
            end
        end

        -- Output all client list.
        for _, pc in ipairs(pc_list) do
            dev_list[#dev_list + 1] = {
                    mac = pc.mac,
                    ip = pc.ip,
                    name = pc.hostname,
                    type = pc.wire_type
            }
        end
    end
    return dev_list
end

-- Process wireless macfiltering HTTP request.
-- @param N/A
-- @return N/A
function wireless_maclist(formvalue)
    local operate = formvalue["operation"] or "read"
    local index   = formvalue["index"]
    local ap      = wlan.Apcfg()
    local result  = false
    local data    = {}
    
    -- Read one or all mac list
    if operate == "read" or operate == "load" then
        result = ap:maclist_read(index and tonumber(index), data)

    -- Remove a mac entry by index
    elseif operate == "remove" then
        result = index and ap:maclist_remove(index, data)

    -- Modify or insert a mac entry
    elseif operate == "update" or operate == "insert" then

        data   = require("luci.json").decode(formvalue["new"])

        result = ap:maclist_check(data)
        
        if result then
            if operate == "insert" then
                result = ap:maclist_insert(data)
            else
                result = index and ap:maclist_update(tonumber(index), data)
            end
        end
    end
    
    if not result then
        return false, "macfilter error", data    
    else
        return data
    end
end


function tmp_pick_data(wifi_type, wifi_2G_5G, status_all)

    local data       = {}
    local prefix     = wifi_type .. "_" .. wifi_2G_5G

    data["ssid"] = status_all[prefix .. "_ssid"]

	if "guest" == wifi_type then
		prefix = wifi_type .. "_" .. "2g5g"
	end

    local wifi_encry = status_all[prefix .. "_encryption"] or "none"

    if wifi_encry == "none" or wifi_encry == "portal" then
        data["enSecurity"] = "off"
        data["encryption"] = "none"
    else
        data["enSecurity"] = "on"
        data["encryption"] = wifi_encry
        data["psk_key"]    = status_all[prefix .. "_psk_key"]
        data["wep_key1"]   = status_all[prefix .. "_wep_key1"]
        data["server"]     = status_all[prefix .. "_server"] or "0.0.0.0"
        data["wpa_key"]    = status_all[prefix .. "_wpa_key"] or ""
    end

    return data
end

function tmp_pick_data_v4(wifi_type, wifi_2G_5G, status_all)

    local data       = {}
    local prefix     = wifi_type .. "_" .. wifi_2G_5G
    local wifi_encry = status_all[prefix .. "_encryption"] or "none"
    local psk_version = status_all[prefix .. "_psk_version"] or "auto"
	local triband = wireless_support_triband()
	local support_6g = wireless_support_6g()

    data["ssid"] = status_all[prefix .. "_ssid"]
	
	if "guest" == wifi_type then
		prefix = wifi_type .. "_" .. "2g5g"
	end
	
    data["mac"] = status_all[prefix .. "_macaddr"]

    if wifi_2G_5G == "2g" then
        data["conn_type"] = "2.4G"
    elseif wifi_2G_5G == "5g" then
		data["conn_type"] = "5G"
	end
	
	if "yes" == triband then
		if support_6g == "yes" then
			if wifi_2G_5G == "5g" then
				data["conn_type"] = "5G"
			elseif wifi_2G_5G == "6g" then
				data["conn_type"] = "6G"
			end
		else
			if wifi_2G_5G == "5g" then
				data["conn_type"] = "5G-1"
			elseif wifi_2G_5G == "5g_2" then
				data["conn_type"] = "5G-2"
			end
		end
	end
	
	local tmp = wifi_type .. "_" .. wifi_2G_5G
    data["enable"] = status_all[tmp .. "_enable"]
    data["isSSIDModifiable"] = "on"
    data["isPasswordModifiable"] = "on"
    data["channel"] = status_all[prefix .. "_channel"]

    data["securityMode"] = "none"
	data["enSecurity"] = "on"

    if wifi_encry == "none" then
        data["securityMode"] = "none"
		data["enSecurity"] = "off"
    elseif wifi_encry == "wep" then
        data["securityMode"] = "wep"
    elseif wifi_encry == "wpa" then
        data["securityMode"] = "wpaEnterprise"
    elseif wifi_encry == "psk" then
        if psk_version == "auto" then
            data["securityMode"] = "wpa/wpa2"
        elseif psk_version == "rsn" then
            data["securityMode"] = "wpa2"
        elseif psk_version == "wpa" then
            data["securityMode"] = "wpa"
        end
	--add by zhangshengbo for wpa3, merge from a6
	elseif wifi_encry == "psk_sae" then
        if psk_version == "sae_transition" then
            data["securityMode"] = "wpa2/wpa3"
        elseif psk_version == "sae_only" then
            data["securityMode"] = "wpa3"
		end
	elseif wifi_encry == "owe" then
		--only support owe mode
		if psk_version == "owe_only" then
			data["securityMode"] = "wpa3_owe"
		end
    end

    data["psk_key"]    = status_all[prefix .. "_psk_key"]
    data["psk_version"] = status_all[prefix .. "_psk_version"]
    data["wep_key1"]   = status_all[prefix .. "_wep_key1"]
    data["server"]     = status_all[prefix .. "_server"] or "0.0.0.0"
    data["wpa_key"]    = status_all[prefix .. "_wpa_key"] or ""
	
    data["isHideSsid"]    = status_all[prefix .. "_hidden"]
    data["channelWidth"]    = status_all[prefix .. "_htmode"]
    if data["channelWidth"] == "auto" or data["channelWidth"] == "upto160" then
        data["channelWidth"] = "0"
    end
    data["mode"] = status_all[prefix .. "_hwmode"]
	
    if wifi_2G_5G == "2g" then
        data["isSupportMuMimo"] = uci_r:get_profile("wireless", "mu_mimo_support_2g4") or "no"
    elseif wifi_2G_5G == "5g" then
		data["isSupportMuMimo"] = uci_r:get_profile("wireless", "mu_mimo_support_5g_1")  or "no"
	elseif wifi_2G_5G == "5g_2" then
	    data["isSupportMuMimo"] = uci_r:get_profile("wireless", "mu_mimo_support_5g_2")  or "no"
	elseif wifi_2G_5G == "6g" then
		data["isSupportMuMimo"] = uci_r:get_profile("wireless", "mu_mimo_support_6g")  or "no"
	end
	
    data["muMimoEnable"]    = status_all[prefix .. "_mu_mimo"]

    if wifi_2G_5G == "6g" then
		data["isSupportPsc"] = uci_r:get_profile("wireless", "support_psc")  or "no"
		data["pscEnable"] = status_all[prefix .. "_psc"]
    end

	local support_160MHz_optimization = uci_r:get_profile("wireless", "support_160MHz_optimization")  or "no"
	if support_160MHz_optimization == "yes" then
		data["isSupport160MHzConfigOptimization"] = support_160MHz_optimization
		if wifi_2G_5G == "5g" then
			data["radarScanningTime"] = uci_r:get("profile", "profile_diff", "radar_scanning_time_5g") or "60"
		end
		if wifi_2G_5G == "5g_2" then
			data["radarScanningTime"] = uci_r:get("profile", "profile_diff", "radar_scanning_time_5g_2") or "60"
		end
	end

	local support_dfs_channel_optimization = uci_r:get_profile("wireless", "support_dfs_channel_optimization")  or "no"
	if support_dfs_channel_optimization == "yes" then
		data["isSupportDFSChannelOptimization"] = support_dfs_channel_optimization
	end

	if wifi_2G_5G == "2g" then
		data["isBandwidthNewDisplayMode"] = uci_r:get_profile("wireless", "bw_new_display_mode_2g4") or "no"
		data["isAutoBandwidthNewDisplayMode"] = uci_r:get_profile("wireless", "auto_bw_new_display_mode_2g4") or "no"
	elseif wifi_2G_5G == "5g" then
		data["isBandwidthNewDisplayMode"] = uci_r:get_profile("wireless", "bw_new_display_mode_5g") or "no"
		data["isAutoBandwidthNewDisplayMode"] = uci_r:get_profile("wireless", "auto_bw_new_display_mode_5g") or "no"
	elseif wifi_2G_5G == "5g_2" then
		data["isBandwidthNewDisplayMode"] = uci_r:get_profile("wireless", "bw_new_display_mode_5g_2") or "no"
		data["isAutoBandwidthNewDisplayMode"] = uci_r:get_profile("wireless", "auto_bw_new_display_mode_5g_2") or "no"
	elseif wifi_2G_5G == "6g" then
		data["isBandwidthNewDisplayMode"] = uci_r:get_profile("wireless", "bw_new_display_mode_6g") or "no"
		data["isAutoBandwidthNewDisplayMode"] = uci_r:get_profile("wireless", "auto_bw_new_display_mode_6g") or "no"
	end

    return data
end

function tmp_read_wifi(wifi_type, has_5G)

	--dbg.printf("===================== enter tmp_read_wifi ========================")
	
    local status_all = wireless_status_all()
	
    --dbg.dumptable(status_all)
    if not status_all or type(status_all) ~= "table" then
        return false, "cannot get the wireless status"
    end

	local triband = wireless_support_triband()

    local wifi_2g = tmp_pick_data(wifi_type, "2g", status_all)
    local wifi_5g = has_5G and tmp_pick_data(wifi_type, "5g", status_all) or nil
    local data    = {basicCfg = {wifi_2g, wifi_5g}}
    local wifi_5g_2

	if "yes" == triband then
		wifi_5g_2 = has_5G and tmp_pick_data(wifi_type, "5g_2", status_all) or nil
        data            = {basicCfg = {wifi_2g, wifi_5g, wifi_5g_2}}
    end

    local wl2g = { enSecurity = "", ssid = "", secMode = "", pskCfg = "", wpaCfg_ip = "", wpaCfg_passwd = "", wepCfg = ""}
    local wl5g = { enSecurity = "", ssid = "", secMode = "", pskCfg = "", wpaCfg_ip = "", wpaCfg_passwd = "", wepCfg = ""}
    local wl5g_2
    local ret  = { basicCfg = {wl2g, wl5g} }
    
    if "yes" == triband then
        wl5g_2 = { enSecurity = "", ssid = "", secMode = "", pskCfg = "", wpaCfg_ip = "", wpaCfg_passwd = "", wepCfg = ""}
        ret  = { basicCfg = {wl2g, wl5g, wl5g_2} }
    end

    data["access"] = status_all["guest_access"] or "off"

    local wifi_2g_disabled = status_all[wifi_type .. "_2g_disabled"] or "on"
    local wifi_5g_disabled = has_5G and status_all[wifi_type .. "_5g_disabled"] or "on"
    local wifi_5g_2_disabled = (has_5G and "yes" == triband) and status_all[wifi_type .. "_5g_2_disabled"] or "on"

    --if wifi_2g_disabled == "on" or has_5G and wifi_5g_disabled == "on" then
    --    data["hardSwitchEn"] = "off"
    --else
        data["hardSwitchEn"] = "on"
    --end

    local enable_2G = status_all[wifi_type .. "_2g_enable"]
    local enable_5G = has_5G and status_all[wifi_type .. "_5g_enable"] or "off"
	local enable_5G_2 = has_5G and triband == "yes" and status_all[wifi_type .. "_5g_2_enable"] or "off"

    -- 2.4g
    if wifi_2g_disabled == "on" then
        --only hard switch is on and if1 is the wl01
        --guest need not set
        data["enableBand"] = "0"
    else
        data["enableBand"] = enable_2G == "on" and "1" or "0"
    end

    -- 5g
    if has_5G and wifi_5g_disabled == "on" then
        --only hard switch is on and if0 is the wl11
        --guest need not set
        data["enableBand"] = data["enableBand"] .. "0"
    else
        if has_5G and enable_5G == "on" then
            data["enableBand"] = data["enableBand"] .. "1"
        else
            data["enableBand"] = data["enableBand"] .. "0"
        end
    end

    if has_5G and "yes" == triband and wifi_5g_2_disabled == "on" then
        data["enableBand"] = data["enableBand"] .. "0"
    else
    	if has_5G and "yes" == triband and enable_5G_2 == "on" then
    		data["enableBand"] = data["enableBand"] .. "1"
    	else
    		data["enableBand"] = data["enableBand"] .. "0"
    	end
    end

	-- support list
	supportBand = "1"

	if has_5G then
		supportBand = supportBand .. "1"
	else
		supportBand = supportBand .. "0"
	end

	if has_5G and "yes" == triband then
		supportBand = supportBand .. "1"
	else
		supportBand = supportBand .. "0"
	end

	data["enableBand"] = data["enableBand"] .. supportBand

    ret.access = data["access"]
    ret.enableBand = data["enableBand"]
    ret.hardSwitchEn = data["hardSwitchEn"]


    wl2g.enSecurity = wifi_2g.enSecurity      
    wl2g.secMode = wifi_2g.encryption
    wl2g.ssid = wifi_2g.ssid
    wl2g.pskCfg = wifi_2g.psk_key
    wl2g.wepCfg = wifi_2g.wep_key1
    wl2g.wpaCfg_ip = wifi_2g.server or "0.0.0.0"
    wl2g.wpaCfg_passwd = wifi_2g.wpa_key or ""


    wl5g.enSecurity = wifi_5g.enSecurity
    wl5g.secMode = wifi_5g.encryption
    wl5g.ssid = wifi_5g.ssid
    wl5g.pskCfg = wifi_5g.psk_key
    wl5g.wepCfg = wifi_5g.wep_key1
    wl5g.wpaCfg_ip = wifi_5g.server or "0.0.0.0"
    wl5g.wpaCfg_passwd = wifi_5g.wpa_key or ""

    if "yes" == triband then
        wl5g_2.enSecurity = wifi_5g_2.enSecurity
        wl5g_2.secMode = wifi_5g_2.encryption
        wl5g_2.ssid = wifi_5g_2.ssid
        wl5g_2.pskCfg = wifi_5g_2.psk_key
        wl5g_2.wepCfg = wifi_5g_2.wep_key1
        wl5g_2.wpaCfg_ip = wifi_5g_2.server or "0.0.0.0"
        wl5g_2.wpaCfg_passwd = wifi_5g_2.wpa_key or ""
    end   
    -- dbg.dumptable(ret)
	-- dbg.printf("===================== leave tmp_read_wifi ========================")
    return ret
end

function tmp_read_wifi_v4(wifi_type, has_5G)

    --dbg.printf("======================= enter tmp_read_wifi_v4 ========================")

    local status_all = wireless_status_all()
    if not status_all or type(status_all) ~= "table" then
        return false, "cannot get the wireless status"
    end

	local triband = wireless_support_triband()
	local support_6g = wireless_support_6g()
	
    local wifi_2g = tmp_pick_data_v4(wifi_type, "2g", status_all)
    local wifi_5g = has_5G and tmp_pick_data_v4(wifi_type, "5g", status_all) or nil
    local data    = {basicCfg = {wifi_2g, wifi_5g}}
	local wifi_5g_2
    local wifi_6g

	if "yes" == triband then
		if support_6g == "yes" then
			wifi_6g = has_5G and tmp_pick_data_v4(wifi_type, "6g", status_all) or nil
	        data      = {basicCfg = {wifi_2g, wifi_5g, wifi_6g}}
        else
			wifi_5g_2 = has_5G and tmp_pick_data_v4(wifi_type, "5g_2", status_all) or nil
	        data      = {basicCfg = {wifi_2g, wifi_5g, wifi_5g_2}}
	    end
    end

    local wifi_2g_disabled = status_all[wifi_type .. "_2g_disabled"] or "on"
    local wifi_5g_disabled = has_5G and status_all[wifi_type .. "_5g_disabled"] or "on"
	local wifi_5g_2_disabled = (has_5G and "yes" == triband) and status_all[wifi_type .. "_5g_2_disabled"] or "on"
    local wifi_6g_disabled = (has_5G and "yes" == triband) and status_all[wifi_type .. "_6g_disabled"] or "on"

    --[[if wifi_2g_disabled == "on" or has_5G and wifi_5g_disabled == "on" then
        data["hardSwitchEn"] = "off"
    else
        data["hardSwitchEn"] = "on"
    end]]--
	data["hardSwitchEn"] = "on"

	if "yes" == triband then
		data["frequencyCount"] = "3"
	else
    if has_5G then
        data["frequencyCount"] = "2"
    else
        data["frequencyCount"] = "1"
    end
	end

    data["isSupportSmartConnect"] = uci_r:get_profile("wireless", "smart_connect") or "no"
    data["enableSmartConnect"] = uci_r:get("wireless", "smart", "smart_enable") or "off"
    -- default value 0, tether request without "smartConnect" will be ignore
    data["willSetSmartConnect"] = "0"

    local isSupportFFS = uci_r:get_profile("wireless", "ffs") or "no"
    data["isSupportAmazonFFS"] = isSupportFFS;
    if isSupportFFS == "yes" then
        data["enableFFS"] = uci_r:get("amazon_ffs", "ffs", "enable") or "on"
    end
    
    -- guest network 
    data["access"] = status_all["guest_access"] or "off"

    --dbg.dumptable(data)
    --dbg.printf("===================== leaving tmp_read_wifi_v4 ========================")
    
	return data
end

function wireless_tmp_read()
    return tmp_read_wifi("wireless", true)
end

function wireless_tmp_read_v4()
    return tmp_read_wifi_v4("wireless", true)
end

function wireless_tmp_read_guest()
    return tmp_read_wifi("guest", true)
end

function wireless_tmp_read_guest_v4()
    return tmp_read_wifi_v4("guest", true)
end

-- wangxiaolong@tp-link.net 
-- 2016/11/30
-- only for AC2700
function wireless_syspara_2g_set(lua_form)
	local sys = require "luci.sys"
	local ret = wireless_predefined_forms(lua_form)
	sys.fork_exec("/etc/init.d/usb start")
	return ret
end

function tmp_fill_value(lua_form, prefix)
    local values = {
        ["encryption"] = lua_form.secMode,
        ["ssid"]       = lua_form.ssid
    }

    if lua_form.secMode == "psk" then
        values["psk_key"]  = lua_form.pskCfg
    elseif lua_form.secMode == "wep" then
        values["wep_key1"] = lua_form.wepCfg
    elseif lua_form.secMode == "wpa" then
        values["server"]   = lua_form.wpaCfg_ip
        values["wpa_key"]  = lua_form.wpaCfg_passwd
		values["encryption"] = "psk"
        values["psk_version"] = "wpa"
	elseif lua_form.secMode == "wpa/wpa2" then
		values["encryption"] = "psk"
		values["psk_version"] = "auto"
	elseif lua_form.secMode == "wpa2" then
		values["encryption"] = "psk"
        values["psk_version"] = "rsn"
    end
	
	if values["encryption"] == "psk" then
		values["psk_key"]  = lua_form.pskCfg
    end

    return values
end

function tmp_fill_value_v4(lua_form, prefix)
    local values = {
        [prefix .. "_ssid"]       = lua_form[prefix .. "_ssid"]
    }
	local support_6g = wireless_support_6g()
    if lua_form[prefix .. "_securityMode"] == "none" then
        values[prefix .. "_encryption"] = "none"
    elseif lua_form[prefix .. "_securityMode"] == "wep" then
        values[prefix .. "_encryption"] = "wep"
    elseif lua_form[prefix .. "_securityMode"] == "wpaEnterprise" then
        values[prefix .. "_encryption"] = "wpa"
    elseif lua_form[prefix .. "_securityMode"] == "wpa/wpa2" then 
        values[prefix .. "_encryption"] = "psk"
        values[prefix .. "_psk_version"] = "auto"
    elseif lua_form[prefix .. "_securityMode"] == "wpa2" then 
        values[prefix .. "_encryption"] = "psk"
        values[prefix .. "_psk_version"] = "rsn"
    elseif lua_form[prefix .. "_securityMode"] == "wpa" then 
        values[prefix .. "_encryption"] = "psk"
        values[prefix .. "_psk_version"] = "wpa"
	--add by zhangshengbo for wpa3, merge form a6
	elseif lua_form[prefix .. "_securityMode"] == "wpa2/wpa3" then 
        values[prefix .. "_encryption"] = "psk_sae"
        values[prefix .. "_psk_version"] = "sae_transition"
    elseif lua_form[prefix .. "_securityMode"] == "wpa3" then 
        values[prefix .. "_encryption"] = "psk_sae"
        values[prefix .. "_psk_version"] = "sae_only"
    elseif lua_form[prefix .. "_securityMode"] == "wpa3_owe" then 
		values[prefix .. "_encryption"] = "owe"
		values[prefix .. "_psk_version"] = "owe_only"
    end

    if values[prefix .. "_encryption"] == "psk" or values[prefix .. "_encryption"] == "psk_sae" then
        values[prefix .. "_psk_key"]  = lua_form[prefix .. "_psk_key"]
    elseif values[prefix .. "_encryption"] == "wep" then
        values[prefix .. "_wep_key1"] = lua_form[prefix .. "_wep_key1"]
    elseif values[prefix .. "_encryption"] == "wpa" then
        values[prefix .. "_server"]   = lua_form[prefix .. "_server"]
        values[prefix .. "_wpa_key"]  = lua_form[prefix .. "_wpa_key"]
    end
	

    values[prefix .. "_hidden"]  = lua_form[prefix .. "_hidden"]

    if lua_form[prefix .. "_channel"] == "0" then
        values[prefix .. "_channel"]  = "auto" 
    else
	values[prefix .. "_channel"]  = lua_form[prefix .. "_channel"]
    end

    if lua_form[prefix .. "_htmode"] == "0" then
        values[prefix .. "_htmode"]  = "auto"
    else
        values[prefix .. "_htmode"]  = lua_form[prefix .. "_htmode"]
    end

    values[prefix .. "_hwmode"]    = lua_form[prefix .. "_hwmode"]
    values[prefix .. "_mu_mimo"]    = lua_form[prefix .. "_mu_mimo"]

    if support_6g == "yes" then
		if prefix == "wireless_6g" then
			values[prefix .. "_psc"]    = lua_form[prefix .. "_psc"]
		end
    end
    return values
end

function wireless_tmp_set(lua_form)
    local formvalue = {}
    local values
	local support_triband = wireless_support_triband()

    formvalue["operation"]                = "write"
    if lua_form.operation == "set" then
        if "yes" == support_triband then
            formvalue["form"]                 = {"wireless_2g", "wireless_5g", "wireless_5g_2"}
        else
            formvalue["form"]                 = {"wireless_2g", "wireless_5g"}
        end
        formvalue["wireless_2g_enable"]       = lua_form.enable2g or "off"
        formvalue["wireless_2g_disabled_all"] = lua_form.enable2g == "on" and "off" or "on"
        formvalue["wireless_5g_enable"]       = lua_form.enable5g or "off"
        formvalue["wireless_5g_disabled_all"] = lua_form.enable5g == "on" and "off" or "on"
        if "yes" == support_triband then
            formvalue["wireless_5g_2_enable"] = lua_form.enable5g_2 or "off"
            formvalue["wireless_5g_2_disabled_all"] = lua_form.enable5g_2 == "on" and "off" or "on"
        end
    elseif lua_form.operation == "set_2g" then
        formvalue["form"] = "wireless_2g"
        values = tmp_fill_value(lua_form, "wireless_2g")
    elseif lua_form.operation == "set_5g" then
        formvalue["form"] = "wireless_5g"
        values = tmp_fill_value(lua_form, "wireless_5g")
    elseif lua_form.operation == "set_5g_2" then
        formvalue["form"] = "wireless_5g_2" 
        values = tmp_fill_value(lua_form, "wireless_5g_2")
    else
        dbg("error operation".. lua_form.operation)
    end 

    if lua_form.operation ~= "set" then
        for k, v in pairs(values) do
                formvalue[k] = v
        end
    end

    return wireless_predefined_forms(formvalue)
end

function wireless_tmp_set_v4(lua_form)
    local formvalue = {}
    formvalue["form"]                     = {"wireless_2g", "wireless_5g"}
    formvalue["operation"]                = "write"
    formvalue["wireless_2g_enable"]       = lua_form.wireless_2g_enable or "off"
    formvalue["wireless_2g_disabled_all"] = lua_form.wireless_2g_enable == "on" and "off" or "on"
    formvalue["wireless_5g_enable"]       = lua_form.wireless_5g_enable or "off"
    formvalue["wireless_5g_disabled_all"] = lua_form.wireless_5g_enable == "on" and "off" or "on"

    local values = {}
    values[1] = tmp_fill_value_v4(lua_form, "wireless_2g")
    values[2] = tmp_fill_value_v4(lua_form, "wireless_5g")

    for i = 1, 2 do
        for k, v in pairs(values[i]) do
            formvalue[k] = v
        end
    end

    if lua_form.willSetSmartConnect == "on" then
        formvalue["form"]         = {"wireless_2g", "wireless_5g", "smart_connect"} 
        formvalue["smart_connect_smart_enable"] = lua_form.enableSmartConnect == "on" and "on" or "off"  
    end

	local isSupportFFS = uci_r:get_profile("wireless", "ffs") or "no"
	if isSupportFFS == "yes" then
		formvalue["enableFFS"] = lua_form.enableFFS or "off"
	end
	
    --dbg.dumptable(formvalue)

    return wireless_predefined_forms(formvalue)
end

function wireless_tmp_set_v4_tri_band(lua_form)
	-- dbg.printf("===================== enter wireless_tmp_set_v4_tri_band ========================")
	local support_6g = wireless_support_6g()
    local formvalue = {}
    if support_6g == "yes" then
    	formvalue["form"]                     = {"wireless_2g", "wireless_5g", "wireless_6g"}
    else
    	formvalue["form"]                     = {"wireless_2g", "wireless_5g", "wireless_5g_2"}
    end
    formvalue["operation"]                = "write"
    formvalue["wireless_2g_enable"]       = lua_form.wireless_2g_enable or "off"
    formvalue["wireless_2g_disabled_all"] = lua_form.wireless_2g_enable == "on" and "off" or "on"
    formvalue["wireless_5g_enable"]       = lua_form.wireless_5g_enable or "off"
    formvalue["wireless_5g_disabled_all"] = lua_form.wireless_5g_enable == "on" and "off" or "on"
    if support_6g == "yes" then
	    formvalue["wireless_6g_enable"]       = lua_form.wireless_6g_enable or "off"
	    formvalue["wireless_6g_disabled_all"] = lua_form.wireless_6g_enable == "on" and "off" or "on"
    else
		formvalue["wireless_5g_2_enable"]       = lua_form.wireless_5g_2_enable or "off"
	    formvalue["wireless_5g_2_disabled_all"] = lua_form.wireless_5g_2_enable == "on" and "off" or "on"
    end

    local values = {}
    values[1] = tmp_fill_value_v4(lua_form, "wireless_2g")
    values[2] = tmp_fill_value_v4(lua_form, "wireless_5g")
    if support_6g == "yes" then
    	values[3] = tmp_fill_value_v4(lua_form, "wireless_6g")
    else
		values[3] = tmp_fill_value_v4(lua_form, "wireless_5g_2")
	end

    for i = 1, 3 do
        for k, v in pairs(values[i]) do
            formvalue[k] = v
        end
    end

    if lua_form.willSetSmartConnect == "on" then
    	if support_6g == "yes" then
    		formvalue["form"]         = {"wireless_2g", "wireless_5g", "wireless_6g", "smart_connect"} 
    	else
        	formvalue["form"]         = {"wireless_2g", "wireless_5g", "wireless_5g_2", "smart_connect"} 
        end
        formvalue["smart_connect_smart_enable"] = lua_form.enableSmartConnect == "on" and "on" or "off"  
    end

    --dbg.dumptable(formvalue)

    return wireless_predefined_forms(formvalue)
end

function wireless_tmp_set_guest(lua_form)
    --dbg.dumptable(lua_form)
    local formvalue = {}
    local values
	local support_triband = wireless_support_triband()
    local status_all = wireless_status_all()
    local need_change = false

    formvalue["operation"]       = "write"
    if lua_form.operation == "set" then
        if "yes" == support_triband then
            formvalue["form"]        = {"guest", "guest_2g", "guest_5g", "guest_5g_2"}
        else
            formvalue["form"]        = {"guest", "guest_2g", "guest_5g"}
        end

        formvalue["guest_access"]    = lua_form.access
        formvalue["guest_2g_enable"] = lua_form.enable2g or "off"
        formvalue["guest_5g_enable"] = lua_form.enable5g or "off"
        if "yes" == support_triband then
            formvalue["guest_5g_2_enable"] = lua_form.enable5g_2 or "off"
        end
    elseif lua_form.operation == "set_2g" then
        formvalue["form"] = "guest_2g"
        values = tmp_fill_value(lua_form, "guest_2g")
    elseif lua_form.operation == "set_5g" then
        formvalue["form"] = "guest_5g"
        values = tmp_fill_value(lua_form, "guest_5g")
    elseif lua_form.operation == "set_5g_2" then
        formvalue["form"] = "guest_5g_2"
        values = tmp_fill_value(lua_form, "guest_5g_2")
    else
        dbg("error operation".. lua_form.operation)
    end

    if status_all["guest_2g5g_encryption"] == lua_form.secMode then
        if lua_form.secMode == "psk" and lua_form.pskCfg ~= status_all["guest_2g5g_psk_key"] then
            need_change = true

        elseif lua_form.secMode == "wep" and lua_form.wepCfg ~= status_all["guest_2g5g_wep_key1"] then
            need_change = true

        elseif lua_form.secMode == "wpa" and lua_form.wpaCfg_ip ~= status_all["guest_2g5g_server"] or lua_form.wpaCfg_passwd ~= status_all["guest_2g5g_wpa_key"] then
            need_change = true
        end
    else
        need_change = true
    end

    if lua_form.operation ~= "set" then
        if need_change == true then
            for k, v in pairs(values) do
                if k == "ssid" then
                    formvalue[formvalue["form"].."_"..k] = v
                else
                    formvalue["guest_2g5g_"..k] = v
                end
            end
            formvalue["form"] = {formvalue["form"], "guest_2g5g"}
        else
            formvalue["ssid"] = values["ssid"]
        end
    end

    --dbg.dumptable(formvalue)

    return wireless_predefined_forms(formvalue)
end


function tmp_guest_network_v4_pick_data(wifi_type, wifi_2G_5G, status_all)
	local data		 = {}
	local prefix	 = wifi_type .. "_" .. wifi_2G_5G
	local wifi_encry = status_all[prefix .. "_encryption"] or "none"
	local psk_version = status_all[prefix .. "_psk_version"] or "auto"
	local triband = wireless_support_triband()
	local support_6g = wireless_support_6g()

	data["ssid"] = nixio.bin.b64encode(status_all[prefix .. "_ssid"])
	
	if "guest" == wifi_type then
		if support_6g == "yes" and wifi_2G_5G == "6g" then
			prefix = wifi_type .. "_" .. "6g"
		else
			prefix = wifi_type .. "_" .. "2g5g"
		end
	end
	
	data["mac"] = status_all[prefix .. "_macaddr"]

	if wifi_2G_5G == "2g" then
		data["connType"] = "2.4G"
	elseif wifi_2G_5G == "5g" then
		data["connType"] = "5G"
	end
	
	if "yes" == triband then
		if support_6g == "yes" then
			if wifi_2G_5G == "5g" then
				data["connType"] = "5G"
			elseif wifi_2G_5G == "6g" then
				data["connType"] = "6G"
			end
		else
			if wifi_2G_5G == "5g" then
				data["connType"] = "5G-1"
			elseif wifi_2G_5G == "5g_2" then
				data["connType"] = "5G-2"
			end
		end
	end
	
	local tmp = wifi_type .. "_" .. wifi_2G_5G
	data["enable"] = status_all[tmp .. "_enable"] == "on" and true or false
  
	data["securityMode"] = "none"

	if wifi_encry == "none" then
		data["securityMode"] = "none"
	elseif wifi_encry == "wep" then
		data["securityMode"] = "wep"
	elseif wifi_encry == "wpa" then
		data["securityMode"] = "wpaEnterprise"
	elseif wifi_encry == "psk" then
		if psk_version == "auto" then
			data["securityMode"] = "wpa/wpa2"
		elseif psk_version == "rsn" then
			data["securityMode"] = "wpa2"
		elseif psk_version == "wpa" then
			data["securityMode"] = "wpa"
		end
	--add by zhangshengbo for wpa3, merge from a6
	elseif wifi_encry == "psk_sae" then
		if psk_version == "sae_transition" then
			data["securityMode"] = "wpa2/wpa3"
		elseif psk_version == "sae_only" then
			data["securityMode"] = "wpa3"
		end
	elseif wifi_encry == "owe" then
		--only support owe_only
		if psk_version == "owe_only" then
			data["securityMode"] = "wpa3_owe"
		end
	end

	data["password"] = status_all[prefix .. "_psk_key"]
	return data
end

function tmp_guest_network_v4_fill_allinfo(allinfo, gst_info, prefix)
	allinfo[prefix.."_ssid"] = nixio.bin.b64decode(gst_info.ssid)
	allinfo[prefix.."_enable"] = gst_info.enable == true and "on" or "off"

	-- set password and sercurity mode
	
	allinfo[prefix .. "_psk_key"]  = gst_info.password
	
	if gst_info.securityMode == "none" then	
		allinfo[prefix .. "_psk_key"] = nil
		allinfo[prefix .. "_encryption"] = "none"
	elseif gst_info.securityMode == "wpa3_owe" then
		allinfo[prefix .. "_encryption"] = "owe"
		allinfo[prefix .. "_psk_version"] = "owe_only"
	elseif gst_info.securityMode == "wep" then
		allinfo[prefix .. "_encryption"] = "wep"
	elseif gst_info.securityMode == "wpa" then
		allinfo[prefix .. "_encryption"] = "psk"
		allinfo[prefix .. "_psk_version"] = "wpa"
	elseif gst_info.securityMode == "wpa2" then
		allinfo[prefix .. "_encryption"] = "psk"
		allinfo[prefix .. "_psk_version"] = "rsn"
	elseif gst_info.securityMode == "wpa/wpa2" then
		allinfo[prefix .. "_encryption"] = "psk"
		allinfo[prefix .. "_psk_version"] = "auto"
	elseif gst_info.securityMode == "wpa3" then
		allinfo[prefix .. "_encryption"] = "psk_sae"
		allinfo[prefix .. "_psk_version"] = "sae_only"
	elseif gst_info.securityMode == "wpa2/wpa3" then
		allinfo[prefix .. "_encryption"] = "psk_sae"
		allinfo[prefix .. "_psk_version"] = "sae_transition"
	-- wpaEnterprise is not support
	--elseif gst_info.securityMode == "wpaEnterprise" then
	--	  allinfo[prefix .. "_encryption"] = "wpa"
	end

	return allinfo
end
--- Get the guest network params,based on guest_network_v4, opcode 0x0826
-- @para N/A
-- @return
function tmp_guest_network_v4_get(app_form)
	-- opcode 0x0826
	local status_all = wireless_status_all()
	if not status_all or type(status_all) ~= "table" then
		return false, "cannot get the wireless status"
	end

	local max_down_speed = 1000*1024
	local max_up_speed = 1000*1024
	
	local result = {}	
	local guestNetworkInfoList = {}
	local gst_info = {}
	local support_triband = wireless_support_triband()
	local support_6g = wireless_support_6g()

	-- bandwidth info
	local gst_bd_2g = {}
	local gst_bd_5g = {}
	local gst_bd_5g2 = {}
	local gst_bd_6g = {}

	-- It is supported by default. 
	-- If not, the corresponding flag field needs to be added in the profile.xml
	local isSupportLocalAccess = uci_r:get_profile("wireless", "guest_local_access") or "yes" 
	
	local isEffectiveTimeSupport = uci_r:get_profile("guestnetwork_effectivetime_ctrl", "support") or "no"
	local isBandwidthCtrlSupport = uci_r:get_profile("guestnetwork_bandwidth_ctrl", "support") or "no"
	
	local isEnableLocalAccess  = status_all["guest_access"] or "off"

	-- flag fields supporting corresponding functions
	result.isSupportLocalAccess = isSupportLocalAccess == "yes" and true or false
	result.isEffectiveTimeSupport = isEffectiveTimeSupport == "yes" and true or false
	result.isBandwidthCtrlSupport = isBandwidthCtrlSupport == "yes" and true or false
	-- enable switch
	result.isEnableLocalAccess = isEnableLocalAccess == "on" and true or false

	-- effective time info
	if isEffectiveTimeSupport == "yes" then
		local effective_time_info = gst_effectivetime_get()
		local effectiveTimeInfo = {}
		effectiveTimeInfo.type = effective_time_info.type
		effectiveTimeInfo.effectiveTime = effective_time_info.effective_time
		effectiveTimeInfo.remainTime = effective_time_info.remain_time
		result.effectiveTimeInfo = effectiveTimeInfo
	end

	-- band width info
	if isBandwidthCtrlSupport == "yes" then
		local bandwidth_info = gst_bandwidth_get()	
		-- 2.4g
		gst_bd_2g.enable = bandwidth_info.enable_2g == "on" and true or false
		gst_bd_2g.downLimitSpeed = bandwidth_info.down_band_2g or -1
		gst_bd_2g.upLimitSpeed = bandwidth_info.up_band_2g or -1
		gst_bd_2g.downMaxSpeed = max_down_speed
		gst_bd_2g.upMaxSpeed = max_up_speed
		-- 5g
		gst_bd_5g.enable = bandwidth_info.enable_5g1 == "on" and true or false
		gst_bd_5g.downLimitSpeed = bandwidth_info.down_band_5g1 or -1
		gst_bd_5g.upLimitSpeed = bandwidth_info.up_band_5g1 or -1
		gst_bd_5g.downMaxSpeed = max_down_speed
		gst_bd_5g.upMaxSpeed = max_up_speed
		-- 5g2
		if support_triband == "yes" then
			if support_6g == "yes" then
				gst_bd_6g.enable = bandwidth_info.enable_6g == "on" and true or false
				gst_bd_6g.downLimitSpeed = bandwidth_info.down_band_6g or -1
				gst_bd_6g.upLimitSpeed = bandwidth_info.up_band_6g or -1
				gst_bd_6g.downMaxSpeed = max_down_speed
				gst_bd_6g.upMaxSpeed = max_up_speed
			else
				gst_bd_5g2.enable = bandwidth_info.enable_5g2 == "on" and true or false
				gst_bd_5g2.downLimitSpeed = bandwidth_info.down_band_5g2 or -1
				gst_bd_5g2.upLimitSpeed = bandwidth_info.up_band_5g2 or -1
				gst_bd_5g2.downMaxSpeed = max_down_speed
				gst_bd_5g2.upMaxSpeed = max_up_speed
			end
		end
	end

	-- 2.4G info
	gst_info = tmp_guest_network_v4_pick_data("guest", "2g", status_all)
	if isBandwidthCtrlSupport == "yes" then
		gst_info.bandwidthCtrlInfo = gst_bd_2g
	end
	guestNetworkInfoList[#guestNetworkInfoList + 1] = gst_info
	
	-- 5G info
	local gst_info = tmp_guest_network_v4_pick_data("guest", "5g", status_all)
	if isBandwidthCtrlSupport == "yes" then
		gst_info.bandwidthCtrlInfo = gst_bd_5g
	end
	guestNetworkInfoList[#guestNetworkInfoList + 1] = gst_info

	-- 5G2 info
	if support_triband == "yes" then
		if support_6g == "yes" then
			gst_info = tmp_guest_network_v4_pick_data("guest", "6g", status_all)
		else
			gst_info = tmp_guest_network_v4_pick_data("guest", "5g_2", status_all)
		end
		if isBandwidthCtrlSupport == "yes" then
			gst_info.bandwidthCtrlInfo = gst_bd_5g2
		end
		guestNetworkInfoList[#guestNetworkInfoList + 1] = gst_info
	end
	result.guestNetworkInfoList = guestNetworkInfoList
	
	local ret = {}
	ret.result = luci.json.encode(result)
	return ret
end

--- Set the guest network params,based on guest_network_v4, opcode 0x0827
-- @para N/A
-- @return
function tmp_guest_network_v4_set(app_form)	
	-- opcode 0x0827
	local app_form = luci.json.decode(app_form.data)

	--dbg.dumptable(lua_form)
	local support_triband = wireless_support_triband()
	local support_6g = wireless_support_6g()
	local status_all = wireless_status_all()
	local isEffectiveTimeSupport = uci_r:get_profile("guestnetwork_effectivetime_ctrl", "support") or "no"
	local isBandwidthCtrlSupport = uci_r:get_profile("guestnetwork_bandwidth_ctrl", "support") or "no"
	local values
	local need_change = false
	local formvalue = {}
	local gst_info_2g = {}
	local gst_info_5g = {}
	local gst_info_5g2 = {}
	local gst_info_6g = {}
	local guestNetworkInfoList = {}
	if app_form.guestNetworkInfoList ~= nil then
		guestNetworkInfoList = app_form.guestNetworkInfoList
	else
		return false
	end

	-- pick guest network info from app_form
	for k, v in pairs(guestNetworkInfoList) do
		if v.connType == "2.4G" then
			gst_info_2g = v
		end
		if v.connType == "5G" then
			gst_info_5g = v
		end
		if "yes" == support_triband then
			if support_6g == "yes" then
				if v.connType == "5G" then
					gst_info_5g = v
				end
				if v.connType == "6G" then
					gst_info_6g = v
				end
			else
				if v.connType == "5G-1" then
					gst_info_5g = v
				end
				if v.connType == "5G-2" then
					gst_info_5g2 = v
				end
			end
		end
	end

	-- set operation and form info
	formvalue["operation"] = "write"
	
	if support_triband == "yes" then
		if support_6g == "yes" then
			formvalue["form"] = {"guest", "guest_2g", "guest_5g", "guest_6g", "guest_2g5g"}
		else
			formvalue["form"] = {"guest", "guest_2g", "guest_5g", "guest_5g_2", "guest_2g5g"}
		end
	else
		formvalue["form"] = {"guest", "guest_2g", "guest_5g", "guest_2g5g"}
	end

	-- trans 2.4G, 5G, 5G2 info
	formvalue = tmp_guest_network_v4_fill_allinfo(formvalue, gst_info_2g, "guest_2g")
	formvalue = tmp_guest_network_v4_fill_allinfo(formvalue, gst_info_5g, "guest_5g")
	if "yes" == support_triband then
		if support_6g == "yes" then
			formvalue = tmp_guest_network_v4_fill_allinfo(formvalue, gst_info_6g, "guest_6g")
		else
			formvalue = tmp_guest_network_v4_fill_allinfo(formvalue, gst_info_5g2, "guest_5g_2")
		end
	end

	-- set local access
	if app_form.isEnableLocalAccess ~= nil then
		formvalue["guest_access"] = app_form.isEnableLocalAccess == true and "on" or "off"
	end

	-- set effective time
	if isEffectiveTimeSupport == "yes" then
		local set_info = {}
		if app_form.effectiveTimeInfo ~= nil then
			set_info.type = app_form.effectiveTimeInfo.type
			set_info.effective_time = app_form.effectiveTimeInfo.effectiveTime
			gst_effectivetime_set(set_info)
		end
	end

	-- set band width
	if isBandwidthCtrlSupport == "yes" then
		local set_info = {}
		-- 2.4g
		if gst_info_2g.bandwidthCtrlInfo ~= nil then
			set_info.enable_2g = gst_info_2g.bandwidthCtrlInfo.enable == true and "on" or "off"
			if gst_info_2g.bandwidthCtrlInfo.downLimitSpeed ~= nil then
				set_info.down_band_2g = gst_info_2g.bandwidthCtrlInfo.downLimitSpeed
			end
			if gst_info_2g.bandwidthCtrlInfo.upLimitSpeed ~= nil then
				set_info.up_band_2g = gst_info_2g.bandwidthCtrlInfo.upLimitSpeed
			end
		end
		-- 5g
		if gst_info_5g.bandwidthCtrlInfo ~= nil then
			set_info.enable_5g1 = gst_info_5g.bandwidthCtrlInfo.enable == true and "on" or "off"
			if gst_info_5g.bandwidthCtrlInfo.downLimitSpeed ~= nil then
				set_info.down_band_5g1 = gst_info_5g.bandwidthCtrlInfo.downLimitSpeed
			end
			if gst_info_5g.bandwidthCtrlInfo.upLimitSpeed ~= nil then
				set_info.up_band_5g1 = gst_info_5g.bandwidthCtrlInfo.upLimitSpeed
			end
		end
		-- 5g2
		if support_triband == "yes" and gst_info_5g2.bandwidthCtrlInfo ~= nil then
			set_info.enable_5g2 = gst_info_5g2.bandwidthCtrlInfo.enable == true and "on" or "off"
			if gst_info_5g2.bandwidthCtrlInfo.downLimitSpeed ~= nil then
				set_info.down_band_5g2 = gst_info_5g2.bandwidthCtrlInfo.downLimitSpeed
			end
			if gst_info_5g2.bandwidthCtrlInfo.upLimitSpeed ~= nil then
				set_info.up_band_5g2 = gst_info_5g2.bandwidthCtrlInfo.upLimitSpeed
			end
		elseif support_triband == "yes" and gst_info_6g.bandwidthCtrlInfo ~= nil then
			set_info.enable_6g = gst_info_6g.bandwidthCtrlInfo.enable == true and "on" or "off"
			if gst_info_6g.bandwidthCtrlInfo.downLimitSpeed ~= nil then
				set_info.down_band_6g = gst_info_6g.bandwidthCtrlInfo.downLimitSpeed
			end
			if gst_info_6g.bandwidthCtrlInfo.upLimitSpeed ~= nil then
				set_info.up_band_6g = gst_info_6g.bandwidthCtrlInfo.upLimitSpeed
			end
		end
		gst_bandwidth_set(set_info)
	end
	
	local ret = {}
	local result = wireless_predefined_forms(formvalue)
	ret.result = luci.json.encode(result)
	return ret
end

--- get the bandwidth switch status, opcode 0x0828
-- @para N/A
-- @return
function tmp_bandwidth_switch_status_get(app_form)	
	local result = {}
	local band_form = {}
	local bandwidthSwitchStatusList = {}
	local channelWidth
	local ifname_5g
	local support_triband = wireless_support_triband()
    local support_6g = wireless_support_6g()

	if support_triband == "yes" and support_6g ~= "yes" then
		band_form["5G-1"] = "5g"
		band_form["5G-2"] = "5g_2"
	else
		band_form["5G"] = "5g"
	end

	for k, v in pairs(band_form) do
		local switch_result = {}
		
		switch_result.connType = k

		ifname_5g = wlan.Apcfg():wireless_get_interface(v)
		-- BCM
		if luci.sys.call("wl -i %s dfs_status | grep -wq CAC" % ifname_5g) == 0 then
			switch_result.status = "switching"
		else
			switch_result.status = "idle"
		end

		-- BCM
		local fp = io.popen("wl -i %s status | grep Chanspec | awk -F ' ' '{print $5}'" % ifname_5g)
		if fp then
			channelWidth = fp:read()
			if channelWidth == "20MHz" then
				switch_result.channelWidth = 20
			elseif channelWidth == "40MHz" then
				switch_result.channelWidth = 40
			elseif channelWidth == "80MHz" then
				switch_result.channelWidth = 80
			elseif channelWidth == "160MHz" then
				switch_result.channelWidth = 160
			else
				switch_result.channelWidth = 160
			end
	        fp:close()
		else
			switch_result.channelWidth = 160
		end
		
		bandwidthSwitchStatusList[#bandwidthSwitchStatusList + 1] = switch_result
	end
	result.bandwidthSwitchStatusList = bandwidthSwitchStatusList

	local ret = {}
	ret.result = luci.json.encode(result)
	return ret
end

--- Get the max limited number of the devices.
-- @param  N/A
-- @return #table Data of the max limited number of the devices.
function max_mac_filter()
    return {max_rules = uci_r:get_profile("wireless","max_mac_filter")}
end

-- 7 options marked by "sec_num" number, "sec_num" match the number of "encryption" from UI
local wireless_security_opt_table = {
    {sec = "None",                        sec_num = "0", encryption = "none",    psk_cipher = "auto", psk_version = "auto"},
    {sec = "WPA2-PSK[AES]",               sec_num = "1", encryption = "psk",     psk_cipher = "aes",  psk_version = "rsn"},
    {sec = "WPA2-PSK[AES]+WPA-PSK[TKIP]", sec_num = "2", encryption = "psk",     psk_cipher = "auto", psk_version = "auto"},
    {sec = "WPA3-Personal",               sec_num = "3", encryption = "psk_sae", psk_cipher = "aes",  psk_version = "sae_only"},
    {sec = "WPA3-Personal+WPA2-PSK[AES]", sec_num = "4", encryption = "psk_sae", psk_cipher = "aes",  psk_version = "sae_transition"},
    {sec = "WPA2-Enterprise",             sec_num = "5", encryption = "wpa",     wpa_cipher = "aes",  wpa_version = "rsn"},
    {sec = "WPA/WPA2-Enterprise",         sec_num = "6", encryption = "wpa",     wpa_cipher = "auto", wpa_version = "auto"},
    {sec = "Enhanced Open",               sec_num = "7", encryption = "owe",     psk_cipher = "aes",  psk_version = "owe_only"}
}

-- According to the number of encryption, get other args and write them into profiles
function security_opt_trans_write(formvalue, form)
    for i in pairs(form) do
        for j in pairs(wireless_security_opt_table) do
            if formvalue[form[i].."_encryption"] == wireless_security_opt_table[j].sec_num then
                formvalue[form[i].."_encryption"]  = wireless_security_opt_table[j].encryption
                if formvalue[form[i].."_encryption"] == "wpa" then
                    formvalue[form[i].."_wpa_cipher"]  = wireless_security_opt_table[j].wpa_cipher  or "auto"
                    formvalue[form[i].."_wpa_version"] = wireless_security_opt_table[j].wpa_version or "auto"
                elseif formvalue[form[i].."_encryption"] ~= "none" then
                    formvalue[form[i].."_psk_cipher"]  = wireless_security_opt_table[j].psk_cipher  or "auto"
                    formvalue[form[i].."_psk_version"] = wireless_security_opt_table[j].psk_version or "auto"
                end
                break
            end
        end
    end

    return formvalue
end

-- get the number of encryption by match the args in profiles.
function security_opt_trans_read(forms)
    for i in pairs(wireless_security_opt_table) do
        if forms.encryption == "wpa" then
            if forms.wpa_version == wireless_security_opt_table[i].wpa_version and
               forms.wpa_cipher == wireless_security_opt_table[i].wpa_cipher   then
                forms.encryption = wireless_security_opt_table[i].sec_num or ""
            end
        elseif forms.encryption == "none"  then
            if forms.encryption == wireless_security_opt_table[i].encryption then
                forms.encryption = wireless_security_opt_table[i].sec_num or ""
            end
        else
            if forms.encryption == wireless_security_opt_table[i].encryption   and
               forms.psk_cipher == wireless_security_opt_table[i].psk_cipher   and
               forms.psk_version == wireless_security_opt_table[i].psk_version then
            	forms.encryption = wireless_security_opt_table[i].sec_num or ""
            end
        end
    end

    return forms
end

-- Using predefined forms in luci.model.wireless , for webpages-spf
-- @param  N/A
-- @return 
function wireless_predefined_forms_read_spf(formvalue, args)
    local form    = formvalue["form"] or ""
    local operate = ""
    local ret = {}
    local ap = wlan.Apcfg(form, (args ~= true and args))
	
    -- transform operation read_spf to read
    formvalue["operation"] = "read"
    operate = formvalue["operation"] or ""
    func = ap[operate] or ap["read"]
    ret = func(ap, formvalue)
	
    ret = security_opt_trans_read(ret)

    return ret
end

-- Using predefined forms in luci.model.wireless, for webpages-spf
-- @param  N/A
-- @return 
function wireless_predefined_forms_write_spf(formvalue, args)
    local form    = formvalue["form"] or ""
    local operate = ""
    local ret = {}
    local ap = wlan.Apcfg(form, (args ~= true and args))
	
    -- transform operation write_spf to write
    formvalue["operation"] = "write"
    operate = formvalue["operation"] or ""
    formvalue = security_opt_trans_write(formvalue, form)
    func = ap[operate] or ap["read"]
    ret = func(ap, formvalue)

    return ret
end

function wireless_predefined_forms(formvalue, args)
    local form    = formvalue["form"] or ""
    local operate = formvalue["operation"] or ""

    local ap = wlan.Apcfg(form, (args ~= true and args))
    func = ap[operate] or ap["read"]

    return func(ap, formvalue)
end

--- Get the wireless supports triband or not
-- @para N/A
-- @return
function wireless_support_triband()
	local support_triband
	support_triband = uci_r:get_profile("wireless","support_triband") or "no"
	return support_triband
end

--- Get the wireless supports 6g or not
-- @para N/A
-- @return
function wireless_support_6g()
	local support_6g
	support_6g = uci_r:get_profile("wireless","support_6g") or "no"
	return support_6g
end

--- Get all of the wireless status.
-- @param  N/A
-- @return 
function wireless_status_all(formvalue)
    local form = {}
    local support_triband = wireless_support_triband()
    local support_6g = wireless_support_6g()

    if support_triband == "yes" then
        if support_6g == "yes" then
            form = {"wireless_2g", "wireless_5g", "wireless_6g", "guest_2g"
                    , "guest_5g", "guest_6g", "guest", "guest_2g5g"}
        else
            form = {"wireless_2g", "wireless_5g", "wireless_5g_2", "guest_2g"
                    , "guest_5g", "guest_5g_2", "guest", "guest_2g5g"}
        end
    else
        form = {"wireless_2g", "wireless_5g", "guest_2g", "guest_5g", "guest", "guest_2g5g"}
    end
    return wlan.Apcfg(form):read()
end

-- >>>beding wireless schedule

local sys = require "luci.sys"
local WIRELESS_SCHEDULE_SHELL = "/etc/init.d/wireless_schedule restart"
local WIRELESS_SCHEDULE_SHELL_STOP = "/etc/init.d/wireless_schedule stop"

function wireless_schedule_do_cmd(cmd)
    local data = {}
    local util = require("io").popen("env -i /sbin/wifi wireless_schedule " .. cmd)

    if util then
        local ln, key, val
        while true do
            ln = util:read("*l")
            if ln then
                if ln == "over" then break end
                key, val = ln:match("([^\:]+)\: (.+)")
                data[key] = val
            else
                break
            end
        end
        util:close()
    end

    return data
end

function wireless_schedule_get_wifi_disable()
    local data = {}
    local res  = {}

    res = wireless_schedule_do_cmd("get_wifi_disable all")

    data["disable_2g"]  = false or (res["disable_2g"]  == "1")
    data["disable_5g"]  = false or (res["disable_5g"]  == "1")
    data["disable_52g"] = false or (res["disable_52g"] == "1")
    data["disable_6g"] = false or (res["disable_6g"] == "1")

    return data
end

function wireless_schedule_get(band)
    local data = {}

    data["enable"]   = uci_r:get("wireless_schedule", band, "enable")
    data["calendar"] = uci_r:get("wireless_schedule", band, "calendar")

    return data
end

function wireless_schedule_set(http_form, band)
    local old = wireless_schedule_get(band)
    local new = http_form
	local sche_restart = false
	local need_commit = false
    local support_triband = wireless_support_triband()
    local support_6g = wireless_support_6g()
    local smart_conn      = uci_r:get("wireless", "smart", "enable") or "off"

    if smart_conn == "on" then
        if nil ~= new.enable then
		    need_commit = true
            uci_r:set("wireless_schedule", "2g",  "enable", new.enable)
            uci_r:set("wireless_schedule", "5g",  "enable", new.enable)
            if support_triband == "yes" then
                if support_6g == "yes" then
                    uci_r:set("wireless_schedule", "6g",  "enable", new.enable)
                else
                    uci_r:set("wireless_schedule", "52g", "enable", new.enable)
                end
            end
        end
        if nil ~= new.calendar then
		    need_commit = true
            uci_r:set("wireless_schedule", "2g",  "calendar", new.calendar)
            uci_r:set("wireless_schedule", "5g",  "calendar", new.calendar)
            if support_triband == "yes" then
                if support_6g == "yes" then
                    uci_r:set("wireless_schedule", "6g",  "calendar", new.calendar)
                else
                    uci_r:set("wireless_schedule", "52g", "calendar", new.calendar)
                end
            end
        end
    else
	if new.calendar == nil then
	    return true
	end

        if new.enable == nil and new.calendar == old.calendar then
            -- do nothing
            return sche_restart
        end

        if nil ~= new.enable then
		    need_commit = true
            uci_r:set("wireless_schedule", band, "enable", new.enable)
        end
        if nil ~= new.calendar then
		    need_commit = true
            uci_r:set("wireless_schedule", band, "calendar", new.calendar)
        end
    end

    if need_commit == true then
        uci_r:commit("wireless_schedule")
    end
	
	sche_restart = true
	
    return sche_restart
end

function sortFunc(a, b)
	if a[2] == b[2] then
		return a[1] < b[1]
	else
		return a[2] < b[2]
	end
end

function list_to_calendar(config)

    if type(config) ~= "table" then 
    	return false 
    end

    if next(config) == nil then 
    	return nil 
    end

    --func split
    for i, v in pairs(config) do
        n, _ = v:find(":")
        if n > 4 then
            time = v:sub(n+1)
            for m =1, n, 4 do
                tmp = v:sub(m,m+2)
                table.insert(config,tmp..":"..time)
            end
        end
    end

    for i=1, #(config) do
        for i,v in pairs(config) do
            n,_ = v:find(":")
            if n > 4 then
                table.remove(config,i)
            end
        end
    end

    for i, v in pairs(config) do
        day = v:sub(1,3)
        if day == "eve" then
            time = v:sub(5)
            table.insert(config, "mon:"..time)
            table.insert(config, "tue:"..time)
            table.insert(config, "wed:"..time)
            table.insert(config, "thu:"..time)
            table.insert(config, "fri:"..time)
            table.insert(config, "sat:"..time)
            table.insert(config, "sun:"..time)
        end
    end
    
    for i=1, #(config) do
        for i,v in pairs(config) do
            day = v:sub(1,3)
            if day == "eve" then
                table.remove(config, i)
            end
        end
    end

    --func split
	local temp_time = {}
	local to_remove = {}
	for _, v in pairs(week) do
		temp_time[v] = {}
	end
	local temp
	for p, v in pairs(config) do
		day = v:sub(1,3)
		n, _ = v:find(",")
		time1 = tonumber(v:sub(6,n-1))
		time2 = tonumber(v:sub(n+1,#v-1))
		if time1 >= time2 then
			if time2 == 0 and time1 == 24 then
				to_remove[#to_remove+1] = p
			elseif time2 == 0 then
				config[p] = day .. ":[" .. time1 .. ",24]"
			else
				if time1 == 24 then
					to_remove[#to_remove+1] = p
				else
					config[p] = day .. ":[" .. time1 .. ",24]"
				end
				for k, _ in pairs(week) do
					if day == "sun" then
						day = "mon"
						break
					elseif day == week[k] then
						day = week[k+1]
						break
					end
				end
				table.insert(config, day .. ":[0," .. time2 .. "]")
			end
		end
	end

	local tmp_config = {}
	for i,v in pairs(config) do
		local k = -1
		for j=1, #(to_remove) do
			if i == to_remove[j] then
				k = i
			end
		end
		if k == -1 then
			table.insert(tmp_config, v)
		end
	end
	config = tmp_config

    --func merge
    to_remove = {}
	for i, v in pairs(config) do
		while true do
			day = v:sub(1,3)
			if day == "del" then
				break
			end
			time = v:sub(5)
			for m, n in pairs(config) do
				if m > i then
					tmpd=n:sub(1,3)
					if day == tmpd then
						tmpt = day..":"..time ..","..n:sub(5)
						time = tmpt:sub(5)
						config[i] = tmpt
						config[m] = "del:"..n:sub(5)
						--table.remove(config,m)
						remove_flag = 1
						for _, k in pairs(to_remove) do
							if k == m then 
								remove_flag = 0
								break
							end
						end
						if remove_flag == 1 then to_remove[#to_remove+1] = m end
					end
				end
			end
			break
		end
	end

    tmp_config = {}
    for i,v in pairs(config) do
        local k = -1
        for j=1, #(to_remove) do
            if i == to_remove[j] then
                k = i
            end
        end
        if k == -1 then
            table.insert(tmp_config, v)
        end
    end

    config = tmp_config

    --func merge each line
    tstring = "{"
    for p, v in pairs(config) do
        day = v:sub(1,3)
        tstring = tstring .. "\"" .. day .. "\":"
        time = v:sub(5)
        time = string.gsub(time,'%[','{')
        time = string.gsub(time,'%]','}')
        time = "{" .. time .. "}"
        time = loadstring("return " .. time)()
        table.sort(time, sortFunc)
        for i = #time, 2, -1 do
            if time[i-1][2] == time[i][2] then
                table.remove(time, i)
            elseif time[i-1][2] >= time[i][1] then
				if time[i-1][1] >= time[i][1] then
					time[i-1][1] = time[i][1]
				end
                time[i-1][2] = time[i][2]
                table.remove(time, i)
            end
        end
        tstring = tstring .. "["
        for n, i in pairs(time) do
            tstring = tstring .. "["
            for m, j in pairs(i) do
                tstring = tstring .. j
                if m ~= 2 then tstring = tstring .. "," end
            end
            tstring = tstring .. "]"
            if n ~= #time then tstring = tstring .. "," end
        end
        tstring = tstring .. "]"
        if p ~= #config then tstring = tstring .. "," end
    end
    tstring = tstring .. "}"
    return tstring

end

function wireless_schedule_set_all(http_form)
    require "luci.json"
    local http_list = http_form.list
    local enable = http_form.enable
    local list = luci.json.decode(http_list)
    local support_triband = wireless_support_triband()
    local support_6g = wireless_support_6g()
    local data = nil
	local sche_stop = false
    local sche_restart = false
    local need_commit = false

    if list == nil and enable ~= nil then
        uci_r:set("wireless_schedule","set","enable",enable)
        uci_r:set("wireless_schedule","2g","enable",enable)
        uci_r:set("wireless_schedule","5g","enable",enable)
        if support_triband == "yes" then 
            if support_6g == "yes" then 
                uci_r:set("wireless_schedule","6g","enable",enable)
            else
                uci_r:set("wireless_schedule","52g","enable",enable)
            end
        end

        need_commit = true
		if enable == "off" then
			sche_stop = true
		else
			sche_restart = true
		end
        data = wireless_schedule_get_all()
    elseif enable == nil and list ~= nil then
        uci_r:delete("wireless_schedule","set","time")
		if next(list) ~= nil then
			uci_r:set_list("wireless_schedule","set","time",list)
		else
			uci_r:delete("wireless_schedule","2g","calendar")
			uci_r:delete("wireless_schedule","5g","calendar")
			if support_triband == "yes" then 
				if support_6g == "yes" then 
					uci_r:delete("wireless_schedule","6g","calendar") 
				else
					uci_r:delete("wireless_schedule","52g","calendar")
				end
			end
		end

        local config = uci_r:get_list("wireless_schedule","set","time")
        local cal = list_to_calendar(config)
        http_form.calendar = cal

        if (support_triband == "no" or wireless_schedule_set(http_form, "52g") == true) and
           wireless_schedule_set(http_form, "2g") == true and
           wireless_schedule_set(http_form, "5g") == true
        then
            sche_restart = true
        end
        need_commit = true

        data = wireless_schedule_get_all()
    end

    if need_commit == true then
        uci_r:commit("wireless_schedule")
    end

	if sche_stop == true then
		sys.fork_call(WIRELESS_SCHEDULE_SHELL_STOP)
	end

    if sche_restart == true then
        sys.fork_call(WIRELESS_SCHEDULE_SHELL)
    end
	
    if data then
        return data
    else
        return false
    end
end

function wireless_schedule_get_all()
    local ret = {}
    local ntp_enable = uci_r:get("system","ntp","type")
    local support_triband = wireless_support_triband()
    local support_6g = wireless_support_6g()

    if ntp_enable ~= "auto" then
        uci_r:set("wireless_schedule","set","enable","off")
        uci_r:set("wireless_schedule","2g","enable","off")
        uci_r:set("wireless_schedule","5g","enable","off")
        if support_triband == "yes" then 
            if support_6g == "yes" then
                uci_r:set("wireless_schedule","6g","enable","off") 
            else
                uci_r:set("wireless_schedule","52g","enable","off") 
            end
        end
        uci_r:commit("wireless_schedule")
        ret.enable = "off"
        return ret
    end
    local enable = uci_r:get("wireless_schedule","set","enable")
    local list = uci_r:get_list("wireless_schedule","set","time")
    ret.enable = enable
    ret.list = list
    return ret
end

function wireless_schedule_get_2g()
    return wireless_schedule_get("2g")
end

function wireless_schedule_set_2g(http_form)
    if wireless_schedule_set(http_form, "2g") == true then
        sys.fork_exec(WIRELESS_SCHEDULE_SHELL)
    end

    return wireless_schedule_get_2g()
end

function wireless_schedule_get_5g()
    return wireless_schedule_get("5g")
end

function wireless_schedule_set_5g(http_form)
    if wireless_schedule_set(http_form, "5g") == true then
        sys.fork_exec(WIRELESS_SCHEDULE_SHELL)
    end

    return wireless_schedule_get_5g()
end

function wireless_schedule_get_52g()
    return wireless_schedule_get("52g")
end

function wireless_schedule_set_52g(http_form)
    if wireless_schedule_set(http_form, "52g") == true then
        sys.fork_exec(WIRELESS_SCHEDULE_SHELL)
    end

    return wireless_schedule_get_52g()
end

function wireless_schedule_get_6g()
    return wireless_schedule_get("6g")
end

function wireless_schedule_set_6g(http_form)
    if wireless_schedule_set(http_form, "6g") == true then
        sys.fork_exec(WIRELESS_SCHEDULE_SHELL)
    end

    return wireless_schedule_get_6g()
end

-- <<<end wireless schedule

--- >>  add for SPF UI wireless interface
function wireless_addition_setting_get()
    local formvalue = {}
    local support_triband = wireless_support_triband()
    local support_6g = wireless_support_6g()
    local result = {}
    local ret = {}

    --dbg.dumptable(http_form)

    formvalue["operation"] = "write"

    if support_triband == "yes" then
        if support_6g == "yes" then
            formvalue["form"] = {"syspara_2g", "syspara_6g", "syspara_5g"}
        else
            formvalue["form"] = {"syspara_2g", "syspara_5g_2", "syspara_5g"}
        end
    else
        formvalue["form"] = {"syspara_2g", "syspara_5g"}
    end

    --dbg.dumptable(formvalue)
    result = wireless_predefined_forms(formvalue)
    
    -- build result
    for oldk, value in pairs(result) do
        for _, name in ipairs(formvalue["form"]) do
            local prefix = name .. "_"
            local newk = oldk:match("^%s(.*)$" % prefix)
            if newk then
                ret[newk] = value
                break
            end
        end
    end
    -- dbg.dumptable(ret)

    return ret
end

function wireless_addition_setting_set(http_form)
    local formvalue = {}
    local support_triband = wireless_support_triband()
    local support_6g = wireless_support_6g()
    local result = {}
    local ret = {}

    --dbg.dumptable(http_form)

    formvalue["operation"] = "write"

    if support_triband == "yes" then
        if support_6g == "yes" then
            formvalue["form"] = {"syspara_2g", "syspara_6g", "syspara_5g"}
        else
            formvalue["form"] = {"syspara_2g", "syspara_5g_2", "syspara_5g"}
        end
    else
        formvalue["form"] = {"syspara_2g", "syspara_5g"}
    end

    -- set all band data
    for _, name in ipairs(formvalue["form"]) do
        local prefix = name .. "_"
        for key,value in pairs(http_form) do
            formvalue[prefix .. key] = value
        end
    end

    --dbg.dumptable(formvalue)
    result = wireless_predefined_forms(formvalue)
    
    -- build result
    for oldk, value in pairs(result) do
        for _, name in ipairs(formvalue["form"]) do
            local prefix = name .. "_"
            local k = oldk:match("^%s(.*)$" % prefix)
            if k then
                ret[k] = value
                break
            end
        end
    end

    --dbg.dumptable(ret)
    return ret
end


function gst_effectivetime_get()
	local data = {}
	data.type = uci_r:get("guestnetwork_effectivetime_ctrl", "settings", "type") or "none"
	data.effective_time = uci_r:get("guestnetwork_effectivetime_ctrl", "settings", "effective_time") or "-1"
	local remain_time = uci_r:get("guestnetwork_effectivetime_ctrl", "settings", "remain_time") or "-1"
	if remain_time ~= nil and remain_time ~= "" and remainTime ~= "-1" then
		data.remain_time = math.ceil(remain_time/60)
	else
		data.remain_time = 0
	end
	
	return data
end

function gst_effectivetime_set(form_value)
	if not form_value then
		return false
	end
	if form_value.type then
		uci_r:set("guestnetwork_effectivetime_ctrl", "settings", "type", form_value.type)
	end
	if form_value.effective_time then
		local finish_time
		local remain_time
		if form_value.effective_time ~= "-1" and form_value.effective_time ~= -1 and form_value.effective_time ~= "" then
			finish_time = os.time() + tonumber(form_value.effective_time)*60
			remain_time = tonumber(form_value.effective_time)*60
		else
			finish_time = -1
			remain_time = -1
		end
		uci_r:set("guestnetwork_effectivetime_ctrl", "settings", "effective_time", form_value.effective_time)
		uci_r:set("guestnetwork_effectivetime_ctrl", "settings", "finish_time", finish_time)
		uci_r:set("guestnetwork_effectivetime_ctrl", "settings", "remain_time", remain_time)
	end
	uci_r:commit("guestnetwork_effectivetime_ctrl")
	sys.fork_exec("/etc/init.d/guestnetwork_effectivetime_ctrl restart &")

	return gst_effectivetime_get()
end

function gst_bandwidth_get()
	local support_triband = uci_r:get_profile("wireless", "support_triband") or "no"
	local support_6g = wireless_support_6g()
	local data = {}
	-- 2.4g
	data.enable_2g = uci_r:get("guestnetwork_bandwidth_ctrl", "settings", "enable_2g") or "off"
	data.down_band_2g = uci_r:get("guestnetwork_bandwidth_ctrl", "settings", "down_band_2g") or "-1"
	data.up_band_2g = uci_r:get("guestnetwork_bandwidth_ctrl", "settings", "up_band_2g") or "-1"

	-- 5g
	data.enable_5g1 = uci_r:get("guestnetwork_bandwidth_ctrl", "settings", "enable_5g1") or "off"
	data.down_band_5g1 = uci_r:get("guestnetwork_bandwidth_ctrl", "settings", "down_band_5g1") or "-1"
	data.up_band_5g1 = uci_r:get("guestnetwork_bandwidth_ctrl", "settings", "up_band_5g1") or "-1"

	-- 5g2
	if support_triband == "yes" then
		if support_6g == "yes" then
			data.enable_6g = uci_r:get("guestnetwork_bandwidth_ctrl", "settings", "enable_6g") or "off"
			data.down_band_6g = uci_r:get("guestnetwork_bandwidth_ctrl", "settings", "down_band_6g") or "-1"
			data.up_band_6g = uci_r:get("guestnetwork_bandwidth_ctrl", "settings", "up_band_6g") or "-1"
		else
			data.enable_5g2 = uci_r:get("guestnetwork_bandwidth_ctrl", "settings", "enable_5g2") or "off"
			data.down_band_5g2 = uci_r:get("guestnetwork_bandwidth_ctrl", "settings", "down_band_5g2") or "-1"
			data.up_band_5g2 = uci_r:get("guestnetwork_bandwidth_ctrl", "settings", "up_band_5g2") or "-1"
		end
	end

	return data
end

function gst_bandwidth_set(form_value)
	if not form_value then
		return false
	end
	local support_triband = uci_r:get_profile("wireless", "support_triband") or "no"
	local support_6g = wireless_support_6g()
	
	-- 2.4G
	if form_value.enable_2g then
		uci_r:set("guestnetwork_bandwidth_ctrl", "settings", "enable_2g", form_value.enable_2g)
	end
	if form_value.down_band_2g then
		uci_r:set("guestnetwork_bandwidth_ctrl", "settings", "down_band_2g", form_value.down_band_2g)
	end
	if  form_value.up_band_2g then
		uci_r:set("guestnetwork_bandwidth_ctrl", "settings", "up_band_2g", form_value.up_band_2g)
	end
	
	-- 5G
	if form_value.enable_5g1 then
		uci_r:set("guestnetwork_bandwidth_ctrl", "settings", "enable_5g1", form_value.enable_5g1)
	end
	if form_value.down_band_5g1 then
		uci_r:set("guestnetwork_bandwidth_ctrl", "settings", "down_band_5g1", form_value.down_band_5g1)
	end
	if form_value.up_band_5g1 then
		uci_r:set("guestnetwork_bandwidth_ctrl", "settings", "up_band_5g1", form_value.up_band_5g1)
	end
	
	-- 5G2
	if support_triband == "yes" then
		if support_6g == "yes" then
			if form_value.enable_6g then
			uci_r:set("guestnetwork_bandwidth_ctrl", "settings", "enable_6g", form_value.enable_6g)
			end
			if form_value.down_band_6g then
				uci_r:set("guestnetwork_bandwidth_ctrl", "settings", "down_band_6g", form_value.down_band_6g)
			end
			if form_value.up_band_6g then
				uci_r:set("guestnetwork_bandwidth_ctrl", "settings", "up_band_6g", form_value.up_band_6g)
			end
		else
			if form_value.enable_5g2 then
				uci_r:set("guestnetwork_bandwidth_ctrl", "settings", "enable_5g2", form_value.enable_5g2)
			end
			if form_value.down_band_5g2 then
				uci_r:set("guestnetwork_bandwidth_ctrl", "settings", "down_band_5g2", form_value.down_band_5g2)
			end
			if form_value.up_band_5g2 then
				uci_r:set("guestnetwork_bandwidth_ctrl", "settings", "up_band_5g2", form_value.up_band_5g2)
			end
		end
	end
	uci_r:commit("guestnetwork_bandwidth_ctrl")
	sys.fork_exec("/etc/init.d/guestnetwork_bandwidth_ctrl restart &")

	return gst_bandwidth_get()
end

function guestnetwork_effectivetime_get()
	return gst_effectivetime_get()
end

function guestnetwork_effectivetime_set(http_form)
	if not http_form then
		return false
	end
	return gst_effectivetime_set(http_form)
end

function guestnetwork_bandwidth_get()
	return gst_bandwidth_get()
end

function guestnetwork_bandwidth_set(http_form)
	if not http_form then
		return false
	end
	return gst_bandwidth_set(http_form)
end

--- << end for SPF UI wireless interface


-- Wireless forms, the table is informat {args=true/false/{table}, ...}.
-- false means using a function in luci.controller.admin.wireless
-- true means using predefined forms in luci.model.wireless
-- {table} means using a subset of the predefined forms in luci.model.wireless
local wireless_form = {
    status_all = {
        [".super"] = {cb = wireless_status_all}
    },
    wireless_2g = {
        [".super"] = {cb = wireless_predefined_forms, args = true},
        ["write_spf"] = {cb = wireless_predefined_forms_write_spf, args = true},
        ["read_spf"] = {cb = wireless_predefined_forms_read_spf, args = true}
    },
    wireless_5g = {
        [".super"] = {cb = wireless_predefined_forms, args = true},
        ["write_spf"] = {cb = wireless_predefined_forms_write_spf, args = true},
        ["read_spf"] = {cb = wireless_predefined_forms_read_spf, args = true}
    },
    wireless_5g_2 = {
        [".super"] = {cb = wireless_predefined_forms, args = true},
        ["write_spf"] = {cb = wireless_predefined_forms_write_spf, args = true},
        ["read_spf"] = {cb = wireless_predefined_forms_read_spf, args = true}
    },
    wireless_6g = {
        [".super"] = {cb = wireless_predefined_forms, args = true}
    },
    guest_2g = {
        [".super"] = {cb = wireless_predefined_forms, args = true}
    },
    guest_5g = {
        [".super"] = {cb = wireless_predefined_forms, args = true}
    },
    guest_5g_2 = {
        [".super"] = {cb = wireless_predefined_forms, args = true}
    },
    guest_6g = {
        [".super"] = {cb = wireless_predefined_forms, args = true}
    },
    guest_2g5g = {
        [".super"] = {cb = wireless_predefined_forms, args = true}
    },
    syspara_2g = {
    [".super"] = {cb = wireless_predefined_forms, args = true},
	["read"] = {cb = wireless_predefined_forms, args = true},
	["write"] = {cb = wireless_syspara_2g_set}
    },
    syspara_5g = {
        [".super"] = {cb = wireless_predefined_forms, args = true}
    },
    syspara_5g_2 = {
        [".super"] = {cb = wireless_predefined_forms, args = true}
    },
    syspara_6g = {
        [".super"] = {cb = wireless_predefined_forms, args = true}
    },
    region = {
        [".super"] = {cb = wireless_predefined_forms, args = true}
    },
    guest = {
        [".super"] = {cb = wireless_predefined_forms, args = true}
    },
    portal_content = {
        [".super"] = {cb = wireless_predefined_forms, args = true}
    },
    smart_connect = {
    	[".super"] = {cb = wireless_predefined_forms, args = true}
    },
    ofdma = {
        [".super"] = {cb = wireless_predefined_forms, args = true}
    },
    twt = {
        [".super"] = {cb = wireless_predefined_forms, args = true}
    },
    syspara_wps = {
        [".super"] = {cb = wireless_predefined_forms, args = true}
    },
    macfilter = {
        [".super"] = {cb = wireless_predefined_forms, args = true}
    },
    wps_pin = {
        [".super"] = {cb = wireless_wps_pin}
    },
    maclist = {
        [".super"] = {cb = wireless_maclist, others = max_mac_filter}
    },
    devlist = {
        [".super"] = {cb = wireless_devlist}
    },
    survey_2g = {
        [".super"] = {cb = wireless_survey_2g}
    },
    survey_5g = {
        [".super"] = {cb = wireless_survey_5g}
    },
    survey_5g_2 = {
        [".super"] = {cb = wireless_survey_5g_2}
    },
    survey_6g = {
        [".super"] = {cb = wireless_survey_6g}
    },
    statistics = {
        [".super"] = {cb = wireless_statistics}
    },
    wps_connect = {
        [".super"] = {cb = wireless_wps_connect}
    },
    tmp_read = {
        ["read"] = {cb = wireless_tmp_read},
		["read_v4"] = {cb = wireless_tmp_read_v4}
    },
    tmp_read_guest = {
        ["read"] = {cb = wireless_tmp_read_guest},
		["read_v4"] = {cb = wireless_tmp_read_guest_v4}
    },
    tmp_set = {
        ["write"] = {cb = wireless_tmp_set},
        ["set"] = {cb = wireless_tmp_set},
		["set_v4"] = {cb = wireless_tmp_set_v4}, -- double band
		["set_v4_tri_band"] = {cb = wireless_tmp_set_v4_tri_band},
        ["set_2g"] = {cb = wireless_tmp_set},
        ["set_5g"] = {cb = wireless_tmp_set},
        ["set_5g_2"] = {cb = wireless_tmp_set}
    },
    tmp_set_guest = {
        ["write"] = {cb = wireless_tmp_set_guest},
        ["set"] = {cb = wireless_tmp_set_guest},
        ["set_2g"] = {cb = wireless_tmp_set_guest},
        ["set_5g"] = {cb = wireless_tmp_set_guest},
        ["set_5g_2"] = {cb = wireless_tmp_set_guest},
        ["set_6g"] = {cb = wireless_tmp_set_guest}
    },
    tmp_guest_network_v4 = {
        ["read"]  = {cb = tmp_guest_network_v4_get},
        ["write"] = {cb = tmp_guest_network_v4_set}
    },
    tmp_bandwidth_switch_status = {
    	["read"]  = {cb = tmp_bandwidth_switch_status_get},
    },
    wireless_schedule_wifi_disable = {
        ["read"]  = {cb = wireless_schedule_get_wifi_disable}
    },
    wireless_schedule = {
        ["read"] = {cb = wireless_schedule_get_all},
        ["write"] = {cb = wireless_schedule_set_all}
    },
    wireless_schedule_2g = {
        ["read"]  = {cb = wireless_schedule_get_2g},
        ["write"] = {cb = wireless_schedule_set_2g}
    },
    wireless_schedule_5g = {
        ["read"]  = {cb = wireless_schedule_get_5g},
        ["write"] = {cb = wireless_schedule_set_5g}
    },
    wireless_schedule_52g = {
        ["read"]  = {cb = wireless_schedule_get_52g},
        ["write"] = {cb = wireless_schedule_set_52g}
    },
    wireless_schedule_6g = {
        ["read"]  = {cb = wireless_schedule_get_6g},
        ["write"] = {cb = wireless_schedule_set_6g}
    },
    wireless_addition_setting = {
        ["read"]  = {cb = wireless_addition_setting_get},
        ["write"] = {cb = wireless_addition_setting_set}
    },
    guestnetwork_effectivetime_ctrl = {
        ["read"]  = {cb = guestnetwork_effectivetime_get},
        ["write"] = {cb = guestnetwork_effectivetime_set}
    },
    guestnetwork_bandwidth_ctrl = {
        ["read"]  = {cb = guestnetwork_bandwidth_get},
        ["write"] = {cb = guestnetwork_bandwidth_set}
    }
}


function wireless_dispatch(http_form)
    return ctl.dispatch(wireless_form, http_form)
end


-- Process wireless webpage's HTTP request.
-- @param N/A
-- @return N/A
function wireless_index()
    return ctl._index(wireless_dispatch)
end


-- Register wireless URL and RPM
-- @param N/A
-- @return N/A
function index()
    entry({"admin", "wireless"}, call("wireless_index")).leaf = true
end
