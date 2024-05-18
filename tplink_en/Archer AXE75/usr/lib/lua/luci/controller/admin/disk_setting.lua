--[[
Copyright(c) 2008-2014 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  disk_setting.lua
Details :  
Author  :  Zhang Zhongwei <zhangzhongwei@tp-link.net>
Version :  1.0.0
Date    :  20Jan, 2014
]]--

module("luci.controller.admin.disk_setting", package.seeall)

local nixio    = require "nixio"
local json     = require "luci.json"
local sys      = require "luci.sys"
local dbg      = require "luci.tools.debug"
local uci      = require "luci.model.uci"
local ctl      = require "luci.model.controller"
local usbshare = require "luci.model.usbshare"

local uci_r       = uci.cursor()
local cfg_changed = false
local UCICFG      = "usbshare"

-- Debug
-- @param N/A
-- @return N/A
local function debug(arg)
    --[[
    if type(arg) == "string" then
        dbg.print(arg)
    elseif type(arg) == "table" then
        dbg.dumptable(arg)
    end
    ]]--
end

-- Scan the disks and return the metadata (name and serial)
-- @param N/A
-- @return table Table of json data to be responsed.
function disk_metadata(form, scan)
    -- spend time
    if scan == "scan" then 
        sys.fork_call("usbshare scan") 
    end

    local data = {list = {}}
    local parser = usbshare.CfgParser()
    local disks = parser:get_devices()
    local number = 0
    local size = 0
    local usb_hub_extend = uci_r:get_profile("usbshare", "usb_hub_extend") or 0
    for _, disk in pairs(disks) do 
        number = number + 1
        size = usbshare.format_size(disk.capacity)
        table.insert(data.list, {
            name = disk.vendor .. "   " .. disk.model .. " (" .. size .. ")",
            serial = disk.serial
        })

        for _, volumn in pairs(disk.volumns) do
            local usb
            local portnum
            string.gsub(volumn.devname, "([%a]+)[%d]*$", function (x) usb = x end)
            if usb ~= nil then
                usb = sys.exec("ls -l /sys/block/" .. usb)
                string.gsub(usb, "usb[%d]/[%d]%-([%d])", function (x) portnum = x end)
                if usb_hub_extend == 1 then
                    string.gsub(usb, "usb[%d]/[%d]%-[%d]/[%d]%-[%d]%.([%d])", function (x) portnum = x end)
                else
                    string.gsub(usb, "usb[%d]/[%d]%-([%d])", function (x) portnum = x end)
                end
                if portnum == "1" then
                    portnum = "USB3"
                elseif portnum == "2" then
                    portnum = "USB1"
                end
                sys.fork_call("uci set ledctrl." .. portnum .. ".ledon=1")
                sys.fork_call("ledcli " .. portnum)
            end
        end
    end

    if scan == "scan" and number > 0 then
        cfg_changed = true
    end

    data.number = number

    return data
end

-- Remove disk by serial
-- @param N/A
-- @return table
function disk_remove(form)
    local success = false
    local serial = form.serial
    local parser = usbshare.CfgParser()
    local volumns = parser:get_volumns(serial)
    local ret = 1
    local usb_hub_extend = uci_r:get_profile("usbshare", "usb_hub_extend") or 0
    -- Stop all service
    usbshare.stop(true)

    for _, volumn in pairs(volumns) do
        ret = sys.fork_call("usbshare umount " .. volumn.devname)
        if ret == 0 then
            local usb
            local portnum
            string.gsub(volumn.devname, "([%a]+)[%d]*$", function (x) usb = x end)
            if usb ~= nil then
                usb = sys.exec("ls -l /sys/block/" .. usb)
                string.gsub(usb, "usb[%d]/[%d]%-([%d])", function (x) portnum = x end)
                if usb_hub_extend == 1 then
                    string.gsub(usb, "usb[%d]/[%d]%-[%d]/[%d]%-[%d]%.([%d])", function (x) portnum = x end)
                else
                    string.gsub(usb, "usb[%d]/[%d]%-([%d])", function (x) portnum = x end)
                end
                if portnum == "1" then
                    portnum = "USB3"
                elseif portnum == "2" then
                    portnum = "USB1"
                end
                sys.fork_call("uci set ledctrl." .. portnum .. ".ledon=0")
                local single_usb_port = uci_r:get_profile("usbshare","single_usb_port") or 0
                if single_usb_port == 1 then
                    local led_1=uci_r:get("ledctrl", "USB1", "ledon")
                    local led_3=uci_r:get("ledctrl", "USB3", "ledon")
                    if led_1 == "0" and led_3 == "0" then
                        sys.fork_call("ledcli USB1")
                        sys.fork_call("ledcli USB3")
                    end
                else
                    sys.fork_call("ledcli " .. portnum)
                end
            end
        end
    end

    if ret == 0 then
        success = true
        cfg_changed = true
    end

    return success
