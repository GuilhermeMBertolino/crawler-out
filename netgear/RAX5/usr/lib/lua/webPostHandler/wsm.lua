--Licensed to the public under the Apache License 2.0

local M = {}
local os = require "os"
local nixio = require "nixio"
local uci = require "luci.model.uci".cursor()
local sys = require "luci.sys"
local log = require "luci.log"
local validator = require "commonFunc.validator"

local wsm_maps = {
    enableWsm = { data_type = "boolean" , handler = nil }
}

function M.wsm_handler(json)
    log.print_r(json)
    log.print("set wsm ",json.enableWsm)
	local Wsm_enable = "0"
	local WsmChanged = false
   
    if ( validator.post_data_validate(json, wsm_maps) == false ) then
        log.print("Failed to parse the input JSON data!!!");
        return {status="error", message=tostring(json) };
    end 
    
    local Wsm_enable_org = uci:get("WebServiceManagement","config","enable_wsm")
    
    if ( json.enableWsm == "true" ) then 
        Wsm_enable = "1"
--		os.execute("cp -f /etc/lighttpd/https_on_lan.conf /var/lighttpd/https_on_lan.inc")
--		os.execute("sync")
  --  else
--	    os.remove("/var/lighttpd/https_on_lan.inc")
--		luci.sys.call("touch /var/lighttpd/https_on_lan.inc")
--		os.execute("sync")
	end
	
	if ( Wsm_enable ~= Wsm_enable_org ) then
	   uci:set("WebServiceManagement","config","enable_wsm",Wsm_enable)
	   WsmChanged = true
	end
	
	if WsmChanged == true then
        uci:commit("WebServiceManagement")
        table.insert(changed_config, "WebServiceManagement")
    end
	
	return {status = "success", message = "Set WebServiceManagement successfully!!"} 

end
return M
