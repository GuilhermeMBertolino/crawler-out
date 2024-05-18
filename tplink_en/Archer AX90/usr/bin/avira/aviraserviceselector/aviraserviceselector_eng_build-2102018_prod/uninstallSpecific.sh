#!/bin/sh
echo "Deregister from the watchdog"
killall -SIGUSR2 aviraserviceselector

    echo "Remove binary files"
    rm -rf /usr/bin/avira/aviraserviceselector/aviraserviceselector_eng_build-2102018_prod
    
    echo "Remove configuration files"
    rm -rf /usr/share/.avira/aviraserviceselector/aviraserviceselector_eng_build-2102018_prod
    exit 0