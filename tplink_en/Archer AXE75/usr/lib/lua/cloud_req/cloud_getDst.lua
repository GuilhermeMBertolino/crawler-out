--[[
Copyright(c) 2016 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  cloud_dst.lua
Details :  get daylight saving time rules from cloud
Author  :  Wang Lian <wanglian@tp-link.net>
Version :  1.0.0
Date    :  08Jun, 2016
]]--

module("cloud_req.cloud_getDst", package.seeall)

local cloud_https = require "cloud_req.cloud_https"
local uci_r = require("luci.model.uci").cursor()
local dbg   = require "luci.tools.debug"

function _print_tbl(data)
    if type(data) == "table" then
        for i, v in pairs(data) do
            dbg.print(i .. " = " .. tostring(data[i]))
            if type(data[i]) == "table" then
                _print_tbl(data[i])
            end
        end
    end
end

function get_dst_ruleList(zoneId, retrycount)
	local ret = nil
	local data = nil

	-- get zoneId
	local zoneId_t = zoneId or uci_r:get("systime", "zoneinfo", "tz_region") 
	if not zoneId_t then
		dbg.print("tz_region not found")
		return false, "tz_region not found"
	end
	
	-- get url and token
	ret, data = cloud_https.cloud_https_get_devicetoken("utils", retrycount)
	if ret ~= 0 then 
		return false, ret
	end

	-- handler err_code
	if data.error_code ~= 0 then 
		return false, data.error_code
	end

	-- assemble url and request
	local httpinfo = {}
	httpinfo.method = "POST"
	httpinfo.url = data.url .. "/utils/getDstRule"

	local req = {}	
	req.zoneId = zoneId_t
	req.deviceToken = data.token	
	
	ret, data = cloud_https.cloud_https_getinfo_dispatch("spec", httpinfo, req, retrycount)
	
	-- connection error
	if ret ~= 0 then 
		dbg.print("cloud_getDst https request failed: " .. ret)		
		return false, ret
	end

	if not data then
		return false, -1000
	end

	-- handler err_code
	if data.error_code ~= 0 then 
		dbg.print("cloud_getDst get dst rules failed.")
		return false, data.error_code
	end

	if not data.result then
		return false, -1000
	end
		
	return data.result.rules
end
