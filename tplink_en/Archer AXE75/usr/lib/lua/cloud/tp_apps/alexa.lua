module("cloud.tp_apps.alexa", package.seeall)

local dbg = require "luci.tools.debug"
local sys = require "luci.sys"
local json = require "luci.json"
local nixio = require "nixio"
local AppsError = require "cloud.tp_apps.tp_app_error"
local uci = require "luci.model.uci"
local uci_r = uci.cursor()
local uci_s = uci.cursor_state()

local wlan = require "luci.controller.admin.wireless"
local ledpm = require "luci.controller.admin.ledpm"
local ledgeneral = require "luci.controller.admin.ledgeneral"
local climgmt = require "luci.model.client_mgmt"
local tm = require "luci.controller.admin.smart_network"
local st = require "luci.controller.admin.status"

local QOS_MODE_MAP = { ["0"]="fair", ["1"]="game", ["2"]="media", ["3"]="surf", 
	["4"]="chat", ["5"]="custom" }

local LUCI_FUNC = {
	-- Night Mode
	night_mode_get = {
		func = ledpm.get
	},
	night_mode_set = {
		func = ledpm.set,
		form = {}
	},
	-- lED
	led_get = {
		func = ledgeneral.get
	},
	led_set = {
		func = ledgeneral.set
	},
	-- WPS
	wps_connect = {
		func = wlan.wireless_wps_connect,
		form = {
			option = "connect"
		}
	},
	wps_get_status = {
		func = wlan.wireless_wps_connect,
		form = {
			option = ""
		}
	},	
	wps_get_switch = {
		func = wlan.wireless_predefined_forms,
		form = {
			form = "syspara_wps",
			operation = "read"
		}
	},
	wps_pbc = {
		func = wlan.wireless_wps_connect,
		form = {
			option = "pbc"
		},
	},
	-- Guest Network
	wls_read = {
		func = wlan.wireless_dispatch,
		form = {
			form = {"wireless_2g", "wireless_5g", "wireless_5g_2", "wireless_6g"},
			operation = "read"
		}
	},
	guest_wls_read = {
		func = wlan.wireless_dispatch,
		form = {
			form = {"guest", "guest_2g", "guest_5g", "guest_5g_2", "guest_6g", "guest_2g5g"},
			operation = "read"
		}
	},	
	guest_wls_write = {
		func = wlan.wireless_dispatch,
		form = {
			form = {"guest", "guest_2g", "guest_5g", "guest_5g_2", "guest_6g", "guest_2g5g"},
			operation = "write"
		},
		maxBand = 3
	},
	-- QoS
	qos_mode_set = {
		func = tm.qos_mode_set,
		maxMode = 5
	},
	qos_mode_get = {
		func = tm.qos_mode_get
	},
	qos_prio_dev_get = {
		func = tm.device_list_get,
		form = {
			object = "alexa_all_clients"
		}
	},
	qos_prio_dev_set = {
		func = tm.device_list_batch_update
	},
	-- Speed Test
	speed_test_run = {
		func = st.start_speedtest
	},
	speed_test_rlt_get = {
		func = st.get_lastest_speedtest_info
	},
}

local function table_merge( tDest, tSrc )
    for k, v in pairs( tSrc ) do
        tDest[k] = v
    end
end

local function table_copy(st)  
    local tab = {}  
    for k, v in pairs(st or {}) do  
        if type(v) ~= "table" then  
            tab[k] = v  
        else  
            tab[k] = copyTab(v)  
        end  
    end  
    return tab  
end 

local function response_data(data, error_code)
	return {["result"] = data, ["error_code"] = error_code}
end

local function cur_time_within_range(s_time, e_time)
	local cur_time = os.time()
	local cur_h,cur_m,cur_s = string.match(os.date("%X", cur_time), "(%d+):(%d+):(%d+)")
	local ctime = cur_h * 3600 + cur_m * 60
	
	local s_h,s_m = string.match(s_time, "(%d+):(%d+)")
	local stime = s_h * 3600 + s_m * 60

	local e_h,e_m = string.match(e_time, "(%d+):(%d+)")
	local etime = e_h * 3600 + e_m * 60

    if stime < etime then
		if ctime >= stime and ctime < etime	then
			return true
		end
	elseif stime > etime then
		if ctime < etime or ctime >= stime then
			return true
		end
	end
	return false
end

local function get_system_mode()
	local sysmode_support = uci_r:get("sysmode", "sysmode", "support") or "no"
	local sysmode =  uci_r:get("sysmode", "sysmode", "mode") or "router"

	local data = {}
	if sysmode_support == "yes" and sysmode == "ap"	then
		data.mode = "ap"
	else
		data.mode = "router"
	end

	return response_data(data, AppsError.ERROR_MSG.ERROR_NONE[1])
