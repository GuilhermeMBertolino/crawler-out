# Copyright (C) 2011-2014 TP-LINK
# Author Jason Guo<guodongxian@tp-link.com.cn>
# Date   21Aug08

. /lib/functions/network.sh
. /lib/iptv/iptv_func.sh
. /lib/switch/base.sh

KMOD_PATH=/lib/modules/iplatform

IPTV_INITIALIZED=

#if you want to add new iptv type, only needs add its name in here.
#IPTV_TYPES="internet iptv mciptv ipphone"

WAN_PHY_IF=
LAN_PHY_IF=

NVRAM="/usr/sbin/nvram"

nvram() {
	e=$(which $NVRAM)
	[ -n "$e" ] && "$NVRAM" "$@"
}

log () {
	echo "[IPTV] $@" >> /dev/console
	#echo "$@" >> /dev/null
}

# $1: name
is_interface_exist()
{
	local name=$1
	
	[ -z "$name" ] && return
	
	uci get network.$name > /dev/null 2>&1
	
	echo $?
}

# $1: name
# $2: ifname
# $3: vid
create_vdevice_interface()
{
	local name=$1
	local ifs=$2
	local vid=$3
	local found=0
	local ifname=""
	
	[ -z "$name" -o -z "$ifs" -o $vid -le 0 ] && return
	[ $(is_interface_exist "$name") -eq 0 ] && return

	for iface in $ifs; do
		iface=${iface%%.*}
		append ifname "${iface}.${vid}"
	done
	
	log "create interface $name : $ifname"
	uci set network.$name=interface
	uci set network.$name.ifname="$ifname"
	uci commit network
}

# $1: name
# $2: ifnames
# $3: igmp_snooping
create_bridge_interface()
{
	local name=$1
	local ifnames=$2
	local igmp_snooping=$3
	local found=0
	
	[ -z "$name" -o -z "$ifnames" ] && return
	
	found=$(is_interface_exist "$name")
	if [ $found -eq 0 ]; then
		log "modify bridge br-$name, ifnames: $ifnames, igmp_snooping : $igmp_snooping"
		uci set network.$name.ifname="$ifnames"
		uci set network.$name.igmp_snooping=$igmp_snooping	
	else
		log "create bridge br-$name, ifnames: $ifnames, igmp_snooping : $igmp_snooping"
		uci set network.$name=interface
		uci set network.$name.ifname="$ifnames"
		uci set network.$name.type=bridge
		uci set network.$name.igmp_snooping=$igmp_snooping	
	fi	
	uci commit network
}

# $1: name
# $2: ifname
create_macvlan_device()
{
	local name=$1
	local ifnames=$2
	local found=0

	[ -z "$name" -o -z "$ifnames" ] && return

	found=$(is_interface_exist "$name")
	if [ $found -eq 0 ]; then
		uci set network.$name.ifname="$ifnames"
	else
		uci set network.$name=device
		uci set network.$name.name="$name"
		uci set network.$name.ifname="$ifnames"
		uci set network.$name.type=macvlan
	fi
	uci commit network

	return
}

# $1: name
delete_interface()
{
	local name=$1
	[ -z "$name" ] && return
	
	[ $(is_interface_exist "$name") -eq 0 ] && {
		log "delete interface $name"
		uci delete network.$name
		uci commit network
	}
}

set_egress_mode()
{
	# TODO internet untag mode
	return
}

iptv_set_8021q_prio()
{
	local prio=$(uci_get_state iptv core priority)
	append prio "$1-$2"
	uci_toggle_state iptv core priority "$prio"
}

get__port_by_type() {
	local out=
	for p in $1; do
		local m=$(echo "$p"|grep "$2")
		[ -n "$m" ] && {
			local pid=${p%%:*}
			append out $pid
		}
	done
	echo $out
}

clear_dft_vlan()
{
	return
}

# $1:  mode
#	1: lan
#	2: wan
#	3: lan & wan
clear_dft_vif() 
{
	return
}

# $1: lan default vid
iptv_reset_lan()
{
	iptv_lan_set_ifname "$LAN_PHY_IF"
}

# $1: wan default vid
iptv_reset_wan()
{
	iptv_wan_set_ifname "$WAN_PHY_IF"
}

