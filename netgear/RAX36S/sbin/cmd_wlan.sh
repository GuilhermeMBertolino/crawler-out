#!/bin/sh
#=============================================================
#   Copyright (C) 2020 Delta DNI All rights reserved.
#   
#   FileName: cmd_wlan.sh
#   Created Time: Wed 27 May 2020 08:49:54 AM GMT
#   Description: Will be called by dni_safe_system function in dniwlan c code. 
#
#=============================================================

. /etc/wlan/wifi_conf

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

cmd_radio_act()
{
	cmd=$1
	shift
	act=$1
	shift
	for wlx in $@ ;do
		if [ "$cmd" = "brctl" ];then
			eval $cmd $act br0 $wlx
		elif [ "$cmd" = "ifconfig" ];then
			eval $cmd $wlx $act
		elif [ "$cmd" = "wl" ];then
			eval $cmd -i $wlx $act
		fi
	done
}

test()
{
	echo "$@" > /dev/console
}

restart_hostapd()
{
	vap=$2

	pid=$(ps -w |grep hostapd | grep ${vap})
	kill -9 $pid
	rm -f /tmp/${vap}_hapd.conf
	echo kill ${vap} $pid > /dev/console
}

update_wlan_uptime_status()
{
	action=$2
	wlx=$3
	if [ "x$action" = "xon" ];then
		if [ "$wlx" = "wlg" ];then
			cat /proc/uptime | sed 's/ .*//' > /tmp/WLAN_uptime
			echo "ON" > /tmp/WLAN_2G_status
		elif [ "$wlx" = "wla" ];then
			cat /proc/uptime | sed 's/ .*//' > /tmp/WLAN_uptime_5G
			echo "ON" > /tmp/WLAN_5G_status
		elif [ "$wlx" = "wlh" ];then
			cat /proc/uptime | sed 's/ .*//' > /tmp/WLAN_uptime_5G_2nd
			echo "ON" > /tmp/WLAN_5G_2nd_status
		fi
	elif [ "x$action" = "xoff" ];then
		rm -rf /tmp/WLAN_uptime
		rm -rf /tmp/WLAN_uptime_5G
		rm -rf /tmp/WLAN_uptime_5G_2nd
		echo "OFF" > /tmp/WLAN_2G_status
		echo "OFF" > /tmp/WLAN_5G_status
		echo "OFF" > /tmp/WLAN_5G_2nd_status
	fi
}

start_rpcapd()
{
	rpcapd -d -n &
}

startAirIQ()
{
	type=$2
	wlx=$3
	if [ "x${type}" = "xservice" ];then
		airiq_service -c /usr/sbin/airiq_service.cfg -pfs /usr/sbin/flash_policy.xml &
	elif [ "x${type}" = "xapp" ];then
		airiq_app -i ${wlx} >/dev/null &
	fi
}

