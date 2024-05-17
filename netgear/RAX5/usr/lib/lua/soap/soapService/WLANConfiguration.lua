--For LUA
function __FILE__() return debug.getinfo(2, 'S').short_src end -- or use .source
function __FUNCTION__() return debug.getinfo(2, 'n').name end
function __LINE__() return debug.getinfo(2, 'l').currentline end

local log = require "luci.log"
    log.debug(0)
local soapParser = require "soap.soapParser"
local soapResponse = require "soap.soapResponse"
local soapCommon = require "soap.soapCommon"
local validator = require "commonFunc.validator"
local uci    = require "luci.model.uci".cursor()
local uci_st = require "luci.model.uci".cursor(nil, "/var/state")
local uci_soap = require "luci.model.uci".cursor(nil, "/var/soapConfig")
local wireless = require "webGetFunc.wireless"
local fork = require "commonFunc.fork"
local sys  = require "luci.sys"
require "commonFunc.wifiUtils_commDefs"
require "commonFunc.wifiUtils_wifiCountryCodeMapping"
local installEvents = require "commonFunc.installEvents"

local M = {}
M.service = "WLANConfiguration"

--Synced the definition from wireless.js--
--/* 54 = g mode, 145 = n mode + 20MHz, 300 = n mode + 40MHz */
local wifi2G_g_n_speed = {"54", "145", "300"};
--/* 0 = hidden option,  286 = ax mode + 20MHz, 600 = ax mode + 40MHz */ --general for AX mode 1024QAM.
--/* 0 = hidden option,  230 = ax mode + 20MHz, 460 = ax mode + 40MHz *///RAX 2.4G only 256 QAM
local wifi2G_ax_speed = {"54", "230", "460"};
--/* 173 = ac mode + 20MHz, 400 = ac mode + 40MHz, 867 = ac mode + 80MHz */
local wifi5G_ac_speed_2x2 = {"173", "400", "866"}; --According to Home Router Sepc 16a, 5G without AX enable(ac mode), the 2x2 + 80MHz, max link rate should be 866Mbps.
--/* 286 = ax mode + 20MHz, 600 = ax mode + 40MHz, 1200 = ax mode + 80MHz */
local wifi5G_ax_speed_2x2 = {"286", "572", "1200"}; --According to Home Router Sepc 16a, 5G with AX enable, the 2x2 + 40MHz, max link rate should be 572Mbps.
--/* 288 = ac mode + 20MHz, 600 = ac mode + 40MHz, 1300 = ac mode + 80MHz */
local wifi5G_ac_speed_3x3 = {"288", "600", "1300"};
--/* 430 = ax mode + 20MHz, 860 = ax mode + 40MHz, 1800 = ax mode + 80MHz*/
local wifi5G_ax_speed_3x3 = {"430", "860", "1800"};

function NewBand_validator(parm, value, json)
    -- custom handler function only be called at default datatype validate fail.
    local ret = false

    --log.debug(1)
    --log.console(__FUNCTION__()..":"..__LINE__()..", parm="..parm..", value="..value)
    if parm == "NewBand" and (value == "2.4G" or value == "5G" or value == "60G" or value == "5G1" or value == "6G") then
        ret = true
    end
    --log.debug(1)
    --log.console(__FUNCTION__()..":"..__LINE__()..", ret="..tostring(ret))
    return ret
end

local valid_5G_Band1Channels = { "36", "40", "44", "48" }
function isIn5G_band1( channel_5g ) --No DFS.
    for key, value in pairs(valid_5G_Band1Channels) do
        log.console(__FUNCTION__()..":"..__LINE__()..", valid_5G_Band1Channels.value="..value..", channel_5g="..channel_5g);
        if channel_5g == value then
            return true
        end
    end
    return false
end

local GetSupportMode_maps =
{
    NewBand = {data_type = "radio_name", handler = NewBand_validator} --SOAP Spec, 2.4G, 5G, 60G, 5G1, 6G.
}
function M.GetSupportMode(dataXml)
    --[[initialize setting parameters]]
    local inputParameters = { NewBand = "" }

    --[[initialize output parameters]]
    local outputParameters = { SupportModes = "" }
    local errorCode = "RESPONSE_NOERROR"

    --[[get setting parameter from XML data]]
    for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXml, "GetSupportMode", k)

        if tmpValue ~= nil then
            inputParameters[k] = tmpValue
        else
            errorCode = "RESPONSE_ERROR"
            log.debug(1)
            log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", Invalid parameter key name: "..k)
            return soapResponse.buildResponseData(errorCode, outputParameters, "GetSupportMode", M.service)
        end
    end

    --[[do validator for setting parameters]]
    if (validator.soap_data_validate(inputParameters, GetSupportMode_maps) == false) then
        errorCode = "RESPONSE_ERROR"
        log.debug(1)
        log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", Validation of SOAP data paramter is failed")
        return soapResponse.buildResponseData(errorCode, outputParameters, "GetSupportMode", M.service)
    end

    local wifi = require "webGetFunc.wireless"
    local AXmode_status = wifi.getEnableAX()
    if inputParameters["NewBand"] == "2.4G" then
        if AXmode_status == "true" then
            outputParameters["SupportModes"] = (wifi2G_ax_speed[1].."Mbps,"..wifi2G_ax_speed[2].."Mbps,"..wifi2G_ax_speed[3].."Mbps")
        else
            outputParameters["SupportModes"] = (wifi2G_g_n_speed[1].."Mbps,"..wifi2G_g_n_speed[2].."Mbps,"..wifi2G_g_n_speed[3].."Mbps")
        end
    elseif inputParameters["NewBand"] == "5G" then
        if AXmode_status == "true" then
            outputParameters["SupportModes"] = (wifi5G_ax_speed_2x2[1].."Mbps,"..wifi5G_ax_speed_2x2[2].."Mbps,"..wifi5G_ax_speed_2x2[3].."Mbps")
        else
            outputParameters["SupportModes"] = (wifi5G_ac_speed_2x2[1].."Mbps,"..wifi5G_ac_speed_2x2[2].."Mbps,"..wifi5G_ac_speed_2x2[3].."Mbps")
        end
    end

    --SOAP Spec: String list of supported modes for this device and use delimited with ",".  For example: "54Mbps,130Mbps,270Mbps". The maximum string length is 64 chars.
    if outputParameters["SupportModes"] == nil or string.len(outputParameters["SupportModes"]) > 64 then
        errorCode = "RESPONSE_ERROR"
    end

    --log.debug(1)
    log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", SupportModes(output)="..outputParameters["SupportModes"])
    return soapResponse.buildResponseData(errorCode, outputParameters, "GetSupportMode", M.service)
end

function M.GetWirelessMode(dataXml)
    --[[initialize output parameters]]
    local outputParameters = { NewWirelessMode = "" }
    local errorCode = "RESPONSE_NOERROR"

    local wifi = require "webGetFunc.wireless"

    local AXmode_status = wifi.getEnableAX()
    local bwMode_index = wifi.getWiFiMode("2.4G")
    if AXmode_status == "true" then
        outputParameters["NewWirelessMode"] = (wifi2G_ax_speed[tonumber(bwMode_index)].."Mbps") --The output value must be one of the support modes for the device which returned from GetSupportMode() API.
    else
        outputParameters["NewWirelessMode"] = (wifi2G_g_n_speed[tonumber(bwMode_index)].."Mbps") --The output value must be one of the support modes for the device which returned from GetSupportMode() API.
    end

    if outputParameters["NewWirelessMode"] == nil then
        errorCode = "RESPONSE_ERROR"
    end

    --log.debug(1)
    log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", NewWirelessMode="..outputParameters["NewWirelessMode"])
    return soapResponse.buildResponseData(errorCode, outputParameters, "GetWirelessMode", M.service)
end

function M.Get5GWirelessMode(dataXml)
    --[[initialize output parameters]]
    local outputParameters = { NewWirelessMode = "" }
    local errorCode = "RESPONSE_NOERROR"

    local wifi = require "webGetFunc.wireless"

    local AXmode_status = wifi.getEnableAX()
    local bwMode_index = wifi.getWiFiMode("5G")
    if AXmode_status == "true" then
        outputParameters["NewWirelessMode"] = (wifi5G_ax_speed_2x2[tonumber(bwMode_index)].."Mbps") --The output value must be one of the support modes for the device which returned from GetSupportMode() API.
    else
        outputParameters["NewWirelessMode"] = (wifi5G_ac_speed_2x2[tonumber(bwMode_index)].."Mbps") --The output value must be one of the support modes for the device which returned from GetSupportMode() API.
    end

    if outputParameters["NewWirelessMode"] == nil then
        errorCode = "RESPONSE_ERROR"
    end

    --log.debug(1)
    log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", NewWirelessMode="..outputParameters["NewWirelessMode"])
    return soapResponse.buildResponseData(errorCode, outputParameters, "Get5GWirelessMode", M.service)
end

function getWifiRegion_from_autoDetect()
--{
    local ipLocation_region = uci_st:get("ipLocation", "info", "country")
    local autoWifiRegion = nil
    --If we can't find the country mapping for PAS, the default value is CA(Canada).
    --SKU_Consolidation_V0.8_5_2022050.pptx, page 8.
    if ipLocation_region ~= nil and type(ipLocation_region) == type("") then
        autoWifiRegion = getAutoWifiRegionMapping(ipLocation_region)
    end

    return autoWifiRegion
--}
end

function correct_inputChannel( whichBand, targetWifiRegion, inputChannel )
    if whichBand == nil or targetWifiRegion == nil or inputChannel == nil then
        return nil
    end

    if type(whichBand) ~= "string" or type(targetWifiRegion) ~= "string" or type(inputChannel) ~= "string" then
        return nil
    end

    local tmpChannel = "0" --Auto
    --input parameter correction.
    if whichBand == "2.4G" then
        tmpChannel = "0" --Auto for 2.4G
        if tonumber(inputChannel) == nil then
            return tmpChannel
        end
        --Here the targetWifiRegion is mixed from different Spec or driver's definition and the target is given SOAP API a reasonable value to match it's requirement.
        if (targetWifiRegion == "WW" or targetWifiRegion == "EU" or targetWifiRegion == "GE" or targetWifiRegion == "GB" or targetWifiRegion == "RU" or targetWifiRegion == "JP") and  (tonumber(inputChannel) < 0 or tonumber(inputChannel) > 13) then
            tmpChannel = "0" --Auto for 2.4G
        elseif (tonumber(inputChannel) < 0 or tonumber(inputChannel) > 11) then --For US region and other wifiRegion only support channel 1~11 in 2.4G.
            tmpChannel = "0" --Auto for 2.4G
        --elseif then --TODO: check and correct the 2.4G band channel for different wifiRegion/nmrp_sku/PE_requirement/HomeRouterSpec combination.
        else
            tmpChannel = inputChannel
        end
    elseif whichBand == "5G" then
        tmpChannel = "153" --Default for most cases and for 5G.
        --So far, only "0" or "Auto" or "auto" may represent Auto Channel. But RAX5 doesn't support Auto Channel in 5G band.
        if (targetWifiRegion == "US" or targetWifiRegion == "TW") and (tonumber(inputChannel) == nil or tonumber(inputChannel) == 0) then
            return tmpChannel
        elseif (targetWifiRegion == "WW" or targetWifiRegion == "EU") and tonumber(inputChannel) == nil then
           tmpChannel = "44" --Default for most cases and for 5G.
            return tmpChannel
        end
        if targetWifiRegion == "US" and (isIn5G_band1(inputChannel) == false and isIn5GBand4(inputChannel) == false and isInDSRC_band(inputChannel) == false) then
            tmpChannel = "153" --Default for most cases and for 5G.
        --elseif then --TODO: check and correct the 5G band channel for different wifiRegion/nmrp_sku/PE_requirement/HomeRouterSpec combination.
        else
            tmpChannel = inputChannel
        end
    --elseif --TODO: Other band's check.
    end

    return tmpChannel
end

local GetAvailableChannel_maps =
{
    NewBand = {data_type = "radio_name", handler = NewBand_validator} --SOAP Spec, 2.4G, 5G, 60G, 5G1, 6G.
}
function M.GetAvailableChannel(dataXml)
    --[[initialize setting parameters]]
    local inputParameters = { NewBand = "" }

    --[[initialize output parameters]]
    local outputParameters = { NewAvailableChannel = "" }
    local errorCode = "RESPONSE_NOERROR"

    --[[get setting parameter from XML data]]
    for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXml, "GetAvailableChannel", k)

        if tmpValue ~= nil then
            inputParameters[k] = tmpValue
        else
            errorCode = "RESPONSE_ERROR"
            log.debug(1)
            log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", Invalid parameter key name: "..k)
            return soapResponse.buildResponseData(errorCode, outputParameters, "GetAvailableChannel", M.service)
        end
    end

    --[[do validator for setting parameters]]
    if (validator.soap_data_validate(inputParameters, GetAvailableChannel_maps) == false) then
        errorCode = "RESPONSE_ERROR"
        log.debug(1)
        log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", Validation of SOAP data paramter is failed")
        return soapResponse.buildResponseData(errorCode, outputParameters, "GetAvailableChannel", M.service)
    end

    local wifi = require "webGetFunc.wireless"
    local tmpAvailChannel_str = ""
    local available_channelsTable = getAvailableChannels(inputParameters["NewBand"], wifi.getWifiRegion())
    if available_channelsTable ~= nil then
        if inputParameters["NewBand"] == "2.4G" then
            tmpAvailChannel_str = "Auto" --No support "Auto" channel for 5G band.
        end
        for i = 1, #available_channelsTable do
            if tmpAvailChannel_str ~= "" then
                tmpAvailChannel_str = (tmpAvailChannel_str..",")
            end
            tmpAvailChannel_str = (tmpAvailChannel_str..available_channelsTable[i])
        end
        outputParameters["NewAvailableChannel"] = tmpAvailChannel_str
    end

    --SOAP Spec: String list of available channels to use delimited with ",". Example: "Auto,36,40,44,48". The maximum string length is 128 chars,
    if outputParameters["NewAvailableChannel"] == nil or string.len(outputParameters["NewAvailableChannel"]) > 128 then
        log.debug(1)
        log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", NewAvailableChannel(output)="..outputParameters["NewAvailableChannel"])
        errorCode = "RESPONSE_ERROR"
    end

    --log.debug(1)
    log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", NewAvailableChannel(output)="..outputParameters["NewAvailableChannel"])
    return soapResponse.buildResponseData(errorCode, outputParameters, "GetAvailableChannel", M.service)
end

function M.GetChannelInfo(dataXml)
    --[[initialize output parameters]]
    local outputParameters = { NewChannel = nil }
    local errorCode = "RESPONSE_NOERROR"

    local wifi = require "webGetFunc.wireless"

    --local AXmode_status = wifi.getEnableAX()
    --local bwMode_index = wifi.getWiFiMode("2.4G")
    local wifi2G_channel = wifi.getWifiChannel("2.4G")

    if wifi2G_channel ~= nil and wifi2G_channel ~= "" then
        if wifi2G_channel == 0 then
            outputParameters["NewChannel"] = "Auto" --The output value must be one of the support channels which returned from GetAvailableChannel() API.
        else
            outputParameters["NewChannel"] = wifi2G_channel --The output value must be one of the support channels which returned from GetAvailableChannel() API.
        end
    end

    if outputParameters["NewChannel"] == nil then
        errorCode = "RESPONSE_ERROR"
    end

    --log.debug(1)
    log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", NewChannel="..outputParameters["NewChannel"])
    return soapResponse.buildResponseData(errorCode, outputParameters, "GetChannelInfo", M.service)
end

function M.Get5GChannelInfo(dataXml)
    --[[initialize output parameters]]
    local outputParameters = { New5GChannel = "" }
    local errorCode = "RESPONSE_NOERROR"

    local wifi = require "webGetFunc.wireless"

    --local AXmode_status = wifi.getEnableAX()
    --local bwMode_index = wifi.getWiFiMode("2.4G")
    local wifi5G_channel = wifi.getWifiChannel("5G")

    if wifi5G_channel ~= nil then
        outputParameters["New5GChannel"] = wifi5G_channel --The output value must be one of the support channels which returned from GetAvailableChannel() API.
    end

    if outputParameters["New5GChannel"] == nil then
        errorCode = "RESPONSE_ERROR"
    end

    --log.debug(1)
    log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", New5GChannel="..outputParameters["New5GChannel"])
    return soapResponse.buildResponseData(errorCode, outputParameters, "Get5GChannelInfo", M.service)
end

function M.Get5GBandChannelInfo(dataXml)
    --[[initialize setting parameters]]
    local inputParameters = { New5GBand = "" }

    --[[initialize output parameters]]
    local outputParameters = { New5GBandChannel = "" }
    local errorCode = "RESPONSE_NOERROR"

    --[[get setting parameter from XML data]]
    for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXml, "Get5GBandChannelInfo", k)

        if tmpValue ~= nil then
            inputParameters[k] = tmpValue
        else
            errorCode = "RESPONSE_INVALID_ARGUMENTS"
            log.debug(1)
            log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", Invalid parameter key name: "..k)
            return soapResponse.buildResponseData(errorCode, outputParameters, "Get5GBandChannelInfo", M.service)
        end
    end

    --SOAP Spec define is "5G-1" and "5G-2" but in SOAP autoTest tool V4.9 also uses "5G" as input parameter. It use 3 kind of input parameter, "5G", "5G-1" and "5G-2".
    if inputParameters["New5GBand"] ~= "5G" and inputParameters["New5GBand"] ~= "5G-1" and inputParameters["New5GBand"] ~= "5G-2" then
        errorCode = "RESPONSE_INVALID_ARGUMENTS"
        log.debug(1)
        log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", inputParameters\[\"New5GBand\"\] with Invalid parameter value: "..inputParameters["New5GBand"])
        return soapResponse.buildResponseData(errorCode, outputParameters, "Get5GBandChannelInfo", M.service)
    end

    local wifi = require "webGetFunc.wireless"

    --log.debug(1)
    --log.console(__FUNCTION__()..":"..__LINE__()..", New5GBand="..inputParameters["New5GBand"])
    --local wifi5G_channel = wifi.getWifiChannel("5G")
    local wifi5G_channel = wifi.getWifiChannel(inputParameters["New5GBand"])

    if wifi5G_channel ~= nil then
        outputParameters["New5GBandChannel"] = wifi5G_channel --The output value must be one of the support channels which returned from GetAvailableChannel() API.
    end

    if outputParameters["New5GBandChannel"] == nil then
        errorCode = "RESPONSE_ACTION_FAILED" --For now(2022.02.23), RAX5 does not support "5G-1", "5G-2".
    end

    --log.debug(1)
    log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", New5GBandChannel="..outputParameters["New5GBandChannel"])
    return soapResponse.buildResponseData(errorCode, outputParameters, "Get5GBandChannelInfo", M.service)
