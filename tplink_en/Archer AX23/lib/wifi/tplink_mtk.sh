#!/bin/sh
#
# Copyright (c) 2019 TP-LINK Technologies Co., Ltd.
# All Rights Reserved.

export DEBUG=1

[ $DEBUG ] && STDOUT=/dev/console || STDOUT=/dev/null
STDERR=/dev/console

SMARTC_RUN_FILE="/var/run/.smart_run"

#
#include file
#
. /lib/wifi/mtk_wlan_var.sh
. /lib/wifi/mtk_wlan_extend.sh

BASIC_VAP="${VIF_HOME_2G} ${VIF_HOME_5G} ${VIF_HOME_5G2}"

##
## Called by /sbin/wifi
##
init_all_vif_name() {
#Decide whether it is a cloud upgrade process and sleep 6S to reduce the impact of the wireless configuration process on the efficiency of the interaction between the DUT and the client during the cloud upgrade phase
	if [ -e /tmp/cloud_up.bin ]; then
		sleep 6
	fi
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

# Wrapper for wireless tools.

brctl() {
	[ $DEBUG ] && echo brctl $@ > $STDOUT 2>&1
	/usr/sbin/brctl $@
}

ifconfig() {
	[ $DEBUG ] && echo ifconfig $@ > $STDOUT 2>&1
	/sbin/ifconfig $@
}

iwpriv() {
	[ $DEBUG ] && echo iwpriv $@ > $STDOUT 2>&1
	vif="$1"
	action="$2"
	shift 2
	/usr/sbin/iwpriv "$vif" "$action" "$@"
}

iwpriv_set() {
	local key value
	for key in $2; do
		config_get value "$1" "$key"
		[ -n "$value" ] && iwpriv $1 set $key=$value
	done
}

config_iwpriv_set() {
	[ -n "$3" ] && iwpriv "$1" set "$2"="$3"
}

config_profile_set() {
	local dev="$1"
	local TYPE band profile_path
	get_wlan_ini PROFILE_PATH_2G
	get_wlan_ini PROFILE_PATH_5G

	config_get TYPE "$1" TYPE
	[ "$TYPE" = "wifi-iface" ] && config_get dev "$1" device

	config_get band "$dev" band
	[ "$band" = "2g" ] && profile_path=${PROFILE_PATH_2G} || profile_path=${PROFILE_PATH_5G}

	[ -n "$3" ] && sed -i "s/^"$2"=.*$/"$2"=$3/g" ${profile_path}
	echo "config_profile_set, $2=$3>>${profile_path}" > $STDOUT
}

wifi_smart_by_bndstrg_start()
{
	for vap in ${BASIC_VAP}; do
		config_iwpriv_set $vap BndStrgEnable 1
	done

	sleep 1

	[ -f "$SMARTC_RUN_FILE" ] && return 
	bndstrg2 -i${VIF_HOME_2G} -i${VIF_HOME_5G} &
	touch $SMARTC_RUN_FILE
}

wifi_smart_by_bndstrg_stop()
{
	for vap in ${BASIC_VAP}; do
		config_iwpriv_set $vap BndStrgEnable 0
	done
}

wifi_smart_by_bndstrg()
{
	echo "=====config smart connect" >$STDOUT
	config_get smart_enable smart smart_enable

	if [ "${smart_enable}" = "off" ]; then
		wifi_smart_by_bndstrg_stop
		return
	fi
	wifi_smart_by_bndstrg_start
}

config_basic_setting() {
	local vif="$1"

	config_get ssid $vif ssid
	config_get_bool hidden $vif hidden
	# MTK need to set SSID at last to make other iwpriv command take effect
	# 7603 should set SSID first then then encryption
	config_iwpriv_set $vif SSID "$ssid"
	config_iwpriv_set $vif HideSSID $hidden
}

config_guest_basic_setting() {
	local vif="$1" ssid hidden

	config_get ssid $vif ssid
	config_get_bool hidden $vif hidden
	config_get_bool isolate $vif isolate 0

	config_iwpriv_set $vif SSID "$ssid"
	config_iwpriv_set $vif HideSSID $hidden
	config_iwpriv_set $vif NoForwarding $isolate
}

config_backhaul_basic_setting() {
	local vif="$1"

	get_wlan_ini CHIP_2G
	get_wlan_ini CHIP_5G

	#Channel
	local dev channel band
	config_get dev $vif device
	config_get band $dev band
	[ $band = "2g" ] && {
		channel=`iwconfig ${VIF_HOME_2G} | grep Channel | awk -F ' '  '{ print $2 }' | awk -F '=' '{ print $2 }'`
	}
	[ $band = "5g" ] && {
		channel=`iwconfig ${VIF_HOME_5G} | grep Channel | awk -F ' '  '{ print $2 }' | awk -F '=' '{ print $2 }'`
	}

	if [ "$band" = "2g" ]; then
		if [ "${CHIP_2G}" = "mt7915" ]; then
			config_iwpriv_set $vif ApChannel "$channel"
		else
			config_iwpriv_set $vif Channel "$channel"
		fi
	else
		if [ "${CHIP_5G}" = "mt7915" ]; then
			config_iwpriv_set $vif ApChannel "$channel"
		else
			config_iwpriv_set $vif Channel "$channel"
		fi
	fi
}

config_advanced_setting() {
	local vif="$1" dev
	config_get dev $vif device

	local band beacon_int rts frag dtim_period shortgi wmm isolate atf
	config_get band $dev band
	config_get beacon_int $dev beacon_int 100
	config_get rts $dev rts 2346
	config_get frag $dev frag 2346
	config_get dtim_period $dev dtim_period 1
	# config_get_bool shortgi $dev shortgi 1
	config_get_bool wmm $dev wmm 1
	config_get_bool isolate $dev isolate 0
	config_get atf $dev airtime_fairness off

	config_iwpriv_set $vif BeaconPeriod $beacon_int
	config_iwpriv_set $vif RTSThreshold $rts
	config_iwpriv_set $vif FragThreshold $frag
	config_iwpriv_set $vif DtimPeriod $dtim_period
	config_iwpriv_set $vif TxBurst $TxBurst
	# config_iwpriv_set $vif HtGi $shortgi
	config_iwpriv_set $vif WmmCapable $wmm
	config_iwpriv_set $vif NoForwarding $isolate
	config_iwpriv_set $vif NoForwardingBTNBSSID $isolate

	# Enable UAPSD for MT7615.
	config_iwpriv_set $vif UAPSDCapable 1

	# Set specific mcast do not transfered to unicast for MT7615.
	#config_iwpriv_set $vif IgmpSnoopDeny '"239.255.255.250;224.0.0.251;224.0.0.252;224.0.0.1;224.0.0.2;224.0.0.4;224.0.0.5;224.0.0.6;224.0.0.7;224.0.0.8;224.0.0.9;224.0.0.12;224.0.0.16;224.0.0.17;224.0.0.22;"'
	#config_iwpriv_set $vif IgmpSnoopNoGup 1

}

config_guest_advanced_setting() {
	local vif="$1" dev
	config_get dev $vif device

	local beacon_int rts frag dtim_period shortgi wmm isolate
	config_get beacon_int $dev beacon_int 100
	config_get rts $dev rts 2346
	config_get frag $dev frag 2346
	config_get dtim_period $dev dtim_period 1
	config_get_bool shortgi $dev shortgi on
	config_get_bool wmm $dev wmm on
	config_get_bool isolate $dev isolate off

	config_iwpriv_set $vif BeaconPeriod $beacon_int
	config_iwpriv_set $vif RTSThreshold $rts
	config_iwpriv_set $vif FragThreshold $frag
	config_iwpriv_set $vif DtimPeriod $dtim_period
	config_iwpriv_set $vif TxBurst $TxBurst
	config_iwpriv_set $vif HtGi $shortgi
	config_iwpriv_set $vif WmmCapable $wmm
	config_iwpriv_set $vif NoForwarding $isolate
	config_iwpriv_set $vif NoForwardingBTNBSSID $isolate
}

mt7915_mumimo_config() {
	echo mumimo_config $@ > $STDOUT

	local vif=$1
	local mu_mimo=$2

	local dev
	local band

	config_get dev $vif device
	config_get band $dev band
	config_get hwmode $dev hwmode

	if [ "$band" = "2g" ];then
		#VHT MU is always disabled for 2G band
		if [ "$hwmode" != "ax" -a "$hwmode" != "bgnax" ];then
			config_iwpriv_set $vif MuMimo 0
		else
			config_iwpriv_set $vif MuMimo "$mu_mimo"
		fi
	else
		config_iwpriv_set $vif MuMimo "$mu_mimo"
	fi
}

mt7915_twt_config() {
	echo twt_config $@ > $STDOUT

	local vif=$1
	local twt=$2
	local dev

	config_get dev $vif device
	config_get hwmode $dev hwmode

	if [ "$hwmode" = "bgnax" -o "$hwmode" = "anacax_5" ]; then
		if [ "$twt" = "on" ]; then
			config_iwpriv_set $vif twtsupport 0
			config_iwpriv_set $vif twtEnable 1
		else
			config_iwpriv_set $vif twtsupport 0
			config_iwpriv_set $vif twtEnable 0
		fi
	else
		config_iwpriv_set $vif twtsupport 0
		config_iwpriv_set $vif twtEnable 0
	fi
}

config_profile_setting_through_iwpriv(){
	local vif="$1" dev
	echo config_profile_setting_through_iwpriv $@ > $STDOUT
	get_wlan_ini CHAN_SEL_ALG
	get_wlan_ini CHIP_2G
	get_wlan_ini CHIP_5G
	
	config_get dev $vif device

	# config basic wifi device parameter
	local band hwmode bandwidth channel ssid hidden power_percent
	config_get band $dev band
	config_get hwmode $dev hwmode
	config_get bandwidth $dev htmode
	config_get channel $dev channel
	config_get ssid $vif ssid
	config_get_bool hidden $vif hidden

	# config wireless mode through iwpriv cmd
	local WirelessMode
	case $hwmode in
		b) WirelessMode=1;;
		g) WirelessMode=4;;
		n) WirelessMode=6;;
		bg) WirelessMode=0;;
		gn) WirelessMode=7;;
		bgn) WirelessMode=9;;
		a_5) WirelessMode=2;;
		n_5) WirelessMode=11;;
		ac_5) WirelessMode=22;;  # not ac only support, set to invalid mode
		an_5) WirelessMode=8;;
		nac_5) WirelessMode=15;;
		anac_5) WirelessMode=14;;
		ax)	WirelessMode=22;;	 # not ax only support, set to invalid mode
		bgnax) WirelessMode=16;;
		ax_5) WirelessMode=22;;  # not ax only support, set to invalid mode
		anacax_5) WirelessMode=17;;
		*) echo "WirelessMode " $hwmode " is invalid." > $STDERR;;
	esac
	#config_profile_set "$dev" WirelessMode "$WirelessMode"
	config_iwpriv_set $vif WirelessMode $WirelessMode

	# config Bandwidth through iwpriv cmd
	local HtBw VhtBw 
	local HtBssCoex=0
	[ $band = "2g" ] && {
		case $bandwidth in
			20) HtBw=0;;
			40) HtBw=1;;
			auto) 
				HtBw=1
				HtBssCoex=1
				;;
		esac
	}
	[ $band = "5g" ] && {
		case $bandwidth in
			20)
				HtBw=0
				VhtBw=0
				;;
			40)
				HtBw=1
				VhtBw=0
				;;
			80)
				HtBw=1
				VhtBw=1
				;;
			auto)
				if [ ${hwmode%ac_5} != $hwmode -o ${hwmode%ax} != $hwmode -o ${hwmode%ax_5} != $hwmode ]; then
					HtBw=1
					VhtBw=1
				else
					HtBw=1
					VhtBw=0
					HtBssCoex=1
				fi
				;;
		esac
	}
	#config_profile_set "$dev" HT_BW "$HtBw"
	config_iwpriv_set $vif HtBw $HtBw
	#config_profile_set "$dev" VHT_BW "$VhtBw"
	config_iwpriv_set $vif VhtBw $VhtBw
	#config_profile_set "$dev" HT_BSSCoexistence "$HtBssCoex"
	[ $band = "2g" ] && {
		config_iwpriv_set $vif HtBssCoex $HtBssCoex
	}
		
	# config channel through iwpriv cmd
	local HtExtcha
	local AutoChannelSel=0
	if [ "$channel" = "auto" ]; then
		AutoChannelSel=${CHAN_SEL_ALG}

		#config_profile_set "$dev" AutoChannelSelect "$AutoChannelSel"
		config_iwpriv_set $vif AutoChannelSel "$AutoChannelSel"
	else
		[ "$band" = "2g" ] && {
			if [ $channel -lt 6 ]; then
				HtExtcha=1
			else
				HtExtcha=0
			fi
		}
		[ "$band" = "5g" ] && {
			[ "$bandwidth" = "40" -o "$bandwidth" = "80" ] && {
				case $channel in
					36 | 44 | 52 | 60 | 149 | 157)
						HtExtcha=1
						;;
					*)
						HtExtcha=0
						;;
				esac
			}
		}

		#config_profile_set "$dev" Channel "$channel"
		if [ "$band" = "2g" ]; then
			if [ "${CHIP_2G}" = "mt7915" ]; then
				config_iwpriv_set $vif ApChannel "$channel"
			else
				config_iwpriv_set $vif Channel "$channel"
			fi
		else
			if [ "${CHIP_5G}" = "mt7915" ]; then
				config_iwpriv_set $vif ApChannel "$channel"
			else
				config_iwpriv_set $vif Channel "$channel"
			fi
		fi
		#config_profile_set "$dev" HT_EXTCHA "$HtExtcha"
		config_iwpriv_set $vif HtExtcha "$HtExtcha"
	fi

	#config mu-mimo & twt & ofdma
	#iwpriv ra0 show apcfginfo
	config_get_bool mu_mimo $dev mu_mimo 0
	if [ "$band" = "2g" ]; then
		if [ "${CHIP_2G}" = "mt7915" ]; then
			mt7915_mumimo_config $vif "$mu_mimo"
		fi
	else
		if [ "${CHIP_5G}" = "mt7915" ]; then
			mt7915_mumimo_config $vif "$mu_mimo"
		fi
	fi

	#iwpriv ra0 show apcfginfo
	local ofdma="off"
	ofdma=`uci get wireless.ofdma.enable`
	if [ "$band" = "2g" ]; then
		if [ "${CHIP_2G}" = "mt7915" ]; then
			config_iwpriv_set $vif MuOfdma 0
		fi
	else
		if [ "${CHIP_5G}" = "mt7915" ]; then
			config_iwpriv_set $vif MuOfdma 0
		fi
	fi

	#iwpriv ra0 show twtsupportinfo
	local twt="off"
	twt=`uci get wireless.twt.enable`
	if [ "$band" = "2g" ]; then
		if [ "${CHIP_2G}" = "mt7915" ]; then
			mt7915_twt_config $vif "$twt"
		fi
	else
		if [ "${CHIP_5G}" = "mt7915" ]; then
			mt7915_twt_config $vif "$twt"
		fi
	fi

	# config short-gi through iwpriv cmd
	#AX devices just don't shortgi now
	#config_get_bool shortgi $dev shortgi 1
	#config_profile_set "$dev" HT_GI "$shortgi"
	#config_profile_set "$dev" VHT_SGI "$shortgi"

	# config transmit power through iwpriv cmd.
	config_get txpower "$dev" txpower
	case $txpower in
		low) power_percent=30;;		#-6dB
		middle) power_percent=60;;	#-3dB
		high) power_percent=100;;	#-0dB
	esac
	#config_profile_set "$dev" TxPower "$power_percent"
	config_iwpriv_set $vif PowerDropCtrl "$power_percent"
}

