#!/bin/sh
#
# Copyright (c) 2014 TP-LINK Technologies Co., Ltd.
#
# All Rights Reserved.
#

. /lib/read_region_hp.sh

STDOUT="/dev/null"
[ "$DEBUG" = "1" ] && STDOUT="/dev/console"

wifi_fixup_encryption() {
	case "$(config_get "$1" encryption)" in
		none)
			config_set "$1" encryption none
			;;
		psk)
			local psk="mixed-psk" enc="tkip+ccmp"
			local psk_key psk_version psk_cipher
			config_get psk_key "$1" psk_key
			config_get psk_version "$1" psk_version
			config_get psk_cipher "$1" psk_cipher
			[ "$psk_version" = "wpa" ] && psk="psk"
			[ "$psk_version" = "wpa2" -o "$psk_version" = "rsn" ] && psk="psk2"
			[ "$psk_cipher" = "aes" -o "$psk_cipher" = "ccmp" ] && enc="ccmp"
			[ "$psk_cipher" = "tkip" ] && enc="tkip" && config_set "$1" puren 0
			[ "$enc" = "tkip" -o "$psk" = "psk" ] && config_set "$1" wps 0
			config_set "$1" encryption "$psk"+"$enc"
			config_set "$1" key "$psk_key"
			config_set "$1" wps_state 2
			;;
		wpa)
			local wpa="mixed-wpa" enc="tkip+ccmp"
			local wpa_key wpa_version wpa_cipher
			config_get wpa_key "$1" wpa_key
			config_get wpa_version "$1" wpa_version
			config_get wpa_cipher "$1" wpa_cipher
			[ "$wpa_version" = "wpa" ] && wpa="wpa"
			[ "$wpa_version" = "wpa2" -o "$wpa_version" = "rsn" ] && wpa="wpa2"
			[ "$wpa_cipher" = "aes" -o "$wpa_cipher" = "ccmp" ] && enc="ccmp"
			[ "$wpa_cipher" = "tkip" ] && enc="tkip" && config_set "$1" puren 0
			[ "$enc" = "tkip" -o "$wpa" = "wpa" ] && config_set "$1" wps 0
			config_set "$1" encryption "$wpa"+"$enc"
			config_set "$1" key "$wpa_key"
			;;
		wep)
			local enc="wep-mixed" wep_key wep_mode wep_select
			config_get wep_mode "$1" wep_mode
			config_get wep_select "$1" wep_select 1
			config_get wep_key "$1" wep_key"$wep_select"
			[ "$wep_mode" = "1" -o "$wep_mode" = "open" ] && enc="wep-open"
			[ "$wep_mode" = "2" -o "$wep_mode" = "shared" ] && enc="wep-shared"
			for i in 1 2 3 4; do config_set "$1" key$i ""; done
			config_set "$1" key$wep_select $(prepare_key_wep "$wep_key")
			config_set "$1" encryption "$enc"
			config_set "$1" key "$wep_select"
			config_set "$1" puren 0
			config_set "$1" wps 0
			;;
	esac
}

wifi_fixup_mode() {
	local dev="$1" hwmode htmode channel chwidth=0
	local pureg=0 puren=0 pure11ac=0 deny11ab=0 disablecoext=0
	local devcfg="hwmode txpower htmode channel"
	local dyncfg="pureg puren pure11ac deny11ab chwidth disablecoext"
	local vapcfg="rts frag dtim_period wpa_group_rekey wmm shortgi isolate bintval"
	
	for cfg in $devcfg $vapcfg; do	config_get "$cfg" "$dev" "$cfg";	done;

	case $hwmode in
		b)  hwmode=11b;  htmode="";;
		g)  hwmode=11g;  htmode=""; pureg=1;;
		n)  hwmode=11ng; puren=1;;
		bg) hwmode=11bg; htmode="";;
		gn) hwmode=11ng; deny11ab=1;;
		bgn) hwmode=11ng;;
		a_5) hwmode=11a; htmode="";;
		n_5) hwmode=11na; puren=1;;
		an_5) hwmode=11na;;
		ac_5) hwmode=11ac; pure11ac=1;;
		nac_5) hwmode=11ac; deny11ab=1;;
		anac_5) hwmode=11ac;;
		*) return;;
	esac

	if [ "$htmode" = "auto" ]; then
		case $hwmode in
			11ng|11na) chwidth=1; htmode=HT40;;
			11ac) chwidth=2; htmode=HT80;;
		esac
	else
		case $htmode in
			20)  chwidth=0; htmode=HT20;;
			40)  chwidth=1; htmode=HT40; disablecoext=1;;
			80)  chwidth=2; htmode=HT80; disablecoext=1;;
		esac
	fi

	for cfg in $devcfg; do eval config_set "$dev" "$cfg" $"$cfg";	done
		
	config_get bintval "$dev" beacon_int 100
	for vif in $(config_get "$dev" vifs); do 
		config_get isolate "$vif" isolate "$isolate"
		[ "$hwmode" = "11ng" ] && config_set "$vif" vht_11ng 1
		for cfg in $dyncfg $vapcfg; do eval config_set "$vif" "$cfg" $"$cfg";	done
	done
}

config_access_ctl()
{
	type ac &>/dev/null || return

	local tmp_enable tmp_mode   
	tmp_enable=$(ac get_enable) 
	[ "$tmp_enable" = "on" ] && {
		local tmp_action
		tmp_mode=$(ac get_mode)
		case $tmp_mode in
			white) tmp_action="allow" ;;
			*)     tmp_action="deny" ;;
		esac

		config_set filter enable $tmp_enable
		config_set filter action $tmp_action
		MACLIST=$(ac get_maclist)
	}
}

wifi_fixup_led()
{
	type ledpm_onoff &>/dev/null || return

	local en=$(ledpm_onoff)
	if [ "$en" = "on" ]; then
		config_set "$1" led_enable off
	else
		config_set "$1" led_enable on    
	fi
}

