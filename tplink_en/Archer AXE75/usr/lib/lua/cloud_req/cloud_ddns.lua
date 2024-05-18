module("cloud_req.cloud_ddns", package.seeall)

local cloud = require "cloud_req.cloud_comm"
local json  = require "luci.json"
local sys   = require "luci.sys"
local uci   = require "luci.model.uci"
local dbg   = require "luci.tools.debug"
local uci_r = uci.cursor()

--syslog define
local PROJ_LOG_ID_DDNS=214
--MSG(DDNS_TP_BIND_DOMAIN, 21, INF, "TP dynamic dns bind with domain %1")
local DDNS_TP_BIND_DOMAIN=21
--MSG(DDNS_TP_BIND_SUCCEED, 25, NTC, "TP dynamic dns bind succeed with domain %1")
local DDNS_TP_BIND_SUCCEED=25
--MSG(DDNS_TP_BIND_FAIL, 26, NTC, "TP dynamic dns bind fail with domain %1")
local DDNS_TP_BIND_FAIL=26

local logm  = require "luci.model.log"
local log   = logm.Log(PROJ_LOG_ID_DDNS)

function ddns_register(domain)
	local req = {}
	req.params = {}

	req.method = "registerDomain"
	req.params.deviceId = cloud.TrimStr(sys.exec("getfirm DEV_ID"))
	req.params.domain = domain

	local re, data = cloud.send_request_sync(req, 5000, 1)

	-- connection error
	if re ~= 0 then return re end

	return data.error_code
end

function ddns_bind(domain)
	local req = {}
	req.params = {}

	req.method = "bindDomainToDevice"
	--req.params.force = "0"
	req.params.domain = domain
	req.params.deviceId = cloud.TrimStr(sys.exec("getfirm DEV_ID"))

	log(DDNS_TP_BIND_DOMAIN, domain)
	local re, data = cloud.send_request_sync(req, 5000, 1)

	if re ~= 0 or data.error_code ~= 0 then
		log(DDNS_TP_BIND_FAIL, domain)
	else
		log(DDNS_TP_BIND_SUCCEED, domain)
	end

	-- connection error
	if re ~= 0 then return re end

	return data.error_code
end

function ddns_unbind(domain)
	local req = {}
	req.params = {}

	req.method = "unbindDomainFromDevice"
	req.params.domain = domain
	req.params.deviceId = cloud.TrimStr(sys.exec("getfirm DEV_ID"))

	local re, data = cloud.send_request_sync(req, 5000, 1)

	-- connection error
	if re ~= 0 then return re end

	return data.error_code
end

function ddns_unbind_all()
	local req = {}
	req.params = {}

	req.method = "unbindAllDomainFromDevice"
	req.params.deviceId = cloud.TrimStr(sys.exec("getfirm DEV_ID"))

	local re, data = cloud.send_request_sync(req, 5000, 1)

	-- connection error
	if re ~= 0 then return re end

	return data.error_code
end

function ddns_get_domain_list()
	local req = {}
	req.params = {}
	local res = {}

	req.method = "getDomainList"
	req.params.deviceId = cloud.TrimStr(sys.exec("getfirm DEV_ID"))

	local re, data = cloud.send_request_sync(req, 5000, 1)

	-- connection error
	if re ~= 0 then return res end
	
	res = data.result.domains
	return res
end

function ddns_delete_domains(domains)
	local req = {}
	req.params = {}

	req.method = "deleteDomains"
	req.params.domains = domains
	req.params.deviceId = cloud.TrimStr(sys.exec("getfirm DEV_ID"))

	local re, data = cloud.send_request_sync(req, 5000, 1)

	-- connection error
	if re ~= 0 then return re end

	return data.error_code
end