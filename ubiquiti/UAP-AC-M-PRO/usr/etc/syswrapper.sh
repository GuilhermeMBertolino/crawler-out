#!/bin/sh

. /usr/bin/unifi_util_funcs.sh
. /usr/etc/common.sh
. /usr/etc/platdep_funcs.sh

check_n_killall() {
	signal=$1
	proc=$2
	pid=$(pidof ${proc})
	if [ -n "${pid}" ]; then
		killall -${signal} ${proc}
	fi
}
guest_portal_enabled() {
	get_config_enabled /tmp/system.cfg "redirector.status"
}
DEFAULT_GUEST_IPSET='guest_authorized_mac'
. /usr/bin/guest_portal_funcs.sh

SCRIPT="$0"
SYSID=$(get_config_value /proc/ubnthal/system.info systemid)
MTK_UAP=`grep radio0 /proc/ubnthal/system.info | grep -c -e MT`
QCA_UAP_MAPLE_DAKOTA=`grep -c -e Maple -e Dakota /proc/ubnthal/system.info`
RADIO_MT7622=`grep radio0 /proc/ubnthal/system.info | grep -c -e MT7622`
RADIO_MT7915=`grep radio1 /proc/ubnthal/system.info | grep -c -e MT7915`
RADIO_MT7981=`grep radio0 /proc/ubnthal/system.info | grep -c -e MT7981`
DEFAULT_CFG='/tmp/default.cfg'
SYSTEM_STATE='/var/run/system.state'
SYSTEM_CONTROLLER_IP='/var/run/system.controller.ip'
LED_LOCK='/var/run/led.lock'
FW_LOCKFILE="/var/run/fwupdate.pid"
FW_MD5SUMFILE="/var/run/fwupdate.md5"
FW_WRITELOG="/tmp/fwupdate.log"
FW_DOWNLOAD_FAILED_FILE="/var/run/download_firmware.failed"
MCA_CTRL_INFORM_UPTIME="/var/run/mca-ctrl.send-inform.uptime"
WIFI_10_4="/lib/wifi/qca-wifi-modules"
UAPNANOHD=`grep -c MT7621 /proc/cpuinfo`
NETCONSOLE_PIDFILE=/var/run/netconsole-init.pid
PID_11K=/var/run/11k.pid
ALLOWED_UPLINKS="/var/run/allowed_uplinks"
ISOLATION_LOGS_LOCATION='/etc/persistent/isolation_logs'
ISOLATION_LOGS_LOCATION_SENT="${ISOLATION_LOGS_LOCATION}_sent"
ISOLATION_LOGS_LOCATION_META="${ISOLATION_LOGS_LOCATION}/meta"
HOSTAPD_CONFIG_DIR="/etc/hostapd"
HOSTAPD_RUN_DIR="/var/run/hostapd"
PRS_DEVNODE='/dev/ttyACM0'
PRS_MOD='prs_falcon'
PRS_INTC='wlan0'
case "$SYSID" in
	# U6-IW or U6-Enterprise-IW
	a652 | a656)
		SWITCH_IFACE='switch1'
	;;
	*)
		SWITCH_IFACE='switch0'
	;;
esac
SWITCH_PROC="/proc/$SWITCH_IFACE"
SYSLOG_FILE="/var/log/messages"
UPLINK_FILE="/var/run/system.uplink"
UPLINK_FILE_PREV="${UPLINK_FILE}.prev"
UPLINK_FILE_LOOP="${UPLINK_FILE}.loop"
VLANS_FILE=/var/run/vlans
IS_WIFI_ONLY_AP=`[ "$SYSID" = "ec25" -o "$SYSID" = "a613" -o "$SYSID" = "a653" ] && echo "true"`
IS_WIFI6E_AP=`[ "$SYSID" = "a654" -o "$SYSID" = "a656" -o "$SYSID" = "a657" ] && echo "true"`
call_plat() {
	local FUNC="plat_$1"
	local DEF_FUNC="default_plat_$1"
	shift
	if type -t $FUNC > /dev/null; then
		$FUNC "$@"
		return $?
	elif type -t $DEF_FUNC > /dev/null; then
		$DEF_FUNC "$@"
		return $?
	fi
}

_lockfile() {
	local rc
	dotlockfile -l -p -r $1 "$2"
	rc=$?
	return $rc
}

_unlockfile() {
	dotlockfile -u $1
}

add_stat() {
	local n=$(cat "$1" 2>/dev/null)
	local inc=$2
	echo $((n+inc)) > "$1"
}

# Set the system LED by mode (Translate LED pattern to LED mode)
# 1 = Turn off LED
# 2 = Device wait for adopt
# 3 = Device be located and it's default
# 4 = Device be located and it isn't default
# 5 = Reset to default
# 6 = Firmware upgrade
# 7 = Wi-Fi connecting
# 8 = Wi-Fi signal is weak
# 9 = Wi-Fi signal is medium
# 10 = Wi-Fi signal is strong

_signal_indicator() {
    if iwconfig 2>/dev/null | grep -q 'Access Point: Invalid'; then
        return 7
    fi
    local SNR=`grep ath /proc/net/wireless | awk '{print $3}' | sed 's/\.//' | grep -v ^0`
    SNR=$(($SNR*100/94))
    if [ $SNR -gt 45 ]; then
        return 10
    fi
    if [ $SNR -gt 30 ]; then
        return 9
    fi
    return 8
}

_set_mode() {
    local mode=0
    case "$1" in
        "0")  mode=1 ;;
        "2")  mode=2 ;;
        "20") mode=3 ;;
        "10") mode=4 ;;
        "3")  mode=5 ;;
        "12") mode=6 ;;
        "11111110") mode=7 ;;
        "1") _signal_indicator; mode=$? ;;
    esac
    echo $mode > /proc/gpio/led_mode
}

# Set the system LED. (On the UWB-XG Stadium AP, there are two LEDs: a system
# LED and a perimeter LED.) Enables/disables synchronization of system LED
# and perimeter LED for Stadium AP.
#
# Args:
# -- LED pattern (e.g., "12" will alternate blue and white)
# -- LED tempo, in beats per minute, integer
# -- Synchronize system LED with UWB-XG Stadium AP perimeter LED. Integer.
#    If 0, and running on UWB-XG, disables synchronization; else enables
#    sychronization
_set_led() {
	if [ -e "/proc/ubnt_ledbar/sysled_sync" ]; then
		echo "$3" > /proc/ubnt_ledbar/sysled_sync
	fi
	_lockfile 1 ${LED_LOCK}
	if [ -e "/proc/gpio/led_mode" ]; then
		_set_mode $1
	else
		echo $1 > /proc/gpio/led_pattern
		echo $2 > /proc/gpio/led_tempo
	fi
	_unlockfile ${LED_LOCK}
	if [ -x "/sbin/lcm-ctrl" ]; then
		/sbin/lcm-ctrl -t state
	fi
}

log() {
	logger -s -t "syswrapper" "$*"
}

error_log() {
	logger -s -p 3 -t "syswrapper" "ERROR: $*"
}

debug_log() {
	[ -e /tmp/syswrapper.debug ] && logger -s -t "syswrapper" "$*"
}

kill_pid() {
	local service_name="$1"
	local service_pid="$2"
	local retries=3

	i=1
	while [ $i -le $retries ]; do
		if kill "$service_pid" 2>/dev/null; then
			return 0
		fi
		sleep 1
		i=$((i+1))
	done

	if kill -0 "$service_pid" 2>/dev/null; then
		log "${service_name}[${service_pid}] is blocked. Killing with signal 9"
		if kill -KILL "$service_pid" 2>/dev/null; then
			return 0
		fi
	else
		return 0
	fi
	return 1
}

