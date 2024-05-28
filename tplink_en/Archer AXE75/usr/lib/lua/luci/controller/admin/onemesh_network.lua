--[[
Copyright(c) 2018 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  onemesh_network.lua
Details :  onemesh_network http response operation
Author  :  leiyaoyao  <leiyaoyao@tp-link.net>
Version :  1.0.0
Date    :  24May, 2018
]]--

-- sclient：Mesh Supported Client，一般是我司 AP/RE

module("luci.controller.admin.onemesh_network", package.seeall)

local http      = require "luci.http"
local dbg       = require "luci.tools.debug"
local sys       = require "luci.sys"
local nixio     = require "nixio"
local ctl       = require "luci.model.controller"
local onemesh	= require "luci.model.one_mesh"
local uci       = require "luci.model.uci"
local json      = require "luci.json"
local onemesh_admin  = require "luci.controller.admin.onemesh"

local uci_r = uci.cursor()

-- debug用
local function _print_tbl(data)
    if type(data) == "table" then
        for i, v in pairs(data) do
            dbg.print(i .. " = " .. tostring(data[i]))
            if type(data[i]) == "table" then
                _print_tbl(data[i])         
            end
        end
    end
end

local function invalid_args(errorcode)
    errorcode = errorcode or "invalid args"
    return false, errorcode
end

--03，获取组网内，已开启One Mesh的RE/AP设备，显示于basic-network map页面
local function get_sclient_list_all(http_form)
	local success = true
    local sclist = onemesh.get_sclient_list_all() or {}
    return success and sclist
end

local function get_all_re_detail(http_form)
    local sclist = onemesh.get_all_re_detail() or {}
    return sclist
end

--07，Available Mesh Device 获取
local function get_available_mesh_dev_list(http_form)
	local success = true
    local alist = onemesh.get_available_mesh_dev_list() or {}
    return success and alist
end

--04，One Mesh网络拓扑信息获取
local function get_mesh_topology(http_form)
    local success = true
    local topo = onemesh.get_mesh_topology() or {}
    return success and topo
end

--05，获取特定OneMesh客户端详细信息
local function get_device_detail(http_form)
    local success = true
    local dev_detail = onemesh.get_device_detail(http_form.mac) or {}
	return success and dev_detail
end

--06，设置特定OneMesh客户端详细信息
local function set_device_detail(http_form)
	local success = true
	
	if not http_form.mac then
		return invalid_args()
	end
	
    local dev_detail = onemesh.set_device_detail(http_form) or {}
	return success and dev_detail
end

--08，Link Mesh Device（点击Available One Mesh Device，跳到它的管理界面）
local function link_available_mesh_dev(http_form)
    local data = {}
	local success
    local args = {}
    if http_form.mac == nil then
        return false
    end

    -- dbg.dumptable(http_form)

    args.operation = "link"
    args.mac = http_form.mac
	
    success, data = onemesh.manage_available_mesh_dev(args)
	
    return success and data
end

--09，Unink Mesh Device
local function unlink_available_mesh_dev(http_form)
    local data = {}
    local success
    local args = {}
    if http_form.mac == nil then
        return false
    end

    -- dbg.dumptable(http_form)

    args.operation = "unlink"
    args.mac = http_form.mac
	
    success, data = onemesh.manage_available_mesh_dev(args)
	
    return success and data
end

--10，Get Mesh Device Link Result			（开始 Link Mesh Device 操作之后，需要定时获取）
local function get_result_available_mesh_dev(http_form)
    local data = {}
	local success = true
	
	--todo
	
    return success and data
end

function tmp_device_list_get(app_form)
    if not app_form then
        dbg.print("invalid_args")
        return false, "invalid args"
    end

    dbg.printf("app_form")
    -- dbg.dumptable(app_form)

    local data = json.decode(app_form.data)

    -- dbg.printf("data")
    -- dbg.printf(data)
    -- dbg.printf("data table")
    -- dbg.dumptable(data)

    if not data and type(data) ~= "table" then
        dbg.print("invalid data")
        return false, "invalid data"
    end
    
    local start_index = tonumber(data.start_index)
    local amount = tonumber(data.amount)
    local onemesh_onoff_support = uci_r:get_profile("onemesh", "onoff_support") or "no"
    local enable = uci_r:get("onemesh", "onemesh", "enable") or "on"
    local time = uci_r:get_profile("global", "wls_reboot_time") or 20
    local mesh_re_list = get_all_re_detail()
    local available_re_list = get_available_mesh_dev_list()

    time = #mesh_re_list * 6 + time -- 每个re leave需要6s + 无线重启时间
    
