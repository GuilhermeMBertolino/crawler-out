local M = {}
local uci    = require "luci.model.uci".cursor()
local log    = require "luci.log"
local validator = require "commonFunc.validator"

function convertBoolToInt(s)
    if s == "true" then
        return 1
    else
        return 0
    end
end

function ipv4Addr2Num(ipStr)
    local num = 0
    ip = {string.match(ipStr, '(%d+)%.(%d+)%.(%d+)%.(%d+)')}
    num = 2^24*ip[1] + 2^16*ip[2] + 2^8*ip[3] + ip[4]

    return num
end

function wanAdvSetup_validator(parm, value, json)
    local ret = true

    if parm == "dmzServer" and json.enableDmz == "true" then
        local start_ip = uci:get("dhcp", "lan", "start_ip")
        local end_ip = uci:get("dhcp", "lan", "end_ip")
        if ipv4Addr2Num(value) < ipv4Addr2Num(start_ip) and ipv4Addr2Num(value) > ipv4Addr2Num(end_ip) then
            ret = false
        end
    end

    return ret
end

local wanAdvSetup_maps =
{
    -- buttonHit        = { data_type = "button_hit",   handler = nil },
    -- buttonValue      = { data_type = "button_value", handler = nil },
    disableProtection   = { data_type = "boolean",      handler = nil },
    enableProtection    = { data_type = "boolean",      handler = nil },
    enableDmz           = { data_type = "boolean",      handler = nil },
    dmzServer           = { data_type = "string",    handler = wanAdvSetup_validator },
    responsePing        = { data_type = "boolean",      handler = nil },
    disableIgmpProxy    = { data_type = "boolean",      handler = nil },
    enableIgmpProxy     = { data_type = "boolean",      handler = nil },
    mtuSize             = { data_type = "mtu_size",     handler = nil },
    natFilter           = { data_type = "nat_filter",   handler = nil },
    disableSipAlg       = { data_type = "boolean",      handler = nil },
    enableSipAlg        = { data_type = "boolean",      handler = nil }
}

function M.wanSetMtu(mtu)
    local mode = uci:get("network", "inet_global", "wan_mode")

    if(mode == "DHCP" or mode == "Static" or mode == "PPPoE") then
        ret = uci:set("network", "wan", "mtu", mtu)
    elseif(mode == "PPTP") then
        ret = uci:set("network", "pptp", "mtu", mtu)
    elseif(mode == "L2TP") then
        ret = uci:set("network", "l2tp", "mtu", mtu)
    end
end

function M.wanAdvSetup_handler(json)

    if validator.post_data_validate(json, wanAdvSetup_maps) == false then
        return {status="error", message=tostring(json)}
    end

    local sip_enable
    if (convertBoolToInt(json.disableSipAlg) == 1) then
        sip_enable = "0"
    else
        sip_enable = "1"
    end

    local igmp_enable
    if (convertBoolToInt(json.disableIgmpProxy) == 1) then
        igmp_enable = "0"
    else
        igmp_enable = "1"
    end

    local dos_protection_disabled = "0"
    if (convertBoolToInt(json.disableProtection) == 1) then
        dos_protection_disabled = "1"
    end


    uci:set("omcproxy", "@defaults[0]", "enable", igmp_enable)
    M.wanSetMtu(json.mtuSize)
    uci:set("firewall", "@defaults[0]", "sip_alg", sip_enable)

    uci:set("firewall", "@defaults[0]", "sip_alg", sip_enable)
    uci:set("firewall", "@defaults[0]", "dos_protection_disabled", dos_protection_disabled)

    idx = 0
    uci:foreach("firewall", "rule",
        function(s)
            if s.name == "Allow-Ping" then
                uci:set("firewall", "@rule["..tostring(idx).."]", "enabled", convertBoolToInt(json.responsePing))
            end
            idx = idx + 1
        end
    )
    idx = 0
    uci:foreach("firewall", "include",
        function(s)
            if s.path == "/etc/firewall.d/dmz" then
                uci:set("firewall", "@include["..tostring(idx).."]", "enabled", convertBoolToInt(json.enableDmz))
            end
            idx = idx + 1
        end
    )
    uci:set("firewall", "nat_cone", "filter_type", json.natFilter)
    uci:set("firewall", "@dmz[0]", "ip", json.dmzServer)

    uci:commit("omcproxy")
    uci:commit("firewall")
    uci:commit("network")

    table.insert(changed_config, "omcproxy")
    table.insert(changed_config, "network")
    table.insert(changed_config, "firewall")

    return {status="success", message="Finish WAN Advanced Setup Settings"}

end

return M

