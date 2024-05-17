#!/bin/sh

echo "APN=$APN"

TMPFIL=/tmp/connect

sierra_up() {
	echo connecting
		
	if [ -n "$APN" ]; then
		atcmd /dev/modem AT+CGDCONT=1,\"IP\",\"$APN\"
	fi

	atcmd /dev/modem AT!SCACT=0,1
	sleep 2
	atcmd /dev/modem AT!SCACT=1,1
	sleep 2
	atcmd /dev/modem AT!SCPADDR=1 > $TMPFIL
	cat $TMPFIL
	PIP=`grep '!SCPADDR:' $TMPFIL | cut -d, -f2 | cut -d\" -f2`

	if [ -z "$PIP" ]; then
		rm -f $TMPFIL
		echo  0 > /var/run/3g_link_status	
		if [ -z "$BAK" ]; then
			sleep 2
			echo 93 > /var/run/monitor.fifo
		fi
		return 0	
	fi	
	echo "Got IP: $PIP"
	ifconfig usb0 up
	udhcpc -i usb0
	
	rm -f $TMPFIL	
	echo usb0 > /var/run/3g_ifname
	echo 90 > /var/run/monitor.fifo
	echo  1 > /var/run/3g_link_status
	if [ "$BAK" = "1" ]; then
		echo 1 > /var/run/backup_status
	fi
}

sierra_down() {
	echo disconnecting

	atcmd /dev/modem ATZ
	atcmd /dev/modem AT!SCACT=0,1
	echo  0 > /var/run/3g_link_status	
	sleep 1	
	ifconfig usb0 down
	if [ -f /var/run/backup_status ]; then
		rm /var/run/backup_status
	fi		
	rm /var/run/3g_ifname
}

case "$1" in
	up)
		sierra_up
		;;
	down)
		sierra_down
		;;
esac

exit 0
