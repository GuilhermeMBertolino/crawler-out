﻿var faq_data = {
"dashboard": {
"index": "dashboard",
"name": "<#1394#>",
"link": "GameDashboard.asp",
"menu": "<#1396#>",
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
"name": "<#1343#>",
"link": "AiProtection_HomeProtection.asp",
"menu": "<#1390#>",
"mode": ["RT"],
"support": (() => isSupport("bwdpi"))(),
},
"maliciousSite": {
"index": "maliciousSite",
"name": "<#1387#>",
"link": "AiProtection_MaliciousSitesBlocking.asp",
"menu": "<#1390#>",
"mode": ["RT"],
"support": (() => isSupport("dpi_mals"))(),
},
"twoWayIPS": {
"index": "twoWayIPS",
"name": "<#1407#>",
"link": "AiProtection_IntrusionPreventionSystem.asp",
"menu": "<#1390#>",
"mode": ["RT"],
"support": (() => isSupport("dpi_vp"))(),
},
"infectedDevice": {
"index": "infectedDevice",
"name": "<#1300#>",
"link": "AiProtection_InfectedDevicePreventBlock.asp",
"menu": "<#1390#>",
"mode": ["RT"],
"support": (() => isSupport("dpi_vp"))(),
},
"webAppFilter": {
"index": "webAppFilter",
"name": "<#3476#>",
"link": "AiProtection_WebProtector.asp",
"menu": "<#564#>",
"mode": ["RT"],
"support": (() => isSupport("webs_filter"))(),
},
"timeScheduling": {
"index": "timeScheduling",
"name": "<#1313#>",
"link": "ParentalControl.asp",
"menu": "<#564#>",
"mode": ["RT"],
"support": (() => isSupport("PARENTAL2"))(),
},
"gameAcceleration": {
"index": "opegameAccelerationnNAT",
"name": "<#2280#>",
"link": "GameBoost.asp",
"menu": "<#2280#>",
"mode": ["RT"],
"support": (() => isSupport("gameMode"))(),
},
"qos": {
"index": "qos",
"name": "<#2810#>",
"link": "QoS_EZQoS.asp",
"menu": "<#2280#>",
"mode": ["RT"],
"support": true,
},
"bandwidthLimiter": {
"index": "bandwidthLimiter",
"name": "<#*** not_found_dict : Bandwidth_Limite***#>",
"link": "QoS_EZQoS.asp",
"menu": "<#2280#>",
"mode": ["RT"],
"support": true,
},
"wtfast": {
"index": "wtfast",
"name": "WTFast",
"link": "Advanced_WTFast_Content.asp",
"menu": "<#2280#>",
"mode": ["RT"],
"support": (() => isSupport("wtfast"))(),
},
"gearAccelerator": {
"index": "gearAccelerator",
"name": "<#2320#>",
"link": "GearAccelerator.asp",
"menu": "<#2280#>",
"mode": ["RT"],
"support": (() => isSupport("gameMode"))(),
},
"internetSpeed": {
"index": "internetSpeed",
"name": "<#2472#>",
"link": "AdaptiveQoS_InternetSpeed.asp",
"menu": "<#2280#>",
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
"name": "<#1400#>",
"link": "Main_GameServer_Content.asp",
"menu": "<#1400#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("rog"))(),
},
"wifiRadar": {
"index": "wifiRadar",
"name": "<#3975#>",
"link": "WiFi_Insight.asp",
"menu": "<#3975#>",
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
"name": "<#4347#>",
"link": "Advanced_VPNClient_Content.asp",
"menu": "VPN",
"mode": ["RT"],
"support": (() => isSupport("vpnc"))(),
},
"instantGuard": {
"index": "instantGuard",
"name": "<#4347#>",
"link": "Advanced_Instant_Guard.asp",
"menu": "VPN",
"mode": ["RT"],
"support": (() => isSupport("Instant_Guard"))(),
},
"statistic": {
"index": "statistic",
"name": "<#3398#>",
"link": "TrafficAnalyzer_Statistic.asp",
"menu": "<#3519#>",
"mode": ["RT"],
"support": (() => isSupport("traffic_analyzer"))(),
},
"bandwidthMponitor": {
"index": "bandwidthMponitor",
"name": "<#1535#>",
"link": "AdaptiveQoS_Bandwidth_Monitor.asp",
"menu": "<#3519#>",
"mode": ["RT"],
"support": (() => isSupport("bandwidth_monitor"))(),
},
"TrafficMponitor": {
"index": "TrafficMponitor",
"name": "<#876#>",
"link": "Main_TrafficMonitor_realtime.asp",
"menu": "<#3519#>",
"mode": ["RT"],
"support": (() => isSupport("bandwidth_monitor"))(),
},
"webHistory": {
"index": "webHistory",
"name": "<#995#>",
"link": "AdaptiveQoS_WebHistory.asp",
"menu": "<#3519#>",
"mode": ["RT"],
"support": (() => isSupport("web_history"))(),
},
"auraRGB": {
"index": "auraRGB",
"name": "<#4389#>",
"link": "index.asp",
"menu": "<#476#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"wirelessGeneral": {
"index": "wirelessGeneral",
"name": "<#478#> <#479#>",
"link": "Advanced_Wireless_Content.asp",
"menu": "<#478#>",
"mode": ["RT", "AP"],
"support": true,
},
"smartConnect": {
"index": "smartConnect",
"name": "<#3355#>",
"link": "Advanced_Wireless_Content.asp",
"menu": "<#478#>",
"mode": ["RT", "AP"],
"support": (() => isSupport("smart_connect") || isSupport("bandstr"))(),
},
"wirelessHideSSID": {
"index": "wirelessHideSSID",
"name": "<#4093#>",
"link": "Advanced_Wireless_Content.asp",
"menu": "<#478#>",
"mode": ["RT", "AP"],
"support": true,
},
"networkName": {
"index": "networkName",
"name": "<#660#>",
"link": "Advanced_Wireless_Content.asp",
"menu": "<#478#>",
"mode": ["RT", "AP"],
"support": true,
},
"channelBandwidth": {
"index": "channelBandwidth",
"name": "<#4018#>",
"link": "Advanced_Wireless_Content.asp",
"menu": "<#478#>",
"mode": ["RT", "AP"],
"support": true,
},
"controlChannel": {
"index": "controlChannel",
"name": "<#951#>",
"link": "Advanced_Wireless_Content.asp",
"menu": "<#478#>",
"mode": ["RT", "AP"],
"support": true,
},
"authMethod": {
"index": "authMethod",
"name": "<#4003#>",
"link": "Advanced_Wireless_Content.asp",
"menu": "<#478#>",
"mode": ["RT", "AP"],
"support": true,
},
"wpaEncrypt": {
"index": "wpaEncrypt",
"name": "<#956#>",
"link": "Advanced_Wireless_Content.asp",
"menu": "<#478#>",
"mode": ["RT", "AP"],
"support": true,
},
"wpaKey": {
"index": "wpaKey",
"name": "<#4145#>",
"link": "Advanced_Wireless_Content.asp",
"menu": "<#478#>",
"mode": ["RT", "AP"],
"support": true,
},
"protectedManagementFrames": {
"index": "protectedManagementFrames",
"name": "<#4126#>",
"link": "Advanced_Wireless_Content.asp",
"menu": "<#478#>",
"mode": ["RT", "AP"],
"support": true,
},
"gtkInterval": {
"index": "gtkInterval",
"name": "<#4156#>",
"link": "Advanced_Wireless_Content.asp",
"menu": "<#478#>",
"mode": ["RT", "AP"],
"support": true,
},
"wps": {
"index": "wps",
"name": "<#480#>",
"link": "Advanced_WWPS_Content.asp",
"menu": "<#478#>",
"mode": ["RT", "AP"],
"support": true,
},
"wds": {
"index": "wds",
"name": "WDS",
"link": "Advanced_WMode_Content.asp",
"menu": "<#478#>",
"mode": ["RT", "AP"],
"support": true,
},
"wirelessMacFilter": {
"index": "wirelessMacFilter",
"name": "<#482#>",
"link": "Advanced_ACL_Content.asp",
"menu": "<#478#>",
"mode": ["RT", "AP"],
"support": true,
},
"radiusSetting": {
"index": "radiusSetting",
"name": "<#483#>",
"link": "Advanced_WSecurity_Content.asp",
"menu": "<#478#>",
"mode": ["RT", "AP"],
"support": true,
},
"professional": {
"index": "professional",
"name": "<#484#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#478#>",
"mode": ["RT", "AP"],
"support": true,
},
"wirelessRadio": {
"index": "wirelessRadio",
"name": "<#4147#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#478#>",
"mode": ["RT", "AP"],
"support": true,
},
"wirelessScheduler": {
"index": "wirelessScheduler",
"name": "<#4162#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#478#>",
"mode": ["RT", "AP"],
"support": true,
},
"apIsolate": {
"index": "apIsolate",
"name": "<#4123#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#478#>",
"mode": ["RT", "AP"],
"support": true,
},
"roamingAssistant": {
"index": "roamingAssistant",
"name": "<#3195#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#478#>",
"mode": ["RT", "AP"],
"support": (() => isSupport("user_low_rssi"))(),
},
"igmpSnooping": {
"index": "igmpSnooping",
"name": "<#4119#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#478#>",
"mode": ["RT", "AP"],
"support": true,
},
"multicastRate": {
"index": "multicastRate",
"name": "<#4048#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#478#>",
"mode": ["RT", "AP"],
"support": true,
},
"ampduRts": {
"index": "ampduRts",
"name": "AMPDU RTS",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#478#>",
"mode": ["RT", "AP"],
"support": true,
},
"rtsThreshold": {
"index": "rtsThreshold",
"name": "<#4160#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#478#>",
"mode": ["RT", "AP"],
"support": true,
},
"dtimInterval": {
"index": "dtimInterval",
"name": "<#4107#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#478#>",
"mode": ["RT", "AP"],
"support": true,
},
"beaconInterval": {
"index": "beaconInterval",
"name": "<#4091#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#478#>",
"mode": ["RT", "AP"],
"support": true,
},
"txBurting": {
"index": "txBurting",
"name": "<#4167#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#478#>",
"mode": ["RT", "AP"],
"support": (() => !isSupport("non_frameburst"))(),
},
"wmm": {
"index": "wmm",
"name": "<#4170#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#478#>",
"mode": ["RT", "AP"],
"support": true,
},
"wmmNoAck": {
"index": "wmmNoAck",
"name": "<#4139#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#478#>",
"mode": ["RT", "AP"],
"support": true,
},
"wmmApsd": {
"index": "wmmApsd",
"name": "<#4086#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#478#>",
"mode": ["RT", "AP"],
"support": true,
},
"optAmpduAggregation": {
"index": "optAmpduAggregation",
"name": "<#4078#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#478#>",
"mode": ["RT", "AP"],
"support": true,
},
"optAmpduAggregation": {
"index": "optAmpduAggregation",
"name": "<#4078#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#478#>",
"mode": ["RT", "AP"],
"support": true,
},
"airtimeFairness": {
"index": "airtimeFairness",
"name": "<#4087#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#478#>",
"mode": ["RT", "AP"],
"support": true,
},
"muMimo": {
"index": "muMimo",
"name": "<#4049#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#478#>",
"mode": ["RT", "AP"],
"support": true,
},
"ofdma": {
"index": "ofdma",
"name": "<#3003#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#478#>",
"mode": ["RT", "AP"],
"support": true,
},
"explicitBeamforming": {
"index": "explicitBeamforming",
"name": "<#4111#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#478#>",
"mode": ["RT", "AP"],
"support": true,
},
"implicitBeamforming": {
"index": "implicitBeamforming",
"name": "<#4168#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#478#>",
"mode": ["RT", "AP"],
"support": true,
},
"txPower": {
"index": "txPower",
"name": "<#4055#>",
"link": "Advanced_WAdvanced_Content.asp",
"menu": "<#478#>",
"mode": ["RT", "AP"],
"support": (() => isSupport("pwrctrl"))(),
},
"roamingBlockList": {
"index": "roamingBlockList",
"name": "<#3977#>",
"link": "Advanced_Roaming_Block_Content.asp",
"menu": "<#478#>",
"mode": ["RT", "AP"],
"support": (() => isSupport("pwrctrl"))(),
},
"guestNetwork": {
"index": "guestNetwork",
"name": "<#374#>",
"link": "Guest_network.asp",
"menu": "<#374#>",
"mode": ["RT", "AP"],
"support": (() => isSupport("mssid"))(),
},
"lanIP": {
"index": "lanIP",
"name": "<#486#>",
"link": "Advanced_LAN_Content.asp",
"menu": "<#485#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"hostName": {
"index": "hostName",
"name": "<#486#>",
"link": "Advanced_LAN_Content.asp",
"menu": "<#485#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"dhcpServer": {
"index": "dhcpServer",
"name": "<#2712#>",
"link": "Advanced_DHCP_Content.asp",
"menu": "<#485#>",
"mode": ["RT"],
"support": (() => !isSupport("tagged_based_vlan"))(),
},
"dnsServer": {
"index": "dnsServer",
"name": "<#2729#>",
"link": "Advanced_DHCP_Content.asp",
"menu": "<#485#>",
"mode": ["RT"],
"support": (() => !isSupport("tagged_based_vlan"))(),
},
"route": {
"index": "route",
"name": "<#488#>",
"link": "Advanced_GWStaticRoute_Content.asp",
"menu": "<#485#>",
"mode": ["RT"],
"support": true,
},
"iptv": {
"index": "iptv",
"name": "IPTV",
"link": "Advanced_IPTV_Content.asp",
"menu": "<#485#>",
"mode": ["RT"],
"support": (() => !isSupport("noiptv"))(),
},
"switchControl": {
"index": "switchControl",
"name": "<#3424#>",
"link": "Advanced_SwitchCtrl_Content.asp",
"menu": "<#485#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("switchctrl"))(),
},
"linkAggregation": {
"index": "linkAggregation",
"name": "<#2938#>",
"link": "Advanced_SwitchCtrl_Content.asp",
"menu": "<#485#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("lacp"))(),
},
"internetConnection": {
"index": "internetConnection",
"name": "<#490#>",
"link": "Advanced_WAN_Content.asp",
"menu": "<#489#>",
"mode": ["RT"],
"support": (() => !isSupport("dsl"))(),
},
"dualWan": {
"index": "dualWan",
"name": "<#312#>",
"link": "Advanced_WANPort_Content.asp",
"menu": "<#489#>",
"mode": ["RT"],
"support": (() => isSupport("dualwan"))(),
},
"portTrigger": {
"index": "portTrigger",
"name": "<#491#>",
"link": "Advanced_PortTrigger_Content.asp",
"menu": "<#489#>",
"mode": ["RT"],
"support": true,
},
"portForwarding": {
"index": "portForwarding",
"name": "<#492#>",
"link": "Advanced_VirtualServer_Content.asp",
"menu": "<#489#>",
"mode": ["RT"],
"support": true,
},
"dmz": {
"index": "dmz",
"name": "<#493#>",
"link": "Advanced_Exposed_Content.asp",
"menu": "<#489#>",
"mode": ["RT"],
"support": true,
},
"ddns": {
"index": "ddns",
"name": "<#494#>",
"link": "Advanced_ASUSDDNS_Content.asp",
"menu": "<#489#>",
"mode": ["RT"],
"support": true,
},
"natPassThru": {
"index": "natPassThru",
"name": "<#522#>",
"link": "Advanced_WANPort_Content.asp",
"menu": "<#489#>",
"mode": ["RT"],
"support": true,
},
"aiDisk": {
"index": "aiDisk",
"name": "<#2806#>",
"link": "aidisk.asp",
"menu": "<#475#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("usbX"))(),
},
"mediaServer": {
"index": "mediaServer",
"name": "<#880#>",
"link": "mediaserver.asp",
"menu": "<#475#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("media") && !isSupport("nomedia"))(),
},
"samba": {
"index": "samba",
"name": "<#496#>",
"link": "Advanced_AiDisk_samba.asp",
"menu": "<#475#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("usbX"))(),
},
"ftp": {
"index": "ftp",
"name": "<#497#>",
"link": "Advanced_AiDisk_ftp.asp",
"menu": "<#475#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => !isSupport("noftp"))(),
},
"networkPrinter": {
"index": "networkPrinter",
"name": "<#2959#>",
"link": "PrinterServer.asp",
"menu": "<#475#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => !isSupport("dualwan"))(),
},
"3G/4G": {
"index": "3G/4G",
"name": "3G/4G",
"link": "Advanced_Modem_Content.asp",
"menu": "<#475#>",
"mode": ["RT"],
"support": (() => !isSupport("dualwan"))(),
},
"timeMachine": {
"index": "timeMachine",
"name": "<#3477#>",
"link": "Advanced_TimeMachine.asp",
"menu": "<#475#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("timemachine"))(),
},
"downloasMaster": {
"index": "downloasMaster",
"name": "<#1901#>",
"link": "APP_Installation.asp",
"menu": "<#475#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("appbase"))(),
},
"aicloud2": {
"index": "aicloud2",
"name": "<#1062#>",
"link": "cloud_main.asp",
"menu": "<#1062#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => (isSupport("cloudsync") || isSupport("aicloudipk")) && !isSupport("nocloudsync"))(),
},
"aicloudSync": {
"index": "aicloudSync",
"name": "<#3365#>",
"link": "cloud_sync.asp",
"menu": "<#1062#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => (isSupport("cloudsync") || isSupport("aicloudipk")) && !isSupport("nocloudsync"))(),
},
"aicloudSyncServer": {
"index": "aicloudSyncServer",
"name": "<#1062#> <#3290#>",
"link": "cloud_router_sync.asp",
"menu": "<#1062#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => (isSupport("cloudsync") || isSupport("aicloudipk")) && !isSupport("nocloudsync") && isSupport("rrsut"))(),
},
"aicloudSetting": {
"index": "aicloudSetting",
"name": "<#1062#> <#3310#>",
"link": "cloud_settings.asp",
"menu": "<#1062#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => (isSupport("cloudsync") || isSupport("aicloudipk")) && !isSupport("nocloudsync"))(),
},
"aicloudLog": {
"index": "aicloudLog",
"name": "<#1062#> <#2774#>",
"link": "cloud_syslog.asp",
"menu": "<#1062#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => (isSupport("cloudsync") || isSupport("aicloudipk")) && !isSupport("nocloudsync"))(),
},
"alexa": {
"index": "alexa",
"name": "Amazon Alexa",
"link": "Advanced_Smart_Home_Alexa.asp",
"menu": "<#500#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("alexa"))(),
},
"ifttt": {
"index": "ifttt",
"name": "IFTTT",
"link": "Advanced_Smart_Home_IFTTT.asp",
"menu": "<#500#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("ifttt"))(),
},
"ipv6": {
"index": "ipv6",
"name": "IPv6",
"link": "Advanced_IPv6_Content.asp",
"menu": "<#500#>",
"mode": ["RT"],
"support": (() => isSupport("ipv6"))(),
},
"firewall": {
"index": "firewall",
"name": "<#500#>",
"link": "Advanced_BasicFirewall_Content.asp",
"menu": "<#500#>",
"mode": ["RT"],
"support": true,
},
"ipv6Firewall": {
"index": "ipv6Firewall",
"name": "<#500#>",
"link": "Advanced_BasicFirewall_Content.asp",
"menu": "<#505#>",
"mode": ["RT"],
"support": (() => isSupport("ipv6"))(),
},
"dosProtection": {
"index": "dosProtection",
"name": "<#2165#>",
"link": "Advanced_BasicFirewall_Content.asp",
"menu": "<#505#>",
"mode": ["RT"],
"support": true,
},
"urlFilter": {
"index": "urlFilter",
"name": "<#501#>",
"link": "Advanced_URLFilter_Content.asp",
"menu": "<#505#>",
"mode": ["RT"],
"support": true,
},
"keywordFilter": {
"index": "keywordFilter",
"name": "<#504#>",
"link": "Advanced_KeywordFilter_Content.asp",
"menu": "<#505#>",
"mode": ["RT"],
"support": true,
},
"networkServicesFilter": {
"index": "networkServicesFilter",
"name": "<#503#>",
"link": "Advanced_Firewall_Content.asp",
"menu": "<#505#>",
"mode": ["RT"],
"support": true,
},
"loginName": {
"index": "loginName",
"name": "<#818#>",
"link": "Advanced_System_Content.asp",
"menu": "<#506#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"loginPassword": {
"index": "loginPassword",
"name": "<#819#>",
"link": "Advanced_System_Content.asp",
"menu": "<#506#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"loginCaptcha": {
"index": "loginCaptcha",
"name": "<#346#>",
"link": "Advanced_System_Content.asp",
"menu": "<#506#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("captcha"))(),
},
"hddHibernation": {
"index": "hddHibernation",
"name": "<#3669#>",
"link": "Advanced_System_Content.asp",
"menu": "<#506#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("hdspindown"))(),
},
"usbMode": {
"index": "usbMode",
"name": "<#3283#>",
"link": "Advanced_System_Content.asp",
"menu": "<#506#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("usbX"))(),
},
"timeZone": {
"index": "timeZone",
"name": "<#2741#>",
"link": "Advanced_System_Content.asp",
"menu": "<#506#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"netServer": {
"index": "netServer",
"name": "<#2733#>",
"link": "Advanced_System_Content.asp",
"menu": "<#506#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"networkMonitoring": {
"index": "networkMonitoring",
"name": "<#2957#>",
"link": "Advanced_System_Content.asp",
"menu": "<#506#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("dualwan"))(),
},
"autoLogout": {
"index": "autoLogout",
"name": "<#845#>",
"link": "Advanced_System_Content.asp",
"menu": "<#506#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"wanDownRedirectNotice": {
"index": "wanDownRedirectNotice",
"name": "<#1994#>",
"link": "Advanced_System_Content.asp",
"menu": "<#506#>",
"mode": ["RT"],
"support": (() => !isSupport("nowan"))(),
},
"rebootScheduler": {
"index": "rebootScheduler",
"name": "<#1996#>",
"link": "Advanced_System_Content.asp",
"menu": "<#506#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("reboot_schedule"))(),
},
"telnet": {
"index": "telnet",
"name": "<#1999#>",
"link": "Advanced_System_Content.asp",
"menu": "<#506#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"ssh": {
"index": "ssh",
"name": "<#1998#>",
"link": "Advanced_System_Content.asp",
"menu": "<#506#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("ssh"))(),
},
"idleTimeout": {
"index": "idleTimeout",
"name": "<#4308#>",
"link": "Advanced_System_Content.asp",
"menu": "<#506#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"localAuthMethod": {
"index": "localAuthMethod",
"name": "<#4003#>",
"link": "Advanced_System_Content.asp",
"menu": "<#506#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"httpsLanPort": {
"index": "httpsLanPort",
"name": "<#853#>",
"link": "Advanced_System_Content.asp",
"menu": "<#506#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("HTTPS"))(),
},
"webAccessFromWAN": {
"index": "webAccessFromWAN",
"name": "<#2216#>",
"link": "Advanced_System_Content.asp",
"menu": "<#506#>",
"mode": ["RT"],
"support": (() => isSwMode("rt"))(),
},
"accessRedirections": {
"index": "accessRedirections",
"name": "<#849#>",
"link": "Advanced_System_Content.asp",
"menu": "<#506#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"firmwareUpgrade": {
"index": "firmwareUpgrade",
"name": "<#2253#>",
"link": "Advanced_FirmwareUpgrade_Content.asp",
"menu": "<#510#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("afwupg"))(),
},
"firmwareVersion": {
"index": "firmwareVersion",
"name": "<#2260#>",
"link": "Advanced_FirmwareUpgrade_Content.asp",
"menu": "<#510#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"factoryDefault": {
"index": "factoryDefault",
"name": "<#3299#>",
"link": "Advanced_SettingBackup_Content.asp",
"menu": "<#511#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"saveSetting": {
"index": "saveSetting",
"name": "<#3304#>",
"link": "Advanced_SettingBackup_Content.asp",
"menu": "<#511#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"restoreSetting": {
"index": "saveSrestoreSettingtting",
"name": "<#3308#>",
"link": "Advanced_SettingBackup_Content.asp",
"menu": "<#511#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"feedback": {
"index": "feedback",
"name": "<#2805#>",
"link": "Advanced_Feedback.asp",
"menu": "<#2805#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": (() => isSupport("frs_feedback"))(),
},
"generalLog": {
"index": "generalLog",
"name": "<#512#>",
"link": "Main_LogStatus_Content.asp",
"menu": "<#847#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"wirelessLog": {
"index": "wirelessLog",
"name": "<#514#>",
"link": "Main_WStatus_Content.asp",
"menu": "<#847#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"dhcpLease": {
"index": "dhcpLease",
"name": "<#513#>",
"link": "Main_DHCPStatus_Content.asp",
"menu": "<#847#>",
"mode": ["RT"],
"support": true,
},
"ipv6Log": {
"index": "ipv6Log",
"name": "<#2581#>",
"link": "Main_IPV6Status_Content.asp",
"menu": "<#847#>",
"mode": ["RT"],
"support": (() => isSupport("ipv6"))(),
},
"routingTable": {
"index": "routingTable",
"name": "<#516#>",
"link": "Main_RouteStatus_Content.asp",
"menu": "<#847#>",
"mode": ["RT"],
"support": true,
},
"portForwarding": {
"index": "portForwarding",
"name": "<#515#>",
"link": "Main_IPTStatus_Content.asp",
"menu": "<#847#>",
"mode": ["RT"],
"support": true,
},
"activeConnections": {
"index": "activeConnections",
"name": "<#1739#>",
"link": "Main_ConnStatus_Content.aspp",
"menu": "<#847#>",
"mode": ["RT"],
"support": (() => isSupport("sfp4m"))(),
},
"networkAnalysis": {
"index": "networkAnalysis",
"name": "<#2956#>",
"link": "Main_Analysis_Content.asp",
"menu": "<#2961#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"netstat": {
"index": "netstat",
"name": "Netstat",
"link": "Main_Netstat_Content.asp",
"menu": "<#2961#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"wakeOnLan": {
"index": "wakeOnLan",
"name": "<#2978#>",
"link": "Main_WOL_Content.asp",
"menu": "<#2961#>",
"mode": ["RT", "AP", "MB", "RE"],
"support": true,
},
"smartConnectRule": {
"index": "smartConnectRule",
"name": "<#3358#>",
"link": "Advanced_Smart_Connect.asp",
"menu": "<#2961#>",
"mode": ["RT", "AP"],
"support": (() => isSupport("bcmwifi") && (isSupport("smart_connect") || isSupport("bandstr")))(),
},
}
