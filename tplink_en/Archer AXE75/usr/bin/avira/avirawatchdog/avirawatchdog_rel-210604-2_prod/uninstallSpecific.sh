#!/bin/sh
echo "Restart the system watchdog"
killall -s SIGUSR1 avirawatchdog

    echo "Remove binary files"
    rm -rf /usr/bin/avira/avirawatchdog/avirawatchdog_rel-210604-2_prod
    
    echo "Remove configuration files"
    rm -rf /usr/share/.avira/avirawatchdog/avirawatchdog_rel-210604-2_prod
    exit 0