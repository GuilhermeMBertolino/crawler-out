#!/bin/sh

. /usr/share/libubox/jshn.sh
. /lib/wifi/wireless_schedule_func.sh
WIFI_SCHEDULE=0

WL=/usr/sbin/wl
NVRAM=/usr/sbin/nvram
WLCONF=/usr/sbin/wlconf
IFCONFIG=/sbin/ifconfig
BRCTL=/usr/sbin/brctl
FW=/sbin/fw
BRCM_COUNTRYCODE=/lib/wifi/brcm_countrycode.txt
BRCM_WLAN_CONFIG=/lib/wifi/brcm_wlan_config.txt

STDOUT=/dev/null
#DEBUG=1
[ -n "${DEBUG}" ] && STDOUT="/dev/console"
CONSOLE="/dev/console"

NO_EXPORT=1
MACFILTER_ENABLE="off"
MACFILTER_ACTION=""
MAC_LIST=""
COUNTRYCODE_EU=0
COUNTRYCODE_DE=0
COUNTRYCODE_Q2=79
COUNTRYCODE_US=0
COUNTRYCODE_CA=2
COUNTRYCODE_JP=0
COUNTRYCODE_KR=1
COUNTRYCODE_KR_UN=4
HOME_2G_VIF=""
HOME_5G_VIF=""
state="off"
SINGLECHAIN_TEST=0

nvram() {
	[ -n "${DEBUG}" ] && echo nvram "$@" >$STDOUT
	$NVRAM "$@"
}

wl() {
	[ -n "${DEBUG}" ] && echo wl "$@" >$STDOUT
	$WL "$@"
}

wlconf() {
	[ -n "${DEBUG}" ] && echo wlconf "$@" > $STDOUT
	$WLCONF "$@"
}

ifconfig() {
	[ -n "${DEBUG}" ] && echo ifconfig "$@" > $STDOUT
	$IFCONFIG "$@"
}

brctl() {
	[ -n "${DEBUG}" ] && echo brctl "$@" > $STDOUT
	$BRCTL "$@"
}

fw() {
	[ -n "${DEBUG}" ] && echo fw "$@" > $STDOUT
	$FW "$@"
}

get_brname() {
	json_init
	json_load "`ubus call network.interface.lan status`"
	json_get_var l3_device l3_device
	local loop_cnt=0

	# Added by jiangzheyu@tp-link.com.cn 2020/10/30
	# brname may return empty if l3_device not registered yet,
	# so wait here (10s at most).
	while [ -z $l3_device ] && [ $loop_cnt -lt 10 ]
	do
		echo "WARNING: Waiting for bridge init done!" >$CONSOLE
		sleep 1
		let loop_cnt+=1

		json_load "`ubus call network.interface.lan status`"
		json_get_var l3_device l3_device
	done
	
	export ${NO_EXPORT:+-n} "$1=$l3_device"
}

kick_sta() {
	ifname=$1
	sta_list=`wl -i $ifname assoclist | cut -d ' ' -f 2`

	if [ "$MACFILTER_ACTION" = "deny" ]; then
		for sta in ${sta_list}; do
			echo ${MAC_LIST} | grep -q ${sta} && wl -i $ifname deauthenticate "$sta"
		done
	elif [ "$MACFILTER_ACTION" = "allow" ]; then
		for sta in ${sta_list}; do
			echo ${MAC_LIST} | grep -q ${sta} || wl -i $ifname deauthenticate "$sta"
		done
	else
		echo "macfilter action is not correct!" >$CONSOLE
	fi
}

wifi_fixup_mode() {
	local dev="$1"
	local hwmode
	local abg_mode
	config_get hwmode $dev hwmode
	case "$hwmode" in
		a_5)
			hwmode=11a
			abg_mode="1"
		;;
		b)
			hwmode=11b
			abg_mode="1"
		;;
		g)
			hwmode=11g
			abg_mode="1"
		;;
		bg)
			hwmode=11bg
			abg_mode="1"
		;;
		n)
			hwmode=11n
		;;
		gn)
			hwmode=11gn
		;;
		n_5)
			hwmode=11n
		;;
		an_5)
			hwmode=11an
		;;
		bgn)
			hwmode=11bgn
		;;
		ac_5)
			hwmode=11ac
		;;
		nac_5)
			hwmode=11nac
		;;
		anac_5)
			hwmode=11anac
		;;
		ax)
			hwmode=11ax
		;;
		bgnax)
			hwmode=11bgnax
		;;
		ax_5)
			hwmode=11ax_5
		;;
		anacax_5)
			hwmode=11anacax
		;;
	esac
	config_set $dev hwmode $hwmode
	if [ "$abg_mode" = "1" ]; then
		config_set $dev htmode 20
	fi
}

wifi_fixup_config() {
	local enable macfilter
	#config_get_bool enable filter enable 0
	#config_get macfilter filter action "deny"
	#get config from access control
	if [ $(ac get_enable) = "on" ]; then
		enable="1"
	elif [ $(ac get_enable) = "off" ]; then
		enable="0"
	else
		echo "bad ac enable" >$STDOUT
		enable="0"
	fi

	if [ $enable = "1" ]; then
		#get config from access control
		MACLIST=$(ac get_maclist)
		MACLIST=${MACLIST//-/:}
		#replace \n with space
		MACLIST=`echo $MACLIST | tr '\n' ' '`

		#config_get macfilter filter action "deny"
		#get config from access control
		if [ $(ac get_mode) = "black" ]; then
			macfilter="deny"
		elif [ $(ac get_mode) = "white" ]; then
			macfilter="allow"
		else
			echo "bad ac mode" >$STDOUT
			macfilter="0"
		fi 

		MAC_LIST=$MACLIST
		MACFILTER_ENABLE="on"
		MACFILTER_ACTION=$macfilter
	else
		MAC_LIST=""
		MACFILTER_ENABLE="off"
		MACFILTER_ACTION=""
		unset MACLIST
	fi

	for dev in ${1:-DEVICES}; do
		wifi_fixup_mode "$dev"
	done
}

wifi_onemesh_config() {
	
	echo "=====>>>>> wifi_onemesh_config" >$STDOUT
	local sysmode=`uci get sysmode.sysmode.mode`
	local smart_enable=`uci get wireless.smart.smart_enable`
	config_get onemesh_enable onemesh enable "on"

	local tpie_level=00
	local product_type=0001
	local tpie_subnet_type=01 #AP
	local backhaul_type=00
	local uplink_rate=0000

	local level=`uci get onemesh.onemesh.level`
	if [ -z "$level" ];then
		level=2
	fi

	for dev in ${DEVICES}; do
		config_get band $dev band
		config_get vifs $dev vifs

		case $band in
		2g)
			HOME_WIFI="wl1.1"
			BACKHAUL_WIFI="wl1.2"
			GUEST_WIFI="wl1.3"
			RTORCFG_WIFI="wl1.4"
		;;
		5g)
			HOME_WIFI="wl0.1"
			BACKHAUL_WIFI="wl0.2"
			GUEST_WIFI="wl0.3"
			RTORCFG_WIFI="wl0.4"
		;;
		esac

		# set TP IE,dwds_brcm_ie_filter, wnm feature and 11k/v feature
		for vif in $vifs;do
			echo "=====>>>>> set tp_ie" >$STDOUT
			config_get onemesh_ie $vif onemesh_ie "on"
			config_get gp_id_rand onemesh group_id

			self_hw_mac=`uci show network|grep macaddr|sed -n '3p'|awk '{print $2}' -F '='`
			self_tpie_mac=${self_hw_mac//:/}
			if [ "$sysmode" = "router" ];then
				tpie_mac=$self_tpie_mac #LAN MAC as TPIE_MAC
			elif [ "$sysmode" = "repeater" ];then
				tpie_mac=${self_tpie_mac//[-:]/}
				config_get tpie_hw_mac onemesh macaddr #MASTER MAC as TPIE_MAC
				[ -n "$tpie_hw_mac" ] && tpie_mac=${tpie_hw_mac//[-:]/}
			fi
			random_suffix="5789"
			gp_id_rand=${gp_id_rand:0:4}
			gp_id_rand="${gp_id_rand:0:2}${gp_id_rand:2:2}"

			if [ "$sysmode" = "repeater" ];then
				config_get level onemesh level "1"
				if [ "$level" = "1" ];then
					tpie_level=01
				else
					tpie_level=02
				fi

				if [ "$band" == "2g" ];then
					backhaul_type=01
				else
					backhaul_type=10
				fi
				#to do
				#if rootAP is not wireless router, product should be set by wpa_supplicant when connect.
				config_get product_type onemesh product_type 0001

				tpie_subnet_type=02 #RE

				#to do 
				#use rssi as uplink_rate 
				uplink_rate=0000
			fi

			[ -n "$gp_id_rand" ] && random_suffix=$gp_id_rand
			# set TP IE and dwds_brcm_ie_filter
			# dwds_brcm_ie_filter 1: only BRCM STA can associate in the form of 4 addrs
			# dwds_brcm_ie_filter 0: skip the judgement
			if [ "$onemesh_ie" = "on" -a "$onemesh_enable" = "on" ]; then
				# HOME WIFI
				[ "$vif" = "wl03" -o "$vif" = "wl13"  ] && {
					wl -i ${HOME_WIFI} add_tpie 3 30 00:1d:0f 10${tpie_subnet_type}63${tpie_level}${backhaul_type}${tpie_mac}${tpie_mac}${random_suffix}${uplink_rate}${self_tpie_mac:8:4}${product_type}0000
					echo "=====>>>>>  wl -i ${HOME_WIFI} add_tpie 3 30 00:1d:0f 100163${tpie_level}${backhaul_type}${tpie_mac}${tpie_mac}${random_suffix}0000${self_tpie_mac:8:4}00010000" >$CONSOLE
					wl -i ${HOME_WIFI} dwds_brcm_ie_filter 0
					echo "=====>>>>>  wl -i ${HOME_WIFI} dwds_brcm_ie_filter 0" >$CONSOLE
					# enable dynamic nerghbor report, or our nerghbor report response will be empty.
					wl -i ${HOME_WIFI} rrm_nbr_scan 1	
				}
				# BACKHAUL WIFI
				[ "$vif" = "wl04" -o "$vif" = "wl14" ] && {
					wl -i ${BACKHAUL_WIFI} add_tpie 3 30 00:1d:0f 10${tpie_subnet_type}67${tpie_level}${backhaul_type}${tpie_mac}${tpie_mac}${random_suffix}${uplink_rate}${self_tpie_mac:8:4}${product_type}0000
					echo "=====>>>>>  wl -i ${BACKHAUL_WIFI} add_tpie 3 30 00:1d:0f 100167${tpie_level}${backhaul_type}${tpie_mac}${tpie_mac}${random_suffix}0000${self_tpie_mac:8:4}00010000" >$CONSOLE
					wl -i ${BACKHAUL_WIFI} dwds_brcm_ie_filter 0
					echo "=====>>>>>  wl -i ${BACKHAUL_WIFI} dwds_brcm_ie_filter 0" >$CONSOLE
					# disable the BSS Transition Bit in Extended Capabilities
					wl -i ${BACKHAUL_WIFI} wnm 0
				}
				#  RTORCFG WIFI
				[ "$sysmode" = "router" ] && [ "$vif" = "wl04" -o "$vif" = "wl14" ] && {
					wl -i ${RTORCFG_WIFI} add_tpie 3 30 00:1d:0f 1001070000${tpie_mac}${tpie_mac}${random_suffix}0000${self_tpie_mac:8:4}00010000
					echo "=====>>>>>  wl -i ${RTORCFG_WIFI} add_tpie 3 30 00:1d:0f 1001070000${tpie_mac}${tpie_mac}${random_suffix}0000${self_tpie_mac:8:4}00010000" >$CONSOLE
					wl -i ${RTORCFG_WIFI} dwds_brcm_ie_filter 0
					echo "=====>>>>>  wl -i ${RTORCFG_WIFI} dwds_brcm_ie_filter 0" >$CONSOLE
					# disable the BSS Transition Bit in Extended Capabilities of beacon/probe resp/assoc resp.
					wl -i ${RTORCFG_WIFI} wnm 0
				}
			else
				# HOME WIFI
				[ "$vif" = "wl03" -o "$vif" = "wl13"  ] && {
					wl -i ${HOME_WIFI} del_tpie 3 30 00:1d:0f 000000000000000000000000000000000000000000000000000000
					echo "=====>>>>>  wl -i ${HOME_WIFI} del_tpie" >$CONSOLE
				}
			fi

			# GUEST WIFI
			[ "$vif" = "wl02" -o "$vif" = "wl12" ] && {
				# disable the BSS Transition Bit in Extended Capabilities
				wl -i ${GUEST_WIFI} wnm 0
			}

			nvram set ${HOME_WIFI}_rrm="0x33"

			# smart connect needs wnm too
			
			wl -i ${HOME_WIFI} wnm 1
		done
	done
}

wifi_easymesh() {
	local enable=$1
	
	uci set meshd.meshd.enableeasymesh $enable
	wifi_reload
}

wifi_easymesh_primvlanid() {
	local map_8021q_settings=$1
	
	for dev in ${DEVICES}; do
		config_get band $dev band

		case $band in
		2g)
			HOME_WIFI="wl1.1"
		;;
		5g)
			HOME_WIFI="wl0.1"
		;;
		esac
		
		if [ $map_8021q_settings -gt 0 ]; then
			wl -i ${HOME_WIFI} down
			wl -i ${HOME_WIFI} map 2
			wl -i ${HOME_WIFI} map_8021q_settings $map_8021q_settings
			wl -i ${HOME_WIFI} map 1
			wl -i ${HOME_WIFI} up
		fi
	done
}

wifi_update_tpie() {
	echo "=====>>>>> wifi_update_tpie_level" >$STDOUT
	local sysmode=`uci get sysmode.sysmode.mode`
	local smart_enable=`uci get wireless.smart.smart_enable`
	config_get onemesh_enable onemesh enable "on"

	local tpie_level=00
	local product_type=0001
	local tpie_subnet_type=01 #AP
	local backhaul_type=00
	local uplink_rate=0000

	local level=`uci get onemesh.onemesh.level`
	if [ -z "$level" ];then
		level=2
	fi

	for dev in ${DEVICES}; do
		config_get band $dev band
		config_get vifs $dev vifs

		case $band in
		2g)
			HOME_WIFI="wl1.1"
			BACKHAUL_WIFI="wl1.2"
		;;
		5g)
			HOME_WIFI="wl0.1"
			BACKHAUL_WIFI="wl0.2"
		;;
		esac

		for vif in $vifs;do
			echo "=====>>>>> set tp_ie" >$STDOUT
			config_get onemesh_ie $vif onemesh_ie "on"
			config_get gp_id_rand onemesh group_id

            self_hw_mac=`uci show network|grep macaddr|sed -n '3p'|awk '{print $2}' -F '='`
            self_tpie_mac=${self_hw_mac//:/}
			if [ "$sysmode" = "router" ];then
				tpie_mac=$self_tpie_mac #LAN MAC as TPIE_MAC
			elif [ "$sysmode" = "repeater" ];then
				config_get tpie_hw_mac onemesh macaddr #MASTER MAC as TPIE_MAC
				tpie_mac=${tpie_hw_mac//[-:]/}
			fi

			random_suffix="5789"
			gp_id_rand=${gp_id_rand:0:4}
			gp_id_rand="${gp_id_rand:0:2}${gp_id_rand:2:2}"

			if [ "$sysmode" = "repeater" ];then
				if [ "$level" = "0" ];then
					tpie_level=00
				elif [ "$level" = "1" ];then
					tpie_level=01
				else
					tpie_level=02
				fi

				if [ "$band" == "2g" ];then
					backhaul_type=01
				else
					backhaul_type=10
				fi
				#to do
				#if rootAP is not wireless router, product should be set by wpa_supplicant when connect.
				config_get product_type onemesh product_type 0001

				tpie_subnet_type=02 #RE

				#to do
				#use rssi as uplink_rate
				uplink_rate=0000
			fi
			[ -n "$gp_id_rand" ] && random_suffix=$gp_id_rand

			# set TP IE and dwds_brcm_ie_filter
			# dwds_brcm_ie_filter 1: only BRCM STA can associate in the form of 4 addrs
			# dwds_brcm_ie_filter 0: skip the judgement
			if [ "$onemesh_ie" = "on" -a "$onemesh_enable" = "on" ]; then
				# HOME WIFI
				[ "$vif" = "wl03" -o "$vif" = "wl13" ] && {
					wl -i ${HOME_WIFI} add_tpie 3 30 00:1d:0f 10${tpie_subnet_type}63${tpie_level}${backhaul_type}${tpie_mac}${tpie_mac}${random_suffix}${uplink_rate}${self_tpie_mac:8:4}${product_type}0000
					echo "=====>>>>>  wl -i ${HOME_WIFI} add_tpie 3 30 00:1d:0f 100163${tpie_level}${backhaul_type}${tpie_mac}${tpie_mac}${random_suffix}0000${self_tpie_mac:8:4}00010000" >$CONSOLE
				}
				# BACKHAUL WIFI
				[ "$vif" = "wl04" -o "$vif" = "wl14" ] && {
					wl -i ${BACKHAUL_WIFI} add_tpie 3 30 00:1d:0f 10${tpie_subnet_type}67${tpie_level}${backhaul_type}${tpie_mac}${tpie_mac}${random_suffix}${uplink_rate}${self_tpie_mac:8:4}${product_type}0000
					echo "=====>>>>>  wl -i ${BACKHAUL_WIFI} add_tpie 3 30 00:1d:0f 100167${tpie_level}${backhaul_type}${tpie_mac}${tpie_mac}${random_suffix}0000${self_tpie_mac:8:4}00010000" >$CONSOLE
				}
				#  RTORCFG WIFI
				[ "$sysmode" = "router" ] && [ "$vif" = "wl04" -o "$vif" = "wl14" ] && {
					wl -i ${RTORCFG_WIFI} add_tpie 3 30 00:1d:0f 1001070000${tpie_mac}${tpie_mac}${random_suffix}0000${self_tpie_mac:8:4}00010000
					echo "=====>>>>>  wl -i ${RTORCFG_WIFI} add_tpie 3 30 00:1d:0f 1001070000${tpie_mac}${tpie_mac}${random_suffix}0000${self_tpie_mac:8:4}00010000" >$CONSOLE
				}
			fi

		done
	done
}

wifi_onemesh() {
	/etc/init.d/sync-server stop

	local tdpServer_pid=`pgrep /usr/bin/tdpServer`
	if [ -n "$tdpServer_pid" ];then
	for pid in $tdpServer_pid; do
		kill -9 "$pid"
	done
	fi

	wifi_reload

	/etc/init.d/sync-server start
	local tdpServer=$(pgrep tdpServer| wc -l)
	if [ "$tdpServer" -ge 1 ]; then
		return 1
	else
		"/bin/nice" -n -5 /usr/bin/tdpServer &>/dev/null &
	fi
}

wifi_onemesh_search(){
	local operation=$1
	local sysmode=`uci get sysmode.sysmode.mode`
	
	local vifs="wl0.4 wl1.4"
	local mac_list=
	
	[ "$sysmode" != "router" ] && return
	
	for ifname in $vifs; do
		if [ "$operation" = "start" ];then
			wl -i $ifname bss up
			wl -i $ifname macmode 0
			wl -i $ifname mac none
		elif [ "$operation" = "stop" ];then
			result=`wl -i $ifname assoclist`
			local mac_list=
			for i in $result;do 
				if [ "$i" = "assoclist" ];then 
					continue
				else 
					mac_list="$mac_list $i"
				fi
			done
			wl -i $ifname macmode 2

			wl -i $ifname mac "$mac_list"
		elif [ "$operation" = "cancel" ];then
			wl -i $ifname deauthenticate
			wl -i $ifname bss down
		fi
	done
	if [ "$operation" = "start" ];then
		config_vap_monitor cancel #avoid to start many monitor processes
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

		while [ $timer -lt 20 ]
		do
			bssid_2g=$(wl -i wl1.4 status|grep BSSID|awk '{print $2}')
			bssid_5g=$(wl -i wl0.4 status|grep BSSID|awk '{print $2}')

			if [ "$bssid_2g" = "00:00:00:00:00:00" -a "$bssid_5g" = "00:00:00:00:00:00" ];then
				break;
			fi

			sleep 15
			timer=$(($timer+1))
		done
		if [ $timer -ge 20 ];then
			wl -i wl1.4 bss down
			wl -i wl0.4 bss down
		fi
		return
	elif [ "$operation" = "cancel" ];then
		pid=$(ps -w|grep "/sbin/wifi search start" |grep -v "grep" |awk '{print $1}')

		if [ -n "pid" ];then
			for p in ${pid}; do
				kill -9 $p
			done
		fi
	fi
}

wifi_guest_passwd_set() {
	local passwd_cycle=`uci get wireless.wl02.passwd_cycle`
	local tmpfile="/tmp/guest_passwd_setting.$$"
	touch "$tmpfile"
	if [ "$passwd_cycle" != "never" ]; then
		if [ "$passwd_cycle" = "daily" ]; then
			echo "  0  0  *   *   *    $SET_GUEST_DYNAMIC_PASSWD" > "$tmpfile"  #change Guest Network password daily
		elif [ "$passwd_cycle" = "weekly" ]; then
			echo "  0  0  *   *   1    $SET_GUEST_DYNAMIC_PASSWD" > "$tmpfile"  #change Guest Network password weekly
		elif [ "$passwd_cycle" = "monthly" ]; then
			echo "  0  0  1   *   *    $SET_GUEST_DYNAMIC_PASSWD" > "$tmpfile"  #change Guest Network password monthly
		else
			echo "the passwd changing cycle you set is not correct" >/dev/console
		fi
	fi

	crontab -l | grep -v "$SET_GUEST_DYNAMIC_PASSWD" | cat - "$tmpfile" | crontab -
	rm -rf "$tmpfile"
}

wifi_default() {
	echo "wifi_default" >$STDOUT
}

wifi_vap() {
	echo "wifi_vap" >$STDOUT
	wifi_reload
}

wifi_mode(){
	echo "wifi_mode" >$STDOUT
	wifi_reload
}

wifi_radio() {
	echo "wifi_radio" >$STDOUT
	wifi_reload
}

wifi_country() {
	echo "wifi_country" >$STDOUT
	local cmd_flag=1

	local eth_enable=""
	local guest_enable=""
	local backhaul_enable=""
	local wds_enable=""
	local ifnames_enabled=""

	if [ "$cmd_flag" = "0" ]; then
		wifi_reload
	else
		for dev in ${DEVICES}; do
			ifnames_enabled=""
			config_get_bool wifi_disabled $dev disabled       # hardware switch
			config_get_bool soft_disabled $dev disabled_all   # software switch
			if [ "$wifi_disabled" = "0" -a "$soft_disabled" = "0" ]; then
				config_get vifs $dev vifs
				for vif in $vifs; do	# vifs is wl01/wl02/wl03, wds/guest/home
					config_get_bool enable $vif enable
					if [ "$enable" = "1" ]; then
						config_get mode $vif mode
						config_get guest $vif guest
						config_get backhaul $vif backhaul
						config_get ifname $vif ifname
						append ifnames_enabled "$ifname"
						if [ "$mode" = "ap" -a -z "$guest" ]; then
							eth_enable="1"
						elif [ "$mode" = "ap" -a "$guest" = "on" ]; then
							eth_enable="1"
							guest_enable="1"
						elif [ "$mode" = "ap" -a "$backhaul" = "on" ]; then
							eth_enable="1"
							backhaul_enable="1"
						elif [ "$mode" = "sta" ]; then
							eth_enable="1"
							wds_enable="1"
						else
							echo "=====>>>>> $dev: vif $vif is disabled or $vif is a guest network" >$STDOUT
						fi
					fi
				done
			fi

			config_get band $dev band
			case $band in
				2g)
					HOME_WIFI="wl1.1"
					GUEST_WIFI="wl1.3"
					BACKHAUL_WIFI="wl1.2"
					DEV="wl1"
				;;
				5g)
					HOME_WIFI="wl0.1"
					GUEST_WIFI="wl0.3"
					BACKHAUL_WIFI="wl0.2"
					DEV="wl0"
				;;
			esac

			local tmpCode=""
			local country_code=""
			local country_rev=""

			config_get country $dev country
			tmpCode=`cat $BRCM_COUNTRYCODE | awk '$1=="'"$country"'" {print $2}'`
			if [ "$tmpCode" = "DE" ]; then
				nvram set ${HOME_WIFI}_country_code="$tmpCode"
				nvram set ${HOME_WIFI}_country_rev="$COUNTRYCODE_EU"
				country_code="$tmpCode"
				country_rev="$COUNTRYCODE_EU"
			elif [ "$tmpCode" = "Q2" ]; then
				nvram set ${HOME_WIFI}_country_code="$tmpCode"
				nvram set ${HOME_WIFI}_country_rev="$COUNTRYCODE_Q2"
				country_code="$tmpCode"
				country_rev="$COUNTRYCODE_Q2"
			elif [ "$tmpCode" = "US" ]; then
				nvram set ${HOME_WIFI}_country_code="$tmpCode"
				nvram set ${HOME_WIFI}_country_rev="$COUNTRYCODE_US"
				country_code="$tmpCode"
				country_rev="$COUNTRYCODE_US"
			elif [ "$tmpCode" = "CA" ]; then
				nvram set ${HOME_WIFI}_country_code="$tmpCode"
				nvram set ${HOME_WIFI}_country_rev="$COUNTRYCODE_CA"
				country_code="$tmpCode"
				country_rev="$COUNTRYCODE_CA"
			elif [ "$tmpCode" = "JP" ]; then
				nvram set ${HOME_WIFI}_country_code="$tmpCode"
				nvram set ${HOME_WIFI}_country_rev="$COUNTRYCODE_JP"
				country_code="$tmpCode"
				country_rev="$COUNTRYCODE_JP"
			elif [ "$tmpCode" = "KR" ]; then
				nvram set ${HOME_WIFI}_country_code="$tmpCode"
				nvram set ${HOME_WIFI}_country_rev="$COUNTRYCODE_KR"
				country_code="$tmpCode"
				country_rev="$COUNTRYCODE_KR"
			elif [ "$tmpCode" = "UN" ]; then
				nvram set ${HOME_WIFI}_country_code="KR"
				nvram set ${HOME_WIFI}_country_rev="$COUNTRYCODE_KR_UN"
				country_code="KR"
				country_rev="$COUNTRYCODE_KR_UN"
			else
				nvram set ${HOME_WIFI}_country_code="$country"
				nvram set ${HOME_WIFI}_country_rev="$tmpCode"
				country_code="$country"
				country_rev="$tmpCode"
			fi
			
			#set ax mode
			#* HE features bitmap.
			#* Bit 0:		HE 5G support
			#* Bit 1:		HE 2G support
			#* Bit 2:		HE DLMU (OFDMA and MUMIMO) support
			if [ "$hwmode" = "11ax" -o "$hwmode" = "11ax_5" -o "$hwmode" = "11bgnax" -o "$hwmode" = "11anacax" ]; then
				nvram set ${HOME_WIFI}_he_features="1"
			else
				nvram set ${HOME_WIFI}_he_features="0"
			fi
			
			# set nmode
			config_get hwmode $dev hwmode
			if [ "$hwmode" = "11b" -o "$hwmode" = "11g" -o "$hwmode" = "11bg" -o "$hwmode" = "11a" ]; then
				nvram set ${HOME_WIFI}_nmode="0"
			else
				nvram set ${HOME_WIFI}_nmode="-1"
			fi

			# set gmode
			if [ "$hwmode" = "11b" ]; then
				nvram set ${HOME_WIFI}_gmode="0"
			elif [ "$hwmode" = "11g" -o "$hwmode" = "11gn" ]; then
				nvram set ${HOME_WIFI}_gmode="2"
			else
				nvram set ${HOME_WIFI}_gmode="1"
			fi

			# set bss_opmode_cap_reqd
			if [ "$hwmode" = "11ax" -o "$hwmode" = "11ax_5" ]; then
				#set 11ax only mode
				nvram set ${HOME_WIFI}_bss_opmode_cap_reqd="4"
			elif [ "$hwmode" = "11n" -o "$hwmode" = "11nac" ]; then
				nvram set ${HOME_WIFI}_bss_opmode_cap_reqd="2"
			elif [ "$hwmode" = "11ac" ]; then
				nvram set ${HOME_WIFI}_bss_opmode_cap_reqd="3"
			else
				nvram set ${HOME_WIFI}_bss_opmode_cap_reqd="0"
			fi

			# set bw_cap
			config_get htmode $dev htmode
			if [ "$htmode" = "auto" ]; then
				if [ "$hwmode" = "11ac" -o "$hwmode" = "11anac" -o "$hwmode" = "11nac" -o "$hwmode" = "11ax_5" -o "$hwmode" = "11anacax" ]; then
					nvram set ${HOME_WIFI}_bw_cap="15"
				else
					nvram set ${HOME_WIFI}_bw_cap="3"
				fi
			elif [ "$htmode" = "160" ]; then
				nvram set ${HOME_WIFI}_bw_cap="15"
			elif [ "$htmode" = "80" ]; then
				nvram set ${HOME_WIFI}_bw_cap="7"
			elif [ "$htmode" = "40" ]; then
				nvram set ${HOME_WIFI}_bw_cap="3"
			else
				nvram set ${HOME_WIFI}_bw_cap="1"
			fi

			# set obss_coex
			if [ "$htmode" = "auto" ]; then
				nvram set ${HOME_WIFI}_obss_coex="1"
			else
				nvram set ${HOME_WIFI}_obss_coex="0"
			fi

			# set chanspec (wlanChspec)
			config_get channel $dev channel
			wifi_chanspec_config chanspec $htmode $channel
			if [ "$band" = "5g" -a "$wds_enable" = "1" ]; then
				nvram set ${HOME_WIFI}_chanspec="0"
			else
				nvram set ${HOME_WIFI}_chanspec="$chanspec"
			fi

			# set radio
			vap_name="${HOME_WIFI}.1"
			if [ "$eth_enable" = "1" ]; then
				nvram set ${HOME_WIFI}_radio="1"
				if [ "$wds_enable" = "1" ]; then
					nvram set ${vap_name}_radio="1"
				fi
				if [ "$guest_enable" = "1" ]; then
					nvram set ${GUEST_WIFI}_radio="1"
				fi
				if [ "$backhaul_enable" = "1" ]; then
					nvram set ${BACKHAUL_WIFI}_radio="1"
				fi
			fi

			for ifname in $ifnames_enabled; do 
				wl -i $ifname country "$country_code"/"$country_rev"
				wlconf $ifname down
				wlconf $ifname up
				wlconf $ifname start
			done
		done
	fi
}

