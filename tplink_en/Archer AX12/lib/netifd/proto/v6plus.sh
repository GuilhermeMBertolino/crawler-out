#!/bin/sh

[ -n "$INCLUDE_ONLY" ] || {
    . /lib/functions.sh
    . /lib/functions/network.sh
    . ../netifd-proto.sh
    config_load /etc/config/sysmode
    config_get mode sysmode mode "router"
    [ "$mode" = "ap" ] && exit 0
	#init_proto functions 
    init_proto "$@"
}

DHCP_PIDFILE="/var/run/udhcpc-v6plus.pid"

proto_v6plus_init_config() {
	available=1
	
	proto_config_add_int "state"
	#proto_config_add_string "rule"
	proto_config_add_int "remoteIPv6Address"
	proto_config_add_string "localIPv6Address"
	proto_config_add_int "pdIPv6Address"
	proto_config_add_string "ipaddr"

	proto_config_add_string "tunlink"
	proto_config_add_int "mtu"
	proto_config_add_int "ttl"
	proto_config_add_string "zone"
	proto_config_add_string "type"
	proto_config_add_string "encaplimit"
	
}

v6plus_fw_teardown_fun()
{
	#nat_chain_flush v6plus_output
	#fw s_del 4 f  {"-i v6plus-$gcfg -j"} v6plus_output
	#fw del 4 f  nat v6plus_output
	iptables -t nat -F v6plus_output
	iptables -t nat -D zone_wan_nat -j v6plus_output
	iptables -t nat -X v6plus_output
	
	iptables -t nat -F v6plus_checkports
	iptables -t nat -D zone_lan_prerouting -j v6plus_checkports
	iptables -t nat -X v6plus_checkports
}


proto_v6plus_setup() {
	local cfg="$1"
	local iface="$2"
	local tunlink="wanv6"
	local link="v6plus-$cfg"
	local carrier
	
	local zone type 
	
	local ipaddr pdlen pd 
	export LEGACY=1
	
	echo "proto_v6plus_setup ...... " > /dev/console
	# [ -z "$zone" ] && zone="wan"
	# [ -z "$type" ] && type="map-e"
	local mtu ttl peeraddr ip6addr
	json_get_vars ttl  peeraddr ip6addr
	
	# [ -z "$zone" ] && zone="wan"
	# [ -z "$type" ] && type="map-e"
	
	mtu=65000
	tunlink=${tunlink:-wanv6}
	
	config_load /etc/config/network
	config_get carrier $cfg carrier
	case $carrier in
		[1-3])
			echo carrier is JPNE or BIGLOBE > /dev/console
			;;
		4)
			echo carrier is OCN > /dev/console
			;;
	esac
	
	proto_export "INTERFACE=$cfg"
	proto_export "IFNAME=$iface"
	
	mkdir -p /tmp/v6plus/
	# proto_send_update "$cfg"
	# shell trigger v6plus 
	echo  "####   link  $link " > /dev/console
	echo  "####   mtu $mtu " > /dev/console
	echo  "####   tunlink $tunlink " > /dev/console
	
	proto_run_command "$cfg" /usr/sbin/v6plus \
			-i "$link" \
			-m "$mtu" \
			-6 "$tunlink" \
			-f "$iface" \
			-c "$carrier" \
			"$cfg"
	
	[ -e "/proc/mape_fast_forward" ] && echo 1 0 > /proc/mape_fast_forward
}

proto_v6plus_teardown() {
	
	echo "proto_v6plus_teardown Start" > /dev/console
	
	local cfg="$1"
	local ifname="$2"
	local link="v6plus-$cfg"
	config_load /etc/config/network
	config_get local_addr $cfg localIPv6Address
	config_get l3_device $cfg device6
	
	ubus call network.interface.hgw disconnect
	[ -f "$DHCP_PIDFILE" ] && {
		pid=$(cat "$DHCP_PIDFILE")
		time=6
		kill $pid
		while [ $time -ne 0 -a -d "/proc/$pid" ]; do
			echo killing udhcpd > /dev/console
			let "time=time - 1"
			sleep 1
		done
		[ -d "/proc/$pid" ] && {
			kill -9 $pid
			sed -i '/\./d' /tmp/resolv.conf.auto
		}
	}
	[ -n "$local_addr" ] && [ -n "$l3_device" ] && ifconfig $l3_device del "$local_addr/64"
	killall v6plus-dial.sh

	[ -x "/usr/bin/hw_nat" ] && hw_nat -W 0
	
	[ -e "/proc/mape_fast_forward" ] && echo 0 0 > /proc/mape_fast_forward
	
	echo "proto_v6plus_teardown Middle 1 " > /dev/console
	
	json_get_var type type
	
	echo "proto_v6plus_teardown Middle 2 " > /dev/console
	
	[ -z "$type" ] && type="map-e"
	
	proto_kill_command $cfg
	
	echo "proto_v6plus_teardown Middle 3 " > /dev/console
	
	v6plus_fw_teardown_fun 
	#rm -f /tmp/map-$cfg.rules
	rm -rf /tmp/v6plus/

	rm -rf /tmp/v6plus-fmrs-old
	/etc/init.d/parental_control restart

	
	echo "proto_v6plus_teardown End " > /dev/console
}





[ -n "$INCLUDE_ONLY" ] || {
	add_protocol v6plus
}
