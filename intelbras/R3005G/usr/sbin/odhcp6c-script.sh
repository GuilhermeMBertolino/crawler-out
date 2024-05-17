#!/bin/sh
[ -z "$2" ] && echo "Error: should be run by odhcpc6c" && exit 1

update_resolv() {
	local device="$1"
	local dns="$2"
	
	simple_lock odhcp6c_resolv
	(
		grep -v "#odhcp6c:$device:" /etc/resolv.conf > /tmp/resolv.conf.tmp
		for c in $dns; do
			echo "nameserver $c #odhcp6c:$device:" >> /tmp/resolv.conf.tmp
		done
		mv /tmp/resolv.conf.tmp /etc/resolv.conf
		chmod 0644 /etc/resolv.conf
	)
	simple_unlock odhcp6c_resolv
	rm -f /tmp/resolv.conf.tmp
}

setup_interface () {
	local device="$1"
	local t_PREFIXES=$PREFIXES
	local t_RDNSS=$RDNSS
	local table=`wan_id $device`
	local ndp_relay=0

	echo "---$1----env start-------"
	echo "RA_DNS=$RA_DNS"
	echo "RDNSS=$RDNSS"
	echo "PREFIXES=$PREFIXES"
	echo "RA_ADDRESSES=$RA_ADDRESSES"
	echo "ADDRESSES=$ADDRESSES"
	echo "RA_ROUTES=$RA_ROUTES"
	echo "---$1----env end-------"

	killall odhcpd
	sleep 1
	# Merge RA-DNS
	for radns in $RA_DNS; do
		local duplicate=0
		for dns in $RDNSS; do
			[ "$radns" = "$dns" ] && duplicate=1
		done
		[ "$duplicate" = 0 ] && RDNSS="$RDNSS $radns"
	done

	local dnspart=""
	for dns in $RDNSS; do
		if [ -z "$dnspart" ]; then
			dnspart="\"$dns\""
		else
			dnspart="$dnspart, \"$dns\""
		fi
	done

	update_resolv "$device" "$dns"

	local prefixpart=""
	for entry in $PREFIXES; do
		local addr="${entry%%,*}"
			entry="${entry#*,}"
			local preferred="${entry%%,*}"
			entry="${entry#*,}"
			local valid="${entry%%,*}"
			entry="${entry#*,}"
		[ "$entry" = "$valid" ] && entry=

		local class=""
		local excluded=""

		while [ -n "$entry" ]; do
			local key="${entry%%=*}"
					entry="${entry#*=}"
			local val="${entry%%,*}"
					entry="${entry#*,}"
			[ "$entry" = "$val" ] && entry=

			if [ "$key" = "class" ]; then
				class=", \"class\": $val"
			elif [ "$key" = "excluded" ]; then
				excluded=", \"excluded\": \"$val\""
			fi
		done

		local prefix="{\"address\": \"$addr\", \"preferred\": $preferred, \"valid\": $valid $class $excluded}"
		
		if [ -z "$prefixpart" ]; then
			prefixpart="$prefix"
		else
			prefixpart="$prefixpart, $prefix"
		fi

		# TODO: delete this somehow when the prefix disappears
		echo "ip -6 route add unreachable \"$addr\""
		ip -6 route add unreachable "$addr"
	done

	echo "ip -6 route flush dev \"$device\""
	ip -6 route flush dev "$device"
	ip -6 route flush table $table
	ip -6 route add fe80::/64 dev "$device" proto kernel metric 256
	echo "ip -6 address flush dev \"$device\" scope global"
	ip -6 address flush dev "$device" scope global

	# Merge addresses
#	for entry in $RA_ADDRESSES; do
#		local duplicate=0
#		local addr="${entry%%/*}"
#		for dentry in $ADDRESSES; do
#			local daddr="${dentry%%/*}"
#			[ "$addr" = "$daddr" ] && duplicate=1
#		done
#		[ "$duplicate" = "0" ] && ADDRESSES="$ADDRESSES $entry"
#	done

	local t_gw=""
	for entry in $RA_ADDRESSES; do
		local addr="${entry%%,*}"
		entry="${entry#*,}"
		local preferred="${entry%%,*}"
		entry="${entry#*,}"
		local valid="${entry%%,*}"

		if [[ $addr != fd00* ]]; then
			echo "ip -6 address add \"$addr\" dev \"$device\""
			ip -6 address add "$addr" dev "$device"
			break
		fi
	done

	for entry in $RA_ROUTES; do
		local addr="${entry%%,*}"
		entry="${entry#*,}"
		local gw="${entry%%,*}"
		entry="${entry#*,}"
		local valid="${entry%%,*}"
		entry="${entry#*,}"
		local metric="${entry%%,*}"

		if [ -n "$gw" ]; then
			if [ "$addr" = "::/0" ]; then
				t_gw="$gw"
				echo "ip -6 route add \"$addr\" via \"$gw\" metric \"$metric\" dev \"$device\" from \"::/0\" table $table"
				ip -6 route add "$addr" via "$gw" metric "$metric" dev "$device" from "::/0" table $table
			fi
		else
			if [ -n "$PREFIXES" ]; then
				echo "ip -6 route add \"$addr\" metric \"$metric\" dev \"$device\""
				ip -6 route add "$addr" metric "$metric" dev "$device"
			else
				# t_PREFIXES=$addr
				ndp_relay=1
			fi
		fi

#		for prefix in $PREFIXES; do
#			local paddr="${prefix%%,*}"
#			if [ -n "$gw" ]; then
#				echo "ip -6 route add \"$addr\" via \"$gw\" metric \"$metric\" dev \"$device\" from \"$paddr\" table $table"
#				ip -6 route add "$addr" via "$gw" metric "$metric" dev "$device" from "$paddr" table $table
#			fi
#		done
	done

	echo "wys mr ipv6 $table 1"
	wys mr ipv6 $table 1
	echo "ipv6_lan_reset \"$device\" \"$t_gw\" \"$t_PREFIXES\" \"$t_RDNSS\" \"$ndp_relay\""
	ipv6_lan_reset "$device" "$t_gw" "$t_PREFIXES" "$t_RDNSS" "$ndp_relay" &
}

teardown_interface() {
	local device="$1"
	killall odhcpd
	sleep 1

	ip -6 route flush dev "$device"
#	ip -6 route add ff00::/8 dev "$device" metric 256
	ip -6 route add fe80::/64 dev "$device" proto kernel metric 256
	ip -6 address flush dev "$device" scope global
	update_resolv "$device" ""
}

simple_lock odhcp6c.$1
echo "odhcp6c state: $1 $2 "
(
	case "$2" in
		bound)
			teardown_interface "$1"
			setup_interface "$1"
		;;
		informed|updated|rebound)
			setup_interface "$1"
		;;
		stopped|unbound)
			teardown_interface "$1"
		;;
		started)
			teardown_interface "$1"
		;;
	esac

	# user rules
	[ -f /etc/odhcp6c.user ] && . /etc/odhcp6c.user
	
# restart odhcpd
#	killall odhcpd
#	sleep 1
#	odhcpd &
)
simple_unlock odhcp6c.$1

