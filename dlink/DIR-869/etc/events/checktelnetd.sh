#!/bin/sh

orig_devconfsize=`xmldbc -g /runtime/device/devconfsize`

if [ ! "$orig_devconfsize" = "0" ]; then
	#echo "not factory default"
	exit
fi

# add loop to wait for wan up.
for ii in 0 1 2 3 4 5
do
	status=`grep  nameserver /etc/resolv.conf`
	
	if [ "$status" == "" ]; then
		echo "wait for dns server ..."
		sleep 3
		if [ $ii == 5 ] ;then
			#echo "there is no dns server ..."
			exit 0
		fi
	else
		echo "have dns server can check internet"
		conn=`dnsquery -p -t 2 -d mydlink.com -d dlink.com -d dlink.com.cn -d dlink.com.tw -d google.com -d www.mydlink.com -d www.dlink.com -d www.dlink.com.cn -d www.dlink.com.tw -d www.google.com`
		if [ "$conn" == "Internet detected." ]; then
			#echo "can kill telnet now"
			killall telnetd
			exit
		fi
	fi
done 
