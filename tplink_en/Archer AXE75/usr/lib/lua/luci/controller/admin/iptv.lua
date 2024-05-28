--[[
Copyright(c) 2008-2014 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  iptv.lua
Details :  Controller for IPTV webpage
Author  :  Guo Dongxian <guodongxian@tp-link.net>
Version :  1.0.0
Date    :  12 Aug, 2014
]]--

module("luci.controller.admin.iptv", package.seeall)

local uci    = require "luci.model.uci"
local dtypes = require "luci.tools.datatypes"
local dbg    = require "luci.tools.debug"
local sys    = require "luci.sys"
local util   = require "luci.util"
local json  = require "luci.json"
local logm  = require "luci.model.log"
local ctl    = require "luci.model.controller"

local RELOAD_IPTV = "/etc/init.d/iptv restart"
local cfg_changed = false
local default_igmp_version_list = {"2", "3"}

local function get_default_config(mode)
    local data = {}

    if mode == "ExStream" then
        data.configure = "off"
        data.internet_item = "on"
        data.iptv_item = "on"
        data.ipphone_item = "off"
        data.mciptv_item = "off"

        data.internet_tag   = "on"
        data.internet_vid   = "10"
        data.internet_vprio = "0"
        data.iptv_vid       = "20"
        data.iptv_vprio     = "4"
        data.ipphone_vid    = "0"
        data.ipphone_vprio  = "0"
        data.mciptv_enable  = "off"
        data.mciptv_vid     = "0"
        data.mciptv_vprio   = "0"
        data.porttype       = "Internet Internet Internet IPTV"
    elseif mode == "Unifi" then
        data.configure = "off"
        data.internet_item = "on"
        data.iptv_item = "on"
        data.ipphone_item = "on"
        data.mciptv_item = "off"

        data.internet_tag   = "on"
        data.internet_vid   = "500"
        data.internet_vprio = "0"
        data.iptv_vid       = "600"
        data.iptv_vprio     = "0"
        data.ipphone_vid    = "400"
        data.ipphone_vprio  = "0"
        data.mciptv_enable  = "off"
        data.mciptv_vid     = "0"
        data.mciptv_vprio   = "0"
        data.porttype       = "IPTV Internet Internet IP-Phone"
    elseif mode == "Maxis" then
        data.configure = "off"
        data.internet_item = "on"
        data.iptv_item = "on"
        data.ipphone_item = "on"
        data.mciptv_item = "off"

        data.internet_tag   = "on"
        data.internet_vid   = "621"
        data.internet_vprio = "0"
        data.iptv_vid       = "823"
        data.iptv_vprio     = "0"
        data.ipphone_vid    = "822"
        data.ipphone_vprio  = "0"
        data.mciptv_enable  = "off"
        data.mciptv_vid     = "0"
        data.mciptv_vprio   = "0"
        data.porttype       = "IPTV Internet Internet IP-Phone"
    elseif mode == "Maxis2" then
        data.configure = "off"
        data.internet_item = "on"
        data.iptv_item = "on"
        data.ipphone_item = "on"
        data.mciptv_item = "off"

        data.internet_tag   = "on"
        data.internet_vid   = "11"
        data.internet_vprio = "0"
        data.iptv_vid       = "17"
        data.iptv_vprio     = "0"
        data.ipphone_vid    = "14"
        data.ipphone_vprio  = "0"
        data.mciptv_enable  = "off"
        data.mciptv_vid     = "0"
        data.mciptv_vprio   = "0"
        data.porttype       = "IPTV Internet Internet IP-Phone"
    elseif mode == "Celcom" then
        data.configure = "off"
        data.internet_item = "on"
        data.iptv_item = "off"
        data.ipphone_item = "on"
        data.mciptv_item = "off"

        data.internet_tag   = "on"
        data.internet_vid   = "101"
        data.internet_vprio = "0"
        data.iptv_vid       = "0"
        data.iptv_vprio     = "0"
        data.ipphone_vid    = "201"
        data.ipphone_vprio  = "0"
        data.mciptv_enable  = "off"
        data.mciptv_vid     = "0"
        data.mciptv_vprio   = "0"
        data.porttype       = "Internet Internet Internet IP-Phone"
    elseif mode == "TELEKOM1" then
        data.configure = "off"
        data.internet_item = "on"
        data.iptv_item = "on"
        data.ipphone_item = "off"
        data.mciptv_item = "off"

        data.internet_tag   = "on"
        data.internet_vid   = "7"
        data.internet_vprio = "0"
        data.iptv_vid       = "7"
        data.iptv_vprio     = "0"
        data.ipphone_vid    = "0"
        data.ipphone_vprio  = "0"
        data.mciptv_enable  = "off"
        data.mciptv_vid     = "0"
        data.mciptv_vprio   = "0"
        data.porttype       = "Internet Internet Internet Internet"
    elseif mode == "TELEKOM2" then
        data.configure = "off"
        data.internet_item = "on"
        data.iptv_item = "on"
        data.ipphone_item = "off"
        data.mciptv_item = "off"

        data.internet_tag   = "on"
        data.internet_vid   = "7"
        data.internet_vprio = "0"
        data.iptv_vid       = "8"
        data.iptv_vprio     = "0"
        data.ipphone_vid    = "0"
        data.ipphone_vprio  = "0"
        data.mciptv_enable  = "off"
        data.mciptv_vid     = "0"
        data.mciptv_vprio   = "0"
        data.porttype       = "Internet Internet Internet IPTV"
    elseif mode == "AIS" then
        data.configure = "off"
        data.internet_item = "on"
        data.iptv_item = "off"
        data.ipphone_item = "off"
        data.mciptv_item = "off"

        data.internet_tag   = "on"
        data.internet_vid   = "10"
        data.internet_vprio = "0"
        data.iptv_vid       = "0"
        data.iptv_vprio     = "0"
        data.ipphone_vid    = "0"
        data.ipphone_vprio  = "0"
        data.mciptv_enable  = "off"
        data.mciptv_vid     = "0"
        data.mciptv_vprio   = "0"
        data.porttype       = "Internet Internet Internet Internet"
    elseif mode == "CENTURYLINK" then
        data.configure = "off"
        data.internet_item = "on"
        data.iptv_item = "off"
        data.ipphone_item = "off"
        data.mciptv_item = "off"
        data.internet_tag   = "on"

        data.internet_vid   = "201"
        data.internet_vprio = "0"
        data.iptv_vid       = "0"
        data.iptv_vprio     = "0"
        data.ipphone_vid    = "0"
        data.ipphone_vprio  = "0"
        data.mciptv_enable  = "off"
        data.mciptv_vid     = "0"
        data.mciptv_vprio   = "0"
        data.porttype       = "Internet Internet Internet Internet"
    elseif mode == "Vietnam" then
        data.configure = "off"
        data.internet_item = "on"
        data.iptv_item = "on"
        data.ipphone_item = "on"
        data.mciptv_item = "off"

        data.internet_tag   = "on"
        data.internet_vid   = "35"
        data.internet_vprio = "0"
        data.iptv_vid       = "2502"
        data.iptv_vprio     = "4"
        data.ipphone_vid    = "37"
        data.ipphone_vprio  = "5"
        data.mciptv_enable  = "off"
        data.mciptv_vid     = "0"
        data.mciptv_vprio   = "0"
        data.porttype       = "Internet Internet IPTV IP-Phone"
    elseif mode == "MEO" then
        data.configure = "off"
        data.internet_item = "on"
        data.iptv_item = "off"
        data.ipphone_item = "off"
        data.mciptv_item = "off"

        data.internet_tag   = "on"
        data.internet_vid   = "12"
        data.internet_vprio = "0"
        data.iptv_vid       = "0"
        data.iptv_vprio     = "0"
        data.ipphone_vid    = "0"
        data.ipphone_vprio  = "0"
        data.mciptv_enable  = "off"
        data.mciptv_vid     = "0"
        data.mciptv_vprio   = "0"
        data.porttype       = "Internet Internet Internet Bridge"
    elseif mode == "VDF" then
        data.configure = "off"
        data.internet_item = "on"
        data.iptv_item = "on"
        data.ipphone_item = "on"
        data.mciptv_item = "off"

        data.internet_tag   = "on"
        data.internet_vid   = "100"
        data.internet_vprio = "0"
        data.iptv_vid       = "105"
        data.iptv_vprio     = "0"
        data.ipphone_vid    = "101"
        data.ipphone_vprio  = "0"
        data.mciptv_enable  = "off"
        data.mciptv_vid     = "0"
        data.mciptv_vprio   = "0"
        data.porttype       = "Internet Internet IPTV Bridge"
    elseif mode == "nbn" then
        data.configure = "off"
        data.internet_item = "on"
        data.iptv_item = "off"
        data.ipphone_item = "off"
        data.mciptv_item = "off"

        data.internet_tag   = "on"
        data.internet_vid   = "100"
        data.internet_vprio = "0"
        data.iptv_vid       = "0"
        data.iptv_vprio     = "0"
        data.ipphone_vid    = "0"
        data.ipphone_vprio  = "0"
        data.mciptv_enable  = "off"
        data.mciptv_vid     = "0"
        data.mciptv_vprio   = "0"
        data.porttype       = "Internet Internet Internet Internet"

    elseif mode == "ufb" then
        data.configure = "off"
        data.internet_item = "on"
        data.iptv_item = "off"
        data.ipphone_item = "off"
        data.mciptv_item = "off"

        data.internet_tag   = "on"
        data.internet_vid   = "10"
        data.internet_vprio = "0"
        data.iptv_vid       = "0"
        data.iptv_vprio     = "0"
        data.ipphone_vid    = "0"
        data.ipphone_vprio  = "0"
        data.mciptv_enable  = "off"
        data.mciptv_vid     = "0"
        data.mciptv_vprio   = "0"
        data.porttype       = "Internet Internet Internet Internet"

    elseif mode == "Russia" then
        data.configure = "off"
        data.internet_item = "on"
        data.iptv_item = "on"
        data.ipphone_item = "on"
        data.mciptv_item = "off"

        data.internet_tag   = "on"
        data.internet_vid   = "1257"
        data.internet_vprio = "0"
        data.iptv_vid       = "4000"
        data.iptv_vprio     = "4"
        data.ipphone_vid    = "263"
        data.ipphone_vprio  = "0"
        data.mciptv_enable  = "off"
        data.mciptv_vid     = "0"
        data.mciptv_vprio   = "0"
        data.porttype       = "IP-Phone Internet Internet IPTV"

    elseif mode == "Bridge" then
        data.configure = "on"
        data.internet_item = "off"
        data.iptv_item = "off"
        data.ipphone_item = "off"
        data.mciptv_item = "off"
        data.seltype = "Internet IPTV"

        data.internet_tag   = "on"
        data.internet_vid   = "0"
        data.internet_vprio = "0"
        data.iptv_vid       = "0"
        data.iptv_vprio     = "0"
        data.ipphone_vid    = "0"
        data.ipphone_vprio  = "0"
        data.mciptv_enable  = "off"
        data.mciptv_vid     = "0"
        data.mciptv_vprio   = "0"
        data.porttype       = "Internet Internet IPTV IPTV"
        data.seltype        = "Internet IPTV"

    elseif mode == "Custom" then
        data.configure = "on"
        data.internet_item = "on"
        data.iptv_item = "on"
        data.ipphone_item = "on"
        data.mciptv_item = "on"
        data.seltype = "Internet IPTV IP-Phone"

        data.internet_tag   = "on"
        data.internet_vid   = "0"
        data.internet_vprio = "0"
        data.iptv_vid       = "0"
        data.iptv_vprio     = "0"
        data.iptv_tag   = "on"
        data.ipphone_vid    = "0"
        data.ipphone_vprio  = "0"
        data.ipphone_tag   = "on"
        data.mciptv_enable  = "off"
        data.mciptv_vid     = "0"
        data.mciptv_vprio   = "0"
        data.porttype       = "Internet Internet Internet Internet"
        data.seltype        = "Internet IPTV IP-Phone"
    else
        data = {}
    end

    return data
