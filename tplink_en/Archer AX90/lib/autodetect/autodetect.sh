#!/bin/sh
# Copyright(c) 2008-2014 Shenzhen TP-LINK Technologies Co.Ltd.
#
# Details : The real auto detection script.
# Author  : Ye Qianchuan <yeqianchuan@tp-link.net>
# Version : 1.0
# Date    : 25 Mar, 2014

. /lib/functions/network.sh
. /lib/functions.sh
. /usr/share/libubox/jshn.sh

# Get wan interface.
network_get_physdev IFC wan
network_get_physdev IFC_LAN lan

DNS_FILE=/tmp/autodetect-dns
DNS1_V6_FILE=/tmp/dns1
DNS2_V6_FILE=/tmp/dns2
DEFAULT_DNS_FILE=/tmp/resolv.conf.auto


DHCP6CDIR="/lib/autodetect"
DHCP6C_CONF="/tmp/dhcp6c_autodet.conf"
DHCP6C_SCRIPT="$DHCP6CDIR/dhcp6c_autodet.script"
DHCP6C_PIDFILE="/tmp/dhcp6c.pid"

PPPOE_IFC=${IFC}:${PPPOE_ALIAS}

flag=0
wanv6_connectable=0
wanv6_up=0
internet_ok=1
dhcp_ok=1
pppoe_ok=1

dslite_support=`uci get profile.profile_diff.dslite_support`
v6plus_support=`uci get profile.profile_diff.v6plus_support`

if [ "$dslite_support" == "yes" -o "$v6plus_support" == "yes" ]; then
	config_load /etc/config/network
	config_get wan_proto wan proto

	dad_transmits=`cat /proc/sys/net/ipv6/conf/$IFC/dad_transmits`
	v6_disable=`cat /proc/sys/net/ipv6/conf/$IFC/disable_ipv6`

	ubus list |grep network.interface.wanv6 && {
		local wanv6_status=`ubus call network.interface.wanv6 status`
		json_load "$wanv6_status"
		json_get_var wanv6_connectable connectable
		json_get_var wanv6_up up
	}
fi

record() {
    echo $@ >$RESULT_FILE
}

record_clean_and_exit() {
	record $@
	rm -f $DNS_FILE
	if [ "$dslite_support" == "yes" -o "$v6plus_support" == "yes" ]; then
		[ -f "$DNS1_V6_FILE" ] &&  rm -f $DNS1_V6_FILE
		[ -f "$DNS2_V6_FILE" ] &&  rm -f $DNS2_V6_FILE
		[ -f "$DHCP6C_PIDFILE" ] && kill $(cat "$DHCP6C_PIDFILE")
		[ $flag -eq 1 ] && ubus call network.interface.wanv6 connect
		echo $dad_transmits > /proc/sys/net/ipv6/conf/$IFC/dad_transmits
		[ `cat /proc/sys/net/ipv6/conf/$IFC/disable_ipv6` -ne "$v6_disable" ] && \
			echo $v6_disable > /proc/sys/net/ipv6/conf/all/disable_ipv6
	fi
	exit 0
}

wan_get_proto() {
    local ifc=wan
    ubus list | grep -wq "network.interface.internet" && ifc=internet

	local proto
	network_get_proto proto $ifc && echo $proto || echo none
}

dhcp6c_create_slaac_conffile() {
	[ -z "$DHCP6CDIR" ] && mkdir -p $DHCP6CDIR
	echo -e "interface $IFC {" > "$DHCP6C_CONF"
	echo -e "\tinformation-only;" >> "$DHCP6C_CONF"
	echo -e "\trequest domain-name-servers;" >> "$DHCP6C_CONF"
	echo -e "\tscript \"$DHCP6C_SCRIPT\";"  >> "$DHCP6C_CONF"
	echo -e "};\n" >> "$DHCP6C_CONF"
	echo -e "id-assoc na 1 {};\n" >> "$DHCP6C_CONF"
}

