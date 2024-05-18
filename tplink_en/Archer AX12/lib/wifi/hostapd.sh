hostapd()
{
	wifi_dbg "/usr/sbin/hostapd $@"
	/usr/sbin/hostapd $@
}

hostapd_cli()
{
	wifi_dbg "/usr/sbin/hostapd_cli $@"

	if [ -e "/var/run/hostapd-global.pid" ]; then
		/usr/sbin/hostapd_cli $@
	fi
}

hostapd_acl_file()
{
	echo "/var/run/hostapd-$1.acl"
}

hostapd_set_acl_options()
{
	local var=$1
	local vif=$2
	local ifname
	local acl_file acl_enable acl_mode

	config_get ifname $vif ifname
	acl_file=$(hostapd_acl_file $ifname)

	acl_enable=$(ac get_enable)
	if [ "$acl_enable" != "on" ]; then
		rm -f $acl_file
		return
	fi

	ac get_maclist > $acl_file

	acl_mode=$(ac get_mode)
	if [ "$acl_mode" = "black" ]; then
		append $var "macaddr_acl=0" "$N"
		append $var "deny_mac_file=$acl_file" "$N"
	else
		append $vap "macaddr_acl=1" "$N"
		append $var "accept_mac_file=$acl_file" "$N"
	fi
}

hostapd_set_wps_options()
{
	local var=$1
	local vif=$2
	local device_type device_name manufacturer model_name model_number serial_number wps_pin rf_bands wps_uuid wps_sae wps_label band wps
	local wps_possible encryption psk_version

	config_get ifname $vif ifname
	config_get device $vif device
	config_get_bool wps_label $vif wps_label 0
	config_get_bool wps $vif wps 0
	config_get wps_pin $vif wps_pin "12345670"
	config_get encryption $vif encryption none
	config_get psk_version $vif psk_version
	config_get_bool hidden $vif hidden 0
	config_get band $device band

	if [ $wps -eq 0 -o $hidden -eq 1 ]; then
		wps_possible=
	elif [ "$encryption" = "none" ] || [ "$encryption" = "psk" ] || [ "$encryption" = "psk_sae" -a "$psk_version" = "sae_transition" ]; then
		wps_possible=1
	fi
	[ -z "$wps_possible" ] && return

	config_get device_type wps wps_device_type "6-0050F204-1"
	config_get device_name wps wps_device_name "OpenWrt AP"
	config_get manufacturer wps wps_manufacturer "openwrt.org"
	config_get model_name wps model_name "WAP"
	config_get model_number wps model_number "123"
	config_get serial_number wps serial_number "12345"
	config_get wps_uuid wps uuid

	append $var "wps_state=2" "$N"
	append $var "pbc_in_m1=1" "$N"
	[ $wps_label -eq 1 ] && append $var "ap_pin=$wps_pin" "$N"
	append $var "ap_setup_locked=0" "$N"
	append $var "device_type=$device_type" "$N"
	append $var "device_name=$device_name" "$N"
	append $var "manufacturer=$manufacturer" "$N"
	append $var "model_name=$model_name" "$N"
	append $var "model_number=$model_number" "$N"
	append $var "serial_number=$serial_number" "$N"
	append $var "config_methods=virtual_display keypad physical_push_button virtual_push_button" "$N"
	append $var "wps_rf_bands=ag" "$N"
	append $var "wps_independent=1" "$N"
	append $var "eap_server=1" "$N"

	# fix the overlap session of WPS PBC for dual band AP
	local macaddr=$(getfirm MAC)
	uuid=$(echo "$macaddr" | sed 's/-//g')
	[ -n "$uuid" ] && append $var "uuid=87654321-9abc-def0-1234-$uuid" "$N"
}