end

local function uci_get()
    local uci_r = uci.cursor()

    local function _get_iptv(u, opt)
        return u:get("iptv", "iptv", opt)    
    end

    local function _get_iptv_mode(u, mode)
        return u:get_all("iptv", mode)    
    end

    local data = {}
    local lan_port = uci_r:get_profile("lan", "lan_port") or 4
    local ports = _get_iptv(uci_r, "lanport")
    local profile = nil

    data.enable = _get_iptv(uci_r, "enable")
    data.mode   = _get_iptv(uci_r, "mode")
    data.igmp_snooping_enable = _get_iptv(uci_r, "igmp_snooping_enable")
    data.igmp_enable = _get_iptv(uci_r, "igmp_enable")
    data.igmp_version = _get_iptv(uci_r, "igmp_version")
    data.wait_time = _get_iptv(uci_r, "handle_time")
    data.mcwifi_enable = _get_iptv(uci_r, "mcwifi_enable")
    data.cfg_changed = cfg_changed
    data.qos_iptv_compatible = uci_r:get_profile("qos", "qos_iptv_compatible") or "no"

    profile = _get_iptv_mode(uci_r, data.mode)

    -- new config
    if profile then
        data.internet_tag = profile.internet_tag or "off"
        data.internet_vid = profile.internet_vid or "0"
        data.internet_vprio = profile.internet_vprio or "0"
        data.ipphone_vid    = profile.ipphone_vid or "0"
        data.ipphone_vprio  = profile.ipphone_vprio or "0"
        data.ipphone_tag = profile.ipphone_tag or "on"
        data.iptv_vid   = profile.iptv_vid or "0"
        data.iptv_vprio = profile.iptv_vprio or "0"
        data.iptv_tag = profile.iptv_tag or "on"
        data.mciptv_enable = profile.mciptv_enable or "off"
        data.mciptv_vid    = profile.mciptv_vid or "0"
        data.mciptv_vprio  = profile.mciptv_vprio or "0"

        data.configure  = profile.configure or "off"
        data.internet_item  = profile.internet_item or "off"
        data.iptv_item  = profile.iptv_item or "off"
        data.ipphone_item  = profile.ipphone_item or "off"
        data.mciptv_item  = profile.mciptv_item or "off"
        data.seltype  = profile.seltype or ""

        data.ports = _get_iptv(uci_r, "lanport")

        if data.ports and profile.porttype then
            local portsarray = util.split(data.ports, "%s")
            local porttypearray = util.split(profile.porttype, "%s")
            if #portsarray == #porttypearray then
                data.porttype = profile.porttype
            else
                data.porttype = ""      
            end
        else
            data.porttype = ""
        end

    else --compatible with old config
        local result = get_default_config(data.mode)
        data.configure = result.configure
        data.internet_item = result.internet_item
        data.iptv_item = result.iptv_item
        data.ipphone_item = result.ipphone_item
        data.mciptv_item = result.mciptv_item
        data.seltype = result.seltype

        data.internet_tag   = _get_iptv(uci_r, "internet_tag") or "off"
        data.internet_vid   = _get_iptv(uci_r, "internet_vid") or "0"
        data.internet_vprio = _get_iptv(uci_r, "internet_vprio") or "0"
        data.ipphone_vid    = _get_iptv(uci_r, "ipphone_vid") or "0"
        data.ipphone_vprio  = _get_iptv(uci_r, "ipphone_vprio") or "0"
        data.ipphone_tag   = _get_iptv(uci_r, "ipphone_tag") or "on"
        data.iptv_vid   = _get_iptv(uci_r, "iptv_vid") or "0"
        data.iptv_vprio = _get_iptv(uci_r, "iptv_vprio") or "0"
        data.iptv_tag   = _get_iptv(uci_r, "iptv_tag") or "on"
        data.mciptv_enable = _get_iptv(uci_r, "mciptv_enable") or "off"
        data.mciptv_vid    = _get_iptv(uci_r, "mciptv_vid") or "0"
        data.mciptv_vprio  = _get_iptv(uci_r, "mciptv_vprio") or "0"

        if lan_port == 8 then
            data.ports = "5 6 7 8"
            local lan5=_get_iptv(uci_r, "lan5")
            local lan6=_get_iptv(uci_r, "lan6")
            local lan7=_get_iptv(uci_r, "lan7")
            local lan8=_get_iptv(uci_r, "lan8")            
            if lan5 and lan5 ~= ""
                and lan6 and lan6 ~= "" 
                and lan7 and lan7 ~= ""
                and lan8 and lan8 ~= "" then
                
                data.porttype = string.format("%s %s %s %s", lan5, lan6, lan7, lan8)
            else
                data.porttype = ""
            end
        elseif lan_port < 8 and lan_port >=4 then
            data.ports = "1 2 3 4"
            local lan1=_get_iptv(uci_r, "lan1")
            local lan2=_get_iptv(uci_r, "lan2")
            local lan3=_get_iptv(uci_r, "lan3")
            local lan4=_get_iptv(uci_r, "lan4")

            if lan1 and lan1 ~= ""
                and lan2 and lan2 ~= "" 
                and lan3 and lan3 ~= ""
                and lan4 and lan4 ~= "" then
                data.porttype = string.format("%s %s %s %s", lan1, lan2, lan3, lan4)
            else
                data.porttype = ""
            end
        else
                data.ports = ""
                data.porttype = ""
        end
    end

    return data
