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
RFTEST_NEED_RUN_FILE=/tmp/rftest_need_run
WIFI_CHECK_RUN_FILE=/tmp/wifi_check_need_run

WIFI_NVRAM_PLUS_FILE_DEFAULT=/tp_data/nvram_plus
WIFI_NVRAM_PLUS_FILE=`nvram get tp_nvram_plus_file`

STDOUT=/dev/null
#DEBUG=1
[ -n "${DEBUG}" ] && STDOUT="/dev/console"
CONSOLE="/dev/console"

NO_EXPORT=1
MACFILTER_ENABLE="off"
MACFILTER_ACTION=""
MAC_LIST=""

state="off"


#
#include file
#
. /lib/wifi/brcm_wlan_var.sh
. /lib/wifi/brcm_wlan_extend.sh


##
## Called by /sbin/wifi
##
init_all_vif_name() {
	echo "init_all_vif_name" >$STDOUT
	echo "DEVICES=${DEVICES}" >$STDOUT
	local temp_band=""
	for dev in ${DEVICES}; do
		echo "dev=${dev}" >$STDOUT
			config_get band "${dev}" band
			config_get vifs "${dev}" vifs
			for vif in $vifs; do
				config_get mode $vif mode
				config_get guest $vif guest
				config_get backhaul $vif backhaul
				config_get ifname $vif ifname
				if [ "$mode" = "ap" -a -z "$guest" -a -z "$backhaul" ]; then
					VIF_HOME=${vif}
					NAME_HOME=${ifname}
				elif [ "$mode" = "ap" -a "$guest" != "" ]; then
					VIF_GUEST=${vif}
					NAME_GUEST=${ifname}
				elif [ "$mode" = "ap" -a "$backhaul" != "" ]; then
					VIF_BACKHAUL=${vif}
					NAME_BACKHAUL=${ifname}
				elif [ "$mode" = "sta" ]; then
					VIF_WDS=${vif}
					NAME_WDS=${ifname}
				else
					echo "=====>>>>> $dev: vif $vif skipped" >$STDOUT
				fi
			done
			case "$band" in
				2g)
					temp_band="2G"
				;;
				5g)
					temp_band="5G"
				;;
				5g_2)
					temp_band="5G2"
				;;
				6g)
					temp_band="6G"
				;;
			esac
			
			eval VIF_HOME_${temp_band}=${VIF_HOME}
			eval VIF_GUEST_${temp_band}=${VIF_GUEST}
			eval VIF_BACKHAUL_${temp_band}=${VIF_BACKHAUL}
			eval VIF_WDS_${temp_band}=${VIF_WDS}
			
			eval NAME_HOME_${temp_band}=${NAME_HOME}
			eval NAME_GUEST_${temp_band}=${NAME_GUEST}
			eval NAME_BACKHAUL_${temp_band}=${NAME_BACKHAUL}
			eval NAME_WDS_${temp_band}=${NAME_WDS}
	done
}

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
	get_wlan_ini FEATURE_BOARDCLUSTER
	get_wlan_ini COUNTRYCODE_DE
	get_wlan_ini COUNTRYREV_DE
	get_wlan_ini COUNTRYCODE_US
	get_wlan_ini COUNTRYREV_US
	get_wlan_ini COUNTRYCODE_CA
	get_wlan_ini COUNTRYREV_CA
	get_wlan_ini COUNTRYCODE_JP
	get_wlan_ini COUNTRYREV_JP
	get_wlan_ini COUNTRYCODE_AS_2G
	get_wlan_ini COUNTRYREV_AS_2G
	get_wlan_ini COUNTRYCODE_AS_5G
	get_wlan_ini COUNTRYREV_AS_5G
	get_wlan_ini COUNTRYCODE_AS_6G
	get_wlan_ini COUNTRYREV_AS_6G
	get_wlan_ini BAND_DIFFCOUNTRY_AS

	echo "wifi_country" >$STDOUT
	local cmd_flag=1

	local eth_enable=""
	local guest_enable=""
	local backhaul_enable=""
	local wds_enable=""
	local ifnames_enabled=""
	local band_diffcountry=""	

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
					HOME_WIFI=${NAME_HOME_2G}
					WDS_WIFI=${NAME_WDS_2G}
					GUEST_WIFI=${NAME_GUEST_2G}
					BACKHAUL_WIFI=${NAME_BACKHAUL_2G}
				;;
				5g)
					HOME_WIFI=${NAME_HOME_5G}
					WDS_WIFI=${NAME_WDS_5G}
					GUEST_WIFI=${NAME_GUEST_5G}
					BACKHAUL_WIFI=${NAME_BACKHAUL_5G}
				;;
				5g_2)
					HOME_WIFI=${NAME_HOME_5G2}
					WDS_WIFI=${NAME_WDS_5G2}
					GUEST_WIFI=${NAME_GUEST_5G2}
					BACKHAUL_WIFI=${NAME_BACKHAUL_5G2}
				;;
				6g)
					HOME_WIFI=${NAME_HOME_6G}
					WDS_WIFI=${NAME_WDS_6G}
					GUEST_WIFI=${NAME_GUEST_6G}
					BACKHAUL_WIFI=${NAME_BACKHAUL_6G}
				;;
			esac

			local tmpCode=""
			local country_code=""
			local country_rev=""
			config_get country $dev country
			eval band_diffcountry=\${BAND_DIFFCOUNTRY_${country}}
			
			if [ "$band_diffcountry" = "y" ]; then
				case $band in
					2g)
						eval nvram set ${HOME_WIFI}_country_code=\${COUNTRYCODE_${country}_2G}
						eval nvram set ${HOME_WIFI}_country_rev=\${COUNTRYREV_${country}_2G}
						eval country_code=\${COUNTRYCODE_${country}_2G}
						eval country_rev=\${COUNTRYREV_${country}_2G}
					;;
					5g)
						eval nvram set ${HOME_WIFI}_country_code=\${COUNTRYCODE_${country}_5G}
						eval nvram set ${HOME_WIFI}_country_rev=\${COUNTRYREV_${country}_5G}
						eval country_code=\${COUNTRYCODE_${country}_5G}
						eval country_rev=\${COUNTRYREV_${country}_5G}
					;;
					6g)
						eval nvram set ${HOME_WIFI}_country_code=\${COUNTRYCODE_${country}_6G}
						eval nvram set ${HOME_WIFI}_country_rev=\${COUNTRYREV_${country}_6G}
						eval country_code=\${COUNTRYCODE_${country}_6G}
						eval country_rev=\${COUNTRYREV_${country}_6G}
					;;					
				esac
			else
				eval nvram set ${HOME_WIFI}_country_code=\${COUNTRYCODE_${country}}
				eval nvram set ${HOME_WIFI}_country_rev=\${COUNTRYREV_${country}}
			
				eval country_code=\${COUNTRYCODE_${country}}
				eval country_rev=\${COUNTRYREV_${country}}
			fi

			if [ "${FEATURE_BOARDCLUSTER}" = "y" ]; then
				wifi_add_boardcluster
			else
				echo "=====>>>>> NO FEATURE_BOARDCLUSTER" >$STDOUT
			fi
			
			#set ax mode
			#* HE features bitmap.
			#* Bit 0:		HE 5G support
			#* Bit 1:		HE 2G support
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
			if [ "$htmode" = "auto" ] || [ "$htmode" = "upto160" ]; then
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
			if [ "$htmode" = "auto" ] || [ "$htmode" = "upto160" ]; then
				nvram set ${HOME_WIFI}_obss_coex="1"
			else
				nvram set ${HOME_WIFI}_obss_coex="0"
			fi

			# set chanspec (wlanChspec)
			config_get channel $dev channel
			wifi_chanspec_config chanspec $htmode $channel $band
			if [ "$band" = "5g" -a "$wds_enable" = "1" ]; then
				nvram set ${HOME_WIFI}_chanspec="0"
			elif [ "$band" = "5g_2" -a "$wds_enable" = "1" ]; then
				nvram set ${HOME_WIFI}_chanspec="0"
			elif [ "$band" = "6g" -a "$wds_enable" = "1" ]; then
				nvram set ${HOME_WIFI}_chanspec="0"
			else
				nvram set ${HOME_WIFI}_chanspec="$chanspec"
			fi

			# set radio
			if [ "$eth_enable" = "1" ]; then
				nvram set ${HOME_WIFI}_radio="1"
				if [ "$wds_enable" = "1" ]; then
					nvram set ${WDS_WIFI}_radio="1"
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
		acs_cli2 csdetect &
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
	echo "wifi_wps_switch" >$STDOUT
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
					config_get ifname $vif ifname  
#ifname is wl0 wl0.3 wl0.2 wl1 wl1.3 wl1.2
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
	get_wlan_ini FEATURE_TRIBAND
	
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
	
	if [ "${FEATURE_TRIBAND}" = "y" ]; then
		hvlan=$((0x7))
	fi
	
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
								IFNAME=${NAME_WDS_2G}
							;;
							5g)
								IFNAME=${NAME_WDS_5G}
							;;
							5g_2)
								IFNAME=${NAME_WDS_5G2}
							;;
							6g)
								IFNAME=${NAME_WDS_6G}
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
	local ifname_list="${NAME_HOME_2G} ${NAME_HOME_5G} ${NAME_HOME_5G2} ${NAME_HOME_6G}"
		
	for ifname in ${ifname_list}; do
		nvram unset ${ifname}_vifs
		nvram unset ${ifname}_ssid
		nvram unset ${ifname}_guest
		nvram unset ${ifname}_ure
		nvram unset ${ifname}_ipconfig_index
		nvram unset ${ifname}_nas_dbg
		done
	
	ifname_list="${NAME_GUEST_2G} ${NAME_BACKHAUL_2G} ${NAME_WDS_2G} 
				 ${NAME_GUEST_5G} ${NAME_BACKHAUL_5G} ${NAME_WDS_5G} 
				 ${NAME_GUEST_5G2} ${NAME_BACKHAUL_5G2} ${NAME_WDS_5G2} 
				 ${NAME_GUEST_6G} ${NAME_BACKHAUL_6G} ${NAME_WDS_6G}"
	
		# clear virtual versions
	for ifname in ${ifname_list}; do
		nvram unset ${ifname}_ssid
		nvram unset ${ifname}_ipconfig_index
		nvram unset ${ifname}_guest
		nvram unset ${ifname}_closed
		nvram unset ${ifname}_wpa_psk
		nvram unset ${ifname}_auth
		nvram unset ${ifname}_wep
		nvram unset ${ifname}_auth_mode
		nvram unset ${ifname}_crypto
		nvram unset ${ifname}_akm
		nvram unset ${ifname}_hwaddr
		nvram unset ${ifname}_bss_enabled
		nvram unset ${ifname}_bss_maxassoc
		nvram unset ${ifname}_wme_bss_disable
		nvram unset ${ifname}_ifname
		nvram unset ${ifname}_unit
		nvram unset ${ifname}_ap_isolate
		nvram unset ${ifname}_macmode
		nvram unset ${ifname}_maclist
		nvram unset ${ifname}_maxassoc
		nvram unset ${ifname}_mode
		nvram unset ${ifname}_radio
		nvram unset ${ifname}_radius_ipaddr
		nvram unset ${ifname}_radius_port
		nvram unset ${ifname}_radius_key
		nvram unset ${ifname}_key
		nvram unset ${ifname}_key1
		nvram unset ${ifname}_key2
		nvram unset ${ifname}_key3
		nvram unset ${ifname}_key4
		nvram unset ${ifname}_wpa_gtk_rekey
		nvram unset ${ifname}_nas_dbg
	done
}

# lan parameters
init_nvram_lan() {

	get_wlan_ini NAME_BR
	
	# LAN H/W parameters 
	nvram set lan_ifname="${NAME_BR}"
	nvram set lan_ifnames="${NAME_HOME_2G} ${NAME_HOME_5G} ${NAME_HOME_5G2} ${NAME_HOME_6G}"
}

#add by zhangshengbo for wpa3 with hostapd
#now read profile hostapd config message to decide whether nvram set hapd_enable=1
init_nvram_hostapd() {

	get_wlan_ini FEATURE_HOSTAPD

	if [ "${FEATURE_HOSTAPD}" == "y" ]; then 
		nvram set hapd_enable="1"
	else
		nvram set hapd_enable="0"
	fi
}

# Wireless phy_ed_thresh
# For (wl is_edcrs_eu)
# 	None-EU: ed_thresh2g, ed_thresh5g
#   EU: eu_edthresh2g, eu_edthresh5g
init_nvram_phy_ed_thresh() {
	get_wlan_ini PERFIX_NVRAM_2G
	get_wlan_ini PERFIX_NVRAM_5G
	get_wlan_ini PERFIX_NVRAM_5G2
	get_wlan_ini PERFIX_NVRAM_6G
	get_wlan_ini FEATURE_CCA_THRESH
	get_wlan_ini CCA_THRESH_2G
	get_wlan_ini CCA_THRESH_5G
	get_wlan_ini CCA_THRESH_5G2
	get_wlan_ini CCA_THRESH_6G

	if [ "${FEATURE_CCA_THRESH}" = "y" ]; then
		for dev in $DEVICES; do
			config_get band "$dev" band
			case "$band" in
				2g)
					nvram kset ${PERFIX_NVRAM_2G}ed_thresh2g="${CCA_THRESH_2G}"
					nvram kset ${PERFIX_NVRAM_2G}eu_edthresh2g="${CCA_THRESH_2G}"
				;;
				5g)
					nvram kset ${PERFIX_NVRAM_5G}ed_thresh5g="${CCA_THRESH_5G}"
					nvram kset ${PERFIX_NVRAM_5G}eu_edthresh5g="${CCA_THRESH_5G}"
				;;
				5g_2)
					nvram kset ${PERFIX_NVRAM_5G2}ed_thresh5g="${CCA_THRESH_5G2}"
					nvram kset ${PERFIX_NVRAM_5G2}eu_edthresh5g="${CCA_THRESH_5G2}"
				;;
				6g)
					nvram kset ${PERFIX_NVRAM_6G}ed_thresh5g="${CCA_THRESH_6G}"
					nvram kset ${PERFIX_NVRAM_6G}eu_edthresh5g="${CCA_THRESH_6G}"
				;;
			esac
		done
	else
		echo "======>use default CCA thresh" >$STDOUT
	fi
}


