module("cloud_req.cloud_account", package.seeall)


local cloud_https = require "cloud_req.cloud_https"
local json  = require "luci.json"
local sys   = require "luci.sys"
local dbg   = require "luci.tools.debug"
local accmgnt   = require "luci.model.accountmgnt"
local nixio = require "nixio"
local fs    = require "luci.fs"

local CLOUD_SETUP_TM_HOMECARE = "/usr/sbin/cloud_setupTMHomecare"

function bind_device_with_token(token)
	local uci_r = require("luci.model.uci").cursor()
	local servicetype = "server"

	if not token then
		return -1000
	end

	local httpinfo = {}
	httpinfo.method = "POST"
	httpinfo.path = "/common/v2/bind"
	httpinfo.params = {}

	local basic_info = cloud_https.get_device_basicinfo()

	httpinfo.params.deviceId = basic_info.deviceId or ""
	httpinfo.params.model = basic_info.devModel or ""
	httpinfo.params.hwVer = basic_info.devHwVer or ""
	httpinfo.params.fwVer = basic_info.fwVer or ""
	httpinfo.params.deviceType = ""

	local req = {}
	req.deviceId = httpinfo.params.deviceId
	req.accountManagerToken = token

	local retrycount = 1
	local ret, data = cloud_https.cloud_https_getinfo_dispatch(servicetype, httpinfo, req, retrycount)

	-- connection error
	if ret ~= 0 then 
		return ret
	end

	if not data then
		return -1000
	end

	if data.error_code == -20501 then
		--need connect cloud sdk first
		local cloud_sdk_status  = require "cloud_req.cloud_sdk_status"
		cloud_sdk_status.cloud_sendmsg()

		ret, data = cloud_https.cloud_https_getinfo_dispatch(servicetype, httpinfo, req, retrycount)

		-- connection error
		if ret ~= 0 then 
			return ret
		end

		if not data then
			return -1000
		end		
	end

	if data.error_code == 0 then
		if not data.result or not data.result.accountId then
			return -1000
		end

		local bind_status = uci_r:get("cloud_config", "device_status", "bind_status")
		local need_unbind = uci_r:get("cloud_config", "device_status", "need_unbind")
		local accountid = uci_r:get("cloud_config", "device_status", "accountid")
		if tonumber(bind_status) ~= 1 or tonumber(need_unbind) ~= 0 or accountid ~= data.result.accountId then
			uci_r:set("cloud_config", "device_status", "bind_status", "1")
			uci_r:set("cloud_config", "device_status", "need_unbind", "0")
			uci_r:set("cloud_config", "device_status", "accountid", data.result.accountId)
			uci_r:commit("cloud_config")

			if nixio.fs.access(CLOUD_SETUP_TM_HOMECARE) then
				uci_r:set("homecare", "tm_homecare", "enable", "on")
				uci_r:commit("homecare")
				sys.fork_exec(CLOUD_SETUP_TM_HOMECARE .. " forceOn")
			end
			
			--add by wanghao
			if nixio.fs.access("/etc/init.d/aviraservicemaster") then
				sys.fork_exec("/usr/sbin/report_upload_bind")
				sys.fork_exec("/etc/init.d/aviraservicemaster start")
			end
			--add end			
		end

		sys.call("touch /tmp/ifttt_allow_upload &")

		--change the cloud service
		if fs.isfile("/usr/sbin/cloud_changeService") then
			dofile("/usr/sbin/cloud_changeService")
		end
	end

	return data.error_code
end

function bind_device(token)
	return bind_device_with_token(token)
end

