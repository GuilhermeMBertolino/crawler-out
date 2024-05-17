local log = require "luci.log"
log.debug(1)
local soapParser = require "soap.soapParser"
local soapResponse = require "soap.soapResponse"
local soapCommon = require "soap.soapCommon"
local validator = require "commonFunc.validator"
local uci = require "luci.model.uci".cursor()
local uci_st = require "luci.model.uci".cursor(nil, "/var/state")
local uci_soap = require "luci.model.uci".cursor(nil, "/var/soapConfig")
local sys = require "luci.sys"
local ubus = require "ubus"
local TIME_ZONE_VER = "3.1"

local M = {}
M.service = "DeviceInfo"

function getSettingParamByXML(dataXml, input, action, maps)

	for k,v in pairs(input) do
		local tmpValue = soapParser.getActionParameter(dataXml, action, k)

		if tmpValue ~= nil then
			input[k] = soapParser.getActionParameter(dataXml, action, k)
		else
			log.console("Invalid parameter: "..k)
			return "RESPONSE_ERROR"
		end
	end

	if (validator.soap_data_validate(input, maps) == false) then
		log.console("Validation of SOAP data paramter is failed")
		return "RESPONSE_ERROR"
	end

	return input
end

function getSignalStrengthByMac(iface, macAddr)
	local cmd = "iwpriv "..iface.." pega_show stainfo"
	local ret = 0

	sys.exec(cmd)
	cmd = cmd.." | grep -i "..macAddr.." | awk -F '/' '{print $2}'"
	ret = tonumber(sys.exec(cmd)) or -100

	if ret <= -100 then
		ret = 0
	elseif ret >= -50 then
		ret = 100
	else
		ret = 2 * (ret + 100)
	end

	return ret
end

function ubusCall(path, method, arg)
	local conn = ubus.connect()

	if not conn then
		error("Failed to connect to ubusd")
	end

	local data = conn:call(path, method, arg)
	conn:close()

	return data
end

local linkspeedRa =
{
	--ra0 = {"54", "286", "600"}, --general for AX mode 1024QAM.
	ra0 = {"54", "230", "460"},
	rax0 = {"286", "572", "1200"},
	--ra1 = {"54", "286", "600"}, --general for AX mode 1024QAM.
	ra1 = {"54", "230", "460"},
	rax1 = {"286", "572", "1200"}
}
local devTypeNameV2 =
{
	"Computer_(Generic)",
	"Laptop",
	"Desktop",
	"Entertainment (Generic)",
	"TV",
	"Media Streamer",
	"Gaming",
	"Smart Speaker",
	"Home Office (Generic)",
	"Printer",
	"IoT (Generic)",
	"Smart Plug",
	"Fridge",
	"Light",
	"Thermostat",
	"Frame",
	"Smart Phone (Generic)",
	"Tablet",
	"Network (Generic)",
	"NAS",
	"Router",
	"Extender",
	"IP Phone",
	"Security (Generic)",
	"Camera",
	"Doorbell",
	"Smart Lock",
	"Wearable (Generic)"
}
function getAttachDevByDUTMac(macStr)
	local output = {NewAttachDevice = {}, }
--	not support smart zone, not need to check mac addr
--	local lanMac = uci_st:get("netgear", "board", "lan_mac") or "00:00:00:00:00:00"

--	if nil == string.match(macStr, ":") then
--		macStr = string.gsub(s['.name'], ("."):rep(2), "%1:"):sub(1, -2)
--	end

