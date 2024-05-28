#! /usr/bin/env lua
--
-- guestNetwork.lua
--

module("luci.smart_home.guestNetwork", package.seeall)

local ctl_wireless = require"luci.controller.admin.wireless"
local sys = require "luci.sys"
local json = require "luci.json"
local dbg = require "luci.tools.debug"
local uci = require "luci.model.uci"
local uci_r = uci.cursor()
local _M = {}

local form_host_params = {
        form = {"wireless_2g", "wireless_5g", "wireless_5g_2"},
        operation = "read"
    }

local form_guest_params = {
        form = {"guest", "guest_2g", "guest_5g", "guest_5g_2", "guest_2g5g"},
        operation = "read"
    }

function _M.version()
    return '1.0'
end

function _M.guestNetwork_advance_status_check()
	local result = {}
	local support_triband = uci_r:get_profile("wireless", "support_triband") or "no"
	local support_6g = uci_r:get_profile("wireless", "support_6g") or "no"
    local res_host = ctl_wireless.wireless_dispatch(form_host_params)
    local res_guest = ctl_wireless.wireless_dispatch(form_guest_params)

    if res_host.data.wireless_2g_enable == "on" and res_host.data.wireless_2g_disabled == "off" then
		enable_2G = "on"
	else
		enable_2G = "off"
	end

	if res_host.data.wireless_5g_enable == "on" and res_host.data.wireless_5g_disabled == "off" then
		enable_5G = "on"
	else
		enable_5G = "off"
	end

	if support_triband == "yes" and res_host.data.wireless_5g_2_enable == "on" and res_host.data.wireless_5g_2_disabled == "off" then
		enable_5G2 = "on"
	else
		enable_5G2 = "off"
	end

	if support_6g == "yes" and res_host.data.wireless_6g_enable == "on" and res_host.data.wireless_6g_disabled == "off" then
		enable_6G = "on"
	else
		enable_6G = "off"
	end

    -- Check whether wireless is available
    if enable_2G == "off" and enable_5G == "off" 
      and (support_triband ~= "yes" or (enable_5G2 == "off" and enable_6g == "off")) then
        if status_2G == "off" and status_5G == "off" and status_5G2 == "off" and status_6G == "off" then
            result.error_code = 1
            return result
        else
            result.error_code = -1112
            return result
        end
	end
end

function report()
    -- smart_home report below
    local smart_home_support = uci_r:get_profile("smart_home", "support") or "no"
    if smart_home_support and smart_home_support == "yes" then
        local smart_home_upload = require "cloud.smart_home.smart_home_upload"
        local cause = smart_home_upload.VOICE
        smart_home_upload.upload_property_change("guestNetwork", cause)
    end
    -- smart_home report above
end

