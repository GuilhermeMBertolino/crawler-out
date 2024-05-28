# Copyright (C) 2011-2014 TP-LINK
# Author Jason Guo<guodongxian@tp-link.com.cn>
# Date   21Aug08

. /lib/functions/network.sh

. /lib/bcmenet/bcmenet_c5400s.sh

IPTV_INITIALIZED=


# LAN CPU PORT ID, default 6
LAN_CPU_PORT=
# WAN CPU PORT ID, default 0
WAN_CPU_PORT=

#if you want to add new iptv type, only needs add its name in here.
IPTV_TYPES="internet iptv mciptv ipphone"

WAN_PHY_IF=
LAN_PHY_IF=
WAN_DFT_ID=
LAN_DFT_ID=

# c5400s.sh also use
wanIntVlanIf=""
wanIptvVlanIf=""
wanIpphoneVlanIf=""

iptv_init()
{
	
	[ -n "$IPTV_INITIALIZED" ] && return 0
	[ ! -d /lib/iptv ] && return 1
	local cmd="vconfig brctl"
	for c in $cmd; do
		local e=$(which $c)
		[ -z "$e" ] && return 1
	done

	. /lib/iptv/iptv_func.sh
	. /lib/iptv/iptv_network.sh

	# for c5400s/c4000
	c5400s_get_interface_group

	config_load iptv
	config_load network

	# FIXME:
	# We found that IPTV would change the 'network.lan.ifname' and 'network.wan.ifname',
	# so the default lan/wan vid info should not get from network, we get it from 'iptv.iptv.lan'
	# and 'iptv.iptv.wan'. If you have better way, help yourself to improve it.
	config_get wanif "iptv" "wan"
	config_get lanif "iptv" "lan"

#	local wdvid=${wanif#*.}
#	local wdev=${wanif%%.*}
#	local ldvid=${lanif#*.}
#	local ldev=${lanif%%.*}

#	[ "$wdvid" = "$wdev" ] && wdvid=${WAN_DFT_CPU##*:}
#	[ "$ldvid" = "$ldev" ] && ldvid=${LAN_DFT_CPU##*:}

#	WAN_DFT_CPU=${WAN_DFT_CPU%%:*}
#	LAN_DFT_CPU=${LAN_DFT_CPU%%:*}

#	export "WAN_PHY_IF"="$wdev"
#	export "LAN_PHY_IF"="$ldev"
#	export "WAN_DFT_ID"="${wdvid:-4094}"
#	export "LAN_DFT_ID"="${ldvid:-1}"
#	export "LAN_CPU_PORT"="${LAN_DFT_CPU:-6}"
#	export "WAN_CPU_PORT"="${WAN_DFT_CPU:-0}"

	local wdev=${wanif%%.*}
	local ldev=${lanif%%.*}
	
	export "WAN_PHY_IF"="$wdev"
	export "LAN_PHY_IF"="$ldev"

	IPTV_INITIALIZED=1

	return 0
}

# for c5400s
# $1 wan if
# $2 bridge mode
#
set_wan ()
{
	local tmpwanif=$1
	local tmpwanBridge=$2
	internetIf=$tmpwanif

	iptv_wan_set_ifname "$tmpwanif"
	config_get wan_type "wan" "wan_type"

	if [ "${tmpwanBridge}" = "1" ] ; then
		internetIf="br-wan"
		[ "$wtype" != "none" ] && iptv_set_bridge_type "wan"
		# Enable bridge igmp snooping
		config_get igmp_snooping_en "iptv" "igmp_snooping_enable"
		[ "$igmp_snooping_en" = "on" ] && iptv_igmp_snooping_set "wan" 1
		echo "br-wan" > /tmp/iptv_wan_iface
	else
		iptv_set_unbridge_type "wan"
		iptv_igmp_snooping_set "wan"
	fi

	[ "$wan_type" != "none" -a "$wan_type" = "pppoe" -o "$wan_type" = "pppoeshare" ] && {
		iptv_internet_set_ifname "${internetIf}"
	}

	iptv_wanv6_set_ifname "${internetIf}"
	iptv_pppshare_set_ifname "${internetIf}"

	echo "set wan if: ${tmpwanif}, internet if: ${internetIf}, wan in bridge: $tmpwanBridge"
}