wifi_wps() { 
	local vif="$1"
	local wps
	local wps_cmd
	
	#wps_cmd="/usr/sbin/wps-socket -c "

	config_get_bool wps $vif wps 0
	if [ "$wps" = "1" ]; then
		if [ $( nvram get hapd_enable ) != "1" ]; then
		#use wps_monitor
		wps_cmd="/usr/sbin/wps-socket -c "
			case $2 in
			wps_ap_pin)
				#wifi_reload
				for dev in ${DEVICES}; do  # eth1 eth2
					wifi_wps_config $dev
				done
	
				killall wps_monitor
				sleep 1
				wps_monitor &
				sleep 2
				;;
			status)
				local status method peerAddr
	
				status=`nvram get wps_proc_status`
				method=`nvram get wps_current_method`
				peerAddr=`nvram get wps_sta_mac`
	
				#method==1:pin; method==2:pbc
				if [ "$status" = "1" ] || [ "$status" = "5" ] || [ "$status" = "6" ]; then 
					if [ "$method" = "1" ]; then 
						echo -e "PBC Status: Unknown\nPIN Status: Active\nLast WPS result: None"
					else
						echo -e "PBC Status: Active\nPIN Status: Unknown\nLast WPS result: None"
					fi
				elif [ "$status" = "2" ] || [ "$status" = "7" ]; then
					echo -e "PBC Status: Unknown\nPIN Status: Unknown\nLast WPS result: Success\nPeer Address: $peerAddr"
				elif [ "$status" = "4" ]; then
					if [ "$method" = "1" ]; then 
						echo -e "PBC Status: Unknown\nPIN Status: Timed-out\nLast WPS result: Failed"
					else
						echo -e "PBC Status: Timed-out\nPIN Status: Unknown\nLast WPS result: Failed"
					fi
				elif [ "$status" = "8" ]; then
					echo -e "PBC Status: Overlap\nPIN Status: Unknown\nLast WPS result: Failed"
				else
					echo -e "PBC Status: Unknown\nPIN Status: Unknown\nLast WPS result: None"
				fi
				;;
			pin_lock)
				local lock
	
				lock=`nvram get wps_aplockdown`
				if [ "$lock" = "1" ]; then
					echo "LockDown: Lock"
				else
					echo "LockDown: Unlock"
				fi
				;;
			pin | pbc)
				local cmd
				local cmdSet cmdAction
				local ssid cmdSsid
				local authType
				local secSubType cmdAkm
				local pskCipher cmdCrypto
				local pskKey cmdPsk
				local cmdSecurity
				local method pin ifname cmdPbcMethod cmdOther
	
				cmdSet="SET "
				cmdAction="wps_action=\"3\" "
	
				config_get ssid $vif ssid
				cmdSsid="wps_ssid=\"$ssid\" "
	
				config_get authType $vif encryption	
				if [ "$authType" = "psk" ]; then
					config_get secSubType $vif psk_version
					if [ "$secSubType" = "wpa" ]; then
						cmdAkm="wps_akm=\"\" "
					elif [ "$secSubType" = "rsn" ]; then
						cmdAkm="wps_akm=\"psk2\" "
					else
						cmdAkm="wps_akm=\"psk psk2\" "
					fi
	
					config_get pskCipher $vif psk_cipher
					if [ "$pskCipher" = "auto" ]; then
						cmdCrypto="wps_crypto=\"tkip+aes\" "
					elif [ "$pskCipher" = "aes" ]; then
						cmdCrypto="wps_crypto=\"aes\" "
					else
						cmdCrypto="wps_crypto=\"\" "
					fi
	
					config_get pskKey $vif psk_key
					cmdPsk="wps_psk=\"$pskKey\" "
	
					cmdSecurity="$cmdAkm""$cmdCrypto""$cmdPsk"
				else
					cmdAkm="wps_akm=\"\" "
	
					cmdSecurity="$cmdAkm"
				fi
	
				if [ "$2" = "pin" ]; then
					method="1"
					pin="$3"
					cmdPbcMethod=""
				elif [ "$2" = "pbc" ]; then
					method="2"
					pin="00000000"
					cmdPbcMethod="wps_pbc_method=\"2\" "
				fi
				config_get ifname $vif ifname
				cmdOther="wps_sta_pin=\"$pin\" wps_method=\"$method\" wps_config_command=\"1\" wps_ifname=\"$ifname\" "
	
				nvram set wps_proc_status="0"
				nvram set wps_current_method="$method"
	
				cmd="$cmdSet""$cmdAction""$cmdSsid""$cmdSecurity""$cmdPbcMethod""$cmdOther"
	
				$wps_cmd"$cmd"
				;;
			cancel)
				local cmd
	
				cmd="SET wps_config_command=\"2\" wps_action=\"0\" "
	
				$wps_cmd"$cmd"
				;;
			*)
				echo "it is other" >$STDOUT
				echo $* >$STDOUT
				;;
			esac
	
			echo -e "\n"
			echo "wps_shell_over"
		else
		#use hostapd to support wps
		#add by zhangshengbo, merge form qca_953x
			config_get ifname $vif ifname
			wps_cmd="/usr/sbin/hostapd_cli -i $ifname"
			timeout="120"
	
			case $2 in
			wps_ap_pin)
				if [ "$3" = "disable" ]; then
					$wps_cmd wps_ap_pin disable
				elif [ "$($wps_cmd wps_check_pin $4)" = "$4" ]; then
					$wps_cmd wps_ap_pin set "$4" 0
				else
					echo "FAIL"
				fi
				;;
			status)
				#pin_timeout changed in hostapd: yes for pin timout status; no for other status
				#pin status should be added into wps_get_status, now deal its status with nvram temporarily
				if [ $( nvram get pin_timeout ) != "yes" ]; then
					$wps_cmd wps_get_status
				else
					echo -e "PBC Status: Unknown\nPIN Status: Timed-out\nLast WPS result: Failed"
				fi
				;;
			pin_lock)
				$wps_cmd pin_lock_status
				;;
			pin)
				if [ "$($wps_cmd wps_check_pin $3)" = "$3" ]; then
					$wps_cmd wps_pin any "$3" "$timeout"
				else
					echo "PIN Status: Invalid"
				fi
				;;
			pbc) 		 
				$wps_cmd wps_pbc
				;;
			cancel)
				$wps_cmd wps_cancel
				;;
			*)
				echo "it is other" >$STDOUT
				echo $* >$STDOUT
				;;
			esac
	
			echo -e "\n"
			echo "wps_shell_over"
		fi
		#use hostapd to support wps end
	fi
	#"$wps" = "1" end
}

wifi_wps_switch() {
	wifi_reload
}

wifi_disconnect_stas() {                                     
    for dev in $DEVICES; do                              
        echo "dev is $dev" >$STDOUT
#wl0 wl1		
        config_get_bool wifi_disabled $dev disabled         
            if [ "$wifi_disabled" = "0" ]; then         
                config_get vifs $dev vifs   
#vifs is wl01 wl02 wl03 wl04 wl11 wl12 wl13 wl14	
				for vif in $vifs; do
					config_get_bool enable $vif enable
					config_get mode $vif mode
					config_get ifname $vif ifname  
#ifname is wl0.2 wl0.3 wl1 wl1.2 wl1.3					
					echo "vif is $vif , ifname is $ifname" >$STDOUT               
					# kick all sta    
					if [ "$enable" = "1" -a "$mode" != "sta" ]; then
						wl -i $ifname deauthenticate
						echo "wl deauth $ifname" >$STDOUT
					fi
				done
            fi
    done                              
}   

wifi_vlan() {
	local wifi_state=""
	wifi_state=`cat /tmp/wifi_state`

	local isaddif=""
	if [ $1 = "notaddif" ];then
		isaddif=0
	else
		isaddif=1
	fi

	local brname;
	local hvlan=$((0x3)) gvlan=0;
	get_brname brname
	for port in $(brctl show "$brname" | grep eth | cut -f 6-8); do
		brctl setifvlan "$brname" "$port" "$hvlan" 1
	done

	if [ "$wifi_state" = "inited" -o "$isaddif" = "0" ]; then 
		echo "=====>>>>> wifi_vlan" >$STDOUT

		for dev in $DEVICES; do

				config_get vifs $dev vifs
				config_get band $dev band
				for vif in $vifs; do
					config_get_bool enable $vif enable
					config_get mode $vif mode
					config_get guest $vif guest
					config_get ifname $vif ifname
					config_get_bool isolate "$vif" isolate 1
					config_get_bool access "$vif" access 1

					local fw_action="unblock"
					if [ "$enable" = "1" -a "$mode" = "ap" -a -z "$guest" ]; then
						[ "$isaddif" = "1" ] && brctl addif "$brname" "$ifname"
						brctl setifvlan "$brname" "$ifname" "$hvlan" 1
					elif [ "$mode" = "ap" -a "$guest" = "on" ]; then
						#In AP mode, we only force block router access 
						local sysmode=`uci get sysmode.sysmode.mode`
						if [ "$sysmode" = "ap" ]; then
							fw_action="block"
							if [ "$gvlan" = 0 ]; then
								gvlan=$((0x1))
							else
								[ "$isolate" = 1 ] && gvlan=$(($gvlan << 1))
							fi
						#Router mode
						else
							if [ "$access" = "0" ]; then
								fw_action="block"							
								if [ "$gvlan" = 0 ]; then
									gvlan=$((0x8))
								else
									[ "$isolate" = 1 ] && gvlan=$(($gvlan << 1))
								fi
							else
								fw_action="unblock"
								if [ "$gvlan" = 0 ]; then
									gvlan=$((0x1))
								else
									[ "$isolate" = 1 ] && gvlan=$(($gvlan << 1))
								fi
							fi
						fi
						
						[ "$isaddif" = "1" ] && brctl addif "$brname" "$ifname"
						brctl setifvlan "$brname" "$ifname" "$gvlan" 1
						#FW Replace by br-filter control
						if [ "$fw_action" = "block" ]; then
							echo "0" > /proc/bridge_filter/local_access_flag
						else
							echo "1" > /proc/bridge_filter/local_access_flag
						fi
						
						#fw "$fw_action"_rt_access dev "$ifname" &
						#Force block, guestnetwork can't access WEBSERVER
						#fw block_rt_access dev "$ifname" &
						
						# kick all sta
						wl -i $ifname deauthenticate
						#flush interface
						fc flush --if $ifname

					elif [ "$enable" = "1" -a "$mode" = "sta" ]; then
						case $band in
							2g)
							IFNAME="wl1"
							;;
							5g)
							IFNAME="wl0"
							;;
						esac
						[ "$isaddif" = "1" ] && brctl addif "$brname" "$IFNAME"
						brctl setifvlan "$brname" "$IFNAME" 15 1
					else
						echo "=====>>>>> $dev: vif $vif is disabled" >$STDOUT
					fi
				done

		done
	fi
}

wifi_macfilter() {
	local wifi_state=""
	wifi_state=`cat /tmp/wifi_state`
	if [ "$wifi_state" = "inited" ]; then
		echo "=====>>>>> in wifi_macfilter" >$STDOUT
		for dev in ${DEVICES}; do  
			wifi_macfilter_config $dev dynamic
		done
	fi
}

# clean up nvram for wps
init_nvram_wps() {
	nvram unset wps_config_state
	nvram unset wps_device_pin
	nvram unset wps_proc_status
	nvram unset wps_sta_pin
	nvram unset wps_restart
	nvram unset wps_config_method
}

init_nvram_radio() {
	nvram unset unbridged_ifnames
	nvram unset ure_disable
		
	# delete dynamically generated variables
	for idx in `seq 0 1`; do
		nvram unset wl${idx}_vifs
		nvram unset wl${idx}_ssid
		nvram unset wl${idx}_guest
		nvram unset wl${idx}_ure
		nvram unset wl${idx}_ipconfig_index
		nvram unset wl${idx}_nas_dbg
		
		nvram unset lan${idx}_ifname
		nvram unset lan${idx}_ifnames
		nvram unset lan${idx}_gateway
		nvram unset lan${idx}_proto
		nvram unset lan${idx}_ipaddr
		nvram unset lan${idx}_netmask
		nvram unset lan${idx}_lease
		nvram unset lan${idx}_stp
		nvram unset lan${idx}_hwaddr
		
		nvram unset dhcp${idx}_start
		nvram unset dhcp${idx}_end
		
		# clear virtual versions
		for vif_idx in `seq 0 15`; do
			nvram unset wl${idx}.${vif_idx}_ssid
			nvram unset wl${idx}.${vif_idx}_ipconfig_index
			nvram unset wl${idx}.${vif_idx}_guest
			nvram unset wl${idx}.${vif_idx}_closed
			nvram unset wl${idx}.${vif_idx}_wpa_psk
			nvram unset wl${idx}.${vif_idx}_auth
			nvram unset wl${idx}.${vif_idx}_wep
			nvram unset wl${idx}.${vif_idx}_auth_mode
			nvram unset wl${idx}.${vif_idx}_crypto
			nvram unset wl${idx}.${vif_idx}_akm
			nvram unset wl${idx}.${vif_idx}_hwaddr
			nvram unset wl${idx}.${vif_idx}_bss_enabled
			nvram unset wl${idx}.${vif_idx}_bss_maxassoc
			nvram unset wl${idx}.${vif_idx}_wme_bss_disable
			nvram unset wl${idx}.${vif_idx}_ifname
			nvram unset wl${idx}.${vif_idx}_unit
			nvram unset wl${idx}.${vif_idx}_ap_isolate
			nvram unset wl${idx}.${vif_idx}_macmode
			nvram unset wl${idx}.${vif_idx}_maclist
			nvram unset wl${idx}.${vif_idx}_maxassoc
			nvram unset wl${idx}.${vif_idx}_mode
			nvram unset wl${idx}.${vif_idx}_radio
			nvram unset wl${idx}.${vif_idx}_radius_ipaddr
			nvram unset wl${idx}.${vif_idx}_radius_port
			nvram unset wl${idx}.${vif_idx}_radius_key
			nvram unset wl${idx}.${vif_idx}_key
			nvram unset wl${idx}.${vif_idx}_key1
			nvram unset wl${idx}.${vif_idx}_key2
			nvram unset wl${idx}.${vif_idx}_key3
			nvram unset wl${idx}.${vif_idx}_key4
			nvram unset wl${idx}.${vif_idx}_wpa_gtk_rekey
			nvram unset wl${idx}.${vif_idx}_nas_dbg
		done
	done
}

# os parameters and version
init_nvram_os() {
	# os parameters
	nvram set os_name="linux"
	nvram set os_version="6.37.14.93" 
	nvram set os_date="Sep 18 2014" #need to check
	nvram set wl0_version="6.37.14.93"
	nvram set wl1_version="6.37.14.93"
	
	# version
	nvram set nvram_version="1"
}

# Miscellaneous parameters 
init_nvram_misc() {
	nvram set timer_interval="3600"
	nvram set ntp_server="192.5.41.40 192.5.41.41 133.100.9.2"
	nvram set time_zone="PST8PDT"
	nvram set log_level="0"
	nvram set upnp_enable="1"
	nvram set dlna_dms_enable="1"
	nvram set ezc_enable="1"
	nvram set ezc_version="2"
	nvram set is_default="1"
	nvram set os_server=""
	nvram set stats_server=""
	nvram set console_loglevel="1"
	#For ax10,if _default_restored_ == 0, wlconf will check this to set txbf & mu-mimo setting to default
	nvram set _default_restored_="1"
}

# Big switches 
init_nvram_switch() {
	nvram set router_disable="0"
	nvram set ure_disable="1"
	nvram set fw_disable="0"
	nvram set log_ipaddr=""
}

# lan parameters
init_nvram_lan() {
	# LAN H/W parameters 
	nvram set lan_ifname="br-lan"
	nvram set lan_ifnames="eth1 eth2 eth3 eth4 eth5 wl0 wl1"
	nvram set lan_hwnames=""
	nvram set lan_hwaddr=""

	# LAN TCP/IP parameters 
	nvram set lan_dhcp="0"
	nvram set lan_ipaddr="192.168.0.1"
	nvram set lan_netmask="255.255.255.0"
	nvram set lan_gateway="192.168.0.1"
	nvram set lan_proto="dhcp"
	nvram set lan_wins=""
	nvram set lan_domain=""
	nvram set lan_lease="86400"
	nvram set lan_stp="1"
	nvram set lan_route=""

	# Guest H/W parameters 
	nvram set br1_ifname=""
	nvram set lan1_ifname=""
	nvram set lan1_ifnames=""
	nvram set lan1_hwnames=""
	nvram set lan1_hwaddr="00:00:00:00:00:00"

	# Guest TCP/IP parameters 
	nvram set lan1_dhcp="0"
	nvram set lan1_ipaddr="192.168.2.1"
	nvram set lan1_netmask="255.255.255.0"
	nvram set lan1_gateway="192.168.2.1"
	nvram set lan1_proto="dhcp"
	nvram set lan1_wins=""
	nvram set lan1_domain=""
	nvram set lan1_lease="86400"
	nvram set lan1_stp="1"
	nvram set lan1_route=""
}

# wan parameters
init_nvram_wan() {
	# WAN H/W parameters 
	nvram set wan_ifname="eth0"
	nvram set wan_ifnames="eth0"
	nvram set wan_hwname=""
	nvram set wan_hwaddr=""

	# WAN TCP/IP parameters 
	nvram set wan_proto="dhcp"
	nvram set wan_ipaddr="0.0.0.0"
	nvram set wan_netmask="0.0.0.0"
	nvram set wan_gateway="0.0.0.0"
	nvram set wan_dns=""
	nvram set wan_wins=""
	nvram set wan_hostname=""
	nvram set wan_domain=""
	nvram set wan_lease="86400"

	# PPPoE parameters 
	nvram set wan_pppoe_ifname=""
	nvram set wan_pppoe_username=""
	nvram set wan_pppoe_passwd=""
	nvram set wan_pppoe_idletime="60"
	nvram set wan_pppoe_keepalive="0"
	nvram set wan_pppoe_demand="0"
	nvram set wan_pppoe_mru="1492"
	nvram set wan_pppoe_mtu="1492"
	nvram set wan_pppoe_service=""
	nvram set wan_pppoe_ac=""

	# Misc WAN parameters 
	nvram set wan_desc=""
	nvram set wan_route=""
	nvram set wan_primary="0"
	nvram set wan_unit="0"

	nvram set wan_mtu="1500"
}

# Filters
init_nvram_filter() {
	nvram set filter_maclist=""
	nvram set filter_macmode="deny"
	nvram set filter_client0=""
	nvram set nat_type="sym"
}

# Port forwards 
init_nvram_port() {
	nvram set dmz_ipaddr=""
	nvram set forward_port0=""
	nvram set autofw_port0=""
}

# Qos
init_nvram_qos() {
	nvram set qos_orates="80-100,10-100,5-100,3-100,2-95,0-0,0-0,0-0,0-0,0-0"
	nvram set qos_irates="0,0,0,0,0,0,0,0,0,0"
	nvram set qos_enable="0"
	nvram set qos_method="0"
	nvram set qos_sticky="1"
	nvram set qos_ack="1"
	nvram set qos_icmp="0"
	nvram set qos_reset="0"
	nvram set qos_obw="384"
	nvram set qos_ibw="1500"
	nvram set qos_orules=""
	nvram set qos_burst0=""
	nvram set qos_burst1=""
	nvram set qos_default="3"
}

# DHCP server parameters 
init_nvram_dhcp() {
	nvram set dhcp_start="192.168.0.100"
	nvram set dhcp_end="192.168.0.150"
	nvram set dhcp1_start="192.168.1.100"
	nvram set dhcp1_end="192.168.1.150"
	nvram set dhcp_domain="wan"
	nvram set dhcp_wins="wan"
}

# Web server parameters 
init_nvram_web() {
	nvram set http_username=""
	nvram set http_passwd="admin"
	nvram set http_wanport=""
	nvram set http_lanport="80"
}

#add by zhangshengbo for wpa3 with hostapd
#now read profile hostapd config message to decide whether nvram set hapd_enable=1
init_nvram_hostapd() {
	local hapd_flag=$(uci get profile.@wireless[0].wps_hostapd_support -c /etc/profile.d)
	if [ "$hapd_flag" == "yes" ]; then 
		nvram set hapd_enable="1"
	else
		nvram set hapd_enable="0"
	fi
}

# Fix DVT 200pcs
init_nvram_ax6000_only() {
	nvram set 1:pdoffset20in160m5gc0="0x5EF8"
	nvram set 1:pdoffset20in160m5gc1="0x6B7A"
	nvram set 1:pdoffset20in160m5gc2="0x62F8"
	nvram set 1:pdoffset20in160m5gc3="0x6759"
	nvram set 1:pdoffset20in160m5gcore3_1="0x0018"
	nvram set 1:pdoffset20in160m5gcore3="0x6378"
	nvram set 1:pdoffset40in160m5gc0="0x7BFF"
	nvram set 1:pdoffset40in160m5gc1="0x0420"
	nvram set 1:pdoffset40in160m5gc2="0x7FFF"
	nvram set 1:pdoffset40in160m5gc3="0x0021"
	nvram set 1:pdoffset40in160m5gcore3_1="0x001F"
	nvram set 1:pdoffset40in160m5gcore3="0x783F"
	nvram set 1:pdoffset80in160m5gc0="0x73DD"
	nvram set 1:pdoffset80in160m5gc1="0x77DE"
	nvram set 1:pdoffset80in160m5gc2="0x7BDD"
	nvram set 1:pdoffset80in160m5gc3="0x77BC"
	nvram set 1:pdoffset80in160m5gcore3_1="0x001B"
	nvram set 1:pdoffset80in160m5gcore3="0x77DE"
	nvram set 1:pdoffset20in40m5gb0="0x6B5A"
	nvram set 1:pdoffset20in40m5gb1="0x6F9C"
	nvram set 1:pdoffset20in40m5gb2="0x6F5B"
	nvram set 1:pdoffset20in40m5gb3="0x6F7B"
	nvram set 1:pdoffset20in40m5gb4="0x6F7B"
	nvram set 1:pdoffset20in40m5gcore3_1="0x037C"
	nvram set 1:pdoffset20in40m5gcore3="0x6F7A"
	nvram set 1:pdoffset20in80m5gb0="0x737C"
	nvram set 1:pdoffset20in80m5gb1="0x739C"
	nvram set 1:pdoffset20in80m5gb2="0x6F7C"
	nvram set 1:pdoffset20in80m5gb3="0x739C"
	nvram set 1:pdoffset20in80m5gb4="0x73BD"
	nvram set 1:pdoffset20in80m5gcore3_1="0x039C"
	nvram set 1:pdoffset20in80m5gcore3="0x73BC"
	nvram set 1:pdoffset40in80m5gb0="0x0442"
	nvram set 1:pdoffset40in80m5gb1="0x0841"
	nvram set 1:pdoffset40in80m5gb2="0x0441"
	nvram set 1:pdoffset40in80m5gb3="0x0442"
	nvram set 1:pdoffset40in80m5gb4="0x0842"
	nvram set 1:pdoffset40in80m5gcore3_1="0x0022"
	nvram set 1:pdoffset40in80m5gcore3="0x0841"
	nvram set 1:rxgains5gmelnagaina0="3"
	nvram set 1:rxgains5gmelnagaina1="3"
	nvram set 1:rxgains5gmelnagaina2="3"
	nvram set 1:rxgains5gmelnagaina3="3"
	nvram set 1:rxgains5gmtrisoa0="7"
	nvram set 1:rxgains5gmtrisoa1="7"
	nvram set 1:rxgains5gmtrisoa2="7"
	nvram set 1:rxgains5gmtrisoa3="7"
	nvram set 1:rxgains5ghelnagaina0="3"
	nvram set 1:rxgains5ghelnagaina1="3"
	nvram set 1:rxgains5ghelnagaina2="3"
	nvram set 1:rxgains5ghelnagaina3="3"
	nvram set 1:rxgains5ghtrisoa0="7"
	nvram set 1:rxgains5ghtrisoa1="7"
	nvram set 1:rxgains5ghtrisoa2="7"
	nvram set 1:rxgains5ghtrisoa3="7"
	nvram set 1:rxgains5gelnagaina0="3"
	nvram set 1:rxgains5gelnagaina1="3"
	nvram set 1:rxgains5gelnagaina2="3"
	nvram set 1:rxgains5gelnagaina3="3"
	nvram set 1:rxgains5gtrisoa0="7"
	nvram set 1:rxgains5gtrisoa1="7"
	nvram set 1:rxgains5gtrisoa2="7"
	nvram set 1:rxgains5gtrisoa3="7"
	nvram set 1:rxgains5gmtrelnabypa0="1"
	nvram set 1:rxgains5gmtrelnabypa1="1"
	nvram set 1:rxgains5gmtrelnabypa2="1"
	nvram set 1:rxgains5gmtrelnabypa3="1"
	nvram set 2:rxgains2gelnagaina0="4"
	nvram set 2:rxgains2gelnagaina1="4"
	nvram set 2:rxgains2gelnagaina2="4"
	nvram set 2:rxgains2gelnagaina3="4"
	nvram set 2:rxgains2gtrisoa0="8"
	nvram set 2:rxgains2gtrisoa1="8"
	nvram set 2:rxgains2gtrisoa2="8"
	nvram set 2:rxgains2gtrisoa3="8"
	nvram set 2:pdoffset20in40m2gcore3="0x701C"
	nvram set 2:pdoffsetcck20m="0x77BB"
	
}

