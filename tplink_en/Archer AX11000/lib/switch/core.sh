# Copyright (C) 2009-2010 OpenWrt.org

. /lib/switch/config.sh
. /lib/switch/core_phy.sh
. /lib/config/uci.sh

# added by CCy in 2017-12-22, for new kernel bonding lag.
. /lib/bcmenet/bcmenet_c5400s.sh

load_bcmenet_driver () {
	linux_ver=`grep -o "Linux version [0-9A-Za-z_.-]*" /proc/version | grep -o "[0-9A-Za-z_.-]*$"`

	# added by CCy in 2017-12-22, for new kernel bonding lag.	
        
	#insmod /lib/modules/*/extra/bcm_enet.ko
	# set LAN MAC to RoboSwitch Multiport Address
	#
	# N.B.
	# if we disabled ULF, we must set LAN MAC to RoboSwitch, 
	# either multiport address or static ARL entry.
	# because RoboSwitch default disable learning address from IMP port
	# if we don't add LAN MAC manually to RoboSwitch, 
	# all traffic to CPU will be flooded. 
	#
	local bcmenet_param=""
	echo "=========== getfirm MAC ============"
	getfirm MAC
	local mac=`getfirm MAC`
	echo " mac = $mac "
	if [ $? -eq 0 ] ; then
		bcmenet_param="tp_lanmac=$mac"
	fi
	insmod /lib/modules/*/extra/bcm_enet.ko $bcmenet_param
    
	insmod /lib/modules/*/extra/cmdlist.ko
	insmod /lib/modules/*/extra/pktrunner.ko 
	insmod /lib/modules/$linux_ver/extra/nciTMSkmod.ko

	insmod /lib/modules/*/extra/bcmvlan.ko  
	insmod /lib/modules/*/extra/pwrmngtd.ko  
	insmod /lib/modules/*/extra/bcmpdc.ko  
#	insmod /lib/modules/*/extra/bcmspu.ko  # donnot insmod bcmspu.ko now,since we currently donot use it. 
	
	insmod /lib/modules/*/extra/rdpa_cmd.ko

	insmod /lib/modules/$linux_ver/kernel/net/ipv4/udp_tunnel.ko
	insmod /lib/modules/$linux_ver/kernel/net/ipv6/ip6_udp_tunnel.ko
	insmod /lib/modules/$linux_ver/kernel/net/ipv4/ip_tunnel.ko	

	# Initialize bdmf shell
	test -e /etc/rdpa_init.sh && /etc/rdpa_init.sh
}

# $1 agg_map: lag port map
# $2 port:
is_agg_port(){
	[ $# != 2 ] && {
		echo 0
		return
	}
	
	local port_map=0
	local agg_map=$1
	local port=$2

	port_map=$((1<<($port-1)))
	
	echo $((port_map&agg_map))
}

# $1 agg_map: lag port map
lag_map2postfix(){
	[ $# != 1 ] && {
		echo ""
		return
	}
	
	local agg_map=$1
	local postfix=""
	local lacpports_support_nochange=$(uci get profile.@switch[0].lacpports_support -c /etc/profile.d)
	
	# if [ -z "$lacpports_support_nochange" ]; then
	# 	lacpports_support_nochange=$LAN_PORTS
	# fi

	for i in $lacpports_support_nochange; do
		if [ $(is_agg_port "$agg_map" "$i") != 0 ]; then
			postfix="$postfix$i"
		fi
	done
	
	echo $postfix
}

# reconfig_network(){
# 	local wan_ifname=""
# 	local lan_ifnames=""
# 	local lan_ifnames_default=$(uci get profile.@lan[0].ifname_default -c /etc/profile.d)

# 	local sysmode=$(uci get sysmode.sysmode.mode)
# 	local enable_agg=$(uci get switch.lan_agg.enable_agg)
	
# 	if [ "$sysmode" = "router" ]; then
# 		wan_ifname="$WAN_IFNAME"
		
# 		if [ $enable_agg == 1 ]; then
# 			local agg_ports=$(uci get switch.lan_agg.lacpports)
					
# 			for i in $agg_ports; do
# 				phy_port=$(get_lan_port_id "$i")
# 				lag1_ifnum=$(($lag1_ifnum+1))			
# 				lag1_map=$((lag1_map|(1<<(phy_port-1))))		
# 			done

# 			[ $lag1_ifnum -lt 2 -o $lag1_ifnum -gt 4 ] && {
# 				log "Invalid LAG num $lag1_ifnum"
# 				return
# 			}
			
# 			local postfix=$(lag_map2postfix $lag1_map)
# 			[ -z "$postfix" ] && {
# 				log "Invalid postfix $postfix"
# 				return
# 			}	
# 			lag1_ifname="${lag1_ifname}$postfix"
			
# 			local lag_added=0
# 			for ifname in $lan_ifnames_default ; do
# 				i=$(echo $ifname|grep -o "eth[0-9]*"|grep -o "[0-9]*")
# 				if [ -n "$i" -a $(is_agg_port "$lag1_map" "$i") == 0 ]; then
# 					tmp_ifname="eth$i"
# 				elif [ $lag_added == 0 ]; then
# 					tmp_ifname="$lag1_ifname"
# 					lag_added=1
# 				else
# 					continue
# 				fi
				
# 				if [ -n "$lan_ifnames" ]; then
# 					lan_ifnames="${lan_ifnames} $tmp_ifname"				
# 				else
# 					lan_ifnames="$tmp_ifname"
# 				fi
# 			done
# 		else
# 			lan_ifnames="$lan_ifnames_default"
# 		fi
# 	else
# 		# AP mode
# 		lan_ifnames="$WAN_IFNAME $lan_ifnames_default"
# 	fi
	
# 	log "WAN 		ifs: \"${wan_ifname}\""
# 	log "LAN		ifs: \"${lan_ifnames}\""
# 	log "LAG1 		ifs: \"${lag1_ifname}\""
# 	log "LAG1 		map: $(printf \"0x%x\" $lag1_map)"
# 	log "LAG1 		num: $lag1_ifnum"
		
# 	# reconfig network devices and lan ifname
# 	while uci delete network.@device[0] > /dev/null 2>&1 ; do
# 		:
# 	done
		
# 	local count=0
# 	for w in $wan_ifname; do
# 		uci add network device
# 		uci set network.@device[$count].name="$w"
# 		uci set network.@device[$count].enabled="1"
# 		count=$(($count+1))
# 	done
	
# 	for l in $lan_ifnames; do
# 		uci add network device
# 		uci set network.@device[$count].name="$l"
# 		uci set network.@device[$count].enabled="1"
# 		count=$(($count+1))
# 	done

# 	uci set network.lan.ifname="${lan_ifnames}"
# 	uci commit network
# }
reconfig_network(){
 	local wan_ifname=""
  	local lan_ifname=""
  	local internet_ifname=""	
 	local sysmode=$(uci get sysmode.sysmode.mode)
	local lan_ifnames_default=$(uci get profile.@lan[0].ifname_default -c /etc/profile.d)


	log "[switch] reconfig_network begin..."
	c5400s_get_interface_group >/dev/console

 	if [ "$sysmode" = "router" ]; then
 		wan_ifname="$WAN_IFNAME"
 		lan_ifname=${lan_ifnames_default}
		internet_ifname=${internet_ifs}
	else
		wan_ifname=""
		#FIXME: eth0 must add behind $internet_ifs,as lua may match the first eth iface to get lan mac
 		lan_ifname="$lan_ifnames_default $WAN_IFNAME"
 		internet_ifname="$lan_ifnames_default $WAN_IFNAME"
 	fi



	while uci delete network.@device[0] > /dev/null 2>&1 ; do
		:
	done
		
	local count=0
	for w in $wan_ifname; do
		uci add network device
		uci set network.@device[$count].name="$w"
		uci set network.@device[$count].enabled="1"
		uci set network.@device[$count].keepup="1"
		count=$(($count+1))
	done
	
	for l in $lan_ifname; do
		uci add network device
		uci set network.@device[$count].name="$l"
		uci set network.@device[$count].enabled="1"
		uci set network.@device[$count].keepup="1"
		count=$(($count+1))
	done

	uci set network.lan.ifname="${internet_ifname}"
	uci commit network	

	log "[switch] reconfig_network result:"
 	log "WAN 		ifs: \"${wan_ifname}\""
 	log "LAN		ifs: \"${lan_ifname}\""
 	log "internet	ifs: \"${internet_ifname}\""
}


setup_switch(){
	
	reconfig_network
	
	load_bcmenet_driver

	# FIXME: waiting mdev create dev node
	# dead loop may happen
	while [ ! -c /dev/bcmrdpa ] ; do
		log "waiting mdev create /dev/bcmrdpa"
		sleep 1
	done
	
	/bin/swmdk &
	
	# reconfig mac address
	/sbin/network_firm
	
	#local wan_ifname=$(uci get network.wan.ifname)
	setup_wan_port "$WAN_IFNAME"

	setup_phy_eee
	
	setup_phy_wirespeed
	# changed by CCy in 2017-12-22, for new kernel bonding LAG.
	# local lan_ifnames=$(uci get network.lan.ifname)
	local lan_ifnames_default=$(uci get profile.@lan[0].ifname_default -c /etc/profile.d)
	[ -n "$lan_ifnames_default" ] && setup_ports_tm "$lan_ifnames_default" "$WAN_IFNAME"
	
	setup_switch_mcast_forwarding	
	setup_switch_pause

	log "SETUP switch  base settings success!"
}

unsetup_switch(){
	
	return
}

setup_agg_config()	{
	fw_config_get_section "$1" switch_agg { \
		string enable_agg		''	\
		string lacpports		''	\
		string lacpmode			''	\
		string hashmode			''	\
	}
	if [ "$switch_agg_enable_agg" == '1' ];then
		config_agg_ports "$switch_agg_lacpports" "$switch_agg_lacpmode" "$switch_agg_hashmode" 
	else
		config_agg_clear
	fi
}

setup_agg()	{
	config_foreach setup_agg_config switch_agg
}

unsetup_agg() {
	config_agg_clear
}

fw_config_get_mac() {
    fw_config_get_section "$1" device { \
        string macaddr "" \
        string name    "" \
    } || return
}

find_mac() {
    fw_config_get_mac $1
    ifname=$(uci get network.lan.ifname)
    if [[ "$device_name" == "$ifname" ]]; then
        ssdk_sh fdb entry add "${device_macaddr//:/-}" 65535 forward forward 6 yes no no no no no no
    fi
}

setup_vlan() {
	config_load switch
	config_foreach setup_one_vlan switch_vlan
	log "SETUP vlan settings success!"
    return
}

unsetup_vlan() {
	clear_all_vlans
	log "CLEAN vlan settings success!"
	return
}

config_get_switch_vlan () {
	fw_config_get_section "$1" switch_vlan { \
		    string ports		''	\
			string device		''	\
			string vlan			''	\
	} || return
}

setup_one_vlan() {
	config_get_switch_vlan $1

	setup_switch_vlan $switch_vlan_vlan $switch_vlan_ports
	#[ -z "$(echo $switch_vlan_ports | grep 'u' )" ] && vconfig add eth0 $switch_vlan_vlan  
}

setup_ports() {
	echo rgmii 1 > /proc/driver/phy/rtl8367s
	link_up_all_ports

	ethswctl -c powerset-enable -v 1
}

unsetup_ports() {
	ethswctl -c powerset-enable -v 0
	
	link_down_all_ports
}

setup_phy1g_duplex() {
	local port=$(uci get portspeed.wan.port)
	local speed=$(uci get portspeed.wan.current)
	local autoneg
	local duplex

	case $speed in
		"auto")
			autoneg="on"
			speed="1000"
			duplex="full"
			;;
		"10H")
			autoneg="off"
			speed="10"
			duplex="half"
			;;
		"10F")
			autoneg="off"
			speed="10"
			duplex="full"
			;;
		"100H")
			autoneg="off"
			speed="100"
			duplex="half"
			;;
		"100F")
			autoneg="off"
			speed="100"
			duplex="full"
			;;
		"1000H")
			autoneg="off"
			speed="1000"
			duplex="half"
			;;
		"1000F")
			autoneg="off"
			speed="1000"
			duplex="full"
			;;
	esac
	
	set_port_duplex $port $speed $duplex $autoneg
	log "SETUP port ($port) media-type: $speed $duplex $autoneg!"
}

setup_phy2g5_duplex() {
	local port=$(uci get portspeed.wan.port)
	local speed=$(uci get portspeed.wan.current)
	local autoneg
	local duplex

	case $speed in
		"auto")
			autoneg="on"
			speed="2500"
			duplex="full"
			;;
		"100F")
			autoneg="off"
			speed="100"
			duplex="full"
			;;
		"1000F")
			autoneg="off"
			speed="1000"
			duplex="full"
			;;
		"2500F")
			autoneg="off"
			speed="2500"
			duplex="full"
			;;
		*)
			echo "setup_duplex: invalid speed"
			return
			;;
	esac
	
	set_port_duplex $port $speed $duplex $autoneg
	log "SETUP port ($port) media-type: $speed $duplex $autoneg!"
}

# ethctl media-type 100FD has bug, wl, 27Sep18
#setup_phy2g5_duplex_ethctl() {	
#	local speed=$(uci get portspeed.wan.current)
#		
#	bcm_4908_phy2g5_set_wan_mode $speed
#	log "SETUP wan media-type: $speed!"
#}

setup_duplex() {
	local phy_2g5_support=$(uci get profile.@phyport[0].phyport_2g5_support -c /etc/profile.d)

	if [ x"$phy_2g5_support" == x"yes" ]; then
		setup_phy2g5_duplex
	else
		setup_phy1g_duplex
	fi
}

unsetup_duplex() {
	log "UNSETUP duplex"
}

lan_is_linked() { # a given port or any lan ports
	phy_lan_is_linked "$1"
}

wan_is_linked() { # a given port or any wan ports
	phy_wan_is_linked "$1"
}

switch_lib_init() {
	local lan_ports="$(uci get switch.lan.ports)"
	local wan_ports="$(uci get switch.wan.ports)"
	local cpu_ports="$(uci get switch.cpu.ports)"

	core_phy_init "$lan_ports" "$wan_ports" "$cpu_ports"
}

#switch_lib_init