#!/bin/sh
#echo -e "\033[35m Get DB ... \033[0m" > /dev/console
opMode=$(uci -q get network.@opmode[0].mode)
LanIface=br-lan
WanIface=$(uci -q -P /var/state get network.inet.ifname)

case "$1" in
    -r)
        #RouterMode
        #uci get network.@opmode[0].mode
        echo $opMode
        ;;
    -I)
        #GatewayIP
        ifconfig $LanIface | grep "inet addr:" | cut -f 2 -d : | cut -f 1 -d ' '
        ;;
    -M)
        #GatewayMAC
        ifconfig $LanIface | grep HWaddr | awk '{printf $5}'
        ;;
    -n)
        #NetworkAddress (LAN network address)
        ip addr show dev $LanIface | grep -w inet | awk {'print $2'}
        ;;
    -m)
        #defaultmac
        fw_printenv -c /etc/pdata.config -n MAC
        ;;
    -w)
        #wan_ifname
        #uci -q -P /var/state get network.inet.ifname
        echo $WanIface
        ;;
    -i)
        #InternetIP
        if [ "$opMode" != "router" ]; then
            WanIface="br-lan"
        fi

        if [ -n "$WanIface" ]; then
            ifconfig $WanIface | grep "inet addr:" | cut -f 2 -d : | cut -f 1 -d ' '
        else
            echo "0.0.0.0"
        fi
        ;;
    -s)
        #Internetstatus
        status="down"
        if [ "$opMode" = "router" ]; then
            if [ "$(uci -q -P /var/state get network.inet.up)" = "1" ] ; then
                status="up"
            fi
        else
            if [ "$(uci -q -P /var/state get network.inet.check)" = "1" ] ; then
                status="up"
            fi
        fi
        echo $status
        ;;
    *)
        echo "getdb.sh: unknown ACTION '$1'" 1>&2
        return 1
esac

