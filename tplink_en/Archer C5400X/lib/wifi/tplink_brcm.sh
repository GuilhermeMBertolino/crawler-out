#!/bin/sh

CERT_WLTEST=1
BR_LAN_NAME="br-lan" #this is default value
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
SET_GUEST_DYNAMIC_PASSWD=set_guest_dynpasswd

STDOUT=/dev/null
#DEBUG=1
[ -n "${DEBUG}" -a "${DEBUG}" == 1 ] && STDOUT="/dev/console"
CONSOLE="/dev/console"

NO_EXPORT=1
MACFILTER_ENABLE="off"
MACFILTER_ACTION=""
MAC_LIST=""
COUNTRYCODE_EU=13
COUNTRYCODE_US=0
HOME_2G_VIF=""
HOME_5G_VIF=""
HOME_5G2_VIF=""
state="off"
SINGLECHAIN_TEST=0
RFTEST=1
PORTALSET="0"
PORTAL_DEV=0
PORTAL_CONFIG=/var/etc/wifidog.conf
ALL_BANDS="2g 5g 5g_2"
bands=$ALL_BANDS

triband=$(uci get profile.@wireless[0].support_triband -c "/etc/profile.d" -q)
gmac3=$(uci get profile.@wireless[0].support_guest_network_gmac3 -c "/etc/profile.d" -q)

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
	echo "====!!!!=====>this may return null value" > $STDOUT
	if [ -z "$l3_device" ]
	then
		l3_device=$BR_LAN_NAME
	fi
	export ${NO_EXPORT:+-n} "$1=$l3_device"
}

get_wifi_prefix() {
	local wifi_prefix="wl0"
	local band="$1"

	case $band in
		2g)
			wifi_prefix="wl1"
		;;
		5g)
			wifi_prefix="wl2"
		;;
		5g_2)
			wifi_prefix="wl0"
		;;
	esac
	
	 eval echo $wifi_prefix
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

		MAC_LIST=${MACLIST}
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
	echo "wifi_vap: $*" >$STDOUT
	wifi_reload $*
}

wifi_mode(){
	echo "wifi_mode: $*" >$STDOUT
	wifi_reload $*
}

wifi_radio() {
	echo "wifi_radio: $*" >$STDOUT
	wifi_reload $*
}

wifi_country() {
	echo "wifi_country" >$STDOUT
	local cmd_flag=1

	local eth_enable=""
	local guest_enable=""
	local wds_enable=""
	local ifnames_enabled=""

	if [ "$cmd_flag" = "0" ]; then
		wifi_reload $*
	else
		for dev in ${DEVICES}; do
			ifnames_enabled=""
			config_get_bool wifi_disabled $dev disabled       # hardware switch
			config_get_bool soft_disabled $dev disabled_all   # software switch
			
			# If not sync time and wifi is disabled by wireless schedule, we should let it open
			# ARG: disabled_by: "0" -- by wifi_button;  "1" -- by wireless schedule
			if [ ! -f "/tmp/ledpm_enable" ]; then
				config_get wifi_disabled_by $dev disabled_by
				if [ "$wifi_disabled_by" = "1" ]; then
					wifi_disabled=0
				fi
			fi
			if [ "$wifi_disabled" = "0" -a "$soft_disabled" = "0" ]; then
				config_get vifs $dev vifs
				for vif in $vifs; do    # vifs is wl01/wl02/wl03, home/guest/wds
					config_get_bool enable $vif enable
					if [ "$enable" = "1" ]; then
						config_get mode $vif mode
						config_get guest $vif guest
						config_get ifname $vif ifname
						append ifnames_enabled "$ifname"
						if [ "$mode" = "ap" -a -z "$guest" ]; then
							eth_enable="1"
						elif [ "$mode" = "ap" -a "$guest" = "on" ]; then
							eth_enable="1"
							guest_enable="1"
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
					HOME_WIFI="wl1"
					GUEST_WIFI="wl1.1"
				;;
				5g)
					HOME_WIFI="wl2"
					GUEST_WIFI="wl2.1"
				;;
                5g_2)
                    HOME_WIFI="wl0"
                    GUEST_WIFI="wl0.1"
                ;;
			esac

			local country_code=""
			local country_rev=""
			config_get country $dev country

			local tmpCode=`cat $BRCM_COUNTRYCODE | awk '$1=="'"$country"'" {print $2}'`
			if [ "$tmpCode" = "EU" ]; then
				nvram set ${HOME_WIFI}_country_code="$tmpCode"
				nvram set ${HOME_WIFI}_country_rev="$COUNTRYCODE_EU"
				country_code="$tmpCode"
				country_rev="$COUNTRYCODE_EU"
			elif [ "$tmpCode" = "US" ]; then
				nvram set ${HOME_WIFI}_country_code="$tmpCode"
				nvram set ${HOME_WIFI}_country_rev="$COUNTRYCODE_US"
				country_code="$tmpCode"
				country_rev="$COUNTRYCODE_US"
			else
				nvram set ${HOME_WIFI}_country_code="$country"
				nvram set ${HOME_WIFI}_country_rev="$tmpCode"
				country_code="$country"
				country_rev="$tmpCode"
			fi

			# set dfs
            wifi_dfs_config $dev

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
			if [ "$hwmode" = "11n" -o "$hwmode" = "11nac" ]; then
				nvram set ${HOME_WIFI}_bss_opmode_cap_reqd="2"
			elif [ "$hwmode" = "11ac" ]; then
				nvram set ${HOME_WIFI}_bss_opmode_cap_reqd="3"
			else
				nvram set ${HOME_WIFI}_bss_opmode_cap_reqd="0"
			fi

			# set bw_cap
			config_get htmode $dev htmode
			if [ "$htmode" = "auto" ]; then
				if [ "$hwmode" = "11ac" -o "$hwmode" = "11anac" -o "$hwmode" = "11nac" ]; then
					nvram set ${HOME_WIFI}_bw_cap="7"
				else
					nvram set ${HOME_WIFI}_bw_cap="3"
				fi
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
            local dfsSwitch=`cat $BRCM_COUNTRYCODE | awk '$1=="'"$country"'" {print $3}'`
			local weather=`cat $BRCM_COUNTRYCODE | awk '$1=="'"$country"'" {print $4}'`
			wifi_chanspec_config chanspec $htmode $channel $dfsSwitch $weather $country $band
			if [ "$band" = "5g" -a "$wds_enable" = "1" ]; then
				nvram set ${HOME_WIFI}_chanspec="0"
            elif [ "$band" = "5g_2" -a "$wds_enable" = "1" ]; then
                nvram set ${HOME_WIFI}_chanspec="0"
			else
				nvram set ${HOME_WIFI}_chanspec="$chanspec"
			fi

			# set radio
			vap_name="${HOME_WIFI}.1"
			if [ "$eth_enable" = "1" ]; then
				if [ "$band" = "5g" -o "$band" = "5g_2" ]; then
					if [ "$country" = "AL" -o "$country" = "DZ" -o "$country" = "BZ" -o "$country" = "KZ" \
						 -o "$country" = "YE" -o "$country" = "ZW" ]; then
						nvram set ${HOME_WIFI}_radio="0"
						if [ "$wds_enable" = "1" ]; then
							nvram set ${vap_name}_radio="0"
						fi
						if [ "$guest_enable" = "1" ]; then
							nvram set ${GUEST_WIFI}_radio="0"
						fi
					else
						nvram set ${HOME_WIFI}_radio="1"
						if [ "$wds_enable" = "1" ]; then
							nvram set ${vap_name}_radio="1"
						fi
						if [ "$guest_enable" = "1" ]; then
							nvram set ${GUEST_WIFI}_radio="1"
						fi
					fi
				else
					nvram set ${HOME_WIFI}_radio="1"
					if [ "$wds_enable" = "1" ]; then
						nvram set ${vap_name}_radio="1"
					fi
					if [ "$guest_enable" = "1" ]; then
						nvram set ${GUEST_WIFI}_radio="1"
					fi
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

	wps_cmd="/usr/sbin/wps-socket -c "
	config_get_bool wps $vif wps 0
	if [ "$wps" = "1" ]; then
		case $2 in
		wps_ap_pin)
			#wifi_reload
			for dev in ${DEVICES}; do  # eth1 eth2 eth3
				wifi_wps_config $dev
			done
			killall wps_monitor
			sleep 1
			wps_monitor &
			;;

		status)
			local status method peerAddr

			status=`nvram get wps_proc_status`
			method=`nvram get wps_current_method`
			peerAddr=`nvram get wps_sta_mac`

			if [ -z "$status" ]; then
			status=`nvram get wps_proc_status`
			fi

			if [ -z "$method" ]; then
			method=`nvram get wps_current_method`
			fi

			if [ -z "$peerAddr" ]; then
			peerAddr=`nvram get wps_sta_mac`
			fi

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
	fi
}

wifi_wps_switch() {
	echo "wifi_wps_switch" >$STDOUT
	local wlvif="wl01"

	for dev in ${DEVICES}; do  # eth1 eth2 eth3
		wifi_wps_config $dev
	done

	config_get_bool wps_enable $wlvif wps 1
	if [ "$wps_enable" = "1" ];then
		start_wps
	else
		stop_wps
	fi
}

