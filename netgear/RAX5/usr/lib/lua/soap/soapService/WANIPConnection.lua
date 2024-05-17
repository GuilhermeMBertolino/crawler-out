local log = require "luci.log"
local soapParser = require "soap.soapParser"
local soapResponse = require "soap.soapResponse"
local soapCommon = require "soap.soapCommon"
local validator = require "commonFunc.validator"
local interface = require "webGetFunc.interface"
local wanSetup = require "webGetFunc.wanSetup"
local wanCommon = require "webPostHandler.wanCommon"
local uci    = require "luci.model.uci".cursor()
local uci_soap = require "luci.model.uci".cursor(nil, "/var/soapConfig")

local M = {}

log.debug(0)

M.service = "WANIPConnection"

function portmapping_validator(parm, value)
    local ret = false;

    if parm == "NewConnectionType" and value ~= nil then
        if value == "TCP" or value == "UDP" then
            ret = true;
        end
    end

    return ret;
end

function wanType_validator(parm, value)
    local ret = false;

    if parm == "NewConnectionType" or parm == "NewAddressingType" and value ~= nil then
        if value.NewConnectionType ~= "PPPoA" and value.NewConnectionType ~= "BigPond" then
            ret = true
        end
    elseif parm == "NewConnectionMode" and value ~= nil then
        -- N/A for DHCP, static
        if value == "AlwaysOn" or value == "DialOnDemand" or value == "ManuallyConnect" or value == "N/A" then
            ret = true
        end
    elseif parm == "NewConnectionID" and value ~= nil then
        if string.len(value) <= 12 then
            ret = true
        end
    elseif parm == "NewNATEnable" and value ~= nil then
        if tonumber(value) == 0 or tonumber(value) == 1 or value == "" then
            ret = true
        end
    elseif parm == "NewMaxMTUSize" and value ~= nil then
        if tonumber(value) <= 1500 then
            ret = true
        end
    elseif parm == "SetMACAddress" and value ~= nil then
        if string.len(value) < 13 then
            ret = true
        end
    end
    return ret;
end

local portmapping_maps =
{
    NewProtocol       = { data_type = "protocol",   handler = portmapping_validator },
    NewInternalPort   = { data_type = "port_range", handler = nil },
    NewExternalPort   = { data_type = "port_range", handler = nil },
    NewInternalClient = { data_type = "ipv4_addr",  handler = nil }
};

local wan_mode_maps =
{
    -- value of soap test is null
    NewConnectionType = { data_type = "conn_type",    handler = wanType_validator },
    --NewISPLoginname   = { data_type = "ppp_user",     handler = nil },
    --NewISPPassword    = { data_type = "password",     handler = nil },
    NewConnectionMode = { data_type = "conn_mode",    handler = wanType_validator },
    --Newidletimer      = { data_type = "ppp_idletime", handler = nil },
   -- NewConnectionID   = { data_type = "pptp_connid",  handler = wanType_validator },
    --NewPPTPMyIP	      = { data_type = "ipv4_addr",    handler = nil },
    --NewPPTPServerIP   = { data_type = "ipv4_addr",    handler = nil },
    --NewPrimaryDNS     = { data_type = "ipv4_addr",    handler = nil },
    --NewSecondaryDNS   = { data_type = "ipv4_addr",    handler = nil },
    NewNATEnable      = { data_type = "nat_action",   handler = wanType_validator }
};

local wan_static_maps =
{
    NewAddressingType	 = { data_type = "conn_type",    handler = wanType_validator },
    NewExternalIPAddress = { data_type = "ipv4_addr",    handler = nil },
    NewSubnetMask	 = { data_type = "ipv4_netmask", handler = nil },
    NewDefaultGateway	 = { data_type = "ipv4_addr",    handler = nil },
    NewPrimaryDNS	 = { data_type = "ipv4_addr",    handler = nil }
--    NewSecondaryDNS	 = { data_type = "ipv4_addr",    handler = nil }
};

function M.GetConnectionTypeInfo(dataXML)
    local outputParameters = {NewConnectionType=""}

    outputParameters["NewConnectionType"] = interface.get_wanMode()

    return soapResponse.buildResponseData("RESPONSE_NOERROR",outputParameters,"GetConnectionTypeInfo",M.service)
end

function M.GetInternetPortInfo(dataXML)
    local outputParameters = {NewInternetPortInfo=""}

    -- format: n@Index;Name@…
    outputParameters["NewInternetPortInfo"] = "1@1;Ethernet"

    return soapResponse.buildResponseData("RESPONSE_NOERROR",outputParameters,"GetInternetPortInfo",M.service)
