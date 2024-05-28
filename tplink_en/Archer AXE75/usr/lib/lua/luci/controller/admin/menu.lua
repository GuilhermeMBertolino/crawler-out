--[[
Copyright(c) 2008-2014 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  menu.lua
Details :  Controller for obtaining menu list
Author  :  Zhang zhongwei <zhangzhongwei@tp-link.net>
Version :  1.0.0
Date    :  17 Nov, 2014
]]--

module("luci.controller.admin.menu", package.seeall)

local dbg   = require "luci.tools.debug"
local cfgt  = require "luci.sys.config"
local uci_r = require("luci.model.uci").cursor()
local ctl   = require "luci.model.controller"

local MODEL = cfgt.getsysinfo("product_name") or "AC2500"

local BLOCK_MENU = {
	basic = {
		{ main_m = "homecare",         sub_m = "null" },
		{ main_m = "parental-control", sub_m = "null" },
		{ main_m = "qos",              sub_m = "null" }
	},
	advanced = {
		{ main_m = "parental-control", sub_m = "null" },
		{ main_m = "qos",              sub_m = "null" },
		{ main_m = "nat-forwarding",   sub_m = "null" },
		{ main_m = "vpn",              sub_m = "null" },
		{ main_m = "security",         sub_m = "cloud-security"}
	}
}

local function is_block_menu(prefix, main_m, sub_m)
	local m = BLOCK_MENU[prefix]
	
	if m then
		for _, k in pairs(m) do
			if main_m == k.main_m and sub_m == k.sub_m then
				return true
			end
		end
	end
	
	return false
end

function read_menu(formval, prefix)
	local proto = uci_r:get("network", "wan", "proto")
    local menu = {}
    local data = {
        model = string.lower(MODEL),
        page  = prefix,
        menu  = menu
    }

    local main_menus = uci_r:get_profile(prefix .. "_menu", "menu")
    for _, menu_name in ipairs(main_menus or {}) do
		if (proto ~= "dslite" and proto ~= "v6plus") or is_block_menu(prefix, menu_name, "null") == false then
			menu[#menu + 1] = {name = menu_name}
			
			local sub_menus = uci_r:get_profile(prefix .. "_" .. menu_name, "menu")
			if sub_menus and type(sub_menus) == "table" then
				local children = {}
				for _, child_name in pairs(sub_menus) do
					if (proto ~= "dslite" and proto ~= "v6plus") or is_block_menu(prefix, menu_name, child_name) == false then
						children[#children + 1] = {name = child_name}
					end
				end
				menu[#menu].children = children
			end
		end
    end

    return data
end

local dispatch_tbl = {
    basic_menu = {
        [".super"] = {cb = read_menu, args = "basic"},
        ["read"] = {cb = read_menu, args = "basic"}
    },
    advanced_menu = {
        [".super"] = {cb = read_menu, args = "advanced"},
        ["read"] = {cb = read_menu, args = "advanced"}
    },
    mobile_menu = {
        [".super"] = {cb = read_menu, args = "mobile"},
        ["read"] = {cb = read_menu, args = "mobile"}
    },
    ap_menu = {
        [".super"] = {cb = read_menu, args = "ap"},
        ["read"] = {cb = read_menu, args = "ap"}
    }
}

function dispatch(http_form)
    return ctl.dispatch(dispatch_tbl, http_form)
end

function _index()
    return ctl._index(dispatch)
end

function index()
    entry({"admin", "menu"}, call("_index")).leaf = true
end
