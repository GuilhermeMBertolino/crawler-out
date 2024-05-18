#!/bin/sh
#
# Copyright (c) 2019 TP-LINK Technologies Co., Ltd.
# All Rights Reserved.

export DEBUG=1

[ $DEBUG -eq 1 ] && STDOUT=/dev/console || STDOUT=/dev/null
STDERR=/dev/console

wifi_dbg()
{
	echo $* > $STDOUT
}

wifi_err()
{
	echo $* > $STDERR
}

str_match()
{
	echo "$1" | grep "$2" -q
}

iwpriv()
{
	wifi_dbg "iwpriv $@"
	/usr/sbin/iwpriv $@
}

brctl()
{
	wifi_dbg "brctl $@"
	/usr/sbin/brctl $@
}

ifconfig()
{
	wifi_dbg "ifconfig $@"
	/sbin/ifconfig $@
}

cmd()
{
	wifi_dbg "cmd $@"
	/usr/sbin/cmd $@
}

ax_support_check()
{
	local device=$1

	if iwinfo $device info | grep "HW Mode(s)" | grep "ax" -q; then
		echo 1
	else
		echo 0
	fi
}

get_vif_by_type()
{
	local device=$1 vif_type=$2

	config_get vifs $device vifs
	for vif in $vifs; do
		config_get type $vif $vif_type
		if [ "$type" = "on" ]; then
			echo "$vif"
			return
		fi
	done
	echo ""
}

config_load_append()
{
	CONFIG_APPEND=1
	config_load $1
	unset CONFIG_APPEND
}

#
#include file
#
. /lib/wifi/rtk_wlan_var.sh
. /lib/wifi/rtk_wlan_extend.sh

reinit_file="/var/reinit"

##
## Called by /sbin/wifi
##
init_all_vif_name()
{
	local temp_band=""

	for dev in ${DEVICES}; do
		config_get band "${dev}" band
		config_get vifs "${dev}" vifs
		for vif in $vifs; do
			config_get mode $vif mode
			config_get is_root $vif is_root
			config_get guest $vif guest
			config_get backhaul $vif backhaul
			config_get onemesh_config $vif onemesh_config
			config_get ifname $vif ifname

			if [ "$mode" = "ap" -a "$is_root" != "" ]; then
				VIF_HOME=${vif}
				NAME_HOME=${ifname}
			elif [ "$mode" = "ap" -a "$guest" != "" ]; then
				VIF_GUEST=${vif}
				NAME_GUEST=${ifname}
			elif [ "$mode" = "ap" -a "$backhaul" != "" ]; then
				VIF_BACKHAUL=${vif}
				NAME_BACKHAUL=${ifname}
			elif [ "$mode" = "ap" -a "$onemesh_config" != "" ]; then
				VIF_RTORCFG=${vif}
				NAME_RTORCFG=${ifname}
			elif [ "$mode" = "sta" ]; then
				VIF_WDS=${vif}
				NAME_WDS=${ifname}
			else
				wifi_dbg "=====>>>>> $dev: vif $vif skipped"
			fi
		done
		case "$band" in
			2g)
				temp_band="2G"
			;;
			5g)
				temp_band="5G"
			;;
		esac
		
		eval VIF_HOME_${temp_band}=${VIF_HOME}
		eval VIF_GUEST_${temp_band}=${VIF_GUEST}
		eval VIF_BACKHAUL_${temp_band}=${VIF_BACKHAUL}
		eval VIF_RTORCFG_${temp_band}=${VIF_RTORCFG}
		eval VIF_WDS_${temp_band}=${VIF_WDS}
		
		eval NAME_HOME_${temp_band}=${NAME_HOME}
		eval NAME_GUEST_${temp_band}=${NAME_GUEST}
		eval NAME_BACKHAUL_${temp_band}=${NAME_BACKHAUL}
		eval NAME_RTORCFG_${temp_band}=${NAME_RTORCFG}
		eval NAME_WDS_${temp_band}=${NAME_WDS}

		eval DEVICE_${temp_band}=${dev}
	done

	# 加载meshd配置
	config_load_append "meshd"
	# 加载sysmod配置
	config_load_append "sysmode"
}

