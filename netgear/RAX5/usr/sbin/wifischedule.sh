#!/bin/sh
. /lib/functions.sh

CRON_WIFISCHE="/var/spool/cron/crontabs/wifischedule"
CRON_UPDATE="/var/spool/cron/crontabs/cron.update"
WIFI_SCHE="/usr/sbin/wifi_schedule_radio.sh"


week=""
e_week=""
overnight=0
overlap=0
in_range=0
s_tm=0
e_tm=0
minite=0
up_minite=0
hour=0
up_hour=0
total=0
up_total=0

append_week() {
    if [ $overnight -eq 1 ]; then
        [ -n "$e_week" ] && {
            e_week=$e_week","
        }
        e_week=$e_week"$1"
    else
        [ -n "$week" ] && {
            week=$week","
        }
        week=$week"$1"
    fi
}

write_crontable() {
    down_cmd="\/usr\/sbin\/wifi_schedule_radio.sh $2 down"
    up_cmd="\/usr\/sbin\/wifi_schedule_radio.sh $2 up"
    minite=0
    up_minite=0
    hour=0
    up_hour=0
    total=0
    up_total=0

    append_week "$1"

    minite=$(grep "$1 $WIFI_SCHE $2 down" $CRON_WIFISCHE  | cut -d" " -f 1)
    hour=$(grep "$1 $WIFI_SCHE $2 down" $CRON_WIFISCHE  | cut -d" " -f 2)
    if [ "$minite" != "" ] && [ "$hour" != "" ]; then
        total=$(($hour*3600+$minite*60))
    fi
    #echo "start minite $minite hour $hour total $total" > /dev/console
    up_minite=$(grep "$1 $WIFI_SCHE $2 up" $CRON_WIFISCHE  | cut -d" " -f 1)
    up_hour=$(grep "$1 $WIFI_SCHE $2 up" $CRON_WIFISCHE  | cut -d" " -f 2)
    if [ "$up_minite" != "" ] && [ "$up_minite" != "" ]; then
        up_total=$(($up_hour*3600+$up_minite*60))
    fi
    #echo "end minite $up_minite hour $up_hour total $up_total" > /dev/console
    up_min=$(($e_min+1))
    # check time is overlap
    if [ $up_total -gt $s_tm ]; then
        overlap=1
        if [ $total -lt $s_tm ]; then
            $(sed -e "s/.* \* \* $1 $down_cmd/$minite $hour \* \* $1 $down_cmd/g" -i $CRON_WIFISCHE) > /dev/console
        fi

        if [ $up_total -lt $e_tm ]; then
            $(sed -e "s/.* \* \* $1 $up_cmd/$up_min $e_hr \* \* $1 $up_cmd/g" -i $CRON_WIFISCHE) > /dev/console
        fi
    else
        overlap=0
        echo "$s_min $s_hr * * $1 $WIFI_SCHE $2 down" >> $CRON_WIFISCHE

        if [ $overnight -eq 1 ]; then
            if [ $1 -eq 6 ]; then
                next_day=0
            else
                next_day=$(($1+1))
            fi
            append_week "$next_day"
            echo "$up_min $e_hr * * $next_day $WIFI_SCHE $2 up" >> $CRON_WIFISCHE
        else
            echo "$up_min $e_hr * * $1 $WIFI_SCHE $2 up" >> $CRON_WIFISCHE
        fi
    fi
}

