--[[
Copyright(c) 2013 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  access_control.lua
Details :  controller for access_control.html webpage
Author  :  Hu Luyao <huluyao@tp-link.net>
Version :  1.0.0
Date    :  24Mar, 2014
]]--
module("luci.controller.admin.access_control", package.seeall)

local uci           = require "luci.model.uci"
local ctl           = require "luci.model.controller"
local sys           = require "luci.sys" 
local form          = require "luci.tools.form"
local dbg           = require "luci.tools.debug"
local clientmgmt    = require "luci.model.client_mgmt"
local ctypes = require "luci.model.checktypes"
local ubus          = require "ubus"
local uci_r = uci.cursor()
form = form.Form(uci_r, {"mac"})
require "luci.json"

local function get_user_mac()
    -- get user ipaddr from uhttpd
    local user_ip  = sys.getenv("REMOTE_ADDR") 
    local user_mac = ""
    local arptable = luci.sys.net.arptable()
    if arptable==nil then
        return ""
    end
    -- get user_mac from arp table by user_ip
    for _, v in ipairs(arptable) do
        if user_ip and user_ip == v["IP address"] then
            user_mac = v["HW address"]
            break
        end
    end

    return user_mac
end

local function ret_check( ret )
    if ret and ret.mac then
        ret.mac = (ret.mac):gsub(":", "-"):upper()
        return ret
    end
    return false
end

local function profile_check( type )
    local max_count = uci_r:get_profile("access_control", "max_dev")
    local count = form:count("access_control", type)
    return (count < max_count)
end

local function get_others( profile )
    local others = {}
    others.max_rules = uci_r:get_profile("access_control", profile)
    return others
end

local function user_mac_check( mac )
    mac = mac:gsub("-", ":"):upper()
    local user_mac = get_user_mac():gsub("-", ":"):upper()
    return (mac ~= user_mac)
end

