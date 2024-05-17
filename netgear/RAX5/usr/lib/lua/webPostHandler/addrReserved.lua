-- Licensed to the public under the Apache License 2.0.
local M = {}
--local os     = require "os"
--local sys   = require "luci.sys"
local uci    = require "luci.model.uci".cursor()
local util = require "luci.util"
local log    = require "luci.log"

-------------------------------------------------------------------------------
-- Check if the adding/editing reservation rule is duplicated with others in reservation table
-- @param ip - ip address to be compared
-- @param mac - mac address to be compared
-- @param ruleIndex - the index of the edited rule
-- @return one array ret
--     ret[0] - if the newly add or edited reservation rule is duplicated  with existing reservation rules
--     ret[1] - duplicated reservation index or the next index for being added rule
local function checkAddrReservationDuplicated(ip, mac, ruleIndex)
    local index= 0
    local duplicated = false
    local ret={0, 0}

    uci:foreach("dhcp", "host",
        function(s)
            -- check if ip or mac duplicated with other rules in reservation table
            if (s.ip == ip or s.mac == mac) and index ~= tonumber(ruleIndex) then
                duplicated = true
            end

            -- if duplicated ip or mac exists, overwrite the duplicated reservation rule
            if duplicated == false then
                index = index + 1
            end
        end)

        if duplicated == true then
            ret[0] = 1
        else
            ret[0] = 0
        end

        ret[1] = index

        return ret
end

function M.addrReserved_handler(json)
    log.debug(0)
    log.console_r(json)
    log.console("static lease:", json.action,  json.original_ipAddr, json.ipAddr,  json.original_macAddr, json.macAddr, json.ruleSelect, json.deviceName)
    local index, host
    -- if user click add button and add one reserved client without selecting one from the non-reserved table, json.ruleSelect would be nil
    if json.ruleSelect ~= nil then
        index = json.ruleSelect
        host = string.format("@host[%d]",index)
    end

    if json.action == "add" then
            log.console("===DEBUG===Add button is clicked!")
            local ret = {0, 0}

            ret = checkAddrReservationDuplicated(json.ipAddr, json.macAddr, -1)

            if ret[0] == 0 then
                -- not duplicated and newly add, so add one new section
                uci:add("dhcp", "host")
            end

            -- construct the host to be added/overwrite
            -- per spec, if users add a new reservation with the same MAC address or IP address as an existing reservationre, place the old one with new data
            host = string.format("@host[%d]", ret[1])

            -- add/overwrite section options
            uci:set("dhcp", host, "name",  json.deviceName)
            uci:set("dhcp", host, "dns",  "1")
            uci:set("dhcp", host, "mac",  json.macAddr)
            uci:set("dhcp", host, "leasetime",  "24h")
            uci:set("dhcp", host, "ip",  json.ipAddr)
            uci:commit("dhcp")
            
            -- write devname also to landev for sync the devname between reserved table and attached device table.
            --remove ':' in the mac address
            local mac_arry
            local mac2
            mac_arry = util.split(json.macAddr, ":")
            mac2 = mac_arry[1]..mac_arry[2]..mac_arry[3]..mac_arry[4]..mac_arry[5]..mac_arry[6]
            -- for newly added reserved client, the client may not be in /etc/config/landev, so we need add the section first
            uci:section("landev", "dev", mac2:lower())
            uci:set("landev", mac2:lower(), "custom_devname", json.deviceName)
            uci:commit("landev")
	    os.execute("touch /var/state/dhcpconfigchanged")

    elseif json.action == "delete" then
        log.console("===DEBUG===::Delete button is clicked!")
        uci:delete("dhcp", host)
        uci:commit("dhcp")

    elseif json.action == "edit" then
        log.console("===DEBUG===::Edit button is clicked!")
        local ret = {0, 0} 
        local config_changed = false
        local host_dup = ""

        -- check if the edited rule is conflict with the existing one and conflict rule index
        ret = checkAddrReservationDuplicated(json.ipAddr, json.macAddr, json.ruleSelect)

        if ret[0] == 1 and ret[1] ~= tonumber(json.ruleSelect) then
            -- duplicated with existing reservation rule, remove the duplicated one
            host_dup = string.format("@host[%d]", ret[1])
        end

        local devName_orig = uci:get("dhcp", host, "name")

        if json.original_ipAddr ~= json.ipAddr then
            uci:set("dhcp", host, "ip",  json.ipAddr)
            config_changed = true
        end

        if json.original_macAddr ~= json.macAddr then
            uci:set("dhcp", host, "mac",  json.macAddr)
            config_changed = true
        end

        if devName_orig ~= json.deviceName then
            uci:set("dhcp", host, "name",  json.deviceName)
            config_changed = true
        end

        if host_dup ~= "" then
            -- delete the duplicated reservation rule
            uci:delete("dhcp", host_dup)
        end

        if config_changed == true then
            uci:commit("dhcp")
        end
        
        -- write devname also to landev for sync the devname between reserved table and attached device table.
        --remove ':' in the mac address
        local mac_arry
        local mac2
        mac_arry = util.split(json.macAddr, ":")
        mac2 = mac_arry[1]..mac_arry[2]..mac_arry[3]..mac_arry[4]..mac_arry[5]..mac_arry[6]
        uci:set("landev", mac2:lower(), "custom_devname", json.deviceName)
        uci:commit("landev")
	os.execute("touch /var/state/dhcpconfigchanged")

    end

    table.insert(changed_config, "dhcp")
    table.insert(changed_config, "landev")

    return {status="success", message="Finish Reservation Table"}

end

return M
