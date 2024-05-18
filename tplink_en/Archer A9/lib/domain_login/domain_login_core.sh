DLOGIN_HOST_PATH=/etc/hosts
DLOGIN_ALIAS_PATH=/etc/dnsmasq.conf

DLOGIN_LAN_IFACE=lan
DLOGIN_WAN_IFACE=wan
DLOGIN_KER_PATH=/lib/modules/3.3.8
DLOGIN_LIB_PATH=/lib/domain_login

DLOGIN_MOD_NAME=domain_login
DLOGIN_MANGLE_CHAIN=domain_login_rule

. /lib/functions/network.sh

dlogin_dnsmasq_restart()
{
	killall dnsmasq
	eval "/etc/init.d/dnsmasq start"
}

dlogin_iface_event()
{
	local iface=$1
	local _tp_domain
	local _ipaddr
	local _alias
	local _wanipaddr

	[ "$iface" != "$DLOGIN_LAN_IFACE" ] && return

	config_load domain_login
	config_get _tp_domain "tp_domain" domain

	network_get_ipaddr _ipaddr "$DLOGIN_LAN_IFACE"
	[ -z "$_ipaddr" -o "$_ipaddr" = "0.0.0.0" ] && {
		config_get _ipaddr "tp_domain" new_addr
	}

	network_get_ipaddr _wanipaddr "$DLOGIN_WAN_IFACE"
	[ -z "$_wanipaddr" ] && {
		_wanipaddr="0.0.0.0"
	}


	local old=$(grep -m 1 "$_tp_domain" $DLOGIN_HOST_PATH)
	local new="$_ipaddr $_tp_domain"
	if [ -n "$old" ]; then
		sed -i "s/$old/$new/g" $DLOGIN_HOST_PATH
	else
		sed -i "$ a\\$new" $DLOGIN_HOST_PATH
	fi

	local _domains=
	append _domains $_tp_domain
	config_get _alias "tp_domain" alias
	sed -i "/$_tp_domain/d" $DLOGIN_ALIAS_PATH
	[ -n "$_alias" ] && {
		for cname in $_alias; do
			local tmp="cname=$cname,$_tp_domain"
			sed -i "$ a\\$tmp" $DLOGIN_ALIAS_PATH
			append _domains $cname
		done
	}

	local alexa_smart_home_support=$(uci get profile.@smart_home[0].support -c "/etc/profile.d" -q)
	if [ -n "$alexa_smart_home_support" -a "$alexa_smart_home_support" = "yes" ]; then
		local _alexa_domain=$(uci get profile.@smart_home[0].domain -c "/etc/profile.d" -q)
		[ -n "$_alexa_domain" ] && { 
			append _domains $_alexa_domain
		}
	fi

	# Install the domain-dns for dut login by domain
	local dns_mod=$(lsmod|grep -o "domain_dns")
	local redirect_mod=$(lsmod|grep -o "domain_redirect") 
	[ -n "$dns_mod" ] && rmmod domain_dns
	[ -n "$redirect_mod" ] && rmmod $DLOGIN_KER_PATH/domain_redirect.ko
	local _def_domain
	config_get _def_domain "tp_domain" default_domain
	[ -z $_def_domain ] && _def_domain="default_domain"
	#mode: 0--router,1--ap; 
	local mode=0
	local _workmode _sysmode
	config_get _workmode "tp_domain" workmode "0"
	config_load sysmode
	config_get _sysmode sysmode mode "router"
	[ "$_sysmode" = "ap" -o "$_workmode" = "1" ] && mode=1
	if [ -n "$alexa_smart_home_support" -a "$alexa_smart_home_support" = "yes" ]; then
		insmod domain_dns lan_ip=$_ipaddr dut_domain="\"$_domains\"" ignore_me=0 default_domain="\"$_def_domain\"" mode=$mode  discover_domain="\"_alexa._tcp.local router._alexa._tcp.local\""
	else
		insmod domain_dns lan_ip=$_ipaddr dut_domain="\"$_domains\"" ignore_me=0 default_domain="\"$_def_domain\"" mode=$mode
	fi
	insmod $DLOGIN_KER_PATH/domain_redirect.ko lan_ip=$_ipaddr wan_ip=$_wanipaddr rediect_url="http://$_tp_domain/webpages/domain-redirect.html"

	[ "$_sysmode" = "ap" ] || dlogin_dnsmasq_restart

	return
}