function unbind_device_with_token(token)
	local uci_r = require("luci.model.uci").cursor()
	local servicetype = "server"

	if not token then
		return -1000
	end

	local httpinfo = {}
	httpinfo.method = "POST"
	httpinfo.path = "/common/v2/unbind"
	httpinfo.params = {}

	local basic_info = cloud_https.get_device_basicinfo()

	httpinfo.params.deviceId = basic_info.deviceId or ""
	httpinfo.params.model = basic_info.devModel or ""
	httpinfo.params.hwVer = basic_info.devHwVer or ""
	httpinfo.params.fwVer = basic_info.fwVer or ""
	httpinfo.params.deviceType = ""

	local req = {}
	req.deviceId = httpinfo.params.deviceId
	req.accountManagerToken = token

	local retrycount = 1
	local ret, data = cloud_https.cloud_https_getinfo_dispatch(servicetype, httpinfo, req, retrycount)

	-- connection error
	if ret ~= 0 then 
		return ret
	end

	if not data then
		return -1000
	end

	local bind_status = uci_r:get("cloud_config", "device_status", "bind_status")
	local need_unbind = uci_r:get("cloud_config", "device_status", "need_unbind")
	local accountid = uci_r:get("cloud_config", "device_status", "accountid") or 0
	if data.error_code == 0 then
		if tonumber(bind_status) == 1 or tonumber(need_unbind) == 1 then
			uci_r:set("cloud_config", "device_status", "bind_status", "0")
			uci_r:set("cloud_config", "device_status", "need_unbind", "0")
			if nixio.fs.access("/etc/init.d/aviraservicemaster") then
				uci_r:set("avira", "info", "service", "stop")
				uci_r:commit_without_write_flash("avira")
			end
			uci_r:delete("cloud_config", "device_status", "accountid")
			uci_r:commit("cloud_config")

			if nixio.fs.access(CLOUD_SETUP_TM_HOMECARE) then
				sys.fork_exec(CLOUD_SETUP_TM_HOMECARE)
			end
			
			--add by wanghao
			if nixio.fs.access("/etc/init.d/aviraservicemaster") then
				sys.fork_exec("/usr/sbin/report_upload_unbind '%s'" % {accountid})
				sys.fork_exec("/etc/init.d/aviraservicemaster start")
			end
			--add end			
		end

		--just for being compatible with old ones
		local cloud_account = accmgnt.get_last_cloud_account()
		if cloud_account then
			uci_r:delete_all("accountmgnt", "cloud_account")
			uci_r:commit("accountmgnt")
		end

		sys.call("rm -rf /tmp/ifttt_allow_upload")

		--change the cloud service
		if fs.isfile("/usr/sbin/cloud_changeService") then
			dofile("/usr/sbin/cloud_changeService")
		end
	end
	return data.error_code
end

function unbind_device_with_accountname(account_name)
	local uci_r = require("luci.model.uci").cursor()
	local servicetype = "server"

	if not account_name then
		return -1000
	end

	local httpinfo = {}
	httpinfo.method = "POST"
	httpinfo.path = "/common/v1/unbindDevice"
	httpinfo.params = {}

	local basic_info = cloud_https.get_device_basicinfo()

	httpinfo.params.deviceId = basic_info.deviceId or ""
	httpinfo.params.model = basic_info.devModel or ""
	httpinfo.params.hwVer = basic_info.devHwVer or ""
	httpinfo.params.fwVer = basic_info.fwVer or ""
	httpinfo.params.deviceType = ""

	local req = {}
	req.deviceId = httpinfo.params.deviceId
	req.cloudUserName = account_name

	local retrycount = 1
	local ret, data = cloud_https.cloud_https_getinfo_dispatch(servicetype, httpinfo, req, retrycount)

	-- connection error
	if ret ~= 0 then 
		return ret
	end

	if not data then
		return -1000
	end

	local bind_status = uci_r:get("cloud_config", "device_status", "bind_status")
	local need_unbind = uci_r:get("cloud_config", "device_status", "need_unbind")
	local accountid = uci_r:get("cloud_config", "device_status", "accountid") or 0
	if data.error_code == 0 then
		if tonumber(bind_status) == 1 or tonumber(need_unbind) == 1 then
			uci_r:set("cloud_config", "device_status", "bind_status", "0")
			uci_r:set("cloud_config", "device_status", "need_unbind", "0")
			if nixio.fs.access("/etc/init.d/aviraservicemaster") then
				uci_r:set("avira", "info", "service", "stop")
				uci_r:commit_without_write_flash("avira")
			end
			uci_r:delete("cloud_config", "device_status", "accountid")
			uci_r:commit("cloud_config")

			if nixio.fs.access(CLOUD_SETUP_TM_HOMECARE) then
				sys.fork_exec(CLOUD_SETUP_TM_HOMECARE)
			end	

			--add by wanghao
			if nixio.fs.access("/etc/init.d/aviraservicemaster") then
				sys.fork_exec("/usr/sbin/report_upload_unbind '%s'" % {accountid})
				sys.fork_exec("/etc/init.d/aviraservicemaster start")
			end
			--add end			
		end

		--just for being compatible with old ones
		local cloud_account = accmgnt.get_last_cloud_account()
		if cloud_account then
			uci_r:delete_all("accountmgnt", "cloud_account")
			uci_r:commit("accountmgnt")
		end
		
		sys.call("rm -rf /tmp/ifttt_allow_upload")

		--change the cloud service
		if fs.isfile("/usr/sbin/cloud_changeService") then
			dofile("/usr/sbin/cloud_changeService")
		end
	end
	return data.error_code
