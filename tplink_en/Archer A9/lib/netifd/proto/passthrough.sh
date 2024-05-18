#!/bin/sh

[ -n "$INCLUDE_ONLY" ] || {
	. /lib/functions.sh
	. ../netifd-proto.sh

	config_load /etc/config/sysmode
	config_get mode sysmode mode "router"
	[ "$mode" = "ap" ] && exit 0

	init_proto "$@"
}

proto_passthrough_init_config() {
	no_device=1
	available=1
}

proto_passthrough_setup() {
	local cfg="$1"
	local wanif=""
	local lantype=""
	local br="br-lan"

	wanif=$(uci get network.wan.ifname)
	lantype=$(uci get network.lan.type)

	[ "$lantype" = "bridge" ] && {
		br="br-lan"
	}

    [ -f /etc/init.d/qca-nss-ecm ] && /etc/init.d/qca-nss-ecm reload
	insmod ipv6-pass-through wan_eth_name=$wanif lan_br_name=$br

	ifconfig eth0 promisc
	/etc/init.d/dhcp6s stop
#	killall dhcp6c
	/etc/init.d/radvd stop
}

proto_passthrough_teardown() {
	local interface="$1"
	local ifname=""
	
	ifconfig eth0 -promisc
	rmmod  ipv6-pass-through

    [ -f /etc/init.d/qca-nss-ecm ] && /etc/init.d/qca-nss-ecm reload
}

[ -n "$INCLUDE_ONLY" ] || {
	add_protocol passthrough
}
