#!/bin/sh

[ -x /usr/sbin/pppd ] || exit 0

[ -n "$INCLUDE_ONLY" ] || {
	. /lib/functions.sh
	. /lib/functions/network.sh
	. ../netifd-proto.sh
	init_proto "$@"
}

ppp_select_ipaddr()
{
	local subnets=$1
	local res
	local res_mask

	for subnet in $subnets; do
		local addr="${subnet%%/*}"
		local mask="${subnet#*/}"

		if [ -n "$res_mask" -a "$mask" != 32 ]; then
			[ "$mask" -gt "$res_mask" ] || [ "$res_mask" = 32 ] && {
				res="$addr"
				res_mask="$mask"
			}
		elif [ -z "$res_mask" ]; then
			res="$addr"
			res_mask="$mask"
		fi
	done

	echo "$res"
}

ppp_exitcode_tostring()
{
	local errorcode=$1
	[ -n "$errorcode" ] || errorcode=5

	case "$errorcode" in
		0) echo "OK" ;;
		1) echo "FATAL_ERROR" ;;
		2) echo "OPTION_ERROR" ;;
		3) echo "NOT_ROOT" ;;
		4) echo "NO_KERNEL_SUPPORT" ;;
		5) echo "USER_REQUEST" ;;
		6) echo "LOCK_FAILED" ;;
		7) echo "OPEN_FAILED" ;;
		8) echo "CONNECT_FAILED" ;;
		9) echo "PTYCMD_FAILED" ;;
		10) echo "NEGOTIATION_FAILED" ;;
		11) echo "PEER_AUTH_FAILED" ;;
		12) echo "IDLE_TIMEOUT" ;;
		13) echo "CONNECT_TIME" ;;
		14) echo "CALLBACK" ;;
		15) echo "PEER_DEAD" ;;
		16) echo "HANGUP" ;;
		17) echo "LOOPBACK" ;;
		18) echo "INIT_FAILED" ;;
		19) echo "AUTH_TOPEER_FAILED" ;;
		20) echo "TRAFFIC_LIMIT" ;;
		21) echo "CNID_AUTH_FAILED";;
		*) echo "UNKNOWN_ERROR" ;;
	esac
}

ppp_generic_init_config() {
	proto_config_add_string username
	proto_config_add_string password
	proto_config_add_string keepalive
	proto_config_add_boolean keepalive_adaptive
	proto_config_add_int demand
	proto_config_add_string pppd_options
	proto_config_add_string 'connect:file'
	proto_config_add_string 'disconnect:file'
	#pppd 2.4.9 original
	#[ -e /proc/sys/net/ipv6 ] && proto_config_add_string ipv6
	#For real project, we control the "ipv6" from UCI DB rather than refers system proc(/proc/sys/net/ipv6).
	proto_config_add_string "ipv6"
	proto_config_add_boolean authfail
	proto_config_add_int mtu
	proto_config_add_string pppname
	proto_config_add_string unnumbered
	proto_config_add_boolean persist
	proto_config_add_int maxfail
	proto_config_add_int holdoff
	#20180727, Add "ipv6Only" parameter to decide the ipv4 ip can get from IPCP or not.
	proto_config_add_boolean "ipv6Only"
}

