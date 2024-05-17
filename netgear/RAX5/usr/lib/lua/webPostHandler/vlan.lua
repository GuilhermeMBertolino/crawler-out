local M = {}
local uci    = require "luci.model.uci".cursor()
local log    = require "luci.log"
local validator = require "commonFunc.validator"
local util = require "luci.util"
local sys    = require "luci.sys"

--Set console debug flag for this handler
log.debug(1)

local function vlan_validator(parm, value)
    local ret = false;
    if (parm == "enabledVid") or (parm == "portMember") then
        ret = true;
    end
    return ret;
end

local vlan_maps =
{
    enableVlan        = { data_type = "boolean",          handler = nil },
    enabledVid        = { data_type = "number",           handler = vlan_validator },
    groupType         = { data_type = "vlan_type",        handler = nil }
};

function update_ifname(json, lan)
    local ifname = ''

    if lan == "1" then
        ifname = "eth0 ra1 rax1"
        if json.wifi2g == 'false' then
            ifname = ifname .. " ra0"
        end
        if json.wifi5g == 'false' then
            ifname = ifname .. " rax0"
        end
    elseif lan == "2" then
        ifname = "eth0.11"
        if json.wifi2g == 'true' then
            ifname = ifname .. " ra0"
        end
        if json.wifi5g == 'true' then
            ifname = ifname .. " rax0"
        end
    end

    log.console(ifname)
    return ifname
end

function br_ports_ifname(json)
    local sw_ports = '0'
    if json.port1 == 'true' then
        sw_ports = sw_ports.." 1"
    end
    if json.port2 == 'true' then
        sw_ports = sw_ports.." 2"
    end
    if json.port3 == 'true' then
        sw_ports = sw_ports.." 3"
    end
    if json.port4 == 'true' then
        sw_ports = sw_ports.." 4"
    end
    sw_ports = sw_ports.." 5 6t"

    return sw_ports
end

function get_switch_vlan_rules()
    local rules = 0
    uci:foreach("network", "switch_vlan",
    function(s) rules = rules + 1
    end)
    return rules
end

