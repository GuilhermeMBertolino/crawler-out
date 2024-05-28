--[[
Copyright(c) 2011-2014 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  iptv.lua
Details :  Controller for LED Control at night webpage
Author  :  Guo Dongxian <guodongxian@tp-link.net>
Version :  1.0.0
Date    :  17 Oct, 2014
]]--

module("luci.controller.admin.ledpm", package.seeall)

local uci    = require "luci.model.uci"
local dtypes = require "luci.tools.datatypes"
local sys    = require "luci.sys"
local ctl    = require "luci.model.controller"

local RELOAD_LEDPM = "/etc/init.d/ledpm reload"
--added by zhangshengbo
local LED_NIGHT_MODE = "/etc/sbin/leds_night_mode"

function get()
    local uci_r = uci.cursor()
	--added by zhangshengbo
	local lp5523_flag = uci_r:get_profile("lp5523", "message") or "chip-down"
	if lp5523_flag == "chip-on" then
		return { ["enable"] = uci_r:get("ledpm", "leds", "enable") or "off",
				["time_start"] = uci_r:get("ledpm", "leds", "time_start") or "00:00",
				["time_end"] = uci_r:get("ledpm", "leds", "time_end") or "00:00",
				["ledpm_support"] = uci_r:get_profile("ledctrl", "ledpm_support") or "no"
			}
    else
		--c9/5400
    	return { ["enable"] = uci_r:get("ledpm", "leds", "enable") or "off",
             	["time_start"] = uci_r:get("ledpm", "leds", "time_start") or "00:00",
             	["time_end"] = uci_r:get("ledpm", "leds", "time_end") or "00:00",
             	["ledpm_support"] = uci_r:get_profile("ledctrl", "ledpm_support") or "no"
           	}
	end
end

function set(formvalue)
	--added by zhangshengbo
	local uci_r = uci.cursor()
	local lp5523_flag = uci_r:get_profile("lp5523", "message") or "chip-down"
	if lp5523_flag == "chip-on" then
		local old_data = get()
		
		local en  = formvalue["enable"]
		local tms = formvalue["time_start"] or uci_r:get("ledpm", "leds", "time_start") or "00:00"
		local tme = formvalue["time_end"] or uci_r:get("ledpm", "leds", "time_end") or "00:00"	
		if not en or not tms or not tme
		then
			return false, "Invalid URL"
		end
		
		if not tms:match("%d%d:%d%d") or not tme:match("%d%d:%d%d")
		then
			return false, "Invalid URL"
		end
		
		if en ~= old_data.enable or tms ~= old_data.time_start 
			or tme ~= old_data.time_end
		then
			uci_r:set("ledpm", "leds", "enable", en)
			uci_r:set("ledpm", "leds", "time_start", tms)
			uci_r:set("ledpm", "leds", "time_end", tme)
		
			uci_r:commit("ledpm")
		end
		sys.fork_exec(LED_NIGHT_MODE)
	else
	--c9/5400
    local old_data = get()

    local en  = formvalue["enable"]
    local tms = formvalue["time_start"] or uci_r:get("ledpm", "leds", "time_start") or "00:00"
    local tme = formvalue["time_end"] or uci_r:get("ledpm", "leds", "time_end") or "00:00"

    if not en or not tms or not tme
    then
        return false, "Invalid URL"
    end

    if not tms:match("%d%d:%d%d") or not tme:match("%d%d:%d%d")
    then
        return false, "Invalid URL"
    end

    if en ~= old_data.enable or tms ~= old_data.time_start 
        or tme ~= old_data.time_end
    then
        uci_r:set("ledpm", "leds", "enable", en)
        uci_r:set("ledpm", "leds", "time_start", tms)
        uci_r:set("ledpm", "leds", "time_end", tme)

        uci_r:commit("ledpm")
        
        --sys.fork_exec(RELOAD_LEDPM)
    end
	sys.fork_exec(RELOAD_LEDPM)
	end
    -- smart_home report below
    local smart_home_support = uci_r:get_profile("smart_home", "support") or "no"
    if smart_home_support and smart_home_support == "yes" then
        local smart_home_upload = require "cloud.smart_home.smart_home_upload"
        local cause = smart_home_upload.APP
        if formvalue.smart_home_cause then
            cause = smart_home_upload.VOICE
        end
        smart_home_upload.upload_property_change("nightMode", cause)
    end
    -- smart_home report above
    return get()
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
    entry({"admin", "ledpm"}, call("_index")).leaf = true
end

