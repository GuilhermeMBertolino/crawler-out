local log = require "luci.log"
local soapParser = require "soap.soapParser"
local soapResponse = require "soap.soapResponse"
local soapCommon = require "soap.soapCommon"
local validator = require "commonFunc.validator"
local file = require "commonFunc.file"

local util = require "luci.util"
local uci = require "luci.model.uci".cursor()
local uci_st= require "luci.model.uci".cursor_state()
local uci_soap= require "luci.model.uci".cursor(nil, "/var/soapConfig")
local uci_fw = require "luci.model.uci".cursor("/etc/pconfig", nil)

local installEvents = require "commonFunc.installEvents"
local nixio = require "nixio"
local sha2 = require "sha2"
local pwdCommon = require "webPostHandler.passwdCommon"
require "commonFunc.ntpCommon"
local tz = require "soap.soapService.DeviceInfo"
local TIMEZONE_VER = tz.getTimeZoneVer()
local TIMEZONE_REG = "^<(.*)>"
local TIMEZONE_GMT = "GMT0"
local ATD_SYNC_FILE = "/tmp/xCloud_syncTime"

function removeReadyServices()
    local removeReadyServices_T ={}
    uci_st:foreach("soap","readyServices", function(s)
            table.insert(removeReadyServices_T, s['.name'])
            uci_soap:revert(s['.name'])
            uci_soap:save(s['.name'])
            table.remove(changed_config, s['.name'])
    end)

    for i,v in pairs(removeReadyServices_T) do
        uci_st:revert("soap", v)
    end
    uci_st:save("soap")

    return true
end

function commitReadyServices()
    local removeReadyServices_T ={}
    uci_st:foreach("soap","readyServices", function(s)
            table.insert(removeReadyServices_T, s['.name'])
            table.insert(changed_config, s['.name'])
            uci_soap:commit(s['.name'])
        end
    )

    for i,v in pairs(removeReadyServices_T) do
        uci_st:revert("soap", v)
    end
    uci_st:save("soap")
    return true
end

local getSettingParamByXML = soapCommon.getSettingParamByXML

local M = {}

M.service = "DeviceConfig"

function getRouteNum()
    local count = 0

    uci:foreach("network", "route",
        function(s)
            count = s.target == target and -1 or count
            count = count ~= -1 and count + 1 or count
        end
    )

    return count
end

function M.GetBlockDeviceEnableStatus(dataXml)
    local output = {NewBlockDeviceEnable = {}}
    local action = "GetBlockDeviceEnableStatus"
    local msg = "RESPONSE_NOERROR"

    output["NewBlockDeviceEnable"] = uci:get("landev", "@access_ctrl[0]", "enable")

    return soapResponse.buildResponseData(msg, output, action, M.service)
end

local SetBlockDeviceEnable_maps =
{
    NewBlockDeviceEnable = {data_type = "soap_boolean_int", handler = nil}
}
function M.SetBlockDeviceEnable(dataXml)
    local input = {NewBlockDeviceEnable = ""}
    local action = "SetBlockDeviceEnable"
    local msg = "RESPONSE_NOERROR"

    input = getSettingParamByXML(dataXml, input, action, SetBlockDeviceEnable_maps)

    if type(input) == "string" then
        msg = input
    else
        uci_soap:set("landev", "@access_ctrl[0]", "enable", input.NewBlockDeviceEnable)

        --For the post functions between request "ConfigurationStarted" and "ConfigurationFinished", apply setting by soapCommon.configToSaveOrCommit()
        if soapCommon.configToSaveOrCommit(uci_soap, "landev") then
            log.console("Finish "..action)
        end
    end

    return soapResponse.buildResponseData(msg, {}, action, M.service)
end

function M.GetBlockDeviceStateByDefault(dataXml)
    local output = {NewBlockStateByDefault = {}}
    local action = "GetBlockDeviceStateByDefault"
    local msg = "RESPONSE_NOERROR"

    output["NewBlockStateByDefault"] = ("deny" == uci:get("landev", "@access_ctrl[0]", "rule") and "Block" or "Allow")

    return soapResponse.buildResponseData(msg, output, action, M.service)
end

local SetBlockDeviceStateByDefault_maps =
{
    NewBlockStateByDefault = {data_type = "soap_allow_block", handler = nil}
}
function M.SetBlockDeviceStateByDefault(dataXml)
    local input = {NewBlockStateByDefault = ""}
    local action = "SetBlockDeviceStateByDefault"
    local msg = "RESPONSE_NOERROR"

    input = getSettingParamByXML(dataXml, input, action, SetBlockDeviceStateByDefault_maps)

    if type(input) == "string" then
        msg = input
    else
        uci_soap:set("landev", "@access_ctrl[0]", "rule", "Block" == input.NewBlockStateByDefault and "deny" or "allow")

        --For the post functions between request "ConfigurationStarted" and "ConfigurationFinished", apply setting by soapCommon.configToSaveOrCommit()
        if soapCommon.configToSaveOrCommit(uci_soap, "landev") then
            log.console("Finish "..action)
        end
    end

    return soapResponse.buildResponseData(msg, {}, action, M.service)
end

function M.EnableBlockDeviceForAll(dataXml)
    local action = "EnableBlockDeviceForAll"
    local msg = "RESPONSE_NOERROR"

    -- turn on device blocking
    uci_soap:set("landev", "@access_ctrl[0]", "enable", "1")
    uci_soap:set("landev", "@access_ctrl[0]", "rule", "deny")

    -- set all currently attached devices to allowed
    uci_st:foreach("landev", "dev",
        function(s)
            if s.linkstate == "up" then    -- attached device
                uci_soap:set("landev", s['.name'], "rule", "allow")
            end
        end
    )

    --For the post functions between request "ConfigurationStarted" and "ConfigurationFinished", apply setting by soapCommon.configToSaveOrCommit()
    if soapCommon.configToSaveOrCommit(uci_soap, "landev") then
        log.console("Finish "..action)
    end

    return soapResponse.buildResponseData(msg, {}, action, M.service)
end

function M.DeleteBlockDeviceAll(dataXml)
    local action = "DeleteBlockDeviceAll"
    local msg = "RESPONSE_NOERROR"

    -- clear the entire block device list
    uci:foreach("landev", "dev",
        function(s)
            if s.rule == "deny" then
                uci_soap:delete("landev", s['.name'])
            end
        end
    )

    --For the post functions between request "ConfigurationStarted" and "ConfigurationFinished", apply setting by soapCommon.configToSaveOrCommit()
    if soapCommon.configToSaveOrCommit(uci_soap, "landev") then
        log.console("Finish "..action)
    end

    return soapResponse.buildResponseData(msg, {}, action, M.service)
end

