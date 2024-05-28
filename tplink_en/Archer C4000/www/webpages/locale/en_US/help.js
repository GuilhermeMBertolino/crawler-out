(function($){
	$.su = $.su || {};
	$.su.CHAR = $.su.CHAR || {};
	$.su.CHAR.HELP = {
		STATUS_INTERNET: {
			TITLE: "Internet",
			CONTENT: [{
				type: "paragraph",
				content: "Displays relevant information about the wide area network (Internet) connection."
			}]
		},
		STATUS_WIRELESS: {
			TITLE: "2.4GHz/5GHz Wireless",
			id: "help_status_wifi_title",
			CONTENT: [{
				type: "paragraph",
				content: "Displays relevant information about the wireless network."
			}]
		},
		STATUS_LAN: {
			TITLE: "LAN",
			CONTENT: [{
				type: "paragraph",
				content: "Displays information about the Ethernet (LAN) ports."
			}]
		},
		STATUS_GUEST: {
			TITLE: "2.4GHz/5GHz Guest Network",
			id: "help_status_guest_title",
			CONTENT: [{
				type: "paragraph",
				content: "Displays information about the wireless networks for guests."
			}]
		},
		STATUS_USB: {
			TITLE: "USB Devices",
			CONTENT: [{
				type: "paragraph",
				content: "Displays information of the current USB storage devices and/or printer connected to the router via the USB ports."
			}]
		},
		STATUS_PERFORMANCE: {
			TITLE: "Performance",
			CONTENT: [{
				type: "paragraph",
				content: "Displays the current router performance."
			}]
		},
		STATUS_WIRED: {
			TITLE: "Wired Clients",
			CONTENT: [{
				type: "paragraph",
				content: "Displays information of the wired devices connected to the network."
			}]
		},
		STATUS_WIRELESS_CLIENTS: {
			TITLE: "Wireless Clients",
			CONTENT: [{
				type: "paragraph",
				content: "Displays information of the wireless devices connected to the network."
			}]
		},
		
		INTERNET_TITLE: {
			TITLE: "Internet",
			CONTENT: [{
				type: "paragraph",
				content: "Configure the IPv4 parameters and select the appropriate MAC Clone method as you need."
			}]
		},
		INTERNET_INTERNET: {
			TITLE: "IPv4",
			CONTENT: [{
				type: "paragraph",
				content: "Select the Internet Connection Type and enter corresponding parameters."
			},{
				type: "title",
				title: "Internet Connection Type: Dynamic IP"
			},{
				type: "paragraph",
				content: "Select this type if you are provided with a DHCP server connection by the ISP."
			},{
				type: "name",
				title: "IP Address/Subnet Mask/Default Gateway/Primary DNS/Secondary DNS",
				content: "These parameters are automatically assigned by the DHCP server from the ISP."
			},{
				type: "name",
				title: "Renew",
				content: "Click to get new IP parameters from the DHCP server."
			},{
				type: "name",
				title: "Release",
				content: "Click to release all IP addresses assigned by the DHCP server."
			},{
				type: "name",
				title: "DNS Address",
				content: "If the ISP provides one or two DNS addresses, select this checkbox and enter the primary DNS and secondary DNS addresses into the corresponding input fields. Otherwise, the DNS addresses will be assigned dynamically by the ISP."
			},{
				type: "name",
				title: "MTU Size",
				content: "The default and typical MTU (Maximum Transmission Unit) size for most Ethernet networks is 1500 Bytes. It is NOT recommended to change the default MTU size unless required by the ISP."
			},{
				type: "name",
				title: "Host Name",
				content: "Enter a value into this field to specify the host name of the router."
			},{
				type: "name",
				title: "Get IP Using Unicast DHCP",
				content: "Select this checkbox if the ISP's DHCP server does not support broadcast applications and you cannot get the IP address dynamically."
			},{
				type: "title",
				title: "Internet Connection Type: Static IP"
			},{
				type: "paragraph",
				content: "Select this type if you are provided with a specific (fixed) IP Address, subnet mask, gateway, and DNS parameters by the ISP."
			},{
				type: "name",
				title: "IP Address/Subnet Mask/Default Gateway/Primary DNS/Secondary DNS",
				content: "Enter the information provided by the ISP."
			},{
				type: "name",
				title: "MTU Size",
				content: "The default and typical MTU (Maximum Transmission Unit) size for most Ethernet networks is 1500 Bytes. It is NOT recommended to change the default MTU size unless required by the ISP."
			},{
				type: "title",
				title: "Internet Connection Type: BigPond Cable"
			},{
				type: "paragraph",
				content: "Select this type if the ISP provides BigPond Cable connection."
			},{
				type: "name",
				title: "Username/Password",
				content: "Enter the username and password provided by the ISP. These fields are case-sensitive."
			},{
				type: "name",
				title: "Auth. Server",
				content: "Enter the authenticating server's IP address or hostname."
			},{
				type: "name",
				title: "Auth. Domain",
				content: "Enter the server's domain name suffix (based on the location). For example, nsw.bigpond.net.au for NSW/ACT, vic.bigpond.net.au for VIC/TAS/WA/SA/NT, or qld.bigpond.net.au for QLD."
			},{
				type: "name",
				title: "MTU Size",
				content: "The default and typical MTU (Maximum Transmission Unit) size for most Ethernet networks is 1500 Bytes. It is NOT recommended to change the default MTU size unless required by the ISP."
			},{
				type: "name",
				title: "Connection Mode",
				content: "Select an appropriate connection mode that determines how to connect to the Internet.",
				children: [{
					type: "name",
					title: "Auto",
					content: "In this mode, the Internet connection reconnects automatically any time it gets disconnected."
				},{
					type: "name",
					title: "On Demand",
					content: "In this mode, the Internet connection will be terminated automatically after a specified time of inactivity (Max Idle Time) has elapsed. The connection is re-established when you attempt to access the Internet again."
			},{
				type: "name",
					title: "Manually",
					content: "In this mode, the Internet connection is controlled manually by clicking the Connect or Disconnect button. This mode also supports the Max Idle Time function. Enter a maximum time (in minutes) the Internet connection can be inactive before it is terminated into the Max Idle Time field. The default value is 15 minutes. If you want the Internet connection remains active at all time, enter 0 (zero)."
				}]
			},{
				type: "title",
				title: "Internet Connection Type: PPPoE"
			},{
				type: "paragraph",
				content: "Select this type if you use DSL (Digital Subscriber Line) service and are provided with a username and password by the ISP."
			},{
				type: "name",
				title: "Username/Password",
				content: "Enter the username and password provided by the ISP. These fields are case-sensitive."
			},{
				type: "name",
				title: "IP Address/Primary DNS/Secondary DNS",
				content: "These parameters are automatically assigned by the DHCP server on the ISP."
			},{
				type: "name",
				title: "Secondary Connection (None, Dynamic IP, Static IP)",
				children: [{
					type: "name",
					title: "None",
					content: "Select if no secondary connection is provided."
				},{
					type: "name",
					title: "Dynamic IP",
					content: "Select if the IP address and subnet mask are assigned automatically by the ISP.",
					children: [{
						type: "name",
						title: "Renew",
						content: "Click to renew the IP parameters from the ISP."
					},{
						type: "name",
						title: "Release",
						content: "Click to release the assigned IP parameters."
					}]
				},{
					type: "name",
					title: "Static IP",
					content: "Select if the IP address and subnet mask are provided by the ISP, and enter the information in the corresponding fields."
				}]
			},{
				type: "name",
				title: "MTU Size",
				content: "The typical MTU (Maximum Transmission Unit) size for Ethernet networks is 1480 Bytes.",
				children: [{
					type: "note",
					title: "Note",
					content: "In a rare case, the ISP may require you to adjust the MTU size for better network performance. You should not change the value unless it is absolutely necessary."
				}]
			},{
				type: "name",
				title: "Service Name/Access Concentrator Name",
				content: "By default, the Service Name and Access Concentrator (AC) Name are left blank. These fields should not be configured unless required by the ISP."
			},{
				type: "name",
				title: "Detect Online Interval",
				content: "Enter a time interval value between 0 and 120 (in seconds) for which the router detects Access Concentrator online at every interval. The default value is 10."
			},{
				type: "name",
				title: "IP Address",
				content: "If the ISP provides a specific (fixed) IP address, select Use the following IP Address and enter the IP address in the field. Otherwise select Get Dynamically from ISP to obtain a server-assigned IP address automatically."
			},{
				type: "name",
				title: "DNS Address",
				content: "If the ISP provides the specific (fixed) DNS IP addresses, select Use the Following DNS Addresses and enter the address(es) into the primary DNS and secondary DNS fields respectively. Otherwise select Get Dynamically from ISP to obtain the server-assigned DNS IP address(es) automatically."
			},{
				type: "name",
				title: "Connection Mode",
				content: "Select an appropriate connection mode that determines how to connect to the Internet.",
				children: [{
					type: "name",
					title: "Auto",
					content: "In this mode, the Internet connection reconnects automatically any time it gets disconnected."
				},{
					type: "name",
					title: "On Demand",
					content: "In this mode, the Internet connection will be terminated automatically after a specified time of inactivity (Max Idle Time) has elapsed. The connection is re-established when you attempt to access the Internet again."
				},{
					type: "name",
					title: "Time-Based",
					content: "In this mode, the Internet connection is only established in a specific timeframe. If this option is selected, enter the start time and end time; both are in HH:MM format."
				},{
					type: "name",
					title: "Manually",
					content: "In this mode, the Internet connection is controlled manually by clicking the Connect or Disconnect button. This mode also supports the Max Idle Time function. Enter a maximum time (in minutes) the Internet connection can be inactive before it is terminated into the Max Idle Time field. The default value is 15 minutes. If you want the Internet connection remains active at all time, enter 0 (zero)."
				},{
					type: "note",
					title: "Note",
					content: "The Time-Based connection mode will only take effect once the System Time on the Advanced → System Tools → Time Settings page is configured."
				}]
			},{
				type: "title",
				title: "Internet Connection Type: L2TP/PPTP"
			},{
				type: "paragraph",
				content: "Select this type if you connect to an L2TP/PPTP VPN Server and are provided with a username, password, and IP Address/Domain Name of the server by the ISP."
			},{
				type: "name",
				title: "Username/Password",
				content: "Enter the username and password provided by the ISP. These fields are case-sensitive."
			},{
				type: "name",
				title: "IP Address/Primary DNS/Secondary DNS",
				content: "These parameters will be automatically assigned by the DHCP server from the ISP."
			},{
				type: "name",
				title: "Secondary Connection (Dynamic IP or Static IP)",
				children: [{
					type: "name",
					title: "Dynamic IP",
					content: "Select if the IP address and subnet mask are assigned automatically by the ISP."
				},{
					type: "name",
					title: "Static IP",
					content: "Select if the IP address, subnet mask, gateway, and DNS addresses are provided by the ISP, and enter the information in the corresponding fields."
				}]
			},{
				type: "name",
				title: "VPN Server IP/Domain Name",
				content: "Enter the VPN server's IP address or domain name provided by the ISP."
			},{
				type: "name",
				title: "MTU Size",
				content: "The default and typical MTU (Maximum Transmission Unit) size for most Ethernet networks is 1460 Bytes for L2TP or 1420 Bytes for PPTP. It is NOT recommended to change the default MTU size unless required by the ISP."
			},{
				type: "name",
				title: "Connection Mode",
				content: "Select an appropriate connection mode that determines how to connect to the Internet.",
				children: [{
					type: "name",
					title: "Auto",
					content: "In this mode, the Internet connection reconnects automatically any time it gets disconnected."
				},{
					type: "name",
					title: "On Demand",
					content: "In this mode, the Internet connection will be terminated automatically after a specified time of inactivity (Max Idle Time) has elapsed. The connection is re-established when you attempt to access the Internet again."
				},{
					type: "name",
				title: "Manually",
				content: "In this mode, the Internet connection is controlled manually by clicking the Connect or Disconnect button. This mode also supports the Max Idle Time function. Enter a maximum time (in minutes) the Internet connection can be inactive before it is terminated into the Max Idle Time field. The default value is 15 minutes. If you want the Internet connection remains active at all time, enter 0 (zero)."
				}]
			}]
		},
		
		INTERNET_MAC: {
			TITLE: "MAC Clone",
			CONTENT: [{
				type: "paragraph",
				content: "Select the appropriate MAC Clone method as you need."
			},{
				type: "name",
				title: "Do NOT Clone MAC Address",
				content: "Do NOT change the default MAC address of the router, in case the ISP does not bind the assigned IP address to the MAC address."
			},{
				type: "name",
				title: "Clone Current Computer MAC Address",
				content: "Select to copy the current MAC address of the computer that is connected to the router, in case the ISP binds the assigned IP address to the computer's MAC address."
			},{
				type: "name",
				title: "Use Custom MAC Address",
				content: "Enter the MAC address manually, in case the ISP binds the assigned IP address to the specific MAC address."
			}]
		},
		INTERNET_WAN_AGGREGATION: {
			TITLE: "WAN Aggregation",
			id: "internet_wan_aggregation_title",
			CONTENT: [{
				type: "paragraph",
				id: "internet_wan_aggregation_detail",
				content: "WAN Aggregation transforms the LAN1 port to an additional WAN port, and makes a single high-bandwidth data path. Unleash faster internet from ISPs that provide bandwidth rates over 1Gbps and no longer be limited by your networking hardware."
			},{
				type: "note",
				title: "Note",
				id: "internet_wan_aggregation_note",
				content: "Before enabling this feature, make sure that your ISP supports WAN Aggregation and your modem has two WAN ports."
			},{
				type: "step",
				title: "To apply WAN aggregation",
				id: "internet_wan_aggregation_step",
				content:[
					"1.	Toggle on WAN Aggregation to enable it.",
					"2.	Click Save.",
					"3.	Connect the router’s WAN port and LAN1 port to your modem’s two WAN ports with two Ethernet cables."
				]
			}]
		},
		LAN_IPV4: {
			TITLE: "LAN",
			CONTENT: [{
				type:"paragraph",
				content:"Displays the MAC address, IP address and subnet mask of the router."
			},{
				type: "name",
				title: "MAC Address",
				content: "The unique physical address assigned to the Ethernet (LAN) port of the router."
			},{
				type: "name",
				title: "IP Address",
				content: "Displays the router's default IP address which is used to log in to the router's web management page. You can change it to another one."
			},{
				type: "name",
				title: "Subnet Mask",
				content: "Select an assigned identifier used by the LAN port to route Internal and External traffic or enter a new subnet mask."
			},{
				type: "note",
				title: "Note",
				content: "If the new LAN IP address is not in the same subnet with the old one, the IP Address Pool in the DHCP server will be automatically configured; however, the Virtual Server and DMZ Host will not take effect until they are reconfigured."
			}]
		},
		
		LINK_AGG: {
			TITLE: "Link Aggregation",
			CONTENT: [{
				type: "paragraph",
				content: "Link Aggregation combines two ports together to make a single high-bandwidth data path, thus sustaining a higher-speed and more stable wired network."
			},{
				type: "step",
				id: "link_agg_step_help",
				title: "To apply link aggregation:",
				content:[
					"1. Toggle on to enable the Link Aggregation feature.",
					"2. Specify two ports for link aggregation.",
					"3. Click Save."
				]
			}]
		},
		
		IPTV:{
			TITLE: "IPTV",
			CONTENT: [{
					type:"paragraph",
					content:"IPTV (Internet Protocol Television) is a system through which television services are delivered using the Internet protocol suite over a packet-switched network such as a LAN or the Internet."
				},{
					type: "name",
					title: "IGMP Snooping",
					id:"igmp-snooping",
					content: "The IGMP (Internet Group Management Protocol) Snooping feature allows the router to only forward multicast traffic to ports that have requested them."
				},{
					type: "name",
					title: "IGMP Proxy",
					content: "Select to enable the IGMP Proxy feature if the IPTV service provided by the ISP is IGMP technology-based."
				},{
					type: "name",
					title: "IGMP Version",
					content: "Select the IGMP Version according to your ISP. The default IGMP Version is V2."
				},{
					type: "name",
					title: "Wireless Multicast Forwarding",
					id: "igmp-wifi",
					content: "Select to enable the Wireless Multicast Forwarding feature which allows the multicast packets to be forwarded to the wireless network."
				},{
					type: "name",
					title: "IPTV",
					content: "Select to enable the IPTV feature if the IPTV service provided by the ISP is non-IGMP technology-based."
				},{
					type: "name",
					title: "ISP Profile",
					content: "Select the appropriate ISP (internet service provider) profile to finish the configuration. There are three types of profiles:",
							children: [{
								type: "name",
							title: "Country-ISP Name",
							content: "ISP profiles with default settings are in the format \"Country-ISP Name\". Simply find and select your ISP from the drop-down list."
						},
						{
							type: "name",
							title: "Bridge",
							id: "iptv_bridge_child_1to4",
							content:"If your ISP is not listed and no other parameters are required to set up IPTV, you can simply select this profile and specify the LAN port dedicated to IPTV.",
							children:[{
								type: "name",
								title: "LAN1/LAN2/LAN3/LAN4",
								content: "Specify which kind of data the LAN port will transmit. For example, if IPTV is selected for LAN1, it will only transmit IPTV data and you should connect the set-top box to LAN1."
							}]
						},
						{
							type: "name",
							title: "Bridge",
							id: "iptv_bridge_child_2to5",
							content:"If your ISP is not listed and no other parameters are required to set up IPTV, you can simply select this profile and specify the LAN port dedicated to IPTV.",
							children:[{
								type: "name",
								title: "LAN2/LAN3/LAN4/LAN5",
								content: "Specify which kind of data the LAN port will transmit. For example, if IPTV is selected for LAN2, it will only transmit IPTV data and you should connect the set-top box to LAN2."
							}]
						},
						{
							type: "name",
							title: "Bridge",
							id: "iptv_bridge_child_5to8",
							content:"If your ISP is not listed and no other parameters are required to set up IPTV, you can simply select this profile and specify the LAN port dedicated to IPTV.",
							children:[{
								type: "name",
								title: "LAN5/LAN6/LAN7/LAN8",
								content: "Specify which kind of data the LAN port will transmit. For example, if IPTV is selected for LAN5, it will only transmit IPTV data and you should connect the set-top box to LAN5."
							}]
						},
						{
							type: "name",
							title: "Custom",
							id: "iptv_custom_1to4",
							content: "If your ISP is not listed but it provides you with some necessary parameters, such as internet/VoIP/IPTV VLAN IDs and Priority, select this profile.",
							children: [{
								type: "name",
								title: "Internet/VoIP/IPTV VLAN ID/Priority",
								content: "Configure the VLAN IDs and priorities as provided by the ISP."
							},{
								type: "name",
								title: "802.11Q Tag",
								content: "Select whether to tag the Internet packets with 802.11Q."
							},{
								type: "name",
								title: "IPTV Multicast VLAN ID/Priority",
								content: "You can enable the IPTV multicast feature as desired, and configure the VLAN ID and Priority according to the ISP."
							},{
								type: "name",
                                id: "iptv_custom_child",
								title: "LAN1/LAN2/LAN3/LAN4",
								content: "Specify which kind of data the LAN port will transmit. For example, if IPTV is selected for LAN1, it will only transmit IPTV data and you should connect the set-top box to LAN1."
							}]
						},
						{
							type: "name",
							title: "Custom",
							id: "iptv_custom_2to5",
							content: "If your ISP is not listed but it provides you with some necessary parameters, such as internet/VoIP/IPTV VLAN IDs and Priority, select this profile.",
							children: [{
								type: "name",
								title: "Internet/VoIP/IPTV VLAN ID/Priority",
								content: "Configure the VLAN IDs and priorities as provided by the ISP."
							},{
								type: "name",
								title: "802.11Q Tag",
								content: "Select whether to tag the Internet packets with 802.11Q."
							},{
								type: "name",
								title: "IPTV Multicast VLAN ID/Priority",
								content: "You can enable the IPTV multicast feature as desired, and configure the VLAN ID and Priority according to the ISP."
							},{
								type: "name",
                                id: "iptv_custom_child",
								title: "LAN2/LAN3/LAN4/LAN5",
								content: "Specify which kind of data the LAN port will transmit. For example, if IPTV is selected for LAN2, it will only transmit IPTV data and you should connect the set-top box to LAN2."
							}]
						},
						{
							type: "name",
							title: "Custom",
							id: "iptv_custom_5to8",
							content: "If your ISP is not listed but it provides you with some necessary parameters, such as internet/VoIP/IPTV VLAN IDs and Priority, select this profile.",
							children: [{
								type: "name",
								title: "Internet/VoIP/IPTV VLAN ID/Priority",
								content: "Configure the VLAN IDs and priorities as provided by the ISP."
							},{
								type: "name",
								title: "802.11Q Tag",
								content: "Select whether to tag the Internet packets with 802.11Q."
							},{
								type: "name",
								title: "IPTV Multicast VLAN ID/Priority",
								content: "You can enable the IPTV multicast feature as desired, and configure the VLAN ID and Priority according to the ISP."
							},{
								type: "name",
                                id: "iptv_custom_child",
								title: "LAN5/LAN6/LAN7/LAN8",
								content: "Specify which kind of data the LAN port will transmit. For example, if IPTV is selected for LAN5, it will only transmit IPTV data and you should connect the set-top box to LAN5."
							}]
						}
					]
				}
			]
		},

		DHCP_SERVER_SETTINGS: {
			TITLE: "DHCP Server",
			CONTENT: [{
				type: "paragraph",
				content: [
					"The Dynamic Host Configuration Protocol (DHCP) Server is enabled by default and dynamically assigns TCP/IP parameters to client devices from the IP Address Pool.",
					"Do NOT disable the DHCP Server unless you have another DHCP server, or you want to manually assign the TCP/IP parameters to every client device on the network."
				]
			},{
				type: "name",
				title: "IP Address Pool",
				content: "Enter the range of IP addresses that can be leased to the clients."
			},{
				type: "name",
				title: "Address Lease Time",
				content: "Enter the time duration (between 1 and 2880 minutes) in which an IP address is leased to a client. The default value is 120."
			}]
		},
		
		RESERVED_IP_ADDRESS: {
			TITLE: "Address Reservation",
			CONTENT: [{
				type: "paragraph",
				content: "Displays the corresponding parameters of IP-reserved devices."
			},{
				type: "step",
				title: "To reserve an IP address",
				content:[
					"1. Click Add.",
					"2. Click Scan to choose a currently connected device from the DHCP Client List; or enter the MAC address of your desired client in the MAC Address field and the IP address that you want to reserve for the client in the IP Address field.",
					"3. Enter a description for the client in the Description field.",
					"4. Select Enable This Entry.",
					"5. Click Save."
				]
			},{
				type: "note",
				title: "Note",
				content: "If you want to disable this entry, click the Bulb icon."
			}]
		},

		DHCP_CLIENT_LIST: {
			TITLE: "DHCP Client List",
			CONTENT: [{
				type: "paragraph",
				content: "Displays the information of currently connected devices."
			}]
		},
		DDNS: {
			TITLE: "Dynamic DNS",
			CONTENT: [{
				type: "paragraph",
				content: "Dynamic DNS (Dynamic Domain Name System) allows you to assign a fixed host and domain name to a dynamic Internet IP address. It is useful when you are hosting your own website, FTP server, or another server behind the router. To begin with, you need to sign up with a Dynamic DNS service provider such as www.dyndns.com."
			},{
				type: "step",
				title: "To set up a Dynamic DNS",
				content: [
					"1. Select the Dynamic DNS service provider.",
					"2. Enter the Username and Password of the Dynamic DNS account.",
					"3. Enter the Domain Name you received from the Dynamic DNS service provider.",
					"4. Select the Update Interval from the drop-down list.",
					"5. If your service provider is NO-IP, WAN IP Binding can ensure that the domain name is bound to the WAN IP of this router.",
					"6. Click Login and Save."
				]
			},{
				type: "note",
				title:"Note",
				content: "If you want to use a new DDNS account, please log out first, and then log in with the new account."
			}]
		},
		DYNAMIC_DNS: {
			TITLE: "Dynamic DNS",
			CONTENT: [{
				type: "paragraph",
				content: "Dynamic DNS (Dynamic Domain Name System) allows you to assign a fixed host and domain name to a dynamic Internet IP address. It is useful when you are hosting your own website, FTP server, or another server behind the router. To begin with, you need to sign up with a Dynamic DNS service provider such as www.dyndns.com."
			}]
		},
		DOMAIN_NAME_LIST: {
			TITLE: "Domain Name List",
			CONTENT: [{
				type: "paragraph",
				content: "This table displays the information of all the domain names that are registered with your cloud account."
			},{
				type:"step",
				title: "To register a new domain name",
				content: [
					"1. Click Register.",
					"2. Enter the domain name that you want to register.",
					"3. Click Save."
					]
			}]
		},
		ADVANCED_ROUTING_STATIC_ROUTING: {
			TITLE: "Static Routing",
			CONTENT: [{
				type: "paragraph",
				content: "Static routing is used to predetermine a fixed route for the network information packets to reach a specific host or network."
			},{
				type: "step",
				title: "To set up a Static Routing",
				content: [
					"1. Click Add.",
					"2. Enter an IP address in the Network Destination field to assign the static route for this entry.",
					"3. Enter a subnet mask in the Subnet Mask field to determine the network portion and host portion of the IP address.",
					"4. Enter a gateway IP address in the Default Gateway field to connect the router to the network or host.",
					"5. Select LAN or WAN in the Interface field to specify the type of the Network Destination.",
					"6. Enter a brief description for this entry.",
					"7. Select Enable This Entry.",
					"8. Click Save."
				]
			},{
				type: "note",
				title: "Note",
				content: "If you want to disable this entry, click the Bulb icon."
			}]
		},
		ADVANCED_ROUTING_SYSTEM_ROUTING_TABLE: {
			TITLE: "System Routing Table",
			CONTENT: [{
				type: "paragraph",
				content: "Displays all valid route entries that are currently in use."
			}]
		},
		WIRELESS_TITLE:{
			TITLE: "Wireless Settings",
			CONTENT: [{
				type: "paragraph",
				content: "Configure the wireless settings as you need."
			}]
		},		
		WIRELESS_REGION: {
			// TITLE: "Settings",
			// CONTENT: [{
				// type: "name",
				// title: "Region",
				// content: "Select your region from the drop-down menu. If your country or region is not listed, it may be restricted to use the wireless radio in your location."
			// },{
				// type: "paragraph",
				// content: "Click Save to save all your settings."
			// }]
		},
		
		WIRELESS_SMART_CONNECT: {
			TITLE: "Smart Connect",
			CONTENT: [{
				type: "paragraph",
				content: "Select this checkbox to enable smart connect. This function helps devices run faster by assigning them to best wireless bands based on actual conditions to balance network demands."
			}]	
		},
		
		WIRELESS_24G: {	
			TITLE: "2.4GHz Wireless",
			CONTENT: [{
				type: "name",
				title: "Network Name (SSID)",
				content: "You are recommended to change the network name (SSID). This field is case-sensitive."
			},{
				type: "name",
				title: "Hide SSID",
				content: "Select if you want to hide the 2.4GHz network name (SSID) from the wireless network list. When selected, the SSID will not be broadcast and you need to manually join the network."
			},{
				type: "name",
				title: "Security",
				content: "Select one of the following security options:",
				children: [{
					type: "name",
					title: "No Security",
					content: "Select this option to disable the wireless security. This is not recommended."
				},{
					type: "name",
					title: "WPA/WPA2-Personal",
					content: "Select this option to enable the wireless security. This is highly recommended to protect the wireless network from unauthorized access. If selected, configure the following.",
					children: [{
						type: "name",
						title: "Version",
						content: "Select a security version. Select a security version. WPA2-PSK is more secure. If you are not sure, select Auto."
					},{
						type: "name",
						title: "Encryption",
						content: "Select a security encryption type. AES is more secure. It is NOT recommended to use the TKIP encryption if the router operates in 802.11n mode. Besides, using TKIP will disable the WPS function. If you are not sure, select Auto."
					},{
						type: "name",
						title: "Password",
						content: "Enter a wireless password between 8 and 63 ASCII characters, or between 8 and 64 hexadecimal characters into this field."
					}]
				},{
					type: "name",
					title: "WPA/WPA2-Enterprise",
					content: "Select this option to enable the more advanced authentication method using a RADIUS (Remote Authentication Dial In User Service) server. If selected, WPS function will be disabled.",
					children: [{
						type: "name",
						title: "Version",
						content: "Select a security version. WPA2 is more secure. If you are not sure, select Auto."
					},{
						type: "name",
						title: "Encryption",
						content: "Select a security encryption type. AES is more secure. It is NOT recommended to use the TKIP encryption if the router operates in 802.11n mode. Besides, using TKIP will disable the WPS function. If you are not sure, select Auto."
					},{
						type: "name",
						title: "RADIUS Server IP",
						content: "Enter the IP address of the RADIUS server."
					},{
						type: "name",
						title: "RADIUS Port",
						content: "Enter the port number of the RADIUS server."
					},{
						type: "name",
						title: "RADIUS Password",
						content: "Enter the shared password of the RADIUS server."
					}]
				},{
				type: "name",
				title: "WEP",
				content: "Select this option to enable basic authentication method if any of the client devices can only access the wireless using WEP (Wired Equivalent Privacy). If selected, WPS function will be disabled.",
				children: [{
					type: "name",
					title: "Type",
					content: "Select an authentication type for the wireless network. If you are not sure, select Auto."
				},{
					type: "name",
					title: "WEP Key Format",
					content: "Either use ASCII format or select Hexadecimal. ASCII format is a combination of alphabetic and numeric characters. Hexadecimal format is a combination of the number (0-9) and letters (A-F, a-f)."
				},{
					type: "name",
					title: "Key Type",
					content: "Select a WEP key length.",
					children: [{
						type: "name",
						title: "64-bit",
						content: "Allows you to enter 10 hexadecimal digits (0-9, A-F, a-f) or 5 ASCII characters into the WEP Value field."
					},{
						type: "name",
						title: "128-bit",
						content: "Allows you to enter 26 hexadecimal digits (0-9, A-F, a-f) or 13 ASCII characters into the WEP Value field."
					}]
				},{
					type: "name",
					title: "Key Value",
					content: "Enter the WEP key into the respective field."
				}]
			}]
			},{
				type: "name",
				title: "Channel",
				content: "Select an operating channel for the 2.4GHz wireless network. It is recommended to leave the channel to Auto, if you are not experiencing the intermittent wireless connection issue."
			},{
				type: "name",
				title: "Transmit Power",
				content: "Select either High, Middle, or Low to specify the data transmit power. The default and recommended setting is High."
			},{
				type:"name",
				title:"Airtime Fairness Feature",
				id:"atf_2g4",
				content:"Select this checkbox to enable the Airtime Fairness(ATF) feature that allows you to optimize the throughput of each flow. The ATF traffic scheduler uses the per-destination airtime targets to balance airtime usage across flow destinations."
			},{
				type:"name",
				title:"Multi-User MIMO Feature",
				id:"mu_mimo_2g4",
				content:"Click enable to use Multi-User MIMO Feature."
			}]
		},
		
		WIRELESS_5G: {	
			TITLE: "5GHz Wireless",
			CONTENT: [{
				type: "name",
				title: "Network Name (SSID)",
				content: "You are recommended to change the network name (SSID). This field is case-sensitive."
			},{
				type: "name",
				title: "Hide SSID",
				content: "Select if you want to hide the 5GHz network name (SSID) from the wireless network list. When selected, the SSID will not be broadcast and you need to manually join the network."
			},{
				type: "name",
				title: "Security",
				content: "Select one of the following security options:",
				children: [{
					type: "name",
					title: "No Security",
					content: "Select this option to disable the wireless security. This is not recommended."
				},{
					type: "name",
					title: "WPA/WPA2-Personal",
					content: "Select this option to enable the wireless security. This is highly recommended to protect thewireless network from unauthorized access. If selected, configure the following.",
					children: [{
						type: "name",
						title: "Version",
						content: "Select a security version. WPA2-PSK is more secure. If you are not sure, select Auto."
					},{
						type: "name",
						title: "Encryption",
						content: "Select a security encryption type. AES is more secure. It is NOT recommended to use the TKIP encryption if the router operates in 802.11n mode. Besides, using TKIP will disable the WPS function. If you are not sure, select Auto."
					},{
						type: "name",
						title: "Password",
						content: "Enter a wireless password between 8 and 63 ASCII characters, or between 8 and 64 hexadecimal characters into this field."
					}]
				},{
					type: "name",
					title: "WPA/WPA2-Enterprise",
					content: "Select this option to enable the more advanced authentication method using a RADIUS (Remote Authentication Dial In User Service) server. If selected, WPS function will be disabled.",
					children: [{
						type: "name",
						title: "Version",
						content: "Select a security version. WPA2 is more secure. If you are not sure, select Auto."
					},{
						type: "name",
						title: "Encryption",
						content: "Select a security encryption type. AES is more secure. It is NOT recommended to use the TKIP encryption if the router operates in 802.11n mode. Besides, using TKIP will disable the WPS function. If you are not sure, select Auto."
					},{
						type: "name",
						title: "RADIUS Server IP",
						content: "Enter the IP address of the RADIUS server."
					},{
						type: "name",
						title: "RADIUS Port",
						content: "Enter the port number of the RADIUS server."
					},{
						type: "name",
						title: "RADIUS Password",
						content: "Enter the shared password of the RADIUS server."
					}]
				},{
					type: "name",
					title: "WEP",
					content: "Select this option to enable basic authentication method if any of the client devices can only access the wireless using WEP (Wired Equivalent Privacy). If selected, WPS function will be disabled.",
					children: [{
						type: "name",
						title: "Type",
						content: "Select an authentication type for the wireless network. If you are not sure, select Auto."
					},{
						type: "name",
						title: "WEP Key Format",
						content: "Either use ASCII format or select Hexadecimal. ASCII format is a combination of alphabetic and numeric characters. Hexadecimal format is a combination of the number (0-9) and letters (A-F, a-f)."
					},{
						type: "name",
						title: "Key Type",
						content: "Select a WEP key length.",
						children:[{
							type: "name",
							title: "64-bit",
							content: "Allows you to enter 10 hexadecimal digits (0-9, A-F, a-f) or 5 ASCII characters into the WEP Value field."
						},{
							type: "name",
							title: "128-bit",
							content: "Allows you to enter 26 hexadecimal digits (0-9, A-F, a-f) or 13 ASCII characters into the WEP Value field."
						}]
					},{
						type: "name",
						title: "Key Value",
						content: "Enter the WEP key into the respective field."
					}]
				}]
			},{
				type: "name",
				title: "Channel",
				content: "Select an operating channel for the 5GHz wireless network. It is recommended to leave the channel to Auto, if you are not experiencing the intermittent wireless connection issue."
			},{
				type: "name",
				title: "Transmit Power",
				content: "Select either High, Middle, or Low to specify the data transmit power. The default and recommended setting is High."
			},{
				type:"name",
				title:"Airtime Fairness Feature",
				id:"atf_5g",
				content:"Select this checkbox to enable the Airtime Fairness(ATF) feature that allows you to optimize the throughput of each flow. The ATF traffic scheduler uses the per-destination airtime targets to balance airtime usage across flow destinations."
			},{
				type:"name",
				title:"Multi-User MIMO Feature",
				id:"mu_mimo_5g",
				content:"Click enable to use Multi-User MIMO Feature."
			}]
		},
		
		WPS: {	
			TITLE: "WPS",
			CONTENT: [{
				type: "paragraph",
				content: "WPS (Wi-Fi Protected Setup) provides you with an easier approach to set up a security-protected Wi-Fi connection."
			},{
				type: "name",
				title: "Push Button (recommended)",
				content: [
					"This method allows you to easily connect any WPS-enabled device to the wireless network.",
					"Click the Start WPS button on the screen. Within two minutes, press the WPS button on the client device."
				]
			},{
				type: "name",
				title: "Router's PIN",
				content: [
					"The default PIN can be found on the label of the router.",
					"Click Generate to get a new PIN or click Default to restore the current PIN to its factory default PIN."
				]
			},{
				type: "name",
				title: "Client's PIN",
				content: [
					"This method allows you to add a wireless device manually.",
					"Enter the device's PIN in the field and then click Connect."
				]
			}]
		},

		WIRELESS_STATISTICS: {	
			TITLE: "Wireless Stations Online",
			CONTENT: [{
				type: "name",
				title: "Total Clients",
				content: "Displays the number of the associated wireless client."
			},{
				type: "name",
				title: "MAC Address",
				content: "Displays the MAC address of the associated wireless client."
			},{
				type: "name",
				title: "Connection Type",
				content: "Displays the wireless frequency band (2.4GHz or 5GHz) of the associated wireless client."
			},{
				type: "name",
				title: "Security",
				content: "Displays the security type of the associated wireless client."
			},{
				type: "name",
				title: "Received Packets",
				content: "Displays the number of packets received by the associated wireless client."
			},{
				type: "name",
				title: "Sent Packets",
				content: "Displays the number of packets sent by the associated wireless client."
			},{
				type: "paragraph",
				content: "Click Refresh to update the information on this page."
			}]
		},
		
		WIRELESS_SCHEDULE:{
			TITLE: "Wireless Schedule",
			CONTENT: [{
				type: "paragraph",
				content: "With Wireless Schedule, you can disable the wireless signal during a specific period. For example, you can turn off the wireless signal between 00:00 am and 07:00 am."
			},{
				type: "name",
				title: "Wireless Off Time",
				content: "Displays the period(s) during which the wireless signal is off.",
				children: [
					{
						type: "step",
						title: "To set up wireless off time",
						content:[
							"1. Click Add.",
							"2. Set the time period during which you need the wireless signal to be off.",
							"3. Select repetition days. You can choose \"Every Day\" or specify certain days.",
							"4. Click Save."
						]
					}
				]
			}]
		},
		
		GUEST_NETWORK_SETTINGS:{
			TITLE: "Settings",
			CONTENT: [{
				type: "paragraph",
				content: "This function allows you to provide Wi-Fi access for guests without disclosing the main network."
			},{
				type: "name",
				title: "Allow Guests to Access Each Other",
				content: "Select this checkbox to allow the wireless devices on the Guest Network to communicate with each other via methods such as network neighbors, Samba, Ping, and FTP."
			},{
				type: "name",
                           id: "access_local",
				title: "Allow Guests to Access My Local Network",
				content: "Select this checkbox to allow the wireless devices on the Guest Network to communicate with the devices connected to the router's LAN ports or main network via methods such as network neighbors, Samba, Ping, and FTP."
			}]
		},
		
		GUEST_NETWORK_WIRELESS:{	
			TITLE: "2.4GHz/5GHz Wireless",
			CONTENT: [{
				type: "name",
				title: "Enable Guest Network",
				content: "Select this checkbox to enable the Guest Network feature."
			},{
				type: "name",
				title: "Network Name (SSID)",
				content: "Either use the default Guest SSID or create a new name (up to 32 characters)."
			},{
				type: "name",
				title: "Hide SSID",
				content: "Select this checkbox if you want to hide the Guest SSID from the Wi-Fi network list."
			},{
				type:"name",
				id:"pwd_mode",
				title:"Password Update Interval",
				content: "Select the update interval of the Guest Network password."
			},{
				type: "name",
				title: "Security",
				content: "When you choose never to update the password, select one of the following security options:",
				children: [{
					type: "name",
					title: "No Security",
					content: "Select this option to disable the wireless security. This is not recommended."
				},{
					type: "name",
					title: "WPA/WPA2-Personal",
					content: "Select this option to enable the wireless security. This is highly recommended to protect the Guest Network from unauthorized access. If selected, configure the following.",
					children: [{
						type: "name",
						title: "Version",
						content: "Select a security version. WPA2-PSK is more secure. If you are not sure, select Auto."
					},{
						type: "name",
						title: "Encryption",
						content: "Select a security encryption type. AES is more secure. It is NOT recommended to use the TKIP encryption if the router operates in 802.11n mode. Besides, using TKIP will disable the WPS function. If you are not sure, select Auto."
					}]
				},{
				type: "name",
					title:"Portal",
					id : "portal-help-title",
					content:"Portal authentication enhances your network security by requesting authentication from clients needing temporary access to your wireless network."
				},{
					type:"step",
					title:"To set up portal authentication:",
					id: "portal-help-content",
					content:[
						"1. Select Portal for Security.",
						"2. Select Simple Password or No Authentication for Authentication.",

							"A. Simple Password – Specify a password for authentication (8-16 alpha characters, numbers and _).",
							"B. No Authentication – Clients can access the network without any authentication.",
						"3. Select 1 Hour, 2 Hours, 4 Hours, 8 Hours or Always to specify the authentication timeout. When a client’s authentication expires, he has to log in again for access authentication.",
						"4. (Optional) Enable Redirect and enter the redirected URL address as needed. Then a newly authenticated client will be redirected to the URL you have specified.",
						"5. (Optional) You can also customize the authentication login page.",
						"A. Portal Title – Up to 31 characters.",
						"B. Terms of Use – Up to 1023 characters.",
						"C. Logo Image – Upload a JPG or PNG image (less than 100KB) to customize the logo.",
						"D. Background Image – Upload a JPG or PNG image (less than 2MB) to customize the background.",
						"6. Click Save."
					]}
			]},{
				type: "name",
				id: "pwd_no_random",
				title: "Password",
				content: "Create a password between 8 and 63 ASCII characters, or between 8 and 64 hexadecimal characters (0-9, a-f, A-F)."
			},{
				type: "name",
				id: "pwd_random",
				title: "Password",
				content: "Either use the password generated randomly, or create a password between 8 and 63 ASCII characters or between 8 and 64 hexadecimal characters (0-9, a-f, A-F)."
			}]
		},

		NAT: {
			TITLE: "ALG",
			CONTENT: [{
				type: "paragraph",
				content: "ALG (Application Layer Gateway) allows customized NAT (Network Address Translation) traversal filters to be plugged into the gateway to support address and port translation for certain application layer \"control/data\" protocols: FTP, TFTP, H323 etc. Enabling ALG is recommended."
			},{
				type: "name",
				title: "Enable FTP ALG",
				content: "If selected, it allows FTP (File Transfer Protocol) clients and servers to transfer data via NAT."
			},{
				type: "name",
				title: "Enable TFTP ALG",
				content: "If selected, it allows TFTP (Trivial File Transfer Protocol) clients and servers to transfer data via NAT."
			},{
				type: "name",
				title: "Enable H323 ALG",
				content: "If selected, it allows Microsoft NetMeeting clients to communicate via NAT."
			},{
				type: "name",
				title: "Enable RTSP ALG",
				content: "If selected, it allows media player clients to communicate with streaming media servers via NAT."
			},{
				type: "name",
				title: "Enable SIP ALG",
				content: "If selected, it allows clients communicate with SIP (Session Initiation Protocol) servers via NAT."
			},
			{
				type: "name",
				title: "Enable PPTP Passthrough",
				content: "If selected, it allows Point-to-Point sessions to be tunneled through an IP network and passed through the router."
			},{
				type: "name",
				title: "Enable L2TP Passthrough",
				content: "If selected, it allows Layer 2 Point-to-Point sessions to be tunneled through an IP network and passed through the router."
			},{
				type: "name",
				title: "Enable IPSec Passthrough",
				content: "If selected, it allows IPSec (Internet Protocol security) to be tunneled through an IP network and passed through the router. IPSec uses cryptographic security services to ensure private and secure communications over IP networks."
			}]
		},


		VIRTUAL_SERVERS: {
			TITLE: "Virtual Servers",
			CONTENT: [{
				type: "paragraph",
				content: [
					"Virtual Servers are used to set up public services on the local network. A virtual server is defined as an external port, and all requests from the Internet to this external port will be redirected to a designated computer, which must be configured with a static or reserved IP address.",
					"When you build up a server on the local network and want to share it on the Internet, Virtual Servers can realize the service and provide it to the Internet users."
				]
			},{
				type: "paragraph",
				content: "The table displays the relevant parameters of the virtual server."
			},{
				type: "name",
				title: "Service Type",
				content: "Displays the name of the virtual server."
			},{
				type: "name",
				title: "External Port",
				content: "Displays the port number or a range of ports used by the virtual server."
			},{
				type: "name",
				title: "Internal IP",
				content: "Displays the IP address of the computer running the service application."
			},{
				type: "name",
				title: "Internal Port",
				content: "Displays the port number of computer running the service application."
			},{
				type: "name",
				title: "Protocol",
				content: "Displays the protocol used for the service application: TCP, UDP, or All (All protocols supported by the router)."
			},{
				type: "name",
				title: "Status",
				content: "Displays the current status (enabled or disabled) of the specific filtering rule."
			},{
				type: "name",
				title: "Modify",
				content: "Displays options to Modify or Delete the corresponding rule."
			},{
				type: "step",
				title: "To set up a Virtual Server rule",
				content: [
					"1. Click Add.",
					"2. Click Scan to select a service from the list to automatically populate the appropriate port number in the External Port and Internal Port fields. If the service is not listed, enter the External Port number (e.g. 21) or a range of ports (e.g. 21-25). Leave the Internal Port blank if it is the same as the External Port or enter a specific port number (e.g. 21) if the External Port is a single port. Enter the IP address of the computer running the service application in dotted decimal format into the Internal IP field.",
					"3. Select a protocol for the service application: TCP, UDP, or All from the Protocol drop-down list.",
					"4. Select Enable This Entry.",
					"5. Click Save."
				]
			},{
				type: "note",
				title: "Note",
				content: [
					"1. If you want to disable this entry, click the Bulb icon.",
					"2. It is recommended to keep the default settings of Internal Port and Protocol if you are not clear about which port or protocol to use.",
					"3. If the local host device is hosting more than one type of available services, you need to create a rule for each service. Please note that the External Port should NOT be overlapped."
				]
			}]
		},

		PORT_TRIGGERING: {
			TITLE: "Port Triggering",
			CONTENT: [{
				type: "paragraph",
				content: "Port Triggering is used to forward traffic on a certain port to specific server on the network."
			},{
				type: "paragraph",
				content: "The table displays the relevant parameters of the port triggering."
			},{
				type: "name",
				title: "Application",
				content: "Displays the name of the application."
			},{
				type: "name",
				title: "Triggering Port",
				content: "Displays the outgoing traffic port used to trigger a filtering rule of an outgoing connection."
			},{
				type: "name",
				title: "Trigger Protocol",
				content: "Displays the protocol used for Triggering Port. TCP, UDP, or All (All protocols supported by the router)."
			},{
				type: "name",
				title: "External Port",
				content: "Displays the port or port range used by the remote system. A response using one of these ports will be forwarded to the PC which triggers this rule. You can input at most 5 groups of ports (or port sections). Every group of ports must be separated with \",\" (commas), for example, 2000-2038, 2046, 2050-2051, 2085, 3010-3030."
			},{
				type: "name",
				title: "External Protocol",
				content: "Displays the protocol used for Incoming Port: TCP, UDP, or ALL (All protocols supported by the router)."
			},{
				type: "name",
				title: "Status",
				content: "Displays the current status (enabled or disabled) of the specific filtering rule."
			},{
				type: "name",
				title: "Modify",
				content: "Displays options to Modify or Delete the corresponding rule."
			},{
				type: "step",
				title: "To set up a Port Triggering rule",
				content: [{
					type: "note",
					title: "Note",
					content: "Each rule can only be used by one host at a time."
				},
					"1. Click Add.",
					"2. Click Scan to select an application from the list to automatically populate the default values into the appropriate fields. If you want to add an unlisted application, manually enter the Application, Triggering Port, Triggering Protocol, External Port and External Protocol.",	
					"3. Select Enable This Entry.",
					"4. Click Save."
				]
			},{
				type: "note",
				title: "Note",
				content: "If you want to disable this rule, click the Bulb icon."
			}]
		},

		DMZ: {
			TITLE: "DMZ",
			CONTENT: [{
				type: "paragraph",
				content: "The DMZ (Demilitarized Zone) host feature allows a local host to be exposed to the Internet for a special-purpose service, such as Internet gaming or video conferencing. Basically, the DMZ allows a single computer on the LAN to open all its ports. This computer needs to be configured with a static IP address and has its DHCP client function disabled."
			},{
				type: "paragraph",
				content: "When DMZ is enabled, the DMZ host is totally exposed to the Internet, which may bring some potential safety hazard to the computer. If DMZ is not in use, please disable it in time."
			},{
				type: "step",
				title: "To assign a computer or server to be a DMZ server",
				content: [
					"1. Select Enable DMZ.",
					"2. In the DMZ Host IP Address field, enter the IP Address of a local computer to set up as the DMZ host.",
					"3. Click Save."
				]
			}]
		},
		
		UPNP: {
			TITLE: "UPnP",
			CONTENT: [{
				type: "paragraph",
				content: "By default, the UPnP (Universal Plug-and-Play) feature is enabled to allow devices, such as computers and Internet appliances, to automatically discover and communicate with each other on the local network."
			},{
				type: "paragraph",
				content: "You may need to enable the UPnP if you want to use applications for multiplayer gaming, peer-to-peer connections, real-time communication (such as VoIP or teleVoIP conference) or remote assistance, etc."
			},{
				type: "name",
				title:	"UPnP Service List",
				content: "The UPnP Service List displays the UPnP information of the local host(s)."
			}]
		},
		
		MODEM: {
			TITLE: "3G/4G Help",
			CONTENT: [
				{
					type: "name",
					title: "3G/4G USB Modem",
					content: "Displays the status of the 3G/4G USB modem."
				},
				{
					type: "name",
					title: "Use the auto-identified ISP parameters",
					content: "This feature is enabled by default. If enabled, the router can identify the ISP for the SIM/UIM card and fill in the parameters automatically. If the identification fails, please select the Region and Mobile ISP manually."
				},
				{
					type: "name",
					title: "Region",
					content: "Automatically selects and displays the region when the USB modem and SIM card are successfully identified. If not select the region from the drop-down menu."
				},
				{
					type: "name",
					title: "Mobile ISP",
					content: "Displays the ISP (Internet Service Provider) of the 3G/4G network. If not automatically detected, select the ISP from the drop-down menu. The default Dial Number and APN will be auto-populated accordingly."
				},
				{
					type: "name",
					title: "SIM/UIM PIN",
					content: "If the SIM/UIM Protection is enabled, enter the PIN code. The SIM/UIM Protection is disabled by default. Please note that if you enter invalid PIN 3 times, the SIM/UIM card will be locked automatically. You can only unlock it by entering the PUK code from the PC/laptop."
				},
				{
					type: "name",
					title: "Message",
					content: "Displays the PIN infomation of the SIM/UIM card if the PIN Protection is enabled."
				},
				{
					type: "name",
					title: "Set the Dial Number, APN, Username and Password manually",
					content: "If the ISP is not listed in the <strong>Mobile ISP</strong> list, select this checkbox and enter the Dial Number, APN (Access Point Name), Username and Password that are provided by the ISP."
				},
				{
					type: "name",
					title: "Dial Number",
					content: "Enter the Dial Number provided by the ISP."
				},
				{
					type: "name",
					title: "APN",
					content: "Enter the APN (Access Point Name) provided by the ISP."
				},
				{
					type: "name",
					title: "Username/Password",
					content: "Enter the User Name and Password provided by the ISP. These fields are case-sensitive."
				},
				{
					type: "name",
					title: "Connect on Demand",
					content: "In this mode, the Internet connection will be terminated automatically after a specified time of inactivity (Max Idle Time) has elapsed. The connection is re-established when you attempt to access the Internet again."
				},
				{
					type: "note",
					title: "Note",
					content: "Occasionally, the connection cannot be disconnected, althrough you specify the Max Idle Time, because some applications keep accessing the Internet in the back-end."
				},
				{
					type: "name",
					title: "Connect Automatically",
					content: "In this mode, the Internet connection reconnects automatically anytime it gets disconnected."
				},
				{
					type: "name",
					title: "Connect Manually",
					content: "In this mode, you can click the Connect or Disconnect button to control the Internet connection manually. This mode also supports the Max Idle Time function. Enter a maximum time (in minutes) the Internet connection can be inactive before it is terminated into the Max Idle Time field. The default value is 15 minutes. If you want the Internet connection remains active at all time, enter 0 (zero)."
				},
				{
					type: "note",
					title: "Note",
					content: "Occasionally, the connection cannot be disconnected, althrough you specify the Max Idle Time, because some applications keep accessing the Internet in the back-end."
				},
				{
					type: "paragraph",
					content: "Click the Save button to save the settings."
				}
			]
		},

		MODEM_ADVANCED: {
			TITLE: "3G/4G Advanced Settings Help",
			CONTENT: [
				{
					type: "name",
					title: "3G/4G USB modem",
					content: "Displays the status of the 3G/4G USB modem."
				},
				{
					type: "name",
					title: "Use the auto-identified ISP parameters",
					content: "This feature is enabled by default. If enabled, the router can identify the ISP for the SIM/UIM card and fill in the parameters automatically. If the identification fails, please select the Region and Mobile ISP manually."
				},
				{
					type: "name",
					title: "Region",
					content: "Automatically selects and displays the region when the USB modem and SIM card are successfully identified. If not, select the region from the drop-down menu."
				},
				{
					type: "name",
					title: "Mobile ISP",
					content: "Displays the ISP (Internet Service Provider) of the 3G/4G network. If not automatically detected, select the ISP from the drop-down menu. The default Dial Number and APN will be auto-populated accordingly."
				},
				{
					type: "name",
					title: "SIM/UIM PIN",
					content: "If the SIM/UIM Protection is enabled, enter the PIN code. The SIM/UIM Protection is disabled by default. Please note that if you enter invalid PIN 3 times, the SIM/UIM card will be locked automatically. You can only unlock it by entering the PUK code from the PC/laptop."
				},
				{
					type: "name",
					title: "Message",
					content: "Displays the PIN infomation of the SIM/UIM card  if the PIN Protection is enabled."
				},
				{
					type: "name",
					title: "Set the Dial Number, APN, Username and Password manually",
					content: "If the ISP is not listed in the <strong>Mobile ISP</strong> list, select this checkbox and enter the Dial Number, APN (Access Point Name), Username and Password that are provided by the ISP."
				},
				{
					type: "name",
					title: "Dial Number",
					content: "Enter the Dial Number provided by the ISP."
				},
				{
					type: "name",
					title: "APN",
					content: "Enter the APN (Access Point Name) provided by the ISP."
				},
				{
					type: "name",
					title: "Username/Password",
					content: "Enter the User Name and Password provided by the ISP. These fields are case-sensitive."
				},
				{
					type: "name",
					title: "Connect on Demand",
					content: "In this mode, the Internet connection will be terminated automatically after a specified time of inactivity (Max Idle Time) has elapsed. The connection is re-established when you attempt to access the Internet again."
				},
				{
					type: "note",
					title: "Note",
					content: "Occasionally, the connection cannot be disconnected, althrough you specify the Max Idle Time, because some applications keep accessing the Internet in the back-end."
				},
				{
					type: "name",
					title: "Connect Automatically",
					content: "In this mode, the Internet connection reconnects automatically anytime it gets disconnected."
				},
				{
					type: "name",
					title: "Connect Manually",
					content: "In this mode, you can click the Connect or Disconnect button to control the Internet connection manually. This mode also supports the Max Idle Time function. Enter a maximum time (in minutes) the Internet connection can be inactive before it is terminated into the Max Idle Time field. The default value is 15 minutes. If you want the Internet connection remains active at all time, enter 0 (zero)."
				},
				{
					type: "note",
					title: "Note",
					content: "Occasionally, the connection cannot be disconnected, althrough you specify the Max Idle Time, because some applications keep accessing the Internet in the back-end."
				},
				{
					type: "name",
					title: "Authentication Type",
					content: "Select an authentication type. The default is Auto. Some ISPs require a specific authentication type, please confirm it with the ISP or keep the default settings."
				},
				{
					type: "name",
					title: "Auto",
					content: "If Auto (default), the router automatically determines the authentication type used by the ISP."
				},
				{
					type: "name",
					title: "PAP",
					content: "If PAP (Password Authentication Protocol), the router authenticates with the peer using two handshakes.  Select this option if the ISP requires this authentication type."
				},
				{
					type: "name",
					title: "CHAP",
					content: "If CHAP (Challenge Handshake Authentication Protocol), the router authenticates with the peer using three handshakes and validates the peer's identify periodically. Select this option if the ISP requires this authentication type."
				},
				{
					type: "name",
					title: "MTU Size",
					content: "The default MTU (Maximum Transmission Unit) size is 1480 bytes. Do not change it unless required by the ISP."
				},
				{
					type: "name",
					title: "Use the Following DNS Servers",
					content: "If the ISP provides DNS server IP addresses, select this checkbox and enter the <strong>Primary DNS</strong> and Secondary DNS (optional) IP addresses below. Otherwise, the DNS servers will be assigned dynamically by the ISP."
				},
				{
					type: "name",
					title: "Primary DNS",
					content: "Enter the DNS IP address in dotted-decimal notation provided by the ISP."
				},
				{
					type: "name",
					title: "Secondary DNS",
					content: "(Optional) Enter another DNS IP address in dotted-decimal notation provided by the ISP."
				},
				{
					type: "paragraph",
					content: "Click the <strong>Save</strong> button to save the settings."
				}
			]
		},
		
		DISK_SETTING: {	
			TITLE: "Device Settings",
			CONTENT: [{
				type: "paragraph",
				content: "The Device Settings page displays the related information of any connected USB storage device via the USB port."
			},{
				type: "name",
				title: "Scan",
				content: "Usually, the router automatically detects any newly attached device. If not, click this button to scan for any new connected device and refresh the page with the updated information."
			},{
				type: "name",
				title: "Volume",
				content: "Displays the name of the USB volume."
			},{
				type: "name",
				title: "Capacity",
				content: "Displays the total storage capacity of the USB."
			},{
				type: "name",
				title: "Free Space",
				content: "Displays the current available free storage space."
			},{
				type: "name",
				title: "Safely Remove",
				content: "Click this button to safely unmount the USB storage device before physically disconnecting it from the router."
			},{
				type: "paragraph",
				content: "Remove button only appears when the USB storage device is connected to the router. When the current volume is busy, you are unable to unmount."
			},{
				type: "name",
				title: "Status",
				content: "This table only appears when there is a USB storage device connected to the router. Select to enable file sharing of the USB device."
			},{
				type: "step",
				title: "To set up a file server",
				content: [
				"1. Attach the USB storage device to the USB port of the router using a USB cable.",
				"2. The newly attached USB device should be automatically detected by the router and displayed the information under the Device Settings section. If not, click Scan.",
				"3. If you do not want to share the USB storage device, click the light bulb to disable it."
				]
			}]
		},
		
		FOLDER_SHARE_ACCOUNT: {	
			TITLE: "Sharing Account",
			CONTENT: [{
				type: "name",
				title: "Account",
				content: "You can either select to Use Default Account to login to the shared files and folders or Use New Account and enter the following to create a new user account."
			},{
				type: "name",
				title: "Username/Password",
				content: "Enter a username between 1 and 15 alphanumeric or under line string of characters and a password between 1 and 15 ASCII characters. These fields are case-sensitive."
			},{
				type: "name",
				title: "Confirm Password",
				content: "Re-enter the password to confirm there is no typo. This field is also case-sensitive."
			},{
				type: "paragraph",
				content: "Click Save to save all the settings."
			}]
		},
		
		FOLDER_SHARE_SETTINGS: {
			TITLE: "Sharing Settings",
			CONTENT: [{
				type: "name",
				title: "Network/Media Server Name",
				content: "Displays the name used to access the connected USB storage device."
			},{
				type: "name",
				title: "Enable",
				content: "Select to enable the access method."
			},{
				type: "name",
				title: "Access Method",
				content: "There are three access methods to allow access to the connected USB storage device. You can choose one or more access methods by selecting the corresponding checkbox.",
				children: [{
					type: "name",
					title: "Network Neighborhood",
					content: "If enabled, users on the network can access the USB storage device using an assigned IP address (e.g. \\\\192.168.0.1)."
				},{
					type: "name",
					title: "FTP",
					content: "If enabled, the FTP clients on the local network can access the USB storage device using the assigned IP address, followed by the FTP server's port number (e.g. ftp://192.168.0.1:21)."
				},{
					type: "name",
					title: "FTP (Via Internet)",
					content: "If enabled, users can remotely access the USB storage drive through FTP over the Internet. This feature supports both downloading and uploading files. To change FTP server's port number, enter a port number and click Save to apply the changes."
				}]
			},{
				type: "name",
				title: "Link",
				content: "Displays the address used to access the shared USB storage device."
			},{
				type: "name",
				title: "Port",
				content: "Displays the port number of the FTP server. Use the default value 21 or a value between 1024 and 65535."
			},{
				type: "paragraph",
				content: "Click Save to save all the settings."
			}]
		},
		
		FOLDER_SHARE_FOLDERS: {
			TITLE: "Folder Sharing",
			CONTENT: [{
				type: "name",
				title: "Share All",
				content: "Toggle On to share all files and folders or Off to only share the selected folders."
			},{
				type: "name",
				title: "Enable Authentication",
				content: "It is strongly recommended to enable authentication to require users to enter the valid username and password to access the sharing folders."
			},{
				type: "name",
				title: "Folder Name",
				content: "Displays the name of the shared folder."
			},{
				type: "name",
				title: "Folder Path",
				content: "Displays the path to the shared folder."
			},{
				type: "name",
				title: "Media Sharing",
				content: "Indicates whether the shared folder is allowed for media sharing or not."
			},{
				type: "name",
				title: "Volume Name",
				content: "Displays the name of the shared volume."
			},{
				type: "name",
				title: "Status",
				content: "Displays the status of the shared folder by the light bulb indicator."
			},{
				type: "name",
				title: "Modify",
				content: "Displays options to Modify or Delete the corresponding shared folder."
			},{
				type: "name",
				title: "Browse",
				content: "Click to search for a sharing folder."
			},{
				type: "name",
				title: "Allow Guest Network Access",
				content: "Select to allow clients on Guest Network to access the shared folders."
			},{
				type: "name",
				title: "Enable Authentication",
				content: "Select to require users to access the shared folders with a valid username and password."
			},{
				type: "name",
				title: "Enable Write Access",
				content: "Select to allow users to make changes to the folder content."
			},{
				type: "name",
				title: "Enable Media Sharing",
				content: "Select to enable media sharing."
			},{
				type: "name",
				title:"Refresh",
				content: "Click to update the sharing folder list."
			}]
		},
		
		PRINT_SERVER: {	
			TITLE: "Printer Server",
			CONTENT: [{
				type: "name",
				title:"Printer Server",
				content: "Toggle On to enable the Printer Server function."
			},{
				type: "name",
				title:"Printer Name",
				content: "Displays the name of the printer connected to the router."
			}]
		},
      	TIME_MACHINE :{
                TITLE:"Time Machine",
                CONTENT: [{
                	type: "paragraph",
                	content: "Time Machine backs up all files on your Mac computer to a USB storage device connected to your modem router."
                },{
                	type: "name",
                	title: "Enable ",
                	content: "Select this checkbox to enable the Time Machine function."
                },{
					type: "name",
					title: "Backup Disk",
					content: "Select a location for Time Machine backups."
				},{
					type: "name",
					title: "Size Limit for Backups",
					content: "Allocate how much disk space can be used for Time Machine backups. 0 means no limit for the space."
				},{
					type: "name",
					title: "Save",
					content: "Click to save your settings."
				}]
		},
		OFFLINE_DOWNLOAD: {	
			TITLE: "Offline Download",
			CONTENT: [{
				type: "paragraph",
				content: "With Offline Download enabled, the router can download files without keeping the computer powered on all the time."
			},{
				type: "name",
				title:"Status",
				content: "Toggle On to enable the Offline Download feature."
			},{
				type: "name",
				title:"Folder Path",
				content: "Select a directory path to store or cache the downloads.",
				children:[
			{
				type: "note",
				title: "Note",
				content: "Don't change the directory path or unmount the USB storage device when uploading and downloading files; otherwise some fatal errors may occur."
			}]
			},{
				type: "name",
				title:"Schedule",
				content: "Select the checkbox to enable the Schedule feature that allows you to specify the time period(s) to download/upload files."

			},{
				type: "name",
				title:"Keep Uploading After Task Completes",
				content: "Select the checkbox to keep uploading data of the completed download(s) to others."
			},{
				type: "name",
				title:"Maximum Number of Active Downloads",
				content: "Enter a value between 1 and 10 to set the maximum number of active downloads. The default value is 5."
			}]
		},
		
		OFFLINE_DOWNLOAD_ITEMS: {
			TITLE: "Downloads",
			CONTENT: [{
				type: "note",
				title: "File",
				content: "Displays the name and type of the download file."
			},{
				type: "note",
				title: "Speed",
				content: "Displays the current download (or upload) speed."
			},{
				type: "note",
				title: "Completed",
				content: "Displays the progress of the download."
			},{
				type: "note",
				title: "Remaining Time",
				content: "Displays the remaining time of the download."
			},{
				type: "note",
				title: "Connected Peers",
				content: "Displays the number of connected peers of the download."
			},{
				type: "note",
				title: "Status",
				content: "Displays the current status of the download (downloading, waiting, seeding, paused, completed, or error)."
			},{
				type: "name",
				title:"To add a new download",
				children: [{
					type: "step",
					title: "",
					content:[
					"1. Click Add.",
					"2. Select the source of download, torrent from PC, torrent from USB, or URL.",
					"3. Select the torrent location for BT, or enter the URL for FTP, HTTP and aMule.",
					"4. Click Save.",
					"5. For aMule, specify the aMule server IP address and port under Advanced > aMule Server."]
					}]

			},{
				type: "name",
				title:"To delete downloads",
				content: "Select the corresponding checkbox of the download(s) that you want to delete, and then click Delete above the table."
			},{
				type: "name",
				title:"To pause downloads",
				content: "Click the corresponding checkbox of the download(s) that you want to pause, and then click Pause above the table."
			},{
				type: "name",
				title:"To resume downloads",
				content: "Click the corresponding checkbox of the download(s) that you want to resume, and then click Resume above the table."
			}]
		},
		
		OFFLINE_DOWNLOAD_ADVANCED: {
			TITLE: "Advanced",
			CONTENT: [{
				type: "name",
				title:"Speed Limits",
				content: "Specify the maximum download and upload speed for the Internet connection."
			},{
				type: "name",
				title:"Maximum Download Speed",
				content: "Enter a value between 1 and 100000 kB/s to set the maximum download speed. The default value is 1024."
			},{
				type: "name",
				title:"Maximum Upload Speed",
				content: "Enter a value between 1 and 100000 kB/s to set the maximum upload speed. The default value is 512."
			},{
				type: "name",
				title:"Number of Connections",
				content: "Specify the maximum number of connections."
			},{
				type: "name",
				title:"Global Maximum Number of Connections",
				content: "Enter a value between 1 and 200 to set the global maximum number of connections. The default value is 100."
			},{
				type: "name",
				title:"Maximum Number of Connected Peers per Torrent",
				content: "Enter a value between 1 and 100 to set the maximum number of connected peers per torrent. The default value is 50."
			},{
				type: "name",
				title:"Enable DHT Network",
				content: "Enable this feature to improve efficiency to find peers so that you can increase the download speed."
			},{
				type: "name",
				title:"Enable Peer Exchange",
				content: "Enable this feature to improve the communication efficiency among the group of peers  so that you can increase the download speed."
			},{
				type: "name",
				title:"Enable BitTorrent Protocol Encryption",
				content: "Enable this feature to strengthen privacy and confidentiality during the process of data transmission."
			},{
				type: "name",
				title:"aMule Server",
				content: "Enter the IP address and port of the aMule server. The aMule download works only when the router is connected to the server."
			}]
		},
		PARENTAL_CONTROL: {	
			TITLE: "Parental Controls",
			CONTENT: [{
				type: "paragraph",
				content: "With Parental Controls, you can block inappropriate, explicit and malicious websites; restrict access by certain times of day (for example, Facebook or YouTube during homework time)."
			}]
		},
		
		PARENTAL_CONTROL_DEVICES: {
			TITLE: "Devices Under Parental Controls",
			CONTENT: [{
				type: "paragraph",
				content: "This table displays the information and settings of the devices that are currently restricted by Parental Controls.",
			},{
				type: "step",
				title: "To restrict a new client device",
				content: [
					"1. Toggle On Parental Controls.",
					"2. Click Add.",
					"3. Click Scan to choose a currently connected device from the Access Devices List; or enter the Device Name and MAC Address manually to add a device that is not connected.",
					"4. Click the Effective Time icon to specify a time period during which the restriction applies.",
					"5. Enter a brief description into the Description field. This field is optional.",
					"6. Select Enable This Entry.",
					"7. Click Save."
				]
			},{
				type: "note",
				title: "Note",
				content: "If you want to disable this entry, click the Bulb icon."
			}]
		},
		
		PARENTAL_CONTROL_RESTRICTION: {
			TITLE: "Content Restriction",
			CONTENT: [{
				type: "paragraph",
				content: "Content Restriction allows you to restrict access to specific websites using keywords and domain names. The client devices being controlled by Parental Controls can or cannot access these websites depending on the restriction policy you select.",
			},{
				type: "step",
				title: "To specify the content to access",
				content: [
					"1. Toggle On Content Restriction.",
					"2. Select the Restriction Policy according to the needs:",
					"A. If you want the controlled devices to have access to all websites except certain ones, select Blacklist.",
					"B. If you want the controlled devices to only have access to certain websites, select Whitelist.",
					"3. Click Add a New Keyword to add a web address keyword (for example, wikipedia) or domain name to the Blacklist or to the Whitelist.",
					"4. Click Save."

				]
			}]
		},
		
		
		QOS: {
			TITLE: "QoS",
			CONTENT: [{
				type: "paragraph",
				content: "The QoS (Quality of Service) helps to prioritize the Internet traffic based on the needs. You can specify the priority level for a device, a physical port, or an application in the QoS rules list."
			},{
				type: "note",
				title: "Note",
				id:"qos-boost",
				content: "If NAT Boost is enabled, QoS should be disabled."				
			},{
				type: "name",
				title: "Upload Bandwidth",
				content: "Enter the maximum upload bandwidth provided by the ISP."				
			},{
				type: "name",
				title: "Download Bandwidth",
				content: "Enter the maximum download bandwidth provided by the ISP."
			}]
		},
		QOS_ADV: {
			TITLE: "Advanced",
			CONTENT: [{
				type: "name",
				title: "High/Middle/Low Priority",
				content: "Specify a percentage for the high/middle/low priority traffic.",
				children:[				
				{
				type: "note",
				title: "Note",
				content: "The maximum amount (percentage) of all priorities is 100%."
				}
			]}
			]
		},
		
		QOS_RULE: {
			TITLE: "QoS Rule List",
			CONTENT: [{
				type: "paragraph",
				content: "Here you can add detailed QoS rules to proritize the Internet traffic."
			},{
				type: "step",
				title: "To set up a QoS rule",
				content: [
					"1. Click Add.",
					"2. Select a priority type to add the QoS rule.",
					"By Device - Click Scan to select the desired device, or manually enter a device name and its MAC address.",
					"By Application - Select the desired application or customize an application by configuring the name, protocol and destination port (1-65535).  You can enter a single port or multiple ports or port range, separated by commas (e.g. 21,36-105,111).",
					"By Physical Port - Select your desired port.",
					"3. Click Save."
				]
			},{
				type: "note",
				title: "Note",
				content: "You can drag a rule among different priority lists to change its priority."
			}]
		},
		
		
		QOS_DATABASE: {
			TITLE: "Database Upgrade",
			CONTENT: [{
				type: "paragraph",
				content: "We will release the latest database version on www.tp-link.com. You can download and update the router's database to extend its supported applications."
			},{
				type: "name",
				title: "New Database File",
				content: "Click Browse to locate the latest database file. Select it and click Upgrade to upgrade the database to the latest version."
			}]
		},
		
		
		
		SECURITY_FIREWALL: {	
			TITLE: "Firewall",
			CONTENT: [{
				type: "name",
				title: "SPI Firewall",
				content: "SPI (Stateful Packet Inspection) Firewall prevents cyber attacks and validates the traffic that is passing through the router based on the protocol. By default, this feature is enabled."
			}]
		},
		
		SECURITY_DOS: {
			TITLE: "DoS Protection",
			CONTENT: [{
				type: "name",
				title: "DoS Protection",
				content: "DoS (Denial of Service) Protection protects the LAN against DoS attacks from flooding the network with server requests. You can filter the following three kinds of attacks according to the needs. There are four levels for each filtering:",
				children: [{
					type: "name",
					title: "Off",
					content: "No protection."
				},{
					type: "name",
					title: "Low",
					content: "Low-level of protection and low impact on router performance."
				},{
					type: "name",
					title: "Middle",
					content: "Moderate-level of protection and semi-noticeable impact on router performance."
				},{
					type: "name",
					title: "High",
					content: "High-level of protection but a noticeable impact on router performance."
				}]
			},{
				type: "name",
				title: "ICMP-FLOOD Attack Filtering",
				content: "Enable to prevent the ICMP (Internet Control Message Protocol) flood attack."
			},{
				type: "name",
				title: "UDP-FLOOD Attack Filtering",
				content: "Enable to prevent the UDP (User Datagram Protocol) flood attack."
			},{
				type: "name",
				title: "TCP-SYN-FLOOD Attack Filtering",
				content: "Enable to prevent the TCP-SYN (Transmission Control Protocol-Synchronize) flood attack."
			},{
				type: "name",
				title: "Ignore Ping Packet from WAN Port",
				content: "Enable to ignore ping packets from the WAN port."
			},{
				type: "name",
				title: "Forbid Ping Packet from LAN Port",
				content: "Enable to forbid ping packets from the LAN port."
			}]
		},
		
		SECURITY_LIST: {
			TITLE: "Blocked DoS Host List",
			CONTENT: [{
				type: "paragraph",
				content: "This table displays the IP address and MAC address of the blocked DoS host(s)."
			}]
		},
		
		ACCESS_CONTROL: {	
			TITLE: "Access Control",
			CONTENT: [{
				type: "paragraph",
				content: "Access Control is used to allow or block specific client devices from accessing the network. When a device is blocked, it is unable to communicate with other devices or connect to the Internet."
			},{
				type: "step",
				title: "To control access",
				content: [
					"1. Toggle On to enable Access Control.",
					"2. If you also want to control access of the devices connected to Guest Network, toggle On Guest Devices Control.",
					"3. Select an access mode according to the needs and click Save:",
					"A. If you want to block access from the devices in the list below, select Blacklist.",
					"B. If you want to allow access only from the devices in the list below, select Whitelist.",
					"4. In Devices in Blacklist/Whitelist section, click Add. Enter the Device Name and MAC Address of the device. Click Save."
				]
			},{
				type: "note",
				title: "Note",
				content: "If you want to disable this entry, click the Bulb icon."
			}]
		},
		
		
		ACCESS_DEVICE: {
			TITLE: "Online Devices",
			CONTENT: [{
				type: "paragraph",
				content: "This table displays the information of all connected devices (including devices connected to the Guest Network if Guest Devices Control is enabled)."
			}],
		},
		IPMAC_BIND_SETTING: {	
			TITLE: "IP & MAC Binding",
			CONTENT: [{
				type: "paragraph",
				content: "IP & MAC Binding (also known as ARP Binding) is useful for controlling access of a specific device in the LAN by binding the IP address and the MAC address of the device together. IP & MAC binding also prevents other devices from using a specific IP address."
			},{
				type: "step",
				title: "To set up a device with IP & MAC Binding",
				content: [
					"1. Click Add.",
					"2. Enter the MAC Address of the device.",
					"3. Enter an IP Address that you want to bind to the above MAC address.",
					"4. Select Enable This Entry.",
					"5. Click Save."
				]
			},{
				type: "note",
				title: "Note",
				content: [
					"1. You cannot bind the same IP address to more than one MAC address.",
				    "2. If you want to disable this entry, click the Bulb icon."
				]
			}]
		},
		
		IPMAC_BIND_ARP: {	
			TITLE: "ARP List",
			CONTENT: [{
				type: "paragraph",
				content: "This table displays the MAC address and IP address of the currently connected device(s)."
			}]
		},
		
		
		IPV6: {
			TITLE: "Internet",
			CONTENT: [{
				type: "name",
				title: "IPv6",
				content: "IPv6 (Internet Protocol version 6) is the most recent version of the IP (Internet Protocol) and deals with the problem of IPv4 (Internet Protocol version 4) address exhaustion."
			},{
				type: "title",
				title: "Internet Connection Type: Dynamic IP",
			},{
				type: "name",
				title: "Dynamic IP",
				content: "Select this type if the ISP uses Dynamic IPv6 address assignment."
			},{
				type: "name",
				title: "IPv6 Address/Primary DNS/Secondary DNS",
				content: "These parameters are automatically assigned by the DHCPv6 server from the ISP."
			},{
				type: "name",
				title: "Renew",
				content: "Click to get new IPv6 parameters from the DHCPv6 server of the ISP."
			},{
				type: "name",
				title: "Release",
				content: "Click to release all IPv6 addresses assigned by the DHCPv6 server from the ISP."
			},{
				type: "name",
				title: "Get IPv6 Address",
				content: "Select DHCPv6 to get a non-temporary IPv6 address or SLAAC to get an IPv6 address generated from the router advertisement packet, according to the ISP."
			},{
				type: "name",
				title: "Prefix Delegation",
				content: "Select Enable to get a prefix delegation by DHCPv6 Server from the ISP, or Disable to designate an address prefix manually. Clients in LAN will generate an IPv6 address with this prefix."
			},{
				type: "name",
				title: "DNS Address",
				content: "Select Get Dynamically from ISP or Use the Following DNS Addresses. If Use the Following DNS Addresses is selected, please manually enter the DNS address provided by the ISP."
			},{
				type: "title",
				title: "Internet Connection Type: Static IP",
			},{
				type: "name",
				title: "Static IP",
				content: "Select this type if the ISP uses Static IPv6 address assignment."
			},{
				type: "name",
				title: "IPv6 Address/Default Gateway/Primary DNS/Secondary DNS",
				content: "Enter these parameters as provided by the ISP."
			},{
				type: "name",
				title: "MTU Size",
				content: "The default and typical MTU (Maximum Transmission Unit) size for most Ethernet networks is 1500 Bytes. It is NOT recommended to change the default MTU size unless required by the ISP."
			},{
				type: "title",
				title: "Internet Connection Type: 6to4 Tunnel"
			},{
				type: "name",
				title: "6to4 Tunnel",
				content: "Select this type if the ISP uses 6to4 deployment for assigning address."
			},{
				type: "name",
				title: "IPv4 Address/IPv4 Subnet Mask/IPv4 Default Gateway/Tunnel Address",
				content: "These parameters will be dynamically generated by the IPv4 information of WAN port after you click Connect."
			},{
				type: "name",
				title: "Use the Following DNS Server",
				content: "Select to manually enter the primary DNS and/or secondary DNS as provided by the ISP."
			},{
				type: "name",
				title: "Connect",
				content: "Click to connect to the Internet."
			},{
				type: "name",
				title: "Disconnect",
				content: "Click to disconnect from the Internet."
			},{
				type: "title",
				title: "Internet Connection Type: PPPoE"
			},{
				type: "name",
				title: "PPPoE",
				content: "Select this type if the ISP uses PPPoEv6, and provides a username and password."
			},{
				type: "name",
				title: "Username/Password",
				content: "Enter these parameters as provided by the ISP."
			},{
				type: "name",
				title: "IPv6 Address",
				content: "This address will be automatically assigned by the DHCPv6 server from the ISP, after you enter the username and password and click Connect."
			},{
				type: "name",
				title: "Get IPv6 Address",
				content: "Select DHCPv6 to get a non-temporary IPv6 address, or SLAAC to get an IPv6 address generate from the router advertisement packet, or Specified by ISP to manually enter the IPv6 address, according to the ISP."
			},{
				type: "name",
				title: "Prefix Delegation",
				content: "Select Enable to get a prefix delegation by DHCPv6 Server from the ISP, or Disable to designate an address prefix manually. Clients in LAN will generate an IPv6 address with this prefix."
			},{
				type: "name",
				title: "DNS Address",
				content: "Select to Get Dynamically from ISP or Use the Following DNS Addresses. If Use the Following DNS Addresses is selected, please manually enter the DNS address provided by the ISP."
			},{
				type: "name",
				title: "Connect",
				content: "Click to connect to the Internet."
			},{
				type: "name",
				title: "Disconnect",
				content: "Click to disconnect from the Internet."
			}/*,{
				type: "title",
				title: "Internet Connection Type: 6RD"
			},{
				type: "name",
				title: "6RD",
				content: "Select this type if the ISP uses 6RD deployment and provides an IPv4 address and IPv6 address prefixes."
			},{
				type: "name",
				title: "Configuration Type",
				content: "Select Auto or Manual for configuring the 6RD channel parameters according to the ISP. If the default parameters below coincide with those provided by the ISP, you can select Auto; otherwise, select Manual and enter the parameters as provided by the ISP."
			},{
				type: "name",
				title: "IPv4 Mask Length/6RD Prefix/6RD Prefix Length/Border Reply IPv4 Address",
				content: "Check if the preset parameters coincide with those provided by the ISP. You can either keep the defaults or manually enter the parameters as provided by the ISP."
			},{
				type: "title",
				title: "Internet Connection Type: DS-Lite"
			},{
				type: "name",
				title: "DS-Lite",
				content: "Select this type if your ISP uses DS-Lite deployment and provides an IPv6 address for setting up an IPv4-in-IPv6 tunnel in the IPv6 network to communicate IPv4 traffics or IPv6 traffics in their own respective network."
			},{
				type: "name",
				title: "Secondary Connection",
				content: "Select the secondary connection type as provided by the ISP.",
				children :[ 
				{
					type: "name",
					title: "Dynamic IP",
					content: "Select if the ISP provides Dynamic IP as the secondary connection type and the parameters, IPv6 Address, primary DNS and/or secondary DNS will be automatically assigned by the DHCPv6 server from the ISP.",
					children:[
						{
							type:"name",
							title:"Renew",
							content:"Click to get new IPv6 parameters from the DHCPv6 server from the ISP."
						},
						{
							type:"name",
							title:"Release",
							content:"Click to release all IPv6 addresses assigned by the DHCPv6 server from the ISP."
						},
						{
							type:"name",
							title:"Get IPv6 Address",
							content:"Select DHCPv6 to get a non-temporary IPv6 address or SLAAC to get an IPv6 address generated from the router advertisement packet, according to your ISP."
						},
						{
							type:"name",
							title:"Prefix Delegation",
							content:"Select Enable to get a prefix delegation by DHCPv6 Server from the ISP, or Disable to designate an address prefix manually. Clients in LAN will generate an IPv6 address with this prefix."
						},
						{
							type:"name",
							title:"DNS Address",
							content:"Select Get Dynamically from ISP or Use the Following DNS Addresses. If Use the Following DNS Addresses is selected, please manually enter the DNS addresses provided by your ISP."
						}
					]
				},
				{
					type: "name",
					title: "Static IP",
					content: "Select if the ISP provides Static IP as the secondary connection type and enter the IPv6 Address, default gateway, primary DNS and/or secondary DNS as provided by the ISP, then configure the MTU size manually (if required) or keep the default value."
				},{
					type: "name",
					title: "PPPoE",
					content: "Select if the ISP provides PPPoE as the secondary connection type and enter the username and password as provided by the ISP. The IPv6 address will be automatically assigned after you click Connect.",
					children:[
						{
							type:"name",
							title:"Get IPv6 Address",
							content:"Select DHCPv6 to get a non-temporary IPv6 address or SLAAC to get an IPv6 address generated from the router advertisement packet, according to your ISP."
						},
						{
							type:"name",
							title:"Prefix Delegation",
							content:"Select Enable to get a prefix delegation by DHCPv6 Server from the ISP, or Disable to designate an address prefix manually. Clients in LAN will generate an IPv6 address with this prefix."
						},
						{
							type:"name",
							title:"DNS Address",
							content:"Select Get Dynamically from ISP or Use the Following DNS Addresses. If Use the Following DNS Addresses is selected, please manually enter the DNS addresses provided by your ISP."
						},
						{
							type:"name",
							title:"Connect",
							content:"Click to connect to the Internet."
						},
						{
							type:"name",
							title:"Disconnect",
							content:"Click to disconnect from the Internet."
						}
					]
				}]
			}*/,{
				type: "title",
				title: "Internet Connection Type: Pass-Through (Bridge)"
			},{
				type: "paragraph",
				content: "Select this type if the ISP uses Pass-Through (Bridge) network deployment. No configuration is required for this type of connection."
			}]
		},
		
		IPV6_LAN: {
			TITLE: "LAN",
			CONTENT: [{
				type: "paragraph",
				content: "Except for the Internet Connection type Pass-Through (Bridge), the other types of Internet connection require the IPv6 configuration."
			},{
				type: "name",
				title: "Assigned Type",
				content: "Select the appropriate one according to the ISP.",
				children: [{
					type: "name",
					title: "DHCPv6",
					content: "To automatically assign IP addresses to the clients in the LAN.",
					children: [{
						type: "name",
						title: "Address Prefix",
						content: "Enter the address prefix as provided by the ISP."
					},{
						type: "name",
						title: "Release Time",
						content: "It is the valid time of the assigned IP address. Either keep the default 86400 seconds or change it if required by the ISP."
					},{
						type: "name",
						title: "Address",
						content: "It is the IP address assigned automatically by the DHCPv6 server from the ISP."
					}]
				},{
					type: "name",
					title: "SLAAC+Stateless DHCP",
					connector:" ",
					children: [{
						type: "name",
						title: "Address Prefix",
						content: "Enter the address prefix as provided by the ISP."
					},{
						type: "name",
						title: "Address",
						content: "It is the IP address automatically assigned by the ISP."
					}]
				},{
					type: "name",
					title: "SLAAC+RDNSS",
					connector:" ",
					children: [{
						type: "name",
						title: "Address Prefix",
						content: "Enter the address prefix as provided by the ISP."
					},{
						type: "name",
						title: "Address",
						content: "It is the IP address automatically assigned by the ISP."
					}]
				}]
			}]
		},
		
		IPV6_MAC_CLONE: {
			TITLE: "MAC Clone",
			CONTENT: [{
				type: "paragraph",
				content: "Select the appropriate MAC Clone method as you need."
			},{
				type: "name",
				title: "Do NOT Clone MAC Address",
				content: "Do NOT change the default MAC address of the router, in case the ISP does not bind the assigned IP address to the MAC address."
			},{
				type: "name",
				title: "Clone Current Computer MAC Address",
				content: "Select to copy the current MAC address of the computer that is connected to the router, in case the ISP binds the assigned IP address to the computer's MAC address."
			},{
				type: "name",
				title: "Use Custom MAC Address",
				content: "Enter the MAC address manually, in case the ISP binds the assigned IP address to the specific MAC address."
			}]
		},
		
		TIME_SETTING: {	
			TITLE: "Time Settings",
			CONTENT: [{
				type: "paragraph",
				content: "Time Settings allows you to configure the system time for the router. Once modified, the system time will be applied to time-based functions and configurations such as Parental Controls."
			},{
				type: "note",
				title: "Note",
				content: "You can toggle on to enable 24-Hour Time feature before configuration, which will be applied to system-time-based functions and configurations."
			},{
				type:"title",
				title: "System Time"
			},{
				type: "step",
				title: "To get time from the Internet",
				content: [
					"Selected by default, Get from the Internet allows you to get the system time from the Internet.",
					"1. Select Get from the Internet.",
					"2. Select the local Time Zone from the drop-down menu.",
					"3. In the NTP Server I field, enter the IP address or domain name of the desired NTP Server.",
					"4. In the NTP Server II field, enter the IP address or domain name of the second NTP Server. (Optional)",
					"5. Click Obtain.",
					"6. Click Save."
				]
			},{
				type: "step",
				title: "To get time from PC",
				content: [
					"This feature allows you to get the system time from the PC. Please confirm the PC time before configuration.",
					"Select Get from PC and Click Save."
				]
			},{
				type: "step",
				title: "To manually set time",
				content: [
					"If the device cannot automatically obtain time from the Internet or PC, you can manually configure the system time.",
					"1. Select Manually.",
					"2. Enter the current Date and Time.",
					"3. Click Save."
				]
			}]
		},
		
		TIME_SETTING_DAYLIGHT: {	
			CONTENT: [{
				type: "title",
				title: "Daylight Saving Time",
				content: "This feature can automatically synchronize the system time with daylight saving time."
			},{
				type: "step",
				title: "To set up Daylight Saving Time",
				content: [
					"1. Select Enable Daylight Saving Time.",
					"2. Specify a time period of the daylight saving time in the local time zone.",
					"3. Click Save."
				]
			}]
		},
		DIGNOSTIC: {	
			TITLE: "Diagnostics",
			CONTENT: [{
				type: "paragraph",
				content: "The router provides Ping and Traceroute tools to help you troubleshoot network problems."
			},{
				type: "title",
				title: "Ping & Traceroute"
			},{
				type: "paragraph",
				content: "The Ping tool sends packets to a target IP address or domain name and logs the results, such as the number of packets sent and received, and the round-trip time."
			},{
				type: "paragraph",
				content: "The Traceroute tool sends packets to a target IP address or domain name and displays the number of hops and time to reach the destination."
			},{
				type: "paragraph",
				content: "You can ping or traceroute a local device by the IP address or a domain name, such as tp-link.com, yahoo.com, etc."
			},{
				type: "step",
				title: "To diagnose using Ping",
				content: [
					"1. Select Ping as the Diagnostic Tool.",
					"2. Enter the target IP Address or Domain Name.",
					"3. Click the Arrow Icon to open the Advanced menu and specify the Ping Count, and Ping Packet Size. (Optional)",
					"4. Click Start."
				]
			},{
				type: "step",
				title: "To diagnose using Traceroute",
				content: [
					"1. Select Traceroute as the Diagnostic Tool.",
					"2. Enter the target IP Address or Domain Name.",
					"3. Click the Arrow Icon to open the Advanced menu and specify the number of hops (to be reached) in the Traceroute Max TTL (Time to Live) field. The default is 20. (Optional)",
					"4. Click Start."
				]
			}]
		},
		PORT_MIRROR:{
			CONTENT: [{
				type: "title",
				title: "Port Mirroring"
			},{
				type: "paragraph",
				content: "Port Mirroring refers to the process of forwarding copies of packets from a mirrored port to a mirroring port. Usually, the mirroring port is connected to a data diagnose device, which is used to analyze the mirrored packets for monitoring and troubleshooting the network."
			},{
				type: "step",
				title: "To forward copies of packets to the designated port",
				content: [
					"1. Enable Port Mirroring.",
					"2. Select the desired ports as the mirrored ports.",
					"3. Select a desired port as the mirroring port.",
					"4. Click Save."
				]
			},{
				type: "note",
				title: "Note",
				content: "A port cannot be set as the mirrored port and the mirroring port simultaneously."
			}]			
		},
		FIRMWARE:{	
			TITLE: "Firmware Upgrade",
			CONTENT: [{
				type: "paragraph",
				content: "Firmware Upgrade updates the router's firmware with new features or bug fixes. It's recommended to upgrade the router with the latest firmware file to have the best performance."
			},{
				type: "step",
				title: "Noticing the following will help you avoid upgrade failure:",
				content: [
					"Before upgrading",
					"1. Make sure that you have a stable connection between the router and the computer. It's NOT recommended to upgrade the firmware wirelessly.",
					"2. Make sure that you have removed all USB devices connected to the router.",
					"3. Remember to back up the router's configuration file.",
					"While upgrading",
					"Keep the router POWERED ON until the upgrade completes."
				]
			}]
		},
		FIRMWARE_UPGRADE_ONLINE:{
			TITLE:"To upgrade the firmware online",
			CONTENT:[{
				type: "paragraph",
				content: [
					"Click Upgrade and confirm when prompted. The router will automatically download and upgrade to the latest firmware. You can also click Check for upgrade to check for the latest firmware version."
				]
			}]
		},
		FIRMWARE_UPGRADE: {
			TITLE:"To upgrade the firmware manually",
			CONTENT:[{
				type:"step",
				content: [
					"1. Click Support at the bottom of the page and download the latest firmware to the computer. Please make sure that the firmware file you are going to download matches with the router's hardware version as shown on the page.",
					"2. Click Browse and select the downloaded firmware file.",
					"3. Click Upgrade."]
			},{
				type: "paragraph",
				content: ["The firmware upgrade takes a few minutes to complete. The router will automatically reboot when the firmware upgrade is finished."]
			}]
		},
		
		BACKUP: {	
			TITLE: "Backup & Restore",
			CONTENT: [{
				type: "paragraph",
				content: "The Backup & Restore feature allows you to back up the router's current configuration for recovery, or simply restore the router to default settings."
			},{
				type: "note",
				title:"Note",
				content: "Please do NOT power off the router during the backup or restore process."
			},{
				type: "title",
				title: "Backup",
				content: "It's highly recommended to back up the current configuration, in case a recovery is needed to restore the router to its previous state."
			},{
				type: "step",
				title: "To back up current configuration",
				content: [
					"1. Click Backup.",
					"2. Wait for the router to back up the current configuration."
				]
			}]
		},
		RESTORE: {
			CONTENT: [{
				type: "title",
				title: "Restore",
				content:"You can restore the router to a previous status from a backup file."
			},{
				type: "step",
				title: "To restore from a backup",
				content: [
					"1. Click Browse.",
					"2. Locate and select the backup file.",
					"3. Click Restore."
				]
			}]
		},
		FACTORY: {
			CONTENT: [{
				type: "title",
				title: "Factory Default Restore",
				content: [
					"Factory restoring the router will remove all of your configurations and settings and return them to factory defaults. For example, all wireless, parental controls, and network information will be erased.",
                    "After a factory restore, you will have to set a new password to access the router's web management page."
				]
			}]
		},
		REBOOT:{
			TITLE: "Reboot Schedule",
			CONTENT: [{
				type: "paragraph",
				content: "The Reboot Schedule feature cleans the cache to enhance the running performance of the router. You can reboot the router manually or set it to reboot regularly."
			},{
				type: "step",
				title: "To reboot manually",
				content: [
					"Click Reboot and wait a few minutes for the router to restart."
				]
			},{
				type: "step",
				title: "To schedule the reboot time",
				content: [
					"1. Enable Reboot Schedule.",
					"2. Set when and how often the router reboots by specifying the parameters in the Reboot Time and Repeat fields.",
					"3. Click Save."
				]
			}]			
		},
		ADMIN_ACCOUNT: {	
			TITLE: "Administration",
			CONTENT: [{
				type: "paragraph",
				content: "Administration allows you to manage the login password and the access permission of the connected clients to the router."
			},{
				type: "name",
				title: "Account Management",
				content: "This feature allows you to change the password.",
				children:[{
					type: "step",
					title: "To change the password",
					content: [
						"1. Enter Old Password.",
						"2. Enter New Password.",
						"3. Confirm New Password.",
						"4. Click Save."
					]
                                }]
			}]
		},
		
		ADMIN_RECOVERY: {
			TITLE: "Password Recovery",
			CONTENT: [{
				type: "name",
				title: "Default Password Recovery",
				content: "Default Password Recovery allows you to recover the default login password without restoring the router to its factory default settings.",
				children:[{
					type: "step",
					title: "To change the password",
					content: [
						"1. Enable the Default Password Recovery feature.",
						"2. In the From field, enter a valid email address used for sending a vertification code for recovering login information.",
						"3. In the To field, enter a valid email address used for receiving the vertification code.",
						"4. Enter SMTP Server of the outgoing email (From).",
						"5. If the email in the From field requires encryption, you must select the Enable Authentication checkbox and enter its Username (email address) and Password.",
						"6. Click Save."
					]
                                 }]
			}]
		},
		
		ADMIN_LOCAL: {	
			TITLE: "Local Management",
			CONTENT: [{
				type: "paragraph",
				content: "This feature allows local devices to access and manage the router."
			},{
				type: "name",
				id: "local_management_https",
				title: "Local Management via HTTPS",
				content: "Enable Local Management via HTTPS if you want to access the router via both HTTPS and HTTP, or keep it disabled if you only want to access the router via HTTP."
			},{
				type: "name",
				title: "Access for All LAN Connected Devices",
				content: "Toggle On to enable local management for all LAN connected devices or Off to enable the management for a specific device."
			},{
				type: "name",
				title: "MAC Address",
				content: "Displays the MAC address of the limited access device."
			},{
				type: "name",
				title: "Description",
				content: "Displays the description of the limited access device."
			},{
				type: "name",
				title: "Status",
				content: "Displays the current status of the limited access device (enabled or disabled)."
			},{
				type: "name",
				title: "Modify",
				content: "Displays options to Modify and Delete the corresponding device from the list."
			},{
				type: "step",
				title: "To add a client device to the list",
				content: [
					"1. Click Add.",
					"2. Click View Existing Devices to choose an existing device or enter the MAC address of a device into the MAC Address field.",
					"3. Enter a Description for the device.",
					"4. Select Enable This Entry.",
					"5. Click OK."
				]
			},{
				type: "step",
				title: "To modify or delete a device in the list",
				content: "In the table, click the Edit icon or the Trash icon that corresponds to the device that you wish to modify or delete."
			},{
				type: "step",
				title: "To delete multiple devices",
				content: "Select all the devices that you wish to delete, click Delete."
			}]
		},
		ADMIN_REMOTE_WITHOUT_HTTPS: {	
			TITLE: "Remote Management",
			CONTENT: [{
				type: "name",
				title: "Remote Management",
				content: "The Remote Management feature allows remote devices to access and manage the router.",
				children:[{
					type: "step",
					title: "To forbid all remote devices to manage the router",
					content: "Select Disable Remote Management and click Save."
				},{
					type: "step",
					title: "To allow all remote devices to manage the router",
					content: [
						"1. Select Enable Remote Mangement for ALL Devices.",
						"2. Enter Web Management Port (1024-65535 or 80) through which the remote devices will access the router.",
						"3. Click Save."
					]
				},{
					type: "step",
					title: "To allow a specific remote device to manage the router",
					content: [
						"1. Select Enable Remote Mangement for a Specific Device.",
						"2. Enter Web Management Port (1024-65535 or 80) through which the remote device will access the router.",
						"3. Enter the Remote Management IP Address of the remote device to manage the router.",
						"4. Click Save."
					]
				}]
			}]
		},
		ADMIN_REMOTE: {	
			TITLE: "Remote Management",
			CONTENT: [{
				type: "paragraph",
				content: "The Remote Management feature allows you to access and configure the router remotely from the Internet."
			}, {
				type: "paragraph",
				content: "To set up Remote Management",
				id: "admin_remote_step_title"
			}, {
				type: "paragraph",
				content: "1. Select the checkbox to enable the Remote Management feature.",
				id: "admin_remote_step1"
			}, {
				type: "paragraph",
				content: "2. Keep the HTTPS Port and HTTP Port as the default settings.",
				id: "admin_remote_step2"
			}, {
				type: "paragraph",
				content: "3. Select to decide which remote device can access the router remotely:",
				children: [{
					type: "name",
					title: "All Devices",
					content: "All remote devices can access the router."
				}, {
					type: "name",
					title: "Specified Device",
					content: "Enter the IP Address of the remote device to access the router."
				}],
				id: "admin_remote_step3"
			}, {
				type: "paragraph",
				content: "4. Click Save.",
				id: "admin_remote_step4"
			}, {
				type: "paragraph",
				content: "Now you can remotely manage the router via the address displayed under Web Address for Management."
			}, {
				type: "note",
				title: "Note",
				content: "If a warning pops up when you visit the above address remotely, click Trust (or a similar option) to continue."
			}]
		},
		LED_CONTROL_SETTINGS:{
			TITLE: "LED Control",
			CONTENT: [{
				type: "paragraph",
				content: "Once Night Mode is enabled, the LEDs will be off during the specified period everyday without affecting the router's performance."
			},{
				type: "step",
				title: "To enable Night Mode",
				content: [
					"1. Select Enable Night Mode.",
					"2. Specify a time period when the LEDs will be off.",
					"3. Click Save."
				]
			}]
		},
		SYSTEM_LOG: {	
			TITLE: "System Log",
			CONTENT: [{
				type: "paragraph",
				content: "The System Log displays the most recent activities of the router. The table consists of the type, level and log content of the system logs which can be filtered to be viewed. You can also save the system logs to the local computer or send them to the email."
			},{
				type: "step",
				title: "To save system logs to the local computer",
				content: [
					"1. Set the Type and minimum level to filter the desired system logs. The Level list is in descending order, with the lowest level listed last.",
					"2. Click Save Log to save the system logs file to the local computer."
					]
			},{
				type: "step",
				title: "To receive system logs via email",
				content: [
					"1. Set the Type and Level to filter the desired system logs. The Level list is in descending order, with the lowest level listed last.",
					"2. Click Email Settings.",
					"3. In the From field, enter a valid email address to be used as the outgoing email.",
					"4. In the To field, enter a valid email address to be used as the incoming email.",
					"5. Enter the SMTP Server address of the outgoing email (From).",
					"Note:If the outgoing email requires authentication, select the Enable Authentication checkbox and enter its Username (email address) and Password.",
					"6. If you want to receive system logs via email regularly, select the Enable Auto Mail checkbox and set a specific time (in 24-hour clock format) or a time interval.",
					"If you want to immediately receive the current system logs, click Mail Log Now.",
					"7. Click Save."
				]
			}]
		},

		TRAFFIC_STATISTIC: {	
			TITLE: "Traffic Monitor",
			CONTENT: [{
				type: "paragraph",
				content: "Displays the traffic usage of a device in the past 10 minutes or that of all devices in the past 10 minutes/24 hours/7 days."
			}]
		},
		TRAFFIC_STATISTIC_LIST: {	
			TITLE: "Traffic Monitor List",
			CONTENT: [{
				type: "paragraph",
				content: "The list is grouped by the connection type of devices: wired or wireless."
			}]
		},
		
		SYSTEM_PARA_WIRELESS: {	
			TITLE: "System Parameter",
			CONTENT: [{
				type: "title",
				title: "2.4GHz/5GHz Wireless",
				id: "help_syspara_wifi_title",
				content: "This section allows you to configure the parameters of traffic transmission rules in wireless networks. It's recommended to keep the default settings if you are not sure of the proper ones in the case."
			},{
				type: "name",
				title: "Beacon Interval",
				content: "Enter a value between 40 and 1000 in milliseconds to determine the duration between beacon packets that are broadcasted by the router to synchronize the wireless network. The default is 100 milliseconds."
			},{
				type: "name",
				title: "RTS Threshold",
				content: "Enter a value between 1 and 2346 to determine the packet size of data transmission through the router. By default, the RTS (Request to Send) Threshold size is 2346. If the packet size is greater than the preset threshold, the router sends Request of Send frames to a particular receiving station and negotiates the sending of a data frame, or else the packet will be sent immediately."
			},{
				type: "name",
				title: "DTIM Interval",
				content: "This value determines the internal of DTIM (Delivery Traffic Indication Message). Enter a value between 1 and 15 internals. The default interval is 1, indicating the DTIM interval is the same as Beacon Interval."
			},{
				type: "name",
				title: "Group Key Update Period",
				content: "Enter the number of seconds (minimum 30) to control the time interval for the encryption key automatic renewal. The default is 0, indicating no key renewal."
			},{
				type: "name",
				title: "WMM Feature",
				content: "The WMM function guarantees the packets with high-priority messages being transmitted preferentially. It is enabled by default and highly recommended."
			},{
				type: "name",
				title: "Short GI Feature",
				content: "This function is enabled by default and recommended to increase the packet capacity by the GI (Guard Interval) time."
			},{
				type: "name",
				title: "AP Isolation Feature",
				content: "If you want to confine and restrict all wireless devices connected to the network from interacting with each other, but still able to access the Internet, select the Enable AP Isolation checkbox."
			}]
		},
		SYSTEM_PARA_WDS: {
			CONTENT: [{
				type: "title",
				title: "2.4GHz/5GHz WDS",
				id: "help_syspara_wds_title",
			},{
				type: "step",
				title: "To enable WDS",
				content: "WDS(Wireless Distribution System) Bridging feature allows you to extend the wireless network coverage by bridging with an AP (access point) in a wireless WLAN (local network).",
				},{
				type: "step",
				title: "",
				content:[ 
					"1. Select to enable the WDS Bridging feature.",
					"2. To bridge a network by Scan feature: click Scan to scan and display all available networks and select the network you want to bridge with. The SSID (network name), MAC Address, and Security will be automatically populated.",
					"Or to bridge a network manually: enter the SSID (network name), MAC Address and WDS Mode of the network to be bridged. Select a Security type and enter related parameters, which should be the same as the network to be bridged.",
					"3. Click Save."
				]
				},{
				type: "note",
				title: "Note",
				content: "If you are not sure of WDS Mode, keep the default option of Auto."
			}]
		},
		SYSTEM_PARA_WPS: {	
			CONTENT: [{
				type: "title",
				title:	"WPS",
				content: "WPS (Wi-Fi Protected Setup) allows you to easily connect the WPS-enabled devices to the router by pushing the WPS button. Check to enable the WPS feature and click Save."
			}]
		},
		SYSTEM_PARA_NAT: {
			CONTENT: [{
				type: "title",
				title: "NAT",
				content: "This feature is enabled by default. It's recommended to keep the default setting. If you disable it, you may have no access to the Internet."
			},{
				type: "note",
				title: "Note",
				content: "When NAT is disabled, NAT Forwarding will not take effect, neither will NAT Boost."
			},{
				type: "name",
				id:"sys_para_nat_boost",
				title: "NAT Boost",
				content: "Select the Enable NAT Boost checkbox and click Save to ensure that the router has the best throughput."
			},{
				type: "note",
				id:"sys_para_nat_boost_note",
				title: "Note",
				content: "When NAT Boost is enabled, QoS and Traffic Statistics will be disabled automatically."
			}]
		},
		SYSTEM_PARA_DOS: {
			CONTENT: [{
				type: "title",
				title: "DOS Protection Settings",
				content: "The DOS Protection protects the router from ICMP-FLOOD, UDP-FLOOD and TCP-FLOOD attacks."
			},{
				type: "name",
				title: "ICMP-FLOOD Packets Level",
				content: "Enter a value between 5 and 7200 to trigger the ICMP-FLOOD protection immediately when the number of ICMP packets exceeds the preset threshold value."
			},{
				type: "name",
				title: "UDP-FLOOD Packets Level",
				content: "Enter a value between 5 and 7200 UDP packets to trigger the UDP-FLOOD protection immediately when the number of UDP packets exceeds the present threshold value."
			},{
				type: "name",
				title: "TCP-FLOOD Packets Level",
				content: "Enter a value between 5 and 7200 TCP-SYN packets to trigger the TCP-SYN-FLOOD protection immediately when the number of TCP packets exceeds the present threshold value."
			}]
		},
		SYSTEM_PARA_DUPLEX: {
			CONTENT: [{
				type: "title",
				title: "Duplex",
				content: "Select the duplex type from the drop-down list and click Save."
			}]
		},
		SYSTEM_PARA_LED:{
			TITLE: "LED Control",
			CONTENT: [{
				type: "name",
				title: "Enable Night Mode",
				content: "Select this checkbox to turn off LEDs during Night Mode Period without affecting the router's performance."
			},{
				type: "name",
				title: "Night Mode Period",
				content: "Specify a time period during which the night mode applies."
			},{
				type: "paragraph",
				content: "Click Save to save all your settings."
			}]
		},
		OPEN_VPN:{
			TITLE: "OpenVPN",
			CONTENT: [{
				type: "paragraph",
				content: "With OpenVPN, you can use the Internet to securely access the network when you are out of home. To use the VPN Service, you need to configure Dynamic DNS Service (recommended) or assign a static IP address for the router’s WAN port. And the System Time should be synchronized with Internet."
			},{
				type: "name",
				title: "Service Type",
				content: "Select the communication protocol for the OpenVPN server: UDP or TCP."
			},{
				type: "name",
				title: "Service Port",
				content: "Enter a communication port number between 1024 and 65535. The default and common service port is 1194."
			},{
				type: "name",
				title: "VPN Subnet/Netmask",
				content: "Enter the range of IP addresses that can be leased to the clients by the OpenVPN server."
			},{
				type: "name",
				title: "Client Access",
				content: "Select the access type for the OpenVPN client.",
				children: [{
					type: "name",
					title: "Home Network Only",
					content: "Client can only access the home network. The client's default route will not be changed."
				},{
					type: "name",
					title: "Internet and Home Network",
					content: "Client can access the home network, and Internet sites or services with a geographic limitation when you are out of the country. The client's default route will be altered."
				}]
			}]
		},
		OPEN_VPN_CERTIFICATE:{
			TITLE: "Certificate",
			CONTENT: [{
				type: "paragraph",
				content: [
				"Use the certificate for the information and identity of VPN connection for remote clients.",
				"Click Generate to generate a new certificate."
				]
			}]
		},
		OPEN_VPN_CONF:{
			TITLE: "Configuration File",
			CONTENT: [{
				type: "paragraph",
				content: [
				"Remote clients will use the configuration file to access the router.",
				"Click Export to save the OpenVPN configuration file."
				]
			}]
		},
		OPEN_VPN_GUIDE:{
			TITLE: "VPN Client Installation Guide",
			CONTENT: [{
				type: "step",
				title: "To connect the client devices to the OpenVPN server:",
				content:[{
					type: "paragraph",
					content: "Before you configure the OpenVPN server, please configure Dynamic DNS Service (recommended) or assign a static IP address for WAN port. And make sure the external port of NAT settings is not the service port, and the System Time is synchronized with Internet."
				},
					"1. Select Enable VPN Server.",
					"2. Configure the OpenVPN server parameters (Service Type, Service Port, Client Access and VPN Subnet/Netmask) and click Save.",
					"3. Click Export to save the configuration file.",
					"4. On the client devices, download and install the OpenVPN client utility from <a class=\"link\" href=\"http://openvpn.net/index.php/download/community-downloads.html\">http://openvpn.net/index.php/download/community-downloads.html</a>",
					"The official supported platforms include Windows, Mac OSX and Linux.",
					"5. Launch the OpenVPN client utility and add a new VPN connection using the saved configuration file to connect the client device to the VPN server."
				]},{
					type: "note",
					title: "Note",
					content: "To learn more about OpenVPN clients, visit <a class=\"link\" href=\"http://openvpn.net/index.php/open-source/documentation/howto.html#quick\">http://openvpn.net/index.php/open-source/documentation/howto.html#quick</a>"
				}]
		},
		PPTP_VPN:{
			TITLE: "PPTP VPN",
			CONTENT: [{
				type: "paragraph",
				content: "With PPTP VPN, you can use the Internet to easily and rapidly access the network when you are out of home. It may be prevented by some ISP. To use the VPN Service, you need to configure Dynamic DNS Service (recommended) or assign a static IP address for the router’s WAN port. And the System Time should be synchronized with Internet."
			},{
				type: "name",
				title: "Client IP Address",
				content: "Enter the range of IP addresses (up to 10 clients) that can be leased to the clients by the PPTP VPN server."
			},{
				type: "name",
				title: "Username and Password",
				content: "Enter the username and password to authenticate clients to the PPTP VPN server."
			}]
		},
		PPTP_VPN_GUIDE:{
			TITLE: "VPN Client Installation Guide",
			CONTENT: [{
				type: "step",
				title: "To connect the client devices to the PPTP VPN server:",
				content:[{
					type: "paragraph",
					content: "Before you configure the PPTP VPN server, please configure Dynamic DNS Service (recommended) or assign a static IP address for the WAN port. Please make sure the external port of NAT settings is not 1723 and the System Time is synchronized with Internet."
				},
					"1. Select Enable VPN Server.",
					"2. Configure the PPTP VPN server parameters and click Save.",
					"3. On the client devices, create a PPTP VPN connection. The official supported platforms include Windows, Mac OSX, Linux, iOS, and Android.",
					"4. Launch the PPTP VPN program, add a new connection and enter the domain name of the registered DDNS service or the static IP address that is assigned to the WAN port, to connect the client device to the PPTP VPN server.",
				]}
			]
		},
		VPN_CONNNECTION:{
			TITLE: "VPN Connections",
			CONTENT: [{
				type: "paragraph",
				content: "This page displays the clients that are currently connected to the OpenVPN and PPTP VPN servers hosted on the router."
			}]
		},
		BASIC_NETWORK: {
			TITLE: "Network Map",
			CONTENT: [{
				type: "paragraph",
				content: "In Network Map, you can view the current network connection status and wireless information of the router and the information of connected devices."
			}]
		},
		BASIC_NETWORK_INTEREST: {
			TITLE: "Internet",
			CONTENT: [{
				type: "paragraph",
				content: "Displays the Internet information."
			}]
		},
		BASIC_NETWORK_ROUTER: {
			TITLE: "Router",
			CONTENT: [{
				type: "paragraph",
				content: "Displays the current network information of the wireless networks and the LAN ports."
			}]
		},
		BASIC_NETWORK_CLIENTS: {
			TITLE: "Wired/Wireless Clients",
			CONTENT: [{
				type: "paragraph",
				content: "Displays the network name (editable), assigned IP and MAC address of the connected clients of the router."
			}]
		},
		BASIC_NETWORK_PRINTER: {
			TITLE: "Printer",
			CONTENT: [{
				type: "paragraph",
				content: "Displays the name of the printer connected to the router via USB port."
			}]
		},
		BASIC_NETWORK_USB: {
			TITLE: "USB Disk",
			CONTENT: [{
				type: "paragraph",
				content: "Displays relevant information of USB disk connected to the router via USB port."
			}]
		},
                BASIC_SPEED_TEST: {
			TITLE: "Speed Test",
			CONTENT: [{
				type: "paragraph",
				content: "This feature tests the current upload and download speeds you're getting from your service provider and provides helpful advice about your internet's capabilities."
			}, {
				type: "paragraph",
				content: "Tip: For a more accurate result, try closing down other apps and programs."
			}, {
				type: "paragraph",
				content: "History - A record of previous speed tests."
			}, {
				type: "paragraph",
				content: "Test Again - Click to perform a speed test."
			}]
		},
		BASIC_INTERNET: {
			TITLE: "Internet",
			CONTENT: [{
				type: "paragraph",
				content: "Click Auto Detect or select the Internet connection type manually. Then enter corresponding parameters provided by the ISP."
				}]
		},
		BASIC_WIRELESS_SMART_CONNECT: {
			TITLE: "Smart Connect",
			CONTENT: [{
				type: "paragraph",
				content: "Select this checkbox to enable smart connect. This function helps devices run faster by assigning them to best wireless bands based on actual conditions to balance network demands."
			}]	
		},
		BASIC_WIRELESS: {
			TITLE: "Wireless Settings",
			CONTENT: [{
				type: "paragraph",
				content: "You can configure the wireless settings (SSID, password, etc.)"
			},{
				type: "name",
				title: "Network Name (SSID)",
				content: "You are recommended to change the network name (SSID). This field is case-sensitive."
			},{
				type: "name",
				title: "Hide SSID",
				content: "Select if you want to hide the 2.4GHz/5GHz network name (SSID) from the wireless network list. Once selected, the SSID will not be broadcast and you need to manually join the network."
			},{
				type: "name",
				title: "Password",
				content: "Enter a wireless password between 8 and 63 ASCII characters, or between 8 and 64 hexadecimal characters. This field is case-sensitive."
			}]
		},
		BASIC_DEVICE_SETTINGS: {
			TITLE: "USB Storage Device",
			CONTENT: [{
				type: "paragraph",
				content: "This feature allows you to share USB storage devices among different clients in the local area network or through the Internet."
			},{
				type: "title",
				title: "Device Settings",
				content: "The Device Settings section displays the basic information of the USB storage device connected via the USB port. A USB flash disk usually has only one volume."
			},{
				type: "name",
				title: "Scan",
				content: "Usually, the router automatically detects any newly attached device. If not, click this button to scan and refresh the screen with the updated information.",
				children:[{
					type:"note",
					title:"Note",
					content:"A gray area represents a volume that is disabled. You can click the area to share the specific volume."
				}]
			},{
				type: "name",
				title: "Remove",
				content: "Click this button to safely unmount the USB storage device before physically unplugging it from the USB port.",
				children: [{
					type:"note",
					title:"Note",
					content: "Remove button only appears when the USB storage device is connected to the router. When the current volume is busy, you are unable to unmount."
				}]
			},{
				type: "step",
				title: "To set up a file server",
				content: [
					"1. Attach the USB storage device to the USB port directly or using a USB cable. If the device requires bundled external power, make sure the external power has been connected.",
					"2. The newly attached USB device should be automatically detected by the router and be displayed under the Device Settings section. If not, click Scan.",
					"Note: The Share icon appears when more than 5 volumes are connected to the router. You can click the icon to disable volumes you don't need to share."

				]
			}]
		},
		BASIC_SHARING_SETTINGS: {
			TITLE: "Access Address",
			CONTENT: [{
				type: "name",
				title: "Network/Media Server Name",
				content: "Displays the name used to access the connected USB storage device through the Network Neighborhood method or Media Sharing feature. It is TP-Share by default."
			},{
				type: "name",
				title: "Access Method",
				content: "There are 4 methods to access the shared USB storage device.",
				children:[
					{
						type:"name",
						title:"Network Neighborhood",
						content:"Select this option to allow users on the network to access the shared contents via the address shown under the Address column."
					},
					{
						type:"name",
						title:"FTP",
						content:"Select this option to enable the FTP server feature that allows FTP clients and users on the network to access the USB storage device via the FTP address shown under the Address column."
					},
					{
						type:"name",
						title:"FTP (via Internet)",
						content:"Select this option to allow FTP clients and users to remotely access, download and upload files to the shared USB storage device through FTP over the Internet. To customize the access address, click Edit and set up the Dynamic DNS for the router. To change the FTP server’s port, enter a new port number and click Save to apply the changes."
					},
					{
						type:"name",
						title:"SFTP",
						content:"Select this option to enable the SFTP server feature that allows SFTP clients and users on the network to access the USB storage device via the SFTP address shown under the Address column."
 					}
				]
			},{
				type: "name",
				title: "Address",
				content: "Displays the address used to access the shared USB storage device."
			},{
				type: "name",
				title: "Port",
				content: "Displays the port number used to access the FTP server."
			}]
		},
		BASIC_FOLDER_SHARING: {
			TITLE: "Sharing Contents",
			CONTENT: [{
				type: "paragraph",
				content: "Displays the folders you share. All folders are shared by default. You can click the Edit icon to customize the shared folders."
			},{
				type: "note",
				title: "Note",
				content: "The Share icon appears in the Device Settings section when more than 5 volumes are connected to the router. You can click the Share icon to disable volumes you don't need to share."
			}]
		},
		FOLDER_SHARING: {
			TITLE: "Sharing Contents and Security",
			CONTENT: [{
				type: "name",
				title:	"Sharing Contents",
				content: "Displays the folders you share. All folders are shared by default. You can click the Edit icon to customize the shared folders.",
				children:[{
					type:"note",
					title:"Note",
					content:"The Share icon appears in the Device Settings section when more than 5 volumes are connected to the router. You can click the Share icon to disable volumes you don't need to share."
				}]
			},{
				type: "name",
				title:	"Access Authentication",
				content: [
					"Toggle On to enable authentication which requires the users to enter a valid username and password to access all the shared folders. Accessing as Administrator can read and modify the files while the User can only read the files.",
					"Username should  begin with a letter or an underline and contain 1 to 15 characters using letters, digits and underlines.",
					"Password should contain 1 to 15 characters using letters, digits and underlines."
				]
			},{
				type: "name",
				title:	"Allow Guest Network Access",
				content: "Toggle On to allow guest network users to access all the shared folders."
			},{
				type: "name",
				title:	"Enable Media Sharing",
				content: "With this feature enabled, all DLNA-supported devices in the local network can access media files in all the shared folders. Users won't be required to enter username or password even if Access Authentication is enabled."
			}]
		},
		BASIC_PRINT_SERVER: {
			TITLE: "Printer Server",
			CONTENT: [{
				type: "name",
				title: "Printer Server",
				content: "Toggle On to enable the Printer Server function."
			},{
				type: "name",
				title: "Printer Name",
				content: "Displays the name of the printer connected to the router."
			}]
		},
		BASIC_PARENTAL_CONTROL: {
			TITLE: "Parental Controls",
			CONTENT: [{
				type: "paragraph",
				content: "With the basic settings of Parental Controls, you can restrict access by certain times of day (for example, no Internet access from the child's PC during homework time)."
			}]
		},
		BASIC_PARENTAL_DEVICE: {
			TITLE: "Devices Under Parental Controls",
			CONTENT: [{
				type: "paragraph",
				content: "This table displays the information and settings of the devices that are currently restricted by Parental Controls."
			},{
				type: "step",
				title: "To restrict a new client device",
				content:[
					"1. Toggle On Parental Controls.",
					"2. Click Add.",
					"3. Click Scan to choose a currently connected device from the Access Devices List; or enter the Device Name and MAC Address manually to add a device that is not connected.",
					"4. Click the Effective Time icon to specify a time period during which the restriction applies.",
					"5. Enter a brief description into the Description field. This field is optional.",
					"6. Select Enable This Entry.",
					"7. Click Save."
				]
			},{
				type: "note",
				title: "Note",
				content: "If you want to disable this entry, click the Bulb icon."
			}]
		},
		BASIC_GUEST_NETWORK: {
			TITLE: "Guest Network",
			CONTENT: [{
				type: "paragraph",
				content: "This function allows you to provide Wi-Fi access for guests without disclosing the main network."
			},{
				type: "name",
				title: "Allow Guests to Access Each Other",
				content: "Select this checkbox to allow the wireless devices on the Guest Network to communicate with each other via methods such as network neighbors, Samba, Ping, and FTP."
			},{
				type: "name",
				title: "Allow Guests to Access My Local Network",
				content: "Select this checkbox to allow the wireless devices on the Guest Network to communicate with the devices connected to the router's LAN ports or main network via methods such as network neighbors, Samba, Ping, and FTP."
			},{
				type: "name",
				title: "Enable Guest Network",
				content: "Select this checkbox to enable the Guest Network feature."
			},{
				type: "name",
				title: "Network Name (SSID)",
				content: "Either use the default Guest SSID or create a new name (up to 32 characters)."
			},{
				type: "name",
				title: "Hide SSID",
				content: "Select this checkbox if you want to hide the Guest SSID from the Wi-Fi network list."
			},{
				type:"name",
				id:"pwd_mode",
				title:"Password Update Interval",
				content:"Select the update interval of the Guest Network password."
			},{
				type: "name",
				id: "pwd_no_random",
				title: "Password",
				content: "Create a password between 8 and 63 ASCII characters, or between 8 and 64 hexadecimal characters (0-9, a-f, A-F)."
			},{
				type: "name",
				id: "pwd_random",
				title: "Password",
				content: "Either use the password generated randomly, or create a password between 8 and 63 ASCII characters or between 8 and 64 hexadecimal characters (0-9, a-f, A-F)."
			}]
		},
		BASIC_ACCOUNT_LOGIN:{
			TITLE:"TP-Link Cloud",
			CONTENT:[{
				type:"paragraph",
				content:"TP-Link Cloud service lets you remotely monitor your network in real-time, access and manage your TP-Link devices from the Internet at anytime and anywhere."
			}]
		},
		ACCOUNT_INFO:{
			TITLE:"Account Information",
			CONTENT:[{
				type:"paragraph",
				content:"Displays your TP-Link ID information. You can edit the account information by clicking the Edit icon."
			}]
		},
		DEVICE_INFO:{
			TITLE:"Device Information",
			CONTENT:[{
				type:"paragraph",
				content:"Displays your device information, including the cloud account that is managing the device."
			}]
		},
		BOUND_ACCOUNT:{
			TITLE:"Bound Accounts",
			CONTENT:[{
				type:"paragraph",
				content:"This table displays all the cloud accounts that are currently bound to the device."
			},{
				type:"step",
				title:"To bind a user account",
				content:["1. Click Bind.",
				"2. Enter the registered email that you want to bind.",
				"3. Click Save."]
			}]

		},
		NEW_PARENTAL_CONTROL:{
			TITLE:"Parental Controls",
			CONTENT:[{
				type:"paragraph",
				content:"With age-level filters, access limits and user profiles, Parental Controls provides your family with personalized and appropriate internet access."
			},{
				type:"step",
				title:"To apply Parental Controls to a new device",
				content:["1. Click Add.",
				"2. Enter a name for this profile and click \"+\" to add device(s) under this profile.",
				"3. Select a Filter Level and customize the filter content according to your needs. You can enter keywords to search for websites that you want to filter in our database. Other websites (URLs) can be entered manually.<br/>Refer to the following explanations for the different filter categories:<p>Adult Content - Sites that contain sexual, harmful or illicit content, including pornography, substance use, violence and discrimination</p><p>Gambling - Sites that promote or provide information on gambling, including online gambling sites</p><p>Sex Education - Sites that discuss sexuality informatively, including reproduction, sexuality, safe sex and birth control, sexually transmitted disease and coping with sexual trauma</p><p>Online Communication - Sites that host formats of communicating to others through text, voice or video, including email, blogs, online forums, VoIP and video chat services</p><p>Social Networking - Sites that distribute personal expression or communication, linking people and their personal activity based on similar interests, careers, backgrounds or real-life acquaintance</p><p>Pay to Surf - Sites that compensate users to view certain websites, email messages, or advertisements, click links or respond to surveys</p><p>Media - Sites that offer free, paid or subscribed audio and/or video content, including streaming services, TV programming or music downloads</p><p>Downloads - Sites that provide or give access to file sharing and distribution, including peer-to-peer sharing, online file storage and mobile device content (e.g., music & apps)</p><p>Games - Sites that provide or give access to web-hosted or downloadable games, including online gaming, game console networks and browser games</p>",
				"4. If you want to limit the total time this profile can spend online, enable and specify Time Limits. You can also use Bed Time to set a daily time period during which devices under this profile cannot use the internet.",
				"5. Click Save."]
			},{
				type:"step",
				title:"To view a profile's detailed internet history",
				content:["1. In the Insights column, click the corresponding Insights button.",
				"2. If you want to see more records, click the History <span class=\"ptl-ctr-help-icon history\"></span> button.",
				"3. You can block or unblock websites by clicking the <span class=\"ptl-ctr-help-icon block\"></span> or <span class=\"ptl-ctr-help-icon unblock\"></span> button."]
			},{
				type:"step",
				title:"To disable or enable internet access immediately",
				content:["In the Internet Access column, click <span class=\"ptl-ctr-help-icon stop\"></span> to stop the corresponding profile's devices from accessing the internet and click <span class=\"ptl-ctr-help-icon enable\"></span> to enable access again."]
			}]
		},
		BASIC_QOS:{
			TITLE:"QoS",
			CONTENT:[{
				type:"paragraph",
				content:"The QoS (Quality of Service) feature prioritizes online activities and devices to guarantee a faster network connection when you need it the most."
			},{
				type:"paragraph",
				content:"Select Application Priority to prioritize network speed for online activities, and select Device Priority to prioritize network speed for devices."
			}]
		},
		BASIC_APPLICATION_PRIORITY:{
			TITLE:"Application Priority",
			CONTENT:[{
				type:"paragraph",
				content:"Choose the online activity you want to prioritize or click Custom to set the priority level of each online activity."
			}]
		},
		BASIC_DEVICE_PRIORITY:{
			TITLE:"Device Priority",
			CONTENT:[{
				type:"paragraph",
				content:"Choose the device(s) you want to prioritize and how long they will be prioritized for."
			}, {
				type:"step",
				title:"To prioritize a device",
				content:["1. Find the device you want to prioritize in the list and toggle on Priority.",
				"2. Select how long the device will be prioritized for in the Timing column."]
			}]
		},
		ANTI_VIRUS:{
			TITLE:"Antivirus",
			CONTENT:[{
				type:"paragraph",
				content:"With frequent network scans, malicious site detection and infected device isolation, the Antivirus feature keeps your personal information secure. You can also check how your network is protected, and if there have been any attacks on your network."
			}, {
				type:"paragraph",
				content:"History - Records the devices that have been protected by Antivirus and the source and classification of the attacks."
			}, {
				type:"paragraph",
				content:"Enable All - Tap to enable all Protection Types if one or more are not enabled."
			}, {
				type:"paragraph",
				content:"Protection Types - Enable the Protection Types by referring to the explanations. It is recommended to enable all the Protection Types."
			}]
		},
		APPLICATION_PRIORITY:{
			TITLE:"Application Priority",
			CONTENT:[{
				type:"paragraph",
				content:"The Application Priority feature prioritizes online activities to guarantee a faster network connection when you need it the most. Choose the online activity you want to prioritize or click Custom to set the priority level of each online activity."
			}]
		},
		DEVICE_PRIORITY:{
			TITLE:"Device Priority",
			CONTENT:[{
				type:"paragraph",
				content:"The Device Priority feature prioritizes devices to guarantee a faster network connection when you need it the most. Choose the device(s) you want to prioritize and how long they will be prioritized for."
			},{
				type:"step",
				title:"To prioritize a device",
				content:["1. Find the device you want to prioritize in the list and toggle on Priority.",
				"2. Select how long the device will be prioritized for in the Timing column."]
			}]
		},
		FIREWALL:{
			TITLE:"Firewall",
			CONTENT:[{
				type:"paragraph",
				content:"SPI (Stateful Packet Inspection) Firewall prevents cyber attacks and validates the traffic that is passing through the router based on the protocol. By default, this feature is enabled."
			}, {
				type:"name",
				title:"Enable SPI Firewall",
				content:"Don't disable SPI Firewall unless necessary."
			}, {
				type:"name",
				title:"Allow Pings from the WAN Port/Allow Pings from the LAN Port",
				content:"Enable to allow ping packets from the WAN/LAN port. It is recommended to keep the default settings."
			}]
		}
	};
})(jQuery);