end

local function check_in_ap_mode()
	local data = {}
	data = get_system_mode()
	if data.result.mode == "ap"	then
		return true
	else
		return false
	end
end

-- turn on/off the led
local function set_led(params)
	if params == nil or params.status == nil then
		return response_data(nil, AppsError.ERROR_MSG.ERROR_INCOMPLETE_PARAMETER[1])
	end

	-- status: 0=off, 1=on
	local status
	if tonumber(params.status) == 0 then
		status = "off"
	elseif tonumber(params.status) == 1 then
		status = "on"
	else
		return response_data(nil, AppsError.ERROR_MSG.ERROR_INVAILD_PARAMETER[1])
	end

	local res = LUCI_FUNC.night_mode_get.func()
	-- Night mode enable and take affect.
	-- if res.enable == "on" and cur_time_within_range(res.time_start, res.time_end) then
	-- 	return response_data(nil, AppsError.ERROR_MSG.ERROR_LED_CONFLICT_WITH_NIGHT_MODE[1])
	-- end

	local ret_led = LUCI_FUNC.led_get.func()
	if ret_led.enable == status then
		-- >>specail handler for resolving the compliction between night mode and led control.
		if status == "on" and nixio.fs.access("/tmp/led_enable") then
			LUCI_FUNC.led_set.func()
		-- >>specail handler done	
		else
			return response_data(nil, AppsError.ERROR_MSG.ERROR_CFG_HAVE_BEEN_SET[1])
		end 
	else
		ret_led = LUCI_FUNC.led_set.func()
	end
	
	return response_data(nil, AppsError.ERROR_MSG.ERROR_NONE[1])
end

local function connect_wps(params)
	local err_code
	
	--check whether wps is available or not
	local res = LUCI_FUNC.wps_get_status.func(LUCI_FUNC.wps_get_status.form)
	--dbg.print(json.encode(res))
	if res.available == false then
		res = LUCI_FUNC.wps_get_switch.func(LUCI_FUNC.wps_get_switch.form)
		--dbg.print(json.encode(res))
		--if res.wps == "off" then
		if res.wps_status == "na" or res.wps_status == "timeout" 
			or res.wps_status == "success" or res.wps_status == "failed" then
			err_code = AppsError.ERROR_MSG.ERROR_WPS_NOT_WORK_WHEN_SWITCH_OFF[1]
		else
			err_code = AppsError.ERROR_MSG.ERROR_WPS_NOT_WORK_WHEN_WLS_OFF[1]
		end
	else
		--check whether wps is running
		res = LUCI_FUNC.wps_pbc.func(LUCI_FUNC.wps_pbc.form)
		--dbg.print(json.encode(res))
		if res.wps_status == "na" then
			--run wps connect in the background, it will takes too much time
			if nixio.fork() == 0 then
				LUCI_FUNC.wps_connect.func(LUCI_FUNC.wps_connect.form)
				os.exit(0)
			else
			err_code = AppsError.ERROR_MSG.ERROR_NONE[1]
			end
		else
			err_code = AppsError.ERROR_MSG.ERROR_CFG_HAVE_BEEN_SET[1]
		end
	end	
	
	return response_data(nil, err_code)
end

