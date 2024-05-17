#!/bin/sh

. /etc/wlan/wifi_conf
ap_mode=`config get ap_mode`

for ifname in ${main_ifname_list}; do
	if [ "$(nvram get ${ifname}_bss_enabled)" = "1" ]; then
		if [ "${ifname}" = "${mainifname_2G}" ]; then
			hapd_name_2G="${ifname}"
		elif [ "${ifname}" = "${mainifname_5GL}" ]; then
			hapd_name_5GL="${ifname}"
		elif [ "${ifname}" = "${mainifname_5GH}" ]; then
			hapd_name_5GH="${ifname}"
		fi
	elif [ "$(nvram get ${ifname}.1_bss_enabled)" = "1" ]; then
		if [ "${ifname}" = "${mainifname_2G}" ]; then
			hapd_name_2G="${ifname}.1"
		elif [ "${ifname}" = "${mainifname_5GL}" ]; then
			hapd_name_5GL="${ifname}.1"
		elif [ "${ifname}" = "${mainifname_5GH}" ]; then
			hapd_name_5GH="${ifname}.1"
		fi
	elif [ "$(nvram get ${ifname}.2_bss_enabled)" = "1" ]; then
		if [ "${ifname}" = "${mainifname_2G}" ]; then
			hapd_name_2G="${ifname}.2"
		elif [ "${ifname}" = "${mainifname_5GL}" ]; then
			hapd_name_5GL="${ifname}.2"
		elif [ "${ifname}" = "${mainifname_5GH}" ]; then
			hapd_name_5GH="${ifname}.2"
		fi
	fi
done

clear_guest_ebtables_wirelessX()
{
	local lan_ipaddr=$(ifconfig br0 | grep "inet addr" | awk '{print $2}'| awk -F ':' '{print $2}')
	#netmask=$(ifconfig br0 | grep "inet addr" | awk '{print $4}'| awk -F ':' '{print $2}')
	#calculate_subnet $lan_ipaddr $netmask brsubnet
	local lan_ipv6addr=$(ifconfig br0 | grep Scope:Link | awk '{print $3}' | awk -F '/' '{print $1}')
	local lan_ipv6addr_local=$(ifconfig br0 | grep Scope:Global | awk '{print $3}' | awk -F '/' '{print $1}')

	ebtables -D INPUT -p IPv4 --ip-proto 17 --ip-dport 67:68 -j ACCEPT # 17 is udp
	ebtables -D INPUT -p IPv4 --ip-proto 17 --ip-dport 53 -j ACCEPT
	ebtables -D INPUT -p IPv4 --ip-proto 17 --ip-dport 5333 -j ACCEPT
	ebtables -D INPUT -p IPv6 --ip6-proto ipv6-icmp --ip6-icmp-type ! echo-request -j ACCEPT
	ebtables -D INPUT -p IPv6 --ip6-proto 17 --ip6-dport 546:547 -j ACCEPT
	ebtables -D INPUT -p IPv6 --ip6-proto 17 --ip6-dport 53 -j ACCEPT
	ebtables -D INPUT -p IPv6 --ip6-proto 17 --ip6-dport 5333 -j ACCEPT

	ebtables -D FORWARD -p ARP -j ACCEPT
	ebtables -D FORWARD -p 0x8035 -j ACCEPT
	ebtables -D FORWARD -p IPv4 --ip-proto 17 --ip-dport 67:68 -j ACCEPT

	ebtables -D FORWARD -p IPv4 --ip-proto 17 --ip-dport 67:68 -j ACCEPT # 17 is udp
	ebtables -D FORWARD -p IPv4 --ip-proto 17 --ip-dport 53 -j ACCEPT
	ebtables -D FORWARD -p IPv4 --ip-proto 17 --ip-dport 5333 -j ACCEPT
	ebtables -D FORWARD -p IPv6 --ip6-proto ipv6-icmp -j SKIPLOG
	ebtables -D FORWARD -p IPv6 --ip6-proto ipv6-icmp --ip6-icmp-type ! echo-request -j ACCEPT
	ebtables -D FORWARD -p IPv6 --ip6-proto 17 --ip6-dport 546:547 -j ACCEPT
	ebtables -D FORWARD -p IPv6 --ip6-proto 17 --ip6-dport 53 -j ACCEPT
	ebtables -D FORWARD -p IPv6 --ip6-proto 17 --ip6-dport 5333 -j ACCEPT

	ebtables -L INPUT |grep wl > /tmp/ebtable_wl
	sed -i 's/^/ebtables -D INPUT &/g' /tmp/ebtable_wl
	sh /tmp/ebtable_wl
	ebtables -L FORWARD |grep wl > /tmp/ebtable_wl
	sed -i 's/^/ebtables -D FORWARD &/g' /tmp/ebtable_wl
	sh /tmp/ebtable_wl
}

