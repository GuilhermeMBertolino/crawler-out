-- Licensed to the public under the Apache License 2.0.
local M = {}

local log    = require "luci.log"

function M.reboot_handler(json)
    log.debug(0)
    log.console_r(json)
    local fork = require"commonFunc.fork"
    fork.fork_exec("/usr/bin/ra_cli -r 5")
    fork.fork_exec("reboot")

    return {status="success", message="Finish reboot"}
end

return M
