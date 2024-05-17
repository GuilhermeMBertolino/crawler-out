#!/bin/sh
DEBUG_TMP=/tmp/debug_tmp
DEBUG_CONF=/data/debug.conf
DEBUG_OUTPUT=" > /dev/console"
DEBUG_OUTPUT="/var/debug_msg"
#END DEBUG

CAPTURE_STATE=
PACKETCAPTURE=
CAPTURE_STORE_LOCATION=
LOG_WHEN_BOOTUP=
READYCLOUD_TEST_SERVER=
RESET_OVERLAY_DATA=
XAGENT=
WANMIRROR=

CUR_CAPTURE_STATE=
CUR_PACKETCAPTURE=
CUR_CAPTURE_STORE_LOCATION=
CUR_LOG_WHEN_BOOTUP=
CUR_XAGENT=
CUR_WANMIRROR=
USB_LOCATION=


if [ "$DEBUG_OUTPUT" != "" ] && [ ! -e "$DEBUG_OUTPUT" ]; then
    touch $DEBUG_OUTPUT
fi

function DebugMsg()
{
    if [ "$DEBUG_OUTPUT" != "" ]; then
	echo "$1" >> $DEBUG_OUTPUT
    fi
}

function CapturePacket()
{
    STORE_PATH=
    if [ "$CUR_CAPTURE_STORE_LOCATION" == "STORE_IN_SYSTEM_MEMORY" ]; then
	    STORE_PATH=/tmp
    else
	    STORE_PATH=$USB_LOCATION
    fi
    #<< PEGA Mark: support DAL logs
    if [ "$CUR_DAL_LOGS" == "ENABLE" ]; then
        d2 -c dallogcfg[0].AshConfigurationApply false
        d2 -c dallogcfg[0].BstConfigurationApply false
        d2 -c dallogcfg[0].CshConfigurationApply false
        d2 -c dallogcfg[0].DalhConfigurationApply false
        d2 -c dallogcfg[0].FingConfigurationApply false
        d2 -c dallogcfg[0].UpagentConfigurationApply false
        #	"dal_ash", "bst", "fing_dil" , "upagent", "dalh", "csh"
        setlogLevelForDAL.sh dal_ash LOG_DEBUG true true
        setlogLevelForDAL.sh bst LOG_DEBUG false true
        setlogLevelForDAL.sh fing_dil LOG_DEBUG false true
        setlogLevelForDAL.sh upagent LOG_DEBUG true true
        setlogLevelForDAL.sh dalh LOG_DEBUG false true
        setlogLevelForDAL.sh csh LOG_DEBUG true true
        if [ "$CUR_LOG_WHEN_BOOTUP" == "ENABLE" ]; then
            touch /data/dal/log_dal_when_bootup
        fi
    else
        rm -rf /data/dal/log_dal_when_bootup
        setlogLevelForDAL.sh dal_ash LOG_DEBUG false true
        setlogLevelForDAL.sh bst LOG_DEBUG false false
        setlogLevelForDAL.sh fing_dil LOG_DEBUG false false
        setlogLevelForDAL.sh upagent LOG_DEBUG false true
        setlogLevelForDAL.sh dalh LOG_DEBUG false false
        setlogLevelForDAL.sh csh LOG_DEBUG false true
    fi
    #UpdateCurrentConfig DAL_LOGS $DAL_LOGS
    #PEGA >>

    if [ "$CUR_PACKETCAPTURE" == "ENABLE" ]; then
        tcpdump -i br0 -w /${STORE_PATH}/BR_LAN.cap -C 10 &
        tcpdump  -i eth4 ether[12:2] != 0x8100 and ether[14:2] != 0x001 -w ${STORE_PATH}/ETH_WAN.cap -C 10 &
        WlGetDriverStats.sh wl0 nic 20 enable > /tmp/wl0_DrvStats.log 2>&1 &
        WlGetDriverStats.sh wl1 nic 20 enable > /tmp/wl1_DrvStats.log 2>&1 &
    else
        rm -f /${STORE_PATH}/BR_LAN.cap
        rm -f /${STORE_PATH}/ETH_WAN.cap
        rm -f /${STORE_PATH}/wl0_DrvStats.log
        rm -f /${STORE_PATH}/wl1_DrvStats.log
    fi
}

function UpdateCurrentConfig()
{
    sed -i "/^$1=/ s/=.*$/=$2/" $DEBUG_CONF
}

