--[[
Copyright(c) 2015 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  mcu_upgrade.lua
Details :  Controller for checking mcu upgrade status.
Author  :  Wang Siyuan <wangsiyuan@tp-link.net>
Version :  1.0.0
Date    :  23 Mar, 2015
]]--

module("luci.controller.mcu_upgrade", package.seeall)

local ctl = require "luci.model.controller"
local dbg = require "luci.tools.debug"

function mcu_upgrade_check()
    local finish
    local res = os.execute("mcu_update_finish")
    
    if res == 0 then
        finish = "yes"
        os.execute("nvram unset upgrade_flag")
        os.execute("nvram commit")
    else
        finish = "no"
    end

    local data = {
        mcu_finish = finish
    }

    return data
end

local dispatch_tbl = {
    mcu_upgrade = {
        ["check"] = { cb = mcu_upgrade_check }
    }
}

function dispatch(http_form)
    return ctl.dispatch(dispatch_tbl, http_form)
end

function _index()
    return ctl._index(dispatch)
end

function index()
    entry({"mcu_upgrade"}, call("_index")).leaf = true
end