function setBlockDeviceByMAC_validator(parm, value, json)
    ret = false
        log.console("parm="..parm..", value=".. tostring(value) ..", allow nil")
    if (parm == "Schedule" and #value == 0) then
        ret = true
    end
    return ret
end

local SetBlockDeviceByMAC_maps =
{
    NewMACAddress = {data_type = "soap_mac_addr", handler = nil},
    NewAllowOrBlock = {data_type = "soap_allow_block", handler = nil},
    Schedule = {data_type = "number", handler = setBlockDeviceByMAC_validator}    -- schedule not support for attached dev
}
function M.SetBlockDeviceByMAC(dataXml)
    local input = {NewMACAddress = "", NewAllowOrBlock = "", Schedule = ""}
    local action = "SetBlockDeviceByMAC"
    local msg = "RESPONSE_NOERROR"

    input = getSettingParamByXML(dataXml, input, action, SetBlockDeviceByMAC_maps)

    if type(input) == "string" then
        msg = input
    else
        local mac = string.lower(input.NewMACAddress)
        -- MAC address (XX:XX:XX:XX:XX:XX format, or XXXXXXXXXXXX format) to be allowed or blocked
        if nil ~= string.match(mac, ":") then
            mac = util.split(mac, ":")
            mac = string.lower(mac[1]..mac[2]..mac[3]..mac[4]..mac[5]..mac[6])
        end

        -- The MAC address can be non attached devices
        uci_soap:section("landev", "dev", mac)    -- add section if not exist
        uci_soap:set("landev", mac, "rule", "Allow" == input.NewAllowOrBlock and "allow" or "deny")

        --For the post functions between request "ConfigurationStarted" and "ConfigurationFinished", apply setting by soapCommon.configToSaveOrCommit()
        if soapCommon.configToSaveOrCommit(uci_soap, "landev") then
            log.console("Finish "..action)
        end
    end

    return soapResponse.buildResponseData(msg, {}, action, M.service)
end

local DeleteBlockDeviceByMAC_maps =
{
    NewMACAddress = {data_type = "soap_mac_addr", handler = nil}
}
function M.DeleteBlockDeviceByMAC(dataXml)
    local input = {NewMACAddress = ""}
    local action = "DeleteBlockDeviceByMAC"
    local msg = "RESPONSE_NOERROR"

    input = getSettingParamByXML(dataXml, input, action, DeleteBlockDeviceByMAC_maps)

    if type(input) == "string" then
        msg = input
    else
        local mac = string.lower(input.NewMACAddress)
        if nil ~= string.match(mac, ":") then
            mac = util.split(mac, ":")
            mac = string.lower(mac[1]..mac[2]..mac[3]..mac[4]..mac[5]..mac[6])
        end

        -- deleted from the whitelist or blacklist, if exists.
        uci_soap:delete("landev", mac)

        --For the post functions between request "ConfigurationStarted" and "ConfigurationFinished", apply setting by soapCommon.configToSaveOrCommit()
        if soapCommon.configToSaveOrCommit(uci_soap, "landev") then
            log.console("Finish "..action)
        end
    end

    return soapResponse.buildResponseData(msg, {}, action, M.service)
end

function M.GetDeviceListAll(dataXml)
    local output = {NewAllowDeviceList = "", NewBlockDeviceList = ""}
    local action = "GetDeviceListAll"
    local msg = "RESPONSE_NOERROR"
    local allowList = ""
    local blockList = ""
    local allowIdx = 0
    local blockIdx = 0

    uci:foreach("landev", "dev",
        function(s)
            if s.rule ~= nil then
                local device = ""
                local mac = "00:00:00:00:00:00"
                local name = "n/a"
                local connType = "wired"
                local iface

                if s.rule ~= "deny" then
                    allowIdx = allowIdx + 1
                    device = device.."@"..allowIdx..";"
                else
                    blockIdx = blockIdx + 1
                    device = device.."@"..blockIdx..";"
                end

                mac = string.gsub(s['.name'], ("."):rep(2), "%1:"):sub(1, -2)
                device = device..mac..";"

                if s.custom_devname ~= nil then
                    name = s.custom_devname
                elseif s.hostname ~= nil then
                    name = s.hostname
                end
                device = device..name..";"

                iface = uci_st:get("landev", mac, "interface") or "eth"
                connType = (nil ~= string.match(iface, "eth")) and "wired" or "wireless"
                device = device..connType

                if s.rule ~= "deny" then
                    allowList = allowList..device
                else
                    blockList = blockList..device
                end
            end
        end
    )

    -- format: 2@1;11:22:33:44:55:66;AAA;wired@2;11:22:33:44:55:77;BBB;wireless
    output["NewAllowDeviceList"] = allowIdx..allowList
    output["NewBlockDeviceList"] = blockIdx..blockList

    return soapResponse.buildResponseData(msg, output, action, M.service)
end

local AddStaticRoute_maps =
{
    NewRouteName = {data_type = "service_name", handler = nil},
    NewRoutePrivate = {data_type = "soap_boolean_int", handler = nil},
    NewRouteActive = {data_type = "soap_boolean_int", handler = nil},
    NewRouteDestinationIP = {data_type = "ipv4_addr", handler = nil},
    NewRouteIPSubnetMask = {data_type = "ipv4_netmask", handler = nil},
    NewRouteGatewayIP = {data_type = "ipv4_addr", handler = nil},
    NewRouteMetric = {data_type = "route_metric", handler = nil},
    NewStaticRouteAdd = {data_type = "soap_boolean_int", handler = nil}
}
function M.AddStaticRoute(dataXml)
    local input = {NewRouteName = "", NewRoutePrivate = "", NewRouteActive = "", NewRouteDestinationIP = "",
        NewRouteIPSubnetMask = "", NewRouteGatewayIP = "", NewRouteMetric = "", NewStaticRouteAdd = ""}
    local action = "AddStaticRoute"
    local msg = "RESPONSE_NOERROR"

    input = getSettingParamByXML(dataXml, input, action, AddStaticRoute_maps)

    if type(input) == "string" then
        msg = input
    else
        if input.NewStaticRouteAdd == "1" then
            local route = string.format("@route[%d]", getRouteNum(input.NewRouteDestinationIP))

            uci:add("network", "route")
            uci:set("network", route, "target", input.NewRouteDestinationIP)    -- target is related to netmask
            uci:set("network", route, "interface", (input.NewRoutePrivate == "1") and "lan" or "wan")
            uci:set("network", route, "netmask", input.NewRouteIPSubnetMask)
            uci:set("network", route, "gateway", input.NewRouteGatewayIP)    -- gateway is related to interface
            uci:set("network", route, "metric", input.NewRouteMetric)
            uci:set("network", route, "name", input.NewRouteName)
            uci:set("network", route, "disabled", (input.NewRouteActive ~= "1") and "1" or "0")
            uci:commit("network")
            table.insert(changed_config, "network")
        end
    end

    return soapResponse.buildResponseData(msg, {}, action, M.service)
end

local DelStaticRoute_maps =
{
    NewStaticRouteIndex = {data_type = "number", handler = nil},
    NewStaticRouteAdd = {data_type = "soap_boolean_int", handler = nil}
}
function M.DelStaticRoute(dataXml)
    local input = {NewStaticRouteIndex = "", NewStaticRouteAdd = ""}
    local action = "DelStaticRoute"
    local msg = "RESPONSE_NOERROR"

    input = getSettingParamByXML(dataXml, input, action, DelStaticRoute_maps)

    if type(input) == "string" then
        msg = input
    else
        if input.NewStaticRouteAdd == "0" then
            uci:delete("network", "@route["..input.NewStaticRouteIndex.."]")
            uci:commit("network")
            table.insert(changed_config, "network")
        end
    end

    return soapResponse.buildResponseData(msg, {}, action, M.service)
end

function M.GetStaticRouteTbl(dataXml)
    local output = {NewStaticRouteTbl = ""}
    local action = "GetStaticRouteTbl"
    local msg = "RESPONSE_NOERROR"
    local list = ""

    uci:foreach("network", "route",
        function(s)
            local destIp = uci:get("network", s['.name'], "target")
            local netmask = uci:get("network", s['.name'], "netmask")
            local gateway = uci:get("network", s['.name'], "gateway")
            local metric = uci:get("network", s['.name'], "metric")
            local isActive = uci:get("network", s['.name'], "disabled") == "1" and "0" or "1"
            local isPrivate = uci:get("network", s['.name'], "interface") == "lan" and "1" or "0"
            local name = uci:get("network", s['.name'], "name") or "unknown"

            list = list..destIp..":"..netmask..":"..gateway..":"..metric..":"..isActive..":"..isPrivate..":"..name..";"
        end
    )

    -- format: Destination IP:Subnetmask:GatewayIP:Matric:Active:Private:RouteName;
    output["NewStaticRouteTbl"] = list

    return soapResponse.buildResponseData(msg, output, action, M.service)
end

local SetEnable_maps =
{
    NewEnable = {data_type = "soap_boolean_int", handler = nil}
}
function M.SetEnable(dataXml)
    local input = {NewEnable = ""}
    local action = "SetEnable"
    local msg = "RESPONSE_NOERROR"

    input = getSettingParamByXML(dataXml, input, action, SetEnable_maps)

    if type(input) == "string" then
        msg = input
    else
        -- send RA installEvent - "install done"
        if input.NewEnable == "0" then
            local exec  = require "luci.util".exec
            installEvents.send("install done", "Installation done")
            exec("puDataStr set installEvent installMethod APP")    -- Add for JIRA RAX5-136
        end

        uci_soap:revert("netgear", "data", "system")
        uci_soap:section("netgear", "data", "system", {blank_state=input.NewEnable} )
        if soapCommon.configToSaveOrCommit(uci_soap, "netgear") then
            log.console("Finish "..action)
        end

        if input.NewEnable == "0" then
            uci_st:section("soap", "data", "blank_state", {flag="1"})
            uci_st:save("soap")
        end
    end

    return soapResponse.buildResponseData(msg, {}, action, M.service)
end

local SetBlockSiteEnable_maps =
{
    NewBlockSiteEnable = {data_type = "soap_boolean_int", handler = nil}
}
function M.SetBlockSiteEnable(dataXml)
    local input = {NewBlockSiteEnable = ""}
    local action = "SetBlockSiteEnable"
    local msg = "RESPONSE_NOERROR"

    input = getSettingParamByXML(dataXml, input, action, SetBlockSiteEnable_maps)

    if type(input) == "string" then
        msg = input
    else
        uci:set("blocksite", "@UrlFilterCfg[0]", "blocking_type", input.NewBlockSiteEnable == "1" and "always" or "never")
        uci:commit("blocksite")
        table.insert(changed_config, "blocksite")
    end

    return soapResponse.buildResponseData(msg, {}, action, M.service)
end

function M.GetBlockSiteInfo(dataXml)
    local output = {NewBlockSiteEnable = "", NewBlockSiteName = ""}
    local action = "GetBlockSiteInfo"
    local msg = "RESPONSE_NOERROR"
    local list = ""
    local idx = 0

    uci:foreach("blocksite", "site",
        function(s)
            local name = "@"..uci:get("blocksite", s['.name'], "name") or "unknown"
            list = list..name
            idx = idx + 1
        end
    )

    output["NewBlockSiteEnable"] = uci:get("blocksite", "@UrlFilterCfg[0]", "blocking_type") ~= "never" and "1" or "0"
    -- format: num@name_List1@name_List2...
    output["NewBlockSiteName"] = idx..list

    return soapResponse.buildResponseData(msg, output, action, M.service)
end

-- <<< Not supported actions
function M.IsDLNASupported(dataXml)
    local output = {NewDLNASupported = ""}
    local action = "IsDLNASupported"
    local msg = "RESPONSE_NOERROR"

    -- DLNA not supported
    output["NewDLNASupported"] = "0"

    return soapResponse.buildResponseData(msg, output, action, M.service)
end

function M.IsDLNAEnabled(dataXml)
    local output = {NewDLNAEnabled = ""}
    local action = "IsDLNAEnabled"
    local msg = "RESPONSE_NOERROR"

    -- DLNA not supported
    output["NewDLNAEnabled"] = "0"

    return soapResponse.buildResponseData(msg, output, action, M.service)
end

local SetDLNAStatus_maps =
{
    NewDLNAStatus = {data_type = "soap_boolean_int", handler = nil}
}
function M.SetDLNAStatus(dataXml)
    local input = {NewDLNAStatus = ""}
    local action = "SetDLNAStatus"
    local msg = "RESPONSE_NOERROR"

    --[[get setting parameter from XML data]]
    input = getSettingParamByXML(dataXml, input, action, SetDLNAStatus_maps)

    if type(input) == "string" then
        msg = input
    else
        -- DLNA not supported
    end

    return soapResponse.buildResponseData(msg, {}, action, M.service)
end

local SetQoSEnableStatus_maps =
{
    NewQoSEnable = {data_type = "soap_boolean_int", handler = nil}
}
function M.SetQoSEnableStatus(dataXml)
    local input = {NewQoSEnable = ""}
    local action = "SetQoSEnableStatus"
    local msg = "RESPONSE_NOERROR"

    --[[get setting parameter from XML data]]
    input = getSettingParamByXML(dataXml, input, action, SetQoSEnableStatus_maps)

    if type(input) == "string" then
        msg = input
    else
        -- Qos not supported
    end

    return soapResponse.buildResponseData(msg, {}, action, M.service)
end

function M.GetQoSEnableStatus(dataXml)
    local output = {NewQoSEnableStatus = ""}
    local action = "GetQoSEnableStatus"
    local msg = "RESPONSE_NOERROR"

    -- Qos not supported
    output["NewQoSEnableStatus"] = "0"

    return soapResponse.buildResponseData(msg, output, action, M.service)
end

local SetBandwidthControlEnableStatus_maps =
{
    NewEnableStatus = {data_type = "soap_boolean_int", handler = nil},
    NewBandwidthControlOption = {data_type = "soap_bandwidth_ctl", handler = nil},
    NewUplinkBandwidth = {data_type = "number", handler = nil}
}

function M.SetBandwidthControlEnableStatus(dataXml)
    local input = {NewEnableStatus = "", NewBandwidthControlOption = "", NewUplinkBandwidth = ""}
    local action = "SetBandwidthControlEnableStatus"
    local msg = "RESPONSE_NOERROR"

    --[[get setting parameter from XML data]]
    input = getSettingParamByXML(dataXml, input, action, SetBandwidthControlEnableStatus_maps)

    if type(input) == "string" then
        msg = input
    else
        -- Qos not supported
    end

    return soapResponse.buildResponseData(msg, {}, action, M.service)
end

function M.GetBandwidthControlEnableStatus(dataXml)
    local output = {NewEnableStatus = "", NewBandwidthControlOption = "", NewUplinkBandwidth = ""}
    local action = "GetBandwidthControlEnableStatus"
    local msg = "RESPONSE_NOERROR"

    -- Qos not supported
    output["NewEnableStatus"] = "0"
    output["NewBandwidthControlOption"] = "AutoBandwidth"
    output["NewUplinkBandwidth"] = "0"

    return soapResponse.buildResponseData(msg, output, action, M.service)
end
-- Not supported actions >>>

function M.SetConfigurationSync(dataXml)
    local action = "SetConfigurationSync"
    local msg = "RESPONSE_NOERROR"
    local capsule = dataXml["SOAP-ENV:Envelope"]["SOAP-ENV:Body"]["M1:"..action]

    -- Automation tool or dataXml can't support nested table for input dataXml
    -- only support 1 layer actions at present
    for k, v in pairs(capsule) do
        if k ~= "_attr" then
            local func = "M."..k.."(dataXml, action)"
            loadstring(func)
        end
    end

    return soapResponse.buildResponseData(msg, {}, action, M.service)
end

function M.SOAPLogin (username, password, clientIpAddr, clientToken )

    local soapAuth = require"soap.soapAuth"
    local auth = require"commonFunc.auth"
    local soap = require"soap"
    local clientMac = soapAuth.getClientMac(clientIpAddr)
    local unescapePassword =  soap.unescape(password)

    soapAuth.updateAllClinetsBlockState()
    -- for debug
    --log.force("username "..username.." unescapePassword "..unescapePassword)

    if not (soapAuth.isBlockClient(clientMac)) then
      if string.len(username) > 64 or string.len(unescapePassword) > 64 then
          return soapResponse.buildResponseData("RESPONSE_STRING_ARGUMENT_TOO_LONG",{},"SOAPLogin",M.service)
      end

      local result = auth.checkpasswd(username, unescapePassword)

      if result then
          local clientCount = soapAuth.getClientInfoNumber(soapAuth.getClientInfoTable())

          if clientCount >= soapAuth.MAX_SOAP_LOGIN_TOKENS then
            soapAuth.removeTimeoutClient()
            return soapResponse.buildResponseData("RESPONSE_INVALID_AUTHENTICATE",{},"SOAPLogin",M.service)
          else
            local newToken = soapAuth.updateClientInfoToLoginStatus(clientMac, clientIpAddr, clientToken)
            return soapResponse.buildResponseData("RESPONSE_NOERROR",{},"SOAPLogin",M.service), newToken
          end
      else
        soapAuth.updateClinetInfoForBlockState(clientMac, clientIpAddr)
        return soapResponse.buildResponseData("RESPONSE_INVALID_AUTHENTICATE",{},"SOAPLogin",M.service)
      end

    else
      return soapResponse.buildResponseData("RESPONSE_BLOCK_DEVICE",{},"SOAPLogin",M.service)
    end

    return soapResponse.buildResponseData("RESPONSE_INVALID_AUTHENTICATE",{},"SOAPLogin",M.service)
end

function M.SOAPLogout(dataXml)
    local cgilua = require "cgilua"
    local soapAuth = require"soap.soapAuth"
    local clientIpAddr = cgilua.servervariable("REMOTE_ADDR")
    local clientMac = soapAuth.getClientMac(clientIpAddr)
     soapAuth.removeClient(clientMac)
    return soapResponse.buildResponseData("RESPONSE_NOERROR",{},"SOAPLogout",M.service)
end

function M.GetTimeZoneInfo(dataXml)

    --[[initialize output parameters]]
    local outputParameters = {NewTimeZone="", NewDaylightSaving="", NewIndexValue=""}
    local NewIndexValue = 0
    local timezone_name = uci:get("system", "@system[0]", "timezone_name")
    local NewDaylightSaving = uci:get("system", "ntp", "auto_daylight_saving")
    local NewTimeZone = "00"

    for i = 1, #ntpList do
        if ntpList[i].timeZoneName == timezone_name then
            NewIndexValue = i - 1
            if string.find(ntpList[i].timeZone, TIMEZONE_GMT) then
                NewTimeZone = "00"
            else
                NewTimeZone = string.match(ntpList[i].timeZone, TIMEZONE_REG)
            end
            break;
        end
    end

    outputParameters["NewTimeZone"] = NewTimeZone
    outputParameters["NewIndexValue"] = NewIndexValue
    outputParameters["NewDaylightSaving"] = NewDaylightSaving

    return soapResponse.buildResponseData("RESPONSE_NOERROR",outputParameters,"GetTimeZoneInfo",M.service)

end

local function getDefaultNTPServerByTimezoneName(name)

    local priNTPServer
    local secNTPServer
    for i = 1, #ntpList do
        if name == ntpList[i].timeZoneName then
            priNTPServer = ntpList[i].priNTPServer
            secNTPServer = ntpList[i].secNTPServer
            break
        end
    end

    return {priNTPServer, secNTPServer}

end

local NTP_OPTION_DEFAULT = "Default"
local NTP_OPTION_PREFERRED = "Preferred"

local SetNTP_maps =
    {
        Option          = { data_type = "soap_ntp_option",     handler = nil }
        --, NTPServer       = { data_type = "ntp_server",     handler = nil }
    }

function M.SetNTP(dataXml)

    local action = "SetNTP"
    local msg = "RESPONSE_NOERROR"

    --[[initialize setting parameters]]
    local input = {Option="", NTPServer=""}
    local isNTPChanged = false

    input = getSettingParamByXML(dataXml, input, action, SetNTP_maps)

    if type(input) == "string" then
        msg = input
    else

        local timezone_name = uci:get("system", "@system[0]", "timezone_name")
        local defaultServer = getDefaultNTPServerByTimezoneName(timezone_name)
        local isPreferred = uci:get("system", "ntp", "preferred_ntp_server_enable")

        if input.Option == NTP_OPTION_DEFAULT then
            if isPreferred == "1" then
                isPreferred = "0"
                isNTPChanged = true
            else
                return soapResponse.buildResponseData("RESPONSE_NOERROR", {}, action, M.service)
            end
        else
            -- When SOAP tool input empty string, paramter NTPServer type is table
            if type(input.NTPServer) == "table" or input.NTPServer == nil or string.len(input.NTPServer) == 0 then
                return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED", {}, action, M.service)
            else
                isPreferred = "1"
                defaultServer[1] = input.NTPServer
                isNTPChanged = true
            end
        end

        if isNTPChanged == true then
            uci_soap:revert("system", "timeserver", "ntp")
            uci_soap:section("system", "timeserver", "ntp", {preferred_ntp_server_enable=isPreferred} )
            uci_soap:set_list("system", "ntp", "server", defaultServer)
            log.console("input.Option:"..tostring(input.Option))
            if input.Option == OPTION_PREFERRED then
                uci_soap:section("system", "timeserver", "ntp", {preferred_ntp_server=input["NTPServer"]})
            end
            soapCommon.configToSaveOrCommit(uci_soap,"system")
        end
    end
    return soapResponse.buildResponseData(msg, {}, action, M.service)

end

local function getTimezoneIndexByName(name)

    local curTimezoneIdx = 0
    for i = 1, #ntpList do
        if name == ntpList[i].timeZoneName then
            curTimezoneIdx = i - 1
            break
        end
    end

    return curTimezoneIdx
end

local SetTimeZoneByIndex_maps =
    {
        NewIndexValue          = { data_type = "soap_time_zone_index",     handler = nil },
        NewDaylightSaving      = { data_type = "soap_boolean_int",     handler = nil }
    };

function M.SetTimeZoneByIndex(dataXml)

    local action = "SetTimeZoneByIndex"
    local msg = "RESPONSE_NOERROR"

    --[[initialize setting parameters]]
    local input = {NewIndexValue="", NewDaylightSaving=""}

    input = getSettingParamByXML(dataXml, input, action, SetTimeZoneByIndex_maps)

    if type(input) == "string" then
        msg = input
    else

        local NewIndexValue = tonumber(input.NewIndexValue)
        local NewDaylightSaving = tonumber(input.NewDaylightSaving)
        local isNTPChanged = false
        local isDSTChanged = false

        -- Spec only define 0 - 44
        if NewIndexValue > 44 then
            NewIndexValue = 44
        end

        local curTimezoneName = uci:get("system", "@system[0]", "timezone_name")
        local curTimezoneIdx = getTimezoneIndexByName(curTimezoneName)
        local curDaylightSaving = tonumber(uci:get("system", "ntp", "auto_daylight_saving"))
        local defaultServer = getDefaultNTPServerByTimezoneName(curTimezoneName)
        local isPreferred = uci:get("system", "ntp", "preferred_ntp_server_enable")
        local preferredServer = uci:get("system", "ntp", "preferred_ntp_server")
        local newTimezoneName = "GMT"
        local newTimezone = TIMEZONE_GMT
        local newNTPServer = defaultServer
        local newTimezoneIndex = 1

        if NewIndexValue ~= curTimezoneIdx then
            isNTPChanged = true
            NewIndexValue = NewIndexValue + 1
        end

        if NewDaylightSaving ~= curDaylightSaving then
            isDSTChanged = true
        end

        if isNTPChanged == true or isDSTChanged == true then
            newTimezoneName = ntpList[NewIndexValue].timeZoneName
            if NewDaylightSaving == 1 then
                newTimezone = ntpList[NewIndexValue].timeZoneDst

            else
                newTimezone = ntpList[NewIndexValue].timeZone
            end
            if isPreferred == "1" then
                newNTPServer[1] = preferredServer
            else
                newNTPServer = defaultServer
            end
            uci:set("system", "@system[0]", "timezone_name", newTimezoneName)
            uci:set("system", "@system[0]", "timezone", newTimezone)
            uci:set("system", "ntp", "auto_daylight_saving", NewDaylightSaving)
            uci:delete("system", "ntp", "server")
            uci:set_list("system", "ntp", "server", newNTPServer)
            uci:commit("system")
            table.insert(changed_config, "system")
        end
    end
    return soapResponse.buildResponseData(msg, {}, action, M.service)

end

function SetTimeZone_validator(parm, value)

    local ret = false
    if parm == "NewTimeZone" and value ~= nil then
        ret = true
    else
        ret = true
    end
end

local SetTimeZone_maps =
{
    NewTimeZone            = { data_type = "soap_time_zone_utc",            handler = SetTimeZone_validator },
    NewDaylightSaving      = { data_type = "soap_boolean_int",              handler = nil }
};

function M.SetTimeZone(dataXml)

    local action = "SetTimeZone"
    local msg = "RESPONSE_NOERROR"

    --[[initialize setting parameters]]
    local inputParameters = {NewTimeZone="", NewDaylightSaving="", TimeZoneOffset="", ConfiguredFrom=""}
    inputParameters = getSettingParamByXML(dataXml, inputParameters, action, SetTimeZone_maps)

    if type(inputParameters) == "string" then
        msg = inputParameters
    else

        local NewTimeZone = inputParameters.NewTimeZone
        if string.find(NewTimeZone, ":") then
            NewTimeZone = NewTimeZone:gsub(":", "")
        end
        NewTimeZone = tonumber(NewTimeZone)
        local NewDaylightSaving = tonumber(inputParameters.NewDaylightSaving)
        local ConfiguredFrom = "0"
        if tonumber(TIMEZONE_VER) >= 2 then
            if inputParameters.ConfiguredFrom ~= nil and tonumber(inputParameters.ConfiguredFrom) >= 1 then
                if (file.file_exists(ATD_SYNC_FILE)) then
                    return soapResponse.buildResponseData("RESPONSE_ATD_ACTIVE_SYNC", {}, action, M.service)
                else
                    if tonumber(inputParameters.ConfiguredFrom) > -720 and tonumber(inputParameters.ConfiguredFrom) > 840 then
                        return soapResponse.buildResponseData("RESPONSE_INVALID_ARGUMENTS", {}, action, M.service)
                    elseif tonumber(inputParameters.ConfiguredFrom) > 2 and tonumber(inputParameters.ConfiguredFrom) < 1 then
                        return soapResponse.buildResponseData("RESPONSE_INVALID_ARGUMENTS", {}, action, M.service)
                    else
                        ConfiguredFrom = inputParameters.ConfiguredFrom
                    end
                end

            end
        end

        if NewTimeZone == 14 then
            NewTimeZone = 13
        end

        local curTimezoneName = uci:get("system", "@system[0]", "timezone_name")
        local defaultServer = getDefaultNTPServerByTimezoneName(curTimezoneName)
        local curTimezoneIdx = getTimezoneIndexByName(curTimezoneName)
        local curTimezone = 0
        local curDaylightSaving = tonumber(uci:get("system", "ntp", "auto_daylight_saving"))
        local isPreferred = uci:get("system", "ntp", "preferred_ntp_server_enable")
        local preferredServer = uci:get("system", "ntp", "preferred_ntp_server")
        local newNTPServer = defaultServer
        local newTimezoneName = "GMT"
        local timezone = 0

        if ntpList[curTimezoneIdx+1].timeZone == TIMEZONE_GMT then
            curTimezone = 0
        else
            curTimezone = tonumber(string.match(ntpList[curTimezoneIdx+1].timeZone, TIMEZONE_REG))
        end

        if NewTimeZone == curTimezone and NewDaylightSaving == curDaylightSaving then
            return soapResponse.buildResponseData("RESPONSE_NOERROR", {}, action, M.service)
        else
            for i = 1, #ntpList do

                if ntpList[i].timeZone == TIMEZONE_GMT then
                    timezone = 0
                else
                    timezone = tonumber(string.match(ntpList[i].timeZone, TIMEZONE_REG))
                end

                if NewTimeZone == timezone then
                    newTimezoneName = ntpList[i].timeZoneName
                    if NewDaylightSaving == 1 then
                        newTimezone = ntpList[i].timeZoneDst
                    else
                        newTimezone = ntpList[i].timeZone
                    end
                    if isPreferred == "1" then
                        newNTPServer[1] = preferredServer
                    else
                        newNTPServer = defaultServer
                    end
                    uci:set("system", "@system[0]", "timezone_name", newTimezoneName)
                    uci:set("system", "@system[0]", "timezone", newTimezone)
                    if tonumber(TIMEZONE_VER) >= 2 and tonumber(ConfiguredFrom) >= 1 then
                        uci:set("system", "@system[0]", "timezone_state", ConfiguredFrom)
                    end
                    uci:set("system", "ntp", "auto_daylight_saving", NewDaylightSaving)
                    uci:delete("system", "ntp", "server")
                    uci:set_list("system", "ntp", "server", newNTPServer)
                    uci:commit("system")
                    table.insert(changed_config, "system")
                    break
                end
            end
        end
    end

    return soapResponse.buildResponseData(msg, {}, action, M.service)

end

function M.GetSecurityQuestions(dataXml)

    --[[initialize output parameters]]
    local outputParameters = {NewSecurityQuestion1="", NewSecurityQuestion2=""}

    outputParameters['NewSecurityQuestion1'] = uci:get("loginpwd","config","question1") or "0"
    outputParameters['NewSecurityQuestion2'] = uci:get("loginpwd","config","question2") or "0"

    return soapResponse.buildResponseData("RESPONSE_NOERROR",outputParameters,"GetSecurityQuestions",M.service)

end

function M.GetInfo(dataXml)

    --[[initialize output parameters]]
    local outputParameters = {BlankState="", NewBlockSiteEnable="", NewBlockSiteName="", NewTimeZone="", NewDaylightSaving="", TimeZoneOffset= ""}

    local BlankState = tonumber(uci:get("netgear","system","blank_state"))
    local NewBlockSiteEnable = 0
    local blockType = uci:get("blocksite","@UrlFilterCfg[0]","blocking_type")
    local curTimezoneName = uci:get("system", "@system[0]", "timezone_name")
    local curTimezoneIdx = getTimezoneIndexByName(curTimezoneName)
    local NewBlockSiteName = ""
    local NewTimeZone = ntpList[curTimezoneIdx + 1].timeZone
    local NewDaylightSaving = tonumber(uci:get("system","ntp","auto_daylight_saving"))
    local TimeZoneOffset = "0"
    local TimeZoneState = uci:get("system","@system[0]","timezone_state") or "0"
    local count = 0
    local length = 0

    if string.find(NewTimeZone, TIMEZONE_GMT) then
        NewTimeZone = "00"
    else
        NewTimeZone = NewTimeZone:match(TIMEZONE_REG)
    end

    if blockType == "always" or blockType == "schedule" then
        NewBlockSiteEnable = 1
    else
        NewBlockSiteEnable = 0
    end

    uci:foreach("blocksite", "site",
        function(s)
            if s.url ~= nil and count < 10 then

                if string.len(s.url) < 100 then
                    if count > 0 then
                        NewBlockSiteName = NewBlockSiteName.."@"
                    end
                    NewBlockSiteName = NewBlockSiteName..s.url
                    count = count + 1
                end
            end
        end
    )

    if count > 0 then
        NewBlockSiteName = count.."@"..NewBlockSiteName
    else
        NewBlockSiteName = 0
    end

    outputParameters['BlankState'] = BlankState
    outputParameters['NewBlockSiteEnable'] = NewBlockSiteEnable
    outputParameters['NewBlockSiteName'] = NewBlockSiteName
    outputParameters['NewTimeZone'] = NewTimeZone
    outputParameters['NewDaylightSaving'] = NewDaylightSaving
    TimeZoneOffset = convertTimeZoneToOffset(NewTimeZone)
    outputParameters['TimeZoneOffset'] = TimeZoneOffset

    -- It only require version 2.0 or older version
    if tonumber(TIMEZONE_VER) >= 2 then
        outputParameters.TimeZoneState = TimeZoneState
    end
    return soapResponse.buildResponseData("RESPONSE_NOERROR",outputParameters,"GetInfo",M.service)

end

local EnableTrafficMeter_maps =
    {
        NewTrafficMeterEnable       = { data_type = "soap_boolean_int",     handler = nil }
    };

function M.EnableTrafficMeter(dataXml)

    local action = "EnableTrafficMeter"
    local msg = "RESPONSE_NOERROR"

    --[[initialize setting parameters]]
    local input = { NewTrafficMeterEnable="" }

    input = getSettingParamByXML(dataXml, input, action, EnableTrafficMeter_maps)

    if type(input) == "string" then
        msg = input
    else

        local NewTrafficMeterEnable = input.NewTrafficMeterEnable
        local curTmControl = (uci:get("tm", "tm_control", "traffic_on") == "true") and "1" or "0"
        local isNeedCommit = false

        if NewTrafficMeterEnable ~= curTmControl then
            isNeedCommit = true
        end

        if isNeedCommit == true then
            uci:set("tm", "tm_control", "traffic_on", (NewTrafficMeterEnable == "1") and "true" or "false")
            uci:commit("tm")
            table.insert(changed_config, "trafficMeter")
        end
    end
    return soapResponse.buildResponseData(msg, {}, action, M.service)

end

function M.GetTrafficMeterEnabled(dataXml)

    local action = "GetTrafficMeterEnabled"

    --[[initialize output parameters]]
    local outputParameters = { NewTrafficMeterEnable="" }
    local NewTrafficMeterEnable = (uci:get("tm", "tm_control", "traffic_on") == "true") and "1" or "0"

    outputParameters['NewTrafficMeterEnable'] = NewTrafficMeterEnable

    return soapResponse.buildResponseData("RESPONSE_NOERROR", outputParameters, action, M.service)
end

local SetTrafficMeterOptions_maps =
    {
        NewControlOption    = { data_type = "soap_traffic_meter_option",    handler = nil },
        NewMonthlyLimit     = { data_type = "number",                       handler = nil },
        RestartHour         = { data_type = "number",                       handler = nil },
        RestartMinute       = { data_type = "number",                       handler = nil },
        RestartDay          = { data_type = "number",                       handler = nil }
    };

local SOAP_TIME_NO_LIMIT = "No Limit"
local GUI_TIME_NO_LIMIT  = "No limit"

function M.SetTrafficMeterOptions(dataXml)

    local action = "SetTrafficMeterOptions"
    local msg = "RESPONSE_NOERROR"

    --[[initialize setting parameters]]
    local input = { NewControlOption="", NewMonthlyLimit="", RestartHour="", RestartMinute="", RestartDay="" }

    input = getSettingParamByXML(dataXml, input, action, SetTrafficMeterOptions_maps)

    if type(input) == "string" then
        msg = input
    else

        local NewControlOption = input.NewControlOption
        local NewMonthlyLimit = tonumber(input.NewMonthlyLimit) or 0
        local RestartHour = tonumber(input.RestartHour) or 0
        local RestartMinute = tonumber(input.RestartMinute) or 0
        local RestartDay = tonumber(input.RestartDay) or 0

        if string.len(NewControlOption) > 28 then
            return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{}, action, M.service)
        end

        if RestartHour > 24 or RestartHour < 0 then
            return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{}, action, M.service)
        end

        if RestartMinute > 60 or RestartMinute < 0 then
            return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{}, action, M.service)
        end

        if RestartDay > 28 or RestartDay < 1 then
            return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{}, action, M.service)
        end

        local CurControlOption = uci:get("tm", "tm_control", "contrl_type") or "No Limit"
        local CurMonthlyLimit  = tonumber(uci:get("tm", "tm_control", "volume_monthly_limit") or "0")
        local CurRestartHour = tonumber(uci:get("tm", "tm_control", "hour") or "0")
        local CurRestartMinute = tonumber(uci:get("tm", "tm_control", "min") or "0")
        local CurRestartDay = tonumber(uci:get("tm", "tm_control", "day") or "1")
        local isNeedCommit = false

        if NewControlOption == SOAP_TIME_NO_LIMIT then
            NewControlOption = GUI_TIME_NO_LIMIT
        end

        if CurControlOption ~= NewControlOption or CurMonthlyLimit ~= NewMonthlyLimit or CurRestartHour ~= RestartHour or CurRestartMinute ~= RestartMinute or RestartDay ~= CurRestartDay then
            isNeedCommit = true
        end

        if isNeedCommit == true then
            uci:set("tm", "tm_control", "contrl_type", NewControlOption)
            uci:set("tm", "tm_control", "volume_monthly_limit", NewMonthlyLimit)
            uci:set("tm", "tm_control", "hour", RestartHour)
            uci:set("tm", "tm_control", "min", RestartMinute)
            uci:set("tm", "tm_control", "day", RestartDay)
            uci:commit("tm")
            table.insert(changed_config, "trafficMeter")
        end
    end
    return soapResponse.buildResponseData(msg, {}, action, M.service)