dump_syslog_to_persistent() {
	local ISOLATION_LOG_TMP='/var/log/isolation'
	local WUL_INFO_TMP='/var/log/wul_info'
	local LOOP_PKT_TMP='/var/log/loop_pkt.pcap'
	local uplink_eth=`cat /var/run/uplink_eth`
	local uplink_wds=`cat /var/run/uplink_wds`
	local uplink_model=$1
	# Each log takes up to ~8kB after compression
	local ISOLATION_LOG_LENGTH=500
	local ISOLATION_LOG_LIMIT=4

	if [ -e "$SYSLOG_FILE" ]; then
		tail -n "$ISOLATION_LOG_LENGTH" "$SYSLOG_FILE" > "$ISOLATION_LOG_TMP"
	else
		echo "Missing $SYSLOG_FILE" > "$ISOLATION_LOG_TMP"
		dmesg | tail -n "$ISOLATION_LOG_LENGTH" >> "$ISOLATION_LOG_TMP"
	fi

	ifconfig $uplink_eth | grep HWaddr > $WUL_INFO_TMP
	ifconfig $uplink_wds | grep HWaddr >> $WUL_INFO_TMP
	echo "uplink_model: $uplink_model" >> $WUL_INFO_TMP

	# remove old logs if we have more than a specified limit
	rm -f `ls -d ${ISOLATION_LOGS_LOCATION}/isolated_* | head -n -${ISOLATION_LOG_LIMIT}`

	# prune sent and meta files when a log file has been removed
	for FILE in ${ISOLATION_LOGS_LOCATION_SENT}/* ${ISOLATION_LOGS_LOCATION_META}/* ; do
		[ -f "${ISOLATION_LOGS_LOCATION}/$(basename ${FILE})" ] || rm -f ${FILE}
	done

	mkdir -p ${ISOLATION_LOGS_LOCATION}
	local TIMESTAMP=`date +%s`
	tar -czf ${ISOLATION_LOGS_LOCATION}/isolated_${TIMESTAMP}.tar.gz ${ISOLATION_LOG_TMP} ${LOOP_PKT_TMP} ${WUL_INFO_TMP}
	rm -f ${ISOLATION_LOG_TMP} ${LOOP_PKT_TMP} ${WUL_INFO_TMP}
}

exit_if_fake() {
	if [ "`uname -m | grep -E \"mips|arm|aarch64\"`" = "" -o -f "/tmp/FAKE" ] ; then
		# fake, simply dump it to console and exit 0
		logger -s -t "syswrapper" "[fake] skipping $*"
		exit 0
	fi
}

set_state() {
	echo $1 > ${SYSTEM_STATE}
	logger -s -t "syswrapper" "[set_state] $1"
}

# Handles following special cases for LED:
# -- Locating (flashing)
# -- Disabled (off)
# -- Pattern/tempo override
# Overrides LED configuration if special cases apply.
#
# Args:
# -- Desired LED pattern
# -- Desired LED tempo
# Returns:
# -- 0 if special case applied, and LED pattern/tempo
#    has been overridden and set
# -- 1 if no special case applied (and caller can proceed
#    to set LED or Stadium LED bar as desired).
handle_led_special_cases() {
	local led_pattern=$1
	local led_tempo=$2
	local handled=0
	local locating="false"
	local led_disabled=
	local led_pattern_override=
	local led_tempo_override=

	if [ -f /proc/ubnthal/status/IsLocated ]; then
		locating=$(cat /proc/ubnthal/status/IsLocated)
	fi
	if [ -f /proc/ubnthal/status/IsDefault ]; then
		default=$(cat /proc/ubnthal/status/IsDefault)
	fi
	if [ -f /var/etc/persistent/cfg/mgmt ] ; then
		led_disabled=$(grep mgmt.led_enabled=false /var/etc/persistent/cfg/mgmt | tail -1)
		led_pattern_override=$(grep mgmt.led_pattern_override /var/etc/persistent/cfg/mgmt | cut -d= -f 2 | tail -1)
		led_tempo_override=$(grep mgmt.led_tempo_override /var/etc/persistent/cfg/mgmt | cut -d= -f 2 | tail -1)
	fi
	if [ ! -z "$led_pattern_override" ]; then
		led_pattern=$led_pattern_override
		handled=1
	fi
	if [ ! -z "$led_tempo_override" ]; then
		led_tempo=$led_tempo_override
		handled=1
	fi
	if [ ! -z "$led_disabled" ]; then
		led_pattern=0
		led_tempo=120
		handled=1
	fi
	if [ "$locating" = "true" ]; then
		if [ "$default" = "true" ]; then
			led_pattern=20
			led_tempo=480
			handled=1
		else
			led_pattern=10
			led_tempo=480
			handled=1
		fi
	fi

	if [ "$handled" -eq 1 ]; then
		# For special cases, system LED and perimeter LED should
		# be synchronized (for UWB-XG).
		_set_led $led_pattern $led_tempo 1
		return 0
	else
		return 1
	fi
}

# Set LED on AP, and for UWB-XG, synchronize sysled with perimeter LED.
#
# Args:
# -- LED pattern (e.g., 12 will alternate blue-white-blue-white...).
# -- LED tempo (in beats per minute)
#
# If special cases apply (LED disabled, LED locating, etc.), LED pattern
# and tempo passed in arguments will be overridden.
set_led() {
	led_pattern=$1
	led_tempo=$2

	if [ "${MTK_UAP}" = "1" -a "${RADIO_MT7915}" = "1" -a ! -f /var/run/ble_fw_skipdownload ] ; then
		log "In ble fw download process..."
		return;
	# Handle special cases (LED disabled, LED locating, etc.)
	elif handle_led_special_cases $led_pattern $led_tempo; then
		# Handled and set
		return;
	else
		# Special case did not apply. Set desired LED and tempo.
		# Ensure sysled is synchronized with perimeter LED on
		# UWB-XG (set_led is called for some cases, like wireless
		# uplink issues).
		_set_led $led_pattern $led_tempo 1
	fi
}

is_setup_completed() {
	get_config_value /etc/persistent/cfg/mgmt mgmt.is_setup_completed false
}

# Sets LED for "ready" color/pattern.
#
# No arguments.
set_ready_led() {
    # Solid blue.
    set_led 1 120
}

lockfile() {
	local rc
	_lockfile 0 "$1.lock"
	rc=$?
	return $rc
}

unlockfile() {
	_unlockfile "$1.lock"
}

state_lock() {
	until lockfile ${SYSTEM_STATE}; do
		log "[state is locked] waiting for lock"
		sleep 1
	done
}

state_unlock() {
	unlockfile ${SYSTEM_STATE}
}

# obtain lock first
set_state_ready() {
	set_state 'ready'
	state_reload
}

exit_if_busy() {
	if [ -f ${SYSTEM_STATE} ] ; then
		state=`cat ${SYSTEM_STATE}`
		if [ "$state" != "ready" ] ; then
			logger -s -t "syswrapper" "[busy] skipping: $*"
			exit 0
		fi
	fi
}

# this would lock system state
exit_if_state_lock_failed() {
	lockfile ${SYSTEM_STATE} || \
	{
		log "[state is locked] skipping $*"
		exit 0
	}
}

is_wds() {
	if [ -f ${UPLINK_FILE} ]; then
		local UPLINK=`cat ${UPLINK_FILE}`
		if [ "${UPLINK}" = "wds" ]; then
			return 0
		fi
	fi
	return 1
}

check_if_ip_ready() {
	local x=0
	while [ ! -e /var/run/ipready.* ]; do
		logger "download-firmware: waiting for IP..."
		sleep 1
		x=$((x+1))
		if [ $x -gt 60 ]; then
			upgrade_err "98" "IPIsNotReady"
			return 1
		fi
	done
	return 0
}

ble_stp_check() {
	local rev=$(get_config_value /proc/ubnthal/system.info boardrevision)
	local bomrev="0x$(grep -w -E bomrev /proc/ubnthal/board | cut -d= -f2)"

	if [ "$SYSID" = "a612" -a $(( bomrev >> 8 )) -eq 773 -a $rev -lt 13 ] || [ "$SYSID" = "a620" -a $(( bomrev >> 8 )) -eq 744 -a $rev -lt 10 ] || [ "$SYSID" = "a614" -a $(( bomrev >> 8 )) -eq 742 -a $rev -lt 15 ]; then
		return 1
	fi
	return 0
}

ble_check() {
	local is_default=$(get_fw_env is_default)
	local ipaddr=$(get_fw_env ipaddr)
	if [ "${MTK_UAP}" = "1" -a "${RADIO_MT7915}" = "1" ]; then
		if ble_stp_check; then
			if [ ! -f /var/run/ble_stp_checked ]; then
				ble_stp
				touch /var/run/ble_stp_checked
			fi
			if [ ! -f /var/run/ble_fw_checked ]; then
				$0 cfg_save_check
				ble_fw_check
				#touch /var/run/ble_fw_checked
			fi

			if [ -f /var/run/ubnt_btmw_done -a ! -f /var/run/ubnt_btmw_checked -a "${is_default}" = "false" ]; then
				touch /var/run/ubnt_btmw_checked
				$0 cfg_save_check
				check_n_killall SIGTERM ubnt-btmw-rpc
				check_n_killall SIGTERM btservice
				sleep 1
				boots -c reset
				boots -c radio -b 6 -e 6 -m 7 -s 0 -o 0
				killall boots_srv
				# TODO: this inittab entry should probably be handled in ubntconf
				sed -i '/btservice/d' /etc/inittab
				echo "null::respawn:/usr/bin/btservice" >> /etc/inittab
				#echo "null::respawn:/usr/sbin/bleconnd --syslog /etc/persistent/cfg/bleconn.json" >> /etc/inittab
				init -q
			fi

		else
			if [ -f /var/run/ubnt_btmw_done -a ! -f /var/run/ubnt_btmw_checked -a "${is_default}" = "false" ]; then
				touch /var/run/ubnt_btmw_checked
				check_n_killall SIGTERM ubnt-btmw-rpc
				check_n_killall SIGTERM btservice
			fi
		fi

		if [ ! -f /var/run/ubnt_ipaddr_checked ]; then
			if [ "${ipaddr}" != "192.168.1.20" ]; then
				set_fw_env ipaddr 192.168.1.20
			fi
			touch /var/run/ubnt_ipaddr_checked
		fi
	fi
	if [ "${QCA_UAP_MAPLE_DAKOTA}" = "1" ]; then
		if [ ! -f /var/run/ubnt_btmw_checked -a "${is_default}" = "false" ]; then
			touch /var/run/ubnt_btmw_checked
			check_n_killall SIGTERM ubnt-btmw-rpc
		fi
	fi
}

# obtain lock first
state_reload() {
	state="init"
	uplink="unknown"
	default="true"
	locating="false"
	prev_uplink="unknown"
	uplink_loop="false"
	if [ -f /proc/ubnthal/status/IsDefault ]; then
		default=`cat /proc/ubnthal/status/IsDefault`
	fi
	if [ -f /proc/ubnthal/status/IsLocated ]; then
		locating=`cat /proc/ubnthal/status/IsLocated`
	fi
	if [ -f ${SYSTEM_STATE} ] ; then
		state=`cat ${SYSTEM_STATE}`
	fi
	if [ -f ${UPLINK_FILE} ]; then
		uplink=`cat ${UPLINK_FILE}`
		if [ -e ${UPLINK_FILE_PREV} ]; then
			prev_uplink=`cat ${UPLINK_FILE_PREV}`
		else
			prev_uplink=$uplink
		fi
		echo $uplink > ${UPLINK_FILE_PREV}
	fi
	if [ -f ${UPLINK_FILE_LOOP} ]; then
		uplink_loop=`cat ${UPLINK_FILE_LOOP}`
	fi
	if [ "$state" = "upgrading" ]; then
		# echo upgrading
		set_led 12 120
		return
	fi

	ble_check

	if [ "$default" = "true" ]; then
		# echo default-ready
		set_led 2 120
		if [ "$uplink" = "eth" ]; then
			configure_vap down up up
		else
			if [ "$IS_WIFI_ONLY_AP" = "true" ]; then
				# special handle for UDM-B and U6-Extender aplink-test
				configure_vap up up down
			else
				configure_vap up down down
			fi
		fi
		return
	fi
	if [ -f /var/run/system.selfrun ]; then
		# echo selfrun
		set_selfrun
	else
		# echo managed
		unset_selfrun
	fi

	case $uplink in
	eth)
		# Resolve the "5G vaps stay down" issue sometimes seen when switching between
		# wireless and wired uplink mode on 10.4
		if [ -e "$WIFI_10_4" -a "$prev_uplink" != "eth" ]; then
			configure_vap down down up
		fi
		if [ "$uplink_loop" = "true" ]; then
			configure_vap down up down
		else
			configure_vap down up up
		fi
		if [ "$prev_uplink" != "eth" ]; then
			channel_resume
		fi
		set_ready_led
		return
		;;
	wds)
		if [ -f /var/run/vport_down ]; then
			log "[state_reload][wds] vport down"
			configure_vap up down down
		elif [ -f /var/run/system.mesh ]; then
			configure_vap up up up
		else
			configure_vap up up down
		fi
		set_ready_led
		return
		;;
	down)
		if [ -f /var/run/system.isolated_wlan_on ]; then
			configure_vap up up down
			set_led 11111110 120
		else
			if [ "$prev_uplink" = wds ]; then
				configure_vap down down down
				add_stat /var/run/vwire_disconnected.count 1
			else
				configure_vap up down down
			fi
			set_led 11111110 120
		fi
		return
		;;
	lte_prov)
		# do nothing. lte provisioning wifi network is separate from udhcpc interface.
		;;
	esac

	if [ "$state" = "ready" ]; then
		# echo ready
		set_ready_led
		return
	fi

	# echo $state
	set_led 2 120
}

set_selfrun() {
	if [ -f /var/run/system.selfrun.lock ]; then
		return
	fi
	touch /var/run/system.selfrun.lock
	# Disconnect could be due to switch port native vlan change
	renew_all_ips
	if guest_portal_enabled ; then
		if [ "`selfrun_guest`" = "pass" ]; then
			# echo selfrun-guest
			# bypass the guest authorization
			guest_bypass_ebtables_authorized "" true
		else
			# echo selfrun-no-guest
			# disable guest wlans
			for ath in `cat /var/run/guest_devnames` ; do
				ifconfig $ath down
			done
		fi
	fi
}

unset_selfrun() {
	if [ -f /var/run/system.selfrun.lock ]; then
		rm -f /var/run/system.selfrun.lock
		if guest_portal_enabled ; then
			if [ "`selfrun_guest`" = "pass" ]; then
				# echo unset-selfrun-guest
				# re-enforce the guest authorization
				guest_bypass_ebtables_authorized "" false
			else
				# echo unset-selfrun-no-guest
				# re-enable guest wlans -- current disabled
				for ath in `cat /var/run/guest_devnames` ; do
					ifconfig $ath up
				done
			fi
		fi
	fi
}

schedule_action() {
	if [ -f ${UPLINK_FILE} ]; then
		# need to check system state busy first in case the deac lock for the syswrapper.sh
		exit_if_busy $cmd $*
		exit_if_state_lock_failed $cmd $*
		state_reload
		state_unlock
	else
		configure_vap down up up
	fi
}

# check if interface is within schedule inside /var/run/schedules/schedule_*.ath* file
within_schedule() {
	schedule="/var/run/schedules/schedule.$1"
	ntpfile="/var/run/ntp.ready"
	now=`date "+%w %H:%M %Y"`
	mode="up"

	[ -f /var/run/schedules/schedule_invert.$1 ] && mode="down"

	# if ntp has not run yet and time is bad, we assume always within schedule
	if [ -e $ntpfile ]; then
		if [ -e $schedule ]; then
			blocks=`grep ${now:0:1}= $schedule`
			todayMins=`expr ${now:2:2} \* 60 + ${now:5:2}`
			for b in $blocks; do
				b=${b:2}
				fromMins=`expr ${b:0:2} \* 60 + ${b:3:2}`
				toMins=`expr ${b:6:2} \* 60 + ${b:9:2}`
				if [ $todayMins -ge $fromMins ] && [ $todayMins -le $toMins ]; then
					if [ "$mode" = "up" ]; then
						echo "true"
					else
						echo "false"
					fi
					return
				fi
			done
			if [ "$mode" = "up" ]; then
				echo "false"
			else
				echo "true"
			fi
		else
			log 'schedules not found in /var/run/schedules'
			echo "false"
		fi
	else
		log 'current time is not set yet'
		echo "true"
	fi
}

configure_vap() {
	[ ! -z "$3" ] && [ -f /var/run/wlan_devnames ] || return
	vaps=`cat /var/run/wlan_devnames`
	run_vap=
	stop_vap=
	uplink_vaps=
	allowed_uplinks=
	downlink_vaps=
	n_uplink_vaps=0
	uplink_states=
	uplink_state=$1
	service_state=$2
	downlink_state=$3
	if [ -f $ALLOWED_UPLINKS ]; then
		allowed_uplinks=`cat $ALLOWED_UPLINKS`
	fi

	for ath in $vaps; do
		usage="unknown"
		if [ -f /var/run/vapusage.$ath ]; then
			usage=`cat /var/run/vapusage.$ath`
		fi
		if [ -f ${HOSTAPD_RUN_DIR}/cfg_error.$ath ]; then
			usage=unusable
		fi
		case $usage in
		uplink)
			n_uplink_vaps=`expr $n_uplink_vaps + 1`
			uplink_vaps="$uplink_vaps $ath"
			if [ "$uplink_state" = "down" ]; then
				stop_vap="$stop_vap $ath"
				uplink_states="$uplink_states down"
			else
				# 3 cases to "up" a vport interface when uplink_state = up
				# 1. no ALLOWED_UPLINKS file, wpa_supplicant will run
				# 2. ALLOWED_UPLINKS file is empty, wpa_supplicant will not run
				#    (assume device with multiple vport, set all vports up for scanning)
				# 3. interface listed in ALLOWED_UPLINKS file, wpa_supplicant will run
				#    (assume device with multiple vport, set selected vport for uplink)
				if [ ! -f $ALLOWED_UPLINKS ]; then
					# case 1 above
					run_vap="$run_vap $ath"
					uplink_states="$uplink_states up"
				else
					if [ -z "$allowed_uplinks" ]; then
						# case 2 above
						if [ -f /var/run/system.multi_uplink ]; then
							run_vap="$run_vap $ath"
						fi
						uplink_states="$uplink_states down"
					else
						# case 3 above
						is_allowed_uplink="false"
						for allowed_uplink in $allowed_uplinks; do
							if [ $ath = $allowed_uplink ]; then
								if [ -f /var/run/system.multi_uplink ]; then
									run_vap="$run_vap $ath"
								fi
								uplink_states="$uplink_states up"
								is_allowed_uplink="true"
								break
							fi
						done
						if [ $is_allowed_uplink = "false" ]; then
							if [ -f /var/run/system.multi_uplink ]; then
								stop_vap="$stop_vap $ath"
							fi
							uplink_states="$uplink_states down"
						fi
					fi
				fi
			fi
			;;
		user)
			if [ "$service_state" = "down" ]; then
				stop_vap="$stop_vap $ath"
			else
				scheduled=`within_schedule $ath`
				if [ $scheduled = "true" ]; then
					run_vap="$run_vap $ath"
				else
					stop_vap="$stop_vap $ath"
				fi
			fi
			;;
		guest)
			if [ "$service_state" = "down" ]; then
				stop_vap="$stop_vap $ath"
			elif guest_portal_enabled && [ -f /var/run/system.selfrun -a "`selfrun_guest`" = "off" ]; then
				stop_vap="$stop_vap $ath"
			else
				scheduled=`within_schedule $ath`
				if [ $scheduled = "true" ]; then
					run_vap="$run_vap $ath"
				else
					stop_vap="$stop_vap $ath"
				fi
			fi
			;;
		downlink)
			if [ "$downlink_state" = "down" ]; then
				stop_vap="$stop_vap $ath"
			else
				run_vap="$run_vap $ath"
				downlink_vaps="$downlink_vaps $ath"
			fi
			;;
		wireless-bridge)
			run_vap="$run_vap $ath"
			;;
		wireless-bridge-failover)
			# Bring down the failover link in default state no matter
			# udhcpc lease fail or not
			if [ "$ath" = "${PRS_INTC}" ]; then
				brctl delif br0 $ath
			fi
			stop_vap="$stop_vap $ath"
			;;
		esac
	done

	# Currently we set vap_ind = 1 for wds vap, simply relying
	# on uplink-monitor to adjust vap status.
	# QCA requires wds vap to be up before all ap vap.

	for ath in $stop_vap; do
		ifconfig $ath down
	done
	for ath in $run_vap; do
		ifconfig $ath up
	done
	for ath in $downlink_vaps; do
		# skip U6-Pro mt7622 radio since it dose not support VWIRE
		var=`expr substr "$ath" 3 1`
		if [ "${MTK_UAP}" = "1" -a "${RADIO_MT7622}" = "1" -a "${var}" != "i" ]; then
			continue
		fi
		# need to move to platform_funs.sh
		if [ "${MTK_UAP}" = "1" ]; then
			uif_str="set uif="
		else
			uif_str="uif "
		fi
		if [ `cat ${UPLINK_FILE}` = "eth" ]; then
			iwpriv $ath ${uif_str}1
		elif [ `cat ${UPLINK_FILE}` = "wds" ]; then
			iwpriv $ath ${uif_str}2
		fi
	done
#	log "[configure_vap] \$n_uplink_vaps = $n_uplink_vaps"
#	log "[configure_vap] \$uplink_vaps = $uplink_vaps"
#	log "[configure_vap] \$uplink_states = $uplink_states"
	for i in `seq 1 $n_uplink_vaps`; do
		ath=`echo $uplink_vaps | cut -d " " -f $i`
		action=`echo $uplink_states | cut -d " " -f $i`
		configure_uplink $ath $action
	done
}

run_ssh_safe() {
	if [ -n "$SSH_CLIENT" ]; then
		# Some commands may restart ssh daemon, so we need to safely
		# background the command so it can continue if ssh disconnects
		local LOG=/tmp/syswrapper.log.$$
		echo -n > $LOG
		exec 3< $LOG
		tail -f <&3 &
		local TAIL_PID=$!
		export SSH_CLIENT=""
		export UI_SSH_SAFE_CONTEXT="$LOG $TAIL_PID"
		setsid "$SCRIPT" "$cmd" "$@" >>$LOG 2>&1 </dev/null 3<&- &
		wait $TAIL_PID
		cat <&3 # Dump anything that tail might have missed
		exit 0
	fi

	set -- $UI_SSH_SAFE_CONTEXT
	[ $# -eq 2 ] || return
	local LOG=$1
	local TAIL_PID=$2
	local CLEAN_UP="kill $TAIL_PID 2>/dev/null; rm -f $LOG"
	trap "$CLEAN_UP; exit 0" HUP INT QUIT TERM EXIT
}

set_cfg_save() {
	[ -f /var/run/need_cfg_save ] || touch /var/run/need_cfg_save
	state_reload
}

# mac2serial <mac>
mac2serial() {
	echo $1 | sed -e 's/://g' -e 'y/ABCDEF/abcdef/'
}

# pkill_generic <process_name> [signal] [args]
pkill_generic() {
	local process=$1
	local signal=$2
	shift; shift;
	local SIG_FIRST=$(/usr/bin/pkill 2>&1 | grep Usage | grep -c "\-SIGNAL")
	if [ $SIG_FIRST -eq 1 ]; then
		/usr/bin/pkill $signal $* "$process";
	else
		/usr/bin/pkill $* $signal "$process";
	fi
}

selfrun_guest() {
	selfrun_guest_mode=`grep selfrun_guest_mode /etc/persistent/cfg/mgmt | cut -d= -f 2`
	if [ "$selfrun_guest_mode" = "off" ]; then
		echo "off"
	else
		echo "pass"
	fi
}

abort_60g_radio_scan() {
	if [ -c ${PRS_DEVNODE} ] && [ -n "`lsmod | grep ${PRS_MOD}`" ]; then
		prsnl dev ${PRS_INTC} scan abort
	fi
}

do_upgrade() {
	local rc
	set_state 'upgrading'
	abort_60g_radio_scan

	need_cfg_save_file=/var/run/need_cfg_save
	lock_count=60

	# stop and lock sysmon from calling cfgmtd
	until lockfile ${need_cfg_save_file}; do
		if [ ${lock_count} -le 0 ]; then
			error_log "do_upgrade: Timed out trying to lock ${need_cfg_save_file}"
			break
		fi
		lock_count=$((lock_count - 1))
		sleep 1
	done
	rm -f ${need_cfg_save_file}

	# save cfg by calling cfgmtd 
	sanitize_cfg
	cfgmtd -w -p /etc /tmp/system.cfg
	log "do_upgrade cfgmtd: "$?

	# check if config is saved
	ls -alR /etc/persistent/ |logger
	cfgmtd -r -p /tmp/run -f /tmp/run/read.cfg
	ls -alR /tmp/run/persistent/ |logger
	ls -al /tmp/run/read.cfg /tmp/system.cfg |logger
	rm -rf /tmp/run/persistent /tmp/run/read.cfg

	# If early upgrade is supported, we will defer blue/white LED state until the actual
	# upgrade is performed diring the next reboot
	if [ ! -e /usr/etc/rc.early_upgrade ]; then
		# if led is disabled, enable it during upgrading
		if [ -d "/proc/ubnt_ledbar" ]; then
			color=`cat /proc/ubnt_ledbar/color`
			if [ "$color" = "0,0,0" ]; then
				echo "3" > /proc/ubnt_ledbar/color
			fi
			brightness=`cat /proc/ubnt_ledbar/brightness`
			if [ "$brightness" = "0" ]; then
				echo "255" > /proc/ubnt_ledbar/brightness
			fi
		fi
		_set_led 12 120 1
	fi
	# Validate firmware before tearing down services
	if fwupdate.real -c; then
		_upgrade
		rc=$?
	else
		rc=1
	fi
	unlockfile ${need_cfg_save_file}
	set_state_ready
	return ${rc}
}

do_upgrade_keeprunning() {
	local rc
	set_state 'upgrading'
	_set_led 12 120 1
	_upgrade_keep_running
	rc=$?
	set_state_ready
	return ${rc}
}

do_fast_apply() {
	rm -rf /tmp/apply.sh
	if ubntconf -c /tmp/system.cfg -p /tmp/running.cfg -d /tmp/apply.sh; then
		log "[apply-config] using fast apply"
		if [ -f /tmp/apply.sh ]; then
			if /bin/sh /tmp/apply.sh > /var/log/fastapply 2>&1; then
				cp -f /tmp/running.cfg /tmp/previous.cfg
				cp -f /tmp/system.cfg /tmp/running.cfg
				return 0
			fi
			log "[error] fast-apply failed"
			return 1
		fi
		return 0
	fi
	return 1
}

do_custom_alert() {
	if [ `expr $# % 2` -ne 0 ];then
		echo "$# not pairwise input!!"
		return 1
	fi

	if [ "$2" = "STA_ASSOC_TRACKER" ]; then
		grep ^mgmt.capability.*notif-assoc-stat /var/etc/persistent/cfg/mgmt >/dev/null 2>&1
		if [ $? -ne 0 ]; then
			return 1
		fi
	fi

	input_key_value=
	while [ $# -ne 0 ];do
		key=$(echo "$1" | tr '\n' ' '| sed 's/ $//')
		val=$(echo "$2" | tr '\n' ' '| sed 's/ $//')
		input_key_value="$input_key_value -k \"$key\" -v \"$val\""
		shift
		shift
	done
	sh -c "/usr/bin/mca-custom-alert.sh ${input_key_value}"
}

helper_ssid_war() {
	default="false"
	if [ -f /proc/ubnthal/status/IsDefault ]; then
		default=`cat /proc/ubnthal/status/IsDefault`
	fi
	if [ "$default" = "true" ]; then
		if [ "$SYSID" = "e302" -o "$SYSID" = "e502" -o "$SYSID" = "e512" -o "$SYSID" = "e532" -o "$SYSID" = "e562" -o "$SYSID" = "e592" ]; then
			killall -1 hostapd
		fi
	fi
}

renew_all_ips() {
	killall -SIGUSR2 udhcpc 2>/dev/null
	killall -SIGUSR1 udhcpc 2>/dev/null
}

renew_ip_on_subnet_change() {
	local ifname=$1
	local newDhcpStart=$2
	local newDhcpStop=$3
	local newSubnet=$4
	local newNetmask=$5
	local startRetry=$6
	local retryTimer=$7
	local stopRetry=$8
	local pid=`cat /var/run/udhcpc.$ifname.pid`
	#sleep for a while to give some time for subnet change, dhcp server restart
	log "renew_ip_on_subnet_change sleeps for $startRetry seconds"
	sleep $startRetry
	# try to renew ip for at most stopRetry(300) seconds.
	while [ $stopRetry -gt 0 ]; do
		#release current release and obtain a new lease
		kill -SIGUSR2 $pid
		kill -SIGUSR1 $pid
		log "renew_ip_on_subnet_change sleeps for $retryTimer seconds"
		sleep $retryTimer
		stopRetry=$((stopRetry - retryTimer))

		local ip=`ifconfig $ifname | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*'`
		if [ ! -z "$ip" ]; then
			local valid=1
			local ip_long=0
			local dhcpStart_long=0
			local dhcpStop_long=0
			#check if the device ip is in the new subnet. If so, we are done.
			for i in 1 2 3 4; do
				local ip_octet=`echo "$ip" | cut -d . -f $i`
				local netmask_octet=`echo "$newNetmask" | cut -d . -f $i`
				local subnet_octet=`echo "$newSubnet" | cut -d . -f $i`
				if [ $(( $ip_octet & $netmask_octet )) -ne $subnet_octet ]; then
					valid=0
					break
				fi
			        #check if the device ip is within the dhcp range.
				local dhcpStart_octet=`echo "$newDhcpStart" | cut -d . -f $i`
				local dhcpStop_octet=`echo "$newDhcpStop" | cut -d . -f $i`
				ip_long=$((ip_long<<8))
				ip_long=$((ip_long+ip_octet))
				dhcpStart_long=$((dhcpStart_long<<8))
				dhcpStart_long=$((dhcpStart_long+dhcpStart_octet))
				dhcpStop_long=$((dhcpStop_long<<8))
				dhcpStop_long=$((dhcpStop_long+dhcpStop_octet))
			done
			if [ "$valid" -eq 1 ]; then
				if [ "$ip_long" -ge "$dhcpStart_long" ] && [ "$ip_long" -le "$dhcpStop_long" ]; then
					log "dhcp renew: got a valid ip. ip: $ip. exiting."
					break
				else
					log "dhcp renew: dhcprange failed. ip: $ip, required range: $newDhcpStart - $newDhcpStop. retrying..."
				fi
			else
				log "dhcp renew: ip is not in the new subnet. ip: $ip, subnet: $newSubnet, netmask: $newNetmask. retrying..."
			fi
		fi
	done
	if [ $stopRetry -le 0 ]; then
		log "dhcp renew: unable to renew ip. timeout expired!"
	fi
}

renew_ip_on_dhcp_range_change() {
	local ifname=$1
	local newDhcpStart=$2
	local newDhcpStop=$3
	local startRetry=$4
	local retryTimer=$5
	local stopRetry=$6
	local pid=`cat /var/run/udhcpc.$ifname.pid`
	log "renew_ip_on_dhcp_range_change sleeps for $startRetry seconds"
	sleep $startRetry
	while [ $stopRetry -gt 0 ]; do
		/usr/bin/kill -SIGUSR2 $pid
		/usr/bin/kill -SIGUSR1 $pid
		log "renew_ip_on_dhcp_range_change sleeps for $retryTimer seconds"
		sleep $retryTimer
		stopRetry=$((stopRetry - retryTimer))

		local ip=`ifconfig $ifname | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*'`
		if [ ! -z "$ip" ]; then
			local ip_long=0
			local dhcpStart_long=0
			local dhcpStop_long=0
			#check if the device ip is within the dhcp range. If so, we are done.
			for i in 1 2 3 4; do
				local ip_octet=`echo "$ip" | cut -d . -f $i`
				local dhcpStart_octet=`echo "$newDhcpStart" | cut -d . -f $i`
				local dhcpStop_octet=`echo "$newDhcpStop" | cut -d . -f $i`
				ip_long=$((ip_long<<8))
				ip_long=$((ip_long+ip_octet))
				dhcpStart_long=$((dhcpStart_long<<8))
				dhcpStart_long=$((dhcpStart_long+dhcpStart_octet))
				dhcpStop_long=$((dhcpStop_long<<8))
				dhcpStop_long=$((dhcpStop_long+dhcpStop_octet))
			done
			if [ "$ip_long" -ge "$dhcpStart_long" ] && [ "$ip_long" -le "$dhcpStop_long" ]; then
				log "dhcp renew: got a valid ip. ip: $ip. exiting."
				break
			else
				log "dhcp renew: dhcprange failed. ip: $ip, required range: $newDhcpStart - $newDhcpStop. retrying..."
			fi
		fi
	done
	if [ $stopRetry -le 0 ]; then
		log "dhcp renew: unable to renew ip. timeout expired!"
	fi
}

cmd="$1"
shift

debug_log "cmd: $cmd $*"

elevenk_run() {
    period_all=$1; shift
    scans=$1; shift
    msg=$1; shift
    radios="$@"
    shift
    msg="$msg radios:$radios"
    if [ "$radios" = "all" -o ! "$radios" ]
    then
        scan_cmd="syswrapper.sh scan"
    else
        scan_cmd="("
        for radio in $radios; do
            scan_cmd="$scan_cmd syswrapper.sh scan_radio $radio; "
        done
        scan_cmd="$scan_cmd )"
    fi

    delay=10
    for i in `seq 1 $scans`
    do
        period_all=$((period_all-delay))
        if [ "$period_all" -lt 1 ]; then period_all=1; fi
        rand_delay=$(( `tr -cd 0-9 </dev/urandom | head -c 8 | sed 's/^0*//'` % $period_all ))
        if [ "$period_all" -lt 1 ]; then period_all=1; fi
        period_all=$((period_all-rand_delay))
        logger "11k scan: sleeping for $delay + $rand_delay seconds, then $scan_cmd"
        sleep $delay && sleep $rand_delay && logger "scan nr $i of $scans for 11k ($msg)" && eval $scan_cmd
    done
    rm -f $PID_11K
}

