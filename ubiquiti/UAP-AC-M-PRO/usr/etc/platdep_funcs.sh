# vim: ft=sh

#SYSNET=/proc/sys/net
SYSNET=/sys/class/net

get_used_by_module()
{
	local base_module=$1

	local module_inserted=`lsmod | grep -c "^${base_module} "`
	[ ${module_inserted} -gt 0 ] || return

	local used_cnt=`lsmod | grep "^${base_module} " | awk '{print $3}'`

	if [ "${used_cnt}" != "" -a ${used_cnt} -gt 0 ] ; then
		local used_modules=`lsmod | grep "^${base_module} " | awk '{print $4}' | sed 's/,/ /g'`
		for mod in ${used_modules}; do
		get_used_by_module ${mod}
		done
	fi
	echo -n " ${base_module}"
}

remove_module_recursively()
{
	local mod_list=$(get_used_by_module $1)
	for m in ${mod_list}; do
		[ $(lsmod | grep -c "^$m ") -lt 1 ] || rmmod $m
	done
}

cleanup_modules()
{
	[ $(lsmod | grep -c '^ubnt_roam ') -lt 1 ] || remove_module_recursively ubnt_roam
	[ $(lsmod | grep -c '^ubnt_poll ') -lt 1 ] || remove_module_recursively ubnt_poll
	[ $(lsmod | grep -c '^usbcore ') -lt 1 ] || remove_module_recursively usbcore
	for i in `lsmod | grep '^ubnthal ' | awk '{print $4}' | sed 's/,/ /g'`; do
		[ "$i" == "gpiodev" ] || remove_module_recursively $i
	done
}

do_upgrade_rcstop()
{
	if [ -f /var/run/doupgrade_rcstop.done ]; then
		return
	fi

	/etc/rc.d/rc unload
	[ $(grep -c uplink-monitor /etc/inittab) -lt 1 ] || /etc/rc.d/rc unload
	[ $(grep -c uplink-monitor /etc/inittab) -lt 1 ] || exit 255

	cat /proc/uptime > /var/run/doupgrade_rcstop.done
}

do_cleanup_all_daemons()
{
	progs="crond downlink-monitor dropbear hostapd igmpproxy linkcheck ntpclient pwdog redirector stamgr syslogd telnetd tinysnmpd ubntevent ubnt-vorbis-codecbytes ubnt-vorbis-player udhcpc uplink-monitor wevent wpa_supplicant"

	# kill long life daemons
	for p in mca-monitor mcad syslogd ; do
		progs="${progs} $p"
	done

	grep -v 'null::respawn:' /usr/etc/inittab > /etc/inittab && init -q
	for i in $(awk '/null::respawn:/{print $1}' /usr/etc/inittab | sed 's,.*respawn:,,g') ; do
		p=$(basename $i)
		progs="${progs} $p"
	done

	progs="${progs} hotplug2"

	for p in $progs ; do
		i=0
		stopped=0
		while [ ${stopped} -lt 1 -a $i -lt 5 ] ; do
			if [ "$(pidof $p)" != "" ] ; then
				kill -9 $(pidof $p)
				sleep 1
			else
				stopped=1
				break
			fi
			i=$(expr $i + 1)
		done
		[ ${stopped} -gt 0 ] || exit 254
	done
}

do_cleanup_modules()
{
	cleanup_modules
	[ $(lsmod | grep -c '^ath_hal ') -lt 1 ] || cleanup_modules
	[ $(lsmod | grep -c '^ath_hal ') -lt 1 ] || exit 249

}

need_ramfs() {
	local ROOT_ON_SQUASHFS=`grep '/dev/root' /proc/mounts | grep -c squashfs`
	if [ ${ROOT_ON_SQUASHFS} -gt 0 ]; then
		return 0
	else
		return 1
	fi
}

do_unmount_logs() {
	local LOG_DEV
	LOG_DEV=$(/bin/mmc_info -Fn log) || return
	local VAR_LOG_MOUNTED=$(grep -c "^$LOG_DEV" /proc/mounts)
	if [ ${VAR_LOG_MOUNTED} -gt 0 ]; then
		umount -l $LOG_DEV
	fi
}