wifi_vlan() {
	local wifi_state=""
	wifi_state=`cat /tmp/wifi_state`

	local isaddif=""
	if [ "$1" = "" ];then
		isaddif=1
	else
		isaddif=0
	fi

	local brname;
	local hvlan=$((0x7)) gvlan=0;
	get_brname brname
	for port in $(brctl show "$brname" | grep eth | cut -f 6-8); do
		brctl setifvlan "$brname" "$port" "$hvlan" 1
	done

	if [ "$wifi_state" = "inited" -o "$isaddif" = "0" ]; then 
		echo "=====>>>>> wifi_vlan" >$STDOUT

		for dev in $DEVICES; do
			config_get_bool wifi_disabled $dev disabled       # hardware switch
			config_get_bool soft_disabled $dev disabled_all   # software switch
			if [ ! -f "/tmp/ledpm_enable" ]; then
				config_get wifi_disabled_by $dev disabled_by
				if [ "$wifi_disabled_by" = "1" ]; then
					wifi_disabled=0
				fi
			fi
			if [ "$wifi_disabled" = "0" -a "$soft_disabled" = "0" ]; then
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
						[ "$isaddif" = "1" ] && brctl addif "$brname" "$ifname"
						brctl setifvlan "$brname" "$ifname" "$gvlan" 1
						fw "$fw_action"_rt_access dev "$ifname" &

						# kick all sta
						wl -i $ifname deauthenticate

					elif [ "$enable" = "1" -a "$mode" = "sta" ]; then
						case $band in
							2g)
								IFNAME="wl1.1"
							;;
							5g)
								IFNAME="wl2.1"
							;;
                            5g_2)
                                IFNAME="wl0.1"
                            ;;
						esac
						[ "$isaddif" = "1" ] && brctl addif "$brname" "$IFNAME"
						brctl setifvlan "$brname" "$IFNAME" 15 1

					else
						echo "=====>>>>> $dev: vif $vif is disabled" >$STDOUT
					fi
				done
			fi
		done
	fi
}

wifi_macfilter() {
	local wifi_state=""
	wifi_state=`cat /tmp/wifi_state`
	#if [ "$wifi_state" = "inited" ]; then
    for dev in ${DEVICES}; do  
        wifi_macfilter_config $dev dynamic
    done
	#fi
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
	for idx in `seq 0 1 2`; do
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
}

# Big switches 
init_nvram_switch() {
	nvram set router_disable="1"
	nvram set ure_disable="1"
	nvram set fw_disable="0"
	nvram set log_ipaddr=""
}

