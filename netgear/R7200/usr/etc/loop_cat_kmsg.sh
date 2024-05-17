#!/bin/sh

if [ "$1" = "" ];
then
        echo need provide file
        exit 1
fi

echo $$ > /tmp/$0_pid

echo > $1
while [ 1 ];
do 
        cat /proc/kmsg >> $1
        echo cat again
done


