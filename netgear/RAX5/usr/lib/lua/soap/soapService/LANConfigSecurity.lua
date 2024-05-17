local log = require "luci.log"
log.debug(1)
local soapParser = require "soap.soapParser"
local soapResponse = require "soap.soapResponse"
local soapCommon = require "soap.soapCommon"
local validator = require "commonFunc.validator"
local uci    = require "luci.model.uci".cursor()
local uci_st = require "luci.model.uci".cursor_state()
local uci_soap = require "luci.model.uci".cursor(nil, "/var/soapConfig")

local SetConfigLAN_maps =
    {
        NewLANIP              = { data_type = "ipv4_addr",     handler = nil },
        NewLANSubnet          = { data_type = "ipv4_netmask",  handler = nil },
        NewDHCPEnabled        = { data_type = "boolean",        handler = nil },
        NewStartIP            = { data_type = "ipv4_addr",     handler = SetConfigLAN_validator },
        NewEndIP              = { data_type = "ipv4_addr",     handler = SetConfigLAN_validator }
    };

local SetConfigLANIP_maps =
    {
        NewLANIP              = { data_type = "ipv4_addr",     handler = nil }
    };

local SetConfigLANSubnet_maps =
    {
        NewLANSubnet          = { data_type = "ipv4_netmask",     handler = nil }
    };

local SetConfigDHCPEnabled_maps =
    {
        NewDHCPEnabled        = { data_type = "boolean",        handler = nil }
    };

local SetConfigPassword_maps =
    {
        NewPassword        = { data_type = "password",        handler = nil }
    };

function SetConfigLAN_validator(parm, parametersTable)
    -- custom handler function only be called at default datatype validate fail.
    local ret = false;

--    if (parm == "NewStartIP") then
--        log.console("Run startAddr validator");
--        ret = true;
--    elseif (parm == "NewEndIP") then
--        log.console("Run endAddr validator");
--        ret = true;
--    end

    return ret;
end
local M = {}

M.service = "LANConfigSecurity"

function configureLanSetup(NewLANIP, NewLANSubnet)

    local ipaddr_orig = uci:get("network", "lan", "ipaddr")
    local netmask_orig = uci:get("network", "lan", "netmask")

    local networkChanged = false
    local lan_ip_changed = false
    local subnet_mask_changed = false

    if NewLANIP ~= nil and ipaddr_orig ~= NewLANIP then
        uci_soap:set("network", "lan", "ipaddr", NewLANIP)
        -- Per spec, only a change regarding the router's LAN IP address, subnet mask, or DHCP server pool range has to reset the LAN Ethernet interface.
        luci.sys.call("touch /var/state/dhcpconfigchanged")
        networkChanged = true
        lan_ip_changed = true
    end

    if NewLANSubnet ~= nil and netmask_orig ~= NewLANSubnet then
        uci_soap:set("network", "lan", "netmask", NewLANSubnet)
        -- Per spec, only a change regarding the router's LAN IP address, subnet mask, or DHCP server pool range has to reset the LAN Ethernet interface.
        luci.sys.call("touch /var/state/dhcpconfigchanged")
        networkChanged = true
        subnet_mask_changed = true
    end

    -- Per spec, whenever router¡¦s LAN IP address or subnet is changed, router should automatically comply the corresponding configuration,
    -- to keep the same configuration, or to flush the configuration.
    local lanSetup = require"webPostHandler.lanSetup"
    lanSetup.lanIpSubnetChangeHandler(subnet_mask_changed, lan_ip_changed, NewLANIP, netmask_orig, NewLANSubnet)

    if networkChanged == true then
        if soapCommon.configToSaveOrCommit(uci_soap,"network") then
            return networkChanged
        end
    end

    return networkChanged

end