# lan parameters
init_nvram_lan() {
	# LAN H/W parameters 
	nvram set lan_ifname="br-lan"
	nvram set lan_ifnames="eth0.1 eth1 eth2 eth3"
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
	nvram set dhcp_start="192.168.1.100"
	nvram set dhcp_end="192.168.1.150"
	nvram set dhcp1_start="192.168.2.100"
	nvram set dhcp1_end="192.168.2.150"
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

# init Wireless parameters
init_nvram_wireless() {
	for idx in 0 1 2; do
		nvram set wl${idx}_ifname=""
		nvram set wl${idx}_hwaddr=""
		nvram set wl${idx}_corerev=""
		nvram set wl${idx}_phytypes=""
		nvram set wl${idx}_radioids=""
		nvram set wl${idx}_ssid="TP-LINK"
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
		nvram set wl${idx}_chanspec="11"
		nvram set wl${idx}_reg_mode="off"
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
	nvram set wps_mfstring="TP-LINK"
	nvram set wps_device_name="Wireless Router TL-WDR3680"
	nvram set wps_sta_pin="00000000"
	nvram set wps_modelnum="123456"
	nvram set wps_wer_mode="allow"
	nvram set lan_wps_oob="enabled"
	nvram set lan_wps_reg="enabled"
	nvram set lan1_wps_oob="enabled"
	nvram set lan1_wps_reg="enabled"
	nvram set wps_random_ssid_prefix="TP-LINK_"
	for idx in 0 1 2; do
		nvram set wl${idx}_wps_reg="enabled"
		nvram set wl${idx}_wps_mode="enabled"
		nvram set wl${idx}_wps_config_state="0"
		nvram set wl${idx}_wfi_enable="0"
		nvram set wl${idx}_wfi_pinmode="0"
	done
}

# WME parameters
init_nvram_wme() {
	for idx in 0 1 2; do
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
	for idx in 0 1 2; do
		nvram set wl${idx}_maxassoc="64"
		nvram set wl${idx}_bss_maxassoc="64"
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
	for idx in 0 1 2; do
		nvram set wl${idx}_wet_tunnel="0"
		nvram set wl${idx}_trf_mgmt_rssi_policy="0"
		nvram set wl${idx}_wmf_ucigmp_query="0"
		nvram set wl${idx}_wmf_mdata_sendup="0"
		nvram set wl${idx}_wmf_ucast_upnp="0"
	done
}

# TX Beamforming
init_nvram_txbeamform() {
	for idx in 0 1 2; do
		nvram set wl${idx}_txbf_bfr_cap="1"
		nvram set wl${idx}_txbf_bfe_cap="1"
	done
}

# PsPretend threshold and retry_limit 
init_nvram_pspretend() {
	for idx in 0 1 2; do
		nvram set wl${idx}_pspretend_threshold="0"
		nvram set wl${idx}_pspretend_retry_limit="0"
	done
}

# acsd setting
init_nvram_acsd() {
	for idx in 0 1 2; do
		nvram set wl${idx}_acs_fcs_mode="0"
		nvram set wl${idx}_dcs_csa_unicast="0"
		nvram set wl${idx}_acs_excl_chans=""
		nvram set wl${idx}_acs_dfs="0"
		nvram set wl${idx}_acs_dfsr_immediate="300 3"
		nvram set wl${idx}_acs_dfsr_deferred="604800 5"
		nvram set wl${idx}_acs_dfsr_activity="30 10240"
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
	done
	nvram set acs_ctrl_chan_adjust="0"
}

# system run produce
init_nvram_run() {
	for idx in 0 1 2; do
		nvram set wl${idx}_mimo_preamble=""
		nvram set wl${idx}_bridge=""
		nvram set wl${idx}_tpc_db="0"
		nvram set wl${idx}_txchain="15" #need to check
		nvram set wl${idx}_rxchain="15" #need to check
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
	nvram set landevs="eth0.1 wl0 wl1 wl2"
	nvram set wfi_cmd=""
	nvram set wfi_error=""
	nvram set coma_sleep=""
	nvram set partialboots="0"
	nvram set br0_ifname="br-lan"
	nvram set br0_ifnames="eth0.1 eth1 eth2 eth3"
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

init_nvram_router() {
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

	# Wireless parameters
	init_nvram_wireless

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
}

# DUT special feature cfg
init_feature_config() {
	local wlan_support_11ac=""
	wlan_support_11ac=`cat $BRCM_WLAN_CONFIG | awk '$1=="'wlan_support_11ac'" {print $2}'`
	if [ "$wlan_support_11ac" = "yes" ]; then
		nvram set wl_txchain=15
		nvram set wl_rxchain=15
		nvram set wl0_phytype=h
		nvram set wl1_phytype=v
        nvram set wl2_phytype=v
	else
		nvram set wl_txchain=7
		nvram set wl_rxchain=7
		nvram set wl0_phytype=n
		nvram set wl1_phytype=n
        nvram set wl2_phytype=n
	fi
}

# mac cfg
init_nvram_mac() {
	lanmacaddr=`network_get_firm lan`
	lanmacaddr=${lanmacaddr//-/:}
	lanmacaddr=` echo $lanmacaddr | tr '[A-F]' '[a-f]' `
	#nvram set et0macaddr="$lanmacaddr"

	for dev in $DEVICES; do
		config_get band "$dev" band
		case "$band" in
			2g)
				config_get macaddr "$dev" macaddr
				macaddr=${macaddr//-/:}
				nvram set 1:macaddr="${macaddr}"
			;;
			5g)
				config_get macaddr "$dev" macaddr
				macaddr=${macaddr//-/:}
				nvram set 2:macaddr="${macaddr}"
			;;
            5g_2)
                config_get macaddr "$dev" macaddr
                macaddr=${macaddr//-/:}
	            nvram set 3:macaddr="${macaddr}"
		esac
	done
}

init_nvram_wl() {
	nvram set wl_radius_port="1812"
	nvram set wl_txstreams="0"
	nvram set wl_rxchain_pwrsave_pps="10"
	nvram set wl_assoc_retry_max="3"
	nvram set wl1_acs_fcs_mode="0"
	nvram set wl1_acs_dfsr_activity="30 10240"
	nvram set wl_dwds="0"
	nvram set wl_intfer_retryrate=""
	nvram set wl_maxassoc="64"
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
	nvram set wl_ssid="TP-LINK"
	nvram set wl_dtim="1"
	nvram set wl_trf_mgmt_rssi_policy="0"
	nvram set wl_acs_dfs="0"
	nvram set wl_key1=""
	nvram set wl_amsdu="auto"
	nvram set wl_key2=""
	nvram set wl_key3=""
	nvram set wl_country_code="US"
	nvram set wl_key4=""
	nvram set wl_hwaddr=""
	nvram set wl_rxchain="15"
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
    nvram set wl2_bss_hs2_enabled="1"
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
	nvram set wl_bss_maxassoc="64"
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
	nvram set wl_txchain="7"
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

wifi_nvram_default_restore() {
	init_nvram_wps
	init_nvram_radio
	init_nvram_router
	init_nvram_wl
	init_nvram_mac
}

wifi_chanspec_config() {
	local tmpChanspec
	htmode=$2
	channel=$3
	DFS=$4
	weather=$5
	country=$6
	band=$7
	if [ $channel = "auto" ]; then
		tmpChanspec="0"
		if [ "$band" = "5g_2" -a "$DFS" = "ON" -a "$country" = "EU" ]; then
			# fix me with a better solution
			case $htmode in
			"auto"|"80")
				tmpChanspec="112/80"
			;;
			"40")
				tmpChanspec="136u"
			;;
			esac
		fi
	else
		case $channel in
		1|2|3|4|5)
			if [ $htmode = "auto" ]; then
				tmpChanspec="${channel}l"
			elif [ $htmode = "20" ]; then
				tmpChanspec="$channel"
			elif [ $htmode = "40" ]; then
				tmpChanspec="${channel}l"
			fi
		;;
		6|7|8|9|10|11|12|13)
			if [ $htmode = "auto" ]; then
				tmpChanspec="${channel}u"
			elif [ $htmode = "20" ]; then
				tmpChanspec="$channel"
			elif [ $htmode = "40" ]; then
				tmpChanspec="${channel}u"
			fi
		;;
		36|44|52|60|100|108|124|149|157)
			if [ $htmode = "auto" ]; then
				tmpChanspec="${channel}/80"
			elif [ $htmode = "20" ]; then
				tmpChanspec="$channel"
			elif [ $htmode = "40" ]; then
				tmpChanspec="${channel}l"
			elif [ $htmode = "80" ]; then
				tmpChanspec="${channel}/80"
			fi
		;;
		40|48|56|64|104|112|120|128|144|153|161)
			if [ $htmode = "auto" ]; then
				tmpChanspec="${channel}/80"
			elif [ $htmode = "20" ]; then
				tmpChanspec="$channel"
			elif [ $htmode = "40" ]; then
				tmpChanspec="${channel}u"
			elif [ $htmode = "80" ]; then
				tmpChanspec="${channel}/80"
			fi
		;;
		116)
			if [ $htmode = "auto" ]; then
				if [ "$weather" != "ON" ]; then
					tmpChanspec="$channel"	# only 20MHz
				else
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
		132)
			if [ $htmode = "auto" ]; then
				if [ "$country" = "US" ]; then
					tmpChanspec="${channel}/80"	# 80MHz
				else
					tmpChanspec="${channel}l" # 40MHz
				fi
			elif [ $htmode = "20" ]; then
				tmpChanspec="$channel"
			elif [ $htmode = "40" ]; then
				tmpChanspec="${channel}l"
			elif [ $htmode = "80" ]; then
				tmpChanspec="${channel}/80"
			fi
		;;
		136)
			if [ $htmode = "auto" ]; then
				if [ "$country" = "US" ]; then
					tmpChanspec="${channel}/80"	# 80MHz
				else
					tmpChanspec="${channel}u"
				fi
			elif [ $htmode = "20" ]; then
				tmpChanspec="$channel"
			elif [ $htmode = "40" ]; then
				tmpChanspec="${channel}u"
			elif [ $htmode = "80" ]; then
				tmpChanspec="${channel}/80"
			fi
		;;
		140)
			if [ $htmode = "auto" ]; then
				if [ "$country" = "US" ]; then
					tmpChanspec="${channel}/80"	# 80MHz
				else
					tmpChanspec="$channel"
				fi
			elif [ $htmode = "20" ]; then
				tmpChanspec="$channel"
			elif [ $htmode = "40" ]; then
				tmpChanspec="${channel}l"
			elif [ $htmode = "80" ]; then
				tmpChanspec="${channel}/80"
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
	local eth_enable="0"
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

	config_get_bool wifi_disabled $dev disabled       # hardware switch
	config_get_bool soft_disabled $dev disabled_all   # software switch
	if [ ! -f "/tmp/ledpm_enable" ]; then
		config_get wifi_disabled_by $dev disabled_by
		if [ "$wifi_disabled_by" = "1" ]; then
			wifi_disabled=0
		fi
	fi
	if [ "$wifi_disabled" = "0" -a "$soft_disabled" = "0" ]; then
		config_get vifs $dev vifs
		for vif in $vifs; do # vifs is wl01/wl02/wl03, home/guest/wds
			config_get_bool enable $vif enable
			config_get mode $vif mode
			config_get guest $vif guest
			if [ "$enable" = "1" -a "$mode" = "ap" -a -z "$guest" ]; then
				eth_enable="1"
				home_vif=$vif
				echo "=====>>>>> $dev: HOME WIFI is on" >$STDOUT
			elif [ "$enable" = "1" -a "$mode" = "sta" ]; then
				eth_enable="1"
				wds_enable="1"
				wds_vif=$vif
				echo "=====>>>>> $dev: WDS is on" >$STDOUT
			else
				echo "=====>>>>> $dev: vif $vif is disabled or $vif is a guest network" >$STDOUT
			fi
		done
	fi

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
			HOME_WIFI="wl2"
			if [ "$wds_enable" = "1" ]; then
				HOME_5G_VIF="$home_vif"
			fi
		;;
        5g_2)
            vif="$home_vif"
            HOME_WIFI="wl0"
            if [ "$wds_enable" = "1" ]; then
                HOME_5G2_VIF="$home_vif"
            fi
	esac

	if [ "$eth_enable" = "1" ]; then
		config_get ssid $vif ssid
		nvram set ${HOME_WIFI}_ssid="$ssid"
        nvram set ${HOME_WIFI}_mfp="0"

        config_get country $dev country
		
        local tmpCode=`cat $BRCM_COUNTRYCODE | awk '$1=="'"$country"'" {print $2}'`
        if [ "$tmpCode" = "EU" ]; then
            nvram set ${HOME_WIFI}_country_code="$tmpCode"
            nvram set ${HOME_WIFI}_country_rev="$COUNTRYCODE_EU"
            country_code="$tmpCode"
            country_rev="$COUNTRYCODE_EU"
        elif [ "$tmpCode" = "US" ]; then
            nvram set ${HOME_WIFI}_country_code="$tmpCode"
            nvram set ${HOME_WIFI}_country_rev="$COUNTRYCODE_US"
            country_code="$tmpCode"
            country_rev="$COUNTRYCODE_US"
        else
            nvram set ${HOME_WIFI}_country_code="$country"
            nvram set ${HOME_WIFI}_country_rev="$tmpCode"
            country_code="$country"
            country_rev="$tmpCode"
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
		if [ "$hwmode" = "11n" -o "$hwmode" = "11nac" ]; then
			nvram set ${HOME_WIFI}_bss_opmode_cap_reqd="2"
		elif [ "$hwmode" = "11ac" ]; then
			nvram set ${HOME_WIFI}_bss_opmode_cap_reqd="3"
		else
			nvram set ${HOME_WIFI}_bss_opmode_cap_reqd="0"
		fi

		# set bw_cap
		if [ "$htmode" = "auto" ]; then
			if [ "$hwmode" = "11ac" -o "$hwmode" = "11anac" -o "$hwmode" = "11nac" ]; then
				nvram set ${HOME_WIFI}_bw_cap="7"
			else
				nvram set ${HOME_WIFI}_bw_cap="3"
			fi
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
        local dfsSwitch=`cat $BRCM_COUNTRYCODE | awk '$1=="'"$country"'" {print $3}'`
		local weather=`cat $BRCM_COUNTRYCODE | awk '$1=="'"$country"'" {print $4}'`
		wifi_chanspec_config chanspec $htmode $channel $dfsSwitch $weather $country $band
		if [ "$band" = "5g" -a "$wds_enable" = "1" ]; then
			nvram set ${HOME_WIFI}_chanspec="0"
        elif [ "$band" = "5g_2" -a "$wds_enable" = "1" ]; then
            nvram set ${HOME_WIFI}_chanspec="0"
		else
			nvram set ${HOME_WIFI}_chanspec="$chanspec"
		fi

		# set radio
		if [ "$band" = "5g" -o "$band" = "5g_2" ]; then
			if [ "$country" = "AL" -o "$country" = "DZ" -o "$country" = "BZ" -o "$country" = "KZ" \
				 -o "$country" = "YE" -o "$country" = "ZW" ]; then
				nvram set ${HOME_WIFI}_radio="0"
			else
				nvram set ${HOME_WIFI}_radio="1"
			fi
		else
			nvram set ${HOME_WIFI}_radio="1"
		fi
		
		config_get mode $vif mode
		nvram set ${HOME_WIFI}_mode="$mode"

		config_get_bool hidden $vif hidden
		if [ "$hidden" = "1" ]; then
			nvram set ${HOME_WIFI}_closed="1"
		else
			nvram set ${HOME_WIFI}_closed="0"
		fi
	else
		nvram set ${HOME_WIFI}_radio="0"
	fi
	#iptv mcwifi
	#wmf patch,added by zhangshengbo
	config_load iptv
	config_get mcwifi_en iptv mcwifi_enable
	if [ "$mcwifi_en" = "on" ];then
	    nvram set wmf_igmp_enable=1
	else
	    nvram set wmf_igmp_enable=0
	fi
	#
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
	echo "=====>>>>> $dev: wifi_security_config" >$STDOUT

	config_get_bool wifi_disabled $dev disabled       # hardware switch
	config_get_bool soft_disabled $dev disabled_all   # software switch
	if [ ! -f "/tmp/ledpm_enable" ]; then
		config_get wifi_disabled_by $dev disabled_by
		if [ "$wifi_disabled_by" = "1" ]; then
			wifi_disabled=0
		fi
	fi
	if [ "$wifi_disabled" = "0" -a "$soft_disabled" = "0" ]; then
		config_get vifs $dev vifs
		for vif in $vifs; do # vifs is wl01/wl02/wl03, home/guest/wds
			config_get_bool enable $vif enable
			config_get mode $vif mode
			config_get guest $vif guest
			if [ "$enable" = "1" -a "$mode" = "ap" -a -z "$guest" ]; then
				eth_enable="1"
				home_vif="$vif"
				echo "=====>>>>> $dev: HOME WIFI is on" >$STDOUT
			elif [ "$enable" = "1" -a "$mode" = "sta" ]; then
				eth_enable="1"
				wds_enable="1"
				wds_vif="$vif"
				echo "=====>>>>> $dev: WDS is on" >$STDOUT
			else
				echo "=====>>>>> $dev: vif $vif is disabled or $vif is a guest network" >$STDOUT
			fi
		done
	fi

	config_get band $dev band
	case $band in
		2g)
			if [ "$wds_enable" = "1" ]; then
				vif="$home_vif"
				WIFI_PRE="wl1.1"
			else
				vif="$home_vif"
				WIFI_PRE="wl1"
			fi
		;;
		5g)
			if [ "$wds_enable" = "1" ]; then
				vif="$home_vif"
				WIFI_PRE="wl2.1"
			else
				vif="$home_vif"
				WIFI_PRE="wl2"
			fi
		;;
        5g_2)
            if [ "$wds_enable" = "1" ]; then
                vif="$home_vif"
                WIFI_PRE="wl0.1"
            else
                vif="$home_vif"
                WIFI_PRE="wl0"
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
		echo "=====>>>>> $dev: $vif, encryption $encryption, psk_version $psk_version, psk_cipher $psk_cipher" >$STDOUT
		close11N="0"

		if [ -z "$WIFI_PRE" ]; then
			echo "=====>>>>> $dev: dont set security for vif $vif" >$STDOUT
		else
			if [ "$encryption" == "none" ]; then
				nvram set ${WIFI_PRE}_wep="disabled"
				nvram set ${WIFI_PRE}_auth="0"
				nvram set ${WIFI_PRE}_akm=""
			elif [ "$encryption" == "psk" ]; then
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
					nvram set ${WIFI_PRE}_crypto="tkip+aes"
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
			elif [ "$encryption" == "wpa" ]; then
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
					nvram set ${WIFI_PRE}_crypto="tkip+aes"
				fi

				config_get server $vif server
				nvram set ${WIFI_PRE}_radius_ipaddr="$server"
				config_get port $vif port
				nvram set ${WIFI_PRE}_radius_port="$port"
				config_get wpa_key $vif wpa_key
				nvram set ${WIFI_PRE}_radius_key="$wpa_key"
				config_get wpa_group_rekey $vif wpa_group_rekey
				if [ -z "$wpa_group_rekey" ]; then
					nvram set ${WIFI_PRE}_wpa_gtk_rekey="0"
				else
					nvram set ${WIFI_PRE}_wpa_gtk_rekey="$wpa_group_rekey"
				fi
				nvram set ${WIFI_PRE}_wep="disabled"
				nvram set ${WIFI_PRE}_auth="0"
			elif [ "$encryption" == "wep" ]; then
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
	local home_enable guest_enable bridge_enable
	local home_vif guest_vif
	local home_ifname guest_ifname

	config_get band $dev band
	config_get vifs $dev vifs

	case $band in
		2g)
			WIFI_UNIT="1"
		;;
		5g)
			WIFI_UNIT="2"
		;;
        5g_2)
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

	config_get_bool wifi_disabled $dev disabled       #hardware switch
	config_get_bool soft_disabled $dev disabled_all   #software switch
	if [ ! -f "/tmp/ledpm_enable" ]; then
		config_get wifi_disabled_by $dev disabled_by
		if [ "$wifi_disabled_by" = "1" ]; then
			wifi_disabled=0
		fi
	fi
	if [ "$wifi_disabled" = "0" -a "$soft_disabled" = "0" ]; then
		for vif in $vifs; do
			config_get_bool enable  $vif enable
			config_get      mode    $vif mode
			config_get      guest   $vif guest
			config_get      ifname  $vif ifname

			if [ "$mode" = "ap" ] && [ -z "$guest" ]; then
				home_enable=$enable
				home_vif=$vif
				home_ifname=$ifname
			elif [ "$mode" = "ap" ] && [ ! -z "$guest" ]; then
				guest_enable=$enable
				guest_vif=$vif
				guest_ifname=$ifname
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
        home_ifname=${HOME_WIFI}
	else
		HOME_WIFI="wl"${WIFI_UNIT}
	fi 

	if [ "$guest_enable" = "1" ]; then
		GUEST_WIFI="wl"${WIFI_UNIT}".1"
	fi

	if [ "$MACFILTER_ENABLE" = "on" ]; then
		if [ "$MACFILTER_ACTION" = "allow" -o "$MACFILTER_ACTION" = "deny" ]; then
			nvram set "${HOME_WIFI}_macmode=$MACFILTER_ACTION"
			[ -z "$dynamic" ] || wl -i $home_ifname macmode "$macmode"
			if [ "$guest_enable" == 1 ]; then 
				nvram set "${GUEST_WIFI}_macmode=$MACFILTER_ACTION"
				[ -z "$dynamic" ] || wl -i $guest_ifname macmode "$macmode"
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
	else
		echo "bad MACFILTER_ENABLE." >$STDOUT ;
	fi

	if [ "$MACFILTER_ENABLE" = "on" ]; then
		nvram set ${HOME_WIFI}_maclist="${MAC_LIST}"
		if [ "$home_enable" = 1 ] ; then 
			[ -z "$dynamic" ] || {
				wl -i $home_ifname mac none
				for stamac in "${MAC_LIST}"; do
					wl -i $home_ifname mac $stamac
				done
				kick_sta $home_ifname
			}
		fi
		if [ "$guest_enable" = 1 ] ; then 
				nvram set ${GUEST_WIFI}_maclist="${MAC_LIST}"
				[ -z "$dynamic" ] || {
					wl -i $guest_ifname mac none
					for stamac in "${MAC_LIST}"; do
						wl -i $guest_ifname mac $stamac
					done
					kick_sta $guest_ifname
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
	config_get_bool wifi_disabled $dev disabled       #hardware switch
	config_get_bool soft_disabled $dev disabled_all   #software switch
	if [ ! -f "/tmp/ledpm_enable" ]; then
		config_get wifi_disabled_by $dev disabled_by
		if [ "$wifi_disabled_by" = "1" ]; then
			wifi_disabled=0
		fi
	fi
	if [ "$wifi_disabled" = "0" -a "$soft_disabled" = "0" ]; then
		config_get vifs $dev vifs
		for vif in $vifs; do # vifs is wl01/wl02/wl03, home/guest/wds
			config_get_bool enable $vif enable
			config_get mode $vif mode
			config_get guest $vif guest
			if [ "$enable" = "1" -a "$mode" = "ap" -a -z "$guest" ]; then
				eth_enable="1"
				home_vif="$vif"
				echo "=====>>>>> $dev: HOME WIFI is on" >$STDOUT
			elif [ "$enable" = "1" -a "$mode" = "sta" ]; then
				eth_enable="1"
				wds_enable="1"
				wds_vif="$vif"
				echo "=====>>>>> $dev: WDS is on" >$STDOUT
			else
				echo "=====>>>>> $dev: vif $vif is disabled or $vif is a guest network" >$STDOUT
			fi
		done
	fi

	case $band in
		2g)
            vif="$home_vif"
            HOME_WIFI="wl1"
		;;
		5g)
            vif="$home_vif"
            HOME_WIFI="wl2"
		;;
        5g_2)
            vif="$home_vif"
            HOME_WIFI="wl0"
        ;;
	esac

	if [ "$eth_enable" = "1" ]; then
		config_get beacon_int $dev beacon_int
		config_get rts $dev rts
		config_get frag $dev frag
		config_get dtim_period $dev dtim_period
		config_get wmm $dev wmm
		config_get_bool isolate $dev isolate
		config_get_bool shortgi $dev shortgi
		if [ "$shortgi" = "1" ]; then
			shortgiStr="short"
		else
			shortgiStr="long"
		fi

		nvram set ${HOME_WIFI}_bcn="$beacon_int"
		nvram set ${HOME_WIFI}_rts="$rts"
		nvram set ${HOME_WIFI}_frag="$frag"
		nvram set ${HOME_WIFI}_dtim="$dtim_period"
		nvram set ${HOME_WIFI}_wme="$wmm" #need to check
		nvram set ${HOME_WIFI}_plcphdr="$shortgiStr"
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
			HOME_WIFI=wl1
		;;
		5g)
			HOME_WIFI=wl2
		;;
        5g_2)
            HOME_WIFI=wl0
        ;;
	esac

    config_get vifs $dev vifs
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
		
		#find the wps iface
		if [ "ap" = "$mode" -a -z "$guest" ]; then
			wpsIf=$vif
			break
		fi
	done

	config_get_bool wifi_disabled $dev disabled
	config_get_bool disabled_all $dev   disabled_all
	if [ ! -f "/tmp/ledpm_enable" ]; then
		config_get wifi_disabled_by $dev disabled_by
		if [ "$wifi_disabled_by" = "1" ]; then
			wifi_disabled=0
		fi
	fi
	config_get_bool wdsEnable    $wdsIf enable

	if [ "$wifi_disabled" = "0" -a "$disabled_all" = "0" -a "$wdsEnable" = "1" ]; then
		nvram set ${HOME_WIFI}_wps_mode="disabled"
		case $band in
			2g)
				HOME_WIFI=wl1.1
			;;
			5g)
				HOME_WIFI=wl2.1
			;;
            5g_2)
                HOME_WIFI=wl0.1
            ;;
		esac
	fi

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
	local wds_enable="0"
	local wds_vif=""
	local br0_ifnames_tmp=""
	local lan_ifnames_tmp=""
	local vifs_tmp=""
	echo "=====>>>>> $dev: wifi_wds_config" >$STDOUT

	config_get_bool wifi_disabled $dev disabled       #hardware switch
	config_get_bool soft_disabled $dev disabled_all   #software switch
	if [ ! -f "/tmp/ledpm_enable" ]; then
		config_get wifi_disabled_by $dev disabled_by
		if [ "$wifi_disabled_by" = "1" ]; then
			wifi_disabled=0
		fi
	fi
	if [ "$wifi_disabled" = "0" -a "$soft_disabled" = "0" ]; then
		config_get vifs $dev vifs
		for vif in $vifs; do
			config_get_bool enable $vif enable
			config_get mode $vif mode
			config_get guest $vif guest
			if [ "$enable" = "1" -a "$mode" = "ap" -a -z "$guest" ]; then
				eth_enable="1"
			elif [ "$enable" = "1" -a "$mode" = "ap" -a "$guest" = "on" ]; then
				eth_enable="1"
				guest_enable="1"
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
			WIFI_PRE="wl1"
			WIFI_UNIT="1.1"
		;;
		5g)
			WIFI_PRE="wl2"
			WIFI_UNIT="2.1"
		;;
        5g_2)
            WIFI_PRE="wl0"
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
        elif [ "$band" = "5g_2" ]; then
            home_vif="$HOME_5G2_VIF"
		else
			home_vif="$HOME_2G_VIF"
		fi
		config_get ssid $home_vif ssid
		nvram set ${vap_name}_ssid="$ssid"
		nvram set ${vap_name}_mode="ap"

		if [ "$band" = "5g" -o "$band" = "5g_2" ]; then
			config_get country $dev country
			if [ "$country" = "AL" -o "$country" = "DZ" -o "$country" = "BZ" -o "$country" = "KZ" \
				 -o "$country" = "YE" -o "$country" = "ZW" ]; then
				nvram set ${vap_name}_radio="0"
			else
				nvram set ${vap_name}_radio="1"
			fi
		else
			nvram set ${vap_name}_radio="1"
		fi

		nvram set ${vap_name}_closed="0"
		config_get_bool ap_isolate $dev isolate 
		nvram set ${vap_name}_ap_isolate="$ap_isolate"
		nvram set ${vap_name}_bss_enabled="1"
		nvram set ${vap_name}_sta_retry_time="5"
		nvram set ${vap_name}_infra="1"
		nvram set ${vap_name}_unit="${WIFI_UNIT}"
		nvram set ${vap_name}_ifname="${vap_name}"
		nvram set ${vap_name}_bss_maxassoc="64"
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
	local psta_enable="0"
	local psta_vif=""
	local br0_ifnames_tmp=""
	local lan_ifnames_tmp=""
	local vifs_tmp=""

	config_get_bool wifi_disabled $dev disabled       #hardware switch
	config_get_bool soft_disabled $dev disabled_all   #software switch
	if [ ! -f "/tmp/ledpm_enable" ]; then
		config_get wifi_disabled_by $dev disabled_by
		if [ "$wifi_disabled_by" = "1" ]; then
			wifi_disabled=0
		fi
	fi
	if [ "$wifi_disabled" = "0" -a "$soft_disabled" = "0" ]; then
		config_get vifs $dev vifs
		for vif in $vifs; do
			config_get_bool enable $vif enable
			config_get mode $vif mode
			config_get guest $vif guest
			if [ "$enable" = "1" -a "$mode" = "ap" -a -z "$guest" ]; then
				eth_enable="1"
			elif [ "$enable" = "1" -a "$mode" = "ap" -a "$guest" = "on" ]; then
				eth_enable="1"
				guest_enable="1"
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
			WIFI_PRE="wl1"
			WIFI_UNIT="1.1"
		;;
		5g)
			WIFI_PRE="wl2"
			WIFI_UNIT="2.1"
		;;
        5g_2)
            WIFI_PRE="wl0"
            WIFI_UNIT="0.1"
        ;;
	esac

	if [ "$eth_enable" = "1" -a "$psta_enable" = "1" ]; then
		config_get ssid $psta_vif ssid
		nvram set ${WIFI_PRE}_ssid="$ssid"
        nvram set fwd_wlandevs="eth6 eth7 eth8"
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
			nvram set ${WIFI_PRE}_akm="psk psk2"
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
        elif [ "$band" = "5g_2" ]; then
            home_vif="$HOME_5G2_VIF"
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