--	if string.lower(macStr) == string.lower(lanMac) then
		uci_st:foreach("landev", "dev",
			function(s)
				if s.ip ~= nil and s.linkstate == "up" then
					local device = {tag = nil,}
					local mac = {tag = nil,}
					local name = {tag = nil,}
					local ip = {tag = nil,}
					local access = {tag = nil,}
					local quality = {tag = nil,}
					local connType = {tag = nil,}
					local ssid = {tag = nil,}
					local linkspeed = {tag = nil,}
					local schedule = {tag = nil,}
					local schedulePeriod = {tag = nil,}
					local bridgeMac = {tag = nil,}
					local upload = {tag = nil,}
					local download = {tag = nil,}
					local qosPriority = {tag = nil,}
					local group = {tag = nil,}
					local nameSet = {tag = nil,}
					local devType = {tag = nil,}
					local devTypeSet = {tag = nil,}
					local devModel = {tag = nil,}
					local devModelSet = {tag = nil,}
					local devType2 = {tag = nil,}
					local devTypeName2 = {tag = nil,}
					local devBrand = {tag = nil,}
					local macAddr = "00:00:00:00:00:00"
					local bwMode = 3

					ip.tag = "IP"
					table.insert(ip, s.ip)

					nameSet.tag = "NameUserSet"
					table.insert(nameSet, (s.custom_devname ~= nil and "true" or "false"))

					name.tag = "Name"
					if s.custom_devname ~= nil then
						table.insert(name, s.custom_devname)
					elseif s.hostname ~= nil then
						table.insert(name, s.hostname)
					elseif s.DisplayNameNetgear ~= nil then
						table.insert(name, s.DisplayNameNetgear)
					else
						table.insert(name, "")
					end

					mac.tag = "MAC"
					macAddr = string.gsub(s['.name'], ("."):rep(2), "%1:"):sub(1, -2)
					table.insert(mac, macAddr)

					connType.tag = "ConnectionType"
					linkspeed.tag = "Linkspeed"
					quality.tag = "SignalStrength"
					ssid.tag = "SSID"
					if nil ~= s.interface and nil == string.match(s.interface, "eth") and nil == string.match(s.interface, "br%-lan") then
						bwMode = uci:get("NTGR_WiFi", (nil == string.match(s.interface, "x") and "ra0" or "rax0"), "bwMode")
						table.insert(linkspeed, linkspeedRa[s.interface][tonumber(bwMode)])
						table.insert(quality, getSignalStrengthByMac(s.interface, macAddr))
						table.insert(connType, (nil == string.match(s.interface, "x") and "2.4GHz" or "5GHz"))
						table.insert(ssid, uci:get("NTGR_WiFi", s.interface, "SSID"))
					else
						table.insert(linkspeed, "")
						table.insert(quality, "100")
						table.insert(connType, "wired")
					end

					access.tag = "AllowOrBlock"
					table.insert(access, "allow" == uci:get("landev", s['.name'], "rule") and "Allow" or "Block")

					bridgeMac.tag = "ConnAPMAC"
					table.insert(bridgeMac, sys.exec("ifconfig eth0 | grep HWaddr | awk '{printf $5}'"))

					-- follow RAX30 to reply fixed values
					schedule.tag = "Schedule"
					table.insert(schedule, "false")
					schedulePeriod.tag = "SchedulePeriod"
					table.insert(schedulePeriod, "0")
					upload.tag = "Upload"
					table.insert(upload, "0")
					download.tag = "Download"
					table.insert(download, "0")
					qosPriority.tag = "QosPriority"
					table.insert(qosPriority, "3")    -- 3:Normal
					group.tag = "Grouping"
					table.insert(group, "0")

					devTypeSet.tag = "DeviceTypeUserSet"
					table.insert(devTypeSet, (s.custom_devtype ~= nil and "true" or "false"))

					devType.tag = "DeviceType"
					devType2.tag = "DeviceTypeV2"
					devTypeName2.tag = "DeviceTypeNameV2"
					if s.custom_devtype ~= nil then
						table.insert(devType, s.custom_devtype)
						table.insert(devType2, s.custom_devtype)
						table.insert(devTypeName2, devTypeNameV2[s.custom_devtype] or devTypeNameV2[1])
					elseif s.DeviceTypeNetgear ~= nil then
						table.insert(devType, s.DeviceTypeNetgear)
						table.insert(devType2, s.DeviceTypeNetgear)
						table.insert(devTypeName2, devTypeNameV2[s.DeviceTypeNetgear] or devTypeNameV2[1])
					else
						-- DB has no devType value, give a default value 1 (Computer)
						table.insert(devType, "1")
						table.insert(devType2, "1")
						table.insert(devTypeName2, devTypeNameV2[1])
					end

					devModelSet.tag = "DeviceModelUserSet"
					table.insert(devModelSet, (s.custom_devmodel ~= nil and "true" or "false"))

					devModel.tag = "DeviceModel"
					if s.custom_devmodel ~= nil then
						table.insert(devModel, s.custom_devmodel)
					elseif s.DeviceModel ~= nil then
						table.insert(devModel, s.DeviceModel)
					else
						table.insert(devModel, "")
					end

					--Yocheng Lian, 2022/03/04, for SOAP Auto Test Tool V4.9, if SOAP supported version > 3.84, it's no more check this field.
					--However, we correct the SOAP supported version to 3.76 and then it can't pass autoTest Tool's determination.
                    --Matt, 2022/9/26. Just return device brand. About SOAP test tool, will comment on it to explain this SOAP behavior
                    --NH APP will display two rows:
                    --Row1: Device Name: Customize hostname -> hostname-> DisplayNameNetgear
                    --Row2: Brand * Model
					devBrand.tag = "DeviceBrand"
					if s.custom_devbrand ~= nil then
						table.insert(devBrand, s.custom_devbrand)
					elseif s.DeviceBrand ~= nil then
						table.insert(devBrand, s.DeviceBrand)
					else
						table.insert(devBrand, "")
					end

					device.tag = "Device"
					table.insert(device, ip)
					table.insert(device, name)
					table.insert(device, mac)
					table.insert(device, linkspeed)
					table.insert(device, quality)
					table.insert(device, connType)
					table.insert(device, ssid)
					table.insert(device, access)
					table.insert(device, schedule)
					table.insert(device, schedulePeriod)
					table.insert(device, bridgeMac)
					table.insert(device, upload)
					table.insert(device, download)
					table.insert(device, qosPriority)
					table.insert(device, group)
					table.insert(device, nameSet)
					table.insert(device, devType)
					table.insert(device, devTypeSet)
					table.insert(device, devModel)
					table.insert(device, devModelSet)
					table.insert(device, devType2)
					table.insert(device, devTypeName2)
					table.insert(device, devBrand)
					table.insert(output["NewAttachDevice"], device)
				end
			end
		)
