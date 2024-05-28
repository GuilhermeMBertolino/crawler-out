######### Switch APIs for Intel GRX350 board #########

BOARD_TYPE=intel

PHY_LAN_PORT_NUM=4
LAN_CPU_PORT=
WAN_CPU_PORT=

#Switch ports & vlans, saved in /opt/lantiq/etc/interfaces.cfg
#--------------------------
# index name	ifname	phy_id
#--------------------------
# 	0	wan		eth1	15
# 	1	lan1	eth0_4	5	
# 	2	lan2	eth0_3	4
# 	3	lan3	eth0_2	3 
# 	4	lan4	eth0_1	2

LAN_IFNAMES="eth0_4 eth0_3 eth0_2 eth0_1"
WAN_IFNAME="eth1"
LAN_PORTS="5 4 3 2"
WAN_PORTS="15"

MAX_VLAN="4095"

log () {
	#echo "$@" >> /dev/console
	echo "$@" >> /dev/null
}

et_d () {
	log "et $@"
	et -i eth0 $@
}

# Get the max one
# $1	number 1
# $2	number 2
max(){
	num1=$1
	num2=$2
	
	if [ $num1 -ge $num2 ];then
		echo "$num1"
	else
		echo "$num2"
	fi
	return
}

# Get the minimum one
# $1	number 1
# $2	number 2
min(){
	num1=$1
	num2=$2
	
	if [ $num1 -lt $num2 ];then
		echo "$num1"
	else
		echo "$num2"
	fi
	return	
}

# Get lan ifname.
# $1: serial number
get_lan_ifname_by_id()
{
	local index=$1
	local i=1

	for ifname in ${LAN_IFNAMES};do
		if [ $i = $index ];then
			echo "$ifname"
			return
		else
			i=$(($i+1))
		fi
	done
	echo ""
	return
}

# Get lan ifname.
# $1: serial number
get_lan_phy_by_id()
{
	local index=$1
	local i=1

	for phyid in ${LAN_PORTS};do
		if [ $i = $index ];then
			echo "$phyid"
			return
		else
			i=$(($i+1))
		fi
	done
	echo ""
	return
}

