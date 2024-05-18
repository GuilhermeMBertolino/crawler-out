--[[
Copyright(c) 2014 Shenzhen TP-LINK Technologies Co.Ltd.

File    :  wireless.lua
Details :  wireless configure class
Author  :  Chen Jinfu <chenjinfu@tp-link.net>
Version :  1.0.0
Date    :  21Feb, 2014
]]--

local sys = require "luci.sys"
local utl = require "luci.util"
local uci = require "luci.model.uci"
local uci_r = uci.cursor()
local ip = require "luci.ip"
local dbg = require "luci.tools.debug"
local json = require "luci.json"
local sys_config = require "luci.sys.config"

module("luci.model.wireless", package.seeall)

-- Wifi shell script file path.
local APCFG_SHELL="env -i /sbin/wifi"

--- onemesh
local ONEMESH_SYNC_WIFI_TMP_JSON="/tmp/onemesh_sync_wifi_tmp_json"
local support_onemesh = uci_r:get_profile("onemesh", "onemesh_support") or "no"

-- Wifi config and action enum values, using prime number sequence.
local ACT_NOTHING = 1
local ACT_COUNTRY = 2
local ACT_DEVMODE = 3
local ACT_VAP_CFG = 5
local ACT_DEV_CFG = 7
local ACT_WPS     = 11
local ACT_DISABLE = 13
local ACT_RENABLE = 17
local ACT_RE_LOAD = 19
local ACT_MAC_FLT = 23
local ACT_VLAN_ID = 29
local ACT_SMART   = 31
local CFG_HST_2G = 2
local CFG_HST_5G = 3
local CFG_GST_2G = 5
local CFG_GST_5G = 7
local CFG_STA_2G = 11
local CFG_STA_5G = 13
local CFG_DEV_2G = 17
local CFG_DEV_5G = 19
local CFG_MACFLT = 23
local CFG_HST_5G_2 = 31
local CFG_GST_5G_2 = 37
local CFG_STA_5G_2 = 41
local CFG_DEV_5G_2 = 43
local CFG_SMART   = 47
local CFG_OFDMA   = 53
local CFG_ONEMESH_2G = 59
local CFG_ONEMESH_5G = 61
local CFG_ONEMESH_5G_2 = 67
local CFG_TWT = 71
local CFG_HST_6G = 73
local CFG_GST_6G = 79
local CFG_STA_6G = 83
local CFG_DEV_6G = 89
local CFG_ONEMESH_6G = 97
local CFG_VAP_2G = CFG_HST_2G * CFG_GST_2G * CFG_STA_2G
local CFG_VAP_5G = CFG_HST_5G * CFG_GST_5G * CFG_STA_5G
local CFG_VAP_5G_2 = CFG_HST_5G_2 * CFG_GST_5G_2 * CFG_STA_5G_2
local CFG_VAP_6G = CFG_HST_6G * CFG_GST_6G * CFG_STA_6G
local CFG_VAP_AL = CFG_VAP_2G * CFG_VAP_5G * CFG_VAP_5G_2 * CFG_VAP_6G
local CFG_DEV_AL  = CFG_DEV_2G * CFG_DEV_5G * CFG_DEV_5G_2 * CFG_DEV_6G
local CFG_HST_AL  = CFG_HST_2G * CFG_HST_5G * CFG_HST_5G_2 * CFG_HST_6G
local CFG_GST_AL  = CFG_GST_2G * CFG_GST_5G * CFG_GST_5G_2 * CFG_GST_6G
local CFG_STA_AL  = CFG_STA_2G * CFG_STA_5G * CFG_STA_5G_2 * CFG_STA_6G


-- Wifi apply action to shell command mapping.
local APCFG_ACTION = {
    [ACT_COUNTRY] = {cmd = "country", sync = true},
    [ACT_DEVMODE] = {cmd = "mode"},
    [ACT_VAP_CFG] = {cmd = "vap"},
    [ACT_DEV_CFG] = {cmd = "radio"},
    [ACT_WPS]     = {cmd = "wpsswitch"},
    [ACT_DISABLE] = {cmd = "down"},
    [ACT_RENABLE] = {cmd = "up"},
    [ACT_RE_LOAD] = {cmd = "reload"},
    [ACT_MAC_FLT] = {cmd = "macfilter"},
    [ACT_VLAN_ID] = {cmd = "vlan"},
    [ACT_SMART]   = {cmd = "smart"},
}

