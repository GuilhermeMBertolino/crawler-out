--[[
Copyright(c) 2008-2014 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  wireless.lua
Details :  Web controller for wireless module.
Author  :  Chen Jinfu <chenjinfu@tp-link.net>
Version :  1.0.0
Date    :  24Feb, 2014
]]--
local wlan  = require "luci.model.wireless"
local uci   = require "luci.model.uci"
local uci_r = uci.cursor()
local dbg   = require "luci.tools.debug"
local ctl   = require "luci.model.controller"

module("luci.controller.admin.wireless", package.seeall)



-- Process WPS PIN HTTP request.
-- @param N/A
-- @return N/A
function wireless_wps_pin(formvalue)
    local option = formvalue["option"]
    local label  = formvalue["wps_label"]
    local ap     = wlan.Apcfg("wps_pin", {"wps_label", "wps_pin"})
    local cfg    = nil
    local data   = {}
    local result = true

    if option == "generate" or option == "default" then
        cfg = {wps_pin = option}
    elseif label == "on" or label == "off" then
        cfg = {wps_label = label}
    end

    -- Is there any commit?
    if cfg then
        local oldcfg = ap:read_data()

        ap:write(cfg)
        data = ap:read()

        -- Apply WPS config if any changed.
        if oldcfg.wps_label ~= data.wps_label or
            oldcfg.wps_pin ~= data.wps_pin or 
            cfg.wps_label
        then
            ap:wps_cmd("ap_pin", data)
        end
    else
        data = ap:read()
    end
    data.lock_2g = "disable"
    data.lock_5g = "disable"
    result = ap:wps_cmd("pin_lock", data)

    return data
end

-- Process WPS Connection HTTP request.
-- @param N/A
-- @return N/A
function wireless_wps_connect(formvalue)
    local option = formvalue["option"]
    local ap     = wlan.Apcfg("wps_pin", {"wps_timeout", "disabled"})
    local data   = {wps_status = "ok"}
    local result = true

    -- Query PIN method connect status
    if option == "pin" then
        data.method = "pin"
        result      = ap:wps_cmd("status", data)
        data.method = nil

    -- Query PBC method connect status
    elseif option == "pbc" then
        data.method = "pbc"
        result      = ap:wps_cmd("status", data)
        data.method = nil

    -- Cancel PBC and PIN connect
    elseif option == "cancel" then
        result = ap:wps_cmd("cancel", data)

    -- Add a WPS device by PBC or PIN method
    elseif option == "connect" then
        local pin = formvalue["wps_pin"]

        -- Use PIN method if a PIN number is given.
        if pin and pin ~= "" then
            data.pin = pin
            result   = ap:wps_cmd("pin", data)
            data.pin = nil
        else
            result   = ap:wps_cmd("pbc", data)
        end

        file = require("io").popen("tp_wps_led &")
        if file then
            file:close()
        end

    -- Default response: 'wps_timeout' and 'available'.
    else
        data = ap:read_data()
        data.wps_timeout = data.wps_timeout + 1000
        data.available   = ap:wps_cmd()
    end

    if result then
        return data
    else
        return false, "wps connect error", data
    end
end

-- Process wireless statistics HTTP request.
-- @param N/A
-- @return N/A
function wireless_statistics(formvalue)
    local operate  = formvalue["operation"] or "read"
    local map      = {"2.4GHz", "5GHz", "Guest 2.4GHz", "Guest 5GHz"}
    local ap       = wlan.Apcfg()
    local sta_list = {}

    if operate == "read" or operate == "load" then

        for _, sta in ipairs(ap:assoclist()) do
            sta_list[#sta_list + 1 ] = {
                mac        = sta.mac,
                type       = map[sta.type],
                encryption = sta.security,
                rxpkts     = sta.tx_packets,
                txpkts     = sta.rx_packets,
            }
        end
    end

    return sta_list
end

-- Process 2G survey HTTP request.
-- @param N/A
-- @return N/A
function wireless_survey_2g(formvalue)
    local ap = wlan.Apcfg()
    local ap_list = ap and ap:scanlist(true, false)
    return ap_list
end

-- Process 5G survey HTTP request.
-- @param N/A
-- @return N/A
function wireless_survey_5g(formvalue)
    local ap = wlan.Apcfg()
    local ap_list = ap and ap:scanlist(false, true)
    return ap_list
end

-- Process wireless devlist HTTP request.
-- @param N/A
-- @return N/A
function wireless_devlist(formvalue)
    local client   = require("luci.model.client_mgmt")
    local operate  = formvalue["operation"] or "read"
    local map      = {"Wireless 2GHz", "Wireless 5GHz", "Guest 2GHz", "Guest 5GHz"}
    local ap       = wlan.Apcfg()
    local dev_list = {}
    
    if operate == "read" or operate == "load" then
        local pc_list  = (client and client.get_client_list()) or {}
        local sta_list = (ap and ap:assoclist()) or {}

        -- If a sta is not in the client list, output it first.
        for _, sta in ipairs(sta_list) do
            local found = false
            for _, pc in ipairs(pc_list) do
                if sta.mac == pc.mac then
                    found = true
                    pc.wire_type = map[sta.type]
                    break
                end
            end

            if not found then
                dev_list[#dev_list + 1] = {
                    mac = sta.mac,
                    ip = "0.0.0.0",
                    name = "UNKNOW",
                    type = map[sta.type]
                }
            end
        end

        -- Output all client list.
        for _, pc in ipairs(pc_list) do
            dev_list[#dev_list + 1] = {
                    mac = pc.mac,
                    ip = pc.ip,
                    name = pc.hostname,
                    type = pc.wire_type
            }
        end
    end
    return dev_list