-- enable or disable the guest network
local function set_guestNetwork(params)
	if params == nil or params.status == nil or params.band == nil then
		return response_data(nil, AppsError.ERROR_MSG.ERROR_INCOMPLETE_PARAMETER[1])
	end
	local status
	local band = tonumber(params.band)
	local flag = false

	local change_2g = false
	local change_5g1 = false
	local change_5g2 = false
	local change_6g = false
	
	local status_2g = 1
	local status_5g1 = 1
	local status_5g2 = 1
	local status_6g = 1

	local wireless_2g_enable = "on"
	local wireless_5g_enable = "on"
	local wireless_5g_2_enable = "on"
	local wireless_6g_enable = "on"

	local guest_ifname_2g = uci_r:get_profile("wireless","wireless_guest_ifname_2g") or "wl1.1"
	local guest_ifname_5g = uci_r:get_profile("wireless","wireless_guest_ifname_5g") or "wl2.1"
	local guest_ifname_5g_2 = uci_r:get_profile("wireless","wireless_guest_ifname_5g_2") or "wl0.1"
	local guest_ifname_6g = uci_r:get_profile("wireless","wireless_guest_ifname_6g") or "wl1.3"
	local wifi_iface = nil

	local support_triband = uci_r:get_profile("wireless", "support_triband") or "no"
	local support_6g = uci_r:get_profile("wireless", "support_6g") or "no"

	-- band: 0=all, 1=2g, 2=5g, 3=5g_2/6g, 4=60g
	if band < 0 or band > LUCI_FUNC.guest_wls_write.maxBand then
		return response_data(nil, AppsError.ERROR_MSG.ERROR_INVAILD_PARAMETER[1])
	end

	-- status: 0=off, 1=on
	if tonumber(params.status) == 0 then
		status = "off"
	elseif tonumber(params.status) == 1 then
		status = "on"
	else
		return response_data(nil, AppsError.ERROR_MSG.ERROR_INVAILD_PARAMETER[1])
	end
	
	local form_guest = {}

	-- Triple Band	
	local res_host = LUCI_FUNC.wls_read.func(LUCI_FUNC.wls_read.form)
	--dbg.print(json.encode(res_host))

	-- wireless_xx_enable for software switch && wireless_xx_disabled for hardware switch
	if res_host.data.wireless_2g_enable == "on" and res_host.data.wireless_2g_disabled == "off" then
		wireless_2g_enable = "on"
	else
		wireless_2g_enable = "off"
	end

	if res_host.data.wireless_5g_enable == "on" and res_host.data.wireless_5g_disabled == "off" then
		wireless_5g_enable = "on"
	else
		wireless_5g_enable = "off"
	end

	if support_6g == "yes" then
		if support_triband == "yes" and res_host.data.wireless_6g_enable == "on" and res_host.data.wireless_6g_disabled == "off" then
			wireless_6g_enable = "on"
		else
			wireless_6g_enable = "off"
		end
	else
		if support_triband == "yes" and res_host.data.wireless_5g_2_enable == "on" and res_host.data.wireless_5g_2_disabled == "off" then
			wireless_5g_2_enable = "on"
		else
			wireless_5g_2_enable = "off"
		end
	end

	-- Check whether wireless is available
	if wireless_2g_enable == "off" and wireless_5g_enable == "off" 
	  and (support_triband ~= "yes" or wireless_5g_2_enable == "off") and (support_6g ~= "yes" or wireless_6g_enable == "off") then
		if status == "off" then
			return response_data(nil, AppsError.ERROR_MSG.ERROR_CFG_HAVE_BEEN_SET[1])
		else
			return response_data(nil, AppsError.ERROR_MSG.ERROR_GUEST_NOT_WORK_WHEN_WLS_OFF[1])
		end
	end
	-- Check whether WDS is enable
	-- ///////TODO

	local res_guest = LUCI_FUNC.guest_wls_read.func(LUCI_FUNC.guest_wls_read.form)
	--dbg.print(json.encode(res_guest))
	if band == 0 or band == 1 then
		if band == 1 and wireless_2g_enable == "off" then
			return response_data(nil, AppsError.ERROR_MSG.ERROR_GUEST_NOT_WORK_WHEN_WLS_OFF[1])
		end
		
		if wireless_2g_enable ~= "off" and 
		  status ~= res_guest.data.guest_2g_enable then
			form_guest.guest_2g_enable = status
			flag = true

			-- >>specail handler for guest: not restart wireless module when config change.
			uci_r:foreach("wireless", "wifi-iface",
		    function(s)
		        if (s['ifname'] == guest_ifname_2g) then
		            wifi_iface = s['.name']
		        end
        	end)
			wifi_iface = wifi_iface or "wl12"		
			uci_r:set("wireless", wifi_iface, "enable", status)
			wifi_iface = nil
			
			change_2g = true
			-- >>specail handler done	
		end

		if wireless_2g_enable == "off" or form_guest.guest_2g_enable == "off" then
			status_2g = 0
		end
	end
	
	if band == 0 or band == 2 then
		if band == 2 and wireless_5g_enable == "off" then
			return response_data(nil, AppsError.ERROR_MSG.ERROR_GUEST_NOT_WORK_WHEN_WLS_OFF[1])
		end
		
		if wireless_5g_enable ~= "off" and
		  status ~= res_guest.data.guest_5g_enable then
			form_guest.guest_5g_enable = status
			flag = true

			-- specail handler for guest: not restart wireless module when config change.
			uci_r:foreach("wireless", "wifi-iface",
		    function(s)
		        if (s['ifname'] == guest_ifname_5g) then
		            wifi_iface = s['.name']
		        end
        	end)
			wifi_iface = wifi_iface or "wl22"		
			uci_r:set("wireless", wifi_iface, "enable", status)
			wifi_iface = nil
			change_5g1 = true
			-- >>specail handler done
		end

		if wireless_5g_enable == "off" or form_guest.guest_5g_enable == "off" then
			status_5g1 = 0
		end		
	end

	if support_triband == "yes" and (band == 0 or band == 3) then
		if support_6g == "yes" then
			if band == 3 and wireless_6g_enable == "off" then
				return response_data(nil, AppsError.ERROR_MSG.ERROR_GUEST_NOT_WORK_WHEN_WLS_OFF[1])
			end
			
			if wireless_6g_enable ~= "off" and
				status ~= res_guest.data.guest_6g_enable then
				form_guest.guest_6g_enable = status
				flag = true

				-- specail handler for guest: not restart wireless module when config change.
				uci_r:foreach("wireless", "wifi-iface",
			    function(s)
			        if (s['ifname'] == guest_ifname_6g) then
			            wifi_iface = s['.name']
			        end
	        	end)
				wifi_iface = wifi_iface or "wl12"		
				uci_r:set("wireless", wifi_iface, "enable", status)
				wifi_iface = nil

				change_6g = true
				-- >>specail handler done
			end

			if wireless_6g_enable == "off" or form_guest.guest_6g_enable == "off" then
				status_6g = 0
			end
		else
			if band == 3 and wireless_5g_2_enable == "off" then
				return response_data(nil, AppsError.ERROR_MSG.ERROR_GUEST_NOT_WORK_WHEN_WLS_OFF[1])
			end
			
			if wireless_5g_2_enable ~= "off" and
			  status ~= res_guest.data.guest_5g_2_enable then
				form_guest.guest_5g_2_enable = status
				flag = true

				-- specail handler for guest: not restart wireless module when config change.
				uci_r:foreach("wireless", "wifi-iface",
			    function(s)
			        if (s['ifname'] == guest_ifname_5g_2) then
			            wifi_iface = s['.name']
			        end
	        	end)
				wifi_iface = wifi_iface or "wl02"		
				uci_r:set("wireless", wifi_iface, "enable", status)
				wifi_iface = nil

				change_5g2 = true
				-- >>specail handler done
			end

			if wireless_5g_2_enable == "off" or form_guest.guest_5g_2_enable == "off" then
				status_5g2 = 0
			end
		end
	end

	local data = {
		{
			["band"] = "2G",
			["ssid"] = res_guest.data.guest_2g_ssid,
			["status"] = status_2g,
			["password"] = res_guest.data.guest_2g5g_encryption == "none" 
				and "" or res_guest.data.guest_2g5g_psk_key
		},
		{
			["band"] = "5G",
			["ssid"] = res_guest.data.guest_5g_ssid,
			["status"] = status_5g1,
			["password"] = res_guest.data.guest_2g5g_encryption == "none"
				and "" or res_guest.data.guest_2g5g_psk_key
		}
	}

	if support_triband == "yes" then
		if support_6g == "yes" then
			data[3] = {
				["band"] = "6G",
				["ssid"] = res_guest.data.guest_6g_ssid,
				["status"] = status_6g,
				["password"] = res_guest.data.guest_6g_encryption == "owe" and "" or res_guest.data.guest_6g_psk_key
			}
		else
			data[3] = {
				["band"] = "5G_2",
				["ssid"] = res_guest.data.guest_5g_2_ssid,
				["status"] = status_5g2,
				["password"] = res_guest.data.guest_2g5g_encryption == "none" and "" or res_guest.data.guest_2g5g_psk_key
			}
		end
	end

	if flag == true then
		-- table_merge(LUCI_FUNC.guest_wls_write.form, form_guest)
		-- --dbg.print(json.encode(LUCI_FUNC.guest_wls_write.form))
		-- res_guest = LUCI_FUNC.guest_wls_write.func(LUCI_FUNC.guest_wls_write.form)
		-- if res_guest.success == true then
		-- 	return response_data({["ssidList"]=data}, AppsError.ERROR_MSG.ERROR_NONE[1])
		-- else
		-- 	return response_data(nil, AppsError.ERROR_MSG.ERROR_OPERATION_FAIL[1])
		-- end

		-- specail handler for guest: not restart wireless module when config change.
		uci_r:commit("wireless")


		local model = uci_r:get_profile("global", "model") or ""
		if model == "MTK_762X" then
			if change_5g2 == true then
				sys.call("wifi vap " .. guest_ifname_5g_2)
			end
			if change_2g == true then
				sys.call("wifi vap " .. guest_ifname_2g)
			end
			if change_5g1 == true then
				sys.call("wifi vap " .. guest_ifname_5g)
			end			
		else
			if status == "on" then
				if change_5g2 == true then
					sys.call("wl -i " .. guest_ifname_5g_2 .. " bss up")
				end
				if change_2g == true then
					sys.call("wl -i " .. guest_ifname_2g .. " bss up")
				end
				if change_5g1 == true then
					sys.call("wl -i " .. guest_ifname_5g .. " bss up")
				end
				if change_6g == true then
					sys.call("wl -i " .. guest_ifname_6g .. " bss up")
				end
			else
				if change_5g2 == true then
					sys.call("wl -i " .. guest_ifname_5g_2 .. " bss down")
				end
				if change_2g == true then
					sys.call("wl -i " .. guest_ifname_2g .. " bss down")
				end
				if change_5g1 == true then
					sys.call("wl -i " .. guest_ifname_5g .. " bss down")
				end	
				if change_6g == true then
					sys.call("wl -i " .. guest_ifname_6g .. " bss down")
				end	
			end
			-- >>specail handler done
		end

		return response_data({["ssidList"]=data}, AppsError.ERROR_MSG.ERROR_NONE[1])
	else
		return response_data({["ssidList"]=data}, AppsError.ERROR_MSG.ERROR_CFG_HAVE_BEEN_SET[1])
	end
