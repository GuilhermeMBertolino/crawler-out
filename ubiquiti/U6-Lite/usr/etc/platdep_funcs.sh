# vim: ft=sh

#SYSNET=/proc/sys/net
SYSNET=/sys/class/net
WIFICOREDUMP_LOGS_LOCATION='/etc/persistent/wificoredump_logs'
WIFICOREDUMP_LOGS_LOCATION_SENT='/etc/persistent/wificoredump_logs_sent'
WIFICOREDUMP_FILE='/tmp/WifiCoredump.bin'
PCI_INFO_FILE='/var/run/pci_info'

dump_pci_info()
{
    local chip=$1
    local cmd=$2

    pci_info=$(lspci)

    plat=$(get_config_value /proc/ubnthal/system.info cpu)
    if [ "$plat" = "MT7622_SOC" ]; then
        if [ "$chip" = "7915" ]; then
            if [ "$cmd" = "bkup" ]; then
                echo "$pci_info" > $PCI_INFO_FILE.$chip
                hexdump -n64 /proc/bus/pci/0001:01/00.0 >> $PCI_INFO_FILE.$chip
            elif [ "$cmd" = "dump" ]; then
                echo "=====PCI info at beginning====" > /dev/kmsg
                cat $PCI_INFO_FILE.$chip > /dev/kmsg
                echo "=====PCI info at ending====" > /dev/kmsg
                echo "$pci_info" > /dev/kmsg
                hexdump -n64 /proc/bus/pci/0001:01/00.0 > /dev/kmsg
            fi
        fi
    elif [ "$plat" = "MT7621" ]; then
        local addr=$(echo "$pci_info" | grep "$chip" | cut -c 1-2)
        if [ "$cmd" = "bkup" ]; then
            echo "$pci_info" > $PCI_INFO_FILE.$chip
            hexdump -n64 /proc/bus/pci/$addr/00.0 >> $PCI_INFO_FILE.$chip
        elif [ "$cmd" = "dump" ]; then
            echo "=====PCI info at beginning====" > /dev/kmsg
            cat $PCI_INFO_FILE.$chip > /dev/kmsg
            echo "=====PCI info at ending====" > /dev/kmsg
            echo "$pci_info" > /dev/kmsg
            hexdump -n64 /proc/bus/pci/$addr/00.0 > /dev/kmsg
        fi
    fi
}

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

	/etc/rc.d/rc stop
	[ $(grep -c uplink-monitor /etc/inittab) -lt 1 ] || /etc/rc.d/rc stop
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

	if [ -e /sbin/hotplug2 ]; then
		progs="${progs} hotplug2"
	fi

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

plat_restore_default() {
	echo 20 > /proc/sys/kernel/panic
}

_upgrade() {
	ROOT_ON_SQUASHFS=`grep '/dev/root' /proc/mounts | grep -c squashfs`
	if [ ${ROOT_ON_SQUASHFS} -gt 0 ]; then
		DUALIMAGE=0
	else
		DUALIMAGE=1
	fi

	do_upgrade_rcstop
	do_cleanup_all_daemons
	do_cleanup_modules
	killall watchdog
	echo 600 > /proc/sys/kernel/panic

	if [ ${DUALIMAGE} -eq 0 ]; then
		run_ramfs fwupdate.real -m 2>&1 | tee /tmp/fwupdate.log
	else
		fwupdate.real -m 2>&1 | tee /tmp/fwupdate.log
	fi
}

need_ramfs() {
	return 1
}

_shutdown() {
	true
}

ath_scan() {
	radio=$1
	if [ -f /var/run/$1_devnames ]; then
		for ath in `cat /var/run/$1_devnames`; do
			ifup=`ifconfig $ath | grep "\<UP\>"`
			if [ ! -z "$ifup" ]; then
				# just perform a fast scan -f
				ubntrfclient -i $radio -j $ath -f > /dev/null 2>&1 &
				break
			fi
		done
	fi
}

