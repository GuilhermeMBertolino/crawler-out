--[[
Copyright(c) 2008-2014 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  smart_network.lua
Details :  Controller for trend micro iqos and parental control 
Author  :  Wang Lian <wanglian@tp-link.net>
Version :  1.0.0
Date    :  22Sep, 2016
]]--

module("luci.controller.admin.smart_network", package.seeall)

local nixio  = require "nixio"
local uci    = require "luci.model.uci"
local util   = require "luci.util"
local sys    = require "luci.sys"
local dbg    = require "luci.tools.debug"
local ctl    = require "luci.model.controller"
local patrol = require "luci.model.parental_control"
local iqos   = require "luci.model.qos"
local clientmgmt = require "luci.model.tm_clientmgmt"
local timesetting = require "luci.controller.admin.timesetting"

local uci_r  = uci.cursor()

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

local function read_patrol_settings(http_form)
	if not http_form then
		return invalid_args()
	end
	
	local parentctl = patrol.Parentctl()
	return parentctl:read_settings()
end

local function write_patrol_settings(http_form)
	if not http_form then
		return invalid_args()
	end
	
	local parentctl = patrol.Parentctl()
	return parentctl:write_settings(http_form)
end

local function patrol_owner_list_get(http_form)
    local parentctl = patrol.Parentctl()
    local owner_list = parentctl:get_owner_list()
    
    return owner_list
end

local function patrol_owner_insert(http_form)
	if not http_form then
		return invalid_args()
	end
	
	local parentctl = patrol.Parentctl()
	return parentctl:insert_owner(http_form)
end

local function patrol_owner_update(http_form)
	if not http_form then
		return invalid_args()
	end
	
	local parentctl = patrol.Parentctl()
	return parentctl:update_owner(http_form)
end

local function patrol_owner_remove(http_form)
	if not http_form then
		return invalid_args()
	end
	
	local parentctl = patrol.Parentctl()
	return parentctl:remove_owner(http_form)
end

local function patrol_client_list_get(http_form)
	local parentctl = patrol.Parentctl()
    local client_list = parentctl:get_client_list()

    return client_list
end

local function patrol_owner_block(http_form)
    if not http_form or not http_form.owner_id then
        return invalid_args()
    end
	
	local owner = {}
	owner.owner_id = http_form.owner_id
	if http_form.internet_blocked == "true" then
		owner.internet_blocked = true
	else
		owner.internet_blocked = false
	end

    local parentctl = patrol.Parentctl()
    
    return parentctl:block_owner(owner)
end

local function patrol_insights_get(http_form)
    if not http_form or not http_form.owner_id then
        return invalid_args()
    end

    local parentctl = patrol.Parentctl()
    
    return parentctl:get_insights(http_form.owner_id)
end

local function patrol_insights_history_get(http_form)
    if not http_form or not http_form.owner_id then
        return invalid_args()
    end

    local parentctl = patrol.Parentctl()
    
    return parentctl:get_insight_history(http_form.owner_id)
end

local function patrol_block_website(http_form)
    if not http_form or not http_form.owner_id then
        return invalid_args()
    end

    local parentctl = patrol.Parentctl()
    
    return parentctl:filter_website(http_form)
end

local function patrol_filter_table_get(http_form)
    
    local parentctl = patrol.Parentctl()
    local filter_list = parentctl:get_default_filter()

    return filter_list
end

local function patrol_dafault_limit_get(http_form)
	local parentctl = patrol.Parentctl()
    local default_limit = parentctl:get_default_limit()

    return default_limit
end

local function patrol_website_list_get()
    local parentctl = patrol.Parentctl()
    
    return parentctl:get_default_website()
end

function qos_settings_get(http_form)
    local qos = iqos.QOS_INST()

    return qos:get_settings()
end

function qos_settings_set(http_form)
    if not http_form then
        return invalid_args()
    end

    local qos = iqos.QOS_INST()
    local res = qos:set_settings(http_form)
    if not res then
        return res
    end

    return qos:get_settings()
end

function device_list_get(http_form)
    local qos = iqos.QOS_INST()
    qos:update_device_status()
    return qos:get_device_list(http_form)
end

function device_list_update(http_form)
    if not http_form then
        return invalid_args()
    end

    local qos = iqos.QOS_INST()
    return qos:update_device_info(http_form)
end

function device_list_batch_update(http_form)
    if not http_form then
        return invalid_args()
    end

    local qos = iqos.QOS_INST()
    return qos:batch_update_device_info(http_form)
end

--[[
	for SPF UI Interface
]] --