guest_network_ebtable_update_wirelessX()
{
	local brsubnet
	local lan_ipaddr=$(ifconfig br0 | grep "inet addr" | awk '{print $2}'| awk -F ':' '{print $2}')
	local lan_ipv6addr=$(ifconfig br0 | grep Scope:Link | awk '{print $3}' | awk -F '/' '{print $1}')
	local lan_ipv6addr_local=$(ifconfig br0 | grep Scope:Global | awk '{print $3}' | awk -F '/' '{print $1}')
	need_ebtables=0

	#### wireless_allow_to_wired
	## INPUT
	for device in wireless1 wireless2 wireless3; do
		eval allow2local=`config get ${device}_allow_to_wired`
		if [ "$allow2local" = "0" ]; then
			need_ebtables=1
			break
		fi
	done
	if [ "$need_ebtables" = "1" ]; then
		# ACCEPT
		ebtables -A INPUT -p IPv4 --ip-proto 17 --ip-dport 67:68 -j ACCEPT # 17 is udp
		ebtables -A INPUT -p IPv4 --ip-proto 17 --ip-dport 53 -j ACCEPT
		ebtables -A INPUT -p IPv4 --ip-proto 17 --ip-dport 5333 -j ACCEPT
		ebtables -A INPUT -p IPv6 --ip6-proto ipv6-icmp --ip6-icmp-type ! echo-request -j ACCEPT
		ebtables -A INPUT -p IPv6 --ip6-proto 17 --ip6-dport 546:547 -j ACCEPT
		ebtables -A INPUT -p IPv6 --ip6-proto 17 --ip6-dport 53 -j ACCEPT
		ebtables -A INPUT -p IPv6 --ip6-proto 17 --ip6-dport 5333 -j ACCEPT

		# DROP
		ebtables -A FORWARD -p ARP -j ACCEPT
		if [ "$ap_mode" = "1" ]; then
			ebtables -A FORWARD -p IPv4 -o eth0 --ip-proto 17 --ip-dport 67:68 -j ACCEPT
		else
			ebtables -A FORWARD -p IPv4 --ip-proto 17 --ip-dport 67:68 -j ACCEPT
		fi
		ebtables -A FORWARD -p IPv4 --ip-proto 17 --ip-dport 53 -j ACCEPT
		ebtables -A FORWARD -p IPv4 --ip-proto 17 --ip-dport 5333 -j ACCEPT
		# fix ipv6 ping block from WLAN to LAN-PC fail;
		ebtables -A FORWARD -p IPv6 --ip6-proto ipv6-icmp -j SKIPLOG
		ebtables -A FORWARD -p IPv6 --ip6-proto ipv6-icmp --ip6-icmp-type ! echo-request -j ACCEPT
		ebtables -A FORWARD -p IPv6 --ip6-proto 17 --ip6-dport 546:547 -j ACCEPT
		ebtables -A FORWARD -p IPv6 --ip6-proto 17 --ip6-dport 53 -j ACCEPT
		ebtables -A FORWARD -p IPv6 --ip6-proto 17 --ip6-dport 5333 -j ACCEPT
		for device in wireless1 wireless2 wireless3; do
			eval allow2local=`config get ${device}_allow_to_wired`
			eval wlreless_ifnames=`echo ${device}_ifname`
			ifnames="$(eval echo \$${wlreless_ifnames})"
			if [ "$allow2local" = "0" ]; then
				for ifname in $ifnames; do #ifname="wl0 wl1"
					if [ "$ap_mode" = "1" ]; then
						ebtables -A FORWARD -i $ifname -o eth0 -j ACCEPT
						ebtables -A FORWARD -i $ifname -o eth+ -j DROP
					else
						ebtables -A FORWARD -i $ifname -o eth+ -j DROP
					fi
					ebtables -A INPUT -p IPv4 -i $ifname  --ip-dst $lan_ipaddr -j DROP
					ebtables -A INPUT -p IPv6 -i $ifname  --ip6-dst $lan_ipv6addr/ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff -j DROP
					if [ -n $lan_ipv6addr_local ];then
						ebtables -A INPUT -p IPv6 -i $ifname --ip6-dst $lan_ipv6addr_local/ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff -j DROP 
					fi
				done
			else
				for ifname in $ifnames; do #ifname="wl0 wl1"
					ebtables -A FORWARD -i $ifname -o eth+ -j ACCEPT
				done
			fi
		done
	else
		for device in wireless1 wireless2 wireless3; do
			eval wlreless_ifnames=`echo ${device}_ifname`
			ifnames="$(eval echo \$${wlreless_ifnames})"
			for ifname in $ifnames; do #ifname="wl0 wl1"
				ebtables -A FORWARD -i $ifname -o eth+ -j ACCEPT
			done
		done
	fi

	#### wireless_ssid_isolation and client_isolation
	## FORWARD
	eval wireless_ssid_isolation=`config get wireless_ssid_isolation`
	if [ "$wireless_ssid_isolation" = "1" ]; then
		for device in wireless1 wireless2 wireless3; do
			eval wireless_client_isolation=`config get ${device}_client_isolation`
			eval wlreless_ifnames=`echo ${device}_ifname`
			ifnames="$(eval echo \$${wlreless_ifnames})"
			if [ "$wireless_client_isolation" = "1" ]; then
				for ifname in $ifnames; do #ifname="wl0 wl1"
						ebtables -A FORWARD -i $ifname -j DROP
				done
			else
				if [ "$device" = "wireless1" ]; then
					ebtables -A FORWARD -i wl0 -o wl1 -j ACCEPT
					ebtables -A FORWARD -i wl1 -o wl0 -j ACCEPT
					ebtables -A FORWARD -i wl0 -j DROP
					ebtables -A FORWARD -i wl1 -j DROP
				elif [ "$device" = "wireless2" ]; then
					ebtables -A FORWARD -i wl0.1 -o wl1.1 -j ACCEPT
					ebtables -A FORWARD -i wl1.1 -o wl0.1 -j ACCEPT
					ebtables -A FORWARD -i wl0.1 -j DROP
					ebtables -A FORWARD -i wl1.1 -j DROP
				else
					ebtables -A FORWARD -i wl0.2 -o wl1.2 -j ACCEPT
					ebtables -A FORWARD -i wl1.2 -o wl0.2 -j ACCEPT
					ebtables -A FORWARD -i wl0.2 -j DROP
					ebtables -A FORWARD -i wl1.2 -j DROP
				fi
			fi
		done
	else
		for device in wireless1 wireless2 wireless3; do
			eval wireless_client_isolation=`config get ${device}_client_isolation`
			if [ "$wireless_client_isolation" = "1" ]; then
				if [ "$device" = "wireless1" ]; then
					ebtables -A FORWARD -i wl0 -o wl1 -j DROP
					ebtables -A FORWARD -i wl1 -o wl0 -j DROP
				elif [ "$device" = "wireless2" ]; then
					ebtables -A FORWARD -i wl0.1 -o wl1.1 -j DROP
					ebtables -A FORWARD -i wl1.1 -o wl0.1 -j DROP
				else
					ebtables -A FORWARD -i wl0.2 -o wl1.2 -j DROP
					ebtables -A FORWARD -i wl1.2 -o wl0.2 -j DROP
				fi
			else
				echo "don't need ebtables on FORWARD"
			fi
		done
	fi

	# refresh cache to make sure ebtables take effect immediately
	/bin/fc flush

}
clear_guest_ebtables()
{
	local lan_ipaddr=$(ifconfig br0 | grep "inet addr" | awk '{print $2}'| awk -F ':' '{print $2}')
	#netmask=$(ifconfig br0 | grep "inet addr" | awk '{print $4}'| awk -F ':' '{print $2}')
	#calculate_subnet $lan_ipaddr $netmask brsubnet
	local lan_ipv6addr=$(ifconfig br0 | grep Scope:Link | awk '{print $3}' | awk -F '/' '{print $1}')
	local lan_ipv6addr_local=$(ifconfig br0 | grep Scope:Global | awk '{print $3}' | awk -F '/' '{print $1}')
	if [ -z "$lan_ipv6addr_local" -a -f /tmp/lan_ipv6addr_local ];then
		lan_ipv6addr_local=$(cat /tmp/lan_ipv6addr_local)
	fi

	ebtables -D INPUT -p IPv4 --ip-proto 17 --ip-dport 67:68 -j ACCEPT # 17 is udp
	ebtables -D INPUT -p IPv4 --ip-proto 17 --ip-dport 53 -j ACCEPT
	ebtables -D INPUT -p IPv4 --ip-proto 17 --ip-dport 5333 -j ACCEPT
	ebtables -D INPUT -p IPv6 --ip6-proto ipv6-icmp --ip6-icmp-type ! echo-request -j ACCEPT
	ebtables -D INPUT -p IPv6 --ip6-proto 17 --ip6-dport 546:547 -j ACCEPT
	ebtables -D INPUT -p IPv6 --ip6-proto 17 --ip6-dport 53 -j ACCEPT
	ebtables -D INPUT -p IPv6 --ip6-proto 17 --ip6-dport 5333 -j ACCEPT

	ebtables -D FORWARD -p ARP -j ACCEPT
	ebtables -D FORWARD -p 0x8035 -j ACCEPT
	ebtables -D FORWARD -p IPv4 --ip-proto 17 --ip-dport 67:68 -j ACCEPT

	for device in ${guest_ifname_list}; do

		ebtables -D INPUT -p IPv4 -i $device  --ip-dst $lan_ipaddr -j DROP
		ebtables -D INPUT -p IPv6 -i $device  --ip6-dst $lan_ipv6addr/ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff -j DROP
		if [ -n $lan_ipv6addr_local ];then
			ebtables -D INPUT -p IPv6 -i $device --ip6-dst $lan_ipv6addr_local/ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff -j DROP 
		fi

		ebtables -D FORWARD -i $device -j DROP
		ebtables -D FORWARD -o $device -j DROP
	done

	if [ -f /tmp/lan_ipv6addr_local ]; then
		rm -f /tmp/lan_ipv6addr_local
	fi
}