function check_wifi_ifname()
    local hit_2g = 'false'
    local hit_5g = 'false'
    uci:foreach("network", "interface",
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

function sync_VlanCfg(json)
    if json.groupType == 'port' then
        uci:set("vlan", "BridgeGP", "port1", json.port1)
        uci:set("vlan", "BridgeGP", "port2", json.port2)
        uci:set("vlan", "BridgeGP", "port3", json.port3)
        uci:set("vlan", "BridgeGP", "port4", json.port4)
        uci:set("vlan", "BridgeGP", "wifi2g", json.wifi2g)
        uci:set("vlan", "BridgeGP", "wifi5g", json.wifi5g)

        if json.port1=="true" then 
            uci:set("vlan", "VlanGP", "port1", "false")
        else 
            uci:set("vlan", "VlanGP", "port1", "true")
        end
        if json.port2=="true" then
            uci:set("vlan", "VlanGP", "port2", "false")
        else
            uci:set("vlan", "VlanGP", "port2", "true")
        end
        if json.port3=="true" then
            uci:set("vlan", "VlanGP", "port3", "false")
        else
            uci:set("vlan", "VlanGP", "port3", "true")
        end
        if json.port4=="true" then
            uci:set("vlan", "VlanGP", "port4", "false")
        else
            uci:set("vlan", "VlanGP", "port4", "true")
        end

        if json.wifi2g=="true" then
            uci:set("vlan", "VlanGP", "wifi2g", "false")
        else
            uci:set("vlan", "VlanGP", "wifi2g", "true")
        end
        if json.wifi5g=="true" then
            uci:set("vlan", "VlanGP", "wifi5g", "false")
        else
            uci:set("vlan", "VlanGP", "wifi5g", "true")
        end
    elseif json.groupType == 'vid' then
        uci:set("network", "lan2", "disabled", "1")
        uci:set("network", "Bridge", "ports", '')

        uci:set("vlan", "BridgeGP", "port1", "false")
        uci:set("vlan", "BridgeGP", "port2", "false")
        uci:set("vlan", "BridgeGP", "port3", "false")
        uci:set("vlan", "BridgeGP", "port4", "false")
        uci:set("vlan", "BridgeGP", "wifi2g", "false")
        uci:set("vlan", "BridgeGP", "wifi5g", "false")

        group_type = uci:get("vlan", "@VlanCfg[0]","groupType")
        enable_vlan = uci:get("vlan", "@VlanCfg[0]","enableVlan")

        -- setting from Bridge to VLAN group, set back VlanCfg at first time
        if group_type == 'port' or enable_vlan == 'false' then
            uci:set("vlan", "VlanGP", "port1", "true")
            uci:set("vlan", "VlanGP", "port2", "true")
            uci:set("vlan", "VlanGP", "port3", "true")
            uci:set("vlan", "VlanGP", "port4", "true")
            uci:set("vlan", "VlanGP", "wifi2g", "true")
            uci:set("vlan", "VlanGP", "wifi5g", "true")
        end
    end
end

function check_port_map(enabledVid)
    local port_list = {}
    local ck_p1=0
    local ck_p2=0
    local ck_p3=0
    local ck_p4=0
    local port_conflict=false

    uci:foreach("vlan", "switch_vlan",
    function(s)
        if s.name == "EtherWan" then return true end
        if s.name == "Internet" then return true end

        if s.vid ~= nil and string.find(enabledVid, s.vid) then
            --log.console(enabledVid)
            if s.ports ~= nil then
                port_list = util.split(s.ports," ")
                for i in ipairs(port_list) do
                    if port_list[i] == "1" then
                        ck_p1=ck_p1+1
                    elseif port_list[i] == "2" then
                        ck_p2=ck_p2+2
                    elseif port_list[i] == "3" then
                        ck_p3=ck_p3+3
                    elseif port_list[i] == "4" then
                        ck_p4=ck_p4+4
                    end
                end
            end
        end
    end)
    log.console(ck_p1, ck_p2, ck_p3, ck_p4)
    if ck_p1 > 1 or ck_p2 > 2 or ck_p3 > 3 or ck_p4 > 4 then
        port_conflict = true
    end

    log.console(port_conflict)
    return port_conflict
end

---------------------------------
----- for port-base w/o tag -----
---------------------------------
function rest_ports(ports)
    local port_list = {}
    local port_used = {}

    if ports ~= nil then
        port_list = util.split(ports," ")
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

    log.console_r(port_used)
    local u_ports = ''
    for k, v in pairs(port_used) do
        if u_ports == '' then
            u_ports = v
        else
            u_ports=u_ports.." "..v
        end
    end
    log.console("used ports= "..u_ports)

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
    log.console("rest ports= "..r_ports)
    return r_ports
end

function network_set_defcfg()
    --Default switch setting
    uci:set("network", "EtherWan", "vid", "")
    uci:set("network", "EtherWan", "ports", "0 5")
    uci:set("network", "Internet", "vid", "")
    uci:set("network", "Internet", "ports", "1 2 3 4 6")

    --Default LAN interfaces
    uci:set("network", "lan", "ifname", "eth0 ra0 rax0 ra1 rax1")

    --Default WAN interface
    uci:set("network", "wan", "ifname", "eth1")
end

function network_remove_custVLAN()
    --remove interfaces for vlan%d
    uci:foreach("network", "interface",
    function(s)
        if string.match(s['.name'], "%a+")  == "vlan" or s['.name'] == "lan2" then
            log.console("remove network."..s['.name'])
            uci:delete("network", s['.name'])
        end
    end)

    --remove switch_vlan, only keep EtherWan and Internet for both group mode
    uci:foreach("network", "switch_vlan",
    function(s)
        if s.name ~= "EtherWan" and s.name ~= "Internet" then
            log.console("remove network."..s['.name'])
            uci:delete("network", s['.name'])
        end
    end)
end

function network_sync_vlanrule()
    uci:foreach("vlan", "switch_vlan",
    function(s)
        if s.name == "EtherWan" then
            local ifname = "eth1."..s.vid
            uci:set("network", "wan", "ifname", ifname)
            
            uci:set("network", "EtherWan", "vid", s.vid)
            uci:set("network", "EtherWan", "priority", s.priority)
            -- hard code for MP project
            -- uci:set("network", "EtherWan", "ports", s.ports)
            uci:set("network", "EtherWan", "ports", "0t 5t")
            log.console("set network.wan.ifname="..ifname)
            log.console("set network.EtherWan.vid="..s.vid)
            log.console("set network.EtherWan.priority="..s.priority)
        elseif s.name == "Internet" then
            local ifname = "eth0 ra1 rax1"
            if s.wifi2g == "true" then
                ifname = ifname.." ra0"
            end
            if s.wifi5g == "true" then
                ifname = ifname.." rax0"
            end
            uci:set("network", "lan", "ifname", ifname)
            uci:set("network", "Internet", "priority", s.priority)
            uci:set("network", "Internet", "ports", s.ports)
            uci:set("network", "Internet", "vid", s.vid) -- should be '0'

            log.console("set network.lan.ifname="..ifname)
            log.console("set network.Internet.priority="..s.priority)
            log.console("set network.Internet.ports="..s.ports)
        elseif s.name == "Bridge" then
            log.console("skip port base group")
        else
            if s.enable_rule == "1" then
                -- The unamed section index of /etc/config/network should be "s.vlan - 1", ignore Bridge for VLAN tag group
                local section_name = string.format("@switch_vlan[%d]", s.vlan-1)
                log.console("create switch_vlan "..section_name.." for "..s.name)
                log.console("set network."..section_name..".ports="..s.ports)
                uci:section("network", "switch_vlan", nil, {
                    device = "switch0",
                    name = s.name,
                    vlan = s.vlan,
                    vid = s.vid,
                    priority = s.priority,
                    ports = s.ports
                })

                local ifname = "eth1."..s.vid
                if s.wifi2g == "true" then
                    ifname = ifname.." ra0"
                end
                if s.wifi5g == "true" then
                    ifname = ifname.." rax0"
                end
                section_name = "vlan"..s.vid
                log.console("create interface "..section_name.." for "..s.name)
                uci:section("network", "interface", section_name, {
                    force_link = "1",
                    stp = "0",
                    proto = "static",
                    type = "bridge",
                    ifname = ifname
                })
                log.console("set network."..section_name.."lan.ifname="..ifname)
            end
        end
    end)
end

function M.vlan_handler(json)
    log.console_r(json)

    if (validator.post_data_validate(json, vlan_maps) == false) then
        log.print("Failed to parse the input JSON data!!!");
        return {status="error", message=tostring(json) };
    end

    --Enable VLAN function
    if json.enableVlan == 'true' then
        -- enable VLAN function
        if json.groupType == 'port' then
            --Set to default
            network_set_defcfg()
            network_remove_custVLAN()
            log.console("Apply bridge group setting..")

            -- Apply bridge group setting
            -- Update /etc/config/vlan config
            uci:set("vlan", "BridgeGP", "port1", json.port1)
            uci:set("vlan", "BridgeGP", "port2", json.port2)
            uci:set("vlan", "BridgeGP", "port3", json.port3)
            uci:set("vlan", "BridgeGP", "port4", json.port4)
            uci:set("vlan", "BridgeGP", "wifi2g", json.wifi2g)
            uci:set("vlan", "BridgeGP", "wifi5g", json.wifi5g)
            
            -- Update /etc/config/network config
            -- update original br-lan
            local newbr_ports = br_ports_ifname(json)
            local lan_ports = rest_ports(newbr_ports)
            lan_ifname = update_ifname(json, "1")
            uci:set("network", "lan", "ifname",  lan_ifname)
            uci:set("network", "Internet", "ports",  lan_ports)
            log.console("Set original port group ports="..lan_ports)
            log.console("Set original port group ifname="..lan_ifname)

            -- create new bridge for port-based VLAN
            lan2_ifname = update_ifname(json, "2")
            log.console("create switch_vlan for Bridge and ports="..newbr_ports)
            uci:set("network", "Bridge", "switch_vlan")
            uci:set("network", "Bridge", "name", "Bridge")
            uci:set("network", "Bridge", "device", "switch0")
            uci:set("network", "Bridge", "vlan", "11")
            uci:set("network", "Bridge", "ports", newbr_ports)
            log.console("creainterface for lan2 and ifname="..lan2_ifname)
            uci:set("network", "lan2", "interface")
            uci:set("network", "lan2", "force_link", "1")
            uci:set("network", "lan2", "stp", "0")
            uci:set("network", "lan2", "proto", "static")
            uci:set("network", "lan2", "type", "bridge")
            uci:set("network", "lan2", "ifname", lan2_ifname)
        elseif json.groupType == 'vid' then
            -- Apply VLAN tag group
            -- error checking
            port_conflict = check_port_map(json.enabledVid)
            if port_conflict == true then
                log.console("Port Conflict!!!");
                return {status="error", message="Port Conflict"};
            end

            -- Set to default
            network_set_defcfg()
            network_remove_custVLAN()
            log.console("Apply VLAN tag group setting..")

            -- Apply VLAN rule to /etc/config/network
            network_sync_vlanrule()
        end
    else
        -- disable VLAN function
        -- Set to default
        network_set_defcfg()
        network_remove_custVLAN()
        -- do nothing
        log.console("Disable VLAN function!!!");
    end

    --Update VALN global cfg
    uci:set("vlan", "@VlanCfg[0]", "enableVlan",  json.enableVlan)
    uci:set("vlan", "@VlanCfg[0]", "groupType",  json.groupType)
    uci:commit("vlan")
    uci:commit("network")

    --force LAN ports to take effect
    luci.sys.call("touch /var/state/dhcpconfigchanged")

    --Trigger VALN/Network reload
    table.insert(changed_config, "vlan")
    table.insert(changed_config, "network")
    return {status="success", message="Apply Vlan or Bridge Settings"}
end

return M
