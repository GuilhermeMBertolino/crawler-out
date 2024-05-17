local log = require "luci.log"
--log.debug(1)

local response_code_table =
    {
        RESPONSE_NOERROR="000",
        RESPONSE_ERROR="001",
        RESPONSE_UNAVAILABLE="400",
        RESPONSE_UNAUTHENTICATE="401",
        RESPONSE_INVALID_AUTHENTICATE="401",
        RESPONSE_INVALID_ARGUMENTS="402",
        RESPONSE_UNSUPPORTED="404",
        RESPONSE_INVALID_MAC_ADDR="405",
        RESPONSE_ATD_ACTIVE_SYNC="409",
        RESPONSE_BLOCK_DEVICE="423",
        RESPONSE_ACTION_FAILED="501",
        RESPONSE_SERVER_BUSY="503",
        RESPONSE_STRING_ARGUMENT_TOO_LONG="605",
        RESPONSE_VALUE_SPECIFIED_IS_INVALID="702",
        RESPONSE_OVER_MAX_RULE_COUNT="705",
        RESPONSE_CONFLICT_STRING_ARGUMENT="707",
        RESPONSE_SAME_STRING_ARGUMENT="708",
        RESPONSE_SYSTEM_TIME_NOT_SYNC="710",
        RESPONSE_SET_DNSMASQ_DEVICEID_ERROR="002",
        RESPONSE_MALLOC_ERROR="002",
        RESPONSE_REBOOT_REQUIRED="001",
        RESPONSE_FACTORY_RESET_PASSWOARD_ERROR="001",
        RESPONSE_FACTORY_RESET_SN_ERROR="002",
        RESPONSE_OLD_PASSWOARD_ERROR="001",
        RESPONSE_NEW_PASSWOARD_ERROR="002",
        RESPONSE_INVALID_ACTION="401"
    }

local M = {encoding = "utf-8" }

function M.getResponseCodeByName(respName)
    if type(respName) == "string" then
        local respCode = response_code_table[respName]
        if respCode ~= nil and type(tonumber(respCode)) == "number" then
            return respCode
        end
    end
    return " "
end

function M:xml_header ()
  return '<?xml version="1.0" encoding="'..M.encoding..'"?>\n'
end

function M.buildResponseData(responseCodeStr, tagValues, actionName, serviceName)

    local installEvents = require "commonFunc.installEvents"
    local soapUtil = require"soap"
    local structured_attr = {
              namespace = "urn:NETGEAR-ROUTER:service:"..serviceName..":1",
              method = "m:"..actionName.."Response",
              entries = {
              },
              codeTag = "ResponseCode",
              codeValue = M.getResponseCodeByName(responseCodeStr),
          }

    if type(tagValues) == "table"  then
        for k, v in pairs(tagValues) do
            local tmpTagValue = {}
            tmpTagValue["tag"] = k
            table.insert(tmpTagValue,v)
            table.insert(structured_attr.entries,tmpTagValue)
        end
    end
    installEvents.send("soap response", nil, serviceName..":"..actionName, structured_attr["codeValue"])

    local dataStr = soapUtil.encode(structured_attr)
    local full_response = M.xml_header()..dataStr
    return full_response

end

return M
