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
local nixio = require "nixio"
local uci_r = uci.cursor()
local vendor = require "cloud_req.cloud_vendor"

local form  = require "luci.tools.form"
local speedts  = require "luci.model.speed_test"
local iqos   = require "luci.model.qos"
local wlan  = require "luci.model.wireless"
form = form.Form(uci_r)

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
        forms = {"perf", "access_devices_all"}
    },
    modem = {
        controller = controller_url .. ".usbmodem",
        target = "dispatch",
        forms = {"mobile_inf"}
    }
}

function check_cloud_support()
    local cloud_support = uci_r:get_profile("cloud", "cloud_support") or "no"
    return cloud_support
end

function get_oui_local(mac_head)
	local oui = require("luci.model.client_mgmt").get_name_by_mac_oui(mac_head)
	if oui == false then
		oui = "UNKNOWN"
	end
	
	return oui
end

local function get_oui(mac)
    local cloud_support =  check_cloud_support()

    local mac_upper = string.upper(mac)
    local mac_head = mac_upper:sub(1,8)
    local oui_config = string.gsub(mac_head, "%-", "%_")
    local vendor = require "cloud_req.cloud_vendor"

    local oui = uci_r:get("vendor", "oui", oui_config)
    if oui then
        return oui
    end

    local internet = get_internet_status()

    if cloud_support == "yes" and internet.internet_status == "connected" then
        oui = vendor.get_vendor(mac_head)

        if not oui then
            oui = get_oui_local(mac_head)
		end
    else
        oui = get_oui_local(mac_head)
    end
    
    if oui and oui ~= "UNKNOWN" then
        uci_r:set("vendor", "oui", oui_config, oui)
        uci_r:commit("vendor")
    end
    
    return oui
end
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

--function get_wireless_intf_type(client)
--    local intf = ""
--    local mode = uci_r:get("sysmode", "sysmode", "mode") or "router"
--
--    if mode ~= "router" and mode ~= "ap" then
--        return intf
--    end
--	
--    if client.wire_type == "5G"	then
--        if client.guest == "GUEST" then
--            intf = "wl1.1"
--        else
--            intf = "eth2"
--        end
--    else
--        if client.guest == "GUEST" then
--            intf = "wl0.1"
--        else
--            intf = "eth1"
--        end
--    end
--	
--    return intf
--end--

--function get_wireless_intf_type_C4000(client)
--    local intf = ""
--    local mode = uci_r:get("sysmode", "sysmode", "mode") or "router"
--
--    if mode ~= "router" and mode ~= "ap" then
--        return intf
--    end
--	
--    if client.wire_type == "5G"	then
--        if client.guest == "GUEST" then
--            intf = "wl2.1"
--        else
--            intf = "eth8"
--        end
--    elseif client.wire_type == "2.4G" then
--        if client.guest == "GUEST" then
--            intf = "wl1.1"
--        else
--            intf = "eth7"
--        end
--    else
--        if client.guest == "GUEST" then
--            intf = "wl0.1"
--        else
--            intf = "eth6"
--        end    
--    end
--	
--    return intf
--end

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
		local cpu1, cpu2, cpu3, cpu4
        if data then
            for i,v in pairs(data) do
				if i == "cpu1_usage" then
					cpu1 = data[i]
				elseif i == "cpu2_usage" then
					cpu2 = data[i]
				elseif i == "cpu3_usage" then
					cpu3 = data[i]
				elseif i == "cpu4_usage" then
					cpu4 = data[i]
				end
                data[i] = data[i] / 100
            end
			local model = uci_r:get_profile("global", "model") or ""
			if model == "INTEL_GRX350" then
				data["cpu1_usage"] = (cpu1 + cpu2)/200
				data["cpu2_usage"] = cpu3/100 -- cpu4 not used
			elseif model == "MTK_762X" then
				data["cpu1_usage"] = (cpu1 + cpu2)/200
				data["cpu2_usage"] = (cpu3 + cpu4)/200	
			end

            return data
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
    local wire_types = wire_type == "wired" and {"wired"} or {"2.4G", "5G", "5G_2"}
    local guest = wire_type == "guest" and "GUEST" or "NON_GUEST"

    for _, client in ipairs(clist) do
        if util.contains(wire_types, client.wire_type) and client.guest ==  guest then
            data[#data + 1] = {
                hostname = uci_r:get("client_mgmt", client.mac:gsub("-", "_"):upper(), "hostname") or client.hostname,
                ipaddr = client.ip,
                macaddr = client.mac,
                wire_type = client.wire_type,
            }
        end
    end
    return data
