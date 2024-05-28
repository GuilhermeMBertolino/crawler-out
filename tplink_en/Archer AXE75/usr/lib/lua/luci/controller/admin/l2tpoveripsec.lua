--[[
Copyright(c) 2008-2018 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  l2tpoveripsec.lua
Details :  
Author  :  Su Weilin<suweilin@tp-link.net>
Version :  1.0.0
Date    :  11July18
History :  arg 1.0.0, 11Jun18, Su Weilin, Create the file.
]]--

module("luci.controller.admin.l2tpoveripsec", package.seeall)

local sys      = require "luci.sys"
local muci     = require "luci.model.uci"
local ctl      = require "luci.model.controller"
local vpn      = require "luci.model.vpn"
local form     = require "luci.tools.form"
local debug    = require "luci.tools.debug"
local dtypes   = require "luci.tools.datatypes"
local nixio    = require "nixio"
local ctypes   = require "luci.model.checktypes"
local bitopt   = require "bit"
local json     = require "luci.json"
local ubus     = require "ubus"

local uci      = muci.cursor()
form = form.Form(uci)

local XL2TPD_MAX_ACCOUNTS = 16
local XL2TPD_SHELL = "/etc/init.d/xl2tpd"
local RESTART = "restart"
local _ubus

-- Verify account
-- @param N/A
-- @return boolean
local function account_valid(str)
    local VPNSERVER_USERNAME_PSW_VALID = {"`", "-", "~", "!", "#", "$", "%", "^", "(", ")", "_", "'", "{", "}"}
    local VPNSERVER_USERNAME_PSW_LEN = 64
    
    if str == nil then
        return false
    elseif not dtypes.rangelength(str, 1, VPNSERVER_USERNAME_PSW_LEN) then
        return false
    elseif not str:find("^[a-zA-Z0-9`%-~!#$%%^()_'{}]+$") then
        return false
    end

    return true
end

-- Verify PSK
-- @param N/A
-- @return boolean
local function psk_valid(str)
    local VPNSERVER_PSK_VALID = {"`", "-", "~", "!", "#", "$", "%", "^", "(", ")", "_", "'", "{", "}", "=", "*", "+", "[", "]", "\\", ";", ",", ".", "/", "|", ":", "?", " ", "@"}
    local VPNSERVER_PSK_LENGTH = 32

    if str == nil then
        return false
    elseif not dtypes.rangelength(str, 1, VPNSERVER_PSK_LENGTH) then
        return false
    elseif not str:find("^[a-zA-Z0-9`%-~!#$%%^()_'{}=*+[%]\\;,./|:? @]+$") then
        return false
    end

    return true
end

-- Get L2TP/IPSEC VPN UCI config
-- @param N/A
-- @return table 
local function l2tpoveripsec_cfg_get()
    local sectype = uci:get("l2tpoveripsec", "l2tpoveripsec")
	local ipaddr = ""
	
    if sectype ~= "service" then
        return false, "invalid uci config"
    end
	
	_ubus = _ubus or ubus.connect()
	local jsondata = _ubus:call("network.interface.wan", "status", {}) 
	if jsondata then
		local address = jsondata["ipv4-address"]
		local jsonstring = json.encode(address)
		local addrstr = tostring(jsonstring)
		if addrstr then
			ipaddr = addrstr:match(".(%d+%.%d+%.%d+%.%d+)")
		end
	end

	local encryption = uci:get("l2tpoveripsec", "l2tpoveripsec", "encryption")

	if encryption == "true" then
		encryption	= "on"
	else
		encryption = "off"
	end

    local data = {
        enabled      = uci:get("l2tpoveripsec", "l2tpoveripsec", "enabled"),
        subnet       = uci:get("l2tpoveripsec", "l2tpoveripsec", "subnet"),
        netmask      = uci:get("l2tpoveripsec", "l2tpoveripsec", "netmask"),
		maxconn      = uci:get("l2tpoveripsec", "l2tpoveripsec", "maxconn"),
		psk			 = uci:get("l2tpoveripsec", "l2tpoveripsec", "psk"),
		encrypt		 = encryption,
		access       = uci:get("l2tpoveripsec", "l2tpoveripsec", "access"),
		serverip     = ipaddr,
		samba_access = uci:get("l2tpoveripsec", "l2tpoveripsec", "samba_access"),
        netbios_pass = uci:get("l2tpoveripsec", "l2tpoveripsec", "netbios_pass"),
        remoteip     = uci:get("l2tpoveripsec", "l2tpoveripsec", "remoteip"),
    }

    return data
