--[[
Copyright(c) 2008-2014 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  quick_setup.lua
Details :  Controller for quick setup webpage
Author  :  Ye Qianchuan <yeqianchuan@tp-link.net>
Version :  1.0.0
Date    :  11 Apr, 2014
]]--

module("luci.controller.admin.quick_setup", package.seeall)

local sys = require "luci.sys"
local util = require "luci.util"
local ctl = require "luci.model.controller"
local dbg = require "luci.tools.debug"
local locale = require "luci.controller.locale"
local uci    = require "luci.model.uci"

local uci_r    = uci.cursor()
local dslite_support = uci_r:get("profile", "profile_diff", "dslite_support") or "no"
local v6plus_support = uci_r:get("profile", "profile_diff", "v6plus_support") or "no"
local auto_update_support = uci_r:get_profile("firmware_upgrade", "auto_update_support") or "no"

function updateonly_and_prefix(t, updates, prefix, keys)
    prefix = prefix or ""
    if keys then
        for _, k in ipairs(keys) do
            t[prefix .. k] = updates[k]
        end
    else
        for k, v in pairs(updates) do
            t[prefix .. k] = v
        end
    end
end

function get_wire_type()
    local addr = sys.getenv("REMOTE_ADDR")
    local clist = require("luci.model.client_mgmt").get_client_list()
    for _, client in ipairs(clist) do
        if client.ip == addr then
            return client.wire_type == "wired" and "wired" or "wireless"
        end
    end
    return "wired"
end

local controller_prefix = "luci.controller.admin"
local ext_dispatch_tbl = {
    time = {
        controller = controller_prefix .. ".timesetting",
        target = "dispatch",
        forms = {
            {form = "settings", prefix = "time_"}
        }
    },
    network = {
        controller = controller_prefix .. ".network",
        target = "dispatch",
        limit_key = "network_conntype",
        forms = {
            {form = "wan_ipv4_status", prefix = "network_", limit = "status"},
            {form = "wan_ipv4_dynamic", prefix = "network_dhcp_", limit = "dhcp"},
            {form = "wan_ipv4_staticip", prefix = "network_static_", limit = "static"},
            {form = "wan_ipv4_pppoe", prefix = "network_pppoe_", limit = "pppoe"},
            {form = "wan_ipv4_l2tp", prefix = "network_l2tp_", limit = "l2tp"},
            {form = "wan_ipv4_pptp", prefix = "network_pptp_", limit = "pptp"},
            {form = "wan_ipv4_dslite", prefix = "network_dslite_", limit = "dslite"},
            {form = "wan_ipv4_v6plus", prefix = "network_v6plus_", limit = "v6plus"},
			{form = "wan_ipv4_ocn", prefix = "network_ocn_", limit = "ocn"},
            {form = "mac_clone_advanced", prefix = "network_dhcp_"},
            {form = "wan_ipv4_preisp", prefix = "network_preisp_"},
            {form = "wan_port_status", prefix = "network_port_"}
        }
    },
    wireless = {
        controller = controller_prefix .. ".wireless",
        target = "wireless_dispatch",
        forms = {
            {form = "wireless_2g", prefix = "wireless_2g_", gather = true},
            {form = "wireless_5g", prefix = "wireless_5g_", gather = true,
             limit_key = "wireless_5g_region_enable", limit = "on"},
            {form = "wireless_5g_2", prefix = "wireless_5g_2_",  gather = true},
            {form = "wireless_6g", prefix = "wireless_6g_",  gather = true},
            {form = "smart_connect", prefix = "smart_connect_"},
            {form = "region", prefix = "region_"}
        }
    },
    iptv = {
        controller = controller_prefix .. ".iptv",
        target = "dispatch",
        forms = {
            {form = "setting", prefix = "isp_special_"}
        }
    },
    modem = {
        controller = controller_prefix .. ".usbmodem",
        target = "dispatch",
        forms = {
            {form = "modemset", prefix = "usbmodem_"},
	    {form = "working_mode_set", prefix = "working_mode_"}
        }
    }
}

