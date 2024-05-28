--[[
Copyright(c) 2013 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  ddns.lua
Details :  controller for dynamic dns webpage
Author  :  Guo Dongxian <guodongxian@tp-link.net>
Version :  1.0.1
Date    :  09April, 2014
]]--

module("luci.controller.admin.time_machine", package.seeall)

local io    = require "io"
local uci   = require "luci.model.uci"
local http  = require "luci.http"
local check = require "luci.tools.datatypes"
local ctl   = require "luci.model.controller"
local dbg   = require "luci.tools.debug"
local sys   = require "luci.sys"
local util  = require "luci.util"
local nixio = require "nixio"
local usbshare = require "luci.model.usbshare"
local fs    = require "nixio.fs"

local ERR_INVALID_ARGS       = "00010267"
--local ERR_GET_CFG            = "00010260"
--local ERR_SET_CFG            = "00010261"
--local ERR_INS_CFG            = "00010262"
--local ERR_DEL_CFG            = "00010263"
--local ERR_COMMIT_CFG         = "00010264"

local DISK_FOUND	 = "0"
local DISK_NOT_SET	 = "1"
local DISK_NOT_FOUND = "2"
 
-----------------------volumn for dispatch-----------------------
-- List all volumns
-- @param N/A
-- @return volumn table
function volumn_list()
    local data = {}
    local parser = usbshare.CfgParser()
    local volumns = parser:get_allvolumns()

    for _, volumn in pairs(volumns) do
        if volumn.enable == "on" then
            table.insert(data, {
                uuid = volumn.uuid,
                mntdir = fs.basename(volumn.mntdir),
                label = volumn.path_prefix,
                capacity = volumn.capacity,
                free = volumn.capacity - volumn.used,
                id = volumn.id
            })
        end
    end
	
	table.sort(data, function(a, b) return a.id < b.id end)
	
    return data 
end
-----------------------volumn for dispatch-----------------------

-----------------------params for dispatch-----------------------
-- get time machine params
-- @param N/A
-- @return params or error
function settings_read()
	local uci_r  = uci.cursor()
	local ret_data = {}
	local path
	local parser = usbshare.CfgParser()
	local volumn
	
	local enable = uci_r:get("time_machine", "settings", "enable") or "off"
	ret_data.enable = enable == "on" and "on" or "off"
	
	--path = uci_r:get("time_machine", "settings", "path") or ""
	ret_data.uuid = uci_r:get("time_machine", "settings", "uuid") or nil
	ret_data.limitsize = uci_r:get("time_machine", "settings", "limitsize") or "0"
	
	if ret_data.uuid == nil then
		ret_data.disk_status = DISK_NOT_SET
		ret_data.mntdir = ""
		ret_data.capacity = 0
		ret_data.free = 0
	else
		volumn = parser:get_volumn(ret_data.uuid)
		if volumn then
			ret_data.disk_status = DISK_FOUND
			ret_data.mntdir = fs.basename(volumn.mntdir)
			ret_data.label = volumn.path_prefix
			ret_data.capacity = tonumber(volumn.capacity)
			ret_data.free = ret_data.capacity - tonumber(volumn.used)
		else
			ret_data.disk_status = DISK_NOT_FOUND
			ret_data.mntdir = uci_r:get("time_machine", "settings", "mntdir") or ""
			ret_data.label = uci_r:get("time_machine", "settings", "label") or fs.basename(ret_data.mntdir)
			if ret_data.mntdir ~= "" then
			  ret_data.mntdir = fs.basename(ret_data.mntdir)
			end
			ret_data.capacity = 0
			ret_data.free = 0
		end
	end

	return ret_data
end

-- set time machine params
-- @param http_form : params
-- @return params or error
function settings_write(http_form)
	local uci_r  = uci.cursor()
	local new	 = {}
	local old	 = {}
	local ret_data = {}
	local commit = false
	local parser = usbshare.CfgParser()
	local volumn

	new.enable = http_form["enable"] == "on" and "on" or "off"	
	new.uuid = http_form["uuid"]

	volumn = parser:get_volumn(new.uuid)
	if volumn then
		new.label = volumn.path_prefix
	elseif new.enable == "on" then
		return false, "Invalid uuid, maybe your disk is unplugged"
	end
	--new.path = http_form["path"]
	new.limitsize = http_form["limitsize"]
	if http_form["mntdir"] ~= nil then
		new.mntdir = "/mnt/" .. http_form["mntdir"]
	end

	old.enable = uci_r:get("time_machine", "settings", "enable")
	old.uuid = uci_r:get("time_machine", "settings", "uuid") or nil
	--old.path = uci_r:get("time_machine", "settings", "path") or nil
	old.limitsize = uci_r:get("time_machine", "settings", "limitsize") or nil
	old.mntdir = uci_r:get("time_machine", "settings", "mntdir") or nil
	old.label = uci_r:get("time_machine", "settings", "label") or nil
	
	if new.enable ~= old.enable and new.enable ~= nil then
		uci_r:set("time_machine", "settings", "enable",  new.enable)
		commit = true
	end

	if new.enable == "on" then
		if new.uuid ~= old.uuid and new.uuid ~= nil then
			uci_r:set("time_machine", "settings", "uuid", new.uuid)
			commit = true
		end
		--[[
		if new.path ~= old.path and new.path ~= nil then
			uci_r:set("time_machine", "settings", "path", new.path)
			commit = true
		end
		]]--
		if new.limitsize ~= old.limitsize and new.limitsize ~= nil then
			uci_r:set("time_machine", "settings", "limitsize", new.limitsize)
			commit = true
		end
		if new.mntdir ~= old.mntdir and new.mntdir ~= nil then
			uci_r:set("time_machine", "settings", "mntdir", new.mntdir)
			commit = true
		end
		if new.label ~= old.label and new.label ~= nil then
			uci_r:set("time_machine", "settings", "label", new.label)
			commit = true
		end
	end

	if commit == true then
		uci_r:commit("time_machine")
		sys.fork_exec("/etc/init.d/afpd stop;/etc/init.d/avahi-daemon stop;sleep 5;/usr/sbin/tm_checkrun")
	end
	
	ret_data = settings_read()
	
	return ret_data
end
-----------------------params for dispatch-----------------------

local dispatch_tbl = {
	settings = {
		["read"]   = {cb = settings_read},
		["write"]  = {cb = settings_write}
	},
	contents = {
        ["read"]   = {cb = volumn_list},
    },
}

function dispatch(http_form)
    return ctl.dispatch(dispatch_tbl, http_form)
end

function _index()
    return ctl._index(dispatch)
end

function index()
    entry({"admin", "time_machine"}, call("_index")).leaf = true
end