end

function M.SetChannel(dataXml)
    --[[initialize setting parameters]]
    local inputParameters = { NewChannel = "" }

    --local wifi = require "webGetFunc.wireless"
    local errorCode = "RESPONSE_NOERROR"

    --[[get setting parameter from XML data]]
    for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXml, "SetChannel", k)

        if tmpValue ~= nil then
            inputParameters[k] = tmpValue
        else
            errorCode = "RESPONSE_INVALID_ARGUMENTS"
            log.debug(1)
            log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", Invalid parameter key name: "..k)
            return soapResponse.buildResponseData(errorCode, {}, "SetChannel", M.service)
        end
    end

    --[[do validator for setting parameters]]  --SOAP Spec: The input value must be one of the support channels which returned from GetAvailableChannel() API. If the value input is invalid or not supported by this device, the device must set the channel to the factory default channel setting, without rejecting it.
    --if (validator.soap_data_validate(inputParameters, SetChannel_maps) == false) then
    --    errorCode = "RESPONSE_INVALID_ARGUMENTS"
    --    log.debug(1)
    --    log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", Validation of SOAP data paramter is failed")
    --    return soapResponse.buildResponseData(errorCode, {}, "SetChannel", M.service)
    --end

    local wifi = require "webGetFunc.wireless"
    local ntgr_wifiRegion = wifi.getWifiRegion()
    local nmrp_sku = wifi.getNmrp_sku()
    local tmpWifiRegion = "US" --default value.
    local tmpChannel = "0" --Auto
    --input parameter correction.
    if nmrp_sku ~= nil and (nmrp_sku == "WW" or nmrp_sku == "AU") then --Only WW sku and AU sku can change the wifi region by GUI or upper layer application.
        if inputParameters["NewRegion"] == "GE" then
            tmpWifiRegion = "EU"
        elseif tmpWifiRegion == nil then
            tmpWifiRegion = "US"
        end
    --2022.07.21, PegaBU6, YochengLian, Netgear PE urgent requirement to sync PA Sku behavior for US and CA sku and for beta user release.
    elseif nmrp_sku ~= nil and (nmrp_sku == "PA" or nmrp_sku == "US" or nmrp_sku == "CA") then
        local autoWifiRegion = getWifiRegion_from_autoDetect()
        tmpWifiRegion = (autoWifiRegion ~= nil and autoWifiRegion or "CA")
    else --US or other sku, --TODO: check other case.
        tmpWifiRegion = ntgr_wifiRegion --In most of other sku, it can't change wifi region. --Sync to GUI's behavior.
    end
    tmpChannel = correct_inputChannel("2.4G", tmpWifiRegion, inputParameters["NewChannel"]) or tmpChannel

    -- Convert to number to remove lead zero
    if tmpChannel ~= nil then
        tmpChannel = tonumber(tmpChannel)
    end

    --set 2.4G primary wifi channel.
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "channel", tmpChannel)

    uci_soap:save(NTGR_WIFI_UCI_CONFIG_NAME)

    --uci_soap:commit(NTGR_WIFI_UCI_CONFIG_NAME)
    --table.insert(changed_config, NTGR_WIFI_UCI_CONFIG_NAME) --"changed_config" is a global variable.
    soapCommon.configToSaveOrCommit(uci_soap, NTGR_WIFI_UCI_CONFIG_NAME)

    --log.debug(1)
    log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", tmpChannel="..tmpChannel)
    return soapResponse.buildResponseData(errorCode, {}, "SetChannel", M.service)
end

function M.Set5GChannel(dataXml)
    --[[initialize setting parameters]]
    local inputParameters = { New5GChannel = "" }

    --local wifi = require "webGetFunc.wireless"
    local errorCode = "RESPONSE_NOERROR"

    --[[get setting parameter from XML data]]
    for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXml, "Set5GChannel", k)

        if tmpValue ~= nil then
            inputParameters[k] = tmpValue
        else
            errorCode = "RESPONSE_INVALID_ARGUMENTS"
            log.debug(1)
            log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", Invalid parameter key name: "..k)
            return soapResponse.buildResponseData(errorCode, {}, "Set5GChannel", M.service)
        end
    end

    --[[do validator for setting parameters]] --SOAP Spec: The input value must be one of the support channels which returned from GetAvailableChannel() API. If the value input is invalid or not supported by this device, the device must set the channel to the factory default channel setting, without rejecting it.
    --if (validator.soap_data_validate(inputParameters, Set5GChannel_maps) == false) then
    --    errorCode = "RESPONSE_INVALID_ARGUMENTS"
    --    log.debug(1)
    --    log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", Validation of SOAP data paramter is failed")
    --    return soapResponse.buildResponseData(errorCode, {}, "Set5GChannel", M.service)
    --end

    local wifi = require "webGetFunc.wireless"
    local ntgr_wifiRegion = wifi.getWifiRegion()
    local nmrp_sku = wifi.getNmrp_sku()
    local tmpWifiRegion = "US" --default value.
    local tmpChannel = "153"
    --input parameter correction.
    if nmrp_sku ~= nil and (nmrp_sku == "WW" or nmrp_sku == "AU") then --Only WW sku and AU sku can change the wifi region by GUI or upper layer application.
        if inputParameters["NewRegion"] == "GE" then
            tmpWifiRegion = "EU"
        elseif tmpWifiRegion == nil then
            tmpWifiRegion = "US"
        end
    --2022.07.21, PegaBU6, YochengLian, Netgear PE urgent requirement to sync PA Sku behavior for US and CA sku and for beta user release.
    elseif nmrp_sku ~= nil and (nmrp_sku == "PA" or nmrp_sku == "US" or nmrp_sku == "CA") then
        local autoWifiRegion = getWifiRegion_from_autoDetect()
        tmpWifiRegion = (autoWifiRegion ~= nil and autoWifiRegion or "CA")
    else --US or other sku, --TODO: check other case.
        tmpWifiRegion = ntgr_wifiRegion --In most of other sku, it can't change wifi region. --Sync to GUI's behavior.
    end
    tmpChannel = correct_inputChannel("5G", tmpWifiRegion, inputParameters["New5GChannel"]) or tmpChannel

    --set 5G primary wifi channel.
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "channel", tmpChannel)

    uci_soap:save(NTGR_WIFI_UCI_CONFIG_NAME)

    --uci_soap:commit(NTGR_WIFI_UCI_CONFIG_NAME)
    --table.insert(changed_config, NTGR_WIFI_UCI_CONFIG_NAME) --"changed_config" is a global variable.
    soapCommon.configToSaveOrCommit(uci_soap, NTGR_WIFI_UCI_CONFIG_NAME)

    --log.debug(1)
    log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", tmpChannel="..tmpChannel)
    return soapResponse.buildResponseData(errorCode, {}, "Set5GChannel", M.service)
end

function M.GetRegion(dataXml)
    --[[initialize output parameters]]
    local outputParameters = { NewRegion = "" }
    local errorCode = "RESPONSE_NOERROR"

    local wifi = require "webGetFunc.wireless"

    local GUI_ntgr_wifiRegion = wifi.getWifiRegion()
    local iso3166_2letters_UnifiedWirelessRegion_for_ntgrSOAP = "US"
    if GUI_ntgr_wifiRegion ~= nil then
        iso3166_2letters_UnifiedWirelessRegion_for_ntgrSOAP = getISO3166byWifiGUI_Region(GUI_ntgr_wifiRegion) --NO support "ID", "MY", "PH", "SA", "TH", "AE" for Home Router Spec 16a, page 145.
    end

    if iso3166_2letters_UnifiedWirelessRegion_for_ntgrSOAP ~= nil and iso3166_2letters_UnifiedWirelessRegion_for_ntgrSOAP == "GB" then --Special convertion for "EU" wifi region. SOAP Spec defined it to "GE" but Netgear Home Router 16a, page 470 point the WW sku is using Greenwich time, that should be United Kindom ==> "GB" is its' ISO3166 country code. The definition and mapping is very confusion.
        iso3166_2letters_UnifiedWirelessRegion_for_ntgrSOAP = "GE"
    end

    if iso3166_2letters_UnifiedWirelessRegion_for_ntgrSOAP ~= nil then
        outputParameters["NewRegion"] = iso3166_2letters_UnifiedWirelessRegion_for_ntgrSOAP
    end

    if outputParameters["NewRegion"] == nil then
        errorCode = "RESPONSE_ERROR"
    end

    --log.debug(1)
    log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", NewRegion="..outputParameters["NewRegion"])
    return soapResponse.buildResponseData(errorCode, outputParameters, "GetRegion", M.service)
end

function M.GetSSID(dataXml)
    --[[initialize output parameters]]
    local outputParameters = { NewSSID = "" }
    local errorCode = "RESPONSE_NOERROR"

    local wifi = require "webGetFunc.wireless"

    outputParameters["NewSSID"] = wifi.getSsid("2.4G", "primary")

    if outputParameters["NewSSID"] == nil then
        errorCode = "RESPONSE_ERROR"
    end

    --log.debug(1)
    log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", NewSSID="..outputParameters["NewSSID"])
    return soapResponse.buildResponseData(errorCode, outputParameters, "GetSSID", M.service)
end

local SetSSID_maps =
{
    NewSSID = {data_type = "wlan_ssid", handler = nil}
}
function M.SetSSID(dataXml)
    --[[initialize setting parameters]]
    local inputParameters = { NewSSID = "" }
    local errorCode = "RESPONSE_NOERROR"

    local wifi = require "webGetFunc.wireless"

    --[[get setting parameter from XML data]]
    for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXml, "SetSSID", k)

        if tmpValue ~= nil then
            inputParameters[k] = tmpValue
        else
            errorCode = "RESPONSE_ERROR"
            log.debug(1)
            log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", Invalid parameter key name: "..k)
            return soapResponse.buildResponseData(errorCode, {}, "SetSSID", M.service)
        end
    end

    --[[do validator for setting parameters]]
    if (validator.soap_data_validate(inputParameters, SetSSID_maps) == false) then
        errorCode = "RESPONSE_ERROR"
        log.debug(1)
        log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", Validation of SOAP data paramter is failed")
        return soapResponse.buildResponseData(errorCode, {}, "SetSSID", M.service)
    end

    --set 2.4G primary wifi SSID.
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "SSID", inputParameters["NewSSID"]) --TODO: It may need decode from SOAP's "Set" data.

    uci_soap:save(NTGR_WIFI_UCI_CONFIG_NAME)

    --uci_soap:commit(NTGR_WIFI_UCI_CONFIG_NAME)
    --table.insert(changed_config, NTGR_WIFI_UCI_CONFIG_NAME) --"changed_config" is a global variable.
    soapCommon.configToSaveOrCommit(uci_soap, NTGR_WIFI_UCI_CONFIG_NAME)
    -- set flags for installEvents after wifi config changing
    installEvents.checkWifi(inputParameters["NewSSID"], nil)

    --log.debug(1)
    log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", NewSSID="..inputParameters["NewSSID"])
    return soapResponse.buildResponseData("RESPONSE_NOERROR", {}, "SetSSID", M.service)
end

function M.Get5GSSID(dataXml)
    --[[initialize output parameters]]
    local outputParameters = { New5GSSID = "" }
    local errorCode = "RESPONSE_NOERROR"

    local wifi = require "webGetFunc.wireless"

    outputParameters["New5GSSID"] = wifi.getSsid("5G", "primary")

    if outputParameters["New5GSSID"] == nil then
        errorCode = "RESPONSE_ERROR"
    end

    --log.debug(1)
    log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", New5GSSID="..outputParameters["New5GSSID"])
    return soapResponse.buildResponseData(errorCode, outputParameters, "Get5GSSID", M.service)
end

local Set5GSSID_maps =
{
    New5GSSID = {data_type = "wlan_ssid", handler = nil}
}
function M.Set5GSSID(dataXml)
    --[[initialize setting parameters]]
    local inputParameters = { New5GSSID = "" }
    local errorCode = "RESPONSE_NOERROR"

    local wifi = require "webGetFunc.wireless"

    --[[get setting parameter from XML data]]
    for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXml, "Set5GSSID", k)

        if tmpValue ~= nil then
            inputParameters[k] = tmpValue
        else
            errorCode = "RESPONSE_ERROR"
            log.debug(1)
            log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", Invalid parameter key name: "..k)
            return soapResponse.buildResponseData(errorCode, {}, "Set5GSSID", M.service)
        end
    end

    --[[do validator for setting parameters]]
    if (validator.soap_data_validate(inputParameters, Set5GSSID_maps) == false) then
        errorCode = "RESPONSE_ERROR"
        log.debug(1)
        log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", Validation of SOAP data paramter is failed")
        return soapResponse.buildResponseData(errorCode, {}, "Set5GSSID", M.service)
    end

    --set 5G primary wifi SSID.
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "SSID", inputParameters["New5GSSID"]) --TODO: It may need decode from SOAP's "Set" data.

    uci_soap:save(NTGR_WIFI_UCI_CONFIG_NAME)

    --uci_soap:commit(NTGR_WIFI_UCI_CONFIG_NAME)
    --table.insert(changed_config, NTGR_WIFI_UCI_CONFIG_NAME) --"changed_config" is a global variable.
    soapCommon.configToSaveOrCommit(uci_soap, NTGR_WIFI_UCI_CONFIG_NAME)

    --log.debug(1)
    log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", New5GSSID="..inputParameters["New5GSSID"])
    return soapResponse.buildResponseData("RESPONSE_NOERROR", {}, "Set5GSSID", M.service)
end

function M.GetSSIDBroadcast(dataXml)
    --[[initialize output parameters]]
    local outputParameters = { NewSSIDBroadcast = "" }
    local errorCode = "RESPONSE_NOERROR"

    local wifi = require "webGetFunc.wireless"

    outputParameters["NewSSIDBroadcast"] = (wifi.getSSIDBroadcast("2.4G", "primary") == "true" and "1" or "0") --1 (on), 0 (off)

    if outputParameters["NewSSIDBroadcast"] == nil then
        errorCode = "RESPONSE_ERROR"
    end

    --log.debug(1)
    log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", NewSSIDBroadcast="..outputParameters["NewSSIDBroadcast"])
    return soapResponse.buildResponseData(errorCode, outputParameters, "GetSSIDBroadcast", M.service)
end
--NO define Get5GSSIDBroadcast ??????
--function M.Get5GSSIDBroadcast(dataXml)
--    --[[initialize output parameters]]
--    local outputParameters = { New5GSSID = "" }
--    local errorCode = "RESPONSE_NOERROR"
--
--    local wifi = require "webGetFunc.wireless"
--
--    outputParameters["New5GSSIDBroadcast"] = wifi.getSSIDBroadcast("5G", "primary")
--
--    if outputParameters["New5GSSIDBroadcast"] == nil then
--        errorCode = "RESPONSE_ERROR"
--    end
--
--    return soapResponse.buildResponseData(errorCode, outputParameters, "Get5GSSIDBroadcast", M.service)
--end

local SetSSIDBroadcast_maps =
{
    NewSSIDBroadcast = {data_type = "number", handler = nil} --SOAP Spec, 0(disable), 1(enable)
}
function M.SetSSIDBroadcast(dataXml)
    --[[initialize setting parameters]]
    local inputParameters = { NewSSIDBroadcast = "" }
    local errorCode = "RESPONSE_NOERROR"

    local wifi = require "webGetFunc.wireless"

    --[[get setting parameter from XML data]]
    for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXml, "SetSSIDBroadcast", k)

        if tmpValue ~= nil then
            inputParameters[k] = tmpValue
        else
            errorCode = "RESPONSE_ERROR"
            log.debug(1)
            log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", Invalid parameter key name: "..k)
            return soapResponse.buildResponseData(errorCode, {}, "SetSSIDBroadcast", M.service)
        end
    end

    --[[do validator for setting parameters]]
    if (validator.soap_data_validate(inputParameters, SetSSIDBroadcast_maps) == false) then
        errorCode = "RESPONSE_ERROR"
        log.debug(1)
        log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", Validation of SOAP data paramter is failed")
        return soapResponse.buildResponseData(errorCode, {}, "SetSSIDBroadcast", M.service)
    end

    --set 2.4G primary wifi enable/disable Broadcast SSID.
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "SSIDBroadcast", (inputParameters["NewSSIDBroadcast"] == "1" and "true" or "false"))

    uci_soap:save(NTGR_WIFI_UCI_CONFIG_NAME)

    --uci_soap:commit(NTGR_WIFI_UCI_CONFIG_NAME)
    --table.insert(changed_config, NTGR_WIFI_UCI_CONFIG_NAME) --"changed_config" is a global variable.
    soapCommon.configToSaveOrCommit(uci_soap, NTGR_WIFI_UCI_CONFIG_NAME)

    --log.debug(1)
    log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", NewSSIDBroadcast="..inputParameters["NewSSIDBroadcast"])
    return soapResponse.buildResponseData("RESPONSE_NOERROR", {}, "SetSSIDBroadcast", M.service)
end