-- Wifi UI item to UCI config item mapping.
local APCFG_DATA = {
    region = {
        {cfg = CFG_DEV_AL, act = ACT_COUNTRY, opt = "country"},
        {cfg = CFG_DEV_AL, act = ACT_NOTHING, cvt = "capability"},
        {cfg = CFG_DEV_AL, act = ACT_NOTHING, cvt = "region_select_permission"},
        {cfg = CFG_DEV_AL, act = ACT_NOTHING, cvt = "support_smart_connect"},
        {cfg = CFG_DEV_AL, act = ACT_NOTHING, cvt = "support_wireless_schedule"},
        {cfg = CFG_DEV_AL, act = ACT_NOTHING, cvt = "support_please_select"},
    },

    guest = {
        {cfg = CFG_GST_AL, act = ACT_VAP_CFG, opt = "isolate", cvt = "off_on"},
        {cfg = CFG_GST_AL, act = ACT_VLAN_ID, opt = "access",  cvt = "on_off"},
    },
    
    portal_content = {
        {cfg = CFG_GST_AL, act = ACT_VAP_CFG, opt = "title"},
        {cfg = CFG_GST_AL, act = ACT_VAP_CFG, opt = "content"},
    },

    macfilter = {
        {cfg = CFG_MACFLT, act = ACT_MAC_FLT, opt = "enable",  cvt = "on_off"},
        {cfg = CFG_MACFLT, act = ACT_MAC_FLT, opt = "action",  val = {"allow", "deny"}},
    },
    
    syspara_wps = {
        {cfg = CFG_HST_AL, act = ACT_WPS, opt = "wps",     cvt = "on_off"},
    },

    wps_pin = {
        {cfg = CFG_DEV_AL, act = ACT_NOTHING, opt = "disabled"},
        {cfg = CFG_HST_AL, act = ACT_NOTHING, opt = "wps_pbc",      cvt = "on_off"},
        {cfg = CFG_HST_AL, act = ACT_NOTHING, opt = "wps_timeout"},
        {cfg = CFG_HST_AL, act = ACT_NOTHING, opt = "wps_label",    cvt = "on_off"},
        {cfg = CFG_HST_AL, act = ACT_NOTHING, opt = "wps_pin"},
    },
    
    wireless_2g = {
        {cfg = CFG_DEV_2G, act = ACT_NOTHING, opt = "macaddr"},
        {cfg = CFG_DEV_2G, act = ACT_DEVMODE, opt = "disabled",     cvt = "on_off"},
        {cfg = CFG_DEV_2G, act = ACT_RE_LOAD, opt = "disabled_all"},--, cvt = "on_off"},
        {cfg = CFG_DEV_2G, act = ACT_NOTHING, opt = "disabled_by", val = {"0", "1"}},
        {cfg = CFG_DEV_2G, act = ACT_NOTHING, cvt = "extinfo"},
        {cfg = CFG_STA_2G, act = ACT_NOTHING, cvt = "wds_status"},
        {cfg = CFG_DEV_2G, act = ACT_DEVMODE, opt = "hwmode",       val = {"n", "gn", "bgn", "ax", "bgnax"}},
        {cfg = CFG_DEV_2G, act = ACT_DEVMODE, opt = "htmode",       cvt = "htmode_2g"},
        {cfg = CFG_DEV_2G, act = ACT_DEVMODE, opt = "channel",      cvt = "channel_2g"},
        {cfg = CFG_DEV_2G, act = ACT_DEVMODE, opt = "txpower",      val = {"low", "middle", "high"}},
        {cfg = CFG_VAP_2G, act = ACT_NOTHING, cvt = "current_channel"},
        {cfg = CFG_HST_2G, act = ACT_VAP_CFG, opt = "enable"},--,       cvt = "on_off"},
        {cfg = CFG_HST_2G, act = ACT_VAP_CFG, opt = "ssid"},
        {cfg = CFG_HST_2G, act = ACT_VAP_CFG, opt = "wps_state"},
        {cfg = CFG_HST_2G, act = ACT_VAP_CFG, opt = "hidden",       cvt = "on_off"},
        {cfg = CFG_HST_2G, act = ACT_VAP_CFG, opt = "encryption",   val = {"none", "psk", "psk_sae", "owe", "wpa", "wpa3", "wep"}},
        {cfg = CFG_HST_2G, act = ACT_VAP_CFG, opt = "psk_version",  val = {"auto", "wpa", "rsn", "sae_transition", "sae_only", "owe_transition", "owe_only"}},
        {cfg = CFG_HST_2G, act = ACT_VAP_CFG, opt = "psk_cipher",   val = {"auto", "aes", "ccmp", "tkip"}},
        {cfg = CFG_HST_2G, act = ACT_VAP_CFG, opt = "psk_key"},
        {cfg = CFG_HST_2G, act = ACT_VAP_CFG, opt = "server"},
        {cfg = CFG_HST_2G, act = ACT_VAP_CFG, opt = "port"},
        {cfg = CFG_HST_2G, act = ACT_VAP_CFG, opt = "wpa_key"},
        {cfg = CFG_HST_2G, act = ACT_VAP_CFG, opt = "wpa_version",  val = {"auto", "wpa", "wpa3", "rsn"}},
        {cfg = CFG_HST_2G, act = ACT_VAP_CFG, opt = "wpa_cipher",   val = {"auto", "aes", "ccmp", "tkip", "gcmp"}},
        {cfg = CFG_HST_2G, act = ACT_VAP_CFG, opt = "wep_mode",     val = {"auto", "open", "shared"}},
        {cfg = CFG_HST_2G, act = ACT_VAP_CFG, opt = "wep_select",   val = {"1", "2", "3", "4"}},
        {cfg = CFG_HST_2G, act = ACT_VAP_CFG, opt = "wep_format1",  val = {"asic", "hex"}},
        {cfg = CFG_HST_2G, act = ACT_VAP_CFG, opt = "wep_format2",  val = {"asic", "hex"}},
        {cfg = CFG_HST_2G, act = ACT_VAP_CFG, opt = "wep_format3",  val = {"asic", "hex"}},
        {cfg = CFG_HST_2G, act = ACT_VAP_CFG, opt = "wep_format4",  val = {"asic", "hex"}},
        {cfg = CFG_HST_2G, act = ACT_VAP_CFG, opt = "wep_type1",    val = {"64", "128", "152"}},
        {cfg = CFG_HST_2G, act = ACT_VAP_CFG, opt = "wep_type2",    val = {"64", "128", "152"}},
        {cfg = CFG_HST_2G, act = ACT_VAP_CFG, opt = "wep_type3",    val = {"64", "128", "152"}},
        {cfg = CFG_HST_2G, act = ACT_VAP_CFG, opt = "wep_type4",    val = {"64", "128", "152"}},
        {cfg = CFG_HST_2G, act = ACT_VAP_CFG, opt = "wep_key1",     cvt = "wep_key"},
        {cfg = CFG_HST_2G, act = ACT_VAP_CFG, opt = "wep_key2",     cvt = "wep_key"},
        {cfg = CFG_HST_2G, act = ACT_VAP_CFG, opt = "wep_key3",     cvt = "wep_key"},
        {cfg = CFG_HST_2G, act = ACT_VAP_CFG, opt = "wep_key4",     cvt = "wep_key"},
        {cfg = CFG_DEV_2G, act = ACT_DEV_CFG, opt = "airtime_fairness",      cvt = "on_off"},
        {cfg = CFG_DEV_2G, act = ACT_DEV_CFG, opt = "mu_mimo",      cvt = "on_off"},
    },

    syspara_2g = {
        {cfg = CFG_DEV_2G, act = ACT_NOTHING, opt = "disabled"},
        {cfg = CFG_DEV_2G, act = ACT_NOTHING, cvt = "extinfo"},
        {cfg = CFG_DEV_2G, act = ACT_DEV_CFG, opt = "channel"},
        {cfg = CFG_DEV_2G, act = ACT_DEV_CFG, opt = "beacon_int"},
        {cfg = CFG_DEV_2G, act = ACT_DEV_CFG, opt = "rts"},
        {cfg = CFG_DEV_2G, act = ACT_DEV_CFG, opt = "frag"},
        {cfg = CFG_DEV_2G, act = ACT_DEV_CFG, opt = "dtim_period"},
        {cfg = CFG_DEV_2G, act = ACT_DEV_CFG, opt = "wpa_group_rekey"},
        {cfg = CFG_DEV_2G, act = ACT_DEV_CFG, opt = "wmm",          cvt = "on_off"},
        {cfg = CFG_DEV_2G, act = ACT_DEV_CFG, opt = "shortgi",      cvt = "on_off"},
        {cfg = CFG_DEV_2G, act = ACT_DEV_CFG, opt = "isolate",      cvt = "on_off"},
		{cfg = CFG_DEV_2G, act = ACT_DEV_CFG, opt = "usb_interference_reduction",      cvt = "on_off"},
        {cfg = CFG_STA_2G, act = ACT_VAP_CFG, opt = "enable",       cvt = "on_off"},
        {cfg = CFG_STA_2G, act = ACT_VAP_CFG, opt = "ssid",         cvt = "root_ssid"},
        {cfg = CFG_STA_2G, act = ACT_VAP_CFG, opt = "bssid"},
        {cfg = CFG_STA_2G, act = ACT_VAP_CFG, opt = "encryption",   val = {"none", "psk", "psk_sae", "owe", "wep"}},
        {cfg = CFG_STA_2G, act = ACT_VAP_CFG, opt = "psk_key"},
        {cfg = CFG_STA_2G, act = ACT_VAP_CFG, opt = "wep_mode",     val = {"auto", "open", "shared"}},
        {cfg = CFG_STA_2G, act = ACT_VAP_CFG, opt = "wep_select",   val = {"1", "2", "3", "4"}},
        {cfg = CFG_STA_2G, act = ACT_VAP_CFG, opt = "wep_format1",  val = {"asic", "hex"}},
        {cfg = CFG_STA_2G, act = ACT_VAP_CFG, opt = "wep_format2",  val = {"asic", "hex"}},
        {cfg = CFG_STA_2G, act = ACT_VAP_CFG, opt = "wep_format3",  val = {"asic", "hex"}},
        {cfg = CFG_STA_2G, act = ACT_VAP_CFG, opt = "wep_format4",  val = {"asic", "hex"}},
        {cfg = CFG_STA_2G, act = ACT_VAP_CFG, opt = "wep_type1",    val = {"64", "128", "152"}},
        {cfg = CFG_STA_2G, act = ACT_VAP_CFG, opt = "wep_type2",    val = {"64", "128", "152"}},
        {cfg = CFG_STA_2G, act = ACT_VAP_CFG, opt = "wep_type3",    val = {"64", "128", "152"}},
        {cfg = CFG_STA_2G, act = ACT_VAP_CFG, opt = "wep_type4",    val = {"64", "128", "152"}},
        {cfg = CFG_STA_2G, act = ACT_VAP_CFG, opt = "wep_key1",     cvt = "wep_key"},
        {cfg = CFG_STA_2G, act = ACT_VAP_CFG, opt = "wep_key2",     cvt = "wep_key"},
        {cfg = CFG_STA_2G, act = ACT_VAP_CFG, opt = "wep_key3",     cvt = "wep_key"},
        {cfg = CFG_STA_2G, act = ACT_VAP_CFG, opt = "wep_key4",     cvt = "wep_key"},
        {cfg = CFG_STA_2G, act = ACT_VAP_CFG, opt = "wds_mode",     val = {"0", "1", "2"}},
        {cfg = CFG_DEV_2G, act = ACT_DEV_CFG, opt = "airtime_fairness",      cvt = "on_off"},
    },

    guest_2g = {
        {cfg = CFG_DEV_2G, act = ACT_NOTHING, opt = "disabled"},
        {cfg = CFG_DEV_2G, act = ACT_NOTHING, opt = "disabled_by", val = {"0", "1"}},
        {cfg = CFG_DEV_2G, act = ACT_NOTHING, cvt = "extinfo"},
        {cfg = CFG_GST_2G, act = ACT_VAP_CFG, opt = "enable",      cvt = "on_off"},
        {cfg = CFG_GST_2G, act = ACT_VAP_CFG, opt = "ssid"},
        {cfg = CFG_GST_2G, act = ACT_VAP_CFG, opt = "hidden",      cvt = "on_off"},

        {cfg = CFG_GST_2G, act = ACT_VAP_CFG, opt = "encryption",   val = {"none", "psk", "psk_sae", "owe", "wpa", "wpa3", "wep"}},
        {cfg = CFG_GST_2G, act = ACT_VAP_CFG, opt = "psk_version",  val = {"auto", "wpa", "rsn", "sae_transition", "sae_only", "owe_transition", "owe_only"}},
        {cfg = CFG_GST_2G, act = ACT_VAP_CFG, opt = "psk_cipher",  val = {"auto", "aes", "ccmp", "tkip"}},
        {cfg = CFG_GST_2G, act = ACT_VAP_CFG, opt = "psk_key"},
    
    },

    wireless_5g = {
        {cfg = CFG_DEV_5G, act = ACT_NOTHING, opt = "macaddr"},
        {cfg = CFG_DEV_5G, act = ACT_DEVMODE, opt = "disabled",     cvt = "on_off"},
        {cfg = CFG_DEV_5G, act = ACT_RE_LOAD, opt = "disabled_all"},--, cvt = "on_off"},
        {cfg = CFG_DEV_5G, act = ACT_NOTHING, opt = "disabled_by", val = {"0", "1"}},
        {cfg = CFG_DEV_5G, act = ACT_NOTHING, cvt = "extinfo"},
        {cfg = CFG_STA_5G, act = ACT_NOTHING, cvt = "wds_status"},        
        {cfg = CFG_DEV_5G, act = ACT_DEVMODE, opt = "hwmode",       val = {"n_5", "ac_5", "an_5", "nac_5", "anac_5", "ax_5", "anacax_5"}},
        {cfg = CFG_DEV_5G, act = ACT_DEVMODE, opt = "htmode",       cvt = "htmode_5g"},
        {cfg = CFG_DEV_5G, act = ACT_DEVMODE, opt = "channel",      cvt = "channel_5g"},
        {cfg = CFG_DEV_5G, act = ACT_DEVMODE, opt = "txpower",      val = {"low", "middle", "high"}},
        {cfg = CFG_VAP_5G, act = ACT_NOTHING, cvt = "current_channel"},
        {cfg = CFG_HST_5G, act = ACT_VAP_CFG, opt = "enable"},--,       cvt = "on_off"},
        {cfg = CFG_HST_5G, act = ACT_VAP_CFG, opt = "ssid"},
        {cfg = CFG_HST_5G, act = ACT_VAP_CFG, opt = "wps_state"},
        {cfg = CFG_HST_5G, act = ACT_VAP_CFG, opt = "hidden",       cvt = "on_off"},
        {cfg = CFG_HST_5G, act = ACT_VAP_CFG, opt = "encryption",   val = {"none", "psk", "psk_sae", "owe", "wpa", "wpa3", "wep"}},
        {cfg = CFG_HST_5G, act = ACT_VAP_CFG, opt = "psk_version",  val = {"auto", "wpa", "rsn", "sae_transition", "sae_only", "owe_transition", "owe_only"}},
        {cfg = CFG_HST_5G, act = ACT_VAP_CFG, opt = "psk_cipher",   val = {"auto", "aes", "ccmp", "tkip"}},
        {cfg = CFG_HST_5G, act = ACT_VAP_CFG, opt = "psk_key"},
        {cfg = CFG_HST_5G, act = ACT_VAP_CFG, opt = "server"},
        {cfg = CFG_HST_5G, act = ACT_VAP_CFG, opt = "port"},
        {cfg = CFG_HST_5G, act = ACT_VAP_CFG, opt = "wpa_key"},
        {cfg = CFG_HST_5G, act = ACT_VAP_CFG, opt = "wpa_version",  val = {"auto", "wpa", "wpa3", "rsn"}},
        {cfg = CFG_HST_5G, act = ACT_VAP_CFG, opt = "wpa_cipher",   val = {"auto", "aes", "ccmp", "tkip", "gcmp"}},
        {cfg = CFG_HST_5G, act = ACT_VAP_CFG, opt = "wep_mode",     val = {"auto", "open", "shared"}},
        {cfg = CFG_HST_5G, act = ACT_VAP_CFG, opt = "wep_select",   val = {"1", "2", "3", "4"}},
        {cfg = CFG_HST_5G, act = ACT_VAP_CFG, opt = "wep_format1",  val = {"asic", "hex"}},
        {cfg = CFG_HST_5G, act = ACT_VAP_CFG, opt = "wep_format2",  val = {"asic", "hex"}},
        {cfg = CFG_HST_5G, act = ACT_VAP_CFG, opt = "wep_format3",  val = {"asic", "hex"}},
        {cfg = CFG_HST_5G, act = ACT_VAP_CFG, opt = "wep_format4",  val = {"asic", "hex"}},
        {cfg = CFG_HST_5G, act = ACT_VAP_CFG, opt = "wep_type1",    val = {"64", "128", "152"}},
        {cfg = CFG_HST_5G, act = ACT_VAP_CFG, opt = "wep_type2",    val = {"64", "128", "152"}},
        {cfg = CFG_HST_5G, act = ACT_VAP_CFG, opt = "wep_type3",    val = {"64", "128", "152"}},
        {cfg = CFG_HST_5G, act = ACT_VAP_CFG, opt = "wep_type4",    val = {"64", "128", "152"}},
        {cfg = CFG_HST_5G, act = ACT_VAP_CFG, opt = "wep_key1",     cvt = "wep_key"},
        {cfg = CFG_HST_5G, act = ACT_VAP_CFG, opt = "wep_key2",     cvt = "wep_key"},
        {cfg = CFG_HST_5G, act = ACT_VAP_CFG, opt = "wep_key3",     cvt = "wep_key"},
        {cfg = CFG_HST_5G, act = ACT_VAP_CFG, opt = "wep_key4",     cvt = "wep_key"},
        {cfg = CFG_DEV_5G, act = ACT_DEV_CFG, opt = "airtime_fairness",      cvt = "on_off"},
        {cfg = CFG_DEV_5G, act = ACT_DEV_CFG, opt = "mu_mimo",      cvt = "on_off"},
    },

    wireless_5g_2 = {
        {cfg = CFG_DEV_5G_2, act = ACT_NOTHING, opt = "macaddr"},
        {cfg = CFG_DEV_5G_2, act = ACT_DEVMODE, opt = "disabled",     cvt = "on_off"},
        {cfg = CFG_DEV_5G_2, act = ACT_RE_LOAD, opt = "disabled_all"},--, cvt = "on_off"},
        {cfg = CFG_DEV_5G_2, act = ACT_NOTHING, opt = "disabled_by", val = {"0", "1"}},
        {cfg = CFG_DEV_5G_2, act = ACT_NOTHING, cvt = "extinfo"},
        {cfg = CFG_STA_5G_2, act = ACT_NOTHING, cvt = "wds_status"},        
        {cfg = CFG_DEV_5G_2, act = ACT_DEVMODE, opt = "hwmode",       val = {"n_5", "ac_5", "an_5", "nac_5", "anac_5", "ax_5", "anacax_5"}},
        {cfg = CFG_DEV_5G_2, act = ACT_DEVMODE, opt = "htmode",       cvt = "htmode_5g_2"},
        {cfg = CFG_DEV_5G_2, act = ACT_DEVMODE, opt = "channel",      cvt = "channel_5g_2"},
        {cfg = CFG_DEV_5G_2, act = ACT_DEVMODE, opt = "txpower",      val = {"low", "middle", "high"}},
        {cfg = CFG_VAP_5G_2, act = ACT_NOTHING, cvt = "current_channel"},
        {cfg = CFG_HST_5G_2, act = ACT_VAP_CFG, opt = "enable"},--,       cvt = "on_off"},
        {cfg = CFG_HST_5G_2, act = ACT_VAP_CFG, opt = "ssid"},
        {cfg = CFG_HST_5G_2, act = ACT_VAP_CFG, opt = "wps_state"},
        {cfg = CFG_HST_5G_2, act = ACT_VAP_CFG, opt = "hidden",       cvt = "on_off"},
        {cfg = CFG_HST_5G_2, act = ACT_VAP_CFG, opt = "encryption",   val = {"none", "psk", "psk_sae", "owe", "wpa", "wpa3", "wep"}},
        {cfg = CFG_HST_5G_2, act = ACT_VAP_CFG, opt = "psk_version",  val = {"auto", "wpa", "rsn", "sae_transition", "sae_only",  "owe_transition", "owe_only"}},
        {cfg = CFG_HST_5G_2, act = ACT_VAP_CFG, opt = "psk_cipher",   val = {"auto", "aes", "ccmp", "tkip"}},
        {cfg = CFG_HST_5G_2, act = ACT_VAP_CFG, opt = "psk_key"},
        {cfg = CFG_HST_5G_2, act = ACT_VAP_CFG, opt = "server"},
        {cfg = CFG_HST_5G_2, act = ACT_VAP_CFG, opt = "port"},
        {cfg = CFG_HST_5G_2, act = ACT_VAP_CFG, opt = "wpa_key"},
        {cfg = CFG_HST_5G_2, act = ACT_VAP_CFG, opt = "wpa_version",  val = {"auto", "wpa", "wpa3", "rsn"}},
        {cfg = CFG_HST_5G_2, act = ACT_VAP_CFG, opt = "wpa_cipher",   val = {"auto", "aes", "ccmp", "tkip", "gcmp"}},
        {cfg = CFG_HST_5G_2, act = ACT_VAP_CFG, opt = "wep_mode",     val = {"auto", "open", "shared"}},
        {cfg = CFG_HST_5G_2, act = ACT_VAP_CFG, opt = "wep_select",   val = {"1", "2", "3", "4"}},
        {cfg = CFG_HST_5G_2, act = ACT_VAP_CFG, opt = "wep_format1",  val = {"asic", "hex"}},
        {cfg = CFG_HST_5G_2, act = ACT_VAP_CFG, opt = "wep_format2",  val = {"asic", "hex"}},
        {cfg = CFG_HST_5G_2, act = ACT_VAP_CFG, opt = "wep_format3",  val = {"asic", "hex"}},
        {cfg = CFG_HST_5G_2, act = ACT_VAP_CFG, opt = "wep_format4",  val = {"asic", "hex"}},
        {cfg = CFG_HST_5G_2, act = ACT_VAP_CFG, opt = "wep_type1",    val = {"64", "128", "152"}},
        {cfg = CFG_HST_5G_2, act = ACT_VAP_CFG, opt = "wep_type2",    val = {"64", "128", "152"}},
        {cfg = CFG_HST_5G_2, act = ACT_VAP_CFG, opt = "wep_type3",    val = {"64", "128", "152"}},
        {cfg = CFG_HST_5G_2, act = ACT_VAP_CFG, opt = "wep_type4",    val = {"64", "128", "152"}},
        {cfg = CFG_HST_5G_2, act = ACT_VAP_CFG, opt = "wep_key1",     cvt = "wep_key"},
        {cfg = CFG_HST_5G_2, act = ACT_VAP_CFG, opt = "wep_key2",     cvt = "wep_key"},
        {cfg = CFG_HST_5G_2, act = ACT_VAP_CFG, opt = "wep_key3",     cvt = "wep_key"},
        {cfg = CFG_HST_5G_2, act = ACT_VAP_CFG, opt = "wep_key4",     cvt = "wep_key"},
        {cfg = CFG_DEV_5G_2, act = ACT_DEV_CFG, opt = "airtime_fairness",      cvt = "on_off"},
        {cfg = CFG_DEV_5G_2, act = ACT_DEV_CFG, opt = "mu_mimo",      cvt = "on_off"},
    },

    wireless_6g = {
        {cfg = CFG_DEV_6G, act = ACT_NOTHING, opt = "macaddr"},
        {cfg = CFG_DEV_6G, act = ACT_DEVMODE, opt = "disabled",     cvt = "on_off"},
        {cfg = CFG_DEV_6G, act = ACT_RE_LOAD, opt = "disabled_all"},--, cvt = "on_off"},
        {cfg = CFG_DEV_6G, act = ACT_NOTHING, opt = "disabled_by", val = {"0", "1"}},
        {cfg = CFG_DEV_6G, act = ACT_NOTHING, cvt = "extinfo"},
        {cfg = CFG_STA_6G, act = ACT_NOTHING, cvt = "wds_status"},        
        {cfg = CFG_DEV_6G, act = ACT_DEVMODE, opt = "hwmode",       val = {"n_5", "ac_5", "an_5", "nac_5", "anac_5", "ax_5", "anacax_5"}},
        {cfg = CFG_DEV_6G, act = ACT_DEVMODE, opt = "htmode",       cvt = "htmode_6g"},
        {cfg = CFG_DEV_6G, act = ACT_DEVMODE, opt = "channel",      cvt = "channel_6g"},
        {cfg = CFG_DEV_6G, act = ACT_DEVMODE, opt = "txpower",      val = {"low", "middle", "high"}},
        {cfg = CFG_VAP_6G, act = ACT_NOTHING, cvt = "current_channel"},
        {cfg = CFG_HST_6G, act = ACT_VAP_CFG, opt = "enable"},--,       cvt = "on_off"},
        {cfg = CFG_HST_6G, act = ACT_VAP_CFG, opt = "ssid"},
        {cfg = CFG_HST_6G, act = ACT_VAP_CFG, opt = "wps_state"},
        {cfg = CFG_HST_6G, act = ACT_VAP_CFG, opt = "hidden",       cvt = "on_off"},
        {cfg = CFG_HST_6G, act = ACT_VAP_CFG, opt = "encryption",   val = {"none", "psk", "psk_sae", "owe", "wpa", "wpa3", "wep"}},
        {cfg = CFG_HST_6G, act = ACT_VAP_CFG, opt = "psk_version",  val = {"auto", "wpa", "rsn", "sae_transition", "sae_only", "owe_transition", "owe_only"}},
        {cfg = CFG_HST_6G, act = ACT_VAP_CFG, opt = "psk_cipher",   val = {"auto", "aes", "ccmp", "tkip"}},
        {cfg = CFG_HST_6G, act = ACT_VAP_CFG, opt = "psk_key"},
        {cfg = CFG_HST_6G, act = ACT_VAP_CFG, opt = "server"},
        {cfg = CFG_HST_6G, act = ACT_VAP_CFG, opt = "port"},
        {cfg = CFG_HST_6G, act = ACT_VAP_CFG, opt = "wpa_key"},
        {cfg = CFG_HST_6G, act = ACT_VAP_CFG, opt = "wpa_version",  val = {"auto", "wpa", "wpa3", "rsn"}},
        {cfg = CFG_HST_6G, act = ACT_VAP_CFG, opt = "wpa_cipher",   val = {"auto", "aes", "ccmp", "tkip", "gcmp"}},
        {cfg = CFG_HST_6G, act = ACT_VAP_CFG, opt = "wep_mode",     val = {"auto", "open", "shared"}},
        {cfg = CFG_HST_6G, act = ACT_VAP_CFG, opt = "wep_select",   val = {"1", "2", "3", "4"}},
        {cfg = CFG_HST_6G, act = ACT_VAP_CFG, opt = "wep_format1",  val = {"asic", "hex"}},
        {cfg = CFG_HST_6G, act = ACT_VAP_CFG, opt = "wep_format2",  val = {"asic", "hex"}},
        {cfg = CFG_HST_6G, act = ACT_VAP_CFG, opt = "wep_format3",  val = {"asic", "hex"}},
        {cfg = CFG_HST_6G, act = ACT_VAP_CFG, opt = "wep_format4",  val = {"asic", "hex"}},
        {cfg = CFG_HST_6G, act = ACT_VAP_CFG, opt = "wep_type1",    val = {"64", "128", "152"}},
        {cfg = CFG_HST_6G, act = ACT_VAP_CFG, opt = "wep_type2",    val = {"64", "128", "152"}},
        {cfg = CFG_HST_6G, act = ACT_VAP_CFG, opt = "wep_type3",    val = {"64", "128", "152"}},
        {cfg = CFG_HST_6G, act = ACT_VAP_CFG, opt = "wep_type4",    val = {"64", "128", "152"}},
        {cfg = CFG_HST_6G, act = ACT_VAP_CFG, opt = "wep_key1",     cvt = "wep_key"},
        {cfg = CFG_HST_6G, act = ACT_VAP_CFG, opt = "wep_key2",     cvt = "wep_key"},
        {cfg = CFG_HST_6G, act = ACT_VAP_CFG, opt = "wep_key3",     cvt = "wep_key"},
        {cfg = CFG_HST_6G, act = ACT_VAP_CFG, opt = "wep_key4",     cvt = "wep_key"},
        {cfg = CFG_DEV_6G, act = ACT_DEV_CFG, opt = "airtime_fairness",      cvt = "on_off"},
        {cfg = CFG_DEV_6G, act = ACT_DEV_CFG, opt = "mu_mimo",      cvt = "on_off"},
        {cfg = CFG_DEV_6G, act = ACT_DEV_CFG, opt = "psc",          cvt = "on_off"},
    },

    syspara_5g = {
        {cfg = CFG_DEV_5G, act = ACT_NOTHING, opt = "disabled"},
        {cfg = CFG_DEV_5G, act = ACT_NOTHING, cvt = "extinfo"},
        {cfg = CFG_DEV_5G, act = ACT_DEV_CFG, opt = "channel"},
        {cfg = CFG_DEV_5G, act = ACT_DEV_CFG, opt = "beacon_int"},
        {cfg = CFG_DEV_5G, act = ACT_DEV_CFG, opt = "rts"},
        {cfg = CFG_DEV_5G, act = ACT_DEV_CFG, opt = "frag"},
        {cfg = CFG_DEV_5G, act = ACT_DEV_CFG, opt = "dtim_period"},
        {cfg = CFG_DEV_5G, act = ACT_DEV_CFG, opt = "wpa_group_rekey"},
        {cfg = CFG_DEV_5G, act = ACT_DEV_CFG, opt = "wmm",         cvt = "on_off"},
        {cfg = CFG_DEV_5G, act = ACT_DEV_CFG, opt = "shortgi",     cvt = "on_off"},
        {cfg = CFG_DEV_5G, act = ACT_DEV_CFG, opt = "isolate",     cvt = "on_off"},
        {cfg = CFG_STA_5G, act = ACT_VAP_CFG, opt = "enable",      cvt = "on_off"},
        {cfg = CFG_STA_5G, act = ACT_VAP_CFG, opt = "ssid",        cvt = "root_ssid"},
        {cfg = CFG_STA_5G, act = ACT_VAP_CFG, opt = "bssid"},
        {cfg = CFG_STA_5G, act = ACT_VAP_CFG, opt = "encryption",  val = {"none", "psk", "psk_sae", "owe", "wep"}},
        {cfg = CFG_STA_5G, act = ACT_VAP_CFG, opt = "psk_key"},
        {cfg = CFG_STA_5G, act = ACT_VAP_CFG, opt = "wep_mode",    val = {"auto", "open", "shared"}},
        {cfg = CFG_STA_5G, act = ACT_VAP_CFG, opt = "wep_select",  val = {"1", "2", "3", "4"}},
        {cfg = CFG_STA_5G, act = ACT_VAP_CFG, opt = "wep_format1", val = {"asic", "hex"}},
        {cfg = CFG_STA_5G, act = ACT_VAP_CFG, opt = "wep_format2", val = {"asic", "hex"}},
        {cfg = CFG_STA_5G, act = ACT_VAP_CFG, opt = "wep_format3", val = {"asic", "hex"}},
        {cfg = CFG_STA_5G, act = ACT_VAP_CFG, opt = "wep_format4", val = {"asic", "hex"}},
        {cfg = CFG_STA_5G, act = ACT_VAP_CFG, opt = "wep_type1",   val = {"64", "128", "152"}},
        {cfg = CFG_STA_5G, act = ACT_VAP_CFG, opt = "wep_type2",   val = {"64", "128", "152"}},
        {cfg = CFG_STA_5G, act = ACT_VAP_CFG, opt = "wep_type3",   val = {"64", "128", "152"}},
        {cfg = CFG_STA_5G, act = ACT_VAP_CFG, opt = "wep_type4",   val = {"64", "128", "152"}},
        {cfg = CFG_STA_5G, act = ACT_VAP_CFG, opt = "wep_key1",    cvt = "wep_key"},
        {cfg = CFG_STA_5G, act = ACT_VAP_CFG, opt = "wep_key2",    cvt = "wep_key"},
        {cfg = CFG_STA_5G, act = ACT_VAP_CFG, opt = "wep_key3",    cvt = "wep_key"},
        {cfg = CFG_STA_5G, act = ACT_VAP_CFG, opt = "wep_key4",    cvt = "wep_key"},
        {cfg = CFG_STA_5G, act = ACT_VAP_CFG, opt = "wds_mode",    val = {"0", "1", "2"}},
        {cfg = CFG_DEV_5G, act = ACT_DEV_CFG, opt = "airtime_fairness",      cvt = "on_off"},
        {cfg = CFG_DEV_5G, act = ACT_DEV_CFG, opt = "zerowait_dfs",      val = {"on", "off"}},
    },

    syspara_5g_2 = {
        {cfg = CFG_DEV_5G_2, act = ACT_NOTHING, opt = "disabled"},
        {cfg = CFG_DEV_5G_2, act = ACT_NOTHING, cvt = "extinfo"},
        {cfg = CFG_DEV_5G_2, act = ACT_DEV_CFG, opt = "beacon_int"},
        {cfg = CFG_DEV_5G_2, act = ACT_DEV_CFG, opt = "rts"},
        {cfg = CFG_DEV_5G_2, act = ACT_DEV_CFG, opt = "frag"},
        {cfg = CFG_DEV_5G_2, act = ACT_DEV_CFG, opt = "dtim_period"},
        {cfg = CFG_DEV_5G_2, act = ACT_DEV_CFG, opt = "wpa_group_rekey"},
        {cfg = CFG_DEV_5G_2, act = ACT_DEV_CFG, opt = "wmm",         cvt = "on_off"},
        {cfg = CFG_DEV_5G_2, act = ACT_DEV_CFG, opt = "shortgi",     cvt = "on_off"},
        {cfg = CFG_DEV_5G_2, act = ACT_DEV_CFG, opt = "isolate",     cvt = "on_off"},
        {cfg = CFG_STA_5G_2, act = ACT_VAP_CFG, opt = "enable",      cvt = "on_off"},
        {cfg = CFG_STA_5G_2, act = ACT_VAP_CFG, opt = "ssid",        cvt = "root_ssid"},
        {cfg = CFG_STA_5G_2, act = ACT_VAP_CFG, opt = "bssid"},
        {cfg = CFG_STA_5G_2, act = ACT_VAP_CFG, opt = "encryption",  val = {"none", "psk", "psk_sae", "owe", "wep"}},
        {cfg = CFG_STA_5G_2, act = ACT_VAP_CFG, opt = "psk_key"},
        {cfg = CFG_STA_5G_2, act = ACT_VAP_CFG, opt = "wep_mode",    val = {"auto", "open", "shared"}},
        {cfg = CFG_STA_5G_2, act = ACT_VAP_CFG, opt = "wep_select",  val = {"1", "2", "3", "4"}},
        {cfg = CFG_STA_5G_2, act = ACT_VAP_CFG, opt = "wep_format1", val = {"asic", "hex"}},
        {cfg = CFG_STA_5G_2, act = ACT_VAP_CFG, opt = "wep_format2", val = {"asic", "hex"}},
        {cfg = CFG_STA_5G_2, act = ACT_VAP_CFG, opt = "wep_format3", val = {"asic", "hex"}},
        {cfg = CFG_STA_5G_2, act = ACT_VAP_CFG, opt = "wep_format4", val = {"asic", "hex"}},
        {cfg = CFG_STA_5G_2, act = ACT_VAP_CFG, opt = "wep_type1",   val = {"64", "128", "152"}},
        {cfg = CFG_STA_5G_2, act = ACT_VAP_CFG, opt = "wep_type2",   val = {"64", "128", "152"}},
        {cfg = CFG_STA_5G_2, act = ACT_VAP_CFG, opt = "wep_type3",   val = {"64", "128", "152"}},
        {cfg = CFG_STA_5G_2, act = ACT_VAP_CFG, opt = "wep_type4",   val = {"64", "128", "152"}},
        {cfg = CFG_STA_5G_2, act = ACT_VAP_CFG, opt = "wep_key1",    cvt = "wep_key"},
        {cfg = CFG_STA_5G_2, act = ACT_VAP_CFG, opt = "wep_key2",    cvt = "wep_key"},
        {cfg = CFG_STA_5G_2, act = ACT_VAP_CFG, opt = "wep_key3",    cvt = "wep_key"},
        {cfg = CFG_STA_5G_2, act = ACT_VAP_CFG, opt = "wep_key4",    cvt = "wep_key"},
        {cfg = CFG_STA_5G_2, act = ACT_VAP_CFG, opt = "wds_mode",    val = {"0", "1", "2"}},
        {cfg = CFG_DEV_5G_2, act = ACT_DEV_CFG, opt = "airtime_fairness",      cvt = "on_off"},
        {cfg = CFG_DEV_5G_2, act = ACT_DEV_CFG, opt = "zerowait_dfs",      val = {"on", "off"}},
    },

    syspara_6g = {
        {cfg = CFG_DEV_6G, act = ACT_NOTHING, opt = "disabled"},
        {cfg = CFG_DEV_6G, act = ACT_NOTHING, cvt = "extinfo"},
        {cfg = CFG_DEV_6G, act = ACT_DEV_CFG, opt = "beacon_int"},
        {cfg = CFG_DEV_6G, act = ACT_DEV_CFG, opt = "rts"},
        {cfg = CFG_DEV_6G, act = ACT_DEV_CFG, opt = "frag"},
        {cfg = CFG_DEV_6G, act = ACT_DEV_CFG, opt = "dtim_period"},
        {cfg = CFG_DEV_6G, act = ACT_DEV_CFG, opt = "wpa_group_rekey"},
        {cfg = CFG_DEV_6G, act = ACT_DEV_CFG, opt = "wmm",         cvt = "on_off"},
        {cfg = CFG_DEV_6G, act = ACT_DEV_CFG, opt = "shortgi",     cvt = "on_off"},
        {cfg = CFG_DEV_6G, act = ACT_DEV_CFG, opt = "isolate",     cvt = "on_off"},
        {cfg = CFG_STA_6G, act = ACT_VAP_CFG, opt = "enable",      cvt = "on_off"},
        {cfg = CFG_STA_6G, act = ACT_VAP_CFG, opt = "ssid",        cvt = "root_ssid"},
        {cfg = CFG_STA_6G, act = ACT_VAP_CFG, opt = "bssid"},
        {cfg = CFG_STA_6G, act = ACT_VAP_CFG, opt = "encryption",  val = {"none", "psk", "psk_sae", "owe", "wep"}},
        {cfg = CFG_STA_6G, act = ACT_VAP_CFG, opt = "psk_key"},
        {cfg = CFG_STA_6G, act = ACT_VAP_CFG, opt = "wep_mode",    val = {"auto", "open", "shared"}},
        {cfg = CFG_STA_6G, act = ACT_VAP_CFG, opt = "wep_select",  val = {"1", "2", "3", "4"}},
        {cfg = CFG_STA_6G, act = ACT_VAP_CFG, opt = "wep_format1", val = {"asic", "hex"}},
        {cfg = CFG_STA_6G, act = ACT_VAP_CFG, opt = "wep_format2", val = {"asic", "hex"}},
        {cfg = CFG_STA_6G, act = ACT_VAP_CFG, opt = "wep_format3", val = {"asic", "hex"}},
        {cfg = CFG_STA_6G, act = ACT_VAP_CFG, opt = "wep_format4", val = {"asic", "hex"}},
        {cfg = CFG_STA_6G, act = ACT_VAP_CFG, opt = "wep_type1",   val = {"64", "128", "152"}},
        {cfg = CFG_STA_6G, act = ACT_VAP_CFG, opt = "wep_type2",   val = {"64", "128", "152"}},
        {cfg = CFG_STA_6G, act = ACT_VAP_CFG, opt = "wep_type3",   val = {"64", "128", "152"}},
        {cfg = CFG_STA_6G, act = ACT_VAP_CFG, opt = "wep_type4",   val = {"64", "128", "152"}},
        {cfg = CFG_STA_6G, act = ACT_VAP_CFG, opt = "wep_key1",    cvt = "wep_key"},
        {cfg = CFG_STA_6G, act = ACT_VAP_CFG, opt = "wep_key2",    cvt = "wep_key"},
        {cfg = CFG_STA_6G, act = ACT_VAP_CFG, opt = "wep_key3",    cvt = "wep_key"},
        {cfg = CFG_STA_6G, act = ACT_VAP_CFG, opt = "wep_key4",    cvt = "wep_key"},
        {cfg = CFG_STA_6G, act = ACT_VAP_CFG, opt = "wds_mode",    val = {"0", "1", "2"}},
        {cfg = CFG_DEV_6G, act = ACT_DEV_CFG, opt = "airtime_fairness",      cvt = "on_off"},
        {cfg = CFG_DEV_6G, act = ACT_DEV_CFG, opt = "zerowait_dfs",      val = {"on", "off"}},
    },

    guest_5g = {
        {cfg = CFG_DEV_5G, act = ACT_NOTHING, opt = "disabled"},
        {cfg = CFG_DEV_5G, act = ACT_NOTHING, opt = "disabled_by", val = {"0", "1"}},
        {cfg = CFG_DEV_5G, act = ACT_NOTHING, cvt = "extinfo"},
        {cfg = CFG_GST_5G, act = ACT_VAP_CFG, opt = "enable",      cvt = "on_off"},
        {cfg = CFG_GST_5G, act = ACT_VAP_CFG, opt = "ssid"},
        {cfg = CFG_GST_5G, act = ACT_VAP_CFG, opt = "hidden",      cvt = "on_off"},

        {cfg = CFG_GST_5G, act = ACT_VAP_CFG, opt = "encryption",  val = {"none", "psk", "psk_sae", "owe", "wpa", "wpa3", "wep"}},
        {cfg = CFG_GST_5G, act = ACT_VAP_CFG, opt = "psk_version",  val = {"auto", "wpa", "rsn", "sae_transition", "sae_only", "owe_transition", "owe_only"}},
        {cfg = CFG_GST_5G, act = ACT_VAP_CFG, opt = "psk_cipher",  val = {"auto", "aes", "ccmp", "tkip"}},
        {cfg = CFG_GST_5G, act = ACT_VAP_CFG, opt = "psk_key"},
    
    },

    guest_5g_2 = {
        {cfg = CFG_DEV_5G_2, act = ACT_NOTHING, opt = "disabled"},
        {cfg = CFG_DEV_5G_2, act = ACT_NOTHING, opt = "disabled_by", val = {"0", "1"}},
        {cfg = CFG_DEV_5G_2, act = ACT_NOTHING, cvt = "extinfo"},
        {cfg = CFG_GST_5G_2, act = ACT_VAP_CFG, opt = "enable",      cvt = "on_off"},
        {cfg = CFG_GST_5G_2, act = ACT_VAP_CFG, opt = "ssid"},
        {cfg = CFG_GST_5G_2, act = ACT_VAP_CFG, opt = "hidden",      cvt = "on_off"},
    
        {cfg = CFG_GST_5G_2, act = ACT_VAP_CFG, opt = "encryption",  val = {"none", "psk", "psk_sae", "owe", "wpa", "wpa3", "wep"}},
        {cfg = CFG_GST_5G_2, act = ACT_VAP_CFG, opt = "psk_version",  val = {"auto", "wpa", "rsn", "sae_transition", "sae_only", "owe_transition", "owe_only"}},
        {cfg = CFG_GST_5G_2, act = ACT_VAP_CFG, opt = "psk_cipher",  val = {"auto", "aes", "ccmp", "tkip"}},
        {cfg = CFG_GST_5G_2, act = ACT_VAP_CFG, opt = "psk_key"},
    
    },

    guest_6g = {
        {cfg = CFG_DEV_6G, act = ACT_NOTHING, opt = "disabled"},
        {cfg = CFG_DEV_6G, act = ACT_NOTHING, opt = "disabled_by", val = {"0", "1"}},
        {cfg = CFG_DEV_6G, act = ACT_NOTHING, cvt = "extinfo"},
        {cfg = CFG_GST_6G, act = ACT_VAP_CFG, opt = "enable",      cvt = "on_off"},
        {cfg = CFG_GST_6G, act = ACT_VAP_CFG, opt = "ssid"},
        {cfg = CFG_GST_6G, act = ACT_VAP_CFG, opt = "hidden",      cvt = "on_off"},
    
        {cfg = CFG_GST_6G, act = ACT_VAP_CFG, opt = "encryption",  val = {"none", "psk", "psk_sae", "owe", "wpa", "wpa3", "wep"}},
        {cfg = CFG_GST_6G, act = ACT_VAP_CFG, opt = "psk_version",  val = {"auto", "wpa", "rsn", "sae_transition", "sae_only", "owe_transition", "owe_only"}},
        {cfg = CFG_GST_6G, act = ACT_VAP_CFG, opt = "psk_cipher",  val = {"auto", "aes", "ccmp", "tkip"}},
        {cfg = CFG_GST_6G, act = ACT_VAP_CFG, opt = "psk_key"},
    },

    guest_2g5g = {
        {cfg = CFG_GST_AL, act = ACT_VAP_CFG, opt = "passwd_cycle", val = {"daily", "weekly", "monthly", "never"}},
        {cfg = CFG_GST_AL, act = ACT_VAP_CFG, opt = "encryption",  val = {"none", "psk", "psk_sae", "owe", "portal"}},
        {cfg = CFG_GST_AL, act = ACT_VAP_CFG, opt = "psk_version",  val = {"auto", "wpa", "rsn", "sae_transition", "sae_only", "owe_transition", "owe_only"}},
        {cfg = CFG_GST_AL, act = ACT_VAP_CFG, opt = "psk_cipher",  val = {"auto", "aes", "ccmp", "tkip"}},
        {cfg = CFG_GST_AL, act = ACT_VAP_CFG, opt = "psk_key"},
        {cfg = CFG_GST_AL, act = ACT_VAP_CFG, opt = "authentication_type", val = {"simple","none"}},
        {cfg = CFG_GST_AL, act = ACT_VAP_CFG, opt = "portal_password"},
        {cfg = CFG_GST_AL, act = ACT_VAP_CFG, opt = "authentication_timeout"},
        {cfg = CFG_GST_AL, act = ACT_VAP_CFG, opt = "redirect",    cvt = "on_off"},
        {cfg = CFG_GST_AL, act = ACT_VAP_CFG, opt = "redirect_url"},
    },

    smart_connect = {
        {cfg = CFG_SMART, act = ACT_SMART, opt = "smart_enable", cvt = "on_off"},
    },

    ofdma = {
        {cfg = CFG_OFDMA, act = ACT_DEV_CFG, opt = "enable", cvt = "on_off"},
    },

    twt = {
        {cfg = CFG_TWT, act = ACT_DEV_CFG, opt = "enable", cvt = "on_off"},
    },
}