wifi_fixup_config() {
	local enable macfilter="deny" wps brname="br-lan"

	# MAC Filter from Access Control modules
	config_access_ctl

	config_get_bool enable filter enable 1

	brname=$(ubus call network.interface.lan status| grep l3_device| awk -F'"' '{print $4}')
	
	if [ "$enable" = "1" ]; then 
		MACLIST=${MACLIST//-/:};
		config_get macfilter filter action "deny"
	else
		unset MACLIST
	fi

	config_set qcawifi fw_dump_options 5 # FW crash ram dump

	for dev in ${1:-DEVICES}; do
		# fixup wifi leds	
		wifi_fixup_led "$dev"
		wifi_fixup_mode "$dev"

		config_set "$dev" enable_ol_stats 1 # Enable ol stats
		config_set "$dev" blockdfslist 1 # Disable DFS channels

		config_get band "$dev" band
		#[ "$band" = "5g" ] && config_set "$dev" burst 1

		for vif in $(config_get "$dev" vifs); do 
			config_get mode "$vif" mode
			config_get_bool hidden "$vif" hidden 0
			config_get_bool enable "$vif" enable 0
			#config_set "$vif" vhtmubfer 1
			#config_set "$vif" vhtmubfee 1

			# fixup encryption
			wifi_fixup_encryption "$vif"

			config_get_bool wps "$vif" wps 0
			config_get_bool wps_label "$vif" wps_label 0
			[ "$wps" = "1" ] && {
				local c v wpscfg="wps_uuid wps_device_type wps_device_name wps_manufacturer wps_manufacturer_url \
													model_name model_number model_url serial_number os_version"
				for c in $wpscfg; do
					config_get v wps "$c"
					config_set "$vif" "$c" "$v"
				done
				[ "$band" = "2g" ] && config_set "$vif" wps_rf_bands g
				[ "$band" = "5g" ] && config_set "$vif" wps_rf_bands a
			}
			if [ "$wps" = "0" -o "$hidden" = "1" ]; then
				config_set "$vif" wps_pbc ""
			elif [ "$wps_label" = "1" ]; then
				config_set "$vif" wps_config "label"
			else
				config_set "$vif" wps_config ""
				config_set "$vif" wps_pin ""
			fi

			config_set "$vif" disabled "$((enable^1))"
			config_set "$vif" disabled_all "$((enable^1))"
			config_set "$vif" network lan
			config_set "$vif" bridge "${brname:-br-lan}"
			config_set "$vif" mcastenhance 2
			#[ "$band" = "5g" ] && config_set "$vif" amsdu 2

			if [ "$mode" = "ap" ]; then
				config_set "$vif" macfilter "$macfilter"
				config_set "$vif" maclist "$MACLIST"
				if [ "$band" = "2g" ]; then
					config_set "$vif" doth 0
					config_set "$vif" ignore11d 1
					config_set "$vif" countryie 0
				fi
			else
				config_get bssid "$vif" bssid
				config_get extap "$vif" wds_mode 2
				config_set "$vif" extap "$extap"
				config_set "$vif" bssid "${bssid//-/:}"
				config_set "$vif" bintval ""
				config_set "$vif" dtim_period ""
				config_set "$vif" macfilter ""
				config_set "$vif" maclist ""
			fi
		done
	done
}

config_country() {
	config_get country "$1" country US
	config_get_bool blockdfs "$1" blockdfslist 0
	iwpriv "$1" blockdfschlist "$blockdfs" || iwpriv "$1" blockdfslist "$blockdfs"
	if [ `expr "$country" : '[0-9].*'` -ne 0 ]; then
		iwpriv "$1" setCountryID "$country"
	elif [ -n "$country" ]; then
		iwpriv "$1" setCountry "$country"
	fi
}

config_iwpriv() {
	local b c n v
	for c in $2; do
		b="${c:0:1}" &&	c="${c#\!}" && n="${c%:*}" && c="${c#*:}"
		[ -z "${b#\!}" ] && b="_bool" || b=""
		eval config_get"$b" v "$1" "${n/=/ }"
		[ -n "$v" ] && iwpriv "$1" "${c%=*}" $v
	done
}

config_vap_mode() {
	local cfg cfgs="rts frag pureg puren pure11ac deny11ab chwidth disablecoext vht_11ng"
	local mode="$2" chan="$3" txpower="$4" mode2=""
	for cfg in $cfgs; do config_get "$cfg" "$1" "$cfg";	done
	case "$mode" in
		11ng:HT20) mode=11NGHT20;;
		11ng:HT40-) mode=11NGHT40MINUS; mode2="11NGHT20";;
		11ng:HT40+) mode=11NGHT40PLUS; mode2="11NGHT20";;
		11ng:HT40)
			mode=11NGHT40
			if [ "$chan" -ge "6" ]; then
				mode=11NGHT40MINUS
			fi
			mode2="11NGHT20"
			;;
		11ng:auto) mode=AUTO;;
		11na:HT20) mode=11NAHT20;;
		11na:HT40) mode=11NAHT40; mode2="11NGHT20";;
		11na:auto) mode=AUTO;;
		11ac:HT20) mode=11ACVHT20;;
		11ac:HT40*) mode=11ACVHT40; mode2="11ACVHT20";;
		11ac:HT80) mode=11ACVHT80; mode2="11ACVHT40 11ACVHT20";;
		11ac:auto) mode=AUTO; mode2="11ACVHT80 11ACVHT40 11ACVHT20";;
		11b:*) mode=11B;;
		11bg:*) mode=11G;;
		11g:*) mode=11G;;
		11a:*) mode=11A;;
		*) mode=AUTO;;
	esac
	iwconfig "$1" channel 0
	if [ -n "$mode" -o "$chan" = "0" ]; then
		for m in $mode $mode2; do iwpriv "$1" mode "$m" && break; done
	else
		for m in $mode2; do
			iwpriv "$1" mode "$m" && iwconfig "$1" channel "$chan" && break
		done
	fi
	iwpriv "$1" pureg "$pureg"
	iwpriv "$1" puren "$puren"
	iwpriv "$1" pure11ac "$pure11ac"
	iwpriv "$1" deny11ab "$deny11ab"
	[ -n "$vht_11ng" ] && iwpriv "$1" vht_11ng "$vht_11ng"
	[ -n "$disablecoext" ] && iwpriv "$1" disablecoext "$disablecoext"
	[ -n "$chwidth" ] && iwpriv "$1" chwidth "$chwidth"
	[ -n "$frag" ] && iwconfig "$vif" frag "${frag%%.*}"
	[ -n "$rts" ] && iwconfig "$vif" rts "${rts%%.*}"
	[ -n "$chan" ] && iwconfig "$1" channel "$chan"
	[ -n "$txpower" ] && iwconfig "$1" txpower "$txpower"
}

