#!/bin/sh

#
# Switch API for MT7621
# To make our head clear, all switch related API must write to here

local LAN_PORTS="1 2 3 4"
local WAN_PORTS="0"
local CPU_PORTS="5"


log() {
	#echo "$@" >> /dev/console
	echo "$@" >> /dev/null
}



set_phy_power ()
{
	port=$1
	onoff=$2
	# switch cmd: switch phy_power port {on|off}
	switch phy_power $port $onoff
}


link_down_lan_ports () {
	for port in $LAN_PORTS
	do
		set_phy_power $port off
	done
	
	log "lan ports is linked down!"
}

link_up_lan_ports () {
	for port in $LAN_PORTS
	do
		set_phy_power $port on
	done
	
	log "lan ports is linked up!"
}

link_down_wan_ports() {
	for port in $WAN_PORTS
	do
		set_phy_power $port on
	done

	log "wan ports is linked down!"
}	

link_up_wan_ports () {
	for port in $WAN_PORTS
	do
		set_phy_power $port on
	done
	
	log "wan ports is linked up!"
}

link_down_all_ports () {
	for port in $LAN_PORTS $WAN_PORTS
	do
		set_phy_power $port off
	done
	
	log "switch ports is linked down!"
}

link_up_all_ports () {
	for port in $LAN_PORTS $WAN_PORTS
	do
		set_phy_power $port on
	done
	
	log "switch ports is linked up!"
}


set_port_duplex ()
{
	port=$1
	duplex=$2
	# switch cmd: switch duplux port [auto|100MFD|100MHD|10MFD|10MHD]
	switch phy_media_type $port $duplex
	switch phy_power $port off
	sleep 1
	switch phy_power $port on
}

#
# API requirement:
# `switch phy_link_status portmap` must:
# return 0 if any port linked up
# return 1 if no ports linked up
#

# output: 
# 	port %d Link UP
# or
# 	port %d Link DOWN [100MFD|100MHD|10MFD|10MHD]
#
get_port_link_status ()
{
	portmap=$1
	switch phy_link_status $portmap
}

get_lan_link_status ()
{
	switch phy_link_status 0x1e > /dev/null
}

get_wan_link_status ()
{
	switch phy_link_status 1 > /dev/null
}

# ap mode
disable_wan_carrier ()
{
	echo 0 > /proc/tplink/update_wan_carrier
}

update_wan_carrier ()
{
	echo 1 > /proc/tplink/update_wan_carrier
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
