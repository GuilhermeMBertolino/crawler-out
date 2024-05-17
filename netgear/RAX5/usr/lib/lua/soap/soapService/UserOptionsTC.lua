local log = require "luci.log"
local soapParser = require "soap.soapParser"
local soapResponse = require "soap.soapResponse"
local validator = require "commonFunc.validator"
local uci = require "luci.model.uci".cursor()

local M = {}

log.debug(0)

M.service = "UserOptionsTC"

local autofw_maps =
{
    NewAutoFwUpgradeEnable = { data_type = "soap_boolean_int",  handler = nil }
};

function M.GetAutoFwUpgradeEnableStatus(dataXML)
    local outputParameters = {AutoFwUpgradeEnableStatus=""}
    local auto_fw = uci:get("netgear", "fw", "auto_update")

    if auto_fw == "false" then
        outputParameters["AutoFwUpgradeEnableStatus"] = 0
    else
        outputParameters["AutoFwUpgradeEnableStatus"] = 1
    end

    return soapResponse.buildResponseData("RESPONSE_NOERROR",outputParameters,"GetAutoFwUpgradeEnableStatus",M.service)
end

function M.SetAutoFwUpgradeEnableStatus(dataXML)
    local inputParameters = {NewAutoFwUpgradeEnable=""}
    -- get setting parameter from XML data
    for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXML,"SetAutoFwUpgradeEnableStatus",k)
        if tmpValue ~= nil then
            inputParameters[k] = tmpValue
        else
            log.console("Invalid parameter: "..k)
            return soapResponse.buildResponseData("RESPONSE_INVALID_ARGUMENTS",{},"SetAutoFwUpgradeEnableStatus",M.service)
        end
    end

    -- do validator for setting parameters
    if validator.soap_data_validate(inputParameters, autofw_maps) == false then
        log.console("Validation of SOAP data paramter is failed")
        return soapResponse.buildResponseData("RESPONSE_INVALID_ARGUMENTS",{},"SetAutoFwUpgradeEnableStatus",M.service)
    end

    uci:set("netgear", "fw", "auto_update",  inputParameters.NewAutoFwUpgradeEnable)
    uci:commit("netgear")
    table.insert(changed_config, "netgear")

    return soapResponse.buildResponseData("RESPONSE_NOERROR",{},"SetAutoFwUpgradeEnableStatus",M.service)
end

-- not support
function M.SetUserOptionsTC()
    return soapResponse.buildResponseData("RESPONSE_NOERROR",{},"SetUserOptionsTC",M.service)
end

function M.GetRaEnableStatus()
    local outputParameters = {RaEnableStatus="1"}
    return soapResponse.buildResponseData("RESPONSE_NOERROR",outputParameters,"GetRaEnableStatus",M.service)
end

function M.SetRaEnableStatus()
    return soapResponse.buildResponseData("RESPONSE_NOERROR",{},"SetRaEnableStatus",M.service)
end

return M