guest_network_ebtable_update()
{
	local brsubnet
	local lan_ipaddr=$(ifconfig br0 | grep "inet addr" | awk '{print $2}'| awk -F ':' '{print $2}')
	local lan_ipv6addr=$(ifconfig br0 | grep Scope:Link | awk '{print $3}' | awk -F '/' '{print $1}')
	local lan_ipv6addr_local=$(ifconfig br0 | grep Scope:Global | awk '{print $3}' | awk -F '/' '{print $1}')
	need_ebtables=0

	for device in ${guest_ifname_list}; do
		eval device_enable=`nvram get ${device}_bss_enabled`
		eval deny2local=`nvram get ${device}_ap_isolate`
		if [ "$device_enable" = "1" -a "$deny2local" = "1" ]; then
			need_ebtables=1
			break
		fi
	done

	if [ "$need_ebtables" = "1" ]; then
		ebtables -A INPUT -p IPv4 --ip-proto 17 --ip-dport 67:68 -j ACCEPT # 17 is udp
		ebtables -A INPUT -p IPv4 --ip-proto 17 --ip-dport 53 -j ACCEPT
		ebtables -A INPUT -p IPv4 --ip-proto 17 --ip-dport 5333 -j ACCEPT
		ebtables -A INPUT -p IPv6 --ip6-proto ipv6-icmp --ip6-icmp-type ! echo-request -j ACCEPT
		ebtables -A INPUT -p IPv6 --ip6-proto 17 --ip6-dport 546:547 -j ACCEPT
		ebtables -A INPUT -p IPv6 --ip6-proto 17 --ip6-dport 53 -j ACCEPT
		ebtables -A INPUT -p IPv6 --ip6-proto 17 --ip6-dport 5333 -j ACCEPT

		ebtables -A FORWARD -p ARP -j ACCEPT
		ebtables -A FORWARD -p 0x8035 -j ACCEPT
		ebtables -A FORWARD -p IPv4 --ip-proto 17 --ip-dport 67:68 -j ACCEPT

		for device in ${guest_ifname_list}; do
			eval device_enable=`nvram get ${device}_bss_enabled`
			eval deny2local=`nvram get ${device}_ap_isolate`
			if [ "$device_enable" = "1" -a "$deny2local" = "1" ]; then
				ebtables -A INPUT -p IPv4 -i $device  --ip-dst $lan_ipaddr -j DROP
				ebtables -A INPUT -p IPv6 -i $device  --ip6-dst $lan_ipv6addr/ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff -j DROP
				if [ -n $lan_ipv6addr_local ];then
					echo "$lan_ipv6addr_local" >/tmp/lan_ipv6addr_local
					ebtables -A INPUT -p IPv6 -i $device --ip6-dst $lan_ipv6addr_local/ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff -j DROP 
				fi
				ebtables -A FORWARD -i $device -j DROP
				ebtables -A FORWARD -o $device -j DROP
			fi
		done
	fi
}

