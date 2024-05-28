local uci = require "luci.model.uci"

local uci_r = uci.cursor()

local function TrimStr(str)    
    str = str or ""
	
	if str ~= "" then
		local tmpstr = string.gsub(str, "-", "") or ""
		str = string.match(tmpstr, "%w+") or ""
		str = string.upper(str) or ""
	end
	
    return str
end
 
function run()
    local sys = require "luci.sys"
    local accountmgnt = require "luci.model.accountmgnt"
    local cloud = require "cloud_req.cloud_comm"
    local tbl = {}
    local devInfo = {}
    local alias = uci_r:get("cloud_config", "info", "alias") or ""
    local tmpInfo = cloud.get_device_model_ver()

    devInfo.deviceMac = TrimStr(sys.exec("getfirm MAC"))                 
    devInfo.deviceId = TrimStr(sys.exec("getfirm DEV_ID"))
    devInfo.hwId = TrimStr(sys.exec("getfirm HW_ID"))
    devInfo.fwId = TrimStr(sys.exec("getfirm FW_ID"))
    devInfo.deviceName = string.gsub(sys.exec("getfirm MODEL"), "%c", "")
    devInfo.deviceModel = tmpInfo.device_model  
    devInfo.deviceHwVer = tmpInfo.hard_ver
    devInfo.fwVer = string.gsub(sys.exec("getfirm SOFTVERSION"), "%c", "")
    devInfo.alias = alias
    devInfo.tcspVer = "1.1"
    if uci_r:get_profile("cloud", "https_client") ~= 1 then
        devInfo.cloudUserName = ""
    else
        devInfo.cloudUserName = accountmgnt.get_last_cloud_account() or ""
    end
    devInfo.oemId = TrimStr(sys.exec("getfirm OEM_ID"))
    
    tbl.method = "helloCloud"
    tbl.params = devInfo
    return tbl
end
