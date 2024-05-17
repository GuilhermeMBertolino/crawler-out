local M = {}
local uci    = require "luci.model.uci".cursor()
local log    = require "luci.log"
local validator = require "commonFunc.validator"
local util = require "luci.util"

--Set console debug flag for this handler
log.debug(1)

local function vlanRule_validator(parm, value)
    local ret = false;
    if (parm == "iid") or (parm == "portMember") then
        ret = true;
    end
    return ret;
end

local vlanRule_maps =
{
    action            = { data_type = "action",            handler = nil },
    iid               = { data_type = "number",            handler = vlanRule_validator },
    vid               = { data_type = "vlan_id",           handler = nil },
    portMember        = { data_type = "lan_ports",         handler = vlanRule_validator },
    priority          = { data_type = "vlan_priority",     handler = nil }
};

function scan_ports()
    local port_list = {}
    local port_used = {}

    uci:foreach("vlan", "switch_vlan",
    function(s)
        if s.name == "EtherWan" then return true end
        if s.name == "Internet" then return true end

        if s.ports ~= nil then
            port_list = util.split(s.ports," ")
            --log.console_r(port_list)
            for i in ipairs(port_list) do
                if port_list[i] == "1" then
                    port_used[1]="1"
                elseif port_list[i] == "2" then
                    port_used[2]="2"
                elseif port_list[i] == "3" then
                    port_used[3]="3"
                elseif port_list[i] == "4" then
                    port_used[4]="4"
                end
            end
        end
    end)

    log.console_r(port_used)
    local u_ports = ''
    for k, v in pairs(port_used) do
        if u_ports == '' then
            u_ports = v
        else
            u_ports=u_ports.." "..v
        end
    end
    log.console(u_ports)

    local r_ports = ''
    local int_port = { [1]="1",[2]="2",[3]="3",[4]="4",[5]="6" }
    for k, v in pairs(int_port) do
        if port_used[k] ~= v then
            if r_ports =='' then
                r_ports = v
            else
                r_ports = r_ports.." "..v
            end
        end
    end
    log.console(r_ports)
    return u_ports,r_ports
end

function scan_vlan_vid()
    local max_nr = 0
    local max_id = 0
    local vlan_list = {}
    local vid_list = {}
    uci:foreach("vlan", "switch_vlan",
    function(s)
        table.insert(vlan_list,s.vlan)
        table.insert(vid_list,s.vid)
        if s.name == 'Bridge' then return true end
        local nr = tonumber(s.vlan)
        local id = tonumber(s.vid)
        if nr ~= nil and nr > max_nr then max_nr = nr end
        if id ~= nil and id > max_id then max_id = id end
    end)

    --log.console_r(vid_list)
    return max_nr,vid_list
end

function calc_new_vid(vid, vid_lt)
    local vid_hit = 0
    for k, v in pairs(vid_lt) do
        if v == vid then vid_hit=1 end
    end
    if vid_hit == 1 then
        new_vid = tonumber(vid)+1
    else
        new_vid = tonumber(vid)
    end
    log.console("new vid="..new_vid)
    return new_vid
end

