# Copyright (C) 2011-2014 TP-LINK
# Author Jason Guo<guodongxian@tp-link.com.cn>
# Date   21Aug08

. /lib/functions/network.sh

IPTV_INITIALIZED=

PHY_LAN_PORT_NUM=4

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
DEFALUT_MULTI_LAN_DEV=0
DEFALUT_MULTI_WAN_DEV=0
STOPPED=

special_id=$(getfirm SPECIAL_ID)

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

	config_load iptv
	config_load network

	# FIXME:
	# We found that IPTV would change the 'network.lan.ifname' and 'network.wan.ifname',
	# so the default lan/wan vid info should not get from network, we get it from 'iptv.iptv.lan'
	# and 'iptv.iptv.wan'. If you have better way, help yourself to improve it.
	config_get wanif "iptv" "wan"
	config_get lanif "iptv" "lan"

	# maybe wanif = "eth0.1 eth0.2", lanif = "eth1.1 eth1.2 eth1.3 eth1.4"
	# so LAN_DFT_ID ="1 2 3 4"

	local flag=0
	local ldvid=
	local wdvid=
	for vif in $lanif; do
		append ldvid ${vif#*.}
		let $((flag=$flag+1))
	done

	[ $flag -gt 1 ] && DEFALUT_MULTI_LAN_DEV=1

	flag=0
	for vif in $wanif; do
		append wdvid ${vif#*.}
		let $((flag=$flag+1))
	done
	[ $flag -gt 1 ] && DEFALUT_MULTI_WAN_DEV=1

	local wdev=${wanif%%.*}
	local ldev=${lanif%%.*}

	[ "$wdvid" = "$wdev" ] && wdvid=${WAN_DFT_CPU##*:}
	[ "$ldvid" = "$ldev" ] && ldvid=${LAN_DFT_CPU##*:}

	WAN_DFT_CPU=${WAN_DFT_CPU%%:*}
	LAN_DFT_CPU=${LAN_DFT_CPU%%:*}

	export "WAN_PHY_IF"="$wdev"
	export "LAN_PHY_IF"="$ldev"
	export "WAN_DFT_ID"="${wdvid:-4094}"
	export "LAN_DFT_ID"="${ldvid:-1}"
	export "LAN_CPU_PORT"="${LAN_DFT_CPU:-6}"
	export "WAN_CPU_PORT"="${WAN_DFT_CPU:-0}"

	IPTV_INITIALIZED=1

	return 0
}

# Get lan phy port id.
# $1: serial number
get_lan_port_id()
{
	local index=$1
	local i=1

	for pid in $LAN_PHY_PORT_SET;do
		if [ $i = $index ];then
			echo $pid
			return
		else
			i=$(($i+1))
		fi
	done
	echo $index
	return
}

# Here, we have modes: bridge, russia, exstream, unifi, maxis, custom 
iptv_bridge_mode_ex()
{
	local net_ports="$1"
	local iptv_ports="$2"
	
	local net_env iptv_env
	local net_vif iptv_vif
	local vifaces
	local pid vid
	local used_vid=$(uci_get_state iptv core vid_map)

	# Now just use used_vid mechanism to avoid repeated used vid.
	local wvid=$WAN_DFT_ID
	append used_vid $wvid
	up_iface "br-lan"
	for netp in $net_ports; do
		[ -z "$netp" ] && continue
		pid=$netp
		if [ $(is_used_vid $pid "$used_vid") -eq "1" ];then
			vid=$(select_vid "$used_vid")
		else
			vid=$pid
		fi

		create_vdevice $LAN_PHY_IF $vid $pid "*" $LAN_CPU_PORT "t"
		add_br_member "br-lan" "${LAN_PHY_IF}.${vid}"

		append net_env $pid
		append net_vif "${LAN_PHY_IF}.${vid}"
		append vifaces "${pid}-${LAN_PHY_IF}.${vid}"
		append used_vid $vid
	done
	uci_set_state iptv core net_port "$net_env"
	uci_set_state iptv core net_vif "$net_vif"
	uci_toggle_state iptv core vid_map "$used_vid"
	uci_toggle_state iptv core viface "$vifaces"
	iptv_lan_set_ifname "$net_vif"

	# Create IPTV Bridge Device
	if [ -n "$iptv_ports" ];then 
		bridge_wan "$iptv_ports" "wan" $wvid "*"
		config_get wan_type "wan" "wan_type"
		#[ "$wtype" != "none" ] && 
		iptv_set_bridge_type "wan"
		# Enable bridge igmp snooping
		config_get igmp_snooping_en "iptv" "igmp_snooping_enable"
		[ "$igmp_snooping_en" = "on" ] && iptv_igmp_snooping_set "wan" 1

		[ "$wan_type" != "none" -a "$wan_type" = "pppoe" -o "$wan_type" = "pppoeshare" ] && {
			iptv_internet_set_ifname "br-wan"
		}

		iptv_wanv6_set_ifname "br-wan"
		iptv_pppshare_set_ifname "br-wan"

		echo "br-wan" > /tmp/iptv_wan_iface
	else
		#need to delete the br-wan.
		iptv_set_unbridge_type "wan"
	fi
	# For some products which have two gmac, it may not create device by vlan id
	if [ ${GMAC_NUM:-1} -lt 2 ];then
		iptv_wan_set_ifname "$WAN_PHY_IF.$WAN_DFT_ID"
	else
		iptv_wan_set_ifname "$WAN_PHY_IF"
	fi
	# Add nat iptables rule, for avoid SNAT
	fw add i n postrouting_rule ACCEPT ^ { -m physdev --physdev-is-bridged }
}

internet_vlan_do_ex()
{
	local net_ports="$1"
	local bridge_ports="$2"
	local net_env_port net_env_vif
	local vid pid

	local vifaces=$(uci_get_state iptv core viface)
	local used_vid=$(uci_get_state iptv core vid_map)

	local pvid_p6_set=
	for netp in $net_ports; do
		[ -z "$netp" ] && continue
		pid=$netp
		if [ $(is_used_vid $pid "$used_vid") -eq "1" ];then
			vid=$(select_vid "$used_vid")
		else
			vid=$pid
		fi

		append used_vid $vid
		create_vdevice $LAN_PHY_IF $vid $pid "*" $LAN_CPU_PORT "t"
		# why ?
		[ -z "$pvid_p6_set" ] && {
			set_pvid $LAN_CPU_PORT $vid
			pvid_p6_set=1
		}
		#
		add_br_member "br-lan" "${LAN_PHY_IF}.${vid}" 
		append net_env_port $pid
		append net_env_vif "${LAN_PHY_IF}.${vid}"
		append vifaces "${pid}-${LAN_PHY_IF}.${vid}"
	done
		iptv_lan_set_ifname "$net_env_vif"

	# Create WAN VLAN Entry
	config_get internet_tag "iptv" "internet_tag"
	config_get internet_vid "iptv" "internet_vid"
	[ "$internet_tag" = "on" -o "$CHIP_TYPE" != "shiva" ] && [ $internet_vid -gt 0 ] && {
		if [ "$internet_tag" = "on" ]; then
			create_vdevice $WAN_PHY_IF $internet_vid $WAN_PHY_PORT_SET "t" $WAN_CPU_PORT "t"
		else
			create_vdevice $WAN_PHY_IF $internet_vid $WAN_PHY_PORT_SET "*" $WAN_CPU_PORT "t"
		fi 
		# CPU port should be set as WAN port
		set_pvid $WAN_CPU_PORT $internet_vid
		
		config_get internet_vprio "iptv" "internet_vprio"
		[ $internet_vprio -gt 0 ] && set_8021q_prio "${WAN_PHY_IF}.${internet_vid}" 0 $internet_vprio
		
		append net_env_port $WAN_PHY_PORT_SET
		append net_env_vif "${WAN_PHY_IF}.${internet_vid}" 
		append vifaces "${WAN_PHY_PORT_SET}-${WAN_PHY_IF}.${internet_vid}"
		iptv_wan_set_ifname "${WAN_PHY_IF}.${internet_vid}"
		config_get wan_type "wan" "wan_type"
		[ "$wan_type" != "none" -a "$wan_type" = "pppoe" -o "$wan_type" = "pppoeshare" ] && {
			iptv_internet_set_ifname "${WAN_PHY_IF}.${internet_vid}"
		}

		iptv_wanv6_set_ifname "${WAN_PHY_IF}.${internet_vid}"
		iptv_pppshare_set_ifname "${WAN_PHY_IF}.${internet_vid}"
	}
	if [ -n "$bridge_ports" ];then 
        config_get internet_tag2 "iptv" "internet_tag"
        if [ "$internet_tag2" = "on" ]; then
            add_vlan_member $internet_vid $bridge_ports "t"
        else
            add_vlan_member $internet_vid $bridge_ports "*"
        fi
        set_pvid $bridge_ports $internet_vid
        append net_env_port $bridge_ports
        append net_env_vif "${WAN_PHY_IF}.${internet_vid}"
        append vifaces "${bridge_ports}-${WAN_PHY_IF}.${internet_vid}"
    fi
	uci_set_state iptv core net_port "$net_env_port"
	uci_set_state iptv core net_vif "$net_env_vif"
	uci_toggle_state iptv core vid_map "$used_vid"
	uci_toggle_state iptv core viface "$vifaces"
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

	for i in `seq $PHY_LAN_PORT_NUM`;do
		phy_port=$(get_lan_port_id "$i")
		local flag=$(echo $ports | grep "$phy_port")
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


bridge_add()
{
    local bridge_ports="$1"
    local vlanID="$2"
    local tag="$3"

    if [ -n "$bridge_ports" ];then 
        for bridgeP in $bridge_ports; do
            echo "add_vlan_member" "$vlanID" "$bridgeP" "$tag"  >/dev/console
            add_vlan_member "$vlanID" "$bridgeP" "$tag"
        done
    else
        echo "###### not exec bridge command" >/dev/console
    fi
}


bridge_set_for_vdf()
{
       local iptv_vid="$1"
       local ipphone_vid="$2"
       #iptv wan and lan4
       #et robowr  0x05 0x81 $iptv_vid
       #et robowr  0x05 0x83 0x31
       #et robowr  0x05 0x80 0x80
	   add_vlan_member  "$iptv_vid" "1" "t"
	   add_vlan_member  "$iptv_vid" "5" "t"
       #ipphone
	   create_vlan_entry "$ipphone_vid"
	   add_vlan_member  "$ipphone_vid" "1" "t"
	   add_vlan_member  "$ipphone_vid" "5" "t"
	   
       #et robowr  0x05 0x81 $ipphone_vid
      # et robowr  0x05 0x83 0x31
       #et robowr  0x05 0x80 0x80

}


# $1: ports
# $2: type_name, iptv, mciptv, ipphone, wan
# $3: wan_vid
# $4: wan output tag? tag - "t", untag - "*"
bridge_wan()
{
	local ports="$1"
	local type_name=$2
	local wan_vid=$3
	local tag=$4
	local env_port env_vif
	local lan_vid pid
	local lan_vid_map

	local vifaces=$(uci_get_state iptv core viface)
	local used_vid=$(uci_get_state iptv core vid_map)

	[ $wan_vid -gt 0 -a -n "$ports" ] && {
		local tmp_vid_map=
		local tmp_wan_vif=
		local tmp_pid=0

		create_br "br-"$type_name
		config_get igmp_snooping_en "iptv" "igmp_snooping_enable"
		if [ "$igmp_snooping_en" = "on" ]; then
			echo "1" > "/sys/devices/virtual/net/br-$type_name/bridge/multicast_snooping"
		else
			echo "0" > "/sys/devices/virtual/net/br-$type_name/bridge/multicast_snooping"
		fi
		for port in $ports; do
			pid=$port
			if [ $(is_used_vid $pid "$used_vid") -eq "1" ];then
				lan_vid=$(select_vid "$used_vid")
			else
				lan_vid=$pid
			fi
			echo "bridge_wan port($port) vid($lan_vid)"
			append lan_vid_map $lan_vid
			append used_vid $lan_vid
			# Start multicast IPTV vlan configure flow
			create_vdevice $LAN_PHY_IF $lan_vid $pid "*" $LAN_CPU_PORT "t"
			add_br_member "br-"$type_name "${LAN_PHY_IF}.${lan_vid}" 

			append env_port $pid
			append env_vif "${LAN_PHY_IF}.${lan_vid}"
			append vifaces "${pid}-${LAN_PHY_IF}.${lan_vid}"
		done
		
		# When type is wan, it need to add bridge member by different GMAC
		# If GMAC is 2, it means that virtual device which not have VID
		if [ ${GMAC_NUM:-1} -eq 2 -a "${type_name}" = "wan" ];then
			create_vdevice $WAN_PHY_IF $wan_vid $WAN_PHY_PORT_SET "$tag" $WAN_CPU_PORT "*" "noPidSet"
			add_br_member "br-"$type_name "${WAN_PHY_IF}"
			tmp_wan_vif="${WAN_PHY_IF}"
		else
			create_vdevice $WAN_PHY_IF $wan_vid $WAN_PHY_PORT_SET "$tag" $WAN_CPU_PORT "t" "noPidSet"
			add_br_member "br-"$type_name "${WAN_PHY_IF}.${wan_vid}"
			tmp_wan_vif="${WAN_PHY_IF}.${wan_vid}"
		fi

		config_get iptv_vprio "iptv" $type_name"_vprio"
		# When iptv_vprio is nil, it may read config in wrong way, so read internet
		# vprio as default 
		[ -z "$iptv_vprio" ] && config_get iptv_vprio "iptv" "internet_vprio"
		[ $iptv_vprio -gt 0 ] && set_8021q_prio "${WAN_PHY_IF}.${wan_vid}" 0 $iptv_vprio
		up_iface "br-"$type_name
	
		append env_port $WAN_PHY_PORT_SET
		append env_vif "${tmp_wan_vif}"
		append vifaces "${WAN_PHY_PORT_SET}-${tmp_wan_vif}"
		uci_set_state iptv core $type_name"_port" "$env_port"
		uci_set_state iptv core $type_name"_vif" "$env_vif"
		
		tmp_vid_map=$(set_vid_pos "$ports" "$lan_vid_map")
		uci_set_state iptv core $type_name"_vid_pos" "$tmp_vid_map"
		
	}
	uci_toggle_state iptv core vid_map "$used_vid"
	uci_toggle_state iptv core viface "$vifaces"
}

iptv_set_8021q_prio()
{
	set_8021q_prio "$1" 0 $2
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
	for vid in ${LAN_DFT_ID:-1}; do
	for lp in $LAN_PHY_PORT_SET; do
			del_vlan_member $vid $lp
		done
		del_vlan_member $vid ${LAN_CPU_PORT}
		delete_vlan_entry $vid
	done

	for vid in ${WAN_DFT_ID:4094}; do
	for wp in $WAN_PHY_PORT_SET; do
			del_vlan_member $vid $wp
		done
		del_vlan_member $vid $WAN_CPU_PORT
		delete_vlan_entry $vid 
	done
	flush_fdb
}

# $1:  mode
#	1: lan
#	2: wan
#	3: lan & wan
clear_dft_vif() 
{
	local mode=$1
	local suffix=""

	case "$mode" in
	1)
		# Remove the default lan if from br-lan Bridge Device
		# the lan vid would be: eth1.1 eth1.2 eth1.3 eth1.4 .etc.
		for vid in ${LAN_DFT_ID}; do
			if [ $DEFALUT_MULTI_LAN_DEV == 1 ]; then
			      	suffix=".$vid"
			else
				[ ${GMAC_NUM:-1} -lt 2 ] && suffix=".${LAN_DFT_ID}"
			fi
		del_br_member "br-lan" "${LAN_PHY_IF}${suffix}"
		[ -n "${LAN_DFT_ID}" -a ${GMAC_NUM:-1} -lt 2 ] && {
				down_iface "${LAN_PHY_IF}.$vid"
				destroy_vif "${LAN_PHY_IF}.$vid"
		}
		done
	;;
	2)
		for vid in ${WAN_DFT_ID}; do
		[ -n "${WAN_DFT_ID}" -a ${GMAC_NUM:-1} -lt 2 ] && {
			down_iface "${WAN_PHY_IF}.$vid"
			destroy_vif "${WAN_PHY_IF}.$vid"
		}
		done
	;;
	3)
		# Remove the default lan if from br-lan Bridge Device
		for vid in ${LAN_DFT_ID}; do
			if [ $DEFALUT_MULTI_LAN_DEV == 1 ]; then
			      	suffix=".$vid"
			else
				[ ${GMAC_NUM:-1} -lt 2 ] && suffix=".${LAN_DFT_ID}"
			fi
		del_br_member "br-lan" "${LAN_PHY_IF}${suffix}"
		[ -n "${LAN_DFT_ID}" -a ${GMAC_NUM:-1} -lt 2 ] && {
				down_iface "${LAN_PHY_IF}.$vid"
				destroy_vif "${LAN_PHY_IF}.$vid"
		}
		done
		for vid in ${WAN_DFT_ID}; do
		[ -n "${WAN_DFT_ID}" -a ${GMAC_NUM:-1} -lt 2 ] && {
			down_iface "${WAN_PHY_IF}.$vid"
			destroy_vif "${WAN_PHY_IF}.$vid"
		}
		done
	;;
	esac
}

iptv_load()
{
	local lan_ports=
	config_get mode "iptv" "mode"
	config_get iptv_en "iptv" "enable"
	[ "$iptv_en" != "on" ] && mode="Bridge"
	uci_set_state iptv core mode "$mode"
	for i in `seq $PHY_LAN_PORT_NUM`; do
		config_get port "iptv" "lan""$i"
		[ "$iptv_en" != "on" ] && port="Internet"
		phy_port=$(get_lan_port_id "$i")
		append lan_ports ${phy_port}:${port}
		#lan_ports= 1:Internet 2:Internet 3:IPTV 4:IPPhone
	done

	[ -z "$lan_ports" ] && return
	uci_set_state iptv core lan "$lan_ports"
	local net_ports iptv_ports ipphone_ports
	local bridge_ports
	net_ports=$(get__port_by_type "$lan_ports" "Internet")
	[ -z "$net_ports" ] && return
	iptv_ports=$(get__port_by_type "$lan_ports" "IPTV")

	case "$mode" in
		Bridge) 
			# In bridge mode, only clear the lan default_if, because
			# wan default_if is used continually.
			clear_dft_vif 1
			iptv_bridge_mode_ex "$net_ports" "$iptv_ports"
			;;
		*)
			local used_vid=

			clear_dft_vif 3
			clear_dft_vlan
			ipphone_ports=$(get__port_by_type "$lan_ports" "IP-Phone") 
			bridge_ports=$(get__port_by_type "$lan_ports" "Bridge")

			config_get internet_vid "iptv" "internet_vid"
			append used_vid $internet_vid
			config_get ipphone_vid "iptv" "ipphone_vid"	
			append used_vid $ipphone_vid
			config_get iptv_vid "iptv" "iptv_vid"
			append used_vid $iptv_vid
			config_get mciptv_vid "iptv" "mciptv_vid"
			append used_vid $mciptv_vid
			append used_vid "$WAN_DFT_ID"

			if [ "A$special_id" == "A52550000" ];then
				local pvid=$internet_vid
			fi
	
			uci_set_state iptv core vid_map "$used_vid"
			uci_set_state iptv core viface ""

			config_get mciptv_enable "iptv" "mciptv_enable"

			if [ "A$special_id" == "A52550000" ];then
				config_get iptv_tag "iptv" "iptv_tag" "on"
				config_get ipphone_tag "iptv" "ipphone_tag" "on"
			fi

			# Do internet's initialization first, or other module would get the wrong state.
			# Internet
			[ -n "$net_ports" ] && internet_vlan_do_ex "$net_ports" "$bridge_ports"
			# IP-Phone
			if [ "A$special_id" == "A52550000" ];then
				if [ "$ipphone_tag" = "on" ] ;then
					[ -n "$ipphone_ports" ] && bridge_wan "$ipphone_ports" "ipphone" "$ipphone_vid" "t" && bridge_add "$bridge_ports" "$ipphone_vid" "t"
				else
					[ -n "$ipphone_ports" ] && bridge_wan "$ipphone_ports" "ipphone" "$ipphone_vid" "*" && bridge_add "$bridge_ports" "$ipphone_vid" "*" && pvid=$ipphone_vid
				fi
			else
				[ -n "$ipphone_ports" ] && bridge_wan "$ipphone_ports" "ipphone" "$ipphone_vid" "t" && bridge_add "$bridge_ports" "$ipphone_vid" "t"
			fi
			# Multicast IPTV should be first, because of the default pvid. 
			[ -n "$iptv_ports" -a "$mciptv_enable" = "on" ] && bridge_wan "$iptv_ports" "mciptv" "$mciptv_vid" "t" && bridge_add "$bridge_ports" "$mciptv_vid" "t"
			# IPTV
			if [ "A$special_id" == "A52550000" ];then
				if [ "$iptv_tag" = "on" ] ;then
					[ -n "$iptv_ports" ] && bridge_wan "$iptv_ports" "iptv" "$iptv_vid" "t" && bridge_add "$bridge_ports" "$iptv_vid" "t"
				else
					[ -n "$iptv_ports" ] && bridge_wan "$iptv_ports" "iptv" "$iptv_vid" "*" && bridge_add "$bridge_ports" "$iptv_vid" "*"  && pvid=$iptv_vid
				fi
			else
				[ -n "$iptv_ports" ] && bridge_wan "$iptv_ports" "iptv" "$iptv_vid" "t" && bridge_add "$bridge_ports" "$iptv_vid" "t"
			fi
			[ -n "$bridge_ports" ] && [ "$mode" = "VDF" ] && bridge_set_for_vdf "$iptv_vid" "$ipphone_vid"
			#
			config_get internet_tag "iptv" "internet_tag"
			[ "$internet_tag" = "off" -a "$CHIP_TYPE" = "shiva" ] && set_egress_mode $WAN_CPU_PORT "u"
			# Configure the Multicast IPTV function to kernel, make Multicast IPTV work
			# Order: LAN1->LAN4
			# should be done after IPTV initialization, because of 'iptv_vid_pos'.
			[ "$mciptv_enable" = "on" ] && {
				local iptv_vids_map=$(uci_get_state iptv core iptv_vid_pos)
				local mciptv_vids_map=$(uci_get_state iptv core mciptv_vid_pos)
				local opt_d=$(iptvc -m mciptv -c down)

				[ "$opt_d" = "success" ] && {
					local opt_s=$(iptvc -m mciptv -c set "${iptv_vids_map}:${mciptv_vids_map}")
					[ "$opt_s" = "success" ] && iptvc -m mciptv -c up
				}
			}
			# Set wan port default vid as Internet vid to avid 'internet untag doesn't
			# receive package' issue.
			if [ "A$special_id" == "A52550000" ];then
				set_pvid "$WAN_PHY_PORT_SET" "$pvid"
			else
				set_pvid "$WAN_PHY_PORT_SET" "$internet_vid"
			fi
			;;
	esac
        
        flush_fdb

	return
}

