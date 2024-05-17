-- CGILua user configuration file
-- $Id: config.lua,v 1.1 2008/06/30 14:30:00 carregal Exp $

-- PEGATRON customization configurations
local log = require "luci.log"
local uci = require "luci.model.uci".cursor()

cgilua.seterrorhandler(function(s) log.force(debug.traceback(s))end)
cgilua.addscripthandler ("html", cgilua.handlelp)
cgilua.addscripthandler ("htm", cgilua.handlelp)
if type(cgilua.doplua) == "function" then
	cgilua.addscripthandler ("plua", cgilua.doplua)
end

if type(cgilua.docfg) == "function" then
	cgilua.addscripthandler ("cfg", cgilua.docfg)
end

local requestmethod = cgilua.servervariable"REQUEST_METHOD"
if requestmethod == "POST" then
  local max_fw_size = tonumber(uci:get("netgear", "fw", "max_size")) or 100

  cgilua.setmaxfilesize(max_fw_size * 1024 *1024) -- max_fw_size MB
  cgilua.setmaxinput(max_fw_size * 1024 *1024) -- max_fw_size MB 
  local getKeybyValue = function(self, input)
      for k,v in pairs(self) do
          if v == input then 
              return true
          end
      end
      return false 
  end
  local formDataNameToTmpNameMap = setmetatable({mtenFWUpload="netgear_tmp.img", config_file="netgear_tmp.cfg", wiz_config_file="netgear_tmp.cfg"}, {__call = getKeybyValue})
  cgilua.insertPegaTable("tmpFwName", "netgear_tmp.img")
  cgilua.insertPegaTable("tmpConfigName", "netgear_tmp.cfg")
  cgilua.insertPegaTable("tmpPath", "/tmp")
  cgilua.insertPegaTable("formDataNameToTmpNameMap", formDataNameToTmpNameMap)
  cgilua.insertPegaTable("getTmpNameFunc", require"cgilua.uploadUtils".getTmpNameByformDataName)
end

-- Looks for a Lua script in the web directory with the same name as
-- the executable
-- Useful for shorter URLs, just be careful with an eventual name clashing
-- when using this option
-- cgilua.use_executable_name = true

-- Enables CGILua authentication
--cgilua.doif (CGILUA_CONF.."/authentication_conf.lua")

-- Emulating old behavior loading file "env.lua" from the script's directory
--[[
cgilua.addopenfunction (function ()
  cgilua.doif ("env.lua")
end)
--]]

-- Basic configuration for using sessions
--[[
require"cgilua.session"
cgilua.session.setsessiondir (CGILUA_TMP)
-- The following function must be called by every script that needs session.
local already_enabled = false
function cgilua.enablesession ()
  if already_enabled then
    return
  else
    already_enabled = true
  end
  cgilua.session.open ()
  cgilua.addclosefunction (cgilua.session.close)
end
--]]

-- Optional compatibility values
-- cgilua.preprocess = cgilua.handlelp
-- cgilua.includehtml = cgilua.lp.include