dlogin_tip_install()
{
	local old_addr="$1"
	local old_mask="$2"
	local domain="$3"

	[ -z "$old_addr" -o -z "$old_mask" -o -z "$domain" ] && return

	local mod=$(lsmod | grep -o "domain_tip")
	[ -n "$mod" ] && {
		rmmod domain_tip
	}

	local mangle_rule=$(fw list 4 m | grep "$DLOGIN_MANGLE_CHAIN")
	[ -z "$mangle_rule" ] && {
		fw add 4 m "$DLOGIN_MANGLE_CHAIN"
		fw add 4 m PREROUTING "$DLOGIN_MANGLE_CHAIN"
	}

	# Create the firewall rules for NSS(conntrack not passthrough by NSS)
	fw flush 4 m "$DLOGIN_MANGLE_CHAIN"
	fw add 4 m "$DLOGIN_MANGLE_CHAIN" MARK { -d $old_addr -p tcp -m tcp --dport 80 --set-xmark 0xdead0000/0xffff0000 }
	# Install tip of domain kernel module 
	insmod domain_tip conflict_ip=$old_addr conflict_mask=$old_mask tp_domain=$domain

	return
}

dlogin_ip_conflict()
{
	local old_addr="$1"
	local old_mask="$2"
	local new_addr="$3"
	local new_mask="$4"

	[ -z "$old_addr" -o -z "$new_addr" ] && return

	# chmod 777 $DLOGIN_LIB_PATH/domain_login_config.lua

	#lua $DLOGIN_LIB_PATH/domain_login_config.lua $DLOGIN_MOD_NAME tp_domain conflict on
	#lua $DLOGIN_LIB_PATH/domain_login_config.lua $DLOGIN_MOD_NAME tp_domain new_addr $new_addr
	#lua $DLOGIN_LIB_PATH/domain_login_config.lua $DLOGIN_MOD_NAME tp_domain old_addr $old_addr
	#lua $DLOGIN_LIB_PATH/domain_login_config.lua $DLOGIN_MOD_NAME tp_domain old_mask $old_mask

	config_load domain_login
	local _tp_domain
	config_get _tp_domain "tp_domain" domain

	dlogin_syslog 21

	dlogin_tip_install $old_addr $old_mask "$_tp_domain"

	return
}

dlogin_redirect()
{
	local rdr=
	[ -e /proc/domain_login_dns ] && {
		rdr=$(cat /proc/domain_login_dns)
	}
	echo "$rdr"
}

dlogin_tips_mode()
{
	local mode=
	if [ -e /proc/domain_login ]; then
		local suc=$(cat /proc/domain_login | grep "success")
		if [ -n "$suc" ]
		then
			mode="1"
		else
			mode="0"
		fi
	else
		mode="0"
	fi

	echo "$mode"
}

dlogin_dst_addr()
{
	local _ipaddr
	network_get_ipaddr _ipaddr "$DLOGIN_LAN_IFACE"
	local dst=
	if [ -e /proc/domain_login ]; then
	local ipaddr=$(cat /proc/domain_login | cut -d " " -f1)
		if [ -n "$ipaddr" -a "$ipaddr" != "0.0.0.0" ]; then
			dst="$ipaddr"
		else
			# dst="0.0.0.0"
			dst="$_ipaddr"
		fi
	else
		# dst="0.0.0.0"
		dst="$_ipaddr"
	fi

	echo "$dst"
}

dlogin_dst_web_path()
{
	local wpath=
	if [ -e /proc/domain_login ]; then
	local wp=$(cat /proc/domain_login | cut -d " " -f2)
		wpath=${wp:-"/"}
	else
		wpath="/"
	fi

	echo "$wpath"
}

dlogin_conflict_cancel()
{
	# chmod 777 $DLOGIN_LIB_PATH/domain_login_config.lua
	lua $DLOGIN_LIB_PATH/domain_login_config.lua $DLOGIN_MOD_NAME tp_domain conflict off

	fw flush 4 m "$DLOGIN_MANGLE_CHAIN"
	fw del 4 m PREROUTING "$DLOGIN_MANGLE_CHAIN"
	fw del 4 m "$DLOGIN_MANGLE_CHAIN"

	rmmod domain_tip

	dlogin_syslog 22
}