# $1: band，值域见wifi配置中的band
# $2: vif类型，值域：HOME、GUEST、BACKHAUL、RTORCFG、WDS
get_vif()
{
	local band=$(echo $1 | tr '[a-z]' '[A-Z]')
	eval echo '$'VIF_${2}_${band}
}

# $1: band，值域见wifi配置中的band
# $2: vif类型，值域：HOME、GUEST、BACKHAUL、RTORCFG、WDS
get_vif_name()
{
	local band=$(echo $1 | tr '[a-z]' '[A-Z]')
	eval echo '$'NAME_${2}_${band}
}

# $1: ifname
get_vif_by_ifname()
{
	for dev in ${DEVICES}; do
		config_get vifs $dev vifs
		for vif in ${vifs}; do
			config_get ifname $vif ifname
			[ "$ifname" != "$1" ] && continue
			echo "$vif"
			return
		done
	done
	echo ""
}

get_vif_enable()
{
	local vif=$1
	local device enable wifi_disabled soft_disabled mode

	config_get_bool enable $vif enable 0
	[ $enable -eq 0 ] && {
		echo "0"
		return
	}

	config_get mode $vif mode
	if [ "$mode" = "ap" ]; then
		local is_root is_guest
		config_get_bool is_root $vif is_root 0
		config_get_bool is_guest $vif guest 0
		if [ $is_root -eq 1 -o  $is_guest -eq 1 ]; then
			config_get device $vif device
			config_get_bool wifi_disabled $device disabled 0      # hardware switch
			config_get_bool soft_disabled $device disabled_all 0  # software switch
			if [ $wifi_disabled -eq 1 -o $soft_disabled -eq 1 ]; then
				echo "0"
				return
			fi
		fi
	fi

	echo "1"
}

is_vif_root()
{
	local is_root

	config_get_bool is_root "$1" is_root 0
	if [ $is_root -eq 1 ]; then
		echo "1"
	else
		echo "0"
	fi
}

