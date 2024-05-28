# tplink_intel.sh
# 	wifi script fit for intel WAVE6.X serial chips
# 	2018-12-28
# 	jiangji@tp-link.com.cn 

#!/bin/sh
. /usr/share/libubox/jshn.sh
. /lib/wifi/wireless_schedule_func.sh
WIFI_SCHEDULE=0
USRSBINDIR=/opt/lantiq/usr/sbin
export LD_LIBRARY_PATH=/opt/lantiq/lib:/opt/lantiq/usr/lib
export PATH=/usr/bin:/usr/sbin:/bin:/sbin:/opt/lantiq/bin:/opt/lantiq/sbin:/opt/lantiq/usr/sbin:/opt/lantiq/bin:/tmp
############################
### sys tools parameters ###
############################
FAPI_WLAN_CLI=/usr/sbin/fapi_wlan_cli
IFCONFIG=/sbin/ifconfig
BRCTL=/usr/sbin/brctl
FW=/sbin/fw

#TP-LINK
TP_DIR=/tmp/tp
TP_FAPI_TR181_DIR=$TP_DIR/tp_fapi_tr181_dir
TP_HOSTAPD_CONF_DIR=$TP_DIR/tp_hostapd_conf_dir
TP_TMP_HOSTAPD_CONF=$TP_HOSTAPD_CONF_DIR/tp_tmp_hostapd_conf
TP_TMP_HOSTAPD_ATF_CONF=$TP_HOSTAPD_CONF_DIR/tp_tmp_hostapd_atf_conf
TP_DEFAULT_CAL_PREFIX=/lib/wifi/default_
#WPS
WPS_PEER_ADDR=/tmp/tp_wps_peer_addr
#iwpriv
TP_TMP_IWPRIV=$TP_DIR/tp_tmp_iwpriv
TP_TMP_IWPRIV_PRE_UP=$TP_DIR/tp_tmp_iwpriv_pre_up
INTEL_COUNTRYCODE=/lib/wifi/intel_countrycode.txt

#SYSTEM
HOSTAPD_SCRIPT_DIR=/opt/lantiq/wave/scripts
#hostapd_wlan0.conf
HOSTAPD_CONF_DIR=/opt/lantiq/wave/confs
#HOSTAPD_WLAN2_CONF=/opt/lantiq/wave/confs/hostapd_wlan0.conf
HOSTAPD_DIR=/tmp
#HOSTAPD_WLAN2=/tmp/hostapd_wlan2
HOSTAPD_EVENTS_SCRIPT=/opt/lantiq/wave/scripts/fapi_wlan_wave_events_hostapd.sh
#FAPI_WLAN_WAVE_RUNNNER
RUNNNER_UP_=/opt/lantiq/wave/confs/runner_up_
TP_RUNNNER_UP_=/lib/wifi/tp_runner_up_
############################
### interface parameters ###
############################
#dev_2g=0
#dev_5g=2
DEV_INDEX="0 2"

########################
### debug parameters ###
########################
DBG=1
STDOUT="/dev/null"

if [ "$DBG" = "1" ];then
	DEBUG=echo
	STDOUT="/dev/console"
fi

tpdbg () {
	${DEBUG:-:} "$*" >$STDOUT
}

#######################
### tools function  ###
#######################
is_process_running()
{
        local process_name

        process_name=$1
        pgrep $process_name > /dev/null

        if [ $? -eq 0 ]
        then
                echo "1"
        else
                echo "0"
        fi
}

get_brname() {
	echo "[  get_brname][SATRT]" >$STDOUT
	json_init
	json_load "`ubus call network.interface.lan status`"
	json_get_var l3_device l3_device
	export ${NO_EXPORT:+-n} "$1=$l3_device"
	echo "[  get_brname][END]" >$STDOUT
}

wifi_clean_pre_up_flag() {
	echo "[  wifi_clean_pre_up_flag][SATRT]" >$STDOUT
	# all pre_up options
	# 	sBeaconPeriod 100
	# 	sDTIMPeriod 2
	# 	sPowerSelection 0
	# 	s11nProtection 1
	# 	sCoCAutoCfg 10 50 50 50 1000 5000 5000 5000 5000 5000
	# 	sScanParams 100 20 3 5 10 2
	# 	sScanParamsBG 100 20 1 1 1 1000
	# 	sScanModifFlags 48
	# 	sScanCalCwMasks 0 0
	# 	sScanExpTime 90
	# 	sFWRecovery 6 1 1 3600 5
	# 	sQAMplus 1
	# 	sNumMsduInAmsdu 7 7
	# 	sMaxMpduLen 7000
	# 	sBfMode 0xff
	# 	sInterfDetThresh -68 -68 -68 -68 5 -68
	# 	sMuOperation 0
	local DRIVER_PRE_UP_CONFIGURED_FLAG=""
	local dev=""
	
	for dev in $DEV_INDEX
	do
		DRIVER_PRE_UP_CONFIGURED_FLAG="/tmp/wlan_wave/fapi_wlan_wave_pre_up_configured_wlan${dev}"
		#clean up pre_up flags
		test -f $DRIVER_PRE_UP_CONFIGURED_FLAG && rm -f $DRIVER_PRE_UP_CONFIGURED_FLAG
	done
	echo "[  wifi_clean_pre_up_flag][END]" >$STDOUT
}

#############################
### fapi functions define ###
#############################
FAPI_WLAN_CLI() {
	[ -n "${DEBUG_MODE}" ] && echo FAPI_WLAN_CLI "$@" >$STDOUT
	$FAPI_WLAN_CLI "$@" >$STDOUT
}

FAPI_WLAN_CLI_RET() {
	local cli_return=""
	[ -n "${DEBUG_MODE}" ] && echo FAPI_WLAN_CLI "$@" >$STDOUT
	cli_return=`$FAPI_WLAN_CLI "$@"`
	#[ -n "${DEBUG_MODE}" ] && echo $cli_return >$STDOUT
	echo "${cli_return}"
}

#wifi_security_set wlan0 sec_mode KeyPassphrase RadiusServerIPAddr RadiusServerPort
#INPUT sec_mode: 
# NONE,WEP
# WPA_WPA2_PERSONAL_MIXED,WPA2_PERSONAL_CCMP,WPA_PERSONAL_TKIP
# WPA_WPA2_ENTERPRISE_MIXED,WPA2_ENTERPRISE_CCMP,WPA_ENTERPRISE_TKIP
# WPA2_PERSONAL_TKIP,WPA_PERSONAL_CCMP
# WPA2_ENTERPRISE_TKIP,WPA_ENTERPRISE_CCMP
wifi_security_set() {
	echo "[  wifi_security_set][SATRT]" >$STDOUT
	echo "INPUT PARAMETER (" $@ ")" >$STDOUT
	local dev=$1
	local if_index=${dev##wlan}
	local sec_mode=$2
	local KeyPassphrase=$3
	local RadiusServerIPAddr=$4
	local RadiusServerPort=$5
	local BeaconType=""
	local WpaEncMode=""
	local AuthMode=""
	local KeyPassphraseLen=""
    
	#NONE
	if [ "$sec_mode" = "NONE" -a -z $KeyPassphrase ]; then
		#BeaconType="None"
		#FAPI_WLAN_CLI setBeaconType -i $if_index -p $BeaconType
		wifi_hostapd_add_conf "$dev" "wpa" "0"
		wifi_hostapd_add_conf "$dev" "eap_server" "1"
		wifi_hostapd_add_conf "$dev" "wep_default_key" ""
		#wifi_hostapd_add_conf "$dev" "pmf_enabled" ""
		
	#WEP
	elif [ "$sec_mode" = "WEP" -a -n $KeyPassphrase ]; then
		#BeaconType="Basic"
		#FAPI_WLAN_CLI setBeaconType -i $if_index -p $BeaconType
		#FAPI_WLAN_CLI setWepKeyPassphrase -i $if_index -p $KeyPassphrase
		wifi_hostapd_add_conf "$dev" "wpa" "0"
		wifi_hostapd_add_conf "$dev" "eap_server" "1"
		wifi_hostapd_add_conf "$dev" "wep_default_key" "0"
		KeyPassphraseLen=${#KeyPassphrase}
		if [ "$KeyPassphraseLen" = "5" -o "$KeyPassphraseLen" = "13" ]; then
				wifi_hostapd_add_conf "$dev" "wep_key0" "\"${KeyPassphrase}\""
		else
				wifi_hostapd_add_conf "$dev" "wep_key0" "$KeyPassphrase"
		fi
		
	#WPA/WPA2 PERSONAL
	elif [ "$sec_mode" = "WPA_WPA2_PERSONAL_MIXED" -o "$sec_mode" = "WPA2_PERSONAL_CCMP" -o "$sec_mode" = "WPA2_PERSONAL_TKIP" -o "$sec_mode" = "WPA_PERSONAL_TKIP" -o "$sec_mode" = "WPA_PERSONAL_CCMP" -a -n $KeyPassphrase ]; then
			if [ "$sec_mode" = "WPA_WPA2_PERSONAL_MIXED" ]; then
				#WpaEncMode="TKIPandAESEncryption"
				#AuthMode="None"
				wifi_hostapd_add_conf "$dev" "wpa" "3"
				wifi_hostapd_add_conf "$dev" "wpa_pairwise" "TKIP CCMP"
				wifi_hostapd_add_conf "$dev" "rsn_pairwise" "TKIP CCMP"
				
			elif [ "$sec_mode" = "WPA2_PERSONAL_CCMP" -o "$sec_mode" = "WPA2_PERSONAL_TKIP" ]; then
				#WpaEncMode="AESEncryption"
				#AuthMode="None"
				wifi_hostapd_add_conf "$dev" "wpa" "2"
			elif [ "$sec_mode" = "WPA_PERSONAL_TKIP" -o "$sec_mode" = "WPA_PERSONAL_CCMP" ]; then
				#WpaEncMode="TKIPEncryption"
				#AuthMode="None"
				wifi_hostapd_add_conf "$dev" "wpa" "1"
				
			else
				echo "INPUT PARAMETER ERROR WPA/WPA2-PSK(" $@ ")" >$STDOUT
			fi
			##FAPI_WLAN_CLI setWpaEncMode -i $if_index -p $WpaEncMode
			##FAPI_WLAN_CLI setAuthMode -i $if_index -p $AuthMode
			##FAPI_WLAN_CLI setKeyPassphrase -i $if_index -p $KeyPassphrase
			
			wifi_hostapd_add_conf "$dev" "eap_server" "1"
			wifi_hostapd_add_conf "$dev" "wpa_key_mgmt" "WPA-PSK"
			wifi_hostapd_add_conf "$dev" "ieee8021x" "0"
			wifi_hostapd_add_conf "$dev" "wep_default_key" ""
			KeyPassphraseLen=${#KeyPassphrase} 
			if [ "$KeyPassphraseLen" = "64" ]; then
				wifi_hostapd_add_conf "$dev" "wpa_passphrase" ""
				wifi_hostapd_add_conf "$dev" "wpa_psk" "$KeyPassphrase"
			else
				wifi_hostapd_add_conf "$dev" "wpa_passphrase" "$KeyPassphrase"
			fi
			
			
    
	#WPA/WPA2 ENTERPRISE
	elif [ "$sec_mode" = "WPA_WPA2_ENTERPRISE_MIXED" -o "$sec_mode" = "WPA2_ENTERPRISE_CCMP" -o "$sec_mode" = "WPA2_ENTERPRISE_TKIP" -o "$sec_mode" = "WPA_ENTERPRISE_TKIP" -o "$sec_mode" = "WPA_ENTERPRISE_CCMP" -a -n $KeyPassphrase -a -n $RadiusServerIPAddr -a -n $RadiusServerPort ]; then
	
			if [ "$sec_mode" = "WPA_WPA2_ENTERPRISE_MIXED" ]; then
				#WpaEncMode="TKIPandAESEncryption"
				#AuthMode="EAPAuthentication"
				wifi_hostapd_add_conf "$dev" "wpa" "3"
				wifi_hostapd_add_conf "$dev" "wpa_pairwise" "TKIP"
				wifi_hostapd_add_conf "$dev" "rsn_pairwise" "CCMP"
				
			elif [ "$sec_mode" = "WPA2_ENTERPRISE_CCMP" -o "$sec_mode" = "WPA2_ENTERPRISE_TKIP" ]; then
				#WpaEncMode="AESEncryption"
				#AuthMode="EAPAuthentication"
				wifi_hostapd_add_conf "$dev" "wpa" "2"
			elif [ "$sec_mode" = "WPA_ENTERPRISE_TKIP" -o "$sec_mode" = "WPA_ENTERPRISE_CCMP" ]; then
				#WpaEncMode="TKIPEncryption"
				#AuthMode="EAPAuthentication"
				wifi_hostapd_add_conf "$dev" "wpa" "1"
				
			else
				echo "INPUT PARAMETER ERROR WPA/WPA2-ENTERPRISE(" $@ ")" >$STDOUT
			fi
			
			wifi_hostapd_add_conf "$dev" "eap_server" "0"
			wifi_hostapd_add_conf "$dev" "wpa_key_mgmt" "WPA-EAP"
			wifi_hostapd_add_conf "$dev" "ieee8021x" "1"
			wifi_hostapd_add_conf "$dev" "wep_default_key" ""
			
			
			wifi_hostapd_add_conf "$dev" "auth_server_addr" "$RadiusServerIPAddr"
			wifi_hostapd_add_conf "$dev" "auth_server_port" "$RadiusServerPort"
			wifi_hostapd_add_conf "$dev" "auth_server_shared_secret" "$KeyPassphrase"
			wifi_hostapd_add_conf "$dev" "acct_server_addr" "$RadiusServerIPAddr"
			wifi_hostapd_add_conf "$dev" "acct_server_port" "$((RadiusServerPort+1))"
			wifi_hostapd_add_conf "$dev" "acct_server_shared_secret" "$KeyPassphrase"
			wifi_hostapd_add_conf "$dev" "eap_reauth_period" 3600
			
			
			
			#FAPI_WLAN_CLI setWpaEncMode -i $if_index -p $WpaEncMode
			#FAPI_WLAN_CLI setAuthMode -i $if_index -p $AuthMode
			#FAPI_WLAN_CLI setRadiusSecret -i $if_index -p $KeyPassphrase
			#FAPI_WLAN_CLI setApSecurityRadiusServerIP -i $if_index -p $RadiusServerIPAddr
			#FAPI_WLAN_CLI setApSecurityRadiusServerPort -i $if_index -p $RadiusServerPort
	else
		echo "INPUT PARAMETER ERROR(" $@ ")" >$STDOUT
	fi
	
	#OK, patch the hostapd_conf
	if [ "$sec_mode" = "WPA2_PERSONAL_TKIP" -o "$sec_mode" = "WPA2_ENTERPRISE_TKIP" ]; then
		wifi_hostapd_add_conf $dev wpa_pairwise TKIP
		wifi_hostapd_add_conf $dev rsn_pairwise TKIP
	elif [ "$sec_mode" = "WPA_PERSONAL_CCMP" -o "$sec_mode" = "WPA_ENTERPRISE_CCMP" ]; then
		wifi_hostapd_add_conf $dev wpa_pairwise CCMP
		wifi_hostapd_add_conf $dev rsn_pairwise CCMP
	fi
	
	echo "[  wifi_security_set][END]" >$STDOUT
}

# wifi_mode_set wlan0 country cap channel short_gi(true/false)
wifi_mode_set() {
	echo "[  wifi_mode_set][SATRT]" >$STDOUT
	local auto="false"
	#wlan0 -> 0
	local dev=$1
	local if_index=${dev##wlan}
	local country=$2
	# 11A 11G 11B 11NGHT20 11NGHT40PLUS 11NGHT40MINUS 
	# 11NAHT40PLUS 11NAHT40MINUS 11ACVHT20 11ACVHT40PLUS
	# 11ACVHT40MINUS 11ACVHT80
	local cap=$3
	local channel=$4
	local short_gi=$5
	local center_freq="36"
	
	#if [ "$channel" = "auto" ]; then
	#	auto="true"
	#fi	
	
	#FAPI_WLAN_CLI setAutoChannelEnable -i $if_index -e $auto
	
	
	
	
	##new set
	
	local ht_capab="[TX-STBC][RX-STBC1][LDPC][MAX-AMSDU-7935]"
	local vht_capab="[MAX-MPDU-11454][RXLDPC][TX-STBC-2BY1][RX-STBC-1][BF-ANTENNA-4][SOUNDING-DIMENSION-4][VHT-TXOP-PS][SU-BEAMFORMER][SU-BEAMFORMEE][MU-BEAMFORMER][MAX-A-MPDU-LEN-EXP7]"
		
	
	#HT
	if [ "$cap" = "11NGHT20" ]; then
		if [ "$short_gi" = "true" ]; then
			ht_capab=$ht_capab"[SHORT-GI-20]"
		fi
	elif [ "$cap" = "11NGHT40PLUS" ]; then
		ht_capab=$ht_capab"[HT40+]"
		if [ "$short_gi" = "true" ]; then
			ht_capab=$ht_capab"[SHORT-GI-20][SHORT-GI-40]"
		fi
	elif [ "$cap" = "11NGHT40MINUS" ]; then
		if [ "$channel" = "auto" ]; then
			ht_capab=$ht_capab"[HT40+]"
		else
			ht_capab=$ht_capab"[HT40-]"
		fi	
		if [ "$short_gi" = "true" ]; then
			ht_capab=$ht_capab"[SHORT-GI-20][SHORT-GI-40]"
		fi
	#VHT
	elif [ "$cap" = "11ACVHT20" ]; then
		wifi_hostapd_add_conf $dev vht_oper_chwidth 0
		center_freq=`wifi_convert_center_freq $channel $cap`
		wifi_hostapd_add_conf $dev vht_oper_centr_freq_seg0_idx "$center_freq"
		
		if [ "$short_gi" = "true" ]; then
			ht_capab=$ht_capab"[SHORT-GI-20]"
			vht_capab=$vht_capab"[SHORT-GI-80]"
		fi
	elif [ "$cap" = "11ACVHT40MINUS" ]; then
		wifi_hostapd_add_conf $dev vht_oper_chwidth 0
		center_freq=`wifi_convert_center_freq $channel $cap`
		wifi_hostapd_add_conf $dev vht_oper_centr_freq_seg0_idx "$center_freq"
		
		if [ "$channel" = "auto" ]; then
			ht_capab=$ht_capab"[HT40+]"
		else
			ht_capab=$ht_capab"[HT40-]"
		fi	
		if [ "$short_gi" = "true" ]; then
			ht_capab=$ht_capab"[SHORT-GI-20][SHORT-GI-40]"
			vht_capab=$vht_capab"[SHORT-GI-80]"
		fi
	elif [ "$cap" = "11ACVHT40PLUS" ]; then
		wifi_hostapd_add_conf $dev vht_oper_chwidth 0
		center_freq=`wifi_convert_center_freq $channel $cap`
		wifi_hostapd_add_conf $dev vht_oper_centr_freq_seg0_idx $center_freq
		
		ht_capab=$ht_capab"[HT40+]"
		if [ "$short_gi" = "true" ]; then
			ht_capab=$ht_capab"[SHORT-GI-20][SHORT-GI-40]"
			vht_capab=$vht_capab"[SHORT-GI-80]"
		fi
	elif [ "$cap" = "11ACVHT80" ]; then
		wifi_hostapd_add_conf $dev vht_oper_chwidth 1
		center_freq=`wifi_convert_center_freq $channel $cap`
		wifi_hostapd_add_conf $dev vht_oper_centr_freq_seg0_idx $center_freq
				
		case "$channel" in
			36|40|52|56|100|104|116|120|132|136|149|153|auto) ht_capab=$ht_capab"[HT40+]" ;;
			44|48|60|64|108|112|124|128|140|144|157|161) ht_capab=$ht_capab"[HT40-]" ;;
		esac
		
		if [ "$short_gi" = "true" ]; then
			ht_capab=$ht_capab"[SHORT-GI-20][SHORT-GI-40]"
			vht_capab=$vht_capab"[SHORT-GI-80]"
		fi
	fi
	
	wifi_hostapd_add_conf $dev country_code "$country"
	wifi_hostapd_add_conf $dev ht_capab "$ht_capab"
	wifi_hostapd_add_conf $dev vht_capab "$vht_capab"
		
	
	##new set end
	
	
	
	#FAPI_WLAN_CLI setCountryCode -i $if_index -p $country
	
	if [ "$channel" = "auto" ]; then
		#FAPI_WLAN_CLI setChannel -i $if_index -c $channel
		wifi_hostapd_add_conf $dev channel "acs_smart"
		#FAPI_WLAN_CLI setChannelMode -i $if_index -p $cap
	else
		wifi_hostapd_add_conf $dev channel $channel
	fi
	

	
	echo "[  wifi_mode_set][END]" >$STDOUT
}

# Get the channel number, channel width and secondary channel (if needed) and find the center channel for VHT.
# For 20MHz, return the channel.
# For 40MHz, check the secondary channel and return channel+2 for secondary upper or channel-2 for secondary lower.
# For 80MHz, return the center channel according to the list:
# 36,40,44,48 - return 42
# 52,56,60,64 - return 58
# 100,104,108,112 - return 106
# 116,120,124,128 - return 122
# 132,136,140,144 - return 138
# 149,153,157,161 - return 155
wifi_convert_center_freq() {
	echo "[  wifi_convert_center_freq][SATRT]" >$STDOUT
	# Define local parameters
	local channel cap center_freq

	channel=$1
	cap=$2

	if [ "$channel" = "auto" ]
	then
		center_freq=0
	else
		case "$cap" in
			"11ACVHT20")
				center_freq="$channel"
			;;
			"11ACVHT40MINUS")
				center_freq=$((channel-2))
			;;
			"11ACVHT40PLUS")
				center_freq=$((channel+2))
			;;
			
			"11ACVHT80")
				case "$channel" in
					36|40|44|48) center_freq=42 ;;
					52|56|60|64) center_freq=58 ;;
					100|104|108|112) center_freq=106 ;;
					116|120|124|128) center_freq=122 ;;
					132|136|140|144) center_freq=138 ;;
					149|153|157|161) center_freq=155 ;;
				esac
			;;
		esac
	fi
	echo "$center_freq"
	echo "[  wifi_convert_center_freq][END]" >$STDOUT
}

