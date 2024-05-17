#!/bin/sh
# please collect all linkspeed signal in this shell like following format , RAE will just read the file to get the value
#mac linkspeed signal
#dc:fb:48:3d:9f:00 144 71
#d4:61:da:f2:95:3b 433 52
wired_get_linkspeed(){
	local _linkspeed
	local gw_switch_port

	swconfig dev switch0 get dump_arl |grep MAC|awk '{print $2,$4}' > /tmp/ra_swconfig_portmap

	while read line
		do
			mac=`echo $line |awk '{print $1}'`
			portmap=`echo $line |awk '{print $2}'`
#rax120 hk1.0 use this portmap rules, hk2.0 will different
			case $portmap in
				0x01) gw_switch_port=1;; # Port #1
				0x02) gw_switch_port=2;; # Port #2
				0x03) gw_switch_port=3;; # Port #3
				0x04) gw_switch_port=4;; # Port #4
				0x06) gw_switch_port=6;; # Port #6
				*) gw_switch_port="";;
			esac

			_linkspeed=$(swconfig dev switch0 port $gw_switch_port get link 2>&1 | awk  '{print $3}' | tr -cd '0-9')
			[ "x$_linkspeed" = "x" ] && _linkspeed=0
			echo "$mac $_linkspeed 100 wired" >> /tmp/ra_devices_link_and_signal
		done  < /tmp/ra_swconfig_portmap
	rm /tmp/ra_swconfig_portmap
}

wireless_get_link_and_signal()
{
	wlan stainfo | grep -Ee 'Mbps|###' > /tmp/ra_wifi_stainfo
	while read line
		do
			if [ "x$(echo $line |grep "###")" != "x" ];then 
				con_type=$(echo $line |awk -F '###' '{print $2}')
			else
				echo "$(echo $line |awk '{print $1,$2,$3}'|sed s/Mbps//g) $con_type" >> /tmp/ra_devices_link_and_signal
			fi

		done < /tmp/ra_wifi_stainfo
	
	rm /tmp/ra_wifi_stainfo
}

rm /tmp/ra_devices_link_and_signal
wired_get_linkspeed 
wireless_get_link_and_signal 
