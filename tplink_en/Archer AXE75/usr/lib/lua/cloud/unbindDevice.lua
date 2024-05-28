local dbg = require "luci.tools.debug"
local fs  = require "luci.fs"
local sys = require "luci.sys"
local cloudError = require "cloud.cloud_error"
local uci = require "luci.model.uci"
local uci_r = uci.cursor()
local ERR_CODE = cloudError.ERR_CODE
local ERR_MSG = cloudError.ERR_MSG
local json = require "luci.json"
local CLOUD_TMP_DIR = "/tmp/cloud/"
local LOGIN_STATUS = CLOUD_TMP_DIR .. "login_status"

function run(data)
	-- remote online unbind need to stop avira service here.
	local accountid = uci_r:get("cloud_config", "device_status", "accountid") or 0

    local need_unbind = uci_r:get("cloud_config", "device_status", "need_unbind")
    if tonumber(need_unbind) == 1 then
		uci_r:set("cloud_config", "device_status", "need_unbind", "0")
    end
    uci_r:set("cloud_config", "device_status", "bind_status", "0")
    uci_r:commit_without_write_flash("cloud_config")

    if uci_r:get_profile("cloud", "https_client") ~= 1 then
        sys.call("echo 0 > %s" % {LOGIN_STATUS})
    end
    --change the cloud service
    if fs.isfile("/usr/sbin/cloud_changeService") then
        dofile("/usr/sbin/cloud_changeService")
    end

	-- add by wanghao, unbind avira service here.
	if nixio.fs.access("/etc/init.d/aviraservicemaster") then
		uci_r:set("avira", "info", "service", "stop")
		uci_r:commit_without_write_flash("avira")
		sys.fork_exec("/usr/sbin/report_upload_unbind '%s'" % {accountid})
		sys.fork_exec("/etc/init.d/aviraservicemaster start")
	end
	-- add end

	uci_r:delete_all("accountmgnt", "cloud_account")
	uci_r:commit("accountmgnt")

    return {["error_code"]=0}
end
