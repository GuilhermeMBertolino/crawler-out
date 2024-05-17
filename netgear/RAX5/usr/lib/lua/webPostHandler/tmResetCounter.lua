-- Set functions for Traffic Meter

local M = {}
local uci = require "luci.model.uci".cursor()
local validator = require "commonFunc.validator"
local log = require "luci.log"

local isAuth


local tmResetCounter_maps=
{
}

function M.tmResetCounter_handler(json)

	log.print("[TM_GUI] json.action = tmResetCounter!")
	os.execute("kill -INT `pidof ntgr_trafficmeter`")

	log.print("[TM_GUI] json.action = tmUpdateStatistic!")
	os.execute("kill -USR2 `pidof ntgr_trafficmeter`")

	return {status="success", message="Finish Traffic Meter tmResetCounter"}
end

return M