function configureDhcp(NewDHCPEnabled, NewStartIP, NewEndIP)

    -- Use Router as DHCP Server
    local dhcpServerEnable_orig = uci:get("dhcp", "lan", "dhcpv4")
    local start_ip_orig = uci:get("dhcp", "lan", "start_ip")
    local end_ip_orig = uci:get("dhcp", "lan", "end_ip")
    local enableDhcpServer = ""
    local dhcpChanged = false

    if NewDHCPEnabled ~= nil and NewDHCPEnabled == "true" then
        enableDhcpServer = "server"
    else
        enableDhcpServer = "disabled"
    end
    if dhcpServerEnable_orig ~= enableDhcpServer then
        uci_soap:set("dhcp", "lan", "dhcpv4", enableDhcpServer)
        dhcpChanged = true
    end

    -- DHCP Starting IP Address
    if NewStartIP ~= nil and start_ip_orig ~= NewStartIP then
        uci_soap:set("dhcp", "lan", "start_ip", NewStartIP)
        -- Per spec, only a change regarding the router's LAN IP address, subnet mask, or DHCP server pool range has to reset the LAN Ethernet interface.
        luci.sys.call("touch /var/state/dhcpconfigchanged")
        dhcpChanged = true
    end

    -- DHCP Ending IP Address
    if NewEndIP ~= nil and end_ip_orig ~= NewEndIP then
        uci_soap:set("dhcp", "lan", "end_ip", NewEndIP)
        -- Per spec, only a change regarding the router's LAN IP address, subnet mask, or DHCP server pool range has to reset the LAN Ethernet interface.
        luci.sys.call("touch /var/state/dhcpconfigchanged")
        dhcpChanged = true
    end

    if dhcpChanged == true then
        if soapCommon.configToSaveOrCommit(uci_soap,"dhcp") then
            return dhcpChanged
        end
    end

    return dhcpChanged

end

function M.SetConfigLANSubnet(dataXml)

    local inputParameters = {NewLANSubnet=""}
    local isNetworkChanged = false

    --[[get setting parameter from XML data]]
    for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXml,"SetConfigLANSubnet",k)

        if tmpValue ~= nil then
            inputParameters[k] = soapParser.getActionParameter(dataXml,"SetConfigLANSubnet",k)
        else
            log.console("Invalid parameter: "..k)
            return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{},"SetConfigLANSubnet",M.service)
        end
    end

    --[[do validator for setting parameters]]
    if (validator.soap_data_validate(inputParameters, SetConfigLANSubnet_maps) == false) then
        log.console("Validation of SOAP data paramter is failed")
        return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{},"SetConfigLANSubnet",M.service)
    end

    isNetworkChanged = configureLanSetup(nil, inputParameters.NewLANSubnet)

    --if isNetworkChanged == true then
    --    table.insert(changed_config, "network")
    --end

    return soapResponse.buildResponseData("RESPONSE_NOERROR",{},"SetConfigLANSubnet",M.service)

end

function M.SetConfigLANIP(dataXml)

    --[[initialize setting parameters]]
    local inputParameters = {NewLANIP=""}
    local isNetworkChanged = false

    --[[get setting parameter from XML data]]
    for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXml,"SetConfigLANIP",k)

        if tmpValue ~= nil then
            inputParameters[k] = soapParser.getActionParameter(dataXml,"SetConfigLANIP",k)
        else
            log.console("Invalid parameter: "..k)
            return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{},"SetConfigLANIP",M.service)
        end
    end

    --[[do validator for setting parameters]]
    if (validator.soap_data_validate(inputParameters, SetConfigLANIP_maps) == false) then
        log.console("Validation of SOAP data paramter is failed")
        return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{},"SetConfigLANIP",M.service)
    end

    isNetworkChanged = configureLanSetup(inputParameters.NewLANIP, nil)

    --if isNetworkChanged == true then
    --    table.insert(changed_config, "network")
    --end

    return soapResponse.buildResponseData("RESPONSE_NOERROR",{},"SetConfigLANIP",M.service)

end

function M.SetConfigDHCPEnabled(dataXml)

    local inputParameters = {NewDHCPEnabled=""}
    local isDhcpChanged = false

    --[[get setting parameter from XML data]]
    for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXml,"SetConfigDHCPEnabled",k)

        if tmpValue ~= nil then
            inputParameters[k] = soapParser.getActionParameter(dataXml,"SetConfigDHCPEnabled",k)
        else
            log.console("Invalid parameter: "..k)
            return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{},"SetConfigDHCPEnabled",M.service)
        end
    end

    --[[do validator for setting parameters]]
    if (validator.soap_data_validate(inputParameters, SetConfigDHCPEnabled_maps) == false) then
        log.console("Validation of SOAP data paramter is failed")
        return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{},"SetConfigDHCPEnabled",M.service)
    end

    isDhcpChanged    = configureDhcp(inputParameters.NewDHCPEnabled, nil, nil)

    --if isDhcpChanged == true then
    --    table.insert(changed_config, "dhcp")
    --end

    return soapResponse.buildResponseData("RESPONSE_NOERROR",{},"SetConfigDHCPEnabled",M.service)

