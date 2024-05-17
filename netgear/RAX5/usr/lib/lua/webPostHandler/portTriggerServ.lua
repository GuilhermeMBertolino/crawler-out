local M = {}
local uci  = require "luci.model.uci".cursor()
local log = require "luci.log" -- for debug
local validator = require "commonFunc.validator"
local portCheck = require "commonFunc.portCheck"

local function serviceNameType_validator(parm, value)
    local ret = false;
    if (parm == "iid") or (parm == "serviceName") or (parm == "serviceType") or (parm == "inConnType") then
        ret = true;
    end
    return ret;
end

local port_triggerServ_maps =
    {
        action            = { data_type = "action",            handler = nil },
        iid               = { data_type = "number",            handler = serviceNameType_validator },
        serviceName       = { data_type = "service_name",      handler = serviceNameType_validator },
        serviceUser       = { data_type = "ipv4_addr",         handler = nil },
        serviceType       = { data_type = "tcp_udp",           handler = serviceNameType_validator },
        inConnType        = { data_type = "protocol",          handler = serviceNameType_validator },
        triggeringPort    = { data_type = "trigger_state",     handler = nil },
        inStartPort       = { data_type = "port_range",        handler = nil },
        inEndPort         = { data_type = "port_range",        handler = nil }
    };

function M.portTriggerServ_handler(json)
    log.debug(0)
    log.console_r(json)
    log.console("portTrigger:", json.serviceName, json.serviceUser, json.serviceType, json.inConnType, json.iid)


    if (validator.post_data_validate(json, port_triggerServ_maps) == false) then
       log.print("Failed to parse the input JSON data!!!");
       return {status="error", message=tostring(json) };
    end

    -- Lomen, 20221206, Support port conflict check.
    if json.action == "add" or json.action == "edit" then
        if ( portCheck.portConflictCheck("port_triggering", json.triggeringPort, json.serviceType) == true ) then
            log.force("===DEBUG===Port Triggering Port Conflict!!!")
            return {status="error", message="Port Triggering Port Conflict!!!"}
        end
    end
    -- Lomen, 20221206, End.

    local time_mins = uci:get("firewall", "@PortTrigger[0]", "timeout")

    if json.action == "add" then
        log.console("[PT] Add button is clicked!")
        local index = 0
        uci:foreach("firewall", "trigger",
          function(s)
            index = index + 1
          end)

        trigger = string.format("@trigger[%d]", index)

        uci:add("firewall", "trigger")
        uci:set("firewall", trigger, "target", "TRIGGER")
        uci:set("firewall", trigger, "name", json.serviceName)
        uci:set("firewall", trigger, "enabled", "1")
        if json.serviceUser == "0.0.0.0" then
          uci:set("firewall", trigger, "trigger_ip", "any")
        else
          uci:set("firewall", trigger, "trigger_ip", json.serviceUser)
        end
	uci:set("firewall", trigger, "proto", json.serviceType)
	uci:set("firewall", trigger, "inbound_proto", json.inConnType)
        uci:set("firewall", trigger, "trigger_port",  json.triggeringPort)
	local inboundPort = string.format("%d-%d",json.inStartPort, json.inEndPort)
        uci:set("firewall", trigger, "inbound_port", inboundPort)
	uci:set("firewall", trigger, "timeout",  time_mins*60)
	uci:set("firewall", trigger, "log_prefix", "[PortFw_Tr]" )
	uci:set("firewall", trigger, "log_extra", "-m conntrack --ctstate NEW" )
	
        uci:commit("firewall")

    elseif json.action == "delete" then
        log.console("[PT]::Delete button is clicked!")
        local trigger = string.format("@trigger[%d]", json.iid-1)
        uci:delete("firewall", trigger)
        uci:commit("firewall")

    elseif json.action == "edit" then
        log.console("[PT]::Edit button is clicked!")
        local trigger = string.format("@trigger[%d]", json.iid-1)
        uci:set("firewall", trigger, "name",  json.serviceName)
        uci:set("firewall", trigger, "enabled", "1")
        uci:set("firewall", trigger, "proto", json.serviceType)
        uci:set("firewall", trigger, "inbound_proto", json.inConnType)
        uci:set("firewall", trigger, "trigger_port",  json.triggeringPort)
        local inboundPort = string.format("%d-%d",json.inStartPort, json.inEndPort)
        uci:set("firewall", trigger, "inbound_port", inboundPort)
        if json.serviceUser == "0.0.0.0" then
          uci:set("firewall", trigger, "trigger_ip", "any")
        else
          uci:set("firewall", trigger, "trigger_ip", json.serviceUser)
        end
	uci:set("firewall", trigger, "timeout",  time_mins*60)
        uci:set("firewall", trigger, "log_prefix", "[PortFw_Tr]" )
        uci:set("firewall", trigger, "log_extra", "-m conntrack --ctstate NEW" )

        uci:commit("firewall")
    end
    
    table.insert(changed_config, "firewall")
    return {status="success", message="Finish PortTrigger Setup"}
end

return M
