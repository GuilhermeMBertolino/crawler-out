#!/bin/sh
echo "################################################"
echo [$0] $1 $2 $3 ....

case "$1" in
CONNSTATUS)	
	phpsh /etc/scripts/update_wanled.php EVENT=WAN_STATUS
	if [ $3 -eq 1 ]; then
		event "BRIDGE-1.DHCP.RENEW";
		if [ $2 == "ath1" ]; then
			st_ath3="`cat /proc/net/wireless | grep ath3 | awk '{print $2}'`"
			if [ "$st_ath3" == "0001" ]; then
				echo "========= Stop PHYINF.WIFISTA-1.1, due to PHYINF.WIFISTA-2.1 is also associated"
				service PHYINF.WIFISTA-1.1 stop;
			elif [ "$st_ath3" == "0000" ]; then
				echo "========= Stop PHYINF.WIFISTA-2.1, due to PHYINF.WIFISTA-2.1 is not associated"
				service PHYINF.WIFISTA-2.1 stop;
			fi
		else
#			st_ath1 = `cat /proc/net/wireless | grep ath1 | awk '{print $2}'`
#			if [ "st_ath1" == "0001" ]; then
#				echo "========= Stop PHYINF.WIFISTA-1.1, due to PHYINF.WIFISTA-2.1 is also associated"
#				service PHYINF.WIFISTA-1.1 stop;
#			else
#				if [ "st_ath1" == "0000" ]; then
#					echo "========= Stop PHYINF.WIFISTA-2.1, due to PHYINF.WIFISTA-2.1 is not associated"
#					service PHYINF.WIFISTA-1.1 stop;
#				fi
#			fi
			echo "========= Stop PHYINF.WIFISTA-1.1, due to PHYINF.WIFISTA-2.1 is higher priority"
			service PHYINF.WIFISTA-1.1 stop;
		fi
	else
		event "BRIDGE-1.DHCP.RELEASE";
		if [ $2 == "ath1" ]; then
			service PHYINF.WIFISTA-2.1 start; 
		else
			service PHYINF.WIFISTA-1.1 start;
		fi
	fi
	;;
*)
	echo "not support [$1] ..."
	;;
esac
echo "################################################"
exit 0
