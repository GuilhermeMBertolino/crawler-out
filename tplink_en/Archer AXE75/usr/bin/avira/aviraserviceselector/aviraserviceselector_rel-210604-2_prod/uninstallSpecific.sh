#!/bin/sh
echo "Deregister from the watchdog"
killall -SIGUSR2 aviraserviceselector

    echo "Remove binary files"
    rm -rf /usr/bin/avira/aviraserviceselector/aviraserviceselector_rel-210604-2_prod
    
    echo "Remove configuration files"
    rm -rf /usr/share/.avira/aviraserviceselector/aviraserviceselector_rel-210604-2_prod
    exit 0