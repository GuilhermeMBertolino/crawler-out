local json = require "luci.json"
local dbg = require "luci.tools.debug"

local err_msg = "{\"error_code\":-20103,\"msg\":\"no response method\"}"

local method_name = ""

local function get_response(filename, data)
    if not filename or type(filename) ~= "string" then
        dbg("Connot find register record for method \"" .. method_name .. "\"")
        return err_msg
    end
    
    local err, msg = pcall(require, filename)
    if not err then
        dbg("Load file \"" .. filename .. "\" failed")
        dbg(msg)
        return err_msg
    end
    
    if not run or type(run) ~= "function" then
        dbg("Connot find function \"run()\" in file \"" .. filename .. "\"")
        return err_msg
    end
    
    local status, response = pcall(run, data)
    if not status then
        dbg("Something wrong happened in \"" .. filename .. ":run()\"")
        dbg(response)
        return err_msg
    end
    if type(response) ~= "table" then
        dbg("the return value of \"" .. filename .. ":run()\" isn't a table")
        return err_msg
    end
    
    return json.encode(response)
end

function dispatcher(fn, data)
    local err = require "cloud.cloud_cfg"
    if not err then
        dbg("Connot find \"/cloud/cloud_cfg.lua\"")
        return err_msg
    end
    --tlcc_respond_cloud
    if fn == 0 then
        local request_tbl = json.decode(data)
        if not request_tbl or not request_tbl.method then
            dbg("Connot parse request from server:\n" .. data)
            return err_msg
        end
        
        method_name = request_tbl.method
        return get_response(response_tbl[request_tbl.method], request_tbl)
    --tlcc_build_request_of_hello_cloud
    elseif fn == 1 then
        method_name = "build_request_of_hello_cloud"
        return get_response(hello_tbl["request"])
    --tlcc_recv_response_of_hello_cloud
    elseif fn == 2 then
        local response_tbl = json.decode(data)
        if not response_tbl then
            dbg("Connot parse request from server:\n" .. data)
            return err_msg
        end
        
        method_name = "recv_response_of_hello_cloud"
        return get_response(hello_tbl["response"], response_tbl)
    else
        dbg("Connot dispatch the function number: " .. fn)
        return err_msg
    end
end