end

function M.GetTrafficMeterOptions(dataXml)

    local action = "GetTrafficMeterOptions"

    --[[initialize output parameters]]
    local outputParameters = { NewControlOption="", NewMonthlyLimit="", RestartHour="", RestartMinute="", RestartDay=""}

    local NewControlOption = uci:get("tm", "tm_control", "contrl_type") or "No Limit"
    local NewMonthlyLimit =  uci:get("tm", "tm_control", "volume_monthly_limit") or "0"
    local RestartHour = tonumber(uci:get("tm", "tm_control", "hour") or "0")
    local RestartMinute = tonumber(uci:get("tm", "tm_control", "min") or "0")
    local RestartDay = tonumber(uci:get("tm", "tm_control", "day") or "0")

    if RestartHour > 24 then
        RestartHour = 24
    elseif RestartHour < 0 then
        RestartHour = 0
    end

    if RestartMinute > 60 then
        RestartMinute = 60
    elseif RestartMinute < 0 then
        RestartMinute = 0
    end

    if RestartDay > 28 then
        RestartDay = 28
    elseif RestartDay < 1 then
        RestartDay = 1
    end

    if NewControlOption == GUI_TIME_NO_LIMIT then
        NewControlOption = SOAP_TIME_NO_LIMIT
    end

    outputParameters['NewControlOption'] = NewControlOption
    outputParameters['NewMonthlyLimit'] = NewMonthlyLimit
    outputParameters['RestartHour'] = RestartHour
    outputParameters['RestartMinute'] = RestartMinute
    outputParameters['RestartDay'] = RestartDay

    return soapResponse.buildResponseData("RESPONSE_NOERROR", outputParameters, action, M.service)