function setGuestNetwork(set_params)
    dbg.printf("[setGuestNetwork]set_params:  " .. json.encode(set_params))
    local result = {}
    -- the symbol will be changed
    local change_2G = set_params.change_2G
    local change_5G = set_params.change_5G
    local change_5G2 = set_params.change_5G2
    -- the switch, true or false
    local enable_2G = "off"
    local enable_5G = "off"
    local enable_5G2 = "off"
    
    -- change success
    local change_2G_success = false
    local change_5G_success =false  
    local change_5G2_success =false 
    -- the switch, "on" or "off"
    local status_2G = "off"
    local status_5G = "off"
    local status_5G2 = "off"

    if set_params.enable_2G == false then
        status_2G = "off"
    else
        status_2G = "on"
    end

    if set_params.enable_5G == false then
        status_5G = "off"
    else
        status_5G = "on"
    end

    if set_params.enable_5G2 == false then
        status_5G2 = "off"
    else
        status_5G2 = "on"
    end

    local guest_ifname_2g = uci_r:get_profile("wireless","wireless_guest_ifname_2g") or "wl1.1"
	local guest_ifname_5g = uci_r:get_profile("wireless","wireless_guest_ifname_5g") or "wl2.1"
	local guest_ifname_5g_2 = uci_r:get_profile("wireless","wireless_guest_ifname_5g_2") or "wl0.1"
	local wifi_iface = nil

	local support_triband = uci_r:get_profile("wireless", "support_triband") or "no"
	
    local form_guest = {}
    
    local res_host = ctl_wireless.wireless_dispatch(form_host_params)
    local res_guest = ctl_wireless.wireless_dispatch(form_guest_params)

    if res_host.data.wireless_2g_enable == "on" and res_host.data.wireless_2g_disabled == "off" then
		enable_2G = "on"
	else
		enable_2G = "off"
	end

	if res_host.data.wireless_5g_enable == "on" and res_host.data.wireless_5g_disabled == "off" then
		enable_5G = "on"
	else
		enable_5G = "off"
	end

	if support_triband == "yes" and res_host.data.wireless_5g_2_enable == "on" and res_host.data.wireless_5g_2_disabled == "off" then
		enable_5G2 = "on"
	else
		enable_5G2 = "off"
	end

	-- Check whether wireless is available
	if enable_2G == "off" and enable_5G == "off" 
	  and (support_triband ~= "yes" or enable_5G2 == "off") then
		if status_2G == "off" and status_5G == "off" and status_5G2 == "off" then
            result.error_code = 1
            return result
        else
            result.error_code = -1112
            return result
        end
	end

    -- Check whether WDS is enable
    -- set 2.4G
    if change_2G == true then
        if enable_2G ~= "off" then
            if status_2G ~= res_guest.data.guest_2g_enable then
            	-- >>specail handler for guest: not restart wireless module when config change.
				uci_r:foreach("wireless", "wifi-iface",
			    function(s)
			        if (s['ifname'] == guest_ifname_2g) then
			            wifi_iface = s['.name']
			        end
	        	end)
				wifi_iface = wifi_iface or "wl12"	
				--dbg.printf("[setGuestNetwork] 2G wifi_iface:  " .. json.encode(wifi_iface))
				uci_r:set("wireless", wifi_iface, "enable", status_2G)
				wifi_iface = nil		
				change_2G_success = true
				-- >>specail handler done
            else
                result.error_code = 1
            end
        end
    end
    -- set 5G
    if change_5G == true then     
        if enable_5G ~= "off" then
            if status_5G ~= res_guest.data.guest_5g_enable then
            	-- specail handler for guest: not restart wireless module when config change.
				uci_r:foreach("wireless", "wifi-iface",
			    function(s)
			        if (s['ifname'] == guest_ifname_5g) then
			            wifi_iface = s['.name']
			        end
	        	end)
				wifi_iface = wifi_iface or "wl22"		
				--dbg.printf("[setGuestNetwork] 5G wifi_iface:  " .. json.encode(wifi_iface))
				uci_r:set("wireless", wifi_iface, "enable", status_5G)
				wifi_iface = nil
				change_5G_success = true 
				-- >>specail handler done
            else
                result.error_code = 1
            end
        end
    end

    -- set 5G2
    if support_triband == "yes" and change_5G2 == true then     
        if enable_5G2 ~= "off" then
            if status_5G2 ~= res_guest.data.guest_5g_2_enable then
				-- specail handler for guest: not restart wireless module when config change.
				uci_r:foreach("wireless", "wifi-iface",
			    function(s)
			        if (s['ifname'] == guest_ifname_5g_2) then
			            wifi_iface = s['.name']
			        end
	        	end)
				wifi_iface = wifi_iface or "wl02"		
				--dbg.printf("[setGuestNetwork] 5G2 wifi_iface:  " .. json.encode(wifi_iface))
				uci_r:set("wireless", wifi_iface, "enable", status_5G2)
				wifi_iface = nil
				change_5G2_success = true
				-- >>specail handler done
            else
                result.error_code = 1
            end
        end
    end

    uci_r:commit("wireless")

    local model = uci_r:get_profile("global", "model") or ""
    if model == "MTK_762X" or model == "QCA_IPQ50XX" then
        -- MTK/QCA
        if change_2G_success == true then
            sys.call("wifi vap " .. guest_ifname_2g)
            result.error_code = 0
        end
        if change_5G_success == true then
            sys.call("wifi vap " .. guest_ifname_5g)
            result.error_code = 0
        end
        if change_5G2_success == true then
            sys.call("wifi vap " .. guest_ifname_5g_2)
            result.error_code = 0
        end 
    else
        -- BCM
        if status_2G == "on" and change_2G_success == true then
            sys.call("wl -i " .. guest_ifname_2g .. " bss up")
            result.error_code = 0
        end
        if status_5G == "on" and change_5G_success == true  then
            sys.call("wl -i " .. guest_ifname_5g .. " bss up")
            result.error_code = 0
        end
        if status_5G2 == "on" and change_5G2_success == true  then
            sys.call("wl -i " .. guest_ifname_5g_2 .. " bss up")
            result.error_code = 0
        end

        if status_2G == "off" and change_2G_success == true then
            sys.call("wl -i " .. guest_ifname_2g .. " bss down")
            result.error_code = 0
        end
        if status_5G == "off" and change_5G_success == true  then
            sys.call("wl -i " .. guest_ifname_5g .. " bss down")
            result.error_code = 0
        end
        if status_5G2 == "off" and change_5G2_success == true  then
            sys.call("wl -i " .. guest_ifname_5g_2 .. " bss down")
            result.error_code = 0
        end
    end
    
    if change_2G_success == true or change_5G_success == true or change_5G2_success == true then
        report()
    end
    return result
