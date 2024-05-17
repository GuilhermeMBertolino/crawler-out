local log = require "luci.log"
local soapParser = require "soap.soapParser"
local soapResponse = require "soap.soapResponse"
local validator = require "commonFunc.validator"
local interface = require "webGetFunc.interface"
local fork = require "commonFunc.fork"

local M = {}

log.debug(0)

M.service = "WANEthernetLinkConfig"

function M.GetEthernetLinkStatus(dataXML)
    local outputParameters = {NewEthernetLinkStatus=""}

    outputParameters["NewEthernetLinkStatus"] = interface.getWANLinkStatusUpDown()

    return soapResponse.buildResponseData("RESPONSE_NOERROR",outputParameters,"GetEthernetLinkStatus",M.service)
end

function M.SetWANRelease(dataXML)
    local inputParameters = {NewWANRelease=""}
    local wan_mode = interface.get_wanMode()

    -- get setting parameter from XML data
    for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXML,"SetWANRelease",k)

        if tmpValue ~= nil then
            log.console("tmpValue: "..tmpValue.." type "..type(tmpValue))
            inputParameters[k] = tmpValue
        else
            log.console("Invalid parameter: "..k)
            return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{},"SetWANRelease",M.service)
        end
    end

    if inputParameters.NewWANRelease ~= "1" then
        return soapResponse.buildResponseData("RESPONSE_INVALID_ARGUMENTS",{},"SetWANRelease",M.service)
    end

    if wan_mode == "DHCP" then
        fork.fork_exec("kill -SIGUSR2 `cat /var/run/udhcpc-eth1.pid`")
    else
        if wan_mode == "PPTP" then
            ifname = "pptp"
        elseif wan_mode == "L2TP" then
            ifname = "l2tp"
        else
            ifname = "wan"
        end
        fork.fork_exec("ifdown "..ifname)
    end

    return soapResponse.buildResponseData("RESPONSE_NOERROR",{},"SetWANRelease",M.service)
end

function M.SetWANRenew(dataXML)
    local inputParameters = {NewWANRenew=""}
    local wan_mode = interface.get_wanMode()

    -- get setting parameter from XML data
    for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXML,"SetWANRenew",k)

        if tmpValue ~= nil then
            inputParameters[k] = tmpValue
        else
            log.console("Invalid parameter: "..k)
            return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{},"SetWANRenew",M.service)
        end
    end

    if inputParameters.NewWANRenew ~= "1" then
        return soapResponse.buildResponseData("RESPONSE_INVALID_ARGUMENTS",{},"SetWANRenew",M.service)
    end

    if wan_mode == "DHCP" then
        fork.fork_exec("kill -SIGUSR1 `cat /var/run/udhcpc-eth1.pid`")
    else
        if wan_mode == "PPTP" then
            ifname = "pptp"
        elseif wan_mode == "L2TP" then
            ifname = "l2tp"
        else
            ifname = "wan"
        end
        fork.fork_exec("ifup "..ifname)
    end

    return soapResponse.buildResponseData("RESPONSE_NOERROR",{},"SetWANRenew",M.service)
end

return M
