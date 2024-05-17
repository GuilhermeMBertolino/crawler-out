#!/bin/sh
if [ -e /tmp/dal_inited ];
then
    sleep 1
    echo -e "\033[35m Update WAN status ...$1, $2 \033[0m" > /dev/console
    d2 -c general.wan_ifname "`getdb -w`"
    d2 -c general.InternetIP "`getdb -i`"
    d2 -c general.Internetstatus "`getdb -s`"
    # DNS IP should be the LAN PC used DNS IP address, RAX30 used LAN IP to be DNS IP 
    d2 -c general.dnsip "`getdb -I`"

    # force update xagentcfg. 
    d2 -c xagentcfg[0].lan_ifname "br0"
    d2 -c xagentcfg[0].lan_ipaddr "`getdb -I`"
    # force update internet status 
    echo -e "\033[35m Update internet status !! \033[0m" > /dev/console
    d2 -c general.Internetstatus "`getdb -s`"

    wanMode=$1
    wanState=$2
    # If is NOT router mode, force to use the $1
    routerMode="`getdb -r`"
    if [ $routerMode != "router" ]; then
        wanMode="`getdb -a`"
        echo -e "\033[35m Force to $1 in $routerMode $wanMode mode !! \033[0m" > /dev/console
        d2 -c general.Internetstatus $wanState
    else
        #workaround for L2TP/PPTP.
        if [ $wanMode != "l2tp" ]; then
            d2 -c general.Internetstatus $wanState
        fi
        if [ $wanMode != "pptp" ]; then
            d2 -c general.Internetstatus $wanState
        fi
    fi

    /bin/cfu_boot_notify.sh &
    echo -e "\033[35m .. Done \033[0m" > /dev/console
fi