end

-- Set L2TP/IPSEC VPN UCI config, and restart service
-- @param N/A
-- @return table 
local function l2tpoveripsec_cfg_set(form)
    local sectype = uci:get("l2tpoveripsec", "l2tpoveripsec")

    if sectype ~= "service" then
        return false, "invalid uci config"
    end

    local old = l2tpoveripsec_cfg_get()

    if form.enabled ~= "on" and form.enabled ~= "off" then
        return false, "invalid parameter enabled"
    end
    if form.encrypt ~= "on" and form.encrypt ~= "off" then
        return false, "invalid parameter enabled"
    end

    if form.psk and not psk_valid(form.psk) then
        return false, "invalid psk character"
    end
	--[[
	if form.samba_access ~= "on" and form.samba_access ~= "off" then
        return false, "invalid parameter enabled"
    end
    if form.netbios_pass ~= "on" and form.netbios_pass ~= "off" then
        return false, "invalid parameter enabled"
    end
	if not ctypes.check_ipv4(form.subnet) or not ctypes.check_netmask(form.netmask, false) then
        return false, "invalid vpn subnet"
    end
	
	local subnet1 = nil
	local subnet2 = nil
	local subnet3 = nil
	local subnet4 = nil
	
	local netmask1 = nil
	local netmask2 = nil
	local netmask3 = nil
	local netmask4 = nil
	
	local res1 = nil
	local res2 = nil
	local res3 = nil
	local res4 = nil
	
	local subnet = nil
	local localip = nil
	local remoteip = nil
	local serverip = old.serverip
	
	old.serverip = uci:get("l2tpoveripsec", "l2tpoveripsec", "serverip")
	
	subnet1, subnet2, subnet3, subnet4 = form.subnet:match("(%d+).(%d+).(%d+).(%d+)")
	netmask1, netmask2, netmask3, netmask4 = form.netmask:match("(%d+).(%d+).(%d+).(%d+)")

	res1 = bitopt.band(tonumber(subnet1), tonumber(netmask1))
	res2 = bitopt.band(tonumber(subnet2), tonumber(netmask2))
	res3 = bitopt.band(tonumber(subnet3), tonumber(netmask3))
	res4 = bitopt.band(tonumber(subnet4), tonumber(netmask4))

	subnet = res1.."."..res2.."."..res3.."."..res4
	
	localip = string.format("%d.%d.%d.%d", res1, res2, res3, (res4 + 10))
	remoteip = string.format("%d.%d.%d.%d-%d.%d.%d.%d", res1, res2, res3, (res4 + 11), res1, res2, res3, (res4 + 10 + tonumber(form.maxconn)))
    if old ~= nil and old.enabled == form.enabled
	   and old.netmask == form.netmask
		   and old.subnet == subnet
			   and old.psk == form.psk
					and old.access == form.access
						and old.maxconn == form.maxconn
							and old.serverip == serverip
								and old.samba_access == form.samba_access
								    and old.netbios_pass == form.netbios_pass
	--]]

    -- forbid save if no account exist
    local form_tools = require "luci.tools.form"
    form_tools = form_tools.Form(uci)
    local account_num = form_tools:count("l2tpoveripsec", "login")
    if account_num == 0 and form.enabled == "on" then
        return false, "no account exist"
    end

    if old ~= nil and old.enabled == form.enabled
		and old.remoteip == form.remoteip
	   		and old.encrypt == form.encrypt
			   and old.psk == form.psk
    then
        return l2tpoveripsec_cfg_get()
    end

	local localip = nil
    local prefix   = nil
    local head     = nil
    local tail     = nil
    prefix, head, tail = form.remoteip:match("(%d+%.%d+.%d+.)(%d+)-(%d+)")
    if not prefix or not head or not tail then
        return false, "invalid parameter remoteip"
    end

    head = tonumber(head)
    tail = tonumber(tail)

    if (head < 1 or head > 254) or 
       (tail < 1 or tail > 254) or 
       ((tail - head + 1) > 10)
    then
        return false, "invalid parameter remoteip"
    end

    if head ~= 1 then
        localip = string.format("%s%d", prefix, (head -1))
    elseif tail ~= 254 then
        localip = string.format("%s%d", prefix, (tail + 1))
    end
	
	local encryption = "true" 
	if form.encrypt == "off" then
		encryption = "false" 
	end

    uci:set("l2tpoveripsec", "l2tpoveripsec", "enabled", form.enabled)
	--uci:set("l2tpoveripsec", "l2tpoveripsec", "subnet", subnet)
	--uci:set("l2tpoveripsec", "l2tpoveripsec", "netmask", form.netmask)
	--uci:set("l2tpoveripsec", "l2tpoveripsec", "maxconn", form.maxconn)
	if form.psk then
		uci:set("l2tpoveripsec", "l2tpoveripsec", "psk", form.psk)
	end
	--uci:set("l2tpoveripsec", "l2tpoveripsec", "access", form.access)
	uci:set("l2tpoveripsec", "l2tpoveripsec", "localip", localip)
	uci:set("l2tpoveripsec", "l2tpoveripsec", "remoteip", form.remoteip)
	--uci:set("l2tpoveripsec", "l2tpoveripsec", "serverip", serverip)
	--uci:set("l2tpoveripsec", "l2tpoveripsec", "samba_access",form.samba_access)
    --uci:set("l2tpoveripsec", "l2tpoveripsec", "netbios_pass", form.netbios_pass)
    uci:set("l2tpoveripsec", "l2tpoveripsec", "encryption", encryption)

    uci:commit("l2tpoveripsec")

    -- restart xl2tpd and ipsec service
	sys.fork_exec("/etc/init.d/xl2tpd restart")
	sys.fork_exec("/etc/init.d/ipsec restart")

    return l2tpoveripsec_cfg_get()
