#!/bin/sh
#
# Copyright (c) 2019 TP-LINK Technologies Co., Ltd.
# All Rights Reserved.

export DEBUG=1

[ $DEBUG ] && STDOUT=/dev/console || STDOUT=/dev/null
STDERR=/dev/console

PROFILE_PATH_2G="/etc/wireless/RT2860AP/RT2860_2G.dat"
PROFILE_PATH_5G="/etc/wireless/RT2860AP/RT2860_5G.dat"
BASIC_VAP="ra0 rai0"

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

	config_get TYPE "$1" TYPE
	[ "$TYPE" = "wifi-iface" ] && config_get dev "$1" device

	config_get band "$dev" band
	[ "$band" = "2g" ] && profile_path=${PROFILE_PATH_2G} || profile_path=${PROFILE_PATH_5G}

	[ -n "$3" ] && sed -i "s/^"$2"=.*$/"$2"=$3/g" ${profile_path}
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

	config_iwpriv_set $vif SSID $ssid
	config_iwpriv_set $vif HideSSID $hidden
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
	config_iwpriv_set $vif IgmpSnoopDeny '"239.255.255.250;224.0.0.251;224.0.0.252;224.0.0.1;224.0.0.2;224.0.0.4;224.0.0.5;224.0.0.6;224.0.0.7;224.0.0.8;224.0.0.9;224.0.0.12;224.0.0.16;224.0.0.17;224.0.0.22;"'
	config_iwpriv_set $vif IgmpSnoopNoGup 1

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

config_encryption() {
	local vif="$1"

	local encryption
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
			
			if [ "$vif" = "ra0" -o "$vif" = "rai0" ];then
				config_profile_set "$dev" WPAPSK1 "$psk_key"	
			fi
			
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

			killall -q -SIGINT rt2860apd
			config_iwpriv_set $vif AuthMode $AuthMode
			config_iwpriv_set $vif EncrypType $EncrypType
			config_iwpriv_set $vif IEEE8021X 0
			config_iwpriv_set $vif RADIUS_Server $server
			config_iwpriv_set $vif RADIUS_Port $port
			config_iwpriv_set $vif RADIUS_Key $wpa_key
			config_iwpriv_set $vif EAPifname "br-lan"
			config_iwpriv_set $vif own_ip_addr "$(ifconfig eth0 | grep "inet addr" | awk -F '[ :]+' '{print $4}')"
			config_iwpriv_set $vif SSID $ssid
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
			config_iwpriv_set $vif EAPifname "br-lan"
			config_iwpriv_set $vif own_ip_addr "$(ifconfig eth0 | grep "inet addr" | awk -F '[ :]+' '{print $4}')"
			config_iwpriv_set $vif SSID $ssid
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
				open) ApCliAuthMode=OPEN;;
				auto | shared) ApCliAuthMode=SHARED;;
			esac

			config_iwpriv_set $vif ApCliAuthMode $AuthMode
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
	config_get psk_version $vif psk_version auto

	if [ "$wps" = "0" ] || [ "$encryption" = "psk_sae" -a "$psk_version" = "sae_only" ]; then
		config_iwpriv_set $vif WscConfMode 0
	else
		config_iwpriv_set $vif WscConfMode 7
	fi
	config_iwpriv_set $vif WscConfStatus 2
	config_iwpriv_set $vif WscVendorPinCode $pin
	config_iwpriv_set $vif WscSetupLock 0

	config_get_bool wps_label $vif wps_label 0
	if [ "$wps_label" = 0 ]; then
		wifi_wps $vif wps_ap_pin disable
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
			band="WIFI2G"
		elif [ "$band" == "5g" ] ; then
			band="WIFI5G"
		fi

		ledcli ${band}_${led_state}

	done

}


