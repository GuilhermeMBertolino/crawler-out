
local M = {}

function M.getWizardRestoreConfigInProgress()
--[[
    if io.open("/data/wizardRestoreConfigInProgress") ~= nil then
        return "true"
    else
        return "false"
    end
  ]]
  local exec  = require "luci.util".exec
  local res = exec("puDataStr get wizardCheck RestoreConfigInProgress")
  if string.match(res,'true') ~= nil then
      return "true"
  else
      return "false"
  end
  
end

function M.getWizardFwUpgradeInProgress()
--[[
    if io.open("/data/wizardFwUpgradeInProgress") ~= nil then
        return "true"
    else
        return "false"
    end
  ]]
  local exec  = require "luci.util".exec
  local res = exec("puDataStr get wizardCheck FwUpgradeInProgress")
  if string.match(res,'true') ~= nil then
      return "true"
  else
      return "false"
  end
end

function M.getWizardWifiConfigured()
--[[
    if io.open("/data/wizardWifiConfigured") ~= nil then
        return "true"
    else
        return "false"
    end
  ]]
  local exec  = require "luci.util".exec
  local res = exec("puDataStr get wizardCheck WifiConfigured")
  if string.match(res,'true') ~= nil then
      return "true"
  else
      return "false"
  end
end
return M