end

function get_max_l2tpoveripsec_account()
    return { ["max_accounts"] = uci:get_profile("l2tpoveripsec", "max_accounts") or XL2TPD_MAX_ACCOUNTS }
end

function l2tpoveripsec_account_max_check()
    local max =get_max_l2tpoveripsec_account()
    local cur = form:count("l2tpoveripsec", "login")
    
    if cur >= max.max_accounts then
        return false
    end
    
    return true
end

-- at least one account should exist if pptpd is enable
function l2tpoveripsec_account_min_check()
    local cur = form:count("l2tpoveripsec", "login")
    local enabled = uci:get("l2tpoveripsec", "l2tpoveripsec", "enabled")
    
    if cur == 1 and enabled == "on" then
        return true
    end
    
    return false
end

--- Insert a new l2tpoveripsec account
function insert_l2tpoveripsec_account(http_form)
	debug.dumptable(http_form)
    local new_account = http_form["new"]
    local new = luci.json.decode(new_account)

    if not new and type(new) ~= "table" then
        return {errorcode="invalid new params"}
    end

    if not l2tpoveripsec_account_max_check() then
        return {errorcode="reach max items"}
    end

    -- verify account's username and password
    if not account_valid(new.username) then
        return false, "invalid username"
    elseif not account_valid(new.password) then
        return false, "invalid password"
    end

    local ret = form:insert("l2tpoveripsec", "login", new, {"username", "password"})
    if ret then
        uci:commit("l2tpoveripsec")
        return ret
    else
        return false, "insert new items failed"
    end