hostapd_set_bss_options()
{
	local var=$1
	local vif=$2
	local ifname device ssid macaddr isolate guest
	local encryption psk_version psk_cipher psk_key wpa_version wpa_cipher wpa_key wpa_group_rekey server port band
	local crypto wpa wpa_key_mgmt wpa_passphrase group_rekey auth_server_addr auth_server_port auth_server_shared_secret ieee80211w ieee8021x
	local sysmode rrm

	config_get ifname $vif ifname
	config_get device $vif device
	config_get band $device band
	config_get encryption $vif encryption none
	config_get psk_version $vif psk_version
	config_get psk_cipher $vif psk_cipher
	config_get psk_key $vif psk_key
	config_get wpa_version $vif wpa_version auto
	config_get wpa_cipher $vif wpa_cipher auto
	config_get wpa_key $vif wpa_key
	config_get wpa_group_rekey $dev wpa_group_rekey
	config_get server $vif server
	config_get port $vif port
	
	config_get sysmode sysmode mode

	case "$encryption" in 
		none)
			wpa=0
			auth_algs=1
		;;
		wep)
			wifi_err "not support wep now!"
		;;
		psk)
			auth_algs=1
			wpa_key_mgmt="WPA-PSK"

			case $psk_version in
				wpa) wpa=1;;
				wpa2 | rsn) wpa=2;;
				auto) wpa=3;;
			esac

			case $psk_cipher in
				tkip) crypto="TKIP";;
				aes | ccmp) crypto="CCMP";;
				auto) crypto="TKIP CCMP";;
			esac

			wpa_passphrase="$psk_key"
			group_rekey="$wpa_group_rekey"
		;;
		psk_sae)
			auth_algs=1
			wpa=2
			crypto=CCMP

			case $psk_version in
				sae_transition) wpa_key_mgmt="SAE WPA-PSK";;
				sae_only) wpa_key_mgmt="SAE";;
			esac

			wpa_passphrase="$psk_key"
			group_rekey="$wpa_group_rekey"
		;;
		wpa)
			ieee8021x=1
			auth_algs=1
			wpa_key_mgmt="WPA-EAP"

			case $wpa_version in
				wpa) wpa=1;;
				wpa2 | rsn) wpa=2;;
				auto) wpa=3;;
			esac

			case $wpa_cipher in
				tkip) crypto="TKIP";;
				aes | ccmp) crypto="CCMP";;
				auto) crypto="TKIP CCMP";;
			esac

			group_rekey="$wpa_group_rekey"
			auth_server_addr=$server
			auth_server_port=$port
			auth_server_shared_secret=$wpa_key
		;;
		wpa3)
			auth_algs=1
			wpa=2
			wpa_key_mgmt="WPA-EAP WPA-EAP-SUITE-B-192"
			crypto="TKIP CCMP"

			wpa_passphrase="$psk_key"
			group_rekey="$wpa_group_rekey"
		;;
	esac

	append $var "auth_algs=${auth_algs:-1}" "$N"
	append $var "wpa=$wpa" "$N"
	[ -n "$wpa_key_mgmt" ] && append $var "wpa_key_mgmt=$wpa_key_mgmt" "$N"
	[ -n "$crypto" ] && append $var "wpa_pairwise=$crypto" "$N"
	[ -n "$crypto" ] && append $var "rsn_pairwise=$crypto" "$N"
	[ -n "$wpa_passphrase" ] && append $var "wpa_passphrase=$wpa_passphrase" "$N"
	[ -n "$group_rekey" ] && append $var "wpa_group_rekey=$group_rekey" "$N"
	[ -n "$auth_server_addr" ] && append $var "auth_server_addr=$server" "$N"
	[ -n "$auth_server_port" ] && append $var "auth_server_port=$port" "$N"
	[ -n "$auth_server_shared_secret" ] && append $var "auth_server_shared_secret=$auth_server_shared_secret" "$N"
	[ -n "$ieee8021x" ] && append $var "ieee8021x=$ieee8021x" "$N"

	config_get ssid $vif ssid
	config_get macaddr $vif macaddr
	append $var "ssid=$ssid" "$N"
	append $var "bssid=$macaddr" "$N"

	config_get_bool guest $vif guest 0
	if [ $guest -eq 1 ]; then
		config_get_bool isolate $vif isolate 0
	else
		config_get_bool isolate $device isolate 0
	fi
	append $var "ap_isolate=$isolate" "$N"

	config_get_bool hidden $vif hidden 0
	append $var "ignore_broadcast_ssid=$hidden" "$N"

	append $var "ap_max_inactivity=300" "$N"

	append $var "eapol_version=2" "$N"
	append $var "eapol_key_index_workaround=0" "$N"
	append $var "bss_transition=1" "$N"
	
	config_get_bool rrm $vif rrm 0
	if [ "$sysmode" = "router" -o "$sysmode" = "repeater" ] && [ $rrm -eq 1 ];then
		append $var "rrm_neighbor_report=1" "$N"
		append $var "rrm_beacon_report=1" "$N"
	fi

	# gen ieee80211w
	if [ "$band" = "6g" ]; then
		ieee80211w=2
	elif [ "$encryption" = "psk_sae" ]; then
		if [ "$psk_version" = "sae_only" ]; then
			ieee80211w=2
		else
			ieee80211w=1
		fi
	else
		ieee80211w=0
	fi
	append $var "ieee80211w=$ieee80211w" "$N"
	
	append $var "bridge=$NAME_BR" "$N"
}