start_wifi_priv_cfg()
{
	local vif=$1
	local ifname device channel ofdma_enable twt_enable airtime_fairness deny_legacy band hwmode htmode txpower
	local powerpercent
	local mesh_enable easymesh_enable is_backhaul is_root is_config a4_enable

	config_get ifname "$vif" ifname
	config_get device "$vif" device
	config_get channel "$device" channel
	config_get_bool airtime_fairness "$device" airtime_fairness 0
	config_get band $device band
	config_get hwmode $device hwmode
	config_get htmode $device htmode
	config_get txpower $device txpower
	config_get_bool mesh_enable meshd enable 0
	config_get_bool easymesh_enable meshd enableeasymesh 0
	config_get_bool is_backhaul $vif backhaul 0
	config_get_bool is_root $vif is_root 0
	config_get_bool is_config $vif onemesh_config 0
	config_get_bool a4_enable $vif a4_enable 0

	case $txpower in
		low) powerpercent=25;;
		middle) powerpercent=50;;
		high|*) powerpercent=100;;
	esac

	if [ "$(is_vif_root $vif)" = "1" ]; then
		# 临时方案：主接口特殊处理，主接口关闭后，其他vap均无法正常使用，当主接口配置为关闭时，保持主接口开启，但关闭其发包
		if [ "$(get_vif_enable $vif)" = "0" ]; then
			iwpriv $ifname set_mib func_off=1
		else
			iwpriv $ifname set_mib func_off=0
		fi
	fi

	local ax_support=$(ax_support_check $device)
	if [ "$ax_support" = "1" ]; then
		# OFDMA
		config_get_bool ofdma_enable ofdma enable 0
		iwpriv $ifname set_mib ofdma_enable=0	# FIXME：参考MR60Xv2，先强制关闭OFDMA，以规避开启OFDMA引发的多个问题

		# TWT
		config_get_bool twt_enable twt enable 0
		iwpriv $ifname set_mib twt_enable=$twt_enable
	fi

	if [ "$band" = "5g" ]; then
		# 禁用其他模式
		case $hwmode in
			n_5) deny_legacy=4;;
			ac_5) deny_legacy=12;;
			ax_5) deny_legacy=76;;
			*) deny_legacy=0;;
		esac
		iwpriv $ifname set_mib deny_legacy=$deny_legacy

		# TX Power
		iwpriv $ifname set_mib powerpercent=$powerpercent

		# DFS
		if [ "$(get_dfs ENABLE)" = "1" ]; then
			iwpriv $ifname set_mib disable_dfs=0
			iwpriv $ifname set_mib dfs_regions=$(get_dfs REGION_PHL)
			iwpriv $ifname set_mib dfs_regions_core=$(get_dfs REGION_CORE)
		else
			iwpriv $ifname set_mib disable_dfs=1
		fi

		# ATF, 5G硬件默认打开ATF，且无开关控制接口
	elif [ "$band" = "2g" ]; then
		# 国家码配置
		iwpriv $ifname set_mib countrystr=$COUNTRY_CODE

		# 禁用其他模式
		case $hwmode in
			bgn) deny_legacy=0 ;;
			gn) deny_legacy=1 ;;
			n) deny_legacy=3 ;;
			*) deny_legacy=0;;
		esac
		iwpriv $ifname set_mib deny_legacy=$deny_legacy

		# 20/40 coexist
		if [ "$htmode" = "auto" ]; then
			iwpriv $ifname set_mib  hapd_ap_2040m_scan=1
		else
			iwpriv $ifname set_mib  hapd_ap_2040m_scan=0
		fi

		# TX Power
		power_adjust_2g $ifname pwrlevelCCK_A $powerpercent
		power_adjust_2g $ifname pwrlevelCCK_B $powerpercent
		power_adjust_2g $ifname pwrlevel_TSSICCK_A $powerpercent
		power_adjust_2g $ifname pwrlevel_TSSICCK_B $powerpercent
		power_adjust_2g $ifname pwrlevelHT40_1S_A $powerpercent
		power_adjust_2g $ifname pwrlevelHT40_1S_B $powerpercent
		power_adjust_2g $ifname pwrlevel_TSSIHT40_1S_A $powerpercent
		power_adjust_2g $ifname pwrlevel_TSSIHT40_1S_B $powerpercent

		# ATF
		if [ "$airtime_fairness" = "1" ]; then
			iwpriv $ifname set_mib qos_enhance_enable=2
		else
			iwpriv $ifname set_mib qos_enhance_enable=0
		fi

		# 2.4G (or guest) drop unknow multicast packet..
		iwpriv $ifname set_mib mc2u_drop_unknown=1
	fi

	if [ $mesh_enable -eq 1 ]; then
		wifi_dbg "is_backhaul:$is_backhaul or is_config:$is_config"
		iwpriv $ifname set_mib multiap_profile=2
		[ $is_backhaul -eq 1 -o  $is_config -eq 1 ] && {
			iwpriv $ifname set_mib a4_enable=$a4_enable
		}
		
		if [ $easymesh_enable -eq 1 ]; then
			[ $is_backhaul -eq 1 -o  $is_config -eq 1 ] && {
				#MULTI_AP_BACKHAUL_BSS
				iwpriv $ifname set_mib multiap_bss_type=64
			}

			[ $is_root -eq 1 ] && {
				#MULTI_AP_FRONTHAUL_BSS
				iwpriv $ifname set_mib multiap_bss_type=32
			}
		else
			iwpriv $ifname set_mib multiap_bss_type=0
		fi
	else
		iwpriv $ifname set_mib multiap_profile=0
		iwpriv $ifname set_mib multiap_bss_type=0
	fi
}

start_sta_priv_cfg()
{
	local vif=$1
	local ifname mesh_enable mesh_role a4_enable
	
	config_get ifname "$vif" ifname 
	config_get_bool mesh_enable meshd enable 0
	config_get mesh_role meshd role
	config_get_bool a4_enable $vif a4_enable 0

	if [ "$mesh_enable" = "0" ]; then
		iwpriv $ifname set_mib multiap_bss_type=0
	elif [ "$mesh_role" = "agent" ]; then
		wifi_dbg "enable $vif multiap and addr4"
		iwpriv $ifname set_mib multiap_bss_type=128
	fi

	iwpriv $ifname set_mib a4_enable=$a4_enable
}

