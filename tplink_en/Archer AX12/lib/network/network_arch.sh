# Copyright (C) 2011-2014 TP-LINK

GMAC3_ENABLE=

# Set of lan ports 'logic number': LAN1->1 LAN2->2 LAN3->3, order of LAN port
LAN_PORT_SET="1 2 3"
# Set of lan phy ports: LAN1->phyport0 LAN2->phyport1 LAN3->phyport2
LAN_PHY_PORT_SET="1:2 2:3 3:4"
# Set of device for lan ports: LAN1->null LAN2->null LAN3->null
LAN_PORT_DEVSET="eth0 eth0 eth0"
# Set of wan ports 'logic number': WAN1->1
WAN_PORT_SET="1"
# Set of wan phy ports: WAN1->phyport4
WAN_PHY_PORT_SET="1:1"
# Set of device for wan ports: WAN1->1
WAN_PORT_DEVSET="eth1"
# Set of connecting CPU phy ports, more than one is possible
CPU1_PHY_PORT_SET="6"
# Set of another connecting CPU phy ports, more than one is possible
CPU2_PHY_PORT_SET="8"
# Set of WAN defualt VLAN ID
WAN_DEFUALT_VID="8"
# Set of LAN defualt VLAN ID
LAN_DEFUALT_VID="2 3 4"

get_lan_phyport_bylogic()
{
	local lport=$1
	local phyport=""
	local index=1

	if [ -n "$lport" ]; then
		for i in ${LAN_PORT_SET} ; do
			if [ $lport -eq $i ]; then
				phyport=$(eval "echo \"${LAN_PHY_PORT_SET}\" | awk '{print \$${index}}'")
				break
			fi
			index=$((index+1))
		done
	fi

	echo "${phyport##*:}"
}

get_wan_phyportseq()
{
	local wport=1
	local phyport=""
	local index=1
	
	if [ -n "$1" ]; then
		wport=$1
	fi

	if [ -n "$wport" ]; then
		for i in ${WAN_PORT_SET} ; do
			if [ $wport -eq $i ]; then
				phyport=$(eval "echo \"${WAN_PHY_PORT_SET}\" | awk '{print \$${index}}'")
				break
			fi
			index=$((index+1))
		done
	fi

	echo "${phyport##*:}"
}

get_phyport_byindex()
{
	local index=$1
	local phyport=""

	if [ -n "$index" ]; then
		phyport=$(eval "echo \"${LAN_PHY_PORT_SET}\" | awk '{print \$${index}}'")
	fi

	echo "$phyport"
}
