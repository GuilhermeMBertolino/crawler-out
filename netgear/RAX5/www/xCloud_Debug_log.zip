#!/usr/bin/env lua

-- CGILua (SAPI) launcher, extracts script to launch
-- either from the command line (use #!cgilua in the script)
-- or from SCRIPT_FILENAME/PATH_TRANSLATED
local log = require "luci.log"
pcall(require, "luarocks.require")
 
local common = require "wsapi.common"
local cgi = require "wsapi.cgi"
 
local cgilua = require "cgilua.main"

local arg_filename = (...)
 
local response = require "wsapi.response"
local res = response.new()

--Global table to record the modified configs
--post function must use table.insert(changed_config, "xxxx") to replace uci:apply("xxxx")
changed_config = { }
local changed_config = _G.changed_config 
--Use the variable to store the changed config file that /sbin/reload_config generated 
final_change = {}

local function cgi_loader(wsapi_env)
  common.normalize_paths(wsapi_env, arg_filename, "cgilua.cgi")
  return cgilua.main(wsapi_env, res)
end 

--[[++PEGA++]]
--[[Add cgilua_finish_do for applying config after doning cgilua]]
local function cgilua_finish_do ()
  --Need assigned to local variable after the POST function
  local final_change = _G.final_change 
  if #final_change > 0 then
    local uci = require "luci.model.uci".cursor()
    --log.debug(1)
    --log.console("final_change ="..final_change)
    uci:forkApply(final_change)
  end
end

if cgi.run(cgi_loader) then
 cgilua_finish_do ()
end
--[[--PEGA--]]

