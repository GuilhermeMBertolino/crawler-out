if (HelpItem=='webfilter'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'Create a list of websites that you would like the devices on ' +
					'your network to be allowed or denied access to.<br><br>' +
					'<a href="helpadvanced.html#Parental">More...</a>';

} else if (HelpItem=='ddns'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'DDNS - This stands for Dynamic DNS.<br> ' +
					'By creating a static hostname, users will be able to point to this in order to access ' +
					'a dynamic IP address from anywhere in the world.<br><br>' +
					'<b>Note:</b>In some cases DDNS service require you to open the WAN http service in ' +
					'<a href="scsrvcntr.cmd?action=view">Maintenance -> Access Control -> Services</a>.<BR><BR>' +
					'<a href="helpadvanced.html#DDNS">More...</a>';

} else if (HelpItem=='wirelessadv'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'It is recommended that you leave these parameters at their default values. ' +
					'Adjusting them could limit the performance of your wireless network. <br><br>' +
					'Selecting Auto in <b><font color="rgb(108,169,213)">Channel</font></b> allows the router to select the best possible channel for your ' +
					'wireless network to operate on.<br><br>' +
					'<a href="helpadvanced.html#WirelessAdv">More...</a>';

} else if (HelpItem=='portforwarding'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'Check the Application Name drop down menu for a list of predefined applications.<br><br>' +
					'<a href="helpadvanced.html#PortForwarding">More...</a>';

} else if (HelpItem=='porttriggering'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'Use this feature if you are trying to execute one of the listed ' +
					'network applications and it is not communicating as expected.<br><br>' +
					'Check the Application Name drop down menu for a list of predefined applications.<br><br>' +
					'<a href="helpadvanced.html#PortTriggering">More...</a>';

} else if (HelpItem=='dmz'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'Enable the DMZ option only as a last resort. If you are having trouble ' +
					'using an application from a computer behind the router, first try opening ' +
					'ports associated with the application in the <a href="scvrtsrv.cmd?action=view">Advanced -> Port Forwarding</a> section.<br><br>' +
					'<a href="helpadvanced.html#DMZ">More...</a>';

} else if (HelpItem=='infilter'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'Each rule can <b>Allow</b> access from the WAN.<br><br>' +
					'Click the <b>Remove</b> checkbox in the Rules List then click on the <b>Remove</b> button ' +
					'to permanently remove a rule.<br><br>' +
					'<a href="helpadvanced.html#Filter">More...</a>';

} else if (HelpItem=='infilteradd'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
                    'Give each rule a <b>"Name"</b> that is meaningful to you.<br><br>' +
                    'The Source IP addresses are WAN-side address and the Destination ' +
                    'IP address are LAN-side address<br><br>' +
                    'Click the <b>Apply</b> button to store a finished rule in the Rules List.<br><br>' +
                    '<a href="helpadvanced.html#Filter">More...</a>';

} else if (HelpItem=='outfilter'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'Each rule can <b>Deny</b> outgoing traffic from the LAN.<br><br>' +
					'Click the <b>Remove</b> checkbox in the Rules List then click on the <b>Remove</b> button ' +
					'to permanently remove a rule.<br><br>' +
					'<a href="helpadvanced.html#Filter">More...</a>';

} else if (HelpItem=='outfilter'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'Give each rule a <b><font color="rgb(108,169,213)">Name</font></b> that is meaningful to you.<br><br>' +
					'The Source IP addresses are LAN-side address and the Destination ' +
					'IP address are WAN-side address<br><br>' +
					'Click the <b>Apply</b> button to store a finished rule in the Rules List.<br><br>' +
					'<a href="helpadvanced.html#Filter">More...</a>';

} else if (HelpItem=='macfilter'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'Create a list of MAC addresses that you would either like to allow or deny access to your ' +
					'network depending on the current <b><font color="rgb(108,169,213)">Global Policy</font></b>.<br><br>' +
					'<a href="helpadvanced.html#Filter">More...</a>';

} else if (HelpItem=='macfilteradd'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'<b>Note :</b> You must first create a <b>Bridged</b> connection to use <b>Bridge Filter</b>.<br><br>' +
					'You can create a <b>Bridged</b> connection by going to ' +
					'<a href="internet.html">Setup -> Internet Setup</a>.<BR><BR>' +
					'<a href="helpadvanced.html#Filter">More...</a>';

} else if (HelpItem=='wlmacfilter'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'Create a list of MAC addresses that you would either like to allow or deny users access to '+
					'the wireless router. Click on Remove if you want to take out a MAC address from the MAC filter list.<br><br>' +
					'<a href="helpadvanced.html#WirelessAdv">More...</a>';

} else if (HelpItem=='wlmacfilteradd'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'Create a list of MAC addresses that you would either like to allow or deny users access to '+
					'the wireless router.<br><br>' +
					'<a href="helpadvanced.html#WirelessAdv">More...</a>';

} else if (HelpItem=='wlbridge'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'You can select AP mode to Access Point or Wireless Brdige mdoe by this feature.  ' +
					'Selecting Enabled or Enabled(Scan) enables of wireless bridge restriction, and only those bridges selected in Remote Bridges will be granted access. <br><br> ' +
					'Select Disabled in Bridge Restrict which disables wireless bridge restriction. <br><br>' +
					'Wireless bridge support only the repeaters which have same channel with it. <br><br>' +
					'<a href="helpadvanced.html#WirelessAdv">More...</a>';

} else if (HelpItem=='wlqos'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'You can give multimedia applications a higher quality of service and priority ' +
					'in a wireless network so applications such as videos will be of higher quality. <br><br>' +
					'Enabling WMM may delay the network traffic of other lower assigned quality applications.<br><br>' +
					'<a href="helpadvanced.html#WirelessAdv">More...</a>';

} else if (HelpItem=='wlqosadd'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'Give each rule a name that is meaningful to you. <br><br>' +
					'<a href="helpadvanced.html#WirelessAdv">More...</a>';

} else if (HelpItem=='tod'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'Give each rule a name that is meaningful to you. For example, a schedule for Monday ' +
					'through Friday from 3:00pm to 9:00pm, might be called "After School" and enter the MAC address ' +
					'that you want to deny access to the internet.<br><br>' +
					'<a href="helpadvanced.html#Parental">More...</a>';

} else if (HelpItem=='dns'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
                    'If <b>"Obtain DNS server address automatically"</b> selected, this router will accept ' +
                    'the first received DNS assignment from one of the PPPoA, PPPoE or MER/DHCP enabled ' +
                    'PVC(s) during the connection establishment. If <b>"Use the following DNS server addresses"</b> is selected, enter the ' +
                    '<b>"Preferred DNS server"</b> and optional <b>"Alternate DNS server"</b> IP addresses.<br><br>' +
                    '<a href="helpadvanced.html#DNS">More...</a>';

} else if (HelpItem=='portmap'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'To use this feature, mapping groups should be created. <br>' +
					'If you need to remove an entry, then click on the Remove button.<br><br>' +
					'<a href="helpadvanced.html#Network">More...</a>';

} else if (HelpItem=='qosadd'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'<b><font color="rgb(108,169,213)">Assign ATM Priority and/or IP Precedence and/or Type Of Service for the class</font></b><br>' +
                  	'If non-blank value is selected for <b><font color="rgb(108,169,213)">Mark IP Precedence</font></b> and/or <b><font color="rgb(108,169,213)">Mark IP Type Of Service</font></b>, ' +
					'the correcponding TOS byte in the IP header of the upstream packet is overwritten by the ' +
					'selected value.<br><br> If Differentiated Service Configuration checkbox is selected, ' +
					'you will only need to assign <b><font color="rgb(108,169,213)">ATM priority</font></b>. <b><font color="rgb(108,169,213)">IP Precedence</font></b> will not be used for classification. ' +
					'IP TOS byte will be used for DSCP mark.<br><br>' +
					'<a href="helpadvanced.html#Network">More...</a>';

} else if (HelpItem=='adslsetting'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'Do not change these settings unless directed by your ISP.<br><br>' +
					'<a href="helpadvanced.html#Network">More...</a>';

} else if (HelpItem=='snmp'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'Provides a means to monitor status and performance as well as set configuration parameters.<br><br>' +
					'<a href="helpadvanced.html#Network">More...</a>';

} else if (HelpItem=='certificatelocal'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'A local certificate identifies your router over the network.<br><br>' +
					'<a href="helpadvanced.html#Network">More...</a>';

} else if (HelpItem=='certificateca'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'Trusted certificate authority (CA) allows you to verify the certificates of your peers.<br><br>' +
					'<a href="helpadvanced.html#Network">More...</a>';

} else if (HelpItem=='staticroute'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'You can select what gateway to use, by interface or by specifying a gateway.<br><br>' +
					'<a href="helpadvanced.html#Routing">More...</a>';

} else if (HelpItem=='dfltgateway'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'<b>NOTE</b>: If changing the Automatic Assigned Default Gateway from unselected to selected, ' +
					'You must reboot the router to get the automatic assigned default gateway.<br><br>' +
					'<a href="helpadvanced.html#Routing">More...</a>';

} else if (HelpItem=='dos'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'If <b><font color="rgb(108,169,213)">Enable Attack Prevent</font></b> checkbox is selected, the router will detect some attacks. ' +
               		'When the router detects attack, it will drop the packets and log them in the "System log".<br><br>' +
        			'If <b><font color="rgb(108,169,213)">Prevent IP Spoofing</font></b> checkbox is selected, the router will drop the packets from WAN interface ' +
               		'with private source IP address. The private IP address ranges are as: 10.0.0.0/8, 172.16.0.0/12, ' +
               		'and 192.168.0.0/16.<br><br>' +
					'<a href="helpadvanced.html#Firewall">More...</a>';

} else if (HelpItem=='tr069'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'Provides a means to monitor status and performance as well as set configuration parameters ' +
					'from WAN side.<br><br>' +
					'<a href="helpadvanced.html#Routing">More...</a>';

} else if (HelpItem=='rip'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'Enabling RIP provides a protocol that determines the best path to a target by estimating ' +
					'the distance in number of hops or intermediate routers.<br><br>' +
					'<a href="helpadvanced.html#Routing">More...</a>';

} else if (HelpItem=='igmp'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'With IGMP Snooping enabled, the device (L2 switch) can make intelligent multicast ' +
					'forwarding (only) toward those hosts, i.e. IPSTBs etc., which request to join (as members of) '+
					'a specific multicast group, i.e. a IPTV channel etc., within the broadbast ' + 
					'domain(same PVC/VLAN). As a result, it significantly reduces traffic flooding upon ' +
					'interfaces which are not registered as receivers of specific multicast group.<br><br>' +
					'<a href="helpadvanced.html#Network">More...</a>';

} else if (HelpItem=='portmapadd'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'You can map PVC1 to port 1~3 to create a network(broadcast domain) for PCs toward Internet, ' +
					'and map PVC2 to port 4 to create another network(broadcast domain) for IPTV service(devices).<BR><BR> ' +
					'Note that the selected interfaces will be removed from their existing groups and added ' +
					'to the new group.<br><br>' +
					'IMPORTANT If a vendor ID is configured for a specific client device, ' +
            		'please REBOOT the client device attached to the modem to allow it to ' +
            		'obtain an appropriate IP address.<BR><BR>' +
					'<a href="helpadvanced.html#Network">More...</a>';

} 
else if (HelpItem=='budget'){
 document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br>' + 
						 'This page allows setting of the limitation quota to control LAN/WAN interface traffic. Click the checkbox to enable the functions;  click Save/Apply  button to save and apply the setting values;<p>' + 
                         'Click Reset button to set the Received/Transmitted traffic values to default and update the start router time. <p>' + 
                         '<a href="helpadvanced.html#Budget">More...</a>';
}
else if (HelpItem=='PWRManagement'){
 document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br>' + 
						 'This page allows the control of hardware modules to evaluate the power consumption. Use the control buttons to select the desired option, click "Apply" and check the status response.;<p>' + 
                         'Click Reset button to set the setting values to default. <p>' + 
                         '<a href="helpadvanced.html#PWRManagement">More...</a>';
}
else if (HelpItem=='trusted'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'Enter the trusted users\' IP address range and click \"Apply\" to enable trusted computers. <br><br>Clear the IP address field and click \"Apply\" to disable trusted computers.<br><br>' +
					'<a href="helpadvanced.html#Parental">More...</a>';

}
else if (HelpItem=='Schedules'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'Schedules are used by Firewall Setting, includeing Port Forwarding, Port Triggering, Parental Control, and Filtering Options.<br><br>' +
					'<a href="helpadvanced.html#Schedules">More...</a>';

}