end

local function uci_getspec(mode)
    local uci_r = uci.cursor()
    local data = {}
	local lan_port = uci_r:get_profile("lan", "lan_port") or 4
    if not mode then
        return false
    end

    local function _get_iptv(u, opt)
        return u:get("iptv", "iptv", opt)    
    end

    local function _get_iptv_mode(u, mode)
        return u:get_all("iptv", mode)
    end

    local profile = nil
    profile = _get_iptv_mode(uci_r, mode)

    -- new config
    if profile then
        data.internet_tag = profile.internet_tag or "off"
        data.internet_vid = profile.internet_vid or "0"
        data.internet_vprio = profile.internet_vprio or "0"
        data.ipphone_vid    = profile.ipphone_vid or "0"
        data.ipphone_vprio  = profile.ipphone_vprio or "0"
        data.ipphone_tag = profile.ipphone_tag or "on"
        data.iptv_vid   = profile.iptv_vid or "0"
        data.iptv_vprio = profile.iptv_vprio or "0"
        data.iptv_tag = profile.iptv_tag or "on"
        data.mciptv_enable = profile.mciptv_enable or "off"
        data.mciptv_vid    = profile.mciptv_vid or "0"
        data.mciptv_vprio  = profile.mciptv_vprio or "0"

        data.configure  = profile.configure or "off"
        data.internet_item  = profile.internet_item or "off"
        data.iptv_item  = profile.iptv_item or "off"
        data.ipphone_item  = profile.ipphone_item or "off"
        data.mciptv_item  = profile.mciptv_item or "off"
        data.seltype  = profile.seltype or ""

        data.ports = _get_iptv(uci_r, "lanport")
        if data.ports and profile.porttype then
            local portsarray = util.split(data.ports, "%s")
            local porttypearray = util.split(profile.porttype, "%s")
            if #portsarray == #porttypearray then
                data.porttype = profile.porttype
            else
                data.porttype = ""      
            end
        else
            data.porttype = ""
        end
    else --compatible with old config
        data = get_default_config(mode)
        if lan_port == 8 then
            data.ports = "5 6 7 8"
            local lan5=_get_iptv(uci_r, "lan5")
            local lan6=_get_iptv(uci_r, "lan6")
            local lan7=_get_iptv(uci_r, "lan7")
            local lan8=_get_iptv(uci_r, "lan8")            
            if lan5 and lan5 ~= ""
                and lan6 and lan6 ~= "" 
                and lan7 and lan7 ~= ""
                and lan8 and lan8 ~= "" then
                
                data.porttype = string.format("%s %s %s %s", lan5, lan6, lan7, lan8)
            else
                data.porttype = ""
            end
        elseif lan_port < 8 and lan_port >=4 then
            data.ports = "1 2 3 4"
            local lan1=_get_iptv(uci_r, "lan1")
            local lan2=_get_iptv(uci_r, "lan2")
            local lan3=_get_iptv(uci_r, "lan3")
            local lan4=_get_iptv(uci_r, "lan4")

            if lan1 and lan1 ~= ""
                and lan2 and lan2 ~= "" 
                and lan3 and lan3 ~= ""
                and lan4 and lan4 ~= "" then
                data.porttype = string.format("%s %s %s %s", lan1, lan2, lan3, lan4)
            else
                data.porttype = ""
            end
        else
                data.ports = ""
                data.porttype = ""
        end
    end

    return data
end

-- Solve a synchronization problem of quick setup of C5400X/C4000V2
-- 1 IPTV config saved.
-- 2 set_network_attr() change network.wan.ifname from eth0 to eth0.xxx
-- 3 IPTV script start working...
--      iptv will change network.device[x].name from eth0 to eth0.xxx
--      but iptv get eth0.xxx (network.wan.ifname) and can't match any device.
--      See iptv_network.sh: iptv_wan_set_ifname() for details
--
local function sync_wan_device_to_wan_ifname(uci_r, old_ifname, new_ifname)
    local uci_r = uci.cursor()
    if old_ifname ~= new_ifname
    then
        local tmp_sec = uci_r:get("network", "dev_wan")
        if tmp_sec ~= nil then
            tmp_sec = "dev_wan"
        else
            uci_r:foreach("network", "device",
                function(section)
                if section["name"] == old_ifname then
                     tmp_sec = section[".name"]
                end
                end)
        end
        if tmp_sec ~= nil then
            uci_r:set("network", tmp_sec, "name", new_ifname)
        end
    end
end

-- all is true which means check all ports, or false checking any port is ok 
local function check_port_type(porttype, allowtypes, all)
    local flag = false

    if not porttype or not allowtypes then
        return false
    end

    if type(porttype) ~= "table" then
        porttype = {porttype}
    end
    if type(allowtypes) ~= "table" then
        allowtypes = {allowtypes}
    end

    -- no need check
    if #porttype == 0 then
        return true
    end

    for _, i in ipairs(porttype) do
        if all == true then
            flag = false
        end
        for _, j in ipairs(allowtypes) do
            if i == j then
                flag = true
                break            
            end
        end

        if all == true and flag == false then
            return false
        end
    end

    if flag == false then
        return false
    end

    return true
end

function set_network_attr()
    local iptv = uci_get()
    local uci_r = uci.cursor()
    local bcm490x_switch_support = uci_r:get_profile("switch", "bcm490x_switch_support") or "no"
    local lan_port = uci_r:get_profile("lan", "lan_port") or 4

    if bcm490x_switch_support == "yes" then
        local wtype = uci_r:get("network", "wan", "wan_type")
        local porttype_array = util.split(iptv.porttype, " ")
        if iptv.enable == "on" then
            local wanInBridge = 0
            if iptv.mode == "Bridge"
            then
                if check_port_type(porttype_array, {"IPTV"}, false) 
                then
                    wanInBridge=1
                end
            else
                if check_port_type(porttype_array, {"Bridge"}, false) 
                then
                    wanInBridge=1
                end
            end
            if iptv.mode == "Bridge"
            then
                if wanInBridge == 1 then
                    uci_r:set("network", "wan", "type", "bridge")
                    uci_r:set("network", "wan", "igmp_snooping", "1")
                    uci_r:set("network", "wanv6", "rely_interface", "wan")
                    
                    if wtype == "dslite" or wtype == "v6plus" then
                        local ifname = uci_r:get("iptv", "iptv", "wan")
                        uci_r:set("network", "wan", "ifname", ifname)
                    end
                    
                    if wtype == "pppoe" or wtype == "pppoeshare" then
                        uci_r:set("network", "internet", "ifname", "br-wan")                
                    end
                    uci_r:commit("network")
                end
            else
                local l3_ifname = uci_r:get("iptv", "iptv", "wan")
                local i = string.find(l3_ifname, '%.')
                    local l3_dev = nil
                if i ~= nil then
                   l3_dev = string.sub(l3_ifname, 0, i - 1)
                else
                    l3_dev = l3_ifname
                end
                local ifname = l3_dev .. "." .. iptv.internet_vid
                sync_wan_device_to_wan_ifname(uci_r, uci_r:get("network", "wan", "ifname"), ifname)
                uci_r:set("network", "wan", "ifname", ifname)
                if wanInBridge == 1 then
                    uci_r:set("network", "wan", "type", "bridge")
                    uci_r:set("network", "wan", "igmp_snooping", "1")
                    uci_r:set("network", "wanv6", "rely_interface", "wan")
                    if wtype == "pppoe" or wtype == "pppoeshare" then
                        uci_r:set("network", "internet", "ifname", "br-wan")                
                    end                
                else
                    if wtype == "pppoe" or wtype == "pppoeshare" then
                        uci_r:set("network", "internet", "ifname", ifname)                
                    end
                end
                uci_r:commit("network")
            end        
        end
    else
        local wtype = uci_r:get("network", "wan", "wan_type")
        local porttype_array = util.split(iptv.porttype, " ")
        if iptv.enable == "on" then
            if iptv.mode == "Bridge" then
                local wanInBridge = 0
                if check_port_type(porttype_array, {"IPTV"}, false) then
                    wanInBridge=1
                end
                local ifname = uci_r:get("iptv", "iptv", "l2ifname")
                uci_r:set("network", "wan", "ifname", ifname)
                uci_r:commit("network")
	            
                if wanInBridge == 1 then	
                    uci_r:set("network", "wan", "type", "bridge")
                    uci_r:set("network", "wan", "igmp_snooping", "1")
                    uci_r:set("network", "wanv6", "rely_interface", "wan")

                    if wtype == "pppoe" or wtype == "pppoeshare" then
                        uci_r:set("network", "internet", "ifname", "br-wan")                
                    end
                    uci_r:commit("network")
                end
            else
                local ifname = uci_r:get("iptv", "iptv", "l3ifname")
                uci_r:set("network", "wan", "ifname", ifname)
                if wtype == "pppoe" or wtype == "pppoeshare" then
                    uci_r:set("network", "internet", "ifname", ifname)                
                end
                uci_r:commit("network")
            end        
        end
    end

