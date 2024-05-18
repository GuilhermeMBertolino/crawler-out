--[[
Copyright(c) 2016-2017 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  tmp-server.lua
Details :  Controller for tmp-server 
Author  :  huangqinglou
Version :  1.0.0
Date    :  2017/3/14
]]--

module("luci.controller.admin.tmp_server", package.seeall)

local nixio  = require "nixio"
local uci    = require "luci.model.uci"
local util   = require "luci.util"
local sys    = require "luci.sys"
local dbg    = require "luci.tools.debug"
local ctl    = require "luci.model.controller"
local class_parentctl = require "luci.model.parental_control".Parentctl()
local class_qos = require "luci.model.qos".QOS_INST()
local class_sec = require "luci.model.security".SECURITY_INST()
local class_spt = require "luci.model.speed_test".SPEED_TEST_INST()
local class_time = require "luci.model.app_timesetting"
local class_reboot = require "luci.controller.admin.reboot"
local clientmgmt = require "luci.model.tm_clientmgmt"

local uci_r = require("luci.model.uci").cursor()
local uci_state = require("luci.model.uci").cursor_state()
local cloud_https = require "cloud_req.cloud_https"

local WEEK_TBL = {Mon=1, Tues=2, Wed=3, Thur=4, Fri=5, Sat=6, Sun=7}


function _print_tbl(data)
    if type(data) == "table" then
        for i, v in pairs(data) do
            dbg.print(i .. " = " .. tostring(data[i]))
            if type(data[i]) == "table" then
                _print_tbl(data[i])         
            end
        end
    end
end

local function invalid_args(errorcode)
    errorcode = errorcode or "invalid args"
    return false, errorcode
end

local function tmp_get_key(tbl, value)
	--[[ 1. Ensure value type is number.
		 2. Use pairs, ipairs will skip members not in a row.
	]]
	value = tonumber(value)
	for k, v in pairs(tbl) do
		if value == v then
			return k
		end
	end
end

-- tm panrental controls

local function tmp_get_owner_list(app_form)
	if not app_form then
		dbg.print("invalid_args")
		return invalid_args()
	end
	
    return class_parentctl:tmp_get_owner_list(app_form)
end

local function tmp_add_owner(app_form)
	if not app_form then
		dbg.print("invalid_args")
		return invalid_args()
	end
	
	return class_parentctl:tmp_insert_owner(app_form)
end

local function tmp_del_owner(app_form)
	if not app_form then
		dbg.print("invalid_args")
		return invalid_args()
	end
	
	return class_parentctl:tmp_remove_owner(app_form)
end

local function tmp_get_timelimit(app_form)
	if not app_form then
		dbg.print("invalid_args")
		return invalid_args()
	end
	
    return class_parentctl:tmp_get_time_limit(app_form)
end

local function tmp_set_timelimit(app_form)
	if not app_form then
		dbg.print("invalid_args")
		return invalid_args()
	end
	
    return class_parentctl:tmp_set_time_limit(app_form)
end

local function tmp_get_filter(app_form)
	if not app_form then
		dbg.print("invalid_args")
		return invalid_args()
	end
	
    return class_parentctl:tmp_get_filter(app_form)
end

local function tmp_set_filter(app_form)
	if not app_form then
		dbg.print("invalid_args")
		return invalid_args()
	end
	
    return class_parentctl:tmp_set_filter(app_form)
end

local function tmp_edit_owner(app_form)
	if not app_form then
		dbg.print("invalid_args")
		return invalid_args()
	end
	
    return class_parentctl:tmp_edit_owner(app_form)
end

local function tmp_get_clientlist(app_form)
	if not app_form then
		dbg.print("invalid_args")
		return invalid_args()
	end
	
    return class_parentctl:tmp_get_client_list(app_form)
end

local function tmp_add_clientlist(app_form)
	if not app_form then
		dbg.print("invalid_args")
		return invalid_args()
	end
	
    return class_parentctl:tmp_add_client_list(app_form)
end

local function tmp_del_clientlist(app_form)
	if not app_form then
		dbg.print("invalid_args")
		return invalid_args()
	end
	
    return class_parentctl:tmp_del_client_list(app_form)
end

local function tmp_get_insights(app_form)
	if not app_form then
		dbg.print("invalid_args")
		return invalid_args()
	end
	
    return class_parentctl:tmp_get_insights(app_form)
