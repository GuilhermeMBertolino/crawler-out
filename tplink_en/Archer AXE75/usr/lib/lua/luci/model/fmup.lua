--[[Copyright(c) 2014 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  fmup.lua
Details :  common operation for firmware upgrade
Author  :  liwenbo  <liwenbo@tp-link.net>
           liwenbo <liwenbo@tp-link.net>
Version :  1.1.0
Date    :  27JAN, 2016
]]--

module ("luci.model.fmup", package.seeall)

local uci       = require "luci.model.uci"
local debug     = require "luci.tools.debug"
local sys       = require "luci.sys"
local fs        = require "luci.fs"
local nixio     = require "nixio"
local uci_r = uci.cursor()

local small_mem = uci_r:get_profile("global", "small_mem") or "no"
local firmware_lock = "/tmp/firmware_lock.lua"
local fmcheck_lock = "/tmp/fmcheck_lock.lua"

function upgrade_type(type)
    local file = io.open(firmware_lock, "w")
    local cmd = "upgrade_type = \"%s\"\n"
    file:write(string.format(cmd, type))
    file:close()
end

function upgrade_check()
    local file = io.open(fmcheck_lock, "w")
    file:close()
end

function load_old_config(path, config_name)
    local config_old   = path .. config_name
    local all_sections = {}

    if fs.isfile(config_old) then
        uci_r:unload(config_name)
        uci_r:load(config_old)
        all_sections = uci_r:get_all(config_name) or {}
        uci_r:unload(config_name)
    end
    return all_sections
end

function clean_mem()
    debug.printf("clean memory ...")
    os.execute("ps | grep hotplug2 >/dev/null 2>&1 && killall -9 hotplug2 >/dev/null 2>&1")
    os.execute("ps | grep tddp >/dev/null 2>&1 && killall -9 tddp >/dev/null 2>&1")
--    os.execute("ps | grep tmpServer >/dev/null 2>&1 && killall -9 tmpServer >/dev/null 2>&1")
    os.execute("ps | grep dosd >/dev/null 2>&1 && killall -9 dosd >/dev/null 2>&1")
    os.execute("ps | grep dropbear >/dev/null 2>&1 && killall -9 dropbear >/dev/null 2>&1")
    os.execute("ps | grep factory_reset >/dev/null 2>&1 && killall -9 factory_reset >/dev/null 2>&1")
    os.execute("ps | grep improxy >/dev/null 2>&1 && killall -9 improxy >/dev/null 2>&1")
    os.execute("ps | grep logd >/dev/null 2>&1 && killall -9 logd >/dev/null 2>&1")
    os.execute("ps | grep klogd >/dev/null 2>&1 && killall -9 klogd >/dev/null 2>&1")
    os.execute("ps | grep logger >/dev/null 2>&1 && killall -9 logger >/dev/null 2>&1")
    os.execute("ps | grep openvpn >/dev/null 2>&1 && killall -9 openvpn >/dev/null 2>&1")
    os.execute("ps | grep pptpd >/dev/null 2>&1 && killall -9 pptpd >/dev/null 2>&1")
    os.execute("ps | grep imbd >/dev/null 2>&1 && killall -9 imbd >/dev/null 2>&1")
    os.execute("ps | grep radvd >/dev/null 2>&1 && killall -9 radvd >/dev/null 2>&1")
    os.execute("ps | grep dhcp6s >/dev/null 2>&1 && killall -9 dhcp6s >/dev/null 2>&1")
    os.execute("ps | grep dhcp6c >/dev/null 2>&1 && killall -9 dhcp6c >/dev/null 2>&1")
    os.execute("[ -f /usr/sbin/miniupnpd ] && rm /usr/sbin/miniupnpd >/dev/null 2>&1")
    os.execute("ps | grep miniupnpd >/dev/null 2>&1 && killall -9 miniupnpd >/dev/null 2>&1")
    os.execute("[ -f /usr/sbin/sysmond ] && rm /usr/sbin/sysmond >/dev/null 2>&1")
    os.execute("ps | grep sysmond >/dev/null 2>&1 && killall -9 sysmond >/dev/null 2>&1")
    os.execute("ps | grep crond >/dev/null 2>&1 && killall -9 crond >/dev/null 2>&1")
    os.execute("ps | grep tsched >/dev/null 2>&1 && killall -9 tsched >/dev/null 2>&1")
    os.execute("ps | grep ntpd >/dev/null 2>&1 && killall -9 ntpd >/dev/null 2>&1")
    os.execute("ps | grep improxy >/dev/null 2>&1 && killall -9 improxy >/dev/null 2>&1")
    os.execute("ps | grep wireless_button >/dev/null 2>&1 && killall -9 wireless_button >/dev/null 2>&1")
    os.execute("echo 3 > /proc/sys/vm/drop_caches")
end

function update_cloud_config()
    local uci_r = require("luci.model.uci").cursor()
    local cloud_support = uci_r:get_profile("cloud", "cloud_support") or "no"

    if cloud_support == "yes" then
        uci_r:delete("cloud_config", "new_firmware")
        uci_r:delete("cloud_config", "upgrade_info")
        uci_r:set("cloud_config", "new_firmware", "cloud_push")
        uci_r:set("cloud_config", "upgrade_info", "cloud_reply")
        uci_r:set("wportal", "upgrade", "enable", "yes")
        uci_r:set("wportal", "upgrade", "time", "0")
        uci_r:set("cloud_config", "info", "show_flag", "0")
        uci_r:commit("cloud_config")
        sys.fork_call("/etc/init.d/cloud_client stop")
    end
end

function mcu_reset()
    os.execute("echo 0 > /sys/class/leds/mcu_reset/brightness")
    os.execute("echo 1 > /sys/class/leds/mcu_reset/brightness")
end

function has_mcu()
    if fs.isfile("/sys/class/leds/mcu_reset/brightness") then
        return true
    end
    return false
end

function mcu_confirm()
    local res
    
    if not has_mcu() then
        return true
    end
    os.execute("nvram unset upgrade_flag;nvram commit")
    os.execute("nvram set upgrade_flag=1")
    mcu_reset()
    for i = 1, 5 do
         res = os.execute("nvram get upgrade_flag | grep 1 > /dev/null")
         if res ~= 0 then
            os.execute("killall mcud")
            return true
        end
        os.execute("sleep 1")
    end
    return false
end

function has_ledctrl()
    if fs.isfile("/usr/bin/ledctrl") then
        return true
    end
    return false
end

function sysled_twinkle()
    if has_ledctrl() then
        os.execute("ledcli STATUS_SAN")
    end
    return true
end

function upd_fm(firmware_file)
    if nixio.fs.access(fmcheck_lock) then
        debug.printf("Another process is checking now, please wait...")
        return false
    end

    -- NOTE: Set flag, avoid repeated check. 
    upgrade_check()
    local ret = sys.fork_call("nvrammanager -c \"%s\" > /dev/console" % (firmware_file))
    if ret == 0 then
        debug.printf("firmware check OK")
        if small_mem == "yes" then
            clean_mem()
        end
        mcu_confirm()
        sys.call("cloud_cleanFwInfo")
        debug.printf("[fmup.lua]:upgrade firmware...")
        sys.fork_exec("/sbin/sysupgrade \"%s\"" % (firmware_file))
    else
        -- NOTE: Remove flag, accept next try.
        luci.sys.call("rm -f " .. firmware_lock .. " " .. fmcheck_lock)
        debug.printf("firmware check fail")
    end
    return ret
end