config_encryption() {
	local vif="$1"
	local encryption
	
	get_wlan_ini NAME_BR
	get_wlan_ini CHIP_2G
	get_wlan_ini CHIP_5G
	
	config_get encryption $vif encryption none
	config_get dev $vif device
	config_get band $dev band

	# Kill 802.1x daemons
	if [ "$band" = "2g" ]; then
		echo "killall -q -SIGINT rt2860apd" >$STDERR
		killall -q -SIGINT rt2860apd
	else
		echo "killall -q -SIGINT rtinicapd" >$STDERR
		killall -q -SIGINT rtinicapd
	fi
	
	case $encryption in
		none)
			config_iwpriv_set $vif AuthMode OPEN
			config_iwpriv_set $vif EncrypType NONE
			config_iwpriv_set $vif IEEE8021X 0
			;;
		wep)
			local wep_mode wep_select wep_key1 wep_key2 wep_key3 wep_key4 AuthMode
			config_get wep_mode $vif wep_mode auto
			config_get wep_select $vif wep_select 1
			config_get wep_key1 $vif wep_key1
			config_get wep_key2 $vif wep_key2
			config_get wep_key3 $vif wep_key3
			config_get wep_key4 $vif wep_key4

			case $wep_mode in
				auto) AuthMode=WEPAUTO;;
				open) AuthMode=OPEN;;
				shared) AuthMode=SHARED;;
			esac

			config_iwpriv_set $vif AuthMode $AuthMode
			config_iwpriv_set $vif EncrypType WEP
			config_iwpriv_set $vif IEEE8021X 0
			config_iwpriv_set $vif Key1 $(prepare_key_wep "$wep_key1")
			config_iwpriv_set $vif Key2 $(prepare_key_wep "$wep_key2")
			config_iwpriv_set $vif Key3 $(prepare_key_wep "$wep_key3")
			config_iwpriv_set $vif Key4 $(prepare_key_wep "$wep_key4")
			config_iwpriv_set $vif DefaultKeyID $wep_select
			;;
		psk)
			local psk_version psk_cipher psk_key wpa_group_rekey AuthMode EncrypType
			config_get psk_version $vif psk_version
			config_get psk_cipher $vif psk_cipher
			config_get psk_key $vif psk_key
			config_get ssid $vif ssid
			config_get wpa_group_rekey $dev wpa_group_rekey

			case $psk_version in
				auto) AuthMode=WPAPSKWPA2PSK;;
				wpa) AuthMode=WPAPSK;;
				wpa2 | rsn) AuthMode=WPA2PSK;;
			esac

			case $psk_cipher in
				auto) EncrypType=TKIPAES;;
				tkip) EncrypType=TKIP;;
				aes | ccmp) EncrypType=AES;;
			esac

			config_iwpriv_set $vif AuthMode $AuthMode
			config_iwpriv_set $vif EncrypType $EncrypType
			config_iwpriv_set $vif IEEE8021X 0
			config_iwpriv_set $vif RekeyInterval $wpa_group_rekey
			config_iwpriv_set $vif WPAPSK "$psk_key"
			;;
		psk_sae)
			local psk_version psk_cipher psk_key wpa_group_rekey AuthMode EncrypType
			config_get psk_version $vif psk_version
			config_get psk_cipher $vif psk_cipher
			config_get psk_key $vif psk_key
			config_get ssid $vif ssid
			config_get wpa_group_rekey $dev wpa_group_rekey

			case $psk_version in
				sae_transition) AuthMode=WPA2PSKWPA3PSK;;
				sae_only) AuthMode=WPA3PSK;;
			esac

			case $psk_cipher in
				auto | aes | ccmp) EncrypType=AES;;
				tkip) EncrypType=AES;;
			esac

			config_iwpriv_set $vif AuthMode $AuthMode
			config_iwpriv_set $vif EncrypType $EncrypType
			config_iwpriv_set $vif IEEE8021X 0
			config_iwpriv_set $vif RekeyInterval $wpa_group_rekey
			config_iwpriv_set $vif WPAPSK "$psk_key"
			;;
		wpa)
			local server port wpa_version wpa_cipher wpa_key AuthMode EncrypType
			config_get server $vif server
			config_get port $vif port
			config_get wpa_version $vif wpa_version auto
			config_get wpa_cipher $vif wpa_cipher auto
			config_get wpa_key $vif wpa_key

			case $wpa_version in
				auto) AuthMode=WPA1WPA2;;
				wpa) AuthMode=WPA;;
				wpa2 | rsn) AuthMode=WPA2;;
			esac

			case $wpa_cipher in
				auto) EncrypType=TKIPAES;;
				tkip) EncrypType=TKIP;;
				aes | ccmp) EncrypType=AES;;
			esac

			config_iwpriv_set $vif AuthMode $AuthMode
			config_iwpriv_set $vif EncrypType $EncrypType
			config_iwpriv_set $vif IEEE8021X 0
			config_iwpriv_set $vif RADIUS_Server $server
			config_iwpriv_set $vif RADIUS_Port $port
			config_iwpriv_set $vif RADIUS_Key $wpa_key
			config_iwpriv_set $vif EAPifname ${NAME_BR}
			config_iwpriv_set $vif own_ip_addr "$(ifconfig ${NAME_BR} | grep "inet addr" | awk -F '[ :]+' '{print $4}')"
			
			# to make config take effect
			if [ "$band" = "2g" ]; then
				if [ "${CHIP_2G}" = "mt7915" ]; then
					config_iwpriv_set $vif ApSSID "$ssid"
				else
					config_iwpriv_set $vif SSID "$ssid"
				fi
			else
				if [ "${CHIP_5G}" = "mt7915" ]; then
					config_iwpriv_set $vif ApSSID "$ssid"
				else
					config_iwpriv_set $vif SSID "$ssid"
				fi
			fi

			# Start 802.1x daemons
			sleep 1
			if [ "$band" = "2g" ]; then
				echo "rt2860apd &" >$STDERR
				rt2860apd &
			else
				echo "rtinicapd &" >$STDERR
				rtinicapd &
			fi
			;;
		wpa3)
			local server port wpa_version wpa_cipher wpa_key AuthMode EncrypType
			config_get server $vif server
			config_get port $vif port
			config_get wpa_version $vif wpa_version auto
			config_get wpa_cipher $vif wpa_cipher auto
			config_get wpa_key $vif wpa_key

			AuthMode="WPA3-192"
			EncrypType=GCMP256

			# TODO: start daemons.
			# sleep 1
			# if [ "$band" = "2g" ]; then
			# 	rt2860apd &
			# else
			# 	rtinicapd &
			# fi
			config_iwpriv_set $vif AuthMode $AuthMode
			config_iwpriv_set $vif EncrypType $EncrypType
			config_iwpriv_set $vif IEEE8021X 0
			config_iwpriv_set $vif RADIUS_Server $server
			config_iwpriv_set $vif RADIUS_Port $port
			config_iwpriv_set $vif RADIUS_Key $wpa_key
			config_iwpriv_set $vif WPAPSK $wpa_key
			config_iwpriv_set $vif EAPifname ${NAME_BR}
			config_iwpriv_set $vif own_ip_addr "$(ifconfig ${NAME_BR} | grep "inet addr" | awk -F '[ :]+' '{print $4}')"

			# to make config take effect
			if [ "$band" = "2g" ]; then
				if [ "${CHIP_2G}" = "mt7915" ]; then
					config_iwpriv_set $vif ApSSID "$ssid"
				else
					config_iwpriv_set $vif SSID "$ssid"
				fi
			else
				if [ "${CHIP_5G}" = "mt7915" ]; then
					config_iwpriv_set $vif ApSSID "$ssid"
				else
					config_iwpriv_set $vif SSID "$ssid"
				fi
			fi

			# Start 802.1x daemons
			sleep 1
			if [ "$band" = "2g" ]; then
				echo "rt2860apd &" >$STDERR
				rt2860apd &
			else
				echo "rtinicapd &" >$STDERR
				rtinicapd &
			fi
	esac
}