ppp_generic_setup() {
	local config="$1"; shift
	local localip

	json_get_vars ip6table demand keepalive keepalive_adaptive username password pppd_options pppname unnumbered persist maxfail holdoff peerdns

	#20180727, add the "ipv6Only" variable to this json_get_vars.
	json_get_vars ipv6Only
	#20180727, add "ipv6Only" parameter, if it be set to 1 that means "noip" will be bring to the pppd(+rp-pppoe.so) command to reject allocated ipv4 ip.
	if [ "$ipv6Only" == 1 ]; then
		ipv6Only="1";
	fi

	#pppd 2.4.9 original
	#[ ! -e /proc/sys/net/ipv6 ] && ipv6=0 || json_get_var ipv6 ipv6
	#For real project, we control the "ipv6" from UCI DB rather than refers system proc(/proc/sys/net/ipv6).
	json_get_var ipv6 ipv6

	if [ "$ipv6" = 0 ]; then
		ipv6=""
		noipv6="1" #Additional add. If using ipv4 only, we don't want to take effect for IPCPv6.
	elif [ -z "$ipv6" -o "$ipv6" = auto ]; then
		ipv6=1
		autoipv6=1
	fi

	if [ "${demand:-0}" -gt 0 ]; then
		#demand="precompiled-active-filter /etc/ppp/filter demand idle $demand"
		#20180510, For build up idle-timeout ppp connection, modify some parameter combination.
		#demand="precompiled-active-filter /etc/ppp/filter replacedefaultroute demand idle $demand"
		#20181016, For the idle timeout and dial on demand, correct the filter criteria for PPP connection.
		demand="replacedefaultroute demand idle $demand"
		activeFilter="outbound and ip[8] != 64"
		echo "nameserver 1.2.3.4" > /tmp/resolv.conf.auto #After ppp connection up(on-demand mode), this DNS record will be update from peers.(Because we using the "usepeersdns" parameter.)
		maxfail=0
		#20230215, "ipv6" and "demand" becomes exclusive option, if "demand" parameter be set, the "ipv6" parameter sholud be set to NULL string to avoid final pppd commands brings ipv6 related parameters.
		ipv6=""
		autoipv6=""
	else
		#demand=""
		#20180510, For build up idle-timeout ppp connection, modify some parameter combination.
		#20230208 add the "maxfail 0" in the demand string. It's to compatiable ppp2.4.9 and our implementation did not assign "maxfail" and "persist" in UCI DB.
		demand="replacedefaultroute"
		persist=1
		maxfail=0
		#The final demand string in this case will be "persist replacedefaultroute maxfail 0".
		#20230216, In ppp-2.4.9, the "set AUTOIPV6=1" and "set PEERDNS=$peerdns" must be brought to pppd command line when it needs to get IPv6 ip and related features.
		if [ "$ipv6" == 1 ]; then
			autoipv6=1
			peerdns=1
		fi
	fi
	if [ -n "$persist" ]; then
		[ "${persist}" -lt 1 ] && persist="nopersist" || persist="persist"
	fi
	if [ -z "$maxfail" ]; then
		[ "$persist" = "persist" ] && maxfail=0 || maxfail=1
	fi
	[ -n "$mtu" ] || json_get_var mtu mtu
	[ -n "$pppname" ] || pppname="${proto:-ppp}-$config"
	[ -n "$unnumbered" ] && {
		local subnets
		( proto_add_host_dependency "$config" "" "$unnumbered" )
		network_get_subnets subnets "$unnumbered"
		localip=$(ppp_select_ipaddr "$subnets")
		[ -n "$localip" ] || {
			proto_block_restart "$config"
			return
		}
	}

	[ -n "$keepalive" ] || keepalive="5 1"

	local lcp_failure="${keepalive%%[, ]*}"
	local lcp_interval="${keepalive##*[, ]}"
	local lcp_adaptive="lcp-echo-adaptive"
	[ "${lcp_failure:-0}" -lt 1 ] && lcp_failure=""
	[ "$lcp_interval" != "$keepalive" ] || lcp_interval=5
	[ "${keepalive_adaptive:-1}" -lt 1 ] && lcp_adaptive=""
	[ -n "$connect" ] || json_get_var connect connect
	[ -n "$disconnect" ] || json_get_var disconnect disconnect

	#20190125, fix RAX40-495, blank password issue
	cp /rom/etc/ppp/chap-secrets /etc/ppp/chap-secrets
	if [ "${password:-0}" -eq 0 ]; then
		echo "\"${username}\"	*	\"${password}\"	" >> /etc/ppp/chap-secrets
	fi

	#20180510, For build up idle-timeout ppp connection. Add noipv6, ipcp-accept-remote, ipcp-accept-local, holdoff, defaultroute, noipdefault and remove nodefaultroute.
	#20180727, Add the "ipv6Only" parameter to decide the "noip" option bring to pppd command/daemon or not.
	#20181016, For the idle timeout and dial on demand, add the "active-filter" option. If "activeFilter" variable be defined, add the "active-filter"(and the filter rule) option to bring to pppd command line.
	#20190502, If pppoev6 with dial-on-demand mode, the Link Local address must be specify to the pppoe interface, the "${demand:+ipv6 ::1,::2}" line.
	#20230208, In aftering model, using the "noIpv4" to replace "ipv6Only" naming but they control same option, "noip".
	proto_run_command "$config" /usr/sbin/pppd \
		nodetach ipparam "$config" \
		ifname "$pppname" \
		${ipv6Only:+noip} \
		${localip:+$localip:} \
		${lcp_failure:+lcp-echo-interval $lcp_interval lcp-echo-failure $lcp_failure $lcp_adaptive} \
		${ipv6:++ipv6} \
		${demand:+ipv6 ::1,::2} \
		${noipv6:+noipv6 1} \
		ipcp-accept-remote \
		ipcp-accept-local \
		${autoipv6:+set AUTOIPV6=1} \
		${ip6table:+set IP6TABLE=$ip6table} \
		${peerdns:+set PEERDNS=$peerdns} \
		defaultroute \
		usepeerdns \
		$demand $persist maxfail $maxfail \
		${activeFilter:+active-filter "$activeFilter"} \
		holdoff 12 \
		${username:+user "$username" password "$password"} \
		${connect:+connect "$connect"} \
		${disconnect:+disconnect "$disconnect"} \
		ip-up-script /lib/netifd/ppp-up \
		${ipv6:+ipv6-up-script /lib/netifd/ppp6-up} \
		ip-down-script /lib/netifd/ppp-down \
		${ipv6:+ipv6-down-script /lib/netifd/ppp-down} \
		${mtu:+mtu $mtu mru $mtu} \
		"$@" $pppd_options
}

