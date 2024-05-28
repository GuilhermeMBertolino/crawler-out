--[[
Copyright(c) 2008-2014 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  client_mgmt.lua
Details :  Ubus client for client management.
Author  :  Ye Qianchuan <yeqianchuan@tp-link.net>
Author  :  Jin Xuexue <jinxuexue@tp-link.net>
Version :  1.0.0
Date    :  07 Mar, 2014
]]--

module ("luci.model.client_mgmt", package.seeall)

local ubus  = require "ubus"
local sys   = require "luci.sys"
local uci   = require "luci.model.uci"
local dbg	= require "luci.tools.debug"
local uci_r = uci.cursor()
local _ubus
local _clist

local UBUS_OBJECT = "client_mgmt"

local support_onemesh = uci_r:get_profile("onemesh", "onemesh_support") or "no"

--- Connect ubus for getting data later.
function init()
	_ubus = ubus.connect()
end

--- Refresh clients table.
-- @return		Boolean whether operation succeeded
function update()
	_ubus = _ubus or ubus.connect()
    return _ubus:call(UBUS_OBJECT, "update", {})
end

--- Get the ARP table.
-- @return		Table of ARP
function get_ARP()
	_ubus = _ubus or ubus.connect()
    return _ubus:call(UBUS_OBJECT, "get_ARP", {})
end

