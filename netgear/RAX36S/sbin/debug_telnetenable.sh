#!/bin/sh

#Enable telnet
telnet_enable()
{
	if [ "$1" = "start" ];then
		if [ "`/bin/config get bcm_mtool_telnet_login_enable`" = "1" ]; then
			/usr/sbin/utelnetd -d -i br0 -l /bin/sh
		else
			/usr/sbin/utelnetd -d -i br0
		fi
	else
		killall utelnetd	
	fi
}

telnet_enable $1
