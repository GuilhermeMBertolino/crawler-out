local dbg = require "luci.tools.debug"
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
    local need_unbind = uci_r:get("cloud_config", "device_status", "need_unbind")
    if tonumber(need_unbind) == 1 then
	uci_r:set("cloud_config", "device_status", "need_unbind", "0")
    end
    uci_r:set("cloud_config", "device_status", "bind_status", "0")
    uci_r:commit("cloud_config")
    uci_r:delete_all("accountmgnt", "cloud_account")
    uci_r:commit("accountmgnt")	
    sys.call("echo 0 > %s" % {LOGIN_STATUS})

    return {}
end
