#!/bin/sh

echo "APN=$APN"
echo "USR=$USR"
echo "PAS=$PAS"
echo "USEPEERDNS=$USEPEERDNS"

TMPFIL=/tmp/connect

hso_up() {
	echo connecting
		
	if [ -n "$APN" ]; then
		atcmd /dev/modem AT+CGDCONT=1,\"IP\",\"$APN\"
	fi

	if [ -n "$USR" ]; then
		atcmd /dev/modem AT\$QCPDPP=1,1,$PAS,$USR
	fi
	
	atcmd /dev/modem AT_OWANCALL=1,0,0
	sleep 1
	atcmd /dev/modem AT_OWANCALL=1,1,0
	sleep 2
	atcmd /dev/modem AT_OWANDATA=1 > $TMPFIL
	PIP="`grep '^_OWANDATA' $TMPFIL | cut -d, -f2`"
	NS1="`grep '^_OWANDATA' $TMPFIL | cut -d, -f4`"
	NS2="`grep '^_OWANDATA' $TMPFIL | cut -d, -f5`"

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
	ifconfig hso0 $PIP netmask 255.255.255.255 up
	route add default dev hso0
	
	if [ "$USEPEERDNS" = "1" ]; then
		echo "set nameserver"
		(							# update the DNS
			echo "nameserver	$NS1"
			echo "nameserver	$NS2"
		) > /etc/resolv.conf
	fi

	rm -f $TMPFIL	
	echo hso0 > /var/run/3g_ifname
	echo 90 > /var/run/monitor.fifo
	echo  1 > /var/run/3g_link_status
	if [ "$BAK" = "1" ]; then
		echo 1 > /var/run/backup_status
	fi
}

hso_down() {
	echo disconnecting

	atcmd /dev/modem ATZ
	atcmd /dev/modem AT_OWANCALL=1,0,0
	echo  0 > /var/run/3g_link_status	
	sleep 1	
	ifconfig hso0 down
	if [ -f /var/run/backup_status ]; then
		rm /var/run/backup_status
	fi		
	rm /var/run/3g_ifname
}

case "$1" in
	up)
		hso_up
		;;
	down)
		hso_down
		;;
esac

exit 0
