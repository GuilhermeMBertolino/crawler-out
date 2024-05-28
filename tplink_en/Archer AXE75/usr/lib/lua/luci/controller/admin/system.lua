--[[
Copyright(c) 2008-2014 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  system.lua
Details :  Controller for various system-wide functions
Author  :  Ye Qianchuan <yeqianchuan@tp-link.net>
Version :  1.0.0
Date    :  19 Jun, 2014
]]--

local dbg = require "luci.tools.debug"
local sys = require "luci.sys"
local wireless = require "luci.controller.admin.wireless"
local fs        = require "luci.fs"
local cry       = require "luci.model.crypto"
local configtool = require "luci.sys.config"
module("luci.controller.admin.system", package.seeall)

local ctl = require "luci.model.controller"
local uci = require "luci.model.uci"
local uci_r = uci.cursor()

local logm  = require "luci.model.log"

--syslog define
local PROJ_LOG_ID_REMOTE_MN=282
--MSG(REMOTE_MN_LOGOUT, 56, INF, "remote client ip %1 log out.")
local REMOTE_MN_LOGOUT=56

local ROUTER_CFG_1 = {
	{MODULE = "administration",		SECTION = "remote",		PARAM = "enable",				TYPE="reverse"},
	{MODULE = "nat",				SECTION = "nat_global",	PARAM = "enable",				TYPE="reverse"},
	{MODULE = "nat",				SECTION = "nat_global",	PARAM = "hw_enable",			TYPE="reverse"},
	{MODULE = "pptpd",				SECTION = "pptpd",		PARAM = "enabled",				TYPE="reverse"},
	{MODULE = "tfstats",			SECTION = "switch",		PARAM = "enable",				TYPE="reverse"},
	{MODULE = "openvpn",			SECTION = "server",		PARAM = "enabled",				TYPE="reverse"},
	{MODULE = "iptv",				SECTION = "iptv",		PARAM = "enable",	TYPE="reverse"},
	{MODULE = "offline_download",	SECTION = "aria2",		PARAM = "enable",				TYPE="reverse"},
        {MODULE = "switch",            SECTION = "lan_agg",      PARAM = "enable_agg",				TYPE="reverse"},
        {MODULE = "switch",            SECTION = "addl_wan",     PARAM = "addl_wan_enable",				TYPE="reverse"},
        {MODULE = "access_control",    SECTION = "settings",     PARAM = "enable",				TYPE="reverse"},
	{MODULE = "network",			SECTION = "lan",		PARAM = "ipaddr",				TYPE="backup"},
	{MODULE = "network",			SECTION = "lan",		PARAM = "netmask",				TYPE="backup"},
	{MODULE = "network",			SECTION = "lan",		PARAM = "ifname",				TYPE="backup"},
	{MODULE = "network",			SECTION = "wan",		PARAM = "proto",				TYPE="backup"},
	{MODULE = "network",			SECTION = "wan",		PARAM = "ifname",				TYPE="backup"},
	{MODULE = "network",			SECTION = "wan",		PARAM = "ipaddr",				TYPE="backup"},
	{MODULE = "network",			SECTION = "wan",		PARAM = "mtu",				TYPE="backup"},
	{MODULE = "network",			SECTION = "wan",		PARAM = "netmask",				TYPE="backup"},
	{MODULE = "network",			SECTION = "wan",		PARAM = "conn_mode",				TYPE="backup"},
	{MODULE = "network",			SECTION = "wan",		PARAM = "connectable",				TYPE="backup"},
	{MODULE = "network",			SECTION = "wan",		PARAM = "auto",				TYPE="backup"},
	{MODULE = "network",			SECTION = "wan",		PARAM = "dns",				TYPE="backup"},
	{MODULE = "network",			SECTION = "wan",		PARAM = "keepup",				TYPE="backup"},
	{MODULE = "network",			SECTION = "wan",		PARAM = "gateway",				TYPE="backup"},
	{MODULE = "network",			SECTION = "wan",		PARAM = "macaddr",				TYPE="backup"},
	{MODULE = "network",			SECTION = "wan",		PARAM = "wan_type",				TYPE="backup"},
	{MODULE = "dhcp",				SECTION = "lan",		PARAM = "dhcp_option",			TYPE="backup"},
	{MODULE = "dhcp",				SECTION = "lan",		PARAM = "ignore",				TYPE="backup"},
	{MODULE = "network",				SECTION = "wan",		PARAM = "type",				TYPE="backup"},
	{MODULE = "iptv",				SECTION = "iptv",		PARAM = "igmp_snooping_enable",	TYPE="backup"}
}