start_vif()
{
	local vif=$1
	local mode ifname

	config_get mode "$vif" mode
	config_get ifname "$vif" ifname

	wifi_dbg "start_vif $vif"

	case $mode in
		ap)
			start_wifi_priv_cfg $vif

			hostapd_start_vif $vif || {
				wifi_err "Failed to start hostapd for $vif"
				return
			}
		;;
		sta)
			start_sta_priv_cfg $vif
			
			wpa_supplicant_start_vif $vif || {
				wifi_err "Failed to start wpa_supplicant for $vif"
				return
			}

		;;
	esac

	set_pwr_lmt_later $vif
}

stop_vif()
{
	local vif=$1
	local mode ifname

	config_get mode "$vif" mode
	config_get ifname "$vif" ifname

	wifi_dbg "stop_vif $vif"

	case $mode in
		ap)
			hostapd_stop_vif $vif || {
				wifi_err "Failed to stop hostapd for $vif"
			}
			brctl delif $NAME_BR $ifname
		;;
		sta)
			wpa_supplicant_stop_vif $vif || {
				wifi_err "Failed to stop wpa_supplicant for $vif"
			}
		;;
	esac

	# FIXME: 正常情况hostapd会自动将接口down掉，但目前2.4G有异常，guest接口没有彻底down掉，处于一个特殊状态，
	# 导致重新start会出错，先临时手动进行down操作
	ifconfig $ifname down
}

config_vif()
{
	local vif=$1
	local action=$2

	wifi_dbg "config_vif $vif"

	case $action in
		up)
			# 开关关闭禁止启动
			# 临时方案：主接口特殊处理，主接口关闭后，其他vap均无法正常使用，当主接口配置为关闭时，保持主接口开启，但关闭其发包
			if [ $(get_vif_enable $vif) = "1" ] || [ "$(is_vif_root $vif)" = "1" ]; then
				start_vif $vif
			fi
			;;
		down)
			stop_vif $vif
			;;
	esac
}

start_dev()
{
	local dev=$@ vifs

	wifi_dbg "start_dev $dev"

	config_get vifs $dev vifs
	for vif in $vifs; do
		config_vif $vif "up"
	done
}

stop_dev()
{
	local dev=$@ vifs

	wifi_dbg "stop_dev $dev"

	config_get vifs $dev vifs
	for vif in $vifs; do
		config_vif $vif "down"
	done
}

reload_dev() {
	local no_dev=1
	local devs=$@

	# 参数中只要携带了dev参数，就按照携带的dev来reload，反之reload所有dev
	if [ $# -gt 0 -a "$devs" != "$DEVICES" ]; then
		for dev in $devs; do
			wifi_dbg "dev $dev"
			if str_match "$DEVICES" "$dev"; then
				no_dev=0
				break
			fi
		done
	fi
	[ $no_dev -eq 1 ] && devs=$DEVICES

	wifi_dbg "reload_dev $devs"

	for dev in $devs; do
		str_match "$DEVICES" "$dev" || continue

		stop_dev $dev
		start_dev $dev
	done

	wifi_led_set
}

config_vif_vlan()
{
	local br=$1
	local vif=$2
	local phy_dev band guest access isolate vlankey brname ifname mode
	local fw_action="unblock"

	wifi_dbg "config_vif_vlan $vif"

	config_get phy_dev "$vif" device
	config_get band "$phy_dev" band
	config_get brname "$vif" bridge "$br"
	config_get ifname $vif ifname
	config_get mode $vif mode
	config_get_bool guest "$vif" guest 0
	config_get_bool access "$vif" access 1
	config_get_bool isolate "$vif" isolate 0
	config_get vlankey "$vif" vlanid
	vlanid=3

	[ "$br" != "$brname" ] && return

	# 前向接口需要与所有lan侧端口都要能通信，不需要隔离
	[ "$mode" = "sta" ] && vlanid=0

	[ "$guest" = "1" ] && {
		[ "$access" = "0" -a "$isolate" = "1" ] && {
			case "$band" in
				2g) vlanid=4 ;;
				5g) vlanid=8 ;;
			esac
		}
		[ "$access" = "0" -a "$isolate" = "0" ] && {
			case "$band" in
				2g) vlanid=4 ;;
				5g) vlanid=4 ;;
			esac
		}
		[ "$access" = "1" -a "$isolate" = "1" ] && {
			case "$band" in
				2g) vlanid=1 ;;
				5g) vlanid=2 ;;
			esac
		}
		[ "$access" = "1" -a "$isolate" = "0" ] && {
			case "$band" in
				2g) vlanid=1 ;;
				5g) vlanid=1 ;;
			esac
		}
		[ "$access" = "0" ] && fw_action="block"
	}
	[ "$vlankey" != "" ] && {
		if [ "$vlankey" == "1" ]; then
			vlanid=3
		else
			vlanid=$((1 << $vlankey ))
		fi
	}

	brctl setifvlan "$brname" "$ifname" "$vlanid" 1

	[ "$guest" = "1" ] && echo "$access" > /proc/bridge_filter/local_access_flag && fw "$fw_action"_rt_access dev "$ifname" &
}