end

local function query_guestNetwork(data)
    --add error code
    local result = {}

    local support_triband = uci_r:get_profile("wireless", "support_triband") or "no"
    local support_6g = uci_r:get_profile("wireless", "support_6g") or "no"
    local enable = "on"

    
    local res_host = ctl_wireless.wireless_dispatch(form_host_params)
    local res_guest = ctl_wireless.wireless_dispatch(form_guest_params)
    
    -- 2.4G
    if res_host.data.wireless_2g_enable == "on" and res_host.data.wireless_2g_disabled == "off" 
    		and res_guest.data.guest_2g_enable ~= "off" then
        enable = true
    else
        enable = false
    end
    result.band2G = {}
    result.band2G.enabled = enable
    result.band2G.ssid = res_guest.data.guest_2g_ssid
    if support_6g == "yes" then
        result.band2G.password =  res_guest.data.guest_2g_encryption == "none" 
                                  and "" or res_guest.data.guest_2g_psk_key
    else
        result.band2G.password =  res_guest.data.guest_2g5g_encryption == "none" 
                                  and "" or res_guest.data.guest_2g5g_psk_key
    end

    -- 5G
    if res_host.data.wireless_5g_enable == "on" and res_host.data.wireless_5g_disabled == "off" 
            and res_guest.data.guest_5g_enable ~= "off" then
        enable = true
    else
        enable = false
    end
    result.band5G = {}
    result.band5G.enabled = enable
    result.band5G.ssid = res_guest.data.guest_5g_ssid
    result.band5G.password = res_guest.data.guest_5g_encryption == "none" 
            and "" or res_guest.data.guest_5g_psk_key     

    -- 5G_2
    if support_triband == "yes" and support_6g ~= "yes" then
        if res_host.data.wireless_5g_2_enable == "on" and res_host.data.wireless_5g_2_disabled == "off"
                and res_guest.data.guest_5g_2_enable ~= "off" then
            enable = true
        else
            enable = false
        end
        result.band5G2 = {}
        result.band5G2.enabled = enable
        result.band5G2.ssid = res_guest.data.guest_5g_2_ssid
        
        result.band5G2.password = res_guest.data.guest_2g5g_encryption == "none" 
                and "" or res_guest.data.guest_2g5g_psk_key	
    end

    -- 6G
    if support_triband == "yes" and support_6g == "yes" then
        if res_host.data.wireless_6g_enable == "on" and res_host.data.wireless_6g_disabled == "off"
                and res_guest.data.guest_6g_enable ~= "off" then
            enable = true
        else
            enable = false
        end
        result.band6G = {}
        result.band6G.enabled = enable
        result.band6G.ssid = res_guest.data.guest_6g_ssid
        
        result.band6G.password = res_guest.data.guest_6g_encryption == "owe"
                and "" or res_guest.data.guest_6g_psk_key	
    end

    local ret = {}
    ret.result = result
    if ret.result then
        ret.error_code = 0
    end
    return ret