do_cfg_clean() {
	local CFG_DEV=`/bin/mmc_info -Fn cfg`
	local size=`/bin/mmc_info -Sn cfg`
	if [ "$CFG_DEV" = "" ]; then
			return
	fi
	dd if=/dev/zero of=$CFG_DEV bs=1024 count=$((size/1024))
}

do_default_logs() {
	local LOG_DEV LOG_OFFSET
	LOG_DEV=$(/bin/mmc_info -Fn log) || return

	# Protect ourselves so we don't corrupt wrong partition
	if ! LOG_OFFSET=$(/bin/mmc_info -On log); then
		error_log "skip default log: offset not found"
		return
	fi
	if [ $LOG_OFFSET -eq 0 ]; then
		error_log "skip default log: offset cannot be 0"
		return
	fi
	local FIT_MAGIC=$(printf "\xd0\x0d\xfe\xed")
	local LOG_MAGIC=$(dd if=$LOG_DEV bs=4 count=1 2>/dev/null)
	if [ "$LOG_MAGIC" = "$FIT_MAGIC" ]; then
		error_log "skip default log: FIT magic found"
		return
	fi

	local KERNEL0_OFFSET KERNEL1_OFFSET
	if ! KERNEL0_OFFSET=$(/bin/mmc_info -On kernel0); then
		error_log "skip default log: kernel0 offset not found"
		return
	fi
	if ! KERNEL1_OFFSET=$(/bin/mmc_info -On kernel1); then
		error_log "skip default log: kernel1 offset not found"
		return
	fi
	if [ $LOG_OFFSET -eq $KERNEL0_OFFSET ]; then
		error_log "skip default log: same offset as kernel0"
		return
	fi
	if [ $LOG_OFFSET -eq $KERNEL1_OFFSET ]; then
		error_log "skip default log: same offset as kernel1"
		return
	fi

	do_unmount_logs
	# Restart logging daemons (will thus log to ramfs)
	local LOG_FILE=$(get_config_value /tmp/system.cfg syslog.file /var/log/messages)
	pkill -f $LOG_FILE
	if [ -f /etc/sysinit/rsyslog.conf ]; then
		/etc/init.d/S01logging restart
	fi
	# Corrupt the partition so it will be reformatted after reboot
	dd if=/dev/zero of=$LOG_DEV bs=1k count=1k
}

_upgrade() {
	local rc

	do_upgrade_rcstop
	do_cleanup_all_daemons
	do_cleanup_modules
	do_unmount_logs
	killall watchdog
	echo 600 > /proc/sys/kernel/panic

	if need_ramfs ; then
		run_ramfs fwupdate.real -m 2>&1 | tee ${FW_WRITELOG}
	else
		fwupdate.real -m 2>&1 | tee ${FW_WRITELOG}
		rc=$?
	fi
	return ${rc}
}

_shutdown() {
	true
}

plat_restore_default() {
	local CFG_DEV=`/bin/mmc_info -Fn cfg`
	echo 20 > /proc/sys/kernel/panic
	if [ "$CFG_DEV" = "" ]; then
		/usr/etc/rc.d/rc unload
	fi
	# this is where some other configs go
	touch /var/run/oled.factory_reset
	do_cfg_clean
	do_default_logs
}

_upgrade_keep_running() {
	local rc cur_panic

	killall watchdog
	cur_panic=`cat /proc/sys/kernel/panic`
	echo 600 > /proc/sys/kernel/panic

	fwupdate.real -m -k >${FW_WRITELOG} 2>&1
	rc=$?
	echo ${cur_panic} > /proc/sys/kernel/panic
	/etc/rc.d/rc.watchdog
	return ${rc}
}

get_active_vap_iface() {
	local radio=$1
	if [ -f /var/run/${radio}_devnames ]; then
		for ath in $(cat /var/run/${radio}_devnames); do
			local ifup=$(ifconfig $ath | grep "\<UP\>")
			if [ ! -z "$ifup" ]; then
				echo -n "$ath"
				return;
			fi
		done
	fi
}

is_vap_on_freq() {
	local vap=$1
	local freq=$2
	local if_freq=$(iwconfig $vap | grep "Frequency:${freq}")
	[ ! -z "$if_freq" ] || return 1
}