wifi_schedule() {
    local startTime
    local endTime
    local everyday
    local monday
    local tuesday
    local wednesday
    local thursday
    local friday
    local saturday
    local sunday
    s_tm=0
    e_tm=0
    cur_tm=0

    config_get startTime $1 startTime
    config_get endTime $1 endTime
    config_get everyday $1 everyday
    config_get monday $1 monday
    config_get tuesday $1 tuesday
    config_get wednesday $1 wednesday
    config_get thursday $1 thursday
    config_get friday $1 friday
    config_get saturday $1 saturday
    config_get sunday $1 sunday

    # convert day to week
    if [ "$everyday" == "true" ]; then
          monday="true"
          tuesday="true"
          wednesday="true"
          thursday="true"
          friday="true"
          saturday="true"
          sunday="true"
    fi

    # get current time
    cur_wk=$(date +"%u")
    cur_hr=$(date +"%H" | sed -r 's/0*([0-9])/\1/')
    cur_m=$(date +"%M" | sed -r 's/0*([0-9])/\1/')
    s_hr=$(echo $startTime | cut -d":" -f 1 | sed -r 's/0*([0-9])/\1/')
    s_min=$(echo $startTime | cut -d":" -f 2 | sed -r 's/0*([0-9])/\1/')
    e_hr=$(echo $endTime | cut -d":" -f 1 | sed -r 's/0*([0-9])/\1/')
    e_min=$(echo $endTime | cut -d":" -f 2 | sed -r 's/0*([0-9])/\1/')

    # current time convert into seconds
    cur_hr_total=$(($cur_hr*3600))
    cur_m_total=$(($cur_m*60))
    cur_tm=$(($cur_hr_total+$cur_m_total))
    #echo "total currect time $cur_tm" > /dev/console

    # start time convert into seconds
    s_hr_total=$(($s_hr*3600))
    s_min_total=$(($s_min*60))
    s_tm=$(($s_hr_total+$s_min_total))
    #echo "total start time $s_tm" > /dev/console

    # end time convert into seconds
    e_hr_total=$(($e_hr*3600))
    e_min_total=$(($e_min*60))
    e_tm=$(($e_hr_total+$e_min_total))
    #echo "total end time $e_tm" > /dev/console

    # check time is overnight
    if [ $s_tm -gt $e_tm ]; then
        overnight=1
    else
        overnight=0
    fi

    if [ "$sunday" == "true" ]; then
        write_crontable "0" $2
    fi

    if [ "$monday" == "true" ]; then
        write_crontable "1" $2
    fi

    if [ "$tuesday" == "true" ]; then
        write_crontable "2" $2
    fi
    if [ "$wednesday" == "true" ]; then
        write_crontable "3" $2
    fi

    if [ "$thursday" == "true" ]; then
        write_crontable "4" $2
    fi

    if [ "$friday" == "true" ]; then
        write_crontable "5" $2
    fi

    if [ "$saturday" == "true" ]; then
        write_crontable "6" $2
    fi

    # manual radio on/off
    if [ $overnight -eq 0 ]; then
        day=$(echo $week | grep -c $cur_wk)
        #echo "week $week cur_week $cur_wk day $day cur_tm $cur_tm s_tm $s_tm e_tm $e_tm in_range $in_range" > /dev/console
        if [  $day -eq 1 ]; then
            if [ $overlap -eq 0 ]; then
                if [ $cur_tm -ge $s_tm ] && [ $cur_tm -le $e_tm ]; then
                    #echo "schedule in range down wifi now" > /dev/console
                    $WIFI_SCHE $2 "down"
                    in_range=1
                fi
            else 
                if [ $cur_tm -ge $total ] && [ $cur_tm -le $up_total ]; then
                    #echo "schedule in range down wifi now" > /dev/console
                    $WIFI_SCHE $2 "down"
                    in_range=1
                fi
            fi
        else
            if [ $in_range -eq 0 ]; then
                #echo "schedule out of range" > /dev/console
                $WIFI_SCHE $2 "up"
            fi
        fi
    else
        #echo "time is over night" > /dev/console
        day=$(echo $week | grep -c $cur_wk)
        next_day=$(echo $e_week | grep -c $cur_wk)
        #echo "week $week e_week $e_week cur_week $cur_wk day $day next_day $next_day cur_tm $cur_tm s_tm $s_tm e_tm $e_tm total $total in_range $in_range" > /dev/console
        if [ $day -eq 1 ]; then
            if [ $overlap -eq 0 ]; then
                if [ $cur_tm -ge $s_tm ]; then
                    #echo "schedule in range down wifi now" > /dev/console
                    $WIFI_SCHE $2 "down"
                    in_range=1
                fi
            else
                if [ $cur_tm -ge $total ]; then
                    #echo "schedule in range down wifi now" > /dev/console
                    $WIFI_SCHE $2 "down"
                    in_range=1
                fi
            fi
        elif [ $next_day -eq 1 ]; then
            if [$overlap -eq 0 ]; then
                if [ $cur_tm -le $e_tm ]; then
                    #echo "schedule in range down wifi now" > /dev/console
                    $WIFI_SCHE $2 "down"
                    in_range=1
                fi
            else
                if [ $cur_tm -ge $up_total ]; then
                    #echo "schedule in range down wifi now" > /dev/console
                    $WIFI_SCHE $2 "down"
                    in_range=1
                fi
            fi
        else
            if [ $in_range -eq 0 ]; then
                #echo "schedule out of range" > /dev/console
                $WIFI_SCHE $2 "up"
            fi
        fi
    fi
    # clear
    week=""
    e_week=""
}

sche_enable_2g="$(uci get NTGR_WiFi.ra0.wifiScheduleEnable)"
sche_enable_5g="$(uci get NTGR_WiFi.rax0.wifiScheduleEnable)"

# clear crontab first
rm -f $CRON_WIFISCHE

if [ "$sche_enable_2g" == "false" ] && [ "$sche_enable_5g" == "false" ]; then
    exit 0
else
    config_load NTGR_WiFi

    touch $CRON_WIFISCHE
    in_range=0

    if [ "$sche_enable_2g" == "true" ]; then
        config_foreach wifi_schedule 2G "2G"
    fi
    if [ "$sche_enable_5g" == "true" ]; then
        config_foreach wifi_schedule 5G "5G"
    fi

    # update crontab
    [ ! -f $CRON_UPDATE ] && {
        touch $CRON_UPDATE
    }
    echo "wifischedule" >> $CRON_UPDATE
fi