# $1: lan default vid
iptv_reset_lan()
{
	local tag=
	local lan_dft_vid=$1

	# if lan default vid is not existen, we should create the vlan without tag to CPU port.
	# take care of the one GMAC and two GMAC(eth1 -> lan).
	if [ -n "${LAN_DFT_ID}" -a ${GMAC_NUM:-1} -lt 2 ]; then
		tag=t
	else
		tag=*
	fi

	local lan_ifname_list=
	for vid in $lan_dft_vid; do
		if [ $DEFALUT_MULTI_LAN_DEV == 1 ];then
			# switch portmap
			# vlan1 = 1 5 
			# vlan2 = 2 5 
			# vlan3 = 3 5
			lan_port=$vid
			create_vdevice $LAN_PHY_IF $vid "$lan_port" "*" $LAN_CPU_PORT "t"
			add_br_member "br-lan" "${LAN_PHY_IF}.$vid"
			append lan_ifname_list ${LAN_PHY_IF}.$vid
			# no need to set the LAN CPU PORT vid, because each package would be
			# send to cpu port with vid.
			# set_pvid ${LAN_CPU_PORT} $lan_dft_vid
			set_pvid $vid $vid
		else
			lan_port=$LAN_PHY_PORT_SET
			create_vdevice $LAN_PHY_IF $vid "$lan_port" "*" $LAN_CPU_PORT "$tag"
			if [ ${GMAC_NUM:-1} -lt 2 ]; then
				add_br_member "br-lan" "${LAN_PHY_IF}.$vid"
				lan_ifname_list=${LAN_PHY_IF}.${LAN_DFT_ID}
	else
		add_br_member "br-lan" "${LAN_PHY_IF}"
				lan_ifname_list=${LAN_PHY_IF}
				set_pvid ${LAN_CPU_PORT} $lan_dft_vid
			fi
	fi
	done
	iptv_lan_set_ifname "$lan_ifname_list"
}

