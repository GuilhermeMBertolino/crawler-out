local log = require"luci.log"
local netutils = require "commonFunc.netUtils"
local sha2 = require "sha2"
local pwdCommon = require "webPostHandler.passwdCommon"
local uci = require "luci.model.uci".cursor()
log.debug(1)

local M ={}

M.MAX_SOAP_LOGIN_TOKENS = 256

local SOAP_CONNECTION_TIMEOUT = 300

function M.sleep(s)
  local socket=require'socket'
  local ntime = socket.gettime() + s/10
  repeat until socket.gettime() > ntime
end

function M.getClientMac(clientIpAddr)
    local lanIpAddr =  require"webGetFunc.interface".getLanInstanceIpAddr()
    local lanPrefix = string.format("%d.%d.%d.",string.match(lanIpAddr,"(%d+).(%d+).(%d+).%d+"))
    local lastAddr = string.gsub(clientIpAddr, lanPrefix,"")
    local isIpv4 =  netutils.checkIpv4Format(clientIpAddr)
    local cmdStr = "/usr/sbin/ip -4 ne ls "..clientIpAddr
    if isIpv4 == false then
        cmdStr = "/usr/sbin/ip -6 ne ls "..clientIpAddr
    end
    local exec = require"luci.util".exec
    local cmdRes = exec(cmdStr)
    local clientMAC =  string.match(cmdRes, ".+lladdr (.+) .+")

    if clientMAC then
        return clientMAC
    else
    -- Lomen Add Start, fix remove access no mac address issue
        local gatewayIp = io.popen("/usr/bin/d2 -s general[0].GatewayIP")
        if gatewayIp then
            gatewayIpStr = gatewayIp:read("*l")
            local strIP = string.match(gatewayIpStr, "(.*)\n")
            if gatewayIpStr == clientIpAddr then
                gatewayIp:close()
                clientMAC = exec("/usr/bin/d2 -s general[0].DefaultMAC")
                local strMAC = string.match(clientMAC, "(.*)\n")
                return strMAC
            end
            gatewayIp:close()
        end
    -- Lomen Add End
        return nil
    end

end

function M.getClientInfoTable()
    local uci_st= require "luci.model.uci".cursor("/tmp",nil)
    local clientInfo_T ={}
    uci_st:foreach("soap","clientInfo", function(s)
        local tmpClientInfo = {}
        tmpClientInfo["mac"] = s['.name']
        tmpClientInfo["ipAddr"] = s['ipAddr']
        tmpClientInfo["timeStamp"] = s['timeStamp']
        tmpClientInfo["token"] = s['token']
        tmpClientInfo["count"] = s['count']
        tmpClientInfo["loginStatus"] = s['loginStatus']
        tmpClientInfo["blocked"] = s['blocked']
        clientInfo_T[s['.name']] = tmpClientInfo
    end)
    return clientInfo_T
end


function M.getClientInfoNumber(clientInfoTable)
    local count = 0
    for _ in pairs(clientInfoTable) do
        count = count + 1
    end
    return count
end

function M.removeTimeoutClient()

    local socket=require'socket'
    local uci_st= require "luci.model.uci".cursor("/tmp",nil)

    local deleteSections = {}
    uci_st:foreach("soap","clientInfo", function(s)
        local currentTime = socket.gettime()

        --Yocheng Lian, Workaround solution for SOAP Auto Test Tool V4.9 --Simulator. So many requests received in same time and the clientInfo(or timeStamp attribute) may be not ready/exist in every time.
        if s['timeStamp'] ~= nil and (currentTime-tonumber(s['timeStamp']) > SOAP_CONNECTION_TIMEOUT) then
          table.insert(deleteSections,s['.name'])
        end
      end)

    --Yocheng Lian, Workaround solution for SOAP Auto Test Tool V4.9 --Simulator. So many requests received in same time and the clientInfo(or timeStamp attribute) may be not ready/exist in every time.
    if #deleteSections > 0 then
        for i,v in pairs(deleteSections) do
            uci_st:delete("soap", v)
            log.console("Remove SOAP timeout client :"..v)
        end
    end

    uci_st:commit("soap")
