--[[
Copyright(c) 2008-2016 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  feedback.lua
Details :  mail users' problem.
Author  :  Zhang Mingce <zhangmingce@tp-link.net>
Version :  1.0.0
Date    :  30 May, 2016
]]--
module("luci.controller.admin.feedback", package.seeall)

local ctl = require "luci.model.controller"
local dbg = require "luci.tools.debug"
local uci_r = require ("luci.model.uci").cursor()
local util = require "luci.util"
local sys = require "luci.sys"
local email = require "luci.model.email"
local mime = require "mime"
local ltn12 = require "luci.ltn12"
local cry = require "luci.model.crypto"
local configtool = require "luci.sys.config"
local nixio = require "nixio"
local accmgnt   = require "luci.model.accountmgnt"
local firmware  = require "luci.controller.admin.firmware"

local result1 = os.execute("nvrammanager -s | grep default-config2 >/dev/null 2>&1")
local result2 = os.execute("nvrammanager -s | grep user-config2 >/dev/null 2>&1")

local FEEDBACK     = "feedback"
local ACCCFG       = "accountmgnt"
local BACKUP_TMP   = "/tmp/backup"
local SEND_ADDRESS = "supportui@tp-link.com"

local support_address = {
	["0B"] = "support@tp-link.com",
	["0E"] = "support@tp-link.com",
	["0W"] = "support@tp-link.com",
	["AE"] = "support.me@tp-link.com",
	["AR"] = "soporte.ar@tp-link.com",
	["AT"] = "support.de@tp-link.com",
	["AU"] = "support.au@tp-link.com",
	["BD"] = "support@tp-link.com",
	["BE"] = "support.nl@tp-link.com",
	["BG"] = "support@tp-link.com",
	["BR"] = "soporte.ar@tp-link.com",
	["BH"] = "support@tp-link.com",
	["BY"] = "support.ru@tp-link.com",
	["CA"] = "support.ca@tp-link.com",
	["CH"] = "support.ch@tp-link.com",
	["CL"] = "soporte.ar@tp-link.com",
	["CN"] = "fae@tp-link.com.cn",
	["CO"] = "support.co@tp-link.com",
	["CY"] = "support@tp-link.com",
	["CZ"] = "support.cz@tp-link.com",
	["DE"] = "support.de@tp-link.com",
	["DK"] = "support@tp-link.com",
	["DZ"] = "support@tp-link.com",
	["EC"] = "support@tp-link.com",
	["EE"] = "support@tp-link.com",
	["EG"] = "support.me@tp-link.com",
	["ES"] = "support.es@tp-link.com",
	["EU"] = "support@tp-link.com",
	["FI"] = "support@tp-link.com",
	["FJ"] = "support@tp-link.com",
	["FR"] = "support.fr@tp-link.com",
	["GB"] = "support.uk@tp-link.com",
	["GR"] = "support@tp-link.com",
	["HK"] = "support@tp-link.com",
	["HQ"] = "support@tp-link.com",
	["HU"] = "support@tp-link.com",
	["ID"] = "support.id@tp-link.com",
	["IE"] = "support.ie@tp-link.com",
	["IL"] = "support@tp-link.com",
	["IN"] = "support.in@tp-link.com",
	["IQ"] = "support@tp-link.com",
	["IR"] = "support.ir@tp-link.com",
	["IT"] = "support.it@tp-link.com",
	["JO"] = "support@tp-link.com",
	["JP"] = "support@tp-link.com",
	["KR"] = "support.kr@tp-link.com",
	["KW"] = "support@tp-link.com",
	["KZ"] = "support.kz@tp-link.com",
	["LB"] = "support@tp-link.com",
	["LK"] = "support@tp-link.com",
	["LT"] = "support@tp-link.com",
	["LV"] = "support@tp-link.com",
	["LY"] = "support@tp-link.com",
	["MA"] = "support@tp-link.com",
	["MO"] = "support@tp-link.com",
	["MU"] = "support@tp-link.com",
	["MX"] = "support.mx@tp-link.com",
	["MY"] = "support.my@tp-link.com",
	["NG"] = "support@tp-link.com",
	["NL"] = "support.nl@tp-link.com",
	["NO"] = "support@tp-link.com",
	["NZ"] = "support.nz@tp-link.com",
	["OM"] = "support@tp-link.com",
	["PE"] = "support.mx@tp-link.com",
	["PG"] = "support.anz@tp-link.com",
	["PH"] = "support@tp-link.com",
	["PL"] = "support.pl@tp-link.com",
	["PT"] = "suporte.pt@tp-link.com",
	["QA"] = "support@tp-link.com",
	["RO"] = "support.ro@tp-link.com",
	["RU"] = "support.ru@tp-link.com",
	["SA"] = "support@tp-link.com",
	["SE"] = "support@tp-link.com",
	["SG"] = "support.sg@tp-link.com",
	["SK"] = "support@tp-link.com",
	["TH"] = "support@tp-link.com",
	["TN"] = "support@tp-link.com",
	["TR"] = "support.tr@tp-link.com",
	["TW"] = "support.tw@tp-link.com",
	["UA"] = "support.ua@tp-link.com",
	["UK"] = "support.uk@tp-link.com",
	["UN"] = "support@tp-link.com",
	["US"] = "support.usa@tp-link.com",
	["VE"] = "rma.ve@tp-link.com",
	["VN"] = "support.vn@tp-link.com",
	["YE"] = "support@tp-link.com",
	["ZA"] = "support@tp-link.com"
}

