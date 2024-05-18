local uci = require "luci.model.uci"

local uci_r = uci.cursor()

local function TrimStr(str)
    --local tmpstr = string.upper(str)
    local tmpstr = str
	
	if tmpstr == nil then
		str = ""
	else
		tmpstr = string.gsub(tmpstr, "-", "")
		str = string.match(tmpstr, "%w+")
		str = str:upper()
	end
	
    return str
end
 
function run()
    local sys = require "luci.sys"
    local accountmgnt = require "luci.model.accountmgnt"
    local tbl = {}
    local devInfo = {}
    local alias = uci_r:get("cloud_config", "info", "alias") or ""

    devInfo.deviceMac = TrimStr(sys.exec("getfirm MAC"))                 
    devInfo.deviceId = TrimStr(sys.exec("getfirm DEV_ID"))
    devInfo.hwId = TrimStr(sys.exec("getfirm HW_ID"))
    devInfo.fwId = TrimStr(sys.exec("getfirm FW_ID"))
    devInfo.deviceName = string.gsub(sys.exec("getfirm MODEL"), "%c", "")
    devInfo.deviceModel = devInfo.deviceName
    devInfo.deviceHwVer = string.gsub(sys.exec("getfirm HARDVERSION"), "%c", "")
    devInfo.fwVer = string.gsub(sys.exec("getfirm SOFTVERSION"), "%c", "")
    devInfo.alias = alias
    devInfo.tcspVer = "1.1"
    devInfo.cloudUserName = accountmgnt.get_last_cloud_account() or "" 
    devInfo.oemId = TrimStr(sys.exec("getfirm OEM_ID"))
    
    tbl.method = "helloCloud"
    tbl.params = devInfo
    return tbl
end
