#!/bin/sh

drop_caches()
{
	sync
	sync
	echo 1 > /proc/sys/vm/drop_caches
	return 0
}

drop_caches
memfree=`grep -w "MemFree" < /proc/meminfo | awk '{printf $2}'`
minfree=`expr $memfree / 4`

if [ $minfree -gt 1000000 ]; then
	minfree=1000000
fi

while true; do
	sleep 10
	memfree=`grep -w "MemFree" < /proc/meminfo | awk '{printf $2}'`
	if [ $memfree -lt $minfree ]; then
		drop_caches
	fi
done

exit 0
