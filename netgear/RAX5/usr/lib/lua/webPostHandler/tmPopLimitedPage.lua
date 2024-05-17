-- Set functions for Traffic Meter

local M = {}
local uci = require "luci.model.uci".cursor()
local validator = require "commonFunc.validator"
local log = require "luci.log"

local isAuth


local tmPopLimitedPage_maps=
{
}

function M.tmPopLimitedPage_handler(json)

	log.print("[TM_GUI] json.action = tmPopLimitedPage in '/usr/lib/lua/webPostHandler/tmPopLimitedPage.lua' !")

	uci:set("tm", "tm_control", "warterMarkStatus", "5")
	uci:commit("tm")

	os.execute("/etc/init.d/traffic_meterd reload")

	return {status="success", message="Finish Traffic Meter tmPopLimitedPage"}
end

return M
