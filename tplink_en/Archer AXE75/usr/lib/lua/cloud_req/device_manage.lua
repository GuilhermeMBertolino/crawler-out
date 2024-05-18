module("cloud_req.device_manage", package.seeall)

local cloud_https = require "cloud_req.cloud_https"
local nixio = require "nixio"
local json  = require "luci.json"
local sys   = require "luci.sys"
local uci   = require "luci.model.uci"
local dbg   = require "luci.tools.debug"
local uci_r = uci.cursor()

function save_deviceFeatureInfo(info)
	local uci_r = require("luci.model.uci").cursor()
	local servicetype = "server"

    if not info or not info.tpfile_data then
    	--dbg.print("tpfile_data not found")
        return -1000
    end

	local httpinfo = {}
	httpinfo.method = "POST"
	httpinfo.path = "/common/v1/saveDeviceFeatureInfo"
	httpinfo.params = {}

	local basic_info = cloud_https.get_device_basicinfo()

	httpinfo.params.deviceId = basic_info.deviceId or ""
	httpinfo.params.model = basic_info.devModel or ""
	httpinfo.params.hwVer = basic_info.devHwVer or ""
	httpinfo.params.fwVer = basic_info.fwVer or ""
	httpinfo.params.deviceType = ""

	local req = {}
	local featureInfo = {}
	local FEATURE_INFO_VERSION = 1
	featureInfo.version = FEATURE_INFO_VERSION	    
	featureInfo.tpfile_data = info.tpfile_data
	req.deviceId = httpinfo.params.deviceId
	req.featureInfo = featureInfo

	local retrycount = 1
	local ret, data = cloud_https.cloud_https_getinfo_dispatch(servicetype, httpinfo, req, retrycount)

	-- connection error
	if ret ~= 0 then
		--dbg.print("save_deviceFeatureInfo: request error")
		return ret
	end

	if not data then
		--dbg.print("save_deviceFeatureInfo: response no data")
		return -1000
	end

	return data.error_code
end
