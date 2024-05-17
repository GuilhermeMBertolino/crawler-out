#!/bin/sh

WIFI_SCHE_TAG="[wlanSchedule] [Wirelsess signal schedule]"
MSG_ON="The wireless signal is on"
MSG_OFF="The wireless signal is off"

radioOn_2g="$(uci get NTGR_WiFi.ra0.radioOn)"
radioOn_5g="$(uci get NTGR_WiFi.rax0.radioOn)"

if [ "$2" == "down" ];then
    onoff="false"
else
    onoff="true"
fi

if [ "$1" == "2G" ];then
    if [ "$radioOn_2g" != "$onoff" ];then
        if [ "$2" == "down" ];then
uci batch <<EOF
            set NTGR_WiFi.ra0.radioOn='false'
            commmit NTGR_WiFi
EOF
            logger -t $WIFI_SCHE_TAG "$MSG_OFF"
        else
uci batch <<EOF
            set NTGR_WiFi.ra0.radioOn='true'
            commmit NTGR_WiFi
EOF
            logger -t $WIFI_SCHE_TAG "$MSG_ON"
        fi
        /usr/bin/lua -lcommonFunc/wifiUtils_convertWifiSettings -e "wifiReload_postAction(\"2.4G\", \"0s\")"
    fi
else
    if [ "$radioOn_5g" != "$onoff" ];then
        if [ "$2" == "down" ];then
uci batch <<EOF
            set NTGR_WiFi.rax0.radioOn='false'
            commmit NTGR_WiFi
EOF
            logger -t $WIFI_SCHE_TAG "$MSG_OFF"
        else
uci batch <<EOF
            set NTGR_WiFi.rax0.radioOn='true'
            commmit NTGR_WiFi
EOF
            logger -t $WIFI_SCHE_TAG "$MSG_ON"
        fi
        /usr/bin/lua -lcommonFunc/wifiUtils_convertWifiSettings -e "wifiReload_postAction(\"5G\", \"0s\")"
    fi
fi


