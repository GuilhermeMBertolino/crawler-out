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
COUNTRYCODE_AU=0
HOME_2G_VIF=""
HOME_5G_VIF=""
HOME_5G2_VIF=""
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
				for vif in $vifs; do    # vifs is wl01/wl02/wl03, home/guest/wds
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
					HOME_WIFI="wl1"
					GUEST_WIFI="wl1.3"
					BACKHAUL_WIFI="wl1.2"
				;;
				5g)
					HOME_WIFI="wl2"
					GUEST_WIFI="wl2.3"
					BACKHAUL_WIFI="wl2.2"
				;;
				 5g_2)
					HOME_WIFI="wl0"
					GUEST_WIFI="wl0.3"
					BACKHAUL_WIFI="wl0.2"
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
			elif [ "$tmpCode" = "AU" ]; then
				nvram set ${HOME_WIFI}_country_code="$tmpCode"
				nvram set ${HOME_WIFI}_country_rev="$COUNTRYCODE_AU"
				country_code="$tmpCode"
			else
				nvram set ${HOME_WIFI}_country_code="$country"
				nvram set ${HOME_WIFI}_country_rev="$tmpCode"
				country_code="$country"
				country_rev="$tmpCode"
			fi

			#Add for Evalulate,CC Code: US/1
			local evaluate_flag=`nvram get modelflags`
			if [ "$evaluate_flag" = "1" ]; then
				nvram set ${HOME_WIFI}_country_code="US"
				nvram set ${HOME_WIFI}_country_rev="1"
			fi

			#* HE features bitmap.
			#* Bit 0:               HE 5G support
			#* Bit 1:               HE 2G support
			#* Bit 2:               HE DL-OFDMA support
			#* Bit 3:               HE DL-OFDMA support
			#* Bit 4:               HE MU-MIMO
			local ofdma="off"
			ofdma=`uci get wireless.ofdma.enable`
			if [ "$hwmode" = "11ax" -o "$hwmode" = "11ax_5" -o "$hwmode" = "11bgnax" -o "$hwmode" = "11anacax" ]; then
				config_get mu_mimo $dev mu_mimo
				if [ "$ofdma" = "on" ]; then
					if [ "$mu_mimo" = "on" ]; then
						nvram set ${HOME_WIFI}_he_features="-1"
					else
						nvram set ${HOME_WIFI}_he_features="15"
					fi
				else
					if [ "$mu_mimo" = "on" ]; then
						nvram set ${HOME_WIFI}_he_features="19"
					else
						nvram set ${HOME_WIFI}_he_features="3"
					fi
				fi
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
			elif [ "$band" = "5g_2" -a "$wds_enable" = "1" ]; then
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

wifi_csd() {
	local cmd="$1"

	case $cmd in
	scan)
		if [ "$( ps | grep 'acs_cli2 csdetect' | grep -v grep )" == "" ];  then
			acs_cli2 csdetect &
		fi
		;;
	*)
		local csd_result=`acs_cli2 get csd_result`
		local flag=0

		for band in $csd_result
		do
			local ifname=`echo $band | cut -f1 -d:`
			local csd_ch=`echo $band | cut -f3 -d:`
			local csd_status=`echo $band | cut -f2 -d:`

			echo "$ifname: $csd_ch"
		done
		;;
	esac

	echo -e "\n"
	echo "csd_shell_over"
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
				$wps_cmd wps_get_status
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
}

wifi_wps_switch() {
	wifi_reload
}

wifi_disconnect_stas() {
	for dev in $DEVICES; do
		echo "dev is $dev" >$STDOUT
#wl0 wl1 wl2
		config_get_bool wifi_disabled $dev disabled
		if [ "$wifi_disabled" = "0" ]; then
			config_get vifs $dev vifs
#vifs is wl01 wl02 wl03 wl04 wl11 wl12 wl13 wl14 wl21 wl22 wl23 wl24
			for vif in $vifs; do
				config_get_bool enable $vif enable
				config_get ifname $vif ifname  
#ifname is wl0 wl0.2 wl0.3 wl1 wl1.2 wl1.3 wl2 wl2.2 wl2.3
				echo "vif is $vif , ifname is $ifname" >$STDOUT
				# kick all sta
				if [ "$enable" = "1" ]; then
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
	local hvlan=$((0x7)) gvlan=0;
	get_brname brname
	for port in $(brctl show "$brname" | grep eth | cut -f 6-8); do
		brctl setifvlan "$brname" "$port" "$hvlan" 1
	done

	if [ "$wifi_state" = "inited" -o "$isaddif" = "0" ]; then 
		echo "=====>>>>> wifi_vlan" >$STDOUT

		for dev in $DEVICES; do
			config_get_bool wifi_disabled $dev disabled
			if [ "$wifi_disabled" = "0" ]; then
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
	nvram unset ure_disable

	# delete dynamically generated variables
	for idx in `seq 0 2`; do
		nvram unset wl${idx}_vifs
		nvram unset wl${idx}_ssid
		nvram unset wl${idx}_guest
		nvram unset wl${idx}_ure
		nvram unset wl${idx}_ipconfig_index
		nvram unset wl${idx}_nas_dbg

		# clear virtual versions
		for vif_idx in `seq 1 3`; do
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

# Wireless phy_ed_thresh for AX20 AC-PHY
# For (wl is_edcrs_eu)
# 	None-EU: ed_thresh2g, ed_thresh5g
#   EU: eu_edthresh2g, eu_edthresh5g
init_nvram_phy_ed_thresh() {
	nvram kset 0:ed_thresh2g="-40"
	nvram kset 1:ed_thresh5g="-40"
	nvram kset 0:eu_edthresh2g="-40"
	nvram kset 1:eu_edthresh5g="-40"
}

# init Wireless parameters
init_nvram_wireless() {
	for idx in 0 1 2; do
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
		nvram set wl${idx}_key1="1234567890"
		nvram set wl${idx}_key2="1234567890"
		nvram set wl${idx}_key3="1234567890"
		nvram set wl${idx}_key4="1234567890"
		nvram set wl${idx}_maclist=""
		nvram set wl${idx}_macmode="disabled"
		nvram set wl${idx}_assoc_retry_max="3"
		nvram set wl${idx}_chanspec="11"
		#dfs parameters
		if [ "$idx" = "0" -o "$idx" = "2" ]; then
			#5G
			nvram set wl${idx}_reg_mode="h"
		else
			nvram set wl${idx}_reg_mode="off"
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
		nvram set wl${idx}_auth_mode="open"
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
	nvram set wps_random_ssid_prefix="TP-Link_"
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
	local sysmode=`uci get sysmode.sysmode.mode`
	local onemesh_enable=`uci get onemesh.onemesh.enable`

	[ -z "$sysmode" ] && sysmode="router"
	[ -z "$onemesh_enable" ] && onemesh_enable="on"
	for idx in `seq 0 2`; do
		nvram set wl${idx}_maxassoc="256"
		nvram set wl${idx}_bss_maxassoc="256"

		nvram set wl${idx}_unit="1"
		nvram set wl${idx}_sta_retry_time="5"
		
		nvram set wl${idx}_rrm="0x33"
	done
}

# Restore defaults
init_nvram_defaults() {
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
			nvram set wl${idx}_txbf_imp="1"
	done
}

#Factory MFG related parameters
init_nvram_mfg() {
	nvram set _tp_close_txbf_tmp="0"
}

# TX mu_mimo
wifi_mu_mimo_config() {

	local dev="$1"
	config_get band $dev band
	config_get mu_mimo $dev mu_mimo
	
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

	#close pmf(protected management frame)
	nvram set ${HOME_WIFI}_mfp="0"

	#* BFE/R_CAP bitmap.
	#* Bit0:	VHT_SU
	#* Bit1:	VHT_MU
	#* Bit2:	HE_SU
	#* Bit4:	HE_MU
	nvram set ${HOME_WIFI}_txbf_bfr_cap="15"
	nvram set ${HOME_WIFI}_txbf_bfe_cap="15"

	if [ "${mu_mimo}" = "on" ]; then
		nvram set ${HOME_WIFI}_mu_features="1"
	elif [ "${mu_mimo}" = "off" ]; then
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
			HOME_WIFI=wl2
		;;
		5g_2)
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
# change pspretend_retry_limit from 0 to 5 by zhangshengbo
# open pspretend function
init_nvram_pspretend() {
	for idx in 0 1 2; do
		nvram set wl${idx}_pspretend_threshold="0"
		nvram set wl${idx}_pspretend_retry_limit="5"
	done
}

# acsd setting
init_nvram_acsd() {
	local triband=$(uci get profile.@wireless[0].support_triband -c /etc/profile.d)

	for dev in $DEVICES; do
		config_get band $dev band
		config_get country $dev country
		local excl_chans="" nondfs=1 idx

		if [ "$triband" = "yes" ]; then
			if [ "$country" = "US" ]; then
				case $band in
				2g)
					excl_chans=""
					nondfs=1
					;;
				5g)
					excl_chans="0xd024,0xd826,0xe02a"  #exclude 36/20,36/40,36/80
					nondfs=1
					;;
				5g_2)
					excl_chans=""
					nondfs=1
					;;
				esac
			elif [ "$country" = "JP" ] || [ "$country" = "DE" ];then
				case $band in
				2g)
					excl_chans=""
					nondfs=1
					;;
				5g)
					excl_chans=""
					nondfs=1
					;;
				5g_2)
					excl_chans=""
					nondfs=0
					;;
				esac
			fi
		else
			excl_chans=""
			nondfs=1
		fi

		case $band in
		2g)
			idx=1
			;;
		5g)
			idx=2
			;;
		5g_2)
			idx=0
			;;
		esac

		nvram set wl${idx}_acs_fcs_mode="0"
		nvram set wl${idx}_dcs_csa_unicast="0"
		nvram set wl${idx}_acs_excl_chans="$excl_chans"
		nvram set wl${idx}_acs_dfs="2"
		nvram set wl${idx}_acs_dfsr_immediate="300 3"
		nvram set wl${idx}_acs_dfsr_deferred="604800 5"
		nvram set wl${idx}_acs_dfsr_activity="30 10240"
		nvram set wl${idx}_acs_start_on_nondfs="$nondfs"
		nvram set wl${idx}_acs_cs_scan_timer="900"
		nvram set wl${idx}_acs_ci_scan_timer="4"
		nvram set wl${idx}_acs_ci_scan_timeout="300"
		nvram set wl${idx}_acs_scan_entry_expire="3600"
		nvram set wl${idx}_acs_tx_idle_cnt="5"
		nvram set wl${idx}_acs_chan_dwell_time="30"
		nvram set wl${idx}_acs_chan_flop_period="30"
		#disable txfail for acsdv2
		nvram set wl${idx}_acs_ignore_txfail="1"
		#set zero-wait dfs
		nvram set wl${idx}_acs_bgdfs_enab="1"
	done
}

