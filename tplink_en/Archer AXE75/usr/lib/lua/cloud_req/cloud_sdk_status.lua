module("cloud_req.cloud_sdk_status", package.seeall)

local cloud = require "cloud_req.cloud_comm"
local dbg   = require "luci.tools.debug"
local sys   = require "luci.sys"

function cloud_sendmsg()
	--getNewDeviceTokenWithServices is comfortable to be sent to cloud server from sdk,
	--which is used for testing connection or other
	local req = {}
	req.method = "getIntlFwList"
	req.params = {}
	req.params.hwId = cloud.TrimStr(sys.exec("getfirm HW_ID"))
	--req.params.fwId = cloud.TrimStr(sys.exec("getfirm FW_ID"))
	--req.params.oemId = cloud.TrimStr(sys.exec("getfirm OEM_ID"))

	local re, data = cloud.send_request_sync(req, 5000, 1)

	return re, data
end

function test_cloud_connection()
	local re, data = cloud_sendmsg()

	-- connection error
	if re ~= 0 then
		return false
	end

	return true
end

