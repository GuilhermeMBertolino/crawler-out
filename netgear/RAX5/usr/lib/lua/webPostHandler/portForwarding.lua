local M = {}
local uci    = require "luci.model.uci".cursor()
local log    = require "luci.log"
local validator = require "commonFunc.validator"
-- Jinjuan Pei, 20220520, Support port conflict check.
local portCheck = require "commonFunc.portCheck"
-- Jinjuan Pei, 20220520, End.

local function serviceNameType_validator(parm, value)
    local ret = false;
    if (parm == "iid") or (parm == "serviceName") or (parm == "serviceType") then
        ret = true;
    end
    return ret;
end

local port_forwarding_maps =
    {
        action            = { data_type = "action",             handler = nil },
        iid               = { data_type = "number",             handler = serviceNameType_validator },
        serviceName       = { data_type = "service_name",       handler = serviceNameType_validator },
        serverIpAddr      = { data_type = "ipv4_addr",          handler = nil },
        serviceType       = { data_type = "protocol",           handler = serviceNameType_validator },
        externalPort      = { data_type = "forward_port_range",       handler = nil },
        internalPort      = { data_type = "forward_port_range",       handler = nil }
    };

function M.portForwarding_handler(json)
    log.debug(0)
    log.console_r(json)
    --log.console("portForwarding:", json.action,  json.serviceType, json.serverIpAddr,  json.externalPort, json.internalPort, json.iid)

    if (validator.post_data_validate(json, port_forwarding_maps) == false) then
       log.print("Failed to parse the input JSON data!!!");
       return {status="error", message=tostring(json) };
    end

    -- Jinjuan Pei, 20220520, Support port conflict check.
    if json.action == "add" or json.action == "edit" then
        if ( portCheck.portConflictCheckStringPort("port_forwarding", json.externalPort, json.serviceType) == true ) then
            log.force("===DEBUG===Port Forwarding Port Conflict!!!")
            return {status="error", message="Port Forwarding Port Conflict!!!"}
        end
    end
    -- Jinjuan Pei, 20220520, End.

    if json.action == "add" then
        log.console("===DEBUG===Add button is clicked!")

        local index = 0
        uci:foreach("firewall", "redirect",
          function(s)
            index = index + 1
          end)
        log.console(index)
        if index >= 64 then
          log.print("Over adding 64 port forwarding rules!!!");
          return {status="error", message="Over adding 64 port forwarding rules!!!" };
        end

        redirect = string.format("@redirect[%d]", index)
        uci:add("firewall", "redirect")
  
        -- add/overwrite section options
        uci:set("firewall", redirect, "name",  json.serviceName)
        uci:set("firewall", redirect, "target",  "DNAT")
        uci:set("firewall", redirect, "src",  "wan")
        uci:set("firewall", redirect, "dest",  "lan")
        uci:set("firewall", redirect, "proto", json.serviceType)
        uci:set("firewall", redirect, "src_dport",  json.externalPort)
        uci:set("firewall", redirect, "dest_port",  json.internalPort)
        uci:set("firewall", redirect, "dest_ip",  json.serverIpAddr)
	uci:set("firewall", redirect, "log_prefix", "[PortFw_Tr]" )
	uci:set("firewall", redirect, "log_extra", "-m conntrack --ctstate NEW" )

    elseif json.action == "delete" then
        log.console("===DEBUG===::Delete button is clicked!")
	local redirect = string.format("@redirect[%d]", json.iid-1)
        uci:delete("firewall", redirect)

    elseif json.action == "edit" then
        log.console("===DEBUG===::Edit button is clicked!")
        local redirect = string.format("@redirect[%d]",json.iid-1)
        uci:set("firewall", redirect, "name",  json.serviceName)
        uci:set("firewall", redirect, "src",  "wan")
        uci:set("firewall", redirect, "dest",  "lan")
        uci:set("firewall", redirect, "proto",  json.serviceType)
        uci:set("firewall", redirect, "src_dport",  json.externalPort)
        uci:set("firewall", redirect, "dest_port",  json.internalPort)
        uci:set("firewall", redirect, "dest_ip",  json.serverIpAddr)
        uci:set("firewall", redirect, "log_prefix", "[PortFw_Tr]" )
        uci:set("firewall", redirect, "log_extra", "-m conntrack --ctstate NEW" )       
    end

    uci:commit("firewall")
    table.insert(changed_config, "firewall")

    return {status="success", message="Finish PortForwarding Setup"}

end

return M