# Wireless phy_ed_thresh for AX20 AC-PHY
# For (wl is_edcrs_eu)
# 	None-EU: ed_thresh2g, ed_thresh5g
#   EU: eu_edthresh2g, eu_edthresh5g
init_nvram_phy_ed_thresh() {
	nvram kset 1:ed_thresh5g="-40"
	nvram kset 1:eu_edthresh5g="-40"
}

# init Wireless parameters
init_nvram_wireless() {
	for idx in 0 1; do
		nvram set wl${idx}_ifname=""
		nvram set wl${idx}_hwaddr=""
		nvram set wl${idx}_corerev=""
		nvram set wl${idx}_phytypes=""
		nvram set wl${idx}_radioids=""
		nvram set wl${idx}_ssid="TP-Link"
		nvram set wl${idx}_bss_enabled="1"
		nvram set wl${idx}_country_code="US"
		nvram set wl${idx}_country_rev="0"
		nvram set wl${idx}_radio="1"
		nvram set wl${idx}_closed="0"
		nvram set wl${idx}_ap_isolate="0"
		nvram set wl${idx}_wmf_bss_enable="1"
		nvram set wl${idx}_mcast_regen_bss_enable="1"
		nvram set wl${idx}_bss_opmode_cap_reqd="0"
		nvram set wl${idx}_rxchain_pwrsave_enable="1"
		nvram set wl${idx}_rxchain_pwrsave_quiet_time="1800"
		nvram set wl${idx}_rxchain_pwrsave_pps="10"
		nvram set wl${idx}_rxchain_pwrsave_stas_assoc_check="0"
		nvram set wl${idx}_radio_pwrsave_enable="0"
		nvram set wl${idx}_radio_pwrsave_quiet_time="1800"
		nvram set wl${idx}_radio_pwrsave_pps="10"
		nvram set wl${idx}_radio_pwrsave_level="0"
		nvram set wl${idx}_radio_pwrsave_stas_assoc_check="0"
		nvram set wl${idx}_mode="ap"
		nvram set wl${idx}_lazywds="0"
		nvram set wl${idx}_wds=""
		nvram set wl${idx}_wds_timeout="1"
		nvram set wl${idx}_wep="disabled"
		nvram set wl${idx}_auth="0"
		nvram set wl${idx}_key="1"
		nvram set wl${idx}_key1=""
		nvram set wl${idx}_key2=""
		nvram set wl${idx}_key3=""
		nvram set wl${idx}_key4=""
		nvram set wl${idx}_maclist=""
		nvram set wl${idx}_macmode="disabled"
		nvram set wl${idx}_assoc_retry_max="3"
		#dfs parameters
			nvram set wl${idx}_reg_mode="h"

		if [ "$idx" = "0" ]; then
			#5G
			nvram set wl${idx}_chanspec="36"
		else
			nvram set wl${idx}_chanspec="6"
		fi
		#probresp_sw
		nvram set wl${idx}_probresp_sw="1"
		nvram set wl${idx}_rate="0"
		nvram set wl${idx}_mrate="0"
		nvram set wl${idx}_frameburst="on"
		nvram set wl${idx}_rateset="default"
		nvram set wl${idx}_frag="2346"
		nvram set wl${idx}_rts="2346"
		nvram set wl${idx}_dtim="1"
		nvram set wl${idx}_bcn="100"
		nvram set wl${idx}_bcn_rotate="1"
		nvram set wl${idx}_plcphdr="short"
		nvram set wl${idx}_gmode="1"
		nvram set wl${idx}_gmode_protection="auto"
		nvram set wl${idx}_wme="on"
		nvram set wl${idx}_wme_bss_disable="0"
		nvram set wl${idx}_antdiv="-1"
		nvram set wl${idx}_infra="1"
		nvram set wl${idx}_bw_cap="3"
		nvram set wl${idx}_nmcsidx="-1"
		nvram set wl${idx}_nmode="-1"
		nvram set wl${idx}_rifs_advert="auto"
		nvram set wl${idx}_vlan_prio_mode="off"
		nvram set wl${idx}_leddc="0x640000"
		nvram set wl${idx}_rxstreams="0"
		nvram set wl${idx}_txstreams="0"
		nvram set wl${idx}_stbc_tx="auto"
		nvram set wl${idx}_stbc_rx="1"
		nvram set wl${idx}_ampdu="auto"

		# Default AMPDU retry limit per-tid setting 
		nvram set wl${idx}_ampdu_rtylimit_tid="5 5 5 5 5 5 5 5"

		# Default AMPDU regular rate retry limit per-tid setting 
		nvram set wl${idx}_ampdu_rr_rtylimit_tid="2 2 2 2 2 2 2 2"

		nvram set wl${idx}_amsdu="auto"
		nvram set wl${idx}_nmcsidx="-1"

		# WPA parameters 
		nvram set wl${idx}_auth_mode="none"
		nvram set wl${idx}_wpa_psk=""
		nvram set wl${idx}_wpa_gtk_rekey="0"
		nvram set wl${idx}_radius_ipaddr=""
		nvram set wl${idx}_radius_key=""
		nvram set wl${idx}_radius_port="1812"
		nvram set wl${idx}_crypto="tkip+aes"
		nvram set wl${idx}_net_reauth="36000"
		nvram set wl${idx}_akm=""
		nvram set wl${idx}_psr_mrpt="0"
	done
}

# WSC parameters
init_nvram_wsc() {
	nvram set wps_version2="enabled"
	nvram set wps_device_pin="89208885"
	nvram set wps_modelname="TL-WDR3680"
	nvram set wps_mfstring="TP-Link"
	nvram set wps_device_name="Wireless Router TL-WDR3680"
	nvram set wps_sta_pin="00000000"
	nvram set wps_modelnum="123456"
	nvram set wps_wer_mode="allow"
	nvram set lan_wps_oob="enabled"
	nvram set lan_wps_reg="enabled"
	nvram set lan1_wps_oob="enabled"
	nvram set lan1_wps_reg="enabled"
	nvram set wps_random_ssid_prefix="TP-Link_"
	for idx in 0 1; do
		nvram set wl${idx}_wps_reg="enabled"
		nvram set wl${idx}_wps_mode="enabled"
		nvram set wl${idx}_wps_config_state="0"
		nvram set wl${idx}_wfi_enable="0"
		nvram set wl${idx}_wfi_pinmode="0"
	done
}

# WME parameters
init_nvram_wme() {
	for idx in 0 1; do
		nvram set wl${idx}_wme_sta_be="15 1023 3 0 0 off off"
		nvram set wl${idx}_wme_sta_bk="15 1023 7 0 0 off off"
		nvram set wl${idx}_wme_sta_vi="7 15 2 6016 3008 off off"
		nvram set wl${idx}_wme_sta_vo="3 7 2 3264 1504 off off"

		# EDCA parameters for AP 
		nvram set wl${idx}_wme_ap_be="15 63 3 0 0 off off"
		nvram set wl${idx}_wme_ap_bk="15 1023 7 0 0 off off"
		nvram set wl${idx}_wme_ap_vi="7 15 1 6016 3008 off off"
		nvram set wl${idx}_wme_ap_vo="3 7 2 3264 1504 off off"

		nvram set wl${idx}_wme_no_ack="off"
		nvram set wl${idx}_wme_apsd="on"

		nvram set wl${idx}_wme_txp_be="7 3 6 2 0"
		nvram set wl${idx}_wme_txp_bk="7 3 6 2 0"
		nvram set wl${idx}_wme_txp_vi="7 3 6 2 0"
		nvram set wl${idx}_wme_txp_vo="7 3 6 2 0"
	done
}

# config router mini
init_nvram_routermini() {
	local sysmode=`uci get sysmode.sysmode.mode`
	local onemesh_enable=`uci get onemesh.onemesh.enable`
	local smart_enable=`uci get wireless.smart.smart_enable`

	[ -z "$sysmode" ] && sysmode="router"
	[ -z "$onemesh_enable" ] && onemesh_enable="on"
	[ -z "$smart_enable" ] && smart_enable="off"

	for idx in 0 1; do
		nvram set wl${idx}_maxassoc="128"
		nvram set wl${idx}_bss_maxassoc="128"

		nvram set wl${idx}_unit="1"
		nvram set wl${idx}_sta_retry_time="5"

	done
}

# EMF defaults
init_nvram_emf() {
	nvram set emf_entry=""
	nvram set emf_uffp_entry=""
	nvram set emf_rtport_entry=""
	nvram set emf_enable="1"
}

# IPv6
init_nvram_IPv6() {
	nvram set lan_ipv6_mode="3"
	nvram set lan_ipv6_dns=""
	nvram set lan_ipv6_6to4id="0"
	nvram set lan_ipv6_prefix="2001:db8:1:0::/64"
	nvram set wan_ipv6_prefix="2001:db0:1:0::/64"
}

# Restore defaults
init_nvram_defaults() {
	nvram set restore_defaults="0"
	nvram set samba_mode=""
	nvram set samba_passwd=""
	nvram set igmp_enable="0"
	nvram set et_txq_thresh="1024"
	nvram set dpsta_ifnames=""
	nvram set dpsta_policy="1"
	nvram set dpsta_lan_uif="1"
	for idx in 0 1; do
		nvram set wl${idx}_wet_tunnel="0"
		nvram set wl${idx}_trf_mgmt_rssi_policy="0"
		nvram set wl${idx}_wmf_ucigmp_query="0"
		nvram set wl${idx}_wmf_mdata_sendup="0"
		nvram set wl${idx}_wmf_ucast_upnp="0"
	done
}

# TX Beamforming
init_nvram_txbeamform() {
	for idx in 0 1; do
			nvram set wl${idx}_txbf_imp="1"
	done
}


# TX mu_mimo
wifi_mu_mimo_config() {

	local dev="$1"
	config_get band $dev band
	config_get mu_mimo $dev mu_mimo
	
	case $band in
		2g)
			HOME_WIFI=wl1.1
		;;
		5g)
			HOME_WIFI=wl0.1
		;;
	esac

	#For 11ax
	#VHT_SU = 1
	#VHT_MU = 3
	#HE_SU  = 4
	#HE_MU  = 12
	#close pmf(protected management frame)
	nvram set ${HOME_WIFI}_mfp="0"
	if [ "${mu_mimo}" = "on" ]; then
		nvram set ${HOME_WIFI}_txbf_bfr_cap="15"
		nvram set ${HOME_WIFI}_txbf_bfe_cap="15"
		nvram set ${HOME_WIFI}_mu_features="1"
	elif [ "${mu_mimo}" = "off" ]; then
		nvram set ${HOME_WIFI}_txbf_bfr_cap="15"
		nvram set ${HOME_WIFI}_txbf_bfe_cap="15"
		nvram set ${HOME_WIFI}_mu_features="0"
	fi	

}

# TX AirtimeFairness
wifi_atf_config()
{
	local dev="$1"
	config_get airtime_fairness $dev airtime_fairness

	config_get band $dev band
	case $band in
		2g)
			HOME_WIFI=wl1
		;;
		5g)
			HOME_WIFI=wl0
		;;
	esac
	
	if [ "${airtime_fairness}" = "on" ]; then
		nvram set ${HOME_WIFI}_atf="1"
    elif [ "${airtime_fairness}" = "off" ]; then
		nvram set ${HOME_WIFI}_atf="0"
    fi
}

# PsPretend threshold and retry_limit 
init_nvram_pspretend() {
	for idx in 0 1; do
		nvram set wl${idx}_pspretend_threshold="0"
		nvram set wl${idx}_pspretend_retry_limit="0"
	done
}

# acsd setting
init_nvram_acsd() {
	for idx in 0 1; do
		nvram set wl${idx}_acs_fcs_mode="0"
		nvram set wl${idx}_dcs_csa_unicast="0"
		nvram set wl${idx}_acs_excl_chans=""
		nvram set wl${idx}_acs_dfs="2"
		nvram set wl${idx}_acs_dfsr_immediate="300 3"
		nvram set wl${idx}_acs_dfsr_deferred="604800 5"
		nvram set wl${idx}_acs_dfsr_activity="30 10240"
		nvram set wl${idx}_acs_start_on_nondfs="1"
		nvram set wl${idx}_acs_cs_scan_timer="900"
		nvram set wl${idx}_acs_ci_scan_timer="4"
		nvram set wl${idx}_acs_ci_scan_timeout="300"
		nvram set wl${idx}_acs_scan_entry_expire="3600"
		nvram set wl${idx}_acs_tx_idle_cnt="5"
		nvram set wl${idx}_acs_chan_dwell_time="30"
		nvram set wl${idx}_acs_chan_flop_period="30"
		nvram set wl${idx}_intf_speriod="50"
		nvram set wl${idx}_intf_scnt="5"
		nvram set wl${idx}_intf_swin="7"
		nvram set wl${idx}_intf_drate="0"
		nvram set wl${idx}_intf_rrate="0"
		nvram set wl${idx}_intf_glitch="0"
		nvram set wl${idx}_intf_txbad="0"
		nvram set wl${idx}_intf_txnoack="0x4000f"
		#disable txfail for acsdv2
		nvram set wl${idx}_acs_ignore_txfail="1"
		#set zero-wait dfs
		nvram set wl${idx}_acs_bgdfs_enab="1"
	done
	nvram set acs_ctrl_chan_adjust="0"
}

# system run produce
init_nvram_run() {
	for idx in 0 1; do
		nvram set wl${idx}_mimo_preamble=""
		nvram set wl${idx}_bridge=""
		nvram set wl${idx}_tpc_db="0"
		nvram set wl${idx}_txchain="3" #need to check
		nvram set wl${idx}_rxchain="3" #need to check
		nvram set wl${idx}_nmode_protection="auto"
		nvram set wl${idx}_rifs=""
		nvram set wl${idx}_ure=""
		nvram set wl${idx}_preauth=""
		nvram set wl${idx}_dwds="0"
		nvram set wl${idx}_wmf_psta_disable=""
		nvram set wl${idx}_intfer_speriod=""
		nvram set wl${idx}_intfer_scount=""
		nvram set wl${idx}_intfer_swindow=""
		nvram set wl${idx}_intfer_dmarate=""
		nvram set wl${idx}_intfer_retryrate=""
		nvram set wl${idx}_intfer_glitch=""
		nvram set wl${idx}_intfer_txbad=""
		nvram set wl${idx}_intfer_txnoack=""
	done
	nvram set wps_proc_status="0"
	nvram set wps_config_method="0x2688"
	nvram set wps_aplockdown="0"

	nvram set landevs="eth1 eth2 eth3 eth4 eth5 wl0 wl1"
	nvram set wfi_cmd=""
	nvram set wfi_error=""
	nvram set coma_sleep=""
	nvram set partialboots="0"
	nvram set br0_ifname="br-lan"
	nvram set br0_ifnames="eth1 eth2 eth3 eth4 eth5 wl0 wl1"
}

# wan0 
init_nvram_wan0() {
	nvram set wan0_mtu="1500"
	nvram set wan0_ipv6_prefix="2001:db0:1:0::/64"

	nvram set wan0_ifname="eth0"
	nvram set wan0_ifnames="eth0"
	nvram set wan0_hwname=""
	nvram set wan0_hwaddr=""

	nvram set wan0_proto="dhcp"
	nvram set wan0_ipaddr="0.0.0.0"
	nvram set wan0_netmask="0.0.0.0"
	nvram set wan0_gateway="0.0.0.0"
	nvram set wan0_dns=""
	nvram set wan0_wins=""
	nvram set wan0_hostname=""
	nvram set wan0_domain=""
	nvram set wan0_lease="86400"

	nvram set wan0_pppoe_ifname=""
	nvram set wan0_pppoe_username=""
	nvram set wan0_pppoe_passwd=""
	nvram set wan0_pppoe_idletime="60"
	nvram set wan0_pppoe_keepalive="0"
	nvram set wan0_pppoe_demand="0"
	nvram set wan0_pppoe_mru="1492"
	nvram set wan0_pppoe_mtu="1492"
	nvram set wan0_pppoe_service=""
	nvram set wan0_pppoe_ac=""

	nvram set wan0_desc="Default Connection"
	nvram set wan0_route=""
	nvram set wan0_primary="1"
	nvram set wan0_unit="0"
}

init_anti_clog_thresh() {
	#wlx_sae_anti_clog_threshold used by hostapd assign to sae_anti_clogging_threshold
	#ap will reject sta auth for no anti clogging token is required in wpa3 auth 
	#if connect requests more than this threshold
	for idx in 0 1; do
		nvram set wl${idx}_sae_anti_clog_threshold="5"	
	done
}

init_nvram_router() {
	# os parameters and version
	init_nvram_os

	# Miscellaneous parameters 
	init_nvram_misc

	# Big switches 
	init_nvram_switch

	# Lan parameters
	init_nvram_lan

	# Wan parameters
	init_nvram_wan
	
	# Filters 
	init_nvram_filter

	# Port forwards 
	init_nvram_port

	# Qos
	init_nvram_qos
	
	# DHCP server parameters 
	init_nvram_dhcp

	# Web server parameters 
	init_nvram_web

	#add by zhangshengbo for hostapd
	init_nvram_hostapd

	# ax6000 wireless nvram only
	#init_nvram_ax6000_only
	
	# Wireless parameters
	init_nvram_wireless

	# Wireless phy_ed_thresh
	init_nvram_phy_ed_thresh

	# WSC parameters
	init_nvram_wsc

	# WME parameters
	init_nvram_wme

	# config router mini
	init_nvram_routermini

	# EMF defaults
	init_nvram_emf

	# IPv6
	init_nvram_IPv6

	# Restore defaults
	init_nvram_defaults

	# TX Beamforming
	init_nvram_txbeamform

	# PsPretend threshold and retry_limit 
	init_nvram_pspretend

	# acsd setting
	init_nvram_acsd

	# system run produce
	init_nvram_run

	# wan0
	init_nvram_wan0
	
	# anti clog
	init_anti_clog_thresh
}

# DUT special feature cfg
init_feature_config() {
	local wlan_support_11ac=""
	wlan_support_11ac=`cat $BRCM_WLAN_CONFIG | awk '$1=="'wlan_support_11ac'" {print $2}'`
	if [ "$wlan_support_11ac" = "yes" ]; then
		nvram set wl_txchain=3
		nvram set wl_rxchain=3
		nvram set wl0_phytype=h
		nvram set wl1_phytype=v
	else
		nvram set wl_txchain=3
		nvram set wl_rxchain=3
		nvram set wl0_phytype=n
		nvram set wl1_phytype=n
	fi
}

# mac cfg
init_nvram_mac() {
	lanmacaddr=`network_get_firm lan`
	lanmacaddr=${lanmacaddr//-/:}
	lanmacaddr=` echo $lanmacaddr | tr '[A-F]' '[a-f]' `
	nvram set et0macaddr="$lanmacaddr"
	#for wpa3
	nvram set lan_hwaddr="$lanmacaddr"

	for dev in $DEVICES; do
		config_get band "$dev" band
		case "$band" in
			2g)
				config_get macaddr "$dev" macaddr
				macaddr=${macaddr//-/:}
				#nvram set 1:macaddr="${macaddr}"
				nvram kset 2:macaddr="${macaddr}"
			;;
			5g)
				config_get macaddr "$dev" macaddr
				macaddr=${macaddr//-/:}
				#nvram set 0:macaddr="${macaddr}"
				nvram kset 1:macaddr="${macaddr}"
			;;
		esac
	done

	#nvram set wl_txq_thresh="1024"
	#nvram set wl0_nband="2"
	#nvram set wl1_nband="1"
	#nvram set wl0_phytype="h"
	#nvram set wl1_phytype="v"
	#nvram set is_modified="0"
}

init_nvram_wl() {
	nvram set wl_radius_port="1812"
	nvram set wl_txstreams="0"
	nvram set wl_rxchain_pwrsave_pps="10"
	nvram set wl_assoc_retry_max="3"
	nvram set wl1_acs_fcs_mode="0"
	nvram set wl1_acs_dfsr_activity="30 10240"
	nvram set wl_dwds="1"
	nvram set wl_intfer_retryrate=""
	nvram set wl_version="6.37.14.93"
	nvram set wl_maxassoc="128"
	nvram set wl_txbf_bfr_cap="1"
	nvram set wl1_bss_hs2_enabled="1"
	nvram set wl_phytypes=""
	nvram set wl_rxchain_pwrsave_stas_assoc_check="0"
	nvram set wl_leddc="0x640000"
	nvram set wl_infra="1"
	nvram set wl_chanspec="11"
	nvram set wl_stbc_tx="auto"
	nvram set wl_acs_dfsr_immediate="300 3"
	nvram set wl_wme_apsd="on"
	nvram set wl_radius_ipaddr=""
	nvram set wl_acs_chan_dwell_time="30"
	nvram set wl_intf_scnt="5"
	nvram set wl_net_reauth="36000"
	nvram set wl_acs_dfsr_deferred="604800 5"
	nvram set wl_intf_txbad="0"
	nvram set wl_mrate="0"
	nvram set wl_wmf_bss_enable="1"
	nvram set wl_akm=""
	nvram set wl_wmf_mdata_sendup="0"
	nvram set wl_wme_bss_disable="0"
	nvram set wl_ampdu_rr_rtylimit_tid="2 2 2 2 2 2 2 2"
	nvram set wl_gmode="1"
	nvram set wl_ampdu="auto"
	nvram set wl_wme_sta_vi="7 15 2 6016 3008 off off"
	nvram set wl_acs_scan_entry_expire="3600"
	nvram set wl_wme_ap_be="15 63 3 0 0 off off"
	nvram set wl_plcphdr="short"
	nvram set wl_wme_sta_vo="3 7 2 3264 1504 off off"
	nvram set wl_macmode="disabled"
	nvram set wl_mimo_preamble=""
	nvram set wl_wme_ap_bk="15 1023 7 0 0 off off"
	nvram set wl_lazywds="0"
	nvram set wl_mcast_regen_bss_enable="1"
	nvram set wl_intf_rrate="0"
	nvram set wl_intf_swin="7"
	nvram set wl_auth_mode="none"
	nvram set wl_intfer_txnoack=""
	nvram set wl_intf_txnoack="0x4000f"
	nvram set wl_wpa_psk=""
	nvram set wl_mode="ap"
	nvram set wl_intfer_dmarate=""
	nvram set wl_wpa_gtk_rekey="0"
	nvram set wl_wme_txp_vi="7 3 6 2 0"
	nvram set wl_wme_txp_vo="7 3 6 2 0"
	nvram set wl_acs_ci_scan_timeout="300"
	nvram set wl_wds_timeout="1"
	nvram set wl_wps_mode="enabled"
	nvram set wl_intfer_glitch=""
	nvram set wl_ssid="TP-Link"
	nvram set wl_dtim="1"
	nvram set wl_trf_mgmt_rssi_policy="0"
	nvram set wl_acs_dfs="2"
	nvram set wl_key1=""
	nvram set wl_amsdu="auto"
	nvram set wl_key2=""
	nvram set wl_key3=""
	nvram set wl_country_code="US"
	nvram set wl_key4=""
	nvram set wl_hwaddr=""
	nvram set wl_rxchain="3"
	nvram set wl_vlan_prio_mode="off"
	nvram set wl_pspretend_retry_limit="0"
	nvram set wl_rifs_advert="auto"
	nvram set wl_nmode="-1"
	nvram set wl_rxstreams="0"
	nvram set wl_wps_reg="enabled"
	nvram set wl_rate="0"
	nvram set wl_intfer_scount=""
	nvram set wl_intf_glitch="0"
	nvram set wl_rxchain_pwrsave_quiet_time="1800"
	nvram set wl_radio_pwrsave_pps="10"
	nvram set wl_acs_cs_scan_timer="900"
	nvram set wl_acs_tx_idle_cnt="5"
	nvram set wl_intfer_txbad=""
	nvram set wl_intfer_swindow=""
	nvram set wl_rateset="default"
	nvram set wl_crypto="tkip+aes"
	nvram set wl0_bss_hs2_enabled="1"
	nvram set wl_acs_chan_flop_period="30"
	nvram set wl_acs_excl_chans=""
	nvram set wl_radius_key=""
	nvram set wl_acs_fcs_mode="0"
	nvram set wl_rxchain_pwrsave_enable="1"
	nvram set wl_psr_mrpt="0"
	nvram set wl_unit="1"
	nvram set wl_nmode_protection="auto"
	nvram set wl_radio_pwrsave_enable="0"
	nvram set wl_radio_pwrsave_stas_assoc_check="0"
	nvram set wl_wds=""
	nvram set wl_acs_dfsr_activity="30 10240"
	nvram set wl_wet_tunnel="0"
	nvram set wl_wmf_ucast_upnp="0"
	nvram set wl_bw_cap="3"
	nvram set wl_wfi_enable="0"
	nvram set wl_wfi_pinmode="0"
	nvram set wl_acs_ci_scan_timer="4"
	nvram set wl_wme="on"
	nvram set wl_wmf_psta_disable=""
	nvram set wl_intfer_speriod=""
	nvram set wl_wme_ap_vi="7 15 1 6016 3008 off off"
	nvram set wl_intf_speriod="50"
	nvram set wl_auth="0"
	nvram set wl_wme_ap_vo="3 7 2 3264 1504 off off"
	nvram set wl_frameburst="on"
	nvram set wl_bss_maxassoc="128"
	nvram set wl_ifname=""
	nvram set wl_wep="disabled"
	nvram set wl_ampdu_rtylimit_tid="5 5 5 5 5 5 5 5"
	nvram set wl_intf_drate="0"
	nvram set wl_gmode_protection="auto"
	nvram set wl_frag="2346"
	nvram set wl_preauth=""
	nvram set wl_maclist=""
	nvram set wl_rifs=""
	nvram set wl_bcn_rotate="1"
	nvram set wl_ure=""
	nvram set wl_bss_opmode_cap_reqd="0"
	nvram set wl_wps_config_state="0"
	nvram set wl_wme_sta_be="15 1023 3 0 0 off off"
	nvram set wl_radioids=""
	nvram set wl_wmf_ucigmp_query="0"
	nvram set wl_corerev=""
	nvram set wl_nmcsidx="-1"
	nvram set wl_wme_sta_bk="15 1023 7 0 0 off off"
	nvram set wl_pspretend_threshold="0"
	nvram set wl_radio="1"
	nvram set wl_stbc_rx="1"
	nvram set wl_radio_pwrsave_quiet_time="1800"
	nvram set wl_rts="2346"
	nvram set wl_ap_isolate="0"
	nvram set wl_dcs_csa_unicast="0"
	nvram set wl_country_rev="0"
	nvram set wl_txchain="3"
	nvram set wl_wme_no_ack="off"
	nvram set wl_key="1"
	nvram set wl_bss_enabled="1"
	nvram set wl_bridge=""
	nvram set wl_wme_txp_be="7 3 6 2 0"
	nvram set wl_sta_retry_time="5"
	nvram set wl_closed="0"
	nvram set wl_wme_txp_bk="7 3 6 2 0"
	nvram set wl_tpc_db="0"
	nvram set wl_bcn="100"
	nvram set wl_reg_mode="off"
	nvram set wl_txbf_bfe_cap="1"
	nvram set wl_radio_pwrsave_level="0"
	nvram set wl_antdiv="-1"
}

init_nvram_wifi_start() {
	nvram set wifi_start="0"
	nvram set meshd_wifi_up="0"
}

wifi_nvram_default_restore() {
	init_nvram_wps
	init_nvram_radio
	init_nvram_router
	init_nvram_wl
	init_nvram_mac
	#add by zhangshengbo
	init_nvram_wifi_start
}

wifi_chanspec_config() {
	local tmpChanspec
	local cw
	local countrycode=""
	htmode=$2
	channel=$3
	if [ $channel = "auto" ]; then
		tmpChanspec="0"
	else
		case $channel in
		1|2|3|4|5)
			if [ $htmode = "auto" ]; then
				cw=40
				tmpChanspec="${channel}l"
			elif [ $htmode = "20" ]; then
				tmpChanspec="$channel"
			elif [ $htmode = "40" ]; then
				tmpChanspec="${channel}l"
			fi
		;;
		6|7|8|9|10|11|12|13)
			if [ $htmode = "auto" ]; then
				cw=40
				tmpChanspec="${channel}u"
			elif [ $htmode = "20" ]; then
				tmpChanspec="$channel"
			elif [ $htmode = "40" ]; then
				tmpChanspec="${channel}u"
			fi
		;;
		36|44|52|60|100|108)
			if [ $htmode = "auto" ]; then
				cw=80
				tmpChanspec="${channel}/80"
			elif [ $htmode = "20" ]; then
				tmpChanspec="$channel"
			elif [ $htmode = "40" ]; then
				tmpChanspec="${channel}l"
			elif [ $htmode = "80" ]; then
				tmpChanspec="${channel}/80"
			elif [ $htmode = "160" ]; then
				tmpChanspec="${channel}/160"
			fi
		;;
		132)
			countrycode=`getfirm COUNTRY`
			if [ $htmode = "auto" ]; then
				if [ "$countrycode" = "DE" ] || [ "$countrycode" = "JP" ]; then
					tmpChanspec="${channel}l"	
					#for AX73EU/JP, donot support ch 144
					#so ch132-140 donot support 80M
					#ch140 donnot support 40M
					#support channels: 132 136 140 132/40(132l) 136/40(136u)					
				else
					cw=80
					tmpChanspec="${channel}/80"
				fi			
			elif [ $htmode = "20" ]; then
				tmpChanspec="$channel"
			elif [ $htmode = "40" ]; then
				tmpChanspec="${channel}l"
			elif [ $htmode = "80" ]; then
				tmpChanspec="${channel}/80"
			fi
		;;	
		140)
			countrycode=`getfirm COUNTRY`
			if [ $htmode = "auto" ]; then
				if [ "$countrycode" = "DE" ] || [ "$countrycode" = "JP" ]; then
					tmpChanspec="$channel"	
					#for AX73EU/JP, donot support ch 144
					#so ch132-140 donot support 80M
					#ch140 donnot support 40M
					#support channels: 132 136 140 132/40(132l) 136/40(136u)					
				else
					cw=80
					tmpChanspec="${channel}/80"
				fi			
			elif [ $htmode = "20" ]; then
				tmpChanspec="$channel"
			elif [ $htmode = "40" ]; then
				tmpChanspec="${channel}l"
			elif [ $htmode = "80" ]; then
				tmpChanspec="${channel}/80"
			fi
		;;
		149|157)
			if [ $htmode = "auto" ]; then
				cw=80
				tmpChanspec="${channel}/80"
			elif [ $htmode = "20" ]; then
				tmpChanspec="$channel"
			elif [ $htmode = "40" ]; then
				tmpChanspec="${channel}l"
			elif [ $htmode = "80" ]; then
				tmpChanspec="${channel}/80"
			fi
		;;
		40|48|56|64|104|112)
			if [ $htmode = "auto" ]; then
				cw=80
				tmpChanspec="${channel}/80"
			elif [ $htmode = "20" ]; then
				tmpChanspec="$channel"
			elif [ $htmode = "40" ]; then
				tmpChanspec="${channel}u"
			elif [ $htmode = "80" ]; then
				tmpChanspec="${channel}/80"
			elif [ $htmode = "160" ]; then
				tmpChanspec="${channel}/160"
			fi
		;;
		136)
			countrycode=`getfirm COUNTRY`
			if [ $htmode = "auto" ]; then
				if [ "$countrycode" = "DE" ] || [ "$countrycode" = "JP" ]; then
					tmpChanspec="${channel}u"	
					#for AX73EU/JP, donot support ch 144
					#so ch132-140 donot support 80M
					#ch140 donnot support 40M
					#support channels: 132 136 140 132/40(132l) 136/40(136u)					
				else
					cw=80
					tmpChanspec="${channel}/80"
				fi
			elif [ $htmode = "20" ]; then
				tmpChanspec="$channel"
			elif [ $htmode = "40" ]; then
				tmpChanspec="${channel}u"
			elif [ $htmode = "80" ]; then
				tmpChanspec="${channel}/80"
			fi
		;;
		144|153|161)
			if [ $htmode = "auto" ]; then
				cw=80
				tmpChanspec="${channel}/80"
			elif [ $htmode = "20" ]; then
				tmpChanspec="$channel"
			elif [ $htmode = "40" ]; then
				tmpChanspec="${channel}u"
			elif [ $htmode = "80" ]; then
				tmpChanspec="${channel}/80"
			fi
		;;
		116|120|124|128)
			if [ $htmode = "auto" ]; then
				cw=80
				tmpChanspec="${channel}/80"
			elif [ $htmode = "20" ]; then
				tmpChanspec="$channel"
			elif [ $htmode = "40" ]; then
				tmpChanspec="${channel}u"
			elif [ $htmode = "80" ]; then
				tmpChanspec="${channel}/80"
			elif [ $htmode = "160" ]; then
				tmpChanspec="${channel}/160"
			fi
		;;
		165)
			tmpChanspec="$channel"
		;;

		*)
			echo "ERROR: the channel you set is not correct!!!" >$CONSOLE
		;;
		esac
	fi

	export ${NO_EXPORT:+-n} "$1=$tmpChanspec"
}

