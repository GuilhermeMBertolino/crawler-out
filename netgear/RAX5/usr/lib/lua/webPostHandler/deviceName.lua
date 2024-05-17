-- Licensed to the public under the Apache License 2.0.
local M = {}
local os     = require "os"
local sys   = require "luci.sys"
local uci    = require "luci.model.uci".cursor()
local validator = require "commonFunc.validator"
local log    = require "luci.log"


function M.deviceName_handler(json)
    log.debug(0)
    log.print_r(json)
    log.print("deviceName:", json.name)

    local hostname_orig = uci:get("system", "@system[0]", "hostname")
	local wan_proto = uci:get("network", "wan", "proto")

    if (validator.cgi_validator("device_name", json.name) == false) then
        log.print("Failed to parse the input JSON data!!!");
        return {status="error", message=tostring(json) };
    end
    
    if hostname_orig ~= json.name then
        uci:set("system", "@system[0]", "hostname", json.name)
        sys.hostname(json.name)
        uci:commit("system")
        table.insert(changed_config, "system")
		-- also apply host name to wan config when dhcp
		if wan_proto == "dhcp" then
		    uci:set("network", "wan", "hostname", json.name)
            uci:commit("network")
            table.insert(changed_config, "network")
        end
    end

    return {status="success", message="Finish Device Name"}
end

return M
