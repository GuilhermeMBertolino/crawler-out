-- Licensed to the public under the Apache License 2.0.
local M = {}
local os     = require "os"
local uci    = require "luci.model.uci".cursor()
local fork = require "commonFunc.fork"
local log    = require "luci.log"
local uci_st = require "luci.model.uci".cursor(nil, "/var/state")

function M.wanPPPConn_handler(json)
	log.debug(0)
	log.print_r(json)
	--{"function":"wanPPPConn,"data":{"action":"disconnect"}}
	log.print("wanPPPConn:", json.action)

	--1. Data validation
	--wan mode should be DHCP
	local wanMode = uci:get("network", "inet_global", "wan_mode")
	local ifname
	if(wanMode == "PPPoE") then
		ifname = "wan"
	elseif(wanMode == "PPTP") then
		ifname = "pptp"
	elseif(wanMode == "L2TP") then
		ifname = "l2tp"
	else
		return {status="failure", message="WAN mode error !"}
	end
	
	--2. execute action
	-- json.action should be "disconnect" or "connect"
	if(json.action == "disconnect") then
		uci_st:revert("network", "inet", "manual_disconnect")
		uci_st:set("network", "inet", "manual_disconnect", "1")
		uci_st:save("network")
		fork.fork_exec("ifdown "..ifname)
	elseif(json.action == "connect") then
		uci_st:revert("network", "inet", "manual_disconnect")
		uci_st:save("network")
		fork.fork_exec("ifup "..ifname)
	else
		return {status="failure", message="Action Failed !"}
	end
	return {status="success", message="Action Done !"}
end

return M
