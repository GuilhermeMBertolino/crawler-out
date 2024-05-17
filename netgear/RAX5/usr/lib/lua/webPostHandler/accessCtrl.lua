-- Licensed to the public under the Apache License 2.0.
local M = {}
local uci    = require "luci.model.uci".cursor()
local sys    = require "luci.sys"
local log    = require "luci.log"
local validator = require "commonFunc.validator"

local accessCtrl_maps =
    {
        enableAccessCtrl    = { data_type = "boolean",     handler = nil },
        accessRule          = { data_type = "access_rule",    handler = nil }
    };

function M.accessCtrl_handler(json)
    log.debug(0);
    log.print_r(json);
    log.console("accessCtrl:", json.enableAccessCtrl, json.accessRule);
    local enable;

    if (validator.post_data_validate(json, accessCtrl_maps) == false) then
        log.print("Failed to parse the input JSON data!!!");
        return {status="error", message=tostring(json) };
    end

    if (json.enableAccessCtrl == "true") then
        enable = "1";
    else
        enable = "0";
    end
    
    uci:set("landev", "@access_ctrl[0]", "enable",  enable);
    uci:set("landev", "@access_ctrl[0]", "rule",  json.accessRule);
    
    uci:commit("landev");
    table.insert(changed_config, "landev");

    return {status="success", message="Finish accessCtrl"};
end

return M