end

local function get_guestNetwork(params)
	if params == nil or params.band == nil then
		return response_data(nil, AppsError.ERROR_MSG.ERROR_INCOMPLETE_PARAMETER[1])
	end
	local band = tonumber(params.band)
	local flag = false

	local support_triband = uci_r:get_profile("wireless", "support_triband") or "no"
	local support_6g = uci_r:get_profile("wireless", "support_6g") or "no"
	local wireless_2g_enable = "on"
	local wireless_5g_enable = "on"
	local wireless_5g_2_enable = "on"
	local wireless_6g_enable = "on"
	
	-- band: 0=all, 1=2g, 2=5g, 3=5g_2/6g, 4=60g
	if band < 0 or band > LUCI_FUNC.guest_wls_write.maxBand then
		return response_data(nil, AppsError.ERROR_MSG.ERROR_INVAILD_PARAMETER[1])
	end
	
	local status
	local data = {}

	-- Triple Band	
	local res_host = LUCI_FUNC.wls_read.func(LUCI_FUNC.wls_read.form)
	--dbg.print(json.encode(res_host))

	-- wireless_xx_enable for software switch && wireless_xx_disabled for hardware switch
	if res_host.data.wireless_2g_enable == "on" and res_host.data.wireless_2g_disabled == "off" then
		wireless_2g_enable = "on"
	else
		wireless_2g_enable = "off"
	end

	if res_host.data.wireless_5g_enable == "on" and res_host.data.wireless_5g_disabled == "off" then
		wireless_5g_enable = "on"
	else
		wireless_5g_enable = "off"
	end

	if res_host.data.wireless_5g_2_enable == "on" and res_host.data.wireless_5g_2_disabled == "off" then
		wireless_5g_2_enable = "on"
	else
		wireless_5g_2_enable = "off"
	end

	if res_host.data.wireless_6g_enable == "on" and res_host.data.wireless_6g_disabled == "off" then
		wireless_6g_enable = "on"
	else
		wireless_6g_enable = "off"
	end

	if wireless_2g_enable == "off" and wireless_5g_enable == "off" 
	  and (support_triband ~= "yes" or wireless_5g_2_enable == "off") and (support_6g ~= "yes" or wireless_6g_enable == "off") then
		return response_data(nil, AppsError.ERROR_MSG.ERROR_GUEST_NOT_WORK_WHEN_WLS_OFF[1])
	end

	local res_guest = LUCI_FUNC.guest_wls_read.func(LUCI_FUNC.guest_wls_read.form)
	--dbg.print(json.encode(res_guest))
	if band == 0 or band == 1 then
		if wireless_2g_enable ~= "off" and 
		  res_guest.data.guest_2g_enable ~= "off" then
			status = 1
		else
			status = 0
		end
		data[#data + 1] = {
			["band"] = "2G",
			["ssid"] = res_guest.data.guest_2g_ssid,
			["status"] = status,
			["password"] = res_guest.data.guest_2g5g_encryption == "none" 
				and "" or res_guest.data.guest_2g5g_psk_key
		}		
	end
	
	if band == 0 or band == 2 then
		if wireless_5g_enable ~= "off" and 
		  res_guest.data.guest_5g_enable ~= "off" then
			status = 1
		else
			status = 0
		end
		data[#data + 1] = {
			["band"] = "5G",
			["ssid"] = res_guest.data.guest_5g_ssid,
			["status"] = status,
			["password"] = res_guest.data.guest_2g5g_encryption == "none" 
				and "" or res_guest.data.guest_2g5g_psk_key	
		}			
	end

	if support_triband == "yes" and (band == 0 or band == 3) then
		if support_6g == "yes" then
			if wireless_6g_enable ~= "off" and 
			  res_guest.data.guest_6g_enable ~= "off" then
				status = 1
			else
				status = 0
			end
			data[#data + 1] = {
				["band"] = "6G",
				["ssid"] = res_guest.data.guest_6g_ssid,
				["status"] = status,
				["password"] = res_guest.data.guest_6g_encryption == "owe" 
					and "" or res_guest.data.guest_6g_psk_key	
			}
		else
			if wireless_5g_2_enable ~= "off" and 
			  res_guest.data.guest_5g_2_enable ~= "off" then
				status = 1
			else
				status = 0
			end
			data[#data + 1] = {
				["band"] = "5G_2",
				["ssid"] = res_guest.data.guest_5g_2_ssid,
				["status"] = status,
				["password"] = res_guest.data.guest_2g5g_encryption == "none" 
					and "" or res_guest.data.guest_2g5g_psk_key	
			}	
		end
	end

	return response_data({["ssidList"]=data}, AppsError.ERROR_MSG.ERROR_NONE[1])