end

local function check_iptvinfo_change(iptv_new, iptv_old)
    if type(iptv_new) ~= "table" or type(iptv_new) ~= "table" then
        return false
    end

    if iptv_new.igmp_snooping_enable == iptv_old.igmp_snooping_enable
        and iptv_new.igmp_enable == iptv_old.igmp_enable
        and iptv_new.igmp_version == iptv_old.igmp_version
        and iptv_new.mcwifi_enable == iptv_old.mcwifi_enable
        and iptv_new.enable == iptv_old.enable
        and iptv_new.mode == iptv_old.mode
    then
        -- can't configure the profile info
        if iptv_old.configure == "off" then
            return false
        end

        local internet_change = false
        local iptv_change = false
        local ipphone_change = false
        local mciptv_change = false
        if iptv_old.internet_item == "on" 
            and (iptv_new.internet_tag ~= iptv_old.internet_tag
                 or iptv_new.internet_vid ~= iptv_old.internet_vid
                 or iptv_new.internet_vprio ~= iptv_old.internet_vprio)
        then
            internet_change = true
        end

        if iptv_old.iptv_item == "on" 
            and (iptv_new.iptv_vid ~= iptv_old.iptv_vid
                 or iptv_new.iptv_vprio ~= iptv_old.iptv_vprio
                 or (iptv_new.iptv_tag and iptv_new.iptv_tag ~= iptv_old.iptv_tag))
        then
            iptv_change = true
        end

        if iptv_old.ipphone_item == "on" 
            and (iptv_new.ipphone_vid ~= iptv_old.ipphone_vid
                 or iptv_new.ipphone_vprio ~= iptv_old.ipphone_vprio
                 or (iptv_new.ipphone_tag and iptv_new.ipphone_tag ~= iptv_old.ipphone_tag))
        then
            ipphone_change = true
        end

        if iptv_old.mciptv_item == "on" 
            and (iptv_new.mciptv_enable ~= iptv_old.mciptv_enable
                 or iptv_new.mciptv_vid ~= iptv_old.mciptv_vid
                 or iptv_new.mciptv_vprio ~= iptv_old.mciptv_vprio)
        then
            mciptv_change = true
        end

        --iptv vlan info not change
        if internet_change == false
            and iptv_change == false
            and ipphone_change == false
            and mciptv_change == false
            and iptv_new.porttype == iptv_old.porttype
        then
            return false
        end
    end

    return true
end

local function replace_aggporttype(iptv_info)
    local uci_r = uci.cursor()

    if not iptv_info then
        return iptv_info
    end

    local lanagg = uci_r:get_all("switch", "lan_agg")
    local wanagg = uci_r:get_all("switch", "addl_wan")
    local aggports = ""
    if lanagg ~= nil and lanagg.enable_agg == "1" and lanagg.lacpports then
        aggports = aggports .. lanagg.lacpports
    end
    if wanagg ~= nil and wanagg.addl_wan_enable == "1" and wanagg.addl_wan_port then
        aggports = aggports .. wanagg.addl_wan_port
    end

    local aggports_array = util.split(aggports, " ")
    local port_array = util.split(iptv_info.ports, " ")
    local porttype_array = util.split(iptv_info.porttype, " ")
    local porttype = ""
    local tmptype
    if aggports_array and port_array and porttype_array then
        for i = 1, #port_array do
            tmptype = porttype_array[i]
            for j = 1, #aggports_array do
                if tonumber(aggports_array[j]) and port_array[i] == aggports_array[j] then
                    tmptype = "Internet"
                    break
                end
            end
            if tmptype and tmptype ~= "" then
                if porttype == "" then 
                    porttype = tmptype 
                else 
                    porttype = porttype .. " " .. tmptype 
                end
            end
        end

        if porttype ~= "" then
            iptv_info.porttype = porttype
        end
    end

    return iptv_info
end

local function check(data)
    if not data or type(data) ~= "table" then
        return false
    end

    local uci_r = uci.cursor()
    local modetype = uci_r:get("iptv", "iptv", "mode")

    -- check supported profile
    if data.mode == "none" then
        data.mode = modetype
    else
        if data.mode ~= "Bridge" 
            and data.mode ~= "Custom"
            and data.mode ~= "Russia" 
            and data.mode ~= "Maxis"
            and data.mode ~= "Maxis2"
            and data.mode ~= "Celcom"
            and data.mode ~= "TELEKOM1"
            and data.mode ~= "TELEKOM2"
            and data.mode ~= "AIS"
            and data.mode ~= "CENTURYLINK"
            and data.mode ~= "ExStream" 
            and data.mode ~= "Unifi"
            and data.mode ~= "MEO" 
            and data.mode ~= "VDF"
            and data.mode ~= "ufb" 
            and data.mode ~= "nbn"
            and data.mode ~= "Vietnam"
        then
            return false
        end
    end

    if data.igmp_snooping_enable and data.igmp_snooping_enable ~= "on" and data.igmp_snooping_enable ~= "off"
    then
        return false
    end

    if data.igmp_enable and data.igmp_enable ~= "on" and data.igmp_enable ~= "off"
    then
	    return false
    end

    if data.mcwifi_enable and data.mcwifi_enable ~= "on" and data.mcwifi_enable ~= "off"
    then
	    return false
    end

    if data.igmp_version and tonumber(data.igmp_version) < 2 or tonumber(data.igmp_version) > 3 then
        return false
    end

    local function _vid(vid)
        local uvid = tonumber(vid)
        if dtypes.integer(vid) and (uvid >= 0 and uvid <= 4094)
        then
            return true        
        end   
    end

    local function _prio(prio)
        local uprio = tonumber(prio)
        if dtypes.integer(prio) and (uprio >= 0 and uprio <= 7)
        then            
            return true        
        end    
    end

    local function _aggport_conflict(aggports, ports, typeseq)
        -- aggports == nil means no conflict
        if not aggports then
            return true
        end

        if type(aggports) ~= "table" or type(ports) ~= "table" or type(typeseq) ~= "table" then
            return false
        end

        for _, aggpno in ipairs(aggports) do
            for pindex, pno in ipairs(ports) do
                if aggpno == pno and typeseq[pindex] ~= "Internet" then
                    return false 
                end
            end
        end

        return true
    end    
   
   --check value of internet type if get
    if (data.internet_vid and not _vid(data.internet_vid))
        or (data.internet_vprio and not _prio(data.internet_vprio)) then
        return false
    end

   --check value of iptv type if get
    if (data.iptv_vid and not _vid(data.iptv_vid))
        or (data.iptv_vprio and not _prio(data.iptv_vprio)) then
        return false
    end

   --check value of ipphone type if get
    if (data.ipphone_vid and not _vid(data.ipphone_vid))
        or (data.ipphone_vprio and not _prio(data.ipphone_vprio)) then
        return false
    end

   --check value of mciptv type if get
    if (data.mciptv_vid and not _vid(data.mciptv_vid))
        or (data.mciptv_vprio and not _prio(data.mciptv_vprio)) then
        return false
    end

    -- check the port type
    if not data.ports or not data.porttype then
        return false
    end
    local porttype_array = util.split(data.porttype, " ")
    local port_array = util.split(data.ports, " ")    
    if not port_array or not porttype_array or #port_array ~= #porttype_array then
        return false
    end 

    local profile = uci_r:get_all("iptv", data.mode)
    local seltype_array = nil
    if profile and profile.seltype and profile.seltype ~= "" then
        seltype_array = util.split(profile.seltype, " ")
    end
    
    --compatible with old config
    if not seltype_array then
        if data.mode == "Custom" 
            or data.mode == "Russia" 
            or data.mode == "Maxis"
            or data.mode == "Maxis2"
            or data.mode == "MEO" 
            or data.mode == "VDF" 
            or data.mode == "Vietnam"
            or data.mode == "Unifi"
            or data.mode == "Celcom"
        then
            seltype_array = {"Internet", "IPTV", "IP-Phone", "Bridge"}
        else
            seltype_array = {"Internet", "IPTV"}
        end
    end

    -- check if the port type is valid
    if not check_port_type(porttype_array, seltype_array, true)
    then
        return false
    end

    -- check port type conflict with lan agg port
    local lanagg = uci_r:get_all("switch", "lan_agg")
    local wanagg = uci_r:get_all("switch", "addl_wan")
    local aggports = ""
    if lanagg ~= nil and lanagg.enable_agg == "1" and lanagg.lacpports then
        aggports = aggports .. lanagg.lacpports
    end
    if wanagg ~= nil and wanagg.addl_wan_enable == "1" and wanagg.addl_wan_port then
        aggports = aggports .. wanagg.addl_wan_port
    end
    local aggports_array = nil
    if aggports ~= "" then
        aggports_array = util.split(aggports, " ")
    end
    if aggports_array and not _aggport_conflict(aggports_array, port_array, porttype_array) then
        return false
    end

    return true