-- for support game mode --
function game_device_list_get(http_form)
    local qos = iqos.QOS_INST()
    return qos:game_get_device_list(http_form)
end

function game_device_speeds_get(http_form)
    local form = "speed"
    local qos = iqos.QOS_INST()
    return qos:game_get_device_list(form)
end

function game_device_list_update(http_form)
    if not http_form then
        return invalid_args()
    end

    local qos = iqos.QOS_INST()
    return qos:game_update_device_info(http_form)
end

--[[
	for tether parental control 
]]--

function  tmp_enable_get()
	local parentctl = patrol.Parentctl()
	return   parentctl:tmp_read_settings()
end

function  tmp_enable_set(http_form)
	if not http_form then
        return invalid_args()
    end
	local parentctl = patrol.Parentctl()
	return   parentctl:tmp_write_settings(http_form)
end

function tmp_get_client_list_v2(http_form)
	if not http_form then
        return invalid_args()
    end
	
	local qos = iqos.QOS_INST()
	qos:update_device_status()
	return qos:tmp_get_dev_list(http_form)

    --return clientmgmt.get_access_client_v2_list(http_form)
end

function tmp_set_client_info_v2(http_form)
	if not http_form then
        return invalid_args()
    end

	local parentctl = patrol.Parentctl()
	return   parentctl:tmp_set_clientV2(http_form)
end

function tmp_set_client_v2(http_form)
	if not http_form then
        return invalid_args()
    end

    local qos = iqos.QOS_INST()
    return qos:tmp_set_dev_speed(http_form)
end

function tmp_get_clients_speed(http_form)
	if not http_form then
        return invalid_args()
    end

    local qos = iqos.QOS_INST()
    return qos:tmp_get_dev_speed(http_form)
end

function tmp_get_online_clients_speed(http_form)
	if not http_form then
        return invalid_args()
    end

    local qos = iqos.QOS_INST()
    return qos:tmp_get_online_dev_speed(http_form)
end

function tmp_get_speed_bymac(http_form)
	if not http_form then
        return invalid_args()
    end

    local qos = iqos.QOS_INST()
    return qos:tmp_get_dev_info(http_form)
end

function  tmp_get_owners_list(http_form)
	if not http_form then
        return invalid_args()
    end
	local parentctl = patrol.Parentctl()
	return   parentctl:tmp_get_owner_list(http_form)
end

function  tmp_insert_owners(http_form)
	if not http_form then
        return invalid_args()
    end
	local parentctl = patrol.Parentctl()
	
	return   parentctl:tmp_insert_owner(http_form)
end

function  tmp_remove_owners(http_form)
	if not http_form then
        return invalid_args()
    end
	local parentctl = patrol.Parentctl()
	
	return   parentctl:tmp_remove_owner(http_form)
end

function tmp_get_filters(http_form)
	local parentctl = patrol.Parentctl()
	
	return   parentctl:tmp_get_filter(http_form)
end

function tmp_set_filters(http_form)
	local parentctl = patrol.Parentctl()
	
	return   parentctl:tmp_set_filter(http_form)
end

function tmp_get_default_filters(http_form)
	local parentctl = patrol.Parentctl()
	
	return   parentctl:tmp_get_default_filter(http_form)
end

function tmp_get_timelimit(http_form)
	local parentctl = patrol.Parentctl()
	
	return   parentctl:tmp_get_time_limit(http_form)
end

function tmp_set_timelimit(http_form)
	local parentctl = patrol.Parentctl()
	
	return   parentctl:tmp_set_time_limit(http_form)
end

function tmp_modify_owner(http_form)
	local parentctl = patrol.Parentctl()
	
	return   parentctl:tmp_edit_owner(http_form)
end

function tmp_get_clients_list(http_form)
	local parentctl = patrol.Parentctl()
	
	return   parentctl:tmp_get_client_list(http_form)
end

function tmp_set_clients_list(http_form)
	local parentctl = patrol.Parentctl()
	
	return   parentctl:tmp_add_client_list(http_form)
end

function tmp_del_clients_list(http_form)
	local parentctl = patrol.Parentctl()
	
	return   parentctl:tmp_del_client_list(http_form)
end

function l_tmp_get_insights(http_form)
	local parentctl = patrol.Parentctl()
	
	return   parentctl:tmp_get_insights(http_form)
end

function tmp_get_history(http_form)
	local parentctl = patrol.Parentctl()
	
	return   parentctl:tmp_get_history(http_form)
end

function tmp_clear_history(http_form)
	local parentctl = patrol.Parentctl()
	
	return   parentctl:tmp_clear_history(http_form)
