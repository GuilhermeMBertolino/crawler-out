local M = {}

function M.wizDone_handler(json)
    
    local uci = require "luci.model.uci".cursor()
    local exec  = require "luci.util".exec
    -- send RA installEvent - "install done"
    local installEvents = require "commonFunc.installEvents"
    installEvents.send("install done", "Installation done")
    exec("puDataStr set installEvent installMethod GUI")    -- Add for JIRA RAX5-136
    uci:set("netgear", "system", "blank_state", "0")
    uci:commit("netgear")
    local log = require"luci.log"
    log.force("changed_config:"..type(changed_config))
    table.insert(changed_config, "netgear")
    
    local fork_exec = require"commonFunc.fork".fork_exec
    fork_exec("pudil -D")
    fork_exec("/etc/init.d/lighttpd restart")
    -- Jinjuan_Pei, 20220418, Reload dnsmasq to update the config file when wizard is completed.
    fork_exec("/etc/init.d/dnsmasq reload")
    -- Jinjuan_Pei, 20220418, End.

    return {status="success", message="Finish Wizard Setup"}
end

return M
