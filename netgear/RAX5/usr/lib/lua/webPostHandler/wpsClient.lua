
--For LUA
function __FILE__() return debug.getinfo(2, 'S').short_src end -- or use .source
function __FUNCTION__() return debug.getinfo(2, 'n').name end
function __LINE__() return debug.getinfo(2, 'l').currentline end

local M = {}
--local os     = require "os"
--local uci    = require "luci.model.uci".cursor()
--local uci_st = require "luci.model.uci".cursor(nil, "/var/state")
--local sys    = require "luci.sys"
--local validator = require "commonFunc.validator"
local log    = require "luci.log"
    log.debug(0)

--local mtkwifi = require("mtkwifi")

--local netUtils = require "commonFunc.netUtils"
require "commonFunc.wifiUtils_commDefs"
require "commonFunc.wifiUtils_wifiCountryCodeMapping"
local wps = require "commonFunc.wifiUtils_WPS"

--TODO
--function wps_validator(parm, value, json)
--    -- custom handler function only be called at default datatype validate fail.
--    local ret = false
--    local whichBand = "2G"
--    if string.sub(parm, 1, 2) == "5G" then
--        whichBand = "5G"
--    end
--
--    if parm == "wifiRegion" then
--        ret = isValid_wifiRegion_forNtgr(value)
--    elseif parm == "5GChannel" then
--        local nmrpSku = uci_st:get("netgear", "board", "sku")
--        if nmrpSku == "US" and isInDSRC_band(value) == true then
--            ret = true
--        end
--    elseif parm == (whichBand.."RadiusIP") and json[whichBand.."Security"] ~= "4" and value == "false" then
--        ret = true
--    elseif parm == (whichBand.."RadiusSecret") and json[whichBand.."Security"] ~= "4" and value == "" then
--        ret = true
--    end
--    return ret
--end

--TODO
--local wps_maps = {
--    wifiRegion  = { data_type = "wifi_region", handler = wps_validator }, --In actually we don't have "wifi_region" type in validator library, we need to use additional handler to handle it.
--    enableAX    = { data_type = "boolean",    handler = nil },
--    smartConnect    = { data_type = "boolean",    handler = nil },
--    ["2GOfdma"]     = { data_type = "boolean",    handler = nil },
--    ["5GOfdma"]     = { data_type = "boolean",    handler = nil },
--    ["2GSsid"]      = { data_type = "wlan_ssid",    handler = nil },
--    ["2GMode"]      = { data_type = "wlan_mode",    handler = nil },
--    ["2GSsidBroadcast"] = { data_type = "boolean",    handler = nil },
--    ["2GCoex"]      = { data_type = "boolean",    handler = nil },
--    ["2GChannel"]   = { data_type = "wlan_2g_ch",    handler = nil },
--    ["2GSecurity"]  = { data_type = "wlan_sec",    handler = nil },
--    ["2GRadiusIP"]  = { data_type = "radius_ipaddr",    handler = wps_validator },
--    ["2GEncryptMode"]   = { data_type = "wlan_encrypt",    handler = nil },
--    ["2GRadiusPort"]    = { data_type = "port_range",    handler = nil },
--    ["2GRadiusSecret"]  = { data_type = "radius_secret",    handler = wps_validator },
--    ["2GPassword"]  = { data_type = "wlan_wpakey",    handler = nil },
--    ["5GSsid"]      = { data_type = "wlan_ssid",    handler = nil },
--    ["5GMode"]      = { data_type = "wlan_mode",    handler = nil },
--    ["5GSsidBroadcast"] = { data_type = "boolean",    handler = nil },
--    ["5GChannel"]   = { data_type = "wlan_5g_ch",    handler = wps_validator }, --DSRC band upper bound to ch177.
--    ["5GSecurity"]  = { data_type = "wlan_sec",    handler = nil },
--    ["5GRadiusIP"]  = { data_type = "radius_ipaddr",    handler = wps_validator },
--    ["5GEncryptMode"]   = { data_type = "wlan_encrypt",    handler = nil },
--    ["5GRadiusPort"]    = { data_type = "port_range",    handler = nil },
--    ["5GRadiusSecret"]  = { data_type = "radius_secret",    handler = wps_validator },
--    ["5GPassword"]  = { data_type = "wlan_wpakey",    handler = nil }
--};

--function file_exists( name )
--    local f=io.open(name,"r")
--    if f~=nil then io.close(f) return true else return false end
--end

function M.wpsClient_handler(json)

    --log.console_r(json)
    --For debug.
    for k,v in pairs(json) do
        if type(v) == type("") or type(v) == type(0) then
            --nixio.syslog("debug", "post."..k.."="..tostring(v))
            log.console("key="..k..", value="..v)
        else
            --nixio.syslog("debug", "post."..k.." invalid, type="..type(v))
            log.console("Invalid value type. key="..k..", tostring(value)="..tostring(v))
        end
    end

    log.console(__FUNCTION__()..":"..__LINE__()..", json\[\"action\"\]="..json["action"])
    if json["clientPin"] ~= "" then
        if json["action"] == "start" then
            wps.start_WPS_clientPIN_procedure(json["clientPin"])
        elseif json["action"] == "cancel" then
            wps.stop_WPS_PBC_procedure()
        end
    else
        if json["action"] == "start" then
            wps.start_WPS_PBC_procedure()
        elseif json["action"] == "cancel" then
            wps.stop_WPS_PBC_procedure()
        end
    end

    return {status="success", message="Handled WPS GUI action"}
end

return M