function md5_product_name()
    local configtool = require "luci.sys.config"
    local product_name = configtool.getsysinfo("product_name") or ""
    local product_name_file = io.open("/tmp/product_name", "w")
    product_name_file:write(product_name)
    product_name_file:close()
    local product_name_md5 = luci.sys.exec("md5sum /tmp/product_name")
    luci.sys.exec("rm -f /tmp/product_name")
    return string.match(product_name_md5, "%x%x%x%x+")
end

function make_common_config()
    local common_config = {
        ["image_boot"] = "0",
        ["device_mode"] = "router"
    }

    local fd = io.open("/tmp/save-backup-commonconf.bin", "w")
    for key, value in pairs(common_config) do
        fd:write(key .. "=" .. value .. "\0")
    end
    fd:close()
end

function read_cfg(http_form)
    local data = {}
 
 	data.model         = uci_r:get("locale", "sysinfo", "model") or "TP-Link"   
	data.log_name      = "syslog-%s.txt" % os.date("%Y-%m-%d")
	data.config_name   = "backup-%s-%s.bin" % {configtool.getsysinfo("product_name"), os.date("%Y-%m-%d")}
	data.deviceSoftver = string.gsub(sys.exec("getfirm SOFTVERSION"), "%c", "") 
	data.deviceHarder = string.gsub(sys.exec("getfirm HARDVERSION"), "%c", "")
	data.deviceMac     = string.gsub(sys.exec("getfirm MAC"), "-", "")
	if uci_r:get_profile("cloud", "https_client") ~= 1 then
		data.tplinkID      = accmgnt.get_last_cloud_account() or ""
	end

	local reader = firmware.config_backup(true)
	if reader then
		local config = reader:read("*a")
		if config then
			data.config = nixio.bin.b64encode(config)
		else
			data.config = ""
		end
		reader:close()
	end

    local lang = uci_r:get("locale", "sysinfo", "locale")
    local util = require("io").popen("logread -w -l %s " % lang)
    if util then
        local ln = util:read("*a")
        if ln then
            data.syslog = nixio.bin.b64encode(ln)
        else
            data.syslog = ""
        end
        util:close()
    end

	return data
end

local dispatch_tbl = {
	["content"] = {
		["read"]  = {cb = read_cfg}
	},
}

function dispatch(http_form)
	return ctl.dispatch(dispatch_tbl, http_form)
end

function _index()
	return ctl._index(dispatch)
end

--- Module entrance
function index()
	entry({"admin", "feedback"}, call("_index")).leaf = true
end
