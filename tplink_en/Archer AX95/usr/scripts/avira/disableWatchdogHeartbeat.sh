#!/bin/sh

rm /tmp/watchdogHeartbeat
sed -i '/watchdogCronTask.sh/d' /etc/crontabs/root

# Reloading cron during watchdog stop causes a race condition and renders both cron and watchdog unusuable.
# This has been moved inside the uninstallComplete.sh script.
# /etc/init.d/cron reload
