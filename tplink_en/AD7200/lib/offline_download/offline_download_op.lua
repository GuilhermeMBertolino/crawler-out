#!/usr/bin/env lua
local off_dlm   = require "luci.model.offline_download_monitor"

local offline_download_op = {
    api = {
		startmonitor = off_dlm.start_monitor,
		stopapps     = off_dlm.stop_apps,
		update       = off_dlm.update_status,
		startamule   = off_dlm.amule_enable,
		stopamule    = off_dlm.amule_disable
    }
}

local func = offline_download_op.api[arg[1]]

if func then
    func(arg)
end