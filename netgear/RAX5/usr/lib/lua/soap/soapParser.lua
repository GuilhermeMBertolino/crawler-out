local log = require"luci.log"
local M ={}

local _ESCAPETAGS = { 
      ["(.*<Password>)(.*)(</Password>.*)"] = "DeviceConfig.SOAPLogin",
      ["(.*<Username>)(.*)(</Username>.*)"] = "DeviceConfig.SOAPLogin",
      ["(.*<NewPassword>)(.*)(</NewPassword>.*)"] = "DeviceConfig.UpdateAdminPassword",
}

function M.getServiceAction(soapAction)
    -- Fix jira154, reboot test,
    -- NH APP send (urn:NETGEAR-ROUTER     :service:DeviceConfig:1#Reboot)
    -- alexa APP send ("urn:NETGEAR-ROUTER     :service:DeviceConfig:1#Reboot")
    service , action = string.match(soapAction, ".+:?service:?(%w+):?.+#(.+)")
    action = string.gsub(action, "%W", "")
    return service, action
    -- return string.match(soapAction, ".+:?service:?(%w+):?.+#(.+)")
end

function M.getActionParameter(dataXml, action, parameter)

    --return dataXml["SOAP-ENV:Envelope"]["SOAP-ENV:Body"][action][parameter][1]
    local envelopeTag = nil
    local bodyTag = nil
    local actionTag = nil
    
    for k,v in pairs(dataXml) do
        envelopeTag = string.match(k,"(.+:?Envelope)")
        if envelopeTag ~= nil then 
            break
        end
    end
    
    if envelopeTag then
        for k,v in pairs(dataXml[envelopeTag]) do
            bodyTag = string.match(k,"(.+:?Body)")
            if bodyTag ~= nil then 
                break
            end
        end
    end
    
    if bodyTag then
        for k,v in pairs(dataXml[envelopeTag][bodyTag]) do
            actionTag = string.match(k,action)
            if actionTag ~= nil then
                actionTag = k
                break
            end
        end
    end
    
    if actionTag then
        return dataXml[envelopeTag][bodyTag][actionTag][parameter]
    else
        log.force("Can not parse XML!!")
        log.force_r(dataXml)
        return ""
    end
    
end

function M.escapeXmlTag(inputXml)
    local output = false
    
    for k,v in pairs(_ESCAPETAGS) do
        local prefix , doEscapeStr, suffix = string.match(inputXml, k, 1)

        if prefix and doEscapeStr and suffix then
            local soap = require"soap"
            local escapedStr = soap.escape(doEscapeStr)
            if type(escapedStr) == "string" then
                output = prefix..escapedStr..suffix
                inputXml = output
            end
        end
    end

   return type(output) == string and output or inputXml
end

return M
