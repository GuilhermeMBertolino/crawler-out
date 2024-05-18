--[[
Copyright(c) 2008-2014 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  locale.lua
Details :  Get the locale info.
Author  :  Zhang Zhongwei <zhangzhongwei@tp-link.net>
Version :  1.0.0
Date    :  13 May, 2014
]]--

module("luci.controller.locale", package.seeall)


local nixio = require "nixio"
local uci   = require "luci.model.uci"
local dbg   = require "luci.tools.debug"
local ctl   = require "luci.model.controller"
local log   = require("luci.model.log").Log(283)
local sys   = require "luci.sys"

local LOCALECFG = "locale"                   -- Config file name.

function log_dbg(msgid, ...)
    log(msgid, ...)
end

function get_sysinfo(formvals)
    local uci_r = uci.cursor()
    local select_permission = uci_r:get_profile("region","select_permission") or "yes"

    local data = {
        locale = uci_r:get(LOCALECFG, "sysinfo", "default") or "en_US",
        force  = uci_r:get(LOCALECFG, "sysinfo", "force") == "true" and true or false,
        model  = uci_r:get(LOCALECFG, "sysinfo", "model") or "AC1900",
        rebootTime = uci_r:get_profile("global", "reboot_time") or 75,
        region_select_permission = select_permission
    }
    
    if data.force then
        return data
    end

    sys.call("[ -f /sbin/lang_get ] && lang_get") --nvram get locale

    uci_r = uci.cursor() --reload config
    local locale = uci_r:get(LOCALECFG, "sysinfo", "locale") or ""
    -- Check whether language has been changed by user.
    if locale == "" then
        -- Get the explorer language.  (e.g. "en-US")
        local web_lang = luci.http.getenv("HTTP_ACCEPT_LANGUAGE") or ""
        local pos      = web_lang:find(",") or 1
        web_lang       = web_lang:sub(1, pos - 1)

        -- Check whether the language package is existed.
        if web_lang and web_lang ~= "" then
            -- Change "en-US" to "en_US".
            locale = web_lang:gsub('-', '_')
            log(2, locale)  -- explorer language is XXX
        else
            -- set default locale
            locale = data.locale
        end
	
    end

    local file_path  = "/www/webpages/locale/" .. locale .. "/lan.js"

    -- Check the path to determined whether the language is supported.
    if nixio.fs.stat(file_path) then
        data.locale = locale
    else
        data.locale = "en_US"
    end

    local orig_locale = uci_r:get(LOCALECFG, "sysinfo", "locale") or ""
    if orig_locale ~= data.locale then
        uci_r:set(LOCALECFG, "sysinfo", "locale", data.locale)
        uci_r:commit(LOCALECFG)
        --log(51, data.locale)  -- language change to XXX
    end

    sys.call("[ -f /sbin/lang_set ] && lang_set")  --nvram set locale

    local portal_support = uci_r:get_profile("portal", "portal_support") or "no"
    
    if portal_support == "yes" then
        local portal_lan_path  = "/etc/wifidog/locale/" .. data.locale .. "/lan.js"
        local portal_lan_path_default = "/etc/wifidog/lan.js"
        if nixio.fs.stat(portal_lan_path) then
            luci.sys.exec("cp " .. portal_lan_path .. " " .. portal_lan_path_default .. " ")
        end   
    end
    return data
end

function get_mcu_sysinfo(formvals)
    local uci_r = uci.cursor()
    local select_permission = uci_r:get_profile("region","select_permission") or "yes"

    local data = {
        locale = uci_r:get(LOCALECFG, "sysinfo", "default") or "en_US",
        force  = uci_r:get(LOCALECFG, "sysinfo", "force") == "true" and true or false,
        model  = uci_r:get(LOCALECFG, "sysinfo", "model") or "AC1900",
        rebootTime = uci_r:get_profile("global", "reboot_time") or 75,
        region_select_permission = select_permission
    }
    
    if data.force then
        return data
    end

    sys.call("[ -f /sbin/lang_get ] && lang_get") --nvram get locale

    uci_r = uci.cursor() --reload config
    local locale = uci_r:get(LOCALECFG, "sysinfo", "locale") or ""
    -- Check whether language has been changed by user.
    if locale == "" then
    	locale = data.locale	
    end

    local file_path  = "/www/webpages/locale/" .. locale .. "/lan.js"

    -- Check the path to determined whether the language is supported.
    if nixio.fs.stat(file_path) then
        data.locale = locale
    else
        data.locale = "en_US"
    end

    local orig_locale = uci_r:get(LOCALECFG, "sysinfo", "locale") or ""
    if orig_locale ~= data.locale then
        uci_r:set(LOCALECFG, "sysinfo", "locale", data.locale)
        uci_r:commit(LOCALECFG)
        log(51, data.locale)  -- language change to XXX
    end

    sys.call("[ -f /sbin/lang_set ] && lang_set")  --nvram set locale

    return data
