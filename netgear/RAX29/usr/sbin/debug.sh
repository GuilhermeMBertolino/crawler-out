#!/bin/sh
DEBUG_TMP=/tmp/debug_tmp
DEBUG_CONF=/data/debug.conf
DEBUG_NEWCONF=/data/newdebug.conf
DEBUGNOTSAVE_CONF=/var/debug.conf
DEBUGNOTSAVE_NEWCONF=/var/newdebug.conf
DEBUG_OUTPUT=" > /dev/console"
#PC DEBUG
#DEBUG_CONF=./debug.conf
#DEBUG_NEWCONF=./newdebug.conf
#DEBUG_TMP=./debug_tmp
DEBUG_OUTPUT="/var/debug_msg"
#END DEBUG

CAPTURE_STATE=
PACKETCAPTURE=
CAPTURE_STORE_LOCATION=
LOG_WHEN_BOOTUP=
READYCLOUD_TEST_SERVER=
RESET_OVERLAY_DATA=
XAGENT=
ALLOWIPV6PING=
IPV6MODE=
WANMIRROR=
RA_MODE=

NEW_CAPTURE_STATE=
NEW_PACKETCAPTURE=
NEW_CAPTURE_STORE_LOCATION=
NEW_LOG_WHEN_BOOTUP=
NEW_READYCLOUD_TEST_SERVER=
NEW_RESET_OVERLAY_DATA=
NEW_XAGENT=
NEW_ALLOWIPV6PING=
NEW_IPV6MODE=
NEW_WANMIRROR=
NEW_RA_MODE=

CUR_CAPTURE_STATE=
CUR_PACKETCAPTURE=
CUR_CAPTURE_STORE_LOCATION=
CUR_LOG_WHEN_BOOTUP=
CUR_READYCLOUD_TEST_SERVER=
CUR_RESET_OVERLAY_DATA=
CUR_XAGENT=
CUR_ALLOWIPV6PING=
CUR_IPV6MODE=
CUR_WANMIRROR=
CUR_RA_MODE=
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
    if [ "$NEW_CAPTURE_STORE_LOCATION" == "STORE_IN_SYSTEM_MEMORY" ]; then
	STORE_PATH=/tmp
    else
	STORE_PATH=$USB_LOCATION
    fi
    #<< PEGA Mark: support DAL logs
    if [ "$NEW_DAL_LOGS" == "ENABLE" ]; then
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
        if [ "$NEW_LOG_WHEN_BOOTUP" == "ENABLE" ]; then
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
	
    if [ "$NEW_PACKETCAPTURE" == "ENABLE" ]; then
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

function StopPacketCapture()
{
    killall tcpdump
    #<< PEGA Mark: support DAL logs    
    if [ "$NEW_LOG_WHEN_BOOTUP" != "ENABLE" ]; then
        setlogLevelForDAL.sh dal_ash LOG_DEBUG false true
        setlogLevelForDAL.sh bst LOG_SILENT false false
        setlogLevelForDAL.sh fing_dil LOG_SILENT false false
        setlogLevelForDAL.sh upagent LOG_DEBUG false true
        setlogLevelForDAL.sh dalh LOG_SILENT false false
        setlogLevelForDAL.sh csh LOG_DEBUG false true
    fi
    #PEGA>>
}

