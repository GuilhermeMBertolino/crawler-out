-- Licensed to the public under the Apache License 2.0.
local M = {}
local uci  = require "luci.model.uci".cursor()
local log  = require "luci.log"
local validator = require "commonFunc.validator"
local wanCommon = require "webPostHandler.wanCommon"
require "commonFunc.wifiUtils_commDefs"

local is_static_ip = false
local is_static_dns = false

function opmode_validator(parm, value, json)
    -- custom handler function only be called at default datatype validate fail.
    local ret = false;

    if(parm == "ipType" or parm == "dnsType") then
        ----ipType and dnsType is empty("") as mode router
        if (json["mode"] == "router" and value == "") then
            ret = true
        end
    elseif(parm == "ipAddr") then
        --	log.console("Run ipAddr validator");
        if(is_static_ip == false and wanCommon.isFalseOrEmpty(value) == true) then
            -- dynamic ip, we don't save ipAddr, allow empty value
            ret = true
        end
    elseif(parm == "netmask") then
        --	log.console("Run netmask validator");
        if(is_static_ip == false) then
            -- dynamic ip, we don't save nermask, allow empty value
            ret = true
        end
    elseif(parm == "gateway") then
        --	log.console("Run gateway validator");
        if(is_static_ip == false and wanCommon.isFalseOrEmpty(value) == true) then
            -- dynamic ip, we don't save gateway, allow empty value
            ret = true
        end
    elseif(parm == "dns1") then
        --	log.console("Run dns1 validator");
        if(is_static_dns == false and wanCommon.isFalseOrEmpty(value) == true) then
            -- dynamic dns, we don't save dns1, allow empty value
            ret = true
        end
    elseif(parm == "dns2") then
        --	log.console("Run dns2 validator");
        if(is_static_dns == false and wanCommon.isFalseOrEmpty(value) == true) then
            -- dynamic dns, we don't save dns2, allow empty value
            ret = true
        elseif(wanCommon.isFalseOrEmpty(value) == true) then
            -- static dns, allow empty dns2
            ret = true
        end
    end

    return ret;
end

function vlan_enabled(value)

    if value == 1 then
        uci:delete("network", "Internet", "ports")
        uci:rename("network", "Internet", "_ports", "ports")
        uci:rename("network", "EtherWan", "_vid", "vid")
        uci:delete("network", "EtherWan", "ports")
        uci:rename("network", "EtherWan", "_ports", "ports")
        uci:rename("vlan", "@VlanCfg[0]", "_enableVlan", "enableVlan")
    else
        uci:rename("network", "lan", "ifname", "_ifname")
        uci:rename("network", "Internet", "ports", "_ports")
        uci:rename("network", "EtherWan", "vid", "_vid")
        uci:rename("network", "EtherWan", "ports", "_ports")
        uci:rename("vlan", "@VlanCfg[0]", "enableVlan", "_enableVlan")
        uci:set("network", "Internet", "ports", "1 2 3 4 6")
        uci:set("network", "EtherWan", "ports", "0 5")
    end

    uci:foreach("network", "interface",
    function(s)
        if string.match(s['.name'], "%a+")  == "vlan" or s['.name'] == "lan2" then
            if value == 1 then
                uci:delete("network", s['.name'], "disabled")
            else
                uci:set("network", s['.name'], "disabled", "1")
            end
        end
    end)

    uci:foreach("network", "switch_vlan",
    function(s)
        if s.name ~= "EtherWan" and s.name ~= "Internet" then
            if value == 1 then
                uci:rename("network", s['.name'], "_ports", "ports")
            else
                uci:rename("network", s['.name'], "ports", "_ports")
            end
        end
    end)

    --Commit vlan config only, network config will commit later
    uci:commit("vlan")
end

local opMode_maps = {
    ["mode"]  =   { data_type = "opmode",       handler = nil },
    ["ipType"]  = { data_type = "addr_assign",  handler = opmode_validator },
    ["ipAddr"]  = { data_type = "ipv4_addr",    handler = opmode_validator },
    ["netmask"] = { data_type = "ipv4_netmask", handler = opmode_validator },
    ["gateway"] = { data_type = "ipv4_addr",    handler = opmode_validator },
    ["dnsType"] = { data_type = "addr_assign",  handler = opmode_validator },
    ["dns1"]    = { data_type = "ipv4_addr",    handler = opmode_validator },
    ["dns2"]    = { data_type = "ipv4_addr",    handler = opmode_validator },
};

