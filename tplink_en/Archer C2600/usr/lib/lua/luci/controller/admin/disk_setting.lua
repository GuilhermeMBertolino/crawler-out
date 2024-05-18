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
local fs       = require "luci.fs"
local dbg      = require "luci.tools.debug"
local uci      = require "luci.model.uci"
local ctl      = require "luci.model.controller"
local usbshare = require "luci.model.usbshare"

local uci_r       = uci.cursor()
local cfg_changed = false

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

    for _, disk in pairs(disks) do 
        number = number + 1
        size = usbshare.format_size(disk.capacity)
        table.insert(data.list, {
            name = disk.vendor .. "   " .. disk.model .. " (" .. size .. ")",
            serial = disk.serial
        })
    end

    if scan == "scan" and number > 0 then
        cfg_changed = true
    end

    data.number = number

    if number ~= 0 then
        for _, i in pairs({1,2,3,4}) do
            local stat = sys.exec("cat /sys/bus/usb/drivers/usb/usb" .. i .. "/power/runtime_status")
            if stat:match("suspended") == nil then
                if i == 1 or i == 2 then
                    sys.fork_call("uci set ledctrl.USB1.ledon=1")
                    sys.fork_call("ledcli USB1")
                else
                    sys.fork_call("uci set ledctrl.USB3.ledon=1")
                    sys.fork_call("ledcli USB3")
                end
            end
        end
    end

    return data
end

function offline_download_stop(volumns)
    local enable = uci_r:get("offline_download", "global", "enable") and "on" or "off"
    local vol_flag = false
    
    if enable == "on" then
        local cfg_uuid = uci_r:get("offline_download", "global", "uuid")
        if cfg_uuid then
            for _, vol in pairs(volumns) do
                if vol.uuid == cfg_uuid then
                    vol_flag = true
                    break
                end
            end
        end

        if vol_flag then
            if fs.isfile("/etc/init.d/offline_download") then
                sys.fork_call("/etc/init.d/offline_download stop")
            end
        end
    end
end

function offline_download_start()
    local enable = uci_r:get("offline_download", "global", "enable")
    if enable then
        if fs.isfile("/etc/init.d/offline_download") then
            sys.fork_exec(". /etc/init.d/offline_download;start_monitor")
        end
    end
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

    -- Stop all service
    usbshare.stop(true)
    offline_download_stop(volumns)

    for _, volumn in pairs(volumns) do
        ret = sys.fork_call("usbshare umount " .. volumn.devname)
        if ret == 0 then
            local usb
            local bus
            string.gsub(volumn.devname, "([%a]+)[%d]*$", function (x) usb = x end)
            if usb ~= nil then
                usb = sys.exec("ls -l /sys/block/" .. usb)
                string.gsub(usb, "usb([%d])", function (x) bus = x end)
                if bus == "1" or bus == "2" then
                    bus = "USB1"
                else
                    bus = "USB3"
                end
                sys.fork_call("uci set ledctrl." .. bus .. ".ledon=0")
                sys.fork_call("ledcli " .. bus)
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
            volumn = volumn.label,
            capacity = usbshare.format_size(volumn.capacity),
            free = usbshare.format_size(volumn.capacity - volumn.used),
            enable = volumn.enable == "on" and "on" or "off",     
            id = volumn.id               
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

local disk_forms = {
    metadata = {
        [".super"] = {cb = disk_metadata},
    },
    scan = {
        [".args"]  = "scan",
        [".super"] = {cb = disk_metadata},
    },
    contents = {
        ["load"]   = {cb = volumn_list},
        ["read"]   = {cb = volumn_list},
        ["update"] = {cb = volumn_enable},
    },
    remove = {
        [".super"] = {cb = disk_remove},
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
            offline_download_start()
        end

        return true
    end

    return ctl.dispatch(disk_forms, http_form, {post_hook = hook})
end
