-- Get functions for DashBoard
local cgilua = require "cgilua"
local uci    = require "luci.model.uci".cursor()
local soap = require "soap"

local M = {}

local log = require "luci.log" -- for debug

log.debug(0)

function M.getWANPendingPage()

  local interface = require "webGetFunc.interface"
  if interface.getWANPortStatus() == "up" then
      return "BAS_wan.html";
  else
      return "WIZ_sel.html";
  end
end

function M.getBasicHomeWiFiPri()
    --[0] Display wireless client if operationMode is bridge
    --[1] Display 'OFF' if both of 2.4GHz and 5GHz are disabled.
    --[2] Display 'No Security' if the security of 2.4GHz or 5GHz is disabled.
    --[3] Display 2.4GHz if it is enabled.
    --[4] Display 5GHz if it is enabled and 2.4GHz is disabled.
    local opMode = uci:get("network", "@opmode[0]", "mode")
    local radio_2G_enable = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "radioOn")
    local radio_5G_enable = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "radioOn")
    local radio_2G_security = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "securityType")
    local radio_5G_security = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "securityType")
    if (opMode and opMode == "bridge") then
        local uciWiFi_section = (uci:get("network", "op_br", "wifiIF") == "5G") and MTK_DEF_5G_CLIENT_IFNAME or MTK_DEF_2G_CLIENT_IFNAME
        local ssid =  uci:get(NTGR_WIFI_UCI_CONFIG_NAME, uciWiFi_section, "SSID")
        local key = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, uciWiFi_section, "wpaPassphrase")
        cgilua.put("<tr style=\"text-align:center\"><td id=\"wireless1\"><span id=\"Wireless-status1\" class=\"Status-wireless-normal\" mlang=\"SWS020\">Name (SSID)</span><span class=\"Condition-normal\" style=\"white-space:pre\">:   "..ssid.."&nbsp;&nbsp;&nbsp;</span>         </td><td id=\"wireless2\"></td></tr><tr style=\"text-align:center\"><td id=\"wireless3\"><span id=\"Wireless-status2\" class=\"Status-wireless-normal\" mlang=\"D-genie_336\">Key/Password:</span><span class=\"Condition-normal\" style=\"white-space:pre\">:   "..key.."&nbsp;&nbsp;&nbsp;</span></td><td id=\"wireless4\" /><tr>")
    elseif ( radio_2G_enable == "false" and radio_5G_enable == "false" ) then
        cgilua.put("<tr><td style=\"valign:middle;text-align:center\"><span class=\"Status-wireless-unnormal\" id=\"wlan_stat\" mlang=\"genie_90\">OFF</span></td></tr>")
    elseif ( (radio_2G_enable == "true"  and tonumber(radio_2G_security) <= 1 ) or (radio_5G_enable == "true"  and tonumber(radio_5G_security) <= 1 )) then
        cgilua.put("<tr><td style=\"valign:middle;text-align:center\"><span class=\"Status-wireless-unnormal\" id=\"wlan_stat\" mlang=\"genie_169\">No Security</span></td></tr>")
    elseif (radio_2G_enable == "true") then
        local ssid_2g =  soap.escape(uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "SSID"))
        local key_2g = soap.escape(uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "wpaPassphrase"))
        cgilua.put("<tr style=\"text-align:center\"><td id=\"wireless1\"><span id=\"Wireless-status1\" class=\"Status-wireless-normal\" mlang=\"SWS020\">Name (SSID)</span><span class=\"Condition-normal\" style=\"white-space:pre\">:   "..ssid_2g.."&nbsp;&nbsp;&nbsp;</span>         </td><td id=\"wireless2\"></td></tr><tr style=\"text-align:center\"><td id=\"wireless3\"><span id=\"Wireless-status2\" class=\"Status-wireless-normal\" mlang=\"D-genie_336\">Key/Password:</span><span class=\"Condition-normal\" style=\"white-space:pre\">:   "..key_2g.."&nbsp;&nbsp;&nbsp;</span></td><td id=\"wireless4\" /><tr>")
    else
        local ssid_5g =  soap.escape(uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "SSID"))
        local key_5g = soap.escape(uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "wpaPassphrase"))
        cgilua.put("<tr style=\"text-align:center\"><td id=\"wireless1\"><span id=\"Wireless-status1\" class=\"Status-wireless-normal\" mlang=\"SWS020\">Name (SSID)</span><span class=\"Condition-normal\" style=\"white-space:pre\">:   "..ssid_5g.."&nbsp;&nbsp;&nbsp;</span>         </td><td id=\"wireless2\"></td></tr><tr style=\"text-align:center\"><td id=\"wireless3\"><span id=\"Wireless-status2\" class=\"Status-wireless-normal\" mlang=\"D-genie_336\">Key/Password:</span><span class=\"Condition-normal\" style=\"white-space:pre\">:   "..key_5g.."&nbsp;&nbsp;&nbsp;</span></td><td id=\"wireless4\" /><tr>")
    end