end

--- Update a l2tpoveripsec account selected by UI
function update_l2tpoveripsec_account(http_form)
	debug.dumptable(http_form)
    local old = http_form["old"]
    local new = http_form["new"]

    local old = luci.json.decode(old)
    local new = luci.json.decode(new)

    if not new and type(new) ~= "table" or
        not old and type(old) ~= "table" then
        return {errorcode="invalid new params"}
    end

    -- verify account's username and password
    if not account_valid(new.username) then
        return false, "invalid username"
    elseif not account_valid(new.password) then
        return false, "invalid password"
    end

    local ret = form:update("l2tpoveripsec", "login", old, new, {"username", "password"})
    if ret then
        uci:commit("l2tpoveripsec")
        return ret
    else
        return false, "modify item failed"
    end
end

--- Remove a l2tpoveripsec account selected by UI
function remove_l2tpoveripsec_account(http_form)
	debug.dumptable(http_form)
    local key = http_form["key"]
    local index = http_form["index"]

    if l2tpoveripsec_account_min_check() then
        return false, "cant remove the last l2tpoveripsec account when l2tpoveripsec enable"
    end

    local ret = form:delete("l2tpoveripsec", "login", key, index)

    if ret then
        uci:commit("l2tpoveripsec")
        return ret
    else
        return false, "remove l2tpoveripsec account failed"
    end

end

--- Remove all dhcp static lease host
function remove_all_l2tpoveripsec_account()
    local secs = {}

    uci:foreach("l2tpoveripsec", "login",
        function(section)
            secs[#secs + 1] = section[".name"]
        end
    )   

    for _, s in ipairs(secs) do
        uci:delete("l2tpoveripsec", s)
    end

    uci:commit("l2tpoveripsec")

    return true
end


--- Get l2tpoveripsec accounts from configuration
function load_l2tpoveripsec_accounts()
    local l2tpoveripsec_accounts = {}

    local accounts = {}
    uci:foreach("l2tpoveripsec", "login",
        function(section)
            accounts[#accounts + 1] = uci:get_all("l2tpoveripsec", section[".name"])
        end
    )

    for k, rt in ipairs(accounts) do
        local data = {}
        data.username = rt.username
        data.password = rt.password
        l2tpoveripsec_accounts[k] = data
    end

    return l2tpoveripsec_accounts
end


-- 1. Get/Set
-- URL: /admin/l2tpoveripsec?form=config
-- Parameters:
--     enabled: on/off
--     username: admin
--     password: admin
local dispatch_tbl = {
    config = {
        ["read"]  = {cb = l2tpoveripsec_cfg_get},
        ["write"] = {cb = l2tpoveripsec_cfg_set},
    },
    accounts = {
        ["load"] = {cb = load_l2tpoveripsec_accounts, others = get_max_l2tpoveripsec_account},
        ["insert"] = {cb = insert_l2tpoveripsec_account, others = get_max_l2tpoveripsec_account, cmd = RESTART},
        ["update"] = {cb = update_l2tpoveripsec_account, others = get_max_l2tpoveripsec_account, cmd = RESTART},
        ["remove"] = {cb = remove_l2tpoveripsec_account, others = get_max_l2tpoveripsec_account, cmd = RESTART},
        ["clear"]  = {cb = remove_all_l2tpoveripsec_account, cmd = RESTART}
    }
}


local function l2tpoveripsec_dispatch(http_form)
    local function hook(success, action)
        if success and action.cmd and action.cmd ~= "" then
            sys.fork_exec("%s %s" % {XL2TPD_SHELL, action.cmd})
        end
        return true
    end
    return ctl.dispatch(dispatch_tbl, http_form, {post_hook = hook})
end

function l2tpoveripsec_index()
    return ctl._index(l2tpoveripsec_dispatch)
end

function index()
    entry({"admin", "l2tpoveripsec"}, call("l2tpoveripsec_index")).leaf = true
end