# Kill pending scans for 11k
elevenk_stop() {
    if [ -f $PID_11K ]; then
        kill -9 `cat $PID_11K`
        rm -f $PID_11K
    fi
}

elevenk_sched() {
    elevenk_stop
    elevenk_run "$@" &
    echo $! > $PID_11K
}

# Scan neighbours every day.
# Executes 2 scans during 1h time slot. Every scan is executed randomly during 60min/2 window.
elevenk_scan() {
    elevenk_sched 3600 2 nightly all
}

# Scan neighbours after boot/re-configuration.
# Executes 2 scans during 5min time slot. Every scan is executed randomly during 5min/2 window.
elevenk_boot() {
    elevenk_sched 300 2 init "$@"
}

# Find physical interfaces by band: 2 or 5
list_first_vaps_ifs() {
	local band=$1
	for i in $(list_phys_ifs_all)
	do
		for vap in $(cat /var/run/${i}_devnames | grep -v vwire | grep -v wips | grep -v apcl)
		do
			if [ "$vap" ]
			then
				local fchar
				# Find actual frequency
				if [ "${MTK_UAP}" = "1" ]; then
					ch=$(iwconfig $vap | grep Channel | awk '{print $2}' | awk -F= '{print $2}')
					if [ "$ch" -ge 36 ]
					then
						fchar=5
					else
						fchar=2
					fi
				else
					freq=$(iwconfig $vap | grep Frequency | awk '{print $2}' | awk -F: '{print $2}' | sed 's/\.//')
					fchar="$(echo $freq | head -c 1)"
				fi

				mode=$(iwconfig $vap | grep Mode | sed -e 's/^.*Mode://' | awk '{print $1}')

				if [ "$fchar" == "$band" -a "$mode" == "Master" ]
				then
					if [ $(grep -c $vap /var/run/${i}_devnames) -eq 1 ]
					then
						echo $vap
						return
					fi
				fi
			fi
		done
	done
}

