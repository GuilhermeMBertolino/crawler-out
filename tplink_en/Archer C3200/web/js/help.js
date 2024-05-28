// JavaScript Document
(function($) {
    $.helpContent = {
		trafficCtrl: {
            TITLE: "Bandwidth Control",
            CONTENT: [{
                    type: "paragraph",
                content: "Bandwidth Control allows you to configure the Upstream Bandwidth and Downstream Bandwidth of the network."
                },{
                    type: "name",
                    title: "Enable",
                    content: "Select the checkbox to enable the Bandwidth Control feature."
                },{
                    type: "name",
                    title: "Total Upstream Bandwidth ",
                    content: "Enter the total upload speed through the WAN port."
                }, {
                    type: "name",
                    title: "Total Downstream Bandwidth",
                    content: "Enter the download speed through the WAN port."
                },
                /*{
                    type: "name",
                    title: "IPTV Bandwidth Guarantee",
                    content: "Select the checkbox to enable IPTV Bandwidth Guarantee.",
                    children: [
                        {
                            type: "name",
                            title: "Upstream Bandwidth Guarantee",
                            content: "Enter a value to guarantee IPTV upstream bandwidth."
                        },
                        {
                            type: "name",
                            title: "Downstream Bandwidth Guarantee",
                            content: "Enter a value to guarantee IPTV downstream bandwidth."
                        }
                    ]
                },*/
			/*
                 {
                 type: "name",
                 title: "VoIP Bandwidth Guarantee",
                 content: ""
                 },
			*/
                {
                    type: "title",
                    content: "Controlling Rules"
                }, {
                    type: "name",
                    title: "Description",
                content: "Displays the controlled IP range or port range."
                }, {
                    type: "name",
                    title: "Priority",
                content: "Displays the priority level of the rule, where 1 is the highest priority level and 8 is the lowest priority level. The total upload and download bandwidth will be allocated to guarantee the Min rate of all bandwidth control rules."
            }, {
                    type: "name",
                    title: "Up (min/max) ",
                content: "Displays the minimum and maximum upload bandwidth in Kbps."
            }, {
                    type: "name",
                    title: "Down (min/max)",
                content: "Displays the minimum and maximum download bandwidth in Kbps."
            }, {
                    type: "name",
                    title: "Enable",
                content: "Indicates the current status of a rule. Click the Bulb icon to enable or disable the rule."
            }, {
                    type: "name",
                    title: "Modify",
                    content: "Displays options to Modify or Delete the corresponding rule."
            }, {
                type: "note",
                title: "To add a new rule",
                content: [
                    "Click Add. ",
                    "Enter a range of IP addresses to be controlled.",
                    "Enter a range of port numbers to be controlled.",
                    "Select the protocol type for this rule.",
                    "Select a priority level for this rule. (1 is the highest priority level.)",
                    "Enter the minimum and maximum upload bandwidth (in Kbps) through the WAN port.",
                    "Enter the minimum and maximum download bandwidth (in Kbps) through the WAN port.",
                    "Select Enable this entry.",
                    "Click OK."
                ]
            }, {
                    type: "paragraph",
                content: "<strong>To delete multiple rules</strong><br>In the Controlling Rules list, select the corresponding checkbox of the rules to be deleted and click Delete above the table."
            }]
        },
         accessControl: {
            TITLE: "Access Control",
            CONTENT: [{
                type: "paragraph",
                content: "Access Control is used to allow or block specific computers and other devices from accessing your network. When a device is blocked, it is able to get an IP address from the router, but unable to communicate with other devices or connect to the Internet. "
            }, {
                type: "paragraph",
                content: "<strong>Note:</strong>To use Access Control, enable this feature and follow the steps in the Application Guide. If Access Control is disabled (Off), all devices can access your network, including the blacklisted ones."
            }, {
                type: "name",
                title: "Access Control",
                content: "Toggle On to enable Access Control feature."
            }, {
                type: "title",
                content: "Access Mode"
            }, {
                type: "name",
                title: "Blacklist",
                content: "Select to block access from the devices in the list below."
            }, {
                type: "name",
                title: "Whitelist",
                content: "Select to allow access only from the devices in the list below."
            }, {
                type: "title",
                content: "Devices in Black/Whitelist"
            }, {
                type: "note",
                title: "<strong>To blacklist or whitelist a device</strong>",
                content: [
                    "Click the Add icon.",
                    "Enter the Device Name.",
                    "Enter the MAC address of the device.",
                    "Click OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>To modify or delete a device in the Black/Whitelist</strong><br>In the Black/Whitelist table, click the Edit icon or the Trash icon that corresponds to the device you wish to modify or delete."
            }, {
                type: "paragraph",
                content: "<strong>To delete multiple devices in the Black/Whitelist</strong><br>In the Black/Whitelist table, select all devices that you wish to delete, click Delete above the table."
            }, {
                type: "title",
                content: "Devices Online"
            }, {
                type: "name",
                title: "Device Name",
                content: "Displays the name of the connected device."
            }, {
                type: "name",
                title: "IP Address",
                content: "Displays the IP address of the connected device."
            }, {
                type: "name",
                title: "MAC Address",
                content: "Displays the MAC address of the connected device."
            }, {
                type: "name",
                title: "Connection Type",
                content: "Displays the connection type of the connected device, either wired or wireless. "
            }, {
                type: "paragraph",
                content: "<strong>To block one or multiple devices</strong><br>In the Devices Online table, select the devices that you wish to block, click Block above the table. The selected devices will be automatically added to the Devices in Blacklist."
            }]
        },
        arpBind: {
            TITLE: "Settings",
            CONTENT: [{
                    type: "paragraph",
                    content: "IP & MAC Binding (also known as ARP Binding) is useful for controlling access of a specific computer in the LAN by binding the IP address and the MAC address of the device together. IP & MAC binding also prevents other devices from using a specific IP address."
            }, {
                    type: "name",
                    title: "IP & MAC Binding",
                content: "Toggle On to enable the IP & MAC Binding feature."
            }, {
                    type: "title",
                    title: "Binding List"
            }, {
                    type: "note",
                    title: "<strong>To set up a device with ARP binding</strong>",
                    content: [
                        "Click Add.",
                        "Enter the MAC Address of the device.",
                        "Enter an IP Address that you want bind to the above MAC address.",
                        "Select Enable.",
                        "Click OK."
                    ]
            }, {
                    type: "paragraph",
                    content: "<strong>To modify or delete an entry</strong><br>In the Binding List, click the Edit icon or the Trash icon that corresponds to the entry you wish to modify or delete."
            }, {
                    type: "paragraph",
                content: "<strong>To delete multiple entries</strong><br>In the Binding List, select the entries that you wish to delete, click Delete above the table."
            }, {
                    type: "title",
                    title: "ARP List"
            }, {
                    type: "paragraph",
                    content: "Displays the MAC and IP addresses of the currently connected devices."
            }, {
                    type: "name",
                    title: "Device Name",
                    content: "Displays the name of the connected device."
            }, {
                    type: "name",
                    title: "MAC Address",
                    content: "Displays the MAC address of the connected device."
            }, {
                    type: "name",
                    title: "IP Address",
                    content: "Displays the IP address allocated to the connected device."
            }, {
                    type: "name",
                    title: "Bound",
                    content: "Indicates whether the MAC and IP addresses are bound or not."
            }, {
                    type: "name",
                    title: "Modify",
                    content: "Displays options to Delete the corresponding entry from the list."
            }, {
                    type: "paragraph",
                    content: "<strong>Note: </strong>You cannot bind the same IP address to more than one MAC address."
            }, {
                    type: "paragraph",
                content: "<strong>To bind multiple devices</strong><br>In the ARP List, select the devices that you wish to bind their IP addresses to their MAC addresses, click Bind above the table."
            }]
        },
        alg: {
            TITLE: "Application Layer Gateway (ALG)",
            CONTENT: [{
                type: "paragraph",
                content: "ALG allows customized Network Address Translation (NAT) traversal filters to be plugged into the gateway to support address and port translation for certain application layer \"control/data\" protocols: FTP, TFTP, H323 etc. Enabling ALG is recommended."
            }, {
                type: "name",
                title: "PPTP Pass-through",
                content: "Select the checkbox to enable the PPTP Pass-through feature to allow Point-to-Point sessions to be tunneled through an IP network and passed through the router."
            }, {
                type: "name",
                title: "L2TP Pass-through",
                content: "Select the checkbox to enable the PPTP Pass-through feature to allow Layer 2 Point-to-Point sessions to be tunneled through an IP network and passed through the router."
            }, {
                type: "name",
                title: "IPSec Pass-through",
                content: "Select the checkbox to enable the IPSec Pass-through feature to allow Internet Protocol Security (IPSec) to be tunneled through an IP network and passed through the router. IPSec uses cryptographic security services to ensure private and secure communications over IP networks."
            }, {
                type: "name",
                title: "FTP ALG",
                content: "Select the checkbox to enable the FTP ALG feature to allow FTP (File Transfer Protocol) clients and servers to transfer data via NAT."
            }, {
                type: "name",
                title: "TFTP ALG",
                content: "Select the checkbox to enable the TFTP ALG feature to allow TFTP (Trivial File Transfer Protocol) clients and servers to transfer data via NAT."
            }, {
                type: "name",
                title: "RTSP ALG",
                content: "If selected, it allows media player clients to communicate with streaming media servers via NAT."
            }, {
                type: "name",
                title: "H323 ALG",
                content: "Select the checkbox to enable the H323 ALG feature to allow Microsoft NetMeeting clients to communicate via NAT."
            }, {
                type: "name",
                title: "SIP ALG",
                content: "Select the checkbox to enable the SIP ALG feature to allow SIP clients and servers to transfer data across NAT."
            }, {
                type: "name",
                title: "Save",
                content: "Click to save all your settings."
            }]
        },
        virtualServer: {
            TITLE: "Virtual Servers",
            CONTENT: [{
                type: "paragraph",
                content: "Virtual Servers are used to set up public services on your local network. A virtual server is defined as an external port, and all requests from the Internet to this external port will be redirected to a designated computer, which must be configured with a static or reserved IP address."
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
                type: "name",
                title: "Status",
                content: "Indicates the current status of a virtual server. Click the Bulb icon to enable (or disable) the virtual server entry."
            }, {
                type: "name",
                title: "Modify",
                content: "Displays options to Modify or Delete the corresponding rule."
            }, {
                type: "note",
                title: "<strong>To add a virtual server entry</strong>",
                content: [
                    "Click Add.",
                    "Select an interface name from the drop-down list.",
                    "Click View Existing Applications to select a service from the list to automatically populate the appropriate port number in the External Port and Internal Port fields. If the service is not listed, enter the external port number (e.g. 21) or a range of ports (e.g. 21-25). Leave the Internal Port blank if it is the same as the External Port or enter a specific port number (e.g. 21) if the External Port is a single port. ",
                    "Enter the IP address of the computer running the service application in the dotted decimal format into the Internal IP field.",
                    "Select a protocol for the service application: TCP, UDP, or All from the Protocol drop-down list.",
                    "Select Enable this entry.",
                    "Click OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>To modify or delete a virtual server entry</strong><br>Click the Edit or Trash icon of the corresponding entry."
            }, {
                type: "paragraph",
                content: "<strong>To delete multiple entries</strong><br>Select all virtual server entries that you wish to delete, click Delete above the table."
            }, {
                type: "paragraph",
                content: "<strong>Note:</strong><br>If your local host device is hosting more than one type of available services, you need to create a virtual server for each service."
            }]
        },
        portTrigger: {
            TITLE: "Port Triggering",
            CONTENT: [{
                type: "paragraph",
                content: "Port Triggering is used to forward traffic on a certain port to a specific server on the network.  "
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
                content: "Displays the port or port range used by the remote system. A response using one of these ports will be forwarded to the PC which triggers this rule. You can input at most 5 groups of ports (or port sections). Each group of ports must be separated with a comma, for example, 2000-2038, 2046, 2050-2051, 2085, 3010-3030."
            }, {
                type: "name",
                title: "External Protocol",
                content: "Displays the protocol used for Incoming Port: TCP, UDP, or ALL (all protocols supported by the router)."
            }, {
                type: "name",
                title: "Status",
                content: "Indicates the current status of a port triggering entry. Click the Bulb icon to enable (or disable) the entry."
            }, {
                type: "name",
                title: "Modify",
                content: "Displays options to Modify or Delete the corresponding entry."
            }, {
                type: "note",
                title: "<strong>To set up a port triggering entry</strong><br><strong>Note: </strong> Each entry can only be used by one host at a time.",
                content: [
                    "Click Add.",
                    "Select an interface name from the drop-down list.",
                    "Click View Existing Applications to select an application from the list to automatically populate the default values into the appropriate fields. If you want to add an unlisted application, manually enter the Application, Triggering Port, Triggering Protocol, External Port and External Protocol.<br><strong>Note: </strong> Port triggering entries cannot have any port ranges overlap each other (e.g. Entry 1 has the port range 4200-4205, which means Entry 2 cannot have port range from 4203-4206).",
                    "Select Enable this entry.",
                    "Click OK."
                ]
            }, {
                type: "paragraph",
                content: "<strong>To modify or delete a port triggering entry</strong><br>In the table, click the Edit icon or the Trash icon that corresponds to the entry that you wish to modify or delete."
            }, {
                type: "paragraph",
                content: "<strong>To delete multiple port triggering entries</strong><br>In the table, select all entries that you wish to delete and click Delete above the table."
            }]
        },
        dmz: {
            TITLE: "DMZ",
            CONTENT: [{
                type: "paragraph",
                content: "The DMZ (Demilitarized Zone) host feature allows a local host to be exposed to the Internet for a special-purpose service, such as Internet gaming or video conferencing. Basically, the DMZ allows a single computer on your LAN to open all its ports. This computer needs to be configured with a static IP address and have its DHCP client feature disabled."
            }, {
                type: "note",
                title: "<strong>To assign a computer or server to be a DMZ server</strong>",
                content: [
                    "Select Enable DMZ.",
                    "Enter the IP address of the local computer to be the DMZ host.",
                    "Click Save."
                ]
            }]
        },
        upnp: {
            TITLE: "UPnP",
            CONTENT: [{
                type: "paragraph",
                content: "By default, the Universal Plug-and-Play (UPnP) feature is enabled to allow devices, such as computers and Internet appliances, to automatically discover and communicate with each other on the local network."
            }, {
                type: "name",
                title: "UPnP",
                content: "Toggle On to enable UPnP feature."
            }, {
                type: "title",
                content: "UPnP Service List"
            }, {
                type: "paragraph",
                content: "The UPnP Service List displays the UPnP device information."
            }, {
                type: "name",
                title: "Total Clients",
                content: "Displays the total number of the UPnP devices."
            }, {
                type: "name",
                title: "Service Description",
                content: "Displays a brief description of the local host that initiates the UPnP request."
            }, {
                type: "name",
                title: "External Port",
                content: "Displays the external port that is opened by the local host."
            }, {
                type: "name",
                title: "Protocol",
                content: "Displays the network protocol type that is used by the local host."
            }, {
                type: "name",
                title: "Internal IP Address",
                content: "Displays the IP address of the local host."
            }, {
                type: "name",
                title: "Internal Port",
                content: "Displays the internal port that is opened by the local host."
            }, {
                type: "paragraph",
                content: "Click <strong>Refresh</strong> to update the UPnP Server List."
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
                    type: "name",
                    title: "Allow guests to see each other",
                    content: "Select this checkbox to allow wireless devices on the Guest Network to intercommunicate with each other."
            }, {
                    type: "name",
                    title: "Allow guests to access my local network",
                    content: "Select this checkbox to allow wireless devices on the Guest Network to access your local network."
            }, {
               /* "type": "name",
                "title": "Allow guests to access my USB storage sharing",
                "content": ""
            }, {
                "type": "name",
                "title": "Enable guest network bandwidth control",
                "content": ""
            }, {*/
                type: "name",
                title: "Save",
                content: "Click to save all your settings."
            }, {
                type: "title",
                content: "Wireless Settings"
            }, {
                type: "name",
                title: "2.4GHz | 5GHz-1 | 5GHz-2 Guest Network",
                content: "Click the corresponding button to enable the 2.4GHz | 5GHz-1 | 5GHz-2 Guest Network."
            }, {
                    type: "name",
                    title: "Guest Network SSID",
                    content: "Either use the default SSID or create a new name using 1 to 32 characters. This field is case-sensitive."
            }, {
                /*"type": "name",
                "title": "Hide SSID",
                "content": "Select this checkbox if you want to hide the Guest SSID from the Wi-Fi network list."
            }, {*/
                type: "name",
                title: "Security",
                    content: "Select a security option for the Guest Network:",
                children: [{
                            type: "name",
                            title: " None",
                            content: "By default, the Guest network security is set to None; anyone can access."
                }, {
                            type: "name",
                            title: "WPA/WPA2 - Personal",
                            content: "Select this option to enable the standard authentication method based on a Pre-shared Key (PSK), also called passphrase. If selected, configure the following.",
                            children: [{
                                type: "name",
                                title: "Version",
                                content: "Select a security version for your Guest Network.",
                                children: [{
                                    type: "name",
                                    title: "Auto",
                                    content: "This option supports multiple implementation of the WPA (Wi-Fi Protected Access) standard, such as WPA and WPA2."
                                }, {
                                    type: "name",
                                    title: "WPA2-PSK",
                                    content: "This option support AES encryption that provides a better level of security than WPA-PSK and is recommended."
                                }]
                            }, {
                                type: "name",
                                title: "Encryption",
                                content: "Select a security encryption type: Auto (for both TKIP and AES), TKIP (Temporal Key Integrity Protocol), or AES (Advanced Encryption Standard). It is NOT recommended to use the TKIP encryption if the router operates in 802.11n mode, because TKIP is not supported by 802.11n specification. If TKIP is selected, WPS function will be disabled."
                            }]
                        }

                    ]
                },

                {
                    type: "name",
                    title: "Password",
                    content: "Create a password between 8 and 63 ASCII characters or between 8 and 64 hexadecimal characters (0-9, a-f, A-F)."
            }, {
                    type: "paragraph",
                    content: "The instructions for 2.4GHz Guest Network above also apply to 5GHz-1 | 5GHz-2 Guest Network."
                }, {
                    type: "name",
                    title: "Save",
                    content: "Click to save all your settings."
                }
            ]
        },
        wirelessStat: {
            TITLE: "Online Devices",
            CONTENT: [{
                type: "name",
                title: "MAC Address",
                content: "Displays the MAC address of the associated wireless client."
            }, {
                type: "name",
                title: "Connection Type",
                content: "Displays the frequency band (2.4GHz or 5GHz) that the wireless client is connected to."
            }, {
                type: "name",
                title: "Security",
                content: "Displays the security type (None, WEP, WPA/WPA2-Personal, or WPA/WPA2-Enterprise) of the associated wireless client."
            }, {
                type: "name",
                title: "Received Packets",
                content: "Displays the number of packets received by the associated wireless client."
            }, {
                type: "name",
                title: "Sent Packets",
                content: "Displays the number of packets sent by the associated wireless client."
            }, {
                type: "paragraph",
                content: "Click <strong>Refresh</strong> to update the information on this page."
            }]
        },
        wirelessAdv: {
            TITLE: "Advanced Settings",
            CONTENT: [{
                type: "name",
                title: "2.4GHz | 5GHz-1 | 5GHz-2",
                content: "Select 2.4GHz | 5GHz-1 | 5GHz-2 to set its advanced wireless settings."
            }, {
                type: "name",
                title: "Beacon Interval",
                content: "Enter a value between 25 and 1000 in milliseconds to determine the duration between which beacon packets are broadcasted by the router to synchronize the wireless network. The default is 100 milliseconds."
            }, {
                type: "name",
                title: "RTS Threshold",
                content: "Enter a value between 1 and 2346 to determine the packet size of data transmission through the router. By default, the RTS (Request to Send) Threshold size is 2346. If the packet size is greater than the preset threshold, the router sends Request to Send frames to a particular receiving station and negotiates the sending of a data frame, or else the packet will be sent immediately."
            }, {
                type: "name",
                title: "DTIM Interval",
                content: "Enter a value between 1 and 255 to determine the interval of the Delivery Traffic Indication Message (DTIM). 1 indicates the DTIM Interval is the same as Beacon Interval."
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
                content: "This feature is enabled by default and recommended to increase the data capacity by reducing the Guard Interval (GI) time."
            }, {
                type: "name",
                title: "AP Isolation",
                content: " Select this checkbox to enable the AP Isolation feature that allows you to confine and restrict all wireless devices on your network from interacting with each other, but still able to access the Internet. AP isolation is disabled by default."
            }, {
                type: "title",
                content: "WDS"
                }, {
                type: "name",
                title: "WDS Bridging",
                content: "Select this checkbox to enable the WDS (Wireless Distribution System) Bridging feature to allow the router to bridge with another access point (AP) in a wireless local area network (WLAN). If enabled, configure the following:"
                }, {
                type: "name",
                title: "SSID (to be bridged)",
                content: "Enter the SSID of the WAP (Wireless Access Point) that your router will connect to as a client or use the Survey feature to scan and display all available networks within range."
                }, {
                type: "name",
                title: "MAC Address(to be bridged)",
                content: "Enter the MAC address in 12 hexadecimal characters (0-9, a-f, A-F) format separated by hyphens of the WAP that the router will connect to as a client. If you select a network through the Survey feature, the MAC address field is automatically populated."
                    }, {
                type: "name",
                title: "Survey",
                content: "Click this button to scan and display the MAC address, SSID, signal strength, channel, and security information of all available wireless networks within range. Once you select a network, the SSID, MAC Address, and Security will automatically populated.",
                children: [{
                    type: "name",
                    title: "AP List",
                    content: "Displays the information of the AP your router can connect to."
                }, {
                    type: "name",
                    title: "MAC Address",
                    content: "Displays the MAC address of the AP your router is going to connect to as a client."
                }, {
                    type: "name",
                    title: "SSID",
                    content: "Displays the SSID of the AP your router is going to connect to as a client."
                }, {
                    type: "name",
                    title: "Signal Strength",
                    content: "Displays the Signal Strength of the AP your router is going to connect to as a client."
                }, {
                    type: "name",
                    title: "Channel",
                    content: "Displays the Channel of the AP your router is going to connect to as a client."
                }, {
                    type: "name",
                    title: "Encryption",
                    content: "Displays the Encryption type of the AP your router is going to connect to as a client."
                }, {
                    type: "name",
                    title: "Connect",
                    content: "Click the icon to connect to or disconnect from the corresponding AP."
                }]
            }, {
                type: "name",
                title: "Security",
                content: "Select one of the following security options:",
                children: [{
                    type: "name",
                    title: "None",
                    content: "Select this option to disable the wireless security. It is highly recommended that you enable the wireless security to protect your wireless network from unauthorized access."
                }, {
                    type: "name",
                    title: "WPA/WPA2 Personal",
                    content: "Select this option to enable the standard authentication method based on a Pre-shared Key (PSK), also called passphrase. This option is recommended. If selected, configure the following.",
                    children: [{
                        type: "name",
                        title: "Version",
                        content: "Select a security version for your wireless network.",
                        children: [{
                            type: "name",
                            title: "WPA-PSK",
                            content: "This option supports AES encryption that provides a lower level of security than WPA2-PSK."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "This option supports AES encryption that provides a better level of security than WPA-PSK and is recommended."
                        }]
                    }, {
                        type: "name",
                        title: "Encryption",
                        content: "Select a security encryption type: TKIP (Temporal Key Integrity Protocol), or AES (Advanced Encryption Standard). It is NOT recommended to use the TKIP encryption if the router operates in 802.11n mode, because TKIP is not supported by 802.11n specification. If TKIP is selected, WPS function will be disabled."
                    }, {
                        type: "name",
                        title: "Password",
                        content: "Enter a wireless password between 8 and 63 ASCII characters, or between 8 and 64 hexadecimal characters into this field."
                    }]
                }, {
                    type: "name",
                    title: "WEP",
                    content: "Select this option to enable basic authentication method if any version of your client devices can only access the wireless using WEP (Wired Equivalent Privacy).",
                    children: [{
                        type: "name",
                        title: "Type",
                        content: "Select an authentication type for your wireless network. Select Open System or Shared Key based on the capability and access request of the wireless client."
                    }, {
                        type: "name",
                        title: "WEP Key Format",
                        content: "Either select ASCII format or Hexadecimal. ASCII format is a combination of alphabetic and numeric characters. Hexadecimal format is a combination of the number (0-9) and letters (A-F, a-f)."
                    }, {
                        type: "name",
                        title: "Key Index",
                        content: "Select which of the four keys will be used and enter the matching WEP key that you create in the Key Value field. Make sure these values are identical on all wireless stations in your network."
                    }, {
                        type: "name",
                        title: "Key Value",
                        content: "Enter the matching WEP key that you create."
                    }]
                }]
            }, {
                type: "name",
                title: "Save",
                content: "Click to save the settings."
            }]
        },
        wirelessSchedule: {
            TITLE: "Wireless Schedule",
            CONTENT: [{
                type: "paragraph",
                content: "The Effective Time Schedule is based on the time of the Router. The time can be set in System Tools -> Time Settings"
            }, {
                    type: "name",
                    title: "2.4GHz | 5GHz-1 | 5GHz-2",
                    content: "Select 2.4GHz, 5GHz-1 or 5GHz-2 to set its wireless schedule."
            }, {
                    type: "name",
                title: "Wireless Schedule",
                content: "Toggle On to enable this feature. Then, click and drag across the cells to set the time period to turn off wireless."
            }, {
                    type: "name",
                    title: "Restore",
                content: "Click to the restore time selection."
            }, {
                    type: "name",
                    title: "Save",
                    content: "Click to save the settings."
            }]
        },
        macFilter: {
            TITLE: "MAC Filter Settings",
            CONTENT: [{
                type: "name",
                title: "MAC Filtering",
                content: "Toggle On to control wireless access using the MAC address of individual devices."
            }, {
                type: "title",
                title: "Filtering Rules"
            }, {
                type: "name",
                title: "Block wireless access from the devices in the below list.",
                content: "Select to block wireless access from the devices in the list below."
            }, {
                type: "name",
                title: "Allow wireless access from the devices only in the below list.",
                content: "Select to allow wireless access only from the devices in the list below."
            }, {
                type: "title",
                title: "Devices List"
            }, {
                type: "name",
                title: "MAC Address/Description",
                content: "Displays the MAC address and description of the device."
            }, {
                type: "name",
                title: "Enable",
                content: "Click the Bulb icon to enable or disable the MAC filtering of the device."
            }, {
                type: "name",
                title: "Modify",
                content: "Displays options to Modify or Delete the corresponding entry."
            }, {
                type: "note",
                title: "To add a new device",
                content: [
                    "Click Add.",
                    "Enter the MAC address of the device.",
                    "Enter a description of the device.",
                    "Click Enable this entry.",
                    "Click OK."
                ]
            }]
        },
        wirelessSettings: {
            TITLE: "Wireless Settings",
            CONTENT: [/*{
                type: "name",
                title: "Region",
                content: "Select your region from the drop-down list. This field specifies the region where the wireless function of the router can be used. It may be illegal to use the wireless function of the router in a region other than one of those specified in this field. If your country or region is not listed, please contact your local government agency for assistance."
            }, */{
                type: "name",
                title: "Smart Connect",
                content: "Select this checkbox to enable Smart Connect. This function helps devices run faster by assigning them to best wireless bands based on actual conditions to balance network demands."
            }, {
                type: "name",
                title: "2.4GHz | 5GHz-1 | 5GHz-2",
                content: "Select 2.4GHz | 5GHz-1 | 5GHz-2 to change the corresponding settings."
            }, {
                type: "name",
                title: "Wireless Radio",
                content: "Select this checkbox to enable the 2.4GHz | 5GHz-1 | 5GHz-2 wireless radio frequency."
            }, {
                type: "name",
                title: "Wireless Network Name (SSID)",
                content: "You can leave the default Network Name (SSID) as is, or create a new name (up to 32 characters). This field is case-sensitive."
            }, {
                type: "name",
                title: "Hide SSID",
                content: "Select this checkbox if you want to hide the 2.4GHz | 5GHz-1 | 5GHz-2 network name (SSID) from the Wi-Fi network list."
            }, {
                type: "name",
                title: "Security",
                content: "Select one of the following security options:",
                children: [{
                    type: "name",
                    title: "No Security",
                    content: "Select this option to disable the wireless security. It is highly recommended that you enable the wireless security to protect your wireless network from unauthorized access."
                }, {
                    type: "name",
                    title: "WPA/WPA2 Personal",
                    content: "Select this option to enable the standard authentication method based on a Pre-shared Key (PSK), also called passphrase. This option is recommended. If selected, configure the following.",
                    children: [{
                        type: "name",
                        title: "Version",
                        content: "Select a security version for your wireless network.",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "This option supports multiple implementation of the WPA (Wi-Fi Protected Access) standard, such as WPA and WPA2."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "This option supports AES encryption that provides a better level of security than WPA-PSK and is recommended."
                        }]
                    }, {
                        type: "name",
                        title: "Encryption",
                        content: "Select a security encryption type: Auto (for both TKIP and AES), TKIP (Temporal Key Integrity Protocol), or AES (Advanced Encryption Standard). It is NOT recommended to use the TKIP encryption if the router operates in 802.11n mode, because TKIP is not supported by 802.11n specification. If TKIP is selected, WPS function will be disabled."
                    }, {
                        type: "name",
                        title: "Password",
                        content: "Create a wireless password between 8 and 63 ASCII characters, or between 8 and 64 hexadecimal characters into this field."
                    }]
                }, {
                    type: "name",
                    title: "WPA/WPA2 Enterprise",
                    content: "Select this option to enable the more advanced authentication method using a RADIUS (Remote Authentication Dial In User Service) server. If selected, WPS function will be disabled.",
                    children: [{
                        type: "name",
                        title: "Version",
                        content: "Select a security version for your wireless network.",
                        children: [{
                            type: "name",
                            title: "Auto",
                            content: "This option supports multiple implementation of the WPA (Wi-Fi Protected Access) standard, such as WPA and WPA2."
                        }, {
                            type: "name",
                            title: "WPA2-PSK",
                            content: "This option supports AES encryption that provides a better level of security than WPA and is recommended."
                        }]
                    }, {
                        type: "name",
                        title: "Encryption",
                        content: "Select a security encryption type: Auto (for both TKIP and AES), TKIP (Temporal Key Integrity Protocol), or AES (Advanced Encryption Standard). It is NOT recommended to use the TKIP encryption if the router operates in 802.11n mode, because TKIP is not supported by 802.11n specification. If TKIP is selected, WPS function will be disabled."
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
                    content: "Select this option to enable the basic authentication method if any version of your client devices can only access the wireless using WEP (Wired Equivalent Privacy).",
                    children: [{
                        type: "name",
                        title: "Type",
                        content: "Select an authentication type for your wireless network. The default is Auto, which automatically chooses Open System or Shared Key based on the capability and access request of the wireless client."
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
                            title: "64-bit encryption",
                            content: "Allows you to enter 10 hexadecimal digits (0-9, A-F, a-f) or 5 ASCII characters into the WEP Value field."
                        }, {
                            type: "name",
                            title: "128-bit encryption",
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
                content: "Select a transmission mixed mode."
            }, {
                type: "name",
                title: "Channel",
                content: "Select an operating channel for the wireless network. The default channel is Auto. Do not change it unless you are experiencing the intermittent wireless connection issue."
            }, {
                type: "name",
                title: "Channel Width",
                content: "Select a channel width (bandwidth) for the wireless network."
            }, {
                type: "name",
                title: "Transmit Power",
                content: "Select either High, Middle, or Low to specify the data transmit power. The default and recommended setting is High."
            }, {
                type: "paragraph",
                content: "Click <strong>Save</strong> to save all your settings."
            }]
        },
        wps: {
            TITLE: "Router PIN",
            CONTENT: [{
                /*type: "name",
                title: "2.4GHz | 5GHz-1 | 5GHz-2",
                content: "Select 2.4GHz | 5GHz-1 | 5GHz-2 to change the corresponding settings."
            }, {*/
                type: "name",
                title: "Router PIN",
                content: "Toggle On to allow wireless devices to connect to the router using the router’s PIN (Personal Identification Number)."
            }, {
                type: "name",
                title: "Current PIN",
                content: "Displays the router’s current PIN. The default PIN can be found on the label of the router or in the User Guide. Click Generate to generate a new PIN randomly or click Restore to restore the current PIN back to the default PIN."

            }, {
                type: "title",
                content: "WPS Settings"
            /*}, {
                type: "name",
                title: "2.4GHz | 5GHz-1 | 5GHz-2",
                content: "Select 2.4GHz | 5GHz-1 | 5GHz-2 to change the corresponding settings."
            }, {
                type: "name",
                title: "Enable WPS",
                content: "Toggle On to enable WPS feature."*/

            }, {
                type: "name",
                title: "Push Button (Recommended)",
                content: "Select this setup method to enable the WPS feature to easily connect any WPS-enabled device to your wireless network using the WPS button or virtually using the Connect button."
            }, {
                type: "name",
                title: "PIN Code",
                content: "Select this setup method to add a device manually by entering the wireless device's WPS PIN into the field."
            }, {
                type: "name",
                title: "Connect",
                content: "Click this button to initiate WPS."
            }]
        },
        parentCtrl: {
            TITLE: "Parental Controls",
            CONTENT: [{
                type: "paragraph",
                content: "With Parental Controls, you can block inappropriate, explicit and malicious websites; restrict access by certain times of day (for example, Facebook or YouTube during homework time)."
            }, {
                type: "name",
                title: "Status",
                content: "Toggle On to enable the Parental Controls feature. By default, this feature is disabled."
            }, {
                type: "title",
                content: "Devices under Parental Controls"
            }, {
                type: "paragraph",
                content: "Devices under Parental Controls displays the list of devices that are currently restricted by Parental Controls."
            }, {
                type: "name",
                title: "Device Name",
                content: "Displays the name of all connected client devices that are currently under Parental Controls."
            }, {
                type: "name",
                title: "MAC Address",
                content: " Displays the MAC address of all connected client devices that are currently under Parental Controls."
            }, {
                type: "name",
                title: "Effective Time",
                content: "Displays the access restriction time periods."
            }, {
                type: "name",
                title: "Description",
                content: "Displays a brief description of the connected device. "
            }, {
                type: "name",
                title: "Status",
                content: "Indicates whether or not Parental Controls is enabled for the corresponding device. Click the Bulb icon to enable (or disable) it."
            }, {
                type: "name",
                title: "Modify",
                content: "Displays options to Modify or Delete the corresponding device."
            }, {
                type: "note",
                title: "<strong>To restrict a new client device</strong>",
                content: [
                    'Click Add.',
                    'Click View Existing Devices to choose a currently connected device from the Access Devices List; or enter the Device Name and MAC Address manually to add a device that is not connected.',
                    'Click the Effective Time icon to specify a time period during which the restriction applies.',
                    'Enter a brief description into the Description field. This field is optional.',
                    'Select Enable.',
                    'Click OK to save this entry.'
                ]
            }, {
                type: "paragraph",
                content: "<b>To modify or delete a device</b><br>In the Devices under Parental Controls list, simply click the Edit icon or the Trash icon that corresponds to the device that you wish to modify or delete."
            }, {
                type: "paragraph",
                content: "<b>To delete multiple devices</b><br>In the Devices under Parental Controls list, select the corresponding checkbox of the devices to be deleted and click Delete above the table."
            }, {
                type: "title",
                title: "Content Restriction"
            }, {
                type: "paragraph",
                content: "Content Restriction allows you to restrict access to the content using keywords and domain names that the client devices being controlled by Parental Controls can or cannot access depending on the restriction type."
            }, {
                type: "name",
                title: "Restriction Type",
                content: "Select the following restriction type:",
                children: [{
                    type: "name",
                    title: "Blacklist",
                    content: "Contains keywords and domain names that will be used to block website access from the client devices specified in the Devices under Parental Controls list."
                }, {
                    type: "name",
                    title: "Whitelist",
                    content: "Contains keywords and domain names that client devices specified in the Devices under Parental Controls list are allowed to access."
                }]
            }, {
                type: "name",
                title: "Add a New Keyword",
                content: "Click to add a new keyword or domain name to the Blacklist or to the Whitelist. "
            }, {
                type: "paragraph",
                content: "To delete a keyword or domain name, click the - (minus) icon next to the item that you wish to delete."
            }, {
                type: "name",
                title: "Save",
                content: "Click to save your configuration."
            }]
        },
        wlGuestDulBandBasic: {
            TITLE: "Guest Network",
            CONTENT: [{
                type: "paragraph",
                content: "Guest Network allows you to set up a separate wireless network with a separate network name (SSID) and password that your guests can use to access the Internet."
            }, {
                type: "name",
                title: "Allow guests to see each other",
                content: "Select this checkbox to allow wireless devices on the Guest network to intercommunicate with each other."
            }, {
                type: "name",
                title: "Allow guests to access my local network",
                content: "Select this checkbox to allow wireless devices on the Guest network to access your local network."
            }, {
                type: "name",
                title: "Wireless Network 2.4GHz | 5GHz-1 | 5GHz-2",
                content: "Select the corresponding button to enable the 2.4GHz | 5GHz-1 | 5GHz-2 Guest Network."
            }, {
                type: "name",
                title: "Guest Network SSID",
                content: "Either use the default SSID or create a new name using 1 to 32 characters. This field is case-sensitive."
            }, {
                type: "name",
                title: "Hide SSID",
                content: "Select this checkbox if you want to hide the Guest Network SSID."
            }, {
                type: "name",
                title: "Security",
                content: "Select a security option for the Guest network:",
                children: [{
                    type: "name",
                    title: "None",
                    content: "By default, the Guest network security is set to None; anyone can access."
                }, {
                    type: "name",
                    title: "Set Password",
                    content: "Create a password for the Guest network between 8 and 63 ASCII characters or between 8 and 64 hexadecimal characters (0-9, a-f, A-F) in the Password field."
                }]
            }]
        },
        networkMap: {
            TITLE: "Internet",
            CONTENT: [{
                type: 'name',
                title: 'Internet Status',
                content: 'Displays the current status of the Internet connection of the router.'

            }, {
                type: 'name',
                title: 'Connection Type',
                content: 'Displays the type of your Internet connection. '
            }, {
                type: 'name',
                title: 'IP Address',
                content: 'Displays the current Internet IP address assigned to the router.'
            }, {
                type: 'name',
                title: 'DNS Server',
                content: ' Displays the IP addresses of the primary and secondary DNS servers.'
            }, {
                type: 'name',
                title: 'Gateway',
                content: 'Displays the IP address of the Gateway.'
            }, {
                type: 'title',
                title: 'Router'
            }, {
                type: 'title2',
                content: '2.4GHz | 5GHz-1 | 5GHz-2 Wireless'
            }, /*{
                type: 'name',
                title: 'Status',
                content: 'Displays whether the 2.4GHz | 5GHz-1 | 5GHz-2 wireless is on (enabled) or off (disabled).'
            },*/ {
                type: 'name',
                title: 'SSID',
                content: 'Displays the current wireless network name of the 2.4GHz | 5GHz-1 | 5GHz-2 band frequency.'
            }, {
                type: 'name',
                title: 'Channel',
                content: 'Displays the channel of which the wireless 2.4GHz | 5GHz-1 | 5GHz-2 network broadcasts.'
            }, {
                type: 'name',
                title: 'MAC',
                content: 'Displays the current MAC address of the wireless 2.4GHz | 5GHz-1 | 5GHz-2.'
            }, {
                type: 'title2',
                content: '2.4GHz | 5GHz-1 | 5GHz-2 Guest Network'
            }, {
                type: 'name',
                title: 'Status',
                content: 'Displays whether the 2.4GHz | 5GHz-1 | 5GHz-2 Guest Network is on (enabled) or off (disabled).'
            }, {
                type: 'name',
                title: 'SSID',
                content: 'Displays the wireless network name of Guest Network.'
            }, {
                type: 'title',
                title: 'Wireless/Wired Clients'
            }, {
                type: 'name',
                title: 'Name',
                content: ' Displays the name of the client connected to the router. '
            }, {
                type: 'name',
                title: 'IP Address',
                content: 'Displays the assigned IP address of the client.'
            }, {
                type: 'name',
                title: 'MAC Address',
                content: 'Displays the MAC address of the client.'
            }, {
                display: INCLUDE_VOIP,
                type: 'title',
                title: 'Phone'
            }, {
                display: INCLUDE_VOIP,
                type: 'name',
                title: 'Phone Name',
                content: 'Displays the name of your phone.'
            }, {
                display: INCLUDE_VOIP,
                type: 'name',
                title: 'Incoming Call Numbers',
                content: 'Displays the numbers used by your telephony devices to receive incoming calls through your router. '
            }, {
                display: INCLUDE_VOIP,
                type: 'name',
                title: 'Internal Number',
                content: 'Displays phone numbers that are used to make calls between telephony devices connected to the same router. It is preset and could not be changed.'
            }, {
                display: INCLUDE_VOIP,
                type: 'name',
                    title: 'Number of Outgoing',
                content: 'Displays the numbers used by your telephony devices to make outgoing calls through your router. The default is Auto, which means the router will select an available number to be the outgoing number which can be changed on the VoIP page.'
            }, {
                display: INCLUDE_USB,
                type: 'title',
                title: 'Printer'
            }, {
                display: INCLUDE_USB,
                type: 'name',
                title: 'Name',
                content: 'Displays the name of the printer connected to the router via USB port. '
            }, {
                display: INCLUDE_USB,
                type: 'title',
                title: 'USB Disk'
            }, {
                display: INCLUDE_USB,
                type: 'name',
                title: 'Brand',
                content: 'Displays the brand of the USB disk connected to the router.'
            }, {
                display: INCLUDE_USB,
                type: 'name',
                title: 'Total',
                content: 'Displays the total volume of the USB disk.'
            }, {
                display: INCLUDE_USB,
                type: 'name',
                title: 'Available',
                content: 'Displays the available space of the USB disk.'
            }]
        },
        wirelessBasic: {
            TITLE: "Wireless Settings",
            CONTENT: [{/*
                "type": "name",
                "title": "Smart Connect",
                "content": "Select this checkbox to enable smart connect . This function helps devices run faster by assigning them to best wireless bands based on actual conditions to balance network demands."
            }, {*/
                type: "name",
                title: "2.4GHz | 5GHz-1 | 5GHz-2 Wireless Network",
                content: "Select this checkbox to enable the 2.4GHz | 5GHz-1 | 5GHz-2 wireless radio frequency."
            }, {
                type: "name",
                title: "Wireless Network Name (SSID)",
                content: "You can leave the default Network Name (SSID) as is, or create a new name (up to 32 characters). This field is case-sensitive."
            }, {
                type: "name",
                title: "Password",
                content: "Create a wireless password between 8 and 63 ASCII characters, or between 8 and 64 hexadecimal characters. This field is case-sensitive."
            }, {
                type: "name",
                title: "Hide SSID",
                content: "Select this checkbox if you want to hide the 2.4GHz | 5GHz-1 | 5GHz-2 SSID from the Wi-Fi network list."
            }]
        },
        status: {
            TITLE: "Internet",
            CONTENT: [{
                    type: "paragraph",
                    content: "Displays relevant information about the Internet connection."
                }, {
                    type: "title2",
                    content: "IPv4"
                }, /*{
                    type: "name",
                    title: "Name",
                    content: "Displays the name of the Internet port of the router."
                },*/ {
                    type: "name",
                    title: "MAC Address",
                    content: "The unique physical address assigned to the Internet (WAN) port of the router."
                }, {
                    type: "name",
                    title: "IP Address",
                    content: "The IP address assigned to the Internet (WAN) port of the router. If the IP address is shown as 0.0.0.0, indicating no Internet access."
                }, {
                    type: "name",
                    title: "Subnet Mask",
                    content: "This parameter determines the network portion and the host portion of an IP address. "
                }, {
                    type: "name",
                    title: "Default Gateway",
                    content: " The IP address used to connect the router to the network."
                }, {
                    type: "name",
                    title: "Primary DNS/Secondary DNS",
                    content: "The Domain Name System (DNS) translates host names and internet domains to IP addresses. The information of these DNS servers is assigned by the Internet Service Provider (ISP)."
                }, {
                    type: "name",
                    title: "Connection Type",
                    content: "The current connection type of your Internet."
                }, {
                    type: "title2",
                    content: "IPv6"
                }, {
                    type: "name",
                    title: "MAC Address",
                    content: "The unique physical address assigned to the Internet (WAN) port of the router."
                }, {
                    type: "name",
                    title: "IP Address",
                    content: " The IPv6 address assigned to the Internet (WAN) port of the router."
                }, {
                    type: "name",
                    title: "Default Gateway",
                    content: " The IP address used to connect the router to the network."
                }, {
                    type: "name",
                    title: "Primary DNS/Secondary DNS",
                    content: "The Domain Name System (DNS) translates host names and internet domains to IP addresses. The information of these DNS servers is assigned by the Internet Service Provider (ISP)."
                }, {
                    type: "name",
                    title: "Connection Type",
                    content: "The current connection type of your Internet."
                },

                {
                    type: "title",
                    title: "Wireless"
                }, {
                    type: "name",
                    title: "2.4G | 5G-1 | 5G-2",
                    content: "Select to view the 2.4GHz | 5GHz-1 | 5GHz-2 wireless settings and information."
                }, {
                    type: "name",
                    title: "Network Name",
                    content: "The wireless network name, also known as SSID (Service Set Identifier)."
                }, {
                    type: "name",
                    title: "Wireless Radio",
                    content: "The current status (On or Off) of the wireless network."
                }, {
                    type: "name",
                    title: "Mode",
                    content: "The current wireless mode."
                }, {
                    type: "name",
                    title: "Channel Width",
                    content: "The channel bandwidth of the wireless network."
                }, {
                    type: "name",
                    title: "Channel",
                    content: "The current wireless channel and its corresponding frequency (in GHz)."
                }, {
                    type: "name",
                    title: "MAC Address",
                    content: "The MAC address of the wireless network radio."
                }, {
                    type: "title",
                    title: "LAN"
                }, {
                    type: "paragraph",
                    content: "Displays information about the Ethernet (LAN) ports."
                }, {
                    type: "title2",
                    content: "IPv4"
                }, {
                    type: "name",
                    title: "MAC Address",
                    content: "The unique physical address assigned to the Ethernet (LAN) port of the router."
                }, {
                    type: "name",
                    title: "IP Address",
                    content: "The IPv4 address assigned to the Ethernet (LAN) port of the router."
                }, {
                    type: "name",
                    title: "Subnet Mask",
                    content: "This parameter determines the network portion and the host portion of an IP address."
                }, {
                    type: "name",
                    title: "DHCP",
                    content: "Displays whether the router’s built-in DHCP server is active for devices on the LAN ports or not."
                }, {
                    type: "title2",
                    content: "IPv6"
                }, {
                    type: "name",
                    title: "MAC Address",
                    content: " The unique physical address assigned to the Ethernet (LAN) port of the router."
                }, {
                    type: "name",
                    title: "IP Address",
                    content: "The IPv6 address assigned to the Ethernet (LAN) port of the router."
                }, {
                    type: "name",
                    title: "Prefix Length",
                    content: "The length of the IPv6 address prefix."
                }, {
                    type: "name",
                    title: "Assigned Type",
                    content: "The IPv6 address type assigned to the LAN interface."
                }, {
                    type: "title",
                    title: "Guest Network"
                }, {
                    type: "name",
                    title: "2.4G | 5G-1 | 5G-2",
                    content: "Select to view the 2.4GHz | 5GHz-1 | 5GHz-2 Guest network settings and information."
                }, {
                    type: "name",
                    title: "Guest Network SSID",
                    content: " The wireless network name (SSID) of your Guest Network."
                }, {
                    type: "name",
                    title: "Hide SSID",
                    content: "Displays whether the wireless network name (SSID) of the Guest Network is hidden (On) or not (Off)."
                }, {
                    type: "name",
                    title: "Wireless Radio",
                    content: "Indicates the current status (On or Off) of the Guest Network."
                }, {
                    type: "name",
                    title: "See each other",
                    content: "Displays whether all devices on the Guest Network are allowed to communicate with each other or not."
                            }, {
                    display: "$.sysMode == 'DSL'",
                    type: "title",
                    title: "DSL"
                }, {
                    display: "$.sysMode == 'DSL'",
                    type: "paragraph",
                    content: "Displays information about the DSL connection."
                }, {
                    display: "$.sysMode == 'DSL'",
                    type: "name",
                    title: "Line Status",
                    content: "Displays whether the DSL connection is connected or disconnected."
                }, {
                    display: "$.sysMode == 'DSL'",
                    type: "name",
                    title: "DSL Modulation Type",
                    content: "Displays the DSL operation Modulation Type which your DSL connection uses."
                }, {
                    display: "$.sysMode == 'DSL'",
                    type: "name",
                    title: "Annex Type",
                    content: "Displays the DSL operation Annex Type which your DSL connection uses."
                }, {
                    display: "$.sysMode == 'DSL'",
                    type: "name",
                    title: "Current Rate (kbps)",
                    content: "Displays the current upload and download speed through the DSL connection."
                }, {
                    display: "$.sysMode == 'DSL'",
                    type: "name",
                    title: "Max Rate (kbps)",
                    content: "Displays the maximal upload and download speed through the DSL connection."
                }, {
                    display: "$.sysMode == 'DSL'",
                    type: "name",
                    title: "SNR Margin (dB)",
                    content: "Displays the upload and download SNR Margin of the DSL connection."
                }, {
                    display: "$.sysMode == 'DSL'",
                    type: "name",
                    title: "Line Attenuation (dB)",
                    content: "Displays the line attenuation of the DSL connection."
                }, {
                    display: "$.sysMode == 'DSL'",
                    type: "name",
                    title: "Errors (pkts)",
                    content: "Displays the number of upstream and downstream errors of the DSL connection."
                }
            ]
        },
        time: {
            TITLE: "Time Settings",
            CONTENT: [{
                type: "name",
                title: "Time Zone",
                content: "Select your local time zone from the drop-down list."
            }, {
                type: "name",
                title: "Date",
                content: "Enter your local date in MM/DD/YY into the field."
            }, {
                type: "name",
                title: "Time",
                content: "Choose your local time from the drop-down list (In 24-hour clock format, e.g. 16:00:00 is 04:00PM)."
            }, {
                type: "name",
                title: "NTP Server I/NTP Server II",
                content: "Enter the IP address of the NTP Server I or NTP Server II, and the router will get the time from the NTP Server automatically. In addition, the router has some common built-in NTP Servers that will synchronize automatically once it connects to the Internet."
            }, {
                type: "name",
                title: "Get from PC",
                content: "Click to synchronize with the computer system time."
            }, {
                type: "name",
                title: "Get GMT",
                content: "Click to synchronize with GMT (Greenwich Mean Time) time zone from the Internet."
            }, {
                type: "name",
                title: "Save",
                content: "Click to save the settings."
            }, {
                type: "title",
                content: "Daylight Saving Time"
            }, {
                type: "note",
                title: "To set up Daylight Saving time",
                content: [
                    "Select <b>Enable Daylight Saving</b>.",
                    "Select the correct <b>Start</b> date and time when daylight saving time starts at your local time zone.",
                    "Select the correct <b>End</b> date and time when daylight saving time ends at your local time zone.",
                    "Click <b>Save</b>."
                ]
            }]
        },
        "DIGNOSTIC": {
            "TITLE": "Diagnostic Tools",
            "CONTENT": [{
                "type": "paragraph",
                "content": "The Router provides two diagnostic tools, ping and trace."
            }, {
                "type": "note",
                "title": "To diagnose using Ping tool:",
                "content": ["1. Check the radio button before ping.", "2. Enter the IP address or domain name.", "3. Click the drop-down icon before Advanced to display Ping Count, Ping Packet size and Ping Timeout. Keep these parameters at their default values or configure them according to your needs.", "4. Click Start button to begin the dianosing."]
            }, {
                "type": "paragraph",
                "content": "OR"
            }, {
                "type": "note",
                "title": "To diagnose using Traceroute tool:",
                "content": ["1. Check the radio button before traceroute.", "2. Enter the IP address or domain name.", "3. Click the drop-down icon before Advanced to display Traceroute Max TTL. Keep it at its default value or configure it according to your need.", "4. Click Start button to begin the dianosing."]
            }]
        },
        softup: {
            TITLE: "Firmware Upgrade",
            CONTENT: [{
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "A firmware upgrade updates the router's operating system with the latest new features and various fixes to improve performance. When a new firmware upgrade is available, you will be notified with an Update icon in the upper right corner. Click the icon to enter the Firmware Upgrade page."
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "<b>IMPORTANT: Please follow the instructions to prevent upgrade failure.</b>"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "step",
                title: "Before the upgrade:",
                content: [
                    "Connect your computer to the router with an Ethernet cable. It's NOT recommended to upgrade the firmware wirelessly. ",
                    "Remove all attached USB storage devices from the router.",
                    "Back up the router's configuration settings."
                ]
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "During the upgrade process:<br>Keep the router powered on and do not operate the router."
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "title2",
                content: "To upgrade the firmware online"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "paragraph",
                content: "Click Upgrade and confirm when prompted. The router will automatically download and upgrade to the latest firmware, and then reboot.<br><b>Note</b>: You may need to click Check for upgrade first to check if any firmware update is available. "
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "title2",
                content: "To upgrade the firmware manually"
            }, {
                display: "'INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1",
                type: "step",
                title: "",
                content: [
                    "Visit www.tp-link.com and download the latest firmware from our support page to your computer. Please make sure that the firmware file you are downloading matches with your router's hardware version as shown on the page.",
                    "Click <b>Browse</b> and select the downloaded firmware file.",
                    "Click <b>Upgrade</b>. The firmware upgrade takes a few minutes to complete. The router will automatically reboot when the firmware upgrade is finished.",
                ]
            }, {
                display: "!('INCLUDE_CLOUD' in window && INCLUDE_CLOUD == 1)",
                type: "paragraph",
                content: "Before upgrading the firmware of the router, you will need to download the latest firmware update from the <a href='http://www.tp-link.com/en/download-center.html'>TP-LINK Download Center page</a> to your computer."
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
            TITLE: "Backup",
            CONTENT: [{
                type: "paragraph",
                content: "It is highly recommended to back up your current configurations in case a recovery is needed to restore the system to a previous state or from the factory defaults."
            }, {
                type: "paragraph",
                content: "Click <b>Backup</b> to save your current configurations to your computer. Make sure to save the backup file to a safe location that you can retrieve and restore the Router later, if needed."
            }, {
                type: "title",
                content: "Restore"
            }, {
                type: "note",
                title: "To restore from a backup",
                content: [
                    "Click <b>Browse</b>.",
                    "Locate and select the backup file.",
                    "Click <b>Restore</b>."
                ]
            }, {
                type: "title",
                content: "Factory Default Restore"
            }, {
                type: "paragraph",
                content: "Click <b>Factory Restore</b> to reset your router to its factory default settings."
            }, {
                type: "note",
                title: "Note:",
                content: [
                    "Factory Restore will reset all settings that you have configured to the router to its factory defaults. Once the router is restored and rebooted, create a new password to re-login to the web-based management page.",
                    "Please DO NOT power off the router during the backup or restore process."
                ]
            }]
        },
        manageCtrl: {
            TITLE: "Account Management",
            CONTENT: [{
                type: "paragraph",
                content: "This page allows you to change your login password."
            }, {
                type: "name",
                title: "Old Username",
                content: "Type in your current username."
            }, {
                type: "name",
                title: "Old Password",
                content: "Type in your current password."
            }, {
                type: "name",
                title: "New Username",
                content: "Type in your new username."
            }, {
                type: "name",
                title: "New Password",
                content: "Type in your new password."
            }, {
                type: "name",
                title: "Confirm New Password",
                content: "Type in your new password again."
            }, {
                type: "title",
                content: "Local Management"
            }, {
                type: "paragraph",
                content: "The Local Management allows you to specifically assign a client device on your network to access and manage the router using the MAC address-based authentication."
            }, {
                type: "name",
                title: "Port",
                content: "Enter the port number to be used to access the router between 1024 and 65535. The default number is 80."
            }, {
                type: "name",
                title: "IP/MAC Address",
                content: "Enter a valid local IP address or MAC address of the device to be allowed to access the router."
            }, {
                type: "title",
                content: "Remote Management"
            }, {
                type: "paragraph",
                content: "The Remote Management feature allows you to access and configure the router remotely from the Internet."
            }, {
                type: "name",
                title: "Remote Management",
                content: "Select the checkbox to enable the Remote Management feature."
            }, {
                type: "name",
                title: "Port",
                content: "Enter the port number to be used to access the router with greater security between 1024 and 65535. Normally, the web browsers use the standard HTTP service port 80."
            }, {
                type: "name",
                title: "IP/MAC Address",
                content: "Enter a valid remote IP address or MAC address to be allowed to access the router."
            /*}, {
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
                content: "Select if you want the computers on a private network to ping the router's LAN IP address." */
            }]
        },
        log: {
            TITLE: "System Log",
            CONTENT: [{
                type: "paragraph",
                content: "The System Log page displays a list of the most recent activities (events) of the router. You can define what types of logs and/or the level of logs you want to view. This page also allows the router to export the system log to a computer or to automatically send the system log to a specific remote server."
            }, {
                type: "name",
                title: "Type",
                content: "Select the type of system log to display."
            }, {
                type: "name",
                title: "Level",
                content: "Select the level of system log to display."
            }, {
                type: "name",
                title: "Refresh",
                content: "Click this icon to update the system log."
            }, {
                type: "name",
                title: "Delete All",
                content: "Click this icon to delete all system logs."
            }, {
                type: "name",
                title: "Log Settings",
                content: "Click to set the log file settings.",
                children: [{
                    type: "name",
                    title: "Save Locally",
                    content: "Select to cache the system log to your router's local memory. The log will be shown in the table on the System Log page.",
                    children: [{
                        type: "name",
                        title: "Minimum Level",
                        content: "Select the minimum level of system log to be saved from the drop-down list. The list is in descending order, with the lowest level listed last."
                    }]
                }, {
                    type: "name",
                    title: "Save Remotely",
                    content: "Select to send the system log to a remote server. If the remote server has a log viewer client or a sniffer tool implemented, you can view and analyze the system log remotely in real-time.",
                    children: [{
                        type: "name",
                        title: "Minimum Level",
                        content: "Select the minimum level of system log to be saved from the drop-down list. The list is in descending order, with the lowest level listed last."
                    }, {
                        type: "name",
                        title: "Server IP",
                        content: "Specify the IP address of the remote system log server."
                    }, {
                        type: "name",
                        title: "Server Port",
                        content: "Specify the port number of the remote system log server."
                    }, {
                        type: "name",
                        title: "Local Facility Name",
                        content: "Select the local facility name of the remote server from the drop-down list."
                    }]
                }]
            }, {
                type: "name",
                title: "Save Log",
                content: "Click this button to download all system logs to your local computer."
            }]
        },
        snmp: {
            TITLE: "SNMP Settings",
            CONTENT: [{
                type: "name",
                title: "SNMP Agent",
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
                content: "Displays the physical location of this device (e.g., telephone closet, 3rd floor).  "
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
            TITLE: "Traffic Statistics",
            CONTENT: [{
                type: "name",
                title: "Traffic Statistics",
                content: "Toggle On to enable Traffic Statistics feature."
            }, {
                type: "title",
                content: "Traffic Statistics List"
            }, {
                type: "name",
                title: "IP/MAC Address",
                content: "The IP and MAC addresses of the connected clients."
            }, {
                type: "name",
                title: "Total Packets",
                content: "The total number of packets received and transmitted by the router."
            }, {
                type: "name",
                title: "Total Bytes",
                content: "The total number of bytes received and transmitted by the router."
            }, {
                type: "name",
                title: "Current Packets",
                content: "The total number of packets received and transmitted at a specific time interval in seconds."
            }, {
                type: "name",
                title: "Current Bytes",
                content: "The total number of bytes received and transmitted at a specific time interval in seconds."
            }, {
                type: "name",
                title: "Current ICMP Tx",
                content: "Displays the current transmission rate of the ICMP packets transmitted through the WAN port over the maximum transmission rate per second."
            }, {
                type: "name",
                title: "Current UDP Tx",
                content: "Displays the current transmission rate of the UDP packets transmitted through the WAN port over the maximum transmission rate per second."
            }, {
                type: "name",
                title: "Current SYN Tx",
                content: "Displays the current transmission rate of the TCP SYN packets transmitted through the WAN port over the maximum transmission rate per second."
            }, {
                type: "name",
                title: "Modify",
                content: "Click the <b>Trash</b> icon to delete the corresponding statistics."
            }, {
                "type": "name",
                "title": "Refresh",
                "content": "Click to update the statistic information on the page."
            }, {
                "type": "name",
                "title": "Reset",
                "content": "Click to reset all statistic values in the list to zero."
            }, {
                "type": "name",
                "title": "Delete All",
                "content": "Click to delete all statistic information in the list."
            }]
        },
  	ethWan: {
            TITLE: "WAN Interface",
            CONTENT: [{
                type: "title2",
                content: "Connection Type: Dynamic IP"
            }, {
                type: "name",
                title: "Dynamic IP",
                content: "Select this type if you are provided with a DHCP server connection by the ISP (Internet Service Provider)."
            /*},{
                type: "name",
                title: "IPv4",
                content: "Select the checkbox to enable IPv4." */
            }, {
                type: "name",
                title: "IP Address/Subnet Mask/Gateway/Default Gateway",
                content: "These parameters are automatically assigned by the DHCP server from your ISP."
            }, {
                "type": "name",
                "title": "Renew/Release",
                "content": "Click this button to renew/release the IP parameters from your ISP."
	    /*}, {
                type: "name",
                title: "IPv6",
                content: "Select the checkbox to enable IPv6."
            }, {
                type: "name",
                title: "IPv6 Address/Prefix Length/IPv6 Gateway",
                content: "These parameters are automatically assigned by the DHCP server from your ISP."
            }, {
                type: "name",
                title: "Addressing Type",
                content: "Select the connection type of IPv6 connection." */
            }, {
                type: "name",
                title: "Advanced",
                content: "",
                children: [{
                    type: "name",
                    title: "MTU Size (in bytes)",
                    content: "The default and typical MTU (Maximum Transmission Unit) size for most Ethernet networks is <b>1500 Bytes</b>. It is not recommended to change the default MTU size unless required by the ISP."
                /*}, {
                    type: "name",
                    title: "NAT",
                    content: "This technology translates the IP addresses of a local area network to a different IP address for the Internet. Select the checkbox to enable NAT if this WAN interface is hosting your network connection to the Internet."
                }, {
                    type: "name",
                    title: "Full-cone NAT",
                    content: "It is a type of NAT. If Full-cone NAT is not enabled, the default NAT function will be used."
                }, {
                    type: "name",
                    title: "SPI Firewall",
                    content: "The SPI firewall enhances network’s security. Select to enable firewall to protect this WAN interface."*/
                }, {
                    type: "name",
                    title: "IGMP Proxy",
                    content: "IGMP (Internet Group Management Protocol) is used to manage multicasting on TCP/IP networks. Some ISPs use IGMP to perform remote configuration on a router. It is enabled by default."
                }, {
                    type: "name",
                    title: "Get IP using Unicast DHCP",
                    content: "Select this checkbox if your ISP’s DHCP server does not support broadcast applications and you cannot get the IP address dynamically."
                }, {
                    type: "name",
                    title: "Use the following DNS Address",
                    content: "Select this checkbox and enter the DNS server address(es) in dotted decimal notation provided by your ISP. This WAN interface will use the specified DNS server for priority."
                /*}, {
                    type: "name",
                    title: "Use the following IPv6 DNS Address",
                    content: "Select this checkbox and enter the DNS server address(es) in dotted decimal notation provided by your ISP. This WAN interface will use the specified DNS server for priority." */
                }, {
                    type: "name",
                    title: "Host Name",
                    content: "Enter the host name of this WAN interface."
                }]
            }, {
                type: "title2",
                content: "Connection Type: Static IP"
            }, {
                    type: "name",
                    title: "Static IP",
                    content: "Select this type if you are provided with a specific (fixed) IP Address, Subnet Mask, Gateway, and DNS parameters by the ISP."
            /*}, {
                    type: "name",
                    title: "IPv4",
                    content: "Select the checkbox to enable IPv4."*/
            }, {
                    type: "name",
                title: "IP Address/Subnet Mask/Gateway/DNS Server/Secondary DNS Server",
                content: "Enter the IP information provided by your ISP in dotted decimal notation."
            /*}, {
                type: "name",
                title: "IPv6",
                content: "Select the checkbox to enable IPv6."
            }, {
                type: "name",
                title: "IPv6 Address/Prefix Length/IPv6 Default Gateway",
                content: "Enter the IP information provided by your ISP."*/
            }, {
                type: "paragraph",
                content: "Click <b>Advanced</b> to view more advanced settings."
            }, {
                type: "name",
                title: "Advanced",
                content: "",
                children: [{
                    type: "name",
                    title: "MTU Size (in bytes)",
                    content: "The default and typical MTU (Maximum Transmission Unit) size for most Ethernet networks is <b>1500 Bytes</b>. It is not recommended to change the default MTU size unless required by the ISP."
                /*}, {
                    type: "name",
                    title: "NAT",
                    content: "This technology translates the IP addresses of a local area network to a different IP address for the Internet. Select the checkbox to enable NAT if this WAN interface is hosting your network connection to the Internet."
                }, {
                    type: "name",
                    title: "Full-cone NAT",
                    content: "It is a type of NAT. If Full-cone NAT is not enabled, the default NAT function will be used."
                }, {
                    type: "name",
                    title: "SPI Firewall",
                    content: "The SPI firewall enhances network’s security. Select to enable firewall to protect this WAN interface." */
                }, {
                    type: "name",
                    title: "IGMP Proxy",
                    content: "IGMP (Internet Group Management Protocol) is used to manage multicasting on TCP/IP networks. Some ISPs use IGMP to perform remote configuration on a router. It is enabled by default."
                }]
            }, {
                type: "title2",
                content: "Connection Type: PPPoE"
            }, {
                type: "name",
                title: "PPPoE",
                content: "Select this type if you use DSL (Digital Subscriber Line) service and are provided with a username and password by the ISP."
            }, {
                type: "name",
                title: "PPPoE Username/PPPoE Password/Confirm Password",
                content: "Enter the username and password provided by your ISP. These fields are case-sensitive."
            }, {
                	"type": "name",
                	"title": "Secondary Connection",
                	"content": "It's available only for PPPoE Connection. If your ISP provides an extra connection type such as Dynamic/Static IP to connect to a local area network, then you can select the radio button of Dynamic/Static IP to activate this secondary connection.<br>The Secondary Connection is disabled by default, so there is PPPoE connection only. Do not enable it unless necessary."
            }, {
                type: "name",
                title: "Connection Mode",
                content: "Select one of the connection modes below that determine how to connect to the Internet:",
                children: [{
                        type: "name",
                    title: "Always",
                    content: "Select this mode to reconnect automatically any time the connection is disconnected."
                    }, {
                        type: "name",
                        title: "Connect on demand",
                    content: "Select this mode to disconnect the Internet connection based on the specific time of inactivity (Max Idle Time). The connection is re-established when you attempt to access the Internet again."
                    }, {
                        type: "name",
                        title: "Connect manually",
                    content: "Select this mode to connect or disconnect the Internet connection manually or based on the specific time of inactivity (Max Idle Time)."
                    }, {
                        type: "name",
                        title: "Max Idle Time",
                    content: "<b>15 minutes</b> - Enter a number of minutes the Internet connection can be idle before it is terminated. The default idle time is 15 minutes."
                }]
            }, {
                type: "name",
                title: "Authentication Type",
                content: "Select an authentication type from the drop-down list. The default method is AUTO_AUTH."
            }, {
                type: "name",
		title: "Connect/Disconnect",
                content: "Click to connect/disconnect immediately."
            /*},{
                type: "name",
                title: "IPv4",
                content: "Select the checkbox to enable IPv4."
            }, {
                    type: "name",
                    title: "IPv6",
                content: "Select the checkbox to enable IPv6."
            }, {
                type: "name",
                title: "Addressing Type",
                content: "Select the connection type of IPv6 connection." */
            }, {
                type: "paragraph",
                content: "Click <b>Advanced</b> to view more advanced settings."
            }, {
                type: "name",
                title: "Advanced",
                content: "",
                children: [{
                    type: "name",
                    title: "Service Name",
                    content: "Enter the service name provided by your ISP. If not, leave blank."
                }, {
                    type: "name",
                    title: "Server Name",
                    content: "Enter the server name provided by your ISP. If not, leave blank."
                }, {
                    type: "name",
                    title: "MTU Size (in bytes)",
                    content: "The typical MTU (Maximum Transmission Unit) size for Ethernet networks is 1480 Bytes.",
                    children: [{
                            type: "paragraph",
                            content: "<b>Note</b>: In a rare case, your ISP may require you to adjust the MTU size for better network performance. You should not change the value unless it is absolutely necessary."
                    }]
                /*}, {
                    type: "name",
                    title: "Full-cone NAT",
                    content: "It is a type of NAT. If Full-cone NAT is not enabled, the default NAT function will be used."
                }, {
                    type: "name",
                    title: "SPI Firewall",
                    content: "Select to enable firewall to protect this WAN interface."*/
                }, {
                    type: "name",
                    title: "IGMP Proxy",
                    content: "IGMP (Internet Group Management Protocol) is used to manage multicasting on TCP/IP networks. Some ISPs use IGMP to perform remote configuration on a router. It is enabled by default."
                }, {
                    type: "name",
                    title: "Use the IP specified by ISP",
                    content: "Select this option and enter the IP address provided by your ISP."
                }, {
                    type: "name",
                    title: "Echo Request Interval",
                    content: "Enter a time interval value between 0 and 120 (in seconds) for which the router requests Access Concentrator to echo at every interval. The default value is 30. 0 means no detection."
                }, {
                    type: "name",
                    title: "Use the following DNS Address",
                    content: "Select this checkbox and enter the DNS server address(es) in dotted decimal notation provided by your ISP. This WAN interface will use the specified DNS server for priority."
                /*}, {
                    type: "name",
                    title: "Use the IPv6 specified by ISP",
                    content: "Select this checkbox and enter the IP address and gateway provided by your ISP."
                }, {
                    type: "name",
                    title: "Use the following IPv6 DNS Address",
                    content: "Select this checkbox and enter the DNS server address(es) in dotted decimal notation provided by your ISP. This WAN interface will use the specified DNS server for priority." */
                 }]
            }, {
                    type: "title2",
                    content: "Connection Type: L2TP/PPTP"
            }, {
               	    type: "name",
		    title: "L2TP/PPTP",
                	content: "Select this type if you connect to an L2TP/PPTP VPN Server and are provided with a username, password, and IP Address/Domain Name of the server by your ISP."
            }, {
            	    type: "name",
                    title: "Username/Password",
                    content: "Enter the username and password provided by your ISP. These fields are case-sensitive."
            }, {
                    type: "name",
                    title: "IP Address/Primary DNS",
                    content: "These parameters will be automatically assigned by the DHCP server from your ISP."
            }, {
                    type: "name",
                    title: "Secondary Connection (Dynamic IP or Static IP)",
                    content: "",
                    children: [{
                   	type: "name",
                    	title: "Dynamic IP",
                    	content: "Select this if the IP address and Subnet Mask are assigned automatically by your ISP.",
	                }, {
	                    "type": "name",
	                    "title": "Static IP",
	                    "content": "Select this if the IP address, Subnet Mask, Gateway, and DNS addresses are provided by your ISP, and enter these information into the corresponding fields."
	                }]
	    }, {
		    "type": "name",
		    "title": "VPN Server IP/Domain Name",
		    "content": "Enter the VPN server's IP address or domain name provided by your ISP."
	    }, {
		    "type": "name",
		    "title": "MTU Size",
		    "content": "The default and typical MTU (Maximum Transmission Unit) size for most Ethernet networks is 1460 Bytes(1420 for PPTP). Do not change the default MTU size unless required by your ISP."
	    }, {
		    "type": "name",
		    "title": "Connection Mode",
		    "content": "Select an appropriate connection mode that determines how to connect to the Internet.",
		    "children": [{
			       	"type": "name",
			       	"title": "Always On",
			       	"content": "In this mode, the Internet connection reconnects automatically any time it gets disconnected."
		        }, {
		            "type": "name",
		            "title": "Connect on demand",
		            "content": "In this mode, the Internet connection will be terminated automatically after a specified time of inactivity (Max Idle Time) has elapsed. The connection is re-established when you attempt to access the Internet again."
		        }, {
		            "type": "name",
		            "title": "Connect manually",
		            "content": "In this mode, the Internet connection is controlled manually by clicking the Connect or Disconnect button.This mode also supports the Max Idle Time function. Enter a Max Idle Time (in minutes) to specify the maximum time the Internet connection can be inactive before it is terminated. The default value is 15 minutes. If you want the Internet connection remains active at all time, enter 0 (zero)."
		    }]
            }, {
                type: "title",
                content: "MAC Clone"
            }, {
                type: "name",
                title: "Use Default MAC Address",
                content: "Select this option to use the default MAC address in the case where the ISP has not assigned an IP address to the router's MAC address."
            }, {
                type: "name",
                title: "Use Current Computer MAC Address",
                content: "Select this option to use the MAC address of the currently connected computer in the case where the ISP only allows this computer to access the Internet."
            }, {
                type: "name",
                title: "Use Custom MAC Address",
                content: "Select this option to enter the registered MAC address manually."
            }]
        },
        route: {
            TITLE: "Advanced Routing",
            CONTENT: [{
                type: "paragraph",
                content: "Advanced Routing is used to predetermine a fixed route for the network information packets to reach a specific host or network."
            /*}, {
                type: "title",
                content: "Default Gateway Settings"
            }, {
                type: "name",
                title: "Select WAN Interface",
                content: "Select a WAN interface as the system default gateway."*/
            }, {
                type: "title",
                content: "Static Routing"
            }, {
                type: "name",
                title: "Destination IP Address/Subnet Mask/Gateway",
                content: "Displays the Destination IP Address, Subnet Mask and Gateway of the Static Route."
            }, {
                type: "name",
                title: "Enable",
                content: "Indicates the current status of a static route. Click the <b>Bulb</b> icon to enable (or disable) the static route."
            }, {
                type: "name",
                title: "Modify",
                content: "Displays options to <b>Modify</b> or <b>Delete</b> the corresponding entry."
            }, {
                type: "note",
                title: "To set up a static routing",
                content: [
                    "Click <b>Add</b>.",
                    "Enter a destination IP address to assign the static route for this entry.",
                    "Enter a subnet mask in hexadecimal format to determine the network portion and host portion of the IP address.",
                    "Enter a gateway IP address format to connect the router to the network or host.",
                    "Select <b>LAN</b> or a WAN interface to specify the type of the Destination IP Address.",
                    "Select <b>Enable this entry</b>.",
                    "Click <b>OK</b>."
                ]
            }, {
                type: "title",
                content: "System Routing Table"
            }, {
                type: "paragraph",
                content: "System Routing Table displays all valid route entries that are currently in use."
            }, {
                type: "paragraph",
                content: "Click Refresh to update the Routing table."
            }]
        },
        ddns: {
            TITLE: "Dynamic DNS Settings",
            CONTENT: [{
                type: "paragraph",
                content: "Dynamic DNS (Domain Name System) allows you to assign a fixed host and domain name to a dynamic Internet IP address. It is useful when you are hosting your own website, FTP server, or another server behind the router. First, you need to sign up with a DDNS service provider such as <a href='http://www.dyndns.com'>www.dyndns.com</a>."
            }, {
                type: "name",
                title: "Service Provider",
                content: "Select your DDNS service provider. If you have not registered a DDNS account, click <b>Go to register</b>"
            }, {
                type: "name",
                title: "Username/Password",
                content: "Enter the username and password of your DDNS account."
            }, {
                type: "name",
                title: "Domain Name",
                content: "Enter the domain name provided by the DDNS service provider."
            }, {
                type: "name",
                title: "Log in/Log out",
                content: "Click to log in or log out of the DDNS service."
            }, {
                type: "name",
                title: "Save",
                content: "Click to save all the settings."
            }, {
                type: "paragraph",
                content: "To switch between your DDNS accounts, click Log Out to log out of the current account, then log in again with a different account."
            }]
        },
        dhcp: {
            TITLE: "DHCP Server",
            CONTENT: [{
                type: "paragraph",
                content: "DHCP (Dynamic Host Configuration Protocol) server dynamically assigns TCP/IP configuration to the client devices from an IP address pool. DO NOT disable the default DHCP server unless you have another DHCP server or you wish to manually assign the TCP/IP configuration to individual clients on your network."
            }, {
                    type: "name",
                    title: "IP Address Pool",
                    content: "Enter the range of IP addresses that can be leased to the clients."
            }, {
                    type: "name",
                    title: "Address Lease Time",
                    content: "Enter the time duration that an IP address is leased to the client between 1 and 2880 minutes."
            }, {
                    type: "name",
                    title: "Default Gateway",
                    content: "Enter the LAN IP address. (Optional)"
            }, {
                    type: "name",
                    title: "DNS Server/Secondary DNS Server",
                    content: "Enter the DNS server addresses as provided by your ISP. (Optional)"
            }, {
                type: "title",
                content: "Client List"
            }, {
                type: "name",
                title: "Total Clients",
                content: "Displays the total number of the associated DHCP clients."
            }, {
                type: "name",
                title: "Client Name",
                content: "Displays the name of the DHCP client."
            }, {
                type: "name",
                title: "MAC Address",
                content: "Displays the MAC address."
            }, {
                type: "name",
                title: "Assigned IP Address",
                content: "Displays the allocated IP address to the client by the DHCP server."
            }, {
                type: "name",
                title: "Leased Time",
                content: "Displays the time duration of the IP address that has been leased to the client."
            }, {
                type: "name",
                title: "Refresh",
                content: "Click to update the DHCP Client List."
            }, {
                type: "title",
                content: "Address Reservation"
            }, {
                type: "paragraph",
                content: "You can manually reserve an IP address for a client that is connected to the router. Once reserved, the IP address will only be assigned to the same client by the DHCP server."
            }, {
                type: "name",
                title: "MAC Address",
                content: "Displays the MAC address of the client with DHCP reserved IP address."
            }, {
                type: "name",
                title: "Reserved IP Address",
                content: "Displays the reserved IP address of the client."
            }, {
                type: "name",
                title: "Description",
                content: "Displays the description of the device."
            }, {
                type: "name",
                title: "Enable",
                content: "Click to enable or disable the corresponding entry."
            }, {
                type: "name",
                title: "Modify",
                content: "Displays options to <b>Modify</b> or <b>Delete</b> the corresponding client."
            }, {
                type: "note",
                title: "To reserve an IP address for an DHCP client",
                content: [
                    "Click <b>Add</b>.",
                    "Enter the <b>MAC address</b> of the client.",
                    "Enter the IP address that you want to reserve for the client.",
                    //"Select the group that the client belongs to.",
                    "Enter the description of the device.",
                    "Select <b>Enable this entry</b>.",
                    "Click <b>OK</b>."
                ]
            }, {
                type: "note",
                title: "To modify or delete an existing client",
                content: [
                    "Click the <b>Edit</b> or <b>Trash</b> icon in the corresponding entry."
                ]
            }, {
                type: "title",
                content: "Condition Pool"
            }, {
                    type: "name",
                title: "Vendor ID/Starting IP Address/Ending IP Address/Facility",
                content: "Displays the Vender ID, Starting IP Address, Ending IP Address and Facility of the condition pool."
            }, {
                    type: "name",
                    title: "Status",
                content: "Indicates the current status of the condition pool. Click the Bulb icon to enable (or disable) the condition pool."
            }, {
                type: "name",
                title: "Modify",
                content: "Displays options to <b>Modify</b> or <b>Delete</b> the corresponding client."
            }, {
                type: "note",
                title: "To add a condition pool",
                content: [
                    "Click <b>Add</b>.",
                    "Enter the LAN device name.",
                    "Enter a value to identify the vendor and functionality of the DHCP client.",
                    "Enter the starting IP address that the DHCP server assigns to clients.",
                    "Enter the ending IP address that the DHCP server assigns to clients.",
                    "Enter the default gateway of the DHCP server.",
                    "Select a device type from the drop-down list.",
                    "Select an option from the drop-down list.",
                    "Enter the option value.",
                    //"Select a group from the drop-down list.",
                    "Select <b>Enable this entry</b>.",
                    "Click <b>OK</b>."
                ]
            }]
        },
        "iptv": {
            "TITLE": "IPTV Settings",
            "CONTENT": [{
                "type": "name",
                "title": "IPTV",
                "content": "Select to enable the IPTV feature."
            }, {
                "type": "name",
                "title": "Mode",
                "content": "Select the appropriate mode according to your ISP. There are six IPTV modes:",
                "children": [{
                    "type": "name",
                    "title": "Bridge",
                    "content": "Select this if your ISP is not listed and no other parameters are predetermined.",
                    "children": [{
                        "type": "name",
                        "title": "LAN 1/2/3/4",
                        "content": "Assign your LAN port whether to function as the Internet supplier or as the IPTV supplier."
                    }]
                }, /*{
                    "type": "name",
                    "title": "Russia",
                    "content": "Select this if your ISP is from Russia and the necessary parameters are predetermined, including Internet/IP-Phone/IPTV VLAN IDs and Priority, and LAN (1/2/3/4) port.",
                    "children": [{
                        "type": "name",
                        "title": "IPTV Multicast VLAN ID/Priority",
                        "content": "You can enable the IPTV multicast feature as desired, and configure the VLAN ID and Priority according to your ISP."
                    }]
                }, */{
                    "type": "name",
                    "title": "Singapore-ExStream",
                    "content": "Select this if your ISP is ExStream from Singapore and the necessary parameters are predetermined, including Internet/IPTV VLAN IDs and priority, and LAN (1/2/3/4) port."
                }, {
                    "type": "name",
                    "title": "Malaysia-Unifi",
                    "content": "Select this if your ISP is Unifi from Malaysia and the necessary parameters are predetermined, including Internet/IPTV VLAN IDs and priority, and LAN (1/2/3/4) port."
                }, {
                    "type": "name",
                    "title": "Malaysia-Maxis",
                    "content": "Select this if your ISP is Maxis from Malaysia and the necessary parameters are predetermined, including Internet/IP-Phone/IPTV VLAN IDs and Priority, and LAN (1/2/3/4) port."
                }, {
                    "type": "name",
                    "title": "Custom",
                    "content": "Select this if your ISP is not listed but provides the necessary parameters, including Internet/IP-Phone/IPTV VLAN IDs and Priority, and LAN (1/2/3/4) port.",
                    "children": [{
                        "type": "name",
                        "title": "Internet/IP-Phone/IPTV VLAN ID/Priority",
                        "content": "Configure the VLAN IDs as provided by your ISP."
                    }, {
                        "type": "name",
                        "title": "802.11Q Tag",
                        "content": "Select whether to tag the Internet packets with 802.11Q."
                    }, {
                        "type": "name",
                        "title": "LAN 1/2/3/4",
                        "content": "Assign your LAN port to whether function as the Internet supplier or as the IPTV supplier."
                    }, {
                        "type": "name",
                        "title": "IPTV Multicast VLAN ID/Priority",
                        "content": "You can enable the IPTV multicast feature as desired, and configure the VLAN ID and Priority according to your ISP."
                    }]
                }]
            }, {
                "type": "name",
                "title": "IGMP Proxy",
                "content": "Select the IGMP (Internet Group Management Protocol) Proxy version, either V2 or V3, according to your ISP."
            }]
        },
        usbManage: {
            TITLE: "USB Storage Device",
            CONTENT: [{
                type: "paragraph",
                content: "The <b>USB Storage Device</b> screen displays the basic information of the USB storage device connected via the USB port."
            }, {
                type: "name",
                title: "Scan",
                content: "Usually, the router automatically detects any newly attached device. If not, click this button to scan and refresh the screen with the updated information."
            }, {
                type: "name",
                title: "Volume Name",
                content: "Displays the name of the USB volume."
            }, {
                type: "name",
                title: "Capacity",
                content: "Displays the total storage capacity of the USB device."
            }, {
                type: "name",
                title: "Free Space",
                content: "Displays the current available free storage space."
            }, {
                type: "name",
                title: "Active",
                content: "This checkbox only appears when a USB storage device is connected to the router. Select to enable file sharing of the USB device."
            }, {
                type: "name",
                title: "Safely Remove",
                content: "Click this button to safely unmount the USB storage device before physically unplugging it from the router. Please note that the Safely Remove button only appears when there is a USB storage device connected to the router. Also, keep in mind that you are unable to unmount the USB device while it is in use."
            }, {
                type: "title",
                content: "Sharing Settings"
            }, {
                type: "name",
                title: "Network Media/Server Name",
                content: "Displays the name used to access the connected USB storage device."
            }, {
                type: "title",
                content: "Folder Sharing"
            }, {
                type: "name",
                title: "Share All",
                content: "Toggle On to share all the files and folders or Off to only share the selected folders."
            }, {
                type: "name",
                title: "Enable Authentication",
                content: "Toggle On to enable authentication which requires the users to enter a valid username and password to access all the shared folders."
            }, {
                type: "name",
                title: "Folder Name",
                content: "Displays the name of the shared folder. "
            }, {
                type: "name",
                title: "Folder Path",
                content: "Displays the path to the shared folder. "
            }, {
                type: "name",
                title: "Volume Name",
                content: "Displays the name of the shared volume."
            }]
        },
        printSrv: {
            TITLE: "Print Server",
            CONTENT: [{
                type: "name",
                title: "Enable Print Server",
                content: "Toggle On to enable the print server function."
            }, {
                type: "name",
                title: "Printer Name",
                content: "Displays the name of your printer connected to the router."
            }]
        },
        diskSettings: {
            TITLE: "USB Storage Device",
            CONTENT: [{
                type: "paragraph",
                content: "The <b>USB Storage Device</b> screen displays the basic information of the USB storage device connected via the USB port."
            }, {
                type: "name",
                title: "Scan",
                content: "Usually, the router automatically detects any newly attached device. If not, click this button to scan and refresh the screen with the updated information."
            }, {
                type: "name",
                title: "Volume Name",
                content: "Displays the name of the USB volume."
            }, {
                type: "name",
                title: "Capacity",
                content: "Displays the total storage capacity of the USB device."
            }, {
                type: "name",
                title: "Free Space",
                content: "Displays the current available free storage space."
            }, {
                type: "name",
                title: "Active",
                content: "This checkbox only appears when a USB storage device is connected to the router. Select to enable file sharing of the USB device."
            }, {
                type: "name",
                title: "Safely Remove",
                content: "Click this button to safely unmount the USB storage device before physically unplugging it from the router. Please note that the Safely Remove button only appears when there is a USB storage device connected to the router. Also, keep in mind that you are unable to unmount the USB device while the current volume is busy."
            }, {
                type: "note",
                title: "To set up a file server",
                content: [
                    "Attach the USB storage device to the USB port of the router using a USB cable.",
                    "The newly attached USB device should be automatically detected by the router and displayed the information under the <b>Device Settings</b> section. If not, click <b>Scan</b>.",
                    "Click the <b>Active</b> icon to enable file sharing."
                ]
            }]
        },
        folderSharing: {
            TITLE: "Sharing Account",
            CONTENT: [{
                type: "name",
                title: "Account",
                content: "You can either select <b>Use Default Account</b> to login to the shared files and folders or <b>Use New Account</b> and enter the following to create a new user account."
            }, {
                type: "name",
                title: "Username/Password",
                content: "Enter up to 15 characters containing letters, numbers and/or underline strings. The username must start with an alphabet character. These fields are case-sensitive. "
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
                content: "Select the checkbox(s) to enable the corresponding access method(s)."
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
                    content: "Select this option to allow users on your network to access the shared contents via the address shown under the Address column."
                }, {
                    type: "name",
                    title: "FTP",
                    content: "Select this option to enable the FTP server feature that allows FTP clients and users on your network to access the USB storage device via the FTP address shown under the Address column. To change the FTP server’s port, enter a new port number and click <b>Save</b> to apply the changes."
                }, {
                    type: "name",
                    title: "FTP (Via Internet)",
                    content: "Select this option to allow FTP clients and users to remotely access, download and upload files to the shared USB storage device through FTP over the Internet."
                }]
            }, {
                type: "name",
                title: "Access",
                content: "Displays the address used to access the shared USB storage device."
            }, {
                type: "name",
                title: "Port",
                content: "Displays the port number of the FTP server."
            }, {
                type: "title",
                content: "Folder Sharing"
            }, {
                type: "name",
                title: "Share All",
                content: "Toggle On to share all files and folders or Off to only share the selected folders."
            }, {
                type: "name",
                title: "Enable Authentication",
                content: "Toggle On to enable authentication which requires the users to enter a valid username and password to access all the shared folders."
            }, {
                type: "name",
                title: "Folder Name",
                content: "Displays the name of the shared folder. "
            }, {
                type: "name",
                title: "Folder Path",
                content: "Displays the path to the shared folder. "
            }, {
                type: "name",
                title: "Media Sharing",
                content: "Displays whether the media sharing feature is enabled (On) or disabled (Off)."
            }, {
                type: "name",
                title: "Volume Name",
                content: "Displays the name of the shared volume."
            }, {
                type: "name",
                title: "Status",
                content: "Indicates the current status of a shared folder. Click the Bulb icon to enable (or disable) folder sharing."
            }, {
                type: "name",
                title: "Modify",
                content: "Displays options to <b>Modify</b> or <b>Delete</b> the corresponding shared folder."
            }, {
                type: "note",
                title: "To add a folder sharing entry:",
                content: [
                    "Toggle Off <b>Select All</b>.",
                    "Click <b>Add</b>.",
                    "Select the <b>Volume Name</b> and <b>Folder Path</b>.",
                    "Create a folder name.",
                    "Decide the way you share the folder:<br /><b>Enable Authentication</b> - Select to require users to authenticate with a valid username and password to access the shared folders.<br /><b>Enable Write Access</b> - Select to allow users to make changes to the folder content.<br /><b>Enable Media Sharing</b> - Select to enable media sharing.<br />"
                ]
            }]
        }, 
		ipsec: {
            TITLE: "IPSec Settings",
            CONTENT: [{
                type: "name",
                title: "Dead Peer Detection",
                content: "Dead Peer Detection (DPD) is a method of detecting a dead Internet Key Exchange (IKE) peer. DPD is used to reclaim the lost resources in case a peer is found dead and it is also used to perform IKE peer failover. Toggle On to enable the Dead Peer Detection feature."
            }, {
                type: "name",
                title: "Connection Name/Remote Gateway/Local Address/Remote Address",
                content: "Displays the Connection Name, Remote Gateway, Local Address, and Remote Address of the IPSec entry."
            }, {
                type: "name",
                title: "Status",
                content: "Displays the status of the IPSec entry. Status includes:",
                children: [{
                    type: "name",
                    title: "Disabled",
                    content: "The entry is disabled."
                }, {
                    type: "name",
                    title: "Down",
                    content: "The entry is enabled, but no connection."
                }, {
                    type: "name",
                    title: "Up",
                    content: "The entry is enabled and the connection is made successfully. "
                }]
            }, {
                type: "name",
                title: "Enable",
                content: "Click the <b>Bulb</b> icon to enable or disable the entry."
            }, {
                type: "name",
                title: "Modify",
                content: "Displays options to <b>Modify</b> or <b>Delete</b> the corresponding entry."
            }, {
                type: "name",
                title: "Add",
                content: "Click to add a new IPSec VPN connection."
            }, {
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
                content: "Enter the IP address of your LAN. "
            }, {
                type: "name",
                title: "IP Subnet Mask",
                content: "Enter the subnet mask of your LAN."
            }, {
                type: "name",
                title: "Tunnel access from remote IP addresses",
                content: "Select Subnet Address if you want the whole remote LAN to join the VPN network, or select Single Address if you want a single IP to join the VPN network."
            }, {
                type: "name",
                title: "IP Address for VPN",
                content: "Enter the IP address of the remote LAN. "
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
            }, {
                type: "name",
                title: "Advanced",
                content: "Click to configure the advanced settings. We recommend that you keep the default settings. If you want to change these settings, make sure that both VPN server endpoints use the same Encryption Algorithm, Integrity Algorithm, Diffie-Hellman Group and Key Lifetime in both phase1 and phase2.",
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
                        title: "Key Life Time",
                    content: "Enter the period of time (in seconds) to pass before establishing a new IPSec security association (SA) with the remote endpoint. The default value is 3600."
                }]
            }]
        },
        wanBasic: {
            TITLE: "Internet Connection Setup",
            "CONTENT": [{
                "type": "name",
                "title": "Auto Detect",
                "content": "Click this button to have the router automatically detect your current Internet connection type."
            }, {
                "type": "paragraph",
                "title": "Note",
                "content": "If you are not sure which Internet connection type you have, use the Auto Detect function or contact your ISP for assistance."
            }, {
                "type": "title",
                "title": "Internet Connection Type: Static IP"
            }, {
                "type": "name",
                "title": "IP Address/Subnet Mask/Default Gateway/Primary DNS/Secondary DNS",
                "content": "Enter the information provided by your ISP."
            }, {
                "type": "title",
                "title": "Internet Connection Type: Dynamic IP"
            }, {
                "type": "name",
                "title": "DO NOT Clone MAC Address/Clone Current Computer MAC Address",
                "content": "Select whether to clone your MAC address or not, according to your ISP."
            }, {
                "type": "title",
                "title": "Internet Connection Type: PPPoE"
            }, {
                "type": "name",
                "title": "Username/Password",
                "content": "Enter the username and password provided by your ISP. These fields are case-sensitive."
            }, {
                "type": "title",
                "title": "Internet Connection Type: L2TP/PPTP"
            }, {
                "type": "name",
                "title": "Username/Password",
                "content": "Enter the username and password provided by your ISP. These fields are case-sensitive."
            }, {
                "type": "name",
                "title": "Secondary Connection (Dynamic IP or Static IP)",
                "content": "",
                "children": [{
                    "type": "name",
                    "title": "Dynamic IP",
                    "content": "Select this if the IP address and Subnet Mask are assigned automatically by your ISP."
                }, {
                    "type": "name",
                    "title": "Static IP",
                    "content": " Select this if the IP address, Subnet Mask, Gateway, and DNS addresses are provided by your ISP, and enter these information into the corresponding fields."
                }]
            }, {
                "type": "name",
                "title": "VPN Server IP/Domain Name",
                "content": "Enter the VPN Server IP Address or Domain Name provided by your ISP."
            }]
        },
       "PRINT_SERVER": {
            "TITLE": "Print Server",
            "CONTENT": [{
                "type": "paragraph",
                "content": "You can configure print server on this page."
            }, {
                "type": "name",
                "title": "Print Server",
                "content": "Indicates the current Enable/Disable status of the Print Server."
            }, {
                "type": "name",
                "title": "Printer Name",
                "content": "Name of printer connected to the router."
            }, {
                "type": "note",
                "title": "Follow the instructions below to set up your print server:",
                "content": ["Step1: Connect the USB printer to the USB port of the router with a USB printer cable.", "Step2:  Install the printer driver on your computer.", "Step3:  Install the TP-LINK USB Printer Controller on your computer. Please run the resource CD or download the TP-LINK USB Printer Controller utility from our website: www.tp-link.com."]
            }]
        },
        "sysconf": {
            "TITLE": "Wireless Advanced Settings 2.4GHz | 5GHz-1 | 5GHz-2",
            "CONTENT": [{
                "type": "name",
                "title": "Beacon Interval",
                "content": "Enter a value between 25 and 1000 in milliseconds to determine the duration between which beacon packets are broadcasted by the router to synchronize the wireless network. The default value is 100 milliseconds."
            }, {
                "type": "name",
                "title": "RTS Threshold",
                "content": "nter a value between 1 and 2346 in bytes to determine the packet size of data transmission through the router. By default, the RTS (Request to Send) Threshold size is 2346. If the packet size is greater than the preset threshold, the router sends Request to Send frames to a particular receiving station and negotiates the sending of a data frame, or else the packet will be sent immediately."
            }, {
                "type": "name",
                "title": "DTIM Interval",
                "content": "Enter a value between 1 and 255 to determine the interval of the Delivery Traffic Indication Message (DTIM). 1 indicates the DTIM Interval is the same as Beacon Interval."
            }, {
                "type": "name",
                "title": "Group Key Update Period",
                "content": "Enter the number of seconds (minimum 30) to control the time interval for the encryption key automatic renewal. The default value is 0, indicating no key renewal."
            }, {
                "type": "name",
                "title": "WMM Feature",
                "content": "The WMM (Wi-Fi multi-media) function guarantees the packets with high-priority messages being transmitted preferentially. It is highly recommended and is enabled by default."
            }, {
                "type": "name",
                "title": "Short GI Feature",
                "content": "This function increases the data capacity by reducing the Guard Interval (GI) time. It is recommended and is enabled by default."
            }, {
                "type": "name",
                "title": "AP Isolation Feature",
                "content": "Select this checkbox to enable the AP Isolation feature that allows you to confine and restrict all wireless devices on your network from interacting with each other, but still able to access the Internet. AP isolation is disabled by default."
            }, {
                /*"type": "name",
                "title": "WDS Bridging",
                "content": "Enable the WDS (Wireless Distribution System) Bridging feature to allow the router to bridge with another access point (AP) in a wireless local area network (WLAN). If this feature is enabled, configure the following:",
                "children": [{
                    "type": "name",
                    "title": "SSID",
                    "content": "Enter the SSID of the WAP (Wireless Access Point) that the router will connect to as a client or use the Survey feature to find all available networks in the current channel."
                }, {
                    "type": "name",
                    "title": "Survey",
                    "content": "Click this button to scan and display the SSID, BSSID, signal strength, channel, and security information of all available wireless networks within range. Once you select a network, the SSID, MAC Address, and Security will automatically populate."
                }, {
                    "type": "name",
                    "title": "MAC Address (to be bridged)",
                    "content": "Enter the MAC address (BSSID) in 12 hexadecimal characters (0-9, a-f, A-F) format separated by hyphens of the wireless access point that the router will connect to as a client. If you choose the desired AP through the Survey feature, the MAC Address  field is automatically populated."
                }, {
                    "type": "name",
                    "title": "Security",
                    "content": "Select the correct security type of the selected access point, No, WPA-PSK/WPA2-PSK or WEP. If you choose the desired AP through the Survey feature, the Security field is automatically populated.",
                    "children": [{
                        "type": "name",
                        "title": "Password",
                        "content": "This option is available when the security type is WPA-PSK/WPA2-PSK or WEP. Enter the security password of the selected access point."
                    }, {
                        "type": "name",
                        "title": "Type",
                        "content": "This option is only available when the security type is WEP (Wired Equivalent Privacy). Select the appropriate authentication type (Open System or shared Key) used of the selected access point."
                    }, {
                        "type": "name",
                        "title": "WEP Key Format",
                        "content": "This option is only available when the security type is WEP. Select the key format (ASCII or Hexadecimal) used of the selected AP."
                    }]
                }]
            }, {*/
                type: "title",
                title: "WPS"
            }, {
                type: "name",
                title: "Enable WPS",
                content: "Toggle On to enable the WPS feature."
            }, {
                "type": "paragraph",
                "content": "Click Save to save your settings."
            }, {
            /*add by wuzeyu for led */
		 "type": "title",
		 "title": "LED",
            }, {
                "type": "name",
                "title": "Night Mode",
                "content": "When this function is enabled, the router's LEDs will be turned off automatically during the specified period of time."
            }, {
                "type": "name",
                "title": "Time Period",
                "content": "Enter a time period during which the router's LEDs will be turned off."
            }, {
                "type": "paragraph",
                "content": "Click Save to save your settings."
		    }, {
		    /*end add*/
                "type": "title",
                "title": "DoS Protection Settings"
            }, {
                "type": "paragraph",
                "content": "The DoS Protection Level protects the router from TCP-SYN-Flood, UDP-Flood, and ICMP-Flood attacks."
            }, {
                "type": "name",
                "title": "ICMP-FLOOD Protection Level",
                "content": "Enter a value between 5 and 3600 to trigger the ICMP-FLOOD protection immediately when the number of ICMP packets exceeds the preset threshold value."
            }, {
                "type": "name",
                "title": "UDP-FLOOD Protection Level",
                "content": "Enter a value between 5 and 3600 to trigger the UDP-FLOOD protection immediately when the number of UDP packets exceeds the preset threshold value."
            }, {
                "type": "name",
                "title": "TCP-FLOOD Protection Level",
                "content": "Enter a value between 5 and 3600 to trigger the TCP-SYN-FLOOD protection immediately when the number of TCP-SYN packets exceeds the preset threshold value."
            }, {
                "type": "paragraph",
                "content": "Click Save to save your settings."
            }]
        },
        logConf: {
            TITLE: "Log Settings",
            CONTENT: [{
                type: "paragraph",
                content: ""
            }, {
				type: "name",
				title: "Save Locally",
				content: "Select to save logs to your local memory.",
				children: [{
				    type: "name",
				    title: "Minimum Level",
				    content: "Select the Minimum level in the drop-down list, and then all logged events above or equal to the selected level will be saved."
				}]
			}, {
			    type: "name",
			    title: "Save Remotely",
			    content: "Select to send logs to the specified IP address and UDP port of the remote system log server.",
			    children: [{
			        type: "name",
			        title: "Minimun Level",
			        content: "Select the Minimum level in the drop-down list, and then all logged events above or equal to the selected level will be saved."
			    }, {
			        type: "name",
			        title: "Server IP",
			        content: "Specify the IP address of the remote system log server to which events will be sent."
			    }, {
			        type: "name",
			        title: "Server Port",
			        content: "Specify the port number of the remote system log server to which events will be sent."
			    }, {
			        type: "name",
			        title: "Local Facility Name",
			        content: "Select the local facility name according to your remote server's facility name."
			    }]
            }]
        },
/*
        "INTERNET_DYNAMIC": {
            "TITLE": "Dynamic IP Help",
            "CONTENT": [{
                "type": "name",
                "title": "Internet Connection Type",
                "content": "<strong>Dynamic IP</strong>"
            }, {
                "type": "paragraph",
                "content": "If your ISP is running on DHCP server, please select <strong>Dynamic IP</strong>."
            }, {
                "type": "name",
                "title": "IP Address",
                "content": "The IP address is automatically assigned by your ISP."
            }, {
                "type": "name",
                "title": "Subnet Mask",
                "content": "The Subnet Mask is automatically assigned by your ISP."
            }, {
                "type": "name",
                "title": "Default Gateway",
                "content": "The Default Gateway is automatically assigned by your ISP."
            }, {
                "type": "name",
                "title": "Primary DNS",
                "content": "Enter the Primary DNS Server IP Address provided by your ISP."
            }, {
                "type": "name",
                "title": "Secondary DNS",
                "content": "Enter the Secondary DNS Server IP Address provided by your ISP."
            }, {
                "type": "paragraph",
                "content": "Click the <strong>Renew</strong> button to automatically renew the IP parameters assigned by your ISP."
            }, {
                "type": "paragraph",
                "content": "Click the <strong>Release</strong> button to erase the IP parameters assigned by your ISP."
            }, {
                "type": "name",
                "title": "Note",
                "content": "you will lose Internet connection until you click on the Renew button again."
            }, {
                "type": "paragraph",
                "content": "Click the <strong>Advanced</strong> button to set up the advanced options."
            }, {
                "type": "name",
                "title": "DNS Address",
                "content": "If your ISP provides the DNS IP address, select <strong>Use the Following DNS</strong> Address and enter the <strong>Primary DNS</strong> and <strong>Secondary DNS</strong> Server IP Addresses manually. Otherwise, the DNS Servers will be assigned automatically."
            }, {
                "type": "name",
                "title": "Primary DNS",
                "content": "Enter the Primary DNS Server IP Address provided by your ISP."
            }, {
                "type": "name",
                "title": "Secondary DNS",
                "content": "Enter the Secondary DNS Server IP Address provided by your ISP."
            }, {
                "type": "paragraph",
                "content": "Note: If you get Address not found error when you access a Web site, it is likely that your DNS servers are set up improperly. You should contact your ISP to get DNS server addresses."
            }, {
                "type": "name",
                "title": "MTU Size (in bytes)",
                "content": "The normal MTU (Maximum Transmission Unit) value for most Ethernet networks is 1500 Bytes. For some ISPs you need to modify the MTU. But this is rarely required, and should not be done unless you are sure it is necessary for your ISP connection."
            }, {
                "type": "name",
                "title": "Host",
                "content": "This option specifies the Host Name of the Router."
            }, {
                "type": "name",
                "title": "Get IP using Unicast DHCP",
                "content": "A few ISPs' DHCP servers do not support the broadcast applications. If you can't get the IP Address normally, you can choose Unicast. (You generally need not to check this option)."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Save</strong> to save all your settings."
            }]
        },
        "INTERNET_STATIC": {
            "TITLE": "Static IP Help",
            "CONTENT": [{
                "type": "name",
                "title": "Internet Connection Type",
                "content": "<strong>Static IP</strong>"
            }, {
                "type": "paragraph",
                "content": "<strong>If your ISP provides a Static IP Address, Subnet Mask, Gateway and DNS Settings, please select Static IP.</strong>."
            }, {
                "type": "name",
                "title": "IP Address",
                "content": "Enter the IP Address provided by your ISP. "
            }, {
                "type": "name",
                "title": "Subnet Mask",
                "content": "Enter the Subnet Mask provided by your ISP."
            }, {
                "type": "name",
                "title": "Default Gateway",
                "content": "Enter the Default Gateway provided by your ISP. "
            }, {
                "type": "name",
                "title": "Primary DNS",
                "content": "Enter the Primary DNS Server IP Address provided by your ISP."
            }, {
                "type": "name",
                "title": "Secondary DNS",
                "content": "Enter the Secondary DNS Server IP Address provided by your ISP."
            }, {
                "type": "name",
                "title": "MTU Size",
                "content": "The normal MTU (Maximum Transmission Unit) value for most Ethernet networks is 1500 Bytes. For some ISPs, you may need to modify the MTU. But this is rarely required, and should not be done unless you are sure it is necessary for your ISP connection."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Save</strong> to save all your settings."
            }]
        },
        "INTERNET_PPPOE": {
            "TITLE": "PPPoE Help",
            "CONTENT": [{
                "type": "name",
                "title": "Internet Connection Type",
                "content": "<strong>PPPoE</strong>"
            }, {
                "type": "paragraph",
                "content": "<strong>If your ISP provides a PPPoE connection, please select PPPoE.</strong>."
            }, {
                "type": "name",
                "title": "User Name/Password",
                "content": "Enter the User Name and Password provided by your ISP. These fields are case-sensitive."
            }, {
                "type": "name",
                "title": "Internet IP Address",
                "content": "The IP address assigned dynamically by your ISP."
            }, {
                "type": "name",
                "title": "Primary DNS",
                "content": "The DNS IP address assigned dynamically by your ISP."
            }, {
                "type": "name",
                "title": "Secondary DNS",
                "content": "Another DNS IP address assigned dynamically by your ISP."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Advanced</strong> to set up the advanced options."
            }, {
                "type": "name",
                "title": "Secondary Connection",
                "content": "It's available only for PPPoE Connection. If your ISP provides an extra Connection type such as Dynamic/Static IP to connect to a local area network, then you can check the radio button of Dynamic/Static IP to activate this secondary connection."
            }, {
                "type": "name",
                "title": "None",
                "content": "The Secondary Connection is disabled by default, so there is PPPoE connection only. This is recommended."
            }, {
                "type": "name",
                "title": "Dynamic IP",
                "content": "Use dynamic IP address to connect to the local area network provided by your ISP. "
            }, {
                "type": "name",
                "title": "IP Address",
                "content": "The IP address assigned dynamically by your ISP."
            }, {
                "type": "name",
                "title": "Subnet Mask",
                "content": "The subnet mask assigned dynamically by your ISP. You can click the Renew button to <strong>renew</strong> the IP parameters from your ISP, or click the <strong>Release</strong> button to release them."
            }, {
                "type": "name",
                "title": "Static IP",
                "content": "Use static IP address to connect to the local area network provided by your ISP. "
            }, {
                "type": "name",
                "title": "IP Address",
                "content": "Enter the IP address provided by your ISP for the secondary connection. This address is used only for accessing the local area network of the secondary connection. "
            }, {
                "type": "name",
                "title": "Subnet Mask",
                "content": "Enter the subnet mask provided by your ISP for the secondary connection."
            }, {
                "type": "name",
                "title": "MTU Size",
                "content": "The default MTU (Maximum Transmission Unit) size is 1480 bytes, which is usually fine. For some ISPs, you need modify the MTU. This should not be done unless you are sure it is necessary for your ISP."
            }, {
                "type": "name",
                "title": "Service Name/Access Concentrator Name",
                "content": "The service name and AC (Access Concentrator) name should not be done unless you are sure it is necessary for your ISP."
            }, {
                "type": "name",
                "title": "Detect Online Interval",
                "content": "The default value is 0, you can input the value between 0 and 120. The Router will detect Access Concentrator online every interval seconds. If the value is 0, it means no detection."
            }, {
                "type": "name",
                "title": "IP Address",
                "content": "If your ISP provides the IP address, select \"Use the Following IP Address\" and enter the IP Addresses manually. Otherwise, the IP address will be assigned automatically."
            }, {
                "type": "name",
                "title": "DNS Address",
                "content": "If your ISP specifies a DNS server IP address for you, click the \"Use the Following DNS Addresses\", and fill the Primary DNS and Secondary DNS blanks below. The Secondary DNS is optional. Otherwise, the DNS address will be assigned dynamically from ISP."
            }, {
                "type": "name",
                "title": "Primary DNS",
                "content": "Enter the Primary DNS Server IP Address provided by your ISP."
            }, {
                "type": "name",
                "title": "Secondary DNS",
                "content": "(Optional) Enter the Secondary DNS Server IP Address provided by your ISP."
            }, {
                "type": "name",
                "title": "Connection Mode",
                "content": "",
                "children": [{
                    "type": "name",
                    "title": "Auto",
                    "content": "Connect automatically after the Router is disconnected. "
                }, {
                    "type": "name",
                    "title": "On Demand",
                    "content": "You can configure the Router to disconnect your Internet connection after a specified period of the Internet connectivity (Max Idle Time). If your Internet connection has been terminated due to inactivity, On Demand enables the Router to automatically re-establish your connection when you attempt to access the Internet again. If you wish to activate Connect on Demand, put a check mark in the circle. If you want your Internet connection to remain active all the times, enter 0 in the Max Idle Time field."
                }, {
                    "type": "name",
                    "title": "Time Based",
                    "content": "You can configure the Router to connect or disconnect based on time. Select the start time and end time in the Period of Time fields."
                }, {
                    "type": "name",
                    "title": "Manually",
                    "content": "You can configure the Router to connect or disconnect manually. After a specified period of inactivity (Max Idle Time), the Router will disconnect your Internet connection, and not be able to re-establish your connection automatically when you attempt to access the Internet again. If you want your Internet connection to remain active all the times, enter 0 in the Max Idle Time field. Otherwise, enter the number in minutes that you wish to have the Internet connecting last unless a new link requested."
                }]
            }, {
                "type": "note",
                "title": "Note",
                "content": ["1. Sometimes the connection cannot be disconnected although you specify a Max Idle Time (0~99 mins) because some applications are visiting the Internet continually in the background.", "2. Only when you have set the system time on <strong>System Tools -> Time Settings</strong> page, the Time-based function can take effect."]
            }, {
                "type": "paragraph",
                "content": "Click <strong>Connect</strong> to connect immediately."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Disconnect</strong> to disconnect immediately."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Save</strong> to save all your settings."
            }]
        },
        "INTERNET_BIGPOND": {
            "TITLE": "BigPond Cable Help",
            "CONTENT": [{
                "type": "name",
                "title": "Internet Connection Type",
                "content": "<strong>BigPond Cable</strong>"
            }, {
                "type": "name",
                "title": "User Name/Password",
                "content": "Enter the User Name and Password provided by your ISP. These fields are case-sensitive. Auth Server - Enter the authenticating server IP address or host name."
            }, {
                "type": "name",
                "title": "Auth Domain",
                "content": "Type in the domain suffix server name based on your location, e.g."
            }, {
                "type": "name",
                "title": "NSW / ACT",
                "content": "nsw.bigpond.net.au"
            }, {
                "type": "name",
                "title": "VIC / TAS / WA / SA / NT",
                "content": "vic.bigpond.net.au"
            }, {
                "type": "name",
                "title": "QLD",
                "content": "qld.bigpond.net.au"
            }, {
                "type": "name",
                "title": "MTU Size",
                "content": "The normal MTU (Maximum Transmit Unit) value for most Ethernet networks is 1500 bytes. For some ISPs, you may need to modify the MTU. But this is rarely required, and should not be done unless you are sure it is necessary for your ISP connection."
            }, {
                "type": "name",
                "title": "Connection Mode",
                "content": "",
                "children": [{
                    "type": "name",
                    "title": "Auto",
                    "content": "Connect automatically after the Router is disconnected. "
                }, {
                    "type": "name",
                    "title": "On Demand",
                    "content": "You can configure the Router to disconnect your Internet connection after a specified period of the Internet connectivity (Max Idle Time). If your Internet connection has been terminated due to inactivity, On Demand enables the Router to automatically re-establish your connection when you attempt to access the Internet again. If you wish to activate Connect on Demand, put a check mark in the circle. If you want your Internet connection to remain active all the times, enter 0 in the Max Idle Time field."
                }, {
                    "type": "name",
                    "title": "Manually",
                    "content": "You can configure the Router to connect or disconnect manually. After a specified period of inactivity (Max Idle Time), the Router will disconnect your Internet connection, and not be able to re-establish your connection automatically when you attempt to access the Internet again. If you want your Internet connection to remain active all the times, enter 0 in the Max Idle Time field. Otherwise, enter the number in minutes that you wish to have the Internet connecting last unless a new link requested."
                }]
            }, {
                "type": "name",
                "title": "Note",
                "content": "Sometimes the connection cannot be disconnected although you specify a Max Idle Time (0~99 mins) because some applications are visiting the Internet continually in the background."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Connect</strong> to connect immediately."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Disconnect</strong> to disconnect immediately."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Save</strong> to save all your settings."
            }]
        },
        "INTERNET_L2TP": {
            "TITLE": "L2TP Help",
            "CONTENT": [{
                "type": "name",
                "title": "Internet Connection Type",
                "content": "<strong>L2TP</strong>"
            }, {
                "type": "name",
                "title": "User Name/Password",
                "content": "Enter the User Name and Password provided by your ISP. These fields are case-sensitive. Internet IP Address - The IP address assigned by your L2TP server."
            }, {
                "type": "name",
                "title": "Internet IP Address",
                "content": "The IP address assigned by your L2TP server."
            }, {
                "type": "name",
                "title": "Internet Primary DNS",
                "content": "The DNS IP address assigned by L2TP server."
            }, {
                "type": "name",
                "title": "Internet Secondary DNS",
                "content": "Another DNS IP address assigned by L2TP server."
            }, {
                "type": "name",
                "title": "Secondary Connection",
                "content": "Select Static IP if IP address, subnet mask, gateway and DNS server address have been provided by your ISP. Otherwise, please select Dynamic IP."
            }, {
                "type": "name",
                "title": "VPN Server IP/Domain Name",
                "content": "Enter the Server IP Address or Domain Name provided by your ISP."
            }, {
                "type": "name",
                "title": "IP address",
                "content": "Enter the IP address used for dial-up. (Only can be configured when Static IP is selected)"
            }, {
                "type": "name",
                "title": "Subnet Mask",
                "content": "Enter the subnet mask provided by your ISP. (Only can be configured when Static IP is selected)"
            }, {
                "type": "name",
                "title": "Gateway",
                "content": "Enter gateway provided by your ISP. (Only can be configured when Static IP is selected)"
            }, {
                "type": "name",
                "title": "Primary DNS",
                "content": "(Optional) Enter the DNS IP address in dotted-decimal notation provided by your ISP. (Only can be configured when Static IP is selected)"
            }, {
                "type": "name",
                "title": "Secondary DNS",
                "content": "(Optional) Enter another DNS IP address in dotted-decimal notation provided by your ISP. (Only can be configured when Static IP is selected)"
            }, {
                "type": "name",
                "title": "MTU Size",
                "content": "The normal MTU (Maximum Transmit Unit) value for most Ethernet networks is 1500 bytes. For some ISPs, you may need to modify the MTU. But this is rarely required, and should not be done unless you are sure it is necessary for your ISP connection."
            }, {
                "type": "name",
                "title": "Connection Mode",
                "content": "",
                "children": [{
                    "type": "name",
                    "title": "Auto",
                    "content": "Connect automatically after the Router is disconnected. "
                }, {
                    "type": "name",
                    "title": "On Demand",
                    "content": "You can configure the Router to disconnect your Internet connection after a specified period of the Internet connectivity (Max Idle Time). If your Internet connection has been terminated due to inactivity, On Demand enables the Router to automatically re-establish your connection when you attempt to access the Internet again. If you wish to activate Connect on Demand, put a check mark in the circle. If you want your Internet connection to remain active all the times, enter 0 in the Max Idle Time field."
                }, {
                    "type": "name",
                    "title": "Manually",
                    "content": "You can configure the Router to connect or disconnect manually. After a specified period of inactivity (Max Idle Time), the Router will disconnect your Internet connection, and not be able to re-establish your connection automatically when you attempt to access the Internet again. If you want your Internet connection to remain active all the times, enter 0 in the Max Idle Time field. Otherwise, enter the number in minutes that you wish to have the Internet connecting last unless a new link requested."
                }]
            }, {
                "type": "name",
                "title": "Note",
                "content": "Sometimes the connection cannot be disconnected although you specify a Max Idle Time (0~99 mins) because some applications are visiting the Internet continually in the background."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Connect</strong> to connect immediately."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Disconnect</strong> to disconnect immediately."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Save</strong> to save all your settings."
            }]
        },
        "INTERNET_PPTP": {
            "TITLE": "PPTP Help",
            "CONTENT": [{
                "type": "name",
                "title": "Internet Connection Type",
                "content": "<strong>PPTP</strong>"
            }, {
                "type": "name",
                "title": "User Name/Password",
                "content": "Enter the User Name and Password provided by your ISP. These fields are case-sensitive."
            }, {
                "type": "name",
                "title": "Internet IP Address",
                "content": "The IP address assigned by your PPTP server."
            }, {
                "type": "name",
                "title": "Internet Primary DNS",
                "content": "The DNS IP address assigned by PPTP server."
            }, {
                "type": "name",
                "title": "Internet Secondary DNS",
                "content": "Another DNS IP address assigned by PPTP server."
            }, {
                "type": "name",
                "title": "Secondary Connection",
                "content": "Select Static IP if IP address, subnet mask, gateway and DNS server address have been provided by your ISP. Otherwise, please select Dynamic IP."
            }, {
                "type": "name",
                "title": "VPN Server IP/Domain Name",
                "content": "Enter the Server IP Address or Domain Name provided by your ISP."
            }, {
                "type": "name",
                "title": "IP address",
                "content": "Enter the IP Address provided by your ISP (only if Static IP is selected)."
            }, {
                "type": "name",
                "title": "Subnet Mask",
                "content": "Enter the Subnet Mask provided by your ISP (only if Static IP is selected)."
            }, {
                "type": "name",
                "title": "Gateway",
                "content": "Enter the Default Gateway provided by your ISP (only if Static IP is selected). "
            }, {
                "type": "name",
                "title": "Primary DNS",
                "content": "Enter the Primary DNS Server IP Address provided by your ISP (only if Static IP is selected)."
            }, {
                "type": "name",
                "title": "Secondary DNS",
                "content": "Enter the Secondary DNS Server IP Address provided by your ISP (only if Static IP is selected)."
            }, {
                "type": "name",
                "title": "MTU Size",
                "content": "The normal MTU (Maximum Transmit Unit) value for most Ethernet networks is 1500 bytes. For some ISPs, you may need to modify the MTU. But this is rarely required, and should not be done unless you are sure it is necessary for your ISP connection."
            }, {
                "type": "name",
                "title": "Connection Mode",
                "content": "",
                "children": [{
                    "type": "name",
                    "title": "Auto",
                    "content": "Connect automatically after the Router is disconnected."
                }, {
                    "type": "name",
                    "title": "On Demand",
                    "content": "You can configure the Router to disconnect your Internet connection after a specified period of the Internet connectivity (Max Idle Time). If your Internet connection has been terminated due to inactivity, On Demand enables the Router to automatically re-establish your connection when you attempt to access the Internet again. If you wish to activate Connect on Demand, put a check mark in the circle. If you want your Internet connection to remain active all the times, enter 0 in the Max Idle Time field."
                }, {
                    "type": "name",
                    "title": "Manually",
                    "content": "You can configure the Router to connect or disconnect manually. After a specified period of inactivity (Max Idle Time), the Router will disconnect your Internet connection, and not be able to re-establish your connection automatically when you attempt to access the Internet again. If you want your Internet connection to remain active all the times, enter 0 in the Max Idle Time field. Otherwise, enter the number in minutes that you wish to have the Internet connecting last unless a new link requested."
                }]
            }, {
                "type": "name",
                "title": "Note",
                "content": "Sometimes the connection cannot be disconnected although you specify a Max Idle Time (0~99 mins) because some applications are visiting the Internet continually in the background."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Connect</strong> to connect immediately."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Disconnect</strong> to disconnect immediately."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Save</strong> to save all your settings."
            }]
        },
        "INTERNET_IPV6_DYNAMIC": {
            "TITLE": "IPv6 Dynamic IP Help",
            "CONTENT": [{
                "type": "name",
                "title": "Enable IPv6",
                "content": "Enable or disable the IPv6 feature."
            }, {
                "type": "name",
                "title": "Connection Type",
                "content": "Choosing the correct connection type based on your ISP network topology."
            }, {
                "type": "name",
                "title": "Dynamic IP",
                "content": "Connections which use dynamic IPv6 address assignment."
            }, {
                "type": "name",
                "title": "IPv6 Address",
                "content": "The IPv6 address assigned by your ISP dynamically."
            }, {
                "type": "name",
                "title": "Primary DNS",
                "content": "The DNS address provided by your ISP."
            }, {
                "type": "name",
                "title": "Secondary DNS",
                "content": "Another DNS address provided by your ISP."
            }, {
                "type": "paragraph",
                "content": "Click the <strong>Renew</strong> button to renew the IPv6 parameters from your ISP."
            }, {
                "type": "paragraph",
                "content": "Click the <strong>Release</strong> button to release the IPv6 parameters from your ISP."
            }, {
                "type": "paragraph",
                "content": "Click the <strong>Advanced</strong> button to set up the advanced options."
            }, {
                "type": "name",
                "title": "Get non-temporary IPv6 address",
                "content": "Get a non-temporary IPv6 address from the ISP."
            }, {
                "type": "name",
                "title": "Get IPv6 prefix delegation",
                "content": " Get a temporary IPv6 address and an IPv6 prefix from the ISP, the temporary IPv6 address is set to the WAN port, and the LAN port advertises the IPv6 address prefix by RADVD."
            }, {
                "type": "paragraph",
                "content": "If your ISP gives you one or two DNS IPv6 addresses, select Use Following DNS Address and enter the Primary DNS and Secondary DNS into the correct fields. Otherwise, the DNS servers will be assigned from ISP dynamically."
            }, {
                "type": "name",
                "title": "Primary DNS",
                "content": "Enter the DNS IPv6 address in colon-hexadecimal notation provided by your ISP."
            }, {
                "type": "name",
                "title": "Secondary DNS",
                "content": "Enter another DNS IPv6 address in colon-hexadecimal notation provided by your ISP."
            }, {
                "type": "name",
                "title": "Note",
                "content": "If you get Address not found error when you access a Web site, it is likely that your DNS servers are set up improperly. You should contact your ISP to get DNS server addresses."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Save</strong> to save all your settings."
            }]
        },
        "INTERNET_IPV6_STATIC": {
            "TITLE": "IPv6 Static IP Help",
            "CONTENT": [{
                "type": "name",
                "title": "Enable IPv6",
                "content": "Enable or disable the IPv6 feature."
            }, {
                "type": "name",
                "title": "Connection Type",
                "content": "Choosing the correct connection type based on your ISP network topology."
            }, {
                "type": "name",
                "title": "Static IP",
                "content": "Connections which use static IPv6 address assignment."
            }, {
                "type": "name",
                "title": "IPv6 Address",
                "content": "Enter the IPv6 address in colon-hexadecimal notation provided by your ISP."
            }, {
                "type": "name",
                "title": "Default Gateway",
                "content": "Enter the default gateway in colon-hexadecimal notation provided by your ISP."
            }, {
                "type": "name",
                "title": "Primary DNS",
                "content": "Enter the DNS IPv6 address in colon-hexadecimal notation provided by your ISP."
            }, {
                "type": "name",
                "title": "Secondary DNS",
                "content": "Enter another DNS IPv6 address in colon-hexadecimal notation provided by your ISP."
            }, {
                "type": "name",
                "title": "MTU Size",
                "content": "The normal MTU (Maximum Transmission Unit) value for most Ethernet networks is 1500 Bytes. For some ISPs, you may need to modify the MTU. But this is rarely required, and should not be done unless you are sure it is necessary for your ISP connection."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Save</strong> to save all your settings."
            }]
        },
        "INTERNET_IPV6_PPPOE": {
            "TITLE": "IPv6 PPPoE Help",
            "CONTENT": [{
                "type": "name",
                "title": "Enable IPv6",
                "content": "Enable or disable the IPv6 feature."
            }, {
                "type": "name",
                "title": "Connection Type",
                "content": "Choosing the correct connection type based on your ISP network topology."
            }, {
                "type": "name",
                "title": "PPPoE",
                "content": "Connections which use PPPoEv6 that requires a user name and password."
            }, {
                "type": "name",
                "title": "User Name/Password",
                "content": "Enter the User Name and Password provided by your ISP. These fields are case-sensitive."
            }, {
                "type": "name",
                "title": "IPv6 Address",
                "content": "The IPv6 address assigned by your ISP dynamically."
            }, {
                "type": "paragraph",
                "content": "Click the <strong>Advanced</strong> button to set up the advanced options."
            }, {
                "type": "name",
                "title": "Get IPv6 Address Way",
                "content": "",
                "children": [{
                    "type": "name",
                    "title": "Non-temporary",
                    "content": " Get a non-temporary IPv6 address by DHCPv6 from the ISP."
                }, {
                    "type": "name",
                    "title": "Prefix delegation",
                    "content": "Get a prefix delegation IPv6 address by DHCPv6 from the ISP, and the clients in LAN create IPv6 address with the delegation."
                }, {
                    "type": "name",
                    "title": "Specified by ISP",
                    "content": "Input a static IPv6 address from the ISP."
                }]
            }, {
                "type": "paragraph",
                "content": "Click <strong>Connect</strong> to connect immediately."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Disconnect</strong> to disconnect immediately."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Save</strong> to save all your settings."
            }]
        },
        "INTERNET_IPV6_6TO4": {
            "TITLE": "IPv6 Tunnel 6to4 Help",
            "CONTENT": [{
                "type": "name",
                "title": "Enable IPv6",
                "content": "Enable or disable the IPv6 feature."
            }, {
                "type": "name",
                "title": "Connection Type",
                "content": "Choosing the correct connection type based on your ISP network topology."
            }, {
                "type": "name",
                "title": "Tunnel 6to4",
                "content": "Connections which use 6to4 address assignment."
            }, {
                "type": "name",
                "title": "IPv4 Address",
                "content": "The IPv4 address assigned by your ISP dynamically."
            }, {
                "type": "name",
                "title": "IPv4 Subnet Mask",
                "content": "The IPv4 subnet mask assigned by your ISP dynamically."
            }, {
                "type": "name",
                "title": "IPv4 Default Gateway",
                "content": "The IPv4 gateway assigned by your ISP dynamically."
            }, {
                "type": "name",
                "title": "Tunnel Address",
                "content": "The IPv6 address assigned by your ISP dynamically."
            }, {
                "type": "paragraph",
                "content": "Click the <strong>Advanced</strong> button to set up the advanced options."
            }, {
                "type": "paragraph",
                "content": "If your ISP gives you one or two DNS IPv6 addresses, select <strong>Use Following DNS Address</strong> and enter the <strong>Primary DNS</strong> and <strong>Secondary DNS</strong> into the correct fields. Otherwise, the DNS servers will be assigned from ISP dynamically."
            }, {
                "type": "name",
                "title": "Primary DNS",
                "content": "Enter the DNS IPv6 address in colon-hexadecimal notation provided by your ISP."
            }, {
                "type": "name",
                "title": "Secondary DNS",
                "content": "Enter another DNS IPv6 address in colon-hexadecimal notation provided by your ISP."
            }, {
                "type": "name",
                "title": "Note",
                "content": "If you get Address not found error when you access a Web site, it is likely that your DNS servers are set up improperly. You should contact your ISP to get DNS server addresses."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Connect</strong> to connect immediately."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Disconnect</strong> to disconnect immediately."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Save</strong> to save all your settings."
            }]
        },
        "LAN_IPV4": {
            "TITLE": "You can configure the IP parameters of LAN on this page.",
            "CONTENT": [{
                "type": "note",
                "title": "Note",
                "content": ["1. If you change the LAN IP address, you must use the new IP address to login to the Router.", "2. If the new LAN IP address you set is not in the same subnet with the previous one, the IP Address pool in the DHCP server will be configured automatically, but the Virtual Server and DMZ Host will not take effect until they are re-configured."]
            }, {
                "type": "paragraph",
                "content": "Click <strong>Save</strong> to save all your settings."
            }]
        },
        "LAN_IPV6": {
            "TITLE": "LAN IPv6 Help",
            "CONTENT": [{
                "type": "name",
                "title": "Assign Type",
                "content": "The way how the router assign IPv6 address for PC in LAN, SLAAC(Stateless address autoconfiguration) and DHCPv6 (Dynamic Host Configuration Protocol for IPv6) Server."
            }, {
                "type": "name",
                "title": "Address Prefix",
                "content": "The LAN global IPv6 address of the Router"
            }, {
                "type": "name",
                "title": "Release Time",
                "content": "The release time of (Only can be configured when DHCPv6 is selected)"
            }, {
                "type": "name",
                "title": "Address",
                "content": "The physical address of the LAN port."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Save</strong> to save all your settings."
            }]
        },
        "DHCP_SERVER": {
            "TITLE": "Settings",
            "CONTENT": [{
                "type": "paragraph",
                "content": "This device is set up by default as a DHCP (Dynamic Host Configuration Protocol) server, which provides the TCP/IP configuration for all the PCs that connected to this device in the LAN.",
                "children": [{
                    "type": "name",
                    "title": "DHCP Server",
                    "content": "Enable or Disable the server. If you disable the Server, you must have another DHCP server within your network or else you must configure the IP address of the computer manually."
                }, {
                    "type": "name",
                    "title": "IP Address Pool",
                    "content": "This field specifies the start and end IP Address that may be leased to clients. 192.168.0.100 is the default start IP address. 192.168.0.199 is the default end IP address."
                }, {
                    "type": "name",
                    "title": "Address Lease Time",
                    "content": "The Address Lease Time is the length of time a network user will be allowed to keep connecting to this device with the current DHCP Address. Enter the amount of time, in minutes, that the DHCP address will be \"leased\". The time range is 1~2880 minutes. The default value is 120 minutes."
                }, {
                    "type": "name",
                    "title": "Default Gateway",
                    "content": " (Optional) Suggest to input the IP Address of the LAN port of this device. The default value is 192.168.0.1."
                }, {
                    "type": "name",
                    "title": "Default Domain",
                    "content": "(Optional) Input the domain name of your network."
                }, {
                    "type": "name",
                    "title": "Primary DNS",
                    "content": "(Optional) Input the DNS IP address provided by your ISP. "
                }, {
                    "type": "name",
                    "title": "Secondary DNS",
                    "content": "(Optional) You can input the IP Address of another DNS server if your ISP provides two DNS servers."
                }]
            }, {
                "type": "name",
                "title": "Note",
                "content": "To use the DHCP server function of this device, you should configure all computers in the LAN as \"Obtain an IP Address automatically\" mode. This function will take effect until this device reboots."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Save</strong> to save the changes."
            }, {
                "type": "title",
                "content": "Client List"
            }, {
                "type": "paragraph",
                "content": "This page shows Client Name, MAC Address, Assigned IP Address and Lease Time of each DHCP Client connected to this device.",
                "children": [{
                    "type": "name",
                    "title": "Client Name",
                    "content": "The name of the DHCP client."
                }, {
                    "type": "name",
                    "title": "MAC Address",
                    "content": "The MAC address of the DHCP client."
                }, {
                    "type": "name",
                    "title": "Assigned IP Address",
                    "content": "The IP address this device has allocated to the DHCP client."
                }, {
                    "type": "name",
                    "title": "Lease Time",
                    "content": "The time of the DHCP client leased."
                }]
            }, {
                "type": "paragraph",
                "content": "You cannot change any of the values on this form. To update this form and to show the current connected devices, click on the <strong>Refresh</strong> button."
            }, {
                "type": "title",
                "content": "Address Reservation"
            }, {
                "type": "paragraph",
                "content": "When you specify a reserved IP address for a PC in the LAN, that PC will always receive the same IP address each time when it accesses the DHCP server. Reserved IP addresses could be assigned to servers that require permanent IP settings.",
                "children": [{
                    "type": "name",
                    "title": "MAC Address",
                    "content": "The MAC Address of the PC that you want to reserve an IP address for."
                }, {
                    "type": "name",
                    "title": "Reserved IP Address",
                    "content": "The IP address this device reserved."
                }, {
                    "type": "name",
                    "title": "Description",
                    "content": "The description for the reservation address."
                }, {
                    "type": "name",
                    "title": "Enable",
                    "content": "It shows whether the entry is enabled or not."
                }, {
                    "type": "name",
                    "title": "Modify",
                    "content": "To modify or delete an existing entry."
                }]
            }, {
                "type": "note",
                "title": "To Reserve IP Addresses, you can follow these steps:",
                "content": ["1. Enter the MAC Address (The format for the MAC Address is XX-XX-XX-XX-XX-XX) and the IP address in dotted-decimal notation of the computer you wish to add. Add description for your adding item which is optional. Select or not enable this entry.", "2. Click the OK button."]
            }, {
                "type": "note",
                "title": "To modify a Reserved IP Address, you can follow these steps:",
                "content": ["1. Select the reserved address entry as you desired, modify it. If you wish to delete the entry, click the Delete link of the entry.", "2. Click the Save button."]
            }, {
                "type": "paragraph",
                "content": "Click the <strong>Add</strong> button to add a new Address Reservation entry."
            }, {
                "type": "paragraph",
                "content": "Click the <strong>Delete</strong> button to delete the selected entries in the table."
            }, {
                "type": "paragraph",
                "content": "Click the <strong>Next</strong> button to go to the next page, or click the Previous button return to the previous page."
            }]
        },
        "ADVANCED_ROUTING": {
            "TITLE": "Static Routing",
            "CONTENT": [{
                "type": "paragraph",
                "content": "A static route is a pre-determined path that network information must follow to reach a specific host or network. Use the Static Routing page to add or delete a route."
            }, {
                "type": "note",
                "title": "To add static routing entries:",
                "content": ["1. Click the Add button.", "2. Enter the following data:"]
            }, {
                "type": "paragraph",
                "content": "",
                "children": [{
                    "type": "name",
                    "title": "Destination Network",
                    "content": "The Destination IP Address is the address of the network or host that you want to assign to a static route."
                }, {
                    "type": "name",
                    "title": "Subnet Mask",
                    "content": "The Subnet Mask determines which portion of an IP address is the network portion, and which portion is the host portion."
                }, {
                    "type": "name",
                    "title": "Default Gateway",
                    "content": "This is the IP address of the default gateway device that allows for the contact between the Router and the network or host."
                }, {
                    "type": "name",
                    "title": "Description",
                    "content": "This is the description for you adding entry."
                }]
            }, {
                "type": "note",
                "title": "",
                "content": ["3. Click the <strong>checkbox</strong> to Enable the entry.", "4. Click the <strong>OK</strong> button to save the changes."]
            }, {
                "type": "note",
                "title": "To modify or delete an existing entry:",
                "content": ["1. Find the desired entry in the table.", "2. Click <strong>Modify</strong> or <strong>Delete</strong> as desired on the Modify column."]
            }, {
                "type": "title",
                "content": "System Routing Table"
            }, {
                "type": "paragraph",
                "content": "System routing table views all of the valid route entries in use. The Destination IP address, Subnet Mask, Gateway, and Interface will be displayed for each entry. Click the Refresh button to refresh the data displayed.",
                "children": [{
                    "type": "name",
                    "title": "Destination Network",
                    "content": "The Destination Network is the address of the network or host to which the static route is assigned."
                }, {
                    "type": "name",
                    "title": "Subnet Mask",
                    "content": "The Subnet Mask determines which portion of an IP address is the network portion, and which portion is the host portion."
                }, {
                    "type": "name",
                    "title": "Gateway",
                    "content": "This is the IP address of the gateway device that allows for contact between the Router and the network or host."
                }, {
                    "type": "name",
                    "title": "Interface",
                    "content": "This interface tells you whether the Destination IP Address is on the LAN & WLAN (internal wired and wireless networks), the WAN (Internet)."
                }]
            }]
        },
        "STREAM_BOOST_NETWORK": {
            "TITLE": "Arrow Indicators to/from Internet:",
            "CONTENT": [{
                "type": "title",
                "content": "Arrow indicators to/from Router",
                "children": [{
                    "type": "name",
                    "title": "Towards devices",
                    "content": "Bandwidth being used by indicated devices(download bandwidth)."
                }, {
                    "type": "name",
                    "title": "Towards router",
                    "content": "Bandwidth being sent by indicated devices(upload bandwidth)."
                }]
            }, {
                "type": "title",
                "content": "Click on Router Image to see more details about applications running on all active devices."
            }, {
                "type": "title",
                "content": "Operating system type icon",
                "children": [{
                    "type": "paragraph",
                    "content": "The number on operating system type icon indicates how many of this type of machine units are. Click the icon, and it will show the detailed information of this type of machine."
                }]
            }]
        },
        "STREAM_BOOST_ROUTER": {
            "TITLE": "Network Router Help",
            "CONTENT": [{
                "type": "paragraph",
                "content": "All Active devices are listed"
            }, {
                "type": "title",
                "content": "Devices can be selected to show its active applications",
                "children": [{
                    "type": "paragraph",
                    "content": "The corresponding progress bar of the device shows the currently occupied up/down bandwith by this device."
                }]
            }, {
                "type": "title",
                "content": "Up/Down Bandwidth Graphs",
                "children": [{
                    "type": "paragraph",
                    "content": "Graphs show bandwidth usage to and from devices over the last minute."
                }]
            }]
        },
        "STREAM_BOOST_DEVICES": {
            "TITLE": "Application Icons",
            "CONTENT": [{
                "type": "title",
                "content": "Bandwidth Indication",
                "children": [{
                    "type": "paragraph",
                    "content": "Top gray indicator is bandwidth being sent from the associated application"
                }, {
                    "type": "paragraph",
                    "content": "Bottom blue indicator is bandwidth being used by the associated application"
                }]
            }, {
                "type": "title",
                "content": "Experience Indicator",
                "children": [{
                    "type": "name",
                    "title": "Green Circle",
                    "content": "Application running with fully allocated optimal policy. Applications should perform as expected."
                }, {
                    "type": "name",
                    "title": "Blue Circle",
                    "content": "Application performance protected, but constrained due to limited total bandwidth. Application performance will perform well, may see lower than expected resolutions."
                }, {
                    "type": "name",
                    "title": "Orange Circle",
                    "content": "Application operating unprotected due to insufficient bandwidth may experience interruptions or slow service."
                }]
            }, {
                "type": "title",
                "content": "Up/Down Bandwidth Graphs",
                "children": [{
                    "type": "paragraph",
                    "content": "Graphs show bandwidth usage to and from devices over the last minute."
                }]
            }]
        },
        "STREAM_BOOST_BANDWIDTH": {
            "TITLE": "Enable StreamBoost Bandwidth Control",
            "CONTENT": [{
                "type": "title",
                "content": "Enable Auto Bandwidth Estimation",
                "children": [{
                    "type": "paragraph",
                    "content": "Checking this box allows StreamBoost to accurately measure available bandwidth on your network. Auto bandwidth measurements drives internet usage, so this may not be the best solution if under bandwidth usage restrictions."
                }, {
                    "type": "paragraph",
                    "content": "If not selected, you can manually enter bandwidth (speed) values. See instructions below."
                }]
            }, {
                "type": "title",
                "content": "Entering Download/Upload Speed using the Test button",
                "children": [{
                    "type": "paragraph",
                    "content": "Uncheck Enable Auto Bandwidth Estimation"
                }, {
                    "type": "paragraph",
                    "content": "You can use the Test button to measure the bandwidth. Be sure that all devices are not active on the network for an accurate measurement."
                }, {
                    "type": "paragraph",
                    "content": "If the value returns an acceptable value, save the entry."
                }]
            }, {
                "type": "title",
                "content": "Manually entering Download/Upload Speed",
                "children": [{
                    "type": "paragraph",
                    "content": "Uncheck Enable Auto Bandwidth Estimation"
                }, {
                    "type": "paragraph",
                    "content": "Manually enter the values in the dialog boxes. Any setting entered here must not exceed the actual BW allocated to your home or StreamBoost will not operate optimally."
                }]
            }]
        },
        "STREAM_BOOST_PRIORITY": {
            "TITLE": "Changing Device Priority",
            "CONTENT": [{
                "type": "title",
                "content": "What is device priority used for?",
                "children": [{
                    "type": "paragraph",
                    "content": "Device priorities are used when active applications require more bandwidth than is currently available. In this condition, lower priority devices may have bandwidth taken from them in order to ensure the appropriate amount of bandwidth is going to the higher priority devices"
                }]
            }, {
                "type": "title",
                "content": "Device Priority FAQ’s",
                "children": [{
                    "type": "name",
                    "title": "Will a download from a higher priority device affect a movie , game or VoIP call on a lower priority device",
                    "content": "No, experience-based applications are traffic shaped so that data transfer and general browsing applications do not disturb their experience."
                }, {
                    "type": "name",
                    "title": "When should I change the priority of a device?",
                    "content": "Changing the priority of a device should only be necessary if the device is experiencing streaming or real-time application performance issues when other devices are running the same application types. Changing device priority will then favor the higher priority device when running similar applications."
                }]
            }]
        },
        "STREAM_BOOST_STATISTICS_UPTIME": {
            "TITLE": "Graph",
            "CONTENT": [{
                "type": "name",
                "title": "Time Range",
                "content": "What time period do want to examine?",
                "children": [{
                    "type": "name",
                    "title": "Last Day",
                    "content": "Traffic from the last day"
                }, {
                    "type": "name",
                    "title": "Last Week",
                    "content": "Traffic from the last week"
                }, {
                    "type": "name",
                    "title": "Last Month",
                    "content": "Traffic from the last month"
                }]
            }, {
                "type": "name",
                "title": "Devices",
                "content": "What device/devices network traffic do you want to examine?",
                "children": [{
                    "type": "name",
                    "title": "All LAN Hosts",
                    "content": "Every device that is on your network"
                }, {
                    "type": "name",
                    "title": "Specific device",
                    "content": "Dispay just applicitions from the selected device"
                }]
            }]
        },
        "STREAM_BOOST_STATISTICS_DOWNLOADS": {
            "TITLE": "Graph",
            "CONTENT": []
        },
        "BASIC_NETWORK": {
            "TITLE": "Network Map Help",
            "CONTENT": [{
                "type": "paragraph",
                "content": "The <strong>Network Map</strong> section indicates your router's current settings and configuration status."
            }, {
                "type": "name",
                "title": "Internet",
                "content": "The following parameters apply to the WAN ports of the Router."
            }, {
                "type": "name",
                "title": "MAC Address",
                "content": "The physical address of the WAN/Internet port."
            }, {
                "type": "name",
                "title": "IP Address",
                "content": "The IP parameter used by the router to access the Internet. If the IP Address is 0.0.0.0, it means no Internet connection is established."
            }, {
                "type": "name",
                "title": "Gateway",
                "content": "The IP parameter used by the router to access the Internet."
            }, {
                "type": "name",
                "title": "Wireless/Wired Clients",
                "content": "The wireless/wired clients currently connected to the router."
            }, {
                "type": "name",
                "title": "ID",
                "content": "The ID number of the connected wireless/wired device(s)."
            }, {
                "type": "name",
                "title": "Name",
                "content": "The Name of the connected wireless/wired device(s)."
            }, {
                "type": "name",
                "title": "IP Address",
                "content": "The IP Address of the connected wireless/wired device(s)."
            }, {
                "type": "name",
                "title": "MAC Address",
                "content": "The MAC Address of the connected wireless/wired device(s)."
            }, {
                "type": "name",
                "title": "Wireless 2.4GHz | 5GHz-1 | 5GHz-2",
                "content": "The current settings of the Wireless Network. You may proceed to configuration in the <strong>Wireless</strong> section."
            }, {
                "type": "name",
                "title": "Name(SSID)",
                "content": "The SSID of the Router."
            }, {
                "type": "name",
                "title": "Channel",
                "content": "The wireless channel that's currently in use."
            }, {
                "type": "name",
                "title": "MAC Address",
                "content": "The physical address of the WLAN/Internet port."
            }, {
                "type": "name",
                "title": "Guest Network 2.4GHz | 5GHz-1 | 5GHz-2",
                "content": "The current settings of the Guest Network. You may proceed to configuration in the <strong>Guest Network</strong> section."
            }, {
                "type": "name",
                "title": "Status",
                "content": "It indicates whether the Guest Network is enabled or disabled."
            }, {
                "type": "name",
                "title": "Name(SSID)",
                "content": "The SSID of the Guest Network."
            }, {
                "type": "name",
                "title": "USB",
                "content": "The current settings of the USB device. You may proceed to configuration in the <strong>USB Settings</strong> section."
            }, {
                "type": "name",
                "title": "Name",
                "content": "The name of the printer."
            }, {
                "type": "name",
                "title": "Total",
                "content": "The storage capacity of the USB device."
            }, {
                "type": "name",
                "title": "Available",
                "content": "The available space of the USB device."
            }]
        },
        "BASIC_INTERNET_DYNAMIC": {
            "TITLE": "Internet Dynamic IP Help",
            "CONTENT": [{
                "type": "paragraph",
                "content": "If your ISP is running on DHCP server, please select <strong>Dynamic IP</strong>."
            }, {
                "type": "name",
                "title": "Note",
                "content": "If you are not sure what your <strong>Internet Connection Type</strong> is, click the <strong>Detect</strong> button to automatically identify it. You may also contact your Internet Service Provider (ISP) to verify it. The major types of Internet connections are as follows:",
                "children": [{
                    "type": "name",
                    "title": "PPPoE",
                    "content": "Connection that requires a user name and password."
                }, {
                    "type": "name",
                    "title": "Dynamic IP",
                    "content": "Connection that assigns a dynamic IP address."
                }, {
                    "type": "name",
                    "title": "Static IP",
                    "content": " Connection that assigns a static IP address."
                }]
            }, {
                "type": "paragraph",
                "content": "If your ISP provides a cable modem, please proceed the router configuration on wired connection with your main computer, so that you can have the Internet access when directly connected to the ISP's modem."
            }, {
                "type": "paragraph",
                "content": "Why do I need to Clone MAC Address?"
            }, {
                "type": "paragraph",
                "content": "Some ISPs may register the MAC address of your computer which firstly connects to their service, and would not allow the Internet connection for any new computer or router. In this case, you need to clone the MAC address of the computer to the router."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Save</strong> to save all your settings."
            }]
        },
        "BASIC_INTERNET_STATIC": {
            "TITLE": "Internet Static IP Help",
            "CONTENT": [{
                "type": "paragraph",
                "content": "If your ISP provides a Static IP Address, Subnet Mask, Gateway and DNS Settings, please select <strong>Static IP</strong>."
            }, {
                "type": "name",
                "title": "Note",
                "content": "If you are not sure what your <strong>Internet Connection Type</strong> is, click the <strong>Detect</strong> button to automatically identify it. You may also contact your Internet Service Provider (ISP) to verify it. The major types of Internet connections are as follows:",
                "children": [{
                    "type": "name",
                    "title": "PPPoE",
                    "content": "Connection that requires a user name and password."
                }, {
                    "type": "name",
                    "title": "Dynamic IP",
                    "content": "Connection that assigns a dynamic IP address."
                }, {
                    "type": "name",
                    "title": "Static IP",
                    "content": " Connection that assigns a static IP address."
                }]
            }, {
                "type": "name",
                "title": "IP Address",
                "content": "Enter the IP Address in dotted-decimal notation provided by your ISP."
            }, {
                "type": "name",
                "title": "Subnet Mask",
                "content": "Enter the Subnet Mask provided by your ISP. "
            }, {
                "type": "name",
                "title": "Default Gateway",
                "content": "Enter the Default Gateway provided by your ISP."
            }, {
                "type": "name",
                "title": "Primary DNS",
                "content": "Enter the Primary DNS Server IP Address provided by your ISP."
            }, {
                "type": "name",
                "title": "Secondary DNS",
                "content": "Enter the Secondary DNS Server IP Address provided by your ISP."
            }, {
                "type": "paragraph",
                "content": "Click Save to save all your settings."
            }]
        },
        "BASIC_INTERNET_PPPOE": {
            "TITLE": "Internet PPPoE Help",
            "CONTENT": [{
                "type": "paragraph",
                "content": "If your ISP provides a PPPoE connection, please select <strong>PPPoE</strong>."
            }, {
                "type": "name",
                "title": "Note",
                "content": "If you are not sure what your <strong>Internet Connection Type</strong> is, click the <strong>Detect</strong> button to automatically identify it. You may also contact your Internet Service Provider (ISP) to verify it. The major types of Internet connections are as follows:",
                "children": [{
                    "type": "name",
                    "title": "PPPoE",
                    "content": "Connection that requires a user name and password."
                }, {
                    "type": "name",
                    "title": "Dynamic IP",
                    "content": "Connection that assigns a dynamic IP address."
                }, {
                    "type": "name",
                    "title": "Static IP",
                    "content": " Connection that assigns a static IP address."
                }]
            }, {
                "type": "name",
                "title": "User Name/Password",
                "content": "Enter the User Name and Password provided by your ISP. These fields are case-sensitive."
            }, {
                "type": "paragraph",
                "content": "Click Save to save all your settings."
            }]
        },
        "BASIC_INTERNET_L2TP": {
            "TITLE": "Internet L2TP Help",
            "CONTENT": [{
                "type": "paragraph",
                "content": "If your ISP provides a L2TP connection, please select <strong>L2TP</strong>."
            }, {
                "type": "name",
                "title": "User Name/Password",
                "content": "Enter the User Name and Password provided by your ISP. These fields are case-sensitive."
            }, {
                "type": "name",
                "title": "Dynamic IP/Static IP",
                "content": "Select Static IP if the IP Address, Subnet Mask, Gateway and DNS Server Address are provided by your ISP. Otherwise, please select Dynamic IP."
            }, {
                "type": "name",
                "title": "VPN Server IP/Domain Name",
                "content": "Enter the Server IP Address or Domain Name provided by your ISP."
            }, {
                "type": "name",
                "title": "IP address",
                "content": "Enter the IP Address provided by your ISP (only if Static IP is selected)."
            }, {
                "type": "name",
                "title": "Subnet Mask",
                "content": "Enter the Subnet Mask provided by your ISP (only if Static IP is selected)."
            }, {
                "type": "name",
                "title": "Default Gateway",
                "content": "Enter the Default Gateway provided by your ISP (only if Static IP is selected). "
            }, {
                "type": "name",
                "title": "Primary DNS",
                "content": "Enter the Primary DNS Server IP Address provided by your ISP. (Only can be configured when <strong>Static IP</strong> is selected)"
            }, {
                "type": "name",
                "title": "Secondary DNS",
                "content": "(Optional) Enter the Secondary DNS Server IP Address provided by your ISP. (Only can be configured when <strong>Static IP</strong> is selected)"
            }, {
                "type": "paragraph",
                "content": "Click Save to save all your settings."
            }]
        },
        "BASIC_INTERNET_PPTP": {
            "TITLE": "Internet PPTP Help",
            "CONTENT": [{
                "type": "paragraph",
                "content": "If your ISP provides a PPTP connection, please select <strong>PPTP</strong>."
            }, {
                "type": "name",
                "title": "User Name/Password",
                "content": "Enter the User Name and Password provided by your ISP. These fields are case-sensitive."
            }, {
                "type": "name",
                "title": "Dynamic IP/Static IP",
                "content": "Select Static IP if the IP Address, Subnet Mask, Gateway and DNS Server Address are provided by your ISP. Otherwise, please select Dynamic IP."
            }, {
                "type": "name",
                "title": "VPN Server IP/Domain Name",
                "content": "Enter the VPN Server IP Address or Domain Name provided by your ISP."
            }, {
                "type": "name",
                "title": "IP address",
                "content": "Enter the IP Address provided by your ISP (only if Static IP is selected)."
            }, {
                "type": "name",
                "title": "Subnet Mask",
                "content": "Enter the Subnet Mask provided by your ISP (only if Static IP is selected)."
            }, {
                "type": "name",
                "title": "Default Gateway",
                "content": "Enter the Default Gateway provided by your ISP (only if Static IP is selected). "
            }, {
                "type": "name",
                "title": "Primary DNS",
                "content": "Enter the Primary DNS Server IP Address provided by your ISP. (Only can be configured when <strong>Static IP</strong> is selected)"
            }, {
                "type": "name",
                "title": "Secondary DNS",
                "content": "(Optional) Enter the Secondary DNS Server IP Address provided by your ISP. (Only can be configured when <strong>Static IP</strong> is selected)"
            }, {
                "type": "name",
                "title": "DNS",
                "content": "Enter the DNS Server IP Address provided by your ISP (only if Static IP is selected)."
            }, {
                "type": "paragraph",
                "content": "Click Save to save all your settings."
            }]
        },
        "MAC_FITLERING": {
            "TITLE": "MAC Filtering Help",
            "CONTENT": [{
                "type": "name",
                "title": "Enable MAC Filtering",
                "content": "Enable or disable the MAC Filtering."
            }, {
                "type": "name",
                "title": "Select the Filtering Rule",
                "content": "The device in black list can not access this router.Only the device in white list can access this router."
            }, {
                "type": "name",
                "title": "Devices in Black List",
                "content": "You can add or delete an entry.",
                "children": [{
                    "type": "name",
                    "title": "Add",
                    "content": "To add a wireless MAC Address filtering entry, click the Add, following these instructions:"
                }, {
                    "type": "note",
                    "title": "",
                    "content": [" 1. click <strong>View Existing Devices</strong>, and choose one entry, fill <strong>MAC Address field automatically.", " 2. Enter a simple description of the wireless station in the <strong>Description</strong> field. ", " 3. Select <strong>Enable this entry</strong> or not. ", " 4. Click the <strong>OK</strong> button to save this entry or <strong>Cancel</strong> button to cancel your operation. "]
                }, {
                    "type": "name",
                    "title": "Delete",
                    "content": "Select existing entries to be deleted, and click the Delete."
                }, {
                    "type": "paragraph",
                    "content": "Every entry in Devices in Black List has the Modify column, click  Modify to modify this entry, click  Delete to delete this entry."
                }]
            }]
        },
        "GUSET_NETWORK_SET": {
            "TITLE": "Guest Network Help",
            "CONTENT": [{
                "type": "name",
                "title": "Allow guests to see each other",
                "content": "If this check box is selected, anyone who connects to the Guest Network'SSID can access each other."
            }, {
                "type": "name",
                "title": "Allow guests to access to my local network",
                "content": "If this check box is selected, anyone who connects to the Guest Network'SSID can access the Host's local network."
            }, {
                "type": "paragraph",
                "content": "Click Save to apply the configuration."
            }, {
                "type": "name",
                "title": "Wireless Radio 2.4GHz | 5GHz-1 | 5GHz-2",
                "content": "The Guest Network wireless radio of the Router can be enabled or disabled to allow wireless stations access. If enabled, the wireless stations will be able to access the Router, otherwise, wireless stations will not be able to access the Router."
            }, {
                "type": "name",
                "title": "Network Name (SSID)",
                "content": "Enter a value of up to 32 characters. The same Network Name (SSID) must be assigned to all wireless devices in your Guest Network."
            }, {
                "type": "name",
                "title": "Hide SSID",
                "content": " If you select the Hide SSID checkbox, the wireless router will hide its Guest Network name (SSID) on the air."
            }, {
                "type": "name",
                "title": "Password",
                "content": "You can enter ASCII or Hexadecimal characters. For Hexadecimal, the length should be between 8 and 64 characters; for ASCII, the length should be between 8 and 63 characters."
            }]
        },
*/
        "GUSET_NETWORK_WIRELESS": {
            "TITLE": "Wireless",
            "CONTENT": [{
                "type": "name",
                "title": "Security",
                "content": "You can select one of the following security options. ",
                "children": [{
                    "type": "name",
                    "title": "No Security",
                    "content": "The wireless stations will connect to the Router without any encryption. It is strongly recommended to choose one of the following modes to enable security."
                }, {
                    "type": "name",
                    "title": "WPA/WPA2-Personal",
                    "content": "Select WPA based on pre-shared passphrase.",
                    "children": [{
                        "type": "name",
                        "title": "Version",
                        "content": "You can select one of following versions",
                        "children": [{
                            "type": "name",
                            "title": "Auto",
                            "content": "Select WPA-PSK or WPA2-PSK automatically based on the wireless station's capability and request."
                        }, {
                            /*"type": "name",
                            "title": "WPA-PSK",
                            "content": "Pre-shared key of WPA."
                        }, {*/
                            "type": "name",
                            "title": "WPA2-PSK",
                            "content": "Pre-shared key of WPA2."
                        }]
                    }, {
                        "type": "name",
                        "title": "Encryption",
                        "content": "You can select either Auto, TKIP or AES."
                    }, {
                        "type": "name",
                        "title": "Wireless Password",
                        "content": "You can enter ASCII or Hexadecimal characters. For Hexadecimal, the length should be between 8 and 64 characters; for ASCII, the length should be between 8 and 63 characters."
                    }]
                }, {
                    "type": "name",
                    "title": "WPA/WPA2-Enterprise",
                    "content": "Select WPA based on Radius Server.",
                    "children": [{
                        "type": "name",
                        "title": "Version",
                        "content": "You can select one of following versions",
                        "children": [{
                            "type": "name",
                            "title": "Auto",
                            "content": "Select WPA or WPA2 automatically based on the wireless station's capability and request."
                        }, {
                            "type": "name",
                            "title": "WPA",
                            "content": "Wi-Fi Protected Access. "
                        }, {
                            "type": "name",
                            "title": "WPA2",
                            "content": "WPA version 2. "
                        }]
                    }, {
                        "type": "name",
                        "title": "Encryption",
                        "content": "You can select either Auto, TKIP or AES."
                    }, {
                        "type": "name",
                        "title": "Radius Server IP",
                        "content": "Enter the IP address of the Radius Server."
                    }, {
                        "type": "name",
                        "title": "Radius Port",
                        "content": "Enter the port that radius service used."
                    }, {
                        "type": "name",
                        "title": "Radius Password",
                        "content": "Enter the password for the Radius Server."
                    }]
                }, {
                    "type": "name",
                    "title": "WEP",
                    "content": "Select 802.11 WEP security.",
                    "children": [{
                        "type": "name",
                        "title": "Type",
                        "content": "You can select one of following types",
                        "children": [{
                            "type": "name",
                            "title": "Auto",
                            "content": "Select Shared Key or Open System authentication type automatically based on the wireless station's capability and request."
                        }, {
                            "type": "name",
                            "title": "Shared Key",
                            "content": "Select 802.11 Shared Key authentication."
                        }, {
                            "type": "name",
                            "title": "Open System",
                            "content": "Select 802.11 Open System authentication. "
                        }]
                    }, {
                        "type": "name",
                        "title": "Key Selected",
                        "content": "Select which of the four keys will be used."
                    }, {
                        "type": "name",
                        "title": "WEP Key Format",
                        "content": "You can select ASCII or Hexadecimal format. ASCII Format stands for any combination of keyboard characters in the specified length. Hexadecimal format stands for any combination of hexadecimal digits (0-9, a-f, A-F) in the specified length."
                    }, {
                        "type": "name",
                        "title": "Key Type",
                        "content": "You can select the WEP key length (64-bit, or 128-bit, or 152-bit.) for encryption. \"Disabled\" means this WEP key entry is invalid.",
                        "children": [{
                            "type": "name",
                            "title": "For 64-bit encryption",
                            "content": "You can enter 10 hexadecimal digits (any combination of 0-9, a-f, A-F, and null key is not permitted) or 5 ASCII characters."
                        }, {
                            "type": "name",
                            "title": "For 128-bit encryption",
                            "content": "You can enter 26 hexadecimal digits (any combination of 0-9, a-f, A-F, and null key is not permitted) or 13 ASCII characters."
                        }, {
                            "type": "name",
                            "title": "For 152-bit encryption",
                            "content": "You can enter 32 hexadecimal digits (any combination of 0-9, a-f, A-F, and null key is not permitted) or 16 ASCII characters. "
                        }]
                    }, {
                        "type": "name",
                        "title": "Key Value",
                        "content": "Enter the password for WEP."
                    }]
                }]
            }, {
                "type": "name",
                "title": "Mode",
                "content": "This field determines the wireless mode which the router works on."
            }, {
                "type": "name",
                "title": "Channel Width",
                "content": "The bandwidth of the wireless channel."
            }, {
                "type": "name",
                "title": "Channel",
                "content": "This field determines which operating frequency will be used. It is not necessary to change the wireless channel unless you notice interference problems with another nearby access point. If you select auto, then AP will choose the best channel automatically."
            }, {
                "type": "name",
                "title": "Transmit Power",
                "content": "Here you can specify the transmit power of the Router. You can select High, Middle or Low which you would like. High is the default setting and is recommended. "
            }, {
                "type": "paragraph",
                "content": "Click Save to <strong>save</strong> and apply the config."
            }]
        },
/*
        "DISK_SETTING": {
            "TITLE": "Disk Settings Help",
            "CONTENT": [{
                "type": "name",
                "title": "Refresh",
                "content": "To update this page and to show the current connected wireless stations, click on the Refresh button. "
            }, {
                "type": "paragraph",
                "content": "Configure the USB drive connected to the Router"
            }, {
                "type": "paragraph",
                "content": "Set up your Router as the file server:\nPlug the external hard drive or USB flash drive into the router."
            }, {
                "type": "paragraph",
                "content": "Click Scan to find the connected drive."
            }, {
                "type": "paragraph",
                "content": "Click Safely Remove to eject the connected drive."
            }, {
                "type": "paragraph",
                "content": "Check the Active box to enable file sharing."
            }, {
                "type": "paragraph",
                "content": "Uncheck the Active box to disable file sharing."
            }, {
                "type": "paragraph",
                "content": "In this section, you may view the Device Settings like ID, Volume, Capacity, Free Space and Sharing Status."
            }, {
                "type": "paragraph",
                "content": "The Disk Settings page displays all the available removable storage devices and their volume information, such as volume name, capacity and free space. One table shows one removable storage device, and you can set the shared state of each volume here. "
            }, {
                "type": "name",
                "title": "Scan",
                "content": "Click the Scan button search for the USB device that has been attached to the Router."
            }, {
                "type": "name",
                "title": "Safely Remove",
                "content": "Click the Safely Remove button to safely remove the USB storage device that is connected to USB port. This takes the devices offline. It may harm the USB device if you pull it out without clicking Safely Remove button."
            }, {
                "type": "paragraph",
                "content": "Contents in the table are as follows:"
            }, {
                "type": "name",
                "title": "volume",
                "content": "The volume name of the storage drive. Volume 1-8 is mapped to USB Port 1, Volume 9-16 is mapped to USB Port 2."
            }, {
                "type": "name",
                "title": "Capacity",
                "content": "The storage capacity of the storage drive."
            }, {
                "type": "name",
                "title": "Free Space",
                "content": "The available space of the storage drive. The available space of the current volume. "
            }, {
                "type": "name",
                "title": "Active",
                "content": "Indicates the sharing status of each storage volume. The shared state of the current volume. Green bulb means sharing, and grey bulb means no sharing. You can change shared state by clicking the light bulb icon. "
            }, {
                "type": "note",
                "title": "Note",
                "content": ["1. The router can automatically scan for a most recent plugged-in USB device.", "2. Aftering clicking Safely Remove, you must re-plug USB device or click Scan to make it found again.", "3. If there is data interaction in the current volume, click Safely Remove may not work.", "4. The shared state of current volume will directly affect shared state settings in Folder Sharing page."]
            }]
        },
        "SECURITY_SETTING": {
            "TITLE": "Settings Help",
            "CONTENT": [{
                "type": "paragraph",
                "content": "You can configure print server on this page."
            }, {
                "type": "name",
                "title": "SPI Firewall",
                "content": "Stateful Packet Inspection (SPI) helps to prevent cyber attacks by tracking more state per session. It validates that the traffic passing through the session conforms to the protocol. SPI Firewall is enabled by factory default. If you want all the computers on the LAN exposed to the outside world, you can disable it. "
            }, {
                "type": "name",
                "title": "DoS Protection",
                "content": " Enable DoS protection. DoS protection is able to detect and prevent attacks from huge amounts of data in a particular IP."
            }, {
                "type": "name",
                "title": "ICMP-FLOOD Attack Filtering",
                "content": "Detect and prevent from the ICMP packets attacks."
            }, {
                "type": "name",
                "title": "UDP-FLOOD Attack Filtering",
                "content": "Detect and prevent from the UDP packets attacks."
            }, {
                "type": "name",
                "title": "TCP-FLOOD Attack Filtering",
                "content": "Detect and prevent from the TCP-SYN packets attacks."
            }, {
                "type": "paragraph",
                "content": "off: no protection; low: low protection, low impact on performance; middle: moderate-intensity protection, a certain impact on performance; high: high-intensity protection, a greater impact on performance."
            }, {
                "type": "name",
                "title": "Ignore Ping Packet From WAN Port",
                "content": "Select this box, and you will not ping the router from WAN port."
            }, {
                "type": "name",
                "title": "Forbid Ping Packet From LAN Port",
                "content": "Select this box, and you will not ping the router from LAN port."
            }, {
                "type": "name",
                "title": "Blocked DoS Host List",
                "content": "It lists the IP address and MAC address of the blocked DoS attack source."
            }]
        },
        "IPMAC_BIND_SETTING": {
            "TITLE": "Settings Help",
            "CONTENT": [{
                "type": "paragraph",
                "content": "ARP Binding is useful for controlling access of specific computers in the LAN. "
            }, {
                "type": "name",
                "title": "Enable ARP Binding",
                "content": "Turing on/off the ARP binding function."
            }]
        },
        "IPMAC_BIND_ARP": {
            "TITLE": "ARP List Help:",
            "CONTENT": [{
                "type": "paragraph",
                "content": "You can see IP addresses on the LAN and their corresponding MAC addresses by viewing the ARP list. Also, you can use the icons in Modify column to manage the list."
            }, {
                "type": "name",
                "title": "MAC Address",
                "content": "The MAC address of a controlled computer in the LAN."
            }, {
                "type": "name",
                "title": "IP Address",
                "content": "The assigned IP address of a controlled computer in the LAN."
            }, {
                "type": "name",
                "title": "Bound",
                "content": "The MAC address of a controlled computer in the LAN."
            }, {
                "type": "name",
                "title": "Modify",
                "content": "These icons are for binding or deleting an item.",
                "children": [{
                    "type": "name",
                    "title": "(Bind)",
                    "content": "Bind the item and Load it to the Binding list."
                }, {
                    "type": "name",
                    "title": "(Delete)",
                    "content": "Delete the item from the list."
                }]
            }, {
                "type": "name",
                "title": "Note",
                "connnector": ":",
                "content": "An item can not be bound and loaded to the Binding list if the IP address of the item has been bound before. Bind button will diabled as well."
            }]
        },
        "IPMAC_BIND_LIST": {
            "TITLE": "Binding List Help:",
            "CONTENT": [{
                "type": "paragraph",
                "content": "You can add new IP&MAC binding item, and other operation: modify, delete, enable etc."
            }, {
                "type": "name",
                "title": "MAC Address",
                "content": "The MAC address of the controlled computer in the LAN."
            }, {
                "type": "name",
                "title": "IP Address",
                "content": "The assigned IP address of the controlled computer in the LAN."
            }, {
                "type": "name",
                "title": "Description",
                "content": "Description of the binding item."
            }, {
                "type": "name",
                "title": "Enable",
                "content": "Click this button（图标） to enable ARP binding for a specific device or to cancel binding."
            }, {
                "type": "name",
                "title": "Enable",
                "content": "Click this button（图标） to enable ARP binding for a specific device or to cancel binding."
            }, {
                "type": "name",
                "title": "Modify",
                "content": "To modify or delete an existing entry."
            }, {
                "type": "name",
                "title": "Add",
                "content": "Click Add button to add a new entry to the table."
            }, {
                "type": "name",
                "title": "Example",
                "content": "If you want to use binding to assign 192.168.1.100 to PC A (MAC: 62-6C-6D-2E-07-BE) and to prevent other PCs from using this address. First, enable the \"ARP Binding\" and then add a new item in the binding table, so that the table resembles the one below."
            }, {
                "type": "paragraph",
                "content": "<table><tr><th>ID</th><th>MAC Address</th><th>IP Address</th><th>Description</th><th>Enable</th></tr>"
            }, {
                "type": "paragraph",
                "content": "<table><tr><td>1</td><td>62-6C-6D-2E-07-BE</td>td>192.168.0.100</td><td>\"example\"</td><<td>Bound</td></tr></table>"
            }]
        },
        "TIME_SETTING_TOTAL": {
            "TITLE": "Time Settings Help",
            "CONTENT": [{
                "type": "paragraph",
                "content": "This page allows you to set the time and the daylight saving. "
            }]
        },
        "TIME_SETTING": {
            "TITLE": "Time Settings",
            "CONTENT": [{
                "type": "note",
                "title": "To set time manually:",
                "content": ["1. Select your local time zone from this pull-down list. ", "2. Select your date.", "3. Configure your time.", "4. Click <strong>Save</strong> button."]
            }, {
                "type": "note",
                "title": "For automatic time synchronization: ",
                "content": ["1. Click <strong>Get GMT</strong> button to update the time from the Internet with the pre-defined servers.", "2. Click <strong>Save</strong> button."]
            }, {
                "type": "note",
                "title": "OR ",
                "content": ["1. Enter the IP address or domain name of your desired server in NTP Server field first.", "2. Click <strong>Get GMT</strong> button to update the time from Internet with the entered server.", "3. Click <strong>Save</strong> button."]
            }]
        },
        "TIME_SETTING_DAYLIGHT": {
            "TITLE": "Daylight Saving",
            "CONTENT": [{
                "type": "note",
                "title": "To set up daylight saving: ",
                "content": ["1. Select the Enable Daylight Saving checkbox to enable daylight saving function.", "2. Select the correct Start time and End time of daylight saving range.", "3. Click Save."]
            }, {
                "type": "note",
                "title": "Note: ",
                "content": ["1. Some time-based functions such as firewall will not work if time is not set. Therefore, it is important to configure time settings as soon as you successfully login to the Router.", "2. The time will be lost if the Router is turned off. ", "3. The Router will automatically obtain GMT from the Internet if it is configured accordingly.", "4. In daylight saving configuration, start time and end time shall be within one year and start time shall be earlier than end time."]
            }]
        },
        "FIRMWARE": {
            "TITLE": "Firmware Upgrade",
            "CONTENT": [{
                "type": "note",
                "title": "To upgrade the firmware:",
                "content": ["1. Click <strong>Browse?/strong> to locate and select the new firmware file.", "2. Click <strong>Upgrade</strong> button."]
            }, {
                "type": "paragraph",
                "content": "Note: The firmware upgrade process takes a couple of minutes. Please do not power off the router until the process finishes. "
            }]
        },
        "BACKUP": {
            "TITLE": "Backup & Restore help",
            "CONTENT": [{
                "type": "paragraph",
                "content": "This page allows you to backup your current configuration, restore your configuration to a previously saved one, or reset your configuration to factory default settings."
            }, {
                "type": "paragraph",
                "content": "To backup your current settings:"
            }, {
                "type": "name",
                "title": "Restore",
                "content": "To restore your previously saved settings."
            }, {
                "type": "note",
                "content": ["1. Click the Browse?button to locate and select the file you have backuped.", "2. Click the Restore button to begin the restore process."]
            }, {
                "type": "name",
                "title": "Factory restore",
                "content": "To reset your router to its factory settings."
            }, {
                "type": "paragraph",
                "content": "Click the Factory Restore button to reset your router to its factory settings."
            }, {
                "type": "note",
                "content": ["1. Factory Restore will erase any settings that you have configured in the router.", "2. Both the backup and restore process take a couple of minutes. Please do not power off the router until the process finishes."]
            }]
        },
        "ADMIN_ACCOUNT": {
            "TITLE": "Account Management Help",
            "CONTENT": [{
                "type": "paragraph",
                "content": "This page allows you to change your login username and password, and set email for password recovery."
            }, {
                "type": "name",
                "title": "Old User Name",
                "content": "Type the old uer name."
            }, {
                "type": "name",
                "title": "Old Password",
                "content": "Type the old password."
            }, {
                "type": "name",
                "title": "New User Name",
                "content": "Type the new user name."
            }, {
                "type": "name",
                "title": "New Password",
                "content": "Type the new password."
            }, {
                "type": "name",
                "title": "Confirm New Password",
                "content": "Type the new password again. "
            }, {
                "type": "name",
                "title": "Enable Password Recovery",
                "content": "Password recovery helps to get back the uer name and password if they are forgotten. It is recommended that you enable password recovery if you change the user name or password for the router. "
            }, {
                "type": "name",
                "title": "From",
                "content": "Enter an email address used for sending email."
            }, {
                "type": "name",
                "title": "To",
                "content": "Enter an email address used for receiving email. "
            }, {
                "type": "name",
                "title": "SMTP Server Address",
                "content": "Enter the address of SMTP server. Through this server, the router can send the account message from the \"From\" email to the \"To\" email."
            }, {
                "type": "name",
                "title": "Enable Authenticaiton",
                "content": "If your \"From\" email requires authentication, please select the <strong>Enable Authentication</strong> check box. Fill the <strong>Username</strong> and <strong>Password</strong> fields."
            }]
        },
        "ADMIN_LOCAL": {
            "TITLE": "Local MAC Authentication Help",
            "CONTENT": [{
                "type": "paragraph",
                "content": "This page allows you to configure rules to limit devices on the LAN to access the web server"
            }, {
                "type": "name",
                "title": "Access the Web Server",
                "content": "The router provides two limit options, \"All the devices on the LAN\" and \"Only the devices in the list\". \"Only the devices in the list\"  requires you to configure the limit rule first."
            }, {
                "type": "paragraph",
                "content": "If \"Only the devices in the list\" is selected, you can see and configure the limit rule."
            }, {
                "type": "name",
                "title": "Add",
                "content": "Click this to add a new limit rule"
            }, {
                "type": "name",
                "title": "Delete",
                "content": "Click this to delete the rules selected."
            }, {
                "type": "name",
                "title": "MAC Address",
                "content": "The MAC address of the limited device. "
            }, {
                "type": "name",
                "title": "Description",
                "content": "The description of the rule."
            }, {
                "type": "name",
                "title": "Enbale",
                "content": "means the corresponding rule is taking effect while     means the corresponding rule is taking no effect."
            }, {
                "type": "name",
                "title": "Modify",
                "content": "Allows you to modify (   ) or delete (   ) the corresponding rule."
            }, {
                "type": "note",
                "title": "To add or modify a rule:",
                "content": ["1. Click the    or    icon.", "2. Enter the MAC address or use the View Existing Devices button to select an existing one.", "3. Create a description for the rule.", "4. Select or diselect the checkbox before Enable this Entry.", "5. Click the OK button."]
            }]
        },
        "ADMIN_REMOTE": {
            "TITLE": "Remote Management Help",
            "CONTENT": [{
                "type": "paragraph",
                "content": "The remote management feature lets you access your router over the Internet to view or change its settings. "
            }, {
                "type": "name",
                "title": "Web Management Port",
                "content": "Specify the port number for accessing the web management interface. Normal web browser access uses the standard HTTP service port 80. For greater security, enter a custom port number for the remote web management interface. Choose a number from 1024 to 65535, but do not use the number of any common service port. The default is 8080, which is a common alternate for HTTP."
            }, {
                "type": "name",
                "title": "Remote Management IP Address",
                "content": "specify the external IP addresses to be allowed to access the router. If \"255.255.255.255\" is entered, it means that any IP address on the Internet is allowed to access the router."
            }]
        },
        "SYSTEM_LOG": {
            "TITLE": "System Log Help",
            "CONTENT": [{
                "type": "name",
                "title": "Type",
                "content": "Select the type of the system log to display."
            }, {
                "type": "name",
                "title": "Level",
                "content": "Select the level of the system log to display."
            }, {
                "type": "name",
                "title": "Refresh",
                "content": "Click this icon to refresh the log."
            }, {
                "type": "name",
                "title": "Delete All",
                "content": "Click this icon to delete all logs."
            }, {
                "type": "name",
                "title": "Mail Settings",
                "content": "Click this button to configure the email for sending and reciving logs."
            }, {
                "type": "name",
                "title": "From",
                "content": "Enter the email for sending logs."
            }, {
                "type": "name",
                "title": "To",
                "content": "Enter the email for recving logs."
            }, {
                "type": "name",
                "title": "SMTP sever",
                "content": "Enter the address of SMTP server."
            }, {
                "type": "name",
                "title": "Enable authentication",
                "content": "Select or diselect the checkbox to enable or disable authentication."
            }, {
                "type": "name",
                "title": "User name",
                "content": "Enter the user name for logging in the SMTP server."
            }, {
                "type": "name",
                "title": "Passwrod",
                "content": "Enter the password for logging in the SMTP server."
            }, {
                "type": "name",
                "title": "Confirm password",
                "content": "Enter the password again."
            }, {
                "type": "name",
                "title": "Enable auto mail",
                "content": "If this feature is enabled, the system logs will be emailed automatically and periodically."
            }, {
                "type": "name",
                "title": "Everyday log at",
                "content": "If this feature is enabled, the system logs will be emailed automatically and periodically."
            }, {
                "type": "name",
                "title": "Log every",
                "content": "Select to automatically send email with an interval of several hours, and the range is 1-23. "
            }, {
                "type": "name",
                "title": "Mail log",
                "content": "Click this button to email the log files. "
            }, {
                "type": "name",
                "title": "Save log",
                "content": "Click this button to download the log files to your local computer."
            }]
        },
        "TRAFFIC_STATISTIC_TOTAL": {
            "TITLE": "Traffic Statistics Help",
            "CONTENT": [{
                "type": "paragraph",
                "content": "The Traffic Statistics page shows the network traffic of each PC on the LAN, including total traffic and the value of the last Packets Statistic interval in seconds."
            }]
        },
        "TRAFFIC_STATISTIC": {
            "TITLE": "Traffic Statistics",
            "CONTENT": [{
                "type": "name",
                "title": "Enable Traffic Statistics",
                "content": "The default value is Off. To enable it, click On button. If it is disabled, traffic statistics information will not be displayed."
            }]
        },
        "TRAFFIC_STATISTIC_LIST": {
            "TITLE": "Traffic Statistics List",
            "CONTENT": [{
                "type": "name",
                "title": "IP Address/MAC Address",
                "content": "The IP Address and MAC address are displayed with related statistics."
            }, {
                "type": "name",
                "title": "Total Packets",
                "content": "The total number of packets received and transmitted by the router."
            }, {
                "type": "name",
                "title": "Total Bytes",
                "content": "The total number of bytes received and transmitted by the router.s"
            }, {
                "type": "name",
                "title": "Current Packets",
                "content": "The total number of packets received and transmitted in the last Packets Statistics interval seconds."
            }, {
                "type": "name",
                "title": "Current Bytes",
                "content": "The total number of bytes received and transmitted in the last Packets Statistics interval seconds."
            }, {
                "type": "name",
                "title": "Current ICMP Tx",
                "content": "The number of ICMP packets transmitted to the WAN per second at the specified Packets Statistics interval. It is shown as \"current transmitting rate / Max transmitting rate\"."
            }, {
                "type": "name",
                "title": "Current UDP Tx",
                "content": "The number of UDP packets transmitted to the WAN per second at the specified Packets Statistics interval. It is shown as \"current transmitting rate / Max transmitting rate\"."
            }, {
                "type": "name",
                "title": "Current SYN Tx",
                "content": "The number of TCP SYN packets transmitted to the WAN per second at the specified Packets Statistics interval. It is shown as \"current transmitting rate / Max transmitting rate\"."
            }, {
                "type": "name",
                "title": "Modify",
                "content": ""
            }, {
                "type": "name",
                "title": "Reset",
                "content": "Reset the values of the entry to zero."
            }, {
                "type": "name",
                "title": "Delete",
                "content": "Delete the existing entry in the table."
            }, {
                "type": "paragraph",
                "content": "Click Refresh button to refresh the page."
            }, {
                "type": "paragraph",
                "content": "Click Reset All button to reset the values of all entries to zero."
            }, {
                "type": "paragraph",
                "content": "Click Delete All button to delete all entries in the table."
            }]
        },
        "SYSTEM_PARA_WIRELESS": {
            "TITLE": "Traffic Statistics",
            "CONTENT": [{
                "type": "name",
                "title": "Beacon Interval",
                "content": "The beacons are the packets sent by the Router to synchronize a wireless network. Beacon Interval value determines the time interval of the beacons. You can specify a value between 40-1000 milliseconds. The default value is 100. "
            }, {
                "type": "name",
                "title": "RTS Threshold",
                "content": "Here you can specify the RTS (Request to Send) Threshold. If the packet is larger than the specified RTS Threshold size, the Router will send RTS frames to a particular receiving station and negotiate the sending of a data frame. The default value is 2346. "
            }, {
                "type": "name",
                "title": "Fragmentation Threshold",
                "content": "This value is the maximum size determining whether packets will be fragmented. Setting the Fragmentation Threshold too low may result in poor network performance because of excessive packets. 2346 is the default setting and is recommended. "
            }, {
                "type": "name",
                "title": "DTIM Interval",
                "content": "This value determines the interval of the Delivery Traffic Indication Message (DTIM). You can specify the value between 1-15 Beacon Intervals. The default value is 1, which indicates the DTIM Interval is the same as Beacon Interval."
            }, {
                "type": "name",
                "title": "Group Key Update Period",
                "content": "Specify the group key update interval in seconds. The value can be either 0 or at least 30. Enter 0 to disable the update."
            }, {
                "type": "name",
                "title": "Enable WMM",
                "content": "The beacons are the packets sent by the Router to synchronize a wireless network. Beacon Interval value determines the time interval of the beacons. You can specify a value between 40-1000 milliseconds. The default value is 100. "
            }, {
                "type": "name",
                "title": "Enable Short GI",
                "content": "This function is recommended for increasing the data capacity by reducing the guard interval time. "
            }, {
                "type": "name",
                "title": "Enable AP Isolation",
                "content": "Isolate all connected wireless stations so that wireless stations cannot access each other through WLAN. This function will be disabled if WDS/Bridge is enabled."
            }, {
                "type": "name",
                "title": "WDS Bridging",
                "content": "You can select this to enable WDS Bridging. With this function, the router can bridge two or more Wlans."
            }, {
                "type": "name",
                "title": "SSID",
                "content": "The SSID of the AP your router is going to connect to as a client. You can also use the survey function to select the SSID to join."
            }, {
                "type": "name",
                "title": "Survey",
                "content": "Click this button, and you can search the AP which runs in the current channel."
            }, {
                "type": "name",
                "title": "MAC Address",
                "content": "The MAC Address of the AP your router is going to connect to as a client. You can also use the survey function to select the MAC Address to join."
            }, {
                "type": "name",
                "title": "Security",
                "content": "You can select No/ WPA/WPA2-Personal / WEP"
            }, {
                "type": "name",
                "title": "No",
                "content": "The wireless security function can be enabled or disabled. If disabled, the wireless  stations will be able to connect the Router without encryption. It is strongly recommended you that choose one of following options to enable security."
            }, {
                "type": "name",
                "title": "WPA-PSK/WPA2-PSK",
                "content": "Select WPA based on pre-shared passphrase."
            }, {
                "type": "name",
                "title": "Password",
                "content": "You can enter ASCII or Hexadecimal characters. For Hexadecimal, the length should be between 8 and 64 characters; for ASCII, the length should be between 8 and 63 characters."
            }, {
                "type": "name",
                "title": "Password",
                "content": "Enter the password for WEP."
            }, {
                "type": "paragraph",
                "content": "Click Save to apply the configuraion."
            }]
        },
        "SYSTEM_PARA_WPS": {
            "TITLE": "Traffic Statistics",
            "CONTENT": [{
                "type": "name",
                "title": "WPS",
                "content": "Enable or disable the function."
            }, {
                "type": "paragraph",
                "content": "Click Save to apply the configuration."
            }]
        },
        "BASIC_FILE_SHARE_DISK": {
            "TITLE": "Disk Settings",
            "CONTENT": [{
                "type": "paragraph",
                "content": "Configure the USB drive connected to the Router"
            }, {
                "type": "paragraph",
                "content": "Configure the USB drive connected to the Router"
            }, {
                "type": "paragraph",
                "content": "Plug the external hard drive or USB flash drive into the router."
            }, {
                "type": "paragraph",
                "content": "Click Scan to find the connected drive. "
            }, {
                "type": "paragraph",
                "content": "Click Safely Remove to eject the connected drive. "
            }, {
                "type": "paragraph",
                "content": "Check the Active box to enable file sharing."
            }, {
                "type": "paragraph",
                "content": "Uncheck the Active box to disable file sharing."
            }, {
                "type": "paragraph",
                "content": "In this section, you may view the Device Settings like ID, Volume, Capacity, Free Space and Sharing Status."
            }, {
                "type": "paragraph",
                "content": "The Disk Settings page displays all the available removable storage devices  and their volume information, such as volume name, capacity and  free space. One table shows one  removable storage device, and you can set the shared state of each volume here."
            }, {
                "type": "name",
                "title": "Scan",
                "content": "Click the Scan button search for the USB device that has been attached to the Router. Safely Remove - Click the Safely Remove button to safely remove the USB storage device that is connected to USB port. This takes the devices offline. It may harm the USB device if you pull it out without clicking Safely Remove button."
            }, {
                "type": "paragraph",
                "content": "Contents in the table are as follows:"
            }, {
                "type": "name",
                "title": "volume",
                "content": "The volume name of the storage drive. Volume 1-8 is mapped to USB Port 1, Volume 9-16 is mapped to USB Port 2."
            }, {
                "type": "name",
                "title": "Capacity",
                "content": "The storage capacity of the storage drive. "
            }, {
                "type": "name",
                "title": "Free Space",
                "content": "The available space of the storage drive. "
            }, {
                "type": "name",
                "title": "Active",
                "content": "Indicates the sharing status of each storage volume. The shared state of the current volume. Green bulb means sharing, and grey bulb means no sharing. You can change shared state by clicking the light bulb icon. "
            }, {
                "type": "note",
                "title": "Note:",
                "content": ["1. The router can automatically scan for a most recent plugged-in USB device.", "2. Aftering clicking Safely Remove, you must re-plug USB device or click Scan to make it found again.", "3. If there is data interaction in the current volume, click Safely Remove may not work.", "4. The shared state of current volume will directly affect shared state settings in Folder Sharing page."]
            }]
        },
        "BASIC_FILE_SHARE_SETTING": {
            "TITLE": "Sharing Settings",
            "CONTENT": [{
                "type": "paragraph",
                "content": "Here as a shared service master switch of Network Neighborhood (samba) and FTP Server (ftp, ftp (via Internet)), you can close some shared services (like ftp service), set a new shared server name, modify the access port for some services (like FTP (Via Internet)) and etc. Please click Save to apply all the settings."
            }, {
                "type": "name",
                "title": "Network/Media Server Name",
                "content": "The name of the shared server. Modifying here will affect Network Neighborhood (samba) shared address. (Note: Network Connection is enabled by default)"
            }, {
                "type": "name",
                "title": "Sharing Mode",
                "content": "Select to share all or specific folders"
            }, {
                "type": "name",
                "title": "Share All",
                "content": "Share all active folders. Select the Login Required check box to require users to log in with a username and password."
            }, {
                "type": "name",
                "title": "Login Required",
                "content": "When Login Required is checked, users need a password to access the shared directory;  when Login Required  is not checked, no password is needed. (Note: You can create a new login in the Advanced USB Settings page. Otherwise, the username and password will be the same as your Web Management login info.)"
            }, {
                "type": "name",
                "title": "Share Selected Folders",
                "content": "You may select which folders to share on the network. "
            }, {
                "type": "title",
                "title": "Sharing Content"
            }, {
                "type": "name",
                "title": "Add",
                "content": "Click to add a new Share Folder."
            }, {
                "type": "name",
                "title": "Delete",
                "content": "Click to delete selected Share Folders."
            }, {
                "type": "paragraph",
                "content": "The contents of the table:"
            }, {
                "type": "name",
                "title": "Share Name",
                "content": "Name of the shared folder.  "
            }, {
                "type": "name",
                "title": "Folder Path",
                "content": "Path to the folder is determined by where the file is saved. The real full path of the specified folder. "
            }, {
                "type": "name",
                "title": "Media Sharing",
                "content": "Enable/disable UPnP device access to a folder. "
            }, {
                "type": "name",
                "title": "Volume",
                "content": "The label name of the volume where shared directory is put. "
            }, {
                "type": "name",
                "title": "Enable",
                "content": "Status of this entry. Green bulb suggests taking effect, and grey bulb suggests not. You can change the status by clicking the bulb."
            }, {
                "type": "paragraph",
                "content": "To modify or delete this entry by clicking the corresponding icon. "
            }, {
                "type": "name",
                "title": "Modify",
                "content": "Click <strong>Add</strong> or <strong>Modify</strong> icon, and a new window will pop up."
            }, {
                "type": "name",
                "title": "Volume",
                "content": "From the drop-down list, select a volume to share. "
            }, {
                "type": "name",
                "title": "Folder Path",
                "content": "Path to the folder is determined by where the file is saved. The real full path of the specified folder. "
            }, {
                "type": "name",
                "title": "Share Name",
                "content": "Name of the shared folder. You can customize it."
            }, {
                "type": "name",
                "title": "Allow Guest Network Access",
                "content": " Select the check box to allow the Guest Network to have access to the shared folder."
            }, {
                "type": "name",
                "title": "Login Required",
                "content": "Selecting the check box requires users to log in with a username and password. (Note: You can create a new login in the Advanced USB Settings page. Otherwise, the username and password will be the same as your Web Management login information.)"
            }, {
                "type": "name",
                "title": "Enable Write Access",
                "content": "Select the check box to allow users to make changes to the folder content."
            }, {
                "type": "name",
                "title": "Enable Media Sharing",
                "content": "Enable UPnP devices (like Digital Media Player) access to the folder."
            }, {
                "type": "note",
                "title": "Note:",
                "content": ["1. The modified settings will take effect within 5 seconds.", "2. The disabled volumes in Disk Settings page will not be shared, and related entries will not be displayed either.", "3. All the settings of shared directories will be deleted when Sharing All box is selected. Please think twice before you make a move."]
            }]
        },
        "BASIC_PRINT": {
            "TITLE": "Print Server",
            "CONTENT": [{
                "type": "paragraph",
                "content": "You can configure print server on this page."
            }, {
                "type": "name",
                "title": "Print Server",
                "content": "Indicates the current Enable/Disable status of the Print Server."
            }, {
                "type": "name",
                "title": "Printer Name",
                "content": "Name of printer connected to the router."
            }, {
                "type": "paragraph",
                "content": "Follow the instructions below to set up your print server: "
            }, {
                "type": "paragraph",
                "content": "Step1:Connect the USB printer to the USB port of the router with a USB printer cable. "
            }, {
                "type": "paragraph",
                "title": "",
                "content": "Step2:Install the printer driver on your computer. "
            }, {
                "type": "paragraph",
                "title": "",
                "content": "Step3:Install the TP-LINK USB Printer Controller on your computer. Please run the resource CD or download the TP-LINK USB Printer Controller utility from our website: www.tp-link.com."
            }]
        },
        "BASIC_PAREMTAL_CONTROL": {
            "TITLE": "Parental Controls",
            "CONTENT": [{
                "type": "paragraph",
                "content": "<strong>Parental controls</strong> provides functions of  web filtering for some specified devices. You can configure Parental Controls on this page."
            }, {
                "type": "paragraph",
                "title": "Devices Under Parental Controls:",
                "content": "Click <strong>Add</strong> button to start the configuration."
            }, {
                "type": "name",
                "title": "Device Name",
                "content": "Name the device under parental controls. You can click View Existing Device button to  view the list of equipments that currently access to the router ."
            }, {
                "type": "name",
                "title": "Mac Address",
                "content": "The unique identification for each device in a format of XX-XX-XX-XX-XX-XX."
            }, {
                "type": "name",
                "title": "Internet Access Time",
                "content": "Set the effective time for the controlled device."
            }, {
                "type": "name",
                "title": "Descrption",
                "content": "The description of the controlled device. It is optional to set."
            }, {
                "type": "name",
                "title": "Enable",
                "content": " Selecting the Enable box, the whole configuration will take effect immediately or you need to click the bulb icon to enable this entry. "
            }]
        },
        "BASIC_GUEST_NETWORK": {
            "TITLE": "Guest Network Help",
            "CONTENT": [{
                "type": "name",
                "title": "Guest Network 2.4GHz | 5GHz-1 | 5GHz-2",
                "content": "The Guest Network can be enabled or disabled to allow guest access on a separate network."
            }, {
                "type": "name",
                "title": "Allow guests to see each other",
                "content": "If this check box is selected, anyone who connects to the Guest Network can access each other."
            }, {
                "type": "name",
                "title": "Hide SSID",
                "content": "The Guest Network SSID will be hidden from the Wi-Fi network."
            }, {
                "type": "name",
                "title": "Name(SSID)",
                "content": "Create a custom name (up to 32 characters) for the Guest Network."
            }, {
                "type": "name",
                "title": "Password",
                "content": "8 to 63 characters or 64 hexadecimal digits (case sensitive). Hexadecimal digits includes 0-9, a-f, A-F."
            }]
        },
*/
        "diagnostic": {
            "TITLE": "Diagnostic Tools",
            "CONTENT": [	
            {
                "type": "paragraph",
                "content": "The router provides Ping and Traceroute tools to help you troubleshoot network connectivity problems. The Ping tool sends packets to a target IP Address or Domain Name and logs the results, such as the number of packets sent/received, and the round-trip time. The Traceroute tool sends packets to a target IP Address or Domain Name and displays the number of hops and time to reach the destination."
            }, {
                "type": "paragraph",
                "content": "You can ping and traceroute a network device by the IP address or a domain name, such as google.com, yahoo.com, etc."
            }, {
                "type": "note",
                "title": "To diagnose using Ping",
                "content": ["Enter the target IP Address or Domain Name.", "Click the Arrow icon to open the Advanced menu and specify the Ping Count, and Ping Packet Size. (Optional)", "Click Start."]
            }, {
                "type": "note",
                "title": "To diagnose using Traceroute",
                "content": ["Enter the target IP Address or Domain Name.", "Click the Arrow icon to open the Advanced menu and specify the number of hops (to be reached) in the Traceroute Max TTL (Time to Live) field. The default value is 20. (Optional) ", "Click Start."]
		
            }
			]
        },
        "lan": {
            "TITLE": "LAN",
            "CONTENT": [{
                "type": "name",
                "title": "MAC Address",
                "content": "The unique physical address of the router."
            }, {
                "type": "name",
                "title": "LAN IPv4",
                "content": "Keeps the router's default IP address (192.168.0.1) or enter a new one. This IP address can be used to log in to the router's web management page."
            }, {
                "type": "name",
                "title": "Subnet Mask",
                "content": "Select an assigned identifier used by the LAN port to route Internal and External traffic from the drop-down list or enter a new subnet mask format. The default value is 255.255.255.0."
            }, {
                "type": "name",
                "title": "IGMP Snooping",
                "content": "IGMP (Internet Group Management Protocol) is used to manage multicasting on TCP/IP networks. Some ISPs use IGMP to perform remote configuration for client devices, such as the router. It is enabled by default."
			}, {
                "type": "paragraph",
                "title": "Note",
                "content": "If the new LAN IP address is not in the same subnet with the old one, the IP Address Pool in the DHCP server will be automatically change; however, the Virtual Server and DMZ Host will not take effect until they are reconfigured."
            }]
        },
        "ddos": {
            "TITLE": "Firewall",
            "CONTENT": [{
                "type": "name",
                "title": "SPI Firewall",
                "content": "SPI (Stateful Packet Inspection) firewall prevents cyber attacks and validates the traffic that is passing through the router. The SPI Firewall is enabled by default. "
            }, {
                "type": "title",
                "title": "Dos Protection"
            }, {
                "type": "name",
                "title": "DoS Protection",
                "content": "DoS (Denial of Service) protection protects your LAN against DoS attacks from flooding your network with server requests. By default, DoS Protection is disabled (Off)."
            }, {
                "type": "name",
                "title": "ICMP-FLOOD Attack Filtering",
                "content": "Enable to prevent the ICMP (Internet Control Message Protocol) flood attack."
            }, {
                "type": "name",
                "title": "UDP-FLOOD Attack Filtering",
                "content": "Enable to prevent the UDP (User Datagram Protocol) flood attack."
            }, {
                "type": "name",
                "title": "TCP-FLOOD Attack Filtering",
                "content": "Enable to prevent the Transmission Control Protocol-Synchronize (TCP-SYN) flood attack.",
                "children": [{
                    "type": "name",
                    "title": "Off",
                    "content": "No protection."
                }, {
                    "type": "name",
                    "title": "Low",
                    "content": "Low-level of protection and low impact on router performance."
                }, {
                    "type": "name",
                    "title": "Middle",
                    "content": "Moderate-level of protection and semi-noticeable impact on router performance."
                }, {
                    "type": "name",
                    "title": "High",
                    "content": "High-level of protection but a noticeable impact on router performance."
                }]
            }, {
                "type": "name",
                "title": "Forbid LAN Ping",
                "content": "Enable to forbid pings from LAN ports."
            }, {
                "type": "name",
                "title": "Forbid WAN Ping",
                "content": "Enable to forbid pings from WAN port."
            }, {
                "type": "title",
                "title": "Blocked DoS Host List"
            }, {
                "type": "name",
                "title": "Blocked DoS Host List",
                "content": "Lists the IP Address and MAC Address from any blocked DoS attack source."
            }, {
                "type": "name",
                "title": "To delete one or more entries",
                "content": "In the Host List, select the entry or entries that you wish to delete and click Delete above the table."
            }]
        },
        "ipv6": {
            "TITLE": "IPv6 Internet",
            "CONTENT": [{
                "type": "name",
                "title": "Enable IPv6",
                "content": "Select to enable (On) or disable (Off) the IPv6 feature of the router."
            }, {
                "type": "title",
                "title": "Internet Connection Type: Static IP"
            }, {
                "type": "name",
                "title": "Static IP",
                "content": "Select this type if your ISP uses Static IPv6 address assignment."
            }, {
                "type": "name",
                "title": "IPv6 Address/IPv6 Default Gateway/IPv6 DNS Server/Secondary IPv6  DNS Server",
                "content": "Enter these parameters as provided by your ISP."
            }, {
                "type": "name",
                "title": "MTU (bytes)",
                "content": "The default and typical MTU (Maximum Transmission Unit) size for most Ethernet networks is 1500 Bytes. Do not change the default MTU size unless required by your ISP."
            }, {
                "type": "title",
                "title": "Internet Connection Type: Dynamic IP"
            }, {
                "type": "name",
                "title": "Dynamic IP",
                "content": "Select this type if your ISP uses Dynamic IPv6 address assignment."
            }, {
                "type": "name",
                "title": "IPv6 Address/IPv6 Gateway",
                "content": "These parameters are automatically assigned by the DHCPv6 server from your ISP."
            }, {
                type: "name",
                title: "Addressing Type",
                content: "Select the connection type of IPv6 connection."
           	}, {
                type: "name",
                title: "MTU (bytes)",
                content: "The default and typical MTU (Maximum Transmission Unit) size for most Ethernet networks is 1500 Bytes. Do not change the default MTU size unless required by your ISP."
            }, {
                type: "name",
                title: "Use the following IPv6 DNS Address",
                content: "Select this checkbox and enter the DNS server address(es) provided by your ISP in dotted decimal notation. This WAN interface will use the specified DNS server for priority."
            }, {
                type: "name",
                title: "Host Name",
                content: "Enter a value into this field to specify the host name of the router."
            }, {
			
                /*"type": "name",
                "title": "Renew",
                "content": "Click this button to get new IPv6 parameters from the DHCPv6 server of the ISP."
            }, {
                "type": "name",
                "title": "Release",
                "content": "Click this button to release all IPv6 addresses assigned by DHCPv6 server from the ISP."
            }, {
                "type": "name",
                "title": "Get IPv6 Address",
                "content": "Select to “Get non-temporary IPv6 address?or “Get IPv6 prefix delegation? according to your ISP."
            }, {
                "type": "name",
                "title": "DNS Address",
                "content": "Select to “Get dynamically from ISP?or “Use the following DNS address? If “Use the following DNS Address?is selected, please manually enter the DNS address provided by your ISP."
            }, {
                "type": "name",
                "title": "Primary DNS/Secondary DNS",
                "content": "Enter these parameters manually or dynamically obtain them from the ISP."
            }, {*/
                "type": "title",
                "title": "Internet Connection Type: PPPoE"
            }, {
                "type": "name",
                "title": "PPPoE",
                "content": "Select this type if your ISP uses PPPoEv6, and provides you with a username and password."
            }, {
                "type": "name",
                "title": "Username/Password/Confirm Password",
                "content": "Enter these parameters as provided by your ISP."
            }, {
				type: "name",
                title: "Addressing Type",
                content: "Select the connection type of IPv6 connection."
            }, {
                type: "name",
                title: "Service Name",
                content: "Enter the service name provided by your ISP. If it is not provided, leave it blank."
            }, {
                type: "name",
                title: "Server Name",
                content: "Enter the server name provided by your ISP. If it is not provided, leave it blank."
            }, {
				type: "name",
				title: "MTU (bytes)",
				content: "The typical MTU (Maximum Transmission Unit) size for Ethernet networks is 1480 Bytes.",
				children: [{
				    type: "paragraph",
				    content: "<b>Note</b>: In a rare case, your ISP may require you to adjust the MTU size for better network performance. You should not change the value unless it is absolutely necessary."
				}]
			}, {
                    type: "name",
                    title: "Use IPv6 specified by ISP",
                    content: "Select this checkbox and enter the IP address and gateway provided by your ISP."
            }, {
                /*"type": "name",
                "title": "IPv6 Address",
                "content": "It will be automatically assigned by DHCPv6 server from the ISP, after you enter the username and password and click Connect."
            }, {*/
                "type": "name",
                "title": "Use the following IPv6 DNS Address",
                "content": "Select this if you want to manually enter the DNS address provided by your ISP. If it is not selected, the router will get the DNS address dynamically from your ISP."
            }, {
               /* "type": "name",
                "title": "Get IPv6 Address",
                "content": "Select “Non-temporary?or “Prefix delegation?or “Specified by ISP?according to your ISP. If selecting “Specified by ISP? you need to manually enter the IPv6 address as provided by your ISP. If you select “Non-temporary?or “Prefix delegation? the IPv6 address will be automatically assigned by the DHCPv6 server from the ISP.",
                "children": [{
                    "type": "name",
                    "title": "Non-temporary",
                    "content": "Get a non-temporary IPv6 address by DHCPv6 Server from the Internet Service Provider(ISP)."
                }, {
                    "type": "name",
                    "title": "Prefix delegation",
                    "content": "Get a prefix delegation IPv6 address by DHCPv6 Server from the ISP,and the client in LAN create a IPv6 address with the delegation."
                }, {
                    "type": "name",
                    "title": "Specified by ISP",
                    "content": "Use a static IPv6 address specified by the ISP."
                }]
            }, {
                "type": "name",
                "title": "Connect",
                "content": "Click this button to get Internet connection."
            }, {
                "type": "name",
                "title": "Disconnect",
                "content": "Click this button to disconnect from the Internet."
            }, {*/
                "type": "title",
                "title": "Internet Connection Type: 6to4 Tunnel"
            }, {
                "type": "name",
                "title": "6to4 Tunnel",
                "content": "Select this type if your ISP uses 6to4 deployment for assigning address."
			}, {
                "type": "title",
                "title": "IPv6 LAN"
            }, {
                "type": "name",
                "title": "Addressing Type",
                "content": "Select the appropriate one according to your ISP.",
                "children": [{
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
	                        content: "Enter the ULA Prefix Length. The default value is 64."
	                    }]
                    }]
                }, {
                    "type": "name",
                    "title": "DHCPv6 Server",
                    "content": "To automatically assign IP addresses to the clients in the LAN.",
                    "children": [{
	                    type: "name",
	                    title: "Start IPv6 Address",
	                    content: "Enter the start IPv6 address."
                    }, {
	                    type: "name",
	                    title: "End IPv6 Address",
	                    content: "Enter the end IPv6 address."
                }, {
	                    type: "name",
	                    title: "Leased Time",
	                    content: "Enter the duration in which a DHCP client can lease its current dynamic IPv6 address assigned by the router. After the dynamic IPv6 address has expired, the user will be automatically assigned a new dynamic IPv6 address. The default value is 86400 seconds."
                    }]
                }]		
            }, {
               type: "name",
               title: "Site Prefix Type",
               content: "Select a type to assign prefix to IPv6 addresses. Delegated and Static are provided."
            }, {
               type: "name",
               title: "Delegated",
               content: "",
               children: [
                   {
                       type: "name",
                       title: "Prefix Delegated WAN Connection",
                       content: "Select a WAN connection from the drop-down list to assign prefix."
                   }
               ]
            }, {
               type: "name",
               title: "Static",
               content: "",
               children: [
                    {
                        type: "name",
                        title: "Site Prefix",
                        content: "Enter a value for the site prefix."
                    }, {
                        type: "name",
                        title: "Site Prefix Length",
                        content: "Enter a value for the site prefix length."
                    }
                ]
			}]		
        },
		openvpnServer: {
			TITLE: "OpenVPN",
			CONTENT: [{
				type: "name",
				title: "Enable VPN Server",
				content: "Select this checkbox to enable the OpenVPN server."
			},{
				type: "name",
				title: "Service Type",
				content: "Select the communication protocol for the OpenVPN server: UDP or TCP."
			},{
				type: "name",
				title: "Service Port",
				content: "Enter a communication port number between 1024 to 65535. The default and common service port is 1194."
            },{
                type: "name",
                title: "VPN Subnet/Netmask",
                content: "Enter the range of IP addresses that can be leased to the clients by the OpenVPN server."
			},{
				type: "name",
				title: "Client Access",
				content: "Select the access type for your OpenVPN client."
			},{
				type: "name",
				title: "Home Network Only",
				content: "Clients can only access the router and LAN. The client's default route will not change."
			},{
				type: "name",
				title: "Internet and Home Network",
				content: "Clients can access the router, LAN and the Internet. The client's default route will be altered."
			},{
				type: "paragraph",
				content: "Click Save to save all your settings."
            },{
                type: "title",
                content: "Certificate"
            },{
                type: "paragraph",
                content: "Use the certificate for the information and identity of VPN connection for the remote computer."
            },{
                type: "name",
                title: "Generate",
                content: "Click to generate a new certificate."
            },{
                type: "title",
                content: "Configuration File"
            },{
                type: "name",
                title: "Export",
                content: "Click this button to save the OpenVPN configuration file to be used for adding a new VPN connection."
            }]
		},
		
		pptpvpnServer: {
			TITLE: "PPTP VPN",
			CONTENT: [{
				type: "name",
				title: "Enable VPN Server",
				content: "Select this checkbox to enable the PPTP VPN server."
			},{
				type: "name",
				title: "Client IP Address",
				content: "Enter the range of IP addresses (up to 10 clients) that can be leased to the clients by the PPTP VPN server."
			},{
				type: "name",
				title: "Username and Password",
				content: "Enter the username and password to authenticate clients to the PPTP VPN server."
			},{
				type: "paragraph",
				content: "Click Save to save all your settings."
			}]
		},	
		
		vpnServerStatus: {
			TITLE: "VPN Connections",
			CONTENT: [{
				type: "paragraph",
				content: "This page displays the clients that are currently connected to the OpenVPN and PPTP VPN servers hosted on the router."
			},{
				type: "paragraph",
				content: "Click the Minus icon to disconnect the corresponding client."
			}]
		},		
    };
})(jQuery);