get_active_vap_iface() {
	local iface=$1;
	if [ -f /var/run/${iface}_devnames ]
	then
		for vap in $(cat /var/run/${iface}_devnames)
		do
			if ifconfig $vap | grep -q "\<UP\>"; then
				echo -n "$vap"
				return
			fi
		done
	fi
}

# List all physical interfaces
list_phys_ifs_all() {
	ifconfig | grep '^rai\?[0-9]\+' | awk '{print $1}'
}

# Scan band: ng or na (ace convention)
scan_band() {
	local band_id=$1;
	case $band_id in
		"na") band=5 ;;
		"ng") band=2 ;;
	esac

	local ifs=$(list_phys_ifs $band)
	for i in $ifs
	do
		scan_radio $i
	done
}

# Perform scanning on active interface
scan_radio() {
	local iface=$1;
	local vap=$(get_active_vap_iface $iface)
	if [ "$vap" ]
	then
		iwpriv "$vap" set TriggerPartialScan=1
	fi
}

# Find physical interfaces by band: 2 or 5
list_phys_ifs() {
	local band=$1;
	case $band in
		"2") local pattern='ra[0-9]\+' ;;
		"5") local pattern='rai[0-9]\+' ;;
	esac
	for i in $(list_phys_ifs_all | grep $pattern)
	do
		local vap=$(cat /var/run/"${i}_devnames" 2>/dev/null | grep -v 'wds\|apcli' | head -n 1)
		if [ "$vap" ]
		then
			local mode=$(iwconfig $vap | grep Mode | sed -e 's/^.*Mode://' | awk '{print $1}')
			if [ "$mode" = "Master" ]
			then
				if [ $(grep -c "$vap" /var/run/${i}_devnames) -eq 1 ]
				then
					echo $i
				fi
			fi
		fi
	done
}

scan() {
	scan_band na
	scan_band ng
}

is_vap_user_or_guest() {
	[ -f /var/run/vapusage.$1 ] || return 1
	local usage=$(cat /var/run/vapusage.$1)
	[ "$usage" = "user" -o "$usage" = "guest" ] || return 1
}

kick_sta() {
	for ra in `ls ${SYSNET} | grep ra` ; do
		if is_vap_user_or_guest $ra; then
			iwpriv $ra set DisConnectSta="$1"
		fi
	done
}

kick_sta_on() {
	iwpriv $1 set [$3] DisConnectSta="$2"
}

is_vap_macacl_enabled() {
	[ "$1" = "enabled" ]
}

is_vap_macacl_policy_allow() {
	[ "$1" = "allow" ]
}

vap_macacl_block_sta() {
	ra=$1
	sta=$2

	vap_acl_id=`grep -E "macacl\..*$ra" /tmp/system.cfg |awk -F. '{print $2}'`
	vap_acl_status=`grep "macacl.$vap_acl_id.acl.status" /tmp/system.cfg |awk -F= '{print $2}'`
	vap_acl_policy=`grep "macacl.$vap_acl_id.acl.policy" /tmp/system.cfg |awk -F= '{print $2}'`

	if is_vap_macacl_enabled $vap_acl_status; then
		if is_vap_macacl_policy_allow $vap_acl_policy;then
			iwpriv $ra set ACLDelEntry="$sta"
		else
			iwpriv $ra set ACLAddEntry="$sta"
		fi
	else
		iwpriv $ra set AccessPolicy=2
		iwpriv $ra set ACLAddEntry="$sta"
	fi
}

vap_macacl_prepare_list_and_block() {
	ra=$1
	mac_list=""
	for mac in `cat /etc/persistent/cfg/blocked_sta` ; do
		mac_list="${mac_list}$mac;"
		# 1152=18*64 (mac len=17+1, 1 for ';' 64 sta per iter)
		if [ "${#mac_list}" -ge 1152 ]; then
			vap_macacl_block_sta $ra $mac_list
			mac_list=""
		fi
	done
	vap_macacl_block_sta $ra $mac_list
}