wifi_portal_set_config() {
	local dev="$1"
	local vif=""
	local eth_enable="0"
	local guest_enable="0"
	local wds_enable="0"
	local guest_vif=""
	local device
	local viftmp=""
	#local guestvid

	config_get_bool wifi_disabled $dev disabled       #hardware switch
	config_get_bool soft_disabled $dev disabled_all   #software switch
	if [ ! -f "/tmp/ledpm_enable" ]; then
		config_get wifi_disabled_by $dev disabled_by
		if [ "$wifi_disabled_by" = "1" ]; then
			wifi_disabled=0
		fi
	fi
	if [ "$wifi_disabled" = "0" -a "$soft_disabled" = "0" ]; then
		config_get vifs $dev vifs
		
		for vif in $vifs; do
			config_get_bool enable $vif enable
			config_get mode $vif mode
			config_get guest $vif guest
			if [ "$enable" = "1" -a "$mode" = "ap" -a -z "$guest" ]; then
				eth_enable="1"
			elif [ "$mode" = "ap" -a "$guest" = "on" ]; then
				eth_enable="1"
				guest_enable="1"
				guest_vif="$vif"
			elif [ "$enable" = "1" -a "$mode" = "sta" ]; then
				eth_enable="1"
				wds_enable="1"
			else
				echo "=====>>>>> $dev: vif $vif is disabled" >$STDOUT
			fi
		done
	fi

	if [ "$eth_enable" = "1" -a "$guest_enable" = "1" ]; then
		vif="$guest_vif"
		config_get device $vif device
		config_get ssid $vif ssid
		config_get encryption $vif encryption
		config_get wds $vif wds
		config_get psk_version $vif psk_version
		config_get psk_cipher $vif psk_cipher
		config_get authentication_type $vif authentication_type
		config_get portal_password $vif portal_password
		config_get authentication_timeout $vif authentication_timeout
		config_get redirect $vif redirect
		config_get redirect_url $vif redirect_url
		config_get content $vif content
        config_get title $vif title
		config_get ifname $vif ifname

		if [ "$PORTALSET" = "0" ]; then
			if [ "$encryption" == "portal" ]; then
				PORTALSET="1"
				local brname
				get_brname brname

				# interface issue:
				# when GMAC3 on, interface will be eth0.$guestvid
				# when triband on, interface will be wl0.1 wl1.1 wl 1.2
				# otherwise, interface will be wl0.1 wl1.1
				local guest_ifnames=""
				if [ "$gmac3" == "yes" ]; then
					local guestvid
	                config_load switch
				    config_get guestvid switch0 guestvid
				    guest_ifnames="eth0.$guestvid"
				else
					if [ "$triband" == yes ]; then
						guest_ifnames="wl0.1 wl1.1 wl2.1"
					else
						guest_ifnames="wl0.1 wl1.1"
					fi
				fi

				fw flush 4 m guest_portal_mark
				fw del 4 m PREROUTING guest_portal_mark

				# add firewall chain to set mark
				fw add 4 m guest_portal_mark
				fw add 4 m PREROUTING guest_portal_mark

				# add firewall interface mark for guestnetwork
        		for guset_ifname in $guest_ifnames; do
        			fw add 4 m guest_portal_mark "MARK --set-mark 3" " -m physdev --physdev-in $guset_ifname"
        			fw add 4 m guest_portal_mark "MARK --set-mark 3" "-m physdev --physdev-out $guset_ifname"
        		done	

				echo "wirte /etc/wifidog/wifidog.conf - /var/etc/wifidog.conf" > /dev/console
                mkdir -p /var/etc
                sed -e "s#PARAuthType#$authentication_type#g" \
                	-e "s#PARAuthPassword#$portal_password#g" \
                	-e "s#PARRediEnable#$redirect#g" \
                	-e "s#PARAuthTimeout#$authentication_timeout#g" \
                	-e "s#PARGatewayInterface#$brname#g" \
                	-e '/^RediUrl/'d \
                	-e '/^AuthTitle/'d \
                	-e '/^AuthTerm/'d \
                	-e "/^RediEnable/a RediUrl $redirect_url "\
                	-e "/^AuthType/a AuthTitle $title "\
                	-e "/^AuthTimeout/a AuthTerm $content "\
                       /etc/wifidog/wifidog.conf > /var/etc/wifidog.conf
                [ -e /var/etc/wifidog.conf ] && [ ! -s /var/etc/wifidog.conf ] && echo "error:wifidog.conf is empty" > /dev/console
                if ps | grep -v grep| grep 'wifidog' > /dev/null;then
					/usr/bin/wdctl restart
				else
					/usr/bin/wifidog &
				fi
			else
				# delete firewall interface mark for guestnetwork
				fw flush m 4 guest_portal_mark
				fw del 4 m PREROUTING guest_portal_mark
				fw del 4 m guest_portal_mark

				wdctl stop
				sleep 1
				if ps | grep -v grep| grep 'wifidog' > /dev/null;then
					killall -9 wifidog
				fi
			fi
		fi	
	else
		viftmp="$guest_vif"
		config_get encryption $viftmp encryption

		let "PORTAL_DEV++"
		#here means the three wifi guest is all off
		if [ $PORTAL_DEV == 3 ]; then
			# delete firewall interface mark for guestnetwork
			fw flush m 4 guest_portal_mark
			fw del 4 m PREROUTING guest_portal_mark
			fw del m 4 guest_portal_mark

			wdctl stop
			sleep 1
			if ps | grep -v grep| grep 'wifidog' > /dev/null;then
				killall -9 wifidog
			fi
		fi
	fi
}

