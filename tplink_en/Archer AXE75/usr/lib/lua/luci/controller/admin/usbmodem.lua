--[[
Copyright(c) 2015 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  usbmodem.lua
Details :  Controller for usb 3g4g
Author  :  lilangji <lilangji@tp-link.net>
Version :  1.0.0
Date    :  2 Feb, 2015
]]--


module("luci.controller.admin.usbmodem", package.seeall)

local uci = require "luci.model.uci"
local ctl = require "luci.model.controller"
local dbg = require "luci.tools.debug"
local nlog   = require "luci.model.network_log"
local json_o = require "luci.json"
local iofile     = require "io"
local bus    = require "ubus"
local sys    = require "luci.sys"
local inetm  = require "luci.model.internet"
local log = require("luci.model.log").Log(292)
local nixio  = require "nixio"

local ctypes = require "luci.model.checktypes"
--local checkcb = require "luci.model.modem_checkdata"
--local checktbl = checkcb.CHECK_MODEM_TBL
local MODEM_ID=292
local log = require("luci.model.log").Log(MODEM_ID)

local LOG_SAVE_CFG=27
local LOG_UBUS_FAIL=28
local LOG_UBUS_METHOD=29
local LOG_MODEM_SIGNAL=30
local LOG_BASIC_INFO=31

local uci_r = uci.cursor()
local internet = inetm.Internet()
local ISP_FILE_PATH="/etc/3g4g.gz"

local function field_canbe_empty(proto, field, value,flag)
	if flag == "0" then
		return proto[field] == value
	elseif flag == "1" then
		return proto[field] ~= value
	end
	return true
end
--[[
str_match:match string
str_min:the lowest length
str_max:the longset length
--]]
local function check_format(val, str_match, str_min, str_max)
	local val = tostring(val)
	if string.find(val,str_match) and string.len(val) >= str_min
       and string.len(val) <= str_max	then
		return true
	end
	return false
end

local function invalid_args(errorcode)
    errorcode = errorcode or "invalid args"
    --log(nlog.INVALID_ARGS)
    return false, errorcode
end
local function check_change_dialcfg(oldcfg,newcfg)
	if oldcfg.dial_num ~= newcfg.dial_num or 
	   oldcfg.apn ~= newcfg.apn or
	   oldcfg.username ~= newcfg.username or
	   oldcfg.password ~= newcfg.password then
	   return true
	  else
	  return false
	end
end

local CHECK_MODEM_TBL = {
    {
        field = {"locindex","ispindex"},
		--canbe_absent = {field_canbe_empty, "setisp", "manual","0"},
        check = {
            {ctypes.check_range, 0,600}
        }
    },
    {
        field = "pincode",
		canbe_empty = true,
        check = {
            --ctypes.----
			{check_format,"^[0-9]*$",4,4}
        }
    },
    {
        field = "setisp",
		canbe_empty = false,
		--canbe_absent = false,
        check = {
            {ctypes.check_in, {"auto", "select","manual"}}
        }
    },
    {
        field = "dial_num", 
		canbe_empty = true,
        check = {
            --ctypes.-----
			{check_format,"^[0-9*#]*$", 0, 63}
        }
    },
	{
        field = {"apn"},
		canbe_empty = true,
        check = {
            {ctypes.check_rangelen, 0, 63}
        }
    },
    {
        field = {"username","password"},
		canbe_empty = true,
        check = {
            {ctypes.check_rangelen, 0, 118}
        }
    },
    {
        field = "connectmode", 
		canbe_empty = false,
		--canbe_absent = false,
        check = {
            {ctypes.check_in, {"auto", "demand","manually"}}
        }
    },
    {
        field = "authentype",
        canbe_empty = false,
        check = {
            {ctypes.check_in, {"0", "1","2"}}
        }
    },
	{
        field = "maxidletime",
		canbe_empty = false,
		--canbe_absent = {field_canbe_empty, "connectmode", "auto", "0"},
        check = {
            {ctypes.check_range, 0,99}
        }
    },
    {
        field = "mtu",
		canbe_empty = false,
        check = {
            {ctypes.check_range, 576, 1492}
        }
    },
	{
        field = "manualdns",
		canbe_empty = false,
		--canbe_absent = false,
        check = {
            {ctypes.check_in, {"on", "off"}}
        }
    },
	{
        field = "primarydns",
		canbe_empty = false,
		--canbe_absent = {field_canbe_empty, "manualdns", "on", "1"},
        check = {
            ctypes.check_ipv4
        }
    },
	{
		field = "seconddns", 
		canbe_empty = true,
        check = {
            ctypes.check_ipv4
        }
	}
}
--
local USB_MODEM = { 
	["defaultvid"] = { ["value"] = "0000"},
    ["defaultpid"] = { ["value"] = "0000"},
    ["targetvid"] = { ["value"] = "0000"},
    ["targetpid"] = { ["value"] = "0000"},
    ["modeswitch"] = { ["value"] = "1"},
    ["proto"] = { ["value"] = "dhcp"},
	["cport"] = { ["value"] = "ttyUSB0"},
	["dport"] = { ["value"] = "ttyUSB0"},
    ["ifname"] = { ["value"] = "usb0"},
    ["message1"] = { ["value"] = "11111"},
    ["message2"] = { ["value"] = "22222"},
    ["message2"] = { ["value"] = "33333"},
	
    ["setisp"] = { ["value"] = "auto", ["key_show"] = true},
    ["locindex"] = { ["value"] = "0", ["key_show"] = true},
    ["ispindex"] = { ["value"] = "0", ["key_show"] = true},
    ["pinlock"] = { ["value"] = "false", ["key_show"] = true},
    ["pincode"] = { ["value"] = "", ["key_show"] = true},
    ["dial_num"] = { ["value"] = "*99#", ["key_show"] = true},
    ["apn"] = { ["value"] = "yourapn.com", ["key_show"] = true},
    ["username"] = { ["value"] = "myname", ["key_show"] = true},
    ["password"] = { ["value"] = "password", ["key_show"] = true},
    ["authentype"] = { ["value"] = "0", ["key_show"] = true},

    ["modemstatus"] = { ["value"] = "0"},
	["ispstatus"] = { ["value"] = "0"},
    ["connectmode"] = { ["value"] = "auto", ["key_show"] = true},
    ["maxidletime"] = { ["value"] = "900", ["key_show"] = true},
    ["mtu"] = { ["value"] = "1480", ["key_show"] = true},
    ["manualdns"] = { ["value"] = "false", ["key_show"] = true},
    ["primarydns"] = { ["value"] = "", ["key_show"] = true},
    ["seconddns"] = { ["value"] = "", ["key_show"] = true},
	["connectstatus"] = { ["value"] = "0"},
}

