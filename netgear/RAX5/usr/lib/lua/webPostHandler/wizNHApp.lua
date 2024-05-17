local M = {}
local validator = require "commonFunc.validator"
    
function M.wizNHApp_handler(json)
    
    local uci = require "luci.model.uci".cursor()
    local installEvents = require "commonFunc.installEvents"
    --detect user start GUI installation. If hijack page is presented, it's after user continue GUI installation after GUI hijack screen.
    installEvents.send("gui setup start", "Setup started")

    uci:set("netgear", "system", "app_disable",  "1")
    uci:commit("netgear")
    --table.insert(changed_config, "netgear")-- no need to trigger ligghttpd restart in this step

    return {status="success", message="Set to skip NH App"}
end

return M