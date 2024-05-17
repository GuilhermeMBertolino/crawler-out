if (HelpItem=='firmware'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' +
					'<b>Please Note:</b> As firmware is often ' +
					'released to correct a specific issue, it is recommended that there is no need ' +
					'to update your firmware if you are not experiencing any technical concerns ' +
					'or difficulties in the operation of your product.<br><br>' +
					'<a href="helpmaintenance.html#Firmware">More...</a>';

} else if (HelpItem=='system'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' +
					'This page allows you to reboot your router or save your router configuration to a file on ' +
					'your computer as a precaution in case you have to reset your router to factory default settings. ' +
					'You will be able to restore your router settings from a previously saved configuration file.<br>' +
					'There is also a function to allow you to reset your router to factory default settings.  ' +
					'Resetting your router to factory default settings will erase your current configuration<br><br>' +
					'<a href="helpmaintenance.html#System">More...</a>';

} else if (HelpItem=='diag'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' +
					'The tests on this page can be used to verify whether ' +
					'or not your router is working correctly. If you have rerun the tests and consulted ' +
					'the help file and you are still experiencing difficulties, please contact D-link or visit ' +
					'our support website at support.dlink.com<br><br>' +
					'<a href="helpmaintenance.html#Diag">More...</a>';

} else if (HelpItem=='acservice'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' + 
					'FTP - File transfer Protocol - often used to connect to ' +
					'FTP sites for file transfer.<br><br>' +
					'HTTP - Hyper Text Transfer Protocol - the principal protocol for web browsing.<br><br>' +
					'ICMP - Internet control Message Protocol - Work in conjunction with HTTP - this protocol ' +
					'is used in the generation of error messages and control.<br><br>' +
					'SNMP - Simple Network management Protocol - allows ' +
					'you to control and monitor your network devices.<br><br>' +
					'SSH - Secure Shell a protocol that allows you to log on to a remote server securely.<br><br>' +
					'Telnet - a common protocol used to access remote systems.<br><br>' +
					'TFTP - Trivial File Transfer Protocol - simplified and less secure protocol compared to FTP.<br><br>' +
					'If you wish to login and manage your Router from another Internet device than you can ' +
					'enable the router to accept such commands from the Internet port. This option may be useful ' +
					'if your network administrator is not onsite or Technical Support request such access<br><br>' +
					'<a href="helpmaintenance.html#Access">More...</a>';

} else if (HelpItem=='acadmin'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' +
					'For security reasons, it is recommended that you change the password ' + 
					'for the Admin and User accounts. Be sure to write down the new passwords ' +
					'to avoid having to reset the router in case they are forgotten.<br><br>' +
					'<a href="helpmaintenance.html#Access">More...</a>';

} else if (HelpItem=='acip'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' +
					'You can restrict users who can access the local management using IP address.<br><br>' +
					'Note: Be sure to add your IP Address in the list before you enable the service.<br><br>' +
					'<a href="helpmaintenance.html#Access">More...</a>';

} else if (HelpItem=='acs'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' +
					'Remote Management by default should be disabled. However if you wish to login and manage your Router from another Internet device then you can enable the router to accept such commands from the Internet port. This option may be useful if your network administrator is not onsite or Technical Support request such access.<br><br>' +
					'<a href="helpmaintenance.html#Access">More...</a>';

} else if (HelpItem=='syslog'){
  document.getElementById('helpLabel').innerHTML = '<b>Helpful Hints...</b> <br><br> ' +
					'You can set both the <b>Log Level</b> and <b>Display Level</b> to match your needs, ' +
					'with <b>Emergency</b> as the highest level and <b>Debugging</b> as the lowest.<br><br>' +
					'<a href="helpmaintenance.html#SystemLog">More...</a>';

}