# set home wifi
wifi_basic_config() {
	local dev="$1"
	local wds_enable="0"
	local dwds_mode="ap"
	local eth_enable="0"
	local guest_enbale="0"
	local backhaul_enable="0"
	local onemesh_config_enable="0"
	local home_vif=""
	local wds_vif=""
	local vif=""
	echo "=====>>>>> $dev: wifi_basic_config" >$STDOUT

	config_get country $dev country
	config_get band $dev band
	config_get hwmode $dev hwmode
	config_get htmode $dev htmode
	config_get channel $dev channel
	echo "=====>>>>> $dev: hwmode is $hwmode, htmode is $htmode" >$STDOUT


		config_get vifs $dev vifs
	for vif in $vifs; do # vifs is wl01/wl02/wl03, wds/guest/home
			config_get_bool enable $vif enable
			config_get mode $vif mode

			config_get guest $vif guest
		config_get backhaul $vif backhaul
		config_get onemesh_config $vif onemesh_config
			if [ "$enable" = "1" -a "$mode" = "ap" -a -z "$guest" -a -z "$backhaul" ]; then
				eth_enable="1"
				home_vif=$vif
				echo "=====>>>>> $dev: HOME WIFI is on" >$STDOUT
		elif [ "$enable" = "1" -a "$mode" = "ap" -a "$guest" = "on" ]; then
			eth_enable="1"
			guest_enable="1"
		elif [ "$enable" = "1" -a "$mode" = "ap" -a "$backhaul" = "on" ]; then
			eth_enable="1"
			backhaul_enable="1"
		elif [ "$enable" = "1" -a "$mode" = "ap" -a "$onemesh_config" = "on" ]; then
			eth_enable="1"
			onemesh_config_enable="1"
			elif [ "$enable" = "1" -a "$mode" = "sta" ]; then
				eth_enable="1"
				wds_enable="1"
				#get dwds mode
				config_get dwds_mode $vif dwds_mode
				wds_vif=$vif
			echo "=====>>>>> $dev: $vif WDS is on" >$STDOUT
			else
				echo "=====>>>>> $dev: vif $vif is disabled or $vif is a guest/backhaul network" >$STDOUT
			fi
		done


	case $band in
		2g)
			vif="$home_vif"
			HOME_WIFI="wl1"
			if [ "$wds_enable" = "1" ]; then
				HOME_2G_VIF="$home_vif"
			fi
		;;
		5g)
			vif="$home_vif"
			HOME_WIFI="wl0"
			if [ "$wds_enable" = "1" ]; then
				HOME_5G_VIF="$home_vif"
			fi
		;;
	esac

	local tmpCode=""
	tmpCode=`cat $BRCM_COUNTRYCODE | awk '$1=="'"$country"'" {print $2}'`
	if [ "$tmpCode" = "DE" ]; then
		nvram set ${HOME_WIFI}_country_code="$tmpCode"
		nvram set ${HOME_WIFI}_country_rev="$COUNTRYCODE_DE"
	elif [ "$tmpCode" = "Q2" ]; then
		nvram set ${HOME_WIFI}_country_code="$tmpCode"
		nvram set ${HOME_WIFI}_country_rev="$COUNTRYCODE_Q2"
	elif [ "$tmpCode" = "US" ]; then
		nvram set ${HOME_WIFI}_country_code="$tmpCode"
		nvram set ${HOME_WIFI}_country_rev="$COUNTRYCODE_US"
	elif [ "$tmpCode" = "CA" ]; then
		nvram set ${HOME_WIFI}_country_code="$tmpCode"
		nvram set ${HOME_WIFI}_country_rev="$COUNTRYCODE_CA"
	elif [ "$tmpCode" = "JP" ]; then
		nvram set ${HOME_WIFI}_country_code="$tmpCode"
		nvram set ${HOME_WIFI}_country_rev="$COUNTRYCODE_JP"
	elif [ "$tmpCode" = "KR" ]; then
		nvram set ${HOME_WIFI}_country_code="$tmpCode"
		nvram set ${HOME_WIFI}_country_rev="$COUNTRYCODE_KR"
	elif [ "$tmpCode" = "UN" ]; then
		nvram set ${HOME_WIFI}_country_code="KR"
		nvram set ${HOME_WIFI}_country_rev="$COUNTRYCODE_KR_UN"
	else
		nvram set ${HOME_WIFI}_country_code="$country"
		nvram set ${HOME_WIFI}_country_rev="$tmpCode"
	fi


	if [ "$eth_enable" = "1" ]; then
		config_get ssid $vif ssid
		nvram set ${HOME_WIFI}_ssid="$ssid"

		#set ax mode
		#* HE features bitmap.
		#* Bit 0:		HE 5G support
		#* Bit 1:		HE 2G support
		#* Bit 2:		HE DLMU (OFDMA and MUMIMO) support
		if [ "$hwmode" = "11ax" -o "$hwmode" = "11ax_5" -o "$hwmode" = "11bgnax" -o "$hwmode" = "11anacax" ]; then
			nvram set ${HOME_WIFI}_he_features="1"
		else
			nvram set ${HOME_WIFI}_he_features="0"
		fi
		
		# set nmode
		if [ "$hwmode" = "11b" -o "$hwmode" = "11g" -o "$hwmode" = "11bg" -o "$hwmode" = "11a" ]; then
			nvram set ${HOME_WIFI}_nmode="0"
		else
			nvram set ${HOME_WIFI}_nmode="-1"
		fi

		# set gmode
		if [ "$hwmode" = "11b" ]; then
			nvram set ${HOME_WIFI}_gmode="0"
		elif [ "$hwmode" = "11g" -o "$hwmode" = "11gn" ]; then
			nvram set ${HOME_WIFI}_gmode="2"
		else
			nvram set ${HOME_WIFI}_gmode="1"
		fi

		# set bss_opmode_cap_reqd
		if [ "$hwmode" = "11ax" -o "$hwmode" = "11ax_5" ]; then
			#set 11ax only mode
			nvram set ${HOME_WIFI}_bss_opmode_cap_reqd="4"
		elif [ "$hwmode" = "11n" -o "$hwmode" = "11nac" ]; then
			nvram set ${HOME_WIFI}_bss_opmode_cap_reqd="2"
		elif [ "$hwmode" = "11ac" ]; then
			nvram set ${HOME_WIFI}_bss_opmode_cap_reqd="3"
		else
			nvram set ${HOME_WIFI}_bss_opmode_cap_reqd="0"
		fi

		# set bw_cap
		if [ "$htmode" = "auto" ]; then
			if [ "$hwmode" = "11ac" -o "$hwmode" = "11anac" -o "$hwmode" = "11nac" -o "$hwmode" = "11ax_5" -o "$hwmode" = "11anacax" ]; then
				nvram set ${HOME_WIFI}_bw_cap="7"
			else
				nvram set ${HOME_WIFI}_bw_cap="3"
			fi
		elif [ "$htmode" = "160" ]; then
			nvram set ${HOME_WIFI}_bw_cap="15"
		elif [ "$htmode" = "80" ]; then
			nvram set ${HOME_WIFI}_bw_cap="7"
		elif [ "$htmode" = "40" ]; then
			nvram set ${HOME_WIFI}_bw_cap="3"
		else
			nvram set ${HOME_WIFI}_bw_cap="1"
		fi

		# set obss_coex
		if [ "$htmode" = "auto" ]; then
			nvram set ${HOME_WIFI}_obss_coex="1"
		else
			nvram set ${HOME_WIFI}_obss_coex="0"
		fi

		# set chanspec (wlanChspec)
		wifi_chanspec_config chanspec $htmode $channel

			nvram set ${HOME_WIFI}_chanspec="$chanspec"
		nvram set ${HOME_WIFI}_chanspec="$chanspec"

		# set radio
		nvram set ${HOME_WIFI}_radio="1"


	else
		nvram set ${HOME_WIFI}_radio="0"
	fi
	#iptv mcwifi
	config_load iptv
	config_get mcwifi_en iptv mcwifi_enable
	if [ "$mcwifi_en" = "on" ];then
	    nvram set wmf_igmp_enable=1
	else
	    nvram set wmf_igmp_enable=0
	fi
}

wifi_security_config() {
	local dev="$1"
	local close11N
	local wds_enable="0"
	local eth_enable="0"
	local home_vif=""
	local wds_vif=""
	local vif=""
	local WIFI_PRE=""
	local hwmode=""
	local change_flag="0"
	local enterp_change_flag="0"
	echo "=====>>>>> $dev: wifi_security_config" >$STDOUT

	config_get_bool wifi_disabled $dev disabled
	if [ "$wifi_disabled" = "0" ]; then
		config_get vifs $dev vifs
		for vif in $vifs; do # vifs is wl01/wl02/wl03, wds/guest/home
			config_get_bool enable $vif enable
			config_get mode $vif mode
			config_get guest $vif guest
			config_get backhaul $vif backhaul
			if [ "$enable" = "1" -a "$mode" = "ap" -a -z "$guest" -a -z "$backhaul" ]; then
				eth_enable="1"
				home_vif="$vif"
				echo "=====>>>>> $dev: HOME WIFI is on" >$STDOUT
			elif [ "$enable" = "1" -a "$mode" = "sta" ]; then
				eth_enable="1"
				wds_enable="1"
				wds_vif="$vif"
				echo "=====>>>>> $dev: $vif WDS is on" >$STDOUT
			else
				echo "=====>>>>> $dev: vif $vif is disabled or $vif is a guest/backhaul network" >$STDOUT
			fi
		done
	fi

	config_get band $dev band
	echo "=====>>>>> $dev: vif is $vif " >$STDOUT
	#DWDS
	config_get dwds_mode $vif dwds_mode
	
	case $band in
		2g)
			if [ "$wds_enable" = "1" -a "$dwds_mode" != "ap" ]; then
				vif="$home_vif"
				WIFI_PRE="wl1"
			else
				vif="$home_vif"
				WIFI_PRE="wl1.1"
			fi
		;;
		5g)
			if [ "$wds_enable" = "1" -a "$dwds_mode" != "ap" ]; then
				vif="$home_vif"
				WIFI_PRE="wl0"
			else
				vif="$home_vif"
				WIFI_PRE="wl0.1"
			fi
		;;
	esac

	if [ "$eth_enable" = "1" ]; then
		config_get mode $vif mode
		config_get encryption $vif encryption
		config_get psk_version $vif psk_version
		config_get psk_cipher $vif psk_cipher
		config_get wpa_version $vif wpa_version
		config_get wpa_cipher $vif wpa_cipher
		config_get hwmode $dev hwmode
		echo "=====>>>>> $dev: $vif, encryption $encryption, psk_version $psk_version, psk_cipher $psk_cipher" >$STDOUT
		close11N="0"

		if [ -z "$WIFI_PRE" ]; then
			echo "=====>>>>> $dev: dont set security for vif $vif" >$STDOUT
		else
		#changed by zhangshengbo for 6755 only support wpa/wpa2 security config as follows:
		#1.wpa2-psk + aes
		#2.wpa-psk/wpa2-psk + aes/tkip
		#3.wpa-psk/wpa2-psk + aes
		#
		#do not support wpa/wpa2 security config as follows:
		#1.wpa-psk + tkip
		#2.wpa-psk + aes
		#3.wpa-psk + aes/tkip
		#4.wpa2-psk + tkip
		#5.wpa2-psk + aes/tkip
		#6.wpa-psk/wpa2-psk + tkip
		#

			if [ "$encryption" == "psk" ]; then
				if [ "$psk_version" == "wpa" ]; then
					change_flag="1"
				elif [ "$psk_version" == "rsn" ]; then
					if [ "$psk_cipher" != "aes" ]; then
						change_flag="1"
					fi
				else
					if [ "$psk_cipher" == "tkip" ]; then
						change_flag="1"
					fi
				fi
			fi
			
			if [ "$change_flag" == "1" ]; then
				echo "===>>>security config not support, change to wpa2-psk + aes!!!" >/dev/console
				uci set wireless.$vif.psk_version=rsn
				uci set wireless.$vif.psk_cipher=aes
				psk_version="rsn"
				psk_cipher="aes"
				nvram set ${WIFI_PRE}_akm="psk2"
				nvram set ${WIFI_PRE}_crypto="aes"
				wifi_commit
			fi
		#changed by zhangshengbo for 6755 only support wpa/wpa2-enterprise security config as follows:
		#1.wpa2 + aes
		#2.wpa/wpa2 + aes/tkip
		#3.wpa/wpa2 + aes
		#
		#do not support wpa/wpa2 security config as follows:
		#1.wpa + tkip
		#2.wpa + aes
		#3.wpa + aes/tkip
		#4.wpa2 + tkip
		#5.wpa2 + aes/tkip
		#6.wpa/wpa2 + tkip
		#	
			if [ "$encryption" == "wpa" ]; then
				if [ "$wpa_version" == "wpa" ]; then
					enterp_change_flag="1"
				elif [ "$wpa_version" == "rsn" ]; then
					if [ "$wpa_cipher" != "aes" ]; then
						enterp_change_flag="1"
					fi
				else
					if [ "$wpa_cipher" == "tkip" ]; then
						enterp_change_flag="1"
					fi
				fi
			fi
			
			if [ "$enterp_change_flag" == "1" ]; then
				echo "===>>>security config not support, change to wpa2 + aes!!!" >/dev/console
				uci set wireless.$vif.wpa_version=rsn
				uci set wireless.$vif.wpa_cipher=aes
				wpa_version="rsn"
				wpa_cipher="aes"
				nvram set ${WIFI_PRE}_akm="wpa2"
				nvram set ${WIFI_PRE}_crypto="aes"
				wifi_commit
			fi
			
			
			if [ "$encryption" == "none" ]; then
				nvram set ${WIFI_PRE}_preauth=""
				nvram set ${WIFI_PRE}_wep="disabled"
				nvram set ${WIFI_PRE}_auth="0"
				nvram set ${WIFI_PRE}_akm=""
			elif [ "$encryption" == "psk" ]; then
				nvram set ${WIFI_PRE}_preauth=""
				if [ "$psk_version" == "wpa" ]; then
					nvram set ${WIFI_PRE}_akm="psk"
				elif [ "$psk_version" == "rsn" ]; then
					nvram set ${WIFI_PRE}_akm="psk2"
				else
					nvram set ${WIFI_PRE}_akm="psk psk2"
				fi
				if [ "$psk_cipher" == "aes" ]; then
					nvram set ${WIFI_PRE}_crypto="aes"
				elif [ "$psk_cipher" == "tkip" ]; then
					nvram set ${WIFI_PRE}_crypto="tkip"
					close11N="1"
				else
					if [ "$hwmode" == "11ax" -o "$hwmode" == "11ax_5" ]; then
						#ax only mode donnot support tkip
						nvram set ${WIFI_PRE}_crypto="aes"
					else
						nvram set ${WIFI_PRE}_crypto="tkip+aes"
					fi
				fi

				config_get psk_key $vif psk_key
				nvram set ${WIFI_PRE}_wpa_psk="$psk_key"
				config_get wpa_group_rekey $dev wpa_group_rekey
				if [ -z "$wpa_group_rekey" ]; then
					nvram set ${WIFI_PRE}_wpa_gtk_rekey="0"
				else
					nvram set ${WIFI_PRE}_wpa_gtk_rekey="$wpa_group_rekey"
				fi
				nvram set ${WIFI_PRE}_wep="disabled"
				nvram set ${WIFI_PRE}_auth="0"
			#add by zhangshengbo for wpa3 personal	
			elif [ "$encryption" == "psk_sae" ]; then
				nvram set ${WIFI_PRE}_preauth=""
				if [ "$psk_version" == "sae_transition" ]; then
					nvram set ${WIFI_PRE}_akm="psk2 sae"
				else
				#psk_version==sae_only
					nvram set ${WIFI_PRE}_akm="sae"
				fi
				nvram set ${WIFI_PRE}_crypto="aes"
				
				config_get psk_key $vif psk_key
				nvram set ${WIFI_PRE}_wpa_psk="$psk_key"
				config_get wpa_group_rekey $dev wpa_group_rekey
				if [ -z "$wpa_group_rekey" ]; then
					nvram set ${WIFI_PRE}_wpa_gtk_rekey="0"
				else
					nvram set ${WIFI_PRE}_wpa_gtk_rekey="$wpa_group_rekey"
				fi
				nvram set ${WIFI_PRE}_wep="disabled"
				nvram set ${WIFI_PRE}_auth="0"	
			elif [ "$encryption" == "wpa" ]; then
				#add by zhangshengbo, set wlx_preauth=0 temporarily
				#this para can be set to 0/1 for wpa-enterprise
				
				nvram set ${WIFI_PRE}_preauth="0"
				
				if [ "$wpa_version" == "wpa" ]; then
					nvram set ${WIFI_PRE}_akm="wpa"
				elif [ "$wpa_version" == "rsn" ]; then
					nvram set ${WIFI_PRE}_akm="wpa2"
				else
					nvram set ${WIFI_PRE}_akm="wpa wpa2"
				fi
				if [ "$wpa_cipher" == "aes" ]; then
					nvram set ${WIFI_PRE}_crypto="aes"
				elif [ "$wpa_cipher" == "tkip" ]; then
					nvram set ${WIFI_PRE}_crypto="tkip"
					close11N="1"
				else
					if [ "$hwmode" == "11ax" -o "$hwmode" == "11ax_5" ]; then
						#ax only mode donnot support tkip
						nvram set ${WIFI_PRE}_crypto="aes"
					else
						nvram set ${WIFI_PRE}_crypto="tkip+aes"
					fi
				fi

				config_get server $vif server
				nvram set ${WIFI_PRE}_radius_ipaddr="$server"
				config_get port $vif port
				nvram set ${WIFI_PRE}_radius_port="$port"
				config_get wpa_key $vif wpa_key
				nvram set ${WIFI_PRE}_radius_key="$wpa_key"
				config_get wpa_group_rekey $dev wpa_group_rekey
				if [ -z "$wpa_group_rekey" ]; then
					nvram set ${WIFI_PRE}_wpa_gtk_rekey="0"
				else
					nvram set ${WIFI_PRE}_wpa_gtk_rekey="$wpa_group_rekey"
				fi
				nvram set ${WIFI_PRE}_wep="disabled"
				nvram set ${WIFI_PRE}_auth="0"
			elif [ "$encryption" == "wep" ]; then
				nvram set ${WIFI_PRE}_preauth=""
				nvram set ${WIFI_PRE}_wep="enabled"
				config_get wep_mode $vif wep_mode
				if [ "$wep_mode" == "shared" ]; then
					nvram set ${WIFI_PRE}_auth="1"
				else
					nvram set ${WIFI_PRE}_auth="0"
				fi

				config_get wep_key1 $vif wep_key1
				nvram set ${WIFI_PRE}_key1="$wep_key1"
				nvram set ${WIFI_PRE}_key="1"
				nvram set ${WIFI_PRE}_akm=""
				close11N="1"
			else
				echo "ERROR: the encryption type error" >$CONSOLE
			fi
			if [ "$close11N" == "1" ]; then
				nvram set ${WIFI_PRE}_nmode="0"
				config_get channel $dev channel
				if [ "$channel" = "auto" ]; then
					nvram set ${WIFI_PRE}_chanspec="0"
				else
					nvram set ${WIFI_PRE}_chanspec="$channel"
				fi
			fi
		fi
	fi
}

