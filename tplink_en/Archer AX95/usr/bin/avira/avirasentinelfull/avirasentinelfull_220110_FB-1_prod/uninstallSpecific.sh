#!/bin/sh
echo "Deregister from the watchdog"
killall -SIGUSR2 avirasentinelfull

    echo "Remove binary files"
    rm -rf /usr/bin/avira/avirasentinelfull/avirasentinelfull_220110_FB-1_prod
    
    echo "Remove configuration files"
    rm -rf /usr/share/.avira/avirasentinelfull/avirasentinelfull_220110_FB-1_prod
    exit 0