end

local function tmp_get_history(app_form)
	if not app_form then
		dbg.print("invalid_args")
		return invalid_args()
	end
	
    return class_parentctl:tmp_get_history(app_form)
end

local function tmp_clear_history(app_form)
	if not app_form then
		dbg.print("invalid_args")
		return invalid_args()
	end
	
    return class_parentctl:tmp_clear_history(app_form)
end

local function tmp_block_website(app_form)
	if not app_form then
		dbg.print("invalid_args")
		return invalid_args()
	end
	
    return class_parentctl:tmp_block_website(app_form)
end

local function tmp_get_default_filter(app_form)
	if not app_form then
		dbg.print("invalid_args")
		return invalid_args()
	end
	
    return class_parentctl:tmp_get_default_filter(app_form)
end


-- tm qos

local function tmp_get_qos(app_form)
	if not app_form then
		dbg.print("invalid_args")
		return invalid_args()
	end
    
    return class_qos:tmp_get_mode()
end

local function tmp_set_qos(app_form)
    if not app_form then
		dbg.print("invalid_args")
        return invalid_args()
    end

    return class_qos:tmp_set_mode(app_form)
end

local function tmp_get_qos_v2(app_form)
	if not app_form then
		dbg.print("invalid_args")
		return invalid_args()
	end
    
    return class_qos:tmp_get_mode_v2()
end

local function tmp_set_qos_bandwidth(app_form)
    if not app_form then
		dbg.print("invalid_args")
        return invalid_args()
    end

    return class_qos:tmp_set_bandwidth(app_form)
end

local function tmp_get_devlist(app_form)
	if not app_form then
		dbg.print("invalid_args")
		return invalid_args()
	end
	
    return class_qos:tmp_get_dev_list(app_form)
end

local function tmp_set_devinfo(app_form)
	if not app_form then
		dbg.print("invalid_args")
		return invalid_args()
	end
	
    return class_qos:tmp_set_dev_info(app_form)
end

local function tmp_get_devspeed(app_form)
	if not app_form then
		dbg.print("invalid_args")
		return invalid_args()
	end
	
    return class_qos:tmp_get_dev_speed(app_form)
end

local function tmp_get_devinfo(app_form)
	if not app_form then
		dbg.print("invalid_args")
		return invalid_args()
	end
	
    return class_qos:tmp_get_dev_info(app_form)
end

function remove_offline_client_v2(app_form)
    if not app_form then
		dbg.print("invalid_args")
		return invalid_args()
	end

	return require("luci.model.client_mgmt").remove_offline_client_v2(app_form)
end


-- tm anti-virus

local function tmp_get_sec_info(app_form)
	if not app_form then
		dbg.print("invalid_args")
        return invalid_args()
    end
	
    return class_sec:tmp_get_info(app_form)
end

local function tmp_set_sec_info(app_form)
    if not app_form then
		dbg.print("invalid_args")
        return invalid_args()
    end

    return class_sec:tmp_set_info(app_form)
end

local function tmp_get_sec_log(app_form)
	if not app_form then
		dbg.print("invalid_args")
        return invalid_args()
    end

    return class_sec:tmp_get_history(app_form)
end

local function tmp_clear_sec_log(app_form)
	if not app_form then
		dbg.print("invalid_args")
        return invalid_args()
    end

    return class_sec:clear_history()
end

local function tmp_get_sec_file(app_form)
	if not app_form then
		dbg.print("invalid_args")
        return invalid_args()
    end

    return class_sec:get_db_file(app_form)
end

-- speed test

local function tmp_start_speedtest(app_form)
	if not app_form then
		dbg.print("invalid_args")
        return invalid_args()
    end

    class_spt:start_spt()
	
	local ret = {}
	local result = {}
	ret.result = luci.json.encode(result)
	return ret
end

local function tmp_get_speedtest_result(app_form)
	if not app_form then
		dbg.print("invalid_args")
        return invalid_args()
    end
	
	local ret = {}
    local result = class_spt:get_spt_result()
	ret.result = luci.json.encode(result)
	return ret
end

local function tmp_get_speedtest_history(app_form)
	if not app_form then
		dbg.print("invalid_args")
        return invalid_args()
    end

    return class_spt:tmp_get_speedtest_history(app_form)
end

