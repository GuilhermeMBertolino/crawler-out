-- Get functions for AP Mode
local M = {}

local uci  = require "luci.model.uci".cursor()
local json = require "luci.json"
local sys  = require "luci.sys"
local util = require "luci.util"
local netUtils = require "commonFunc.netUtils"
require "commonFunc.wifiUtils_commDefs"

local opMode = uci:get("network", "@opmode[0]", "mode")
local ifstatus = (opMode == "router") and sys.exec("ifstatus wan 2>/dev/null") or sys.exec("ifstatus lan 2>/dev/null")
local opstatus = json.decode(ifstatus)

function M.getIpType(mode)
	local iptype
	if (mode == "ap") then
		iptype = uci:get("network", "op_ap", "ipType")
	elseif (mode == "bridge") then
		iptype = uci:get("network", "op_br", "ipType")
	end
	if(iptype == nil or iptype == "") then
		iptype = "dynamic"
	end
	return iptype
end

function M.getIpAddr(mode)
	local iptype = M.getIpType(mode)
	local ip
	if(iptype == "fixed") then
		--get saved ip
		if (mode == "ap") then
			ip = uci:get("network", "op_ap", "ipaddr")
		elseif (mode == "bridge") then
			ip = uci:get("network", "op_br", "ipaddr")
		end
	else
		--dynamic ip, still need to return current ip address for GUI display
		if (opstatus and opstatus["ipv4-address"] and opstatus["ipv4-address"][1] and opstatus["ipv4-address"][1]["address"]) then
			ip = opstatus["ipv4-address"][1]["address"]
		end
	end
	if(ip == nil) then
		ip = ""
	end
	return ip
end

function M.getIpMask(mode)
	local iptype = M.getIpType(mode)
	local mask
	if(iptype == "fixed") then
		--get saved ip
		if (mode == "ap") then
			mask = uci:get("network", "op_ap", "netmask")
		elseif (mode == "bridge") then
			mask = uci:get("network", "op_br", "netmask")
		end
	else
		--dynamic ip, still need to return current ip address for GUI display
		if (opstatus and opstatus["ipv4-address"] and opstatus["ipv4-address"][1] and opstatus["ipv4-address"][1]["mask"]) then
			-- need to convert bits-number into dot-decimal format
			mask= netUtils.convert_bits_mask_to_dot_decimal(opstatus["ipv4-address"][1]["mask"])
		end
	end
	if(mask == nil) then
		mask = ""
	end
	return mask
end

function M.getGateway(mode)
	local iptype = M.getIpType(mode)
	local gw
	if(iptype == "fixed") then
		--get saved ip
		if (mode == "ap") then
			gw = uci:get("network", "op_ap", "gateway")
		elseif (mode == "bridge") then
			gw = uci:get("network", "op_br", "gateway")
		end
	else
		--dynamic ip, still need to return current ip address for GUI display
		if (opstatus and opstatus["route"] and opstatus["route"][1] and opstatus["route"][1]["target"]) then 
			gw = opstatus["route"][1]["target"]
			if(gw == "0.0.0.0") then
				gw = opstatus["route"][1]["nexthop"]
			end
		end
	end
	if(gw == nil or gw == "0.0.0.0") then
		gw = ""
	end
	return gw
end

function M.getDNStype(mode)
	local dnstype
	if (mode == "ap") then
		--dnsType is not saved as AP Mode
		dnstype = uci:get("network", "op_ap", "ipType")
	elseif (mode == "bridge") then
		dnstype = uci:get("network", "op_br", "dnsType")
	end
	if(dnstype == nil or dnstype == "") then
		dnstype = "dynamic"
	end
	return dnstype
end

function M.getDNSServer(mode, idx)
	local dnsType = M.getDNStype(mode)
	local dns
	if(dnsType == "fixed") then
		if (mode == "ap") then
			dns = uci:get("network", "op_ap", "dns"..idx)
		elseif (mode == "bridge") then
			dns = uci:get("network", "op_br", "dns"..idx)
		end
	else
		if(opstatus and opstatus["dns-server"] and opstatus["dns-server"][tonumber(idx)]) then
			dns = opstatus["dns-server"][tonumber(idx)]
		end
	end
	if(dns == nil or dns == "0.0.0.0") then
		dns = ""
	end
	return dns
end

function M.getBridgeMode_wifiIF()
	local wifiIF = uci:get("network", "op_br", "wifiIF")
	if(wifiIF == nil and wifiIF == "") then
		wifiIF = "2G"
	end
	return wifiIF
end

-- Show RX_Rate in Web GUI now, call getBridgeMode_ConnectionStatus(1) if we want to show TX_Rate in Web GUI
function M.getBridgeMode_LinkRate(isTX)
	local linkRate = "0 Mbps"
	if M.getBridgeMode_ConnectionStatus() == "Connected" then
		local ifname = MTK_DEF_2G_PRIMARY_IFNAME
		if (M.getBridgeMode_wifiIF() == "5G") then
			ifname = MTK_DEF_5G_PRIMARY_IFNAME
		end
		local txrxRate = luci.sys.exec("iwpriv " .. ifname .. " pega_show stainfo=0 | tail -n 2 | awk -F ' ' '{print$14}'| tr -d '\n'")
		if txrxRate and txrxRate ~= "" then
			local rate = util.split(txrxRate, "/") --TX_Rate/RX_Rate
			if isTX and isTX == 1 then
				linkRate = rate[1] .. " Mbps"
			else
				linkRate = rate[2] .. " Mbps"
			end
		end
	end
	return linkRate
end

function M.getBridgeMode_ConnectionStatus()
	local status = "Connected"
	local ifname = MTK_DEF_2G_CLIENT_IFNAME
	local essid
	if (M.getBridgeMode_wifiIF() == "5G") then
		ifname = MTK_DEF_5G_CLIENT_IFNAME
	end
	essid = luci.sys.exec("iwconfig " .. ifname .. " | grep 'ESSID:\"\"'")
	if essid and essid ~= "" then
		status = "Not connected"
	end
	return status
end

-- For WLG_ap_bridge_wlan.html (wireless_apmode_bridge_wlan_data.plua)
function M.getSelectVal_wifiIF()
	local selectVal
	local wifiIF = uci:get("network", "op_br", "wifiIF")
	if(wifiIF ~= nil and wifiIF == "5G") then
		selectVal = "Wireless Network(5GHz a/n/ac/ax)"
	else
		selectVal = "Wireless Network(2.4GHz b/g/n/ax)"
	end
	return selectVal
end

--[[ For WLG_ap_dual_band.html, but nobody reference this page
function M.getCheckboxVal_apmode_enable()
	--TODO
	return "true"
end
--]]

return M