function Pega_collect_debug_info()
{
    outputPath=${1}
    echo "====debug info begin, date-time: `date -R` ====" >> $outputPath
    echo -e "\rcommand: ps" >> $outputPath
    ps >> $outputPath
    echo -e "\rcommand: ip link show" >> $outputPath
    ip link show >> $outputPath
    echo -e "\rcommand: ifconfig" >> $outputPath
    ifconfig >> $outputPath
    echo -e "\rcommand: route -n" >> $outputPath
    route -n >> $outputPath
    echo -e "\rcommand: arp -n" >> $outputPath
    arp -n >> $outputPath
    echo -e "\rcommand: cat /proc/net/nf_conntrack" >> $outputPath
    cat /proc/net/nf_conntrack >> $outputPath
    echo -e "\rcommand: cat /proc/slabinfo" >> $outputPath
    cat /proc/slabinfo >> $outputPath
    echo -e "\rcommand: cat /proc/meminfo" >> $outputPath
    cat /proc/meminfo >> $outputPath
    echo -e "\rcommand: sysinfo" >> $outputPath
    sysinfo >> $outputPath
    echo -e "\rcommand: netstat -tauenpl" >> $outputPath
    netstat -tauenpl >> $outputPath
    echo -e "\rcommand: iptables -w -t filter -nvL" >> $outputPath
    iptables -w -t filter -nvL >> $outputPath
    echo -e "\rcommand: iptables -w -t nat -nvL" >> $outputPath
    iptables -w -t nat -nvL >> $outputPath
    echo -e "\rcommand: iptables -w -t mangle -nvL" >> $outputPath
    iptables -w -t mangle -nvL >> $outputPath
    echo -e "\rcommand: mount" >> $outputPath
    mount >> $outputPath
    echo -e "\rcommand: df" >> $outputPath
    df >> $outputPath
    #platform related.
    nvram dump >> $outputPath
    iw dev >> $outputPath
    wl ver >> $outputPath
    wl -i wl0 status >> $outputPath
    wl -i wl0 sta_info all >> $outputPath
    wl -i wl0.1 status >> $outputPath
    wl -i wl0.1 sta_info all >> $outputPath
    wl -i wl1 status >> $outputPath
    wl -i wl1 sta_info all >> $outputPath
    wl -i wl1.1 status >> $outputPath
    wl -i wl1.1 sta_info all >> $outputPath
    d2 general >> $outputPath
    d2 xagentcfg>> $outputPath
    d2 upcfg>> $outputPath
    d2 armorcfg>> $outputPath
    d2 armorstatus>> $outputPath
    echo -e "\rcommand: WlGetdriverCfg.sh wl0 2 nic" >> $outputPath
    WlGetDriverCfg.sh wl0 2 nic >> $outputPath
    echo -e "\rcommand: WlGetdriverCfg.sh wl1 5 nic" >> $outputPath
    WlGetDriverCfg.sh wl1 5 nic >> $outputPath
    echo "====debug info end, date-time: `date -R`===" >> $outputPath
}