# for c5400s/C4000/
# Dual LAN/Dual WAN affect lan interface.
# so ... c5400s_get_interface_group() will set all interface group
# here we just use it directly
#
bridge_lan ()
{
	echo "bridge lan ports: $internet_ifs"

	up_iface "br-lan"

	for tmpif in ${internet_ifs} ; do
		add_br_member "br-lan" "${tmpif}"
	done

	iptv_lan_set_ifname "${internet_ifs}"
	uci_set_state iptv core net_vif "${internet_ifs}"
}

# Here, we have modes: bridge, russia, exstream, unifi, maxis, custom 
iptv_bridge_mode_ex()
{
	local tmpwanBridge=0
	
	echo "iptv_bridge_mode_ex"

	config_get iptv_en "iptv" "enable"
	[ "$iptv_en" = "on" ] && bridge_lan

	# Create IPTV Bridge Device
	if [ -n "${iptv_ifs}" ] ; then
		bridge_wan "${iptv_ifs}" "wan"
		tmpwanBridge=1
	fi

	# For 2200/5400
	set_wan "$WAN_PHY_IF" $tmpwanBridge
	# Add rely for wanv6
	iptv_set_rely_iface "wanv6" "wan"
	
	# Add nat iptables rule, for avoid SNAT
	fw add i n postrouting_rule ACCEPT ^ { -m physdev --physdev-is-bridged }
}

internet_vlan_do_ex()
{
	echo "internet_vlan_do_ex"
	bridge_lan
}

# $1: ports
# $2: type_name, iptv, mciptv, ipphone, wan
# $3: wan_vid
# $4: wan output tag? tag - "t", untag - "*"
# $5: iptv_vid(used when mciptv enable)
bridge_wan()
{
	local ifs="$1"
	local type_name=$2
	local env_vif
	local tmp_wan_vif=

	if [ "${type_name}" = "wan" ] ; then
		tmp_wan_vif="${WAN_PHY_IF}"
	elif [ "${type_name}" = "mciptv" -o "${type_name}" = "iptv" ]; then
		tmp_wan_vif="${wanIptvVlanIf}"
	else
		tmp_wan_vif="${wanIpphoneVlanIf}"
	fi

	echo "bridge_wan \"${ifs}\" ${type_name} ${tmp_wan_vif}"

	[ -n "$ifs" ] && {

		create_br "br-"$type_name

		config_get igmp_snooping_en "iptv" "igmp_snooping_enable"
		if [ "$igmp_snooping_en" = "on" ]; then
			# the improxy doesn't service the br-wan, so config kernel to do this work.
			echo "1" > "/sys/devices/virtual/net/br-$type_name/bridge/multicast_querier"
			echo "1" > "/sys/devices/virtual/net/br-$type_name/bridge/multicast_snooping"
		else
			echo "0" > "/sys/devices/virtual/net/br-$type_name/bridge/multicast_querier"
			echo "0" > "/sys/devices/virtual/net/br-$type_name/bridge/multicast_snooping"
		fi

		for tmpif in ${ifs}; do
			add_br_member "br-"$type_name "${tmpif}"
			append env_vif "${tmpif} "
		done

		add_br_member "br-"$type_name "${tmp_wan_vif}"
		up_iface "br-"$type_name

		append env_vif "${tmp_wan_vif}"
		uci_set_state iptv core $type_name"_vif" "$env_vif"
	}
}