end

function M.GetTrafficMeterStatistics(dataXml)

    local action = "GetTrafficMeterStatistics"
    --[[initialize output parameters]]
    local outputParameters =
    {
        NewTodayConnectionTime = "",
        NewTodayUpload = "",
        NewTodayDownload = "",
        NewYesterdayConnectionTime = "",
        NewYesterdayUpload = "",
        NewYesterdayDownload = "",
        NewWeekConnectionTime = "",
        NewWeekUpload = "",
        NewWeekDownload= "",
        NewMonthConnectionTime = "",
        NewMonthUpload = "",
        NewMonthDownload = "",
        NewLastMonthConnectionTime = "",
        NewLastMonthUpload = "",
        NewLastMonthDownload = ""
    }

    outputParameters.NewTodayConnectionTime = uci_st:get("tm", "tm_statistics", "today_conntime")
    outputParameters.NewTodayUpload = uci_st:get("tm", "tm_statistics", "today_upload")
    outputParameters.NewTodayDownload = uci_st:get("tm", "tm_statistics", "today_download")

    outputParameters.NewYesterdayConnectionTime = uci_st:get("tm", "tm_statistics", "yesterday_conntime")
    outputParameters.NewYesterdayUpload = uci_st:get("tm", "tm_statistics", "yesterday_upload")
    outputParameters.NewYesterdayDownload = uci_st:get("tm", "tm_statistics", "yesterday_download")

    outputParameters.NewWeekConnectionTime = uci_st:get("tm", "tm_statistics", "thisweek_conntime")
    outputParameters.NewWeekUpload = uci_st:get("tm", "tm_statistics", "thisweek_upload").."/"..uci_st:get("tm", "tm_statistics", "thisweek_uploadavg")
    outputParameters.NewWeekDownload = uci_st:get("tm", "tm_statistics", "thisweek_download").."/"..uci_st:get("tm", "tm_statistics", "thisweek_downloadavg")

    outputParameters.NewMonthConnectionTime = uci_st:get("tm", "tm_statistics", "thismonth_conntime")
    outputParameters.NewMonthUpload = uci_st:get("tm", "tm_statistics", "thismonth_upload").."/"..uci_st:get("tm", "tm_statistics", "thismonth_uploadavg")
    outputParameters.NewMonthDownload = uci_st:get("tm", "tm_statistics", "thismonth_download").."/"..uci_st:get("tm", "tm_statistics", "thismonth_downloadavg")

    outputParameters.NewLastMonthConnectionTime = uci_st:get("tm", "tm_statistics", "lastmonth_conntime")
    outputParameters.NewLastMonthUpload = uci_st:get("tm", "tm_statistics", "lastmonth_upload").."/"..uci_st:get("tm", "tm_statistics", "lastmonth_uploadavg")
    outputParameters.NewLastMonthDownload = uci_st:get("tm", "tm_statistics", "lastmonth_download").."/"..uci_st:get("tm", "tm_statistics", "lastmonth_downloadavg")

    return soapResponse.buildResponseData("RESPONSE_NOERROR", outputParameters, action, M.service)
