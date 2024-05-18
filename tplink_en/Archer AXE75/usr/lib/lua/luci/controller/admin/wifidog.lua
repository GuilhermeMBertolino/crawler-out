--[[Copyright(c) 2014 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  wifidog.lua
Details :  wifidog http response operation
Author  :  Liu Kun <liukun_w8220@tp-link.net>
           
Version :  1.1.1
Date    :  24JUN, 2016
]]--

module("luci.controller.admin.wifidog", package.seeall)

local uci       = require "luci.model.uci"
local http      = require "luci.http"
local debug     = require "luci.tools.debug"
local sys       = require "luci.sys"
local nixio     = require "nixio"
local ctl       = require "luci.model.controller"
local fs        = require "luci.fs"
local util   	= require "luci.util"
local fmup      = require "luci.model.fmup"
local uci_r = uci.cursor()

require "luci.json"

local small_mem = uci_r:get_profile("global", "small_mem") or "no"
local REBOOT_TIME = uci_r:get_profile("global", "reboot_time") or 60
local UPGRADE_TIME = uci_r:get_profile("global", "upgrade_time") or 120
local LOGO_TMP_PATH = "/tmp/portal_logo.jpg"
local BACK_TMP_PATH = "/tmp/portal_back.jpg"
local firmware_lock = "/tmp/firmware_lock.lua"
local DEFAULT_LOGO_PATH = "/etc/wifidog/portal-head.png"
local DEFAULT_BACK_PATH = "/etc/wifidog/portal.jpg"
local IMG_BACKGROUND_LIMIT_SIZE = 2*1024*1024
local IMG_LOGO_LIMIT_SIZE = 100*1024
local is_img_ok = 1;
local nandflash = 1;
local DEFAULT_NANDFLASH_LOGO_PATH = "/storage/portal_logo_default.jpg"
local DEFAULT_NANDFLASH_BACK_PATH = "/storage/portal_back_default.jpg"
local USER_NANDFLASH_LOGO_PATH = "/storage/portal_logo_user.jpg"
local USER_NANDFLASH_BACK_PATH = "/storage/portal_back_user.jpg"


function file_exists(path)  
    local file = io.open(path, "rb")  
    if file then 
        file:close()
    end

    return file ~= nil
end

function portal_logo_read()
    local ret
    if nixio.fs.access(LOGO_TMP_PATH) then
        ret = {imglogopath = LOGO_TMP_PATH}
    else
        ret = {imglogopath = DEFAULT_LOGO_PATH}
    end
    return ret
end

function portal_logo_write()
    luci.http.prepare_content("text/plain;charset=UTF-8")
    local ret
    if is_img_ok == 1 and nandflash == 1 then
        --luci.sys.exec("cp /tmp/portal_logo.jpg tmp/portal_logo_user.jpg") 
        --debug.printf("cp logo to nandflash")  
        --os.execute("cp -a /tmp/portal_logo.jpg /tmp/portal_logo_user.jpg")
        luci.sys.exec("cp -a " .. LOGO_TMP_PATH .. " " .. USER_NANDFLASH_LOGO_PATH .. " ")
    end
    
    if is_img_ok == 1 then
        ret = {imgstatus = "true"}
        return ret
    else
        ret = {imgstatus = "false"}
        return ret
    end
    
end

function portal_back_read()
    --debug.printf("back_read")
    local ret
    if nixio.fs.access(BACK_TMP_PATH) then
        ret = {imgbgrpath = BACK_TMP_PATH}
    else
        ret = {imgbgrpath = DEFAULT_BACK_PATH}
        --debug.printf("user set BACKGROUND not exist")
    end
    return ret
end

function portal_back_write()
    --debug.printf("back_write")
    luci.http.prepare_content("text/plain;charset=UTF-8")
    local ret
    if is_img_ok == 1 and nandflash == 1 then
        --luci.sys.exec("cp /tmp/portal_logo.jpg tmp/portal_logo_user.jpg") 
        --debug.printf("cp back to nandflash")  
        --os.execute("cp -a /tmp/portal_logo.jpg /tmp/portal_logo_user.jpg")
        luci.sys.exec("cp -a " .. BACK_TMP_PATH .. " " .. USER_NANDFLASH_BACK_PATH .. " ")
    end

    if is_img_ok == 1 then
        ret = {imgstatus = "true"}
        return ret
    else
        ret = {imgstatus = "false"}
        return ret
    end
end

function portal_content_read()
    debug.printf("content_read")
end

function portal_content_write()
    debug.printf("content_write")
end

local dispatch_tbl = {
	portal_logo = {
        ["read"]        = { cb = portal_logo_read },
        ["upload"]  	= { cb = portal_logo_write },
    },

    portal_background = {
        ["read"]        = { cb = portal_back_read },
        ["upload"]      = { cb = portal_back_write },
    },

    portal_content = {
        ["read"]        = { cb = portal_content_read },
        ["upload"]      = { cb = portal_content_write },
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

function _index()
    local fp
    local which_form
    local file_length = tonumber(luci.sys.getenv("CONTENT_LENGTH"))
    which_form = luci.sys.getenv("QUERY_STRING")
    if which_form and which_form == "form=portal_background" then
        if file_length > IMG_BACKGROUND_LIMIT_SIZE then
            is_img_ok = 0
        end 
    end
    if which_form and which_form == "form=portal_logo" then
        if file_length > IMG_LOGO_LIMIT_SIZE then
            is_img_ok = 0
        end 
    end
    if tonumber(is_img_ok) > 0 then
    luci.http.setfilehandler(
        function(meta, chunk, eof)
            if not fp then
                if meta and meta.name == "background" then 
                    fp = io.open(BACK_TMP_PATH, "w")
                else
                    fp = io.open(LOGO_TMP_PATH, "w")
                end
            end
            if fp and chunk then
                fp:write(chunk)
            end
            if fp and eof then
                fp:close()
            end
        end
    )
    end
    return ctl._index(dispatch)
end

function index()
    entry({"admin", "wifidog"}, call("_index")).leaf = true
end