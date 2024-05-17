--[[
    There is no 'cgilua.lua', so if it uses 'reuqire "cgilua"', it's mean get global variables of cgilua.
    If the interpreter is not 'cgilua', don't use 'require "cgilua"'
]]
local cgilua = require"cgilua"
local log = require "luci.log"
local exec = require "luci.util".exec
local clock = os.clock

local FW_CHECK_FILE = "fwLastChecked"
local RA_FW_CHECK = "fwCheck"
local FW_UPDATE_FILE = "fwLastUpdate"

function sleep(n)

    local t0 = clock()
    while clock() - t0 <= n do end
end


function SetPuDataValue(section, option, val)

    local cmd = "/usr/sbin/puDataStr set "..section.." "..option.." "..val
    exec(cmd)
end

local M = {}

--[[
    getTmpNameByformDataName(): For getting a specific temporary file name it is defined in 'formDataNameToTmpNameMap' table.
      formDataNameToTmpNameMap: This is a mapping table between name of form data and specific temporary file name, it's defined in 'cgilua/config.lua'.
                  formDataName: It a name of form data from 'POST' request, it is recorded by 'post.lua'.
  ]]
function M.getTmpNameByformDataName(inputDataName)
   if type(inputDataName) == "string" then
      return cgilua.getPegaTable("formDataNameToTmpNameMap")[inputDataName]
   else
    return cgilua.getPegaTable("formDataNameToTmpNameMap")[cgilua.getPegaTable("formDataName")]
   end
end

function M.validate_image()

    local formDataName = cgilua.getPegaTable("formDataName")
    local image_tmp   = cgilua.getPegaTable("tmpPath") .."/".. cgilua.getPegaTable("formDataNameToTmpNameMap")[formDataName]
    --log.console("formDataName:"..formDataName..", image_tmp:"..image_tmp)
    if(os.execute("/sbin/sysupgrade -T %q >/dev/null" % image_tmp) == 0) then
        return true
    else
        os.remove(image_tmp)
        return false
    end

end

function M.check_image_version()
    local uci_st = require "luci.model.uci".cursor(nil, "/var/state")
    curVer = uci_st:get("netgear", "fw", "cur_ver")
    newVer = uci_st:get("netgear", "fw", "new_ver")

    if type(curVer) == "string" and type(newVer) == "string" then
        --log.console("\nCurrent Version: "..curVer.."\n Upload Version: "..newVer)
        local subCurVer =  string.match(curVer, "(.+)_.+")
        local subNewVer =  string.match(newVer, "(.+)_.+")
        --log.console("\n subCurVer: "..subCurVer.."\n subNewVer: "..subNewVer)
        local splitCount = 0
        local curSplit = {}
        local newSplit = {}
        for v in string.gmatch(subCurVer, "(%d+)") do
            splitCount = splitCount + 1
            curSplit[splitCount] = v
        end
        splitCount = 0
        for v in string.gmatch(subNewVer, "(%d+)") do
            splitCount = splitCount + 1
            newSplit[splitCount] = v
        end

        for i = 1, splitCount do
            if tonumber(newSplit[i]) > tonumber(curSplit[i]) then
                return 1
            elseif tonumber(newSplit[i]) < tonumber(curSplit[i]) then
                return 2, curVer,  newVer
            end
        end
        --todo, add Router Spec: fwupgrade LED
        return 2, curVer,  newVer
    else
        return false
    end
end

function SetFWUpgradeTime()

    local upgradeTime = os.time()

    -- Update last update time
    SetPuDataValue(FW_UPDATE_FILE, "timestamp", upgradeTime);
end

function ra_event()

    local ntgr_pid = exec("pidof ntgr_ra_iot")
    local killCmd = "kill -SIGUSR1 "..ntgr_pid

    exec(killCmd)
end

function M.upgrade_image(tmpFile)

    SetPuDataValue(RA_FW_CHECK, "fwUpgradeTriggered", "Triggerd")
    SetFWUpgradeTime()
    ra_event()
    exec("/usr/bin/ra_cli -r 6")
    -- Sleep 8 secs to wait RA event sent out
    sleep(8)

    local fork_exec = require"commonFunc.fork".fork_exec
    local image_tmp = tmpFile or (cgilua.getPegaTable("tmpPath").."/"..cgilua.getPegaTable("getTmpNameFunc")())
    fork_exec("killall -URG led_control; sleep 2; killall dropbear lighttpd; sleep 1; /sbin/sysupgrade %q" %image_tmp)
    return "success"
end

return M
