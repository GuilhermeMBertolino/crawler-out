#!/bin/sh

FIREWALL_DEBUG_FILE="/tmp/firewall_debug_log.txt"

[ -f $FIREWALL_DEBUG_FILE ] && rm -rf $FIREWALL_DEBUG_FILE

n=0
while [ $n -lt 5 ]
do
	echo "iptables -t mangle -nvL" >> $FIREWALL_DEBUG_FILE
	iptables -t mangle -nvL >> $FIREWALL_DEBUG_FILE
	echo "iptables -t nat -nvL"  >> $FIREWALL_DEBUG_FILE
	iptables -t nat -nvL >> $FIREWALL_DEBUG_FILE
	echo "iptables -nvL" >> $FIREWALL_DEBUG_FILE
	iptables -nvL >> $FIREWALL_DEBUG_FILE
	echo "ip6tables -t mangle -nvL" >> $FIREWALL_DEBUG_FILE
	ip6tables -t mangle -nvL >> $FIREWALL_DEBUG_FILE
	echo "ip6tables -t nat -nvL"  >> $FIREWALL_DEBUG_FILE
	ip6tables -t nat -nvL >> $FIREWALL_DEBUG_FILE
	echo "ip6tables -nvL" >> $FIREWALL_DEBUG_FILE
	ip6tables -nvL >> $FIREWALL_DEBUG_FILE

	sleep 30

	echo "===========================" >> $FIREWALL_DEBUG_FILE
	let n++
done
