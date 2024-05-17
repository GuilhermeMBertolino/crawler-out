-- functions for getting internet status
local M = {}

local log = require "luci.log" -- for debug
local uci  = require "luci.model.uci".cursor()
local json = require "luci.json"
local sys  = require "luci.sys"
local netUtils = require "commonFunc.netUtils"

local wanMode = uci:get("network", "inet_global", "wan_mode")
local opMode = uci:get("network", "@opmode[0]", "mode")

-- init the current wan(inet) status table
local function getCurrentWanStatus()
	local ifstatusCmd 
	if (opMode ~= "router") then
		ifstatusCmd  = "ifstatus lan 2>/dev/null"
	elseif(wanMode == "L2TP") then
		ifstatusCmd  = "ifstatus l2tp 2>/dev/null"
	elseif(wanMode == "PPTP") then
		ifstatusCmd  = "ifstatus pptp 2>/dev/null"
	else
		ifstatusCmd  = "ifstatus wan 2>/dev/null"
	end

	local ifstatusRlt = luci.sys.exec(ifstatusCmd)
	return json.decode(ifstatusRlt)
end

local wan_status_t = getCurrentWanStatus()
local function getWanPortStatus()
	if(wan_status_t == nil) then
		return "down"
	end
	if(wan_status_t["up"] == true) then
		return "up"
	end
	return "down"
end

function M.getWizardInternetStatus()
	if(getWanPortStatus() == "down") then
		return "down"
	end
	local pingStatus = luci.sys.exec("ping -c 1 netgear.com>/dev/null;echo $?")
	if(tonumber(pingStatus) == 0) then
		return "up"
	end
	return "down"
end

function M.getTextVal_wanPortConnectTime()
	if(getWanPortStatus() == "down" or wan_status_t["uptime"] == nil) then
		return "--:--:--"
	end
	local uptime = tonumber(wan_status_t["uptime"])
	local hh = math.modf(uptime/3600)
	local mm = math.modf((uptime%3600)/60)
	local ss = uptime%60
	local connTime = string.format("%02d:%02d:%02d", hh, mm, ss)
	
	return connTime
end

function M.getTextVal_wanPortConnectStatus()
	if(getWanPortStatus() == "down") then
		return "disconnected"
	end
	return "connected"
end

function M.getTextVal_negotiationStatus()
	if(getWanPortStatus() == "down") then
		return "---"
	end
	return "Success"
end

function M.getTextVal_authStatus()
	if(getWanPortStatus() == "down") then
		return "---"
	end
	return "Success"
end

function M.getInet_IpAddr()
	local ipAddr = ""
	if(getWanPortStatus() == "down") then
		return ""
	end
	if(wan_status_t["ipv4-address"] and wan_status_t["ipv4-address"][1] and wan_status_t["ipv4-address"][1]["address"]) then
		ipAddr = wan_status_t["ipv4-address"][1]["address"]
	end

	return ipAddr
end

function M.getInet_subnetMask()
	local wan_mask = ""
	if(getWanPortStatus() == "down") then
		return ""
	end
	if(wan_status_t["ipv4-address"] and wan_status_t["ipv4-address"][1] and wan_status_t["ipv4-address"][1]["mask"]) then
			-- need to convert bits-number into dot-decimal format
			wan_mask= netUtils.convert_bits_mask_to_dot_decimal(wan_status_t["ipv4-address"][1]["mask"])
	end

	return wan_mask
end

function M.getInet_Gateway()
	local wan_gw = ""
	if(getWanPortStatus() == "down") then
		return ""
	end
	if(wan_status_t["route"] and wan_status_t["route"][1] and wan_status_t["route"][1]["target"]) then 
		wan_gw = wan_status_t["route"][1]["target"]
		if(wan_gw == "0.0.0.0") then
			wan_gw = wan_status_t["route"][1]["nexthop"]
		end
	end

	if(wan_gw == nil or wan_gw == "0.0.0.0") then
		wan_gw = ""
	end
	return wan_gw
end

function M.getInet_DNSServer(idx)
	local dns = ""
	if(getWanPortStatus() == "down") then
		return ""
	end
	if(wan_status_t["dns-server"] and wan_status_t["dns-server"][tonumber(idx)]) then
		dns = wan_status_t["dns-server"][tonumber(idx)]
	end
	if(dns == nil or dns == "0.0.0.0") then
		dns = ""
	end
	return dns
end

-- For RTS_wanstat.html
-------------------------------------------------------------------------------
-- Get DHCP lease time
-- @param no input parameters
-- @return one array with the information of lease time as [lease_day, lease_hour, lease_min, expire_day, expire_hour, expire_min]
function M.getDhcpLeaseTime()
	local ret = {"--","--","--","--","--","--"}
	local uptime, leasetime, lease_start_time, expire_time

	leasetime=0
	if(wan_status_t["data"] and wan_status_t["data"]["leasetime"]) then 
		-- get lease in sec
		leasetime = tonumber(wan_status_t["data"]["leasetime"])
	end

	uptime = sys.uptime()
	lease_start_time = tonumber(sys.exec("puDataStr get dhcp lease_start"))
	if(lease_start_time == nil) then
		return ret
	end

	expire_time = lease_start_time+leasetime-uptime-1

	if(expire_time > 0) then
		ret[1]=tostring(math.modf(leasetime/(24*3600)))
		ret[2]=tostring(math.modf((leasetime%(24*3600))/3600))
		ret[3]=tostring(math.modf(((leasetime%(24*3600))%3600)/60))
		ret[4]=tostring(math.modf(expire_time/(24*3600)))
		ret[5]=tostring(math.modf((expire_time%(24*3600))/3600))
		ret[6]=tostring(math.modf(((expire_time%(24*3600))%3600)/60))
	end
	return ret
end

function M.getDhcpv4Router()
	local ipAddr = ""
	if(getWanPortStatus() == "down") then
		return ""
	end
	if(wan_status_t["data"] and wan_status_t["data"]["dhcp_server"]) then 
		ipAddr = wan_status_t["data"]["dhcp_server"]
	end

	return ipAddr
end

return M
