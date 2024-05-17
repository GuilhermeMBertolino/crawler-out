-- Licensed to the public under the Apache License 2.0.
local M = {}
local uci    = require "luci.model.uci".cursor()
local log    = require "luci.log"
local v6disable = require "webPostHandler.ipv6Disable"

log.debug(0)

function M.ipv6Passthrough_handler(json)
    --log.console_r(json)
    --wan
    v6disable.checkIpv6TypeChange(json["v6Type"])
    uci:set("network", "wan_v6", "proto", "none")
    uci:set("network", "wan_v6", "conntype", json["v6Type"])
    uci:set("network", "wan_v6pthru", "interface")
    uci:set("network", "wan_v6pthru", "ifname", "eth1")
    uci:set("network", "wan_v6pthru", "proto", "v6passthru")
    uci:set("network", "wan_v6pthru", "passthru_ifname", "pthru_ipv6")
    --lan
    uci:set("dhcp", "lan", "dhcpv6", "disabled")
    uci:set("dhcp", "lan", "ra", "disabled")
    --commit & apply the settings
	uci:commit("network")
    uci:commit("dhcp")
    --post function must use table.insert(changed_config, "xxxx") to replace uci:apply("xxxx")
    table.insert(changed_config, "network")

	return {status="success", message="Finish IPv6 Setup"}
end

return M