end

local Loaddefault_maps =
    {
        NewLoaddefault       = { data_type = "number",     handler = nil }
    };

function M.Loaddefault(dataXml)

    local action = "Loaddefault"
    local msg = "RESPONSE_NOERROR"

    --[[initialize setting parameters]]
    local input = { NewLoaddefault=""}

    input = getSettingParamByXML(dataXml, input, action, Loaddefault_maps)

    if type(input) == "string" then
        msg = input
    else

        if input.NewLoaddefault ~= "1" then
            return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{}, action, M.service)
        end

        --os.execute("(sleep 1 && factory_reset.sh) &")
        local fork_exec = require"commonFunc.fork".fork_exec
        fork_exec("sleep 3;factory_reset.sh;reboot")

    end

    return soapResponse.buildResponseData(msg, {}, action, M.service)

end

local ConfigurationStarted_maps =
{
    NewSessionID = {
                          data_type = "",
                          handler = function(NewSessionID, NewSessionID_value)
                                        if type(NewSessionID_value) == "string" and string.len(NewSessionID_value)  > 0 then
                                            return true
                                        else
                                            return false
                                        end

                                    end

                   }
}

function M.ConfigurationStarted(dataXml)
    local action = "ConfigurationStarted"
    local input = {NewSessionID=""}
    local output = {}
    local msg = "RESPONSE_NOERROR"

    --Matt workaround for SOAP spec:
    --input argument "NewSessionID" is dummy string, and kept for UP app's backward compatibility support for legacy old router models which use it. DUT simply ignore the input parameter and does nothing.
    removeReadyServices()
    uci_st:revert("soap","ConfigurationStarted")
    uci_st:section("soap","deviceConfig","ConfigurationStarted",{startSession="dummy"})
    uci_st:save("soap")
