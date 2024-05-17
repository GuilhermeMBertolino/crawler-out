	if (HelpItem=='internet'){ 
		document.getElementById('helpLabel').innerHTML = '<B>Helpful Hints...</B> <BR><BR>' + 
													'If you are new to networking ' + 
													'and have never configured a ' + 
													'router before, click on <B>"setup wizard"</B> '+
													'and the router will run ' + 
													'you through a step by step ' + 
													'process to successfully connect ' + 
													'you to the internet. <BR><BR>' + 
													'If you consider yourself an ' + 
													'advanced user or have ' + 
													'configured a router before,' + 
													'click <A href="wancfg.cmd">Setup-&gt;Internet Setup</A> to ' + 
													'input all the settings ' + 
													'manually.<BR><BR>' + 
													'<A href="helpbasic.html#Wizard">More...</A>'; 
	}
	else if (HelpItem=='wizintro'){
                    document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br>' +
 						  'This wizard will guide you through a step-by-step process to configure your new D-Link router and connect to the Internet.<p>' +
 						  'There are Six steps to configure your router.<p>' + 
			                       'Step 1, in order to protect your security, Change your <%ejGetOther(ProdInfo,ModemVer)%> router password,<p>' + 
			 			  'Step 2, Set Time and Date.<p>' +	
 						  'Step 3, Select Internet connection type, input the information provided by ISP. <p>' + 
 						  'Step 4, Configure Wireless Network.<p>' +	
 						  'Step 5, Configure Local Network. <p>' + 
 						  'Step 6, Connect to Internet and you must restart your router.<p>' +
 						  '<a href="helpbasic.html#Wizard">More...</a>';

	}
     else if (HelpItem=='setupInternet'){
                    document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br>' +
 						  'Please select your Country and ISP, the PVC information will display Automatically.<p>' +
 						  'Of course, you can modify the information if you can not find the country and ISP in the list below, you can select the "Others", then input the "VPI" and "VCI", select the right Connection Type.".<p>' + 
			                        '<a href="helpbasic.html#Wizard">More...</a>';

	}
	else if (HelpItem=='comapply'){
                    document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br>' +
 						  'Now, the setup will be finished. If you ensure the setting information correctly, you can click "Restart" make the setup effect, and the router will reboot.<p>' +
 						  'Of course, you can Click "Back" to review or modify settings.".<p>' + 
			                        '<a href="helpbasic.html#Wizard">More...</a>';

	}
    else if (HelpItem=='InternetPasswd'){
                    document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br>' +
 						  'Please enter your Username and Password as provided by your ISP (Internet Service Provider).<p>' +
 						  'Please enter the information exactly as shown taking note of upper and lower cases. Click Next to continue.".<p>' + 
			                        '<a href="helpbasic.html#Wizard">More...</a>';

	}
	   else if (HelpItem=='wizwl'){
                    document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br>' +
 						  'Your wireless network is enabled by default. You can simply uncheck to disable it and click "Next" to skip configuration of wireless network.<p>' +
 						  'Your wireless network needs a name so it can be easily recognized by wireless clients.For security purposes,it is highly recommended to change the pre-configured network name.".<p>' + 
 						    'Select "Visible" to publish your wireless network and SSID can be found by wireless clients, or select "Invisible" to hide your wireless network so that users need to manually enter SSID in order to connect to your wireless network.<p>' +
 						  'In order to protect your network from hackers and unauthorized users,it is highly recommended you choose one of the following wireless network security settings.".<p>' + 
			                        '<a href="helpbasic.html#Wizard">More...</a>';

	}
	
	else if (HelpItem=='wizpass'){
                                            document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br>' +
 						  'The default password is "admin", in orde to secure your network , please modify the password.<p>' +
 						  '<strong>note:</strong>  Confirm Password must be same as "New Password".<p>' + 
 						  'Of course, you can click  "skip" to ignore the step.<p>' + 
 						  '<a href="helpbasic.html#Wizard">More...</a>'; 
	}else if (HelpItem=='wireless'){ 
		document.getElementById('helpLabel').innerHTML = '<B>Helpful Hints...</B> <BR><BR>' + 
													'Changing your Wireless Network Name is the first step in securing your wireless network. ' + 
													'Change it to a familiar name that does not contain any personal information.<BR><BR>' + 
													'Choosing the <B><FONT color=rgb(108,169,213)>Invisible</FONT></B> option from ' + 
													'<B><FONT color=rgb(108,169,213)>Visisibility Status</FONT></B> is another way to secure your network. ' + 
													'With <B><FONT color=rgb(108,169,213)>Invisible</FONT></B> selected, no wireless clients will be able to see your wireless network ' + 
													"when they scan to see what's available. For your wireless devices to connect to your " + 
													'router, you will need to manually enter the Wireless Network Name on each device. <BR><BR>' + 
													'If you have enabled Wireless Security, make sure you write down the Passphrase that you ' + 
													'have configured. You will need to enter this information on any wireless device that you ' + 
													'connect to your wireless network. <BR><BR>' + 
													'<A href="helpbasic.html#Wireless">More...</A>'; 
	}else if (HelpItem=='lancfg2'){ 
		document.getElementById('helpLabel').innerHTML = '<B>Helpful Hints...</B> <BR><BR>' + 
													'The IP address of your router is the same IP ' + 
													' address you will use to access the web management interface of your router. ' + 
													'If you already have a DHCP server on your network or are using static IP add ' + 
													'on all the devices on your network, click on <B>Disable DHCP Server</B> to disable this feature.<BR><BR>' + 
													'UPnP helps other UPnP LAN hosts interoperate with the router. Leave the UPnP option ' + 
 													'enabled as long as the LAN has other UPnP applications.<BR><BR>' + 
 													'<A href="helpbasic.html#Wizard">More...</A>'; 
	}else if (HelpItem=='wancfghelp'){ 
		document.getElementById('helpLabel').innerHTML = '<B>Helpful Hints...</B> <BR><BR>' + 
													'When configuring the router to access the Internet, be sure to choose the correct ' + 
 													'<B><FONT color=rgb(108,169,213)>Connection Type</FONT></B> from the list below. If you are unsure of which option ' + 
 													'to choose, contact your <B>Internet Service Provider (ISP)</B>. <BR><BR>' + 
 													'If you are having trouble accessing the Internet through the router, double check ' + 
 													'any settings you have entered on this page and verify them with your ISP if needed.<BR><BR>' + 
 													'<A href="helpbasic.html#Internet">More...</A>'; 
	}else if (HelpItem=='datetime'){ 
		document.getElementById('helpLabel').innerHTML = '<B>Helpful Hints...</B> <BR><BR>' + 
													'Good timekeeping is important for accurate logs and scheduled firewall rules.<BR><BR>' + 
 													"Click on the 'Copy your Computer's ...' button will copy your PC's current time.<BR><BR>"+ 
 													'<A href="helpbasic.html#Wizard">More...</A>'; 
 	}else if (HelpItem=='wancfghelp2'){ 
 		document.getElementById('helpLabel').innerHTML = '<B>Helpful Hints...</B> <BR><BR>' + 
 													'IGMP (Internet Group Management Protocol, join/leave) is a communications protocol used ' + 
 													'to manage the membership of Internet Protocol multicast groups. "IGMP proxy(multicast)" feature ' + 
 													'needs to be enabled for the device(L2 switch) to support multimedia ' + 
 													'applications (transmitter/media server &amp; receivers/IPSTBs) w/ multicast ' + 
 													'capability, i.e. IPTV, on-line gaming etc.<BR><BR>'+ 
 													'<A href="helpbasic.html#Internet">More...</A>'; 
 	}else if (HelpItem=='wancfghelp3'){ 
 		document.getElementById('helpLabel').innerHTML = '<B>Helpful Hints...</B> <BR><BR>' + 
 													'Note:Be sure to restart the router for the new Internet Setting to take effect.<BR><BR>' + 
 													'<A href="helpbasic.html#Internet">More...</A>'; 

	/* 20081215, Lily, modify for bug 4429 for help info error, mark: 12151603*/				
	}else if (HelpItem=='wlbasic'){ 
		document.getElementById('helpLabel').innerHTML = '<B>Helpful Hints...</B> <BR><BR>' + 
					'Changing your Wireless Network Name is the first step in securing your wireless network. ' + 
					'Change it to a familiar name that does not contain any personal information.' + '<BR>' + 
					'Checking  the <B><FONT color=rgb(108,169,213)> 	Hide Access Point</FONT></B> is another way to secure your network. '+ 
					'With Hide the Access Point, no wireless clients will be able to see your wireless network ' + 
					"when they scan to see what's available. For your wireless devices to connect to your router, "+
					'you will need to manually enter the Wireless Network Name on each device..<BR><BR>'+ 
					'<A href="helpbasic.html#Wireless">More...</A>';  
	}
	else if(HelpItem=='wlsecurity')
		{
		document.getElementById('helpLabel').innerHTML = '<B>Helpful Hints...</B> <BR><BR>' + 
					'If you have enabled Wireless Security, make sure you write down the '+
					'Passphrase that you have configured. '+
					'You will need to enter this information on any wireless device that '+
					'you connect to your wireless network..<BR><BR>' + 
					'<A href="helpbasic.html#Wireless">More...</A>';  
		}
       /* 20081215, Lily, end---------------------------------- mark: 12151603*/