config_wds_setting() {
	local vif="$1"

	local ssid bssid
	config_get ssid $vif ssid
	config_get bssid $vif bssid

	config_iwpriv_set $vif ApCliEnable 0
	config_iwpriv_set $vif ApCliBssid $bssid

	local encryption
	config_get encryption $vif encryption none
	case $encryption in
		none)
			config_iwpriv_set $vif ApCliAuthMode OPEN
			config_iwpriv_set $vif ApCliEncrypType NONE
			;;
		wep)
			local wep_mode wep_select wep_key1 wep_key2 wep_key3 wep_key4 ApCliAuthMode
			config_get wep_mode $vif wep_mode auto
			config_get wep_select $vif wep_select 1
			config_get wep_key1 $vif wep_key1
			config_get wep_key2 $vif wep_key2
			config_get wep_key3 $vif wep_key3
			config_get wep_key4 $vif wep_key4

			case $wep_mode in
				auto) ApCliAuthMode=WEPAUTO;;
				open) ApCliAuthMode=OPEN;;
				shared) ApCliAuthMode=SHARED;;
			esac

			config_iwpriv_set $vif ApCliAuthMode $ApCliAuthMode
			config_iwpriv_set $vif ApCliEncrypType WEP
			config_iwpriv_set $vif ApCliKey1 $(prepare_key_wep "$wep_key1")
			config_iwpriv_set $vif ApCliKey2 $(prepare_key_wep "$wep_key2")
			config_iwpriv_set $vif ApCliKey3 $(prepare_key_wep "$wep_key3")
			config_iwpriv_set $vif ApCliKey4 $(prepare_key_wep "$wep_key4")
			config_iwpriv_set $vif ApCliDefaultKeyID $wep_select
			;;
		psk)
			local psk_version psk_cipher psk_key wpa_group_rekey ApCliAuthMode ApCliEncrypType
			config_get psk_version $vif psk_version
			config_get psk_cipher $vif psk_cipher
			config_get psk_key $vif psk_key
			config_get ssid $vif ssid
			config_get wpa_group_rekey $dev wpa_group_rekey

			# On the IPF platform, psk_version and psk_cipher for wds interface in uci is always "auto".
			# So, always set AuthMode to "WPAPSKWPA2PSK" and EncryType to "TKIPAES" to connect to RootAP no matter which encryption it is
			case $psk_version in
				wpa) ApCliAuthMode=WPAPSK;;
				auto | wpa2 | rsn) ApCliAuthMode=WPAPSKWPA2PSK;;
			esac

			case $psk_cipher in
				tkip) ApCliEncrypType=TKIP;;
				auto | aes | ccmp) ApCliEncrypType=TKIPAES;;
			esac

			config_iwpriv_set $vif ApCliAuthMode $ApCliAuthMode
			config_iwpriv_set $vif ApCliEncrypType $ApCliEncrypType
			config_iwpriv_set $vif ApCliWPAPSK $psk_key
			;;
	esac

	config_iwpriv_set $vif ApCliSsid "$ssid"
	config_iwpriv_set $vif ApCliEnable 1
}