end

function get_access_devices_all(http_form)
    local data = {}
    local wired_data = {}
    local wireless_host_data = {}
    local wireless_guest_data = {}
    local clist = require("luci.model.client_mgmt").get_client_list() or {}

    for _, client in ipairs(clist) do
        local tmp_tbl = {
                hostname = uci_r:get("client_mgmt", client.mac:gsub("-", "_"):upper(), "hostname") or client.hostname,
                ipaddr = client.ip,
                macaddr = client.mac,
                wire_type = client.wire_type,
            }

        -- wired devices
        if util.contains({"wired"}, client.wire_type) and "NON_GUEST" ==  client.guest  then
            wired_data[#wired_data + 1] = tmp_tbl
        end

        -- wireless host and guest devices
        if util.contains({"2.4G", "5G", "5G_2"}, client.wire_type) then
            if "NON_GUEST" ==  client.guest then
                wireless_host_data[#wireless_host_data + 1] = tmp_tbl
            elseif "GUEST" ==  client.guest then
                wireless_guest_data[#wireless_guest_data + 1] = tmp_tbl
            end
        end
    end

     if #wired_data > 0 then
         data["access_devices_wired"] = wired_data
     end
     if #wireless_host_data > 0 then
         data["access_devices_wireless_host"] = wireless_host_data
     end
     if #wireless_guest_data >0 then
         data["access_devices_wireless_guest"] = wireless_guest_data
     end
    return data
end

local function get_real_wan_ifname()
	local ifname
	local dup_lanwan_support = uci_r:get_profile("switch", "bcm_dup_lanwan_support") or "no"
	if "yes" == dup_lanwan_support then
		local wan_sec = uci_r:get("switch", "wan", "switch_port")
		ifname = uci_r:get("switch", wan_sec, "ifname")
	else
		ifname = uci_r:get_profile("wan", "wan_ifname") or uci_r:get("network", "wan", "ifname")
	end

	return ifname
end

function get_internet_status(http_form, phy_state)
    local sys = require "luci.sys"
    local internet = require("luci.model.internet").Internet()

    local mode = uci_r:get("sysmode", "sysmode", "mode")
    if mode == "ap" then
        wan_condition = util.exec("status wan_status")
        local status = get_connect_status()
        for i=1, #status do
            if status[i] == "connected"
            then
                wan_condition = "connected"
                break
            end
        end
        if wan_condition == "unconnected"
        then
            wan_condition = "disconnected"
        end
        if phy_state == "true" and wan_condition == "connected" then
            return {internet_status = "connected"}
        end

        if sys.call("online-test") == 0 and wan_condition == "connected" then
            return {internet_status = "connected"}
        elseif sys.call("online-test") ~= 0 and wan_condition == "connected" then
            return {internet_status = "poor_connected"}
        end

        return {internet_status = "unplugged"}
    end

    if not _ubus then
        _ubus = ubus.connect()
    end

    local link
    if _ubus then
        local wan = _ubus:call("network.interface.wan", "status", {})
        if wan then
            local ifname = wan.device
            if ifname == "br-wan" then
				-- Get real wan ifname
				ifname = get_real_wan_ifname()
            end
            wan = _ubus:call("network.device", "status", {name = ifname})
            if wan then
                link = wan.link
            end
        end
    end

    if not link then
        if phy_state == "true" then
            return {internet_status = "disconnected"}
        else
            return {internet_status = "unplugged"}
        end
    end

    local statusv4 = internet:status()
    local statusv6 = internet:status(true)
    if phy_state == "true" then
        if statusv4 == "connected" or statusv6 == "connected" or statusv4 == "connecting" or statusv6 == "connecting" then
            return {internet_status = "connected"}
        else
            return {internet_status = "disconnected"}
        end
    else
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

end


function tmp_get_internet_status()
    local sys = require "luci.sys"
    local internet = require("luci.model.internet").Internet()

    local mode = uci_r:get("sysmode", "sysmode", "mode") or "router"
    if mode == "ap" then
        local wan_condition = util.exec("status wan_status")
        local status = get_connect_status()
        for i=1, #status do
            if status[i] == "connected"
            then
                wan_condition = "connected"
                break
            end
        end
        if wan_condition == "unconnected"
        then
            wan_condition = "disconnected"
        end

        if sys.call("online-test") == 0 and wan_condition == "connected" then
            return {internet_status = "online"}
        elseif sys.call("online-test") ~= 0 and wan_condition == "connected" then
            return {internet_status = "poor_connected"}
        end

        return {internet_status = "unplugged"}
    end
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

	local usbmodem = require "luci.controller.admin.usbmodem"
	if usbmodem then
		usbmodem_info = usbmodem.get_status_mobile()
		--3g4g connect
		if tonumber(usbmodem_info.conn_type) == 1 then
			if usbmodem_info.modem_connstatus == 1 then
					ret.conn_status = "online"
			elseif usbmodem_info.modem_connstatus == 4 then
					ret.conn_status = "poor_connected"
			end
		end
	end

	return ret
end

function get_wan_cable_match_stat()
	local data = {}
	local match_status
	local internet = require "luci.model.internet"
	local wan_speed = util.exec("status wan_speed")
	local supported_speed = internet.get_supported_speed()
	local wan_support_thousand = false

	for i, v in pairs(supported_speed) do
		if string.len(v) >= 5 then
			wan_support_thousand = true
		end
	end

	if tonumber(wan_speed) >= 1000 and wan_support_thousand == true then
		match_status = "match"
	elseif tonumber(wan_speed) == 0 then
		match_status = "match"
	else
		match_status = "mismatch"
	end
	data.match_status = match_status
	
	return data
end

function get_tmp_wan_cable_match_stat()
	local ret = {}
	local data = get_wan_cable_match_stat()
	
	ret.wan_cable_match_stat = data.match_status
	return ret
end

function get_tmp_status()
    local configtool = require "luci.sys.config"
    local nw         = require "luci.model.nwcache"
    local accountmgnt = require"luci.model.accountmgnt"
    local cloud_account = nil
    local factory = uci_r:get("quicksetup", "quicksetup", "to_show") == 'true' and "true" or "false"
    local initial_passwd = accountmgnt.is_dft_cfg()

    if uci_r:get_profile("cloud", "https_client") ~= 1 then
        cloud_account = accountmgnt.cloud_account_exist()
    end

    local ret = {}
    local nw  = nw.init()
    local net = nw:get_network("lan")
    local ifc = net and net:get_interface()

    local ipaddr    = net and net:ipaddr()
    local macaddr   = ifc:mac()
    local maskaddr  = net:netmask() or uci_r:get("network", "lan", "netmask")

    ret.conn_type   = uci_r:get("network", "wan", "wan_type") or "none"
	if ret.conn_type == "v6plus" then
		carrier = uci_r:get("network", "wan", "carrier")
		if carrier == "4" then
			--OCN
			ret.conn_type = "ocn"
		end
	end
    ret.ip_addr     = ipaddr or "0.0.0.0"
    ret.mac_addr    = macaddr
    -- ret.conn_status = get_internet_status().internet_status
    ret.hostname    = configtool.getsysinfo("product_name") or ""
    ret.product     = configtool.getsysinfo("product_name") or ""
    ret.company     = configtool.getsysinfo("FIRM") or ""
    -- ret.traffice_supported = uci_r:get("tfstats", "switch", "enable") and "on" or "off"
    ret.traffice_supported = "off"
    ret.traffice_enabled = uci_r:get("tfstats", "switch", "enable") or "off"
    ret.hardware_ver = configtool.getsysinfo("HARDVERSION")
    ret.software_ver = configtool.getsysinfo("SOFTVERSION")

    local usbmodem = require "luci.controller.admin.usbmodem"
    if usbmodem then
        usbmodem_info = usbmodem.get_status_mobile()
        --3g4g connect
        if tonumber(usbmodem_info.conn_type) == 1 then
            ret.conn_type    = "3G4G"
        end
    end

    -- default reboot_time: 60 && 20
    ret.reboot_time = uci_r:get_profile("global", "reboot_time") or "60"
    ret.wls_reboot_time = uci_r:get_profile("global", "wls_reboot_time") or "20"

    if initial_passwd then
        ret.factory_default = "2"
    elseif factory == "true" then
        ret.factory_default = "1"
    else
        ret.factory_default = "0"
    end
    if cloud_account then
        ret.login_mode = "emailandpass"
    else
        ret.login_mode = "password"
    end
	
    local sys = require "luci.sys"
    local def_mac = sys.exec("network_get_firm wan")
    local util = require "luci.util"
    def_mac = util.trim(def_mac)
	
    ret.def_mac = def_mac

	local support_160MHz_optimization = uci_r:get_profile("wireless", "support_160MHz_optimization")  or "no"
	if support_160MHz_optimization == "yes" then
		ret.is_ce_model = uci_r:get("profile", "profile_diff", "is_ce_model") or "no"
	end
    
    return ret
end

--[[local function get_connect_status()
    local register 
    local connect_status = {"","","",""}
    register = util.exec("et robord 0x01 0x00")
    register = nixio.bit.rshift(register, 1)
    for i,v in ipairs(connect_status) do
        --dbg("1status = %s, register = %s, band = %d" % {connect_status[i], register, nixio.bit.band(register, 1)})
        connect_status[i] = nixio.bit.band(register, 1) == 1 and "connected" or "unconnected"
        register = nixio.bit.rshift(register, 1)
    end
    return connect_status
end]]--

function split(srcString, dlmString)
    local startIndex = 1
    local splitIndex = 1
    local splitArray = {}
    while true do
        local endIndex = string.find(srcString, dlmString, startIndex)
        if not endIndex then
            splitArray[splitIndex] = string.sub(srcString, startIndex, string.len(srcString))
            break
        end
        splitArray[splitIndex] = string.sub(srcString, startIndex, endIndex-1)
        startIndex = endIndex + string.len(dlmString)
        splitIndex = splitIndex + 1
    end
    return splitArray
end

function get_connect_status()
    local string = util.exec("status lan_status")
    local connect_status = split(string, " ")
    return connect_status
end

function get_speed() 
    local tx_prep = {}
    local rx_prep = {}
    local tx_next = {}
    local rx_next = {}
    local speed   = {}
    local page = {"0x21", "0x22", "0x23", "0x24"}
    for i,v in ipairs(page) do
        tx_prep[i] = util.exec("et robord %s 0x0 4" %v)
        rx_prep[i] = util.exec("et robord %s 0x50 4" %v)
    end
    nixio.nanosleep(1, 0)
    for i,v in ipairs(page) do
        tx_next[i] = util.exec("et robord %s 0x0 4" %v)
        rx_next[i] = util.exec("et robord %s 0x50 4" %v)
    end

    for i,v in ipairs(page) do
        local tx = tx_next[i] - tx_prep[i] 
        local rx = rx_next[i] - rx_prep[i]
        speed[i] = 8 * tonumber(tx + rx)   
        if speed[i] == 0 then
            speed[i] = ""
        else
            if speed[i] > 1048576 then
                speed[i] = speed[i]/1048576
                speed[i] = (speed[i] - speed[i]%0.1) .. "Mbps"
            else
                speed[i] = speed[i]/1024
                speed[i] = (speed[i] - speed[i]%0.1) .. "Kbps"
            end
        end
    end
    return speed
end

function get_negotiation_speed()
    local speed_info = util.exec("status speed")
    local speed = split(speed_info, " ")
    return speed
end

function get_negotiation_duplex()
    local duplex_info = util.exec("status duplex")
    local duplex = split(duplex_info, " ")
    return duplex
end

function get_lan_status(http_form, phy_state)
    local status = get_connect_status()
    local speed  = get_negotiation_speed()
    local duplex  = get_negotiation_duplex()

    local mode = uci_r:get("sysmode", "sysmode", "mode")
    local wan_condition
    if mode == "ap" then
        wan_condition = util.exec("status wan_status")
        if wan_condition == "unconnected"
        then
            wan_condition = "disconnected"
        end
        dbg.print(wan_condition)
    else
        wan_condition = get_internet_status(http_form, phy_state).internet_status
    end

	local data = {}
    local wan = {}

    local dup_lanwan_enable = uci_r:get_profile("switch", "dup_lanwan_enable") or "no"
    if "no" == dup_lanwan_enable then
        wan = {wan_status = wan_condition, wan_speed = tonumber(speed[1]), wan_duplex = duplex[1] == "NONE" and "" or duplex[1]}
        data[1] = wan
        for i=1, #status do
            local tmp_lan_status = {}
            tmp_lan_status["lan" .. i .. "_status"] = status[i]
            if tonumber(speed[i+1]) == 0
            then
                tmp_lan_status["lan" .. i .. "_speed"] = ""
            else
                tmp_lan_status["lan" .. i .. "_speed"] = tonumber(speed[i+1])
            end
            if duplex[i+1] == "NONE"
            then
                tmp_lan_status["lan" .. i .. "_duplex"] = ""
            else
                tmp_lan_status["lan" .. i .. "_duplex"] = duplex[i+1]
            end
            data[i+1] = tmp_lan_status
        end
    else 
        local wan_port = uci_r:get("switch", "wan", "switch_port")
        if wan_port == "wanlan4" then
            data[1] = {wan1_status = wan_condition, wan1_speed = tonumber(speed[1]), wan1_duplex = duplex[1] == "NONE" and "" or duplex[1]}
            data[2] = {wan2_status = status[4], wan2_speed = tonumber(speed[5]) == 0 and "" or tonumber(speed[5]), wan2_duplex = duplex[5] == "NONE" and "" or duplex[5]}
        elseif wan_port == "lan4wan" then
            data[1] = {wan1_status = status[4], wan1_speed = tonumber(speed[5]) == 0 and "" or tonumber(speed[5]), wan1_duplex = duplex[5] == "NONE" and "" or duplex[5]}
            data[2] = {wan2_status = wan_condition, wan2_speed = tonumber(speed[1]), wan2_duplex = duplex[1] == "NONE" and "" or duplex[1]}
        else
            return false, "unsupported wan port in lanwan multiplexing"
        end
        for i=1, (#status - 1) do
            local tmp_lan_status = {}
            tmp_lan_status["lan" .. i .. "_status"] = status[i]
            if tonumber(speed[i+1]) == 0
            then
                tmp_lan_status["lan" .. i .. "_speed"] = ""
            else
                tmp_lan_status["lan" .. i .. "_speed"] = tonumber(speed[i+1])
            end
            if duplex[i+1] == "NONE"
            then
                tmp_lan_status["lan" .. i .. "_duplex"] = ""
            else
                tmp_lan_status["lan" .. i .. "_duplex"] = duplex[i+1]
            end
            data[i+2] = tmp_lan_status
        end
    end

    return data
end

function average(...)
    result = 0
    local arg = {...}
    
    for i, v in ipairs(arg) do
        result = result + v
    end

    result = result/#arg
    result = result - result % 1

    return result
end

--Get the cached iwinfo lib.
local function get_iwinfo()
    if not wifi_info then
        local stat, iwinfo = pcall(require, "iwinfo")
        wifi_info = iwinfo
    end
    return wifi_info
end

function get_dev_status(http_form)
    local clist = require("luci.model.client_mgmt").get_client_list()
    local client = nil
    local status = {}
    local mac = http_form["mac"]
    local type = http_form["type"]
    local intf
    local iwinfo  = get_iwinfo()
    if clist then
        for _, c in ipairs(clist) do
            if c.mac == mac then
                client = c
            end
        end
    end

    if type == "wireless" and client then
        if client.wire_type == "2.4G" then
            intf = wlan.Apcfg():wireless_get_interface("2g", client.guest)
        else
            intf = wlan.Apcfg():wireless_get_interface(client.wire_type, client.guest)
        end

        --since IPF platform support iwinfo on all chip solution(BCM,QCA,INTEL,MTK), use iwinfo to get wireless client status may more convenient
        if intf ~= "" then
            local iftype = iwinfo.type(intf)
            local iw = iftype and iwinfo[iftype]

            if iw then
                for sta_mac, sta_info in pairs(iw.assoclist(intf) or {}) do
                    if sta_mac:gsub(':', '-') == mac then
                        status.access_time = sta_info.inactive / 1000
                        status.rx_rate = sta_info.rx_rate
                        status.tx_rate = sta_info.tx_rate

                        status.signal = client.wire_type .. "(" .. sta_info.signal .. " " .. "dbm" .. ")"
                        status.oui =  get_oui(mac)
                        status.macaddr = mac
                    end
                end
            end
        end
    elseif type == "wired" then
        status.oui =  get_oui(mac) 
        status.macaddr = mac
    end
    return status
end

local SPEED_TEST_MAX_HISTORY_ITEM = 100

-- get historylist max count
function get_max_histroy_item()
    return { ["max_rules"] = uci_r:get_profile("speedtest", "max_history_item") or SPEED_TEST_MAX_HISTORY_ITEM }
end

-- check historylist not exceed the max # limit
function historylist_max_check()
    local max = get_max_histroy_item()
    local cur = form:count("speed_test", "record")
    
    if cur >= max.max_rules then
        return false
    end
    
    return true
end

--- for speed-test auto start when first connetion to internet.
-- @param empty table "{}" or nil
-- @return speed test start time if success to start speedtest, otherwise 0 for another speedtest
--         is runnig or -1 for a speedtest data in config, no need to run again.
function auto_test_speed(http_form)
    local res = {}
    local spt_i = speedts.SPEED_TEST_INST()
    local start_time = spt_i:auto_start_spt()    
    --dbg("SpeedTest AUTO start time: " .. start_time)
    
    -- for speed test do not use lua api.
    if start_time > 0 then
        os.exit(1)
    elseif start_time < 0 then
        os.exit(2)
    else
        os.exit(0)
    end

    -- if lua api is not used in speedtest.c, exit code is required and we will never get here.
    return start_time
end

function start_speedtest()
    local res = {}

    local spt_i = speedts.SPEED_TEST_INST()
    local start_time = spt_i:start_spt()
    dbg.print("SpeedTest start time: " .. start_time)

    return res
end

function stop_speedtest()
    local res = {}

    local spt_i = speedts.SPEED_TEST_INST()
    local stop_flag = spt_i:stop_spt()
    dbg("SpeedTest stop " .. (stop_flag and "OK." or "Failed: No speed-test instance."))

    return res
end

function get_speedtest_info()
    local res = {}
	
    -- "down_test/up_test/idle" 
    local spt_i = speedts.SPEED_TEST_INST()
    res = spt_i:get_spt_result()
	
    return res
end

function get_lastest_speedtest_info()
    local res = {}

    -- "down_test/up_test/idle" 
    local spt_i = speedts.SPEED_TEST_INST()
    res = spt_i:get_latest_spt_result()
    
    return res
end

function tmp_get_wanlan_reuse_status()
    local wan_status = uci_r:get("switch", "wan", "switch_port")
    local lan_status = get_connect_status()
    local dup_lanwan_enable = uci_r:get_profile("switch", "dup_lanwan_enable") or "no"
    local ret = {}

    if "no" == dup_lanwan_enable then
        return {port_2500G_connect = 1, port_1000G_connect = 1}
    end

    if not _ubus then
        _ubus = ubus.connect()
    end

    local link
    if _ubus then
        local wan = _ubus:call("network.interface.wan", "status", {})
        if wan then
            local ifname = wan.device
            if ifname == "br-wan" then
                -- Get real wan ifname
                ifname = get_real_wan_ifname()
            end
            wan = _ubus:call("network.device", "status", {name = ifname})
            if wan then
                link = wan.link
            end
        end
    end


    if wan_status == "wanlan4" then
        if lan_status[4] == "connected" then
            ret.port_1000G_connect = 0
        else
            ret.port_1000G_connect = 1
        end
        if link then
            ret.port_2500G_connect = 0
        else
            ret.port_2500G_connect = 1
        end
    end

    if wan_status == "lan4wan" then
        if lan_status[4] == "connected" then
            ret.port_2500G_connect = 0
        else
            ret.port_2500G_connect = 1
        end
        if link then
            ret.port_1000G_connect = 0
        else
            ret.port_1000G_connect = 1
        end
    end

    return ret
end
--- for speed-test history list get.
-- @param http_form: not care
-- @return history list, max # SPEED_TEST_MAX_HISTORY_ITEM(100), maybe {}.
local function get_speedtest_history()
	local history_list = {}
	
    local spt_i = speedts.SPEED_TEST_INST()
    history_list = spt_i:get_spt_history()
	
    return history_list
end

local function clear_speedtest_history(http_form)
	local res = {}
    local spt_i = speedts.SPEED_TEST_INST()
    spt_i:clear_spt_history()

    return res
end

local function get_internet_realspeed()
    local res = {}
	local qos = iqos.QOS_INST()
	
	res.up_speed, res.down_speed = qos:get_wanspeed_by_tm()
    res.test_time = os.time()
	
    return res
end

local dsp =  {
        controller = controller_url .. ".status",
        target = "dispatch",
        forms = {"access_devices_wired", "access_devices_wireless_host", "access_devices_wireless_guest"}
}
    
local function filter_client_status(raw_data)
	uci_r:foreach("client_mgmt", "alias",
				function(section)
					local mac = section[".name"]
					mac = mac:gsub("_", "-"):upper()
					for i,v in pairs(raw_data) do
					    for m,n in ipairs(v) do
					        if mac == n.macaddr then
						        n.hostname = uci_r:get("client_mgmt", section[".name"], "hostname")
					        end
					    end
					end
				end
			)
	return raw_data
end

local function get_wan_dual_nat_status()
    local net = require "luci.controller.admin.network"
    local nw  = require "luci.model.nwcache"
    local sys = require "luci.sys"
    local ctypes = require "luci.model.checktypes"
    local dual_nat
    local conntypev4
    local internet
    local ipaddr
	
    local nw = nw.init()
    conntypev4 = net.get_ipv4_conntype()
    if ctypes.check_3p(conntypev4) then
        internet = nw:get_network("internet") or nil
    else
        internet = nw:get_network("wan") or nil
    end
	
    ipaddr  = internet and internet:ipaddr() or "0.0.0.0"

    -- only "US" type have to do dual nat detect.
    local country = string.gsub(sys.exec("getfirm COUNTRY"), "\n", "")
    if (country ~= "US") then
        dual_nat = ""
    else
        -- private address, "10.0.0.0/8" or "172.16.0.0 - 172.31.255.255" or "192.168.0.0/16"
        if string.sub(ipaddr, 1, 3) == "10." then
            dual_nat = "1"
        elseif string.sub(ipaddr, 1, 4) == "172." and string.sub(ipaddr, 7, 7) == "."then
            local tmp = tonumber(string.sub(ipaddr, 5, 6))
            if tmp >= 16 and  tmp <= 31 then
                dual_nat = "1"
            end
        elseif string.sub(ipaddr, 1, 8) == "192.168." then
            dual_nat = "1"
        else
            dual_nat = ""
        end
    end

    return {wan_dual_nat = dual_nat}
end

function get_tmp_dual_nat_status()
    local ret = {} 
    local data = get_wan_dual_nat_status()
	
    if data.wan_dual_nat == "1" then
        ret.is_dual_nat_detect = "yes"
    else
        ret.is_dual_nat_detect = "no"
    end

    return ret
end

local function get_client_status(http_form)
    local data = {}
    local raw_data = {}
    local success = true
    local target = dsp.controller and require(dsp.controller)[dsp.target]
    
    http_form = {operation = "read"}
    http_form["form"] = dsp.forms
    local ret = target(http_form)
    if ret.success then
        assert(#ret.data == 0)
        util.update(raw_data, ret.data)
    else
        success = false
    end
    
    data = filter_client_status(raw_data)

    return success and data
end

-- General controller routines

local dispatch_tbl = {
    all = {
        [".super"] = {cb = get_all}
    },
    client_status = {
        [".super"] = {cb = get_client_status}
    },
    perf = {
        [".super"] = {cb = get_perf}
    },
    access_devices_all = {
        [".super"] = {cb = get_access_devices_all}
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
    wan_dual_nat_state = {
        ["read"] = {cb = get_wan_dual_nat_status}
    },
    wan_cable_match_stat = {
        ["read_match"] = {cb = get_wan_cable_match_stat}
    },
    tmp_status = {
        ["read"] = {cb = get_tmp_status},
        ["conn_status"] = {cb = get_tmp_conn_status},
        ["wan_cable_match_stat"] = {cb = get_tmp_wan_cable_match_stat},
	    ["dual_nat_status"] = {cb = get_tmp_dual_nat_status}
    },
    router = {
        ["read"] = {cb = get_lan_status, args = "true"}
    },
    oui = {
        ["read"] = {cb = get_dev_status}
    },
    wan_speed = {
        [".super"] = {cb = get_internet_realspeed}
    },
    speedtest = {
        ["read"] = {cb = get_speedtest_info},
        ["start"] = {cb = start_speedtest},
        ["stop"] = {cb = stop_speedtest},
        ["get"] = {cb = get_speedtest_history},
        ["clear"] = {cb = clear_speedtest_history}
    },
    tmp_wanlan_reuse_status = {
        ["read"] = {cb = tmp_get_wanlan_reuse_status}
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