wifi_macfilter_config() {
	local dev=$1
	local dynamic=$2
	echo "=====>>>>> $dev: wifi_macfilter_config" >$STDOUT
	#record home guest and bridge status
	local home_enable guest_enable bridge_enable backhaul_enable
	local home_vif guest_vif backhaul_vif
	local home_ifname guest_ifname backhaul_ifname

	config_get band $dev band
	config_get vifs $dev vifs

	case $band in
		2g)
			WIFI_UNIT="1"
		;;
		5g)
			WIFI_UNIT="0"
		;;
	esac

	case $MACFILTER_ACTION in
		allow)
			macmode="2"
		;;
		deny)
			macmode="1"
		;;
		*)
			macmode="0"
		;;
	esac

	config_get_bool wifi_disabled $dev disabled
	if [ "$wifi_disabled" = "0" ]; then
		for vif in $vifs; do
			config_get_bool enable   $vif enable
			config_get      mode     $vif mode
			config_get      guest    $vif guest
			config_get      backhaul $vif backhaul
			config_get      ifname   $vif ifname

			if [ "$mode" = "ap" ] && [ -z "$guest" ] && [ -z "$backhaul" ]; then
				home_enable=$enable
				home_vif=$vif
				home_ifname=$ifname
			elif [ "$mode" = "ap" ] && [ ! -z "$guest" ]; then
				guest_enable=$enable
				guest_vif=$vif
				guest_ifname=$ifname
			elif [ "$mode" = "ap" ] && [ ! -z "$backhaul" ]; then
				backhaul_enable=$enable
				backhaul_vif=$vif
				backhaul_ifname=$ifname
			elif [ "$mode" = "sta" ] ; then
				bridge_enable=$enable
			else
				echo "bad if type." >$STDOUT ;
			fi
		done
	fi

	#echo home=$home_enable guest=$guest_enable bridge=$bridge_enable >$STDOUT ;
	#config home acl
	if [ "$home_enable" = "1" -a "$bridge_enable" = "1" ]; then
		HOME_WIFI="wl"${WIFI_UNIT}".1"
	else
		HOME_WIFI="wl"${WIFI_UNIT}
	fi

	if [ "$guest_enable" = "1" ]; then
		GUEST_WIFI="wl"${WIFI_UNIT}".3"
	fi

	if [ "$MACFILTER_ENABLE" = "on" ]; then
		if [ "$MACFILTER_ACTION" = "allow" -o "$MACFILTER_ACTION" = "deny" ]; then
			nvram set "${HOME_WIFI}_macmode=$MACFILTER_ACTION"
			[ -z "$dynamic" ] || wl -i $home_ifname macmode "$macmode"
			if [ "$guest_enable" == 1 ]; then
				nvram set "${GUEST_WIFI}_macmode=$MACFILTER_ACTION"
				[ -z "$dynamic" ] || wl -i $guest_ifname macmode "$macmode"
			fi
			if [ "$backhaul_enable" == 1 ]; then
				nvram set "${backhaul_ifname}_macmode=$MACFILTER_ACTION"
				[ -z "$dynamic" ] || wl -i $backhaul_ifname macmode "$macmode"
			fi
		else
			echo "bad MACFILTER_ACTION." >$STDOUT ;
		fi
	elif [ "$MACFILTER_ENABLE" = "off" ]; then
		nvram set "${HOME_WIFI}_macmode=disabled"
		[ -z "$dynamic" ] || wl -i $home_ifname macmode 0
		if [ "$guest_enable" = 1 ] ; then
			nvram set "${GUEST_WIFI}_macmode=disabled"
			[ -z "$dynamic" ] || wl -i $guest_ifname macmode 0
		fi
		if [ "$backhaul_enable" = 1 ] ; then
			nvram set "${backhaul_ifname}_macmode=disabled"
			[ -z "$dynamic" ] || wl -i $backhaul_ifname macmode 0
		fi
	else
		echo "bad MACFILTER_ENABLE." >$STDOUT ;
	fi

	if [ "$MACFILTER_ENABLE" = "on" ]; then
		# Wait for the maclist to be initialized, or STAs in the whitelist will be kicked.
		if [ "$MACFILTER_ACTION" = "allow" ];then
			[ -e /tmp/state/access_control ] || return
		fi

		nvram set "${HOME_WIFI}_maclist=${MAC_LIST}"
		if [ "$home_enable" = 1 ] ; then
			[ -z "$dynamic" ] || {
				wl -i $home_ifname mac none
				wl -i $home_ifname mac ${MAC_LIST}
				kick_sta $home_ifname
			}
		fi
		if [ "$guest_enable" = 1 ] ; then
			nvram set "${GUEST_WIFI}_maclist=${MAC_LIST}"
			[ -z "$dynamic" ] || {
				wl -i $guest_ifname mac none
				wl -i $guest_ifname mac ${MAC_LIST}
				kick_sta $guest_ifname
			}
		fi
		if [ "$backhaul_enable" = 1 ] ; then
			nvram set "${backhaul_ifname}_maclist=${MAC_LIST}"
			[ -z "$dynamic" ] || {
				wl -i $backhaul_ifname mac none
				wl -i $backhaul_ifname mac ${MAC_LIST}
				kick_sta $backhaul_ifname
			}
		fi
	fi
}

# set advanced config for home wifi
wifi_advanced_config() {
	local dev="$1"
	local wds_enable="0"
	local eth_enable="0"
	local home_vif=""
	local wds_vif=""
	local vif=""
	echo "=====>>>>> $dev: wifi_advanced_config" >$STDOUT

	config_get band $dev band
	config_get_bool wifi_disabled $dev disabled
	local sysmode=`uci get sysmode.sysmode.mode`
	local onemesh_enable=`uci get onemesh.onemesh.enable`
	local smart_enable=`uci get wireless.smart.smart_enable`

	[ -z "$sysmode" ] && sysmode="router"
	[ -z "$onemesh_enable" ] && onemesh_enable="on"
	[ -z "$smart_enable" ] && smart_enable="off"

	if [ "$wifi_disabled" = "0" ]; then
		config_get vifs $dev vifs
		for vif in $vifs; do # vifs is wl01/wl02/wl03, wds/guest/home
			config_get_bool enable $vif enable
			config_get mode $vif mode
			config_get guest $vif guest
			config_get backhaul $vif backhaul
			if [ "$enable" = "1" -a "$mode" = "ap" -a -z "$guest" -a -z "$backhaul" ]; then
				eth_enable="1"
				home_vif="$vif"
				echo "=====>>>>> $dev: HOME WIFI is on" >$STDOUT
			elif [ "$enable" = "1" -a "$mode" = "sta" ]; then
				eth_enable="1"
				wds_enable="1"
				wds_vif="$vif"
				echo "=====>>>>> $dev: $vif WDS is on" >$STDOUT
			else
				echo "=====>>>>> $dev: vif $vif is disabled or $vif is a guest/backhaul network" >$STDOUT
			fi
		done
	fi

	case $band in
		2g)
			HOME_WIFI="wl1.1"
			WIFI_DEV="wl1"
		;;
		5g)
			HOME_WIFI="wl0.1"
			WIFI_DEV="wl0"
		;;
	esac

	if [ "$eth_enable" = "1" ]; then
		config_get beacon_int $dev beacon_int
		config_get rts $dev rts
		config_get frag $dev frag
		config_get dtim_period $dev dtim_period
		config_get wmm $dev wmm
		config_get_bool isolate $dev isolate

		#only 5g support zero-wait dfs
		if [ "$band" = "5g" ]; then
			config_get_bool zerowait_dfs $dev zerowait_dfs
			nvram set ${HOME_WIFI}_acs_bgdfs_enab="$zerowait_dfs"
		fi
		
		nvram set ${WIFI_DEV}_bcn="$beacon_int"
		nvram set ${WIFI_DEV}_rts="$rts"
		nvram set ${WIFI_DEV}_frag="$frag"
		nvram set ${WIFI_DEV}_dtim="$dtim_period"
		nvram set ${WIFI_DEV}_wme="$wmm" #need to check
		nvram set ${WIFI_DEV}_plcphdr="long"
		nvram set ${HOME_WIFI}_ap_isolate="$isolate"
	fi
}

wifi_wps_config() {
	local dev=$1
	local wdsIf
	local wpsIf
	echo "=====>>>>> $dev: wifi_wps_config" >$STDOUT

	config_get band $dev band
	case $band in
		2g)
			HOME_WIFI=wl1.1
		;;
		5g)
			HOME_WIFI=wl0.1
		;;
	esac

	for vif in $vifs; do
		config_get mode  $vif mode

		#find the wds iface
		if [ -n "$mode" -a "sta" = "$mode" ]; then
			wdsIf=$vif
			break
		fi
	done

	for vif in $vifs; do
		config_get mode  $vif mode
		config_get guest $vif guest
		config_get backhaul $vif backhaul
		#find the wps iface
		if [ "ap" = "$mode" -a -z "$guest" -a -z "$backhaul" ]; then
			wpsIf=$vif
			break
		fi
	done

	config_get_bool wifi_disabled $dev disabled
	config_get_bool disabled_all $dev disabled_all
	config_get_bool wds_enable $wdsIf enable

	#if [ "$wifi_disabled" = "0" -a "$disabled_all" = "0" -a "$wds_enable" = "1" ]; then
	#	nvram set ${HOME_WIFI}_wps_mode="disabled"
	#	case $band in
	#		2g)
	#			HOME_WIFI=wl1
	#		;;
	#		5g)
	#			HOME_WIFI=wl0
	#		;;
	#	esac
	#fi

	config_get_bool wps $wpsIf wps
	config_get encryption $wpsIf encryption
	config_get_bool hidden $wpsIf hidden
	config_get psk_version $wpsIf psk_version
	config_get psk_cipher $wpsIf psk_cipher
	if [ "$wps" = "1" ]; then
		if [ "$encryption" = "wpa" -o "$hidden" = "1" -o "$encryption" = "wep" ]; then
			nvram set ${HOME_WIFI}_wps_mode="disabled"
		elif [ "$encryption" = "psk" -a "$psk_version" = "wpa" ]; then
			nvram set ${HOME_WIFI}_wps_mode="disabled"
		elif [ "$encryption" = "psk" -a "$psk_cipher" = "tkip" ]; then
			nvram set ${HOME_WIFI}_wps_mode="disabled"
		else
			nvram set ${HOME_WIFI}_wps_mode="enabled"
		fi
	else
		nvram set ${HOME_WIFI}_wps_mode="disabled"
	fi

	config_get_bool wps_label $wpsIf wps_label
	if [ "$wps_label" = "1" ]; then
		nvram set wps_aplockdown_forceon="0"
	else
		nvram set wps_aplockdown_forceon="1"
	fi

	config_get wps_pin $wpsIf wps_pin
	nvram set wps_device_pin="$wps_pin"

	config_get dev_name wps wps_device_name
	nvram set wps_device_name="$dev_name"

	config_get model_name wps model_name
	nvram set wps_modelname="$model_name"

	config_get manufacturer wps wps_manufacturer
	nvram set wps_mfstring="$manufacturer"

	nvram set wps_modelnum="123456"

	nvram set lan_wps_oob="disabled"
}

wifi_wds_config() {
	local dev="$1"
	config_get vifs $dev vifs
	local eth_enable="0"
	local guest_enable="0"
	local backhaul_enable="0"
	local wds_enable="0"
	local home_vif1=""
	local wds_vif=""
	local br0_ifnames_tmp=""
	local lan_ifnames_tmp=""
	local vifs_tmp=""
	echo "=====>>>>> $dev: wifi_wds_config" >$STDOUT

	config_get_bool wifi_disabled $dev disabled
	if [ "$wifi_disabled" = "0" ]; then
		config_get vifs $dev vifs
		for vif in $vifs; do
			config_get_bool enable $vif enable
			config_get mode $vif mode
			config_get guest $vif guest
			config_get backhaul $vif backhaul
			if [ "$enable" = "1" -a "$mode" = "ap" -a -z "$guest" ]; then
				eth_enable="1"
				home_vif1=$vif
			elif [ "$enable" = "1" -a "$mode" = "ap" -a "$guest" = "on" ]; then
				eth_enable="1"
				guest_enable="1"
			elif [ "$enable" = "1" -a "$mode" = "ap" -a "$backhaul" = "on" ]; then
				eth_enable="1"
				backhaul_enable="1"
			elif [ "$enable" = "1" -a "$mode" = "sta" ]; then
				eth_enable="1"
				wds_enable="1"
				wds_vif="$vif"
			else
				echo "=====>>>>> $dev: vif $vif is disabled" >$STDOUT
			fi
		done
	fi

	config_get band $dev band
	case $band in
		2g)
			WIFI_PRE="wl1.1"
			WIFI_UNIT="1.1"
		;;
		5g)
			WIFI_PRE="wl0.1"
			WIFI_UNIT="0.1"
		;;
	esac
	
	if [ "$eth_enable" = "1" -a "$wds_enable" = "1" ]; then
		config_get ssid $wds_vif ssid
		nvram set ${WIFI_PRE}_ssid="$ssid"
		
		config_get encryption $wds_vif encryption
		if [ "$encryption" = "wep" ]; then
			config_get wep_format1 $wds_vif wep_format1
			if [ "$wep_format1" = "asic" -o "$wep_format1" = "hex" ]; then
				nvram set ${WIFI_PRE}_wep="enabled"
				config_get wep_mode $wds_vif wep_mode
				if [ "$wep_mode" = "shared" ]; then
					nvram set ${WIFI_PRE}_auth="1"
				else
					nvram set ${WIFI_PRE}_auth="0"
				fi
				nvram set ${WIFI_PRE}_key="1"
				config_get wep_key1 $wds_vif wep_key1
				nvram set ${WIFI_PRE}_key1="$wep_key1"
				nvram set ${WIFI_PRE}_key2=""
				nvram set ${WIFI_PRE}_key3=""
				nvram set ${WIFI_PRE}_key4=""
				nvram set ${WIFI_PRE}_akm=""
				nvram set ${WIFI_PRE}_nmode="0"
			fi
		elif [ "$encryption" = "psk" ]; then
			nvram set ${WIFI_PRE}_akm="psk psk2"
			config_get psk_key $wds_vif psk_key
			nvram set ${WIFI_PRE}_wpa_psk="$psk_key"
			nvram set ${WIFI_PRE}_wep="disabled"
			nvram set ${WIFI_PRE}_auth="0"
		elif [ "$encryption" = "none" ]; then
			nvram set ${WIFI_PRE}_akm=""
			nvram set ${WIFI_PRE}_wep="disabled"
			nvram set ${WIFI_PRE}_auth="0"
		else
			echo "ERROR: $dev, unknown wds security" >$CONSOLE
		fi

		nvram set ${WIFI_PRE}_ure="0"
		nvram set ${WIFI_PRE}_mode="psr"
		nvram set ${WIFI_PRE}_vifs="${WIFI_PRE}.1"
		nvram set ${WIFI_PRE}_wps_oob="disabled"
		nvram set ${WIFI_PRE}_ap_isolate="0"
		br0_ifnames_tmp="`nvram get br0_ifnames`"
		echo ${br0_ifnames_tmp} | grep -q ${WIFI_PRE}.1 || nvram set br0_ifnames="$br0_ifnames_tmp ${WIFI_PRE}.1"
		lan_ifnames_tmp="`nvram get lan_ifnames`"
		echo ${lan_ifnames_tmp} | grep -q ${WIFI_PRE}.1 || nvram set lan_ifnames="$lan_ifnames_tmp ${WIFI_PRE}.1"

		for idx in `seq 2 15`; do
			nvram set ${WIFI_PRE}.${idx}_bss_enabled="0"
		done

		vap_name="${WIFI_PRE}.1"
		if [ "$band" = "5g" ]; then
			home_vif="$HOME_5G_VIF"
		else
			home_vif="$HOME_2G_VIF"
		fi
		config_get ssid $home_vif ssid
		nvram set ${vap_name}_ssid="$ssid"
		nvram set ${vap_name}_mode="ap"
		nvram set ${vap_name}_radio="1"
		config_get_bool hidden $home_vif1 hidden
		if [ "$hidden" = "1" ]; then
			nvram set ${vap_name}_closed="1"
		else
		        nvram set ${vap_name}_closed="0"
		fi
		config_get_bool ap_isolate $dev isolate 
		nvram set ${vap_name}_ap_isolate="$ap_isolate"
		nvram set ${vap_name}_bss_enabled="1"
		nvram set ${vap_name}_sta_retry_time="5"
		nvram set ${vap_name}_infra="1"
		nvram set ${vap_name}_unit="${WIFI_UNIT}"
		nvram set ${vap_name}_ifname="${vap_name}"
		nvram set ${vap_name}_bss_maxassoc="128"
		nvram set ${vap_name}_wmf_bss_enable="1"
	else
		vap_name="${WIFI_PRE}.1"
		nvram set ${vap_name}_radio="0"
		nvram set ${vap_name}_bss_enabled="0"
		nvram unset ${vap_name}_unit
		nvram unset ${vap_name}_ifname
		for idx in `seq 1 15`; do
			nvram set ${WIFI_PRE}.${idx}_hwaddr=""
		done

		br0_ifnames_tmp="`nvram get br0_ifnames`"
		echo ${br0_ifnames_tmp} | grep -q ${vap_name} && br0_ifnames_tmp="${br0_ifnames_tmp/ ${vap_name}/""}"
		nvram set br0_ifnames="$br0_ifnames_tmp"
		lan_ifnames_tmp="`nvram get lan_ifnames`"
		echo ${lan_ifnames_tmp} | grep -q ${vap_name} && lan_ifnames_tmp="${lan_ifnames_tmp/ ${vap_name}/""}"
		nvram set lan_ifnames="$lan_ifnames_tmp"
		vifs_tmp="`nvram get ${WIFI_PRE}_vifs`"
		echo ${vifs_tmp} | grep -q "${WIFI_PRE}.1" && nvram set ${WIFI_PRE}_vifs=""
	fi
}


wifi_psta_config() {
	local dev="$1"
	config_get vifs $dev vifs
	local eth_enable="0"
	local guest_enable="0"
	local backhaul_enable="0"
	local psta_enable="0"
	local psta_vif=""
	local br0_ifnames_tmp=""
	local lan_ifnames_tmp=""
	local vifs_tmp=""

	config_get_bool wifi_disabled $dev disabled       #hardware switch
	#config_get_bool soft_disabled $dev disabled_all   #software switch
	if [ "$wifi_disabled" = "0" ]; then
		config_get vifs $dev vifs
		for vif in $vifs; do
			config_get_bool enable $vif enable
			config_get mode $vif mode
			config_get guest $vif guest
			config_get backhaul $vif backhaul
			if [ "$enable" = "1" -a "$mode" = "ap" -a -z "$guest" -a -z "$backhaul" ]; then
				eth_enable="1"
			elif [ "$enable" = "1" -a "$mode" = "ap" -a "$guest" = "on" ]; then
				eth_enable="1"
				guest_enable="1"
			elif [ "$enable" = "1" -a "$mode" = "ap" -a "$backhaul" = "on" ]; then
				eth_enable="1"
				backhaul_enable="1"
			elif [ "$enable" = "1" -a "$mode" = "sta" ]; then
				eth_enable="1"
				psta_enable="1"
				psta_vif="$vif"
			else
				echo "=====>>>>> $dev: vif $vif is disabled" >$STDOUT
			fi
		done
	fi

	config_get band $dev band
	case $band in
		2g)
			WIFI_PRE="wl1.1"
			WIFI_UNIT="1.1"
		;;
		5g)
			WIFI_PRE="wl0.1"
			WIFI_UNIT="0.1"
		;;
	esac

	if [ "$eth_enable" = "1" -a "$psta_enable" = "1" ]; then
		config_get ssid $psta_vif ssid
		nvram set ${WIFI_PRE}_ssid="$ssid"
        nvram set fwd_wlandevs="${DEVICES}"
        if [ "$SINGLECHAIN_TEST" = "1" ]; then
            nvram set ${WIFI_PRE}_rxchain="1"
            nvram set ${WIFI_PRE}_txchain="1"
        fi
		
		config_get encryption $psta_vif encryption
		if [ "$encryption" = "wep" ]; then
			config_get wep_format1 $psta_vif wep_format1
			if [ "$wep_format1" = "asic" -o "$wep_format1" = "hex" ]; then
				nvram set ${WIFI_PRE}_wep="enabled"
				config_get wep_mode $psta_vif wep_mode
				if [ "$wep_mode" = "shared" ]; then
					nvram set ${WIFI_PRE}_auth="1"
				else
					nvram set ${WIFI_PRE}_auth="0"
				fi
				nvram set ${WIFI_PRE}_key="1"
				config_get wep_key1 $psta_vif wep_key1
				nvram set ${WIFI_PRE}_key1="$wep_key1"
				nvram set ${WIFI_PRE}_key2=""
				nvram set ${WIFI_PRE}_key3=""
				nvram set ${WIFI_PRE}_key4=""
				nvram set ${WIFI_PRE}_akm=""
				nvram set ${WIFI_PRE}_nmode="0"
			fi
		elif [ "$encryption" = "psk" ]; then
			nvram set ${WIFI_PRE}_akm="psk psk2 psk2ft"
			config_get psk_key $psta_vif psk_key
			nvram set ${WIFI_PRE}_wpa_psk="$psk_key"
			nvram set ${WIFI_PRE}_wep="disabled"
			nvram set ${WIFI_PRE}_auth="0"
		elif [ "$encryption" = "none" ]; then
			nvram set ${WIFI_PRE}_akm=""
			nvram set ${WIFI_PRE}_wep="disabled"
			nvram set ${WIFI_PRE}_auth="0"
		else
			echo "ERROR: $dev, unknown wds security" >$CONSOLE
		fi

		nvram unset ${WIFI_PRE}_ure
		nvram set ${WIFI_PRE}_mode="psta"
		nvram unset ${WIFI_PRE}_vifs
		nvram set ${WIFI_PRE}_wps_oob="disabled"
		nvram set ${WIFI_PRE}_ap_isolate="0"
		br0_ifnames_tmp="`nvram get br0_ifnames`"
		echo ${br0_ifnames_tmp} | grep -q ${WIFI_PRE}.1 || nvram set br0_ifnames="$br0_ifnames_tmp ${WIFI_PRE}.1"
		lan_ifnames_tmp="`nvram get lan_ifnames`"
		echo ${lan_ifnames_tmp} | grep -q ${WIFI_PRE}.1 || nvram set lan_ifnames="$lan_ifnames_tmp ${WIFI_PRE}.1"

		for idx in `seq 2 15`; do
			nvram set ${WIFI_PRE}.${idx}_bss_enabled="0"
		done

		vap_name="${WIFI_PRE}.1"
		if [ "$band" = "5g" ]; then
			home_vif="$HOME_5G_VIF"
		else
			home_vif="$HOME_2G_VIF"
		fi

		nvram set ${vap_name}_mode=""

		nvram unset ${vap_name}_closed
		config_get_bool ap_isolate $dev isolate 
		nvram unset ${vap_name}_ap_isolate
        nvram unset ${vap_name}_bss_enabled
		nvram unset ${vap_name}_sta_retry_time
        nvram unset ${vap_name}_infra
        nvram unset ${vap_name}_unit
		nvram unset ${vap_name}_ifname
		nvram unset ${vap_name}_bss_maxassoc
		nvram unset ${vap_name}_wmf_bss_enable
	else
		vap_name="${WIFI_PRE}.1"
		nvram set ${vap_name}_radio="0"
		nvram set ${vap_name}_bss_enabled="0"
		nvram unset ${vap_name}_unit
		nvram unset ${vap_name}_ifname
		for idx in `seq 1 15`; do
			nvram set ${WIFI_PRE}.${idx}_hwaddr=""
		done

		br0_ifnames_tmp="`nvram get br0_ifnames`"
		echo ${br0_ifnames_tmp} | grep -q ${vap_name} && br0_ifnames_tmp="${br0_ifnames_tmp/ ${vap_name}/""}"
		nvram set br0_ifnames="$br0_ifnames_tmp"
		lan_ifnames_tmp="`nvram get lan_ifnames`"
		echo ${lan_ifnames_tmp} | grep -q ${vap_name} && lan_ifnames_tmp="${lan_ifnames_tmp/ ${vap_name}/""}"
		nvram set lan_ifnames="$lan_ifnames_tmp"
		vifs_tmp="`nvram get ${WIFI_PRE}_vifs`"
		echo ${vifs_tmp} | grep -q "${WIFI_PRE}.1" && nvram set ${WIFI_PRE}_vifs=""
	fi
}

#AX6000,DWDS MODE
wifi_dwds_config() {
	local dev="$1"
	config_get vifs $dev vifs
	local eth_enable="0"
	local guest_enable="0"
	local backhaul_enable="0"
	local dwds_sta_enable="0"
	local dwds_ap_enable="0"
	local dwds_vif=""
	local br0_ifnames_tmp=""
	local lan_ifnames_tmp=""
	local vifs_tmp=""

	config_get_bool wifi_disabled $dev disabled       #hardware switch
	#config_get_bool soft_disabled $dev disabled_all   #software switch
	if [ "$wifi_disabled" = "0" ]; then
		config_get vifs $dev vifs
		for vif in $vifs; do
			config_get_bool enable $vif enable
			config_get mode $vif mode
			config_get guest $vif guest
			config_get backhaul $vif backhaul
			if [ "$enable" = "1" -a "$mode" = "ap" -a -z "$guest" -a -z "$backhaul" ]; then
				eth_enable="1"
			elif [ "$enable" = "1" -a "$mode" = "ap" -a "$guest" = "on" ]; then
				eth_enable="1"
				guest_enable="1"
			elif [ "$enable" = "1" -a "$mode" = "ap" -a "$backhaul" = "on" ]; then
				eth_enable="1"
				backhaul_enable="1"
			elif [ "$enable" = "1" -a "$mode" = "sta" ]; then
				eth_enable="1"
				config_get dwds_mode $vif dwds_mode
				if [ "$dwds_mode" = "ap" ]; then
					dwds_ap_enable="1"
					dwds_sta_enable="0"
				elif [ "$dwds_mode" = "sta" ]; then
					dwds_ap_enable="0"
					dwds_sta_enable="1"
				else
					echo "=====>>>>> $dev: vif $vif dwds_mode is wrong" >$STDOUT
				fi
				dwds_vif="$vif"
			else
				echo "=====>>>>> $dev: vif $vif is disabled" >$STDOUT
			fi
		done
	fi

	config_get band $dev band
	case $band in
		2g)
			WIFI_PRE="wl1.1"
			WIFI_UNIT="1.1"
		;;
		5g)
			WIFI_PRE="wl0.1"
			WIFI_UNIT="0.1"
		;;
	esac

	if [ "$eth_enable" = "1" -a "$dwds_sta_enable" = "1" ]; then
		config_get ssid $dwds_vif ssid
		nvram set ${WIFI_PRE}_ssid="$ssid"
        nvram set fwd_wlandevs="${DEVICES}"
        if [ "$SINGLECHAIN_TEST" = "1" ]; then
            nvram set ${WIFI_PRE}_rxchain="1"
            nvram set ${WIFI_PRE}_txchain="1"
        fi
		
		config_get encryption $dwds_vif encryption
		if [ "$encryption" = "wep" ]; then
			config_get wep_format1 $dwds_vif wep_format1
			if [ "$wep_format1" = "asic" -o "$wep_format1" = "hex" ]; then
				nvram set ${WIFI_PRE}_wep="enabled"
				config_get wep_mode $dwds_vif wep_mode
				if [ "$wep_mode" = "shared" ]; then
					nvram set ${WIFI_PRE}_auth="1"
				else
					nvram set ${WIFI_PRE}_auth="0"
				fi
				nvram set ${WIFI_PRE}_key="1"
				config_get wep_key1 $dwds_vif wep_key1
				nvram set ${WIFI_PRE}_key1="$wep_key1"
				nvram set ${WIFI_PRE}_key2=""
				nvram set ${WIFI_PRE}_key3=""
				nvram set ${WIFI_PRE}_key4=""
				nvram set ${WIFI_PRE}_akm=""
				nvram set ${WIFI_PRE}_nmode="0"
			fi
		elif [ "$encryption" = "psk" ]; then
			nvram set ${WIFI_PRE}_akm="psk psk2 psk2ft"
			config_get psk_key $dwds_vif psk_key
			nvram set ${WIFI_PRE}_wpa_psk="$psk_key"
			nvram set ${WIFI_PRE}_wep="disabled"
			nvram set ${WIFI_PRE}_auth="0"
		elif [ "$encryption" = "none" ]; then
			nvram set ${WIFI_PRE}_akm=""
			nvram set ${WIFI_PRE}_wep="disabled"
			nvram set ${WIFI_PRE}_auth="0"
		else
			echo "ERROR: $dev, unknown wds security" >$CONSOLE
		fi

		nvram unset ${WIFI_PRE}_ure
		nvram set ${WIFI_PRE}_dwds="1"
		nvram set ${WIFI_PRE}_mode="sta"
		nvram unset ${WIFI_PRE}_vifs
		nvram set ${WIFI_PRE}_wps_oob="disabled"
		nvram set ${WIFI_PRE}_ap_isolate="0"
		br0_ifnames_tmp="`nvram get br0_ifnames`"
		echo ${br0_ifnames_tmp} | grep -q ${WIFI_PRE}.1 || nvram set br0_ifnames="$br0_ifnames_tmp ${WIFI_PRE}.1"
		lan_ifnames_tmp="`nvram get lan_ifnames`"
		echo ${lan_ifnames_tmp} | grep -q ${WIFI_PRE}.1 || nvram set lan_ifnames="$lan_ifnames_tmp ${WIFI_PRE}.1"

		for idx in `seq 2 15`; do
			nvram set ${WIFI_PRE}.${idx}_bss_enabled="0"
		done

		vap_name="${WIFI_PRE}.1"
		if [ "$band" = "5g" ]; then
			home_vif="$HOME_5G_VIF"
		else
			home_vif="$HOME_2G_VIF"
		fi

		nvram set ${vap_name}_mode=""

		nvram unset ${vap_name}_closed
		config_get_bool ap_isolate $dev isolate 
		nvram unset ${vap_name}_ap_isolate
        nvram unset ${vap_name}_bss_enabled
		nvram unset ${vap_name}_sta_retry_time
        nvram unset ${vap_name}_infra
        nvram unset ${vap_name}_unit
		nvram unset ${vap_name}_ifname
		nvram unset ${vap_name}_bss_maxassoc
		nvram unset ${vap_name}_wmf_bss_enable
	else
		vap_name="${WIFI_PRE}.1"
		if [ "$eth_enable" = "1" -a "$dwds_ap_enable" = "1" ]; then
			nvram set ${WIFI_PRE}_dwds="1"
		else
			nvram unset ${WIFI_PRE}_dwds
		fi
		nvram set ${WIFI_PRE}_mode="ap"
		nvram set ${vap_name}_radio="0"
		nvram set ${vap_name}_bss_enabled="0"
		nvram unset ${vap_name}_unit
		nvram unset ${vap_name}_ifname
		for idx in `seq 1 15`; do
			nvram set ${WIFI_PRE}.${idx}_hwaddr=""
		done

		br0_ifnames_tmp="`nvram get br0_ifnames`"
		echo ${br0_ifnames_tmp} | grep -q ${vap_name} && br0_ifnames_tmp="${br0_ifnames_tmp/ ${vap_name}/""}"
		nvram set br0_ifnames="$br0_ifnames_tmp"
		lan_ifnames_tmp="`nvram get lan_ifnames`"
		echo ${lan_ifnames_tmp} | grep -q ${vap_name} && lan_ifnames_tmp="${lan_ifnames_tmp/ ${vap_name}/""}"
		nvram set lan_ifnames="$lan_ifnames_tmp"
		vifs_tmp="`nvram get ${WIFI_PRE}_vifs`"
		echo ${vifs_tmp} | grep -q "${WIFI_PRE}.1" && nvram set ${WIFI_PRE}_vifs=""
	fi
}

