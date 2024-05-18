#!/bin/sh
echo "Deregister from the watchdog"
killall -SIGUSR2 avirasentinellite

    echo "Remove binary files"
    rm -rf /usr/bin/avira/avirasentinellite/avirasentinellite_eng_build-2102018_prod
    
    echo "Remove configuration files"
    rm -rf /usr/share/.avira/avirasentinellite/avirasentinellite_eng_build-2102018_prod
    exit 0