local function tmp_clear_speedtest_history(app_form)
	if not app_form then
		dbg.print("invalid_args")
        return invalid_args()
    end

    class_spt:clear_spt_history()
	
	local ret = {}
	local result = {}
	ret.result = luci.json.encode(result)
	return ret
end

local function tmp_update_dst(app_form)
	if not app_form then
		dbg.print("invalid_args")
        return invalid_args()
    end
	local zoneId = tostring(luci.json.decode(app_form.data))

	return class_time.ts_update_dst(zoneId, "tether")
end

local function tmp_timing_reboot_get(app_form)
	if not app_form then
		dbg.print("invalid_args")
		return invalid_args()
	end

	local ret = {}
	local result = {}
	local form = class_reboot.get_auto_reboot()
	 if form.enable == "on" then
		result.enable = true
	else
		result.enable = false
	end
	local hour, min = string.match(form.time, "(%d+):(%d+)")
	result.reboot_time = tonumber(hour)*60+tonumber(min)
	result.repeat_rule = {}

	if form.cycle == "day" then
		result.repeat_rule.mode = "every_day"
	elseif form.cycle == "week" then
		result.repeat_rule.mode = "every_week"
		if form.day then
			result.repeat_rule.mode_detail = tonumber(WEEK_TBL[form.day])
		end
	elseif form.cycle == "month" then
		result.repeat_rule.mode = "every_month"
		if form.day then
			result.repeat_rule.mode_detail = tonumber(form.day)
		end
	end
	ret.result = luci.json.encode(result)
	return ret
end

local function tmp_timing_reboot_set(app_form)
	if not app_form or not app_form.data then
		dbg.print("invalid_args")
		return invalid_args()
	end

	local data = luci.json.decode(app_form.data)
	if not data and type(data) ~= "table" then
		dbg.print("invalid data")
		return {errorcode="invalid new params"}
	end

	form = {}

	if data.enable == true then
		form.enable = "on"
	else
		form.enable = "off"
	end

	local hour = math.floor((data.reboot_time)/60)

	if hour < 10 then
		hour = 0 .. hour
	end
	local min = (data.reboot_time)%60
	if min < 10 then
		min = 0 .. min
	end
	form.time = hour .. ":" .. min

	if data.repeat_rule.mode == "every_day" then
		form.cycle = "day"
	elseif data.repeat_rule.mode == "every_week" then
		form.cycle = "week"
		if data.repeat_rule.mode_detail then
			form.day = tmp_get_key(WEEK_TBL, data.repeat_rule.mode_detail)
		end
	elseif data.repeat_rule.mode == "every_month" then
		form.cycle = "month"
		if data.repeat_rule.mode_detail then
			form.day = data.repeat_rule.mode_detail
		end
	end

	local ret = {}
	local result = class_reboot.set_auto_reboot(form)
	ret.result = luci.json.encode(result)
	return ret
end

--[[
	for tether parental control 
]]--


function tmp_get_client_list_v2(http_form)
	if not http_form then
        return invalid_args()
    end
    class_qos:update_device_status()
	return class_qos:tmp_get_dev_list(http_form)

    --return clientmgmt.get_access_client_v2_list(http_form)
end

function tmp_set_client_info_v2(http_form)
	if not http_form then
        return invalid_args()
    end

	return   class_parentctl:tmp_set_clientV2(http_form)
end

function tmp_set_client_v2(http_form)
	if not http_form then
        return invalid_args()
    end

    return class_qos:tmp_set_dev_speed(http_form)
end

function tmp_get_clients_speed(http_form)
	if not http_form then
        return invalid_args()
    end

    return class_qos:tmp_get_dev_speed(http_form)
end

function tmp_get_speed_bymac(http_form)
	if not http_form then
        return invalid_args()
    end

    return class_qos:tmp_get_dev_info(http_form)
end

function  tmp_get_owners_list(http_form)
	if not http_form then
        return invalid_args()
    end

	return   class_parentctl:tmp_get_owner_list(http_form)
end

function  tmp_insert_owners(http_form)
	if not http_form then
        return invalid_args()
    end

	return   class_parentctl:tmp_insert_owner(http_form)
end

function  tmp_remove_owners(http_form)
	if not http_form then
        return invalid_args()
    end

	return   class_parentctl:tmp_remove_owner(http_form)
end

function tmp_get_filters(http_form)

	return   class_parentctl:tmp_get_filter(http_form)
end

