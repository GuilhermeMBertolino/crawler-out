# Copyright (C) 2009-2010 OpenWrt.org
. /lib/switch/config.sh
. /lib/config/uci.sh

setup_vlan() {
    switch_bind_mac
    return
}

setup_duplex() {
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
	
	portspeed $port $speed $duplex $autoneg
	echo "SETUP port ($port) duplex: $speed $duplex autoneg: $autoneg!"
}

unsetup_duplex() {
	echo "UNSETUP duplex"
}

setup_ports() {
	switch_link_up
}

unsetup_ports() {
	switch_link_down
}
