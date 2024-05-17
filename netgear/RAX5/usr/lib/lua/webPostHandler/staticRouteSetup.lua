-- Set functions for static route
local M = {}
local os = require "os"
local uci = require "luci.model.uci".cursor()
local json = require "luci.json"
local sys = require "luci.sys"
local validator = require "commonFunc.validator"
local log = require "luci.log"
local netUtils = require "commonFunc.netUtils"
local interface

local function checkGatewayIp(iface, setAddr)
	local cmd = "ifstatus "..iface.." 2>/dev/null"
	local ifStatus = luci.sys.exec(cmd)
	local jsonStatus = json.decode(ifStatus)
	local address
	local mask

	if(jsonStatus["ipv4-address"] and jsonStatus["ipv4-address"][1] and jsonStatus["ipv4-address"][1]["address"]) then
		address = jsonStatus["ipv4-address"][1]["address"]
	end

	if(jsonStatus["ipv4-address"] and jsonStatus["ipv4-address"][1] and jsonStatus["ipv4-address"][1]["mask"]) then
		mask = jsonStatus["ipv4-address"][1]["mask"]
	end

	setAddr = tostring(setAddr)
	address = tostring(address)
	mask = tonumber(mask)

	local setAddr4 = {string.match(setAddr, '(%d+)%.(%d+)%.(%d+)%.(%d+)')}
	local gwAddr4 = {string.match(address, '(%d+)%.(%d+)%.(%d+)%.(%d+)')}

	if mask > 0 and mask <= 8 and setAddr4[1] == gwAddr4[1] then
		return true
	elseif mask > 8 and mask <= 16 and setAddr4[1] == gwAddr4[1] and setAddr4[2] == gwAddr4[2] then
		return true
	elseif mask > 16 and mask <= 24 and setAddr4[1] == gwAddr4[1] and setAddr4[2] == gwAddr4[2] and setAddr4[3] == gwAddr4[3] then
		return true
	elseif mask > 24 and setAddr4[1] == gwAddr4[1] and setAddr4[2] == gwAddr4[2] and setAddr4[3] == gwAddr4[3] and setAddr4[4] == gwAddr4[4] then
		return true
	end

	return false
end

local function updateTargetIp(destIpAddr, subnetMask)
	local target = {string.match(destIpAddr, '(%d+)%.(%d+)%.(%d+)%.(%d+)')}
	local netmask = {string.match(subnetMask, '(%d+)%.(%d+)%.(%d+)%.(%d+)')}
	local targetIp = destIpAddr

	if netmask[4] ~= "255" then
		target[4] = 0
		if netmask[3] ~= "255" then
			target[3] = 0
			if netmask[2] ~= "255" then
				target[2] = 0
				if netmask[1] ~= "255" then
					target[1] = 0
				end
			end
		end
		targetIp = target[1].."."..target[2].."."..target[3].."."..target[4]
	end

	return targetIp
end

local function getRouteNum(target)
	local count = 0

	uci:foreach("network", "route",
		function(s)
			if s.target == target then
				count = -1
			end
			if count ~= -1 then
				count = count + 1
			end
		end)

	return count
end

function staticRouteSetup_validator(parm, value)
	local ret = false

	-- SPEC: The next gateway is not necessary on the same subnet as one of the router’s interfaces when users apply the settings,
	--       this is because the Internet interface may not be up when users configure the router.
	--if parm == "gateway" then
	--	ret = checkGatewayIp(interface, value)
	if parm == "subnetMask" and value == "255.255.255.255" then
		ret = true
	end

	return ret
end

local staticRouteSetup_maps =
{
	action = { data_type = "action", handler = nil },
	isPrivate = { data_type = "boolean", handler = nil },
	isActive = { data_type = "boolean", handler = nil },
	gateway = { data_type = "ipv4_addr", handler = nil },
	destIpAddr = { data_type = "ipv4_addr", handler = nil },
	subnetMask = { data_type = "ipv4_netmask", handler = staticRouteSetup_validator },
	metric = { data_type = "route_metric", handler = nil }
}

function M.staticRouteSetup_handler(json)
	local route
	local disabled
	local target = updateTargetIp(json.destIpAddr, json.subnetMask)
	if json.isPrivate == "true" then
		interface = "lan"
	else
		interface = "wan"
	end
	if json.isActive == "true" then
		disabled = "0"
	else
		disabled = "1"
	end

	if validator.post_data_validate(json, staticRouteSetup_maps) == false then
		return {status="error", message=tostring(json)}
	end

	if json.action == "add" then
		local num = getRouteNum(json.destIpAddr)
		if num ~= -1 then
			uci:add("network", "route")
			route = string.format("@route[%d]", num)
			uci:set("network", route, "target", target)
			uci:set("network", route, "interface", interface)
			uci:set("network", route, "netmask", json.subnetMask)
			uci:set("network", route, "gateway", json.gateway)
			uci:set("network", route, "metric", json.metric)
			uci:set("network", route, "name", json.routeName)
			uci:set("network", route, "disabled", disabled)
			uci:commit("network")
		end
	elseif json.action == "edit" then
		route = string.format("@route[%d]", json.iid)
		uci:set("network", route, "target", target)
		uci:set("network", route, "interface", interface)
		uci:set("network", route, "netmask", json.subnetMask)
		uci:set("network", route, "gateway", json.gateway)
		uci:set("network", route, "metric", json.metric)
		uci:set("network", route, "name", json.routeName)
		uci:set("network", route, "disabled", disabled)
		uci:commit("network")
	elseif json.action == "delete" then
		route = string.format("@route[%d]", json.iid)
		uci:delete("network", route)
		uci:commit("network")
	end
	
	table.insert(changed_config, "network")
	--execute("/etc/init.d/network restart")

	return {status="success", message="Finish Static Route Setup"}
end

return M
