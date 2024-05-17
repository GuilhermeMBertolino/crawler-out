-- traffic_meter.html::onClick_refresh_button() event

local M = {}
local uci = require "luci.model.uci".cursor()
local validator = require "commonFunc.validator"
local log = require "luci.log"

local isAuth


local tmUpdateStatistic_maps =
{
}

function M.tmUpdateStatistic_handler(json)

	log.print("[TM_GUI] json.action = tmUpdateStatistic!")

	os.execute("kill -USR2 `pidof ntgr_trafficmeter`")

	return {status="success", message="Finish Traffic Meter tmUpdateStatistic"}
end

return M
