#!/bin/sh
echo "Restart the system watchdog"
killall -s SIGUSR1 avirawatchdog

    echo "Remove binary files"
    rm -rf /usr/bin/avira/avirawatchdog/avirawatchdog_220110_FB-1_prod
    
    echo "Remove configuration files"
    rm -rf /usr/share/.avira/avirawatchdog/avirawatchdog_220110_FB-1_prod
    exit 0