#!/bin/sh

# This file is expected to be called by net-cgi when customer set guest
# network schedule on Netgear UP APP.
#
# For set 2.4G guest schedule: /sbin/guest_sched.sh set wlg
# The command need to be run is in /tmp/guest_sched
#
# To get 2.4G guest schedule remaining time: /sbin/guest_sched.sh get wlg
# Remaining time would be stored at /tmp/guest_schedule_time

. /etc/wlan/wifi_conf

set_sched() {
	band=$2
	if [ "$band" = "wla_2nd" ]; then
		GUEST_RADIO="11h"
		time=$(/bin/config get wla1_2nd_schedule)	
	elif [ "$band" = "wla" ]; then
		GUEST_RADIO="11a"
		time=$(/bin/config get wla1_schedule)	
	elif [ "$band" = "wlg" ]; then
		GUEST_RADIO="11g"
		time=$(/bin/config get wlg1_schedule)	
	fi

	[ "x$time" = "x0" -o "x$time" = "x" ] && return #Remember to unset this config after timeout

	#Record target time
	now=`date +%s`
	target_time=`expr $now + $time`
	/bin/config set ${band}_guest_target_time=$target_time
	/bin/config commit

	# update_schedule
	update_schedule
}

get_time() {
	atq | while read line
	do
		if [ "$2" = "wla_2nd" ]; then
			GUEST_RADIO="11h"
		elif [ "$2" = "wla" ]; then
			GUEST_RADIO="11a"
		elif [ "$2" = "wlg" ]; then
			GUEST_RADIO="11g"
		fi

		sched_num=`echo $line | awk -F ' ' '{print $1}'`
		sched_cmd=`at -c $sched_num | grep "wlan guestsched $GUEST_RADIO"` # Supposed to be "wlan guestsched 11g off" or "wlan guestsched 11a off"
		[ "${sched_cmd}" = "" ] || {
			target_time=`/bin/config get ${2}_guest_target_time`
			now=`date +%s`
			distance=`expr $target_time - $now`
			echo $distance > /tmp/guest_schedule_time
		}
	done
}

# update_schedule
# after time changed, we need to update schedule.
update_schedule() {
	# We need to clear old jobs first
	rm -f /var/spool/cron/atjobs/*

	for band in $GUEST_BANDS
	do
		if [ "$band" = "wla_2nd" ]; then
			GUEST_RADIO="11h"
		elif [ "$band" = "wla" ]; then
			GUEST_RADIO="11a"
		elif [ "$band" = "wlg" ]; then
			GUEST_RADIO="11g"
		fi
		target_time=`/bin/config get ${band}_guest_target_time`
		[ "$target_time" -gt "0" ] && { 
			now=`date +%s`
			if [ "$target_time" -gt "$now" ]; then # still no timeout, reset schedule
				time=`expr $target_time - $now`
				# seconds -> minutes
				time=`expr $time / 60`
				[ "$time" = "0" ] && time=1 # less than 1 minutes

				echo "wlan guestsched $GUEST_RADIO off >/dev/console" > /tmp/guest_sched_${band}
				eval at -f /tmp/guest_sched_${band} now + $time minutes
			else #already timeout, run command directly
				wlan guestsched $GUEST_RADIO off
			fi
		
		}
	done
}

atd_isup=$(ps | grep "[ /]atd" | grep -v grep)
if [ -z "$atd_isup" ];then
	/usr/sbin/atd
fi

case "$1" in
	get) get_time $@;;
	set) set_sched $@;;
	update) update_schedule;;
	show) show_usage;;
esac