guest_network()
{
	if [ "$(config get ssid_number_per_radio)" = "0x7" ]; then
		clear_guest_ebtables_wirelessX
		guest_network_ebtable_update_wirelessX
	else
		clear_guest_ebtables
		guest_network_ebtable_update
	fi
}

adjust_2G_thresh()
{
	# for stress test: BRCM reply: 
	# TEC 2G is quite noisy and we need to enable dy_ed_thresh to overcome the homeiot stressing. 
	[ "$(config get dy_ed_thresh)" = "1" -o "$(config get wl_country)" != "4" ] && wl -i ${mainifname_2G} dy_ed_thresh 1
	[ "$(config get dy_ed_thresh_acphy)" = "1" -o "$(config get wl_country)" != "4" ] && wl -i ${mainifname_2G} dy_ed_thresh_acphy 1
	[ "$(config get dy_ed_setup)" = "1" -o "$(config get wl_country)" != "4" ] && wl -i ${mainifname_2G} dy_ed_setup -maxsed 30 -minsed 5 -win 2 -inc 2 -dec 2 -maxth -45 -minth -65 -seddis 90
}

dniadjust()
{
	## update 2G an 5G down/up status for GUI
	isup=$(wl -i ${mainifname_2G} status 2>/dev/null | grep BSSID | awk '{print $2}')
	if [ -n "$isup" -a "$isup" != "00:00:00:00:00:00" ]; then
		echo "ON" > /tmp/WLAN_2G_status
	else
		echo "OFF" > /tmp/WLAN_2G_status
	fi
	isup=$(wl -i ${mainifname_5GL} status 2>/dev/null | grep BSSID | awk '{print $2}')
	if [ -n "$isup" -a "$isup" != "00:00:00:00:00:00" ]; then
		echo "ON" > /tmp/WLAN_5G_status
	else
		echo "OFF" > /tmp/WLAN_5G_status
	fi
	if [ "$is_dual_band" = "0" ]; then
		isup=$(wl -i ${mainifname_5GH} status 2>/dev/null | grep BSSID | awk '{print $2}')
		if [ -n "$isup" -a "$isup" != "00:00:00:00:00:00" ]; then
			echo "ON" > /tmp/WLAN_5G_2nd_status
		else
			echo "OFF" > /tmp/WLAN_5G_2nd_status
		fi
	fi

	## If wireless_ra_installation.sh is no running, run it.
	ra_install_isup=$(ps -w | grep "wireless_ra_installation" | grep -v grep)
	in_dnshijack=$(/bin/config get dns_hijack)
	if [ -z "$ra_install_isup" -a "x$in_dnshijack" = "x1" ];then
		/sbin/wireless_ra_installation.sh &
	fi

	## If atd is no running, run it.
	atd_isup=$(ps | grep "[ /]atd" | grep -v grep)
	if [ -z "$atd_isup" ];then
		/usr/sbin/atd
	fi

	## If thermal.sh is not running, run it.
	thermal_isup=$(ps | grep "thermal.sh" | grep -v grep)
	factory_mode=`/bin/config get factory_mode`
	i2c_exist=$(i2cget -y 0 0x48 0x00 >/dev/null 2>&1 && echo 1 || echo 0)
	if [ -z "$thermal_isup" -a "x$factory_mode" != "x1" -a "x$i2c_exist" = "x1" ];then
		/sbin/thermal.sh start 98 95 60 &
	fi

	## Preamble mode
	for device in ${main_ifname_list}; do
		eval wl_plcphdr=`nvram get ${device}_plcphdr`
		eval wl -i $device plcphdr $wl_plcphdr
	done

	factory_mode=`/bin/config get factory_mode`
	if [ "x$factory_mode" = "x1" ]; then
		wl -i wl0 down; 
		wl -i wl1 down; 
		wl -i wl2 down; 
		wl -i ${mainifname_5GL} dfs_ism_monitor 1
		if [ "x$(config get cal)" = "x0" ]; then
			wl -i wl0 country ALL
			wl -i wl1 country ALL
		fi
	fi

	# for stress test: BRCM reply: 
	# TEC 2G is quite noisy and we need to enable dy_ed_thresh to overcome the homeiot stressing. 
	[ "$(config get dy_ed_thresh)" = "1" -o "$(config get wl_country)" != "4" ] && wl -i ${mainifname_2G} dy_ed_thresh 1
	[ "$(config get dy_ed_thresh_acphy)" = "1" -o "$(config get wl_country)" != "4" ] && wl -i ${mainifname_2G} dy_ed_thresh_acphy 1
	[ "$(config get dy_ed_setup)" = "1" -o "$(config get wl_country)" != "4" ] && wl -i ${mainifname_2G} dy_ed_setup -maxsed 30 -minsed 5 -win 2 -inc 2 -dec 2 -maxth -45 -minth -65 -seddis 90

	if [ "$is_dual_band" = "0" ]; then
		region="$(nvram get wl2_country_code)"
		if [ "$region" = "US" ]; then #NA
			# adjust triband 5G1 DFS threshold
			wl -i ${mainifname_5GL} radarthrs 0x6a0 0x30 0x6a0 0x20 0x6a0 0x20 0x6ac 0x20 0x6b0 0x20 0x6ac 0x20 0x6ac 0x20 0x6a4 0x20 2>/dev/null
		fi
	fi


	# TEC 2G is quite noisy and we need to enable dy_ed_thresh to overcome the homeiot stressing.
	{ sleep 5; adjust_2G_thresh; } &

	# DFS channel shouldn't active scan
	eval wl -i $mainifname_5GL passive_on_restricted_mode 1
	if [ "$is_dual_band" = "0" ]; then
		eval wl -i $mainifname_5GH passive_on_restricted_mode 1
	fi

	touch /tmp/wifi_is_done
}