check_radio()
{
	action=$2
	wlx=$3
	local up_ifname_list=""
	if [ "x${wlx}" = "xwlh" ];then
		if [ "x${action}" = "xoff" ];then
			eval kill `ps |grep hostapd |grep ${mainifname_5GH} |awk -F ' ' '{print $1}'`
			eval ifconfig ${mainifname_5GH} down
			eval wl -i ${mainifname_5GH} down
			rm -rf /tmp/WLAN_uptime_5G_2nd
			echo "OFF" > /tmp/WLAN_5G_2nd_status
		elif [ "x${action}" = "xon" ];then
			eval ifconfig ${mainifname_5GH} up
			eval wl -i ${mainifname_5GH} up
			eval hostapd -B /tmp/${mainifname_5GH}_hapd.conf
			killall wps_pbcd 
			wps_pbcd 
			sleep 1
			eval brctl addif br0 ${mainifname_5GH}.1 2>/dev/null
			eval brctl addif br0 ${mainifname_5GH} 2>/dev/null
			eval wl -i ${mainifname_5GH} up
			cat /proc/uptime | sed 's/ .*//' > /tmp/WLAN_uptime_5G_2nd
			echo "ON" > /tmp/WLAN_5G_2nd_status
		fi
	elif [ "x${wlx}" = "xwla" ];then
		[ "$(nvram get ${mainifname_5GL}_bss_enabled)" = "1" ] && up_ifname_list="$(echo $up_ifname_list) ${mainifname_5GL}"
		[ "$(nvram get ${mainifname_5GL}.1_bss_enabled)" = "1" ] && up_ifname_list="$(echo $up_ifname_list) ${mainifname_5GL}.1"
		[ "$(nvram get ${mainifname_5GL}.2_bss_enabled)" = "1" ] && up_ifname_list="$(echo $up_ifname_list) ${mainifname_5GL}.2"
		if [ "x${action}" = "xoff" ];then
			eval kill `ps |grep hostapd |grep ${mainifname_5GL} |awk -F ' ' '{print $1}'`
			cmd_radio_act "ifconfig" "down" "${up_ifname_list}"
			cmd_radio_act "wl" "down" "${up_ifname_list}"
			rm -rf /tmp/WLAN_uptime_5G
			echo "OFF" > /tmp/WLAN_5G_status
		elif [ "x${action}" = "xon" ];then
			cmd_radio_act "ifconfig" "up" "${up_ifname_list}"
			cmd_radio_act "wl" "up" "${up_ifname_list}"
			eval hostapd -B /tmp/${hapd_name_5GL}_hapd.conf
			killall wps_pbcd 
			wps_pbcd 
			sleep 1
			cmd_radio_act "brctl" "addif" "${guest5G_ifname_list}"
			cmd_radio_act "wl" "up" "${up_ifname_list}"
			cat /proc/uptime | sed 's/ .*//' > /tmp/WLAN_uptime_5G
			echo "ON" > /tmp/WLAN_5G_status
		fi
	elif [ "x${wlx}" = "xwlg" ];then
		[ "$(nvram get ${mainifname_2G}_bss_enabled)" = "1" ] && up_ifname_list="$(echo $up_ifname_list) ${mainifname_2G}"
		[ "$(nvram get ${mainifname_2G}.1_bss_enabled)" = "1" ] && up_ifname_list="$(echo $up_ifname_list) ${mainifname_2G}.1"
		[ "$(nvram get ${mainifname_2G}.2_bss_enabled)" = "1" ] && up_ifname_list="$(echo $up_ifname_list) ${mainifname_2G}.2"
		if [ "x${action}" = "xoff" ];then
			eval kill `ps |grep hostapd |grep ${mainifname_2G} |awk -F ' ' '{print $1}'`
			cmd_radio_act "ifconfig" "down" "${up_ifname_list}"
			cmd_radio_act "wl" "down" "${up_ifname_list}"
			rm -rf /tmp/WLAN_uptime
			echo "OFF" > /tmp/WLAN_2G_status
		elif [ "x${action}" = "xon" ];then
			cmd_radio_act "ifconfig" "up" "${up_ifname_list}"
			cmd_radio_act "wl" "up" "${up_ifname_list}"
			eval hostapd -B /tmp/${hapd_name_2G}_hapd.conf
			killall wps_pbcd 
			wps_pbcd 
			sleep 1
			cmd_radio_act "brctl" "addif" "${guest2G_ifname_list}"
			cmd_radio_act "wl" "up" "${up_ifname_list}"
			cat /proc/uptime | sed 's/ .*//' > /tmp/WLAN_uptime
			echo "ON" > /tmp/WLAN_2G_status
		fi
	fi
}

start_appeventd()
{
	appeventd &
}

start_hspotap()
{
	hspotap &
}

eapd_up()
{
	eapd_run=$(ps |grep "eapd$" | grep -v grep)
	if [ -z "$eapd_run" ];then
		/bin/eapd
	fi
}