# system run produce
init_nvram_run() {
	for idx in 0 1 2; do
		nvram set wl${idx}_mimo_preamble=""
		nvram set wl${idx}_bridge=""
		nvram set wl${idx}_tpc_db="0"
		if [ $idx -eq 0  ]; then
			nvram set wl${idx}_txchain="15" #need to check
			nvram set wl${idx}_rxchain="15" #need to check
		else
			nvram set wl${idx}_txchain="3" #need to check
			nvram set wl${idx}_rxchain="3" #need to check
		fi
		nvram set wl${idx}_nmode_protection="auto"
		nvram set wl${idx}_rifs=""
		nvram set wl${idx}_ure="0"
		nvram set wl${idx}_preauth=""
		nvram set wl${idx}_dwds="0"
		nvram set wl${idx}_wmf_psta_disable=""
	done
	nvram set wps_proc_status="0"
	nvram set wps_config_method="0x2688"
	nvram set wps_aplockdown="0"

	nvram set partialboots="0"
	nvram set br0_ifname="br-lan"
	nvram set br0_ifnames="eth1 eth2 eth3 eth4 wl0 wl1 wl2"
}

init_nvram_router() {
	#add by zhangshengbo for hostapd
	init_nvram_hostapd

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

	#Factory MFG related parameters
	init_nvram_mfg
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
	else
		nvram set wl_txchain=15
		nvram set wl_rxchain=15
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
				nvram kset 0:macaddr="${macaddr}"
			;;
			5g)
				config_get macaddr "$dev" macaddr
				macaddr=${macaddr//-/:}
				nvram kset 1:macaddr="${macaddr}"
			;;
			5g_2)
				config_get macaddr "$dev" macaddr
				macaddr=${macaddr//-/:}
				nvram kset 2:macaddr="${macaddr}"
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
	nvram set wl_assoc_retry_max="3"
	nvram set wl1_acs_fcs_mode="0"
	nvram set wl1_acs_dfsr_activity="30 10240"
	nvram set wl_dwds="1"
	nvram set wl_intfer_retryrate=""
	nvram set wl_version=""
	nvram set wl_maxassoc="64"
	nvram set wl_txbf_bfr_cap="1"
	nvram set wl_phytypes="v"
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
	nvram set wl_akm="open"
	nvram set wl_wmf_mdata_sendup="0"
	nvram set wl_wme_bss_disable="0"
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
	nvram set wl_key1="1234567890"
	nvram set wl_amsdu="auto"
	nvram set wl_key2="1234567890"
	nvram set wl_key3="1234567890"
	nvram set wl_country_code="US"
	nvram set wl_key4="1234567890"
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
	nvram set wl_radio_pwrsave_pps="10"
	nvram set wl_acs_cs_scan_timer="900"
	nvram set wl_acs_tx_idle_cnt="5"
	nvram set wl_intfer_txbad=""
	nvram set wl_intfer_swindow=""
	nvram set wl_rateset="default"
	nvram set wl_crypto="tkip+aes"
	nvram set wl_acs_chan_flop_period="30"
	nvram set wl_radius_key=""
	nvram set wl_acs_fcs_mode="0"
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
	nvram set wl_wep="disabled"
	nvram set wl_intf_drate="0"
	nvram set wl_gmode_protection="auto"
	nvram set wl_frag="2346"
	nvram set wl_preauth=""
	nvram set wl_maclist=""
	nvram set wl_rifs=""
	nvram set wl_bcn_rotate="1"
	nvram set wl_ure="0"
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
	nvram set wl_radio_pwrsave_quiet_time="1800"
	nvram set wl_rts="2346"
	nvram set wl_ap_isolate="0"
	nvram set wl_country_rev="0"
	nvram set wl_txchain="15"
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
}