else if (HelpItem=='protected'){
 document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br>' + 
						 'Enable if other wireless devices you wish to include in the local network support Wi-Fi Protected Setup. Only "Admin" account can change security settings. Lock Wireless Security Settings after all wireless network devices have been configured.<p>' + 
						 'Click Add Wireless Device Wizard to use Wi-Fi Protected Setup to add wireless devices to the wireless network. <p>' + 
						 '<a href="helpadvanced.html#Protected">More...</a>';
}else if (HelpItem=='diwireless'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints</b> <br><br>' +
                                        'Changing your Wireless Network Name (SSID) is the first step in securing your wireless network.  Change it to a familiar name that does not contain any personal information.<BR><BR> ' +
                                        'Enable Auto Channel Scan so that the router can select the best possible channel for your wireless network to operate on.<BR><BR> ' + 'Choosing to hide your wireless network also helps to secure your wireless network, it will mean that wireless clients will not see your network listed when they scan for available networks.  To connect your wireless devices to the router you will need to manually enter the Wireless Network Name (SSID) on each device.  (Please take a note of your SSID and keep it to hand).<BR><BR>' + 
                                        'If you have enabled wireless security, please make sure you take a note of your encryption key.  You will need to enter this and the SSID on any wireless device that you connect to your network.<br><br>' + '<a href="helpadvanced.html#WirelessAdv">More</a>';
}else if (HelpItem=='ipv6routing'){
 document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br>' + 
 	 					 'Enter the destination network address, Prefix Length, subnet mask, gateway AND/OR available WAN interface then click \"Apply\" to add the entry to the routing table.<br><br>' +
						 '<a href="helpadvanced.html#ipv6routing">More...</a>';

}
else if (HelpItem=='ipv6firewall'){
 document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br>' + 
 						 'For each rule you can create a name and control the drection of traffic.You can also allow or deny a range of IP Addresses,the protocol and a port range.<br><br>' +
 						 'In order to apply a schedule to a Firewall rule,your must first define a schedule on the Advance->Schedules.<br><br>' +
						 '<a href="helpadvanced.html#ipv6firewall">More...</a>';

}