local auto_upgrade_tbl = {
    controller = controller_prefix .. ".firmware",
    target = "dispatch",
    forms = {
        {form = "auto_upgrade", prefix = "auto_upgrade_"}
    }		
}

local ext_dispatch_tbl_mobile = {
    time = {
        controller = controller_prefix .. ".timesetting",
        target = "dispatch",
        forms = {
            {form = "settings", prefix = "time_"}
        }
    },
    network = {
        controller = controller_prefix .. ".network",
        target = "dispatch",
        limit_key = "network_conntype",
        forms = {
            {form = "wan_ipv4_status", prefix = "network_", limit = "status"},
            {form = "wan_ipv4_dynamic", prefix = "network_dhcp_", limit = "dhcp"},
            {form = "wan_ipv4_staticip", prefix = "network_static_", limit = "static"},
            {form = "wan_ipv4_pppoe", prefix = "network_pppoe_", limit = "pppoe"},
            {form = "wan_ipv4_l2tp", prefix = "network_l2tp_", limit = "l2tp"},
            {form = "wan_ipv4_pptp", prefix = "network_pptp_", limit = "pptp"},
            {form = "wan_ipv4_preisp", prefix = "network_preisp_"},
            {form = "wan_port_status", prefix = "network_port_"}
        }
    },
    wireless = {
        controller = controller_prefix .. ".wireless",
        target = "wireless_dispatch",
        forms = {
            {form = "wireless_2g", prefix = "wireless_2g_", gather = true},
            {form = "wireless_5g", prefix = "wireless_5g_", gather = true,
             limit_key = "wireless_5g_region_enable", limit = "on"},
            {form = "wireless_5g_2", prefix = "wireless_5g_2_", gather = true},
            {form = "wireless_6g", prefix = "wireless_6g_", gather = true},
            {form = "smart_connect"},
            {form = "region", prefix = "region_"}
        }
    }
}

local ap_dispatch_tbl = {
    wireless = {
        controller = controller_prefix .. ".wireless",
        target = "wireless_dispatch",
        forms = {
            {form = "wireless_2g", prefix = "wireless_2g_", gather = true},
            {form = "wireless_5g", prefix = "wireless_5g_",  gather = true,
             limit_key = "wireless_5g_region_enable", limit = "on"},
            {form = "wireless_5g_2", prefix = "wireless_5g_2_",  gather = true},
            {form = "wireless_6g", prefix = "wireless_6g_",  gather = true},
            {form = "smart_connect", prefix = "smart_connect_"},
            {form = "region", prefix = "region_"}
        }
    },
}

function read(http_form)
    local data = {}
    -- Wire type
    data.wire_type = get_wire_type()

    local success = true

	if auto_update_support == "yes" then
		table.insert(ext_dispatch_tbl, auto_upgrade_tbl)
	end 

    for _, dsp in pairs(ext_dispatch_tbl) do
        local target = require(dsp.controller)[dsp.target]
        target = (type(target) == "function") and target
        if target then
            for _, v in pairs(dsp.forms) do
            	if v.limit == "dslite" and dslite_support ~= "yes" then
            		--do nothing
                elseif ( v.limit == "v6plus" or v.limit == "ocn" ) and v6plus_support ~= "yes" then
                    --do nothing
            	else
	                local form = {
	                    form = v.form,
	                    operation = "read"
	                }
	                local ret = target(form)
	                if ret.success then
	                    updateonly_and_prefix(data, ret.data, v.prefix)
	                else
	                    success = false
	                end
	            end
            end
        end
    end

    return success and data
end