# Reset DFS channel
#
# Automatic Channel and Power Selection on UniFi
# Stage 0 - DFS retry
#
# For APs for which manual DFS channels have been chosen, attempt to switch back to DFS channels at 2AM local time.
#
# Concerns: 5G devices, like AP PRO, AP PRO AC, AP PRO AC Lite.
# Does not apply to: AP v2 (no 5G radio)
#
# Any logs will be logged to syslog (usually /var/log/messages).
#
dfs_reset_mtk() {
	# AP configuration - here we read channels for radio interfaces
	FILE_CFG=/tmp/running.cfg

	# Get list of first vap in 5G radios
	IF_LIST=$(list_first_vaps_ifs 5)

	# Compute actual frequency and channels and compare with configured channels
	for i in $IF_LIST
	do
		# Find actual frequency and test 5G channels only
		CHAN=`iwconfig $i | grep Channel | awk '{print $2}' | awk -F= '{print $2}'`
		MODE=`iwconfig $i | grep Mode | sed -e 's/^.*Mode://' | awk '{print $1}'`

		if [ "$CHAN" -lt "36" -o "$MODE" != "Master" ]
		then
			continue
		fi

		# Obtain actual channel
		CH_ACT=`iwlist $i frequency | grep Current | sed -e 's/^.*Channel://'`

		# Obtain configured channel
		IF_INDEX=`grep radio.[0-9][0-9]*.virtual.[0-9][0-9]*.devname=$i ${FILE_CFG} | awk -F. '{print $2}' | uniq`
		# Retry finding index if virtual BSS has not been found
		if [ -z "${IF_INDEX}" ]
		then
			IF_INDEX=`grep radio.[0-9][0-9]*.devname=$i ${FILE_CFG} | awk -F. '{print $2}' | uniq`
		fi
		# Skip if no index was found
		if [ -z "${IF_INDEX}" ]
		then
			continue
		fi
		CH_CFG=`grep radio.${IF_INDEX}.channel ${FILE_CFG} | awk -F= '{print $2}' | uniq`
		# Skip if auto or 0 (synonym), or not found
		if [ -z "${CH_CFG}" -o "${CH_CFG}" = "auto" -o "${CH_CFG}" = "0" ]
		then
			continue
		fi
		# Debug info
		LOG_MSG="$i ${CHAN}: actual:${CH_ACT} conf(${IF_INDEX}):${CH_CFG} "
		# Set radio back to DFS channel, if actual is different than configured
		if [ "${CH_ACT}" = "${CH_CFG}" ]
		then
			: # skip dfs reset
		else
			iwpriv ${i} set Channel="${CH_CFG}" 2>&1 > /dev/null
			RET_CODE=$?
			if [ $RET_CODE -eq 0 ]
			then
				RET_MSG="OK "
			else
				#interesting info is logged in `dmesg | tail -1`
				RET_MSG="FAIL(${RET_CODE}) "
			fi
			logger "${LOG_MSG}dfs reset chan: ${CH_ACT}=>${CH_CFG} ${RET_MSG}"
			#mca-custom-alert.sh -k CH_ACT -v ${CH_ACT} -k CH_CFG -v ${CH_CFG} -k RET_MSG -v ${RET_MSG}
		fi
	done
}

dfs_reset() {
	if is_wds; then
		logger "Downlink AP doesn't neet to do dfs reset action"
		return;
	fi
	logger "Try to do dfs reset action"

	if [ "${MTK_UAP}" = "1" ]; then
		dfs_reset_mtk
	else
	# AP configuration - here we read channels for radio interfaces
	FILE_CFG=/tmp/running.cfg

	# Get list of first vap in 5G radios
	IF_LIST=$(list_first_vaps_ifs 5)

	# Compute actual frequency and channels and compare with configured channels
	for i in $IF_LIST
	do
		# Find actual frequency and test 5G channels only
		FREQ=`iwconfig $i | grep Frequency | awk '{print $2}' | awk -F: '{print $2}' | sed 's/\.//'`
		MODE=`iwconfig $i | grep Mode | sed -e 's/^.*Mode://' | awk '{print $1}'`
		FCHAR="$(echo $FREQ | head -c 1)"
		if [ "$FCHAR" != "5" -o "$MODE" != "Master" ]
		then
			continue
		fi
		# Append zero-s if frequency is eg. 526 for 5260 MHz
		FLEN=`expr length $FREQ`
		while [ $FLEN -lt 4 ]
		do
			FREQ="${FREQ}0"
			FLEN=`expr length $FREQ`
		done
		# Obtain actual channel
		CH_ACT=`iwlist $i frequency | grep Current | sed -e 's/^.*Channel //' -e 's/)//'`
		# Obtain configured channel
		IF_INDEX=`grep radio.[0-9][0-9]*.virtual.[0-9][0-9]*.devname=$i ${FILE_CFG} | awk -F. '{print $2}' | uniq`
		# Retry finding index if virtual BSS has not been found
		if [ -z "${IF_INDEX}" ]
		then
			IF_INDEX=`grep radio.[0-9][0-9]*.devname=$i ${FILE_CFG} | awk -F. '{print $2}' | uniq`
		fi
		# Skip if no index was found
		if [ -z "${IF_INDEX}" ]
		then
			continue
		fi
		CH_CFG=`grep radio.${IF_INDEX}.channel ${FILE_CFG} | awk -F= '{print $2}' | uniq`
		# Skip if auto or 0 (synonym), or not found
		if [ -z "${CH_CFG}" -o "${CH_CFG}" = "auto" -o "${CH_CFG}" = "0" ]
		then
			continue
		fi
		# Debug info
		LOG_MSG="$i ${FREQ}MHz: actual:${CH_ACT} conf(${IF_INDEX}):${CH_CFG} "
		# Set radio back to DFS channel, if actual is different than configured
		if [ "${CH_ACT}" = "${CH_CFG}" ]
		then
			: # skip dfs reset
		else
			# check nol_channel status before set channel
			RADIO=`cat /sys/class/net/$i/parent`
			if [ `radartool -i ${RADIO} chknol ${CH_CFG}` = "true" ]
			then
				logger "${LOG_MSG}dfs ${CH_CFG} still in nol_channel, wait next time"
				continue
			fi
			iwconfig ${i} channel ${CH_CFG} 2>&1 > /dev/null
			RET_CODE=$?
			if [ $RET_CODE -eq 0 ]
			then
				RET_MSG="OK "
			else
				#interesting info is logged in `dmesg | tail -1`
				RET_MSG="FAIL(${RET_CODE}) "
			fi
			logger "${LOG_MSG}dfs reset chan: ${CH_ACT}=>${CH_CFG} ${RET_MSG}"
			#mca-custom-alert.sh -k CH_ACT -v ${CH_ACT} -k CH_CFG -v ${CH_CFG} -k RET_MSG -v ${RET_MSG}
		fi
	done
	fi
}

err() {
	local rc msg
	rc=$1
	shift
	msg=$*
	>&2 echo "ERROR: ${msg}"
	exit ${rc}
}

upgrade_err_notify() {
	local issued_by rc notify
	issued_by=$1
	rc=$2
	notify=$3

	if [ "${issued_by}" != "cmdline" ] ; then
		upgrade_err "${rc}" "${notify}"
	fi
}

err_internal() {
	local STATUSFILE=$1
	local LOG_PREFIX=$2
	local failed_type=$3
	local issued_by=$4
	local result="failed_internal"
	local status_msg err_msg
	upgrade_err_notify "${issued_by}" "99" "DeviceInternalFailed"
	case "${failed_type}" in
		1)
			status_msg="(cannot upgrade and keep running)"
			err_msg="Device does not support keep running upgrade!"
			;;
		2)
			status_msg="(upgrade from exist files, doesn't support download only)"
			err_msg="upgrade from exist files, doesn't support download only"
			;;
		3)
			local url=$5
			status_msg="(no curl)"
			err_msg="Cannot retrieve non-local firmware ${url} (missing curl)!"
			;;
		4)
			local TMPDIR=$5
			status_msg="(mkdir -p ${TMPDIR})"
			err_msg="Cannot create directory ${TMPDIR}!"
			;;
		5)
			local file=$5
			status_msg="(mv ${file} /tmp/fwupdate.bin)"
			err_msg="Failed moving ${file} to /tmp/fwupdate.bin"
			;;
		6)
			local file=$5
			status_msg="(get md5sum from ${file})"
			err_msg="Failed to get md5sum from ${file}"
			;;
		7)
			local file=$5
			status_msg="(check md5sum from ${file})"
			err_msg="md5sum mismatch from ${file} and original downloaded firmware"
			;;
		*)
			status_msg="unknow failed type ${failed_type}!"
			err_msg="Unknow internal failed type ${failed_type}!"
			;;
	esac

	set_status "${STATUSFILE}" "${LOG_PREFIX}" "${result}" "${status_msg}"
	unlock_and_err ${FW_LOCKFILE} 6 "${err_msg}"
}

fw_status_handle() {
	local STATUSFILE=$1
	local LOG_PREFIX=$2
	local fw_status=$3
	local issued_by=$4
	local ver=$5
	local result ace_notify error_msg fw_sum
	case "${fw_status}" in
		1)
			result="failed_fwcheck"
			ace_notify="FirmwareCheckFailed"
			error_msg="Firmware: ${ver} doesn't fit the system!\n"
			;;
		2)
			result="done_fw_download"
			ace_notify="FWDownloadOK"
			fw_sum=$6
			;;
		3)
			result="done_fwwrite"
			ace_notify="FWWriteOK"
			fw_sum=$6
			;;
		*)
			result="unknown_fw_status"
			ace_notify="FWStateInternalFailed"
			error_msg="Unknow firmware status type ${fw_status}!"
			;;
	esac

	set_status ${STATUSFILE} "${LOG_PREFIX}" "${result}" "(${ver})"
	if [ -n "${error_msg}" ]; then
		upgrade_err_notify "${issued_by}" "99" "${ace_notify}"
		unlock_and_err ${FW_LOCKFILE} 10 "${error_msg}"
	else
		upgrade_stage_notify "${issued_by}" "${ace_notify}" "${ver}" "${fw_sum}"
		_unlockfile ${FW_LOCKFILE}
	fi
}

upgrade_stage_notify() {
	local issued_by notify ver fw_sum
	issued_by=$1
	notify=$2
	ver=$3
	fw_sum=$4
	if [ "${issued_by}" != "cmdline" ] ; then
		upgrade_download_ready "${notify}" "${ver}" "${fw_sum}"
	fi
}

unlock_and_err() {
	local lockfile
	lockfile=$1
	_unlockfile ${lockfile}
	shift
	err $*
}

is_support_keeprunning() {
	need_ramfs
	local rc=$?
	if [ `grep -c ubntboot /proc/cmdline` -lt 1 -a `grep -c cpu=BCM53003 /proc/ubnthal/system.info` -lt 1 -a $rc -eq 0 ]; then
		return 1
	else
		return 0
	fi
}