wlan_schedule()
{
	action=$2
	wlx=$3
	onoff=$4
	log=$5
	local up_ifname_list=""

	if [ "x${action}" = "xcp_hapdconf" ];then
		[ "x$(/bin/config get wla1_2nd_endis_guestNet)" = "x1"  ] && cp /tmp/wlbak/wl0_hapd.conf /tmp/wl0_hapd.conf || sed '/## BSS/,$d' tmp/wlbak/wl0_hapd.conf >/tmp/wl0_hapd.conf
		[ "x$(/bin/config get wla1_endis_guestNet)" = "x1"  ] && cp /tmp/wlbak/wl2_hapd.conf /tmp/wl2_hapd.conf || sed '/## BSS/,$d' tmp/wlbak/wl2_hapd.conf >/tmp/wl2_hapd.conf
		[ "x$(/bin/config get wlg1_endis_guestNet)" = "x1"  ] && cp /tmp/wlbak/wl1_hapd.conf /tmp/wl1_hapd.conf || sed '/## BSS/,$d' tmp/wlbak/wl1_hapd.conf >/tmp/wl1_hapd.conf
	elif [ "x${action}" = "xsched_act" ];then
		if [ "x${wlx}" = "x11h" ];then
			if [ "x${onoff}" = "xon" ];then
				eval ifconfig ${mainifname_5GH} up
				echo "up ${mainifname_5GH} interface."
				eval wl -i ${mainifname_5GH} up
				eval hostapd -B /tmp/${hapd_name_5GH}_hapd.conf
				killall wps_pbcd 
				wps_pbcd 
				sleep 1
				eval brctl addif br0 ${mainifname_5GH}.1
				eval brctl addif br0 ${mainifname_5GH}
				[ "$log" != "nolog" ] && logger "[Wireless signal schedule] The wireless 5GHz (Second Radio) signal is ON,"
				echo "schedule on 11h interface."
				eval wl -i ${mainifname_5GH} up
				cat /proc/uptime | sed 's/ .*//' > /tmp/WLAN_uptime_5G_2nd
				/sbin/ledcontrol -n wlan5g_2nd -c green -s on
				echo "ON" > /tmp/WLAN_5G_2nd_status
			else
				eval kill `ps |grep hostapd |grep ${mainifname_5GH} |awk -F ' ' '{print $1}'`
				eval ifconfig $mainifname_5GH down
				eval wl -i $mainifname_5GH down
				[ "$log" != "nolog" ] && logger "[Wireless signal schedule] The wireless 5GHz (Second Radio) signal is OFF,"
				echo "schedule off 11h interface."
				rm -rf /tmp/WLAN_uptime_5G_2nd
				/sbin/ledcontrol -n wlan5g_2nd -c green -s off
				echo \"OFF\" > /tmp/WLAN_5G_2nd_status
			fi
		elif [ "x${wlx}" = "x11a" ];then
			[ "$(nvram get ${mainifname_5GL}_bss_enabled)" = "1" ] && up_ifname_list="$(echo $up_ifname_list) ${mainifname_5GL}"
			[ "$(nvram get ${mainifname_5GL}.1_bss_enabled)" = "1" ] && up_ifname_list="$(echo $up_ifname_list) ${mainifname_5GL}.1"
			[ "$(nvram get ${mainifname_5GL}.2_bss_enabled)" = "1" ] && up_ifname_list="$(echo $up_ifname_list) ${mainifname_5GL}.2"
			if [ "x${onoff}" = "xon" ];then
				cmd_radio_act "ifconfig" "up" "${up_ifname_list}"
				echo "up ${up_ifname_list} interface."
				cmd_radio_act "wl" "up" "${up_ifname_list}"
				eval hostapd -B /tmp/${hapd_name_5GL}_hapd.conf
				killall wps_pbcd 
				wps_pbcd 
				sleep 1
				cmd_radio_act "brctl" "addif" "${guest5G_ifname_list}"
				[ "$log" != "nolog" ] && logger "[Wireless signal schedule] The wireless 5GHz signal is ON,"
				echo "schedule on 11a interface."
				cmd_radio_act "wl" "up" "${up_ifname_list}"
				cat /proc/uptime | sed 's/ .*//' > /tmp/WLAN_uptime_5G
				/sbin/ledcontrol -n wlan5g -c green -s on
				echo "ON" > /tmp/WLAN_5G_status
			else
				eval kill `ps |grep hostapd |grep ${mainifname_5GL} |awk -F ' ' '{print $1}'`
				cmd_radio_act "ifconfig" "down" "${up_ifname_list}"
				cmd_radio_act "wl" "down" "${up_ifname_list}"
				[ "$log" != "nolog" ] && logger "[Wireless signal schedule] The wireless 5GHz signal is OFF,"
				echo "schedule off 11a interface."
				rm -rf /tmp/WLAN_uptime_5G
				/sbin/ledcontrol -n wlan5g -c green -s off
				echo \"OFF\" > /tmp/WLAN_5G_status
			fi
		elif [ "x${wlx}" = "x11g" ];then
			[ "$(nvram get ${mainifname_2G}_bss_enabled)" = "1" ] && up_ifname_list="$(echo $up_ifname_list) ${mainifname_2G}"
			[ "$(nvram get ${mainifname_2G}.1_bss_enabled)" = "1" ] && up_ifname_list="$(echo $up_ifname_list) ${mainifname_2G}.1"
			[ "$(nvram get ${mainifname_2G}.2_bss_enabled)" = "1" ] && up_ifname_list="$(echo $up_ifname_list) ${mainifname_2G}.2"
			if [ "x${onoff}" = "xon" ];then
				cmd_radio_act "ifconfig" "up" "${up_ifname_list}"
				echo "up ${up_ifname_list} interface."
				cmd_radio_act "wl" "up" "${up_ifname_list}"
				eval hostapd -B /tmp/${hapd_name_2G}_hapd.conf
				killall wps_pbcd 
				wps_pbcd 
				sleep 1
				cmd_radio_act "brctl" "addif" "${guest2G_ifname_list}"
				[ "$log" != "nolog" ] && logger "[Wireless signal schedule] The wireless 2.4GHz signal is ON,"
				echo "schedule on 11g interface."
				cmd_radio_act "wl" "up" "${up_ifname_list}"
				cat /proc/uptime | sed 's/ .*//' > /tmp/WLAN_uptime
				/sbin/ledcontrol -n wlan2g -c green -s on
				echo "ON" > /tmp/WLAN_2G_status
			else
				eval kill `ps |grep hostapd |grep ${mainifname_2G} |awk -F ' ' '{print $1}'`
				cmd_radio_act "ifconfig" "down" "${up_ifname_list}"
				cmd_radio_act "wl" "down" "${up_ifname_list}"
				[ "$log" != "nolog" ] && logger "[Wireless signal schedule] The wireless 2.4GHz signal is OFF,"
				echo "schedule off 11g interface."
				rm -rf /tmp/WLAN_uptime
				/sbin/ledcontrol -n wlan2g -c green -s off
				echo \"OFF\" > /tmp/WLAN_2G_status
			fi
		fi
	fi
}

