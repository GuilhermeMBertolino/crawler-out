-- Set functions for Traffic Meter

local M = {}
local uci = require "luci.model.uci".cursor()
local validator = require "commonFunc.validator"
local log = require "luci.log"

local isAuth

local trafficMeterSetup_maps =
{

	counterHour = { data_type = "email_hour", handler = nil },
	counterMin = { data_type = "email_minute", handler = nil },

	enable = { data_type = "boolean", handler = nil },
	tm_type = { data_type = "tm_contrltype", handler = nil },
	volControl = { data_type = "boolean", handler = nil },
	timeControl = { data_type = "boolean", handler = nil },
	volControlType = { data_type = "vol_contrltype", handler = nil },
	turnLed = { data_type = "boolean", handler = nil },
	disableInternet = { data_type = "boolean", handler = nil },
}

function M.trafficMeterSetup_handler(json)
	log.debug(0)
        log.print("json.enable="..json.enable)

        log.print("json.tm_type = "..json.tm_type)
        log.print("json.volControlType = "..json.volControlType)
        log.print("json.volControl = "..json.volControl)
        log.print("json.volMonthlyLimit = "..json.volMonthlyLimit)
        log.print("json.volRoundUp = "..json.volRoundUp)
        log.print("json.timeControlLimit = "..json.timeControlLimit)

        log.print("json.amPmSel = "..json.amPmSel)

        log.print("json.counterDay = "..json.counterDay)
        log.print("json.counterHour = "..json.counterHour)
        log.print("json.counterMin = "..json.counterMin)
        log.print("json.popMessage = "..json.popMessage)
        log.print("json.turnLed = "..json.turnLed)
        log.print("json.disableInternet = "..json.disableInternet)


	if validator.post_data_validate(json, trafficMeterSetup_maps) == false then
		return {status="error", message=tostring(json)}
	end

	uci:set("tm", "tm_control", "traffic_on", json.enable)
	uci:set("tm", "tm_control", "contrl_type", json.volControlType)

	if json.tm_type == "volControl" then
	    uci:set("tm","tm_control", "volcontrl", "true")
	    uci:set("tm","tm_control", "timecontrl", "false")
	    uci:set("tm","tm_control", "volume_monthly_limit", json.volMonthlyLimit)
	    uci:set("tm","tm_control", "round_up_volume", json.volRoundUp)
	elseif json.tm_type == "timeControl" then
	    uci:set("tm","tm_control", "volcontrl", "false")
	    uci:set("tm","tm_control", "timecontrl", "true")
	    uci:set("tm","tm_control", "conntime_monthly_limit", json.timeControlLimit)
	end

	uci:set("tm","tm_control", "ampm_sel", json.amPmSel)

	if json.amPmSel == "false" then
	    hour = json.counterHour
	else
	    hour = json.counterHour+12
	end

	uci:set("tm","tm_control", "day", json.counterDay)
	uci:set("tm","tm_control", "hour", json.counterHour)
	uci:set("tm","tm_control", "min", json.counterMin)

	uci:set("tm", "tm_control", "waterMark", json.popMessage)
	uci:set("tm", "tm_control", "led_on", json.turnLed)
	uci:set("tm", "tm_control", "block_on", json.disableInternet)

	uci:commit("tm")

	table.insert(changed_config, "tm")
	-- Using ucitrack mechanism to handle below update:
	--   TmHandleConfigUpdate()
	--   bcm_dm_WriteStatistic()

	return {status="success", message="Finish Traffic Meter Setup"}
end

return M
