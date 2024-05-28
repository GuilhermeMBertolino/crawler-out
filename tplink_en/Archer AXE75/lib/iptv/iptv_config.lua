#!/usr/bin/env lua

local uci = require "luci.model.uci"

local uci_c = uci.cursor()
local dbg    = require "luci.tools.debug"

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

	if sec == "device" then
		-- firstly, try to find a device section named dev_wan
		-- if not found, loop all devices and compare ifname
		tmp_sec = uci_c:get("network", "dev_wan")
		if tmp_sec ~= nil then
			tmp_sec = "dev_wan"
		else
			-- buggy code, someone else may modify wan.ifname
			-- so device.name can't match wan.ifname, then you find nothing, 
			-- for BCM4908 we can treat the name eth0.xxx as wan device
			-- but now we add a section name 'dev_wan'
			local wan_ifname = uci_c:get("network", "wan", "ifname")
			if wan_ifname ~= nil then
			uci_c:foreach(cfg, sec,
				function(section)
				if section["name"] == wan_ifname then
					 tmp_sec = section[".name"]
				end			
				end)
			end
			if tmp_sec == nil then
				dbg.printf("================IPTV PANIC: wan device not found=================")
			end
		end
	end
    
	if tmp_sec ~= nil then
		uci_c:set(cfg, tmp_sec, opt, val or "")
	else
		uci_c:set(cfg, sec, opt, val or "")
	end

	-- all these params are runtime params
	-- no need to save to flash,
	-- the test shows that we write 38 times flash when we config iptv
	uci_c:commit_without_write_flash(cfg)

	-- verify the file of tmp/iptv_state is existed or not
	-- not existed -> DUT start, no need to save flash
	-- existed     -> page operation, need to save flash
    --local file,err=io.open("/tmp/iptv_state")
    --if file == nil then
    --uci_c:commit_without_write_flash(cfg)
    --else
    --    uci_c:commit(cfg)
    --end
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

