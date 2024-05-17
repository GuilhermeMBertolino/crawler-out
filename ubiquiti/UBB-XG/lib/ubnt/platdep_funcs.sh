# vim: ft=sh

#SYSNET=/proc/sys/net
SYSNET=/sys/class/net
FW_WRITELOG=/tmp/fwupdate.log
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

CHECKFILE="/etc/do-firmware-update"
_upgrade() {
	/bin/fwupdate -m

	# system should be rebooting - if not, something went wrong.
	return 1
}

_restart() {
	reboot -f
}

_restore_default() {
	# led: BOTH
	_set_led 3 120 1
	# this is where some other configs go
	touch /var/run/oled.factory_reset
	cfgmtd -c
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

active_scan_sync() {
	local radio=$1
	local vap=$2
	local radIdx=$(grep radio...devname=$2 /tmp/system.cfg | cut -f 2 -d '.')
	local ccaThreshEnabled=$(grep -c radio.$radIdx.hard_noisefloor.status=enabled /tmp/system.cfg)

	if [ $ccaThreshEnabled -gt 0 ]; then
		wifiX=$(grep radio.$radIdx.phyname /tmp/system.cfg | cut -f 2 -d '=')
		ccaVal=$(grep radio.$radIdx.hard_noisefloor.minrssi.value /tmp/system.cfg | cut -f 2 -d '=')
		iwpriv $wifiX sens_level 0
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

	if [ $ccaThreshEnabled -gt 0 ]; then
		wifiX=$(grep radio.$radIdx.phyname /tmp/system.cfg | cut -f 2 -d '=')
		ccaVal=$(grep radio.$radIdx.hard_noisefloor.minrssi.value /tmp/system.cfg | cut -f 2 -d '=')
		iwpriv $wifiX sens_level 0
	fi

	# just perform a fast scan -f
	ubntrfclient -i $radio -j $vap -f &> /dev/null

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
	ifconfig | grep wifi | awk '{print $1}'
}

# Find physical interfaces by band: 2 or 5
list_phys_ifs() {
	local band=$1
	for i in $(list_phys_ifs_all)
	do
		vap=`cat /var/run/${i}_devnames | grep -v vwire | grep -v wips | head -1`
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
				fi
			fi
		fi
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
	scan_radio wifi0 $@
	scan_radio wifi1 $@
}

ath_spectrum_scan() {
	radio=$1
	infinite=$2
	if [ -f /var/run/$1_devnames ]; then
		for ath in `cat /var/run/$1_devnames`; do
			for i in `seq 1  5`; do
				ifup=`ifconfig $ath | grep "\<UP\>"`
				if [ ! -z "$ifup" ]; then
					log "Starting: ubntrfclient -i $radio -j $ath -d 5 $infinite > /var/run/ubntrfclient.log.$radio"
					ubntrfclient -i $radio -j $ath -d 5 $infinite > /var/run/ubntrfclient.log.$radio 2>&1 &
					break
				else
					log "interface $ath is down, iteration $i"
				fi
				sleep 2
			done
			log "giving up on interface $ath after $i iterations"
		done
		log "ERROR: No interface available for spectralscan of radio $1"
	else
		log "/var/run/${1}_devnames does not exist."
	fi
}

spectrum_scan() {
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
		#exit_if_fake $cmd $*
		state_lock
		/usr/etc/rc.d/rc stop
		/usr/etc/rc.d/rc start spectrum.cfg
		state_reload
		state_unlock
		WIFI_COUNT=$(cat /proc/ubnthal/system.info  | grep -c wifi)
		for X in $(seq 0 1 $((WIFI_COUNT - 1))); do
			ENABLED=$(grep radio.$((X + 1)).rfscan= /tmp/spectrum.cfg | sed 's/.*=//')
			if [ "$ENABLED" = "enabled" ]; then
				echo "{}" > /var/run/rftable_wifi${X}
				log "Starting spectrum scan: ath_spectrum_scan wifi$X $infinite"
				ath_spectrum_scan wifi$X $infinite
			fi
		done
	else
		log "Please make sure /tmp/spectrum.cfg exist"
	fi
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

configure_uplink() {
	ath=$1
	target_mode=$2
	bridge="br0"
	# ILQ3, SPF4, and Gen2 (AC-PRO, etc) all use athr
	if [ -z "`wpa_supplicant | grep athr`" ]; then
		supplicant_driver=atheros
	else
		supplicant_driver=athr
	fi
	if [ -f /var/run/vapbridge.$ath ]; then
		bridge=`cat /var/run/vapbridge.$ath`
	fi
	if [ "$target_mode" == "up" ]; then
		if [ -f /var/run/uplink.conf ] && [ ! -f /var/run/wpa_vport_$ath.pid ]; then
			# device with only 1 uplink interface
			/usr/sbin/wpa_supplicant -D$supplicant_driver -i $ath -b $bridge \
				-c /var/run/uplink.conf \
				-B -P /var/run/wpa_vport_$ath.pid
		elif [ -f /var/run/uplink_$ath.conf ] && [ ! -f /var/run/wpa_vport_$ath.pid ]; then
			# device with multiple uplink interfaces
			/usr/sbin/wpa_supplicant -D$supplicant_driver -i $ath -b $bridge \
				-c /var/run/uplink_$ath.conf \
				-B -P /var/run/wpa_vport_$ath.pid
		elif [ -f /var/run/wpa_vport_$ath.conf ] && [ ! -f /var/run/wpa_vport_$ath.pid ]; then
			/usr/sbin/wpa_supplicant -D$supplicant_driver -i $ath -b $bridge \
				-c /var/run/wpa_vport_$ath.conf \
				-B -P /var/run/wpa_vport_$ath.pid
		fi
	else
		if [ -f /var/run/wpa_vport_$ath.pid ]; then
			kill `cat /var/run/wpa_vport_$ath.pid`
		fi
	fi
}

apply_restore_default() {
    rm -rf /etc/persistent/cfg/mgmt /etc/persistent/cfg/blocked_sta
    cfgmtd -f /etc/default.cfg -p /etc -w
    sleep 5
}