setup_switch_flowControl(){
	# Enable Flow control
	switch_cli dev=0 GSW_REGISTER_SET nRegAddr=0x903 nData=0x1b0
	switch_cli dev=0 GSW_REGISTER_SET nRegAddr=0x90f nData=0x1b0
	switch_cli dev=0 GSW_REGISTER_SET nRegAddr=0x91b nData=0x1b0
	switch_cli dev=0 GSW_REGISTER_SET nRegAddr=0x927 nData=0x1b0
	switch_cli dev=0 GSW_REGISTER_SET nRegAddr=0x933 nData=0x1b0
	switch_cli dev=0 GSW_REGISTER_SET nRegAddr=0x93f nData=0x1b0
	
	# Set all the watermark configuration on each queue
	switch_cli dev=0 GSW_QOS_WRED_QUEUE_CFG_SET nQueueId=8 nRed_Min=0xff nRed_Max=0xff nYellow_Min=0xff nYellow_Max=0xff nGreen_Min=0xff nGreen_Max=0xff
	switch_cli dev=0 GSW_QOS_WRED_QUEUE_CFG_SET nQueueId=9 nRed_Min=0xff nRed_Max=0xff nYellow_Min=0xff nYellow_Max=0xff nGreen_Min=0xff nGreen_Max=0xff
	switch_cli dev=0 GSW_QOS_WRED_QUEUE_CFG_SET nQueueId=10 nRed_Min=0xff nRed_Max=0xff nYellow_Min=0xff nYellow_Max=0xff nGreen_Min=0xff nGreen_Max=0xff
	switch_cli dev=0 GSW_QOS_WRED_QUEUE_CFG_SET nQueueId=11 nRed_Min=0xff nRed_Max=0xff nYellow_Min=0xff nYellow_Max=0xff nGreen_Min=0xff nGreen_Max=0xff
	switch_cli dev=0 GSW_QOS_WRED_QUEUE_CFG_SET nQueueId=12 nRed_Min=0xff nRed_Max=0xff nYellow_Min=0xff nYellow_Max=0xff nGreen_Min=0xff nGreen_Max=0xff
	switch_cli dev=0 GSW_QOS_WRED_QUEUE_CFG_SET nQueueId=13 nRed_Min=0xff nRed_Max=0xff nYellow_Min=0xff nYellow_Max=0xff nGreen_Min=0xff nGreen_Max=0xff
	switch_cli dev=0 GSW_QOS_WRED_QUEUE_CFG_SET nQueueId=14 nRed_Min=0xff nRed_Max=0xff nYellow_Min=0xff nYellow_Max=0xff nGreen_Min=0xff nGreen_Max=0xff
	switch_cli dev=0 GSW_QOS_WRED_QUEUE_CFG_SET nQueueId=15 nRed_Min=0xff nRed_Max=0xff nYellow_Min=0xff nYellow_Max=0xff nGreen_Min=0xff nGreen_Max=0xff
	switch_cli dev=0 GSW_QOS_WRED_QUEUE_CFG_SET nQueueId=16 nRed_Min=0xff nRed_Max=0xff nYellow_Min=0xff nYellow_Max=0xff nGreen_Min=0xff nGreen_Max=0xff
	switch_cli dev=0 GSW_QOS_WRED_QUEUE_CFG_SET nQueueId=17 nRed_Min=0xff nRed_Max=0xff nYellow_Min=0xff nYellow_Max=0xff nGreen_Min=0xff nGreen_Max=0xff
	switch_cli dev=0 GSW_QOS_WRED_QUEUE_CFG_SET nQueueId=18 nRed_Min=0xff nRed_Max=0xff nYellow_Min=0xff nYellow_Max=0xff nGreen_Min=0xff nGreen_Max=0xff
	switch_cli dev=0 GSW_QOS_WRED_QUEUE_CFG_SET nQueueId=19 nRed_Min=0xff nRed_Max=0xff nYellow_Min=0xff nYellow_Max=0xff nGreen_Min=0xff nGreen_Max=0xff
	switch_cli dev=0 GSW_QOS_WRED_QUEUE_CFG_SET nQueueId=20 nRed_Min=0xff nRed_Max=0xff nYellow_Min=0xff nYellow_Max=0xff nGreen_Min=0xff nGreen_Max=0xff
	switch_cli dev=0 GSW_QOS_WRED_QUEUE_CFG_SET nQueueId=21 nRed_Min=0xff nRed_Max=0xff nYellow_Min=0xff nYellow_Max=0xff nGreen_Min=0xff nGreen_Max=0xff
	switch_cli dev=0 GSW_QOS_WRED_QUEUE_CFG_SET nQueueId=22 nRed_Min=0xff nRed_Max=0xff nYellow_Min=0xff nYellow_Max=0xff nGreen_Min=0xff nGreen_Max=0xff
	switch_cli dev=0 GSW_QOS_WRED_QUEUE_CFG_SET nQueueId=23 nRed_Min=0xff nRed_Max=0xff nYellow_Min=0xff nYellow_Max=0xff nGreen_Min=0xff nGreen_Max=0xff
	switch_cli dev=0 GSW_QOS_WRED_QUEUE_CFG_SET nQueueId=24 nRed_Min=0xff nRed_Max=0xff nYellow_Min=0xff nYellow_Max=0xff nGreen_Min=0xff nGreen_Max=0xff
	switch_cli dev=0 GSW_QOS_WRED_QUEUE_CFG_SET nQueueId=25 nRed_Min=0xff nRed_Max=0xff nYellow_Min=0xff nYellow_Max=0xff nGreen_Min=0xff nGreen_Max=0xff
	switch_cli dev=0 GSW_QOS_WRED_QUEUE_CFG_SET nQueueId=26 nRed_Min=0xff nRed_Max=0xff nYellow_Min=0xff nYellow_Max=0xff nGreen_Min=0xff nGreen_Max=0xff
	switch_cli dev=0 GSW_QOS_WRED_QUEUE_CFG_SET nQueueId=27 nRed_Min=0xff nRed_Max=0xff nYellow_Min=0xff nYellow_Max=0xff nGreen_Min=0xff nGreen_Max=0xff
	switch_cli dev=0 GSW_QOS_WRED_QUEUE_CFG_SET nQueueId=28 nRed_Min=0xff nRed_Max=0xff nYellow_Min=0xff nYellow_Max=0xff nGreen_Min=0xff nGreen_Max=0xff
	switch_cli dev=0 GSW_QOS_WRED_QUEUE_CFG_SET nQueueId=29 nRed_Min=0xff nRed_Max=0xff nYellow_Min=0xff nYellow_Max=0xff nGreen_Min=0xff nGreen_Max=0xff
	switch_cli dev=0 GSW_QOS_WRED_QUEUE_CFG_SET nQueueId=30 nRed_Min=0xff nRed_Max=0xff nYellow_Min=0xff nYellow_Max=0xff nGreen_Min=0xff nGreen_Max=0xff
	switch_cli dev=0 GSW_QOS_WRED_QUEUE_CFG_SET nQueueId=31 nRed_Min=0xff nRed_Max=0xff nYellow_Min=0xff nYellow_Max=0xff nGreen_Min=0xff nGreen_Max=0xff
}