end

function unbind_device_with_accountid(accountid)
	local uci_r = require("luci.model.uci").cursor()
	local servicetype = "server"

	if not accountid then
		return -1000
	end

	local httpinfo = {}
	httpinfo.method = "POST"
	httpinfo.path = "/common/v1/unbindDeviceWithAccountId"
	httpinfo.params = {}

	local basic_info = cloud_https.get_device_basicinfo()

	httpinfo.params.deviceId = basic_info.deviceId or ""
	httpinfo.params.model = basic_info.devModel or ""
	httpinfo.params.hwVer = basic_info.devHwVer or ""
	httpinfo.params.fwVer = basic_info.fwVer or ""
	httpinfo.params.deviceType = ""

	local req = {}
	req.deviceId = httpinfo.params.deviceId
	req.accountId = accountid

	local retrycount = 1
	local ret, data = cloud_https.cloud_https_getinfo_dispatch(servicetype, httpinfo, req, retrycount)

	-- connection error
	if ret ~= 0 then 
		return ret
	end

	if not data then
		return -1000
	end

	local bind_status = uci_r:get("cloud_config", "device_status", "bind_status")
	local need_unbind = uci_r:get("cloud_config", "device_status", "need_unbind")
	local accountid = uci_r:get("cloud_config", "device_status", "accountid") or 0
	if data.error_code == 0 then
		if tonumber(bind_status) == 1 or tonumber(need_unbind) == 1 then
			uci_r:set("cloud_config", "device_status", "bind_status", "0")
			uci_r:set("cloud_config", "device_status", "need_unbind", "0")
			if nixio.fs.access("/etc/init.d/aviraservicemaster") then
				uci_r:set("avira", "info", "service", "stop")
				uci_r:commit_without_write_flash("avira")
			end
			uci_r:delete("cloud_config", "device_status", "accountid")
			uci_r:commit("cloud_config")

			if nixio.fs.access(CLOUD_SETUP_TM_HOMECARE) then
				sys.fork_exec(CLOUD_SETUP_TM_HOMECARE)
			end	

			--add by wanghao
			if nixio.fs.access("/etc/init.d/aviraservicemaster") then
				sys.fork_exec("/usr/sbin/report_upload_unbind '%s'" % {accountid})
				sys.fork_exec("/etc/init.d/aviraservicemaster start")
			end
			--add end			
		end

		--just for being compatible with old ones
		local cloud_account = accmgnt.get_last_cloud_account()
		if cloud_account then
			uci_r:delete_all("accountmgnt", "cloud_account")
			uci_r:commit("accountmgnt")
		end

		sys.call("rm -rf /tmp/ifttt_allow_upload")

		--change the cloud service
		if fs.isfile("/usr/sbin/cloud_changeService") then
			dofile("/usr/sbin/cloud_changeService")
		end
	end
	return data.error_code