get_sens_level() {
	local radIdx=$1
	local wifiX=$(grep radio.$radIdx.phyname /tmp/system.cfg | cut -f 2 -d '=')
	local is_2g=$(cat /sys/class/net/$wifiX/2g_maxchwidth 2> /dev/null | wc -w)
	local is_5g=$(cat /sys/class/net/$wifiX/5g_maxchwidth 2> /dev/null | wc -w)

	if [ $is_2g = 1 ]; then
		echo "-78"
	elif [ $is_5g = 1 ]; then
		echo "-82"
	else
		echo "-96"
	fi
}

active_scan_sync() {
	local radio=$1
	local vap=$2
	local radIdx=$(grep radio...devname=$2 /tmp/system.cfg | cut -f 2 -d '.')
	local ccaThreshEnabled=$(grep -c radio.$radIdx.hard_noisefloor.status=enabled /tmp/system.cfg)

	if [ $ccaThreshEnabled -gt 0 ]; then
		wifiX=$(grep radio.$radIdx.phyname /tmp/system.cfg | cut -f 2 -d '=')
		ccaVal=$(get_sens_level $radIdx)
		iwpriv $wifiX sens_level -96
	fi

	iwlist $vap scan &> /dev/null

	if [ $ccaThreshEnabled -gt 0 ]; then
		iwpriv $wifiX sens_level $ccaVal
	fi
}

active_scan_async() {
	active_scan_sync $@ &
}

passive_scan_sync() {
	local radio=$1
	local vap=$2
	local radIdx=$(grep radio...devname=$2 /tmp/system.cfg | cut -f 2 -d '.')
	local ccaThreshEnabled=$(grep -c radio.$radIdx.hard_noisefloor.status=enabled /tmp/system.cfg)
	local linear=

	if [ "${QCA_UAP_MAPLE_DAKOTA}" = "1" ]; then
		linear="-x 1"
	fi

	if [ $ccaThreshEnabled -gt 0 ]; then
		wifiX=$(grep radio.$radIdx.phyname /tmp/system.cfg | cut -f 2 -d '=')
		ccaVal=$(get_sens_level $radIdx)
		iwpriv $wifiX sens_level -96
	fi

	which ubntrfclient >&1 > /dev/null && {
		# just perform a fast scan -f
		ubntrfclient -i $radio -j $vap -f $linear&> /dev/null
	} || {
		iwlist $vap scan &> /dev/null
	}

	if [ $ccaThreshEnabled -gt 0 ]; then
		iwpriv $wifiX sens_level $ccaVal
	fi
}

passive_scan_async() {
	passive_scan_sync $@ &
}

ath_scan() {
	local radio=$1; shift
	local vap=$1; shift
	local scan_type="active"
	local scan_mode="sync"

	while getopts "t:m:i:f:" opt; do
		case "$opt" in
			t)
				[ "$OPTARG" = "active" -o "$OPTARG" = "passive" ] || return
				scan_type="$OPTARG"
				;;
			m)
				[ "$OPTARG" = "sync" -o "$OPTARG" = "async" ] || return
				scan_mode="$OPTARG"
				;;
			i)
				[ "$OPTARG" = "$radio" ] || return
				;;
			f)
				is_vap_on_freq $vap "$OPTARG" || return
				;;
			[?])
				log "scan: invalid option" >&2
				;;
		esac
	done

	${scan_type}_scan_${scan_mode} ${radio} ${vap}
}

# List all physical interfaces
list_phys_ifs_all() {
	# filter out dumtxvapwifi2 6G vap
	ifconfig | grep -E ^wifi[0-9] | awk '{print $1}'
}

# Find physical interfaces by band: 2 or 5
list_phys_ifs() {
	local band=$1
	for i in $(list_phys_ifs_all)
	do
		for vap in $(cat /var/run/${i}_devnames | grep -v vwire | grep -v wips)
		do
			if [ "$vap" ]
			then
				# Find actual frequency
				freq=$(iwconfig $vap | grep Frequency | awk '{print $2}' | awk -F: '{print $2}' | sed 's/\.//')
				mode=$(iwconfig $vap | grep Mode | sed -e 's/^.*Mode://' | awk '{print $1}')
				fchar="$(echo $freq | head -c 1)"
				if [ "$fchar" == "$band" -a "$mode" == "Master" ]
				then
					if [ $(grep -c $vap /var/run/${i}_devnames) -eq 1 ]
					then
						echo $i
						break
					fi
				fi
			fi
		done
	done
}

