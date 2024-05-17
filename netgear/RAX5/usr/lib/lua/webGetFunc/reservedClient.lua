-- Get functions for LAN
local M = {}

local uci  = require "luci.model.uci".cursor()
local uci_st  = require "luci.model.uci".cursor(nil, "/var/state")
local attachedDev = require "webGetFunc.attachedDev"
local log = require("luci.log") -- for debug
local util = require "luci.util"

local function getDevName(mac)
    local name
    local mac_arry
    local mac2
    local hostname
    local custom_devname
    
    --remove ':' in the mac address
    mac_arry = util.split(mac, ":")
    mac2 = mac_arry[1]..mac_arry[2]..mac_arry[3]..mac_arry[4]..mac_arry[5]..mac_arry[6]

    hostname = uci_st:get("landev", mac2:lower(), "hostname")
    custom_devname = uci_st:get("landev", mac2:lower(), "custom_devname")
            
    if (custom_devname ~= nil) then
        name = custom_devname;
    elseif (hostname ~= nil) then
        name = hostname;
    else
        name = "---";
    end
    
    return name;
end

local function getReservedLists()
    log.debug(0)
    local reservedClients = {}
    local count = 0
    local index = 1

    uci:foreach("dhcp", "host",
        function(s)
        log.console("===DEBUG===:: getReservedLists s.ip="..s.ip.."  s.name="..s.name.." s.mac="..s.mac)
            local ip = s.ip
            -- Get device name only from /var/state/landev which is the attached devices entry for sync the devname between reserved table and attached device table.
            local name = getDevName(s.mac)
            local mac = s.mac

            reservedClients[tostring(index)] = {
                __index = index,
                __mac = mac,
                __addr = ip,
                __name = name,
                __count = count
            }
            count = count + 1
            index = index + 1
        end)

        return reservedClients
end

function M.getReservedTable()
    local reservedClients = {}

    reservedClients = getReservedLists()

    return reservedClients
end

function M.getNonReservedTable()
    log.debug(0)
    local reserved = false
    local index = 1
    local count = 0
    local nonreservedClients = {}
    local attachedDevices = attachedDev.getAttachedDevTable()
    local reservedClients = getReservedLists()
    
    for key_attachedDevs,value_attachedDevs in pairs(attachedDevices) do
        log.console("===DEBUG===attachedDevices",key_attachedDevs, value_attachedDevs.__mac, value_attachedDevs.__addr, value_attachedDevs.__name)

        for key_reservedClients,value_reservedClients in pairs(reservedClients) do
                log.console("===DEBUG===reservedClients",key_reservedClients, value_reservedClients.__mac, value_attachedDevs.__mac)
                if value_attachedDevs.__mac:upper() == value_reservedClients.__mac:upper() then
                    log.console("===DEBUG===:: getNonReservedTable same mac")
                    reserved = true
                    break
                end
        end

        -- the non-reserved reservation table show current attached devices but reserved devices
        if reserved == false then
            nonreservedClients[tostring(index)] = {
                __index     = index,
                __mac        = value_attachedDevs.__mac,
                __addr        = value_attachedDevs.__ip,
                __name      = value_attachedDevs.__name,
                __count      = count
            }

            count = count + 1
            index = index + 1
        end

        -- clear reserve flag and compare if next attached device has reserved ip address
        reserved = false

    end
    
    for key,value in pairs(nonreservedClients) do
        log.console("nonreservedClients:: ", key, value.__mac, value.__addr, value.__name)
    end

    return nonreservedClients

end

return M