init_nvram_power_for_AX90() {
	# added by jiangzheyu, for 5G2 ch100-112 20in80 power is 2dBm lower
	pro_id=`getfirm PRODUCT_ID`
	if [ $pro_id = "66000001" ]; then
		nvram kset 2:pdoffset20in80m5gb2=0x779C
		nvram kset 2:pdoffset20in80m5gcore3=0x7400

		# change default nvram setting as HW team required
		nvram kset 0:paprdis=1
		nvram kset 0:spurcan_CoreMask=3
		nvram kset 0:dacdiv10_2g=1
		nvram kset 1:spurcan_CoreMask=3
		nvram kset 2:tempthresh=150

		# Stay on bw160 when bw80 station connected
		for idx in 0 1 2; do
			nvram set wl${idx}_bw_switch_160="1"
		done
	fi
}

wifi_nvram_default_restore() {
	init_nvram_wps
	init_nvram_radio
	init_nvram_router
	init_nvram_wl
	init_nvram_mac
	#add by zhangshengbo
	init_nvram_wifi_start
	init_nvram_power_for_AX90
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
				if [ "$countrycode" = "DE" ]; then
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
				if [ "$countrycode" = "DE" ]; then
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
				if [ "$countrycode" = "DE" ]; then
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
	local home_vif=""
	local wds_vif=""
	local vif=""
	local tmpCode=""
	echo "=====>>>>> $dev: wifi_basic_config" >$STDOUT

	config_get country $dev country
	config_get band $dev band
	config_get hwmode $dev hwmode
	config_get htmode $dev htmode
	config_get channel $dev channel
	config_get mu_mimo $dev mu_mimo
	echo "=====>>>>> $dev: hwmode is $hwmode, htmode is $htmode" >$STDOUT

	config_get_bool wifi_disabled $dev disabled
	if [ "$wifi_disabled" = "0" ]; then
		config_get vifs $dev vifs
		for vif in $vifs; do # vifs is wl01/wl02/wl03, home/guest/wds
			config_get_bool enable $vif enable
			config_get mode $vif mode
			config_get guest $vif guest
			config_get backhaul $vif backhaul
			if [ "$enable" = "1" -a "$mode" = "ap" -a -z "$guest" -a -z "$backhaul" ]; then
				eth_enable="1"
				home_vif=$vif
				echo "=====>>>>> $dev: HOME WIFI is on" >$STDOUT
			elif [ "$enable" = "1" -a "$mode" = "sta" ]; then
				eth_enable="1"
				wds_enable="1"
				#get dwds mode
				config_get dwds_mode $vif dwds_mode
				wds_vif=$vif
				echo "=====>>>>> $dev: WDS is on" >$STDOUT
			else
				echo "=====>>>>> $dev: vif $vif is disabled or $vif is a guest/backhaul network" >$STDOUT
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
		;;
	esac

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
	elif [ "$tmpCode" = "AU" ]; then
		nvram set ${HOME_WIFI}_country_code="$tmpCode"
		nvram set ${HOME_WIFI}_country_rev="$COUNTRYCODE_AU"
	else
		nvram set ${HOME_WIFI}_country_code="$country"
		nvram set ${HOME_WIFI}_country_rev="$tmpCode"
	fi

	if [ "$eth_enable" = "1" ]; then
		config_get ssid $vif ssid
		nvram set ${HOME_WIFI}_ssid="$ssid"

		#Add for Evalulate,CC Code: US/1
		local evaluate_flag=`nvram get modelflags`
		if [ "$evaluate_flag" = "1" ]; then
			nvram set ${HOME_WIFI}_country_code="US"
			nvram set ${HOME_WIFI}_country_rev="1"
		fi

		#set ax mode
		#* HE features bitmap.
		#* Bit 0:		HE 5G support
		#* Bit 1:		HE 2G support
		#* Bit 2:		HE DL-OFDMA support
		#* Bit 3:		HE DL-OFDMA support
		#* Bit 4:		HE MU-MIMO
		local ofdma="off"
		ofdma=`uci get wireless.ofdma.enable`
		if [ "$hwmode" = "11ax" -o "$hwmode" = "11ax_5" -o "$hwmode" = "11bgnax" -o "$hwmode" = "11anacax" ]; then
			if [ "$ofdma" = "on" ]; then
				if [ "$mu_mimo" = "on" ]; then
					nvram set ${HOME_WIFI}_he_features="-1"
				else
					nvram set ${HOME_WIFI}_he_features="15"
				fi
			else
				if [ "$mu_mimo" = "on" ]; then
					nvram set ${HOME_WIFI}_he_features="19"
				else
					nvram set ${HOME_WIFI}_he_features="3"
				fi
			fi
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
		if [ "$band" = "5g" -a "$wds_enable" = "1" -a "$dwds_mode" != "ap" ]; then
			nvram set ${HOME_WIFI}_chanspec="0"
		elif [ "$band" = "5g_2" -a "$wds_enable" = "1" -a "$dwds_mode" != "ap" ]; then
			nvram set ${HOME_WIFI}_chanspec="0"
		else
			nvram set ${HOME_WIFI}_chanspec="$chanspec"
		fi

		#for ax90 :5G1 disable band2/3/4; 5G2 disable band1/2
		#dis_ch_grp:bit 0-ch36-48; bit 1-ch52-60; bit2-ch64; bit3-ch100-140; bit4-ch149-165
		#local triband=$(uci get profile.@wireless[0].support_triband -c /etc/profile.d)
		#if [ "$triband" = "yes" ]; then
		#	case $band in
		#		5g)
		#			nvram kset 1:dis_ch_grp=0x1e
		#		;;
		#		5g_2)
		#			nvram kset 2:dis_ch_grp=0x7
		#		;;
		#	esac
		#fi

		# set radio
		nvram set ${HOME_WIFI}_radio="1"
		nvram set ${HOME_WIFI}_ifname=${HOME_WIFI}

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
	echo "=====>>>>> $dev: wifi_security_config" >$STDOUT

	config_get_bool wifi_disabled $dev disabled
	if [ "$wifi_disabled" = "0" ]; then
		config_get vifs $dev vifs
		for vif in $vifs; do # vifs is wl01/wl02/wl03, home/guest/wds
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
				echo "=====>>>>> $dev: WDS is on" >$STDOUT
			else
				echo "=====>>>>> $dev: vif $vif is disabled or $vif is a guest/backhaul network" >$STDOUT
			fi
		done
	fi

	config_get band $dev band
	
	#DWDS
	config_get dwds_mode $vif dwds_mode
	
	case $band in
		2g)
			if [ "$wds_enable" = "1" -a "$dwds_mode" != "ap" ]; then
				vif="$home_vif"
				WIFI_PRE="wl1.1"
			else
				vif="$home_vif"
				WIFI_PRE="wl1"
			fi
		;;
		5g)
			if [ "$wds_enable" = "1" -a "$dwds_mode" != "ap" ]; then
				vif="$home_vif"
				WIFI_PRE="wl2.1"
			else
				vif="$home_vif"
				WIFI_PRE="wl2"
			fi
		;;
		5g_2)
			if [ "$wds_enable" = "1" -a "$dwds_mode" != "ap" ]; then
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
		config_get hwmode $dev hwmode
		echo "=====>>>>> $dev: $vif, encryption $encryption, psk_version $psk_version, psk_cipher $psk_cipher" >$STDOUT
		close11N="0"

		if [ -z "$WIFI_PRE" ]; then
			echo "=====>>>>> $dev: dont set security for vif $vif" >$STDOUT
		else
			if [ "$encryption" == "none" ]; then
				nvram set ${WIFI_PRE}_preauth=""
				nvram set ${WIFI_PRE}_wep="disabled"
				nvram set ${WIFI_PRE}_auth="0"
				nvram set ${WIFI_PRE}_akm="open"
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

	[ -z "$sysmode" ] && sysmode="router"
	[ -z "$onemesh_enable" ] && onemesh_enable="on"
	if [ "$wifi_disabled" = "0" ]; then
		config_get vifs $dev vifs
		for vif in $vifs; do # vifs is wl01/wl02/wl03, home/guest/wds
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
				echo "=====>>>>> $dev: WDS is on" >$STDOUT
			else
				echo "=====>>>>> $dev: vif $vif is disabled or $vif is a guest/backhaul network" >$STDOUT
			fi
		done
	fi

	case $band in
		2g)
			if [ "$wds_enable" = "1" ]; then
				vif="$home_vif"
				HOME_WIFI="wl1"
			else
				vif="$home_vif"
				HOME_WIFI="wl1"
			fi
		;;
		5g)
			if [ "$wds_enable" = "1" ]; then
				vif="$home_vif"
				HOME_WIFI="wl2"
			else
				vif="$home_vif"
				HOME_WIFI="wl2"
			fi
		;;
		5g_2)
			if [ "$wds_enable" = "1" ]; then
				vif="$home_vif"
				HOME_WIFI="wl0"
			else
				vif="$home_vif"
				HOME_WIFI="wl0"
			fi
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

		#only 5g support zero-wait dfs
		if [ "$band" = "5g" -o "$band" = "5g_2" ]; then
			config_get_bool zerowait_dfs $dev zerowait_dfs
			nvram set ${HOME_WIFI}_acs_bgdfs_enab="$zerowait_dfs"
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

	if [ "$wifi_disabled" = "0" -a "$disabled_all" = "0" -a "$wds_enable" = "1" ]; then
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
			if [ "$enable" = "1" -a "$mode" = "ap" -a -z "$guest" -a -z "$backhaul" ]; then
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

		for idx in `seq 2 3`; do
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
		nvram set ${vap_name}_bss_maxassoc="256"
		nvram set ${vap_name}_wmf_bss_enable="1"
	else
		vap_name="${WIFI_PRE}.1"
		nvram set ${vap_name}_radio="0"
		nvram set ${vap_name}_bss_enabled="0"
		nvram unset ${vap_name}_unit
		nvram unset ${vap_name}_ifname
		for idx in `seq 1 3`; do
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

		for idx in `seq 2 3`; do
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
		for idx in `seq 1 3`; do
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

		for idx in `seq 2 3`; do
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
		for idx in `seq 1 3`; do
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