function SaveLog()
{
    StopPacketCapture
    STORE_PATH=
    rm -rf /var/debug_log.zip    
    if [ "$NEW_CAPTURE_STORE_LOCATION" == "STORE_IN_SYSTEM_MEMORY" ]; then
	STORE_PATH=tmp
    else
	STORE_PATH=$USB_LOCATION
    fi
    logread > /var/log/debuglog
    SYS_LOG=/var/log/debuglog
    LOGREAD=/var/log/logd_log
    BR_PACKET=/${STORE_PATH}/BR_LAN.cap
    WAN_PACKET=/${STORE_PATH}/ETH_WAN.cap
    BOOTUP_MSG=/tmp/bootupmessages
    DEBUG_INFO_PATH=/tmp/debug_info.log
    WL_LOGS=
    DAL_LOGS=
    BITDEFENDER_LOGS=
    DAL_DB=
    RAE_LOG=/tmp/rae_debug.log
    PPP_LOG=/var/ppp/log
    DHCPC_LOG="/tmp/dhcpc_states_logs /tmp/dhcpc_states_logs.old"
    NTGR_SPC_LOGS=
    #<< PEGA Mark: support DAL logs
    if [ -e "/tmp/dal_ash.log" ]; then
	DAL_LOGS="/tmp/dal_ash.log"
    fi
    if [ -e "/tmp/bst.log" ]; then
	DAL_LOGS="$DAL_LOGS /tmp/bst.log"
    fi
    if [ -e "/tmp/csh.log" ]; then
	DAL_LOGS="$DAL_LOGS /tmp/csh.log"
    fi
    if [ -e "/tmp/dalh.log" ]; then
	DAL_LOGS="$DAL_LOGS /tmp/dalh.log"	
    fi
    if [ -e "/tmp/fing_dil.log" ]; then
	DAL_LOGS="$DAL_LOGS /tmp/fing_dil.log"	
    fi
    if [ -e "/tmp/UpAgent.log" ]; then
	DAL_LOGS="$DAL_LOGS /tmp/UpAgent.log"	
    fi
    if [ -e "/tmp/xagent.log" ]; then
	DAL_LOGS="$DAL_LOGS /tmp/xagent.log"
    fi
    if [ -e "/tmp/wl0_DrvStats.log" ]; then
    WL_LOGS="$WL_LOGS /tmp/wl0_DrvStats.log"
    fi
    if [ -e "/tmp/wl1_DrvStats.log" ]; then
    WL_LOGS="$WL_LOGS /tmp/wl1_DrvStats.log"
    fi
    if [ -e "/tmp/ce0.log" ]; then
    WL_LOGS="$WL_LOGS /tmp/ce0.log"
    fi
    #bitdefender logs (Disable Armor at PR SKU)
    sku=$(cat /proc/environment/sku)
    if [ "$sku" != "PR" ]; then
        /opt/bitdefender/share/scripts/archive_logs.sh
        if [ -e "/tmp/bitdefender_logs.tar.gz" ]; then
            BITDEFENDER_LOGS=/tmp/bitdefender_logs.tar.gz
        fi
        BITDEFENDER_LOGS="$BITDEFENDER_LOGS /tmp/bdupd_run.log /tmp/bd_health_check.log"
    fi
    #DAL database
    zip -9 -q -r -j /tmp/d2d.zip /data/dal/d2d 
    if [ -e "/tmp/d2d.zip" ]; then
	DAL_DB=/tmp/d2d.zip
    fi
    #NTGR SPC log files (Disable SPC at PR SKU)
    if [ -e "/etc/ntgr_spc_config.ini" -a "$sku" != "PR" ]; then
        NTGR_SPC_LOG_ZIP_FILE=/tmp/circle_log_files.zip

        # /tmp/circle/log
        NTGR_SPC_LOG_FILE=/tmp/circle_logs.zip
        NTGR_SPC_LOG_FILE_LIST="$NTGR_SPC_LOG_FILE_LIST $NTGR_SPC_LOG_FILE"
        zip -9 -q -r $NTGR_SPC_LOG_FILE /tmp/circle/log

        # circlectl
        NTGR_SPC_STATUS_FILE=/tmp/circle_status.log
        NTGR_SPC_LOG_FILE_LIST="$NTGR_SPC_LOG_FILE_LIST $NTGR_SPC_STATUS_FILE"
        circlectl status > $NTGR_SPC_STATUS_FILE

        # dumpsm
        NTGR_SPC_DUMPSM_FILE=/tmp/circle_dumpsm.log
        NTGR_SPC_LOG_FILE_LIST="$NTGR_SPC_LOG_FILE_LIST $NTGR_SPC_DUMPSM_FILE"
        export LD_LIBRARY_PATH=/opt/services/spc-circle/shares/usr/lib
        /opt/services/spc-circle/shares/usr/bin/dumpsm -a > $NTGR_SPC_DUMPSM_FILE

        # iptables/ip6tables rules
        NTGR_SPC_IPTABLES_FILE=/tmp/circle_iptables_rules.log
        NTGR_SPC_LOG_FILE_LIST="$NTGR_SPC_LOG_FILE_LIST $NTGR_SPC_IPTABLES_FILE"
        echo "# iptables -w -t nat -vnL" > $NTGR_SPC_IPTABLES_FILE
        iptables -w -t nat -vnL >> $NTGR_SPC_IPTABLES_FILE
        echo >> $NTGR_SPC_IPTABLES_FILE
        echo >> $NTGR_SPC_IPTABLES_FILE
        echo "# iptables -w -vnL" >> $NTGR_SPC_IPTABLES_FILE
        iptables -w -vnL >> $NTGR_SPC_IPTABLES_FILE
        echo >> $NTGR_SPC_IPTABLES_FILE
        echo >> $NTGR_SPC_IPTABLES_FILE
        echo "# ip6tables -w -t nat -vnL" >> $NTGR_SPC_IPTABLES_FILE
        ip6tables -w -t nat -vnL >> $NTGR_SPC_IPTABLES_FILE
        echo >> $NTGR_SPC_IPTABLES_FILE
        echo >> $NTGR_SPC_IPTABLES_FILE
        echo "# ip6tables -w -vnL" >> $NTGR_SPC_IPTABLES_FILE
        ip6tables -w -vnL >> $NTGR_SPC_IPTABLES_FILE

        # spc loader, do not delete it so do not add into $NTGR_SPC_LOG_FILE_LIST
        NTGR_SPC_LOADER_LOG_FILE=/tmp/spc_loader_log

        # vendortest logs
        NTGR_SPC_VENDORTEST_LOG_FILE=/tmp/vendortest.log
        echo "# vendortest -p" > $NTGR_SPC_VENDORTEST_LOG_FILE
        vendortest -p >> $NTGR_SPC_VENDORTEST_LOG_FILE
        echo >> $NTGR_SPC_VENDORTEST_LOG_FILE
        echo >> $NTGR_SPC_VENDORTEST_LOG_FILE
        echo "# vendortest -g" >> $NTGR_SPC_VENDORTEST_LOG_FILE
        vendortest -g >> $NTGR_SPC_VENDORTEST_LOG_FILE

        zip -9 -q -r -j $NTGR_SPC_LOG_ZIP_FILE $NTGR_SPC_LOG_FILE_LIST $NTGR_SPC_LOADER_LOG_FILE $NTGR_SPC_VENDORTEST_LOG_FILE

        rm -f $NTGR_SPC_LOG_FILE_LIST
    fi
    # PEGA >>
    Pega_collect_debug_info $DEBUG_INFO_PATH;
    zip -9 -q -r -j /${STORE_PATH}/debug_log_1.zip $LOGREAD $BR_PACKET $WAN_PACKET $BOOTUP_MSG $DAL_LOGS $WL_LOGS $BITDEFENDER_LOGS $DAL_DB $RAE_LOG $DEBUG_INFO_PATH $PPP_LOG $SYS_LOG $NTGR_SPC_LOG_ZIP_FILE $DHCPC_LOG
    ln -s /${STORE_PATH}/debug_log_1.zip /var/debug_log.zip
#    rm -rf $DAL_LOGS
    echo "<HTML>"
    echo "<meta http-equiv=\"Refresh\" content=\"1; url=../debug_log.zip\">"
    echo '</HTML>'
    rm -rf $BR_PACKET
    rm -rf $WAN_PACKET    
    if [ -e "$NTGR_SPC_LOG_ZIP_FILE" ]; then
        rm -f $NTGR_SPC_LOG_ZIP_FILE
    fi
}