### No Input ###
wifi_ifconfig_up() {
	echo "[  wifi_ifconfig_up][SATRT]" >$STDOUT
	local dev=""
	local all_dev="0 2 3 4"
	for dev in $all_dev
	do
		FAPI_WLAN_CLI ifconfigUp -i $dev
	done
	
	echo "[  wifi_ifconfig_up][END]" >$STDOUT
}

wifi_createconfig() {
	echo "[  wifi_createconfig][SATRT]" >$STDOUT
	FAPI_WLAN_CLI createConfig
	echo "[  wifi_createconfig][END]" >$STDOUT
}

wifi_fapi_factory() {
	echo "[  wifi_fapi_factory][SATRT]" >$STDOUT
	FAPI_WLAN_CLI factory
	echo "[  wifi_fapi_factory][END]" >$STDOUT
}

wifi_fapi_load() {
	echo "[  wifi_fapi_load][SATRT]" >$STDOUT
	FAPI_WLAN_CLI load
	echo "[  wifi_fapi_load][END]" >$STDOUT
}


wifi_fapi_init() {
	echo "[  wifi_fapi_init][SATRT]" >$STDOUT
	FAPI_WLAN_CLI init
	echo "[  wifi_fapi_init][END]" >$STDOUT
}

wifi_fapi_uninit() {
	echo "[  wifi_fapi_uninit][SATRT]" >$STDOUT
	FAPI_WLAN_CLI unInit
	echo "[  wifi_fapi_uninit][END]" >$STDOUT
}

wifi_fapi_reset() {
	echo "[  wifi_fapi_reset][SATRT]" >$STDOUT
	FAPI_WLAN_CLI reset
	echo "[  wifi_fapi_reset][END]" >$STDOUT
}

####################################
### fapi TR181 functions define  ###
####################################
wifi_radio_tr181_set() {
	echo "[  wifi_radio_tr181_set][SATRT]" >$STDOUT
	if [ -n $1 -a -n $2 ]; then
		echo "[  wifi_radio_tr181_set]start dump wlan"$1"-> inputFile" >$STDOUT
		cat $2 >$STDOUT
		echo "[  wifi_radio_tr181_set]end   dump wlan"$1 >$STDOUT
		FAPI_WLAN_CLI setRadioTR181 -i $1 -f $2
	fi
	echo "[  wifi_radio_tr181_set][END]" >$STDOUT
}

#wifi_rts_threshold_set wlan0 rts_threshold
#wifi_rts_threshold_set() {
#	echo "[  wifi_rts_threshold_set][SATRT]" >$STDOUT
#	#todo ... HARDCODED? need test
#	echo $@ >$STDOUT
#	local if_index=${1##wlan}
#	local rts_threshold=$2
#	local TR181_FILE=$TP_FAPI_TR181_DIR/wifi_rts_threshold
#
#	test -f $TR181_FILE && rm -f $TR181_FILE
#	echo "Object_0=Device.WiFi.Radio" >>$TR181_FILE
#	echo "RTSThreshold_0="$rts_threshold >>$TR181_FILE
#	wifi_radio_tr181_set $if_index $TR181_FILE
#
#	#No iwpriv
#	echo "[  wifi_rts_threshold_set][END]" >$STDOUT	
#}

#wifi_short_gi_set wlan0 short_gi(true/false)
wifi_short_gi_set() {
	echo "[  wifi_short_gi_set][SATRT]" >$STDOUT
	
	# For short-GI parameters, in DB: 400nsec=short (1), 800nsec=long (0)
	# The value in DB sets short-GI for both 20Mhz and 40Mhz.
	#Object_0=Device.WiFi.Radio
	#GuardInterval_0=400nsec
	
	# Check value for VHT Short-GI.
	#Object_1=Device.WiFi.Radio.X_LANTIQ_COM_Vendor
	#VhtGuardInterval_1=true
	echo $@ >$STDOUT
	#local if_index=${1##wlan}
	local dev=$1
	local short_gi=$2
	#local gi=800nsec
	#local TR181_FILE=$TP_FAPI_TR181_DIR/wifi_short_gi
	
	
	
	
	local ht_capab=`wifi_hostapd_get_conf "$dev" "ht_capab"`
	local vht_capab=`wifi_hostapd_get_conf "$dev" "vht_capab"`
	
	#echo "[debug get ht_capab]=$ht_capab" >$STDOUT
	#echo "[debug get vht_capab]=$vht_capab" >$STDOUT
	
	
	#clean sgi
	ht_capab=`echo "$ht_capab" | sed 's/\[SHORT-GI-20]//g'`
	ht_capab=`echo "$ht_capab" | sed 's/\[SHORT-GI-40]//g'`
	vht_capab=`echo "$vht_capab" | sed 's/\[SHORT-GI-80]//g'`
	
	
	if [ "$short_gi" = "true" ]; then
		ht_capab=$ht_capab"[SHORT-GI-20][SHORT-GI-40]"
		vht_capab=$vht_capab"[SHORT-GI-80]"
	fi
	
	wifi_hostapd_add_conf "$dev" "ht_capab" "$ht_capab"
	wifi_hostapd_add_conf "$dev" "vht_capab" "$vht_capab"
	
	
	#test -f $TR181_FILE && rm -f $TR181_FILE
	#echo "Object_0=Device.WiFi.Radio" >>$TR181_FILE
	#echo "GuardInterval_0="$gi >>$TR181_FILE
	#echo "Object_1=Device.WiFi.Radio.X_LANTIQ_COM_Vendor" >>$TR181_FILE
	#echo "VhtGuardInterval_1="$short_gi >>$TR181_FILE
	#wifi_radio_tr181_set $if_index $TR181_FILE
	#No iwpriv
	#hostapd_wlan2.conf vht_capab_value ht_capab_value

	echo "[  wifi_short_gi_set][END]" >$STDOUT	
}

wifi_wds_set() {
	echo "[  wifi_wds_set][SATRT]" >$STDOUT
	#todo by fzq...
	echo "[  wifi_wds_set][END]" >$STDOUT	
}

wifi_bsd_set() {
	echo "[  wifi_bsd_set][SATRT]" >$STDOUT
	#todo by fzq...
	echo "[  wifi_bsd_set][END]" >$STDOUT
}

wifi_hostapd_atf_set() {
	echo "[  wifi_hostapd_atf_set][SATRT]" >$STDOUT
	echo $@ > $STDOUT
	local dev=$1
	local atf_enable=$2
	
	wifi_hostapd_atf_add_conf $dev distr_type $atf_enable
	echo "[  wifi_hostapd_atf_set][END]" >$STDOUT
}

wifi_wireless_schedule_debug() {
	echo "[  wifi_wireless_schedule_debug][SATRT]" >$STDOUT
	local if_index=""
	local band=""

	#check lock
	lock $TP_DIR/wireless_schedule.lock
	
	#prepare all needed dirs
	test -d $TP_HOSTAPD_CONF_DIR || mkdir -p $TP_HOSTAPD_CONF_DIR
	test -d $TP_FAPI_TR181_DIR || mkdir -p $TP_FAPI_TR181_DIR
	
	echo "[  wifi_wireless_schedule_debug]USER CONFIG APPLY" >$STDOUT
	
	#let's go
	for if_index in $DEV_INDEX
	do
		ifconfig wlan$if_index down
		ifconfig wlan$if_index.0 down
		config_get band wlan$if_index band
		if [ "$WIFI_SCHEDULE" = "1" ]; then
			wireless_schedule_disable_wifi "$band" && continue
		fi
		wifi_mac_set wlan$if_index
		wifi_abs_debug wlan$if_index
		
	done
	
	if [ -e $TP_TMP_HOSTAPD_ATF_CONF ]; then
		wifi_hostapd_atf_patch_conf
	fi
	if [ -e $TP_TMP_HOSTAPD_CONF ]; then
		wifi_hostapd_patch_conf
	fi
	
	for if_index in $DEV_INDEX
	do
		echo $if_index >STDOUT
		config_get band wlan$if_index band
		if [ "$WIFI_SCHEDULE" = "1" ]; then
			wireless_schedule_disable_wifi "$band" && continue
		fi
		wifi_hostapd_reload wlan$if_index
		wifi_abs_guest_switch $if_index
		
		#delete temporary iwpriv pre_up config
		rm -f ${TP_TMP_IWPRIV_PRE_UP}_wlan${if_index}
	done
	
	#wifi_hostapd_reload
	
	if [ -e $TP_TMP_IWPRIV ]; then
		wifi_iwpriv_set_all
	fi
	
	#set vlan
	wifi_vlan notaddif
	
	#delete lock
	lock -u $TP_DIR/wireless_schedule.lock
	
	echo "[  wifi_wireless_schedule_debug][END]" >$STDOUT

}

#########################################
###	hostapd reconfig functions define ###
#########################################