else if (HelpItem=='Print'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'The Print Server Configuration option allows you to configure, update, and maintain the correct Print Server settings.<br><br>' +
					'<a href="helpadvanced.html#Print">More...</a>';

}
else if (HelpItem=='USB'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'Device drivers and the D-Link USB Network Utility must be installed on each computer that will use the device.<br><br>'+ 
					'If you have trouble accessing the Internet through the router. Double check the settings you entered on this page and verify with your Internet Service Provider (ISP) if needed.<br><br>' +
					'<a href="helpbasic.html#USB">More...</a>';

}
else if (HelpItem=='ipv6'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'When configuring the router to access the IPv6 Internet, be sure to choose the correct IPv6 Connection Type from the drop down menu. If you are unsure of which option to choose, contact your Internet Service Provider (ISP).<br><br>'+ 
					'If you are having trouble accessing the IPv6 Internet through the router, double check any settings you have entered on this page and verify them with your ISP if needed..<br><br>' +
					'<a href="helpbasic.html#ipv6">More...</a>';

}
else if (HelpItem=='ipv6wizard'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'This wizard will guide you through a step-by-step process to configure a new connection to the IPv6 Internet.<br><br>'+ 
					'Step 1 : Configure your IPv6 Internet Connection  <br><br>' +
					'Step 2 : Save Settings and Connect <br><br>' +
					'<a href="helpbasic.html#ipv6">More...</a>';
}
else if (HelpItem=='ipv6wizselect'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'Please select your IPv6 Internet Connection type:<br><br>'+ 
					'<B>IPv6 over PPPoE </B><br>'+ 
					'Choose this option if your IPv6 Internet connection requires a username and password to get online. Most DSL modems use this type of connection.<br><br>'+
					'<B>Static IPv6 address and Route</B><br>'+ 
					'Choose this option if your Internet Service Provider(ISP) provided you with IPv6 address information that has to be manually configured.<br><br>'+
					'<B>Tunneling Connection (6rd)</B><br>'+
					'Choose this option if your Internet Service Provider(ISP) provided you a IPv6 Internet connection by using 6rd automatic tunneling mechanism.<br><br>'+
					'<a href="helpbasic.html#ipv6">More...</a>';
}
else if (HelpItem=='ipv6wizpppoe'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'To set up this connection you will need to have a Username and Password from your IPv6 Internet Service Provider. If you do not have this information, please contact your ISP.<br><br>'+ 
					'<a href="helpbasic.html#ipv6">More...</a>';
}
else if (HelpItem=='ipv6wizsuccess'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'The IPv6 Internet Connection Setup Wizard has completed. Click the Connect button to save your settings and \'reboot\' the router.<br><br>'+ 
					'<a href="helpbasic.html#ipv6">More...</a>';
}

