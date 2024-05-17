#!/bin/sh
# vim: ts=4:sw=4:expandtab

. /lib/upgrade/common.sh
. /lib/upgrade/platdep_funcs.sh

PATH=$PATH:/usr/sbin:/usr/bin
NETCONSOLE_PIDFILE=/var/run/netconsole-init.pid
LOG_STD_OUT=""

log() {
	logger ${LOG_STD_OUT} -t "syswrapper" "$*"
}

# enable verbose logging
if [ -e /tmp/debug ]; then
        log $*
	LOG_STD_OUT="-s"
        set -x
fi

exit_if_fake() {
	if [ "`uname -a | grep -E \"mips|arm\"`" = "" -o -f "/tmp/FAKE" ] ; then
		# fake, simply dump it to console and exit 0
		logger -s -t "syswrapper" "[fake] skipping $*"
		exit 0
	fi
}

set_state() {
	echo $1 > /var/run/system.state
}

set_led() {
    action=$1
    mode=$(cat /proc/ubnt_ledbar/mode)
    shift
    case ${action} in
	upgrade)
	    echo 1 25 3 7 > /proc/ubnt_ledbar/mode
	    ;;
	locate)
	    echo 1 5 0 > /proc/ubnt_ledbar/mode
	    ;;
	boot)
	    echo 1 25 0 7 > /proc/ubnt_ledbar/mode
	    ;;
	color)
	    echo 0 ${1} > /proc/ubnt_ledbar/mode
	    ;;
	ready)
    	    if [ "$mode" == "blink" ]; then
		echo 0 > /proc/ubnt_ledbar/mode
	    fi
	    ;;
	*)
	    ;;
    esac
}

lockfile() {
        TEMPFILE="$1.$$"
        LOCKFILE="$1.lock"
        ( ( echo $$ > $TEMPFILE ) > /dev/null 2>&1 ) || \
        {
		log "[permission denied] fail to lock $1"
                return 1
        }
        ln $TEMPFILE $LOCKFILE > /dev/null 2>&1 && \
        {
                rm -f $TEMPFILE
                return 0
        }
        kill -0 `cat $LOCKFILE` > /dev/null 2>&1 && \
        {
                rm -f $TEMPFILE
                return 1
        }
        log "[stale lock] removing stale lock file"
        rm -f $LOCKFILE
        ln $TEMPFILE $LOCKFILE > /dev/null 2>&1 && \
        {
                rm -f $TEMPFILE
                return 0
        }
        rm -f $TEMPFILE
        return 1
}

state_lock() {
	until lockfile /var/run/system.state; do
		log "[state is locked] waiting for lock"
		sleep 1
	done
}

state_unlock() {
	/bin/rm -f "/var/run/system.state.lock"
}

guest_lock() {
    until lockfile /var/run/guest-lock; do
        log "[guest state is locked] waiting for lock"
        sleep 1
    done
}

guest_unlock() {
    /bin/rm -f "/var/run/guest-lock.lock"
}

# obtain lock first
set_state_ready() {
	set_state 'ready'
	state_reload
}

exit_if_busy() {
	if [ -f /var/run/system.state ] ; then
		state=`cat /var/run/system.state`
		if [ "$state" != "ready" ] ; then
			logger -s -t "syswrapper" "[busy] skipping: $*"
			exit 0
		fi
	fi
}

# this would lock system state
exit_if_state_lock_failed() {
	lockfile /var/run/system.state || \
	{
		log "[state is locked] skipping $*"
		exit 0
	}
}