# init Wireless parameters
init_nvram_wireless() {
	local ifname_list="${NAME_HOME_2G} ${NAME_HOME_5G} ${NAME_HOME_5G2} ${NAME_HOME_6G}"
	
	for ifname in ${ifname_list}; do
		nvram set ${ifname}_ifname=""
		nvram set ${ifname}_hwaddr=""
		nvram set ${ifname}_corerev=""
		nvram set ${ifname}_phytypes=""
		nvram set ${ifname}_radioids=""
		nvram set ${ifname}_ssid="TP-Link"
		nvram set ${ifname}_bss_enabled="1"
		nvram set ${ifname}_country_code="US"
		nvram set ${ifname}_country_rev="0"
		nvram set ${ifname}_radio="1"
		nvram set ${ifname}_closed="0"
		nvram set ${ifname}_ap_isolate="0"
		nvram set ${ifname}_wmf_bss_enable="1"
		nvram set ${ifname}_mcast_regen_bss_enable="1"
		nvram set ${ifname}_bss_opmode_cap_reqd="0"
		nvram set ${ifname}_rxchain_pwrsave_enable="1"
		nvram set ${ifname}_rxchain_pwrsave_quiet_time="1800"
		nvram set ${ifname}_rxchain_pwrsave_pps="10"
		nvram set ${ifname}_rxchain_pwrsave_stas_assoc_check="0"
		nvram set ${ifname}_radio_pwrsave_enable="0"
		nvram set ${ifname}_radio_pwrsave_quiet_time="1800"
		nvram set ${ifname}_radio_pwrsave_pps="10"
		nvram set ${ifname}_radio_pwrsave_level="0"
		nvram set ${ifname}_radio_pwrsave_stas_assoc_check="0"
		nvram set ${ifname}_mode="ap"
		nvram set ${ifname}_lazywds="0"
		nvram set ${ifname}_wds=""
		nvram set ${ifname}_wds_timeout="1"
		nvram set ${ifname}_wep="disabled"
		nvram set ${ifname}_auth="0"
		nvram set ${ifname}_key="1"
		nvram set ${ifname}_key1=""
		nvram set ${ifname}_key2=""
		nvram set ${ifname}_key3=""
		nvram set ${ifname}_key4=""
		nvram set ${ifname}_maclist=""
		nvram set ${ifname}_macmode="disabled"
		nvram set ${ifname}_assoc_retry_max="3"
		nvram set ${ifname}_chanspec="11"
		#probresp_sw
		nvram set ${ifname}_probresp_sw="1"
		nvram set ${ifname}_rate="0"
		nvram set ${ifname}_mrate="0"
		nvram set ${ifname}_frameburst="on"
		nvram set ${ifname}_rateset="default"
		nvram set ${ifname}_frag="2346"
		nvram set ${ifname}_rts="2346"
		nvram set ${ifname}_dtim="1"
		nvram set ${ifname}_bcn="100"
		nvram set ${ifname}_bcn_rotate="1"
		nvram set ${ifname}_plcphdr="short"
		nvram set ${ifname}_gmode="1"
		nvram set ${ifname}_gmode_protection="auto"
		nvram set ${ifname}_wme="on"
		nvram set ${ifname}_wme_bss_disable="0"
		nvram set ${ifname}_antdiv="-1"
		nvram set ${ifname}_infra="1"
		nvram set ${ifname}_bw_cap="3"
		nvram set ${ifname}_nmcsidx="-1"
		nvram set ${ifname}_nmode="-1"
		nvram set ${ifname}_rifs_advert="auto"
		nvram set ${ifname}_vlan_prio_mode="off"
		nvram set ${ifname}_leddc="0x640000"
		nvram set ${ifname}_rxstreams="0"
		nvram set ${ifname}_txstreams="0"
		nvram set ${ifname}_stbc_tx="auto"
		nvram set ${ifname}_stbc_rx="1"
		nvram set ${ifname}_ampdu="auto"

		# Default AMPDU retry limit per-tid setting 
		nvram set ${ifname}_ampdu_rtylimit_tid="5 5 5 5 5 5 5 5"

		# Default AMPDU regular rate retry limit per-tid setting 
		nvram set ${ifname}_ampdu_rr_rtylimit_tid="2 2 2 2 2 2 2 2"

		nvram set ${ifname}_amsdu="auto"
		nvram set ${ifname}_nmcsidx="-1"

		# WPA parameters 
		nvram set ${ifname}_auth_mode="none"
		nvram set ${ifname}_wpa_psk=""
		nvram set ${ifname}_wpa_gtk_rekey="0"
		nvram set ${ifname}_radius_ipaddr=""
		nvram set ${ifname}_radius_key=""
		nvram set ${ifname}_radius_port="1812"
		nvram set ${ifname}_crypto="tkip+aes"
		nvram set ${ifname}_net_reauth="36000"
		nvram set ${ifname}_akm=""
		nvram set ${ifname}_psr_mrpt="0"
	done

	# 6G wlX_nband needs to be set before "wlconf up", or mbss MAC may be set incorrectly
	[ -n "$NAME_HOME_6G" ] && nvram set ${NAME_HOME_6G}_nband="4"
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
	
	local ifname_list="${NAME_HOME_2G} ${NAME_HOME_5G} ${NAME_HOME_5G2} ${NAME_HOME_6G}"
	for ifname in ${ifname_list}; do	
		nvram set ${ifname}_wps_reg="enabled"
		nvram set ${ifname}_wps_mode="enabled"
		nvram set ${ifname}_wps_config_state="0"
		nvram set ${ifname}_wfi_enable="0"
		nvram set ${ifname}_wfi_pinmode="0"
	done
}

# WME parameters
init_nvram_wme() {
	local ifname_list="${NAME_HOME_2G} ${NAME_HOME_5G} ${NAME_HOME_5G2} ${NAME_HOME_6G}"
	
	for ifname in ${ifname_list}; do	
		nvram set ${ifname}_wme_sta_be="15 1023 3 0 0 off off"
		nvram set ${ifname}_wme_sta_bk="15 1023 7 0 0 off off"
		nvram set ${ifname}_wme_sta_vi="7 15 2 6016 3008 off off"
		nvram set ${ifname}_wme_sta_vo="3 7 2 3264 1504 off off"

		# EDCA parameters for AP 
		nvram set ${ifname}_wme_ap_be="15 63 3 0 0 off off"
		nvram set ${ifname}_wme_ap_bk="15 1023 7 0 0 off off"
		nvram set ${ifname}_wme_ap_vi="7 15 1 6016 3008 off off"
		nvram set ${ifname}_wme_ap_vo="3 7 2 3264 1504 off off"

		nvram set ${ifname}_wme_no_ack="off"
		nvram set ${ifname}_wme_apsd="on"

		nvram set ${ifname}_wme_txp_be="7 3 6 2 0"
		nvram set ${ifname}_wme_txp_bk="7 3 6 2 0"
		nvram set ${ifname}_wme_txp_vi="7 3 6 2 0"
		nvram set ${ifname}_wme_txp_vo="7 3 6 2 0"
	done
}

# config router mini
init_nvram_routermini() {
	get_wlan_ini NUM_MAXASSOC_2G
	get_wlan_ini NUM_MAXASSOC_5G
	get_wlan_ini NUM_MAXASSOC_5G2
	get_wlan_ini NUM_MAXASSOC_6G

	local sysmode=`uci get sysmode.sysmode.mode`
	local onemesh_enable=`uci get onemesh.onemesh.enable`
	local smart_enable=`uci get wireless.smart.smart_enable`

	[ -z "$sysmode" ] && sysmode="router"
	[ -z "$onemesh_enable" ] && onemesh_enable="on"
	[ -z "$smart_enable" ] && smart_enable="off"


	for dev in $DEVICES; do
		config_get band "$dev" band
		case "$band" in
			2g)
				HOME_WIFI=${NAME_HOME_2G}
				MAXASSOC=${NUM_MAXASSOC_2G}
			;;
			5g)
				HOME_WIFI=${NAME_HOME_5G}
				MAXASSOC=${NUM_MAXASSOC_5G}
			;;
			5g_2)
				HOME_WIFI=${NAME_HOME_5G2}
				MAXASSOC=${NUM_MAXASSOC_5G2}
			;;
			6g)
				HOME_WIFI=${NAME_HOME_6G}
				MAXASSOC=${NUM_MAXASSOC_6G}
			;;
		esac

		nvram set ${HOME_WIFI}_maxassoc="${MAXASSOC}"
		nvram set ${HOME_WIFI}_bss_maxassoc="${MAXASSOC}"
		nvram set ${HOME_WIFI}_cfg_maxassoc="${MAXASSOC}"

		nvram set ${HOME_WIFI}_unit="1"
		nvram set ${HOME_WIFI}_sta_retry_time="5"
		nvram set ${HOME_WIFI}_rrm="0x33"
	done
}

# Restore defaults
init_nvram_defaults() {
	nvram set restore_defaults="0"
	# Add "_default_restored_", without which wlconf would initialize some
	# nvram parameters unexpectedly. 2021/4/27 jiangzheyu@tp-link.com.cn
	nvram set _default_restored_="1"
	nvram set dpsta_ifnames=""
	
	local ifname_list="${NAME_HOME_2G} ${NAME_HOME_5G} ${NAME_HOME_5G2} ${NAME_HOME_6G}"
	
	for ifname in ${ifname_list}; do
		nvram set ${ifname}_wet_tunnel="0"
		nvram set ${ifname}_trf_mgmt_rssi_policy="0"
		nvram set ${ifname}_wmf_ucigmp_query="0"
		nvram set ${ifname}_wmf_mdata_sendup="1"
		nvram set ${ifname}_wmf_ucast_upnp="0"
	done
}

# TX Beamforming
init_nvram_txbf_imp() {
	get_wlan_ini FEATURE_TXBF_IMP

	local ifname_list="${NAME_HOME_2G} ${NAME_HOME_5G} ${NAME_HOME_5G2} ${NAME_HOME_6G}"
		
	for ifname in ${ifname_list}; do
		if [ "${FEATURE_TXBF_IMP}" = "y" ]; then
			nvram set ${ifname}_txbf_imp="1"
		else
			nvram set ${ifname}_txbf_imp="0"
		fi
	done
}


# TX mu_mimo
wifi_mu_mimo_config() {

	local dev="$1"
	config_get band $dev band
	config_get mu_mimo $dev mu_mimo
	config_get hwmode $dev hwmode	
	
	case $band in
		2g)
			get_wlan_ini FEATURE_VHT_SU_2G
			get_wlan_ini FEATURE_VHT_MU_2G
			get_wlan_ini FEATURE_HE_SU_2G
			get_wlan_ini FEATURE_HE_MU_2G
			
			HOME_WIFI=${NAME_HOME_2G}
			FEATURE_VHT_SU=${FEATURE_VHT_SU_2G}
			FEATURE_HE_SU=${FEATURE_HE_SU_2G}
			FEATURE_VHT_MU=${FEATURE_VHT_MU_2G}
			FEATURE_HE_MU=${FEATURE_HE_MU_2G}
		;;
		5g)
			get_wlan_ini FEATURE_VHT_SU_5G
			get_wlan_ini FEATURE_VHT_MU_5G
			get_wlan_ini FEATURE_HE_SU_5G
			get_wlan_ini FEATURE_HE_MU_5G
			
			HOME_WIFI=${NAME_HOME_5G}
			FEATURE_VHT_SU=${FEATURE_VHT_SU_5G}
			FEATURE_HE_SU=${FEATURE_HE_SU_5G}
			FEATURE_VHT_MU=${FEATURE_VHT_MU_5G}
			FEATURE_HE_MU=${FEATURE_HE_MU_5G}
		;;
		5g_2)
			get_wlan_ini FEATURE_VHT_SU_5G2
			get_wlan_ini FEATURE_VHT_MU_5G2
			get_wlan_ini FEATURE_HE_SU_5G2
			get_wlan_ini FEATURE_HE_MU_5G2
			
			HOME_WIFI=${NAME_HOME_5G2}
			FEATURE_VHT_SU=${FEATURE_VHT_SU_5G2}
			FEATURE_HE_SU=${FEATURE_HE_SU_5G2}
			FEATURE_VHT_MU=${FEATURE_VHT_MU_5G2}
			FEATURE_HE_MU=${FEATURE_HE_MU_5G2}
		;;
		6g)
			get_wlan_ini FEATURE_VHT_SU_6G
			get_wlan_ini FEATURE_VHT_MU_6G
			get_wlan_ini FEATURE_HE_SU_6G
			get_wlan_ini FEATURE_HE_MU_6G
			
			HOME_WIFI=${NAME_HOME_6G}
			FEATURE_VHT_SU=${FEATURE_VHT_SU_6G}
			FEATURE_HE_SU=${FEATURE_HE_SU_6G}
			FEATURE_VHT_MU=${FEATURE_VHT_MU_6G}
			FEATURE_HE_MU=${FEATURE_HE_MU_6G}
		;;
	esac

	#jiangzheyu@tp-link.com.cn 2021/6/11
	#OWE needs mfp=2, set mfp in wifi_security_config
	#close pmf(protected management frame)
	#nvram set ${HOME_WIFI}_mfp="0"

	#* BFE/R_CAP bitmap.
	#* Bit0:	VHT_SU
	#* Bit1:	VHT_MU
	#* Bit2:	HE_SU
	#* Bit4:	HE_MU (HE features "Bit 2:HE DL-OFDMA" support should be set)
	#* Bit5:	HE CQI (BFR only, HE features "Bit 2:HE DL-OFDMA" support should be set)
	local bfe_capable=0
	local bfr_capable=0
	local ofdma=`uci get wireless.ofdma.enable`
	
	if [ "${FEATURE_VHT_SU}" = "y" ]; then
		let bfe_capable=bfe_capable+1
		let bfr_capable=bfr_capable+1
	fi
		
	if [ "${FEATURE_VHT_MU}" = "y" ]; then
		let bfe_capable=bfe_capable+2
		let bfr_capable=bfr_capable+2
	fi		
	
	if [ "$hwmode" = "11ax" -o "$hwmode" = "11ax_5" -o "$hwmode" = "11bgnax" -o "$hwmode" = "11anacax" ]; then
		if [ "${FEATURE_HE_SU}" = "y" ]; then
			let bfe_capable=bfe_capable+4
			let bfr_capable=bfr_capable+4
		fi
		
		if [ "${FEATURE_HE_MU}" = "y" ]; then
			let bfe_capable=bfe_capable+8
			
			if [ "$ofdma" = "on" ]; then
				let bfr_capable=bfr_capable+16
				let bfr_capable=bfr_capable+8
			fi
		fi
	fi
	
	nvram set ${HOME_WIFI}_txbf_bfr_cap=${bfr_capable}
	nvram set ${HOME_WIFI}_txbf_bfe_cap=${bfe_capable}

	if [ "${mu_mimo}" = "on" ]; then
		nvram set ${HOME_WIFI}_mu_features="1"
	elif [ "${mu_mimo}" = "off" ]; then
		nvram set ${HOME_WIFI}_mu_features="0"
	fi	

}

# TX AirtimeFairness
wifi_atf_config()
{
	get_wlan_ini FEATURE_TAF_SUPPORT
	local dev="$1"
	config_get airtime_fairness $dev airtime_fairness

	config_get band $dev band
	case $band in
		2g)
			HOME_WIFI=${NAME_HOME_2G}
		;;
		5g)
			HOME_WIFI=${NAME_HOME_5G}
		;;
		5g_2)
			HOME_WIFI=${NAME_HOME_5G2}
		;;
		6g)
			HOME_WIFI=${NAME_HOME_6G}
		;;
	esac

	if [ "${FEATURE_TAF_SUPPORT}" = "y" ]; then
		nvram set ${HOME_WIFI}_atf="0"
		if [ "${airtime_fairness}" = "on" ]; then
			nvram set ${HOME_WIFI}_taf_enable="1"
		elif [ "${airtime_fairness}" = "off" ]; then
			nvram set ${HOME_WIFI}_taf_enable="0"
		fi
	else
		if [ "${airtime_fairness}" = "on" ]; then
			nvram set ${HOME_WIFI}_atf="1"
		elif [ "${airtime_fairness}" = "off" ]; then
			nvram set ${HOME_WIFI}_atf="0"
		fi
	fi
}

wifi_acs_config()
{
	get_wlan_ini FEATURE_ACS_CONFIG
	get_wlan_ini ACS_CONTAIN_DOUBLE_5G
	
	get_wlan_ini ACS_BW_80UP160_5G
	get_wlan_ini ACS_BW_80UP160_5G2
	
	get_wlan_ini ACS_TP_INCL_160_CHANS_5G
	get_wlan_ini ACS_TP_INCL_160_CHANS_5G2
	get_wlan_ini ACS_TP_INCL_160_CHANS_6G
	
	local dev="$1"
	
	config_get band $dev band
	case $band in
		2g)
			HOME_WIFI=${NAME_HOME_2G}
		;;
		5g)
			HOME_WIFI=${NAME_HOME_5G}
			ACS_BW_80UP160=${ACS_BW_80UP160_5G}
			ACS_TP_INCL_160_CHANS=${ACS_TP_INCL_160_CHANS_5G}
		;;
		5g_2)
			HOME_WIFI=${NAME_HOME_5G2}
			ACS_BW_80UP160=${ACS_BW_80UP160_5G2}
			ACS_TP_INCL_160_CHANS=${ACS_TP_INCL_160_CHANS_5G2}
		;;
		6g)
			HOME_WIFI=${NAME_HOME_6G}
			ACS_TP_INCL_160_CHANS=${ACS_TP_INCL_160_CHANS_6G}
		;;
	esac
	
	if [ "${FEATURE_ACS_CONFIG}" = "y" ]; then
		if [ "${ACS_CONTAIN_DOUBLE_5G}" = "y" ]; then
			nvram set acs_contain_double_5g="1"
		else
			nvram set acs_contain_double_5g="0"
		fi
		
		if [ "${ACS_BW_80UP160}" = "y" ]; then
			nvram set ${HOME_WIFI}_acs_tp_5g_up160_enable="1"
		else
			nvram set ${HOME_WIFI}_acs_tp_5g_up160_enable="0"
		fi
		
		nvram set ${HOME_WIFI}_acs_tp_incl_160_chans=${ACS_TP_INCL_160_CHANS}
	else
		echo "=====> NO FEATURE_ACS_CONFIG" >$STDOUT
	fi
}

