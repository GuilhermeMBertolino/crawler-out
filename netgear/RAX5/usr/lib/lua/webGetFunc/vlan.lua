local M = {}
local uci  = require "luci.model.uci".cursor()
local json = require "luci.json"
local log = require "luci.log" -- for debug
local util = require "luci.util"

function M.getCheckboxVal_enableVlan()
    local enableVlan = uci:get("vlan", "@VlanCfg[0]", "enableVlan")
    return enableVlan
end

function M.getRadioVal_groupType()
    local group_type = uci:get("vlan", "@VlanCfg[0]", "groupType")
    return group_type
end

function M.getCheckboxVal_port1()
    local port1 = uci:get("vlan", "BridgeGP", "port1")
    return port1
end
function M.getCheckboxVal_port2()
    local port2 = uci:get("vlan", "BridgeGP", "port2")
    return port2
end
function M.getCheckboxVal_port3()
    local port3 = uci:get("vlan", "BridgeGP", "port3")
    return port3
end
function M.getCheckboxVal_port4()
    local port4 = uci:get("vlan", "BridgeGP", "port4")
    return port4
end
function M.getCheckboxVal_wifi2g()
    local wifi2g = uci:get("vlan", "BridgeGP", "wifi2g")
    return wifi2g
end
function M.getCheckboxVal_wifi5g()
    local wifi5g = uci:get("vlan", "BridgeGP", "wifi5g")
    return wifi5g
end

function M.getVlanRuleTable()
    log.debug(0)
    local vlan_rule_table = {}
    local index = 1

    uci:foreach("vlan", "switch_vlan",
      function(s)
      --log.console_r(s)

      if s.name == 'EtherWan' then return true end
      if s.name == 'Bridge' then return true end

      local chk_port1 = ''
      local chk_port2 = ''
      local chk_port3 = ''
      local chk_port4 = ''
      if s.ports ~= nil then
        port_list = util.split(s.ports," ")

        for i in ipairs(port_list) do
          --log.console(i, port_list[i])
          if port_list[i] == '1' then
            chk_port1 = "checked"
          elseif port_list[i] == '2' then
            chk_port2 = "checked"
          elseif port_list[i] == '3' then
            chk_port3 = "checked"
          elseif port_list[i] == '4' then
            chk_port4 = "checked"
          end
        end
      end

      local wifi2g_ck, wifi5g_ck=''
      if s.name == 'Internet' then
	vid = uci:get("vlan", "EtherWan", "vid")
        ig_wifi2g = uci:get("vlan", "Internet", "wifi2g")
        ig_wifi5g = uci:get("vlan", "Internet", "wifi5g")
        if ig_wifi2g=='true' then wifi2g_ck="checked" end
        if ig_wifi5g=='true' then wifi5g_ck = "checked" end
      else
	vid = s.vid
        if s.wifi2g=='true' then wifi2g_ck="checked" end
        if s.wifi5g=='true' then wifi5g_ck="checked" end
      end

      if s.enable_rule == '1' then
         chk_enRule ="checked"
      else
         chk_enRule=""
      end
      vlan_rule_table[tostring(index)] = {
         __index = index,
         __iid = index,
         __name = s.name,
         __enableRule= chk_enRule,
         __vlandId = vid,
         __priority = s.priority,
         __enPort1 = chk_port1,
         __enPort2 = chk_port2,
         __enPort3 = chk_port3,
         __enPort4 = chk_port4,
         __enWifi2g = wifi2g_ck,
         __enWifi5g = wifi5g_ck
      }
      index = index + 1
    end)

    return vlan_rule_table
end

return M
