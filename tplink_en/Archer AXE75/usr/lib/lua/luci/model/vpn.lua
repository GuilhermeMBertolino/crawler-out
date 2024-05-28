--[[
Copyright(c) 2008-2014 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  vpn.lua
Details :  
Author  :  Zhu Xianfeng<zhuxianfeng@tp-link.net>
Version :  1.0.0
Date    :  07Jan15
History :  arg 1.0.0, 07Jan15, Zhu Xianfeng, Create the file.
]]--

module("luci.model.vpn", package.seeall)

require "luci.ip"
local sys      = require "luci.sys"
local debug    = require "luci.tools.debug"
local uci    = require "luci.model.uci"

local uci_r    = uci.cursor()

XL2TPD_PID_FILE="/var/run/xl2tpd/xl2tpd.pid"
XL2TPD_STATUS_PREFIX="/var/run/l2tp_status-"
-- Get all OpenVPN clients connected
-- @param N/A
-- @return table
local function openvpn_clients()
    local clients = {}
    local cmd     = 'vpn_mgmt openvpn "status 2"'
    local input   = io.popen(cmd)
    local line    = nil
    local remoteip = nil
    local ipaddr  = nil
    local extra   = nil

	if input then
		while true do
			line = input:read("*l")
			if line then 
				-- CLIENT_LIST,client,124.0.0.2:63572,10.8.0.6,7701,7893,Sat Dec 13 10:22:27 2014,1418494947,UNDEF
				extra, ipaddr = line:match("^CLIENT_LIST,client,(%d+%.%d+%.%d+%.%d+:%d+),(%d+%.%d+%.%d+%.%d+)")
				if extra then
				    remoteip = extra:match("(%d+%.%d+%.%d+%.%d+):%d+")
				end
				if remoteip and ipaddr and extra then
				    table.insert(clients, {vpntype = "openvpn", remote_ip = remoteip, ipaddr = ipaddr, extra = extra})
				end
			else
				break
			end
		end
		input:close()
	end

    return clients
end

-- Disconnect OpenVPN client connected
-- @param N/A
-- @return boolean
local function openvpn_disconn(client)
    local clients = openvpn_clients()
    local v = nil

    if type(client) == "table" then
        for _, v in pairs(clients) do
            if v.extra == client.extra then
                sys.fork_exec('vpn_mgmt openvpn "kill ' .. v.extra .. '"')
                nixio.nanosleep(1, 0)
                return true
            end
        end
    elseif type(client) == "string" and client == "all" then
        -- Disconnect all clients
        for _, v in pairs(clients) do
            sys.fork_exec('vpn_mgmt openvpn "kill ' .. v.extra .. '"')
        end
        return true
    end

    return false
end


-- Get all PPTP VPN clients connected
-- @param N/A
-- @return table
local function pptp_clients()
    local clients = {}
    local cmd = [[
        for pid in `pidof pppd`; do 
            cat /proc/$pid/cmdline | xargs -0 echo "pid=$pid "
        done
    ]]
    local input  = io.popen(cmd)
    local line   = nil
    local pid    = nil
    local ipaddr = nil
    local remoteip = nil
    local username = nil
    local filename = nil
    local file = nil
    local input2 = nil

    for line in input:lines() do
        pid, _, _, ipaddr, remoteip = line:match("^pid=(%d+)%s+.+%s+(%d+)%s+(%d+%.%d+%.%d+%.%d+):(%d+%.%d+%.%d+%.%d+)%s+ipparam%s+(%d+%.%d+%.%d+%.%d+)")
        if pid then
            filename = "/tmp/ppp" .. pid
            file = io.open(filename, "r")
            if file then
                username = file:read("*line")
                file:close()
            else
                username = nil
            end
        end
        if pid and ipaddr and remoteip and username then
            table.insert(clients, {vpntype = "pptp", ipaddr = ipaddr, remote_ip = remoteip, username = username, extra = pid})
        end
        ---line = input:read("*l")
    end

    input:close()

    return clients
end

-- Disconnect PPTP VPN client connected
-- @param N/A
-- @return boolean
local function pptp_disconn(client)
    local clients = pptp_clients()
    local v = nil

    if type(client) == "table" then
        for _, v in pairs(clients) do
            if v.extra == client.extra then
                sys.fork_exec("kill " .. client.extra)
                nixio.nanosleep(1, 0)
                return true
            end
        end
    elseif type(client) == "string" and client == "all" then
        -- Disconnect all clients
        for _, v in pairs(clients) do
            sys.fork_exec("kill " .. v.extra)
        end
        return true
    end

    return false
end