--	else
--		return {}
--	end

	return output
end


local GetAttachDevice_maps =
	{
		NewDUTMac = {data_type = "soap_mac_addr", handler = nil}
	}

function M.GetAttachDevice(dataXml)
	local input = {NewDUTMac = ""}
	local output = {NewAttachDevice = ""}
	local attachDevice = ""
	local index = 0

--	# SPEC defined input parameter but tool v4.9.0.5 not
--	--[[get setting parameter from XML data]]
--	for k,v in pairs(input) do
--		local tmpValue = soapParser.getActionParameter(dataXml,"GetAttachDevice",k)
--
--		if tmpValue ~= nil then
--			input[k] = soapParser.getActionParameter(dataXml,"GetAttachDevice", k)
--		else
--			log.console("Invalid parameter: "..k)
--			return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED", {}, "GetAttachDevice", M.service)
--		end
--	end
--
--	if (validator.soap_data_validate(input, GetAttachDevice_maps) == false) then
--		log.console("Validation of SOAP data paramter is failed")
--		return soapResponse.buildResponseData("RESPONSE_ACTION_FAILED", {}, "GetAttachDevice", M.service)
--	end

	uci_st:foreach("landev", "dev",
		function(s)
			if s.ip ~= nil then
				local name = "---"
				local mac = "00:00:00:00:00:00"
				local bwMode = 3
				local linkspeed = ""
				local quality = 100
				local connType = "wired"

				index = index + 1
				attachDevice = attachDevice.."@"..index..";"..s.ip..";"

				if s.custom_devname ~= nil then
					name = s.custom_devname
				elseif s.hostname ~= nil then
					name = s.hostname
				end
				attachDevice = attachDevice..name..";"

				mac = string.gsub(s['.name'], ("."):rep(2), "%1:"):sub(1, -2)
				attachDevice = attachDevice..mac..";"

				if nil == string.match(s.interface, "eth")  and nil == string.match(s.interface, "br%-lan") then
					bwMode = uci:get("NTGR_WiFi", (nil == string.match(s.interface, "x") and "ra0" or "rax0"), "bwMode")
					linkspeed = linkspeedRa[s.interface][tonumber(bwMode)]
					quality = getSignalStrengthByMac(s.interface, mac)
					connType = "wireless"
				end
				attachDevice = attachDevice..connType..";"
				attachDevice = attachDevice..linkspeed..";"
				attachDevice = attachDevice..quality..";"

				allowOrBlock = "Allow"
				attachDevice = attachDevice..("allow" == uci:get("landev", s['.name'], "rule") and "Allow" or "Block")..";"

				if s.custom_devmodel ~= nil then
					deviceType = s.custom_devmodel
				else
					deviceType = "---"
				end
				attachDevice = attachDevice..deviceType

			end
		end
	)

	-- format: "2@1;192.168.1.2;Peter'sNB;11:22:33:44:55:66;wired;;100;Allow@2;192.168.1.3;William'sNB;11:22:33:44:55:77;wireless;300;100;Block;xbox"
	attachDevice = index..attachDevice
	output["NewAttachDevice"] = attachDevice

	return soapResponse.buildResponseData("RESPONSE_NOERROR", output, "GetAttachDevice", M.service)
