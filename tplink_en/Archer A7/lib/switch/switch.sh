#!/bin/sh

local CPU_PORT="0"

Q=1

[ $Q = 1 ] && O="/dev/null" || O="/dev/console"

debug () {
	echo "[SWITCH DEBUG] $@"
}


clear_vlan_table() {
	debug "Flush vlan entries."
	ssdk_sh vlan entry flush > $O
}

clear_all_vlans() {
	local port
	
	for port in 0 1 2 3 4 5
	do
		debug "Clear Port($port) PVID"
		ssdk_sh portVlan defaultCVid set $port 0 > $O
	done

	clear_vlan_table
}

setup_port_pvid() {
	[ "$#" -ne 2 ] && return
	debug "Set Port($1) PVID($2)"
	ssdk_sh portVlan defaultCVid set $1 $2 > $O
}

setup_switch_vlan() {
	local vid="$1"
	local ports="$2"
	
	debug "Create VLAN VID=$vid"	
	ssdk_sh vlan entry create "$vid" > $O
	
	for each_port in $ports
	do
		if [ "$each_port" -eq "$CPU_PORT" ]
		then
			debug "Add tagged port($each_port) to VLAN($vid)"
			ssdk_sh vlan member add "$vid" "$each_port" tagged > $O
		else
			debug "Add untagged port($each_port) to VLAN($vid)"
			ssdk_sh vlan member add "$vid" "$each_port" untagged > $O
		fi
	done
}

setup_switch_dev() {
	config_get TYPE  $1 TYPE

	if [ "${TYPE}" != "switch_vlan" ]
	then
		return
	fi
	
	config_get vlanID $1 vlan
	config_get ports  $1 ports
	setup_switch_vlan "$vlanID" "$ports"
	for each_port in $ports
	do
		setup_port_pvid "$each_port" "$vlanID"
		debug "Set Port($each_port) ingress to secure"
		ssdk_sh portVlan ingress set "$each_port" secure > $O
	done
}

setup_swconfig(){
	swconfig dev eth0 vlan 1 set ports "0t 2 3 4 5"
	swconfig dev eth0 vlan 1 set vid 1
	swconfig dev eth0 vlan 2 set ports "0t 1"
	swconfig dev eth0 vlan 2 set vid 4094
	swconfig dev eth0 vlan -1 set enable_vlan 1
}

setup_switch() {
	clear_all_vlans
	config_load switch 
	config_foreach setup_switch_dev
	setup_port_pvid ${CPU_PORT} 0
	setup_swconfig
}