# $1: net_ports
# $2: net_vif
get_internet_vid()
{
	local net_ports=$1
	local net_vif=$2
	local i=0
	local j=0
	local int_vif=
	local int_vid=
	local wanphyports=$(get_wan_phyportseq)

	for port in $net_ports; do
		for wanport in $wanphyports; do
			if [ "$port" == "$wanport" ]; then
				break;
			fi
		done
		i=$((i + 1))
	done
	for vif in $net_vif; do
		if [ $j == $i ]; then
			int_vif=$vif
			break;
		fi
		j=$((j+1))
	done
	int_vid=${int_vif##*.}
	echo $int_vid
}

get_internet_vid_debug()
{
	local net_ports=$1
	local net_vif=$2
	local i=0
	local j=0
	local int_vif=
	local int_vid=
	local wanphyports=$(get_wan_phyportseq)

	for port in $net_ports; do
		echo "port $port $wanphyports"
		for wanport in $wanphyports; do
			if [ "$port" == "$wanport" ]; then
				break;
			fi
		done
		i=$((i + 1))
	done
	for vif in $net_vif; do
		if [ "$j" == "$i" ]; then
			int_vif=$vif
			break;
		fi
		j=$((j+1))
	done
	int_vid=${int_vif##*.}
	echo $int_vid
}

# $1 = wan_ifname (br-wan or eth1_macvlan); $2 = wan_if_list (eth1,lan0 or eth1_macvlan); $3 = wan_in_bridge
iptv_bridge_set_network_name()
{
	local wl3name="$1"
	local wl2name="$2"

	if [ "y" == "$3" ]; then
		iptv_set_bridge_type "wan"
		iptv_set_rely_iface "wanv6" "wan"
	else
		iptv_set_unbridge_type "wan"
		iptv_del_rely_iface
	fi

	iptv_proto_set_ifname "$wl3name"
	iptv_pppshare_set_ifname "$wl3name"
	uci set iptv.iptv.l3ifname="$wl3name"

	config_get wan_type "wan" "wan_type"
	[ "$wan_type" != "none" -a "$wan_type" = "pppoe" -o "$wan_type" = "pppoeshare" ] && {
			iptv_internet_set_ifname "$wl3name"
	}

	iptv_wan_set_ifname "$wl2name"
	uci set iptv.iptv.l2ifname="$wl2name"
}



iptv_bridge_mode_ex()
{
	local net_env iptv_env
	local net_vifs iptv_vifs
	local vifaces
	local ifs
	local index
	local wanphyports=$(get_wan_phyportseq)
	local ports_internet=$(get_used_portseq "internet")
	local ports_iptv=$(get_used_portseq "iptv")

	# 1) set lan interfaces
	index=1
	for port in $ports_internet; do
		[ -z "$port" ] && continue

		ifs=$(eval "echo \"${internet_ifs}\" | awk '{print \$${index}}'")
		[ -z "$ifs" ] && continue

		append net_env $port
		append vifaces "${port}-${ifs}"
		index=$((index+1))
	done
	# rtl8367 create eth0.LAN_HNAT_ID for br-lan
	net_vifs="$LAN_IF_NAME.$LAN_HNAT_ID"
	uci_set_state iptv core net_port "$net_env"
	uci_set_state iptv core net_vif "$net_vifs"
	uci_toggle_state iptv core viface "$vifaces"
	iptv_lan_set_ifname "$net_vifs"
	
	# 2) set wan interfaces
	# rtl8367 no need create br-wan
	append iptv_vifs "$WAN_PHY_IF"
	iptv_bridge_set_network_name "${WAN_PHY_IF}" "${WAN_PHY_IF}" "n"

	uci_toggle_state iptv core wan_vif "$iptv_vifs"
	
	uci commit network
	uci commit iptv

	local wan_ports="$iptv_env"
	append wan_ports "$wanphyports"
	uci_set_state iptv core wan_port "$wan_ports"

	# Add nat iptables rule, for avoid SNAT
#	fw add i n postrouting_rule ACCEPT ^ { -m physdev --physdev-is-bridged }
}

# Get vid in vid_map by index.
# $1: vid_map
# $2: index
get_vid()
{
	local vid_map=$1
	local index=$2
	local i=1
	
	for vid in $vid_map;do
		if [ $i = $index ];then
			echo $vid
			return
		else
			i=$(($i+1))
		fi
	done
	return
}
# Use to mark the vid position in ports.
# example: iptv ports = "1 3 4", iptv_lan_vid_map="10 11 12"
# output should be: "10 0 11 12"
# 
# $1: ports
# $2: vid_map
set_vid_pos()
{
	local ports=$1
	local vid_map=$2
	local vid=
	local out=
	local j=1
	local lanports=$(get_lan_portseq)

	for phyport in $lanports;do
		local flag=$(echo $ports | grep "$phyport")
		if [ -n "$flag" ]; then
			vid=$(get_vid "$vid_map" $j)
			j=$(($j+1))
			append out $vid
		else
			append out "0"
		fi	
	done
	echo "$out"
}

# $1: ifaces (wan)
# $2: lan ports
# $3: type (iptv or voip)
# $4: vid
# $5: tag
bridge_wan_iptv_or_voip()
{
	local ifaces="$1"
	local ports="$2"
	local type_name=$3
	local wan_vid=$4
	local tag=$5
	local env_port env_vif
	local lan_vid_map
	local index
	local wanphyports=$(get_wan_phyportseq)
	local vifaces=$(uci_get_state iptv core viface)
	local wanif tmpvif
	local wanport

	[ $wan_vid -eq 0 -a "$tag" = "t" ] && {
		uci_toggle_state iptv core viface "$vifaces"
		return
	}
	[ -n "$ports" ] && {
		local tmp_vid_map=
		local tmp_lan_vid=

		# get all the device
		# rtl8197 do not add lan_port to br-iptv / br-voip
		index=1
		for port in $ports; do
			append env_port $port
			append vifaces "${port}-null"
			index=$((index+1))
		done
		# rtl8197 always create eth1.xxx for br-iptv / br-voip
		for wanif in $WAN_PHY_IF; do
			wanif=${wanif%%.*}
		#	if [ "$tag" = "t" ];then
				append env_vif "${wanif}.${wan_vid}"
		#	else
		#		append env_vif "${wanif}"
		#	fi
		done
		
		# create wan vlan interface config
		# create_vdevice_interface "$type_name_wan" "${WAN_PHY_IF}" $wan_vid
		
		# create bridge config
		local igmp_snooping=0
		[ "$iptv_igmp_snooping_enable" = "on" ] && igmp_snooping=1

		create_bridge_interface "$type_name" "$env_vif" $igmp_snooping

		index=1
		for wanif in $WAN_PHY_IF; do
			wanport=$(eval "echo \"${wanphyports}\" | awk '{print \$${index}}'")
			wanif=${wanif%%.*}
			
			if [ "$tag" = "t" ];then
				tmpvif="${wanif}.${wan_vid}"
			else
				tmpvif="$wanif"
			fi

			if [ "$tag" = "t" ];then
				if [ "$type_name" == "iptv" ]; then
					[ $iptv_vprio -gt 0 ] && iptv_set_8021q_prio "$tmpvif" $iptv_vprio
				elif [ "$type_name" == "ipphone" ]; then
					[ $ipphone_vprio -gt 0 ] && iptv_set_8021q_prio "$tmpvif" $ipphone_vprio
				fi
			fi

			append env_port $wanport
			append env_vif "$tmpvif"
			append vifaces "${wanport}-${tmpvif}"

			index=$((index+1))
		done

		uci_set_state iptv core $type_name"_port" "$env_port"
		uci_set_state iptv core $type_name"_vif" "$env_vif"
		
		tmp_vid_map=$(set_vid_pos "$ports" "$lan_vid_map")
		uci_set_state iptv core $type_name"_vid_pos" "$tmp_vid_map"
	}
	uci_toggle_state iptv core viface "$vifaces"
}

internet_vlan_do_ex()
{
	[ -z "$internet_ifs" ] && return

	local net_iface="$internet_ifs"
	local net_ports=$(get_used_portseq "internet")
	local net_env_port net_env_vif
	local wan_env_port wan_env_vif
	local ifs
	local index
	local wanphyports=$(get_wan_phyportseq)
	local vifaces=$(uci_get_state iptv core viface)
	local wanif tmpvif
	local wanport
	local intname

	index=1
	for port in $net_ports; do
		[ -z "$port" ] && continue

		ifs=$(eval "echo \"${net_iface}\" | awk '{print \$${index}}'")
		[ -z "$ifs" ] && continue
		
		append net_env_port $port

		# rtl8197 always use only one iface for all lan
		if [ "x$net_env_vif" = "x" ]; then
			tmpvid=$(found_unuse_vid)
			net_env_vif="$ifs.$tmpvid"
		fi

		index=$((index+1))
	done

	iptv_lan_set_ifname "$net_env_vif"

	# Create WAN VLAN Entry	
	[ $internet_vid -gt 0 ] && {
		if [ "$internet_tag" = "on" ]; then
			echo "internet_tag on"
		else
			echo "internet_tag off"
		fi 

		# create wan vlan interface config,
		index=1
		for wanif in $WAN_PHY_IF; do
			wanport=$(eval "echo \"${wanphyports}\" | awk '{print \$${index}}'")
			wanif=${wanif%%.*}

			if [ $index -eq 1 ]; then
				intname="internet_wan"
			else
				intname="internet_wan${index}"
			fi
			
			if [ "$gen_wan_vid_mode" = "0" ]; then
				if [ "$internet_tag" = "on" ]; then
					# create_vdevice_interface "$intname" "$wanif" $internet_vid
					tmpvif="${wanif}.${internet_vid}"
					[ $internet_vprio -gt 0 ] && iptv_set_8021q_prio "$tmpvif" $internet_vprio
				else
					tmpvif="${wanif}"
				fi 
			elif [ "$gen_wan_vid_mode" = "1" ]; then
				# create_vdevice_interface "$intname" "$wanif" $internet_vid
				tmpvif="${wanif}.${internet_vid}"
				[ $internet_vprio -gt 0 ] && iptv_set_8021q_prio "$tmpvif" $internet_vprio
			else
				tmpvif="${wanif}"
				[ $internet_vprio -gt 0 ] && iptv_set_8021q_prio "$tmpvif" $internet_vprio
			fi
			
			tmpvif="${wanif}"
			[ $internet_vprio -gt 0 ] && iptv_set_8021q_prio "$tmpvif" $internet_vprio

			append wan_env_port $wanport
			append wan_env_vif "$tmpvif" 
			append vifaces "${wanport}-${tmpvif}"

			index=$((index+1))
		done

		iptv_wan_set_ifname "$wan_env_vif"
		config_get wan_type "wan" "wan_type"
		[ "$wan_type" != "none" -a "$wan_type" = "pppoe" -o "$wan_type" = "pppoeshare" ] && {
			iptv_internet_set_ifname "$wan_env_vif"
		}
		iptv_proto_set_ifname "$wan_env_vif"
		iptv_pppshare_set_ifname "$wan_env_vif"
		
		uci set iptv.iptv.l3ifname="$wan_env_vif"
		uci set iptv.iptv.l2ifname="$wan_env_vif"
		uci commit network
		uci commit iptv
	} || {
		uci set iptv.iptv.l3ifname="$WAN_PHY_IF"
		uci commit iptv
	}

	append net_env_port "$wan_env_port"
	append net_env_vif "$wan_env_vif"
	uci_set_state iptv core net_port "$net_env_port"
	uci_set_state iptv core net_vif "$net_env_vif"
	uci_toggle_state iptv core viface "$vifaces"	
}

iphone_vlan_do_ex()
{
	[ -z "$ipphone_ifs" ] && return 

	local ports_ipphone=$(get_used_portseq "ipphone") 
	if [ "$ipphone_tag" = "on" ];then	
		bridge_wan_iptv_or_voip "$ipphone_ifs" "$ports_ipphone" "ipphone" "$ipphone_vid" "t"
	else
		bridge_wan_iptv_or_voip "$ipphone_ifs" "$ports_ipphone" "ipphone" "$ipphone_vid" "*"
	fi
}

# $1: ports
# $2: iptv vid
# $3: mcast vid
# $4: wan output tag? tag - "t", untag - "*"
mcast_vlan_do_ex()
{
	local ifaces="$1"
	local ports="$2"
	local iptv_vid=$3
	local mcast_vid=$4
	local tag=$5
	local env_port env_vif
	local env_lan_port=0
	local tmp
	local lan_vid
	local lan_vid_map
	local wanphyports=$(get_wan_phyportseq)
	local vifaces=$(uci_get_state iptv core viface)
	local wanif tmpvif
	local wanport
	local iptvname mcastname

	[ $iptv_vid -gt 0 -a $mcast_vid -gt 0 -a -n "$ports" ] && {
		index=1
		for wanif in $WAN_PHY_IF; do
			wanport=$(eval "echo \"${wanphyports}\" | awk '{print \$${index}}'")
			wanif=${wanif%%.*}

			# create mcast wan vlan interface config
			tmpvif="${wanif}.${mcast_vid}"
			append env_vif "$tmpvif"
			append vifaces "${wanport}-${tmpvif}"
			append env_port $wanport

			[ $mciptv_vprio -gt 0 ] && iptv_set_8021q_prio "$tmpvif" $mciptv_vprio

			index=$((index+1))
		done

		index=1
		# rtl8197 do not add lan_port to br-mciptv
		for port in $ports; do
			append env_port $port
			append vifaces "${port}-null"
			
			tmp=$(get_lan_phyport_bylogic $port)
			env_lan_port=$((env_lan_port + (1 << tmp)))
			index=$((index+1))
		done
		
		# create bridge config
		local igmp_snooping=0
		[ "$iptv_igmp_snooping_enable" = "on" ] && igmp_snooping=1
		create_bridge_interface "mciptv" "$env_vif" $igmp_snooping
		
		uci_set_state iptv core "mciptv_port" "$env_port"
		uci_set_state iptv core "mciptv_lan_port" "$env_lan_port"
		uci_set_state iptv core "mciptv_vif" "$env_vif"
		tmp_vid_map=$(set_vid_pos "$ports" "$lan_vid_map")
		uci_set_state iptv core "mciptv_vid_pos" "$tmp_vid_map"
	}
	
	uci_toggle_state iptv core viface "$vifaces"
}

iptv_vlan_do_ex()
{
	[ -z "$iptv_ifs" ] && return

	local ports_iptv=$(get_used_portseq "iptv")
	if [ "$mciptv_enable" = "on" ]; then
		mcast_vlan_do_ex "$iptv_ifs" "$ports_iptv" "$iptv_vid" "$mciptv_vid" "t"
	fi
	if [ "$iptv_tag" = "on" ];then
		bridge_wan_iptv_or_voip "$iptv_ifs" "$ports_iptv" "iptv" "$iptv_vid" "t"
	else
		bridge_wan_iptv_or_voip "$iptv_ifs" "$ports_iptv" "iptv" "$iptv_vid" "*"
	fi
}

# type_name
# vid
# vprio
# vport
# bport
# tag
config_bridge_port()
{
	local type_name="$1"
	local vid
	local vprio
	local vports
	local vifs
	local tag
	
	local bridge_vif=""
	local env_vif=""
	local env_port=""
	local vifaces=""
	local index
	local wanif tmpvif
	local vdevname

	if [ "$type_name" = "internet" ]; then
		vid="${internet_vid}"
		vprio="${internet_vprio}"
		vports=""
		vifs="${internet_ifs}"
		if [ "$internet_tag" = "on" ]; then
			tag="t"
		else
			tag="*"
		fi
	elif [ "$type_name" = "iptv" ]; then
		vid="${iptv_vid}"
		vprio="${iptv_vprio}"
		vports=$(get_used_portseq "iptv")
		vifs="${iptv_ifs}"
		tag="t"
	elif [ "$type_name" = "ipphone" ]; then
		vid="${ipphone_vid}"
		vprio="${ipphone_vprio}"
		vports=$(get_used_portseq "ipphone")
		vifs="${ipphone_ifs}"
		tag="t"
	else
		return
	fi
	
	[ $vid -gt 0 ] && {
		index=1
		for wanif in $WAN_PHY_IF; do
			wanif=${wanif%%.*}

			# create wan vdevice

			if [ "$gen_wan_vid_mode" = "0" ]; then
				if [ "$type_name" = "internet" -a "$internet_tag" = "off" ]; then
					tmpvif="${wanif}"
				else					
					tmpvif="${wanif}.${vid}"
				fi 
			elif [ "$gen_wan_vid_mode" = "1" ]; then
				tmpvif="${wanif}.${vid}"
			else
				tmpvif="${wanif}"
			fi

			# if [ "$type_name" = "internet" -a "yes" == "${macvlan}" ]; then
			#	create_macvlan_device "wanmv" "$tmpvif"
			#	tmpvif="wanmv"
			# fi

			append env_vif "$tmpvif"
			index=$((index+1))
		done

		# create lan vdevice, bridge port need the same vid with the wan port
		index=1
		for port in $(get_used_portseq "bridge"); do
			ifname=$(eval "echo \"${passpthrou_ifs}\" | awk '{print \$${index}}'")
			[ -z "$ifname" -o -z "$port" ] && continue
			ifname=${ifname%%.*}
			
			if [ "$gen_wan_vid_mode" = "0" ]; then
				if [ "$type_name" = "internet" -a "$internet_tag" = "off" ]; then
					vifname="${ifname}"
				else	
					vifname="${ifname}.${vid}"
					# create_vdevice_interface "${type_name}_lan$port" "$ifname" $vid
				fi 
			elif [ "$gen_wan_vid_mode" = "1" ]; then
				vifname="${ifname}.${vid}"
				# create_vdevice_interface "${type_name}_lan$port" "$ifname" $vid
			else
				vifname="${ifname}"
			fi
			
			append env_port "$port"
			append env_vif "${vifname}"
			append vifaces "${port}-${vifname}"
			append bridge_vif "$vifname"
			index=$((index+1))
		done
		
		index=1
		for port in $vports; do
			ifname=$(eval "echo \"${vifs}\" | awk '{print \$${index}}'")
			[ -z "$ifname" -o -z "$port" ] && continue
			
			append env_port "$port"
			append env_vif "${ifname}"
			append vifaces "${port}-${ifname}"
			index=$((index+1))
		done
	
		# create bridge
		local igmp_snooping=0
		[ "$iptv_igmp_snooping_enable" = "on" ] && igmp_snooping=1
		if [ "$type_name" = "internet" ]; then
			# if [ "yes" == "${macvlan}" ]; then 
			#	create_bridge_interface "brmv" "$env_vif" $igmp_snooping
			# else
				create_bridge_interface "wan" "$env_vif" $igmp_snooping
				uci_toggle_state iptv core wan_in_bridge "yes"
				uci set iptv.iptv.l3ifname="br-wan"
				uci set iptv.iptv.l2ifname="$env_vif"
				uci commit iptv
			# fi
		else
			create_bridge_interface "$type_name" "$env_vif" $igmp_snooping
		fi
	}
	
	uci_toggle_state iptv core "${type_name}_vif" "$env_vif"
	uci_toggle_state iptv core "${type_name}_port" "$env_port"
	uci_toggle_state iptv core viface "$vifaces"
	uci_toggle_state iptv core bridge_vif "$bridge_vif"
}

config_bridge_mode()
{
	local env_port="" 
	local env_vif=""
	local index
	
	local vifaces=$(uci_get_state iptv core viface)
	index=1
	for port in $(get_used_portseq "bridge"); do
		ifname=$(eval "echo \"${ifaces}\" | awk '{print \$${index}}'")
		[ -z "$ifname" ] && continue

		append env_port $port
		append env_vif "$ifname"
		index=$((index+1))
	done	
	uci_set_state iptv core "bridge_port" "$env_port"
	uci_set_state iptv core "bridge_vif" "$env_vif"
	 
	[ -n "$internet_vid" ] && {
		config_bridge_port "internet"

		# [ "no" == "$macvlan" ] && {
			config_get wan_type "wan" "wan_type"
			iptv_set_bridge_type "wan"
			[ "$wan_type" != "none" -a "$wan_type" = "pppoe" -o "$wan_type" = "pppoeshare" ] && {
				iptv_internet_set_ifname "br-wan"
			}
			iptv_proto_set_ifname "br-wan"
			iptv_pppshare_set_ifname "br-wan"
		# }
	}
	
	[ -n "$iptv_vid" -a $iptv_vid -gt 0 ] && config_bridge_port "iptv"
	[ -n "$ipphone_vid" -a $ipphone_vid -gt 0 ] && config_bridge_port "ipphone"
}

passthrough_vlan_do_ex()
{
	[ -z "$passpthrou_ifs" ] && return

	config_bridge_mode
}

# $1 = section
iptv_delete_lan_wan_device()
{
	local section="$1"
	local type=$(uci get network.$section.type 2>/dev/null)
	if [ "$type" != "macvlan" ]; then
		uci delete network.$section
	fi
}

iptv_reset_network_device()
{
	config_load network
	config_foreach iptv_delete_lan_wan_device device
}

iptv_init()
{
	[ -n "$IPTV_INITIALIZED" ] && return 0

	. /lib/iptv/iptv_init.sh
	. /lib/iptv/iptv_func.sh
	. /lib/iptv/iptv_network.sh

	iptv_interface_init

	config_load iptv
	config_load network

	# FIXME:
	# We found that IPTV would change the 'network.lan.ifname' and 'network.wan.ifname',
	# so the default lan/wan vid info should not get from network, we get it from 'iptv.iptv.lan'
	# and 'iptv.iptv.wan'. If you have better way, help yourself to improve it.
	# it maybe sequence of ethx or ethx.y
	local wdev=""
	local ldev=""
	
	for dev in "$(get_wan_initifs)" ; do
		list_contains wdev "$dev" || append wdev "$dev"
	done
	
	for dev in "$(get_lan_initifs)" ; do
		list_contains ldev "$dev" || append ldev "$dev"
	done
	
	export "WAN_PHY_IF"="$wdev"
	export "LAN_PHY_IF"="$ldev"
	log "WAN_PHY_IF=$wdev"
	log "LAN_PHY_IF=$ldev"

	IPTV_INITIALIZED=1

	return 0
}

iptv_load()
{
	local mode="$iptv_mode"

	[ "$iptv_enable" != "on" ] && mode="Bridge"
	uci_set_state iptv core mode "$mode"

	[ -z "${lan_ifs}" ] && return
	[ -z "$internet_ifs" ] && return

	uci_set_state iptv core wan_in_bridge "no"

	case "$mode" in
		Bridge) 
			# In bridge mode, only clear the lan default_if, because
			# wan default_if is used continually.
			clear_dft_vif 1
			iptv_bridge_mode_ex

			setup_switch_vlan_bridgemode $WAN_HNAT_ID $LAN_HNAT_ID $iptvPortMask $internetPortMask 

			;;
		*)
			clear_dft_vif 3
			clear_dft_vlan

			uci_set_state iptv core viface ""

			# Do internet's initialization first, or other module would get the wrong state.
			# Internet
			internet_vlan_do_ex
			# IP-Phone
			iphone_vlan_do_ex
			# Multicast IPTV should be first, because of the default pvid. 
			iptv_vlan_do_ex	
			# config bridge port
			# passthrough_vlan_do_ex

			local wan_iptv_tag=0
			local l_mc_vid=0
			if [ "$internet_tag" == "on" ]; then
				wan_iptv_tag=1
			fi
			if [ "$iptv_tag" == "on" ]; then
				wan_iptv_tag=$((wan_iptv_tag+2))
			fi
			if [ "$mciptv_enable" == "on" ]; then
				l_mc_vid=$mciptv_vid
			fi
			setup_switch_vlan_tagmode $internet_vid $iptv_vid $ipphone_vid $l_mc_vid $internetPortMask $iptvPortMask $ipphonePortMask $wan_iptv_tag $(found_unuse_vid) $bridgePortMask $internet_vprio $iptv_vprio $ipphone_vprio $mciptv_vprio

			;;
	esac

	# reset network.@device
	iptv_reset_network_device
	/sbin/network_firm $@

	lua -e 'require("luci.sys.config").saveconfig()'

	config_get wtype "wan" "wan_type"
	[ "$wtype" != "none" ] && {
		# FIXME: Terriable operation, as network start asyn, we need to sleep for N seconds
		config_clear
		
		#add by wanghao
		#save VLAN config to uci state
		uci_set_state iptv core internet_vid "$internet_vid"
		uci_set_state iptv core iptv_vid "$iptv_vid"
		uci_set_state iptv core mciptv_vid "$mciptv_vid"
		uci_set_state iptv core ipphone_vid "$ipphone_vid"
		uci_set_state iptv core internet_tag "$internet_tag"
		uci_set_state iptv core bridgePort "$bridgePort"
		[ -n "$iptv_tag" ] && uci_set_state iptv core iptv_tag "$iptv_tag"
		[ -n "$ipphone_tag" ] && uci_set_state iptv core ipphone_tag "$ipphone_tag"
		
		#save LAN vids
		[ -n "$vids" ] && uci_set_state iptv core vids "$vids"
		
		echo "restart" > /tmp/run/network_running
		#add end
		
		link_down_lan_ports
		/etc/init.d/network restart
		link_up_lan_ports
		
		#add by wanghao
		if [ "$iptv_enable" == "on" ]; then
			env -i CONFIG="IPTV" /sbin/hotplug-call switch
		else
			env -i CONFIG="IGMP_SNOOPING" /sbin/hotplug-call switch
		fi
		#add end
	}
	return
}