hostapd_set_mesh_options()
{
	local var=$1
	local vif=$2
	local is_root is_backhual easymesh_enable
	
	config_get_bool easymesh_enable meshd enableeasymesh 0
	#mian
	config_get_bool is_root $vif is_root 0
	#backhual
	config_get_bool is_backhual $vif backhaul 0
	config_get_bool is_config $vif onemesh_config 0

	config_get_bool meshd_enable meshd enable 0
	config_get_bool onemesh_ie $vif onemesh_ie 0

	if [ $onemesh_ie -eq 1 -a $meshd_enable -eq 1 ]; then
		local vendor_oui="001d0f"
		local random_suffix="7859"
		local tpie_mac gp_id_rand

		tpie_mac=`cat /sys/class/net/br-lan/address`
		tpie_mac=${tpie_mac//:/}

		config_get gp_id_rand onemesh group_id
		if [ "$gp_id_rand" != "-1" ]; then
			gp_id_rand=${gp_id_rand:0:4}
			[ -n "$gp_id_rand" ] && random_suffix=$gp_id_rand
		fi

		[ $is_root -eq 1 ] && {
			append $var "vendor_elements=dd1e${vendor_oui}1001630000${tpie_mac}${tpie_mac}${random_suffix}0000${tpie_mac:8:4}00010000" "$N"
		}
		# BACKHAUL WIFI AND CONFIG
		[ $is_backhual -eq 1 -o $is_config -eq 1 ] && {
			append $var "vendor_elements=dd1e${vendor_oui}1001670000${tpie_mac}${tpie_mac}${random_suffix}0000${tpie_mac:8:4}00010000" "$N"	
		}
	fi

	if [ $easymesh_enable -eq 1 ]; then

		local phy_dev band backhaul_vif backhaul_ssid backhaul_pwd
		config_get phy_dev "$vif" device
		config_get band $phy_dev band

		backhaul_vif=$(get_vif_by_type $phy_dev "backhaul")

		config_get backhaul_ssid $backhaul_vif ssid
		config_get backhaul_pwd $backhaul_vif psk_key

		if [ -n "$backhaul_ssid" -a -n "$backhaul_pwd" ]; then
			append $var "multi_ap_backhaul_ssid=\"${backhaul_ssid}\"" "$N"
			#append $var "multi_ap_backhaul_wpa_psk=${backhaul_pwd}" "$N"
			append $var "multi_ap_backhaul_wpa_passphrase=${backhaul_pwd}" "$N"
		fi

		[ $is_backhual -eq 1 -o $is_config -eq 1 ] && {
			append $var "multi_ap=3" "$N"
		}

		[ $is_root -eq 1 ] && {
			append $var "multi_ap=2" "$N"
		}

	fi
}

hostapd_set_country_options()
{
	local var=$1
	local vif=$2

	append $var "country_code=$COUNTRY_CODE" "$N"
}

hostapd_set_hw_options()
{
	local var=$1
	local vif=$2
	local ifname device shortgi hwmode htmode band dtim_period beacon_int rts_threshold wmm
	local hw_mode ht_capab vht_capab channel_mod oper_chwidth chanlist
	local obss_interval=0

	config_get ifname $vif ifname
	config_get device $vif device
	config_get_bool shortgi $device shortgi 1
	config_get channel $device channel
	config_get hwmode $device hwmode
	config_get htmode $device htmode
	config_get band $device band

	case $htmode in
		40)
			# 2g force 40Mhz
			[ "$band" = "2g" ] && append $var "force_2g_40m=1" "$N"
			;;
		auto)
			case $band in
				2g)
					htmode=40
					obss_interval=300
					;;
				5g)
					htmode=80
					;;
			esac
			;;
	esac

	# gen channel
	[ "$channel" = auto ] && {
		channel=0

		append $var "acs_num_scans=1" "$N"

		chanlist=$(get_acs_chanlist $band)
		append $var "chanlist=$chanlist" "$N"

		if [ "$band" = "2g" ]; then
			append $var "acs_chan_bias=6:1.0" "$N"
			if [ $htmode -eq 40 ]; then
				append $var "acs_chan_ht40_bias=1:+ 2:+ 3:+ 4:+ 5:+ 6:- 7:- 8:- 9:- 10:- 11:- 12:- 13:-" "$N"
			fi
		else
			append $var "scanlist=$chanlist" "$N"
		fi
	}
	append $var "channel=$channel" "$N"

	# gen hw_mode
	case $band in
		2g)
			if [ "$hwmode" = "b" ]; then
				hw_mode=b
			else
				hw_mode=g
			fi
			;;
		5g|6g) hw_mode=a;;
		*) wifi_err "unkonw band";;
	esac
	append $var "hw_mode=$hw_mode" "$N"

	# gen ht_capab
	if [ $htmode -ge 40 ]; then
		case $channel in
			1|2|3|4|5) append ht_capab "[HT40+]";;
			6|7|8|9|10|11|12|13) append ht_capab "[HT40-]";;
			36|44|52|60|100|108|116|124|132|140|149|157) append ht_capab "[HT40+]";;
			40|48|56|64|104|112|120|128|136|144|153|161) append ht_capab "[HT40-]";;
			0|"auto") 
				case $band in
					2g) append ht_capab "[HT40+][HT40-]";;
					5g) append ht_capab "[HT40+]";;
				esac
		esac
	fi

	if [ "$shortgi" = "1" ]; then
		[ $htmode -ge 20 ] && append ht_capab "[SHORT-GI-20]"
		[ $htmode -ge 40 ] && append ht_capab "[SHORT-GI-40]"
	fi
	[ -n "$ht_capab" ] && append $var "ht_capab=$ht_capab" "$N"

	# gen vht_oper_chwidth
	case $htmode in
		20|40) oper_chwidth=0;;
		80) oper_chwidth=1;;
		160) oper_chwidth=2;;
	esac
	append $var "vht_oper_chwidth=$oper_chwidth" "$N"
	append $var "he_oper_chwidth=$oper_chwidth" "$N"

	# gen vht_capab
	if str_match $hwmode "ax" || str_match $hwmode "ac" ; then
		if [ "$htmode" = "160" ]; then
			append vht_capab "[VHT160]"
			[ "$shortgi" = "1" ] && append vht_capab "[SHORT-GI-80][SHORT-GI-160]"
		elif [ "$htmode" = "80" ]; then
			[ "$shortgi" = "1" ] && append vht_capab "[SHORT-GI-80]"
		fi
	fi
	[ -n "$vht_capab" ] && append $var "vht_capab=$vht_capab" "$N"

	# gen vht_oper_centr_freq_seg0_idx he_oper_centr_freq_seg0_idx
	if [ "$band" = "5g" ]; then
		case $htmode in
			160)
				if [ $channel -ge 36 -a $channel -le 64 ]; then
					centr_freq_seg0_idx=50
				elif [ $channel -ge 100 -a $channel -le 128 ]; then
					centr_freq_seg0_idx=114
				fi
			;;
			80)
				if [ $channel -eq 0 ]; then
					centr_freq_seg0_idx=0
				elif [ $channel -le 48 ]; then
					centr_freq_seg0_idx=42
				elif [ $channel -le 64 ]; then
					centr_freq_seg0_idx=58
				elif [ $channel -le 112 ]; then
					centr_freq_seg0_idx=106
				elif [ $channel -le 128 ]; then
					centr_freq_seg0_idx=122
				elif [ $channel -le 144 ]; then
					centr_freq_seg0_idx=138
				elif [ $channel -le 161 ]; then
					centr_freq_seg0_idx=155
				elif [ $channel -le 177 ]; then
					centr_freq_seg0_idx=171
				fi
			;;
			40)
				if [ $channel -le 144 ]; then
					let "channel_mod=$channel%8"
				else
					let "channel_mod=($channel-1)%8"
				fi

				if [ $channel -eq 0 ]; then
					centr_freq_seg0_idx=0
				elif [ $channel_mod -eq 0 ]; then
					let "centr_freq_seg0_idx=$channel-2"
				else
					let "centr_freq_seg0_idx=$channel+2"
				fi
			;;
			20|*)
				centr_freq_seg0_idx=$channel
			;;
		esac

		[ $centr_freq_seg0_idx -gt 0 ] && {
			append $var "vht_oper_centr_freq_seg0_idx=$centr_freq_seg0_idx" "$N"
			append $var "he_oper_centr_freq_seg0_idx=$centr_freq_seg0_idx" "$N"
		}
	fi

	# 只有2.4G需要支持 Channel selection methods for 20/40 MHz operation
	[ $band != 2g ] && append $var "no_pri_sec_switch=1" "$N"

	# gen ieee80211n
	str_match $hwmode "n" && append $var "ieee80211n=1" "$N"

	# gen ieee80211ac
	str_match $hwmode "ac" && {
		append $var "ieee80211ac=1" "$N"
		str_match $hwmode "n" || append $var "ieee80211n=1" "$N"
	}

	# gen ieee80211ax
	str_match $hwmode "ax" && {
		append $var "ieee80211ax=1" "$N"
		str_match $hwmode "n" || append $var "ieee80211n=1" "$N"
		str_match $hwmode "ac" || append $var "ieee80211ac=1" "$N"
	}

	# gen ieee80211d
	append $var "ieee80211d=1" "$N"

	# gen beacon_int
	config_get beacon_int $device beacon_int 100
	[ "$beacon_int" -ge 15 -a "$beacon_int" -le 65535 ] || beacon_int=100
	append $var "beacon_int=$beacon_int" "$N"

	# gen dtim_period
	config_get dtim_period "$device" dtim_period 1
	[ "$dtim_period" -ge 1 -a "$dtim_period" -le 255 ] || dtim_period=1
	append $var "dtim_period=$dtim_period" "$N"

	# gen rts
	config_get rts_threshold "$device" rts_threshold 2346
	[ "$rts_threshold" -ge -1 -a "$rts_threshold" -le 65535 ] || rts_threshold=2346
	append $var "rts_threshold=$rts_threshold" "$N"

	# gen wmm
	config_get_bool wmm "$device" wmm 0
	append $var "wmm_enabled=$wmm" "$N"

	# gen obss_interval
	append $var "obss_interval=$obss_interval" "$N"

	append $var "fragm_threshold=2346" "$N"
	append $var "preamble=0" "$N"
}