# obtain lock first
state_reload() {
	state="init"
	uplink="unknown"
	default="true"
	locating="false"
	if [ -f /proc/ubnthal/status/IsDefault ]; then
		default=`cat /proc/ubnthal/status/IsDefault`
	fi
	if [ -f /proc/ubnthal/status/IsLocated ]; then
		locating=`cat /proc/ubnthal/status/IsLocated`
	fi
	if [ -f /var/run/system.state ] ; then
		state=`cat /var/run/system.state`
	fi
	if [ -f /var/run/system.uplink ]; then
		uplink=`cat /var/run/system.uplink`
	fi
	if [ "$state" == "upgrading" ]; then
		# echo upgrading
		set_led upgrade
		return
	fi
	if [ "$locating" == "true" ]; then
		set_led locate
		return
	fi
	if [ "$default" == "true" ]; then
		set_led color 7
		return
	fi
	if [ -f /var/run/system.selfrun ]; then
		# echo selfrun
		set_selfrun
	else
		# echo managed
		unset_selfrun
	fi

	if [ "$state" == "ready" ]; then
		# echo ready
		set_led ready
		return
	fi

	set_led ready
}

set_selfrun() {
	if [ -f /var/run/system.selfrun.lock ]; then
		return
	fi
	touch /var/run/system.selfrun.lock
}

unset_selfrun() {
	if [ -f /var/run/system.selfrun.lock ]; then
		rm -f /var/run/system.selfrun.lock
	fi
}

# obtain lock first
cfg_save() {
	set_state 'cfgupdate'
	cfgmtd -w -p /etc /tmp/system.cfg
	set_state_ready
}

curl_with_retry() {
	local cmd=$1
	local tries=10
	for x in $(seq ${tries}); do
		log "executing: ${cmd}"
		http_code=`${cmd}`
		rc=$?
		log "rc ${rc}, http result: ${http_code}"
		if [ "$rc" = "0" ]; then
			if [ "${http_code}" = "200" ]; then
				break
			elif echo "$cmd" | grep -i -q 'ftp://' && [ "${http_code}" = "226" ]; then
				http_code=200
				break
			fi
		fi
		if [ $(expr ${x}) -ne $tries ]; then
			log "download failed, will try again in 10 seconds"
			sleep 10
		fi
	done

	echo ${http_code}
	return $rc
}
# add_mac <file> <mac>
# The guest lock must be acquired by calling guest_lock before calling add_mac
add_mac() {
	if [ ! -f $1 ]; then
		# file doesn't exist, just add it
		echo "$2" >> $1
		return
	fi
	macpresent=`grep -c $2 $1`
	if [ "$macpresent" = 1 ]; then
		# there once, no need for action
		return
	elif [ "$macpresent" -gt 1 ]; then
		# there multiple times, clean up and add
		del_mac "$1" "$2"
		echo "$2" >> $1
		return
	else
		# not there, just add
		echo "$2" >> $1
		return
	fi
}

# del_mac <file> <mac>
# The guest lock must be acquired by calling guest_lock before calling del_mac
del_mac() {
	file=$1
	mac=$2
	tmp=/tmp/macs.`basename $file`
	exists=`grep -c $mac $file`
	if [ "$exists" = 0 ]; then
		return
	else
		grep -vi "$mac" $file > $tmp
		cp $tmp $file
	fi
}

# returns "yes" | "no"
portal_enabled() {
	grep redirector.status=enabled /config/unifi > /dev/null
	if [ $? -eq 0 ]; then
		# one or more lines matched, enabled
		echo "yes"
	else
		# no lines matched or error encountered
		echo "no"
	fi
}