iptv_unload()
{
	local mode=$(uci_get_state iptv core mode)
	local br_wan_ports=$(uci_get_state iptv core wan_port)
	local lanports=$(get_lan_portseq)

	echo "iptv_unload"

	# reset in normal mode
	reset_normal_mode
	
	setup_switch_vlan_disable

	config_get wan_type "wan" "wan_type"
	case $mode in
		Bridge)
	
			[ -n "$br_wan_ports" ] && {

				iptv_set_unbridge_type "wan"
				iptv_igmp_snooping_set "wan"
				[ "$wan_type" != "none" -a "$wan_type" = "pppoe" -o "$wan_type" = "pppoeshare" ] && {
					iptv_internet_set_ifname "${WAN_PHY_IF}"
				}

				iptv_proto_set_ifname "${WAN_PHY_IF}"
				iptv_del_rely_iface wanv6
				iptv_pppshare_set_ifname "${WAN_PHY_IF}"

			}

			delete_interface "iptv"
			delete_interface "wanmv"

			iptv_reset_lan 
			iptv_reset_wan 
			
			# Remove the NAT iptables rule
#			fw del i n postrouting_rule ACCEPT { -m physdev --physdev-is-bridged }
		;;
		*)
		
			delete_interface "iptv"
			delete_interface "ipphone"
			delete_interface "mciptv"
			delete_interface "wanmv"
			delete_interface "brmv"

			# delete_interface "iptv_wan"
			# delete_interface "ipphone_wan"
			# delete_interface "internet_wan"
			# delete_interface "mcast_wan"

			#for i in $lanports;do
			#	delete_interface "iptv_lan$i"
			#	delete_interface "ipphone_lan$i"
			#	delete_interface "internet_lan$i"
			#	delete_interface "mcast_lan$i"
			#done	
			
			iptv_set_unbridge_type "wan"
				
			[ "$wan_type" != "none" -a "$wan_type" = "pppoe" -o "$wan_type" = "pppoeshare" ] && {
				iptv_internet_set_ifname "${WAN_PHY_IF}"
			}

			iptv_proto_set_ifname "${WAN_PHY_IF}"
			iptv_pppshare_set_ifname "${WAN_PHY_IF}"

			iptv_reset_lan 
			iptv_reset_wan 
		;;
	esac
	
	uci commit network
	lua -e 'require("luci.sys.config").saveconfig()'
}