end

-- Scan the disks and return the metadata (name and serial)
-- @param N/A
-- @return table Table of json data to be responsed.
function volumn_list(form)
    local data   = {}
    local serial = form.serial
    local parser = usbshare.CfgParser()
    local volumns = parser:get_volumns(serial)

    for _, volumn in pairs(volumns) do
        -- debug(volumn.devname .. " " .. tostring(volumn.mntdir) .. " " .. volumn.uuid)
        table.insert(data, {
            uuid = volumn.uuid,
            volumn = volumn.label .. "(" .. volumn.path_prefix .. ")",
            capacity = usbshare.format_size(volumn.capacity),
            free = usbshare.format_size(volumn.capacity - volumn.used),
	    used = usbshare.format_size(volumn.used),
            enable = volumn.enable == "on" and "on" or "off",
            id = volumn.id,
         })
    end

    table.sort(data, function(a, b) return a.id < b.id end)
    return data
end

-- Scan the disks and return the metadata (name and serial)
-- @param N/A
-- @return table Table of json data to be responsed.
function volumn_enable(form)
    local old_str = form.old
    local new_str = form.new
    local old_data = json.decode(old_str)
    local new_data = json.decode(new_str)
    local parser = usbshare.CfgParser()
    local volumn = parser:get_volumn(new_data.uuid)
    local ret = nil

    if volumn.devname then
        local enable = new_data.enable == "on" and "enable" or "disable"
        local cmd = "usbshare volumn " .. enable .. " " .. volumn.devname
        ret = sys.call(cmd)
    else
        return false
    end

    if ret == 0 then
        cfg_changed = true
        return new_data
    else
        return false
    end
end

--check usb first
function check_usb_first(form)
    local data = {}
    local is_first = form.is_first or nil
    if is_first == nil then
        local isFirst = uci_r:get("usbshare","global","is_first")
        if isFirst == 'true' then
            data.is_first = true
        else
            data.is_first = false
        end
    else
        uci_r:set("usbshare","global","is_first",is_first)
        uci_r:commit("usbshare")
        data.is_first = false
    end
    return data
end

local disk_forms = {
    metadata = {
        [".super"] = {cb = disk_metadata},
        ["read"] = {cb = disk_metadata}
    },
    scan = {
        [".args"]  = "scan",
        [".super"] = {cb = disk_metadata},
        ["read"] = {cb = disk_metadata}
    },
    contents = {
        ["load"]   = {cb = volumn_list},
        ["read"]   = {cb = volumn_list},
        ["update"] = {cb = volumn_enable},
    },
    remove = {
        [".super"] = {cb = disk_remove},
	["read"] = {cb = disk_remove}
    },
    first = {
        ["read"]   = {cb = check_usb_first},
        ["write"] = {cb = check_usb_first},
    },
}

function index()
    entry({"admin", "disk_setting"}, call("disk_index")).leaf = true
end

function disk_index()
    ctl._index(disk_dispatch)
end

function disk_dispatch(http_form)
    local function hook(success, action)
        if success and cfg_changed then
            uci_r:commit(UCICFG)
            usbshare.apply()
        end

        return true
    end

    return ctl.dispatch(disk_forms, http_form, {post_hook = hook})
end