end

function M.GetAttachDevice2(dataXml)
	local input = {NewDUTMac = ""}
	local output = {NewAttachDevice = {}, }
	local action = "GetAttachDevice2"
	local msg = "RESPONSE_NOERROR"

--	not support smart zone, not need input parameter
	--[[get setting parameter from XML data]]
--	input = getSettingParamByXML(dataXml, input, action, GetAttachDevice_maps)

--	if type(input) == "string" then
--		msg = input
--	else
		output = getAttachDevByDUTMac(input.NewDUTMac)
		msg = next(output) == nil and "RESPONSE_INVALID_ARGUMENTS" or "RESPONSE_NOERROR"
--	end

	return soapResponse.buildResponseData(msg, output, action, M.service)
end

function M.GetAttachDeviceAll(dataXml)
	local input = {NewDUTMac = ""}
	local output = {NewAttachDevice = {}, }
	local action = "GetAttachDeviceAll"
	local msg = "RESPONSE_NOERROR"

--	not support smart zone, not need input parameter
	--[[get setting parameter from XML data]]
--	input = getSettingParamByXML(dataXml, input, action, GetAttachDevice_maps)

--	if type(input) == "string" then
--		msg = input
--	else
		output = getAttachDevByDUTMac(input.NewDUTMac)
		msg = next(output) == nil and "RESPONSE_INVALID_ARGUMENTS" or "RESPONSE_NOERROR"
--	end

	return soapResponse.buildResponseData(msg, output, action, M.service)
end

function M.GetSysUpTime(dataXml)
	local output = {SysUpTime = ""}
	local sysinfo = ubusCall("system", "info", {}) or { }
	local time = sysinfo.uptime or 0
	local h, m, s, remaining

	h = math.floor(time / 3600)
	remaining = time % 3600
	m = math.floor(remaining / 60)
	s = remaining % 60

	output["SysUpTime"] = h..":"..m..":"..s

	return soapResponse.buildResponseData("RESPONSE_NOERROR", output, "GetSysUpTime", M.service)
end

function M.GetSystemInfo(dataXml)
	local output = {NewCPUUtilization = {}, NewPhysicalMemory = {}, NewMemoryUtilization = {}, NewPhysicalFlash = {}, NewAvailableFlash = {}}
	local cpuLoad = {tag = nil,}
	local cmd = ""
	local total, used

	cmd = "top -n 1 | grep 'CPU[:]' | awk -F ' ' '{print$8}' | awk -F '%' '{print$1}'"
	output["NewCPUUtilization"] = 100 - tonumber(sys.exec(cmd))

	cmd = "free | grep Mem[:] | awk -F ' ' '{print$2}'"
	total = math.floor(tonumber(sys.exec(cmd)) / 1024) <= 256 and 256 or 512
	output["NewPhysicalMemory"] = total

	cmd = "free | grep Mem[:] | awk -F ' ' '{print$3}'"
	used = math.floor(tonumber(sys.exec(cmd)) / 1024)
	output["NewMemoryUtilization"] = math.floor((used / total) * 100)

	cmd = "df -h -P /overlay | grep overlay | awk -F ' ' '{print$2}' | awk -F 'M' '{print$1}'"
	total = math.floor(tonumber(sys.exec(cmd)))
	output["NewPhysicalFlash"] = total

	cmd = "df -h -P /overlay | grep overlay | awk -F ' ' '{print$4}' | awk -F 'M' '{print$1}'"
	used = math.floor(tonumber(sys.exec(cmd)))
	output["NewAvailableFlash"] = total - used

	return soapResponse.buildResponseData("RESPONSE_NOERROR", output, "GetSystemInfo", M.service)
