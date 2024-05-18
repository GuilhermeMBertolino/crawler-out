module("cloud_req.cloud_account", package.seeall)

local cloud = require "cloud_req.cloud_comm"
local json  = require "luci.json"
local sys   = require "luci.sys"
local uci   = require "luci.model.uci"
local dbg   = require "luci.tools.debug"
local accmgnt   = require "luci.model.accountmgnt"
local nixio = require "nixio"
local uci_r = uci.cursor()
local CLOUD_TMP_DIR = "/tmp/cloud/"
local LOGIN_STATUS = CLOUD_TMP_DIR .. "login_status"

function bind_device(cloudUserName, cloudPassword)
	local req = {}
	req.params = {}

	req.method = "bindDevice"
	req.params.deviceId = cloud.TrimStr(sys.exec("getfirm DEV_ID"))
	req.params.cloudUserName = cloudUserName
	req.params.cloudPassword = cloudPassword

	local re, data = cloud.send_request_sync(req, 5000, 1)

	-- connection error
	if re ~= 0 then return re end

	if data.error_code == 0 then 
		uci_r:set("cloud_config", "device_status", "bind_status", "1")
		accmgnt.set_cloudAccount(cloudUserName, cloudPassword)
		uci_r:commit("cloud_config")
	end
	return data.error_code
end

function unbind_device(cloudUserName)
	local req = {}
	req.params = {}

	req.method = "unbindDevice"
	req.params.deviceId = cloud.TrimStr(sys.exec("getfirm DEV_ID"))
	
	if cloudUserName and cloudUserName ~= "" then
		req.params.cloudUserName = cloudUserName
	else
		local accountmgnt = require "luci.model.accountmgnt"
		cloudUserName = accountmgnt.get_last_cloud_account()
		if not cloudUserName then 
			return false 
		end
		req.params.cloudUserName = cloudUserName
	end

	local re, data = cloud.send_request_sync(req, 5000, 1)

	-- connection error
	if re ~= 0 then return re end

	if data.error_code == 0 then
		uci_r:set("cloud_config", "device_status", "bind_status", "0")
		uci_r:set("cloud_config", "device_status", "need_unbind", "0")
		uci_r:commit("cloud_config")
		uci_r:delete_all("accountmgnt", "cloud_account")
		uci_r:commit("accountmgnt")	
		sys.call("echo 0 > %s" % {LOGIN_STATUS})
	end
	return data.error_code
end

function account_login(cloudUserName, cloudPassword)
	local req = {}
	req.params = {}

	req.method = "deviceAccountLogin"
	req.params.deviceId = cloud.TrimStr(sys.exec("getfirm DEV_ID"))
	req.params.cloudUserName = cloudUserName
	req.params.cloudPassword = cloudPassword

	local re, data = cloud.send_request_sync(req, 5000, 1)

	-- connection error
	if re ~= 0 then return re end
	
	if data.error_code == 0 then
		if not nixio.fs.access(CLOUD_TMP_DIR) then
			sys.call("mkdir -p %s" % {CLOUD_TMP_DIR})
		end
		sys.call("echo 1 > %s" % {LOGIN_STATUS})
		uci_r:set("cloud_config", "login", "username", cloudUserName)
		uci_r:set("cloud_config", "login", "role", data.result.role)
		if data.result.role == 0 and  cloudPassword ~= accmgnt.get_password(cloudUserName) then 
			accmgnt.set_cloudAccount(cloudUserName, cloudPassword)
		end
		uci_r:commit("cloud_config")	
	end

	return data.error_code
end

function get_accountInfo(cloudUserName)
	local req = {}
	req.params = {}

	req.method = "getAccountInfo"
	req.params.cloudUserName = cloudUserName

	local re, data = cloud.send_request_sync(req, 5000, 1)

	-- connection error
	if re ~= 0 then return re end

	if data.error_code == 0 then
		uci_r:set("cloud_config", "login", "nickname", data.result.nickname)
		uci_r:set("cloud_config", "login", "regTime", data.result.regTime)
		uci_r:set("cloud_config", "login", "username", data.result.email)
		uci_r:commit("cloud_config")	
	end
	return data.error_code
end

function update_alias(alias)
	local req = {}
	req.params = {}

	req.method = "updateAlias"
	req.params.alias = alias
	req.params.deviceId = cloud.TrimStr(sys.exec("getfirm DEV_ID"))

	local re, data = cloud.send_request_sync(req, 5000, 1)

	-- connection error
	if re ~= 0 then return re end
	if data.error_code == 0 then
		uci_r:set("cloud_config", "info", "alias", alias)
		uci_r:commit("cloud_config")	
	end

	return data.error_code
end

function remove_deviceUser(ownerAccount, userAccount)
	local req = {}
	req.params = {}

	req.method = "removeDeviceUser"
	req.params.ownerAccount = ownerAccount
	req.params.userAccount = userAccount
	req.params.deviceId = cloud.TrimStr(sys.exec("getfirm DEV_ID"))

	local re, data = cloud.send_request_sync(req, 5000, 1)

	-- connection error
	if re ~= 0 then return re end

	return data.error_code
end