local Set5GSSIDBroadcast_maps =
{
    New5GSSIDBroadcast = {data_type = "number", handler = nil} --SOAP Spec, 0(disable), 1(enable)
}
function M.Set5GSSIDBroadcast(dataXml)
    --[[initialize setting parameters]]
    local inputParameters = { New5GSSIDBroadcast = "" }
    local errorCode = "RESPONSE_NOERROR"

    local wifi = require "webGetFunc.wireless"

    --[[get setting parameter from XML data]]
    for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXml, "Set5GSSIDBroadcast", k)

        if tmpValue ~= nil then
            inputParameters[k] = tmpValue
        else
            errorCode = "RESPONSE_ERROR"
            log.debug(1)
            log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", Invalid parameter key name: "..k)
            return soapResponse.buildResponseData(errorCode, {}, "Set5GSSIDBroadcast", M.service)
        end
    end

    --[[do validator for setting parameters]]
    if (validator.soap_data_validate(inputParameters, Set5GSSIDBroadcast_maps) == false) then
        errorCode = "RESPONSE_ERROR"
        log.debug(1)
        log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", Validation of SOAP data paramter is failed")
        return soapResponse.buildResponseData(errorCode, {}, "Set5GSSIDBroadcast", M.service)
    end

    --set 5G primary wifi enable/disable Broadcast SSID.
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "SSIDBroadcast", (inputParameters["New5GSSIDBroadcast"]  == "1" and "true" or "false"))

    uci_soap:save(NTGR_WIFI_UCI_CONFIG_NAME)

    --uci_soap:commit(NTGR_WIFI_UCI_CONFIG_NAME)
    --table.insert(changed_config, NTGR_WIFI_UCI_CONFIG_NAME) --"changed_config" is a global variable.
    soapCommon.configToSaveOrCommit(uci_soap, NTGR_WIFI_UCI_CONFIG_NAME)

    --log.debug(1)
    log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", New5GSSIDBroadcast="..inputParameters["New5GSSIDBroadcast"])
    return soapResponse.buildResponseData("RESPONSE_NOERROR", {}, "Set5GSSIDBroadcast", M.service)
end

local SetEnable_maps =
{
    NewEnable = {data_type = "number", handler = nil} --SOAP Spec, 0(disable), 1(enable)
}
function M.SetEnable(dataXml) --SOAP spec defined but in SOAP autoTest tool V4.9 it's only for extender product.
    --[[initialize setting parameters]]
    local inputParameters = { NewEnable = "" }
    local errorCode = "RESPONSE_NOERROR"

    local wifi = require "webGetFunc.wireless"

    --[[get setting parameter from XML data]]
    for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXml, "SetEnable", k)

        if tmpValue ~= nil then
            inputParameters[k] = tmpValue
        else
            errorCode = "RESPONSE_ERROR"
            log.debug(1)
            log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", Invalid parameter key name: "..k)
            return soapResponse.buildResponseData(errorCode, {}, "SetEnable", M.service)
        end
    end

    --[[do validator for setting parameters]]
    if (validator.soap_data_validate(inputParameters, SetEnable_maps) == false) then
        errorCode = "RESPONSE_ERROR"
        log.debug(1)
        log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", Validation of SOAP data paramter is failed")
        return soapResponse.buildResponseData(errorCode, {}, "SetEnable", M.service)
    end

    --set 2.4G wifi radio on/off.
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "radioOn", (inputParameters["NewEnable"] == "1" and "true" or "false"))

    uci_soap:save(NTGR_WIFI_UCI_CONFIG_NAME)

    --uci_soap:commit(NTGR_WIFI_UCI_CONFIG_NAME)
    --table.insert(changed_config, NTGR_WIFI_UCI_CONFIG_NAME) --"changed_config" is a global variable.
    soapCommon.configToSaveOrCommit(uci_soap, NTGR_WIFI_UCI_CONFIG_NAME)

    --log.debug(1)
    log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", NewEnable="..inputParameters["NewEnable"])
    return soapResponse.buildResponseData("RESPONSE_NOERROR", {}, "SetEnable", M.service)
end

--local Setenable_2.4G_maps =
--{
--    NewEnable = {data_type = "number", handler = nil} --SOAP Spec, 0(disable), 1(enable)
--}
--function M.Setenable_2.4G(dataXml) --SOAP spec not defined but in SOAP autoTest tool V4.9 use this API name to test router product.
--    --[[initialize setting parameters]]
--    local inputParameters = { NewEnable = "" }
--
--    local wifi = require "webGetFunc.wireless"
--
--    --[[get setting parameter from XML data]]
--    for k,v in pairs(inputParameters) do
--        local tmpValue = soapParser.getActionParameter(dataXml, "Setenable_2.4G", k)
--
--        if tmpValue ~= nil then
--            inputParameters[k] = tmpValue
--        else
--            log.console("Invalid parameter: "..k)
--            return soapResponse.buildResponseData("RESPONSE_ERROR", {}, "Setenable_2.4G", M.service)
--        end
--    end
--
--    --[[do validator for setting parameters]]
--    if (validator.soap_data_validate(inputParameters, Setenable_2.4G_maps) == false) then
--        log.console("Validation of SOAP data paramter is failed")
--        return soapResponse.buildResponseData("RESPONSE_ERROR", {}, "Setenable_2.4G", M.service)
--    end
--
--    --set 2.4G wifi radio on/off.
--    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "radioOn", (inputParameters["NewEnable"]  == "1" and "true" or "false"))
--
--    uci_soap:save(NTGR_WIFI_UCI_CONFIG_NAME)
--
--    --uci_soap:commit(NTGR_WIFI_UCI_CONFIG_NAME)
--    --table.insert(changed_config, NTGR_WIFI_UCI_CONFIG_NAME) --"changed_config" is a global variable.
--    soapCommon.configToSaveOrCommit(uci_soap, NTGR_WIFI_UCI_CONFIG_NAME)
--
--    return soapResponse.buildResponseData("RESPONSE_NOERROR", {}, "Setenable_2.4G", M.service)
--end

local Set5GEnable_maps =
{
    NewEnable = {data_type = "number", handler = nil} --SOAP Spec, 0(disable), 1(enable)
}
function M.Set5GEnable(dataXml)
    --[[initialize setting parameters]]
    local inputParameters = { NewEnable = "" }
    local errorCode = "RESPONSE_NOERROR"

    local wifi = require "webGetFunc.wireless"

    --[[get setting parameter from XML data]]
    for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXml, "Set5GEnable", k)

        if tmpValue ~= nil then
            inputParameters[k] = tmpValue
        else
            errorCode = "RESPONSE_ERROR"
            log.debug(1)
            log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", Invalid parameter key name: "..k)
            return soapResponse.buildResponseData(errorCode, {}, "Set5GEnable", M.service)
        end
    end

    --[[do validator for setting parameters]]
    if (validator.soap_data_validate(inputParameters, Set5GEnable_maps) == false) then
        errorCode = "RESPONSE_ERROR"
        log.debug(1)
        log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", Validation of SOAP data paramter is failed")
        return soapResponse.buildResponseData(errorCode, {}, "Set5GEnable", M.service)
    end

    --set 5G wifi radio on/off.
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "radioOn", (inputParameters["NewEnable"]  == "1" and "true" or "false"))

    uci_soap:save(NTGR_WIFI_UCI_CONFIG_NAME)

    --uci_soap:commit(NTGR_WIFI_UCI_CONFIG_NAME)
    --table.insert(changed_config, NTGR_WIFI_UCI_CONFIG_NAME) --"changed_config" is a global variable.
    soapCommon.configToSaveOrCommit(uci_soap, NTGR_WIFI_UCI_CONFIG_NAME)

    --log.debug(1)
    log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", NewEnable="..inputParameters["NewEnable"])
    return soapResponse.buildResponseData("RESPONSE_NOERROR", {}, "Set5GEnable", M.service)
end

function M.GetAXModeEnabledStatus(dataXml)
    --[[initialize output parameters]]
    local outputParameters = { Enable = "", EnableOFDMA = "", Enable5GOFDMA = "" }
    local errorCode = "RESPONSE_NOERROR"

    local wifi = require "webGetFunc.wireless"

    outputParameters["Enable"] = (wifi.getEnableAX() == "true" and "1" or "0") --0(disable), 1(enable).
    outputParameters["EnableOFDMA"] = (wifi.getEnableOFDMA("2.4G") == "true" and "1" or "0") --0(disable), 1(enable).
    outputParameters["Enable5GOFDMA"] = (wifi.getEnableOFDMA("5G") == "true" and "1" or "0") --0(disable), 1(enable).

    if outputParameters["Enable"] == nil then
        errorCode = "RESPONSE_ERROR"
    elseif outputParameters["EnableOFDMA"] == nil then
        errorCode = "RESPONSE_ERROR"
    elseif outputParameters["Enable5GOFDMA"] == nil then
        errorCode = "RESPONSE_ERROR"
    end

    --log.debug(1)
    log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", Enable="..outputParameters["Enable"]..", EnableOFDMA="..outputParameters["EnableOFDMA"]..", Enable5GOFDMA="..outputParameters["Enable5GOFDMA"])
    return soapResponse.buildResponseData(errorCode, outputParameters, "GetAXModeEnabledStatus", M.service)
end

local SetAXModeEnabled_maps =
{
    Enable = {data_type = "number", handler = nil}, --SOAP Spec, 0(disable), 1(enable)
    EnableOFDMA = {data_type = "number", handler = nil}, --SOAP Spec, 0(disable), 1(enable)
    Enable5GOFDMA = {data_type = "number", handler = nil} --SOAP Spec, 0(disable), 1(enable)
}
function M.SetAXModeEnabled(dataXml)
    --[[initialize setting parameters]]
    local inputParameters = { Enable = "", EnableOFDMA = "", Enable5GOFDMA = "" }

    --local wifi = require "webGetFunc.wireless"
    local errorCode = "RESPONSE_NOERROR"

    --[[get setting parameter from XML data]]
    for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXml, "SetAXModeEnabled", k)

        if tmpValue ~= nil then
            inputParameters[k] = tmpValue
        else
            errorCode = "RESPONSE_INVALID_ARGUMENTS"
            log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", Invalid parameter key name: "..k)
            return soapResponse.buildResponseData(errorCode, {}, "SetAXModeEnabled", M.service)
        end
    end

    --[[do validator for setting parameters]]
    if (validator.soap_data_validate(inputParameters, SetAXModeEnabled_maps) == false) then
        errorCode = "RESPONSE_INVALID_ARGUMENTS"
        log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", Validation of SOAP data paramter is failed")
        return soapResponse.buildResponseData(errorCode, {}, "SetAXModeEnabled", M.service)
    end

    --set wifi AX mode enable/disable, 2.4G/5G OFDMA enable/disable.
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "enableAX", (inputParameters["Enable"]  == "1" and "true" or "false"))
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "enableAX", (inputParameters["Enable"]  == "1" and "true" or "false"))
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "enableOFDMA", (inputParameters["EnableOFDMA"]  == "1" and "true" or "false"))
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "enableOFDMA", (inputParameters["Enable5GOFDMA"]  == "1" and "true" or "false"))

    uci_soap:save(NTGR_WIFI_UCI_CONFIG_NAME)

    --uci_soap:commit(NTGR_WIFI_UCI_CONFIG_NAME)
    --table.insert(changed_config, NTGR_WIFI_UCI_CONFIG_NAME) --"changed_config" is a global variable.
    soapCommon.configToSaveOrCommit(uci_soap, NTGR_WIFI_UCI_CONFIG_NAME)

    --log.debug(1)
    log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", Enable="..inputParameters["Enable"]..", EnableOFDMA="..inputParameters["EnableOFDMA"]..", Enable5GOFDMA="..inputParameters["Enable5GOFDMA"])
    return soapResponse.buildResponseData(errorCode, {}, "SetAXModeEnabled", M.service)
end

function M.Is5GSupported(dataXml)
    --[[initialize output parameters]]
    local outputParameters = { New5GSupported = "" }
    local errorCode = "RESPONSE_NOERROR"

    --local wifi = require "webGetFunc.wireless"

    outputParameters["New5GSupported"] = "1" --0 – Not supported, 1 – Supported (one band), 2 – Supported (two bands).

    if outputParameters["New5GSupported"] == nil then
        errorCode = "RESPONSE_ERROR"
    end

    --log.debug(1)
    log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", New5GSupported="..outputParameters["New5GSupported"])
    return soapResponse.buildResponseData(errorCode, outputParameters, "Is5GSupported", M.service)
end

function M.Is6GSupported(dataXml)
    --[[initialize output parameters]]
    local outputParameters = { New6GSupported = "" }
    local errorCode = "RESPONSE_NOERROR"

    --local wifi = require "webGetFunc.wireless"

    outputParameters["New6GSupported"] = "0" --0 – Not supported, 1 – Supported (one band), 2 – Supported (two bands).

    if outputParameters["New6GSupported"] == nil then
        errorCode = "RESPONSE_ERROR"
    end

    log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", New6GSupported="..outputParameters["New6GSupported"])
    return soapResponse.buildResponseData(errorCode, outputParameters, "Is6GSupported", M.service)
end

function M.IsSmartConnectSupported(dataXml)
    --[[initialize output parameters]]
    local outputParameters = { NewSmartConnectSupported = "" }
    local errorCode = "RESPONSE_NOERROR"

    --local wifi = require "webGetFunc.wireless"

    outputParameters["NewSmartConnectSupported"] = "1" --0 – Not Supported, 1 – Supported. Should be same as feature list or current setting, but we set it to 1 for now(2022.02.21).

    if outputParameters["NewSmartConnectSupported"] == nil then
        errorCode = "RESPONSE_ERROR"
    end

    --log.debug(1)
    log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", NewSmartConnectSupported="..outputParameters["NewSmartConnectSupported"])
    return soapResponse.buildResponseData(errorCode, outputParameters, "IsSmartConnectSupported", M.service)
end

function M.IsSmartConnectEnabled(dataXml)
    --[[initialize output parameters]]
    local outputParameters = { NewSmartConnectEnable = "" }
    local errorCode = "RESPONSE_NOERROR"

    local wifi = require "webGetFunc.wireless"

    outputParameters["NewSmartConnectEnable"] = (wifi.getSmartConnect() == "true" and "1" or "0") --0 – Disabled, 1 – Enabled.

    if outputParameters["NewSmartConnectEnable"] == nil then
        errorCode = "RESPONSE_ERROR"
    end

    --log.debug(1)
    log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", NewSmartConnectEnable="..outputParameters["NewSmartConnectEnable"])
    return soapResponse.buildResponseData(errorCode, outputParameters, "IsSmartConnectEnabled", M.service)
end

local SetSmartConnectEnable_maps =
{
    NewSmartConnectEnable = {data_type = "number", handler = nil} --SOAP Spec, 0 (disabled), 1 (enabled).
}
function M.SetSmartConnectEnable(dataXml)
    --[[initialize setting parameters]]
    local inputParameters = { NewSmartConnectEnable = "" }
    --[[initialize output parameters]]
    local outputParameters = { NewSmartConnectEnable = "" } --The parameter is used to return previously configuration value before this API being called.

    local errorCode = "RESPONSE_NOERROR"
    local wifi = require "webGetFunc.wireless"

    outputParameters["NewSmartConnectEnable"] = (wifi.getSmartConnect() == "true" and "1" or "0") --0 (was disabled originally), 1 (was enabled originally).

    --[[get setting parameter from XML data]]
    for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXml, "SetSmartConnectEnable", k)

        if tmpValue ~= nil then
            inputParameters[k] = tmpValue
        else
            errorCode = "RESPONSE_ERROR"
            log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", Invalid parameter key name: "..k)
            return soapResponse.buildResponseData(errorCode, outputParameters, "SetSmartConnectEnable", M.service)
        end
    end

    --[[do validator for setting parameters]]
    if (validator.soap_data_validate(inputParameters, SetSmartConnectEnable_maps) == false) then
        errorCode = "RESPONSE_ERROR"
        log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", Validation of SOAP data paramter is failed")
        return soapResponse.buildResponseData(errorCode, outputParameters, "SetSmartConnectEnable", M.service)
    end

    --set 5G wifi radio on/off.
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "smartConnect", (inputParameters["NewSmartConnectEnable"]  == "1" and "true" or "false"))
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "smartConnect", (inputParameters["NewSmartConnectEnable"]  == "1" and "true" or "false"))

    --Sync SSID and security options for smart connect enable case. --TODO: sync these settings in "ConfigurationFinished" API, if some 2G wifi setting in the API list, we should sync setting from it.
    local wifi2G_SSID = wifi.getSsid("2.4G", "primary")
    local wifi5G_SSID = wifi.getSsid("5G", "primary")
    local wifi2G_securityType = wifi.getSecurityType("2.4G", "primary")
    local wifi2G_wpaPassphrase = wifi.getWPAPassphrase("2.4G", "primary")
    local wifi2G_encryptMode = wifi.getEncryptType("2.4G", "primary")
    local wifi2G_radiusIP = wifi.getRadiusIP("2.4G")
    local wifi2G_radiusPort = wifi.getRadiusPort("2.4G")
    local wifi2G_radiusSecret = wifi.getRadiusSecret("2.4G")
    local wifi2G_groupRekeyInterval = wifi.getRadiusGroupRekeyInterval("2.4G")
    if inputParameters["NewSmartConnectEnable"] == "0" and (wifi2G_SSID == wifi5G_SSID) then
        wifi5G_SSID = (wifi2G_SSID.."-5G")
    elseif inputParameters["NewSmartConnectEnable"] == "1" then
        wifi5G_SSID = wifi2G_SSID
        uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "securityType", wifi2G_securityType)
        uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "encryptMode", wifi2G_encryptMode)
        if wifi2G_securityType == "4" then
            uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "radiusIP", wifi2G_radiusIP)
            uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "radiusPort", wifi2G_radiusPort)
            uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "radiusSecret", wifi2G_radiusSecret)
            uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "reKeyInterval", wifi2G_groupRekeyInterval)
        elseif wifi2G_securityType == "2" or wifi2G_securityType == "3" or wifi2G_securityType == "5" or wifi2G_securityType == "6" then
            uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "wpaPassphrase", wifi2G_wpaPassphrase)
        end
    end
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "SSID", wifi5G_SSID)

    uci_soap:save(NTGR_WIFI_UCI_CONFIG_NAME)

    --uci_soap:commit(NTGR_WIFI_UCI_CONFIG_NAME)
    --table.insert(changed_config, NTGR_WIFI_UCI_CONFIG_NAME) --"changed_config" is a global variable.
    soapCommon.configToSaveOrCommit(uci_soap, NTGR_WIFI_UCI_CONFIG_NAME)

    --log.debug(1)
    log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", NewSmartConnectSupported(input)="..inputParameters["NewSmartConnectEnable"])
    return soapResponse.buildResponseData(errorCode, outputParameters, "SetSmartConnectEnable", M.service)
end

