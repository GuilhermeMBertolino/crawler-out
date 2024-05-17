#!/bin/sh

# udhcpc script edited by Tim Riker <Tim@Rikers.org>

. /sbin/config.sh
. /sbin/global.sh

[ -z "$1" ] && echo "Error: should be called from udhcpc" && exit 1

RESOLV_CONF="/etc/resolv.conf"
[ -n "$broadcast" ] && BROADCAST="broadcast $broadcast"
[ -n "$subnet" ] && NETMASK="netmask $subnet"

case "$1" in
    deconfig)
        /sbin/ifconfig $interface 0.0.0.0
        ;;

    renew|bound)
        /sbin/ifconfig $interface $ip $BROADCAST $NETMASK

        if [ -n "$router" ] ; then
            echo "deleting routers"
            while route del default gw 0.0.0.0 dev $interface ; do
                :
            done

            metric=0
            for i in $router ; do
                metric=`expr $metric + 1`
                route add default gw $i dev $interface metric $metric
	
						pptpgw=$i
						l2tpgw=$i
            done
        fi
#		if [ -n "$domain" ] ; then
			echo -n > $RESOLV_CONF
			echo -n > /etc/resolv.conf1
			[ -n "$domain" ] && echo search $domain >> $RESOLV_CONF
			for i in $dns ; do
				echo adding dns $i
				echo nameserver $i >> $RESOLV_CONF
				echo nameserver $i >> /etc/resolv.conf1
			done
			DNS1=`echo "$dns" |cut -d" " -f1`
			DNS2=`echo "$dns" |cut -d" " -f2`
			if [ "$DNS1" != "" ]; then
			`nvram_set 2860 dhcpPriDns $DNS1`
			fi
			if [ "$DNS2" != "" ]; then
			`nvram_set 2860 dhcpSecDns $DNS2`
			fi
			#sleep 5
			#config-dnsmasq.sh &
#		fi
		# notify goahead when the WAN IP has been acquired. --yy
		if [ "$wanmode" != "PPTP" -a "$wanmode" != "L2TP" ]; then
			killall -SIGTSTP goahead
		fi

		# restart igmpproxy daemon
		#config-igmpproxy.sh
		if [ "$wanmode" = "L2TP" ]; then
			route add -net `nvram_get wan_l2tp_server` netmask 255.255.255.255 gw $l2tpgw
			killall -q xl2tpd
			sleep 2
			xl2tpd -c /etc_ro/xl2tpd.conf &
		elif [ "$wanmode" = "PPTP" ]; then
			route add -net `nvram_get wan_pptp_server` netmask 255.255.255.255 gw $pptpgw
			killall -q pppd
			pppd call pptp &
		fi
        ;;
esac

exit 0