end

-- get night mode configuration
local function get_nightMode(params)
	local res = LUCI_FUNC.night_mode_get.func()
	local data = {}
		
	data.status = (res.enable == "on") and 1 or 0
	data.startTime = res.time_start or "00:00"
	data.endTime = res.time_end or "00:00"
	
	return response_data(data, AppsError.ERROR_MSG.ERROR_NONE[1])
end

-- set night mode
local function set_nightMode(params)
	if params == nil or params.status == nil then
		return response_data(nil, AppsError.ERROR_MSG.ERROR_INCOMPLETE_PARAMETER[1])
	end

	if params.status < 0 or params.status > 1 then
		return response_data(nil, AppsError.ERROR_MSG.ERROR_INVAILD_PARAMETER[1])
	end

	local s_h,s_m
	local e_h,e_m
	if params.startTime ~= nil then
		s_h,s_m = string.match(params.startTime, "(%d+):(%d+)")
	s_h = tonumber(s_h)
	s_m = tonumber(s_m)
		if s_h < 0 or s_h >= 24 or s_m < 0 or s_m >= 60 then
			return response_data(nil, AppsError.ERROR_MSG.ERROR_INVAILD_PARAMETER[1])
		end 
	end
	if params.endTime ~= nil then
	 	e_h,e_m= string.match(params.endTime, "(%d+):(%d+)")
	e_h = tonumber(e_h)
	e_m = tonumber(e_m)
		if e_h < 0 or e_h >= 24 or e_m < 0 or e_m >= 60 then
		return response_data(nil, AppsError.ERROR_MSG.ERROR_INVAILD_PARAMETER[1])
	end 
	end

	local status
	if tonumber(params.status) == 0  then
		status = "off"
	else
		status = "on"
	end

	local time_sync = uci_s:get("systime", "core", "sync")
	if status == "on" and time_sync ~= "1" then
		return response_data(nil, AppsError.ERROR_MSG.ERROR_NIGHT_MODE_CONFLICT_WITH_SYSTIME[1])
	end
		
	local res = LUCI_FUNC.night_mode_get.func()
	local data = {}
	data.status = (res.enable == "on") and 1 or 0
	data.startTime = res.time_start or "00:00"
	data.endTime = res.time_end or "00:00"	
	
	if status == "off" and status == res.enable then
		return response_data(data, AppsError.ERROR_MSG.ERROR_CFG_HAVE_BEEN_SET[1])
	elseif status == "on" and status == res.enable then
		if params.startTime ~= nil and res.time_start ~= params.startTime then
		elseif params.endTime ~= nil and res.time_end ~= params.endTime then
		else
			return response_data(data, AppsError.ERROR_MSG.ERROR_CFG_HAVE_BEEN_SET[1])
		end
	end
	
	res.enable = status
	res.time_start = params.startTime or res.time_start
	res.time_end = params.endTime or res.time_end
	
	if res.time_start == res.time_end then
		return response_data(nil, AppsError.ERROR_MSG.ERROR_INVAILD_PARAMETER[1])
	end
	
	local ret = LUCI_FUNC.night_mode_set.func(res)

	if ret == false then
		return response_data(nil, AppsError.ERROR_MSG.ERROR_OPERATION_FAIL[1])
	else
		data.status = (ret.enable == "on") and 1 or 0
		data.startTime = ret.time_start or "00:00"
		data.endTime = ret.time_end or "00:00"
	end
		
	return response_data(data, AppsError.ERROR_MSG.ERROR_NONE[1])