# PsPretend threshold and retry_limit 
# change pspretend_retry_limit from 0 to 5 by zhangshengbo
# open pspretend function
init_nvram_pspretend() {
	get_wlan_ini FEATURE_PSPRETEND
	
	local ifname_list="${NAME_HOME_2G} ${NAME_HOME_5G} ${NAME_HOME_5G2} ${NAME_HOME_6G}"
	
	for ifname in ${ifname_list}; do
		if [ "${FEATURE_PSPRETEND}" = "y" ]; then
			nvram set ${ifname}_pspretend_threshold="0"
			nvram set ${ifname}_pspretend_retry_limit="5"
		else
			nvram set ${ifname}_pspretend_threshold="0"
			nvram set ${ifname}_pspretend_retry_limit="0"
		fi
	done
}

init_nvram_reg_mode() {	
	get_wlan_ini FEATURE_REG_MODE
	get_wlan_ini REG_MODE_2G
	get_wlan_ini REG_MODE_5G
	get_wlan_ini REG_MODE_5G2
	get_wlan_ini REG_MODE_6G
	
	if [ "${FEATURE_REG_MODE}" = "y" ]; then
		for dev in $DEVICES; do
			config_get band "$dev" band
			case "$band" in
				2g)
					HOME_WIFI=${NAME_HOME_2G}
					REG_MODE=${REG_MODE_2G}
				;;
				5g)
					HOME_WIFI=${NAME_HOME_5G}
					REG_MODE=${REG_MODE_5G}
				;;
				5g_2)
					HOME_WIFI=${NAME_HOME_5G2}
					REG_MODE=${REG_MODE_5G2}
				;;
				6g)
					HOME_WIFI=${NAME_HOME_6G}
					REG_MODE=${REG_MODE_6G}
				;;
			esac
			
			#dfs parameters
			nvram set ${HOME_WIFI}_reg_mode="${REG_MODE}"
	done
	else
		echo "=====> NO FEATURE_REG_MODE" >$STDOUT
	fi
}

# acsd setting
init_nvram_acsd() {
	local ifname_list="${NAME_HOME_2G} ${NAME_HOME_5G} ${NAME_HOME_5G2} ${NAME_HOME_6G}"
	
	for ifname in ${ifname_list}; do
		nvram set ${ifname}_acs_fcs_mode="0"
		nvram set ${ifname}_dcs_csa_unicast="0"
		nvram set ${ifname}_acs_excl_chans=""
		nvram set ${ifname}_acs_dfs="2"
		nvram set ${ifname}_acs_dfsr_immediate="300 3"
		nvram set ${ifname}_acs_dfsr_deferred="604800 5"
		nvram set ${ifname}_acs_dfsr_activity="30 10240"
		nvram set ${ifname}_acs_start_on_nondfs="1"
		nvram set ${ifname}_acs_cs_scan_timer="900"
		nvram set ${ifname}_acs_ci_scan_timer="4"
		nvram set ${ifname}_acs_ci_scan_timeout="300"
		nvram set ${ifname}_acs_scan_entry_expire="3600"
		nvram set ${ifname}_acs_tx_idle_cnt="5"
		nvram set ${ifname}_acs_chan_dwell_time="30"
		nvram set ${ifname}_acs_chan_flop_period="30"
		nvram set ${ifname}_intf_speriod="50"
		nvram set ${ifname}_intf_scnt="5"
		nvram set ${ifname}_intf_swin="7"
		nvram set ${ifname}_intf_drate="0"
		nvram set ${ifname}_intf_rrate="0"
		nvram set ${ifname}_intf_glitch="0"
		nvram set ${ifname}_intf_txbad="0"
		nvram set ${ifname}_intf_txnoack="0x4000f"
		#set bgdfs check period = 1 min, default 20min
		nvram set ${ifname}_acs_bgdfs_idle_interval="180"
		#disable txfail for acsdv2
		nvram set ${ifname}_acs_ignore_txfail="1"
		#set zero-wait dfs
		nvram set ${ifname}_acs_bgdfs_enab="1"
	done
	nvram set acs_ctrl_chan_adjust="0"
}

# system run produce
init_nvram_run() {
	get_wlan_ini MASK_CHAIN_2G
	get_wlan_ini MASK_CHAIN_5G
	get_wlan_ini MASK_CHAIN_5G2
	get_wlan_ini MASK_CHAIN_6G
	get_wlan_ini NAME_BR

	for dev in $DEVICES; do
		config_get band "$dev" band
		case "$band" in
			2g)
				HOME_WIFI=${NAME_HOME_2G}
				MASK_CHAIN=${MASK_CHAIN_2G}
			;;
			5g)
				HOME_WIFI=${NAME_HOME_5G}
				MASK_CHAIN=${MASK_CHAIN_5G}
			;;
			5g_2)
				HOME_WIFI=${NAME_HOME_5G2}
				MASK_CHAIN=${MASK_CHAIN_5G2}
			;;
			6g)
				HOME_WIFI=${NAME_HOME_6G}
				MASK_CHAIN=${MASK_CHAIN_6G}
			;;
		esac
		
		nvram set ${HOME_WIFI}_mimo_preamble=""
		nvram set ${HOME_WIFI}_bridge=""
		nvram set ${HOME_WIFI}_tpc_db="0"
		nvram set ${HOME_WIFI}_txchain="${MASK_CHAIN}" #need to check
		nvram set ${HOME_WIFI}_rxchain="${MASK_CHAIN}" #need to check
		nvram set ${HOME_WIFI}_nmode_protection="auto"
		nvram set ${HOME_WIFI}_rifs=""
		nvram set ${HOME_WIFI}_ure=""
		nvram set ${HOME_WIFI}_preauth=""
		nvram set ${HOME_WIFI}_dwds="0"
		nvram set ${HOME_WIFI}_wmf_psta_disable=""
	done

	nvram set wps_proc_status="0"
	nvram set wps_config_method="0x2688"
	nvram set wps_aplockdown="0"

	nvram set partialboots="0"
	nvram set br0_ifname=${NAME_BR}
	nvram set br0_ifnames="eth1 eth2 eth3 eth4 eth5 wl0 wl1"
}

##
## add by dongao, disable nbr_discovery_cap
##
init_nvram_nbr_discovery_config() {
	get_wlan_ini FEATURE_NBR_DISCOVERY_CAP
	get_wlan_ini NBR_DISCOVERY_CAP_2G
	get_wlan_ini NBR_DISCOVERY_CAP_5G
	get_wlan_ini NBR_DISCOVERY_CAP_5G2
	get_wlan_ini NBR_DISCOVERY_CAP_6G
	get_wlan_ini FEATURE_TRIBAND
	get_wlan_ini FEATURE_6G
	
	if [ "${FEATURE_NBR_DISCOVERY_CAP}" = "y" ]; then
		eval nvram set ${NAME_HOME_2G}_nbr_discovery_cap=${NBR_DISCOVERY_CAP_2G}
		eval nvram set ${NAME_GUEST_2G}_nbr_discovery_cap=${NBR_DISCOVERY_CAP_2G}
		eval nvram set ${NAME_BACKHAUL_2G}_nbr_discovery_cap=${NBR_DISCOVERY_CAP_2G}

		eval nvram set ${NAME_HOME_5G}_nbr_discovery_cap=${NBR_DISCOVERY_CAP_5G}
		eval nvram set ${NAME_GUEST_5G}_nbr_discovery_cap=${NBR_DISCOVERY_CAP_5G}
		eval nvram set ${NAME_BACKHAUL_5G}_nbr_discovery_cap=${NBR_DISCOVERY_CAP_5G}

		if [ "${FEATURE_TRIBAND}" = "y" ]; then
			if [ "${FEATURE_6G}" = "y" ]; then
				eval nvram set ${NAME_HOME_6G}_nbr_discovery_cap=${NBR_DISCOVERY_CAP_6G}
				eval nvram set ${NAME_GUEST_6G}_nbr_discovery_cap=${NBR_DISCOVERY_CAP_6G}
				eval nvram set ${NAME_BACKHAUL_6G}_nbr_discovery_cap=${NBR_DISCOVERY_CAP_6G}
			else
				eval nvram set ${NAME_HOME_5G2}_nbr_discovery_cap=${NBR_DISCOVERY_CAP_5G2}
				eval nvram set ${NAME_GUEST_5G2}_nbr_discovery_cap=${NBR_DISCOVERY_CAP_5G2}
				eval nvram set ${NAME_BACKHAUL_5G2}_nbr_discovery_cap=${NBR_DISCOVERY_CAP_5G2}
			fi
		fi
	fi
}

##
## jiangzheyu@tp-link.com.cn 2021/6/3
## Initialize the Unsolicited Probe Response (UPR) / FILS Discovery (FD) parameters
##
init_nvram_upr_fd_config() {
	get_wlan_ini FEATURE_UPR_FD_CAP
	get_wlan_ini FEATURE_6G
	get_wlan_ini UPR_FD_ENABLE
	get_wlan_ini UPR_FD_METHOD
	get_wlan_ini UPR_FD_PERIOD

	if [ "${FEATURE_UPR_FD_CAP}" = "y" ] && [ "${FEATURE_6G}" = "y" ]; then
		eval nvram set ${NAME_HOME_6G}_upr_fd_enable=${UPR_FD_ENABLE}
		eval nvram set ${NAME_HOME_6G}_upr_fd_method=${UPR_FD_METHOD}
		eval nvram set ${NAME_HOME_6G}_upr_fd_period=${UPR_FD_PERIOD}
	fi
}

init_nvram_router() {
	get_wlan_ini FEATURE_INIT_NVRAM_EXTEND

	# Lan parameters
	init_nvram_lan

	#add by zhangshengbo for hostapd
	init_nvram_hostapd
	
	# Wireless parameters
	init_nvram_wireless

	# Wireless phy_ed_thresh for AX20 AC-PHY
	init_nvram_phy_ed_thresh
	
	# only for extend nvram kset parameters
	if [ "${FEATURE_INIT_NVRAM_EXTEND}" = "y" ]; then
		init_nvram_extend
	else
		echo "=====>>>>> NO FEATURE_INIT_NVRAM_EXTEND" >$STDOUT
	fi
	# WSC parameters
	init_nvram_wsc

	# WME parameters
	init_nvram_wme

	# config router mini
	init_nvram_routermini

	# Restore defaults
	init_nvram_defaults

	# TX Beamforming
	init_nvram_txbf_imp

	# PsPretend threshold and retry_limit 
	init_nvram_pspretend

	# 802.11h
	init_nvram_reg_mode

	# acsd setting
	init_nvram_acsd

	# system run produce
	init_nvram_run

	# 6GHz Unsolicited Probe Response (UPR) / FILS Discovery (FD)
	init_nvram_upr_fd_config
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
				nvram kset ${PERFIX_NVRAM_2G}macaddr="${macaddr}"
			;;
			5g)
				config_get macaddr "$dev" macaddr
				macaddr=${macaddr//-/:}
				nvram kset ${PERFIX_NVRAM_5G}macaddr="${macaddr}"
			;;
			5g_2)
				config_get macaddr "$dev" macaddr
				macaddr=${macaddr//-/:}
				nvram kset ${PERFIX_NVRAM_5G2}macaddr="${macaddr}"
			;;
			6g)
				config_get macaddr "$dev" macaddr
				macaddr=${macaddr//-/:}
				nvram kset ${PERFIX_NVRAM_6G}macaddr="${macaddr}"
			;;
		esac
	done
}

wifi_nvram_default_restore() {
	get_wlan_ini FEATURE_WIFI_CHECK

	init_nvram_wps
	init_nvram_radio
	init_nvram_router
	init_nvram_mac
	#add by zhangshengbo
	if [ "${FEATURE_WIFI_CHECK}" = "y" ]; then
		#Also defined in /etc/rc.d/S99zzzzzwifi_check
		echo "yes" > ${WIFI_CHECK_RUN_FILE}
		init_nvram_wifi_check_flag
	fi
}

