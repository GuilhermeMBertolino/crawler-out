--[[
Copyright(c) 2008-2014 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  log.lua
Details :  System log library.
Author  :  Ye Qianchuan <yeqianchuan@tp-link.net>
Version :  1.0.0
Date    :  7Jul, 2014
]]--

module("luci.model.log", package.seeall)

local log = require "log"
local util = require "luci.util"

Log = util.class()

function Log:__init__(proj_id)
    assert(proj_id)
    self.proj_id = proj_id
    getmetatable(self).__call = self.log
end

function Log:log(msg_id, ...)
    log.log(self.proj_id, msg_id, ...)
end

Logn = util.class()

function Logn:__init__(proj_name)
    assert(proj_name)
    self.logid = getmodule(proj_name)
    getmetatable(self).__call = self.log
end

function Logn:log(msg_id, ...)
	if self.logid then
        log.log(self.logid.projid, msg_id, ...)
    end
end

function getmodule(proj_name)
    local projm = require "log.syslog_define"
    if not projm or not proj_name then
        return nil
    end

    for _, v in ipairs(projm.logid) do
        if v.projname and v.projname == proj_name then
            return v
        end
    end
	return nil
end