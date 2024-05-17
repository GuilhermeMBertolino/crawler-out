local M = {}
local validator = require "commonFunc.validator"

local autoUpdate_maps =
    {
        autoUpdate = { data_type = "boolean", handler = nil }
    };
    
function M.fwUpdate_handler(json)

    if (validator.post_data_validate(json, autoUpdate_maps) == false) then
        log.print("Failed to parse the input JSON data!!!");
        return {status="error", message=tostring(json) };
    end
    
    local uci = require "luci.model.uci".cursor()
    local original_autoUpdate = uci:get("netgear", "fw", "auto_update")

    if original_autoUpdate ~= json["autoUpdate"] then
        uci:set("netgear", "fw", "auto_update",  json["autoUpdate"])
        uci:commit("netgear")
        table.insert(changed_config, "netgear")
    end

    return {status="success", message="Finish Auto Firmware Setting"}
end

return M