end

-- pls N.B. here
-- I only add support for lan_port 4, 5(C4000) and 8(C5400S)
-- if any new MODEL with other lan port
-- these code will bug you
local function parse_url(formvalue, iptv_old)
    local uci_r = uci.cursor()
    local iptv_new = {}
    local iptv_profile

    if not formvalue or not iptv_old then
        return false
    end

    if formvalue["enable"] == "on" or formvalue["enable"] == "off" then
        iptv_new.enable = formvalue["enable"]
    else
        iptv_new.enable = iptv_old.enable
    end

    -- igmp snooping
    iptv_new.igmp_snooping_enable = formvalue["igmp_snooping_enable"] or iptv_old.igmp_snooping_enable
    -- igmp proxy
    iptv_new.igmp_enable = formvalue["igmp_enable"] or iptv_old.igmp_enable
    iptv_new.igmp_version = formvalue["igmp_version"] or iptv_old.igmp_version

    iptv_new.mode   = formvalue["mode"] or iptv_old.mode

    -- wireless multicast
    iptv_new.mcwifi_enable = formvalue["mcwifi_enable"] or iptv_old.mcwifi_enable

    --port sequece not need to change
    iptv_new.ports = iptv_old.ports

    -- compatible with old config
    if iptv_new.mode == "none" then
        iptv_profile = uci_r:get_all("iptv", iptv_old.mode)
    else
        iptv_profile = uci_r:get_all("iptv", iptv_new.mode)
    end
    if iptv_profile then --new config
        -- port type information
        iptv_new.porttype = formvalue["porttype"] or iptv_profile.porttype

        -- internet
        iptv_new.internet_tag   = formvalue["internet_tag"] or iptv_profile.internet_tag
        iptv_new.internet_vid   = formvalue["internet_vid"] or iptv_profile.internet_vid
        iptv_new.internet_vprio = formvalue["internet_vprio"] or iptv_profile.internet_vprio
        -- ip-phone
        iptv_new.ipphone_vid    = formvalue["ipphone_vid"] or iptv_profile.ipphone_vid
        iptv_new.ipphone_vprio  = formvalue["ipphone_vprio"] or iptv_profile.ipphone_vprio
        iptv_new.ipphone_tag   = formvalue["ipphone_tag"] or iptv_profile.ipphone_tag or "on"
        -- iptv
        iptv_new.iptv_vid   = formvalue["iptv_vid"] or iptv_profile.iptv_vid
        iptv_new.iptv_vprio = formvalue["iptv_vprio"] or iptv_profile.iptv_vprio
        iptv_new.iptv_tag   = formvalue["iptv_tag"] or iptv_profile.iptv_tag or "on"
        -- multicast iptv
        iptv_new.mciptv_enable = formvalue["mciptv_enable"] or iptv_profile.mciptv_enable
        iptv_new.mciptv_vid    = formvalue["mciptv_vid"] or iptv_profile.mciptv_vid
        iptv_new.mciptv_vprio  = formvalue["mciptv_vprio"] or iptv_profile.mciptv_vprio

        iptv_new.configure = iptv_profile.configure
        iptv_new.internet_item = iptv_profile.internet_item
        iptv_new.ipphone_item = iptv_profile.ipphone_item
        iptv_new.iptv_item = iptv_profile.iptv_item
        iptv_new.mciptv_item = iptv_profile.mciptv_item
    else -- old config
        local old_default
        if iptv_new.mode == "none" then
            old_default = get_default_config(iptv_old.mode)
        else
            old_default = get_default_config(iptv_new.mode)
        end

        -- port type information
        iptv_new.porttype = formvalue["porttype"] or old_default.porttype

        -- internet
        iptv_new.internet_tag   = formvalue["internet_tag"] or old_default.internet_tag
        iptv_new.internet_vid   = formvalue["internet_vid"] or old_default.internet_vid
        iptv_new.internet_vprio = formvalue["internet_vprio"] or old_default.internet_vprio
        -- ip-phone
        iptv_new.ipphone_vid    = formvalue["ipphone_vid"] or old_default.ipphone_vid
        iptv_new.ipphone_vprio  = formvalue["ipphone_vprio"] or old_default.ipphone_vprio
        iptv_new.ipphone_tag   = formvalue["ipphone_tag"] or old_default.ipphone_tag or "on"
        -- iptv
        iptv_new.iptv_vid   = formvalue["iptv_vid"] or old_default.iptv_vid
        iptv_new.iptv_vprio = formvalue["iptv_vprio"] or old_default.iptv_vprio
        iptv_new.iptv_tag   = formvalue["iptv_tag"] or old_default.iptv_tag or "on"
        -- multicast iptv
        iptv_new.mciptv_enable = formvalue["mciptv_enable"] or old_default.mciptv_enable
        iptv_new.mciptv_vid    = formvalue["mciptv_vid"] or old_default.mciptv_vid
        iptv_new.mciptv_vprio  = formvalue["mciptv_vprio"] or old_default.mciptv_vprio

        iptv_new.configure = old_default.configure
        iptv_new.internet_item = old_default.internet_item
        iptv_new.ipphone_item = old_default.ipphone_item
        iptv_new.iptv_item = old_default.iptv_item
        iptv_new.mciptv_item = old_default.mciptv_item
    end

	    -- In quick_setup when disable iptv, mode = none, but nothing changed
    if iptv_new.mode == "none" then
		iptv_new.mode =  iptv_old.mode
	end

    return iptv_new
end

local function get()
    return uci_get()
end

local function getspec(formvalue)
    local data = uci_getspec(formvalue.isp)
    if not data then
        return false, "get iptv spec mode error", {}
    end

    return data
end

