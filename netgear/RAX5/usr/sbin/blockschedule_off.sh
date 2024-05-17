#!/bin/sh

. $IPKG_INSTROOT/lib/functions.sh

date >> /tmp/block_schedule.log

echo "block schedule off" >> /tmp/block_schedule.log 2>&1

if [ -f "/var/blockservice_off.sh" ]; then
        . /var/blockservice_off.sh
else
        echo "File /var/blockservice_off.sh does not exists. " >> /tmp/block_schedule.log
fi

if [ -f "/var/blocksite_off.sh" ]; then
        . /var/blocksite_off.sh
else
        echo "File /var/blocksite_off.sh does not exists. " >> /tmp/block_schedule.log
fi
