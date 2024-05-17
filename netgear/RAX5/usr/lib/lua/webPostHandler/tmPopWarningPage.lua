-- Set functions for Traffic Meter

local M = {}
local uci = require "luci.model.uci".cursor()
local validator = require "commonFunc.validator"
local log = require "luci.log"

local isAuth


local tmPopWarningPage_maps=
{
}

function M.tmPopWarningPage_handler(json)

	log.print("[TM_GUI] json.action = tmPopWarningPage in '/usr/lib/lua/webPostHandler/tmPopWarningPage.lua' !")

	uci:set("tm", "tm_control", "warterMarkStatus", "2")
	uci:commit("tm")

	os.execute("/etc/init.d/traffic_meterd reload")

	return {status="success", message="Finish Traffic Meter tmPopWarningPage"}
end

return M
