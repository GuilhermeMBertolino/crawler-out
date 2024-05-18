#!/bin/sh
# Copyright(c)  Shenzhen TP-LINK Technologies Co.Ltd.
#
# Details : The Internet Accessibility detection script.
# Author  : Sharon Lin <sharon.lin@tp-link.com>
# Version : 1.0
# Date    : 20 Apr, 2016

. /lib/functions/network.sh

DEBUG_FILE=/tmp/internetdetect_debug
DNS_FILE=/tmp/resolv.conf
RESULT_FILE=/tmp/internetdetect
DNS_CHECKURL="tp-link.com"
DNS_TIMEOUT=5

debug_print(){
	if [ -e $DEBUG_FILE ]
	then
		echo "$@" > /dev/console
	fi
}

get_current_dns(){
	cat $DNS_FILE | awk '{ print $2 }'
	return
}

get_dns_result(){
	local dns=
	local dnses=$(get_current_dns)
	for dns in $dnses; do
		debug_print "dnslookup -t $DNS_TIMEOUT $DNS_CHECKURL $dns"
		dnslookup -t $DNS_TIMEOUT $DNS_CHECKURL $dns >/dev/null && {
			debug_print "dnslookup success"
			echo "1"
			return
		}
	done
	if [ -n "$1" ]; then
	    debug_print "dnslookup -t $DNS_TIMEOUT $DNS_CHECKURL $1"
		dnslookup -t $DNS_TIMEOUT $DNS_CHECKURL $1 >/dev/null && {
			debug_print "dnslookup success"
			echo "1"
			return
		}
	fi
	debug_print "dnslookup failed"
	echo "0"
	return
}

get_phy_result(){
	local mode=`uci get sysmode.sysmode.mode`
	local physt=0
	local remotedhcps=
	debug_print "mode=$mode"
	if [ "$mode" == "router" ]
	then
		# Get wan interface.
		network_get_physdev IFC wan
		# Check physical connection.
		network_get_link physlink $IFC
		debug_print "Get $mode mode interface $IFC physical link status $physlink"
		if [ -n "$physlink" -a "$physlink" = 1 ]
		then
			physt=1
		fi

	else
		# re and ap mode do not have phy status
		physt=1
	fi
	echo "$physt"
	return
}


phy_ret=$(get_phy_result)
debug_print "phy_ret=$phy_ret"
if [ $phy_ret == "1" ]
then
    local lan_type=`uci get network.lan.lan_type`
	local remotedhcps=`uci get dhcp.smartdhcpinfo.remotedhcps`
	debug_print "remotedhcps=$remotedhcps"
	if [ "$remotedhcps" == "existed" -o "$lan_type" == "static" ]
	then
	    if [ "$lan_type" == "static" ]; then
	        local gateway=`uci get network.lan.gateway`
	        dns_ret=$(get_dns_result "$gateway")
	    else
		    dns_ret=$(get_dns_result)
		fi
		debug_print "dns_ret=$dns_ret"
		if [ $dns_ret == "1" ]
		then
			debug_print "Internet Connected"
			echo "1" > $RESULT_FILE
		else
			debug_print "Internet Poor Connected"
			echo "2" > $RESULT_FILE
		fi
	else
		debug_print "Internet Disconnected"
        	echo "3" > $RESULT_FILE
	fi
else
	debug_print "Network is not available"
	echo "0" > $RESULT_FILE
fi
exit 0