# Scan band: ng or na (ace convention)
scan_band() {
	local band_id=$1; shift
	if [ "$band_id" = "na" ]
	then
		band=5
	elif [ "$band_id" = "ng" ]
	then
		band=2
	fi
	local ifs=$(list_phys_ifs $band)
	for i in $ifs
	do
		scan_radio $i $@
	done
}

scan_radio() {
	local radio=$1; shift
	local vap=$(get_active_vap_iface ${radio})
	[ -z "${vap}" ] || ath_scan $radio $vap $@
}

scan() {
	scan_band na $@
	scan_band ng $@
}

ath_restore_outdoor() {
	for ath in `cat /var/run/$1_devnames`; do
		local mode=$(iwconfig $ath | grep Mode | sed -e 's/^.*Mode://' | awk '{print $1}')
		if [ "$mode" != "Master" ]; then
			continue
		fi
		local outdoor=$(cat /var/run/$1.outdoor)
		iwpriv $ath outdoor $outdoor
		log "restor $1 outdoor mode to $outdoor"
		break
	done
}

scan_devnames_destroy() {
	local ath=
	for wifi in `ls ${SYSNET} | grep -E ^wifi` ; do
		ath_restore_outdoor $wifi
		if [ -f /var/run/$wifi.scan_vap_create ]; then
			ath=`cat /var/run/${wifi}_devnames`
			log "destroy scan_vap $ath for $wifi"
			ifconfig "$ath" down
			wlanconfig "$ath" destroy
			rm -rf /var/run/${wifi}.*
			rm -rf /var/run/${wifi}_devnames
		fi
	done
}

scan_devnames_check() {
	for wifi in `ls ${SYSNET} | grep -E ^wifi` ; do
		if [ -f /var/run/${wifi}_devnames ]; then
			continue;
		else
			local ath="scan$(echo $wifi | sed 's/[^0-9]*//g')"
			local is_2g=$(cat /sys/class/net/$wifi/2g_maxchwidth 2> /dev/null | wc -w)
			local is_5g=$(cat /sys/class/net/$wifi/5g_maxchwidth 2> /dev/null | wc -w)
			local is_6g=$(cat /sys/class/net/$wifi/6g_maxchwidth 2> /dev/null | wc -w)
			local mode=
			local ch=
			local freq=
			# skip monitor radio
			if [ $is_2g = 1 -a $is_5g = 1 ]; then
				log "Skip monitor radio $wifi"
				continue;
			fi
			if [ $is_2g = 1 ]; then
				if [ "${QCA_UAP_MAPLE_DAKOTA}" = "1" ]; then
					mode="11GHE20"
				else
					mode="11NGHT20"
				fi
				ch="1"
				freq="2412M"
			elif [ $is_5g = 1 -a $is_6g = 0 ]; then
				if [ "${QCA_UAP_MAPLE_DAKOTA}" = "1" ]; then
					mode="11AHE20"
				else
					mode="11ACVHT20"
				fi
				ch="36"
				freq="5180M"
			elif [ $is_5g = 1 -a $is_6g = 1 ]; then
				mode="11AHE160"
				ch="37"
				freq="6135M"
			fi
			log "generate $ath vap for $1 $mode $ch $freq"
			wlanconfig "$ath" create wlandev $wifi wlanmode ap
			iwpriv "$ath" mode $mode
			echo $ath > /var/run/${wifi}_devnames
			echo $mode > /var/run/${wifi}.mode
			echo 0 > /var/run/${wifi}.eu
			echo 0 > /var/run/${wifi}.outdoor
			iwconfig "$ath" freq $freq
			echo $ch > /var/run/${wifi}.ch
			ifconfig "$ath" up
			sleep 2
			touch /var/run/${wifi}.scan_vap_create
		fi
	done
}

