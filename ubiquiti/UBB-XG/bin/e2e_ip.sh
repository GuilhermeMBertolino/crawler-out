#!/bin/sh

get_mode='ubntbox status.cgi -pH | jq ".wireless.sta[0].remote.mode"'
get_ip='ubntbox status.cgi -pH | jq ".wireless.sta[0].remote.ipaddr[0]"'
mode=$(eval ${get_mode})

if [ ${mode} == '"ap-ptp"' ]; then
    ip=$(eval ${get_ip})
    echo ${ip}
else
    echo "127.0.0.1"
fi
