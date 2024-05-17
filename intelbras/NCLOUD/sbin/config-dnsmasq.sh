#!/bin/sh

# usage: config-dnsmasq.sh wanmode ppp_index

#if [ "$1" == "" ]; then
#	echo "usage: config-dnsmasq.sh wanmode[STATIC|DHCP|PPPOE|L2TP|PPTP]"
#	exit 1
#fi

local cfgFile="/etc/dnsmasq.conf"
local num=`cat /etc/resolv.conf |wc -l`
local resolvefile="/etc/resolv.dnsmasq.conf"
local dns=`grep  "127.0.0.1" /etc/resolv.conf |wc -l`
local lanip=`nvram_get  lan_ipaddr`

echo "domain-needed" > $cfgFile
echo "bogus-priv" >> $cfgFile
echo "resolv-file=$resolvefile" >> $cfgFile
echo "strict-order" >> $cfgFile
echo "listen-address=$lanip,127.0.0.1" >> $cfgFile
echo "addn-hosts=/etc/dnsmasq.hosts" >> $cfgFile
rm -rf $resolvefile;touch $resolvefile;chmod 777 $resolvefile;chmod 777 /etc/resolv.conf
#sed -e '/nameserver *127.0.0.1/d' /etc/resolv.conf >> $resolvefile	
if [ "$dns" == "0" -a "$num" -gt 0 ]; then
	cat /etc/resolv.conf >> $resolvefile
fi
local dnsnum=`cat /etc/resolv.dnsmasq.conf | wc -l`
local dns1=`grep "127.0.0.1" /etc/resolv.dnsmasq.conf | wc -l`
if [ "$dnsnum" == "0" -o "$dns1" != "0" ]; then
	cat /etc/resolv.conf1 > $resolvefile
fi
#local lanipyon=`grep  $lanip $resolvefile 2>/dev/null`
#if [ "$lanipyon" == "" ]; then
#	echo "nameserver $lanip" >> $resolvefile		
#fi
rm -rf /etc/resolv.conf;touch /etc/resolv.conf;chmod 777 /etc/resolv.conf
echo "nameserver 127.0.0.1" >> /etc/resolv.conf
killall -q dnsmasq
dnsmasq &