end

function unbind_device(token)
	local uci_r = require("luci.model.uci").cursor()
	local errcode

	if token then
		errcode = unbind_device_with_token(token)
	else
		local accountid = uci_r:get("cloud_config", "device_status", "accountid")
		if not accountid then
			--be compatible with old versions
			local users = accmgnt.get_cloudAccount()
			if users and #users ~= 0 then
				local account = users[1]
				accountid = account.accountid
			end
		end

		if accountid then	
			errcode = unbind_device_with_accountid(accountid)
		else
			local account_name = accmgnt.get_last_cloud_account()
			errcode = unbind_device_with_accountname(account_name)
		end
	end

	return errcode
end

function unbind_device_with_feinfo_token(token)
	local uci_r = require("luci.model.uci").cursor()
	local servicetype = "server"

	if not token then
		return -1000
	end

	local httpinfo = {}
	httpinfo.method = "POST"
	httpinfo.path = "/common/v2/unbindDeviceWithFeatureInfo"
	httpinfo.params = {}

	local basic_info = cloud_https.get_device_basicinfo()

	httpinfo.params.deviceId = basic_info.deviceId or ""
	httpinfo.params.model = basic_info.devModel or ""
	httpinfo.params.hwVer = basic_info.devHwVer or ""
	httpinfo.params.fwVer = basic_info.fwVer or ""
	httpinfo.params.deviceType = ""

	local req = {}
	req.deviceId = httpinfo.params.deviceId
	req.accountManagerToken = token

	local retrycount = 1
	local ret, data = cloud_https.cloud_https_getinfo_dispatch(servicetype, httpinfo, req, retrycount)

	-- connection error
	if ret ~= 0 then 
		return ret
	end

	if not data then
		return -1000
	end

	local bind_status = uci_r:get("cloud_config", "device_status", "bind_status")
	local need_unbind = uci_r:get("cloud_config", "device_status", "need_unbind")
	local accountid = uci_r:get("cloud_config", "device_status", "accountid") or 0
	if data.error_code == 0 then
		if tonumber(bind_status) == 1 or tonumber(need_unbind) == 1 then
			uci_r:set("cloud_config", "device_status", "bind_status", "0")
			uci_r:set("cloud_config", "device_status", "need_unbind", "0")
			if nixio.fs.access("/etc/init.d/aviraservicemaster") then
				uci_r:set("avira", "info", "service", "stop")
				uci_r:commit_without_write_flash("avira")
			end
			uci_r:delete("cloud_config", "device_status", "accountid")
			uci_r:commit("cloud_config")

			if nixio.fs.access(CLOUD_SETUP_TM_HOMECARE) then
				sys.fork_exec(CLOUD_SETUP_TM_HOMECARE)
			end	

			--add by wanghao
			if nixio.fs.access("/etc/init.d/aviraservicemaster") then
				sys.fork_exec("/usr/sbin/report_upload_unbind '%s'" % {accountid})
				sys.fork_exec("/etc/init.d/aviraservicemaster start")
			end
			--add end				
		end	
		
		--just for being compatible with old ones
		local cloud_account = accmgnt.get_last_cloud_account()
		if cloud_account then
			uci_r:delete_all("accountmgnt", "cloud_account")
			uci_r:commit("accountmgnt")
		end

		sys.call("rm -rf /tmp/ifttt_allow_upload")		
		
		--change the cloud service
		if fs.isfile("/usr/sbin/cloud_changeService") then
			dofile("/usr/sbin/cloud_changeService")
		end
	end
	return data.error_code
end