guest_sched()
{
	wlx=$2
	onoff=$3
	if [ "x${wlx}" = "x11h" ];then
		if [ "x${onoff}" = "xoff" ];then
			wl -i ${guestifname_5GH} bss down
		fi
	elif [ "x${wlx}" = "x11a" ];then
		if [ "x${onoff}" = "xoff" ];then
			wl -i ${guestifname_5GL} bss down
		fi
	elif [ "x${wlx}" = "x11g" ];then
		if [ "x${onoff}" = "xoff" ];then
			wl -i ${guestifname_2G} bss down
		fi
	fi
}

wps_update_led()
{
	shift
	[ "x$(ps -www | grep "OVERLAP" | grep -v grep)" = "x"   ] && /sbin/wps-update-led.sh "$@" &
}

wps_update_otherband()
{
	shift
	/sbin/wps-update-otherband-config.sh "$@" &
}

set_txpower()
{
	echo "=====Remove TPC function as NETGEAR request." >/dev/console
	#/sbin/set_txpower &
}

wps_monitor_cmd()
{
	wps_monitor &
}

start_SSD()
{
	/usr/sbin/ssd &
}

cmd_brctl()
{
	action=$2
	brname=$3
	ifname=$4
	eval brctl $action $brname $ifname 2>/dev/null
}

cmd_killall()
{
	shift
	eval killall $@ 2>/dev/null
}

cmd_ifconfig()
{
	shift
	eval ifconfig $@ 2>/dev/null
}

stop_debug_monitor()
{
	rm -rf /tmp/dm/*
}

dfs_ism_monitor()
{
	factory_mode=`/bin/config get factory_mode`
	if [ "x$factory_mode" = "x1" -a "x$is_dual_band" = "x0" ]; then
		wl -i $mainifname_5GH dfs_ism_monitor 1 2>/dev/null ;
	fi
}

case "$1" in
	test) test "$@";;
	restart_hostapd) restart_hostapd "$@";;
	update_wlan_uptime_status) update_wlan_uptime_status "$@";;
	start_rpcapd) start_rpcapd;;
	hspotap) start_hspotap;;
	eapd_up) eapd_up;;
	set_txpower) set_txpower;;
	wps_monitor) wps_monitor_cmd;;
	cmd_brctl) cmd_brctl "$@";;
	cmd_killall) cmd_killall "$@";;
	cmd_ifconfig) cmd_ifconfig "$@";;
	start_SSD) start_SSD;;
	start_appeventd) start_appeventd;;
	startAirIQ) startAirIQ "$@";;
	check_radio) check_radio "$@";;
	wlan_schedule) wlan_schedule "$@";;
	guest_sched) guest_sched "$@";;
	wps_update_led) wps_update_led "$@";;
	wps_update_otherband) wps_update_otherband "$@";;
	stop_debug_monitor) stop_debug_monitor;;
	dfs_ism_monitor) dfs_ism_monitor;;
	*) show_usage ;;
esac