local wifi_info = nil

--Get the cached iwinfo lib.
local function get_iwinfo()
    if not wifi_info then
        local stat, iwinfo = pcall(require, "iwinfo")
        wifi_info = iwinfo
    end
    return wifi_info
end

--- Get country
-- @para N/A
-- @return country or nil
function wireless_get_country()
	local wifi_dev = uci_r:get_first("wireless", "wifi-device")
	if wifi_dev ~= nil then
	    return uci_r:get("wireless", wifi_dev, "country")
	else
	    return nil
	end
end

--- Get the wireless supports triband or not
-- @para N/A
-- @return
function wireless_support_triband()
	local support_triband
	support_triband = uci_r:get_profile("wireless","support_triband") or "no"
	return support_triband
end

--- Get the wireless supports 6g or not
-- @para N/A
-- @return
function wireless_support_6g()
	local support_6g
	support_6g = uci_r:get_profile("wireless","support_6g") or "no"
	return support_6g
end

--- Get the wireless supports dfs
-- @para N/A
-- @return
function wireless_support_dfs()
	local support_dfs
    local uci_r = uci.cursor()
    support_dfs = uci_r:get("profile", "profile_diff", "dfs_enab") or "no"
	return support_dfs
end

function wireless_support_csd()
    local uci_r = uci.cursor()

    local wlan_optimize_support = uci_r:get_profile("wireless", "wlan_optimize_support") or "no"
    if wlan_optimize_support and wlan_optimize_support == "yes" then
        return true
    else
        return false
    end