function unbind_device_with_feinfo_account(accountid, account_name)
	local uci_r = require("luci.model.uci").cursor()
	local servicetype = "server"

	if not accountid and not account_name then
		return -1000
	end

	local httpinfo = {}
	httpinfo.method = "POST"
	httpinfo.path = "/common/v1/unbindDeviceWithFeatureInfo"
	httpinfo.params = {}

	local basic_info = cloud_https.get_device_basicinfo()

	httpinfo.params.deviceId = basic_info.deviceId or ""
	httpinfo.params.model = basic_info.devModel or ""
	httpinfo.params.hwVer = basic_info.devHwVer or ""
	httpinfo.params.fwVer = basic_info.fwVer or ""
	httpinfo.params.deviceType = ""

	local req = {}
	req.deviceId = httpinfo.params.deviceId
	if accountid then
		req.accountId = accountid
	else
		req.cloudUserName = account_name
	end

	local retrycount = 1
	local ret, data = cloud_https.cloud_https_getinfo_dispatch(servicetype, httpinfo, req, retrycount)

	-- connection error
	if ret ~= 0 then 
		return ret
	end

	if not data then
		return -1000
	end

	local bind_status = uci_r:get("cloud_config", "device_status", "bind_status")
	local need_unbind = uci_r:get("cloud_config", "device_status", "need_unbind")
	local accountid = uci_r:get("cloud_config", "device_status", "accountid") or 0
	if data.error_code == 0 then
		if tonumber(bind_status) == 1 or tonumber(need_unbind) == 1 then
			uci_r:set("cloud_config", "device_status", "bind_status", "0")
			uci_r:set("cloud_config", "device_status", "need_unbind", "0")
			if nixio.fs.access("/etc/init.d/aviraservicemaster") then
				uci_r:set("avira", "info", "service", "stop")
				uci_r:commit_without_write_flash("avira")
			end
			uci_r:delete("cloud_config", "device_status", "accountid")
			uci_r:commit("cloud_config")

			if nixio.fs.access(CLOUD_SETUP_TM_HOMECARE) then
				sys.fork_exec(CLOUD_SETUP_TM_HOMECARE)
			end	

			--add by wanghao
			if nixio.fs.access("/etc/init.d/aviraservicemaster") then
				sys.fork_exec("/usr/sbin/report_upload_unbind '%s'" % {accountid})
				sys.fork_exec("/etc/init.d/aviraservicemaster start")
			end
			--add end				
		end

		--just for being compatible with old ones
		local cloud_account = accmgnt.get_last_cloud_account()
		if cloud_account then
			uci_r:delete_all("accountmgnt", "cloud_account")
			uci_r:commit("accountmgnt")
		end
		
		sys.call("rm -rf /tmp/ifttt_allow_upload")
		
		--change the cloud service
		if fs.isfile("/usr/sbin/cloud_changeService") then
			dofile("/usr/sbin/cloud_changeService")
		end
	end
	return data.error_code
end

function unbind_deviceWithFeatureInfo(token)
	local uci_r = require("luci.model.uci").cursor()
	local errcode

	if token then
		errcode = unbind_device_with_feinfo_token(token)
	else
		local accountid = uci_r:get("cloud_config", "device_status", "accountid")
		if not accountid then
			--be compatible with old versions
			local users = accmgnt.get_cloudAccount()
			if users and #users ~= 0 then
				local account = users[1]
				accountid = account.accountid
			end
		end

		if accountid then	
			errcode = unbind_device_with_feinfo_account(accountid, nil)
		else
			local account_name = accmgnt.get_last_cloud_account()
			errcode = unbind_device_with_feinfo_account(nil, account_name)
		end
	end

	return errcode
end

