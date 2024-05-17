if (HelpItem=='deviceinfo'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'All of your Modem\'s Information, WLAN, WAN and LAN status and details are shown here.<br><br>' +
					'Details include firmware version, Modem MAC address, Default gateway, WLAN SSID, ' +
					'WLAN security type, Modem IP and etc.<br><br>' +
					'<a href="helpstatus.html#DeviceInfo">More...</a>';

} else if (HelpItem=='wirelessclient'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'This is a list of all wireless clients that are currently connected to your wireless router.<br><br>' +
					'<a href="helpstatus.html#WirelessClients">More...</a>';

} else if (HelpItem=='dhcpclient'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'This is a list of all LAN clients that are assigned IP addresses by DHCP service and currently connected to your router.<br><br>' +
						'<a href="helpstatus.html#DHCPClients">More...</a>';

} else if (HelpItem=='log'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'Check the log frequently to detect unauthorized network usage.<br><br>' +
					'<a href="helpstatus.html#Logs">More...</a>';

} else if (HelpItem=='statistic'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'This is a summary of the number of packets that have passed between ' +
					'the WAN and the LAN since the router was last initialized.<br><br>' +
					'<a href="helpstatus.html#Statistics">More...</a>';

} else if (HelpItem=='routinginfo'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'This is a list of the ADSL router\'s routing table.<br><br>' +
					'<a href="helpstatus.html#RouteInfo">More...</a>';
} else if (HelpItem=='voice_status'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'This is a list of the voice status.<br><br>' +
					'<a href="helpstatus.html#VoiceStatus">More...</a>';
} else if (HelpItem=='IPv6_status'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'All of your WAN and LAN connection details are displayed here.<br><br>' +
					'<a href="helpstatus.html#IPv6_status">More...</a>';
} else if (HelpItem=='ipv6routestatus'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'This is a list of the ADSL router\'s IPv6 routing table.<br><br>' +
					'<a href="helpstatus.html#ipv6routestatus">More...</a>';
}