wifi_chanspec_config() {
	local tmpChanspec
	local cw
	local countrycode=""
	htmode=$2
	channel=$3
	band=$4
	if [ $channel = "auto" ]; then
		tmpChanspec="0"
	elif [ $band = "6g" ]; then
		if [ $(($channel % 4)) == 1 ] && [ $channel -le 233 ] || [ $channel == 2 ]; then
			if [ $htmode = "auto" ]; then
				if [ $channel = "233" ]; then
					cw=""
				elif [ $channel = "225" ] || [ $channel = "229" ]; then
					cw="/40"
				else
					cw="/160"
				fi
				tmpChanspec="6g${channel}${cw}"
			else
				tmpChanspec="6g${channel}/${htmode}"
			fi
		else
			echo "ERROR: the channel you set is not correct!!!" >$CONSOLE
		fi
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
			elif [ $htmode = "upto160" ]; then
				cw=160
				tmpChanspec="${channel}/160"
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
			if [ $htmode = "auto" ] || [ $htmode = "upto160" ]; then
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
			if [ $htmode = "auto" ] || [ $htmode = "upto160" ]; then
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
			if [ $htmode = "auto" ] || [ $htmode = "upto160" ]; then
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
			elif [ $htmode = "upto160" ]; then
				cw=160
				tmpChanspec="${channel}/160"
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
			if [ $htmode = "auto" ] || [ $htmode = "upto160" ]; then
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
			if [ $htmode = "auto" ] || [ $htmode = "upto160" ]; then
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
		116|124)
			countrycode=`getfirm COUNTRY`
			if [ $htmode = "auto" ]; then
				cw=80
				tmpChanspec="${channel}/80"
			elif [ $htmode = "upto160" ]; then
				cw=160
				tmpChanspec="${channel}/160"
			elif [ $htmode = "20" ]; then
				tmpChanspec="$channel"
			elif [ $htmode = "40" ]; then
				tmpChanspec="${channel}l"
			elif [ $htmode = "80" ]; then
				tmpChanspec="${channel}/80"
			elif [ $htmode = "160" ]; then
				tmpChanspec="${channel}/160"
			fi
			#for country AU CA donot support weather channel, ch116 only match 20M
			if [ "$channel" = "116" -a "$countrycode" = "AU" ]; then
				tmpChanspec="116"
			fi
			if [ "$channel" = "116" -a "$countrycode" = "CA" ]; then
				tmpChanspec="116"
			fi
		;;
		120|128)
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
	get_wlan_ini COUNTRYCODE_DE
	get_wlan_ini COUNTRYREV_DE
	get_wlan_ini COUNTRYCODE_US
	get_wlan_ini COUNTRYREV_US
	get_wlan_ini COUNTRYCODE_CA
	get_wlan_ini COUNTRYREV_CA
	get_wlan_ini COUNTRYCODE_JP
	get_wlan_ini COUNTRYREV_JP
	get_wlan_ini FEATURE_BOARDCLUSTER
	get_wlan_ini COUNTRYCODE_AS_2G
	get_wlan_ini COUNTRYREV_AS_2G
	get_wlan_ini COUNTRYCODE_AS_5G
	get_wlan_ini COUNTRYREV_AS_5G
	get_wlan_ini COUNTRYCODE_AS_6G
	get_wlan_ini COUNTRYREV_AS_6G
	get_wlan_ini BAND_DIFFCOUNTRY_AS

	local dev="$1"
	local wds_enable="0"
	local dwds_mode="ap"
	local eth_enable="0"
	local home_vif=""
	local vif=""
	local band_diffcountry=""
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
				echo "=====>>>>> $dev: WDS is on" >$STDOUT
			else
				echo "=====>>>>> $dev: vif $vif is disabled or $vif is a guest/backhaul network" >$STDOUT
			fi
		done
	fi

	case $band in
		2g)
			vif="$home_vif"
			HOME_WIFI=${NAME_HOME_2G}
		;;
		5g)
			vif="$home_vif"
			HOME_WIFI=${NAME_HOME_5G}
		;;
		5g_2)
			vif="$home_vif"
			HOME_WIFI=${NAME_HOME_5G2}
		;;
		6g)
			vif="$home_vif"
			HOME_WIFI=${NAME_HOME_6G}
		;;
	esac

	eval band_diffcountry=\${BAND_DIFFCOUNTRY_${country}}
		
	if [ "$band_diffcountry" = "y" ]; then
		case $band in
			2g)
				eval nvram set ${HOME_WIFI}_country_code=\${COUNTRYCODE_${country}_2G}
				eval nvram set ${HOME_WIFI}_country_rev=\${COUNTRYREV_${country}_2G}
				eval country_code=\${COUNTRYCODE_${country}_2G}
				eval country_rev=\${COUNTRYREV_${country}_2G}
			;;
			5g)
				eval nvram set ${HOME_WIFI}_country_code=\${COUNTRYCODE_${country}_5G}
				eval nvram set ${HOME_WIFI}_country_rev=\${COUNTRYREV_${country}_5G}
				eval country_code=\${COUNTRYCODE_${country}_5G}
				eval country_rev=\${COUNTRYREV_${country}_5G}
			;;
			6g)
				eval nvram set ${HOME_WIFI}_country_code=\${COUNTRYCODE_${country}_6G}
				eval nvram set ${HOME_WIFI}_country_rev=\${COUNTRYREV_${country}_6G}
				eval country_code=\${COUNTRYCODE_${country}_6G}
				eval country_rev=\${COUNTRYREV_${country}_6G}
			;;					
		esac
	else
		eval nvram set ${HOME_WIFI}_country_code=\${COUNTRYCODE_${country}}
		eval nvram set ${HOME_WIFI}_country_rev=\${COUNTRYREV_${country}}
	fi

	if [ "$eth_enable" = "1" ]; then
		config_get ssid $vif ssid
		nvram set ${HOME_WIFI}_ssid="$ssid"

		if [ "${FEATURE_BOARDCLUSTER}" = "y" ]; then
			wifi_add_boardcluster
		else
			echo "=====>>>>> NO FEATURE_BOARDCLUSTER" >$STDOUT
		fi

		#set ax mode
		#* HE features bitmap.
		#* Bit 0:		HE 5G support
		#* Bit 1:		HE 2G support
		#* Bit 2:		HE DL-OFDMA support
		#* Bit 3:		HE UL-OFDMA support
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
				if [ "$band" = "6g" ]; then
					nvram set ${HOME_WIFI}_bw_cap="15"
				else
					nvram set ${HOME_WIFI}_bw_cap="7"
				fi
			else
				nvram set ${HOME_WIFI}_bw_cap="3"
			fi
		elif [ "$htmode" = "160" ] || [ "$htmode" = "upto160" ]; then
			nvram set ${HOME_WIFI}_bw_cap="15"
		elif [ "$htmode" = "80" ]; then
			nvram set ${HOME_WIFI}_bw_cap="7"
		elif [ "$htmode" = "40" ]; then
			nvram set ${HOME_WIFI}_bw_cap="3"
		else
			nvram set ${HOME_WIFI}_bw_cap="1"
		fi

		# set obss_coex
		if [ "$htmode" = "auto" ] || [ "$htmode" = "upto160" ]; then
			nvram set ${HOME_WIFI}_obss_coex="1"
		else
			nvram set ${HOME_WIFI}_obss_coex="0"
		fi

		# set chanspec (wlanChspec)
		wifi_chanspec_config chanspec $htmode $channel $band
		if [ "$band" = "5g" -a "$wds_enable" = "1" -a "$dwds_mode" != "ap" ]; then
			nvram set ${HOME_WIFI}_chanspec="0"
		elif [ "$band" = "5g_2" -a "$wds_enable" = "1" -a "$dwds_mode" != "ap" ]; then
			nvram set ${HOME_WIFI}_chanspec="0"
		elif [ "$band" = "6g" -a "$wds_enable" = "1" -a "$dwds_mode" != "ap" ]; then
			nvram set ${HOME_WIFI}_chanspec="0"
		else
			nvram set ${HOME_WIFI}_chanspec="$chanspec"
		fi

		# set radio
		nvram set ${HOME_WIFI}_radio="1"

		config_get mode $vif mode
		nvram set ${HOME_WIFI}_mode="$mode"

		config_get_bool hidden $vif hidden
		if [ "$hidden" = "1" ]; then
			nvram set ${HOME_WIFI}_closed="1"
			if [ "$band" = "6g" ]; then
				nvram set ${HOME_WIFI}_rnr_hide="1"
			fi
		else
			nvram set ${HOME_WIFI}_closed="0"
			if [ "$band" = "6g" ]; then
				nvram set ${HOME_WIFI}_rnr_hide="0"
			fi
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
	local vif=""
	local WIFI_PRE=""
	local change_flag="0"
	local enterp_change_flag="0"
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
				WIFI_PRE=${NAME_WDS_2G}
			else
				vif="$home_vif"
				WIFI_PRE=${NAME_HOME_2G}
			fi
		;;
		5g)
			if [ "$wds_enable" = "1" -a "$dwds_mode" != "ap" ]; then
				vif="$home_vif"
				WIFI_PRE=${NAME_WDS_5G}
			else
				vif="$home_vif"
				WIFI_PRE=${NAME_HOME_5G}
			fi
		;;
		5g_2)
			if [ "$wds_enable" = "1" -a "$dwds_mode" != "ap" ]; then
				vif="$home_vif"
				WIFI_PRE=${NAME_WDS_5G2}
			else
				vif="$home_vif"
				WIFI_PRE=${NAME_HOME_5G2}
			fi
		;;
		6g)
			if [ "$wds_enable" = "1" -a "$dwds_mode" != "ap" ]; then
				vif="$home_vif"
				WIFI_PRE=${NAME_WDS_6G}
			else
				vif="$home_vif"
				WIFI_PRE=${NAME_HOME_6G}
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
				nvram set ${WIFI_PRE}_mfp="0"
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
				nvram set ${WIFI_PRE}_mfp="0"
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
				nvram set ${WIFI_PRE}_mfp="0"
			#add for wpa3-owe
			elif [ "$encryption" == "owe" ]; then
				nvram set ${WIFI_PRE}_preauth=""
				#only support owe_only
				nvram set ${WIFI_PRE}_akm="owe"
				nvram set ${WIFI_PRE}_crypto="aes"
				nvram set ${WIFI_PRE}_mfp="2"
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
				nvram set ${WIFI_PRE}_mfp="0"
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
				nvram set ${WIFI_PRE}_mfp="0"
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
			HOME_WIFI=${NAME_HOME_2G}
			GUEST_WIFI=${NAME_GUEST_2G}
			WDS_WIFI=${NAME_WDS_2G}
		;;
		5g)
			HOME_WIFI=${NAME_HOME_5G}
			GUEST_WIFI=${NAME_GUEST_5G}
			WDS_WIFI=${NAME_WDS_5G}
		;;
		5g_2)
			HOME_WIFI=${NAME_HOME_5G2}
			GUEST_WIFI=${NAME_GUEST_5G2}
			WDS_WIFI=${NAME_WDS_5G2}
		;;
		6g)
			HOME_WIFI=${NAME_HOME_6G}
			GUEST_WIFI=${NAME_GUEST_6G}
			WDS_WIFI=${NAME_WDS_6G}
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
			config_get_bool enable  $vif enable
			config_get      mode    $vif mode
			config_get      guest   $vif guest
			config_get      backhaul $vif backhaul
			config_get      ifname  $vif ifname

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
		HOME_WIFI=${WDS_WIFI}
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
				HOME_WIFI=${NAME_HOME_2G}
			else
				vif="$home_vif"
				HOME_WIFI=${NAME_HOME_2G}
			fi
		;;
		5g)
			if [ "$wds_enable" = "1" ]; then
				vif="$home_vif"
				HOME_WIFI=${NAME_HOME_5G}
			else
				vif="$home_vif"
				HOME_WIFI=${NAME_HOME_5G}
			fi
		;;
		5g_2)
			if [ "$wds_enable" = "1" ]; then
				vif="$home_vif"
				HOME_WIFI=${NAME_HOME_5G2}
			else
				vif="$home_vif"
				HOME_WIFI=${NAME_HOME_5G2}
			fi
		;;
		6g)
			if [ "$wds_enable" = "1" ]; then
				vif="$home_vif"
				HOME_WIFI=${NAME_HOME_6G}
			else
				vif="$home_vif"
				HOME_WIFI=${NAME_HOME_6G}
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
			HOME_WIFI=${NAME_HOME_2G}
		;;
		5g)
			HOME_WIFI=${NAME_HOME_5G}
		;;
		5g_2)
			HOME_WIFI=${NAME_HOME_5G2}
		;;
		6g)
			HOME_WIFI=${NAME_HOME_6G}
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
				HOME_WIFI=${NAME_WDS_2G}
			;;
			5g)
				HOME_WIFI=${NAME_WDS_5G}
			;;
			5g_2)
				HOME_WIFI=${NAME_WDS_5G2}
			;;
			6g)
				HOME_WIFI=${NAME_WDS_6G}
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
		wifi_wps $wpsIf wps_ap_pin disable
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
	get_wlan_ini PERFIX_WLAN
	get_wlan_ini NUM_MAXASSOC_2G
	get_wlan_ini NUM_MAXASSOC_5G
	get_wlan_ini NUM_MAXASSOC_5G2
	get_wlan_ini NUM_MAXASSOC_6G
	
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
			HOME_WIFI=${NAME_HOME_2G}
			WDS_WIFI=${NAME_WDS_2G}
			GUEST_WIFI=${NAME_GUEST_2G}
			BACKHAUL_WIFI=${NAME_BACKHAUL_2G}
			WIFI_UNIT=${NAME_WDS_2G#*${PERFIX_WLAN}}
			MAXASSOC=${NUM_MAXASSOC_2G}
		;;
		5g)
			HOME_WIFI=${NAME_HOME_5G}
			WDS_WIFI=${NAME_WDS_5G}
			GUEST_WIFI=${NAME_GUEST_5G}
			BACKHAUL_WIFI=${NAME_BACKHAUL_5G}
			WIFI_UNIT=${NAME_WDS_5G#*${PERFIX_WLAN}}
			MAXASSOC=${NUM_MAXASSOC_5G}
		;;
		5g_2)
			HOME_WIFI=${NAME_HOME_5G2}
			WDS_WIFI=${NAME_WDS_5G2}
			GUEST_WIFI=${NAME_GUEST_5G2}
			BACKHAUL_WIFI=${NAME_BACKHAUL_5G2}
			WIFI_UNIT=${NAME_WDS_5G2#*${PERFIX_WLAN}}
			MAXASSOC=${NUM_MAXASSOC_5G2}
		;;
		6g)
			HOME_WIFI=${NAME_HOME_6G}
			WDS_WIFI=${NAME_WDS_6G}
			GUEST_WIFI=${NAME_GUEST_6G}
			BACKHAUL_WIFI=${NAME_BACKHAUL_6G}
			WIFI_UNIT=${NAME_WDS_6G#*${PERFIX_WLAN}}
			MAXASSOC=${NUM_MAXASSOC_6G}
		;;
	esac
	
	if [ "$eth_enable" = "1" -a "$wds_enable" = "1" ]; then
		config_get ssid $wds_vif ssid
		nvram set ${HOME_WIFI}_ssid="$ssid"
		
		config_get encryption $wds_vif encryption
		if [ "$encryption" = "wep" ]; then
			config_get wep_format1 $wds_vif wep_format1
			if [ "$wep_format1" = "asic" -o "$wep_format1" = "hex" ]; then
				nvram set ${HOME_WIFI}_wep="enabled"
				config_get wep_mode $wds_vif wep_mode
				if [ "$wep_mode" = "shared" ]; then
					nvram set ${HOME_WIFI}_auth="1"
				else
					nvram set ${HOME_WIFI}_auth="0"
				fi
				nvram set ${HOME_WIFI}_key="1"
				config_get wep_key1 $wds_vif wep_key1
				nvram set ${HOME_WIFI}_key1="$wep_key1"
				nvram set ${HOME_WIFI}_key2=""
				nvram set ${HOME_WIFI}_key3=""
				nvram set ${HOME_WIFI}_key4=""
				nvram set ${HOME_WIFI}_akm=""
				nvram set ${HOME_WIFI}_nmode="0"
			fi
		elif [ "$encryption" = "psk" ]; then
			nvram set ${HOME_WIFI}_akm="psk psk2"
			config_get psk_key $wds_vif psk_key
			nvram set ${HOME_WIFI}_wpa_psk="$psk_key"
			nvram set ${HOME_WIFI}_wep="disabled"
			nvram set ${HOME_WIFI}_auth="0"
		elif [ "$encryption" = "none" ]; then
			nvram set ${HOME_WIFI}_akm=""
			nvram set ${HOME_WIFI}_wep="disabled"
			nvram set ${HOME_WIFI}_auth="0"
		else
			echo "ERROR: $dev, unknown wds security" >$CONSOLE
		fi

		nvram set ${HOME_WIFI}_ure="0"
		nvram set ${HOME_WIFI}_mode="psr"
		nvram set ${HOME_WIFI}_vifs=${WDS_WIFI}
		nvram set ${HOME_WIFI}_wps_oob="disabled"
		nvram set ${HOME_WIFI}_ap_isolate="0"
		br0_ifnames_tmp="`nvram get br0_ifnames`"
		echo ${br0_ifnames_tmp} | grep -q "${WDS_WIFI}" || nvram set br0_ifnames="$br0_ifnames_tmp ${WDS_WIFI}"
		lan_ifnames_tmp="`nvram get lan_ifnames`"
		echo ${lan_ifnames_tmp} | grep -q "${WDS_WIFI}" || nvram set lan_ifnames="$lan_ifnames_tmp ${WDS_WIFI}"

		local ifname_list="${GUEST_WIFI} ${BACKHAUL_WIFI}"

		for ifname in ${ifname_list}; do
			nvram set ${ifname}_bss_enabled="0"
		done

		vap_name=${WDS_WIFI}
		if [ "$band" = "5g" ]; then
			home_vif="${VIF_HOME_2G}"
		elif [ "$band" = "5g_2" ]; then
			home_vif="${VIF_HOME_5G}"
		else
			home_vif="${VIF_HOME_5G2}"
		fi
		config_get ssid $home_vif ssid
		nvram set ${vap_name}_ssid="$ssid"
		nvram set ${vap_name}_mode="ap"
		nvram set ${vap_name}_radio="1"
		config_get_bool hidden $home_vif hidden
		if [ "$hidden" = "1" ]; then
			nvram set ${vap_name}_closed="1"
			if [ "$band" = "6g" ]; then
				nvram set ${vap_name}_rnr_hide="1"
			fi
		else
		        nvram set ${vap_name}_closed="0"
			if [ "$band" = "6g" ]; then
				nvram set ${vap_name}_rnr_hide="0"
			fi
		fi
		config_get_bool ap_isolate $dev isolate 
		nvram set ${vap_name}_ap_isolate="$ap_isolate"
		nvram set ${vap_name}_bss_enabled="1"
		nvram set ${vap_name}_sta_retry_time="5"
		nvram set ${vap_name}_infra="1"
		nvram set ${vap_name}_unit="${WIFI_UNIT}"
		nvram set ${vap_name}_ifname="${vap_name}"
		nvram set ${vap_name}_bss_maxassoc="${MAXASSOC}"
		nvram set ${vap_name}_wmf_bss_enable="1"
	else
		vap_name=${WDS_WIFI}
		nvram set ${vap_name}_radio="0"
		nvram set ${vap_name}_bss_enabled="0"
		nvram unset ${vap_name}_unit
		nvram unset ${vap_name}_ifname
		
		local ifname_list="${GUEST_WIFI} ${BACKHAUL_WIFI} ${WDS_WIFI}"
		
		for ifname in ${ifname_list}; do
			nvram set ${ifname}_hwaddr=""
		done

		br0_ifnames_tmp="`nvram get br0_ifnames`"
		echo ${br0_ifnames_tmp} | grep -q ${vap_name} && br0_ifnames_tmp="${br0_ifnames_tmp/ ${vap_name}/""}"
		nvram set br0_ifnames="$br0_ifnames_tmp"
		lan_ifnames_tmp="`nvram get lan_ifnames`"
		echo ${lan_ifnames_tmp} | grep -q ${vap_name} && lan_ifnames_tmp="${lan_ifnames_tmp/ ${vap_name}/""}"
		nvram set lan_ifnames="$lan_ifnames_tmp"
		vifs_tmp="`nvram get ${HOME_WIFI}_vifs`"
		echo ${vifs_tmp} | grep -q "${WDS_WIFI}" && nvram set ${HOME_WIFI}_vifs=""
	fi
}


