﻿var faq_data = {
"dashboard": {
"index": "dashboard",
"name": "<#1319#>",
"link": "GameDashboard.asp",
"menu": "<#1321#>",
"mode": ["RT", "AP"],
"support": (() => isSupport("rog"))(),
},
"aiMesh": {
"index": "aiMesh",
"name": "AiMesh",
"link": "AiMesh.asp",
"menu": "AiMesh",
"mode": ["RT", "AP"],
"support": (() => isSupport("amas"))(),
},
"networkProtection": {
"index": "networkProtection",
"name": "<#1268#>",
"link": "AiProtection_HomeProtection.asp",
"menu": "<#1315#>",
"mode": ["RT"],
"support": (() => isSupport("bwdpi"))(),
},
"maliciousSite": {
"index": "maliciousSite",
"name": "<#1312#>",
"link": "AiProtection_MaliciousSitesBlocking.asp",
"menu": "<#1315#>",
"mode": ["RT"],
"support": (() => isSupport("dpi_mals"))(),
},
"twoWayIPS": {
"index": "twoWayIPS",
"name": "<#1332#>",
"link": "AiProtection_IntrusionPreventionSystem.asp",
"menu": "<#1315#>",
"mode": ["RT"],
"support": (() => isSupport("dpi_vp"))(),
},
"infectedDevice": {
"index": "infectedDevice",
"name": "<#1225#>",
"link": "AiProtection_InfectedDevicePreventBlock.asp",
"menu": "<#1315#>",
"mode": ["RT"],
"support": (() => isSupport("dpi_vp"))(),
},
"webAppFilter": {
"index": "webAppFilter",
"name": "<#3403#>",
"link": "AiProtection_WebProtector.asp",
"menu": "<#489#>",
"mode": ["RT"],
"support": (() => isSupport("webs_filter"))(),
},
"timeScheduling": {
"index": "timeScheduling",
"name": "<#1238#>",
"link": "ParentalControl.asp",
"menu": "<#489#>",
"mode": ["RT"],
"support": (() => isSupport("PARENTAL2"))(),
},
"gameAcceleration": {
"index": "opegameAccelerationnNAT",
"name": "<#2205#>",
"link": "GameBoost.asp",
"menu": "<#2205#>",
"mode": ["RT"],
"support": (() => isSupport("gameMode"))(),
},
"qos": {
"index": "qos",
"name": "<#2736#>",
"link": "QoS_EZQoS.asp",
"menu": "<#2205#>",
"mode": ["RT"],
"support": true,
},
"bandwidthLimiter": {
"index": "bandwidthLimiter",
"name": "<#*** not_found_dict : Bandwidth_Limite***#>",
"link": "QoS_EZQoS.asp",
"menu": "<#2205#>",
"mode": ["RT"],
"support": true,
},
"wtfast": {
"index": "wtfast",
"name": "WTFast",
"link": "Advanced_WTFast_Content.asp",
"menu": "<#2205#>",
"mode": ["RT"],
"support": (() => isSupport("wtfast"))(),
},
"gearAccelerator": {
"index": "gearAccelerator",
"name": "<#2245#>",
"link": "GearAccelerator.asp",
"menu": "<#2205#>",
"mode": ["RT"],
"support": (() => isSupport("gameMode"))(),
},
"internetSpeed": {
"index": "internetSpeed",
"name": "<#2398#>",
"link": "AdaptiveQoS_InternetSpeed.asp",
"menu": "<#2205#>",
"mode": ["RT"],
"support": (() => isSupport("ookla"))(),
},
"openNAT": {
"index": "openNAT",
"name": "Open NAT",
"link": "GameProfile.asp",
"menu": "Open NAT",
"mode": ["RT"],
"support": (() => isSupport("gameMode"))(),
},
"gameRadar": {
"index": "gameRadar",
"name": "<#1325#>",
"link": "Main_GameServer_Content.asp",
"menu": "<#1325#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("rog"))(),
},
"wifiRadar": {
"index": "wifiRadar",
"name": "<#3902#>",
"link": "WiFi_Insight.asp",
"menu": "<#3902#>",
"mode": ["RT", "AP", "RE"],
"support": (() => isSupport("rog"))(),
},
"serverPPTP": {
"index": "serverPPTP",
"name": "PPTP",
"link": "Advanced_VPN_PPTP.asp",
"menu": "VPN",
"mode": ["RT"],
"support": (() => isSupport("pptpd"))(),
},
"serverOpenVPN": {
"index": "serverOpenVPN",
"name": "OpenVPN",
"link": "Advanced_VPN_OpenVPN.asp",
"menu": "VPN",
"mode": ["RT"],
"support": (() => isSupport("openvpnd"))(),
},
"serverIPSecVPN": {
"index": "serverIPSecVPN",
"name": "IPSec VPN",
"link": "Advanced_VPN_IPSec.asp",
"menu": "VPN",
"mode": ["RT"],
"support": (() => isSupport("ipsec_srv"))(),
},
"vpnFusion": {
"index": "vpnFusion",
"name": "<#4271#>",
"link": "Advanced_VPNClient_Content.asp",
"menu": "VPN",
"mode": ["RT"],
"support": (() => isSupport("vpnc"))(),
},
"instantGuard": {
"index": "instantGuard",
"name": "<#4271#>",
"link": "Advanced_Instant_Guard.asp",
"menu": "VPN",
"mode": ["RT"],
"support": (() => isSupport("Instant_Guard"))(),
},
"statistic": {
"index": "statistic",
"name": "<#3325#>",
"link": "TrafficAnalyzer_Statistic.asp",
"menu": "<#3446#>",
"mode": ["RT"],
"support": (() => isSupport("traffic_analyzer"))(),
},
"bandwidthMponitor": {
"index": "bandwidthMponitor",
"name": "<#1460#>",
"link": "AdaptiveQoS_Bandwidth_Monitor.asp",
"menu": "<#3446#>",
"mode": ["RT"],
"support": (() => isSupport("bandwidth_monitor"))(),
},
"TrafficMponitor": {
"index": "TrafficMponitor",
"name": "<#802#>",
"link": "Main_TrafficMonitor_realtime.asp",
"menu": "<#3446#>",
"mode": ["RT"],
"support": (() => isSupport("bandwidth_monitor"))(),
},
"webHistory": {
"index": "webHistory",
"name": "<#920#>",
"link": "AdaptiveQoS_WebHistory.asp",
"menu": "<#3446#>",
"mode": ["RT"],
"support": (() => isSupport("web_history"))(),
},
"auraRGB": {
"index": "auraRGB",
"name": "<#4313#>",
"link": "index.asp",
"menu": "<#401#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"wirelessGeneral": {
"index": "wirelessGeneral",
"name": "<#403#> <#404#>",
"link": "Advanced_Wireless_Content.asp",
"menu": "<#403#>",
"mode": ["RT", "AP"],
"support": true,
},
"smartConnect": {
"index": "smartConnect",
"name": "<#3282#>",
"link": "Advanced_Wireless_Content.asp",
"menu": "<#403#>",
"mode": ["RT", "AP"],
"support": (() => isSupport("smart_connect") || isSupport("bandstr"))(),
},
"wirelessHideSSID": {
"index": "wirelessHideSSID",
"name": "<#4017#>",
"link": "Advanced_Wireless_Content.asp",
"menu": "<#403#>",
"mode": ["RT", "AP"],
"support": true,
},
"networkName": {
"index": "networkName",
"name": "<#586#>",
"link": "Advanced_Wireless_Content.asp",
"menu": "<#403#>",
"mode": ["RT", "AP"],
"support": true,
},
"channelBandwidth": {
"index": "channelBandwidth",
"name": "<#3942#>",
"link": "Advanced_Wireless_Content.asp",
"menu": "<#403#>",
"mode": ["RT", "AP"],
"support": true,
},
"controlChannel": {
"index": "controlChannel",
"name": "<#876#>",
"link": "Advanced_Wireless_Content.asp",
"menu": "<#403#>",
"mode": ["RT", "AP"],
"support": true,
},
"authMethod": {
"index": "authMethod",
"name": "<#3930#>",
"link": "Advanced_Wireless_Content.asp",
"menu": "<#403#>",
"mode": ["RT", "AP"],
"support": true,
},
"wpaEncrypt": {
"index": "wpaEncrypt",
"name": "<#881#>",
"link": "Advanced_Wireless_Content.asp",
"menu": "<#403#>",
"mode": ["RT", "AP"],
"support": true,
},
"wpaKey": {
"index": "wpaKey",
"name": "<#4069#>",
"link": "Advanced_Wireless_Content.asp",
"menu": "<#403#>",
"mode": ["RT", "AP"],
"support": true,
},
"protectedManagementFrames": {
"index": "protectedManagementFrames",
"name": "<#4050#>",
"link": "Advanced_Wireless_Content.asp",
"menu": "<#403#>",
"mode": ["RT", "AP"],
"support": true,
},
"gtkInterval": {
"index": "gtkInterval",
"name": "<#4080#>",
"link": "Advanced_Wireless_Content.asp",
"menu": "<#403#>",
"mode": ["RT", "AP"],
"support": true,
},
"wps": {
"index": "wps",
"name": "<#405#>",
"link": "Advanced_WWPS_Content.asp",
"menu": "<#403#>",
"mode": ["RT", "AP"],
"support": true,
},
"wds": {
"index": "wds",
"name": "WDS",
"link": "Advanced_WMode_Content.asp",
"menu": "<#403#>",
"mode": ["RT", "AP"],
"support": true,
},
"wirelessMacFilter": {
"index": "wirelessMacFilter",
"name": "<#407#>",
"link": "Advanced_ACL_Content.asp",
"menu": "<#403#>",
"mode": ["RT", "AP"],
"support": true,
},
"radiusSetting": {
"index": "radiusSetting",
"name": "<#408#>",
"link": "Advanced_WSecurity_Content.asp",
"menu": "<#403#>",
"mode": ["RT", "AP"],
"support": true,
},
"professional": {
"index": "professional",
"name": "<#409#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#403#>",
"mode": ["RT", "AP"],
"support": true,
},
"wirelessRadio": {
"index": "wirelessRadio",
"name": "<#4071#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#403#>",
"mode": ["RT", "AP"],
"support": true,
},
"wirelessScheduler": {
"index": "wirelessScheduler",
"name": "<#4086#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#403#>",
"mode": ["RT", "AP"],
"support": true,
},
"apIsolate": {
"index": "apIsolate",
"name": "<#4047#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#403#>",
"mode": ["RT", "AP"],
"support": true,
},
"roamingAssistant": {
"index": "roamingAssistant",
"name": "<#3122#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#403#>",
"mode": ["RT", "AP"],
"support": (() => isSupport("user_low_rssi"))(),
},
"igmpSnooping": {
"index": "igmpSnooping",
"name": "<#4043#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#403#>",
"mode": ["RT", "AP"],
"support": true,
},
"multicastRate": {
"index": "multicastRate",
"name": "<#3972#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#403#>",
"mode": ["RT", "AP"],
"support": true,
},
"ampduRts": {
"index": "ampduRts",
"name": "AMPDU RTS",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#403#>",
"mode": ["RT", "AP"],
"support": true,
},
"rtsThreshold": {
"index": "rtsThreshold",
"name": "<#4084#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#403#>",
"mode": ["RT", "AP"],
"support": true,
},
"dtimInterval": {
"index": "dtimInterval",
"name": "<#4031#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#403#>",
"mode": ["RT", "AP"],
"support": true,
},
"beaconInterval": {
"index": "beaconInterval",
"name": "<#4015#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#403#>",
"mode": ["RT", "AP"],
"support": true,
},
"txBurting": {
"index": "txBurting",
"name": "<#4091#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#403#>",
"mode": ["RT", "AP"],
"support": (() => !isSupport("non_frameburst"))(),
},
"wmm": {
"index": "wmm",
"name": "<#4094#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#403#>",
"mode": ["RT", "AP"],
"support": true,
},
"wmmNoAck": {
"index": "wmmNoAck",
"name": "<#4063#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#403#>",
"mode": ["RT", "AP"],
"support": true,
},
"wmmApsd": {
"index": "wmmApsd",
"name": "<#4010#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#403#>",
"mode": ["RT", "AP"],
"support": true,
},
"optAmpduAggregation": {
"index": "optAmpduAggregation",
"name": "<#4002#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#403#>",
"mode": ["RT", "AP"],
"support": true,
},
"optAmpduAggregation": {
"index": "optAmpduAggregation",
"name": "<#4002#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#403#>",
"mode": ["RT", "AP"],
"support": true,
},
"airtimeFairness": {
"index": "airtimeFairness",
"name": "<#4011#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#403#>",
"mode": ["RT", "AP"],
"support": true,
},
"muMimo": {
"index": "muMimo",
"name": "<#3973#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#403#>",
"mode": ["RT", "AP"],
"support": true,
},
"ofdma": {
"index": "ofdma",
"name": "<#2930#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#403#>",
"mode": ["RT", "AP"],
"support": true,
},
"explicitBeamforming": {
"index": "explicitBeamforming",
"name": "<#4035#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#403#>",
"mode": ["RT", "AP"],
"support": true,
},
"implicitBeamforming": {
"index": "implicitBeamforming",
"name": "<#4092#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#403#>",
"mode": ["RT", "AP"],
"support": true,
},
"txPower": {
"index": "txPower",
"name": "<#3979#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#403#>",
"mode": ["RT", "AP"],
"support": (() => isSupport("pwrctrl"))(),
},
"roamingBlockList": {
"index": "roamingBlockList",
"name": "<#3904#>",
"link": "Advanced_Roaming_Block_Content.asp",
"menu": "<#403#>",
"mode": ["RT", "AP"],
"support": (() => isSupport("pwrctrl"))(),
},
"guestNetwork": {
"index": "guestNetwork",
"name": "<#299#>",
"link": "Guest_network.asp",
"menu": "<#299#>",
"mode": ["RT", "AP"],
"support": (() => isSupport("mssid"))(),
},
"lanIP": {
"index": "lanIP",
"name": "<#411#>",
"link": "Advanced_LAN_Content.asp",
"menu": "<#410#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"hostName": {
"index": "hostName",
"name": "<#411#>",
"link": "Advanced_LAN_Content.asp",
"menu": "<#410#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"dhcpServer": {
"index": "dhcpServer",
"name": "<#2638#>",
"link": "Advanced_DHCP_Content.asp",
"menu": "<#410#>",
"mode": ["RT"],
"support": (() => !isSupport("tagged_based_vlan"))(),
},
"dnsServer": {
"index": "dnsServer",
"name": "<#2655#>",
"link": "Advanced_DHCP_Content.asp",
"menu": "<#410#>",
"mode": ["RT"],
"support": (() => !isSupport("tagged_based_vlan"))(),
},
"route": {
"index": "route",
"name": "<#413#>",
"link": "Advanced_GWStaticRoute_Content.asp",
"menu": "<#410#>",
"mode": ["RT"],
"support": true,
},
"iptv": {
"index": "iptv",
"name": "IPTV",
"link": "Advanced_IPTV_Content.asp",
"menu": "<#410#>",
"mode": ["RT"],
"support": (() => !isSupport("noiptv"))(),
},
"switchControl": {
"index": "switchControl",
"name": "<#3351#>",
"link": "Advanced_SwitchCtrl_Content.asp",
"menu": "<#410#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("switchctrl"))(),
},
"linkAggregation": {
"index": "linkAggregation",
"name": "<#2865#>",
"link": "Advanced_SwitchCtrl_Content.asp",
"menu": "<#410#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("lacp"))(),
},
"internetConnection": {
"index": "internetConnection",
"name": "<#415#>",
"link": "Advanced_WAN_Content.asp",
"menu": "<#414#>",
"mode": ["RT"],
"support": (() => !isSupport("dsl"))(),
},
"dualWan": {
"index": "dualWan",
"name": "<#237#>",
"link": "Advanced_WANPort_Content.asp",
"menu": "<#414#>",
"mode": ["RT"],
"support": (() => isSupport("dualwan"))(),
},
"portTrigger": {
"index": "portTrigger",
"name": "<#416#>",
"link": "Advanced_PortTrigger_Content.asp",
"menu": "<#414#>",
"mode": ["RT"],
"support": true,
},
"portForwarding": {
"index": "portForwarding",
"name": "<#417#>",
"link": "Advanced_VirtualServer_Content.asp",
"menu": "<#414#>",
"mode": ["RT"],
"support": true,
},
"dmz": {
"index": "dmz",
"name": "<#418#>",
"link": "Advanced_Exposed_Content.asp",
"menu": "<#414#>",
"mode": ["RT"],
"support": true,
},
"ddns": {
"index": "ddns",
"name": "<#419#>",
"link": "Advanced_ASUSDDNS_Content.asp",
"menu": "<#414#>",
"mode": ["RT"],
"support": true,
},
"natPassThru": {
"index": "natPassThru",
"name": "<#447#>",
"link": "Advanced_WANPort_Content.asp",
"menu": "<#414#>",
"mode": ["RT"],
"support": true,
},
"aiDisk": {
"index": "aiDisk",
"name": "<#2732#>",
"link": "aidisk.asp",
"menu": "<#400#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("usbX"))(),
},
"mediaServer": {
"index": "mediaServer",
"name": "<#806#>",
"link": "mediaserver.asp",
"menu": "<#400#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("media") && !isSupport("nomedia"))(),
},
"samba": {
"index": "samba",
"name": "<#421#>",
"link": "Advanced_AiDisk_samba.asp",
"menu": "<#400#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("usbX"))(),
},
"ftp": {
"index": "ftp",
"name": "<#422#>",
"link": "Advanced_AiDisk_ftp.asp",
"menu": "<#400#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => !isSupport("noftp"))(),
},
"networkPrinter": {
"index": "networkPrinter",
"name": "<#2886#>",
"link": "PrinterServer.asp",
"menu": "<#400#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => !isSupport("dualwan"))(),
},
"3G/4G": {
"index": "3G/4G",
"name": "3G/4G",
"link": "Advanced_Modem_Content.asp",
"menu": "<#400#>",
"mode": ["RT"],
"support": (() => !isSupport("dualwan"))(),
},
"timeMachine": {
"index": "timeMachine",
"name": "<#3404#>",
"link": "Advanced_TimeMachine.asp",
"menu": "<#400#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("timemachine"))(),
},
"downloasMaster": {
"index": "downloasMaster",
"name": "<#1826#>",
"link": "APP_Installation.asp",
"menu": "<#400#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("appbase"))(),
},
"aicloud2": {
"index": "aicloud2",
"name": "<#987#>",
"link": "cloud_main.asp",
"menu": "<#987#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => (isSupport("cloudsync") || isSupport("aicloudipk")) && !isSupport("nocloudsync"))(),
},
"aicloudSync": {
"index": "aicloudSync",
"name": "<#3292#>",
"link": "cloud_sync.asp",
"menu": "<#987#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => (isSupport("cloudsync") || isSupport("aicloudipk")) && !isSupport("nocloudsync"))(),
},
"aicloudSyncServer": {
"index": "aicloudSyncServer",
"name": "<#987#> <#3217#>",
"link": "cloud_router_sync.asp",
"menu": "<#987#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => (isSupport("cloudsync") || isSupport("aicloudipk")) && !isSupport("nocloudsync") && isSupport("rrsut"))(),
},
"aicloudSetting": {
"index": "aicloudSetting",
"name": "<#987#> <#3237#>",
"link": "cloud_settings.asp",
"menu": "<#987#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => (isSupport("cloudsync") || isSupport("aicloudipk")) && !isSupport("nocloudsync"))(),
},
"aicloudLog": {
"index": "aicloudLog",
"name": "<#987#> <#2700#>",
"link": "cloud_syslog.asp",
"menu": "<#987#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => (isSupport("cloudsync") || isSupport("aicloudipk")) && !isSupport("nocloudsync"))(),
},
"alexa": {
"index": "alexa",
"name": "Amazon Alexa",
"link": "Advanced_Smart_Home_Alexa.asp",
"menu": "<#425#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("alexa"))(),
},
"ifttt": {
"index": "ifttt",
"name": "IFTTT",
"link": "Advanced_Smart_Home_IFTTT.asp",
"menu": "<#425#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("ifttt"))(),
},
"ipv6": {
"index": "ipv6",
"name": "IPv6",
"link": "Advanced_IPv6_Content.asp",
"menu": "<#425#>",
"mode": ["RT"],
"support": (() => isSupport("ipv6"))(),
},
"firewall": {
"index": "firewall",
"name": "<#425#>",
"link": "Advanced_BasicFirewall_Content.asp",
"menu": "<#425#>",
"mode": ["RT"],
"support": true,
},
"ipv6Firewall": {
"index": "ipv6Firewall",
"name": "<#425#>",
"link": "Advanced_BasicFirewall_Content.asp",
"menu": "<#430#>",
"mode": ["RT"],
"support": (() => isSupport("ipv6"))(),
},
"dosProtection": {
"index": "dosProtection",
"name": "<#2090#>",
"link": "Advanced_BasicFirewall_Content.asp",
"menu": "<#430#>",
"mode": ["RT"],
"support": true,
},
"urlFilter": {
"index": "urlFilter",
"name": "<#426#>",
"link": "Advanced_URLFilter_Content.asp",
"menu": "<#430#>",
"mode": ["RT"],
"support": true,
},
"keywordFilter": {
"index": "keywordFilter",
"name": "<#429#>",
"link": "Advanced_KeywordFilter_Content.asp",
"menu": "<#430#>",
"mode": ["RT"],
"support": true,
},
"networkServicesFilter": {
"index": "networkServicesFilter",
"name": "<#428#>",
"link": "Advanced_Firewall_Content.asp",
"menu": "<#430#>",
"mode": ["RT"],
"support": true,
},
"loginName": {
"index": "loginName",
"name": "<#744#>",
"link": "Advanced_System_Content.asp",
"menu": "<#431#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"loginPassword": {
"index": "loginPassword",
"name": "<#745#>",
"link": "Advanced_System_Content.asp",
"menu": "<#431#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"loginCaptcha": {
"index": "loginCaptcha",
"name": "<#271#>",
"link": "Advanced_System_Content.asp",
"menu": "<#431#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("captcha"))(),
},
"hddHibernation": {
"index": "hddHibernation",
"name": "<#3596#>",
"link": "Advanced_System_Content.asp",
"menu": "<#431#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("hdspindown"))(),
},
"usbMode": {
"index": "usbMode",
"name": "<#3210#>",
"link": "Advanced_System_Content.asp",
"menu": "<#431#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("usbX"))(),
},
"timeZone": {
"index": "timeZone",
"name": "<#2667#>",
"link": "Advanced_System_Content.asp",
"menu": "<#431#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"netServer": {
"index": "netServer",
"name": "<#2659#>",
"link": "Advanced_System_Content.asp",
"menu": "<#431#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"networkMonitoring": {
"index": "networkMonitoring",
"name": "<#2884#>",
"link": "Advanced_System_Content.asp",
"menu": "<#431#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("dualwan"))(),
},
"autoLogout": {
"index": "autoLogout",
"name": "<#771#>",
"link": "Advanced_System_Content.asp",
"menu": "<#431#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"wanDownRedirectNotice": {
"index": "wanDownRedirectNotice",
"name": "<#1919#>",
"link": "Advanced_System_Content.asp",
"menu": "<#431#>",
"mode": ["RT"],
"support": (() => !isSupport("nowan"))(),
},
"rebootScheduler": {
"index": "rebootScheduler",
"name": "<#1921#>",
"link": "Advanced_System_Content.asp",
"menu": "<#431#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("reboot_schedule"))(),
},
"telnet": {
"index": "telnet",
"name": "<#1924#>",
"link": "Advanced_System_Content.asp",
"menu": "<#431#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"ssh": {
"index": "ssh",
"name": "<#1923#>",
"link": "Advanced_System_Content.asp",
"menu": "<#431#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("ssh"))(),
},
"idleTimeout": {
"index": "idleTimeout",
"name": "<#4232#>",
"link": "Advanced_System_Content.asp",
"menu": "<#431#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"localAuthMethod": {
"index": "localAuthMethod",
"name": "<#3930#>",
"link": "Advanced_System_Content.asp",
"menu": "<#431#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"httpsLanPort": {
"index": "httpsLanPort",
"name": "<#779#>",
"link": "Advanced_System_Content.asp",
"menu": "<#431#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("HTTPS"))(),
},
"webAccessFromWAN": {
"index": "webAccessFromWAN",
"name": "<#2141#>",
"link": "Advanced_System_Content.asp",
"menu": "<#431#>",
"mode": ["RT"],
"support": (() => isSwMode("rt"))(),
},
"accessRedirections": {
"index": "accessRedirections",
"name": "<#775#>",
"link": "Advanced_System_Content.asp",
"menu": "<#431#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"firmwareUpgrade": {
"index": "firmwareUpgrade",
"name": "<#2178#>",
"link": "Advanced_FirmwareUpgrade_Content.asp",
"menu": "<#435#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("afwupg"))(),
},
"firmwareVersion": {
"index": "firmwareVersion",
"name": "<#2185#>",
"link": "Advanced_FirmwareUpgrade_Content.asp",
"menu": "<#435#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"factoryDefault": {
"index": "factoryDefault",
"name": "<#3226#>",
"link": "Advanced_SettingBackup_Content.asp",
"menu": "<#436#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"saveSetting": {
"index": "saveSetting",
"name": "<#3231#>",
"link": "Advanced_SettingBackup_Content.asp",
"menu": "<#436#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"restoreSetting": {
"index": "saveSrestoreSettingtting",
"name": "<#3235#>",
"link": "Advanced_SettingBackup_Content.asp",
"menu": "<#436#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"feedback": {
"index": "feedback",
"name": "<#2731#>",
"link": "Advanced_Feedback.asp",
"menu": "<#2731#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("frs_feedback"))(),
},
"generalLog": {
"index": "generalLog",
"name": "<#437#>",
"link": "Main_LogStatus_Content.asp",
"menu": "<#773#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"wirelessLog": {
"index": "wirelessLog",
"name": "<#439#>",
"link": "Main_WStatus_Content.asp",
"menu": "<#773#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"dhcpLease": {
"index": "dhcpLease",
"name": "<#438#>",
"link": "Main_DHCPStatus_Content.asp",
"menu": "<#773#>",
"mode": ["RT"],
"support": true,
},
"ipv6Log": {
"index": "ipv6Log",
"name": "<#2507#>",
"link": "Main_IPV6Status_Content.asp",
"menu": "<#773#>",
"mode": ["RT"],
"support": (() => isSupport("ipv6"))(),
},
"routingTable": {
"index": "routingTable",
"name": "<#441#>",
"link": "Main_RouteStatus_Content.asp",
"menu": "<#773#>",
"mode": ["RT"],
"support": true,
},
"portForwarding": {
"index": "portForwarding",
"name": "<#440#>",
"link": "Main_IPTStatus_Content.asp",
"menu": "<#773#>",
"mode": ["RT"],
"support": true,
},
"activeConnections": {
"index": "activeConnections",
"name": "<#1664#>",
"link": "Main_ConnStatus_Content.aspp",
"menu": "<#773#>",
"mode": ["RT"],
"support": (() => isSupport("sfp4m"))(),
},
"networkAnalysis": {
"index": "networkAnalysis",
"name": "<#2883#>",
"link": "Main_Analysis_Content.asp",
"menu": "<#2888#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"netstat": {
"index": "netstat",
"name": "Netstat",
"link": "Main_Netstat_Content.asp",
"menu": "<#2888#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"wakeOnLan": {
"index": "wakeOnLan",
"name": "<#2905#>",
"link": "Main_WOL_Content.asp",
"menu": "<#2888#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"smartConnectRule": {
"index": "smartConnectRule",
"name": "<#3285#>",
"link": "Advanced_Smart_Connect.asp",
"menu": "<#2888#>",
"mode": ["RT", "AP"],
"support": (() => isSupport("bcmwifi") && (isSupport("smart_connect") || isSupport("bandstr")))(),
},
}

