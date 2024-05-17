local M = {}

local uci    = require "luci.model.uci".cursor()
local log    = require "luci.log"
local validator = require "commonFunc.validator"
local fs = require "nixio.fs"

local function blockSchedule_validator(parm, value)
    local ret = false;
    if (parm == "startBlockTime") or (parm == "endBlockTime") then
        ret = true;
    end

    return ret;
end

local blockSchedule_maps =
    {
        isEveryDay     = { data_type = "boolean",       handler = nil },
        isMonday       = { data_type = "boolean",       handler = nil },
        isTuesday      = { data_type = "boolean",       handler = nil },
        isWednesday    = { data_type = "boolean",       handler = nil },
        isThursday     = { data_type = "boolean",       handler = nil },
        isFriday       = { data_type = "boolean",       handler = nil },
        isSaturday     = { data_type = "boolean",       handler = nil },
        isSunday       = { data_type = "boolean",       handler = nil },
        allDayBlock    = { data_type = "boolean",       handler = nil },
        startBlockTime = { data_type = "time_slot",     handler = blockSchedule_validator },
        endBlockTime   = { data_type = "time_slot",     handler = blockSchedule_validator}
    };

local function day_code(json)
  day_id = {}
  table.insert(day_id, json.isSunday)
  table.insert(day_id, json.isMonday)
  table.insert(day_id, json.isTuesday)
  table.insert(day_id, json.isWednesday)
  table.insert(day_id, json.isThursday)
  table.insert(day_id, json.isFriday)
  table.insert(day_id, json.isSaturday)
  return day_id
end

function M.blockSchedule_handler(json)
   log.debug(0)
   log.console_r(json)

   if (validator.post_data_validate(json, blockSchedule_maps) == false) then
      log.print("Failed to parse the input JSON data!!!");
      return {status="error", message=tostring(json) };
   end

   if json.isEveryDay == 'true' then
     json.isMonday = 'true'
     json.isTuesday = 'true'
     json.isWednesday = 'true'
     json.isThursday = 'true'
     json.isFriday = 'true'
     json.isSaturday = 'true'
     json.isSunday = 'true'
   end

   local day_id = day_code(json)
   --log.console_r(day_id)

   if json.allDayBlock == 'true' then
     json.startBlockTime = "00:00"
     json.endBlockTime = "23:59"
   end

   schedule = string.format("@schedule[0]")
   uci:set("blocksch", schedule, "isEveryDay",  json.isEveryDay)
   uci:set("blocksch", schedule, "isSunday",  json.isSunday)
   uci:set("blocksch", schedule, "isMonday",  json.isMonday)
   uci:set("blocksch", schedule, "isTuesday",  json.isTuesday)
   uci:set("blocksch", schedule, "isWednesday",  json.isWednesday)
   uci:set("blocksch", schedule, "isThursday",  json.isThursday)
   uci:set("blocksch", schedule, "isFriday",  json.isFriday)
   uci:set("blocksch", schedule, "isSaturday",  json.isSaturday)

   uci:set("blocksch", schedule, "allDayBlock",  json.allDayBlock)
   uci:set("blocksch", schedule, "startBlockTime",  json.startBlockTime)
   uci:set("blocksch", schedule, "endBlockTime",  json.endBlockTime)

   uci:commit("blocksch")
   table.insert(changed_config, "blocksch")

   return {status="success", message="Finish Block Schedule Setup"}

end

return M