wifiradio_qcawifi()
{
	local ifname=$1
	local is_20 is_40 is_80 is_80_80 is_160 is_plus is_minus
	shift

	while [ "$#" -gt "0" ]; do
		case $1 in
			-s|--status)
				if [ "$(config get ssid_number_per_radio)" = "0x7" ]; then
					for wlname in $ifname; do #ifname="wl0 wl1"
						isup=$(wl -i $wlname status 2>/dev/null | grep BSSID | awk '{print $2}')
						if [ -n "$isup" -a "$isup" != "00:00:00:00:00:00" ]; then
							echo "ON"
							exit
						fi
					done
					echo "OFF"
				else
					isup=$(wl -i $wlname status 2>/dev/null | grep BSSID | awk '{print $2}')
					if [ -n "$isup" -a "$isup" != "00:00:00:00:00:00" ]; then
						echo "ON"
					else
						echo "OFF"
					fi
				fi
				shift
				;;
			-c|--channel)
				#p_chan=`wl -i $ifname channel |grep current |awk '{print $4}'`
				p_chan=`wl -i $ifname status |grep Primary |awk '{print $3}'`
				cur_mode=`wl -i $ifname status |grep Chanspec |awk '{printf $5}'`
				is_20=`echo $cur_mode | grep '20'`
				is_40=`echo $cur_mode | grep '40'`
				is_80=`echo $cur_mode | grep '80'`
				is_80_80=`echo $cur_mode | grep '80_80'`
				is_160=`echo $cur_mode | grep '160'`

				if [ -n "$is_40" ]; then
					is_plus=`wl -i $ifname chanspec |awk '{print $1}' |grep l`
					is_minus=`wl -i $ifname chanspec |awk '{print $1}' |grep u`
				fi

				if [ -n "$is_20" ]; then
					chan=$p_chan
				elif [ -n "$is_plus" ]; then
					s_chan=$(($p_chan + 4));
					chan="${p_chan}(P) + ${s_chan}(S)"
				elif [ -n "$is_minus" ]; then
					s_chan=$(($p_chan - 4));
					chan="${p_chan}(P) + ${s_chan}(S)"
				elif [ -z "$is_80_80" -a -n "$is_80" ]; then
					case "${p_chan}" in
						36) chan="36(P) + 40 + 44 + 48" ;;
						40) chan="36 + 40(P) + 44 + 48" ;;
						44) chan="36 + 40 + 44(P) + 48" ;;
						48) chan="36 + 40 + 44 + 48(P)" ;;
						52) chan="52(P) + 56 + 60 + 64" ;;
						56) chan="52 + 56(P) + 60 + 64" ;;
						60) chan="52 + 56 + 60(P) + 64" ;;
						64) chan="52 + 56 + 60 + 64(P)" ;;
						100) chan="100(P) + 104 + 108 + 112" ;;
						104) chan="100 + 104(P) + 108 + 112" ;;
						108) chan="100 + 104 + 108(P) + 112" ;;
						112) chan="100 + 104 + 108 + 112(P)" ;;
						116) chan="116(P) + 120 + 124 + 128" ;;
						120) chan="116 + 120(P) + 124 + 128" ;;
						124) chan="116 + 120 + 124(P) + 128" ;;
						128) chan="116 + 120 + 124 + 128(P)" ;;
						132) chan="132(P) + 136 + 140 + 144";;
						136) chan="132 + 136(P) + 140 + 144";;
						140) chan="132 + 136 + 140(P) + 144";;
						144) chan="132 + 136 + 140 + 144(P)";;
						149) chan="149(P) + 153 + 157 + 161";;
						153) chan="149 + 153(P) + 157 + 161";;
						157) chan="149 + 153 + 157(P) + 161";;
						161) chan="149 + 153 + 157 + 161(P)";;
					esac
				elif [ -n "$is_80_80" ]; then
					case "${p_chan}" in
						36) chan="36(P) + 40 + 44 + 48 + 149 + 153 + 157 + 161" ;;
						40) chan="36 + 40(P) + 44 + 48 + 149 + 153 + 157 + 161" ;;
						44) chan="36 + 40 + 44(P) + 48 + 149 + 153 + 157 + 161" ;;
						48) chan="36 + 40 + 44 + 48(P) + 149 + 153 + 157 + 161" ;;
						149) chan="36 + 40 + 44 + 48 + 149(P) + 153 + 157 + 161";;
						153) chan="36 + 40 + 44 + 48 + 149 + 153(P) + 157 + 161";;
						157) chan="36 + 40 + 44 + 48 + 149 + 153 + 157(P) + 161";;
						161) chan="36 + 40 + 44 + 48 + 149 + 153 + 157 + 161(P)";;
					esac
				elif [ -n "$is_160" ]; then
					case "${p_chan}" in
						36) chan="36(P) + 40 + 44 + 48 + 52 + 56 + 60 + 64" ;;
						40) chan="36 + 40(P) + 44 + 48 + 52 + 56 + 60 + 64" ;;
						44) chan="36 + 40 + 44(P) + 48 + 52 + 56 + 60 + 64" ;;
						48) chan="36 + 40 + 44 + 48(P) + 52 + 56 + 60 + 64" ;;
						52) chan="36 + 40 + 44 + 48 + 52(P) + 56 + 60 + 64" ;;
						56) chan="36 + 40 + 44 + 48 + 52 + 56(P) + 60 + 64" ;;
						60) chan="36 + 40 + 44 + 48 + 52 + 56 + 60(P) + 64" ;;
						64) chan="36 + 40 + 44 + 48 + 52 + 56 + 60 + 64(P)" ;;
						100) chan="100(P) + 104 + 108 + 112 + 116 + 120 + 124 + 128" ;;
						104) chan="100 + 104(P) + 108 + 112 + 116 + 120 + 124 + 128" ;;
						108) chan="100 + 104 + 108(P) + 112 + 116 + 120 + 124 + 128" ;;
						112) chan="100 + 104 + 108 + 112(P) + 116 + 120 + 124 + 128" ;;
						116) chan="100 + 104 + 108 + 112 + 116(P) + 120 + 124 + 128" ;;
						120) chan="100 + 104 + 108 + 112 + 116 + 120(P) + 124 + 128" ;;
						124) chan="100 + 104 + 108 + 112 + 116 + 120 + 124(P) + 128" ;;
						128) chan="100 + 104 + 108 + 112 + 116 + 120 + 124 + 128(P)" ;;
					esac
				else
					chan=$p_chan
				fi
				echo "$chan"
				break;
				shift
				;;
			--coext)
				if [ "$2" = "on" ]; then
					iwpriv $ifname disablecoext 0
					iwpriv $ifname extbusythres 30
				else
					iwpriv $ifname disablecoext 1
					iwpriv $ifname extbusythres 100
				fi
				shift 2
				;;
			*)
				shift
				;;
			esac
		done
}