function concat_ports(json)
    local ports = ''
    local select_ports = {}
    local vc_port1 = uci:get("vlan", "VlanGP", "port1")
    local vc_port2 = uci:get("vlan", "VlanGP", "port2")
    local vc_port3 = uci:get("vlan", "VlanGP", "port3")
    local vc_port4 = uci:get("vlan", "VlanGP", "port4")

    if json.action == "add" or json.action == "edit" then
        if json.port1 == "true" and vc_port1 == "true" then
            select_ports[1]="1"
            uci:set("vlan", "VlanGP", "port1",  "false") -- Internet group
        elseif json.port1 == "false" and vc_port1 == "false" and json.action ~= "edit" then
            uci:set("vlan", "VlanGP", "port1",  "true")
        elseif json.port1 == "true" and vc_port1 == "false" then
            select_ports[1]="1"
        end

        if json.port2 == "true" and vc_port2 == "true" then
            select_ports[2]="2"
            uci:set("vlan", "VlanGP", "port2",  "false") --Internet group
        elseif json.port2 == "false" and vc_port2 == "false" and json.action ~= "edit" then
            uci:set("vlan", "VlanGP", "port2",  "true")
        elseif json.port2 == "true" and vc_port2 == "false" then
            select_ports[2]="2"
        end

        if json.port3 == "true" and vc_port3 == "true" then
            select_ports[3]="3"
            uci:set("vlan", "VlanGP", "port3",  "false") --Internet group
        elseif json.port3 == "false" and vc_port3 == "false" and json.action ~= "edit" then
            uci:set("vlan", "VlanGP", "port3",  "true")
        elseif json.port3 == "true" and vc_port3 == "false" then
            select_ports[3]="3"
        end

        if json.port4 == "true" and vc_port4 == "true" then
            select_ports[4]="4"
            uci:set("vlan", "VlanGP", "port4",  "false") --Internet group
        elseif json.port4 == "false" and vc_port4 == "false" and json.action ~= "edit" then
            uci:set("vlan", "VlanGP", "port4",  "true")
        elseif json.port4 == "true" and vc_port4 == "false" then
            select_ports[4]="4"
        end
    elseif json.action == "delete" then
        if json.port1 == "true" and vc_port1 == "false" then
            uci:set("vlan", "VlanGP", "port1",  "true")
        end
        if json.port2 == "true" and vc_port2 == "false" then
            uci:set("vlan", "VlanGP", "port2",  "true")
        end
        if json.port3 == "true" and vc_port3 == "false" then
            uci:set("vlan", "VlanGP", "port3",  "true")
        end
        if json.port4 == "true" and vc_port4 == "false" then
            uci:set("vlan", "VlanGP", "port4",  "true")
        end
    end

    select_ports[5]="0t" -- lan packets w/ vid to etherwan port
    select_ports[6]="5t" -- cpu port to wifi packets

    log.console_r(select_ports)
    local u_ports = ''
    for k, v in pairs(select_ports) do
        if u_ports == '' then
            u_ports = v
        else
            u_ports=u_ports.." "..v
        end
    end
    log.console(u_ports)

    uci:commit("vlan")
    --table.insert(changed_config, "vlan")
    return u_ports
end

function get_intf_idx(vlan_id)
    local idx = 0
    local hit = 0
    uci:foreach("vlan", "interface",
    function(s)
        if s.name ~= nil and string.find(s.name,vlan_id) ~= nil then
            hit = 1
        end
        --log.console("hit= "..hit)
        if hit == 1 then
            idx = idx
        elseif hit == 0 then
            idx = idx + 1
        end
    end)
    --log.console("final intf_idx = "..idx)
    return idx
end

function check_wifi_ifname()
    local hit_2g = 'false'
    local hit_5g = 'false'
    uci:foreach("vlan", "interface",
    function(s)
        if s.ifname ~= nil and s.name ~= nil then
            if string.find(s.ifname,"ra0") then
                log.console("check wifi2g ifname="..s.ifname)
                hit_2g = 'true'
            end
            if string.find(s.ifname,"rax0") then
                log.console("check wifi5g ifname="..s.ifname)
                hit_5g = 'true'
            end
        end
    end)
    return hit_2g,hit_5g
end

function update_vlan_ifname(json, vlan_intf)
    local ifname = vlan_intf
    local lan_ifname = "eth0"
    local hit_wifi2g = ''
    local hit_wifi5g = ''
    hit_wifi2g,hit_wifi5g = check_wifi_ifname()

    if json.action == 'add' or json.action == 'edit' then
        if json.wifi2g == "true" then
            ifname = ifname .. " ra0"
        end
        if json.wifi5g == "true" then
            ifname = ifname .. " rax0"
        end

        if (json.wifi2g == "on" and json.wifi5g == "on") or
            (json.wifi2g == "false" and json.wifi5g == "false") then
            lan_ifname = uci:get("vlan", "lan", "ifname")
        else
            if json.wifi2g == "on" or json.wifi2g == "false" then
                if hit_wifi2g == 'false' then
                    lan_ifname = lan_ifname .. " ra0"
                end
            end
            if json.wifi5g == "on" or json.wifi5g == "false" then
                if hit_wifi5g == 'false' then
                    lan_ifname = lan_ifname .. " rax0"
                end
            end
        end
    end

    log.console("update vlan ifname to "..ifname)
    log.console("update lan ifname to "..lan_ifname)
    return ifname,lan_ifname
end

function setback_wifi2g5g_internet()
    --lan_if = "eth0 ra1 rax1"
    local lan_if = uci:get("vlan", "lan", "ifname")
    ig_wifi2g = uci:get("vlan", "Internet", "wifi2g")
    ig_wifi5g = uci:get("vlan", "Internet", "wifi5g")
    if ig_wifi2g == 'true' and string.find(lan_if,"ra0") == nil then
        lan_if = lan_if.." ra0"
    end
    if ig_wifi5g == 'true' and string.find(lan_if,"rax0") == nil then
        lan_if = lan_if.." rax0"
    end
    if string.find(lan_if,"ra1") == nil then
        lan_if = lan_if .. " ra1"
    end
    if string.find(lan_if,"rax1") == nil then
        lan_if = lan_if .. " rax1"
    end
    log.console("Set back "..lan_if.." to vlan config...")
    uci:set("vlan", "lan", "ifname", lan_if)