local ROUTER_CFG = {
	{MODULE = "administration",		SECTION = "remote",		PARAM = "enable",				TYPE="reverse"},
	{MODULE = "nat",				SECTION = "nat_global",	PARAM = "enable",				TYPE="reverse"},
	{MODULE = "nat",				SECTION = "nat_global",	PARAM = "hw_enable",			TYPE="reverse"},
	{MODULE = "pptpd",				SECTION = "pptpd",		PARAM = "enabled",				TYPE="reverse"},
	{MODULE = "tfstats",			SECTION = "switch",		PARAM = "enable",				TYPE="reverse"},
	{MODULE = "openvpn",			SECTION = "server",		PARAM = "enabled",				TYPE="reverse"},
	{MODULE = "iptv",				SECTION = "iptv",		PARAM = "enable",	TYPE="reverse"},
	{MODULE = "offline_download",	SECTION = "aria2",		PARAM = "enable",				TYPE="reverse"},
        {MODULE = "switch",            SECTION = "lan_agg",      PARAM = "enable_agg",				TYPE="reverse"},
        {MODULE = "switch",            SECTION = "addl_wan",     PARAM = "addl_wan_enable",				TYPE="reverse"},
        {MODULE = "access_control",    SECTION = "settings",     PARAM = "enable",				TYPE="reverse"},
	{MODULE = "network",			SECTION = "lan",		PARAM = "ipaddr",				TYPE="backup"},
	{MODULE = "network",			SECTION = "lan",		PARAM = "netmask",				TYPE="backup"},
	{MODULE = "network",			SECTION = "lan",		PARAM = "ifname",				TYPE="backup"},
	{MODULE = "network",			SECTION = "wan",		PARAM = "proto",				TYPE="backup"},
	{MODULE = "dhcp",				SECTION = "lan",		PARAM = "dhcp_option",			TYPE="backup"},
	{MODULE = "dhcp",				SECTION = "lan",		PARAM = "ignore",				TYPE="backup"},
	{MODULE = "network",				SECTION = "wan",		PARAM = "type",				TYPE="backup"},
	{MODULE = "iptv",				SECTION = "iptv",		PARAM = "igmp_snooping_enable",	TYPE="backup"}
}

local AP_CFG = {
	{MODULE = "network",		SECTION = "lan",		PARAM = "ipaddr",		TYPE="backup", DFT="192.168.0.254"},
	{MODULE = "network",		SECTION = "lan",		PARAM = "netmask",		TYPE="backup", DFT="255.255.255.0"},
	{MODULE = "network",		SECTION = "lan",		PARAM = "gateway",		TYPE="backup"},
	{MODULE = "network",		SECTION = "lan",		PARAM = "ifname",		TYPE="backup", DFT="eth1 eth2 eth3 eth4 eth5 eth0"},
	{MODULE = "network",		SECTION = "wan",		PARAM = "proto",		TYPE="backup", DFT="dhcp"},
	{MODULE = "dhcp",			SECTION = "lan",		PARAM = "dhcp_option",	TYPE="backup"},
	{MODULE = "dhcp",			SECTION = "lan",		PARAM = "ignore",		TYPE="backup", DFT="2"},
	{MODULE = "network",		SECTION = "wan",		PARAM = "type",			TYPE="backup", DFT=""},
	{MODULE = "iptv",			SECTION = "iptv",		PARAM = "igmp_snooping_enable",	TYPE="backup", DFT="off"}
}

function kickoff_web()
    local sess = sys.exec("basename /tmp/luci-sessions/*")
    if sess ~= "*\n" then
	sess = string.sub(sess,1,-2)
	local sauth = require "luci.sauth"
        sauth.kill(sess)
    end
end

function logout()
    local sess = require("luci.dispatcher").context.authsession
    local ctypes = require "luci.model.checktypes"
    local log  = logm.Log(PROJ_LOG_ID_REMOTE_MN)
    local ipaddr = sys.getenv("REMOTE_ADDR")

    if not ctypes.check_ip_in_lan(ipaddr) then
    	log(REMOTE_MN_LOGOUT, ipaddr)
    end

    if sess then
        local sauth = require "luci.sauth"
        sauth.kill(sess)
    end
    return true
end

function reboot()
    local sys = require "luci.sys"
    local data = { reboot_time = 75 }

    --get reboot time from profile
    data.reboot_time = uci.cursor():get_profile("global", "reboot_time") or 75

    --add for cloud client for closing ss

    if nixio.fs.access("/etc/config/history_list") then
        uci_r:commit("history_list")
    end
    do_sync()
    sys.fork_exec("sleep 2; reboot")
    return data