ath_spectrum_scan() {
	local scan=
	radio=$1
	infinite=$2
	linear=$3
	dewell=$4
	for ath in `cat /var/run/$1_devnames`; do
		if [ "$scan" == "done" ]; then
			break;
		fi
		mode=$(iwconfig $ath | grep Mode | sed -e 's/^.*Mode://' | awk '{print $1}')
		if [ "$mode" != "Master" ]; then
			continue
		fi
		for i in `seq 1 5`; do
			ifup=`ifconfig $ath | grep "\<UP\>"`
			if [ ! -z "$ifup" ]; then
				local radIdx=$(grep radio...devname=$ath /tmp/system.cfg | cut -f 2 -d '.')
				local ccaThreshEnabled=$(grep -c radio.$radIdx.hard_noisefloor.status=enabled /tmp/system.cfg)
				local ccaVal=$(get_sens_level $radIdx)
				local init_cmd="iwpriv $radio minrssi 70; iwpriv $ath kickall 1; iwpriv $ath outdoor 0"
				local cmd="ubntrfclient -i $radio -j $ath $dewell $infinite $linear > /var/run/ubntrfclient.log.$radio"
				if [ $ccaThreshEnabled -gt 0 ]; then
					iwpriv $radio sens_level -96
					echo $ccaVal > /var/run/$radio.sens_level
					log "set $radio sens_level to -96 from $ccaVal"
				fi
				log "Init radio before RF scan: $init_cmd"
				eval $init_cmd 2>&1 &
				log "Starting: $cmd"
				eval $cmd 2>&1 &
				scan="done"
				break
			else
				log "interface $ath is down, iteration $i"
			fi
			sleep 2
		done
	done
}

spectrum_scan() {
	local infinite=
	local linear=
	local dewell="-d 3"
	local wifi_caps
	local skip_6g_scanning=false

	which ubntrfclient >&1 > /dev/null || {
		log "scan: not available"
		return
	}

	if [ "${QCA_UAP_MAPLE_DAKOTA}" = "1" ]; then
		linear="-x 1"
	fi

	while getopts "i" opt; do
		case "$opt" in
			i)
				infinite="-I"
				;;
			[?])
				echo "invalid option" >&2
				;;
		esac
	done

	if [ -f /tmp/spectrum.cfg ] ; then
		rm -rf /tmp/spectrum.cfg
	fi

	#check is 6Ghz scanning is enabled
	wifi_caps=$(mca-dump | jsonfilter -e @.wifi_caps)
	if [ $(($wifi_caps & 0x08000000)) -eq 0 ]; then
		skip_6g_scanning=true
	fi
	# generate scan vap for disabled radio
	scan_devnames_check
	for wifi in `ls ${SYSNET} | grep -E ^wifi` ; do
		local is_2g=$(cat /sys/class/net/$wifi/2g_maxchwidth 2> /dev/null | wc -w)
		local is_5g=$(cat /sys/class/net/$wifi/5g_maxchwidth 2> /dev/null | wc -w)
		local is_6g=$(cat /sys/class/net/$wifi/6g_maxchwidth 2> /dev/null | wc -w)
		local ifup=`ifconfig ${wifi} | grep "\<UP\>"`

		# skip monitor radio
		if [ $is_2g = 1 -a $is_5g = 1 ]; then
			log "Skip monitor radio $wifi"
			continue;
		fi

		if [ $skip_6g_scanning = true -a $is_6g = 1 ]; then
			continue
		fi

		if [ -z "$ifup" ]; then
			log "interface $wifi in the list but down"
			continue
		fi

		echo "{}" > /var/run/rftable_${wifi}
		[ $is_5g = 1 ] && {
			log "Disable DFS detection for $wifi"
			radartool -i $wifi disable 1
		}
		local cmd="ath_spectrum_scan $wifi '$infinite' '$linear' '$dewell'"
		log "Starting spectrum scan: $cmd"
		eval $cmd
	done
}