end

function M.SetConfigLAN(dataXml)

    --[[initialize setting parameters]]
    local inputParameters = {NewLANIP="", NewLANSubnet="", NewDHCPEnabled="", NewStartIP="", NewEndIP=""}
    local isNetworkChanged = false
    local isDhcpChanged = false

    --[[get setting parameter from XML data]]
    for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXml,"SetConfigLAN",k)

        if tmpValue ~= nil then
            inputParameters[k] = soapParser.getActionParameter(dataXml,"SetConfigLAN",k)
        else
            log.console("Invalid parameter: "..k)
            return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{},"SetConfigLAN",M.service)
        end
    end

    --[[do validator for setting parameters]]
    if (validator.soap_data_validate(inputParameters, SetConfigLAN_maps) == false) then
        log.console("Validation of SOAP data paramter is failed")
        return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{},"SetConfigLAN",M.service)
    end

    isNetworkChanged = configureLanSetup(inputParameters.NewLANIP, inputParameters.NewLANSubnet)
    isDhcpChanged    = configureDhcp(inputParameters.NewDHCPEnabled, inputParameters.NewStartIP, inputParameters.NewEndIP)

    --if isNetworkChanged == true then
    --    table.insert(changed_config, "network")
    --elseif isDhcpChanged == true then
    --    table.insert(changed_config, "dhcp")
    --end

    return soapResponse.buildResponseData("RESPONSE_NOERROR",{},"SetConfigLAN",M.service)
end

function M.SetConfigPassword(dataXml)

    --[[initialize setting parameters]]
    local inputParameters = {NewPassword=""}

    --[[get setting parameter from XML data]]
    for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXml,"SetConfigPassword",k)

        if tmpValue ~= nil then
            inputParameters[k] = soapParser.getActionParameter(dataXml,"SetConfigPassword",k)
        else
            log.console("Invalid parameter: "..k)
            return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{},"SetConfigPassword",M.service)
        end
    end

    --[[do validator for setting parameters]]
    if (validator.soap_data_validate(inputParameters, SetConfigPassword_maps) == false) then
        log.console("Validation of SOAP data paramter is failed")
        return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{},"SetConfigPassword",M.service)
    end

    local pwdStrLength = string.len(inputParameters.NewPassword)

    if pwdStrLength > 64 then
        return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{},"SetConfigPassword",M.service)
    end

    local setPWD = require"webPostHandler.setPassword"
    local ret = false
    ret = setPWD.setPassword(inputParameters.NewPassword)


    if ret == false then
        return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{},"SetConfigPassword",M.service)
    end

    return soapResponse.buildResponseData("RESPONSE_NOERROR",{},"SetConfigPassword",M.service)
end

function M.GetInfo(dataXml)

    --[[initialize output parameters]]
    local outputParameters = {NewLANSubnet="", NewWANLAN_Subnet_Match="", NewLANMACAddress="", NewLANIP="", NewDHCPEnabled=""}

    local interface = require"webGetFunc.interface"

    outputParameters["NewLANSubnet"] = interface.getLanInstanceIpMask()

    if outputParameters["NewLANSubnet"] == interface.getWanEtherIpMask() then --Follow RAX40 to compare the subnet mask of WAN and LAN
        outputParameters["NewWANLAN_Subnet_Match"] =  "1"
    else
        outputParameters["NewWANLAN_Subnet_Match"] =  "0"
    end

    outputParameters["NewLANMACAddress"] = interface.getLanInstanceMac():gsub(":","")
    --outputParameters["NewLANMACAddress"] = interface.getLanInstanceMac()
    outputParameters["NewLANIP"] = interface.getLanInstanceIpAddr()
    outputParameters["NewDHCPEnabled"] = interface.getLanDhcpv4Enable()

    return soapResponse.buildResponseData("RESPONSE_NOERROR",outputParameters,"GetInfo",M.service)
end

return M

