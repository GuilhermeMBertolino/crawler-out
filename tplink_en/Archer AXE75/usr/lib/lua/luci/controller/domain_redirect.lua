--[[
Copyright(c) 2008-2016 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  domain.lua
Details :  For get through tplinklogin.net
Author  :  Zhang Mingce <zhangmingce@tp-link.net>
Version :  1.0.0
Date    :  11 Oct, 2016
]]--

module("luci.controller.domain_redirect", package.seeall)

local sys = require "luci.sys"
local dbg = require "luci.tools.debug"
local ctl = require "luci.model.controller"

function domain_ip()
	local ip_addr = {}
	local redirect_ip = get_ip(sys.exec("dnslookup -t 2 tplinklogin.net"))
	ip_addr.url = redirect_ip

	return ip_addr
end

function get_ip(str)
	local ip = string.match(str, "%d+.%d+.%d+.%d+")
	if ip then	
		return ip
	else
		return "103.224.212.249"	
	end
end

local dispatch_tbl = {
    get = {
        [".super"] = {cb = domain_ip},
    },
}

function dispatch(http_form)
	return ctl.dispatch(dispatch_tbl, http_form)
end

function _index()
	return ctl._index(dispatch)
end

function index()
	entry({"domain_redirect"}, call("_index")).leaf = true	
end