# Jiangzheyu@tp-link.com.cn 2019-10-10
# Add backhaul for one-mesh
wifi_backhaul_addif() {
	local brname
	get_brname brname
	echo "=====>>>>> band[$band]: wifi_backhaul_addif" >$STDOUT
	local band="$1"
	local mac="$2"

	case $band in
		2g)
			WIFI_BACKHAUL="wl1.2"
			vif="wl14"
		;;
		5g)
			WIFI_BACKHAUL="wl0.2"
			vif="wl04"
		;;
	esac
	config_get backhaul $vif backhaul
	if [ "$backhaul" == "on" ]; then
		ifconfig ${WIFI_BACKHAUL} hw ether $(nvram get ${WIFI_BACKHAUL}_hwaddr)
		ifconfig "${WIFI_BACKHAUL}" up
		brctl addif "$brname" "${WIFI_BACKHAUL}"
	fi
}

wifi_backhaul_addvlan() {
	echo "=====>>>>> wifi_backhaul_addvlan" >$STDOUT
	local brname
	local hvlan=$((0x3)) gvlan=0
	get_brname brname
	for band in "2g" "5g"; do
		case $band in
			2g)
				WIFI_BACKHAUL="wl1.2"
				vif="wl14"
				hvlan=$((0x16))
			;;
			5g)
				WIFI_BACKHAUL="wl0.2"
				vif="wl04"
				hvlan=$((0x8))
			;;
		esac

		config_get backhaul $vif backhaul
		if [ "$backhaul" == "on" ]; then
			brctl setifvlan "$brname" "${WIFI_BACKHAUL}" "$hvlan" 1
		fi
	done
}

wifi_backhaul_config() {
	echo "=====>>>>> wifi_backhaul_config" >$STDOUT
	local dev="$1"
	local vif=""

	config_get band $dev band
	case $band in
		2g)
			WIFI_DEV="wl1"
			WIFI_BACKHAUL="wl1.2"
			WIFI_UNIT="1.2"
			vif="wl14"
		;;
		5g)
			WIFI_DEV="wl0"
			WIFI_BACKHAUL="wl0.2"
			WIFI_UNIT="0.2"
			vif="wl04"
		;;
	esac

	config_get backhaul $vif backhaul
	if [ "$backhaul" == "on" ]; then
		echo "=====>>>>> vif:${vif}" >$STDOUT
		config_get ssid $vif ssid
		echo "=====>>>>> ssid:${ssid}" >$STDOUT
		config_get encryption $vif encryption
		config_get psk_version $vif psk_version
		config_get psk_cipher $vif psk_cipher
		nvram set ${WIFI_BACKHAUL}_ssid="$ssid"
		nvram set ${WIFI_BACKHAUL}_radio="1"

		config_get_bool hidden $vif hidden
		if [ "$hidden" == "1" ]; then
			nvram set ${WIFI_BACKHAUL}_closed="1"
		else
			nvram set ${WIFI_BACKHAUL}_closed="0"
		fi
		nvram set ${WIFI_BACKHAUL}_bss_maxassoc="64"

		if [ "$encryption" == "none" ]; then
			nvram set ${WIFI_BACKHAUL}_wep="disabled"
			nvram set ${WIFI_BACKHAUL}_auth="0"
			nvram set ${WIFI_BACKHAUL}_akm=""
		elif [ "$encryption" == "psk" ]; then
			if [ "$psk_version" == "wpa" ]; then
				nvram set ${WIFI_BACKHAUL}_akm="psk"
			elif [ "$psk_version" == "rsn" ]; then
				nvram set ${WIFI_BACKHAUL}_akm="psk2"
			else
				nvram set ${WIFI_BACKHAUL}_akm="psk psk2"
			fi
			if [ "$psk_cipher" == "aes" ]; then
				nvram set ${WIFI_BACKHAUL}_crypto="aes"
			elif [ "$psk_cipher" == "tkip" ]; then
				nvram set ${WIFI_BACKHAUL}_crypto="tkip"
				nvram set ${WIFI_DEV}_nmode="0"
				config_get channel $dev channel
				if [ "$channel" = "auto" ]; then
					nvram set ${WIFI_DEV}_chanspec="0"
				else
					nvram set ${WIFI_DEV}_chanspec="$channel"
				fi
			else
				nvram set ${WIFI_BACKHAUL}_crypto="tkip+aes"
			fi

			config_get psk_key $vif psk_key
			nvram set ${WIFI_BACKHAUL}_wpa_psk="$psk_key"
			config_get wpa_group_rekey $dev wpa_group_rekey
			if [ -z "$wpa_group_rekey" ]; then
				nvram set ${WIFI_BACKHAUL}_wpa_gtk_rekey="0"
			else
				nvram set ${WIFI_BACKHAUL}_wpa_gtk_rekey="$wpa_group_rekey"
			fi
			nvram set ${WIFI_BACKHAUL}_wep="disabled"
			nvram set ${WIFI_BACKHAUL}_auth="0"
		else
			nvram set ${WIFI_BACKHAUL}_wep="disabled"
			nvram set ${WIFI_BACKHAUL}_auth="0"
			nvram set ${WIFI_BACKHAUL}_akm=""
			echo "ERROR: $dev, encryption is not correct" >$CONSOLE
		fi

		config_get_bool isolate $vif isolate
		nvram set ${WIFI_BACKHAUL}_ap_isolate="$isolate"
		nvram set ${WIFI_BACKHAUL}_wme="on"
		nvram set ${WIFI_BACKHAUL}_bss_enabled="1"
		nvram set ${WIFI_BACKHAUL}_mode="ap"
		nvram set ${WIFI_BACKHAUL}_infra="1"
		nvram set ${WIFI_BACKHAUL}_unit="$WIFI_UNIT"
		nvram set ${WIFI_BACKHAUL}_ifname="${WIFI_BACKHAUL}"
		nvram set ${WIFI_BACKHAUL}_wps_mode="disabled"
		nvram set ${WIFI_BACKHAUL}_sta_retry_time="5"
		nvram set ${WIFI_BACKHAUL}_wmf_bss_enable="1"
		
		# set DWDS
		nvram set ${WIFI_BACKHAUL}_dwds="1"
		
		#lizhou@tp-link.com.cn    2019-6-17
		#if in WDS mode,do not set vifs
		local cur_mode=`nvram get ${WIFI_DEV}_mode`
		#if [ "$cur_mode" = "ap" ]; then
			child_vifs_tmp="`nvram get ${WIFI_DEV}_vifs`"
		echo ${child_vifs_tmp} | grep -q ${WIFI_BACKHAUL} || nvram set ${WIFI_DEV}_vifs="${child_vifs_tmp} ${WIFI_BACKHAUL}"		
		#fi
		#END    2019-6-17
		br0_ifnames_tmp="`nvram get br0_ifnames`"
		echo ${br0_ifnames_tmp} | grep -q ${WIFI_BACKHAUL} || nvram set br0_ifnames="${br0_ifnames_tmp} ${WIFI_BACKHAUL}"
		lan_ifnames_tmp="`nvram get lan_ifnames`"
		echo ${lan_ifnames_tmp} | grep -q ${WIFI_BACKHAUL} || nvram set lan_ifnames="${lan_ifnames_tmp} ${WIFI_BACKHAUL}"
	fi
}

wifi_easymesh_config() {
	echo "=====>>>>> wifi_easymesh_config" >$STDOUT
	local role=`uci get meshd.meshd.role`
	local easymesh_enable=`uci get meshd.meshd.enableeasymesh`
	local map_profile=`uci get meshd.meshd.profile`
	local map_8021q_settings=`uci get meshd.meshd.primvlanid`
	local wbd_ifnames=""
	
	for dev in ${DEVICES}; do
		config_get band $dev band

		case $band in
		2g)
			DEV_WIFI="wl1"
			HOME_WIFI="wl1.1"
			HOME_VIF="wl13"
			BACKHAUL_WIFI="wl1.2"
			BACKHAUL_VIF="wl14"
			GUEST_WIFI="wl1.3"
			CONFIG_WIFI="wl1.4"
		;;
		5g)
			DEV_WIFI="wl0"
			HOME_WIFI="wl0.1"
			HOME_VIF="wl03"
			BACKHAUL_WIFI="wl0.2"
			BACKHAUL_VIF="wl04"
			GUEST_WIFI="wl0.3"
			CONFIG_WIFI="wl0.4"
		;;
		esac

		if [ "$easymesh_enable" = "off" ]; then
			nvram set multiap_mode="0"
			nvram unset ${HOME_WIFI}_map
			nvram unset ${HOME_WIFI}_bh_ssid
			nvram unset ${HOME_WIFI}_bh_auth
			nvram unset ${HOME_WIFI}_bh_encr
			nvram unset ${HOME_WIFI}_bh_psk
			nvram unset ${BACKHAUL_WIFI}_map
			nvram unset ${DEV_WIFI}_map
			nvram unset ${CONFIG_WIFI}_map
		else
			nvram set multiap_mode="1"
		
			append wbd_ifnames $DEV_WIFI
			append wbd_ifnames $HOME_WIFI
			append wbd_ifnames $BACKHAUL_WIFI
			append wbd_ifnames $CONFIG_WIFI

			config_get ssid $BACKHAUL_VIF ssid
			config_get psk_version $BACKHAUL_VIF psk_version
			config_get psk_cipher $BACKHAUL_VIF psk_cipher
			config_get encryption $BACKHAUL_VIF encryption
			
			nvram set ${HOME_WIFI}_map="1" #FH BSS
			nvram set ${HOME_WIFI}_bh_ssid="$ssid"
			
			if [ "$encryption" == "none" ]; then
				nvram set ${HOME_WIFI}_bh_auth="1"
				nvram set ${HOME_WIFI}_bh_encr="1"
			elif [ "$encryption" == "psk" -o "$encryption" == "psk2" ]; then
				if [ "$psk_version" == "wpa" ]; then 
					nvram set ${HOME_WIFI}_bh_auth="2"
				elif [ "$psk_version" == "rsn" ]; then
					nvram set ${HOME_WIFI}_bh_auth="32"
				else
					nvram set ${HOME_WIFI}_bh_auth="34"
				fi
				if [ "$psk_cipher" == "aes" ]; then
					nvram set ${HOME_WIFI}_bh_encr="8"
				elif [ "$psk_cipher" == "tkip" ]; then
					nvram set ${HOME_WIFI}_bh_auth="4"
				else
					nvram set ${HOME_WIFI}_bh_auth="12"
				fi

				config_get psk_key $BACKHAUL_VIF psk_key
				nvram set ${HOME_WIFI}_bh_psk="$psk_key"
			else
				nvram set ${HOME_WIFI}_bh_auth=""
				nvram set ${HOME_WIFI}_bh_encr=""
				echo "ERROR: $dev, encryption is not correct" >$CONSOLE
			fi

			nvram set ${BACKHAUL_WIFI}_map="2" #BH BSS note : enable support onemesh device connection in hostapd
			nvram set ${CONFIG_WIFI}_map="3" # BH BSS + FH BSS
			
			nvram set ${DEV_WIFI}_backhaul_sta="1"   #  easymesh_support need set  
			
			nvram set ${DEV_WIFI}_onemesh_enable="1"

			
			if [ "$role" = "agent" ]; then
				nvram set ${DEV_WIFI}_map="4" #BH STA
			else
				nvram set ${DEV_WIFI}_map="0"
			fi
			
			wl -i ${HOME_WIFI} map_profile $map_profile
			if [ $map_8021q_settings -gt 0 ]; then
				wl -i ${HOME_WIFI} map 2
				wl -i ${HOME_WIFI} map_8021q_settings $map_8021q_settings
				wl -i ${HOME_WIFI} map 1
			fi
			
			# need set DEV_WIFI down first before setting map_profile 
			wl -i ${DEV_WIFI} down
			wl -i ${HOME_WIFI} map_profile $map_profile
			wl -i ${CONFIG_WIFI} map_profile $map_profile
			wl -i ${BACKHAUL_WIFI} map_profile $map_profile
			wl -i ${DEV_WIFI} map_profile $map_profile
			wl -i ${DEV_WIFI} up
		fi
	done
	nvram set wbd_ifnames="$wbd_ifnames"
}

# lizhou@tp-link.com.cn    2019-6-17
# note: merge from AX6000, add wet mode
wifi_wet_config() {
	local dev="$1"
	config_get vifs $dev vifs
	local eth_enable="0"
	local guest_enable="0"
	local backhaul_enable="0"
	local onemesh_config_enable="0"
	local wet_enable="0"
	local wet_vif=""
	local br0_ifnames_tmp=""
	local lan_ifnames_tmp=""
	local vifs_tmp=""


		config_get vifs $dev vifs
		for vif in $vifs; do
			config_get_bool enable $vif enable
			config_get mode $vif mode
			config_get guest $vif guest
			config_get backhaul $vif backhaul
		config_get onemesh_config $vif onemesh_config
			if [ "$enable" = "1" -a "$mode" = "ap" -a -z "$guest" -a -z "$backhaul" ]; then
				eth_enable="1"
			elif [ "$enable" = "1" -a "$mode" = "ap" -a "$guest" = "on" ]; then
				eth_enable="1"
				guest_enable="1"
			elif [ "$enable" = "1" -a "$mode" = "ap" -a "$backhaul" = "on" ]; then
				eth_enable="1"
				backhaul_enable="1"
		elif [ "$enable" = "1" -a "$mode" = "ap" -a "$onemesh_config" = "on" ]; then
			eth_enable="1"
			onemesh_config_enable="1"
			elif [ "$enable" = "1" -a "$mode" = "sta" ]; then
				eth_enable="1"
				wet_enable="1"
				wet_vif="$vif"
			else
				echo "=====>>>>> $dev: vif $vif is disabled" >$STDOUT
			fi
		done


	config_get band $dev band
	case $band in
		2g)
			WIFI_PRE="wl1"
			WIFI_UNIT="1.1"
		;;
		5g)
			WIFI_PRE="wl0"
			WIFI_UNIT="0.1"
		;;
	esac


		config_get ssid $wet_vif ssid
		nvram set ${WIFI_PRE}_ssid="$ssid"
        nvram set fwd_wlandevs="${DEVICES}"
        if [ "$SINGLECHAIN_TEST" = "1" ]; then
            nvram set ${WIFI_PRE}_rxchain="1"
            nvram set ${WIFI_PRE}_txchain="1"
        fi
		
		config_get encryption $wet_vif encryption
		if [ "$encryption" = "wep" ]; then
			config_get wep_format1 $wet_vif wep_format1
			if [ "$wep_format1" = "asic" -o "$wep_format1" = "hex" ]; then
				nvram set ${WIFI_PRE}_wep="enabled"
				config_get wep_mode $wet_vif wep_mode
				if [ "$wep_mode" = "shared" ]; then
					nvram set ${WIFI_PRE}_auth="1"
				else
					nvram set ${WIFI_PRE}_auth="0"
				fi
				nvram set ${WIFI_PRE}_key="1"
				config_get wep_key1 $wet_vif wep_key1
				nvram set ${WIFI_PRE}_key1="$wep_key1"
				nvram set ${WIFI_PRE}_key2=""
				nvram set ${WIFI_PRE}_key3=""
				nvram set ${WIFI_PRE}_key4=""
				nvram set ${WIFI_PRE}_akm=""
				nvram set ${WIFI_PRE}_nmode="0"
			fi
		elif [ "$encryption" = "psk" ]; then
		nvram set ${WIFI_PRE}_akm="psk2"
			config_get psk_key $wet_vif psk_key
			nvram set ${WIFI_PRE}_wpa_psk="$psk_key"
			nvram set ${WIFI_PRE}_wep="disabled"
			nvram set ${WIFI_PRE}_auth="0"
		elif [ "$encryption" = "none" ]; then
			nvram set ${WIFI_PRE}_akm=""
			nvram set ${WIFI_PRE}_wep="disabled"
			nvram set ${WIFI_PRE}_auth="0"
		else
			echo "ERROR: $dev, unknown wds security" >$CONSOLE
		fi

		nvram unset ${WIFI_PRE}_ure
		nvram set ${WIFI_PRE}_mode="wet"
	nvram set ${WIFI_PRE}_dwds="1"
	nvram set ${WIFI_PRE}_scan_ssid="1"
	#nvram unset ${WIFI_PRE}_vifs
		nvram set ${WIFI_PRE}_wps_oob="disabled"
		nvram set ${WIFI_PRE}_ap_isolate="0"
	
	local br0_get=0
		br0_ifnames_tmp="`nvram get br0_ifnames`"
	for ifname in ${br0_ifnames_tmp}; do
		if [ "$ifname" = "${WIFI_PRE}" ];then
			br0_get=1
			break
		fi
	done
	[ "$br0_get == 1" ] || nvram set br0_ifnames="$br0_ifnames_tmp ${WIFI_PRE}"
	
	local lan_get=0
		lan_ifnames_tmp="`nvram get lan_ifnames`"
	for ifname in ${lan_ifnames_tmp}; do
		if [ "$ifname" = "${WIFI_PRE}" ];then
			lan_get=1
			break
		fi
	done
	[ "$lan_get == 1" ] || nvram set lan_ifnames="$lan_ifnames_tmp ${WIFI_PRE}"

	if [ "$wet_enable" != "1" ]; then
		nvram set ${WIFI_PRE}_bss_enabled="0"
	fi
}
#END    2019-6-17

#onemesh 2.0 Router to Router:for config vap
wifi_rtor_onemesh_addif() {
	echo "=====>>>>> band[$band]: wifi_rtor_onemesh_addif" >$STDOUT
	local band="$1"
	local brname
	get_brname brname

	case $band in
		2g)
			RTORCFG_WIFI="wl1.4"
			vif="wl15"
		;;
		5g)
			RTORCFG_WIFI="wl0.4"
			vif="wl05"
	esac

	config_get onemesh_config $vif onemesh_config
	if [ "$onemesh_config" == "on" ]; then
		ifconfig ${RTORCFG_WIFI} hw ether $(nvram get ${RTORCFG_WIFI}_hwaddr)
		ifconfig "${RTORCFG_WIFI}" up
		brctl addif "$brname" "${RTORCFG_WIFI}"
	fi
}

wifi_rtor_onemesh_addvlan() {
	echo "=====>>>>> wifi_rtor_onemesh_addvlan" >$STDOUT
	local brname
	local hvlan=$((0x20)) gvlan=0
	get_brname brname
	for band in "2g" "5g"; do
		case $band in
			2g)
				RTORCFG_WIFI="wl1.4"
				vif="wl15"
			;;
			5g)
				RTORCFG_WIFI="wl0.4"
				vif="wl05"
			;;
		esac

		config_get onemesh_config $vif onemesh_config
		if [ "$onemesh_config" == "on" ]; then
			brctl setifvlan "$brname" "${RTORCFG_WIFI}" "$hvlan" 1
		fi
		done
}

wifi_rtor_onemesh_config() {
	local dev="$1"
	local close11N
	local vif=""
	local guest_enable="0"
	local backhaul_enable="0"
	local guest_vif=""
	local hwmode=""
	echo "=====>>>>> $dev: wifi_rtor_onemesh_config" >$STDOUT

	config_get band $dev band
	case $band in
		2g)
			RTORCFG_WIFI="wl1.4"
			WIFI_DEV="wl1"
			WIFI_UNIT="1.4"
		;;
		5g)
			RTORCFG_WIFI="wl0.4"
			WIFI_DEV="wl0"
			WIFI_UNIT="0.4"
        ;;
	esac

	config_get onemesh_config $vif onemesh_config

	if [ "$onemesh_config" == "on" ];then
		vif="${dev}5"
		config_get ssid $vif ssid
		config_get encryption $vif encryption
		config_get wds $vif wds
		config_get psk_version $vif psk_version
		config_get psk_cipher $vif psk_cipher
		config_get hwmode $dev hwmode
		#host hwmode 
		nvram set ${RTORCFG_WIFI}_ssid="$ssid"
		nvram set ${RTORCFG_WIFI}_radio="1"

		config_get_bool hidden $vif hidden
		if [ "$hidden" == "1" ]; then
			nvram set ${RTORCFG_WIFI}_closed="1"
		else
			nvram set ${RTORCFG_WIFI}_closed="0"
		fi

		local max_sta=64
		if [ "$band" = "2g" -o "$band" = "5g" ]; then
			max_sta=$(uci get profile.@wireless[0].max_sta_number_$band -c /etc/profile.d)
		fi
		nvram set ${RTORCFG_WIFI}_cfg_maxassoc="$max_sta"
		nvram set ${RTORCFG_WIFI}_bss_maxassoc="$max_sta"
		nvram set ${RTORCFG_WIFI}_bss_maxassoc="$max_sta" #need to check guestNet num

		if [ "$encryption" == "none" ]; then
			nvram set ${RTORCFG_WIFI}_wep="disabled"
			nvram set ${RTORCFG_WIFI}_auth="0"
			nvram set ${RTORCFG_WIFI}_akm=""
		elif [ "$encryption" == "psk" ]; then
			if [ "$psk_version" == "wpa" ]; then
				nvram set ${RTORCFG_WIFI}_akm="psk"
			elif [ "$psk_version" == "rsn" ]; then
				nvram set ${RTORCFG_WIFI}_akm="psk2"
	else
				nvram set ${RTORCFG_WIFI}_akm="psk psk2"
			fi
			if [ "$psk_cipher" == "aes" ]; then
				nvram set ${RTORCFG_WIFI}_crypto="aes"
			elif [ "$psk_cipher" == "tkip" ]; then
				nvram set ${RTORCFG_WIFI}_crypto="tkip"
				nvram set ${RTORCFG_WIFI}_nmode="0"
				config_get channel $dev channel
				if [ "$channel" = "auto" ]; then
					nvram set ${RTORCFG_WIFI}_chanspec="0"
				else
					nvram set ${RTORCFG_WIFI}_chanspec="$channel"
				fi
			else
				if [ "$hwmode" == "11ax" -o "$hwmode" == "11ax_5" ]; then
						#ax only mode donnot support tkip
						nvram set ${RTORCFG_WIFI}_crypto="aes"
				else
						nvram set ${RTORCFG_WIFI}_crypto="tkip+aes"
				fi
			fi

			config_get psk_key $vif psk_key
			nvram set ${RTORCFG_WIFI}_wpa_psk="$psk_key"
			config_get wpa_group_rekey $dev wpa_group_rekey
			if [ -z "$wpa_group_rekey" ]; then
				nvram set ${RTORCFG_WIFI}_wpa_gtk_rekey="0"
			else
				nvram set ${RTORCFG_WIFI}_wpa_gtk_rekey="$wpa_group_rekey"
			fi
			nvram set ${RTORCFG_WIFI}_wep="disabled"
			nvram set ${RTORCFG_WIFI}_auth="0"
		#add by zhangshengbo for wpa3 personal
		elif [ "$encryption" == "psk_sae" ]; then
			if [ "$psk_version" == "sae_transition" ]; then
				nvram set ${RTORCFG_WIFI}_akm="psk2 sae"
			else
				#psk_version==sae_only
				nvram set ${RTORCFG_WIFI}_akm="sae"
			fi
			nvram set ${RTORCFG_WIFI}_crypto="aes"

			config_get psk_key $vif psk_key
			nvram set ${RTORCFG_WIFI}_wpa_psk="$psk_key"
			config_get wpa_group_rekey $dev wpa_group_rekey
			if [ -z "$wpa_group_rekey" ]; then
				nvram set ${RTORCFG_WIFI}_wpa_gtk_rekey="0"
			else
				nvram set ${RTORCFG_WIFI}_wpa_gtk_rekey="$wpa_group_rekey"
			fi
			nvram set ${RTORCFG_WIFI}_wep="disabled"
			nvram set ${RTORCFG_WIFI}_auth="0"
		else
			nvram set ${RTORCFG_WIFI}_wep="disabled"
			nvram set ${RTORCFG_WIFI}_auth="0"
			nvram set ${RTORCFG_WIFI}_akm=""
			echo "ERROR: $dev, encryption is not correct" >$CONSOLE
		fi
		config_get_bool isolate $vif isolate
		nvram set ${RTORCFG_WIFI}_ap_isolate="$isolate"
		nvram set ${RTORCFG_WIFI}_wme="on"
		nvram set ${RTORCFG_WIFI}_bss_enabled="1"
		nvram set ${RTORCFG_WIFI}_mode="ap"
		nvram set ${RTORCFG_WIFI}_infra="1"
		nvram set ${RTORCFG_WIFI}_unit="$WIFI_UNIT"
		nvram set ${RTORCFG_WIFI}_ifname="${RTORCFG_WIFI}"
		nvram set ${RTORCFG_WIFI}_wps_mode="disabled"
		nvram set ${RTORCFG_WIFI}_sta_retry_time="5"
		nvram set ${RTORCFG_WIFI}_wmf_bss_enable="1"

		# set DWDS
		nvram set ${RTORCFG_WIFI}_dwds="1"
		
		child_vifs_tmp="`nvram get ${WIFI_DEV}_vifs`"
		echo ${child_vifs_tmp} | grep -q ${RTORCFG_WIFI} || nvram set ${WIFI_DEV}_vifs="${child_vifs_tmp} ${RTORCFG_WIFI}"		

		br0_ifnames_tmp="`nvram get br0_ifnames`"
		echo ${br0_ifnames_tmp} | grep -q ${RTORCFG_WIFI} || nvram set br0_ifnames="${br0_ifnames_tmp} ${RTORCFG_WIFI}"
		lan_ifnames_tmp="`nvram get lan_ifnames`"
		echo ${lan_ifnames_tmp} | grep -q ${RTORCFG_WIFI} || nvram set lan_ifnames="${lan_ifnames_tmp} ${RTORCFG_WIFI}"
	fi
}

