#!/bin/ash

is_interface_up () {
	if [ "$1" == "ath2" ] && [ -f /var/run/BAND5G-1.1.UP ]; then
		return 1
	fi

	return 0
}

is_5g_asserted () {
	asserted=`cat /proc/alpha_5g_asserted`

	if [ "$asserted" == "1" ]; then
		return 1
	fi

	return 0
}

QUERY_WAIT_TIME=3

get_hammer_count () {
	count=`cat /sys/devices/pci0000:00/0000:00:00.0/net/wifi1/hammer`
	echo $count
}

is_big_hammer () {
	qeury_retry=0
	count=0

	# try to get hammer count, we will retry 3 times if it fails
	while [ $qeury_retry -lt 3 ]
	do
		count=$(get_hammer_count $1)
		#check format, we need a decimal integer
		count=`echo $count | grep '^[0-9][0-9]*$'`
		echo "[wifi watchdog] hammer count: $count"
		if [ "$count" != "" ]; then
			break
		fi

		qeury_retry=`expr $qeury_retry + 1`
		sleep $QUERY_WAIT_TIME
	done

	if [ "$count" == "" ]; then
		echo "[wifi watchdog] $1 cannot get driver status, something wrong"
		return 1
	fi

	if [ "$count" == "1" ]; then
		echo "[wifi watchdog] $1 needs a hammer to smash it"
		return 1
	fi

	return 0
}

PREV_WIFI1_INTR_COUNT=0

get_prev_intr_count () {
	case $1 in
		"ath2")
			echo $PREV_WIFI1_INTR_COUNT
		;;
	esac
	echo ""
}

save_prev_intr_count () {
	case $1 in
		"ath2")
			PREV_WIFI1_INTR_COUNT=$2
		;;
	esac
}

get_current_intr_count () {
	case $1 in
		"ath2")
			cat /proc/interrupts > /tmp/$1.intr.txt &
		;;
	esac
	sleep 1
	count=`cat /tmp/$1.intr.txt | grep wifi1 | awk '{print $2}'`
	echo $count
}

is_intr_ok () {
	qeury_retry=0
	count=0

	# try to get beacon count, we will retry 3 times if it fails
	while [ $qeury_retry -lt 3 ]
	do
		count=$(get_current_intr_count $1)
		#check format, we need a decimal integer
		count=`echo $count | grep '^[0-9][0-9]*$'`
		echo "[wifi watchdog] intr count: $count"
		if [ "$count" != "" ]; then
			break
		fi

		qeury_retry=`expr $qeury_retry + 1`
		sleep $QUERY_WAIT_TIME
	done

	if [ "$count" == "" ]; then
		echo "[wifi watchdog] $1 cannot get interrupt count"
		return 0
	fi

	prev_count=$(get_prev_intr_count $1)
	if [ $count -le $prev_count ]; then
		echo "[wifi watchdog] $1 interrupt count doesn't increase"
		return 0
	fi

	save_prev_intr_count $1 $count

	return 1
}

ATH2_RESTART_COUNT=0

get_restart_count () {
	case $1 in
		"ath2")
			echo $ATH2_RESTART_COUNT
		;;
	esac
}

save_restart_count () {
	case $1 in
		"ath2")
			ATH2_RESTART_COUNT=$2
		;;
	esac
}

reset_restart_count () {
	case $1 in
		"ath2")
			ATH2_RESTART_COUNT=0
		;;
	esac
}

CHECK_PERIOD_TIME=5
is_interface_healty () {
	# we don't need to check the interface that is not enabled
	is_interface_up $1
	if [ "$?" == "0" ]; then
		return 1
	fi

	#is_big_hammer $1
	#if [ "$?" == "1" ]; then
	#	return 0
	#fi

	#is_intr_ok $1
	#if [ "$?" == "0" ]; then
	#	return 0
	#fi
	
	#keep driver wdt on
	status=`cat /proc/alpha_5g_wdt`
	if [ "$status" == "0" ]; then
		echo 5 > /proc/alpha_5g_wdt
	fi
	
	is_5g_asserted $1
	if [ "$?" == "1" ]; then
		return 0
	fi

	reset_restart_count $1
	CHECK_PERIOD_TIME=5
	return 1
}

reset_interface () {
	echo "[wifi watchdog] reset interfaces"
	echo 0 > /sys/devices/pci0000:00/0000:00:00.0/net/wifi1/hammer	
	service PHYINF.WIFI restart
}

reboot_device () {
	echo "[wifi watchdog] reboot device"
	reboot
}

while :
do
	for interface in ath2
	do
		is_interface_healty $interface
		if [ "$?" == "0" ]; then
			restart_count=$(get_restart_count $interface)
			if [ $restart_count -ge 3 ]; then
				echo [wifi watchdog] $interface cannot work anymore, reboot device
				reset_restart_count $interface	
				reboot_device
			else
				echo [wifi watchdog] $interface is not good, we shall reset interface
				restart_count=`expr $restart_count + 1`
				save_restart_count $interface $restart_count
				CHECK_PERIOD_TIME=90
				reset_interface $interface
			fi
		fi
	done
	echo [wifi watchdog] alive - $ATH2_RESTART_COUNT
	sleep $CHECK_PERIOD_TIME
done