function M.opMode_handler(json)
    log.debug(0)
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
    --{"function":"opMode","data":{"mode":"router","ipType":"","ipAddr":"","netmask":"","gateway":"","dnsType":"","dns1":"","dns2":""}}
    --{"function":"opMode","data":{"mode":"ap","ipType":"dynamic","ipAddr":"111.2.1.60","netmask":"255.255.255.0","gateway":"111.2.1.252","dnsType":"fixed","dns1":"168.95.1.1","dns2":"168.95.192.1"}}
    --{"function":"opMode","data":{"mode":"bridge","enable_DynamicIp":"true","ipType":"dynamic","ipAddr":"111.2.1.60","netmask":"255.255.255.0","gateway":"111.2.1.252","enable_DynamicDns":"true","dnsType":"dynamic","dns1":"168.95.1.1","dns2":"168.95.192.1"}}
    log.print("opMode:", json["mode"])

    --1. Data validation
    if json["ipType"] == "fixed" then
        is_static_ip = true
    end
    if (json["mode"] == "ap" and json["ipType"] == "fixed") and (json["mode"] == "bridge" and json["dnsType"] == "fixed") then
        is_static_dns = true
    end
    --Check SSID of bridge mode
    local wifiIF = uci:get("network", "op_br", "wifiIF")
    local ssid = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, (wifiIF == "5G") and MTK_DEF_5G_CLIENT_IFNAME or MTK_DEF_2G_CLIENT_IFNAME, "SSID")
    if (json["mode"] == "bridge") and (wifiIF == nil or wifiIF == "" or ssid == nil or ssid == nil) then
        log.force("SSID cannot be blank.");
        return {status="error", message="SSID cannot be blank." };
    end
    if (validator.post_data_validate(json, opMode_maps) == false) then
        log.force("Failed to parse the input JSON data!!!");
        return {status="error", message="Data validation failed, "..tostring(json) };
    end

    --2. Update config
    uci:set("network", "@opmode[0]", "mode", json["mode"])
    --Update Router/DHCP setting
    if (json["mode"] == "router") then
        -- restore VLAN settings
        if uci:get("vlan", "@VlanCfg[0]", "_enableVlan") == "true" then
            vlan_enabled(1)
        end
        --enabled wan/wan_v6
        uci:delete("network", "wan", "disabled")
        uci:delete("network", "wan_v6", "disabled")
        --restore lan ifname/stp/proto
        local vlan_iface = uci:get("network", "lan", "_ifname")
        if (vlan_iface ~= nil) then
            uci:set("network", "lan", "ifname", vlan_iface) 
            uci:delete("network", "lan", "_ifname") 
        else
            uci:set("network", "lan", "ifname", "eth0 ra0 rax0 ra1 rax1") --For RAX5-IR006, change the default "ifname" becomes whole LAN+WLAN interfaces.
        end
        uci:set("network", "lan", "stp", "0")
        uci:set("network", "lan", "proto", "static")
        -- restore lan ip/mask
        local ipaddr = uci:get("network", "op_rt", "ipaddr")
        if (ipaddr) then uci:set("network", "lan", "ipaddr", ipaddr) end
        local netmask = uci:get("network", "op_rt", "netmask")
        if (netmask) then uci:set("network", "lan", "netmask", netmask) end
        --remove gateway/dns
        uci:delete("network", "lan", "gateway")
        uci:delete("network", "lan", "dns")
        --enabled dhcp lan
        uci:delete("dhcp", "lan", "ignore")

    elseif (json["mode"] == "ap" or json["mode"] == "bridge") then
        -- save VLAN settings
        if(json["mode"] == "ap" and uci:get("vlan", "@VlanCfg[0]", "enableVlan") == "true") then
            vlan_enabled(0)
        end
        --disabled wan/wan_v6
        uci:set("network", "wan", "disabled", "1")
        uci:set("network", "wan_v6", "disabled", "1")
        --set lan ifname/stp
        uci:set("network", "lan", "ifname", "eth0 eth1 ra0 rax0 ra1 rax1") --For RAX5-IR006 and AP mode, also change the default "ifname" becomes whole LAN+WLAN interfaces.
        uci:set("network", "lan", "stp", "1")
        --ignore dhcp lan
        uci:delete("dhcp", "lan", "ignore", "1")

        --ipType
        --sync ipType
        if (json["mode"] == "ap") then
            uci:set("network", "op_ap", "ipType", json["ipType"])
        else
            uci:set("network", "op_br", "ipType", json["ipType"])
        end
        if (json["ipType"] == "dynamic") then
            uci:set("network", "lan", "proto", "dhcp")
        elseif (json["ipType"] == "fixed") then 
            uci:set("network", "lan", "proto", "static")
            --backup lan ip/mask
            local ipaddr = uci:get("network", "lan", "ipaddr")
            local netmask = uci:get("network", "lan", "netmask")
            uci:set("network", "op_rt", "ipaddr", ipaddr)
            uci:set("network", "op_rt", "netmask", netmask)
            --set lan ip/mask/gateway
            uci:set("network", "lan", "ipaddr", json["ipAddr"])
            uci:set("network", "lan", "netmask", json["netmask"])
            uci:set("network", "lan", "gateway", json["gateway"])
            --sync ip/mask/gateway
            if (json["mode"] == "ap") then
                uci:set("network", "op_ap", "ipaddr", json["ipAddr"])
                uci:set("network", "op_ap", "netmask", json["netmask"])
                uci:set("network", "op_ap", "gateway", json["gateway"])
            else
                uci:set("network", "op_br", "ipaddr", json["ipAddr"])
                uci:set("network", "op_br", "netmask", json["netmask"])
                uci:set("network", "op_br", "gateway", json["gateway"])
            end
        end
        --dnsType
        local dns_list
        if (json["dns1"] ~= "" and json["dns1"] ~= "") then
            dns_list = json["dns1"] .. " " .. json["dns2"]
        elseif (json["dns1"] ~= "") then
            dns_list = json["dns1"]
        elseif (json["dns2"] ~= "") then
            dns_list = json["dns2"]
        end
        --sync dnsType
        if (json["mode"] == "bridge") then
            uci:set("network", "op_br", "dnsType", json["dnsType"])
            if (json["dnsType"] == "fixed") then
                --set dns
                uci:set("network", "lan", "dns", dns_list)
                --sync dns
                uci:set("network", "op_br", "dns1", json["dns1"])
                uci:set("network", "op_br", "dns2", json["dns2"])
            end
        elseif (json["mode"] == "ap" and json["ipType"] == "fixed") then
            --set dns
            uci:set("network", "lan", "dns", dns_list)
            --sync dns
            uci:set("network", "op_ap", "dns1", json["dns1"])
            uci:set("network", "op_ap", "dns2", json["dns2"])
        end

    end
    uci:commit("dhcp")
    --Update wireless setting
    if (json["mode"] == "bridge") then
        --backup AP AutoChannel/BSSCoexistence
        local wifiIF = uci:get("network", "op_br", "wifiIF")
        --AutoChannel and BSSCoexistence will call ChannelSwitch, it may delay ApCliAutoConncet
        if wifiIF and wifiIF == "2G" then
            --backup AutoChannel
            local channel_2G = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "channel")
            if (channel_2G and channel_2G == "0") then
                uci:set("network", "op_rt", "channel_2G", channel_2G)
                uci:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "channel", "1")
            end
            --backup BSSCoexistence
            local BSSCoexistence_2G = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "BSSCoexistence")
            if (BSSCoexistence_2G and BSSCoexistence_2G == "true") then
                uci:set("network", "op_rt", "BSSCoexistence_2G", BSSCoexistence_2G)
                uci:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "BSSCoexistence", "false")
            end
        elseif wifiIF and wifiIF == "5G" then
            --backup AutoChannel
            local channel_5G = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "channel")
            if (channel_5G and channel_5G == "0") then
                uci:set("network", "op_rt", "channel_5G", channel_5G)
                uci:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "channel", "36")
            end
        end
        uci:commit(NTGR_WIFI_UCI_CONFIG_NAME)
    elseif (json["mode"] == "router" or json["mode"] == "ap") then
        --restore AP setting (AutoChannel/BSSCoexistence)
        if (channel_2G) then
            uci:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "channel", channel_2G)
            uci:delete("network", "op_rt", "channel_2G")
        end
        local BSSCoexistence_2G = uci:get("network", "op_rt", "BSSCoexistence_2G")
        if (BSSCoexistence_2G) then
            uci:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "BSSCoexistence", BSSCoexistence_2G)
            uci:delete("network", "op_rt", "BSSCoexistence_2G")
        end
        local channel_5G = uci:get("network", "op_rt", "channel_5G")
        if (channel_5G) then
            uci:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "channel", channel_5G)
            uci:delete("network", "op_rt", "channel_5G")
        end
        if radioOn_2G or channel_2G or BSSCoexistence_2G or radioOn_5G or channel_5G then
            uci:commit(NTGR_WIFI_UCI_CONFIG_NAME)
        end
    end
    uci:commit("network")

    local fork_exec = require"commonFunc.fork".fork_exec
    fork_exec("/usr/bin/ra_cli -r 7")
    fork_exec("sync; sleep 1; reboot")
    return {status="success", message="Finish opMode Setup!"}
end

return M