set_status() {
	local result statusfile logprefix endtime extra_note
	statusfile=$1
	logprefix="$2"
	result="$3"
	if [ $# -gt 3 ]; then
		extra_note=" $4"
	else
		extra_note=""
	fi
	local LASTSTATUS="/var/run/fwupdate.last"
	local FWUPDATELOG="/var/log/fwupdate.log"
	endtime=$(date +"%F_%T")
	echo -e "${logprefix}\t${endtime}\t${result}\t" >> ${FWUPDATELOG}
	set_fwupdate_status "${statusfile}" "${result}${extra_note}"
	set_last_status "${statusfile}" "${LASTSTATUS}"
}

set_fwupdate_status() {
	local statusfile status
	statusfile=$1
	shift
	status=$*
	echo ${status} > ${statusfile}
}

set_last_status() {
	local lastfile statusfile
	lastfile=$2
	statusfile=$1
	[ ! -f ${lastfile} ] || rm -rf ${lastfile}
	ln -s ${statusfile} ${lastfile}
}

curl_with_retry() {
	local cmd=$1
	local tries=18
	for x in $(seq ${tries}); do
		http_code=$(${cmd})
		rc=$?
		if [ "$rc" = "0" ]; then
			if [ "${http_code}" = "200" ]; then
				break
			elif echo "$cmd" | grep -i -q 'ftp://' && [ "${http_code}" = "226" ]; then
				http_code=200
				break
			fi
		fi
		logger "unable to download fw (rc: ${rc} http: ${http_code})"
		if [ $(expr ${x}) -ne $tries ]; then
			sleep 3
		fi
	done

	echo ${http_code}
	return $rc
}

do_restart() {
	local reason="${1:-unknown}"
	if [ "${reason}" != "restore-default'" ]; then
		logger -t "syswrapper" "restart triggered by ${reason}"
	fi
	if [ -x /sbin/lcm-ctrl -a "${reason}" != "restore-default" ]; then
		/sbin/lcm-ctrl -t state -o reboot
	fi
	call_plat restart "$@"
	reboot -f $reason
}

do_getcurrentfwupdatestatus() {
	local PID STATUSFILE
	_lockfile 0 ${FW_LOCKFILE}
	rc=$?
	if [ $rc -ne 0 ]; then
		PID=$(cat ${FW_LOCKFILE})
		STATUSFILE="/var/log/fwupdate.status.${PID}"
		[ ! -f ${STATUSFILE} ] || cat ${STATUSFILE}
		return 0
	fi
	_unlockfile ${FW_LOCKFILE}
	echo "none"
	return 1
}

do_getlastfwupdateresult() {
	local LASTSTATUS
	LASTSTATUS="/var/run/fwupdate.last"
	[ ! -f ${LASTSTATUS} ] || cat ${LASTSTATUS}
}

# --issued-by		== who issued the fwupdate
# --dl-only	    	== firmware download only, don't do firmware update
# --md5sum      	== pre-download firmware md5sum, to confirm the firmware is what we want
# --keep-firmware	== keep firmware file even firmware check failed
# --keep-running	== keep system running even after firmware update successfully
# --reboot-sys		== reboot system after firmware update successfully
do_fwupdate() {
	local file ver rc
	local url opt
	local arguments starttime endtime result
	if [ -z "${1}" ]; then
		err 2 "No update url or file!"
	fi

	starttime=$(date +"%F_%T")
	arguments="$*"
	url=${1}
	shift

	local fwbin_sum=
	local dl_tries=-1
	local dl_retry_delay=-1
	local keeprunning=0
	local dl_only=0
	local keepfw=0
	local rebootsys=0
	local issued_by="cmdline"
	for opt in $*; do
		case ${opt} in
		--md5sum=*)
			fwbin_sum=${opt:9}
			;;
		--dl-only)
			dl_only=1
			;;
		--dl-tries=*)
			dl_tries=${opt:11}
			;;
		--dl-retry-delay=*)
			dl_retry_delay=${opt:17}
			;;
		--issued-by=*)
			issued_by=${opt:12}
			;;
		--reboot-sys)
			rebootsys=1
			;;
		--keep-firmware)
			keepfw=1
			;;
		--keep-running)
			keeprunning=1
			;;
		esac
	done
	local PID=$$
	local STATUSFILE="/var/log/fwupdate.status.${PID}"
	local LOG_PREFIX="${PID}\t[${issued_by}]\t${arguments}\t${starttime}"
	_lockfile 0 ${FW_LOCKFILE}
	rc=$?
	if [ $rc -ne 0 ]; then
		result="failed_lockfile"
		set_status ${STATUSFILE} "${LOG_PREFIX}" "${result}"
		err 1 "cannot aquire lock file (${FW_LOCKFILE}) !"
	fi
	if ! is_support_keeprunning ; then
		if [ ${keeprunning} -gt 0 ]; then
			err_internal "${STATUSFILE}" "${LOG_PREFIX}" "1" "${issued_by}"
		fi
	fi

	if [ -e "${url}" ]; then
		file="${url}"
	elif [ -e "/tmp/${url}" ]; then
		file="/tmp/${url}"
	fi

	if [ -e "${file}" ]; then
		if [ ${dl_only} -gt 0 ]; then
			err_internal "${STATUSFILE}" "${LOG_PREFIX}" "2" "${issued_by}"
		fi
		if [ -z "${fwbin_sum}" ]; then
			err_internal "${STATUSFILE}" "${LOG_PREFIX}" "6" "${issued_by}" "${file}"
		fi
		# upgrade from a exist local files
		result=$(md5sum ${file} | grep -c ${fwbin_sum})
		rc=$?
		if [ $rc -ne 0 ]; then
			err_internal "${STATUSFILE}" "${LOG_PREFIX}" "7" "${issued_by}" "${file}"
		fi
	else
		# upgrade from remote files
		local curl_cmd curl_opt
		curl_cmd=$(command -v curl 2>/dev/null)
		curl_opt="-s -L"

		if [ ! -n "${curl_cmd}" ] ; then
			err_internal "${STATUSFILE}" "${LOG_PREFIX}" "3" "${issued_by}" "${url}"
		fi
		[ -n "${TMPDIR}" ] || TMPDIR=/tmp
		mkdir -p "${TMPDIR}"
		rc=$?
		if [ ${rc} -ne 0 ] ; then
			err_internal "${STATUSFILE}" "${LOG_PREFIX}" "4" "${issued_by}" "${TMPDIR}"
		fi
		local http_code=0
		rm -f ${TMPDIR}/fwupdate.??????????
		file=$(mktemp -p "${TMPDIR}" fwupdate.XXXXXXXXXX)
		rc=0
		set_status ${STATUSFILE} "${LOG_PREFIX}" "downloading"
		if [ -n "${curl_cmd}" ]; then
			[ ${dl_tries} -gt 0 ] && curl_opt="${curl_opt} --retry ${dl_tries}"
			[ ${dl_retry_delay} -gt 0 ] && curl_opt="${curl_opt} --retry-delay ${dl_retry_delay}"
			full_cmd="${curl_cmd} ${curl_opt} -o ${file} -w %{http_code} ${url}"
			http_code=$(curl_with_retry "$full_cmd")
			rc=$?
			if [ $rc -ne 0 ]; then
				curl_opt="${curl_opt} -4"
				full_cmd="${curl_cmd} ${curl_opt} -o ${file} -w %{http_code} ${url}"
				http_code=$(curl_with_retry "$full_cmd")
				rc=$?
			fi
		else
			# should never get here..
			rc=69
		fi

		if [ "${http_code}" != "200" ]; then
			rm -f ${file}
			result="failed_download"
			set_status ${STATUSFILE} "${LOG_PREFIX}" "${result}" "(${url}) rc: ${rc}, http_code: ${http_code}"
			if [ "${issued_by}" != "cmdline" ] ; then
				download_err "${rc}" "${http_code}"
			fi
			unlock_and_err ${FW_LOCKFILE} 3 "Failed downloading firmware from ${url}, rc: ${rc}, http_code: ${http_code}"
		fi
	fi

	set_status ${STATUSFILE} "${LOG_PREFIX}" "fw checking"
	local check_output
	check_output=$(fwupdate.real -c -d ${file} 2>&1)
	rc=$?
	# Match semver and old version strings
	ver=$(echo "${check_output}" | sed -n \
		-e "s/New ver: [^.]*\.[^._]*[._]\(.*\)\.[0-9]*\.[0-9]*/\1/p")
	if [ $rc -ne 0 ]; then
		[ ${keepfw} -gt 0 ] || rm -f ${file}
		fw_status_handle "${STATUSFILE}" "${LOG_PREFIX}" "1" "${issued_by}" "${ver}"
	fi
	>&2 echo "Firmware: ${ver}"

	set_status ${STATUSFILE} "${LOG_PREFIX}" "fw moving"
	if [ "/tmp/fwupdate.bin" != "${file}" ]; then
		mv -f "${file}" /tmp/fwupdate.bin
		rc=$?
		if [ $rc -ne 0 ]; then
			[ ${keepfw} -gt 0 ] || rm -f ${file}
			err_internal "${STATUSFILE}" "${LOG_PREFIX}" "5" "${issued_by}" "${file}"
		fi
	fi

	set_status ${STATUSFILE} "${LOG_PREFIX}" "md5sum create"
	fwbin_sum=$(md5sum /tmp/fwupdate.bin | awk '{print $1}')
	rc=$?
	if [ $rc -ne 0 ]; then
		[ ${keepfw} -gt 0 ] || rm -f ${file}
		err_internal "${STATUSFILE}" "${LOG_PREFIX}" "6" "${issued_by}" "${file}"
	fi

	if [ ${dl_only} -gt 0 ]; then
		# notify status and unlock fwupdate
		fw_status_handle "${STATUSFILE}" "${LOG_PREFIX}" "2" "${issued_by}" "${ver}" "${fwbin_sum}"
		echo ${fwbin_sum} > ${FW_MD5SUMFILE}
		return 0
	fi

	upgrade_stage_notify "${issued_by}" "FWDownloadOK" "${ver}" "${fwbin_sum}"
	set_status ${STATUSFILE} "${LOG_PREFIX}" "updating"
	>&2 echo "Firmware file looks good - updating..."
	state_lock
	if [ ${keeprunning} -gt 0 ]; then
		do_upgrade_keeprunning
		rc=$?
	else
		do_upgrade
		rc=$?
	fi
	[ ${keepfw} -gt 0 ] || rm -f /tmp/fwupdate.bin
	[ ${keepfw} -gt 0 ] || rm -f ${FW_MD5SUMFILE}
	state_unlock
	if [ $rc -ne 0 ]; then
		result="failed_fwwrite"
		set_status ${STATUSFILE} "${LOG_PREFIX}" "${result}"
		if [ ${keeprunning} -gt 0 ]; then
			upgrade_err_notify "${issued_by}" "${rc}" "FWWriteFailed"
		fi
		unlock_and_err ${FW_LOCKFILE} 11 "Failed writing firmware to flash"
	fi
	echo "${ver}" > /var/run/fwversion.next
	fw_status_handle "${STATUSFILE}" "${LOG_PREFIX}" "3" "${issued_by}" "${ver}" "${fwbin_sum}"
	if [ ${rebootsys} -gt 0 ] ; then
		reboot
	fi
}

upgrade_err() {
	local err_code=$1
	local reason=$2
	local sub_reason=${3:-""}
	local err_info=${4:-'{}'}
	mca-custom-alert.sh -k "event_string" -v "Upgrade" -k "up_type" -v "UpgradeError" -k "rc" -v "${err_code}" -k "reason" -v "${reason}"
	ubntbox trace -n 'unifi:network:firmware:event' -t 'anomaly' "{
		\"reason\": \"system\",
		\"anomaly\": \"firmware upgrade failed\",
		\"ppid_cmdline\": \"$(ppid_cmdline)\",
		\"error\": {
			\"code\": \"${err_code}\",
			\"reason\": \"${reason}\",
			\"sub_reason\": \"${sub_reason}\",
			\"info\": ${err_info}
		}
	}"
	#sleep for send out the notification to the controller
	sleep 2
}

download_err() {
	local curl_err_code=$1
	shift
	local http_code=$1
	shift
	mca-custom-alert.sh -k "event_string" -v "Upgrade" -k "up_type" -v "UpgradeError" -k "curl_rc" -v "${curl_err_code}" -k "http_rc" -v "${http_code}" -k "reason" -v "FirmwareDownloadFailed"
	ubntbox trace -n 'unifi:network:firmware:event' -t 'anomaly' "{
		\"reason\": \"system\",
		\"anomaly\": \"firmware download failed\",
		\"curl_rc\": \"${curl_err_code}\",
		\"http_code\": \"${http_code}\",
		\"ppid_cmdline\": \"$(ppid_cmdline)\"
	}"
	#sleep for send out the notification to the controller
	sleep 2
}

download_err_and_restart() {
    download_err "$@"
    $SCRIPT restart "fwupgrade-download-err"
    sleep 30
}

upgrade_ready() {
	local msg
	msg=$*
	mca-custom-alert.sh -k "event_string" -v "Upgrade" -k "up_type" -v "UpgradeReady" -k "up_stage" -v "${msg}"
	sleep 2
}

upgrade_download_ready() {
	local dl_event ver fw_sum
	dl_event=$1
	ver=$2
	fw_sum=$3
	mca-custom-alert.sh -k "event_string" -v "Upgrade" -k "up_type" -v "UpgradeReady" -k "up_stage" -v "${dl_event}" -k "version" -v "${ver}" -k "md5sum" -v "${fw_sum}"
	sleep 2
}

