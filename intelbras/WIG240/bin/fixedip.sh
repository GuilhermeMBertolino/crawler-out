#!/bin/sh
#
# Script file to set fixed IP, subnet and gateway
#
# Usage: fixedip.sh interface ip netmask gateway
#

if [ -n "$3" ]; then
	ifconfig $1 $2 netmask $3
else
	ifconfig $1 $2
fi

while route del  default dev $1
do :
done

if [ -n "$4" ]; then
	if [ "$4" != "0.0.0.0" ]; then
		route add -net default gw $4 dev $1
	fi
fi
