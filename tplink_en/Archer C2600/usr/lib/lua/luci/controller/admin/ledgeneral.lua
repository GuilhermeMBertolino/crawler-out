--[[
Copyright(c) 2011-2015 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  ledgeneral.lua
Details :  Controller for LED General ON/OFF button
Author  :  Liu Qu <liuqu@tp-link.net>
Version :  1.0.0
Date    :  27 Feb, 2015
]]--

module("luci.controller.admin.ledgeneral", package.seeall)

local uci    = require "luci.model.uci"
local dtypes = require "luci.tools.datatypes"
local dbg    = require "luci.tools.debug"
local sys    = require "luci.sys"
local ctl    = require "luci.model.controller"

local RELOAD_LEDGENERAL = "/etc/init.d/ledgeneral reload"

local function get()
    local uci_r = uci.cursor()
    local ledpm_en = sys.exec("[ -f /tmp/ledpm_enable ] && cat /tmp/ledpm_enable")
    
    return { ["enable"] = uci_r:get("ledctrl", "GENERAL", "enable") or "off",
             ["ledpm_disabled"] = ledpm_en:find("1") and "false" or "true"
           }
end

local function set(formvalue)
    local log = require("luci.model.log").Log(288)
    local old_data = get()
    local enable = sys.exec("[ -f /tmp/ledpm_enable ] && cat /tmp/ledpm_enable")
    if enable:find("1")
    then
        local uci_r = uci.cursor()
        local night_on = uci_r:get("ledpm", "leds", "enable") or "off"

        if night_on == "on"
        then
            local night_enable = uci_r:get("ledctrl", "NIGHT", "enable") or "off"
            if night_enable == "on"
            then
                old_data.enable = "disabled"
                return old_data
            end
        end
    end

 
    local en = "on"
    local ledgnrled = 1 
    if old_data.enable == "on"
    then
        en = "off"
        ledgnrled = 0
        log(53)
    else
        log(52)
    end

    local uci_r = uci.cursor()
    uci_r:set("ledctrl", "GENERAL", "enable", en)
    
    sys.fork_exec(RELOAD_LEDGENERAL)

    uci_r:commit("ledctrl")
    
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
    entry({"admin", "ledgeneral"}, call("_index")).leaf = true
end