end

function M.GetInfo(dataXML)
    local outputParameters = {NewEnable="", NewConnectionType="", NewExternalIPAddress="", NewSubnetMask="", NewAddressingType="", 
    NewDefaultGateway="", NewMACAddress="", NewMACAddressOverride="", NewMaxMTUSize="", NewDNSEnabled="", NewDNSServers=""}
    local mac=""

    if interface.getInternetStatusUpDown() == "Up" then
        outputParameters["NewEnable"] = 1
    else
        outputParameters["NewEnable"] = 0
    end

    outputParameters["NewConnectionType"] = interface.get_wanMode()
    outputParameters["NewExternalIPAddress"] = interface.getWanEtherIpAddr()
    outputParameters["NewSubnetMask"] = interface.getWanEtherIpMask()
    outputParameters["NewAddressingType"] = interface.get_wanMode()
    outputParameters["NewDefaultGateway"] = interface.getWanEtherGateway()
    mac = interface.getWanMacAddr()
    outputParameters["NewMACAddress"] = string.gsub(mac, ":", "")

    if interface.getWANMacSelect() == "default" then
        outputParameters["NewMACAddressOverride"] = 0
    else
        outputParameters["NewMACAddressOverride"] = 1
    end

    outputParameters["NewMaxMTUSize"] = wanSetup.getInputVal_mtuSize()

    if interface.getDNStype() == "fixed" then
        outputParameters["NewDNSEnabled"] = 1
    else
        outputParameters["NewDNSEnabled"] = 0
    end

    outputParameters["NewDNSServers"] = interface.getDNSServerIpAddr(1).." "..interface.getDNSServerIpAddr(2)

    return soapResponse.buildResponseData("RESPONSE_NOERROR",outputParameters,"GetInfo",M.service)
end

function M.AddPortMapping(dataXML)
    local inputParameters = {NewProtocol="", NewInternalPort="", NewExternalPort="", NewInternalClient="", NewPortMappingDescription="", NewPortMappingAdd=""}
    local index = 0
    local redirect = ""

    -- get setting parameter from XML data
    for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXML,"AddPortMapping",k)

        if tmpValue ~= nil then
            inputParameters[k] = tmpValue
        else
            return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{},"AddPortMapping",M.service)
        end
    end

    -- do validator for setting parameters
    if (validator.soap_data_validate(inputParameters, portmapping_maps) == false) then
        log.console("Validation of SOAP data paramter is failed")
        return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{},"AddPortMapping",M.service)
    end

    if inputParameters.NewPortMappingAdd ~= "1" then
        return soapResponse.buildResponseData("RESPONSE_INVALID_ARGUMENTS",{},"AddPortMapping",M.service)
    end

    uci:foreach("firewall", "redirect",
        function(s)
            index = index + 1
        end)

    -- Max count of port mapping rules is 10
    if index >= 10 then
        return soapResponse.buildResponseData("RESPONSE_ERROR",{},"AddPortMapping",M.service)
    end

    redirect = string.format("@redirect[%d]", index)
    uci:add("firewall", "redirect")
  
    -- add/overwrite section options
    uci:set("firewall", redirect, "name",  inputParameters.NewPortMappingDescription)
    uci:set("firewall", redirect, "target",  "DNAT")
    uci:set("firewall", redirect, "src",  "wan")
    uci:set("firewall", redirect, "dest",  "lan")
    uci:set("firewall", redirect, "proto", string.lower(inputParameters.NewProtocol))
    uci:set("firewall", redirect, "src_dport",  inputParameters.NewExternalPort)
    uci:set("firewall", redirect, "dest_port",  inputParameters.NewInternalPort)
    uci:set("firewall", redirect, "dest_ip",  inputParameters.NewInternalClient)
    uci:set("firewall", redirect, "log_prefix", "[PortFw_Tr]" )
    uci:set("firewall", redirect, "log_extra", "-m conntrack --ctstate NEW" )

    uci:commit("firewall")
    table.insert(changed_config, "firewall")

    return soapResponse.buildResponseData("RESPONSE_NOERROR",{},"AddPortMapping",M.service)
end