wifi_psta_config() {
	get_wlan_ini FEATURE_SINGLECHAIN_TEST

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
			HOME_WIFI=${NAME_HOME_2G}
			WDS_WIFI=${NAME_WDS_2G}
			GUEST_WIFI=${NAME_GUEST_2G}
			BACKHAUL_WIFI=${NAME_BACKHAUL_2G}
		;;
		5g)
			HOME_WIFI=${NAME_HOME_5G}
			WDS_WIFI=${NAME_WDS_5G}
			GUEST_WIFI=${NAME_GUEST_5G}
			BACKHAUL_WIFI=${NAME_BACKHAUL_5G}
		;;
		5g_2)
			HOME_WIFI=${NAME_HOME_5G2}
			WDS_WIFI=${NAME_WDS_5G2}
			GUEST_WIFI=${NAME_GUEST_5G2}
			BACKHAUL_WIFI=${NAME_BACKHAUL_5G2}
		;;
		6g)
			HOME_WIFI=${NAME_HOME_6G}
			WDS_WIFI=${NAME_WDS_6G}
			GUEST_WIFI=${NAME_GUEST_6G}
			BACKHAUL_WIFI=${NAME_BACKHAUL_6G}
		;;
	esac

	if [ "$eth_enable" = "1" -a "$psta_enable" = "1" ]; then
		config_get ssid $psta_vif ssid
		nvram set ${HOME_WIFI}_ssid="$ssid"
        nvram set fwd_wlandevs="${DEVICES}"
        if [ "${FEATURE_SINGLECHAIN_TEST}" = "y" ]; then
            nvram set ${HOME_WIFI}_rxchain="1"
            nvram set ${HOME_WIFI}_txchain="1"
        fi
		
		config_get encryption $psta_vif encryption
		if [ "$encryption" = "wep" ]; then
			config_get wep_format1 $psta_vif wep_format1
			if [ "$wep_format1" = "asic" -o "$wep_format1" = "hex" ]; then
				nvram set ${HOME_WIFI}_wep="enabled"
				config_get wep_mode $psta_vif wep_mode
				if [ "$wep_mode" = "shared" ]; then
					nvram set ${HOME_WIFI}_auth="1"
				else
					nvram set ${HOME_WIFI}_auth="0"
				fi
				nvram set ${HOME_WIFI}_key="1"
				config_get wep_key1 $psta_vif wep_key1
				nvram set ${HOME_WIFI}_key1="$wep_key1"
				nvram set ${HOME_WIFI}_key2=""
				nvram set ${HOME_WIFI}_key3=""
				nvram set ${HOME_WIFI}_key4=""
				nvram set ${HOME_WIFI}_akm=""
				nvram set ${HOME_WIFI}_nmode="0"
			fi
		elif [ "$encryption" = "psk" ]; then
			nvram set ${HOME_WIFI}_akm="psk psk2 psk2ft"
			config_get psk_key $psta_vif psk_key
			nvram set ${HOME_WIFI}_wpa_psk="$psk_key"
			nvram set ${HOME_WIFI}_wep="disabled"
			nvram set ${HOME_WIFI}_auth="0"
		elif [ "$encryption" = "none" ]; then
			nvram set ${HOME_WIFI}_akm=""
			nvram set ${HOME_WIFI}_wep="disabled"
			nvram set ${HOME_WIFI}_auth="0"
		else
			echo "ERROR: $dev, unknown wds security" >$CONSOLE
		fi

		nvram unset ${HOME_WIFI}_ure
		nvram set ${HOME_WIFI}_mode="psta"
		nvram unset ${HOME_WIFI}_vifs
		nvram set ${HOME_WIFI}_wps_oob="disabled"
		nvram set ${HOME_WIFI}_ap_isolate="0"
		br0_ifnames_tmp="`nvram get br0_ifnames`"
		echo ${br0_ifnames_tmp} | grep -q ${WDS_WIFI} || nvram set br0_ifnames="$br0_ifnames_tmp ${WDS_WIFI}"
		lan_ifnames_tmp="`nvram get lan_ifnames`"
		echo ${lan_ifnames_tmp} | grep -q ${WDS_WIFI} || nvram set lan_ifnames="$lan_ifnames_tmp ${WDS_WIFI}"

		local ifname_list="${GUEST_WIFI} ${BACKHAUL_WIFI}"

		for ifname in ${ifname_list}; do
			nvram set ${ifname}_bss_enabled="0"
		done

		vap_name="${WDS_WIFI}"

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
		vap_name="${WDS_WIFI}"
		nvram set ${vap_name}_radio="0"
		nvram set ${vap_name}_bss_enabled="0"
		nvram unset ${vap_name}_unit
		nvram unset ${vap_name}_ifname
		
		
		local ifname_list="${GUEST_WIFI} ${BACKHAUL_WIFI} ${WDS_WIFI}"
		
		for ifname in ${ifname_list}; do
			nvram set ${ifname}_hwaddr=""
		done

		br0_ifnames_tmp="`nvram get br0_ifnames`"
		echo ${br0_ifnames_tmp} | grep -q ${vap_name} && br0_ifnames_tmp="${br0_ifnames_tmp/ ${vap_name}/""}"
		nvram set br0_ifnames="$br0_ifnames_tmp"
		lan_ifnames_tmp="`nvram get lan_ifnames`"
		echo ${lan_ifnames_tmp} | grep -q ${vap_name} && lan_ifnames_tmp="${lan_ifnames_tmp/ ${vap_name}/""}"
		nvram set lan_ifnames="$lan_ifnames_tmp"
		vifs_tmp="`nvram get ${HOME_WIFI}_vifs`"
		echo ${vifs_tmp} | grep -q "${WDS_WIFI}" && nvram set ${HOME_WIFI}_vifs=""
	fi
}

#AX6000,DWDS MODE
wifi_dwds_config() {
	get_wlan_ini FEATURE_SINGLECHAIN_TEST
	
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
			HOME_WIFI=${NAME_HOME_2G}
			WDS_WIFI=${NAME_WDS_2G}
			GUEST_WIFI=${NAME_GUEST_2G}
			BACKHAUL_WIFI=${NAME_BACKHAUL_2G}
		;;
		5g)
			HOME_WIFI=${NAME_HOME_5G}
			WDS_WIFI=${NAME_WDS_5G}
			GUEST_WIFI=${NAME_GUEST_5G}
			BACKHAUL_WIFI=${NAME_BACKHAUL_5G}
		;;
		5g_2)
			HOME_WIFI=${NAME_HOME_5G2}
			WDS_WIFI=${NAME_WDS_5G2}
			GUEST_WIFI=${NAME_GUEST_5G2}
			BACKHAUL_WIFI=${NAME_BACKHAUL_5G2}
		;;
		6g)
			HOME_WIFI=${NAME_HOME_6G}
			WDS_WIFI=${NAME_WDS_6G}
			GUEST_WIFI=${NAME_GUEST_6G}
			BACKHAUL_WIFI=${NAME_BACKHAUL_6G}
		;;
	esac

	if [ "$eth_enable" = "1" -a "$dwds_sta_enable" = "1" ]; then
		config_get ssid $dwds_vif ssid
		nvram set ${HOME_WIFI}_ssid="$ssid"
        nvram set fwd_wlandevs="${DEVICES}"
        if [ "${FEATURE_SINGLECHAIN_TEST}" = "y" ]; then
            nvram set ${HOME_WIFI}_rxchain="1"
            nvram set ${HOME_WIFI}_txchain="1"
        fi
		
		config_get encryption $dwds_vif encryption
		if [ "$encryption" = "wep" ]; then
			config_get wep_format1 $dwds_vif wep_format1
			if [ "$wep_format1" = "asic" -o "$wep_format1" = "hex" ]; then
				nvram set ${HOME_WIFI}_wep="enabled"
				config_get wep_mode $dwds_vif wep_mode
				if [ "$wep_mode" = "shared" ]; then
					nvram set ${HOME_WIFI}_auth="1"
				else
					nvram set ${HOME_WIFI}_auth="0"
				fi
				nvram set ${HOME_WIFI}_key="1"
				config_get wep_key1 $dwds_vif wep_key1
				nvram set ${HOME_WIFI}_key1="$wep_key1"
				nvram set ${HOME_WIFI}_key2=""
				nvram set ${HOME_WIFI}_key3=""
				nvram set ${HOME_WIFI}_key4=""
				nvram set ${HOME_WIFI}_akm=""
				nvram set ${HOME_WIFI}_nmode="0"
			fi
		elif [ "$encryption" = "psk" ]; then
			nvram set ${HOME_WIFI}_akm="psk psk2 psk2ft"
			config_get psk_key $dwds_vif psk_key
			nvram set ${HOME_WIFI}_wpa_psk="$psk_key"
			nvram set ${HOME_WIFI}_wep="disabled"
			nvram set ${HOME_WIFI}_auth="0"
		elif [ "$encryption" = "none" ]; then
			nvram set ${HOME_WIFI}_akm=""
			nvram set ${HOME_WIFI}_wep="disabled"
			nvram set ${HOME_WIFI}_auth="0"
		else
			echo "ERROR: $dev, unknown wds security" >$CONSOLE
		fi

		nvram unset ${HOME_WIFI}_ure
		nvram set ${HOME_WIFI}_dwds="1"
		nvram set ${HOME_WIFI}_mode="sta"
		nvram unset ${HOME_WIFI}_vifs
		nvram set ${HOME_WIFI}_wps_oob="disabled"
		nvram set ${HOME_WIFI}_ap_isolate="0"
		br0_ifnames_tmp="`nvram get br0_ifnames`"
		echo ${br0_ifnames_tmp} | grep -q ${WDS_WIFI} || nvram set br0_ifnames="$br0_ifnames_tmp ${WDS_WIFI}"
		lan_ifnames_tmp="`nvram get lan_ifnames`"
		echo ${lan_ifnames_tmp} | grep -q ${WDS_WIFI} || nvram set lan_ifnames="$lan_ifnames_tmp ${WDS_WIFI}"

		local ifname_list="${GUEST_WIFI} ${BACKHAUL_WIFI}"

		for ifname in ${ifname_list}; do
			nvram set ${ifname}_bss_enabled="0"
		done

		vap_name="${WDS_WIFI}"

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
		vap_name="${WDS_WIFI}"
		if [ "$eth_enable" = "1" -a "$dwds_ap_enable" = "1" ]; then
			nvram set ${HOME_WIFI}_dwds="1"
		else
			nvram unset ${HOME_WIFI}_dwds
		fi
		nvram set ${HOME_WIFI}_mode="ap"
		nvram set ${vap_name}_radio="0"
		nvram set ${vap_name}_bss_enabled="0"
		nvram unset ${vap_name}_unit
		nvram unset ${vap_name}_ifname
		
		local ifname_list="${GUEST_WIFI} ${BACKHAUL_WIFI} ${WDS_WIFI}"
		
		for ifname in ${ifname_list}; do
			nvram set ${ifname}_hwaddr=""
		done

		br0_ifnames_tmp="`nvram get br0_ifnames`"
		echo ${br0_ifnames_tmp} | grep -q ${vap_name} && br0_ifnames_tmp="${br0_ifnames_tmp/ ${vap_name}/""}"
		nvram set br0_ifnames="$br0_ifnames_tmp"
		lan_ifnames_tmp="`nvram get lan_ifnames`"
		echo ${lan_ifnames_tmp} | grep -q ${vap_name} && lan_ifnames_tmp="${lan_ifnames_tmp/ ${vap_name}/""}"
		nvram set lan_ifnames="$lan_ifnames_tmp"
		vifs_tmp="`nvram get ${HOME_WIFI}_vifs`"
		echo ${vifs_tmp} | grep -q "${WDS_WIFI}" && nvram set ${HOME_WIFI}_vifs=""
	fi
}

