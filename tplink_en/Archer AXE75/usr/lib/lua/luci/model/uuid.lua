module("luci.model.uuid", package.seeall)

local util = require "luci.util"
local nixio = require "nixio"
local fs = require "nixio.fs"
local subprocess = require "luci.model.subprocess"

-- TODO: do this at boot time?
fs.mkdirr("/var/lib/libuuid")

-- TODO: use subprocess rather than util.exec
-- TODO: use c binding instead of calling external program?

function generate(arg)
    uuid = util.exec("uuidgen" .. " " .. arg)
    return uuid:trim()
end

function generate_random()
    return generate("-r")
end

function generate_time()
    return generate("-t")
end