function check_bind(token)
	local uci_r = require("luci.model.uci").cursor()
	local servicetype = "server"

	if not token then
		return -1000
	end

	local httpinfo = {}
	httpinfo.method = "POST"
	httpinfo.path = "/common/v2/checkDeviceBindStatus"
	httpinfo.params = {}

	local basic_info = cloud_https.get_device_basicinfo()

	httpinfo.params.deviceId = basic_info.deviceId or ""
	httpinfo.params.model = basic_info.devModel or ""
	httpinfo.params.hwVer = basic_info.devHwVer or ""
	httpinfo.params.fwVer = basic_info.fwVer or ""
	httpinfo.params.deviceType = ""

	local req = {}
	req.deviceId = httpinfo.params.deviceId
	req.accountManagerToken = token

	local retrycount = 1
	local ret, data = cloud_https.cloud_https_getinfo_dispatch(servicetype, httpinfo, req, retrycount)

	-- connection error
	if ret ~= 0 then 
		return ret
	end

	if not data then
		return -1000
	end

	local bind_status = uci_r:get("cloud_config", "device_status", "bind_status")
	local need_unbind = uci_r:get("cloud_config", "device_status", "need_unbind")
	local accountid = uci_r:get("cloud_config", "device_status", "accountid") or 0
	if data.error_code == 0 then --bind check ok
		if not data.result or not data.result.accountId then
			return -1000
		end

		local commit = false
		if tonumber(bind_status) ~= 1 and tonumber(need_unbind) ~= 1 then
			uci_r:set("cloud_config", "device_status", "bind_status", "1")

			if nixio.fs.access(CLOUD_SETUP_TM_HOMECARE) then
				uci_r:set("homecare", "tm_homecare", "enable", "on")
				uci_r:commit("homecare")				
				sys.fork_exec(CLOUD_SETUP_TM_HOMECARE .. " forceOn")
			end	

			--add by wanghao
			if nixio.fs.access("/etc/init.d/aviraservicemaster") then
				sys.fork_exec("/usr/sbin/report_upload_bind")
				sys.fork_exec("/etc/init.d/aviraservicemaster start")
			end
			--add end
		
			commit = true
		end

		if accountid ~= data.result.accountId then
			uci_r:set("cloud_config", "device_status", "accountid", data.result.accountId)
			commit = true
		end

		if commit == true then
			uci_r:commit("cloud_config")
		end		
	elseif data.error_code == -20507 then --not bind
		if tonumber(bind_status) == 1 or tonumber(need_unbind) == 1 then
			uci_r:set("cloud_config", "device_status", "bind_status", "0")
			uci_r:set("cloud_config", "device_status", "need_unbind", "0")
			if nixio.fs.access("/etc/init.d/aviraservicemaster") then
				uci_r:set("avira", "info", "service", "stop")
				uci_r:commit_without_write_flash("avira")
			end
			uci_r:delete("cloud_config", "device_status", "accountid")
			uci_r:commit("cloud_config")

			if nixio.fs.access(CLOUD_SETUP_TM_HOMECARE) then
				sys.fork_exec(CLOUD_SETUP_TM_HOMECARE)
			end	

			--add by wanghao
			if nixio.fs.access("/etc/init.d/aviraservicemaster") then
				sys.fork_exec("/usr/sbin/report_upload_unbind '%s'" % {accountid})
				sys.fork_exec("/etc/init.d/aviraservicemaster start")
			end
			--add end			
		end

		--just for being compatible with old ones
		local cloud_account = accmgnt.get_last_cloud_account()
		if cloud_account then
			uci_r:delete_all("accountmgnt", "cloud_account")
			uci_r:commit("accountmgnt")
		end
	end

	return data.error_code
end

