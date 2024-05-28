#!/usr/bin/env lua
--[[ 
Copyright(c) 2011-2018 Shenzhen TP-LINK Technologies Co.Ltd.

file    : lanv6_genrate_ndp_prefix.lua
brief   : genrate ND Proxy Prefix
author  : Li Weijie
version : 1.0.0
date    : 24Jul18
]]--

local ip   = require "luci.ip"
local bit  = require "bit"
local sys  = require "luci.sys"
local util = require "luci.util"

local ip6addr = arg[1] or "::"

if ip6addr ~= "::" then
	local cidr_ipv6 = ip.IPv6(ip6addr)  
	local split_ip6addr = util.split(cidr_ipv6:string(),":")                                        
	local ndp_prefix = split_ip6addr[1] .. ":" .. split_ip6addr[2] .. ":" .. split_ip6addr[3] .. ":" .. split_ip6addr[4] .. "::" 
	print(ndp_prefix)
end