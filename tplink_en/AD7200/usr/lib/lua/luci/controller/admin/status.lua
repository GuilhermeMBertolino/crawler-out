--[[
Copyright(c) 2008-2014 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  status.lua
Details :  Controller for status webpage
Author  :  Ye Qianchuan <yeqianchuan@tp-link.net>
Version :  1.0.0
Date    :  05 Mar, 2014
]]--

module("luci.controller.admin.status", package.seeall)

local util  = require "luci.util"
local ubus  = require "ubus"
local ctl   = require "luci.model.controller"
local dbg   = require "luci.tools.debug"
local uci   = require "luci.model.uci"
local uci_r = uci.cursor()


local _ubus

local controller_url = "luci.controller.admin"
local ext_dispatch_tbl = {
    network = {
        controller = controller_url .. ".network",
        target = "dispatch",
        forms = {"status_all"}
    },
    wireless = {
        controller = controller_url .. ".wireless",
        target = "wireless_dispatch",
        -- forms = {"wireless_2g", "wireless_5g", "guest_2g", "guest_5g", "guest"}
        forms = {"status_all"}
    },
    usb = {
        controller = controller_url .. ".usbshare",
        target = "usbshare_dispatch",
        forms = {"disk_status", "printer_status"},
    },
    status = {
        controller = controller_url .. ".status",
        target = "dispatch",
        forms = {"perf", "access_devices_wired", "access_devices_wireless_host", "access_devices_wireless_guest"}
    }
}