local function set(formvalue)
    local uci_r = uci.cursor()
    local iptv_old = uci_get()
    local iptv_new = parse_url(formvalue, iptv_old)
    local lan_port = uci_r:get_profile("lan", "lan_port") or 4
    local ret

    if not iptv_new then
        return false, errcode, {}
    end

    -- check if config changed
    if not check_iptvinfo_change(iptv_new, iptv_old) then
        return uci_get()
    end

    -- force Bridge mode and Custom mode Aggregation port to Internet
    if iptv_new.mode == "Bridge" or iptv_new.mode == "Custom" then
       iptv_new = replace_aggporttype(iptv_new)
    end

    --check the params
    ret, errcode = check(iptv_new)
    if not ret then
        return false, errcode, {}
    end

    local log = require("luci.model.log").Log(216)
    if iptv_new.enable == "on" then
        log(502)
    else
        log(503)
    end
    cfg_changed = true

    -- Set igmp snooping
    uci_r:set("iptv", "iptv", "igmp_snooping_enable", iptv_new.igmp_snooping_enable)

    -- Set igmp proxy
    if iptv_new.igmp_enable ~= uci_r:get("iptv", "iptv", "igmp_enable") then
        local logn = logm.Logn("igmp-proxy")
        logn(logn.logid.IMPROXY_SWITCH_OP, iptv_new.igmp_enable == "on" and "on" or "off")
    end

    uci_r:set("iptv", "iptv", "igmp_enable", iptv_new.igmp_enable)
    uci_r:set("iptv", "iptv", "igmp_version", iptv_new.igmp_version)
    uci_r:set("iptv", "iptv", "mcwifi_enable", iptv_new.mcwifi_enable)
    uci_r:set("iptv", "iptv", "enable", iptv_new.enable)
    uci_r:set("iptv", "iptv", "mode",   iptv_new.mode)

    local ports = uci_r:get("iptv", "iptv", "lanport")
    if not ports then
        uci_r:set("iptv", "iptv", "lanport", iptv_new.ports)
    end

    local profile = uci_r:get_all("iptv", iptv_new.mode)
    if not profile then -- compatible with old config
        uci_r:section("iptv", "profile", iptv_new.mode)

        local result = get_default_config(data.mode)
        uci_r:set("iptv", iptv_new.mode, "configure",     iptv_new.configure)
        uci_r:set("iptv", iptv_new.mode, "internet_item", iptv_new.internet_item)
        uci_r:set("iptv", iptv_new.mode, "internet_tag",  iptv_new.internet_tag)
        uci_r:set("iptv", iptv_new.mode, "internet_vid",  iptv_new.internet_vid)
        uci_r:set("iptv", iptv_new.mode, "internet_vprio",iptv_new.internet_vprio)

        uci_r:set("iptv", iptv_new.mode, "ipphone_item",  iptv_new.ipphone_item)
        uci_r:set("iptv", iptv_new.mode, "ipphone_vid",   iptv_new.ipphone_vid)
        uci_r:set("iptv", iptv_new.mode, "ipphone_vprio", iptv_new.ipphone_vprio)
        if iptv_new.ipphone_tag then
        	uci_r:set("iptv", iptv_new.mode, "ipphone_tag",  iptv_new.ipphone_tag)
        end
        
        uci_r:set("iptv", iptv_new.mode, "iptv_item",     iptv_new.iptv_item)
        uci_r:set("iptv", iptv_new.mode, "iptv_vid",      iptv_new.iptv_vid)
        uci_r:set("iptv", iptv_new.mode, "iptv_vprio",    iptv_new.iptv_vprio)
        if iptv_new.iptv_tag then
        	uci_r:set("iptv", iptv_new.mode, "iptv_tag",  iptv_new.iptv_tag)
        end
        
        uci_r:set("iptv", iptv_new.mode, "mciptv_item",   iptv_new.mciptv_item)
        uci_r:set("iptv", iptv_new.mode, "mciptv_enable", iptv_new.mciptv_enable)
        uci_r:set("iptv", iptv_new.mode, "mciptv_vid",    iptv_new.mciptv_vid)
        uci_r:set("iptv", iptv_new.mode, "mciptv_vprio",  iptv_new.mciptv_vprio)
        uci_r:set("iptv", iptv_new.mode, "porttype",      iptv_new.porttype)
        if iptv_new.seltype then
            uci_r:set("iptv", iptv_new.mode, "seltype",   iptv_new.seltype)
        end
    else
        if iptv_new.configure == "on" then
            if iptv_new.internet_item == "on" then
                uci_r:set("iptv", iptv_new.mode, "internet_tag",   iptv_new.internet_tag)
                uci_r:set("iptv", iptv_new.mode, "internet_vid",   iptv_new.internet_vid)
                uci_r:set("iptv", iptv_new.mode, "internet_vprio", iptv_new.internet_vprio)
            end
            if iptv_new.ipphone_item == "on" then
                uci_r:set("iptv", iptv_new.mode, "ipphone_vid",    iptv_new.ipphone_vid)
                uci_r:set("iptv", iptv_new.mode, "ipphone_vprio",  iptv_new.ipphone_vprio)
                if iptv_new.ipphone_tag then
                	uci_r:set("iptv", iptv_new.mode, "ipphone_tag",  iptv_new.ipphone_tag)
                end
            end
            if iptv_new.iptv_item == "on" then
                uci_r:set("iptv", iptv_new.mode, "iptv_vid",   iptv_new.iptv_vid)
                uci_r:set("iptv", iptv_new.mode, "iptv_vprio", iptv_new.iptv_vprio)
                if iptv_new.iptv_tag then
                	uci_r:set("iptv", iptv_new.mode, "iptv_tag", iptv_new.iptv_tag)
                end
            end
            if iptv_new.mciptv_item == "on" then
                uci_r:set("iptv", iptv_new.mode, "mciptv_enable", iptv_new.mciptv_enable)
                uci_r:set("iptv", iptv_new.mode, "mciptv_vid",    iptv_new.mciptv_vid)
                uci_r:set("iptv", iptv_new.mode, "mciptv_vprio",  iptv_new.mciptv_vprio)
            end
            uci_r:set("iptv", iptv_new.mode, "porttype", iptv_new.porttype)
        end

        if lan_port == 8 then
            local porttypearray = util.split(iptv_new.porttype, " ")
            local portarray = util.split(iptv_new.ports, " ")
            for index, port in ipairs(portarray) do
                uci_r:set("iptv", "iptv", "lan"..port, porttypearray[index])
            end
        end
    end

    uci_r:commit("iptv")
    
    sys.fork_exec(RELOAD_IPTV)
    
    return uci_get()
end

local function array_to_string(array)
	local ret = ""
	for i, v in pairs(array) do
		if i == 1 then
			ret = v
		else
			ret = ret .. " " .. v
		end
	end
	return ret
end

local function tmp_get_settings_info(mode)
	if not mode then
		return false
	end
	
	local uci_r = uci.cursor()
	local data = {}
	local profile = nil
	profile = uci_r:get_all("iptv", mode)

	--the value indicates whether setting tag is supported, 1 indicates that the corresponding tag can be set
	local inter_tag = 1
	local iptv_tag = 0
	local ipphone_tag = 0

	local tags_string = inter_tag .. " " .. iptv_tag .. " " ..	ipphone_tag
	local tags_array = util.split(tags_string, " ")

	local tags_support_state = 0
	for i = 1, 3 do
		local v = tags_array[i]
		if v == "1" or v == 1 then
			tags_support_state = tags_support_state + math.pow(2, (i-1))
		end
	end
	data.tags_support_state = tags_support_state
	
	-- new config
	if profile then
		local internet_item  = profile.internet_item or "off"
		local internet_tag = profile.internet_tag or "off"
		data.internet_item = internet_item == "on" and true or false
		data.internet_tag = internet_tag == "on" and true or false
		data.internet_vid = profile.internet_vid or "0"
		data.internet_vprio = profile.internet_vprio or "0"
		
		local ipphone_item	= profile.ipphone_item or "off"
		local ipphone_tag = profile.ipphone_tag or "on"
		data.ipphone_item  = ipphone_item == "on" and true or false
		data.ipphone_tag = ipphone_tag == "on" and true or false
		data.ipphone_vid	= profile.ipphone_vid or "0"
		data.ipphone_vprio	= profile.ipphone_vprio or "0"
		
		local iptv_item  = profile.iptv_item or "off"
		local iptv_tag = profile.iptv_tag or "on"
		data.iptv_item	= iptv_item == "on" and true or false
		data.iptv_tag = iptv_tag == "on" and true or false
		data.iptv_vid	= profile.iptv_vid or "0"
		data.iptv_vprio = profile.iptv_vprio or "0"
		
		local mciptv_item  = profile.mciptv_item or "off"
		local mciptv_enable = profile.mciptv_enable or "off"
		data.mciptv_item  = mciptv_item == "on" and true or false
		data.mciptv_enable = mciptv_enable == "on" and true or false
		data.mciptv_vid    = profile.mciptv_vid or "0"
		data.mciptv_vprio  = profile.mciptv_vprio or "0"
		
	--else --compatible with old config
		--data = get_default_config(mode)
		--table.remove(data.configure)
		--table.remove(data.porttype)
	end

	return data
end

