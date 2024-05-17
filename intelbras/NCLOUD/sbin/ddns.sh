#!/bin/sh
#
# $Id: //WIFI_SOC/release/SDK_4_1_0_0/source/user/rt2880_app/scripts/ddns.sh#1 $
#
# usage: ddns.sh
#

wanmode=`nvram_get 2860 wanConnectionMode`
ddns_enable=`nvram_get 2860 DDNSEnabled`
srv=`nvram_get 2860 DDNSProvider`
ddns=`nvram_get 2860 DDNS`
u=`nvram_get 2860 DDNSAccount`
pw=`nvram_get 2860 DDNSPassword`
hn=`nvram_get 2860 DDNSHostname`
email=`nvram_get 2860 DDNSEmail`

updateDDNS(){
	killall -q yddns

	if [ "$ddns_enable" = "0" ]; then
		exit 0
	fi

	if [ "$wanmode" = "PPPOE" ]; then
		s1=`ifconfig ppp0 | grep "inet addr"`
		if [ "$s1" = "" ]; then
			echo "ppp0 no addr, ddns exit"
			exit 0
		fi
		
		s2=`echo $s1 | cut -f2 -d:`	
		wan_ip_addr=`echo $s2 | cut -f1 -d " "`
	elif [ "$wanmode" = "DHCP" -o "$wanmode" = "STATIC" ]; then
		s1=`ifconfig eth2.2 | grep "inet addr"`
		if [ "$s1" = "" ]; then
			echo "eth2.2 no addr, ddns exit"
			exit 0
		fi

		s2=`echo $s1 | cut -f2 -d:`
		wan_ip_addr=`echo $s2 | cut -f1 -d " "`
	else
		wan_ip_addr=`echo 172.1.1.1`
	fi

	s3=`ifconfig eth2.2 | grep "HWaddr"`
	wan_mac_addr=`echo $s3 | cut -c35-52`

	if [ "$srv" = "dyndns.org" ]; then
		wan_ip_addr=`nvram_get 2860 ddnsipaddr`
		yddns -s dyndns $ddns $u $pw $wan_ip_addr
	elif [ "$srv" = "no-ip.com" ]; then
		wan_ip_addr=`nvram_get 2860 ddnsipaddr`
		yddns -s noip $ddns $u $pw $wan_ip_addr
	elif [ "$srv" = "3322.org" ]; then
	  wan_ip_addr=`nvram_get 2860 ddnsipaddr`
		yddns -s qdns $ddns $u $pw $wan_ip_addr
	elif [ "$srv" = "tzo.org" ]; then
		yddns -s tzo $ddns $u $pw $wan_ip_addr
	elif [ "$srv" = "intelbras.com" ]; then
		wan_ip_addr=`nvram_get 2860 ddnsipaddr`
		yddns -s intelbras $email $hn $wan_mac_addr $wan_ip_addr
	else
	#	echo "$0: unknown DDNS provider: $srv"
		exit 1
	fi
}

while [ "1" == "1" ]
do
	updateDDNS
	sleep 60
done
