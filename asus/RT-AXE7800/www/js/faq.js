﻿var faq_data = {
"dashboard": {
"index": "dashboard",
"name": "<#1397#>",
"link": "GameDashboard.asp",
"menu": "<#1399#>",
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
"name": "<#1346#>",
"link": "AiProtection_HomeProtection.asp",
"menu": "<#1393#>",
"mode": ["RT"],
"support": (() => isSupport("bwdpi"))(),
},
"maliciousSite": {
"index": "maliciousSite",
"name": "<#1390#>",
"link": "AiProtection_MaliciousSitesBlocking.asp",
"menu": "<#1393#>",
"mode": ["RT"],
"support": (() => isSupport("dpi_mals"))(),
},
"twoWayIPS": {
"index": "twoWayIPS",
"name": "<#1410#>",
"link": "AiProtection_IntrusionPreventionSystem.asp",
"menu": "<#1393#>",
"mode": ["RT"],
"support": (() => isSupport("dpi_vp"))(),
},
"infectedDevice": {
"index": "infectedDevice",
"name": "<#1303#>",
"link": "AiProtection_InfectedDevicePreventBlock.asp",
"menu": "<#1393#>",
"mode": ["RT"],
"support": (() => isSupport("dpi_vp"))(),
},
"webAppFilter": {
"index": "webAppFilter",
"name": "<#3482#>",
"link": "AiProtection_WebProtector.asp",
"menu": "<#566#>",
"mode": ["RT"],
"support": (() => isSupport("webs_filter"))(),
},
"timeScheduling": {
"index": "timeScheduling",
"name": "<#1316#>",
"link": "ParentalControl.asp",
"menu": "<#566#>",
"mode": ["RT"],
"support": (() => isSupport("PARENTAL2"))(),
},
"gameAcceleration": {
"index": "opegameAccelerationnNAT",
"name": "<#2283#>",
"link": "GameBoost.asp",
"menu": "<#2283#>",
"mode": ["RT"],
"support": (() => isSupport("gameMode"))(),
},
"qos": {
"index": "qos",
"name": "<#2815#>",
"link": "QoS_EZQoS.asp",
"menu": "<#2283#>",
"mode": ["RT"],
"support": true,
},
"bandwidthLimiter": {
"index": "bandwidthLimiter",
"name": "<#*** not_found_dict : Bandwidth_Limite***#>",
"link": "QoS_EZQoS.asp",
"menu": "<#2283#>",
"mode": ["RT"],
"support": true,
},
"wtfast": {
"index": "wtfast",
"name": "WTFast",
"link": "Advanced_WTFast_Content.asp",
"menu": "<#2283#>",
"mode": ["RT"],
"support": (() => isSupport("wtfast"))(),
},
"gearAccelerator": {
"index": "gearAccelerator",
"name": "<#2323#>",
"link": "GearAccelerator.asp",
"menu": "<#2283#>",
"mode": ["RT"],
"support": (() => isSupport("gameMode"))(),
},
"internetSpeed": {
"index": "internetSpeed",
"name": "<#2477#>",
"link": "AdaptiveQoS_InternetSpeed.asp",
"menu": "<#2283#>",
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
"name": "<#1403#>",
"link": "Main_GameServer_Content.asp",
"menu": "<#1403#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("rog"))(),
},
"wifiRadar": {
"index": "wifiRadar",
"name": "<#3981#>",
"link": "WiFi_Insight.asp",
"menu": "<#3981#>",
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
"name": "<#4353#>",
"link": "Advanced_VPNClient_Content.asp",
"menu": "VPN",
"mode": ["RT"],
"support": (() => isSupport("vpnc"))(),
},
"instantGuard": {
"index": "instantGuard",
"name": "<#4353#>",
"link": "Advanced_Instant_Guard.asp",
"menu": "VPN",
"mode": ["RT"],
"support": (() => isSupport("Instant_Guard"))(),
},
"statistic": {
"index": "statistic",
"name": "<#3404#>",
"link": "TrafficAnalyzer_Statistic.asp",
"menu": "<#3525#>",
"mode": ["RT"],
"support": (() => isSupport("traffic_analyzer"))(),
},
"bandwidthMponitor": {
"index": "bandwidthMponitor",
"name": "<#1538#>",
"link": "AdaptiveQoS_Bandwidth_Monitor.asp",
"menu": "<#3525#>",
"mode": ["RT"],
"support": (() => isSupport("bandwidth_monitor"))(),
},
"TrafficMponitor": {
"index": "TrafficMponitor",
"name": "<#879#>",
"link": "Main_TrafficMonitor_realtime.asp",
"menu": "<#3525#>",
"mode": ["RT"],
"support": (() => isSupport("bandwidth_monitor"))(),
},
"webHistory": {
"index": "webHistory",
"name": "<#998#>",
"link": "AdaptiveQoS_WebHistory.asp",
"menu": "<#3525#>",
"mode": ["RT"],
"support": (() => isSupport("web_history"))(),
},
"auraRGB": {
"index": "auraRGB",
"name": "<#4394#>",
"link": "index.asp",
"menu": "<#478#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"wirelessGeneral": {
"index": "wirelessGeneral",
"name": "<#480#> <#481#>",
"link": "Advanced_Wireless_Content.asp",
"menu": "<#480#>",
"mode": ["RT", "AP"],
"support": true,
},
"smartConnect": {
"index": "smartConnect",
"name": "<#3361#>",
"link": "Advanced_Wireless_Content.asp",
"menu": "<#480#>",
"mode": ["RT", "AP"],
"support": (() => isSupport("smart_connect") || isSupport("bandstr"))(),
},
"wirelessHideSSID": {
"index": "wirelessHideSSID",
"name": "<#4099#>",
"link": "Advanced_Wireless_Content.asp",
"menu": "<#480#>",
"mode": ["RT", "AP"],
"support": true,
},
"networkName": {
"index": "networkName",
"name": "<#663#>",
"link": "Advanced_Wireless_Content.asp",
"menu": "<#480#>",
"mode": ["RT", "AP"],
"support": true,
},
"channelBandwidth": {
"index": "channelBandwidth",
"name": "<#4024#>",
"link": "Advanced_Wireless_Content.asp",
"menu": "<#480#>",
"mode": ["RT", "AP"],
"support": true,
},
"controlChannel": {
"index": "controlChannel",
"name": "<#954#>",
"link": "Advanced_Wireless_Content.asp",
"menu": "<#480#>",
"mode": ["RT", "AP"],
"support": true,
},
"authMethod": {
"index": "authMethod",
"name": "<#4009#>",
"link": "Advanced_Wireless_Content.asp",
"menu": "<#480#>",
"mode": ["RT", "AP"],
"support": true,
},
"wpaEncrypt": {
"index": "wpaEncrypt",
"name": "<#959#>",
"link": "Advanced_Wireless_Content.asp",
"menu": "<#480#>",
"mode": ["RT", "AP"],
"support": true,
},
"wpaKey": {
"index": "wpaKey",
"name": "<#4151#>",
"link": "Advanced_Wireless_Content.asp",
"menu": "<#480#>",
"mode": ["RT", "AP"],
"support": true,
},
"protectedManagementFrames": {
"index": "protectedManagementFrames",
"name": "<#4132#>",
"link": "Advanced_Wireless_Content.asp",
"menu": "<#480#>",
"mode": ["RT", "AP"],
"support": true,
},
"gtkInterval": {
"index": "gtkInterval",
"name": "<#4162#>",
"link": "Advanced_Wireless_Content.asp",
"menu": "<#480#>",
"mode": ["RT", "AP"],
"support": true,
},
"wps": {
"index": "wps",
"name": "<#482#>",
"link": "Advanced_WWPS_Content.asp",
"menu": "<#480#>",
"mode": ["RT", "AP"],
"support": true,
},
"wds": {
"index": "wds",
"name": "WDS",
"link": "Advanced_WMode_Content.asp",
"menu": "<#480#>",
"mode": ["RT", "AP"],
"support": true,
},
"wirelessMacFilter": {
"index": "wirelessMacFilter",
"name": "<#484#>",
"link": "Advanced_ACL_Content.asp",
"menu": "<#480#>",
"mode": ["RT", "AP"],
"support": true,
},
"radiusSetting": {
"index": "radiusSetting",
"name": "<#485#>",
"link": "Advanced_WSecurity_Content.asp",
"menu": "<#480#>",
"mode": ["RT", "AP"],
"support": true,
},
"professional": {
"index": "professional",
"name": "<#486#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#480#>",
"mode": ["RT", "AP"],
"support": true,
},
"wirelessRadio": {
"index": "wirelessRadio",
"name": "<#4153#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#480#>",
"mode": ["RT", "AP"],
"support": true,
},
"wirelessScheduler": {
"index": "wirelessScheduler",
"name": "<#4168#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#480#>",
"mode": ["RT", "AP"],
"support": true,
},
"apIsolate": {
"index": "apIsolate",
"name": "<#4129#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#480#>",
"mode": ["RT", "AP"],
"support": true,
},
"roamingAssistant": {
"index": "roamingAssistant",
"name": "<#3201#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#480#>",
"mode": ["RT", "AP"],
"support": (() => isSupport("user_low_rssi"))(),
},
"igmpSnooping": {
"index": "igmpSnooping",
"name": "<#4125#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#480#>",
"mode": ["RT", "AP"],
"support": true,
},
"multicastRate": {
"index": "multicastRate",
"name": "<#4054#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#480#>",
"mode": ["RT", "AP"],
"support": true,
},
"ampduRts": {
"index": "ampduRts",
"name": "AMPDU RTS",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#480#>",
"mode": ["RT", "AP"],
"support": true,
},
"rtsThreshold": {
"index": "rtsThreshold",
"name": "<#4166#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#480#>",
"mode": ["RT", "AP"],
"support": true,
},
"dtimInterval": {
"index": "dtimInterval",
"name": "<#4113#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#480#>",
"mode": ["RT", "AP"],
"support": true,
},
"beaconInterval": {
"index": "beaconInterval",
"name": "<#4097#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#480#>",
"mode": ["RT", "AP"],
"support": true,
},
"txBurting": {
"index": "txBurting",
"name": "<#4173#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#480#>",
"mode": ["RT", "AP"],
"support": (() => !isSupport("non_frameburst"))(),
},
"wmm": {
"index": "wmm",
"name": "<#4176#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#480#>",
"mode": ["RT", "AP"],
"support": true,
},
"wmmNoAck": {
"index": "wmmNoAck",
"name": "<#4145#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#480#>",
"mode": ["RT", "AP"],
"support": true,
},
"wmmApsd": {
"index": "wmmApsd",
"name": "<#4092#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#480#>",
"mode": ["RT", "AP"],
"support": true,
},
"optAmpduAggregation": {
"index": "optAmpduAggregation",
"name": "<#4084#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#480#>",
"mode": ["RT", "AP"],
"support": true,
},
"optAmpduAggregation": {
"index": "optAmpduAggregation",
"name": "<#4084#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#480#>",
"mode": ["RT", "AP"],
"support": true,
},
"airtimeFairness": {
"index": "airtimeFairness",
"name": "<#4093#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#480#>",
"mode": ["RT", "AP"],
"support": true,
},
"muMimo": {
"index": "muMimo",
"name": "<#4055#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#480#>",
"mode": ["RT", "AP"],
"support": true,
},
"ofdma": {
"index": "ofdma",
"name": "<#3009#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#480#>",
"mode": ["RT", "AP"],
"support": true,
},
"explicitBeamforming": {
"index": "explicitBeamforming",
"name": "<#4117#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#480#>",
"mode": ["RT", "AP"],
"support": true,
},
"implicitBeamforming": {
"index": "implicitBeamforming",
"name": "<#4174#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#480#>",
"mode": ["RT", "AP"],
"support": true,
},
"txPower": {
"index": "txPower",
"name": "<#4061#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#480#>",
"mode": ["RT", "AP"],
"support": (() => isSupport("pwrctrl"))(),
},
"roamingBlockList": {
"index": "roamingBlockList",
"name": "<#3983#>",
"link": "Advanced_Roaming_Block_Content.asp",
"menu": "<#480#>",
"mode": ["RT", "AP"],
"support": (() => isSupport("pwrctrl"))(),
},
"guestNetwork": {
"index": "guestNetwork",
"name": "<#376#>",
"link": "Guest_network.asp",
"menu": "<#376#>",
"mode": ["RT", "AP"],
"support": (() => isSupport("mssid"))(),
},
"lanIP": {
"index": "lanIP",
"name": "<#488#>",
"link": "Advanced_LAN_Content.asp",
"menu": "<#487#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"hostName": {
"index": "hostName",
"name": "<#488#>",
"link": "Advanced_LAN_Content.asp",
"menu": "<#487#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"dhcpServer": {
"index": "dhcpServer",
"name": "<#2717#>",
"link": "Advanced_DHCP_Content.asp",
"menu": "<#487#>",
"mode": ["RT"],
"support": (() => !isSupport("tagged_based_vlan"))(),
},
"dnsServer": {
"index": "dnsServer",
"name": "<#2734#>",
"link": "Advanced_DHCP_Content.asp",
"menu": "<#487#>",
"mode": ["RT"],
"support": (() => !isSupport("tagged_based_vlan"))(),
},
"route": {
"index": "route",
"name": "<#490#>",
"link": "Advanced_GWStaticRoute_Content.asp",
"menu": "<#487#>",
"mode": ["RT"],
"support": true,
},
"iptv": {
"index": "iptv",
"name": "IPTV",
"link": "Advanced_IPTV_Content.asp",
"menu": "<#487#>",
"mode": ["RT"],
"support": (() => !isSupport("noiptv"))(),
},
"switchControl": {
"index": "switchControl",
"name": "<#3430#>",
"link": "Advanced_SwitchCtrl_Content.asp",
"menu": "<#487#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("switchctrl"))(),
},
"linkAggregation": {
"index": "linkAggregation",
"name": "<#2944#>",
"link": "Advanced_SwitchCtrl_Content.asp",
"menu": "<#487#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("lacp"))(),
},
"internetConnection": {
"index": "internetConnection",
"name": "<#492#>",
"link": "Advanced_WAN_Content.asp",
"menu": "<#491#>",
"mode": ["RT"],
"support": (() => !isSupport("dsl"))(),
},
"dualWan": {
"index": "dualWan",
"name": "<#314#>",
"link": "Advanced_WANPort_Content.asp",
"menu": "<#491#>",
"mode": ["RT"],
"support": (() => isSupport("dualwan"))(),
},
"portTrigger": {
"index": "portTrigger",
"name": "<#493#>",
"link": "Advanced_PortTrigger_Content.asp",
"menu": "<#491#>",
"mode": ["RT"],
"support": true,
},
"portForwarding": {
"index": "portForwarding",
"name": "<#494#>",
"link": "Advanced_VirtualServer_Content.asp",
"menu": "<#491#>",
"mode": ["RT"],
"support": true,
},
"dmz": {
"index": "dmz",
"name": "<#495#>",
"link": "Advanced_Exposed_Content.asp",
"menu": "<#491#>",
"mode": ["RT"],
"support": true,
},
"ddns": {
"index": "ddns",
"name": "<#496#>",
"link": "Advanced_ASUSDDNS_Content.asp",
"menu": "<#491#>",
"mode": ["RT"],
"support": true,
},
"natPassThru": {
"index": "natPassThru",
"name": "<#524#>",
"link": "Advanced_WANPort_Content.asp",
"menu": "<#491#>",
"mode": ["RT"],
"support": true,
},
"aiDisk": {
"index": "aiDisk",
"name": "<#2811#>",
"link": "aidisk.asp",
"menu": "<#477#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("usbX"))(),
},
"mediaServer": {
"index": "mediaServer",
"name": "<#883#>",
"link": "mediaserver.asp",
"menu": "<#477#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("media") && !isSupport("nomedia"))(),
},
"samba": {
"index": "samba",
"name": "<#498#>",
"link": "Advanced_AiDisk_samba.asp",
"menu": "<#477#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("usbX"))(),
},
"ftp": {
"index": "ftp",
"name": "<#499#>",
"link": "Advanced_AiDisk_ftp.asp",
"menu": "<#477#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => !isSupport("noftp"))(),
},
"networkPrinter": {
"index": "networkPrinter",
"name": "<#2965#>",
"link": "PrinterServer.asp",
"menu": "<#477#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => !isSupport("dualwan"))(),
},
"3G/4G": {
"index": "3G/4G",
"name": "3G/4G",
"link": "Advanced_Modem_Content.asp",
"menu": "<#477#>",
"mode": ["RT"],
"support": (() => !isSupport("dualwan"))(),
},
"timeMachine": {
"index": "timeMachine",
"name": "<#3483#>",
"link": "Advanced_TimeMachine.asp",
"menu": "<#477#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("timemachine"))(),
},
"downloasMaster": {
"index": "downloasMaster",
"name": "<#1904#>",
"link": "APP_Installation.asp",
"menu": "<#477#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("appbase"))(),
},
"aicloud2": {
"index": "aicloud2",
"name": "<#1065#>",
"link": "cloud_main.asp",
"menu": "<#1065#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => (isSupport("cloudsync") || isSupport("aicloudipk")) && !isSupport("nocloudsync"))(),
},
"aicloudSync": {
"index": "aicloudSync",
"name": "<#3371#>",
"link": "cloud_sync.asp",
"menu": "<#1065#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => (isSupport("cloudsync") || isSupport("aicloudipk")) && !isSupport("nocloudsync"))(),
},
"aicloudSyncServer": {
"index": "aicloudSyncServer",
"name": "<#1065#> <#3296#>",
"link": "cloud_router_sync.asp",
"menu": "<#1065#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => (isSupport("cloudsync") || isSupport("aicloudipk")) && !isSupport("nocloudsync") && isSupport("rrsut"))(),
},
"aicloudSetting": {
"index": "aicloudSetting",
"name": "<#1065#> <#3316#>",
"link": "cloud_settings.asp",
"menu": "<#1065#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => (isSupport("cloudsync") || isSupport("aicloudipk")) && !isSupport("nocloudsync"))(),
},
"aicloudLog": {
"index": "aicloudLog",
"name": "<#1065#> <#2779#>",
"link": "cloud_syslog.asp",
"menu": "<#1065#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => (isSupport("cloudsync") || isSupport("aicloudipk")) && !isSupport("nocloudsync"))(),
},
"alexa": {
"index": "alexa",
"name": "Amazon Alexa",
"link": "Advanced_Smart_Home_Alexa.asp",
"menu": "<#502#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("alexa"))(),
},
"ifttt": {
"index": "ifttt",
"name": "IFTTT",
"link": "Advanced_Smart_Home_IFTTT.asp",
"menu": "<#502#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("ifttt"))(),
},
"ipv6": {
"index": "ipv6",
"name": "IPv6",
"link": "Advanced_IPv6_Content.asp",
"menu": "<#502#>",
"mode": ["RT"],
"support": (() => isSupport("ipv6"))(),
},
"firewall": {
"index": "firewall",
"name": "<#502#>",
"link": "Advanced_BasicFirewall_Content.asp",
"menu": "<#502#>",
"mode": ["RT"],
"support": true,
},
"ipv6Firewall": {
"index": "ipv6Firewall",
"name": "<#502#>",
"link": "Advanced_BasicFirewall_Content.asp",
"menu": "<#507#>",
"mode": ["RT"],
"support": (() => isSupport("ipv6"))(),
},
"dosProtection": {
"index": "dosProtection",
"name": "<#2168#>",
"link": "Advanced_BasicFirewall_Content.asp",
"menu": "<#507#>",
"mode": ["RT"],
"support": true,
},
"urlFilter": {
"index": "urlFilter",
"name": "<#503#>",
"link": "Advanced_URLFilter_Content.asp",
"menu": "<#507#>",
"mode": ["RT"],
"support": true,
},
"keywordFilter": {
"index": "keywordFilter",
"name": "<#506#>",
"link": "Advanced_KeywordFilter_Content.asp",
"menu": "<#507#>",
"mode": ["RT"],
"support": true,
},
"networkServicesFilter": {
"index": "networkServicesFilter",
"name": "<#505#>",
"link": "Advanced_Firewall_Content.asp",
"menu": "<#507#>",
"mode": ["RT"],
"support": true,
},
"loginName": {
"index": "loginName",
"name": "<#821#>",
"link": "Advanced_System_Content.asp",
"menu": "<#508#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"loginPassword": {
"index": "loginPassword",
"name": "<#822#>",
"link": "Advanced_System_Content.asp",
"menu": "<#508#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"loginCaptcha": {
"index": "loginCaptcha",
"name": "<#348#>",
"link": "Advanced_System_Content.asp",
"menu": "<#508#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("captcha"))(),
},
"hddHibernation": {
"index": "hddHibernation",
"name": "<#3675#>",
"link": "Advanced_System_Content.asp",
"menu": "<#508#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("hdspindown"))(),
},
"usbMode": {
"index": "usbMode",
"name": "<#3289#>",
"link": "Advanced_System_Content.asp",
"menu": "<#508#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("usbX"))(),
},
"timeZone": {
"index": "timeZone",
"name": "<#2746#>",
"link": "Advanced_System_Content.asp",
"menu": "<#508#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"netServer": {
"index": "netServer",
"name": "<#2738#>",
"link": "Advanced_System_Content.asp",
"menu": "<#508#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"networkMonitoring": {
"index": "networkMonitoring",
"name": "<#2963#>",
"link": "Advanced_System_Content.asp",
"menu": "<#508#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("dualwan"))(),
},
"autoLogout": {
"index": "autoLogout",
"name": "<#848#>",
"link": "Advanced_System_Content.asp",
"menu": "<#508#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"wanDownRedirectNotice": {
"index": "wanDownRedirectNotice",
"name": "<#1997#>",
"link": "Advanced_System_Content.asp",
"menu": "<#508#>",
"mode": ["RT"],
"support": (() => !isSupport("nowan"))(),
},
"rebootScheduler": {
"index": "rebootScheduler",
"name": "<#1999#>",
"link": "Advanced_System_Content.asp",
"menu": "<#508#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("reboot_schedule"))(),
},
"telnet": {
"index": "telnet",
"name": "<#2002#>",
"link": "Advanced_System_Content.asp",
"menu": "<#508#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"ssh": {
"index": "ssh",
"name": "<#2001#>",
"link": "Advanced_System_Content.asp",
"menu": "<#508#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("ssh"))(),
},
"idleTimeout": {
"index": "idleTimeout",
"name": "<#4314#>",
"link": "Advanced_System_Content.asp",
"menu": "<#508#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"localAuthMethod": {
"index": "localAuthMethod",
"name": "<#4009#>",
"link": "Advanced_System_Content.asp",
"menu": "<#508#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"httpsLanPort": {
"index": "httpsLanPort",
"name": "<#856#>",
"link": "Advanced_System_Content.asp",
"menu": "<#508#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("HTTPS"))(),
},
"webAccessFromWAN": {
"index": "webAccessFromWAN",
"name": "<#2219#>",
"link": "Advanced_System_Content.asp",
"menu": "<#508#>",
"mode": ["RT"],
"support": (() => isSwMode("rt"))(),
},
"accessRedirections": {
"index": "accessRedirections",
"name": "<#852#>",
"link": "Advanced_System_Content.asp",
"menu": "<#508#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"firmwareUpgrade": {
"index": "firmwareUpgrade",
"name": "<#2256#>",
"link": "Advanced_FirmwareUpgrade_Content.asp",
"menu": "<#512#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("afwupg"))(),
},
"firmwareVersion": {
"index": "firmwareVersion",
"name": "<#2263#>",
"link": "Advanced_FirmwareUpgrade_Content.asp",
"menu": "<#512#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"factoryDefault": {
"index": "factoryDefault",
"name": "<#3305#>",
"link": "Advanced_SettingBackup_Content.asp",
"menu": "<#513#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"saveSetting": {
"index": "saveSetting",
"name": "<#3310#>",
"link": "Advanced_SettingBackup_Content.asp",
"menu": "<#513#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"restoreSetting": {
"index": "saveSrestoreSettingtting",
"name": "<#3314#>",
"link": "Advanced_SettingBackup_Content.asp",
"menu": "<#513#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"feedback": {
"index": "feedback",
"name": "<#2810#>",
"link": "Advanced_Feedback.asp",
"menu": "<#2810#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("frs_feedback"))(),
},
"generalLog": {
"index": "generalLog",
"name": "<#514#>",
"link": "Main_LogStatus_Content.asp",
"menu": "<#850#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"wirelessLog": {
"index": "wirelessLog",
"name": "<#516#>",
"link": "Main_WStatus_Content.asp",
"menu": "<#850#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"dhcpLease": {
"index": "dhcpLease",
"name": "<#515#>",
"link": "Main_DHCPStatus_Content.asp",
"menu": "<#850#>",
"mode": ["RT"],
"support": true,
},
"ipv6Log": {
"index": "ipv6Log",
"name": "<#2586#>",
"link": "Main_IPV6Status_Content.asp",
"menu": "<#850#>",
"mode": ["RT"],
"support": (() => isSupport("ipv6"))(),
},
"routingTable": {
"index": "routingTable",
"name": "<#518#>",
"link": "Main_RouteStatus_Content.asp",
"menu": "<#850#>",
"mode": ["RT"],
"support": true,
},
"portForwarding": {
"index": "portForwarding",
"name": "<#517#>",
"link": "Main_IPTStatus_Content.asp",
"menu": "<#850#>",
"mode": ["RT"],
"support": true,
},
"activeConnections": {
"index": "activeConnections",
"name": "<#1742#>",
"link": "Main_ConnStatus_Content.aspp",
"menu": "<#850#>",
"mode": ["RT"],
"support": (() => isSupport("sfp4m"))(),
},
"networkAnalysis": {
"index": "networkAnalysis",
"name": "<#2962#>",
"link": "Main_Analysis_Content.asp",
"menu": "<#2967#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"netstat": {
"index": "netstat",
"name": "Netstat",
"link": "Main_Netstat_Content.asp",
"menu": "<#2967#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"wakeOnLan": {
"index": "wakeOnLan",
"name": "<#2984#>",
"link": "Main_WOL_Content.asp",
"menu": "<#2967#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"smartConnectRule": {
"index": "smartConnectRule",
"name": "<#3364#>",
"link": "Advanced_Smart_Connect.asp",
"menu": "<#2967#>",
"mode": ["RT", "AP"],
"support": (() => isSupport("bcmwifi") && (isSupport("smart_connect") || isSupport("bandstr")))(),
},
}