local function tmp_get_port_mode_info(mode)
	local uci_r = uci.cursor()

	if not mode then
		return false
	end

	local function _get_iptv(u, opt)
		return u:get("iptv", "iptv", opt)	 
	end

	local function _get_iptv_mode(u, mode)
		return u:get_all("iptv", mode)
	end

	local data = {}
	local profile = nil
	profile = _get_iptv_mode(uci_r, mode)

	-- new config
	if profile then
		data.seltype  = profile.seltype or ""
		data.ports = _get_iptv(uci_r, "lanport")
		if data.ports and profile.porttype then
			local portsarray = util.split(data.ports, "%s")
			local porttypearray = util.split(profile.porttype, "%s")
			if #portsarray == #porttypearray then
				data.porttype = profile.porttype
			else
				data.porttype = ""		
			end
		else
			data.porttype = ""
		end
	else --compatible with old config
		local default_data = get_default_config(mode)
		data.seltype  = default_data.seltype or ""
		if lan_port == 8 then
			data.ports = "5 6 7 8"
			local lan5=_get_iptv(uci_r, "lan5")
			local lan6=_get_iptv(uci_r, "lan6")
			local lan7=_get_iptv(uci_r, "lan7")
			local lan8=_get_iptv(uci_r, "lan8") 		   
			if lan5 and lan5 ~= ""
				and lan6 and lan6 ~= "" 
				and lan7 and lan7 ~= ""
				and lan8 and lan8 ~= "" then
				
				data.porttype = string.format("%s %s %s %s", lan5, lan6, lan7, lan8)
			else
				data.porttype = ""
			end
		elseif lan_port < 8 and lan_port >=4 then
			data.ports = "1 2 3 4"
			local lan1=_get_iptv(uci_r, "lan1")
			local lan2=_get_iptv(uci_r, "lan2")
			local lan3=_get_iptv(uci_r, "lan3")
			local lan4=_get_iptv(uci_r, "lan4")

			if lan1 and lan1 ~= ""
				and lan2 and lan2 ~= "" 
				and lan3 and lan3 ~= ""
				and lan4 and lan4 ~= "" then
				data.porttype = string.format("%s %s %s %s", lan1, lan2, lan3, lan4)
			else
				data.porttype = ""
			end
		else
				data.ports = ""
				data.porttype = ""
		end
	end
	
	data.ports = util.split(data.ports, " ")
	data.porttype = util.split(data.porttype, " ")
	data.seltype = util.split(data.seltype, " ")
	return data
end

local function tmp_get_multicast_info()
	local uci_r = uci.cursor()

	local function _get_iptv(u, opt)
		return u:get("iptv", "iptv", opt)	 
	end

	local data = {}
	
	local igmp_enable = _get_iptv(uci_r, "igmp_enable") or "off" 
	local igmp_snooping_enable = _get_iptv(uci_r, "igmp_snooping_enable") or "off" 
	local igmp_version = _get_iptv(uci_r, "igmp_version") or "2" 
	local igmp_version_list = default_igmp_version_list
	local mcwifi_support = uci_r:get_profile("iptv", "wlan_mcast_switch") or "on"
	local mcwifi_enable = _get_iptv(uci_r, "mcwifi_enable") or "off" 

	data.igmp_enable = igmp_enable == "on" and true or false
	data.igmp_snooping_enable = igmp_snooping_enable == "on" and true or false
	data.igmp_version = igmp_version
	data.igmp_version_list = igmp_version_list
	data.mcwifi_support = mcwifi_support == "on" and true or false
	data.mcwifi_enable = mcwifi_enable == "on" and true or false

	return data
end