config_vap_acl() {
	local vif="$1" maclist macfilter
	config_get guest "$vif" guest
	[ "$guest" = "on" ] && return

	config_get maclist "$vif" maclist
	config_get macfilter "$vif" macfilter
	iwpriv "$vif" maccmd 3
	for mac in $maclist; do iwpriv "$vif" addmac "$mac";	done
	case "$macfilter" in
		allow)
			iwpriv "$vif" maccmd 1
			iwpriv "$vif" kickmac "ff:ff:ff:ff:ff:ff"
		;;
		deny|*)
			iwpriv "$vif" maccmd 2
			for mac in $maclist; do
				iwpriv "$vif" kickmac "$mac"
			done
		;;
	esac
}

config_vap_vlan() {
	local vlanid=3 gvlan=2 sysmode=

	config_get sysmode sysmode mode
	for brname in $(cd /sys/class/net && ls -d br-lan* 2>$STDOUT); do break; done
	for port in $(brctl show "$brname" | grep eth | cut -f 6-8); do
		brctl setifvlan "$brname" "$port" "$vlanid" 1
	done
	for dev in $DEVICES; do
		for vif in $(config_get "$dev" vifs); do 
			if [ -d /sys/class/net/$vif ]; then
				local fw_action="block"
				config_get brname "$vif" bridge "br-lan"
				config_get phy_dev "$vif" device
				config_get band "$phy_dev" band
				config_get_bool guest "$vif" guest 0
				config_get_bool access "$vif" access 1
				config_get_bool isolate "$vif" isolate 0
				config_get mode "$vif" mode
				vlanid=3
				[ "$guest" = "1" ] && [ "$sysmode" != "ap" ] && {
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
				}
				[ "$guest" = "1" ] && [ "$sysmode" = "ap" ] && {
					[ "$isolate" = "1" ] && {
						case "$band" in
							2g) vlanid=1 ;;
							5g) vlanid=2 ;;
						esac
					}
					[ "$isolate" = "0" ] && {
						case "$band" in
							2g) vlanid=1 ;;
							5g) vlanid=1 ;;
						esac
					}
				}
				[ "$mode" = "sta" ] && {
					case "$band" in
						2g) vlanid=1 ;;
						5g) vlanid=2 ;;
					esac
				}
				#Workaround sleep 2. For RE mode, access Ponit of ath0 may not set when change setting.
				#For example, change setting from connect network 2.4G and extended network 5G to
				#connect network 2.4G and extended network 2.4G, then extended network 2.4G may not be correct.
				sleep 2
				brctl addif "$brname" "$vif"
				brctl setifvlan "$brname" "$vif" "$vlanid" 1
				#ubus call network.interface.lan add_device "{\"name\":\"$vif\"}"
				[ "$guest" = "1" ] && fw "$fw_action"_rt_access dev "$vif" &
				[ "$1" = "up" ] && config_vap_daemon "$vif"
				[ "$1" = "up" ] && ifconfig "$vif" up
			fi
		done
	done
	[ "$sysmode" = "re" ] && echo 1 >/proc/range_extender_config/range_extender_bridge_deliver_enable
}

destroy_vap() {
	config_get brname "$1" bridge "br-lan"
	brctl setifvlan "$brname" "$1" 0 0
	/usr/sbin/wlanconfig "$1" destroy
	kill_pid "$1"
}

