module("luci.model.locker", package.seeall)

local util = require "luci.util"
local nixio = require "nixio"

Locker = util.class()

function Locker:__init__(filename)
    self.file = nixio.open(filename, "w", 600)
end

function Locker:close()
    if self.file then
        self.file:close()
        self.file = nil
    end
end

function Locker:lock(nonblock)
    return self.file:lock(nonblock and "tlock" or "lock")
end

function Locker:tlock()
    return self:lock(true)
end

function Locker:test()
    return self.file:lock("test")
end

function Locker:ulock()
    return self.file:lock("ulock")
end

RWLocker = util.class(Locker)

-- TODO: use fctnl instead of flock.

function RWLocker:lock(write, nonblock)
    return self.file:flock(write and "ex" or "sh", nonblock)
end

function RWLocker:tlock(write)
    return self:lock(write, true)
end

function RWLocker:rlock(nonblock)
    return self:lock(false, nonblock)
end

function RWLocker:wlock(nonblock)
    return self:lock(true, nonblock)
end

function RWLocker:test(write)
    error("Not implemented yet")
end

function RWLocker:ulock()
    return self.file:flock("un")
end
