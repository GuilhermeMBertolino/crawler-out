(function($) {
    $.helpContent = {
        trafficCtrl: {
            TITLE: "Bandwidth Control",
            CONTENT: [{
                type: "paragraph",
                content: "Bandwidth Control allows you to configure the Upstream Bandwidth and Downstream Bandwidth of the network, and the combined throughput should not exceed 1000000 Kbps. For optimal bandwidth control, please select the correct Line Type and consult your ISP for the total allowed bandwidth for upstream and downstream."
            }, {
                type: "step",
                title: "To configure Bandwidth Control",
                content: [
                    "Enable Bandwidth Control.",
                    "Select the correct Line Type of your broadband connection.",
                    "Enter the total upload and download speed through the WAN port in the Total Upstream Bandwidth and Total Downstream Bandwidth field", {
                        type: "paragraph",
                        content: "(Optional) Enable IPTV Bandwidth Guarantee.",
                        children: [{
                            type: "name",
                            title: "Upstream Bandwidth Guarantee",
                            content: "Enter a value in Kbps to guarantee sufficient upload bandwidth for IPTV service."
                        }, {
                            type: "name",
                            title: "Downstream Bandwidth Guarantee",
                            content: "Enter a value in Kbps to guarantee sufficient download bandwidth for IPTV service."
                        }]
                    },
                    "(Optional) Enable Telephony Bandwidth Guarantee to ensure sufficient bandwidth for Telephony service.",
                    "Click Save."
                ]
            }, {
                type: "title",
                content: "Controlling Rules"
            }, {
                type: "paragraph",
                content: "This table displays details of all controlling rules."
            }, {
                type: "step",
                title: "To add a new rule",
                content: [
                    "Click Add. ",
                    "Enter a range of IP addresses to be controlled.",
                    "Enter a range of port numbers to be controlled.",
                    "Select the protocol type for this rule.",
                    "Select a priority level for this rule. 1 is the highest priority level and 8 is the lowest priority level. The total upload and download bandwidth will be allocated to guarantee the minimal rate of all bandwidth control rules.",
                    "Enter the minimum and maximum upload bandwidth (in Kbps) through the WAN port.",
                    "Enter the minimum and maximum download bandwidth (in Kbps) through the WAN port.",
                    "Select Enable This Entry.",
                    "Click Save."
                ]
            }, {
                type: "paragraph",
                content: "Note: If you want to disable this entry, click the Bulb icon."
            }]
        },
        accessControl: {
            TITLE: "Access Control",
            CONTENT: [{
                type: "paragraph",
                content: "Access Control is used to allow or block specific client devices from accessing the network. When a device is blocked, it is unable to communicate with other devices or connect to the Internet."
            }, {
                type: "step",
                title: "To control access",
                content: [
                    "Toggle On to enable Access Control.", {
                        type: "paragraph",
                        content: "Select an access mode according to the needs and click Save.",
                        children: [{
                            type: "paragraph",
                            content: "A. If you want to block access from the devices in the list below, select Blacklist."
                        }, {
                            type: "paragraph",
                            content: "B. If you want to allow access only from the devices in the list below, select Whitelist."
                        }]
                    },
                    "In Devices in Blacklist/Whitelist section, click Add. Enter the Device Name and MAC Address of the device. Click Save."
                ]
            }, {
                type: "paragraph",
                content: "Note: If you want to disable this entry, click the Bulb icon."
            }, {
                type: "title",
                content: "Online Devices"
            }, {
                type: "paragraph",
                content: "This table displays the information of all connected devices."
            }]
        },
        arpBind: {
            TITLE: "IP & MAC Binding",
            CONTENT: [{
                type: "paragraph",
                content: "IP & MAC Binding (also known as ARP Binding) is useful for controlling access of a specific device in the LAN by binding the IP address and the MAC address of the device together. IP & MAC binding also prevents other devices from using a specific IP address."
            }, {
                type: "step",
                title: "To set up a device with IP & MAC Binding",
                content: [
                    "Click Add.",
                    "Enter the MAC Address of the device.",
                    "Enter an IP Address that you want to bind to the above MAC address.",
                    "Select Enable This Entry.",
                    "Click Save."
                ]
            }, {
                type: "paragraph",
                content: "Note:<br>1. You cannot bind the same IP address to more than one MAC address.<br>2. If you want to disable this entry, click the Bulb icon."
            }, {
                type: "title",
                content: "ARP List"
            }, {
                type: "paragraph",
                content: "This table displays the MAC address and IP address of the currently connected device(s)."
            }]
        },
        yandexDns: {
            TITLE: "Yandex.DNS",
            CONTENT: [{
                type: "paragraph",
                content: "On this page you can configure Yandex.DNS filter which will secure your devices from malicious websites and will restrict adult websites for your children devices. You can configure a general filter for all devices or a separate filter for each device."
            }, {
                type: "paragraph",
                content: "Please visit dns.yandex.ru to know more about Yandex.DNS service"
            }, {
                type: "name",
                title: "Enable Yandex.DNS for all devices",
                content: "Lists the IP Address and MAC Address from any blocked DoS attack source."
            }, {
                type: "name",
                title: "Disabled",
                content: "Means, that no any Yandex.DNS filter will work on all devices."
            }, {
                type: "name",
                title: "Basic",
                content: "Means, that BasicYandex.DNS filter will work on all devices."
            }, {
                type: "name",
                title: "Safe",
                content: "Means, that SafeYandex.DNS filter will work on all devices."
            }, {
                type: "name",
                title: "Child",
                content: "Means, that ChildYandex.DNS filter will work on all devices."
            }, {
                type: "title",
                content: "Yandex.DNS rules for special device"
            }, {
                type: "name",
                title: "MAC address",
                content: "Display device’s MAC address on which Yandex.DNS filter will work."
            }, {
                type: "name",
                title: "Control Mode",
                content: "Disaply chosen Yandex.DNS filter for special device."
            }, {
                type: "name",
                title: "Description",
                content: "Display device description for better device identification."
            }, {
                type: "paragraph",
                content: "To configure specific Yandex.DNS filter for special device click Add. You can chose device from Scan list or enter MAC address manually. Select special control mode (basic, safe, child) and give a little description to rule."
            }, {
                type: "paragraph",
                content: "To add or delete entry click Modify or Trash icon in table."
            }]
        },
        alg: {
            TITLE: "ALG",
            CONTENT: [{
                type: "paragraph",
                content: "ALG (Application Layer Gateway) allows customized NAT (Network Address Translation) traversal filters to be plugged into the gateway to support address and port translation for certain application layer \"control/data\" protocols: FTP, TFTP, H323 etc. Enabling ALG is recommended."
            }, {
                type: "name",
                title: "PPTP Pass-through",
                content: "If enabled, it allows Point-to-Point sessions to be tunneled through an IP network and passed through the router."
            }, {
                type: "name",
                title: "L2TP Pass-through",
                content: "If enabled, it allows Layer 2 Point-to-Point sessions to be tunneled through an IP network and passed through the router."
            }, {
                type: "name",
                title: "IPSec Pass-through",
                content: "If enabled, it allows IPSec (Internet Protocol Security) to be tunneled through an IP network and passed through the router. IPSec uses cryptographic security services to ensure private and secure communications over IP networks."
            }, {
                type: "name",
                title: "FTP ALG",
                content: "If enabled, it allows FTP (File Transfer Protocol) clients and servers to transfer data via NAT."
            }, {
                type: "name",
                title: "TFTP ALG",
                content: "If enabled, it allows TFTP (Trivial File Transfer Protocol) clients and servers to transfer data via NAT."
            }, {
				display: "INCLUDE_ALG_H323==1",
                type: "name",
                title: "H323 ALG",
                content: "If enabled, it allows Microsoft NetMeeting clients to communicate via NAT."
            }, {
				display: "INCLUDE_ALG_SIP==1",
                type: "name",
                title: "SIP ALG",
                content: "If enabled, it allows clients communicate with SIP (Session Initiation Protocol) servers via NAT."
            }, {
				display: "INCLUDE_ALG_RTSP==1",
                type: "name",
                title: "RTSP ALG",
                content: "If enabled, it allows clients communicate with RTSP (Real Time Streaming Protocol) servers via NAT."
            }]
        },
        virtualServer: {
            TITLE: "Virtual Servers",
            CONTENT: [{
                type: "paragraph",
                content: "Virtual Servers are used to set up public services on the local network. A virtual server is defined as an external port, and all requests from the Internet to this external port will be redirected to a designated computer, which must be configured with a static or reserved IP address. When you build up a server on the local network and want to share it on the Internet, Virtual Servers can realize the service and provide it to the Internet users."
            }, {
                type: "paragraph",
                content: "The table displays the relevant parameters of the virtual server."
            }, {
                type: "name",
                title: "Service Type",
                content: " Displays the name of your virtual server."
            }, {
                type: "name",
                title: "External Port",
                content: "Displays the port number or a range of ports used by the virtual server. "
            }, {
                type: "name",
                title: "Internal IP",
                content: "Displays the IP address of the computer running the service application."
            }, {
                type: "name",
                title: "Internal Port",
                content: "Displays the port number of computer running the service application."
            }, {
                type: "name",
                title: "Protocol",
                content: "Displays the protocol used for the service application: TCP, UDP, or All (All protocols supported by the router)."
            }, {
                type: "step",
                title: "To set up a Virtual Server rule",
                content: [
                    "Click Add.",
                    "Select an interface name from the drop-down list.",
                    "Click Scan to select a service from the list to automatically populate the appropriate port number in the External Port and Internal Port fields. If the service is not listed, enter the External Port number (e.g. 21) or a range of ports (e.g. 21-25). Leave the Internal Port blank if it is the same as the External Port or enter a specific port number (e.g. 21) if the External Port is a single port.",
                    "Enter the IP address of the computer running the service application in the Internal IP field.",
                    "Select a protocol for the service application: TCP, UDP, or All from the Protocol drop-down list.",
                    "Select Enable This Entry.",
                    "Click Save."
                ]
            }, {
                type: "paragraph",
                content: "<strong>Note:</strong><br>1.If you want to disable this entry, click the Bulb icon.<br>2.It is recommended to keep the default settings of Internal Port and Protocol if you are not clear about which port or protocol to use.<br>3.If the local host device is hosting more than one type of available services, you need to create a rule for each service. Please note that the External Port should NOT be overlapped."
            }]
        },
        portTrigger: {
            TITLE: "Port Triggering",
            CONTENT: [{
                type: "paragraph",
                content: "Port Triggering is used to forward traffic on a certain port to specific server on the network."
            }, {
                type: "paragraph",
                content: "The table displays the relevant parameters of the port triggering."
            }, {
                type: "name",
                title: "Application",
                content: "Displays the name of the application."
            }, {
                type: "name",
                title: "Triggering Port",
                content: "Displays the outgoing traffic port used to trigger a filtering rule of an outgoing connection."
            }, {
                type: "name",
                title: "Triggering Protocol",
                content: "Displays the protocol used for Triggering Port. TCP, UDP, or All (All protocols supported by the router)."
            }, {
                type: "name",
                title: "External Port",
                content: "Displays the port or port range used by the remote system. A response using one of these ports will be forwarded to the PC which triggers this rule. You can input at most 5 groups of ports (or port sections). Every group of ports must be separated with \",\" (commas), for example, 2000-2038, 2046, 2050-2051, 2085, 3010-3030."
            }, {
                type: "name",
                title: "External Protocol",
                content: "Displays the protocol used for Incoming Port: TCP, UDP, or ALL (all protocols supported by the router)."
            }, {
                type: "paragraph",
                content: "<strong>Note:</strong><br>Each rule can only be used by one host at a time."
            }, {
                type: "step",
                title: "To set up a Port Triggering rule",
                content: [
                    "Click Add.",
                    "Select an interface name from the drop-down list.",
                    "Click Scan to select an application from the list to automatically populate the default values into the appropriate fields. If you want to add an unlisted application, manually enter the Application, Triggering Port, Triggering Protocol, External Port and External Protocol.",
                    "Select Enable This Entry.",
                    "Click Save."
                ]
            }, {
                type: "paragraph",
                content: "<strong>Note:</strong><br>If you want to disable this rule, click the Bulb icon."
            }]
        },
        dmz: {
            TITLE: "DMZ",
            CONTENT: [{
                type: "paragraph",
                content: "The DMZ (Demilitarized Zone) host feature allows a local host to be exposed to the Internet for a special-purpose service, such as Internet gaming or video conferencing. Basically, the DMZ allows a single computer on your LAN to open all its ports. This computer needs to be configured with a static IP address and have its DHCP client feature disabled. When DMZ is enabled, the DMZ host is totally exposed to the Internet, which may bring some potential safety hazard to the computer. If DMZ is not in use, please disable it in time."
            }, {
                type: "step",
                title: "To assign a computer or server to be a DMZ server",
                content: [
                    "Select Enable DMZ.",
                    "In the DMZ Host IP Address field, enter the IP Address of a local computer to set up as the DMZ host.",
                    "Click Save."
                ]
            }]
        },
        upnp: {
            TITLE: "UPnP",
            CONTENT: [{
                type: "paragraph",
                content: "By default, the UPnP (Universal Plug-and-Play) feature is enabled to allow devices, such as computers and Internet appliances, to automatically discover and communicate with each other on the local network."
            }, {
                type: "paragraph",
                content: "You may need to enable the UPnP if you want to use applications for multiplayer gaming, peer-to-peer connections, real-time communication (such as VoIP or teleVoIP conference) or remote assistance, etc."
            }, {
                type: "name",
                title: "UPnP Service List",
                content: "The UPnP Service List displays the UPnP information of the local host(s)."
            }]
        },
        wlGuestDulBandAdv: {
            TITLE: "Guest Network",
            CONTENT: [{
                type: "paragraph",
                content: "Guest Network allows you to set up a separate wireless network with a separate network name (SSID) and password that your guests can use to access the Internet."
            }, {
                type: "title",
                content: "Settings"
            }, {
                type: "paragraph",
                content: "This function allows you to provide Wi-Fi access for guests without disclosing the main network."
            }, {
                type: "name",
                title: "Allow Guests to Access Each Other",
                content: "Select this checkbox to allow the wireless devices on the Guest Network to communicate with each other via methods such as network neighbors, Samba, Ping, and FTP."
            }, {
                type: "name",
                title: "Allow Guests to Access My Local Network",
                content: "Select this checkbox to allow the wireless devices on the Guest Network to communicate with the devices connected to the router's LAN ports or main network via methods such as network neighbors, Samba, Ping, and FTP."
            }, {
				display: INCLUDE_USB_STORAGE,
                type: "name",
                title: "Allow Guests to Access My USB Storage Sharing",
                content: "Select this checkbox to allow wireless devices on the Guest Network to access the contents on your shared USB storage."
            }, {
                display: "INCLUDE_APP_IQOS == 1",
                type: "name",
                title: "QoS Settings",
                content: "Select this checkbox to configure QoS (Quality of Service) priority for the Guest Network."
            }, {
                display: "!(INCLUDE_APP_IQOS == 1)",
                type: "name",
                title: "Bandwidth Control",
                content: "Select this checkbox to configure the upstream and downstream bandwidth for the Guest Network."
            }, {
                type: "title",
                content: "2.4GHz Wireless"
            }, {
                type: "name",
                title: "Enable Guest Network",
                content: "Select this checkbox to enable the Guest Network feature."
            }, {
                type: "name",
                title: "Network Name (SSID)",
                content: "Either use the default Guest SSID or create a new name (up to 32 characters)."
            }, {
                type: "name",
                title: "Hide SSID",
                content: "Select this checkbox if you want to hide the Guest SSID from the Wi-Fi network list."
            }, {
                type: "name",
                title: "Security",
                content: "Select one of the following security options:",
                children: [{
                    type: "name",
                    title: "No Security",
                    content: "Select this option to disable the wireless security. This is not recommended."
                }, {
                    type: "name",
                    title: "WPA/WPA2-Personal",
                    content: "Select this option to enable the wireless security. This is highly recommended to protect the Guest Network from unauthorized access. If selected, configure the following."
                }, {
                    type: "name",
                    title: "Version",
                    content: "Select a security version. WPA2-PSK is more secure. If you are not sure, select Auto."
                }, {
                    type: "name",
                    title: "Encryption",
                    content: "Select a security encryption type. AES is more secure. It is NOT recommended to use the TKIP encryption if the router operates in 802.11n mode. Besides, using TKIP will disable the WPS function. If you are not sure, select Auto."
                }, {
                    type: "name",
                    title: "Password",
                    content: "Create a password between 8 and 63 ASCII characters, or between 8 and 64 hexadecimal characters (0-9, a-f, A-F)."
                }]
            }]
        },
        wirelessStat: {
            TITLE: "Online Wireless Clients",
            CONTENT: [{
                type: "paragraph",
                content: "This table displays details of all connected wireless clients."
            }]
        },
        wirelessAdv: {
            TITLE: "Advanced Settings",
            CONTENT: [{
                type: "name",
                title: "2.4GHz Advanced Settings",
                content: "This section allows you to configure the parameters of traffic transmission rules in wireless networks. It's recommended to keep the default settings if you are not sure of the proper ones."
            }, {
                type: "name",
                title: "Beacon Interval",
                content: "Enter a value between 40 and 1000 in milliseconds to determine the duration between beacon packets that are broadcasted by the router to synchronize the wireless network. The default is 100 milliseconds."
            }, {
                type: "name",
                title: "RTS Threshold",
                content: "Enter a value between 1 and 2346 to determine the packet size of data transmission through the router. By default, the RTS (Request to Send) Threshold size is 2346. If the packet size is greater than the preset threshold, the router sends Request to Send frames to a particular receiving station and negotiates the sending of a data frame, or else the packet will be sent immediately."
            }, {
                type: "name",
                title: "DTIM Interval",
                content: "This value determines the internal of DTIM (Delivery Traffic Indication Message). Enter a value between 1 and 15 internals. The default interval is 1, indicating the DTIM interval is the same as Beacon Interval."
            }, {
                type: "name",
                title: "Group Key Update Period",
                content: " Enter the number of seconds (minimum 30) to control the time interval for the encryption key automatic renewal. The default is 0, indicating no key renewal."
            }, {
                type: "name",
                title: "WMM",
                content: "This feature guarantees the packets with high-priority messages being transmitted preferentially. WMM is enabled compulsively under 802.11n or 802.11ac mode. It is strongly recommended to enable WMM."
            }, {
                type: "name",
                title: "Short GI",
                content: "This function is enabled by default and recommended to increase the packet capacity by the GI (Guard Interval) time."
            }, {
                type: "name",
                title: "AP Isolation",
                content: "If you want to confine and restrict all wireless devices connected to the network from interacting with each other, but still able to access the Internet, select the checkbox to enable AP Isolation."
            }, {
                display: !INCLUDE_WISP_WAN  && INCLUDE_LAN_WLAN_WDS,
                type: "title",
                content: "WDS"
            }, {
                display: !INCLUDE_WISP_WAN  && INCLUDE_LAN_WLAN_WDS,
                type: "name",
                title: "2.4GHz WDS",
                content: "WDS(Wireless Distribution System) Bridging feature allows you to extend the wireless network coverage by bridging with an AP (access point) in a wireless LAN (local area network)."
            }, {
                display: !INCLUDE_WISP_WAN  && INCLUDE_LAN_WLAN_WDS,
                type: "step",
                title: "To enable WDS",
                content: [
                    "Select Enable the WDS Bridging.",
                    "To bridge a network by Scan feature: click Scan to scan and display all available networks and select the network you want to bridge with. The SSID (network name), MAC Address, and Security will be automatically populated.<br/>Or to bridge a network manually: enter the SSID (network name) and MAC Address of the network to be bridged. Select a Security type and enter related parameters, which should be the same as the network to be bridged.",
                    "Click <b>Save</b>."
                ]
            }, {
                type: "title",
                content: "WPS"
            }, {
                type: "paragraph",
                content: "WPS (Wi-Fi Protected Setup) provides you with an easier approach to set up a security-protected Wi-Fi connection."
            }]
        },
        wirelessSchedule: {
            TITLE: "Wireless Schedule",
            CONTENT: [{
                type: "paragraph",
                content: "With Wireless Schedule, you can disable the wireless signal during a specific period. For example, you can turn off the wireless signal between 00:00 am and 07:00 am."
            }, {
                type: "name",
                title: "Wireless Off Time",
                content: "Displays the period(s) during which the wireless signal is off.",
                children: [{
                    type: "step",
                    title: "To set up wireless off time",
                    content: [
                        "Click Add.",
                        "Set the time period during which you need the wireless signal to be off.",
                        "Select repetition days. You can choose \"Every Day\" or specify certain days.",
                        "Click Save."
                    ]
                }]
            }]
        },
        wirelessSettings: {
            TITLE: "Wireless Settings",
            CONTENT: [{
                type: "name",
                title: "2.4GHz",
                content: INCLUDE_LAN_WLAN_DUALBAND == 1 ?"Select 2.4GHz or  to change the corresponding settings.":"Select 2.4GHz to change the corresponding settings."
            }, {
                type: "name",
                title: "Network Name (SSID)",
                content: "You are recommended to change the network name (SSID). This field is case-sensitive."
            }, {
                type: "name",
                title: "Hide SSID",
                content: "Select if you want to hide the network name (SSID) from the wireless network list. When selected, the SSID will not be broadcast and you need to manually join the network."
            }, {
                type: "name",
                title: "Security",
                content: "Select one of the following security options:",
                children: [{
                    type: "name",
                    title: "No Security",
                    content: "Select this option to disable the wireless security. This is not recommended."
                }, {
                    type: "name",
                    title: "WPA/WPA2 Personal",
                    content: "Select this option to enable the wireless security. This is highly recommended to protect the wireless network from unauthorized access. If selected, configure the following.",
                    children: [{
                        type: "name",
                        title: "Version",
                        content: "Select a security version. WPA2-PSK is more secure. If you are not sure, select Auto."
                    }, {
                        type: "name",
                        title: "Encryption",
                        content: "Select a security encryption type. AES is more secure. It is NOT recommended to use the TKIP encryption if the router operates in 802.11n mode. Besides, using TKIP will disable the WPS function. If you are not sure, select Auto."
                    }, {
                        type: "name",
                        title: "Password",
                        content: "Enter a wireless password between 8 and 63 ASCII characters, or between 8 and 64 hexadecimal characters into this field."
                    }]
                }, {
                    type: "name",
                    title: "WPA/WPA2 Enterprise",
                    content: "Select this option to enable the more advanced authentication method using a RADIUS (Remote Authentication Dial In User Service) server. If selected, WPS function will be disabled.",
                    children: [{
                        type: "name",
                        title: "Version",
                        content: "Select a security version. WPA2 is more secure. If you are not sure, select Auto."
                    }, {
                        type: "name",
                        title: "Encryption",
                        content: "Select a security encryption type. AES is more secure. It is NOT recommended to use the TKIP encryption if the router operates in 802.11n mode. Besides, using TKIP will disable the WPS function. If you are not sure, select Auto."
                    }, {
                        type: "name",
                        title: "RADIUS Server IP",
                        content: "Enter the IP address of the RADIUS server."
                    }, {
                        type: "name",
                        title: "RADIUS Server Port",
                        content: "Enter the port number of the RADIUS server."
                    }, {
                        type: "name",
                        title: "RADIUS Server Password",
                        content: " Enter the shared password of the RADIUS server."
                    }]
                }, {
                    type: "name",
                    title: "WEP",
                    content: "Select this option to enable basic authentication method if any of the client devices can only access the wireless using WEP (Wired Equivalent Privacy).",
                    children: [{
                        type: "name",
                        title: "Type",
                        content: "Select an authentication type for the wireless network. If you are not sure, select Auto."
                    }, {
                        type: "name",
                        title: "Key Selected",
                        content: "Select which of the four keys will be used and create a WEP key in the Key Value field. Wireless clients need to enter the matching WEP key to connect to your network."
                    }, {
                        type: "name",
                        title: "WEP Key Format",
                        content: "Either use ASCII format or select Hexadecimal. ASCII format is a combination of alphabetic and numeric characters. Hexadecimal format is a combination of the number (0-9) and letters (A-F, a-f)."
                    }, {
                        type: "name",
                        title: "Key Type",
                        content: "Select a WEP key length.",
                        children: [{
                            type: "name",
                            title: "64-bit",
                            content: "Allows you to enter 10 hexadecimal digits (0-9, A-F, a-f) or 5 ASCII characters into the WEP Value field."
                        }, {
                            type: "name",
                            title: "128-bit",
                            content: "Allows you to enter 26 hexadecimal digits (0-9, A-F, a-f) or 13 ASCII characters into the WEP Value field."
                        }]
                    }, {
                        type: "name",
                        title: "Key Value",
                        content: "Create a WEP key."
                    }]
                }]
            }, {
                type: "name",
                title: "Mode",
                content: "Select a transmission mode."
            }, {
                type: "name",
                title: "Channel",
                content: "Select an operating channel for the wireless network. It is recommended to leave the channel to Auto if you are not experiencing the intermittent wireless connection issue."
            }, {
                type: "name",
                title: "Channel Width",
                content: "Select a channel width (bandwidth) for the wireless network. If you are not sure, select Auto."
            }, {
                type: "name",
                title: "Transmit Power",
                content: "Select either High, Middle, or Low to specify the data transmit power. The default and recommended setting is High."
            }]
        },
        /* add by zhangchi */
        wlConnect: {
            TITLE: "Connect to Host Network",
            CONTENT: [{
                type: "paragraph",
                content: "The AP with WDS disabled will relays data to an associated root AP, which is the host network. Be sure to click the Save button to save your settings on this page."
            }, {
                type: "name",
                title: "2.4GHz Network",
                content: "The radio can be enabled or disabled to connect or disconnect to Host Network."
            }, {
                type: "name",
                title: "Host 2.4GHz SSID",
                content: "The same Name (SSID) must be assigned to all wireless devices in your network. Click the Scan button behind, you can choose one of searching results to fill in this field."
            }, {
                type: "name",
                title: "Host 2.4GHz MAC",
                content: "Please input the MAC address of root AP in this field. When you use the Scan function to fulfill the “Host 2.4GHz SSID”, this field will be filled in automatically."
            }, {
                type: "name",
                title: "Security",
                content: "Select one of the following security options:",
                children: [{
                    type: "name",
                    title: "No Security",
                    content: "Select this option to disable the wireless security. This is not recommended."
                }, {
                    type: "name",
                    title: "WPA/WPA2 Personal",
                    content: "Select this option to enable the wireless security. This is highly recommended to protect the wireless network from unauthorized access. If selected, configure the following.",
                    children: [{
                        type: "name",
                        title: "Version",
                        content: "Select a security version. WPA2-PSK is more secure."
                    }, {
                        type: "name",
                        title: "Encryption",
                        content: "Select a security encryption type. AES is more secure. It is NOT recommended to use the TKIP encryption if the router operates in 802.11n mode. Besides, using TKIP will disable the WPS function."
                    }, {
                        type: "name",
                        title: "Password",
                        content: "Enter a wireless password between 8 and 63 ASCII characters, or between 8 and 64 hexadecimal characters into this field."
                    }]
                }, {
                    type: "name",
                    title: "WEP",
                    content: "Select this option to enable basic authentication method if any of the client devices can only access the wireless using WEP (Wired Equivalent Privacy).",
                    children: [{
                        type: "name",
                        title: "Type",
                        content: "Select an authentication type for the wireless network."
                    }, {
                        type: "name",
                        title: "WEP Key Format",
                        content: "Either use ASCII format or select Hexadecimal. ASCII format is a combination of alphabetic and numeric characters. Hexadecimal format is a combination of the number (0-9) and letters (A-F, a-f)."
                    }, {
                        type: "name",
                        title: "Key Selected",
                        content: "Select which of the four keys will be used and create a WEP key in the Key Value field. Wireless clients need to enter the matching WEP key to connect to your network."
                    }, {
                        type: "name",
                        title: "Key Value",
                        content: "Create a WEP key."
                    }]
                }]
            }]
        },
        wlExtender: {
            TITLE: "Wireless Settings",
            CONTENT: [{
                type: "paragraph",
                content: "The wireless repeater relays signal between its stations and the root AP for greater wireless range. The wireless radio of the AP can be enabled or disabled to allow or deny wireless stations to access. When you click the “Copy Host Network Setting” button, the fields below will be filled in automatically the same as Host Network Setting."
            }, {
                type: "name",
                title: "Network Name (SSID)",
                content: "The SSID of AP that you want to access. The Hide SSID radio can be enabled or disabled hide SSID."
            }, {
                type: "name",
                title: "Security",
                content: "Select one of the following security options:",
                children: [{
                    type: "name",
                    title: "No Security",
                    content: "Select this option to disable the wireless security. This is not recommended."
                }, {
                    type: "name",
                    title: "WPA/WPA2 Personal",
                    content: "Select this option to enable the wireless security. This is highly recommended to protect the wireless network from unauthorized access. If selected, configure the following.",
                    children: [{
                        type: "name",
                        title: "Version",
                        content: "Select a security version. WPA2-PSK is more secure. If you are not sure, select Auto."
                    }, {
                        type: "name",
                        title: "Encryption",
                        content: "Select a security encryption type. AES is more secure. It is NOT recommended to use the TKIP encryption if the router operates in 802.11n mode. Besides, using TKIP will disable the WPS function. If you are not sure, select Auto."
                    }, {
                        type: "name",
                        title: "Password",
                        content: "Enter a wireless password between 8 and 63 ASCII characters, or between 8 and 64 hexadecimal characters into this field."
                    }]
                }, {
                    type: "name",
                    title: "WPA/WPA2 Enterprise",
                    content: "Select this option to enable the more advanced authentication method using a RADIUS (Remote Authentication Dial In User Service) server. If selected, WPS function will be disabled.",
                    children: [{
                        type: "name",
                        title: "Version",
                        content: "Select a security version. WPA2 is more secure. If you are not sure, select Auto."
                    }, {
                        type: "name",
                        title: "Encryption",
                        content: "Select a security encryption type. AES is more secure. It is NOT recommended to use the TKIP encryption if the router operates in 802.11n mode. Besides, using TKIP will disable the WPS function. If you are not sure, select Auto."
                    }, {
                        type: "name",
                        title: "RADIUS Server IP",
                        content: "Enter the IP address of the RADIUS server."
                    }, {
                        type: "name",
                        title: "RADIUS Server Port",
                        content: "Enter the port number of the RADIUS server."
                    }, {
                        type: "name",
                        title: "RADIUS Server Password",
                        content: " Enter the shared password of the RADIUS server."
                    }]
                }, {
                    type: "name",
                    title: "WEP",
                    content: "Select this option to enable basic authentication method if any of the client devices can only access the wireless using WEP (Wired Equivalent Privacy).",
                    children: [{
                        type: "name",
                        title: "Type",
                        content: "Select an authentication type for the wireless network. If you are not sure, select Auto."
                    }, {
                        type: "name",
                        title: "Key Selected",
                        content: "Select which of the four keys will be used and create a WEP key in the Key Value field. Wireless clients need to enter the matching WEP key to connect to your network."
                    }, {
                        type: "name",
                        title: "WEP Key Format",
                        content: "Either use ASCII format or select Hexadecimal. ASCII format is a combination of alphabetic and numeric characters. Hexadecimal format is a combination of the number (0-9) and letters (A-F, a-f)."
                    }, {
                        type: "name",
                        title: "Key Type",
                        content: "Select a WEP key length.",
                        children: [{
                            type: "name",
                            title: "64-bit",
                            content: "Allows you to enter 10 hexadecimal digits (0-9, A-F, a-f) or 5 ASCII characters into the WEP Value field."
                        }, {
                            type: "name",
                            title: "128-bit",
                            content: "Allows you to enter 26 hexadecimal digits (0-9, A-F, a-f) or 13 ASCII characters into the WEP Value field."
                        }]
                    }, {
                        type: "name",
                        title: "Key Value",
                        content: "Create a WEP key."
                    }]
                }]
            }, {
                type: "name",
                title: "Mode",
                content: "Select a transmission mode."
            }, {
				display: "0",
                type: "name",
                title: "Channel",
                content: "Select an operating channel for the wireless network. It is recommended to leave the channel to Auto if you are not experiencing the intermittent wireless connection issue."
            }, {
				display: "0",
                type: "name",
                title: "Channel Width",
                content: "Select a channel width (bandwidth) for the wireless network. If you are not sure, select Auto."
            }, {
                type: "name",
                title: "Transmit Power",
                content: "Select either High, Middle, or Low to specify the data transmit power. The default and recommended setting is High."
            }]
        },
        wirelessWispSettings: {
            TITLE: "Wireless Settings",
            CONTENT: [{
                type: "paragraph",
                content: "Failure to follow these guidelines can result in significant performance degradation or inability to wirelessly connect to the Router. The wireless radio of the Router can be enabled or disabled to allow wireless stations access."
            }, {
                type: "name",
                title: "Remote AP Name(SSID)",
                content: "The SSID of the AP your Router is going to connect to as a client. You can also use the search function to select the SSID to join. Click this button, you can search the APs."
            }, {
                type: "name",
                title: "MAC Address Of Remote AP",
                content: "MAC Address Of Remote AP your Router is going to connect to as a client. You can also use the Scan function to select the MAC Address to join."
            }, {
                type: "name",
                title: "Security",
                content: "Select one of the following security options:",
                children: [{
                    type: "name",
                    title: "No Security",
                    content: "Select this option to disable the wireless security. This is not recommended."
                }, {
                    type: "name",
                    title: "WPA/WPA2 Personal",
                    content: "Select this option to enable the wireless security. This is highly recommended to protect the wireless network from unauthorized access. If selected, configure the following.",
                    children: [{
                        type: "name",
                        title: "Version",
                        content: "Select a security version. WPA2-PSK is more secure."
                    }, {
                        type: "name",
                        title: "Encryption",
                        content: "Select a security encryption type. AES is more secure. It is NOT recommended to use the TKIP encryption if the router operates in 802.11n mode. Besides, using TKIP will disable the WPS function."
                    }, {
                        type: "name",
                        title: "Password",
                        content: "Enter a wireless password between 8 and 63 ASCII characters, or between 8 and 64 hexadecimal characters into this field."
                    }]
                }, {
                    type: "name",
                    title: "WEP",
                    content: "Select this option to enable basic authentication method if any of the client devices can only access the wireless using WEP (Wired Equivalent Privacy).",
                    children: [{
                        type: "name",
                        title: "Type",
                        content: "Select an authentication type for the wireless network."
                    }, {
                        type: "name",
                        title: "WEP Key Format",
                        content: "Either use ASCII format or select Hexadecimal. ASCII format is a combination of alphabetic and numeric characters. Hexadecimal format is a combination of the number (0-9) and letters (A-F, a-f)."
                    }, {
                        type: "name",
                        title: "Key Selected",
                        content: "Select which of the four keys will be used and create a WEP key in the Key Value field. Wireless clients need to enter the matching WEP key to connect to your network."
                    }, {
                        type: "name",
                        title: "Key Value",
                        content: "Create a WEP key."
                    }]
                }]
            }, {
                type: "name",
                title: "Network Name (SSID)",
                content: "The SSID of AP that you want to access. The Hide SSID radio can be enabled or disabled hide SSID."
            }, {
                type: "name",
                title: "Security",
                content: "Select one of the following security options:",
                children: [{
                    type: "name",
                    title: "No Security",
                    content: "Select this option to disable the wireless security. This is not recommended."
                }, {
                    type: "name",
                    title: "WPA/WPA2 Personal",
                    content: "Select this option to enable the wireless security. This is highly recommended to protect the wireless network from unauthorized access. If selected, configure the following.",
                    children: [{
                        type: "name",
                        title: "Version",
                        content: "Select a security version. WPA2-PSK is more secure. If you are not sure, select Auto."
                    }, {
                        type: "name",
                        title: "Encryption",
                        content: "Select a security encryption type. AES is more secure. It is NOT recommended to use the TKIP encryption if the router operates in 802.11n mode. Besides, using TKIP will disable the WPS function. If you are not sure, select Auto."
                    }, {
                        type: "name",
                        title: "Password",
                        content: "Enter a wireless password between 8 and 63 ASCII characters, or between 8 and 64 hexadecimal characters into this field."
                    }]
                }, {
                    type: "name",
                    title: "WPA/WPA2 Enterprise",
                    content: "Select this option to enable the more advanced authentication method using a RADIUS (Remote Authentication Dial In User Service) server. If selected, WPS function will be disabled.",
                    children: [{
                        type: "name",
                        title: "Version",
                        content: "Select a security version. WPA2 is more secure. If you are not sure, select Auto."
                    }, {
                        type: "name",
                        title: "Encryption",
                        content: "Select a security encryption type. AES is more secure. It is NOT recommended to use the TKIP encryption if the router operates in 802.11n mode. Besides, using TKIP will disable the WPS function. If you are not sure, select Auto."
                    }, {
                        type: "name",
                        title: "RADIUS Server IP",
                        content: "Enter the IP address of the RADIUS server."
                    }, {
                        type: "name",
                        title: "RADIUS Server Port",
                        content: "Enter the port number of the RADIUS server."
                    }, {
                        type: "name",
                        title: "RADIUS Server Password",
                        content: " Enter the shared password of the RADIUS server."
                    }]
                }, {
                    type: "name",
                    title: "WEP",
                    content: "Select this option to enable basic authentication method if any of the client devices can only access the wireless using WEP (Wired Equivalent Privacy).",
                    children: [{
                        type: "name",
                        title: "Type",
                        content: "Select an authentication type for the wireless network. If you are not sure, select Auto."
                    }, {
                        type: "name",
                        title: "Key Selected",
                        content: "Select which of the four keys will be used and create a WEP key in the Key Value field. Wireless clients need to enter the matching WEP key to connect to your network."
                    }, {
                        type: "name",
                        title: "WEP Key Format",
                        content: "Either use ASCII format or select Hexadecimal. ASCII format is a combination of alphabetic and numeric characters. Hexadecimal format is a combination of the number (0-9) and letters (A-F, a-f)."
                    }, {
                        type: "name",
                        title: "Key Type",
                        content: "Select a WEP key length.",
                        children: [{
                            type: "name",
                            title: "64-bit",
                            content: "Allows you to enter 10 hexadecimal digits (0-9, A-F, a-f) or 5 ASCII characters into the WEP Value field."
                        }, {
                            type: "name",
                            title: "128-bit",
                            content: "Allows you to enter 26 hexadecimal digits (0-9, A-F, a-f) or 13 ASCII characters into the WEP Value field."
                        }]
                    }, {
                        type: "name",
                        title: "Key Value",
                        content: "Create a WEP key."
                    }]
                }]
            }, {
                type: "name",
                title: "Mode",
                content: "Select a transmission mode."
            }, {
                type: "name",
                title: "Channel",
                content: "Select an operating channel for the wireless network. It is recommended to leave the channel to Auto if you are not experiencing the intermittent wireless connection issue."
            }, {
                type: "name",
                title: "Channel Width",
                content: "Select a channel width (bandwidth) for the wireless network. If you are not sure, select Auto."
            }, {
                type: "name",
                title: "Transmit Power",
                content: "Select either High, Middle, or Low to specify the data transmit power. The default and recommended setting is High."
            }]
        },
        wanBasic: {
            TITLE: "Internet Connection Setup",
            CONTENT: [{
                type: "paragraph",
                content: "Select the Internet Connection Type and enter the corresponding parameters. You click Auto Detect button to find appropriate Internet Connection type."
            }, {
                type: "name",
                title: "Internet Connection Type: Dynamic IP",
                content: "Select this type if you are provided with a DHCP server connection by the ISP."
            }, {
                type: "name",
                title: "Internet Connection Type: Static IP",
                content: "Select this type if you are provided with a specific (fixed) IP address, subnet mask, default gateway, and DNS parameters by your ISP."
            }, {
                type: "name",
                title: "Internet Connection Type: PPPoE",
                content: "Select this type if you use DSL (Digital Subscriber Line) service and are provided with a username and password by the ISP."
            }, {
                type: "name",
                title: "Internet Connection Type: L2TP",
                content: "Select this type if you use L2TP service and are provided with a username and password by the ISP."
            }, {
                type: "name",
                title: "Internet Connection Type: PPTP",
                content: "Select this type if you use PPTP service and are provided with a username and password by the ISP."
            }],
            CONTENT_ETH: [{
                type: "paragraph",
                content: "Select the Internet Connection Type and enter the corresponding parameters. You click Auto Detect button to find appropriate Internet Connection type."
            }, {
                type: "name",
                title: "Internet Connection Type: Dynamic IP",
                content: "Select this type if you are provided with a DHCP server connection by the ISP."
            }, {
                type: "name",
                title: "Internet Connection Type: Static IP",
                content: "Select this type if you are provided with a specific (fixed) IP address, subnet mask, default gateway, and DNS parameters by your ISP."
            }, {
                type: "name",
                title: "Internet Connection Type: PPPoE",
                content: "Select this type if you use DSL (Digital Subscriber Line) service and are provided with a username and password by the ISP."
            }, {
                type: "name",
                title: "Internet Connection Type: L2TP",
                content: "Select this type if you use L2TP service and are provided with a username and password by the ISP."
            }, {
                type: "name",
                title: "Internet Connection Type: PPTP",
                content: "Select this type if you use PPTP service and are provided with a username and password by the ISP."
            }]
        },
        /* end add */
        wps: {
            TITLE: "WPS",
            CONTENT: [{
                type: "paragraph",
                content: "WPS (Wi-Fi Protected Setup) provides you with an easier approach to set up a security-protected Wi-Fi connection."
            }, {
                type: "name",
                title: "Push Button (recommended)",
                content: "This method allows you to easily connect any WPS-enabled device to the wireless network. Click the Start WPS button on the screen. Within two minutes, press the WPS button on the client device."
            }, {
                type: "name",
                title: "Router's PIN",
                content: "The default PIN can be found on the label of the router. Click Generate to get a new PIN or click Default to restore the current PIN to its factory default PIN."
            }, {
                type: "name",
                title: "Client's PIN",
                content: "This method allows you to add a wireless device manually. Enter the device's PIN in the field and then click Connect."
            }]
        },
        parentCtrl: {
            TITLE: "Parental Controls",
            CONTENT: [{
                type: "paragraph",
                content: "With Parental Controls, you can block inappropriate, explicit and malicious websites; restrict access by certain times of day (for example, Facebook or YouTube during homework time)."
            }, {
                type: "title",
                content: "Devices Under Parental Controls"
            }, {
                type: "paragraph",
                content: "This table displays the information and settings of the devices that are currently restricted by Parental Controls."
            }, {
                type: "step",
                title: "To restrict a new client device",
                content: [
                    'Toggle On Parental Controls.',
                    'Click Add.',
                    'Click Scan to choose a currently connected device from the Access Devices List; or enter the Device Name and MAC Address manually to add a device that is not connected.',
                    'Click the Effective Time icon to specify a time period during which the restriction applies.',
                    'Enter a brief description into the Description field.',
                    'Select Enable This Entry.',
                    'Click Save.'
                ]
            }, {
                type: "paragraph",
                content: "Note: If you want to disable this entry, click the Bulb icon."
            }, {
                type: "title",
                title: "Content Restriction"
            }, {
                type: "paragraph",
                content: "Content Restriction allows you to restrict access to specific websites using keywords and domain names. The client devices being controlled by Parental Controls can or cannot access these websites depending on the restriction policy you select."
            }, {
                type: "step",
                title: "To specify the content to access",
                content: [
                    "Toggle On Content Restriction.",
                    "Select the Restriction Policy according to the needs:<br>A. If you want the controlled devices to have access to all websites except certain ones, select Blacklist.<br>B. If you want the controlled devices to only have access to certain websites, select Whitelist.",
                    "Click Add a New Keyword to add a web address keyword (for example, wikipedia) or domain name to the Blacklist or to the Whitelist.",
                    "Click Save."
                ]
            }]
        },
        wlGuestDulBandBasic: {
            TITLE: "Guest Network",
            CONTENT: [{
                type: "paragraph",
                content: "This function allows you to provide Wi-Fi access for guests without disclosing the main network."
            }, {
                type: "name",
                title: "Allow Guests to Access Each Other",
                content: "Select this checkbox to allow the wireless devices on the Guest Network to communicate with each other via methods such as network neighbors, Samba, Ping, and FTP."
            }, {
                type: "name",
                title: "Allow Guests to Access My Local Network",
                content: "Select this checkbox to allow the wireless devices on the Guest Network to communicate with the devices connected to the router's LAN ports or main network via methods such as network neighbors, Samba, Ping, and FTP."
            }, {
				display: INCLUDE_USB_STORAGE,
                type: "name",
                title: "Allow Guests to Access My USB Storage Sharing",
                content: "Select this checkbox to allow wireless devices on the Guest Network to access the shared contents on your USB storage device."
            }, {
                type: "name",
                title: "Enable Guest Network",
                content: "Select this checkbox to enable the Guest Network feature."
            }, {
                type: "name",
                title: "Network Name (SSID)",
                content: "Either use the default Guest SSID or create a new name (up to 32 characters)."
            }, {
                type: "name",
                title: "Hide SSID",
                content: "Select this checkbox if you want to hide the Guest SSID from the Wi-Fi network list."
            }, {
                type: "name",
                title: "Security",
                content: "Select a security option for the Guest Network:",
                children: [{
                    type: "name",
                    title: "No Security",
                    content: "By default, the Guest Network security is set to No Security; anyone can access."
                }, {
                    type: "name",
                    title: "Set Password",
                    content: "Create a password for the Guest Network between 8 and 63 ASCII characters or between 8 and 64 hexadecimal characters (0-9, a-f, A-F)."
                }]
            }]
        },
        networkMap: {
            TITLE: "Network Map",
            CONTENT: [{
                type: "paragraph",
                content: "In Network Map, you can view the current network connection status and wireless information of the router and the information of connected devices."
            }, {
                type: "title",
                title: "Internet"
            }, {
                type: "paragraph",
                content: "Displays the Internet information."
            }, {
                type: "title",
                title: "Router"
            }, {
                type: "paragraph",
                content: "Displays the current network information of the wireless networks and the LAN ports."
            }, {
                type: "title",
                title: "Wired/Wireless Clients"
            }, {
                type: "paragraph",
                content: "Displays the network name (editable), assigned IP address and MAC address of the connected clients of the router."
            }, {
                display: INCLUDE_VOIP,
                type: "title",
                title: "Phone"
            }, {
				display: INCLUDE_VOIP,
                type: "paragraph",
                content: "Displays the device name and phone numbers that are in use."
            }, {
                display: INCLUDE_VOIP,
                type: "name",
                title: "Number for Incoming Calls",
                content: "Displays the numbers used by your telephony devices to receive incoming calls through your router. "
            }, {
                display: INCLUDE_VOIP,
                type: "name",
                title: "Internal Number",
                content: "Displays phone numbers that are used to make calls between telephony devices connected to the same router. It is preset and could not be changed."
            }, {
                display: INCLUDE_VOIP,
                type: "name",
                title: "Number for Outgoing Calls",
                content: "Displays the numbers used by your telephony devices to make outgoing calls through your router. The default is Auto, which means the router will select an available number to be the outgoing number which can be changed on the VoIP page."
            }, {
                display: INCLUDE_USB_OVER_IP,
                type: "title",
                title: "Printer"
            }, {
				display: INCLUDE_USB_OVER_IP,
                type: "paragraph",
                content: "Displays the name of the printer connected to the router via USB port."
            }, {
                display: INCLUDE_USB_STORAGE,
                type: "title",
                title: "USB Disk"
            }, {
				display: INCLUDE_USB_STORAGE,
                type: "paragraph",
                content: "Displays relevant information of USB disk connected to the router via USB port."
            }]
        },
        wirelessBasic: {
            TITLE: "Wireless Settings",
            CONTENT: [{
                type: "paragraph",
                content: "You can configure the wireless settings (SSID, password, etc.) on this page."
            }, {
                type: "name",
                title: "2.4GHz Wireless Network",
                content: "Select this checkbox to enable the 2.4GHz wireless radio frequency."
            }, {
                type: "name",
                title: "Network Name (SSID)",
                content: "You are recommended to change the network name (SSID). This field is case-sensitive."
            }, {
                type: "name",
                title: "Hide SSID",
                content: "Select if you want to hide the 2.4GHz network name (SSID) from the wireless network list. Once selected, the SSID will not be broadcast and you need to manually join the network."
            }, {
                type: "name",
                title: "Password",
                content: "Enter a wireless password between 8 and 63 ASCII characters, or between 8 and 64 hexadecimal characters. This field is case-sensitive."
            }]
        },
        status: {
            TITLE: "Status",
            CONTENT: [{
                type: "paragraph",
                content: "Displays relevant information about the Device."
            },{
				display: "$.sysMode != 'AP'",
                type: "title",
                title: "Internet"
            },{
				display: "$.sysMode != 'AP'",
                type: "paragraph",
                content: "Displays relevant information about the Internet connection."
            }, {
				display: "$.sysMode != 'AP'",
                type: "title2",
                content: "IPv4 | IPv6"
            }, {
				display: "$.sysMode != 'AP'",
                type: "paragraph",
                content: "Select either IPv4 or IPv6 to display the corresponding parameters."
            },{
				display: "$.sysMode == 'AP' && $.apModeType == '3'",
                type: "title",
                title: "Host Network"
            }, {
				display: "$.sysMode == 'AP' && $.apModeType == '3'",
                type: "paragraph",
                content: "Displays relevant information about the host network."
            },	{
                type: "title",
                title: "2.4GHz Wireless"
            }, {
                type: "paragraph",
                content: "Displays relevant information about the wireless network."
            }, {
                type: "title",
                title: "LAN"
            }, {
                type: "paragraph",
                content: "Displays information about the Ethernet (LAN) ports."
            }, {
				display: "$.sysMode != 'AP'",
                type: "title",
                title: "2.4GHz Guest Network"
            }, {
                type: "paragraph",
                content: "Displays information about the wireless networks for guests."
            }, {
                display: "$.sysMode == 'DSL'",
                type: "title",
                title: "DSL"
            }, {
                display: "$.sysMode == 'DSL'",
                type: "paragraph",
                content: "Displays information about the DSL connection."
            }]
        },
        time: {
            TITLE: "Time Settings",
            CONTENT: [{
                type: "paragraph",
                content: "Time Settings allows you to configure the system time and Daylight Saving Time for the router. Once the system time is modified, it will be applied to time-based functions and configurations such as Parental Controls."
            }, {
                type: "title",
                content: "System Time"
            }, {
                type: "paragraph",
                content: "Selected by default, Get from the Internet allows you to get the system time from the Internet."
            }, {
                type: "step",
                title: "To get time from the Internet",
                content: [
                    "Select the local Time Zone from the drop-down menu.",
                    "In the NTP Server I field, enter the IP address or domain name of the desired NTP Server.",
                    "In the NTP Server II field, enter the IP address or domain name of the second NTP Server. (Optional)",
                    "Click Get from the Internet.",
                    "Click Save."
                ]
            }, {
                type: "paragraph",
                content: "Get from PC allows you to get the system time from the PC. Please confirm the PC time before configuration."
            }, {
                type: "step",
                title: "To get time from PC",
                content: [
                    "Select Get from PC and Click Save."
                ]
            }, {
                type: "paragraph",
                content: "If the device cannot automatically obtain time from the Internet or PC, you can manually configure the system time."
            }, {
                type: "step",
                title: "To manually set time",
                content: [
                    "Enter your local date in MM/DD/YY into the Date field.",
                    "Choose your local time from the drop-down list (In 24-hour clock format, e.g. 16:00:00 is 04:00PM).",
                    "Click Save."
                ]
            }, {
                type: "title",
                content: "Daylight Saving Time"
            }, {
                type: "paragraph",
                content: "This feature can automatically synchronize the system time with daylight saving time."
            }, {
                type: "step",
                title: "To set up Daylight Saving Time",
                content: [
                    "Select Enable Daylight Saving Time.",
                    "Specify a time period of the daylight saving time in the local time zone.",
                    "Click Save."
                ]
            }]
        },
        pushService: {
            TITLE: "Push Service",
            CONTENT: [{
                type: "paragraph",
                content: "With this feature, you can have e-mail sent to you informing you of the latest events that you are interested in, such as missed calls or voice mails."
            }, {
                type: "step",
                title: "To configure Push Service",
                content: [
                    "Toggle On <b>Push Notification via E-mail.</b>",
                    "Select the event(s) you want to be informed of, Missed Calls or/and Voice Mails, and click Save. ", {
                        type: "paragraph",
                        content: "Configure the Sender Account Settings:",
                        children: [{
                            type: "paragraph",
                            content: "E-mail Address - Specify the e-mail address from which the push notification is sent."
                        }, {
                            type: "paragraph",
                            content: "Username - Enter the username of the e-mail account, usually the same as the e-mail address."
                        }, {
                            type: "paragraph",
                            content: "E-mail Password - Enter the e-mail password for authentication."
                        }, {
                            type: "paragraph",
                            content: "SMTP Server Address - Enter the SMTP server address of your e-mail account. Consult your e-mail service provider if you are not sure about the SMTP settings."
                        }, {
                            type: "paragraph",
                            content: "SMTP Server Port - Enter the port number of the SMTP server. By default, SMTP uses port 25 which also supports STARTTLS, a command to encrypt connections. If you want to secure the communication between the sender and the receiver, use SMTP connections secured by SSL/TLS, default to port 465; or use SMTP connections secured by STARTTLS, default to port 587."
                        }, {
                            type: "paragraph",
                            content: "SSL - Enable this feature if the SMTP server requires a secure connection."
                        }, {
                            type: "paragraph",
                            content: "STARTTLS - This feature upgrades an existing insecure connection to a secure connection using SSL/TLS. Make sure the SMTP server supports STARTTLS before enabling this feature, or Push Service will not work."
                        }, {
                            type: "paragraph",
                            content: "Test - Click to test the connection to the SMTP server. If the test fails, you should double-check your sender account settings."
                        }]
                    },
                    "Enter the receiver e-mail address. It can be the same as the sender e-mail address. If more than one e-mail address is entered, separate them with semicolons, for example, amy@tp-link.com;tom@tp-link.com.",
                    "Click Save."
                ]
            }]
        },
        diagnostic: {
            TITLE: "Diagnostic",
            CONTENT: [{
                type: "paragraph",
                content: "The Diagnostics feature helps you run diagnostic test and troubleshoot your network connectivity problems."
            }, {
                type: "name",
                title: "Start",
                content: "Click to run the diagnostication."
            }]
        },
        softup: {
            TITLE: "Firmware Upgrade",
            CONTENT: [{
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "Firmware Upgrade updates the router's firmware with new features or bug fixes. It's recommended to upgrade the router with the latest firmware file to have the best performance."
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "<b>Noticing the following will help you avoid upgrade failure:</b>"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "step",
                title: "Before upgrading:",
                content: [
                    "Make sure that you have a stable connection between the router and the computer. It's NOT recommended to upgrade the firmware wirelessly.",
                    "Make sure that you have removed all USB devices connected to the router.",
                    "Remember to back up the router's configuration file."
                ]
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "step",
                title: "While upgrading:",
                content: []
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "Keep the router POWERED ON until the upgrade completes."
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "title",
                content: "To upgrade the firmware online"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "Click Upgrade and click Yes when prompted, then the router will automatically download the latest firmware file and upgrade."
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "title",
                content: "To upgrade the firmware manually"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "step",
                title: "",
                content: [
                    "Click Support at the bottom of the page and download the latest firmware to the computer. Please make sure that the firmware file you are going to download matches with the router's hardware version as shown on the page.",
                    "Click Browse and select the downloaded firmware file.",
                    "Click Upgrade."
                ]
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "The firmware upgrade takes a few minutes to complete. The router will automatically reboot when the firmware upgrade is finished."
            }, {
                display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "paragraph",
                content: "Before upgrading the firmware of the router, you will need to download the latest firmware update from the <a href='http://www.tp-link.com/en/download-center.html'>TP-Link Download Center page</a> to your computer."
            }, {
                display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "step",
                title: "<B>IMPORTANT:</B> To prevent upgrade failure, please note the following:",
                content: [
                    "Make sure the latest firmware file is matched with the hardware version (as shown under the <b>Firmware Upgrade</b> page). ",
                    "Make sure that you have a stable connection between the router and your computer. It is <b>NOT</b> recommended to upgrade the firmware wirelessly.",
                    "Make sure you have remove all the USB storage devices connected to the router before the firmware upgrade to prevent data loss.",
                    "Back up your router configuration.",
                    "Do not turn off the Router during the firmware upgrade."
                ]
            }, {
                display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "step",
                title: "To upgrade the router’s firmware",
                content: [
                    "Click <b>Browse</b>.",
                    "Locate and select the downloaded firmware file.",
                    "Click <b>Upgrade</b>."
                ]
            }]
        },
        backNRestore: {
            TITLE: "Backup & Restore",
            CONTENT: [{
                type: "paragraph",
                content: "The Backup & Restore feature allows you to back up the router's current configuration for recovery, or simply restore the router to default settings."
            }, {
                type: "paragraph",
                content: "<strong>Note:</strong><br>Please do NOT power off the router during the backup or restore process."
            }, {
                type: "title",
                content: "Backup"
            }, {
                type: "paragraph",
                content: "It's highly recommended to back up the current configuration, in case a recovery is needed to restore the router to its previous state."
            }, {
                type: "step",
                title: "To backup current configuration",
                content: [
                    "Click Backup.",
                    "Wait for the router to back up the current configuration."
                ]
            }, {
                type: "title",
                content: "Restore"
            }, {
                type: "paragraph",
                content: "You can restore the router to a previous status from a backup file."
            }, {
                type: "step",
                title: "To restore from a backup",
                content: [
                    "Click Browse.",
                    "Locate and select the backup file.",
                    "Click Restore."
                ]
            }, {
                type: "title",
                content: "Factory Default Restore"
            }, {
                type: "paragraph",
                content: "Factory Default Restore will erase all settings that you have configured for the router and restore it to factory default settings.,To re-login to the router's management page, use the default admin for both username and password."
            }]
        },
        manageCtrl: {
            TITLE: "Administration",
            CONTENT: [{
                type: "paragraph",
                content: "Administration allows you to manage the login password and the access permission of the connected clients to the router."
            }, {
                type: "title",
                content: "Account Management"
            }, {
                type: "paragraph",
                content: "This feature allows you to change your login password."
            }, {
                type: "step",
                title: "To change the password",
                content: [
                    "Enter Old Password.",
                    "Enter New Password.",
                    "Confirm New Password.",
                    "Click Save."
                ]
            }, {
                type: "title",
                content: "Local Management"
            }, {
                type: "paragraph",
                content: "This feature allows local devices to access and manage the router. By default, all local devices can access and manage the router via HTTP."
            }, {
                type: "step",
                title: "To change the local management settings",
                content: [
                    "Enable Local Management via HTTPS if you want to access the router via both HTTPS and HTTP, or keep it disabled if you only want to access the router via HTTP.",
                    "Keep the Port for HTTP and Port for HTTPS as the default settings.",
                    "If you only want to allow one specific device to manage the router, enter the IP Address or MAC Address of the device in the IP/MAC Address field.",
                    "Click Save.",
                    "Now you can manage the router via HTTP (http://"+TPLINK_LOGIN_DOMAIN+") or/and HTTPS (https://"+TPLINK_LOGIN_DOMAIN+")."
                ]
            }, {
                type: "paragraph",
                content: "Note: If a warning pops up when you visit https://"+TPLINK_LOGIN_DOMAIN+", click Trust (or a similar option) to continue."
            }, {
                type: "title",
                content: "Remote Management"
            }, {
                type: "paragraph",
                content: "The Remote Management feature allows remote devices to access and manage the router. By default, all remote devices cannot access and manage the router."
            }, {
                type: "step",
                title: "To set up Remote Management",
                content: [
                    "Enable Remote Management if you want to allow Remote Management via HTTPS, or enable Remote Management and then disable Remote Management via HTTPS if you want to allow Remote Management via HTTP.",
                    "Keep the Port as the default setting.", {
                        type: "paragraph",
                        content: "Select to decide which remote device can access the router remotely:",
                        children: [{
                            type: "name",
                            title: "Only the Following IP/MAC Address",
                            content: "Enter the IP Address or MAC Address of the remote device to access the router."
                        }, {
                            type: "name",
                            title: "All",
                            content: "All remote devices can access the router."
                        }]
                    },
                    "Click Save.",
                    "Now you can remotely manage the router via the address displayed under Manage This Router via the Address."
                ]
            }, {
                type: "paragraph",
                content: "Note: If a warning pops up when you visit the above address remotely, click Trust (or a similar option) to continue."
            }, {
                type: "title",
                content: "Certificate"
            }, {
                type: "paragraph",
                content: "A file that provides you with authentication information. Download and install the certificate for Local/Remote Management via HTTPS if you need it. Once the certificate is installed, warnings will not pop up when you access the router via HTTPS."
            }, {
                type: "paragraph",
                content: "Note: For the comprehensive guide, please refer to the User Guide on the product's support page."
            }, {
                type: "title",
                content: "ICMP Ping"
            }, {
                type: "paragraph",
                content: " ICMP (Internet Control Message Protocol) Ping is used to diagnose the network by sending ICMP echo request packets to the target remote or local host and waiting for an ICMP response."
            }, {
                type: "name",
                title: "Remote",
                content: "Select if you want the computers on a public network to ping the router's WAN IP address."
            }, {
                type: "name",
                title: "Local",
                content: "Select if you want the computers on a private network to ping the router's LAN IP address."
            }]
        },
        log: {
            TITLE: "System Log",
            CONTENT: [{
                type: "paragraph",
                content: "The System Log displays the most recent activities of the router. The table consists of the type, level and log content of the system logs which can be filtered to be viewed. You can also save the system logs to the local computer or send them to a remote server."
            }, {
                type: "step",
                title: "To save system logs to the local computer",
                content: [
                    "Set the Type and minimum level to filter the desired system logs. The Level list is in descending order, with the lowest level listed last.",
                    "Click Save Log to save the system logs file to the local computer."
                ]
            }]
        },
        logConf: {
            TITLE: "Log Settings",
            CONTENT: [{
                type: "paragraph",
                content: "This feature allows you to cache the system logs to the router’s local memory or send the system logs to a remote server."
            }, {
                type: "step",
                title: "To cache the system logs to the router’s local memory",
                content: [
                    "Select Save Locally.",
                    "Select the minimum level of system logs to be saved from the drop-down list. The list is in descending order, with the lowest level listed last.",
                    "Click Save."
                ]
            }, {
                type: "step",
                title: "To send the system log to a remote server",
                content: [
                    "Select Save Remotely. If the remote server has a log viewer client or a sniffer tool implemented, you can view and analyze the system log remotely in real-time.",
                    "Select the minimum level of system logs to be saved from the drop-down list. The list is in descending order, with the lowest level listed last.",
                    "Specify the IP address of the remote system log server in the Server IP field.",
                    "Specify the port number of the remote system log server in the Server Port field.",
                    "Select the local facility name of the remote server from the drop-down list.",
                    "Click Save."
                ]
            }]
        },
        cwmp: {
            TITLE: "CWMP Settings",
            CONTENT: [{
                type: "paragraph",
                content: "CWMP (CPE WAN Management Protocol, also called TR-069) allows Auto-Configuration Server (ACS) to perform auto-configuration, provision, connection, and diagnostics to this device. You may configure this function under your ISP's instructions."
            }, {
                type: "name",
                title: "CWMP",
                content: "Toggle On to enable the CWMP (CPE WAN Management Protocol) feature."
            }, {
                type: "name",
                title: "Inform",
                content: "Enable this feature to send an Inform message to the ACS (Auto Configuration Server) periodically."
            }, {
                type: "name",
                title: "Inform Interval",
                content: "Enter the time in seconds when the Inform message will be sent to the ACS."
            }, {
                type: "name",
                title: "ACS URL",
                content: "Enter the web address of the ACS which is provided by your ISP."
            }, {
                type: "name",
                title: "ACS Username/Password",
                content: "Enter the username and password to log in to the ACS server."
            }, {
                type: "name",
                title: "Interface used by TR-069 client",
                content: "Select which interface to be used by the TR-069 client."
            }, {
                type: "name",
                title: "Display SOAP messages on serial console",
                content: "Toggle to enable or disable this feature."
            }, {
                type: "name",
                title: "Connection Request Authentication",
                content: "Select this checkbox to enable authentication for the connection request.",
                children: [{
                    type: "name",
                    title: "Username/Password",
                    content: "Enter the username and password for the ACS server to log in the router."
                }, {
                    type: "name",
                    title: "Path/Port/URL",
                    content: "Enter the path, port and URL that connects to the ACS server."
                }]
            }, {
                type: "name",
                title: "Get RPC methods",
                content: "Click to get the methods to support CWMP."
            }]
        },
        snmp: {
            TITLE: "SNMP Settings",
            CONTENT: [{
                type: "paragraph",
                content: "SNMP (Simple Network Management Protocol) allows management applications to retrieve status updates and statistics from the SNMP agent within this device."
            }, {
                type: "name",
                title: "SNMP Agent/SNMP Agent for WAN",
                content: "Toggle On to enable the built-in SNMP agent that allows the router to operate as the operational role in receiving and processing of SNMP messages, sending responses to the SNMP manager, and triggering SNMP traps when an event occurs."
            }, {
                type: "name",
                title: "Read-only Community",
                content: "Displays the default public community string that protects the router from unauthorized access."
            }, {
                type: "name",
                title: "Write Community",
                content: "Displays the default read and write community string that protects the router from unauthorized changes."
            }, {
                type: "name",
                title: "System Name",
                content: "Displays the administratively-assigned name for this managed device."
            }, {
                type: "name",
                title: "System Description",
                content: "Displays the textual description of the managed device.  This value should include the full name and version identification of the system's hardware type, software operating-system, and networking software."
            }, {
                type: "name",
                title: "System Location",
                content: "Displays the physical location of this device (e.g. telephone closet, 3rd floor).  "
            }, {
                type: "name",
                title: "System Contact",
                content: "Displays the textual identification of the contact person for this managed device, together with information on how to contact this person."
            }, {
                type: "name",
                title: "Trap Manager IP",
                content: "Displays the IP address of the host to receive the traps."
            }]
        },
        stat: {
            TITLE: "Traffic Monitor",
            CONTENT: [{
                type: "paragraph",
                content: "Displays the traffic usage of a device in the past 10 minutes or that of all devices in the past 10 minutes/24 hours/7 days."
            }, {
                type: "title",
                content: "Traffic Monitor List"
            }, {
                type: "paragraph",
                content: "The list is grouped by the connection type of devices: wired or wireless."
            }]
        },
        sysMode: {
            TITLE: "Operation Mode",
            CONTENT: [{
                type: "paragraph",
                content: "Select the router's operation mode according to your network environment."
            }, {
				display: INCLUDE_VDSLWAN,
                type: "name",
                title: "DSL Modem Router Mode",
                content: INCLUDE_LAN_WLAN_DUALBAND == 1 ?"Enables multi-users to share Internet via xDSL using its xDSL port and share it wirelessly over the crystal clear  band and the 2.4GHz band.":"Enables multi-users to share Internet via xDSL using its xDSL port and share it wirelessly over the crystal clear 2.4GHz band."
            }, {
                display: INCLUDE_USB_3G_DONGLE,
                type: "name",
                title: "3G/4G Router Mode",
                content: "Enables multi-users to share a 3G or 4G Internet connection using a compatible SIM card."
            }, {
                display: INCLUDE_EWAN_BACKUP,
                type: "name",
                title: "3G/4G Router Mode With Ewan Backup",
                content: "Enables multi-users to share a 3G or 4G Internet connection using a compatible SIM card. It will try to share Internet via Ethernet WAN (EWAN) when 3G or 4G Internet is unavailable"
            }, {
                type: "name",
                title: "Wireless Router Mode",
                content: INCLUDE_LAN_WLAN_DUALBAND == 1 ?"Enables multi-users to share Internet via Ethernet WAN (EWAN) using its interchangeable WAN port and share it wirelessly over the crystal clear  band and the 2.4GHz band.":"Enables multi-users to share Internet via Ethernet WAN (EWAN) using its interchangeable WAN port and share it wirelessly over the crystal clear 2.4GHz band."
            },{
				display: INCLUDE_USB_3G_BACKUP,
                type: "name",
                title: "Wireless Router Mode With 3G/4G Backup",
                content: INCLUDE_LAN_WLAN_DUALBAND == 1 ?"Enables multi-users to share Internet via Ethernet WAN (EWAN) using its interchangeable WAN port and share it wirelessly over the crystal clear  band and the 2.4GHz band. It will try to share 3G or 4G Internet when EWAN is disconnected":"Enables multi-users to share Internet via Ethernet WAN (EWAN) using its interchangeable WAN port and share it wirelessly over the crystal clear 2.4GHz band. It will try to share 3G or 4G Internet when EWAN is disconnected"
            }]
        },
		wispWan: {
            TITLE: "Internet Setup",
            CONTENT: [{
                type: "paragraph",
                content: "You can set up an Internet connection and modify settings in the existing connection on this page."
            }, {
                type: "paragraph",
                content: "<br><br>Select the Internet Connection Type and enter the corresponding parameters."
            }, {
                type: "title",
                content: "Internet Connection Type: Dynamic IP"
            }, {
                type: "paragraph",
                content: "Select this type if you are provided with a DHCP server connection by the ISP."
            }, {
                type: "name",
                title: "IPv4",
                content: "Select the checkbox to enable IPv4."
            }, {
                type: "name",
                title: "IP Address/Subnet Mask/Default Gateway",
                content: "These parameters are automatically assigned by the DHCP server from the ISP."
            }, {
                type: "name",
                title: "Renew",
                content: "Click to get new IP parameters from the DHCP server."
            }, {
                type: "name",
                title: "Release",
                content: "Click to release all IP addresses assigned by the DHCP server."
            }, {
                type: "name",
                title: "IPv6",
                content: "IPv6 (Internet Protocol version 6) is the most recent version of the IP (Internet Protocol) and deals with the problem of IPv4 (Internet Protocol version 4) address exhaustion. If your ISP provides you with IPv6 service, select the checkbox to enable this feature."
            }, {
                type: "name",
                title: "IPv6 Address/Prefix Length/IPv6 Default Gateway",
                content: "These parameters are automatically assigned by the DHCPv6 server from the ISP."
            }, {
                type: "name",
                title: "Addressing Type",
                content: "Select an addressing type to decide how to get an IPv6 address. Select DHCPv6 to get a non-temporary IPv6 address or SLAAC to get an IPv6 address generated from the router advertisement packet according to the ISP."
            }, {
                type: "paragraph",
                content: "Click <b>Advanced</b> to view more advanced settings."
            }, {
                type: "name",
                title: "Advanced",
                children: [{
                    type: "name",
                    title: "MTU Size",
                    content: "The default and typical MTU (Maximum Transmission Unit) size for most Ethernet networks is <b>1500 Bytes</b>. It is not recommended to change the default MTU size unless required by the ISP."
                }, {
                    type: "name",
                    title: "NAT",
                    content: "This feature is enabled by default. It's recommended to keep the default setting. If you disable it, you may have no access to the Internet."
                }, {
                    type: "name",
                    title: "Full-cone NAT",
                    content: "It is a type of NAT. If Full-cone NAT is not enabled, the default NAT function will be used."
                }, {
                    type: "name",
                    title: "IGMP Proxy",
                    content: "IGMP (Internet Group Management Protocol) is used to manage multicasting on TCP/IP networks. Some ISPs use IGMP to perform remote configuration on a router. It is enabled by default."
                }, {
                    type: "name",
                    title: "Get IP Using Unicast DHCP",
                    content: "Select this checkbox if your ISP’s DHCP server does not support broadcast applications and you cannot get the IP address dynamically."
                }, {
                    type: "name",
                    title: "Use the Following DNS Address",
                    content: "If the ISP provides the specific (fixed) DNS IP addresses, enable Use the Following DNS Addresses and enter the address(es) into the Primary DNS and Secondary DNS fields respectively. Otherwise disable this feature to obtain the server-assigned DNS IP address(es) automatically."
                }, {
                    type: "name",
                    title: "Use the Following IPv6 DNS Address",
                    content: "If the ISP provides the specific (fixed) DNS IP addresses, enable Use the Following IPv6 DNS Addresses and enter the address(es) into the Primary DNS and Secondary DNS fields respectively. Otherwise disable this feature to obtain the server-assigned DNS IP address(es) automatically."
                }, {
                    type: "name",
                    title: "Host Name",
                    content: "Enter a value into this field to specify the host name of the router."
                }]
            }, {
                type: "title",
                content: "Internet Connection Type: Static IP"
            }, {
                type: "paragraph",
                content: "Select this type if you are provided with a specific (fixed) IP address, subnet mask, default gateway, and DNS parameters by your ISP."
            }, {
                type: "name",
                title: "IPv4",
                content: "Select the checkbox to enable IPv4."
            }, {
                type: "name",
                title: "IP Address/Subnet Mask/Default Gateway/Primary DNS/Secondary DNS",
                content: "Enter the information provided by your ISP."
            }, {
                type: "name",
                title: "IPv6",
                content: "IPv6 (Internet Protocol version 6) is the most recent version of the IP (Internet Protocol) and deals with the problem of IPv4 (Internet Protocol version 4) address exhaustion. If your ISP provides you with IPv6 service, select the checkbox to enable this feature."
            }, {
                type: "name",
                title: "IPv6 Address/Prefix Length/IPv6 Default Gateway/Primary DNS/Secondary DNS",
                content: "Enter the information provided by your ISP."
            }, {
                type: "paragraph",
                content: "Click <b>Advanced</b> to view more advanced settings."
            }, {
                type: "name",
                title: "Advanced",
                children: [{
                    type: "name",
                    title: "MTU Size",
                    content: "The default and typical MTU (Maximum Transmission Unit) size for most Ethernet networks is <b>1500 Bytes</b>. It is not recommended to change the default MTU size unless required by the ISP."
                }, {
                    type: "name",
                    title: "NAT",
                    content: "This feature is enabled by default. It's recommended to keep the default setting. If you disable it, you may have no access to the Internet."
                }, {
                    type: "name",
                    title: "Full-cone NAT",
                    content: "It is a type of NAT. If Full-cone NAT is not enabled, the default NAT function will be used."
                }, {
                    type: "name",
                    title: "IGMP Proxy",
                    content: "IGMP (Internet Group Management Protocol) is used to manage multicasting on TCP/IP networks. Some ISPs use IGMP to perform remote configuration on a router. It is enabled by default."
                }]
            }, {
                type: "title",
                content: "Internet Connection Type: PPPoE"
            }, {
                type: "paragraph",
                content: "Select this type if you use DSL (Digital Subscriber Line) service and are provided with a username and password by the ISP."
            }, {
                type: "name",
                title: "Username/Password/Confirm Password",
                content: "Enter the username and password provided by the ISP. These fields are case-sensitive."
            }, {
                type: "name",
                title: "Connection Mode",
                content: "Select an appropriate connection mode that determines how to connect to the Internet.",
                children: [{
                    type: "name",
                    title: "Auto",
                    content: "In this mode, the Internet connection reconnects automatically any time it gets disconnected."
                }, {
                    type: "name",
                    title: "On Demand",
                    content: "In this mode, the Internet connection will be terminated automatically after a specified time of inactivity (Max Idle Time) has elapsed. The connection is re-established when you attempt to access the Internet again."
                }, {
                    type: "name",
                    title: "Manually",
                    content: "In this mode, the Internet connection is controlled manually by clicking the Connect or Disconnect button in the table. This mode also supports the Max Idle Time function. Enter a maximum time (in minutes) the Internet connection can be inactive before it is terminated into the Max Idle Time field. The default value is 15 minutes. If you want the Internet connection to remain active at all time, enter 0 (zero)."
                }]
            }, {
                type: "name",
                title: "Authentication Type",
                content: "Select an authentication type. The default is Auto. Some ISPs require a specific authentication type, please confirm it with the ISP or keep the default settings.",
                children: [{
                    type: "name",
                    title: "Auto",
                    content: "If Auto (default), the router automatically determines the authentication type used by the ISP."
                }, {
                    type: "name",
                    title: "PAP",
                    content: "If PAP (Password Authentication Protocol), the router authenticates with the peer using two handshakes. Select this option if the ISP requires this authentication type."
                }, {
                    type: "name",
                    title: "CHAP",
                    content: "If CHAP (Challenge Handshake Authentication Protocol), the router authenticates with the peer using three handshakes and validates the peer's identify periodically. Select this option if the ISP requires this authentication type."
                }, {
                    type: "name",
                    title: "MS-CHAP",
                    content: "If MS-CHAP (Microsoft-Challenge Handshake Authentication Protocol), the router authenticates with the peer by piggybacking a peer challenge on the Response packet and an authenticator response on the Success packet. Select this option if the ISP requires this authentication type."
                }]
            }, {
                type: "name",
                title: "IPv4",
                content: "Select the checkbox to enable IPv4."
            }, {
                type: "name",
                title: "IPv6",
                content: "IPv6 (Internet Protocol version 6) is the most recent version of the IP (Internet Protocol) and deals with the problem of IPv4 (Internet Protocol version 4) address exhaustion. If your ISP provides you with IPv6 service, select the checkbox to enable this feature."
            }, {
                type: "name",
                title: "Addressing Type",
                content: "Select an addressing type to decide how to get an IPv6 address. Select DHCPv6 to get a non-temporary IPv6 address or SLAAC to get an IPv6 address generated from the router advertisement packet according to the ISP."
            }, {
                type: "paragraph",
                content: "Click <b>Advanced</b> to view more advanced settings."
            }, {
                type: "name",
                title: "Advanced",
                children: [{
                    type: "name",
                    title: "Service Name/Access Concentrator Name",
                    content: "By default, the Service Name and Access Concentrator (AC) Name are left blank. These fields should not be configured unless required by the ISP."
                }, {
                    type: "name",
                    title: "MTU Size",
                    content: "The typical MTU (Maximum Transmission Unit) size for Ethernet networks is 1480 Bytes.",
                    children: [{
                        type: "paragraph",
                        content: "<b>Note</b>: In a rare case, your ISP may require you to adjust the MTU size for better network performance. You should not change the value unless it is absolutely necessary."
                    }]
                }, {
                    type: "name",
                    title: "NAT",
                    content: "This feature is enabled by default. It's recommended to keep the default setting. If you disable it, you may have no access to the Internet."
                }, {
                    type: "name",
                    title: "Full-cone NAT",
                    content: "It is a type of NAT. If Full-cone NAT is not enabled, the default NAT function will be used."
                }, {
                    type: "name",
                    title: "IGMP Proxy",
                    content: "IGMP (Internet Group Management Protocol) is used to manage multicasting on TCP/IP networks. Some ISPs use IGMP to perform remote configuration on a router. It is enabled by default."
                }, {
                    type: "name",
                    title: "Use the IP Specified by ISP",
                    content: "If the ISP provides the specific (fixed) IP addresses, enable Use the IP Specified by ISP and enter the address into the ISP Specified IP Address field."
                }, {
                    type: "name",
                    title: "Echo Request Interval",
                    content: "Enter a time interval value between 0 and 120 (in seconds) for which the router requests Access Concentrator to echo at every interval. The default value is 30. 0 means no detection."
                }, {
                    type: "name",
                    title: "Use the Following DNS Addresses",
                    content: "If the ISP provides the specific (fixed) DNS IP addresses, enable Use the Following DNS Addresses and enter the address(es) into the Primary DNS and Secondary DNS fields respectively. Otherwise disable this feature to obtain the server-assigned DNS IP address(es) automatically."
                }, {
                    type: "name",
                    title: "Use the IPv6 Addresses Specified by ISP",
                    content: "If the ISP provides the specific (fixed) IPv6 addresses, enable Use the IPv6 Addresses Specified by ISP and enter the addresses into the ISP Specified IPv6 Address and ISP Specified IPv6 Gateway fields."
                }, {
                    type: "name",
                    title: "Use the Following IPv6 DNS Address:",
                    content: "If the ISP provides the specific (fixed) DNS IP addresses, enable Use the Following IPv6 DNS Addresses and enter the address(es) into the Primary DNS and Secondary DNS fields respectively. Otherwise disable this feature to obtain the server-assigned DNS IP address(es) automatically."
                }]
            }, {
                type: "title",
                content: "Internet Connection Type: L2TP"
            }, {
                type: "paragraph",
                content: "Select this type if you use L2TP service and are provided with a username and password by the ISP."
            }, {
                type: "name",
                title: "Username/Password",
                content: "Enter the username and password provided by the ISP. These fields are case-sensitive."
            }, {
                type: "name",
                title: "Addressing Type",
                content: "You can select Dynamic IP or Static IP. If you are not sure, select Dynamic IP."
            }, {
                type: "name",
                title: "Server IP Address/Name",
                content: "Enter server IP address or domain name provided by your ISP."
            }, {
                type: "name",
                title: "IP Address",
                content: "Enter the IP address used for dial-up. (Only can be configured when Static IP is selected)"
            }, {
                type: "name",
                title: "Subnet Mask",
                content: "Enter the subnet mask provided by your ISP. (Only can be configured when Static IP is selected)"
            }, {
                type: "name",
                title: "Gateway",
                content: "Enter gateway provided by your ISP. (Only can be configured when Static IP is selected)"
            }, {
                type: "name",
                title: "Primary DNS",
                content: "Enter DNS server provided by your ISP. (Only can be configured when Static IP is selected)"
            }, {
                type: "name",
                title: "IP Address",
                content: "The Internet IP address assigned by L2TP server."
            }, {
                type: "name",
                title: "Primary DNS",
                content: "The Internet DNS server address assigned by L2TP server."
            }, {
                type: "name",
                title: "MTU Size",
                content: "The default and typical MTU (Maximum Transmission Unit) size for most Ethernet networks is <b>1500 Bytes</b>. It is not recommended to change the default MTU size unless required by the ISP."
            }, {
                type: "name",
                title: "MTU Size",
                content: "The default and typical MTU (Maximum Transmission Unit) size for most Ethernet networks is <b>1500 Bytes</b>. It is not recommended to change the default MTU size unless required by the ISP."
            }, {
                type: "name",
                title: "Connection Mode",
                content: "Select an appropriate connection mode that determines how to connect to the Internet.",
                children: [{
                    type: "name",
                    title: "Auto",
                    content: "In this mode, the Internet connection reconnects automatically any time it gets disconnected."
                }, {
                    type: "name",
                    title: "On Demand",
                    content: "In this mode, the Internet connection will be terminated automatically after a specified time of inactivity (Max Idle Time) has elapsed. The connection is re-established when you attempt to access the Internet again."
                }, {
                    type: "name",
                    title: "Manually",
                    content: "In this mode, the Internet connection is controlled manually by clicking the Connect or Disconnect button in the table. This mode also supports the Max Idle Time function. Enter a maximum time (in minutes) the Internet connection can be inactive before it is terminated into the Max Idle Time field. The default value is 15 minutes. If you want the Internet connection to remain active at all time, enter 0 (zero)."
                }]
            }, {
                type: "title",
                content: "Internet Connection Type: PPTP"
            }, {
                type: "paragraph",
                content: "Select this type if you use PPTP service and are provided with a username and password by the ISP."
            }, {
                type: "name",
                title: "Username/Password",
                content: "Enter the username and password provided by the ISP. These fields are case-sensitive."
            }, {
                type: "name",
                title: "Addressing Type",
                content: "You can select Dynamic IP or Static IP. If you are not sure, select Dynamic IP."
            }, {
                type: "name",
                title: "Server IP Address/Name",
                content: "Enter server IP address or domain name provided by your ISP."
            }, {
                type: "name",
                title: "IP Address",
                content: "Enter the IP address used for dial-up. (Only can be configured when Static IP is selected)"
            }, {
                type: "name",
                title: "Subnet Mask",
                content: "Enter the subnet mask provided by your ISP. (Only can be configured when Static IP is selected)"
            }, {
                type: "name",
                title: "Gateway",
                content: "Enter gateway provided by your ISP. (Only can be configured when Static IP is selected)"
            }, {
                type: "name",
                title: "Primary DNS",
                content: "Enter DNS server provided by your ISP. (Only can be configured when Static IP is selected)"
            }, {
                type: "name",
                title: "IP Address",
                content: "The Internet IP address assigned by PPTP server."
            }, {
                type: "name",
                title: "Primary DNS",
                content: "The Internet DNS server address assigned by PPTP server."
            }, {
                type: "name",
                title: "MTU Size",
                content: "The default and typical MTU (Maximum Transmission Unit) size for most Ethernet networks is <b>1500 Bytes</b>. It is not recommended to change the default MTU size unless required by the ISP."
            }, {
                type: "name",
                title: "MTU Size",
                content: "The default and typical MTU (Maximum Transmission Unit) size for most Ethernet networks is <b>1500 Bytes</b>. It is not recommended to change the default MTU size unless required by the ISP."
            }, {
                type: "name",
                title: "Connection Mode",
                content: "Select an appropriate connection mode that determines how to connect to the Internet.",
                children: [{
                    type: "name",
                    title: "Auto",
                    content: "In this mode, the Internet connection reconnects automatically any time it gets disconnected."
                }, {
                    type: "name",
                    title: "On Demand",
                    content: "In this mode, the Internet connection will be terminated automatically after a specified time of inactivity (Max Idle Time) has elapsed. The connection is re-established when you attempt to access the Internet again."
                }, {
                    type: "name",
                    title: "Manually",
                    content: "In this mode, the Internet connection is controlled manually by clicking the Connect or Disconnect button in the table. This mode also supports the Max Idle Time function. Enter a maximum time (in minutes) the Internet connection can be inactive before it is terminated into the Max Idle Time field. The default value is 15 minutes. If you want the Internet connection to remain active at all time, enter 0 (zero)."
                }]
            }]
        },
		ethWan: {
            TITLE: "Internet Setup",
            CONTENT: [{
                type: "paragraph",
                content: "You can set up an Internet connection and modify settings in the existing connection on this page."
            }, {
                type: "paragraph",
                content: "<br><br>Select the Internet Connection Type and enter the corresponding parameters."
            }, {
                type: "title",
                content: "Internet Connection Type: Dynamic IP"
            }, {
                type: "paragraph",
                content: "Select this type if you are provided with a DHCP server connection by the ISP."
            }, {
                type: "name",
                title: "IPv4",
                content: "Select the checkbox to enable IPv4."
            }, {
                type: "name",
                title: "IP Address/Subnet Mask/Default Gateway",
                content: "These parameters are automatically assigned by the DHCP server from the ISP."
            }, {
                type: "name",
                title: "Renew",
                content: "Click to get new IP parameters from the DHCP server."
            }, {
                type: "name",
                title: "Release",
                content: "Click to release all IP addresses assigned by the DHCP server."
            }, {
                type: "name",
                title: "IPv6",
                content: "IPv6 (Internet Protocol version 6) is the most recent version of the IP (Internet Protocol) and deals with the problem of IPv4 (Internet Protocol version 4) address exhaustion. If your ISP provides you with IPv6 service, select the checkbox to enable this feature."
            }, {
                type: "name",
                title: "IPv6 Address/Prefix Length/IPv6 Default Gateway",
                content: "These parameters are automatically assigned by the DHCPv6 server from the ISP."
            }, {
                type: "name",
                title: "Addressing Type",
                content: "Select an addressing type to decide how to get an IPv6 address. Select DHCPv6 to get a non-temporary IPv6 address or SLAAC to get an IPv6 address generated from the router advertisement packet according to the ISP."
            }, {
                type: "paragraph",
                content: "Click <b>Advanced</b> to view more advanced settings."
            }, {
                type: "name",
                title: "Advanced",
                children: [{
                    type: "name",
                    title: "MTU Size",
                    content: "The default and typical MTU (Maximum Transmission Unit) size for most Ethernet networks is <b>1500 Bytes</b>. It is not recommended to change the default MTU size unless required by the ISP."
                }, {
                    type: "name",
                    title: "NAT",
                    content: "This feature is enabled by default. It's recommended to keep the default setting. If you disable it, you may have no access to the Internet."
                }, {
                    type: "name",
                    title: "Full-cone NAT",
                    content: "It is a type of NAT. If Full-cone NAT is not enabled, the default NAT function will be used."
                }, {
                    type: "name",
                    title: "IGMP Proxy",
                    content: "IGMP (Internet Group Management Protocol) is used to manage multicasting on TCP/IP networks. Some ISPs use IGMP to perform remote configuration on a router. It is enabled by default."
                }, {
                    type: "name",
                    title: "Get IP Using Unicast DHCP",
                    content: "Select this checkbox if your ISP’s DHCP server does not support broadcast applications and you cannot get the IP address dynamically."
                }, {
                    type: "name",
                    title: "Use the Following DNS Address",
                    content: "If the ISP provides the specific (fixed) DNS IP addresses, enable Use the Following DNS Addresses and enter the address(es) into the Primary DNS and Secondary DNS fields respectively. Otherwise disable this feature to obtain the server-assigned DNS IP address(es) automatically."
                }, {
                    type: "name",
                    title: "Use the Following IPv6 DNS Address",
                    content: "If the ISP provides the specific (fixed) DNS IP addresses, enable Use the Following IPv6 DNS Addresses and enter the address(es) into the Primary DNS and Secondary DNS fields respectively. Otherwise disable this feature to obtain the server-assigned DNS IP address(es) automatically."
                }, {
                    type: "name",
                    title: "Host Name",
                    content: "Enter a value into this field to specify the host name of the router."
                }]
            }, {
                type: "title",
                content: "Internet Connection Type: Static IP"
            }, {
                type: "paragraph",
                content: "Select this type if you are provided with a specific (fixed) IP address, subnet mask, default gateway, and DNS parameters by your ISP."
            }, {
                type: "name",
                title: "IPv4",
                content: "Select the checkbox to enable IPv4."
            }, {
                type: "name",
                title: "IP Address/Subnet Mask/Default Gateway/Primary DNS/Secondary DNS",
                content: "Enter the information provided by your ISP."
            }, {
                type: "name",
                title: "IPv6",
                content: "IPv6 (Internet Protocol version 6) is the most recent version of the IP (Internet Protocol) and deals with the problem of IPv4 (Internet Protocol version 4) address exhaustion. If your ISP provides you with IPv6 service, select the checkbox to enable this feature."
            }, {
                type: "name",
                title: "IPv6 Address/Prefix Length/IPv6 Default Gateway/Primary DNS/Secondary DNS",
                content: "Enter the information provided by your ISP."
            }, {
                type: "paragraph",
                content: "Click <b>Advanced</b> to view more advanced settings."
            }, {
                type: "name",
                title: "Advanced",
                children: [{
                    type: "name",
                    title: "MTU Size",
                    content: "The default and typical MTU (Maximum Transmission Unit) size for most Ethernet networks is <b>1500 Bytes</b>. It is not recommended to change the default MTU size unless required by the ISP."
                }, {
                    type: "name",
                    title: "NAT",
                    content: "This feature is enabled by default. It's recommended to keep the default setting. If you disable it, you may have no access to the Internet."
                }, {
                    type: "name",
                    title: "Full-cone NAT",
                    content: "It is a type of NAT. If Full-cone NAT is not enabled, the default NAT function will be used."
                }, {
                    type: "name",
                    title: "IGMP Proxy",
                    content: "IGMP (Internet Group Management Protocol) is used to manage multicasting on TCP/IP networks. Some ISPs use IGMP to perform remote configuration on a router. It is enabled by default."
                }]
            }, {
                type: "title",
                content: "Internet Connection Type: PPPoE"
            }, {
                type: "paragraph",
                content: "Select this type if you use DSL (Digital Subscriber Line) service and are provided with a username and password by the ISP."
            }, {
                type: "name",
                title: "Username/Password/Confirm Password",
                content: "Enter the username and password provided by the ISP. These fields are case-sensitive."
            }, {
                type: "name",
                title: "Connection Mode",
                content: "Select an appropriate connection mode that determines how to connect to the Internet.",
                children: [{
                    type: "name",
                    title: "Auto",
                    content: "In this mode, the Internet connection reconnects automatically any time it gets disconnected."
                }, {
                    type: "name",
                    title: "On Demand",
                    content: "In this mode, the Internet connection will be terminated automatically after a specified time of inactivity (Max Idle Time) has elapsed. The connection is re-established when you attempt to access the Internet again."
                }, {
                    type: "name",
                    title: "Manually",
                    content: "In this mode, the Internet connection is controlled manually by clicking the Connect or Disconnect button in the table. This mode also supports the Max Idle Time function. Enter a maximum time (in minutes) the Internet connection can be inactive before it is terminated into the Max Idle Time field. The default value is 15 minutes. If you want the Internet connection to remain active at all time, enter 0 (zero)."
                }]
            }, {
                type: "name",
                title: "Authentication Type",
                content: "Select an authentication type. The default is Auto. Some ISPs require a specific authentication type, please confirm it with the ISP or keep the default settings.",
                children: [{
                    type: "name",
                    title: "Auto",
                    content: "If Auto (default), the router automatically determines the authentication type used by the ISP."
                }, {
                    type: "name",
                    title: "PAP",
                    content: "If PAP (Password Authentication Protocol), the router authenticates with the peer using two handshakes. Select this option if the ISP requires this authentication type."
                }, {
                    type: "name",
                    title: "CHAP",
                    content: "If CHAP (Challenge Handshake Authentication Protocol), the router authenticates with the peer using three handshakes and validates the peer's identify periodically. Select this option if the ISP requires this authentication type."
                }, {
                    type: "name",
                    title: "MS-CHAP",
                    content: "If MS-CHAP (Microsoft-Challenge Handshake Authentication Protocol), the router authenticates with the peer by piggybacking a peer challenge on the Response packet and an authenticator response on the Success packet. Select this option if the ISP requires this authentication type."
                }]
            }, {
                type: "name",
                title: "IPv4",
                content: "Select the checkbox to enable IPv4."
            }, {
                type: "name",
                title: "IPv6",
                content: "IPv6 (Internet Protocol version 6) is the most recent version of the IP (Internet Protocol) and deals with the problem of IPv4 (Internet Protocol version 4) address exhaustion. If your ISP provides you with IPv6 service, select the checkbox to enable this feature."
            }, {
                type: "name",
                title: "Addressing Type",
                content: "Select an addressing type to decide how to get an IPv6 address. Select DHCPv6 to get a non-temporary IPv6 address or SLAAC to get an IPv6 address generated from the router advertisement packet according to the ISP."
            }, {
                type: "paragraph",
                content: "Click <b>Advanced</b> to view more advanced settings."
            }, {
                type: "name",
                title: "Advanced",
                children: [{
                    type: "name",
                    title: "Service Name/Access Concentrator Name",
                    content: "By default, the Service Name and Access Concentrator (AC) Name are left blank. These fields should not be configured unless required by the ISP."
                }, {
                    type: "name",
                    title: "MTU Size",
                    content: "The typical MTU (Maximum Transmission Unit) size for Ethernet networks is 1480 Bytes.",
                    children: [{
                        type: "paragraph",
                        content: "<b>Note</b>: In a rare case, your ISP may require you to adjust the MTU size for better network performance. You should not change the value unless it is absolutely necessary."
                    }]
                }, {
                    type: "name",
                    title: "NAT",
                    content: "This feature is enabled by default. It's recommended to keep the default setting. If you disable it, you may have no access to the Internet."
                }, {
                    type: "name",
                    title: "Full-cone NAT",
                    content: "It is a type of NAT. If Full-cone NAT is not enabled, the default NAT function will be used."
                }, {
                    type: "name",
                    title: "IGMP Proxy",
                    content: "IGMP (Internet Group Management Protocol) is used to manage multicasting on TCP/IP networks. Some ISPs use IGMP to perform remote configuration on a router. It is enabled by default."
                }, {
                    type: "name",
                    title: "Use the IP Specified by ISP",
                    content: "If the ISP provides the specific (fixed) IP addresses, enable Use the IP Specified by ISP and enter the address into the ISP Specified IP Address field."
                }, {
                    type: "name",
                    title: "Echo Request Interval",
                    content: "Enter a time interval value between 0 and 120 (in seconds) for which the router requests Access Concentrator to echo at every interval. The default value is 30. 0 means no detection."
                }, {
                    type: "name",
                    title: "Use the Following DNS Addresses",
                    content: "If the ISP provides the specific (fixed) DNS IP addresses, enable Use the Following DNS Addresses and enter the address(es) into the Primary DNS and Secondary DNS fields respectively. Otherwise disable this feature to obtain the server-assigned DNS IP address(es) automatically."
                }, {
                    type: "name",
                    title: "Use the IPv6 Addresses Specified by ISP",
                    content: "If the ISP provides the specific (fixed) IPv6 addresses, enable Use the IPv6 Addresses Specified by ISP and enter the addresses into the ISP Specified IPv6 Address and ISP Specified IPv6 Gateway fields."
                }, {
                    type: "name",
                    title: "Use the Following IPv6 DNS Address:",
                    content: "If the ISP provides the specific (fixed) DNS IP addresses, enable Use the Following IPv6 DNS Addresses and enter the address(es) into the Primary DNS and Secondary DNS fields respectively. Otherwise disable this feature to obtain the server-assigned DNS IP address(es) automatically."
                }]
            }, {
                type: "title",
                content: "MAC Clone"
            }, {
                type: "paragraph",
                content: "Select the appropriate MAC Clone method as you need."
            }, {
                type: "name",
                title: "Do NOT Clone MAC Address",
                content: "Do NOT change the default MAC address of the router, in case the ISP does not bind the assigned IP address to the MAC address."
            }, {
                type: "name",
                title: "Clone Current Computer MAC Address",
                content: "Select to copy the current MAC address of the computer that is connected to the router, in case the ISP binds the assigned IP address to the computer's MAC address."
            }, {
                type: "name",
                title: "Use Custom MAC Address",
                content: "Enter the MAC address manually, in case the ISP binds the assigned IP address to the specific MAC address."
            }]
        },
        wan: {
            TITLE: "Internet Connections",
            CONTENT: [{
                type: 'paragraph',
                content: 'This table displays details of all the Internet connections you have set up. You can modify settings in an existing connection or add a new connection on this page.'
            }, {
                type: "name",
                title: "To add an Internet connection",
                content: "Click Add and configure the corresponding parameters."
            }, {
                display: INCLUDE_VDSLWAN,
                type: "name",
                title: "DSL Modulation Type",
                content: "Select the modulation type of your DSL connection."
            }, {
                type: 'name',
                title: 'VPI',
                content: 'Enter the VPI assigned by your ISP to specify the virtual path between endpoints in an ATM network.'
            }, {
                type: "name",
                title: "VCI",
                content: "Enter the VCI assigned by your ISP to specify the virtual channel endpoints in an ATM network."
            }, {
                type: "name",
                title: "VLAN ID",
                content: "Select the checkbox to enable the VLAN ID feature and enter the VLAN ID provided by your ISP."
            }, {
                type: "paragraph",
                content: "<br><br>Select the Internet Connection Type and enter the corresponding parameters."
            }, {
                type: "title",
                content: "Internet Connection Type: Static IP "
            }, {
                type: "paragraph",
                content: "Select this type if you are provided with a specific (fixed) IP address, subnet mask, gateway, and DNS parameters by your ISP."
            }, {
                type: "name",
                title: 'IPv4',
                content: "Select the checkbox to enable IPv4."
            }, {
                type: "name",
                title: "IP Address/Subnet Mask/Gateway/Primary DNS/Secondary DNS/Default Gateway",
                content: "Enter the information provided by your ISP and select a WAN Interface from the Default Gateway drop-down list as the IPv4 default gateway."
            }, {
                type: "name",
                title: "IPv6",
                content: "IPv6 (Internet Protocol version 6) is the most recent version of the IP (Internet Protocol) and deals with the problem of IPv4 (Internet Protocol version 4) address exhaustion.If your ISP provides you with IPv6 service, select the checkbox to enable this feature."
            }, {
                type: "name",
                title: "IPv6 Address/Prefix Length/IPv6 Gateway/Primary IPv6 DNS/Secondary IPv6 DNS/IPv6 Default Gateway",
                content: "Enter the information provided by your ISP and select a WAN Interface from the Default Gateway drop-down list as the IPv6 default gateway."
            }, {
                type: "paragraph",
                content: "Click <b>Advanced</b> to view more advanced settings."
            }, {
                type: "name",
                title: "Advanced",
                children: [{
                    type: "name",
                    title: "MTU Size",
                    content: "The default and typical MTU (Maximum Transmission Unit) size for most Ethernet networks is <b>1500 Bytes</b>. It is not recommended to change the default MTU size unless required by the ISP."
                }, {
                    type: "name",
                    title: "NAT",
                    content: "This feature is enabled by default. It's recommended to keep the default setting. If you disable it, you may have no access to the Internet."
                }, {
                    type: "name",
                    title: "Full-cone NAT",
                    content: "It is a type of NAT. If Full-cone NAT is not enabled, the default NAT function will be used."
                }, {
                    type: "name",
                    title: "IGMP Proxy",
                    content: "IGMP (Internet Group Management Protocol) is used to manage multicasting on TCP/IP networks. Some ISPs use IGMP to perform remote configuration on a router. It is enabled by default."
                }]
            }, {
                type: "title",
                content: "Internet Connection Type: Dynamic IP "
            }, {
                type: "paragraph",
                content: "Select this type if you are provided with a DHCP server connection by the ISP."
            }, {
                type: "name",
                title: "IPv4",
                content: "Select the checkbox to enable IPv4."
            }, {
                type: "name",
                title: "IP Address/Subnet Mask/Gateway/Default Gateway",
                content: "These parameters are automatically assigned by the DHCP server from your ISP."
            }, {
                type: "name",
                title: "IPv6",
                content: "IPv6 (Internet Protocol version 6) is the most recent version of the IP (Internet Protocol) and deals with the problem of IPv4 (Internet Protocol version 4) address exhaustion.If your ISP provides you with IPv6 service, select the checkbox to enable this feature."
            }, {
                type: "name",
                title: "IPv6 Address/Prefix Length/IPv6 Gateway",
                content: "These parameters are automatically assigned by the DHCPv6 server from the ISP."
            }, {
                type: "name",
                title: "Addressing Type",
                content: "Select an addressing type to decide how to get an IPv6 address. Select DHCPv6 to get a non-temporary IPv6 address or SLAAC to get an IPv6 address generated from the router advertisement packet according to the ISP."
            }, {
                type: "name",
                title: "IPv6 Default Gateway",
                content: "Select a WAN Interface from the drop-down list as the IPv6 default gateway."
            }, {
                type: "paragraph",
                content: "Click <b>Advanced</b> to view more advanced settings."
            }, {
                type: "name",
                title: "Advanced",
                children: [{
                    type: "name",
                    title: "MTU Size",
                    content: "The default and typical MTU (Maximum Transmission Unit) size for most Ethernet networks is <b>1500 Bytes</b>. It is not recommended to change the default MTU size unless required by the ISP."
                }, {
                    type: "name",
                    title: "NAT",
                    content: "This feature is enabled by default. It's recommended to keep the default setting. If you disable it, you may have no access to the Internet."
                }, {
                    type: "name",
                    title: "Full-cone NAT",
                    content: "It is a type of NAT. If Full-cone NAT is not enabled, the default NAT function will be used."
                }, {
                    type: "name",
                    title: "IGMP Proxy",
                    content: "IGMP (Internet Group Management Protocol) is used to manage multicasting on TCP/IP networks. Some ISPs use IGMP to perform remote configuration on a router. It is enabled by default."
                }, {
                    type: "name",
                    title: "Get IP Using Unicast DHCP",
                    content: "Select this checkbox if your ISP’s DHCP server does not support broadcast applications and you cannot get the IP address dynamically."
                }, {
                    type: "name",
                    title: "Use the Following DNS Address",
                    content: "If the ISP provides the specific (fixed) DNS IP addresses, enable Use the Following DNS Addresses and enter the address(es) into the primary DNS and secondary DNS fields respectively. Otherwise disable this feature to obtain the server-assigned DNS IP address(es) automatically."
                }, {
                    type: "name",
                    title: "Use the Following IPv6 DNS Address",
                    content: "If the ISP provides the specific (fixed) DNS IP addresses, enable Use the Following IPv6 DNS Addresses and enter the address(es) into the primary DNS and secondary DNS fields respectively. Otherwise disable this feature to obtain the server-assigned DNS IP address(es) automatically."
                }, {
                    type: "name",
                    title: "Host Name",
                    content: "Enter a value into this field to specify the host name of the router."
                }]
            }, {
                type: "title",
                content: "Internet Connection Type: PPPoE"
            }, {
                type: "paragraph",
                content: "Select this type if you use DSL (Digital Subscriber Line) service and are provided with a username and password by the ISP."
            }, {
                type: "name",
                title: "Username/Password/Confirm Password",
                content: "Enter the username and password provided by the ISP. These fields are case-sensitive."
            }, {
                type: "name",
                title: "Connection Mode",
                content: "Select an appropriate connection mode that determines how to connect to the Internet.",
                children: [{
                    type: "name",
                    title: "Auto",
                    content: "In this mode, the Internet connection reconnects automatically any time it gets disconnected."
                }, {
                    type: "name",
                    title: "On Demand",
                    content: "In this mode, the Internet connection will be terminated automatically after a specified time of inactivity (Max Idle Time) has elapsed. The connection is re-established when you attempt to access the Internet again."
                }, {
                    type: "name",
                    title: "Manually",
                    content: "In this mode, the Internet connection is controlled manually by clicking the Connect or Disconnect button in the table. This mode also supports the Max Idle Time function. Enter a maximum time (in minutes) the Internet connection can be inactive before it is terminated into the Max Idle Time field. The default value is 15 minutes. If you want the Internet connection to remain active at all time, enter 0 (zero)."
                }]
            }, {
                type: "name",
                title: "Authentication Type",
                content: "Select an authentication type. The default is Auto. Some ISPs require a specific authentication type, please confirm it with the ISP or keep the default settings.",
                children: [{
                    type: "name",
                    title: "Auto",
                    content: "If Auto (default), the router automatically determines the authentication type used by the ISP."
                }, {
                    type: "name",
                    title: "PAP",
                    content: "If PAP (Password Authentication Protocol), the router authenticates with the peer using two handshakes. Select this option if the ISP requires this authentication type."
                }, {
                    type: "name",
                    title: "CHAP",
                    content: "If CHAP (Challenge Handshake Authentication Protocol), the router authenticates with the peer using three handshakes and validates the peer's identify periodically. Select this option if the ISP requires this authentication type."
                }, {
                    type: "name",
                    title: "MS-CHAP",
                    content: "If MS-CHAP (Microsoft-Challenge Handshake Authentication Protocol), the router authenticates with the peer by piggybacking a peer challenge on the Response packet and an authenticator response on the Success packet. Select this option if the ISP requires this authentication type."
                }]
            }, {
                type: "name",
                title: "IPv4",
                content: "Select the checkbox to enable IPv4."
            }, {
                type: "name",
                title: "Default Gateway",
                content: "Select a WAN Interface from the drop-down list as the IPv4 default gateway."
            }, {
                type: "name",
                title: "IPv6",
                content: "IPv6 (Internet Protocol version 6) is the most recent version of the IP (Internet Protocol) and deals with the problem of IPv4 (Internet Protocol version 4) address exhaustion.If your ISP provides you with IPv6 service, select the checkbox to enable this feature."
            }, {
                type: "name",
                title: "Addressing Type",
                content: "Select an addressing type to decide how to get an IPv6 address. Select DHCPv6 to get a non-temporary IPv6 address or SLAAC to get an IPv6 address generated from the router advertisement packet according to the ISP."
            }, {
                type: "name",
                title: "IPv6 Default Gateway",
                content: "Select a WAN Interface from the drop-down list as the IPv6 default gateway."
            }, {
                type: "paragraph",
                content: "Click <b>Advanced</b> to view more advanced settings."
            }, {
                type: "name",
                title: "Advanced",
                children: [{
                    type: "name",
                    title: "Service Name/Access Concentrator Name",
                    content: "By default, the Service Name and Access Concentrator (AC) Name are left blank. These fields should not be configured unless required by the ISP."
                }, {
                    type: "name",
                    title: "MTU Size",
                    content: "The typical MTU (Maximum Transmission Unit) size for Ethernet networks is 1480 Bytes.",
                    children: [{
                        type: "paragraph",
                        content: "<b>Note</b>: In a rare case, your ISP may require you to adjust the MTU size for better network performance. You should not change the value unless it is absolutely necessary."
                    }]
                }, {
                    type: "name",
                    title: "Full-cone NAT",
                    content: "It is a type of NAT. If Full-cone NAT is not enabled, the default NAT function will be used."
                }, {
                    type: "name",
                    title: "IGMP Proxy",
                    content: "IGMP (Internet Group Management Protocol) is used to manage multicasting on TCP/IP networks. Some ISPs use IGMP to perform remote configuration on a router. It is enabled by default."
                }, {
                    type: "name",
                    title: "Use the IP specified by ISP",
                    content: "If the ISP provides the specific (fixed) IP addresses, enable Use the IP Specified by ISP and enter the address into the ISP Specified IP Address field."
                }, {
                    type: "name",
                    title: "Echo Request Interval",
                    content: "Enter a time interval value between 0 and 120 (in seconds) for which the router requests Access Concentrator to echo at every interval. The default value is 30. 0 means no detection."
                }, {
                    type: "name",
                    title: "Use the Following DNS Address",
                    content: "If the ISP provides the specific (fixed) DNS IP addresses, enable Use the Following DNS Addresses and enter the address(es) into the primary DNS and secondary DNS fields respectively. Otherwise disable this feature to obtain the server-assigned DNS IP address(es) automatically."
                }, {
                    type: "name",
                    title: "Use IPv6 Specified by ISP",
                    content: "Select this checkbox and enter the IP address and gateway provided by your ISP."
                }, {
                    type: "name",
                    title: "Use the Following IPv6 DNS Address",
                    content: "If the ISP provides the specific (fixed) DNS IP addresses, enable Use the Following IPv6 DNS Addresses and enter the address(es) into the primary DNS and secondary DNS fields respectively. Otherwise disable this feature to obtain the server-assigned DNS IP address(es) automatically."
                }]
            }, {
                type: "title",
                content: "Internet Connection Type: PPPoA"
            }, {
                type: "paragraph",
                content: "Select this type if you use DSL (Digital Subscriber Line) service and are provided with a username and password by the ISP ."
            }, {
                type: "name",
                title: "Username/Password/Confirm Password",
                content: "Enter the username and password provided by the ISP. These fields are case-sensitive."
            }, {
                type: "name",
                title: "Connection Mode",
                content: "Select an appropriate connection mode that determines how to connect to the Internet.",
                children: [{
                    type: "name",
                    title: "Auto",
                    content: "In this mode, the Internet connection reconnects automatically any time it gets disconnected."
                }, {
                    type: "name",
                    title: "On Demand",
                    content: "In this mode, the Internet connection will be terminated automatically after a specified time of inactivity (Max Idle Time) has elapsed. The connection is re-established when you attempt to access the Internet again."
                }, {
                    type: "name",
                    title: "Manually",
                    content: "In this mode, the Internet connection is controlled manually by clicking the Connect or Disconnect button in the table. This mode also supports the Max Idle Time function. Enter a maximum time (in minutes) the Internet connection can be inactive before it is terminated into the Max Idle Time field. The default value is 15 minutes. If you want the Internet connection to remain active at all time, enter 0 (zero)."
                }]
            }, {
                type: "name",
                title: "Authentication Type",
                content: "Select an authentication type. The default is Auto. Some ISPs require a specific authentication type, please confirm it with the ISP or keep the default settings.",
                children: [{
                    type: "name",
                    title: "Auto",
                    content: "If Auto (default), the router automatically determines the authentication type used by the ISP."
                }, {
                    type: "name",
                    title: "PAP",
                    content: "If PAP (Password Authentication Protocol), the router authenticates with the peer using two handshakes. Select this option if the ISP requires this authentication type."
                }, {
                    type: "name",
                    title: "CHAP",
                    content: "If CHAP (Challenge Handshake Authentication Protocol), the router authenticates with the peer using three handshakes and validates the peer's identify periodically. Select this option if the ISP requires this authentication type."
                }, {
                    type: "name",
                    title: "MS-CHAP",
                    content: "If MS-CHAP (Microsoft-Challenge Handshake Authentication Protocol), the router authenticates with the peer by piggybacking a peer challenge on the Response packet and an authenticator response on the Success packet. Select this option if the ISP requires this authentication type."
                }]
            }, {
                type: 'name',
                title: "Default Gateway",
                content: "Select a WAN Interface from the drop-down list as the IPv4 default gateway."
            }, {
                type: "paragraph",
                content: "Click <b>Advanced</b> to view more advanced settings."
            }, {
                type: "name",
                title: "Advanced",
                children: [{
                    type: "name",
                    title: "MTU Size",
                    content: "The typical MTU (Maximum Transmission Unit) size for Ethernet networks is 1480 Bytes.",
                    children: [{
                        type: "paragraph",
                        content: "<b>Note</b>: In a rare case, your ISP may require you to adjust the MTU size for better network performance. You should not change the value unless it is absolutely necessary."
                    }]
                }, {
                    type: "name",
                    title: "IGMP Proxy",
                    content: "IGMP (Internet Group Management Protocol) is used to manage multicasting on TCP/IP networks. Some ISPs use IGMP to perform remote configuration on a router. It is enabled by default."
                }, {
                    type: "name",
                    title: "Use the IP specified by ISP",
                    content: "If the ISP provides the specific (fixed) IP addresses, enable Use the IP Specified by ISP and enter the address into the ISP Specified IP Address field."
                }, {
                    type: "name",
                    title: "Echo Request Interval",
                    content: "Enter a time interval value between 0 and 120 (in seconds) for which the router requests Access Concentrator to echo at every interval. The default value is 30. 0 means no detection."
                }, {
                    type: "name",
                    title: "Use the Following DNS Addresses",
                    content: "If the ISP provides the specific (fixed) DNS IP addresses, enable Use the Following DNS Addresses and enter the address(es) into the primary DNS and secondary DNS fields respectively. Otherwise disable this feature to obtain the server-assigned DNS IP address(es) automatically."
                }]
            }, {
                type: "title",
                content: "Internet Connection Type: IPoA"
            }, {
                type: "paragraph",
                content: "Select this type if your ISP provides an IPoA connection."
            }, {
                type: "name",
                title: "IP Address/Subnet Mask",
                content: "Enter the IP address and subnet mask provided by the ISP."
            }, {
                type: "name",
                title: "Gateway/Primary DNS/Secondary DNS Server",
                content: "Enter your preferred gateway and DNS server."
            }, {
                type: "name",
                title: "Default Gateway",
                content: "Select a WAN Interface from the drop-down list as the IPv4 default gateway."
            }, {
                type: "paragraph",
                content: "Click <b>Advanced</b> to view more advanced settings."
            }, {
                type: "name",
                title: "Advanced",
                children: [{
                    type: "name",
                    title: "MTU Size",
                    content: "The typical MTU (Maximum Transmission Unit) size for Ethernet networks is 1480 Bytes."
                }, {
                    type: "name",
                    title: "NAT",
                    content: "This feature is enabled by default. It's recommended to keep the default setting. If you disable it, you may have no access to the Internet."
                }, {
                    type: "name",
                    title: "IGMP Proxy",
                    content: "IGMP (Internet Group Management Protocol) is used to manage multicasting on TCP/IP networks. Some ISPs use IGMP to perform remote configuration on a router. It is enabled by default."
                }]
            }, {
                type: "title",
                content: "Internet Connection Type: Bridge"
            }, {
                type: "paragraph",
                content: "Select this type if the ISP uses Bridge network deployment. No configuration is required for this type of connection."
            }, {
                type: "title",
                content: "MAC Clone"
            }, {
                type: "paragraph",
                content: "Select the appropriate MAC Clone method as you need."
            }, {
                type: "name",
                title: "Do NOT Clone MAC Address",
                content: "Do NOT change the default MAC address of the router, in case the ISP does not bind the assigned IP address to the MAC address."
            }, {
                type: "name",
                title: "Clone Current Computer MAC Address",
                content: "Select to copy the current MAC address of the computer that is connected to the router, in case the ISP binds the assigned IP address to the computer's MAC address."
            }, {
                type: "name",
                title: "Use Custom MAC Address",
                content: "Enter the MAC address manually, in case the ISP binds the assigned IP address to the specific MAC address."
            }]
        },
        route: {
            TITLE: "Static Routing",
            CONTENT: [{
                type: "paragraph",
                content: "Static Routing is used to predetermine a fixed route for the network information packets to reach a specific host or network."
            }, {
                type: "step",
                title: "To set up a static routing",
                content: [
                    "Click <b>Add</b>.",
                    "Enter an IP address in the Network Destination field to assign the static route for this entry.",
                    "Enter a subnet mask in the Subnet Mask field to determine the network portion and host portion of the IP address.",
                    "Enter a gateway IP address in the Gateway field to connect the router to the network or host.",
                    "Select <b>LAN</b> or a <b>WAN</b> interface in the Interface field to specify the type of the Network Destination.",
                    "Select <b>Enable This Entry</b>.",
                    "Click <b>Save</b>."
                ]
            }, {
                type: "paragraph",
                content: "Note: If you want to disable this entry, click the Bulb icon."
            }]
        },
        group: {
            TITLE: "Interface Grouping",
            CONTENT: [{
                type: "paragraph",
                content: "Virtual LAN (VLAN) is a group of devices on one or more LANs that are configured so that they can communicate as if they were attached to the same LAN. Because VLANs are based on logical instead of physical connections, it is very flexible for user/host management, bandwidth allocation and resource optimization."
            }, {
                type: "name",
                title: "Enable VLAN",
                content: "Select the checkbox to enable the Virtual LAN feature."
            }, {
                type: "paragraph",
                content: "The table displays details of all configured VLANs."
            }, {
                type: "step",
                title: "To add a new interface group:",
                content: [
                    "Click <b>Add</b>.",
                    "Create a group name.",
                    "Select available LAN interface(s) for the new group.",
                    "Select the available WAN interface(s) for the new group.",
                    "Select <b>Enable Group Isolation</b> if you want to isolate this group from your network. Devices within this group will be able to communicate with each other but not with the devices from other groups. This option is disabled by default.",
                    "Click <b>Save</b>."
                ]
            }]
        },
        dslcfg: {
            TITLE: "DSL Settings",
            CONTENT: [{
                type: "name",
                title: "DSL Modulation Type/Annex Type",
                content: "Select a DSL modulation type/annex type from the drop-down list. Do not change the default settings unless necessary."
            }, {
                type: "name",
                title: "Bit Swap",
                content: "Select this checkbox to enable the Bit Swap feature. With bit-swapping, the router can swap bits around different channels, allowing it to robustly adapt to changing telephone line conditions."
            }, {
                type: "name",
                title: "SRA",
                content: "Select this checkbox to enable the SRA (Seamless Rate Adaptation) feature that prevents ADSL data rate interference caused by the cross-talk between telephone lines."
            }]
        },
        ddns: {
            TITLE: "Dynamic DNS Settings",
            CONTENT: [{
                type: "paragraph",
                content: "DDNS (Dynamic Domain Name System) allows you to assign a fixed host and domain name to a dynamic Internet IP address. It is useful when you are hosting the own website, FTP server, or another server behind the router. To begin with, you need to sign up with a Dynamic DNS service provider such as <a href='http://www.dyndns.com'>www.dyndns.com</a>."
            }, {
                display: "$.helpControl.ddnsStep === undefined || $.helpControl.ddnsStep === 1",
                type: "step",
                title: "To set up a Dynamic DNS",
                content: [
                    "Select the Dynamic DNS service provider.",
                    "Enter the Username and Password of the Dynamic DNS account.",
                    "Enter the Domain Name you received from the Dynamic DNS service provider.",
                    "Click Log in and click Save."
                ]
            }, {
                display: "$.helpControl.ddnsStep === undefined || $.helpControl.ddnsStep === 1",
                type: "paragraph",
                title: "Note:",
                content: "If you want to use a new DDNS account, please log out first, and then log in with the new account."
            }, {
                display: "$.helpControl.ddnsStep === 0 && $.helpControl.cloudLogin === 1",
                type: "title",
                content: "Domain Name List"

            }, {
                display: "$.helpControl.ddnsStep === 0 && $.helpControl.cloudLogin === 1",
                type: "paragraph",
                content: "This table displays the Dynamic DNS domain names that are registered to your TP-Link Cloud account."
            },{
                display: "$.helpControl.ddnsStep === 0 && $.helpControl.cloudLogin === 1",
                type:"step",
                title: "To register a new domain name",
                content: [
                    "Click Register.",
                    "Enter the domain name.",
                    "Click Save."
                ]
            }]
        },
        dhcp: {
            TITLE: "DHCP Server",
            CONTENT: [{
                type: "paragraph",
                content: "The DHCP (Dynamic Host Configuration Protocol) server is enabled by default and dynamically assigns TCP/IP parameters to client devices from the IP Address Pool. DO NOT disable DHCP unless you have another DHCP server, or you want to manually assign the TCP/IP parameters to every client device on the network."
            }, {
                type: "name",
                title: "IP Version",
                content: "Select the IP version to modify the corresponding settings."
            }, {
                type: "title2",
                content: "IPv4"
            }, {
                type: "name",
                title: "MAC Address",
                content: "The unique physical address assigned to the Ethernet (LAN) port of the router."
            }, {
                display: "$.sysMode == 'AP'",
                type: "name",
                title: "Address Type",
                content: "Select a type to assign IP Address to the AP. If you are not sure, select Smart IP."
            }, {
                type: "name",
                title: "IP Address",
                content: "Displays the router's default IP address which is used to log in to the router's web management page. You can change it to another one."
            }, {
                type: "name",
                title: "Subnet Mask",
                content: "Select an assigned identifier used by the LAN port to route Internal and External traffic or enter a new subnet mask."
            }, {
                type: "paragraph",
                title: "Note:",
                content: "If the new LAN IP address is not in the same subnet with the old one, the IP Address Pool in the DHCP server will be automatically configured; however, the Virtual Server and DMZ Host will not take effect until they are reconfigured."
            }, {
                type: "name",
                title: "IGMP Snooping",
                content: "The IGMP (Internet Group Management Protocol) Snooping feature allows the router to only forward multicast traffic to ports that have requested them."
            }, {
                type: "name",
                title: "Second IP",
                content: "Select the checkbox to enable Second IP and enter the secondary IP address and subnet mask to be used to access the web-based management page ."
            }, {
                type: "name",
                title: "DHCP Server",
                content: "Select this option if you want the router to provide the TCP/IP configuration for all the PC(s) that are connected to it on the LAN.",
                children: [{
                    type: "name",
                    title: "IP Address Pool",
                    content: "Enter the range of IP addresses that can be leased to the clients."
                }, {
					display: "'INCLUDE_AP_MODE' in window && INCLUDE_AP_MODE == 1 && $.sysMode === 'AP'",
                    type: "name",
                    title: "Address Lease Time",
                    content: "Enter the time duration (between 1 and 2880 minutes) in which an IP address is leased to a client. The default value is 1."
                }, {
					display: "!('INCLUDE_AP_MODE' in window) || !(INCLUDE_AP_MODE == 1) || !($.sysMode === 'AP')",
					type: "name",
                    title: "Address Lease Time",
                    content: "Enter the time duration (between 1 and 2880 minutes) in which an IP address is leased to a client. The default value is 1440."
				}]
            }, {
                type: "name",
                title: "DHCP Relay",
                content: "Select this option if you want this group to function as a DHCP relay agent that forwards the DHCP requests from local PCs to the remote DHCP server that runs on the WAN side.",
                children: [{
                    type: "name",
                    title: "Remote Server Address",
                    content: "The IP address of the remote DHCP server that runs on the WAN side."
                }]
            }, {
                type: "title2",
                content: "IPv6"
            }, {
                type: "name",
                title: "Group",
                content: "Displays the group name of the current DHCP server."
            }, {
                type: "name",
                title: "Address Type",
                content: "Select a type to assign IPv6 addresses to the computers in your LAN."
            }, {
                type: "name",
                title: "RADVD",
                content: "Select this option to assign IPv6 addresses to the computers in your LAN via RADVD.",
                children: [{
                    type: "name",
                    title: "Enable RDNSS",
                    content: "Select the checkbox to enable the RDNSS feature."
                }, {
                    type: "name",
                    title: "Enable ULA Prefix",
                    content: "Select the checkbox to enable the ULA Prefix feature.",
                    children: [{
                        type: "name",
                        title: "ULA Prefix",
                        content: "Enter the ULA Prefix."
                    }, {
                        type: "name",
                        title: "ULA Prefix Length",
                        content: "Enter the ULA Prefix Length. The default is 64."
                    }]
                }]
            }, {
                type: "name",
                title: "DHCPv6 Server",
                content: "Select this option to assign IPv6 addresses to the computers in your LAN via DHCPv6 Server.",
                children: [{
                    type: "name",
                    title: "Starting/Ending IPv6 Address",
                    content: "Enter the starting/ending IPv6 address provided by the ISP. "
                }, {
                    type: "name",
                    title: "Address Lease Time",
                    content: "Enter the time duration in which an IPv6 address is leased to a client. The default value is 86400."
                }]
            }, {
                type: "name",
                title: "Site Prefix Type",
                content: "Select Delegated to get a prefix delegation from a WAN connection, or Static to designate an address prefix manually. Clients in LAN will generate an IPv6 address with this prefix.",
                children: [{
                    type: "name",
                    title: "Delegated",
                    content: "Select a WAN connection from the drop-down list to delegate the prefix by the DHCPv6 server from the ISP."
                }, {
                    type: "name",
                    title: "Static",
                    content: "Enter a static IPv6 prefix and IPv6 site prefix length. The default length is 64."
                }]
            }, {
                type: "title",
                content: "Client List"
            }, {
                type: "paragraph",
                content: "Displays the information of currently connected devices."
            }, {
                type: "title",
                content: "Address Reservation"
            }, {
                type: "paragraph",
                content: "Displays the corresponding parameters of IP-reserved devices."
            }, {
                type: "step",
                title: "To reserve an IP address for an DHCP client",
                content: [
                    "Click <b>Add</b>.",
                    "Click <b>Scan</b> to choose a currently connected device from the DHCP Client List; or enter the MAC address of your desired client in the MAC Address field and the IP address that you want to reserve for the client in the IP Address field.",
                    "Select the group that the client belongs to.",
                    "Select <b>Enable This Entry</b>.",
                    "Click <b>Save</b>."
                ]
            }, {
                type: "paragraph",
                content: "If you want to disable this entry, click the Bulb icon."
            }, {
                type: "title",
                content: "Condition Pool"
            }, {
                type: "paragraph",
                content: "Condition Pool is used to configure IP address pools for certain devices or is used under the guidance of your device provider. The table displays the corresponding parameters of all the condition pools."
            }, {
                type: "step",
                title: "To add a condition pool",
                content: [
                    "Click <b>Add</b>.",
                    "Give a description to the condition pool in the Device Name field.",
                    "Enter a value to identify the vendor and functionality of the DHCP client.",
                    "Enter the starting/ending IP address to decide the IP address range the DHCP server can assign to clients.",
                    "Enter the default gateway of the DHCP server.",
                    "Select a device type from the drop-down list to decide which kind of device will obtain IP address from this pool.",
                    "Select an option from the drop-down list and enter the option value.",
                    "Select a group from the drop-down list.",
                    "Select <b>Enable This Entry</b>.",
                    "Click <b>Save</b>."
                ]
            }, {
                type: "paragraph",
                content: "If you want to disable this entry, click the Bulb icon."
            }]
        },
        iptv: {
            TITLE: "IPTV Settings",
            CONTENT: [{
                type: "paragraph",
                content: "The IPTV (Internet Protocol Television) feature allows you to use IPTV service when you buy one. You can specify a LAN port for IPTV to separate IPTV from Internet surfing, guaranteeing you a high quality of video streaming and a high speed of Internet surfing."
            }, {
                type: "step",
                title: "To set up IPTV",
                content: [
                    "Enable IPTV.",
                    "Select the DSL Modulation Type according to your network environment.",
                    "Specify a LAN port for IPTV connection and connect the set-top box to this port.",
                    "If you select VDSL modulation type, enable VLAN and set the VLAN ID. If you select ADSL, fill in the PVC parameters (VPI and VCI). Both VLAN ID and PVC parameters are provided by your IPTV service provider.",
                    "Click Save."
                ]
            }, {
                type: "paragraph",
                content: "Note: Configurations needed on the router is done now! You may need other configurations on your set-top box before enjoying your TV."
            }]
        },
        usbManage: {
            TITLE: "USB Storage Device",
            CONTENT: [{
                type: "paragraph",
                content: "This feature allows you to share USB storage devices among different clients in the local area network or through the Internet."
            }, {
                type: "title",
                content: "Device Settings"
            }, {
                type: "paragraph",
                content: "The Device Settings section displays the basic information of the USB storage device connected via the USB port. A USB flash disk usually has only one volume."
            }, {
                type: "paragraph",
                content: "Note: A gray area represents a volume that is disabled. You can click the area to share the specific volume."
            }, {
                type: "name",
                title: "Scan",
                content: "Usually, the router automatically detects any newly attached device. If not, click this button to scan and refresh the screen with the updated information."
            }, {
                type: "name",
                title: "Remove",
                content: "Click this button to safely unmount the USB storage device before physically unplugging it from the USB port.<br><br>Note: The Remove button only appears when the USB storage device is connected to the router. When the current volume is busy, you cannot remove the USB storage device."
            }, {
                type: "step",
                title: "To set up a file server",
                content: [
                    "Attach the USB storage device to the USB port directly or using a USB cable. If the device requires bundled external power, make sure the external power has been connected.",
                    "The newly attached USB device should be automatically detected by the router and displayed the information under the <b>Device Settings</b> section. If not, click <b>Scan</b>."
                ]
            }, {
                type: "title",
                content: "Sharing Settings"
            }, {
                type: "name",
                title: "Network/Media Server Name",
                content: "This function allows you to access the connected USB storage device with the Network/Media Server Name, namely, visiting \\\\Network/Media Server Name (for Windows) or smb://Network/Media Server Name (for Mac)."
            }, {
                type: "title",
                content: "Folder Sharing"
            }, {
                type: "paragraph",
                content: "This function allows you to customize how to share content on the USB storage device."
            }, {
                type: "name",
                title: "Share All",
                content: "Toggle On to share all the files and folders or Off to only share the selected folders."
            }, {
                type: "name",
                title: "Enable Authentication",
                content: "Toggle On to enable authentication which requires the users to enter a valid username and password to access all the shared folders."
            }, {
                type: "step",
                title: "To share a new folder",
                content: [
                    "Disable Share All and click Add.",
                    "Select the folder to share in the Volume Name drop-down list.",
                    "Click Browse and select the path to the folder to be shared.",
                    "Specify a name for the folder as you like in the Folder Name field.", {
                        type: "paragraph",
                        content: "Decide the way you share the folder:",
                        children: [{
                            type: "paragraph",
                            content: "Enable Authentication: Select the checkbox to enable authentication for this folder sharing, and you will be required to use a username and password to access the folder."
                        }, {
                            type: "paragraph",
                            content: "Enable Write Access: If you select this checkbox, network clients can modify this folder."
                        }, {
                            type: "paragraph",
                            content: "Enable Media Sharing: Select this checkbox to enable media sharing for this folder, and you can view photos, play music and watch movies stored in this folder directly from DLNA-supported devices."
                        }]
                    },
                    "Click Save."
                ]
            }, {
                type: "paragraph",
                content: "Note: <br>1. The router can share eight volumes at most. You can click the bulb icon on the page to detach the corresponding volume you do not need to share. <br>2. For the comprehensive guide, please refer to the User Guide on the product's support page."
            }]
        },
        printSrv: {
            TITLE: "Printer Server",
            CONTENT: [{
                type: "name",
                title: "Printer Server",
                content: "Toggle On to enable the printer server function."
            }, {
                type: "name",
                title: "Printer Name",
                content: "Displays the name of the printer connected to the router."
            }]
        },
        basic3g: {
            TITLE: "3G/4G Settings",
            CONTENT: [{
				display: false,
                type: "name",
                title: "Enable 3G/4G as a backup solution for Internet access",
                content: "Select the checkbox to enable 3G/4G as a backup solution for Internet access."
            }, {
                type: "name",
                title: "3G/4G USB Modem",
                content: "Displays whether or not a 3G/4G USB modem is plugged into the router."
            }, {
                type: "name",
                title: "PIN Status",
                content: "Displays the PIN status of the SIM card, including Failed to Connect Script, Ready, PIN Locked, PUK Locked, or Unknown Error."
            }, {
                type: "name",
                title: "Mobile ISP",
                content: "Displays the ISP (Internet Service Provider) of the 3G or 4G network. You can select your mobile ISP after you enable 3G/4G as a backup solution for Internet access."
            }, {
                type: "name",
                title: "Connection Status",
                content: "Displays whether or not the router is connected to the 3G or 4G network."
            }]
        },
        folderSharing: {
            TITLE: "USB Storage Device",
            CONTENT: [{
                type: "paragraph",
                content: "This feature allows you to share USB storage devices among different clients in the local area network or through the Internet."
            }, {
                type: "title",
                content: "Device Settings"
            }, {
                type: "paragraph",
                content: "The Device Settings section displays the basic information of the USB storage device connected via the USB port. A USB flash disk usually has only one volume."
            }, {
                type: "paragraph",
                content: "Note: A gray area represents a volume that is disabled. You can click the area to share the specific volume."
            }, {
                type: "name",
                title: "Scan",
                content: "Usually, the router automatically detects any newly attached device. If not, click this button to scan and refresh the screen with the updated information."
            }, {
                type: "name",
                title: "Remove",
                content: "Click this button to safely unmount the USB storage device before physically unplugging it from the USB port.<br><br>Note: The Remove button only appears when the USB storage device is connected to the router. When the current volume is busy, you cannot remove the USB storage device."
            }, {
                type: "step",
                title: "To set up a file server",
                content: [
                    "Attach the USB storage device to the USB port directly or using a USB cable. If the device requires bundled external power, make sure the external power has been connected.",
                    "The newly attached USB device should be automatically detected by the router and displayed the information under the <b>Device Settings</b> section. If not, click <b>Scan</b>."
                ]
            }, {
                type: "title",
                content: "Sharing Account"
            }, {
                type: "name",
                title: "Account",
                content: "You can either select <b>Use Default Account</b> to login to the shared files and folders or <b>Use New Account</b> and enter the following to create a new user account."
            }, {
                type: "name",
                title: "Username/Password",
                content: "Enter up to 15 characters containing letters, numbers and/or underline strings. These fields are case-sensitive. "
            }, {
                type: "paragraph",
                content: "Click <b>Save</b> to save the account settings."
            }, {
                type: "title",
                content: "Sharing Settings"
            }, {
                type: "name",
                title: "Network/Media Server Name",
                content: "Displays the name used to access the connected USB storage device."
            }, {
                type: "name",
                title: "Enable",
                content: "Select the checkbox(es) to enable the corresponding access method(s)."
            }, {
                type: "name",
                title: "Access Method",
                content: "There are four methods to access the shared USB storage device.",
                children: [{
                    type: "name",
                    title: "Media Server",
                    content: "Select this option to allow users on your network to view photos, play music, and watch movies on your shared UBS storage device from DLNA-supported devices such as computers, mobile devices, and game consoles (PS2/3)."
                }, {
                    type: "name",
                    title: "Network Neighborhood",
                    content: "Select this option to allow users on your network to access the shared contents via the address shown under the Access Address column."
                }, {
                    type: "name",
                    title: "FTP",
                    content: "Select this option to enable the FTP server feature that allows FTP clients and users on your network to access the USB storage device via the FTP address shown under the Access Address column. To change the FTP server’s port, enter a new port number and click <b>Save</b> to apply the changes."
                }, {
                    type: "name",
                    title: "FTP (Via Internet)",
                    content: "Select this option to allow FTP clients and users to remotely access, download and upload files to the shared USB storage device through FTP over the Internet."
                }]
            }, {
                type: "name",
                title: "Access Address",
                content: "Displays the address used to access the shared USB storage device."
            }, {
                type: "name",
                title: "Port",
                content: "Displays the port number of the FTP server."
            }, {
                type: "title",
                content: "Folder Sharing"
            }, {
                type: "paragraph",
                content: "This function allows you to customize how to share content on the USB storage device."
            }, {
                type: "name",
                title: "Share All",
                content: "Toggle On to share all files and folders or Off to only share the selected folders."
            }, {
                type: "name",
                title: "Enable Authentication",
                content: "Toggle On to enable authentication which requires the users to enter a valid username and password to access all the shared folders."
            }, {
                type: "step",
                title: "To share a new folder",
                content: [
                    "Disable Share All and click Add.",
                    "Select the folder to share in the Volume Name drop-down list.",
                    "Click Browse and select the path to the folder to be shared.",
                    "Specify a name for the folder as you like in the Folder Name field.", {
                        type: "paragraph",
                        content: "Decide the way you share the folder:",
                        children: [{
                            type: "paragraph",
                            content: "Enable Authentication: Select the checkbox to enable authentication for this folder sharing, and you will be required to use a username and password to access the folder."
                        }, {
                            type: "paragraph",
                            content: "Enable Write Access: If you select this checkbox, network clients can modify this folder."
                        }, {
                            type: "paragraph",
                            content: "Enable Media Sharing: Select this checkbox to enable media sharing for this folder, and you can view photos, play music and watch movies stored in this folder directly from DLNA-supported devices."
                        }]
                    },
                    "Click Save."
                ]
            }, {
                type: "paragraph",
                content: "Note: <br>1. The router can share eight volumes at most. You can click the bulb icon on the page to detach the corresponding volume you do not need to share. <br>2. For the comprehensive guide, please refer to the User Guide on the product's support page."
            }]
        },
        usb3g: {
            TITLE: "3G/4G Settings",
            CONTENT: [{
				display: false,
                type: "name",
                title: "Enable 3G/4G as a backup solution for Internet access",
                content: "Select the checkbox to enable 3G/4G as the backup solution for Internet access."
            }, {
                type: "name",
                title: "3G/4G USB Modem",
                content: "Displays whether or not a 3G/4G USB modem is plugged into the router."
            }, {
                type: "name",
                title: "PIN Status",
                content: "Displays the PIN status of the SIM card, including Unable to unlock SIM card, Ready, SIM Locked, PIN Locked, and Unknown Error."
            }, {
                type: "name",
                title: "Mobile ISP",
                content: "Displays the ISP (Internet Service Provider) of the 3G or 4G network. You can select your mobile ISP after you enable 3G/4G as the backup solution for Internet access."
            }, {
                type: "name",
                title: "Set Dial Number, APN, Username and Password manually",
                content: "Select the checkbox to set the Dial Number, APN, Username and Password manually."
            }, {
                type: "name",
                title: "Dial Number/APN/Username/Password",
                content: "Enter the Dial Number, APN, Username and Password provided by your ISP."
            }, {
                type: "name",
                title: "Authentication Type",
                content: "Select an authentication type from the drop-down list. The default method is Auto. Some ISPs may require a specific authentication type, please confirm it with your ISP or keep the default settings."
            }, {
                type: "name",
                title: "Connection Status",
                content: "Displays whether or not the router is connected to the 3G or 4G network."
            }, {
                type: "paragraph",
                content: "The following settings will only display if you enable 3G/4G as the backup solution for Internet access."
            }, {
                type: "paragraph",
                content: "< Advanced >"
            }, {
                type: "name",
                title: "MTU Size (in bytes)",
                content: "The typical MTU (Maximum Transmission Unit) size for 3G or 4G network is 1480 Bytes."
            }, {
                type: "name",
                title: "Echo Request Interval",
                content: "Enter a time interval value between 0 and 120 (in seconds) for which the router requests Access Concentrator to echo at every interval. The default value is 30. 0 means no detection."
            }, {
                type: "name",
                title: "Use the IP Specified by ISP",
                content: "If the ISP provides the specific (fixed) IP addresses, enable Use the IP Specified by ISP and enter the address into the ISP Specified IP Address field."
            }, {
                type: "name",
                title: "Use the Following DNS Addresses",
                content: "If the ISP provides the specific (fixed) DNS IP addresses, enable Use the Following DNS Addresses and enter the address(es) into the Primary DNS and Secondary DNS fields respectively. Otherwise disable this feature to obtain the DNS IP address(es) automatically."
            }, {
                type: "name",
                title: "3G/4G USB Modem Settings",
                content: "Click to configure the advanced settings of the 3G/4G USB modem by uploading the downloaded .bin file(s)."
            }]
        },
        usb3gModemList: {
            TITLE: "3G/4G USB Modem Settings",
            CONTENT: [{
                type: "paragraph",
                content: "This table displays details of configured 3G/4G USB Modems."
            }, {
                type: "step",
                title: "To upload 3G/4G USB modem configuration files",
                content: [
                    "Click Add.",
                    "Click Browse. Locate and select the downloaded .bin files.",
                    "Click Upload."
                ]
            }]
        },
        voice_basic: {
            TITLE: "Telephone Numbers",
            CONTENT: [{
                type: "paragraph",
                content: "Telephone Numbers allows you to add telephone accounts and to modify their settings."
            }, {
                type: "step",
                title: "To add a new telephone account:",
                content: [
                    "Click Add.",
                    "Select your Telephony Provider from the drop-down list and then enter the parameters provided by your service provider. If your provider is not listed, select Other. The parameters differ according to your selection.",
                    "Click Save."
                ]
            }]
        },
        voice_telephony: {
            TITLE: "Telephony Devices",
            CONTENT: [{
                type: "paragraph",
                content: "Telephony Devices allows you to configure phone settings for all registered devices."
            }, {
                type: "name",
                title: "Number for Incoming Calls",
                content: "Displays the assigned number of your telephony device to receive incoming calls through your router."
            }, {
                type: "name",
                title: "Internal Number",
                content: "Displays the number used to make calls between telephony devices that are connected to the router. This number is fixed and cannot be changed."
            }, {
                type: "name",
                title: "Number for Outgoing Calls",
                content: "Displays the number used by your telephony devices to make outgoing calls through your router. The default is Auto, which means the router will select an available number to be the outgoing number."
            }, {
                type: "step",
                title: "To modify a telephony device:",
                content: [
                    "Click the Edit Icon that corresponds to the device you wish to modify.",
                    "Edit the Device Name.",
                    "Select the Number for Outgoing Calls from the drop-down list.",
                    "Select the Number for Incoming Calls.",
                    "Select the VAD Support checkbox to enable this function. VAD (Voice Activity Detection) saves bandwidth consumption by avoiding transmission of silence packets. It also ensures that the bandwidth is reserved only when voice activity is activated. It is enabled by default.",
                    "Adjust the Speaker Gain slider to control the speaker sound.",
                    "Adjust the Mic Gain slider to control the sound of the microphone.",
                    "Click Save."
                ]
            }, {
                type: "name",
                title: "> Register New DECT Handset",
                content: "Click to register a new DECT handset by following the on-screen instructions. For more details, please refer to the Application Guide on TP-Link official website <a target=\"_blank\" href=\"http://www.tp-link.com\">http://www.tp-link.com</a>."
            }]
        },
        voice_usbmailBasic: {
            TITLE: "Voice Mail",
            CONTENT: [{
                display: "'INCLUDE_FLASH_VOICEMAIL' in window && INCLUDE_FLASH_VOICEMAIL === 1",
                type: "paragraph",
                content: "Voice Mail allows callers to leave voice messages when calls are not answered. You can listen to your voicemails whenever you want."
            }, {
                display: "!('INCLUDE_FLASH_VOICEMAIL' in window) || !INCLUDE_FLASH_VOICEMAIL",
                type: "paragraph",
                content: "Voice Mail allows callers to leave voice messages on an external USB hard drive or a USB flash disk with the appropriate configuration files when calls are not answered. To use this function, plug the USB hard drive or a USB flash disk into the USB port on the router."
            }, {
                type: "title",
                content: "Voice Mail Settings"
            }, {
                type: "name",
                title: "Voice Mail",
                content: "Toggle On to enable Voice Mail. By default, this function is disabled."
            }, {
                type: "title",
                content: "Voice Mail List"
            }, {
                type: "paragraph",
                content: "This table displays details of all received voice mails."
            }]
        },
        voice_advance: {
            TITLE: "Telephone Numbers",
            CONTENT: [{
                type: "paragraph",
                content: "Telephone Numbers allows you to add telephone accounts and to modify their settings."
            }, {
                type: "step",
                title: "To add a new telephone number:",
                content: [
                    "Click Add.",
                    "Select your Telephony Provider from the drop-down list and then enter the parameters provided by your service provider. If your provider is not listed, select Other. The parameters differ according to your selection.",
                    "Click Save."
                ]
            }, {
                type: "title",
                content: "Advanced Settings"
            }, {
                type: "name",
                title: "Bound Interface",
                content: "Select the interface of the SIP server to send and receive VoIP traffic. Select Any_WAN for over-the-Internet connection, or select LAN for over-the-local-network connection."
            }, {
                type: "name",
                title: "Locale Selection",
                content: "Select your location. The router is embedded with the default location-based parameters such as ring tones. The default is Germany."
            }, {
                type: "name",
                title: "DSCP for SIP and for RTP",
                content: "DSCP (Differentiated Services Code Point) is the first 6 bits in the ToS (Tpye of Service) byte. DSCP marking allows you to ensure preferential treatment for higher-priority traffic on the network based on the DSCP value. Select DSCP for the SIP (Session Initiation Protocol) and RTP (Real-time Transport Protocol) respectively. If you are unsure, please keep the default value."
            }, {
                type: "name",
                title: "DTMF Relay Setting",
                content: "Select one of the following protocols for DTMF relay setting. If you are unsure of which one to select, please keep the default value.",
                children: [{
                    type: "name",
                    title: " SIP INFO",
                    content: "Select this option to send DTMF tones in SIP INFO message to the remote end."
                }, {
                    type: "name",
                    title: "RFC2833",
                    content: "Select this option to capture the entered number on the phone's keypad, then convert it into a digital form and send it to the other end; the receiver will generate the tone according to the digital form it receives. This option is recommended as it can still remain the accuracy of DTMF tone when the network traffic congestion occurs."
                }, {
                    type: "name",
                    title: "In-band",
                    content: "Select this option to send the DTMF tone as an audio when you tap the keypad on the phone."
                }]
            }, {
                type: "name",
                title: "Registry Expiration Time",
                content: "Enter the expiration time of the SIP registration."
            }, {
                type: "name",
                title: "Registry Retry Interval",
                content: "Enter the time duration for which the router sends a request to retry registering automatically prior to the Registry Expiration Time. If you are unsure, please keep the default value."
            }, {
                type: "name",
                title: "No Answer Time",
                content: "Enter the duration for the incoming calls to go to voicemail or the destination telephone number when there is no response."
            }, {
                type: "name",
                title: "T.38 Support",
                content: "Select the checkbox to enable T.38 support that allows fax documents to be transferred in real-time between two standard Group 3 facsimile terminals over the Internet or other networks using IP protocols. This function is only effective between two T.38-enabled terminals."
            }, {
                type: "name",
                title: "End with #",
                content: "Select the checkbox to use the pound sign (#) as an end-of-dialing."
            }]
        },
        voice_telebook: {
            TITLE: "Telephone Book",
            CONTENT: [{
                type: "paragraph",
                content: "There are two functions on this page, Telephone Book and Emergency Number. Telephone Book allows you to save contact details and assign a speed dial number to the contact.  Emergency Number helps to make a call for help when emergency occurs."
            }, {
                type: "title",
                content: "Telephone Book"
            }, {
                type: "paragraph",
                content: "This table displays details of all contacts."
            }, {
                type: "step",
                title: "To add a new contact:",
                content: [
                    "Click Add.",
                    "Enter the Last Name and First Name of your contact.",
                    "Enter the Private Phone Number, Work Phone Number, and Mobile Phone Number.",
                    "Select the Speed Dial Number Type and enter the Speed Dial Number (between 01 and 99) if you want to assign one to this contact. This function allows you to quickly place a call with fewer numbers to dial. Simply press the speed dial number you entered followed by # to place a call.",
                    "Click Save."
                ]
            }, {
                type: "title",
                content: "Emergency Number Settings"
            }, {
                type: "name",
                title: "Emergency Number",
                content: "Toggle On to enable Emergency Number which allows your telephony device to call a specific contact when the handset is picked up but no operation is done within a specific time period."
            }, {
                type: "name",
                title: "No Operation Time",
                content: "Select a time period from the drop-down list to specify the time period before the phone makes the call automatically."
            }, {
                type: "name",
                title: "Emergency Number 1/2/3/4/5",
                content: "Enter up to 5 telephone numbers for emergency calls. The phone will call these numbers in order if the previous call is not answered."
            }]
        },
        voice_calllog: {
            TITLE: "Call Log",
            CONTENT: [{
                type: "paragraph",
                content: "Call Log records the details of incoming calls and outgoing calls through your router. Toggle On to enable Call Log."
            }]
        },
        voice_electionRule: {
            TITLE: "Call Rules",
            CONTENT: [{
                type: "paragraph",
                content: "Call Rules allows you to call different types of numbers using different outgoing numbers if you have more than one telephone account."
            }, {
                type: "step",
                title: "To add a new rule: ",
                content: [
                    "Click Add.",
                    "Select a Call Type from the drop-down list, including Mobile, Landline, Long Distance, or International. If Calls with Specific Number Prefix is selected, add the Number Prefix.",
                    "Select a Number for Outgoing Calls from the drop-down list. If the dialing number matches the defined call type or number prefix, the dialing number will be routed to the specified network according to the rule.",
                    "Click Save."
                ]
            }]
        },
        voice_callblocks: {
            TITLE: "DND & Call Blocking",
            CONTENT: [{
                type: "paragraph",
                content: "DND (Do Not Disturb) allows you to temporarily block all incoming calls based on your specific schedule. The blocked calls will be recorded in the Call Log table. Call Blocking allows you to block unwanted calls and to prevent the router from making certain call types. The blocked calls will not be recorded in the Call Log table."
            }, {
                type: "title",
                content: "DND (Do Not Disturb)"
            }, {
                type: "step",
                title: "To configure DND:",
                content: [
                    "Toggle On to enable DND.",
                    "Specify the days you want to block the incoming calls.",
                    "Set the start time and end time of the DND period you want to block incoming calls."
                ]
            }, {
                type: "title",
                content: "Call Blocking"
            }, {
                type: "name",
                title: "Incoming Calls",
                content: "The specified numbers listed under this list are blocked at all time."
            }, {
                type: "step",
                title: "To add a new entry:",
                content: [
                    "Click Add.",
                    "Select Specific Number and enter the telephone number that you want to block in the Number field, or Anonymous Number to block all unknown calls.",
                    "Click Save."
                ]
            }, {
                type: "name",
                title: "Outgoing Calls",
                content: "The specified call types and numbers listed under this list are not allowed to be called."
            }, {
                type: "step",
                title: "To add a new entry:",
                content: [
                    "Click Add.",
                    "Select a Call Type from the drop-down list that you want to block. If Call with Specific Number Prefix is selected, add a telephone number prefix in the Number Prefix field.",
                    "Click Save."
                ]
            }]
        },
        voice_callforward: {
            TITLE: "Call Forwarding",
            CONTENT: [{
                type: "paragraph",
                content: "Call Forwarding allows you to redirect incoming calls to a designated phone number."
            }, {
                type: "step",
                title: "To add a new entry: ",
                content: [
                    "Click Add.",
                    "Select a call type to be forwarded.<br><b>All Incoming Calls: </b>If this option is selected, all incoming calls will be forwarded.<br><b>Calls to the Telephone Number: </b>If this option is selected, select a telephone number from the list. Any incoming calls to this number will be forwarded.<br><b>Calls to the Phone: </b>If this option is selected, select a telephony device from the list. Any incoming calls to this device will be forwarded.<br><b>Calls from a Person in the Telephone Book: </b>If this option is selected, select a contact from the list. Any incoming calls from this contact will be forwarded.<br><b>Calls from the Telephone Number: </b>If this option is selected, enter a specific telephone number. Any incoming calls from this number will be forwarded.",
                    "Enter a Destination Telephone Number that incoming calls will be redirected to.",
                    "Select Forward the Calls via from the drop-down list.",
                    "Select the Call Forward Condition: <br><b>Unconditional: </b>All incoming calls will be redirected to the designated telephone number whether the receiver is busy or not.<br><b>No Answer: </b>Incoming calls that are not answered for the specified time period will be redirected to the designated telephone number.",
                    "Click Save."
                ]
            }, {
                type: "paragraph",
                content: "Note: If you want to disable this entry, click the Bulb icon."
            }]
        },
        voice_callthrough: {
            TITLE: "Call Through",
            CONTENT: [{
                type: "paragraph",
                content: "Call Through allows you to place calls using the router even when you are not at home, which may help you lower your long-distance or international calling costs."
            }, {
                type: "step",
                title: "To configure Call Through:",
                content: [
                    "Toggle On to enable Call Through.",
                    "Select the number to be used to receive the call in Number for Incoming list.",
                    "Select the number to be used to forward the call to the destination number in the Number for Outgoing list. You can also select Auto to let the router make the decision.",
                    "Set a new PIN. It is a four-digit code to be entered every time you want to forward the call to the destination number. The default is 0000.",
                    "You are recommended to enable Keep Only Accept Calls from the Numbers Below, and click Add More Numbers to add the numbers that are allowed to call through. Otherwise, all calls will be accepted.",
                    "Click Save."
                ]
            }, {
                type: "step",
                title: "Now you can follow the process below to call through:",
                content: [
                    "When you are not at home, call the Number for Incoming you selected in step 2.",
                    "Input the PIN when you hear the tone. Remember to end the PIN with a #.",
                    "Dial the number you actually want to call."
                ]
            }]
        },
        voice_dectadv: {
            TITLE: "DECT Settings",
            CONTENT: [{
                type: "paragraph",
                content: "Toggle On to enable DECT and configure your DECT handsets."
            }, {
                type: "title",
                content: "Registration"
            }, {
                type: "paragraph",
                content: "Use the default PIN or enter a new PIN to register your DECT handset. The default is 0000."
            }, {
                type: "title",
                content: "Radio Field Strength"
            }, {
                type: "paragraph",
                content: "Change the radio field strength by configuring these 2 functions.",
                children: [{
                    type: "name",
                    title: "Reduce DECT Field Strength",
                    content: "Select the checkbox to enable this function which will decrease the base transmit power and shorten the DECT handset signal coverage."
                }, {
                    type: "name",
                    title: "Eco DECT",
                    content: "Select this option if all registered handsets support Eco mode. In this mode, all DECT bases and DECT handsets do not emit any signal when they are in standby for more than one minute."
                }]
            }, {
                type: "title",
                content: "Security"
            }, {
                type: "paragraph",
                content: "This option is enabled by default to make DECT/CAT-iq security effective. If disabled, CAT-iq handset will be unable to receive or place a phone call."
            }]
        },
        voice_usbmail: {
            TITLE: "Voice Mail",
            CONTENT: [{
                display: "'INCLUDE_FLASH_VOICEMAIL' in window && INCLUDE_FLASH_VOICEMAIL === 1",
                type: "paragraph",
                content: "Voice Mail allows callers to leave voice messages on the router's flash memory or a USB storage device with the appropriate configuration files when calls are not answered."
            }, {
                display: "!('INCLUDE_FLASH_VOICEMAIL' in window) || !INCLUDE_FLASH_VOICEMAIL",
                type: "paragraph",
                content: "Voice Mail allows callers to leave voice messages on an external USB storage device with the appropriate configuration files when calls are not answered. To use this function, plug the USB storage device into the USB port on the router."
            }, {
                type: "title",
                content: "Voice Mail Settings"
            }, {
                type: "step",
                title: "To configure Voice Mail:",
                content: [
                    "Toggle On to enable Voice Mail.",
                    "Enter the duration in the No Answer Time field for the incoming calls to go to voicemail or the destination telephone number when there is no response.",
                    "Select the Greeting for Voice mail to use either the default or your custom greeting for the voice mail. You can click the Play icon to play the greeting.<br><strong>Note</strong>: Pick up the phone (analog phone or DECT handset) and dial *30 to record a personalized greeting for your voice mail.",
                    "Enter a value in seconds in the Voice Mail Duration field to limit the length of each voice mail.",
                    "(Optional) If you want to listen to your voice mails remotely, toggle On to enable Remote Access to Voice Mail and create a PIN in the Remote Access PIN field.<br><strong>Note</strong>: To access your voice mail remotely, dial the number for incoming calls. When your personal greeting starts, press *. Enter your Remote Access PIN when prompted.",
                    "(Optional) If you want to get notified by e-mail when a new voice mail is received, enable Push Notification via E-mail for Voice Mails.",
                    "Click Save."
                ]
            }, {
                type: "title",
                content: "Voice Mail List"
            }, {
                type: "paragraph",
                content: "This table displays details of all recorded voice mails."
            }]
        },
        voice_voiceapp: {
            TITLE: "tpPhone",
            CONTENT: [{
                type: "paragraph",
                content: "tpPhone allows registered mobile devices (phones or tablets) to make VoIP calls via the router's network. "
            }, {
                type: "paragraph",
                content: "To register your mobile device, you need to configure the router and the tpPhone app."
            }, {
                type: "step",
                title: "To configure the router:",
                content: [
                    "Toggle On to enable tpPhone.",
                    "Use the default PIN (0000) or enter a new PIN in the PIN field. It should be entered on the tpPhone app during registration.",
                    "Click Save."
                ]
            }, {
                type: "title",
                content: "Registration"
            }, {
                type: "paragraph",
                content: "Your tpPhone must be registered on the product for you to make calls. For registration, a PIN is required. Define the PIN here (create a new one or keep the default 0000) and enter it on the tpPhone during registration."
            }]
        },
        ipsec: {
            TITLE: "IPSec VPN",
            CONTENT: [{
                type: "paragraph",
                content: "With IPSec VPN, you can use the Internet to securely access the network when you are out of home. To use the VPN Service, you need to configure Dynamic DNS Service (recommended) or assign a static IP address for the router’s WAN port. And the System Time should be synchronized with Internet."
            }, {
                type: "name",
                title: "Dead Peer Detection",
                content: "Dead Peer Detection (DPD) is a method of detecting a dead Internet Key Exchange (IKE) peer. DPD is used to reclaim the lost resources in case a peer is found dead and it is also used to perform IKE peer failover. Toggle On to enable the Dead Peer Detection feature."
            }, {
                type: "paragraph",
                content: "The table displays information of all configured IPSec VPNs on the router."
            }, {
                type: "step",
                title: "To establish an IPSec VPN",
                content: [
                    "Click Add.", {
                        type: "paragraph",
                        content: "Configure the parameters according to the following explanation.",
                        children: [{
                            type: "name",
                            title: "IPSec Connection Name",
                            content: "Enter a name for the IPSec VPN connection."
                        }, {
                            type: "name",
                            title: "Remote IPSec Gateway Address (URL)",
                            content: "Enter the destination gateway IP address which is the public WAN IP or Domain Name of the remote VPN server endpoint."
                        }, {
                            type: "name",
                            title: "Tunnel access from local IP addresses",
                            content: "Select Subnet Address if you want the whole LAN to join the VPN network, or select Single Address if you want a single IP to join the VPN network."
                        }, {
                            type: "name",
                            title: "IP Address for VPN",
                            content: "Enter the IP address of your LAN."
                        }, {
                            type: "name",
                            title: "Subnet Mask",
                            content: "Enter the subnet mask of your LAN."
                        }, {
                            type: "name",
                            title: "Tunnel access from remote IP addresses",
                            content: "Select Subnet Address if you want the whole remote LAN to join the VPN network, or select Single Address if you want a single IP to join the VPN network."
                        }, {
                            type: "name",
                            title: "IP Address for VPN",
                            content: "Enter the IP address of the remote LAN."
                        }, {
                            type: "name",
                            title: "IP Subnet Mask",
                            content: "Enter the subnet mask of the remote LAN."
                        }, {
                            type: "name",
                            title: "Key Exchange Method",
                            content: "Select Auto (IKE) or Manual to be used to authenticate IPSec peers."
                        }, {
                            type: "name",
                            title: "Authentication Method",
                            content: "Select Pre-Shared Key (recommended)."
                        }, {
                            type: "name",
                            title: "Pre-Shared Key",
                            content: "Create a pre-shared key to be used for authentication."
                        }, {
                            type: "name",
                            title: "Perfect Forward Secrecy",
                            content: "Select Enable (or Disable) the Perfect Forward Secrecy (PFS) as an additional security protocol for the pre-shared key."
                        }]
                    }, {
                        type: "paragraph",
                        content: "Configure the advanced settings according to the following explanation. We recommend that you keep the default settings. If you want to change these settings, make sure that both VPN server endpoints use the same Encryption Algorithm, Integrity Algorithm, Diffie-Hellman Group and Key Lifetime in both phase1 and phase2.",
                        children: [{
                            type: "title2",
                            content: "==Phase 1=="
                        }, {
                            type: "name",
                            title: "Mode",
                            content: "Select <b>Main</b> to configure the standard negotiation parameters for IKE phase1. Select <b>Aggressive</b> to configure IKE Phase 1 of the VPN Tunnel to carry out negotiation in a shorter amount of time. (Not Recommended as it is less secure.)"
                        }, {
                            type: "name",
                            title: "Local Identifier Type",
                            content: "Select the local Identifier type for IKE negotiation. Local WAN IP uses an IP address as the identifier in IKE negotiation. FQDN (Fully Qualified Domain Name) uses a username as the identifier."
                        }, {
                            type: "name",
                            title: "Local Identifier",
                            content: "The local identifier will be auto-populated if <b>Local WAN IP</b> is selected. If <b>FQDN</b> is selected, enter a username of the local device to be used as the indentifier for IKE negotiation."
                        }, {
                            type: "name",
                            title: "Remote Identifier Type",
                            content: "Select the remote Identifier type for IKE negotiation. Remote WAN IP uses an IP address as the identifier in IKE negotiation. FQDN uses a username as the identifier."
                        }, {
                            type: "name",
                            title: "Remote Identifier",
                            content: "The remote gateway IP address will be auto-populated if <b>Remote WAN IP</b> is selected. If <b>FQDN</b> is selected, enter a username of the remote peer to be used as the identifier for IKE negotiation."
                        }, {
                            type: "name",
                            title: "Encryption Algorithm",
                            content: "Select one of the following encryption algorithm for IKE negotiation.",
                            children: [{
                                type: "name",
                                title: "DES",
                                content: "DES (Data Encryption Standard) encrypts a 64-bit block of plain text with a 56-bit key."
                            }, {
                                type: "name",
                                title: "3DES",
                                content: "Triple DES, encrypts a plain text with 168-bit key."
                            }, {
                                type: "name",
                                title: "AES128",
                                content: "Uses the AES algorithm and 128-bit key for encryption."
                            }, {
                                type: "name",
                                title: "AES192",
                                content: "Uses the AES algorithm and 192-bit key for encryption."
                            }, {
                                type: "name",
                                title: "AES256",
                                content: "Uses the AES algorithm and 256-bit key for encryption."
                            }]
                        }, {
                            type: "name",
                            title: "Integrity Algorithm",
                            content: "Select one of the following integrity algorithm for IKE negotiation.",
                            children: [{
                                type: "name",
                                title: "MD5",
                                content: "MD5 (Message Digest Algorithm) takes a message of arbitrary length and generates a 128-bit message digest."
                            }, {
                                type: "name",
                                title: "SHA1",
                                content: "SHA1 (Secure Hash Algorithm) takes a message less than 2^64 (2 to the power of 64) in bits and generates a 160-bit message digest."
                            }]
                        }, {
                            type: "name",
                            title: "Diffie-Hellman Group for Key Exchange",
                            content: "Select the Diffie-Hellman group to be used in key negotiation Phase 1. The Diffie-Hellman Group sets the strength of the algorithm in bits."
                        }, {
                            type: "name",
                            title: "Key Lifetime",
                            content: "Enter the period of time (in seconds) to pass before establishing a new IPSec security association (SA) with the remote endpoint. The default value is 3600."
                        }, {
                            type: "title2",
                            content: "==Phase 2=="
                        }, {
                            type: "name",
                            title: "Encryption Algorithm",
                            content: "Select one of the following encryption algorithm for IKE negotiation.",
                            children: [{
                                type: "name",
                                title: "DES",
                                content: "DES (Data Encryption Standard) encrypts a 64-bit block of plain text with a 56-bit key."
                            }, {
                                type: "name",
                                title: "3DES",
                                content: "Triple DES, encrypts a plain text with 168-bit key."
                            }, {
                                type: "name",
                                title: "AES128",
                                content: "Uses the AES algorithm and 128-bit key for encryption."
                            }, {
                                type: "name",
                                title: "AES192",
                                content: "Uses the AES algorithm and 192-bit key for encryption."
                            }, {
                                type: "name",
                                title: "AES256",
                                content: "Uses the AES algorithm and 256-bit key for encryption."
                            }]
                        }, {
                            type: "name",
                            title: "Integrity Algorithm",
                            content: "Select one of the following integrity algorithm for IKE negotiation.",
                            children: [{
                                type: "name",
                                title: "MD5",
                                content: "MD5 (Message Digest Algorithm) takes a message of arbitrary length and generates a 128-bit message digest."
                            }, {
                                type: "name",
                                title: "SHA1",
                                content: "SHA1 (Secure Hash Algorithm) takes a message less than 2^64 (2 to the power of 64) in bits and generates a 160-bit message digest."
                            }]
                        }, {
                            type: "name",
                            title: "Diffie-Hellman Group for Key Exchange",
                            content: "Select the Diffie-Hellman group to be used in key negotiation Phase 2. The Diffie-Hellman Group sets the strength of the algorithm in bits."
                        }, {
                            type: "name",
                            title: "Key Lifetime",
                            content: "Enter the period of time (in seconds) to pass before establishing a new IPSec security association (SA) with the remote endpoint. The default value is 3600."
                        }]
                    },
                    "Click Save."
                ]
            }, {
                type: "paragraph",
                content: "Note: For the comprehensive guide, please refer to the User Guide on the product's support page."
            }]
        },
        wanBasicETH: {
            TITLE: "Internet Connection Setup",
            CONTENT: [{
                type: "title",
                content: "PPPoE"
            }, {
                type: "paragraph",
                content: "",
                children: [{
                    type: "name",
                    title: "PPPoE Username/Password",
                    content: "Enter the username and password provided by your ISP. These fields are case-sensitive."
                }]
            }, {
                type: "title",
                content: "Dynamic IP"
            }, {
                type: "paragraph",
                content: "Select if the IP address and Subnet Mask are assigned automatically by the ISP."
            }, {
                type: "title",
                content: "Static IP"
            }, {
                type: "paragraph",
                content: "Select if the IP address, Subnet Mask, Gateway, and DNS addresses are provided by the ISP, and enter these information into the corresponding fields."
            }]
        },
        wanBasicDSL: {
            TITLE: "Internet Connection Setup",
            CONTENT: [{
                type: "name",
                title: "ISP List",
                content: "Select your ISP (Internet Service Provider) from the drop-down list."
            }, {
                type: "name",
                title: "DSL Modulation Type",
                content: "Select the modulation type used for your DSL connection."
            }, {
                type: "name",
                title: "VPI",
                content: "Enter the VPI assigned by your ISP to specify the virtual path between endpoints in an ATM network."
            }, {
                type: "name",
                title: "VCI",
                content: "Enter the VCI assigned by your ISP to specify the virtual channel endpoints in an ATM network."
            }, {
                type: "name",
                title: "VLAN ID",
                content: "Select the checkbox to enable the VLAN ID feature."
            }, {
                type: "name",
                title: "VLAN ID (1-4094)",
                content: "Enter the VLAN ID provided by your ISP."
            }, {
                type: "name",
                title: "Internet Connection Type",
                content: "Select the connection type and enter corresponding parameters provided by your ISP."
            }]
        },
        ipv6Tunnel: {
            TITLE: "IPv6 Tunnel",
            CONTENT: [{
                type: "paragraph",
                content: "IPv6 Tunnel is a transition mechanism that enables IPv6-only hosts to reach IPv4 services or vice versa and allows isolated IPv6 hosts and networks to reach each other over IPv4-only infrastructure before IPv6 completely supplants IPv4. It is a temporary solution for networks that do not support native dual-stack, where both IPv6 and IPv4 run independently."
            }, {
                type: "name",
                title: "IPv6 Tunnel",
                content: "Select the checkbox to enable IPv6 Tunnel."
            }, {
                type: "name",
                title: "Tunneling Mechanism",
                content: "Select one of the mechanisms below for IPv6 Tunneling:",
                children: [{
                    type: "name",
                    title: "DS-Lite",
                    content: "Select this tunneling mechanism if your ISP uses DS-Lite deployment for assigning address. ",
                    children: [{
                        type: "name",
                        title: "WAN Connection",
                        content: "Select a WAN connection from the drop-down list. Only the connected and non-bridging IPv6 connection are shown here. "
                    }, {
                        type: "name",
                        title: "Configuration Type",
                        content: "Select a configuration type for DS-Lite mechanism. Select <b>Auto</b> to obtain the Remote IPv6 Address automatically or <b>Manual</b> to enter the IPv6 information provided by your ISP."
                    }, {
                        type: "name",
                        title: "Remote IPv6 Address",
                        content: "Enter the IPv6 address of the remote node."
                    }]
                }, {
                    type: "name",
                    title: "6rd",
                    content: "Select this tunneling mechanism if your ISP uses 6rd deployment for assigning address.",
                    children: [{
                        type: "name",
                        title: "WAN Connection",
                        content: "Select a WAN connection from the drop-down list. Only the connected and non-bridging IPv4 connection are shown here. "
                    }, {
                        type: "name",
                        title: "Configuration Type",
                        content: "Select a configuration type for 6rd mechanism. Select <b>Auto</b> to obtain the following parameters automatically or <b>Manual</b> to enter the 6rd information provided by your ISP. If you select <b>Auto</b>, make sure that a Dynamic IP connection is selected under the <b>WAN Connection</b>."
                    }, {
                        type: "name",
                        title: "IPv4 Mask Length",
                        content: "The IPv4 mask length of the selected WAN connection."
                    }, {
                        type: "name",
                        title: "6rd Prefix",
                        content: "The prefix of the 6rd tunnel."
                    }, {
                        type: "name",
                        title: "6rd Prefix Length",
                        content: "The length of the 6rd prefix."
                    }, {
                        type: "name",
                        title: "Border Relay IPv4 Address",
                        content: "The IPv4 address of the 6rd Border Relay for a given 6rd domain, which is used to send packets to a Border Relay in order to reach IPv6 destinations outside of the 6rd domain."
                    }]
                }, {
                    type: "name",
                    title: "6to4",
                    content: "Select this tunneling mechanism if your ISP uses 6to4 deployment for assigning address.",
                    children: [{
                        type: "name",
                        title: "WAN Connection",
                        content: "Select a WAN connection from the drop-down list."
                    }]
                }]
            }]
        },
        openvpnServer: {
            TITLE: "OpenVPN",
            CONTENT: [{
                type: "paragraph",
                content: "With OpenVPN, you can use the Internet to securely access the network when you are out of home. To use the VPN Service, you need to configure Dynamic DNS Service (recommended) or assign a static IP address for the router’s WAN port. And the System Time should be synchronized with Internet."
            }, {
                type: "name",
                title: "Service Type",
                content: "Select the communication protocol for the OpenVPN server: UDP or TCP."
            }, {
                type: "name",
                title: "Service Port",
                content: "Enter a communication port number between 1024 and 65535. The default and common service port is 1194."
            }, {
                type: "name",
                title: "VPN Subnet/Netmask",
                content: "Enter the range of IP addresses that can be leased to the clients by the OpenVPN server."
            }, {
                type: "name",
                title: "Client Access",
                content: "Select the access type for the OpenVPN client.",
                children: [{
                    type: "name",
                    title: "Home Network Only",
                    content: "Client can only access the home network. The client's default route will not be changed."
                }, {
                    type: "name",
                    title: "Internet and Home Network",
                    content: "Client can access the home network, and Internet sites or services with a geographic limitation when you are out of the country. The client's default route will be altered."
                }]
            }, {
                type: "title",
                content: "Certificate"
            }, {
                type: "paragraph",
                content: "Use the certificate for the information and identity of VPN connection for remote clients.<br />Click Generate to generate a new certificate."
            }, {
                type: "title",
                content: "Configuration File"
            }, {
                type: "paragraph",
                content: "Remote clients will use the configuration file to access the router.<br />Click Export to save the OpenVPN configuration file."
            }, {
                type: "title",
                content: "VPN Client Installation Guide"
            }, {
                type: 'paragraph',
                content: "Before you configure the OpenVPN server, please configure Dynamic DNS Service (recommended) or assign a static IP address for WAN port. And make sure the external port of NAT settings is not the service port, and the System Time is synchronized with Internet."
            }, {
                type: "step",
                title: "To connect the client devices to the OpenVPN server:",
                content: [
                    "Select Enable VPN Server.",
                    "Configure the OpenVPN server parameters (Service Type, Service Port, Client Access and VPN Subnet/Netmask) and click Save.",
                    "Click Export to save the configuration file.",
                    "On the client devices, download and install the OpenVPN client utility from the website openvpn.net.The official supported platforms include Windows, Mac OSX, and Linux.",
                    "Launch the OpenVPN client utility and add a new VPN connection using the saved configuration file to connect the client device to the VPN server."
                ]
            }, {
                type: "paragraph",
                content: "Note: To learn more about OpenVPN clients, visit the website openvpn.net."
            }]
        },
        pptpvpnServer: {
            TITLE: "PPTP VPN",
            CONTENT: [{
                type: "paragraph",
                content: "With PPTP VPN, you can use the Internet to easily and rapidly access the network when you are out of home. It may be prevented by some ISP. To use the VPN Service, you need to configure Dynamic DNS Service (recommended) or assign a static IP address for the router’s WAN port. And the System Time should be synchronized with Internet."
            }, {
                type: "name",
                title: "Client IP Address",
                content: "Enter the range of IP addresses (up to 10 clients) that can be leased to the clients by the PPTP VPN server."
            }, {
                type: "name",
                title: "Username and Password",
                content: "Enter the username and password to authenticate clients to the PPTP VPN server."
            }, {
                type: "title",
                content: "VPN Client Installation Guide"
            }, {
                type: "paragraph",
                content: "Before you configure the PPTP VPN server, please configure Dynamic DNS Service (recommended) or assign a static IP address for the WAN port. Please make sure the external port of NAT settings is not 1723 and the System Time is synchronized with Internet."
            }, {
                type: "step",
                title: "To connect the client devices to the PPTP VPN server:",
                content: [
                    "Select Enable VPN Server.",
                    "Configure the PPTP VPN server parameters and click Save.",
                    "On the client devices, create a PPTP VPN connection. The official supported platforms include Windows, Mac OSX, Linux, iOS, and Android.",
                    "Launch the PPTP VPN program, add a new connection and enter the domain name of the registered DDNS service or the static IP address that is assigned to the WAN port, to connect the client device to the PPTP VPN server."
                ]
            }]
        },
        vpnStatus: {
            TITLE: "VPN Connections",
            CONTENT: [{
                type: "paragraph",
                content: "This page displays the clients that are currently connected to the OpenVPN servers, PPTP VPN servers and IPSec VPN hosted on the router."
            }]
        },
        qosSettings: {
            TITLE: "QoS",
            CONTENT: [{
                type: "paragraph",
                content: "The QoS (Quality of Service) helps to prioritize the Internet traffic based on the needs. You can specify the priority level for a device or an application in the QoS Rules List."
            }, {
                type: "name",
                title: "Line Type",
                content: "Select the correct line type of your broadband connection."
            }, {
                type: "name",
                title: "Max Upstream/Downstream Rate",
                content: "Displays the max upstream/downstream rate of packets transmitted through the WAN port in theory."
            }, {
                type: "name",
                title: "Upload Bandwidth",
                content: "Enter the maximum upload bandwidth provided by the ISP."
            }, {
                type: "name",
                title: "Download Bandwidth",
                content: "Enter the maximum download bandwidth provided by the ISP."
            }, {
                type: "name",
                title: "IPTV QoS",
                display: "INCLUDE_IPTV==1",
                content: "The IPTV QoS helps to prioritize the IPTV traffic based on the IPTV Priority and the percentage of the corresponding priority configured in the Advanced section. By default, the IPTV Priority is high."
            }, {
                type: "name",
                title: "IPTV Priority",
                display: "INCLUDE_IPTV==1",
                content: "Specify the priority level for IPTV traffic."
            }, {
                type: "name",
                title: "VoIP QoS",
                display: "INCLUDE_VOIP==1",
                content: "The VoIP QoS helps to distribute specific bandwidth to the VoIP traffic. The distributed bandwidth varies depending on the model and software version of the router."
            }, {
                type: "name",
                title: "Advanced",
                children: [{
                    type: "name",
                    title: "High/Middle/Low Priority",
                    content: "Specify a percentage for the high/middle/low priority traffic."
                }, {
                    type: "paragraph",
                    content: "Note: <br>1. The maximum amount (percentage) of all priorities is 100%.<br>2. The percentage of the high/middle/low priority must meet the following requirement: high > middle > low."
                }]
            }, {
                type: "title",
                content: "QoS Rule List"
            }, {
                type: "paragraph",
                content: "Here you can add detailed QoS rules to proritize the Internet traffic."
            }, {
                type: "step",
                title: "To set up a QoS rule",
                content: [
                    "Click Add.",
                    "Select a priority type to add the QoS rule.<br>By Device - Click Scan to select the desired device, or manually enter a device name and its MAC address.<br>By Application - Select the desired application or customize an application by configuring the name, protocol and destination port (1-65535).  You can enter a single port or a port range (e.g. 21 or 36-105).",
                    "Click Save."
                ]
            }, {
                type: "paragraph",
                content: "Note: You can drag a rule among different priority lists to change its priority."
            }]
        },
        qosDatabase: {
            TITLE: "Database Upgrade",
            CONTENT: [{
                type: "paragraph",
                content: "We will release the latest database version on www.tp-link.com. You can download and update the router's database to extend its supported applications."
            }, {
                type: "name",
                title: "New Database File",
                content: "Click Browse to locate the latest database file. Select it and click Upgrade to upgrade the database to the latest version."
            }]
        },
        portFiltering: {
            TITLE: "Service Filtering",
            CONTENT: [{
                type: "paragraph",
                content: "With Service Filtering, you can prevent certain users from accessing the specified service, even block Internet access completely."
            }, {
                type: "title",
                content: "Filtering List"
            }, {
                type: "paragraph",
                content: "This table displays the details of all the filtering rules."
            }, {
                type: "step",
                title: "To add a filtering rule:",
                content: [
                    "Toggle On Service Filtering.",
                    "Click Add.",
                    "Select a service type from the drop-down list and the following four fields will be auto-populated. Select Custom when your desired service type is not listed, and enter the information manually.",
                    "Specify the IP address(es) that this filtering rule will apply to.",
                    "Click Save."
                ]
            }, {
                type: "paragraph",
                content: "Note: If you want to disable this entry, click the Bulb icon."
            }]
        },
        ddos: {
            TITLE: "Firewall",
            CONTENT: [{
                type: "paragraph",
                content: "SPI (Stateful Packet Inspection) Firewall prevents cyber attacks and validates the traffic that is passing through the router based on the protocol. By default, this feature is enabled."
            }, {
                type: "title",
                content: "DoS Protection"
            }, {
                type: "paragraph",
                content: "DoS (Denial of Service) Protection protects the LAN against DoS attacks from flooding the network with server requests. You can filter the following three kinds of attacks according to the needs. There are four levels for each filtering:"
            }, {
                type: "paragraph",
                content: "",
                children: [{
                    type: "name",
                    title: "Off",
                    content: "No protection."
                }, {
                    type: "name",
                    title: "Low",
                    content: "Low-level of protection and low impact on router performance."
                }, {
                    type: "name",
                    title: "Middle",
                    content: "Moderate-level of protection and semi-noticeable impact on router performance."
                }, {
                    type: "name",
                    title: "High",
                    content: "High-level of protection but a noticeable impact on router performance."
                }]
            }, {
                type: "name",
                title: "ICMP-Flood Attack Filtering",
                content: "Enable to prevent the ICMP (Internet Control Message Protocol) flood attack."
            }, {
                type: "name",
                title: "UDP-Flood Attack Filtering",
                content: "Enable to prevent the UDP (User Datagram Protocol) flood attack."
            }, {
                type: "name",
                title: "TCP-Flood Attack Filtering",
                content: "Enable to prevent the TCP-SYN (Transmission Control Protocol-Synchronize) flood attack."
            }, {
                type: "title",
                content: "Blocked DoS Host List"
            }, {
                type: "paragraph",
                content: "This table displays the IP address and MAC address of the blocked DoS host(s)."
            }, {
                type: "title",
                content: "DoS Protection Level Settings"
            }, {
                type: "paragraph",
                content: "The DoS Protection protects the router from ICMP-Flood, UDP-Flood, and TCP-SYN-Flood attacks. Here you can specify the thresholds to trigger the corresponding protection."
            }, {
                type: "name",
                title: "ICMP-Flood Protection Level",
                content: "Enter a value between 5 and 3600 to trigger the ICMP-Flood protection immediately when the number of ICMP packets exceeds the preset threshold value."
            }, {
                type: "name",
                title: "UDP-Flood Protection Level",
                content: "Enter a value between 5 and 3600 to trigger the UDP-Flood protection immediately when the number of UDP packets exceeds the preset threshold value."
            }, {
                type: "name",
                title: "TCP-SYN-Flood Protection Level",
                content: "Enter a value between 5 and 3600 to trigger the TCP-SYN-Flood protection immediately when the number of TCP-SYN packets exceeds the preset threshold value."
            }]
        },
        ledSchedule: {
            TITLE: "LED Control",
            CONTENT: [{
                type: "paragraph",
                content: "Once Night Mode is enabled, the LEDs will be off during the specified period everyday without affecting the router's performance."
            }, {
                type: "step",
                title: "To enable Night Mode",
                content: [
                    "Select Enable.",
                    "Specify a time period when the LEDs will be off.",
                    "Click Save."
                ]
            }]
        },
        restart: {
            TITLE: "Reboot",
            CONTENT: [{
                type: "paragraph",
                content: "The Reboot feature cleans the cache to enhance the running performance of the router. You can reboot the router manually or set it to reboot regularly."
            }, {
                type: "title",
                content: "To reboot manually"
            }, {
                type: "paragraph",
                content: "Click Reboot and wait a few minutes for the router to restart."
            }, {
                type: "title",
                content: "To reboot automatically"
            }, {
                type: "step",
                title: "",
                content: [
                    "Enable Auto Reboot.",
                    "Specify the Time when the router reboots and the Auto Reboot Interval to decide how often it reboots.",
                    "Click Save."
                ]
            }]
        },
        cloudBasic: {
            TITLE: "TP-Link Cloud",
            CONTENT: [{
                type: "paragraph",
                content: "TP-Link Cloud service lets you remotely monitor your network in real-time, access and manage your TP-Link devices from the Internet at anytime and anywhere."
            }, {
                type: "title",
                display: "$.helpControl.cloudLogin",
                content: "Account Information"
            }, {
                type: "paragraph",
                display: "$.helpControl.cloudLogin",
                content: "Displays your TP-Link Cloud account information. You can edit the account information by clicking the Edit icon."
            }, {
                type: "title",
                display: "$.helpControl.cloudLogin",
                content: "Device Information"
            }, {
                type: "paragraph",
                display: "$.helpControl.cloudLogin",
                content: "Displays your device information, including the cloud account that is managing the device."
            }, {
                type: "title",
                display: "$.helpControl.cloudLogin&&$.helpControl.cloudRole==0",
                content: "Bound Accounts"
            }, {
                type: "paragraph",
                display: "$.helpControl.cloudLogin&&$.helpControl.cloudRole==0",
                content: "This table displays all the cloud accounts that are currently bound to the device."
            }, {
                type: "step",
                display: "$.helpControl.cloudLogin&&$.helpControl.cloudRole==0",
                title: "To bind a user account",
                content: [
                    "Click Bind.",
                    "Enter the registered email that you want to bind.",
                    "Click Save."
                ]
            }]
        }
    };
})(jQuery);