local function one_mesh_get_clist(on_off_all)
    local clients
    local one_mesh = require "luci.model.one_mesh"
    if 1 == on_off_all then -- online clients, read from /tmp/clist.json
        clients = one_mesh.api_get_mesh_clients()
    else
        _, _, _, clients = one_mesh.api_arrange_mesh_clients(on_off_all)
    end

	if not _clist then
		_clist = {}
		for _, v in pairs(clients) do
			_clist[#_clist + 1] = v
		end
	end
	return _clist
end

--- Get the list of clients.
-- @return		Table of client entries
function get_client_list()
    _ubus = _ubus or ubus.connect()
	if _ubus == nil then
		return nil
	else
        if support_onemesh == "yes" then
    		--_ubus:call(UBUS_OBJECT, "update", {})
    		_clist = _clist or one_mesh_get_clist(1)	--_ubus:call(UBUS_OBJECT, "get", {request_type=0})
        else
            _clist = _clist or _ubus:call(UBUS_OBJECT, "get_hist_list", {request_type=1})
        end

		for i=1,#_clist do
	            _clist[i].hostname = _clist[i].nickname ~= "" and _clist[i].nickname or _clist[i].hostname
	        end
		
		return _clist
	end
end

function get_all_client_list()
    _ubus = _ubus or ubus.connect()
	if _ubus == nil then
		return nil
	else
		if support_easymesh == "yes" then
			_clist = _clist or one_mesh_get_clist(0)
		elseif support_onemesh == "yes" then
    		--_ubus:call(UBUS_OBJECT, "update", {})
    		_clist = _clist or one_mesh_get_clist(0)	--_ubus:call(UBUS_OBJECT, "get", {request_type=0})
        else
            _clist = _clist or _ubus:call(UBUS_OBJECT, "get_hist_list", {request_type=0})
        end

		for i=1,#_clist do
	         _clist[i].hostname = _clist[i].nickname ~= "" and _clist[i].nickname or _clist[i].hostname
	    end
		return _clist
	end
end

--- Get the list of clients with ip mixed and enter.
-- @return		Table of client entries
function get_client_list_dev()
    local _ubus = _ubus or ubus.connect()
    if _ubus == nil then
    	return nil
    end
	
    if support_onemesh == "yes" then
        _clist = _clist or one_mesh_get_clist(1) or {}	--_ubus:call(UBUS_OBJECT, "get", {request_type=0}) or {}
    else
        _clist = _clist or _ubus:call(UBUS_OBJECT, "get_hist_list", {request_type=1})
    end

    local clist = _clist

    for _, client in ipairs(clist) do
        local mac = client.mac
        if mac then
            for _ , client_cmp in ipairs(clist) do
                if client ~= client_cmp and client_cmp.mac == mac then
                    client_cmp.mac = nil
                    client.ip = client.ip .. "<br />" .. client_cmp.ip
                    if client.hostname ~= client_cmp.hostname and client.hostname == "network device" then
                        client.hostname = client_cmp.hostname
                    end
                end  
            end
        end
    end
    
    for index, client in ipairs(clist) do 
        if client.mac == nil then
            clist[index] = nil
        end
    end

    return clist
end

--- Get the history list.
-- @return		Table of client entries
function get_history_list_dev(type)
	type = type or 0

    if support_onemesh == "yes" then
        return one_mesh_get_clist(type)
    else
        local _ubus = _ubus or ubus.connect()
        return _ubus:call(UBUS_OBJECT, "get_hist_list", {request_type=type})
    end
end

--- Get the list of clients subjected to the given filter.
-- @param field			Key to be filtered by
-- @param cmp			Value to be compared with
-- @param need_update	Update first if true (optional)
-- @return				Table of client entries filtered
function get_client_by(field, cmp, need_update)
    if need_update then
        update()
    end

    local clist = get_client_list()
    if not clist then
        return
    end

    for _, client in ipairs(clist) do
        if client[field] == cmp then
            return client
        end
    end
end

--- Get Mac address by given IP address.
-- @param ipaddr		IP address to be compared with
function get_mac_by_ip(ipaddr)
    local arp = get_ARP()
    if arp == nil then
        return ""
    end
    for _, item in pairs(arp) do
        if item.ip == ipaddr then
            return item.mac
        end
    end
end

function set_client_nickname(dev_mac, nick_name)
    local _ubus = _ubus or ubus.connect()
    _ubus:call(UBUS_OBJECT, "set_dev_nickname", {nickname=nick_name,device_mac=dev_mac})
end

function set_client_devtype(dev_mac, dev_type)
	local _ubus = _ubus or ubus.connect()
    _ubus:call(UBUS_OBJECT, "set_dev_type", {device_type=dev_type,device_mac=dev_mac})
end

function get_name_by_mac_oui(mac)
	local encode_oui
	local oui
	local file = io.open("/etc/MAC_OUI.map", "r")
    
	if nil == file then
		dbg.print("get_name_by_mac_oui can not open MAC_OUI.map")
		return false
	end
	
	if not mac then
		dbg.print("get_name_by_mac_oui can not accept nil mac")
		return false
	end

	mac = mac:gsub(":", "-")
	local mac_prefix = string.sub(mac:gsub("-", ""):upper(), 1, 6)
	local mapCache = file:read("*all")
	local pos = string.find(mapCache, mac_prefix)

	if  pos ~= nil then
		encode_oui = string.match(mapCache, "%S*#(%S*)", pos)
		oui = nixio.bin.b64decode(encode_oui)
	end

	file:close()
	return oui or false
end

function match_history_list(mac)
	local table = uci_r:get_all("history_list")

	for k, client in pairs(table) do
		if client.mac == mac:gsub("-", ""):upper() then
			if client.hostname == "network device" then
				local oui = get_name_by_mac_oui(mac)
				if oui ~= false then
					client.hostname = oui
				end
			end
			return client.nickname or client.hostname
		end
	end
	return nil
end

function remove_offline_client(macaddr)
    local flag = 0
    local _ubus = _ubus or ubus.connect()
    res = _ubus:call(UBUS_OBJECT, "remove_client_by_mac", {device_mac=macaddr})
    if "success" == res.result then
        return 0
    else
        return -1
    end
end

function remove_offline_client_v2(formvalue)
    if not formvalue or not formvalue.data or formvalue.data == "" then
        return false, "invalid args"
    end
    local params = luci.json.decode(formvalue.data)
    if not params then
        return false, "invalid args"
    end
    local ret = {}
    local data = {}
    local is_clear_all = params.is_clear_all
    data.is_success = true
    if is_clear_all == true then
		_ubus = ubus.connect()
        offline_list = _ubus:call("client_mgmt", "get_hist_list", {request_type=2})
        for k,v in pairs(offline_list) do
            if ( 0 ~= remove_offline_client(v.mac) ) then
                data.is_success = false
            end
        end
    else
        local mac = params.list_mac
        if mac ~= nil then
            if ( 0 ~= remove_offline_client(mac) ) then
                data.is_success = false
            end
        else
            data.is_success = false
        end
    end
    ret.result = luci.json.encode(data)
    return ret
end

--[[
-- The format of one client entry is as follow:
    {
	    hostname	= "name"
    	ip 			= "192.168.1.241"
	    mac 		= "00-11-22-33-44-55"
	    wire_type	= "wired/2.4G/5G/UNKNOW"
	    guest 		= "GUEST/NON_GUEST/UNKNOW"
	    active		= 0/1
    }
]]--