end

function M.GetExtendedFWVersionXML(dataXml)
	local output = {ExtFWVersions = {}, }

	--return RESPONSE_ERROR means "No extended firmware in this device"
	return soapResponse.buildResponseData("RESPONSE_ERROR", output, "GetExtendedFWVersionXML", M.service)
end

function M.GetSystemLogs(dataXml)
	local output = {NewLogDetails = ""}

	output["NewLogDetails"] = sys.exec("cat /www/files/system.log")

	return soapResponse.buildResponseData("RESPONSE_NOERROR", output, "GetSystemLogs", M.service)
end

function M.GetNTP(dataXml)
	local output = {Option = {}, NTPServer = {}, Status = {}}

	output["Option"] = ("0" == uci:get("system", "ntp", "preferred_ntp_server_enable")) and "Default" or "Preferred"
	output["NTPServer"] = ("Default" == output["Option"]) and "" or uci:get("system", "ntp", "preferred_ntp_server")
	output["Status"] = (nil == sys.exec("cat /tmp/ntp_sync")) and "Fail" or "Success"

	return soapResponse.buildResponseData("RESPONSE_NOERROR", output, "GetNTP", M.service)
end

function M.GetInfo(dataXml)
	local output = {ModelName = {}, Description = {}, SerialNumber = {}, Firmwareversion = {}, SmartAgentversion = {},
				FirewallVersion = {}, VPNVersion = {}, OthersoftwareVersion = {}, Hardwareversion = {},
				Otherhardwareversion = {}, FirstUseDate = {}, DeviceName = {}, FirmwareDLmethod = {}, FirmwareLastUpdate = {},
				FirmwareLastChecked = {}, DeviceMode = {}, DeviceModeCapability = {}, DeviceNameUserSet = {}}
	local devMode = uci:get("network", "@opmode[0]", "mode") or "router"

	if devMode == "router" then
		devMode = 0
	elseif devMode == "bridge" then
		devMode = 2
	else
		devMode = 1
	end

	output["ModelName"] = uci_st:get("netgear", "board", "model") or ""
	output["Description"] = "Netgear Smart Wizard 3.0, specification 0.8 version"
	output["SerialNumber"] = uci_st:get("netgear", "board", "sn") or ""
	output["Firmwareversion"] = uci_st:get("netgear", "fw", "cur_ver") or ""
	output["FirewallVersion"] = "2017-05-27-a4d98aea"
	output["Hardwareversion"] = "RAX5"
	output["DeviceName"] = uci:get("system", "@system[0]", "hostname") or "RAX5"
	output["DeviceMode"] = devMode
	output["DeviceModeCapability"] = "0;1;2"    --"Router;AP;Bridge"

	-- follow RAX30
	output["SmartAgentversion"] = "3.0"
	output["VPNVersion"] = "2.4.9"
	output["OthersoftwareVersion"] = (uci_st:get("netgear", "board", "model") or "").."NA"    -- follow RAX30 modelName+"NA"
	output["Otherhardwareversion"] = "N/A"
	output["FirstUseDate"] = "Sunday, 30 Sep 2007 01:10:03"
	output["FirmwareDLmethod"] = "Null"    -- follow RAX30
	output["DeviceNameUserSet"] = "true"

	-- TODO
	output["FirmwareLastUpdate"] = "N/A"
	output["FirmwareLastChecked"] = "N/A"

	return soapResponse.buildResponseData("RESPONSE_NOERROR", output, "GetInfo", M.service)
end