config_wps_setting() {
	local vif="$1"

	config_get_bool wps $vif wps 0
	config_get pin $vif wps_pin
	config_get encryption $vif encryption none
	config_get wps_label $vif wps_label 

	if [ "$wps" = "0" -o "$encryption" = "psk_sae" -o "$encryption" = "wpa3" -o "$encryption" = "wpa" ]; then
		config_iwpriv_set $vif WscConfMode 0
	else
		config_iwpriv_set $vif WscConfMode 7
	fi
	config_iwpriv_set $vif WscConfStatus 2
	
	config_iwpriv_set $vif WscVendorPinCode $pin
	if [ "$wps_label" = "off" ]; then
		config_iwpriv_set $vif WscLabelDisabled 1
		config_iwpriv_set $vif WscSetupLock 1
	else
		config_iwpriv_set $vif WscLabelDisabled 0
		config_iwpriv_set $vif WscSetupLock 0
	fi
}

wifi_default() {
	echo wifi_default $@ > $STDOUT
}

wifi_country() {
	echo wifi_country $@ > $STDOUT
	wifi_reload $@
}

wifi_mode() {
	echo wifi_mode $@ > $STDOUT
	wifi_radio $@
}

wifi_led_set() {
	local led_state=""
	local led_flag="0"
	local state_2g="ON"
	local state_5g="ON"
	
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
		if $(wireless_schedule_disable_wifi "$band") ; then
			led_state="OFF"
		fi
	
		if [ "$band" == "2g" ] ; then
			state_2g=$led_state
		elif [ "$band" == "5g" ] ; then
			state_5g=$led_state
		fi

		#ledcli ${band}_${led_state}
	done
	[ -f "/tmp/dut_bootdone" ] && [ "$(/sbin/is_cal)" = "true" ] && {
		echo "wifi_led_set 2g = $state_2g, 5g = $state_5g" > /dev/console	
		if [ "$state_2g" == "ON" -a "$state_5g" == "ON" ] ; then
			ledcli WIFI2G_ON
			ledcli WIFI5G_ON
		elif [ "$state_2g" == "ON" -a "$state_5g" == "OFF" ] ; then
			ledcli WIFI2G_ON
			ledcli WIFI5G_OFF
		elif [ "$state_2g" == "OFF" -a "$state_5g" == "ON" ] ; then
			ledcli WIFI2G_OFF
			ledcli WIFI5G_ON
		else
			ledcli WIFI2G_OFF
			ledcli WIFI5G_OFF
		fi
	} || echo "========= don't cli WIFI-led when booting or not cal" > /dev/console
}


