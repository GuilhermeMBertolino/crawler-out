local log = require "luci.log"
local soapParser = require "soap.soapParser"
local soapResponse = require "soap.soapResponse"
local validator = require "commonFunc.validator"
local fork = require "commonFunc.fork"
local util = require "luci.util"
--local sys  = require "luci.sys"
local qos = require "webGetFunc.qos"
local uci    = require "luci.model.uci".cursor()
local ookla_file = "/tmp/ookla.txt"
local ookla_processing_flag="/tmp/ookla_processing.dat"
local ookla_complete_flag="/tmp/ookla_complete.dat"

local M = {}

log.debug(0)

M.service = "AdvancedQoS"

function control_validator(parm, value)
    local ret = false;

    if parm == "NewSettingMethod" and value ~= nil then
        if value == "1" or value == "2" then
            ret = true;
        end
    elseif parm == "NewDownlinkBandwidth" or parm == "NewUplinkBandwidth" and value ~= nil then
        if string.len(value) <= 8 and tonumber(value) ~= nil then
            ret = true
        end
    end

    return ret;
end

local ookla_maps =
{
    Action = { data_type = "soap_boolean_int",  handler = nil }
};

local control_maps =
{
    NewUplinkBandwidth = { data_type = "",  handler = control_validator },
    NewDownlinkBandwidth = { data_type = "",  handler = control_validator },
    NewSettingMethod = { data_type = "",  handler = control_validator }
};

local qos_maps =
{
    NewQoSEnable = { data_type = "soap_boolean_int",  handler = nil }
};

function file_exists(name)
    local f=io.open(name,"r")
    if f~=nil then io.close(f) return true else return false end
end

function get_ookla_result(is_complete)
    local line = ""
    local up = 0
    local down = 0
    local ping_avg = 0
    local file = io.open(ookla_file, "r")

    if (file ~= nil) then
        while true do
            line = file:read()
            if (line == nil) then
                break
            end
            if is_complete == 1 and string.find(line, "result") then
                --log.console("[ line ] "..line)
                for match in line:gmatch("(.-)"..",") do
                    if string.find(match, "download") then
                        local v = util.split(match, ":")
                        if v[3] ~= nil and tonumber(v[3]) ~= nil then
                            -- bytes/sec to Mbits/sec
                            down = string.format("%.2f", v[3]/1000/1000*8) 
                        end
                    elseif string.find(match, "upload") then
                        local v = util.split(match, ":")
                        if v[3] ~= nil and tonumber(v[3]) ~= nil then
                            -- bytes/sec to Mbits/sec
                            up = string.format("%.2f", v[3]/1000/1000*8)
                        end
                    elseif string.find(match, "latency") then
                        local v = util.split(match, ":")
                        if v[2] ~= nil and tonumber(v[2]) ~= nil then
                            local res = string.gsub(v[2], "}", "")
                            ping_avg = string.format("%.0f", res)
                        end
                    end
                end
            else -- ookla still running
                --log.console("[ line ] "..line)
                if string.find(line, "download") then
                    local v = util.split(line, ":")
                    if v[7] ~= nil then
                        local res = util.split(v[7], ",")
                        -- bytes/sec to Mbits/sec
                        if tonumber(res[1]) ~= nil then
                            down = string.format("%.2f", res[1]/1000/1000*8)
                        end
                    end
                elseif string.find(line, "upload") then
                    local v = util.split(line, ":")
                    if v[7] ~= nil then
                        local res = util.split(v[7], ",")
                        -- bytes/sec to Mbits/sec
                        if tonumber(res[1]) ~= nil then
                            up = string.format("%.2f", res[1]/1000/1000*8)
                        end
                    end
                elseif string.find(line, "latency") then
                    local v = util.split(line, ":")
                    if v[8] ~= nil then
                        local res = util.split(v[8], ",")
                        if tonumber(res[1]) ~= nil then
                            ping_avg = string.format("%.0f", res[1])
                        end
                    end
                end
            end
        end
        file:close()
    else
        log.console("ookla file was not created")
    end

    return down,up,ping_avg
end

function M.GetOOKLASpeedTestResult(dataXML)
    local outputParameters = {NewOOKLAUplinkBandwidth="", NewOOKLADownlinkBandwidth="", AveragePing=""}
    local up = 0
    local down = 0
    local ping_avg = 0
    local ret = "RESPONSE_NOERROR"
    
    if file_exists(ookla_complete_flag) == true then
        down,up,ping_avg = get_ookla_result(1)
        log.console(" complete down value "..down.." up value "..up.." ping avg "..ping_avg)
    elseif file_exists(ookla_processing_flag) == true then
        down,up,ping_avg = get_ookla_result(0)
        log.console(" processing down value "..down.." up value "..up.." ping avg "..ping_avg)
        ret = "RESPONSE_ERROR"
    else
        ret = "RESPONSE_MALLOC_ERROR"
    end

    outputParameters["NewOOKLAUplinkBandwidth"] = up
    outputParameters["NewOOKLADownlinkBandwidth"] = down
    outputParameters["AveragePing"] = ping_avg

    return soapResponse.buildResponseData(ret,outputParameters,"GetOOKLASpeedTestResult",M.service)
end