-- Get all L2TP VPN clients connected
-- @param N/A
-- @return table
local function l2tp_clients()
    local clients = {}
    local line   = nil
    local pid    = nil
    local ipaddr = nil
    local remoteip = nil
    local username = nil
    local filename = nil
    local file = nil
    local input2 = nil
	local line2 = nil
	local tunnel = nil


	local pidfile=io.open(XL2TPD_PID_FILE, "r")
	if not pidfile then
		--return false, "no xl2tpd pid file"
		return clients
	end
	local pid=pidfile:read()
	pidfile:close()
	local statusfile=XL2TPD_STATUS_PREFIX .. pid
	local lockfile=XL2TPD_STATUS_PREFIX .. pid .. ".lock"

	local clear_cmd = ": > " .. statusfile
	sys.call(clear_cmd)
	sys.call("xl2tpd-control status 1")
	while (file_exists(lockfile))
	do
		nixio.nanosleep(0, 200000000)
	end

	input2 = io.open(statusfile, "r")
	if input2 then
		for line2 in input2:lines() do
			tunnel = nil
			remoteip = nil
			pid = nil
			ipaddr = nil
			username = nil
			tunnel, remoteip = line2:match(".ID%s+=%s+(%d+)%s+.local.,%s+%d+%s+.remote.%s+to%s+(%d+%.%d+%.%d+%.%d+):")

			if tunnel then
				filename = "/tmp/tunnelid"..tunnel
				file = io.open(filename, "r")
				if file then
					line = file:read("*line")
					if line then
						pid, ipaddr = line:match("(%d+)%s+(%d+%.%d+%.%d+%.%d+)")
					end
					file:close()
				end
				
				if pid then
					filename = "/tmp/ppp"..pid
					file = io.open(filename, "r")
					if file then
						username = file:read("*line")
						file:close()
					end
				end
			end
			if pid and ipaddr and remoteip and username and tunnel then
				table.insert(clients, {vpntype = "l2tp", ipaddr = ipaddr, remote_ip = remoteip, username = username, extra = tunnel})
			end
		end
		input2:close()
	end

    return clients
end

-- Disconnect L2TP VPN client connected
-- @param N/A
-- @return boolean
local function l2tp_disconn(client)
    local clients = l2tp_clients()
    local v = nil
    local cmd

    if type(client) == "table" then
        for _, v in pairs(clients) do
            if v.extra == client.extra then
                sys.fork_exec("xl2tpd-control disconnect-lac " .. client.extra)
				sys.fork_exec("rm /tmp/tunnelid"..client.extra)
                return true
            end
        end
    elseif type(client) == "string" and client == "all" then
        -- Disconnect all clients
        for _, v in pairs(clients) do
            sys.fork_exec("xl2tpd-control disconnect-lac " .. v.extra)
			sys.fork_exec("rm /tmp/tunnelid"..v.extra)
        end
        return true
    end

    return false
end

-- Get all VPN clients connected 
-- @param N/A
-- @return table
function vpn_clients(vpntype)
    if vpntype == "openvpn" then
        return openvpn_clients()
    elseif vpntype == "pptp" then
        return pptp_clients()
	elseif vpntype == "l2tp" then
        return l2tp_clients()
	else
        return false
    end
end

function check_ip_is_pptp_client(ip)
    local clients = pptp_clients()
    for _, item in pairs(clients) do
        if luci.ip.IPv4(ip) == luci.ip.IPv4(item.ipaddr) then
            return true
        end
    end    
    return false
end

function check_ip_is_vpn_client(ip)
    local clients = pptp_clients()
    for _, item in pairs(clients) do
        if luci.ip.IPv4(ip) == luci.ip.IPv4(item.ipaddr) then
            return true
        end
    end    
    clients = openvpn_clients()
    for _, item in pairs(clients) do
        if luci.ip.IPv4(ip) == luci.ip.IPv4(item.ipaddr) then
            return true
        end
    end
    return false
end

-- Disconnect VPN client connected
-- @param N/A
-- @return boolean
function vpn_disconn(client)
    if client.vpntype == "openvpn" then
        return openvpn_disconn(client)
    elseif client.vpntype == "pptp" then
        return pptp_disconn(client)
	elseif client.vpntype == "l2tp" then
        return l2tp_disconn(client)
    else
        return false
    end
end

-- Disconnect all VPN client connected
-- @param N/A
-- @return boolean
function vpn_disconn_all(vpntype)
    if vpntype == "openvpn" then
        return openvpn_disconn("all")
    elseif vpntype == "pptp" then
        return pptp_disconn("all")
	elseif vpntype == "l2tp" then
        return l2tp_disconn("all")
    else
        return false
    end
end

function file_exists(path)
	local file = io.open(path, "rb")
	if file then
		file:close()
	end
	return file ~= nil
end

-- Update vpn config
-- @param N/A
-- @return boolean
function vpn_client_update(proto)
    local enabled = uci_r:get("vpn", "client", "enabled")
    local vpn_name = uci_r:get("vpn", "client", "vpntype")
    local ipv6_proto = {"staticv6","dhcpv6","pppoev6","6to4","passthrough"}
    local basic_mtu
    local parent
    local mru

    if not enabled or enabled == "off" then
        return
    end
    -- todo:vpn client support ipv6
    for _, v in pairs(ipv6_proto) do
        if v == proto then
            return
        end
    end    

    if proto == "static" or proto == "dhcp" then
        parent = "wan"
        basic_mtu = uci_r:get("network", "wan", "mtu")
    else
        parent = "internet"
        basic_mtu = uci_r:get("network", "internet", "mru")
    end

    if vpn_name == "pptpvpn" then
        mru = tonumber(basic_mtu) - 80 
        uci_r:set("network", "vpn", "mru", mru)  
    elseif vpn_name == "l2tpvpn" then
        mru = tonumber(basic_mtu) - 40
        uci_r:set("network", "vpn", "mru", mru)
    elseif vpn_name == "openvpn" then
        uci_r:set("network", "vpn", "mtu", basic_mtu)
    end

    uci_r:set("network", "vpn", "parent", parent)

    uci_r:commit("network")
    sys.fork_call("/etc/init.d/vpnc restart")
end
