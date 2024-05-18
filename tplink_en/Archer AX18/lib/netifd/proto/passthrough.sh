#!/bin/sh
. /usr/share/libubox/jshn.sh
. /lib/domain_login/domain_login_core.sh

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
        echo "##################################################" > /dev/console
	json_init
	json_load "`ubus call network.interface.wan status`"
	json_get_var device device

	# set rtl8197 ipv6 acl rules
	proto_setup_ipv6_acl

	# enable rtl8197 ipv6 passthrough
	echo "1" > /proc/custom_Passthru

	insmod ipv6-pass-through wan_eth_name=$device lan_br_name=br-lan
	/etc/init.d/dhcp6s stop
#	killall dhcp6c
	/etc/init.d/radvd stop
	dlogin_iface_event lanv6 &
}

proto_passthrough_teardown() {
	local interface="$1"
	local ifname=""
	
	# disable rtl8197 ipv6 passthrough
	echo "0" > /proc/custom_Passthru

	rmmod  ipv6-pass-through
}

[ -n "$INCLUDE_ONLY" ] || {
	add_protocol passthrough
}
