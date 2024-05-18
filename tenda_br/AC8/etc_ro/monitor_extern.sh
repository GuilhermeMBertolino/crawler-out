#!/bin/sh

PRCO_NAME=$1
WAN_ID=`echo $1 | awk -Fwan '{printf $2}'`


if [ "$PRCO_NAME" == "dhcp_wan1" ]; then
	echo 'monitor restart DHCP'
	cfm post multiWAN 17 $WAN_ID 0 0	
elif [ "$PRCO_NAME" == "ppoe_wan1" ]; then
	echo 'monitor restart PPPOE'
	cfm post multiWAN 17 $WAN_ID 2 0
elif [ "$PRCO_NAME" == "pptp_wan1" ] || [ "$PRCO_NAME" == "pptp_dhcp_wan1" ]; then
	echo 'monitor restart PPTP'
	cfm post multiWAN 17 $WAN_ID 3 0
elif [ "$PRCO_NAME" == "l2tp_wan1" ] || [ "$PRCO_NAME" == "l2tp_dhcp_wan1" ]; then
	echo 'monitor restart L2TP'
	cfm post multiWAN 17 $WAN_ID 4 0
elif [ "$PRCO_NAME" == "db_dhcp_wan1" ]; then
	echo 'monitor restart DUBLE_PPPOE DHCP'
	cfm post multiWAN 17 $WAN_ID 5 1
elif [ "$PRCO_NAME" == "db_ppoe_wan1" ]; then
	echo 'monitor restart DUBLE_PPPOE PPPOE'
	cfm post multiWAN 17 $WAN_ID 5 2
fi

