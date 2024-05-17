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

function wanEtherSetup_validator(parm, value)
    -- custom handler function only be called at default datatype validate fail.
    local ret = false;
	
	if(parm == "domain") then
--        log.console("Run domain validator");
		if(wanCommon.isFalseOrEmpty(value) == true) then
			-- allow empty domain for ether wan 
			ret = true
		end
	elseif(parm == "ipAddr") then
--        log.console("Run ipAddr validator");
		if(is_static_ip == false and wanCommon.isFalseOrEmpty(value) == true) then
			-- dynamic ip, we don't save ipAddr, allow empty value
			ret = true
		end
	elseif(parm == "netmask") then
--        log.console("Run netmask validator");
		if(is_static_ip == false and wanCommon.isFalseOrEmpty(value) == true) then
			-- dynamic ip, we don't save nermask, allow empty value
			ret = true
		end
	elseif(parm == "gateway") then
--        log.console("Run gateway validator");
		if(is_static_ip == false and wanCommon.isFalseOrEmpty(value) == true) then
			-- dynamic ip, we don't save gateway, allow empty value
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
		
	end
    return ret;
end

local wan_ether_setup_maps =
    {
		domain	=	{ data_type = "domain_name",     handler = wanEtherSetup_validator },
		ipType	=	{ data_type = "addr_assign",     handler = nil },
		ipAddr	=	{ data_type = "ipv4_addr",     handler = wanEtherSetup_validator },
		netmask	=	{ data_type = "ipv4_netmask",     handler = wanEtherSetup_validator },
		gateway	=	{ data_type = "ipv4_addr",     handler = wanEtherSetup_validator },
		dnsType	=	{ data_type = "addr_assign",     handler = nil },
		dns1	=	{ data_type = "ipv4_dns",     handler = wanEtherSetup_validator },
		dns2	=	{ data_type = "ipv4_dns",     handler = wanEtherSetup_validator },
		macClone	=	{ data_type = "mac_clone",     handler = nil },
		cloneMac	=	{ data_type = "mac_addr",     handler = nil }
    };

---------------------------------------------------------------------------------------------------
function M.wanEtherSetup_handler(json)
	log.debug(0)
	log.print_r(json)
	--{"function":"wanEtherSetup","data":{"domain":"aaaaa","ipType":"dynamic","ipAddr":"false","netmask":"false","gateway":"false","dnsType":"dynamic","dns1":"1.1.1.1","dns2":"2.2.2.2","macClone":"default","cloneMac":"00:00:00:00:00:00"}}	
	log.print("wanEtherSetup:", json.domain, json.ipType, json.ipAddr, json.netmask, json.gateway, json.dnsType, json.dns1, json.dns2, json.macClone, json.cloneMac)

	--1. Data validation 
	local domain = json.domain
	local wan_mode, proto, iptype, ipaddr, netmask, gateway
	local dnstype, dns1, dns2
	local mac_clone, mac_addr

	iptype = json.ipType
	if(iptype == "fixed") then
		--fixed ip
		is_static_ip = true
		wan_mode = "Static"
		proto = "static"
		ipaddr = json.ipAddr
		netmask = json.netmask
		gateway = json.gateway
	elseif(iptype == "dynamic") then
		--dynamic ip
		wan_mode = "DHCP"
		proto = "dhcp"
	else
		return {status="failure", message="WAN(ether) Setup Failure - ipType error"}
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
    if (validator.post_data_validate(json, wan_ether_setup_maps) == false) then
        log.print("Failed to parse the input JSON data!!!");
        return {status="error", message=tostring(json) };
    end

	-- MTU settings
	wanCommon.wanCheckMtu(uci, wan_mode)

	--2. Save config and then apply 
	uci:set("network", "inet_ether", "domain_name", domain)
	if(iptype == "fixed") then
		--fixed ip
		-- saved config
		uci:set("network", "inet_global", "wan_mode", wan_mode)
		uci:set("network", "inet_ether", "proto", proto)
		uci:set("network", "inet_ether", "iptype", iptype)
		uci:set("network", "inet_ether", "ipaddr", ipaddr)
		uci:set("network", "inet_ether", "netmask", netmask)
		uci:set("network", "inet_ether", "gateway", gateway)
	else
		--dynamic ip
		-- saved config
		uci:set("network", "inet_global", "wan_mode", wan_mode)
		uci:set("network", "inet_ether", "proto", proto)
		uci:set("network", "inet_ether", "iptype", iptype)
	end
	
	--3. Save global settings (dns/mac_clone)
	-- save DNS settings
	wanCommon.wanConfig_DNS(uci, dnstype, dns1, dns2)
	-- save MAC clone settings
	wanCommon.wanConfig_MacClone(uci, mac_clone, mac_addr)

	--4. Reload config
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

	return {status="success", message="Finish WAN Setup"}
end

return M
