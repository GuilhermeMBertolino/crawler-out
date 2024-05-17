#!/bin/sh

wan_if=eth2.2
u=`nvram_get 2860 wan_pppoe_user_mm`
pw=`nvram_get 2860 wan_pppoe_pass`
opmode=`nvram_get 2860 wan_pppoe_opmode`
optime=`nvram_get 2860 wan_pppoe_optime`

killall -9 pppd
rm -f /tmp/pppoeConnectPass
#syslogd -m 0

pppoe.sh $u $pw $wan_if $opmode $optime
echo "Manual pppoe connect server"
pppd file /etc/options.pppoe &
