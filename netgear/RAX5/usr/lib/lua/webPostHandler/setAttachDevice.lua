-- Licensed to the public under the Apache License 2.0.
local M = {}
local os     = require "os"
local uci    = require "luci.model.uci".cursor()
local sys    = require "luci.sys"
local log    = require "luci.log"
local validator = require "commonFunc.validator"
local util = require "luci.util"
local fork = require "commonFunc.fork"

local setAttachDev_maps =
    {
        macAddr         = { data_type = "mac_addr",     handler = nil },
        deviceName      = { data_type = "host_name",    handler = nil },
        deviceType      = { data_type = "device_name",  handler = nil },
        deviceModel     = { data_type = "device_name",  handler = nil },
        displayName     = { data_type = "host_name",    handler = nil },
        priority        = { data_type = "qos_priority", handler = nil }
    };


function M.setAttachDevice_handler(json)
    --local is_qos_enable = 0;
    log.debug(0);
    log.print_r(json);
    log.print("setAttachDevice:", json.macAddr, json.deviceName, json.deviceType, json.deviceModel, json.displayName, json.priority);
    local mac;
    local mac_str;
    
    if (validator.post_data_validate(json, setAttachDev_maps) == false) then
        log.print("Failed to parse the input JSON data!!!");
        return {status="error", message=tostring(json) };
    end

    --remove ':' in the mac address
    mac = util.split(json.macAddr, ":");
    mac_str = mac[1]..mac[2]..mac[3]..mac[4]..mac[5]..mac[6];

    uci:section("landev", "dev", mac_str);
    uci:set("landev", mac_str, "custom_devname",  json.displayName);
    uci:set("landev", mac_str, "custom_devtype",  json.deviceType);
    uci:set("landev", mac_str, "custom_devmodel",  json.deviceModel);
    
    uci:commit("landev");
    table.insert(changed_config, "landev");
    
    -- Update DIL (Device Info List) signature
    fork.fork_exec("/bin/pudil -m " .. json.macAddr .. " 9 " .. json.displayName);
    fork.fork_exec("/bin/pudil -m " .. json.macAddr .. " 8 " .. json.deviceType);
    fork.fork_exec("/bin/pudil -m " .. json.macAddr .. " 11 " .. json.deviceModel);

-- ToDo : Write QoS priority
--    if (is_qos_enable == 1) then
--        uci:set("qos", "qos", "enable",  "1");
--        uci:commit("qos");
--        table.insert(changed_config, "qos");
--    end
    
    return {status="success", message="Finish setAttachDevice"};
end

return M
