local M = {}
local validator = require "commonFunc.validator"
local fork = require "commonFunc.fork"

local upgrade_maps =
    {
        isForce = { data_type = "boolean", handler = nil }
    };
    
function M.forceFWUpdate_handler(json)

    if (validator.post_data_validate(json, upgrade_maps) == false) then
        log.print("Failed to parse the input JSON data!!!");
        return {status="error", message=tostring(json) };
    end

    fork.fork_exec("/usr/bin/ra_cli -r 6")
    local cgilua = require"cgilua"
    local getTmpFunc = cgilua.getPegaTable("getTmpNameFunc")
    local image_tmp = cgilua.getPegaTable("tmpPath").."/"..getTmpFunc("mtenFWUpload")

    if json["isForce"] == "true" then
        local upload = require"cgilua.uploadUtils"
        upload.upgrade_image(image_tmp)
        return {status="success", message="Start to upgrade firmware"}
    else
        --todo, add Router Spec: fwupgrade LED
        local uci_st = require "luci.model.uci".cursor(nil, "/var/state")
        uci_st:revert("netgear","fw","new_ver")
        uci_st:save("netgear")
        os.remove(image_tmp) 
        return {status="success", message="Cancel to upgrade firmware"}
    end
    
end

return M
