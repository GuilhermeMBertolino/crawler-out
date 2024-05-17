#!/bin/sh

sysnet=/sys/class/net

update_cfg_remove() {
	if [ $2 = dumtxvap$1 ]; then
		update_cfg_cmd=$(sed -i "/$3=/d" /usr/etc/wpa3-dumtxvap$1.cfg)
	else
		update_cfg_cmd=$(sed -i "/$3=/d" /etc/hostapd/$2.cfg)
	fi
	eval $update_ini_cmd
	sync
}

update_cfg_file() {
	if [ $2 = dumtxvap$1 ]; then
		update_cfg_cmd=$(sed -i "/$3=/d" /usr/etc/wpa3-dumtxvap$1.cfg && echo "$3=$4" >> /usr/etc/wpa3-dumtxvap$1.cfg)
	else
		update_cfg_cmd=$(sed -i "/$3=/d" /etc/hostapd/$2.cfg && echo "$3=$4" >> /etc/hostapd/$2.cfg)
	fi
	eval $update_ini_cmd
	sync
}

update_hostap_config() {
	# check band channel first
	for wifi in `ls ${sysnet} | grep -E ^wifi` ; do
		local is_2g=$(cat /sys/class/net/$wifi/2g_maxchwidth 2> /dev/null | wc -w)
		local is_5g=$(cat /sys/class/net/$wifi/5g_maxchwidth 2> /dev/null | wc -w)
		local is_6g=$(cat /sys/class/net/$wifi/6g_maxchwidth 2> /dev/null | wc -w)
		local vaps=$(cat /var/run/${wifi}_devnames)
		[ $is_2g = 1 -a $is_5g = 1 -a $is_6g = 1 ] && continue
		if [ $is_2g = 0 -a $is_6g = 1 ]; then
			vaps=${vaps:+${vaps} }$(cat /var/run/dummy_mbssid_vaps)
		fi

		for ath in $vaps; do
			local ht_capab=$(cat /sys/class/net/$ath/cfg80211_htcaps)
			local vht_capab=$(cat /sys/class/net/$ath/cfg80211_vhtcaps)
			local channel=$(cat /var/run/$wifi.ch)
			local bw=$(cat /var/run/$wifi.bw)
			local band=$(cat /var/run/$wifi.band)
			local idx=$channel
			local puncture_bitmap=0xffff
			local usage=$(cat /var/run/vapusage.$ath)
			[ $usage = uplink ] && continue
			if [ $is_2g = 1 ]; then
				if [ $channel = 0 ]; then
					channel=6
				fi
				if [ $bw = 20 ]; then
					ht_capab=${ht_capab:+${ht_capab}"[HT20][SHORT-GI-20]"}
				else
					case "$channel" in
						1|2|3|4|5|6|7)
							ht_capab=${ht_capab:+${ht_capab}"[HT40+][SHORT-GI-40]"}
							;;
						8|9|10|11|12|13)
							ht_capab=${ht_capab:+${ht_capab}"[HT40-][SHORT-GI-40]"}
							;;
						0)
							ht_capab=${ht_capab:+${ht_capab}"[HT40+][HT40-][SHORT-GI-40]"}
							;;
					esac
				fi
				append ht_capab "$N"
				update_cfg_file $wifi $ath ht_capab $ht_capab
				update_cfg_file $wifi $ath vht_capab $vht_capab
				update_cfg_file $wifi $ath ieee80211n 1
				update_cfg_file $wifi $ath ieee80211ac 1
				update_cfg_file $wifi $ath ieee80211ax 1
				update_cfg_file $wifi $ath ieee80211be 1
				update_cfg_file $wifi $ath channel $channel
			else
				# Remove current oper_chwidth
				update_cfg_remove $wifi $ath vht_oper_chwidth
				update_cfg_remove $wifi $ath he_oper_chwidth
				update_cfg_remove $wifi $ath eht_oper_chwidth
				# Remove current oper_centr_freq_seg0_idx
				update_cfg_remove $wifi $ath vht_oper_centr_freq_seg0_idx
				update_cfg_remove $wifi $ath he_oper_centr_freq_seg0_idx
				update_cfg_remove $wifi $ath eht_oper_centr_freq_seg0_idx
				if [ $is_5g = 1 -o $is_6g = 1 ]; then
					if [ $channel = 0 ]; then
						if [ $band = 3 ]; then
							channel=37
						else
							if [ $bw = 320 -o $bw = 240 ]; then
								channel=100
								[ $bw = 240 ] && puncture_bitmap=0xf000
							else
								channel=36
							fi
						fi
					fi
					if [ $bw = 20 ]; then
						ht_capab=${ht_capab:+${ht_capab}"[HT20][SHORT-GI-20]"}
						update_cfg_file $wifi $ath eht_oper_chwidth 0
						update_cfg_file $wifi $ath eht_oper_centr_freq_seg0_idx $idx
						if [ $band = 3 ]; then
							if [ "$channel" -eq 2 ]; then
								update_cfg_file $wifi $ath op_class 136
							else
								update_cfg_file $wifi $ath op_class 131
							fi
						fi
					else
						case "$channel" in
							36|44|52|60|100|108|116|124|132|140|149|157|165|173)
								ht_capab=${ht_capab:+${ht_capab}"[HT40+][SHORT-GI-40]"}
								;;
							40|48|56|64|104|112|120|128|136|144|153|161|169|177)
								ht_capab=${ht_capab:+${ht_capab}"[HT40-][SHORT-GI-40]"}
								;;
							0)
								ht_capab=${ht_capab:+${ht_capab}"[HT40+][HT40-][SHORT-GI-40]"}
								;;
						esac
						case "$bw" in
							40)
								case "$(( ($channel / 4) % 2 ))" in
									0) idx=$(($channel - 2));;
									1) idx=$(($channel + 2));;
								esac
								if [ $band = 3 ]; then
									update_cfg_file $wifi $ath op_class 132
								fi
								update_cfg_file $wifi $ath eht_oper_chwidth 0
								update_cfg_file $wifi $ath eht_oper_centr_freq_seg0_idx $idx
								update_cfg_file $wifi $ath puncture_bitmap $puncture_bitmap
								;;
							80)
								if [ $band = 3 ]; then
									case "$(( ($channel / 4) % 4 ))" in
										1) idx=$(($channel + 2));;
										2) idx=$(($channel - 2));;
										3) idx=$(($channel - 6));;
										0) idx=$(($channel + 6));;
									esac
									update_cfg_file $wifi $ath op_class 133
								else
									case "$(( ($channel / 4) % 4 ))" in
										1) idx=$(($channel + 6));;
										2) idx=$(($channel + 2));;
										3) idx=$(($channel - 2));;
										0) idx=$(($channel - 6));;
									esac
								fi
								update_cfg_file $wifi $ath eht_oper_chwidth 1
								update_cfg_file $wifi $ath eht_oper_centr_freq_seg0_idx $idx
								update_cfg_file $wifi $ath puncture_bitmap $puncture_bitmap
								;;
							160)
								if [ $band != 3 ]; then
									case "$channel" in
										36|40|44|48|52|56|60|64) idx=50;;
										100|104|108|112|116|120|124|128) idx=114;;
										149|153|157|161|165|169|173|177) idx=163;;
									esac
									update_cfg_file $wifi $ath eht_oper_chwidth 2
									case "$channel" in
										132|136|140|144)
											case "$(( ($channel / 4) % 4 ))" in
												0) idx=$(($channel - 6));;
												1) idx=$(($channel + 6));;
												2) idx=$(($channel + 2));;
												3) idx=$(($channel - 2));;
											esac
										update_cfg_file $wifi $ath eht_oper_chwidth 1
										;;
									esac
								else
									update_cfg_file $wifi $ath op_class 134
									case "$channel" in
										1|5|9|13|17|21|25|29) idx=15;;
										33|37|41|45|49|53|57|61) idx=47;;
										65|69|73|77|81|85|89|93) idx=79;;
										97|101|105|109|113|117|121|125) idx=111;;
										129|133|137|141|145|149|153|157) idx=143;;
										161|165|169|173|177|181|185|189) idx=175;;
										193|197|201|205|209|213|217|221) idx=207;;
									esac
									update_cfg_file $wifi $ath eht_oper_chwidth 2
								fi
								update_cfg_file $wifi $ath eht_oper_centr_freq_seg0_idx $idx
								update_cfg_file $wifi $ath puncture_bitmap $puncture_bitmap
								;;
							240|320)
								if [ $band != 3 ]; then
									case "$channel" in
										36|40|44|48|52|56|60|64) idx=50;;
										100|104|108|112|116|120|124|128) idx=114;;
										149|153|157|161|165|169|173|177) idx=163;;
									esac
									update_cfg_file $wifi $ath eht_oper_chwidth 2
									case "$channel" in
										132|136|140|144)
											case "$(( ($channel / 4) % 4 ))" in
												0) idx=$(($channel - 6));;
												1) idx=$(($channel + 6));;
												2) idx=$(($channel + 2));;
												3) idx=$(($channel - 2));;
											esac
										update_cfg_file $wifi $ath eht_oper_chwidth 1
										;;
									esac
								else
									update_cfg_file $wifi $ath op_class 137
									case "$channel" in
										1|5|9|13|17|21|25|29) idx=31;;
										33|37|41|45|49|53|57|61) idx=31;;
										65|69|73|77|81|85|89|93) idx=63;;
										97|101|105|109|113|117|121|125) idx=95;;
										129|133|137|141|145|149|153|157) idx=127;;
										161|165|169|173|177|181|185|189) idx=159;;
										193|197|201|205|209|213|217|221) idx=191;;
									esac
									update_cfg_file $wifi $ath eht_oper_chwidth 4
								fi
								update_cfg_file $wifi $ath eht_oper_centr_freq_seg0_idx $idx
								update_cfg_file $wifi $ath puncture_bitmap $puncture_bitmap
								;;
						esac
					fi
					append ht_capab "$N"
					update_cfg_file $wifi $ath ht_capab $ht_capab
					update_cfg_file $wifi $ath vht_capab $vht_capab
					update_cfg_file $wifi $ath ieee80211n 1
					update_cfg_file $wifi $ath ieee80211ac 1
					update_cfg_file $wifi $ath ieee80211ax 1
					update_cfg_file $wifi $ath ieee80211be 1
					update_cfg_file $wifi $ath channel $channel
				fi
			fi
		done
	done
}

