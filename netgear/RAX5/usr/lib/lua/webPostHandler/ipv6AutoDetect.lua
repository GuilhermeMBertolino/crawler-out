-- Licensed to the public under the Apache License 2.0.
local M = {}
local uci    = require "luci.model.uci".cursor()
local log    = require "luci.log"
local json = require "luci.json"
local sys  = require "luci.sys"
local validator = require "commonFunc.validator"
local v6disable = require "webPostHandler.ipv6Disable"
local v6autocfg = require "webPostHandler.ipv6AutoConfig"
local ipv6 = require "webGetFunc.ipv6"

log.debug(0)

function wandetect_validator(parm, value)
    local ret = false

    if (parm == "wanConnectionTypeHid" and (value == "up" or value == "down")) then
        ret = true
    end
    return ret
end

local wanautodetect_maps =
{
    wanConnectionTypeHid = { data_type = "ipv6_connhid", handler = wandetect_validator },
    dns1                 = { data_type = "ipv6_addr", handler = nil },
    dns2                 = { data_type = "ipv6_addr", handler = nil },
    lanIpAddr            = { data_type = "ipv6_lan", handler = nil },
    enableInterfaceId    = { data_type = "ipv6_intfidstatus", handler = nil },
    lanInterfaceId       = { data_type = "ipv6_intfid", handler = nil },
    filter               = { data_type = "ipv6_filter", handler = nil }
};

function ipv6Detect()
    uci:set("network", "wan_v6", "proto", "none")
    uci:commit("network")
    sys.exec("wan6_autodetect.sh ui")
end

function M.ipv6AutoDetect_handler(json)
    local conntype = uci:get("network", "wan_v6", "conntype")
    local plug = ""
    log.console_r(json)
    if (validator.post_data_validate(json, wanautodetect_maps) == false) then
        log.print("Failed to parse the input JSON data!!!");
        return {status="error", message=tostring(json) };
    end

    v6disable.ipv6DelOtherType(conntype)
    --wan
    uci:set("network", "wan_v6", "conntype", json["v6Type"])
    --Check that the Ethernet cable is plugged
    plug = ipv6.getWanConnectionStatus()
    if (plug == "up") then
        --start auto detect
        ipv6Detect()
        sys.call("touch /var/state/ipv6changed")
    end

    --dns
    v6autocfg.ipv6DnsSet(json["dnsType"], json["dns1"], json["dns2"])
    --lan
    v6autocfg.ipv6LanSet(json["lanIpAddr"], json["enableInterfaceId"], json["lanInterfaceId"])
    --firewall
    v6autocfg.ipv6FwSet(json["filter"])

    --commit & apply the settings
    uci:commit("network")
    uci:commit("dhcp")
    --TODO:SPI firewall

    --post function must use table.insert(changed_config, "xxxx") to replace uci:apply("xxxx")
    table.insert(changed_config, "network")
    
	return {status="success", message="Finish IPv6 Setup"}
end

return M