function UpdateCurrentConfig()
{
    sed -i "/^$1=/ s/=.*$/=$2/" $DEBUG_CONF
}

function UpdateCurrentnotSaveConfig()
{
    sed -i "/^$1=/ s/=.*$/=$2/" $DEBUGNOTSAVE_CONF
}

function ReadConf()
{
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
	READYCLOUD_TEST_SERVER)
	    READYCLOUD_TEST_SERVER=$VALUE
	    ;;
	RESET_OVERLAY_DATA)
	    RESET_OVERLAY_DATA=$VALUE
	    ;;
	XAGENT)
	    XAGENT=$VALUE
	    ;;
	ALLOWIPV6PING)
	    ALLOWIPV6PING=$VALUE
	    ;;
	IPV6MODE)
	    IPV6MODE=$VALUE
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
	RA_HTTPSERVERIP)
	    RA_HTTPSERVERIP=$VALUE
	    ;;
	RA_SERVERPATH)
	    RA_SERVERPATH=$VALUE	    
	    ;;
	RA_INITSTARTTIME)
	    RA_INITSTARTTIME=$VALUE	    
	    ;;
    RA_DEBUGINTERVAL)
	    RA_DEBUGINTERVAL=$VALUE
	    ;;
    RA_UPDATEINTERVAL)
	    RA_UPDATEINTERVAL=$VALUE
	    ;;
	DAL_LOGS)
	    DAL_LOGS=$VALUE
	    ;;
        RA_LOG)
            RA_LOG=$VALUE
            ;;
    esac
done < $1
}