wifi_vap() {
	echo wifi_vap $@ > $STDOUT

	get_wlan_ini FEATURE_DBDC
	get_wlan_ini FEATURE_ONEMESH
	get_wlan_ini FIRST_ON_DEV
	get_wlan_ini FIRST_ON_VIF
	get_wlan_ini NAME_BR
	get_wlan_ini CHIP_2G
	get_wlan_ini CHIP_5G

	if [ "${FEATURE_ONEMESH}" = "y" ]; then
		TP_OUI="001d0f"
		tpie_hw_mac=`getfirm MAC` #LAN MAC as TPIE_MAC
		tpie_mac=${tpie_hw_mac//-/}
		product_type="0001"	# 0001 means WirelessRouter
		reserve="0000"	#reserve param
		random_suffix="5789"
		config_get gp_id_rand onemesh group_id
		gp_id_rand=${gp_id_rand:0:4}
		gp_id_rand="${gp_id_rand:0:2}${gp_id_rand:2:2}"
		[ -n "$gp_id_rand" ] && random_suffix=$gp_id_rand
		echo "gp_id_rand = ${gp_id_rand}" > $STDOUT
		echo "random_suffix = ${random_suffix}" > $STDOUT
	fi

	local action=
	[ "$1" = "up" -o "$1" = "down" ] && {
		action="$1"
		shift 1
	}
	local vifs="$@"

	for vif in $vifs; do

		config_get dev "$vif" device
		config_get_bool disabled "$dev" disabled 0
		config_get_bool disabled_all "$dev" disabled_all 0
		config_get first_on_then_reload "$FIRST_ON_DEV" first_on_then_reload 0

		backhaul="off"
		onemesh_enable="off"
		if [ "${FEATURE_ONEMESH}" = "y" ]; then
			config_get backhaul $vif backhaul ""
			config_get onemesh_enable onemesh enable

			if [ "$onemesh_enable" != "on" -a "$backhaul" = "on" ]; then
				continue
			fi
		fi

		if [ "${FEATURE_DBDC}" = "y" ]; then
			# DBDC 情况下，对于非backhaul的vif，需要做判断：
			# 当所属dev配置是off时：如果此dev是2g且“先启动再关闭”标志有设置，那么就继续启动；否则就不再启动
			if [ "$backhaul" != "on" ]; then
				if [ "$disabled" = "1" -o "$disabled_all" = "1" ]; then
					if [ "$dev" != "$FIRST_ON_DEV" -o "$first_on_then_reload" != "1" ]; then
						continue
					else
						echo wifi_vap ", continue to start $vif." > $STDOUT
					fi
				fi
			fi
		fi

		config_get_bool enable $vif enable off
		[ "$enable" = "0" ] && action="down" || action="up"

		if [ "${FEATURE_DBDC}" = "y" ]; then
			#DBDC 情况下，在 ra0 配置为off 且“先启动再关闭”标志有设置时也对 ra0 进行启动
			if [ "$enable" = "0" -a "$vif" = "$FIRST_ON_VIF" -a "$first_on_then_reload" = "1" ]; then
				echo wifi_vap ", $vif action up." > $STDOUT
				action="up"
			fi
		fi

		[ "$action" = "down" ] && {
			brctl delif ${NAME_BR} $vif
			ifconfig $vif down
			continue
		}

		ifconfig $vif up

		local mode guest ssid hidden
		config_get mode $vif mode ap
		config_get_bool guest $vif guest off
		config_get ssid $vif ssid
		config_get_bool hidden $vif hidden

		local onemesh_ie="off"
		if [ "${FEATURE_ONEMESH}" = "y" ]; then
			local sysmode smart_enable
			config_get onemesh_ie $vif onemesh_ie
			config_get sysmode sysmode mode "router"
			config_get smart_enable smart smart_enable

			if [ "$onemesh_ie" = "on" ]; then                        # main_bss and backhaul
				if [ "$backhaul" = "on" ]; then                      # backhaul set tp_ie
					[ "$onemesh_enable" = "on" ] && {
						echo "=====>>>>>set tp_ie for vap $vif" > $STDOUT
						iwpriv $vif set tp_ie="dd1e${TP_OUI}1001070000${tpie_mac}${tpie_mac}${random_suffix}0000${tpie_mac:8:4}${product_type}${reserve}"
					}
				else                                                 # else is main_bss
					if [ "$onemesh_enable" = "on" ]; then
						echo "=====>>>>>set tp_ie for vap $vif" > $STDOUT
						iwpriv $vif set tp_ie="dd1e${TP_OUI}1001030000${tpie_mac}${tpie_mac}${random_suffix}0000${tpie_mac:8:4}${product_type}${reserve}"
					elif [ "$onemesh_enable" != "on" ]; then
						echo "=====>>>>>del tp_ie for vap $vif" > $STDOUT
						iwpriv $vif set tp_ie=""
					fi

					if [ "$sysmode" = "router" -a "$onemesh_enable" = "on" ] || [ "$smart_enable" = "on" ]; then
						iwpriv $vif set RrmEnable=1
						iwpriv $vif set WnmEnable=1
					else
						iwpriv $vif set RrmEnable=0
						iwpriv $vif set WnmEnable=0
					fi
				fi
			fi
		fi

		[ "$mode" = "ap" -a "$guest" = "0" ] && {
			config_basic_setting $vif
			config_advanced_setting $vif

			#In dbdc mode, vap restart does't reload profile, so these configs
			#should be set through iwpriv cmd, instead of profile file.
			if [ "${FEATURE_DBDC}" = "y" -a "$backhaul" != "on" ]; then
				config_profile_setting_through_iwpriv $vif
			fi

			config_encryption $vif
			config_wps_setting $vif

			config_iwpriv_set $vif HideSSID $hidden

			# to make config take effect
			config_get band $dev band
			if [ "$band" = "2g" ]; then
				if [ "${CHIP_2G}" = "mt7915" ]; then
					config_iwpriv_set $vif ApSSID "$ssid"
				else
					config_iwpriv_set $vif SSID "$ssid"
				fi
			else
				if [ "${CHIP_5G}" = "mt7915" ]; then
					config_iwpriv_set $vif ApSSID "$ssid"
				else
					config_iwpriv_set $vif SSID "$ssid"
				fi
			fi

			config_iwpriv_set $vif hw_nat_register 1
		}
		[ "$mode" = "ap" -a "$guest" = "1" ] && {
			config_guest_basic_setting $vif
			# config_guest_advanced_setting $vif
			config_encryption $vif

			config_iwpriv_set $vif HideSSID $hidden

			# to make config take effect
			config_get band $dev band
			if [ "$band" = "2g" ]; then
				if [ "${CHIP_2G}" = "mt7915" ]; then
					config_iwpriv_set $vif ApSSID "$ssid"
				else
					config_iwpriv_set $vif SSID "$ssid"
				fi
			else
				if [ "${CHIP_5G}" = "mt7915" ]; then
					config_iwpriv_set $vif ApSSID "$ssid"
				else
					config_iwpriv_set $vif SSID "$ssid"
				fi
			fi

			config_iwpriv_set $vif hw_nat_register 1
		}
		[ "$mode" = "sta" ] && {
			config_wds_setting $vif
		}

		if [ "${FEATURE_ONEMESH}" = "y" ]; then
			if [ "${FEATURE_DBDC}" = "n" -a "$backhaul" = "on" ]; then
				config_backhaul_basic_setting $vif
			fi

			[ "$onemesh_ie" = "on" -a "$backhaul" != "on" ] && {
				/etc/init.d/nrd restart&
			}
		fi

		if [ "$band" = "2g" ]; then
			if [ "${CHIP_2G}" = "mt7915" ]; then
				# Auto mode, threshold -40dBm
				iwpriv $vif mac 83082038=00000000
				iwpriv $vif mac 83088558=d8d8d8d8
				iwpriv $vif mac 83088554=d8d8d8d8

				special_mac_set $vif
			fi
		else
			if [ "${CHIP_5G}" = "mt7915" ]; then
				# Auto mode, threshold -40dBm
				iwpriv $vif mac 83092038=00000000
				iwpriv $vif mac 83098558=d8d8d8d8
				iwpriv $vif mac 83098554=d8d8d8d8

				special_mac_set $vif
			fi
		fi

		# To avoid br-lan is created too slowly in /etc/rc.d/S25Netowrk, add interface to bridge here.
		brctl addif ${NAME_BR} $vif
	done
	config_vap_vlan up &>$STDOUT
}

wifi_shutdown_interface(){
	echo wifi_shutdown_interface $@ > $STDOUT
	local dev="$@"
	config_get vifs "$dev" vifs
	for vif in $vifs; do 
		#do I need to delete from bridge
		[ -d /sys/class/net/$vif ] && ifconfig "$vif" down
	done
}

wifi_config_profile(){
	echo wifi_config_profile $@ > $STDOUT
	get_wlan_ini FEATURE_DBDC

	if [ "${FEATURE_DBDC}" = "y" ]; then
		#In dbdc mode, vap restart does't reload profile, so these configs
		#should be set through iwpriv cmd, instead of profile file.
		echo "wifi_config_profile dbdc mode and return" > $STDOUT
		return
	fi

	#need to write into profile to make those configuration take effect
	local dev="$@"

	# config basic wifi device parameter
	local band hwmode bandwidth channel ssid hidden power_percent
	config_get band $dev band
	config_get hwmode $dev hwmode
	config_get bandwidth $dev htmode
	config_get channel $dev channel
	config_get ssid $vif ssid
	config_get_bool hidden $vif hidden

	# config wireless mode in profile
	local WirelessMode
	case $hwmode in
		b) WirelessMode=1;;
		g) WirelessMode=4;;
		n) WirelessMode=6;;
		bg) WirelessMode=0;;
		gn) WirelessMode=7;;
		bgn) WirelessMode=9;;
		a_5) WirelessMode=2;;
		n_5) WirelessMode=11;;
		ac_5) WirelessMode=16;;
		an_5) WirelessMode=8;;
		nac_5) WirelessMode=15;;
		anac_5) WirelessMode=14;;
		*) echo "WirelessMode " $hwmode " is invalid." > $STDERR;;
	esac
	config_profile_set "$dev" WirelessMode "$WirelessMode"

	# config Bandwidth in profile
	local HtBw VhtBw 
	local HtBssCoex=0
	[ $band = "2g" ] && {
		case $bandwidth in
			20) HtBw=0;;
			40) HtBw=1;;
			auto) 
				HtBw=1
				HtBssCoex=1
				;;
		esac
	}
	[ $band = "5g" ] && {
		case $bandwidth in
			20)
				HtBw=0
				VhtBw=0
				;;
			40)
				HtBw=1
				VhtBw=0
				;;
			80)
				HtBw=1
				VhtBw=1
				;;
			auto)
				if [ ${hwmode%ac_5} != $hwmode ]; then
					HtBw=1
					VhtBw=1
				else
					HtBw=1
					VhtBw=0
					HtBssCoex=1
				fi
				;;
		esac
	}
	config_profile_set "$dev" HT_BW "$HtBw"
	config_profile_set "$dev" VHT_BW "$VhtBw"
	config_profile_set "$dev" HT_BSSCoexistence "$HtBssCoex"
	
	# config channel in wireless profile
	local HtExtcha
	local AutoChannelSel=0
	if [ "$channel" = "auto" ]; then
		config_profile_set "$dev" Channel 0
		[ "$band" = "2g" ] && AutoChannelSel=2 || AutoChannelSel=3
	else
		[ "$band" = "2g" ] && {
			if [ $channel -lt 6 ]; then
				HtExtcha=1
			else
				HtExtcha=0
			fi
		}
		[ "$band" = "5g" ] && {
			[ "$bandwidth" = "40" -o "$bandwidth" = "80" ] && {
				case $channel in
					36 | 44 | 52 | 60 | 149 | 157)
						HtExtcha=1
						;;
					*)
						HtExtcha=0
						;;
				esac
			}
		}

		config_profile_set "$dev" Channel "$channel"
		config_profile_set "$dev" HT_EXTCHA "$HtExtcha"
	fi

	config_profile_set "$dev" AutoChannelSelect "$AutoChannelSel"
	
	# config mu-mimo in wireless profile.
	config_get_bool mu_mimo $dev mu_mimo 0
	config_profile_set "$dev" MUTxRxEnable "$mu_mimo"
	
	# config short-gi in wireless profile
	config_get_bool shortgi $dev shortgi 1
	config_profile_set "$dev" HT_GI "$shortgi"
	config_profile_set "$dev" VHT_SGI "$shortgi"

	# config transmit power in wireless profile.
	config_get txpower "$dev" txpower
	case $txpower in
		low) power_percent=30;;		#-6dB
		middle) power_percent=60;;	#-3dB
		high) power_percent=100;;	#-0dB
	esac
	config_profile_set "$dev" TxPower "$power_percent"
}

