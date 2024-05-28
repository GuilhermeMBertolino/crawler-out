module("sync-script", package.seeall)

local util = require "luci.util"
local json = require "luci.json"
local ltn12 = require "luci.ltn12"
local nixio = require "nixio"
local dbg = require "luci.tools.debug"

local onemeshctl = require "luci.controller.admin.onemesh"

infile = "/dev/null"
outfile = "/dev/null"

function read_infile(file)
    file = file or infile
    local decoder = json.Decoder()
    local rc, err = ltn12.pump.all(ltn12.source.file(io.open(file, "rb")),
                                   decoder:sink())
    assert(rc, err)

    return decoder:get()
end

function check_tmp_data(data, msg)
    if not data then
        return nil, msg
    end

    data = json.decode(data)
    if data.error_code ~= 0 then
        return nil, data.msg
    end

    return data
end

function finalize(data)
    local encoder = json.Encoder(data)
    local rc, err = ltn12.pump.all(encoder:source(),
                                   ltn12.sink.file(io.open(outfile, "wb")))
    if not rc then
        dbg("ltn12 error:", err)
        os.exit(1)
    end

    os.exit(0)
end

function die(lastwords)
    local data = {
        success = -1,
        errmsg = lastwords
    }
    return finalize(data)
end

function run(main)
    local tb = nil
    local rc, msg = xpcall(main, function(e)
                               tb = debug.traceback()
                               return e
    end)
    if not rc then
        dbg("Error: Lua exception: " .. msg)
        dbg(tb)
        os.exit(1)
    end
end

function reduce(cb, args, b, e)
    b = b or 1
    e = e or #args

    local success = 0
    local result = {}
    local err = {}

    for i = b, e do
        local arg = args[i]
        local rc, data = cb(arg)
        if rc then
            success = success + 1
            result[#result+1] = data
        else
            err[#err+1] = data
        end
    end

    local total = e - b + 1
    local errmsg = nil
    if #err > 0 then
        errmsg = table.concat(err, ";")
    end

    if #result == 0 then
        result = nil
    elseif #result == 1 then
        result = result[1]
    end

    return {success = success, total = total, errmsg = errmsg, data = result}
end

function reduce_sequence(cb, args, b, e)
    return reduce(
        function(ip)
            local tmpcli = tmpv2.tmp_client(ip, nil, true, false, nil, nil)
            local rc, data = tmpcli:connect()
            if not rc then
                tmpcli:close()
                return nil, data
            end

            local rc, data = cb(tmpcli, ip)

            tmpcli:disconnect()
            tmpcli:close()
            return rc, data
        end,
        args, b, e)
end

function workers_run(cb, ip, mac, isbind, usr, pwd, input, output)
    -- local user_auth = false;
    -- if isbind == "0" then 
    --     if not usr or not pwd then
    --         output:write(json.encode{rc = false, data = "invaild username or password"})
    --         input:close()
    --         output:close()
    --         os.exit(0)
    --     end
    --     user_auth = true; 
    -- end

    local user_auth = true;   

    local tmpcli = tmpv2.tmp_client(ip, nil, true, user_auth, usr, pwd)
    local rc, data = tmpcli:connect()

    --if nil ~= data then
    --    dbg.print("[TPIPF] data " .. data)
    --end

    if not rc then
        output:write(json.encode{rc = false, data = data})

        tmpcli:close()
        input:close()
        output:close()
        os.exit(0)
    end

    local rc, data = cb(tmpcli, ip, mac, input, output)
    output:write(json.encode{rc = rc, data = data})

    tmpcli:disconnect()
    tmpcli:close()
    input:close()
    output:close()
    os.exit(0)
end

function workers_create(cb, usr, pwd, args, b, e)
    local workers = {}
    
    for i = b, e, 2 do
        -- local worker = {ip = args[i], isbind = args[i+1]}
        local worker = {ip = args[i], mac = args[i+1]}
        local slaveKey = onemeshctl.master_get_slave_key(worker.mac)
        usr = slaveKey.tmp_username
        pwd = slaveKey.tmp_password
        --dbg.print("[TPIPF] slaveKey.mac " .. worker.mac)
        --dbg.print("[TPIPF] slaveKey.usr " .. usr)
        --dbg.print("[TPIPF] slaveKey.pwd " .. pwd)

        if usr and pwd then 
            workers[#workers+1] = worker

            local rfdi, rfdo = nixio.pipe()
            local wfdi, wfdo = nixio.pipe()

            local pid = nixio.fork()
            if pid == 0 then
                rfdi:close()
                wfdo:close()
                -- workers_run(cb, worker.ip, worker.mac, worker.isbind, usr, pwd, wfdi, rfdo)
                workers_run(cb, worker.ip, worker.mac, 1, usr, pwd, wfdi, rfdo)
                os.exit(1)
            elseif pid > 0 then
                rfdo:close()
                wfdi:close()

                worker.pid = pid
                worker.input = rfdi
                worker.output = wfdo
                worker.decoder = json.ActiveDecoder(function()
                        local chunk = worker.input:read(2048)
                        if chunk and #chunk > 0 then
                            return chunk
                        end
                end)
            else
                worker.error = "failed to fork"
            end
        end
    end

    return workers
end

function workers_join(workers)
    for _, worker in ipairs(workers) do
        if not worker.error then
            local rc, result = pcall(worker.decoder.get, worker.decoder)
            if rc then
                if result.rc then
                    worker.data = result.data
                else
                    worker.error = result.data or "unknown error"
                end
            else
                worker.error = result or "unknown error"
            end
        end
    end
end

function workers_cleanup(workers)
    for _, worker in ipairs(workers) do
        if worker.input then
            worker.input:close()
        end
        if worker.output then
            worker.output:close()
        end
        worker.decoder = nil

        if not worker.error then
            local pid, stat, code = nixio.waitpid(worker.pid)
            if pid ~= worker.pid or stat ~= "exited" or code ~= 0 then
                worker.error = "process failure"
            end
        end
    end
end

function workers_reduce(workers)
    return reduce(
        function(worker)
            if worker.error then
                dbg("worker error:", worker.ip, worker.error)
                return nil, worker.error
            else
                return true, worker.data
            end
        end, workers)
end

function reduce_concurrent(cb, usr, pwd, args, b, e)
    local workers = workers_create(cb, usr, pwd, args, b, e)
    workers_join(workers)
    workers_cleanup(workers)
    return workers_reduce(workers)
end

function iterate_request(cb, usr, pwd, args, b, e)
    local workers = {}
    for i = b, e, 2 do
        local ip = args[i]
        local isbind = args[i+1]
        local user_auth = false;
        if isbind == "0" then
            user_auth = true;
        end
        local tmpcli = tmpv2.tmp_client(ip, nil, true, user_auth, usr, pwd)
        local rc, data = tmpcli:connect()
        local worker = {}
        if not rc then
            worker.error = data or "unknown error"
        else
            rc, data = cb(tmpcli, ip, input, output)
            if not rc then
                worker.error = data or "unknown error"
            else
                worker.data = data
            end
            tmpcli:disconnect()
        end
        tmpcli:close()
        workers[#workers+1] = worker
    end
    return workers_reduce(workers)
end
