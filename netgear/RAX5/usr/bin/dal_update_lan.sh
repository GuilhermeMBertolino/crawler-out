#!/bin/sh
if [ -e /tmp/dal_inited ];
then
    sleep 1
    echo -e "\033[35m DAL Update LAN status ...$1, $2 \033[0m" > /dev/console
	d2 -c general.lan_ifname "br-lan"
	d2 -c general.GatewayIP `/usr/bin/getdb.sh -I`
	d2 -c general.GatewayMAC "`/usr/bin/getdb.sh -M`"
	d2 -c general.NetworkAddress "`/usr/bin/getdb.sh -n`"
    echo -e "\033[35m .. Done \033[0m" > /dev/console
fi