wifi_host_config() {
	local dev="$1"
	local close11N
	local vif=""
	local eth_enable="0"
	local guest_enable="0"
	local backhaul_enable="0"
	local wds_enable="0"
	local guest_vif=""
	local hwmode=""
	echo "=====>>>>> $dev: wifi_host_config" >$STDOUT

	config_get_bool wifi_disabled $dev disabled

	config_get band $dev band
	case $band in
		2g)
			HOST_WIFI="wl1.1"
			WIFI_DEV="wl1"
			WIFI_UNIT="1.1"
		;;
		5g)
			HOST_WIFI="wl0.1"
			WIFI_DEV="wl0"
			WIFI_UNIT="0.1"
		;;
	esac

	if [ "$wifi_disabled" = "0" ]; then
		vif="${dev}3"
		config_get ssid $vif ssid
		config_get encryption $vif encryption
		config_get wds $vif wds
		config_get psk_version $vif psk_version
		config_get psk_cipher $vif psk_cipher
		config_get hwmode $dev hwmode
		#host hwmode 
		nvram set ${HOST_WIFI}_ssid="$ssid"
		nvram set ${HOST_WIFI}_radio="1"

		config_get_bool hidden $vif hidden
		if [ "$hidden" == "1" ]; then
			nvram set ${HOST_WIFI}_closed="1"
		else
			nvram set ${HOST_WIFI}_closed="0"
		fi

		local max_sta=64
		if [ "$band" = "2g" -o "$band" = "5g" ]; then
			max_sta=$(uci get profile.@wireless[0].max_sta_number_$band -c /etc/profile.d)
		fi
		nvram set ${WIFI_DEV}_cfg_maxassoc="$max_sta"
		nvram set ${WIFI_DEV}_bss_maxassoc="$max_sta"
		nvram set ${HOST_WIFI}_bss_maxassoc="$max_sta" #need to check guestNet num

		if [ "$encryption" == "none" ]; then
			nvram set ${HOST_WIFI}_wep="disabled"
			nvram set ${HOST_WIFI}_auth="0"
			nvram set ${HOST_WIFI}_akm=""
		elif [ "$encryption" == "psk" ]; then
			if [ "$psk_version" == "wpa" ]; then
				nvram set ${HOST_WIFI}_akm="psk"
			elif [ "$psk_version" == "rsn" ]; then
				nvram set ${HOST_WIFI}_akm="psk2"
			else
				nvram set ${HOST_WIFI}_akm="psk psk2"
			fi
			if [ "$psk_cipher" == "aes" ]; then
				nvram set ${HOST_WIFI}_crypto="aes"
			elif [ "$psk_cipher" == "tkip" ]; then
				nvram set ${HOST_WIFI}_crypto="tkip"
				nvram set ${WIFI_DEV}_nmode="0"
				config_get channel $dev channel
				if [ "$channel" = "auto" ]; then
					nvram set ${WIFI_DEV}_chanspec="0"
				else
					nvram set ${WIFI_DEV}_chanspec="$channel"
				fi
			else
				if [ "$hwmode" == "11ax" -o "$hwmode" == "11ax_5" ]; then
						#ax only mode donnot support tkip
						nvram set ${HOST_WIFI}_crypto="aes"
				else
						nvram set ${HOST_WIFI}_crypto="tkip+aes"
				fi
			fi

			config_get psk_key $vif psk_key
			nvram set ${HOST_WIFI}_wpa_psk="$psk_key"
			config_get wpa_group_rekey $dev wpa_group_rekey
			if [ -z "$wpa_group_rekey" ]; then
				nvram set ${HOST_WIFI}_wpa_gtk_rekey="0"
			else
				nvram set ${HOST_WIFI}_wpa_gtk_rekey="$wpa_group_rekey"
			fi
			nvram set ${HOST_WIFI}_wep="disabled"
			nvram set ${HOST_WIFI}_auth="0"
		#add by zhangshengbo for wpa3 personal
		elif [ "$encryption" == "psk_sae" ]; then
			if [ "$psk_version" == "sae_transition" ]; then
				nvram set ${HOST_WIFI}_akm="psk2 sae"
			else
				#psk_version==sae_only
				nvram set ${HOST_WIFI}_akm="sae"
			fi
			nvram set ${HOST_WIFI}_crypto="aes"

			config_get psk_key $vif psk_key
			nvram set ${HOST_WIFI}_wpa_psk="$psk_key"
			config_get wpa_group_rekey $dev wpa_group_rekey
			if [ -z "$wpa_group_rekey" ]; then
				nvram set ${HOST_WIFI}_wpa_gtk_rekey="0"
			else
				nvram set ${HOST_WIFI}_wpa_gtk_rekey="$wpa_group_rekey"
			fi
			nvram set ${HOST_WIFI}_wep="disabled"
			nvram set ${HOST_WIFI}_auth="0"
		elif [ "$encryption" == "wpa" ]; then
			#add by zhangshengbo, set wlx_preauth=0 temporarily
			#this para can be set to 0/1 for wpa-enterprise

			nvram set ${HOST_WIFI}_preauth="0"

			config_get wpa_version $vif wpa_version
			config_get wpa_cipher $vif wpa_cipher

			if [ "$wpa_version" == "wpa" ]; then
				nvram set ${HOST_WIFI}_akm="wpa"
			elif [ "$wpa_version" == "rsn" ]; then
				nvram set ${HOST_WIFI}_akm="wpa2"
			else
				nvram set ${HOST_WIFI}_akm="wpa wpa2"
			fi
			if [ "$wpa_cipher" == "aes" ]; then
				nvram set ${HOST_WIFI}_crypto="aes"
			elif [ "$wpa_cipher" == "tkip" ]; then
				nvram set ${HOST_WIFI}_crypto="tkip"
			else
				if [ "$hwmode" == "11ax" -o "$hwmode" == "11ax_5" ]; then
					#ax only mode donnot support tkip
					nvram set ${HOST_WIFI}_crypto="aes"
				else
					nvram set ${HOST_WIFI}_crypto="tkip+aes"
				fi
			fi

			config_get server $vif server
			nvram set ${HOST_WIFI}_radius_ipaddr="$server"
			config_get port $vif port
			nvram set ${HOST_WIFI}_radius_port="$port"
			config_get wpa_key $vif wpa_key
			nvram set ${HOST_WIFI}_radius_key="$wpa_key"
			config_get wpa_group_rekey $dev wpa_group_rekey
			if [ -z "$wpa_group_rekey" ]; then
				nvram set ${HOST_WIFI}_wpa_gtk_rekey="0"
			else
				nvram set ${HOST_WIFI}_wpa_gtk_rekey="$wpa_group_rekey"
			fi
			nvram set ${HOST_WIFI}_wep="disabled"
			nvram set ${HOST_WIFI}_auth="0"
			nvram set ${HOST_WIFI}_mfp="0"
		elif [ "$encryption" == "wep" ]; then
			nvram set ${HOST_WIFI}_preauth=""
			nvram set ${HOST_WIFI}_wep="enabled"
			config_get wep_mode $vif wep_mode
			if [ "$wep_mode" == "shared" ]; then
				nvram set ${HOST_WIFI}_auth="1"
			else
				nvram set ${HOST_WIFI}_auth="0"
			fi

			config_get wep_key1 $vif wep_key1
			nvram set ${HOST_WIFI}_key1="$wep_key1"
			nvram set ${HOST_WIFI}_key="1"
			nvram set ${HOST_WIFI}_akm=""
			nvram set ${HOST_WIFI}_mfp="0"
		else
			nvram set ${HOST_WIFI}_wep="disabled"
			nvram set ${HOST_WIFI}_auth="0"
			nvram set ${HOST_WIFI}_akm=""
			echo "ERROR: $dev, encryption is not correct" >$CONSOLE
		fi

		nvram set ${HOST_WIFI}_wme="on"
		nvram set ${HOST_WIFI}_bss_enabled="1"
		nvram set ${HOST_WIFI}_mode="ap"
		nvram set ${HOST_WIFI}_infra="1"
		nvram set ${HOST_WIFI}_unit="$WIFI_UNIT"
		nvram set ${HOST_WIFI}_ifname="${HOST_WIFI}"
		# set ${HOST_WIFI}_wps_mode="disabled"
		nvram set ${HOST_WIFI}_sta_retry_time="5"
		nvram set ${HOST_WIFI}_wmf_bss_enable="1"

		# set DWDS
		nvram set ${HOST_WIFI}_dwds="0"
		
		child_vifs_tmp="`nvram get ${WIFI_DEV}_vifs`"
		echo ${child_vifs_tmp} | grep -q ${HOST_WIFI} || nvram set ${WIFI_DEV}_vifs="${child_vifs_tmp} ${HOST_WIFI}"		
		br0_ifnames_tmp="`nvram get br0_ifnames`"
		echo ${br0_ifnames_tmp} | grep -q ${HOST_WIFI} || nvram set br0_ifnames="${br0_ifnames_tmp} ${HOST_WIFI}"
		lan_ifnames_tmp="`nvram get lan_ifnames`"
		echo ${lan_ifnames_tmp} | grep -q ${HOST_WIFI} || nvram set lan_ifnames="${lan_ifnames_tmp} ${HOST_WIFI}"
	else
		echo "=====>>>>> $dev: the $dev is off or the guest is off" >$STDOUT
	fi
}

wifi_guest_config() {
	local dev="$1"
	local close11N
	local vif=""
	local eth_enable="0"
	local guest_enable="0"
	local backhaul_enable="0"
	local wds_enable="0"
	local guest_vif=""
	local backhaul_vif=""
	local hwmode=""
	echo "=====>>>>> $dev: wifi_guest_config" >$STDOUT

	config_get_bool wifi_disabled $dev disabled
	if [ "$wifi_disabled" = "0" ]; then
		config_get vifs $dev vifs
		for vif in $vifs; do
			config_get_bool enable $vif enable
			config_get mode $vif mode
			config_get guest $vif guest
			config_get backhaul $vif backhaul
			if [ "$enable" = "1" -a "$mode" = "ap" -a -z "$guest" -a -z "$backhaul" ]; then
				eth_enable="1"
			elif [ "$mode" = "ap" -a "$guest" = "on" ]; then
				eth_enable="1"
				guest_enable="1"
				guest_vif="$vif"
			elif [ "$mode" = "ap" -a "$backhaul" = "on" ]; then
				eth_enable="1"
				backhaul_enable="1"
				backhaul_vif="$vif"
			elif [ "$enable" = "1" -a "$mode" = "sta" ]; then
				eth_enable="1"
				wds_enable="1"
			else
				echo "=====>>>>> $dev: vif $vif is disabled" >$STDOUT
			fi
		done
	fi

	config_get band $dev band
	case $band in
		2g)
			GUEST_WIFI="wl1.3"
			WIFI_DEV="wl1"
			WIFI_UNIT="1.3"
		;;
		5g)
			GUEST_WIFI="wl0.3"
			WIFI_DEV="wl0"
			WIFI_UNIT="0.3"
		;;
	esac

	if [ "$eth_enable" = "1" -a "$guest_enable" = "1" ]; then
		vif="$guest_vif"
		config_get ssid $vif ssid
		config_get encryption $vif encryption
		config_get wds $vif wds
		config_get psk_version $vif psk_version
		config_get psk_cipher $vif psk_cipher
		config_get hwmode $dev hwmode
		#guest hwmode follow host
		nvram set ${GUEST_WIFI}_ssid="$ssid"
		nvram set ${GUEST_WIFI}_radio="1"

		config_get_bool hidden $vif hidden
		if [ "$hidden" == "1" ]; then
			nvram set ${GUEST_WIFI}_closed="1"
		else
			nvram set ${GUEST_WIFI}_closed="0"
		fi
		nvram set ${GUEST_WIFI}_bss_maxassoc="128" #need to check guestNet num

		if [ "$encryption" == "none" ]; then
			nvram set ${GUEST_WIFI}_wep="disabled"
			nvram set ${GUEST_WIFI}_auth="0"
			nvram set ${GUEST_WIFI}_akm=""
		elif [ "$encryption" == "psk" ]; then
			if [ "$psk_version" == "wpa" ]; then
				nvram set ${GUEST_WIFI}_akm="psk"
			elif [ "$psk_version" == "rsn" ]; then
				nvram set ${GUEST_WIFI}_akm="psk2"
			else
				nvram set ${GUEST_WIFI}_akm="psk psk2"
			fi
			if [ "$psk_cipher" == "aes" ]; then
				nvram set ${GUEST_WIFI}_crypto="aes"
			elif [ "$psk_cipher" == "tkip" ]; then
				nvram set ${GUEST_WIFI}_crypto="tkip"
				nvram set ${WIFI_DEV}_nmode="0"
				config_get channel $dev channel
				if [ "$channel" = "auto" ]; then
					nvram set ${WIFI_DEV}_chanspec="0"
				else
					nvram set ${WIFI_DEV}_chanspec="$channel"
				fi
			else
				if [ "$hwmode" == "11ax" -o "$hwmode" == "11ax_5" ]; then
						#ax only mode donnot support tkip
						nvram set ${GUEST_WIFI}_crypto="aes"
				else
						nvram set ${GUEST_WIFI}_crypto="tkip+aes"
				fi
			fi

			config_get psk_key $vif psk_key
			nvram set ${GUEST_WIFI}_wpa_psk="$psk_key"
			config_get wpa_group_rekey $dev wpa_group_rekey
			if [ -z "$wpa_group_rekey" ]; then
				nvram set ${GUEST_WIFI}_wpa_gtk_rekey="0"
			else
				nvram set ${GUEST_WIFI}_wpa_gtk_rekey="$wpa_group_rekey"
			fi
			nvram set ${GUEST_WIFI}_wep="disabled"
			nvram set ${GUEST_WIFI}_auth="0"
		#add by zhangshengbo for wpa3 personal	
		elif [ "$encryption" == "psk_sae" ]; then
			if [ "$psk_version" == "sae_transition" ]; then
				nvram set ${GUEST_WIFI}_akm="psk2 sae"
			else
			#psk_version==sae_only
				nvram set ${GUEST_WIFI}_akm="sae"
			fi
			nvram set ${GUEST_WIFI}_crypto="aes"
			
			config_get psk_key $vif psk_key
			nvram set ${GUEST_WIFI}_wpa_psk="$psk_key"
			config_get wpa_group_rekey $dev wpa_group_rekey
			if [ -z "$wpa_group_rekey" ]; then
				nvram set ${GUEST_WIFI}_wpa_gtk_rekey="0"
			else
				nvram set ${GUEST_WIFI}_wpa_gtk_rekey="$wpa_group_rekey"
			fi
			nvram set ${GUEST_WIFI}_wep="disabled"
			nvram set ${GUEST_WIFI}_auth="0"
		else
			nvram set ${GUEST_WIFI}_wep="disabled"
			nvram set ${GUEST_WIFI}_auth="0"
			nvram set ${GUEST_WIFI}_akm=""
			echo "ERROR: $dev, encryption is not correct" >$CONSOLE
		fi
		config_get_bool isolate $vif isolate
		nvram set ${GUEST_WIFI}_ap_isolate="$isolate"
		nvram set ${GUEST_WIFI}_wme="on"
		nvram set ${GUEST_WIFI}_bss_enabled="1"
		nvram set ${GUEST_WIFI}_mode="ap"
		nvram set ${GUEST_WIFI}_infra="1"
		nvram set ${GUEST_WIFI}_unit="$WIFI_UNIT"
		nvram set ${GUEST_WIFI}_ifname="${GUEST_WIFI}"
		nvram set ${GUEST_WIFI}_wps_mode="disabled"
		nvram set ${GUEST_WIFI}_sta_retry_time="5"
		nvram set ${GUEST_WIFI}_wmf_bss_enable="1"
		# set DWDS
		nvram set ${GUEST_WIFI}_dwds="0"
		
		child_vifs_tmp="`nvram get ${WIFI_DEV}_vifs`"
		echo ${child_vifs_tmp} | grep -q ${GUEST_WIFI} || nvram set ${WIFI_DEV}_vifs="${child_vifs_tmp} ${GUEST_WIFI}"		

		br0_ifnames_tmp="`nvram get br0_ifnames`"
		echo ${br0_ifnames_tmp} | grep -q ${GUEST_WIFI} || nvram set br0_ifnames="${br0_ifnames_tmp} ${GUEST_WIFI}"
		lan_ifnames_tmp="`nvram get lan_ifnames`"
		echo ${lan_ifnames_tmp} | grep -q ${GUEST_WIFI} || nvram set lan_ifnames="${lan_ifnames_tmp} ${GUEST_WIFI}"
	elif [ "$eth_enable" = "1" -a "$wds_enable" = "0" ]; then
		nvram set ${GUEST_WIFI}_radio="0"
		nvram set ${GUEST_WIFI}_bss_enabled="0"
		nvram set ${GUEST_WIFI}_wps_mode="disabled"
		br0_ifnames_tmp="`nvram get br0_ifnames`"
		echo ${br0_ifnames_tmp} | grep -q ${GUEST_WIFI} && br0_ifnames_tmp="${br0_ifnames_tmp/ ${GUEST_WIFI}/""}"
		nvram set br0_ifnames="$br0_ifnames_tmp"
		lan_ifnames_tmp="`nvram get lan_ifnames`"
		echo ${lan_ifnames_tmp} | grep -q ${GUEST_WIFI} && lan_ifnames_tmp="${lan_ifnames_tmp/ ${GUEST_WIFI}/""}"
		nvram set lan_ifnames="$lan_ifnames_tmp"
	else
		echo "=====>>>>> $dev: the $dev is off or the guest is off" >$STDOUT
	fi
}

wifi_backhaul_switch() {
	local vif="$1"
	local vif_enable="$2"
	
	if [ "$vif_enable" = "on" ]; then
		wl -i $vif bss up
	else
		wl -i $vif bss down
	fi
}

wifi_rtor_onemesh_switch() {
	local dev="$1"
	local vif=""
	
	echo "=====>>>>> wifi_rtor_onemesh_switch" >$STDOUT
		config_get vifs $dev vifs
		for vif in $vifs; do
			config_get_bool enable $vif enable

			config_get mode $vif mode
		config_get onemesh_config $vif onemesh_config
		if [ "$mode" = "ap" -a "$onemesh_config" = "on" ]; then
			config_get ifname $vif ifname
			
			echo "=====>>>>> wifi_rtor_onemesh_switch $dev: vif $vif is config vap, do bss down on $ifname" >$STDOUT
			wl -i $ifname bss down
			fi
			
		done
}

wifi_switch() {
	local dev1="$1"
	local vif="$2"
	local vif_enable="$3"
	config_get_bool wifi_disabled $dev1 disabled		  #hardware switch
	config_get_bool soft_disabled $dev1 disabled_all   #software switch
	
	echo "=====>>>>> wifi_switch vif $vif vif enable $vif_enable" >$STDOUT
	if [ "$vif_enable" = "on" -a "$wifi_disabled" = "0" -a "$soft_disabled" = "0" ]; then
		wl -i $vif bss up
	else
		wl -i $vif bss down
	fi
}

wifi_guest_switch() {
	local dev="$1"
	local vif=""
	config_get_bool wifi_disabled $dev disabled       #hardware switch
	config_get_bool soft_disabled $dev disabled_all   #software switch

	echo "=====>>>>> wifi_guest_switch" >$STDOUT

	if [ "$wifi_disabled" = "0" -a "$soft_disabled" = "0" ]; then
		config_get vifs $dev vifs
		for vif in $vifs; do
			config_get_bool enable $vif enable
			config_get mode $vif mode
			config_get guest $vif guest
			if [ "$mode" = "ap" -a "$guest" = "on" -a "$enable" != "1" ]; then
				config_get band $dev band
				case $band in
					2g)
						GUEST_WIFI="wl1.3"
					;;
					5g)
						GUEST_WIFI="wl0.3"
					;;
				esac
				echo "=====>>>>> wifi_guest_switch $dev: vif $vif is disabled, do bss down on $GUEST_WIFI" >$STDOUT
				wl -i $GUEST_WIFI bss down
			elif [ "$mode" = "ap" -a "$guest" = "on" -a "$enable" = "1" ]; then
				config_get band $dev band
				case $band in
					2g)
						GUEST_WIFI="wl1.3"
					;;
					5g)
						GUEST_WIFI="wl0.3"
					;;
				esac
				echo "=====>>>>> wifi_guest_switch $dev: vif $vif is enabled, do bss up on $GUEST_WIFI" >$STDOUT
				wl -i $GUEST_WIFI bss up
			fi
			
		done
	fi
}

start_eapd(){
	eapd 
}

start_encrypt(){
	if [ $( nvram get hapd_enable ) == "1" ]; then
		hapdsupport -n
		wpa_cli -p /var/run/wl1_wpa_supplicant/ disconnect
		wpa_cli -p /var/run/wl0_wpa_supplicant/ disconnect
		echo "=====>>>>>Disconnect all STA." >$CONSOLE
	else
		nas 
	fi


	local sysmode=`uci get sysmode.sysmode.mode`
	if [ "$sysmode" = "repeater" ];then
		wpa_cli -p /var/run/wl1_wpa_supplicant/ reconfigure
		wpa_cli -p /var/run/wl0_wpa_supplicant/ reconfigure
	fi

	if [ $( nvram get hapd_enable ) == "1" ]; then
		wpa_cli -p /var/run/wl1_wpa_supplicant/ enable_network 0
		wpa_cli -p /var/run/wl0_wpa_supplicant/ enable_network 0
	fi
}

start_wps(){
	wps_restart=`nvram get wps_restart`
	if [ "$wps_restart" == "1" ]; then
		nvram set "wps_restart=0"
	else
		nvram set "wps_restart=0"
		nvram set "wps_proc_status=0"
	fi

	nvram set "wps_sta_pin=00000000"
	if [ $( nvram get hapd_enable ) != "1" ]; then
		killall wps_monitor
		wps_monitor &
	fi
}

start_acsd(){
	local rftestflag=`nvram kget rftestflag`
	if [ "$rftestflag" = "1" ]; then
		acsd
	fi
	#utelnetd -d -i br-lan&
}

start_acsd2(){
	local rftestflag=`nvram kget rftestflag`
	nvram set acs_ifnames="${DEVICES}"
	if [ "$rftestflag" = "1" ]; then
		acsd2
	fi
	#utelnetd -d -i br-lan&
}

start_dhd_monitor(){
    debug_monitor /tmp/crash_logs
}

start_bsd(){
    bsd
}

start_cventd(){
    ceventd
}

start_nrd(){
	/etc/init.d/nrd start
}

start_mcsd(){
	/etc/init.d/mcsd restart
}

stop_eapd(){
	killall eapd
}

stop_encrypt(){
	if [ $( nvram get hapd_enable ) == "1" ]; then
		killall hostapd
	else
		killall nas
	fi
}

stop_wps(){
	if [ $( nvram get hapd_enable ) != "1" ]; then
		killall wps_monitor
	fi
}

stop_acsd(){
	killall acsd
}

stop_acsd2(){
	killall acsd2
}

stop_ceventd(){
    killall ceventd
}


stop_dhd_monitor(){
    killall debug_monitor
	rm -rf /tmp/dm
}

stop_bsd(){
    killall bsd
}

stop_nrd(){
	killall nrd
}

stop_mcsd(){
	killall mcsd
}

start_service(){
	start_eapd
	#start_cventd
	start_encrypt
	start_wps
	start_acsd2
	#last call start_dhd_monitor
	start_dhd_monitor
	start_nrd
	start_mcsd
}

stop_service(){
	#first call stop_dhd_monitor
	stop_dhd_monitor
	#stop_cventd
	stop_wps
	stop_encrypt
	stop_eapd
	stop_acsd2
	stop_nrd
}

get_if_var(){    
	#get interface and status
	for dev in ${1:-$DEVICES}; do
		config_get mainvap "$dev" mainvap
			config_get vifs "$dev" vifs
			config_get band "$dev" band
			config_get mac_$band "$dev"  macaddr
			
		eval "vap0_$band"="$mainvap" #for wl0/wl1	
		
		config_get_bool wifi_disabled $dev disabled
		if [ "$wifi_disabled" = "0" ]; then
			for vif in $vifs; do 
				config_get ifname "$vif" ifname
				config_get enable "$vif" enable
				config_get guest  "$vif" guest
				config_get backhaul  "$vif" backhaul
				config_get mode   "$vif" mode
				config_get onemesh_config "$vif" onemesh_config
				if [ "$mode" = "ap" ] && [ -z "$guest" ] && [ -z "$backhaul" ]; then
					eval "vap_host_$band"="$ifname"
					eval "home_$band"="$enable"
				elif [ "$mode" = "ap" ] && [ ! -z "$guest" ]; then
					eval "vap1_$band"="$ifname"
					eval "guest_$band"="$enable"
				elif [ "$mode" = "ap" ] && [ ! -z "$backhaul" ] && [ -z "$onemesh_config" ]; then
					eval "vap2_$band"="$ifname"
					eval "backhaul_$band"="$enable"
				elif [ "$mode" = "ap" ] && [ ! -z "$onemesh_config" ];then
					eval "vap4_$band"="$ifname"
					eval "onemesh_config_$band"="$enable"
				elif [ "$mode" = "sta" ] ; then
					eval "vap3_$band"="$ifname"
					eval "bridge_$band"="$enable"
				else
					echo "ERROR: bad if type." >$CONSOLE
				fi
			done
		else
			# wifi disable by "HW BTN" or "Wireless Schdule"
			# each interface is set to off
			local ifcount=0

			for vif in $vifs; do
				config_get ifname "$vif" ifname

					config_get guest  "$vif" guest
				config_get enable "$vif" enable
					config_get backhaul  "$vif" backhaul
					config_get mode   "$vif" mode
				config_get onemesh_config "$vif" onemesh_config
					if [ "$mode" = "ap" ] && [ -z "$guest" ] && [ -z "$backhaul" ]; then
					eval "vap_host_$band"="$ifname"
						eval "home_$band"="off"
					elif [ "$mode" = "ap" ] && [ ! -z "$guest" ]; then
						eval "vap1_$band"="$ifname"
						eval "guest_$band"="off"
				elif [ "$mode" = "ap" ] && [ ! -z "$backhaul" ] && [ -z "$onemesh_config" ]; then
						eval "vap2_$band"="$ifname"
					eval "backhaul_$band"="$enable"
				elif [ "$mode" = "ap" ] && [ ! -z "$onemesh_config" ];then
					eval "vap4_$band"="$ifname"
					eval "onemesh_config_$band"="$enable"
					elif [ "$mode" = "sta" ] ; then
					eval "vap3_$band"="$ifname"
						eval "bridge_$band"="off"
					else
						echo "ERROR: bad if type." >$CONSOLE
					fi

			done
		fi
	done
}

wifi_start_rftest(){
	local app_name="rftest"
	local brname
	local host_ip

	cd /tmp	
		# get bridge name
		get_brname brname

		#tftp host ip is as same as bridge ip except last part, such as br_ip=192.168.0.1 then host_ip=192.168.0.100
		host_ip=`ifconfig $brname | grep -o 'inet addr:[^ ]*' | grep -o '[^:]*$' | sed -n 's/\(^[^\.]*\.[^\.]*\.[^\.]*\)\..*$/\1\.100/p'`
		echo "INFO:TFTP FROM HOST $host_ip" >$STDOUT
		tftp -gr "$app_name" "$host_ip"
		tftp_status=$?
		sleep 1
		echo "tftp_status=$tftp_status" >$STDOUT
		while [ $tftp_status -ne 0 ]
		do
			echo "WARNING:TFTP $app_name FROM PC ERROR!" >$CONSOLE
			rm -rf "$app_name"
			tftp -gr "$app_name" "$host_ip"
			tftp_status=$?
			sleep 1
			echo "tftp_status=$tftp_status" >$STDOUT
		done
		chmod u+x "$app_name"
	
	
	killall "$app_name"
	
	./"$app_name" -n
	
	echo "======>>>>>start rftest!!" >/dev/console
	
}