function M.GetWPASecurityKeys(dataXml)
    --[[initialize output parameters]]
    local outputParameters = { NewWPAPassphrase = "" }
    local errorCode = "RESPONSE_NOERROR"

    local wifi = require "webGetFunc.wireless"

    outputParameters["NewWPAPassphrase"] = wifi.getWPAPassphrase("2.4G", "primary")

    if outputParameters["NewWPAPassphrase"] == nil then
        errorCode = "RESPONSE_INVALID_ARGUMENTS"
    end

    --log.debug(1)
    log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", NewWPAPassphrase="..outputParameters["NewWPAPassphrase"])
    return soapResponse.buildResponseData(errorCode, outputParameters, "GetWPASecurityKeys", M.service)
end

function M.Get5GWPASecurityKeys(dataXml)
    --[[initialize output parameters]]
    local outputParameters = { NewWPAPassphrase = "" }
    local errorCode = "RESPONSE_NOERROR"

    local wifi = require "webGetFunc.wireless"

    outputParameters["NewWPAPassphrase"] = wifi.getWPAPassphrase("5G", "primary")

    if outputParameters["NewWPAPassphrase"] == nil then
        errorCode = "RESPONSE_INVALID_ARGUMENTS"
    end

    --log.debug(1)
    log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", NewWPAPassphrase="..outputParameters["NewWPAPassphrase"])
    return soapResponse.buildResponseData(errorCode, outputParameters, "Get5GWPASecurityKeys", M.service)
end

local valid_WPA_desc_for_SOAP_WPA3Supported =
{
    ["None"]                = "1",
    ["WPA2-Personal"]       = "2",
    ["WPA/WPA2-Personal"]   = "3",
    ["WPA/WPA2-Enterprise"] = "4",
    ["WPA3-Personal"]       = "5",
    ["WPA2/WPA3-Personal"]  = "6"
}
function check_WPA_encryptMode_for_SOAP_WPA3Supported( input_WPA_desc )
    ret = false
    for k, v in pairs(valid_WPA_desc_for_SOAP_WPA3Supported) do
        if input_WPA_desc == k then
            ret = true
            return ret
        end
    end
    return ret
end

function conv_security_type_to_soapstr(type)
    for k, v in pairs(valid_WPA_desc_for_SOAP_WPA3Supported) do
        if type == v then
            return k
        end
    end
end

function getWPADesc_by_ntgrSecurityType( ntgr_SecurityType ) --The SecurityType for Netgear wifi is a number, range in 1~6.
    for k, v in pairs(valid_WPA_desc_for_SOAP_WPA3Supported) do
        if ntgr_SecurityType == v then
            return k
        end
    end
    return "None"
end

local SetWLANWPAPSKByPassphrase_maps =
{
    NewSSID = {data_type = "wlan_ssid", handler = nil},
    --No suitable validator. NewRegion = {data_type = "", handler = nil}, --SOAP Spec: Please reference "Definition" sheet for supported region. If "UnifiedWirelessRegion" tag with value 1.0 and indicated in GetSupportFeatureLstXML API, this value needs to use unified 2-letter region code.
    --Can't reject it by SOAP Spec definition. NewChannel = {data_type = "wlan_2g_ch", handler = nil}, --SOAP Spec: The input value must be one of the support channels which returned from GetAvailableChannel() API. If the value input is invalid or not supported by this device, the device must set the channel to the factory default channel setting, without rejecting it.
    --No suitable validator. NewWirelessMode = {data_type = "", handler = nil}, --SOAP Spec: The input value must be one of the support modes for the device which returned from GetSupportMode() API. If the value input is invalid or not supported by this device, the device must set the mode to the factory default mode, without rejecting it.
    --No suitable validator. NewWPAEncryptionModes = {data_type = "", handler = nil}, --SOAP Spec: If firmware supports WPA3: WPA2-Personal, WPA3-Personal, WPA/WPA2-Personal, WPA2/WPA3-Personal, WPA/WPA2-Enterprise
    NewWPAPassphrase = {data_type = "wlan_wpakey", handler = nil} --SOAP Spec: >= 8 bytes, <=64 bytes. Our check is more reasonable.
}
function M.SetWLANWPAPSKByPassphrase(dataXml)
    --[[initialize setting parameters]]
    local inputParameters = { NewSSID = "", NewRegion = "", NewChannel = "", NewWirelessMode = "", NewWPAEncryptionModes = "", NewWPAPassphrase = "" }

    --local wifi = require "webGetFunc.wireless"
    local errorCode = "RESPONSE_NOERROR"

    --[[get setting parameter from XML data]]
    for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXml, "SetWLANWPAPSKByPassphrase", k)

        if tmpValue ~= nil then
            inputParameters[k] = tmpValue
        else
            --SOAP simulator auto test tool V4.9 checked these three options without value and expects return 402. Other options can NOT be reject and assign default value for them if they are invalid or without any value.
            if k == "NewSSID" or k == "NewRegion" or k == "NewWPAEncryptionModes" then
                errorCode = "RESPONSE_INVALID_ARGUMENTS"
                log.debug(1)
                log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", Invalid parameter key name: "..k)
                return soapResponse.buildResponseData(errorCode, {}, "SetWLANWPAPSKByPassphrase", M.service)
            end
        end
    end

    --[[do validator for setting parameters]]
    if (validator.soap_data_validate(inputParameters, SetWLANWPAPSKByPassphrase_maps) == false) or
       (check_WPA_encryptMode_for_SOAP_WPA3Supported(inputParameters["NewWPAEncryptionModes"]) == false) or
       --SOAP simulator auto test tool V4.9 sends NULL string for "NewRegion" and the expected response code is 402.
       (type(inputParameters["NewRegion"]) ~= type("")) then
        errorCode = "RESPONSE_INVALID_ARGUMENTS"
        log.debug(1)
        log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", Validation of SOAP data paramter is failed")
        return soapResponse.buildResponseData(errorCode, {}, "SetWLANWPAPSKByPassphrase", M.service)
    end

    local wifi = require "webGetFunc.wireless"
    local AXmode_status = wifi.getEnableAX()
    local ntgr_wifiRegion = wifi.getWifiRegion()
    local nmrp_sku = wifi.getNmrp_sku()
    local tmpWifiRegion = getWifiGUI_RegionByISO3166(inputParameters["NewRegion"])
    local tmpChannel = "0" --Auto
    local tmpBwMode = "3" --Max speed.
    local tmpSecurityMode = valid_WPA_desc_for_SOAP_WPA3Supported[inputParameters["NewWPAEncryptionModes"]]
    local tmpEncryptMode = "0" --AES
    --input parameter correction.
    if nmrp_sku ~= nil and (nmrp_sku == "WW" or nmrp_sku == "AU") then --Only WW sku and AU sku can change the wifi region by GUI or upper layer application.
        if inputParameters["NewRegion"] == "GE" then
            tmpWifiRegion = "EU"
        elseif tmpWifiRegion == nil then --SOAP autoTestTool V4.9 send this field by <NewRegion>USA</NewRegion>, it's not follow SOAP Spec defined.
            tmpWifiRegion = "US"
        end
    --2022.07.21, PegaBU6, YochengLian, Netgear PE urgent requirement to sync PA Sku behavior for US and CA sku and for beta user release.
    elseif nmrp_sku ~= nil and (nmrp_sku == "PA" or nmrp_sku == "US" or nmrp_sku == "CA") then
        local autoWifiRegion = getWifiRegion_from_autoDetect()
        tmpWifiRegion = (autoWifiRegion ~= nil and autoWifiRegion or "CA")
    else --US or other sku, --TODO: check other case.
        tmpWifiRegion = ntgr_wifiRegion --In most of other sku, it can't change wifi region. --Sync to GUI's behavior.
    end
    tmpChannel = correct_inputChannel("2.4G", tmpWifiRegion, inputParameters["NewChannel"]) or tmpChannel
    if AXmode_status == "true" then
        for i = 1, #wifi2G_ax_speed do
            if inputParameters["NewWirelessMode"] == (wifi2G_ax_speed[i].."Mbps") then
                tmpBwMode = tostring(i) --The index is mapping to GUI's speed, 3 options. (Order must be synced.)
                break
            end
        end
        --bwMode should be 3 if not found matched "speed", that is default value by Home Router Spec defined and SOAP Spec said: "The input value must be one of the support modes for the device which returned from GetSupportMode() API. If the value input is invalid or not supported by this device, the device must set the mode to the factory default mode, without rejecting it.".
    else --non AX mode.
        for i = 1, #wifi2G_g_n_speed do
            if inputParameters["NewWirelessMode"] == (wifi2G_g_n_speed[i].."Mbps") then
                tmpBwMode = tostring(i) --The index is mapping to GUI's speed, 3 options. (Order must be synced.)
                break
            end
        end
    end
    if tmpSecurityMode == "3" then
        tmpEncryptMode = "1" --TKIP/AES
    end

    --set 2.4G primary wifi with security.
    --Note: The SOAP Spec define for WPA/WPA2-Enterprise does not have radius related options, it's not reasonable.
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "wifiRegion", tmpWifiRegion)
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "wifiRegion", tmpWifiRegion) --PegaBU6, YochengLian, 2022.06.09, Must sync the wifiRegion for PA sku(auto detect ip location).
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "SSID", inputParameters["NewSSID"]) --TODO: It may need decode from SOAP's POST data.
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "channel", tmpChannel)
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "bwMode", tmpBwMode)
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "securityType", tmpSecurityMode)
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "encryptMode", tmpEncryptMode)
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "wpaPassphrase", inputParameters["NewWPAPassphrase"])

    uci_soap:save(NTGR_WIFI_UCI_CONFIG_NAME)

    --uci_soap:commit(NTGR_WIFI_UCI_CONFIG_NAME)
    --table.insert(changed_config, NTGR_WIFI_UCI_CONFIG_NAME) --"changed_config" is a global variable.
    soapCommon.configToSaveOrCommit(uci_soap, NTGR_WIFI_UCI_CONFIG_NAME)
    -- set flags for installEvents after wifi config changing
    installEvents.checkWifi(inputParameters["NewSSID"], inputParameters["NewWPAPassphrase"])

    --log.debug(1)
    log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", tmpWifiRegion="..tmpWifiRegion..", SSID="..inputParameters["NewSSID"]..", tmpChannel="..tmpChannel..", tmpBwMode="..tmpBwMode..", tmpSecurityType="..tmpSecurityMode..", tmpEncryptMode="..tmpEncryptMode..", wpaPassphrase="..inputParameters["NewWPAPassphrase"])
    return soapResponse.buildResponseData(errorCode, {}, "SetWLANWPAPSKByPassphrase", M.service)
end

--function NewChannel_5G_validator(parm, value, json)
--    -- custom handler function only be called at default datatype validate fail.
--    local ret = false
--
--    if parm == "NewChannel" then
--        local nmrpSku = uci_st:get("netgear", "board", "sku")
--        if nmrpSku == "US" and isInDSRC_band(value) == true then
--            ret = true
--        end
--    end
--    return ret
--end

local Set5GWLANWPAPSKByPassphrase_maps =
{
    NewSSID = {data_type = "wlan_ssid", handler = nil},
    --No suitable validator. NewRegion = {data_type = "", handler = nil}, --SOAP Spec: Please reference "Definition" sheet for supported region. If "UnifiedWirelessRegion" tag with value 1.0 and indicated in GetSupportFeatureLstXML API, this value needs to use unified 2-letter region code.
    --Can't reject it by SOAP Spec definition. NewChannel = {data_type = "wlan_5g_ch", handler = NewChannel_5G_validator}, --SOAP Spec: The input value must be one of the support channels which returned from GetAvailableChannel() API. If the value input is invalid or not supported by this device, the device must set the channel to the factory default channel setting, without rejecting it.
    --No suitable validator. NewWirelessMode = {data_type = "", handler = nil}, --SOAP Spec: The input value must be one of the support modes for the device which returned from GetSupportMode() API. If the value input is invalid or not supported by this device, the device must set the mode to the factory default mode, without rejecting it.
    --No suitable validator. NewWPAEncryptionModes = {data_type = "", handler = nil}, --SOAP Spec: If firmware supports WPA3: WPA2-Personal, WPA3-Personal, WPA/WPA2-Personal, WPA2/WPA3-Personal, WPA/WPA2-Enterprise
    NewWPAPassphrase = {data_type = "wlan_wpakey", handler = nil} --SOAP Spec: >= 8 bytes, <=64 bytes. Our check is more reasonable.
}
function M.Set5GWLANWPAPSKByPassphrase(dataXml)
    --[[initialize setting parameters]]
    local inputParameters = { NewSSID = "", NewRegion = "", NewChannel = "", NewWirelessMode = "", NewWPAEncryptionModes = "", NewWPAPassphrase = "" }

    --local wifi = require "webGetFunc.wireless"
    local errorCode = "RESPONSE_NOERROR"

    --[[get setting parameter from XML data]]
    for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXml, "Set5GWLANWPAPSKByPassphrase", k)

        if tmpValue ~= nil then
            inputParameters[k] = tmpValue
        else
            --SOAP simulator auto test tool V4.9 checked these three options without value and expects return 402. Other options can NOT be reject and assign default value for them if they are invalid or without any value.
            if k == "NewSSID" or k == "NewRegion" or k == "NewWPAEncryptionModes" then
                errorCode = "RESPONSE_INVALID_ARGUMENTS"
                log.debug(1)
                log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", Invalid parameter key name: "..k)
            return soapResponse.buildResponseData(errorCode, {}, "Set5GWLANWPAPSKByPassphrase", M.service)
            end
        end
    end

    --[[do validator for setting parameters]]
    if (validator.soap_data_validate(inputParameters, Set5GWLANWPAPSKByPassphrase_maps) == false) or
       (check_WPA_encryptMode_for_SOAP_WPA3Supported(inputParameters["NewWPAEncryptionModes"]) == false) or
       --SOAP simulator auto test tool V4.9 sends NULL string for "NewRegion" and the expected response code is 402.
       (type(inputParameters["NewRegion"]) ~= type("")) then
        errorCode = "RESPONSE_INVALID_ARGUMENTS"
        log.debug(1)
        log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", Validation of SOAP data paramter is failed")
        return soapResponse.buildResponseData(errorCode, {}, "Set5GWLANWPAPSKByPassphrase", M.service)
    end

    local wifi = require "webGetFunc.wireless"
    local AXmode_status = wifi.getEnableAX()
    local ntgr_wifiRegion = wifi.getWifiRegion()
    local nmrp_sku = wifi.getNmrp_sku()
    local tmpWifiRegion = getWifiGUI_RegionByISO3166(inputParameters["NewRegion"])
    local tmpChannel = "153"
    local tmpBwMode = "3" --Max speed.
    local tmpSecurityMode = valid_WPA_desc_for_SOAP_WPA3Supported[inputParameters["NewWPAEncryptionModes"]]
    local tmpEncryptMode = "0" --AES
    --input parameter correction.
    if nmrp_sku ~= nil and (nmrp_sku == "WW" or nmrp_sku == "AU") then --Only WW sku and AU sku can change the wifi region by GUI or upper layer application.
        if inputParameters["NewRegion"] == "GE" then --SOAP autoTestTool V4.9 send this field by <NewRegion>GB</NewRegion>, it's not follow SOAP Spec defined.
            tmpWifiRegion = "EU"
        elseif tmpWifiRegion == nil then
            tmpWifiRegion = "US"
        end
    --2022.07.21, PegaBU6, YochengLian, Netgear PE urgent requirement to sync PA Sku behavior for US and CA sku and for beta user release.
    elseif nmrp_sku ~= nil and (nmrp_sku == "PA" or nmrp_sku == "US" or nmrp_sku == "CA") then
        local autoWifiRegion = getWifiRegion_from_autoDetect()
        tmpWifiRegion = (autoWifiRegion ~= nil and autoWifiRegion or "CA")
    else --US or other sku, --TODO: check other case.
        tmpWifiRegion = ntgr_wifiRegion --In most of other sku, it can't change wifi region. --Sync to GUI's behavior.
    end
    tmpChannel = correct_inputChannel("5G", tmpWifiRegion, inputParameters["NewChannel"]) or tmpChannel
    if AXmode_status == "true" then
        for i = 1, #wifi5G_ax_speed_2x2 do
            if inputParameters["NewWirelessMode"] == (wifi5G_ax_speed_2x2[i].."Mbps") then
                tmpBwMode = tostring(i) --The index is mapping to GUI's speed, 3 options. (Order must be synced.)
                break
            end
        end
        --bwMode should be 3 if not found matched "speed", that is default value by Home Router Spec defined and SOAP Spec said: "The input value must be one of the support modes for the device which returned from GetSupportMode() API. If the value input is invalid or not supported by this device, the device must set the mode to the factory default mode, without rejecting it.".
    else --non AX mode.
        for i = 1, #wifi5G_ac_speed_2x2 do
            if inputParameters["NewWirelessMode"] == (wifi5G_ac_speed_2x2[i].."Mbps") then
                tmpBwMode = tostring(i) --The index is mapping to GUI's speed, 3 options. (Order must be synced.)
                break
            end
        end
    end
    if tmpSecurityMode == "3" then
        tmpEncryptMode = "1" --TKIP/AES
    end

    --set 5G primary wifi with security.
    --Note: The SOAP Spec define for WPA/WPA2-Enterprise does not have radius related options, it's not reasonable.
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "wifiRegion", tmpWifiRegion)
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "wifiRegion", tmpWifiRegion) --PegaBU6, YochengLian, 2022.06.09, Must sync the wifiRegion for PA sku(auto detect ip location).
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "SSID", inputParameters["NewSSID"]) --TODO: It may need decode from SOAP's POST data.
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "channel", tmpChannel)
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "bwMode", tmpBwMode)
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "securityType", tmpSecurityMode)
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "encryptMode", tmpEncryptMode)
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "wpaPassphrase", inputParameters["NewWPAPassphrase"])

    uci_soap:save(NTGR_WIFI_UCI_CONFIG_NAME)

    --uci_soap:commit(NTGR_WIFI_UCI_CONFIG_NAME)
    --table.insert(changed_config, NTGR_WIFI_UCI_CONFIG_NAME) --"changed_config" is a global variable.
    soapCommon.configToSaveOrCommit(uci_soap, NTGR_WIFI_UCI_CONFIG_NAME)

    --log.debug(1)
    log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", tmpWifiRegion="..tmpWifiRegion..", SSID="..inputParameters["NewSSID"]..", tmpChannel="..tmpChannel..", tmpBwMode="..tmpBwMode..", tmpSecurityType="..tmpSecurityMode..", tmpEncryptMode="..tmpEncryptMode..", wpaPassphrase="..inputParameters["NewWPAPassphrase"])
    return soapResponse.buildResponseData(errorCode, {}, "Set5GWLANWPAPSKByPassphrase", M.service)
