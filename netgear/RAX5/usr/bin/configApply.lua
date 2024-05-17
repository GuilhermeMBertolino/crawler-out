#!/usr/bin/env lua

local log = require "luci.log"
local nixio = require "nixio"
pcall(require, "luarocks.require")
 
local uci = require "luci.model.uci".cursor()

local final_change = {}
final_change = uci:check_change()

if final_change == nil then
    return
end

if #final_change > 0 then
    uci:forkApply(final_change)
end