wifi_insmod_dhd_test(){
	local wltestko_name="wl.ko"
	local wltestko_tar_name="wltest.tgz"
	local brname
	local host_ip
	module_name_dhd="dhd"
	module_name_wl="wl"
	
	#grep -q '^'$module_name_dhd'\>' /proc/modules || insmod $module_name_dhd 
	#grep -q '^'$module_name_dhd'\>' /proc/modules || echo "insmod dhd.ko failed." >$STDOUT ;

	cd /tmp
		# get bridge name
		get_brname brname

		#tftp host ip is as same as bridge ip except last part, such as br_ip=192.168.0.1 then host_ip=192.168.0.100
		host_ip=`ifconfig $brname | grep -o 'inet addr:[^ ]*' | grep -o '[^:]*$' | sed -n 's/\(^[^\.]*\.[^\.]*\.[^\.]*\)\..*$/\1\.100/p'`
		echo "INFO:TFTP FROM HOST $host_ip" >$STDOUT
		tftp -gr "$wltestko_tar_name" "$host_ip"
		tftp_status=$?
		sleep 1
		echo "tftp_status=$tftp_status" >$STDOUT
		while [ $tftp_status -ne 0 ]
		do
			echo "WARNING:TFTP $wltestko_name FROM PC ERROR!" >$CONSOLE
			rm -rf "$wltestko_tar_name"
			tftp -gr "$wltestko_tar_name" "$host_ip"
			tftp_status=$?
			sleep 1
			echo "tftp_status=$tftp_status" >$STDOUT
		done
	
	tar -zxvf $wltestko_tar_name
	
	#hnd used by igs and emf; emf used by igs; igs used by none
	hnd_isinsmod=$( lsmod | grep hnd )
	echo "hnd_isinsmod = $hnd_isinsmod" >/dev/console
	rmmod igs
	rmmod emf
	rmmod hnd
	
	hnd_isinsmod=$( lsmod | grep hnd )
	while [ "$hnd_isinsmod" != "" ]
	do
		rmmod igs
		rmmod emf
		rmmod hnd
		hnd_isinsmod=$( lsmod | grep hnd )
	done
		
	
	insmod ./hnd.ko
	insmod emf
	insmod igs
	
	module_params="intf_name=wl%d"
	instance_base="instance_base=0"
	module_params=$module_params" "$instance_base
	
	grep -q '^'$module_name_wl'\>' /proc/modules || insmod ./$wltestko_name $module_params
	grep -q '^'$module_name_wl'\>' /proc/modules || echo "insmod wl_wltest.ko failed." >$STDOUT ;
	echo "=====>>>>insmod wltest.ko!!!!" >/dev/console
	wifi_features_set
}

wifi_start_calibrate(){
	echo "=====>>>>> wifi_start_calibrate" >$STDOUT
	/etc/init.d/telnet start
	wifi_insmod_dhd_test
	wifi_start_rftest
}

wifi_sys_led_flick(){
	hz=2		#flick 2 times per second
	sleeptime=`expr 1000000 / $hz / 2`
	while true
	do
		ledcli WIFI2G_ON
		ledcli WIFI5G_ON
		usleep $sleeptime
		ledcli WIFI2G_OFF
		ledcli WIFI5G_OFF
		usleep $sleeptime
	done
}

wifi_driver_startup(){
	echo "=====>>>>> wifi_driver_startup" >$STDOUT
	
	local module_name_4366
	local module_name_4360
	local firmware_path=""
	local firmware_path0_in_nvram=""
	local firmware_path1_in_nvram=""

	local rftestflag=`nvram kget rftestflag`
	# NIC MODE "No dhd.ko"
	# DONGLE MODE "insmod dhd.ko"
	if [ "$rftestflag" = "1" ]; then
		echo "=====>>>>> dongle firmware_path is normal" >$CONSOLE	
		#for t10 button dection
		echo 1 >/proc/rftestflag_file
		# insmod dhd.ko & wl.ko first
		
		module_name_4366="dhd"
		module_name_4360="wl"
		module_params="intf_name=wl%d"
		instance_base="instance_base=0"
		module_params=$module_params" "$instance_base
		#grep -q '^'$module_name_4366'\>' /proc/modules || insmod $module_name_4366 
		#grep -q '^'$module_name_4366'\>' /proc/modules || echo "insmod dhd.ko failed." >$STDOUT ;
		grep -q '^'$module_name_4360'\>' /proc/modules || insmod $module_name_4360 $module_params
		grep -q '^'$module_name_4360'\>' /proc/modules || echo "insmod wl.ko failed." >$STDOUT ;
		wifi_features_set
		#execute wifi_features_set in  wifi_insmod_dhd_test when not calibrated
		#set features before rftest
	fi
	
	local sysmode=`uci get sysmode.sysmode.mode`
	local first_login=`uci get system.system.first_login`
    local factory_mode=`uci get factory.factorymode.enable`

    if [ "$factory_mode" = "yes" ];then
       echo "=====>>>>> killall wpa_supplicant and meshd in factory mode" > $CONSOLE
       killall wpa_supplicant
       killall meshd
    fi

	#sta vaps only start when the first boot after factory reset
	if [ "$sysmode" = "router" -a "$first_login" = "false" ];then
		echo "=====>>>>> killall wpa_supplicant" > $CONSOLE
		killall wpa_supplicant
	fi
}

wifi_features_set(){
	local rftestflag=`nvram kget rftestflag`
	config_get onemesh_enable onemesh enable "on"

	# get bridge name
	get_brname brname

	# get if and status
	get_if_var
	nvram unset acs_ifnames
	local sysmode=`uci get sysmode.sysmode.mode`
	for band in "2g" "5g"; do
		if [ "$WIFI_SCHEDULE" = "1" ]; then
			wireless_schedule_disable_wifi "$band" && continue
		fi
		eval local vap0=\${vap0_$band} vap1=\${vap1_$band} vap_host=\${vap_host_$band}
		eval local home=\${home_$band} guest=\${guest_$band} bridge=\${bridge_$band} backhaul=\${backhaul_$band}
		eval local mac=\${mac_$band}
		#echo "DEBUG:" $band $vap0 $vap1 $home $guest $bridge >$STDOUT

		#set features that can only use wl cmds
		if [ "$home" = "on" -o "$guest" = "on" -o "$backhaul" = "on" -o "$bridge" = "on" ]; then 
			# set he
			wl -i "$vap0" he 1
			
			if [ "$band" = "2g" ]; then
				# set vht feature for 2g
				wl -i "$vap0" vht_features 0x7 # let 2g support 1024QAM
			fi

			config_get hwmode $dev hwmode
			if [ "$band" = "2g" ]; then
				if [ "$hwmode" = "11g" -o "$hwmode" = "11bg" ]; then
					wl -i "$vap0" vhtmode 0 # 1024QAM is off, default is on(1)
				fi
			else
				if [ "$hwmode" = "11a" -o "$hwmode" = "11n" -o "$hwmode" = "11an" ]; then
					wl -i "$vap0" vhtmode 0
				fi
		 	fi
			
			local twt=`uci get wireless.twt.enable`
			if [ "$hwmode" = "11ax" -o "$hwmode" = "11ax_5" -o "$hwmode" = "11bgnax" -o "$hwmode" = "11anacax" ]; then
				if [ "$twt" = "on" ]; then
					wl -i "$vap0" twt 1
				else
					wl -i "$vap0" twt 0
				fi
			else
				wl -i "$vap0" twt 0
			fi	

			brctl addif "$brname" "$vap0"
			ifconfig "$vap0" up
			wlconf "$vap0" up
			
			wl -i "$vap0" keep_ap_up 1

			# change 2G spatical_policy, default(-1)
			local spatial_policy=`nvram get wl1_spatial_policy`

			if [ "$band" = "2g" ]; then 
				if [ "$spatial_policy" = "0" ]; then
					wl -i "$vap0" spatial_policy 0
				fi	
			fi
			# end of 2G spatial_policy
			
			# set 2G & 5G promisc
			# wl -i "$vap0" promisc 0
			
			if [ "$band" = "2g" ]; then
				# set phy_ed_thresh(cca) for 2g AX1500/AX10,default(-66)
				wl -i "$vap0" phy_ed_thresh -40
			fi

			# wds bridge
			if [ "$bridge" = "on" ]; then 
				#format xx:xx:xx:xx:xx:xx 
				#ifconfig $vap1 hw ether ${mac//-/:}
				#brctl addif "$brname" $vap1
				#ifconfig "$vap1" up
				# enable recv all multicast traffic
				wl -i "$vap0" allmulti 1
			fi

			# guest network
			#if [ "$guest" = "on" ]; then 
			#	ifconfig $vap1 hw ether $(fix_vif_mac $mac "init")
			#	brctl addif "$brname" "$vap1"
			#	ifconfig "$vap1" up  
			#	#TODO: set guest network in firewall
			#fi
			
			#ifconfig $vap1 hw ether $(fix_vif_mac $mac "init")
			
			ifconfig ${vap_host} hw ether $(nvram get ${vap_host}_hwaddr)
			ifconfig "${vap_host}" up
			brctl addif "$brname" "$vap_host"

			#tp guest mac rule differs from bcm rule(in wlconf)
			#so that ifconfig guest mac is different from wl status mac
			#keep the same rule with bcm
			ifconfig $vap1 hw ether $(nvram get ${vap1}_hwaddr)
			ifconfig "$vap1" up 
			brctl addif "$brname" "$vap1" 

			# backhaul network
			if [ "$rftestflag" = "1" -a "$onemesh_enable" = "on" ]; then
				wifi_backhaul_addif $band $mac
				if [ "$sysmode" = "router" ];then
					wifi_rtor_onemesh_addif $band
				fi
			fi
			#wifi_backhaul_addif $band $mac

			#low = middle - 3db = high - 6db
			#modified by Peng Zhengwei, adapt 121.37 wl version
			config_get txpower $vap0 txpower
			if [ "$txpower" = "high" ]; then
				wl -i $vap0 txpwr_degrade 0
			elif [ "$txpower" = "middle" ]; then
				wl -i $vap0 txpwr_degrade 12
			else
				wl -i $vap0 txpwr_degrade 24
			fi

			config_get_bool shortgi $vap0 shortgi
			if [ "$shortgi" = "1" ]; then
				wl -i $vap0 sgi_tx -1
			else
				wl -i $vap0 sgi_tx -1
			fi
		else
			wlconf "$vap0" down
		fi
	done

	#add TP IE
	wifi_onemesh_config
	
	wifi_easymesh_config

	#start programs
	start_service 

	for band in "2g" "5g"; do
		if [ "$WIFI_SCHEDULE" = "1" ]; then
			wireless_schedule_disable_wifi "$band" && continue
		fi
		eval local vap0=\${vap0_$band} vap1=\${vap1_$band} vap_host=\${vap_host_$band}
		eval local home=\${home_$band} guest=\${guest_$band} bridge=\${bridge_$band} backhaul=\${backhaul_$band}
		if [ "$home" = "on" -o "$guest" = "on" -o "$backhaul" = "on" -o "$bridge" = "on" ]; then 
			wlconf "$vap0" start
		fi
		wifi_switch $vap0 $vap_host $home
		wifi_switch $vap0 $vap1 $guest
	done

	if [ "$sysmode" != "repeater" ];then
		wpa_pid=$(pgrep wpa_supplicant)
		if [ -n "$wpa_pid" ];then
			echo "============" > $STDOUT
			acs_cli2 -i wl1 autochannel &
		else
			echo "************" > $STDOUT
			acs_cli2 -i wl1.1 autochannel &
		fi
	fi

	wifi_vlan notaddif
	if [ "$rftestflag" = "1" -a "$onemesh_enable" = "on" ]; then
		wifi_backhaul_addvlan
		if [ "$sysmode" = "router" ];then
			wifi_rtor_onemesh_addvlan
		fi
	fi
	
	if [ "$rftestflag" = "1" ]; then
		for dev in ${1:-$DEVICES}; do
			config_get band "$dev" band
			eval local vap0=\${vap0_$band} vap2=\${vap2_$band}
			eval local backhaul=\${backhaul_$band}
			wifi_backhaul_switch $vap2 $backhaul
			wifi_rtor_onemesh_switch $vap0
		done
	fi
}

wifi_driver_stop(){
	echo "=====>>>>> wifi_driverStop" >$STDOUT


	# get bridge name
	get_brname brname

	# get if and status
	get_if_var

	# br-lan down
	#ifconfig "$brname" down

	for band in "2g" "5g"; do
		eval local vap0=\${vap0_$band} vap1=\${vap1_$band} vap_host=\${vap_host_$band} vap2=\${vap2_$band} vap4=\${vap4_$band}
		eval local home=\${home_$band} guest=\${guest_$band} bridge=\${bridge_$band}
		eval local mac=\${mac_$band}

		for ifd in "$vap0" "$vap_host" "$vap1" "$vap2" "$vap4"; do 
			wlconf "$ifd" down
			ifconfig "$ifd" down
			brctl delif "$brname" "$ifd" 
		done
		
		#TODO set only for wds ?
		ifconfig "$vap1" hw ether $(fix_vif_mac $mac "stop")
	done
	
	#only for AC2300, hardware button pressing don't rmmod wl.ko & dhd.ko,so just down all the interface & remove them from br-lan
	#for ifd in "wl0" "wl0.3" "wl1" "wl1.3"; do 
	#		wlconf "$ifd" down
	#		ifconfig "$ifd" down
	#		brctl delif "br-lan" "$ifd" 
	#done
	
	# rmmod dhd.ko & wl.ko
	#local module_name_4366=dhd
	#local module_name_4360=wl
	#grep -q '^'$module_name_4366'\>' /proc/modules && rmmod $module_name_4366 
	#grep -q '^'$module_name_4360'\>' /proc/modules && rmmod $module_name_4360
	
	# stop programs
	stop_service

	# br-lan up
	#ifconfig "$brname" up
	/etc/init.d/imb restart
	ubus call network.interface.lan static_routes_recovery
}

# fix_guest_mac $1=xx-xx-xx-xx-xx-xx $2=init/stop
fix_vif_mac(){
	idx=0
	if [ -z $2 ];then
		echo $1
		return;
	fi
	for m in ${1//-/ }
	do 
		m=0x$m
		if [ $idx = 0 ]; then
			 if [ $2 = "init" ]; then
				 a=$(($m & 0xe3))
				 b=$(($m & 0x1c))
				 c=$(( $((1<<2)) ^ $b ))
				 m=$(($a | $c))
				 m=$(($m | 0x2))
			 elif [ $2 = "stop" ]; then
				 m=$(($m | 0x2))
			 fi
		elif [ $idx = 5 ]; then
			if [ $2 = "init" ]; then
				a=$(($m & 0xf0))
				b=$(($m + 1))
				c=$((0xf & $b))
				m=$(($a | $c))
			fi
		fi
		printf "%02x" $m
		if [ ! $idx = 5 ]; then
			printf ":"
		fi
		idx=$((idx+1))
	done 
}

wifi_smart_config()
{
	local sysmode=`uci get sysmode.sysmode.mode`
	local onemesh_enable=`uci get onemesh.onemesh.enable`
	local smart_enable=`uci get wireless.smart.smart_enable`

	[ -z "$sysmode" ] && sysmode="router"
	[ -z "$onemesh_enable" ] && onemesh_enable="on"
	[ -z "$smart_enable" ] && smart_enable="off"
    nvram set bsd_role="3"
	#use bsd rules in the bsd src code
	nvram unset bsd_ifnames
	
    if [ "${smart_enable}" = "on" ]; then
	    stop_bsd
	    # only for AX10, bsd has some problem, use band-steering in nrd instead
	    # start_bsd
	elif [ "${smart_enable}" = "off" ]; then
		stop_bsd
	fi
}

wifi_smart() {
    echo "=====>>>>> wifi_smart()" >$STDOUT

	stop_nrd

	wifi_smart_config

	# FIXME: Here reload wifi to make wlX_rrm take effect,
	#        but if 2.4G/5G SSID is different, wifi will be reloaded twice.
	wifi_reload

	start_nrd
}

# close advance features for factory test
wifi_factory_close_config() {
	local dev="$1"
	config_get band $dev band
	local HOME_WIFI=""
	case $band in
		2g)
			HOME_WIFI=wl1.1
		;;
		5g)
			HOME_WIFI=wl0.1
		;;
	esac

	_tp_close_dfs_tmp="`nvram get _tp_close_dfs_tmp`"
	if [ "$_tp_close_dfs_tmp" = "1" ]; then
		nvram set ${HOME_WIFI}_reg_mode="off"
	fi

	_tp_close_txbf_tmp="`nvram get _tp_close_txbf_tmp`"
	if [ "$_tp_close_txbf_tmp" = "1" ]; then
		nvram set ${HOME_WIFI}_txbf_imp="0"
		nvram set ${HOME_WIFI}_txbf_bfr_cap="0"
		nvram set ${HOME_WIFI}_txbf_bfe_cap="0"
		nvram set ${HOME_WIFI}_mu_features="0"
	fi
}

wifi_nvram_config() {
	local rftestflag=`nvram kget rftestflag`
	config_get onemesh_enable onemesh enable "on"
	local easymesh_enable=`uci get meshd.meshd.enableeasymesh`
	
	wifi_easymesh_config
	

	for dev in ${DEVICES}; do  # wl0 wl1
		wifi_basic_config $dev
		wifi_security_config $dev
		wifi_macfilter_config $dev
		wifi_advanced_config $dev
		wifi_atf_config $dev
		wifi_mu_mimo_config $dev
		wifi_wps_config $dev
		#wifi_wds_config $dev
		#wifi_psta_config $dev
                #lizhou@tp-link.com.cn    2019-6-17
                #enable wet
		#wifi_dwds_config $dev
		if [ "$rftestflag" = "1" ]; then
			wifi_wet_config $dev
	                #END    2019-6-17
			wifi_host_config $dev
			wifi_guest_config $dev
			[ "$easymesh_enable" = "on" -o "$onemesh_enable" = "on" ] && wifi_backhaul_config $dev 
			[ "$onemesh_enable" = "on" ] && {
				local sysmode=`uci get sysmode.sysmode.mode`
				if [ "$sysmode" = "router" ];then
					wifi_rtor_onemesh_config $dev
				fi
			}
		fi
		wifi_factory_close_config $dev	# the last one
	done
}

# add by wanghaisen@tp-link.com.cn
# Only for AX10 to config the nvram setting of vifs when the DUTS start 
wifi_init_nvram_vifs_config(){
	local rftestflag=`nvram kget rftestflag`
	config_get onemesh_enable onemesh enable "on"
	for dev in ${DEVICES}; do
		if [ "$rftestflag" = "1" ]; then
            wifi_wet_config $dev
                    #END    2019-6-17
            wifi_guest_config $dev
           	[ "$onemesh_enable" = "on" ] && wifi_backhaul_config $dev
        fi	
	done	
}

wifi_calibrate_data_check() {

	echo "=====>>>>> wifi_calibrate_data_check" >$CONSOLE
	
	local txlauncherflag=`nvram get txlauncher_flag`
	pro_id=`getfirm PRODUCT_ID`
	nvrammanager -r /tmp/par_tbl -p radio_bk
	cal_cbr /tmp/par_tbl "$pro_id" radio_bk
	if [ "$?" = "0" ]; then
        RFTEST=0
	fi

    # add by wanghaisen@tp-link.com.cn
	# Only for aging test of AX10
	# In AX10, when rftestflag=1 in radio_bak, `cal_cbr /tmp/par_tbl "$pro_id" radio_bk` will reset rftestflag in nvram to 1 and return 1 
	# So if we `nvram kset rftestflag=0` before executing `cal_cbr`, we cannot enter factory test mode when doing aging test
	if [ "$txlauncherflag" = "1" ]; then
		RFTEST=0
		nvram kset rftestflag="0"
	fi

	if [ "$RFTEST" = "0" ]; then
		echo "!!! no rftestflag, need to calibrate! start to calibrate....." >/dev/console
		wifi_sys_led_flick &
		#/etc/init.d/phyport start
		wifi_start_calibrate
	fi
	rm -rf /tmp/par_tbl
	wifi_led_set
	echo "inited" >/tmp/wifi_state #tell others wifi is inited
}


wifi_led_set() {
	local led_state=""

	for dev in ${DEVICES}; do
		config_get disabled $dev disabled
		config_get disabled_all $dev disabled_all
		config_get band $dev band
		# get host_vap(wl03/wl13) enable attr
		config_get enable ${dev}3 enable 
		if [ "$disabled" = "off" -a "$disabled_all" = "off" ]; then
			if [ "$enable" = "on" ]; then
				led_state="ON"
			else
				led_state="OFF"
			fi
		else
			led_state="OFF"
		fi

		# for wifi schedule
		if [ "$WIFI_SCHEDULE" = "1" ]; then
			if $(wireless_schedule_disable_wifi "$band") ; then
				led_state="OFF"
			fi
		fi
	
		if [ "$band" == "2g" ] ; then
			band="WIFI2G"
		elif [ "$band" == "5g" ] ; then
			band="WIFI5G"
		fi
		ledcli ${band}_${led_state}
	done

}


wifi_reload() {
	#/etc/init.d/minidlna stop
	#echo 3 >/proc/sys/vm/drop_caches
	wifi_led_set
	wifi_nvram_config
	wifi_driver_stop
	wifi_driver_startup
	wifi_smart_config
	wifi_onemesh_config
	wifi_easymesh_config
	wifi_set_2_4_g_py_ed_thresh
	echo "=====>>>>> wireless setting is finished" >$CONSOLE
	#/etc/init.d/minidlna start
	ubus call meshd wifi_reload_complete
}

#add by zhangshengbo for check wifi status
wifi_check()
{
	echo "come in wifi_check" >$STDOUT
	
	local c2gl="1"
	local c2gh=""
	local c5g1l="36"
	local c5g1h=""
	local c5g2l=""
	local c5g2h=""
	
	get_if_var
	local country=$( wl country | cut -c 1-2 )
	echo "in wifi_check,country is $country" >$STDOUT
	
	case $country in
		"DE")
			c2gh="13"
			c5g1h="64"
			c5g2l="100"
			c5g2h="140"
			;;
		"US")
			c2gh="11"
			c5g1h="48"
			c5g2l="149"
			c5g2h="165"
			;;
		"JP")
			c2gh="13"
			c5g1h="64"
			c5g2l="100"
			c5g2h="140"
			;;
		"TW")
			c2gh="11"
			c5g1h="48"
			c5g2l="149"
			c5g2h="165"
			;;
		*)
			echo "in wifi_check, country is not US DE TW or JP" >$STDOUT
			country="unknown"
			;;
	esac
	local wifi_all_down="1"
	local BAND_ALL="2g 5g"
	for band in $BAND_ALL; do
		eval local vap_host=\${vap_host_$band}
		eval local vap0=\${vap0_$band}
		echo "in wifi_check, vap0 is $vap0, vap_host is $vap_host" >$STDOUT
		
		config_get_bool wifi_disabled $vap0 disabled       #hardware switch
		config_get_bool soft_disabled $vap0 disabled_all   #software switch
		
		if [ "$wifi_disabled" = "0" -a "$soft_disabled" = "0" ]; then
			local bssid=$( wl -i $vap_host status | grep BSSID | cut -d ':' -f 2-7 | cut -c 2-18 )
			local channel=$( wl -i $vap_host status | grep Primary | cut -d ':' -f 2 | cut -d ' ' -f 2 )
			wifi_all_down="0"
			echo "in wifi_check,bssid now is $bssid,channel now is $channel" >$STDOUT
			
			
			if [ "$bssid" == "00:00:00:00:00:00" ] || [ "$bssid" == "" ]; then
				echo "bssid error!!!wifi error!!!reload!!!" > /dev/console
				wifi_reload
				break
			fi
			if [ "$country" != "unknown" ]; then
				if [ "$band" = "2g" ]; then
					if [ "$channel" -lt "$c2gl" ] || [ "$channel" -gt "$c2gh" ]; then
						echo "2g channel error!!!reload!!!" > /dev/console
						if [ $( nvram kget rftestflag ) == "1" ]; then
							wifi_reload
						else
							echo "rftestflag !=1, return from wifi check!!" >/dev/console
						fi
						break
					fi	
				else
					#US TW band2 band3 illegal
					if [ "$country" == "US" ] || [ "$country" == "TW" ]; then
						if [ "$channel" -gt "$c5g1h" ] && [ "$channel" -lt "$c5g2l" ]; then
							echo "5g channel error!!!reload!!!" > /dev/console
							if [ $( nvram kget rftestflag ) == "1" ]; then
								wifi_reload
							else
								echo "rftestflag !=1, return from wifi check!!" >/dev/console
							fi
							break
					else
						echo "2g channel is $channel" > $STDOUT
						fi
					#EU JP band4 illegal
					else
						if [ "$channel" -gt "$c5g2h" ]; then
							echo "5g channel error!!!reload!!!" > /dev/console
							if [ $( nvram kget rftestflag ) == "1" ]; then
								wifi_reload
							else
								echo "rftestflag !=1, return from wifi check!!" >/dev/console
							fi
							break
						fi
					fi
				fi
			fi
		fi
	done
	

	if [ "$wifi_all_down" == "1" ];then
		return
	fi
	#check nas acsd eapd
	echo "in wifi_check,will check acsd,nas,eapd" >$STDOUT
	
	local acsd_isup=$( pgrep acsd )
	#local nas_isup=$( pgrep nas )
	local eapd_isup=$( pgrep eapd )

	if [ "$acsd_isup" == "" ] || [ "$eapd_isup" == "" ]; then
		echo "no acsd or no eapd!!!!reload!!!" > /dev/console
		wifi_reload
		return
	fi
	
	#add nas check into crontab, fix bug 298545. check nas every 1 min, while do nothing when config wireless on web
	#by zhangshengbo
	#crontab -l >/tmp/cron-conf && echo '*/1 * * * * if [ "$( pgrep nas )" == "" ] && [ "$( ps | grep /sbin/wifi | grep -v grep )" == "" ]; then nas; fi ;' >> /tmp/cron-conf && crontab /tmp/cron-conf 

}

# for ax10 2.4g chip, set phy_ed_thresh after wifi up in case of prev setting failed
wifi_set_2_4_g_py_ed_thresh() {
	for dev in ${DEVICES}; do
		config_get band $dev band
		if [ "$band" == "2g" ];then
			wl -i $dev phy_ed_thresh -40
		fi
	done
}

wifi_start() {
	wifi_calibrate_data_check
	# add by wanghaisen@tp-link.com.cn
	# Only for AX10 to config the nvram setting of vifs when the DUTS start
	wifi_init_nvram_vifs_config
	wifi_driver_startup
	wifi_smart_config
	wifi_onemesh_config
	wifi_easymesh_config
	wifi_set_2_4_g_py_ed_thresh
	echo "=====>>>>> wireless setting is finished" >$CONSOLE
	if [ "$( nvram kget rftestflag )" == "1" ]; then
		if [ "$( nvram get wifi_inited )" != "1" ]; then
			echo "=====>>>>> start meshd" >$CONSOLE
			killall meshd
			meshd &
			nvram set wifi_inited="1"
		fi
	fi
}

wifi_calibrate_data_set() {
	pro_id=`getfirm PRODUCT_ID`
	nvrammanager -r /tmp/par_tbl -p radio_bk
	cal_cbr /tmp/par_tbl "$pro_id" radio_bk
}

wifi_init() {
	local pro_id=""
	wifi_nvram_default_restore
	echo 14336 >/proc/sys/vm/min_free_kbytes
	wlan_nvram_init
	init_feature_config
	init_nvram_mac
	wifi_calibrate_data_set
	wifi_nvram_config
	echo /sbin/hotplug > /proc/sys/kernel/hotplug # config for wds, need to check
	wifi_start &
}