update_hostapd_nas_ip_addr() {
	local ipaddr=$1
	for conf in ${HOSTAPD_CONFIG_DIR}/*.cfg; do
		sed -i '/own_ip_addr/d' $conf
		echo "own_ip_addr=$ipaddr" >> $conf
		ifname=$(basename ${conf} .cfg)
		res=`hostapd_cli -p ${HOSTAPD_RUN_DIR} -i $ifname set own_ip_addr $ipaddr`
		log "hostapd update: conf=$conf interface=$ifname nas_ip=$ipaddr res=$res"
	done
}

host_lookup() {
  host=$(nslookup "$1" 2>/dev/null)
  if [ $? -ne 0 ]; then return 1; fi
  echo "$host" | grep "Address 1" | tail -n1 | awk '{print $3}'
}

random_ready() {
	if [ -f /proc/sys/kernel/random/entropy_avail ]; then
		[ $(cat /proc/sys/kernel/random/entropy_avail) -gt 0 ] && return 0
	fi
	return 1
}

netconsole_init() {
  local port=${2:-514}
  local key=${3:-""}
  ip=$(host_lookup "$1")
  if [ $? -ne 0 ]; then return 1; fi

  ping "$ip" -c 1 -W 3 >/dev/null 2>&1
  if nettool -i "$ip"; then
    # Is on LAN
    local lan_ip="$ip"
  else
    local lan_ip=$(route -n | grep "^0\.0\.0\.0" | awk '{print $2}')
  fi
  local ipready_file=$(ls -tr1 /var/run/ipready.* | tail -n1)
  local my_ip=$(cat "$ipready_file")
  local esc_lan_ip=$(echo "$lan_ip" | sed -e 's/\./\\./g')
  local arp=$(cat /proc/net/arp | awk "/^$esc_lan_ip[[:space:]]/"'{
    if ($4 == "00:00:00:00:00:00")
      return;
    print $4;
    exit;
  }')
  if [ -z "$arp" ]; then return 2; fi
  rmmod netconsole 2>/dev/null
  if [ -z "${key}" ]; then 
    insmod netconsole "netconsole=514@$my_ip/eth0,$port@$ip/$arp"
  else
    random_ready || return 1;

    local hashid=$(cat /proc/ubnthal/system.info | grep "device.hashid" | awk -F '=' '{print $2}')
    insmod netconsole "netconsole=514@$my_ip/eth0,$port@$ip/$arp,$key,$hashid"
  fi
}

netconsole_loop() {
  local tries=10
  while [ $tries -gt 0 ]; do
    if is_wds; then
        logger "netconsole init aborted, not available on wireless uplink"
        exit 0
    fi
    netconsole_init "$@"
    rc=$?
    if [ $rc -ne 0 ]; then
      logger "netconsole init failed, error $rc"
    else
      break
    fi
    sleep 60
    tries=$((tries-1))
  done
  rm -f $NETCONSOLE_PIDFILE
}

netconsole_daemon() {
  if [ -e $NETCONSOLE_PIDFILE ]; then
    kill -9 $(cat $NETCONSOLE_PIDFILE)
    rm -f $NETCONSOLE_PIDFILE
  fi
  ( netconsole_loop "$@") &
  echo $! > $NETCONSOLE_PIDFILE
}

do_linkswitch() {
	if [ -n "`ifconfig ${PRS_INTC} | grep UP`" ]; then
		prsnl dev ${PRS_INTC} scan abort
	fi

	vaps=`cat /var/run/wlan_devnames`

	for ath in $vaps; do
		usage="unknown"
		if [ -f /var/run/vapusage.$ath ]; then
			usage=`cat /var/run/vapusage.$ath`
		fi
		if [ -f ${HOSTAPD_RUN_DIR}/cfg_error.$ath ]; then
			usage=unusable
		fi
		case $usage in
		wireless-bridge)
			echo "wireless-bridge-failover" > /var/run/vapusage.$ath
			;;
		wireless-bridge-failover)
			echo "wireless-bridge" > /var/run/vapusage.$ath
			;;
		esac
	done
}

# helper to output opkg output to log
_opkg() {
	set -o pipefail
	opkg "$@" 2>&1 | logger -s -t "opkg"
	rc=$?
	set +o pipefail
	return $rc
}

# wrapper for opkg update && opkg install with retry logic
# (similar to curl --retry $retries --retry-delay $retry_delay)
install_runtime_package() {
	local package=$1
	local retries=${2:-6}
	local retry_delay=${3:-10}

	for x in $(seq $retries); do
		_opkg update && _opkg install --force-space $package && break

		if [ $x -ne $retries ]; then
			sleep $retry_delay
		else
			logger -s -t "opkg" "failed to install $package"
		fi
	done
}

# Assumes lock is held
clear_vlan_detected() {
	rm -f "$VLANS_FILE"
}

cache_vlan_detected() {
	if [ ! -d "$SWITCH_PROC" ]; then
		return 0
	fi

	if ! grep -q ^"$1"$ "$VLANS_FILE" 2>/dev/null; then
		logger -s -t vlan "vlan $1 detected"
		echo "$1" >> "$VLANS_FILE"
		return 1
	fi
	return 0
}

vlan_detected() {
	if [ ! -d "$SWITCH_PROC" ]; then
		return 0
	fi

	if ! cache_vlan_detected "$@"; then
		swconfig dev "$SWITCH_IFACE" set vlan_detected "$1"
	fi
}

ppid_comm() {
	local ppid=${1:-$PPID}
	cat /proc/$ppid/comm
}

ppid_cmdline() {
	local ppid=${1:-$PPID}
	cat /proc/$ppid/cmdline | xargs -0
}

del_bridge_vlans() {
	for br in $(ifconfig -a | grep "^$1\(\.\| \)" | sed -e "s/ .*//"); do
		for _iface in $(ls -1 /sys/class/net/${br}/brif); do
			local iface=$(basename "$_iface")
			if echo "$iface" | grep -q "\."; then
				vconfig rem "$iface"
			fi
		done
		ifconfig "$br" down
		brctl delbr "$br"
	done
}

sensitive_data_filter() {
	BYTE='(25[0-5]|2[0-4][0-9]|[01]?[0-9]?[0-9])'
	IPV4="\<(${BYTE}\.){3}${BYTE}\>"
	HEXTET='[0-9a-fA-F]{1,4}'
	HEXBYTE='[a-fA-F0-9]{2}'

	# UUID
	UUID="s/\<(${HEXBYTE}){4}-((${HEXBYTE}){2}-){3}(${HEXBYTE}){6}\>/censored-uuid/g"

	# 6 hexadecimal bytes with optional separator from set ' :-' and none
	MAC_SED0="s/\<(${HEXBYTE}){6}\>/censored-mac/g"
	MAC_SED1="s/\<(${HEXBYTE} ){5}${HEXBYTE}\>/censored-mac/g"
	MAC_SED2="s/\<(${HEXBYTE}:){5}${HEXBYTE}\>/censored-mac/g"
	MAC_SED3="s/\<(${HEXBYTE}-){5}${HEXBYTE}\>/censored-mac/g"

	# IPv4 address
	IPV4_SED="s/${IPV4}/censored-ipv4/g"

	# filter out serial number
	SERIAL_NUM=$(cat /proc/ubnthal/system.info | grep "serialno" | cut -d '=' -f 2)
	SERNUM_SED="s/${SERIAL_NUM}/censored-sn/g"

	sed -E \
	    -e "s@\<(${HEXTET}:){5}${HEXTET}?:$IPV4@censored-ipv4m6@g" \
	    -e "s@\<(${HEXTET}:){4}(:${HEXTET}){0,1}:$IPV4@censored-ipv4m6@g" \
	    -e "s@\<(${HEXTET}:){3}(:${HEXTET}){0,2}:$IPV4@censored-ipv4m6@g" \
	    -e "s@\<(${HEXTET}:){2}(:${HEXTET}){0,3}:$IPV4@censored-ipv4m6@g" \
	    -e "s@\<(${HEXTET}:){1}(:${HEXTET}){0,4}:$IPV4@censored-ipv4m6@g" \
	    -e "s@:(:${HEXTET}){0,5}:$IPV4@censored-ipv4m6@g" \
	    -e "s@\<(${HEXTET}:){7}${HEXTET}\>@censored-ipv6@g" \
	    -e "s@\<(${HEXTET}:){6}(:${HEXTET})\>@censored-ipv6@g" \
	    -e "s@\<(${HEXTET}:){5}(:${HEXTET}){1,2}\>@censored-ipv6@g" \
	    -e "s@\<(${HEXTET}:){4}(:${HEXTET}){1,3}\>@censored-ipv6@g" \
	    -e "s@\<(${HEXTET}:){3}(:${HEXTET}){1,4}\>@censored-ipv6@g" \
	    -e "s@\<(${HEXTET}:){2}(:${HEXTET}){1,5}\>@censored-ipv6@g" \
	    -e "s@\<(${HEXTET}:){1}(:${HEXTET}){1,6}\>@censored-ipv6@g" \
	    -e "s@\<(${HEXTET}:){1,7}:@censored-ipv6@g" \
	    -e "s@:(:${HEXTET}){1,7}\>@censored-ipv6@g" \
	    -e "$SERNUM_SED" -e "$UUID" \
	    -e "$MAC_SED0" -e "$MAC_SED1" -e "$MAC_SED2" -e "$MAC_SED3"\
	    -e "$IPV4_SED" <&0
}

censored_cfg_pattern() {
	local PATTERN=$1
	echo -n "s/\\.(${PATTERN})=.+/\\.\\1=censored-\\1/g"
}

systemcfg_sensitive_data_filter() {
	HEXBYTE='[a-fA-F0-9]{2}'
	SYSCFG_HEXID16="s/\<(${HEXBYTE}){16}\>/censored-id16/g"
	SYSCFG_HEXID12="s/\<(${HEXBYTE}){12}\>/censored-id12/g"
	SYSCFG_HEXID8="s/\<(${HEXBYTE}){8}\>/censored-id8/g"

	sensitive_data_filter | sed -E \
	                            -e "$(censored_cfg_pattern ssid)" \
	                            -e "$(censored_cfg_pattern psk)" \
	                            -e "$(censored_cfg_pattern name)" \
	                            -e "$(censored_cfg_pattern username)" \
	                            -e "$(censored_cfg_pattern location)" \
	                            -e "$(censored_cfg_pattern password)" \
	                            -e "$(censored_cfg_pattern key)" \
	                            -e "$(censored_cfg_pattern passphrase)" \
	                            -e "$(censored_cfg_pattern secret)" \
	                            -e "$(censored_cfg_pattern value)" \
	                            -e "$SYSCFG_HEXID16" \
	                            -e "$SYSCFG_HEXID12" \
	                            -e "$SYSCFG_HEXID8"
}

send_ssh_trace() {
	local trace_number=$1
	local extra_json=$2
	local extra_comma=
	local setup=true
	get_config_enabled /tmp/system.cfg "mgmt.is_default" && setup=false
	local controller_ip=$(cat ${SYSTEM_CONTROLLER_IP} 2>/dev/null)
	local ssh_ip=$(echo "${SSH_CLIENT}" | awk '{print $1}')
	local ssh_port=$(echo "${SSH_CLIENT}" | awk '{print $2}')
	local is_controller_ip=false
	[ -n "${ssh_ip}" -a "${ssh_ip}" = "${controller_ip}" ] && is_controller_ip=true
	[ -z "${extra_json}" ] || extra_comma=,
	ubntbox trace -n 'unifi:network:firmware:event' -t 'ssh' "{
		\"setup\": ${setup},
		\"recovery\": false,
		\"trace_number\": ${trace_number},
		\"is_controller_ip\": ${is_controller_ip},
		\"ssh_port\":${ssh_port:-null}
		${extra_comma}${extra_json}
	}"
}

do_ssh_trace() {
	local trace_count_file=/var/run/ssh_trace_count
	local lock_count=60
	until lockfile ${trace_count_file}; do
		if [ ${lock_count} -le 0 ]; then
			error_log "Timed out trying to lock ${trace_count_file}"
			return
		fi
		lock_count=$((lock_count - 1))
		sleep 1
	done
	local trace_count=$(cat ${trace_count_file} 2>/dev/null)
	trace_count=$((trace_count + 1))
	if ! [ "${trace_count}" -ge 0 ] 2>/dev/null; then
		trace_count=0
	fi
	if [ ${trace_count} -le 100 ]; then
		echo ${trace_count} > ${trace_count_file}
		unlockfile ${trace_count_file}
		send_ssh_trace ${trace_count} "$@"
	else
		unlockfile ${trace_count_file}
	fi
}

do_get_tmpfs_usage() {
	local total="$(df | grep tmpfs | awk '{sum += $3} END {print sum}')"
	echo "{ \
		\"df\": \"$(df)\", \
		\"total\": \"${total}\" \
	}"
}

do_mca_send_inform() {
	local now=$(sed "s/\..*//" /proc/uptime)
	if [ -e ${MCA_CTRL_INFORM_UPTIME} ]; then
		local before=$(cat ${MCA_CTRL_INFORM_UPTIME})
		local delta=$((now - before))
		if [ "$delta" -le 10 ]; then
			return
		fi
		debug_log "Trigger inform via mca-ctrl, delta $delta sec"
	fi
	mca-ctrl -t inform
	echo $now > ${MCA_CTRL_INFORM_UPTIME}
}

case $cmd in
set-tmp-ip)
	exit_if_fake $cmd $*
	;;
set-adopt)
	# set-adopt <url> <authkey>
	mca-ctrl -t connect -s "$1" -k "$2"
	;;
set-channel)
	# set-channel <radio> <channel>
	# FIXME: dual radio
	for ath in `ls /proc/sys/net/*/%parent | cut -d '/' -f 5`; do
		iwconfig $ath channel $1
	done
	;;
ip-changed)
	# ip-changed <interface> <ip>
	IFACE=$1
	NEWIP=$2
	OLDIP="0.0.0.0"
	# /var/run/ipold.* cleared by /usr/etc/rc.d/rc on full provision
	if [ -e /var/run/ipold.$IFACE ]; then
		OLDIP=$(cat /var/run/ipold.$IFACE)
	fi
	echo "$NEWIP" > /var/run/ipready.$IFACE

	ble_check

	if [ "$OLDIP" = "$NEWIP" ]; then
		# No actual change - ignore
		log "ipready.$IFACE = $NEWIP"
		return
	fi
	log "ipready.$IFACE changed to $NEWIP"
	cp /var/run/ipready.$IFACE /var/run/ipold.$IFACE
	# Notify processes that needs to know
	pkill_generic dropbear -TERM -x
	pkill_generic ntpclient -x
	pkill_generic uplink-monitor -USR1 -x
	pkill_generic wevent -USR1 -x
	# tmp workaround for nanohd snmpd issue
	if [ "${UAPNANOHD}" = "1" ]; then
		pkill_generic snmpd -x
	fi
	if ! route -n | grep "^0\.0\.0\.0.*br0" >/dev/null; then
		# Sleep if using uplink for default gateway, to avoid race with mca-cli-op inform
		sleep 5
	fi
	if [ -f /var/run/lldpd_para.sh ]; then
		pkill_generic lldpd -x
		sh /var/run/lldpd_para.sh
	fi

	[ $IFACE = "br0" ] && update_hostapd_nas_ip_addr $NEWIP
	# For downlink AP speed up wireless adoption process
	if [ -f "/var/run/uplink.url" ]; then
		url=`cat /var/run/uplink.url`
		mca-ctrl -t connect -s $url
	else
		# Sending out discover packet immediately when ipready
		mca-ctrl -t discover
		mca-cli-op inform
	fi
	/bin/walled_action.sh /tmp/allowed.1.txt /tmp/restricted.1.txt &
	# activate tunnels, if any
	if [ -d /etc/tunnels ]; then
	   for i in $(ls /etc/tunnels);
	   do /usr/etc/activate_tunnel.sh $i up;
	   done
	fi

	[ -e /etc/ltecfg/activate_lte_failover_tunnel.sh ] && \
        /etc/ltecfg/activate_lte_failover_tunnel.sh

	if [ -d /var/run/schedules -a ! -f /tmp/.factorytest ]; then
		timeout=30
		timer=2
		while [ $timeout -gt 0 ]; do
			if [ $(date +%s) -gt $(date +%s -d "2017-01-01 00:00:00") ]; then
				schedule_action
				break
			else
				sleep $timer
				timeout=$((timeout - timer))
			fi
		done
	fi

	#in downlink AP side, if_up_hook.rai0 will not be triggered, thus will not set thermal cmd to driver
	if [ "${MTK_UAP}" = "1" -a -f /var/run/if_up_hook.rai0 -a ! -f /var/run/vapusage.rai0 ]; then
		/bin/sh /var/run/if_up_hook.rai0
	fi
	;;
