local M = {}
local validator = require "commonFunc.validator"

function M.wizTNC_handler(json)

    local uci = require "luci.model.uci".cursor()

    uci:set("netgear", "system", "tnc_disable",  "1")
    uci:commit("netgear")
    --table.insert(changed_config, "netgear")-- no need to trigger ligghttpd restart in this step

    return {status="success", message="Set to skip NH App"}
end

return M