-- Licensed to the public under the Apache License 2.0.
local M = {}
local uci    = require "luci.model.uci".cursor()
local sys    = require "luci.sys"
local log    = require "luci.log"
local validator = require "commonFunc.validator"
local util = require "luci.util"
local fork = require "commonFunc.fork"

--Note : validator callback functions must be placed before datatype map table 
function accessCtrlDev_validator(parm, value)
    -- custom handler function only be called at default datatype validate fail.
    local ret = false;
    
    if (parm == "iid") then
        ret = true;
    elseif (parm == "devName") then
        ret = true;
    end
    
    return ret;
end

local accessCtrlDev_maps =
    {
        action    = { data_type = "action",     handler = nil },
        iid       = { data_type = "number",     handler = accessCtrlDev_validator },
        rule      = { data_type = "access_rule", handler = nil},
        devName   = { data_type = "hostname",   handler = accessCtrlDev_validator },
        macAddr   = { data_type = "mac_addr",   handler = nil}
    };


function oneDev_handler(json)
    log.debug(1);
    log.print_r(json);
    log.console("accessCtrlDev:", json.action, json.iid, json.rule, json.devName, json.macAddr);
    local mac;
    local mac_str;
    local AllowOrBlock;
    
    if (validator.post_data_validate(json, accessCtrlDev_maps) == false) then
        log.print("Failed to parse the input JSON data!!!");
        return 1;
    end
    
    --remove ':' in the mac address
    mac = util.split(json.macAddr, ":");
    mac_str = mac[1]..mac[2]..mac[3]..mac[4]..mac[5]..mac[6];

    --json.iid is not used in uci db system
    if (json.action == "add" or json.action == "edit") then
        uci:section("landev", "dev", mac_str);
        uci:set("landev", mac_str, "custom_devname",  json.devName);
        uci:set("landev", mac_str, "rule",  json.rule);
        
        -- Update DIL (Device Info List) signature
        fork.fork_exec("/bin/pudil -m " .. json.macAddr .. " 9 " .. json.devName);
        
        if (json.rule == "deny") then
            AllowOrBlock = "block";
        else
            AllowOrBlock = "allow";
        end
        fork.fork_exec("/bin/pudil -m " .. json.macAddr .. " 12 " .. AllowOrBlock);
    elseif (json.action == "delete") then
        uci:delete("landev", mac_str);
    end
    
    return 0;
end

function M.accessCtrlDev_handler(json)
    local ret;

    for i, t in ipairs(json) do
        ret = oneDev_handler(t);
        if (ret == 1) then
            return {status="error", message=tostring(json) };
        end
    end
    
    uci:commit("landev");
    table.insert(changed_config, "landev");

    return {status="success", message="Finish accessCtrlDev"};
end

return M
