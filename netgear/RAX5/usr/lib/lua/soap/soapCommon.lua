--[[
      This LUA module defines all SOAP flags and definition.
      Usage: 
            local soapCommon ="soap.soapCommon"
            if soapCommon.SOAP_SUPPORT_SMART_ZONE then
                --do something
            end
  ]]

local uci_st = require "luci.model.uci".cursor_state()
local soapParser = require "soap.soapParser"
local validator = require "commonFunc.validator"
local log = require "luci.log"

local M = {}


M.SOAP_SUPPORT_SMART_ZONE                 = 0
M.SOAP_SUPPORT_PASSWORDRESET              = 1
M.SOAP_SUPPORT_TIMEZONE                   = 0
M.SOAP_SUPPORT_ARMOR                      = 1
M.SOAP_SUPPORT_WIFISMARTCONNECT           = 1
M.SOAP_SUPPORT_DEVICETYPEICON             = 1

--RAX30 do not support below features
M.SOAP_SUPPORT_REMOTE_MANAGEMENT          = 0
M.SOAP_SUPPORT_PARENTAL_CONTROL_OPENDNS   = 0
M.SOAP_SUPPORT_PARENTAL_CONTROL_CIRCLE    = 0

M.SECURITYQUESTION1_MIN   = 1
M.SECURITYQUESTION1_MAX   = 9
M.SECURITYQUESTION2_MIN   = 1
M.SECURITYQUESTION2_MAX   = 8
M.SECURITYANSWER_MAX_SIZE = 64

--[[get setting parameter from XML data]]
function M.getSettingParamByXML(dataXml, input, action, maps)

    for k,v in pairs(input) do
        local tmpValue = soapParser.getActionParameter(dataXml, action, k)

        if tmpValue ~= nil then
            input[k] = tmpValue
        else
            -- Allow parameter value to be empty.
            -- In Default, validator.soap_data_validate() would block the empty value.
            -- Allow a parameter empty value by add a validator callback handler in the maps.
            input[k] = ""
        end
    --log.console("parameter " .. tostring(k) .. " : " .. tostring(input[k]));
    end

    if (validator.soap_data_validate(input, maps)  == false) then
        return "RESPONSE_ERROR"
    end

    return input
end

function M.configToSaveOrCommit(uci_soap, configService)
  local configStartSession = uci_st:get("soap","ConfigurationStarted","startSession") 
  
  if configStartSession  and string.len(configStartSession) > 0 then
      uci_st:section("soap","readyServices",configService,{a="1"})
      uci_st:save("soap")
      uci_soap:save(configService)
  else
      uci_soap:commit(configService)
      table.insert(changed_config, configService)
  end

  return true
end

return M
