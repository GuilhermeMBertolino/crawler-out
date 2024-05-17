local M = {}
local uci    = require "luci.model.uci".cursor()
local log    = require "luci.log"
local validator = require "commonFunc.validator"

local blockServices_maps =
    {
        blockingType      = { data_type = "block_type",        handler = nil }
    };

local function set_blockingType(block_type, setting)
   if block_type == 'never' then
      uci:set("firewall", setting, "enabled", '0')
      uci:set("firewall", "@BlockService[0]", "schedule", '0')
   elseif block_type == 'always' then
      uci:set("firewall", setting, "enabled", '1')
      uci:set("firewall", "@BlockService[0]", "schedule", '0')
   elseif block_type == "schedule" then
      uci:set("firewall", setting, "enabled", '1')
      uci:set("firewall", "@BlockService[0]", "schedule", '1')
   end
end

function M.blockServices_handler(json)
    log.debug(0)
    log.console_r(json)

   if (validator.post_data_validate(json, blockServices_maps) == false) then
       log.print("Failed to parse the input JSON data!!!");
       return {status="error", message=tostring(json) };
    end

    local index = 0
    uci:foreach("firewall", "rule",
       function(s)
         if s.log_prefix ~= nil and string.find(s.log_prefix, "blocked") ~= nil then
           setting = string.format("@rule[%d]",index)
           set_blockingType(json.blockingType, setting)
         end
         index = index + 1
       end)

    uci:set("firewall", "@BlockService[0]", "blocking_type", json.blockingType)

    uci:commit("firewall")
    table.insert(changed_config, "firewall")
    return {status="success", message="Done Block Services"}

end

return M