function write(http_form)
    local data = {}
    local success = true
    local tbl
    if http_form.ismobile == 1 then
		tbl = ext_dispatch_tbl_mobile
	else
		tbl = ext_dispatch_tbl
	end
	if auto_update_support == "yes" then
		table.insert(tbl, auto_upgrade_tbl)
	end 
    local working_mode = http_form["working_mode_wan_3g4g_switch"] or "cable"	

    local uci_r = require "luci.model.uci".cursor()
    local support_please_select = uci_r:get_profile("region", "support_please_select") or "no"
    if support_please_select == "yes" then
        local sname = uci_r:get_first("system", "system", nil, nil)
        uci_r:set("system", sname, "quicksetup", "yes")
        uci_r:commit("system")
    end

    for _, dsp in pairs(tbl) do
        target = require(dsp.controller)[dsp.target]
        target = (type(target) == "function") and target
		if working_mode == "3g4g"  and  ( dsp.controller == controller_prefix .. ".network" or dsp.controller == controller_prefix .. ".iptv" )  then
			dbg.print("just continue")
		else
			if target then
				local tmp_form = {form = {}, operation = "write"}
				local gather = false
				for _, v in pairs(dsp.forms) do
					if v.limit == "dslite" and dslite_support ~= "yes" then
						--do nothing
					elseif ( v.limit == "v6plus" or v.limit == "ocn" ) and v6plus_support ~= "yes" then
						--do nothing
					elseif working_mode == "cable" and dsp.controller == controller_prefix .. ".usbmodem" and v.form == "modemset" then
						--do nothing                    
						dbg.print("cable mode skip usbmode")    
					else
						local limit_key = v.limit_key or dsp.limit_key

						-- liuqu, TODO
						if v.form == "wan_ipv4_preisp" then 
							limit_key = nil
						end
						if v.form == "wan_port_status" then 
							limit_key = nil
						end
						if not limit_key or v.limit == http_form[limit_key] then
							if v.gather ~= true then
								local form = {
									form = v.form,
									operation = "write"
								}
								local data_empty = true
								for oldk, value in pairs(http_form) do
									local k = oldk:match("^%s(.*)$" % v.prefix)
									if k then
										form[k] = value
										data_empty = false
									end
								end

								if data_empty == false or v.form == "wan_ipv4_v6plus" or v.form == "wan_ipv4_ocn" then
									local ret = target(form)
									if ret.success then
										updateonly_and_prefix(data, ret.data, v.prefix)
									else
										success = false
									end
								end
							else
								gather = true
								tmp_form.form[#tmp_form.form + 1] = v.form 
								for oldk, value in pairs(http_form) do
									local k = oldk:match("^%s(.*)$" % v.prefix)
									if k then
										tmp_form[oldk] = value
									end
								end                   
							end
						end
					end
				end

				if gather == true then
					local r = target(tmp_form)
					if r.success then
						for _, f in ipairs(tmp_form.form) do
							for _, v in pairs(dsp.forms) do
								if f == v.form then
									-- no need combile prefix
									updateonly_and_prefix(data, r.data)
								end
							end
						end
					else
						success = false
					end
				end
			end
		end
    end

    local bluetooth = uci_r:get("bluetooth", "B1", "enable") or "donot_support"
    if bluetooth == "on" then
        sys.fork_exec("/etc/rc.d/S49bluetooth stop")
    end
    return success and data
end

function read_ap(http_form)
    local data = {}
    -- Wire type
    data.wire_type = get_wire_type()

    local success = true

    for _, dsp in pairs(ap_dispatch_tbl) do
        local target = require(dsp.controller)[dsp.target]
        target = (type(target) == "function") and target
        if target then
            for _, v in pairs(dsp.forms) do
                local form = {
                    form = v.form,
                    operation = "read"
                }
                local ret = target(form)
                if ret.success then
                    updateonly_and_prefix(data, ret.data, v.prefix)
                else
                    success = false
                end
            end
        end
    end

    return success and data
end

function write_ap(http_form)
    local data = {}
    local success = true

    local uci_r = require "luci.model.uci".cursor()
    local support_please_select = uci_r:get_profile("region", "support_please_select") or "no"
    if support_please_select == "yes" then
        local sname = uci_r:get_first("system", "system", nil, nil)
        uci_r:set("system", sname, "quicksetup", "yes")
        uci_r:commit("system")
    end

    for _, dsp in pairs(ap_dispatch_tbl) do
        target = require(dsp.controller)[dsp.target]
        target = (type(target) == "function") and target
        if target then
            local tmp_form = {form = {}, operation = "write"}
            local gather = false
            for _, v in pairs(dsp.forms) do
                local limit_key = v.limit_key or dsp.limit_key
                if not limit_key or v.limit == http_form[limit_key] then
                    if v.gather ~= true then
                        local form = {
                            form = v.form,
                            operation = "write"
                        }
                        for oldk, value in pairs(http_form) do
                            local k = oldk:match("^%s(.*)$" % v.prefix)
                            if k then
                                form[k] = value
                            end
                        end
                        local ret = target(form)
                        if ret.success then
                            updateonly_and_prefix(data, ret.data, v.prefix)
                        else
                            success = false
                        end
                    else
                        gather = true
                        tmp_form.form[#tmp_form.form + 1] = v.form 
                        for oldk, value in pairs(http_form) do
                            local k = oldk:match("^%s(.*)$" % v.prefix)
                            if k then
                                tmp_form[oldk] = value
                            end
                        end
                    end
                end
            end

            if gather == true then
                local r = target(tmp_form)
                if r.success then
                    for _, f in ipairs(tmp_form.form) do
                        for _, v in pairs(dsp.forms) do
                            if f == v.form then
                                -- no need combile prefix
                                updateonly_and_prefix(data, r.data)
                            end
                        end
                    end
                else
                    success = false
                end
            end
        end
    end

    return success and data
end

function check_internet(http_form)
	local status = 1
	local retry = 3
	for i = 0, retry do
		status = sys.call("online-test")
		if 0 == status then
			break
		else
			sys.call("sleep 2")
		end
	end
    local success = ( 0 == status )
    return success
end

function check_router(http_form)
    local internet = require("luci.model.internet").Internet()
    local uci_r = require "luci.model.uci".cursor()		
	if uci_r:get("modem","modemconf","mode") == "3g4g" then
		if luci.sys.call("ubus call network.interface.mobile status | grep state |grep -w -q 'connected'") == 0 then
			return true
		else
			return false
		end
	end
    return internet:status() == "connected"
end

--[[
function save_session()
    local sauth = require "luci.sauth"
    local sess = require "luci.dispatcher".context.authsession
    local sdat = sauth.read(sess)

    if sdat then
        -- Save session
        local uci_r = require "luci.model.uci".cursor()
        uci_r:section("session", "session", "session", {
                          sid = sess,
                          addr = sdat.addr,
                          user = sdat.user,
                          token = sdat.token,
                          secret = sdat.secret})
        uci_r:commit("session")
    end

    return true
end

function load_session()
    local uci_r = require "luci.model.uci".cursor()
    local sdat = uci_r:get_all("session", "session")

    if sdat then
        local sauth = require "luci.sauth"
        sauth.write(sdat.sid, {
                        addr = sdat.addr,
                        user = sdat.user,
                        token = sdat.token,
                        secret = sdat.secret,
                        hash = sdat.hash,
                        aeskey = sdat.aeskey,
                        aesiv  = sdat.aesiv,
                        seqnum = sdat.seqnum})
    end

    return true
end

--]]

-- General controller routines

local dispatch_tbl = {
    quick_setup = {
        ["read"] = {cb = read},
        ["write"] = {cb = write}
    },
    ap_setup = {
        ["read"] = {cb = read_ap},
        ["write"] = {cb = write_ap}
    },
    check_internet = {
        [".super"] = {cb = check_internet}
    },
    check_router = {
        [".super"] = {cb = check_router}
    }
}

function dispatch(http_form)
    return ctl.dispatch(dispatch_tbl, http_form)
end

function _index()
    return ctl._index(dispatch)
end

function index()
    entry({"admin", "quick_setup"}, call("_index")).leaf = true
end
