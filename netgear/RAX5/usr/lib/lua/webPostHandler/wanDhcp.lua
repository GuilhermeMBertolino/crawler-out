-- Licensed to the public under the Apache License 2.0.
local M = {}
local os     = require "os"
local uci    = require "luci.model.uci".cursor()
local sys    = require "luci.sys"
local fork = require "commonFunc.fork"
local log    = require "luci.log"
local opMode = uci:get("network", "@opmode[0]", "mode")

function M.wanDhcp_handler(json)
	log.debug(0)
	log.print_r(json)
	--{"function":"wanDhcp","data":{"action":"release"}}
	log.print("wanDhcp:", json.action)

	--1. Data validation
	--wan mode should be DHCP
	local wanMode = uci:get("network", "inet_global", "wan_mode")
	if(opMode == "router" and wanMode ~= "DHCP") then
		return {status="failure", message="WAN mode error !"}
	end
	
	--2. execute action
	-- json.action should be "release" or "renew"
	if(json.action == "release") then
		-- only support release at router mode
		if(opMode == "router") then
			fork.fork_exec("kill -SIGUSR2 `cat /var/run/udhcpc-eth1.pid`")
		else
			return {status="failure", message="Action doesn't support !"}
		end
	elseif(json.action == "renew") then
		if(opMode == "router") then
			fork.fork_exec("kill -SIGUSR1 `cat /var/run/udhcpc-eth1.pid`")
		elseif(opMode == "ap") then
			fork.fork_exec("kill -SIGUSR1 `cat /var/run/udhcpc-br-lan.pid`")
		else
			return {status="failure", message="Action doesn't support !"}
		end
	else
		return {status="failure", message="Action Failed !"}
	end
	return {status="success", message="Action Done !"}
end

return M