end

-- Process wireless macfiltering HTTP request.
-- @param N/A
-- @return N/A
function wireless_maclist(formvalue)
    local operate = formvalue["operation"] or "read"
    local index   = formvalue["index"]
    local ap      = wlan.Apcfg()
    local result  = false
    local data    = {}
    
    -- Read one or all mac list
    if operate == "read" or operate == "load" then
        result = ap:maclist_read(index and tonumber(index), data)

    -- Remove a mac entry by index
    elseif operate == "remove" then
        result = index and ap:maclist_remove(index, data)

    -- Modify or insert a mac entry
    elseif operate == "update" or operate == "insert" then

        data   = require("luci.json").decode(formvalue["new"])
        result = ap:maclist_check(data)
        
        if result then
            if operate == "insert" then
                result = ap:maclist_insert(data)
            else
                result = index and ap:maclist_update(tonumber(index), data)
            end
        end
    end
    
    if not result then
        return false, "macfilter error", data    
    else
        return data
    end
end


function tmp_pick_data(wifi_type, wifi_2G_5G, status_all)

    local data       = {}
    local prefix     = wifi_type .. "_" .. wifi_2G_5G
    local wifi_encry = status_all[prefix .. "_encryption"] or "none"

    data["ssid"] = status_all[prefix .. "_ssid"]

    if wifi_encry == "none" then
        data["enSecurity"] = "off"
        data["encryption"] = "none"
    else
        data["enSecurity"] = "on"
        data["encryption"] = wifi_encry
        data["psk_key"]    = status_all[prefix .. "_psk_key"]
        data["wep_key1"]   = status_all[prefix .. "_wep_key1"]
        data["server"]     = status_all[prefix .. "_server"] or "0.0.0.0"
        data["wpa_key"]    = status_all[prefix .. "_wpa_key"] or ""
    end

    return data
end


function tmp_read_wifi(wifi_type, has_5G)

    local status_all = wireless_status_all()
    if not status_all or type(status_all) ~= "table" then
        return false, "cannot get the wireless status"
    end

    local wifi_2g = tmp_pick_data(wifi_type, "2g", status_all)
    local wifi_5g = has_5G and tmp_pick_data(wifi_type, "5g", status_all) or nil
    local data    = {basicCfg = {wifi_2g, wifi_5g}}

    data["access"] = status_all["guest_access"] or "off"

    local wifi_2g_disabled = status_all[wifi_type .. "_2g_disabled"] or "on"
    local wifi_5g_disabled = has_5G and status_all[wifi_type .. "_5g_disabled"] or "on"

    if wifi_2g_disabled == "on" or has_5G and wifi_5g_disabled == "on" then
        data["hardSwitchEn"] = "off"
    else
        data["hardSwitchEn"] = "on"
    end

    local enable_2G = status_all[wifi_type .. "_2g_enable"]
    local enable_5G = has_5G and status_all[wifi_type .. "_5g_enable"] or "off"

    -- 2.4g
    data["enableBand"] = enable_2G == "on" and "1" or "0"

    -- 5g
    if has_5G and enable_5G == "on" then
        data["enableBand"] = data["enableBand"] .. "1"
    else
        data["enableBand"] = data["enableBand"] .. "0"
    end

    -- dbg.dumptable(data)
    return data
end


function wireless_tmp_read()
    return tmp_read_wifi("wireless", true)
end


function wireless_tmp_read_guest()
    return tmp_read_wifi("guest", true)
end


function tmp_fill_value(lua_form, prefix)
    local values = {
        [prefix .. "_encryption"] = lua_form[prefix .. "_encryption"],
        [prefix .. "_ssid"]       = lua_form[prefix .. "_ssid"]
    }

    if lua_form[prefix .. "_encryption"] == "psk" then
        values[prefix .. "_psk_key"]  = lua_form[prefix .. "_psk_key"]

    elseif lua_form[prefix .. "_encryption"] == "wep" then
        values[prefix .. "_wep_key1"] = lua_form[prefix .. "_wep_key1"]

    elseif lua_form[prefix .. "_encryption"] == "wpa" then
        values[prefix .. "_server"]   = lua_form[prefix .. "_server"]
        values[prefix .. "_wpa_key"]  = lua_form[prefix .. "_wpa_key"]
    end

    return values
end


