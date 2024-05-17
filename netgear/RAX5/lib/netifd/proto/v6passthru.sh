#!/bin/sh
# passthru.sh - IPv6 passthrough
#
[ -n "$INCLUDE_ONLY" ] || {
        . /lib/functions.sh
        . /lib/functions/network.sh
        . ../netifd-proto.sh
        init_proto "$@"
}

proto_v6passthru_setup() {
        local cfg="$1"
        local iface="$2"
        local passthru_ifname

        json_get_vars passthru_ifname
        # use macvlan mode ipv6, the macvlan dev will only passthrough ipv6 packets, 
        # and it can avoid wan mac cloned from lan passthrough not work issue
        ip link add "$passthru_ifname" link "$iface" type macvlan mode ipv6
        proto_init_update "$passthru_ifname" 1
        # comment ebtables rules if macvlan mode is ipv6
        #ebtables -t broute -D BROUTING -i "$passthru_ifname" -p ! ipv6 -j DROP
        #ebtables -t nat -D POSTROUTING -o "$passthru_ifname" -p ! ipv6 -j DROP
        #ebtables -t broute -A BROUTING -i "$passthru_ifname" -p ! ipv6 -j DROP
        #ebtables -t nat -A POSTROUTING -o "$passthru_ifname" -p ! ipv6 -j DROP
        proto_send_update  "$cfg"
        brctl addif br-lan "$passthru_ifname"
}

proto_v6passthru_teardown() {
        local cfg="$1"
        local iface="$2"
        local passthru_ifname

        json_get_vars passthru_ifname
        brctl delif br-lan "$passthru_ifname"
        ip link delete "$passthru_ifname" link "$2" type macvlan mode ipv6
        # comment ebtables rules if macvlan mode is ipv6
        #ebtables -t broute -D BROUTING -i "$passthru_ifname" -p ! ipv6 -j DROP
        #ebtables -t nat -D POSTROUTING -o "$passthru_ifname" -p ! ipv6 -j DROP
}

proto_v6passthru_init_config() {
        available=1
        proto_config_add_string "passthru_ifname"
}

[ -n "$INCLUDE_ONLY" ] || {
        add_protocol v6passthru
}
