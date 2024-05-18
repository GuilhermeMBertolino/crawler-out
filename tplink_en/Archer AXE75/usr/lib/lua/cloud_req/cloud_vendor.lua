--[[
Copyright(c) 2016 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  cloud_vendor.lua
Details :  get daylight saving time rules from cloud
Author  :  Zhang Mingce <zhangmingce@tp-link.net>
Version :  1.0.0
Date    :  Sep, 2016
]]--
module("cloud_req.cloud_vendor", package.seeall)

local cloud_https = require "cloud_req.cloud_https"
local dbg 	= require "luci.tools.debug"

function get_vendor(vendor, retrycount)
	local ret = nil
	local data = nil

	-- get url and token
	ret, data = cloud_https.cloud_https_get_devicetoken("utils", retrycount)
	if ret ~= 0 then
		return false, ret
	end

	-- handler err_code
	if data.error_code ~= 0 then
		return false, data.error_code
	end

	local httpinfo = {}
	httpinfo.method = "POST"
	httpinfo.url = data.url .. "/utils/lookupMacVendor"

	local req = {}
	req.oui = vendor
	req.deviceToken = data.token

	ret, data = cloud_https.cloud_https_getinfo_dispatch("spec", httpinfo, req, retrycount)

	-- connection error
	if ret ~= 0 then
		--dbg.print("cloud https get failed: " .. ret)
		return false, ret
	end

	if not data then
		return false, -1000
	end

	-- handler err_code
	if data.error_code ~= 0 then 
		--dbg.print("Cloud Get vendor failed.")
		return false, data.error_code
	end

	if not data.result then
		return false, -1000
	end

	return data.result.vendor
end
