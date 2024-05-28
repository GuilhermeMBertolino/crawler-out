#!/bin/sh

if [ -z "$(cat /etc/crontabs/root | grep /usr/scripts/avira/watchdogCronTask.sh)" ]; then
    echo '* * * * *  /usr/scripts/avira/watchdogCronTask.sh' >> /etc/crontabs/root
    /etc/init.d/cron reload
fi