function M.GetSupportFeatureListXML(dataXml)
	local output = {newFeatureList = {}, }
	local features = {tag = nil,}
	local dynQoS = {tag = nil,}
	local accessCtl = {tag = nil,}
	local speedTest = {tag = nil,}
	local attachDev = {tag = nil,}
	local nameNTGRDev = {tag = nil,}
	local guestNetSch = {tag = nil,}
	local tcAcceptance = {tag = nil,}
	local pwdReset = {tag = nil,}
	local wpa3 = {tag = nil,}
	local axMode = {tag = nil,}
	local xmlEncoded = {tag = nil,}
	local timezone = {tag = nil,}
	local monLimit = {tag = nil,}
	local bitDefendSec = {tag = nil,}
	local devTypeIcon = {tag = nil,}
	local newDevNoti = {tag = nil,}
	local devTag = {tag = nil,}
	local smartConn = {tag = nil,}
    local opmode = uci:get("network", "@opmode[0]", "mode")

	-- follow RAX30 to reply fixed values
	dynQoS.tag = "DynamicQoS"
	table.insert(dynQoS, "1.0")
	accessCtl.tag = "AccessControl"
	table.insert(accessCtl, "1.0")
	speedTest.tag = "SpeedTest"
	table.insert(speedTest, "2.0")
	attachDev.tag = "AttachedDevice"
	table.insert(attachDev, "2.0")
	nameNTGRDev.tag = "NameNTGRDevice"
	table.insert(nameNTGRDev, "1.0")
	tcAcceptance.tag = "TCAcceptance"
	table.insert(tcAcceptance, "1.0")
	pwdReset.tag = "PasswordReset"
	table.insert(pwdReset, "2.0")
	wpa3.tag = "SupportWPA3"
	table.insert(wpa3, "1.0")
	axMode.tag = "SupportAXMode"
	table.insert(axMode, "1.0")
	xmlEncoded.tag = "SupportXMLEncoded"
	table.insert(xmlEncoded, "1.0")
	timezone.tag = "TimeZone"
	table.insert(timezone, TIME_ZONE_VER)
	monLimit.tag = "MaxMonthlyTrafficLimitation"
	table.insert(monLimit, "1000000")
    if opmode == "router" then
        -- Armor only support Router mode
        bitDefendSec.tag = "BitDefenderSecurity"
        table.insert(bitDefendSec, "1.0")
    end
	devTypeIcon.tag = "DeviceTypeIcon"
	table.insert(devTypeIcon, "2.1")
	newDevNoti.tag = "NewDeviceNoti"
	table.insert(newDevNoti, "1.0")
	devTag.tag = "DeviceTagging"
	table.insert(devTag, "1.0")
	smartConn.tag = "SmartConnect"
	table.insert(smartConn, "2.0")
	guestNetSch.tag = "GuestNetworkSchedule"
	table.insert(guestNetSch, "1.0")

	features.tag = "features"
	table.insert(features, dynQoS)
	table.insert(features, accessCtl)
	table.insert(features, speedTest)
	table.insert(features, attachDev)
	table.insert(features, nameNTGRDev)
	table.insert(features, guestNetSch)
	table.insert(features, tcAcceptance)
	table.insert(features, pwdReset)
	table.insert(features, wpa3)
	table.insert(features, axMode)
	table.insert(features, xmlEncoded)
	table.insert(features, timezone)
	table.insert(features, monLimit)
	table.insert(features, bitDefendSec)
	table.insert(features, devTypeIcon)
	table.insert(features, newDevNoti)
	table.insert(features, devTag)
	table.insert(features, smartConn)

	table.insert(output["newFeatureList"], features)

	return soapResponse.buildResponseData("RESPONSE_NOERROR", output, "GetSupportFeatureListXML", M.service)
end

function M.GetSupportFeatureList(dataXml)
	local output = {newFeatureList = ""}

	-- 1st: N/A, 2nd: Advanced Qos (7500/8000 phase I spec), 3rd: Open DNS, 4th: Circle
	output["newFeatureList"] = 4    -- follow RAX30

	return soapResponse.buildResponseData("RESPONSE_NOERROR", output, "GetSupportFeatureList", M.service)
end


local SetNetgearDeviceName_maps =
{
	MAC = {data_type = "soap_mac_addr", handler = nil},
	Name = {data_type = "device_name", handler = nil}
}
function M.SetNetgearDeviceName(dataXml)
	local input = {MAC = "", Name = ""}
	local action = "SetNetgearDeviceName"
	local msg = "RESPONSE_NOERROR"

	--[[get setting parameter from XML data]]
	input = getSettingParamByXML(dataXml, input, action, SetNetgearDeviceName_maps)

	if type(input) == "string" then
		msg = input
	else
		uci:set("system", "@system[0]", "hostname", input.Name)
		uci:commit("system")
		table.insert(changed_config, "system")

		if "dhcp" == uci:get("network", "wan", "proto") then
			uci:set("network", "wan", "hostname", input.Name)
			uci:commit("network")
			table.insert(changed_config, "network")
		end
	end

	return soapResponse.buildResponseData(msg, {}, action, M.service)
