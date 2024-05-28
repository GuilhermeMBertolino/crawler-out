#! /usr/bin/env lua
--
-- clientInfo.lua
-- Copyright (C) 2019 tpuser <tpuser@liushuaiwei>
--
-- Distributed under terms of the MIT license.
--

module("luci.smart_home.clientInfo", package.seeall)

local uci = require "luci.model.uci"
local product = require "luci.controller.admin.network"
local tm_client_mgmt = require "luci.model.tm_clientmgmt"   
local json = require "luci.json"
local dbg = require "luci.tools.debug"

local _M = {}

function _M.version()
    return '1.0'
end

local function query_client_info(data)
	--dbg.printf("[query_client_info]data: 	" .. json.encode(data))
	local result = {}
    if not data or not data.clientMac then
    	result.error_code = -1101
        return result
    end
    local access_list = tm_client_mgmt.get_access_client_list()
    local uci_c = uci.cursor()
    local flag = false
    local client = {}
    client.mac = data.clientMac
    
    for _, val in ipairs(access_list) do 
    	if client.mac == val.mac:gsub("-", ""):upper() then
    		local deviceMap = tm_client_mgmt.get_client_type_list()
    		flag = true
    		--client.hostname = val.name
    		-- get hostname and alias
			uci_c:foreach("history_list", "list",
		        function(section)
					local mac = section.mac
		            if mac == client.mac then
		            	client.hostname = uci_c:get("history_list", section[".name"], "hostname")
						client.alias = uci_c:get("history_list", section[".name"], "nickname")
		            end
		        end
		    )
		    client.hostname = nixio.bin.b64encode(client.hostname)
		    if client.alias then
        		client.alias = nixio.bin.b64encode(client.alias)
        	end
	    	client.type = tm_client_mgmt.get_client_type(val.mac, deviceMap)
    	end
    end
    if flag == false then
    	result.error_code = -1300
    	return result
    else
    	local ret = {}
    	result = client
    	ret.result = result
    	ret.error_code = 0
    	return ret
    end
end

function _M.query_client_list(cause, clients, version)
    --dbg.printf("[query_client_info]data:  " .. json.encode(data))
    local result = {}
    local properties = {}
    
    if not cause or not clients or #clients == 0 then
        return result
    end

    local module_version = version
    --local access_list = tm_client_mgmt.get_access_client_list()
   
    local deviceMap = tm_client_mgmt.get_client_type_list()
    local client_type_list = {}
    for mac,val in pairs(deviceMap) do
        mac = mac:gsub("[:-]", ""):upper()
        client_type_list[mac] = val
    end
    
    -- get hostname and alias, type
    local client_list = {}
    local uci_c = uci.cursor() 
    uci_c:foreach("history_list", "list",
        function(section)
            local mac = section.mac:gsub("[:-]", ""):upper()
            
            local client = {}
            client.mac = mac
            client.hostname = uci_c:get("history_list", section[".name"], "hostname")
            client.alias = uci_c:get("history_list", section[".name"], "nickname")
            client.hostname = nixio.bin.b64encode(client.hostname)
            if client.alias then
                client.alias = nixio.bin.b64encode(client.alias)
            end
            client.type = tm_client_mgmt.get_client_type(mac, client_type_list)
            
            client_list[mac] = client
        end
    )
    
    for _, client in ipairs(clients) do
        local client_info = client_list[client.clientMac]
        if client_info then
            properties = {{
                cause = cause,
                name = "clientInfo",
                version = module_version,
                properties = client_info}}
            
        else
            properties = {}
        end
        result[#result + 1] = {propertyChangeList=properties, 
                                            clientMac=client.clientMac,
                                            firstConnect=(client.new == true) }
    end

    return result
end

local function execute_client_info(data)
    local result = {}
    return result
end

local dispatch_tbl = {  
    ["query"] = {
        cb = query_client_info
    },
    ["execute"] = {
        cb = execute_client_info,
    },
}

function _M.dispatch(form)
	--dbg.printf("[dispatch]form: 	" .. json.encode(form))
	local result = {}
	if not form then
		result.error_code = -1101
		return result
	end
	if form.method then
		local fn = dispatch_tbl[form.method]
		result = fn.cb(form.params)
	else
		result.error_code = -1101
	end
	--dbg.printf("[dispatch]result: 	" .. json.encode(result))
	return result
end
return _M