# $1: wan default vid
iptv_reset_wan()
{
	local wan_dft_vid=$1
	if [ -n "${wan_dft_vid}" -a ${GMAC_NUM:-1} -lt 2 ]; then
		create_vlan_entry $wan_dft_vid
		add_vlan_member $wan_dft_vid $WAN_CPU_PORT t
		add_vlan_member $wan_dft_vid $WAN_PHY_PORT_SET
		set_pvid $WAN_PHY_PORT_SET $wan_dft_vid
		iptv_wan_set_ifname "${WAN_PHY_IF}.${wan_dft_vid}"
	else
		# WAN Vlan entry destroy before, so it create default vid again
		create_vlan_entry $wan_dft_vid
		add_vlan_member $wan_dft_vid $WAN_CPU_PORT
		add_vlan_member $wan_dft_vid $WAN_PHY_PORT_SET
		set_pvid $WAN_PHY_PORT_SET $wan_dft_vid
		iptv_wan_set_ifname "${WAN_PHY_IF}"
	fi
	set_pvid $WAN_CPU_PORT $wan_dft_vid
}

# $1: net_ports
# $2: net_vif
get_internet_vid()
{
	local net_ports=$1
	local net_vif=$2
	local i=0
	local j=0
	local internet_vif=
	local internet_vid=
	for port in $net_ports; do
		if [ "$port" == "$WAN_PHY_PORT_SET" ]; then
			break;
		fi
		i=$((i + 1))
	done
	for vif in $net_vif; do
		if [ $j == $i ]; then
			internet_vif=$vif
			break;
		fi
		j=$((j+1))
	done
	internet_vid=${internet_vif##*.}
	echo $internet_vid
}

get_internet_vid_debug()
{
	local net_ports=$1
	local net_vif=$2
	local i=0
	local j=0
	local internet_vif=
	local internet_vid=
	for port in $net_ports; do
		echo "port $port $WAN_PHY_PORT_SET"
		if [ "$port" == "$WAN_PHY_PORT_SET" ]; then
			break;
		fi
		i=$((i + 1))
	done
	for vif in $net_vif; do
		if [ "$j" == "$i" ]; then
			internet_vif=$vif
			break;
		fi
		j=$((j+1))
	done
	internet_vid=${internet_vif##*.}
	echo $internet_vid
}

iptv_unload()
{
	local mode=$(uci_get_state iptv core mode)
	local viface=$(uci_get_state iptv core viface)
	local net_ports=$(uci_get_state iptv core net_port)
	local net_vif=$(uci_get_state iptv core net_vif)
	local iptv_ports=$(uci_get_state iptv core iptv_port)
	local ipphone_ports=$(uci_get_state iptv core ipphone_port)
	local mciptv_ports=$(uci_get_state iptv core mciptv_port)
	local br_wan_ports=$(uci_get_state iptv core wan_port)
	local vid_map=$(uci_get_state iptv core vid_map)
	
	local pid vid vif

	config_get wan_type "wan" "wan_type"
	case $mode in
		Bridge)
			for v in $viface; do
				pid=${v%-*}
				vid=${v#*.}
				vif=${v#*-}

				! [ -n "$vif" -a -n "$pid" ] && {
				echo "vif($vif) pid($pid) does not exist"
				continue
				}
			
				down_iface "$vif"
				list_contains net_ports $pid && del_br_member "br-lan" "$vif"
				list_contains br_wan_ports $pid && del_br_member "br-wan" "$vif"
				destroy_vif "$vif"
				del_vlan_member $vid $pid
				del_vlan_member $vid ${LAN_CPU_PORT}
				[ $vid -ne 1 ] && delete_vlan_entry $vid
				if [ $vid == ${WAN_DFT_ID} ]; then
					set_pvid $pid ${WAN_DFT_ID:-4094}
				else
					if [ $DEFALUT_MULTI_LAN_DEV == 1 ]; then
						# set port vid:
						# vlan1 - port1 - 1
						# vlan2 - port2 - 2
						set_pvid $pid $pid
					else
					set_pvid $pid ${LAN_DFT_ID:-1}
				fi
				fi
			done
			[ -n "$br_wan_ports" ] && {
				down_iface "${WAN_PHY_IF}.${WAN_DFT_ID}"
				del_br_member "br-wan" "${WAN_PHY_IF}.${WAN_DFT_ID}"
				
				down_iface "br-wan"
				destroy_br "br-wan"

				iptv_set_unbridge_type "wan"
				iptv_igmp_snooping_set "wan"
				[ "$wan_type" != "none" -a "$wan_type" = "pppoe" -o "$wan_type" = "pppoeshare" ] && {
					if [ -n "$WAN_DFT_ID" -a ${GMAC_NUM:-1} -lt 2 ]; then
						iptv_internet_set_ifname "${WAN_PHY_IF}.${WAN_DFT_ID}"
					else
						iptv_internet_set_ifname "${WAN_PHY_IF}"
					fi
				}

					if [ -n "$WAN_DFT_ID" -a ${GMAC_NUM:-1} -lt 2 ]; then
						iptv_wanv6_set_ifname "${WAN_PHY_IF}.${WAN_DFT_ID}"
						iptv_pppshare_set_ifname "${WAN_PHY_IF}.${WAN_DFT_ID}"
					else
						iptv_wanv6_set_ifname "${WAN_PHY_IF}"
						iptv_pppshare_set_ifname "${WAN_PHY_IF}"
					fi
				}
				
			[ -f /tmp/iptv_wan_iface ] && rm -f /tmp/iptv_wan_iface
			iptv_reset_lan "${LAN_DFT_ID:-1}"
			iptv_reset_wan "${WAN_DFT_ID:-4094}"
			
			# Remove the NAT iptables rule
			fw del i n postrouting_rule ACCEPT { -m physdev --physdev-is-bridged }
		;;
		*)
			create_vlan_entry ${LAN_DFT_ID:-1}
			create_vlan_entry ${WAN_DFT_ID:-4094}
			get_internet_vid_debug "$net_ports" "$net_vif"
			local internet_vid=$(get_internet_vid "$net_ports" "$net_vif")
			echo "internet_vid $internet_vid"

			for v in $viface; do
				pid=${v%-*}
				vid=${v#*.}
				vif=${v#*-}

				down_iface "$vif"
				list_contains net_ports $pid && del_br_member "br-lan" "$vif"
				list_contains iptv_ports $pid && del_br_member "br-iptv" "$vif"
				list_contains ipphone_ports $pid && del_br_member "br-ipphone" "$vif"
				list_contains mciptv_ports $pid && del_br_member "br-mciptv" "$vif"
				destroy_vif "$vif"
				del_vlan_member $vid $pid

				# FIXME: If WAN_PHY_IF equal LAN_PHY_IF, the default vid would be wrong.
				# Need set the default port vid based on device.

				if [ $vid == $internet_vid ]; then
					del_vlan_member $vid ${WAN_CPU_PORT}
					set_pvid $pid ${WAN_DFT_ID:-4094}
				else	
					del_vlan_member $vid ${LAN_CPU_PORT}
					set_pvid $pid ${LAN_DFT_ID:-1}
					if [ $DEFALUT_MULTI_LAN_DEV == 1 ]; then
						# set port vid:
						# vlan1 - port1 - 1
						# vlan2 - port2 - 2
						set_pvid $pid $pid
					else
						set_pvid $pid ${LAN_DFT_ID:-1}
					fi
				fi
			done
			for id in $vid_map; do
				[ $id -ne ${LAN_DFT_ID:-1} -a $id -ne ${WAN_DFT_ID:-4094} ] && {
					delete_vlan_entry $id
				}			
			done
			[ -n "$iptv_ports" ] && { 
				down_iface "br-iptv"
				destroy_br "br-iptv"
			}
			[ -n "$ipphone_ports" ] && {
				down_iface "br-ipphone"
				destroy_br "br-ipphone"
			}
			[ -n "$mciptv_ports" ] && {
				down_iface "br-mciptv"
				destroy_br "br-mciptv"
			}

			[ "$wan_type" != "none" -a "$wan_type" = "pppoe" -o "$wan_type" = "pppoeshare" ] && {
				if [ -n "$WAN_DFT_ID" -a ${GMAC_NUM:-1} -lt 2 ]; then
					iptv_internet_set_ifname "${WAN_PHY_IF}.${WAN_DFT_ID}"
				else
					iptv_internet_set_ifname "${WAN_PHY_IF}"
				fi
			}


			if [ -n "$WAN_DFT_ID" -a ${GMAC_NUM:-1} -lt 2 ]; then
				iptv_wanv6_set_ifname "${WAN_PHY_IF}.${WAN_DFT_ID}"
				iptv_pppshare_set_ifname "${WAN_PHY_IF}.${WAN_DFT_ID}"
			else
				iptv_wanv6_set_ifname "${WAN_PHY_IF}"
				iptv_pppshare_set_ifname "${WAN_PHY_IF}"
			fi


			iptv_reset_lan "${LAN_DFT_ID:-1}"
			iptv_reset_wan "${WAN_DFT_ID:-4094}"
		;;
	esac
}

iptv_is_loaded()
{
	local en=$(uci_get_state iptv core enable)
	return $((! ${en:-0}))
}

igmp_is_snooping()
{
	local en=$(uci_get_state iptv core igmp_snooping)
	return $((! ${en:-0}))
}

iptv_set_igmp_snooping()
{
	# Let network attribute be normal
	iptv_set_device_attr keepup
	config_get igmp_snooping_en "iptv" "igmp_snooping_enable"
	if [ "$igmp_snooping_en" = "on" ]; then
		iptv_igmp_snooping_set "lan" 1
		iptv_is_loaded || {
		    uci_revert_state iptv
		    uci_set_state iptv core "" state
		}
		uci_set_state iptv core igmp_snooping 1
	else
		iptv_igmp_snooping_set "lan" 0
		igmp_is_snooping && {
		    uci_toggle_state iptv core igmp_snooping 0
		}
	fi

}
iptv_clear()
{
	
	iptv_is_loaded && {
		iptv_unload
		uci_toggle_state iptv core enable 0
		[ -f '/etc/init.d/qca-hnat-start' ] && /etc/init.d/qca-hnat-start restart
		[ -f '/etc/init.d/shortcut-fe' ] && /etc/init.d/shortcut-fe restart
	}
	
	local mod=$(lsmod|grep -w "iptvx")
	[ -n "$mod" ] && rmmod ${KMOD_PATH}/iptvx.ko
}

iptv_stop()
{
	iptv_clear
	/etc/init.d/network restart
	sleep 6
	#restart ipv6 module when iptv start or stop.
	config_get wanv6 "wanv6" "proto"
	[ "$wanv6" = "pppoev6" ] | /etc/init.d/networkx boot
}

mcwifi_update()
{
	config_get mcwifi_en "iptv" "mcwifi_enable"
    case "${mcwifi_en}" in
        on) val=2 ;;
        off) val=8 ;;
        *) return ;;
    esac
    
    grep -Eo 'ath[0-9]+' /proc/net/wireless | while read inf
    do
        iwpriv ${inf} mcastenhance ${val}
    done
}

iptv_start()
{
	! iptv_init && return

        local restarted=0
        local iptv_en_old=$(uci_get_state iptv core enable)
        local snooping_en_old=$(uci_get_state iptv core igmp_snooping)
        config_get igmp_snooping_en "iptv" "igmp_snooping_enable"
        config_get iptv_en "iptv" "enable"
    

        [ "$iptv_en" = "on" -o "$iptv_en_old" = "1" ] && restarted=1
        [ -f /tmp/iptv_state ] && {
                [ "$igmp_snooping_en" = "on"  -a "$snooping_en_old" != "1" ]  || 
                [ "$igmp_snooping_en" = "off" -a "$snooping_en_old" = "1" ] && {
                        restarted=1
        	}
        } 
        [ "$restarted" = "1" ] && iptv_disconnect_ifs

        iptv_clear

	[ "$iptv_en" = "on" -o "$igmp_snooping_en" = "on" ] && {
		local mod=$(lsmod|grep -w "iptvx")
		# insmod IPTV kernel module for multicast iptv operation
		[ -z "$mod" ] && insmod ${KMOD_PATH}/iptvx.ko
		# chmod 777 /lib/iptv/iptv_config.lua
		uci_revert_state iptv
		uci_set_state iptv core "" state
		uci_set_state iptv core enable 1
		# IPTV base on physical device, so we must make physical device keep up
		iptv_set_device_attr keepup 1
		iptv_load $1
		[ -f '/etc/init.d/qca-hnat-start' ] && /etc/init.d/qca-hnat-start restart
		[ -f '/etc/init.d/shortcut-fe' ] && /etc/init.d/shortcut-fe restart
	}

        iptv_set_igmp_snooping
        # update wireless multicast forwarding setting.
        mcwifi_update

        [ -f /sbin/set_br_nf ] && set_br_nf
        config_get wtype "wan" "wan_type"
        if [ "$restarted" = "1" -a "$wtype" != "none" ]; then
                # FIXME: Terriable operation, as network start asyn, we need to sleep for N seconds
                config_clear
                iptv_rm_iface_from_netifd
                /etc/init.d/network restart
                sleep 6
		#restart ipv6 module when iptv start or stop.
		config_get wanv6 "wanv6" "proto"
		[ "$wanv6" = "pppoev6" ] | /etc/init.d/networkx boot
        else
                # when only set igmp configure, need to take it effect.
                /etc/init.d/improxy restart
		[ -f /etc/init.d/udpxy ] && /etc/init.d/udpxy restart
        fi
        
        unset IPTV_INITIALIZED
}



iptv_restart()
{
	lock /var/run/iptv.lock
	#Create and write file, it means iptv module has been started by DUT.
	[ ! -f /tmp/iptv_state ] && echo "inited" >/tmp/iptv_state
	iptv_start  
	#iptv mode changed, then down up the lan phy to make lan pc renew its ip.
	switch_lan_link_down
	sleep 2
	switch_lan_link_up
	
	lock -u /var/run/iptv.lock
}

