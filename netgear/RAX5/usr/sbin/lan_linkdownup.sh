#!/bin/sh

. /lib/functions/pega.sh
. /lib/network/switch.sh

WIFI_2G_INTERFACE_NAME=ra0
WIFI_5G_INTERFACE_NAME=rax0
WIFI_2G_GUESTNETWORK_INTERFACE_NAME=ra1
WIFI_5G_GUESTNETWORK_INTERFACE_NAME=rax1
DHCPCHANGEDFILE="/var/state/dhcpconfigchanged"
BR_INTERFACE=br-lan

ethernet_downup() {
    # link down switch port
    #echo -e "\033[095mlan_linkdownup.sh shutdown LAN ports!\033[0m" > /dev/console
    lan_ports_down

    sleep 2

    # link up switch port
    #echo -e "\033[095mlan_linkdownup.sh bring-up LAN ports!\033[0m" > /dev/console
    lan_ports_up
}

check_wifiif() {
	local is_2g=0
	local is_5g=0
	local is_guest_2g=0
	local is_guest_5g=0
	local if_list=$(ls /sys/class/net/br-lan/brif/)

	for ifname in $if_list ;
  	do
		if [ "$ifname" == "$WIFI_2G_INTERFACE_NAME" ]; then
			is_2g=1
		fi
		if [ "$ifname" == "$WIFI_5G_INTERFACE_NAME" ]; then
			is_5g=1
		fi
		if [ "$ifname" == "$WIFI_2G_GUESTNETWORK_INTERFACE_NAME" ]; then
			is_guest_2g=1
		fi
		if [ "$ifname" == "$WIFI_5G_GUESTNETWORK_INTERFACE_NAME" ]; then
			is_guest_5g=1
		fi
  	done

	if [ $is_2g -eq 0 ]; then
		brctl addif $BR_INTERFACE $WIFI_2G_INTERFACE_NAME
	fi
	if [ $is_5g -eq 0 ]; then
		brctl addif $BR_INTERFACE $WIFI_5G_INTERFACE_NAME
	fi
	if [ $is_guest_2g -eq 0 ]; then
		brctl addif $BR_INTERFACE $WIFI_2G_GUESTNETWORK_INTERFACE_NAME
	fi
	if [ $is_guest_5g -eq 0 ]; then
		brctl addif $BR_INTERFACE $WIFI_5G_GUESTNETWORK_INTERFACE_NAME
	fi
}

wifi_downup() {
	# link down wireless interface
	#ifconfig $WIFI_2G_INTERFACE_NAME down
	#ifconfig $WIFI_5G_INTERFACE_NAME down
	#ifconfig $WIFI_2G_GUESTNETWORK_INTERFACE_NAME down
	#ifconfig $WIFI_5G_GUESTNETWORK_INTERFACE_NAME down
	#For IoT device re-connect issue, we must to use the "wifi down"/"wifi up" otherwise the IoT devices not easily get newly DHCP ip.
	#/usr/sbin/hwnat-disable.sh
	/sbin/wifi down
	sleep 3
	#/usr/sbin/hwnat-enable.sh
	/sbin/wifi up

	# link up wireless interface
	#check_wifiif #PeguBU6, YochengLian, 2022.08.05, Fix RAX5-IR006 and No more need re-add wifi interface to br-lan bridge group.
	/usr/bin/lua -lcommonFunc/wifiUtils_convertWifiSettings -e "wifiReload_postAction(\"2.4G\", \"0s\")"
	/usr/bin/lua -lcommonFunc/wifiUtils_convertWifiSettings -e "wifiReload_postAction(\"5G\", \"0s\")"
	#PeguBU6, YochengLian, 2022.08.11, Fix RAX5-IR060 Wifi LED no longer active.
	#This led_control daemon must be trigger after each time wifi driver reloading.
	#echo -e "\033[095mIn lan_linkdownup.sh, Temp verification method, here will call \"killall -WINCH led_control\" !\033[0m" > /dev/console #For debug.
	killall -WINCH led_control
	#End of PeguBU6, YochengLian, 2022.08.11.
}

link_downup() {
	# run ethernet switch port link down/link up in the background
	ethernet_downup &

	# run wifi interface link down/link up in the background
	wifi_downup &
}

# Per spec, Only a change regarding the router's LAN IP address, subnet mask,
# or DHCP server pool range has to reset the LAN Ethernet interface.
#PeguBU6, YochengLian, 2022.08.05, Fix RAX5-IR006. When odhcpd chaged setting and link down/up operation, also move to here to execute.
[ -f $DHCPCHANGEDFILE ] || [ -f "/var/state/ipv6changed" ] || [ "$1" == "force" ] && {
	link_downup
	/usr/bin/lua -lcommonFunc/wifiUtils_convertWifiSettings -e "local M = require \"commonFunc.wifiUtils_convertWifiSettings\";M.reload_guest_network_accessing();"
	rm -f $DHCPCHANGEDFILE
	rm -f "/var/state/ipv6changed"
}
