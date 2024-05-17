
local M = {}

function M.restoreDefault_handler(json)

    local fork_exec = require"commonFunc.fork".fork_exec
    fork_exec("/bin/date '+%Y/%m/%d %T' > /etc/reserve-data/restoreDefault")
    fork_exec("sleep 1; killall dropbear lighttpd; /usr/sbin/factory_reset.sh;reboot")

    return {status="success", message="Finish factory default settings"}

end

return M
