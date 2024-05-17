#!/bin/sh

while [ 1 ]; do
    top &
    sleep 2
    kill $!
    cat /proc/meminfo
    sysinfo
done