end

function sync_wlintf_vlancfg(json, vlan_rule)
    local hit_wifi2g = ''
    local hit_wifi5g = ''
    hit_wifi2g,hit_wifi5g = check_wifi_ifname()
    log.console("wifi2g hit is "..hit_wifi2g..", wifi5g hit is "..hit_wifi5g)

    if json.action == 'add' then
        if json.wifi2g == 'true' and json.wifi5g == 'true' then
            uci:set("vlan", vlan_rule, "wifi2g",  "true")
            uci:set("vlan", vlan_rule, "wifi5g",  "true")
            uci:set("vlan", "VlanGP", "wifi2g",  "false")
            uci:set("vlan", "VlanGP", "wifi5g",  "false")
            uci:set("vlan", "Internet", "wifi2g",  "false")
            uci:set("vlan", "Internet", "wifi5g",  "false")
        elseif json.wifi2g == 'on' and json.wifi5g == 'true' then
            uci:set("vlan", vlan_rule, "wifi2g", "false")
            uci:set("vlan", vlan_rule, "wifi5g", "true")
            if hit_wifi2g == 'false' then
                uci:set("vlan", "VlanGP", "wifi2g",  "true")
                uci:set("vlan", "Internet", "wifi2g",  "true")
            end
            uci:set("vlan", "VlanGP", "wifi5g",  "false")
            uci:set("vlan", "Internet", "wifi5g",  "false")
        elseif json.wifi2g == 'true' and json.wifi5g == 'on' then
            uci:set("vlan", vlan_rule, "wifi2g", "true")
            uci:set("vlan", vlan_rule, "wifi5g", "false")
            uci:set("vlan", "VlanGP", "wifi2g",  "false")
            uci:set("vlan", "Internet", "wifi2g",  "false")
            if hit_wifi5g == 'false' then
                uci:set("vlan", "VlanGP", "wifi5g",  "true")
                uci:set("vlan", "Internet", "wifi5g",  "true")
            end
        end
    elseif json.action == 'edit' then
        if json.wifi2g == 'true' and json.wifi5g == 'true' then
            uci:set("vlan", "VlanGP", "wifi2g",  "false")
            uci:set("vlan", "VlanGP", "wifi5g",  "false")
            uci:set("vlan", "Internet", "wifi2g",  "false")
            uci:set("vlan", "Internet", "wifi5g",  "false")
            uci:set("vlan", vlan_rule, "wifi2g",  "true")
            uci:set("vlan", vlan_rule, "wifi5g",  "true")
        elseif json.wifi2g == 'false' and json.wifi5g == 'true' then
            if hit_wifi2g == 'false' then
                uci:set("vlan", "VlanGP", "wifi2g",  "true")
                uci:set("vlan", "Internet", "wifi2g",  "true")
            end
            uci:set("vlan", "VlanGP", "wifi5g",  "false")
            uci:set("vlan", "Internet", "wifi5g",  "false")
            uci:set("vlan", vlan_rule, "wifi2g", "false")
            uci:set("vlan", vlan_rule, "wifi5g", "true")
        elseif json.wifi2g == 'true' and json.wifi5g == 'false' then
            uci:set("vlan", "VlanGP", "wifi2g",  "false")
            uci:set("vlan", "Internet", "wifi2g",  "false")
            if hit_wifi5g == 'false' then
                uci:set("vlan", "VlanGP", "wifi5g",  "true")
                uci:set("vlan", "Internet", "wifi5g",  "true")
            end
            uci:set("vlan", vlan_rule, "wifi2g", "true")
            uci:set("vlan", vlan_rule, "wifi5g", "false")
        elseif json.wifi2g == 'false' and json.wifi5g == 'false' then
            uci:set("vlan", "VlanGP", "wifi2g",  "true")
            uci:set("vlan", "VlanGP", "wifi5g",  "true")
            uci:set("vlan", "Internet", "wifi2g",  "true")
            uci:set("vlan", "Internet", "wifi5g",  "true")
            uci:set("vlan", vlan_rule, "wifi2g", "false")
            uci:set("vlan", vlan_rule, "wifi5g", "false")
        end
    elseif json.action == 'delete' then
        if json.wifi2g == "true" and hit_wifi2g == 'false' then
            uci:set("vlan", "VlanGP", "wifi2g", "true")
            uci:set("vlan", "Internet", "wifi2g",  "true")
        end
        if json.wifi5g == "true" and hit_wifi5g == 'false' then
            uci:set("vlan", "VlanGP", "wifi5g", "true")
            uci:set("vlan", "Internet", "wifi5g",  "true")
        end
    end
