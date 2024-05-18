--[[
Copyright(c) 2008-2014 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  printsvr.lua
Details :  
Author  :  Zhu Xianfeng<zhuxianfeng@tp-link.net>
Version :  1.0.0
Date    :  02Apr14
History :  1.0.0, 02Apr14, Zhu Xianfeng, create the file 
]]--

local http  = require "luci.http"
local uci   = require "luci.model.uci"
local sys   = require "luci.sys"
local ctl = require "luci.model.controller"

local UCICFG = "usbshare"
local PRINTER = "printer"
local PS_START = "/etc/init.d/print_server start"
local PS_STOP = "/etc/init.d/print_server stop"

module("luci.controller.admin.printsvr", package.seeall)

-- Debug
-- @param N/A
-- @return N/A
function debug(str)
    -- debug_t.printf(str)
    -- sys.call("echo %s >/dev/console 2>&1" % (str))
end

-- Fetch all printer info
-- @param N/A
-- @return N/A
function printinfo()
    local uci_r = uci.cursor()
    local info = ""
    uci_r:foreach(PRINTER, "ptinfo",
        function(section)
            local values = uci_r:get_all(PRINTER, section[".name"])
            if values ~= nil then
                local manufacturer = values["manufacturer"] or ""
                local product = values["product"] or ""
                
                if manufacturer ~= "" or product ~= "" then
                    info = info .. values["manufacturer"] .. " " .. values["product"] .. "; "
                end
            end
        end
    )
    return info == "" and "None" or info
end

-- Fetch printer count
-- @param N/A
-- @return N/A
function printcnt()
    local uci_r = uci.cursor()
    local cnt = 0
    uci_r:foreach(PRINTER, "ptinfo",
        function(section)
            cnt = cnt + 1
        end
    )
    return cnt
end

-- Process usb webpage's HTTP request.
-- @param N/A
-- @return N/A
function printsvr(http_form)
    local uci_r = uci.cursor()
    local operation = http_form["operation"]
    local result = {success = false, errorcode = "Invalid operation", data = {}}

    debug(operation)

    if operation == "read" then
        result.data["enable"] = uci_r:get(UCICFG, "global", "printer")		
        result.data["name"] = printinfo()
        result.data["printer_count"] = printcnt()
        result.success = true
        result.errorcode = nil
    elseif operation == "write" then
        local enable = http_form["enable"]
        uci_r:set(UCICFG, "global", "printer", enable)
        uci_r:commit(UCICFG)

        sys.fork_exec(enable == "on" and PS_START or PS_STOP);

        result.data["enable"] = uci_r:get(UCICFG, "global", "printer")
        result.data["name"] = printinfo()
        result.data["printer_count"] = printcnt()
        result.success = true
        result.errorcode = nil
    else
        -- Invalid operation
        debug("Invalid")
    end

    -- http.prepare_content("application/json")
    -- http.write_json(result)
    return result
end

function dispatch(http_form)
    return printsvr(http_form)
end

function _index()
    return ctl._index(dispatch)
end

function index()
    entry({"admin", "print_server"}, call("_index")).leaf = true
end