--[[ 
    dbg.printf("===================== tmp_device_list_get =======================")
    dbg.printf(start_index)
    dbg.printf(amount)
    dbg.dumptable(mesh_re_list)
    dbg.dumptable(available_re_list)
    dbg.printf("=================================================================")
]]--

    local pos = 0
    local ret = {}
    local result = {}
    local all_re_list = {}
    local ret_re_list = {}

    for _, dev in pairs(mesh_re_list) do
        local tmp_re = {}
        tmp_re.is_added       = true
        tmp_re.device_type    = dev.device_type
        tmp_re.host_name      = dev.model
        tmp_re.name           = nixio.bin.b64encode(dev.name)
        tmp_re.mac            = dev.mac
        tmp_re.ip             = dev.ip

        if nil == dev.location then
            tmp_re.location       = ""
        else
            tmp_re.location       = dev.location
        end

        local link_speed_info = {}
        local link_speed_info_24g = {}
        local link_speed_info_5g = {}

        link_speed_info_24g.conn_type = "wls_2_4g"
        link_speed_info_24g.link_speed = dev.link_speed_24g
        link_speed_info_5g.conn_type = "wls_5g"
        link_speed_info_5g.link_speed = dev.link_speed_5g        

        link_speed_info[#link_speed_info + 1] = link_speed_info_24g
        link_speed_info[#link_speed_info + 1] = link_speed_info_5g
        tmp_re.link_speed_info = link_speed_info

        if tonumber(dev.signal_strength) >= 0 and tonumber(dev.signal_strength) < 3 then
            tmp_re.signal_level = 0
        elseif tonumber(dev.signal_strength) >= 3 and tonumber(dev.signal_strength) < 5 then
            tmp_re.signal_level = 2
        elseif tonumber(dev.signal_strength) == 5 then
            tmp_re.signal_level = 4
        else
            dbg.print("must not get here, dev.signal_strength is " .. dev.signal_strength)
            tmp_re.signal_level = 4 
        end

        tmp_re.clients_num    = dev.mesh_nclient_num

        all_re_list[#all_re_list + 1] = tmp_re
    end

    for _, dev in pairs(available_re_list) do
        local tmp_re = {}
        tmp_re.is_added       = false
        tmp_re.device_type    = dev.device_type
        tmp_re.host_name      = dev.model
        tmp_re.name           = nixio.bin.b64encode(dev.model)
        tmp_re.mac            = dev.mac
        tmp_re.ip             = dev.ip
        tmp_re.location       = ""

        all_re_list[#all_re_list + 1] = tmp_re
    end

    for _, dev in pairs(all_re_list) do
        if pos >=start_index and pos < start_index + amount then
            ret_re_list[#ret_re_list + 1] = all_re_list[pos + 1]        
        end
        pos = pos + 1 
    end

    result.start_index    = start_index
    result.amount         = #ret_re_list
    result.sum            = #all_re_list
    result.is_router_onemesh_disable_support = (onemesh_onoff_support == "yes") and true or false
    if onemesh_onoff_support == "yes" then
        result.router_onemesh_enable = (enable == "on") and true or false
        result.router_onemesh_enable_waiting_time = time
    end
    result.add_device_max = uci_r:get_profile("onemesh", "add_device_max") or "64"
    result.device_list    = ret_re_list
    
    ret.result = luci.json.encode(result)

    -- dbg.dumptable(ret)

    return ret   
end


function tmp_device_modify(app_form)
    if not app_form then
        dbg.print("invalid_args")
        return false, "invalid args"
    end

    local data = json.decode(app_form.data)

    if not data and type(data) ~= "table" then
        dbg.print("invalid data")
        return false, "invalid data"
    end
    
    local set_data = {}

    set_data.mac      = data.mac
    set_data.name     = nixio.bin.b64decode(data.name)
    set_data.location = data.location

    local dev_detail = onemesh.set_device_detail(set_data) or {}

    local ret = {}
    local result = {}
    ret.result = luci.json.encode(result)
    return ret   
end

function tmp_device_list_add(app_form)
    local args = {}

    if not app_form then
        dbg.print("invalid_args")
        return false, "invalid args"
    end

    local data = json.decode(app_form.data)

    if not data and type(data) ~= "table" then
        dbg.print("invalid data")
        return false, "invalid data"
    end
    
    -- dbg.printf("===================== tmp_device_list_add =========================")    
    -- dbg.dumptable(data.mac_list)
    -- dbg.printf("===================================================================") 

    local mac_list = data.mac_list
    for i = 1, #mac_list do
        args.operation = "link"
        args.mac = mac_list[i]

        success, data = onemesh.manage_available_mesh_dev(args)        
    end 

    if false == success then
        dbg.printf("=================== failed to add onemesh device ====================")    
        return false, "failed to add onemesh device"
    end

    local ret = {}
    local result = {}
    ret.result = luci.json.encode(result)
    return ret   
end

function tmp_device_list_del(app_form)
    local args = {}

    if not app_form then
        dbg.print("invalid_args")
        return false, "invalid args"
    end

    local data = json.decode(app_form.data)

    if not data and type(data) ~= "table" then
        dbg.print("invalid data")
        return false, "invalid data"
    end
    
    -- dbg.printf("===================== tmp_device_list_del =========================")    
    -- dbg.dumptable(data.mac_list)
    -- dbg.printf("===================================================================") 

    local mac_list = data.mac_list
    for i = 1, #mac_list do
        args.operation = "unlink"
        args.mac = mac_list[i]

        success, data = onemesh.manage_available_mesh_dev(args)        
    end 

    if false == success then
        dbg.printf("=================== failed to del onemesh device ====================")    
        return false, "failed to del onemesh device"
    end

    local ret = {}
    local result = {}
    ret.result = luci.json.encode(result)
    return ret 
end

function tmp_enable_set(app_form)
    local args = {}

    if not app_form then
        dbg.print("invalid_args")
        return false, "invalid args"
    end

    local data = json.decode(app_form.data)

    if not data and type(data) ~= "table" then
        dbg.print("invalid data")
        return false, "invalid args"
    end

    if data.enable == true then
         data.enable = "on"
    elseif data.enable == false then
        data.enable = "off"
    else
        return false, "invalid args"
    end

    onemesh_admin.write_onemesh_settings(data)

    local ret = {}
    local result = {}
    ret.result = luci.json.encode(result)
    return ret
end

local dispatch_tbl = {
	mesh_sclient_list_all = {
        ["read"] = { cb = get_sclient_list_all }
    },
	available_mesh_device_list = {
        ["read"] = { cb = get_available_mesh_dev_list }
    },
	mesh_topology = {
        ["read"] = { cb = get_mesh_topology }
    },
	mesh_sclient_detail = {
		["read"] = { cb = get_device_detail },
		["write"] = { cb = set_device_detail }
	},
	available_mesh_device_manage = {
		["link"] = { cb = link_available_mesh_dev },
		["unlink"] = { cb = unlink_available_mesh_dev },
		["get_result"] = { cb = get_result_available_mesh_dev }
	},
    mesh_tmp_op = {
        ["device_list_get"] = { cb = tmp_device_list_get },
        ["device_list_add"] = { cb = tmp_device_list_add },
        ["device_list_del"] = { cb = tmp_device_list_del },
        ["device_modify"] =   { cb = tmp_device_modify },
        ["enable_set"] = { cb = tmp_enable_set },
	}
}

function dispatch(http_form)
    return ctl.dispatch(dispatch_tbl, http_form)
end

function _index()
    return ctl._index(dispatch)
end

function index()
    entry({"admin", "onemesh_network"}, call("_index")).leaf = true
end