function get_all(http_form)
    local data = {}
    local success = true
    http_form = {operation = "read"}
    for mod, dsp in pairs(ext_dispatch_tbl) do
        local target = dsp.controller and require(dsp.controller)[dsp.target]
        http_form["form"] = dsp.forms
        local ret = target(http_form)
        if ret.success then
            assert(#ret.data == 0)
            util.update(data, ret.data)
        else
            success = false
        end
    end

    return success and data
end

local function read_meminfo()
    local meminfo = {}
    local file = io.open("/proc/meminfo")
    local buf = file:read("*a")
    file:close()

    meminfo.total = tonumber(buf:match("MemTotal:%s*(%d+)"))
    meminfo.free = tonumber(buf:match("MemFree:%s*(%d+)"))
    meminfo.buffers = tonumber(buf:match("Buffers:%s*(%d+)"))
    meminfo.cached = tonumber(buf:match("\nCached:%s*(%d+)"))
    meminfo.swapcached = tonumber(buf:match("SwapCached:%s*(%d+)"))

    meminfo.used = meminfo.total - meminfo.free - meminfo.buffers - meminfo.cached - meminfo.swapcached
    meminfo.used = meminfo.used > 0 and meminfo.used or 0
    return meminfo
end

local function read_cpuinfo()
    local cpuinfo = {}
    local file = io.open("/proc/stat")
    local buf = file:read("*l")
    file:close()

    for stat in buf:gmatch("%d+") do
        cpuinfo[#cpuinfo + 1] = tonumber(stat)
    end
    cpuinfo.total = 0
    for _, stat in ipairs(cpuinfo) do
        cpuinfo.total = cpuinfo.total + stat
    end
    cpuinfo.idle = cpuinfo[4] or 0
    cpuinfo.iowait = cpuinfo[5] or 0
    cpuinfo.busy = cpuinfo.total - cpuinfo.idle - cpuinfo.iowait
    cpuinfo.busy = cpuinfo.busy > 0 and cpuinfo.busy or 0
    return cpuinfo
end

function get_perf_fallback(http_form)
    -- Memory usage
    local meminfo = read_meminfo()
    local mem_usage = math.floor(100 * meminfo.used / meminfo.total) / 100

    -- CPU usage
    local nixio = require("nixio")

    local cpuinfo_prev = read_cpuinfo()
    -- Wait 100ms
    nixio.nanosleep(0, 100000000)
    local cpuinfo_cur = read_cpuinfo()

    local total = cpuinfo_cur.total - cpuinfo_prev.total
    total = total > 0 and total or 1

    local busy = cpuinfo_cur.busy - cpuinfo_prev.busy
    busy = busy > 0 and busy or 0

    local cpu_usage = math.floor(100 * busy / total) / 100

    local data = {
        cpu_usage = cpu_usage,
        mem_usage = mem_usage
    }
    return data
end

function get_perf(http_form)
    if not _ubus then
        _ubus = ubus.connect()
    end

    if _ubus then
        local data = _ubus:call("system_perf", "status", {})
        if data then
            return {
                cpu_usage = data.cpu_usage / 100,
                mem_usage = data.mem_usage / 100
            }
        end
    end

    -- The following code might cause problem
    -- if this function is called multiple times quickly.
    local fs = require "nixio.fs"
    if fs.access("/etc/init.d/system-monitor", "x") then
        local sys = require "luci.sys"
        sys.fork_exec("/etc/init.d/system-monitor restart")
    end
    return get_perf_fallback(http_form)
end

function get_access_devices(http_form, wire_type)
    local data = {}
    local clist = require("luci.model.client_mgmt").get_client_list() or {}
    local wire_types = wire_type == "wired" and {"wired"} or {"2.4G", "5G", "60G"}
    local guest = wire_type == "guest" and "GUEST" or "NON_GUEST"

    for _, client in ipairs(clist) do
        if util.contains(wire_types, client.wire_type) and client.guest ==  guest then
            data[#data + 1] = {
                hostname = client.hostname,
                ipaddr = client.ip,
                macaddr = client.mac,
                wire_type = client.wire_type
            }
        end
    end
    return data
end

function get_internet_status()
    local sys = require "luci.sys"
    local internet = require("luci.model.internet").Internet()
    if not _ubus then
        _ubus = ubus.connect()
    end

    local link
    if _ubus then
        local wan = _ubus:call("network.interface.wan", "status", {})
        if wan then
            local ifname = wan.device
            wan = _ubus:call("network.device", "status", {name = ifname})
            if wan then
                link = wan.link
            end
        end
    end

    if not link then
        return {internet_status = "unplugged"}
    end

    local statusv4 = internet:status()
    local statusv6 = internet:status(true)
    if statusv4 == "connected" or statusv6 == "connected" then
        if sys.call("online-test") == 0 then
            return {internet_status = "connected"}
        else
            return {internet_status = "poor_connected"}
        end
    elseif statusv4 == "connecting" or statusv6 == "connecting" then
        return {internet_status = "connecting"}
    else
        return {internet_status = "disconnected"}
    end
end


function tmp_get_internet_status()
    local sys = require "luci.sys"
    local internet = require("luci.model.internet").Internet()
	
	local wan_type = uci_r:get("network", "wan", "wan_type") or ""
	
    if not _ubus then
        _ubus = ubus.connect()
    end

    local link
    if _ubus then
        local wan = _ubus:call("network.interface.wan", "status", {})
        if wan then
            local ifname = wan.device
            wan = _ubus:call("network.device", "status", {name = ifname})
            if wan then
                link = wan.link
            end
        end
    end

    if not link then
        return {internet_status = "unplugged"}
    end

    local statusv4 = internet:status()
    local statusv6 = internet:status(true)
    if statusv4 == "connected" or statusv6 == "connected" then
        if sys.call("online-test") == 0 then
            return {internet_status = "online"}
        else
            return {internet_status = "poor_connected"}
        end
    elseif statusv4 == "connecting" or statusv6 == "connecting" then
		local fp = io.open("/tmp/connecterror",'r')
		if fp == nil then
			if wan_type == "dhcp" then
				sys.fork_call("sleep 6 && echo 'error' > /tmp/connecterror &")
			end
			return {internet_status = "detecting"}
		else
			upgrade = fp:read("*a")
			fp:close()
			if upgrade:match("[.]*auth_failed[.]*") then
				return {internet_status = "pwderror"}
			else
				return {internet_status = "isperror"}
			end
		end
        return {internet_status = "detecting"}
    else
		local fp = io.open("/tmp/connecterror",'r')
		if fp == nil then
			return {internet_status = "offline"}
		else
			upgrade = fp:read("*a")
			fp:close()
			if upgrade:match("[.]*auth_failed[.]*") then
				return {internet_status = "pwderror"}
			else
				return {internet_status = "isperror"}
			end
		end
        return {internet_status = "offline"}
    end
end


function get_tmp_conn_status()
	ret = {}
	ret.conn_status = tmp_get_internet_status().internet_status
	return ret
end

function get_tmp_status()
    local configtool = require "luci.sys.config"
    local nw         = require "luci.model.nwcache"
    local accountmgnt = require"luci.model.accountmgnt"
    local cloud_account = accountmgnt.cloud_account_exist()
	local factory = accountmgnt.is_dft_cfg()

    local ret = {}
    local nw  = nw.init()
    local net = nw:get_network("lan")
    local ifc = net and net:get_interface()

    local ipaddr    = net and net:ipaddr()
    local macaddr   = ifc:mac()
    local maskaddr  = net:netmask() or uci_r:get("network", "lan", "netmask")

    ret.conn_type   = uci_r:get("network", "wan", "wan_type") or "disconnected"
    ret.ip_addr     = ipaddr or "0.0.0.0"
    ret.mac_addr    = macaddr
    --ret.conn_status = get_internet_status().internet_status
    ret.hostname    = configtool.getsysinfo("product_name") or ""
    ret.product     = configtool.getsysinfo("device_name") or ""
    ret.company     = configtool.getsysinfo("FIRM") or ""
    -- ret.traffice_supported = uci_r:get("tfstats", "switch", "enable") and "on" or "off"
    ret.traffice_supported = "off"
    ret.traffice_enabled = uci_r:get("tfstats", "switch", "enable") or "off"
	local hw_ver = configtool.getsysinfo("HARDVERSION")
	if hw_ver == "AD7200 v1.0" or hw_ver == "AD7200 v2.0" then
		hw_ver = "AD7200 v1.0/v2.0"
	end
	local region = configtool.getsysinfo("REGION")
	local sid
	if region == "DE" or region == "EU" then
		sid = "4555"
	elseif region == "US" then
		sid = "5553"
	end
    ret.hardware_ver = hw_ver
    ret.software_ver = configtool.getsysinfo("SOFTVERSION").."("..sid..")"
	if factory then
		ret.factory_default = "1"
	else
		ret.factory_default = "0"
	end
	if cloud_account then
		ret.login_mode = "emailandpass"
	else
		ret.login_mode = "password"
	end

    return ret
end

-- General controller routines

local dispatch_tbl = {
    all = {
        [".super"] = {cb = get_all}
    },
    perf = {
        [".super"] = {cb = get_perf}
    },
    access_devices_wired = {
        [".super"] = {cb = get_access_devices, args = "wired"}
    },
    access_devices_wireless_host = {
        [".super"] = {cb = get_access_devices, args = "host"}
    },
    access_devices_wireless_guest = {
        [".super"] = {cb = get_access_devices, args = "guest"}
    },
    internet = {
        [".super"] = {cb = get_internet_status}
    },
    tmp_status = {
		["read"] = {cb = get_tmp_status},
		["conn_status"] = {cb = get_tmp_conn_status}
    }
}

function dispatch(http_form)
    return ctl.dispatch(dispatch_tbl, http_form)
end

function _index()
    return ctl._index(dispatch)
end

function index()
    entry({"admin", "status"}, call("_index")).leaf = true
end