function RedirectDebugPage()
{
    echo "<HTML>"
    echo "<meta http-equiv=\"Refresh\" content=\"0; url=../debug.htm\">"
    echo '</HTML>'    
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
CUR_READYCLOUD_TEST_SERVER=$READYCLOUD_TEST_SERVER
CUR_RESET_OVERLAY_DATA=$RESET_OVERLAY_DATA
CUR_XAGENT=$XAGENT
CUR_IPV6MODE=$IPV6MODE
CUR_WANMIRROR=$WANMIRROR
CUR_RA_MODE=$RA_MODE
CUR_RA_HTTPSERVERIP=$RA_HTTPSERVERIP
CUR_RA_SERVERPATH=$RA_SERVERPATH
CUR_RA_INITSTARTTIME=$RA_INITSTARTTIME
CUR_RA_DEBUGINTERVAL=$RA_DEBUGINTERVAL
CUR_RA_UPDATEINTERVAL=$RA_UPDATEINTERVAL
CUR_DAL_LOGS=$DAL_LOGS
CUR_RA_LOG=$RA_LOG
ReadConf $DEBUG_NEWCONF
NEW_CAPTURE_STATE=$CAPTURE_STATE
NEW_PACKETCAPTURE=$PACKETCAPTURE
NEW_CAPTURE_STORE_LOCATION=$CAPTURE_STORE_LOCATION
NEW_LOG_WHEN_BOOTUP=$LOG_WHEN_BOOTUP
NEW_READYCLOUD_TEST_SERVER=$READYCLOUD_TEST_SERVER
NEW_RESET_OVERLAY_DATA=$RESET_OVERLAY_DATA
NEW_XAGENT=$XAGENT
NEW_IPV6MODE=$IPV6MODE
NEW_WANMIRROR=$WANMIRROR
NEW_RA_MODE=$RA_MODE
NEW_FUNC=$FUNC
NEW_DEBUGLOG=$DEBUGLOG
NEW_RA_HTTPSERVERIP=$RA_HTTPSERVERIP
NEW_RA_SERVERPATH=$RA_SERVERPATH
NEW_RA_INITSTARTTIME=$RA_INITSTARTTIME
NEW_RA_DEBUGINTERVAL=$RA_DEBUGINTERVAL
NEW_RA_UPDATEINTERVAL=$RA_UPDATEINTERVAL
NEW_DAL_LOGS=$DAL_LOGS
NEW_RA_LOG=$RA_LOG

ReadConf $DEBUGNOTSAVE_CONF
CUR_ALLOWIPV6PING=$ALLOWIPV6PING
ReadConf $DEBUGNOTSAVE_NEWCONF
NEW_ALLOWIPV6PING=$ALLOWIPV6PING

DebugMsg "===========Get"
DebugMsg "CAPTURE_STATE=$CAPTURE_STATE"
DebugMsg "PACKETCAPTURE=$PACKETCAPTURE"
DebugMsg "CAPTURE_STORE_LOCATION=$CAPTURE_STORE_LOCATION"
DebugMsg "LOG_WHEN_BOOTUP=$LOG_WHEN_BOOTUP"
DebugMsg "READYCLOUD_TEST_SERVER=$READYCLOUD_TEST_SERVER"
DebugMsg "RESET_OVERLAY_DATA=$RESET_OVERLAY_DATA"
DebugMsg "XAGENT=$XAGENT"
DebugMsg "ALLOWIPV6PING=$ALLOWIPV6PING"
DebugMsg "IPV6MODE=$IPV6MODE"
DebugMsg "WANMIRROR=$WANMIRROR"
DebugMsg "RA_MODE=$RA_MODE"
DebugMsg "RA_HTTPSERVERIP=$RA_HTTPSERVERIP"
DebugMsg "RA_SERVERPATH=$RA_SERVERPATH"
DebugMsg "RA_INITSTARTTIME=$RA_INITSTARTTIME"
DebugMsg "RA_DEBUGINTERVAL=$RA_DEBUGINTERVAL"
DebugMsg "RA_UPDATEINTERVAL=$RA_UPDATEINTERVAL"
DebugMsg "DAL_LOGS=$DAL_LOGS"
DebugMsg "RA_LOG=$RA_LOG"
DebugMsg "============CUR"
DebugMsg "CUR_CAPTURE_STATE=$CUR_CAPTURE_STATE"
DebugMsg "CUR_PACKETCAPTURE=$CUR_PACKETCAPTURE"
DebugMsg "CUR_CAPTURE_STORE_LOCATION=$CUR_CAPTURE_STORE_LOCATION"
DebugMsg "CUR_LOG_WHEN_BOOTUP=$CUR_LOG_WHEN_BOOTUP"
DebugMsg "CUR_READYCLOUD_TEST_SERVER=$CUR_READYCLOUD_TEST_SERVER"
DebugMsg "CUR_RESET_OVERLAY_DATA=$CUR_RESET_OVERLAY_DATA"
DebugMsg "CUR_XAGENT=$CUR_XAGENT"
DebugMsg "CUR_ALLOWIPV6PING=$CUR_ALLOWIPV6PING"
DebugMsg "CUR_IPV6MODE=$CUR_IPV6MODE"
DebugMsg "CUR_WANMIRROR=$CUR_WANMIRROR"
DebugMsg "CUR_RA_MODE=$CUR_RA_MODE"
DebugMsg "CUR_RA_HTTPSERVERIP=$RA_HTTPSERVERIP"
DebugMsg "CUR_RA_SERVERPATH=$RA_SERVERPATH"
DebugMsg "CUR_RA_INITSTARTTIME=$RA_INITSTARTTIME"
DebugMsg "CUR_RA_DEBUGINTERVAL=$RA_DEBUGINTERVAL"
DebugMsg "CUR_RA_UPDATEINTERVAL=$RA_UPDATEINTERVAL"
DebugMsg "CUR_DAL_LOGS=$DAL_LOGS"
DebugMsg "CUR_RA_LOG=$RA_LOG"
DebugMsg "============NEW"
DebugMsg "NEW_CAPTURE_STATE=$NEW_CAPTURE_STATE"
DebugMsg "NEW_PACKETCAPTURE=$NEW_PACKETCAPTURE"
DebugMsg "NEW_CAPTURE_STORE_LOCATION=$NEW_CAPTURE_STORE_LOCATION"
DebugMsg "NEW_LOG_WHEN_BOOTUP=$NEW_LOG_WHEN_BOOTUP"
DebugMsg "NEW_READYCLOUD_TEST_SERVER=$NEW_READYCLOUD_TEST_SERVER"
DebugMsg "NEW_RESET_OVERLAY_DATA=$NEW_RESET_OVERLAY_DATA"
DebugMsg "NEW_XAGENT=$NEW_XAGENT"
DebugMsg "NEW_ALLOWIPV6PING=$NEW_ALLOWIPV6PING"
DebugMsg "NEW_IPV6MODE=$NEW_IPV6MODE"
DebugMsg "NEW_WANMIRROR=$NEW_WANMIRROR"
DebugMsg "NEW_RA_MODE=$NEW_RA_MODE"
DebugMsg "NEW_DEBUGLOG=$NEW_DEBUGLOG"
DebugMsg "NEW_RA_HTTPSERVERIP=$RA_HTTPSERVERIP"
DebugMsg "NEW_RA_SERVERPATH=$RA_SERVERPATH"
DebugMsg "NEW_RA_INITSTARTTIME=$RA_INITSTARTTIME"
DebugMsg "NEW_RA_DEBUGINTERVAL=$RA_DEBUGINTERVAL"
DebugMsg "NEW_RA_UPDATEINTERVAL=$RA_UPDATEINTERVAL"
DebugMsg "NEW_DAL_LOGS=$DAL_LOGS"
DebugMsg "NEW_RA_LOG=$RA_LOG"


if [ "$FUNC" == "CF1" ]; then
    if [ -z $NEW_DEBUGLOG ]; then
	    DebugMsg "DO SOMETHING CURRENT_CAPTURE_STATE- $CUR_CAPTURE_STATE $NEW_CAPTURE_STATE"
#	    if ([ "$NEW_CAPTURE_STATE" == "CAPTURE_START" ] || [ "$NEW_CAPTURE_STATE" == "DISABLED" ]) && [ "$CUR_CAPTURE_STATE" != "CAPTURING" ]; then
	    if ([ "$NEW_CAPTURE_STATE" == "CAPTURE_START" ] && [ "$CUR_CAPTURE_STATE" != "CAPTURING" ]); then
		DebugMsg "START CAPTURE"
		if [ "$CUR_CAPTURE_STORE_LOCATION" != "NEW_CAPTURE_STORE_LOCATION" ]; then
		    if [ ! -z $NEW_CAPTURE_STORE_LOCATION ]; then
			 if [ "$NEW_CAPTURE_STORE_LOCATION" == "STORE_IN_USB_STORAGE" ]; then
			     if [ ! -z $USB_LOCATION ]; then		 
				 CapturePacket
				 UpdateCurrentConfig CAPTURE_STATE "CAPTURING"
				 UpdateCurrentConfig CAPTURE_STORE_LOCATION $CAPTURE_STORE_LOCATION
			     else
				 echo -n "USB disk not exist" > /var/debugresult				 
			     fi
			 else
				 CapturePacket
				 UpdateCurrentConfig CAPTURE_STATE "CAPTURING"
				 UpdateCurrentConfig CAPTURE_STORE_LOCATION $CAPTURE_STORE_LOCATION				 
			 fi
		    fi
		fi		
	    elif [ "$NEW_CAPTURE_STATE" == "CAPTURING" ]; then
		DebugMsg "ALREADY CAPTURED"
#	    elif [ "$NEW_CAPTURE_STATE" == "CAPTURE_STOP" ]; then
#		DebugMsg "STOP CAPTURE"
#		UpdateCurrentConfig CAPTURE_STATE $NEW_CAPTURE_STATE
	    fi
	    
	    if [ ! -z $NEW_PACKETCAPTURE ]; then
		UpdateCurrentConfig PACKETCAPTURE $NEW_PACKETCAPTURE
	    fi
	    	    
	    if [ ! -z $NEW_LOG_WHEN_BOOTUP ]; then
		UpdateCurrentConfig  LOG_WHEN_BOOTUP $NEW_LOG_WHEN_BOOTUP
	    fi
	    if [ ! -z $NEW_DAL_LOGS ]; then
		UpdateCurrentConfig  DAL_LOGS $NEW_DAL_LOGS
	    fi
    else
	    if [ "$CUR_CAPTURE_STATE" == "CAPTURING" ]; then
		DebugMsg "SAVELOG"
		#SaveLog
		UpdateCurrentConfig CAPTURE_STATE DISABLED		
	    fi
        SaveLog #Yocheng, 20200305, no matter capturing packet or not, general debug information both need to be saved.
    fi
    if [ ! -z $NEW_RA_LOG ]; then
        UpdateCurrentConfig RA_LOG $NEW_RA_LOG

        if [ "$NEW_RA_LOG" == "ENABLE" ]; then
            touch /data/rabin/enable_ra_log
        else
            rm -f /data/rabin/enable_ra_log
            rm -f /tmp/rae_debug.log
        fi
    fi
fi

if [ "$FUNC" == "CF3" ]; then
    if [ ! -z $NEW_WANMIRROR ]; then
	    if [ "$NEW_WANMIRROR" == "ENABLE" ]; then
		DebugMsg "mirror start"
		ethswctl -c mirror -o enable -n 0 -p 3 -x 0x10 -y 0x10
	    else
		DebugMsg "mirror stop"
		ethswctl -c mirror -o disable -n 0 -p 3 -x 0x10 -y 0x10		
	    fi
	    UpdateCurrentConfig WANMIRROR $NEW_WANMIRROR
    fi
fi

if [ "$FUNC" == "CF4" ]; then
    if [ ! -z $NEW_RA_MODE ]; then
        UpdateCurrentConfig RA_MODE $NEW_RA_MODE
        if [ "$NEW_RA_MODE" == "QA" ]; then
            ra_nvram set RA_stage=qa
        elif [ "$NEW_RA_MODE" == "DEV" ]; then
            ra_nvram set RA_stage=dev
        else
            ra_nvram set RA_stage=prod
        fi
        ra_nvram commit
    fi
    if [ ! -z $NEW_RA_HTTPSERVERIP ]; then
        str=$(echo $NEW_RA_HTTPSERVERIP | sed 's/\//\\\//g')
        UpdateCurrentConfig RA_HTTPSERVERIP $str
        if [ "$NEW_RA_HTTPSERVERIP" == "EMPTY" ]; then
            rm -f /tmp/raedebuglocal
        else
            echo $NEW_RA_HTTPSERVERIP > /tmp/raedebuglocal
        fi
    fi
    if [ ! -z $NEW_RA_SERVERPATH ]; then
        str=$(echo $NEW_RA_SERVERPATH | sed 's/\//\\\//g')
        UpdateCurrentConfig RA_SERVERPATH $str
        if [ "$NEW_RA_MODE" == "QA" ]; then
            if [ "$NEW_RA_SERVERPATH" == "EMPTY" ]; then
                ra_nvram set RA_qa_file_path=""
            else
                ra_nvram set RA_qa_file_path=$NEW_RA_SERVERPATH
            fi
        elif [ "$NEW_RA_MODE" == "DEV" ]; then
            if [ "$NEW_RA_SERVERPATH" == "EMPTY" ]; then
                ra_nvram set RA_dev_file_path=""
            else
                ra_nvram set RA_dev_file_path=$NEW_RA_SERVERPATH
            fi
        else
            if [ "$NEW_RA_SERVERPATH" == "EMPTY" ]; then
                ra_nvram set RA_prod_file_path=""
            else
                ra_nvram set RA_prod_file_path=$NEW_RA_SERVERPATH
            fi
        fi
        ra_nvram commit
    fi
    if [ ! -z $NEW_RA_INITSTARTTIME ]; then
        UpdateCurrentConfig RA_INITSTARTTIME $NEW_RA_INITSTARTTIME
    fi
    if [ ! -z $NEW_RA_DEBUGINTERVAL ]; then
        UpdateCurrentConfig RA_DEBUGINTERVAL $NEW_RA_DEBUGINTERVAL
        ra_nvram set RA_debug_DailyReportTime=$NEW_RA_DEBUGINTERVAL
        ra_nvram commit
    fi
    if [ ! -z $NEW_RA_UPDATEINTERVAL ]; then
        UpdateCurrentConfig RA_UPDATEINTERVAL $NEW_RA_UPDATEINTERVAL
        sed -i '/updaterInternal/c\\t\"updaterInternal\" : \"'$NEW_RA_UPDATEINTERVAL'\",' /data/rabin/raePolicy.json
    fi

    # Make sure files at /data are updated
    sync;sync
    # Teminate puraUpdate and restart ntgr_ra_iot (ntgr_ra_iot will bring up puraUpdate)
    kill -9 $(pidof puraUpdate)
    rae_restart.sh
fi

if [ "$FUNC" == "CF5" ]; then
	if [ ! -z $NEW_READYCLOUD_TEST_SERVER ]; then
	    UpdateCurrentConfig READYCLOUD_TEST_SERVER $NEW_READYCLOUD_TEST_SERVER
	fi	        
fi

if [ "$FUNC" == "CF7" ]; then
    if [ ! -z $NEW_ALLOWIPV6PING ]; then
        if [ "$NEW_IPV6MODE" != "Disabled" ]; then
            ip6tables -t filter -w -D FORWARD -i ppp0.3 -p icmpv6 -jACCEPT
            ip6tables -t filter -w -D FORWARD -i eth4.1 -p icmpv6 -jACCEPT
            if [ "$NEW_ALLOWIPV6PING" == "ENABLE" ]; then
                DebugMsg "ALLOWIP6Ping start"
                if [ "$NEW_IPV6MODE" == "PPPoE" ]; then
                    ip6tables -t filter -w -I FORWARD -i ppp0.3 -p icmpv6 -jACCEPT
                else
                    ip6tables -t filter -w -I FORWARD -i eth4.1 -p icmpv6 -jACCEPT
                fi
            else
                DebugMsg "ALLOWIP6Ping stop"
            fi
        fi
        UpdateCurrentnotSaveConfig ALLOWIPV6PING $NEW_ALLOWIPV6PING
    fi
fi

if [ "$FUNC" == "CF8" ]; then
    if [ ! -z $NEW_XAGENT ]; then
        if [ "$NEW_XAGENT" == "ENABLE" ]; then
            DebugMsg "XAgent start"
            /etc/init.d/XAgent start
        else
            DebugMsg "XAgent stop"
            /etc/init.d/XAgent stop
        fi
        UpdateCurrentConfig XAGENT $NEW_XAGENT
    fi
fi
