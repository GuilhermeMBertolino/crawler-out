
--For LUA
function __FILE__() return debug.getinfo(2, 'S').short_src end -- or use .source
function __FUNCTION__() return debug.getinfo(2, 'n').name end
function __LINE__() return debug.getinfo(2, 'l').currentline end

local M = {}
local uci       = require "luci.model.uci".cursor()
local log       = require "luci.log"
local validator = require "commonFunc.validator"
require "commonFunc.wifiUtils_commDefs"

local is_2G = false

function wifi_validator(parm, value, json)
	-- custom handler function only be called at default datatype validate fail.
	local ret = false;
	
	if(parm == "wifiSsid2G") then
		if(is_2G == false) then
			ret = true
		end
	elseif(parm == "wifiSecurity2G") then
		--None or WPAPSK+TKIP or WPA2PSK+AES
		if value == "0" or value == "1" or value == "2" then
			ret = true
		end
	elseif(parm == "wifiPassword2G") then
		if(is_2G == false) or (json["wifiSecurity2G"] == "0" and value == "") then
			ret = true
		end
	elseif(parm == "wifiSsid5G") then
		if(is_2G == true) then
			ret = true
		end
	elseif(parm == "wifiSecurity5G") then
		--None or WPA2PSK+AES
		if value == "0" or value == "2" then
			ret = true
		end
	elseif(parm == "wifiPassword5G") then
		if(is_2G == true) or (json["wifiSecurity5G"] == "0" and value == "") then
			ret = true
		end
	end

	return ret;
end

local brWifi_setup_maps = {
	["wifiIF"]          = { data_type = "radio_name",  handler = nil },
	["wifiSsid2G"]      = { data_type = "wlan_ssid",   handler = wifi_validator },
	["wifiSecurity2G"]  = { data_type = "",            handler = wifi_validator },
	["wifiPassword2G"]  = { data_type = "wlan_wpakey", handler = wifi_validator },
	["wifiSsid5G"]      = { data_type = "wlan_ssid",   handler = wifi_validator },
	["wifiSecurity5G"]  = { data_type = "",            handler = wifi_validator },
	["wifiPassword5G"]  = { data_type = "wlan_wpakey", handler = wifi_validator }
};

function M.brWifiSetup_handler(json)
	log.debug(0)
	--For debug.
	for k,v in pairs(json) do
		if type(v) == type("") or type(v) == type(0) then
			log.console("key="..k..", value="..v)
		else
			log.console("Invalid value type. key="..k..", tostring(value)="..tostring(v))
		end
	end

	--{"function":"brWifiSetup","data":{"wifiIF_autoid":"Wireless Network(5GHz a/n/ac/ax)","wifiSsid2G":"","wifiSecurity2G":"2","wifiPassword2G":"","wifiSsid5G":"abcshare5G","wifiSecurity5G":"2","wifiPassword5G":"shareabc123","wifiIF":"5G"}}
	--Data type validation.
	if json["wifiIF"] == "2G" then
		is_2G = true
	end
	if (validator.post_data_validate(json, brWifi_setup_maps) == false) then
		log.force("Failed to parse the input JSON data!!!");
		return {status="error", message="Data validation failed, "..tostring(json) };
	end

	uci:set("network", "op_br", "wifiIF", json["wifiIF"])
	uci:commit("network")
	if json["wifiIF"] == "2G" then
		--2.4G Settings--
		uci:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_CLIENT_IFNAME, "SSID", json["wifiSsid2G"]) --TODO: It may need decode from GUI's POST data.
		uci:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_CLIENT_IFNAME, "securityType", json["wifiSecurity2G"])
		uci:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_2G_CLIENT_IFNAME, "wpaPassphrase", json["wifiPassword2G"])
	elseif json["wifiIF"] == "5G" then
		--5G Settings--
		uci:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_CLIENT_IFNAME, "SSID", json["wifiSsid5G"]) --TODO: It may need decode from GUI's POST data.
		uci:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_CLIENT_IFNAME, "securityType", json["wifiSecurity5G"])
		uci:set(NTGR_WIFI_UCI_CONFIG_NAME, MTK_DEF_5G_CLIENT_IFNAME, "wpaPassphrase", json["wifiPassword5G"])
	end
	uci:commit(NTGR_WIFI_UCI_CONFIG_NAME)

	return {status="success", message="Finish Bridge Wireless Setup"}
end

return M