--[[
    input = getSettingParamByXML(dataXml, input, action, ConfigurationStarted_maps)
    if type(input) == "string" then
        msg = input
    else
        removeReadyServices()
        uci_st:revert("soap","ConfigurationStarted")
        uci_st:section("soap","deviceConfig","ConfigurationStarted",{startSession=input["NewSessionID"]})
        uci_st:save("soap")
    end
--]]
    return soapResponse.buildResponseData(msg,output,action,M.service)
end

local ConfigurationFinished_maps =
{
    NewStatus = {
                  data_type = "",
                  handler = function(NewStatus, NewStatus_value)
                                if NewStatus_value ~= "ChangesApplied" and NewStatus_value ~= "RebootRequired" then
                                    log.console("validator handler false")
                                    return false
                                else
                                    log.console("validator handler true")
                                    return true
                                end
                            end
                }
}

function M.ConfigurationFinished(dataXml)
    local action = "ConfigurationFinished"
    local input = {NewStatus=""}
    local output = {ResponseTime=""}
    local msg = "RESPONSE_NOERROR"

    input = getSettingParamByXML(dataXml, input, action, ConfigurationFinished_maps)

    if type(input) == "string" then
        msg = input
    else
        local configStartSession = uci_st:get("soap","ConfigurationStarted","startSession")

        if configStartSession then
            output["ResponseTime"] = 90 --Notify client to wait 90 seconds
            uci_st:revert("soap","ConfigurationFinished")
            uci_st:section("soap","deviceConfig","ConfigurationFinished",{status=input["NewStatus"]})
            uci_st:save("soap")

            commitReadyServices()
        else
            msg = "RESPONSE_ERROR"
            output["ResponseTime"] = 1
        end
    end

    return soapResponse.buildResponseData(msg, {},action,M.service) --SOAP Spec, only extender product needs to response with "ResponseTime".