end

function do_sync()
    sys.fork_call("sync")
    return true
end

-- >>> sysmode begin

function get_sysmode(mode)
	local data = {}
	
	if nil == uci_r:get("sysmode", "sysmode", "support") then
		data["support"] = "no"
		data["mode"] = "router"
	else
		data["support"] = uci_r:get("sysmode", "sysmode", "support")
		mode    = uci_r:get("sysmode", "sysmode", "mode")
		if nil ~= mode then
			data["mode"] = mode
		else
			data["mode"] = "router"
		end
	end

	return data
end

function set_sysmode_old(http_form)
    local new_mode = http_form.mode
	
	if new_mode ~= "router" and new_mode ~= "ap" and new_mode ~= "repeater" then
		return false
	else
			--luci.sys.call("/sbin/sysmode")
		dbg("---------set sysmode old:start-----------")
		if not uci_r:commit_without_write_flash("sysmode") then
			return false
		else
			--luci.sys.call("/sbin/sysmode")
			mode = get_sysmode(new_mode).mode
			dbg("---------set sysmode old:change config old-----------")
            change_config_old(mode)
            return get_sysmode(new_mode)
		end

		--else
		    --return get_sysmode()
		--end
	end
end
			
function set_sysmode(http_form)
    local new_mode = http_form.mode
    local data = {}
	
	if new_mode ~= "router" and new_mode ~= "ap" and new_mode ~= "repeater" then
		return false
	else
			--luci.sys.call("/sbin/sysmode")
	
        change_config(new_mode)
        data["support"] = uci_r:get("sysmode", "sysmode", "support")
        data["mode"] = new_mode
        return data

		--else
		    --return get_sysmode()
		--end
	end
end

function sysmode(http_form)
	local operation = http_form.operation
	
	if operation == "write" then
	    return set_sysmode(http_form)
    elseif operation == "read" then 
	    return get_sysmode()
	else
	    return false
	end
end

-- <<< sysmode end

function get_globalpara()
	local data = {}
	
	local usb_support = uci_r:get_profile("usb", "usb_support") or "yes"
	data["usb_support"] = usb_support
	-- data["other_support"] = other_support

	return data
end

function globalpara(http_form)
	local operation = http_form.operation
	
	if operation == "read" then 
	    return get_globalpara()
	else
	    return false
	end
end

function check_support()
	local uci_r = require("luci.model.uci").cursor()
	return { ["cloud_support"] = uci_r:get_profile("cloud", "cloud_support") or "no" }
end

-- <<< Change ip between AP and Router
function change_IP_old(http_form)
	local sysmode = http_form.mode
	local new_ip
	local type_msp = uci_r:get_profile("sysmode","type_msp") or 0
	local router_cfg = {}
	
	if type_msp == 1 then
		router_cfg = ROUTER_CFG_1
	else
		router_cfg = ROUTER_CFG
	end
	
	if sysmode == 'ap' then
		-- recover AP's IP info
		for _,v in pairs(AP_CFG) do
			local cfg_name 
			if type_msp == 1 then
				cfg_name = v.MODULE .. "_" .. v.SECTION .. "_" .. v.PARAM
			else
				cfg_name = v.MODULE .. "_" .. v.PARAM
			end
			local value = uci_r:get("sysmode", "ap", cfg_name)
			if value ~= nil then
				uci_r:set(v.MODULE, v.SECTION, v.PARAM, value)
				uci_r:commit_without_write_flash(v.MODULE)
			elseif v.DFT ~= nil then
				uci_r:set(v.MODULE, v.SECTION, v.PARAM, v.DFT)
				uci_r:commit_without_write_flash(v.MODULE)
			end
		end
		new_ip = uci_r:get("sysmode", "ap", "network_ipaddr") or uci_r:get("network", "lan", "ipaddr")
	elseif sysmode == 'router' then
		if type_msp == 1 then
			uci_r:section("network", "interface", "wan")
		end
		for _,v in pairs(router_cfg) do
			local cfg_name,value
			if v.TYPE == "backup" then
				if type_msp == 1 then
					cfg_name = v.MODULE .. "_" .. v.SECTION .. "_" .. v.PARAM
				else
				cfg_name = v.MODULE .. "_" .. v.PARAM
				end
				value = uci_r:get("sysmode", "router", cfg_name)
				if value ~= nil then
					uci_r:set(v.MODULE, v.SECTION, v.PARAM, value)
					uci_r:commit_without_write_flash(v.MODULE)
				end
			end
		end
		uci_r:delete("network", "lan", "gateway")
		uci_r:delete("network", "lan", "dns")
		uci_r:commit_without_write_flash("network")
		new_ip = uci_r:get("sysmode", "router", "network_ipaddr")
	end
	uci_r:commit("network")

	if new_ip ~= nil then
		local dhcps = require "luci.controller.admin.dhcps"
		local change_ip_pool = true
		dhcps.dhcp_opt_update(new_ip, change_ip_pool)
	end

    do_sync()
	--luci.sys.fork_call("sleep 1;reboot")
	return true
