#!/usr/bin/env lua

local bit     = require "bit"
local uci     = require "luci.model.uci"
local dbg     = require "luci.tools.debug"
local dtype   = require "luci.tools.datatypes"

local uci_r = uci.cursor()

local action = arg[1]

local function lua_split_string(string, split)
    local tab = {}
    
    while true do
        local pos = string.find(string, split)
        if not pos then
            tab[#tab + 1] = string
            break
        end
        local sub_str = string.sub(string, 1, pos - 1)
        tab[#tab + 1] = sub_str
        string = string.sub(string, pos + 1, #string)
    end
    
    return tab
end

local function lua_inet_aton(ipaddr)
    if type(ipaddr) ~= "table" then return 0 end

    local ip = bit.lshift(ipaddr[1], 24) + bit.lshift(ipaddr[2], 16) + bit.lshift(ipaddr[3], 8) + ipaddr[4]
    return ip
end

local function get_dhcp_options_byiface(iface)
    local options = uci_r:get("dhcp", iface, "dhcp_option")
    local data = {}

    if not options then
        return false
    end

    for _, op in ipairs(options) do
        local op_code = op:match("(%d+),")
        if op_code == "3" then
            data.gateway = op:match(",(.+)") or ""
        elseif op_code == "6" then
            local op1, op2 = op:match(",(.+),%s*(.+)")
            data.dns = {op1, op2} 
        elseif op_code == "15" then
            data.domain = op:match(",(.+)") or ""
        end
    end

    return data
end

-- Update the options of dhcp server
local function dhcp_opt_update_byiface(ipaddr, iface)
    if not dtype.ipaddr(ipaddr) then return false end

    --local chg = recalc_pool() -- Reset start ipaddr and range limit

    local options = get_dhcp_options_byiface(iface)
    if options then
        -- Only lan ip address different form current dhcps gateway, will update
        if ipaddr ~= options.gateway then
            uci_r:delete("dhcp", iface, "dhcp_option")  
            uci_r:set_list("dhcp", iface, "dhcp_option", "3," .. ipaddr)
            if options.dns then
                local pri_dns, snd_dns
                pri_dns = options.dns[1] and options.dns[1] or "0.0.0.0"
                snd_dns = options.dns[2] and options.dns[2] or "0.0.0.0"
                if pri_dns ~= "0.0.0.0" or snd_dns ~= "0.0.0.0" then
                    uci_r:set_list("dhcp", iface, "dhcp_option", "6," .. pri_dns .. "," .. snd_dns)
                end
            end
            if options.domain then
                uci_r:set_list("dhcp", iface, "dhcp_option", "15," .. options.domain) 
            end
            uci_r:commit_without_write_flash("dhcp")
        end
    end
end

local function ffs_config_start(arg)
    local ffs_wireless_iface = uci_r:get("amazon_ffs", "ffs", "wireless_iface")
    local need_commit = false

    if not ffs_wireless_iface then return end
    
    --[[config check, sync amazon_ffs config to other related config file]]
    if uci_r:get("network", "wifi") ~= "interface" then
        local iface = uci_r:get_first("amazon_ffs", "interface")
        local val_t = uci_r:get_all("amazon_ffs", iface)
        uci_r:section("network", "interface", "wifi", val_t)
        uci_r:set("network", "wifi", "ifname", ffs_wireless_iface)
        need_commit = true
    end
    
    if uci_r:get("dhcp", "wifi") ~= "dhcp" then
        local dhcpd_conf = uci_r:get_first("amazon_ffs", "dhcp")
        local val_t = uci_r:get_all("amazon_ffs", dhcpd_conf)
        uci_r:section("dhcp", "dhcp", "wifi", val_t)
        need_commit = true
    end
    
    if uci_r:get("wireless", ffs_wireless_iface) ~= "wifi-iface" then
        local wifi_iface = uci_r:get_first("amazon_ffs", "wifi-iface")
        local val_t = uci_r:get_all("amazon_ffs", wifi_iface)
        uci_r:section("wireless", "wifi-iface", ffs_wireless_iface, val_t)
        uci_r:set("wireless", ffs_wireless_iface, "ifname", ffs_wireless_iface)
        need_commit = true
    end
    
    --[[not need write flash]]
    if need_commit == true then
        uci_r:commit_without_write_flash("network", "dhcp", "wireless")
    end
end

local function ffs_config_stop(arg)
    local ffs_wireless_iface = uci_r:get("amazon_ffs", "ffs", "wireless_iface")
    local need_commit = false

    if not ffs_wireless_iface then return end

    if uci_r:get("network", "wifi") == "interface" then
        uci_r:delete("network", "wifi")
        need_commit = true
    end
    
    if uci_r:get("dhcp", "wifi") == "dhcp" then
        uci_r:delete("dhcp", "wifi")
        need_commit = true
    end
    
    if uci_r:get("wireless", ffs_wireless_iface) == "wifi-iface" then
        uci_r:delete("wireless", ffs_wireless_iface)
        need_commit = true
    end
    
    if need_commit == true then
        uci_r:commit("network", "dhcp", "wireless")
    end
end

local function ffs_config_detect(arg)
    local ffs_wireless_iface = uci_r:get("amazon_ffs", "ffs", "wireless_iface")
    local network_wifi = false
    local dhcp_wifi = false
    local wireless_iface = false
    
    if not ffs_wireless_iface then return "unknow" end

    if uci_r:get("network", "wifi") == "interface" then network_wifi = true end
    if uci_r:get("dhcp", "wifi") == "dhcp" then dhcp_wifi = true end
    if uci_r:get("wireless", ffs_wireless_iface) == "wifi-iface" then wireless_iface = true end
    
    if network_wifi and dhcp_wifi and wireless_iface then
        return "all"
    elseif not network_wifi and not dhcp_wifi and not wireless_iface then
        return "none"
    else
        return "part"
    end
end


local function ffs_network_change(arg)
    local ipaddr = arg[2]
    local submask = arg[3]

    dhcp_opt_update_byiface(ipaddr, "wifi")
    uci_r:set("network", "wifi", "ipaddr", ipaddr)
    uci_r:set("network", "wifi", "netmask", submask)
    uci_r:commit_without_write_flash("network")
end

local function ffs_get_mask_length(arg)
    local mask = arg[2]
    local mask_len = -1

    if not dtype.ipaddr(mask) then return 0 end

    if mask == "255.255.255.255" then mask_len = 32
    elseif mask == "255.255.255.0" then mask_len = 24
    elseif mask == "255.255.0.0" then mask_len = 16
    elseif mask == "255.0.0.0" then mask_len = 8
    elseif mask == "0.0.0.0" then mask_len = 0
    end

    if mask_len == -1 then
        local mask_addr = lua_split_string(mask, "%.")
        local mask_net = lua_inet_aton(mask_addr)
        
        mask_len = 0
        for i = 31, 0, -1 do
            if bit.check(mask_net, bit.lshift(0x1, i)) then
                mask_len = mask_len + 1
            else
                break
            end
        end
    end
    
    return mask_len
end

local ffs_config_inst = {
    api = {
        cfg_init    = ffs_config_start,
        cfg_clean   = ffs_config_stop,
        cfg_detect  = ffs_config_detect,
        net_change  = ffs_network_change,
        get_masklen = ffs_get_mask_length,
    }
}

local func = ffs_config_inst.api[arg[1]]

if not func then
    dbg.print("unknow api")
end

local ret = func(arg)

if ret ~= nil then
    print(tostring(ret))
end