create_vap() {
	local vif="$1" dev="$2" mode="$3"
	local b c v n
	local cfg="!shortgi !disablecoext chwidth !wds TxBFCTL bintval !countryie !uapsd=1 powersave !ant_ps_on ps_timeout \
			mcastenhance metimer metimeout !medropmcast me_adddeny vap_ind extap scanband periodicScan cwmin cwmax aifs \
			txoplimit noackpolicy !wmm !doth !ignore11d doth_chanswitch quiet mfptest noedgech ps_on_time inact wnm ampdu amsdu maxampdu vhtmaxampdu \
			setaddbaoper addbaresp addba delba !stafwd !vht_11ng nss vhtmcs vht_mcsmap chbwmode ldpc rx_stbc tx_stbc cca_thresh set11NRates set11NRetries \
			chanbw maxsta=32 sko_max_xretries:sko extprotmode extprotspac !cwmenable !protmode enablertscts txcorrection rxcorrection \
			tdls set_tdls_rmac tdls_qosnull tdls_uapsd tdls_set_rcpi:set_rcpi tdls_set_rcpi_hi:set_rcpihi tdls_set_rcpi_lo:set_rcpilo \
			tdls_set_rcpi_margin:set_rcpimargin tdls_dtoken do_tdls_dc_req tdls_auto tdls_off_timeout:off_timeout tdls_tdb_timeout:tdb_timeout \
			tdls_weak_timeout:weak_timeout tdls_margin tdls_rssi_ub tdls_rssi_lb tdls_path_sel:tdls_pathSel tdls_rssi_offset:tdls_rssi_o \
			tdls_path_sel_period:tdls_pathSel_p tdlsmacaddr1 tdlsmacaddr2 tdlsaction tdlsoffchan tdlsswitchtime tdlstimeout tdlsecchnoffst tdlsoffchnmode \
			!blockdfschan dbgLVL acsmindwell acsmaxdwell acsreport ch_hop_en ch_long_dur ch_nhop_dur ch_cntwn_dur ch_noise_th ch_cnt_th !scanchevent \
			!send_add_ies !ext_ifu_acs !rrm !rrmslwin !rrmstats rrmdbg acparams setwmmparams !qbssload !proxyarp !l2tif !dgaf_disable setibssdfsparam \
			startibssrssimon setibssrssihyst noIBSSCreate setibssrssiclass offchan_tx_test implicitbf vhtsubfee vhtmubfee vhtsubfer vhtmubfer vhtstscap vhtsounddim \
			encap_type decap_type rawsim_txagr clr_rawsim_stats rawsim_debug dtim_period"
	local sysmode=

	[ -d /sys/class/net/$vif ] || [ "$vif" = "$(/usr/sbin/wlanconfig "$vif" create wlandev "$dev" wlanmode "$mode" nosbeacon)" ] || return 0

	config_get sysmode sysmode mode
	if [ "$sysmode" = "re" ]; then
		channel=0
	else
		config_get channel "$dev" channel 0
	fi
	config_get hwmode "$dev" hwmode auto
	config_get htmode "$dev" htmode auto
	config_get txpower "$dev" txpower

	config_get hw_addr "$dev" macaddr
	hw_addr=${hw_addr//-/:}

	config_get txqueuelen "$vif" txqueuelen 1000
	[ -n "$txqueuelen" ] && ifconfig "$vif" txqueuelen "$txqueuelen"
	config_vap_mode "$vif" "$hwmode:$htmode" "$channel" "$txpower"
	config_iwpriv "$vif" "$cfg"	
	config_get mcast_rate "$vif" mcast_rate
	[ -n "$mcast_rate" ] && iwpriv "$ifname" mcast_rate "${mcast_rate%%.*}"
	[ "$mode" = "ap" ] && config_vap_acl "$vif"
	[ "$mode" = "sta" ] && {
		ifconfig "$vif" down
		ifconfig "$vif" hw ether "$hw_addr"
		ifconfig "$vif" up
	}
}

kill_pid() {
	for f in wifi; do
		if [ ! -f "/var/run/$f-$1.pid" ];then
			return
		fi
		local n=${2:-0} p=$(cat "/var/run/$f-$1.pid" 2>$STDOUT)
		while [ -f "/var/run/$f-$1.pid" ]; do 
			([ -n "$p" ] && kill $p) || (rm -f "/var/run/$f-$1.pid" && break)
			[ "$n" -gt 0 ] || break
			n=$(($n - 1)) && echo "wait for pid $p $n times"
		done
	done
}

config_vap_daemon() {
	local vif=$1 mode= isolate= wps= addr= extap= enc= key= start_hostapd=

	config_get mode "$vif" mode

	#clear encryption
	[ "$mode" = "sta" ] && iwpriv "$vif" setoptie
	for idx in 1 2 3 4; do
		config_get key "$vif" "key${idx}"
		iwconfig "$vif" enc "[$idx]" "${key:-off}"
	done
	iwpriv "$vif" authmode 1
	iwconfig "$vif" enc off
	iwconfig "$vif" key off

	config_get enc "$vif" encryption
        case "$enc" in
        	none)
 	        	[ "$mode" = "ap" ] && {
        	        	local has_wep_key
        	                for idx in 1 2 3 4; do
	                                config_get wep_key "$vif" "wep_key${idx}"
                                        [ -n "$wep_key" ] && has_wep_key="1" && break
                                done
                                [ "$has_wep_key" = "1" ] && {
	                                iwconfig "$vif" key on
                                        iwconfig "$vif" key off
                                }
                        }
                        config_get_bool wps_pbc "$vif" wps_pbc 0
                        config_get config_methods "$vif" wps_config
                        [ "$wps_pbc" -gt 0 ] && append config_methods push_button
                        [ -n "$config_methods" ] && start_hostapd=1
                ;;
                wep*)
	                case "$enc" in
		                *mixed*)  iwpriv "$vif" authmode 4;;
		                *shared*) iwpriv "$vif" authmode 2;;
		                *)        iwpriv "$vif" authmode 1;;
		        esac
                        for idx in 1 2 3 4; do
	                        config_get key "$vif" "key${idx}"
                                iwconfig "$vif" enc "[$idx]" "${key:-off}"
                        done
                        config_get key "$vif" key
                        key="${key:-1}"
                        case "$key" in
	 	               [1234]) iwconfig "$vif" enc "[$key]";;
                               *) iwconfig "$vif" enc "$key";;
                        esac
                ;;
                mixed*|psk*|wpa*|8021x)
                        start_hostapd=2
                ;;
        esac

	case "$mode" in
		ap)
			config_get_bool isolate "$vif" isolate 0
			iwpriv "$vif" ap_bridge "$((isolate^1))"
			if [ -n "$start_hostapd" ]; then
				hostapd_setup_vif "$vif" atheros no_nconfig || {
					echo "Failed to set up hostapd for interface $vif" >&2
					destroy_vap "$vif"
				}
			fi
			config_get_bool wps "$vif" wps 0
			iwpriv "$vif" wps "$wps"
		;;
		sta)
			config_get addr "$vif" bssid "any"
			addr=${addr//-/:}
			config_get extap "$vif" wds_mode 2
			iwpriv "$vif" setparam 12 1 #enable roaming
			iwpriv "$vif" extap "$extap"
			iwpriv "$vif" allmulti 1
			# enable to fellow rootap and keep local wlan alive.
			# TODO:disable it in "CLIENT MODE" to reduce scan time.
			iwpriv "$vif" athnewind "0"
			iwpriv "$vif" vap_ind "1"
			iwconfig "$vif" ap "$addr"
			#/*
			# * For RE button feature, wpa_supplicant should always starts and waits for RE button pushed.
			# * By Eddie Ho, 26Mar16
			# */
			#if [ "$start_hostapd" = "2" ]; then
				wpa_supplicant_setup_vif "$vif" athr || {
					echo "Failed to set up wpa_supplicant for interface $vif" >&2
					destroy_vap "$vif"
					return
				}
			#fi
		;;
	esac
}