end

function M.updateClinetInfoForBlockState(clientMac,clientIpAddr)

    local uci_st= require "luci.model.uci".cursor("/tmp",nil)
    local socket=require'socket'
    local shortMac = clientMac:gsub(":","")
    local currentCount = uci_st:get("soap",shortMac,"count")
    local setBlocked = "0"

    if currentCount ~= nil then
        uci_st:delete("soap",shortMac)
        local setCount = tonumber(currentCount) + 1

        if setCount >= 5 then
            setBlocked = "1"
        end

        local res = uci_st:section("soap","clientInfo",shortMac,{ipAddr=clientIpAddr,timeStamp=socket.gettime(),token="" ,count=tostring(setCount),loginStatus="0", blocked=setBlocked})

    else
        local res = uci_st:section("soap","clientInfo",shortMac,{ipAddr=clientIpAddr,timeStamp=socket.gettime(),token="" ,count="1",loginStatus="0", blocked=setBlocked})
    end

    uci_st:commit("soap")
end

function M.updateAllClinetsBlockState()

    local uci_st= require "luci.model.uci".cursor("/tmp",nil)
    local socket=require'socket'
    local removeClientInfo_T ={}
    uci_st:foreach("soap","clientInfo", function(s)

        local clientCount = tonumber(s['count'])
        if clientCount >= 5 then
            local clientTimeStamp = tonumber(s['timeStamp'])
            if (socket.gettime() - clientTimeStamp ) > 30 then
                table.insert(removeClientInfo_T, s['.name'])
            end
        end

    end)

    for i,v in pairs(removeClientInfo_T) do
        uci_st:delete("soap", v)
        log.console("Remove SOAP timeout client :"..v)
    end

    uci_st:commit("soap")
end

function M.isBlockClient(clientMac)

    local uci_st= require "luci.model.uci".cursor("/tmp",nil)
    local shortMac = clientMac:gsub(":","")
    local locked = uci_st:get("soap",shortMac,"blocked")

    if tostring(locked) == "1" then
      return true
    else
      return false
    end

end

function M.generateToken()
      local token = require("webGetFunc.token")
      local tokenStr = nil
      while tokenStr == nil do
        tokenStr = token.genUniqueToken()

        if M.isTokenExist(tokenStr) then
            tokenStr = nil
        else
            return tokenStr
        end
      end
end

function M.isTokenExist(inputToken)
    local uci_st= require "luci.model.uci".cursor("/tmp",nil)

    uci_st:foreach("soap","clientInfo", function(s)
        if inputToken ==  s['token'] then
            return true
        end
    end)

  return false
end

function M.updateClientInfoToLoginStatus(clientMac, clientIpAddr, clientToken)

    local uci_st= require "luci.model.uci".cursor("/tmp",nil)
    local shortMac = clientMac:gsub(":","")
    local socket=require'socket'
    local newToken = M.generateToken()
    local prevToken = ""
    local prevTimestamp = 0
    local currentTime = socket.gettime()

    -- uci_st:delete("soap",shortMac)
    if clientToken ~= nil and clientToken:len() > 0 then
        prevToken = uci_st:get("soap", shortMac, "token")
        if prevToken == clientToken then
            prevTimestamp = uci_st:get("soap", shortMac, "timeStamp")
            if currentTime - tonumber(prevTimestamp) < SOAP_CONNECTION_TIMEOUT then
                newToken = prevToken
            end
        end
    end

    uci_st:section("soap","clientInfo",shortMac,{ipAddr=clientIpAddr,timeStamp=currentTime,token=newToken ,count="1",loginStatus="1", blocked="0"})
    uci_st:commit("soap")
    return newToken
end

function M.removeClient(clientMac)

    local socket=require'socket'
    local uci_st= require "luci.model.uci".cursor("/tmp",nil)
    local shortMac = clientMac:gsub(":","")
    uci_st:delete("soap", shortMac)
    uci_st:commit("soap")

end

