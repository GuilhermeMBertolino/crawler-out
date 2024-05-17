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

function wanPptpSetup_validator(parm, value)
    -- custom handler function only be called at default datatype validate fail.
    local ret = false;
	
	if(parm == "ipAddr") then
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

local wan_pptp_setup_maps =
    {
		username	=	{ data_type = "ppp_user",     handler = nil },
		password	=	{ data_type = "ppp_pwd",     handler = nil },
		mode	=	{ data_type = "ppp_mode",     handler = nil },
		idleTimeout	=	{ data_type = "ppp_idletime",     handler = nil },
		ipType	=	{ data_type = "addr_assign",     handler = nil },
		ipAddr	=	{ data_type = "ipv4_addr",     handler = wanPptpSetup_validator },
		netmask	=	{ data_type = "ipv4_netmask",     handler = wanPptpSetup_validator },
		serverAddr	=	{ data_type = "server_address",     handler = nil },
		gateway	=	{ data_type = "ipv4_addr",     handler = wanPptpSetup_validator },
		dnsType	=	{ data_type = "addr_assign",     handler = nil },
		dns1	=	{ data_type = "ipv4_dns",     handler = wanPptpSetup_validator },
		dns2	=	{ data_type = "ipv4_dns",     handler = wanPptpSetup_validator },
		macClone	=	{ data_type = "mac_clone",     handler = nil },
		cloneMac	=	{ data_type = "mac_addr",     handler = nil }
    };

---------------------------------------------------------------------------------------------------
function M.wanPPTP_handler(json)
	log.debug(0)
	log.print_r(json)
	--{"function":"wanPPTP","data":{"login_type":"PPTP","username":"admin","password":"changeme","mode_autoid":"Always On","mode":"always","idleTimeout":"5","ipType":"dynamic","ipAddr":"false","netmask":"false","serverAddr":"111.2.1.4","gateway":"0.0.0.0","connectId":"0","dnsType":"fixed","dns1":"168.95.1.1","dns2":"168.95.192.1","macClone":"default","cloneMac":"00:00:00:00:00:00"}}
	--log.print("wanPPTP:", json.login_type, json.username, json.password, json.mode_autoid, json.mode, json.idleTimeout, json.ipType, json.ipAddr, json.netmask, json.gateway, json.serverAddr, json.connectId, json.dnsType, json.dns1, json.dns2, json.macClone, json.cloneMac)

	--1. Data validation
	local wan_mode, proto, iptype, ipaddr, netmask, gateway
	local username, password, keepalive, mode, idle_timeout, server, connectid
	local dnstype, dns1, dns2
	local mac_clone, mac_addr
	
	if(json.login_type == "PPTP") then
		wan_mode = "PPTP"
	else
		return {status="failure", message="WAN(PPTP) Setup Failure - login_type error"}
	end

	proto =  "pptp"
	username = json.username
	password = json.password
	mode = json.mode
	server = json.serverAddr
	connectid =  json.connectId
	if(mode == "onDemand") then
		idle_timeout = json.idleTimeout
	end
	
	iptype = json.ipType
	if(iptype == "fixed") then
		--fixed ip
		is_static_ip = true
		ipaddr = json.ipAddr
		netmask = json.netmask
		gateway = json.gateway
	elseif(iptype ~= "dynamic") then
		return {status="failure", message="WAN(PPTP) Setup Failure - ipType error"}
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
    if (validator.post_data_validate(json, wan_pptp_setup_maps) == false) then
        log.print("Failed to parse the input JSON data!!!");
        return {status="error", message=tostring(json) };
    end
	
	-- MTU settings
	wanCommon.wanCheckMtu(uci, wan_mode)

	--2. Save config and then apply 
	-- saved config
	uci:set("network", "inet_global", "wan_mode", "PPTP")
	uci:set("network", "inet_pptp", "proto", proto)
	uci:set("network", "inet_pptp", "username", username)
	uci:set("network", "inet_pptp", "password", password)
	uci:set("network", "inet_pptp", "server", server)
	uci:set("network", "inet_pptp", "connectid", connectid or "") -- ToDo: save but not use
	uci:set("network", "inet_pptp", "conn_mode", mode)
	if(mode == "onDemand") then
		uci:set("network", "inet_pptp", "idle_timeout", idle_timeout)
	end
	
	uci:set("network", "inet_pptp", "iptype", iptype)
	if(iptype == "fixed") then
		-- saved config
		uci:set("network", "inet_pptp", "ipaddr",  ipaddr)
		uci:set("network", "inet_pptp", "netmask", netmask)
		uci:set("network", "inet_pptp", "gateway", gateway)
	else -- dynamic
		-- saved config
		uci:delete("network", "inet_pptp", "ipaddr")
		uci:delete("network", "inet_pptp", "netmask")
		uci:delete("network", "inet_pptp", "gateway")
		-- set run-time config
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
 
	--For wizard get Internet status on dial on demand mode
	wanCommon.pingTriggerDialonDemand(uci, json.mode)

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

	return {status="success", message="Finish WAN(PPTP) Setup"}
end

return M