end

function tmp_block_website(http_form)
	local parentctl = patrol.Parentctl()
	
	return   parentctl:tmp_block_website(http_form)
end

function tmp_get_website(http_form)
	local parentctl = patrol.Parentctl()
	
	return   parentctl:tmp_get_website(http_form)
end

function tmp_set_website(http_form)
	local parentctl = patrol.Parentctl()
	--local filter_website_list= http_form.filter_website_list
	
	return   parentctl:tmp_set_website(http_form)
end

--TODO
function tmp_get_ownerinlist(app_form)
	if not app_form then
		return invalid_args()
	end
	local iavira = require "luci.model.avira"
	local avira = iavira.AVIRA_GATHER()
	return avira:tmp_get_ownerinlist(app_form)
end

function tmp_add_ownerinlist(app_form)
	if not app_form then
		return invalid_args()
	end

	local iavira = require "luci.model.avira"
	local avira = iavira.AVIRA_GATHER()	
	return avira:tmp_add_ownerinlist(app_form)
end

function tmp_del_ownerinlist(app_form)
	if not app_form then
		return invalid_args()
	end

	local iavira = require "luci.model.avira"
	local avira = iavira.AVIRA_GATHER()
	return avira:tmp_del_ownerinlist(app_form)
end

function tmp_get_limit(app_form)
	if not app_form then
		return invalid_args()
	end

	local iavira = require "luci.model.avira"
	local avira = iavira.AVIRA_GATHER()
	return avira:tmp_get_limit(app_form)
end

function tmp_set_limit(app_form)
	if not app_form then
		return invalid_args()
	end

	local iavira = require "luci.model.avira"
	local avira = iavira.AVIRA_GATHER()
	return avira:tmp_set_limit(app_form)
end

function tmp_get_filterinfo(app_form)
	if not app_form then
		return invalid_args()
	end

	local iavira = require "luci.model.avira"
	local avira = iavira.AVIRA_GATHER()
	return avira:tmp_get_filterinfo(app_form)
end

function tmp_set_filterinfo(app_form)
	if not app_form then
		return invalid_args()
	end

	local iavira = require "luci.model.avira"
	local avira = iavira.AVIRA_GATHER()
	return avira:tmp_set_filterinfo(app_form)
end

function tmp_modify_baseinfo(app_form)
	if not app_form then
		return invalid_args()
	end

	local iavira = require "luci.model.avira"
	local avira = iavira.AVIRA_GATHER()
	return avira:tmp_modify_baseinfo(app_form)
end

function tmp_get_devicelist(app_form)
	if not app_form then
		return invalid_args()
	end

	local iavira = require "luci.model.avira"
	local avira = iavira.AVIRA_GATHER()
	return avira:tmp_get_devicelist(app_form)
end

function tmp_set_bonustime(app_form)
	if not app_form then
		return invalid_args()
	end

	local iavira = require "luci.model.avira"
	local avira = iavira.AVIRA_GATHER()
	return avira:tmp_set_bonustime(app_form)
end

function tmp_set_devicelist(app_form)
	if not app_form then
		return invalid_args()
	end

	local iavira = require "luci.model.avira"
	local avira = iavira.AVIRA_GATHER()
	return avira:tmp_set_devicelist(app_form)
end

function tmp_get_freefilterinfo(app_form)
	if not app_form then
		return invalid_args()
	end

	local iavira = require "luci.model.avira"
	local avira = iavira.AVIRA_GATHER()
	return avira:tmp_get_freefilterinfo(app_form)
end

function tmp_set_freefilterinfo(app_form)
	if not app_form then
		return invalid_args()
	end

	local iavira = require "luci.model.avira"
	local avira = iavira.AVIRA_GATHER()
	return avira:tmp_set_freefilterinfo(app_form)
end

function tmp_get_familytimeinfo(app_form)
	if not app_form then
		return invalid_args()
	end

	local iavira = require "luci.model.avira"
	local avira = iavira.AVIRA_GATHER()
	return avira:tmp_get_familytimeinfo(app_form)
end

function tmp_set_familytimeinfo(app_form)
	if not app_form then
		return invalid_args()
	end

	local iavira = require "luci.model.avira"
	local avira = iavira.AVIRA_GATHER()
	return avira:tmp_set_familytimeinfo(app_form)
end

function tmp_get_usage(app_form)
	if not app_form then
		return invalid_args()
	end

	local iavira = require "luci.model.avira"
	local avira = iavira.AVIRA_GATHER()
	return avira:tmp_get_usage(app_form)
end