#wifi_hostapd_get_conf wlan0 option
wifi_hostapd_get_conf() {
	echo "[  wifi_hostapd_get_conf][SATRT]" >$STDOUT
	local dev="$1"
	local option="$2"
	local hostapd_conf=$HOSTAPD_CONF_DIR/hostapd_$dev.conf
	local conf_line=""
	
	echo $option $hostapd_conf >$STDOUT
	conf_line=`grep ^${option}= ${hostapd_conf}`
	if [ -n "$conf_line" ]; then
		echo ${conf_line##*=}
	fi
	echo "[  wifi_hostapd_get_conf][END]" >$STDOUT
}

#wifi_hostapd_add_conf wlan0 option value
#if value is null, option will be deleted
wifi_hostapd_add_conf() {
	echo "[  wifi_hostapd_add_conf][SATRT]" >$STDOUT
	#option=value,wlan0
	echo "$@" >$STDOUT
	echo "${2}=${3},${1}" >>$TP_TMP_HOSTAPD_CONF
	echo "[  wifi_hostapd_add_conf][END]" >$STDOUT
}

wifi_hostapd_atf_add_conf() {
	echo "[  wifi_hostapd_atf_add_conf][SATRT]" >$STDOUT
	echo "$@" >$STDOUT
	echo "${2}=${3},${1}" >>$TP_TMP_HOSTAPD_ATF_CONF
	echo "[  wifi_hostapd_atf_add_conf][END]" >$STDOUT
}
wifi_hostapd_atf_patch_conf()
{
	echo "[  wifi_hostapd_atf_patch_conf][SATRT]" >$STDOUT
	local if_index=""
	local line=""
	local new_conf_line=""
	local old_conf_line=""
	#dump it
	echo "dump ${TP_TMP_HOSTAPD_ATF_CONF}" >$STDOUT
	cat $TP_TMP_HOSTAPD_ATF_CONF >$STDOUT
	for if_index in $DEV_INDEX
	do
		cat $HOSTAPD_CONF_DIR/hostapd_atf_wlan${if_index}.conf >$TP_HOSTAPD_CONF_DIR/hostapd_atf_wlan${if_index}.conf
		
		line=$(grep wlan${if_index}$ $TP_TMP_HOSTAPD_ATF_CONF)
		new_conf_line=${line%,*}
		old_conf_line=$(grep "distr_type" $TP_HOSTAPD_CONF_DIR/hostapd_atf_wlan${if_index}.conf)
		sed -i 's/'"^${old_conf_line}$"'/'"${new_conf_line}"'/g' $TP_HOSTAPD_CONF_DIR/hostapd_atf_wlan${if_index}.conf
		cat $TP_HOSTAPD_CONF_DIR/hostapd_atf_wlan${if_index}.conf >$HOSTAPD_CONF_DIR/hostapd_atf_wlan${if_index}.conf
	done
	echo "[  wifi_hostapd_atf_patch_conf][END]" >$STDOUT 
}
#wifi_hostapd_patch_conf
wifi_hostapd_patch_conf() {
	echo "[  wifi_hostapd_patch_conf][SATRT]" >$STDOUT
	#handle format string HOSTAPD_NEW_CONF
	local line=""
		
	#prepare files
	local if_index=""
	for if_index in $DEV_INDEX
	do
		cat $HOSTAPD_CONF_DIR/hostapd_phy_wlan${if_index}.conf >$TP_HOSTAPD_CONF_DIR/hostapd_vap_wlan${if_index}.conf
		cat $HOSTAPD_CONF_DIR/hostapd_vap_wlan${if_index}.conf >>$TP_HOSTAPD_CONF_DIR/hostapd_vap_wlan${if_index}.conf
		cat $HOSTAPD_CONF_DIR/hostapd_vap_wlan${if_index}.0.conf >$TP_HOSTAPD_CONF_DIR/hostapd_vap_wlan${if_index}.0.conf
	done
	echo "[  wifi_hostapd_patch_conf][prepare done]" >$STDOUT
	
	#dump it
	echo "dump ${TP_TMP_HOSTAPD_CONF}" >$STDOUT
	cat $TP_TMP_HOSTAPD_CONF >$STDOUT

	#patch all lines
	cat $TP_TMP_HOSTAPD_CONF | while read -r line
	do
		echo "   origin line: [${line}]" >$STDOUT
		local dev=${line##*,}
		local option=${line%%=*}
		local new_conf_line=${line%,*}
		local old_conf_line=""
		#guest network
		if [ "$dev" = "wlan3" ]; then
			dev="wlan0.0"
		elif [ "$dev" = "wlan4" ]; then
			dev="wlan2.0"
		fi
		local hostapd_conf=$TP_HOSTAPD_CONF_DIR/hostapd_vap_$dev.conf
		
		if [ -f "$hostapd_conf" -a -n "$option" -a -n "$new_conf_line" -a -n "$dev" ]; then
			old_conf_line=`grep ^${option}= ${hostapd_conf}`

			echo "old_conf_line[${old_conf_line}]" >$STDOUT
			echo "new_conf_line[${new_conf_line}]" >$STDOUT
			
			#delete old line, not replace it
			local need_delete=${new_conf_line#*=}
			if [ -z "$need_delete" ]; then
				new_conf_line=""
			fi
			
			if [ -n "$old_conf_line" ]; then
				
				#do a little magic,need fix later
				old_conf_line=$(echo "${old_conf_line}" | sed 's#\\#\\\\#g')
				old_conf_line=$(echo "${old_conf_line}" | sed 's#\/#\\\/#g')
				old_conf_line=$(echo "${old_conf_line}" | sed 's#\[#\\\[#g')
				old_conf_line=$(echo "${old_conf_line}" | sed 's#\&#\\\&#g')
				new_conf_line=$(echo "${new_conf_line}" | sed 's#\\#\\\\#g')
				new_conf_line=$(echo "${new_conf_line}" | sed 's#\/#\\\/#g')
				new_conf_line=$(echo "${new_conf_line}" | sed 's#\[#\\\[#g')
				new_conf_line=$(echo "${new_conf_line}" | sed 's#\&#\\\&#g')
				
				echo "old: [${old_conf_line}]  new: [${new_conf_line}] (${hostapd_conf})" >$STDOUT
				
				#ok, replace it
				sed -i 's/'"^${old_conf_line}$"'/'"${new_conf_line}"'/g' $hostapd_conf
			else
				echo "old: NULL  new: "$new_conf_line" ("$hostapd_conf")" >$STDOUT
				echo $new_conf_line >>$hostapd_conf
			fi
		fi
	done

	
	#merge hostapd_phy_wlan0 hostapd_vap_wlan0 hostapd_vap_wlan0.x to hostapd_wlan0
	for if_index in $DEV_INDEX
	do
		cat $TP_HOSTAPD_CONF_DIR/hostapd_vap_wlan${if_index}.conf >$HOSTAPD_CONF_DIR/hostapd_wlan${if_index}.conf
		cat $TP_HOSTAPD_CONF_DIR/hostapd_vap_wlan${if_index}.0.conf >>$HOSTAPD_CONF_DIR/hostapd_wlan${if_index}.conf
	done
	echo "[  wifi_hostapd_patch_conf][merge done]" >$STDOUT
	
	#need recheck?
	#clean old hostapd tmp conf
	rm -rf $TP_HOSTAPD_CONF_DIR/*
	
	echo "[  wifi_hostapd_patch_conf][END]" >$STDOUT
}

is_hostapd_ready() {
	local dev="$1"
	local hostapd_name=hostapd_"$dev"
	local hostapd_cli_name=hostapd_cli_"$dev"

	if [ ! -e /tmp/$hostapd_name ]; then
		cp -s /opt/lantiq/bin/hostapd /tmp/$hostapd_name
	fi

	if [ ! -e /tmp/$hostapd_cli_name ]; then
		cp -s /opt/lantiq/bin/hostapd_cli /tmp/$hostapd_cli_name
	fi

	### Wether hostapd_cli state to be ENABLED or ACS_DONE ###
	local status_enabled=`/tmp/$hostapd_cli_name -i$dev status 2>/dev/null | grep state=ENABLED -c`
	local acs_done=`tmp/$hostapd_cli_name -i$dev status 2>/dev/null | grep state=ACS_DONE -c`

	echo $((status_enabled+acs_done))
}

wait_hostapd() {
	local dev="$1"
	local loop=0
	local found hostapd_running

	# CE:For channels whose nominal bandwidth falls completely or partly within the
	# band 5600 MHz to 5650 MHz, CAC time last for 10min
	while [ $loop -lt 110 ]; do
		[ $((loop%10)) -eq 0 ] && echo -ne "\n Waiting for interface $dev to be ready"
		found=`is_hostapd_ready $dev`
		if [ $found -eq 1 ]; then
			loop=110
			tpdbg "hostapd for $dev is ready"
		else
			sleep 6
			loop=$((loop+1))
			hostapd_running=`is_process_running hostapd_$dev`
			if [ $hostapd_running -eq 0 ]; then
				tpdbg "Start $dev fail! abort!!!"

				#release lock
				lock -u $TP_DIR/wireless_schedule.lock

				exit 1
			fi
		fi
	done
}

wifi_hostapd_reload() {
	local dev="$1"
	local hostapd_name=hostapd_"$dev"
	local hostapd_cli_name=hostapd_cli_"$dev"

	### start hostapd ###
	if [ ! -e /tmp/$hostapd_name ]; then
		cp -s /opt/lantiq/bin/hostapd /tmp/$hostapd_name
	fi

	if [ ! -e /tmp/$hostapd_cli_name ]; then
		cp -s /opt/lantiq/bin/hostapd_cli /tmp/$hostapd_cli_name
	fi

	tpdbg "run $hostapd_name"
	#/tmp/$hostapd_name -B -e /tmp/hostapd_ent_$dev /opt/lantiq/wave/confs/hostapd_$dev.conf
	/tmp/$hostapd_name -B -e /tmp/hostapd_ent_$dev /tmp/hostapd_$dev.conf
	sleep 1
	tpdbg "run $hostapd_cli_name"
	/tmp/$hostapd_cli_name -i$dev -a/lib/wifi/wps-hostapd-event -B
	
	### start drvhlpr ###
	local drvhlpr_name=drvhlpr_"$dev"
	if [ ! -e /tmp/$drvhlpr_name ]; then
		cp -s /opt/lantiq/bin/drvhlpr /tmp/$drvhlpr_name
	fi
	drvhlpr_running=`is_process_running $drvhlpr_name`
	[ $drvhlpr_running -eq 0 ] && (. /opt/lantiq/wave/scripts/fapi_wlan_wave_drvhlpr.sh $dev &)

	#need recheck?
}

#wifi_hostapd_beacon_interval_set wlan0 beacon_interval
wifi_hostapd_beacon_interval_set() {
	echo "[  wifi_hostapd_beacon_interval_set][SATRT]" >$STDOUT
	echo $@ >$STDOUT
	local dev=$1
	local beacon_interval=$2
	
	wifi_hostapd_add_conf $dev beacon_int $beacon_interval
		
	echo "[  wifi_hostapd_beacon_interval_set][END]" >$STDOUT	
}

#wifi_hostapd_dtim_interval_set wlan0 dtim_interval
wifi_hostapd_dtim_interval_set() {
	echo "[  wifi_hostapd_dtim_interval_set][SATRT]" >$STDOUT
	echo $@ >$STDOUT
	#local if_index=${1##wlan}
	local dev=$1
	local dtim_interval=$2
	#local TR181_FILE=$TP_FAPI_TR181_DIR/wifi_dtim_intervalw
	#
	#wifi_clean_pre_up_flag
	#
	#test -f $TR181_FILE && rm -f $TR181_FILE
	#echo "Object_0=Device.WiFi.Radio" >>$TR181_FILE
	#echo "DTIMPeriod_0="$dtim_interval >>$TR181_FILE
	#wifi_radio_tr181_set $if_index $TR181_FILE
	#	#iwpriv wlan0 gDTIMPeriod
	#wifi_iwpriv_debug wlan$if_index gDTIMPeriod $dtim_interval
	
	echo "iwpriv $dev sDTIMPeriod $dtim_interval" >>${TP_TMP_IWPRIV_PRE_UP}_${dev}
	echo "[dump TP_TMP_IWPRIV_PRE_UP_${dev}]" >$STDOUT
	cat ${TP_TMP_IWPRIV_PRE_UP}_${dev} >$STDOUT
	
	#wifi_hostapd_add_conf "$dev" "dtim_period" "$dtim_interval"
	echo "[  wifi_hostapd_dtim_interval_set][END]" >$STDOUT	
}

#wifi_hostapd_wmm_set wlan0 wmm_enable(true/false)
wifi_hostapd_wmm_set() {
	echo "[  wifi_hostapd_wmm_set][SATRT]" >$STDOUT
	
	echo $@ >$STDOUT
	#local if_index=${1##wlan}
	local dev=$1
	local wmm_capability=true
	local enable=""
	if [ "$wmm_capability" = "true" ]; then
		enable=1
	else
		enable=0
	fi
	#local wmm_enable=$2
	#local TR181_FILE=$TP_FAPI_TR181_DIR/wifi_wmm
    #
	#test -f $TR181_FILE && rm -f $TR181_FILE
	#echo "Object_0=Device.WiFi.AccessPoint" >>$TR181_FILE
	#echo "WMMCapability_0="$wmm_capability >>$TR181_FILE
	#echo "WMMEnable_0="$wmm_enable >>$TR181_FILE
	#wifi_radio_tr181_set $if_index $TR181_FILE
	#No iwpriv
	#hostapd_wlan2.conf wmm_enabled
	wifi_hostapd_add_conf "$dev" "wmm_enabled" "$enable"
	
	echo "[  wifi_hostapd_wmm_set][END]" >$STDOUT	
}

# wifi_hostapd_ssid_hidden_set wlan0 ssid_advertisement_enabled
wifi_hostapd_ssid_hidden_set() {
	echo "[  wifi_hostapd_ssid_hidden_set][SATRT]" >$STDOUT
	#local if_index=${1##wlan}
	local dev=$1
	local ssid_advertisement_enabled=$2
	local enable=""
	
	#FAPI_WLAN_CLI setSsidAdvertisementEnabled -i $if_index -e $ssid_advertisement_enabled
	
	if [ "$ssid_advertisement_enabled" = "true" ]; then
		enable=0
	else
		enable=1
	fi
	
	wifi_hostapd_add_conf "$dev" "ignore_broadcast_ssid" "$enable"
	
	#No iwpriv
	echo "[  wifi_hostapd_ssid_hidden_set][END]" >$STDOUT
}

#wifi_hostapd_ap_isolation_set wlan0 ap_isolation(true/false)
wifi_hostapd_ap_isolation_set() {
	echo "[  wifi_hostapd_ap_isolation_set][SATRT]" >$STDOUT

	echo $@ >$STDOUT
	#local if_index=${1##wlan}
	local dev=$1
	local ap_isolation=$2
	local enable=""
	
	#FAPI_WLAN_CLI setApIsolationEnable -i $if_index -e $ap_isolation
	
	if [ "$ap_isolation" = "true" ]; then
		enable=1
	else
		enable=0
	fi
	
	wifi_hostapd_add_conf "$dev" "ap_isolate" "$enable" 
	#iwpriv gAPforwarding
	#hostapd_wlan2.conf ap_isolate
	
	echo "[  wifi_hostapd_ap_isolation_set][END]" >$STDOUT	
}

#wifi_hostapd_ssid_set wlan0 xxxx
wifi_hostapd_ssid_set() {
	echo "[  wifi_hostapd_ssid_set][SATRT]" >$STDOUT
	#local if_index=${1##wlan}
	local dev=$1
	local ssid=$2

	#FAPI_WLAN_CLI setSsid -i $if_index -s "$ssid"
	wifi_hostapd_add_conf "$dev" "ssid" "$ssid"

	echo "[  wifi_hostapd_ssid_set][END]" >$STDOUT
}

#wifi_hostapd_groupkey_update_period_set wlan0 groupkey_update_period
wifi_hostapd_groupkey_update_period_set() {
	echo "[  wifi_hostapd_groupkey_update_period_set][SATRT]" >$STDOUT
	#local if_index=${1##wlan}
	local dev=$1
	local groupkey_update_period=$2
	

	#FAPI_WLAN_CLI setWpaRekeyInterval -i $if_index -p $groupkey_update_period
	wifi_hostapd_add_conf "$dev" "wpa_group_rekey" "$groupkey_update_period"
	wifi_hostapd_add_conf "$dev" "wpa_gmk_rekey" "$groupkey_update_period"
	
	#No iwpriv
	#hostapd_wlan2.conf wpa_group_rekey

	
	echo "[  wifi_hostapd_groupkey_update_period_set][END]" >$STDOUT	
}


##################
### iwpriv cmd ###
##################
wifi_iwpriv_set_all() {
	echo "[  wifi_iwpriv_set_all][SATRT]" >$STDOUT
	if [ -e $TP_TMP_IWPRIV ]; then
		cat $TP_TMP_IWPRIV >$STDOUT
		. $TP_TMP_IWPRIV
		rm -f $TP_TMP_IWPRIV
	fi
	echo "[  wifi_iwpriv_set_all][END]" >$STDOUT
}

#################################
### abstract functions define ###
#################################
#wifi_abs_debug wlan0 
wifi_abs_debug() {
	echo "[  wifi_abs_debug][SATRT]" >$STDOUT
	local dev=$1
	
	wifi_abs_basic_config $dev
	wifi_abs_security_config $dev
	wifi_abs_adv_features_config $dev
	wifi_abs_wps_config $dev
	wifi_abs_guest_network_set $dev

	#wifi_fapi_reset
	#wifi_ifconfig_up
	
	echo "[  wifi_abs_debug][END]" >$STDOUT	
}

#set country hwmode htmode channel ssid
wifi_abs_basic_config() {
	echo "[  wifi_abs_basic_config][SATRT]" >$STDOUT
	local dev="$1"
	local wds_enable="0"
	local eth_enable="0"
	local home_vif=""
	local wds_vif=""
	local vif=""
	
	config_get country $dev country
	config_get band $dev band
	config_get hwmode $dev hwmode
	config_get htmode $dev htmode
	config_get channel $dev channel
	config_get_bool wifi_disabled $dev disabled
	
	echo "country="$country >$STDOUT
	echo "band="$band >$STDOUT
	echo "hwmode="$hwmode >$STDOUT
	echo "htmode="$htmode >$STDOUT
	echo "channel="$channel >$STDOUT
	echo "wifi_disabled="$wifi_disabled >$STDOUT
	
	if [ "$wifi_disabled" = "0" ]; then
		config_get vifs $dev vifs
		for vif in $vifs; do # vifs is wl01/wl02/wl03, home/guest/wds
			config_get_bool enable $vif enable
			config_get mode $vif mode
			config_get guest $vif guest
			echo "enable="$enable >$STDOUT
			echo "mode="$mode >$STDOUT
			echo "guest="$guest >$STDOUT
			
			#find home vif
			if [ "$enable" = "1" -a "$mode" = "ap" -a -z "$guest" ]; then
				eth_enable="1"
				home_vif=$vif
			#find wds
			elif [ "$enable" = "1" -a "$mode" = "sta" ]; then
				eth_enable="1"
				wds_enable="1"
				wds_vif=$vif
			else
				echo "=====>>>>> $dev: vif $vif is disabled or $vif is a guest network" >$STDOUT
			fi
		done
	fi
	

	if [ "$eth_enable" = "1" -a -n "$home_vif" ]; then
				
		#set ssid
		config_get ssid $home_vif ssid
		echo "basic_todo set ssid" >$STDOUT
		echo "ssid=${ssid}" >$STDOUT
		wifi_hostapd_ssid_set "$dev" "$ssid"
		
		#ssid_hidden on/off
		config_get hidden $home_vif hidden
		local ssid_advertisement_enabled=""
		if [ -n "$hidden" ]; then
			if [ "$hidden" = "on" ]; then
				ssid_advertisement_enabled="false"
			else
				ssid_advertisement_enabled="true"
			fi
			wifi_hostapd_ssid_hidden_set "$dev" "$ssid_advertisement_enabled"
		fi
		
		
		#set countryCode
		local tmpCode=""
		tmpCode=`cat $INTEL_COUNTRYCODE | awk '$1=="'"$country"'" {print $2}'`
		echo "basic_todo set countryCode" >$STDOUT
		echo "countryCode="$tmpCode >$STDOUT
		
		
		#set hwmode & htmode
		# "hwmode",       val = {"n_5", "ac_5", "an_5", "nac_5", "anac_5"}},
		# "hwmode",       val = {"n", "gn", "bgn"}},
		# 11A 11G 11B 11NGHT20 11NGHT40PLUS 11NGHT40MINUS 
		# 11NAHT40PLUS 11NAHT40MINUS 11ACVHT20 11ACVHT40PLUS
		# 11ACVHT40MINUS 11ACVHT80
		echo "basic_todo set hwmode & htmode" >$STDOUT
		echo "hwmode="$hwmode >$STDOUT
		echo "htmode="$htmode >$STDOUT
		local cap=""
		
		#For acs, deliver actual bandwidth to hostapd
		wifi_hostapd_add_conf $dev "htmode" "$htmode"
		# 2.4G
		if [ "$hwmode" = "n" -o "$hwmode" = "gn" -o "$hwmode" = "bgn" ]; then
			if [ "$htmode" = "40" -o "$htmode" = "auto" ]; then
				if [ "$channel" -lt 6 ]; then
					cap="11NGHT40PLUS"
				else
					cap="11NGHT40MINUS"
				fi
			elif [ "$htmode" = "20" ]; then
				cap="11NGHT20"
			else
				echo "[  wifi_abs_basic_config]2.4G HT_CAP ERROR" >$STDOUT
			fi
			
			#set gn & n only
			if [ "$hwmode" = "n" ]; then
				#todo ..
				echo "n_2" >$STDOUT
			elif [ "$hwmode" = "gn" ];then
				#todo ..
				echo "gn" >$STDOUT
			fi
		
		#5G
		elif [ "$hwmode" = "anac_5" -o "$hwmode" = "ac_5" -o "$hwmode" = "nac_5" ]; then
			if [ "$htmode" = "80" -o "$htmode" = "auto" ]; then
				cap="11ACVHT80"
				if [ "$channel" = 165 ]; then
					cap="11ACVHT20"
				fi
			elif [ "$htmode" = "40" ]; then
				#todo .. or 11ACVHT40MINUS?				
				case "$channel" in	
					36|44|52|60|100|108|116|124|132|140|149|157|auto) cap="11ACVHT40PLUS" ;;					
					40|48|56|64|104|112|120|128|136|144|153|161) cap="11ACVHT40MINUS" ;;
				esac
			elif [ "$htmode" = "20" ]; then
				cap="11ACVHT20"
			else
				echo "[  wifi_abs_basic_config]5G anac HT_CAP ERROR" >$STDOUT
			fi
			
			if [ "$hwmode" = "ac_5" ]; then
				wifi_hostapd_add_conf $dev ieee80211n 0
				wifi_hostapd_add_conf $dev ieee80211ac 1
				echo "ac_5" >$STDOUT
			elif [ "$hwmode" = "nac_5" ]; then
				#todo ..???
				wifi_hostapd_add_conf $dev ieee80211n 1
				wifi_hostapd_add_conf $dev ieee80211ac 1
				echo "nac_5" >$STDOUT
			fi
		fi
		echo "cap="$cap >$STDOUT

		# set obss_coex(default true)
		
		# wmf_igmp_enable todo
		
		#set channel & cap & shortgi
		local shortgi="true"
		config_get shortgi $dev shortgi
		if [ -n "$shortgi" ]; then
			if [ "$shortgi" = "on" ]; then
				shortgi="true"
			else
				shortgi="false"
			fi
		fi
		echo "basic_todo set channel & cap & shortgi" >$STDOUT
		wifi_mode_set $dev $country $cap $channel $shortgi
	fi
	
	echo "[  wifi_abs_basic_config][END]" >$STDOUT
	
}

#set security
wifi_abs_security_config() {
	echo "[  wifi_abs_security_config][SATRT]" >$STDOUT
	local dev="$1"
	local close11N="0"
	local wds_enable="0"
	local eth_enable="0"
	local home_vif=""
	local wds_vif=""
	local vif=""
	local sec_mode=""
	
	
	config_get_bool wifi_disabled $dev disabled
	if [ "$wifi_disabled" = "0" ]; then
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
	
	if [ "$eth_enable" = "1" ]; then
		# opt = "encryption",   val = {"none", "psk", "wpa", "wep"}},
		config_get encryption $home_vif encryption
		# opt = "psk_version",  val = {"auto", "wpa", "rsn"}},
		config_get psk_version $home_vif psk_version
		# opt = "psk_cipher",   val = {"auto", "aes", "ccmp", "tkip"}},
		config_get psk_cipher $home_vif psk_cipher
		# opt = "wpa_version",  val = {"auto", "wpa", "rsn"}},
		config_get wpa_version $home_vif wpa_version
		# opt = "wpa_cipher",   val = {"auto", "aes", "ccmp", "tkip"}},
		config_get wpa_cipher $home_vif wpa_cipher
		#todo wifi_abs_security_config
		
		
#INPUT sec_mode: 
# NONE,WEP
# WPA_WPA2_PERSONAL_MIXED,WPA2_PERSONAL_CCMP,WPA_PERSONAL_TKIP
# WPA_WPA2_ENTERPRISE_MIXED,WPA2_ENTERPRISE_CCMP,WPA_ENTERPRISE_TKIP
#
# ( NOTE: HOSTAPD_NEED_RECONFIG=1 )
# WPA2_PERSONAL_TKIP,WPA_PERSONAL_CCMP
# WPA2_ENTERPRISE_TKIP,WPA_ENTERPRISE_CCMP
		local close11N="0"
				
		if [ "$encryption" = "none" ]; then
			sec_mode="NONE"
			KeyPassphrase=""
			wifi_security_set $dev "$sec_mode" "$KeyPassphrase"
		#WPA/WPA2-Personal
		elif [ "$encryption" = "psk" ]; then
			#WPA
			if [ "$psk_version" = "wpa" ]; then
				if [ "$psk_cipher" = "tkip" ]; then
					sec_mode="WPA_PERSONAL_TKIP"
					close11N="1"
				else
					sec_mode="WPA_PERSONAL_CCMP"
				fi
			#WPA2
			elif [ "$psk_version" = "rsn" ]; then
				if [ "$psk_cipher" = "aes" -o "$psk_cipher" = "ccmp" ]; then
					sec_mode="WPA2_PERSONAL_CCMP"
				else
					sec_mode="WPA2_PERSONAL_TKIP"
					close11N="1"
				fi
			#WPA-WPA2 MIXED
			else
				sec_mode="WPA_WPA2_PERSONAL_MIXED"
			fi
			#set key
			config_get psk_key $home_vif psk_key
			config_get wpa_group_rekey $dev wpa_group_rekey
			
			if [ -z $wpa_group_rekey ]; then
				wpa_group_rekey="0"
			fi
			
			wifi_security_set $dev "$sec_mode" "$psk_key"
			wifi_hostapd_groupkey_update_period_set $dev "$wpa_group_rekey"

			
		#WPA/WPA2-Enterprise
		elif [ "$encryption" = "wpa" ]; then
			#WPA
			if [ "$psk_version" = "wpa" ]; then
				if [ "$psk_cipher" = "tkip" ]; then
					sec_mode="WPA_ENTERPRISE_TKIP"
					close11N="1"
				else
					sec_mode="WPA_ENTERPRISE_CCMP"
				fi
			#WPA2
			elif [ "$psk_version" = "rsn" ]; then
				if [ "$psk_cipher" = "aes" -o "$psk_cipher" = "ccmp" ]; then
					sec_mode="WPA2_ENTERPRISE_CCMP"
				else
					sec_mode="WPA2_ENTERPRISE_TKIP"
					close11N="1"
				fi
			#WPA-WPA2 MIXED
			else
				sec_mode="WPA_WPA2_ENTERPRISE_MIXED"
			fi
			#set radius parameters
			config_get wpa_key $home_vif wpa_key
			config_get server $home_vif server
			config_get port $home_vif port
			config_get wpa_group_rekey $dev wpa_group_rekey
			
			if [ -z $wpa_group_rekey ]; then
				wpa_group_rekey="0"
			fi
			
			wifi_security_set $dev "$sec_mode" "$wpa_key" "$server" "$port"
			wifi_hostapd_groupkey_update_period_set $dev "$wpa_group_rekey"
			
		#WEP
		#WEP-128 & WEP with OpenSystem are NOT supported!
		elif [ "$encryption" = "wep" ]; then
			sec_mode="WEP"
			config_get wep_mode $home_vif wep_mode
			config_get wep_key1 $home_vif wep_key1
			close11N="1"
			#set key
			wifi_security_set $dev "$sec_mode" "$wep_key1"
		fi
		
		if [ "$close11N" = "1" ]; then
			echo "close11N" >$STDOUT
		fi
	fi
	
	echo "[  wifi_abs_security_config][END]" >$STDOUT
}

#set ssid_hidden,txpower,mu-mimo,rts_threshold,dtim_interval
#    wmm,short_gi,ap_isolation,bi,atf,bsd
wifi_abs_adv_features_config() {
	echo "[  wifi_abs_adv_features_config][SATRT]" >$STDOUT
	
	local dev="$1"
	
	#txpower    add to pre_up
	#val = {"low", "middle", "high"}
	config_get txpower $dev txpower
	if [ -n "$txpower" ]; then
		if [ "$txpower" = "low" ]; then
			txpower=6
		elif [ "$txpower" = "middle" ]; then
			txpower=3
		else
			txpower=0
		fi
		echo "iwpriv $dev sPowerSelection $txpower" >>${TP_TMP_IWPRIV_PRE_UP}_${dev}
		echo "[dump TP_TMP_IWPRIV_PRE_UP_${dev}]" >$STDOUT
		cat ${TP_TMP_IWPRIV_PRE_UP}_${dev} >$STDOUT
	fi
	
	#mu-mimo on/off
	config_get mu_mimo $dev mu_mimo
	if [ -n "$mu_mimo" ]; then
		if [ "$mu_mimo" = "on" ]; then
			mu_mimo=1
		else
			mu_mimo=0
		fi
		echo "iwpriv $dev sMuOperation $mu_mimo" >>$TP_TMP_IWPRIV
		echo "[dump TP_TMP_IWPRIV]" >$STDOUT
		cat $TP_TMP_IWPRIV >$STDOUT
	fi
	
	#rts_threshold
	#config_get rts $dev rts
	#if [ -n $rts ]; then
	#	wifi_rts_threshold_set $dev $rts
	#fi
	
	#dtim_interval
	config_get dtim_period "$dev" dtim_period
	if [ -n "$dtim_period" ]; then
		wifi_hostapd_dtim_interval_set "$dev" "$dtim_period"
	fi
	
	#wmm on/off
	config_get wmm $dev wmm
	if [ -n "$wmm" ]; then
		if [ "$wmm" = "on" ]; then
			wmm=true
		else
			wmm=false
		fi
		wifi_hostapd_wmm_set "$dev" "$wmm"
	fi
		
	#ap_isolation
	config_get isolate $dev isolate
	local APforwarding=1
	if [ -n "$isolate" ]; then
		if [ "$isolate" = "on" ]; then
			isolate=true
			APforwarding=0
		else
			isolate=false
			APforwarding=1
		fi
		echo "iwpriv $dev sAPforwarding $APforwarding" >>${TP_TMP_IWPRIV_PRE_UP}_${dev}
		echo "[dump TP_TMP_IWPRIV_PRE_UP_${dev}]" >$STDOUT
		cat ${TP_TMP_IWPRIV_PRE_UP}_${dev} >$STDOUT
		wifi_hostapd_ap_isolation_set "$dev" "$isolate"
	fi
	
	#bi    add to pre_up
	config_get beacon_int $dev beacon_int
	if [ -n "$beacon_int" ]; then
		echo "iwpriv $dev sBeaconPeriod $beacon_int" >>${TP_TMP_IWPRIV_PRE_UP}_${dev}
		echo "[dump TP_TMP_IWPRIV_PRE_UP_${dev}]" >$STDOUT
		cat ${TP_TMP_IWPRIV_PRE_UP}_${dev} >$STDOUT
		wifi_hostapd_beacon_interval_set "$dev" "$beacon_int"
	fi
	
	#shutdown power auto self-adj & bw auto self-adj
	echo "iwpriv $dev sSlowProbingMask 0x3c" >>$TP_TMP_IWPRIV
	
	#atf
	config_get atf $dev airtime_fairness
	if [ -n "$atf" ]; then
		if [ "$atf" = "on" ]; then
			atf=1
		else
			atf=0
		fi
		wifi_hostapd_atf_set "$dev" "$atf"
	 fi
	
	#bsd
	echo "todo bsd" >$STDOUT
	
	
	echo "[  wifi_abs_adv_features_config][END]" >$STDOUT
}

#wifi_guest_vap_set
wifi_abs_guest_vap_init() {
	echo "[  wifi_abs_guest_vap_init][SATRT]" >$STDOUT
	local if_index=""
	local vap_idx=""
	for if_index in $DEV_INDEX
	do
		if [ "$if_index" = "0" ]; then
			vap_idx=3
		else
			vap_idx=4
		fi
		FAPI_WLAN_CLI createVap -i "$if_index" -v "$vap_idx" -s "TP-LINK_Guest"	
	done
	
	echo "[  wifi_abs_guest_vap_init][END]" >$STDOUT
}

#wifi_abs_guest_switch 0
wifi_abs_guest_switch() {
	echo "[  wifi_abs_guest_switch][SATRT]" >$STDOUT
	local dev="wlan$1"
	local vif=""
	config_get_bool wifi_disabled $dev disabled       #hardware switch
	config_get_bool soft_disabled $dev disabled_all   #software switch
	if [ "$wifi_disabled" = "0" -a "$soft_disabled" = "0" ]; then
		config_get vifs $dev vifs
		for vif in $vifs; do
			config_get_bool enable $vif enable
			config_get mode $vif mode
			config_get guest $vif guest
			config_get ifname $vif ifname
			if [ "$mode" = "ap" -a "$guest" = "on" -a "$enable" != "1" ]; then	
				echo "=====>>>>> wifi_guest_switch $dev: vif $vif is disabled, do bss down on $GUEST_WIFI" >$STDOUT
				local if_count=`ifconfig | grep $ifname -c`
				while [ "$if_count" = "0" ]					
				do	
					usleep 100
					if_count=`ifconfig | grep $ifname -c`					
				done
				ifconfig $ifname down
			elif [ "$mode" = "ap" -a "$guest" = "on" -a "$enable" = "1" ]; then
				echo "=====>>>>> wifi_guest_switch $dev: vif $vif is enabled, do bss up on $GUEST_WIFI" >$STDOUT
				ifconfig $ifname up
			fi 
		done
	else
		local if_count=`ifconfig | grep ${dev}.0 -c`
		while [ "$if_count" = "0" ]					
		do	
			usleep 100
			if_count=`ifconfig | grep ${dev}.0 -c`					
		done
		ifconfig $dev down
		ifconfig ${dev}.0 down
	fi
	echo "[  wifi_abs_guest_switch][SATRT]" >$STDOUT
}

wifi_abs_guest_network_set() {
	echo "[  wifi_abs_guest_network_set][SATRT]" >$STDOUT
	local dev="$1"
	local close11N
	local vif=""
	local eth_enable="0"
	local guest_enable="0"
	local wds_enable="0"
	local guest_vif=""
	local vifs=""
	local guest_internal_dev=""

	config_get_bool wifi_disabled $dev disabled
	if [ "$wifi_disabled" = "0" ]; then
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
	
	echo "[         debug]e "$eth_enable"|g "$guest_enable"|g "$guest_vif"|w "$wds_enable >$STDOUT
	
	config_get band $dev band
	case $band in
		2g)
			guest_internal_dev="wlan3"
		;;
		5g)
			guest_internal_dev="wlan4"
		;;
	esac
		
	if [ "$eth_enable" = "1" -a "$guest_enable" = "1" ]; then
		#basic set
		config_get ssid $guest_vif ssid
		echo "guest ssid="$ssid >$STDOUT
		wifi_hostapd_ssid_set "$guest_internal_dev" "$ssid"
		
		#ssid_hidden on/off
		config_get hidden $guest_vif hidden
		local ssid_advertisement_enabled=""
		if [ -n "$hidden" ]; then
			if [ "$hidden" = "on" ]; then
				ssid_advertisement_enabled="false"
			else
				ssid_advertisement_enabled="true"
			fi
			wifi_hostapd_ssid_hidden_set "$guest_internal_dev" "$ssid_advertisement_enabled"
		fi
		
		
		#set security
		# opt = "encryption",   val = {"none", "psk", "wpa", "wep"}},
		config_get encryption $guest_vif encryption
		# opt = "psk_version",  val = {"auto", "wpa", "rsn"}},
		config_get psk_version $guest_vif psk_version
		# opt = "psk_cipher",   val = {"auto", "aes", "ccmp", "tkip"}},
		config_get psk_cipher $guest_vif psk_cipher
		
		
		local close11N="0"
				
		if [ "$encryption" = "none" ]; then
			sec_mode="NONE"
			KeyPassphrase=""
			wifi_security_set $guest_internal_dev "$sec_mode" "$KeyPassphrase"
		#WPA/WPA2-Personal
		elif [ "$encryption" = "psk" ]; then
			#WPA
			if [ "$psk_version" = "wpa" ]; then
				if [ "$psk_cipher" = "tkip" ]; then
					sec_mode="WPA_PERSONAL_TKIP"
					close11N="1"
				else
					sec_mode="WPA_PERSONAL_CCMP"
				fi
			#WPA2
			elif [ "$psk_version" = "rsn" ]; then
				if [ "$psk_cipher" = "aes" -o "$psk_cipher" = "ccmp" ]; then
					sec_mode="WPA2_PERSONAL_CCMP"
				else
					sec_mode="WPA2_PERSONAL_TKIP"
					close11N="1"
				fi
			#WPA-WPA2 MIXED
			else
				sec_mode="WPA_WPA2_PERSONAL_MIXED"
			fi
			#set key
			config_get psk_key $guest_vif psk_key
			config_get wpa_group_rekey $guest_internal_dev wpa_group_rekey
			
			if [ -z $wpa_group_rekey ]; then
				wpa_group_rekey="0"
			fi
			wifi_security_set $guest_internal_dev "$sec_mode" "$psk_key"
			wifi_hostapd_groupkey_update_period_set $guest_internal_dev "$wpa_group_rekey"
		fi
		

		
		if [ "$close11N" = "1" ]; then
			echo "close11N" >$STDOUT
		fi
		
		#ap_isolation
		config_get isolate $guest_vif isolate
		if [ -n "$isolate" ]; then
			if [ "$isolate" = "on" ]; then
				isolate=true
			else
				isolate=false
			fi
			wifi_hostapd_ap_isolation_set "$guest_internal_dev" "$isolate"
		fi
				
	else
		echo "=====>>>>> $dev: the $dev is off or the guest is off" >$STDOUT
	fi
	
	echo "[  wifi_abs_guest_network_set][END]" >$STDOUT	
}

#set wps
wifi_abs_wps_config() {
	echo "[  wifi_abs_wps_config][SATRT]" >$STDOUT
	local dev="$1"
	local wpsIf=""
	local wdsIf=""
	local wdsIf=""
	local vif=""
	local vifs=""
	local wps_enable=""
	#wireless.wps.model_number=2.0
	#wireless.wps.os_version=1.0
	#wireless.wps.wps_manufacturer=TP-LINK
	#wireless.wps.serial_number=Archer C3150
	#wireless.wps.wps_device_name=Wireless Router Archer C3150
	#wireless.wps.wps_device_type=6-0050F204-1
	#wireless.wps.model_name=Archer C3150
	#wireless.wps.wps_uuid=87654321-9abc-def0-1234
	#wireless.wps.model_url=http://192.168.0.1:80/
	#wireless.wps.wps_manufacturer_url=www.tp-link.com
	
	config_get vifs $dev vifs
	#find the wps iface
	for vif in $vifs
	do
		config_get mode $vif mode
		config_get guest $vif guest
		if [ "ap" = "$mode" -a -z "$guest" ]; then
			wpsIf="$vif"
			break
		fi
	done
	
	#find the wds iface
	for vif in $vifs
	do
		config_get mode $vif mode	
		if [ -n "$mode" -a "sta" = "$mode" ]; then
			wdsIf="$vif"
			break
		fi
	done
	
	
	config_get wifi_disabled $dev disabled
	config_get disabled_all $dev disabled_all
	config_get wds_enable $wdsIf enable
	config_get wps $wpsIf wps
	
	if [ "$wifi_disabled" = "on" -o "$disabled_all" = "on" -o "$wds_enable" = "on" -o "$wps" = "off" ]; then
		wps_enable="0"
	else
		wps_enable="2"
	fi
	
	config_get device_name wps wps_device_name
	#config_get uuid wps wps_uuid
	config_get manufacturer_url wps wps_manufacturer_url
	config_get pin $wpsIf wps_pin
	#config_get os_version wps os_version
	config_get device_type wps wps_device_type
	config_get model_number wps model_number
	config_get manufacturer wps wps_manufacturer
	config_get serial_number wps serial_number
	config_get model_name wps model_name
	
	
	wifi_hostapd_add_conf $dev device_name "$device_name"
	wifi_hostapd_add_conf $dev manufacturer_url "$manufacturer_url"
	wifi_hostapd_add_conf $dev ap_pin "$pin"
	wifi_hostapd_add_conf $dev wps_state "$wps_enable"
	#wifi_hostapd_add_conf $dev os_version "$os_version"
	wifi_hostapd_add_conf $dev device_type "$device_type"
	wifi_hostapd_add_conf $dev model_number "$model_number"
	wifi_hostapd_add_conf $dev manufacturer "$manufacturer"
	wifi_hostapd_add_conf $dev serial_number "$serial_number"
	wifi_hostapd_add_conf $dev model_name "$model_name"

	echo "[  wifi_abs_wps_config][END]" >$STDOUT
}


wifi_qos_config() {
	echo "[  wifi_wps][SATRT]" >$STDOUT
	qoscfg -I 1 &
	echo "[  wifi_wps][END]" >$STDOUT
}
############################
### sys functions define ###
############################

wifi_wps() {
	local wps_cmd dev wps uuid vif="$1"
	config_get_bool wps "$vif" wps 0
	config_get timeout "$vif" wps_timeout 120
	config_get dev "$vif" device
	config_get uuid wps wps_uuid

	tpdbg "-->WPS: vif=$vif, dev=$dev, cmd=$2, pin=$3"

	local hostapd_cli_name=hostapd_cli_"$dev"
	wps_cmd="/tmp/$hostapd_cli_name -i$dev"

	if [ "$wps" = "1" ] && [ -e "/tmp/$hostapd_cli_name" ]; then
		case $2 in
		wps_ap_pin)
			if [ "$3" = "disable" ]; then
				$wps_cmd wps_ap_pin "$dev" disable
				tpdbg "--->cmd:$wps_cmd wps_ap_pin $dev disable"
			elif [ "$($wps_cmd wps_check_pin $4)" = "$4" ]; then
				$wps_cmd wps_ap_pin "$dev" set "$4"
				tpdbg "--->cmd:$wps_cmd wps_ap_pin $dev set $4"
			else
				echo "FAIL" > STDOUT
			fi;;
		pin)
			if [ "$($wps_cmd wps_check_pin $3)" = "$3" ]; then
				$wps_cmd wps_pin "$dev" any "$3"
				tpdbg "--->cmd:$wps_cmd wps_pin $dev any $3"
			else
				echo "PIN Status: Invalid" > STDOUT
			fi;;
		pbc)	 
				$wps_cmd wps_pbc "$dev"
				tpdbg "--->cmd:$wps_cmd wps_pbc $dev"
				;;
		status)	 
				$wps_cmd wps_get_status
				tpdbg "--->cmd:$wps_cmd wps_get_status"
				;;
		cancel)	
				$wps_cmd wps_cancel
				tpdbg "--->cmd:$wps_cmd wps_cancel"
				;;
		config)	
				$wps_cmd get_config "$dev"
				tpdbg "--->cmd:$wps_cmd get_config $dev"
				;;
		pin_lock)
				$wps_cmd pin_lock_status "$dev"
				tpdbg "--->cmd:$wps_cmd pin_lock_status"
				;;
		*)shift 1;$wps_cmd $*;tpdbg "--->defcmd:$wps_cmd  $*";;
		esac
		echo ""
	fi
}

#wifi_wps_pin_pbc method if_index pin
wifi_wps_pin_pbc() {
	echo "[  wifi_wps_pin_pbc][SATRT]" >$STDOUT
	#check lock
	lock $TP_DIR/wireless_schedule.lock
	local method=$1
	local if_index=$2
	local pin=$3
	
	if [ "$method" = "pin" ]; then
		pin="$3"
		FAPI_WLAN_CLI setWpsEnrolleePin -i "$if_index" -p "$pin"
	elif [ "$method" = "pbc" ]; then
		FAPI_WLAN_CLI setWpsPbcTrigger -i "$if_index"	
	fi
	#delete lock
	lock -u $TP_DIR/wireless_schedule.lock
	echo "[  wifi_wps_pin_pbc][END]" >$STDOUT
}

wifi_wps_switch() {
	echo "[  wifi_wps_switch][SATRT]" >$STDOUT
	#todo ...
	#local dev=""
	#for dev in $DEV_INDEX
	#do
	#	wifi_abs_wps_config wlan$dev
	#done
	wifi_reload
	echo "[  wifi_wps_switch][END]" >$STDOUT	
}

wifi_vlan() {
	local dev vif port hwb_disabled web_disabled enable mode band guest ifname isolate access
	local hostvid=$((0x7))
	local guestvid=0
	local brname

	get_brname brname
	for port in $(brctl show "$brname" | grep -E "eth" | cut -f 6-8); do
		# set vid on lan interface
		brctl setifvlan "$brname" "$port" "$hostvid" 1
	done

	for dev in $DEVICES; do
		config_get band "$dev" band

		# wirless schedule may close some dev currently, check it first.
		if [ "$WIFI_SCHEDULE" = "1" ]; then
			wireless_schedule_disable_wifi "$band" && continue
		fi

		config_get_bool hwb_disabled "$dev" disabled       #hardware switch
		config_get_bool web_disabled "$dev" disabled_all   #software switch
		if [ "$hwb_disabled" = "0" ] && [ "$web_disabled" = "0" ]; then
			config_get vifs "$dev" vifs

			for vif in $vifs; do
				config_get_bool enable "$vif" enable
				if [ "$enable" = "0" ]; then
					continue
				fi

				config_get mode "$vif" mode
				config_get guest "$vif" guest
				config_get ifname "$vif" ifname
				config_get_bool isolate "$vif" isolate
				config_get_bool access "$vif" access 1

				if [ "$mode" = "ap" ]; then
					local fw_action
					if [ "$guest" = "on" ]; then
						# set vid on guest interface
						if [ "$access" = "0" ]; then
							fw_action="block"
							if [ "$guestvid" = "0" ]; then
								guestvid=$((0x8))
							else
								[ "$isolate" = 1 ] && guestvid=$(($guestvid << 1))
							fi
						else
							fw_action="unblock"
							if [ "$guestvid" = "0" ]; then
								guestvid=$((0x1))
							else
								[ "$isolate" = 1 ] && guestvid=$(($guestvid << 1))
							fi
						fi

						brctl setifvlan "$brname" "$ifname" "$guestvid" 1

						# Force block, guestnetwork can't access WEBSERVER
						fw "$fw_action"_rt_access dev "$ifname" &
						echo "$access" > /proc/bridge_filter/local_access_flag
					else
						# set vid on host interface
						brctl setifvlan "$brname" "$ifname" "$hostvid" 1
					fi
				elif [ "$mode" = "sta" ]; then
					case $band in
						2g)
							ifname="wlan0.2"
						;;
						5g)
							ifname="wlan2.2"
						;;
					esac

					brctl setifvlan "$brname" "$ifname" 15 1
				else
					tpdbg "-->set_vid: unknow mode=${mode} for interface vif=${vif}"
				fi
			done
		fi
	done
}

wifi_led_set() {
	local led_state=""
	local dev=""
	for dev in ${DEV_INDEX}; do
		config_get disabled wlan$dev disabled
		config_get disabled_all wlan$dev disabled_all
		config_get band wlan$dev band
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
		fi

		ledcli ${band}_${led_state}
	done

	# Power/WPS use the same LED
	# Reset this led status to ON
	ledcli WPS_ON
}

wifi_radio() {
	wifi_reload
}

wifi_vap() {
	wifi_reload
}

wifi_country() {
	# just for test
	shutdown_wifi_interface
}

start_wifi_interface() {
	local dev web_disabled hwb_disabled

	# start apps
	for dev in $DEVICES; do

		# wirless schedule may close some dev currently, check it first.
		if [ "$WIFI_SCHEDULE" = "1" ]; then
			local band
			config_get band "$dev" band
			wireless_schedule_disable_wifi "$band" && continue
		fi

		config_get_bool hwb_disabled "$dev" disabled       #hardware switch
		config_get_bool web_disabled "$dev" disabled_all   #software switch
		if [ "$web_disabled" = "0" ] && [ "$hwb_disabled" = "0" ]; then
			if [ -z `brctl show | grep "rtlog0" | awk '{print $1}'`]; then
				tpdbg "### Wlan logger commands ###"
				local brmac=`network_get_firm lan`
				brmac=${brmac//-/:}
				ifconfig rtlog0 hw ether $brmac
				brctl addif br-lan rtlog0
				ifconfig rtlog0 up
				switch_cli dev=1 GSW_MAC_TABLE_ENTRY_ADD nFId=0 nPortId=9 nSubIfId=255 bStaticEntry=1 nMAC=00:00:00:00:00:10
			fi

			# intel special cmds - part I
			pre_up_commands "$dev"

			tpdbg "### run hostapd for $dev ###"
			wifi_fixup_mode "$dev"
			hostapd_create_conf "$dev"
			wifi_hostapd_reload "$dev"

			# intel special cmds - part II
			tpdbg "### AccessPoint post-up commands ###"
			post_up_commands "$dev"
		fi
	done

	# reconfig QoS ifb1 interface
	[ -e /usr/sbin/qos_ifb_start ] && /usr/sbin/qos_ifb_start
}

shutdown_wifi_interface() {
	local dev
	local apps
	for dev in $DEVICES; do
		tpdbg "Shutdown User APP for $dev"
		apps="hostapd_$dev"
		for app in $apps;do
			tpdbg "try to kill $app"
			killall "$app" 2>/dev/null
			running=`is_process_running $app`
			shutdown_timeout=0
			while [ $running -eq 1 ] && [ $shutdown_timeout -lt 15 ] ; do
				sleep 1
				tpdbg "->wait for $shutdown_timeout secs"
				running=`is_process_running $app`
				shutdown_timeout=$((shutdown_timeout+1))
			done
			if [ $shutdown_timeout -eq 15 ]; then
				app_pid=`ps | grep $app | grep -v grep | awk '{print $1}'`
				kill -9 $app_pid
				tpdbg "->kill $app pid=$app_pid"
			fi
		done

		tpdbg "Stop fapi_wlan_daemon (hostapd) listener"
		killall -SIGUSR2 fapi_wlan_daemon

		# wait for interface down
		if_count=`ifconfig | grep $dev -c`
		if_timeout=0
		while [ $if_count -gt 0 ] && [ $if_timeout -lt 15 ]; do
			sleep 1
			tpdbg "->wait $dev down for $if_timeout secs"
			if_count=`ifconfig | grep $dev -c`
			if_timeout=$((if_timeout+1))
		done
		if [ $if_timeout -ge 15 ];then
			tpdbg "->force $dev down"
			ifconfig $dev down
		fi

		#for app in $apps;do
		#	tpdbg "->del $app"
		#	rm -f /tmp/$app
		#done
	done
}

wifi_reload_exec() {
	#lock
	lock $TP_DIR/wireless_schedule.lock
	# shutdown current wifi interface
	shutdown_wifi_interface

	# start wifi interface with new config
	start_wifi_interface

	# light wifi led
	wifi_led_set

	# config vlan
	wifi_vlan

	#wifi_smart_config
	
	#unlock
	lock -u $TP_DIR/wireless_schedule.lock
}

wifi_reload() {
	# run wifi reload process in the background, unblock upper operation
	wifi_reload_exec &
}

wifi_mode() {
	echo "[  wifi_mode][SATRT]" >$STDOUT
	wifi_reload
	echo "[  wifi_mode][END]" >$STDOUT
}

wifi_start_calibrate(){
	rftest -n
	echo " rftest start" >$STDOUT
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

wifi_stash() {
	echo "[  wifi_stash][SATRT]" >$STDOUT
	echo "[  wifi_stash][LOAD DRIVER]" >$STDOUT
	echo "[  wifi_stash][END]" >$STDOUT
}

wifi_init() {
	local dev
	tpdbg "Start Intel WLAN..."
	
	cp -s ${HOSTAPD_SCRIPT_DIR}/fapi_wlan_wave_lib_common.sh /tmp/
	cp -s ${HOSTAPD_SCRIPT_DIR}/fapi_wlan_wave_lib_convert.sh /tmp/
	cp -s ${HOSTAPD_SCRIPT_DIR}/fapi_wlan_wave_lib_wps.sh /tmp/
	cp -s ${HOSTAPD_SCRIPT_DIR}/fapi_wlan_wave_lib_recovery.sh /tmp/
	#first boot
	mkdir $TP_DIR

	# /tmp is working dirction
	cd /tmp

	mkdir -p /tmp/wlan_wave

	# fetch caldata
	local is_cal=`is_cal`
	if [ "$is_cal" = "true" ]; then
		read_img wlanconfig /tmp/eeprom.tar.gz
		tar xzf /tmp/eeprom.tar.gz -C /tmp/
		cal_cbr
	else
		tpdbg "Warning: use default caldata!"
		cp -s ${TP_DEFAULT_CAL_PREFIX}cal_wlan0.bin /tmp/cal_wlan0.bin
	fi

	#echo /opt/lantiq/sbin/hotplug > /proc/sys/kernel/hotplug

	# bringUp udevd
	udevd_running=`is_process_running udevd`
	[ $udevd_running -eq 1 ] || udevd --daemon
	
	# set default Country, this will be changed by hostapd later
	# NOTE: this step is neceary to bring up wlan2
	export COUNTRY=00
	crda
	touch /tmp/wlan_wave/crda_executed

	# insert wlan kernel modules
	tpdbg "insert kernel modules"
	cp -s /opt/lantiq/lib/modules/3.10.104/net/mtlkroot.ko /tmp/
	cp -s /opt/lantiq/lib/modules/3.10.104/net/mtlk.ko /tmp/
	insmod mtlkroot.ko

	# start logserver
	if [ ! -e /tmp/logserver ]; then
		cp -s /opt/lantiq/bin/logserver /tmp/
		cp -s /opt/lantiq/wave/images/fw_scd_file.scd /tmp/
	fi
	/tmp/logserver -f /dev/mtlkroot0 -s /tmp/fw_scd_file.scd &

	[ -z $(pgrep fapi_wave_recoveryd) ] && ${USRSBINDIR}/fapi_wave_recoveryd &
	rcvry_timeout=0
	while [ -z $(pgrep fapi_wave_recoveryd) ] && [ $rcvry_timeout -lt 15 ]
	do
	echo "RCVRY:FAPI SOCKET INIT in progress wait $rcvry_timeout of 15" >>/dev/console
	let rcvry_timeout=$((rcvry_timeout+1))
	done

	insmod mtlk.ko  fastpath=1,1,1 ahb_off=1 loggersid=255,255  dual_pci=1,0 rcvry_on=1,1

	# bringUp fapi_wlan_daemon
	/opt/lantiq/wave/scripts/fapi_wlan_wave_daemon_start &

	# need Calibration
	if [ "$is_cal" = "true" ]; then
		wifi_reload &
	else
		tpdbg "Start Calibrate ..."
		wifi_mfg_mode &
	fi
	
	tpdbg "Wlan is running..."

	# Back to org dir
	cd -
}

kick_out() {
	local dev=$1
	local ifname=$2
	local hostapd_cli_name=hostapd_cli_"$dev"

	if [ ! -e /tmp/$hostapd_cli_name ]; then
		cp -s /opt/lantiq/bin/hostapd_cli /tmp/$hostapd_cli_name
	fi

	stalist=`cat /proc/net/mtlk/$ifname/PeerFlowStatus | grep "STA MAC" | awk '{print $1}'`
	for sta in $stalist; do
		/tmp/$hostapd_cli_name -i $dev deauthenticate $ifname $sta
	done

}

wifi_disconnect_stas() {
	for dev in $DEVICES; do
		config_get vifs "$dev" vifs
		for vif in $vifs; do
			config_get ifname "$vif" ifname
			if [ -d /proc/net/mtlk/$ifname -a "$(config_get $vif mode)" = "ap" ]; then
				kick_out $dev $ifname
			fi
		done
	done
}

wifi_fixup_mode() {
	local dev="$1"
	local hwmode legacy_mode htmode channel chan_offset
	local ieee80211n="0"
	local ieee80211ac="0"
	local ieee80211ax="0"
	local hw_mode ht_mode

	config_get hwmode "$dev" hwmode
	case "$hwmode" in
		b)
			hwmode=11b
			legacy_mode="1"
			hw_mode=b
		;;
		g)
			hwmode=11g
			legacy_mode="1"
			hw_mode=g
		;;
		bg)
			hwmode=11bg
			legacy_mode="1"
			hw_mode=g
		;;
		n)
			hwmode=11n
			hw_mode=g
			ieee80211n="1"
		;;
		gn)
			hwmode=11gn
			hw_mode=g
			ieee80211n="1"
		;;
		bgn)
			hwmode=11bgn
			hw_mode=g
			ieee80211n="1"
		;;
		ax)
			hwmode=11ax
			hw_mode=g
			ieee80211n="1"
			ieee80211ax="1"
		;;
		bgnax)
			hwmode=11bgnax
			hw_mode=g
			ieee80211n="1"
			ieee80211ax="1"
		;;
		a_5)
			hwmode=11a
			legacy_mode="1"
			hw_mode=a
		;;
		n_5)
			hwmode=11n
			hw_mode=a
			ieee80211n="1"
		;;
		an_5)
			hwmode=11an
			hw_mode=a
			ieee80211n="1"
		;;
		ac_5)
			hwmode=11ac
			hw_mode=a
			ieee80211ac="1"
		;;
		nac_5)
			hwmode=11nac
			hw_mode=a
			ieee80211n="1"
			ieee80211ac="1"
		;;
		anac_5)
			hwmode=11anac
			hw_mode=a
			ieee80211n="1"
			ieee80211ac="1"
		;;
		ax_5)
			hwmode=11ax_5
			hw_mode=a
			ieee80211n="1"
			ieee80211ac="1"
			ieee80211ax="1"
		;;
		anacax_5)
			hwmode=11anacax
			hw_mode=a
			ieee80211n="1"
			ieee80211ac="1"
			ieee80211ax="1"
		;;
	esac

	# record status
	#config_set $dev hwmode $hwmode
	config_set "$dev" hw_mode "$hw_mode"
	config_set "$dev" ieee80211n "$ieee80211n"
	config_set "$dev" ieee80211ac "$ieee80211ac"
	config_set "$dev" ieee80211ax "$ieee80211ax"


	config_get htmode "$dev" htmode
	config_get band "$dev" band
	config_get channel "$dev" channel

	ht_mode=$htmode
	if [ "$legacy_mode" = "1" ]; then
		ht_mode="20"
	elif [ "$htmode" = "auto" ]; then
		if [ "$band" = "2g" ]; then
			config_set "$dev" coext "1"
			ht_mode="40"
		else
			if [ "$channel" = "132" ] || [ "$channel" = "136" ]; then
				ht_mode="40"
			elif [ "$channel" = "140" ] || [ "$channel" = "165" ]; then
				ht_mode="20"
			else
				ht_mode="80"
			fi
		fi
	fi
	config_set "$dev" ht_mode "$ht_mode"

	case "$channel" in 
		1|2|3|4|5|6|36|44|52|60|100|108|116|124|132|140|149|157|auto) chan_offset="PLUS" ;;
		7|8|9|10|11|12|13|40|48|56|64|104|112|120|128|136|144|153|161) chan_offset="MINUS" ;;
	esac

	config_set "$dev" chanoffset "$chan_offset"
}

stop_smart_connect() {
	killall  fapi_wlan_debug_cli
}

start_smart_connect() {
	/usr/sbin/fapi_wlan_debug_cli BAND_STEERING -50 -70 3 10 15 &
}

wifi_smart_config() {
	local smart_enable
	smart_enable=`uci get wireless.smart.smart_enable`
	if [ "${smart_enable}" == "on" ]; then
		stop_smart_connect
		start_smart_connect
	elif [ "${smart_enable}" == "off" ]; then
		stop_smart_connect
	fi
}

wifi_smart() {
	echo "======>>>>>set smart connect" >$STDOUT
	wifi_smart_config
}

wifi_mfg_mode() {
	#for Button check
	touch /tmp/dut_is_not_cal

	#check lock
	lock $TP_DIR/wireless_schedule.lock

	wifi_sys_led_flick &

	for dev in $DEVICES; do
		# intel special cmds - part I
		pre_up_commands "$dev"

		tpdbg "### cali: run hostapd for $dev ###"
		cp -s /opt/lantiq/wave/confs/hostapd_$dev.conf  /tmp/
		wifi_hostapd_reload "$dev"

		# intel special cmds - part II
		tpdbg "### cali: AccessPoint post-up commands ###"
		post_up_commands "$dev"
	done

	#delete lock
	lock -u $TP_DIR/wireless_schedule.lock

	#tell others wifi is inited
	echo "inited" >/tmp/wifi_state

	wifi_start_calibrate

	exit 0
}

#==========================================
# hostapd conf functions
#==========================================

# Get the phy name in iw for the interface
get_phy_name()
{
	local dev="$1"
	local phy_name

	phy_name=`iw dev $dev info`
	phy_name=${phy_name##*wiphy }
	phy_name=phy${phy_name}
	echo $phy_name
}


# fix_guest_mac $1=xx-xx-xx-xx-xx-xx $2=init/stop
wifi_fix_vif_mac(){
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

# Flags set in the ht_capab are:
# [HT40+]/[HT40-]
# [SMPS-STATIC]
# [SHORT-GI-20]
# [SHORT-GI-40]
# [TX-STBC]
# [RX-STBC1]
# [40-INTOLERANT] currently not set
# [LDPC]
# [MAX-AMSDU-]
convert_ht_capab() {
	local phy_name driver_ldpc driver_stbc_tx driver_stbc_rx driver_stbc cw
	local channel ht_mode chanoffset shortgi
	local ht_capab_value
	local dev="$1"
	phy_name=`get_phy_name $dev`

	config_get channel "$dev" channel "auto"
	config_get chanoffset "$dev" chanoffset
	config_get ht_mode "$dev" ht_mode
	config_get shortgi "$dev" shortgi "off"

	#LDPC
	driver_ldpc=""
	driver_ldpc=`iw phy $phy_name info | grep LDPC`
	[ -n "$driver_ldpc" ] && driver_ldpc="[LDPC]"

	#STBC
	driver_stbc_rx=""
	driver_stbc_tx=""
	no_rx_stbc=`iw phy $phy_name info | grep "No RX STBC"`
	no_tx_stbc=`iw phy $phy_name info | grep "No TX STBC"`
	[ -z "$no_rx_stbc" ] && driver_stbc_rx="[RX-STBC1]"
	[ -z "$no_tx_stbc" ] && driver_stbc_tx="[TX-STBC]"
	driver_stbc="${driver_stbc_tx}${driver_stbc_rx}"

	#Channel Width
	# [HT40-] = both 20 MHz and 40 MHz with secondary channel below the primary channel.
	# [HT40+] = both 20 MHz and 40 MHz with secondary channel above the primary channel.
	# When no value is set, 20 MHz is configured.
	# If HT40 needs to be set and ACS is enabled, only [HT40+] can be set.
	cw=""
	if [ "$channel" = "auto" ] && [ "$ht_mode" != "20" ]; then
		cw="[HT40+]"
	elif [ "$ht_mode" != "20" ]; then
		if [ "$chanoffset" = "PLUS" ]; then
			cw="[HT40+]"
		elif [ "$chanoffset" = "MINUS" ]; then
			cw="[HT40-]"
		fi
	fi

	#Build return value
	ht_capab_value="${cw}${ht_capab_value}${driver_ldpc}[MAX-AMSDU-7935]"

	if [ "$shortgi" = "on" ]; then
		ht_capab_value="${ht_capab_value}[SHORT-GI-20]"
		[ "$ht_mode" != "20" ] && ht_capab_value="${ht_capab_value}[SHORT-GI-40]"
	fi

	echo "$ht_capab_value"
}

# Flags set in the vht_capab are:
# [MAX-MPDU-]
# [RXLDPC]
# [SHORT-GI-80]
# [TX-STBC-2BY1]
# [RX-STBC-1]
# [SU-BEAMFORMER]
# [SOUNDING-DIMENSION-]
# [SU-BEAMFORMEE]
# [BF-ANTENNA-]
# [MU-BEAMFORMER]
# [VHT-TXOP-PS]
# [MAX-A-MPDU-LEN-EXP]
convert_vht_capb() {
	local dev="$1"
	local shortgi ht_mode
	local vht_capab_value

	config_get shortgi "$dev" shortgi "off"
	config_get ht_mode "$dev" ht_mode

	#Build return value
	vht_capab_value="[MAX-MPDU-11454][RXLDPC][TX-STBC-2BY1][BF-ANTENNA-4][SOUNDING-DIMENSION-2][VHT-TXOP-PS][MAX-A-MPDU-LEN-EXP7]"
	if [ "$shortgi" = "on" ]; then
		vht_capab_value="${vht_capab_value}[SHORT-GI-80]"
	fi
	if [ "$ht_mode" = "160" ];then
		vht_capab_value="${vht_capab_value}[VHT160]"
	fi

	echo "$vht_capab_value"
}

convert_vht_channel_width() {
	local chan_width band vht_channel_width

	chan_width="$1"
	band="$2"
	vht_channel_width=""

	if [ "$band" = "2g" ]; then
		vht_channel_width="0"
	else
		case "$chan_width" in
			"20"|"40") vht_channel_width="0" ;;
			"80") vht_channel_width="1" ;;
			"160") vht_channel_width="2" ;;
		esac
	fi
	echo "$vht_channel_width"
}

convert_he_operation_channel_width()
{
	local chan_width band he_op_vht_channel_width

	chan_width="$1"
	band="$2"
	he_op_vht_channel_width=""

	if [ "$band" = "2g" ]; then
		he_op_vht_channel_width="0"
	else
		case "$chan_width" in
			"40"|"20") he_op_vht_channel_width="0" ;;
			"80") he_op_vht_channel_width="1" ;;
			"160") he_op_vht_channel_width="2" ;;
			"80+80") he_op_vht_channel_width="3" ;;
		esac
	fi
	echo "$he_op_vht_channel_width"
}

convert_he_phy_channel_width() {
	local chan_width band he_phy_channel_width

	chan_width="$1"
	band="$2"

	case "$chan_width" in
		"20")
			he_phy_channel_width="0"
		;;
		"40")
			[ "$band" = "2g" ] && he_phy_channel_width="1"
			[ "$band" = "5g" ] && he_phy_channel_width="2"
		;;
		"80")
			[ "$band" = "5g" ] && he_phy_channel_width="2"
		;;
		"160")
			[ "$band" = "5g" ] && he_phy_channel_width="4"
		;;
		*)
			tpdbg "he_phy_channel_width convert fail with chan_width=${chan_width}"
		;;
	esac
	echo "$he_phy_channel_width"
}

# Get the channel number, channel width and secondary channel (if needed) and find the center channel for VHT.
# For 20MHz, return the channel.
# For 40MHz, check the secondary channel and return channel+2 for secondary upper or channel-2 for secondary lower.
# For 80MHz, return the center channel according to the list:
# 36,40,44,48 - return 42
# 52,56,60,64 - return 58
# 100,104,108,112 - return 106
# 116,120,124,128 - return 122
# 132,136,140,144 - return 138
# 149,153,157,161 - return 155
# For 160MHz (or AX auto), return the center channel according to the list:
# 36,40,44,48,52,56,60,64 - return 50
# 100,104,108,112,116,120,124,128 - return 114
convert_center_freq()
{
	local channel cw chan_offset center_freq 

	channel=$1
	chan_width=$2
	chan_offset=$3


	if [ "$channel" = "acs_smart" ]; then
		center_freq=0
	else
		case "$chan_width" in
			"20")
				center_freq="$channel"
			;;
			"40")
				[ "$chan_offset" = "PLUS"  ] && center_freq=$((channel+2))
				[ "$chan_offset" = "MINUS" ] && center_freq=$((channel-2))
			;;
			"80")
				case "$channel" in
					36|40|44|48) center_freq=42 ;;
					52|56|60|64) center_freq=58 ;;
					100|104|108|112) center_freq=106 ;;
					116|120|124|128) center_freq=122 ;;
					132|136|140|144) center_freq=138 ;;
					149|153|157|161) center_freq=155 ;;
				esac
			;;
			"160")
				case "$channel" in
					36|40|44|48|52|56|60|64) center_freq=50 ;;
					100|104|108|112|116|120|124|128) center_freq=114 ;;
				esac
			;;
		esac
	fi
	echo "$center_freq"
}

is_dfs_channel() {
	local ch=$(($1))
	local bw=$(($2))

	if [ $bw -eq 20 -o $bw -eq 40 -o $bw -eq 80 -o $bw -eq 160 ]; then
		if [ $ch -ge 36 -a $ch -le 64 -a $(($ch % 4)) -eq 0 ] ||
		   [ $ch -ge 100 -a $ch -le 144 -a $(($ch % 4)) -eq 0 ] ||
		   [ $ch -ge 149 -a $ch -le 165 -a $((($ch - 1) % 4)) -eq 0 ]; then
			local bwt=$(($bw / 20))
			local cht=$((($ch - 36) / 4))
			local ttt=$(($cht / $bwt))

			# calculate channel range
			local start=$((36 + ($bwt * $ttt) * 4))
			if [ $start -ge 148 ]; then
				# band4 need adjust
				start=$((start + 1))
			fi
			local end=$(($start + ($bwt - 1) *4 ))

			if [ $start -ge 52 -a $start -le 144 ] ||
			   [ $end -ge 52 -a $end -le 144 ]; then
				echo "1"
			else
				echo "0"
			fi
		else
			echo "0"
		fi
	else
		echo "0"
	fi
}

hcfg_head() {
	append "$1" "$2" "$N"
}

hcfg_append() {
	append "$1" "$2" "$N"
}

hostapd_conf_phy() {
	local var="$1"
	local dev="$2"

	hcfg_head "$var" "################ Physical radio parameters ################"
	hcfg_append "$var" "interface=${dev}"
	hcfg_append "$var" "driver=nl80211"
	hcfg_append "$var" "ctrl_interface=/var/run/hostapd"
	hcfg_append "$var" "ctrl_interface_group=0"
	hcfg_append "$var" "atf_config_file=/tmp/hostapd_atf_${dev}.conf"
}

hostapd_conf_wmm() {
	local var="$1"
	hcfg_head "$var" "###___WMM_parameters___###"
	hcfg_append "$var" "wmm_ac_be_aifs=3"
	hcfg_append "$var" "wmm_ac_be_cwmin=4"
	hcfg_append "$var" "wmm_ac_be_cwmax=10"
	hcfg_append "$var" "wmm_ac_be_txop_limit=0"
	hcfg_append "$var" "wmm_ac_bk_aifs=7"
	hcfg_append "$var" "wmm_ac_bk_cwmin=4"
	hcfg_append "$var" "wmm_ac_bk_cwmax=10"
	hcfg_append "$var" "wmm_ac_bk_txop_limit=0"
	hcfg_append "$var" "wmm_ac_vi_aifs=2"
	hcfg_append "$var" "wmm_ac_vi_cwmin=3"
	hcfg_append "$var" "wmm_ac_vi_cwmax=4"
	hcfg_append "$var" "wmm_ac_vi_txop_limit=94"
	hcfg_append "$var" "wmm_ac_vo_aifs=2"
	hcfg_append "$var" "wmm_ac_vo_cwmin=2"
	hcfg_append "$var" "wmm_ac_vo_cwmax=3"
	hcfg_append "$var" "wmm_ac_vo_txop_limit=47"
}

hostapd_conf_radio() {
	local var="$1"
	local dev="$2"

	local country hw_mode ht_mode channel htcap vhtcap ieee80211n ieee80211ac ieee80211ax wifi_disabled shortgi
	local hwmode htmode vht_oper_chwidth vht_oper_centr_freq_seg0_idx vendor_vht acs_fallback_chan add_country_ie chanlist
	local center_freq max_num_sta=32

	config_get country "$dev" country "US"
	config_get hw_mode "$dev" hw_mode
	config_get ht_mode "$dev" ht_mode
	config_get hwmode "$dev" hwmode
	config_get htmode "$dev" htmode
	config_get channel "$dev" channel
	config_get band "$dev" band
	config_get chanoffset "$dev" chanoffset
	config_get ieee80211n "$dev" ieee80211n
	config_get ieee80211ac "$dev" ieee80211ac

	if [ "$channel" = "auto" ]; then
		channel="acs_smart"

		# as ZWDFS not available yet, fixed BW160 with band1+band2
		if [ "$htmode" = "160" ]; then
			local randomnum=$(date +%s)
			local offset=$((${randomnum}%6+1))
			local ch=$((36+offset*4))
			channel="$ch"
		fi
	fi

	if [ "$country" = "US" ] || [ "$country" = "CA" ]; then
		# ACS candidate chanlist for US/CA
		# 2.4: 2 6 10
		# 5G : band4
		if [ "$band" = "5g" ]; then
			add_country_ie="1"
			chanlist="149-161"
			acs_fallback_chan="157 161 80"
		else
			add_country_ie="0"
			chanlist="2 6 10"
			acs_fallback_chan="6 0 20"
		fi
	else
		# ACS candidate chanlist for EU/JP/AU others
		# 2.4: 2 6 10
		# 5G : band1
		if [ "$band" = "5g" ]; then
			add_country_ie="1"
			chanlist="36-48"
			acs_fallback_chan="36 40 80"
		else
			add_country_ie="0"
			chanlist="2 6 10"
			acs_fallback_chan="6 0 20"
		fi
	fi

	htcap=`convert_ht_capab "$dev"`
	vhtcap=`convert_vht_capb "$dev"`
	vht_oper_chwidth=`convert_vht_channel_width $ht_mode $band`
	vht_oper_centr_freq_seg0_idx=`convert_center_freq $channel $ht_mode $chanoffset`

	hcfg_head "$var" "###___Radio_parameters___###"
	hcfg_append "$var" "testbed_mode=0"
	hcfg_append "$var" "country_code=${country}"
	hcfg_append "$var" "hw_mode=${hw_mode}"
	hcfg_append "$var" "ieee80211d=${add_country_ie}"
	hcfg_append "$var" "channel=${channel}"
	hcfg_append "$var" "chanlist=${chanlist}"
	hcfg_append "$var" "htmode=${htmode}"
	hcfg_append "$var" "preamble=1"
	hcfg_append "$var" "ieee80211n=${ieee80211n}"
	if [ "$hwmode" = "n" ] || [ "$hwmode" = "n_5" ]; then
		hcfg_append "$var" "require_ht=1"
	fi
	hcfg_append "$var" "ht_capab=${htcap}"
	hcfg_append "$var" "ht_rifs=1"
	hcfg_append "$var" "ieee80211ac=${ieee80211ac}"
	if [ "$ieee80211ac" = "1" ]; then
		if [ "$hwmode" = "ac_5" ]; then
			hcfg_append "$var" "require_vht=1"
		fi
		hcfg_append "$var" "vht_oper_chwidth=${vht_oper_chwidth}"
		hcfg_append "$var" "vht_capab=${vhtcap}"
		hcfg_append "$var" "vendor_vht=0"
		hcfg_append "$var" "vht_oper_centr_freq_seg0_idx=${vht_oper_centr_freq_seg0_idx}"
	else
		# Support 256QAM on 2.4G
		if [ "$hw_mode" = "g" ]; then
			hcfg_append "$var" "vht_capab=${vhtcap}"
			hcfg_append "$var" "vendor_vht=1"
		fi
	fi
	hcfg_append "$var" "ap_max_num_sta=127"
	hcfg_append "$var" "acs_num_scans=1"

	if [ "$hw_mode" = "g" ] || [ "$hw_mode" = "b" ]; then
		config_get coext "$dev" coext "0"
		if [ "$coext" = "1" ]; then
			hcfg_append "$var" "obss_interval=300"
		else
			hcfg_append "$var" "obss_interval=0"
			hcfg_append "$var" "ignore_40_mhz_intolerant=1"
		fi
		hcfg_append "$var" "scan_passive_dwell=20"
		hcfg_append "$var" "scan_active_dwell=10"
		hcfg_append "$var" "scan_passive_total_per_channel=200"
		hcfg_append "$var" "scan_active_total_per_channel=20"
		hcfg_append "$var" "channel_transition_delay_factor=5"
		hcfg_append "$var" "scan_activity_threshold=25"
		hcfg_append "$var" "obss_beacon_rssi_threshold=-20"
	else
		hcfg_append "$var" "obss_interval=0"
		hcfg_append "$var" "ieee80211h=1"
		hcfg_append "$var" "ignore_40_mhz_intolerant=0"
	fi
	hcfg_append "$var" "assoc_rsp_rx_mcs_mask=1"
	hcfg_append "$var" "acs_vht_dynamic_bw=0"
	hcfg_append "$var" "acs_policy=0"
	hcfg_append "$var" "acs_penalty_factors=1 0 0 0 1 0 1 0 1 1 0"
	hcfg_append "$var" "acs_fallback_chan=${acs_fallback_chan}"
	hcfg_append "$var" "acs_to_degradation=1 1 1 1 1 1 100"
	hcfg_append "$var" "acs_grp_priorities_throughput=3 2 1 0"
	hcfg_append "$var" "acs_grp_priorities_reach=0 1 2 3"
	hcfg_append "$var" "acs_bw_comparison=0"
	hcfg_append "$var" "acs_bw_threshold=20 20 20"
}

hostapd_conf_11ax() {
	local var="$1"
	local dev="$2"

	local ieee80211ax ht_mode hwmode band he_capab he_phy_channel_width_set he_operation_vht_channel_width

	config_get ieee80211ax "$dev" ieee80211ax "0"
	config_get ht_mode "$dev" ht_mode
	config_get hwmode "$dev" hwmode
	config_get band "$dev" band

	#TODO: he_capab
	he_capab="[PLUS_HTC_HE_SUPPORT][ACK_ENABLED_AGGREGATION_SUPPORT][A_MSDU_IN_A_MPDU SUPPORT][DEVICE_CLASS][PPE_THRESHOLD_PRESENT][LDPC_CODING_IN_PAYLOAD][SU_BEAMFORMER_CAPABLE][TRIGGERED_SU_BEAMFORMING_FEEDBACK][TRIGGERED_CQI_FEEDBACK][SU_PPDU_AND_HE_MU_PPDU_WITH_4X_HE_LTF_AND_08US_GI]"
	he_phy_channel_width_set=`convert_he_phy_channel_width $ht_mode $band`
	
	# not used in MR3
	#he_operation_vht_channel_width=`convert_he_operation_channel_width $htmode $band`

	hcfg_head "$var" "###___802.11AX_parameters____###"
	hcfg_append "$var" "ieee80211ax=${ieee80211ax}"
	if [ "$ieee80211ax" = "1" ]; then
		if [ "$hwmode" = "ax" ] || [ "$hwmode" = "ax_5" ]; then
			hcfg_append "$var" "require_he=1"
		fi
		hcfg_append "$var" "he_capab=${he_capab}"
		hcfg_append "$var" "he_mac_maximum_number_of_fragmented_msdus_amsdus=7"
		hcfg_append "$var" "he_mac_multi_tid_aggregation_rx_support=7"
		hcfg_append "$var" "he_mac_maximum_a_mpdu_length_exponent=2"
		hcfg_append "$var" "he_mac_multi_tid_aggregation_tx_support=1"
		hcfg_append "$var" "he_mac_om_control_ul_mu_data_disable_rx_support=1"
		hcfg_append "$var" "he_phy_channel_width_set=${he_phy_channel_width_set}"
		hcfg_append "$var" "he_phy_stbc_tx_less_than_or_equal_80mhz=1"
		hcfg_append "$var" "he_phy_dcm_max_constellation_tx=2"
		hcfg_append "$var" "he_phy_dcm_max_constellation_rx=2"
		hcfg_append "$var" "he_phy_dcm_max_nss_tx=1"
		hcfg_append "$var" "he_phy_dcm_max_nss_rx=1"
		hcfg_append "$var" "he_ppe_thresholds_nsts=3"
		hcfg_append "$var" "he_ppe_thresholds_ru_index_bitmask=15"
		hcfg_append "$var" "he_ppe_thresholds_ppet8_for_nsts1_for_ru0=7"
		hcfg_append "$var" "he_ppe_thresholds_ppet8_for_nsts1_for_ru1=7"
		hcfg_append "$var" "he_ppe_thresholds_ppet8_for_nsts1_for_ru2=7"
		hcfg_append "$var" "he_ppe_thresholds_ppet8_for_nsts1_for_ru3=7"
		hcfg_append "$var" "he_ppe_thresholds_ppet8_for_nsts2_for_ru0=7"
		hcfg_append "$var" "he_ppe_thresholds_ppet8_for_nsts2_for_ru1=7"
		hcfg_append "$var" "he_ppe_thresholds_ppet8_for_nsts2_for_ru2=7"
		hcfg_append "$var" "he_ppe_thresholds_ppet8_for_nsts2_for_ru3=7"
		hcfg_append "$var" "he_ppe_thresholds_ppet8_for_nsts3_for_ru0=7"
		hcfg_append "$var" "he_ppe_thresholds_ppet8_for_nsts3_for_ru1=7"
		hcfg_append "$var" "he_ppe_thresholds_ppet8_for_nsts3_for_ru2=7"
		hcfg_append "$var" "he_ppe_thresholds_ppet8_for_nsts3_for_ru3=7"
		hcfg_append "$var" "he_ppe_thresholds_ppet8_for_nsts4_for_ru0=7"
		hcfg_append "$var" "he_ppe_thresholds_ppet8_for_nsts4_for_ru1=7"
		hcfg_append "$var" "he_ppe_thresholds_ppet8_for_nsts4_for_ru2=7"
		hcfg_append "$var" "he_ppe_thresholds_ppet8_for_nsts4_for_ru3=7"
		hcfg_append "$var" "he_operation_bss_color=4"
		hcfg_append "$var" "he_operation_default_pe_duration=4"
		hcfg_append "$var" "he_operation_txop_duration_rts_threshold=31"
		hcfg_append "$var" "he_operation_max_mcs_for_1ss=0"
		hcfg_append "$var" "he_operation_max_mcs_for_2ss=3"
		hcfg_append "$var" "he_operation_max_mcs_for_3ss=3"
		hcfg_append "$var" "he_operation_max_mcs_for_4ss=3"
		hcfg_append "$var" "he_operation_max_mcs_for_5ss=3"
		hcfg_append "$var" "he_operation_max_mcs_for_6ss=3"
		hcfg_append "$var" "he_operation_max_mcs_for_7ss=3"
		hcfg_append "$var" "he_operation_max_mcs_for_8ss=3"
		hcfg_append "$var" "he_operation_er_su_disable=1"
		hcfg_append "$var" "he_mu_edca_qos_info_queue_request=1"
		hcfg_append "$var" "he_mu_edca_ac_be_aifsn=0"
		hcfg_append "$var" "he_mu_edca_ac_be_ecwmin=15"
		hcfg_append "$var" "he_mu_edca_ac_be_ecwmax=15"
		hcfg_append "$var" "he_mu_edca_ac_be_timer=255"
		hcfg_append "$var" "he_mu_edca_ac_bk_aifsn=0"
		hcfg_append "$var" "he_mu_edca_ac_bk_aci=1"
		hcfg_append "$var" "he_mu_edca_ac_bk_ecwmin=15"
		hcfg_append "$var" "he_mu_edca_ac_bk_ecwmax=15"
		hcfg_append "$var" "he_mu_edca_ac_bk_timer=255"
		hcfg_append "$var" "he_mu_edca_ac_vi_ecwmin=15"
		hcfg_append "$var" "he_mu_edca_ac_vi_ecwmax=15"
		hcfg_append "$var" "he_mu_edca_ac_vi_aifsn=0"
		hcfg_append "$var" "he_mu_edca_ac_vi_aci=2"
		hcfg_append "$var" "he_mu_edca_ac_vi_timer=255"
		hcfg_append "$var" "he_mu_edca_ac_vo_aifsn=0"
		hcfg_append "$var" "he_mu_edca_ac_vo_aci=3"
		hcfg_append "$var" "he_mu_edca_ac_vo_ecwmin=15"
		hcfg_append "$var" "he_mu_edca_ac_vo_ecwmax=15"
		hcfg_append "$var" "he_mu_edca_ac_vo_timer=255"
		hcfg_append "$var" "he_mcs_nss_rx_he_mcs_map_less_than_or_equal_80_mhz=65530"
		hcfg_append "$var" "he_mcs_nss_tx_he_mcs_map_less_than_or_equal_80_mhz=65530"
		hcfg_append "$var" "he_mcs_nss_rx_he_mcs_map_160_mhz=65530"
		hcfg_append "$var" "he_mcs_nss_tx_he_mcs_map_160_mhz=65530"
		hcfg_append "$var" "he_phy_number_of_sounding_dimensions_for_less_than_or_equal_80mhz=1"
	fi
}

hostapd_conf_vap_mbo() {
	local var="$1"

	hcfg_head "$var" "###___MBO_parameters___###"
	hcfg_append "$var" "mbo=1"
	hcfg_append "$var" "mbo_cell_aware=1"
	hcfg_append "$var" "rrm_neighbor_report=1"
	hcfg_append "$var" "bss_transition=1"
	hcfg_append "$var" "mbo_pmf_bypass=1"
	hcfg_append "$var" "interworking=1"
	hcfg_append "$var" "access_network_type=0"
}

hostapd_conf_vap_11k() {
	local var="$1"

	hcfg_head "$var" "###___11k_parameters___###"
	hcfg_append "$var" "rrm_link_measurement=1"
	hcfg_append "$var" "rrm_sta_statistics=1"
	hcfg_append "$var" "rrm_channel_load=1"
	hcfg_append "$var" "rrm_noise_histogram=1"
	hcfg_append "$var" "rrm_beacon_report_passive=1"
	hcfg_append "$var" "rrm_beacon_report_table=1"
}

hostapd_conf_vap_AP_para() {
	local var="$1"
	local dev="$2"
	local vif="$3"

	local guest
	config_get guest "$vif" guest

	local max_sta=32
	config_get band "$dev" band
	[ "$band" = "5g" -o "$band" = "2g" ] && {
		max_sta=$(uci get profile.@wireless[0].max_sta_number_$band -c /etc/profile.d)
	}

	local isolate="0"
	if [ "$guest" = "on" ]; then
		config_get isolate "$vif" isolate
	else
		config_get isolate "$dev" isolate
	fi
	if [ "$isolate" = "on" ]; then
		isolate="1"
	else
		isolate="0"
	fi

	local beacon_int="100"
	config_get beacon_int "$dev" beacon_int

	local dtim_period="1"
	config_get dtim_period "$dev" dtim_period

	local wmm="on"
	config_get wmm "$dev" wmm
	if [ "$wmm" = "on" ]; then
		wmm="1"
	else
		wmm="0"
	fi

	local hidden
	config_get hidden "$vif" hidden "off"
	if [ "$hidden" = "on" ]; then
		hidden="1"
	else
		hidden="0"
	fi

	hcfg_head "$var" "###___AccessPoint_parameters___###"
	hcfg_append "$var" "ignore_broadcast_ssid=${hidden}"
	hcfg_append "$var" "ap_isolate=${isolate}"
	hcfg_append "$var" "dtim_period=${dtim_period}"
	hcfg_append "$var" "beacon_int=${beacon_int}"
	hcfg_append "$var" "ap_max_inactivity=60"
	hcfg_append "$var" "mesh_mode=fAP"
	hcfg_append "$var" "max_num_sta=${max_sta}"
	hcfg_append "$var" "num_res_sta=0"
	hcfg_append "$var" "wmm_enabled=${wmm}"
	hcfg_append "$var" "uapsd_advertisement_enabled=1"
	hcfg_append "$var" "proxy_arp=1"
	hcfg_append "$var" "macaddr_acl=0"
	hcfg_append "$var" "gas_comeback_delay=0"
	hcfg_append "$var" "enable_bss_load_ie=0"
	hcfg_append "$var" "vendor_elements=dd050009860100"

}

hostapd_conf_vap_ssid() {
	local var="$1"
	local dev="$2"
	local vif="$3"

	local ssid bssid macaddr guest guest_macaddr
	config_get macaddr "$dev" macaddr
	config_get guest "$vif" guest
	config_get ssid "$vif" ssid

	if [ "$guest" = "on" ]; then
		bssid=$(wifi_fix_vif_mac $macaddr "init")
	else
		bssid="$macaddr"
	fi

	bssid=${bssid//-/:}

	hcfg_head "$var" "###___SSID_parameters___###"
	hcfg_append "$var" "bridge=br-lan"
	hcfg_append "$var" "ssid=${ssid}"
	hcfg_append "$var" "bssid=${bssid}"
}

hostapd_conf_vap_wps() {
	local var="$1"
	local dev="$2"
	local vif="$3"

	local wps wps_state
	local device_name manufacturer_url pin uuid device_type manufacturer model_name

	config_get guest "$vif" guest
	if [ "$guest" = "on" ]; then
		# close wps on Guest Network
		wps_state="0"
	else
		config_get wps "$vif" wps
		if [ "$wps" = "off" ]; then
			wps_state="0"
		else
			wps_state="2"
		fi

		config_get device_name wps wps_device_name
		config_get manufacturer_url wps wps_manufacturer_url
		config_get pin "$vif" wps_pin
		config_get os_version wps os_version
		config_get device_type wps wps_device_type
		config_get manufacturer wps wps_manufacturer
		config_get model_name wps model_name
		config_get uuid wps wps_uuid
	fi

	hcfg_head "$var" "###___WPS_parameters___###"
	hcfg_append "$var" "wps_state=${wps_state}"
	if [ "$wps" = "on" ]; then
		hcfg_append "$var" "ap_setup_locked=0"
		hcfg_append "$var" "uuid=${uuid}"
		hcfg_append "$var" "device_name=${device_name}"
		hcfg_append "$var" "manufacturer=${manufacturer}"
		hcfg_append "$var" "manufacturer_url=${manufacturer_url}"
		hcfg_append "$var" "device_type=${device_type}"
		hcfg_append "$var" "os_version=01020300"
		hcfg_append "$var" "config_methods=virtual_display push_button virtual_push_button physical_push_button keypad"
		hcfg_append "$var" "ap_pin=${pin}"
		hcfg_append "$var" "wps_cred_processing=2"
		hcfg_append "$var" "wps_rf_bands=ag"
		hcfg_append "$var" "pbc_in_m1=1"
		hcfg_append "$var" "upnp_iface=br-lan"
		hcfg_append "$var" "model_description=Wireless Router ${model_name}"
	fi
}

hostapd_conf_vap_sec(){
	local var="$1"
	local dev="$2"
	local vif="$3"


	local auth_algs pmf_enabled wpa eap_server wep_key
	local eapol_key_index_workaround=0
	local wep_default_key=""
	local wep_key0=""
	local rsn_pairwise=""

	local encryption wep_key1 wep_mode psk_version psk_key wpa_version wpa_key server port

	config_get encryption $vif encryption

	case "$encryption" in 
		"none")
			auth_algs=1
			pmf_enabled=""
			wpa=0
			eap_server=1
			;;
		"wep")
			pmf_enabled=""
			eap_server=1
			wep_default_key=0
			config_get wep_key1 "$vif" wep_key1
			wep_key_len=${#wep_key1}
			if [ "$wep_key_len" = "5" ] || [ "$wep_key_len" = "13" ]; then
				wep_key="\"$wep_key1\""
			else
				wep_key="$wep_key1"
			fi

			# Auth Algr: open/shared
			config_get wep_mode "$vif" wep_mode
			if [ "$wep_mode" = "open" ]; then
				auth_algs=1
			elif [ "$wep_mode" = "open" ]; then
				auth_algs=2
			else
				auth_algs=3
			fi
			;;
		"psk")
			auth_algs=1
			pmf_enabled="0"
			eap_server=1
			wpa_key_mgmt="WPA-PSK"

			#version
			config_get psk_version $vif psk_version
			if [ "$psk_version" = "wpa" ]; then
				wpa=1
				wpa_pairwise="TKIP"
			elif [ "$psk_version" = "rsn" ]; then
				wpa=2
				wpa_pairwise="CCMP"
				rsn_pairwise="CCMP"
			else
				wpa=3
				wpa_pairwise="CCMP TKIP"
				rsn_pairwise="CCMP TKIP"
			fi

			# psk
			config_get psk_key "$vif" psk_key
			psk_len=${#psk_key}

			if [ "$psk_len" = "64" ]; then
				wpa_passphrase=""
				wpa_psk="$psk_key"
			else
				wpa_passphrase="$psk_key"
				wpa_psk=""
			fi
			;;
		"wpa")
			auth_algs=1
			pmf_enabled="0"
			ieee8021x=1
			eap_server=0
			wpa_key_mgmt="WPA-EAP"

			#version
			config_get wpa_version $vif wpa_version
			if [ "$wpa_version" = "wpa" ]; then
				wpa=1
				wpa_pairwise="TKIP"
			elif [ "$wpa_version" = "rsn" ]; then
				wpa=2
				wpa_pairwise="CCMP"
				rsn_pairwise="CCMP"
			else
				wpa=3
				wpa_pairwise="CCMP TKIP"
				rsn_pairwise="CCMP TKIP"
			fi

			config_get wpa_key "$vif" wpa_key
			config_get server "$vif" server
			config_get port "$vif" port
			;;
	esac

	if [ "$encryption" = "psk" ] || [ "$encryption" = "wpa" ]; then
		config_get wpa_group_rekey "$dev" wpa_group_rekey
		if [ -z "$wpa_group_rekey" ]; then
			wpa_group_rekey="0"
		fi
	fi

	hcfg_head "$var" "###___Security_parameters___###"
	hcfg_append "$var" "auth_algs=${auth_algs}"
	hcfg_append "$var" "eapol_key_index_workaround=0"
	hcfg_append "$var" "wpa=${wpa}"
	hcfg_append "$var" "eap_server=${eap_server}"
	if [ "$encryption" = "wep" ]; then
		hcfg_append "$var" "wep_default_key=${wep_default_key}"
		hcfg_append "$var" "wep_key${wep_default_key}=${wep_key}"
	elif [ "$encryption" = "psk" ] || [ "$encryption" = "wpa" ]; then
		hcfg_append "$var" "wpa_key_mgmt=${wpa_key_mgmt}"
		if [ -n "$wpa_passphrase" ]; then
			hcfg_append "$var" "wpa_passphrase=${wpa_passphrase}"
		elif [ -n "$wpa_psk" ]; then
			hcfg_append "$var" "wpa_psk=${wpa_psk}"
		fi
		if [ -n "$wpa_pairwise" ]; then
			hcfg_append "$var" "wpa_pairwise=${wpa_pairwise}"
		fi
		if [ -n "$rsn_pairwise" ]; then
			hcfg_append "$var" "rsn_pairwise=${rsn_pairwise}"
		fi

		if [ "$encryption" = "wpa" ]; then
			hcfg_append "$var" "ieee8021x=${ieee8021x}"
			hcfg_append "$var" "auth_server_addr=${server}"
			hcfg_append "$var" "acct_server_addr=${server}"
			hcfg_append "$var" "auth_server_port=${port}"
			hcfg_append "$var" "acct_server_port=$((port+1))"
			hcfg_append "$var" "auth_server_shared_secret=${wpa_key}"
			hcfg_append "$var" "acct_server_shared_secret=${wpa_key}"
			hcfg_append "$var" "eap_reauth_period=3600"
		fi

		hcfg_append "$var" "wpa_group_rekey=${wpa_group_rekey}"

		if [ -n "$pmf_enabled" ]; then
			hcfg_append "$var" "ieee80211w=${pmf_enabled}"
		fi
	fi
}

hostapd_conf_vap() {
	local var="$1"
	local dev="$2"
	local vif="$3"

	local ifname="$dev"
	config_get guest "$vif" guest
	if [ "$guest" = "on" ]; then
		ifname="${ifname}.0"
	fi

	hcfg_head "$var" "############## ${ifname} VAP parameters #############"
	if [ "$guest" = "on" ]; then
		hcfg_append "$var" "bss=${ifname}"
	fi 
	hostapd_conf_vap_mbo "$var"
	hostapd_conf_vap_11k "$var"
	hostapd_conf_vap_AP_para "$var" "$dev" "$vif"
	hostapd_conf_vap_ssid "$var" "$dev" "$vif"
	hostapd_conf_vap_wps "$var" "$dev" "$vif"
	hostapd_conf_vap_sec "$var" "$dev" "$vif"
}

hostapd_conf_atf() {
        local var="$1"
        local dev="$2"

        hcfg_head "$var" "###___ATF_GENERAL_PARAMETERS___###"
        hcfg_append "$var" "debug=1"

	config_get atf "$dev" airtime_fairness "off"
	if [ "$atf" = "on" ]; then
		# 0: Disable   1: Dynamic   2: Static
		# Note: Static cause fw crash, do NOT use it
		hcfg_append "$var" "distr_type=1"
	else
		hcfg_append "$var" "distr_type=0"
	fi

	hcfg_append "$var" "weighted_type=0"
	hcfg_append "$var" "algo_type=1"
	hcfg_append "$var" "interval=1000"
	hcfg_append "$var" "free_time=0"
	hcfg_append "$var" "vap_enabled=0"
	hcfg_append "$var" "station_enabled=0"
}

#hostapd_create_conf wlan0 
hostapd_create_conf() {
	local dev="$1"

	hostapd_conf=
	hostapd_conf_phy hostapd_conf "$dev"
	hostapd_conf_radio hostapd_conf "$dev"
	hostapd_conf_wmm hostapd_conf "$dev"
	hostapd_conf_11ax hostapd_conf "$dev"

	config_get vifs "$dev" vifs
	for vif in $vifs; do #vifs is wl01/02/03
		config_get_bool enable "$vif" enable
		config_get mode "$vif" mode

		if [ "$enable" = "1" -a "$mode" = "ap" ]; then
			hostapd_conf_vap hostapd_conf "$dev" "$vif"
		fi
	done
cat > /tmp/hostapd_${dev}.conf <<EOF
$hostapd_conf
EOF

	atf_conf=
	hostapd_conf_atf atf_conf "$dev"
cat > /tmp/hostapd_atf_${dev}.conf <<EOF
$atf_conf
EOF
}

pre_up_commands() {
	local dev="$1"
	local band
	config_get band "$dev" band

	# set Power Level
	config_get txpower $dev txpower "0"
        if [ -n "$txpower" ]; then
                if [ "$txpower" = "low" ]; then
                        txpower=6
                elif [ "$txpower" = "middle" ]; then
                        txpower=3
                else
                        txpower=0
                fi
        fi
	iw_cmd "$dev" "sPowerSelection $txpower"

	iw_cmd "$dev" "sCoCAutoCfg 10 50 50 50 1000 5000 5000 5000 5000 5000"
	iw_cmd "$dev" "sScanParams 100 20 3 5 10 2"
	iw_cmd "$dev" "sScanParamsBG 100 20 1 1 1 1000"
	iw_cmd "$dev" "sScanModifFlags 48"
	iw_cmd "$dev" "sScanCalCwMasks 0 0"
	iw_cmd "$dev" "sScanExpTime 90"

	if [ "$band" = "2g" ]; then
		iw_cmd "$dev" "sFWRecovery 5 3 3600 5"
		iw_cmd "$dev" "sQAMplus 1"
		iw_cmd "$dev" "sNumMsduInAmsdu 2 3 7"
	else
		iw_cmd "$dev" "sNumMsduInAmsdu 5 3 7"
	fi

	iw_cmd "$dev" "sMaxMpduLen 11000"
	iw_cmd "$dev" "sBfMode 0"
	iw_cmd "$dev" "sInterfDetThresh -68 -68 -68 -68 5 -68"

	# set MU-MIMO
	config_get mu_mimo $dev mu_mimo "off"
	if [ "$mu_mimo" = "on" ]; then
		mu_mimo=1
	else
		mu_mimo=0
	fi
	iw_cmd "$dev" "sMuOperation $mu_mimo"

	iw_cmd "$dev" "sDmrConfig 0"
	iw_cmd "$dev" "sSetRxTH -82"
	echo 262144 > /proc/sys/net/core/rmem_max
}

post_up_commands() {
	local dev="$1"
	local vif vifs

	### Wait hostapd state to be ready ###
	wait_hostapd "$dev"

	config_get vifs "$dev" vifs
	for vif in $vifs; do #vifs is wl01/02/03
		config_get_bool enable "$vif" enable
		config_get mode "$vif" mode

		if [ "$enable" = "1" -a "$mode" = "ap" ]; then
			vap_commands "$dev" "$vif"
		fi
	done

	radio_commands "$dev"
	echo 8 rdebug=0 > /proc/net/mtlk_log/debug
}

get_wifi_state() {
	local wifi_state=""
	if [ -f /tmp/wifi_state ]; then
		wifi_state=`cat /tmp/wifi_state`
	fi
	echo "$wifi_state"
}

iw_cmd() {
	tpdbg "iw_cmd: iw $1 iwlwav $2"
	`iw $1 iwlwav $2 2>/dev/null`
}

iwpriv_cmd() {
	tpdbg "iw_cmd: iw $1 iwlwav $2"
	`iwpriv $1 $2 2>/dev/null`
}

ppa_cmd() {
	local cmd="$1"
	local ifname="$2"

	if [ "$cmd" = "add" ]; then
		cmd="addlan"
	elif [ "$cmd" = "del" ]; then
		cmd="dellan"
	else
		tpdbg "unknown ppa cmd=${cmd}."
		return
	fi

	tpdbg "ppa_cmd: ppa $cmd -i $ifname"
	`ppacmd $cmd -i $ifname 2>/dev/null`
}

vap_commands() {
	local dev="$1"
	local vif="$2"
	local ifname="$dev"

	config_get guest "$vif" guest
	if [ "$guest" = "on" ]; then
		ifname="${ifname}.0"
	fi

	ppa_cmd "del" "$ifname"

	### From script/fapi_wlan_wave_ap_set ###
	# sAPforwarding & AP_ISO
	local isolate sAPforwarding ap_iso 
	config_get_bool isolate "$vif" isolate
	if [ "$isolate" = "1" ]; then
		sAPforwarding="0"
		ap_iso="ENABLE"
	else
		sAPforwarding="1"
		ap_iso="DISABLE"
	fi
	iw_cmd "$ifname" "sAPforwarding ${sAPforwarding}"
	hs_cli AP_ISO -O "$ap_iso" -I "$ifname"

	# enable multicast to unicast
	iwpriv_cmd "$ifname" "sReliableMcast 1"

	# If 4 addresses is enabled, need to set sBridgeMode to 1
	iw_cmd "$ifname" "sBridgeMode 0"
	iw_cmd "$ifname" "sFourAddrMode 0"

	# para: "${amsdu_mode} ${ba_mode} ${window_size}"
	iw_cmd "$ifname" "sAggrConfig 1 1 0"

	# 0:Disable 1:Enable 2:RTS/CTS 3:RTS2Self
	iw_cmd "$ifname" "s11nProtection 2"

	# close TPC as HW request
	iwpriv_cmd "$ifname" "sSlowProbingMask 0x3e"
	
	ppa_cmd "add" "$ifname"
}

radio_commands() {
	local dev="$1"
	local band
	config_get band "$dev" band

	# Default value for Wave6xx Chips
	local staid=511
	local num_antennas=2

	### From script/fapi_wlan_wave_radio_set ###
	#sCoCPower: "$auto_coc_enabled $num_antennas $num_antennas"/1
	iw_cmd "$dev" "sCoCPower 0 ${num_antennas} ${num_antennas}"

	#sEnableRadio:
	config_get_bool radio_disable $dev disabled
	iw_cmd "$dev" "sEnableRadio $((radio_disable^1))"

	#sTxopConfig: 
	#p0: staid [ 255:Wave5xx; 511:Wave6xx ]
	#p1: mode  [ 0:Disable  1:Force 2:Dynamic ]
	iw_cmd "$dev" "sTxopConfig ${staid} 1"

	#sRadarRssiTh
	if [ "$band" != "2g" ]; then
		iw_cmd "$dev" "sRadarRssiTh -70"
	fi

	#AcsUpdateTimeout
	iw_cmd "$dev" "sAcsUpdateTo 0"

	#RTS Signling BW
	#p0: Legacy=0 0; Dynamic=1 0; Static=0 1
	iw_cmd "$dev" "sRTSmode 0 0"

	#Fixed Rate values
	#p0: staid [ 255:Wave5xx; 511:Wave6xx ]
	#p1: auto_rate
	#p2: band_width
	#p3: phy_mode
	#p4: nss
	#p5: mcs
	#p6: cp_mode
	local ht_mode band_width
	config_get ht_mode "$dev" ht_mode
	case "$ht_mode" in
		20) band_width="0" ;;
		40) band_width="1" ;;
		80) band_width="2" ;;
		160) band_width="3" ;;
	esac

	local phy_mode
	#local ieee80211n ieee80211ac ieee80211ax
	#config_get ieee80211ax "$dev" ieee80211ax
	#config_get ieee80211ac "$dev" ieee80211ac
	#config_get ieee80211n "$dev" ieee80211n
	
	#if [ "$ieee80211ax" = "1" ]; then
	#	phy_mode="4"
	#elif [ "$ieee80211ac" = "1" ]; then
	#	phy_mode="3"
	#elif [ "$ieee80211n" = "1" ]; then
	#	phy_mode="2"
	#else
		if [ "$band" = "2g" ]; then
			phy_mode="1"
		else
			phy_mode="0"
		fi
	#fi

	iw_cmd "$dev" "sFixedRateCfg ${staid} 1 ${band_width} ${phy_mode} 1 7 1"

	#sInterfDetThresh
	iw_cmd "$dev" "sInterfDetThresh -68 -68 -68 -68 5 -68"

	#sCcaAdapt
	iw_cmd "$dev" "sCcaAdapt 10 5 -30 10 5 30 60"

	#sFastDrop
	iw_cmd "$dev" "sFastDrop 0"

	#sFixedLtfGi
	#p0: 0:Auto 1:Fixed
	#p1: 0:htvht_400ns  1:htvht_800ns  2:he_800ns_2xLTE 3:he_1600ns_2xLTE 4:he_800ns_4xLTE 5:he_3200ns_4xLTE
	local shortgi gi_value
	config_get shortgi "$dev" shortgi
	if [ "$shortgi" = "on" ]; then
		gi_value=0
	else
		gi_value=1
	fi
	iw_cmd "$dev" "sFixedLtfGi 1 ${gi_value}"

	### The following commands only works on Wave6xx Chip
	#sMuStatPlanCfg
	if [ "$band" = "2g" ]; then
		txop_com_start_bw_limit=0
	else
		txop_com_start_bw_limit=2
	fi
	iw_cmd "$dev" "sMuStatPlanCfg 0 32000 1 ${txop_com_start_bw_limit} 0 0 0 0 5400 26 2 2 2 2 2 3334 3 0 0"

	#sHeMuOperation
	iw_cmd "$dev" "sHeMuOperation 0"

	#s11hRadarDetect
	### disable radar detection event in the FW ( for beerocks with sub_dfs as W/A should be enable)
	local channel dfs_detect_enable="0"

	if [ "$band" = "5g" ]; then
		config_get channel "$dev" channel
		config_get ht_mode "$dev" ht_mode
		if [ "$channel" = "auto" ];then
			dfs_detect_enable="0"
		else
			dfs_detect_enable=`is_dfs_channel $channel $ht_mode`
		fi
	fi

	iw_cmd "$dev" "s11hRadarDetect ${dfs_detect_enable}"
}
