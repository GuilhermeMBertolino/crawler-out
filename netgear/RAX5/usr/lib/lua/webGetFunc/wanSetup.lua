#!/usr/bin/lua

local log = require "luci.log"
local uci = require "uci".cursor()
local uci_st = require "luci.model.uci".cursor_state()

local M = {}

function convertIntToBool(s)

    local ret = "false"

    if s == "1" then
        ret = "true"
    else
        ret = "false"
    end

    return ret

end

function M.getWanInterfacePath()

    -- TODO
    return "true"
end

function M.getCheckboxVal_disableProtection()
    local val = uci:get("firewall", "@defaults[0]", "dos_protection_disabled")
    return nil ~= val and convertIntToBool(val) or "false"
end

function M.getInputVal_enableProtection()

    -- TODO
    return "true"
end

function M.getCheckboxVal_enableDmz()
    local ret = "false"
    uci:foreach("firewall", "include",
        function(s)
            if s.path == "/etc/firewall.d/dmz" then
                ret = convertIntToBool(s.enabled)
            end
        end
    )
    return ret
end


function M.getIpVal_dmzServer()
    local ret = uci:get("firewall", "@dmz[0]", "ip") or "192.168.1.0"
    return ret
end

function M.getCheckboxVal_responsePing()
    local ret = "false"
    uci:foreach("firewall", "rule",
        function(s)
            if s.name == "Allow-Ping" then
                ret = convertIntToBool(s.enabled)
            end
        end
    )
    return ret
end

function M.getCheckboxVal_disableIgmpProxy()

    local ret = uci:get("omcproxy", "@defaults[0]", "enable") or "1"
    if (ret == "1") then
        ret = "0"
    else
        ret = "1"
    end
    return convertIntToBool(ret)

end

function M.getInputVal_enableIgmpProxy()

    local ret = uci:get("omcproxy", "@defaults[0]", "enable") or "1"
    return convertIntToBool(ret)

end

function M.getInputVal_mtuSize()
    local mode = uci:get("network", "inet_global", "wan_mode")
    local ret = "1500"
    if(mode == "DHCP" or mode == "Static" or mode == "PPPoE") then
        ret = uci:get("network", "wan", "mtu")
    elseif(mode == "PPTP") then
        ret = uci:get("network", "pptp", "mtu")
    elseif(mode == "L2TP") then
        ret = uci:get("network", "l2tp", "mtu")
    end
    return ret
end

function M.getRadioVal_natFilter()

    local ret = uci:get("firewall", "nat_cone", "filter_type") or "open"
    return ret
end

function M.getCheckboxVal_disableSipAlg()

    local ret = uci:get("firewall", "@defaults[0]", "sip_alg") or "1"
    if (ret == "1") then
        ret = "0"
    else
        ret = "1"
    end
    return convertIntToBool(ret)
end

function M.getInputVal_enableSipAlg()

    local ret = uci:get("firewall", "@defaults[0]", "sip_alg") or "1"
    return convertIntToBool(ret)
end

function M.get_WanInfName()

    local wanInfName
    wanInfName = uci_st:get("network", "inet", "ifname")
    return wanInfName
end

return M
