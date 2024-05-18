#!/bin/sh
. /usr/share/libubox/jshn.sh
[ -n "$INCLUDE_ONLY" ] || {
	. /lib/functions.sh
	. ../netifd-proto.sh
	init_proto "$@"
}

proto_passthrough_init_config() {
	no_device=1
	available=1
}

proto_passthrough_setup() {
        echo "##################################################" > /dev/console
	local wan_ifname=$(uci get network.wanv6.ifname)
	local sysmode=$(uci get sysmode.sysmode.mode)
	[ -n "$sysmode" -a "$sysmode" == "router" -a -n "$wan_ifname" ] && {
		insmod ipv6-pass-through wan_eth_name=$wan_ifname lan_br_name=br-lan lan_eth_name=eth1
		/etc/init.d/dhcp6s stop
	#	killall dhcp6c
		/etc/init.d/radvd stop
	}
}

proto_passthrough_teardown() {
	local interface="$1"
	local ifname=""
	local sysmode=$(uci get sysmode.sysmode.mode)
	[ -n "$sysmode" -a "$sysmode" == "router" ] && rmmod  ipv6-pass-through
}

[ -n "$INCLUDE_ONLY" ] || {
	add_protocol passthrough
}
