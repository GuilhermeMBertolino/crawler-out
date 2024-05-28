--[[
Copyright(c) 2013 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  yandex_dns.lua
Details :  controller for yandex_dns.html webpage
Author  :  Zhu Shuxin <zhushuxin@tp-link.net>
Version :  1.0.0
Date    :  24Mar, 2014
]]--
module("luci.controller.admin.yandex_dns", package.seeall)

local ubus              = require "ubus"
local uci               = require "luci.model.uci"
local sys               = require "luci.sys" 
local form              = require "luci.tools.form"
local dbg               = require "luci.tools.debug"
local ctl               = require "luci.model.controller"

local uci_r = uci.cursor()
form = form.Form(uci_r, {"mac"})
require "luci.json"

local function get_user_mac()
    local user_ip = sys.getenv("REMOTE_ADDR") -- get user ipaddr from uhttpd
    local user_mac

    for _, v in ipairs(luci.sys.net.arptable()) do
        if user_ip and user_ip == v["IP address"] then
            user_mac = v["HW address"]
            break
        end
    end

    if user_mac == nil then
        user_mac = "00-00-00-00-00-00"
    end

    return user_mac
end
-----------------------------------------------------------------------------------
-----------------------------------------------------------------------------------
function read_yandex_dns_settings()
    local ret = {enable = uci_r:get("yandex_dns", "settings", "enable"), 
                 host_mac = get_user_mac():gsub(":", "-"):upper(),
				 max_client = uci_r:get_profile("yandex_dns", "max_dev")}
    return ret
end

function write_yandex_dns_settings(http_form)
    uci_r:set("yandex_dns", "settings", "enable", http_form.enable)
    uci_r:commit("yandex_dns")
    return read_yandex_dns_settings()
end
-----------------------------------------------------------------------------------
-----------------------------------------------------------------------------------
function read_yandex_dns_mode()
    local ret = {yandex_mode = uci_r:get("yandex_dns", "settings", "mode")}
    return ret
end

function write_yandex_dns_mode(http_form)
    uci_r:set("yandex_dns", "settings", "mode", http_form.yandex_mode)
    uci_r:commit("yandex_dns")
    return read_yandex_dns_mode()