end

function M.getBasicHomeWiFiGuest()
    --[1] Display NOT ENABLED if both of 2.4GHz and 5GHz are disabled.
    --[2] Display 2.4GHz if it is enabled
    --[3] Display 5GHz if it is enabled and 2.4GHz is disabled.
    local radio_2G_enable = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_PRIMARY_IFNAME, "radioOn")
    local radio_5G_enable = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_PRIMARY_IFNAME, "radioOn")
    local radio_guest_2G_enable = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_GUEST_IFNAME, "guestEnable")
    local radio_guest_5G_enable = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_GUEST_IFNAME, "guestEnable")
    local radio_guest_2G_security = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_GUEST_IFNAME, "securityType")
    if ( radio_guest_2G_security == nil ) then radio_guest_2G_security = "1" end
    local radio_guest_5G_security = uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_GUEST_IFNAME, "securityType")
    if ( radio_guest_5G_security == nil ) then radio_guest_5G_security = "1" end
    local ssid_2g = ""
    local key_2g = ""
    local ssid_5g = ""
    local key_5g = ""

    if ( (radio_guest_2G_enable == "false" or radio_2G_enable == "false") and (radio_guest_5G_enable == "false" or radio_5G_enable == "false") ) then
        cgilua.put("<tr><td id=\"guest1\" style=\"valign:middle;text-align:center\"><span id=\"Guest-status1\" class=\"Status-normal\" mlang=\"D-genie_25\">STATUS</span><span class=\"Status-normal\">:&nbsp;&nbsp;&nbsp;<span><span class=\"Condition-normal\" mlang=\"genie_87\">NOT ENABLED</span></span><span class=\"Condition-normal\" style=\"white-space:pre\" id=\"gssid_word\" style=\"display:none;\">"..ssid_2g.."&nbsp;&nbsp;&nbsp;</span><span class=\"Condition-normal\" style=\"white-space:pre\" id=\"gpwd_word\" style=\"display:none;\">"..key_2g.."&nbsp;&nbsp;&nbsp;</span></td><td id=\"guest2\"></td></tr>")
    elseif ( radio_guest_2G_enable == "true" and radio_2G_enable == "true" ) then
        ssid_2g = soap.escape(uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_GUEST_IFNAME, "SSID"))
        if ( tonumber(radio_guest_2G_security) <= 1) then
            cgilua.put("<tr style=\"text-align:center\"><td id=\"guest1\"><span id=\"Guest-status1\" class=\"Status-wireless-normal\" mlang=\"SWS020\">Name (SSID)</span><span class=\"Status-normal\">:&nbsp;&nbsp;&nbsp;<span><span class=\"Condition-normal\" style=\"white-space:pre\" id=\"gssid_word\">"..ssid_2g.."&nbsp;&nbsp;&nbsp;</span></td> <td id=\"guest2\"></td></tr><tr style=\"text-align:center\"><td id=\"guest3\"><span id=\"Guest-status2\" class=\"Status-wireless-normal\" mlang=\"D-genie_336\">Key/Password</span><span class=\"Status-wireless-normal\">:&nbsp;&nbsp;&nbsp;</span><span class=\"Condition-normal\" style=\"white-space:pre\" mlang=\"SWS016\">None</span> <span class=\"Condition-normal\" style=\"white-space:pre\" id=\"gpwd_word\" style=\"display:none;\">"..key_2g.."&nbsp;&nbsp;&nbsp;</span></td><td id=\"guest4\"></td><tr>")
        else
            key_2g = soap.escape(uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_GUEST_IFNAME, "wpaPassphrase"))
            cgilua.put("<tr style=\"text-align:center\"><td id=\"guest1\"><span id=\"Guest-status1\" class=\"Status-wireless-normal\" mlang=\"SWS020\">Name (SSID)</span><span class=\"Status-normal\">:&nbsp;&nbsp;&nbsp;<span><span class=\"Condition-normal\" style=\"white-space:pre\" id=\"gssid_word\">"..ssid_2g.."&nbsp;&nbsp;&nbsp;</span></td> <td id=\"guest2\"></td></tr><tr style=\"text-align:center\"><td id=\"guest3\"><span id=\"Guest-status2\" class=\"Status-wireless-normal\" mlang=\"D-genie_336\">Key/Password</span><span class=\"Status-wireless-normal\">:&nbsp;&nbsp;&nbsp;</span><span class=\"Condition-normal\" style=\"white-space:pre\" id=\"gpwd_word\">"..key_2g.."&nbsp;&nbsp;&nbsp;</span> </td><td id=\"guest4\"></td><tr>")
        end
    elseif ( radio_guest_5G_enable == "true" and radio_5G_enable == "true" ) then
        ssid_5g = soap.escape(uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_GUEST_IFNAME, "SSID"))
        if ( tonumber(radio_guest_5G_security) <= 1) then
            cgilua.put("<tr style=\"text-align:center\"><td id=\"guest1\"><span id=\"Guest-status1\" class=\"Status-wireless-normal\" mlang=\"SWS020\">Name (SSID)</span><span class=\"Status-normal\">:&nbsp;&nbsp;&nbsp;<span><span class=\"Condition-normal\" style=\"white-space:pre\" id=\"gssid_word\">"..ssid_5g.."&nbsp;&nbsp;&nbsp;</span></td> <td id=\"guest2\"></td></tr><tr style=\"text-align:center\"><td id=\"guest3\"><span id=\"Guest-status2\" class=\"Status-wireless-normal\" mlang=\"D-genie_336\">Key/Password</span><span class=\"Status-wireless-normal\">:&nbsp;&nbsp;&nbsp;</span><span class=\"Condition-normal\" style=\"white-space:pre\" mlang=\"SWS016\">None</span> <span class=\"Condition-normal\" style=\"white-space:pre\" id=\"gpwd_word\" style=\"display:none;\">"..key_5g.."&nbsp;&nbsp;&nbsp;</span> </td><td id=\"guest4\"></td><tr>")
        else
            key_5g = soap.escape(uci:get(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_GUEST_IFNAME, "wpaPassphrase"))
            cgilua.put("<tr style=\"text-align:center\"><td id=\"guest1\"><span id=\"Guest-status1\" class=\"Status-wireless-normal\" mlang=\"SWS020\">Name (SSID)</span><span class=\"Status-normal\">:&nbsp;&nbsp;&nbsp;<span><span class=\"Condition-normal\" style=\"white-space:pre\" id=\"gssid_word\">"..ssid_5g.."&nbsp;&nbsp;&nbsp;</span></td> <td id=\"guest2\"></td></tr><tr style=\"text-align:center\"><td id=\"guest3\"><span id=\"Guest-status2\" class=\"Status-wireless-normal\" mlang=\"D-genie_336\">Key/Password</span><span class=\"Status-wireless-normal\">:&nbsp;&nbsp;&nbsp;</span><span class=\"Condition-normal\" style=\"white-space:pre\" id=\"gpwd_word\">"..key_5g.."&nbsp;&nbsp;&nbsp;</span> </td><td id=\"guest4\"></td><tr>")
        end
    else
        cgilua.put("<tr><td id=\"guest1\" style=\"valign:middle;text-align:center\"><span id=\"Guest-status1\" class=\"Status-normal\" mlang=\"D-genie_25\">STATUS</span><span class=\"Status-normal\">:&nbsp;&nbsp;&nbsp;<span><span class=\"Condition-normal\" mlang=\"genie_87\">NOT ENABLED</span></span><span class=\"Condition-normal\" style=\"white-space:pre\" id=\"gssid_word\" style=\"display:none;\">"..ssid_2g.."&nbsp;&nbsp;&nbsp;</span><span class=\"Condition-normal\" style=\"white-space:pre\" id=\"gpwd_word\" style=\"display:none;\">"..key_2g.."&nbsp;&nbsp;&nbsp;</span></td><td id=\"guest2\"></td></tr>")
    end
end

return M
