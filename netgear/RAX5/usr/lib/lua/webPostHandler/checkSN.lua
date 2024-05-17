--Licensed to the public under the Apache License 2.0

local M = {}
local os = require "os"
local nixio = require "nixio"
local uci = require "luci.model.uci".cursor()
local sys = require "luci.sys"
local log = require "luci.log"
local validator = require "commonFunc.validator"

function M.checkSN_handler(json)
    log.debug(0)
    log.print_r(json)
    log.print("checkSN",json.serialNumber)
    local SN = io.popen("fw_printenv -c /etc/pdata.config | grep SN")
    local getSerialnum = ""
	
	if (validator.cgi_validator("serial_number", json.serialNumber) == false) then
        log.print("Failed to parse the input JSON data!!!");
        return {status="error", message=tostring(json) };
    end

    if SN then
        while true do
            local serialnum = SN:read("*l")
            log.console("serialnum = ",serialnum)
            if not serialnum then
                break
            elseif serialnum:match("^[SN=]") then
                getSerialnum = serialnum:match("SN=(%w+)")
                getSerialnum = getSerialnum:gsub("%s+"," ")

                if getSerialnum == json.serialNumber then
                    local flags = nixio.open_flags("creat","rdonly")
                    local fd = nixio.open("/tmp/check_sn",flags)
                    fd:close()
                else
                    log.console("serial number is not equal ")
                    return {status="failure", message="Finish check serial number fail"}
                end
            end 
        end
    SN:close()
    end
    return {status="success", message="Finish check serial number"}
end
return M