# Jiangzheyu@tp-link.com.cn 2019-10-10
# Add backhaul for one-mesh
wifi_backhaul_addif() {
	echo "=====>>>>> band[$band]: wifi_backhaul_addif" >$STDOUT
	local band="$1"
	local brname
	get_brname brname

	case $band in
		2g)
			WIFI_BACKHAUL=${NAME_BACKHAUL_2G}
			vif=${VIF_BACKHAUL_2G}
		;;
		5g)
			WIFI_BACKHAUL=${NAME_BACKHAUL_5G}
			vif=${VIF_BACKHAUL_5G}
		;;
		5g_2)
			WIFI_BACKHAUL=${NAME_BACKHAUL_5G2}
			vif=${VIF_BACKHAUL_5G2}
		;;
		6g)
			WIFI_BACKHAUL=${NAME_BACKHAUL_6G}
			vif=${VIF_BACKHAUL_6G}
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
	get_wlan_ini FEATURE_TRIBAND
	local brname
	local hvlan=$((0x3)) gvlan=0
	
	if [ "${FEATURE_TRIBAND}" = "y" ]; then
		hvlan=$((0x7))
	fi
	
	get_brname brname
	for band in "2g" "5g" "5g_2" "6g"; do
		case $band in
			2g)
				WIFI_BACKHAUL=${NAME_BACKHAUL_2G}
				vif=${VIF_BACKHAUL_2G}
			;;
			5g)
				WIFI_BACKHAUL=${NAME_BACKHAUL_5G}
				vif=${VIF_BACKHAUL_5G}
			;;
			5g_2)
				WIFI_BACKHAUL=${NAME_BACKHAUL_5G2}
				vif=${VIF_BACKHAUL_5G2}
			;;
			6g)
				WIFI_BACKHAUL=${NAME_BACKHAUL_6G}
				vif=${VIF_BACKHAUL_6G}
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
	
	get_wlan_ini PERFIX_WLAN
	get_wlan_ini NUM_MAXASSOC_2G
	get_wlan_ini NUM_MAXASSOC_5G
	get_wlan_ini NUM_MAXASSOC_5G2
	get_wlan_ini NUM_MAXASSOC_6G
	
	local dev="$1"
	local vif=""

	config_get band $dev band
	case $band in
		2g)
			WIFI_DEV=${NAME_HOME_2G}
			WIFI_BACKHAUL=${NAME_BACKHAUL_2G}
			WIFI_UNIT=${NAME_BACKHAUL_2G#*${PERFIX_WLAN}}
			vif=${VIF_BACKHAUL_2G}
			MAXASSOC=${NUM_MAXASSOC_2G}
		;;
		5g)
			WIFI_DEV=${NAME_HOME_5G}
			WIFI_BACKHAUL=${NAME_BACKHAUL_5G}
			WIFI_UNIT=${NAME_BACKHAUL_5G#*${PERFIX_WLAN}}
			vif=${VIF_BACKHAUL_5G}
			MAXASSOC=${NUM_MAXASSOC_5G}
		;;
		5g_2)
			WIFI_DEV=${NAME_HOME_5G2}
			WIFI_BACKHAUL=${NAME_BACKHAUL_5G2}
			WIFI_UNIT=${NAME_BACKHAUL_5G2#*${PERFIX_WLAN}}
			vif=${VIF_BACKHAUL_5G2}
			MAXASSOC=${NUM_MAXASSOC_5G2}
		;;
		6g)
			WIFI_DEV=${NAME_HOME_6G}
			WIFI_BACKHAUL=${NAME_BACKHAUL_6G}
			WIFI_UNIT=${NAME_BACKHAUL_6G#*${PERFIX_WLAN}}
			vif=${VIF_BACKHAUL_6G}
			MAXASSOC=${NUM_MAXASSOC_6G}
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
			if [ "$band" = "6g" ]; then
				nvram set ${WIFI_BACKHAUL}_rnr_hide="1"
			fi
		else
			nvram set ${WIFI_BACKHAUL}_closed="0"
			if [ "$band" = "6g" ]; then
				nvram set ${WIFI_BACKHAUL}_rnr_hide="0"
			fi
		fi
		nvram set ${WIFI_BACKHAUL}_bss_maxassoc="${MAXASSOC}"

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
			HOME_WIFI=${NAME_HOME_2G}
			BACKHAUL_WIFI=${NAME_BACKHAUL_2G}
			GUEST_WIFI=${NAME_GUEST_2G}
		;;
		5g)
			HOME_WIFI=${NAME_HOME_5G}
			BACKHAUL_WIFI=${NAME_BACKHAUL_5G}
			GUEST_WIFI=${NAME_GUEST_5G}
		;;
		5g_2)
			HOME_WIFI=${NAME_HOME_5G2}
			BACKHAUL_WIFI=${NAME_BACKHAUL_5G2}
			GUEST_WIFI=${NAME_GUEST_5G2}
		;;
		6g)
			HOME_WIFI=${NAME_HOME_6G}
			BACKHAUL_WIFI=${NAME_BACKHAUL_6G}
			GUEST_WIFI=${NAME_GUEST_6G}
		;;
		esac

		# set TP IE, dwds_brcm_ie_filter and 11k/v feature
		# dwds_brcm_ie_filter 1: only BRCM STA can associate in the form of 4 addrs
		# dwds_brcm_ie_filter 0: skip the judgement
		for vif in $vifs;do
			config_get onemesh_ie $vif onemesh_ie "on"
			config_get gp_id_rand onemesh group_id
			
			tpie_hw_mac=`uci show network|grep macaddr|sed -n '3p'|awk '{print $2}' -F '='` #LAN MAC as TPIE_MAC
			tpie_mac=${tpie_hw_mac//:/}
			random_suffix="5789"
			gp_id_rand=${gp_id_rand:0:4}
			gp_id_rand="${gp_id_rand:0:2}${gp_id_rand:2:2}"

			[ -n "$gp_id_rand" ] && random_suffix=$gp_id_rand

			if [ "$onemesh_ie" = "on" -a "$onemesh_enable" = "on" ]; then
				# HOME WIFI
				[ "$vif" = "${VIF_HOME_2G}" -o "$vif" = "${VIF_HOME_5G}" -o "$vif" = "${VIF_HOME_5G2}" -o "$vif" = "${VIF_HOME_6G}" ] && {
					wl -i ${HOME_WIFI} add_ie 3 30 00:1d:0f 1001030000${tpie_mac}${tpie_mac}${random_suffix}0000${tpie_mac:8:4}00010000
					echo "=====>>>>>  wl -i ${HOME_WIFI} add_ie 3 30 00:1d:0f 1001030000${tpie_mac}${tpie_mac}${random_suffix}0000${tpie_mac:8:4}00010000" >$CONSOLE
					wl -i ${HOME_WIFI} dwds_brcm_ie_filter 0
					echo "=====>>>>>  wl -i ${HOME_WIFI} dwds_brcm_ie_filter 0" >$CONSOLE
					# enable dynamic nerghbor report, or our nerghbor report response will be empty.
					wl -i ${HOME_WIFI} rrm_nbr_scan 1
				}
				# BACKHAUL WIFI
				[ "$vif" = "${VIF_BACKHAUL_2G}" -o "$vif" = "${VIF_BACKHAUL_5G}" -o "$vif" = "${VIF_BACKHAUL_5G2}" -o "$vif" = "${VIF_BACKHAUL_6G}" ] && {
					wl -i ${BACKHAUL_WIFI} add_ie 3 30 00:1d:0f 1001070000${tpie_mac}${tpie_mac}${random_suffix}0000${tpie_mac:8:4}00010000
					echo "=====>>>>>  wl -i ${BACKHAUL_WIFI} add_ie 3 30 00:1d:0f 1001070000${tpie_mac}${tpie_mac}${random_suffix}0000${tpie_mac:8:4}00010000" >$CONSOLE
					wl -i ${BACKHAUL_WIFI} dwds_brcm_ie_filter 0
					echo "=====>>>>>  wl -i ${BACKHAUL_WIFI} dwds_brcm_ie_filter 0" >$CONSOLE
					# disable the BSS Transition Bit in Extended Capabilities
					wl -i ${BACKHAUL_WIFI} wnm 0
				}
			else
				# HOME WIFI
				[ "$vif" = "${VIF_HOME_2G}" -o "$vif" = "${VIF_HOME_5G}" -o "$vif" = "${VIF_HOME_5G2}" -o "$vif" = "${VIF_HOME_6G}" ] && {
					wl -i ${HOME_WIFI} del_ie 3 30 00:1d:0f 1001030000${tpie_mac}${tpie_mac}${random_suffix}0000${tpie_mac:8:4}00010000
					echo "=====>>>>>  wl -i ${HOME_WIFI} del_ie 3 30 00:1d:0f 1001030000${tpie_mac}${tpie_mac}${random_suffix}0000${tpie_mac:8:4}00010000" >$CONSOLE

					# check TPIE is deleted
					del_ie_check=`wl -i ${HOME_WIFI} list_ie|grep 00:1d:0f`
					[ -n "$del_ie_check" ] && echo "=====>>>>> ERROR! ${HOME_WIFI} TPIE remained after deleting!">$CONSOLE
				}
			fi

			# GUEST WIFI
			[ "$vif" = "${VIF_GUEST_2G}" -o "$vif" = "${VIF_GUEST_5G}" -o "$vif" = "${VIF_GUEST_5G2}" -o "$vif" = "${VIF_GUEST_6G}" ] && {
				# disable the BSS Transition Bit in Extended Capabilities
				wl -i ${GUEST_WIFI} wnm 0
			}

			# smart connect needs wnm too
			wl -i ${HOME_WIFI} wnm 1
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
	get_wlan_ini FEATURE_SINGLECHAIN_TEST

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

	echo "=====>>>>> $dev: wifi_wet_config" >$STDOUT

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
			HOME_WIFI=${NAME_HOME_2G}
			WDS_WIFI=${NAME_WDS_2G}
			GUEST_WIFI=${NAME_GUEST_2G}
			BACKHAUL_WIFI=${NAME_BACKHAUL_2G}
		;;
		5g)
			HOME_WIFI=${NAME_HOME_5G}
			WDS_WIFI=${NAME_WDS_5G}
			GUEST_WIFI=${NAME_GUEST_5G}
			BACKHAUL_WIFI=${NAME_BACKHAUL_5G}
		;;
		5g_2)
			HOME_WIFI=${NAME_HOME_5G2}
			WDS_WIFI=${NAME_WDS_5G2}
			GUEST_WIFI=${NAME_GUEST_5G2}
			BACKHAUL_WIFI=${NAME_BACKHAUL_5G2}
		;;
		6g)
			HOME_WIFI=${NAME_HOME_6G}
			WDS_WIFI=${NAME_WDS_6G}
			GUEST_WIFI=${NAME_GUEST_6G}
			BACKHAUL_WIFI=${NAME_BACKHAUL_6G}
		;;
	esac

	if [ "$eth_enable" = "1" -a "$wet_enable" = "1" ]; then
		config_get ssid $wet_vif ssid
		nvram set ${HOME_WIFI}_ssid="$ssid"
        nvram set fwd_wlandevs="${DEVICES}"
		if [ "${FEATURE_SINGLECHAIN_TEST}" = "y" ]; then
            nvram set ${HOME_WIFI}_rxchain="1"
            nvram set ${HOME_WIFI}_txchain="1"
        fi
		
		config_get encryption $wet_vif encryption
		if [ "$encryption" = "wep" ]; then
			config_get wep_format1 $wet_vif wep_format1
			if [ "$wep_format1" = "asic" -o "$wep_format1" = "hex" ]; then
				nvram set ${HOME_WIFI}_wep="enabled"
				config_get wep_mode $wet_vif wep_mode
				if [ "$wep_mode" = "shared" ]; then
					nvram set ${HOME_WIFI}_auth="1"
				else
					nvram set ${HOME_WIFI}_auth="0"
				fi
				nvram set ${HOME_WIFI}_key="1"
				config_get wep_key1 $wet_vif wep_key1
				nvram set ${HOME_WIFI}_key1="$wep_key1"
				nvram set ${HOME_WIFI}_key2=""
				nvram set ${HOME_WIFI}_key3=""
				nvram set ${HOME_WIFI}_key4=""
				nvram set ${HOME_WIFI}_akm=""
				nvram set ${HOME_WIFI}_nmode="0"
			fi
		elif [ "$encryption" = "psk" ]; then
			nvram set ${HOME_WIFI}_akm="psk psk2 psk2ft"
			config_get psk_key $wet_vif psk_key
			nvram set ${HOME_WIFI}_wpa_psk="$psk_key"
			nvram set ${HOME_WIFI}_wep="disabled"
			nvram set ${HOME_WIFI}_auth="0"
		elif [ "$encryption" = "none" ]; then
			nvram set ${HOME_WIFI}_akm=""
			nvram set ${HOME_WIFI}_wep="disabled"
			nvram set ${HOME_WIFI}_auth="0"
		else
			echo "ERROR: $dev, unknown wds security" >$CONSOLE
		fi

		nvram unset ${HOME_WIFI}_ure
		nvram set ${HOME_WIFI}_mode="wet"
		nvram unset ${HOME_WIFI}_vifs
		nvram set ${HOME_WIFI}_wps_oob="disabled"
		nvram set ${HOME_WIFI}_ap_isolate="0"
		br0_ifnames_tmp="`nvram get br0_ifnames`"
		echo ${br0_ifnames_tmp} | grep -q ${WDS_WIFI} || nvram set br0_ifnames="$br0_ifnames_tmp ${WDS_WIFI}"
		lan_ifnames_tmp="`nvram get lan_ifnames`"
		echo ${lan_ifnames_tmp} | grep -q ${WDS_WIFI} || nvram set lan_ifnames="$lan_ifnames_tmp ${WDS_WIFI}"

		local ifname_list="${GUEST_WIFI} ${BACKHAUL_WIFI}"

		for ifname in ${ifname_list}; do
			nvram set ${ifname}_bss_enabled="0"
		done

		vap_name="${WDS_WIFI}"

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
		vap_name="${WDS_WIFI}"
		nvram set ${vap_name}_radio="0"
		nvram set ${vap_name}_bss_enabled="0"
		nvram unset ${vap_name}_unit
		nvram unset ${vap_name}_ifname
		
		local ifname_list="${GUEST_WIFI} ${BACKHAUL_WIFI} ${WDS_WIFI}"
		
		for ifname in ${ifname_list}; do
			nvram set ${ifname}_hwaddr=""
		done

		br0_ifnames_tmp="`nvram get br0_ifnames`"
		echo ${br0_ifnames_tmp} | grep -q ${vap_name} && br0_ifnames_tmp="${br0_ifnames_tmp/ ${vap_name}/""}"
		nvram set br0_ifnames="$br0_ifnames_tmp"
		lan_ifnames_tmp="`nvram get lan_ifnames`"
		echo ${lan_ifnames_tmp} | grep -q ${vap_name} && lan_ifnames_tmp="${lan_ifnames_tmp/ ${vap_name}/""}"
		nvram set lan_ifnames="$lan_ifnames_tmp"
		vifs_tmp="`nvram get ${HOME_WIFI}_vifs`"
		echo ${vifs_tmp} | grep -q "${WDS_WIFI}" && nvram set ${HOME_WIFI}_vifs=""
	fi
	echo "=====>>>>> $dev: end wifi_wet_config" >$STDOUT
}
#END    2019-6-17