end

function get_sysinfo_mobile(formvals)
    local uci_r = uci.cursor()
    local select_permission
    select_permission = uci_r:get_profile("region","select_permission") or "yes"

    local data = {
        locale = uci_r:get(LOCALECFG, "sysinfo", "default") or "en_US",
        force  = uci_r:get(LOCALECFG, "sysinfo", "force") == "true" and true or false,
        model  = uci_r:get(LOCALECFG, "sysinfo", "model") or "AC1900",
	rebootTime = uci_r:get_profile("global", "reboot_time") or 75,
        region_select_permission = select_permission
    }
    
    if data.force then
        return data
    end

    sys.call("[ -f /sbin/lang_get ] && lang_get") --nvram get locale

    uci_r = uci.cursor() --reload config
    local locale = uci_r:get(LOCALECFG, "sysinfo", "locale_mobile") or ""
    -- Check whether language has been changed by user.
    if locale == "" then
        -- Get the explorer language.  (e.g. "en-US")
        local web_lang = luci.http.getenv("HTTP_ACCEPT_LANGUAGE") or ""
        local pos      = web_lang:find(",") or 1
        web_lang       = web_lang:sub(1, pos - 1)

        -- Check whether the language package is existed.
        if web_lang and web_lang ~= "" then
            -- Change "en-US" to "en_US".
            locale = web_lang:gsub('-', '_')
            log(2, locale)  -- explorer language is XXX
        else
            -- set default locale
            locale = data.locale
        end
	
    end

    local file_path  = "/www/webmobile/locale/" .. locale .. "/locale.json"

    -- Check the path to determined whether the language is supported.
    if nixio.fs.stat(file_path) then
        data.locale = locale
    else
        data.locale = "en_US"
    end

    local orig_locale = uci_r:get(LOCALECFG, "sysinfo", "locale") or ""
    if orig_locale ~= data.locale then
        uci_r:set(LOCALECFG, "sysinfo", "locale_mobile", data.locale)
        uci_r:commit(LOCALECFG)
        -- log(51, data.locale)  -- language change to XXX
    end

    sys.call("[ -f /sbin/lang_set ] && lang_set")  --nvram set locale

    local portal_support = uci_r:get_profile("portal", "portal_support") or "no"
    
    if portal_support == "yes" then
        local portal_lan_path  = "/etc/wifidog/locale/" .. data.locale .. "/lan.js"
        local portal_lan_path_default = "/etc/wifidog/lan.js"
        if nixio.fs.stat(portal_lan_path) then
            luci.sys.exec("cp " .. portal_lan_path .. " " .. portal_lan_path_default .. " ")
        end   
    end

    return data
end

function set_sysinfo(formvals)
    local uci_r = uci.cursor()

    -- Check whether support multi languages.
    local force = uci_r:get(LOCALECFG, "sysinfo", "force")
    if force and force == "true" then
        log(201)  -- locale change is forbidden
        return false, "locale change is forbidden"
    end

    local locale = formvals.locale or ""
    locale = (locale == "") and "en_US" or locale

    if not locale:match("^[%w_]+$") then
        return false, "invalid args"
    end

    uci_r:set(LOCALECFG, "sysinfo", "locale", locale)
    if not uci_r:commit(LOCALECFG) then
        return false
    else
        sys.call("[ -f /sbin/lang_set ] && lang_set")  --nvram set locale
    end

    local portal_support = uci_r:get_profile("portal", "portal_support") or "no"
    
    if portal_support == "yes" then
        local portal_lan_path  = "/etc/wifidog/locale/" .. locale .. "/lan.js"
        local portal_lan_path_default = "/etc/wifidog/lan.js"
        if nixio.fs.stat(portal_lan_path) then
            luci.sys.exec("cp " .. portal_lan_path .. " " .. portal_lan_path_default .. " ")
        end   
    end
 
    log(51, locale)  -- locale change to XXX
    -- log(601)  -- save success
    return true
