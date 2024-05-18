local uci = require "luci.model.uci"
local sys = require "luci.sys"
local fs  = require "luci.fs"
local uci_r = uci.cursor()

function run(data)
    local tbl = {}
    local dbg = require "luci.tools.debug"
    
    -- receive data parsing
    local error_code = data.error_code
    local tcspStatus
    local fwDlPage
    local tcspInfo
    local illegalType
    local stopConnect
    local reconnectTime
    local result = data.result
    if result ~= nil then
        tcspStatus = result.tcspStatus
        fwDlPage = result.fwDlPage
        tcspInfo = result.tcspInfo
        illegalType = result.illegalType
        stopConnect = result.stopConnect
        reconnectTime = result.reconnectTime
    end
    
    -- check error code first
    if error_code ~= 0 then
        dbg.print("error code:" .. error_code)
        -- Todo: add error_code process here
        
        return tbl
    end

    -- receive data verify
    if stopConnect ~= nil then
        if stopConnect > 0 then
           if reconnectTime == nil then
               dbg.print("When stopConnect > 0, reconnectTime must exist.")
               return tbl
           end
           if tcspStatus ~= nil or fwDlPage ~= nil or tcspInfo ~= nil or illegalType ~= nil then
               dbg.print("When stopConnect > 0, tcspStatus, fwDlPage, tcspInfo, illegalType should not exist.")
               return tbl
           end
        end
    else
        if illegalType ~= nil then
            if illegalType > 0 then
                if tcspStatus ~= nil or fwDlPage ~= nil or tcspInfo ~= nil then
                    dbg.print("When illegalType > 0, tcspStatus, fwDlPage, tcspInfo should not exist.")
                    return tbl
                end
            end
        else
            if tcspStatus ~= nil and tcspStatus == 2 then
                if fwDlPage == nil or tcspInfo == nil then
                    dbg.print("When tcspStatus is 2, fwDlPage and tcspInfo must exist.")
                    return tbl
                end
            end
        end
    end    

    -- receive data process
    if tcspStatus ~= nil then
        uci_r:set("cloud_config", "info", "tcsp_status", tostring(tcspStatus))
        if tcspStatus == 2 then
            dbg.print("tcsp version is too old, dut doesn't support upgrade via cloud.")
        elseif tcspStatus == 3 then
            dbg.print("tcsp version is old, but dut can upgrade via cloud.")
            sys.fork_exec("cloud_getFwList") --get new firmware info from cloud. 
        end
    end

    if fwDlPage ~= nil then
        dbg.print("fwDlPage:"..fwDlPage)
    end

    if tcspInfo ~= nil then
        dbg.print("tcspInfo:"..tcspInfo)
    end

    local CLOUD_TMP_DIR = "/tmp/cloud"
    if not fs.isdirectory(CLOUD_TMP_DIR) then
        fs.mkdir(CLOUD_TMP_DIR, true)
    end

    local CLOUD_ILLEGAL = CLOUD_TMP_DIR .. "/illegal"

    if illegalType ~= nil then
        if illegalType > 0 then
            --uci_r:set("cloud_config", "device_legality", "illegal", "1")
            --uci_r:set("cloud_config", "device_legality", "illegal_type", tostring(illegalType))
            local fp = io.open(CLOUD_ILLEGAL,"w")
            if fp then
                fp:write(tostring(illegalType))
                fp:close()
            end
        elseif illegalType == 0 then
            --uci_r:set("cloud_config", "device_legality", "illegal", "0")
            fs.unlink(CLOUD_ILLEGAL)
            local exec = "sleep 3; cloud_unbind;"

            --if need check for upgrade when factory init
            local need_checkupgrade = uci_r:get("cloud_config", "device_status", "need_checkupgrade")
            if tonumber(need_checkupgrade) == 1 then
                uci_r:set("cloud_config", "device_status", "need_checkupgrade", "0")
                exec = exec .. "sleep 5; cloud_getFwList;"
            end
			
            sys.fork_exec(exec)
        end
        if illegalType == 1 then
            dbg.print("Device ID doesn't exist.")
        elseif illegalType == 2 then
            dbg.print("Device ID, mac and hwId doesn't match.")
        elseif illegalType == 3 then
            dbg.print("Get device basic information failed.")
        elseif illegalType == 4 then
            dbg.print("Device with ths same ID is already online.")
        elseif illegalType >= 5 then
            dbg.print("Unsupported illegal type:"..illegalType)
        end
    elseif stopConnect == nil then
        -- reply does not contain illegalType, but this is a legal device.
        --uci_r:set("cloud_config", "device_legality", "illegal", "0")
        fs.unlink(CLOUD_ILLEGAL)
    end
    
    -- It is cloud sdk's responsibility to process stopConnect & reconnectTime
--[[
    if stopConnect ~= nil then
        dbg.print("stopConnect:"..stopConnect)
    end

    if reconnectTime ~= nil then
        dbg.print("reconnectTime:"..reconnectTime)
        -- Todo: Cloud-client process this param itself.
    end
]]--
    uci_r:commit("cloud_config")
    return tbl
end