end

local SetWLANNoSecurity_maps =
{
    NewSSID = {data_type = "wlan_ssid", handler = nil}
    --No suitable validator. NewRegion = {data_type = "", handler = nil}, --SOAP Spec: Please reference "Definition" sheet for supported region. If "UnifiedWirelessRegion" tag with value 1.0 and indicated in GetSupportFeatureLstXML API, this value needs to use unified 2-letter region code.
    --Can't reject it by SOAP Spec definition. NewChannel = {data_type = "wlan_2g_ch", handler = nil}, --SOAP Spec: The input value must be one of the support channels which returned from GetAvailableChannel() API. If the value input is invalid or not supported by this device, the device must set the channel to the factory default channel setting, without rejecting it.
    --No suitable validator. NewWirelessMode = {data_type = "", handler = nil}, --SOAP Spec: The input value must be one of the support modes for the device which returned from GetSupportMode() API. If the value input is invalid or not supported by this device, the device must set the mode to the factory default mode, without rejecting it.
}
function M.SetWLANNoSecurity(dataXml)
    --[[initialize setting parameters]]
    local inputParameters = { NewSSID = "", NewRegion = "", NewChannel = "", NewWirelessMode = "" }

    --local wifi = require "webGetFunc.wireless"
    local errorCode = "RESPONSE_NOERROR"

    --[[get setting parameter from XML data]]
    for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXml, "SetWLANNoSecurity", k)

        if tmpValue ~= nil then
            inputParameters[k] = tmpValue
        else
            errorCode = "RESPONSE_INVALID_ARGUMENTS"
            log.debug(1)
            log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", Invalid parameter key name: "..k)
            return soapResponse.buildResponseData(errorCode, {}, "SetWLANNoSecurity", M.service)
        end
    end

    --[[do validator for setting parameters]]
    if (validator.soap_data_validate(inputParameters, SetWLANNoSecurity_maps) == false) or
       --SOAP simulator auto test tool V4.9 sends NULL string for "NewRegion" and the expected response code is 402.
       (type(inputParameters["NewRegion"]) ~= type("")) then
        errorCode = "RESPONSE_INVALID_ARGUMENTS"
        log.debug(1)
        log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", Validation of SOAP data paramter is failed")
        return soapResponse.buildResponseData(errorCode, {}, "SetWLANNoSecurity", M.service)
    end

    local wifi = require "webGetFunc.wireless"
    local AXmode_status = wifi.getEnableAX()
    local ntgr_wifiRegion = wifi.getWifiRegion()
    local nmrp_sku = wifi.getNmrp_sku()
    local tmpWifiRegion = getWifiGUI_RegionByISO3166(inputParameters["NewRegion"])
    local tmpChannel = "0" --Auto
    local tmpBwMode = "3" --Max speed.
    local tmpSecurityMode = "1" --None security.
    local tmpEncryptMode = "-1" --No encrypt mode for None security and for MTK wifi driver using.
    --input parameter correction.
    if nmrp_sku ~= nil and (nmrp_sku == "WW" or nmrp_sku == "AU") then --Only WW sku and AU sku can change the wifi region by GUI or upper layer application.
        if inputParameters["NewRegion"] == "GE" then
            tmpWifiRegion = "EU"
        elseif tmpWifiRegion == nil then
            tmpWifiRegion = "US"
        end
    --2022.07.21, PegaBU6, YochengLian, Netgear PE urgent requirement to sync PA Sku behavior for US and CA sku and for beta user release.
    elseif nmrp_sku ~= nil and (nmrp_sku == "PA" or nmrp_sku == "US" or nmrp_sku == "CA") then
        local autoWifiRegion = getWifiRegion_from_autoDetect()
        tmpWifiRegion = (autoWifiRegion ~= nil and autoWifiRegion or "CA")
    else --US or other sku, --TODO: check other case.
        tmpWifiRegion = ntgr_wifiRegion --In most of other sku, it can't change wifi region. --Sync to GUI's behavior.
                                        --SOAP autoTestTool V4.9 send this field by <NewRegion>SG</NewRegion>.
    end
    tmpChannel = correct_inputChannel("2.4G", tmpWifiRegion, inputParameters["NewChannel"]) or tmpChannel
    if AXmode_status == "true" then
        for i = 1, #wifi2G_ax_speed do
            if inputParameters["NewWirelessMode"] == (wifi2G_ax_speed[i].."Mbps") then
                tmpBwMode = tostring(i) --The index is mapping to GUI's speed, 3 options. (Order must be synced.)
                break
            end
        end
        --bwMode should be 3 if not found matched "speed", that is default value by Home Router Spec defined and SOAP Spec said: "The input value must be one of the support modes for the device which returned from GetSupportMode() API. If the value input is invalid or not supported by this device, the device must set the mode to the factory default mode, without rejecting it.".
    else --non AX mode.
        for i = 1, #wifi2G_g_n_speed do
            if inputParameters["NewWirelessMode"] == (wifi2G_g_n_speed[i].."Mbps") then
                tmpBwMode = tostring(i) --The index is mapping to GUI's speed, 3 options. (Order must be synced.)
                break
            end
        end
    end

    --set 2.4G primary wifi without security.
    --Note: The SOAP Spec define for WPA/WPA2-Enterprise does not have radius related options, it's not reasonable.
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "wifiRegion", tmpWifiRegion)
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "wifiRegion", tmpWifiRegion) --PegaBU6, YochengLian, 2022.06.09, Must sync the wifiRegion for PA sku(auto detect ip location).
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "SSID", inputParameters["NewSSID"]) --TODO: It may need decode from SOAP's POST data.
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "channel", tmpChannel)
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "bwMode", tmpBwMode)
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "securityType", tmpSecurityMode)
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "encryptMode", tmpEncryptMode)

    uci_soap:save(NTGR_WIFI_UCI_CONFIG_NAME)

    --uci_soap:commit(NTGR_WIFI_UCI_CONFIG_NAME)
    --table.insert(changed_config, NTGR_WIFI_UCI_CONFIG_NAME) --"changed_config" is a global variable.
    soapCommon.configToSaveOrCommit(uci_soap, NTGR_WIFI_UCI_CONFIG_NAME)
    -- set flags for installEvents after wifi config changing (no security)
    installEvents.checkWifi(inputParameters["NewSSID"], "")

    --log.debug(1)
    log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", tmpWifiRegion="..tmpWifiRegion..", SSID="..inputParameters["NewSSID"]..", tmpChannel="..tmpChannel..", tmpBwMode="..tmpBwMode..", tmpSecurityType="..tmpSecurityMode..", tmpEncryptMode="..tmpEncryptMode)
    return soapResponse.buildResponseData(errorCode, {}, "SetWLANNoSecurity", M.service)
end

local Set5GWLANNoSecurity_maps =
{
    NewSSID = {data_type = "wlan_ssid", handler = nil}
    --No suitable validator. NewRegion = {data_type = "", handler = nil}, --SOAP Spec: Please reference "Definition" sheet for supported region. If "UnifiedWirelessRegion" tag with value 1.0 and indicated in GetSupportFeatureLstXML API, this value needs to use unified 2-letter region code.
    --Can't reject it by SOAP Spec definition. NewChannel = {data_type = "wlan_5g_ch", handler = NewChannel_5G_validator}, --SOAP Spec: The input value must be one of the support channels which returned from GetAvailableChannel() API. If the value input is invalid or not supported by this device, the device must set the channel to the factory default channel setting, without rejecting it.
    --No suitable validator. NewWirelessMode = {data_type = "", handler = nil}, --SOAP Spec: The input value must be one of the support modes for the device which returned from GetSupportMode() API. If the value input is invalid or not supported by this device, the device must set the mode to the factory default mode, without rejecting it.
}
function M.Set5GWLANNoSecurity(dataXml)
    --[[initialize setting parameters]]
    local inputParameters = { NewSSID = "", NewRegion = "", NewChannel = "", NewWirelessMode = "" }

    --local wifi = require "webGetFunc.wireless"
    local errorCode = "RESPONSE_NOERROR"

    --[[get setting parameter from XML data]]
    for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXml, "Set5GWLANNoSecurity", k)

        if tmpValue ~= nil then
            inputParameters[k] = tmpValue
        else
            errorCode = "RESPONSE_INVALID_ARGUMENTS"
            log.debug(1)
            log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", Invalid parameter key name: "..k)
            return soapResponse.buildResponseData(errorCode, {}, "Set5GWLANNoSecurity", M.service)
        end
    end

    --[[do validator for setting parameters]]
    if (validator.soap_data_validate(inputParameters, Set5GWLANNoSecurity_maps) == false) or
       --SOAP simulator auto test tool V4.9 sends NULL string for "NewRegion" and the expected response code is 402.
      (type(inputParameters["NewRegion"]) ~= type(""))  then
        errorCode = "RESPONSE_INVALID_ARGUMENTS"
        log.debug(1)
        log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", Validation of SOAP data paramter is failed")
        return soapResponse.buildResponseData(errorCode, {}, "Set5GWLANNoSecurity", M.service)
    end

    local wifi = require "webGetFunc.wireless"
    local AXmode_status = wifi.getEnableAX()
    local ntgr_wifiRegion = wifi.getWifiRegion()
    local nmrp_sku = wifi.getNmrp_sku()
    local tmpWifiRegion = getWifiGUI_RegionByISO3166(inputParameters["NewRegion"])
    local tmpChannel = "153"
    local tmpBwMode = "3" --Max speed.
    local tmpSecurityMode = "1" --None security.
    local tmpEncryptMode = "-1" --No encrypt mode for None security and for MTK wifi driver using.
    --input parameter correction.
    if nmrp_sku ~= nil and (nmrp_sku == "WW" or nmrp_sku == "AU") then --Only WW sku and AU sku can change the wifi region by GUI or upper layer application.
        if inputParameters["NewRegion"] == "GE" then
            tmpWifiRegion = "EU"
        elseif tmpWifiRegion == nil then
            tmpWifiRegion = "US"
        end
    --2022.07.21, PegaBU6, YochengLian, Netgear PE urgent requirement to sync PA Sku behavior for US and CA sku and for beta user release.
    elseif nmrp_sku ~= nil and (nmrp_sku == "PA" or nmrp_sku == "US" or nmrp_sku == "CA") then
        local autoWifiRegion = getWifiRegion_from_autoDetect()
        tmpWifiRegion = (autoWifiRegion ~= nil and autoWifiRegion or "CA")
    else --US or other sku, --TODO: check other case.
        tmpWifiRegion = ntgr_wifiRegion --In most of other sku, it can't change wifi region. --Sync to GUI's behavior.
                                        --SOAP autoTestTool V4.9 send this field by <NewRegion>SG</NewRegion>.
    end
    tmpChannel = correct_inputChannel("5G", tmpWifiRegion, inputParameters["NewChannel"]) or tmpChannel
    if AXmode_status == "true" then
        for i = 1, #wifi5G_ax_speed_2x2 do
            if inputParameters["NewWirelessMode"] == (wifi5G_ax_speed_2x2[i].."Mbps") then
                tmpBwMode = tostring(i) --The index is mapping to GUI's speed, 3 options. (Order must be synced.)
                break
            end
        end
        --bwMode should be 3 if not found matched "speed", that is default value by Home Router Spec defined and SOAP Spec said: "The input value must be one of the support modes for the device which returned from GetSupportMode() API. If the value input is invalid or not supported by this device, the device must set the mode to the factory default mode, without rejecting it.".
    else --non AX mode.
        for i = 1, #wifi5G_ac_speed_2x2 do
            if inputParameters["NewWirelessMode"] == (wifi5G_ac_speed_2x2[i].."Mbps") then
                tmpBwMode = tostring(i) --The index is mapping to GUI's speed, 3 options. (Order must be synced.)
                break
            end
        end
    end

    --set 5G primary wifi without security.
    --Note: The SOAP Spec define for WPA/WPA2-Enterprise does not have radius related options, it's not reasonable.
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "wifiRegion", tmpWifiRegion)
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "wifiRegion", tmpWifiRegion) --PegaBU6, YochengLian, 2022.06.09, Must sync the wifiRegion for PA sku(auto detect ip location).
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "SSID", inputParameters["NewSSID"]) --TODO: It may need decode from SOAP's POST data.
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "channel", tmpChannel)
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "bwMode", tmpBwMode)
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "securityType", tmpSecurityMode)
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "encryptMode", tmpEncryptMode)

    uci_soap:save(NTGR_WIFI_UCI_CONFIG_NAME)

    --uci_soap:commit(NTGR_WIFI_UCI_CONFIG_NAME)
    --table.insert(changed_config, NTGR_WIFI_UCI_CONFIG_NAME) --"changed_config" is a global variable.
    soapCommon.configToSaveOrCommit(uci_soap, NTGR_WIFI_UCI_CONFIG_NAME)

    --log.debug(1)
    log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", tmpWifiRegion="..tmpWifiRegion..", SSID="..inputParameters["NewSSID"]..", tmpChannel="..tmpChannel..", tmpBwMode="..tmpBwMode..", tmpSecurityType="..tmpSecurityMode..", tmpEncryptMode="..tmpEncryptMode)
    return soapResponse.buildResponseData(errorCode, {}, "Set5GWLANNoSecurity", M.service)
end

function M.GetInfo(dataXml)
    --[[initialize output parameters]]
    local outputParameters = { NewEnable = "", NewSSIDBroadcast = "", NewStatus = "", NewSSID = "", NewRegion = "", NewChannel = nil, NewWirelessMode = "", NewBasicEncryptionModes = "", NewWEPAuthType = "", NewWPAEncryptionModes = "", NewWLANMACAddress = "" }
    local errorCode = "RESPONSE_NOERROR"

    local wifi = require "webGetFunc.wireless"

    outputParameters["NewEnable"] = (wifi.getRadioOn("2.4G") == "true" and "1" or "0") --1 (enable), 0 (disable)
    outputParameters["NewSSIDBroadcast"] = (wifi.getSSIDBroadcast("2.4G", "primary") == "true" and "1" or "0") --1 (on), 0 (off)
    outputParameters["NewStatus"] = (wifi.getWifi_if_status("2.4G", "primary") == "up" and "Up" or "Disable") --"Up" or "Disable"
    outputParameters["NewSSID"] = wifi.getSsid("2.4G", "primary")
    local GUI_ntgr_wifiRegion = wifi.getWifiRegion()
    local iso3166_2letters_UnifiedWirelessRegion_for_ntgrSOAP = "US"
    if GUI_ntgr_wifiRegion ~= nil then
        iso3166_2letters_UnifiedWirelessRegion_for_ntgrSOAP = getISO3166byWifiGUI_Region(GUI_ntgr_wifiRegion) --NO support "ID", "MY", "PH", "SA", "TH", "AE" for Home Router Spec 16a, page 145.
    end
    if iso3166_2letters_UnifiedWirelessRegion_for_ntgrSOAP ~= nil and iso3166_2letters_UnifiedWirelessRegion_for_ntgrSOAP == "GB" then --Special convertion for "EU" wifi region. SOAP Spec defined it to "GE" but Netgear Home Router 16a, page 470 point the WW sku is using Greenwich time, that should be United Kindom ==> "GB" is its' ISO3166 country code. The definition and mapping is very confusion.
        iso3166_2letters_UnifiedWirelessRegion_for_ntgrSOAP = "GE"
    end
    if iso3166_2letters_UnifiedWirelessRegion_for_ntgrSOAP ~= nil then
        outputParameters["NewRegion"] = iso3166_2letters_UnifiedWirelessRegion_for_ntgrSOAP
    end
    local wifi2G_channel = wifi.getWifiChannel("2.4G")
    if wifi2G_channel ~= nil and wifi2G_channel ~= "" then
        if wifi2G_channel == 0 then
            outputParameters["NewChannel"] = "Auto" --The output value must be one of the support channels which returned from GetAvailableChannel() API.
        else
            outputParameters["NewChannel"] = wifi2G_channel --The output value must be one of the support channels which returned from GetAvailableChannel() API.
        end
    end
    local AXmode_status = wifi.getEnableAX()
    local bwMode_index = wifi.getWiFiMode("2.4G")
    if AXmode_status == "true" then
        outputParameters["NewWirelessMode"] = (wifi2G_ax_speed[tonumber(bwMode_index)].."Mbps") --The output value must be one of the support modes for the device which returned from GetSupportMode() API.
    else
        outputParameters["NewWirelessMode"] = (wifi2G_g_n_speed[tonumber(bwMode_index)].."Mbps") --The output value must be one of the support modes for the device which returned from GetSupportMode() API.
    end
    outputParameters["NewBasicEncryptionModes"] = getWPADesc_by_ntgrSecurityType(wifi.getSecurityType("2.4G", "primary")) --One of None, WPA2-Personal. WPA3-Personal, WPA/WPA2-Personal, WPA2/WPA3-Personal, WPA/WPA2-Enterprise.
    outputParameters["NewWEPAuthType"] = "Automatic" --One of Open, Shared, Automatic. --No this option can be set on GUI, here constant it to "Automatic".
    outputParameters["NewWPAEncryptionModes"] = getWPADesc_by_ntgrSecurityType(wifi.getSecurityType("2.4G", "primary")) --One of None, WPA2-Personal. WPA3-Personal, WPA/WPA2-Personal, WPA2/WPA3-Personal, WPA/WPA2-Enterprise.
    outputParameters["NewWLANMACAddress"] = wifi.getWifiMacAddr("2.4G", "primary") --Valid format: AABBCCDDEEFF

    if outputParameters["NewEnable"] == nil or
       outputParameters["NewSSIDBroadcast"] == nil or
       outputParameters["NewStatus"] == nil or
       outputParameters["NewSSID"] == nil or
       outputParameters["NewRegion"] == nil or
       outputParameters["NewChannel"] == nil or
       outputParameters["NewWirelessMode"] == nil or
       outputParameters["NewBasicEncryptionModes"] == nil or
       outputParameters["NewWEPAuthType"] == nil or
       outputParameters["NewWPAEncryptionModes"] == nil or
       outputParameters["NewWLANMACAddress"] == nil then
        errorCode = "RESPONSE_ACTION_FAILED"
    end

    --log.debug(1)
    log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", NewEnable="..outputParameters["NewEnable"]..", NewSSIDBroadcast="..outputParameters["NewSSIDBroadcast"]..", NewStatus="..outputParameters["NewStatus"]..", NewSSID="..outputParameters["NewSSID"]..", NewRegion="..outputParameters["NewChannel"]..", NewWirelessMode="..outputParameters["NewWirelessMode"]..", NewBasicEncryptionModes="..outputParameters["NewBasicEncryptionModes"]..", NewWEPAuthType="..outputParameters["NewWEPAuthType"]..", NewWPAEncryptionModes="..outputParameters["NewWPAEncryptionModes"]..", NewWLANMACAddress="..outputParameters["NewWLANMACAddress"])
    return soapResponse.buildResponseData(errorCode, outputParameters, "GetInfo", M.service)