dhcp6c_create_dhcpv6_conffile() {
	[ -z "$DHCP6CDIR" ] && mkdir -p $DHCP6CDIR
	echo -e "interface $IFC {" > "$DHCP6C_CONF"
	echo -e "\tsend ia-na 1;" >> "$DHCP6C_CONF"
	echo -e "\tsend ia-pd 1;" >> "$DHCP6C_CONF"
	echo -e "\trequest domain-name-servers;" >> "$DHCP6C_CONF"
	echo -e "\tscript \"$DHCP6C_SCRIPT\";"  >> "$DHCP6C_CONF"
	echo -e "};\n" >> "$DHCP6C_CONF"
	echo -e "id-assoc na 1 {};\n" >> "$DHCP6C_CONF"
	echo "id-assoc pd 1 {" >> "$DHCP6C_CONF"
	echo -e "\tprefix-interface $IFC_LAN {" >> "$DHCP6C_CONF"
	echo -e "\t\tsla-id 1;" >> "$DHCP6C_CONF"
	echo -e "\t};" >>  "$DHCP6C_CONF"
	echo "};" >>  "$DHCP6C_CONF"
}

check_v6plus(){
	dns1=$1
	dns2=$2

	[ -n "$dns1" ] || [ -n "$dns2" ] && {
		dnslookup -6 -t $DNS_V6_TIMEOUT "$V6PLUS_DOMAIN_JPNE" $dns1 || \
		dnslookup -6 -t $DNS_V6_TIMEOUT "$V6PLUS_DOMAIN_JPNE" $dns2 || \
		dnslookup -6 -t $DNS_V6_TIMEOUT "$V6PLUS_DOMAIN_OCN" $dns1 || \
		dnslookup -6 -t $DNS_V6_TIMEOUT "$V6PLUS_DOMAIN_OCN" $dns2 && \
			record_clean_and_exit "v6plus"
	}
}

check_dslite() {
	dns1=$1
	dns2=$2
	
	config_load /etc/config/network
	config_get AFTR_name wan AFTR_name
	
	[ -n "$dns1" ] || [ -n "$dns2" ] && {
		[ -n "$AFTR_name" ] && [ "$AFTR_name" != "$DSLITE_DOMAIN" ] && {
			dnslookup -6 -t $DNS_V6_TIMEOUT "$AFTR_name" $dns1 || \
			dnslookup -6 -t $DNS_V6_TIMEOUT "$AFTR_name" $dns2 && \
				record_clean_and_exit "dslite"
		}
		if [ -n "$DSLITE_AFTR_LIST_PRIVATE" -o -n "$DSLITE_AFTR_LIST_PUBLIC" ]; then
			for domain in $DSLITE_AFTR_LIST_PRIVATE; do
				dnslookup -6 -t $DNS_V6_TIMEOUT "$domain" $dns1 || \
				dnslookup -6 -t $DNS_V6_TIMEOUT "$domain" $dns2 && \
					record_clean_and_exit "dslite"
			done
			for domain in $DSLITE_AFTR_LIST_PUBLIC; do
				addr_ipv6=`dnslookup -6 -t $DNS_V6_TIMEOUT "$domain" $dns1`
				[ -z "$addr_ipv6" ] && addr_ipv6=`dnslookup -6 -t $DNS_V6_TIMEOUT "$domain" $dns2`
				for addr in $addr_ipv6; do
					ping -6 $addr -c 1 -W 3 && record_clean_and_exit "dslite"
				done
			done
		else
			dnslookup -6 -t $DNS_V6_TIMEOUT "$DSLITE_DOMAIN" $dns1 || \
			dnslookup -6 -t $DNS_V6_TIMEOUT "$DSLITE_DOMAIN" $dns2 && \
				record_clean_and_exit "dslite"
		fi
	}
}

