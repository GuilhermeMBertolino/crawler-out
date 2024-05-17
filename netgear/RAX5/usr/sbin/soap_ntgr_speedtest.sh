#!/bin/sh

OOKLA_PROCESSING_FLAG="/tmp/ookla_processing.dat"
OOKLA_COMPLETE_FLAG="/tmp/ookla_complete.dat"
OOKLA_RESULT_FILE="/tmp/ookla.txt"

if [ -f $OOKLA_PROCESSING_FLAG ]; then
    return 1;
fi

touch $OOKLA_PROCESSING_FLAG

/usr/sbin/ookla --configurl=http://www.speedtest.net/api/embed/netgear/config -t 1 -m 50 > $OOKLA_RESULT_FILE 2>&1

rm $OOKLA_PROCESSING_FLAG

touch $OOKLA_COMPLETE_FLAG
