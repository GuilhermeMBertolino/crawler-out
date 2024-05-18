######### Switch APIs for BCM4906 board #########

#Switch ports & vlans, saved in /etc/config/switch?
LAN_PORTS="1 2 3 4"  # will abandon this later, by CCy. now just keep it for downward compatibility  with c2300
WAN_PORTS="0"
CPU_PORTS="5"
MAX_VLAN="4095"

# SET OF LAN PHY PORT: LAN1->4 LAN2->3 LAN3->2 LAN4->1
LAN_PHY_PORT_SET="4 3 2 1" # will abandon this later, by CCy. now just keep it for downward compatibility  with c2300

WAN_IFNAME="eth0"

lag1_ifname="lag0_"
lag1_map=0
lag1_ifnum=0

lag2_ifname="lag1_"
lag2_map=0
lag2_ifnum=0

log () {
	echo "[switch] $@" >> /dev/console
	#echo "$@" >> /dev/null
}

# Get lan phy port id.
# $1: serial number
# will abandon this later, by CCy. now just keep it for downward compatibility  with c2300
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

# $1 ifname: wan interface name
setup_wan_port ()
{
	[ $# != 1 -o -z $1 ] && return
	local wan_ifname="$1"
	
	ethswctl -c wan -o enable -i $wan_ifname

	log "Interface $wan_ifname is set to WAN"
}

# $1 ifname: interface name
set_port_tm(){
	[ $# != 1 ] && return
	local ifname="$1"
	
	tmctl porttminit --devtype 0 --if ${ifname} --flag 1 
	
	log "Interface $ifname tm is set"
}

# $1 ifnames: interface names
setup_ports_tm(){
	[ $# -lt 1 ] && return
	
	for ifname in $@ ; do
		[ -n "$ifname" ] && {
			set_port_tm "$ifname"
		}
	done
}

setup_switch_forwarding(){

	ethswctl -c regaccess -v 0x24 -l 4 -d 0x0
}

setup_switch_pause(){

	#wan
	#ethswctl -c pause -n 0 -p 3 -v 2
	
	#lan
	#ethswctl -c pause -n 1 -p 0 -v 2
	#ethswctl -c pause -n 1 -p 1 -v 2
	#ethswctl -c pause -n 1 -p 2 -v 2
	#ethswctl -c pause -n 1 -p 3 -v 2

	# Merge from C5400s, unit 2 is 53134 External Switch
	# Notice: cmds not implemented yet
	#ethswctl -c pause -n 1 -p 255 -v 2
	#ethswctl -c pause -n 2 -p 255 -v 2

	# For external 53134 100M low tx issue
	# enable internal 53134 port7 tx/rx pause
	ethswctl -c regaccess -v 0x0028 -l 4 -d 0x810080
	# enable external 53134 port8 tx/rx pause
	ethswctl -c pmdioaccess -x 0x0028 -l 4 -d 0x820100	
}

setup_switch_mcast_forwarding(){

	ethswctl -c regaccess -v 0x34 -l 4 -d 0x130
	ethswctl -c regaccess -v 0x36 -l 4 -d 0x130
}

setup_port_vlan() {	#	<port> <vid>
	return
}

setup_member_vlan() {	#	<vid> <memberMap> <untagMap>
	return
}

clear_vlan_table() {
	return
}

clear_all_vlans() {
	return
}

setup_switch_vlan() {	#	<vid> <port>{u} <port>{u}...
	return
}

setup_phy_eee () {
    #for LAN ports of RTL8367S
    for port in `seq 0 3`
    do
        echo eeeset ${port} 0 > /proc/driver/phy/rtl8367s
    done
	
	#for LAN ports of internel switch
	local if_list="eth1 eth2 eth3 eth4"
    for intf in ${if_list}
    do
        ethctl ${intf} eee off
    done
}

setup_phy_wirespeed() {
	#for LAN ports of internel switch
    local if_list="eth1 eth2 eth3 eth4"
    for intf in ${if_list}
    do
        ethctl ${intf} ethernet@wirespeed enable
    done
}

link_down_all_ports () {
	
	echo 0x0f0f01 0x0 > /tmp/phypower_control

	# link down port 5 of externel 53134
	#ethswctl -c pmdioaccess -x 0x005d -l 2 -d 0x4a
    echo physet 0 > /proc/driver/phy/rtl8367s
	log "switch all ports is linked down!"
}

link_up_all_ports () {
	
	echo 0x0f0f01 0x0f0f01 > /tmp/phypower_control
	echo physet 1 > /proc/driver/phy/rtl8367s
	log "switch all ports is linked up!"
}

link_down_lan_ports () {
	
	echo 0x0f0f00 0x0 > /tmp/phypower_control
	echo physet 0 > /proc/driver/phy/rtl8367s
	log "switch lan ports is linked down!"
}

link_up_lan_ports () {
	
	echo 0x0f0f00 0x0f0f00 > /tmp/phypower_control
	echo physet 1 > /proc/driver/phy/rtl8367s
	log "switch lan ports is linked up!"
}

set_port_duplex () {	#	<port> <rate> <duplex> <auto>
	[ $# != 4 ] && return
	local rate=$2
	local duplex=$3
	local auto=$4
	
	local unit
	local port
	local duplex_str

	case $speed in
	    2500)
	    	;;
	    1000)
	        ;;
	    100)
	        ;;
	    10)
	        ;;
	    *)
	        return
	        ;;
	esac

	case $1 in
		"0")
			unit=0
			port=3
			;;
		*)
			unit=1
			port=$1-1
			;;
	esac		

	case $duplex in
		"full")
			duplex=1
			duplex_str="FD"
			;;
		"half")
			duplex=0
			duplex_str="HD"
			;;
		*)
			return
			;;
	esac	
	
	case $auto in
		"on")
			ethswctl -c phymode -n $unit -p $port -y 0 > /dev/null	
			log "switch port eth$1 <$unit $port> phymode is set to auto"
			;;
		*)
			ethswctl -c phymode -n $unit -p $port -y $rate -z $duplex > /dev/null	
			log "switch port eth$1 <$unit $port> phymode is set to $rate$duplex_str"
			return
			;;
	esac
}

# delete uselesss code by ccy, 2017-10-23
# set_defaut_duplex_all_ports()
# {
	# for port in $LAN_PORTS $WAN_PORTS
	# do
		# set_port_duplex "$port" "1000" "full" "on"
	# done
# }

# $1 mode: hash algorithm, 0: src mac + dst mac, 1: DA, 2: SA
set_trunk_hashmode ()
{
	local mode=$1

	[ $# != 1 ] && return

	case $mode in
		"0")
			mode="sada"
			;;
		"1")
			mode="da"
			;;
		"2")
			mode="sa"
			;;
		*)
			log "invalid trunk mode $mode!"
			return
			;;
	esac
	
	ethswctl -c trunk -o $mode
	
	log "trunk hashmode is set to $mode!"
}

config_agg_clear()
{
	return
}

config_agg_ports() # ports, lacpmode,hashmode
{
	[ $# != 3 ] && return
	local hashmode=$3
	
	set_trunk_hashmode $hashmode
	
	return
}
