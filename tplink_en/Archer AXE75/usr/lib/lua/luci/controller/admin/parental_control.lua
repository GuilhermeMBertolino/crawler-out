--[[
Copyright(c) 2013 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  parental_control.lua
Details :  controller for parental_control.html webpage
Author  :  Hu Luyao <huluyao@tp-link.net>
Version :  1.0.0
Date    :  24Mar, 2014
]]--
module("luci.controller.admin.parental_control", package.seeall)

local nixio             = require "nixio"
local ubus              = require "ubus"
local uci               = require "luci.model.uci"
local sys               = require "luci.sys" 
local form              = require "luci.tools.form"
local dbg               = require "luci.tools.debug"
local ctl               = require "luci.model.controller"
local clientmgmt        = require "luci.model.client_mgmt"

local uci_r = uci.cursor()
form = form.Form(uci_r, {"mac"})
require "luci.json"

local function get_user_mac()
    local user_ip = sys.getenv("REMOTE_ADDR") -- get user ipaddr from uhttpd
    local user_mac
    local arptable = luci.sys.net.arptable()
    
    if arptable == nil then
        return "00-00-00-00-00-00"
    end
    for _, v in ipairs(arptable ) do
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
function read_parental_control_settings()
    local ret = {enable = uci_r:get("parental_control", "settings", "enable"), 
                 host_mac = get_user_mac():gsub(":", "-"):upper(),
                 max_client = uci_r:get_profile("parental_control", "max_dev")}
    local device_list = {}

    uci_r:foreach("parental_control", "device",
        function(section)
            device_list[#device_list + 1] = uci_r:get_all("parental_control", section[".name"]) 
        end
    )
    ret.devNum = #device_list
    --dbg(ret.devNum)
    return ret
end

function write_parental_control_settings(http_form)
    uci_r:set("parental_control", "settings", "enable", http_form.enable)
    uci_r:commit("parental_control")
    return read_parental_control_settings()
end
-----------------------------------------------------------------------------------
-----------------------------------------------------------------------------------
function load_device()
    local device_list = {}

    uci_r:foreach("parental_control", "device",
        function(section)
            device_list[#device_list + 1] = uci_r:get_all("parental_control", section[".name"]) 
            device_list[#device_list].mac = device_list[#device_list].mac:gsub(":", "-"):upper()
			device_list[#device_list].name = clientmgmt.match_history_list(device_list[#device_list].mac) or device_list[#device_list].name
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

    uci_r:foreach("parental_control", "device",
        function(section)
            device_list[#device_list + 1] = uci_r:get_all("parental_control", section[".name"]) 
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
    others.max_rules = uci_r:get_profile("parental_control", "max_dev")
    return others
end

function insert_device(http_form)
    -- get data
    local ret = {}
    local new  = luci.json.decode(http_form.new)

    local user_mac = get_user_mac():gsub("-", ":"):upper()
    new.mac  = (new.mac):gsub("-", ":"):upper()

    local count = form:count("parental_control", "device")
    local max_count = uci_r:get_profile("parental_control", "max_dev")

    if new.mac ~= user_mac then
        if count < max_count then
            ret = form:insert("parental_control", "device", new)
            if ret then
                ret.mac = (ret.mac):gsub(":", "-")
				clientmgmt.set_client_nickname((ret.mac):gsub("-", ""):upper(), ret.name)
                ret.success = true
            else
                ret.success = false
            end
        end
    end

    uci_r:commit("parental_control")
    return ret

end

function update_device(http_form)
    local ret = false
    local old = luci.json.decode(http_form.old)
    local new = luci.json.decode(http_form.new)
  
    local user_mac = get_user_mac():gsub("-", ":"):upper()
    new.mac = (new.mac):gsub("-", ":"):upper()
    old.mac = (old.mac):gsub("-", ":"):upper()

    if new.mac ~= user_mac then
        ret = form:update("parental_control", "device", old, new)
        if ret then
            ret.mac = (ret.mac):gsub(":", "-")
			clientmgmt.set_client_nickname((ret.mac):gsub("-", ""):upper(), ret.name)
        end
    end

    uci_r:commit("parental_control")
    return ret
end

function remove_device(http_form)
    local key   = http_form.key
    local index = http_form.index
    local ret   = form:delete("parental_control", "device", key, index)
    
    uci_r:commit("parental_control")
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
    lua_form.calendar = tmp_time_to_lua_time(lua_form.calendar)
    local new = lua_form

    local user_mac = get_user_mac():gsub("-", ":"):upper()
    new.mac  = (new.mac):gsub("-", ":"):upper()

    local count = form:count("parental_control", "device")
    local max_count = uci_r:get_profile("parental_control", "max_dev")

    if new.mac ~= user_mac then
        if count < max_count then
            ret = form:insert("parental_control", "device", new)
            if ret then
                ret.mac = (ret.mac):gsub(":", "-")
                ret.success = true
            else
                ret.success = false
            end
        end
    end

    uci_r:commit("parental_control")

    return ret.success
end

function tmp_update_device(lua_form)
    local ret = {}
    lua_form.calendar = tmp_time_to_lua_time(lua_form.calendar)
    lua_form.mac = lua_form.mac:gsub(":", "-"):upper()

    uci_r:foreach("parental_control", "device",
        function(section)
            old_dev = uci_r:get_all("parental_control", section[".name"])
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
            ret = form:update("parental_control", "device", ret.old, ret.new)
            if ret then
                ret.mac = (ret.mac):gsub(":", "-")
            end
        end

        uci_r:commit("parental_control")
        return true
    else
        return false
    end
end

function tmp_remove_device(lua_form)
    lua_form.mac = lua_form.mac:gsub(":", "-"):upper()
    uci_r:delete_all("parental_control", "device",
        function(section)
            old_dev = uci_r:get_all("parental_control", section[".name"])
            old_dev.mac = old_dev.mac:gsub(":", "-"):upper()
            return old_dev.mac == lua_form.mac
        end
    )
    uci_r:commit("parental_control")
    return true
end


-----------------------------------------------------------------------------------
-----------------------------------------------------------------------------------
function special_change(rt)
    rt = string.gsub(rt,"\\","\\\\")
    rt = string.gsub(rt,"\"","\\\"")
    return rt
end

function read_parental_control_mode()
    local ret = {}
    local access_mode = uci_r:get("parental_control", "settings", "access_mode")

    local ret_black = "["
    local ret_white = "["
    
    local black = uci_r:get_list("parental_control", "black_list", "key")
    local white = uci_r:get_list("parental_control", "white_list", "url")

    for _, rt in ipairs(black) do
        ret_black = ret_black .. "\""..special_change(rt).. "\"".. ','
     
    end
    ret_black = ret_black .. ']'
    ret_black = ret_black:gsub(",]", "]")

    for _, rt in ipairs(white) do
        ret_white = ret_white .. "\""..rt.. "\"".. ','
    end
    ret_white = ret_white .. ']'
    ret_white = ret_white:gsub(",]", "]")

    ret.access_mode = access_mode or "black"
    ret.black = ret_black or ""
    ret.white = ret_white or ""

    local others = {}
    others.max_rules_black = uci_r:get_profile("parental_control", "max_key")
    others.max_rules_white = uci_r:get_profile("parental_control", "max_url")

    -- warning: mode & urls is not a form, here is specicl "others" in data limited by UI
    ret.others = others
    
    return ret
end

function update_parental_control_list(http_form)
    local access_mode       = http_form.access_mode
    local http_black_list   = http_form.black
    local http_white_list   = http_form.white
    local black_list        = luci.json.decode(http_black_list)
    local white_list        = luci.json.decode(http_white_list)
    local max_count         = uci_r:get_profile("parental_control", "max_url")
    local max_len           = 255
    local len_flag          = 1
   
    if black_list ~= nil then 
        num_black_list = #black_list
        -- check profile limit 
        for _, v in ipairs(black_list) do
            if string.len(v) > max_len then
                len_flag = 0
            end
        end

        if (num_black_list <= max_count) and (len_flag == 1) then
            uci_r:set("parental_control", "settings", "access_mode", access_mode)
            uci_r:delete("parental_control", "black_list", "key")

            if num_black_list > 0 then
                uci_r:set_list("parental_control", "black_list", "key", black_list)
            end
        end

    elseif white_list ~= nil then
        num_white_list = #white_list
        for _, v in ipairs(white_list) do
            if string.len(v) > max_len then
                len_flag = 0
            end
        end

        if (num_white_list <= max_count) and (len_flag == 1) then
            uci_r:set("parental_control", "settings", "access_mode", access_mode)
            uci_r:delete("parental_control", "white_list", "url")

            if num_white_list > 0 then
                uci_r:set_list("parental_control", "white_list", "url", white_list)
            end
        end

    else
        return false, "can not get data from http"
    end

    uci_r:commit("parental_control")
    return read_parental_control_mode()
end

local function get_content_restriction(form)
    local enabled = uci_r:get("parental_control", "settings", "en_content") or "off"
    return {enable = enabled}
end

local function set_content_restriction(form)
    local enabled = form.enable or "off"
    --dbg("1.i come in. %s" % enabled) 
    uci_r:set("parental_control", "settings", "en_content", enabled)
    uci_r:commit("parental_control")
    return {enable = enabled}
end

local data_cache_path = "/tmp/cloud_data_cache/"
function save_cache(startIndex, data)
    local path = data_cache_path .. "wordList"
    local file = io.open(path, "a+")
    file:write(data)
    file:write("\n")
    file:close()
end

function read_cache()
    local path = data_cache_path .. "wordList"
    local file = io.open(path, "r")
    local cache = {}
    while true do
        local t = file:read("*l")
        if not t then 
            break
        end
        cache[#cache + 1] = t
    end
    if not nixio.fs.access(path) then
        return false
    end
    file:close()
    return cache
end

function websiteinfo_read()
    local ret = {}
    local access_mode = uci_r:get("parental_control", "settings", "access_mode")
    local listMax_white = uci_r:get_profile("parental_control", "max_url")
    local listMax_black = uci_r:get_profile("parental_control", "max_key")

    -- supportModes: 0:black and white 1:black 2:white
    ret.supportModes = 0;
    ret.currentMode = access_mode or "black"

    ret.listMax_black = uci_r:get_profile("parental_control", "max_url")
    ret.listMax_white = uci_r:get_profile("parental_control", "max_key")

    local ret_black = "["
    local ret_white = "["
    
    local black = uci_r:get_list("parental_control", "black_list", "key")
    local white = uci_r:get_list("parental_control", "white_list", "url")

    if black ~= nil then
        ret.listCount_black = #black
    else 
        ret.listCount_black = 0
    end
    --dbg(ret.listCount_black)

    if white ~= nil then
        ret.listCount_white = #white
    else 
        ret.listCount_white = 0
    end
    --dbg(ret.listCount_white)

    ret.wordMax_black = 255
    ret.wordMax_white = 255
    ret.enable = uci_r:get("parental_control", "settings", "en_content") == "on" and 1 
               or uci_r:get("parental_control", "settings", "en_content") == "off" and 0
               or 2
    return ret
end

function websiteinfo_write(lua_form)
    local access_mode = lua_form.currentMode

    uci_r:set("parental_control", "settings", "access_mode", access_mode)
    uci_r:commit("parental_control")

    return true
end

function websitelist_read(lua_form)
    local ret         = {}
    local access_mode = lua_form.mode
    local startIndex  = tonumber(lua_form.startIndex)
    local amount      = tonumber(lua_form.amount)

    local count       = 0

    if access_mode == "blacklist" then
        local ret_black = "["
        local black = uci_r:get_list("parental_control", "black_list", "key")
        if black ~= nil then
            num_black_list = #black
        else 
            num_black_list = 0
        end
        if (amount > num_black_list) then
            amount = num_black_list
        end
        if startIndex == 0 then
            for _, rt in ipairs(black) do
                count = count + 1
                ret_black = ret_black .. "\""..rt.. "\"".. ','
                if (count == amount) then
                    break
                end
            end
        else
            for _,rt in ipairs(black) do
                count = count + 1
                if (count > startIndex) and (count - startIndex <= amount) then
                    ret_black = ret_black .. "\""..rt.. "\"".. ','
                end
                if (count - startIndex > amount) then
                    break
                end
            end
        end
        ret_black = ret_black .. ']'
        ret_black = ret_black:gsub(",]", "]")
        ret.wordList = ret_black or ""
        sum = num_black_list

    elseif access_mode == "whitelist" then
        local ret_white = "["
        local white = uci_r:get_list("parental_control", "white_list", "url")
        if white ~= nil then
            num_white_list = #white
        else 
            num_white_list = 0
        end
        if startIndex == 0 then
            for _, rt in ipairs(white) do
                count = count + 1
                ret_white = ret_white .. "\""..rt.. "\"".. ','
                if (count == amount) then
                    break
                end
            end
        else
            for _,rt in ipairs(white) do
                count = count + 1
                if (count > startIndex) and (count - startIndex <= amount) then
                    ret_white = ret_white .. "\""..rt.. "\"".. ','
                end
                if (count - startIndex > amount) then
                    break
                end
            end
        end
        ret_white = ret_white .. ']'
        ret_white = ret_white:gsub(",]", "]")
        ret.wordList = ret_white or ""
        sum = num_white_list
    end
    ret.mode       = access_mode
    ret.startIndex = startIndex
    ret.amount     = amount
    ret.sum        = sum
    return ret
end

function websitelist_write(lua_form)
    if not nixio.fs.access(data_cache_path) then
        sys.call("mkdir " .. data_cache_path)
    end
    local access_mode = lua_form.mode
    local startIndex = tonumber(lua_form.startIndex)
    local sum = tonumber(lua_form.sum)
    local amount = tonumber(lua_form.amount)
    local lua_wordList = lua_form.wordList
    local wordList = luci.json.decode(lua_wordList)
    local max_count = uci_r:get_profile("parental_control", "max_url")

    local p_sum = startIndex + amount
    if p_sum < sum then
        for _,word in ipairs(wordList) do
            --dbg(word)
            save_cache(startIndex, word)
        end
        return true, "wait for next"
    end

    if p_sum == sum and startIndex ~= 0 then
        for _,word in ipairs(wordList) do
            --dbg(word)
            save_cache(startIndex, word)
        end
        wordList = read_cache()
    end

    if access_mode == "blacklist" then
        if wordList ~= nil then
            access_mode = "black"
            uci_r:set("parental_control", "settings", "access_mode", access_mode)
            num_wordList = #wordList
            if (num_wordList <= max_count ) and (num_wordList > 0) then
                uci_r:delete("parental_control", "black_list", "key")
                uci_r:set_list("parental_control", "black_list", "key", wordList)
            elseif (num_wordList == 0) then
                uci_r:delete("parental_control", "black_list", "key")
            else
                return false, "too many key"
            end
        end
    elseif access_mode == "whitelist" then
        if wordList ~= nil then
            access_mode = "white"
            uci_r:set("parental_control", "settings", "access_mode", access_mode)
            num_wordList = #wordList
            if (num_wordList <= max_count ) and (num_wordList > 0) then
                uci_r:delete("parental_control", "white_list", "url")
                uci_r:set_list("parental_control", "white_list", "url", wordList)
            elseif (num_wordList == 0) then
                uci_r:delete("parental_control", "white_list", "url")
            else
                return false, "too many url"
            end
        end
    else 
        return false, "can not get data from lua"
    end
    uci_r:commit("parental_control")
    sys.fork_exec("rm -f /tmp/cloud_data_cache/*")
    return true
end
-----------------------------------------------------------------------------------
-----------------------------------------------------------------------------------

local dispatch_tbl = {
    enable_content = {
        ["read"]  = { cb  = get_content_restriction },
        ["write"] = { cb  = set_content_restriction,
                      cmd = "/etc/init.d/parental_control reload" }
    },
    
    enable = {
        ["read"]  = { cb  = read_parental_control_settings },
        ["write"] = { cb  = write_parental_control_settings,
                      cmd = "/etc/init.d/parental_control reload" }        
    },

    mode = {
        ["read"]  = { cb  = read_parental_control_mode },
        ["write"] = { cb  = update_parental_control_list,
                      cmd = "/etc/init.d/parental_control reload" }        
    },

    device = {
        ["load"]   = { cb  = load_device,
                       others = get_max_dev },
        ["update"] = { cb  = update_device,
                       cmd = "/etc/init.d/parental_control reload" },
        ["insert"] = { cb  = insert_device,
                       cmd = "/etc/init.d/parental_control reload" }, 
        ["remove"] = { cb  = remove_device,
                       cmd = "/etc/init.d/parental_control reload" },

        ["tmp_load"]   = { cb  = tmp_load_device },
        ["tmp_update"]   = { cb  = tmp_update_device, 
                             cmd = "/etc/init.d/parental_control reload" },
        ["tmp_insert"]   = { cb  = tmp_insert_device,
                             cmd = "/etc/init.d/parental_control reload" },
        ["tmp_remove"]   = { cb  = tmp_remove_device,
                             cmd = "/etc/init.d/parental_control reload" }
    },

    websiteinfo = {
        ["read"]  = { cb  = websiteinfo_read },
        ["write"] = { cb  = websiteinfo_write,
                      cmd = "/etc/init.d/parental_control reload" }
    },

    websitelist = {
        ["read"]  = { cb  = websitelist_read },
        ["write"] = { cb  = websitelist_write,
                      cmd = "/etc/init.d/parental_control reload" }
    }
}

function dispatch(http_form)
    local function hook_cb(success, action)
        if success and action.cmd then
            sys.fork_exec(action.cmd)
            sys.fork_exec("[ -f /usr/bin/wportalctrl ] && wportalctrl -c && echo stop > /tmp/wportal/status && /etc/hotplug.d/iface/99-wportal")
        end
        return true
    end
    return ctl.dispatch(dispatch_tbl, http_form, {post_hook = hook_cb})
end

function _index()
    return ctl._index(dispatch)
end

function index()
    entry({"admin", "parental_control"}, call("_index")).leaf = true
end