config_eth_vlan()
{
	local brname=$1
	local ifname=$2
	local hvlan=3

	for port in $(brctl show "$brname" | grep eth | cut -f 6-8); do
		[ -n "$ifname" -a "$port" != "$ifname" ] && continue
		brctl setifvlan "$brname" "$port" "$hvlan" 1
	done
}

wifi_led_set()
{
	local led_state
	local vif band

	[ "$(/sbin/is_cal)" = "true" ] && {
		for dev in ${DEVICES}; do
			config_get band $dev band

			vif=$(get_vif $band HOME)
			if [ "$(get_vif_enable $vif)" = "1" ]; then
				led_state="ON"
			else
				led_state="OFF"
			fi

			# for wifi schedule
			if $(wireless_schedule_disable_wifi "$band") ; then
				led_state="OFF"
			fi

			wifi_dbg "wifi_led_set $band = $led_state"
			band=$(echo $band | tr '[a-z]' '[A-Z]')
			ledcli WIFI${band}_${led_state}
		done
	}
}

wifi_vlan()
{
	wifi_dbg "wifi_vlan $@"

	for brname in $(cd /sys/class/net && ls -d ${NAME_BR}* 2>$STDOUT); do
		break;
	done

	# 该分支由hotplug触发，配置特定无线设备的vlan，入参：<with_br> <br-name> <ifname>
	if [ $# -ge 3 -a "$1" = "with_br" ]; then
		# 跳过非internet的bridge
		[ "$brname" != $2 ] && return

		if [ "${3:0:3}" = "eth" ]; then
			config_eth_vlan $2 $3
		else
			local vif=$(get_vif_by_ifname $3)
			[ -n "$vif" ] && config_vif_vlan $2 $vif
		fi
	# 该分支由lua触发，配置特定vap的vlan
	elif [ $# -ge 1 ]; then
		for vif in $@; do
			config_vif_vlan $brname $vif
		done
	# 该分支配置所有eth和vap的vlan
	else
		config_eth_vlan $brname

		config_each_vif_vlan()
		{
			local vif=$1

			[ $(get_vif_enable $vif) = "0" ] && return

			config_vif_vlan $brname $vif
		}
		config_foreach config_each_vif_vlan wifi-iface
	fi
}

wifi_wps()
{
	local vif="$1"
	local action="$2"
	local mode

	config_get mode $vif mode
	wifi_dbg "wifi_wps $mode $@"

	if [ "$mode" = "sta" ];then
		# apcli wps
		case $action in
			pbc)
				wpa_supplicant_wps_pbc $vif
				echo "OK: true"
				;;
			status)
				wpa_supplicant_wps $vif wps_get_status
				;;
		esac
	else
		case $action in
			pin)
				hostapd_wps $vif wps_pin any $3 0
				echo "OK: true"
				;;
			pbc)
				hostapd_wps $vif wps_pbc
				echo "OK: true"
				;;
			cancel)
				hostapd_wps $vif wps_cancel
				echo "OK: true"
				;;
			wps_ap_pin) 
				[ "$3" = "set" ] && {
					hostapd_wps $vif wps_ap_pin set $4 0
				}
				[ "$3" = "disable" ] && {
					hostapd_wps $vif wps_ap_pin disable
				}
				;;
			status)
				hostapd_wps $vif wps_get_status
				;;
			pin_lock)
				hostapd_wps $vif wps_get_status
				;;
		esac
	fi

	echo "wps_shell_over"
}

