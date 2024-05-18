#! /usr/bin/env lua
--
-- smart_home_controller.lua
-- Copyright (C) 2019 tpuser <tpuser@liushuaiwei>
--
-- Distributed under terms of the MIT license.
--
local _M = {}

local function throw_error(msg, code)
    if type(msg) ~= "table" then
    return {
        msg = msg,
        error_code = code or 1
    }
    else
        return {
            result = msg,
            error_code = code or 1
        }
    end
end

function _M.dispatch(dispatch_tbl, form)
    local execute = false
    if not form or not form.method then
        return throw_error("invalid form")
    end
    if not dispatch_tbl or not dispatch_tbl[form.method] then
        return throw_error("missing dispatch_tbl")
    end
    local method = dispatch_tbl[form.method]
    local data = form.params
    if method.pre_hook then
        data = method.pre_hook(data)
        if type(data) == "number" then
            return {
                error_code = data
            }
        end
    end
    if method.ctl and method.oper and method.form then
        local form_ctl = {}
        if data then
        	form_ctl = data
        end
        form_ctl.form = method.form
        form_ctl.operation = method.oper
        --form_ctl.params = data
        if form.method ~= "query" then
            --if not form_ctl.params then
            --    form_ctl.params = {}
            --end
            --form_ctl.params.smart_home_cause = true
            form_ctl.smart_home_cause = true
        end

        data = method.ctl.dispatch(form_ctl)
        execute = true
    end
    if method.cb then
        if execute and data.result then
            data = data.result
        end
        local result, msg = method.cb(data)
        if type(result) == "number" or type(result) == "string" then
            return {
                error_code = tonumber(result),
                msg = msg
            }
        end
        result = type(result) == "table" and result or nil
        if result and result.error_code ~= nil then
            return result
        end
        return {
            error_code = 0,
            result = result
        }
    end
    if not execute then
        return throw_error("No such Callback")
    end
    return data
end


return _M