config_vap() {

        if eval "type wifi_fixup_config" 2>/dev/null >/dev/null; then
                        wifi_fixup_config "${DEVICES}"
        fi

	local vif="$1" action="$2" hasvif= sysmode= guest=

	config_get sysmode sysmode mode
	config_get mode "$vif" mode
	config_get guest "$vif" guest
	[ "$sysmode" != "re" -a "$mode" = "sta" ] && return
	[ "$sysmode" = "re" -a "$guest" = "on" ] && return

	[ -z "$vif" ] && return
	#kill_pid $vif
	config_get phy "$vif" device
	config_get_bool disabled "$vif" disabled 0
	[ -z "$mode" -o -z "phy" ] && return
	[ -d /sys/class/net/$vif ] && hasvif="1"
	[ "$disabled" = "1" ] && {
		[ -n "$hasvif" ] && destroy_vap "$vif"
		return
	}

	[ -z "$hasvif" -o "$action" = "reload" ] && create_vap "$vif" "$phy" "$mode"
	[ -n "$hasvif" -a "$action" = "update" ] &&  {
		config_get rts "$vif" rts 2346
		config_get frag "$vif" frag 2346
		config_get_bool wmm "$vif" wmm 1
		config_get_bool shortgi "$vif" shortgi 1
		iwpriv "$vif" wmm "$wmm"
		iwpriv "$vif" shortgi "$shortgi"
		[ "$mode" = "ap" ] && {
			config_get bintval "$vif" bintval 100
			config_get dtim_period "$vif" dtim_period 1
			iwpriv "$vif" dtim_period "$dtim_period"
			iwpriv "$vif" bintval "$bintval"
		}
		[ -n "$frag" ] && iwconfig "$vif" frag "${frag%%.*}"
		[ -n "$rts" ] && iwconfig "$vif" rts "${rts%%.*}"
	}

	config_get ssid "$vif" ssid
	if [ -n "$ssid" ]; then
		iwconfig "$vif" essid on
		iwconfig "$vif" essid ${ssid:+-- }"$ssid"
	else
		iwconfig "$vif" essid off
	fi

	config_get_bool hidden "$vif" hidden 0
	iwpriv "$vif" hide_ssid "$hidden"

	#kill_pid $vif 100

	#config_vap_daemon "$vif"
}

wifi_mode() {
	local dev vif
	local sysmode=
	config_get sysmode sysmode mode
	for dev in ${1:-$DEVICES}; do
		local vifs=""
		for vif in $(config_get "$dev" vifs); do 
			[ -d /sys/class/net/$vif ] && append vifs "$vif" &>$STDOUT
		done;
		for vif in $(config_get "$dev" vifs); do
			[ -d /sys/class/net/$vif ] && ifconfig "$vif" down &>$STDOUT
		done;
		for vif in $(config_get "$dev" vifs); do
			[ -d /sys/class/net/$vif ] && kill_pid "$vif" &>$STDOUT
		done;
		config_get_bool disabled "$dev" disabled 0
		config_get_bool disabled_all "$dev" disabled_all 0
		if [ "$disabled" = "1" ] || [ "$disabled_all" = "1" ]; then
			for vif in $vifs; do destroy_vap "$vif" &>$STDOUT; done
			continue
		fi
		config_get hwmode "$dev" hwmode auto
		config_get htmode "$dev" htmode auto
		if [ "$sysmode" = "re" ]; then
			channel=0
		else
			config_get channel "$dev" channel 0
		fi
		config_get txpower "$dev" txpower
		[ -n "$2" -o "$1" = "country" ] && config_country "$dev" &>$STDOUT
		for vif in $vifs; do config_vap_mode "$vif" "$hwmode:$htmode" "$channel" "$txpower" &>$STDOUT; done
	done;
	config_vap_vlan up &>$STDOUT
	[ -n "$2" -o "$1" = "country" ] && wifi_updown "disable" &>$STDOUT
	[ -n "$2" -o "$1" = "country" ] && wifi_detect &>$STDOUT
	[ -n "$2" -o "$1" = "country" ] && wifi_reload &>$STDOUT
}

wifi_vap() {
	local device vifs disabled dev_disabled dev_disabled_all sysmode=
	config_get sysmode sysmode mode
	for vap in $1; do
		config_get device "$vap" device
		config_get vifs "$device" vifs
		config_get_bool disabled "$vap" disabled
		config_get dev_disabled "$device" disabled
		config_get dev_disabled_all "$device" disabled_all
		if [ "$dev_disabled" = "on" ] || [ "$sysmode" != "re" -a  "$dev_disabled_all" = "on" ]; then
			continue
		fi
		[ "$disabled" = "1" -a ! -d /sys/class/net/$vap ] && continue
		for vif in $vifs; do ifconfig "$vif" down &>$STDOUT; done
		for vif in $vifs; do kill_pid "$vif" &>$STDOUT; done
		config_vap "$vap" &>$STDOUT
	done
	config_vap_vlan up &>$STDOUT
}

wifi_wps_switch() {
	ledcli WPS_OFF
	local device vifs disabled dev_disabled dev_disabled_all
	for vap in $1; do
		config_get device "$vap" device
		config_get vifs "$device" vifs
		config_get_bool disabled "$vap" disabled
		config_get dev_disabled "$device" disabled
		config_get dev_disabled_all "$device" disabled_all
		if [ "$dev_disabled" = "on" ] || [ "$dev_disabled_all" = "on" ]; then
			continue
		fi
		[ "$disabled" = "1" -a ! -d /sys/class/net/$vap ] && continue
		for vif in $vifs; do ifconfig "$vif" down &>$STDOUT; done
		for vif in $vifs; do kill_pid "$vif" &>$STDOUT; done
		config_vap "$vap" &>$STDOUT
	done
	config_vap_vlan up &>$STDOUT

	wifi_guest_passwd_set
}