end
-----------------------------------------------------------------------------------
-----------------------------------------------------------------------------------
function load_device()
    local device_list = {}

    uci_r:foreach("yandex_dns", "device",
        function(section)
            device_list[#device_list + 1] = uci_r:get_all("yandex_dns", section[".name"]) 
            device_list[#device_list].mac = device_list[#device_list].mac:gsub(":", "-"):upper()
            if device_list[#device_list].calendar == nil then
                device_list[#device_list].calendar = "{}"
            end
			if device_list[#device_list].note == nil then
				device_list[#device_list].note = ""
			end
        end
    )

    return device_list
end

function tmp_load_device()
    local device_list = {}

    uci_r:foreach("yandex_dns", "device",
        function(section)
            device_list[#device_list + 1] = uci_r:get_all("yandex_dns", section[".name"]) 
            device_list[#device_list].mac = device_list[#device_list].mac:gsub(":", "-"):upper()
            if device_list[#device_list].calendar == nil then
                device_list[#device_list].calendar = "{}"    
            end
            device_list[#device_list].calendar = lua_time_to_tmp_time(device_list[#device_list].calendar)
        end
    )

    return device_list
end

function get_max_dev()
    local others = {}
    others.max_rules = uci_r:get_profile("yandex_dns", "max_dev")
    return others
end

function insert_device(http_form)
    -- get data
    local ret = {}
    local new  = luci.json.decode(http_form.new)

    local user_mac = get_user_mac():gsub("-", ":"):upper()
    new.mac  = (new.mac):gsub("-", ":"):upper()

    local count = form:count("yandex_dns", "device")
    local max_count = uci_r:get_profile("yandex_dns", "max_dev")

    --if new.mac ~= user_mac then
        if count < max_count then
            ret = form:insert("yandex_dns", "device", new)
            if ret then
                ret.mac = (ret.mac):gsub(":", "-")
                ret.success = true
            else
                ret.success = false
            end
        end
    --end

    uci_r:commit("yandex_dns")
    return ret

end

function update_device(http_form)
    local ret = false
    local old = luci.json.decode(http_form.old)
    local new = luci.json.decode(http_form.new)
  
    local user_mac = get_user_mac():gsub("-", ":"):upper()
    new.mac = (new.mac):gsub("-", ":"):upper()
    old.mac = (old.mac):gsub("-", ":"):upper()

    --if new.mac ~= user_mac then
        ret = form:update("yandex_dns", "device", old, new)
        if ret then
            ret.mac = (ret.mac):gsub(":", "-")
        end
    --end

    uci_r:commit("yandex_dns")
    return ret
end

function remove_device(http_form)
    local key   = http_form.key
    local index = http_form.index
    local ret   = form:delete("yandex_dns", "device", key, index)
    
    uci_r:commit("yandex_dns")
    return ret

end

function lua_time_to_tmp_time(calendar)
    local tsched = require "tsched_conf"
    return tsched.calendar_to_bytestring(calendar)
end
function tmp_time_to_lua_time(calendar)
    local tsched = require "tsched_conf"
    return tsched.bytestring_to_calendar(calendar)
end

function tmp_insert_device(lua_form)
    local ret = {}
    --lua_form.calendar = tmp_time_to_lua_time(lua_form.calendar)
    local new = lua_form

    local user_mac = get_user_mac():gsub("-", ":"):upper()
    new.mac  = (new.mac):gsub("-", ":"):upper()

    local count = form:count("yandex_dns", "device")
    local max_count = uci_r:get_profile("yandex_dns", "max_dev")

    if new.mac ~= user_mac then
        if count < max_count then
            ret = form:insert("yandex_dns", "device", new)
            if ret then
                ret.mac = (ret.mac):gsub(":", "-")
                ret.success = true
            else
                ret.success = false
            end
        end
    end

    uci_r:commit("yandex_dns")

    return ret.success
end

function tmp_update_device(lua_form)
    local ret = {}
    --lua_form.calendar = tmp_time_to_lua_time(lua_form.calendar)
    lua_form.mac = lua_form.mac:gsub(":", "-"):upper()

    uci_r:foreach("yandex_dns", "device",
        function(section)
            old_dev = uci_r:get_all("yandex_dns", section[".name"])
            old_dev.mac = old_dev.mac:gsub(":", "-"):upper()
            if old_dev.mac == lua_form.mac then
                ret.old = old_dev
                ret.new = lua_form
            end
        end
    )

    if ret.new ~= nil then
        dbg.dumptable(ret)
        
        local user_mac = get_user_mac():gsub("-", ":"):upper()
        ret.new.mac = (ret.new.mac):gsub("-", ":"):upper()
        ret.old.mac = (ret.old.mac):gsub("-", ":"):upper()

        if ret.new.mac ~= user_mac then
            ret = form:update("yandex_dns", "device", ret.old, ret.new)
            if ret then
                ret.mac = (ret.mac):gsub(":", "-")
            end
        end

        uci_r:commit("yandex_dns")
        return true
    else
        return false
    end
end

function tmp_remove_device(lua_form)
    lua_form.mac = lua_form.mac:gsub(":", "-"):upper()
    uci_r:delete_all("yandex_dns", "device",
        function(section)
            old_dev = uci_r:get_all("yandex_dns", section[".name"])
            old_dev.mac = old_dev.mac:gsub(":", "-"):upper()
            return old_dev.mac == lua_form.mac
        end
    )
    uci_r:commit("yandex_dns")
    return true
end

-----------------------------------------------------------------------------------
-----------------------------------------------------------------------------------

local dispatch_tbl = {
    enable = {
        ["read"]  = { cb  = read_yandex_dns_settings },
        ["write"] = { cb  = write_yandex_dns_settings,
                      cmd = "/etc/init.d/yandex_dns reload" }        
    },

    setting = {
        ["read"]  = { cb  = read_yandex_dns_mode },
        ["write"] = { cb  = write_yandex_dns_mode,
                      cmd = "/etc/init.d/yandex_dns reload" }     
    },

    device = {
        ["load"]   = { cb  = load_device,
                       others = get_max_dev },
        ["update"] = { cb  = update_device,
                       cmd = "/etc/init.d/yandex_dns reload" },
        ["insert"] = { cb  = insert_device,
                       cmd = "/etc/init.d/yandex_dns reload" }, 
        ["remove"] = { cb  = remove_device,
                       cmd = "/etc/init.d/yandex_dns reload" },

        ["tmp_load"]   = { cb  = tmp_load_device },
        ["tmp_update"]   = { cb  = tmp_update_device, 
                             cmd = "/etc/init.d/yandex_dns reload" },
        ["tmp_insert"]   = { cb  = tmp_insert_device,
                             cmd = "/etc/init.d/yandex_dns reload" },
        ["tmp_remove"]   = { cb  = tmp_remove_device,
                             cmd = "/etc/init.d/yandex_dns reload" }
    }
}

function dispatch(http_form)
    local function hook_cb(success, action)
        if success and action.cmd then
            sys.fork_exec(action.cmd)
            --sys.fork_exec("[ -f /usr/bin/wportalctrl ] && wportalctrl -c && echo stop > /tmp/wportal/status && /etc/hotplug.d/iface/99-wportal")
        end
        return true
    end
    return ctl.dispatch(dispatch_tbl, http_form, {post_hook = hook_cb})
end

function _index()
    return ctl._index(dispatch)
end

function index()
    entry({"admin", "yandex_dns"}, call("_index")).leaf = true
end