create_wan_vlan_ifs ()
{
	if [ $# -lt 4 ] ; then
		echo "invalid params at create_wan_vlan_ifs()"
		return 1
	fi

	local netports=$1
	local ipphoneports=$2
	local iptvports=$3
	local passports=$4

	up_iface $WAN_PHY_IF

	# create internet vlan
	if [ -n "${netports}" -o -n "${passports}" ] ; then
		[ $internet_vprio -gt 0 ] || internet_vprio=0
		wanIntVlanIf="${WAN_PHY_IF}.${internet_vid}"
		if [ "$internet_tag" = "on" ]; then
			create_vdevice $WAN_PHY_IF $internet_vid "${wanIntVlanIf}" $internet_vprio "all" "t"
		else
			create_vdevice $WAN_PHY_IF $internet_vid "${wanIntVlanIf}" $internet_vprio "all" "notag"
		fi
	fi

	if [ -n "${ipphoneports}" -o -n "${passports}" ] ; then
		wanIpphoneVlanIf="$WAN_PHY_IF.$ipphone_vid"
		if [ "${ipphone_vid}" -ne "0" ] ; then
			create_vdevice $WAN_PHY_IF $ipphone_vid "${wanIpphoneVlanIf}" $ipphone_vprio "all" "t"
		fi
	fi


	if [ -n "${iptvports}" -o -n "${passports}" ] ; then	
		if [ "${iptv_vid}" -ne 0 ] ; then
			if [ "$iptv_tag" = "on" ]; then
				if [ "${mciptv_enable}" = "on" ] ; then
					wanIptvVlanIf="$WAN_PHY_IF.${mciptv_vid}_${iptv_vid}"
					create_vif $WAN_PHY_IF "${wanIptvVlanIf}"
					set_vdevice_rule $WAN_PHY_IF $mciptv_vid "${wanIptvVlanIf}" $mciptv_vprio "multicast" "t"
					set_vdevice_rule $WAN_PHY_IF $iptv_vid "${wanIptvVlanIf}" $iptv_vprio "all" "t"
				else
					wanIptvVlanIf="$WAN_PHY_IF.$iptv_vid"
					create_vdevice $WAN_PHY_IF $iptv_vid "${wanIptvVlanIf}" $iptv_vprio "all" "t"
				fi
			else
				wanIptvVlanIf="$WAN_PHY_IF.$iptv_vid"
				create_vdevice $WAN_PHY_IF $iptv_vid "${wanIptvVlanIf}" $iptv_vprio "all" "notag"
			fi
		fi
	fi

	echo "wan internet if: \"${wanIntVlanIf}\""
	echo "wan iptv     if: \"${wanIptvVlanIf}\""
	echo "wan IP-Phone if: \"${wanIpphoneVlanIf}\""

	set_iface_mode "$WAN_PHY_IF" 3 1 1
}

# this function rely on create_wan_vlan_ifs() to create wan vlan interface and set wan vlan if name
#
bridge_passthrough ()
{
	local br_wan="br-wan"
	local br_iptv="br-iptv"
	local br_phone="br-ipphone"

	local int_list=${pt_int_ifs}
	local iptv_list=${pt_iptv_ifs}
	local ipphone_list=${pt_phone_ifs}

	echo "bridge_passthrough int: ${int_list}, iptv: ${iptv_list}, phone: ${ipphone_list}"

	# `netifd` will down eth5 then eth5.x will down automatically
	# set passthrough ifs to state, hotplug will up these ifs again
	#

	if [ -n "${int_list}" ] ; then
		create_br ${br_wan}
		add_br_member_list ${br_wan} ${wanIntVlanIf} ${int_list}
		up_iface ${wanIntVlanIf} ${int_list} ${br_wan}
		uci_set_state iptv core passthrough_net_ifs "${wanIntVlanIf} ${int_list}"
	fi

	if [ -n "${iptv_list}" ] ; then
		try_create_br ${br_iptv}
		add_br_member_list ${br_iptv} ${wanIptvVlanIf} ${iptv_list}
		up_iface ${wanIptvVlanIf} ${iptv_list} ${br_iptv}
		uci_set_state iptv core passthrough_iptv_ifs "${wanIptvVlanIf} ${iptv_list}"
	fi

	if [ -n "${ipphone_list}" ] ; then
		try_create_br ${br_phone}
		add_br_member_list ${br_phone} ${wanIpphoneVlanIf} ${ipphone_list}
		up_iface ${wanIpphoneVlanIf} ${ipphone_list} ${br_phone}
		uci_set_state iptv core passthrough_phone_ifs "${wanIpphoneVlanIf} ${ipphone_list}"
	fi
}

# this function remove all ifaces from br-lan
# because all vlan iface are deleted, so only remove `lan_ifs`
clear_dft_vif() 
{
	for intf in ${lan_ifs} ; do
		del_br_member "br-lan" ${intf}
		down_iface ${intf}
	done
}

iptv_load()
{
	config_get mode "iptv" "mode"
	config_get iptv_en "iptv" "enable"
	[ "$iptv_en" != "on" ] && mode="Bridge"
	uci_set_state iptv core mode "$mode"

	[ -z "${lan_ifs}" ] && return
	[ -z "${internet_ifs}" ] && return

	echo "iptv_load mode: $mode"


	# at boot time `netifd` may create some vlan interface and 
	# iptv unload is not called at boot time, so delete them at here
	# no param or param 1 is 0, for boottime
	if [ $# -eq 0 -o "$1" = "0" ] ; then
		c5400s_clear_all_bcmvlan
	fi

	# moved before `roboswitch_passthrough_vlan_mode_config`
	# or iface will be down.
	#
	[ "$iptv_en" = "on" ] && clear_dft_vif

	# set registers of robo switch and 53134, enable vlan, create LAN bcm vlan device
	# 
	[ "$iptv_en" = "on" ] && {
		# NOTICE: no need for 4-port products like c4000/ax1500
		#roboswitch_vlan_mode_config

		# must called after `roboswitch_vlan_mode_config` to enable vlan
		[ -n "${passpthrou_ifs}" ] && roboswitch_passthrough_vlan_mode_config
	}

	# add real ifs to iptv state, if `netifd` down them
	# up them at iptv hotplug
	uci_set_state iptv core lan_real_ifs "${lan_real_ifs}"

	case "$mode" in
		Bridge) 			
			# In bridge mode, only clear the lan default_if, because
			# wan default_if is used continually.
			iptv_bridge_mode_ex
		;;
		*)	
			# passthrough also rely on wan vlan if, so create wan vlan firstly
			create_wan_vlan_ifs "${internet_ifs}" "${ipphone_ifs}" "${iptv_ifs}" "${passpthrou_ifs}"

			# Do internet's initialization first, or other module would get the wrong state.
			[ -n "$internet_ifs" ] && internet_vlan_do_ex						# Internet	
			[ -n "$ipphone_ifs" ] && bridge_wan "${ipphone_ifs}" "ipphone"		# IP-Phone			 
			[ -n "$iptv_ifs" ] && bridge_wan "${iptv_ifs}" "iptv"				# Filter Multicast IPTV and IPTV to the same vdevice.
			[ -n "${passpthrou_ifs}" ] && bridge_passthrough					# Bridge

			local wanInBridge=0
			[ -n "${passpthrou_ifs}" ] && wanInBridge=1
			set_wan ${wanIntVlanIf} ${wanInBridge}
		;;
	esac

	config_get wtype "wan" "wan_type"

	# everything is ready now, why we need this sleep ?
	# sleep 5
	[ "$wtype" != "none" ] && {
		echo "[iptv_load]: iptv loading, to restart network" > /dev/console
		# FIXME: Terriable operation, as network start asyn, we need to sleep for N seconds
		iptv_rm_iface_from_netifd
		sleep 1
		/etc/init.d/network restart
	}
	return
}

