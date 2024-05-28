#!/bin/sh

if [ -f "/usr/bin/avira/avirawatchdog/avirawatchdog" ]; then

    if [ -f /tmp/watchdogHeartbeat -a $(($(date +%s) - $(date -r /tmp/watchdogHeartbeat +%s))) -gt 30 ]; then
        if [ -z "$(ps | grep -v grep | grep -w 'avirawatchdog/avirawatchdog')" ]; then
            echo "$(date +'%Y-%m-%dT%H:%M:%S') watchdogCronTask: avirawatchdog has stopped. Restarting it..." >> /tmp/.avira/logFile.log
            logger -s "$(date +'%Y-%m-%dT%H:%M:%S') watchdogCronTask: avirawatchdog has stopped. Restarting it..."
        else
            echo "$(date +'%Y-%m-%dT%H:%M:%S') watchdogCronTask: avirawatchdog has halted. Restarting it..." >> /tmp/.avira/logFile.log
            logger -s "$(date +'%Y-%m-%dT%H:%M:%S') watchdogCronTask: avirawatchdog has halted. Restarting it..."

            killall -9 avirawatchdog
        fi

        /etc/init.d/avirawatchdog restart

    fi
fi