wifi_guest_config() {
	local dev="$1"
	local close11N
	local vif=""
	local eth_enable="0"
	local guest_enable="0"
	local wds_enable="0"
	local guest_vif=""
	echo "=====>>>>> $dev: wifi_guest_config" >$STDOUT

	config_get_bool wifi_disabled $dev disabled       #hardware switch
	config_get_bool soft_disabled $dev disabled_all   #software switch
	if [ ! -f "/tmp/ledpm_enable" ]; then
		config_get wifi_disabled_by $dev disabled_by
		if [ "$wifi_disabled_by" = "1" ]; then
			wifi_disabled=0
		fi
	fi
	if [ "$wifi_disabled" = "0" -a "$soft_disabled" = "0" ]; then
		config_get vifs $dev vifs
		for vif in $vifs; do
			config_get_bool enable $vif enable
			config_get mode $vif mode
			config_get guest $vif guest
			if [ "$enable" = "1" -a "$mode" = "ap" -a -z "$guest" ]; then
				eth_enable="1"
			elif [ "$mode" = "ap" -a "$guest" = "on" ]; then
				eth_enable="1"
				guest_enable="1"
				guest_vif="$vif"
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
			GUEST_WIFI="wl1.1"
			WIFI_DEV="wl1"
			WIFI_UNIT="1.1"
		;;
		5g)
			GUEST_WIFI="wl2.1"
			WIFI_DEV="wl2"
			WIFI_UNIT="2.1"
		;;
        5g_2)
            GUEST_WIFI="wl0.1"
            WIFI_DEV="wl0"
            WIFI_UNIT="0.1"
        ;;
	esac

	if [ "$eth_enable" = "1" -a "$guest_enable" = "1" ]; then
		vif="$guest_vif"
		config_get ssid $vif ssid
		config_get encryption $vif encryption
		config_get wds $vif wds
		config_get psk_version $vif psk_version
		config_get psk_cipher $vif psk_cipher
		nvram set ${GUEST_WIFI}_ssid="$ssid"
		if [ "$band" == "5g" -o "$band" = "5g_2" ]; then
			config_get country $dev country
			if [ "$country" == "AL" -o "$country" == "DZ" -o "$country" == "BZ" -o "$country" == "KZ" \
				 -o "$country" == "YE" -o "$country" == "ZW" ]; then
				nvram set ${GUEST_WIFI}_radio="0"
			else
				nvram set ${GUEST_WIFI}_radio="1"
			fi
		else
			nvram set ${GUEST_WIFI}_radio="1"
		fi
		
		config_get_bool hidden $vif hidden
		if [ "$hidden" == "1" ]; then
			nvram set ${GUEST_WIFI}_closed="1"
		else
			nvram set ${GUEST_WIFI}_closed="0"
		fi
		nvram set ${GUEST_WIFI}_bss_maxassoc="64" #need to check guestNet num

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
				nvram set ${GUEST_WIFI}_crypto="tkip+aes"
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
		elif [ "$encryption" == "portal" ]; then
			nvram set ${GUEST_WIFI}_wep="disabled"
			nvram set ${GUEST_WIFI}_auth="0"
			nvram set ${GUEST_WIFI}_akm=""	
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
		nvram set ${WIFI_DEV}_vifs="${GUEST_WIFI}"
		br0_ifnames_tmp="`nvram get br0_ifnames`"
		echo ${br0_ifnames_tmp} | grep -q ${GUEST_WIFI} || nvram set br0_ifnames="${br0_ifnames_tmp} ${GUEST_WIFI}"
		lan_ifnames_tmp="`nvram get lan_ifnames`"
		echo ${lan_ifnames_tmp} | grep -q ${GUEST_WIFI} || nvram set lan_ifnames="${lan_ifnames_tmp} ${GUEST_WIFI}"
        fwd_wlandevs_tmp="`nvram get fwd_wlandevs`"
		echo ${fwd_wlandevs_tmp} | grep -q ${GUEST_WIFI} || nvram set fwd_wlandevs="${fwd_wlandevs_tmp} ${GUEST_WIFI}"
	elif [ "$eth_enable" = "1" -a "$wds_enable" = "0" ]; then
		nvram set ${GUEST_WIFI}_radio="0"
		nvram set ${GUEST_WIFI}_bss_enabled="0"
		nvram set ${GUEST_WIFI}_wps_mode="disabled"
		br0_ifnames_tmp="`nvram get br0_ifnames`"
		tmp=$(nvram get br0_ifnames)
		echo ${br0_ifnames_tmp} | grep -q ${GUEST_WIFI}

		echo ${br0_ifnames_tmp} | grep -q ${GUEST_WIFI} || br0_ifnames_tmp="${br0_ifnames_tmp/ ${GUEST_WIFI}/""}"
		nvram set br0_ifnames="$br0_ifnames_tmp"
		lan_ifnames_tmp="`nvram get lan_ifnames`"
		echo ${lan_ifnames_tmp} | grep -q ${GUEST_WIFI} || lan_ifnames_tmp="${lan_ifnames_tmp/ ${GUEST_WIFI}/""}"
		nvram set lan_ifnames="$lan_ifnames_tmp"
	else
		echo "=====>>>>> $dev: the $dev is off or the guest is off" >$STDOUT
	fi
}