function tmp_get_data(app_form)
	if not app_form then
		return invalid_args()
	end

	local iavira = require "luci.model.avira"
	local avira = iavira.AVIRA_GATHER()
	return avira:tmp_get_data(app_form)
end

function tmp_get_sites(app_form)
	if not app_form then
		return invalid_args()
	end

	local iavira = require "luci.model.avira"
	local avira = iavira.AVIRA_GATHER()
	return avira:tmp_get_sites(app_form)
end

function tmp_ign_req(app_form)
	if not app_form then
		return invalid_args()
	end

	local iavira = require "luci.model.avira"
	local avira = iavira.AVIRA_GATHER()
	return avira:tmp_ign_req(app_form)
end

function tmp_scan_start(app_form)
	if not app_form then
		return invalid_args()
	end

	local iavira = require "luci.model.avira"
	local avira = iavira.AVIRA_GATHER()
	return avira:tmp_scan_start(app_form)
end

function tmp_scan_stop(app_form)
	if not app_form then
		return invalid_args()
	end

	local iavira = require "luci.model.avira"
	local avira = iavira.AVIRA_GATHER()
	return avira:tmp_scan_stop(app_form)
end

function tmp_get_networkscaninfo(app_form)
	if not app_form then
		return invalid_args()
	end

	local iavira = require "luci.model.avira"
	local avira = iavira.AVIRA_GATHER()
	return avira:tmp_get_networkscaninfo(app_form)
end

function tmp_get_devicesscaninfo(app_form)
	if not app_form then
		return invalid_args()
	end

	local iavira = require "luci.model.avira"
	local avira = iavira.AVIRA_GATHER()
	return avira:tmp_get_devicesscaninfo(app_form)
end

function tmp_get_networkqualityinfo(app_form)
	if not app_form then
		return invalid_args()
	end

	local iavira = require "luci.model.avira"
	local avira = iavira.AVIRA_GATHER()
	return avira:tmp_get_networkqualityinfo(app_form)
end

function tmp_optimize_networkquality(app_form)
	if not app_form then
		return invalid_args()
	end

	local iavira = require "luci.model.avira"
	local avira = iavira.AVIRA_GATHER()
	return avira:tmp_optimize_networkquality(app_form)
end

function tmp_get_priodevices(app_form)
	if not app_form then
		return invalid_args()
	end

	local qos = iqos.QOS_INST()
	return qos:tmp_get_priodevices(app_form)
end

function tmp_add_priodevices(app_form)
	if not app_form then
		return invalid_args()
	end

	local qos = iqos.QOS_INST()
	return qos:tmp_add_priodevices(app_form)
end

function tmp_del_priodevices(app_form)
	if not app_form then
		return invalid_args()
	end

	local qos = iqos.QOS_INST()
	return qos:tmp_del_priodevices(app_form)
end

function tmp_get_secinfo(app_form)
	if not app_form then
		return invalid_args()
	end

	local iavira = require "luci.model.avira"
	local avira = iavira.AVIRA_GATHER()
	return avira:tmp_get_secinfo(app_form)
end

function tmp_set_secinfo(app_form)
	if not app_form then
		return invalid_args()
	end

	local iavira = require "luci.model.avira"
	local avira = iavira.AVIRA_GATHER()
	return avira:tmp_set_secinfo(app_form)
end

function tmp_get_secv3info(app_form)
	if not app_form then
		return invalid_args()
	end

	local iavira = require "luci.model.avira"
	local avira = iavira.AVIRA_GATHER()
	return avira:tmp_get_secv3info(app_form)
end

function tmp_set_secv3info(app_form)
	if not app_form then
		return invalid_args()
	end

	local iavira = require "luci.model.avira"
	local avira = iavira.AVIRA_GATHER()
	return avira:tmp_set_secv3info(app_form)
end

function tmp_cloud_service_state_check(app_form)
	if not app_form then
		return invalid_args()
	end

	local iavira = require "luci.model.avira"
	local avira = iavira.AVIRA_GATHER()
	return avira:tmp_cloud_service_state_check(app_form)
end
-- NOTE: functions end