ath_rrm_scan() {
	local radio=$1
	local channel=$2
	local scan=
	local mode=
	local ifup=

	if [ -f "/var/run/spectrum-scan.start" ]; then
		log "RF scan in progress skip rrm-scan"
		return
	fi
	for ath in `cat /var/run/$1_devnames`; do
		if [ "$scan" == "done" ]; then
			break
		fi
		mode=$(iwconfig $ath | grep Mode | sed -e 's/^.*Mode://' | awk '{print $1}')
		if [ "$mode" != "Master" ]; then
			continue
		fi
		for i in `seq 1 5`; do
			ifup=`ifconfig $ath | grep "\<UP\>"`
			if [ ! -z "$ifup" ]; then
				for j in `seq 1 3`; do
					local delay=`grep -m1 -ao '[1-5]' /dev/urandom | sed s/0/10/ | head -n1`
					local cmd="sleep $delay;iwpriv $ath acsrrm $channel; sleep 1;"
					log "Trigger rrm scan($j): $cmd"
					eval $cmd
				done
				scan="done"
				break
			else
				log "interface $ath is down, iteration $i"
			fi
			sleep 2
		done
	done
}

is_monitor_wifi_included() {
	# check band channel first
	for wifi in `ls ${SYSNET} | grep -E ^wifi` ; do
		local is_2g=$(cat /sys/class/net/$wifi/2g_maxchwidth 2> /dev/null | wc -w)
		local is_5g=$(cat /sys/class/net/$wifi/5g_maxchwidth 2> /dev/null | wc -w)
		local is_6g=$(cat /sys/class/net/$wifi/6g_maxchwidth 2> /dev/null | wc -w)

		# skip monitor radio
		if [ $is_2g = 1 -a $is_5g = 1 ]; then
			echo "true"
			return
		fi
	done
	echo "false"
}

scan_rrm() {
	local band=$1
	local channel=$2

	if [ $(is_monitor_wifi_included) = "true" ]; then
		log "skip scan-rrm"
		return
	fi
	# check band channel first
	for wifi in `ls ${SYSNET} | grep -E ^wifi` ; do
		local is_2g=$(cat /sys/class/net/$wifi/2g_maxchwidth 2> /dev/null | wc -w)
		local is_5g=$(cat /sys/class/net/$wifi/5g_maxchwidth 2> /dev/null | wc -w)
		local is_6g=$(cat /sys/class/net/$wifi/6g_maxchwidth 2> /dev/null | wc -w)

		# skip monitor radio
		if [ $is_2g = 1 -a $is_5g = 1 ]; then
			log "Skip monitor radio $wifi"
			continue;
		fi

		if [ $is_2g = 1 -a $band = 0 ] || [ $is_5g = 1 -a $is_6g = 0 -a $band = 1 ] || [ $is_5g = 1 -a $is_6g = 1 -a $band = 2 ]; then
			if [ -f /var/run/$wifi.curchan ]; then
				if [ `cat /var/run/$wifi.curchan` = $channel ]; then
					log "Skip rrm scan $wifi due to the same channel"
					continue
				else
					local cmd="ath_rrm_scan $wifi $channel"
					eval $cmd
				fi
			fi
		fi
	done
}

scan_rrm_check() {
	if [ $(is_monitor_wifi_included) = "true" ]; then
		log "skip scan-rrm"
		return
	fi
	# check band channel first
	for wifi in `ls ${SYSNET} | grep -E ^wifi` ; do
		local is_2g=$(cat /sys/class/net/$wifi/2g_maxchwidth 2> /dev/null | wc -w)
		local is_5g=$(cat /sys/class/net/$wifi/5g_maxchwidth 2> /dev/null | wc -w)
		local is_6g=$(cat /sys/class/net/$wifi/6g_maxchwidth 2> /dev/null | wc -w)

		# skip monitor radio
		if [ $is_2g = 1 -a $is_5g = 1 ]; then
			log "Skip monitor radio $wifi"
			continue;
		fi

		if [ $is_2g = 1 ]; then
			for ch in `cat /proc/ui_neighbor/2g_chans`; do
				local cmd="ath_rrm_scan $wifi $ch"
				eval $cmd
			done
		fi
		if [ $is_5g = 1 -a $is_6g = 0 ]; then
			for ch in `cat /proc/ui_neighbor/5g_chans`; do
				local cmd="ath_rrm_scan $wifi $ch"
				eval $cmd
			done
		fi
		if [ $is_5g = 1 -a $is_6g = 1 ]; then
			for ch in `cat /proc/ui_neighbor/6g_chans`; do
				local cmd="ath_rrm_scan $wifi $ch"
				eval $cmd
			done
		fi
	done
}