# Set switch ARL table.
# $1: nPortId
# $2: mac
set_switch_static_arl(){
	[ $# -eq 2 ] || return
	local nPortId="$1"
	local mac="$2"
	
	switch_cli GSW_MAC_TABLE_ENTRY_ADD nPortId="$nPortId" bStaticEntry=1 nMAC="$mac"
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

phy_lan_is_linked () {	# given port or any lan ports
	local port="$1"
	
	if [ -n "$port" ] ;
	then
		if [ -n "$(echo $LAN_PORTS | grep $(($port + 0)))" ] ;
		then
			[ -n "$(sys_cli eth -E $port | grep up)" ] && return 0;
		fi
	else
		for p in $LAN_PORTS
		do
			[ -n "$(sys_cli eth -E $p | grep up)" ] && return 0;
		done
	fi
	
	return 1;
}

phy_wan_is_linked () {	# given port or any wan ports
	local port="$1"
	
	if [ -n "$port" ] ;
	then
		if [ -n "$(echo $WAN_PORTS | grep $(($port + 0)))" ] ;
		then
			[ -n "$(sys_cli eth -E $port | grep up)" ] && return 0;
		fi
	else
		for p in $WAN_PORTS
		do
			[ -n "$(sys_cli eth -E $p | grep up)" ] && return 0;
		done
	fi
	
	return 1;
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
	local vid
	local port
	
	for port in $LAN_PORTS
	do
		setup_port_vlan $port 0		# set all ports's default vlan is 0
	done

	clear_vlan_table
}

setup_switch_vlan() {	#	<vid> <port>{u} <port>{u}...
	#switch, only 6ports: 4 LAN ports, 1 WAN port, 1 CPU port

	local vid="$1"
	local port
	local flag
	
	local memberMap=0	#6 bits, ports
	local untagMap=0	#6 bits, ports
	
	shift
	log "ports=$@"
	while [ -n "$1" ]
	do

		$(echo "$1" | grep -Eq "[0-8][\*ut]?") || { 
			log "SWITCH: the format of port is incorrect!"
			exit 1; 
		}

		port=${1:0:1}
		flag=${1:1}

		memberMap=$(($memberMap | (0x1 << $port)))

		# non-cpu port should be untaged
		if $(echo "$CPU_PORTS" | grep -Eq "$port")
		then
			# flag "u" tell untag
			$(echo "$flag" | grep -Eq "u") && {
				setup_port_vlan $port $vid
				untagMap=$(($untagMap | (0x1 << $port)))
			}
		else
			setup_port_vlan $port $vid
			# flag "t" tell tag
			$(echo "$flag" | grep -Eq "t") || {
				untagMap=$(($untagMap | (0x1 << $port)))
			}
		fi

		shift
	done

	setup_member_vlan $vid $memberMap $untagMap
}

link_down_phy_port () {	# <port>
	local port=$1
	
	sys_cli eth -H $port Disable   
}

link_up_phy_port () {	# <port>
	local port=$1

	sys_cli eth -H $port Enable   
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
	for port in $LAN_PORTS $WAN_PORTS
	do
		link_up_phy_port $port
	done
	
	log "switch ports is linked up!"
}

bit_set()	# val, pos1, pos2 ...
{
	val=$1
	
	shift

	while [ $# -ne 0 ]
	do
		pos=$1
		val=$(($val | (1 << $pos)))
		shift
	done

	echo $val
}

bit_clear()	# val, pos1, pos2 ...
{
	val=$1

	shift

	while [ $# -ne 0 ]
	do
		pos=$1
		val=$(($val & (~(1 << $pos))))
		shift
	done
	
	echo $val
}

to_hexstr()
{
	echo "0x"$(printf %x $1)
}

set_port_duplex () {	#	<port> <rate> <duplex> <auto>
	local port=$1
	local rate=$2
	local duplex=$3
	local auto=$4

	local rateduplex="$rate$duplex"
	local force=0  # Disable Auto Negotiation, force to 10M, Half
	
	local dupVal=0
	local rateVal=0
	local device=""
	
	case $auto in
		"on")

			;;
		"off")
			case $rateduplex in
				"1000full")
					rateVal=1000		# 1000MF
					dupVal=0	
					;;
				"100full")
					rateVal=100			# 100MF
					dupVal=0	
					;;
				"100half")
					rateVal=100			# 	100MH
					dupVal=1
					;;
				"10full")
					rateVal=10			# 10MF
					dupVal=0
					;;
				"10half")	# 10MH
					rateVal=10
					dupVal=1
					;;
				*)
					return
					;;
			esac
			;;
		*)
			return
			;;
	esac
	
	if [ $port -eq 15 ]; then
		device="LTQ_TRUE"
	else
		device="LTQ_FALSE"
	fi
	
	if [ $auto = "on" ]; then
		switch_cli GSW_PORT_LINK_CFG_SET nPortId=$port bDuplexForce=0 bSpeedForce=0 dev=$device
	else
		switch_cli GSW_PORT_LINK_CFG_SET nPortId=$port bDuplexForce=1 eDuplex=$dupVal bSpeedForce=1 eSpeed=$rateVal dev=$device
	fi
	
	log "set_port_duplex: port=$port auto=$auto rateduplex=$rateduplex"
}

set_defaut_duplex_all_ports()
{
	for port in $LAN_PORTS $WAN_PORTS
	do
		set_port_duplex "$port" "1000" "full" "on"
	done
}

dump_arl_table()
{
	switch_cli GSW_MAC_TABLE_ENTRY_READ
}

dump_arl_table_entry() # macv, status
{
	return
}

###### Aggregation Port ######

config_agg_ports_static() #ports
{
	return
}

config_agg_ports_dynamic() # ports, lacpmode, systemprio, portprio
{
	return
}

config_agg_clear()
{
	return
}

config_agg_ports() # mode, ports, { lacpmode, systemprio, portprio}
{
	local mode="$1"
	local ports="$2"

	shift
	shift

	config_agg_clear

	case $mode in
		"static" )
			config_agg_ports_static "$ports"
			;;
		"dynamic" )
			config_agg_ports_dynamic "$ports" "$@"
			;;
		* )
			return
			;;
	esac
}