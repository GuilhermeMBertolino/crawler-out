local M = {}
local uci    = require "luci.model.uci".cursor()
local log    = require "luci.log"
local validator = require "commonFunc.validator"

local function keywords_validator(parm, value)
    local ret = false;
    if (parm == "keywords") then
        ret = true;
    end

    return ret;
end


local block_sites_maps =
    {
        blockingType       = { data_type = "block_type",        handler = nil },
        trustIpAddr        = { data_type = "ipv4_addr",         handler = nil },
        keywords           = { data_type = "url_filter",        handler = keywords_validator },
        allowTrustIp       = { data_type = "boolean",           handler = nil },
    };

local function split(str, delimiter)
    result = {}
    string.gsub(str, '[^'..delimiter..']+', function(w)
          table.insert(result, w)
    end)
    return result
end

function M.blockSites_handler(json)
    log.debug(0)
    log.console_r(json)

    if (validator.post_data_validate(json, block_sites_maps) == false) then
       log.print("Failed to parse the input JSON data!!!");
       return {status="error", message=tostring(json) };
    end

    --log.console(json.keywords)
    local keyword_list = split(json.keywords, ",")
    log.console_r(keyword_list)

    local index = 0
    local old_url = 0
    uci:foreach("blocksite", "site",
      function(s)
        index = index + 1
        if s.url ~= nil then
          old_url = old_url + 1
        end
      end)


    uci:delete_all("blocksite", "site",
          function(s) return (s.url ~= nil) end)

    log.console("index="..index..", list_num="..#keyword_list)
    uci:set("blocksite", "@UrlFilterCfg[0]", "blocking_type", json.blockingType)
    uci:set("firewall", "@BlockSite[0]", "allow_TrustIp", json.allowTrustIp)
    uci:set("firewall", "@BlockSite[0]", "trust_IpAddr", json.trustIpAddr)
    uci:commit("firewall")
    table.insert(changed_config, "firewall")

    for url=1, #keyword_list do
      local new_url = index - old_url + url -1
      local site = string.format("@site[%d]", new_url)
      local url_name = string.format("Url_filter_%d", url)
      uci:add("blocksite", "site")
      uci:set("blocksite", site, "name", url_name)
      uci:set("blocksite", site, "url", keyword_list[url])
    end

    uci:commit("blocksite")
    table.insert(changed_config, "blocksite")

    return {status="success", message="Finish Block Sites Setup"}

end

return M
