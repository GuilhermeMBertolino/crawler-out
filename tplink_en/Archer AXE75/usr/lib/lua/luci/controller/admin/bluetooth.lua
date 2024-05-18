--[[
Copyright(c) 2008-2016 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  bluetooth.lua
Details :  Web controller for bluetooth module.
Author  :  Pan  Weiguang <panweiguang@tp-link.com.cn>
Version :  1.0.0
Date    :  2016-12-28
]]--

local uci   = require "luci.model.uci"
local sys   = require "luci.sys"
local uci_r = uci.cursor()
local dbg   = require "luci.tools.debug"
local ctl   = require "luci.model.controller"

module("luci.controller.admin.bluetooth", package.seeall)

function bluetooth_status(formvalue, args)
    -- body
    local data = {}
    local form = formvalue["form"] or ""
    local operate = formvalue["operation"] or ""

    data["bt"] = "unconnected"
    local file = require("io").popen("nvram get bt_status")
    if file then
        local ln = file:read("*l")
        if ln == "connected" then
            data["bt"] = "connected"
        end
    end

    return data
end


local bluetooth_form = {
    bt = {
        [".super"] = {cb = bluetooth_status}
    }
}


function bluetooth_dispatch(http_form)
    return ctl.dispatch(bluetooth_form, http_form)
end


-- Process wireless webpage's HTTP request.
-- @param N/A
-- @return N/A
function bluetooth_index()
    return ctl._index(bluetooth_dispatch)
end


-- Register wireless URL and RPM
-- @param N/A
-- @return N/A
function index()
    entry({"admin", "bluetooth"}, call("bluetooth_index")).leaf = true
end