function tmp_set_filters(http_form)

	return   class_parentctl:tmp_set_filter(http_form)
end

function tmp_get_default_filters(http_form)

	return   class_parentctl:tmp_get_default_filter(http_form)
end

function tmp_get_timelimit(http_form)

	return   class_parentctl:tmp_get_time_limit(http_form)
end

function tmp_set_timelimit(http_form)

	return   class_parentctl:tmp_set_time_limit(http_form)
end

function tmp_modify_owner(http_form)

	return   class_parentctl:tmp_edit_owner(http_form)
end

function tmp_get_clients_list(http_form)

	return   class_parentctl:tmp_get_client_list(http_form)
end

function tmp_set_clients_list(http_form)

	return   class_parentctl:tmp_add_client_list(http_form)
end

function tmp_del_clients_list(http_form)

	return   class_parentctl:tmp_del_client_list(http_form)
end

function l_tmp_get_insights(http_form)

	return   class_parentctl:tmp_get_insights(http_form)
end

function tmp_get_history(http_form)

	return   class_parentctl:tmp_get_history(http_form)
end

function tmp_clear_history(http_form)

	return   class_parentctl:tmp_clear_history(http_form)
end

function tmp_block_website(http_form)

	return   class_parentctl:tmp_block_website(http_form)
end

function tmp_get_website(http_form)

	return   class_parentctl:tmp_get_website(http_form)
end

function tmp_set_website(http_form)
	--local filter_website_list= http_form.filter_website_list

	return   class_parentctl:tmp_set_website(http_form)
end

function tmp_expired_info_get(app_form)
	local ret = {}
	local result = {}
	local count = 0
	-- for app, isExpired is actually more like homecare enabled flag
	local isExpired = false 
	local inFreeTrial = uci_state:get("homecare", "tm_transitionB", "inFreeTrial")
	if inFreeTrial == "yes" then
		isExpired = false
	elseif inFreeTrial == "no" then
		isExpired = true
	else
		local tm_enable = uci_r:get("homecare", "tm_homecare", "enable")
		if tm_enable == "on" then
			isExpired = false
		else
			isExpired = true
		end
	end

	local trialExpiredTimeStampStr = uci_state:get("homecare", "tm_transitionB", "trialExpiredTimeStamp") or "0"

	-- wait for cloud_setupTMHomecare to get trial from cloud
	while true do
		if trialExpiredTimeStampStr ~= "0" or count > 20 then
			break
		end
		os.execute("sleep 1")
		uci_state = require("luci.model.uci").cursor_state()
		trialExpiredTimeStampStr = uci_state:get("homecare", "tm_transitionB", "trialExpiredTimeStamp") or "0"
		count = count + 1
	end



	local trialExpiredTimeStamp = tonumber(trialExpiredTimeStampStr)
	result.isExpired = isExpired
	result.expiredTimeStamp = trialExpiredTimeStamp

	ret.result = luci.json.encode(result)
	return ret	
end

function tmp_pay_firmware_check(app_form)
	local ret = {}
	local result = {}
	local hasPayFirmware = false

	local tmp_ret, tmp_data = cloud_https.get_homecareTransition_payFirmware(1)

	if tmp_ret ~= 0  or type(tmp_data) ~= "table" then
		dbg.print("tmp_data error...")
		hasError = true
	end

	if type(tmp_data) ~= "table" then
		tmp_data = {}
	end

	if tmp_data.hasFirmware ~= true and tmp_data.hasFirmware ~= false then
		dbg.print("tmp_data.hasFirmware error...")
		hasError = true
	end

	if hasError then
		hasPayFirmware = false
	else
		if tmp_data.hasFirmware == true then
			hasPayFirmware = true
		else
			hasPayFirmware = false
		end
	end

	result.hasPayFirmware = hasPayFirmware

	ret.result = luci.json.encode(result)
	return ret	
end