wifi_country() {
	wifi_mode "${1:-$DEVICES}" "country" &>$STDOUT
}

disable_ldpc_ap_mode() {
	local iface=$1
	local device=$2

	[ $(config_get $iface device) == "$device" ] && [ $(config_get $iface mode) == "ap" ] && {
		# disable ldpc
		iwpriv $iface ldpc 0
	}
}

#
# Function name	: disable_ldpc_5g
# Author	: Brandon Lin
# Parameters	:
#    1: name of wifi-device in /etc/config/wireless
#
disable_ldpc_5g() {
	local device=$1
	local band
	local target_band="5g"

	# get band (eg: 5g)
	config_get band "$device" band

	if [ "$band" == "$target_band" ]; then
		# iterate all "config wifi-iface"
		config_foreach disable_ldpc_ap_mode wifi-iface "$device"
	fi
}

#
# Function Name : config_HP
# Description   : Determine ctldisable and ctlpwscale value by /etc/region_hp.config
# Author        : Edgar Liu
# Parameters
#   1: country
#   2: current power level
#   3: device
#
config_HP() {
    get_Region_Limit "$1"
    local hp_ctlpwscale=0
    local hp_ctldisable=0
 
    echo "config_HP : $1 $2 $3" > /dev/console
    echo "config_HP : tp_high_ctldisable=${tp_high_ctldisable}" > /dev/console
    echo "config_HP : tp_default_ctldisable=${tp_default_ctldisable}" > /dev/console
    echo "config_HP : tp_default_powerlvl=${tp_default_powerlvl}" > /dev/console
       
    case $2 in
    "low")
        if [ "${tp_high_ctldisable}" == "1" ]; then
            hp_ctlpwscale=1
            hp_ctldisable=0
        else
            hp_ctlpwscale=2
            hp_ctldisable=0
        fi
        ;;
    "middle")
        if [ "${tp_high_ctldisable}" == "1" ]; then
            echo "middle, 1" > /dev/console
            hp_ctlpwscale=0
            hp_ctldisable=0
        else
            echo "middle, not 1" > /dev/console
            hp_ctlpwscale=1
            hp_ctldisable=0
        fi
        ;;
    "high")
        if [ "${tp_high_ctldisable}" == "1" ]; then
            hp_ctlpwscale=0
            hp_ctldisable=1
        else
            hp_ctlpwscale=0
            hp_ctldisable=0
        fi
        ;;
    esac

    echo "hp_ctlpwscale=${hp_ctlpwscale}, hp_ctldisable=${hp_ctldisable}" > /dev/console
    iwpriv "$3" ctlpwscale "${hp_ctlpwscale}"
    iwpriv "$3" ctldisable "${hp_ctldisable}"

    echo "disable ldpc of 5g" > /dev/console
    config_foreach disable_ldpc_5g wifi-device

    config_HP_QCA9886_patch $hp_ctldisable $hp_ctlpwscale
}

# Function Name : config_HP_QCA9886_patch
# Description   : Replace boarddata
# Author        : Brandon Lin
# Parameters
#   1: ctldisable
#   2: ctlpwscale
#
config_HP_QCA9886_patch() {
	local hp_ctldisable=$1
	local hp_ctlpwscale=$2
	
	# define file name of board data
	local prefix="/lib/firmware/QCA9888/hw.2"
	
	local boarddata="boardData_2_0_QCA9888_5G_Y9690.bin"
	local boarddata_default="boardData_2_0_QCA9888_5G_Y9690_final.bin"
	local boarddata_30dB="boardData_2_0_QCA9888_5G_Y9690_30dBm.bin"
	local boarddata_3dB="boardData_2_0_QCA9888_5G_Y9690_-3dB.bin"
	local boarddata_6dB="boardData_2_0_QCA9888_5G_Y9690_-6dB.bin"
	
	local new_boarddata=$boarddata_default
	
	if [ $hp_ctldisable -eq "1" ]; then
		new_boarddata=$boarddata_30dB
	elif [ $hp_ctlpwscale -eq "0" ]; then
		new_boarddata=$boarddata_default
	elif [ $hp_ctlpwscale -eq "1" ]; then
		new_boarddata=$boarddata_3dB
	elif [ $hp_ctlpwscale -eq "2" ]; then
		new_boarddata=$boarddata_6dB
	fi
	
	# make a new soft link
	if [ ! -f "$prefix/$new_boarddata" ]; then
		echo "Error: board data: $prefix/$new_boarddata does not exist" > /dev/console
	else
		echo "replace board data" > /dev/console
		rm "$prefix/$boarddata"
		ln -sf "$prefix/$new_boarddata" "$prefix/$boarddata"
	fi
}

wifi_pre_init() {
	local dev 

	for dev in ${1:-$DEVICES}; do
		config_get country "$dev" country US 
		config_get txpower "$dev" txpower
		echo "country=$country, txpower=$txpower"
		config_HP "${country}" "${txpower}" "${dev}"
	done
}