end

local SetDeviceNameIconByMAC_maps =
{
	NewDeviceNameIconMAC = {data_type = "soap_mac_addr", handler = nil},
	NewDeviceCustomName = {data_type = "device_name", handler = nil},
	NewDeviceIconChoice = {data_type = "number", handler = nil},    -- not necessary if support v2
	DeviceTypeV2 = {data_type = "number", handler = nil}
}
function M.SetDeviceNameIconByMAC(dataXml)
	local input = {NewDeviceNameIconMAC = "", NewDeviceCustomName = "", NewDeviceIconChoice = "", DeviceTypeV2 = ""}
	local action = "SetDeviceNameIconByMAC"
	local msg = "RESPONSE_NOERROR"

	--[[get setting parameter from XML data]]
	input = getSettingParamByXML(dataXml, input, action, SetDeviceNameIconByMAC_maps)

	if type(input) == "string" then
		msg = input
	else
		uci:foreach("landev", "dev",
			function(s)
				local mac = string.gsub(s['.name'], ("."):rep(2), "%1:"):sub(1, -2) or "00:00:00:00:00:00"
				if nil ~= string.find(string.lower(mac), string.lower(input.NewDeviceNameIconMAC)) then
					uci_soap:set("landev", s['.name'], "custom_devname", input.NewDeviceCustomName)
					uci_soap:set("landev", s['.name'], "custom_devtype", input.DeviceTypeV2 == 0 and "" or input.DeviceTypeV2)
					soapCommon.configToSaveOrCommit(uci_soap, "landev")
				end
			end
		)
	end

	return soapResponse.buildResponseData(msg, {}, action, M.service)
end

local SetDeviceInfoByMAC_maps =
{
	MAC = {data_type = "soap_mac_addr", handler = nil},
	Name = {data_type = "device_name", handler = nil},
	DeviceTypeV2 = {data_type = "number", handler = nil},
	DeviceModel = {data_type = "device_name", handler = nil}
}
function M.SetDeviceInfoByMAC(dataXml)
	local input = {MAC = "", Name = "", DeviceType = "", DeviceTypeV2 = "", DeviceModel = ""}
	local action = "SetDeviceInfoByMAC"
	local msg = "RESPONSE_NOERROR"

	--[[get setting parameter from XML data]]
	input = getSettingParamByXML(dataXml, input, action, SetDeviceInfoByMAC_maps)

	if type(input) == "string" then
		msg = input
	else
		uci:foreach("landev", "dev",
			function(s)
				local mac = string.gsub(s['.name'], ("."):rep(2), "%1:"):sub(1, -2) or "00:00:00:00:00:00"

				if nil ~= string.find(string.lower(mac), string.lower(input.MAC)) then
					uci:set("landev", s['.name'], "custom_devname", input.Name)
					uci:set("landev", s['.name'], "custom_devtype", input.DeviceTypeV2 == 0 and "" or input.DeviceTypeV2)
					uci:set("landev", s['.name'], "custom_devmodel", input.DeviceModel == 0 and "" or input.DeviceModel)
					uci:commit("landev")
					table.insert(changed_config, "landev")
				end
			end
		)
	end

	return soapResponse.buildResponseData(msg, {}, action, M.service)
end

local SetDeviceMode_maps =
{
	DeviceMode = {data_type = "number", handler = nil}
}
function M.SetDeviceMode(dataXml)
	local input = {DeviceMode = ""}
	local action = "SetDeviceMode"
	local msg = "RESPONSE_NOERROR"

	--[[get setting parameter from XML data]]
	input = getSettingParamByXML(dataXml, input, action, SetDeviceMode_maps)

	if type(input) == "string" then
		msg = input
	else
		local mode = "router"

		if input.DeviceMode == "0" then
			mode = "router"
		elseif input.DeviceMode == "1" then
			mode = "ap"
		elseif input.DeviceMode == "2" then
			mode = "bridge"
		end

		uci:set("network", "@opmode[0]", "mode", mode)
		uci:commit("network")
		table.insert(changed_config, "network")
	end

	return soapResponse.buildResponseData(msg, {}, action, M.service)
end

function M.getTimeZoneVer()

	return TIME_ZONE_VER
end

return M
