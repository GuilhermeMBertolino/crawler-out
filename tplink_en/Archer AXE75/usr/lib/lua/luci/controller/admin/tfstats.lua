--[[
Copyright(c) 2008-2014 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  tfstats.lua
Details :  controller for traffic statistics webpage
Author  :  Wen Kun <wenkun@tp-link.net>
Version :  1.0.0
Date    :  17Mar, 2014
]]--
module("luci.controller.admin.tfstats", package.seeall)

local uci               = require "luci.model.uci"
local fs                = require "luci.fs"
local dbg               = require "luci.tools.debug"
local tfs               = require "luci.model.tfstats"
local ctl               = require "luci.model.controller"

function tf_load_status()
    local tfs_t = tfs.TFS_INST()
    return tfs_t:load_enable()
end

function tf_save_status(http_form)
    local tfs_t = tfs.TFS_INST()
    local enable = http_form.enable
    return tfs_t:set_enable(enable)
end

function tf_load_stats()
    local tfs_t = tfs.TFS_INST()
    return tfs_t:load_all_stats()
end

function tf_load_data(http_form)
    local ip = http_form.ip
    local seg_type = http_form.seg_type
	local tfs_t = tfs.TFS_INST()
	return tfs_t:load_all_data(ip, seg_type)
end

function tf_load_list()
    local tfs_t = tfs.TFS_INST()
    return tfs_t:load_list()
end

function tf_clean_all_data()
	local tfs_t = tfs.TFS_INST()
	return tfs_t:clean_all_data()
end

function tf_get_dev_name()
	local tfs_t = tfs.TFS_INST()
	return tfs_t:get_dev_name()
end

function tf_set_dev_name(http_form)
    local mac = http_form.mac
    local alias = http_form.alias
	local tfs_t = tfs.TFS_INST()
	return tfs_t:set_dev_name(mac, alias)
end
-----------------------------------------------------------------------------------
-----------------------------------------------------------------------------------

local dispatch_tbl = {
    status = {
        ["read"]  = { cb  = tf_load_status },
        ["write"] = { cb  = tf_save_status }        
    },

    lists = {
        ["load"]      = { cb  = tf_load_stats },
    },

	data = {
        ["seg_get"]       = { cb  = tf_load_data },
        ["seg_list"]      = { cb  = tf_load_list } ,
		["reset_all"]     = { cb  = tf_clean_all_data },
	},

	dev_name = {
		["read"]  = { cb = tf_get_dev_name },
		["write"] = { cb = tf_set_dev_name },
	}
}

function dispatch(http_form)
    return ctl.dispatch(dispatch_tbl, http_form)
end

function _index()
    return ctl._index(dispatch)
end

function index()
    entry({"admin", "traffic"}, call("_index")).leaf = true
end