wifi_guest_switch() {
	local dev="$1"
	local vif=""
	config_get_bool wifi_disabled $dev disabled       #hardware switch
	config_get_bool soft_disabled $dev disabled_all   #software switch
	if [ ! -f "/tmp/ledpm_enable" ]; then
		config_get wifi_disabled_by $dev disabled_by
		if [ "$wifi_disabled_by" = "1" ]; then
			wifi_disabled=0
		fi
	fi
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
						GUEST_WIFI="wl1.1"
					;;
					5g)
						GUEST_WIFI="wl2.1"
					;;
			        	5g_2)
			            		GUEST_WIFI="wl0.1"
			        ;;
				esac
				echo "=====>>>>> wifi_guest_switch $dev: vif $vif is disabled, do bss down on $GUEST_WIFI" >$STDOUT
				wl -i $GUEST_WIFI bss down
			fi
		done
	fi
}

start_eapd(){
	eapd
}

start_nas(){
	nas 
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
	killall wps_monitor
	wps_monitor &
}

start_acsd(){
    if [ "$RFTEST" = "1" ]; then
        acsd
    fi
}

start_dhd_monitor(){
    dhd_monitor
}

start_bsd(){
    bsd
}

stop_eapd(){
	killall eapd
}

stop_nas(){
	killall nas
}

stop_wps(){
	killall wps_monitor
}

stop_acsd(){
	killall acsd
}

stop_dhd_monitor(){
    killall dhd_monitor
}

stop_bsd(){
    killall bsd
}

start_service(){
	start_eapd
	start_nas
	start_wps
	start_acsd
	#start_dhd_monitor
}

stop_service(){
	stop_wps
	stop_nas
	stop_eapd
	stop_acsd
    #stop_dhd_monitor
}

get_if_var(){    
	#get interface and status
	for dev in ${1:-$DEVICES}; do
		config_get_bool wifi_disabled $dev disabled       #hardware switch
		config_get_bool soft_disabled $dev disabled_all   #software switch
		if [ ! -f "/tmp/ledpm_enable" ]; then
			config_get wifi_disabled_by $dev disabled_by
			if [ "$wifi_disabled_by" = "1" ]; then
				wifi_disabled=0
			fi
		fi
		if [ "$wifi_disabled" = "0" -a "$soft_disabled" = "0" ]; then
			config_get vifs "$dev" vifs
			config_get band "$dev" band
			config_get mac_$band "$dev"  macaddr
			for vif in $vifs; do 
				config_get ifname "$vif" ifname
				config_get enable "$vif" enable
				config_get guest  "$vif" guest
				config_get mode   "$vif" mode

				if [ "$mode" = "ap" ] && [ -z "$guest" ]; then
					eval "vap0_$band"="$ifname"
					eval "home_$band"="$enable"
				elif [ "$mode" = "ap" ] && [ ! -z "$guest" ]; then
					eval "vap1_$band"="$ifname"
					eval "guest_$band"="$enable"
				elif [ "$mode" = "sta" ] ; then
					eval "bridge_$band"="$enable"
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
	./"$app_name"
}

wifi_insmod_dhd_test(){
	local wltestko_name="dhd_wltest.ko"
	local module_name=dhd
	local brname
	local host_ip

	cd /tmp

	

		# get bridge name
		get_brname brname

		#tftp host ip is as same as bridge ip except last part, such as br_ip=192.168.0.1 then host_ip=192.168.0.100
		host_ip=`ifconfig $brname | grep -o 'inet addr:[^ ]*' | grep -o '[^:]*$' | sed -n 's/\(^[^\.]*\.[^\.]*\.[^\.]*\)\..*$/\1\.100/p'`
		echo "INFO:TFTP FROM HOST $host_ip" >$STDOUT
		tftp -gr "$wltestko_name" "$host_ip"
		tftp_status=$?
		sleep 1
		echo "tftp_status=$tftp_status" >$STDOUT
		while [ $tftp_status -ne 0 ]
		do
			echo "WARNING:TFTP $wltestko_name FROM PC ERROR!" >$CONSOLE
			rm -rf "$wltestko_name"
			tftp -gr "$wltestko_name" "$host_ip"
			tftp_status=$?
			sleep 1
			echo "tftp_status=$tftp_status" >$STDOUT
		done
	

	rmmod $module_name
	insmod ./$wltestko_name
	grep -q '^'$module_name /proc/modules || echo "insmod dhd.ko failed." >$STDOUT ;
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
		ledcli WIFI5G_2_ON
		usleep $sleeptime
		ledcli WIFI2G_OFF
		ledcli WIFI5G_OFF
		ledcli WIFI5G_2_OFF
		usleep $sleeptime
	done
}

wifi_driver_startup(){
	echo "=====>>>>> wifi_driver_startup" >$STDOUT
	# insmod dhd.ko first
	local module_name=dhd
	grep -q '^'$module_name /proc/modules || insmod $module_name
	grep -q '^'$module_name /proc/modules || echo "insmod dhd.ko failed." >$STDOUT ;
	wifi_features_set
	# set kernel printk loglevel to 7 
	echo 1 > /proc/sys/kernel/printk
}