wifi_vap() {
	echo wifi_vap $@ > $STDOUT

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

	local action=
	[ "$1" = "up" -o "$1" = "down" ] && {
		action="$1"
		shift 1
	}
	local vifs="$@"

	for vif in $vifs; do

		config_get dev "$vif" device
		config_get backhaul $vif backhaul ""
		config_get onemesh_enable onemesh enable
		config_get_bool disabled "$dev" disabled 0
		config_get_bool disabled_all "$dev" disabled_all 0

		if [ "$onemesh_enable" != "on" -a "$backhaul" = "on" ]; then
			continue
		fi

		if [ "$backhaul" != "on" ]; then
			if [ "$disabled" = "1" -o "$disabled_all" = "1" ]; then
				continue
			fi
		fi

		config_get_bool enable $vif enable off
		[ "$enable" = "0" ] && action="down" || action="up"

		[ "$action" = "down" ] && {
			brctl delif br-lan $vif
			ifconfig $vif down
			continue
		}

		ifconfig $vif up

		local mode guest ssid
		config_get mode $vif mode ap
		config_get_bool guest $vif guest off
		config_get ssid $vif ssid
		config_get_bool hidden $vif hidden

                sysmode=$(uci get sysmode.sysmode.mode)
                config_get onemesh_ie $vif onemesh_ie "on"
                #config_get backhaul $vif backhaul ""
                [ "$onemesh_enable" = "on" ] && [ "$sysmode" = "router" ] && [ "$onemesh_ie" = "on" ] && {
                        if [ "$backhaul" = "on" ]; then
                                echo "=====>>>>>set tp_ie for vap $vif" > $STDOUT
                                iwpriv $vif set tp_ie="dd1e${TP_OUI}1001070000${tpie_mac}${tpie_mac}${random_suffix}0000${tpie_mac:8:4}${product_type}${reserve}"
                        else
                                echo "=====>>>>>set tp_ie for vap $vif" > $STDOUT
                                iwpriv $vif set tp_ie="dd1e${TP_OUI}1001030000${tpie_mac}${tpie_mac}${random_suffix}0000${tpie_mac:8:4}${product_type}${reserve}"
                        fi
                }

		[ "$mode" = "ap" -a "$guest" = "0" ] && {
			config_basic_setting $vif
			config_advanced_setting $vif
			config_encryption $vif
			config_wps_setting $vif

			config_iwpriv_set $vif HideSSID $hidden
			config_iwpriv_set $vif SSID "$ssid"		
			config_iwpriv_set $vif hw_nat_register 1
		}
		[ "$mode" = "ap" -a "$guest" = "1" ] && {
			config_guest_basic_setting $vif
			# config_guest_advanced_setting $vif
			config_encryption $vif

			config_iwpriv_set $vif HideSSID $hidden
			config_iwpriv_set $vif SSID "$ssid"
			config_iwpriv_set $vif hw_nat_register 1
		}
		[ "$mode" = "sta" ] && {
			config_wds_setting $vif
		}

		# To avoid br-lan is created too slowly in /etc/rc.d/S25Netowrk, add interface to bridge here.
		brctl addif br-lan $vif

		[ "$onemesh_ie" = "on" -a "$backhaul" != "on" ] && {
			/etc/init.d/nrd restart&
		}
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
	#need to write into profile to make those configuration take effect
	local dev="$@"

	# config basic wifi device parameter
	local band hwmode bandwidth channel ssid hidden power_percent sysmode
	config_get band $dev band
	config_get hwmode $dev hwmode
	config_get bandwidth $dev htmode
	config_get channel $dev channel
	config_get ssid $vif ssid
	config_get onemesh_enable onemesh enable
	config_get smart_enable smart smart_enable
	config_get_bool hidden $vif hidden

	config_load sysmode 
	config_get sysmode sysmode mode "router"

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

	if [ "$sysmode" = "router" -a "$onemesh_enable" = "on" ] || [ "$smart_enable" = "on" ]; then
		config_profile_set "$dev" WNMEnable "1;0;0;0"
		config_profile_set "$dev" RRMEnable "1;0;0;0"
	else
		config_profile_set "$dev" WNMEnable "0;0;0;0"
		config_profile_set "$dev" RRMEnable "0;0;0;0"
	fi

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
		#config_get_bool disabled "$dev" disabled 0
		#config_get_bool disabled_all "$dev" disabled_all 0
		#if [ "$disabled" = "1" -o "$disabled_all" = "1" ]; then
		#	continue
		#fi

		config_get vifs "$dev" vifs
		# for ra0, ra1, apcli0/ rai0, rai1, apclii0
		for vif in $vifs; do
			if [ "$sysmode" = "ap" ]; then 
				if [ "$vif" = "apcli0" -o "$vif" = "apclii0" ]; then
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
		CA) regulatory="CA";;
		RU|KR) regulatory="CE";;
		DE|EU) regulatory="EU";;
		JP) regulatory="JP";;
		TW) regulatory="TW";;
		BR) regulatory="BR";;
	esac

	[ -f /etc/wireless/RT2860AP/SingleSKU_5G_${regulatory}.dat ] && {
		mv /etc/wireless/RT2860AP/SingleSKU_${regulatory}.dat /etc/wireless/RT2860AP/SingleSKU.dat
		mv /etc/wireless/RT2860AP/SingleSKU_5G_${regulatory}.dat /etc/wireless/RT2860AP/SingleSKU_5G.dat
		rm -rf /etc/wireless/RT2860AP/SingleSKU_5G_*
		rm -rf /etc/wireless/RT2860AP/SingleSKU_CE*
		rm -rf /etc/wireless/RT2860AP/SingleSKU_EU*
		rm -rf /etc/wireless/RT2860AP/SingleSKU_JP*		
		rm -rf /etc/wireless/RT2860AP/SingleSKU_FCC*
		rm -rf /etc/wireless/RT2860AP/SingleSKU_TW*
		rm -rf /etc/wireless/RT2860AP/SingleSKU_BR*
		rm -rf /etc/wireless/RT2860AP/SingleSKU_CA*
	}

	if [ "$country" = "US" ];then
		#A6 US 3.0 2G channel 1-13
		config_profile_set wifi0 CountryRegion "0"
		config_profile_set wifi0 CountryNum "840"
		config_profile_set wifi0 CountryCode "US"
		config_profile_set wifi0 AutoChannelSkipList "1;11;12;13;52;56;60;64;100;104;108;112;116;120;124;128;132;136;140;149;153;157;161;165"
		#A6 US 3.0 5G channel band1,band4, auto skip band1
		config_profile_set wifi1 CountryRegionABand "10"
		config_profile_set wifi1 CountryNum "840"
		config_profile_set wifi1 CountryCode "US"
		config_profile_set wifi1 AutoChannelSkipList "1;11;12;13;36;40;44;48;52;56;60;64;100;104;108;112;116;120;124;128;132;136;140"
	elif [ "$country" = "JP" ];then
		#A6 JP 3.0 2G channel 1-13
		config_profile_set wifi0 CountryRegion "1"
		config_profile_set wifi0 CountryNum "392"
		config_profile_set wifi0 CountryCode "JP"
		config_profile_set wifi0 AutoChannelSkipList "1;11;12;13;52;56;60;64;100;104;108;112;116;120;124;128;132;136;140;149;153;157;161;165"
		#A6 JP 3.0 5G channel 36-48
		config_profile_set wifi1 CountryRegionABand "6"
		config_profile_set wifi1 CountryNum "392"
		config_profile_set wifi1 CountryCode "JP"
		config_profile_set wifi1 AutoChannelSkipList "1;11;12;13;52;56;60;64;100;104;108;112;116;120;124;128;132;136;140"
	elif [ "$country" = "CA" ];then
	#follow US
		config_profile_set wifi0 CountryRegion "0"
		config_profile_set wifi0 CountryNum "124"
		config_profile_set wifi0 CountryCode "CA"
		config_profile_set wifi0 AutoChannelSkipList "1;11;12;13;52;56;60;64;100;104;108;112;116;120;124;128;132;136;140;149;153;157;161;165"
		#A6 JP 3.0 5G channel 36-48
		config_profile_set wifi1 CountryRegionABand "10"
		config_profile_set wifi1 CountryNum "124"
		config_profile_set wifi1 CountryCode "CA"
		config_profile_set wifi1 AutoChannelSkipList "1;11;12;13;36;40;44;48;52;56;60;64;100;104;108;112;116;120;124;128;132;136;140"
	elif [ "$country" = "DE" ];then
		#C6 EU 3.0 2G channel 1-13
		config_profile_set wifi0 CountryRegion "1"
		config_profile_set wifi0 CountryCode "DE"
		config_profile_set wifi0 CountryNum "276"
		config_profile_set wifi0 AutoChannelSkipList "12;13;52;56;60;64;100;104;108;112;116;120;124;128;132;136;140;149;153;157;161;165"
		#C6 EU 3.0 5G channel 36-48
		config_profile_set wifi1 CountryRegionABand "6"
		config_profile_set wifi1 CountryNum "276"
		config_profile_set wifi1 CountryCode "DE"
		config_profile_set wifi1 AutoChannelSkipList "1;11;12;13;52;56;60;64;100;104;108;112;116;120;124;128;132;136;140"
	elif [ "$country" = "RU" ];then
		#C6 RU 3.0 2G channel 1-13
		config_profile_set wifi0 CountryRegion "1"
		config_profile_set wifi0 CountryCode "DE"
		config_profile_set wifi0 CountryNum "276"
		config_profile_set wifi0 AutoChannelSkipList="1;11;12;13;52;56;60;64;100;104;108;112;116;120;124;128;132;136;140;149;153;157;161;165"
		#C6 RU 3.0 5G channel band1 band2 band 4
		config_profile_set wifi1 CountryNum "643"
		config_profile_set wifi1 CountryRegionABand "0"
		config_profile_set wifi1 CountryCode "RU"
		config_profile_set wifi1 AutoChannelSkipList "1;11;12;13;52;56;60;64;100;104;108;112;116;120;124;128;132;136;140;149;153;157;161;165"
	elif [ "$country" = "KR" ];then
		#C6 KR 3.20 2G channel 1-13,basically KR follows RU.
		config_profile_set wifi0 CountryRegion "1"
		config_profile_set wifi0 CountryCode "KR"
		config_profile_set wifi0 CountryNum "410"
		config_profile_set wifi0 AutoChannelSkipList="1;11;12;13;52;56;60;64;100;104;108;112;116;120;124;128;132;136;140;149;153;157;161;165"
		#C6 KR 3.0 5G band1 band4
		config_profile_set wifi1 CountryNum "410"
		config_profile_set wifi1 CountryRegionABand "10"
		config_profile_set wifi1 CountryCode "KR"
		config_profile_set wifi1 AutoChannelSkipList "1;11;12;13;52;56;60;64;100;104;108;112;116;120;124;128;132;136;140;149;153;157;161;165"
	elif [ "$country" = "TW" ];then
		config_profile_set wifi0 CountryRegion "0"
		config_profile_set wifi0 CountryNum "158"
		config_profile_set wifi0 CountryCode "TW"
		config_profile_set wifi0 AutoChannelSkipList "1;2;6;10;11;12;13;52;56;60;64;100;104;108;112;116;120;124;128;132;136;140;149;153;157;161;165"
		config_profile_set wifi1 CountryRegionABand "10"
		config_profile_set wifi1 CountryNum "158"
		config_profile_set wifi1 CountryCode "TW"
		config_profile_set wifi1 AutoChannelSkipList "1;11;12;13;36;40;44;48;52;56;60;64;100;104;108;112;116;120;124;128;132;136;140"
	elif [ "$country" = "BR" ];then
		#A6 BR 3.0 2G channel 1-13
		config_profile_set wifi0 CountryRegion "1"
		config_profile_set wifi0 CountryCode "BR"
		config_profile_set wifi0 CountryNum "76"
		config_profile_set wifi0 AutoChannelSkipList "1;11;12;13;52;56;60;64;100;104;108;112;116;120;124;128;132;136;140;149;153;157;161;165"
		config_profile_set wifi1 CountryRegionABand "10"
		config_profile_set wifi1 CountryNum "76"
		config_profile_set wifi1 CountryCode "BR"
		config_profile_set wifi1 AutoChannelSkipList "1;11;12;13;36;40;44;48;52;56;60;64;100;104;108;112;116;120;124;128;132;136;140"		
	fi
		
	insmod /lib/modules/$(uname -r)/kernel/drivers/net/wireless/mtk/mt7603e/mt7603_wifi_ap/mt_wifi.ko
	insmod /lib/modules/$(uname -r)/kernel/drivers/net/wireless/mtk/mt7663e/MT7613_ap/MT7613_ap.ko

	for vap in ${BASIC_VAP}; do
		ifconfig $vap up
	done

	wifi_reload &
	echo "=====>>>>> wireless init setting is finished" >$CONSOLE
}

wifi_reload() {
	echo wifi_reload $@ > $STDOUT
	
	for dev in ${1:-$DEVICES}; do
		wifi_radio $dev
	done

	wifi_led_set
}

wifi_smart()
{
	echo "=====config smart connect" >$STDOUT

	wifi_reload
	/etc/init.d/nrd restart&
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
	for brname in $(cd /sys/class/net && ls -d br-lan* 2>$STDOUT); do break; done
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
						config_get brname "$vif" bridge "br-lan"
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

