local M = {}

local log    = require "luci.log"
local uci    = require "luci.model.uci".cursor()

function portConflictWithVpn(port, protocol)
    log.debug(0)
    local vpnEnabled = uci:get("openvpn", "openvpn_tun", "enabled")
    local vpnTunProto = uci:get("openvpn", "openvpn_tun", "proto")
    local vpnTunPort = uci:get("openvpn", "openvpn_tun", "dest_port")
    local vpnTapProto = uci:get("openvpn", "openvpn_tap", "proto")
    local vpnTapPort = uci:get("openvpn", "openvpn_tap", "dest_port")

    if ( vpnEnabled == '0' ) then
        return false
    end

    if ( protocol == 'tcp udp' ) then
         -- both, same port -> port conflict
        if ( tonumber(port) == tonumber(vpnTunPort) or tonumber(port) == tonumber(vpnTapPort) ) then
            return true
        end
    elseif ( protocol == 'tcp' or  protocol == 'udp' ) then
        -- tcp or udp, same protocol and same port -> port conflict
        if ( (string.lower(protocol) == string.lower(vpnTunProto) and tonumber(port) == tonumber(vpnTunPort)) or
             (string.lower(protocol) == string.lower(vpnTapProto) and tonumber(port) == tonumber(vpnTapPort)) ) then
            return true
        end
    end
end

function portConflictWithPortForwarding(port, protocol)
    log.debug(0)
    local conflict = false
    local portStart, portEnd

    uci:foreach("firewall", "redirect",
        function(s)
            log.console("===DEBUG===:: portConflictWithPortForwarding s.dest_ip="..s.dest_ip.."  s.name="..s.name.."    s.proto="..s.proto.."   s.src_dport="..s.src_dport.."   s.dest_port="..s.dest_port)

            -- conflict with one of the port forarding rules, no need to compare with other rules
            if conflict == true then
                log.console("===DEBUG===conflict with one of the port forarding rules, no need to compare with other rules!")
                -- cannot break the foreach loop by break, so use return to ignore conflict check
                return
            end

            -- check protocol, protocol is different, return to compare with next entry
            if ( (string.lower(protocol) == "tcp" and string.lower(s.proto) == "udp") or
                 (string.lower(protocol) == "udp" and string.lower(s.proto) == "tcp") ) then
                log.console("===DEBUG===protocol is different, return to compare with next entry")
                return
            end

            -- parsing port forwarding external port, which may be one single port or port range or both single port and port range, i.e 6666 or 20-21 or 30,50-60,65500-65510
            -- first, split port range string by comma
            local delimiter = '([^,]+)'
            for subPort in string.gmatch(s.src_dport, delimiter) do
                portStart = subPort:match("%d+")
                portEnd = subPort:match("-(%d+)")
                if portEnd == nil then
                    -- single port
                    portEnd = portStart
                end

                -- check port number
                if ( tonumber(port) < tonumber(portStart) or tonumber(port) > tonumber(portEnd) ) then
                    -- port number is different, return to compare with next entry
                    log.console("===DEBUG===port number is different, return to compare with next entry!")
                else
                    -- port number conflict
                    log.console("===DEBUG===port number conflict!")
                    conflict = true
                end
                -- if port conflict detected, no need to check other sub port range
                if conflict == true then
                    break
                end
            end
        end)

    return conflict
end

function portConflictWithPortTriggering(port, protocol)
    log.debug(0)
    local conflict = false
    local portStart, portEnd

    uci:foreach("firewall", "trigger",
        function(s)
            log.console("===DEBUG===:: portConflictWithPortTriggering s.trigger_ip="..s.trigger_ip.."  s.name="..s.name.."    s.proto="..s.proto.."   s.trigger_port="..s.trigger_port.."   s.inbound_port="..s.inbound_port)

            -- conflict with one of the port triggering rules, no need to compare with other rules
            if conflict == true then
                log.console("===DEBUG===conflict with one of the port triggering rules, no need to compare with other rules!")
                -- cannot break the foreach loop by break, so use return to ignore conflict check
                return
            end

            -- check protocol, protocol is different, return to compare with next entry
            if ( (string.lower(protocol) == "tcp" and string.lower(s.proto) == "udp") or
                 (string.lower(protocol) == "udp" and string.lower(s.proto) == "tcp") ) then
                log.console("===DEBUG===protocol is different, return to compare with next entry")
                return
            end

            -- parsing port triggering trigger_port, which may be one single port or port range or both single port and port range, i.e 6666 or 20-21 or 30,50-60,65500-65510
            -- first, split port range string by comma
            local delimiter = '([^,]+)'
            for subPort in string.gmatch(s.inbound_port, delimiter) do
                portStart = subPort:match("%d+")
                portEnd = subPort:match("-(%d+)")
                if portEnd == nil then
                    -- single port
                    portEnd = portStart
                end

                -- check port number
                if ( tonumber(port) < tonumber(portStart) or tonumber(port) > tonumber(portEnd) ) then
                    -- port number is different, return to compare with next entry
                    log.console("===DEBUG===port number is different, return to compare with next entry!")
                else
                    -- port number conflict
                    log.console("===DEBUG===port number conflict!")
                    conflict = true
                end
                -- if port conflict detected, no need to check other sub port range
                if conflict == true then
                    break
                end
            end
        end)

    return conflict