# Check the dslite & v6plus status
# Get ipv6 addr & dns,and check the specific domain name
get_dns_and_check_doamin() {
	wait_dns=10
	while [ $wait_dns -ne 0 ]; do
		sleep 1

		if [ -e "$DNS1_V6_FILE" ]; then
			wait_dns=0
			DNS1=$(cat $DNS1_V6_FILE)
			DNS2=$(cat $DNS2_V6_FILE)
			[ -n "$DNS1" ] && [ -z "$(cat $DEFAULT_DNS_FILE |grep $DNS1)" ] && \
				echo nameserver $DNS1 >> $DEFAULT_DNS_FILE
			[ -n "$DNS2" ] && [ -z "$(cat $DEFAULT_DNS_FILE |grep $DNS2)" ] && \
				echo nameserver $DNS2 >> $DEFAULT_DNS_FILE

			[ "$dslite_support" == "yes" ] && check_dslite $DNS1 $DNS2
			[ "$v6plus_support" == "yes" ] && check_v6plus $DNS1 $DNS2
		else
			let "wait_dns=wait_dns - 1"
		fi
	done
}

# Check physical connection.
network_get_link physlink $IFC
[ -z "$physlink" ] && record_clean_and_exit "none"
[ "$physlink" = 0 ] && record_clean_and_exit "unplugged"

# Check the internet status.
online-test "$CHECK_URL" "$DNS_FIRST_TIMEOUT" && \
    record_clean_and_exit "$(wan_get_proto)"

# Update estimated time
record time $(((EST_TIME-INTERNET_TIMEOUT)*1000))

# Check dslite & v6plus
if [ "$dslite_support" == "yes" -o "$v6plus_support" == "yes" ]; then
	local count=6
	local mbit=1
	local dns1=`grep ^nameserver.*[:] $DEFAULT_DNS_FILE | awk '{print $2}' | sed -n '1p'`
	local dns2=`grep ^nameserver.*[:] $DEFAULT_DNS_FILE | awk '{print $2}' | sed -n '2p'`
	
	if [ $wanv6_connectable -eq 1 -a $wanv6_up -eq 1 ] && [ -n "$dns1" -o -n "$dns2" ]; then
		[ "$dslite_support" == "yes" ] && check_dslite $dns1 $dns2
		[ "$v6plus_support" == "yes" ] && check_v6plus $dns1 $dns2
	else
		if [ $wanv6_connectable -eq 1 ]; then
			ubus call network.interface.wanv6 disconnect
			flag=1
			sleep 2
		fi
		echo 0 > /proc/sys/net/ipv6/conf/$IFC/dad_transmits
		if [ $v6_disable -ne 0 ]; then
			echo 0 > /proc/sys/net/ipv6/conf/all/disable_ipv6 #open ipv6 stack
		fi
		echo "-1" > /proc/sys/net/ipv6/conf/$IFC/ndisc_mbit #reset the mbit value to -1
		echo "2"  > /proc/sys/net/ipv6/conf/$IFC/accept_ra
		echo "1" > /proc/sys/net/ipv6/conf/$IFC/sendrs  #send RS for RA

		# Wait for RA
		mbit=`cat /proc/sys/net/ipv6/conf/$IFC/ndisc_mbit`
		while [ $count -ne 0 -a $mbit -eq -1 ]; do
			sleep 1
			mbit=`cat /proc/sys/net/ipv6/conf/$IFC/ndisc_mbit`
			let "count=count - 1"
		done

		if [ $mbit -eq 0 ]; then
			dhcp6c_create_slaac_conffile
			/usr/sbin/dhcp6c -p $DHCP6C_PIDFILE -c $DHCP6C_CONF -I $IFC $IFC &
			get_dns_and_check_doamin
		elif [ $mbit -eq 1 ]; then
			dhcp6c_create_dhcpv6_conffile
			/usr/sbin/dhcp6c -p $DHCP6C_PIDFILE -c $DHCP6C_CONF -I $IFC $IFC &
			get_dns_and_check_doamin
		else
			echo RA recieve fail > /dev/console
		fi
	fi
fi

# Check PPPOE.
pppoe-discovery \
    -I $PPPOE_IFC \
    -t $PPPOE_TIMEOUT -T $PPPOE_RETRIES >/dev/null &
PPPOE_PID=$!

# Check the PPPOE status.
wait $PPPOE_PID && record_clean_and_exit "pppoe"

# Nothing detected, return dhcp
record_clean_and_exit "dhcp"