local tmp_server_form = {  
	tmp_tm_pc = {
		["get_ownerlist"] = {cb = tmp_get_owner_list},
		["add_owner"] = {cb = tmp_add_owner},
		["del_owner"] = {cb = tmp_del_owner},
		["get_timelimit"] = {cb = tmp_get_timelimit},
		["set_timelimit"] = {cb = tmp_set_timelimit},
		["get_filter"] = {cb = tmp_get_filter},
		["set_filter"] = {cb = tmp_set_filter},
		["edit_owner"] = {cb = tmp_edit_owner},
		["get_clientlist"] = {cb = tmp_get_clientlist},
		["add_clientlist"] = {cb = tmp_add_clientlist},
		["del_clientlist"] = {cb = tmp_del_clientlist},
		["get_insights"] = {cb = tmp_get_insights},
		["get_history"] = {cb = tmp_get_history},
		["clear_history"] = {cb = tmp_clear_history},
		["block_website"] = {cb = tmp_block_website},
		["get_defaultfilter"] = {cb = tmp_get_default_filter}
    },
	tmp_tm_qos = {
                ["get_qos"] = {cb = tmp_get_qos},
		["set_qos"] = {cb = tmp_set_qos},
                ["get_qos_v2"] = {cb = tmp_get_qos_v2},
		["set_qos_bandwidth"] = {cb = tmp_set_qos_bandwidth},
		["get_devlist"] = {cb = tmp_get_devlist},
		["set_devinfo"] = {cb = tmp_set_devinfo},
		["get_devspeed"] = {cb = tmp_get_devspeed},
		["get_devinfo"] = {cb = tmp_get_devinfo},
		["remove_dev_v2"] = { cb = remove_offline_client_v2}
    },
	tmp_tm_sec = {
        ["get_sec"] = {cb = tmp_get_sec_info},
		["set_sec"] = {cb = tmp_set_sec_info},
		["get_log"] = {cb = tmp_get_sec_log},
		["clear_log"] = {cb = tmp_clear_sec_log},
		["get_file"] = {cb = tmp_get_sec_file}
    },
	tmp_speed_test = {
        ["start_test"] = {cb = tmp_start_speedtest},
		["get_result"] = {cb = tmp_get_speedtest_result},
		["get_history"] = {cb = tmp_get_speedtest_history},
		["clear_history"] = {cb = tmp_clear_speedtest_history}
    },
	tmp_sync_time = {
		["update_dst"] = {cb = tmp_update_dst},
	},
	tmp_timing_reboot = {
		["get"] = {cb = tmp_timing_reboot_get},
		["set"] = {cb = tmp_timing_reboot_set},
	},
		tmp_client_v2 = {
		["getClientListV2"] = {cb = tmp_get_client_list_v2},
		["setClientV2"] = {cb = tmp_set_client_info_v2}
	},
	tmp_get_speed = {
		["getClientSpeedList"] = {cb = tmp_get_clients_speed},
		["getClientSpeedbyMac"] = {cb = tmp_get_speed_bymac}
	},
	tmp_owner_list = {
		["getOwnerList"] =  {cb = tmp_get_owners_list},
		["insert"] = {cb = tmp_insert_owners},
		["remove"] = {cb = tmp_remove_owners}
	},
	tmp_time_op = {
		["getTimelimit"] = {cb = tmp_get_timelimit},
		["setTimelimit"] = {cb = tmp_set_timelimit}
	},
	tmp_filter_op = {
		["getFilter"] = {cb = tmp_get_filters},
		["setFilter"] = {cb = tmp_set_filters},
		["getdeffilter"] = {cb = tmp_get_default_filters}
	},
	tmp_owner_op = {
		["modifyowner"] = {cb = tmp_modify_owner},
	},
	tmp_client_list_op = {
		["getClientList"] = {cb = tmp_get_clients_list},
		["setClientList"] = {cb = tmp_set_clients_list},
		["delClientList"] = {cb = tmp_del_clients_list}
	},
	tmp_history_op = {
		["getinsights"] = {cb = l_tmp_get_insights},
		["gethistory"] = {cb = tmp_get_history},
		["clearhistory"] = { cb = tmp_clear_history}
	},
	tmp_website_op = {
		["blockWebsiteByid"] = {cb = tmp_block_website},
		["getWebsiteByid"] = {cb = tmp_get_website},
		["setWebsiteByid"] = {cb = tmp_set_website}
	},
	tmp_homecare_transitionB = {
		["expired_info_get"] = {cb = tmp_expired_info_get},
		["pay_firmware_check"] = {cb = tmp_pay_firmware_check}
	}
}

function tmp_server_dispatch(app_form)
    return ctl.dispatch(tmp_server_form, app_form)
end

function tmp_server_index()
    return ctl._index(tmp_server_dispatch)
end

function index()
    entry({"admin", "tmp_server"}, call("tmp_server_index")).leaf = true
end
