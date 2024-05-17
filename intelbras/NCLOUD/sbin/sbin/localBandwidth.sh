#!/bin/sh
#
#

QosEnable=`nvram_get 2860 QosEnable`
iptables -t mangle -D OUTPUT -j MARK --set-mark 10  1>/dev/null 2>&1
iptables -t mangle -D INPUT -j MARK --set-mark 10  1>/dev/null 2>&1
iptables -t mangle -I OUTPUT -j MARK --set-mark 10  1>/dev/null 2>&1
iptables -t mangle -I INPUT -j MARK --set-mark 10  1>/dev/null 2>&1

if [ "$QosEnable" = '0' ];then
	tc qdisc del dev br0 root 1>/dev/null 2>&1
fi

tc qdisc add dev br0 root handle 5:0 htb default 2 r2q 64  1>/dev/null 2>&1

tc class add dev br0 parent 5:0 classid 5:3 htb rate 80mbit  1>/dev/null 2>&1
tc class add dev br0 parent 5:3 classid 5:10 htb rate 10mbit ceil 80mbit  1>/dev/null 2>&1
tc filter add dev br0 parent 5:0 prio 0 protocol ip handle 10 fw flowid 5:10  1>/dev/null 2>&1