is_vap_user_or_guest() {
	[ -f /var/run/vapusage.$1 ] || return 1
	local usage=$(cat /var/run/vapusage.$1)
	[ "$usage" = "user" -o "$usage" = "guest" ] || return 1
}

kick_sta() {
	for ath in `ls ${SYSNET} | grep ath` ; do
		if is_vap_user_or_guest $ath; then
			iwpriv $ath kickmac "$1"
		fi
	done
}

kick_sta_on() {
	iwpriv $1 kickmac [$3] "$2"
}

driver_kick_block_sta() {
	for ath in `ls ${SYSNET} | grep ath` ; do
		if is_vap_user_or_guest $ath; then
			iwpriv $ath addmac_sec "$1"
			iwpriv $ath kickmac "$1"
		fi
	done
}

driver_unblock_sta() {
	for ath in `ls ${SYSNET} | grep ath` ; do
		if is_vap_user_or_guest $ath; then
			iwpriv $ath delmac_sec "$1"
		fi
	done
}

driver_apply_blocklist() {
	for ath in `ls ${SYSNET} | grep ath` ; do
		if is_vap_user_or_guest $ath; then
			# clear the acl
			iwpriv $ath maccmd_sec 3
			# add acl
			for mac in `cat /etc/persistent/cfg/blocked_sta` ; do
				iwpriv $ath addmac_sec "$mac"
			done
		fi
	done
}

channel_resume() {
	[ -f /var/run/wlan_devnames ] || return
	local vaps=`cat /var/run/wlan_devnames`
	local parent=
	local mode=
	local channel=
	local usage=
	for ath in $vaps; do
		parent=""
		mode=""
		channel=""
		usage=""
		if [ -f /proc/sys/net/$ath/%parent ]; then
			parent=`cat /proc/sys/net/$ath/%parent`
			mode=`cat /var/run/$parent.mode`
			channel=`cat /var/run/$parent.ch`
		fi
		if [ -f /var/run/vapusage.$ath ]; then
			usage=`cat /var/run/vapusage.$ath`
		fi
		if [ -f ${HOSTAPD_RUN_DIR}/cfg_error.$ath ]; then
			usage="unusable"
		fi
		if [ "$usage" = "user" -o "$usage" = "guest" -o "$usage" = "donwlink" ]; then
			[ -z "$mode" ] || iwpriv $ath mode $mode
			[ -z "$channel" ] || iwconfig $ath channel $channel
		fi
	done
}

configure_uplink() {
	ath=$1
	target_mode=$2
	bridge="br0"
	cfg80211_support=`cat /usr/etc/cfg80211_support`
	if [ "$cfg80211_support" = "1" ]; then
		supplicant_driver=nl80211
	else
		# All SPF5.3 QCA APs use athr
		supplicant_driver=athr
	fi
	if [ -f /var/run/vapbridge.$ath ]; then
		bridge=`cat /var/run/vapbridge.$ath`
	fi
	if [ "$target_mode" == "up" ]; then
		if [ -f /var/run/uplink.conf ] && [ ! -f /var/run/wpa_vport_$ath.pid ]; then
			# device with only 1 uplink interface
			/usr/sbin/wpa_supplicant -s -D$supplicant_driver -i $ath -b $bridge \
				-c /var/run/uplink.conf \
				-B -P /var/run/wpa_vport_$ath.pid
		elif [ -f /var/run/uplink_$ath.conf ] && [ ! -f /var/run/wpa_vport_$ath.pid ]; then
			# device with multiple uplink interfaces
			/usr/sbin/wpa_supplicant -s -D$supplicant_driver -i $ath -b $bridge \
				-c /var/run/uplink_$ath.conf \
				-B -P /var/run/wpa_vport_$ath.pid
		fi
	else
		if [ -f /var/run/wpa_vport_$ath.pid ]; then
			kill `cat /var/run/wpa_vport_$ath.pid`
		fi
	fi
}

_do_relay_ctl() {
	true
}