hostapd_set_log_options()
{
	local var=$1
	local cfg=$2
	local log_level log_80211 log_8021x log_radius log_wpa log_driver log_iapp log_mlme

	config_get log_level "$cfg" log_level 2

	config_get_bool log_80211  "$cfg" log_80211  1
	config_get_bool log_8021x  "$cfg" log_8021x  1
	config_get_bool log_radius "$cfg" log_radius 1
	config_get_bool log_wpa    "$cfg" log_wpa    1
	config_get_bool log_driver "$cfg" log_driver 1
	config_get_bool log_iapp   "$cfg" log_iapp   1
	config_get_bool log_mlme   "$cfg" log_mlme   1

	[ -z "$cfg" ] && {
		set_default log_level 2
		set_default log_80211  1
		set_default log_8021x  1
		set_default log_radius 1
		set_default log_wpa    1
		set_default log_driver 1
		set_default log_iapp   1
		set_default log_mlme   1
	}

	local log_mask=$((($log_80211 << 0) | ($log_8021x << 1) | ($log_radius << 2) | ($log_wpa << 3) | ($log_driver << 4) | ($log_iapp << 5) | ($log_mlme << 6)))

	append $var "logger_syslog=$log_mask" "$N"
	append $var "logger_syslog_level=$log_level" "$N"
	append $var "logger_stdout=$log_mask" "$N"
	append $var "logger_stdout_level=$log_level" "$N"
}