mesh_hostapd_reconfig() {
	local wifi=$1
	local ath=$2
	local wds_ch=$(cat /var/run/wds_ch)
	local wds_bw=$(cat /var/run/wds_bw)
	local wds_mode=$(cat /var/run/wds_mode)
	local idx=$wds_ch
	local oper_chwidth="eht_oper_chwidth"
	local oper_centr_freq_seg0_idx="eht_oper_centr_freq_seg0_idx"
	# Remove current oper_chwidth
	update_cfg_remove $wifi $ath vht_oper_chwidth
	update_cfg_remove $wifi $ath he_oper_chwidth
	update_cfg_remove $wifi $ath eht_oper_chwidth
	# Remove current oper_centr_freq_seg0_idx
	update_cfg_remove $wifi $ath vht_oper_centr_freq_seg0_idx
	update_cfg_remove $wifi $ath he_oper_centr_freq_seg0_idx
	update_cfg_remove $wifi $ath eht_oper_centr_freq_seg0_idx
	# Channel update
	update_cfg_file $wifi $ath channel $wds_ch
	case "$wds_mode" in
		# 11AC VHT mode
		15|16|17|18|19|20|21)
			oper_chwidth="vht_oper_chwidth"
			oper_centr_freq_seg0_idx="vht_oper_centr_freq_seg0_idx"
			;;
		# 11AX HE mode
		22|23|24|25|26|27|28|29|30|31|32)
			oper_chwidth="he_oper_chwidth"
			oper_centr_freq_seg0_idx="he_oper_centr_freq_seg0_idx"
			;;
		# 11BE EHT mode
		33|34|35|36|37|38|39|40|41|42|43)
			oper_chwidth="eht_oper_chwidth"
			oper_centr_freq_seg0_idx="eht_oper_centr_freq_seg0_idx"
			;;
	esac

	case "$wds_bw" in
		0)
			update_cfg_file $wifi $ath $oper_chwidth 0
			update_cfg_file $wifi $ath $oper_centr_freq_seg0_idx $idx
			;;
		1)
			case "$(( ($wds_ch / 4) % 2 ))" in
				0) idx=$(($wds_ch - 2));;
				1) idx=$(($wds_ch + 2));;
			esac
			update_cfg_file $wifi $ath $oper_chwidth 0
			update_cfg_file $wifi $ath $oper_centr_freq_seg0_idx $idx
			;;
		2)
			case "$(( ($wds_ch / 4) % 4 ))" in
				1) idx=$(($wds_ch + 6));;
				2) idx=$(($wds_ch + 2));;
				3) idx=$(($wds_ch - 2));;
				0) idx=$(($wds_ch - 6));;
			esac
			update_cfg_file $wifi $ath $oper_chwidth 1
			update_cfg_file $wifi $ath $oper_centr_freq_seg0_idx $idx
			;;
		3|4)
			case "$wds_ch" in
				36|40|44|48|52|56|60|64) idx=50;;
				100|104|108|112|116|120|124|128) idx=114;;
				149|153|157|161|165|169|173|177) idx=163;;
			esac
			update_cfg_file $wifi $ath $oper_chwidth 2
			case "$wds_ch" in
				132|136|140|144)
					case "$(( ($wds_ch / 4) % 4 ))" in
						0) idx=$(($wds_ch - 6));;
						1) idx=$(($wds_ch + 6));;
						2) idx=$(($wds_ch + 2));;
						3) idx=$(($wds_ch - 2));;
					esac
				update_cfg_file $wifi $ath $oper_chwidth 1
				;;
			esac
			update_cfg_file $wifi $ath $oper_centr_freq_seg0_idx $idx
			;;
		5)
			case "$wds_ch" in
				36|40|44|48|52|56|60|64) idx=50;;
				100|104|108|112|116|120|124|128) idx=114;;
				149|153|157|161|165|169|173|177) idx=163;;
			esac
			update_cfg_file $wifi $ath $oper_chwidth 2
			case "$wds_ch" in
				132|136|140|144)
					case "$(( ($wds_ch / 4) % 4 ))" in
						0) idx=$(($wds_ch - 6));;
						1) idx=$(($wds_ch + 6));;
						2) idx=$(($wds_ch + 2));;
						3) idx=$(($wds_ch - 2));;
					esac
				update_cfg_file $wifi $ath $oper_chwidth 1
				;;
			esac
			update_cfg_file $wifi $ath $oper_centr_freq_seg0_idx $idx
			;;
	esac
}