function M.GetPortMappingInfo(dataXML)
    local outputParameters = {NewPortMappingNumberOfEntries="0", NewPortMappingInfo=""}
    local index = 0
    local proto = ""
    local info = ""

    -- format: discription@Protocol;internal_port;external_port;client_IP;
    uci:foreach("firewall", "redirect",
        function(s)
            proto = string.upper(s.proto)
            info = info..s.name.."@"..proto..";"..s.dest_port..";"..s.src_dport..";"..s.dest_ip..";"
            log.console("GetPortMappingInfo = "..info)
            outputParameters["NewPortMappingNumberOfEntries"] = index
            outputParameters["NewPortMappingInfo"] = info
            index = index + 1
        end)

    return soapResponse.buildResponseData("RESPONSE_NOERROR",outputParameters,"GetPortMappingInfo",M.service)
end

function M.DeletePortMapping(dataXML)
    local inputParameters = {NewProtocol="", NewExternalPort="", NewPortMappingAdd=""}
    local redirect = ""
    local index = 0

    -- get setting parameter from XML data
    for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXML,"DeletePortMapping",k)

        if tmpValue ~= nil then
            inputParameters[k] = tmpValue
        else
            log.console("Invalid parameter: "..k)
            return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{},"DeletePortMapping",M.service)
        end
    end

    if inputParameters.NewPortMappingAdd ~= "0" then
        return soapResponse.buildResponseData("RESPONSE_INVALID_ARGUMENTS",{},"DeletePortMapping",M.service)
    end

    uci:foreach("firewall", "redirect",
        function(s)
            if string.lower(inputParameters.NewProtocol) == s.proto and inputParameters.NewExternalPort == s.src_dport then
                redirect = string.format("@redirect[%d]", index)
                uci:delete("firewall", redirect)
            end
            index = index + 1
        end)

    uci:commit("firewall")
    table.insert(changed_config, "firewall")

    return soapResponse.buildResponseData("RESPONSE_NOERROR",{},"DeletePortMapping",M.service)
end

