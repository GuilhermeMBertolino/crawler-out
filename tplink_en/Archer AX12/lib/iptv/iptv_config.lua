#!/usr/bin/env lua

local uci = require "luci.model.uci"

local uci_c = uci.cursor()

local function config_get_wan_ifname_i()
	return uci_c:get("network", "wan", "ifname")
end

local function config_get_lan_ifname()
	print(uci_c:get("network", "lan", "ifname"))
end
local function config_get_lan_type()
	print(uci_c:get("network", "lan", "type"))
end
local function config_get_wan_ifname()
	print(uci_c:get("network", "wan", "ifname"))
end
local function config_get_wan_type()
	print(uci_c:get("network", "wan", "type"))
end

local function config_get_pppoeshare_support()
	local share_support = uci_c:get_profile("pppoeshare", "share_support") or "no"
	print(share_support)
end

local function config_set_network(cfg, sec, opt, val)
	local tmp_sec
	local wan_ifname = config_get_wan_ifname_i()
	if sec == "device" and wan_ifname ~= nil then
		for v in string.gmatch(wan_ifname, "%S+") do
			uci_c:foreach(cfg, sec,
				function(section)
				if section["name"] == v then
					 tmp_sec = section[".name"]
					 uci_c:set(cfg, tmp_sec, opt, val or "")
				end			
				end)
		end
	end
    
	if tmp_sec == nil then
		uci_c:set(cfg, sec, opt, val or "")
	end
    uci_c:commit_without_write_flash(cfg)
end

if arg[1] == "set" then
	if arg[2] and arg[3] and arg[4] then
		config_set_network(arg[2], arg[3], arg[4], arg[5])
	end
elseif arg[1] == "get_lan_ifname" then
	return config_get_lan_ifname()
elseif arg[1] == "get_lan_type" then
	return config_get_lan_type()
elseif arg[1] == "get_wan_ifname" then
	return config_get_wan_ifname()
elseif arg[1] == "get_wan_type" then
	return config_get_wan_type()
elseif arg[1] == "get_share_support" then
	return config_get_pppoeshare_support()
else
	print(false)
end