end


function portConflictWithUpnp(port, protocol)
    log.debug(0)
    local conflict = false
    local ipt = io.popen("iptables --line-numbers -t nat -xnvL MINIUPNPD 2>/dev/null")

    if ipt then

        while true do
            local ln = ipt:read("*l")
            if not ln then
                break
            elseif ln:match("^%d+") then
                local num, proto, extport, intaddr, intport = ln:match("^(%d+).-([a-z]+).-dpt:(%d+) to:(%S-):(%d+)")

                if num and proto and extport and intaddr and intport then
                    num     = tonumber(num)

                    -- check protocol, protocol is different, return to compare with next entry
                    if ( (string.lower(protocol) == "tcp" and string.lower(proto) == "udp") or
                         (string.lower(protocol) == "udp" and string.lower(proto) == "tcp") ) then
                        log.console("===DEBUG===protocol is different, return to compare with next entry")
                        return
                    end

                    -- check if port conflict
                    if port == extport then
                        conflict = true
                    end

                end
            end
        end
		
        ipt:close()
    end

    return conflict
end

function M.portConflictCheck(feature_type, port, protocol)
    log.debug(0)

    -- check if port conflict with VPN Service
    if ( feature_type ~= 'vpn'  and portConflictWithVpn(port, protocol) == true ) then
        log.console("===DEBUG===portConflictCheck:: port conflict with VPN Service")
        return true
    end

    -- check if port conflict with Port Forwarding
    if ( feature_type ~= 'port_forwarding' and portConflictWithPortForwarding(port, protocol) == true ) then
        log.console("===DEBUG===portConflictCheck:: port conflict with Port Forwarding")
        return true
    end

    -- check if port conflict with UPnP
    if ( feature_type ~= 'upnp' and portConflictWithUpnp(port, protocol) == true ) then
        log.console("===DEBUG===portConflictCheck:: port conflict with UPnP")
        return true
    end

    -- check if port conflict with Port Triggering
    if ( feature_type ~= 'port_triggering' and portConflictWithPortTriggering(port, protocol) == true ) then
        log.console("===DEBUG===portConflictCheck:: port conflict with Port Triggering")
        return true
    end

    return false
end

function M.portConflictCheckByService(port)
    local conflict = false

    -- upnpd
    local upnpdPort = uci:get("upnpd", "config", "port")
    -- soapd
    local soapdPort1 = "5000" 
    local soapdPort2 = "5443"

    if ( tonumber(port) == tonumber(upnpdPort) or tonumber(port) == tonumber(soapdPort1) or tonumber(port) == tonumber(soapdPort2) ) then
        conflict = true
    end

    return conflict
end

function M.portConflictCheckStringPort(feature_type, port, protocol)
    log.debug(0)

    local portStart, portEnd
    local conflict = false

    -- parsing port forwarding external port, which may be one single port or port range or both single port and port range, i.e 6666 or 20-21 or 30,50-60,65500-65510
    -- first, split port range string by comma
    local delimiter = '([^,]+)'
    for subPort in string.gmatch(port, delimiter) do
        log.console("===DEBUG===::sub port="..subPort)
        portStart = subPort:match("%d+")
        portEnd = subPort:match("-(%d+)")
        if portEnd == nil then
            -- single port
            portEnd = portStart
        end

        for newPort = portStart, portEnd do
            log.console("===DEBUG===newPort="..newPort)
            --conflict = M.portConflictCheck(feature_type, newPort, protocol)
            --conflict = M.portConflictCheckByService(newPort)
            if ( M.portConflictCheck(feature_type, newPort, protocol) == true or M.portConflictCheckByService(newPort) == true) then
                conflict = true
            end

            -- if port conflict detected, no need to check other part of one sub port range
            if conflict == true then
                break
            end
        end

        -- if port conflict detected, no need to check other sub port range
        if conflict == true then
            break
        end

    end

    return conflict
end

return M