# Jiangzheyu@tp-link.com.cn 2020-01-15
# Add backhaul for one-mesh
wifi_backhaul_addif() {
	echo "=====>>>>> band[$band]: wifi_backhaul_addif" >$STDOUT
	local band="$1"
	local brname
	get_brname brname

	case $band in
		2g)
			WIFI_BACKHAUL="wl1.2"
			vif="wl14"
		;;
		5g)
			WIFI_BACKHAUL="wl2.2"
			vif="wl24"
		;;
		5g_2)
			WIFI_BACKHAUL="wl0.2"
			vif="wl04"
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
	local hvlan=$((0x7)) gvlan=0
	get_brname brname
	for band in "2g" "5g" "5g_2"; do
		case $band in
			2g)
				WIFI_BACKHAUL="wl1.2"
				vif="wl14"
			;;
			5g)
				WIFI_BACKHAUL="wl2.2"
				vif="wl24"
			;;
			5g_2)
				WIFI_BACKHAUL="wl0.2"
				vif="wl04"
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
			WIFI_DEV="wl2"
			WIFI_BACKHAUL="wl2.2"
			WIFI_UNIT="2.2"
			vif="wl24"
		;;
		5g_2)
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
		nvram set ${WIFI_BACKHAUL}_bss_maxassoc="256"

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
		if [ "$cur_mode" = "ap" ]; then
			child_vifs_tmp="`nvram get ${WIFI_DEV}_vifs`"
			nvram set ${WIFI_DEV}_vifs="${child_vifs_tmp} ${WIFI_BACKHAUL}"
		fi
		#END    2019-6-17

   		br0_ifnames_tmp="`nvram get br0_ifnames`"
		echo ${br0_ifnames_tmp} | grep -q ${WIFI_BACKHAUL} || nvram set br0_ifnames="${br0_ifnames_tmp} ${WIFI_BACKHAUL}"
		lan_ifnames_tmp="`nvram get lan_ifnames`"
		echo ${lan_ifnames_tmp} | grep -q ${WIFI_BACKHAUL} || nvram set lan_ifnames="${lan_ifnames_tmp} ${WIFI_BACKHAUL}"
	fi
}