local smart_network_form = {  
    patrol_enable = {
        ["read"]  = { cb  = read_patrol_settings },
        ["write"] = { cb  = write_patrol_settings}        
    },
    patrol_owner_list = {
        [".super"] = {cb = patrol_owner_list_get},
        ["insert"] = {cb = patrol_owner_insert},
        ["update"] = {cb = patrol_owner_update},
        ["remove"] = {cb = patrol_owner_remove}
    },
	patrol_limit = {
		["read"] = {cb = patrol_dafault_limit_get},
	},	
    patrol_devices = {
        [".super"] = {cb = patrol_client_list_get}
    },
    patrol_owner_block = {
        ["write"] = {cb = patrol_owner_block}
    },
    patrol_owner_website_block = {
        ["write"] = {cb = patrol_block_website}
    },
    patrol_insights = {
        [".super"] = {cb = patrol_insights_get}
    },
    patrol_insights_history = {
        [".super"] = {cb = patrol_insights_history_get}
    },
    patrol_filter = {
        [".super"] = {cb = patrol_filter_table_get}
    },
    filter_apps_list = {
        [".super"] = {cb = patrol_website_list_get}
    },
    qos = {
        ["read"] = {cb = qos_settings_get},
        ["write"] = {cb = qos_settings_set}
    },
    device_priority = {
        ["load"] = {cb = device_list_get},
        ["update"] = {cb = device_list_update},
		["updateColumn"] = {cb = device_list_get}
    },
    game_accelerator = {
        ["loadDevice"]   = {cb = game_device_list_get},
        ["loadSpeed"]    = {cb = game_device_speeds_get},
        ["update"]       = {cb = game_device_list_update}
    },
	tmp_enable_op = {
		["enableGet"] =  {cb = tmp_enable_get},
		["enableSet"] =  {cb = tmp_enable_set}
	},
	tmp_client_v2 = {
		["getClientListV2"] = {cb = tmp_get_client_list_v2},
		["setClientV2"] = {cb = tmp_set_client_info_v2}
	},
	tmp_get_speed = {
		["getClientSpeedList"] = {cb = tmp_get_clients_speed},
		["getClientSpeedbyMac"] = {cb = tmp_get_speed_bymac},
		["getOnlineClientSpeedList"] = {cb = tmp_get_online_clients_speed}
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
	tmp_avira = {
		["getOwnerInList"] = {cb = tmp_get_ownerinlist},
		["addOwnerInList"] = {cb = tmp_add_ownerinlist},
		["delOwnerInList"] = {cb = tmp_del_ownerinlist},
		["getTimelimit"] = {cb = tmp_get_limit},
		["setTimelimit"] = {cb = tmp_set_limit},
		["getFilterInfo"] = {cb = tmp_get_filterinfo},
		["setFilterInfo"] = {cb = tmp_set_filterinfo},
		["modifyBaseInfo"] = {cb = tmp_modify_baseinfo},
		["getDeviceList"] = {cb = tmp_get_devicelist},
		["bonusTimeSet"] = {cb = tmp_set_bonustime},
		["ownerClientListSet"] = {cb = tmp_set_devicelist},
		["getFreeFilterInfo"] = {cb = tmp_get_freefilterinfo},
		["setFreeFilterInfo"] = {cb = tmp_set_freefilterinfo},
		["getFamilyTimeInfo"] = {cb = tmp_get_familytimeinfo},
		["setFamilyTimeInfo"] = {cb = tmp_set_familytimeinfo},
		["getInsightTimeUsage"] = {cb = tmp_get_usage},
		["getInsightData"] = {cb = tmp_get_data},
		["getInsightSites"] = {cb = tmp_get_sites},
		["ignoreReq"] = {cb = tmp_ign_req},
		["scanStart"] = {cb = tmp_scan_start},
		["scanStop"] = {cb = tmp_scan_stop},
		["networkScanInfoGet"] = {cb = tmp_get_networkscaninfo},
		["devicesScanInfoGet"] = {cb = tmp_get_devicesscaninfo},
		["networkQualityInfoGet"] = {cb = tmp_get_networkqualityinfo},
		["networkQualityStartOptimize"] = {cb = tmp_optimize_networkquality},
		["prioDevicesGet"] = {cb = tmp_get_priodevices},
		["prioDevicesAdd"] = {cb = tmp_add_priodevices},
		["prioDevicesDel"] = {cb = tmp_del_priodevices},
		["secv2InfoGet"] = {cb = tmp_get_secinfo},
		["secv2InfoSet"] = {cb = tmp_set_secinfo},
		["secv3InfoGet"] = {cb = tmp_get_secv3info},
		["secv3InfoSet"] = {cb = tmp_set_secv3info},
		["cloud_service_state_check"] = {cb = tmp_cloud_service_state_check},
	}
}

function smart_network_dispatch(http_form)
    return ctl.dispatch(smart_network_form, http_form)
end

function smart_network_index()
    return ctl._index(smart_network_dispatch)
end

function index()
    entry({"admin", "smart_network"}, call("smart_network_index")).leaf = true
end
