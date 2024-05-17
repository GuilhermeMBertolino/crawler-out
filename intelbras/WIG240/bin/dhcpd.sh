#!/bin/sh
#
# script file to start udhcpd daemon (udhcp server)
#

if [ $# -lt 2 ]; then echo "Usage: $0 interface {gw | ap} ";  exit 1 ; fi

GETMIB="flash get"
CONF_FILE=/var/udhcpd.conf
LEASE_FILE=/var/lib/misc/udhcpd.leases

# See if DHCP server is on
eval `$GETMIB DHCP`
if [ "$DHCP" != '2' ]; then
	exit 0
fi

echo "interface $1" > $CONF_FILE

eval `$GETMIB DHCP_CLIENT_START`
echo "start $DHCP_CLIENT_START" >> $CONF_FILE

eval `$GETMIB DHCP_CLIENT_END`
echo "end $DHCP_CLIENT_END" >> $CONF_FILE

eval `$GETMIB SUBNET_MASK`
echo "opt subnet $SUBNET_MASK" >> $CONF_FILE

if [ $2 = "ap" ]; then
	eval `$GETMIB DEFAULT_GATEWAY`
	echo "opt router $DEFAULT_GATEWAY"  >> $CONF_FILE

	eval `$GETMIB DNS1`
	if [ "$DNS1" != "0.0.0.0" ]; then
		echo "opt dns $DNS1" >> $CONF_FILE
	fi
	eval `$GETMIB DNS2`
	if [ "$DNS2" != "0.0.0.0" ]; then
		echo "opt dns $DNS2" >> $CONF_FILE
	fi
	eval `$GETMIB DNS3`
	if [ "$DNS3" != "0.0.0.0" ]; then
		echo "opt dns $DNS3" >> $CONF_FILE
	fi
	# set default
	if [ "`cat $CONF_FILE | grep dns`" = "" ]; then
		echo "opt dns $DEFAULT_GATEWAY"  >> $CONF_FILE
	fi
	
	eval `$GETMIB DOMAIN_NAME`	
	if [ "$DOMAIN_NAME" != "" ]; then
		echo "opt domain $DOMAIN_NAME" >> $CONF_FILE
	fi	
else
	eval `$GETMIB IP_ADDR`
	echo "opt router $IP_ADDR"  >> $CONF_FILE

	eval `$GETMIB DNS_MODE`
	if [ "$DNS_MODE" = '0' ]; then
		echo "opt dns $IP_ADDR" >> $CONF_FILE
	else
		eval `$GETMIB DNS1`
		if [ "$DNS1" != "0.0.0.0" ]; then
			echo "opt dns $DNS1" >> $CONF_FILE
		fi
		eval `$GETMIB DNS2`
		if [ "$DNS2" != "0.0.0.0" ]; then
			echo "opt dns $DNS2" >> $CONF_FILE
		fi
		eval `$GETMIB DNS3`
		if [ "$DNS3" != "0.0.0.0" ]; then
			echo "opt dns $DNS3" >> $CONF_FILE
		fi
	fi
	# set default
	if [ "`cat $CONF_FILE | grep dns`" = "" ]; then
		echo "opt dns $IP_ADDR"  >> $CONF_FILE
	fi
	
	eval `$GETMIB DOMAIN_NAME`	
	if [ "$DOMAIN_NAME" != "" ]; then
		echo "opt domain $DOMAIN_NAME" >> $CONF_FILE
	fi	
fi

if [ -f "$LEASE_FILE" ]; then
	rm -f $LEASE_FILE
fi

echo "" > $LEASE_FILE

eval `$GETMIB IP_ADDR`
fixedip.sh $1 $IP_ADDR $SUBNET_MASK 0.0.0.0

udhcpd $CONF_FILE






