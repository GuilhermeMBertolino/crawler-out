-- Licensed to the public under the Apache License 2.0.
local M = {}
local os     = require "os"
local uci    = require "luci.model.uci".cursor()
local sys    = require "luci.sys"
local wanCommon = require "webPostHandler.wanCommon"
local log    = require "luci.log"
local validator = require "commonFunc.validator"

local is_static_ip = false
local is_static_dns = false

function wanPppoeSetup_validator(parm, value)
    -- custom handler function only be called at default datatype validate fail.
    local ret = false;
	
	if(parm == "ipAddr") then
--        log.console("Run ipAddr validator");
		if(is_static_ip == false and wanCommon.isFalseOrEmpty(value) == true) then
			-- dynamic ip, we don't save ipAddr, allow empty value
			ret = true
		end
	elseif(parm == "dns1") then
--        log.console("Run dns1 validator");
		if(is_static_dns == false and wanCommon.isFalseOrEmpty(value) == true) then
			-- dynamic dns, we don't save dns1, allow empty value
			ret = true
		end
	elseif(parm == "dns2") then
--        log.console("Run dns2 validator");
		if(is_static_dns == false and wanCommon.isFalseOrEmpty(value) == true) then
			-- dynamic dns, we don't save dns2, allow empty value
			ret = true
		elseif(wanCommon.isFalseOrEmpty(value) == true) then
			-- static dns, allow empty dns2
			ret = true
		end
	elseif(parm == "serviceName") then
--        log.console("Run serviceName validator");
		if(wanCommon.isFalseOrEmpty(value) == true) then
			-- allow empty serviceName
			ret = true
		end
	elseif(parm == "password") then
--        log.console("Run password validator");
		if(wanCommon.isFalseOrEmpty(value) == true) then
			-- allow empty password
			ret = true
		end
	end
    return ret;
end

local wan_pppoe_setup_maps =
    {
		username	=	{ data_type = "ppp_user",     handler = nil },
		password	=	{ data_type = "ppp_pwd",     handler = wanPppoeSetup_validator },
		serviceName	=	{ data_type = "service_name",     handler = wanPppoeSetup_validator },
		mode	=	{ data_type = "ppp_mode",     handler = nil },
		idleTimeout	=	{ data_type = "ppp_idletime",     handler = nil },
		ipType	=	{ data_type = "addr_assign",     handler = nil },
		ipAddr	=	{ data_type = "ipv4_addr",     handler = wanPppoeSetup_validator },
		dnsType	=	{ data_type = "addr_assign",     handler = nil },
		dns1	=	{ data_type = "ipv4_dns",     handler = wanPppoeSetup_validator },
		dns2	=	{ data_type = "ipv4_dns",     handler = wanPppoeSetup_validator },
		macClone	=	{ data_type = "mac_clone",     handler = nil },
		cloneMac	=	{ data_type = "mac_addr",     handler = nil }
    };

---------------------------------------------------------------------------------------------------
function M.wanPPPoE_handler(json)
	log.debug(0)
	log.print_r(json)
	--{"function":"wanPPPoE","data":{"login_type":"PPPoE","username":"aaa","password":"aaa","serviceName":"aabb","mode_autoid":"Dail on Demand","mode":"onDemand","idleTimeout":"5","ipType":"dynamic","ipAddr":"0.0.0.0","dnsType":"dynamic","dns1":"false","dns2":"","macClone":"default","cloneMac":"00:00:00:00:00:00"}}
	log.print("wanPPPoE:", json.login_type, json.username, json.password, json.serviceName, json.mode_autoid, json.mode, json.idleTimeout, json.ipType, json.ipAddr, json.dnsType, json.dns1, json.dns2, json.macClone, json.cloneMac)

	--1. Data validation
	local wan_mode, proto, iptype, ipaddr
	local username, password, service, mode, idle_timeout
	local dnstype, dns1, dns2
	local mac_clone, mac_addr
	
	if(json.login_type == "PPPoE") then
		wan_mode = "PPPoE"
	else
		return {status="failure", message="WAN(PPPoE) Setup Failure - login_type error"}
	end

	proto =  "pppoe"
	username = json.username
	password = json.password
	service = json.serviceName
	mode = json.mode
	if(mode == "onDemand") then
		idle_timeout = json.idleTimeout
	end
	
	iptype = json.ipType
	if(iptype == "fixed") then
		--fixed ip
		is_static_ip = true
		ipaddr = json.ipAddr
	elseif(iptype ~= "dynamic") then
		return {status="failure", message="WAN(PPPoE) Setup Failure - ipType error"}
	end
	
	dnstype = json.dnsType
	if(dnstype == "fixed") then
		--fixed dns
		is_static_dns = true
		dns1 = json.dns1
		dns2 = json.dns2
	end
	
	mac_clone = json.macClone
	--if(mac_clone == "user") then
		mac_addr = json.cloneMac
	--end

	--check validation of data format 
	if (validator.post_data_validate(json, wan_pppoe_setup_maps) == false) then
        log.print("Failed to parse the input JSON data!!!");
        return {status="error", message=tostring(json) };
    end

	-- MTU settings
	wanCommon.wanCheckMtu(uci, wan_mode)

	--2. Save config
	-- saved config
	uci:set("network", "inet_global", "wan_mode", wan_mode)
	uci:set("network", "inet_pppoe", "proto", proto)
	uci:set("network", "inet_pppoe", "username", username)
	if(password ~= nil) then
		uci:set("network", "inet_pppoe", "password", password)
	else
		uci:set("network", "inet_pppoe", "password", "")
	end
	uci:set("network", "inet_pppoe", "service", service)
	uci:set("network", "inet_pppoe", "conn_mode", mode)
	if(mode == "onDemand") then
		uci:set("network", "inet_pppoe", "idle_timeout", idle_timeout)
	end
	
	uci:set("network", "inet_pppoe", "iptype", iptype)
	if(iptype == "fixed") then
		-- saved config
		uci:set("network", "inet_pppoe", "ipaddr",  ipaddr)
	else -- dynamic
		-- saved config
		uci:delete("network", "inet_pppoe", "ipaddr")
	end

	--3. Save global settings (dns/mac_clone)
	-- save DNS settings
	wanCommon.wanConfig_DNS(uci, dnstype, dns1, dns2)
	-- save MAC clone settings
	wanCommon.wanConfig_MacClone(uci, mac_clone, mac_addr)
	
	--4. Reload config and then apply
	wanCommon.wanConfig_Reload(uci)
	--commit settings
	uci:commit("network")

	--apply the settings
	--post function must use table.insert(changed_config, "xxxx") to replace uci:apply("xxxx")
	table.insert(changed_config, "network")

	-- When VPN Service is enabled and DDNS is not enabled, user changes the Internet connection type from static ip to others, 
	-- disable the VPN Service since VPN Service needs the static ip address or DDNS
	if ( json.disableVPN == "1" ) then
		-- set /etc/config/openvpn to disable OpenVPN
		uci:set("openvpn", "openvpn_tun", "enabled", "0")
		uci:set("openvpn", "openvpn_tap", "enabled", "0")
		--commit openvpn settings
		uci:commit("openvpn")

		-- set /etc/config/firewall to delete iptables rules to disallow openvpn connection packets
		uci:set("firewall", "openvpn_tun", "enabled", "0")
		uci:set("firewall", "openvpn_tap", "enabled", "0")
		--commit firewall settings
		uci:commit("firewall")

		--apply the settings
		table.insert(changed_config, "openvpn")
		table.insert(changed_config, "firewall")
	end

	return {status="success", message="Finish WAN(PPPoE) Setup"}
end

return M