end

--[[
local ResetToFactoryDefault_maps =
{
    RouterPassword = {
                        data_type = "",
                        handler = function(RouterPassword, RouterPassword_value)
                                      local soap = require"soap"
                                      local auth = require "commonFunc.auth"
                                      local name = auth.getUsername()
                                      local unescapePassword =  soap.unescape(RouterPassword_value)

                                      if string.len(unescapePassword) > 32 then
                                          return false
                                      elseif not auth.checkpasswd(name,unescapePassword) then
                                          return false
                                      else
                                          return true
                                      end
                                  end
                      },
   SerialNumber = {
                        data_type = "",
                        handler = function(SerialNumber, SerialNumber_value)
                                      local sn = uci_st:get("netgear","board","sn")
                                      log.console("SerialNumber_value:"..SerialNumber_value.." , sn:"..tostring(sn))
                                      if string.len(SerialNumber_value) > 16 then
                                          return false
                                      elseif SerialNumber_value ~= sn then
                                          return false
                                      else
                                          return true
                                      end
                                  end
                      },
}
]]

function M.ResetToFactoryDefault(dataXml)
    local action = "ResetToFactoryDefault"
    local input = {RouterPassword="", SerialNumber=""}
    local output = {}
    local msg = "RESPONSE_NOERROR"

    for k,v in pairs(input) do
        local tmpValue = soapParser.getActionParameter(dataXml, action, k)

        if tmpValue ~= nil then
            input[k] = soapParser.getActionParameter(dataXml, action, k)
        else
            log.console("Invalid parameter: "..k)
            input = "RESPONSE_ERROR"
        end
    end

    --input = getSettingParamByXML(dataXml, input, action, ResetToFactoryDefault_maps)

    if type(input) == "string" then
        msg = input
    else
        local soap = require"soap"
        local auth = require "commonFunc.auth"
        local name = auth.getUsername()
        local unescapePassword =  soap.unescape(input["RouterPassword"])
        local sn = uci_st:get("netgear","board","sn")

        if string.len(unescapePassword) > 32 or not auth.checkpasswd(name,unescapePassword) then
            msg="RESPONSE_FACTORY_RESET_PASSWOARD_ERROR"
        elseif string.len(input["SerialNumber"]) > 16 or input["SerialNumber"]~= sn then
            msg="RESPONSE_FACTORY_RESET_SN_ERROR"
        else
            uci_st:section("soap", "data", "reset", {flag="1"})
            uci_st:section("soap","deviceConfig","Reboot",{status="1"})
            uci_st:save("soap")
        end

    end
    return soapResponse.buildResponseData(msg,output,action,M.service)
end

local UpdateAdminPassword_maps =
{

}

function M.UpdateAdminPassword(dataXml)
    local action = "UpdateAdminPassword"
    local input = {OldPassword="", NewPassword="", NewEnableRecovery="", NewSecurityQuestion1="", NewAnswer1="", NewSecurityQuestion2="", NewAnswer2=""}
    local output = {}
    local msg = "RESPONSE_NOERROR"
    local soap = require"soap"
    local configStartSession = uci_st:get("soap","ConfigurationStarted","startSession")

    for k,v in pairs(input) do
        local tmpValue = soapParser.getActionParameter(dataXml, action, k)

        if tmpValue ~= nil then
            input[k] = soap.unescape(tmpValue)
        else
            log.console("Invalid parameter: "..k)
            input = "RESPONSE_ERROR"
        end
    end

    if type(input) == "string" then
        msg = input
    else
        local auth = require "commonFunc.auth"
        local name = auth.getUsername()
        local lenQ1 = string.len(input["NewSecurityQuestion1"])
        local lenQ2 = string.len(input["NewSecurityQuestion2"])
        local lenA1 = string.len(input["NewAnswer1"])
        local lenA2 = string.len(input["NewAnswer2"])

        if string.len(input["OldPassword"]) > 32 or not auth.checkpasswd(name,input["OldPassword"]) then
            msg="RESPONSE_OLD_PASSWOARD_ERROR"
        elseif string.len(input["NewPassword"]) > 32 then
            msg="RESPONSE_NEW_PASSWOARD_ERROR"
        elseif string.len(input["NewEnableRecovery"]) > 4 or (input["NewEnableRecovery"] ~= "1" and input["NewEnableRecovery"] ~= "0") then
            msg="RESPONSE_INVALID_ARGUMENTS"
        elseif input["NewEnableRecovery"] == "1" and ((lenQ1 < soapCommon.SECURITYQUESTION1_MIN) or (lenQ1 > soapCommon.SECURITYQUESTION1_MAX) or (lenQ2 < soapCommon.SECURITYQUESTION2_MIN) or (lenQ2 > soapCommon.SECURITYQUESTION2_MAX) or (lenA1 > soapCommon.SECURITYANSWER_MAX_SIZE) or (lenA2 > soapCommon.SECURITYANSWER_MAX_SIZE)) then
               msg="RESPONSE_INVALID_ARGUMENTS"
        else
            if configStartSession ~= nil then
                uci_st:section("soap","deviceConfig","isNeedUpdatePW",{status="1"})
                uci_st:section("soap","deviceConfig","updatePW",{password=input["NewPassword"]})
                uci_st:save("soap")
            else
                local soapAuth = require"soap.soapAuth"
                soapAuth.UpdateAdminPassword(input["NewPassword"])
            end
            --[[
            if not auth.checkpasswd(name,input["NewPassword"]) then
                local user = luci.sys.user
                local rs = user.setpasswd(name,input["NewPassword"])

                if rs == 0 then
                    passwd = auth.getpasswd(name)
                    local file = io.open("/var/user.htpasswd","w")
                    local setpasswd = name..":"..passwd
                    local newpasswd = input["NewPassword"]
                    local hash_pwd_bin = sha2.sha256(newpasswd)
                    local hash_pwd_hex = pwdCommon.bintohex(hash_pwd_bin)
                    file:write(setpasswd)
                    file:close()
                    uci:set("loginpwd","config","hash256password",hash_pwd_hex)
                end
            end
            --]]

            local enableReset = uci:get("loginpwd","config","enable_reset")
            local enableResetRevert = false
            if input["NewEnableRecovery"] ~= enableReset then
                uci_soap:revert("loginpwd","config","enable_reset")
                uci_soap:section("loginpwd","loginpwd","config",{enable_reset=input["NewEnableRecovery"]})
            else
                if enableReset == "1" then
                    uci_soap:revert("loginpwd","config","enable_reset")
                    uci_soap:section("loginpwd","loginpwd","config",{enable_reset=input["NewEnableRecovery"]})
                    enableResetRevert = true
                end
            end

            if uci_soap:get("loginpwd","config","enable_reset") == "1" then
                if input["NewSecurityQuestion1"] ~= uci_soap:get("loginpwd","config","question1") then
                    uci_soap:revert("loginpwd","config","question1")
                    uci_soap:section("loginpwd","loginpwd","config",{question1=input["NewSecurityQuestion1"]})
                end

                if input["NewSecurityQuestion2"] ~= uci_soap:get("loginpwd","config","question2") then
                    uci_soap:revert("loginpwd","config","question2")
                    uci_soap:section("loginpwd","loginpwd","config",{question2=input["NewSecurityQuestion2"]})
                end
                local answer = ""
                local hash_answer = ""

                if input["NewAnswer1"] ~= uci_soap:get("loginpwd","config","answer1") then
                    if (input["NewAnswer1"] ~= nil ) and (string.len(input["NewAnswer1"]) > 0)then
                        answer = input["NewAnswer1"] --nixio.bin.b64decode(input["NewAnswer1"])
                        local hash_ans1_bin = sha2.sha256(answer)
                        hash_answer = pwdCommon.bintohex(hash_ans1_bin)
                        uci_soap:revert("loginpwd","config","answer1")
                        uci_soap:section("loginpwd","loginpwd","config",{answer1=hash_answer})
                    end
                end

                if input["NewAnswer2"] ~= uci_soap:get("loginpwd","config","answer2") then
                    uci_soap:revert("loginpwd","config","answer2")
                    uci_soap:section("loginpwd","loginpwd","config",{answer2=input["NewAnswer2"]})
                    if (input["NewAnswer2"] ~= nil ) and (string.len(input["NewAnswer2"]) > 0)then
                      answer = input["NewAnswer2"] --nixio.bin.b64decode(input["NewAnswer2"])
                      local hash_ans2_bin = sha2.sha256(answer)
                      hash_answer = pwdCommon.bintohex(hash_ans2_bin)
                      uci_soap:revert("loginpwd","config","answer2")
                      uci_soap:section("loginpwd","loginpwd","config",{answer2=hash_answer})
                    end
                end
            end

            if enableResetRevert then
                uci_soap:revert("loginpwd","config","enable_reset")
            end

            if soapCommon.configToSaveOrCommit(uci_soap, "loginpwd") then
               log.console("Finish "..action)
            end
        end
    end
    return soapResponse.buildResponseData(msg,output,action,M.service)
