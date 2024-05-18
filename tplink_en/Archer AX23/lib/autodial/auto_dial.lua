#!/usr/bin/env lua

local sys = require "luci.sys"
local nw  = require "luci.controller.admin.network" 
local uci = require "luci.model.uci"
local dbg = require "luci.tools.debug"
local uci_r = uci.cursor()
local autodetect_result_file = "/tmp/autodetect"
local autodial_rsapub_lock = "/var/run/autodial_rsapub.lck"
local autodial_rsapub_lock_fd


local function lock(w)
    autodial_rsapub_lock_fd = nixio.open(autodial_rsapub_lock, "w", 600)
    autodial_rsapub_lock_fd:flock(w and "ex" or "sh")
end

local function unlock()
    autodial_rsapub_lock_fd:close()
    autodial_rsapub_lock_fd = nil
end

local function set_dslite()
	local http_form = {}
	http_form.form = "wan_ipv4_dslite"
	http_form.operation = "write"
	http_form.dynamic_mode = "1"

	local res = nw.dispatch(http_form)
	if res.success then
		uci_r:set("network", "wan", "autodial_flag", "0")
		return true
	else
		return false
	end
end

local function set_v6plus()
	local http_form = {}
	http_form.form = "wan_ipv4_v6plus"
	http_form.operation = "write"
	http_form.conntype = "v6plus"
	
	local res = nw.dispatch(http_form)
	if res.success then
		uci_r:set("network", "wan", "autodial_flag", "0")
		return true
	else
		return false
	end
end

local function set_ocn()
	local http_form = {}
	http_form.form = "wan_ipv4_ocn"
	http_form.operation = "write"
	http_form.conntype = "ocn"
	
	local res = nw.dispatch(http_form)
	if res.success then
		uci_r:set("network", "wan", "autodial_flag", "0")
		return true
	else
		return false
	end
end

local function get_autodetect()
	local conntype
	local file
	local time
	luci.sys.fork_call("autodetect")
	file = io.open(autodetect_result_file, "r")
	if file then
		time = file:read()
		file:close()
		time = time and time:match("time (%d+)")
	end
	time = time or 10000
	dbg("time=" ..time)
	while conntype == nil or conntype:match("time (%d+)") and time > 0 do
		file = io.open(autodetect_result_file, "r")
		if file then
			conntype = file:read()
			dbg("conntype=" ..conntype)
			file:close()
		end
		sys.fork_call("sleep 1")
		time = time - 1000
	end
	return conntype
end

local function auto_dial()
	lock(true)
	local autodial_flag = uci_r:get("network", "wan", "autodial_flag")
	local conntype
	local ret = false

	if autodial_flag == "1" then
		conntype = get_autodetect()
		if conntype == "v6plus" then
			uci_r:set("wportal", "defcfg", "defcfg", "no")
			uci_r:commit("wportal")
			ret = set_v6plus()
			if ret == true then
				uci_r:set("network", "wan", "autodial_flag", "0")
				uci_r:commit("network")
				sys.fork_exec("/etc/rc.d/S99smp restart > /dev/null")
			end
			unlock()
			return ret
		elseif conntype == "dslite" then
			uci_r:set("wportal", "defcfg", "defcfg", "no")
			uci_r:commit("wportal")
			ret = set_dslite()
			if ret == true then
				uci_r:set("network", "wan", "autodial_flag", "0")
				uci_r:commit("network")
				sys.fork_exec("/etc/rc.d/S99smp restart > /dev/null")
			end
			unlock()
			return ret
		elseif conntype == "ocn" then
			uci_r:set("wportal", "defcfg", "defcfg", "no")
			uci_r:commit("wportal")
			ret = set_ocn()
			if ret == true then
				uci_r:set("network", "wan", "autodial_flag", "0")
				uci_r:commit("network")
			end
			unlock()
			return ret
		else
			luci.sys.fork_call("echo not dslite or v6plus, return > /dev/console")
		end
	end
	unlock()
	return false
end

local auto_dial = {
	api = {
		auto_dial = auto_dial
	}
}
local func = auto_dial.api[arg[1]]
local res = func(arg)
print(tostring(res))