wifi_start_interface(){
	echo wifi_start_interface $@ > $STDOUT
	local devs="$@" 
	local sysmode
	config_load sysmode
	config_get sysmode sysmode mode "router"
	for dev in $devs; do
		config_get vifs "$dev" vifs
		# for ra0, ra1, apcli0/ rax0, rax1, apclix0
		for vif in $vifs; do
			if [ "$sysmode" = "ap" ]; then 
				if [ "$vif" = "${VIF_WDS_2G}" -o "$vif" = "${VIF_WDS_5G}" ]; then
					continue
				fi
			fi
			wifi_vap $vif
		done
	done
}

wifi_radio() {
	echo wifi_radio $@ > $STDOUT

	#need to down up interface to make some configure take effect --tqj
	local devs="$@"
	
	if [ "${devs}" = "ofdma" -o "${devs}" = "twt" ]; then
		devs="${DEVICES}"
	fi
	
	for dev in $devs; do
		wifi_shutdown_interface $dev
		wifi_config_profile $dev
		wifi_start_interface $dev
	done
}


wifi_init() {
	echo "wifi_init $@" > $STDOUT
	# update wifi profiles
	local firm model version
	get_wlan_ini FEATURE_DFS
	get_wlan_ini FEATURE_ZDFS
	get_wlan_ini CHIP_2G
	get_wlan_ini CHIP_5G

	firm=`getfirm FIRM`
	model=`getfirm MODEL`
	version=`getfirm HARDVERSION`

	for dev in ${1:-$DEVICES}; do
		local macaddr
		config_get macaddr $dev macaddr
		config_profile_set $dev MacAddress ${macaddr//-/:}

		config_profile_set $dev WscManufacturer "$firm"
		config_profile_set $dev WscDeviceName "$model $version"
		config_profile_set $dev WscModelName "$model"
		config_profile_set $dev WscModelNumber "$version"
		config_profile_set $dev WscSerialNumber "$version"
	done

	# SingleSKU table.
	country=$(getfirm COUNTRY)
	regulatory="FCC"

	case $country in
		US) regulatory="FCC";;
		RU|EU|DE|KR) regulatory="CE";;
		JP) regulatory="JP"
	esac

	[ -f /etc/wireless/RT2860AP/SingleSKU_5G_${regulatory}.dat ] && {
		mv /etc/wireless/RT2860AP/SingleSKU_${regulatory}.dat /etc/wireless/RT2860AP/SingleSKU.dat
		mv /etc/wireless/RT2860AP/SingleSKU_5G_${regulatory}.dat /etc/wireless/RT2860AP/SingleSKU_5G.dat
	}
	[ -f /etc/wireless/RT2860AP/SingleSKU_BF_5G_${regulatory}.dat ] && {
		mv /etc/wireless/RT2860AP/SingleSKU_BF_5G_${regulatory}.dat /etc/wireless/RT2860AP/SingleSKU_BF_5G.dat
	}

	if [ "$country" = "DE" ];then
		#DE 2G channel 1-13
		config_profile_set wifi0 CountryRegion "1"
		config_profile_set wifi0 CountryNum "276"
		config_profile_set wifi0 CountryCode "DE"
		config_profile_set wifi0 AutoChannelSkipList "1;11;12;13"
		if [ "$CHIP_2G" = "mt7915" ];then
			#DE 2G use sku_02.dat
			get_wlan_ini SKU_IDX
			config_profile_set wifi0 SkuTableIdx "${SKU_IDX}"
		fi

		#DE 5G
		config_profile_set wifi1 CountryNum "276"
		config_profile_set wifi1 CountryCode "DE"

		if [ "$FEATURE_DFS" = "y" ];then
			#channel 36-48,52-64(DFS),100-140(DFS)
			config_profile_set wifi1 CountryRegionABand "1"
			config_profile_set wifi1 AutoChannelSkipList "52;56;60;64;100;104;108;112;116;120;124;128;132;136;140;"
		else
			#channel 36-48
			config_profile_set wifi1 CountryRegionABand "6"
			config_profile_set wifi1 AutoChannelSkipList ""
		fi

		if [ "$CHIP_5G" = "mt7915" ];then
			#DE 5G use sku_02.dat
			get_wlan_ini SKU_IDX
			config_profile_set wifi1 SkuTableIdx "${SKU_IDX}"
		fi

		config_profile_set wifi1 RDRegion "CE"
	elif [ "$country" = "JP" ];then
		#JP 2G channel 1-13
		config_profile_set wifi0 CountryRegion "1"
		config_profile_set wifi0 CountryNum "392"
		config_profile_set wifi0 CountryCode "JP"
		config_profile_set wifi0 AutoChannelSkipList "1;11;12;13"
		if [ "$CHIP_2G" = "mt7915" ];then
			#JP 2G use sku_02.dat
			get_wlan_ini SKU_IDX
			config_profile_set wifi0 SkuTableIdx "${SKU_IDX}"
		fi

		#JP 5G
		config_profile_set wifi1 CountryNum "392"
		config_profile_set wifi1 CountryCode "JP"

		if [ "$FEATURE_DFS" = "y" ];then
			#channel 36-48,52-64(DFS),100-144(DFS)
			config_profile_set wifi1 CountryRegionABand "12"
			config_profile_set wifi1 AutoChannelSkipList "52;56;60;64;100;104;108;112;116;120;124;128;132;136;140;144"
		else
			#channel 36-48
			config_profile_set wifi1 CountryRegionABand "6"
			config_profile_set wifi1 AutoChannelSkipList ""
		fi

		if [ "$CHIP_5G" = "mt7915" ];then
			#JP 5G use sku_02.dat
			get_wlan_ini SKU_IDX
			config_profile_set wifi1 SkuTableIdx "${SKU_IDX}"
		fi

		config_profile_set wifi1 RDRegion "JAP"
	elif [ "$country" = "US" ];then
		#US 2G channel 1-11
		config_profile_set wifi0 CountryRegion "0"
		config_profile_set wifi0 CountryNum "840"
		config_profile_set wifi0 CountryCode "US"
		config_profile_set wifi0 AutoChannelSkipList "1;11"
		if [ "$CHIP_2G" = "mt7915" ];then
			#US 2G use sku_03.dat
			get_wlan_ini SKU_IDX
			config_profile_set wifi0 SkuTableIdx "${SKU_IDX}"
		fi
		#US 5G
		config_profile_set wifi1 CountryNum "840"
		config_profile_set wifi1 CountryCode "US"

		if [ "$FEATURE_DFS" = "y" ];then
			#channel 36-48,52-64(DFS),100-144(DFS),149-165
			config_profile_set wifi1 CountryRegionABand "13"
			config_profile_set wifi1 AutoChannelSkipList "36;40;44;48;52;56;60;64;100;104;108;112;116;120;124;128;132;136;140;144;165"
		else
			#channel 36-48,149-165
			config_profile_set wifi1 CountryRegionABand "10"
			config_profile_set wifi1 AutoChannelSkipList "36;40;44;48;165"
		fi

		if [ "$CHIP_5G" = "mt7915" ];then
			#US 5G use sku_03.dat
			get_wlan_ini SKU_IDX
			config_profile_set wifi1 SkuTableIdx "${SKU_IDX}"
		fi
		config_profile_set wifi1 RDRegion "FCC"
	elif [ "$country" = "CA" ];then
		#CA 2G channel 1-11
		config_profile_set wifi0 CountryRegion "0"
		config_profile_set wifi0 CountryNum "124"
		config_profile_set wifi0 CountryCode "CA"
		config_profile_set wifi0 AutoChannelSkipList "1;2;10;11"
		if [ "$CHIP_2G" = "mt7915" ];then
			#CA 2G use sku_04.dat
			get_wlan_ini SKU_IDX
			config_profile_set wifi0 SkuTableIdx "${SKU_IDX}"
		fi

		#CA 5G
		config_profile_set wifi1 CountryNum "124"
		config_profile_set wifi1 CountryCode "CA"

		if [ "$FEATURE_DFS" = "y" ];then
			#channel 36-48,52-64(DFS),100-116(DFS),132-144(DFS),149-165
			config_profile_set wifi1 CountryRegionABand "14"
			config_profile_set wifi1 AutoChannelSkipList "36;40;44;48;52;56;60;64;100;104;108;112;116;132;136;140;144;165"
		else
			#channel 36-48,149-165
			config_profile_set wifi1 CountryRegionABand "10"
			config_profile_set wifi1 AutoChannelSkipList "36;40;44;48;165"
		fi

		if [ "$CHIP_5G" = "mt7915" ];then
			#CA 5G use sku_04.dat
			get_wlan_ini SKU_IDX
			config_profile_set wifi1 SkuTableIdx "${SKU_IDX}"
		fi

		config_profile_set wifi1 RDRegion "FCC"
	elif [ "$country" = "RU" ];then
		#RU 2G channel 1-13
		config_profile_set wifi0 CountryRegion "1"
		config_profile_set wifi0 CountryNum "643"
		config_profile_set wifi0 CountryCode "RU"
		config_profile_set wifi0 AutoChannelSkipList "1;11;12;13"
		if [ "$CHIP_2G" = "mt7915" ];then
			#RU 2G use sku_05.dat
			get_wlan_ini SKU_IDX
			config_profile_set wifi0 SkuTableIdx "${SKU_IDX}"
		fi

		#RU 5G channel 36-48,52-64,149-165, no DFS in RU
		config_profile_set wifi1 CountryRegionABand "0"
		config_profile_set wifi1 CountryNum "643"
		config_profile_set wifi1 CountryCode "RU"
		config_profile_set wifi1 AutoChannelSkipList "52;56;60;64;149;153;157;161;165"
		if [ "$CHIP_5G" = "mt7915" ];then
			#RU 5G use sku_05.dat
			get_wlan_ini SKU_IDX
			config_profile_set wifi1 SkuTableIdx "${SKU_IDX}"
		fi

		config_profile_set wifi1 RDRegion "CE"
	elif [ "$country" = "TW" ];then
		#TW 2G channel 1-11
		config_profile_set wifi0 CountryRegion "0"
		config_profile_set wifi0 CountryNum "158"
		config_profile_set wifi0 CountryCode "TW"
		config_profile_set wifi0 AutoChannelSkipList "1;2;10;11"
		if [ "$CHIP_2G" = "mt7915" ];then
			#TW 2G use sku_06.dat
			get_wlan_ini SKU_IDX
			config_profile_set wifi0 SkuTableIdx "${SKU_IDX}"
		fi
		#TW 5G
		config_profile_set wifi1 CountryNum "158"
		config_profile_set wifi1 CountryCode "TW"

		if [ "$FEATURE_DFS" = "y" ];then
			#channel 36-48,52-64(DFS),100-144(DFS),149-165
			config_profile_set wifi1 CountryRegionABand "13"
			config_profile_set wifi1 AutoChannelSkipList "36;40;44;48;52;56;60;64;100;104;108;112;116;120;124;128;132;136;140;144;165"
		else
			#channel 36-48,149-165
			config_profile_set wifi1 CountryRegionABand "10"
			config_profile_set wifi1 AutoChannelSkipList "36;40;44;48;165"
		fi

		if [ "$CHIP_5G" = "mt7915" ];then
			#TW 5G use sku_06.dat
			get_wlan_ini SKU_IDX
			config_profile_set wifi1 SkuTableIdx "${SKU_IDX}"
		fi
		config_profile_set wifi1 RDRegion "FCC"
	elif [ "$country" = "KR" ];then
		#KR 2G channel 1-13
		config_profile_set wifi0 CountryRegion "1"
		config_profile_set wifi0 CountryNum "410"
		config_profile_set wifi0 CountryCode "KR"
		config_profile_set wifi0 AutoChannelSkipList "1;11;12;13"
		if [ "$CHIP_2G" = "mt7915" ];then
			#KR 2G use sku_07.dat
			get_wlan_ini SKU_IDX
			config_profile_set wifi0 SkuTableIdx "${SKU_IDX}"
		fi

		#KR 5G channel 36-48,149-165
		config_profile_set wifi1 CountryRegionABand "10"
		config_profile_set wifi1 CountryNum "410"
		config_profile_set wifi1 CountryCode "KR"
		config_profile_set wifi1 AutoChannelSkipList "36;40;44;48;165"

		if [ "$CHIP_5G" = "mt7915" ];then
			#TW 5G use sku_07.dat
			get_wlan_ini SKU_IDX
			config_profile_set wifi1 SkuTableIdx "${SKU_IDX}"
		fi
	fi

	#5G DFS&ZDFS
	if [ "$FEATURE_DFS" = "y" ];then
		config_profile_set wifi1 DfsEnable "1"
		config_profile_set wifi1 IEEE80211H "1"
		if [ "$FEATURE_ZDFS" = "y" ];then
			config_profile_set wifi1 DfsZeroWait "1"
			config_profile_set wifi1 DfsDedicatedZeroWait "1"
			config_profile_set wifi1 DfsZeroWaitDefault "1"
		else
			config_profile_set wifi1 DfsZeroWait "0"
			config_profile_set wifi1 DfsDedicatedZeroWait "0"
			config_profile_set wifi1 DfsZeroWaitDefault "0"
		fi
	else
		config_profile_set wifi1 DfsEnable "0"
		config_profile_set wifi1 IEEE80211H "0"
		config_profile_set wifi1 DfsZeroWait "0"
		config_profile_set wifi1 DfsDedicatedZeroWait "0"
		config_profile_set wifi1 DfsZeroWaitDefault "0"
	fi

	wifi_reload &
	echo "=====>>>>> wireless init setting is finished" >$CONSOLE
}