end

function M.Get5GInfo(dataXml)
    --[[initialize output parameters]]
    local outputParameters = { NewEnable = "", NewSSIDBroadcast = "", NewStatus = "", NewSSID = "", NewRegion = "", NewChannel = "", NewWirelessMode = "", NewBasicEncryptionModes = "", NewWEPAuthType = "", NewWPAEncryptionModes = "", NewWLANMACAddress = "" }
    local errorCode = "RESPONSE_NOERROR"

    local wifi = require "webGetFunc.wireless"

    outputParameters["NewEnable"] = (wifi.getRadioOn("5G") == "true" and "1" or "0") --1 (enable), 0 (disable)
    outputParameters["NewSSIDBroadcast"] = (wifi.getSSIDBroadcast("5G", "primary") == "true" and "1" or "0") --1 (on), 0 (off)
    outputParameters["NewStatus"] = (wifi.getWifi_if_status("5G", "primary") == "up" and "Up" or "Disable") --"Up" or "Disable"
    outputParameters["NewSSID"] = wifi.getSsid("5G", "primary")
    local GUI_ntgr_wifiRegion = wifi.getWifiRegion()
    local iso3166_2letters_UnifiedWirelessRegion_for_ntgrSOAP = "US"
    if GUI_ntgr_wifiRegion ~= nil then
        iso3166_2letters_UnifiedWirelessRegion_for_ntgrSOAP = getISO3166byWifiGUI_Region(GUI_ntgr_wifiRegion) --NO support "ID", "MY", "PH", "SA", "TH", "AE" for Home Router Spec 16a, page 145.
    end
    if iso3166_2letters_UnifiedWirelessRegion_for_ntgrSOAP ~= nil and iso3166_2letters_UnifiedWirelessRegion_for_ntgrSOAP == "GB" then --Special convertion for "EU" wifi region. SOAP Spec defined it to "GE" but Netgear Home Router 16a, page 470 point the WW sku is using Greenwich time, that should be United Kindom ==> "GB" is its' ISO3166 country code. The definition and mapping is very confusion.
        iso3166_2letters_UnifiedWirelessRegion_for_ntgrSOAP = "GE"
    end
    if iso3166_2letters_UnifiedWirelessRegion_for_ntgrSOAP ~= nil then
        outputParameters["NewRegion"] = iso3166_2letters_UnifiedWirelessRegion_for_ntgrSOAP
    end
    local wifi5G_channel = wifi.getWifiChannel("5G")
    if wifi5G_channel ~= nil then
        outputParameters["NewChannel"] = wifi5G_channel --The output value must be one of the support channels which returned from GetAvailableChannel() API.
    end
    local AXmode_status = wifi.getEnableAX()
    local bwMode_index = wifi.getWiFiMode("5G")
    if AXmode_status == "true" then
        outputParameters["NewWirelessMode"] = (wifi5G_ax_speed_2x2[tonumber(bwMode_index)].."Mbps") --The output value must be one of the support modes for the device which returned from GetSupportMode() API.
    else
        outputParameters["NewWirelessMode"] = (wifi5G_ac_speed_2x2[tonumber(bwMode_index)].."Mbps") --The output value must be one of the support modes for the device which returned from GetSupportMode() API.
    end
    outputParameters["NewBasicEncryptionModes"] = getWPADesc_by_ntgrSecurityType(wifi.getSecurityType("5G", "primary")) --One of None, WPA2-Personal. WPA3-Personal, WPA/WPA2-Personal, WPA2/WPA3-Personal, WPA/WPA2-Enterprise.
    outputParameters["NewWEPAuthType"] = "Automatic" --One of Open, Shared, Automatic. --No this option can be set on GUI, here constant it to "Automatic".
    outputParameters["NewWPAEncryptionModes"] = getWPADesc_by_ntgrSecurityType(wifi.getSecurityType("5G", "primary")) --One of None, WPA2-Personal. WPA3-Personal, WPA/WPA2-Personal, WPA2/WPA3-Personal, WPA/WPA2-Enterprise.
    outputParameters["NewWLANMACAddress"] = wifi.getWifiMacAddr("5G", "primary") --Valid format: AABBCCDDEEFF

    if outputParameters["NewEnable"] == nil or
       outputParameters["NewSSIDBroadcast"] == nil or
       outputParameters["NewStatus"] == nil or
       outputParameters["NewSSID"] == nil or
       outputParameters["NewRegion"] == nil or
       outputParameters["NewChannel"] == nil or
       outputParameters["NewWirelessMode"] == nil or
       outputParameters["NewBasicEncryptionModes"] == nil or
       outputParameters["NewWEPAuthType"] == nil or
       outputParameters["NewWPAEncryptionModes"] == nil or
       outputParameters["NewWLANMACAddress"] == nil then
        errorCode = "RESPONSE_ACTION_FAILED"
    end

    --log.debug(1)
    log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", NewEnable="..outputParameters["NewEnable"]..", NewSSIDBroadcast="..outputParameters["NewSSIDBroadcast"]..", NewStatus="..outputParameters["NewStatus"]..", NewSSID="..outputParameters["NewSSID"]..", NewRegion="..outputParameters["NewChannel"]..", NewWirelessMode="..outputParameters["NewWirelessMode"]..", NewBasicEncryptionModes="..outputParameters["NewBasicEncryptionModes"]..", NewWEPAuthType="..outputParameters["NewWEPAuthType"]..", NewWPAEncryptionModes="..outputParameters["NewWPAEncryptionModes"]..", NewWLANMACAddress="..outputParameters["NewWLANMACAddress"])
    return soapResponse.buildResponseData(errorCode, outputParameters, "Get5GInfo", M.service)
end

function SOAP_2040MHzCoexistence_validator(parm, value, json)
    ret = false
    if parm == "New2040MHzCoexistence" then
        if tonumber(value) >= 0 and tonumber(value) <= 1 then
            ret = true
        end
    end
    log.debug(1)
    log.console("parm="..parm..", value="..value..", CAN NOT pass validation check!")
    return ret
end

function SOAP_PreambleMode_validator(parm, value, json)
    ret = false
    if parm == "SetPreambleMode" or parm == "Set5GPreambleMode" then
        if tonumber(value) >= 0 and tonumber(value) <= 2 then
            ret = true
        end
    end
    log.debug(1)
    log.console("parm="..parm..", value="..value..", CAN NOT pass validation check!")
    return ret
end

function SOAP_ImplicitBeamforming_validator(parm, value, json)
    ret = false
    if parm == "NewImplicitBeamforming" then
        if tonumber(value) >= 0 and tonumber(value) <= 1 then
            ret = true
        end
    end
    log.debug(1)
    log.console("parm="..parm..", value="..value..", CAN NOT pass validation check!")
    return ret
end

function SOAP_MultiUserMIMO_validator(parm, value, json)
    ret = false
    if parm == "NewMultiUserMIMO" then
        if tonumber(value) >= 0 and tonumber(value) <= 1 then
            ret = true
        end
    end
    log.debug(1)
    log.console("parm="..parm..", value="..value..", CAN NOT pass validation check!")
    return ret
end

function SOAP_AXModeEnable_validator(parm, value, json)
    ret = false
    if parm == "NewAXModeEnable" then
        if tonumber(value) >= 0 and tonumber(value) <= 1 then
            ret = true
        end
    end
    log.debug(1)
    log.console("parm="..parm..", value="..value..", CAN NOT pass validation check!")
    return ret
end

local SetAdvancedWirelessSettings_maps =
{
    New2040MHzCoexistence = {data_type = "", handler = SOAP_2040MHzCoexistence_validator}, --SOAP Spec: 0(disable)/1(enable)
    NewCTSRTSThreshold = {data_type = "wlan_cts_rts", handler = nil},
    New5GCTSRTSThreshold = {data_type = "wlan_cts_rts", handler = nil},
    SetPreambleMode = {data_type = "", handler = SOAP_PreambleMode_validator}, --SOAP Spec: 0-automatic / 1-short / 2-long
    Set5GPreambleMode = {data_type = "", handler = SOAP_PreambleMode_validator}, --SOAP Spec: 0-automatic / 1-short / 2-long
    NewTransmitPower = {data_type = "wlan_txpower", handler = nil}, --SOAP Spec: Percentage: 0-100
    New5GTransmitPower = {data_type = "wlan_txpower", handler = nil}, --SOAP Spec: Percentage: 0-100
    NewImplicitBeamforming = {data_type = "", handler = SOAP_ImplicitBeamforming_validator}, --SOAP Spec: 0(disable)/1(enable)
    NewMultiUserMIMO = {data_type = "", handler = SOAP_MultiUserMIMO_validator}, --SOAP Spec: 0(disable)/1(enable)
    NewAXModeEnable = {data_type = "", handler = SOAP_AXModeEnable_validator} --SOAP Spec: 0(disable)/1(enable)
}
function M.SetAdvancedWirelessSettings(dataXml)
    --[[initialize setting parameters]]
    local inputParameters = { New2040MHzCoexistence = "", NewCTSRTSThreshold = "", New5GCTSRTSThreshold = "", SetPreambleMode = "", Set5GPreambleMode = "", NewTransmitPower = "", New5GTransmitPower = "", NewImplicitBeamforming = "", NewMultiUserMIMO = "", NewAXModeEnable = "" }

    --local wifi = require "webGetFunc.wireless"
    local errorCode = "RESPONSE_NOERROR"

    --[[get setting parameter from XML data]]
    for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXml, "SetAdvancedWirelessSettings", k)

        if tmpValue ~= nil then
            inputParameters[k] = tmpValue
        else
            errorCode = "RESPONSE_INVALID_ARGUMENTS"
            log.debug(1)
            log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", Invalid parameter key name: "..k)
            return soapResponse.buildResponseData(errorCode, {}, "SetAdvancedWirelessSettings", M.service)
        end
    end

    --[[do validator for setting parameters]]
    if (validator.soap_data_validate(inputParameters, SetAdvancedWirelessSettings_maps) == false) then
        errorCode = "RESPONSE_INVALID_ARGUMENTS"
        log.debug(1)
        log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", Validation of SOAP data paramter is failed")
        return soapResponse.buildResponseData(errorCode, {}, "SetAdvancedWirelessSettings", M.service)
    end

    --Data conversion, The SOAP Spec definition and GUI/CGI definition is different.
    local tmpWifi2G_preamble_setting = "0" --"long preamble" for default value.
    local tmpWifi5G_preamble_setting = "0" --"long preamble" for default value.
    if inputParameters["SetPreambleMode"] == "2" then --Follow RAX30, no "automatic preamble" on GUI, we map the "automatic" and "long" to same(long preamble).
        tmpWifi2G_preamble_setting = "0"
    else
        tmpWifi2G_preamble_setting = inputParameters["SetPreambleMode"]
    end
    if inputParameters["Set5GPreambleMode"] == "2" then --Follow RAX30, no "automatic preamble" on GUI, we map the "automatic" and "long" to same(long preamble).
        tmpWifi5G_preamble_setting = "0"
    else
        tmpWifi5G_preamble_setting = inputParameters["Set5GPreambleMode"]
    end

    --set wifi advance setting.
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "BSSCoexistence", (inputParameters["New2040MHzCoexistence"] == "1" and "true" or "false"))
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "ctsrtsThreshhold", inputParameters["NewCTSRTSThreshold"])
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "txPreambleMode", tmpWifi2G_preamble_setting)
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "txTPC", inputParameters["NewTransmitPower"])
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "ctsrtsThreshhold", inputParameters["New5GCTSRTSThreshold"])
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "txPreambleMode", tmpWifi5G_preamble_setting)
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "txTPC", inputParameters["New5GTransmitPower"])
    --Beamforming enable/disale--
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "enableBeamforming", (inputParameters["NewImplicitBeamforming"] == "1" and "true" or "false"))
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "enableBeamforming", (inputParameters["NewImplicitBeamforming"] == "1" and "true" or "false"))
    --MU MIMO enable/disable--
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "enableMuMimo", (inputParameters["NewMultiUserMIMO"] == "1" and "true" or "false"))
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "enableMuMimo", (inputParameters["NewMultiUserMIMO"] == "1" and "true" or "false"))
    --AX Mode enable/disable--
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "enableAX", (inputParameters["NewAXModeEnable"]  == "1" and "true" or "false"))
    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "enableAX", (inputParameters["NewAXModeEnable"]  == "1" and "true" or "false"))

    uci_soap:save(NTGR_WIFI_UCI_CONFIG_NAME)

    --uci_soap:commit(NTGR_WIFI_UCI_CONFIG_NAME)
    --table.insert(changed_config, NTGR_WIFI_UCI_CONFIG_NAME) --"changed_config" is a global variable.
    soapCommon.configToSaveOrCommit(uci_soap, NTGR_WIFI_UCI_CONFIG_NAME)

    --log.debug(1)
    log.console(__FUNCTION__()..":"..__LINE__()..", errorCode="..errorCode..", New2040MHzCoexistence="..inputParameters["New2040MHzCoexistence"]..", NewCTSRTSThreshold="..inputParameters["NewCTSRTSThreshold"]..", New5GCTSRTSThreshold="..inputParameters["New5GCTSRTSThreshold"]..", tmpWifi2G_preamble_setting="..tmpWifi2G_preamble_setting..", tmpWifi5G_preamble_setting="..tmpWifi5G_preamble_setting..", NewTransmitPower="..inputParameters["NewTransmitPower"]..", New5GTransmitPower="..inputParameters["New5GTransmitPower"]..", NewImplicitBeamforming="..inputParameters["NewImplicitBeamforming"]..", NewMultiUserMIMO="..inputParameters["NewMultiUserMIMO"]..", NewAXModeEnable="..inputParameters["NewAXModeEnable"])
    return soapResponse.buildResponseData(errorCode, {}, "SetAdvancedWirelessSettings", M.service)
end

function wlan_schedule_validator(parm, value)
    local ret = false

    if value == "1" or value == "0" then
        ret = true
    end
    return ret
end

function wlan_key_validator(value)
    local ret = false
    local len = string.len(value)

    if len >= 8 and len <= 64 then
--        if string.match(value, "[0-9a-fA-F]") ~= nil then
            ret = true
--        end
    end

    return ret
end

local wlan_schedule_maps =
{
    NewPeriodStartTime        = { data_type = "time_slot", handler = nil },
    NewPeriodEndTime          = { data_type = "time_slot", handler = nil },
    NewPeriodWeekDayAll       = { data_type = "bool",      handler = wlan_schedule_validator },
    NewPeriodWeekDaySunday    = { data_type = "bool",      handler = wlan_schedule_validator },
    NewPeriodWeekDayMonday    = { data_type = "bool",      handler = wlan_schedule_validator },
    NewPeriodWeekDayTuesday   = { data_type = "bool",      handler = wlan_schedule_validator },
    NewPeriodWeekDayWednesday = { data_type = "bool",      handler = wlan_schedule_validator },
    NewPeriodWeekDayThursday  = { data_type = "bool",      handler = wlan_schedule_validator },
    NewPeriodWeekDayFriday    = { data_type = "bool",      handler = wlan_schedule_validator },
    NewPeriodWeekDaySaturday  = { data_type = "bool",      handler = wlan_schedule_validator }
};

local guest_network_maps =
{
    NewSSID  = { data_type = "wlan_ssid",   handler = nil },
    Schedule = { data_type = "number",      handler = nil }
};

function M.SetTurnWirelessOffBySchedule(dataXML)
    local inputParameters = {NewEnable=""}

    -- get setting parameter from XML data
    for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXML,"SetTurnWirelessOffBySchedule",k)

        if tmpValue ~= nil then
            inputParameters[k] = tmpValue
        else
            log.console("Invalid parameter: "..k)
            return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{},"SetTurnWirelessOffBySchedule",M.service)
        end
    end

    if inputParameters.NewEnable == "1" then
        uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "wifiScheduleEnable", "true")
    else
        uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "wifiScheduleEnable", "false")
    end

    uci_soap:save(NTGR_WIFI_UCI_CONFIG_NAME)

    --uci_soap:commit(NTGR_WIFI_UCI_CONFIG_NAME)
    --table.insert(changed_config, NTGR_WIFI_UCI_CONFIG_NAME) --"changed_config" is a global variable.
    soapCommon.configToSaveOrCommit(uci_soap, NTGR_WIFI_UCI_CONFIG_NAME)

    return soapResponse.buildResponseData("RESPONSE_NOERROR",{},"SetTurnWirelessOffBySchedule",M.service)
end

function M.DeleteTurnWirelessOffPeriodAll(dataXML)
    local section = ""

    for index = 0, 20 do
        section = string.format("@2G[%d]", index)
        uci:delete(NTGR_WIFI_UCI_CONFIG_NAME, section)
    end

    --uci:commit(NTGR_WIFI_UCI_CONFIG_NAME)
    --table.insert(changed_config, NTGR_WIFI_UCI_CONFIG_NAME) --"changed_config" is a global variable.
    soapCommon.configToSaveOrCommit(uci_soap, NTGR_WIFI_UCI_CONFIG_NAME)

    return soapResponse.buildResponseData("RESPONSE_NOERROR",{},"DeleteTurnWirelessOffPeriodAll",M.service)
end

local function conv_int2bool(value)
    if value == "1" then
        return "true"
    else
        return "false"
    end
end

