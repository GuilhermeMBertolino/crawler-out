# Copyright (C) 2009-2010 OpenWrt.org
. /lib/switch/config.sh
. /lib/config/uci.sh

setup_vlan() {
    #ssdk_sh vlan entry flush

    #ssdk_sh vlan entry create 1
    #ssdk_sh vlan member add 1 0 unmodified
    #ssdk_sh vlan member add 1 2 unmodified
    #ssdk_sh portVlan defaultCVid set 2 1
    #ssdk_sh portVlan egress set 2 untagged

    #ssdk_sh vlan entry create 2
    #ssdk_sh vlan member add 2 0 unmodified
    #ssdk_sh vlan member add 2 3 unmodified
    #ssdk_sh portVlan defaultCVid set 3 2
    #ssdk_sh portVlan egress set 3 untagged

    #ssdk_sh vlan entry create 3
    #ssdk_sh vlan member add 3 0 unmodified
    #ssdk_sh vlan member add 3 4 unmodified
    #ssdk_sh portVlan defaultCVid set 4 3
    #ssdk_sh portVlan egress set 4 untagged

    #ssdk_sh vlan entry create 4
    #ssdk_sh vlan member add 4 0 unmodified
    #ssdk_sh vlan member add 4 1 unmodified
    #ssdk_sh portVlan defaultCVid set 1 4
    #ssdk_sh portVlan egress set 1 untagged

    ssdk_sh portVlan egress set 0 tagged 2>&1 1>-

    ssdk_sh fdb portLearn set 0 disable 2>&1 1>-
    ssdk_sh fdb portLearn set 1 disable 2>&1 1>-
    ssdk_sh fdb portLearn set 2 disable 2>&1 1>-
    ssdk_sh fdb portLearn set 3 disable 2>&1 1>-
    ssdk_sh fdb portLearn set 4 disable 2>&1 1>-
    ssdk_sh fdb entry flush 0 2>&1 1>-

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
