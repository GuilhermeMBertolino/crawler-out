local M = {}
local uci    = require "luci.model.uci".cursor()
local log    = require "luci.log"
local validator = require "commonFunc.validator"

local port_triggering_maps =
    {
        timeout              = { data_type = "trigger_timeout",    handler = nil },
        enable               = { data_type = "boolean",            handler = nil },
        disablePortTrigger   = { data_type = "boolean",            handler = nil }
    };

local function split(str, delimiter)
    result = {}
    string.gsub(str, '[^'..delimiter..']+', function(w)
          table.insert(result, w)
    end)
    return result
end

function M.portTriggering_handler(json)
  log.debug(0)
  log.console_r(json)
  log.console("portTriggering:", json.disablePortTrigger, json.timeout, json.enableTriggerRule, json.disableTriggerRule)

  if (validator.post_data_validate(json, port_triggering_maps) == false) then
     log.print("Failed to parse the input JSON data!!!");
     return {status="error", message=tostring(json) };
  end

  uci:set("firewall", "@PortTrigger[0]", "disablePortTrigger", json.disablePortTrigger)
  uci:set("firewall", "@PortTrigger[0]", "timeout", json.timeout)

  local enRule = split(json.enableTriggerRule,",")
  local disRule = split(json.disableTriggerRule,",")
  local all_rules = #enRule + #disRule
  --log.console(#enRule, #disRule, rule_num)
  local idx=1

  for i=1, all_rules do
    trigger = string.format("@trigger[%d]",i-1)
    uci:set("firewall", trigger, "enabled",  "1")
    local timeout = string.format(json.timeout)
    uci:set("firewall", trigger, "timeout",  timeout*60)
    if i == tonumber(disRule[idx]) then
       idx = idx + 1
       uci:set("firewall", trigger, "enabled",  "0")
    end
 end

  if json.disablePortTrigger == 'true' then
    for i=1, all_rules do
      trigger = string.format("@trigger[%d]",i-1)
      uci:set("firewall", trigger, "enabled",  "0")
    end
  end

  uci:commit("firewall")
  table.insert(changed_config, "firewall")

end

return M
