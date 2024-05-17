-- Licensed to the public under the Apache License 2.0.
local M = {}
local uci    = require "luci.model.uci".cursor()
local log    = require "luci.log"
local v6 = require "webPostHandler.ipv6AutoConfig"

log.debug(0)

function M.ipv6Dhcp_handler(json)
    log.console_r(json)
	return v6.ipv6AutoConfig_handler(json)
end

return M