iptv_is_loaded()
{
	local en=$(uci_get_state iptv core enable)
	return $((! ${en:-0}))
}

iptv_stop()
{
	! iptv_init && return

	echo "iptv_stop"

	# Let network attribute be normal
	# always keep wan device up for get link state
	iptv_set_device_attr keepup 1
	iptv_igmp_snooping_set "lan" 0

	[ "$iptv_enable" = "on" ] || iptv_is_loaded && iptv_disconnect_ifs

	iptv_is_loaded && {
		iptv_unload
		uci_toggle_state iptv core enable 0

		# Restart network, then anything will be normal
		# restart network as default config	
		config_clear
		link_down_lan_ports
		/etc/init.d/network restart
		link_up_lan_ports
		#sleep 5
	}
	
#	iptvc_destroy

	unset IPTV_INITIALIZED	
}

iptv_start()
{
	! iptv_init && return

	echo "iptv_start $1"

	# pre start process
	pre_start
	
	# wifi check
	wifi_update

#	[ "$iptv_enable" = "on" ] && {
#		iptvc_init
#	}

	if [ "$iptv_igmp_snooping_enable" = "on" ]; then
		echo 1 > /proc/br_igmpsnoop
		echo 1 > /proc/br_mldsnoop
	else
		# Not recommended, multicast hardware acceleration will fail
		echo 0 > /proc/br_igmpsnoop
		echo 0 > /proc/br_mldsnoop
	fi

	[ "$iptv_enable" = "on" ] && {	
		uci_revert_state iptv
		uci_set_state iptv core "" state
		uci_set_state iptv core enable 1
		# IPTV base on physical device, so we must make physical device keep up
		iptv_set_device_attr keepup 1
#		[ "$iptv_igmp_snooping_enable" = "on" ] && iptv_igmp_snooping_set "lan" 1
		iptv_load $1
		return
	} || /etc/init.d/improxy restart
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