function check_bind_status()
	local uci_r = require("luci.model.uci").cursor()
	local servicetype = "server"

	local httpinfo = {}
	httpinfo.method = "POST"
	httpinfo.path = "/common/v1/checkIsBinded"
	httpinfo.params = {}

	local basic_info = cloud_https.get_device_basicinfo()

	httpinfo.params.deviceId = basic_info.deviceId or ""
	httpinfo.params.model = basic_info.devModel or ""
	httpinfo.params.hwVer = basic_info.devHwVer or ""
	httpinfo.params.fwVer = basic_info.fwVer or ""
	httpinfo.params.deviceType = ""

	local req = {}
	req.deviceId = httpinfo.params.deviceId

	local retrycount = 1
	local ret, data = cloud_https.cloud_https_getinfo_dispatch(servicetype, httpinfo, req, retrycount)

	-- connection error
	if ret ~= 0 then
		return ret
	end

	if not data then
		return -1000
	end

	if data.error_code == 0 then
		local bind_status = uci_r:get("cloud_config", "device_status", "bind_status")
		local need_unbind = uci_r:get("cloud_config", "device_status", "need_unbind")
		local accountid = uci_r:get("cloud_config", "device_status", "accountid") or 0

		-- 1) if device is not binded according to cloud server, just clear the local info
		-- 2) if device is binded according to cloud server, just fresh the bind status
		if data.result.isBinded == false then
			if tonumber(bind_status) == 1 or tonumber(need_unbind) == 1 then
				uci_r:set("cloud_config", "device_status", "bind_status", "0")
				uci_r:set("cloud_config", "device_status", "need_unbind", "0")
				if nixio.fs.access("/etc/init.d/aviraservicemaster") then
					uci_r:set("avira", "info", "service", "stop")
					uci_r:commit_without_write_flash("avira")
				end
				uci_r:delete("cloud_config", "device_status", "accountid")
				uci_r:commit("cloud_config")

				if nixio.fs.access(CLOUD_SETUP_TM_HOMECARE) then
					sys.fork_exec(CLOUD_SETUP_TM_HOMECARE)
				end	

				--add by wanghao
				if nixio.fs.access("/etc/init.d/aviraservicemaster") then
					sys.fork_exec("/usr/sbin/report_upload_unbind '%s'" % {accountid})
					sys.fork_exec("/etc/init.d/aviraservicemaster start")
				end
				--add end				
			end

			--just for being compatible with old ones
			local cloud_account = accmgnt.get_last_cloud_account()
			if cloud_account then
				uci_r:delete_all("accountmgnt", "cloud_account")
				uci_r:commit("accountmgnt")
			end
		else
			if tonumber(bind_status) ~= 1 and tonumber(need_unbind) ~= 1 then
				uci_r:set("cloud_config", "device_status", "bind_status", "1")
				uci_r:commit("cloud_config")

				if nixio.fs.access(CLOUD_SETUP_TM_HOMECARE) then
					uci_r:set("homecare", "tm_homecare", "enable", "on")
					uci_r:commit("homecare")					
					sys.fork_exec(CLOUD_SETUP_TM_HOMECARE .. " forceOn")
					
					--add by wanghao
					if nixio.fs.access("/etc/init.d/aviraservicemaster") then
						sys.fork_exec("/usr/sbin/report_upload_bind")
						sys.fork_exec("/etc/init.d/aviraservicemaster start")
					end
					--add end					
				end				
			end
		end
	else
		return data.error_code
	end

	if not data.result then
		return -1000
	end

	local ret_data={}
	ret_data.isBinded = data.result.isBinded
	
	return data.error_code, ret_data
end

function update_alias(alias)
	local uci_r = require("luci.model.uci").cursor()
	local servicetype = "server"

	if not alias then
		return -1000
	end

	local httpinfo = {}
	httpinfo.method = "POST"
	httpinfo.path = "/common/v1/updateAlias"
	httpinfo.params = {}

	local basic_info = cloud_https.get_device_basicinfo()

	httpinfo.params.deviceId = basic_info.deviceId or ""
	httpinfo.params.model = basic_info.devModel or ""
	httpinfo.params.hwVer = basic_info.devHwVer or ""
	httpinfo.params.fwVer = basic_info.fwVer or ""
	httpinfo.params.deviceType = ""

	local req = {}
	req.deviceId = httpinfo.params.deviceId
	req.alias = alias

	local retrycount = 1
	local ret, data = cloud_https.cloud_https_getinfo_dispatch(servicetype, httpinfo, req, retrycount)

	-- connection error
	if ret ~= 0 then 
		return ret
	end

	if not data then
		return -1000
	end

	local conf_alias = uci_r:get("cloud_config", "info", "alias")
	if data.error_code == 0 and conf_alias ~= alias then
		uci_r:set("cloud_config", "info", "alias", alias)
		uci_r:commit("cloud_config")	
	end

	return data.error_code