wifi_onemesh_config() {
	echo "=====>>>>> wifi_onemesh_config" >$STDOUT
	local mode=`uci get sysmode.sysmode.mode`
	local smart_enable=`uci get wireless.smart.smart_enable`
	config_get onemesh_enable onemesh enable "on"

	for dev in ${DEVICES}; do
		config_get band $dev band
		config_get vifs $dev vifs

		case $band in
		2g)
			HOME_WIFI="wl1"
			BACKHAUL_WIFI="wl1.2"
			GUEST_WIFI="wl1.3"
		;;
		5g)
			HOME_WIFI="wl2"
			BACKHAUL_WIFI="wl2.2"
			GUEST_WIFI="wl2.3"
		;;
		5g_2)
			HOME_WIFI="wl0"
			BACKHAUL_WIFI="wl0.2"
			GUEST_WIFI="wl0.3"
		;;
		esac

		for vif in $vifs;do
			echo "=====>>>>> set tp_ie" >$STDOUT
			config_get onemesh_ie $vif onemesh_ie "on"
			config_get gp_id_rand onemesh group_id

			tpie_hw_mac=`uci show network|grep macaddr|sed -n '3p'|awk '{print $2}' -F '='` #LAN MAC as TPIE_MAC
			tpie_mac=${tpie_hw_mac//:/}
			random_suffix="5789"

			gp_id_rand=${gp_id_rand:0:4}
			gp_id_rand="${gp_id_rand:0:2}${gp_id_rand:2:2}"
			[ -n "$gp_id_rand" ] && random_suffix=$gp_id_rand

			# set TP IE and dwds_brcm_ie_filter
			# dwds_brcm_ie_filter 1: only BRCM STA can associate in the form of 4 addrs
			# dwds_brcm_ie_filter 0: skip the judgement
			if [ "$onemesh_ie" = "on" -a "$onemesh_enable" = "on" ]; then
				# HOME WIFI
				[ "$vif" = "wl01" -o "$vif" = "wl11" -o "$vif" = "wl21" ] && {
					wl -i ${HOME_WIFI} add_ie 3 30 00:1d:0f 1001030000${tpie_mac}${tpie_mac}${random_suffix}0000${tpie_mac:8:4}00010000
					echo "=====>>>>>  wl -i ${HOME_WIFI} add_ie 3 30 00:1d:0f 1001030000${tpie_mac}${tpie_mac}${random_suffix}0000${tpie_mac:8:4}00010000" >$CONSOLE
					wl -i ${HOME_WIFI} dwds_brcm_ie_filter 0
					echo "=====>>>>>  wl -i ${HOME_WIFI} dwds_brcm_ie_filter 0" >$CONSOLE
				}
				# BACKHAUL WIFI
				[ "$vif" = "wl04" -o "$vif" = "wl14" -o "$vif" = "wl24" ] && {
					wl -i ${BACKHAUL_WIFI} add_ie 3 30 00:1d:0f 1001070000${tpie_mac}${tpie_mac}${random_suffix}0000${tpie_mac:8:4}00010000
					echo "=====>>>>>  wl -i ${BACKHAUL_WIFI} add_ie 3 30 00:1d:0f 1001070000${tpie_mac}${tpie_mac}${random_suffix}0000${tpie_mac:8:4}00010000" >$CONSOLE
					wl -i ${BACKHAUL_WIFI} dwds_brcm_ie_filter 0
					echo "=====>>>>>  wl -i ${BACKHAUL_WIFI} dwds_brcm_ie_filter 0" >$CONSOLE
					# disable the BSS Transition Bit in Extended Capabilities of beacon/probe resp/assoc resp.
					wl -i ${BACKHAUL_WIFI} wnm 0
				}
			else
				# HOME WIFI
				[ "$vif" = "wl01" -o "$vif" = "wl11" -o "$vif" = "wl21" ] && {
					[ "$onemesh_ie" = "on" ] && {
						wl -i ${HOME_WIFI} del_ie 3 30 00:1d:0f 1001030000${tpie_mac}${tpie_mac}${random_suffix}0000${tpie_mac:8:4}00010000
						echo "=====>>>>>  wl -i ${HOME_WIFI} del_ie 3 30 00:1d:0f 1001030000${tpie_mac}${tpie_mac}${random_suffix}0000${tpie_mac:8:4}00010000" >$CONSOLE

						# check TPIE is deleted
						del_ie_check=`wl -i ${HOME_WIFI} list_ie|grep 00:1d:0f`
						[ -n "$del_ie_check" ] && echo "=====>>>>> ERROR! ${HOME_WIFI} TPIE remained after deleting!">$CONSOLE
					}
				}
			fi

			# for HOME WIFI, enable Dynamic Neighbor Report , or our nerghbor report response will be empty.
			[ "$vif" = "wl01" -o "$vif" = "wl11" -o "$vif" = "wl21" ] && {
				# enable dynamic nerghbor report
				wl -i ${HOME_WIFI} rrm_nbr_scan 1
			}

			# for GUEST WIFI, disable the BSS Transition Bit in Extended Capabilities of beacon/probe resp/assoc resp.
			[ "$vif" = "wl02" -o "$vif" = "wl12" -o "$vif" = "wl22" ] && {
				wl -i ${GUEST_WIFI} wnm 0
			}

			# smart connect needs wnm too
			[ "$mode" != "router" -o "$onemesh_enable" != "on" ] && {
				[ "$smart_enable" != "on" ] && {
					# disable the BSS Transition Bit in Extended Capabilities
					wl -i ${HOME_WIFI} wnm 0
				}
			}
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

# lizhou@tp-link.com.cn    2019-6-17
# note: merge from AX6000, add wet mode
wifi_wet_config() {
	local dev="$1"
	config_get vifs $dev vifs
	local eth_enable="0"
	local guest_enable="0"
	local backhaul_enable="0"
	local wet_enable="0"
	local wet_vif=""
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
				wet_enable="1"
				wet_vif="$vif"
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

	if [ "$eth_enable" = "1" -a "$wet_enable" = "1" ]; then
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
			nvram set ${WIFI_PRE}_akm="psk psk2 psk2ft"
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
		nvram unset ${WIFI_PRE}_vifs
		nvram set ${WIFI_PRE}_wps_oob="disabled"
		nvram set ${WIFI_PRE}_ap_isolate="0"
		br0_ifnames_tmp="`nvram get br0_ifnames`"
		echo ${br0_ifnames_tmp} | grep -q ${WIFI_PRE}.1 || nvram set br0_ifnames="$br0_ifnames_tmp ${WIFI_PRE}.1"
		lan_ifnames_tmp="`nvram get lan_ifnames`"
		echo ${lan_ifnames_tmp} | grep -q ${WIFI_PRE}.1 || nvram set lan_ifnames="$lan_ifnames_tmp ${WIFI_PRE}.1"

		for idx in `seq 2 3`; do
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
		for idx in `seq 1 3`; do
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
#END    2019-6-17

wifi_guest_config() {
	local dev="$1"
	local close11N
	local vif=""
	local eth_enable="0"
	local guest_enable="0"
	local backhaul_enable="0"
	local wds_enable="0"
	local guest_vif=""
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
			if [ "$enable" = "1" -a "$mode" = "ap" -a -z "$guest" ]; then
				eth_enable="1"
			elif [ "$mode" = "ap" -a "$guest" = "on" ]; then
				eth_enable="1"
				guest_enable="1"
				guest_vif="$vif"
			elif [ "$mode" = "ap" -a "$backhaul" = "on" ]; then
				eth_enable="1"
				backhaul_enable="1"
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
			GUEST_WIFI="wl2.3"
			WIFI_DEV="wl2"
			WIFI_UNIT="2.3"
		;;
		5g_2)
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

		local max_sta=64
		if [ "$band" = "2g" -o "$band" = "5g" -o "$band" = "5g_2"  ]; then
			max_sta=$(uci get profile.@wireless[0].max_sta_number_$band -c /etc/profile.d)
		fi
		nvram set ${WIFI_DEV}_cfg_maxassoc="$max_sta"
		nvram set ${WIFI_DEV}_bss_maxassoc="$max_sta"
		nvram set ${GUEST_WIFI}_bss_maxassoc="$max_sta" #need to check guestNet num

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
		
		#lizhou@tp-link.com.cn    2019-6-17
		#if in WDS mode,do not set vifs
		local cur_mode=`nvram get ${WIFI_DEV}_mode`
		if [ "$cur_mode" = "ap" ]; then
			nvram set ${WIFI_DEV}_vifs="${GUEST_WIFI}"
		fi
		#END    2019-6-17
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
	local dev="$1"
	local vif=""
	config_get_bool wifi_disabled $dev disabled       #hardware switch
	config_get_bool soft_disabled $dev disabled_all   #software switch
	if [ "$wifi_disabled" = "0" -a "$soft_disabled" = "0" ]; then
		config_get vifs $dev vifs
		for vif in $vifs; do
			config_get_bool enable $vif enable
			config_get onemesh_ie $vif onemesh_ie
			config_get mode $vif mode
			config_get backhaul $vif backhaul
			if [ "$mode" = "ap" -a "$onemesh_ie" = "on" -a "$enable" != "1" -a "$backhaul" = "on" ]; then
				config_get band $dev band
				case $band in
					2g)
						BACKHAUL_WIFI="wl1.2"
					;;
					5g)
						BACKHAUL_WIFI="wl2.2"
					;;
					5g_2)
						BACKHAUL_WIFI="wl0.2"
					;;
				esac
				echo "=====>>>>> wifi_backhaul_switch $dev: vif $vif is disabled, do bss down on $BACKHAUL_WIFI" >$STDOUT
				wl -i $BACKHAUL_WIFI bss down
			elif [ "$mode" = "ap" -a "$onemesh_ie" = "on" -a "$enable" = "1" -a "$backhaul" = "on" ]; then
				config_get band $dev band
				case $band in
					2g)
						BACKHAUL_WIFI="wl1.2"
					;;
					5g)
						BACKHAUL_WIFI="wl2.2"
					;;
					5g_2)
						BACKHAUL_WIFI="wl0.2"
					;;
				esac
				echo "=====>>>>> wifi_backhaul_switch $dev: vif $vif is enabled, do bss up on $BACKHAUL_WIFI" >$STDOUT
				wl -i $BACKHAUL_WIFI bss up
			fi
			
		done
	fi
}