wifi_features_set(){
	# get bridge name
	get_brname brname
	# get if and status
	get_if_var
	nvram unset acs_ifnames
	
	echo "======>>>>>> config bands: $bands" >$STDOUT

	for band in $bands; do
		if [ "$WIFI_SCHEDULE" = "1" ]; then
			wireless_schedule_disable_wifi "$band" && continue
		fi
		eval local vap0=\${vap0_$band} vap1=\${vap1_$band}
		eval local home=\${home_$band} guest=\${guest_$band} bridge=\${bridge_$band}
		eval local mac=\${mac_$band}

		#echo "DEBUG:" $band $vap0 $vap1 $home $guest $bridge >$STDOUT
		if [ "$home" = "on" ]; then 
			if [ "$band" = "2g" ]; then
				# set vht feature for 2g
				wl -i "$vap0" vht_features 0x7 # let 2g support 1024QAM
			fi

			config_get hwmode $vap0 hwmode
			if [ "$band" = "2g" ]; then
				if [ "$hwmode" = "11g" -o "$hwmode" = "11bg" ]; then
					wl -i "$vap0" vhtmode 0 # 1024QAM is off, default is on(1)
				fi
			else
				if [ "$hwmode" = "11a" -o "$hwmode" = "11n" -o "$hwmode" = "11an" ]; then
					wl -i "$vap0" vhtmode 0
				fi
			fi
			

			ifconfig "$vap0" up
			wlconf "$vap0" up
			brctl addif "$brname" $vap0

			if [ "$band" = "2g" ]; then
				# set phy_ed_thresh(cca) for 2g, default(-69)
				wl -i "$vap0" phy_ed_thresh -63 # reduce interference from usb 3.0
			fi

			# wds bridge
			if [ "$bridge" = "on" ]; then 
				#format xx:xx:xx:xx:xx:xx 
				ifconfig $vap1 hw ether ${mac//-/:}
				#brctl addif "$brname" $vap1
				ifconfig "$vap1" up
				# enable recv all multicast traffic
				wl -i "$vap0" allmulti 1
			fi

			# guest network, always on
			ifconfig $vap1 hw ether $(fix_vif_mac $mac "init")
			ifconfig "$vap1" up
			brctl addif "$brname" "$vap1" 

			config_get txpower $vap0 txpower
			if [ "$txpower" = "high" ]; then
				wl -i $vap0 pwr_percent 100
			elif [ "$txpower" = "middle" ]; then
				wl -i $vap0 pwr_percent 80
			else
				wl -i $vap0 pwr_percent 60
			fi

			config_get_bool shortgi $vap0 shortgi
			if [ "$shortgi" = "1" ]; then
				wl -i $vap0 sgi_tx -1
			else
				wl -i $vap0 sgi_tx 0
			fi

			config_get mu_mimo $vap0 mu_mimo
			if [ "$band" != "2g" -a "${mu_mimo}" = "on" ]; then		# 2g has no mimo
				wl -i $vap0 txbf_mutimer 50 # performance can be better, default to MU_SOUND_PERIOD_DFT(25ms)
			fi
		fi
	done

	#start programs

	start_service

	for band in $bands; do
		if [ "$WIFI_SCHEDULE" = "1" ]; then
			wireless_schedule_disable_wifi "$band" && continue
		fi
		eval local vap0=\${vap0_$band}
		eval local home=\${home_$band}
		if [ "$home" = "on" ]; then 
			wlconf "$vap0" start
		fi
		wifi_guest_switch $vap0
	done

	wifi_vlan notaddif
}

wifi_driver_stop(){
	echo "=====>>>>> wifi_driver_stop: $bands" >$STDOUT

	# stop programs
	stop_service

	# get bridge name
	get_brname brname

	# get if and status
	get_if_var	

	# br-lan down
	# ifconfig "$brname" down

	for band in $bands; do
		eval local vap0=\${vap0_$band} vap1=\${vap1_$band}
		eval local home=\${home_$band} guest=\${guest_$band} bridge=\${bridge_$band}
		eval local mac=\${mac_$band}

		for ifd in "$vap0" "$vap1"; do 
			wlconf "$ifd" down
			ifconfig "$ifd" down
			#brctl  delif "$brname" "$ifd" 
		done
		
		#TODO set only for wds ?
		ifconfig "$vap1" hw ether $(fix_vif_mac $mac "stop")
	done

	#remove dhd.ko
	local module_name=dhd
	grep -q '^'$module_name /proc/modules && rmmod $module_name 

	# br-lan up
	# ifconfig "$brname" up

	/etc/init.d/imb restart # fix the problem: when wifi reload, the arp list is empty.
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

wifi_set_probresp_sw()
{
	probsw_enable="$1"
	if [ $probsw_enable = "1" ]; then
		for dev in ${DEVICES}; do  # eth6 eth7 eth8
				wl -i $dev probresp_sw 1
			done
	else
		for dev in ${DEVICES}; do  # eth6 eth7 eth8
				wl -i $dev probresp_sw 0
			done
	fi
}

wifi_smart_config()
{
    local smart_enable
    smart_enable=`uci get wireless.smart.smart_enable`
    nvram set bsd_role="3"
    if [ "${smart_enable}" = "on" ]; then
        stop_bsd
        wifi_set_probresp_sw 1
        start_bsd
    elif [ "${smart_enable}" = "off" ]; then
    	wifi_set_probresp_sw 0
        stop_bsd
    fi
}

wifi_smart() {
    echo "=====>>>>> you have set smart connect" >$CONSOLE
    wifi_smart_config
}

# config dfs with "reg_mode" in nvram 
wifi_dfs_config()
{
	local dev="$1"
	config_get country $dev country
	local dfsSwitch=`cat $BRCM_COUNTRYCODE | awk '$1=="'"$country"'" {print $3}'`
	config_get band $dev band
	local wifi_prefix=$(get_wifi_prefix $band)

	if [ "$dfsSwitch" = "ON" ]; then
		nvram set dfs_enable="1"			# acsd.c
	    nvram set pcie/1/1/disband5grp=0x7	# wlc_channel.c
	    nvram set pcie/2/4/disband5grp=0x18

	    if [ "$band" != "2g" ]; then    
			nvram set ${wifi_prefix}_reg_mode="h"
			# dfs_preism dfs_postism
	    else
	    	nvram set ${wifi_prefix}_reg_mode="off"
	    fi
	else
		nvram set dfs_enable="0"
	fi
}

wifi_atf_config()
{
	local dev="$1"
	config_get airtime_fairness $dev airtime_fairness
	local wifi_prefix=$(get_wifi_prefix $band)
	
	if [ "${airtime_fairness}" = "on" ]; then
		nvram set ${wifi_prefix}_atf="1"
    elif [ "${airtime_fairness}" = "off" ]; then
		nvram set ${wifi_prefix}_atf="0"
    fi
}

wifi_mimo_config() {
	local dev="$1"
	config_get band $dev band
	config_get mu_mimo $dev mu_mimo
	local wifi_prefix=$(get_wifi_prefix $band)

	if [ "$band" != "2g" ]; then	# 2g has no mimo
		if [ "${mu_mimo}" = "on" ]; then
			nvram set ${wifi_prefix}_txbf_bfr_cap="2"
			nvram set ${wifi_prefix}_txbf_bfe_cap="1"
			nvram set ${wifi_prefix}_mu_features="1"
		elif [ "${mu_mimo}" = "off" ]; then
		    nvram set ${wifi_prefix}_txbf_bfr_cap="1"
			nvram set ${wifi_prefix}_txbf_bfe_cap="1"
			nvram set ${wifi_prefix}_mu_features="0"
		fi
	fi
}

# close advance features for factory test
wifi_factory_close_config() {
	local dev="$1"
	config_get band $dev band
	local wifi_prefix=$(get_wifi_prefix $band)

	_tp_close_dfs_tmp="`nvram get _tp_close_dfs_tmp`"
	if [ "$_tp_close_dfs_tmp" = "1" ]; then
		nvram set ${wifi_prefix}_reg_mode="off"
	fi

	_tp_close_txbf_tmp="`nvram get _tp_close_txbf_tmp`"
	if [ "$_tp_close_txbf_tmp" = "1" ]; then
		nvram set ${wifi_prefix}_txbf_imp="0"
		nvram set ${wifi_prefix}_txbf_bfr_cap="0"
		nvram set ${wifi_prefix}_txbf_bfe_cap="0"
		nvram set ${wifi_prefix}_mu_features="0"
	else
	#prevent nvram commit action keep txbf_imp=0
	#txbf_bfr_cap txbf_bfe_cap will config in wifi_mimo_config
	#5g mu_features will config in wifi_mimo_config
	#reg_mode will config in wifi_dfs_config
		nvram set ${wifi_prefix}_txbf_imp="1"
		if [ "$band" = "2g" ]; then
			nvram set ${wifi_prefix}_mu_features="0x8000"
		fi
	fi
}

wifi_nvram_config() {
	for dev in ${DEVICES}; do  # eth6 eth7 eth8
		wifi_basic_config $dev
		wifi_security_config $dev
        wifi_macfilter_config $dev
		wifi_advanced_config $dev
		wifi_dfs_config $dev
		wifi_atf_config $dev
		wifi_mimo_config $dev
		wifi_wps_config $dev
		#wifi_wds_config $dev
        wifi_psta_config $dev
		wifi_guest_config $dev
		wifi_factory_close_config $dev	# the last one
	done
}

disconnect_sta_if()
{
	for sta in `wl -i $1 assoclist | cut -d ' ' -f 2`; do
			wl -i $1 deauthenticate $sta
	done
}

wifi_disconnect_sta()
{
	local dev="$1"
	local vif=""
	local eth_enable="0"
	local guest_enable="0"
	local wds_enable="0"
	local guest_vif=""
	echo "=====>>>>> $dev: wifi_disconnect_sta" >$STDOUT

	config_get_bool wifi_disabled $dev disabled       #hardware switch
	config_get_bool soft_disabled $dev disabled_all   #software switch
	if [ ! -f "/tmp/ledpm_enable" ]; then
		config_get wifi_disabled_by $dev disabled_by
		if [ "$wifi_disabled_by" = "1" ]; then
			wifi_disabled=0
		fi
	fi
	if [ "$wifi_disabled" = "0" -a "$soft_disabled" = "0" ]; then
		config_get vifs $dev vifs
		for vif in $vifs; do
			config_get_bool enable $vif enable
			config_get mode $vif mode
			config_get guest $vif guest
			if [ "$enable" = "1" -a "$mode" = "ap" -a -z "$guest" ]; then
				eth_enable="1"
			elif [ "$enable" = "1" -a "$mode" = "ap" -a "$guest" = "on" ]; then
				eth_enable="1"
				guest_enable="1"
				guest_vif="$vif"
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
			GUEST_WIFI="wl1.1"
			WIFI_DEV="wl1"
			WIFI_UNIT="1.1"
		;;
		5g)
			GUEST_WIFI="wl2.1"
			WIFI_DEV="wl2"
			WIFI_UNIT="2.1"
		;;
        5g_2)
            GUEST_WIFI="wl0.1"
            WIFI_DEV="wl0"
            WIFI_UNIT="0.1"
        ;;
	esac

	if [ "$eth_enable" = "1" ]; then
		disconnect_sta_if $dev
	fi

	if [ "$guest_enable" = "1" ]; then
		disconnect_sta_if $GUEST_WIFI
	fi
	
}

