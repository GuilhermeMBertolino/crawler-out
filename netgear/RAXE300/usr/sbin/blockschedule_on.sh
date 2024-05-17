#!/bin/sh

date >> /tmp/block_schedule.log

echo "block schedule on" >> /tmp/block_schedule.log 2>&1

if [ -f "/var/blocksite_on.sh" ]; then
	if [ "$1" == "noStart" ]; then
		. /var/blocksite_on.sh $1
	else
		. /var/blocksite_on.sh
	fi
else
	echo "File /var/blocksite_on.sh does not exists" >> /tmp/block_schedule.log
fi

if [ -f "/var/blockservice_on.sh" ]; then
	. /var/blockservice_off.sh
	. /var/blockservice_on.sh
else
	echo "File /var/blockservice_on.sh does not exists" >> /tmp/block_schedule.log
fi
