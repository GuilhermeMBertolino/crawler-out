local util = require "luci.util"
local nixio = require "nixio"
local fs = require "nixio.fs"
local sys = require "luci.sys"
local json = require "luci.json"
local uci = require "luci.model.uci"
local product = require "luci.controller.admin.network"
local tm_client_mgmt = require "luci.model.tm_clientmgmt"   
-- debug
local dbg = require "luci.tools.debug"

local MODULE_CACHE_FILE = "/var/run/smart_home_modules"
local _M = {}
local uci_r

local NOT_FOUND = 1
local VERSION_MISMATCH = 2
local CORRECT = 0

local CACHE_SEGMENT_SIZE = 16384 --16KB
-- local CACHE_SEGMENT_SIZE = 1024 --16KB

_M.CONFIG_MODEL = "smart_home"
_M.CONFIG_SECTION = "info"

_M._VERSION = '1'


-- get client info for negotiate
function get_client_config()
    local access_list = tm_client_mgmt.get_access_client_list()
    local uci_c = uci.cursor()
    local client_list = {} 
    for _, val in ipairs(access_list) do 
        --dbg.printf("{smart_home.lua}[get_client_config]val:   " .. json.encode(val))
        local client = {}
        local deviceMap = tm_client_mgmt.get_client_type_list()
        client.mac = val.mac:gsub("-", ""):upper()
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
        if client.hostname then
            client.hostname = nixio.bin.b64encode(client.hostname)
        end
        if client.alias then
        	client.alias = nixio.bin.b64encode(client.alias)
        end
        client.type = tm_client_mgmt.get_client_type(val.mac, deviceMap)
        client_list[#client_list + 1] = client
    end
    
    --dbg.printf("{smart_home.lua}[get_client_config]client_list:     " .. json.encode(client_list))
    return client_list
end

function _M.set_debug(d)
    if d then
        dbg = require "luci.tools.debug"
    else
        dbg = function() end
    end
end

local function get_modules_cache()
    local fp = io.open(MODULE_CACHE_FILE, "r")
    local data = nil
    if fp then
        local lines = fp:read("*all")
        fp:close()
        data = json.decode(lines)
    end
    --dbg.printf("{smart_home.lua}[get_modules_cache]data:  " .. json.encode(data))
    return data
end

local function response_data(data, error_code, frag_params)
    if data then
        if type(data) == "table" then
            if next(data) == nil then
                data = nil
            end
        end
    end
    if not data then
        return {["errorCode"] = error_code}
    end
    return {["result"] = data, ["errorCode"] = error_code,
            ["resultType"]=(frag_params and frag_params.result_type or 0), 
            ["fragment"]= (frag_params and frag_params.fragment or 0)}
end

local function set_modules_cache(modules)
    local fp = io.open(MODULE_CACHE_FILE, "w")
    if fp == nil then
        dbg("error open file failed:" .. MODULE_CACHE_FILE)
        return false
    end
    fp:write(json.encode(modules))
    fp:close()
    return true
end

function _M.get_modules()
    local modules = get_modules_cache()
    if modules then
        return modules
    end
    --util.libpath() "/usr/lib/lua/luci/smart_home/"
    local path = util.libpath() .. "/smart_home/"
    local suffix = ".lua"
    local controllers = {}
    modules = {}

    local sysmode = require "luci.controller.admin.system"
    local mode = sysmode.get_sysmode()

    local tmppath = fs.glob(path .. "*" .. suffix)
    nixio.util.consume((fs.glob(path .. "*" .. suffix)), controllers)
        
    for _,c in ipairs(controllers) do
        local modname = c:sub(#path+1, #c):gsub("/", "."):gsub(suffix .. "$", "")
        local module = {}
        local mod = require("luci.smart_home." .. modname)

        if mod and mod.version and mod.version(mode.mode) then
            module.name = modname
            module.version = mod.version(mode.mode)
            if tonumber(module.version) and tonumber(module.version) > 0 then
                modules[#modules + 1] = module
            end
        end
    end
    set_modules_cache(modules)
    --dbg.printf("{smart_home.lua}[get_modules]modules:     " .. json.encode(modules))
    return modules
end



local function contain_module(modules, info)
    local is_no_version = false
    if type(info) == 'string' then
        local name = info
        info = {}
        info['name'] = name
        is_no_version = true
    end
    
    for _,val in ipairs(modules) do
        if val['name'] == info['name'] then
            if is_no_version 
                or tonumber(val['version']) == tonumber(info['version'])
            then
                return CORRECT, val['version']
            end
            return VERSION_MISMATCH, val['version']
        end
    end
    return NOT_FOUND, nil
end

local function config_report_trigger(params)
    if params == nil or params.enable == nil or params.modules == nil then
        return false
    end
    local enable = params.enable
    local modules = params.modules
    uci_r = uci_r or uci.cursor()
    for _,module in ipairs(modules) do
        if enable == false then
            uci_r:set(_M.CONFIG_MODEL, _M.CONFIG_SECTION, module, "off")
        else
            uci_r:set(_M.CONFIG_MODEL, _M.CONFIG_SECTION, module, "on")
        end
    end
    uci_r:commit(_M.CONFIG_MODEL)
    return true
end

local function auto_upload_modules_property(modules)
    local smart_home_upload = require "cloud.smart_home.smart_home_upload"
    smart_home_upload.upload_property_change(modules, smart_home_upload.RULE_TRIGGER)
end

local function auto_config_report_trigger(modules)
    uci_r = uci_r or uci.cursor()
    local enable = uci_r:get(_M.CONFIG_MODEL, _M.CONFIG_SECTION, "enable")
    local config_modules = {}

    for _, val in ipairs(modules) do
        config_modules[#config_modules + 1] = val.name
    end

    if enable == "1" then
        auto_upload_modules_property(config_modules)
        return
    end

    uci_r:set(_M.CONFIG_MODEL, _M.CONFIG_SECTION, "enable", "1")
    local params = {
        enable = true,
        modules = config_modules
    }
    config_report_trigger(params)
    auto_upload_modules_property(config_modules)

end


local function negotiate(params)
    local result = {}
    local modules
    local deviceList = params.deviceList
    local uci_r = uci.cursor()
    local deviceMac = sys.exec("getfirm MAC") or ""
    if deviceMac ~= "" then
		local tmpstr = string.gsub(deviceMac, "-", "") or ""
		deviceMac = string.match(tmpstr, "%w+") or ""
		deviceMac = string.upper(deviceMac) or ""
    end
    --local deviceMac = uci_r:get("network", "dev_lan", "macaddr")
    --deviceMac = deviceMac:gsub(":", ""):upper()
    
    if not deviceList then
        return response_data(nil, 2)
    end
    for _, val in ipairs(deviceList) do
       if deviceMac == val.deviceMac then 
           val.modules = _M.get_modules()
           val.clientConfig = {}
           val.clientConfig.clientInfoList = get_client_config()
           modules = val.modules  
       end
    end
    
    result.deviceList = deviceList
    -- config report trigger 
    auto_config_report_trigger(modules)
    return response_data(result, 0)
end

local function module_execute(uri, data)
    local mod = "luci.smart_home." .. uri
    mod = require(mod)
    local dispatch = mod["dispatch"]

    if not dispatch then
        return false, (("No dispatch entry for %s"):format(mod))
    end
    local result = dispatch(data)
    
    return result
end

local function get_module_properties(name, params)
    local form = {}
    form.method = 'query'
    form.params = params
    local result = module_execute(name, form)
    if result.error_code and result.error_code == 0 and result.result then
        return result.result
    end
    return nil, result.error_code
end

local function filter_properties(properties, propNameList)
    if not propNameList then
        return properties
    end
    if not properties then
        return nil
    end
    local result = {}
    for idx, val in pairs(properties) do
        if type(val) == 'table' then        
            result[idx] = filter_properties(val, propNameList)
        end
        for _,name in ipairs(propNameList) do
            if name == idx then           
                result[idx] = val
                break
            end
        end
    end
    return result
end

local function query_internal(data, module_type, params)    
    local error_code = 0
    if not data.modules then
        return response_data(data, 2)
    end
    if not module_type then
        module_type = "device"
    end
    local modules = data['modules']
    local support_modules = _M.get_modules()
    local result = {}
    for idx, val in pairs(modules) do
        local success = false
        local ret, version = contain_module(support_modules, val)  
        if ret == CORRECT then
            local properties, code = get_module_properties(val['name'], params)
            if properties then
                success = true
                if not result.modules then
                    result.modules = {}
                end
                if not val.propNameList then
                    modules[idx].properties = properties
                else
                    modules[idx].properties = filter_properties(properties, val.propNameList)
                end
                result.modules[#result.modules + 1] = modules[idx]
            elseif code ~= 0 then
                error_code = code
                break
            end
        end
        if not success then
            if not result.unsupportedModules then
                result.unsupportedModules = {}
            end
            if version then
                modules[idx][module_type] = {}
                modules[idx][module_type].version = version
            end
            result.unsupportedModules[#result.unsupportedModules + 1] = modules[idx]
        end
    end
    return response_data(result, error_code)
end

local function query(data)
    return query_internal(data, "device")
end

local function query_client(data, client)
    return query_internal(data, "client", client)
end

local function execute_internal(data, module_type, params)
    if not data or not data.module or not data.module.name then
        return response_data(data, 2)
    end
    if not module_type then
        module_type = "device"
    end
    local support_modules = _M.get_modules()
    local ret, version = contain_module(support_modules, data.module)
    if ret ~= CORRECT then
        local result = {}
        if version then
            data.module[module_type] = {}
            data.module[module_type].version = version
        end
        data.module.properties = nil
        result.unsupportedModule = data.module
        return response_data(result, -1103)
    end
    local form = {}
    local result
    if data.module.properties then
        form.method = 'execute'
        form.params = data.module.properties
        if module_type == "clientMacList" and params then
            form.params["clientMacList"] = params
        elseif params then
            for name,val in pairs(params) do
                form.params[name] = val
            end
        end    
        -- dbg.printf("{smart_home.lua}[execute_internal]form:  " .. json.encode(form))
        local res = module_execute(data.module.name, form)
        if not res.error_code or tonumber(res.error_code) ~= 0 then
            data.errorCode = tonumber(res.error_code)
            return response_data(res, tonumber(res.error_code))
        end
        if module_type == "clientMacList" then
            if res and res.failList then
                result = {}
                result.failList = res.failList
            end
        else
            result = {}
            result.module = data.module
            result.module.properties = get_module_properties(data.module.name, params)
        end
    end

    if data.module.command then
        local command = data.module.command
        form = {}
        form.method = command.name
        form.params = command.params
        if form.method == "schedule" then
            if params.clientMac then
                form.params["clientMac"] = params.clientMac
            elseif params.clientMacList then
                form.params["clientMacList"] = params.clientMacList
            end
        end

        if params.deviceMac then
            form.params["deviceMac"] = params.deviceMac
        end

        local res = module_execute(data.module.name, form)
        if not res or not res.error_code or tonumber(res.error_code) ~= 0 then
            data.errorCode = tonumber(res.error_code)
            return response_data(res, tonumber(res.error_code))
        end
    end

    return response_data(result, 0)
end

local function execute(data, device)
    local ret = {}
    ret.errorCode = 0

    -- guestNetwork advance status check
    if data and data.module and data.module.name == "guestNetwork" then
        local guestNetwork_smart_home = require "luci.smart_home.guestNetwork"
        local guestNetwork_ret = guestNetwork_smart_home.guestNetwork_advance_status_check()
        --dbg.print("[guestNetwork] ret:" .. json.encode(guestNetwork_ret))
        if guestNetwork_ret and guestNetwork_ret.error_code and guestNetwork_ret.error_code ~= 0 then
            ret.result = guestNetwork_ret
            ret.errorCode = guestNetwork_ret.error_code
            return ret
        end
    end
    
    -- wps advance status check
    if data and data.module and data.module.name == "wps" then
        local wps_smart_home = require "luci.smart_home.wps"
        local wps_ret = wps_smart_home.wps_advance_status_check()
        --dbg.print("[wps] wps_ret:" .. json.encode(wps_ret))
        if wps_ret and wps_ret.error_code and wps_ret.error_code ~= 0 then
            ret.result = wps_ret
            ret.errorCode = wps_ret.error_code
            return ret
        end
    end

    if data and data.module and data.module.properties ~= nil then
    	ret.result = data
    	ret.fragment = 0
    	ret.resultType = 0
    	if data and data.module and data.module.name == "wps" then
    		ret.result.module.properties.activated = true
    	end
    end
    
    local pid = nixio.fork()
    if pid == 0 then
        execute_internal(data, "device", device)
        os.exit(1)
    else
        return ret
    end
end

local function execute_client(data, client)
    --return execute_internal(data, "client", client)
    local ret = {}
    ret.errorCode = 0

    local pid = nixio.fork()
    if pid == 0 then
        execute_internal(data, "client", client)
        os.exit(1)
    else
        return ret
    end 
end

local function execute_batch_client(data, client)
    return execute_internal(data, "clientMacList", client)
end

local function config_trigger(enable, modules, unsupportedModules, support_modules)
    local config_modules = {}
    for idx,val in ipairs(modules) do
        local ret, version = contain_module(support_modules, val)
        if ret == CORRECT then
            config_modules[#config_modules + 1] = val.name
        else
            if version then
                modules[idx].device = {}
                modules[idx].device.version = version
            end
            unsupportedModules[#unsupportedModules + 1] = modules[idx]
        end
    end

    if #config_modules > 0 then
        local params = {
            enable = enable,
            modules = config_modules
        }
        config_report_trigger(params)
    end
end

local function config(data)
    if not data then
        return response_data(data, 2)
    end
    if not data.reportEnable and not data.reportDisable then
        return response_data(data, 2)
    end
    local unsupportedModules = {}
    local support_modules = _M.get_modules()
    local reportEnable = data.reportEnable
    local reportDisable = data.reportDisable

    if reportEnable and reportEnable.modules then
        config_trigger(true, reportEnable.modules, unsupportedModules, support_modules)
    end

    if reportDisable and reportDisable.modules then
        config_trigger(false, reportDisable.modules, unsupportedModules, support_modules)
    end

    if next(unsupportedModules) then
        return response_data({unsupportedModules=unsupportedModules}, 0)
    end
    return response_data(nil, 0)
end


local SMART_HOME_HANDLER = {
    ["module.negotiate"] = {cb = negotiate, fragmentable=true},
    ["module.query"] = { cb = query},
    ["module.query.client"] = { cb = query_client},
    ["module.execute"] = { cb = execute},
    ["module.execute.client"] = { cb = execute_client},
    ["module.batch.execute.client"] = { cb = execute_batch_client},
    ["module.config"] = { cb = config},
}


function _M.get_trigger_status(module)
    if not module then
        return false
    end
    uci_r = uci_r or uci.cursor()
    local smart_home_support = uci_r:get_profile("smart_home", "support") or "yes" --TODO no
    if smart_home_support ~= "yes" then
        return false
    end

    local enable =  uci_r:get(_M.CONFIG_MODEL, _M.CONFIG_SECTION, "enable")
    if tonumber(enable) == 0 then
        return false
    end
    local exists =  uci_r:get(_M.CONFIG_MODEL, _M.CONFIG_SECTION, module)
    if not exists then
        return true
    end
    return uci_r:get_bool(_M.CONFIG_MODEL, _M.CONFIG_SECTION, module)
end

function _M.upload_enabled()
    uci_r = uci_r or uci.cursor()
    local smart_home_support = uci_r:get_profile("smart_home", "support") or "yes" --TODO no
    if smart_home_support ~= "yes" then
        return false
    end

    local enable =  uci_r:get(_M.CONFIG_MODEL, _M.CONFIG_SECTION, "enable")
    if tonumber(enable) == 0 then
        return false
    end
    return true
end

local function get_cache_param(file, param)
    local cache_fp
    local cache
    
    cache_fp = io.open(file, "r")
    if cache_fp then
        local cache_json
        
        cache = cache_fp:read("*all")
        cache_fp:close()
        cache_json = json.decode(cache)
        
        return param and (cache_json and cache_json[param]) or cache_json
    end
    
    return nil
end

local function check_method_cache(method, params)
    if not method then
        return nil
    end
    local cache_file = '/tmp/cloud/smart_home_%s' % (method)
    if not fs.access(cache_file) then
        return nil
    end
    local cacheSince = get_cache_param(cache_file, "cacheSince")
    if not params.cacheSince 
        or not cacheSince
        or not tonumber(params.cacheSince)
        or not tonumber(params.cacheSince) == tonumber(cacheSince)
    then
        return nil
    end
    --check expires
    local f = io.popen("stat -c %Y " .. cache_file)
    local last_modified = tonumber(f:read())
    local cur_time = tonumber(os.time())
    local expires = tonumber(get_cache_param(cache_file, "expiresIn"))
    if not last_modified or not cur_time or not expires or last_modified + expires < cur_time then
        os.remove(cache_file)
        return nil
    end

    local cache_params = get_cache_param(cache_file)
    content_cache = (cache_params and cache_params["cache"]) and json.encode(cache_params["cache"])
    --return fragment
    
    local cache_len = string.len(content_cache)
    local offset_begin = (params.offset > 0) and params.offset or 1
    local offset_end = offset_begin + CACHE_SEGMENT_SIZE -1
    
    local result = nixio.bin.b64encode(string.sub(content_cache, offset_begin, offset_end))
    
    local frag_params = {}
    frag_params.result_type = 1
    if offset_end >= cache_len then
        frag_params.fragment = 0
    else
        frag_params.fragment = 1
    end

    return response_data(result, 0, frag_params)
end

local function update_cache_file(method, params, data)
    local cache_file = '/tmp/cloud/smart_home_%s' % (method)
    local content = {}
    content.expiresIn = params.expiresIn
    content.cacheSince = params.cacheSince
    content.cache = data
    local cache_fp = io.open(cache_file, "w")
    if cache_fp then
        cache = cache_fp:write(json.encode(content))
        cache_fp:close()
    end
end

local function check_result_fragment(method, params, res)
    if not res or not res.result then
        return res
    end
    res_str = json.encode(res.result)
    if string.len(res_str) <= CACHE_SEGMENT_SIZE then
        return res
    end

    --update cache files
    update_cache_file(method, params, res.result)

    local result = nixio.bin.b64encode(string.sub(res_str, 1, CACHE_SEGMENT_SIZE))
    local frag_params = {}
    frag_params.result_type = 1
    frag_params.fragment = 1
    return response_data(result, res.errorCode, frag_params)
end

local function check_in_ap_mode()
	local uci_c = uci.cursor()
	local sysmode_support = uci_c:get("sysmode", "sysmode", "support") or "no"
	local sysmode =  uci_c:get("sysmode", "sysmode", "mode") or "router"
	if sysmode_support == "yes" and sysmode == "ap"	then
		return true
	else
		return false
	end
end

function _M.run(data)
    local ret = nil
    local fragmented = false
    
    -- AP mode supports the negotiate and query
    if check_in_ap_mode() == true then
    	if data.method ~= "module.negotiate" and data.method ~= "module.query" and data.method ~= "module.query.client" then
    	    return response_data(nil, -1118)
    	end
    end
    
    --handle fragment
    if type(data) ~= "table" or data.method == nil then
        return false -- TODO need add fail code
    else
        --dbg.printf("{smart_home.lua}[run]data:  " .. json.encode(data))
        local fn = SMART_HOME_HANDLER[data.method]
        if fn and fn.cb then
            if fn.fragmentable then
                ret = check_method_cache(data.method, data.params)
            end
            if not ret then
                local extra = data.device
                local match_result = string.match(data.method, "client")
                if match_result and data.client then
                    extra = data.client
                elseif match_result and data.clientMacList then
                    extra = data.clientMacList
                end
                ret = fn.cb(data.params, extra)
                _M.set_upload_enabled(true)
            else
                fragmented = true
            end
        else
            dbg.print("maybe need forward request")
            -- TODO maybe forward request
        end

        if not fragmented and fn.fragmentable then
            -- fragment some content
            ret = check_result_fragment(data.method, data.params, ret)
        end
    end
    --check fragment
    --dbg.printf("{smart_home.lua}[run]ret:   " .. json.encode(ret))
    return ret
end

local function report_internal(modules, cause, params)
    local modules_list = {}
    local support_modules = _M.get_modules()
    if modules == nil then
        for _, val in ipairs(support_modules) do
            modules_list[#modules_list + 1] = val.name
        end
    elseif type(modules) == "string" then
        modules_list[#modules_list + 1] = modules 
    else
        modules_list = modules 
    end
    
    local propertyChangeList = {}
    for idx,val in ipairs(modules_list) do
        local ret, version = contain_module(support_modules, val)
        if ret == CORRECT and _M.get_trigger_status(val) then
            local module = {}
            module.properties = get_module_properties(val, params)
            module.name = val
            module.version = version
            module.cause = cause
            if module.properties then
                propertyChangeList[#propertyChangeList + 1] = module
            end
        end
    end
    
    return propertyChangeList
end

function _M.get_module_version(module)
    local support_modules = _M.get_modules()
    local ret, version = contain_module(support_modules, module)
    return version
end

function _M.report(modules, cause)
    return report_internal(modules, cause, nil)
end

function _M.report_client(modules, cause, client)
    return report_internal(modules, cause, client)
end

function _M.set_upload_enabled(enable)
    local result = "0"
    if enable then
        result = "1"
    end
    uci_r = uci_r or uci.cursor()

    --local val_enable = tostring(uci_r:set(_M.CONFIG_MODEL, _M.CONFIG_SECTION, "enable"))
    -- enable is boolean
    if tonumber(result) == tonumber(uci_r:get(_M.CONFIG_MODEL, _M.CONFIG_SECTION, "enable")) then
    --if tonumber(result) == tonumber(val_enable) then
        return 
    end
    uci_r:set(_M.CONFIG_MODEL, _M.CONFIG_SECTION, "enable", result)
    uci_r:commit(_M.CONFIG_MODEL)
end

return _M