end

function wireless_support_bw160()
    local support_160M
    local uci_r = uci.cursor()
    support_160M = uci_r:get("profile", "profile_diff", "support_160M") or "no"
    return support_160M
end

function wireless_exclude_bw160_5gl()
    local exclude_5gl
    local uci_r = uci.cursor()
    exclude_5gl = uci_r:get("profile", "profile_diff", "exclude_160M_5GL") or "no"
    return exclude_5gl
end

function wireless_exclude_bw160_5gh()
    local exclude_5gh
    local uci_r = uci.cursor()
    exclude_5gh = uci_r:get("profile", "profile_diff", "exclude_160M_5GH") or "no"
    return exclude_5gh
end

function wireless_exclude_bw160_5g()
    local exclude_5gh
    local uci_r = uci.cursor()
    exclude_5gh = uci_r:get("profile", "profile_diff", "exclude_160M_5G") or "no"
    return exclude_5gh
end

-- Generate a radom PIN number.
-- @param NA
-- @return string PIN number 
local function wps_new_pin()
    local acc  = 0
    local pin  = 0
    local seed = tostring(os.time())
    local rnd  = io.open("/dev/urandom", "rb")

    if rnd then
        seed = rnd:read(4)
        rnd:close()
    end

    for i = 1, 4 do
        pin = pin * 256 + string.byte(seed, i)
    end

    math.randomseed(pin % 10000000)
    pin = math.random(100000000)

    if pin < 10000000 then
        pin = pin + 10000000
    end

    for i = 0, 6 do
        acc = acc + (3 - 2 * (i % 2)) * (math.floor(pin / (10 ^ i)) % 10)
    end

    pin = tostring(pin):sub(2, 8) .. tostring((10 - (acc % 10)) % 10)

    return pin
end

-- Get factory default PIN number.
-- @param NA
-- @return string PIN number 
local function wps_def_pin()
    --
    -- get wps pin in firmware
    --
    return sys_config.getsysinfo("PIN")
end

-- Check a PIN number valid or not.
-- @param NA
-- @return bool 
local function wps_check_pin(pin)
    pin = tonumber(pin)

    if pin and pin < 100000000 and pin > 10 then
        local acc = 0
        for i = 1, 7 do
            acc = acc + (1 + 2 * (i % 2)) * (math.floor(pin / (10 ^ i)) % 10)
        end
        return (pin % 10) == ((10 - (acc % 10)) % 10)
    end

    return false
end

-- Execute an WPS command and return the outputs as a table.
-- @param vap Virtual ap interface name
-- @param str WPS command line string
-- @return table WPS command result
local function wps_do_cmd(vap, str)
	local res = {}
	local cmd = " wps %s %s" % {vap, str or ""}
	local util = require("io").popen(APCFG_SHELL..cmd)

	if util then
		local ln, key, val
		while true do
			ln = util:read("*l")
			if ln then 
				if ln == "wps_shell_over" then break end
				key, val = ln:match("([^\:]+)\: (.+)")
				if not key then key = ln end
				res[key] = val or key
				printf(key.." = "..res[key])
			else
				break
			end
		end
		util:close()
	end

	return res
end

-- Debug console output method.
-- @param    str    String to display on console.
-- @return N/A
function printf(str)
    if str then
    -- os.execute("echo %q &>/dev/console" % (str))
    end
end

-- Fork and execute a command.
-- @return N/A
function fork(str, sync)
    if str then
        --os.execute("echo %q &>/dev/console" % (str))
        os.execute(str .. " &>/dev/null" .. (sync and "" or " &"))
    end
end

-- Define class Apcfg.
Apcfg = utl.class()

-- Initialization for Apcfg class.
-- @param    cfg    Config data.
-- @return N/A
function Apcfg:__init__(form, cfg)
    self.change = 1
    self.action = 1
    self.module = "wireless"

    self.uci     = uci.cursor()
    self.section = self:scan_driver()
    self.section[CFG_MACFLT] = {"filter"}
    self.section[CFG_SMART] = {"smart"}
    self.section[CFG_OFDMA] = {"ofdma"}
    self.section[CFG_TWT] = {"twt"}

    local data = {}
    if form and cfg then
        for i, name in ipairs(cfg) do
            for _, item in ipairs(APCFG_DATA[form] or {}) do
                if name == item.opt or name == item.cvt then
                    data[name] = item
                end
            end
        end

    elseif form then
        if type(form) == "table" then
            for i, name in ipairs(form) do
                local prefix = name .. "_"
                for _, item in ipairs(APCFG_DATA[name] or {}) do
                    data[prefix .. (item.opt or item.cvt)] = item
                end
            end
        else
            for _, item in ipairs(APCFG_DATA[form] or {}) do
                data[item.opt or item.cvt] = item
            end
        end
    end

    self.data = data
end

-- Execute an WPS command and return the result.
-- @param vap Virtual ap interface name
-- @param cmd WPS command line string
-- @param data input and output data
-- @return bool WPS command result
function Apcfg:wps_vap_cmd(vap, cmd, data)
    local res

    if cmd == "pbc" then
        res = wps_do_cmd(vap, "pbc")
        if res.OK then 
            return true 
        end
        res = wps_do_cmd(vap, "status")
        data.wps_status = (res["PBC Status"] == "Overlap" and "overlap") or "error"

    elseif  cmd == "pin" then
        if not wps_check_pin(data.pin) then
            data.wps_status = "error"
            return false
        end
        res = wps_do_cmd(vap, "pin "..data.pin)
        if res.OK then 
            return true 
        end
        res = wps_do_cmd(vap, "status")
        data.wps_status = (res["PIN Status"] == "Invalid" and "faild") or "error"

    elseif  cmd == "cancel" then
        res = wps_do_cmd(vap, "cancel")
        if res.OK then
            data.wps_status = "cancel"
            return true
        end

    elseif  cmd == "status" then
        res = wps_do_cmd(vap, "status")
        local method = data.method

        if method ~= "pin" and method ~= "pbc" then
            method = (res["PIN Status"] == "Active" and "pbc") or "pbc"
            data.method = method
        end

        if data.wps_status ~= "success" and data.wps_status ~= "failed" then
            if res["Peer Address"] then
                if res["Last WPS result"] == "Success" then
                    data.mac = res["Peer Address"]
                    data.wps_status = "success"
                else
                    data.wps_status = "failed"
                end
            else
                local status = res[method:upper().." Status"]
                if status and (data.wps_status ~= "timeout" or data.wps_status ~= "overlap") then
                    local map = {["Active"] = "ok", ["Overlap"] = "overlap", ["Timed-out"] = "timeout", ["Disabled"] = "na"}
                    data.wps_status = map[status] or "na"
                end
            end
        end
        return true

    elseif cmd == "ap_pin" then
        if data.wps_label == "on" then
            res = wps_do_cmd(vap, "wps_ap_pin set " .. data.wps_pin .. " 0")
        else
            res = wps_do_cmd(vap, "wps_ap_pin disable")
        end
        return res.OK or not res.FAIL

    elseif cmd == "pin_lock" then
        res = wps_do_cmd(vap, "pin_lock")

        local sec
        for _, sec in pairs(self.section[CFG_HST_2G]) do
            if vap == sec then
                data.lock_2g = string.lower(res["LockDown"])
            end
        end

        for _, sec in pairs(self.section[CFG_HST_5G]) do
            if vap == sec then
                data.lock_5g = string.lower(res["LockDown"])
            end
        end
        
        local support_triband = wireless_support_triband()
        local support_6g = wireless_support_6g()
        if support_triband == "yes" then
            if support_6g == "yes" then
                for _, sec in pairs(self.section[CFG_HST_6G]) do
                    if vap == sec then
                        data.lock_6g = string.lower(res["LockDown"])
                    end
                end
            else
                for _, sec in pairs(self.section[CFG_HST_5G_2]) do
                    if vap == sec then
                        data.lock_5g_2 = string.lower(res["LockDown"])
                    end
                end
            end   
        end   
        
        return true
    end

    return false
end

-- Execute an CSD command.
-- @param    cmd     CSD command name [scan | query].
-- @param    data    input or output data.
-- @return bool
function Apcfg:csd_cmd(cmd)
    local csd_flag = wireless_support_csd()
    local res = {}

    if not csd_flag or not cmd then
        return false
    end

    local cmd = " chan_detect %s" % cmd

    local util = require("io").popen(APCFG_SHELL..cmd)
    if util then
        local ln, key, val
        while true do
            ln = util:read("*l")
            if ln then
            if ln == "csd_shell_over" then break end
                key, val = ln:match("([^\:]+)\: (.+)")
                if val then
                    res[key] = val
                end
            else
                break
            end
        end
        util:close()
    end

    return res
end

-- Execute an WPS command.
-- @param    cmd     WPS command name.
-- @param    data    input or output data.
-- @return bool 
function Apcfg:wps_cmd(cmd, data)
	local hapd_flag = uci_r:get_profile("wireless", "wps_hostapd_support") or "no"
	--dbg("hapd_flag " .. hapd_flag)
    for _, vap in pairs(self.section[CFG_HST_AL]) do
        local cfg = self.uci:get_all(self.module, vap)
        if cfg then
            local dev_disabled
            if cfg.device then
                dev_disabled = self.uci:get(self.module, cfg.device, "disabled")
            end
            if dev_disabled ~= "on" and cfg.enable == "on"	and cfg.wps == "on" and cfg.hidden == "off"
                and ((cfg.encryption == "psk_sae" and cfg.psk_version ~= "sae_only") or cfg.encryption == "none"
                or (cfg.encryption == "psk" and cfg.psk_cipher ~= "tkip" and cfg.psk_version ~= "wpa")
                or (cfg.encryption == "owe" and cfg.psk_version ~= "owe_only")) then
                    if not cmd then
                        return true
                    else
                        if not self:wps_vap_cmd(vap, cmd, data) then
                            return false
                        end
                        --break
                        --cancel by zhangshengbo,config all interface when click once on web
                        --based on qca a9v6

                        --cancel by lixiangkui,config all interface when click once on web for mtk
                       local dev_type = "no"
                       if cfg.device then
                           dev_type = self.uci:get(self.module, cfg.device, "type")
                       end

                        if hapd_flag ~= "yes" and dev_type ~= "mtkwifi" then
                            break
                        end     
                    end
            end
        end
    end
    return (cmd and true) or false
end

