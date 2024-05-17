#!/bin/sh

. /sbin/config.sh
. /sbin/global.sh

usage()
{
	echo "Usage:"
	echo "  $0 <server_name> <passwd> <mp3_dir>"
	echo "Example:"
	echo "  $0 Ralink ralink /media/sda1/mp3"
	exit 1
}

if [ "$3" = "" ]; then
	echo "$0: insufficient arguments"
	usage $0
fi
	
	chmod 755 /bin/mDNSResponder
	lan_ip=`nvram_get 2860 lan_ipaddr`
	server_name=$1
	passwd=$2
	mp3_dir=$3
	wanEnable=`nvram_get 2860 iTunesWan`
	WAN=eth2.2
	wanConnectionMode=`nvram_get 2860 wanConnectionMode`
	OperationMode=`nvram_get 2860 OperationMode`
	if [ "$OperationMode" = '3' ];then
		WAN=apcli0
	fi
	if [ $wanConnectionMode = "PPPOE" ] || [ $wanConnectionMode = "PPTP" ] || [ $wanConnectionMode = "L2TP" ]; then
		WAN=ppp0
	fi
	
	iptables -t nat -D PREROUTING -p tcp --dport 3689 -i $WAN -j REDIRECT --to-port 3700 1>/dev/null 2>&1
	if [ $wanEnable = "0" ]; then
		iptables -t nat -A PREROUTING -p tcp --dport 3689 -i $WAN -j REDIRECT --to-port 3700
	fi

	mt-daapd.sh "$server_name" "$passwd" "$mp3_dir" 
	#mDNSResponder $lan_ip thehost "$server_name" _daap._tcp. 3689 &
	mt-daapd 