# $1: lan default vid
iptv_reset_lan()
{	
	# For LAG
	echo "reset lan ${lan_ifs}"
	for intf in ${lan_ifs} ; do
		add_br_member "br-lan" ${intf}
	done		

	iptv_lan_set_ifname "${lan_ifs}"
}

# $1: wan default vid
iptv_reset_wan()
{	
	# For 2200
	# For c5400s
	iptv_wan_set_ifname "${WAN_PHY_IF}"
}

iptv_unload()
{
	local mode=$(uci_get_state iptv core mode)
	config_get wan_type "wan" "wan_type"

	echo "iptv_unload"

	# for 5400s, back to non vlan mode, all lan/wan vlan interfaces are deleted
	roboswitch_normal_mode_config

	# del all br if any
	del_br "br-wan" "br-iptv" "br-mciptv" "br-ipphone"

	iptv_set_unbridge_type "wan"
	iptv_igmp_snooping_set "wan"

	[ "$wan_type" != "none" -a "$wan_type" = "pppoe" -o "$wan_type" = "pppoeshare" ] && {
		iptv_internet_set_ifname "${WAN_PHY_IF}"					
	}

	iptv_wanv6_set_ifname "${WAN_PHY_IF}"
	iptv_pppshare_set_ifname "${WAN_PHY_IF}"

	if [ $mode = "Bridge" ] ; then
		iptv_del_rely_iface wanv6
		rm -fr /tmp/iptv_wan_iface
		# Remove the NAT iptables rule
		fw del i n postrouting_rule ACCEPT { -m physdev --physdev-is-bridged }
	fi

	iptv_reset_lan
	set_wan ${WAN_PHY_IF} 0
}