do_fast_apply() {
	rm -rf /tmp/apply.sh
	if ubntconf -c /tmp/system.cfg -p /tmp/running.cfg -d /tmp/apply.sh; then
		log "[apply-config] using fast apply"
		if [ -f /tmp/apply.sh ]; then
			if /bin/sh /tmp/apply.sh; then
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

upgrade_err() {
	local err_code
	err_code=$1
	shift
	local msg
	msg=$*
	mca-custom-alert.sh -k "event_string" -v "Upgrade" -k "up_type" -v "UpgradeError" -k "rc" -v "${err_code}" -k "reason" -v "${msg}"
	#sleep for send out the notification to the controller
	sleep 2
}

upgrade_err_and_restart() {
    upgrade_err "$@"
    sleep 10
    /sbin/reboot
}

download_err() {
	local curl_err_code=$1
	shift
	local http_code=$1
	shift
	mca-custom-alert.sh -k "event_string" -v "Upgrade" -k "up_type" -v "UpgradeError" -k "curl_rc" -v "${curl_err_code}" -k "http_rc" -v "${http_code}" -k "reason" -v "FirmwareDownloadFailed"
	#sleep for send out the notification to the controller
	sleep 2
}

download_err_and_restart() {
    download_err "$@"
    sleep 10
    /sbin/reboot
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

do_upgrade() {
	local rc
	set_state 'upgrading'
	set_led upgrade
	_upgrade
	rc=$?
	return ${rc}
}

update_ip() {
    if [ "x$2" != "x" ]; then
	OLDIP=`cat /var/run/ipready.$1`
	echo "$2" > /var/run/ipready.$1
	log "ipready.$1 = $2"
    	echo "Notify processes that needs to know"
	[ "${OLDIP}" != "${2}" ] && pkill -f "dropbear .* \(-p ${1}:\|-p ${OLDIP}:\)"
	[ -f /var/run/lldpd_para.sh ] && sh /var/run/lldpd_para.sh &
    fi
}


host_lookup() {
  host=$(nslookup "$1" 2>/dev/null)
  if [ $? -ne 0 ]; then return 1; fi
  echo "$host" | grep "Address 1" | tail -n1 | awk '{print $3}'
}

netconsole_init() {
  local port=${2:-514}
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
  local arp=$(cat /proc/net/arp | grep "^$esc_lan_ip[[:space:]]" | awk '{print $4}')
  if [ ! "$arp" -o "$arp" = 00:00:00:00:00:00 ]; then return 2; fi
  rmmod netconsole 2>/dev/null
  insmod netconsole "netconsole=514@$my_ip/eth0,$port@$ip/$arp"
}

netconsole_loop() {
  local tries=10
  dmesg -n 8
  while [ $tries -gt 0 ]; do
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

send_link_event() {
    active_mode=$(ubb_cli active_mode)
    prev_mode=$([ -f /var/run/active_mode ] && cat /var/run/active_mode )
    if [ ! -z "${prev_mode}" ] && [ "${prev_mode}" != "${active_mode}" ]; then
	radio_from=${prev_mode}
	radio_to=${active_mode}
	mca-custom-alert.sh -k "event_string" -v "Link" \
	    -k "li_type" -v "RadioChanged" \
	    -k "radio_from" -v "${radio_from}" \
	    -k "radio_to" -v "${radio_to}"
    fi
    echo "${active_mode}" > /var/run/active_mode
}

do_update_uplink() {
    # small delay to allow uplink to settle
    sleep 2
    port_no=$(brctl showmacs br0 | grep $(arping -c 5 -f -I $(ip route show match 0/0 | awk '{print $5, $3}') | awk '/reply from/ {print $5 }' | tr -d '][' | sed 's/\b\(\w\)\b/0\1/g') | awk '{print $1}')
    active_wireless=$(ubb_cli active_radio)
    mode=$(ubb_cli mode)
    [ "$mode" == "ap-ptp" ] && send_link_event
    for i in /sys/class/net/br0/brif/*; do
	if grep -q "0x$port_no" $i/port_no; then
	    iface=$(basename $i); 
	    rm /var/run/vapusage.*
	    case ${iface} in
		ubond0)
		    echo $active_wireless > /var/run/system.uplink_ifname
		    echo "uplink" > /var/run/vapusage.${active_wireless}
		    ;;
		*)
		    echo $iface > /var/run/system.uplink_ifname
		    echo "downlink" > /var/run/vapusage.${active_wireless}
		    ;;
	    esac
	fi
    done

    # force an inform, so link status updates in the controller immediately
    mca-ctrl -t inform
}

do_list_neighbors() {
    uplink=$(cat /var/run/system.uplink_ifname)
    case ${uplink} in
	eth0)
	    downlink="ubond0"
	    ;;
	*)
	    downlink="eth0"
	    ;;
    esac
    lldpcli show neighbors -f keyvalue | awk -F'=' '/lldp.'${downlink}'.chassis.mac/ {print $2}'
}

do_download_firmware() {
    # prior to download check for memfree
    memfree=`awk '{if ($1 == "MemFree:") {print $2}}' /proc/meminfo`
    if [ "$memfree" -lt 9800 ]; then
	sed -i '/mesh-monitor\|stamgr\|utermd\|hostapd\|wevent/d' /etc/inittab
	init -q
    fi
    # download-firmware <url> md5 <md5> sha256 <sha256> <skip-downlaod> <skip-flash>
    skip_download=0
    skip_flash=0
    url="$1"
    shift
    while [ $# -gt 0 ]; do
	case "$1" in
	    "md5")
		if [ ${#2} -eq 32 ]; then
		    md5=$2
		    shift
		fi
		;;
	    "sha256")
		if [ ${#2} -eq 64 ]; then
		    sha256=$2
		    shift
		fi
		;;
	    "skip-download")
		skip_download=1
		;;
	    "skip-flash")
		skip_flash=1
		;;
	    *)
		echo "unknown argument: $1" >&2
		;;
	esac
	shift
    done

    fw_path="/tmp/fwupdate.bin"
    rc=1
    fwutil_cmd=$(command -v fwutil 2>/dev/null)
    http_code=0
    if [ -n "${fwutil_cmd}" ]; then
	log "Upgrade FW Downloading:"
	$fwutil_cmd -d "$url" -p "$fw_path"
	rc=$?
	if [ $rc -eq 0 ]; then
	    http_code=200
	else
	    logger "Download ...Failed, rc:$rc. Try Again"
	fi
    fi
    if [ $skip_download -eq 0 ]; then
	if [ $rc -ne 0 ]; then
	    log "Upgrade Firmware Downloading:"
	    full_cmd="curl --cacert /etc/ssl/cert.pem -s --retry 3 --retry-delay 3 -L -o $fw_path -w %{http_code} $url"
	    http_code=$(curl_with_retry "$full_cmd")
	    rc=$?
	fi
	if [ "${http_code}" != "200" ]; then
	    echo "error http code: ${http_code}" | logger
	    download_err_and_restart "${rc}" "${http_code}"
	else
	    log "Download ...OK"
	    upgrade_ready "FWDownloadOK"

	    if [ -n "$sha256" ]; then
		fw_sha256=$(sha256sum "$fw_path" | awk '{ print $1; }')
		if [ "$sha256" != "$fw_sha256" ]; then
		    log "SHA-256 does not match."
		    upgrade_err_and_restart "1" "FirmwareCheckFailed"
		fi
	    elif [ -n "$md5" ]; then
		fw_md5=$(md5sum "$fw_path" | awk '{ print $1; }')
		if [ "$md5" != "$fw_md5" ]; then
		    log "MD5 does not match."
		    upgrade_err_and_restart "1" "FirmwareCheckFailed"
		fi
	    fi
	fi
    fi
    EXEC_OUT=$(fwupdate.real -c 2>&1)
    EXEC_STATUS=$?
    log "Upgrade Firmware Check:"
    if [ "${EXEC_STATUS}" != "0" ]; then
	echo "${EXEC_OUT}" | logger
	upgrade_err_and_restart "${EXEC_STATUS}" "FirmwareCheckFailed"
    else
	    log "Check ...OK"
	    upgrade_ready "FWCheckOK"
	if [ $skip_flash -eq 0 ]; then
	    if [ -e /etc/persistent/cfg/mgmt ] &&  grep -q -v 'mgmt.is_default=false' /etc/persistent/cfg/mgmt; then 
		cat /proc/uptime > /var/run/download_firmware.finished
		mca-cli-op inform
	    else
		fwupdate -m &
	    fi
	fi
	exit 0
    fi
}

do_alignment_mode() {
    enable=$1

    if [ "${enable}" -eq 1 ]; then
	touch /var/run/mode.aiming
    else 
	rm -f /var/run/mode.aiming
    fi
    pkill -SIGUSR1 peer-monitor
}

renew_ip_on_subnet_change() {
	local ifname=$1
	local newSubnet=$2
	local newNetmask=$3
	local startRetry=$4
	local retryTimer=$5
	local stopRetry=$6
	local pid=`cat /var/run/udhcpc.$ifname.pid`
	#sleep for a while to give some time for subnet change, dhcp server restart
	log "renew_ip_on_subnet_change sleeps for $startRetry seconds"
	sleep $startRetry
	# try to renew ip for at most stopRetry(300) seconds.
	while [ $stopRetry -gt 0 ]; do
		#release current release and obtain a new lease
		/usr/bin/kill -SIGUSR2 $pid
		/usr/bin/kill -SIGUSR1 $pid
		log "renew_ip_on_subnet_change sleeps for $retryTimer seconds"
		sleep $retryTimer
		stopRetry=$((stopRetry - retryTimer))

		local ip=`ifconfig $ifname | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*'`
		if [ ! -z "$ip" ]; then
			local valid=1
			#check if the device ip is in the new subnet. If so, we are done.
			for i in 1 2 3 4; do
				local ip_octet=`echo "$ip" | cut -d . -f $i`
				local netmask_octet=`echo "$newNetmask" | cut -d . -f $i`
				local subnet_octet=`echo "$newSubnet" | cut -d . -f $i`
				if [ $(( $ip_octet & $netmask_octet )) -ne $subnet_octet ]; then
					valid=0
					break
				fi
			done
			if [ "$valid" -eq 1 ]; then
				log "dchp renew: got a valid ip. ip: $ip. exiting."
				break
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

sensitive_data_filter() {
	BYTE='(25[0-5]|2[0-4][0-9]|[01]?[0-9]?[0-9])'
	IPV4="\<(${BYTE}\.){3}${BYTE}\>"
	HEXTET='[0-9a-fA-F]{1,4}'
	HEXBYTE='[a-fA-F0-9]{2}'

	# 6 hexadecimal bytes with optional separator from set ' :-' and none
	MAC_SED0="s/\<(${HEXBYTE}){6}\>/censored-mac/g"
	MAC_SED1="s/\<(${HEXBYTE} ){5}${HEXBYTE}\>/censored-mac/g"
	MAC_SED2="s/\<(${HEXBYTE}:){5}${HEXBYTE}\>/censored-mac/g"
	MAC_SED3="s/\<(${HEXBYTE}-){5}${HEXBYTE}\>/censored-mac/g"

	# IPv4 address
	IPV4_SED="s/${IPV4}/censored-ipv4/g"

	# filter out serial number
	SERIAL_NUM=$(awk -F= '/board.hwaddr/ { print $2 }' /proc/ubnthal/board.info)
	SERNUM_SED="s/${SERIAL_NUM}/censored-sn/g"

	sed -r \
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
	    -e "$SERNUM_SED" \
	    -e "$MAC_SED0" -e "$MAC_SED1" -e "$MAC_SED2" -e "$MAC_SED3"\
	    -e "$IPV4_SED" <&0
}

cmd="$1"
shift

case $cmd in
set-adopt)
    # set-adopt <url> <authkey>
    cat /proc/uptime >> /tmp/set_adopt.log
    mca-ctrl -t connect -s "$1" -k "$2"
    ;;
ip-changed)
	update_ip $*
	;;
ip-fallback)
	sleep 30
	if [ ! -f /etc/udhcpc/info.br0 ]; then
	    update_ip $*
	fi
	;;
led-locate)
	exit_if_busy $cmd $*
	# led-locate <duration>
	/usr/bin/pkill led_locate.sh
	# background this one so we'll return immediately
	/usr/bin/led_locate.sh $1 &
	;;
speed-test)
	pkill -USR1 linkcheck
	;;
set-locate)
	exit_if_busy $cmd $*
	exit_if_state_lock_failed $cmd $*
	echo "true" > /proc/ubnthal/status/IsLocated
	state_reload
	state_unlock
	;;
unset-locate)
	exit_if_busy $cmd $*
	exit_if_state_lock_failed $cmd $*
	echo "false" > /proc/ubnthal/status/IsLocated
	state_reload
	state_unlock
	;;
set-alignment)
	exit_if_busy $cmd $*
	exit_if_state_lock_failed $cmd $*
        do_alignment_mode 1
	state_reload
	state_unlock
	;;
unset-alignment)
	exit_if_busy $cmd $*
	exit_if_state_lock_failed $cmd $*
        do_alignment_mode 0
	state_reload
	state_unlock
	;;
apply-config)
	# apply-config <file>
	exit_if_busy $cmd $*
	state_lock
	cfg_save "$1"
	if ! do_fast_apply; then
		/usr/etc/rc.d/rc.softrestart save
	fi
	state_reload
	state_unlock
	mca-ctrl -t notify-bg-provision-done
	;;
save-config)
	state_lock
	cfg_save
	state_unlock
	;;
reload)
	exit_if_busy $cmd $*
	exit_if_state_lock_failed $cmd $*
	state_reload
	state_unlock
	;;
set-ready)
	# called by mcagent
	set_state_ready
	;;
ssh-adopt)
    #FIXKM
	ip=$1
	url=`grep mgmt.servers.1.url /etc/persistent/cfg/mgmt | cut -d '=' -f 2`
	# use the most ordinary form to set-inform
	DROPBEAR_PASSWORD=ubnt ssh ubnt@$ip -y /bin/mca-ctrl -t connect -s $url
	;;
set-selfrun)
	set_selfrun
	;;
unset-selfrun)
	unset_selfrun
	;;
restart)
	exit_if_fake $cmd $*
	exit_if_busy $cmd $*

	# add a small 3 second delay as we may be doing a group reboot
	sleep 3
	/sbin/reboot
	;;
restore-default)
	exit_if_fake $cmd $*
	exit_if_busy $cmd $*
	state_lock
	set_led color 7
	apply_restore_default
	state_unlock
	reboot
	;;
download-firmware)
	do_download_firmware $*
	;;
_download-firmware)
	do_download_firmware $*
	;;
upgrade)
	exit_if_fake $cmd $*
	# upgrade <url>
    state_lock
    do_upgrade "$1"
    ret=$?
    state_unlock
    [ ${ret} -ne 0 ] || /sbin/reboot
	;;
upgrade2)
	exit_if_fake $cmd $*
	# upgrade2
	state_lock
	do_upgrade
	state_unlock
	;;
block-sta)
	exit_if_fake $cmd $*
	guest_lock
	driver_kick_block_sta $1
	add_mac /config/blocked_sta "$1"
	state_lock
	cfg_save
	state_unlock
	guest_unlock
	;;
unblock-sta)
	exit_if_fake $cmd $*
	guest_lock
	del_mac /config/blocked_sta "$1"
	driver_unblock_sta $1
	state_lock
	cfg_save
	state_unlock
	guest_unlock
	;;
apply-blocked-sta)
	driver_apply_blocklist
	;;
init-blocked-dev-list)
	driver_init_blocked_dev_list $*
        ;;
authorize-guest)
	exit_if_fake $cmd $*
	guest_lock
	add_mac /var/run/guest.authorized $1
	authorize_guest $1
	guest_unlock
	;;
unauthorize-guest)
	exit_if_fake $cmd $*
	guest_lock
	del_mac /var/run/guest.authorized $1
	unauthorize_guest $1
	guest_unlock
	;;
apply-authorized-guests)
	exit_if_fake $cmd $*
	if [ "`cat /var/run/guest.authorized`" != "" ] ; then
		authorized_guests_updated /var/run/guest.authorized
	fi
	;;
clear-authorized-guests)
	exit_if_fake $cmd $*
	rm -f /var/run/guest.authorized
	authorized_guests_updated /var/run/guest.authorized
	;;
terminate-remote-user-vpn)
	driver_terminate_remote_user_vpn $*
	;;
init-offload-accounting)
	driver_init_offload_accounting $*
	;;
apply-offload-accounting)
	driver_apply_offload_accounting
	;;
flush-offload-accounting)
        flush_offload_subnet_stats
        ;;
apply-offload-sch)
	driver_apply_offload_sch
	;;
flush-offload-sch)
        flush_offload_sch_stats
        ;;
update-offload-sch-sta)
        driver_update_offload_sch_sta $*
        ;;
apply-offload-dpi)
	driver_apply_offload_dpi
	;;
flush-offload-dpi)
        flush_offload_dpi_stats $*
        ;;
update-offload-dpi-sta)
	echo "$*" > /var/run/dpi_wlan_fw_fifo &
	driver_update_offload_dpi_sta $*
	;;
update-ip-dpi-sta)
	echo "$*" > /var/run/dpi_wlan_fw_fifo &
	;;
geoip-update-controller-ipv4)
	echo -n "$*" > /proc/cavium/accts/geoip.controller_ipv4
	;;
init-redirector)
        driver_init_redirector $*
        ;;
unifi-monitor)
        driver_unifi_monitor $*
        ;;
kill-mcad)
    #FIXKM
	log "kill-mcad. reason: $*"
	pkill mcad
	sleep 1
	pkill -9 mcad
	sleep 1
	rm -f /var/run/system.state
	rm -f /var/run/mcad.*
	# rely on /etc/inittab to start it
	# rely on mca-monitor to trigger on UGW
	/usr/bin/mcad &
	;;
kill-linkcheck)
	log "kill-linkcheck. reason: $*"
	pkill linkcheck
	sleep 1
	pkill -9 linkcheck
	sleep 1
	/usr/bin/linkcheck &
	;;
mca-custom-alert)
	do_custom_alert "$@"
	;;
gen-sup)
	filename=$1
	if [ -z "$filename" ]; then
		filename=support_info.tgz
	fi
	file=/tmp/$filename
	dirname=support_info
	ddir=/tmp/$dirname
	rm -rf $ddir
	rm -rf $file
	mkdir -m 0755 $ddir

	cp /tmp/sysinit.txt $ddir
	cp /etc/board.info $ddir
	cp /tmp/system.cfg $ddir
	cp /usr/lib/version $ddir
	ifconfig -a > $ddir/ifconfig.txt
	iwconfig > $ddir/iwconfig.txt
	athstats > $ddir/athstats.txt
	80211stats -a > $ddir/80211stats.txt
	wlanconfig ath0 list > $ddir/wlist.txt
	dmesg -s 16384 > $ddir/dmesg.txt
	ps > $ddir/ps.txt
	log_status=`cat /tmp/system.cfg|grep syslog.status=enabled`
	if [ -n "$log_status" ]; then
		log_file=`cat /tmp/system.cfg|grep syslog.file|cut -d= -f2`
		if [ -z "$log_file" ]; then
			log_file=/var/log/messages
		fi
		log_rotate=`cat /tmp/system.cfg|grep syslog.rotate|cut -d= -f2`
		if [ -z "$log_rotate" ]; then
			log_rotate=0
		fi
		while [ $log_rotate -gt 0 ]; do
			log_rotate=`expr $log_rotate - 1`
			cat $log_file.$log_rotate >> $ddir/syslog.txt
		done
		cat $log_file >> $ddir/syslog.txt
	fi
	cp /proc/meminfo /proc/slabinfo /proc/loadavg /proc/vmstat /proc/modules /proc/kallsyms /proc/net/arp $ddir
	dd if=/dev/mtdblock`cat /proc/mtd |grep cfg|cut -d: -f1|cut -dd -f2` of=$ddir/part.cfg > /dev/null 2>&1
	dd if=/dev/mtdblock`cat /proc/mtd |grep EEPROM|cut -d: -f1|cut -dd -f2` of=$ddir/part.cfg > /dev/null 2>&1
	tar -C /tmp -zcf $file $dirname
    ;;
detect-uplink)
    do_update_uplink
    ;;

list-neighbors)
    do_list_neighbors
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
# NB: Disable for now until fully supported - not ready for EA
# netconsole)
#	netconsole_daemon "$@"
#	;;
sensitive-data-filter)
	sensitive_data_filter
	;;
*)
	exit 1
	;;
esac