mtk_spectrum_scan() {
	local radio=$1
	local scan_opt=""
	if [ -f /var/run/${radio}_devnames ]; then
		for i in `seq 1  5`; do
			local ifup=`ifconfig ${radio} | grep "\<UP\>"`
			if [ ! -z "${ifup}" ]; then
				case "${radio}" in
					"rai0")
						scan_opt="-i${radio} -B1"
					;;
					"ra0")
						scan_opt="-i${radio} -B0"
					;;
					*)
						log "Wrong radio interface name: ${radio}"
						exit 240
					;;
				esac
				local cmd="ubnt-rf-env ${scan_opt} 2>&1 > /var/run/ubnt-rf-env.log.${radio}"
				log "Starting: $cmd"
				eval $cmd &
				return
			else
				log "interface ${radio} is down, iteration $i"
			fi
			sleep 2
		done
		log "giving up on interface ${radio} after $i iterations"
	else
		log "/var/run/${radio}_devnames does not exist."
	fi
	touch /var/run/rftable_${radio}.abnormal
}

mtk_ifnames() {
	case $1 in
	0) # 2G interface
		echo "ra0"
	;;
	1) # 5G interface
		echo "rai0"
	;;
	esac
}

spectrum_scan() {
	if [ -f /tmp/spectrum.cfg ] ; then
		state_lock
		/usr/etc/rc.d/rc stop
		/usr/etc/rc.d/rc start spectrum.cfg
		state_reload
		state_unlock

		touch /var/run/rftable.start
		WIFI_COUNT=$(cat /proc/ubnthal/system.info  | grep -c 'ra[i]*0')
		for X in $(seq 0 1 $((WIFI_COUNT - 1))); do
			ENABLED=$(grep radio.$((X + 1)).rfscan= /tmp/spectrum.cfg | sed 's/.*=//')
			if [ "$ENABLED" = "enabled" ]; then
				local cmd="mtk_spectrum_scan $(mtk_ifnames ${X})"
				echo "{}" > /var/run/rftable_$(mtk_ifnames ${X})
				log "Starting spectrum scan: $cmd"
				eval $cmd
			fi
		done
	else
		log "Please make sure /tmp/spectrum.cfg exist"
	fi
}

ble_stp() {
	if [ "$(get_fw_env is_ble_stp)" != "true" ] ; then
		ifconfig rai0 up
		dmesg -c
		iwpriv rai0 show efuseinfo
		val=`dmesg -c | grep "offset 0x0040" | awk '{print $(NF-2)}'`
		log $val
		if [ "$val" != "40" ]; then
			/etc/rc.d/rc stop
			# touch /var/run/ble_stp_enable
			set_led 012 120
			log "Enable STP mode"
			sed -i -e "s/E2pAccessMode=2/E2pAccessMode=1/g" /etc/wireless/mediatek/mt7915.2.dat
			# /etc/rc.d/rc stop
			. /etc/sysinit/radio.conf
			plugin_start
			. /etc/sysinit/wireless.conf
			plugin_start
			log "Write e2p"
			iwpriv rai0 e2p 4D=40
			iwpriv rai0 set bufferWriteBack=1
			set_fw_env is_ble_stp true
			log "Reboot....."
			# sleep 10
			/etc/rc.d/rc stop
			reboot
			log "Done..."
		elif [ "$val" = "40" ]; then
			log "Set ble_stp env..."
			set_fw_env is_ble_stp true
			touch /var/run/ble_stp_checked
		else
			log "Ble stp Something wrong..."
		fi
	else
		log "STP enable already"
		touch /var/run/ble_stp_checked
	fi

}