wifi_radio() {
	local dev action="update" sysmode=

	config_get sysmode sysmode mode

	[ -n "$2" ] && action="reload"
	for dev in ${1:-$DEVICES}; do
		echo "wifi_radio : dev = ${dev}" > /dev/console
		local max_sta
		config_get vifs "$dev" vifs
		config_get band "$dev" band
		config_get_bool disabled "$dev" disabled 0
		config_get_bool disabled_all "$dev" disabled_all 0
		#
		# Added by Edgar Liu :
		#   ${dev} will be changed after config_vap function, backup dev value
		#
		local ldev=${dev}

		for vif in $vifs; do ifconfig "$vif" down &>$STDOUT; done
		for vif in $vifs; do kill_pid "$vif" &>$STDOUT; done
		
		if [ "$disabled" = "1" ] || [ "$sysmode" != "re" -a "$disabled_all" = "1" ] || [ "$(wireless_schedule_disable_wifi $band)" = "0" ]; then
			for vif in $vifs; do [ -d /sys/class/net/$vif ] && destroy_vap "$vif" &>$STDOUT; done
			continue
		fi
		[ "$action" = "reload" ] && {
			config_get macaddr "$dev" macaddr
			[ -n "$macaddr" ] && iwpriv "$dev" setHwaddr "${macaddr//-/:}" &>$STDOUT
			[ `/usr/sbin/iwpriv "$dev" getRegdomain 2>$STDOUT|cut -d: -f2` = "0" ] || iwpriv "$dev" setRegdomain 0 &>$STDOUT
			config_country "$dev" &>$STDOUT
			config_iwpriv "$dev" "$2" &>$STDOUT
			[ "$band" = "2g" -o "$band" = "5g" ] && {
				max_sta=$(uci get profile.@wireless[0].max_sta_number_$band -c /etc/profile.d)
			}
			[ -n "$max_sta" ] && iwpriv "$dev" max_sta "$max_sta" &>$STDOUT
		}
			
		for vif in $vifs; do config_vap "$vif" "$action" &>$STDOUT;	done
		
		#
		# Added by Edgar Liu :
		# config ctlpwscale and ctldisable by current country and current txpower level
		#
	    sleep 1
	    config_HP "${country}" "${txpower}" "${ldev}"
	done
	config_vap_vlan up &>$STDOUT
}

wifi_reload() {
	[ -d /sys/class/net/wifi0 ] || load_qcawifi
	ledcli WPS_OFF
	wifi_radio "$1" "txchainmask rxchainmask AMPDU ampdudensity !AMSDU AMPDULim AMPDUFrames AMPDURxBsize !bcnburst:set_bcnburst=0 \
		set_smart_antenna:setSmartAntenna current_ant default_ant ant_retrain retrain_interval retrain_drop ant_train ant_trainmode \
		ant_traintype ant_pktlen ant_numpkts ant_numitr ant_train_thres:train_threshold ant_train_min_thres:train_threshold \
		ant_traffic_timer:traffic_timer dcs_enable dcs_coch_int:set_dcs_coch_int dcs_errth:set_dcs_errth dcs_phyerrth:set_dcs_phyerrth \
		dcs_usermaxc:set_dcs_usermaxc dcs_debug:set_dcs_debug set_ch_144:setCH144 !ani_enable !acs_bkscanen acs_scanintvl acs_rssivar \
		acs_chloadvar acs_lmtobss acs_ctrlflags acs_dbgtrace !dscp_ovride:set_dscp_ovride reset_dscp_map dscp_tid_map:set_dscp_tid_map \
		!igmp_dscp_ovride:sIgmpDscpOvrid igmp_dscp_tid_map:sIgmpDscpTidMap !hmmc_dscp_ovride:sHmmcDscpOvrid hmmc_dscp_tid_map:sHmmcDscpTidMap \
		!blk_report_fld:setBlkReportFld !drop_sta_query:setDropSTAQuery burst=1 burst_dur=350 TXPowLim2G TXPowLim5G !enable_ol_stats \
		!rst_tso_stats !rst_lro_stats !rst_sg_stats !set_fw_recovery !allowpromisc set_sa_param !aldstats \
		!led_enable promisc block_interbss aggr_burst set_pmf txbf_snd_int=100 mcast_echo obss_rssi_th obss_rx_rssi_th" \
		&>$STDOUT
	if [ -f "/lib/update_smp_affinity.sh" ]; then
		. /lib/update_smp_affinity.sh
		config_foreach enable_smp_affinity_wifi wifi-device
	fi

	ledflag_2g=`ls /sys/class/net/ | grep ath0`
	ledflag_5g=`ls /sys/class/net/ | grep ath1`
	if [ -d /sys/class/net/wifi0 -a -n "${ledflag_2g}" ]; then
		ledcli WIFI2G_ON
	else
		ledcli WIFI2G_OFF
	fi
	if [ -d /sys/class/net/wifi1 -a -n "${ledflag_5g}" ]; then
		ledcli WIFI5G_ON
	else
		ledcli WIFI5G_OFF
	fi
}

wifi_macfilter() {
	case $1 in
	add|del)
		config_get_bool enable filter enable
		[ "$enable" = "1" ] && for dev in $DEVICES; do
			config_get vifs "$dev" vifs
			for vif in $vifs; do 
				[ -d /sys/class/net/$vif ] && iwpriv "$vif" "$1"mac "${2//-/:}" && iwpriv "$vif" kickmac "${2//-/:}";
			done
		done
	;;
	kickall)
		for dev in $DEVICES; do
			config_get vifs "$dev" vifs
			for vif in $vifs; do
				[ -d /sys/class/net/$vif -a "$(config_get $vif mode)" = "ap" ] && iwpriv "$vif" kickmac "ff:ff:ff:ff:ff:ff";
			done
		done
	;;
	*)
		for dev in $DEVICES; do
			local vaps=""
			config_get vifs "$dev" vifs
			for vif in $vifs; do 
				[ -d /sys/class/net/$vif -a "$(config_get $vif mode)" = "ap" ] && config_vap_acl "$vif" &>$STDOUT;
			done
		done
	;;
	esac
}