local CONN_STATUS = {
	"disconnected",
	"connected",
	"connecting",
	"disconnecting"
}
--[[
local PIN_STATUS = {
	["1"] = 0,
	["2"] = 1,
	["3"] = 1,
	["4"] = 1,
	["5"] = 1,
	["6"] = 1,
	["7"] = 1,
	["8"] = 1,
	["9"] = 1,
	[""] = 1,
	[""] = 1,
}
--]]
local function log_save(old,new)
	local old_str=""
	for k,v in pairs(old) do
		old_str = old_str .. " " .. tostring(k) .. "=" .. tostring(v)
	end
	local new_str=""
	for k,v in pairs(new) do 
		if USB_MODEM[k]["key_show"] then
			new_str = new_str .. " " .. tostring(k) .. "=" .. tostring(v)
		end
	end
	log(LOG_SAVE_CFG,old_str,new_str)	
end
local function dns_concat(...)
    local t = {}
    for _, v in ipairs{...} do
        if #v > 0 then
            t[#t + 1] = v
        end
    end
    return table.concat(t, " ")
end

--get connect status
function get_connstatus()
	local _ubus = bus.connect()		
	if not _ubus then
		log(LOG_UBUS_FAIL)
		return 0
	end
	local method = "status"
	local path = "network.interface.mobile"
	local result = _ubus:call(path, method, {})
	local connstatus = "disconnected"
	if result ~= nil and result.state ~= nil then
        connstatus = result.state
    end
	for key,val in ipairs(CONN_STATUS)
	do
		if val == connstatus then
			connstatus = key - 1
			break
		end
	end

	local modem_status = uci_r:get("modem","modemconf","modemstatus")
    if modem_status ~= "2" and connstatus == 2 then
        connstatus = 0
    end

	return connstatus
end 

--check enable to connect
function check_ableconn()
	local modemstatus = uci_r:get("modem","modemconf","modemstatus")
	local pinlock = uci_r:get("modem","modemisp","pinlock")
	--dbg("modemstatus:" .. modemstatus .. " pinlock:" .. pinlock .. " get_connstatus():" .. tostring(get_connstatus()))
	if modemstatus == "2" and (pinlock == "0" or pinlock == "4") and 0 == get_connstatus() then
		return true
	end
	return false
end
function check_ableconn_weak()
	local modemstatus = uci_r:get("modem","modemconf","modemstatus")
	local pinlock = uci_r:get("modem","modemisp","pinlock")
	--dbg("modemstatus:" .. modemstatus .. " pinlock:" .. pinlock)
	if modemstatus == "2" and (pinlock == "0" or pinlock == "4") then
		return true
	end
	return false
end

-- get modem config 
function get_modemcfg()
	--get new connstatus
	local connstatus = get_connstatus()
	--uci_r:set("modem", "modemconf", "connectstatus", connstatus)
	--uci_r:commit("modem")
	--[[
	local dns_manual = uci_r:get("modem", "modemconf", "manualdns")
	if dns_manual == "off" and connstatus == 1 then
		local nw = require "luci.model.nwcache"
		local dnsaddrs = {}
		local _ubus = bus.connect()		
		if not _ubus then
			log(LOG_UBUS_FAIL)
		else
			nw = nw.init()
			local interface = "mobile"
			local net = nw:get_network(interface) or nil
			dnsaddrs = net and net:dnsaddrs() or {}
		end
		local modem_pridns = dnsaddrs[1] or "0.0.0.0"
		local modem_snddns = dnsaddrs[2] or "0.0.0.0"	
		uci_r:set("modem", "modemconf", "primarydns", modem_pridns)
		uci_r:set("modem", "modemconf", "seconddns", modem_snddns)
		uci_r:commit("modem")
	end
	--]]
	local data = {}
	local data_tmp = {}
	--get config from modem
	uci_r:foreach("modem","usbmodemisp",
		function(section)
			data_tmp = uci_r:get_all("modem",section[".name"])
			for key,value in pairs(data_tmp) do	
				if USB_MODEM[key] then
					data[key] = value
				end
			end
		end
	)
	uci_r:foreach("modem","usbmodeminfo",
		function(section)
			data_tmp = uci_r:get_all("modem",section[".name"])
			for key,value in pairs(data_tmp) do	
				if USB_MODEM[key] then
					data[key] = value
				end
			end
		end
	)
	
	for key,val in pairs(USB_MODEM)do
		if data[key] == nil then	
			data[key] = ""
		end
	end
	data.connectstatus = tostring(connstatus)
    return data
end

local function set_modemcfg(modemset_old,formvalue)

	if not ctl.check(formvalue, CHECK_MODEM_TBL) then
		dbg("wrong args............................")
        return false
    end
	--dbg("right args............................")
    --local modemset_old = get_modemcfg()
	local ispParamFlag = 0
    local modemset_new = {
		--pay attention to the key which can be absent 
		locindex   = formvalue["locindex"] or (modemset_old.locindex and modemset_old.locindex or ""),
		ispindex   = formvalue["ispindex"] or (modemset_old.ispindex and modemset_old.ispindex or ""),
        pincode    = formvalue["pincode"] or (modemset_old.pincode and modemset_old.pincode or ""),
		dial_num   = formvalue["dial_num"] or (modemset_old.dial_num and modemset_old.dial_num or ""),
		apn        = formvalue["apn"]  or (modemset_old.apn and modemset_old.apn or ""),
		username   = formvalue["username"] or (modemset_old.username and modemset_old.username or ""),
		password   = formvalue["password"] or (modemset_old.password and modemset_old.password or ""),
		authentype = formvalue["authentype"] or (modemset_old.authentype and modemset_old.authentype or ""),
		mtu         = formvalue["mtu"] or (modemset_old.mtu and modemset_old.mtu or ""),		
		maxidletime = formvalue["maxidletime"]  or (modemset_old.maxidletime and modemset_old.maxidletime or "0")
     
    }
	
	--[[uci_r:set("modem", "modemconf", "connectmode", modemset_new.connectmode)
	uci_r:set("modem", "modemisp", "authentype", modemset_new.authentype)
	uci_r:set("modem", "modemconf", "mtu", modemset_new.mtu)
	uci_r:set("modem", "modemconf", "manualdns", modemset_new.manualdns)
	uci_r:set("modem", "modemconf", "maxidletime", modemset_new.maxidletime)
	--]]
	--set the value of setisp. remember:unplug the card to set value auto
	modemset_new["setisp"] = formvalue["setisp"]
	if formvalue["setisp"] == "auto" then
		if modemset_old.locindex ~= modemset_new.locindex or modemset_old.ispindex ~= modemset_new.ispindex then
			modemset_new["setisp"] = "select"
		else
			if modemset_old.setisp == "manual" then
				modemset_new["setisp"] = "auto"
				ispParamFlag = 1
				dbg("***********/usr/lib/modem/getisp.sh locIndex ispIndex 0**********************")
				sys.call("sh /usr/lib/modem/getisp.sh locIndex ispIndex 0")
			else
				modemset_new["setisp"] = modemset_old.setisp
			end
		end
	elseif formvalue["setisp"] == "select" and
		modemset_old.locindex == modemset_new.locindex and modemset_old.ispindex == modemset_new.ispindex
		then
		modemset_new["setisp"] = modemset_old.setisp
	end
	uci_r:set("modem", "modemisp", "setisp", modemset_new.setisp)
	if modemset_new.setisp == "select" then
		modemset_new["dial_num"]  = formvalue["dial_num_hidden"] or ""
		modemset_new["apn"]       = formvalue["apn_hidden"] or ""
		modemset_new["username"]  = formvalue["username_hidden"] or ""
		modemset_new["password"]  = formvalue["password_hidden"] or ""
	end
	
	uci_r:set("modem", "modemisp", "locindex", modemset_new.locindex)
    uci_r:set("modem", "modemisp", "ispindex", modemset_new.ispindex)
	uci_r:set("modem", "modemisp", "pincode", modemset_new.pincode)
	uci_r:set("modem", "modemisp", "authentype", modemset_new.authentype)
	uci_r:set("modem", "modemconf", "mtu", modemset_new.mtu)
	uci_r:set("modem", "modemconf", "maxidletime", modemset_new.maxidletime)
	if 1 == ispParamFlag then
		uci_r:commit("modem")
		modemset_new.dial_num = uci_r:get("modem","modemisp","dial_num") or ""
		modemset_new.apn = uci_r:get("modem","modemisp","apn") or ""
		modemset_new.username = uci_r:get("modem","modemisp","username") or ""
		modemset_new.password = uci_r:get("modem","modemisp","password") or ""
		--dbg( " 1:" .. modemset_new.dial_num .. " 2:" .. modemset_new.username .. " 3:" .. modemset_new.password .. " 4:" .. modemset_new.apn)
	end
	uci_r:set("modem", "modemisp", "dial_num", modemset_new.dial_num)
	uci_r:set("modem", "modemisp", "apn", modemset_new.apn)
	uci_r:set("modem", "modemisp", "username", modemset_new.username)
	uci_r:set("modem", "modemisp", "password", modemset_new.password)
	--dbg( " 1:" .. modemset_new.dial_num .. " 2:" .. modemset_new.username .. " 3:" .. modemset_new.password .. " 4:" .. modemset_new.apn)
	--network
	uci_r:set("network", "mobile", "dialnumber", modemset_new.dial_num)
	uci_r:set("network", "mobile", "username", modemset_new.username)
	uci_r:set("network", "mobile", "password", modemset_new.password)
	uci_r:set("network", "mobile", "apn", modemset_new.apn)
	uci_r:set("network", "mobile", "auth", modemset_new.authentype)
	uci_r:set("network", "mobile", "idle_time",tonumber(modemset_new.maxidletime) * 60)
	
	modemset_new["connectmode"] = formvalue["connectmode"] or modemset_old.connectmode
	uci_r:set("modem", "modemconf", "connectmode", modemset_new.connectmode)
	--network
	uci_r:set("network", "mobile", "conn_mode", modemset_new.connectmode)
	
	modemset_new["manualdns"]   = formvalue["manualdns"] or (modemset_old.manualdns and modemset_old.manualdns or "")
	uci_r:set("modem", "modemconf", "manualdns", modemset_new.manualdns)
	
	--set the value of manualdns,primarydns,seconddns
	if modemset_new.manualdns == "on" then
		modemset_new["primarydns"] = formvalue["primarydns"] or (modemset_old.primarydns and modemset_old.primarydns or "")
		modemset_new["seconddns"]  = formvalue["seconddns"] or (modemset_old.seconddns  and modemset_old.seconddns or "")
		uci_r:set("modem", "modemconf", "primarydns", modemset_new.primarydns)
		uci_r:set("modem", "modemconf", "seconddns", modemset_new.seconddns)
		uci_r:set("network", "mobile", "dns_mode", "static")
		uci_r:set("network", "mobile", "peerdns", "0")
		uci_r:set("network", "mobile", "dns", dns_concat(modemset_new.primarydns,modemset_new.seconddns))
	else
		uci_r:set("network", "mobile", "dns_mode", "dynamic")
		uci_r:set("network", "mobile", "peerdns", "")
		uci_r:set("network", "mobile", "dns", "")
	end
	local proto_mtu=uci_r:get("modem","modeminfo","proto")
	if proto_mtu ~= "qmi" then
		uci_r:set("network", "mobile", "mtu", modemset_new["mtu"])
	end
	uci_r:set("network", "mobile", "connectable", "1")
	uci_r:commit("modem")
	uci_r:commit("network")
	return true
end

--connect
function modem_connect(formvalue, args)
	local _ubus = bus.connect()
	if not _ubus then
		--log(nlog.UBUS_CONN_FAILED)
		--dbg("ubus fail")
		log(LOG_UBUS_FAIL)
		return get_modemcfg()
	end
	local path = "network.interface.mobile"
	local method = "disconnect"

	local modemset_old = get_modemcfg()
	if not set_modemcfg(modemset_old,formvalue) then 
		log(755)
		return invalid_args()
	end
	local modemset_new = get_modemcfg()
	log_save(formvalue,modemset_new)
	log(601)
	--[[
	if check_ableconn_weak() == false then
		log(LOG_UBUS_METHOD,path,method)
		_ubus:call(path, method, {})
	end
	--]]
	dbg("modem_connect-1")
	--unlock pin
	---[[
	if  (1 == tonumber(modemset_old.pinlock) or 3 == tonumber(modemset_old.pinlock))then
		if (modemset_old.pincode ~= modemset_new.pincode or 1 == tonumber(modemset_old.pinlock)) and 2 == tonumber(modemset_old.modemstatus) then
			if (1 == args)then
				sys.fork_exec("sh /usr/lib/modem/unlock_pin.sh manual 1") --click connect button
			else
				sys.fork_exec("sh /usr/lib/modem/unlock_pin.sh manual 0") --click save button
			end
			dbg("unlock_pin.sh manual")		
			--uci_r:commit("modem")
			return get_modemcfg()
		end		
	end
	
	--path = "network.interface.mobile"
	--method = "connect"
	--[[
	if check_change_dialcfg(modemset_old,get_modemcfg()) then
		dbg("ubus disconnect")
		method = "disconnect"
		log(LOG_UBUS_METHOD,path,method)
		_ubus:call(path, method, {})
	end
	--]]
	dbg("ubus reload")
	method = "reload"
	path = "network"
	log(LOG_UBUS_METHOD,path,method)
	_ubus:call(path, method, {})
	nixio.nanosleep(0, 200000000 )
	--sys.fork_exec("/etc/init.d/network reload")
	
	dbg("modem_connect-2")
	path = "network.interface.mobile"
	method = "connect"
	if check_ableconn() then	
		log(LOG_UBUS_METHOD,path,method)
		dbg("modem_connect-3")
		_ubus:call(path, method, {})
	end
	dbg("modem_connect-4")
	return get_modemcfg()
end
--disconnect
function modem_disconnect()
	--ä¸é¢æ¯åæ¶æ¨å·çæ¥å£
	local _ubus = bus.connect()
	if not _ubus then
		log(LOG_UBUS_FAIL)
	end
	uci_r:set("network","mobile","connectable","0")
	uci_r:commit("network")
	local path = "network.interface.mobile"
	local method = "disconnect"	
	log(LOG_UBUS_METHOD,path,method)
	_ubus:call(path, method, {})
	return get_modemcfg()
end
function prase_signal(sig)
	local csq = sig
	if sig < 0 then
		local dcsq = (sig + 113)/2
		csq = dcsq - dcsq%1
	end 
	if csq >=0 and csq <= 31 then
		local dsig = csq/31*100
		return (dsig - dsig%1)
	elseif csq == 99 then 
		return 0
	else
		return 100
	end
end
-- for status html 
function get_status_mobile()
	local data = {
		conn_type = "0",
		modem_status = "0",
		modem_connstatus = "0",
		modem_ipaddr = "0.0.0.0",
		modem_netmask = "0.0.0.0",
		modem_gateway = "0.0.0.0",
		modem_pridns = "0.0.0.0",
		modem_snddns = "0.0.0.0",
		modem_signal = "0%",
		modem_type = ""
    }
	--[[
    local modem_mod = "0"
	local usb_menu = uci_r:get_profile("basic" .. "_" .. "usb", "menu")
	if usb_menu and type(usb_menu) == "table" then
		for _, menu_name in pairs(usb_menu) do
			if  menu_name == "g3_g4" then
				modem_mod = "1"
				break;
			end
		end
	end
	if modem_mod == "0" then
		return data
	end
	--]]
	local nw = require "luci.model.nwcache"
	local _ubus = bus.connect()		
	if not _ubus then
		log(LOG_UBUS_FAIL)
		return 0
	end
	
	nw = nw.init()
	local interface = "mobile"
    local net = nw:get_network(interface) or nil
	local dnsaddrs = net and net:dnsaddrs() or {}
	
	local conn_type = "0"	
	local method = "get_current_network"
	local path = "network"
	local result = _ubus:call(path, method, {})
	if result ~= nil and result.current_network ~= nil then
		--dbg("type is " .. result.current_network)
        conn_type = result.current_network == "MOBILE" and "1" or "0"
    end
	
	local modem_status = uci_r:get("modem","modemconf","modemstatus")
	local modem_sig = uci_r:get("modem","modemisp","modem_signal")
	--dbg("0.modem_signal:" .. modem_sig)
	--modem_sig = (modem_sig and "0" ~= modem_status) and modem_sig or 0
	if modem_sig == nil then
		modem_sig = "0"
	else
		if modem_status ~= "2" then
			modem_sig = "0"
		else
			if modem_sig == "32" and 1 ~= get_connstatus() then
				modem_sig = "0"
			end
		end
	end
	--dbg("1.modem_signal:" .. modem_sig)
	local modem_signal = prase_signal(tonumber(modem_sig))
	--log(LOG_MODEM_SIGNAL,modem_sig,modem_signal)
	local modem_type = uci_r:get("modem","modeminfo","modem_type")
	
	local modem_available = 0
	--if usb is available then usbmodem is default implemented
	if uci_r:get_profile("usbshare", "usb_available") == "yes" then
		modem_available = 1
	end
	if uci_r:get_profile("usbshare", "modem_available") == "no" then
		modem_available = 0
	end

	local connStatus = get_connstatus()
	if connStatus == 1 then
		if sys.call("online-test") == 0 then
			-- online
			data["modem_connstatus"] = 1
		else
			--[[ 
				modem has four conn_status in CONN_STATUS, 0/1/2/3
				here we use 4 to express poor_connected
			]]
			data["modem_connstatus"] = 4
		end
	end
	data["conn_type"] = conn_type
	data["modem_status"] = modem_status
	data["modem_ipaddr"] = net and net:ipaddr() or "0.0.0.0"
	data["modem_netmask"] = net and net:netmask() or "0.0.0.0"
	data["modem_gateway"] = net and net:gwaddr() or "0.0.0.0"
	data["modem_pridns"] = dnsaddrs[1] or "0.0.0.0"
	data["modem_snddns"] = dnsaddrs[2] or "0.0.0.0"
	data["modem_signal"] = modem_signal .. "%"
	data["modem_type"] = modem_type
    data["modem_available"] = modem_available
	local basic_info = ""
	for k,v in pairs(data) do
		basic_info = basic_info .. " " .. tostring(k) .. "=" .. tostring(v)
	end
	--log(LOG_BASIC_INFO,basic_info)
    return data
end

-- Get file's md5sum
-- @param file
-- @return md5 sum 
local RUNING_PATH       = "/tmp/modem"
function get_md5sum(file, md5_file)
	local sum = nil
	local MD5_FILE = md5_file and RUNING_PATH..md5_file or RUNING_PATH.."/file.md5"

	if file then
		sys.call("md5sum " .. file .. " > " .. MD5_FILE)
		local f = io.open(MD5_FILE, "rb")
		if f then
			sum = f:read(32)
			f:close()
		end
	end

	return sum
end

function tmp_read_3g4g_info()
	local modemcfg = get_modemcfg()
	local data={}
	local nw = require "luci.model.nwcache"
	local _ubus = bus.connect()		
	if not _ubus then
		log(LOG_UBUS_FAIL)
		return 0
	end
	
	networkcache = nw.init()
	local interface = "mobile"
    local net = networkcache:get_network(interface) or nil
	local dnsaddrs = net and net:dnsaddrs() or {}
	local modem_sig = uci_r:get("modem","modemisp","modem_signal") or "0"
	local modem_signal = prase_signal(tonumber(modem_sig))
	local modemstatus = uci_r:get("modem","modemconf","modemstatus")
	if tonumber(modemstatus) == 0 then
		usbStatus = "unplugged"
	elseif tonumber(modemstatus) == 1 then
		usbStatus = "identifying"
	elseif tonumber(modemstatus) == 2 then
		usbStatus = "plugged"
	end
	
	if tonumber(modemcfg.pinlock) == 1 then
		pinlock="pin_lock"
	elseif tonumber(modemcfg.pinlock) == 3 then
		pinlock="pin_lock"
	elseif tonumber(modemcfg.pinlock) == 2 then
		pinlock="puk_lock"
	else
		pinlock="ready"
	end
	
	data.usbStatus			= usbStatus
	data.simStatus			= pinlock
	data.backupSupport		= 0
	data.backupEnable		= 0
	data.manualConnSupport	= 1
	data.connStatus			= get_connstatus()

	if tonumber(data.connStatus) == 0 then
		data.connStatus = "disconnected"
	elseif tonumber(data.connStatus) == 1 then
		data.connStatus = "connected"
	elseif tonumber(data.connStatus) == 2 then
		data.connStatus = "connecting"
	else
		data.connStatus = "disconnecting"
	end
	data.signalPercent		= modem_signal
	if net then
		data.ip					= net and net:ipaddr() or "0.0.0.0"
		data.gateway			= net and net:gwaddr() or "0.0.0.0"
		data.mDNS				= dnsaddrs[1] or "0.0.0.0"
		data.sDNS				= dnsaddrs[2] or "0.0.0.0"
	else
		data.ip					= "0.0.0.0"
		data.gateway			= "0.0.0.0"
		data.mDNS				= "0.0.0.0"
		data.sDNS				= "0.0.0.0"
	end
	data.ispFilePath		= ISP_FILE_PATH
	data.ispFileMD5			= string.upper(get_md5sum(ISP_FILE_PATH))
	data.locationIndex		= uci_r:get("modem","modemisp","locindex")
	data.ispIndex			= uci_r:get("modem","modemisp","ispindex")
	data.isManual			= (uci_r:get("modem","modemisp","setisp") == "manual") and 1 or 0
	data.number				= uci_r:get("modem","modemisp","dial_num")
	data.apn				= uci_r:get("modem","modemisp","apn")
	data.username			= uci_r:get("modem","modemisp","username")
	data.password			= uci_r:get("modem","modemisp","password")
	
	return data
end

function setmodemauto()
	local locationIndex = uci_r:get("modem","modemisp","locindex")
	local ispIndex = uci_r:get("modem","modemisp","ispindex")
	local FILE_ISP_JSON="/www/webpages/data/location.json"
	local file = io.open(FILE_ISP_JSON,"r")
	local status = 0
	dial_num = ""
	apn = ""
	username = ""
	password = ""
	if file == nil then
		return 
	end
	for line in file:lines() do
		if status == 0 then
			if string.find(line,"location"..locationIndex) then
				status = 1
			end
		end
		if status == 1 then
			if string.find(line,"isp"..ispIndex) then
				status = 2
			end
		elseif status == 2 then
			a,b = string.find(line,"\"")
			if type(a)=="number" then
				b = string.find(line,"\"",a+1)
				if b then
					c = string.find(line,"\"",b+1)
					if c then
						d = string.find(line,"\"",c+1)
					end
				end
			end
			if d then
				finded = string.find(line,"dial_num")
				if finded then
					dial_num = string.sub(line,c+1,d-1)
				end
				
				finded = string.find(line,"username")
				if finded then
					username = string.sub(line,c+1,d-1)
				end
				
				finded = string.find(line,"apn")
				if finded then
					apn = string.sub(line,c+1,d-1)
				end
				
				finded = string.find(line,"password")
				if finded then
					password = string.sub(line,c+1,d-1)
				end
			end
			if string.find(line,"location") then 
				break
			end
			if string.find(line,"\"isp%d") then 
				break
			end
		end
	end
	io.close(file)
	uci_r:set("modem", "modemisp", "dial_num", dial_num)
	uci_r:set("modem", "modemisp", "apn", apn)
	uci_r:set("modem", "modemisp", "username", username)
	uci_r:set("modem", "modemisp", "password", password)
end

function tmp_set_3g4g_info(data)
	local modemset_old = get_modemcfg()
	local _ubus = bus.connect()
	uci_r:set("modem", "modemisp", "locindex", data.locationIndex)
	uci_r:set("modem", "modemisp", "ispindex", data.ispIndex)
	uci_r:set("modem", "modemisp", "dial_num", data.number)
	uci_r:set("modem", "modemisp", "apn", data.apn)
	uci_r:set("modem", "modemisp", "username", data.username)
	uci_r:set("modem", "modemisp", "password", data.password)
	
	if tonumber(data.isManual) == 1 then
		uci_r:set("modem", "modemisp", "setisp", "manual")
		uci_r:commit("modem")
	else
		uci_r:set("modem", "modemisp", "setisp", "auto")
		setmodemauto()
		uci_r:commit("modem")
	end
	
	local modemInfo = get_modemcfg()
	uci_r:set("network", "mobile", "dialnumber", modemInfo.dial_num or "")
	uci_r:set("network", "mobile", "apn", modemInfo.apn or "")
	uci_r:set("network", "mobile", "username", modemInfo.username or "")
	uci_r:set("network", "mobile", "password", modemInfo.password or "")
	uci_r:commit("network")
	
	local path = "network"
	local method = "reload"
	
	log(LOG_UBUS_METHOD,path,method)
	_ubus:call(path, method, {})
	nixio.nanosleep(0, 200000000 )
	
	return {success = true}
end

function tmp_unlock_PIN(data)
	local modemset_old = get_modemcfg()
	
		dbg.print("tmp_unlock_PIN 9"..data.pin)
	uci_r:set("modem", "modemisp", "pincode", data.pin)
	uci_r:commit("modem")
	local modemset_new = get_modemcfg()
	--unlock pin
	if  (1 == tonumber(modemset_old.pinlock) or 3 == tonumber(modemset_old.pinlock))then
		if (modemset_old.pincode ~= modemset_new.pincode or 1 == tonumber(modemset_old.pinlock)) and 2 == tonumber(modemset_old.modemstatus) then
			dbg.print("tmp_unlock_PIN 1")
			sys.call("sh /usr/lib/modem/unlock_pin.sh manual")
			uci_r:commit("modem")
		end		
	end
	return {success = true}
end

function tmp_connect(data)
	local _ubus = bus.connect()
	if not _ubus then
		log(LOG_UBUS_FAIL)
	end
	
	if tonumber(data.conn) == 1 then
		uci_r:set("network", "mobile", "connectable", "1")
		uci_r:commit("network")
		method = "reload"
		path = "/etc/init.d/network"
		--_ubus:call(path, method, {})
		sys.fork_exec("/etc/init.d/network reload")
		path = "network.interface.mobile"
		method = "connect"
		if check_ableconn() then	
			log(LOG_UBUS_METHOD,path,method)
			_ubus:call(path, method, {})
		end
	else
		uci_r:set("network","mobile","connectable","0")
		uci_r:commit("network")
		local path = "network.interface.mobile"
		local method = "disconnect"	
		log(LOG_UBUS_METHOD,path,method)
		_ubus:call(path, method, {})
	end
	return true
end

function get_str_split(str)
        --local str_key = nil
        --local str_val = nil
        local index = string.find(str, ":")
        if not index then
                return nil,nil
        end
        local str_key = string.sub(str, 1, index - 1)
        if str_key then
                str_key = string.gsub(str_key, "%c", "")
                str_key = string.gsub(str_key, "\"", "")
        end
        local str_val = string.sub(str, index + 1, -2)
        if str_val then
                str_val = string.gsub(str_val, " \"", "")
                str_val = string.gsub(str_val, "\"", "")
        end

        return str_key,str_val
end

function get_isplist()
        local data = {}
        local FILE_ISP_JSON="/www/webpages/data/location.json"
        local file = io.open(FILE_ISP_JSON,"r")
        if file == nil then
			data = 
			{
					["location341"] =
					{
							["location_mcc"] = "250",
							["location_name"] = "RUSSIA",
							["isp0"] =
							{
									["isp_mnc"] = "28",
									["isp_mnc"] = "99",
									["isp_name"] = "M_BEELINE",
									["dial_num"] = "*99#",
									["apn"] = "internet.beeline.ru",
									["username"] = "beeline",
									["password"] = "beeline"
							},
							["isp1"] =
							{
									["isp_mnc"] = "02",
									["isp_name"] = "M_MEGAFON",
									["dial_num"] = "*99#",
									["apn"] = "internet",
									["username"] = "gdata",
									["password"] = "gdata"
							},
							["isp2"] =
							{
									["isp_mnc"] = "01",
									["isp_name"] = "M_MTS",
									["dial_num"] = "*99#",
									["apn"] = "internet.mts.ru",
									["username"] = "mts",
									["password"] = "mts"
							},
							["isp3"] =
							{
									["isp_mnc"] = "37",
									["isp_name"] = "M_SKYLINK",
									["dial_num"] = "#777",
									["apn"] = "",
									["username"] = "mobile",
									["password"] = "internet"
							},
							["isp4"] =
							{
									["isp_mnc"] = "39",
									["isp_name"] = "M_VAINAKH_TELECOM",
									["dial_num"] = "*99#",
									["apn"] = "internet",
									["username"] = "",
									["password"] = ""
							},
							["isp5"] =
							{
									["isp_mnc"] = "11",
									["isp_name"] = "M_YOTA",
									["dial_num"] = "*99#",
									["apn"] = "yota.ru",
									["username"] = "",
									["password"] = ""
							},
							["isp6"] =
							{
									["isp_mnc"] = "20",
									["isp_name"] = "M_TELE2",
									["dial_num"] = "*99#",
									["apn"] = "internet.tele2.ru",
									["username"] = "",
									["password"] = ""
							},
							["isp7"] =
							{
									["isp_mnc"] = "39",
									["isp_name"] = "M_ROSTELECOM",
									["dial_num"] = "*99#",
									["apn"] = "internet.rt.ru",
									["username"] = "",
									["password"] = ""
							}
					}
			}
			return data
        end
        local region_data = {}
        local isp_data = {}
        local region_index = ""
        local isp_index = ""
        local location_name = ""
        local isp_name = ""
        local dial_num = ""
        local apn = ""
        local username = ""
        local password = ""
        for line in file:lines() do
			if  string.find(line, "\"location%d+\"") then
					if isp_data["isp_name"] then
							region_data[isp_index] = isp_data
							isp_data = {}
					end
					if region_data["location_name"] and region_index then
							data[region_index] = region_data
							region_data = {}
					end
					region_index = get_str_split(line)
			end
			if  string.find(line, "\"location_name\"") then
					_ , location_name = get_str_split(line)
					region_data["location_name"] = location_name or ""
			end
			if  string.find(line, "\"isp%d+\"") then
					if isp_data["isp_name"] and isp_index then
							region_data[isp_index] = isp_data
							isp_data = {}
					end
					isp_index = get_str_split(line)
			end
			if  string.find(line, "\"isp_name\"") then
					_ , isp_name = get_str_split(line)
					isp_data["isp_name"] = isp_name
			end
			if  string.find(line, "\"dial_num\"") then
					_ , dial_num = get_str_split(line)
					isp_data["dial_num"] = dial_num
			end
			if  string.find(line, "\"apn\"") then
					_ , apn = get_str_split(line)
					isp_data["apn"] = apn
			end
			if  string.find(line, "\"username\"") then
					_ , username = get_str_split(line)
					isp_data["username"] = username
			end
			if  string.find(line, "\"password\"") then
					_ , password = get_str_split(line)
					isp_data["password"] = password
			end
        end
		if isp_data["isp_name"] then
				region_data[isp_index] = isp_data
				isp_data = {}
		end
		if region_data["location_name"] then
				data[region_index] = region_data
				region_data = {}
		end
        io.close(file)		
        return data
end

function get_working_mode()
	local data =  {
        wan_3g4g_switch = uci_r:get("modem", "modemconf", "mode") or "cable"
	}
	return data
end

function set_working_mode(form)
	local data = {}
    uci_r:set("modem", "modemconf", "mode", form.wan_3g4g_switch or "cable")
    uci_r:commit("modem")
    return get_working_mode()
end
-- General controller routines

local dispatch_tbl = {
	mobile_inf = {
        ["read"]  = { cb = get_status_mobile },
    },
    modemset = {
        ["read"]  = { cb = get_modemcfg },
        ["connect"] = { cb = modem_connect, args = 1 },
        ["disconnect"] = { cb = modem_disconnect },
        ["write"] = { cb = modem_connect, args = 0 },
    },
	isplist = {
		["read"] = { cb = get_isplist }
	},
	tmp_cmd = {
		["read"] = { cb = tmp_read_3g4g_info},
		["write"] = { cb = tmp_set_3g4g_info},
		["unlock_PIN"] = { cb = tmp_unlock_PIN},
		["connect"] = { cb = tmp_connect},
	},
	working_mode_set = {
		["read"] =  { cb = get_working_mode},
		["write"] = { cb = set_working_mode}
	}
}

function dispatch(http_form)
    return ctl.dispatch(dispatch_tbl, http_form)
end

function _index()
    return ctl._index(dispatch)
end

function index()
    entry({"admin", "usbmodem"}, call("_index")).leaf = true
end

