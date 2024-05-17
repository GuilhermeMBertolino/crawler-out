#!/bin/sh

ifname="rax1"
schedule_tm=0
start_tm=0
sleep_tm=0

record_start_tm()
{
    echo "guest schedule start time $start_tm" > /dev/console
    if [ $start_tm -eq 0 ];then
        start_tm="$(date '+%s')"
        # save seconds
        uci set WlanGuestSchedule.$1.start_tm=$start_tm
        uci commit WlanGuestSchedule
    fi
}

cal_remain_tm()
{
    curr_tm="$(date '+%s')"
    pass_tm=$(( $curr_tm-$start_tm ))
    if [ $start_tm -eq 0 ];then
        sleep_tm=$schedule_tm
    else
        if [ $pass_tm -le $schedule_tm ];then
            sleep_tm=$(( $schedule_tm-$pass_tm ))
        else
            sleep_tm=0
        fi
    fi
}

radio_onoff()
{
    guest_on="$(uci get NTGR_WiFi.$2.guestEnable)"

    if [ "$guest_on" == "true" ];then
        uci set NTGR_WiFi.$2.guestEnable="false"
    else
        uci set NTGR_WiFi.$2.guestEnable="true"
    fi
    uci commit NTGR_WiFi
    /usr/bin/lua -lcommonFunc/wifiUtils_convertWifiSettings -e "wifiReload_postAction(\"$1\", \"0s\")"
}

start_sleep()
{
    x=$1
    while [ $x -gt 0 ]
    do
        sleep 1s
        x=$(( $x - 1 ))
    done
}

schedule_tm="$(uci get WlanGuestSchedule.$ifname.schedule_tm)"
start_tm="$(uci get WlanGuestSchedule.$ifname.start_tm)"

if [ "$schedule_tm" == "0" ]; then
    exit 0
else
    cal_remain_tm
    record_start_tm $ifname
    echo "guest schedule sleep time $sleep_tm" > /dev/console
    if [ $sleep_tm -ne 0 ];then
        start_sleep $sleep_tm
        radio_onoff "5G" $ifname
    fi
fi