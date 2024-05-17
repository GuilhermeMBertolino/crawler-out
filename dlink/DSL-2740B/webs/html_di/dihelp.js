if (HelpItem=='diwan'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br>' +
                                        'First time users are recommended to run the Setup Wizard.  Click the Setup Wizard button and you will be guided step by step through the process of setting up your ADSL connection.<br><br>' +
                                        'Tick the Manual Setup box if you are a more advanced user and have the settings for your Internet Service Provider (ISP) available.<br><br>' +
                                        'Please take care when entering your username and password as these are case sensitive.  The majority of connection issues are caused by incorrect username or password combinations.<br><br> '+
                                        '<a href="helpbasic.html#Internet">More...</a>';
}else if (HelpItem=='diwireless'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints</b> <br><br>' +
                                        'Changing your Wireless Network Name (SSID) is the first step in securing your wireless network.  Change it to a familiar name that does not contain any personal information.<BR><BR> ' +
                                        'Enable Auto Channel Scan so that the router can select the best possible channel for your wireless network to operate on.<BR><BR> ' + 'Choosing to hide your wireless network also helps to secure your wireless network, it will mean that wireless clients will not see your network listed when they scan for available networks.  To connect your wireless devices to the router you will need to manually enter the Wireless Network Name (SSID) on each device.  (Please take a note of your SSID and keep it to hand).<BR><BR>' + 
                                        'If you have enabled wireless security, please make sure you take a note of your encryption key.  You will need to enter this and the SSID on any wireless device that you connect to your network.<br><br>' + '<a href="helpbasic.html#Wireless">More</a>';
}else if (HelpItem=='dilan'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br>' +
                                        'If you already have a DHCP server on your network or are using static IP addresses on all the devices on your network,uncheck <b>Enable DHCP Server</b> to disable this feature.<BR><BR> ' + 'If you have devices on your network that should always have fixed IP addresses, add a <b>DHCP Reservation</b> for each such device.<br><br>' + '<a href="helpbasic.html#Local">More...</a>';
}else if (HelpItem=='diblock'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br>' +
                                        'You can quickly enable access to the Internet during times restricted by Internet Access Time Restrictions by ticking the boxes under Allow and clicking Save Settings. Remember to put the ticks back into the Deny boxes to start the Time Restrictions again. <br><BR> ' + '<a href="helpbasic.html#Parental">More...</a>';

}else if (HelpItem=='didatetime'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br>' +
                                        'Making sure you have the correct time and date will enable you to accurately set up the Time Restrictions in the Parental Control section.<br><br>' +
                                        'Enable Daylight Saving to ensure the router maintains the correct time throughout the year.<BR><BR> '+
                                        '<a href="helpbasic.html#Time">More...</a>';
}else if (HelpItem=='diadvwlan'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br>' +
                                        'By default these options need not be changed for this router to operate with Wireless.For the option Transmit Power is the radio signal strength. You will need to decrease the power if you add an new high gain antenna, as this will exceed operating limits.<br><br>' +

                                        '<a href="helpadvanced.html#WirelessAdv">More...</a>';
}else if (HelpItem=='diadvlan'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br>' +
                                        'UPnP is used for many popular Audio Visual software. It allows the auto discovery of your device on the network. If you feel that UPnP is security concern we give you the option to disable it here. Block ICMP Ping should be enabled so that the router does not respond to malicious Internet requests. Multicast streams are used by advance network functions like IPTV and distributed by your ISP. <BR><BR> '+
                                        '<a href="helpadvanced.html#LANAdv">More...</a>';

}else if (HelpItem=='difwdmz'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br>' +
                                        'Enable the DMZ option only as a last resort. If you are having trouble using an application from a computer behind the router. As you placed outside the protect of the Firewall. The IP address entered. While by default have all port request fowrarded to it. It should only be used as a troubleshooting tool. For short periods of time.<BR><BR>' +
										//'Non-UDP/TCP/ICMP LAN Sessions is normally enabled. It facilitates single VPN connections to a remote host.<br><br>'+
                                        '<a href="helpadvanced.html#Firewall">More...</a>';

}else if (HelpItem=='diwizintro'){
 document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br>' +
 						  'This wizard will guide you through a step-by-step process to configure your new D-Link router and connect to the Internet.<p>' +
 						  'There are three steps to configure your router.<p>' + 
			 'Step 1, in order to protect your security, Change your <%ejGetOther(ProdInfo,ModemVer)%> router password,<p>' + 
 						  'Step 2, Select Internet connection type, input the information provided by ISP. <p>' + 
 						  'Step 3, you must restart your router.<p>' +
 						  '<a href="helpbasic.html#Internet">More...</a>';

 						  
}else if (HelpItem=='diwizpass'){
 document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br>' +
 						  'The default password is "admin", in orde to secure your network , please modify the password.<p>' +
 						  '<strong>note:</strong>  Confirm Password must be same as "New Password".<p>' + 
 						  'Of course, you can click  "skip" to ignore the step.<p>' + 
 						  '<a href="helpbasic.html#Internet">More...</a>'; 



}else if (HelpItem=='diwizisp'){
document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br>' + 
						  'Please select your Country and ISP, the PVC information will display Automatically. <p>Of course, you can modify the information if you can not find the country and ISP in the list below, you can select the "Others", then input the "VPI" and "VCI", select the  right Connection Type."<p>' +
						  '<a href="helpbasic.html#Internet">More...</a>'; 


}else if (HelpItem=='diwizpppuser'){
document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br>' + 
						   'Please input  "username" and "password" provided by your ISP, and confirm the password is correct.<p>' + 
						   'If you can not go on next step, maybe the username or password is false, you should contact your ISP  right now.<P>'+
						   '<a href="helpbasic.html#Internet">More...</a>'; 


}else if (HelpItem=='diwizsum'){
document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br>' + 
						   'Now, the setup will be finished. If you ensure the setting information correctly, you can click "Restart" make the setup effect, and the router will reboot.<p>' + 
						   'Of course, you can Click "Back" to review or modify settings.<p>'+
						   '<a href="helpbasic.html#Internet">More...</a>'; 


}else if (HelpItem=='diwizprtcl'){
document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br>' + 
						   'Select the appropriate Internet connection type based on the information as provided by your ISP.<p>'+
						   '<a href="helpbasic.html#Internet">More...</a>'; 



}else if (HelpItem=='diwizppp'){
document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br>' + 
						  'Please enter the information exactly as shown taking note of upper and lower cases provided by your ISP. <p>' +
						  'The Auto PVC Scan feature will not work in all cases so please enter the VPI/VCI numbers if provided by the ISP.<p>'+
						  '<a href="helpbasic.html#Internet">More...</a>'; 



}else if (HelpItem=='diwizdyn'){
document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br>' + 
						 'Please enter the appropriate information below as provided by your ISP. The Auto PVC Scan feature will not work in all cases so please enter the VPI/VCI numbers if provided by the ISP.<p>' + 
						 'Maybe, you have to input your PC  MAC address  if ISP requires , and you can click the button to copy it.<p>'+
						 '<a href="helpbasic.html#Internet">More...</a>';


}else if (HelpItem=='diwizstatic'){
document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br>' + 
						 'Please enter the appropriate information below as provided by your ISP.The Auto PVC Scan feature will not work in all cases so please enter the VPI/VCI numbers if provided by the ISP.<p>' + 
						 'You should input correct Ip address, SubnetMask, DefaultGateway and DNS information. By the way, if you select to keep defaultGateway and DNS information blank,  they should been gotten automatically.<p>'+
						 '<a href="helpbasic.html#Internet">More...</a>';

}else if (HelpItem=='diwizreboot'){
document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br>' + 
						 'The wizard page allows you to reboot your router, as well as restore it from  what you have changed. You can also backup your settings at a point when you have completed all your changes.<p>' + 
						 'If you ever need to automatically reconfigure your router,you can then use the saved file to restore to your favoured settings automatically.<p>'+
						 '<a href="helpbasic.html#Internet">More...</a>';


}else if (HelpItem=='portmapping'){
document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br>' + 
						 'Port Mapping supports multiple ports to PVC and bridging groups. Each group will perform as an independent network. To support this feature, you must create mapping groups with appropriate LAN and WAN interfaces using the Add button.<p>' + 
						 'The Remove button will remove the grouping and add the ungrouped interfaces to the Default group. Only the default group has IP interface.<p>'+
						 '<a href="helpadvanced.html#PortMapping">More...</a>';


}else if (HelpItem=='routing'){
document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br>' + 
						 'The Routing page allows you to set default gateway or Automatic Assigned Default Gateway. <p>' + 
						 '<a href="helpbasic.html#Internet">More...</a>';


}else if (HelpItem=='dispace'){
document.getElementById('helpLabel').innerHTML = '<br>';


}else if (HelpItem=='diwaninterface'){
document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br>' + 
						 'Configuring a ADSL or Ethernet interface before you add a wan connection.<p>' + 
                                                 '<a href="helpbasic.html#Internet">More...</a>';

}





