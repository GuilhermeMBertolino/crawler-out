--[[
Copyright(c) 2008-2016 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  cloud_getTmSig.lua
Details :  get TM signature from tp-link cloud server.
Author  :  Zhu Junjie <zhujunjie@tp-link.net>
Version :  1.0.0
Date    : 29 Dec, 2016
]]--

module("cloud_req.cloud_getTmSig", package.seeall)

local cloud_https = require "cloud_req.cloud_https"
local dbg   = require "luci.tools.debug"

local DEFAULT_CURR_VERSION = "1.000"
TM_SIG_CURR_VER_FILE = "/tmp/tm-shn/sig_version"


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

function check_tm_sig_update(retrycount)
	local servicetype = "resources"
	local httpinfo = {}
	httpinfo.method = "GET"
	httpinfo.path = "/res/checkSignatureUpdate"
	httpinfo.params = {}

	local basic_info = cloud_https.get_device_basicinfo()
	httpinfo.params.deviceId    = basic_info.deviceId or ""
	httpinfo.params.deviceModel = basic_info.devModel or ""
	httpinfo.params.deviceHwVer = basic_info.devHwVer or ""
	httpinfo.params.oemId       = basic_info.oemId or ""
	httpinfo.params.fwVer       = basic_info.fwVer or ""
	httpinfo.params.deviceHwId  = basic_info.hwId or ""
	httpinfo.params.currSigVer  = ""

	if nixio.fs.access(TM_SIG_CURR_VER_FILE) then
	    local file, err = io.open(TM_SIG_CURR_VER_FILE, 'r')
		if file == nil then
			dbg.printf(err)
		else
			local currSigVer = file:read("*line")
			file:close()
			httpinfo.params.currSigVer = currSigVer
		end
	else
	    httpinfo.params.currSigVer = DEFAULT_CURR_VERSION
	end

	local req = nil
	local ret, data = cloud_https.cloud_https_getinfo_dispatch(servicetype, httpinfo, req, retrycount)

	-- connection error
	if ret ~= 0 then
		dbg.print("cloud https check tm signature connection failed: " .. ret)
		return false, ret
	end

	if not data then
		return false, -1000
	end

	-- handler err_code
	if data.error_code ~= 0 then
		dbg.print("cloud https check tm signature failed.")
		return false, data.error_code
	end

	return data.result
end

function download_tm_sig_update(download_path, retrycount)
	local servicetype = "resources"
	local httpinfo = {}
	httpinfo.path = "/res/downloadSignature"
	httpinfo.params = {}

	local basic_info = cloud_https.get_device_basicinfo()
	httpinfo.params.deviceId    = basic_info.deviceId or ""
	httpinfo.params.deviceModel = basic_info.devModel or ""
	httpinfo.params.deviceHwVer = basic_info.devHwVer or ""
	httpinfo.params.oemId       = basic_info.oemId or ""
	httpinfo.params.fwVer       = basic_info.fwVer or ""
	httpinfo.params.deviceHwId  = basic_info.hwId or ""
	httpinfo.params.currSigVer  = ""

	if nixio.fs.access(TM_SIG_CURR_VER_FILE) then
	    local file, err = io.open(TM_SIG_CURR_VER_FILE, 'r')
		if file == nil then	
			dbg.printf(err)
		else
			local currSigVer = file:read("*line")
			file:close()
			httpinfo.params.currSigVer = currSigVer
		end
	else
	    httpinfo.params.currSigVer = DEFAULT_CURR_VERSION
	end

	local req = nil

	ret, data = cloud_https.cloud_https_download_dispatch(servicetype, httpinfo, req, download_path, retrycount)

	--dbg(ret)
	--dbg(data.err_code)
	--dbg(data.http_scode)

	-- connection error
	if ret ~= 0 then
		dbg.print("cloud https get tm sig connection failed: " .. ret)
		return ret
	end

	if not data then
		return -1000
	end

	-- handler error code by http status code
	if data.http_scode ~= 200 then
		dbg.print("cloud https get tm sig failed: " .. data.http_scode)
		return data.http_scode
	end

	return ret
end