reload_6g_dumtxvap() {
	local dumtxvap=$(cat /var/run/dummy_mbssid_vaps 2> /dev/null)
	local wifi_init=$1
	if [ -n "$dumtxvap" ]; then
		if [ $wifi_init = 1 ]; then
			logger -s -t "syswrapper" "init $dumtxvap hostapd"
			brctl addbr dumbr
			brctl addif dumbr $dumtxvap
			cfg80211tool $dumtxvap maccmd_sec 2
			cfg80211tool $dumtxvap mbss_tx_vdev 1
			cfg80211tool $dumtxvap vap_contryie 1
			hostapd -B -P /var/run/hostapd/${dumtxvap}.pid /usr/etc/wpa3-${dumtxvap}.cfg &
		else
			local pid=$(cat /var/run/hostapd/$dumtxvap.pid 2> /dev/null)
			logger -s -t "syswrapper" "reload $dumtxvap hostapd"
			kill $pid
			sleep 1
			hostapd -B -P /var/run/hostapd/${dumtxvap}.pid /usr/etc/wpa3-${dumtxvap}.cfg &
		fi
	fi
}

reload_hostapd() {
	for wifi in `ls ${sysnet} | grep -E ^wifi` ; do
		local is_2g=$(cat /sys/class/net/$wifi/2g_maxchwidth 2> /dev/null | wc -w)
		local is_5g=$(cat /sys/class/net/$wifi/5g_maxchwidth 2> /dev/null | wc -w)
		local is_6g=$(cat /sys/class/net/$wifi/6g_maxchwidth 2> /dev/null | wc -w)
		local vaps=$(cat /var/run/${wifi}_devnames)
		local mesh_band=$(cat /var/run/system.mesh 2> /dev/null)
		local is_mesh_reload=$(ls /var/run | grep -c wds_ch)
		local is_wifi_reload=$(ls /var/run | grep -c ${wifi}.reload)
		local is_wifi_init=$(ls /var/run | grep -c ${wifi}.init)
		local is_6g_relaod=$is_wifi_init
		local is_update_hostapd=$(ls /var/run | grep -c update_hostapd)
		# Skip monitor vap
		[ $is_2g = 1 -a $is_5g = 1 -a $is_6g = 1 ] && continue
		# Check 6G radio reload
		if [ $is_2g = 0 -a $is_5g = 1 -a $is_6g = 1 ]; then
			[ $is_wifi_reload = 1 ] && is_6g_relaod=1
			[ $is_mesh_reload = 1 -a "$mesh_band" != "6G" ] && is_6g_relaod=1
			[ $is_update_hostapd = 1 ] && is_6g_relaod=1
		fi
		# Check dumtxvap first
		if [ $is_6g_relaod = 1 ]; then
			reload_6g_dumtxvap $is_wifi_init
			[ $is_wifi_init = 1 ] && rm -rf /var/run/$wifi.init
		fi
		# Check mesh hostapd reconfig and reload
		if [ $is_mesh_reload = 1 -o $is_wifi_reload = 1 -o $is_update_hostapd = 1 ]; then
			for ath in $vaps; do
				if [ $(cat /var/run/vapusage.$ath) != uplink ]; then
					local pid=$(cat /var/run/hostapd/$ath.pid 2> /dev/null)
					# 5G mesh hostapd reconfig
					if [ $is_mesh_reload = 1 -a $is_5g = 1 -a $is_6g = 0 ]; then
						mesh_hostapd_reconfig $wifi $ath
					fi
					[ $is_update_hostapd = 1 ] && update_hostap_config
					kill $pid
					sleep 1
				fi
			done
			[ $is_wifi_reload = 1 ] && rm -rf /var/run/$wifi.reload
		fi
	done
	# Clean up mesh hostapd reload related files
	[ -f /var/run/reload_hostapd ] && rm -rf /var/run/reload_hostapd
	[ -f /var/run/update_hostapd ] && rm -rf /var/run/update_hostapd
	[ -f /var/run/wds_ch ] && rm -rf /var/run/wds_ch
	[ -f /var/run/wds_bw ] && rm -rf /var/run/wds_bw
	[ -f /var/run/wds_mode ] && rm -rf /var/run/wds_mode
}