ble_fw_check() {
	if [ ! -f /var/run/ble_fw_skipdownload -a -f /var/run/ble_fw_download_done ]; then
		log "FW update done. Reboot....."
		/etc/rc.d/rc stop
		reboot
	elif [ -f /var/run/ble_fw_faildownload ]; then
		log "FW update fail."
		touch /var/run/ble_fw_skipdownload
		touch /var/run/ble_fw_checked
	elif [ -f /var/run/ble_fw_skipdownload ]; then
		log "FW download skip."
		touch /var/run/ble_fw_checked
	else
		log "Ble fw Something wrong..."
	fi
}

is_vap_macacl_sta_rule_enabled() {
	sta_rule_enabled=`grep "macacl.$1.acl.$2.status" /tmp/system.cfg |awk -F= '{print $2}'`
	[ "$sta_rule_enabled" = "enabled" ]
}

vap_macacl_unblock_sta() {
	ra=$1
	sta=$2

	vap_acl_id=`grep -E "macacl\..*$ra" /tmp/system.cfg |awk -F. '{print $2}'`
	vap_acl_status=`grep "macacl.$vap_acl_id.acl.status" /tmp/system.cfg |awk -F= '{print $2}'`
	vap_acl_policy=`grep "macacl.$vap_acl_id.acl.policy" /tmp/system.cfg |awk -F= '{print $2}'`
	vap_acl_sta_rule_id=`grep "macacl.$vap_acl_id.*$sta" /tmp/system.cfg |awk -F. '{print $4}'`

	if is_vap_macacl_enabled $vap_acl_status; then
		if is_vap_macacl_policy_allow $vap_acl_policy;then
			if [ -n $vap_acl_sta_rule_id ]; then
				if is_vap_macacl_sta_rule_enabled $vap_acl_id $vap_acl_sta_rule_id;then
					iwpriv $ra set ACLAddEntry="$sta"
				fi
			fi
		else
			if [ -z $vap_acl_sta_rule_id ]; then
				iwpriv $ra set ACLDelEntry="$sta"
			fi
		fi
	else
		iwpriv $ra set ACLDelEntry="$sta"
	fi
}

driver_kick_block_sta() {
	for ra in `ls ${SYSNET} | grep ra` ; do
		if is_vap_user_or_guest $ra; then
			vap_macacl_block_sta $ra $1
			iwpriv $ra set DisConnectSta="$1"
		fi
	done
}

driver_unblock_sta() {
	for ra in `ls ${SYSNET} | grep ra` ; do
		if is_vap_user_or_guest $ra; then
			vap_macacl_unblock_sta $ra $1
		fi
	done
}

driver_apply_blocklist_ifup() {
	ra=$1
	if is_vap_user_or_guest $ra; then
		vap_macacl_prepare_list_and_block $ra
	fi
}

driver_apply_blocklist() {
	for ra in `ls ${SYSNET} | grep ra` ; do
		driver_apply_blocklist_ifup $ra
	done
}

channel_resume() {
	main_bss="rai0"
	channel=`/sbin/nvram_get.sh 1 Channel`
	iwpriv $main_bss set IEEE80211H="1"
	if [ "$channel" = "0" ]; then
		iwpriv $main_bss set Channel="0"
		iwpriv $main_bss set AutoChannelSel="3"
	else
		iwpriv $main_bss set AutoChannelSel="0"
		iwpriv $main_bss set Channel="$channel"
	fi
}

configure_uplink() {
	ath=$1
	main_bss="rai0"
	target_mode=$2
	bridge="br0"
	channel=`/sbin/nvram_get.sh 1 Channel`
	supplicant_driver=nl80211
	if [ -f /var/run/vapbridge.$ath ]; then
		bridge=`cat /var/run/vapbridge.$ath`
	fi
	if [ "$target_mode" == "up" ]; then
		if [ -f /var/run/uplink.conf ] && [ ! -f /var/run/wpa_vport_$ath.pid ]; then
			# Disable dfs/autoCh when apcli up
			iwpriv $main_bss set IEEE80211H="0"
			iwpriv $main_bss set AutoChannelSel="0"
			iwpriv $main_bss set Channel="36"
			/usr/sbin/wpa_supplicant -s -D$supplicant_driver -i $ath -b $bridge \
				-c /var/run/uplink.conf \
				-B -P /var/run/wpa_vport_$ath.pid
		fi
	else
		if [ -f /var/run/wpa_vport_$ath.pid ]; then
			kill `cat /var/run/wpa_vport_$ath.pid`
			iwpriv $main_bss set IEEE80211H="1"
		fi
	fi
}

