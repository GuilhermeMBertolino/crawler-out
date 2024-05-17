#!/bin/sh
#
#

weblocal_en=`nvram_get 2860 WebLocalLimit`
weblocal_py=`nvram_get 2860 WebLocalPolicy`
weblocal_mac1=`nvram_get 2860 WebLocalRules1`
weblocal_mac2=`nvram_get 2860 WebLocalRules2`
weblocal_mac3=`nvram_get 2860 WebLocalRules3`
weblocal_mac4=`nvram_get 2860 WebLocalRules4`
lan_ip=`nvram_get 2860 lan_ipaddr`

ebtables -F INPUT


if [ "$weblocal_en" = "0" ]; then
	exit 0
fi

#if [ "$weblocal_mac1" = "" -a "$weblocal_mac2" = "" -a "$weblocal_mac3" = "" -a "$weblocal_mac4" = "" ]; then
#	exit 0
#fi

if [ "$weblocal_py" = "1" ]; then	
	if [ -n "$weblocal_mac1" ]; then
		ebtables -A INPUT -s $weblocal_mac1 -p 0x800 --ip-dst $lan_ip --ip-protocol 6 --ip-dport 80 -j DROP
	fi

	if [ -n "$weblocal_mac2" ]; then
		ebtables -A INPUT -s $weblocal_mac2 -p 0x800 --ip-dst $lan_ip --ip-protocol 6 --ip-dport 80 -j DROP
	fi

	if [ -n "$weblocal_mac3" ]; then
		ebtables -A INPUT -s $weblocal_mac3 -p 0x800 --ip-dst $lan_ip --ip-protocol 6 --ip-dport 80 -j DROP
	fi

	if [ -n "$weblocal_mac4" ]; then
		ebtables -A INPUT -s $weblocal_mac4 -p 0x800 --ip-dst $lan_ip --ip-protocol 6 --ip-dport 80 -j DROP
	fi
else
	if [ -n "$weblocal_mac1" ]; then
		ebtables -A INPUT -s $weblocal_mac1 -p 0x800 --ip-dst $lan_ip --ip-protocol 6 --ip-dport 80 -j ACCEPT
	fi

	if [ -n "$weblocal_mac2" ]; then
		ebtables -A INPUT -s $weblocal_mac2 -p 0x800 --ip-dst $lan_ip --ip-protocol 6 --ip-dport 80 -j ACCEPT
	fi

	if [ -n "$weblocal_mac3" ]; then
		ebtables -A INPUT -s $weblocal_mac3 -p 0x800 --ip-dst $lan_ip --ip-protocol 6 --ip-dport 80 -j ACCEPT
	fi

	if [ -n "$weblocal_mac4" ]; then
		ebtables -A INPUT -s $weblocal_mac4 -p 0x800 --ip-dst $lan_ip --ip-protocol 6 --ip-dport 80 -j ACCEPT
	fi
	ebtables -A INPUT -p 0x800 --ip-dst $lan_ip --ip-protocol 6 --ip-dport 80 -j DROP
fi

exit 0