wifi_guest_switch() {
	local dev="$1"
	local vif=""
	config_get_bool wifi_disabled $dev disabled       #hardware switch
	config_get_bool soft_disabled $dev disabled_all   #software switch
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
						GUEST_WIFI="wl2.3"
					;;
					5g_2)
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
						GUEST_WIFI="wl2.3"
					;;
					5g_2)
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
	else
		nas
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
	local btntestflag=`nvram kget btntestflag`
	nvram set acs_ifnames="${DEVICES}"
	if [ "$rftestflag" = "1" -a "$btntestflag" = "1" ]; then
		acsd2
	fi
	#utelnetd -d -i br-lan&
}

start_dhd_monitor(){
    mkdir -p /tmp/crash_logs
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
	killall -9 nrd
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
		config_get_bool wifi_disabled $dev disabled
		if [ "$wifi_disabled" = "0" ]; then
			config_get vifs "$dev" vifs
			config_get band "$dev" band
			config_get mac_$band "$dev"  macaddr
			for vif in $vifs; do
				config_get ifname "$vif" ifname
				config_get enable "$vif" enable
				config_get guest  "$vif" guest
				config_get backhaul  "$vif" backhaul
				config_get mode   "$vif" mode

				if [ "$mode" = "ap" ] && [ -z "$guest" ] && [ -z "$backhaul" ]; then
					eval "vap0_$band"="$ifname"
					eval "home_$band"="$enable"
				elif [ "$mode" = "ap" ] && [ ! -z "$guest" ]; then
					eval "vap1_$band"="$ifname"
					eval "guest_$band"="$enable"
				elif [ "$mode" = "ap" ] && [ ! -z "$backhaul" ]; then
					eval "vap2_$band"="$ifname"
					eval "backhaul_$band"="$enable"
				elif [ "$mode" = "sta" ] ; then
					eval "bridge_$band"="$enable"
				else
					echo "ERROR: bad if type." >$CONSOLE
				fi
			done
		else
			# wifi disable by "HW BTN" or "Wireless Schdule"
			# each interface is set to off
			local ifcount=0
			config_get vifs "$dev" vifs
			config_get band "$dev" band
			config_get mac_$band "$dev"  macaddr
			for vif in $vifs; do
				config_get ifname "$vif" ifname
				ifcount=`ifconfig | grep $ifname -c`
				if [ $ifcount -gt 0 ]; then
					# this interface is exit
					config_get guest  "$vif" guest
					config_get backhaul  "$vif" backhaul
					config_get mode   "$vif" mode

					if [ "$mode" = "ap" ] && [ -z "$guest" ] && [ -z "$backhaul" ]; then
						eval "vap0_$band"="$ifname"
						eval "home_$band"="off"
					elif [ "$mode" = "ap" ] && [ ! -z "$guest" ]; then
						eval "vap1_$band"="$ifname"
						eval "guest_$band"="off"
					elif [ "$mode" = "ap" ] && [ ! -z "$backhaul" ]; then
						eval "vap2_$band"="$ifname"
						eval "backhaul_$band"="off"
					elif [ "$mode" = "sta" ] ; then
						eval "bridge_$band"="off"
					else
						echo "ERROR: bad if type." >$CONSOLE
					fi
				fi
			done
		fi
	done
}

wifi_start_rftest(){
	local app_name="rftest-triband"
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
	#/etc/init.d/telnet start
	#wifi_insmod_dhd_test
	#wifi_start_rftest
	killall rftest-triband
	rftest-triband -n&
}

wifi_sys_led_flick(){
	#added by zhangshengbo
	local lp5523_flag=$(uci get profile.@lp5523[0].message -c /etc/profile.d)
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
	else
	hz=1		#flick 1 times per second
	sleeptime=`expr 1000000 / $hz / 2`
	while true
	do
		ledcli RFWARNING
		usleep $sleeptime
	done
	fi
}

wifi_driver_startup(){
	echo "=====>>>>> wifi_driver_startup" >$STDOUT
	
	local module_name_4366
	local module_name_4360
	local firmware_path=""
	local firmware_path0_in_nvram=""
	local firmware_path1_in_nvram=""

	local rftestflag=`nvram kget rftestflag`
	local btntestflag=`nvram kget btntestflag`
	# NIC MODE "No dhd.ko"
	# DONGLE MODE "insmod dhd.ko"
	if [ "$rftestflag" = "1" -a "$btntestflag" = "1" ]; then
		echo "=====>>>>> dongle firmware_path is normal" >$CONSOLE	
		#for t10 button dection
		echo 1 >/proc/rftestflag_file
		
		module_name_4366="dhd"
		module_name_4360="wl"
		grep -q '^'$module_name_4366'\>' /proc/modules || insmod $module_name_4366 iface_name=wl dhd_console_ms=250 instance_base=0
		grep -q '^'$module_name_4366'\>' /proc/modules || echo "insmod dhd.ko failed." >$CONSOLE ;
		grep -q '^'$module_name_4360'\>' /proc/modules || insmod $module_name_4360 intf_name=wl%d instance_base=1
		grep -q '^'$module_name_4360'\>' /proc/modules || echo "insmod wl.ko failed." >$CONSOLE ;
	else
		echo "=====>>>>> dongle firmware_path is wltest" >$CONSOLE
		echo 0 >/proc/rftestflag_file
		#cp -s -f /lib/tp/rtecdc_43684a0.bin /etc/wlan/dhd/43684a0/rtecdc.bin
		cp -s -f /lib/tp/rtecdc_43684b0.bin /etc/wlan/dhd/43684b0/rtecdc.bin

		#rmmod useless ko for enough memory
		/etc/init.d/url_class stop
		/etc/init.d/parental_control stop
		rmmod xt_pctl.ko
		rmmod blockingx.ko
		rmmod thfsplus.ko
		rmmod tntfs.ko
		rmmod tfat.ko

		# insmod wltest hnd.ko first
		rmmod igs
		rmmod emf
		rmmod hnd
		insmod /lib/tp/hnd.ko
		insmod emf
		insmod igs

		# insmod wltest dhd.ko and wl.ko
		module_name_4366="/lib/tp/dhd.ko"
		module_name_4360="/lib/tp/wl.ko"
		grep -q '^'$module_name_4366'\>' /proc/modules || insmod $module_name_4366 iface_name=wl dhd_console_ms=250 instance_base=0
		grep -q '^'$module_name_4366'\>' /proc/modules || echo "insmod wltest dhd.ko failed." >$CONSOLE ;
		grep -q '^'$module_name_4360'\>' /proc/modules || insmod $module_name_4360 intf_name=wl%d instance_base=1
		grep -q '^'$module_name_4360'\>' /proc/modules || echo "insmod wltest wl.ko failed." >$CONSOLE ;
		
		#check insmod wltest ko ok or not
		dhd_isinsmod=$( lsmod | grep dhd )
		wl_isinsmod=$( lsmod | grep wl )
		while [ "$dhd_isinsmod" == "" ] || [ "$wl_isinsmod" == "" ]
		do
			echo "insmode wltest wl.ko or dhd.ko failed!!try again..." >/dev/console
			insmod $module_name_4366 iface_name=wl dhd_console_ms=250 instance_base=0
			insmod $module_name_4360 intf_name=wl%d instance_base=1
			sleep 1
			dhd_isinsmod=$( lsmod | grep dhd )
			wl_isinsmod=$( lsmod | grep wl )
		done
	fi
	wifi_features_set
	#execute wifi_features_set in  wifi_insmod_dhd_test when not calibrated
	#set features before rftest
}

