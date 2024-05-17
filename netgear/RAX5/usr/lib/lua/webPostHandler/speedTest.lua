-- Licensed to the public under the Apache License 2.0.
local M = {}
local uci    = require "luci.model.uci".cursor()
local sys  = require "luci.sys"
local util = require "luci.util"
local log = require "luci.log"
local qos = require "webGetFunc.qos" 
local ookla_file = "/tmp/ookla.txt"

log.debug(0)

function turnoff_limit(off)
    local enabled = qos.getQosState()
    local method = qos.getQoS_SpeedTestMethod()
    local up = 0
    local down = 0
    local cmd = ""

    if enabled == "false" then
        return
    end

    if off == 1 then
        sys.exec("switch ingress-rate off 0")
        sys.exec("switch egress-rate off 0")
    else
        if method == "manually" then
            up = tonumber(qos.manual_upSpeed())
            down = tonumber(qos.manual_downSpeed())
        else
            up = tonumber(qos.upSpeed())
            down = tonumber(qos.downSpeed())
        end
        cmd = "switch ingress-rate on 0 "..down
        if down ~= 0 then
            log.console("cmd "..cmd)
            sys.exec(cmd)
        end
        cmd = "switch egress-rate on 0 "..up
        if up ~= 0 then
            log.console("cmd "..cmd)
            sys.exec(cmd)
        end
    end
    
end

function start_speedtest()
    local cmd = "ookla --configurl=http://www.speedtest.net/api/embed/netgear/config -t 1 -m 50".." > "..ookla_file
    turnoff_limit(1)
    log.console("Run "..cmd)
    sys.exec(cmd)
    turnoff_limit(0)
end

function get_ookla_result()
    local line = ""
    local up = 0
    local down = 0
    local file = io.open(ookla_file, "r")

    if (file ~= nil) then
        while true do
            line = file:read()
            if (line == nil) then
                break
            end
            if string.find(line, "result") then
                for match in line:gmatch("(.-)"..",") do
                    if string.find(match, "download") then
                        local v = util.split(match, ":")
                        -- bytes/sec to Kbits/sec
                        if v[3] ~= nil then
                            local tmp_v = tonumber(v[3])
                            if tmp_v ~= nil then
                                down = string.format("%.f", tmp_v/1000*8)
                            end
                        end
                    elseif string.find(match, "upload") then
                        local v = util.split(match, ":")
                        -- bytes/sec to Kbits/sec
                        if v[3] ~= nil then
                            local tmp_v = tonumber(v[3])
                            if tmp_v ~= nil then
                                up = string.format("%.f", tmp_v/1000*8)
                            end
                        end
                    end
                end
            end
        end
        file:close()
    end
    return down,up
end

function M.speedTest_handler(json)
    local up = 0
    local down = 0
    --log.console_r(json)
    -- run speedtest
    start_speedtest()
    down,up = get_ookla_result()
    log.console(" down value "..down.." up value ".. up)
    uci:set("qos", "wan", "download", down)
    uci:set("qos", "wan", "upload", up)
    --commit & apply the settings
	uci:commit("qos")

	return {status="success", message="Finish SpeedTest Setup"}
end

return M