dhclient-restart)
	ifname=$1
	if [ -f /var/run/udhcpc.$ifname.pid ]; then
		killall udhcpc
	fi
	;;
dhclient-renew-subnet)
	ifname=$1
	#do not renew ip if the device has static ip. if /var/run/udhcpc.eth0.pid file exists => dhcp and not static.
	if [ -f /var/run/udhcpc.$ifname.pid ]; then
		renew_ip_on_subnet_change "$@"
	fi
	;;
dhclient-renew-dhcprange)
	ifname=$1
	if [ -f /var/run/udhcpc.$ifname.pid ]; then
		renew_ip_on_dhcp_range_change "$@"
	fi
	;;
led-locate)
	exit_if_busy $cmd $*
	# led-locate <duration>
	pkill_generic led_locate.sh -f
	# background this one so we'll return immediately
	/usr/etc/led_locate.sh $1 &
	;;
set-locate)
	exit_if_busy $cmd $*
	exit_if_state_lock_failed $cmd $*
	pkill_generic led_locate.sh -f
	echo "true" > /proc/ubnthal/status/IsLocated
	# if led is disabled, enable it during locating
	if [ -d "/proc/ubnt_ledbar" ]; then
		color=`cat /proc/ubnt_ledbar/color`
		if [ "$color" = "0,0,0" ]; then
			echo "3" > /proc/ubnt_ledbar/color
			temp_led="true"
		fi
		brightness=`cat /proc/ubnt_ledbar/brightness`
		if [ "$brightness" = "0" ]; then
			echo "255" > /proc/ubnt_ledbar/brightness
			temp_led="true"
		fi
	fi
	state_reload
	state_unlock
	;;
unset-locate)
	exit_if_busy $cmd $*
	exit_if_state_lock_failed $cmd $*
	pkill_generic led_locate.sh -f
	echo "false" > /proc/ubnthal/status/IsLocated
	if [ "$temp_led" = "true" ]; then
		echo "0" > /proc/ubnt_ledbar/brightness
		echo "0" > /proc/ubnt_ledbar/color
		temp_led=""
	fi
	state_reload
	state_unlock
	;;
set-custom-sysled)
	# used in bootup led pattern
	exit_if_state_lock_failed $cmd $*
	led_pattern=$1
	set_led $led_pattern 120
	state_unlock
	;;
unset-custom-sysled)
	# used in bootup led pattern
	exit_if_state_lock_failed $cmd $*
	state_reload
	state_unlock
	;;
set-volume)
	exit_if_busy $cmd $*
	if [ -c /dev/dsp ]; then
		ubnt-vorbis-player -V $1
	fi
	;;
set-stream)
	exit_if_busy $cmd $*
	baresip_enabled=`grep baresip.status=enabled /tmp/system.cfg`
	if [ -c /dev/dsp -a -z $baresip_enabled ]; then
		pkill_generic ubnt-vorbis-player -f
		[ -f /var/run/stream.token ] && sleep 1
		token=$1
		echo $token > /var/run/stream.token
		shift
		CODEC_FILE="/var/run/codecbytes_c$1_r$2_q$3"
		[ -s "$CODEC_FILE" ] || (ubnt-vorbis-codecbytes -c $1 -r $2 -q $3 > $CODEC_FILE)
		OPTIONS="-i $4 -p $5"
		[ -z $6 ] || OPTIONS="$OPTIONS -v $6"
		[ -z $7 ] || OPTIONS="$OPTIONS -I $7"
		[ -z $8 ] || OPTIONS="$OPTIONS -P $8"
		[ -z ${10} ] || OPTIONS="$OPTIONS -k $9 -K ${10}"
		log "playing stream $token with options: -c $1 -r $2 -q $3 | $OPTIONS"
		(ubnt-vorbis-player $OPTIONS < $CODEC_FILE; rm -f /var/run/stream.token; mca-cli-op inform) &
	fi
	;;
set-stream-media)
	exit_if_busy $cmd $*
	baresip_enabled=`grep baresip.status=enabled /tmp/system.cfg`
	if [ -c /dev/dsp -a -z $baresip_enabled ]; then
		pkill_generic ubnt-vorbis-player -f
		[ -f /var/run/stream.token ] && sleep 1
		token=$1
		echo $token > /var/run/stream.token
		shift
		OPTIONS="-u $1 -v $2"
		log "playing stream $token with options: $OPTIONS"
		(ubnt-vorbis-player $OPTIONS; rm -f /var/run/stream.token; mca-cli-op inform) &
	fi
	;;
unset-stream)
	exit_if_busy $cmd $*
	baresip_enabled=`grep baresip.status=enabled /tmp/system.cfg`
	if [ -c /dev/dsp -a -z $baresip_enabled ]; then
		token=$(cat /var/run/stream.token)
		if [ "$1" = "$token" ]; then
			log "stopping stream $1"
			rm -f /var/run/stream.token
		fi
		pkill_generic ubnt-vorbis-player -f
	fi
	;;
set-uboot-var)
	if [ -e /etc/fw_env.config ]; then
		var_name=$1
		new_value=$2
		stored_value=$(get_fw_env ${var_name})
		if [ "${stored_value}" != "${new_value}" ]; then
			set_fw_env "${var_name}" "${new_value}"
		fi
	fi
	;;
11k-scan)
	exit_if_busy $cmd $*
	[ -e "$WIFI_10_4" ] || [ "$MTK_UAP" = "1" ] || elevenk_scan
	;;
11k-boot)
	exit_if_busy $cmd $*
	[ -e "$WIFI_10_4" ] || [ "$MTK_UAP" = "1" ] || elevenk_boot $0
	;;
11k-stop)
	elevenk_stop $@
	;;
scan-rrm)
	if [ "$IS_WIFI_ONLY_AP" = "true" ]; then
		return
	fi
	is_wds
	[ "$?" = "1" ] && scan_rrm $@
	;;
scan-rrm-check)
	if [ "$IS_WIFI_ONLY_AP" = "true" ]; then
		return
	fi
	is_wds
	[ "$?" = "1" ] && scan_rrm_check
	;;
scan)
	exit_if_busy $cmd $*
	scan $@
	sleep 1
	mca-cli-op inform
	;;
scan_radio)
	exit_if_busy $cmd $*
	scan_radio $@
	;;
scan_band)
	exit_if_busy $cmd $*
	scan_band $@
	sleep 1
	mca-cli-op inform
	;;
spectrum-scan)
	exit_if_busy $cmd $*
	run_ssh_safe "$@"
	spectrum_scan $@
	;;
spectrum-scan-clean)
	exit_if_busy $cmd $*
	spectrum_scan_clean $@
	;;
spectrum-scan-restore)
	need_cfg_save_file=/var/run/need_cfg_save
	lock_count=30
	exit_if_busy $cmd $*
	run_ssh_safe "$@"
	if [ -f /var/run/rftable_wifi0.complete ] ; then
		rm /var/run/rftable_wifi0.complete
	fi
	if [ -f /var/run/rftable_wifi1.complete ] ; then
		rm /var/run/rftable_wifi1.complete
	fi
	state_lock
	until lockfile ${need_cfg_save_file}; do
		if [ ${lock_count} -le 0 ]; then
			error_log "Timed out trying to lock ${need_cfg_save_file}"
			break
		fi
		lock_count=$((lock_count - 1))
		sleep 1
	done
	/usr/etc/rc.d/rc restart
	unlockfile ${need_cfg_save_file}
	state_reload
	state_unlock
	;;
spectrum-scan-qca-done)
	exit_if_busy $cmd $*
	run_ssh_safe "$@"
	scan_devnames_destroy
	;;
apply-config)
	# apply-config
	run_ssh_safe "$@"
	state_lock
	before=$(sed "s/\..*//" /proc/uptime)
	before_mca_pid=$(cat /var/run/mcad.0.pid)
	full_provision=0
	need_cfg_save_file=/var/run/need_cfg_save
	lock_count=30
	if ! do_fast_apply; then
		until lockfile ${need_cfg_save_file}; do
			if [ ${lock_count} -le 0 ]; then
				error_log "Timed out trying to lock ${need_cfg_save_file}"
				break
			fi
			lock_count=$((lock_count - 1))
			sleep 1
		done
		full_provision=1
		/usr/etc/rc.d/rc restart
		unlockfile ${need_cfg_save_file}
	fi
	set_cfg_save
	state_reload
	now=$(sed "s/\..*//" /proc/uptime)
	delta=$((now - before))
	logger "Provision took $delta sec, full=$full_provision"
	# Remove deltas that may be due to time syncs, etc.
	if [ "$delta" -ge 0 -a "$delta" -lt 300 ]; then
		if [ "$full_provision" = 1 ]; then
			add_stat /var/run/provision_time.total $delta
			add_stat /var/run/provision_time.count 1
		else
			add_stat /var/run/fast_apply_time.total $delta
			add_stat /var/run/fast_apply_time.count 1
		fi
	fi
	state_unlock
	# do hardware check - verify that what hardware that can be tested is present and active
	# most effective after provision is complete.
	/sbin/hwcheck &

	# Wait until mcad finish init - background in case mcad invoked this script
	after_mca_pid=$(cat /var/run/mcad.0.pid)
	if [ "$full_provision" = 0 -a "$before_mca_pid" = "$after_mca_pid" ]; then
		mca-ctrl -t notify-bg-provision-done &
	fi
	;;
if-up-event)
	# if-up-event <interface>
	ifname=$1
	if [ -f /var/run/if_up_hook.$ifname ]; then
		/bin/sh /var/run/if_up_hook.$ifname
	fi
	;;
soft-restart)
	need_cfg_save_file=/var/run/need_cfg_save
	lock_count=30
	exit_if_busy $cmd $*
	run_ssh_safe "$@"
	state_lock
	until lockfile ${need_cfg_save_file}; do
		if [ ${lock_count} -le 0 ]; then
			error_log "Timed out trying to lock ${need_cfg_save_file}"
			break
		fi
		lock_count=$((lock_count - 1))
		sleep 1
	done
	/usr/etc/rc.d/rc restart
	unlockfile ${need_cfg_save_file}
	state_reload
	state_unlock
	;;
save-config)
	state_lock
	set_cfg_save
	state_unlock
	;;
reload)
	exit_if_busy $cmd $*
	exit_if_state_lock_failed $cmd $*
	state_reload
	state_unlock
	helper_ssid_war
	;;
set-ready)
	# called by mcagent
	state_lock
	set_state_ready
	state_unlock
	;;
*able-vwire-bcast)
	exit_if_fake $cmd $*
	exit_if_busy $cmd $*
	payload=`cat /var/run/vwire.payload`
	[ "$cmd" = "enable-vwire-bcast" ] && payload=`cat /var/run/vwire.payloadbcast`
	for ath in `ls /proc/sys/net | grep vwire`; do
		/bin/vwirectl -i $ath -p $payload
	done
	;;
set-meshv3-payload)
	killall -SIGUSR1 mesh-monitor
	;;
unset-meshv3-payload)
	killall -SIGUSR2 mesh-monitor
	;;
enter-isolated)
	# Disconnect could be due to switch port native vlan change
	renew_all_ips
	;;
dump-isolation-log)
	# Do not dump isolation logs just after uplink-monitor restart as they are expected
	if [ `expr $(date +%s) - $(stat -c %Y /proc/$(pidof uplink-monitor))` -gt 90 ]; then
		dump_syslog_to_persistent "$@"
		# save done by uplink-monitor
	fi
	;;
dump-wificoredump-log)
	if [ "$#" -eq 3 ]
	then
		if [ "${RADIO_MT7981}" = "1" ]
		then
			# U6+ write log to emmc
			log "dumping wificoredump to emmc $1 $2 $3"
			save_emmc_log $1 $2 $3

			# Panic on 10th timeout
			if [ "$2" = "10" ]
			then
				log "Panic on 10th timeout"
				echo "===== FWCmdTimeout: panic from syswrapper =====" > /dev/console
				echo c > /proc/sysrq-trigger
			fi
		fi
	else
		echo "Arguments are not equals to 3.[Timetamp][WifiCoreDump_Cnt][need_tar(y/n)]"
	fi

	if [ "$2" = "1" ]
	then
		log "Change RCU stall timeout to 3sec on first timeout"
		echo 3 > /sys/module/rcupdate/parameters/rcu_cpu_stall_timeout
	fi
	;;
read-crash-log)
	if [ "${RADIO_MT7981}" = "1" ]
	then
		read_emmc_log
	else
		oopsdump
	fi
	;;
send-wificoredump)
	dump_type=$1
	dump_file=$2
	if [ -f "${dump_file}" ]; then
		ubntbox ramdump $dump_type $dump_file
	else
		echo "WiFi dump file ${dump_file} doesn't exists"
	fi
	;;
set-element-payload)
    killall -SIGUSR1 element-adopt-monitor
    ;;
unset-element-payload)
    killall -SIGUSR2 element-adopt-monitor
    ;;
ssh-adopt)
	ip=$1
	url=`grep mgmt.servers.1.url /etc/persistent/cfg/mgmt | cut -d '=' -f 2`
	# use the most ordinary form to set-inform
	DROPBEAR_PASSWORD=ubnt ssh ubnt@$ip -y mca-ctrl -t connect -s $url
	;;
set-selfrun)
	set_selfrun
	;;
unset-selfrun)
	unset_selfrun
	;;
set-inform)
    exit_if_fake $cmd $*
    # set-inform <url>
    mca-cli-op set-inform $1
    ;;
restart)
	exit_if_fake $cmd $*
	exit_if_busy $cmd $*
	/usr/bin/mca-custom-alert.sh -k "event_string" -v "Restart" -k "re_type" -v "reboot" -k "reason" -v "$1"
	do_restart $1
	;;