wifi_features_set(){
	local rftestflag=`nvram kget rftestflag`
	local btntestflag=`nvram kget btntestflag`
	config_get onemesh_enable onemesh enable "on"

	# get bridge name
	get_brname brname

	# get if and status
	get_if_var
	nvram unset acs_ifnames
	for dev in ${1:-$DEVICES}; do
		config_get band "$dev" band
		
		if [ "$WIFI_SCHEDULE" = "1" ]; then
			wireless_schedule_disable_wifi "$band" && continue
		fi
		eval local vap0=\${vap0_$band} vap1=\${vap1_$band}
		eval local home=\${home_$band} guest=\${guest_$band} bridge=\${bridge_$band}
		eval local mac=\${mac_$band}
		#echo "DEBUG:" $band $vap0 $vap1 $home $guest $bridge >$STDOUT
		
		#set features that can only use wl cmds
		if [ "$home" = "on" ]; then 
			# set he
			wl -i "$vap0" he 1
			
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

			wlconf "$vap0" up
			ifconfig "$vap0" up
			brctl addif "$brname" "$vap0"
			
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
			
			#if [ "$band" = "2g" ]; then
				# set phy_ed_thresh(cca) for 2g, default(-69)
				#wl -i "$vap0" phy_ed_thresh -63 # reduce interference from usb 3.0
			#fi

			# 2.4G txcore CCK=0x1 in 18.2_EA4, so we must set it to 0xf
			if [ "$band" = "2g" ]; then
				wl -i "$vap0" txcore -k 0xf
			fi

			# wds bridge
			if [ "$bridge" = "on" ]; then 
				#format xx:xx:xx:xx:xx:xx 
				ifconfig $vap1 hw ether ${mac//-/:}
				brctl addif "$brname" $vap1
				ifconfig "$vap1" up
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
			
			#tp guest mac rule differs from bcm rule(in wlconf)
			#so that ifconfig guest mac is different from wl status mac
			#keep the same rule with bcm
			ifconfig $vap1 hw ether $(nvram get ${vap1}_hwaddr)
			ifconfig "$vap1" up 
			brctl addif "$brname" "$vap1" 
			
			# backhaul network
			if [ "$rftestflag" = "1" -a "$btntestflag" = "1" -a "$onemesh_enable" = "on" ]; then
				wifi_backhaul_addif $band
			fi

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

	#start programs
	start_service 

	#for band in "2g" "5g" "5g_2"; do
	for dev in ${1:-$DEVICES}; do
		config_get band "$dev" band
		
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
	
	if [ "$rftestflag" = "1" -a "$btntestflag" = "1" -a "$onemesh_enable" = "on" ]; then
		wifi_backhaul_addvlan
	fi
	
	if [ "$rftestflag" = "1" -a "$btntestflag" = "1" -a "$onemesh_enable" = "on" ]; then
		for dev in ${1:-$DEVICES}; do
			config_get band "$dev" band
			eval local vap0=\${vap0_$band}
			wifi_backhaul_switch $vap0
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

	#for band in "5g_2" "2g" "5g"; do
	for dev in ${1:-$DEVICES}; do
		config_get band "$dev" band

		eval local vap0=\${vap0_$band} vap1=\${vap1_$band}
		eval local home=\${home_$band} guest=\${guest_$band} bridge=\${bridge_$band}
		eval local mac=\${mac_$band}


		# reset dongle
		if [ ! -z "$vap0" ]; then
			wl -i "$vap0" reboot -2 > /dev/null
		fi

		for ifd in "$vap0" "$vap1"; do 
			ifconfig "$ifd" down
			brctl delif "$brname" "$ifd" 
			wlconf "$ifd" down
		done

		if [ ! -z "$vap1" ]; then
			#TODO set only for wds ?
			ifconfig "$vap1" hw ether $(fix_vif_mac $mac "stop")
		fi
	done

	# stop programs
	# kill hostapd after `wlconf down`, or the dwds interface may end abnormally
	stop_service

	#only for AC2300, hardware button pressing don't rmmod wl.ko & dhd.ko,so just down all the interface & remove them from br-lan
	#for ifd in "wl0" "wl0.1" "wl1" "wl1.1" "wl2" "wl2.1"; do
	#		wlconf "$ifd" down
	#		ifconfig "$ifd" down
	#		brctl delif "br-lan" "$ifd" 
	#done

	# rmmod dhd.ko & wl.ko
	#local module_name_4366=dhd
	#local module_name_4360=wl
	#grep -q '^'$module_name_4366'\>' /proc/modules && rmmod $module_name_4366 
	#grep -q '^'$module_name_4360'\>' /proc/modules && rmmod $module_name_4360

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
	local BandSteering_enable="off"
	local encryption_2g encryption_5g encryption_5g2
	local key_2g key_5g key_5g2
	local ssid_2g ssid_5g ssid_5g2
	local enable_2g enable_5g enable_5g2
	local ifname_2g ifname_5g ifname_5g2
	
	# Get home wifi interface name
	for dev in ${DEVICES}; do 
		config_get band $dev band

		case $band in
			2g)
				ifname_2g="wl11"
			;;
			5g)
				ifname_5g="wl21"
			;;
			5g_2)
				ifname_5g2="wl01"
			;;
		esac
	done
	
	config_load wireless
	config_get ssid_2g $ifname_2g ssid
	config_get ssid_5g $ifname_5g ssid
	[ -n $ifname_5g2 ] && config_get ssid_5g2 $ifname_5g2 ssid

	config_get encryption_2g $ifname_2g encryption
	config_get encryption_5g $ifname_5g encryption
	[ -n $ifname_5g2 ] && config_get encryption_5g2 $ifname_5g2 encryption

	config_get key_2g $ifname_2g psk_key
	config_get key_5g $ifname_5g psk_key
	[ -n $ifname_5g2 ] && config_get key_5g2 $ifname_5g2 psk_key

	config_get enable_2g $ifname_2g enable
	config_get enable_5g $ifname_5g enable
	[ -n $ifname_5g2 ] && config_get enable_5g2 $ifname_5g2 enable

	# Band steering is ON, only when at least one 5G interface's
	# SSID, encryption and key is the same as 2.4G.
	if [ "$enable_5g" = "on" -a "$ssid_2g" = "$ssid_5g" -a "$encryption_2g" = "$encryption_5g" ]; then
		if [ "$encryption_2g" = "none" -a "$encryption_5g" = "none" ] || [ "$key_2g" = "$key_5g" ]; then
			BandSteering_enable="on"
		fi
	fi

	if [ "$enable_5g2" = "on" -a "$ssid_2g" = "$ssid_5g2" -a "$encryption_2g" = "$encryption_5g2" ]; then
		if [ "$encryption_2g" = "none" -a "$encryption_5g2" = "none" ] || [ "$key_2g" = "$key_5g2" ]; then
			BandSteering_enable="on"
		fi	
	fi

	nvram set bsd_role="3"
	#use bsd rules in the bsd src code
	nvram unset bsd_ifnames

	if [ "${BandSteering_enable}" = "on" ]; then
	    stop_bsd
	    start_bsd
	elif [ "${BandSteering_enable}" = "off" ]; then
	    stop_bsd
	fi

	for idx in `seq 0 2`; do
	   wl -i wl${idx} wnm 1
	done
}

wifi_smart() {
	echo "=====>>>>> wifi_smart()" >$STDOUT
	wifi_smart_config
}


