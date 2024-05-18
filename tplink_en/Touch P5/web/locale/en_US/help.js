// JavaScript Document
(function($){
	$.su = $.su || {};
	$.su.CHAR = $.su.CHAR || {};
	$.su.CHAR.HELP = {

		BASIC_REGION: {
			TITLE: "Region Settings",
			CONTENT: [
				{
					type: "name",
					title: "Region",
					content: "If your country or region is not listed, it may be restricted to use the wireless radio in your location."
				}
			]
		},

		BASIC_STATUS: {
			TITLE: "Status",
			CONTENT: [
				{
					type: "paragraph",
					content: "The Status page displays a dashboard with your current network status and information. You can click on each icon to get more details. "
				},
				{
					type: "title",
					title: "Router"
				},
				{
					type: "title",
					title: "Host Network"
				},
				{
					type: "paragraph",
					content: "Displays the host 2.4GHz/5GHz network information."
				},
				{
					type: "name",
					title: "2.4GHz/5GHz Wireless",
					content: "Display the connection status (On/Off) of the host network."
				},
				{
					type: "name",
					title: "SSID",
					content: "Displays the SSID of the host network."
				},
				{
					type: "name",
					title: "Signal",	
					content: "Displays the signal strength of the host network."
				
				},
				{
					type: "name",
					title: "MAC",	
					content: "Displays the physical MAC address of the host network."
				
				},
				{
					type: "title",
					title: "Repeater"
				
				},
				{
					type: "paragraph",
					content: "Displays the Extended 2.4GHz/5GHz network information."
				
				},
				{
					type: "name",
					title: "SSID",
					content: "Displays the Extended network name (SSID)."
				},
				{
					type: "name",
					title: "Channel",	
					content: "Displays the wireless channel is currently in use."
				
				},
				{
					type: "name",
					title: "MAC",	
					content: "Displays the physical MAC address of the repeater."
				
				},
				{
					type: "name",
					title: "DHCP Server",	
					content: "Displays the status of the the DHCP server."
				
				},
				{
					type: "name",
					title: "IP Address",	
					content: "Displays the IP address that is allocated to the client by the DHCP server."
				
				},
				{
					type: "name",
					title: "IP Address",	
					content: "The IP address that is allocated to the client by the DHCP server."
				
				},
				{
					type: "name",
					title: "Type",	
					content: "Displays the type of the IP address allocated by the DHCP server."
				
				},
				{
					type: "title",
					title: "Clients"
				
				},
				{
					type: "paragraph",
					content: "Displays the current client devices connected to the extended 2.4GHz/5GHz network."
				
				},
				{
					type: "name",
					title: "Type",
					content: "Displays the connection type of the client devices."
				},
				{
					type: "name",
					title: "Device Name",	
					content: "Displays the name of the client devices."
				
				},
				{
					type: "name",
					title: "MAC Address",	
					content: "Displays the physical MAC address of the client devices."
				
				}
			]
		},
		
		AP_BASIC_STATUS:{
			TITLE: "Status",
			CONTENT: [
				{
					type: "paragraph",
					content: "The Status page displays a dashboard with your current network status and information. You can click on each icon to get more details."
				},
				{
					type: "title",
					title: "Internet"
				},
				{
					type: "name",
					title: "Internet Status",
					content: "Displays the current status of the Internet connection of the device."
				},
				{
					type: "title",
					title: "Access Point"
				},
				{
					type: "name",
					title: "DHCP Server",
					content: "Displays the status of the the DHCP server."
				},
				{
					type: "name",
					title: "IP Address",	
					content: "Displays the IP address that is allocated to the access point by the DHCP server."
				
				},
				{
					type: "name",
					title: "Type",	
					content: "Displays the type the access point obtain its IP address."
				
				},
				{
					type: "title",
					title: "Wireless Clients"
				},
				{
					type: "name",
					title: "Name",	
					content: "Displays the name of the client devices."
				
				},
				{
					type: "name",
					title: "IP Address",	
					content: "Displays the IP address that is allocated to the client devices."
				
				},
				{
					type: "name",
					title: "MAC Address",	
					content: "Displays the physical MAC address of the client devices."
				}
			]
		},

		WIRELESS_REGION: {
			TITLE: "Region Settings",
			CONTENT: [{
				type: "name",
				title: "Region",
				content: "If your country or region is not listed, it may be restricted to use the wireless radio in your location."
			},{
				type: "paragraph",
				content: "Click Save to save all your settings."
			}]
		},
		
		AP_WIRELESS_REGION: {
			CONTENT: [{
				type: "name",
				title: "Set Region",
				content: "Note:  Please set your region first, as some region/country may have restrictions on the wireless radio."
			}]
		},
		WIRELESS_TITLE:{
			TITLE: "Wireless Settings"
		},
		WIRELESS_24G: {	
			TITLE: "2.4GHz Wireless",
			CONTENT: [{
				type: "name",
				title: "Enable Wireless Radio",
				content: "Select this checkbox to enable the 2.4GHz wireless radio frequency."
			},{
				type: "name",
				title: "Network Name (SSID)",
				content: "You can leave the default Network Name (SSID) as it is, or enter a new name (up to 32 characters). This field is case-sensitive."
			},{
				type: "name",
				title: "Hide SSID",
				content: "Select this checkbox if you want to hide the 2.4GHz network name (SSID) from the Wi-Fi network list."
			},{
				type: "name",
				title: "Security",
				content: "Select one of the following security options:",
				children: [{
					type: "name",
					title: "No Security",
					content: "Select this option to disable the wireless security. It is highly recommended that you enable the wireless security to protect your wireless network from unauthorized access."
				},{
					type: "name",
					title: "WPA/WPA2-Personal",
					content: "Select this option to enable the standard authentication method based on a Pre-shared Key (PSK), also called passphrase. This option is recommended. If selected, configure the following.",
					children: [{
						type: "name",
						title: "Version",
						content: "Select a security version for your wireless network.",
						children: [{
							type: "name",
							title: "Auto",
							content: "This option supports multiple implementation of the WPA (Wi-Fi Protected Access) standard, such as WPA and WPA2."
						},{
							type: "name",
							title: "WPA-PSK",
							content: "This option supports only TKIP encryption that provides a good level of security."
						},{
							type: "name",
							title: "WPA2-PSK",
							content: "This option support AES encryption that provides a better level of security than WPA-PSK and is recommended."
						}]
					},{
						type: "name",
						title: "Encryption",
						content: "Select a security encryption type: TKIP(Temporal Key Integrity Protocol), AES(Advanced Encryption Standard), or Auto (for both TKIP and AES). It is NOT recommended to use the TKIP encryption if the access point operates in 802.11n mode, because TKIP is not supported by 802.11n specification. If TKIP is selected, WPS function will be disabled."
					},{
						type: "name",
						title: "Password",
						content: "Enter a wireless password between 8 and 63 ASCII characters, or between 8 and 64 hexadecimal characters into this field."
					}]
				},{
					type: "name",
					title: "WPA/WPA2-Enterprise",
					content: "Select this option to enable the more advanced authentication method using a Radius (Remote Authentication Dial In User Service) server. If selected, WPS function will be disabled.",
					children: [{
						type: "name",
						title: "Version",
						content: "Select a security version for your wireless network.",
						children:[{
							type: "name",
							title: "Auto",
							content: "This option supports multiple implementation of the WPA (Wi-Fi Protected Access) standard, such as WPA and WPA2."
						},{
							type: "name",
							title: "WPA-PSK",
							content: "This option supports only TKIP encryption that provides a good level of security."
						},{
							type: "name",
							title: "WPA2-PSK",
							content: "This option support AES encryption that provides a better level of security than WPA-PSK and is recommended."
						}]
					},{
						type: "name",
						title: "Encryption",
						content: "Select a security encryption type: TKIP (Temporal Key Integrity Protocol), AES (Advanced Encryption Standard), or Auto (for both TKIP and AES). It is NOT recommended to use the TKIP encryption if the access point operates in 802.11n mode, because TKIP is not supported by 802.11n specification. If TKIP is selected, WPS function will be disabled."
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
				content: "Select this option to enable basic authentication method if any of your client devices can only access the wireless using WEP (Wired Equivalent Privacy).",
				children: [{
					type: "name",
					title: "Type",
					content: "Select an authentication type for your wireless network. The default is Auto, which automatically chooses Open System or Shared Key based on the capability and access request of the wireless client."
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
				title: "Mode",
				content: "Select a transmission mixed mode."
			},{
				type: "name",
				title: "Channel Width",
				content: "Select a channel width (bandwidth) for the 2.4GHz wireless network."
			},{
				type: "name",
				title: "Channel",
				content: "Select an operating channel for the 2.4GHz wireless network. It is recommended to leave the channel to Auto, if you are not experiencing the intermittent wireless connection issue."
			},{
				type: "name",
				title: "Transmit Power",
				content: "Select either High, Middle, or Low to specify the data transmit power. The default and recommended setting is High."
			},{
				type: "paragraph",
				content: "Click Save to save all your settings."
			}]
		},
		
		AP_WIRELESS_24G: {	
			TITLE: "2.4GHz/5GHz Wireless",
			CONTENT: [{
				type: "name",
				title: "Enable Wireless Radio",
				content: "Select this checkbox to enable the 2.4GHz/5GHz wireless radio frequency."
			},{
				type: "name",
				title: "Network Name (SSID)",
				content: "You can leave the default Network Name (SSID) as it is, or enter a new name (up to 32 characters). This field is case-sensitive."
			},{
				type: "name",
				title: "Hide SSID",
				content: "Select this checkbox if you want to hide the 2.4GHz/5GHz network name (SSID) from the Wi-Fi network list."
			},{
				type: "name",
				title: "Security",
				content: "Select one of the following security options:",
				children: [{
					type: "name",
					title: "No Security",
					content: "Select this option to disable the wireless security. It is highly recommended that you enable the wireless security to protect your wireless network from unauthorized access."
				},{
					type: "name",
					title: "WPA/WPA2-Personal",
					content: "Select this option to enable the standard authentication method based on a Pre-shared Key (PSK), also called passphrase. This option is recommended. If selected, configure the following.",
					children: [{
						type: "name",
						title: "Version",
						content: "Select a security version for your wireless network.",
						children: [{
							type: "name",
							title: "Auto",
							content: "This option supports multiple implementation of the WPA (Wi-Fi Protected Access) standard, such as WPA and WPA2."
						},{
							type: "name",
							title: "WPA-PSK",
							content: "This option supports only TKIP encryption that provides a good level of security."
						},{
							type: "name",
							title: "WPA2-PSK",
							content: "This option support AES encryption that provides a better level of security than WPA-PSK and is recommended."
						}]
					},{
						type: "name",
						title: "Encryption",
						content: "Select a security encryption type: TKIP(Temporal Key Integrity Protocol), AES(Advanced Encryption Standard), or Auto (for both TKIP and AES). It is NOT recommended to use the TKIP encryption if the access point operates in 802.11n mode, because TKIP is not supported by 802.11n specification. If TKIP is selected, WPS function will be disabled."
					},{
						type: "name",
						title: "Password",
						content: "Enter a wireless password between 8 and 63 ASCII characters, or between 8 and 64 hexadecimal characters into this field."
					}]
				},
				{
				type: "name",
				title: "WEP",
				content: "Select this option to enable basic authentication method if any of your client devices can only access the wireless using WEP (Wired Equivalent Privacy).",
				children: [{
					type: "name",
					title: "Type",
					content: "Select an authentication type for your wireless network. The default is Auto, which automatically chooses Open System or Shared Key based on the capability and access request of the wireless client."
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
				title: "Mode",
				content: "Select a transmission mixed mode."
			},{
				type: "name",
				title: "Channel Width",
				content: "Select a channel width (bandwidth) for the 2.4GHz/5GHz wireless network."
			},{
				type: "name",
				title: "Channel",
				content: "Select an operating channel for the 2.4GHz/5GHz wireless network. It is recommended to leave the channel to Auto, if you are not experiencing the intermittent wireless connection issue."
			},{
				type: "name",
				title: "Transmit Power",
				content: "Select either High, Middle, or Low to specify the data transmit power. The default and recommended setting is High."
			},{
				type: "paragraph",
				content: "Click Save to save all your settings."
			}]
		},
		
		WIRELESS_5G: {	
			TITLE: "5GHz Wireless",
			CONTENT: [{
				type: "name",
				title: "Enable Wireless Radio",
				content: "Select this checkbox to enable the 5GHz wireless radio frequency."
			},{
				type: "name",
				title: "Network Name (SSID)",
				content: "You can leave the default Network Name (SSID) as it is or enter a new name (up to 32 characters). This field is case-sensitive."
			},{
				type: "name",
				title: "Hide SSID",
				content: "Select this checkbox if you want to hide the 5GHz network name (SSID) from the Wi-Fi network list."
			},{
				type: "name",
				title: "Security",
				content: "Select one of the following security options:",
				children: [{
					type: "name",
					title: "No Security",
					content: "Select this option to disable the wireless security. It is highly recommended that you enable the wireless security to protect your wireless network from unauthorized access."
				},{
					type: "name",
					title: "WPA/WPA2-Personal",
					content: "Select this option to enable the standard authentication method based on a Pre-shared Key (PSK), also called passphrase. This option is recommended. If selected, configure the following.",
					children: [{
						type: "name",
						title: "Version",
						content: "Select a security version for your wireless network.",
						children: [{
							type: "name",
							title: "Auto",
							content: "This option supports multiple implementation of the WPA (Wi-Fi Protected Access) standard, such as WPA and WPA2."
						},{
							type: "name",
							title: "WPA-PSK",
							content: "This option supports only TKIP encryption that provides a good level of security."
						},{
							type: "name",
							title: "WPA2-PSK",
							content: "This option support AES encryption that provides a better level of security than WPA-PSK and is recommended."
						}]
					},{
						type: "name",
						title: "Encryption",
						content: "Select a security encryption type: TKIP (Temporal Key Integrity Protocol), AES (Advanced Encryption Standard), or Auto (for both TKIP and AES). It is NOT recommended to use the TKIP encryption if the access point operates in 802.11n mode, because TKIP is not supported by 802.11n specification. If TKIP is selected, WPS function will be disabled."
					},{
						type: "name",
						title: "Password",
						content: "Enter a wireless password between 8 and 63 ASCII characters, or between 8 and 64 hexadecimal characters into this field."
					}]
				},{
					type: "name",
					title: "WPA/WPA2-Enterprise",
					content: "Select this option to enable the more advanced authentication method using a Radius (Remote Authentication Dial In User Service) server. If selected, WPS function will be disabled.",
					children: [{
						type: "name",
						title: "Version",
						content: "Select a security version for your wireless network.",
						children: [{
							type: "name",
							title: "Auto",
							content: "This option supports multiple implementation of the WPA (Wi-Fi Protected Access) standard, such as WPA and WPA2."
						},{
							type: "name",
							title: "WPA-PSK",
							content: "This option supports only TKIP encryption that provides a good level of security."
						},{
							type: "name",
							title: "WPA2-PSK",
							content: "This option support AES encryption that provides a better level of security than WPA-PSK and is recommended."
						}]
					},{
						type: "name",
						title: "Encryption",
						content: "Select a security encryption type: TKIP (Temporal Key Integrity Protocol), AES (Advanced Encryption Standard), or Auto (for both TKIP and AES). It is NOT recommended to use the TKIP encryption if the access point operates in 802.11n mode, because TKIP is not supported by 802.11n specification. If TKIP is selected, WPS function will be disabled."
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
					content: "Select this option to enable basic authentication method if any of your client devices can only access the wireless using WEP (Wired Equivalent Privacy).",
					children: [{
						type: "name",
						title: "Type",
						content: "Select an authentication type for your wireless network. The default is Auto, which automatically chooses Open System or Shared Key based on the capability and access request of the wireless client."
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
				title: "Mode",
				content: "Select a transmission mixed mode."
			},{
				type: "name",
				title: "Channel Width",
				content: "Select a channel width (bandwidth) for the 5GHz wireless network."
			},{
				type: "name",
				title: "Channel",
				content: "Select an operating channel for the 5GHz wireless network. It is recommended to leave the channel to Auto, if you are not experiencing the intermittent wireless connection issue."
			},{
				type: "name",
				title: "Transmit Power",
				content: "Select either High, Middle, or Low to specify the data transmit power. The default and recommended setting is High."
			},{
				type: "paragraph",
				content: "Click Save to save all your settings."
			}]
		},
		
		AP_WIRELESS_5G: {	
			TITLE: "5GHz Wireless",
			CONTENT: [{
				type: "name",
				title: "Enable Wireless Radio",
				content: "Select this checkbox to enable the 5GHz wireless radio frequency."
			},{
				type: "name",
				title: "Network Name (SSID)",
				content: "You can leave the default Network Name (SSID) as it is or enter a new name (up to 32 characters). This field is case-sensitive."
			},{
				type: "name",
				title: "Hide SSID",
				content: "Select this checkbox if you want to hide the 5GHz network name (SSID) from the Wi-Fi network list."
			},{
				type: "name",
				title: "Security",
				content: "Select one of the following security options:",
				children: [{
					type: "name",
					title: "No Security",
					content: "Select this option to disable the wireless security. It is highly recommended that you enable the wireless security to protect your wireless network from unauthorized access."
				},{
					type: "name",
					title: "WPA/WPA2-Personal",
					content: "Select this option to enable the standard authentication method based on a Pre-shared Key (PSK), also called passphrase. This option is recommended. If selected, configure the following.",
					children: [{
						type: "name",
						title: "Version",
						content: "Select a security version for your wireless network.",
						children: [{
							type: "name",
							title: "Auto",
							content: "This option supports multiple implementation of the WPA (Wi-Fi Protected Access) standard, such as WPA and WPA2."
						},{
							type: "name",
							title: "WPA-PSK",
							content: "This option supports only TKIP encryption that provides a good level of security."
						},{
							type: "name",
							title: "WPA2-PSK",
							content: "This option support AES encryption that provides a better level of security than WPA-PSK and is recommended."
						}]
					},{
						type: "name",
						title: "Encryption",
						content: "Select a security encryption type: TKIP (Temporal Key Integrity Protocol), AES (Advanced Encryption Standard), or Auto (for both TKIP and AES). It is NOT recommended to use the TKIP encryption if the access point operates in 802.11n mode, because TKIP is not supported by 802.11n specification. If TKIP is selected, WPS function will be disabled."
					},{
						type: "name",
						title: "Password",
						content: "Enter a wireless password between 8 and 63 ASCII characters, or between 8 and 64 hexadecimal characters into this field."
					}]
				},
				{
					type: "name",
					title: "WEP",
					content: "Select this option to enable basic authentication method if any of your client devices can only access the wireless using WEP (Wired Equivalent Privacy).",
					children: [{
						type: "name",
						title: "Type",
						content: "Select an authentication type for your wireless network. The default is Auto, which automatically chooses Open System or Shared Key based on the capability and access request of the wireless client."
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
				title: "Mode",
				content: "Select a transmission mixed mode."
			},{
				type: "name",
				title: "Channel Width",
				content: "Select a channel width (bandwidth) for the 5GHz wireless network."
			},{
				type: "name",
				title: "Channel",
				content: "Select an operating channel for the 5GHz wireless network. It is recommended to leave the channel to Auto, if you are not experiencing the intermittent wireless connection issue."
			},{
				type: "name",
				title: "Transmit Power",
				content: "Select either High, Middle, or Low to specify the data transmit power. The default and recommended setting is High."
			},{
				type: "paragraph",
				content: "Click Save to save all your settings."
			}]
		},
		ENABLE_WPS:{
			TITLE: "WPS",
			CONTENT:[{
				type: "name",
				title: "Enable WPS",
				content: "Other devices can connect to this access point(AP) by WPS with AP's PIN."
			}]
		},
		WPS: {	
			TITLE: "AP's PIN",
			CONTENT: [{
				type: "name",
				title: "AP's PIN",
				content: "Toggle On to allow wireless devices to connect to the access point using the AP's PIN (Personal Identification Number)."
			},{
				type: "name",
				title: "PIN",
				content: "Displays the AP's PIN. The default PIN can be found on the label of the access point. Click Generate to generate a new PIN randomly or click Default to restore the current PIN to the factory default PIN."
			}]
		},
		
		AP_WPS: {	
			TITLE: "AP's PIN",
			CONTENT: [
			// {
				// type: "paragraph",
				// content: "Toggle On to allow wireless devices to connect to the access point using WPS."
			// },
			{
				type: "name",
				title: "AP's PIN",
				content: "Toggle On to allow wireless devices to connect to the AP using the AP's PIN (Personal Identification Number)."
			},{
				type: "name",
				title: "PIN",
				content: "Displays the AP's PIN. The default PIN can be found on the label of the AP. Click Generate to generate a new PIN randomly or click Default to restore the current PIN to the factory default PIN."
			}]
		},

		WPS_WIZARD: {
			TITLE: "WPS Wizard",
			CONTENT:[{
				type: "paragraph",
				content: "Select a setup method"
			},{
				type: "name",
				title: "Push Button (Recommended)",
				content: "Select this connection method to enable the WPS feature to easily connect any WPS-enabled device to your wireless network using the WPS button or virtually using the Connect button."
			},{
				type: "name",
				title: "PIN",
				content: "Select this connection method to add a device manually by entering the wireless device's WPS PIN into the field and click Connect."
			}]
		},

		AP_WPS_WIZARD: {
			TITLE: "WPS Wizard",
			CONTENT:[{
				type: "name",
				title: "Push Button (Recommended)",
				content: "Select this connection method to enable the WPS feature to easily connect any WPS-enabled device to your wireless network using the WPS button or virtually using the Connect button."
			},{
				type: "name",
				title: "PIN",
				content: "Select this connection method to add a device manually by entering the wireless device's WPS PIN into the field and click Connect."
			}]
		},


		WIRELESS_CONNECT: {
			TITLE: "Host Network Settings",
			CONTENT: [
				{
					type: "name",
					title: "Connect to 2.4GHz/5GHz Host Network ",
					content: "Select this checkbox to connect the repeater to an existing 2.4GHz/5GHz host network."
				},
				{
					type: "name",
					title: "Wireless Scanner",
					content: "Click this button to select a host network from the list to automatically populate its SSID and security settings into the respective fields. If your desired host network is not listed, enter its parameters manually."
				},				
				{
					type: "name",
					title: "Host Network SSID",
					content: "Enter the case-sensitive SSID of the host network which the repeater will be connecting to."
				},
				{
					type: "name",
					title: "Host Network Security",
					content: "Select the security type of the host network."
				},
				{
					type: "name",
					title: "Index",
					content: "This option is only available when the security type is WEP (Wired Equivalent Privacy). Select the same WEP index to match with the host network."
				},
				{
					type: "name",
					title: "Host Network Password",
					content: "Enter the case-sensitive Wi-Fi password of the host network."
				}
			]
		},


		WIRELESS_EXTEND: {
			TITLE: "Extended Network Settings",
			CONTENT: [
				{
					type: "name",
					title: "Enable 2.4GHz/5GHz Extended Network",
					content: "Select this checkbox to enable the 2.4GHz/5GHz wireless function of the repeater."
				},
				{
					type: "name",
					title: "Extended 2.4GHz/5GHz SSID",
					content: "Either use the <strong>Copy Host SSID</strong> button to automatically copy the SSID of host network or enter a new name (up to 32 characters long). This field is case-sensitive."
				},
				{
					type: "name",
					title: "Copy Host SSID",
					content: "Click this button to copy and automatically populate the SSID of the host network into the respective fields."
				},				
				{
					type: "name",
					title: "Hide SSID",
					content: "Select this checkbox if you want to hide the extended 2.4GHz/5GHz SSID from the Wi-Fi network list."
				},			
				{
					type: "name",
					title: "Extended 2.4GHz/5GHz Password",
					content: "Extended 2.4GHz/5GHz password is the same as the host password."
				}
			]
		},

		
		
		AP_ACCESS_CONTROL: {	
			TITLE: "Access Control",
			CONTENT: [
				{
				type: "paragraph",
					content: "Access Control is used to allow or block specific computers and other devices from accessing your network. When a device is blocked, it is unable to communicate with other devices or connect to the Internet."
				},
				{
				type: "paragraph",
					content: "To use the Access Control, enable this feature and specify a black or white list. If the Access Control is disabled (Off), all devices, including the blacklisted ones, are allowed to connect."
				}
			]
		},
		ACCESS_CONTROL: {	
			TITLE: "Access Control",
			CONTENT: [
				{
				type: "paragraph",
					content: "Access Control is used to allow or block specific computers and other devices from accessing your extended network. When a device is blocked, it is unable to connect to the extended network."
				},
				{
				type: "paragraph",
					content: "To use the Access Control, enable this feature and specify a black or white list. If the Access Control is disabled (Off), all devices, including the blacklisted ones, are allowed to connect."
				}
			]
		},
		
		ACCESS_MODE: {
			TITLE: "Access Mode",
			CONTENT: [{
				type: "name",
				title: "Blacklist",
				content: "Only the devices in the Blacklist are NOT allowed to access your network."
			},{
				type: "name",
				title: "Whitelist",
				content: "Only the devices on the Whitelist are allowed to access your network."
			}]
		},
		
		ACCESS_DEVICE: {
			TITLE: "Online Devices",
			CONTENT: [{
				type: "name",
				title: "Device Name",
				content: "Displays the name of the connected device."
			},{
				type: "name",
				title: "IP Address",
				content: "Displays the IP address of the connected device."
			},{
				type: "name",
				title: "MAC Address",
				content: "Displays the MAC address of the connected device."
			},{
				type: "name",
				title: "Connection Type",
				content: "Displays the connection type of the connected device."
			},{
				type: "step",
				title: "To block a device",
				content: "In the Online Devices table, click the Block icon in the Modify column that corresponds to the device that you wish to block."
			},{
				type: "step",
				title: "To block multiple devices",
				content: "In the Online Devices table, select all devices that you wish to block, click Block above the table. The device will be automatically added to the Devices in Blacklist or Whitelist."
			}],
		},
		
		ACCESS_LIST: {
			TITLE: "Devices in BlackList/WhiteList",
			CONTENT: [{
				type: "step",
				title: "To blacklist or whitelist a device",
				content: [
					"1. Click Add.",
					"2. Enter the Device Name.",
					"3. Enter the MAC address of the device.",
					"4.  Click OK."
				]
			},{
				type: "step",
				title: "To modify or delete a device in the Blacklist/Whitelist",
				content: "In the Blacklist/Whitelist table, click the Edit icon or the Trash icon that corresponds to the device that you wish to modify or delete."
			},{
				type: "step",
				title: "To delete multiple devices in the Blacklist/Whitelist",
				content: "In the Blacklist/Whitelist table, select all devices that you wish to delete, click Delete above the table."
			}]
		},
		
		LAN_ETHERNERT: {
			TITLE: "Ethernet Port",
			CONTENT: [
				{
					type: "name",
					title: "Network for the Ethernet Port",
					content: "Select the wireless band(2.4GHz or 5GHz) that is used for transferring data between the host network and the wired clients.<br/>This option is only available when both 2.4GHz and 5GHz wireless bands of the repeater are connected to host network."
				}
			]
		},

		LAN_SETTINGS: {
			TITLE: "Network Settings",
			CONTENT: [
				{
					type: "name",
					title: "Obtain an IP address automatically",
					content: "Select to make the device auto obtain the IP address, subnet mask and gateway from the host network. (Recommended)"
				},
				{
					type: "name",
					title: "Use the following IP address",
					content: "Select to manually enter the IP address, subnet mask and gateway of the device.",
					children:[
						{
							type: "note",
							title: "Note",
							content: "We do NOT recommend you change the IP address unless you are quite sure about the IP setting for special network demand,  random changes may lead to Internet disconnection."
						}
					]
				},
				{
					type: "name",
					title: "IP Address",
					content: "Enter the IP address in dotted-decimal notation. It should be in the same subnet as the host network."
				},
				{
					type: "name",
					title: "Subnet Mask",
					content: "Enter the subnet mask in dotted-decimal notation that determines the network portion and host portion of the IP address."
				},
				{
					type: "name",
					title: "Default Gateway",
					content: "Enter the gateway that is in the same subnet as the IP address in dotted-decimal notation."
				}
			]
		},


		DHCP_SERVER_SETTINGS: {
			TITLE: "DHCP Server Settings",
			CONTENT: [
				{
					type: "paragraph",
					content: "By default, the device is set up as a DHCP (Dynamic Host Configuration Protocol) server to provide TCP/IP configuration for all client devices in the LAN from the IP Address Pool."
				},
				{
					type: "name",
					title: "DHCP Server",
					content: "By default, the DHCP server will automatically turn on or off to assign valid IP to client devices according to the DHCP server settings of your host network. If Off is selected, you must have another DHCP server within your LAN. Otherwise, you have to configure the IP address for each client manually."
				},
				{
					type: "name",
					title: "IP Address Pool",
					content: "Enter the range of IP addresses that can be leased to the clients."
				},
				{
					type: "name",
					title: "Address Lease Time",
					content: "Enter the time duration that an IP address is leased to the client between 1 and 2880 minutes. The default is 1 minutes."
				},
				{
					type: "name",
					title: "Default Gateway",
					content: "Enter the LAN IP address. (Optional)"
				},
				{
					type: "name",
					title: "Primary DNS/Secondary DNS",
					content: "Enter these parameters as provided by your ISP. (Optional)"
				},
				{
					type: "note",
					title: "Note",
					content: "In order to use the device's DHCP server, all clients in your LAN must configure to obtain IP address automatically."
				},
				{
					type: "paragraph",
					content: "Click Save to save all your settings."
				}
			]
		},


		DHCP_SERVER_CLIENT: {
			TITLE: "DHCP Client List",
			CONTENT: [
				{
					type: "paragraph",
					content: "Displays the following information of each DHCP client that is connected to the repeater."
				},
				{
					type: "name",
					title: "Client Name",
					content: "The name of the DHCP client."
				},
				{
					type: "name",
					title: "MAC Address",
					content: "The MAC address of the DHCP client."
				},
				{
					type: "name",
					title: "Assigned IP Address",
					content: "The IP address that is allocated to the client by the DHCP server."
				},
				{
					type: "name",
					title: "Lease Time",
					content: "The time duration that the IP address is leased to the DHCP client."
				},
				{
					type: "name",
					title: "Refresh",
					content: "Click this button to update the DHCP Client List."
				},
			]
		},

		RESERVED_IP_ADDRESS: {
			TITLE: "Address Reservation",
			CONTENT: [{
				type: "paragraph",
				content: "You can manually reserve an IP address for a client that is connected to the device. Once reserved, the IP address will only be assigned to the same client by the DHCP server."
			},
			{
				type: "name",
				title: "MAC Address",
				content: "Displays the MAC address of the client with DHCP reserved IP address."
			},{
				type: "name",
				title: "Reserved IP Address",
				content: "Displays the reserved IP address of the client."
			},{
				type: "name",
				title: "Description",
				content: "Displays a description of the client device."
			},{
				type: "name",
				title: "Status",
				content: "Displays the current status (enabled or disabled) of the client device."

			},{
				type: "name",
				title: "Modify",
				content: "Displays options to Modify or Delete the corresponding client."

			},{
				type: "step",
				title: "To reserve an IP address",
				content:[
				 "1. Click Add.",
				 "2. Enter the MAC address of your desired client.",
				 "3. Enter the IP address that you want to reserve for the client.",
				 "4. Enter a description for the client.",
				 "5. Select Enable This Entry.",
				 "6. Click OK."
				]
			},{
				type: "step",
				title: "To modify or delete an existing client",
				content: "In the table, click the Edit icon or the Trash icon that corresponds to the client that you wish to modify or delete."
			}]

        },
		
		TIME_ZONE: {
			TITLE: "Time Settings",
			CONTENT: [
				{
					type: "name",
					title: "Time Zone",
					content: "Select your local time zone of your location from the drop-down menu."
				}
			]
		},

		LED_CONTROL_SETTINGS: {
			TITLE: "LED Control",
			CONTENT: [
				{
					type: "name",
					title: "Enable Night Mode",
					content: "Select this checkbox to turn off LEDs during Night Mode Period without affecting the device's performance."
				},
				{
					type: "name",
					title: "Night Mode Period",
					content: "Specify a time period during which the night mode applies."
				}
			]
		},

		FIRMWARE_UPGRADE: {
			TITLE: "Firmware Upgrade",
			CONTENT: [{
				type: "paragraph",
				content: "Before upgrading the firmware of the device, you will need to download the latest firmware update from the <a class=\"link\" href=\"http://www.tp-link.com/en/Support/\" target=\"_blank\">TP-LINK Support</a> website to your computer."
			},{
				type: "step",
				title: "IMPORTANT: To prevent upgrade failure, please note the following:",
				content: [
					"Make sure the latest firmware file is matched with the hardware version (as shown under the Firmware Upgrade page).",
					"Make sure that you have a stable connection between the device and your computer. It is NOT recommended to upgrade the firmware wirelessly.",
					"Make sure you remove any USB storage device connected to the device before the firmware upgrade to prevent data loss.",
					"Backup your device configuration.",
					"Do NOT turn off the device during the firmware upgrade."
				]
			},{
				type: "step",
				title: "To upgrade the device's firmware",
				content: [
					"1. Click Browse.",
					"2. Locate and select the downloaded firmware file.",
					"3. Click Upgrade."
				]
			},{
				type: "paragraph",
				content: "The upgrade process takes a few minutes to complete. Please do NOT power off the device while the upgrade is in progress."
			}]
		},


		BACKUP_RESTORE_BACKUP: {
			TITLE: "Backup",
			CONTENT: [
				{
					type: "paragraph",
					content: "It is highly recommended to backup your current configurations, in case a recovery is needed to restore the system to a previous state or from the factory defaults."
				},
				{
					type: "paragraph",
					content: "Click Backup to save your current configurations to your computer. Make sure to save the backup file to a safe location that you can retrieve and restore the device later, if needed. "
				}
			]
		},


		BACKUP_RESTORE_RESTORE: {
			TITLE: "Restore",
			CONTENT: [
				{
					type: "step",
					title: "To restore from a backup",
					content: [
						"1. Click Browse.",
						"2. Locate and select the backup file.",
						"3. Click Restore."
					]
				}
			]
		},

		BACKUP_RESTORE_FACTORY: {
			TITLE: "Factory Default Restore",
			CONTENT: [
				{
					type: "paragraph",
					content: "Click Factory Restore to reset your device to its factory default settings."
				},
				{
					type: "note",
					title: "Note",
					content: [
						"1. Factory Restore will erase all settings that you have configured for the device. To re-login to the device's management page, use the default admin for both username and password.",
						"2. Please do NOT power off the device during the backup or restore process."
					]
				}
			]
		},


		ADMIN_ACCOUNT: {
			TITLE: "Account Management",
			CONTENT: [
				{
					type: "paragraph",
					content: "This page allows you to change your login username/password."
				},
				{
					type: "name",
					title: "Old Username",
					content: "Enter your current username."
				},
				{
					type: "name",
					title: "Old Password",
					content: "Enter your current password."
				},
				{
					type: "name",
					title: "New Username ",
					content: "Enter your new username."
				},
				{
					type: "name",
					title: "New Password",
					content: "Enter your new password."
				},
				{
					type: "name",
					title: "Confirm New Password",
					content: "Enter your new password again."
				},
				{
					type: "note",
					title: "Note",
					content: "If you decide to change the current username and password used to login to the device, make sure to write down the new login information in a secure location."
				}
			]
		},



		SYSTEM_LOG: {
			TITLE: "System Log",
			CONTENT: [
				{
					type: "paragraph",
					content: "The System Log page displays a list of the most recent activities (events) of the device. You can define what types of logs and/or the level of logs you want to view."
				},
				{
					type: "name",
					title: "Type",
					content: "Select the type of system log to display."
				},
				{
					type: "name",
					title: "Level",
					content: "Select the level of system log to display."
				},
				{
					type: "name",
					title: "Refresh",
					content: "Click this icon to update the system log."
				},
				{
					type: "name",
					title: "Delete All",
					content: "Click this icon to delete all system logs."
				},
				{
					type: "name",
					title: "Save log",
					content: "Click this button to download all system log files to your local computer."
				}
			]
		}

	};
})(jQuery);
