#!/bin/sh
# Copyright (C) 2009 OpenWrt.org
. /lib/functions/pega.sh

setup_switch_dev() {
	local name
	config_get name "$1" name
	name="${name:-$1}"
	[ -d "/sys/class/net/$name" ] && ip link set dev "$name" up
	swconfig dev "$name" load network
}

setup_switch() {
	config_load network
	config_foreach setup_switch_dev switch

        #Matt, change neighbor setting
        /usr/sbin/neigh.sh &
}

SWITCH_PORT_POWERUP=0xf7ff #set bit 11 as 0
SWITCH_PORT_POWERDOWN=0x0800 #set bit 11 as 1
lan_ports="1 2 3 4"

phy_linkdown()
{
    phy=$1

    # get switch port register value
    register_val=$(switch phy cl22 r $phy 0)
    getField "$register_val" '=' 3 value

    # check if we get register value correctly
    if [ -z "$value" ]; then
        echo "Failed to get switch port register value!" > /dev/console
        return
    fi

    # disable switch port
    port_disable=$(or_op $value $SWITCH_PORT_POWERDOWN)
    # link down related switch port
    switch phy cl22 w $phy 0 $port_disable
}

phy_linkup()
{
    phy=$1

    # get switch port register value
    register_val=$(switch phy cl22 r $phy 0)
    getField "$register_val" '=' 3 value

    # check if we get register value correctly
    if [ -z "$value" ]; then
        echo "Failed to get switch port register value!" > /dev/console
        return
    fi

    # enable switch port
    port_enable=$(and_op $value $SWITCH_PORT_POWERUP)
    # related switch port link up
    switch phy cl22 w $phy 0 $port_enable
}

lan_ports_down() {
    # link down switch port
    for i in $lan_ports ; do
        phy_linkdown $i
    done
}

lan_ports_up() {
    # link up switch port
    for i in $lan_ports ; do
        phy_linkup $i
    done
}


wan_ports_down() {
    # link down switch port
    phy_linkdown 0
}

wan_ports_up() {
    # link up switch port
    phy_linkup 0
}