hostapd_set_basic_options()
{
	local var=$1
	local ifname=$2

	append $var "driver=nl80211" "$N"
	append $var "interface=$2" "$N"
	append $var "ctrl_interface=/var/run/hostapd/" "$N"
}

hostapd_gen_config()
{
	local hostapd_cfg_file=$1
	local vif=$2
	local ifname device

	hostapd_cfg=

	config_get ifname $vif ifname
	config_get device $vif device

	hostapd_set_basic_options hostapd_cfg $ifname
	hostapd_set_log_options hostapd_cfg $device
	hostapd_set_country_options hostapd_cfg $vif
	hostapd_set_hw_options hostapd_cfg $vif
	hostapd_set_bss_options hostapd_cfg $vif
	hostapd_set_wps_options hostapd_cfg $vif
	hostapd_set_acl_options hostapd_cfg $vif
	hostapd_set_mesh_options hostapd_cfg $vif

	rm -f $hostapd_cfg_file
	cat > $hostapd_cfg_file <<EOF
$hostapd_cfg
EOF
}

hostapd_start_vif()
{
	local vif=$1
	local ifname device phy
	local hostapd_config_file

	config_get ifname $vif ifname
	config_get device $vif device
	config_get phy "$device" phy

	wifi_dbg "hostapd_start_vif $vif"

	hostapd_config_file="/var/run/hostapd-$ifname.conf"

	hostapd_gen_config $hostapd_config_file $vif

	hostapd_cli -i global -p /var/run/hostapd raw ADD bss_config=$phy:$hostapd_config_file
}