-- Check the given MAC filtering rule is valid or not.
-- @param    data    Values of the rule.
-- @return bool 
function Apcfg:maclist_check(data)
    if data.mac and data.mac:match("^%x[02468aceACE]%-%x%x%-%x%x%-%x%x%-%x%x%-%x%x$")
        and (data.enable == "on" or data.enable == "off") 
        and (not data.note or #data.note < 32) then
        return true
    end
    return false
end

-- Remove a/some MAC filtering rule.
-- @param    index    Indexs to be removed.
-- @param    data    Result of every rule.
-- @return bool 
function Apcfg:maclist_remove(index, data)
    local id      = 0
    local result  = nil
    local old_cfg = nil
    local tmp     = {}
    local filter  = self.uci:get(self.module, "filter", "enable") == "on"
    
    if type(index) == "string" then
        index = {index}
    end

    for i, v in ipairs(index) do
        id = tonumber(v)
        if id then 
            tmp[id] = false 
        end
    end
    
    id = -1
    self.uci:delete_all(self.module, "mac-list",
        function(s)
            id = id + 1
            if tmp[id] == false then
                tmp[id] = true
                old_cfg = s
                return true
            end
            return false
        end)

    for i, r in pairs(tmp) do
        data[#data + 1] = {index = i, success = r}
    end

    -- Commit the delete operation
    result = old_cfg and self.uci:commit(self.module)

    -- Delete the rule from driver
    if result and filter then
        if #data == 1 then
            fork("%s %s del %s" % {APCFG_SHELL, APCFG_ACTION[ACT_MAC_FLT].cmd, old_cfg.mac})
        else
            fork("%s %s" % {APCFG_SHELL, APCFG_ACTION[ACT_MAC_FLT].cmd})
        end
    end

    return result
end

-- Insert a MAC filtering rule.
-- @param    data    Values of the new rule.
-- @return bool 
function Apcfg:maclist_insert(data)
    local id     = -1
    local result = true
    local mac    = data.mac
    local limit  = self.uci:get(self.module, "filter", "limit") or "64"
    local filter = self.uci:get(self.module, "filter", "enable") == "on"
    
    data = {
        mac    = data.mac,
        note   = data.note or "",
        enable = data.enable,
    }

    limit = tonumber(limit)
    self.uci:foreach(self.module, "mac-list",
        function(s)
            limit = limit - 1
            if s.mac == mac then
                result = false
            end
        end)

    result = result and limit > 0
    result = result and self.uci:section_first(self.module, "mac-list", nil, data)
    result = result and self.uci:commit(self.module)

    -- Insert the rule to driver
    if result and filter and data.enable == "on" then
        fork("%s %s add %s" % {APCFG_SHELL, APCFG_ACTION[ACT_MAC_FLT].cmd, data.mac})
    end

    return result
end

-- Modify a MAC filtering rule by index.
-- @param    index    Index of the rule to be updated.
-- @param    data    Values of the rule.
-- @return bool 
function Apcfg:maclist_update(index, data)
    local id      = -1
    local old_cfg = nil
    local result  = true
    local mac     = data.mac
    local filter  = self.uci:get(self.module, "filter", "enable") == "on"

    data = {
        mac    = data.mac,
        note   = data.note or "",
        enable = data.enable,
    }

    self.uci:foreach(self.module, "mac-list",
        function(s)
            id = id + 1
            if id == index then
                old_cfg = s
            elseif s.mac == mac then
                result = false
            end
        end)

    -- Have we found the entry?
    if result and old_cfg then
        result = self.uci:tset(self.module, old_cfg['.name'], data)
        result = result and self.uci:commit(self.module)

        -- Remove old rule and apply new rule
        if result and filter then
            if old_cfg.enable == "on" then
                fork("%s %s del %s" % {APCFG_SHELL, APCFG_ACTION[ACT_MAC_FLT].cmd, old_cfg.mac})
            end
            if data.enable == "on" then
                fork("%s %s add %s" % {APCFG_SHELL, APCFG_ACTION[ACT_MAC_FLT].cmd, data.mac})
            end
        end
    end

    return result
end

-- Modify one/all MAC filtering.
-- @param    index    Index of the rule to be read, nil means ALL.
-- @param    data    Output rules.
-- @return bool 
function Apcfg:maclist_read(index, data)
    local id = -1

    self.uci:foreach(self.module, "mac-list",
        function(s)
            id = id + 1
            if not index or id == index then
                data[#data + 1 ] = {
                    mac    = s.mac,
                    enable = s.enable,
                    note   = s.note or ""
                }
            end
        end)

    return true
end

-- Sort the ap list by channel.
-- @param    ap_list    ap list to be sorted.
-- @return ap list sorted.
function sort_aplist(ap_list)
    table.sort(ap_list, function(a,b)
    if a.signal == 0 then
        return false
    elseif b.signal == 0 then
        return true
    else
        return (a.signal > b.signal)
    end
    end)
end

-- Divide band according to whether to support the DFS or not.
-- @param    chan   current AP channel.
-- @param    dfs    support the DFS or not.
-- @return 	 1 indicates 5G_1, 2 indicates 5G_2, 0 indicates invalid.
function divide_band(chan, dfs)
    if dfs == "yes" then
        if (tonumber(chan) < 68) then
            return 1
        elseif (tonumber(chan) > 96) then
            return 2
        end
        return 0
    end

    if (tonumber(chan) < 52) then
        return 1
    elseif (tonumber(chan) > 144) then
        return 2
    end
    return 0
end

-- Get all scan SSID results on wifi chip(s).
-- @param    survery_2g    Do survery on 2G radio.
-- @param    survery_5g    Do survery on 5G radio.
-- @param    survery_5g_2  Do survery on 5G_2 radio.
-- @param    survery_6g    Do survery on 6G radio.
-- @return table All scan results
function Apcfg:scanlist(survery_2g, survery_5g, survery_5g_2, survery_6g)
    local iwinfo  = get_iwinfo()
    local ap_list = {}
    local map     = {
        [CFG_DEV_2G] = (survery_2g and CFG_VAP_2G) or nil,
        [CFG_DEV_5G] = (survery_5g and CFG_VAP_5G) or nil,
        [CFG_DEV_5G_2] = (survery_5g_2 and CFG_VAP_5G_2) or nil,
        [CFG_DEV_6G] = (survery_6g and CFG_VAP_6G) or nil,
    }

    local support_triband = wireless_support_triband()
    local support_6g = wireless_support_6g()
    local support_dfs = wireless_support_dfs()
    if not iwinfo then 
        return {} 
    end
    for phy, sec in pairs(map) do
        local dev    = self.section[phy][1]
        local iftype = dev and iwinfo.type(dev)
        local iw     = iftype and iwinfo[iftype]

        if dev and sec and iw then
            for _, vap in ipairs(self.section[sec]) do
                if iftype == iwinfo.type(vap) then 
                    dev = vap                    
                    break
                end
            end

            for _, ap in ipairs(iw.scanlist(dev) or {}) do
                local enc = "none"
                if ap.encryption.wep then 
                    enc = "wep" 
                elseif ap.encryption.wpa > 0 then
                    enc = ap.encryption.auth_suites
                    if enc and enc[1] then
                        if enc[1] == "PSK" then
                            enc = "psk"
                        elseif enc[1] == "802.1X" then
                            enc = "wpa"
                        elseif enc[1] == "NONE" then
                            enc = "none"
                        else
                            enc = "unknown"
                        end
                    else
                        enc = "unknown"
                    end
                elseif ap.encryption.enabled then
                    enc = "unknown"
                end

                local signal_strenth = ap.signal + 91

                if support_triband == "yes" then
                    if survery_5g then
                        if (divide_band(ap.channel, support_dfs) == 1) then
                            ap_list[#ap_list + 1] = {
                                bssid = ap.bssid:gsub(':', '-'),
                                ssid = ap.ssid,
                                signal = signal_strenth,
                                channel = ap.channel,
                                encryption = enc,
                            }
                        end
                    elseif survery_5g_2 then
                        if (divide_band(ap.channel, support_dfs) == 2) then
                            ap_list[#ap_list + 1] = {
                                bssid = ap.bssid:gsub(':', '-'),
                                ssid = ap.ssid,
                                signal = signal_strenth,
                                channel = ap.channel,
                                encryption = enc,
                            }
                        end
                    else
                        ap_list[#ap_list + 1] = {
                            bssid = ap.bssid:gsub(':', '-'),
                            ssid = ap.ssid,
                            signal = signal_strenth,
                            channel = ap.channel,
                            encryption = enc,
                        }
                    end
                else
                    ap_list[#ap_list + 1] = {
                        bssid = ap.bssid:gsub(':', '-'),
                        ssid = ap.ssid,
                        signal = signal_strenth,
                        channel = ap.channel,
                        encryption = enc,
                    }
                end
            end
        end
    end

    sort_aplist(ap_list)
    return ap_list
end

-- Get all associted stations.
-- @param    N/A
-- @return table All stations
function Apcfg:assoclist()
    local sta    = {}
    local map    = {}
    local iwinfo = get_iwinfo()
    local support_triband = wireless_support_triband()
    local support_6g = wireless_support_6g()
    local wifi_type = ""
	local uci_r = uci.cursor()
	local sysmode = uci_r:get("sysmode", "sysmode", "mode") or "router"

    if support_triband == "yes" then
        if support_onemesh == "yes" and sysmode == "router" then
            if support_6g == "yes" then
                map = {CFG_HST_2G, CFG_HST_5G, CFG_HST_6G, CFG_GST_2G, CFG_GST_5G, CFG_GST_6G, CFG_ONEMESH_2G, CFG_ONEMESH_5G, CFG_ONEMESH_6G}
            else
                map = {CFG_HST_2G, CFG_HST_5G, CFG_HST_5G_2, CFG_GST_2G, CFG_GST_5G, CFG_GST_5G_2, CFG_ONEMESH_2G, CFG_ONEMESH_5G, CFG_ONEMESH_5G_2}
            end
        else
            if support_6g == "yes" then
                map = {CFG_HST_2G, CFG_HST_5G, CFG_HST_6G, CFG_GST_2G, CFG_GST_5G, CFG_GST_6G}
            else
                map = {CFG_HST_2G, CFG_HST_5G, CFG_HST_5G_2, CFG_GST_2G, CFG_GST_5G, CFG_GST_5G_2}
            end
        end
    else
        if support_onemesh == "yes" and sysmode == "router" then
            map = {CFG_HST_2G, CFG_HST_5G, CFG_GST_2G, CFG_GST_5G, CFG_ONEMESH_2G, CFG_ONEMESH_5G}
        else
            map = {CFG_HST_2G, CFG_HST_5G, CFG_GST_2G, CFG_GST_5G}
        end
    end

    for id, sec in ipairs((iwinfo and map) or {}) do
        for _, vap in pairs(self.section[sec]) do
            local iftype = iwinfo.type(vap)
            local iw = iftype and iwinfo[iftype]
            if iw then
                local enc = iw.encryption(vap)
                local sec = "none"
                if enc.wep then
                    sec = "wep" 
                elseif enc.wpa > 0 then
                    if enc.wpa == 1 then
                        sec = "wpa"
                    elseif enc.wpa == 2 then
                        sec = "wpa2"
                    elseif enc.wpa == 3 then
                        sec = "wpa/wpa2"
                    else
                        sec = "unknow"
                    end

                    -- FIXME: these codes should work but not.
                    -- It can be another bug.
                    --[[
                    if enc.auth_suites and enc.auth_suites[1] then
                        if enc.auth_suites[1] == "PSK" then
                            sec = sec .. "-psk"
                        end
                    end
                    --]]

                    -- FIXME: a temporary fix.
                    local encopt = self.uci:get(self.module, vap, "encryption")
                    if encopt == "psk" then
                        sec = sec .. "-psk"
                    end
                elseif enc.enabled then
                    sec = "unknow"
                end
                
				if wifi_type == "" then
					local ifname = self.uci:get(self.module, vap, "device")
					wifi_type = self.uci:get(self.module, ifname, "type")
				end

				if wifi_type == "brcmwifi" then
					local enable = self.uci:get(self.module, vap, "enable")
					local mode = self.uci:get(self.module, vap, "mode")
					local guest = self.uci:get(self.module, vap, "guest") or ""
					local guest_enable = "off"

					if enable == "on" and mode == "ap" and guest == "on" then
						guest_enable = "on"
					end

                    if support_triband == "yes" then
                        if guest_enable ~= "on" and id > 3 then
                            id = id - 3
                        end
                    else
                        if guest_enable ~= "on" and id > 2 then
                            id = id - 2
                        end
                    end
				end
                for mac, data in pairs(iw.assoclist(vap) or {}) do
                    data.mac      = mac:gsub(':', '-')
                    data.type     = id
                    data.security = sec
                    sta[#sta + 1] = data
                end
            end
        end
    end

    return sta
end

-- Scan wireless uci configure file, generate wifi device and interface table.
-- @param    N/A.
-- @return N/A
function Apcfg:scan_driver()
    local dev2g = nil 
    local dev5g = nil 
    local hst2g = nil 
    local gst2g = nil 
    local sta2g = nil 
    local hst5g = nil 
    local gst5g = nil 
    local sta5g = nil
    local dev5g_2 = nil
    local hst5g_2 = nil
    local gst5g_2 = nil
    local sta5g_2 = nil
    local dev6g = nil
    local hst6g = nil 
    local gst6g = nil 
    local sta6g = nil
    local ret = {}
    local uci_r = uci.cursor()
    local sysmode = uci_r:get("sysmode", "sysmode", "mode") or "router"

    self.uci:foreach(self.module, "wifi-device",
        function(s)
            if (s['band'] == '5g_2' and not dev5g_2) then
                dev5g_2 = s['.name']
            elseif (s['band'] == '5g' and not dev5g) then
                dev5g = s['.name']
            elseif (s['band'] == '6g' and not dev6g) then
                dev6g = s['.name']
            else
                dev2g = s['.name']
            end
        end)

    self.uci:foreach(self.module, "wifi-iface",
        function(s)
            if s['device'] == dev2g then
                if s['mode'] ~= 'ap' then
                    sta2g = s['.name']
                -- elseif hst2g or s['guest'] then
                -- for amazon_ffs
                elseif (hst2g or s['guest']) and (not s['ffs']) then
                    gst2g = s['.name']
                else
                    -- for amazon_ffs
                    if not s['ffs'] then
                    	hst2g = s['.name']
                    end
                end
            elseif s['device'] == dev5g_2 then
                if s['mode'] ~= 'ap' then
                    sta5g_2 = s['.name']
                elseif hst5g_2 or s['guest'] then
                    gst5g_2 = s['.name']
                else
                    hst5g_2 = s['.name']
                end
            elseif s['device'] == dev6g then
                if s['mode'] ~= 'ap' then
                    sta6g = s['.name']
                elseif hst6g or s['guest'] then
                    gst6g = s['.name']
                else
                    hst6g = s['.name']
                end
            else
                if s['mode'] ~= 'ap' then
                    sta5g = s['.name']
                elseif hst5g or s['guest'] then
                    gst5g = s['.name']
                else
                    hst5g = s['.name']
                end
            end
        end)

    ret = {
        [CFG_HST_2G] = {hst2g}, [CFG_GST_2G] = {gst2g}, [CFG_STA_2G] = {sta2g},
        [CFG_HST_5G] = {hst5g}, [CFG_GST_5G] = {gst5g}, [CFG_STA_5G] = {sta5g},
        [CFG_HST_5G_2] = {hst5g_2}, [CFG_GST_5G_2] = {gst5g_2}, [CFG_STA_5G_2] = {sta5g_2},
        [CFG_HST_6G] = {hst6g}, [CFG_GST_6G] = {gst6g}, [CFG_STA_6G] = {sta6g},
        [CFG_DEV_2G] = {dev2g}, [CFG_DEV_5G] = {dev5g}, [CFG_DEV_5G_2] = {dev5g_2},
        [CFG_DEV_6G] = {dev6g}, [CFG_DEV_AL] = {dev2g, dev5g, dev5g_2, dev6g},
        [CFG_HST_AL] = {hst2g, hst5g, hst5g_2, hst6g}, [CFG_GST_AL] = {gst2g, gst5g, gst5g_2, gst6g}, [CFG_STA_AL] = {sta2g, sta5g, sta5g_2, sta6g},
        [CFG_VAP_2G] = {hst2g, gst2g, sta2g}, [CFG_VAP_5G] = {hst5g, gst5g, sta5g},
        [CFG_VAP_5G_2] = {hst5g_2, gst5g_2, sta5g_2}, [CFG_VAP_6G] = {hst6g, gst6g, sta6g},
        [CFG_VAP_AL] = {hst2g, gst2g, sta2g, hst5g, gst5g, sta5g, hst5g_2, gst5g_2, sta5g_2, hst6g, gst6g, sta6g}
    }

    if support_onemesh == "yes" and sysmode == "router" then
        local onemesh2g = nil
        local onemesh5g = nil
        local onemesh5g_2 = nil
        local onemesh6g = nil
    	self.uci:foreach("onemesh", "wifi-iface",
            function(s)
                if s['device'] == dev2g then
                    onemesh2g = s['.name']
                elseif s['device'] == dev5g then
                    onemesh5g = s['.name']
                elseif s['device'] == dev5g_2 then
                    onemesh5g_2 = s['.name']
                else
                    onemesh6g = s['.name']
                end
            end)

        ret[CFG_ONEMESH_2G] = {onemesh2g}
        ret[CFG_ONEMESH_5G] = {onemesh5g}
        if onemesh5g_2 ~= nil then
            ret[CFG_ONEMESH_5G_2] = {onemesh5g_2}
        end
        if onemesh6g ~= nil then
            ret[CFG_ONEMESH_6G] = {onemesh6g}
        end
    end

    return ret
end

-- Set uci option value.
-- @param    cfg.
-- @param    option.
-- @param    value.
-- @return N/A
function Apcfg:set_option(cfg, option, value, convert)
    local set_func = self["set_"..(convert or option)]

    printf("set %s %s = %s" % {self.section[cfg][1] or "", option or "", value or ""})
    
    if option then
        if not value then 
            return true 
        end

        if set_func then 
            value = set_func(self, value, self.section[cfg]) 
        end

        if value then
            for _, section in pairs(self.section[cfg]) do
                self.uci:set(self.module, section, option, value)
            end
        end
        return value and true
    else
        return (set_func and set_func(self, self.section[cfg])) or true
    end
end

-- Get uci option value.
-- @param cfg.
-- @param    option.
-- @return N/A
function Apcfg:get_option(cfg, option, convert)
    local value    = ""
    local get_func = self["get_" .. (convert or option)]

    if option then
        for _, section in pairs(self.section[cfg]) do
            value = self.uci:get(self.module, section, option)
            break
        end
        if get_func then 
            value = get_func(self, value) 
        end
    else
        value = get_func and get_func(self, cfg)
    end

    -- printf("get %s %s = %s" % {self.section[cfg][1] or "", option or convert or "", (type(value) == "string" and value) or ""})
    
    return value or ""
end

-- log some info.
-- @param    changes : then changes of wireless item in uci table.
-- @return N/A
function Apcfg:log(changes)
    local logm  = require "luci.model.log"
    local log = logm.Logn("wireless")
    local section
    local item

    if not changes then
        return
    end

    --check if set 2.4g wifi switch
    section = self.section[CFG_HST_2G][1]
    if section then
        item = changes[section]
        if item and item["enable"] then
            log(log.logid.WIRELESS_SWITCH_SET, "2.4G", item["enable"] == "on" and "on" or "off")
        end
    end

    --check if set 5g wifi switch
    section = self.section[CFG_HST_5G][1]
    if section then
        item = changes[section]
        if item and item["enable"] then
            log(log.logid.WIRELESS_SWITCH_SET, "5G", item["enable"] == "on" and "on" or "off")
        end
    end

    --check if set 5g wifi switch
    section = self.section[CFG_HST_5G_2][1]
    if section then
        item = changes[section]
        if item and item["enable"] then
            log(log.logid.WIRELESS_SWITCH_SET, "5G-2", item["enable"] == "on" and "on" or "off")
        end
    end

        --check if set 6g wifi switch
    section = self.section[CFG_HST_6G][1]
    if section then
        item = changes[section]
        if item and item["enable"] then
            log(log.logid.WIRELESS_SWITCH_SET, "6G", item["enable"] == "on" and "on" or "off")
        end
    end
end

-- backup wifi soft switch.
-- @param    changes : then changes of wireless item in uci table.
-- @return N/A
function Apcfg:backup_wifiswitch(changes)
    local section = nil
    local item = nil
    local sitems = {}

    if not changes then
        return
    end

    --check if set soft wifi switch
    section = self.section[CFG_HST_AL]
    if section then
        for _, v in pairs(section) do
            item = changes[v]
            if item and item["enable"] then
                sitems[#sitems+1] = {name=v}
            end
        end
    end
    
    -- the wifi hard switch and other soft switch not current band should
    -- be turned off when hard switch if on
    if #sitems > 0 then
        local dev_disabled = self:get_option(CFG_DEV_AL, "disabled")
        self.uci:foreach("wireless", "wifi-iface",
            function(s)
                if s['mode'] == 'ap' and not s['guest'] then
                    local itemtoset = false
                    for _, n in ipairs(sitems) do
                        if n.name == s['.name'] then
                            itemtoset = true
                            break
                        end
                    end

                    -- save the old soft switch status:
                    if itemtoset then
                        self.uci:set(self.module, s['.name'], "lastenable", s['enable'] == "off" and "on" or "off")
                    else
                        self.uci:set(self.module, s['.name'], "lastenable", s['enable'])
                    end
                end
            end
        )
    end
end

-- smart home report the changes of guestNetwork.
-- @param    changes : then changes of wireless item in uci table.
-- @return N/A
function Apcfg:smart_home_guestNetwork_report(changes)
    local smart_home_upload = require "cloud.smart_home.smart_home_upload"
    local uci_r = uci.cursor()
    local cause = smart_home_upload.APP
    local upload = false
    local section, item
    local smart_home_support = uci_r:get_profile("smart_home", "support") or "no"
    if smart_home_support ~= "yes" then
        return
    end
    if not changes then
	return
    end
    --check if set 2.4g guestNetwork switch
    section = self.section[CFG_GST_2G][1]
    if section then
        item = changes[section]
        if item and item["enable"] then
            upload = true
        end
    end
    --check if set 5g guestNetwork switch
    section = self.section[CFG_GST_5G][1]
    if section then
        item = changes[section]
        if item and item["enable"] then
            upload = true
        end
    end
    if upload == true then
        smart_home_upload.upload_property_change("guestNetwork", cause)
    end
    --check if set 5g2 guestNetwork switch
    section = self.section[CFG_GST_5G_2][1]
    if section then
        item = changes[section]
        if item and item["enable"] then
            upload = true
        end
    end
    if upload == true then
        smart_home_upload.upload_property_change("guestNetwork", cause)
    end
    --check if set 6g guestNetwork switch
    section = self.section[CFG_GST_6G][1]
    if section then
        item = changes[section]
        if item and item["enable"] then
            upload = true
        end
    end
    if upload == true then
        smart_home_upload.upload_property_change("guestNetwork", cause)
    end
end

-- Save uci config file, calculating changes and action.
-- @param    N/A.
-- @return N/A
function Apcfg:commit()
    local changes = self.uci:changes(self.module)[self.module]
    
    if changes then
        for i, item in pairs(self.data) do
            for _, section in pairs(self.section[item.cfg]) do
                if (self.change % item.cfg > 0) and changes[section] and changes[section][item.opt] then
                    self.change = self.change * item.cfg
                    if self.action % item.act > 0 then
                        self.action = self.action * item.act
                    end
                end
            end
        end

        self:log(changes)
        self:backup_wifiswitch(changes)
        self:smart_home_guestNetwork_report(changes)

        -- set WPS configure status to 'configured' when change host vap config.
        for _, sec in ipairs({CFG_HST_2G, CFG_HST_5G, CFG_HST_5G_2, CFG_HST_6G}) do
            if self:get_option(sec, "wps_state") ~= "configured" and self.change % sec == 0  then 
                self:set_option(sec, "wps_state", "configured")
            end
        end
        self.uci:commit(self.module)
    end
end

-- Apply uci config changes, let then take effect.
-- @param    N/A.
-- @return N/A
function Apcfg:apply()
    local sync
    local apply_cmd

    for act, cmd in pairs(APCFG_ACTION) do
        if self.action % act == 0 then
            local command = cmd.cmd
            local change = self.change
            sync = sync or cmd.sync
            for sec, items in pairs(self.section) do
                if change % sec == 0 then
                    change = change / sec
                    for _, item in pairs(items) do
                        command = command .. " " .. item
                    end
                end
            end
            if apply_cmd then
                if (CFG_VAP_2G * CFG_DEV_2G) % self.change == 0 then
                    apply_cmd = "%s %s %s" % {APCFG_SHELL, APCFG_ACTION[ACT_RE_LOAD].cmd, (self.section[CFG_DEV_2G][1] or "")}
                elseif  (CFG_VAP_5G * CFG_DEV_5G) % self.change == 0 then
                	apply_cmd = "%s %s %s" % {APCFG_SHELL, APCFG_ACTION[ACT_RE_LOAD].cmd, (self.section[CFG_DEV_5G][1] or "")}
                elseif  (CFG_VAP_5G_2 * CFG_DEV_5G_2) % self.change == 0 then
                    apply_cmd = "%s %s %s" % {APCFG_SHELL, APCFG_ACTION[ACT_RE_LOAD].cmd, (self.section[CFG_DEV_5G_2][1] or "")}
                elseif  (CFG_VAP_6G * CFG_DEV_6G) % self.change == 0 then
                    apply_cmd = "%s %s %s" % {APCFG_SHELL, APCFG_ACTION[ACT_RE_LOAD].cmd, (self.section[CFG_DEV_6G][1] or "")}
                else
                    apply_cmd = APCFG_SHELL
                end
            else
                apply_cmd = APCFG_SHELL .. " " .. command
            end
        end
    end

    fork(apply_cmd, sync)
end

-- Read all data needed, return data table(for json).
-- @param    N/A.
-- @return N/A
function Apcfg:read_data()
    local data = {}

    for i, item in pairs(self.data) do
        data[i] = self:get_option(item.cfg, item.opt, item.cvt)
    end

    return data
end

-- Read operation.
-- @param    N/A.
-- @return N/A
function Apcfg:read()
    local data = self:read_data()
    local iwinfo = get_iwinfo()
    iwinfo.__gc()
    return data
end

-- Withdraw current write operation.
-- @param    N/A.
-- @return N/A
function Apcfg:withdraw(reason)
    self.uci:revert(self.module)

    return false, reason, self:read_data()
end

-- Write operation.
-- @param    N/A.
-- @return N/A
function Apcfg:write(formvalue)
    local data = {}
	local uci_r = uci.cursor()
	local sysmode = uci_r:get("sysmode", "sysmode", "mode") or "router"

    if not formvalue or type(formvalue) ~= "table" then
        return self:withdraw()
    end
    --here set the item value,so the formvalue should have the right "name" index.eg:guest2g5g_timeout
    for name, item in pairs(self.data) do
        item.value = formvalue[name]
    end

    for _, item in pairs(self.data) do
        local value = item.value
        local valid = not (item.val and value)
        
        for i, v in ipairs(item.val or {}) do
            if v == value then 
                valid = true
                break
            end
        end

        if not valid then 
            printf("ERROR: ".._..value.." is invalid!") 
        end

        if not (valid and self:set_option(item.cfg, item.opt, value, item.cvt)) then
            return self:withdraw(item.opt or item.cvt)
        end
    end

---------------------------------------------------------------------------------------
    local changes = self.uci:changes(self.module)[self.module]
    if changes and support_onemesh == "yes" and sysmode == "router" then
        -- 【One Mesh】无线同步参数推送给RE
        local wifi_data = {}
        local ifname_2g = uci_r:get_profile("wireless", "wireless_ifname_2g") or "wl11"
        local ifname_5g = uci_r:get_profile("wireless", "wireless_ifname_5g") or "wl01"
        local wifi_24g  = self.uci:get_all("wireless", ifname_2g)
        local wifi_5g   = self.uci:get_all("wireless", ifname_5g)
        local device_2g = wifi_24g.ifname
        local device_5g = wifi_5g.ifname
        local channel_2g = self.uci:get_all("wireless", device_2g, "channel")
        local channel_5g = self.uci:get_all("wireless", device_5g, "channel")
        local RE_2G = uci_r:get_profile("wireless", "wireless_mesh_ifname_2g") or "wl14"
        local RE_5G = uci_r:get_profile("wireless", "wireless_mesh_ifname_5g") or "wl04"
        local wifi_24g_disabled = uci_r:get("wireless", wifi_24g.device, "disabled") or "off"
        local wifi_5g_disabled = uci_r:get("wireless", wifi_5g.device, "disabled") or "off"
        local tmp1 = {
            ssid = wifi_24g.ssid,
            encryption = wifi_24g.encryption,
            psk_key = wifi_24g.psk_key or "12345678",
            psk_version = wifi_24g.psk_version,
            psk_cipher = wifi_24g.psk_cipher,
            wep_mode = wifi_24g.wep_mode,
            wep_format1 = wifi_24g.wep_format1,
            wep_type1 = wifi_24g.wep_type1,
            wep_key1 = wifi_24g.wep_key1 or "1234567890",
            channel  = (channel_2g == "auto") and 0 or tonumber(channel_2g),
            enable   = (wifi_24g.enable == "on" and wifi_24g_disabled ~= "on") and 1 or 0,
            hide_ssid = (wifi_24g.hidden == "on") and 1 or 0,
            backhaul_ssid = self.uci:get_all("onemesh", RE_2G, "ssid"), -- 隐藏backhaul SSID
            backhaul_key  = self.uci:get_all("onemesh", RE_2G, "psk_key")   -- 隐藏backhaul 密码
        }
        local tmp2 = {
            ssid = wifi_5g.ssid,
            encryption = wifi_5g.encryption,
            psk_key = wifi_5g.psk_key or "12345678",
            psk_version = wifi_5g.psk_version,
            psk_cipher = wifi_5g.psk_cipher,
            wep_mode = wifi_5g.wep_mode,
            wep_format1 = wifi_5g.wep_format1,
            wep_type1 = wifi_5g.wep_type1,
            wep_key1 = wifi_5g.wep_key1 or "1234567890",
            channel  = (channel_5g == "auto") and 0 or tonumber(channel_5g),
            enable   = (wifi_5g.enable == "on" and wifi_5g_disabled ~= "on") and 1 or 0,
            hide_ssid = (wifi_5g.hidden == "on") and 1 or 0,
            backhaul_ssid = self.uci:get_all("onemesh", RE_5G, "ssid"),  -- 隐藏backhaul SSID
            backhaul_key  = self.uci:get_all("onemesh", RE_5G, "psk_key") -- 隐藏backhaul 密码
        }
        wifi_data["2.4G"] = tmp1
        wifi_data["5G"]   = tmp2

        -- NOTE: add for triband
		local support_triband = uci_r:get_profile("wireless", "support_triband") or "no"
		local support_6g = uci_r:get_profile("wireless", "support_6g") or "no"
		if support_triband == "yes" then
			if support_6g == "yes" then
				local ifname_6g = uci_r:get_profile("wireless", "wireless_ifname_6g") or "wl11"
				local wifi_6g = self.uci:get_all("wireless", ifname_6g)
				local device_6g = wifi_6g.ifname
				local channel_6g = self.uci:get_all("wireless", device_6g, "channel")
				local RE_6G = uci_r:get_profile("wireless", "wireless_mesh_ifname_6g") or "wl14"
				local wifi_6g = self.uci:get_all("wireless", ifname_6g)
				local wifi_6g_disabled = uci_r:get("wireless", wifi_6g.device, "disabled") or "off"
				local tmp3 = {}
				wifi_6g   = uci_r:get_all("wireless", ifname_6g)
				tmp3 = {
					ssid = wifi_6g.ssid,
					encryption = wifi_6g.encryption,
					psk_key = wifi_6g.psk_key or "12345678",
					psk_version = wifi_6g.psk_version,
					psk_cipher = wifi_6g.psk_cipher,
					wep_mode = wifi_6g.wep_mode,
					wep_format1 = wifi_6g.wep_format1,
					wep_type1 = wifi_6g.wep_type1,
					wep_key1 = wifi_6g.wep_key1 or "1234567890",
					channel  = (channel_6g == "auto") and 0 or tonumber(channel_6g),
					enable   = (wifi_6g.enable == "on" and wifi_6g_disabled ~= "on") and 1 or 0,
					hide_ssid = (wifi_6g.hidden == "on") and 1 or 0,
					backhaul_ssid = uci_r:get_all("onemesh", RE_6G, "ssid"), -- 隐藏backhaul SSID
					backhaul_key  = uci_r:get_all("onemesh", RE_6G, "psk_key")   -- 隐藏backhaul 密码
				}
				wifi_data["6G"] = tmp3
			else
				local ifname_5g2 = uci_r:get_profile("wireless", "wireless_ifname_5g_2") or "wl21"
				local wifi_5g2 = self.uci:get_all("wireless", ifname_5g2)
				local device_5g2 = wifi_5g2.ifname
				local channel_5g2 = self.uci:get_all("wireless", device_5g2, "channel")
				local RE_5G2 = uci_r:get_profile("wireless", "wireless_mesh_ifname_5g_2") or "wl24"
				local wifi_5g2 = self.uci:get_all("wireless", ifname_5g2)
				local wifi_5g2_disabled = uci_r:get("wireless", wifi_5g2.device, "disabled") or "off"
				local tmp3 = {}
				wifi_5g2   = uci_r:get_all("wireless", ifname_5g2)
				tmp3 = {
					ssid = wifi_5g2.ssid,
					encryption = wifi_5g2.encryption,
					psk_key = wifi_5g2.psk_key or "12345678",
					psk_version = wifi_5g2.psk_version,
					psk_cipher = wifi_5g2.psk_cipher,
					wep_mode = wifi_5g2.wep_mode,
					wep_format1 = wifi_5g2.wep_format1,
					wep_type1 = wifi_5g2.wep_type1,
					wep_key1 = wifi_5g2.wep_key1 or "1234567890",
					channel  = (channel_5g2 == "auto") and 0 or tonumber(channel_5g2),
					enable   = (wifi_5g2.enable == "on" and wifi_5g2_disabled ~= "on") and 1 or 0,
					hide_ssid = (wifi_5g2.hidden == "on") and 1 or 0,
					backhaul_ssid = uci_r:get_all("onemesh", RE_5G2, "ssid"), -- 隐藏backhaul SSID
					backhaul_key  = uci_r:get_all("onemesh", RE_5G2, "psk_key")   -- 隐藏backhaul 密码
				}
				wifi_data["5G2"] = tmp3
			end
	    end
        local wifi_msg = json.encode(wifi_data)
        dbg.print(wifi_msg)

        os.remove(ONEMESH_SYNC_WIFI_TMP_JSON)
        local f = io.open(ONEMESH_SYNC_WIFI_TMP_JSON, "w")
        f:write(wifi_msg)
        f:close()    
        
        local json_object = {}
        json_object["load"] = ONEMESH_SYNC_WIFI_TMP_JSON
        json_object["timeout"] = 5

        local ubus  = require "ubus"
        local _ubus = ubus.connect()
        _ubus:call("sync", "sync_wifi", json_object)
        _ubus:close()
    end
---------------------------------------------------------------------------------------

    self:commit()
    self:apply()
    local guest_write = 0


    if type(formvalue) == "table" and string.sub(tostring(formvalue["form"]),1,5) == "table" then
        for i, name in pairs(formvalue["form"]) do
            if name == "guest_2g" or name == "guest_5g" or name == "guest_5g_2" or name == "guest_6g" or name == "guest_2g5g" then
                guest_write = 1
                break
            end
        end
    end
    if guest_write == 1 or formvalue["form"] == "guest" or formvalue["form"]=="syspara_5g_2" or formvalue["form"]=="syspara_2g" or formvalue["form"]=="syspara_5g" or formvalue["form"]=="syspara_6g" then
        sys.fork_exec("[ -f /usr/bin/wportalctrl ] && wportalctrl -c && echo stop > /tmp/wportal/status && /etc/hotplug.d/iface/99-wportal")
    end

    local isSupportFFS = self.uci:get_profile("wireless", "ffs") or "no"
    if isSupportFFS == "yes" then
        local ffs = require "luci.controller.admin.ffs"
        -- tether request process
        if formvalue["enableFFS"] == "on" or formvalue["enableFFS"] == "off" then
            ffs.tmp_set_ffs_enable(formvalue["enableFFS"])
        end
    end
    
    return self:read_data()
end

function Apcfg:get_on_off(value)
    return (value == "on" and "on") or "off" 
end

function Apcfg:set_on_off(value)
    return (value == "on" and "on") or "off" 
end

function Apcfg:set_off_on(value)
    return (value == "on" and "off") or "on" 
end

function Apcfg:get_off_on(value)
    return (value == "on" and "off") or "on" 
end

-- set hard switches off
-- @param  sections : wifi iface sections. iface section names, or nil means all iface)
-- @param  sections : exclude the the ifaces when true or just the ifaces when false
-- @return N/A
function Apcfg:set_hardswitch_off(sections, revert)
    self.uci:foreach("wireless", "wifi-iface",
        function(s)
            local find = false
            local set = false

            if sections then
                for _, item in pairs(sections) do
                    if s['.name'] == item then
                        find = true
                        break
                    end
                end

                if (revert and not find)
                    or (not revert and find) then
                    set = true
                end
            else
                set = true
            end

            if set and s['mode'] == 'ap' and not s['guest'] then
                local device = self.uci:get(self.module, s['.name'], "device")
                if device then
                    if self.uci:get(self.module, device, "disabled") ~= "off" then
                        self.uci:set(self.module, device, "disabled", "off")
                    end
                end
            end
        end)
end

-- set soft switches off
-- @param  sections : wifi iface sections. iface section names, or nil means all iface)
-- @param  sections : exclude the the ifaces when true or just the ifaces when false
-- @return N/A
function Apcfg:set_softswitch_off(sections, revert)
    self.uci:foreach("wireless", "wifi-iface",
        function(s)
            local find = false
            local set = false

            if sections then
                for _, item in pairs(sections) do
                    if s['.name'] == item then
                        find = true
                        break
                    end
                end

                if (revert and not find)
                    or (not revert and find) then
                    set = true
                end
            else
                set = true
            end

            if set and s['mode'] == 'ap' and not s['guest'] then
                if s['enable'] ~= "off" then
                    self.uci:set(self.module, s['.name'], "enable", "off")
                end

                -- wifi-device
                local device = self.uci:get(self.module, s['.name'], "device")
                if device then
                    if self.uci:get(self.module, device, "disabled_all") ~= "on" then
                        self.uci:set(self.module, device, "disabled_all", "on")
                    end
                end
            end
        end)
end
----------------------------------------------------------------------------------------------------
--                   The codes below this comment are uci get/set functions.                      --
----------------------------------------------------------------------------------------------------
--GET current radio working channel
function Apcfg:get_current_channel(secs)
    local chan
    local iwinfo = get_iwinfo()
    for _, sec in pairs(self.section[secs]) do
        local iftype = iwinfo and iwinfo.type(sec)
        local iw     = iftype and iwinfo[iftype]
        chan = iw and iw.channel(sec)

        if chan then
            chan = tostring(chan)
            break
        end
    end
    return chan or "N/A"
end

-- Get wds status.
-- @param    sec    section.
-- @return wds status
function Apcfg:get_wds_status(sec)
    local wds_status = "disable"
    local iwinfo = get_iwinfo()
    
    for _, vap in pairs(self.section[sec]) do
        local ifname = self.uci:get(self.module, vap, "ifname")
        local iftype = iwinfo.type(ifname)
        local iw = iftype and iwinfo[iftype]

        if iw then
            if iw.bssid(ifname) and iw.bssid(ifname) ~= "00:00:00:00:00:00" and iw.channel(ifname) then
                local enc = iw.encryption(ifname)
                if enc.enabled then
                    wds_status = "run_encrypt"
                else
                    wds_status = "run_unencrypt"
                end
            else
                wds_status = "assoc"
            end
        end
    end
    return wds_status
end

--judge region selection is permitted.
function Apcfg:get_region_select_permission(secs)
    local select_permission
    select_permission = uci_r:get_profile("region","select_permission") or "yes"
    return select_permission
end

function Apcfg:get_support_please_select(secs)
    local please_select
    please_select = uci_r:get_profile("region","support_please_select") or "no"
    return please_select
end


function Apcfg:get_support_smart_connect(secs)
    local smart_connect
    smart_connect = uci_r:get_profile("wireless","smart_connect") or "no"
    return smart_connect
end

function Apcfg:get_support_wireless_schedule(secs)
    local wireless_schedule
    wireless_schedule = uci_r:get_profile("wireless","wireless_schedule") or "no"
    return wireless_schedule
end

--GET available channel and modes in current region.
function Apcfg:get_capability(secs)
    if not self.capability then
        local uci_state = uci.cursor_state()
        local country   = self:get_option(CFG_DEV_AL, "country")
        local cap       = uci_state:get_all(self.module, "capability")
        local channel_band12 = {}
        local channel_band34 = {}

        local support_triband = uci_r:get_profile("wireless","support_triband") or "no"
        local support_6g = uci_r:get_profile("wireless","support_6g") or "no"
        local support_160M = wireless_support_bw160()
        local exclude_160M_5GL = wireless_exclude_bw160_5gl()
        local exclude_160M_5GH = wireless_exclude_bw160_5gh()
        local exclude_160M_5G  = wireless_exclude_bw160_5g()

        local model = uci_r:get_profile("global","model") or ""

        if not cap or cap.country ~= country then
            local iwinfo  = get_iwinfo()
            local success = false
            cap = {country = country}
            for idx, dev in pairs(self.section[secs or CFG_DEV_AL]) do
                local htmode  = {}
                local hwmode  = {}
                local channel = {}
                local ht20    = nil
                local ht40    = nil
                local ht80    = nil
                local is5g    = (self.section[CFG_DEV_5G][1] == dev)
                local is2g    = (self.section[CFG_DEV_2G][1] == dev)
                local is5g_2  = (self.section[CFG_DEV_5G_2][1] == dev)
                local is6g    = (self.section[CFG_DEV_6G][1] == dev)
                local iftype  = iwinfo and iwinfo.type(dev)
                local iw      = iftype and iwinfo[iftype]
                local vaps = {}

                if is5g then
                    vaps = self.section[CFG_VAP_5G]
                elseif is2g then
                    vaps = self.section[CFG_VAP_2G]
                elseif is5g_2 then
                    vaps = self.section[CFG_VAP_5G_2]
                elseif is6g then
                    vaps = self.section[CFG_VAP_6G]
                end
                
                if iw then
                    local hw = iw.hwmodelist(dev) or {}
                    
                    -- Decode hwinfo list infomation.
                    if is5g then
                        if hw.ax then
						    -- For mtk MR70Gv1 DO NOT support llax only. by lixiangkui
                            if string.find(model, "MTK_762X") == nil then
                                hwmode[#hwmode + 1] = "ax_5"
                            end
                            if hw.ac and hw.n and hw.a then
                                hwmode[#hwmode + 1] = "anac_5"
                                hwmode[#hwmode + 1] = "anacax_5"
                            end
                        else
                        if hw.ac then
                            -- For mtk AC2300/C6v3 DO NOT support llac only. by tqj
                            if string.find(model, "MTK_762X") == nil then
                                hwmode[#hwmode + 1] = "ac_5"
                            end
                            if hw.n then
                                hwmode[#hwmode + 1] = "nac_5"
                            end
                            if hw.a and hw.n then
                                hwmode[#hwmode + 1] = "anac_5"
                            end
                        else
                            if hw.n then
                                hwmode[#hwmode + 1] = "n_5"
                            end
                            if hw.n and hw.a then
                                hwmode[#hwmode + 1] = "an_5"
                            end
                        end
                        end
                    elseif is5g_2 then
                        if hw.ax then
						    -- For mtk MR70Gv1 DO NOT support llax only. by lixiangkui
                            if string.find(model, "MTK_762X") == nil then
                                hwmode[#hwmode + 1] = "ax_5"
                            end
                            if hw.ac and hw.n and hw.a then
                                hwmode[#hwmode + 1] = "anac_5"
                                hwmode[#hwmode + 1] = "anacax_5"
                            end
                        else
                        if hw.ac then
                            hwmode[#hwmode + 1] = "ac_5"
                            if hw.n then
                                hwmode[#hwmode + 1] = "nac_5"
                            end
                            if hw.a and hw.n then
                                hwmode[#hwmode + 1] = "anac_5"
                            end
                        else
                            if hw.n then
                                hwmode[#hwmode + 1] = "n_5"
                            end
                            if hw.n and hw.a then
                                hwmode[#hwmode + 1] = "an_5"
                            end
                        end
                        end
                    elseif is6g then
                        if hw.ax then
                            hwmode[#hwmode + 1] = "ax_5"
                        else
                            if hw.ac then
                                hwmode[#hwmode + 1] = "ac_5"
                                if hw.n then
                                    hwmode[#hwmode + 1] = "nac_5"
                                end
                                if hw.a and hw.n then
                                    hwmode[#hwmode + 1] = "anac_5"
                                end
                            else
                                if hw.n then
                                    hwmode[#hwmode + 1] = "n_5"
                                end
                                if hw.n and hw.a then
                                    hwmode[#hwmode + 1] = "an_5"
                                end
                            end
                        end
                    else
                        if hw.ax then
                            -- For mtk MR70Gv1 DO NOT support llax only. by lixiangkui
                            if string.find(model, "MTK_762X") == nil then
                                hwmode[#hwmode + 1] = "ax"
                            end
                            if hw.g and hw.n and hw.b then
                                hwmode[#hwmode + 1] = "bgn"
                                hwmode[#hwmode + 1] = "bgnax"
                            end
                        else
                            if hw.g and hw.n then
                                hwmode[#hwmode + 1] = "n"
                                hwmode[#hwmode + 1] = "gn"
                            end
                            if hw.g and hw.n and hw.b then
                                hwmode[#hwmode + 1] = "bgn"
                            end
                        end
                    end

                    -- Try to find a already created vap on this device
                    for _, vap in ipairs(vaps) do
                        if iwinfo.type(vap) then 
                            dev = vap 
                            break 
                        end
                    end

                    for _, chan in ipairs(iw.freqlist(dev) or {}) do
                        if is5g == (chan.mhz > 4000) then 
                            local flag = tonumber(chan.flags) or 0
                            ht20 = ht20 or ((flag % 64) < 32)
                            ht40 = ht40 or ((flag % 128) < 64)
                            ht80 = ht80 or ((flag % 256) < 128)
                            channel[#channel + 1] = tostring(chan.channel)
                        elseif is5g_2 == (chan.mhz > 4000) then 
                            local flag = tonumber(chan.flags) or 0
                            ht20 = ht20 or ((flag % 64) < 32)
                            ht40 = ht40 or ((flag % 128) < 64)
                            ht80 = ht80 or ((flag % 256) < 128)
                            channel[#channel + 1] = tostring(chan.channel)
                        elseif is6g == (chan.mhz > 5900) then 
                            local flag = tonumber(chan.flags) or 0
                            ht20 = ht20 or ((flag % 64) < 32)
                            ht40 = ht40 or ((flag % 128) < 64)
                            ht80 = ht80 or ((flag % 256) < 128)
                            channel[#channel + 1] = tostring(chan.channel)
                        else
                            local flag = tonumber(chan.flags) or 0
                            ht20 = ht20 or ((flag % 64) < 32)
                            ht40 = ht40 or ((flag % 128) < 64)
                            channel[#channel + 1] = tostring(chan.channel)
                        end
                    end

                    -- Generate htmode list from channel flag info.
                    if ht20 and not is6g then 
                        htmode[#htmode + 1] = "20" 
                    end

                    if ht40 and not is6g then 
                        htmode[#htmode + 1] = "40" 
                    end

                    if ht80 then 
                        htmode[#htmode + 1] = "80" 
                    end

                    if support_160M == "yes" then
                        if is5g or is5g_2 then
                            if (support_triband == "yes") then
                                if (exclude_160M_5GL ~= "yes" and is5g) or (exclude_160M_5GH ~= "yes" and is5g_2) then
                                    htmode[#htmode + 1] = "160"
                                end
                            else
                                if (exclude_160M_5G ~= "yes" and is5g) then
                                    htmode[#htmode + 1] = "160"
                                end
                            end
                        elseif is6g then
                            htmode[#htmode + 1] = "160"
                        end
                    end

                    -- Is any channel supported in country?
                    if #channel > 0 then
                        if is5g then
                            cap.htmode_5g  = htmode
                            cap.hwmode_5g  = hwmode
                            cap.channel_5g = channel
                        elseif is5g_2 then
                            cap.htmode_5g_2 = htmode
                            cap.hwmode_5g_2 = hwmode
                            cap.channel_5g_2 = channel
                        elseif is6g then
                            cap.htmode_6g = htmode
                            cap.hwmode_6g = hwmode
                            cap.channel_6g = channel
                        else
                            cap.htmode_2g  = htmode
                            cap.hwmode_2g  = hwmode
                            cap.channel_2g = channel
                        end
                    end
                    success = true
                end
            end

            uci_state:revert(self.module)

            if success then 
                uci_state:section(self.module, country, "capability", cap) 
            end
            uci_state:save(self.module)
        end

        local support_triband = wireless_support_triband()
        local support_6g = wireless_support_6g()
        local support_dfs = wireless_support_dfs()
        
        if support_triband == "yes" then
            if support_6g == "yes" then
                self.capability = {
                    htmode_2g  = cap.htmode_2g  or {},
                    htmode_5g  = cap.htmode_5g  or {},
                    htmode_6g  = cap.htmode_6g  or {},
                    hwmode_2g  = cap.hwmode_2g  or {},
                    hwmode_5g  = cap.hwmode_5g  or {},
                    hwmode_6g  = cap.hwmode_6g  or {},
                    channel_2g = cap.channel_2g or {},
                    channel_5g = cap.channel_5g or {},
                    channel_6g = cap.channel_6g or {},
					pscChannelList = {"5","21","37","53","69","85","101","117","133","149","165","181","197","213","229"}
                }
            else
                for _, chan in ipairs(cap.channel_5g or {}) do
                    if (divide_band(chan, support_dfs)  == 1) then
                        channel_band12[#channel_band12 + 1] = tostring(chan)
                    end
                end
                for _, chan in ipairs(cap.channel_5g_2 or {}) do
                    if (divide_band(chan, support_dfs)  == 2) then
                        channel_band34[#channel_band34 + 1] = tostring(chan) 
                    end
                end
                self.capability = {
                    htmode_2g  = cap.htmode_2g  or {},
                    htmode_5g  = cap.htmode_5g  or {},
                    htmode_5g_2 = cap.htmode_5g_2 or {},
                    hwmode_2g  = cap.hwmode_2g  or {},
                    hwmode_5g  = cap.hwmode_5g  or {},
                    hwmode_5g_2 = cap.hwmode_5g_2 or {},
                    channel_2g = cap.channel_2g or {},
                    --channel_5g = cap.channel_5g or {},
                    --channel_5g_2 = cap.channel_5g_2 or {},
                    channel_5g = channel_band12 or {},
                    channel_5g_2 = channel_band34 or {},
                }
            end
        else
            self.capability = {
                htmode_2g  = cap.htmode_2g  or {},
                htmode_5g  = cap.htmode_5g  or {},
                hwmode_2g  = cap.hwmode_2g  or {},
                hwmode_5g  = cap.hwmode_5g  or {},
                channel_2g = cap.channel_2g or {},
                channel_5g = cap.channel_5g or {},
            }
        end
    end

    return self.capability
end

--GET available channel and modes in current region.
function Apcfg:get_extinfo(secs)
    local extinfo = {}
    local band    = "none"

    local support_triband = wireless_support_triband()
    local support_6g = wireless_support_6g()
    if support_triband == "yes" then
        band = "triband"        
    elseif #self:get_capability().channel_2g > 0 and #self:get_capability().channel_5g > 0 
        or #self:get_capability().channel_2g > 0 and #self:get_capability().channel_6g > 0
        or #self:get_capability().channel_5g > 0 and #self:get_capability().channel_6g > 0 then
        band = "both"
    elseif #self:get_capability().channel_2g > 0 then
        band = "2G"
    elseif #self:get_capability().channel_5g > 0 then
        band = "5G"
    elseif #self:get_capability().channel_6g > 0 then
        band = "6G"
    else
        band = "none"
    end

    guest_dynpasswd = uci_r:get_profile("wireless","support_guest_dynpasswd") or "no"
	wds_guest = uci_r:get_profile("wireless","wds_guest_compatible")

    extinfo = {support_band = band,support_guest_dynpasswd = guest_dynpasswd,wds_guest_compatible = wds_guest}
    
    return extinfo
end

--GET mac address 
function Apcfg:get_macaddr(val)
    if val then 
        val = val:gsub(':', '-') 
    end
    return (val and val:match("^%x[02468aceACE]%-%x%x%-%x%x%-%x%x%-%x%x%-%x%x$")) or "00-00-00-00-00-00"
end

--SET mac address is not allowed
function Apcfg:set_macaddr(val)
    return nil
end

--SET device disabled is not allowed
function Apcfg:set_disabled(val)
    return nil
end

--GET wps_state 
function Apcfg:get_wps_state(val)
    return (val == "2" and "configured") or "unconfigured"
end

--SET wps_state is allowed and alway set it as 2.
function Apcfg:set_wps_state(val)
    return "2"
end

--GET disabled_all
function Apcfg:get_disabled_all(val)
    local dev_disabled = self:get_option(CFG_DEV_AL, "disabled")
    if dev_disabled == "on" then
        return "on"
    else
        --return val
        return (val == "on") and "on" or "off"
    end
end

--SET disabled_all
function Apcfg:set_disabled_all(val)
    return (val == "on") and "on" or "off"
end

--GET enable
function Apcfg:get_enable(val)
    local dev_disabled = self:get_option(CFG_DEV_AL, "disabled")
    if dev_disabled == "on" then
        return "off"
    else
        --return val
        return (val == "on") and "on" or "off"
    end
end

--SET enable
function Apcfg:set_enable(val, sec)
    local dev_disabled = self:get_option(CFG_DEV_AL, "disabled")
    if dev_disabled == "on" then
        --any change from web would set all other switch closed except self
        self:set_softswitch_off(sec, true)
        self:set_hardswitch_off()

        --return self:get_option(sec, "enable")
    --else
    --    return val
    end
    
    return (val == "on") and "on" or "off"
end

--GET check 2G channel
function Apcfg:set_channel_2g(val)
    if val == "auto" then 
        return val 
    end

    if val == "14" then
        local hwmode = self.data.hwmode or self.data.wireless_2g_hwmode
        hwmode = hwmode or self:get_option(CFG_DEV_2G, "hwmode")
        if not hwmode or hwmode.value ~= "b" then 
            return nil 
        end
    end

    for _, i in ipairs(self:get_capability().channel_2g) do
        if val == i then 
            return val    
        end
    end
    return nil
end

--GET check 2G channel
function Apcfg:get_channel_2g(val)
    if val == "auto" then 
        return val 
    end

    if val == "14" and self:get_option(CFG_DEV_2G, "hwmode") ~= "b" then
        return "auto"
    end

    for _, i in ipairs(self:get_capability().channel_2g) do
        if val == i then 
            return val    
        end
    end
    return "auto"
end

--GET check 5G channel
function Apcfg:set_channel_5g(val)
    if val == "auto" then 
        return val 
    end

    for _, i in ipairs(self:get_capability().channel_5g) do
        if val == i then 
            return val    
        end
    end
    return nil
end

--GET check 5G channel
function Apcfg:get_channel_5g(val)
    if val == "auto" then 
        return val 
    end

    for _, i in ipairs(self:get_capability().channel_5g) do
        if val == i then 
            return val    
        end
    end
    return "auto"
end

--GET check 5G_2 channel
function Apcfg:set_channel_5g_2(val)
    if val == "auto" then 
        return val 
    end

    if self:get_capability().channel_5g_2 ~= nil then
        for _, i in ipairs(self:get_capability().channel_5g_2) do
            if val == i then 
                return val    
            end
        end
    end
    return nil
end

--GET check 5G_2 channel
function Apcfg:get_channel_5g_2(val)
    if val == "auto" then 
        return val 
    end

    if self:get_capability().channel_5g_2 ~= nil then
        for _, i in ipairs(self:get_capability().channel_5g_2) do
            if val == i then 
                return val    
            end
        end
    end
    return "auto"
end

--GET check 6G channel
function Apcfg:set_channel_6g(val)
    if val == "auto" then 
        return val 
    end

    if self:get_capability().channel_6g ~= nil then
        for _, i in ipairs(self:get_capability().channel_6g) do
            if val == i then 
                return val    
            end
        end
    end
    return nil
end

--GET check 6G channel
function Apcfg:get_channel_6g(val)
    if val == "auto" then 
        return val 
    end

    if self:get_capability().channel_6g ~= nil then
        for _, i in ipairs(self:get_capability().channel_6g) do
            if val == i then 
                return val    
            end
        end
    end
    return "auto"
end

--GET check 2G htmode
function Apcfg:set_htmode_2g(val)
    if val == "auto" then 
        return val 
    end

    for _, i in ipairs(self:get_capability().htmode_2g) do
        if val == i then 
            return val    
        end
    end
    return nil
end

--GET check 2G htmode
function Apcfg:get_htmode_2g(val)
    if val == "auto" then 
        return val 
    end

    for _, i in ipairs(self:get_capability().htmode_2g) do
        if val == i then 
            return val    
        end
    end
    return "auto"
end

--GET check 5G htmode
function Apcfg:set_htmode_5g(val)
    if val == "auto" or val == "upto160" then 
        return val 
    end

    for _, i in ipairs(self:get_capability().htmode_5g) do
        if val == i then 
            return val    
        end
    end
    return nil
end

--GET check 5G htmode
function Apcfg:get_htmode_5g(val)
    if val == "auto" or val == "upto160" then 
        return val 
    end

    for _, i in ipairs(self:get_capability().htmode_5g) do
        if val == i then 
            return val    
        end
    end
    return "auto"
end

--GET check 5G_2 htmode
function Apcfg:set_htmode_5g_2(val)
    if val == "auto" then 
        return val 
    end

    if self:get_capability().htmode_5g_2 ~= nil then
        for _, i in ipairs(self:get_capability().htmode_5g_2) do
            if val == i then 
                return val    
            end
        end
    end
    return nil
end

    
--GET check 5G_2 htmode
function Apcfg:get_htmode_5g_2(val)
    if val == "auto" then 
        return val 
    end

    if self:get_capability().htmode_5g_2 ~= nil then
        for _, i in ipairs(self:get_capability().htmode_5g_2) do
            if val == i then 
                return val    
            end
        end
    end
    return "auto"
end

--GET check 6G htmode
function Apcfg:set_htmode_6g(val)
    if val == "auto" then 
        return val 
    end

    if self:get_capability().htmode_6g ~= nil then
        for _, i in ipairs(self:get_capability().htmode_6g) do
            if val == i then 
                return val
            end
        end
    end
    return nil
end

    
--GET check 6G htmode
function Apcfg:get_htmode_6g(val)
    if val == "auto" then 
        return val 
    end

    if self:get_capability().htmode_6g ~= nil then
        for _, i in ipairs(self:get_capability().htmode_6g) do
            if val == i then 
                return val
            end
        end
    end
    return "auto"
end

--GETWPS_TIME_OUT, time value of micro second.
function Apcfg:get_wps_timeout(val)
    return (tonumber(val) or 120) * 1000
end

--SET WPS_TIME_OUT, read only, just return nil.
function Apcfg:set_wps_timeout(val)
    return nil
end

--SET WPS_PIN, generate new pin or restore factory pin.
function Apcfg:set_wps_pin(val)
    if val == "generate" then
        val = wps_new_pin()
    elseif val == "default" then
        val = wps_def_pin()
    else
        val = nil
    end
    return val
end

--SET WEP_KEY, string length 5,13,16 or hex string length 10,26,32.
function Apcfg:set_wep_key(val)
    if val then
        local len = #val
        if len == 5 or len == 13 or len == 16 then
            return val
        elseif len == 10 or len == 26 or len == 32 then 
            return val:match("^[%x]+$")
        end
    end
    return nil
end

--SET SERVER_PORT, IPV4 port.
function Apcfg:set_port(val)
    local port = tonumber(val)
    return ( port and port >= 0 and port <= 65535 ) and val
end

--SET SERVER_IP, IPV4 address.
function Apcfg:set_server(val)
    return ip.IPv4(val) and val
end

--SET WPA_GROUP_REKEY, 0 or range 30~86400.
function Apcfg:set_wpa_group_rekey(val)
    local sec = tonumber(val)
    return (sec and (sec == 0 or (sec >= 30 and sec <= 86400 ))) and val
end

--SET WPA_KEY, string length 1~64.
function Apcfg:set_wpa_key(val)
    if val then
        local len = #val
        if len > 0 and len <= 64 then
            return val
        end
    end
    return nil
end

--SET PSK_KEY, string length 8~63, or 64 bytes hex string.
function Apcfg:set_psk_key(val)
    if val then
        local len = #val
        if len >= 8 and len < 64 then
            return val
        elseif len == 64 then
            return val:match("^[%x]+$")
        end
    end
    return nil
end

--SET BSSID, Ethernet MAC address, or null when root AP ssid is set.
function Apcfg:set_bssid(val)
    if val then
        local len = #val
        if len == 0 then
            local ssid   = self.data.ssid
            local enable = self.data.enable
            return (enable.value == "off" or ssid and #ssid.value > 0) and val
        else
            return val:match("^%x[02468aceACE]%-%x%x%-%x%x%-%x%x%-%x%x%-%x%x$")
        end
    end
    return nil
end

--SET ROOT SSID, string length 1~32 or 0 when bssid is set.
function Apcfg:set_root_ssid(val)
    if val then
        local len = #val
        if len == 0 then
            local bssid  = self.data.bssid
            local enable = self.data.enable
            return (enable.value == "off" or bssid and #bssid.value > 0) and val
        elseif len > 0 and len <= 32 then
            return val
        end
    end
    return nil
end

--SET SSID, string length 1~32.
function Apcfg:set_ssid(val)
    if val then
        local len = #val
        if len > 0 and len <= 32 then
            return val
        end
    end
    return nil
end

--SET Country short name, two upper case Letter.
function Apcfg:set_country(val)
	return val and val:match("^[A-Z][A-Z]$")
end

--SET Beacon interval range 40 ~ 1000
function Apcfg:set_beacon_int(val)
    local ms = tonumber(val)
    return (ms and ms <= 1000 and ms >= 40) and val
end

--SET Fragementation threshold range 256 ~ 2346
function Apcfg:set_frag(val)
    local byte = tonumber(val)
    return (byte and byte <= 2346 and byte >= 256) and val
end

--SET RTS threshold range 1 ~ 2346
function Apcfg:set_rts(val)
    local byte = tonumber(val)
    return (byte and byte <= 2346 and byte >= 1) and val
end

--SET DTIM period range 1 ~ 15
function Apcfg:set_dtim_period(val)
    local int = tonumber(val)
    return (int and int <= 15 and int >= 1) and val
end

--Get wireless intface name
--band 2g/5g/5g_2/6g
function Apcfg:wireless_get_interface(band, name)
    local intf = ""

    band = string.lower(band)

    self.uci:foreach(self.module, "wifi-device",
        function(s)
            if (s['band'] == band) then
                intf = s['.name']
            end
        end)

    if name and name == "GUEST" then
        self.uci:foreach(self.module, "wifi-iface",
            function(s)
                if s['device'] == intf then
                    if s['mode'] == 'ap' and s['guest'] then
                        intf = s['ifname']
                    end
                end
            end)
    end

    return intf   
end

function is_wlan_optimize_support()
    return wireless_support_csd()
end

function Apcfg:get_best_channel_result()
    local support_triband = wireless_support_triband()
    local support_6g = wireless_support_6g()
	local best_channel = {}
	best_channel.band2 = {}
	best_channel.band5 = {}
	best_channel.band6 = {}
    local wireless_ifname_2g = uci_r:get_profile("wireless", "wireless_ifname_2g") or ""
    local wireless_ifname_5g = uci_r:get_profile("wireless", "wireless_ifname_5g") or ""
    local wireless_ifname_5g_2 = nil
    local wireless_ifname_6g = nil

    if support_triband == "yes" then
        if support_6g == "yes" then
            best_channel.band6 = {}
            wireless_ifname_6g = uci_r:get_profile("wireless", "wireless_ifname_6g") or "wl11"
        else
            best_channel.band5_2 = {}
            wireless_ifname_5g_2 = uci_r:get_profile("wireless", "wireless_ifname_5g_2") or ""
        end
    end

    local data = self:csd_cmd("query")
    if nil == data then
        dbg.printf("data is nil")
    elseif type(data) == "table" then
        dbg.dumptable(data)
    else
        dbg.printf("data is " .. data)
    end

    if nil ~= data and type(data) == "table" then
        for k,v in pairs(data) do
            dbg.printf("%s=%s" % {k,v})
            -- for wireless interface name is like wl0 and wl01, it is substring relations

            if string.find(wireless_ifname_2g, k) ~= nil then
                best_channel.band2.channel = tonumber(v)
            elseif string.find(wireless_ifname_5g, k) then
                best_channel.band5.channel = tonumber(v)
            elseif support_triband == "yes" then
                if support_6g == "yes" and string.find(wireless_ifname_6g, k) ~= nil then
                    best_channel.band6.channel = tonumber(v)
                elseif string.find(wireless_ifname_5g_2, k) ~= nil then
                    best_channel.band5_2.channel = tonumber(v)
                end
            else
                dbg.printf("error, csd_cmd query result is not valid")
            end
        end
    end

	return best_channel
end

function Apcfg:get_best_channel()
    dbg.printf("==>query first, to clear last result")
    local data = self:csd_cmd("query")

    dbg.printf("==>scan")
    self:csd_cmd("scan")
    os.execute("sleep " .. 1)
	return true
end