end

function M.Reboot(dataXml)
    local action = "Reboot"
    local output = {RebootTime=""}
    local msg = "RESPONSE_NOERROR"
    local configStartSession = uci_st:get("soap","ConfigurationStarted","startSession")

    if configStartSession then
            output["RebootTime"] = 0
            uci_st:revert("soap","RebootRequest")
            uci_st:section("soap","deviceConfig","Reboot",{status="1"})
            uci_st:save("soap")
--    elseif type(configStartSession) == "string" and string.len(configStartSession) >0 then
--        output["RebootTime"] = 90
--
--        local fork = require"commonFunc.fork"
--        fork.fork_exec("sleep 3; reboot")
    else
        output["RebootTime"] = 180

        local fork = require "commonFunc.fork"
        fork.fork_exec("sleep 3; reboot")
    end
    os.execute("/usr/bin/ra_cli -r 8")

    return soapResponse.buildResponseData(msg,output,action,M.service)
end

local CheckAppNewFirmware_maps =
{
    CheckDurationSecond = {data_type = "soap_check_duration", handler = nil}
}

function M.CheckAppNewFirmware(dataXml)
    local action = "CheckAppNewFirmware"
    local input = {CheckDurationSecond=""}
    local output = {CurrentVersion="", NewVersion="", ReleaseNote=""}
    local msg = "RESPONSE_NOERROR"

    input = getSettingParamByXML(dataXml, input, action, CheckAppNewFirmware_maps)

    if type(input) == "string" then
        msg = input
    else
        local cur_ver = uci_st:get("netgear","fw","cur_ver")
        log.console("cur_ver:"..cur_ver)
        if type(cur_ver) == "string" then
            output["CurrentVersion"] = cur_ver
        end
        --do firmware check
        os.execute("/sbin/pufwUpgrade -u")

        --get check result
        local needUpgrade = uci_fw:get("puData","fwLastChecked","updateRequired")
        if type(needUpgrade) == "string" and needUpgrade == "1" then
            local new_ver = uci_fw:get("puData","fwLastChecked","newFWVersion")
            if type(new_ver) == "string" then
                output["NewVersion"] = new_ver
            else
                output["NewVersion"] = ""
            end
        else
            output["NewVersion"] = ""
        end

        -- Add for JIRA RAX5-137
        if uci:get("netgear","system","blank_state") == "1" then
            local exec  = require "luci.util".exec
            exec("puDataStr set installEvent installFwUpgrade "..(output["NewVersion"] == "" and "1" or "0"))
        end

        local note = uci_st:get("netgear","fw","release_note")
        if type(note) == "string" then
            output["ReleaseNote"] = note
        end
    end
    return soapResponse.buildResponseData(msg,output,action,M.service)
end

function M.CheckNewFirmware(dataXml)
    local action = "CheckNewFirmware"
    local output = {CurrentVersion="", NewVersion="", ReleaseNote=""}
    local msg = "RESPONSE_NOERROR"

    if type(input) == "string" then
        msg = input
    else
        local cur_ver = uci_st:get("netgear","fw","cur_ver")
        if type(cur_ver) == "string" then
            output["CurrentVersion"] = cur_ver
        end
        --do firmware check
        os.execute("/sbin/pufwUpgrade -u")

        --get check result
        local needUpgrade = uci_fw:get("puData","fwLastChecked","updateRequired")

        if type(needUpgrade) == "string" and needUpgrade == "1" then
            local new_ver = uci_fw:get("puData","fwLastChecked","newFWVersion")
            if type(new_ver) == "string" then
                output["NewVersion"] = new_ver
            else
                output["NewVersion"] = ""
            end
        else
            output["NewVersion"] = ""
        end

        local note = uci_st:get("netgear","fw","release_note")
        if type(note) == "string" then
            output["ReleaseNote"] = note
        end
    end
    return soapResponse.buildResponseData(msg,output,action,M.service)
end

local UpdateNewFirmware_maps =
{
    YesOrNo = {data_type = "soap_boolean_int", handler = nil}
}

function M.UpdateNewFirmware(dataXml)
    local action = "UpdateNewFirmware"
    local input = {YesOrNo=""}
    local output = {RebootTime=""}
    local msg = "RESPONSE_NOERROR"

    input = getSettingParamByXML(dataXml, input, action, UpdateNewFirmware_maps)

    if type(input) == "string" then
        msg = input
    else
        if input["YesOrNo"] == "1" then
            --do upgrade firmware
            os.execute("/sbin/pufwUpgrade -d")

            output["RebootTime"] = 90
        else
            output["RebootTime"] = 0
        end

        -- Add for JIRA RAX5-137
        if uci:get("netgear","system","blank_state") == "1" then
            local exec  = require "luci.util".exec
            exec("puDataStr set installEvent installFwUpgrade 1")
        end
    end
    return soapResponse.buildResponseData(msg,output,action,M.service)
end

local SetGUILanguage_maps =
{
    GUILanguage = {data_type = "soap_boolean_int", handler = nil}
}

function M.SetGUILanguage(dataXml)
    local action = "SetGUILanguage"
    local input = {GUILanguage=""}
    local output = {}
    local msg = "RESPONSE_NOERROR"

    --input = getSettingParamByXML(dataXml, input, action, SetGUILanguage_maps)
    for k,v in pairs(input) do
        local tmpValue = soapParser.getActionParameter(dataXml, action, k)

        if tmpValue ~= nil then
            input[k] = tmpValue
        else
            log.console("Invalid parameter: "..k)
            input = "RESPONSE_INVALID_ARGUMENTS"
        end
    end

    local languageTable = require"commonFunc.language".languageTable
    local setLanguage = languageTable[input["GUILanguage"]]
    if  setLanguage == nil then
        input = "RESPONSE_INVALID_ARGUMENTS"
    end

    if type(input) == "string" then
        msg = input
    else
        local cur_language = uci:get("netgear","system","gui_language")
        if type(cur_language) == "string" and type(input["GUILanguage"]) == "string" and cur_language ~= setLanguage then
            uci_soap:revert("netgear", "data", "system")
            uci_soap:section("netgear", "data", "system", {gui_language=setLanguage} )
            if soapCommon.configToSaveOrCommit(uci_soap, "netgear") then
               log.console("Finish "..action)
            end

            local do_lang_change = require "commonFunc.language".language_changed()
            if do_lang_change == false then
                msg = "RESPONSE_ERROR"
            end
        end
    end
    return soapResponse.buildResponseData(msg,output,action,M.service)
end

return M