iptv_is_loaded()
{
	local en=$(uci_get_state iptv core enable)
	return $((! ${en:-0}))
}

iptv_lan_snooping_change()
{
	config_get igmp_snooping_en "iptv" "igmp_snooping_enable"
	config_get lan_snooping "lan" "igmp_snooping"
	if [ "$igmp_snooping_en" = "off" -a "$lan_snooping" = "1" ]; then
		iptv_igmp_snooping_set "lan" 0
		echo "0" > "/sys/devices/virtual/net/br-lan/bridge/multicast_snooping"
		return 0
	elif [ "$igmp_snooping_en" = "on" -a "$lan_snooping" = "0" ]; then
		iptv_igmp_snooping_set "lan" 1
		echo "1" > "/sys/devices/virtual/net/br-lan/bridge/multicast_snooping"
		return 0
	fi

	return 1
}

iptv_stop()
{
	! iptv_init && return

	echo "iptv_stop"

	local reload=0
	local restart=0
	
	iptv_lan_snooping_change && {
		reload=1
		echo "[iptv_stop]: lan snooping reloading" > /dev/console
	}

	# Let network attribute be normal
	# always keep wan device up for get link state
	iptv_set_device_attr keepup 1

	config_get iptv_en "iptv" "enable"
	iptv_is_loaded && {
		iptv_disconnect_ifs
		iptv_unload
		uci_toggle_state iptv core enable 0

		# Restart network, then anything will be normal
		[ "$iptv_en" = "off" ] && {
			restart=1
		}
	}

	if [ "$restart" = "1" ]; then
		echo "[iptv_stop]: iptv unloaded, to restart network" > /dev/console
		{
			iptv_rm_iface_from_netifd
			# async OP with iptv_rm_iface_from_netifd
			sleep 1
			/etc/init.d/network restart
			sleep 8
		}
	elif [ "$reload" = "1" ]; then
		echo "[iptv_stop]: lan snooping changed, to reload network" > /dev/console
		/etc/init.d/network reload
	else
		echo "[iptv_stop]: no change" > /dev/console
	fi
	
	unset IPTV_INITIALIZED
}

#wmf patch,added by zhangshengbo
mcwifi_update()
{
	config_get mcwifi_en "iptv" "mcwifi_enable"
	case $mcwifi_en in
		on)
			mcwifi_en=1
		;;
		off)
			mcwifi_en=0
		;;
	esac

	local old_mcwifi_en=`nvram get wmf_igmp_enable`
	if [ "$old_mcwifi_en" != "$mcwifi_en" ]; then
	    /sbin/wifi reload
	fi
}
#

iptv_start()
{
	! iptv_init && return

	echo "iptv_start $1"

	local reload=0
	
	iptv_lan_snooping_change && {
		reload=1
		echo "[iptv_start]: lan snooping reloading" > /dev/console
	}

	# Notice: No need on booting
	if [ $# -gt 0 -a "$1" = "1" ] ; then
		# when only set igmp configure, need to take it effect.
		/etc/init.d/improxy restart
	fi
	
	#wmf patch,added by zhangshengbo
	# update wireless multicast forwarding setting.
	mcwifi_update
	#
	
	config_get iptv_en "iptv" "enable"
	[ "$iptv_en" = "on" ] && {
		uci_revert_state iptv
		uci_set_state iptv core "" state
		uci_set_state iptv core enable 1
		# IPTV base on physical device, so we must make physical device keep up
		iptv_set_device_attr keepup 1
		
		iptv_load $1
		return
	}
	[ "$reload" = "1" ] && {
		echo "[iptv_start]: lan snooping changed, to reload network" > /dev/console
		/etc/init.d/network reload
	}
	# If IPTV not on, we have to clear IPTV information
	iptv_stop
}

iptv_restart()
{
	lock /var/run/iptv.lock
	#Create and write file, it means iptv module has been started by DUT.
	[ ! -f /tmp/iptv_state ] && echo "inited" >/tmp/iptv_state
	iptv_stop
	iptv_start 1
	lock -u /var/run/iptv.lock
}

