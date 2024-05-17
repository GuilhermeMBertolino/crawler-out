#!/bin/sh

. /sbin/global.sh

mss_add() {
	iptables -N wan_mss_fix
	iptables -I FORWARD -o $wan_ppp_if -j wan_mss_fix
	
	local wan_mtu
	local wan_mss
	if [ "$wanmode" == "STATIC" ] || [ "$wanmode" == "DHCP" ]; then
		iptables -A wan_mss_fix -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --clamp-mss-to-pmtu
		return
	fi
	if [ "$wanmode" == "PPPOE" ]; then
		wan_mtu=`nvram_get 2860 wan_pppoe_mtu`
	elif [ "$wanmode" == "L2TP" ]; then
		wan_mtu=`nvram_get 2860 wan_pppoe_mtu`
	elif [ "$wanmode" == "PPTP" ]; then
		wan_mtu=`nvram_get 2860 wan_pppoe_mtu`
	fi
	wan_mtu="${wan_mtu:-1442}"
	wan_mss=`expr $wan_mtu - 40`
	iptables -A wan_mss_fix -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --set-mss $wan_mss
	iptables -A wan_mss_fix -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --clamp-mss-to-pmtu
}

mss_del(){			
	iptables -t filter -D FORWARD -j wan_mss_fix >/dev/null
	iptables -t filter -F wan_mss_fix >/dev/null
}

case "$1" in
    add)
	mss_add
	;;
    delete)
	mss_del
	;;
	restart)
	mss_del
	mss_add
	;;
    *)
	echo $"Usage: $0 {add|delete|restart}"
	RETVAL=1
esac

exit $RETVAL