function wireless_tmp_set(lua_form)
    local formvalue = {}
    formvalue["form"]                     = {"wireless_2g", "wireless_5g"}
    formvalue["operation"]                = "write"
    formvalue["wireless_2g_enable"]       = lua_form.wireless_2g_enable or "off"
    formvalue["wireless_2g_disabled_all"] = lua_form.wireless_2g_enable == "on" and "off" or "on"
    formvalue["wireless_5g_enable"]       = lua_form.wireless_5g_enable or "off"
    formvalue["wireless_5g_disabled_all"] = lua_form.wireless_5g_enable == "on" and "off" or "on"

    local values = {}
    values[1] = tmp_fill_value(lua_form, "wireless_2g")
    values[2] = tmp_fill_value(lua_form, "wireless_5g")

    for i = 1, 2 do
        for k, v in pairs(values[i]) do
            formvalue[k] = v
        end
    end

    return wireless_predefined_forms(formvalue)
end


function wireless_tmp_set_guest(lua_form)
    local formvalue = {}
    formvalue["form"]            = {"guest_2g", "guest_5g", "guest"}
    formvalue["operation"]       = "write"
    formvalue["guest_access"]    = lua_form.guest_access
    formvalue["guest_2g_enable"] = lua_form.guest_2g_enable or "off"
    formvalue["guest_5g_enable"] = lua_form.guest_5g_enable or "off"

    local values = {}
    values[1] = tmp_fill_value(lua_form, "guest_2g")
    values[2] = tmp_fill_value(lua_form, "guest_5g")

    for i = 1, 2 do
        for k, v in pairs(values[i]) do
            formvalue[k] = v
        end
    end

    return wireless_predefined_forms(formvalue)
end

--- Get the max limited number of the devices.
-- @param  N/A
-- @return #table Data of the max limited number of the devices.
function max_mac_filter()
    return {max_rules = uci_r:get_profile("wireless","max_mac_filter")}
end


-- Using predefined forms in luci.model.wireless
-- @param  N/A
-- @return 
function wireless_predefined_forms(formvalue, args)
    local form    = formvalue["form"] or ""
    local operate = formvalue["operation"] or ""

    local ap = wlan.Apcfg(form, (args ~= true and args))
    func = ap[operate] or ap["read"]

    return func(ap, formvalue)
end


--- Get all of the wireless status.
-- @param  N/A
-- @return 
function wireless_status_all(formvalue)
    local form = {"wireless_2g", "wireless_5g", "guest_2g"
        , "guest_5g", "guest" --[[, "region"]]}
    return wlan.Apcfg(form):read()
end


-- Wireless forms, the table is informat {args=true/false/{table}, ...}.
-- false means using a function in luci.controller.admin.wireless
-- true means using predefined forms in luci.model.wireless
-- {table} means using a subset of the predefined forms in luci.model.wireless
local wireless_form = {
    status_all = {
        [".super"] = {cb = wireless_status_all}
    },
    wireless_2g = {
        [".super"] = {cb = wireless_predefined_forms, args = true}
    },
    wireless_5g = {
        [".super"] = {cb = wireless_predefined_forms, args = true}
    },
    guest_2g = {
        [".super"] = {cb = wireless_predefined_forms, args = true}
    },
    guest_5g = {
        [".super"] = {cb = wireless_predefined_forms, args = true}
    },
    syspara_2g = {
        [".super"] = {cb = wireless_predefined_forms, args = true}
    },
    syspara_5g = {
        [".super"] = {cb = wireless_predefined_forms, args = true}
    },
    region = {
        [".super"] = {cb = wireless_predefined_forms, args = true}
    },
    guest = {
        [".super"] = {cb = wireless_predefined_forms, args = true}
    },
    syspara_wps = {
        [".super"] = {cb = wireless_predefined_forms, args = true}
    },
    macfilter = {
        [".super"] = {cb = wireless_predefined_forms, args = true}
    },
    wps_pin = {
        [".super"] = {cb = wireless_wps_pin}
    },
    maclist = {
        [".super"] = {cb = wireless_maclist, others = max_mac_filter}
    },
    devlist = {
        [".super"] = {cb = wireless_devlist}
    },
    survey_2g = {
        [".super"] = {cb = wireless_survey_2g}
    },
    survey_5g = {
        [".super"] = {cb = wireless_survey_5g}
    },
    statistics = {
        [".super"] = {cb = wireless_statistics}
    },
    wps_connect = {
        [".super"] = {cb = wireless_wps_connect}
    },
    tmp_read = {
        ["read"] = {cb = wireless_tmp_read}
    },
    tmp_read_guest = {
        ["read"] = {cb = wireless_tmp_read_guest}
    },
    tmp_set = {
        ["write"] = {cb = wireless_tmp_set}
    },
    tmp_set_guest = {
        ["write"] = {cb = wireless_tmp_set_guest}
    },
}


function wireless_dispatch(http_form)
    return ctl.dispatch(wireless_form, http_form)
end


-- Process wireless webpage's HTTP request.
-- @param N/A
-- @return N/A
function wireless_index()
    return ctl._index(wireless_dispatch)
end


-- Register wireless URL and RPM
-- @param N/A
-- @return N/A
function index()
    entry({"admin", "wireless"}, call("wireless_index")).leaf = true
end