end

local function run_speed_test(params)
	local ret = LUCI_FUNC.speed_test_run.func()
	if ret == 0 then
		return response_data(nil, AppsError.ERROR_MSG.ERROR_CFG_HAVE_BEEN_SET[1])
	-- elseif ret == -1 then
	-- 	return response_data(nil, AppsError.ERROR_MSG.ERROR_SPEED_TEST_RUN_FAILED[1])
	else
		return response_data(nil, AppsError.ERROR_MSG.ERROR_NONE[1])
	end
end

local function get_speed_test_rslt(params)
	local data = {}

	local res = LUCI_FUNC.speed_test_rlt_get.func()

	if res.status == "idle" then
		if res.down_speed == -1 or res.up_speed == -1 then
		return response_data(nil, AppsError.ERROR_MSG.ERROR_SPEED_TEST_RUN_FAILED[1]) 
		else
			data.upRate = res.up_speed
			data.downRate = res.down_speed
	end
	else
		return response_data(nil, AppsError.ERROR_MSG.ERROR_SPEED_TEST_RUN_FAILED[1]) 
	end

	return response_data(data, AppsError.ERROR_MSG.ERROR_NONE[1]) 
end

local function set_qos_mode(params)
	if params == nil or params.mode == nil or params.status == nil then
		return response_data(nil, AppsError.ERROR_MSG.ERROR_INCOMPLETE_PARAMETER[1])
	end

	if params.mode < 0 or params.mode > LUCI_FUNC.qos_mode_set.maxMode then
		return response_data(nil, AppsError.ERROR_MSG.ERROR_INVAILD_PARAMETER[1])
	end

	if params.status < 0 or params.status > 1 then
		return response_data(nil, AppsError.ERROR_MSG.ERROR_INVAILD_PARAMETER[1])
	end

	local res = LUCI_FUNC.qos_mode_get.func()
	local customized = tonumber(res.custom_detail.customized)

	if params.status == 1 then
		if res.qos_mode == QOS_MODE_MAP[tostring(params.mode)] then 
			return response_data(nil, AppsError.ERROR_MSG.ERROR_CFG_HAVE_BEEN_SET[1])
		end

		if customized == 0 and QOS_MODE_MAP[tostring(params.mode)] == "custom" then
			return response_data(nil, AppsError.ERROR_MSG.ERROR_DFT_CUSTOM_MODE_CFG[1])  
		end

		res.qos_mode = QOS_MODE_MAP[tostring(params.mode)]
		res.custom_detail = json.encode(res.custom_detail)
	else
		if res.qos_mode ~= QOS_MODE_MAP[tostring(params.mode)] then 
			return response_data(nil, AppsError.ERROR_MSG.ERROR_CFG_HAVE_BEEN_SET[1])
		elseif QOS_MODE_MAP[tostring(params.mode)] == "custom" and customized == 0 then 
			return response_data(nil, AppsError.ERROR_MSG.ERROR_DFT_CUSTOM_MODE_CFG[1])
		elseif res.qos_mode == QOS_MODE_MAP[tostring(params.mode)] and res.qos_mode == "fair" then
			return response_data(nil, AppsError.ERROR_MSG.ERROR_CFG_HAVE_BEEN_SET[1])
		else
			res.qos_mode = QOS_MODE_MAP["0"]
		end	
	end
	--dbg.print(json.encode(res))
	if false == LUCI_FUNC.qos_mode_set.func(res) then
		return response_data(nil, AppsError.ERROR_MSG.ERROR_OPERATION_FAIL[1]) 
	else
		return response_data(nil, AppsError.ERROR_MSG.ERROR_NONE[1])
	end