smart_connect()
{
	eval lbd_enable=`/bin/config get lbd_enable`
	if [ "$lbd_enable" = "1" ]; then
		nvram set bsd_block_sta_timeout='30'
		nvram set bsd_bounce_detect='120 4 3600'
		nvram set bsd_enable='1'
		nvram set bsd_role='3'
		nvram set bsd_scheme='2'

		# disable steering log
		#nvram set steering_msglevel='0x1'
		#nvram set bsd_msglevel='0x2013'
		nvram set steering_msglevel='0'
		nvram set bsd_msglevel='0'

		if [ "$is_dual_band" = "1" ]; then
			nvram set steer_flags='0x44'
			nvram set bsd_ifnames="wl0 wl1"
			nvram set wl0_bsd_if_qualify_policy='0 0 0'
			nvram set wl0_bsd_if_select_policy='wl1'
			nvram set wl0_bsd_sta_select_policy='0 -60 0 0 1 1 0 0 0 0x602'
			nvram set wl0_bsd_steering_policy='0 5 3 -60 0 0x2'

			nvram set wl1_bsd_if_qualify_policy='0 0 -75'
			nvram set wl1_bsd_if_select_policy='wl0'
			nvram set wl1_bsd_sta_select_policy='0 -85 0 0 1 1 0 0 0 0x200'
			nvram set wl1_bsd_steering_policy='0 5 3 -85 0 0x0'
		else
			nvram set steer_flags='0x44'
			nvram set bsd_ifnames="wl0 wl1 wl2"
			nvram set wl1_bsd_if_qualify_policy='0 0 0'
			nvram set wl1_bsd_if_select_policy='wl0 wl2'
			nvram set wl1_bsd_sta_select_policy='0 -60 0 0 1 1 0 0 0 0x602'
			nvram set wl1_bsd_steering_policy='0 5 3 -60 0 0x2'

			nvram set wl0_bsd_if_qualify_policy='60 0 -75'
			nvram set wl0_bsd_if_select_policy='wl1'
			# change 5G to 2G rssi threshold from -85 to -78 because many clients will drop when rssi is -85
			nvram set wl0_bsd_sta_select_policy='0 -85 0 0 1 1 0 0 0 0x200'
			nvram set wl0_bsd_steering_policy='80 5 3 -85 0 0x0'

			nvram set wl2_bsd_if_qualify_policy='0 0 -75'
			nvram set wl2_bsd_if_select_policy='wl1'
			nvram set wl2_bsd_sta_select_policy='0 -85 0 0 1 1 0 0 0 0x200'
			nvram set wl2_bsd_steering_policy='0 5 3 -85 0 0x0'
		fi

		nvram commit

		killall -q -9 bsd 2>/dev/null
		bsd&
	else
		# should set bsd_role=0, or bsd will be enabled by debug_monitor 
		nvram set bsd_enable='0'
		nvram set bsd_role='0'
		nvram commit
		killall -q -9 bsd 2>/dev/null
	fi
}