end
-- <<< change ip end

-- <<< Change UCI config between AP and Router
function change_config_old(sysmode)
	local type_msp = uci_r:get_profile("sysmode","type_msp") or 0
	local router_cfg = {}
	
	if type_msp == 1 then
		router_cfg = ROUTER_CFG_1
	else
		router_cfg = ROUTER_CFG
	end
    -- switch to AP, backup Router's IP info & disable some func
    if sysmode == 'ap' then
        for _,v in pairs(router_cfg) do
			local value = uci_r:get(v.MODULE, v.SECTION, v.PARAM)
			if value ~= nil then
				if v.TYPE == "reverse" then
					local cfg_name = v.MODULE .. "_" .. v.SECTION
					uci_r:set("sysmode", "router", cfg_name, value)
					if value == 'on' or value == 'off' then
						uci_r:set(v.MODULE, v.SECTION, v.PARAM, "off")
					else
						uci_r:set(v.MODULE, v.SECTION, v.PARAM, 0)
					end
					uci_r:commit_without_write_flash(v.MODULE)
				else
					local cfg_name 
					if type_msp == 1 then
						cfg_name = v.MODULE .. "_" .. v.SECTION .. "_" .. v.PARAM
					else
						cfg_name = v.MODULE .. "_" .. v.PARAM
					end
					uci_r:set("sysmode", "router", cfg_name, value)
				end
			end
		end
		uci_r:commit_without_write_flash("sysmode")
		if type_msp == 1 then
			uci_r:delete("network", "wan")
			uci_r:commit_without_write_flash("network")
		end
		
        
        local form = {}
        form.form = "guest"
        form.operation = "read"
        local data = wireless.wireless_predefined_forms(form, true)
        uci_r:set("sysmode", "router", "access", data.access)
        uci_r:set("sysmode", "router", "isolate", data.isolate)
		form.operation = "write"
		form.isolate = "off"
		form.access = "on"
		wireless.wireless_predefined_forms(form, true)
		
		uci_r:commit_without_write_flash("sysmode")
    end

	-- switch to Router, backup AP's IP info & recover some func
    if sysmode == 'router' then
		local lan_type = uci_r:get("network", "lan", "lan_type") or ""
		local dhcp_status = uci_r:get("dhcp", "lan", "ignore") or ""
		for _,v in pairs(AP_CFG) do
			local value = uci_r:get(v.MODULE, v.SECTION, v.PARAM)
			if value ~= nil then
				if (v.PARAM ~= "ipaddr" and v.PARAM ~= "netmask" and v.PARAM ~= "gateway" and v.PARAM ~= "dhcp_option")
					 or (dhcp_status == "0" and v.PARAM == "dhcp_option")
					 or (lan_type == "static" and (v.PARAM == "ipaddr" or v.PARAM == "netmask" or v.PARAM == "gateway"))
				then
					local cfg_name 
					if type_msp == 1 then
						cfg_name = v.MODULE .. "_" .. v.SECTION .. "_" .. v.PARAM
					else
						cfg_name = v.MODULE .. "_" .. v.PARAM
					end
					uci_r:set("sysmode", "ap", cfg_name, value)
				end
			end
		end
		uci_r:commit_without_write_flash("sysmode")

        for _,v in pairs(router_cfg) do
			local cfg_name,value
			if v.TYPE == "reverse" then
				cfg_name = v.MODULE .. "_" .. v.SECTION
				value = uci_r:get("sysmode", "router", cfg_name)
				if value ~= nil then
					uci_r:set(v.MODULE, v.SECTION, v.PARAM, value)
					uci_r:commit_without_write_flash(v.MODULE)
				end
			end
        end

        local form = {}
        form.form = "guest"
        form.operation = "write"
        form.isolate = uci_r:get("sysmode", "router", "isolate")
        form.access = uci_r:get("sysmode", "router", "access")
		wireless.wireless_predefined_forms(form, true)
    end        

    return true