end

function set_sysinfo_mobile(formvals)
    local uci_r = uci.cursor()

    -- Check whether support multi languages.
    local force = uci_r:get(LOCALECFG, "sysinfo", "force")
    if force and force == "true" then
        log(201)  -- locale change is forbidden
        return false, "locale change is forbidden"
    end

    local locale = formvals.locale or ""
    locale = (locale == "") and "en_US" or locale

    if not locale:match("^[%w_]+$") then
        return false, "invalid args"
    end

    uci_r:set(LOCALECFG, "sysinfo", "locale_mobile", locale)
    if not uci_r:commit(LOCALECFG) then
        return false
    else
        sys.call("[ -f /sbin/lang_set ] && lang_set")  --nvram set locale
    end

    local portal_support = uci_r:get_profile("portal", "portal_support") or "no"
    
    if portal_support == "yes" then
        local portal_lan_path  = "/etc/wifidog/locale/" .. locale .. "/lan.js"
        local portal_lan_path_default = "/etc/wifidog/lan.js"
        if nixio.fs.stat(portal_lan_path) then
            luci.sys.exec("cp " .. portal_lan_path .. " " .. portal_lan_path_default .. " ")
        end   
    end
 
    log(51, locale)  -- locale change to XXX
    -- log(601)  -- save success
    return true
end

function get_langinfo(formvals)
    local uci_r = uci.cursor()
    local data = {}

    uci_r:foreach(LOCALECFG, "langinfo",
        function(section)
	    data[#data+1] = {name = section[".name"], value = section["value"]}
        end                           
    )

    return data
end

function get_country()
    local uci_r = uci.cursor()
    local data = {}
    data.country= uci_r:get(LOCALECFG, "sysinfo", "country") or "UN"

    return data
end

function get_country_list()
    local data = {
        { value = "UN", name = "UNITED_KINGDOM"},
        { value = "RU", name = "RUSSIA"},
        { value = "KR", name = "KOREA_REPUBLIC"},
        { value = "PL", name = "POLAND"},
        { value = "TW", name = "TAIWAN"},
        { value = "VN", name = "VIETNAM"},
        { value = "RO", name = "ROMANIA"},
        { value = "US", name = "UNITED_STATES"},
        { value = "BR", name = "BRAZIL"},
        { value = "JP", name = "JAPAN"},
        { value = "CA", name = "CANADA"},
        { value = "SA", name = "SAUDI_ARABIA"},
        { value = "INA", name = "INDONESIA"},
    }
    return data
end

--- Dispatch table
local dispatch_tbl = {
    lang = {
        ["read"]  = {cb = get_sysinfo},
        ["write"] = {cb = set_sysinfo},
        ["mcu_read"]  = {cb = get_mcu_sysinfo}
    },
    index_lang = {
        ["read"]  = {cb = get_sysinfo},
        ["write"] = {cb = set_sysinfo},
	["mcu_read"]  = {cb = get_mcu_sysinfo}
    },
    mobile_lan = {
        ["read"]  = {cb = get_sysinfo_mobile},
        ["write"] = {cb = set_sysinfo_mobile}
    },
    list = {
        ["read"]  = {cb = get_langinfo}
    },
    index_list = {
        ["read"]  = {cb = get_langinfo},
    },
    country = {
        ["read"]  = {cb = get_country}
    },
    country_list = {
        [".super"] = {cb = get_country_list},
	["read"] = {cb = get_country_list}
    }
}

function dispatch(http_form)
    return ctl.dispatch(dispatch_tbl, http_form)
end

function _index()
    return ctl._index(dispatch)
end

--- Module entrance
function index()
    entry({"locale"}, call("_index")).leaf = true
end