wifi_reload() {
	echo wifi_reload $@ > $STDOUT
	get_wlan_ini FEATURE_DBDC
	get_wlan_ini FEATURE_ONEMESH
	get_wlan_ini FIRST_ON_DEV
	get_wlan_ini FIRST_ON_VIF

	# For DBDC, 2g must start first, or 5G will not start
	if [ "${FEATURE_DBDC}" = "y" ]; then
		local any_dev_on=0
		config_set "$FIRST_ON_DEV" first_on_then_reload 0

		# Has no parameter, so it's for dual band operation.
		if [ -z $1 ]; then
			for dev in $DEVICES; do
				config_get disabled "$dev" disabled
				config_get disabled_all "$dev" disabled_all
				config_get onemesh_enable onemesh enable
				if [ "$disabled" = "off" -a "$disabled_all" = "off" ] || [ "$onemesh_enable" = "on" ]; then
					any_dev_on=1
					break
				fi
			done

			# Some device need start up, then make sure 2g start first!
			if [ "$any_dev_on" = "1" ]; then
				config_get disabled "$FIRST_ON_DEV" disabled
				config_get disabled_all "$FIRST_ON_DEV" disabled_all
				# 2g 配置是off时，需要设置“先启动再关闭”标志
				if [ "$disabled" = "on" -o "$disabled_all" = "on" ]; then
					echo wifi_reload ", configuration of first-on dev is off, should first on and then off " > $STDOUT
					config_set "$FIRST_ON_DEV" first_on_then_reload 1
				fi

				# 2g ra0 的配置是off时，也需要设置“先启动再关闭”标志
				config_get enable $FIRST_ON_VIF enable
				if [ "$enable" = "off" ]; then
					echo wifi_reload ", configuration of first-on vif is off, should first on and then off" > $STDOUT
					config_set "$FIRST_ON_DEV" first_on_then_reload 1
				fi
			fi
		fi
	fi
	
	for dev in ${1:-$DEVICES}; do
		wifi_radio $dev
	done

	if [ "${FEATURE_DBDC}" = "y" ]; then
		# For DBDC, if wifi0.first_on_then_reload is 1, set it to 0 and wifi_radio wifi0 again
		config_get first_on_then_reload "$FIRST_ON_DEV" first_on_then_reload 0
		if [ "$first_on_then_reload" = "1" ]; then
			echo wifi_reload ", now off the first-on vif." > $STDOUT
			config_set "$FIRST_ON_DEV" first_on_then_reload 0
			wifi_radio $FIRST_ON_DEV
		fi
	fi

	if [ "${FEATURE_ONEMESH}" = "n" ]; then
		wifi_smart_by_bndstrg
	fi

	wifi_led_set
}