wifi_guest_config() {

	get_wlan_ini PERFIX_WLAN
	get_wlan_ini NUM_MAXASSOC_2G
	get_wlan_ini NUM_MAXASSOC_5G
	get_wlan_ini NUM_MAXASSOC_5G2
	get_wlan_ini NUM_MAXASSOC_6G

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
			HOME_WIFI=${NAME_HOME_2G}
			GUEST_WIFI=${NAME_GUEST_2G}
			WIFI_UNIT=${NAME_GUEST_2G#*${PERFIX_WLAN}}
			MAXASSOC=${NUM_MAXASSOC_2G}
		;;
		5g)
			HOME_WIFI=${NAME_HOME_5G}
			GUEST_WIFI=${NAME_GUEST_5G}
			WIFI_UNIT=${NAME_GUEST_5G#*${PERFIX_WLAN}}
			MAXASSOC=${NUM_MAXASSOC_5G}
		;;
		5g_2)
			HOME_WIFI=${NAME_HOME_5G2}
			GUEST_WIFI=${NAME_GUEST_5G2}
			WIFI_UNIT=${NAME_GUEST_5G2#*${PERFIX_WLAN}}
			MAXASSOC=${NUM_MAXASSOC_5G2}
		;;
		6g)
			HOME_WIFI=${NAME_HOME_6G}
			GUEST_WIFI=${NAME_GUEST_6G}
			WIFI_UNIT=${NAME_GUEST_6G#*${PERFIX_WLAN}}
			MAXASSOC=${NUM_MAXASSOC_6G}
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
			if [ "$band" = "6g" ]; then
				nvram set ${GUEST_WIFI}_rnr_hide="1"
			fi
		else
			nvram set ${GUEST_WIFI}_closed="0"
			if [ "$band" = "6g" ]; then
				nvram set ${GUEST_WIFI}_rnr_hide="0"
			fi
		fi
		nvram set ${GUEST_WIFI}_bss_maxassoc="${MAXASSOC}" #need to check guestNet num

		if [ "$encryption" == "none" ]; then
			nvram set ${GUEST_WIFI}_wep="disabled"
			nvram set ${GUEST_WIFI}_auth="0"
			nvram set ${GUEST_WIFI}_akm=""
			nvram set ${GUEST_WIFI}_mfp="0"
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
				nvram set ${HOME_WIFI}_nmode="0"
				config_get channel $dev channel
				if [ "$channel" = "auto" ]; then
					nvram set ${HOME_WIFI}_chanspec="0"
				else
					nvram set ${HOME_WIFI}_chanspec="$channel"
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
			nvram set ${GUEST_WIFI}_mfp="0"
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
			nvram set ${GUEST_WIFI}_mfp="0"
		#add by xuyaming for owe	
		elif [ "$encryption" == "owe" ]; then
			#only support owe_only
			nvram set ${GUEST_WIFI}_akm="owe"
			nvram set ${GUEST_WIFI}_crypto="aes"
			nvram set ${GUEST_WIFI}_mfp="2"
			nvram set ${GUEST_WIFI}_wep="disabled"
			nvram set ${GUEST_WIFI}_auth="0"
		else
			nvram set ${GUEST_WIFI}_wep="disabled"
			nvram set ${GUEST_WIFI}_auth="0"
			nvram set ${GUEST_WIFI}_akm=""
			nvram set ${GUEST_WIFI}_mfp="0"
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
		local cur_mode=`nvram get ${HOME_WIFI}_mode`
		if [ "$cur_mode" = "ap" ]; then
			nvram set ${HOME_WIFI}_vifs="${GUEST_WIFI}"
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

wifi_vifs_switch() {
	local dev="$1"
	local vif=""
	local rftestflag=`nvram kget rftestflag`
	local btntestflag=`nvram kget btntestflag`
	config_get_bool wifi_disabled $dev disabled       #hardware switch
	config_get_bool soft_disabled $dev disabled_all   #software switch
	if [ "$wifi_disabled" = "0" -a "$soft_disabled" = "0" ]; then
		config_get vifs $dev vifs
		for vif in $vifs; do
			config_get_bool enable $vif enable
			config_get mode $vif mode
			config_get guest $vif guest
			config_get backhaul $vif backhaul
			if [ "$mode" = "ap" -a "$enable" = "1" -a -z "$guest" -a -z "$backhaul" ]; then
				config_get band $dev band
				case $band in
					2g)
						HOME_WIFI=${NAME_HOME_2G}
					;;
					5g)
						HOME_WIFI=${NAME_HOME_5G}
					;;
					5g_2)
						HOME_WIFI=${NAME_HOME_5G2}
					;;
					6g)
						HOME_WIFI=${NAME_HOME_6G}
					;;
				esac
				echo "=====>>>>> wifi_vifs_switch $dev: vif $vif is enabled, nvram set ${HOME_WIFI}_bss_up=1" >$STDOUT
				nvram set "${HOME_WIFI}"_bss_up="1"
			elif [ "$mode" = "ap" -a -z "$guest" -a -z "$backhaul" ]; then
				config_get band $dev band
				case $band in
					2g)
						HOME_WIFI=${NAME_HOME_2G}
					;;
					5g)
						HOME_WIFI=${NAME_HOME_5G}
					;;
					5g_2)
						HOME_WIFI=${NAME_HOME_5G2}
					;;
					6g)
						HOME_WIFI=${NAME_HOME_6G}
					;;
				esac
				echo "=====>>>>> wifi_vifs_switch $dev: vif $vif is enabled, nvram set ${HOME_WIFI}_bss_up=0" >$STDOUT
				nvram set "${HOME_WIFI}"_bss_up="0"
			elif [ "$mode" = "ap" -a "$guest" = "on" -a "$enable" = "1" -a "$rftestflag" = "1" -a "$btntestflag" = "1" ]; then
				config_get band $dev band
				case $band in
					2g)
						GUEST_WIFI=${NAME_GUEST_2G}
					;;
					5g)
						GUEST_WIFI=${NAME_GUEST_5G}
					;;
					5g_2)
						GUEST_WIFI=${NAME_GUEST_5G2}
					;;
					6g)
						GUEST_WIFI=${NAME_GUEST_6G}
					;;
				esac
				echo "=====>>>>> wifi_vifs_switch $dev: vif $vif is enabled, nvram set ${GUEST_WIFI}_bss_up=1" >$STDOUT
				nvram set "${GUEST_WIFI}"_bss_up="1"
			elif [ "$mode" = "ap" -a "$guest" = "on" ]; then
				config_get band $dev band
				case $band in
					2g)
						GUEST_WIFI=${NAME_GUEST_2G}
					;;
					5g)
						GUEST_WIFI=${NAME_GUEST_5G}
					;;
					5g_2)
						GUEST_WIFI=${NAME_GUEST_5G2}
					;;
					6g)
						GUEST_WIFI=${NAME_GUEST_6G}
					;;
				esac
				echo "=====>>>>> wifi_vifs_switch $dev: vif $vif is disabled, nvram set ${GUEST_WIFI}_bss_up=0" >$STDOUT
				nvram set "${GUEST_WIFI}"_bss_up="0"
			elif [ "$mode" = "ap" -a "$enable" = "1" -a "$backhaul" = "on" -a "$rftestflag" = "1" -a "$btntestflag" = "1" ]; then
				config_get band $dev band
				case $band in
					2g)
						BACKHAUL_WIFI=${NAME_BACKHAUL_2G}
					;;
					5g)
						BACKHAUL_WIFI=${NAME_BACKHAUL_5G}
					;;
					5g_2)
						BACKHAUL_WIFI=${NAME_BACKHAUL_5G2}
					;;
					6g)
						BACKHAUL_WIFI=${NAME_BACKHAUL_6G}
					;;
				esac
				echo "=====>>>>> wifi_vifs_switch $dev: vif $vif is enabled, nvram set ${BACKHAUL_WIFI}_bss_up=1" >$STDOUT
				nvram set "${BACKHAUL_WIFI}"_bss_up="1"
			elif [ "$mode" = "ap" -a "$backhaul" = "on" ]; then
				config_get band $dev band
				case $band in
					2g)
						BACKHAUL_WIFI=${NAME_BACKHAUL_2G}
					;;
					5g)
						BACKHAUL_WIFI=${NAME_BACKHAUL_5G}
					;;
					5g_2)
						BACKHAUL_WIFI=${NAME_BACKHAUL_5G2}
					;;
					6g)
						BACKHAUL_WIFI=${NAME_BACKHAUL_6G}
					;;
				esac
				echo "=====>>>>> wifi_vifs_switch $dev: vif $vif is disabled, nvram set ${BACKHAUL_WIFI}_bss_up=0" >$STDOUT
				nvram set "${BACKHAUL_WIFI}"_bss_up="0"
			fi
		done
	fi
}

start_eapd(){
	eapd 
}

start_nas(){
	if [ $( nvram get hapd_enable ) != "1" ]; then
		nas 
	fi
}

start_hostapd(){
	if [ $( nvram get hapd_enable ) == "1" ]; then
		hapdsupport -n >$STDOUT
		sleep 2
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

start_acsd2(){
	local rftestflag=`nvram kget rftestflag`
	local btntestflag=`nvram kget btntestflag`
	nvram set acs_ifnames="${DEVICES}"
	if [ "$rftestflag" = "1" -a "$btntestflag" = "1" ]; then
		local loop_cnt=0
		local max_loop=10
		acsd2
		echo "acsd2 start errno $?" >$CONSOLE
		while [ $(pgrep -f acsd2|wc -l) -eq 0 ] && [ $loop_cnt -lt $max_loop ]
		do
			let loop_cnt+=1
			echo "acsd2 start failed, sleep 1s and try again(${loop_cnt})" >$CONSOLE
			sleep 1
			acsd2
		done
	fi
	#utelnetd -d -i br-lan&
}

start_dhd_monitor(){
    debug_monitor /tmp/crash_logs
}

start_bsd(){
    bsd
}

start_ceventd(){
    ceventd
}

start_nrd(){
	/etc/init.d/nrd start
}

start_rnrd(){
	rnrd
}

stop_eapd(){
	killall eapd
}

stop_nas(){
	if [ $( nvram get hapd_enable ) != "1" ]; then
		killall nas
	fi
}

stop_hostapd(){
	if [ $( nvram get hapd_enable ) == "1" ]; then
		hapdsupport -s >$STDOUT
	fi
}

stop_wps(){
	if [ $( nvram get hapd_enable ) != "1" ]; then
		killall wps_monitor
	fi
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

stop_rnrd(){
	killall rnrd
}

start_service(){
	get_wlan_ini FEATURE_DHD_MONITOR
	get_wlan_ini FEATURE_CEVENTD

	start_eapd
	if [ "${FEATURE_CEVENTD}" = "y" ];then
		start_ceventd	
	else
		echo "====> NO FEATURE_CEVENTD" >$STDOUT
	fi
	start_nas
	start_wps
	start_acsd2
	#last call start_dhd_monitor
	if [ "${FEATURE_DHD_MONITOR}" = "y" ];then
	start_dhd_monitor
	else
		echo "====> NO FEATURE_DHD_MONITOR" >$STDOUT
	fi
	start_nrd
}

stop_service(){
	get_wlan_ini FEATURE_DHD_MONITOR
	get_wlan_ini FEATURE_CEVENTD

	#first call stop_dhd_monitor
	if [ "${FEATURE_DHD_MONITOR}" = "y" ];then
	stop_dhd_monitor
	fi
	if [ "${FEATURE_CEVENTD}" = "y" ];then
		stop_ceventd
	fi
	stop_wps
	stop_nas
	stop_hostapd
	stop_eapd
	stop_acsd2
	stop_nrd
	stop_rnrd
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
	get_wlan_ini FEATURE_TRIBAND
	get_wlan_ini FEATURE_EXTERNAL_WLTEST
	
	local app_name="rftest2"
	local brname
	local host_ip

	if [ "${FEATURE_TRIBAND}" = "y" ]; then
		app_name="rftest-triband2"
	fi

	killall "$app_name"

	if [ "${FEATURE_EXTERNAL_WLTEST}" = "y" ]; then
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
		./"$app_name" -n
	else
		"$app_name" -n
	fi
	
	echo "======>>>>>start ${app_name}!!" >/dev/console
	
}

wifi_insmod_dhd_test(){
	get_wlan_ini FEATURE_EXTERNAL_WLTEST
	get_wlan_ini FEATURE_DRIVER_NIC
	get_wlan_ini FEATURE_DRIVER_DONGLE
	get_wlan_ini FEATURE_DRIVER_NIC_INTF_NAME
	get_wlan_ini FEATURE_DRIVER_NIC_INSTANCE_BASE
	get_wlan_ini FEATURE_DRIVER_DONGLE_IFACE_NAME
	get_wlan_ini FEATURE_DRIVER_DONGLE_INSTANCE_BASE
	get_wlan_ini FEATURE_DRIVER_DONGLE_CORE
	local wltestko_name="wl.ko"
	local wltestko_tar_name="wltest.tgz"
	local brname
	local host_ip
	local dongle_core
	module_name_dhd="dhd"
	module_name_wl="wl"

	if [ "${FEATURE_EXTERNAL_WLTEST}" = "y" ]; then
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
	else
		cd /lib/tp
	fi
	
	#rmmod useless ko for enough memory
	/etc/init.d/url_class stop
	/etc/init.d/parental_control stop
	rmmod xt_pctl.ko
	rmmod blockingx.ko
	rmmod thfsplus.ko
	rmmod tntfs.ko
	rmmod tfat.ko
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
	if [ "${FEATURE_DRIVER_DONGLE}" = "y" ]; then
		module_params="iface_name=wl2"
		instance_base="instance_base=2"
		[ -n "${FEATURE_DRIVER_DONGLE_IFACE_NAME}" ] && module_params="iface_name=${FEATURE_DRIVER_DONGLE_IFACE_NAME}"
		[ -n "${FEATURE_DRIVER_DONGLE_INSTANCE_BASE}" ] && instance_base="instance_base=${FEATURE_DRIVER_DONGLE_INSTANCE_BASE}"
		module_params=$module_params" "$instance_base
		
		dongle_core=${FEATURE_DRIVER_DONGLE_CORE}
		cp -s -f /lib/tp/rtecdc.bin /etc/wlan/dhd/${dongle_core}/rtecdc.bin
		
		grep -q '^'$module_name_dongle'\>' /proc/modules || insmod $module_name_dhd $module_params
		grep -q '^'$module_name_dongle'\>' /proc/modules || echo "insmod ${module_name_dongle}.ko failed." >$STDOUT
	fi
	
	if [ "${FEATURE_DRIVER_NIC}" = "y" ]; then
		module_params="intf_name=wl%d"
		instance_base="instance_base=0"
		[ -n "${FEATURE_DRIVER_NIC_INTF_NAME}" ] && module_params="intf_name=${FEATURE_DRIVER_NIC_INTF_NAME}"
		[ -n "${FEATURE_DRIVER_NIC_INSTANCE_BASE}" ] && instance_base="instance_base=${FEATURE_DRIVER_NIC_INSTANCE_BASE}"
		module_params=$module_params" "$instance_base
		
		grep -q '^'$module_name_wl'\>' /proc/modules || insmod ./$wltestko_name $module_params
		grep -q '^'$module_name_wl'\>' /proc/modules || echo "insmod wl_wltest.ko failed." >$STDOUT 
	fi
	echo "=====>>>>insmod wltest.ko!!!!" >/dev/console
	wifi_features_set
}

wifi_start_calibrate(){
	echo "=====>>>>> wifi_start_calibrate" >$STDOUT
	get_wlan_ini FEATURE_EXTERNAL_WLTEST
	/etc/init.d/telnet start

	wifi_insmod_dhd_test

	wifi_start_rftest
}

wifi_driver_startup(){
	echo "=====>>>>> wifi_driver_startup" >$STDOUT
	
	get_wlan_ini FEATURE_DRIVER_NIC
	get_wlan_ini FEATURE_DRIVER_DONGLE
	get_wlan_ini FEATURE_DRIVER_NIC_INTF_NAME
	get_wlan_ini FEATURE_DRIVER_NIC_INSTANCE_BASE
	get_wlan_ini FEATURE_DRIVER_DONGLE_IFACE_NAME
	get_wlan_ini FEATURE_DRIVER_DONGLE_INSTANCE_BASE
	
	local module_name_dongle="dhd"
	local module_name_nic="wl"

	local rftestflag=`nvram kget rftestflag`
	local btntestflag=`nvram kget btntestflag`
	
	# NIC MODE "No dhd.ko"
	# DONGLE MODE "insmod dhd.ko"
	if [ "$rftestflag" = "1" -a "$btntestflag" = "1" ]; then
		echo "=====>>>>> dongle firmware_path is normal" >$CONSOLE	
		#for t10 button dection
		echo 1 >/proc/rftestflag_file
		
		# insmod dhd.ko & wl.ko first
		if [ "${FEATURE_DRIVER_DONGLE}" = "y" ]; then
			module_params="iface_name=wl2"
			instance_base="instance_base=2"
			[ -n "${FEATURE_DRIVER_DONGLE_IFACE_NAME}" ] && module_params="iface_name=${FEATURE_DRIVER_DONGLE_IFACE_NAME}"
			[ -n "${FEATURE_DRIVER_DONGLE_INSTANCE_BASE}" ] && instance_base="instance_base=${FEATURE_DRIVER_DONGLE_INSTANCE_BASE}"
			module_params=$module_params" "$instance_base
			echo "=====>>>>> insmod $module_name_dongle $module_params" >$CONSOLE
			grep -q '^'$module_name_dongle'\>' /proc/modules || insmod $module_name_dongle $module_params
			grep -q '^'$module_name_dongle'\>' /proc/modules || echo "insmod ${module_name_dongle}.ko failed." >$STDOUT
		fi
		if [ "${FEATURE_DRIVER_NIC}" = "y" ]; then
			module_params="intf_name=wl%d"
			instance_base="instance_base=0"
			[ -n "${FEATURE_DRIVER_NIC_INTF_NAME}" ] && module_params="intf_name=${FEATURE_DRIVER_NIC_INTF_NAME}"
			[ -n "${FEATURE_DRIVER_NIC_INSTANCE_BASE}" ] && instance_base="instance_base=${FEATURE_DRIVER_NIC_INSTANCE_BASE}"
			module_params=$module_params" "$instance_base
			echo "=====>>>>> insmod $module_name_nic $module_params" >$CONSOLE
			grep -q '^'$module_name_nic'\>' /proc/modules || insmod $module_name_nic $module_params
			grep -q '^'$module_name_nic'\>' /proc/modules || echo "insmod ${module_name_nic}.ko failed." >$STDOUT
		fi
		wifi_features_set
		#execute wifi_features_set in  wifi_insmod_dhd_test when not calibrated
		#set features before rftest
	else
		echo 0 >/proc/rftestflag_file
	fi
}

wifi_features_set(){
	get_wlan_ini FEATURE_AMSDU_AGGSF
	get_wlan_ini AMSDU_AGGSF_2G
	get_wlan_ini AMSDU_AGGSF_5G
	get_wlan_ini AMSDU_AGGSF_5G2
	get_wlan_ini AMSDU_AGGSF_6G
	
	get_wlan_ini FEATURE_AMSDU_MAX_MSDU_NUM
	get_wlan_ini AMSDU_MAX_MSDU_NUM_2G
	get_wlan_ini AMSDU_MAX_MSDU_NUM_5G
	get_wlan_ini AMSDU_MAX_MSDU_NUM_5G2
	get_wlan_ini AMSDU_MAX_MSDU_NUM_6G

	local rftestflag=`nvram kget rftestflag`
	local btntestflag=`nvram kget btntestflag`
	config_get onemesh_enable onemesh enable "on"

	local host_max_qlen
	
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


			# add mu_edca switch, default(off, no mu_edca IE, Ext Tag Number: MU EDCA Parameter Set (38))
			local ofdma=`uci get wireless.ofdma.enable` 
			config_get mu_mimo $vap0 mu_mimo
			if [ "$ofdma" = "off" -a "$mu_mimo" = "off" ]; then
				wl -i "$vap0" he muedca_blocked 1
			else
				wl -i "$vap0" he muedca_blocked 0
			fi

			
			if [ "${FEATURE_AMSDU_MAX_MSDU_NUM}" = "y" ]; then
				if [ "$band" = "2g" ]; then
					wl -i "$vap0" amsdu_max_msdu_num ${AMSDU_MAX_MSDU_NUM_2G}
				elif [ "$band" = "5g" ]; then
					wl -i "$vap0" amsdu_max_msdu_num ${AMSDU_MAX_MSDU_NUM_5G}
				elif [ "$band" = "5g_2" ]; then
					wl -i "$vap0" amsdu_max_msdu_num ${AMSDU_MAX_MSDU_NUM_5G2}
				elif [ "$band" = "6g" ]; then
					wl -i "$vap0" amsdu_max_msdu_num ${AMSDU_MAX_MSDU_NUM_6G}
				fi
			else
				echo "=====> NO FEATURE_AMSDU_MAX_MSDU_NUM" >$STDOUT
			fi

			get_wlan_ini FEATURE_LIMIT_DHD_HOST_MAX_QLEN
			if [ "${FEATURE_LIMIT_DHD_HOST_MAX_QLEN}" = "y" ]; then
				if [ "$band" = "2g" ]; then
					get_wlan_ini DHD_HOST_MAX_QLEN_2G
					host_max_qlen=${DHD_HOST_MAX_QLEN_2G}
				elif [ "$band" = "5g" ]; then
					get_wlan_ini DHD_HOST_MAX_QLEN_5G
					host_max_qlen=${DHD_HOST_MAX_QLEN_5G}
				elif [ "$band" = "5g_2" ]; then
					get_wlan_ini DHD_HOST_MAX_QLEN_5G2
					host_max_qlen=${DHD_HOST_MAX_QLEN_5G2}
				elif [ "$band" = "6g" ]; then
					get_wlan_ini DHD_HOST_MAX_QLEN_6G
					host_max_qlen=${DHD_HOST_MAX_QLEN_6G}
				fi
				if [ "${host_max_qlen}" != "" ]; then
					dhd -i "$vap0" host_max_qlen ${host_max_qlen}
				fi	
			else
				echo "=====> NO FEATURE_LIMIT_DHD_HOST_MAX_QLEN" >$STDOUT
			fi

			brctl addif "$brname" "$vap0"
			ifconfig "$vap0" up
			wlconf "$vap0" up
			
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
			
			if [ "${FEATURE_AMSDU_AGGSF}" = "y" ]; then
				if [ "$band" = "2g" ]; then
					wl -i "$vap0" amsdu_aggsf ${AMSDU_AGGSF_2G}
				elif [ "$band" = "5g" ]; then
					wl -i "$vap0" amsdu_aggsf ${AMSDU_AGGSF_5G}
				elif [ "$band" = "5g_2" ]; then
					wl -i "$vap0" amsdu_aggsf ${AMSDU_AGGSF_5G2}
				elif [ "$band" = "6g" ]; then
					wl -i "$vap0" amsdu_aggsf ${AMSDU_AGGSF_6G}
				fi
			else
				echo "=====> NO FEATURE_AMSDU_AGGSF" >$STDOUT
			fi
		else
			wlconf "$vap0" down
		fi
	done

	#add TP IE
	wifi_onemesh_config

	#start programs
	start_service 

	#for band in "2g" "5g" "5g_2" "6g"; do
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
		wifi_vifs_switch $vap0
	done

	start_hostapd

	start_rnrd

	wifi_vlan notaddif

	if [ "$rftestflag" = "1" -a "$btntestflag" = "1" -a "$onemesh_enable" = "on" ]; then
		wifi_backhaul_addvlan
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

	#for band in "5g_2" "2g" "5g" "6g"; do
	for dev in ${1:-$DEVICES}; do
		config_get band "$dev" band

		eval local vap0=\${vap0_$band} vap1=\${vap1_$band}
		eval local home=\${home_$band} guest=\${guest_$band} bridge=\${bridge_$band}
		eval local mac=\${mac_$band}

		for ifd in "$vap0" "$vap1"; do 
			wlconf "$ifd" down
			ifconfig "$ifd" down
			brctl delif "$brname" "$ifd" 
		done
		
		#TODO set only for wds ?
		ifconfig "$vap1" hw ether $(fix_vif_mac $mac "stop")
	done
	
	# stop programs
	# kill hostapd after `wlconf down`, or the dwds interface will end abnormally
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
	get_wlan_ini FEATURE_TRIBAND
	get_wlan_ini FEATURE_6G
	
	if [ "${FEATURE_TRIBAND}" = "y" ] && [ "${FEATURE_6G}" != "y" ]; then
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
					ifname_2g=${VIF_HOME_2G}
				;;
				5g)
					ifname_5g=${VIF_HOME_5G}
				;;
				5g_2)
					ifname_5g2=${VIF_HOME_5G2}
				;;
			esac
		done
		
		config_load wireless
		config_get ssid_2g $ifname_2g ssid
		config_get ssid_5g $ifname_5g ssid
		[ -n "$ifname_5g2" ] && config_get ssid_5g2 $ifname_5g2 ssid

		config_get encryption_2g $ifname_2g encryption
		config_get encryption_5g $ifname_5g encryption
		[ -n "$ifname_5g2" ] && config_get encryption_5g2 $ifname_5g2 encryption

		config_get key_2g $ifname_2g psk_key
		config_get key_5g $ifname_5g psk_key
		[ -n "$ifname_5g2" ] && config_get key_5g2 $ifname_5g2 psk_key

		config_get enable_2g $ifname_2g enable
		config_get enable_5g $ifname_5g enable
		[ -n "$ifname_5g2" ] && config_get enable_5g2 $ifname_5g2 enable

		# Band steering is ON, only when at least one 5G or 6G interface's
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

		local ifname_list="${NAME_HOME_2G} ${NAME_HOME_5G} ${NAME_HOME_5G2} ${NAME_HOME_6G}"

		for ifname in ${ifname_list}; do
		   wl -i ${ifname} wnm 1
		done
	
	else
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
			# only for AX20, bsd has some problem, use band-steering in nrd instead
			# start_bsd
		elif [ "${smart_enable}" = "off" ]; then
			stop_bsd
		fi
	fi
}

