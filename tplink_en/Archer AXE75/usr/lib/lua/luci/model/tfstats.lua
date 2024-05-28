--[[
Copyright(c) 2014 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  tfstats.lua
Details :  traffic statistics  model
Author  :  Wen Kun <wenkun@tp-link.net>
Version :  1.0.0
Date    :  31Mar, 2014
]]--

local sys = require "luci.sys"
local utl = require "luci.util"
local uci = require "luci.model.uci"
local ip  = require "luci.ip"
local bus = require "ubus"
local form = require "luci.tools.form"
local dtypes = require "luci.tools.datatypes"
local dbg = require "luci.tools.debug"
local clientmgmt = require "luci.model.client_mgmt"
local uci_r  = uci.cursor()

module("luci.model.tfstats", package.seeall)

TFS_INST = utl.class()
local uci_r = uci.cursor()

function TFS_INST:__init__()
    self.module = "tfstats"
    self.uci    = uci.cursor()
    self.cfg    = "tfstats"
    self.sec    = "switch"
    self.client = "client_mgmt"
    self.alias  = "alias"
    self.ubus   = bus.connect()
    self.state  = false

    for _, obj in ipairs(self.ubus:objects()) do
        if obj:match(self.module) then
            self.state = true
            break
        end
    end
end

function fix_stats_uint32(stats_tbl)
    for _, stats in ipairs(stats_tbl) do
        for k, vt in pairs(stats) do
            if k ~= "ip" and k ~= "mac" then
               stats[k] = (vt >= 0) and vt or (0x100000000 + vt)
            end
        end
    end
    return stats_tbl
end

--- Ubus call tfstas module
-- @param method  method for ubus call, get/set/delete/reset
-- @param data    param for ubus call
-- @return ubus return value
function TFS_INST:ubus_invoke(method, data)
    local ret

    if type(data) ~= "table" then
        data = { data }
    end

    if self.state then
        ret = self.ubus:call(self.module, method, data)
    else
        dbg.printf("tfstats module is not ready!")
        ret = false
    end

    return ret
end

--- Load switch status of traffic statistics.
-- @return status, on or off
function TFS_INST:load_enable()
    local sw = self.uci:get(self.cfg, self.sec, "enable")
    if sw and sw == "on" or sw == "off" then
        return {enable = sw}
    end
    return false
end

--- Set switch of traffic statistics.
-- @param status on or off
-- @return status, or errorcode if error accured.
function TFS_INST:set_enable(status)
    local sw = self:load_enable()
    local cmd = "stop"

	if status == "nat_off" and sw.enable == "on" then
        sys.fork_call("/etc/init.d/tfstats %s" % cmd .. "&")
		return {enable = status}
	elseif status == "nat_off" and sw.enable == "off" then
		return {enable = status}
	end

    if status ~= "on" and status ~= "off" then
        return {errorcode = "Invalid argument."}
    elseif sw.enable and status ~= sw.enable then
        self.uci:set(self.cfg, self.sec, "enable", status)
        self.uci:commit(self.cfg)
        cmd = (status == "on") and "start" or "stop"
        sys.fork_call("/etc/init.d/tfstats %s" % cmd .. "&")
    end

    -- sync HNAT
    local nat_m = require "luci.model.nat"
    local Nat = nat_m.NAT_INST()
    Nat:sync_hnat_status()

    return {enable = status}
end

--- Get all statistics
-- @return stats table list of statistics; total number.
function TFS_INST:load_stats()
    local stats = {}
    local total = 0
    local mac
    local to_remove

    local ret = self:ubus_invoke("get", {})
    if ret then
        total = ret.total
        stats = ret.tfslist
    end

    return fix_stats_uint32(stats), total
end

function TFS_INST:load_all_stats()
    return self:load_stats()
end

--- Get all data of 7 days or 24 hours or 10 minutes
-- @return data table list of statistics:daily or hourly or minutely.
function TFS_INST:load_data(ip, seg_type)
    local ret = self:ubus_invoke("seg_get", { ip = ip, type = seg_type})
    if ret then
        return ret;
    end
    return ret;
end

function TFS_INST:load_all_data(ip, seg_type)
    return self:load_data(ip, seg_type)
end

function TFS_INST:load_list(ip, seg_type)
    local ret = self:ubus_invoke("seg_list", {})
    if ret then
        return ret;
    end
    return ret;
end

--- Reset all of statistics
-- @return stats table list of statistics.
function TFS_INST:clean_all_data()
    self:ubus_invoke("reset", {ip = "all"})
    return true
end

--- Set the alias for a device with the mac
-- @return stats table list of statistics.
function TFS_INST:get_dev_name(mac_t)
    local ret = self:ubus_invoke("get", {})
    local mac = ''
    local stats = {}
    if ret then
	stats = ret.tfslist
    end
    local data = require("luci.model.client_mgmt").get_client_list()
    if data == nil or next(stats) == nil then
        data = {}
    else
        for k, v in pairs(data) do
            v.mac = v.mac:lower()
	    mac = v.mac
	    to_remove = 1
	    for _, q in pairs(stats) do
		if q.mac == mac then
		    to_remove = 0
		    break
		end
	    end
	    if to_remove == 1 then
		table.remove(data, k)
	    end
        end
    end
    return data
end

--- Set the alias for a device with the mac
-- @return wether uci set is success
function TFS_INST:set_dev_name(mac, alias)
    mac = mac:gsub("-", ""):upper()
	clientmgmt.set_client_nickname(mac, alias)
	--uci_r:commit("history_list")
    return true
end

function TFS_INST:set_net(ipaddr, netmask)
    local ret
    if dtypes.ipaddr(ipaddr) and dtypes.ipaddr(netmask) then
        self:ubus_invoke("set_net", {ip = ipaddr, mask = netmask})
        ret = true
    else
        ret = false
    end
    return ret 
end

