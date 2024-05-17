local M = {}
local uci    = require "luci.model.uci".cursor()
local log    = require "luci.log"
local validator = require "commonFunc.validator"

local function blockServiceSetup_validator(parm, value)
    local ret = false;
    if (parm == "iid") or (parm == "ipAddr") or (parm == "startIpAddr") or (parm == "endIpAddr") then
        ret = true;
    end

    return ret;
end

local blockServiceSetup_maps =
    {
        action            = { data_type = "action",            handler = nil },
        iid               = { data_type = "number",            handler = blockServiceSetup_validator },
        userDefined       = { data_type = "device_name",       handler = nil },
        serviceType       = { data_type = "device_name",       handler = nil },
        filterType        = { data_type = "filter_type",       handler = nil },
	protocol          = { data_type = "protocol",          handler = nil },
        ipAddr            = { data_type = "ipv4_addr",         handler = blockServiceSetup_validator },
        startIpAddr       = { data_type = "ipv4_addr",         handler = blockServiceSetup_validator },
        endIpAddr         = { data_type = "ipv4_addr",         handler = blockServiceSetup_validator },
        startPort         = { data_type = "port_range",        handler = nil },
        endPort           = { data_type = "port_range",        handler = nil }
    };

local function blcok_service_rule(name, protocol, ip, ip_range, port, port_range, rule)
        uci:set("firewall", rule, "name",  name)
        uci:set("firewall", rule, "target",  "DROP")
        uci:set("firewall", rule, "src",  "lan")
        uci:set("firewall", rule, "dest",  "wan")
        uci:set("firewall", rule, "proto", protocol)
        log_block_service = string.format("[site_blocked]:%s ", name)
        uci:set("firewall", rule, "log_prefix", log_block_service)

        if ip ~= nil then
          uci:set("firewall", rule, "src_ip", ip)
        end
        if ip_range ~= nil then
          uci:set("firewall", rule, "src_ip", ip_range)
        end

        if port_range == nil then
          uci:set("firewall", rule, "dest_port",  port)
        else
          uci:set("firewall", rule, "dest_port",  port_range)
        end
        uci:set("firewall", rule, "log_extra", "-m conntrack --ctstate NEW")
end

function M.blockServiceSetup_handler(json)
    log.debug(0)
    log.console_r(json)
    log.console("iid="..json.iid.." ipaddr="..json.ipAddr.." startIpAddr="..json.startIpAddr.." endIpAddr="..json.endIpAddr)
    log.console("protocol="..json.protocol.." startPort="..json.startPort.." endPort="..json.endPort)

    if (validator.post_data_validate(json, blockServiceSetup_maps) == false) then
       log.print("Failed to parse the input JSON data!!!");
       return {status="error", message=tostring(json) };
    end

    local index = 0
    uci:foreach("firewall", "rule",
       function(s)
         index = index + 1
       end)


    if string.len(json.startIpAddr) > 0 then
      ip_range = string.format("%s-%s", json.startIpAddr, json.endIpAddr)
      log.console(ip_range)
    end

    if (json.startPort) ~= (json.endPort) then
      port_range = string.format("%d-%d", json.startPort, json.endPort)
    end

    if string.len(json.protocol) > 0 then
      proto = string.lower(json.protocol)
      if proto == "tcp_udp" then
        proto = "tcpudp"
      end
    end

    if json.action == "add" then
        log.console("=> Add Service: "..json.userDefined)
        rule = string.format("@rule[%d]", index)
        uci:add("firewall", "rule")

        blcok_service_rule(json.userDefined, proto, json.ipAddr, ip_range, json.startPort, port_range, rule)

    elseif json.action == "delete" then
	log.console("=> Delete Service: "..json.userDefined)
        rule = string.format("@rule[%d]", json.iid-1)
        uci:delete("firewall", rule)

    elseif json.action == "edit" then
        log.console("=> Edit Service: "..json.userDefined)
        rule = string.format("@rule[%d]", json.iid-1)
        blcok_service_rule(json.userDefined, proto, json.ipAddr, ip_range, json.startPort, port_range, rule)
    end

    uci:commit("firewall")
    table.insert(changed_config, "firewall")
    return {status="success", message="Finish Block Service Setup"}

end

return M