function M.updateClientInfoTimeStampToken(clientMac)

    local uci_st= require "luci.model.uci".cursor("/tmp",nil)
    local shortMac = clientMac:gsub(":","")
    local socket=require'socket'
    local setCount = uci_st:get("soap",shortMac,"count")
    local setIpAddr = uci_st:get("soap",shortMac,"ipAddr")
    local newToken = uci_st:get("soap",shortMac,"token")
    --local newToken = M.generateToken()

    --[[ Don't revert section, just revert "timeStamp" option
    --uci_st:revert("soap",shortMac)
    --uci_st:section("soap","clientInfo",shortMac,{ipAddr=setIpAddr,timeStamp=socket.gettime(),token=newToken ,count=setCount,loginStatus="1", blocked="0"})
    --]]
    uci_st:delete("soap",shortMac,"timeStamp")
    uci_st:set("soap",shortMac,"timeStamp",socket.gettime())
    uci_st:commit("soap")
    return newToken

end

function M.checkToken(clientMac, clientIp, clientToken)
    local uci_st= require "luci.model.uci".cursor("/tmp",nil)
    local shortMac = clientMac:gsub(":","")
    local ipAddr = uci_st:get("soap",shortMac,"ipAddr")
    local token = uci_st:get("soap",shortMac,"token")

    --[[Workaround for SOAP automation tool:APP simulator
    if type(ipAddr) == "string" then
        for i = 1, 30 do
            if type(ipAddr) == "string" then
                break
            end
            M.sleep(2)
            ipAddr = uci_st:get("soap",shortMac,"ipAddr")
        end
    end]]

    if type(ipAddr) == "string" then
        if ipAddr == clientIp then
            if type(token) == "string" and string.len(clientToken) > 0 and token == clientToken then
                local newToken = M.updateClientInfoTimeStampToken(clientMac)
                return true, newToken
            else
                M.removeClient(clientMac)
                return false
            end
        else
            M.removeClient(clientMac)
            return false
        end
    end
    return false
end

function M.checkAuthenticated(clientMac, clientIp, clientToken)

    local ret = true
    local lanBridegIpAddr = require"webGetFunc.interface".getLanInstanceIpAddr()
    if clientIp == "127.0.0.1" or clientIp == lanBridegIpAddr then
        return ret
    end

    local uci_st= require "luci.model.uci".cursor("/tmp",nil)
    local shortMac = clientMac:gsub(":","")
    local loginStatus = uci_st:get("soap",shortMac,"loginStatus")

    --[[Workaround for SOAP automation tool:APP simulator
    if loginStatus ==  nil then
        for i = 1, 50 do
            if loginStatus ~=  nil then
                break
            end
            M.sleep(2)
            loginStatus = uci_st:get("soap",shortMac,"loginStatus")
        end
    end]]

    if loginStatus ==  nil then
        ret = false
    elseif loginStatus == "1" then
        local checkResult, newToken = M.checkToken(clientMac, clientIp, clientToken)
        if checkResult then
            return true, newToken
        else
            ret = false
        end
    else
        ret = false
    end

    return ret
end

function M.UpdateAdminPassword(newPW)

    local auth = require "commonFunc.auth"
    local name = auth.getUsername()

    if not auth.checkpasswd(name,newPW) then
        local user = luci.sys.user
        local rs = user.setpasswd(name,newPW)

        if rs == 0 then
            passwd = auth.getpasswd(name)
            local file = io.open("/var/user.htpasswd","w")
            local setpasswd = name..":"..passwd
            local newpasswd = newPW
            local hash_pwd_bin = sha2.sha256(newpasswd)
            local hash_pwd_hex = pwdCommon.bintohex(hash_pwd_bin)
            file:write(setpasswd)
            file:close()
            uci:set("loginpwd","config","hash256password",hash_pwd_hex)
            --Matt, 20221205. Need to commit to save "hash256password" option. 
            --Currently, flow will not save this option to /etc/config/loginpwd. So we added commit here.
            --telnet enable tool needs this option to verify client.
            uci:commit("loginpwd")
            return true
        end
    end

    return false
end

return M