ppp_generic_teardown() {
	local interface="$1"
	local errorstring=$(ppp_exitcode_tostring $ERROR)

	case "$ERROR" in
		0)
		;;
		2)
			proto_notify_error "$interface" "$errorstring"
			proto_block_restart "$interface"
		;;
		11|19)
			json_get_var authfail authfail
			proto_notify_error "$interface" "$errorstring"
			if [ "${authfail:-0}" -gt 0 ]; then
				proto_block_restart "$interface"
			fi
		;;
		*)
			proto_notify_error "$interface" "$errorstring"
		;;
	esac

	proto_kill_command "$interface"
}

# PPP on serial device

proto_ppp_init_config() {
	proto_config_add_string "device"
	ppp_generic_init_config
	no_device=1
	available=1
	lasterror=1
}

proto_ppp_setup() {
	local config="$1"

	json_get_var device device
	ppp_generic_setup "$config" "$device"
}

proto_ppp_teardown() {
	ppp_generic_teardown "$@"
}

proto_pppoe_init_config() {
	ppp_generic_init_config
	proto_config_add_string "ac"
	proto_config_add_string "service"
	proto_config_add_string "host_uniq"
	proto_config_add_int "padi_attempts"
	proto_config_add_int "padi_timeout"
	#20180621, Add for the Internet Test feature.
	proto_config_add_string "internetTest"
	#End of 20180621.

	lasterror=1
}

proto_pppoe_setup() {
	local config="$1"
	local iface="$2"

	for module in slhc ppp_generic pppox pppoe; do
		/sbin/insmod $module 2>&- >&-
	done

	json_get_var mtu mtu
	mtu="${mtu:-1492}"

	json_get_var ac ac
	json_get_var service service
	json_get_var host_uniq host_uniq
	json_get_var padi_attempts padi_attempts
	json_get_var padi_timeout padi_timeout
	#20180621, Add for the Internet Test feature.
	json_get_var internetTest internetTest
	#End of 20180621.

	ppp_generic_setup "$config" \
		plugin pppoe.so \
		${ac:+rp_pppoe_ac "$ac"} \
		${service:+rp_pppoe_service "$service"} \
		${host_uniq:+host-uniq "$host_uniq"} \
		${padi_attempts:+pppoe-padi-attempts $padi_attempts} \
		${padi_timeout:+pppoe-padi-timeout $padi_timeout} \
		${internetTest:+internetTest "$internetTest"} \
		"nic-$iface"
}

proto_pppoe_teardown() {
	ppp_generic_teardown "$@"
}

proto_pppoa_init_config() {
	ppp_generic_init_config
	proto_config_add_int "atmdev"
	proto_config_add_int "vci"
	proto_config_add_int "vpi"
	proto_config_add_string "encaps"
	no_device=1
	available=1
	lasterror=1
}

proto_pppoa_setup() {
	local config="$1"
	local iface="$2"

	for module in slhc ppp_generic pppox pppoatm; do
		/sbin/insmod $module 2>&- >&-
	done

	json_get_vars atmdev vci vpi encaps

	case "$encaps" in
		1|vc) encaps="vc-encaps" ;;
		*) encaps="llc-encaps" ;;
	esac

	ppp_generic_setup "$config" \
		plugin pppoatm.so \
		${atmdev:+$atmdev.}${vpi:-8}.${vci:-35} \
		${encaps}
}

proto_pppoa_teardown() {
	ppp_generic_teardown "$@"
}

proto_pptp_init_config() {
	ppp_generic_init_config
	proto_config_add_string "server"
	proto_config_add_string "interface"
	#20180621, Add for the Internet Test feature.
	proto_config_add_string "internetTest"
	#End of 20180621.
	available=1
	no_device=1
	lasterror=1
}

proto_pptp_setup() {
	local config="$1"
	local iface="$2"

	local ip serv_addr server interface
	json_get_vars interface server
	[ -n "$server" ] && {
		for ip in $(resolveip -t 5 "$server"); do
			( proto_add_host_dependency "$config" "$ip" $interface )
			serv_addr=1
		done
	}
	[ -n "$serv_addr" ] || {
		echo "Could not resolve server address"
		sleep 5
		proto_setup_failed "$config"
		exit 1
	}

	local load
	for module in slhc crc-ccitt ppp_generic ppp_async ppp_mppe ip_gre gre pptp; do
		grep -q "^$module " /proc/modules && continue
		/sbin/insmod $module 2>&- >&-
		load=1
	done
	[ "$load" = "1" ] && sleep 1

	#20180621, Add for the Internet Test feature.
	json_get_var internetTest internetTest
	#End of 20180621.
	#20180621, Add the "internetTest" option for the Internet Test feature.
	ppp_generic_setup "$config" \
		plugin pptp.so \
		${internetTest:+internetTest "$internetTest"} \
		pptp_server $server \
		file /etc/ppp/options.pptp
}

proto_pptp_teardown() {
	ppp_generic_teardown "$@"
}

[ -n "$INCLUDE_ONLY" ] || {
	add_protocol ppp
	[ -f /usr/lib/pppd/*/pppoe.so ] && add_protocol pppoe
	[ -f /usr/lib/pppd/*/pppoatm.so ] && add_protocol pppoa
	[ -f /usr/lib/pppd/*/pptp.so ] && add_protocol pptp
}