wifi_wps_switch()
{
	local wps vifs=$@

	wifi_dbg "wifi_wps_switch $@"

	config_get_bool wps $vif wps 0
	if [ $wps -eq 0 ]; then
		for vif in $vifs
		do
			hostapd_wps $vif wps_cancel
			hostapd_wps $vif wps_ap_pin disable
		done
	fi

	wifi_reload $@
}

wifi_smart() {
	/etc/init.d/nrd restart
}

wifi_vap()
{
	local device

	wifi_dbg "wifi_vap $@"

	for vif in $1; do
		if [ "$(is_vif_root $vif)" = "1" ]; then
			config_get device $vif device
			wifi_reload $device
		else
			config_vif $vif "down"
			config_vif $vif "up"
		fi
	done

	wifi_led_set
}

wifi_radio()
{
	wifi_dbg "wifi_radio $@"

	reload_dev $@
}

wifi_init()
{
	wifi_dbg "wifi_init $@"

	if [ ! -f $reinit_file ]; then
		rtk_wlan_load
		rtk_wlan_set_mac
		rtk_set_hw_mib
		hostapd_global
		wpa_supplicant_global

		echo 1 > $reinit_file
	fi
}

wifi_reload()
{
	wifi_dbg "wifi_reload $@"

	# 目前ofdma和twt通过wifi_reload ofdma和wifi_reload twt生效，但对于有些机型并不是所有频段均支持wifi6，
	# 没有必要reload这些频段，后续再针对该问题进行优化
	reload_dev $@
	
	# 主接口重启需要重启nrd,暂时先将nrd重启加在这里，后面vap解耦需要调整
	[ -f /tmp/wireless_init_done ] && [ -f /etc/init.d/nrd ] && /etc/init.d/nrd restart
}

wifi_default()
{
	wifi_dbg "wifi_default $@"
}

wifi_country()
{
	wifi_dbg "wifi_country $@"

	reload_dev $@
}

wifi_mode()
{
	wifi_dbg "wifi_mode $@"

	reload_dev $@
}

wifi_macfilter()
{
	wifi_dbg "wifi_macfilter $@"

	macfilter_cb()
	{
		local vif=$1
		local action=$2

		[ $(get_vif_enable $vif) = "0" ] && return

#		排除config network 
		config_get onemesh_config $vif onemesh_config
		[ "onemesh_config" = "on" ] && return

		hostapd_acl_action $vif $action
	}

	config_foreach macfilter_cb wifi-iface $@
}

wifi_disconnect_stas()
{
	wifi_dbg "wifi_disconnect_stas $@"

	disconnect_stas()
	{
		local vif=$1 mode

		[ $(get_vif_enable $vif) = "0" ] && return

		config_get mode $vif mode
		[ "$mode" != "ap" ] && return

		hostapd_kick_all_sta $vif
	}

	config_foreach disconnect_stas wifi-iface
}

