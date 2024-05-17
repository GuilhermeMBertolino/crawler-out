#!/bin/sh
#


wan_mode=`nvram_get 2860 wanConnectionMode`
echo "wan_mode="$wan_mode
if [ "$wan_mode" = "STATIC" ] || [ "$wan_mode" = "DHCP" ]; then
	WAN_IF_NAME="eth2.2"
else
	WAN_IF_NAME="ppp0"
fi

echo "WAN_IF_NAME="$WAN_IF_NAME

s1=`ifconfig $WAN_IF_NAME | grep "inet addr"`
if [ "$s1" = "" ];then
	exit
fi
wan_ip=`ifconfig $WAN_IF_NAME | grep "inet addr" | cut -f2 -d: | cut -f1 -d " "`

echo "1=" $1 "2=" $2 "3=" $3 "4=" $4 
if [ "$1" = "add" ]; then
	iptables -I PREROUTING -t nat  -p $2 --dport $3 -d $wan_ip -j DNAT --to $4
else
	iptables -D PREROUTING -t nat  -p $2 --dport $3 -d $wan_ip -j DNAT --to $4
fi