function ReadConf()
{
    # Make sure XAGENT is in the file for backward compatible (change XAGENT from 'not save' to 'save')
    if [[ -f "$1" ]]; then
        grep -qF 'XAGENT=' $1 || echo 'XAGENT=DISABLE' >> $1
    fi

while read element || [ -n "$element" ];
do
    echo $element > $DEBUG_TMP
    KEY=$(cut -d'=' -f1 $DEBUG_TMP)
    VALUE=$(cut -d'=' -f2 $DEBUG_TMP)
    case $KEY in
	CAPTURE_STATE)
	    CAPTURE_STATE=$VALUE
	;;
	PACKETCAPTURE)
	    PACKETCAPTURE=$VALUE
	;;
	CAPTURE_STORE_LOCATION)
	    CAPTURE_STORE_LOCATION=$VALUE
	    ;;
	LOG_WHEN_BOOTUP)
	    LOG_WHEN_BOOTUP=$VALUE
	    ;;
	XAGENT)
	    XAGENT=$VALUE
	    ;;
	WANMIRROR)
	    WANMIRROR=$VALUE
	    ;;
	RA_MODE)
	    RA_MODE=$VALUE
	    ;;
	FUNC)
	    FUNC=$VALUE
	    ;;
	DEBUGLOG)
	    DEBUGLOG=$VALUE
	    ;;
	DAL_LOGS)
	    DAL_LOGS=$VALUE
	    ;;
	RA_HTTPSERVERIP)
	    RA_HTTPSERVERIP=$VALUE
	    ;;
    esac
done < $1
}

function GetUsbLocation()
{
    rm -rf /var/debugresult
    # USB_LOCATION=`mount | grep -E "sd[a-f,1-9]+.*vfat+" | grep -o -E "(/mnt)+(/disk)+[0-9]+_+[0-9]+"`
    USB_LOCATION=`mount | grep -o -E "(/mnt)+(/disk)+[0-9]+_+[0-9]+" | head -n 1`
}

GetUsbLocation
ReadConf $DEBUG_CONF
CUR_CAPTURE_STATE=$CAPTURE_STATE
CUR_PACKETCAPTURE=$PACKETCAPTURE
CUR_CAPTURE_STORE_LOCATION=$CAPTURE_STORE_LOCATION
CUR_LOG_WHEN_BOOTUP=$LOG_WHEN_BOOTUP
CUR_XAGENT=$XAGENT
CUR_WANMIRROR=$WANMIRROR
CUR_DAL_LOGS=$DAL_LOGS
CUR_RA_LOG=$RA_LOG
CUR_RA_HTTPSERVERIP=$RA_HTTPSERVERIP
DebugMsg "===========Get"
DebugMsg "CAPTURE_STATE=$CAPTURE_STATE"
DebugMsg "PACKETCAPTURE=$PACKETCAPTURE"
DebugMsg "CAPTURE_STORE_LOCATION=$CAPTURE_STORE_LOCATION"
DebugMsg "LOG_WHEN_BOOTUP=$LOG_WHEN_BOOTUP"
DebugMsg "XAGENT=$XAGENT"
DebugMsg "WANMIRROR=$WANMIRROR"
DebugMsg "DAL_LOGS=$DAL_LOGS"
DebugMsg "============CUR"
DebugMsg "CUR_CAPTURE_STATE=$CUR_CAPTURE_STATE"
DebugMsg "CUR_PACKETCAPTURE=$CUR_PACKETCAPTURE"
DebugMsg "CUR_CAPTURE_STORE_LOCATION=$CUR_CAPTURE_STORE_LOCATION"
DebugMsg "CUR_LOG_WHEN_BOOTUP=$CUR_LOG_WHEN_BOOTUP"
DebugMsg "CUR_XAGENT=$CUR_XAGENT"
DebugMsg "CUR_WANMIRROR=$CUR_WANMIRROR"
DebugMsg "CUR_DAL_LOGS=$DAL_LOGS"


if [ "$CUR_LOG_WHEN_BOOTUP" == "ENABLE" ]; then
    DebugMsg "START CAPTURE"
    if [ "$CAPTURE_STORE_LOCATION" == "STORE_IN_USB_STORAGE" ]; then
        if [ ! -z $USB_LOCATION ]; then
            CapturePacket
            UpdateCurrentConfig CAPTURE_STATE "CAPTURING"
        else
            echo -n "USB disk not exist" > /var/debugresult
        fi
    else
        CapturePacket
        UpdateCurrentConfig CAPTURE_STATE "CAPTURING"
    fi

    # Enable ra
    if [ "$CUR_RA_LOG" == "ENABLE" ]; then
        touch /data/rabin/enable_ra_log
    else
        rm -f /data/rabin/enable_ra_log
        rm -f /tmp/rae_debug.log
    fi

fi

# Enable WAN Port mirror to LAN port 1
if [ "$CUR_WANMIRROR" == "ENABLE" ]; then
    DebugMsg "mirror start"
    ethswctl -c mirror -o enable -n 0 -p 3 -x 0x10 -y 0x10
fi

# Write RAE https server
if [ "$CUR_RA_HTTPSERVERIP" != "" ] && [ "$CUR_RA_HTTPSERVERIP" != "EMPTY" ]; then
    echo $CUR_RA_HTTPSERVERIP > /tmp/raedebuglocal
fi