_do_relay_ctl() {
	true
}

dump_wificoredump_to_persistent() {
	local TIMESTAMP=$1
	local WIFICOREDUMP_CNT=$2
	local TARFILE=$3
	local WIFICOREDUMP_LOG_TMP="/var/log/wificoredump_${TIMESTAMP}_${WIFICOREDUMP_CNT}"
	local WIFICOREDUMP_LOG_TMP_FILE="${WIFICOREDUMP_LOG_TMP}/wificoredump_${TIMESTAMP}_${WIFICOREDUMP_CNT}"
	local WIFICOREDUMP_LOG_LENGTH=1000
	local WIFICOREDUMP_LOG_LIMIT=6

	mkdir -p ${WIFICOREDUMP_LOG_TMP}
	dmesg | tail -n ${WIFICOREDUMP_LOG_LENGTH} > ${WIFICOREDUMP_LOG_TMP_FILE}.log
	cp ${WIFICOREDUMP_FILE} ${WIFICOREDUMP_LOG_TMP}/Coredump_${TIMESTAMP}_${WIFICOREDUMP_CNT}.bin
	if [ $? -eq 0 ] && [ ${TARFILE} == "y" ]; then
		mkdir -p ${WIFICOREDUMP_LOGS_LOCATION}
		mkdir -p ${WIFICOREDUMP_LOGS_LOCATION_SENT}
		tar -cvf ${WIFICOREDUMP_LOGS_LOCATION}/wificoredump_${TIMESTAMP}_${WIFICOREDUMP_CNT}.tar ${WIFICOREDUMP_LOG_TMP}/
		# remove old logs if we have more than a specified limit
		rm -f `ls -d ${WIFICOREDUMP_LOGS_LOCATION}/* | head -n -${WIFICOREDUMP_LOG_LIMIT}`

		# prune WIFICOREDUMP_LOGS_LOCATION_SENT when a log file has been removed
		for SENT_FILE in ${WIFICOREDUMP_LOGS_LOCATION_SENT}/*; do
			[ -f "${WIFICOREDUMP_LOGS_LOCATION}/$(basename ${SENT_FILE})" ] || rm -f ${SENT_FILE}
		done
	fi
}

_do_ir_send() {
	irsend $1 $2 $3
}

mtk_rrm_scan() {
	local radio=$1
	local channel=$2
	local scan_type="active"
	local dwell_time=120

	if [ -f "/var/run/spectrum-scan.start" ]; then
		log "RF scan in progress skip rrm-scan"
		return
	fi

	if [ $channel -ge 52 -a $channel -le 144 ] || [ $channel = 13 ]; then
		scan_type="passive"
		dwell_time=250
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
					local cmd="sleep $delay;iwpriv $ath set ApScanChannel=$scan_type:$channel:$dwell_time; sleep 1;"
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

scan_rrm() {
	local band=$1
	local channel=$2
	local radio=$(mtk_ifnames ${band})
	local cmd="mtk_rrm_scan $radio $channel"
	eval $cmd
}

scan_rrm_check() {
	# check 2g neighbor chans
	for ch in `cat /proc/ui_neighbor/2g_chans`; do
		local cmd="mtk_rrm_scan ra0 $ch"
		eval $cmd
	done
	# check 5g neighbor chans
	for ch in `cat /proc/ui_neighbor/5g_chans`; do
		local cmd="mtk_rrm_scan rai0 $ch"
		eval $cmd
	done
}
