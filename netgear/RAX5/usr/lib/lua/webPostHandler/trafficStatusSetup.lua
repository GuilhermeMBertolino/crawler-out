-- Set functions for Traffic Meter Status

local M = {}
local uci_st = require "luci.model.uci".cursor(nil, "/var/state")
local validator = require "commonFunc.validator"
local log = require "luci.log"

local isAuth

function trafficStatusSetup_validator(parm, value)
	local ret = true
	return ret
end

local trafficStatusSetup_maps =
{
	--interval = { data_type = "span_text", handler = nil },
}

function M.trafficStatusSetup_handler(json)
	--log.print("set interval val="..json.interval)
	uci_st:revert("tm","tm_statistics","interval")
	uci_st:set("tm","tm_statistics", "interval", json.interval)
	uci_st:save("tm")
	return {status="success", message="Finish Traffic Meter Status Setup"}
end

return M
