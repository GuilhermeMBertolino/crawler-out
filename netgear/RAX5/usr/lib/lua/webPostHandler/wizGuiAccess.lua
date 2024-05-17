local M = {}

function M.wizGuiAccess_handler(json)
    
    local installEvents = require "commonFunc.installEvents"
    if(json.funcName ~= nil) then
        installEvents.send_guiAccess(json.funcName)
    end
    return {status="success", message="installEvent is sent for gui access"}
end

return M