function M.SetConnectionType(dataXML)
    local inputParameters = {NewConnectionType="", NewISPLoginname="", NewISPPassword="", NewConnectionMode="",
    Newidletimer="", NewConnectionID="", NewPPTPMyIP="", NewPPTPServerIP="", NewBigpondAuthServer="", NewPrimaryDNS="", NewSecondaryDNS="", NewNATEnable=""}
    local dnsType = "dynamic"
    local dns1 = ""
    local dns2 = ""
    local mode = ""
    local outputParameters = {NewConnectionType=""}

    -- get setting parameter from XML data
    for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXML,"SetConnectionType",k)

        if tmpValue ~= nil then
            inputParameters[k] = tmpValue
        --else
            --log.console("Invalid parameter: "..k)
            --return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{},"SetConnectionType",M.service)
        end
    end

    -- do validator for setting parameters
    if (validator.soap_data_validate(inputParameters, wan_mode_maps) == false) then
        log.console("Validation of SOAP data paramter is failed")
        return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{},"SetConnectionType",M.service)
    end

    -- follow RAX30 error response
    if inputParameters.NewConnectionType == "PPPoE" or inputParameters.NewConnectionType == "PPTP" then
        if inputParameters.NewConnectionMode ~= "AlwaysOn" and
        inputParameters.NewConnectionMode ~= "DialOnDemand" and
        inputParameters.NewConnectionMode ~= "ManuallyConnect" then
            return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{},"SetConnectionType",M.service)
        end
    elseif inputParameters.NewConnectionType == "DHCP" or inputParameters.NewConnectionType == "Static" then
        if inputParameters.NewConnectionMode ~= "N/A" then
            return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{},"SetConnectionType",M.service)
        end
    end

    -- check RAX30, Not supported for PPPoA and BigPond, static IP, PPTP with static IP
    uci_soap:set("network", "inet_global", "wan_mode", inputParameters.NewConnectionType)
    if inputParameters.NewConnectionType == "DHCP" then
        uci_soap:set("network", "inet_ether", "proto", "dhcp")
        uci_soap:set("network", "inet_ether", "iptype", "dynamic")
    elseif inputParameters.NewConnectionType == "PPPoE" then
        uci_soap:set("network", "inet_pppoe", "proto", "pppoe")
        uci_soap:set("network", "inet_pppoe", "username", inputParameters.NewISPLoginname)
        if(inputParameters.NewISPPassword ~= nil) then
            uci_soap:set("network", "inet_pppoe", "password", inputParameters.NewISPPassword)
        else
            uci_soap:set("network", "inet_pppoe", "password", "")
        end

        if inputParameters.NewConnectionMode == "DialOnDemand" then
            mode = "onDemand"
        elseif inputParameters.NewConnectionMode == "ManuallyConnect" then
            mode = "manually"
        else
            mode = "always"
        end

        uci_soap:set("network", "inet_pppoe", "conn_mode", mode)
        if mode == "onDemand" then
            uci_soap:set("network", "inet_pppoe", "idle_timeout", inputParameters.Newidletimer)
        end
        -- only support dynamic
        uci_soap:delete("network", "inet_pppoe", "ipaddr")

    elseif inputParameters.NewConnectionType == "PPTP" then
        uci_soap:set("network", "inet_pptp", "proto", "pptp")
        uci_soap:set("network", "inet_pptp", "username", inputParameters.NewISPLoginname)
        uci_soap:set("network", "inet_pptp", "password", inputParameters.NewISPPassword)
        uci_soap:set("network", "inet_pptp", "server", inputParameters.NewPPTPServerIP)
        uci_soap:set("network", "inet_pptp", "connectid", inputParameters.NewConnectionID) -- ToDo: save but not use
        if inputParameters.NewConnectionMode == "DialOnDemand" then
            mode = "onDemand"
        elseif inputParameters.NewConnectionMode == "ManuallyConnect" then
            mode = "manually"
        else
            mode = "always"
        end

        uci_soap:set("network", "inet_pptp", "conn_mode", mode)
        if(mode == "onDemand") then
            uci_soap:set("network", "inet_pptp", "idle_timeout", inputParameters.Newidletimer)
        end
        -- only support dynamic
        uci_soap:delete("network", "inet_pptp", "ipaddr")
        uci_soap:delete("network", "inet_pptp", "netmask")
        uci_soap:delete("network", "inet_pptp", "gateway")

    elseif inputParameters.NewConnectionType == "Static" then
        uci:set("network", "inet_ether", "proto", "static")
        uci:set("network", "inet_ether", "iptype", "fixed")
    end

    -- dns 
    if inputParameters.NewPrimaryDNS ~= "" or inputParameters.NewSecondaryDNS ~= "" then
        dnsType = "fixed"
        if type(inputParameters.NewPrimaryDNS) == "string" then
            dns1 = inputParameters.NewPrimaryDNS
        end
    
        if type(inputParameters.NewSecondaryDNS) == "string" then
            dns2 = inputParameters.NewSecondaryDNS
        end
    end

    wanCommon.wanConfig_DNS(uci_soap, dnsType, dns1, dns2)
    -- reload config
    wanCommon.wanConfig_Reload(uci_soap)

    -- apply the settings
    soapCommon.configToSaveOrCommit(uci_soap, "network")

    --outputParameters["NewConnectionType"] = interface.get_wanMode()
    outputParameters["NewConnectionType"] = inputParameters.NewConnectionType

    return soapResponse.buildResponseData("RESPONSE_NOERROR",outputParameters,"SetConnectionType",M.service)
end

function M.SetSmartWizardDetection(dataXML)
    local outputParameters = {NewConnectionType=""}
    local cmd_str = ""
    local res = ""
    local handle = ""
    local port_state = interface.getInternetStatusUpDown()
    
    if port_state == "Down" then
        outputParameters["NewConnectionType"] = port_state
    else
        cmd_str = "/usr/bin/wandetect -i eth1 > /dev/null;echo $?"
        handle = io.popen(cmd_str)
        res = handle:read("*a")
        handle:close()
        if tonumber(res) == 1 then
            outputParameters["NewConnectionType"] = "DHCP"
        elseif tonumber(res) == 2 then
            outputParameters["NewConnectionType"] = "PPPoE"
        elseif tonumber(res) == 3 then
            outputParameters["NewConnectionType"] = "PPTP"
        elseif tonumber(res) == 4 then
            outputParameters["NewConnectionType"] = "PPTP"
            wanCommon.wanConfig_MacClone(uci, "default", "")
        else
            return soapResponse.buildResponseData("RESPONSE_UNSUPPORTED",{},"SetSmartWizardDetection",M.service)
        end
    end
    return soapResponse.buildResponseData("RESPONSE_NOERROR",outputParameters,"SetSmartWizardDetection",M.service)
end

