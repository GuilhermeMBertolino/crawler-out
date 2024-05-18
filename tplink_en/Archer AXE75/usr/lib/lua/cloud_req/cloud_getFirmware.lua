--[[
copyright(c) 2017-2022 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  cloud_getFirmware.lua
Details :  get firmware from tp-link cloud server. 
Author  :  Zeng Wei <zengwei@tp-link.com.cn>
Version :  1.0.0
Date    :  26 Jan, 2018
]]--

module("cloud_req.cloud_getFirmware", package.seeall)

local cloud_https = require "cloud_req.cloud_https"
local uci = require("luci.model.uci")
local dbg   = require "luci.tools.debug"

function get_fwlist(retrycount)
	local uci_r = uci.cursor()
	local servicetype = "server"

	local httpinfo = {}
	httpinfo.method = "POST"
	httpinfo.path = "/common/v1/getSecureIntlFwList"
	httpinfo.params = {}

	local basic_info = cloud_https.get_device_basicinfo()

	httpinfo.params.deviceId = basic_info.deviceId or ""
	httpinfo.params.model = basic_info.devModel or ""
	httpinfo.params.hwVer = basic_info.devHwVer or ""
	httpinfo.params.fwVer = basic_info.fwVer or ""
	httpinfo.params.deviceType = ""

	local req = {}
	req.deviceId = httpinfo.params.deviceId
	req.fwId = basic_info.fwId or ""
	req.hwId = basic_info.hwId or ""
	req.oemId = basic_info.oemId or ""
	req.devFwCurrentVer = basic_info.devFwVer or ""
	req.locale = uci_r:get("locale", "sysinfo", "locale") or "en_US"

	local ret, data = cloud_https.cloud_https_getinfo_dispatch(servicetype, httpinfo, req, retrycount)

	-- connection error
	if ret ~= 0 then 
		return false, ret
	end

	if not data then
		return false, -1000
	end

	-- handler service error code 
	if data.error_code ~= 0 then 
		return false, data.error_code
	end

	local fw = nil
	function checkFwVersion(fw1, fw2)
		if fw1 == nil or fw1.fwVer == nil then return true end
		if fw2 == nil then return false end

		local plat1, major1, minor1, date1, stamp1 = string.match(fw1.fwVer, "(%d+).(%d+).(%d+) Build (%d+) rel.(%d+)")
		local plat2, major2, minor2, date2, stamp2 = string.match(fw2.fwVer, "(%d+).(%d+).(%d+) Build (%d+) rel.(%d+)")

		if plat2 ~= plat1  then return false end
		if major2 > major1 then return true end
		if major2 < major1 then return false end
		if minor2 > minor1 then return true end
		if minor2 < minor1 then return false end
		if date2  > date1  then return true end
		if date2  < date1  then return false end
		if stamp2 > stamp1 then return true end
		if stamp2 < stamp1 then return false end

		return false
	end

	for i,v in ipairs(data.result.fwList) do
		if checkFwVersion(fw, v) then
			fw = {}
			fw.fwType= v.fwType or ""
			fw.fwVer = v.fwVer or ""
			fw.fwReleaseDate = v.fwReleaseDate or ""
			fw.fwUrl = v.fwSecureUrl or ""
			fw.fwReleaseLog = v.fwReleaseLog or ""
			fw.fwReleaseLogUrl = v.fwReleaseLogUrl or ""
			fw.fwLocation = v.fwLocation or ""
			fw.fwTitle = v.fwTitle or ""

			fw.fwReleaseLog = string.gsub(fw.fwReleaseLog,"\n","\\n")
		end
	end

	local commit = false
	if fw == nil then
		fw = {}
	else
		uci_r:set("cloud_config", "upgrade_info", "type", fw.fwType)
		uci_r:set("cloud_config", "upgrade_info", "version", fw.fwVer)
		uci_r:set("cloud_config", "upgrade_info", "release_date", fw.fwReleaseDate)
		uci_r:set("cloud_config", "upgrade_info", "download_url", fw.fwUrl)
		uci_r:set("cloud_config", "upgrade_info", "release_log", fw.fwReleaseLog)
		uci_r:set("cloud_config", "upgrade_info", "release_log_url", fw.fwReleaseLogUrl)
		uci_r:set("cloud_config", "upgrade_info", "location", fw.fwLocation)
		uci_r:set("cloud_config", "upgrade_info", "fw_title", fw.fwTitle)
		uci_r:set("cloud_config", "new_firmware", "fw_new_notify", "1")
		uci_r:set("cloud_config", "new_firmware", "notify_time", os.time())

		if "3" == uci_r.get("cloud_config", "info", "tcsp_status") then
			uci_r:set("cloud_config", "upgrade_info", "type", "3")
		end
		commit = true
	end

	local need_checkupgrade = uci_r:get("cloud_config", "device_status", "need_checkupgrade")
	if tonumber(need_checkupgrade) == 1 then
		uci_r:set("cloud_config", "device_status", "need_checkupgrade", "0")
		commit = true
	end

	if commit == true then
		uci_r:commit("cloud_config") --firmware info updating time will commit every time
	end

	dofile("/lib/wportal/clear_upgrade.lua")

	return fw
end

function download_firmware(download_path, retrycount)
	local uci_r = uci.cursor()
	local ret, data
	local basic_info = cloud_https.get_device_basicinfo()

	local urlparams = {}
	urlparams.id    = basic_info.deviceId or ""
	urlparams.name  = basic_info.deviceName or ""
	urlparams.hwId = basic_info.hwId or ""
	urlparams.fwId  = basic_info.fwId or ""
	urlparams.model = basic_info.devModel or ""
	urlparams.mac = basic_info.deviceMac or ""
	urlparams.hwVer = basic_info.devHwVer or ""
	urlparams.oemId = basic_info.oemId or ""
	urlparams.fwVer = basic_info.fwVer or ""

	local httpinfo = {}
	httpinfo.url = uci_r:get("cloud_config", "upgrade_info", "download_url")
	if not httpinfo.url then
		--no download url and just return true
		--dbg.print("cloud https download url for firmware null") 
		return true
	end
		
	local url_parapart = nil
	for k, v in pairs(urlparams) do
		if url_parapart then
			url_parapart = "%s&%s=%s" % {url_parapart, k, v}
		else
			url_parapart = "%s=%s" % {k, v}
		end
	end

	if url_parapart then
		--httpinfo.url is from cloud server and no need to resolve
		httpinfo.url = "%s&%s" % {httpinfo.url, cloud_https.url_escape(url_parapart)}
	end

	local req = nil
	ret, data = cloud_https.cloud_https_download_dispatch("spec", httpinfo, req, download_path, retrycount)

	--dbg(ret)
	--dbg(data.err_code)
	--dbg(data.http_scode)

	-- connection error
	if ret ~= 0 then
		--dbg.print("cloud https download connection failed: " .. ret) 
		return false, ret
	end

	if not data then
		return false, -1000
	end
	
	-- handler err_code by http status code
	if data.http_scode ~= 200 then
		--dbg.print("cloud https status failed: " .. data.http_scode) 
		return false, data.http_scode
	end

	return true
end