local function is_period_exist(radio, inputParameters)
    local index = 0
    local result = 0

    uci:foreach(NTGR_WIFI_UCI_CONFIG_NAME, radio,
        function(s)
            if inputParameters.NewPeriodStartTime == s.startTime and
            inputParameters.NewPeriodEndTime == s.endTime and
            conv_int2bool(inputParameters.NewPeriodWeekDayAll) == s.everyday and
            conv_int2bool(inputParameters.NewPeriodWeekDaySunday) == s.sunday and
            conv_int2bool(inputParameters.NewPeriodWeekDayMonday) == s.monday and
            conv_int2bool(inputParameters.NewPeriodWeekDayTuesday == s.tuesday) and
            conv_int2bool(inputParameters.NewPeriodWeekDayWednesday) == s.wednesday and
            conv_int2bool(inputParameters.NewPeriodWeekDayThursday == s.thursday) and
            conv_int2bool(inputParameters.NewPeriodWeekDayFriday) == s.friday and
            conv_int2bool(inputParameters.NewPeriodWeekDaySaturday == s.saturday) then
                result = 1
            end

            index = index + 1
        end)

    return result,index
end

function M.SetTurnWirelessOffPeriod(dataXML)
    local inputParameters = {NewPeriodStartTime="", NewPeriodEndTime="", NewPeriodWeekDayAll="", NewPeriodWeekDaySunday="",
    NewPeriodWeekDayMonday="", NewPeriodWeekDayTuesday="", NewPeriodWeekDayWednesday="", NewPeriodWeekDayThursday="",
    NewPeriodWeekDayFriday="", NewPeriodWeekDaySaturday=""}
    local index = 0
    local section = ""

    -- get setting parameter from XML data
    for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXML,"SetTurnWirelessOffPeriod",k)

        if tmpValue ~= nil then
            inputParameters[k] = tmpValue
        else
            log.console("Invalid parameter: "..k)
            return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{},"SetTurnWirelessOffPeriod",M.service)
        end
    end

    -- do validator for setting parameters
    if (validator.soap_data_validate(inputParameters, wlan_schedule_maps) == false) then
        log.console("Validation of SOAP data paramter is failed")
        return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{},"SetTurnWirelessOffPeriod",M.service)
    end


    result,index=is_period_exist("2G")
    if result ~= 1 then
        uci:add(NTGR_WIFI_UCI_CONFIG_NAME, "2G")
    end
    log.console("radio 2G".." index "..index)

    section = string.format("@2G[%d]", index)
    uci:set(NTGR_WIFI_UCI_CONFIG_NAME, section, "startTime", inputParameters.NewPeriodStartTime)
    uci:set(NTGR_WIFI_UCI_CONFIG_NAME, section, "endTime", inputParameters.NewPeriodEndTime)
    uci:set(NTGR_WIFI_UCI_CONFIG_NAME, section, "everyday", conv_int2bool(inputParameters.NewPeriodWeekDayAll))
    uci:set(NTGR_WIFI_UCI_CONFIG_NAME, section, "sunday", conv_int2bool(inputParameters.NewPeriodWeekDaySunday))
    uci:set(NTGR_WIFI_UCI_CONFIG_NAME, section, "monday", conv_int2bool(inputParameters.NewPeriodWeekDayMonday))
    uci:set(NTGR_WIFI_UCI_CONFIG_NAME, section, "tuesday", conv_int2bool(inputParameters.NewPeriodWeekDayTuesday))
    uci:set(NTGR_WIFI_UCI_CONFIG_NAME, section, "wednesday", conv_int2bool(inputParameters.NewPeriodWeekDayWednesday))
    uci:set(NTGR_WIFI_UCI_CONFIG_NAME, section, "thursday", conv_int2bool(inputParameters.NewPeriodWeekDayThursday))
    uci:set(NTGR_WIFI_UCI_CONFIG_NAME, section, "friday", conv_int2bool(inputParameters.NewPeriodWeekDayFriday))
    uci:set(NTGR_WIFI_UCI_CONFIG_NAME, section, "saturday", conv_int2bool(inputParameters.NewPeriodWeekDaySaturday))

    --uci:commit(NTGR_WIFI_UCI_CONFIG_NAME)
    --table.insert(changed_config, NTGR_WIFI_UCI_CONFIG_NAME) --"changed_config" is a global variable.
    soapCommon.configToSaveOrCommit(uci_soap, NTGR_WIFI_UCI_CONFIG_NAME)

    return soapResponse.buildResponseData("RESPONSE_NOERROR",{},"SetTurnWirelessOffPeriod",M.service)
end

function M.DeleteTurnWirelessOffPeriodByIndex(dataXML)
    local inputParameters = {NewIndex=""}
    local index = 0
    local section = ""

    -- get setting parameter from XML data
    for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXML,"DeleteTurnWirelessOffPeriodByIndex",k)

        if tmpValue ~= nil then
            inputParameters[k] = tmpValue
        else
            log.console("Invalid parameter: "..k)
            return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{},"DeleteTurnWirelessOffPeriodByIndex",M.service)
        end
    end

    index = tonumber(inputParameters.NewIndex)-1
    section = string.format("@2G[%d]",index)
    uci:delete(NTGR_WIFI_UCI_CONFIG_NAME, section)

    --uci:commit(NTGR_WIFI_UCI_CONFIG_NAME)
    --table.insert(changed_config, NTGR_WIFI_UCI_CONFIG_NAME) --"changed_config" is a global variable.
    soapCommon.configToSaveOrCommit(uci_soap, NTGR_WIFI_UCI_CONFIG_NAME)

    return soapResponse.buildResponseData("RESPONSE_NOERROR",{},"DeleteTurnWirelessOffPeriodByIndex",M.service)
end

function M.Set5GTurnWirelessOffBySchedule(dataXML)
    local inputParameters = {NewEnable=""}

    -- get setting parameter from XML data
    for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXML,"Set5GTurnWirelessOffBySchedule",k)

        if tmpValue ~= nil then
            inputParameters[k] = tmpValue
        else
            log.console("Invalid parameter: "..k)
            return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{},"Set5GTurnWirelessOffBySchedule",M.service)
        end
    end

    if inputParameters.NewEnable == "1" then
        uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "wifiScheduleEnable", "true")
    else
        uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "wifiScheduleEnable", "false")
    end

    uci_soap:save(NTGR_WIFI_UCI_CONFIG_NAME)

    --uci_soap:commit(NTGR_WIFI_UCI_CONFIG_NAME)
    --table.insert(changed_config, NTGR_WIFI_UCI_CONFIG_NAME) --"changed_config" is a global variable.
    soapCommon.configToSaveOrCommit(uci_soap, NTGR_WIFI_UCI_CONFIG_NAME)

    return soapResponse.buildResponseData("RESPONSE_NOERROR",{},"Set5GTurnWirelessOffBySchedule",M.service)
end

function M.Delete5GTurnWirelessOffPeriodAll(dataXML)
    local section = ""

    for index = 0, 20 do
        section = string.format("@5G[%d]", index)
        uci:delete(NTGR_WIFI_UCI_CONFIG_NAME, section)
    end

    --uci:commit(NTGR_WIFI_UCI_CONFIG_NAME)
    --table.insert(changed_config, NTGR_WIFI_UCI_CONFIG_NAME) --"changed_config" is a global variable.
    soapCommon.configToSaveOrCommit(uci_soap, NTGR_WIFI_UCI_CONFIG_NAME)

    return soapResponse.buildResponseData("RESPONSE_NOERROR",{},"Delete5GTurnWirelessOffPeriodAll",M.service)
end

function M.Set5GTurnWirelessOffPeriod(dataXML)
    local inputParameters = {NewPeriodStartTime="", NewPeriodEndTime="", NewPeriodWeekDayAll="", NewPeriodWeekDaySunday="",
    NewPeriodWeekDayMonday="", NewPeriodWeekDayTuesday="", NewPeriodWeekDayWednesday="", NewPeriodWeekDayThursday="",
    NewPeriodWeekDayFriday="", NewPeriodWeekDaySaturday=""}

    -- get setting parameter from XML data
    for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXML,"Set5GTurnWirelessOffPeriod",k)

        if tmpValue ~= nil then
            inputParameters[k] = tmpValue
        else
            log.console("Invalid parameter: "..k)
            return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{},"Set5GTurnWirelessOffPeriod",M.service)
        end
    end

    -- do validator for setting parameters
    if (validator.soap_data_validate(inputParameters, wlan_schedule_maps) == false) then
        log.console("Validation of SOAP data paramter is failed")
        return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{},"Set5GTurnWirelessOffPeriod",M.service)
    end

    result,index=is_period_exist("5G")
    if result ~= 1 then
        uci:add(NTGR_WIFI_UCI_CONFIG_NAME, "5G")
    end
    log.console("radio 5G".." index "..index)

    section = string.format("@5G[%d]", index)
    uci:set(NTGR_WIFI_UCI_CONFIG_NAME, section, "startTime", inputParameters.NewPeriodStartTime)
    uci:set(NTGR_WIFI_UCI_CONFIG_NAME, section, "endTime", inputParameters.NewPeriodEndTime)
    uci:set(NTGR_WIFI_UCI_CONFIG_NAME, section, "everyday", conv_int2bool(inputParameters.NewPeriodWeekDayAll))
    uci:set(NTGR_WIFI_UCI_CONFIG_NAME, section, "sunday", conv_int2bool(inputParameters.NewPeriodWeekDaySunday))
    uci:set(NTGR_WIFI_UCI_CONFIG_NAME, section, "monday", conv_int2bool(inputParameters.NewPeriodWeekDayMonday))
    uci:set(NTGR_WIFI_UCI_CONFIG_NAME, section, "tuesday", conv_int2bool(inputParameters.NewPeriodWeekDayTuesday))
    uci:set(NTGR_WIFI_UCI_CONFIG_NAME, section, "wednesday", conv_int2bool(inputParameters.NewPeriodWeekDayWednesday))
    uci:set(NTGR_WIFI_UCI_CONFIG_NAME, section, "thursday", conv_int2bool(inputParameters.NewPeriodWeekDayThursday))
    uci:set(NTGR_WIFI_UCI_CONFIG_NAME, section, "friday", conv_int2bool(inputParameters.NewPeriodWeekDayFriday))
    uci:set(NTGR_WIFI_UCI_CONFIG_NAME, section, "saturday", conv_int2bool(inputParameters.NewPeriodWeekDaySaturday))

    --uci:commit(NTGR_WIFI_UCI_CONFIG_NAME)
    --table.insert(changed_config, NTGR_WIFI_UCI_CONFIG_NAME) --"changed_config" is a global variable.
    soapCommon.configToSaveOrCommit(uci_soap, NTGR_WIFI_UCI_CONFIG_NAME)

    return soapResponse.buildResponseData("RESPONSE_NOERROR",{},"Set5GTurnWirelessOffPeriod",M.service)
end

function M.Delete5GTurnWirelessOffPeriodByIndex(dataXML)
    local inputParameters = {NewIndex=""}
    local index = 0
    local section = ""

    -- get setting parameter from XML data
    for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXML,"Delete5GTurnWirelessOffPeriodByIndex",k)

        if tmpValue ~= nil then
            inputParameters[k] = tmpValue
        else
            log.console("Invalid parameter: "..k)
            return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{},"Delete5GTurnWirelessOffPeriodByIndex",M.service)
        end
    end

    index = tonumber(inputParameters.NewIndex)-1
    section = string.format("@5G[%d]",index)
    uci:delete(NTGR_WIFI_UCI_CONFIG_NAME, section)

    --uci:commit(NTGR_WIFI_UCI_CONFIG_NAME)
    --table.insert(changed_config, NTGR_WIFI_UCI_CONFIG_NAME) --"changed_config" is a global variable.
    soapCommon.configToSaveOrCommit(uci_soap, NTGR_WIFI_UCI_CONFIG_NAME)

    return soapResponse.buildResponseData("RESPONSE_NOERROR",{},"Delete5GTurnWirelessOffPeriodByIndex",M.service)
end

local function set_guest_schedule(radio_name, time)
    local cmd = ""
    local kill_cmd = ""

    if radio_name == MTK_DEF_2G_GUEST_IFNAME then
        cmd = "wifi_guest_schedule_2g.sh"
    else
        cmd = "wifi_guest_schedule_5g.sh"
    end

    kill_cmd = "killall "..cmd
    log.console("kill guest schedule cmd "..kill_cmd)
    sys.exec(kill_cmd)

    uci:set("WlanGuestSchedule", radio_name, "schedule_tm", time)
    uci:set("WlanGuestSchedule", radio_name, "start_tm", "0")
    uci:commit("WlanGuestSchedule")
    log.console("Run guest schedule cmd "..cmd)
    fork.fork_exec(cmd)
end

local function cal_pass_tm(radio_name)
    start_tm = uci:get("WlanGuestSchedule", radio_name, "start_tm")
    if start_tm == "0" then
        return 0
    else
        curr_tm = os.time()
        log.console("guest schedule start time "..start_tm.." curr time "..curr_tm)
        return tonumber(curr_tm)-tonumber(start_tm)
    end
end

function M.GetGuestAccessEnabled(dataXML)
    local outputParameters = {NewGuestAccessEnabled=""}
    local guest_on = wireless.getEnableGuestNetwork("2.4G")

    if guest_on == "true" then
        outputParameters["NewGuestAccessEnabled"] = 1
    elseif guest_on == "false" then
        outputParameters["NewGuestAccessEnabled"] = 0
    else
        outputParameters["NewGuestAccessEnabled"] = 2
    end

    return soapResponse.buildResponseData("RESPONSE_NOERROR",outputParameters,"GetGuestAccessEnabled",M.service)
end

function M.SetGuestAccessEnabled(dataXML)
    local inputParameters = {NewGuestAccessEnabled=""}

     -- get setting parameter from XML data
     for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXML,"SetGuestAccessEnabled",k)

        if tmpValue ~= nil then
            inputParameters[k] = tmpValue
        else
            log.console("Invalid parameter: "..k)
            return soapResponse.buildResponseData("RESPONSE_INVALID_ARGUMENTS",{},"SetGuestAccessEnabled",M.service)
        end
    end

    if inputParameters.NewGuestAccessEnabled == "1" then
        uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_GUEST_IFNAME, "guestEnable", "true")
    elseif inputParameters.NewGuestAccessEnabled == "0" then
        uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_GUEST_IFNAME, "guestEnable", "false")
    else
        return soapResponse.buildResponseData("RESPONSE_INVALID_ARGUMENTS",{},"SetGuestAccessEnabled",M.service)
    end

    uci_soap:save(NTGR_WIFI_UCI_CONFIG_NAME)

    --uci_soap:commit(NTGR_WIFI_UCI_CONFIG_NAME)
    --table.insert(changed_config, NTGR_WIFI_UCI_CONFIG_NAME) --"changed_config" is a global variable.
    soapCommon.configToSaveOrCommit(uci_soap, NTGR_WIFI_UCI_CONFIG_NAME)

    return soapResponse.buildResponseData("RESPONSE_NOERROR",{},"SetGuestAccessEnabled",M.service)
end

function M.Get5GGuestAccessEnabled(dataXML)
    local outputParameters = {NewGuestAccessEnabled=""}
    local guest_on = wireless.getEnableGuestNetwork("5G")

    if guest_on == "true" then
        outputParameters["NewGuestAccessEnabled"] = 1
    elseif guest_on == "false" then
        outputParameters["NewGuestAccessEnabled"] = 0
    else
        outputParameters["NewGuestAccessEnabled"] = 2
    end

    return soapResponse.buildResponseData("RESPONSE_NOERROR",outputParameters,"Get5GGuestAccessEnabled",M.service)
end

function M.Set5GGuestAccessEnabled(dataXML)
    local inputParameters = {NewGuestAccessEnabled=""}

     -- get setting parameter from XML data
     for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXML,"Set5GGuestAccessEnabled",k)

        if tmpValue ~= nil then
            inputParameters[k] = tmpValue
        else
            log.console("Invalid parameter: "..k)
            return soapResponse.buildResponseData("RESPONSE_INVALID_ARGUMENTS",{},"Set5GGuestAccessEnabled",M.service)
        end
    end

    if inputParameters.NewGuestAccessEnabled == "1" then
        uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_GUEST_IFNAME, "guestEnable", "true")
    elseif inputParameters.NewGuestAccessEnabled == "0" then
        uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_GUEST_IFNAME, "guestEnable", "false")
    else
        return soapResponse.buildResponseData("RESPONSE_INVALID_ARGUMENTS",{},"Set5GGuestAccessEnabled",M.service)
    end

    uci_soap:save(NTGR_WIFI_UCI_CONFIG_NAME)

    --uci_soap:commit(NTGR_WIFI_UCI_CONFIG_NAME)
    --table.insert(changed_config, NTGR_WIFI_UCI_CONFIG_NAME) --"changed_config" is a global variable.
    soapCommon.configToSaveOrCommit(uci_soap, NTGR_WIFI_UCI_CONFIG_NAME)

    return soapResponse.buildResponseData("RESPONSE_NOERROR",{},"Set5GGuestAccessEnabled",M.service)
end

