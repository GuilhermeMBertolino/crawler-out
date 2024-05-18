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
	local alias = data.params.alias
	dbg("alias" .. alias)
    uci_r:set("cloud_config", "info", "alias", alias)
	uci_r:commit("cloud_config")

    return {["error_code"]=0}
end