hostapd_stop_vif()
{
	local vif=$1
	local ifname running_ifs tmp_if

	config_get ifname $vif ifname

	running_ifs=$(hostapd_cli -i global -p /var/run/hostapd interface)
	for tmp_if in $running_ifs
	do
		if [ "$tmp_if" = "$ifname" ]; then
			wifi_dbg "hostapd_stop_vif $ifname"
			hostapd_cli -i global -p /var/run/hostapd raw REMOVE $ifname
			break
		fi
	done

	rm -f /var/run/hostapd-$ifname.conf
}

hostapd_global()
{
	hostapd -g /var/run/hostapd/global -P /var/run/hostapd-global.pid -B
	#hostapd_cli -i global -a /lib/wifi/wps-hostapd-update-uci -P /var/run/hostapd-cli-global.pid -B
}

hostapd_wps()
{
	local vif=$1
	shift 1
	local ifname

	config_get ifname $vif ifname

	hostapd_cli -i $ifname $@
}

hostapd_acl_action()
{
	local vif=$1
	local action=$2
	local ifname acl_file

	config_get ifname $vif ifname

	acl_file=$(hostapd_acl_file $ifname)
	rm -f $acl_file

	# 此处暂不修改hostapd配置，而是动态修改hostapd的内存配置，避免重启vap
	case $action in
		allow)
			ac get_maclist > $acl_file
			hostapd_cli -i $ifname set macaddr_acl 1
			hostapd_cli -i $ifname set accept_mac_file $acl_file
			;;
		deny)
			ac get_maclist > $acl_file
			hostapd_cli -i $ifname set macaddr_acl 0 
			hostapd_cli -i $ifname set deny_mac_file $acl_file
			;;
		disable|*)
			hostapd_cli -i $ifname set macaddr_acl 0
			hostapd_cli -i $ifname accept_acl CLEAR
			hostapd_cli -i $ifname deny_acl CLEAR
			;;
	esac

	hostapd_cli -i $ifname apply_acl
}