restore-default)
	CFG_DEV=`/bin/mmc_info -Fn cfg`
	reason=${1:-'unknown'}
	ubntbox trace -n 'unifi:network:firmware:event' -t 'restore-default' "{
		\"ppid_comm\": \"$(ppid_comm)\",
		\"ppid_cmdline\": \"$(ppid_cmdline)\",
		\"reason\": \"$reason\"
	}"
	/usr/bin/mca-custom-alert.sh -k "event_string" -v "Restart" -k "re_type" -v "restore-default" -k "reason" -v "${reason}"
	state_lock
	if [ -d "/proc/ubnt_ledbar" ]; then
		# Set ledbar brightness to max during reset
		echo "255" > /proc/ubnt_ledbar/brightness
	fi
	if [ -x "/sbin/lcm-ctrl" ]; then
		/sbin/lcm-ctrl -t state -o reset
	fi
	# Set led to blue/white color during reset
	_set_led 3 120 1

	sysmon_ctrl -t factory_def -i 30

	# stop cfgmon from saving cfg
	rm -f /var/run/need_cfg_save

	# do rc stop before cleanup mtd
	call_plat restore_default
	if [ "$CFG_DEV" = "" ]; then
		if [[ -t 1 || -p /dev/stdin ]]; then
			cfgmtd -c
		else
			(cfgmtd -c 2>&1) > /dev/null
		fi
	fi
	if [ -e /etc/fw_env.config -a -n "$(which fw_printenv)" ]; then
		# Set flag to default state for standalone issue
		is_default=$(get_fw_env is_default)
		if [ "${is_default}" = "false" ]; then
			set_fw_env is_default true
		fi
	fi
	state_unlock
	$0 restart "restore-default"
	;;
shutdown)
	exit_if_fake $cmd $*
	exit_if_busy $cmd $*
	_shutdown
	;;
download-firmware)
	check_if_ip_ready
	if [ "$?" = "1" ]; then
		$0 restart "fwupgrade-ip-not-ready"
	else
		$0 _download-firmware "$@" &
	fi
	;;
_download-firmware)
	# prior to download check for memfree
	memfree=`awk '{if ($1 == "MemFree:") {print $2}}' /proc/meminfo`
	if [ "$memfree" -lt 9800 ]; then
		sed -i '/mesh-monitor\|stamgr\|utermd\|hostapd\|wevent/d' /etc/inittab
		init -q
	fi
	# download-firmware <url> md5 <md5> sha256 <sha256>
	url="$1"
	md5=
	sha256=
	if [ "$#" -ge 3 ]; then
		if [ "$2" = "md5" ]; then
			if [ "$3" != "sha256" ]; then
				md5="$3"
				shift 2
			else
				shift 1
			fi
		fi
		if [ "$2" = "sha256" ]; then
			sha256="$3"
		fi
	fi
	fw_path="/tmp/fwupdate.bin"
	rc=1
	fwutil_cmd=$(command -v fwutil 2>/dev/null)
	http_code=0
	if [ -n "${fwutil_cmd}" ]; then
		logger "Upgrade FW Downloading:"
		$fwutil_cmd -d "$url" -p "$fw_path"
		rc=$?
		if [ $rc -eq 0 ]; then
			http_code=200
		else
			logger "Download ...Failed, rc:$rc. Try Again"
		fi
	fi
	if [ $rc -ne 0 ]; then
		logger "Upgrade Firmware Downloading:"
		full_cmd="curl -s --retry 1 --connect-timeout 10 -L -o $fw_path -w %{http_code} $url"
		http_code=$(curl_with_retry "$full_cmd")
		rc=$?
	fi
	if [ "${http_code}" != "200" ]; then
		echo "error http code: ${http_code}" | logger
		download_err "${rc}" "${http_code}"
		rm -f ${fw_path}
		touch ${FW_DOWNLOAD_FAILED_FILE}
		exit 1
	else
		logger "Download ...OK"
		upgrade_ready "FWDownloadOK"

		if [ -n "$sha256" ]; then
			fw_sha256=$(sha256sum "$fw_path" | awk '{ print $1; }')
			if [ "$sha256" != "$fw_sha256" ]; then
				logger "SHA-256 does not match."
				upgrade_err "1" "FirmwareCheckFailed" "SHA256Mismatch" "{\"sha256\": \"${fw_sha256}\", \"file_size\": \"$(stat -c %s ${fw_path})\"}"
				rm -f ${fw_path}
				touch ${FW_DOWNLOAD_FAILED_FILE}
				exit 1
			fi
		elif [ -n "$md5" ]; then
			fw_md5=$(md5sum "$fw_path" | awk '{ print $1; }')
			if [ "$md5" != "$fw_md5" ]; then
				logger "MD5 does not match."
				upgrade_err "1" "FirmwareCheckFailed" "MD5Mismatch" "{\"md5\": \"${fw_md5}\", \"file_size\": \"$(stat -c %s ${fw_path})\"}"
				rm -f ${fw_path}
				touch ${FW_DOWNLOAD_FAILED_FILE}
				exit 1
			fi
		fi

		EXEC_OUT=$(fwupdate.real -c 2>&1)
		EXEC_STATUS=$?
		logger "Upgrade Firmware Check:"
		if [ "${EXEC_STATUS}" != "0" ]; then
			echo "${EXEC_OUT}" | logger
			EXEC_OUT_ESC=$(echo "$EXEC_OUT" | sed -e 's/"/\\"/g')  # Escape double quotes to ensure JSON in upgrade_err is created correctly
			upgrade_err "${EXEC_STATUS}" "FirmwareCheckFailed" "fwupdateFailed" "{\"console\": \"${EXEC_OUT_ESC}\"}"
			rm -f ${fw_path}
			touch ${FW_DOWNLOAD_FAILED_FILE}
			exit 1
		else
			logger "Check ...OK"
			upgrade_ready "FWCheckOK"
			cat /proc/uptime > /var/run/download_firmware.finished
			mca-cli-op inform
			exit 0
		fi
	fi
	;;
upgrade)
	exit_if_fake $cmd $*
	# upgrade <url>
	mca-cli-op upgrade "$1"
	;;
upgrade2)
	exit_if_fake $cmd $*
	run_ssh_safe "$@"
	# upgrade2
	state_lock
	do_upgrade
	state_unlock
	;;
getlastfwupdate)
	exit_if_fake $cmd $*
	do_getlastfwupdateresult
	rc=$?
	return $rc
	;;
getcurrentfwupdate)
	exit_if_fake $cmd $*
	do_getcurrentfwupdatestatus
	rc=$?
	return $rc
	;;
fwupdate)
	exit_if_fake $cmd $*
	run_ssh_safe "$@"
	do_fwupdate $*
	rc=$?
	return $rc
	;;
ble-stp)
	exit_if_fake $cmd $*
	ble_stp $@
	;;
ble-check)
        exit_if_fake $cmd $*
        ble_check $@
        ;;
kick-sta)
	exit_if_fake $cmd $*
	kick_sta $1
	;;
kick-sta-on)
	exit_if_fake $cmd $*
	kick_sta_on $2 $1 $3
	;;
block-sta)
	exit_if_fake $cmd $*
	driver_kick_block_sta $1
	add_mac /etc/persistent/cfg/blocked_sta "$1"
	state_lock
	set_cfg_save
	state_unlock
	;;
unblock-sta)
	exit_if_fake $cmd $*
	del_mac /etc/persistent/cfg/blocked_sta "$1"
	driver_unblock_sta $1
	state_lock
	set_cfg_save
	state_unlock
	;;
apply-blocked-sta)
	driver_apply_blocklist
	;;
apply-blocked-sta-ifup)
	driver_apply_blocklist_ifup $1
	;;
redirector-init)
	exit_if_fake $cmd $*
	guest_redirector_init_iptables "$@"
	;;
redirector-deinit)
	exit_if_fake $cmd $*
	guest_redirector_deinit_iptables "$@"
	;;
authorize-guest)
	exit_if_fake $cmd $*
	guest_authorize "$@"
	;;
unauthorize-guest)
	exit_if_fake $cmd $*
	guest_unauthorize "$@"
	kick_sta $1
	;;
apply-authorized-guests)
	exit_if_fake $cmd $*
	guest_authorized_reload "$@"
	;;
clear-authorized-guests)
	exit_if_fake $cmd $*
	guest_authorized_flush "$@"
	;;
handle-dyn)
	exit_if_fake $cmd $*
	handle_dyn "$@"
	;;
refresh-walled-garden)
	exit_if_fake $cmd $*
	if_seq=$1
	/bin/walled_action.sh /tmp/allowed.${if_seq}.txt /tmp/restricted.${if_seq}.txt &
	;;
kill-mcad)
	log "kill-mcad. reason: $*"
	# only kill mcad but other daemons
	kill_pid mcad `cat /var/run/mcad.0.pid`
	sleep 1
	# rely on /etc/inittab to start it
	;;
kill-inform-collector)
	log "kill-inform-collector. reason: $*"
	killall inform-collector
	sleep 1
	killall -9 inform-collector
	# rely on /etc/inittab to start it
	;;
mca-custom-alert)
	if [ ! -e /var/run/ipready.* ]; then
		exit 1
	fi
	exit_if_busy $cmd $*
	exit_if_state_lock_failed $cmd $*
	do_custom_alert "$@"
	state_unlock
	;;
mca-send-inform)
	if [ ! -e /var/run/ipready.* ]; then
		exit 1
	fi
	exit_if_busy $cmd $*
	exit_if_state_lock_failed $cmd $*
	do_mca_send_inform
	state_unlock
	;;
gen-sup-file)
	supdir="`mktemp -d -p /tmp`"
	supfile="$supdir.tgz"
	support -d $supdir
	tar -C $supdir -czf $supfile .
	mca-custom-alert.sh -d -k supportfile -f $supfile
	rm -rf $supdir $supfile
	;;
lcm-sync)
	src_mac="$1"
	screen="$2"
	timestamp="$3"
	if [ -x "/sbin/lcm-ctrl" ]; then
		/sbin/lcm-ctrl -t screen -o $screen -s $src_mac -m $timestamp
	fi
	;;
lcm-tracker)
	op="$1"
	if [ -x "/sbin/lcm-ctrl" ]; then
		/sbin/lcm-ctrl -t ar -o "$op"
	fi
	;;
schedule-action)
	schedule_action
	;;
run)
	eval $* &
	;;
dfs-reset)
	dfs_reset
	;;
netconsole)
	for moddir in /etc/modules*.d /lib/modules/$(uname -r); do
		if [ -f $moddir/netconsole.ko ]; then
			netconsole_daemon "$@"
			break;
		fi
	done
	;;
wireless-bridge-link-switch)
	exit_if_busy $cmd $*
	state_lock
	do_linkswitch
	state_reload
	state_unlock
	;;
wireless-vlan-add)
	guest_update_interface_ebtables add "$1"
	;;
wireless-vlan-del)
	guest_update_interface_ebtables del "$1"
	;;
install-runtime-package)
	install_runtime_package "$@"
	;;
clear-vlan-detected)
	clear_vlan_detected "%@"
	;;
cache-vlan-detected)
	cache_vlan_detected "$@"
	;;
vlan-detected)
	vlan_detected "$@"
	;;
vlan-detected-lock)
	state_lock
	vlan_detected "$@"
	state_unlock
	;;
del-bridge-vlans)
	del_bridge_vlans "$@"
	;;
reboot-trace)
	ppid=${1}
	reason=${2:-'unknown'}
	ubntbox trace -n 'unifi:network:firmware:event' -t 'reboot' "{
		\"ppid_comm\": \"$(ppid_comm $ppid)\",
		\"ppid_cmdline\": \"$(ppid_cmdline $ppid)\",
		\"reason\": \"$reason\",
		\"is_setup\": \"$is_setup_completed\"
	}"
	;;
setup-trace)
	# Use anonymous_device_id as the setup_device_id
	device_anonid=$(get_config_value /proc/ubnthal/system.info device.anonid)
	session_id=$1
	setup_step=$2
	timestamp=$3
	duration=$4
	ubntbox trace -n 'unifi:network:firmware:setup' -t 'setup_step' "{
		\"setup_device_id\":\"$device_anonid\",
		\"setup_id\": \"$session_id\",
		\"setup_step\": \"$setup_step\",
		\"start_time\": \"$timestamp\",
		\"duration\": \"$duration\"
	}"
	;;
ssh-trace-login)
	do_ssh_trace
	;;
ssh-trace-cmd)
	interactive=false
	command_number=null
	command=
	while [ $# -gt 0 ]; do
		case "$1" in
		-i)
			interactive=true
			;;
		-c)
			shift
			command=$(echo "$1" | sensitive_data_filter | sed 's/"/\\"/g')
			if [ ${#command} -gt 1024 ]; then
				command="${command:0:1024}..."
			fi
			;;
		-n)
			shift
			command_number=$1
			;;
		esac
		shift
	done
	if [ -z "$command" -o "$command" = exit ]; then
		exit 0
	fi
	extra_json="
	\"interactive\":${interactive},
	\"command_number\":${command_number},
	\"command\":\"${command}\""
	do_ssh_trace "${extra_json}"
	;;
sensitive-data-filter)
	sensitive_data_filter
	;;
systemcfg-sensitive-data-filter)
	systemcfg_sensitive_data_filter
	;;
relayctl)
	_do_relay_ctl "$@"
	;;
do-ir-send)
	_do_ir_send $@
	;;
ssh-safe)
	run_ssh_safe "$@"
	"$@"
	;;
get-tmpfs-usage)
	do_get_tmpfs_usage
	;;
dump-pci-info)
	dump_pci_info "$@"
	;;
check-is-adopted)
	[ $(get_fw_env is_default) = false -o $(get_mgmt_cfg mgmt.is_default) = false ] && return 0
	;;
cfg_save_check)
	need_cfg_save_file=/var/run/need_cfg_save
	until lockfile ${need_cfg_save_file}; do
		error_log "cfg_save_check: Timed out trying to lock ${need_cfg_save_file}"
		return
	done
	if [ -f /var/run/need_cfg_save ]; then
		if [ ! -d /etc/persistent/cfg ]; then
			log "cfg_save_check: cfg folder missing"
			mkdir -p /etc/persistent/cfg
		fi
		sanitize_cfg
		cfgmtd -w -p /etc /tmp/system.cfg
		if [ $? -ne 0 ]; then
			ls -alR /etc/persistent/ |logger
			cfgmtd -r -p /tmp/run -f /tmp/run/read.cfg
			ls -alR /tmp/run/persistent/ |logger
			ls -al /tmp/run/read.cfg /tmp/system.cfg |logger
			rm -rf /tmp/run/persistent
		fi
		rm -f /var/run/need_cfg_save
	fi
	unlockfile ${need_cfg_save_file}
	;;
mesh-halt)
	mca-cli-op mesh-halt "$1"
	;;
*)
	exit 1
	;;
esac