function M.SetMaxMTUSize(dataXML)
    local inputParameters = {NewMaxMTUSize=""}

    -- get setting parameter from XML data
    for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXML,"SetMaxMTUSize",k)

        if tmpValue ~= nil then
            inputParameters[k] = tmpValue
        else
            log.console("Invalid parameter: "..k)
            return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{},"SetMaxMTUSize",M.service)
        end
    end

    -- do validator for setting parameters
    if wanType_validator("NewMaxMTUSize", inputParameters.NewMaxMTUSize) == false then
        log.console("Validation of SOAP data paramter is failed")
        return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{},"SetMaxMTUSize",M.service)
    end

    uci:set("network", "wan", "mtu", inputParameters.NewMaxMTUSize)

    -- commit settings
    uci:commit("network")

    -- apply the settings
    table.insert(changed_config, "network")

    return soapResponse.buildResponseData("RESPONSE_NOERROR",{},"SetMaxMTUSize",M.service)
end

function M.SetMACAddress(dataXML)
    local inputParameters = {NewMACAddress="", NewMACAddressOverride=""}
    local mac_clone = ""
    local mac_addr = ""

    -- get setting parameter from XML data
    for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXML,"SetMACAddress",k)

        if tmpValue ~= nil then
            inputParameters[k] = tmpValue
        else
            log.console("Invalid parameter: "..k)
            return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{},"SetMACAddress",M.service)
        end
    end
 
    -- do validator for setting parameters
    if wanType_validator("SetMACAddress", inputParameters.NewMACAddress) == false then
        log.console("Validation of SOAP data paramter is failed")
        return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{},"SetMACAddress",M.service)
    end

    if inputParameters.NewMACAddressOverride == "0" then
        mac_clone = "default"
    elseif inputParameters.NewMACAddressOverride == "1" then
        mac_clone = "pc"
    else
        mac_clone = "user"
    end

    mac_addr = string.gsub(inputParameters.NewMACAddress, ("."):rep(2), "%1:"):sub(1,-2)

    wanCommon.wanConfig_MacClone(uci, mac_clone, mac_addr)

    -- commit settings
    uci:commit("network")

    -- apply the settings
    table.insert(changed_config, "network")

    return soapResponse.buildResponseData("RESPONSE_NOERROR",{},"SetMACAddress",M.service)
end

function M.SetIPInterfaceInfo(dataXML)
    local inputParameters = {NewAddressingType="", NewExternalIPAddress="", NewSubnetMask="", NewDefaultGateway="", NewPrimaryDNS="", NewSecondaryDNS=""}
    local dns1 = ""
    local dns2 = ""

    -- get setting parameter from XML data
    for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXML,"SetIPInterfaceInfo",k)

          -- NH APP is possible to NOT include NewSecondaryDNS, need support it for nil
--        if tmpValue ~= nil then
            inputParameters[k] = tmpValue
--        else
--            log.console("Invalid parameter: "..k)
--            return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{},"SetIPInterfaceInfo",M.service)
--        end
    end

    -- do validator for setting parameters
    if (validator.soap_data_validate(inputParameters, wan_static_maps) == false) then
        log.console("Validation of SOAP data paramter is failed")
        return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{},"SetIPInterfaceInfo",M.service)
    end

    uci_soap:set("network", "inet_global", "wan_mode", inputParameters.NewAddressingType)
    uci_soap:set("network", "inet_ether", "proto", "static")
    uci_soap:set("network", "inet_ether", "iptype", "fixed")
    uci_soap:set("network", "inet_ether", "ipaddr", inputParameters.NewExternalIPAddress)
    uci_soap:set("network", "inet_ether", "netmask", inputParameters.NewSubnetMask)
    uci_soap:set("network", "inet_ether", "gateway", inputParameters.NewDefaultGateway)
    -- dns
    if type(inputParameters.NewPrimaryDNS) == "string" then
        dns1 = inputParameters.NewPrimaryDNS
    end

    if type(inputParameters.NewSecondaryDNS) == "string" then
        dns2 = inputParameters.NewSecondaryDNS
    end
    wanCommon.wanConfig_DNS(uci_soap, "fixed", dns1, dns2)

    wanCommon.wanConfig_Reload(uci_soap)
    soapCommon.configToSaveOrCommit(uci_soap, "network")

    return soapResponse.buildResponseData("RESPONSE_NOERROR",{},"SetIPInterfaceInfo",M.service)
end

-- not support
function M.SetRemoteManagementEnable()
    return soapResponse.buildResponseData("RESPONSE_NOERROR",{},"SetRemoteManagementEnable",M.service)
end

return M