# close advance features for factory test
wifi_factory_close_config() {
	local dev="$1"
	config_get band $dev band
	local HOME_WIFI=""
	case $band in
		2g)
			HOME_WIFI="wl1"
		;;
		5g)
			HOME_WIFI="wl2"
		;;
		5g_2)
			HOME_WIFI="wl0"
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
	local btntestflag=`nvram kget btntestflag`
	config_get onemesh_enable onemesh enable "on"

	for dev in ${DEVICES}; do  # wl0 wl1 wl2
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
		if [ "$rftestflag" = "1" -a "$btntestflag" = "1" ]; then
			wifi_wet_config $dev
			#END    2019-6-17
			wifi_guest_config $dev
			[ "$onemesh_enable" = "on" ] && wifi_backhaul_config $dev
		fi
		wifi_factory_close_config $dev	# the last one
	done
}

wifi_calibrate_data_check() {

	echo "=====>>>>> wifi_calibrate_data_check" >$CONSOLE

	pro_id=`getfirm PRODUCT_ID`
	nvrammanager -r /tmp/par_tbl -p radio_bk
	cal_cbr /tmp/par_tbl "$pro_id" radio_bk
	if [ "$?" = "0" ]; then
        RFTEST=0
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
	local wifi_2g_off=0
	local wifi_5g_off=0
	local wifi_5g2_off=0
	
	#added by zhangshengbo
	local lp5523_flag=$(uci get profile.@lp5523[0].message -c /etc/profile.d)

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
	
		#if [ "$band" == "2g" ] ; then
		#	band="WIFI2G"
		#elif [ "$band" == "5g" ] ; then
		#	band="WIFI5G"
		#fi
		
		# wangxiaolong@tp-link.com.cn
		# 2017/12/17
		
		if [ "$band" = "2g" -a "$led_state" = "OFF" ] ; then
			wifi_2g_off=1
		elif [ "$band" == "5g" -a "$led_state" = "OFF" ] ; then
			wifi_5g_off=1
		elif [ "$band" == "5g_2" -a "$led_state" = "OFF" ]; then
			wifi_5g2_off=1
		fi
		
		#ledcli ${band}_${led_state}
	done
	
	if [ "$wifi_2g_off" = "1" -a "$wifi_5g_off" = "1"  -a "$wifi_5g2_off" = "1" ] ; then
		if [ "$lp5523_flag" == "chip-on" ]; then 
			ubus send leds '{"action" : "2", "status" : "0"}'
		else 
			ledcli WIFI_ALLOFF
		fi
	else
		if [ "$lp5523_flag" == "chip-on" ]; then
			ubus send leds '{"action" : "2", "status" : "1"}'
		else
			ledcli WIFI_NOTALLOFF
		fi
	fi
}

wifi_start_forcecal(){
	#Be careful!
	#Router mode config: factory.factorymode.enable=yes/no
	#AP mode config has no factorymode: factory.factorymode.enable=null
	if [ "$( nvram kget rftestflag )" != "1" ] || [ "$( nvram kget btntestflag )" != "1" ] || [ "$( uci get factory.factorymode.enable )" == "yes" ] ; then
		echo "=====>>>>> NO check_phy_forcecal" >$CONSOLE
	else
		check_phy_forcecal.sh &
	fi
}

wifi_reload() {
	/etc/init.d/minidlna stop
	echo 3 >/proc/sys/vm/drop_caches
	wifi_led_set
	wifi_nvram_config
	wifi_driver_stop
	wifi_driver_startup
	wifi_smart_config
	echo "=====>>>>> wireless setting is finished" >$CONSOLE
	/etc/init.d/minidlna start
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
	
	#add nas check into crontab, fix bug 298545. check nas every 1 min, while do nothing when config wireless on web
	#by zhangshengbo
	#crontab -l >/tmp/cron-conf && echo '*/1 * * * * if [ "$( pgrep nas )" == "" ] && [ "$( ps | grep /sbin/wifi | grep -v grep )" == "" ]; then nas; fi ;' >> /tmp/cron-conf && crontab /tmp/cron-conf 

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
			c5g2l="100"
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
			c5g2l="100"
			c5g2h="165"
			;;
		*)
			echo "in wifi_check, country is not US DE TW or JP" >$STDOUT
			country="unknown"
			;;
	esac
	local wifi_all_down="1"
	local BAND_ALL="2g 5g 5g_2"
	for band in $BAND_ALL; do
		eval local vap0=\${vap0_$band}
		echo "in wifi_check, vap0 is $vap0" >$STDOUT
		
		config_get_bool wifi_disabled $vap0 disabled       #hardware switch
		config_get_bool soft_disabled $vap0 disabled_all   #software switch
		config_get channel $vap0 channel
		
		if [ "$channel" = "auto" -a "$band" = "2g" ]; then
			if [ "$country" = "US" ] || [ "$country" = "TW" ]; then
				c2gl="2"
				c2gh="10"
			fi
		fi
		
		if [ "$wifi_disabled" = "0" -a "$soft_disabled" = "0" ]; then
			local bssid=$( wl -i $vap0 status | grep BSSID | cut -d ':' -f 2-7 | cut -c 2-18 )
			local channel=$( wl -i $vap0 status | grep Primary | cut -d ':' -f 2 | cut -d ' ' -f 2 )
			wifi_all_down="0"
			echo "in wifi_check,bssid now is $bssid,channel now is $channel" >$STDOUT
			
			if [ "$bssid" == "00:00:00:00:00:00" ] || [ "$bssid" == "" ]; then
				echo "bssid error!!!wifi error!!!reload!!!" > /dev/console
				if [ $( nvram kget rftestflag ) == "1" ]; then
					wifi_reload
				else
					echo "rftestflag !=1, return from wifi check!!" >/dev/console
				fi
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
				elif [ "$band" = "5g" ]; then
					if [ "$channel" -gt "$c5g1h" ] || [ "$channel" -lt "$c5g1l" ]; then
						echo "5g channel error!!!reload!!!" > /dev/console
						if [ $( nvram kget rftestflag ) == "1" ]; then
							wifi_reload
						else
							echo "rftestflag !=1, return from wifi check!!" >/dev/console
						fi
						break
					fi
				else
					if [ "$channel" -gt "$c5g2h" ] || [ "$channel" -lt "$c5g2l" ]; then
						echo "5g2 channel error!!!reload!!!" > /dev/console
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
		echo "no acsd or no nas or no eapd!!!!reload!!!" > /dev/console
		if [ $( nvram kget rftestflag ) == "1" ]; then
			wifi_reload
		else
			echo "rftestflag !=1, return from wifi check!!" >/dev/console
		fi
		return
	fi
	
}

wifi_start() {
	wifi_calibrate_data_check
	wifi_driver_startup
	wifi_smart_config
	wifi_start_forcecal

	echo "=====>>>>> wireless setting is finished" >$CONSOLE
	if [ "$( nvram kget rftestflag )" == "1" ] && [ "$( nvram kget btntestflag )" == "1" ]; then
		nvram set wifi_start="1"
	fi
}

# by wifi_init, avoid flags in case of they are committed to nvram by "mistake"
wifi_avoid_facotry_close_config() {
	nvram unset _tp_close_dfs_tmp
	nvram unset _tp_close_txbf_tmp
}

wifi_init() {
	wifi_nvram_default_restore
	#echo 14336 >/proc/sys/vm/min_free_kbytes
	wifi_avoid_facotry_close_config
	init_feature_config
	init_nvram_mac
	wifi_nvram_config
	echo /sbin/hotplug > /proc/sys/kernel/hotplug # config for wds, need to check

	wifi_start &
}
