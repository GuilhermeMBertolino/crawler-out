#!/bin/sh

CONFIG=$(which config)

have_ipv6_ip_addr()
{
	local ip6_proto
	local ret
	local wan_if=$1
	ip6_proto=$($CONFIG get ipv6_type)
	case $ip6_proto in
		dslite | v6plus)
			if [ -n "$(ip -4 addr show dev $wan_if)" -o -n "$(ip -6 addr show dev $wan_if scope global)" ]; then
				ret=1
			else
				ret=0
			fi
			;;
		*)
			ret="NoChange"
			;;
	esac

	printf $ret
}

check_ip_addr_for_led()
{
	local wan_if=$($CONFIG get wan_ifname)
	local wan_has_ip6addr
	while [ 1 ]
	do
		sleep 60
		wan_has_ip6addr=$(have_ipv6_ip_addr $wan_if)
		if [ "$wan_has_ip6addr" = "0" ]; then
			/sbin/ledcontrol -n wan -c amber -s on
		elif [ "$wan_has_ip6addr" = "1" ]; then
			/sbin/ledcontrol -n wan -c green -s on
		else
			continue
		fi
	done
}

check_ip_addr_for_led
