local M = {}
local wanCommon = require "webPostHandler.wanCommon"
local uci    = require "luci.model.uci".cursor()
local validator = require "commonFunc.validator"
local log = require "luci.log"

function wizPppoe_validator(parm, value)
    local ret = false
    if(parm == "password") then
        if(wanCommon.isFalseOrEmpty(value) == true) then
            ret = true
        end
    end
    return ret
end

local wiz_pppoe_maps =
{
    username	=	{ data_type = "ppp_user",     handler = nil },
    password	=	{ data_type = "ppp_pwd",     handler = wizPppoe_validator }
}

function M.wizPppoe_handler(json)

    if (validator.post_data_validate(json, wiz_pppoe_maps) == false) then
        log.print("Failed to parse the input JSON data!!!")
        return {status="error", message=tostring(json) }
    end
    
    local domain = ""
    local wan_mode, proto, iptype, ipaddr, netmask, gateway
    local dnstype, dns1, dns2
    local mac_clone, mac_addr
    
    -- MTU settings
    wanCommon.wanCheckMtu(uci, "PPPoE")

    uci:set("network", "inet_global", "wan_mode", "PPPoE")
    uci:set("network", "inet_pppoe", "proto", "pppoe")
    uci:set("network", "inet_pppoe", "username", json.username)
    if(json.password ~= nil) then
        uci:set("network", "inet_pppoe", "password", json.password)
    else
        uci:set("network", "inet_pppoe", "password", "")
    end
    
    uci:set("network", "inet_pppoe", "service", "")
    uci:set("network", "inet_pppoe", "conn_mode", "onDemand")
    uci:set("network", "inet_pppoe", "idle_timeout", "5")
    uci:set("network", "inet_pppoe", "iptype", "dynamic")
    wanCommon.wanConfig_DNS(uci, "dynamic", "", "")
    wanCommon.wanConfig_Reload(uci)
    uci:commit("network")
    table.insert(changed_config, "network")
    
    --For wizard get Internet status on dial on demand mode
    wanCommon.pingTriggerDialonDemand(uci, json.mode)

    return {status="success", message="Finish wizard WAN PPPoE Setup"}
end

return M