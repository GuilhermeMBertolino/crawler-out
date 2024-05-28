#! /usr/bin/env lua
--
-- smart_home_upload.lua
-- Copyright (C) 2019 tpuser <tpuser@liushuaiwei>
--
-- Distributed under terms of the MIT license.
--
local _M = {}

local nixio = require "nixio"
local dbg   = require "luci.tools.debug"
local json = require "luci.json"
local sys = require "luci.sys"
local uci = require "luci.model.uci"
local uci_r = uci.cursor()
local smart_home = require "cloud.smart_home.smart_home"
local SMART_HOME_URL_TOKEN_FILE="/tmp/cloud/cloud_token_smart_home"
local SMART_HOME_URL_POSTFIX="/smart-home/router"
local SMART_HOME_UPDATE_TOKEN="cloud_getDevToken smart_home"
local ERROR_INVAILD_TOKEN = -5003
local ERROR_CLOSE_UPLOAD = -5004
local CACERT_FILE = "/etc/certificate/2048_newroot.cer"

_M.APP = 1
_M.VOICE = 5
_M.RULE_TRIGGER = 4

local function update_url_token()
    sys.call("rm " .. SMART_HOME_URL_TOKEN_FILE .. " 2>/dev/null")
    sys.call(SMART_HOME_UPDATE_TOKEN)
end

local function get_url_token()
	if not nixio.fs.access(SMART_HOME_URL_TOKEN_FILE) then
        update_url_token()
    end
    local fp = io.open(SMART_HOME_URL_TOKEN_FILE, "r")
    if not fp then
        return nil, nil
    end
    token = fp:read("*line")
    origin_url = fp:read("*line")..SMART_HOME_URL_POSTFIX
    fp:close()
    return origin_url, token
end


local function upload_report_interface(origin_url, content)
    local content_type = "Content-type: application/json;charset=utf-8"
    local ret
	local fp = io.popen("curl -s -S -l -H \"%s\" -X POST -d \'%s\' --cacert %s --connect-timeout 5 %s --retry 3 --retry-delay 1 2>>/var/log/smart_home_upload.result" % {content_type, json.encode(content), CACERT_FILE, origin_url})
    if fp then
        ret = fp:read("*all")
        fp:close()
    end
	dbg.print("upload report response:",ret)
    return json.decode(ret)
end

local function need_update_token(ret)
    if not ret or not ret.errorCode then
        return false
    end
    return tonumber(ret.errorCode) == ERROR_INVAILD_TOKEN
end

local function need_close_upload(ret)
    if not ret or not ret.errorCode then
        return false
    end
    return tonumber(ret.errorCode) == ERROR_CLOSE_UPLOAD
end

local function clean_environment()
end

local function get_device_mac()
    --local deviceMac = uci_r:get("network", "dev_lan", "macaddr")
    local deviceMac = sys.exec("getfirm MAC") or ""
    if deviceMac ~= "" then
		local tmpstr = string.gsub(deviceMac, "-", "") or ""
		deviceMac = string.match(tmpstr, "%w+") or ""
		deviceMac = string.upper(deviceMac) or ""
    end

    local result = {}
    result[#result + 1] = deviceMac:gsub(":", ""):upper()
    return result
end

--local function get_basic_info(token, gid, devices)
local function get_basic_info(token, devices)
    local result = {}
    local device = {}
    result['type'] = "SOHO_SMART_HOME"
    result['method'] = "module.report"
    result['version'] = "2.0"
    if devices then
        if type(devices) == "string" then
            device['deviceMacList'] = {}
            device['deviceMacList'][1] = devices
        else
            device['deviceMacList'] = devices
        end
    else
            device['deviceMacList'] = get_device_mac()
    end
    --device['groupId'] = gid
    device['timestamp'] = os.time() * 1000
    device['deviceToken'] = token
    result['device'] = device
    return result
end


local function check_in_ap_mode()
	local sysmode_support = uci_r:get("sysmode", "sysmode", "support") or "no"
	local sysmode =  uci_r:get("sysmode", "sysmode", "mode") or "router"
	if sysmode_support == "yes" and sysmode == "ap"	then
		return true
	else
		return false
	end
end

local function upload_main(content, devices)
    local retry_count = 0
    local token
    local ret
    local origin_url

    if check_in_ap_mode() == true then
    	return 
    end
    
    if not smart_home.upload_enabled() then
        return 
    end
    while(retry_count <= 3) do
        origin_url, token = get_url_token()
        --local input = get_basic_info(token, group.gid, devices)
        local input = get_basic_info(token, devices)
        input.params = content
        dbg.print("[smart home] upload content : " .. json.encode(input))
        ret = nil
        if origin_url then
            ret = upload_report_interface(origin_url, input)
        end
        if need_update_token(ret) then
            update_url_token()
        else
            break
        end
        retry_count = retry_count + 1
    end
    if need_close_upload(ret) then
        smart_home.set_upload_enabled(false)
    end
    clean_environment()
end


function _M.upload_module_list(all)
    local pid = nixio.fork()

    if pid == 0 then
        local data = {}
        data.moduleList = smart_home.get_modules()
        if all == true then
            data.propertyChangeList=smart_home.report(nil, _M.RULE_TRIGGER)
        end
        upload_main(data)
        os.exit(1)
    end
end

function _M.upload_property_change(modules, cause, devices)
    local pid = nixio.fork()
    if not cause then
        cause = _M.APP
    end
    if pid == 0 then
        local properties = smart_home.report(modules, cause)
        if next(properties) == nil then
            dbg.print("No property changed need upload")
            os.exit(1)
        end
        upload_main({propertyChangeList=properties}, devices)
        os.exit(1)
    end
end

function _M.upload_property_change_client(modules, cause, clients)
    if type(clients) == type("") or #clients == 0 then
        local info = clients
        clients = {}
        clients[#clients + 1] = info 
    end

    --local pid = nixio.fork()
    if not cause then
        cause = _M.APP
    end
    local clientList = {}
    --if pid == 0 then
    for _,client in ipairs(clients) do
        local properties = smart_home.report_client(modules, cause, client)
        dbg("properties:%s" % json.encode(properties))
        clientList[#clientList + 1] = {propertyChangeList=properties, 
                                        clientMac=client.clientMac,
                                        firstConnect=(client.new == true) }
    end
    if #clientList == 0 then
        dbg.print("No property changed need upload")
        os.exit(1)
    end
    upload_main({clientList=clientList}) 
        --os.exit(1)
    --end
end

function _M.batch_upload_property_change_clients(module, cause, clients)
    -- TODO: Only for clientInfo now
    if module ~= "clientInfo" then
        dbg.print("Batch only for clientInfo now")
        return
    end
    
    if type(clients) == type("") or #clients == 0 then
        local info = clients
        clients = {}
        clients[#clients + 1] = info 
    end

    local pid = nixio.fork()
    if not cause then
        cause = _M.APP
    end
    local clientList = {}
    if pid == 0 then
        local module_version = smart_home.get_module_version(module)
        local clientInfo = require("luci.smart_home.clientInfo")
        clientList = clientInfo.query_client_list(cause, clients, module_version)
        if #clientList == 0 then
            dbg.print("No property changed need upload")
            os.exit(1)
        end
        upload_main({clientList=clientList}) 
        os.exit(1)
    end
end

return _M