end


local function execute_guestNetwork(data)
    --dbg.printf("[execute_guestNetwork]data:   " .. json.encode(data))
    local result = {}
    if not data then
        result.error_code = -1101
        return result
    end
    local set_params = {}
    --[[
    -- params
    -- the symbol will be changed
    set_params.change_2G = false
    set_params.change_5G = false
    set_params.change_5G2 = false
    set_params.change_60G = false
    -- the switch, true or false
    set_params.enable_2G = false
    set_params.enable_5G = false
    set_params.enable_5G2 = false
    set_params.enable_60G = false
    --]]
    
    -- execute params
    if data.band2G then
        set_params.change_2G = true
        -- params check
        if data.band2G.enabled ~= true and data.band2G.enabled ~= false then
            result.error_code = -1101
            return result
        else
            set_params.enable_2G = data.band2G.enabled
        end
    end
    if data.band5G then
        set_params.change_5G = true
        -- params check
        if data.band5G.enabled ~= true and data.band5G.enabled ~= false then
            result.error_code = -1101
            return result
        else
            set_params.enable_5G = data.band5G.enabled
        end
    end
    if data.band5G2 then
        set_params.change_5G2 = true
        -- params check
        if data.band5G2.enabled ~= true and data.band5G2.enabled ~= false then
            result.error_code = -1101
            return result
        else
            set_params.enable_5G2 = data.band5G2.enabled
        end
    end
    --[[
    if data.band60G then
        set_params.change_60G = true
        -- params check
        if data.band60G.enabled ~= true and data.band60G.enabled ~= false then
            result.error_code = -1101
            return result
        else
            set_params.enable_60G = data.band60G.enabled
        end
    end
    --]]
    -- execute params deal finished
    return setGuestNetwork(set_params)

end

function execute_setGuestNetwork(data)
    --dbg.printf("[execute_setGuestNetwork]data" .. json.encode(data))
    local result = {}
    if not data then
        result.error_code = -1101
        return result
    end
    local set_params = {}
    -- setGuestNetwork params
    local band
    if data.band then
        band = data.band:upper()
    end
    -- params check
    if band ~= "ALL" and band ~= "2G" and band ~= "5G" then
        result.error_code = -1205
        return result
    end
    if data.enabled ~= true and data.enabled ~= false then
        result.error_code = -1101
        return result
    end
    -- params check finished

    if band == "2G" then
        set_params.enable_2G = data.enabled
        set_params.change_2G = true
    elseif band == "5G" then
    	-- 5G
        set_params.enable_5G = data.enabled
        set_params.change_5G = true
        -- 5G2
        set_params.enable_5G2 = data.enabled
        set_params.change_5G2 = true
    elseif band == "ALL" then
        -- 2.4G
        set_params.enable_2G = data.enabled
        set_params.change_2G = true
        -- 5G
        set_params.enable_5G = data.enabled
        set_params.change_5G = true
        -- 5G2
        set_params.enable_5G2 = data.enabled
        set_params.change_5G2 = true
    end
    -- setGuestNetwork params deal finished
    return setGuestNetwork(set_params)
end

local dispatch_tbl = {
    ["query"] = {
        cb = query_guestNetwork
    },
    ["execute"] = {
        cb = execute_guestNetwork,
    },
    ["setGuestNetwork"] = {
        cb = execute_setGuestNetwork,
    },
}

function _M.dispatch(form)
    --dbg.printf("[dispatch]form:   " .. json.encode(form))
    local result = {}
    if not form then
        result.error_code = -1101
        return result
    end
    if form.method then
        local fn = dispatch_tbl[form.method]
        result = fn.cb(form.params)
    else
        result.error_code = -1101
    end
    --dbg.printf("[dispatch]result:     " .. json.encode(result))
    return result
end

return _M




