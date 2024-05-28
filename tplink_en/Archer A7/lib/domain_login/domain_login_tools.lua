#!/usr/bin/env lua

local bit = require "bit"
local nw  = require "luci.controller.admin.network"
local luci_cfg = require "luci.config"
local nixio = require "nixio"
    
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
    if type(ipaddr) ~= "table" then
        return 0
    end

    local ip = bit.lshift(ipaddr[1], 24) + bit.lshift(ipaddr[2], 16) + bit.lshift(ipaddr[3], 8) + ipaddr[4]
    return ip
end

local function lua_mast_ntoa(mask)
    local m = bit.lshift(tonumber(0xffffffff,16), 32 - tonumber(mask))
    local m1 = bit.rshift(tonumber(m,16), 24)
    local m2 = bit.rshift(bit.band(0x00ffffff, m), 16)
    local m3 = bit.rshift(bit.band(0x0000ffff, m), 8)
    local m4 = bit.band(0x000000ff, m)
    
    local mk = m1 .. "." .. m2 .. "." .. m3 .. "." .. m4
    return mk

end

local function dlogin_is_samesubnet(lanaddr, checkaddr, lanmask)
    local lan_addr = lua_split_string(lanaddr, "%.")
    local wan_addr = lua_split_string(checkaddr, "%.")
    local mask = bit.lshift(tonumber(0xffffffff, 16), 32 - tonumber(lanmask))

    if bit.band(lua_inet_aton(lan_addr), mask) ==
            bit.band(lua_inet_aton(wan_addr), mask)
    then
        return true
    else
        return false
    end
end

--ip addr in checkaddrlist is split by ','
local function dlogin_ip_list_is_samesubnet(lanaddr, checkaddrlist, lanmask)
    checkaddrlist = checkaddrlist:gsub(",", " ")
    for ip in string.gmatch(checkaddrlist, "%S+") do
        if true == dlogin_is_samesubnet(lanaddr, ip, lanmask)
        then 
            return true
        end
    end

        return false
    end


local function dlogin_list_is_samesubnet(arg)
    if not arg[2] or not arg[3] or not arg[4]
    then
        return false
    end

    return dlogin_ip_list_is_samesubnet(arg[2], arg[3], arg[4])
    end
    
    
-- Param must be wan ip address
local function dlogin_network_do(arg)
    
    if not arg[2] or not arg[3] then
        return false
    end

    local http_form = {}
    http_form.form = "lan_ipv4"
    http_form.operation = "write"                     
    http_form.ipaddr = arg[2]  
    http_form.mask_type = arg[3]                     
    if arg[3] ~= "255.255.255.0" and arg[3] ~= "255.255.0.0" and arg[3] ~= "255.0.0.0" then
        http_form.custom_value = http_form.mask_type 
        http_form.mask_type = "custom"    
    end

    local res = nw.dispatch(http_form)
    if res.success then
        local new_net = arg[2] .. "/" .. arg[3]
        return new_net
    else
        return false
    end
end

local function dlogin_kill_session(arg)
    local sauth = require "luci.sauth"
    local path = luci_cfg.sauth.sessionpath    
    local sess_dir = nixio.fs.dir(path)
    local sess

    if sess_dir ~= nil then
		for sess in nixio.fs.dir(path) do
			sauth.kill(sess)
		end
    end

    return true
end


local function dlogin_get_new_net(arg)
    local conflict_ip = { 
        "192.168.0.1",
        "192.168.1.1",
        "192.168.2.1",
        "192.168.3.1",
        "192.168.4.1",
        "192.168.5.1",
        "192.168.6.1",
        "192.168.7.1",
        "192.168.8.1",
        "192.168.9.1",
    }

    if not arg[2] or not arg[3]
    then
        return false
    end

    for key,new_addr in ipairs(conflict_ip) do
        if false == dlogin_ip_list_is_samesubnet(new_addr, arg[2], arg[3])
        then
            local new_net = new_addr .. "/" .. lua_mast_ntoa(arg[3])
            return new_net
        end
    end
    
    return false
end

local dlogin_inst = {
    api = {
        checklist = dlogin_list_is_samesubnet,
        ipchg = dlogin_network_do,
        ksess = dlogin_kill_session,
        getnew = dlogin_get_new_net
    }
}

local func = dlogin_inst.api[arg[1]]

if not func then
    print(false)
end

local res = func(arg)

print(tostring(res))

