#!/bin/sh

if [ $# -lt 3 ]; then
	echo "$0 iface ifname delay"
	exit 1
fi

iface=$1
ifname=$2
delay=$3
nat_type=0

sleep $delay

if [ -f "/usr/sbin/test_nat" ]; then
	nat_type=`NIC=$ifname test_nat $ifname | grep "raw_nat:" |awk -F"raw_nat: " '{printf $2}' |awk '{printf $1}'`
else
	nat_type=`nat_detect $ifname | grep finalNat | awk -F, '{print $1}' | awk '{print $5}'`
fi
echo "nat_type=$nat_type"

if [ $iface = 0 ]; then
	nvram set wan_nat_type=$nat_type
else
	nvram set wan${iface}_nat_type=$nat_type
fi
