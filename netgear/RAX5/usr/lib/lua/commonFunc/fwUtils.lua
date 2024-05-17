local log = require "luci.log"
local exec  = require "luci.util".exec
local uci = require "luci.model.uci".cursor()
local installEvents = require "commonFunc.installEvents"

function sleep(s)
  local socket=require'socket'
  local ntime = socket.gettime() + s/10
  repeat until socket.gettime() > ntime
end

function file_exists(path)
   local f=io.open(path,"r")
   if f~=nil then 
      io.close(f) 
      return true 
   else 
      return false 
   end
end

function readContent(file)
    local f = assert(io.open(file, "rb"))
    local content = f:read("*all")
    f:close()
    return content
end

function getFwCheckStart(onWizard)
    local cmd_str = nil
    if(onWizard == 1) then
        cmd_str= "/sbin/pufwUpgrade -i"
    else
        cmd_str= "/sbin/pufwUpgrade -g"
    end
    
    local status = os.execute(cmd_str)
    return status;
end

function getFwDownloadStart()
    
    cmd_str= "/sbin/pufwUpgrade -D"
    local status = os.execute(cmd_str)
    return status;
end

function getFwUpgradeStart()

    local default  = require "webGetFunc.commonCfg".getDefaultState()
    if default == "1" then
        exec("puDataStr set wizardCheck FwUpgradeInProgress true")
    end
    sleep(3)
    cmd_str= "/sbin/pufwUpgrade -W"
    local status = os.execute(cmd_str)
    return status;
end

local M ={} 

function M.getFwCheckResult(onWizard)

    if getFwCheckStart(onWizard) == 0 then
        if(onWizard == 1) then
            installEvents.send("new fw detect", "Checking new firmware")
        end
        outputParameters = {"FwUpgradeStatus", "lastDL_url", "lastDL_url", "Img_file",
                            "Img_md5", "Img_url", "Img_size", "isForceUpdate", "FwCheckStatus",
                            "newFWVersion", "updateRequired", "isNewLanguage", "ServerLanguageVer", "lastChecked"}
        local ret = nil
        --local cmdStr = ""
        local output = {}
        local uci_fw= require "luci.model.uci".cursor("/etc/pconfig", nil)
        for _, k in ipairs(outputParameters) do

            --cmdStr = "puDataStr get fwLastChecked "..k
            --ret = exec(cmdStr)
            ret = uci_fw:get("puData","fwLastChecked",k)

            if type(ret) == "string" and string.len(ret) > 0 then
                log.force(k..":"..ret)
                output[k] = ret
            else
                output["updateRequired"] = "0"
                output["isNewLanguage"] = "0"
                exec("puDataStr set installEvent installFwUpgrade 1")    -- Add for JIRA RAX5-137
                return output
            end 
        end

        local note_path = "/tmp/fw/dl_fw_msg"
        if file_exists(note_path) then
            local htmlStr = readContent(note_path):gsub("[\n]","<br />")
            output["note"] = htmlStr
        else
            output["note"] = " "
        end

        return output
    end

    --[[

        FwUpgradeStatus '0'
        lastDL_url 'http://111.2.1.68/rax5'
        lastDL_sku 'ww'
        Img_file 'RAX5-V1.0.0.10_1.img'
        Img_md5 '88f88abee4af4c0145925f7eaee82e53'
        Img_url 'http://111.2.1.68/rax5'
        Img_size '15861760'
        isForceUpdate '0'
        FwCheckStatus '2'
        newFWVersion 'V1.0.0.10_1'
        updateRequired '1'
        isNewLanguage '0'
        ServerLanguageVer '1.0.0.15'
        lastChecked '1647845681'
    ]]
end



function M.getFwDownloadResult()
    local blank_state = uci:get("netgear","system","blank_state")
    if (blank_state == "1") then
        installEvents.send("fw download start")
    end

    local output = {}
    if getFwDownloadStart() == 0 then
        local ret = nil
        local uci_fw= require "luci.model.uci".cursor("/etc/pconfig", nil)
        ret = uci_fw:get("puData","fwLastChecked","FwUpgradeStatus")
        if type(ret) == "string" and string.len(ret) > 0 then
            output["FwUpgradeStatus"] = ret
        else
            output["FwUpgradeStatus"] = ""
        end
    else
        output["FwUpgradeStatus"] = "Fail"
    end

    if (blank_state == "1" ) then
        -- DowloadDone
        if(output["FwUpgradeStatus"] == "4") then
            installEvents.send("fw download success")
        else
            installEvents.send("fw download failed")
        end
    end
    
    return output
end


function M.getFwUpgradeResult()
    local blank_state = uci:get("netgear","system","blank_state")
    if (blank_state == "1") then
        -- trigger and start would be at the same point
        installEvents.send("fw update trigger")
        installEvents.send("fw start updating")
    end

    local output = {}
    if getFwUpgradeStart() == 0 then
        local ret = nil
        local uci_fw= require "luci.model.uci".cursor("/etc/pconfig", nil)
        ret = uci_fw:get("puData","fwLastChecked","FwUpgradeStatus")
        if type(ret) == "string" and string.len(ret) > 0 then
            output["FwUpgradeStatus"] = ret
        else
            output["FwUpgradeStatus"] = ""
        end
    else
        output["FwUpgradeStatus"] = "Fail"
    end

    if (blank_state == "1" ) then
        -- UpgradeDone
        if(output["FwUpgradeStatus"] == "5") then
            installEvents.send("fw updating success")
            exec("puDataStr set installEvent installFwUpgrade 1")    -- Add for JIRA RAX5-137
        else
            installEvents.send("fw updating failed")
        end
    end

    return output
end

function M.getFwUpgradeCancel()

    local cmd_str = "kill `pidof pufwUpgrade`"
    local status = os.execute(cmd_str)
    return status;
end

function M.is_newFW_available()

    local req = "0"
    local uci_fw = require "luci.model.uci".cursor("/etc/pconfig", nil)

    if uci_fw then
        req = uci_fw:get("puData","fwLastChecked","updateRequired")
    end

    return req
end

return M