wifi_smart() {
	echo "=====>>>>> wifi_smart()" >$STDOUT
	get_wlan_ini FEATURE_TRIBAND
	get_wlan_ini FEATURE_6G

	if [ "${FEATURE_TRIBAND}" = "y" ] && [ "${FEATURE_6G}" != "y" ]; then
		wifi_smart_config
	else
		stop_nrd
		wifi_smart_config
		# FIXME: Here reload wifi to make wlX_rrm take effect,
		# but if 2.4G/5G SSID is different, wifi will be reloaded twice.
		wifi_reload
		start_nrd
	fi
}

# close advance features for factory test
wifi_factory_close_config() {
	local dev="$1"
	config_get band $dev band
	local HOME_WIFI=""
	case $band in
		2g)
			HOME_WIFI=${NAME_HOME_2G}
		;;
		5g)
			HOME_WIFI=${NAME_HOME_5G}
		;;
		5g_2)
			HOME_WIFI=${NAME_HOME_5G2}
		;;
		6g)
			HOME_WIFI=${NAME_HOME_6G}
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
	get_wlan_ini FEATURE_WDS
	get_wlan_ini FEATURE_WDS_TYPE

	local rftestflag=`nvram kget rftestflag`
	local btntestflag=`nvram kget btntestflag`
	config_get onemesh_enable onemesh enable "on"
	
	for dev in ${DEVICES}; do  # wl0 wl1
		wifi_basic_config $dev
		wifi_security_config $dev
		wifi_macfilter_config $dev
		wifi_advanced_config $dev
		wifi_atf_config $dev
		wifi_acs_config $dev
		wifi_mu_mimo_config $dev
		wifi_wps_config $dev

		if [ "$rftestflag" = "1" -a "$btntestflag" = "1" ]; then		
			if [ "${FEATURE_WDS}" = "y" ]; then
				if [ "${FEATURE_WDS_TYPE}" = "wds" ]; then
					wifi_wds_config $dev
				elif [ "${FEATURE_WDS_TYPE}" = "psta" ]; then
					wifi_psta_config $dev
				elif [ "${FEATURE_WDS_TYPE}" = "wet" ]; then
					#lizhou@tp-link.com.cn    2019-6-17
					#enable wet
					wifi_wet_config $dev
                #END    2019-6-17
				elif [ "${FEATURE_WDS_TYPE}" = "dwds" ]; then
					wifi_dwds_config $dev
				fi
			else
				echo "=====>>>>> NO FEATURE_WDS" >$STDOUT
			fi
			wifi_guest_config $dev
			
			[ "$onemesh_enable" = "on" ] && wifi_backhaul_config $dev
		fi
		wifi_factory_close_config $dev	# the last one
	done
}

#
# Plus nvram for hw debug and so on
#
wifi_nvram_plus_config()
{
	if [ -z $WIFI_NVRAM_PLUS_FILE ]; then
		WIFI_NVRAM_PLUS_FILE=$WIFI_NVRAM_PLUS_FILE_DEFAULT
	fi

	if [ -e $WIFI_NVRAM_PLUS_FILE ]; then
		echo "=====>>>>> wifi_nvram_plus_config read $WIFI_NVRAM_PLUS_FILE" >$CONSOLE
		while read -r line; do
			nvram kset $line
		done < $WIFI_NVRAM_PLUS_FILE
	fi
}

wifi_calibrate_data_check() {
	echo "=====>>>>> wifi_calibrate_data_check" >$CONSOLE

	local cal_cbr_name="cal_cbr2"
	local radio_bk_name="radio_bk"
	local radio_sec_bk_name="radio_sec_bk"
	local temp_file_name="/tmp/par_tbl"

	pro_id=`getfirm PRODUCT_ID`
	nvrammanager -r "$temp_file_name" -p "$radio_bk_name"
	"$cal_cbr_name" "$temp_file_name" "$pro_id" "$radio_bk_name"
	#cal_cbr2 return value:
	#  		0, OK
	# -1(255), parameters error
	# -2(254), has_been_calibrated check fail(backup failed/restore failed/has not been calibrated)
	if [ "$?" != "0" ]; then
		#radio_bk partition is dirty, read calibrate_data from radio_sec_bk_name
		nvrammanager -r "$temp_file_name" -p "$radio_sec_bk_name"
		"$cal_cbr_name" "$temp_file_name" "$pro_id" "$radio_sec_bk_name"
		if [ "$?" != "0" ]; then
			echo "yes" > $RFTEST_NEED_RUN_FILE
		else
			#recover radio_bk partition from radio_sec_bk
			echo "=====>>>>> recover "$radio_bk_name" partition from "$radio_sec_bk_name >$CONSOLE
			nvrammanager -w "$temp_file_name" -p "$radio_bk_name"
		fi
	fi
	
	rm -f "$temp_file_name"
}

wifi_start_rftest_check() {
	get_wlan_ini FEATURE_LED

	if [ -e $RFTEST_NEED_RUN_FILE ]; then
		echo "!!! no rftestflag, need to calibrate! start to calibrate....." >/dev/console
		if [ "${FEATURE_LED}" = "y" ]; then
		wifi_sys_led_flick &
		else
			echo "=====>>>>> NO FEATURE_LED" >$STDOUT
		fi
		#/etc/init.d/phyport start
		wifi_start_calibrate
		rm -f $RFTEST_NEED_RUN_FILE
	else
		echo "!!! rftestflag is exist....." >/dev/console
	fi

	if [ "${FEATURE_LED}" = "y" ]; then
	wifi_led_set
	fi
	
	echo "inited" >/tmp/wifi_state #tell others wifi is inited
}

##
## led
##
wifi_sys_led_flick(){
	get_wlan_ini LED_FACTORY_MODE
	
	if [ "${LED_FACTORY_MODE}" = "default" ]; then
		wifi_sys_led_flick_default
	elif [ "${LED_FACTORY_MODE}" = "lp5523" ]; then
		wifi_sys_led_flick_lp5523
	fi
}

wifi_led_set() {
	get_wlan_ini LED_NORMAL_MODE
	
	if [ "${LED_NORMAL_MODE}" = "default" ]; then
		wifi_led_set_default
	elif [ "${LED_NORMAL_MODE}" = "lp5523" ]; then
		wifi_led_set_lp5523
	fi
}

wifi_sys_led_flick_default(){
	get_wlan_ini FEATURE_TRIBAND

	hz=2		#flick 2 times per second
	sleeptime=`expr 1000000 / $hz / 2`
	while true
	do
		ledcli WIFI2G_ON
		ledcli WIFI5G_ON
		if [ "${FEATURE_TRIBAND}" = "y" ]; then
			ledcli WIFI5G_2_ON
			ledcli WIFI6G_ON
		fi
		usleep $sleeptime
		ledcli WIFI2G_OFF
		ledcli WIFI5G_OFF
		if [ "${FEATURE_TRIBAND}" = "y" ]; then
			ledcli WIFI5G_2_OFF
			ledcli WIFI6G_OFF
		fi
		usleep $sleeptime
	done
}

wifi_led_set_default() 
{
	local led_state=""

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
		elif [ "$band" == "6g" ] ; then
			band="WIFI6G" 
		fi
		
		ledcli ${band}_${led_state}
	done
}

##
## Add for LED lp5523(LED_NORMAL_MODE)
##
wifi_led_set_lp5523()
{
    local led_state=""
    local wifi_2g_off=0
    local wifi_5g_off=0
    local wifi_6g_off=0

    local lp5523_flag=$(uci get profile.@lp5523[0].message -c /etc/profile.d)

    if [ "$lp5523_flag" == "chip-on" ]; then
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
			if [ "$band" = "2g" -a "$led_state" = "OFF" ] ; then
				wifi_2g_off=1
			elif [ "$band" == "5g" -a "$led_state" = "OFF" ] ; then
				wifi_5g_off=1
			elif [ "$band" == "6g" -a "$led_state" = "OFF" ]; then
				wifi_6g_off=1
			fi

		done

		if [ "$wifi_2g_off" = "1" -a "$wifi_5g_off" = "1"  -a "$wifi_6g_off" = "1" ] ; then
				ubus send leds '{"action" : "2", "status" : "0"}'
		else
				ubus send leds '{"action" : "2", "status" : "1"}'
		fi	
	fi	
}

##
## Add for LED lp5523(LED_FACTORY_MODE)
##
wifi_sys_led_flick_lp5523()
{
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

wifi_start() {
	get_wlan_ini FEATURE_WIFI_CHECK

	wifi_nvram_plus_config
	wifi_start_rftest_check
	wifi_driver_startup
	wifi_smart_config
	echo "=====>>>>> wireless setting is finished" >$CONSOLE
	if [ "${FEATURE_WIFI_CHECK}" = "y" ]; then
		wifi_check_set_finish_flag
	fi
}

wifi_init() {
	local pro_id=""
	wifi_nvram_default_restore
	#echo 14336 >/proc/sys/vm/min_free_kbytes
	wifi_calibrate_data_check
	wifi_nvram_config
	echo /sbin/hotplug > /proc/sys/kernel/hotplug # config for wds, need to check
	
	wifi_start &
}