wifi_wps() {
	local wps_cmd dev phy wps vif="$1"
	config_get_bool wps "$vif" wps 0
	config_get timeout "$vif" wps_timeout 120
	config_get dev "$vif" device
	config_get phy "$dev" phy

	wps_cmd="/usr/sbin/hostapd_cli -p /var/run/hostapd-$phy -i $vif"

	if [ "$wps" = "1" -a -e "/var/run/hostapd-$phy/$vif" ]; then
		case $2 in
		ap_pin)
			if [ "$3" = "disable" ]; then
				$wps_cmd wps_ap_pin disable
			elif [ "$($wps_cmd wps_check_pin $3)" = "$3" ]; then
				$wps_cmd wps_ap_pin set "$3" 0
			else
				echo "FAIL"
			fi;;
		pin)
			if [ "$($wps_cmd wps_check_pin $3)" = "$3" ]; then
				$wps_cmd wps_pin any "$3" "$timeout"
			else
				echo "PIN Status: Invalid"
			fi;;
		pbc)
			$wps_cmd wps_pbc
			status=`$wps_cmd wps_get_status | grep Overlap`
			if [ -n "${status}" ]; then
				ledcli WPS_TP_OVERLAP
			fi;;
		status)	$wps_cmd wps_get_status;;
		cancel)	$wps_cmd wps_cancel;;
		config)	$wps_cmd get_config;;
		pin_lock)	$wps_cmd pin_lock_status;;
		*)	shift 1;$wps_cmd $*;;
		esac
		echo ""
	fi
}

wifi_vlan() {
	config_vap_vlan &>$STDOUT
}

wifi_led() {
    for dev in ${1:-$DEVICES}; do
        config_get_bool led_en "$dev" "led_enable"
        iwpriv $dev led_enable $led_en 
    done
}

wifi_default() {
	local idx=0
	cd /sys/class/net/
	[ -d wifi0 ] || load_qcawifi
	for dev in $(ls -d wifi* 2>$STDOUT); do
		case "$(cat ${dev}/hwcaps)" in
			*11bgn) mode_11=bgn;band="2g";;
			*11abgn) mode_11=bgn;band="2g";;
			*11an) mode_11=an_5;band="5g";;
			*11an/ac) mode_11=anac_5;band="5g";;
			*11abgn/ac) mode_11=anac_5;band="5g";;
		esac
		[ "$(config_get wifi${idx} type)" = "qcawifi" ] || cat <<EOF
config wifi-device 'wifi${idx}'
	option type 'qcawifi'
	option phy 'wifi${idx}'
	option band '${band}'
	option macaddr '$(cat /sys/class/net/${dev}/address)'
	option country 'US'
	option hwmode '${mode_11}'
	option htmode 'auto'
	option channel 'auto'
	option txpower 'high'
	option beacon_int '100'
	option rts '2346'
	option frag '2346'
	option wpa_group_rekey '0'
	option dtim_period '1'
	option wmm 'on'
	option shortgi 'on'
	option isolate 'off'
	option disabled 'off'
	option disabled_all 'off'

EOF

		[ "$(config_get ath${idx} device)" = "wifi${idx}" ] || cat <<EOF
config wifi-iface 'ath${idx}'
	option ifname 'ath${idx}'
	option device 'wifi${idx}'
	option mode 'ap'
	option wds 'on'
	option wps 'on'
	option wps_pbc 'on'
	option wps_state '1'
	option wps_label 'on'
	option wps_pin '12345670'
	option wps_timeout '120'
	option enable 'off'
	option hidden 'off'
	option ssid 'TP-LINK_HOME_${band//g/G}'
	option encryption 'none'
	option wep_mode 'auto'
	option wep_select '1'
	option wep_format1 'asic'
	option wep_type1 '64'
	option wep_key1 ''
	option wep_format2 'asic'
	option wep_type2 '64'
	option wep_key2 ''
	option wep_format3 'asic'
	option wep_type3 '64'
	option wep_key3 ''
	option wep_format4 'asic'
	option wep_type4 '64'
	option wep_key4 ''
	option psk_key ''
	option psk_version 'auto'
	option psk_cipher 'auto'
	option server ''
	option port '1812'
	option wpa_key ''
	option wpa_version 'auto'
	option wpa_cipher 'auto'

EOF

		[ "$(config_get ath${idx}1 device)" = "wifi${idx}" ] || cat <<EOF
config wifi-iface 'ath${idx}1'
	option ifname 'ath${idx}1'
	option device 'wifi${idx}'
	option mode 'ap'
	option wds 'on'
	option guest 'on'
	option enable 'off'
	option hidden 'off'
	option ssid 'TP-LINK_GUEST_${band//g/G}'
	option encryption 'none'
	option psk_key ''
	option psk_version 'auto'
	option psk_cipher 'auto'
	option isolate 'on'
	option access 'off'

EOF

		[ "$(config_get ath${idx}2 device)" = "wifi${idx}" ] || cat <<EOF
config wifi-iface 'ath${idx}2'
	option ifname 'ath${idx}2'
	option device 'wifi${idx}'
	option mode 'sta'
	option wds 'on'
	option wds_mode '2'
	option enable 'off'
	option ssid ''
	option bssid ''
	option encryption 'none'
	option psk_key ''
	option psk_version 'auto'
	option psk_cipher 'auto'
	option wep_mode 'auto'
	option wep_select '1'
	option wep_format1 'asic'
	option wep_type1 '64'
	option wep_key1 ''
	option wep_format2 'asic'
	option wep_type2 '64'
	option wep_key2 ''
	option wep_format3 'asic'
	option wep_type3 '64'
	option wep_key3 ''
	option wep_format4 'asic'
	option wep_type4 '64'
	option wep_key4 ''

EOF
	idx=$(($idx + 1))
	done

	[ "$(config_get filter action)" != "" ] || cat <<EOF
config mac-filter 'filter'
	option enable 'off'
	option action 'deny'

EOF

	[ "$(config_get wps model_name)" != "" ] || cat <<EOF
config wps-device 'wps'
	option wps_uuid '87654321-9abc-def0-1234'
	option wps_device_type '6-0050F204-1'
	option wps_device_name 'TL-AC1900'
	option wps_manufacturer 'TP-LINK Technologies Co., Ltd.'
	option wps_manufacturer_url 'www.tp-link.com'
	option model_name 'TL-AC1900'
	option model_number '1.0'
	option model_url 'http://192.168.1.1:80/'
	option serial_number 'ac1900'
	option os_version '1.0'

EOF
}