function M.SetOOKLASpeedTestStart(dataXML)
    local inputParameters = {Action=""}
    local outputParameters = {NewErrorCode=""}
    local cmd = ""

    -- get setting parameter from XML data
    for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXML,"SetOOKLASpeedTestStart",k)

        if tmpValue ~= nil then
            inputParameters[k] = tmpValue
        else
            log.console("Invalid parameter: "..k)
            return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{},"SetOOKLASpeedTestStart",M.service)
        end
    end

    -- do validator for setting parameters
    if (validator.soap_data_validate(inputParameters, ookla_maps) == false) then
        log.console("Validation of SOAP data paramter is failed")
        return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{},"SetOOKLASpeedTestStart",M.service)
    end

    os.remove(ookla_file)
    os.remove(ookla_processing_flag)
    os.remove(ookla_complete_flag)

    if inputParameters.Action == "0" then
        cmd = "/usr/sbin/soap_ntgr_speedtest.sh"
    else
        cmd = "killall ookla; sleep 1"
    end

    log.console("Run "..cmd)
    --sys.exec(cmd)
    fork.fork_exec(cmd)

    return soapResponse.buildResponseData("RESPONSE_NOERROR",{},"SetOOKLASpeedTestStart",M.service)
end

function M.SetBandwidthControlOptions(dataXML)
    local inputParameters = {NewUplinkBandwidth="", NewDownlinkBandwidth="", NewSettingMethod=""}

    -- get setting parameter from XML data
    for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXML,"SetBandwidthControlOptions",k)

        if tmpValue ~= nil then
            inputParameters[k] = tmpValue
        else
            log.console("Invalid parameter: "..k)
            return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{},"SetBandwidthControlOptions",M.service)
        end
    end

    -- do validator for setting parameters
    if (validator.soap_data_validate(inputParameters, control_maps) == false) then
        log.console("Validation of SOAP data paramter is failed")
        return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{},"SetBandwidthControlOptions",M.service)
    end

    -- 1:Manual, 2:Ookla
    if inputParameters.NewSettingMethod == "1" then
        uci:set("qos", "wan", "method", "manually")
        -- reset speedtest rate
        uci:set("qos", "wan", "download", "0")
        uci:set("qos", "wan", "upload", "0")
        -- convert to Kbit
        uci:set("qos", "wan", "manual_download", (inputParameters.NewDownlinkBandwidth*1000))
        uci:set("qos", "wan", "manual_upload", (inputParameters.NewUplinkBandwidth*1000))
    else
        uci:set("qos", "wan", "method", "speedtest")
        -- reset manually rate
        uci:set("qos", "wan", "download", (inputParameters.NewDownlinkBandwidth*1000))
        uci:set("qos", "wan", "upload", (inputParameters.NewUplinkBandwidth*1000))
        uci:set("qos", "wan", "manual_download", "0")
        uci:set("qos", "wan", "manual_upload", "0")
    end

    --commit & apply the settings
	uci:commit("qos")
    table.insert(changed_config, "qos")

    return soapResponse.buildResponseData("RESPONSE_NOERROR",{},"SetBandwidthControlOptions",M.service)
end

function M.GetBandwidthControlOptions(dataXML)
    local outputParameters = {NewSettingMethod="", NewUplinkBandwidth="", NewDownlinkBandwidth=""}
    local up = ""
    local tmp_up = ""
    local down = ""
    local tmp_down = ""

    if qos.getQoS_SpeedTestMethod() == "manually" then
        -- convert to Mbit
        tmp_down = qos.downSpeed()
        down = string.format("%.2f", tmp_down/1000)
        tmp_up = qos.upSpeed()
        up = string.format("%.2f", tmp_up/1000)
        outputParameters["NewSettingMethod"] = 1
        outputParameters["NewUplinkBandwidth"] = up
        outputParameters["NewDownlinkBandwidth"] = down
    else
        -- convert to Mbit
        tmp_down = qos.manual_downSpeed()
        down = string.format("%.2f", tmp_down/1000)
        tmp_up = qos.manual_upSpeed()
        up = string.format("%.2f", tmp_up/1000)
        outputParameters["NewSettingMethod"] = 2
        outputParameters["NewUplinkBandwidth"] = up
        outputParameters["NewDownlinkBandwidth"] = down
    end

    return soapResponse.buildResponseData("RESPONSE_NOERROR",outputParameters,"GetBandwidthControlOptions",M.service)
end

function M.SetQoSEnableStatus(dataXML)
    local inputParameters = {NewQoSEnable=""}

    -- get setting parameter from XML data
    for k,v in pairs(inputParameters) do
        local tmpValue = soapParser.getActionParameter(dataXML,"SetQoSEnableStatus",k)

        if tmpValue ~= nil then
            inputParameters[k] = tmpValue
        else
            log.console("Invalid parameter: "..k)
            return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{},"SetQoSEnableStatus",M.service)
        end
    end

    -- do validator for setting parameters
    if (validator.soap_data_validate(inputParameters, qos_maps) == false) then
        log.console("Validation of SOAP data paramter is failed")
        return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED",{},"SetQoSEnableStatus",M.service)
    end

    if inputParameters.NewQoSEnable == "1" then
        uci:set("qos", "wan", "enabled", "true")
    else
        uci:set("qos", "wan", "enabled", "false")
    end

    --commit & apply the settings
	uci:commit("qos")
    table.insert(changed_config, "qos")

    return soapResponse.buildResponseData("RESPONSE_NOERROR",{},"SetQoSEnableStatus",M.service)
end

return M