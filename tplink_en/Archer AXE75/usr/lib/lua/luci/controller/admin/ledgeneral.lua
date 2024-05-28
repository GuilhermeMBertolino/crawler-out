--[[
Copyright(c) 2011-2015 Shenzhen TP-LINK Technologies Co.Ltd.

File	:  ledgeneral.lua
Details :  Controller for LED General ON/OFF button
Author	:  Liu Qu <liuqu@tp-link.net>
Version :  1.0.0
Date	:  27 Feb, 2015
]]--

module("luci.controller.admin.ledgeneral", package.seeall)

local uci	 = require "luci.model.uci"
local dtypes = require "luci.tools.datatypes"
local sys	 = require "luci.sys"
local ctl	 = require "luci.model.controller"
local subprocess = require "luci.model.subprocess"

local RELOAD_LEDGENERAL = "/etc/init.d/ledgeneral reload"

function get()
	local uci_r = uci.cursor()
	local uci_s = uci.cursor_state()
	--added by zhangshengbo for c5400x
	local lp5523_flag = uci_r:get_profile("lp5523", "message") or "chip-down"
	if lp5523_flag == "chip-on" then
		local flag = ""
		flag = sys.exec("[ -f /tmp/led_nightMode ] && cat /tmp/led_nightMode")
		if flag ~= "" 
		then
			flag = string.sub(flag,0,2)
		end
		if flag == "on" then
			return {["enable"] = "off",
					["ledst_support"] = uci_r:get_profile("ledctrl", "ledst_support") or "no"}
		else
			return {["enable"] = "on",
					["ledst_support"] = uci_r:get_profile("ledctrl", "ledst_support") or "no"}
		end
	else
	--c9/5400
		--local uci_r = uci.cursor()
	local time_set = uci_s:get("systime", "core", "sync")
	
	return { ["enable"] = uci_r:get("ledctrl", "GENERAL", "enable") or "off",
			 ["ledst_support"] = uci_r:get_profile("ledctrl", "ledst_support") or "no",
			 ["time_set"] = time_set == "1" and "yes" or "no"
			 --["night_mode"] = uci_r:get("ledpm", "leds", "enable") or "off"
		   }
end
end
-- add by liuxufeng for smart home API, smart_home report below
local function smart_home_report()
	local uci_r = uci.cursor()
	local smart_home_support = uci_r:get_profile("smart_home", "support") or "no"
	if smart_home_support and smart_home_support == "yes" then
		local smart_home_upload = require "cloud.smart_home.smart_home_upload"
		local cause = smart_home_upload.APP
		smart_home_upload.upload_property_change("led", cause)
	end
end

function set(formvalue)
	-- add by liuxufeng for smart home API
	local uci_r = uci.cursor()
	local smart_home_support = uci_r:get_profile("smart_home", "support") or "no"
	if smart_home_support and smart_home_support == "yes" then
		if formvalue and formvalue.enable and formvalue.smart_home_cause then
			local enable = formvalue.enable
			local old_data = get()
			local flag = false
			--led type1
			local lp5523_flag = uci_r:get_profile("lp5523", "message") or "chip-down"
			if lp5523_flag == "chip-on" then
				if enable == "on" then
					if old_data.enable == "off" then
						sys.exec("echo 'off' > /tmp/led_nightMode")
						--write tmp file here to display led status immediately
						sys.fork_exec("ubus send leds '{\"action\" : \"4\",\"status\" : \"0\"}'")
						flag = true
					end
				else
					if old_data.enable == "on" then
						sys.exec("echo 'on' > /tmp/led_nightMode")
						--write tmp file here to display led status immediately
						sys.fork_exec("ubus send leds '{\"action\" : \"4\",\"status\" : \"1\"}'")
						flag = true
					end
				end
			-- led type2
			else
				if enable == "on" then
					if old_data.enable == "off" then
						uci_r:set("ledctrl", "GENERAL", "enable", "on")
						uci_r:commit("ledctrl") 
						sys.fork_exec(RELOAD_LEDGENERAL)
						flag = true
					end
				else
					if old_data.enable == "on" then
						uci_r:set("ledctrl", "GENERAL", "enable", "off")
						uci_r:commit("ledctrl")
						sys.fork_exec(RELOAD_LEDGENERAL)
						flag = true
					end
				end
			end
			-- smart_home report below
			if flag == true then
				local smart_home_upload = require "cloud.smart_home.smart_home_upload"
				local cause = smart_home_upload.VOICE
				smart_home_upload.upload_property_change("led", cause)
			end
			-- smart_home report above
			return get()
		end
	end
	--added by zhangshengbo for c5400x
	--local uci_r = uci.cursor()
	local lp5523_flag = uci_r:get_profile("lp5523", "message") or "chip-down"
	if lp5523_flag == "chip-on" then
		local flag = ""
		flag = sys.exec("[ -f /tmp/led_nightMode ] && cat /tmp/led_nightMode")
		if flag ~= ""
		then
			flag = string.sub(flag,0,2)
		end
		if flag == "on" then
			sys.exec("echo 'off' > /tmp/led_nightMode")
			--write tmp file here to display led status immediately
			sys.fork_exec("ubus send leds '{\"action\" : \"4\",\"status\" : \"0\"}'")
			
			-- smart_home report below
			smart_home_report()
			-- smart_home report above
			
			return {["enable"] = "on"}
		else
			sys.exec("echo 'on' > /tmp/led_nightMode")
			--write tmp file here to display led status immediately
			sys.fork_exec("ubus send leds '{\"action\" : \"4\",\"status\" : \"1\"}'")
			
			-- smart_home report below
			smart_home_report()
			-- smart_home report above
			
			return {["enable"] = "off"}
		end

	else
	--c9/5400
		--local uci_r = uci.cursor()

		local old_data = get()
		--local time_set = sys.exec("[ -f /tmp/ledpm_enable ] && cat /tmp/ledpm_enable")
		--if time_set:find("1")
		--then
		--	  local night_mode_on = uci_r:get("ledpm", "leds", "enable") or "off"
		--	  if night_mode_on == "on"
		--	  then
		--		  local night_enable = uci_r:get("ledctrl", "NIGHT", "enable") or "off"
		--		  if night_enable == "on"
		--		  then
		--			  old_data.enable = "disabled"
		--			  return old_data
		--		  end
		--	  end
		--end
		--
			
		local en = "on"
		if old_data.enable == "on"
		then
			en = "off"
		end

		uci_r:set("ledctrl", "GENERAL", "enable", en)
		uci_r:commit("ledctrl")
		sys.fork_exec(RELOAD_LEDGENERAL)
		
		-- smart_home report below
		smart_home_report()
		-- smart_home report above
		
		return get()
	end
end

local dispatch_tbl = {
	["setting"] = {
		["read"]  = { cb = get },
		["write"] = { cb = set }
	}
}

function dispatch(http_form)
	return ctl.dispatch(dispatch_tbl, http_form)
end

function _index()
	return ctl._index(dispatch)
end

function index()
	entry({"admin", "ledgeneral"}, call("_index")).leaf = true
end