local function tmp_profile_get(params)
	if not params then
		return false, "invalid new params"
	end
	local params = json.decode(params.data)
	
	if params.amount <= 0 or params.start_index < 0 then
		return false, "invalid new params"
	end
	
	local uci_r = uci.cursor()
	local data = {}
	local settings_info_list = {}
	local profile_count = 0
	local profile_sum = 0
	local local_amount = 0

	uci_r:foreach("iptv", "profile",
		function(section)
			-- Delete the unused Russian profile, to avoid inconsistency between the webpage and the tether
			if section[".name"] ~= "Russia" then
				if profile_count >= params.start_index then
					if local_amount < params.amount then
						local isp_data = {}
						isp_data.name = section[".name"]
						
						-- for app page display
						local display_name = uci_r:get("iptv", isp_data.name, "display_name")
						if display_name ~= nil then
							isp_data.display_name = nixio.bin.b64encode(display_name)
						else
							isp_data.display_name = nixio.bin.b64encode(isp_data.name)
						end
						
						isp_data.settings_info = tmp_get_settings_info(section[".name"])
						isp_data.port_mode_info = tmp_get_port_mode_info(section[".name"])
						settings_info_list[#settings_info_list + 1] = isp_data
						local_amount = local_amount + 1
					end
				end
			end
			profile_count = profile_count + 1
			profile_sum = profile_sum + 1
		end
	)
	
	if params.amount > profile_sum	or params.start_index > profile_sum then
		return false, "invalid new params"
	end
	
	data.start_index = params.start_index
	data.amount = params.amount
	data.sum = profile_sum
	data.settings_info_list = settings_info_list
	data = json.encode(data)
	local ret = {}
	ret.result = data
	return ret
end

local function tmp_iptv_get(formvalue)
	local data = {}
	local settings_info = {}
	local port_mode_info = {}
	local multicast_info = {}
	local inter_tag, iptv_tag, ipphone_tag
	
	local uci_r = uci.cursor()

	local enable = uci_r:get("iptv", "iptv", "enable") or "off"
	local qos_iptv_compatible = uci_r:get_profile("qos", "qos_iptv_compatible") or "yes"
	local qos_enable = uci_r:get("qos_v2", "settings", "enable") or "off"

	--the default display is custom
	data.profile_name = uci_r:get("iptv", "iptv", "mode") or "Custom"
	data.enable = enable == "on" and true or false
	data.qos_iptv_compatible = qos_iptv_compatible == "yes" and true or false
	data.qos_enable = qos_enable == "on" and true or false

	data.settings_info = tmp_get_settings_info(data.profile_name)
	data.port_mode_info = tmp_get_port_mode_info(data.profile_name)
	data.multicast_info = tmp_get_multicast_info()

	data = luci.json.encode(data)
	local ret = {}
	ret.result = data
	return ret
end


local function tmp_check_params(data)
	if not data or type(data) ~= "table" then
		return false, "invalid new params"
	end
	local uci_r = uci.cursor()
	local profile_name
	local settings_info
	local port_mode_info
	local multicast_info
	
	if data.profile_name then
		profile_name = data.profile_name
	end
	if data.settings_info then
		settings_info = data.settings_info
	end
	if data.port_mode_info then
		port_mode_info = data.port_mode_info
	end
	if data.multicast_info then
		multicast_info = data.multicast_info
	end
	
	if data.enable ~= nil and data.enable ~= true and data.enable ~= false
	then
		return false
	end

	if multicast_info then
		if multicast_info.igmp_snooping_enable ~= nil and multicast_info.igmp_snooping_enable ~= true and multicast_info.igmp_snooping_enable ~= false
		then
			return false
		end

		if multicast_info.igmp_enable ~= nil and multicast_info.igmp_enable ~= true and multicast_info.igmp_enable ~= false
		then
			return false
		end

		if multicast_info.mcwifi_enable ~= nil and multicast_info.mcwifi_enable ~= true and multicast_info.mcwifi_enable ~= false
		then
			return false
		end

		if multicast_info.igmp_version ~= nil and tonumber(multicast_info.igmp_version) < 2 or tonumber(multicast_info.igmp_version) > 3 then
			return false
		end
	end
	local function _vid(vid)
		local uvid = tonumber(vid)
		if dtypes.integer(vid) and (uvid >= 2 and uvid <= 4094)
		then
			return true 	   
		end   
	end

	local function _prio(prio)
		local uprio = tonumber(prio)
		if dtypes.integer(prio) and (uprio >= 0 and uprio <= 7)
		then			
			return true 	   
		end    
	end

	local function _aggport_conflict(aggports, ports, typeseq)
		-- aggports == nil means no conflict
		if not aggports then
			return true
		end

		if type(aggports) ~= "table" or type(ports) ~= "table" or type(typeseq) ~= "table" then
			return false
		end

		for _, aggpno in ipairs(aggports) do
			for pindex, pno in ipairs(ports) do
				if aggpno == pno and typeseq[pindex] ~= "Internet" then
					return false 
				end
			end
		end

		return true
	end    

	if settings_info then
	   	--check value of internet type if get
		if (settings_info.internet_vid and not _vid(settings_info.internet_vid))
			or (settings_info.internet_vprio and not _prio(settings_info.internet_vprio)) then
			return false
		end

	   --check value of iptv type if get
		if (settings_info.iptv_vid and not _vid(settings_info.iptv_vid))
			or (settings_info.iptv_vprio and not _prio(settings_info.iptv_vprio)) then
			return false
		end

	   --check value of ipphone type if get
		if (settings_info.ipphone_vid and not _vid(settings_info.ipphone_vid))
			or (settings_info.ipphone_vprio and not _prio(settings_info.ipphone_vprio)) then
			return false
		end

	   --check value of mciptv type if get
		if (settings_info.mciptv_vid and not _vid(settings_info.mciptv_vid))
			or (settings_info.mciptv_vprio and not _prio(settings_info.mciptv_vprio)) then
			return false
		end
	end
	
	if port_mode_info then
		-- check the port type
		if not port_mode_info.ports or not port_mode_info.porttype then
			return false
		end
		local porttype_array = port_mode_info.porttype
		local port_array = port_mode_info.ports   
		if not port_array or not porttype_array or #port_array ~= #porttype_array then
			return false
		end 

		local profile = uci_r:get_all("iptv", profile_name)
		local seltype_array = nil
		if profile and profile.seltype and profile.seltype ~= "" then
			seltype_array = util.split(profile.seltype, " ")
			-- check if the port type is valid
			if not check_port_type(porttype_array, seltype_array, true) then
				return false
			end
		end

		-- check port type conflict with lan agg port
		local lanagg = uci_r:get_all("switch", "lan_agg")
		local wanagg = uci_r:get_all("switch", "addl_wan")
		local aggports = ""
		if lanagg ~= nil and lanagg.enable_agg == "1" and lanagg.lacpports then
			aggports = aggports .. lanagg.lacpports
		end
		if wanagg ~= nil and wanagg.addl_wan_enable == "1" and wanagg.addl_wan_port then
			aggports = aggports .. wanagg.addl_wan_port
		end
		local aggports_array = nil
		if aggports ~= "" then
			aggports_array = util.split(aggports, " ")
		end
		if aggports_array and not _aggport_conflict(aggports_array, port_array, porttype_array) then
			return false
		end
	end
	return true
end

local function tmp_iptv_set(formvalue)
	--check the params
	local params = json.decode(formvalue.data)
	ret, errcode = tmp_check_params(params)
	if not ret then
		return false, errcode, {}
	end
	
	local result = {}
	local uci_r = uci.cursor()
	local enable
	local profile_name
	local settings_info
	local port_mode_info
	local multicast_info
	if params.enable ~= nil then
		enable = params.enable
	end
	if params.profile_name then
		profile_name = params.profile_name
	end
	if params.settings_info then
		settings_info = params.settings_info
	end
	if params.port_mode_info then
		port_mode_info = params.port_mode_info
	end
	if params.multicast_info then
		multicast_info = params.multicast_info
	end

	if port_mode_info then
		local tmp_prots = {}
		if port_mode_info.ports then
			tmp_prots.ports = array_to_string(port_mode_info.ports)
		end
		if port_mode_info.porttype then
			tmp_prots.porttype = array_to_string(port_mode_info.porttype)
		end
		port_mode_info = tmp_prots
	end
	   
	-- force Bridge mode and Custom mode Aggregation port to Internet
	if profile_name == "Bridge" or profile_name == "Custom" then
		if port_mode_info then
			port_mode_info = replace_aggporttype(port_mode_info)
		end
	end

	local log = require("luci.model.log").Log(216)
	if enable == true then
		log(502)
	else
		log(503)
	end
	
	cfg_changed = true

	if enable ~= nil then
		uci_r:set("iptv", "iptv", "enable", enable == true and "on" or "off")
	end
	if profile_name then
		uci_r:set("iptv", "iptv", "mode", profile_name)
	end
	if multicast_info then
		-- Set igmp proxy
		if	multicast_info.igmp_enable ~= (uci_r:get("iptv", "iptv", "igmp_enable") == "on" and true or false) then
			local logn = logm.Logn("igmp-proxy")
			logn(logn.logid.IMPROXY_SWITCH_OP, multicast_info.igmp_enable == true and "on" or "off")
		end
	
		-- Set igmp snooping
		if multicast_info.igmp_snooping_enable ~= nil then
			uci_r:set("iptv", "iptv", "igmp_snooping_enable", multicast_info.igmp_snooping_enable == true and "on" or "off")
		end
		
		if multicast_info.igmp_enable ~= nil then
			uci_r:set("iptv", "iptv", "igmp_enable", multicast_info.igmp_enable == true and "on" or "off")
		end
		if multicast_info.mcwifi_enable ~= nil then
			uci_r:set("iptv", "iptv", "mcwifi_enable", multicast_info.mcwifi_enable == true and "on" or "off")
		end
		if multicast_info.igmp_version ~= nil then
			uci_r:set("iptv", "iptv", "igmp_version", multicast_info.igmp_version)
		end
	end
	
	local ports = uci_r:get("iptv", "iptv", "lanport")
	if not ports then
		if port_mode_info and port_mode_info.ports then
			uci_r:set("iptv", "iptv", "lanport", port_mode_info.ports)
		end
	end

	if not profile_name then
		profile_name = uci_r:get("iptv", "iptv", "mode")
	end
	
	local profile = uci_r:get_all("iptv", profile_name)
	if profile then
		if settings_info ~= nil then
			--uci set internet_
			--uci_r:set("iptv", profile_name, "internet_item", settings_info.internet_item == true and "on" or "off")
			if settings_info.internet_vid ~= nil then
				uci_r:set("iptv", profile_name, "internet_vid",  settings_info.internet_vid)
			end
			if settings_info.internet_vprio ~= nil then
				uci_r:set("iptv", profile_name, "internet_vprio",settings_info.internet_vprio)
			end
			if settings_info.internet_tag ~= nil then
				uci_r:set("iptv", profile_name, "internet_tag",  settings_info.internet_tag == true and "on" or "off")
			end		

			--uci set ipphone_
			--uci_r:set("iptv", profile_name, "ipphone_item",  settings_info.ipphone_item == true and "on" or "off")
			if settings_info.ipphone_vid ~= nil then
				uci_r:set("iptv", profile_name, "ipphone_vid",	 settings_info.ipphone_vid)
			end
			if settings_info.ipphone_vprio ~= nil then
				uci_r:set("iptv", profile_name, "ipphone_vprio", settings_info.ipphone_vprio)
			end	
			if settings_info.ipphone_tag ~= nil then
				uci_r:set("iptv", profile_name, "ipphone_tag",	settings_info.ipphone_tag == true and "on" or "off")
			end
			
			--uci set iptv_
			--uci_r:set("iptv", profile_name, "iptv_item",	 settings_info.iptv_item == true and "on" or "off")
			if settings_info.iptv_vid ~= nil then
				uci_r:set("iptv", profile_name, "iptv_vid", 	 settings_info.iptv_vid)
			end
			if settings_info.iptv_vprio ~= nil then
				uci_r:set("iptv", profile_name, "iptv_vprio",	 settings_info.iptv_vprio)
			end
			if settings_info.iptv_tag ~= nil then
				uci_r:set("iptv", profile_name, "iptv_tag",  settings_info.iptv_tag == true and "on" or "off")
			end

			--uci set mciptv_
			--uci_r:set("iptv", profile_name, "mciptv_item",   settings_info.mciptv_item == true and "on" or "off")
			if settings_info.mciptv_enable ~= nil then
				uci_r:set("iptv", profile_name, "mciptv_enable", settings_info.mciptv_enable == true and "on" or "off")
			end
			if settings_info.mciptv_vid ~= nil then
				uci_r:set("iptv", profile_name, "mciptv_vid",	 settings_info.mciptv_vid)
			end
			if settings_info.mciptv_vprio ~= nil then
				uci_r:set("iptv", profile_name, "mciptv_vprio",  settings_info.mciptv_vprio)
			end
			if port_mode_info and port_mode_info.porttype ~= nil then
				uci_r:set("iptv", profile_name, "porttype",	   port_mode_info.porttype)
			end
			if port_mode_info and port_mode_info.seltype ~= nil then
				uci_r:set("iptv", profile_name, "seltype",	 port_mode_info.seltype)
			end
		end
	end

	uci_r:commit("iptv")
	sys.fork_exec(RELOAD_IPTV)

	local ret = {}
	ret.result = data
	return ret
end

local dispatch_tbl = {
    ["setting"] = {
        ["read"]  = { cb = get },
        ["write"] = { cb = set },
        ["change"] = { cb = getspec }
    },

    --form app
    ["tmp_setting"] = {
        ["all_profile_settings_info_get"] = { cb = tmp_profile_get },
        ["iptv_settings_info_get"] = { cb = tmp_iptv_get },
        ["iptv_settings_info_set"] = { cb = tmp_iptv_set }
    }
}

function dispatch(http_form)
    return ctl.dispatch(dispatch_tbl, http_form)
end

function iptv_dispatch(app_form)
    return ctl.dispatch(dispatch_tbl, app_form)
end

function _index()
    return ctl._index(dispatch)
end

function index()
    entry({"admin", "iptv"}, call("_index")).leaf = true
end