end

local function get_qos_mode(params)
	local res = LUCI_FUNC.qos_mode_get.func()
	local data = {}

	data.customized = tonumber(res.custom_detail.customized)
	for k, v in pairs(QOS_MODE_MAP) do
		if v == res.qos_mode then
			data.mode = tonumber(k)
		end
	end

	return response_data(data, AppsError.ERROR_MSG.ERROR_NONE[1]) 
end

local function get_client_priority(params)
	if params == nil or params.clientList == nil then
		return response_data(nil, AppsError.ERROR_MSG.ERROR_INCOMPLETE_PARAMETER[1])
	end

	if type(params.clientList) ~= "table" then
		return response_data(nil, AppsError.ERROR_MSG.ERROR_INVAILD_PARAMETER[1])
	end

	local data = {}
	if table.getn(params.clientList) <= 0 then
		return response_data(data, AppsError.ERROR_MSG.ERROR_NONE[1]) 
	end

	local clist = LUCI_FUNC.qos_prio_dev_get.func(LUCI_FUNC.qos_prio_dev_get.form)
	--dbg.print(json.encode(clist))

	local find = false
	-- foreach parameters
	for _, client in ipairs(params.clientList) do
		find = false
		-- foreach history list
		for k,v in ipairs(clist) do
			--dbg.print(json.encode(v))
			if client.clientMac ~= nil and 
			  string.upper(v.mac:gsub("[-|:]", "")) == string.upper(client.clientMac:gsub("[-|:]", "")) then
				data[#data + 1] = {
					clientMac = string.upper(client.clientMac:gsub("[-|:]", "")),
					prioTime = v.enablePriority == false and 0 or v.timePeriod,
					remainTime = v.remainTime or 0
				}
				find = true
				break
			end
		end
		-- The Devices that are not in history list do not need to return.
		-- if find == false then
		-- 	data[#data + 1] = {
		-- 		clientMac = string.upper(client.clientMac:gsub("[-|:]", "")),
		-- 		prioTime = 0,
		-- 		remainTime = 0
		-- 	}
		-- end
	end

	return response_data({["clientList"] = data}, AppsError.ERROR_MSG.ERROR_NONE[1]) 
