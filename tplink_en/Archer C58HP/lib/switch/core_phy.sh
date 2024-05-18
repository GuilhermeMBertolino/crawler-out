######### Switch APIs for QCA8337 #########

#Switch ports & vlans, saved in /etc/config/switch?
local LAN_PORTS=$(uci get switch.lan.ports)  #"1 2 3 4"
local WAN_PORTS=$(uci get switch.wan.ports)  #"5"
local CPU_PORTS=$(uci get switch.cpu.ports)  #"0"

log () {
	#echo "$@" >> /dev/console
	echo "$@" >> /dev/null
}


core_phy_init() {	#	<lan ports> <wan ports> <cpu ports>
	if [ $# -eq 3 ] ;
	then 
		LAN_PORTS=${1:-$LAN_PORTS}
		WAN_PORTS=${2:-$WAN_PORTS}
		CPU_PORTS=${3:-$CPU_PORTS}
	fi
	
	log "\$LAN_PORTS=\"$LAN_PORTS\" \$WAN_PORTS=\"$WAN_PORTS\" \$CPU_PORTS=\"$CPU_PORTS\""
}

init_vlan() { #<vid>
	ssdk_sh vlan entry create $1
}


setup_member_vlan() {	#	<vid> <memberMap> <ports>
	local vid="$1"
	local memberMap="$2"
	local portmap
	local port

	shift 2

	while [ -n "$1" ]
	do
		port=${1:0:1}	
		shift

		if [ $port == $CPU_PORTS ]
		then
			continue
		fi
		portmap=$(($memberMap ^ (0x1 << $port)))
		
		ssdk_sh portVlan member update $port $portmap
		ssdk_sh portVlan defaultCVid set $port $vid
	done
}

clear_vlan_table() {
	ssdk_sh vlan entry flush
}

clear_all_vlans() {
	local port
	
	for port in $LAN_PORTS $WAN_PORTS
	do
		ssdk_sh portVlan defaultCVid set $port 0   # set all ports's default vlan is 0
	done

	clear_vlan_table
}

setup_switch_vlan() {	#	<vid> <port>{t} <port>{u}...
	#switch, only 6ports: 4 LAN ports, 1 WAN port, 1 CPU port

	local vid="$1"
	local port
	local flag
	local ports
	
	local memberMap=0	#6 bits, ports

	init_vlan $vid
	
	shift

	ports=$@
	log "ports=$@"
	while [ -n "$1" ]
	do

		$(echo "$1" | grep -Eq "[0-5][\*ut]?") || { 
			log "SWITCH: the format of port is incorrect!"
			exit 1; 
		}

		port=${1:0:1}
		flag=${1:1}

		memberMap=$(($memberMap | (0x1 << $port)))

		if [ $port == $CPU_PORTS ]
		then
			ssdk_sh portVlan ingress set $port secure
		else
			ssdk_sh portVlan ingress set $port fallback
		fi

		# non-cpu port should be untaged
		case "$flag" in
			t) ssdk_sh vlan member add $vid $port tagged ;;
			*) ssdk_sh vlan member add $vid $port untagged ;;
		esac

		shift
	done

	setup_member_vlan $vid $memberMap $ports
}

open_flowctrl() {
	local port
	
	for port in $CPU_PORTS $LAN_PORTS $WAN_PORTS
	do
		ssdk_sh port flowCtrl set $port enable   #open flow control for every port
	done
}

link_down_phy_port () {	# <port>
	local ph_id=$(($1 - 1))
	ssdk_sh debug phy set $ph_id 0 0x800
}

link_up_phy_port () {	# <port>
	local ph_id=$(($1 - 1))
	ssdk_sh debug phy set $ph_id 0 0x1000
}

link_down_lan_ports() {
	for port in $LAN_PORTS
	do
		link_down_phy_port $port
	done

	log "lan ports is linked down!"
}	

link_up_lan_ports () {
	for port in $LAN_PORTS
	do
		link_up_phy_port $port
	done
	
	log "lan ports is linked up!"
}

link_down_wan_ports() {
	for port in $WAN_PORTS
	do
		link_down_phy_port $port
	done

	log "wan ports is linked down!"
}	

link_up_wan_ports () {
	for port in $WAN_PORTS
	do
		link_up_phy_port $port
	done
	
	log "wan ports is linked up!"
}

link_down_all_ports () {
	for port in $LAN_PORTS $WAN_PORTS
	do
		link_down_phy_port $port
	done
	
	log "switch ports is linked down!"
}

link_up_all_ports () {
	open_flowctrl

	for port in $LAN_PORTS $WAN_PORTS
	do
		link_up_phy_port $port
	done
	
	log "switch ports is linked up!"
}

set_port_duplex () {	#	<port> <speed> <duplex> <autoneg>
	local port=$1
	local ph_id=$(($1 - 1))
	local speed=$2
	local duplex=$3
	local autoneg=$4
	
	if [ "$port" == $WAN_PORTS ]; then
	    if [ "$autoneg" == "on" ]; then
			echo "restart autoNeg!" > /dev/console
			ssdk_sh port duplex set $port full
                        ssdk_sh port speed set $port 100
			ssdk_sh port autoAdv set $port 0x3f
            ssdk_sh port autoNeg enable $port
			exit 0
		else
			echo "speed = $speed, duplex = $duplex" > /dev/console
			ssdk_sh port duplex set $port $duplex
			ssdk_sh port speed set $port $speed
			if [ "$speed" == "100"  ] && [ "$duplex" == "full" ]; then
				ssdk_sh port autoAdv set $port 0x38
			elif [ "$speed" == "100"  ] && [ "$duplex" == "half" ]; then
				ssdk_sh port autoAdv set $port 0x34
			elif [ "$speed" == "10"  ] && [ "$duplex" == "full" ]; then
				ssdk_sh port autoAdv set $port 0x32
			elif [ "$speed" == "10"  ] && [ "$duplex" == "half" ]; then
				ssdk_sh port autoAdv set $port 0x31
			else
				echo "WAN port link speed setup error!!" > /dev/console
			fi
			ssdk_sh port autoNeg enable $port
			exit 0
		fi
	fi
	#Register setting
	link_up_lan_ports #LAN setting
	ssdk_sh debug phy set ph_id 0 0x3000 #WAN Setting
}

set_defaut_duplex_all_ports()
{
	for port in $LAN_PORTS $WAN_PORTS
	do
		set_port_duplex "$port" "1000" "full" "on"
	done
}
