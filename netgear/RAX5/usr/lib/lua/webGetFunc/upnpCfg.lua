-- Get functions for upnp
local M = {}

local uci  = require "luci.model.uci".cursor()
local json = require "luci.json"
local sys  = require "luci.sys"
local netUtils = require "commonFunc.netUtils"
local log = require "luci.log" -- for debug

function M.getUpnpEnable()
    local Status = uci:get("upnpd", "config", "enabled")
	local retStatus = "false"
	log.debug(0)

    if Status == "1" then
        retStatus = "true"
    end
	
	return retStatus
end

function M.getUpnpAdvertisementPeriod()
    local Period = uci:get("upnpd", "config", "notify_interval")
    local nPeriod = 0 
    local retPeriod = "0"
    log.debug(0)
	
    if Period ~= nil then
        nPeriod = tonumber(Period)/60
	    retPeriod = tostring(nPeriod)
	end

   return retPeriod
end

function M.getUpnpAdvertisementTimetoLive()
    local ttl = uci:get("upnpd", "config", "time_to_live")
    log.debug(0)
	
    return ttl
end

function M.getUpnpPortMappingTableValue()
    local fwd = { }
    local index = 1;
    local ipt = io.popen("iptables --line-numbers -t nat -xnvL MINIUPNPD 2>/dev/null")
    
    log.debug(0)

	if ipt then
		
		while true do
			local ln = ipt:read("*l")
			if not ln then
				break
			elseif ln:match("^%d+") then
				local num, proto, extport, intaddr, intport =
					ln:match("^(%d+).-([a-z]+).-dpt:(%d+) to:(%S-):(%d+)")

				if num and proto and extport and intaddr and intport then
					num     = tonumber(num)
					--extport = tonumber(extport)
					--intport = tonumber(intport)
					
					log.console("num :", num)
					log.console("proto :", proto)
					log.console("extport :", extport)
					log.console("intaddr :", intaddr)
					log.console("intport :", intport)
                    --index = #fwd+1;
					fwd[tostring(index)] = {
						__protocol = proto:upper(),
						__interPort = intport,
						__extPort = extport,
						__ip = intaddr
					}
					index = index+1;
				end
			end
		end
		
		ipt:close()
	end
    return fwd
end

return M