wifi_update_tpie()
{
	local lan_mac gp_id_rand mac sysmode mesh_enable band master_mac

	config_get_bool mesh_enable meshd enable 0
	config_get sysmode sysmode mode
	
	if [ "$mesh_enable" = "1" ]; then
		wifi_dbg "wifi_update_tpie"
		
		lan_mac=`cat /sys/class/net/br-lan/address`
		lan_mac=${lan_mac//:/}
		if [ "$sysmode" = "router" ];then
			mac=$lan_mac #LAN MAC as TPIE_MAC
		elif [ "$sysmode" = "repeater" ];then
			config_get master_mac onemesh macaddr #MASTER MAC as TPIE_MAC
			if [ -z $master_mac ]; then
				master_mac=$lan_mac
			fi
			mac=${master_mac//[-:]/}
			mac=`echo $mac | tr '[A-Z]' '[a-z]'`
		fi
		
		config_get gp_id_rand onemesh group_id
		[ "$gp_id_rand" = "-1" ] && gp_id_rand=""
		gp_id_rand=${gp_id_rand:0:4}
		gp_id_rand="${gp_id_rand:0:2}${gp_id_rand:2:2}"
		
		for dev in ${DEVICES}; do
			config_get band "${dev}" band
			hostapd_update_tpie $(get_vif $band HOME) 63 $mac $gp_id_rand
			hostapd_update_tpie $(get_vif $band BACKHAUL) 67 $mac $gp_id_rand
		done

	else
		wifi_dbg "mesh not enable, not wifi_update_tpie"
	fi
}

wifi_onemesh_search(){
	local operation=$1
	local sysmode=`uci get sysmode.sysmode.mode`
	local band vifname

	[ "$sysmode" != "router" ] && return

	for dev in ${DEVICES}; do
		config_get band "${dev}" band
		vifname=$(get_vif $band RTORCFG)

		if [ "$operation" = "start" ];then
			wifi_dbg "$vifname search start"
			config_set $vifname enable 1
			wifi_vap $vifname

		elif [ "$operation" = "stop" ];then
			wifi_dbg "$vifname search stop"

		elif [ "$operation" = "cancel" ];then
			wifi_dbg "$vifname search cancel"
			config_set $vifname enable 0
			wifi_vap $vifname
		fi
	done

	if [ "$operation" = "start" ];then
		config_vap_monitor start &
	elif [ "$operation" = "cancel" ];then
		config_vap_monitor cancel &
		ubus call map meshd '{"action":"clear_white"}'
		ubus call tdpServer onemesh_clean_devices '{}'
		ubus call tdpServer onemesh_probe '{}' &
	fi
}

config_vap_monitor() {
	local action=$1

	if [ "$action" = "start" ];then
		local timer=0

		local config_ifname_2g config_ifname_5g
		for dev in ${DEVICES}; do
			config_get band "${dev}" band
			if [ "$band" = "2g" ];then
				config_name_2g=$(get_vif $band RTORCFG)
			else
				config_name_5g=$(get_vif $band RTORCFG)
			fi
		done

		while [ $timer -lt 20 ]
		do
			bssid_2g=$(ifconfig $config_ifname_2g | grep HWaddr | awk '{print $NF}')
			bssid_5g=$(ifconfig $config_ifname_5g | grep HWaddr | awk '{print $NF}')

			if [ -z "$bssid_2g" -a -z "$bssid_5g" ];then
				break;
			fi

			sleep 15
			timer=$(($timer+1))
		done
		if [ $timer -ge 20 ];then
			wifi_onemesh_search cancel
		fi

	elif [ "$action" = "cancel" ];then
		pid=$(ps -w|grep "/sbin/wifi search start" |grep -v "grep" |awk '{print $1}')

		if [ -n "pid" ];then
			for p in ${pid}; do
				kill -9 $p
			done
		fi
	fi
}

wifi_onemesh() {
	/etc/init.d/sync-server stop

	local tdpServer_pid=`pgrep /usr/bin/tdpServer`
	if [ -n "$tdpServer_pid" ];then
		killall tdpServer
		### NOTE Delete all iptables rules and client files
		[ -f "/sbin/knock_functions.sh" ] && /sbin/knock_functions.sh remove_all
		rm -rf /tmp/dropbear/succ_cli/*
	fi

	wifi_reload

	/etc/init.d/sync-server start
	local tdpServer=$(pgrep tdpServer| wc -l)
	if [ $tdpServer -ge 1 ]; then
		return 1
	else
		"/bin/nice" -n -5 /usr/bin/tdpServer &>/dev/null &
	fi
}