end

function remove_deviceUser(token)
	local servicetype = "server"

	if not token then
		return -1000
	end

	local httpinfo = {}
	httpinfo.method = "POST"
	httpinfo.path = "/common/v2/removeDeviceUser"
	httpinfo.params = {}

	local basic_info = cloud_https.get_device_basicinfo()

	httpinfo.params.deviceId = basic_info.deviceId or ""
	httpinfo.params.model = basic_info.devModel or ""
	httpinfo.params.hwVer = basic_info.devHwVer or ""
	httpinfo.params.fwVer = basic_info.fwVer or ""
	httpinfo.params.deviceType = ""

	local req = {}
	req.deviceId = httpinfo.params.deviceId
	req.accountManagerToken = token

	local retrycount = 1
	local ret, data = cloud_https.cloud_https_getinfo_dispatch(servicetype, httpinfo, req, retrycount)

	-- connection error
	if ret ~= 0 then 
		return ret
	end

	if not data then
		return -1000
	end

	return data.error_code
end


function get_accountRole(token)
	local uci_r = require("luci.model.uci").cursor()
	local servicetype = "server"

	if not token then
		return -1000
	end

	local httpinfo = {}
	httpinfo.method = "POST"
	httpinfo.path = "/common/v2/getUserRole"
	httpinfo.params = {}

	local basic_info = cloud_https.get_device_basicinfo()

	httpinfo.params.deviceId = basic_info.deviceId or ""
	httpinfo.params.model = basic_info.devModel or ""
	httpinfo.params.hwVer = basic_info.devHwVer or ""
	httpinfo.params.fwVer = basic_info.fwVer or ""
	httpinfo.params.deviceType = ""

	local req = {}
	req.deviceId = httpinfo.params.deviceId
	req.accountManagerToken = token

	local retrycount = 1
	local ret, data = cloud_https.cloud_https_getinfo_dispatch(servicetype, httpinfo, req, retrycount)

	-- connection error
	if ret ~= 0 then 
		return ret
	end

	if not data then
		return -1000
	end

	if data.error_code ~= 0 then
		return data.error_code
	end

	if not data.result then
		return -1000
	end

	-- if account role is owner or user, the device must be bound to some account
	if data.result.role == 0 or data.result.role == 1 then
		local bind_status = uci_r:get("cloud_config", "device_status", "bind_status")
		local need_unbind = uci_r:get("cloud_config", "device_status", "need_unbind")
		if tonumber(bind_status) ~= 1 and tonumber(need_unbind) ~= 1 then
			uci_r:set("cloud_config", "device_status", "bind_status", "1")
			uci_r:commit("cloud_config")

			if nixio.fs.access(CLOUD_SETUP_TM_HOMECARE) then
				uci_r:set("homecare", "tm_homecare", "enable", "on")
				uci_r:commit("homecare")				
				sys.fork_exec(CLOUD_SETUP_TM_HOMECARE .. " forceOn")
			end	

			--add by wanghao
			if nixio.fs.access("/etc/init.d/aviraservicemaster") then
				sys.fork_exec("/usr/sbin/report_upload_bind")
				sys.fork_exec("/etc/init.d/aviraservicemaster start")
			end
			--add end
		
		end
	end

	local ret_data={}
	ret_data.role = data.result.role

	return data.error_code, ret_data
end
