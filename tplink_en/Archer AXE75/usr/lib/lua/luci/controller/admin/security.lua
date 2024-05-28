--[[
Copyright(c) 2016-2020 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  security.lua
Details :  Controller for trend micro security
Author  :  Wang Lian <wanglian@tp-link.net>
Version :  1.0.0
Date    :  29Nov, 2016
]]--

module("luci.controller.admin.security", package.seeall)

local nixio  = require "nixio"
local uci    = require "luci.model.uci"
local util   = require "luci.util"
local sys    = require "luci.sys"
local dbg    = require "luci.tools.debug"
local ctl    = require "luci.model.controller"
local secur	 = require "luci.model.security"

local uci_r  = uci.cursor()

local function invalid_args(errorcode)
    errorcode = errorcode or "invalid args"
    --log(nlog.INVALID_ARGS)
    return false, errorcode
end

local function get_security_info(params)
    local security = secur.SECURITY_INST()
    
    return security:get_info()
end

local function set_security_info(params)
    if not params then
		return invalid_args()
	end

    local security = secur.SECURITY_INST()
    
    return security:set_info(params)
end

local function security_history_get(params)
    local security = secur.SECURITY_INST()
    
    return security:get_history()
end

local function security_history_clear(params)
    local security = secur.SECURITY_INST()
    
    return security:clear_history()
end

local function security_history_remove(params)
    if not params or not params.history_list or type(params.history_list) ~= "table" then
		return invalid_args()
	end

    local security = secur.SECURITY_INST()
    
    return security:remove_history(params.history_list)
end

local function get_default_category_list()
    local security = secur.SECURITY_INST()
    
    return security:get_default_cat_list()
end

local function get_default_rule_list()
    local security = secur.SECURITY_INST()
    
    return security:get_default_rule_list(params)
end

-- General controller routines

local security_form = {  
    info = {       
        ["read"] = {cb = get_security_info},
        ["write"] = {cb = set_security_info}
    },
    category = {
        ["read"] = {cb = get_default_category_list}
    },
    rule = {
        ["read"] = {cb = get_default_rule_list}
    },
    history = {        
        ["read"] = {cb = security_history_get},
        ["clear"] = {cb = security_history_clear},
        ["remove"] = {cb = security_history_remove} 
    }
}

function security_dispatch(http_form)
    return ctl.dispatch(security_form, http_form)
end

function security_index()
    return ctl._index(security_dispatch)
end

function index()
    entry({"admin", "security"}, call("security_index")).leaf = true
end
