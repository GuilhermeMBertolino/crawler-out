#!/bin/sh

OOKLA_PROCESSING_FLAG="/tmp/ookla_processing.dat"
OOKLA_COMPLETE_FLAG="/tmp/ookla_complete.dat"
OOKLA_RESULT_FILE="/tmp/ookla_result.txt"

if [ -f $OOKLA_PROCESSING_FLAG ]; then
    return 1;
fi

touch $OOKLA_PROCESSING_FLAG

wanIntf=`getdb -w`
wanIntfPrefix=$(echo $wanIntf | cut -c 1-3)
if [ "$wanIntfPrefix" = "ppp" ]; then
    ookla --configurl=http://www.speedtest.net/api/embed/netgear/config.php?threadnum=4 -t 1 -m 50 > $OOKLA_RESULT_FILE 2>&1
else
    ookla --configurl=http://www.speedtest.net/api/embed/netgear/config.php -t 1 -m 50 > $OOKLA_RESULT_FILE 2>&1
fi

rm $OOKLA_PROCESSING_FLAG
touch $OOKLA_COMPLETE_FLAG
