-- Licensed to the public under the Apache License 2.0.
local M = {}

local sys  = require "luci.sys"
local log    = require "luci.log"

function M.openvpnClientCfgUpdate_handler(json)
    log.debug(0)
    log.console_r(json)

    sys.exec("/etc/openvpncfg/updateClientCfg.sh")

    return {status="success", message="Download openvpn config file"}
end

return M