local function get_list( list_type )
    local list = {}
    local user_mac = get_user_mac():gsub("-", ":"):upper()
    uci_r:foreach("access_control", list_type,
        function(section)
            list[#list + 1] = uci_r:get_all("access_control", section[".name"])
            list[#list].mac = (list[#list].mac):gsub(":", "-"):upper()
            list[#list].host = (list[#list].mac == user_mac:gsub(":", "-"):upper()) and "HOST" or "NON_HOST"
			list[#list].name = clientmgmt.match_history_list(list[#list].mac) or list[#list].name
        end
    )
    return list
end

local function request_client_list()
    local client = require "luci.model.client_mgmt"
    client.init()
    local client_list = client.get_client_list()

    local ret = {}
    local user_mac    = get_user_mac():gsub(":", "-"):upper()
    local enable      = uci_r:get("access_control", "settings", "enable")
    local access_mode = uci_r:get("access_control", "settings", "access_mode")
    local black_list  = get_list("black_list")
    local white_list  = get_list("white_list")
    local check       = true

    if client_list then
        for _, element in ipairs(client_list) do
            local tmp = {}
            tmp.name        = element.hostname
            tmp.ipaddr      = element.ip
            tmp.mac         = element.mac:gsub(":", "-"):upper()
            tmp.conn_type   = element.wire_type == "wired" and "wired" or "wireless"
            tmp.guest       = element.guest
            tmp.active      = element.active
            tmp.raw_conn_type = element.wire_type
            if tmp.mac == user_mac then
                tmp.host = "HOST"
            else
                tmp.host = "NON_HOST"
            end

            if enable == "on" then
                if access_mode == "black" then
                    check = true
                    for _, black in ipairs(black_list) do
                        if black.mac == tmp.mac then
                            check = false
                        end
                    end
        
                elseif access_mode == "white" then
                    check = false
                    for _, white in ipairs(white_list) do
                        if white.mac == tmp.mac then
                            check = true
                        end
                    end
                end
            end

            if check == true then
                ret[#ret + 1] = tmp
            end
        end
    end
    return ret
end

local function request_all_client_list()
    local client = require "luci.model.client_mgmt"
    client.init()
    local client_list = client.get_all_client_list()

    local ret = {}
    local user_mac    = get_user_mac():gsub(":", "-"):upper()
    local enable      = uci_r:get("access_control", "settings", "enable")
    local access_mode = uci_r:get("access_control", "settings", "access_mode")
    local black_list  = get_list("black_list")
    local white_list  = get_list("white_list")
    local check       = true

    if client_list then
        for _, element in ipairs(client_list) do
            local tmp = {}
            tmp.name        = element.hostname
            tmp.ipaddr      = element.ip
            tmp.mac         = element.mac:gsub(":", "-"):upper()
            tmp.conn_type   = element.wire_type == "wired" and "wired" or "wireless"
            tmp.guest       = element.guest
            tmp.active      = element.active
            tmp.raw_conn_type = element.wire_type
            if tmp.mac == user_mac then
                tmp.host = "HOST"
            else
                tmp.host = "NON_HOST"
            end

            if element.connect_status == 1 then
                tmp.online = "on"
            else
                tmp.online = "off"
            end

            if enable == "on" then
                if access_mode == "black" then
                    check = true
                    for _, black in ipairs(black_list) do
                        if black.mac == tmp.mac then
                            check = false
                        end
                    end
        
                elseif access_mode == "white" then
                    check = false
                    for _, white in ipairs(white_list) do
                        if white.mac == tmp.mac then
                            check = true
                        end
                    end
                end
            end

            if check == true then
                ret[#ret + 1] = tmp
            end
        end
    end
    return ret
end

local function tmp_request_client_list()
    local client_list = request_client_list()
    for _, client in ipairs(client_list) do
        if client.raw_conn_type == "wired" then
            client.conn_type = "wired"
        elseif client.raw_conn_type == "2.4G" then
            client.conn_type = "wireless_2g"
        elseif client.raw_conn_type == "5G" then
            client.conn_type = "wireless_5g"
        elseif client.raw_conn_type == "5G_2" then
            client.conn_type = "wireless_5g_2"
        elseif client.raw_conn_type == "6G" then
            client.conn_type = "wireless_6g"
		end
        if client.guest == "GUEST" then
            client.conn_type = client.conn_type .. "_guest"
        end 
        client.online = "on"
        client.blocked = "off"
        client.type = ""
        client.traffic_up = 0
        client.traffic_down = 0
    end
    return client_list
end

local function tmp_request_all_client_list()
    local client_list = request_all_client_list()
    _ubus = ubus.connect()
    local tfstats = _ubus:call("tfstats", "get", {})
    local hist_list = _ubus:call("client_mgmt", "get_hist_list", {request_type=0})
    for _, client in ipairs(client_list) do
        if client.raw_conn_type == "wired" then
            client.conn_type = "wired"
        elseif client.raw_conn_type == "2.4G" then
            client.conn_type = "wireless_2g"
        elseif client.raw_conn_type == "5G" then
            client.conn_type = "wireless_5g"
        elseif client.raw_conn_type == "5G_2" then
            client.conn_type = "wireless_5g_2"
        elseif client.raw_conn_type == "6G" then
            client.conn_type = "wireless_6g"
        elseif client.raw_conn_type == "iot_2.4G" then
            client.conn_type = "wireless_2g_iot"
        elseif client.raw_conn_type == "iot_5G" then
            client.conn_type = "wireless_5g_iot"
        elseif client.raw_conn_type == "UNKNOW" then
            client.conn_type = "" 
        end
        if client.guest == "GUEST" then
            client.conn_type = client.conn_type .. "_guest"
        end 
        -- client.online = "on"
        client.blocked = "off"

        client.type = ""
        for _,v in ipairs(hist_list) do
            if client.mac == v.mac then 
                client.type = v.device_type
                break
            end
        end
        client.traffic_up = 0
        client.traffic_down = 0
        for _,v in ipairs(tfstats.tfslist) do
            dbg.print(v.mac:upper())
            if client.mac == v.mac:upper() then 
                dbg.print(v.total_rx_byte)
                dbg.print(v.total_tx_byte)
                client.traffic_up = v.total_tx_byte
                client.traffic_down = v.total_rx_byte
                break
            end
        end
    end
    return client_list
end

local function white_delete(cfg, stype, key, index, user_mac)

    if not cfg or not stype or not key or not index then
        return false
    end
    
    local keys  = (type(key)=="table") and key or {key}
    local index = (type(index)=="table") and index or {index}
    local items = {}

    uci_r:foreach(cfg, stype,
        function(section)
            items[#items + 1] = section[".name"]
        end
    )   
    
    local rets = {}
    for k, v in ipairs(index) do
        -- check
        local sec = uci_r:get_all(cfg, items[v+1])
        sec.mac = (sec.mac):gsub("-", ":"):upper()
        if sec.mac == user_mac then
            local ret = {
                key     = keys[k],
                index   = v,
                success = false
            }
        else
            local ret = {
                key     = keys[k],
                index   = v,
                success = uci_r:delete(cfg, items[v+1]) and true or false
            }
        rets[#rets+1] = ret
        end

    end

    uci_r:commit(cfg)
    return rets
end

function check_access_control_mode(access_mode)
    local client = require "luci.model.client_mgmt"
    local ret = {}
    local black_list  = get_list("black_list")
    local items = {}

    ret.access_mode = access_mode or "black"

    if ret.access_mode == "white" then
        client.init()
        local client_list = client.get_client_list()
        if client_list then
            local max_count = uci_r:get_profile("access_control", "max_dev")
	    local count     = form:count("access_control", "white_list")
            local white_list  = get_list("white_list")
            local white_insert = {}
            local white_not_insert = {}
            
            for client_k, client_element in ipairs(client_list) do
                local flag = false
                for white_k, white_element in ipairs(white_list) do
                    if ( (client_element.mac:gsub("-", ":"):upper()) == (white_element.mac:gsub("-", ":"):upper()) ) then
                        flag = true
                        break
                    end
                end
                if not flag then
                    white_insert[#white_insert + 1] = {}
                    white_insert[#white_insert].name = client_element.hostname
                    white_insert[#white_insert].mac = client_element.mac:gsub("-", ":"):upper()
                else
                    white_not_insert[#white_not_insert + 1] = {}
                    white_not_insert[#white_not_insert].name = client_element.hostname
                    white_not_insert[#white_not_insert].mac = client_element.mac:gsub("-", ":"):upper()
                end
            end

            if( (#white_insert >= 1) and ((#white_insert + count) <=max_count) ) then
                for k, element in ipairs(white_insert) do
                local tmp = {}
                    tmp.name        = element.name
                tmp.mac         = element.mac:gsub("-", ":"):upper()
                form:insert("access_control", "white_list", tmp)
            end
            end

            local white_insert_num = #white_insert
            if( (#white_insert >= 1) and ((#white_insert + count) >max_count) ) then
				local off_set = max_count - count
                uci_r:delete_all("access_control", "white_list")
                for i=(#white_insert+1), max_count do
                    white_insert[#white_insert + 1] = {}
                    white_insert[#white_insert].name = white_list[#white_insert-off_set].name
                    white_insert[#white_insert].mac = white_list[#white_insert-off_set].mac:gsub("-", ":"):upper()
                end
                for not_insert_k, not_insert_element in ipairs(white_not_insert) do
                    local flag = false
                    for insert_k, insert_element in ipairs(white_insert) do
                        if ( (not_insert_element.mac:gsub("-", ":"):upper()) == (insert_element.mac:gsub("-", ":"):upper()) ) then
                            flag = true
                            break
                        end
                    end                   
                    if not flag then
                        white_insert_num = white_insert_num + 1
                        white_insert[white_insert_num].name = not_insert_element.name
                        white_insert[white_insert_num].mac = not_insert_element.mac:gsub("-", ":"):upper()
                    end
                end
                for k=max_count, 1, -1 do
                	local tmp = {}
                    tmp.name        = white_insert[k].name
                    tmp.mac         = white_insert[k].mac:gsub("-", ":"):upper()
                	form:insert("access_control", "white_list", tmp)
            	end
            end


        end
    end

    if ret.access_mode == "black" then
        for index, black in ipairs(black_list) do
            if user_mac_check(black.mac) == false then
                uci_r:foreach("access_control", "black_list",
                    function(section)
                        items[#items + 1] = section[".name"]
                    end
                )
                uci_r:delete("access_control", items[index])
            end
        end
    end

    uci_r:commit("access_control")
    return ret
end

-----------------------------------------------------------------------------------
-----------------------------------------------------------------------------------
function read_access_control_settings()
    local ret = {}
    ret.enable = uci_r:get("access_control", "settings", "enable") or "off"
    ret.host_mac = get_user_mac():gsub(":", "-"):upper()
    return ret
end

function write_access_control_settings(http_form)
    local ret = {}
    local enable = http_form.enable

    uci_r:set("access_control", "settings", "enable", enable)
    uci_r:commit("access_control")

    ret.enable = enable or "off"
    ret.host_mac = get_user_mac():gsub(":", "-"):upper()
    if ret.enable == "on" then
        check_access_control_mode("white")
        check_access_control_mode("black")
    end

    return ret
end


-----------------------------------------------------------------------------------
-----------------------------------------------------------------------------------

function read_access_control_mode()
    local ret = {}
    ret.access_mode = uci_r:get("access_control", "settings", "access_mode") or "black"
    return ret
end

function update_access_control_mode(http_form)
    local ret = {}
    local access_mode = http_form.access_mode

    uci_r:set("access_control", "settings", "access_mode", access_mode)
    ret.access_mode = access_mode or "black"

    if ret.access_mode == "white" then
        check_access_control_mode("white")
    end

    if ret.access_mode == "black" then
        check_access_control_mode("black")
    end

    uci_r:commit("access_control")
    return ret
end
-----------------------------------------------------------------------------------
-----------------------------------------------------------------------------------

function insert_black_devices(http_form)
    local ret_data = {}
    local devs = http_form.data
    devs   = luci.json.decode(devs)

    for _, dev in ipairs(devs) do
        local ret = {}
        ret.success = false
        ret.key = dev.key
      
        dev.mac = (dev.mac):gsub("-", ":"):upper()
        if user_mac_check(dev.mac) and profile_check("black_list") then
            ret = form:insert("access_control", "black_list", dev)
            ret = ret_check(ret)
        end
        ret_data[#ret_data + 1] = ret
    end

    uci_r:commit("access_control")
    return ret_data
end


-----------------------------------------------------------------------------------
-----------------------------------------------------------------------------------
function load_black_list()
    return get_list("black_list")
end

function tmp_load_black_list()
    local access_mode = uci_r:get("access_control", "settings", "access_mode") or "black"
    local enable      = uci_r:get("access_control", "settings", "enable") or "off"

    if enable == "on" and access_mode == "black" then
        local black_list = get_list("black_list")
        for _, client in ipairs(black_list) do
            client.online = "off"
            client.blocked = "on"
            client.type = ""
            client.conn_type = ""
            client.traffic_up = 0
            client.traffic_down = 0
        end

        return black_list
    else
        dbg("access_control off or in white list mode")
        return {}
    end
end

function get_max_dev()
    return get_others("max_dev")
end

function insert_black_list(http_form)
    local ret  = {}
    local new  = luci.json.decode(http_form.new)
    new.mac    = (new.mac):gsub("-", ":"):upper()

    if user_mac_check(new.mac) and profile_check("black_list") then
		clientmgmt.set_client_nickname((new.mac):gsub(":", ""):upper(), new.name)
        ret = form:insert("access_control", "black_list", new)
        ret = ret_check(ret)
    end

    uci_r:commit("access_control")
    return ret
end

function tmp_insert_black_list(lua_form)
    local new  = {}

    new.mac    = (lua_form.mac):gsub("-", ":"):upper()
    new.name   = "network device"

    if profile_check("black_list") then
        ret = form:insert("access_control", "black_list", new)
        ret = ret_check(ret)


        uci_r:set("access_control", "settings", "enable", "on")
        uci_r:set("access_control", "settings", "access_mode", "black")
    end

    uci_r:commit("access_control")
    return ret
end

function update_black_list(http_form)
    local ret   = {}
    local old   = luci.json.decode(http_form.old)
    local new   = luci.json.decode(http_form.new)
    new.mac = (new.mac):gsub("-", ":"):upper()
    old.mac = (old.mac):gsub("-", ":"):upper()

    if user_mac_check(new.mac) then
		clientmgmt.set_client_nickname((new.mac):gsub(":", ""):upper(), new.name)
        ret = form:update("access_control", "black_list", {name=old.name, mac=old.mac}, {name=new.name, mac=new.mac})
        ret = ret_check(ret)
    end

    uci_r:commit("access_control")
    return ret
end

function remove_black_list(http_form)
    local key   = http_form.key
    local index = http_form.index
    local ret   = form:delete("access_control", "black_list", key, index)

    uci_r:commit("access_control")
    return ret
end

function tmp_remove_black_list(lua_form)
    lua_form.mac = lua_form.mac:gsub(":", "-"):upper()
    uci_r:delete_all("access_control", "black_list",
        function(section)
            old_dev = uci_r:get_all("access_control", section[".name"])
            old_dev.mac = old_dev.mac:gsub(":", "-"):upper()
            return old_dev.mac == lua_form.mac
        end
    )
    uci_r:commit("access_control")
    return true
end

function remove_offline_client(macaddr)
    local flag = 0
    res = clientmgmt.remove_offline_client(macaddr)
    if "success" == res.result
    then
        return 0
    else
        return -1
    end
end

-----------------------------------------------------------------------------------
-----------------------------------------------------------------------------------
function load_white_list()
    return get_list("white_list")
end

function insert_white_list(http_form)
    local ret  = {}
    local new  = luci.json.decode(http_form.new)

    if not ctypes.check_mac(new.mac) then
        return false, "invalid new params"
    end

    new.mac = (new.mac):gsub("-", ":"):upper()
    if profile_check("white_list") then
		clientmgmt.set_client_nickname((new.mac):gsub(":", ""):upper(), new.name)
        ret = form:insert("access_control", "white_list", new)
        ret = ret_check(ret)
    end

    uci_r:commit("access_control")
    return ret
end

function update_white_list(http_form)
    local ret   = {}
    local old   = luci.json.decode(http_form.old)
    local new   = luci.json.decode(http_form.new)
    if not ctypes.check_mac(old.mac) then
        return false, "invalid new params"
    end

    if not ctypes.check_mac(new.mac) then
        return false, "invalid new params"
    end
    -- check
    local user_mac = get_user_mac():gsub("-", ":"):upper()
    old.mac = (old.mac):gsub("-", ":"):upper()
    new.mac = (new.mac):gsub("-", ":"):upper()

    if old.mac ~= user_mac or new.mac == user_mac then
		clientmgmt.set_client_nickname((new.mac):gsub(":", ""):upper(), new.name)
        ret = form:update("access_control", "white_list", {name=old.name, mac=old.mac}, {name=new.name, mac=new.mac})
        ret = ret_check(ret)
    end

    uci_r:commit("access_control")
    return ret
end

function remove_white_list(http_form)
    local key   = http_form.key
    local index = http_form.index
    local user_mac = get_user_mac():gsub("-", ":"):upper()
    return white_delete("access_control", "white_list", key, index, user_mac)
end

function read_guest_enable()
    local ret = {}
    ret.enable = uci_r:get("access_control", "settings", "guest_enable") or "off"
    return ret
end

function write_guest_enable(http_form)
    local enable = http_form.enable or "off"
    uci_r:set("access_control", "settings", "guest_enable", enable)
    uci_r:commit("access_control")
    return read_guest_enable()
end


function tmp_load_basic(lua_form)
	local data = {}
	data.max_client = uci_r:get_profile("access_control", "max_dev")
	return data
end

function remove_offline_client_v1(lua_form)
    local ret = {}
    local mac = lua_form.offline_client_mac:gsub(":", "-"):upper()
    local is_clear_all = lua_form.is_clear_all
    ret.result = 1
    if is_clear_all == "1" then
        _ubus = ubus.connect()
        offline_list = _ubus:call("client_mgmt", "get_hist_list", {request_type=2})
        for k,v in pairs(offline_list) do
            if ( 0 ~= remove_offline_client(v.mac) ) then
                ret.result = 0
            end
        end
    else
        if mac ~= nil then
            if ( 0 ~= remove_offline_client(mac) ) then
                ret.result = 0
            end
        else
            ret.result = 0
        end
    end
    return ret
end

-----------------------------------------------------------------------------------
-----------------------------------------------------------------------------------
local dispatch_tbl = {
    enable = {
        ["read"]  = { cb  = read_access_control_settings },
        ["write"] = { cb  = write_access_control_settings,
                      cmd = "/etc/init.d/access_control reload" }        
    },

    mode = {
        ["read"]  = { cb  = read_access_control_mode },
        ["write"] = { cb  = update_access_control_mode,
                      cmd = "/etc/init.d/access_control reload" }        
    },

    black_devices = {
        ["load"]  = { cb  = request_client_list },
        ["tmp_load"]  = { cb  = tmp_request_client_list },
        ["tmp_load_all"]  = { cb  = tmp_request_all_client_list },
        ["block"] = { cb  = insert_black_devices,
                      cmd = "/etc/init.d/access_control reload" }        
    },

    white_devices = {
        ["load"]  = { cb  = request_client_list }      
    },

    black_list = {
        ["load"]   = { cb  = load_black_list,
                       others = get_max_dev },
        ["tmp_load"]  = { cb  = tmp_load_black_list },
        ["tmp_load_basic"]  = { cb  = tmp_load_basic },
        ["update"] = { cb  = update_black_list,
                       cmd = "/etc/init.d/access_control reload" },
        ["insert"] = { cb  = insert_black_list,
                       cmd = "/etc/init.d/access_control reload" }, 
        ["tmp_insert"] = { cb  = tmp_insert_black_list,
                       cmd = "/etc/init.d/access_control reload" },
        ["remove"] = { cb  = remove_black_list,
                       cmd = "/etc/init.d/access_control reload" },
        ["tmp_remove"] = { cb  = tmp_remove_black_list,
                       cmd = "/etc/init.d/access_control reload" }
    },

    white_list = {
        ["load"]   = { cb  = load_white_list,
                       others = get_max_dev },
        ["update"] = { cb  = update_white_list,
                       cmd = "/etc/init.d/access_control reload" },
        ["insert"] = { cb  = insert_white_list,
                       cmd = "/etc/init.d/access_control reload" }, 
        ["remove"] = { cb  = remove_white_list,
                       cmd = "/etc/init.d/access_control reload" }
    },

    guest_network = {
        ["read"] = { cb = read_guest_enable },
        ["write"] = { cb = write_guest_enable,
                      cmd = "/etc/init.d/access_control reload" }
    },
    
    offline_list = {
        ["remove_v1"] = { cb  = remove_offline_client_v1 }
    }

}

function dispatch(http_form)
    local function hook_cb(success, action)
        if success and action.cmd then
            sys.fork_exec(action.cmd)
        end
        return true
    end
    return ctl.dispatch(dispatch_tbl, http_form, {post_hook = hook_cb})
end

function access_control_dispatch(app_form)
    return ctl.dispatch(dispatch_tbl, app_form)
end

function _index()
    return ctl._index(dispatch)
end

function index()
    entry({"admin", "access_control"}, call("_index")).leaf = true
end