wifi_disconnect_stas()
{
	for dev in ${DEVICES}
	do
		wifi_disconnect_sta $dev
	done
}

wifi_portal_config() {
	PORTALSET="0"
	PORTAL_DEV=0
	
	for dev in ${DEVICES}; do  # eth1 eth2 eth3
		wifi_portal_set_config $dev
	done
}


# only for gmac3 vlan id
wifi_notice_portal() {
	if [ "$gmac3" == "yes" ]; then
		config_load switch
        local guestvid
        config_get guestvid switch0 guestvid
        guest_ifnames="eth0.$guestvid"

        fw flush 4 m guest_portal_mark
        # add firewall interface mark for guestnetwork
        for guset_ifname in $guest_ifnames; do
        	fw add 4 m guest_portal_mark "MARK --set-mark 3" " -m physdev --physdev-in $guset_ifname"
        	fw add 4 m guest_portal_mark "MARK --set-mark 3" "-m physdev --physdev-out $guset_ifname"
        done	
	fi
}

wifi_led_set() {
	local led_state=""
	#added by zhangshengbo
	local led_flag="0"
    local lp5523_flag=""
	lp5523_flag=$(uci get profile.@lp5523[0].message -c /etc/profile.d)
	
	for dev in ${DEVICES}; do
		config_get disabled $dev disabled
		config_get disabled_all $dev disabled_all
		config_get band $dev band
		if [ "$disabled" = "off" -a "$disabled_all" = "off" ]; then
			led_state="ON"
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
		elif [ "$band" == "5g_2" ] ; then
			band="WIFI5G_2"
		fi
		#added by zhangshengbo
		if [ "$lp5523_flag" == "chip-on" ]; then
			if [ "$led_state" == "ON" ]; then
				led_flag=$((led_flag+1))
			fi
		else
		ledcli ${band}_${led_state}
		fi
	done
	#added by zhangshengbo
	if [ "$lp5523_flag" == "chip-on" ]; then 
		if [ "$led_flag" == 0 ]; then
			ubus send leds '{"action" : "2", "status" : "0"}'
		else
			ubus send leds '{"action" : "2", "status" : "1"}'
		fi
	fi
}

powermanager_nvram_init()
{
	nvram set 1:tempthresh=120
	nvram set 2:tempthresh=120
	nvram set 3:tempthresh=120
}
wifi_reload() {
	echo "=====>>>>> begin wifi_reload $*" >$STDOUT
	wifi_led_set
	/etc/init.d/minidlna stop
	echo 3 >/proc/sys/vm/drop_caches # free cache manual
	wifi_nvram_config
	wifi_driver_stop
	wifi_driver_startup
	wifi_smart_config
	wifi_portal_config
	echo "=====>>>>> wireless reload setting is finished" >$CONSOLE

#to avoid exception of 2.4g power
	_tp_close_txbf_tmp="`nvram get _tp_close_txbf_tmp`"
	if [ "$_tp_close_txbf_tmp" = "1" ]; then
		wl -i eth7 down
		wl -i eth7 txbf_bfe_cap 1
		wl -i eth7 txbf_bfr_cap 1
		wl -i eth7 up
	fi

	/etc/init.d/minidlna start
}
#add by zhangshengbo for check wifi status
wifi_check()
{
	echo "come in wifi_check" >$STDOUT
	sleep 5
	
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
		*)
			echo "in wifi_check, country is not US DE or JP" >$STDOUT
			return
			;;
	esac
	local wifi_all_down="1"
	for band in $bands; do
		eval local vap0=\${vap0_$band}
		echo "in wifi_check, vap0 is $vap0" >$STDOUT
		
		config_get_bool wifi_disabled $vap0 disabled       #hardware switch
		config_get_bool soft_disabled $vap0 disabled_all   #software switch
		
		if [ "$wifi_disabled" = "0" -a "$soft_disabled" = "0" ]; then
			local bssid=$( wl -i $vap0 status | grep BSSID | cut -d ':' -f 2-7 | cut -c 2-18 )
			local channel=$( wl -i $vap0 status | grep Primary | cut -d ':' -f 2 | cut -d ' ' -f 2 )
			wifi_all_down="0"
			echo "in wifi_check,bssid now is $bssid,channel now is $channel" >$STDOUT
			
			if [ "$bssid" == "00:00:00:00:00:00" ] || [ "$bssid" == "" ]; then
				echo "bssid error!!!wifi error!!!reload!!!" > /dev/console
				wifi_reload
				break
			fi
			if [ "$band" = "2g" ]; then
				if [ "$channel" -lt "$c2gl" ] || [ "$channel" -gt "$c2gh" ]; then
					echo "2g channel error!!!reload!!!" > /dev/console
					wifi_reload
					break
				fi
			elif [ "$band" = "5g" ]; then
				if [ "$channel" -lt "$c5g1l" ] || [ "$channel" -gt "$c5g1h" ]; then
					echo "5g1 channel error!!!reload!!!" > /dev/console
					wifi_reload
					break
				fi
			else
				if [ "$channel" -lt "$c5g2l" ] || [ "$channel" -gt "$c5g2h" ]; then
					echo "5g2 channel error!!!reload!!!" > /dev/console
					wifi_reload
					break
				fi
			fi	
		fi
	done

	if [ "$wifi_all_down" == "1" ];then
		return
	fi
	#check nas acsd eapd
	echo "in wifi_check,will check acsd,nas,eapd" >$STDOUT
	
	local acsd_isup=$( ps | grep acsd | grep -v grep )
	local nas_isup=$( ps | grep nas | grep -v grep )
	local eapd_isup=$( ps | grep eapd | grep -v grep )

	if [ "$acsd_isup" == "" ] || [ "$nas_isup" == "" ] || [ "$eapd_isup" == "" ]; then
		echo "no acsd or no nas or no eapd!!!!reload!!!" > /dev/console
		wifi_reload
		return
	fi
}
wifi_start()
{
	echo "=====>>>>> begin wifi_start" >$CONSOLE

	#added by zhangshengbo
    local lp5523_flag=""
	lp5523_flag=$(uci get profile.@lp5523[0].message -c /etc/profile.d)
	pro_id=`getfirm PRODUCT_ID`
	myFile="/tp_data/radio_bk"
	if [ ! -f "$myFile" ]; then
		touch "$myFile"
	fi
	if [ ! -f /tmp/par_tbl ]; then
		touch "/tmp/par_tbl"
	fi
	nvrammanager -r /tmp/par_tbl -p radio_bk
    /usr/sbin/cal_cbr /tmp/par_tbl "$pro_id" radio_bk > /dev/console
	if [ "$?" = "0" ]; then
        RFTEST=0
	fi
	#judge bt
	local nvram_flag=$(nvram get bt_rftestflag)
	nvrammanager -r /tmp/bt_radiobk -p bt_radiobk
	local btradiofile=$(cat /tmp/bt_radiobk)
	if [ -z "$nvram_flag" ] && [ -z "$btradiofile" ]
	then
	    RFTEST=0
	fi

	echo "%%%@@@RFTEST=$RFTEST" > /dev/console
	wifi_driver_startup
	wifi_smart_config
	if [ "$RFTEST" = "0" ]; then
		echo "!!! no rftestflag, need to calibrate! start to calibrate....." >$CONSOLE
		#changed by zhangshengbo
		if [ "$lp5523_flag" == "chip-on" ]; then 
			#purple twinkle
			killall lp5523ctrl
			
			cd /sys/class/leds/d1/device/
			echo "disabled" > engine1_mode
			echo "disabled" > engine2_mode
			echo "disabled" > engine3_mode
			echo "load" > engine1_mode
			echo "0007003801c09c02e00c40ff6000400060000000" > engine1_load
			echo "load" > engine2_mode
			echo "9c01e08040006000400060000000" > engine2_load
			echo "load" > engine3_mode
			echo "9c00e08040ff6000400060000000" > engine3_load
			echo "run" > engine1_mode
			
			/etc/init.d/phyport start
			wifi_start_calibrate
		else
		wifi_sys_led_flick &
		/etc/init.d/phyport start
		wifi_start_calibrate
		fi
	#elif [ "$CERT_WLTEST" = "1" ]; then
	#	/etc/init.d/telnet start
	#else
	#	/etc/init.d/telnet start
	fi
	rm -rf /tmp/par_tbl
	wifi_led_set
	echo "inited" >/tmp/wifi_state #tell others wifi is inited
	wifi_notice_portal
}

# by wifi_init, avoid flags in case of they are committed to nvram by "mistake"
wifi_avoid_facotry_close_config() {
	nvram unset _tp_close_dfs_tmp
	nvram unset _tp_close_txbf_tmp
}

wifi_init() {
	local pro_id=""
	#wifi_nvram_default_restore

	wifi_avoid_facotry_close_config

	echo 14336 >/proc/sys/vm/min_free_kbytes # the limited value of buffer, the system will retrieve buffer when the current buffer is less than this value.
	nvram set boardnum=22
	nvram set boardflags=0x00000010
	nvram set boardflags2=0x00000000
	#for psta negotiating streams 2 to 4
	nvram set wl0_dyn160=
	nvram set wl1_dyn160=
	nvram set wl2_dyn160=
	#
	
	wlan_nvram_init
	powermanager_nvram_init
	init_feature_config
	init_nvram_mac
	wifi_nvram_config
	echo /sbin/hotplug > /proc/sys/kernel/hotplug # config for wds, need to check

	wifi_start &
	echo "=====>>>>> wireless init setting is finished" >$CONSOLE
}