end

function set_interface_vlan(eth_vid, section, json)
    --uci:set("vlan", section, "name", eth_vid)
    uci:set("vlan", section, "stp", "0")
    uci:set("vlan", section, "proto", "static")
    uci:set("vlan", section, "force_link", "1")
    uci:set("vlan", section, "type", "bridge")
    uci:set("vlan", section, "disabled", "0")

    local vlan_ifname,lan_ifname = update_vlan_ifname(json, eth_vid)
    uci:set("vlan", section, "ifname", vlan_ifname)
    uci:set("vlan", "lan", "ifname", lan_ifname)
end

function set_vlan_rule(name, vid, priority, ports, rule)
    uci:set("vlan", rule, "name",  name)
    if name == "Internet" then
        uci:set("vlan", "EtherWan", "vid",  vid)
        uci:set("vlan", "EtherWan", "priority",  priority)
    else
        uci:set("vlan", rule, "vid",  vid)
    end
    uci:set("vlan", rule, "name", name)
    uci:set("vlan", rule, "priority", priority)
    uci:set("vlan", rule, "ports",  ports)
end

--Add/Del/Edit VLAN tag group setting to /etc/config/vlan only
--Don't set /etc/config/network to aovid affect network behavior before user enabled VLAN tag group function
function M.vlanRule_handler(json)
    log.console_r(json) --dump json post data
    if (validator.post_data_validate(json, vlanRule_maps) == false) then
        log.print("Failed to parse the input JSON data!!!");
        return {status="error", message=tostring(json) };
    end

    --count currenct swtch_vlan entries
    local index = 0
    uci:foreach("vlan", "switch_vlan",
    function(s) index = index + 1
    end)

    local port_member = concat_ports(json)
    log.console("port member="..port_member)

    if json.action == "add" then
        log.console("=> Add Vlan Rule: "..json.name)

        local vid_lt = {}
        max_nr, vid_lt = scan_vlan_vid()
        new_vid = calc_new_vid(json.vid, vid_lt)

        vlan_rule = string.format("@switch_vlan[%d]", index)
        uci:add("vlan", "switch_vlan")

        uci:set("vlan", vlan_rule, "device",  "switch0")
        uci:set("vlan", vlan_rule, "vlan",  max_nr+1)
        uci:set("vlan", vlan_rule, "enable_rule",  "1")

        set_vlan_rule(json.name, new_vid, json.priority, port_member, vlan_rule)

        local ck_wifi2g,ck_wifi5g = check_wifi_ifname()
        if (ck_wifi2g == 'true' and json.wifi2g == 'true') or
            (ck_wifi5g == 'true' and json.wifi5g == 'true') then
            log.console("Failed to add wifi2g or wifi5g interface !!");
            log.print("Failed to add wifi2g or wifi5g interface !!!");
            return {status="error", message=tostring(json) };
        end
        sync_wlintf_vlancfg(json, vlan_rule)
        --setback_wifi2g5g_internet()
    elseif json.action == "delete" then
        log.console("=> Delete vlan rule: "..json.name)
        vlan_rule = string.format("@switch_vlan[%d]", json.iid+1)
        uci:delete("vlan", vlan_rule)

        sync_wlintf_vlancfg(json, vlan_rule) -- wait commit ntcfg, then sync vlancfg
        --setback_wifi2g5g_internet()

        -- Sync the index of unamed section and vlan entries
        -- default switch_vlan entries for /etc/config/vlan: 
        --      0:EtherWan, 1:Internet, 2:Bridge
        local idx = 0
        uci:foreach("vlan", "switch_vlan",
        function(s)
            --if s.name == "Bridge" then return true end
            if idx > 2 then
                v_rule = string.format("@switch_vlan[%d]", idx)
                uci:set("vlan", v_rule, "vlan", idx+1)
            end
            idx = idx + 1
        end)
    elseif json.action == "edit" then
        log.console("=> Edit VLAN Rule: "..json.name)
        if json.iid == '1' then -- Internet
            vlan_rule = string.format("@switch_vlan[%d]", json.iid)
        else
            vlan_rule = string.format("@switch_vlan[%d]", json.iid+1)
        end
        log.console(vlan_rule)
        set_vlan_rule(json.name, json.vid, json.priority, port_member, vlan_rule)
        sync_wlintf_vlancfg(json, vlan_rule)
    end

    local used_ports, r_ports = scan_ports()
    log.console("used_ports="..used_ports.." ,rest ports="..r_ports)
    -- set other ports to internet group --
    uci:set("vlan", "Internet", "ports",  r_ports)

    uci:commit("vlan")
    return {status="success", message="Finish Vlan Rule Setup"}

end

return M