wifi_radio()
{
	if [ "$3" = "--channel" ]; then
		wifiradio_qcawifi ${hapd_name_5GL} --channel > /tmp/wla_channel
		wifiradio_qcawifi ${hapd_name_5GH} --channel > /tmp/wla_2nd_channel
		wifiradio_qcawifi ${hapd_name_2G} --channel > /tmp/wlg_channel

		# For 2G mode is 54M, 802.11g only support HT20
		if [ "$2" = "11g" ]; then
			g_mode=`/bin/config get wl_htmode`
			if [ "x$g_mode" = "x" ]; then
				g_channel=`wl -i ${mainifname_2G} chanspec | awk '{print $1}'`
				eval echo "$g_channel" > /tmp/wlg_channel
			fi
		fi

		local channel_11a=$(cat /tmp/wla_channel 2>/dev/null)
		local channel_11a_2nd=$(cat /tmp/wla_2nd_channel 2>/dev/null)
		local channel_11g=$(cat /tmp/wlg_channel 2>/dev/null)
		[ "$2" == "11a_2nd" ] && echo $channel_11a_2nd
		[ "$2" == "11a" ] && echo $channel_11a
		[ "$2" == "11g" ] && echo $channel_11g
	fi
	if [ "$3" = "--status" -o "$4" = "--status" ]; then
		if [ "$(config get ssid_number_per_radio)" = "0x7" ]; then
			if [ "$2" = "wireless1" ]; then
				if [ "$3" = "2g" ]; then
					wifiradio_qcawifi "${mainifname_2G}" --status
				elif [ "$3" = "5g" ]; then
					wifiradio_qcawifi "${mainifname_5GL}" --status
				else
					wifiradio_qcawifi "${wireless1_ifname}" --status
				fi
			fi
			if [ "$2" = "wireless2" ]; then
				if [ "$3" = "2g" ]; then
					wifiradio_qcawifi "${mainifname_2G}.1" --status
				elif [ "$3" = "5g" ]; then
					wifiradio_qcawifi "${mainifname_5GL}.1" --status
				else
					wifiradio_qcawifi "${wireless2_ifname}" --status
				fi
			fi
			if [ "$2" = "wireless3" ]; then
				if [ "$3" = "2g" ]; then
					wifiradio_qcawifi "${mainifname_2G}.2" --status
				elif [ "$3" = "5g" ]; then
					wifiradio_qcawifi "${mainifname_5GL}.2" --status
				else
					wifiradio_qcawifi "${wireless3_ifname}" --status
				fi
			fi
		else
			if [ "$2" = "11g" ]; then
				wifiradio_qcawifi ${mainifname_2G} --status
			fi
			if [ "$2" = "11a" ]; then
				wifiradio_qcawifi ${mainifname_5GL} --status
			fi
			if [ "$2" = "11a_2nd" ]; then
				wifiradio_qcawifi ${mainifname_5GH} --status
			fi
		fi

	fi
	if [ "$3" = "--coext" ]; then
		if [ "$2" = "11g" ]; then
			[ "$4" = "on" ] && eval wl -i ${mainifname_2G} obss_coex 1 || eval wl -i ${mainifname_2G} obss_coex 0
		fi
		if [ "$2" = "11a" ]; then
			[ "$4" = "on" ] && eval wl -i ${mainifname_5GL} obss_coex 1 || eval wl -i ${mainifname_5GL} obss_coex 0
		fi
		if [ "$2" = "11a_2nd" ]; then
			[ "$4" = "on" ] && eval wl -i ${mainifname_5GH} obss_coex 1 || eval wl -i ${mainifname_5GH} obss_coex 0
		fi
	fi
}