hostapd_kick_all_sta()
{
	local vif=$1
	local ifname

	config_get ifname $vif ifname

	hostapd_cli -i $ifname DisConnectStaOfBss
}

hostapd_update_tpie()
{
	local vif=$1
	local bss_type=$2
	local mac=$3
	local gp_id_rand=$4
	local vendor_oui="001d0f"
	local ifname tpie_level product_type tpie_subnet_type backhaul_type uplink_rate vendor_element sysmode level device band lan_mac tpie_enable
	
	config_get ifname $vif ifname
	config_get_bool tpie_enable $vif onemesh_ie 0
	if [ $tpie_enable -eq 0 ];then
		hostapd_cli -i $ifname set vendor_elements ""
		hostapd_cli -i $ifname update_beacon
		wifi_dbg "$ifname set none tpie"
		return
	fi
	
	config_get sysmode sysmode mode
	config_get level onemesh level
	config_get device $vif device
	config_get band $device band
	
	local random_suffix="5789"
	lan_mac=`cat /sys/class/net/br-lan/address`
	lan_mac=${lan_mac//:/}
	
	if [ -z "$level" ];then
		level=2
	fi

	if [ "$sysmode" = "router" ];then
		tpie_subnet_type=01 #AP
		tpie_level=00
		backhaul_type=00
		product_type=0001
		uplink_rate=0000
	elif [ "$sysmode" = "repeater" ];then
		tpie_subnet_type=02 #RE

		if [ "$level" = "0" ];then
			tpie_level=00
		elif [ "$level" = "1" ];then
			tpie_level=01
		else
			tpie_level=02
		fi

		[ "$band" == "2g" ] && backhaul_type=01 || backhaul_type=10
		#to do
		#if rootAP is not wireless router, product should be set by wpa_supplicant when connect.
		config_get product_type onemesh product_type 0001
		
		#to do
		#use rssi as uplink_rate
		uplink_rate=0000
	fi
	
	[ -n "$gp_id_rand" ] && random_suffix=$gp_id_rand
	
	vendor_element=dd1e${vendor_oui}10${tpie_subnet_type}${bss_type}${tpie_level}${backhaul_type}${mac}${mac}${random_suffix}${uplink_rate}${lan_mac:8:4}${product_type}0000
	hostapd_cli -i $ifname set vendor_elements $vendor_element
	hostapd_cli -i $ifname update_beacon
	
	wifi_dbg "$ifname update tpie $vendor_element"
}