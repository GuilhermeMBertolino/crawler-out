local M = {}
local uci  = require "luci.model.uci".cursor()
local json = require "luci.json"
local sys  = require "luci.sys"
local netUtils = require "commonFunc.netUtils"
local log = require "luci.log" -- for debug

function M.portTrigger_st()
  local PortTrigger_st = uci:get("firewall", "@PortTrigger[0]", "disablePortTrigger")
  return PortTrigger_st
end

function M.enablePortTrigger()
  return "true"
end

function M.portTriggerTimeout()
  local timeout = uci:get("firewall", "@PortTrigger[0]", "timeout")
  return timeout
end

function M.getPortForwardList()
    log.debug(0)
    local PFLists = {}
    local count = 1
    local index = 1

    uci:foreach("firewall", "redirect",
        function(s)
        log.console("===DEBUG===:: getPFList s.dest_ip="..s.dest_ip.."  s.name="..s.name)

            PFLists[tostring(index)] = {
                __index = index,
                __serviceName = s.name,
                __serviceType = s.proto,
                __externalPort = s.src_dport,
                __internalPort = s.dest_port,
                __serverIp = s.dest_ip,
                __count = count
            }
            count = count + 1
            index = index + 1
        end)

        return PFLists
end

local function split(str, delimiter)
    result = {}
    string.gsub(str, '[^'..delimiter..']+', function(w)
          table.insert(result, w)
    end)
    return result
end

function M.getPortTriggerList()
    log.debug(0)
    local PTLists = {}
    local index = 1
    local count = 1

    uci:foreach("firewall", "trigger",
        function(s)
	--log.console_r(s)
        log.console("PTList trigger_port="..s.trigger_port.." name="..s.name.. " proto="..s.proto.." inbound_port="..s.inbound_port)
            if s.enabled == "1" then 
               check_enrule = "checked"
            else
               check_enrule = ''
            end
  
            PROTO = string.upper(s.proto)

            local InConnType = "tcp udp"
            if s.inbound_proto == "tcp" then
               InConnType = "tcp"
               Upper_InConnType = "TCP"
            elseif s.inbound_proto == "udp" then
               InConnType = "udp"
               Upper_InConnType = "UDP"
            else
               Upper_InConnType = "TCP/UDP"
            end
            local inboundPort = split(s.inbound_port,"-")

            PTLists[tostring(index)] = {
                __index = index,
		__enableRule = check_enrule,
                __serviceName = s.name,
                __triggerProtocol = s.proto,
		__upper_triggerProtocol = PROTO,
		__displayInConnType = Upper_InConnType,
		__inConnType = InConnType,
                __triggerPort = s.trigger_port,
                __inStartPort = inboundPort[1],
                __inEndPort = inboundPort[2],
		__userIp = s.trigger_ip,
		__count = count
            }
            index = index + 1
            count = count + 1
        end)

    return PTLists
end

return M