function M.Set5GGuestAccessNetwork(dataXML)
    local inputParameters = {NewSSID="", NewSecurityMode="", NewKey1="", Schedule=""}
    local sec_type = ""

     -- get setting parameter from XML data
     for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXML,"Set5GGuestAccessNetwork",k)
        if tmpValue ~= nil then
            inputParameters[k] = tmpValue
        else
            log.console("Invalid parameter: "..k)
            return soapResponse.buildResponseData("RESPONSE_INVALID_ARGUMENTS",{},"Set5GGuestAccessNetwork",M.service)
        end
    end

    -- do validator for setting parameters
    if (validator.soap_data_validate(inputParameters, guest_network_maps) == false) or
        (check_WPA_encryptMode_for_SOAP_WPA3Supported(inputParameters.NewSecurityMode) == false) then
        log.console("Validation of SOAP data paramter is failed")
        return soapResponse.buildResponseData("RESPONSE_INVALID_ARGUMENTS",{},"Set5GGuestAccessNetwork",M.service)
    end

    --SOAP Spec: If firmware supports WPA3: WPA2-Personal, WPA3-Personal, WPA/WPA2-Personal, WPA2/WPA3-Personal, WPA/WPA2-Enterprise
    if inputParameters.NewSecurityMode == "WEP64" or inputParameters.NewSecurityMode == "WEP128" or
    inputParameters.NewSecurityMode == "WPA/WPA2-Enterprise" or inputParameters.NewSecurityMode == "WPA-PSK" or
    inputParameters.NewSecurityMode == "WPA2-PSK" or inputParameters.NewSecurityMode == "WPA-PSK/WPA2-PSK" then
        return soapResponse.buildResponseData("RESPONSE_INVALID_ARGUMENTS",{},"Set5GGuestAccessNetwork",M.service)
    else
        sec_type = valid_WPA_desc_for_SOAP_WPA3Supported[inputParameters.NewSecurityMode]
        uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_GUEST_IFNAME, "securityType", sec_type)
        if inputParameters.NewSecurityMode == "None" then
            uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_GUEST_IFNAME, "encryptMode", "-1") --NONE
        elseif inputParameters.NewSecurityMode == "WPA/WPA2-Personal" then
            uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_GUEST_IFNAME, "encryptMode", "1") --TKIPAES
        else -- WPA2-Personal,WPA3-Personal,WPA2/WPA3-Personal
            uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_GUEST_IFNAME, "encryptMode", "0") --AES
        end
    end

    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_GUEST_IFNAME, "SSID", inputParameters.NewSSID)
    if inputParameters.NewSecurityMode ~= "None" then
        if type(inputParameters.NewKey1) == "string" then
            if wlan_key_validator(inputParameters.NewKey1) == false then
                return soapResponse.buildResponseData("RESPONSE_INVALID_ARGUMENTS",{},"Set5GGuestAccessNetwork",M.service)
            else
                uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_GUEST_IFNAME, "wpaPassphrase", inputParameters.NewKey1)
            end
        end
    else
        uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_GUEST_IFNAME, "wpaPassphrase", "")
    end

    set_guest_schedule(MTK_DEF_5G_GUEST_IFNAME, inputParameters.Schedule)

    uci_soap:save(NTGR_WIFI_UCI_CONFIG_NAME)

    --uci_soap:commit(NTGR_WIFI_UCI_CONFIG_NAME)
    --table.insert(changed_config, NTGR_WIFI_UCI_CONFIG_NAME) --"changed_config" is a global variable.
    soapCommon.configToSaveOrCommit(uci_soap, NTGR_WIFI_UCI_CONFIG_NAME)

    return soapResponse.buildResponseData("RESPONSE_NOERROR",{},"Set5GGuestAccessNetwork",M.service)
end

function M.Get5GGuestAccessNetworkInfo(dataXML)
    local outputParameters = {NewSSID="", NewSecurityMode="", NewKey="", UserSetSchedule="", Schedule=""}
    local sec_type = ""
    local schedule = ""
    local pass_tm = 0
    local schedule_tm = 0

    outputParameters["NewSSID"] = wireless.getSsid("5G", "guest")
    schedule = uci:get("WlanGuestSchedule", MTK_DEF_5G_GUEST_IFNAME, "schedule_tm")
    if schedule ~= nil then
        outputParameters["UserSetSchedule"] = schedule
        schedule_tm = tonumber(schedule)
    else
        outputParameters["UserSetSchedule"] = 0
    end

    pass_tm = cal_pass_tm(MTK_DEF_5G_GUEST_IFNAME)
    if schedule_tm ~= 0 and pass_tm ~= 0 and pass_tm <= schedule_tm then
        outputParameters["Schedule"] = schedule_tm-pass_tm
    else
        outputParameters["Schedule"] = 0
    end

    sec_type = wireless.getSecurityType("5G", "guest")
    outputParameters["NewSecurityMode"] = conv_security_type_to_soapstr(sec_type)
    if outputParameters["NewSecurityMode"] == "None" then --SOAP Spec: String, <=64, blank for None, WEP Key1 or WPA passphrase.
       outputParameters["NewKey"] = ""
    else
       outputParameters["NewKey"] = wireless.getWPAPassphrase("5G", "guest")
    end

    return soapResponse.buildResponseData("RESPONSE_NOERROR",outputParameters,"Get5GGuestAccessNetworkInfo",M.service)
end

function M.SetGuestAccessNetwork(dataXML)
    local inputParameters = {NewSSID="", NewSecurityMode="", NewKey1="", Schedule=""}
    local sec_type = ""

     -- get setting parameter from XML data
     for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXML,"SetGuestAccessNetwork",k)
        if tmpValue ~= nil then
            inputParameters[k] = tmpValue
        else
            log.console("Invalid parameter: "..k)
            return soapResponse.buildResponseData("RESPONSE_INVALID_ARGUMENTS",{},"SetGuestAccessNetwork",M.service)
        end
    end

     -- do validator for setting parameters
    if (validator.soap_data_validate(inputParameters, guest_network_maps) == false) or
        (check_WPA_encryptMode_for_SOAP_WPA3Supported(inputParameters.NewSecurityMode) == false) then
        log.console("Validation of SOAP data paramter is failed")
        return soapResponse.buildResponseData("RESPONSE_INVALID_ARGUMENTS",{},"SetGuestAccessNetwork",M.service)
    end

    --SOAP Spec: If firmware supports WPA3: WPA2-Personal, WPA3-Personal, WPA/WPA2-Personal, WPA2/WPA3-Personal, WPA/WPA2-Enterprise
    if inputParameters.NewSecurityMode == "WEP64" or inputParameters.NewSecurityMode == "WEP128" or
    inputParameters.NewSecurityMode == "WPA/WPA2-Enterprise" or inputParameters.NewSecurityMode == "WPA-PSK" or
    inputParameters.NewSecurityMode == "WPA2-PSK" or inputParameters.NewSecurityMode == "WPA-PSK/WPA2-PSK" then
        return soapResponse.buildResponseData("RESPONSE_INVALID_ARGUMENTS",{},"Set5GGuestAccessNetwork",M.service)
    else
        sec_type = valid_WPA_desc_for_SOAP_WPA3Supported[inputParameters.NewSecurityMode]
        uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_GUEST_IFNAME, "securityType", sec_type)
        if inputParameters.NewSecurityMode == "None" then
            uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_GUEST_IFNAME, "encryptMode", "-1") --NONE
        elseif inputParameters.NewSecurityMode == "WPA/WPA2-Personal" then
            uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_GUEST_IFNAME, "encryptMode", "1") --TKIPAES
        else -- WPA2-Personal,WPA3-Personal,WPA2/WPA3-Personal
            uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_GUEST_IFNAME, "encryptMode", "0") --AES
        end
    end

    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_GUEST_IFNAME, "SSID", inputParameters.NewSSID)
    if inputParameters.NewSecurityMode ~= "None" then
        if type(inputParameters.NewKey1) == "string" then
            if wlan_key_validator(inputParameters.NewKey1) == false then
                return soapResponse.buildResponseData("RESPONSE_INVALID_ARGUMENTS",{},"Set5GGuestAccessNetwork",M.service)
            else
                uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_GUEST_IFNAME, "wpaPassphrase", inputParameters.NewKey1)
            end
        end
    else
        uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_GUEST_IFNAME, "wpaPassphrase", "")
    end

    set_guest_schedule(MTK_DEF_2G_GUEST_IFNAME, inputParameters.Schedule)

    uci_soap:save(NTGR_WIFI_UCI_CONFIG_NAME)

    --uci_soap:commit(NTGR_WIFI_UCI_CONFIG_NAME)
    --table.insert(changed_config, NTGR_WIFI_UCI_CONFIG_NAME) --"changed_config" is a global variable.
    soapCommon.configToSaveOrCommit(uci_soap, NTGR_WIFI_UCI_CONFIG_NAME)

    return soapResponse.buildResponseData("RESPONSE_NOERROR",{},"SetGuestAccessNetwork",M.service)

end

function M.GetGuestAccessNetworkInfo(dataXML)
    local outputParameters = {NewSSID="", NewSecurityMode="", NewKey="", UserSetSchedule="", Schedule=""}
    local sec_type = ""
    local schedule = ""
    local pass_tm = 0
    local schedule_tm = 0

    outputParameters["NewSSID"] = wireless.getSsid("2.4G", "guest")
    schedule = uci:get("WlanGuestSchedule", MTK_DEF_2G_GUEST_IFNAME, "schedule_tm")
    if schedule ~= nil then
        outputParameters["UserSetSchedule"] = schedule
        schedule_tm = tonumber(schedule)
    else
        outputParameters["UserSetSchedule"] = 0
    end

    pass_tm = cal_pass_tm(MTK_DEF_2G_GUEST_IFNAME)
    if schedule_tm ~= 0 and pass_tm ~= 0 and pass_tm <= schedule_tm then
        outputParameters["Schedule"] = schedule_tm-pass_tm
    else
        outputParameters["Schedule"] = 0
    end

    sec_type = wireless.getSecurityType("2.4G", "guest")
    outputParameters["NewSecurityMode"] = conv_security_type_to_soapstr(sec_type)
    if outputParameters["NewSecurityMode"] == "None" then --SOAP Spec: String, <=64, blank for None, WEP Key1 or WPA passphrase.
       outputParameters["NewKey"] = ""
    else
       outputParameters["NewKey"] = wireless.getWPAPassphrase("2.4G", "guest")
    end

    return soapResponse.buildResponseData("RESPONSE_NOERROR",outputParameters,"GetGuestAccessNetworkInfo",M.service)
end

function M.Set5GGuestAccessEnabled2(dataXML)
    local inputParameters = {NewGuestAccessEnabled="", NewSSID="", NewSecurityMode="", NewKey1="", Schedule=""}
    local sec_type = ""

     -- get setting parameter from XML data
     for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXML,"Set5GGuestAccessEnabled2",k)
        if tmpValue ~= nil then
            inputParameters[k] = tmpValue
        else
            log.console("Invalid parameter: "..k)
            return soapResponse.buildResponseData("RESPONSE_INVALID_ARGUMENTS",{},"Set5GGuestAccessEnabled2",M.service)
        end
    end

    -- do validator for setting parameters
    if (validator.soap_data_validate(inputParameters, guest_network_maps) == false) or
        (check_WPA_encryptMode_for_SOAP_WPA3Supported(inputParameters.NewSecurityMode) == false) then
        log.console("Validation of SOAP data paramter is failed")
        return soapResponse.buildResponseData("RESPONSE_INVALID_ARGUMENTS",{},"Set5GGuestAccessEnabled2",M.service)
    end

    if inputParameters.NewGuestAccessEnabled == "1" then
        uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_GUEST_IFNAME, "guestEnable", "true")
    elseif inputParameters.NewGuestAccessEnabled == "0" then
        uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_GUEST_IFNAME, "guestEnable", "false")
    else
        return soapResponse.buildResponseData("RESPONSE_INVALID_ARGUMENTS",{},"Set5GGuestAccessEnabled",M.service)
    end

    --SOAP Spec: If firmware supports WPA3: WPA2-Personal, WPA3-Personal, WPA/WPA2-Personal, WPA2/WPA3-Personal, WPA/WPA2-Enterprise
    if inputParameters.NewSecurityMode == "WEP64" or inputParameters.NewSecurityMode == "WEP128" or
    inputParameters.NewSecurityMode == "WPA/WPA2-Enterprise" or inputParameters.NewSecurityMode == "WPA-PSK" or
    inputParameters.NewSecurityMode == "WPA2-PSK" or inputParameters.NewSecurityMode == "WPA-PSK/WPA2-PSK" then
        return soapResponse.buildResponseData("RESPONSE_INVALID_ARGUMENTS",{},"Set5GGuestAccessEnabled2",M.service)
    else
        sec_type = valid_WPA_desc_for_SOAP_WPA3Supported[inputParameters.NewSecurityMode]
        uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_GUEST_IFNAME, "securityType", sec_type)
        if inputParameters.NewSecurityMode == "None" then
            uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_GUEST_IFNAME, "encryptMode", "-1") --NONE
        elseif inputParameters.NewSecurityMode == "WPA/WPA2-Personal" then
            uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_GUEST_IFNAME, "encryptMode", "1") --TKIPAES
        else -- WPA2-Personal,WPA3-Personal,WPA2/WPA3-Personal
            uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_GUEST_IFNAME, "encryptMode", "0") --AES
        end
    end

    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_GUEST_IFNAME, "SSID", inputParameters.NewSSID)
    if inputParameters.NewSecurityMode ~= "None" then
        if type(inputParameters.NewKey1) == "string" then
            if wlan_key_validator(inputParameters.NewKey1) == false then
                return soapResponse.buildResponseData("RESPONSE_INVALID_ARGUMENTS",{},"Set5GGuestAccessEnabled2",M.service)
            else
                uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_GUEST_IFNAME, "wpaPassphrase", inputParameters.NewKey1)
            end
        end
    else
        uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_GUEST_IFNAME, "wpaPassphrase", "")
    end

    set_guest_schedule(MTK_DEF_5G_GUEST_IFNAME, inputParameters.Schedule)

    uci_soap:save(NTGR_WIFI_UCI_CONFIG_NAME)

    --uci_soap:commit(NTGR_WIFI_UCI_CONFIG_NAME)
    --table.insert(changed_config, NTGR_WIFI_UCI_CONFIG_NAME) --"changed_config" is a global variable.
    soapCommon.configToSaveOrCommit(uci_soap, NTGR_WIFI_UCI_CONFIG_NAME)

    return soapResponse.buildResponseData("RESPONSE_NOERROR",{},"Set5GGuestAccessEnabled2",M.service)
end

function M.SetGuestAccessEnabled2(dataXML)
    local inputParameters = {NewGuestAccessEnabled="", NewSSID="", NewSecurityMode="", NewKey1="", Schedule=""}
    local sec_type = ""

     -- get setting parameter from XML data
     for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXML,"SetGuestAccessEnabled2",k)
        if tmpValue ~= nil then
            inputParameters[k] = tmpValue
        else
            log.console("Invalid parameter: "..k)
            return soapResponse.buildResponseData("RESPONSE_INVALID_ARGUMENTS",{},"SetGuestAccessEnabled2",M.service)
        end
    end

    -- do validator for setting parameters
    if (validator.soap_data_validate(inputParameters, guest_network_maps) == false) or
        (check_WPA_encryptMode_for_SOAP_WPA3Supported(inputParameters.NewSecurityMode) == false) then
        log.console("Validation of SOAP data paramter is failed")
        return soapResponse.buildResponseData("RESPONSE_INVALID_ARGUMENTS",{},"SetGuestAccessEnabled2",M.service)
    end

    if inputParameters.NewGuestAccessEnabled == "1" then
        uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_GUEST_IFNAME, "guestEnable", "true")
    elseif inputParameters.NewGuestAccessEnabled == "0" then
        uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_GUEST_IFNAME, "guestEnable", "false")
    else
        return soapResponse.buildResponseData("RESPONSE_INVALID_ARGUMENTS",{},"SetGuestAccessEnabled2",M.service)
    end

    --SOAP Spec: If firmware supports WPA3: WPA2-Personal, WPA3-Personal, WPA/WPA2-Personal, WPA2/WPA3-Personal, WPA/WPA2-Enterprise
    if inputParameters.NewSecurityMode == "WEP64" or inputParameters.NewSecurityMode == "WEP128" or
    inputParameters.NewSecurityMode == "WPA/WPA2-Enterprise" or inputParameters.NewSecurityMode == "WPA-PSK" or
    inputParameters.NewSecurityMode == "WPA2-PSK" or inputParameters.NewSecurityMode == "WPA-PSK/WPA2-PSK" then
        return soapResponse.buildResponseData("RESPONSE_INVALID_ARGUMENTS",{},"SetGuestAccessEnabled2",M.service)
    else
        sec_type = valid_WPA_desc_for_SOAP_WPA3Supported[inputParameters.NewSecurityMode]
        uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_GUEST_IFNAME, "securityType", sec_type)
        if inputParameters.NewSecurityMode == "None" then
            uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_GUEST_IFNAME, "encryptMode", "-1") --NONE
        elseif inputParameters.NewSecurityMode == "WPA/WPA2-Personal" then
            uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_GUEST_IFNAME, "encryptMode", "1") --TKIPAES
        else -- WPA2-Personal,WPA3-Personal,WPA2/WPA3-Personal
            uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_GUEST_IFNAME, "encryptMode", "0") --AES
        end
    end

    uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_GUEST_IFNAME, "SSID", inputParameters.NewSSID)
    if inputParameters.NewSecurityMode ~= "None" then
        if type(inputParameters.NewKey1) == "string" then
            if wlan_key_validator(inputParameters.NewKey1) == false then
                return soapResponse.buildResponseData("RESPONSE_INVALID_ARGUMENTS",{},"SetGuestAccessEnabled2",M.service)
            else
                uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_GUEST_IFNAME, "wpaPassphrase", inputParameters.NewKey1)
            end
        end
    else
        uci_soap:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_GUEST_IFNAME, "wpaPassphrase", "")
    end

    set_guest_schedule(MTK_DEF_2G_GUEST_IFNAME, inputParameters.Schedule)

    uci_soap:save(NTGR_WIFI_UCI_CONFIG_NAME)

    --uci_soap:commit(NTGR_WIFI_UCI_CONFIG_NAME)
    --table.insert(changed_config, NTGR_WIFI_UCI_CONFIG_NAME) --"changed_config" is a global variable.
    soapCommon.configToSaveOrCommit(uci_soap, NTGR_WIFI_UCI_CONFIG_NAME)

    return soapResponse.buildResponseData("RESPONSE_NOERROR",{},"SetGuestAccessEnabled2",M.service)
end

-- not support
function M.SetWPSMode()
    return soapResponse.buildResponseData("RESPONSE_NOERROR",{},"SetWPSMode",M.service)
end

function M.PressWPSPBC()
    return soapResponse.buildResponseData("RESPONSE_NOERROR",{},"PressWPSPBC",M.service)
end

function M.GetWPSMode()
    local outputParameters = {NewWPSEnable="0"}
    return soapResponse.buildResponseData("RESPONSE_NOERROR",outputParameters,"GetWPSMode",M.service)
end

function M.GetWPSPINInfo()
    local outputParameters = {NewWPSPINEnable="0", NewRouterWPSPIN="12345670"}
    return soapResponse.buildResponseData("RESPONSE_NOERROR",outputParameters,"GetWPSPINInfo",M.service)
end

function M.GetWPSStatus()
    local outputParameters = {NewClientMAC=""}
    return soapResponse.buildResponseData("RESPONSE_NOERROR",outputParameters,"GetWPSStatus",M.service)
end

function M.SetWMMEnable()
    return soapResponse.buildResponseData("RESPONSE_NOERROR",{},"SetWMMEnable",M.service)
end

function M.Set5GWMMEnable()
    return soapResponse.buildResponseData("RESPONSE_NOERROR",{},"Set5GWMMEnable",M.service)
end

return M