end
-- <<< change UCI config end

function quicksetup_reset()
    local quicksetup_show = uci_r:get("quicksetup", "quicksetup", "to_show") or "false"
    if quicksetup_show == 'false' then
        uci_r:set("quicksetup", "quicksetup", "to_show", 'true') 
        uci_r:commit("quicksetup")
    end
end

function change_config(sysmode)
	
	quicksetup_reset()

	if sysmode == 'ap' then
		dbg("--------------------sys is ap-----------------")
		os.execute("/sbin/switch_mode rtoa >/dev/null 2>&1")
	end
	
	if sysmode == 'router' then
		dbg("-------------------sys is router-----------------")
		os.execute("/sbin/switch_mode ator >/dev/null 2>&1")
	end
	
	return true
end
-- General controller routines

function sync_mode_files()
	dbg("------------sync mode files-----------------")
	os.execute("mkdir /tmp/newmode >/dev/null 2>&1")
	luci.sys.exec("nvrammanager -r /tmp/newmode/ori-newmode-user-config.bin -p user-config >/dev/null 2>&1")
	cry.dec_file_entry("/tmp/newmode/ori-newmode-user-config.bin", "/tmp/tmp-newmode-userconf.xml")
	luci.sys.exec("mkdir -p /tmp/newmodecfg")
	local ret = configtool.xmlToFile("/tmp/tmp-newmode-userconf.xml", "/tmp/newmodecfg")
	if false ~= ret then
		-- guest-network doesn't need sync between router and ap mode
		local uci_t = uci.cursor("/tmp/newmodecfg/config/")
		uci_r:foreach("wireless", "wifi-iface",
            function(s)
                if s['guest'] then
					local access = uci_t:get("wireless", s['.name'], "access")
					if nil ~= access then
						uci_r:set("wireless", s['.name'], "access", access)
					end
				end
            end)
		uci_r:commit_without_write_flash("wireless")
	end
	local sysmode = uci_r:get("sysmode", "sysmode", "mode")
	if sysmode == 'router' then
		uci_r:set("administration", "remote", "enable", "off")
		uci_r:commit_without_write_flash("administration")
	end
	local sync_files = {"accountmgnt","wireless","system","locale","usbshare","administration","cloud_config","systime","history_list"}
	for _, f in ipairs(sync_files) do 
		dbg("------------cp files-----------------" .. f)
		luci.sys.exec("cp -f /etc/config/" .. f .. "   /tmp/newmodecfg/config/")
	end
	-- recreate xml config files
	luci.sys.exec("rm -f /tmp/newmode/ori-newmode-user-config.bin;rm -f /tmp/tmp-newmode-userconf.xml")
	configtool.convertFileToXml("/tmp/newmodecfg/config", "/tmp/tmp-newmode-userconf.xml")
	cry.enc_file_entry("/tmp/tmp-newmode-userconf.xml", "/tmp/newmode/ori-newmode-user-config.bin")
	
	luci.sys.exec("nvrammanager -w /tmp/newmode/ori-newmode-user-config.bin -p user-config >/dev/null 2>&1")
	
	luci.sys.exec("rm -rf /tmp/newmodecfg;rm -f /tmp/tmp-newmode-userconf.xml;rm -rf /tmp/newmode")
	dbg("-------------sync mode files end----------------")
end

function switch_mode_oldway()
	local data = get_sysmode()
	if data.mode == 'ap' then
		dbg("---------mode is ap-----------")
		data.mode = "router"
	elseif data.mode == 'router' then
		dbg("---------mode is router-----------")
		data.mode = "ap"
	end
	set_sysmode_old(data)
	change_IP_old(data)
end

local dispatch_tbl = {
    logout = {
        [".super"] = {cb = logout}
    },
    reboot = {
        [".super"] = {cb = reboot}
    },
    kickoff_web = {
	["kick"] = {cb = kickoff_web}
    },
    sync = {
        ["do"] = {cb = do_sync}
    },
    sysmode = {
        [".super"] = {cb = sysmode}
    },
    globalpara = {
        [".super"] = {cb = globalpara}
    },
    check_support = {
        ["read"] = {cb = check_support}
    }
}

function dispatch(http_form)
    return ctl.dispatch(dispatch_tbl, http_form)
end

function _index()
    return ctl._index(dispatch)
end

function index()
    entry({"admin", "system"}, call("_index")).leaf = true
end
