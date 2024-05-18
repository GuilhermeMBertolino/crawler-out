module("cloud_req.cloud_ddns", package.seeall)

local cloud = require "cloud_req.cloud_comm"
local json  = require "luci.json"
local sys   = require "luci.sys"
local uci   = require "luci.model.uci"
local dbg   = require "luci.tools.debug"
local uci_r = uci.cursor()

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

	local re, data = cloud.send_request_sync(req, 5000, 1)

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