local log = require "luci.log"
local soapParser = require "soap.soapParser"
local soapResponse = require "soap.soapResponse"
local validator = require "commonFunc.validator"
local uci    = require "luci.model.uci".cursor()

local M = {}

M.service = "Time"

local numOfNtpServer = 4

function M.GetInfo(dataXml)

    local ntpServer

    --[[initialize output parameters]]
    local outputParameters = {NewNTPServer1="", NewNTPServer2="", NewNTPServer3="", NewNTPServer4=""}
    ntpServer = uci:get_list("system", "ntp", "server")

    for i = 1, numOfNtpServer do
        if ntpServer[i] ~= nil then
            outputParameters["NewNTPServer"..i] = ntpServer[i]
        end
    end

    return soapResponse.buildResponseData("RESPONSE_NOERROR",outputParameters,"GetInfo",M.service)
end

return M