end

local function set_client_priority(params)
	if params == nil or params.clientList == nil then
		return response_data(nil, AppsError.ERROR_MSG.ERROR_INCOMPLETE_PARAMETER[1])
	end

	if type(params.clientList) ~= "table" then
		return response_data(nil, AppsError.ERROR_MSG.ERROR_INVAILD_PARAMETER[1])
	end

	local data = {}
	if table.getn(params.clientList) <= 0 then
		return response_data(data, AppsError.ERROR_MSG.ERROR_NONE[1]) 
	end

	local clist = LUCI_FUNC.qos_prio_dev_get.func(LUCI_FUNC.qos_prio_dev_get.form)
	--dbg.print(json.encode(clist))


	local handle_flag = false
	local form = {}
	
	for _, client in ipairs(params.clientList) do
		handle_flag = false
		-- foreach history list
		for k,v in ipairs(clist) do
			if client.clientMac ~= nil and 
			  string.upper(v.mac:gsub("[-|:]", "")) == string.upper(client.clientMac:gsub("[-|:]", "")) then
			  	if client.prioTime ~= nil then
			  		v.enablePriority = client.prioTime ~= 0 and true or false
			  		v.timePeriod = client.prioTime == -1 and "Always" or tostring(client.prioTime)
			  	else
			  		v.enablePriority = true
			  	end
			  	form[#form + 1] = table_copy(v)

				handle_flag = true
				break			
			end
		end
		
		if handle_flag == false then
			data[#data + 1] = {
				clientMac = string.upper(client.clientMac:gsub("[-|:]", "")),
				reason = 0
			}
		end
	end
	-- dbg.print(json.encode(form))
	if false == LUCI_FUNC.qos_prio_dev_set.func(form) then
		return response_data(nil, AppsError.ERROR_MSG.ERROR_OPERATION_FAIL[1])
	end

	if table.getn(data) <= 0 then
		return response_data(nil, AppsError.ERROR_MSG.ERROR_NONE[1])
	else
		return response_data({["unhandleList"] = data}, AppsError.ERROR_MSG.ERROR_NONE[1]) 
	end
end

local function get_history_list(params)
	local data = {}
	local devs = climgmt.get_history_list_dev(0)

	for _, client in ipairs(devs) do
		data[#data + 1] = {
			hostname = client.hostname,
			clientMac = string.upper(client.mac:gsub("[-|:]", "")),
			clientIP = client.ip or "0.0.0.0",
			clientType = client.device_type
		}
	end
	return response_data({["clientList"] = data}, AppsError.ERROR_MSG.ERROR_NONE[1])
end


local ALEXA_HANDLERS = {
	["setLedSwitch"] = { cb = set_led},
	["connectWps"] = { cb = connect_wps},
	["setGuestNetworkSwitch"] = { cb = set_guestNetwork},
	["getGuestNetwork"] = {cb = get_guestNetwork},
	["getNightModeCfg"] = { cb = get_nightMode},
	["setNightMode"] = { cb = set_nightMode},
	["runSpeedTest"] = { cb = run_speed_test},
	["getSpeedTestRslt"] = { cb = get_speed_test_rslt},
	["setQosMode"] = { cb = set_qos_mode},
	["getQosMode"] = { cb = get_qos_mode},
	["getClientPriority"] = { cb = get_client_priority},
	["setClientPriority"] = { cb = set_client_priority},
	["getHistoryList"] = { cb = get_history_list},
	["getSystemMode"] = {cb = get_system_mode}
}

function run(data)
    local ret = {}

    if type(data) ~= "table" or data.method == nil then
		ret = response_data(nil, AppsError.ERROR_MSG.ERROR_PARSE_JSON[1])
	else
		if data.method ~= "getHistoryList" and data.method ~= "getSystemMode" and check_in_ap_mode() == true then
			ret = response_data(nil, AppsError.ERROR_MSG.ERROR_ALEXA_NOT_WORK_IN_AP_MODE[1])
		else
			local fn = ALEXA_HANDLERS[data.method]
			if fn and fn.cb then
				ret = fn.cb(data.params)
			else
				ret = response_data(nil, AppsError.ERROR_MSG.ERROR_UNSUPPORTED_METHOD[1])
			end
		end
    end    

    return ret
end