wifi_statistic()
{
	for ifname in ${main_ifname_list}; do
		ifup=$(wl -i ${ifname} status 2>/dev/null | grep BSSID | awk '{print $2}')
		if [ -n "$ifup" -a "$ifup" != "00:00:00:00:00:00" ]; then
			tx_tmp="`wl -i $ifname counters | grep txframe`"
			rx_tmp="`wl -i $ifname counters | grep rxframe`"
			tx_packets="`echo $tx_tmp | awk -F ' ' '{print $2}'`"
			rx_packets="`echo $rx_tmp | awk -F ' ' '{print $2}'`"
			tx_bytes="`echo $tx_tmp | awk -F ' ' '{print $4}'`"
			rx_bytes="`echo $rx_tmp | awk -F ' ' '{print $4}'`"
			collisions=0

			if [ "$is_dual_band" = "0" ]; then
				[ "$ifname" == "wl1" ] && echo "###2.4G###"
				[ "$ifname" == "wl2" ] && echo "###5G###"
				[ "$ifname" == "wl0" ] && echo "###5G2###"
			else
				[ "$ifname" == "wl0" ] && echo "###2.4G###"
				[ "$ifname" == "wl1" ] && echo "###5G###"
			fi
			echo "TX packets:$tx_packets"
			echo "RX packets:$rx_packets"
			echo "collisons:$collisions"
			echo "TX bytes:$tx_bytes"
			echo "RX bytes:$rx_bytes"
			echo ""
		fi
	done
}

wlan_lock_prepare()
{
	[ ! -f /tmp/wlan_lock ] && echo 0 > /tmp/wlan_lock
	[ ! -f /tmp/wlan_need_restart ] && echo 0 > /tmp/wlan_need_restart
}

show_usage()
{
	echo "dniwlan.sh nonsupport this cmd ..."
}

radar_detected()
{
	wlx=$2
	if [ "$is_dual_band" != "1" ]; then
		case $wlx in
			wl0) radar_band="5GH" ;;
			wl1) radar_band="2G" ;;
			wl2) radar_band="5GL" ;;
		esac
	else
		case $wlx in
			wl0) radar_band="2G" ;;
			wl1) radar_band="5GL" ;;
			wl2) radar_band="5GL" ;;
		esac
    fi

	case $radar_band in
		5GL)
			endis_wla_radio="$(/bin/config get endis_wla_radio)"
			if [ "x$endis_wla_radio" == "x1" ];then
				channel_5g=$(wl -i ${mainifname_5GL} channel |grep current |awk '{print $4}')
				simple_mode=$(wl -i ${mainifname_5GL} status |grep Chanspec |awk '{print $5}')
				case $simple_mode in  
					160MHz) 
						echo "dniwlan.sh: radar_detected change 5GL to 160MHz"
						config set wla_simple_mode=10
						;;
					80MHz)  
						echo "dniwlan.sh: radar_detected change 5GL to 80MHz"
						config set wla_simple_mode=9
						;;
					40MHz)  
						echo "dniwlan.sh: radar_detected change 5GL to 40MHz"
						config set wla_simple_mode=8
						;;
					20MHz)  
						echo "dniwlan.sh: radar_detected change 5GL to 20MHz"
						config set wla_simple_mode=7
						;;
					*) 
						echo "dniwlan.sh: radar_detected wireless error, change 5GL to default 80MHz"
						config set wla_simple_mode=9
						;;
				esac    
			fi
			;;
		5GH)
			endis_wla_2nd_radio="$(/bin/config get endis_wla_2nd_radio)"
			if [ "x$endis_wla_2nd_radio" == "x1" ];then
				channel_5g2=$(wl -i ${mainifname_5GH} channel |grep current |awk '{print $4}')
				simple_mode=$(wl -i ${mainifname_5GH} status |grep Chanspec |awk '{print $5}')
				case $simple_mode in  
					160MHz) 
						echo "dniwlan.sh: radar_detected change 5GH to 160MHz"
						config set wla_2nd_simple_mode=10
						;;
					80MHz)  
						echo "dniwlan.sh: radar_detected change 5GH to 80MHz"
						config set wla_2nd_simple_mode=9
						;;
					40MHz)  
						echo "dniwlan.sh: radar_detected change 5GH to 40MHz"
						config set wla_2nd_simple_mode=8
						;;
					20MHz)  
						echo "dniwlan.sh: radar_detected change 5GH to 20MHz"
						config set wla_2nd_simple_mode=7
						;;
					*) 
						echo "dniwlan.sh: radar_detected wireless error, change 5GH to default 80MHz"
						config set wla_2nd_simple_mode=9
						;;
				esac    
			fi
			;;
	esac
}

ap_region_installation()
{
	region="$(/sbin/artmtd -r region | grep REGION | awk '{print $2}')"
	if [ "$region" = "AP" ]; then
		/bin/config set endis_wla_2nd_radio="1" 
		/bin/nvram set acs_2g_ch_no_restrict=1
		if [ "$(config get radio_number)" = "0x7" ]; then
			/bin/nvram set wl1_acs_excl_chans=""
		else
			/bin/nvram set wl0_acs_excl_chans=""
		fi
		/bin/nvram commit
		/bin/config commit
	fi
}

case "$1" in
	radar_detected) radar_detected "$@";;
	smart_connect) smart_connect;;
	guest_network) guest_network;;
	dniadjust) dniadjust;;
	wlan_lock_prepare) wlan_lock_prepare;;
	stainfo) wifi_stainfo "$@";;
	radio) wifi_radio "$@";;
	statistic) wifi_statistic "$@";;
	ap_region_installation) ap_region_installation "$@";;
	*) show_usage ;;
esac

