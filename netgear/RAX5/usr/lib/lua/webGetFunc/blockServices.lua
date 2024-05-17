local M = {}

local uci  = require "luci.model.uci".cursor()
local json = require "luci.json"
local log = require "luci.log"

function M.getBlockServicesType()
    local bs_type = uci:get("firewall", "@BlockService[0]", "blocking_type")
    return bs_type
end

local function split(str, delimiter)
    result = {}
    string.gsub(str, '[^'..delimiter..']+', function(w)
          table.insert(result, w)
    end)
    return result
end

function M.getBlockServicesTableValue()
    log.debug(0)
    local blockServices = {}
    local index = 1
    local drop_idx = 0

    uci:foreach("firewall", "rule",
        function(s)
	log.console_r(s)

        if s.log_prefix ~= nil and string.find(s.log_prefix, "blocked") ~= nil then
            drop_idx = drop_idx + 1
            --log.console_r(s)
	    log.console("Get block services s.proto="..s.proto.." s.name="..s.name.." s.port="..s.dest_port)

            service_name = s.name
            protocol = string.upper(s.proto)
            if protocol == "TCPUDP" then
               protocol = "TCP_UDP" 
            end

            if string.find(s.dest_port, '-') ~= nil then
              port_range = split(s.dest_port,"-")
              portString = string.format("%d...%d", port_range[1], port_range[2])
            else
              portString = s.dest_port
            end

            local ip = s.src_ip
            if ip == nil then
              ip = "all"
              filter_type = "All"
            elseif string.find(ip,'-') ~= nil then
              filter_type = "Range"
            else
              filter_type = "Single"
            end

            blockServices[tostring(index)] = {
                __index = drop_idx,
                __iid = index,
                __protocol = protocol,
		__portStr = portString,
                __ipStr = ip,
                __filterType = filter_type,
                __sName = service_name
            }
          end
          index = index + 1
        end)

        return blockServices
end

return M

