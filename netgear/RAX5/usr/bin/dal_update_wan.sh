#!/bin/sh
if [ -e /tmp/dal_inited ];
then
    sleep 1
    echo -e "\033[35m DAL Update WAN status ...$1, $2 \033[0m" > /dev/console
    d2 -c general.wan_ifname "`/usr/bin/getdb.sh -w`"
    d2 -c general.InternetIP `/usr/bin/getdb.sh -i`
    # DNS IP should be the LAN PC used DNS IP address, RAX5 used LAN IP to be DNS IP 
    d2 -c general.dnsip `/usr/bin/getdb.sh -I`

    # force update xagentcfg. 
    d2 -c xagentcfg[0].lan_ifname "br-lan"
    d2 -c xagentcfg[0].lan_ipaddr "`/usr/bin/getdb.sh -I`"

    # force update internet status 
    echo -e "\033[35m Update internet status $(/usr/bin/getdb.sh -s)!! \033[0m" > /dev/console
    d2 -c general.Internetstatus "$(/usr/bin/getdb.sh -s)"

    /sbin/cfu_boot_notify.sh &
    echo -e "\033[35m .. Done \033[0m" > /dev/console
fi

