#!/bin/sh /etc/rc.common

USE_PROCD=1
START=99
STOP=99

SLEEP_TIME=300 ## 5 minutes

prep_work()
{
	mkdir -p /overlay/userspace_crash
	if [ $? = "0" ]; then
		echo "Core Dump Directory Created !"
#PegaCVP, David Yeh, 20200306, Modify the core dump file name to let the new file could replace the old one.
		echo "/overlay/userspace_crash/core-%e" > /proc/sys/kernel/core_pattern
#		echo "/overlay/userspace_crash/core-%e-%s-%u-%g-%p-%t" > /proc/sys/kernel/core_pattern
		echo "Core Pattern Set!"
		echo "0" > /proc/sys/kernel/core_uses_pid
#		echo "20" > /proc/sys/kernel/core_uses_pid
	else
		echo "Core Dump Directory not Created!"
	fi
	stop_service
}

stop_service()
{
	killall -9 pad
}

start_service()
{
	procd_open_instance
	prep_work
##	procd_set_param command pad -c 2 -i ${SLEEP_TIME}
##	procd_set_param respawn ##mark above two lines for avoid being stuck during boot
	procd_close_instance
}
