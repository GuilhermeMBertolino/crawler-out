local M = {}
local uci  = require "luci.model.uci".cursor()
local log = require "luci.log" -- for debug

function M.getBlockType()
    local blocking_type = uci:get("blocksite", "@UrlFilterCfg[0]", "blocking_type")
    return blocking_type
end

function M.allowTrustIp()
    local allow_trust_ip = uci:get("firewall", "@BlockSite[0]", "allow_TrustIp")
    return allow_trust_ip
end

function M.getTrustedIp()
    local trusted_ip = uci:get("firewall", "@BlockSite[0]", "trust_IpAddr")
    return trusted_ip
end

function M.getKeywordList()
   log.debug(0)
   local keyword_list = {}
   local index = 1

    uci:foreach("blocksite", "site",
        function(s)
        --log.console_r(s)

        if s.url ~= nil then
          keyword_list[index] = table.concat({s.url}, ", ")
	  index = index +1
        end
    end)
   log.console_r(keyword_list)
   return keyword_list
end

return M