wifi_smart()
{
	echo "=====config smart connect" >$STDOUT
	get_wlan_ini FEATURE_ONEMESH

	if [ "${FEATURE_ONEMESH}" = "y" ]; then
		wifi_reload
		/etc/init.d/nrd restart&
	else
		wifi_smart_by_bndstrg
	fi
}

wifi_onemesh() {
	echo wifi_onemesh $@ > $STDOUT

	/etc/init.d/nrd stop&
	/etc/init.d/sync-server stop

	local tdpServer_pid=`pgrep /usr/bin/tdpServer`
	if [ -n "$tdpServer_pid" ];then
		for pid in $tdpServer_pid; do
			kill -9 "$pid"
		done
	fi

	wifi_reload

	/etc/init.d/nrd start&
	/etc/init.d/sync-server start

	local tdpServer=$(pgrep tdpServer| wc -l)
	if [ "$tdpServer" -ge 1 ]; then
		return 1
	else
		"/bin/nice" -n -5 /usr/bin/tdpServer &>/dev/null &
	fi
}

wifi_wps_switch() {
	echo wifi_wps_switch $@ > $STDOUT

	local wps vifs=$@
	for vif in $vifs
	do
		config_get wps $vif wps
		if [ "$wps" = "off" ]; then
			config_iwpriv_set $vif WscConfMode 0
		elif [ "$wps" = "on" ]; then
			config_iwpriv_set $vif WscConfMode 7
		fi
	done
}

wifi_vlan() {
	config_vap_vlan &>$STDOUT
}

config_vap_vlan() {

	local brname;
	local hvlan=3 gvlan=2;
	get_wlan_ini NAME_BR

	for brname in $(cd /sys/class/net && ls -d ${NAME_BR}* 2>$STDOUT); do break; done
	for port in $(brctl show "$brname" | grep eth | cut -f 6-8); do
		brctl setifvlan "$brname" "$port" "$hvlan" 1
	done

	for dev in $DEVICES; do
			config_get_bool wifi_disabled $dev disabled       # hardware switch
			config_get_bool soft_disabled $dev disabled_all   # software switch
			if [ "$wifi_disabled" = "0" -a "$soft_disabled" = "0" ]; then
				for vif in $(config_get "$dev" vifs); do 
					if [ -d /sys/class/net/$vif ]; then
						local fw_action="unblock"
						config_get brname "$vif" bridge "${NAME_BR}"
						config_get phy_dev "$vif" device
						config_get band "$phy_dev" band
						config_get_bool guest "$vif" guest 0
						config_get_bool access "$vif" access 1
						config_get_bool isolate "$vif" isolate 0
						config_get vlankey "$vif" vlanid
						vlanid=3
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
						brctl addif "$brname" "$vif"
						brctl setifvlan "$brname" "$vif" "$vlanid" 1
						#ubus call network.interface.lan add_device "{\"name\":\"$vif\"}"
						[ "$guest" = "1" ] && echo "$access" > /proc/bridge_filter/local_access_flag && fw "$fw_action"_rt_access dev "$vif" &
						#[ "$1" = "up" ] && ifconfig "$vif" up
					fi
				done
			fi
	done
}

wifi_wps() {
	echo wifi_wps $@ > $STDOUT

	local vif="$1"
	local action="$2"

	case $action in
		pbc)
			config_iwpriv_set $vif WscConfMode 7
			config_iwpriv_set $vif WscMode 2
			config_iwpriv_set $vif WscGetConf 1
			echo "OK: true"
			;;
		pin)
			config_iwpriv_set $vif WscConfMode 7
			config_iwpriv_set $vif WscPinCode "$3"
			config_iwpriv_set $vif WscMode 1
			config_iwpriv_set $vif WscGetConf 1
			echo "OK: true"
			;;
		cancel)
			config_iwpriv_set $vif WscStop 1
			echo "OK: true"
			;;
		wps_ap_pin)
			[ "$3" = "set" ] && {
				config_iwpriv_set $vif WscLabelDisabled 0
				config_iwpriv_set $vif WscVendorPinCode "$4"
				config_iwpriv_set $vif WscSetupLock 0
			}
			[ "$3" = "disable" ] && {
				config_iwpriv_set $vif WscLabelDisabled 1
				config_iwpriv_set $vif WscSetupLock 1
			}
			;;
		pin_lock)
			iwpriv $vif get_wsc setup_lock
			;;
		status)
			iwpriv $vif get_wsc status
			;;
	esac

	echo "wps_shell_over"
}

wifi_macfilter() {
	echo wifi_macfilter $@ > $STDOUT

	macfilter_cb() {
		local vif="$1"
		local action="$2"

		local dev enable disabled disabled_all
		config_get dev $vif device
		config_get_bool enable $vif enable 0
		config_get_bool disabled $dev disabled 1
		config_get_bool disabled_all $dev disabled_all 1

		[ "$disabled" = "1" -o "$disabled_all" = "1" ] && enable=0
		[ "$enable" = "0" ] && return

		case $action in
			allow)
				config_iwpriv_set $vif AccessPolicy 1
				config_iwpriv_set $vif ACLClearAll 1
				config_iwpriv_set $vif ACLAddEntry "$(ac get_maclist | tr "\n" ";")"
				;;
			deny)
				config_iwpriv_set $vif AccessPolicy 2
				config_iwpriv_set $vif ACLClearAll 1
				config_iwpriv_set $vif ACLAddEntry "$(ac get_maclist | tr "\n" ";")"
				;;
			disable | *)
				config_iwpriv_set $vif AccessPolicy 0
				;;
		esac
	}

	config_foreach macfilter_cb wifi-iface $@
}

wifi_disconnect_sta()
{
	echo wifi_disconnect_sta $@ > $STDOUT
	local dev="$1"
	echo "=====>>>>> $dev: wifi_disconnect_sta" >$STDOUT
	config_get_bool wifi_disabled $dev disabled       #hardware switch
	config_get_bool soft_disabled $dev disabled_all   #software switch

	if [ "$wifi_disabled" = "0" -a "$soft_disabled" = "0" ]; then
		config_get vifs $dev vifs
		for vif in $vifs; do
			config_get_bool enable $vif enable
			config_get mode $vif mode
			if [ "$enable" = "1" -a "$mode" = "ap" ]; then
				config_iwpriv_set $vif DisConnectAllSta 1
			fi
		done
	fi
	
}

wifi_disconnect_stas()
{
	for dev in ${DEVICES}
	do
		wifi_disconnect_sta $dev
	done
}

