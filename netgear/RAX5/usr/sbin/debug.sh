#!/bin/sh
DEBUG_TMP=/tmp/debug_tmp
DEBUG_CONF=/var/debug.conf
DEBUG_NEWCONF=/var/newdebug.conf
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
RA_ISMANUAL=

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
NEW_RA_ISMANUAL=

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
CUR_RA_ISMANUAL=
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
    STORE_PATH=tmp
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
            touch /etc/dal/log_dal_when_bootup
        fi
    else
        rm -rf /etc/dal/log_dal_when_bootup
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
        tcpdump -i br-lan -w /${STORE_PATH}/BR_LAN.cap -C 4 -W 10 &
        tcpdump -i eth1 ether[12:2] != 0x8100 and ether[14:2] != 0x001 -w /${STORE_PATH}/ETH_WAN.cap -C 4 -W 10 &
#        WlGetDriverStats.sh wl0 nic 20 enable > /tmp/wl0_DrvStats.log 2>&1 &
#        WlGetDriverStats.sh wl1 nic 20 enable > /tmp/wl1_DrvStats.log 2>&1 &
    else
        rm -f /${STORE_PATH}/BR_LAN.cap*
        rm -f /${STORE_PATH}/ETH_WAN.cap*
#        rm -f /${STORE_PATH}/wl0_DrvStats.log
#        rm -f /${STORE_PATH}/wl0_DrvStats.log
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
#    echo -e "\rcommand: cat /proc/slabinfo" >> $outputPath
#    cat /proc/slabinfo >> $outputPath
    echo -e "\rcommand: cat /proc/meminfo" >> $outputPath
    cat /proc/meminfo >> $outputPath
    echo -e "\rcommand: free" >> $outputPath
    free >> $outputPath
#    echo -e "\rcommand: sysinfo" >> $outputPath
#    sysinfo >> $outputPath
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
    echo "<<<<< NTGR WiFi Config >>>>>" >> $outputPath
    uci show NTGR_WiFi >> $outputPath
    echo "<<<<< WiFi Config END >>>>>" >> $outputPath
    echo "<<<<< l1profile.dat >>>>>" >> $outputPath
    cat /etc/wireless/l1profile.dat >> $outputPath
    echo "<<<<< l1profile.dat END >>>>>" >> $outputPath
    echo "<<<<< mt7915.dbdc.b0.dat >>>>>" >> $outputPath
    cat /etc/wireless/mediatek/mt7915.dbdc.b0.dat >> $outputPath
    echo "<<<<< mt7915.dbdc.b1.dat END >>>>>" >> $outputPath
    cat /etc/wireless/mediatek/mt7915.dbdc.b1.dat >> $outputPath
    echo "<<<<< mt7915.dbdc.b1.dat END >>>>>" >> $outputPath
    echo "<<<<< DBDC_card0.dat >>>>>" >> $outputPath
    cat /etc/wireless/mediatek/DBDC_card0.dat >> $outputPath
    echo "<<<<< DBDC_card0.dat END >>>>>" >> $outputPath

    #RA information
    echo "<<<<< rabin files Information >>>>>" >> $outputPath
    ls -al /etc/rabin >> $outputPath
    echo "<<<<< rabin files Information END >>>>>" >> $outputPath
    echo "<<<<< ra_nvram config show >>>>>" >> $outputPath
    ra_nvram show >> $outputPath
    echo "<<<<< ra_nvram config show END >>>>>" >> $outputPath

    iwpriv ra0 get_driverinfo >> $outputPath
    iwinfo ra0 info >> $outputPath
    iwinfo rax0 info >> $outputPath
    iwinfo ra1 info >> $outputPath
    iwinfo rax1 info >> $outputPath
    iwpriv ra0 stat >> $outputPath
    iwpriv rax0 stat >> $outputPath
    iwpriv ra1 stat >> $outputPath
    iwpriv rax1 stat >> $outputPath
    iwpriv ra0 pega_show stainfo >> $outputPath
    iwpriv rax0 pega_show stainfo >> $outputPath
    iwpriv ra0 get_mac_table >> $outputPath
    iwpriv rax0 get_mac_table >> $outputPath
    cat /proc/net/wireless >> $outputPath
    echo "<<<<< d2 logs start >>>>>" >> $outputPath
    d2 general >> $outputPath
    d2 xagentcfg>> $outputPath
    d2 upcfg>> $outputPath
    d2 armorcfg>> $outputPath
    d2 armorstatus>> $outputPath
    echo "<<<<< d2 logs end >>>>>" >> $outputPath

    echo "----- Release Information -----" >> $outputPath
    cat /etc/openwrt_release >> $outputPath
    echo "----- LAN Dev Information -----" >> $outputPath
    uci -P /var/state export landev >> $outputPath
    echo "----- Network Information -----" >> $outputPath
    uci -P /var/state export network >> $outputPath
    echo "----- Netgear Information -----" >> $outputPath
    uci -P /var/state export netgear >> $outputPath
    echo "----- ifstatus wan Information -----" >> $outputPath
    /sbin/ifstatus wan >> $outputPath
    echo "----- ifstatus wan_v6 Information -----" >> $outputPath
    /sbin/ifstatus wan_v6 >> $outputPath
    echo "====debug info end, date-time: `date -R`===" >> $outputPath
}

function SaveLog()
{
    StopPacketCapture
    STORE_PATH=tmp
    logread > /var/log/debuglog
    SYS_LOG=/var/log/debuglog
    LOGREAD=/var/log/logd_log
    BOOTUP_MSG=/tmp/bootupmessages
    DEBUG_INFO_PATH=/tmp/debug_info.log
    ETC_CONF=/${STORE_PATH}/etc_config.tar.gz
    BITDEFENDER_STORAGE=/opt/bitdefender/storage.json
    URLFILTERD_HTTP_PKT_DUMP=/tmp/urlfilterd_pkt_dump.txt

    WL_LOGS=
    DAL_LOGS=
    BITDEFENDER_LOGS=
    DAL_DB=
    PPP_LOG=/var/ppp/log
    NTGR_SPC_LOGS=

    #bitdefender logs
    /opt/bitdefender/share/scripts/archive_logs.sh
    if [ -e "/tmp/bitdefender_logs.tar.gz" ]; then
        BITDEFENDER_LOGS=/tmp/bitdefender_logs.tar.gz
    fi
    #DAL database
    # rm -f /${STORE_PATH}/debug_log_1.zip /var/debug_log.zip
    #NTGR SPC log files
    if [ -e "/etc/ntgr_spc_config.ini" ]; then
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
        zip -9 -q -r -j $NTGR_SPC_LOG_ZIP_FILE $NTGR_SPC_LOG_FILE_LIST $NTGR_SPC_LOADER_LOG_FILE

        rm -f $NTGR_SPC_LOG_FILE_LIST
    fi
# Start Debug Log Capture when boot up
# Enable LAN/WAN Packet Capture -> $BR_PACKET $WAN_PACKET
# Enable DAL Log  -> $DAL_LOGS $DAL_DB
# Collect Router Analytic Log  -> $RAE_LOG
    # PEGA >>
    if [ $(uci get debug_page.log.en_packet_cap) == "ENABLE" ]; then
        BR_PACKET=/${STORE_PATH}/BR_LAN.cap*
        WAN_PACKET=/${STORE_PATH}/ETH_WAN.cap*
    else
        BR_PACKET=
        WAN_PACKET=
    fi

    #MattLin, 20221026. Always save DAL related logs if log files existed.
    #DAL modules init will handle the log files existed or not.
    #DAL database
    zip -9 -q -r -j /tmp/d2d.zip /etc/dal/d2d
    if [ -e "/tmp/d2d.zip" ]; then
        DAL_DB=/tmp/d2d.zip
    fi

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

    if [ $(uci get debug_page.log.en_ra_log) == "ENABLE" ]; then
#        SEL_FILES_LOGS += $CUR_RA_LOG
        RAE_LOG=/tmp/rae_debug.log
        RAE_LOG1=/tmp/rae_debug.log.1
    else
        RAE_LOG=
        RAE_LOG1=
    fi

    tar cvzf $ETC_CONF /etc/config

#    rm -f /${STORE_PATH}/debug_log_1.zip /var/debug_log.zip
    Pega_collect_debug_info $DEBUG_INFO_PATH;
    zip -9 -q -r -j /${STORE_PATH}/debug_log_1.zip $LOGREAD $BR_PACKET $WAN_PACKET $BOOTUP_MSG $DAL_LOGS $WL_LOGS $BITDEFENDER_LOGS $DAL_DB $RAE_LOG $RAE_LOG1 $DEBUG_INFO_PATH $PPP_LOG $SYS_LOG $NTGR_SPC_LOG_ZIP_FILE $ETC_CONF $BITDEFENDER_STORAGE $URLFILTERD_HTTP_PKT_DUMP
    ln -s /${STORE_PATH}/debug_log_1.zip /var/debug_log.zip
#    rm -rf $DAL_LOGS
    echo "<HTML>"
    echo "<meta http-equiv=\"Refresh\" content=\"1; url=../debug_log.zip\">"
    echo '</HTML>'
    rm -rf $BR_PACKET
    rm -rf $WAN_PACKET
    rm -f $ETC_CONF $DEBUG_INFO_PATH
    rm -rf $URLFILTERD_HTTP_PKT_DUMP
    if [ -e "$NTGR_SPC_LOG_ZIP_FILE" ]; then
        rm -f $NTGR_SPC_LOG_ZIP_FILE
    fi
}


function UpdateCurrentConfig()
{
    sed -i "/^$1=/ s/=.*$/=$2/" $DEBUG_CONF
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
	RA_ISMANUAL)
	    RA_ISMANUAL=$VALUE
	    ;;
	FUNC)
	    FUNC=$VALUE
	    ;;
	DEBUGLOG)
	    DEBUGLOG=$VALUE
	    ;;
	RA_SERVERIP)
	    RA_SERVERIP=$VALUE
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
    RA_DEBUGPRINT)
	    RA_DEBUGPRINT=$VALUE
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
    USB_LOCATION=`mount | grep -E "sd[a-f,1-9]+.*vfat+" | grep -o -E "(/mnt)+(/disk)+[0-9]+_+[0-9]+"`
}

if [ "$1" == "INIT" ]; then
	/bin/cp /etc/debug.conf $DEBUG_CONF
	if [ -f "/etc/config/debug_page" ]; then
		# update debug page uci parameters
		NEW_LOG_WHEN_BOOTUP=$(uci get debug_page.log.en_capture_bootup)
		UpdateCurrentConfig LOG_WHEN_BOOTUP NEW_LOG_WHEN_BOOTUP $NEW_LOG_WHEN_BOOTUP

		NEW_PACKETCAPTURE=$(uci get debug_page.log.en_packet_cap)
		UpdateCurrentConfig PACKETCAPTURE $NEW_PACKETCAPTURE

		NEW_DAL_LOGS=$(uci get debug_page.log.en_dal)
		UpdateCurrentConfig DAL_LOGS $NEW_DAL_LOGS

		NEW_RA_LOG=$(uci get debug_page.log.en_ra_log)
		UpdateCurrentConfig RA_LOG $NEW_RA_LOG
		if [ "$NEW_RA_LOG" == "ENABLE" ]; then
			touch /etc/rabin/enable_ra_log
		else
			rm -f /etc/rabin/enable_ra_log
		fi
	else
		# default uci debug page
		/bin/touch /etc/config/debug_page
		uci set debug_page.log=debug
		uci set debug_page.log.en_capture_bootup=DISABLE
		uci set debug_page.log.en_packet_cap=DISABLE
		uci set debug_page.log.en_dal=DISABLE
		uci set debug_page.log.en_ra_log=ENABLE
		uci set debug_page.log.start_cap=DISABLE
		uci commit debug_page
	fi
else
	GetUsbLocation
	ReadConf $DEBUG_CONF
	CUR_CAPTURE_STATE=$CAPTURE_STATE
	CUR_PACKETCAPTURE=$PACKETCAPTURE
	CUR_CAPTURE_STORE_LOCATION=$CAPTURE_STORE_LOCATION
	CUR_LOG_WHEN_BOOTUP=$LOG_WHEN_BOOTUP
	CUR_READYCLOUD_TEST_SERVER=$READYCLOUD_TEST_SERVER
	CUR_RESET_OVERLAY_DATA=$RESET_OVERLAY_DATA
	CUR_XAGENT=$XAGENT
	CUR_ALLOWIPV6PING=$ALLOWIPV6PING
	CUR_IPV6MODE=$IPV6MODE
	CUR_WANMIRROR=$WANMIRROR
	CUR_RA_MODE=$RA_MODE
	CUR_RA_ISMANUAL=$RA_ISMANUAL
	CUR_RA_SERVERIP=$RA_SERVERIP
	CUR_RA_HTTPSERVERIP=$RA_HTTPSERVERIP
	CUR_RA_SERVERPATH=$RA_SERVERPATH
	CUR_RA_INITSTARTTIME=$RA_INITSTARTTIME
	CUR_RA_DEBUGINTERVAL=$RA_DEBUGINTERVAL
	CUR_RA_UPDATEINTERVAL=$RA_UPDATEINTERVAL
	CUR_RA_DEBUGPRINT=$RA_DEBUGPRINT
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
	NEW_ALLOWIPV6PING=$ALLOWIPV6PING
	NEW_IPV6MODE=$IPV6MODE
	NEW_WANMIRROR=$WANMIRROR
	NEW_RA_MODE=$RA_MODE
	NEW_RA_ISMANUAL=$RA_ISMANUAL
	NEW_FUNC=$FUNC
	NEW_DEBUGLOG=$DEBUGLOG
	NEW_RA_SERVERIP=$RA_SERVERIP
	NEW_RA_HTTPSERVERIP=$RA_HTTPSERVERIP
	NEW_RA_SERVERPATH=$RA_SERVERPATH
	NEW_RA_INITSTARTTIME=$RA_INITSTARTTIME
	NEW_RA_DEBUGINTERVAL=$RA_DEBUGINTERVAL
	NEW_RA_UPDATEINTERVAL=$RA_UPDATEINTERVAL
	NEW_RA_DEBUGPRINT=$RA_DEBUGPRINT
	NEW_DAL_LOGS=$DAL_LOGS
	NEW_RA_LOG=$RA_LOG
#	DebugMsg "===========Get"
#	DebugMsg "CAPTURE_STATE=$CAPTURE_STATE"
#	DebugMsg "PACKETCAPTURE=$PACKETCAPTURE"
#	DebugMsg "CAPTURE_STORE_LOCATION=$CAPTURE_STORE_LOCATION"
#	DebugMsg "LOG_WHEN_BOOTUP=$LOG_WHEN_BOOTUP"
#	DebugMsg "READYCLOUD_TEST_SERVER=$READYCLOUD_TEST_SERVER"
#	DebugMsg "RESET_OVERLAY_DATA=$RESET_OVERLAY_DATA"
#	DebugMsg "XAGENT=$XAGENT"
#	DebugMsg "ALLOWIPV6PING=$ALLOWIPV6PING"
#	DebugMsg "IPV6MODE=$IPV6MODE"
#	DebugMsg "WANMIRROR=$WANMIRROR"
#	DebugMsg "RA_MODE=$RA_MODE"
#	DebugMsg "RA_SERVERIP=$RA_SERVERIP"
#	DebugMsg "RA_HTTPSERVERIP=$RA_HTTPSERVERIP"
#	DebugMsg "RA_SERVERPATH=$RA_SERVERPATH"
#	DebugMsg "RA_INITSTARTTIME=$RA_INITSTARTTIME"
#	DebugMsg "RA_DEBUGINTERVAL=$RA_DEBUGINTERVAL"
#	DebugMsg "RA_UPDATEINTERVAL=$RA_UPDATEINTERVAL"
#	DebugMsg "RA_DEBUGPRINT=$RA_DEBUGPRINT"
#	DebugMsg "DAL_LOGS=$DAL_LOGS"
#	DebugMsg "RA_LOG=$RA_LOG"
#	DebugMsg "============CUR"
#	DebugMsg "CUR_CAPTURE_STATE=$CUR_CAPTURE_STATE"
#	DebugMsg "CUR_PACKETCAPTURE=$CUR_PACKETCAPTURE"
#	DebugMsg "CUR_CAPTURE_STORE_LOCATION=$CUR_CAPTURE_STORE_LOCATION"
#	DebugMsg "CUR_LOG_WHEN_BOOTUP=$CUR_LOG_WHEN_BOOTUP"
#	DebugMsg "CUR_READYCLOUD_TEST_SERVER=$CUR_READYCLOUD_TEST_SERVER"
#	DebugMsg "CUR_RESET_OVERLAY_DATA=$CUR_RESET_OVERLAY_DATA"
#	DebugMsg "CUR_XAGENT=$CUR_XAGENT"
#	DebugMsg "CUR_ALLOWIPV6PING=$CUR_ALLOWIPV6PING"
#	DebugMsg "CUR_IPV6MODE=$CUR_IPV6MODE"
#	DebugMsg "CUR_WANMIRROR=$CUR_WANMIRROR"
#	DebugMsg "CUR_RA_MODE=$CUR_RA_MODE"
#	DebugMsg "CUR_RA_SERVERIP=$RA_SERVERIP"
#	DebugMsg "CUR_RA_HTTPSERVERIP=$RA_HTTPSERVERIP"
#	DebugMsg "CUR_RA_SERVERPATH=$RA_SERVERPATH"
#	DebugMsg "CUR_RA_INITSTARTTIME=$RA_INITSTARTTIME"
#	DebugMsg "CUR_RA_DEBUGINTERVAL=$RA_DEBUGINTERVAL"
#	DebugMsg "CUR_RA_UPDATEINTERVAL=$RA_UPDATEINTERVAL"
#	DebugMsg "CUR_RA_DEBUGPRINT=$RA_DEBUGPRINT"
#	DebugMsg "CUR_DAL_LOGS=$DAL_LOGS"
#	DebugMsg "CUR_RA_LOG=$RA_LOG"
#	DebugMsg "============NEW"
#	DebugMsg "NEW_CAPTURE_STATE=$NEW_CAPTURE_STATE"
#	DebugMsg "NEW_PACKETCAPTURE=$NEW_PACKETCAPTURE"
#	DebugMsg "NEW_CAPTURE_STORE_LOCATION=$NEW_CAPTURE_STORE_LOCATION"
#	DebugMsg "NEW_LOG_WHEN_BOOTUP=$NEW_LOG_WHEN_BOOTUP"
#	DebugMsg "NEW_READYCLOUD_TEST_SERVER=$NEW_READYCLOUD_TEST_SERVER"
#	DebugMsg "NEW_RESET_OVERLAY_DATA=$NEW_RESET_OVERLAY_DATA"
#	DebugMsg "NEW_XAGENT=$NEW_XAGENT"
#	DebugMsg "NEW_ALLOWIPV6PING=$NEW_ALLOWIPV6PING"
#	DebugMsg "NEW_IPV6MODE=$NEW_IPV6MODE"
#	DebugMsg "NEW_WANMIRROR=$NEW_WANMIRROR"
#	DebugMsg "NEW_RA_MODE=$NEW_RA_MODE"
#	DebugMsg "NEW_DEBUGLOG=$NEW_DEBUGLOG"
#	DebugMsg "NEW_RA_SERVERIP=$RA_SERVERIP"
#	DebugMsg "NEW_RA_HTTPSERVERIP=$RA_HTTPSERVERIP"
#	DebugMsg "NEW_RA_SERVERPATH=$RA_SERVERPATH"
#	DebugMsg "NEW_RA_INITSTARTTIME=$RA_INITSTARTTIME"
#	DebugMsg "NEW_RA_DEBUGINTERVAL=$RA_DEBUGINTERVAL"
#	DebugMsg "NEW_RA_UPDATEINTERVAL=$RA_UPDATEINTERVAL"
#	DebugMsg "NEW_RA_DEBUGPRINT=$RA_DEBUGPRINT"
#	DebugMsg "NEW_DAL_LOGS=$DAL_LOGS"
#	DebugMsg "NEW_RA_LOG=$RA_LOG"
fi


if [ "$FUNC" == "CF1" ]; then
	if [ -z $NEW_DEBUGLOG ]; then
		if [ "$CUR_CATPURE_STATE" !=  "$NEW_CAPTURE_STATE" ]; then
			DebugMsg "DO SOMETHING CURRENT_CAPTURE_STATE- $CUR_CAPTURE_STATE $NEW_CAPTURE_STATE"
#	    if ([ "$NEW_CAPTURE_STATE" == "CAPTURE_START" ] || [ "$NEW_CAPTURE_STATE" == "DISABLED" ]) && [ "$CUR_CAPTURE_STATE" != "CAPTURING" ]; then
			if ([ "$NEW_CAPTURE_STATE" == "CAPTURE_START" ] && [ "$CUR_CAPTURE_STATE" != "CAPTURING" ]); then
				DebugMsg "START CAPTURE"
				if [ "$CUR_CAPTURE_STORE_LOCATION" != "NEW_CAPTURE_STORE_LOCATION" ]; then
					if [ ! -z $NEW_CAPTURE_STORE_LOCATION ]; then
					CapturePacket
					UpdateCurrentConfig CAPTURE_STATE "CAPTURING"
					UpdateCurrentConfig CAPTURE_STORE_LOCATION $CAPTURE_STORE_LOCATION
					fi
				fi
				touch /tmp/debug_urlfilterd
				kill -SIGUSR2 `pidof urlfilterd`
			elif [ "$NEW_CAPTURE_STATE" == "CAPTURING" ]; then
				DebugMsg "ALREADY CAPTURED"
			fi

			if [ ! -z $NEW_PACKETCAPTURE ]; then
				UpdateCurrentConfig PACKETCAPTURE $NEW_PACKETCAPTURE
				uci set debug_page.log.en_packet_cap=$NEW_PACKETCAPTURE
				uci commit debug_page
			fi

			if [ ! -z $NEW_LOG_WHEN_BOOTUP ]; then
				UpdateCurrentConfig LOG_WHEN_BOOTUP $NEW_LOG_WHEN_BOOTUP
				uci set debug_page.log.en_capture_bootup=$NEW_LOG_WHEN_BOOTUP
				uci commit debug_page
			fi

			if [ ! -z $NEW_DAL_LOGS ]; then
				UpdateCurrentConfig DAL_LOGS $NEW_DAL_LOGS
				uci set debug_page.log.en_dal=$NEW_DAL_LOGS
				uci commit debug_page
			fi
		fi
	else
		if [ "$CUR_CAPTURE_STATE" == "CAPTURING" ]; then
			DebugMsg "SAVELOG"
			#SaveLog
			UpdateCurrentConfig CAPTURE_STATE DISABLED
			rm -rf /tmp/debug_urlfilterd
			kill -SIGUSR2 `pidof urlfilterd`
		fi
		SaveLog #Yocheng, 20200305, no matter capturing packet or not, general debug information both need to be saved.
	fi

	if [ ! -z $NEW_RA_LOG ]; then
		UpdateCurrentConfig RA_LOG $NEW_RA_LOG
		uci set debug_page.log.en_ra_log=$NEW_RA_LOG
		uci commit debug_page
		if [ "$NEW_RA_LOG" == "ENABLE" ]; then
			touch /etc/rabin/enable_ra_log
		else
			rm -f /etc/rabin/enable_ra_log
#            rm -f /tmp/rae_debug.log
		fi
	fi
fi

if [ "$FUNC" == "CF3" ]; then
    if [ ! -z $NEW_WANMIRROR ]; then
	if [ "$CUR_WANMIRROR" != "$NEW_WANMIRROR" ]; then
	    if [ "$NEW_WANMIRROR" == "ENABLE" ]; then
		DebugMsg "mirror start"
		switch mirror monitor 1
		switch mirror target 0 3
	    else
		DebugMsg "mirror stop"
		switch mirror target 0 0
		reg10=0x`switch reg r 10 | grep -i 'value' | cut -d '=' -f3`
		# reg 0x0010 is MFC : bit3(MIRROR_EN), bit[2:0] is MIRROP_PORT
		reg10_dis_mirror=`printf %x $((reg10&0xfffffff0))`
		switch reg w 10 $reg10_dis_mirror
	    fi
	    UpdateCurrentConfig WANMIRROR $NEW_WANMIRROR
	fi
    fi
fi

if [ "$FUNC" == "CF4" ]; then
    ra_restart=0

    if [ ! -z $NEW_RA_ISMANUAL ]; then
        if [ "$NEW_RA_ISMANUAL" != "$CUR_RA_ISMANUAL" ]; then
            UpdateCurrentConfig RA_ISMANUAL $NEW_RA_ISMANUAL
            ra_nvram set RA_isManual=$NEW_RA_ISMANUAL
            ### When "RAE Default" checkbox checked, the RA stage will change to default after ntgr_ra_iot restart.
            ra_restart=1
        fi
    fi

    if [ ! -z $NEW_RA_MODE ]; then
        ### When "RAE Default" checkbox uncheck, change RA_stage by debug page
        if [ "$NEW_RA_ISMANUAL" == "1" ]; then
            if [ "$NEW_RA_MODE" != "$CUR_RA_MODE" ]; then
                UpdateCurrentConfig RA_MODE $NEW_RA_MODE
                if [ "$NEW_RA_MODE" == "QA" ] || [ "$NEW_RA_MODE" == "qa" ]; then
                    ra_nvram set RA_stage=qa
                elif [ "$NEW_RA_MODE" == "DEV" ] || [ "$NEW_RA_MODE" == "dev" ]; then
                    ra_nvram set RA_stage=dev
                elif [ "$NEW_RA_MODE" == "PROD" ] || [ "$NEW_RA_MODE" == "prod" ]; then
                    ra_nvram set RA_stage=prod
                fi
                ra_restart=1
            fi
        fi
    fi

    if [ ! -z $NEW_RA_DEBUGINTERVAL ]; then
        if [ "$NEW_RA_DEBUGINTERVAL" != "$CUR_RA_DEBUGINTERVAL" ]; then
            UpdateCurrentConfig RA_DEBUGINTERVAL $NEW_RA_DEBUGINTERVAL
            ra_nvram set RA_debug_DailyReportTime=$NEW_RA_DEBUGINTERVAL
            ra_restart=1
        fi
    fi

    if [ "$ra_restart" = "1" ]; then
        /etc/init.d/ntgr_ra_iot restart
    fi

    if [ ! -z $NEW_RA_SERVERIP ]; then
        UpdateCurrentConfig RA_SERVERIP $NEW_RA_SERVERIP
#        UpdateCurrentConfig RA_HTTPSERVERIP $NEW_RA_SERVERIP
        if [ "$NEW_RA_SERVERIP" == "EMPTY" ]; then
            echo "" > /tmp/raedebuglocal
        else
            echo $NEW_RA_SERVERIP > /tmp/raedebuglocal
        fi
    fi
    if [ ! -z $NEW_RA_HTTPSERVERIP ]; then
        UpdateCurrentConfig RA_HTTPSERVERIP $NEW_RA_HTTPSERVERIP
        if [ "$NEW_RA_HTTPSERVERIP" == "EMPTY" ]; then
            echo "" > /tmp/raedebuglocal
        else
            echo $NEW_RA_HTTPSERVERIP > /tmp/raedebuglocal
        fi
    fi
    if [ ! -z $NEW_RA_SERVERPATH ]; then
        UpdateCurrentConfig RA_SERVERPATH $NEW_RA_SERVERPATH
        if [ "$NEW_RA_MODE" == "QA" ] || [ "$NEW_RA_MODE" == "qa" ]; then
            if [ "$NEW_RA_SERVERPATH" == "EMPTY" ]; then
                ra_nvram set RA_qa_file_path=""
            else
                ra_nvram set RA_qa_file_path=$NEW_RA_SERVERPATH
            fi
        elif [ "$NEW_RA_MODE" == "DEV" ] || [ "$NEW_RA_MODE" == "dev" ]; then
            if [ "$NEW_RA_SERVERPATH" == "EMPTY" ]; then
                ra_nvram set RA_dev_file_path=""
            else
                ra_nvram set RA_dev_file_path=$NEW_RA_SERVERPATH
            fi
        elif [ "$NEW_RA_MODE" == "PROD" ] || [ "$NEW_RA_MODE" == "prod" ]; then
            if [ "$NEW_RA_SERVERPATH" == "EMPTY" ]; then
                ra_nvram set RA_prod_file_path=""
            else
                ra_nvram set RA_prod_file_path=$NEW_RA_SERVERPATH
            fi
        fi
    fi
    if [ ! -z $NEW_RA_INITSTARTTIME ]; then
        UpdateCurrentConfig RA_INITSTARTTIME $NEW_RA_INITSTARTTIME
    fi

    if [ ! -z $NEW_RA_UPDATEINTERVAL ]; then
        if [ "$NEW_RA_UPDATEINTERVAL" != "$CUR_RA_UPDATEINTERVAL" ]; then
            UpdateCurrentConfig RA_UPDATEINTERVAL $NEW_RA_UPDATEINTERVAL
            sed -i 's/"updaterInternal" : "'$CUR_RA_UPDATEINTERVAL'"/"updaterInternal" : "'$NEW_RA_UPDATEINTERVAL'"/g' /etc/rabin/raePolicy.json
            puraUpdate -S
        fi
    fi

    if [ ! -z $NEW_RA_DEBUGPRINT ]; then
        if [ "$NEW_RA_DEBUGPRINT" != "$CUR_RA_DEBUGPRINT" ]; then
            UpdateCurrentConfig RA_DEBUGPRINT $NEW_RA_DEBUGPRINT
            if [ "$NEW_RA_DEBUGPRINT" == "Enable" ]; then
                ra_nvram set RA_debug_print=1
                ra_nvram commit
            else
                ra_nvram set RA_debug_print=0
                ra_nvram commit
            fi
        fi
    fi
fi

if [ "$FUNC" == "CF5" ]; then
	if [ ! -z $NEW_READYCLOUD_TEST_SERVER ]; then
	    UpdateCurrentConfig READYCLOUD_TEST_SERVER $NEW_READYCLOUD_TEST_SERVER
	fi
fi

if [ "$FUNC" == "CF7" ]; then
    if [ ! -z $NEW_ALLOWIPV6PING ]; then
        if [ "$CUR_ALLOWIPV6PING" != "$NEW_ALLOWIPV6PING" ] && [ "$NEW_IPV6MODE" != "Disabled" ]; then
            ip6tables -t filter -w -D FORWARD -i $NEW_IPV6MODE -p icmpv6 --icmpv6-type echo-request -j ACCEPT
            ip6tables -t filter -w -D FORWARD -i $NEW_IPV6MODE -p icmpv6 --icmpv6-type echo-request -j DROP
            if [ "$NEW_ALLOWIPV6PING" == "ENABLE" ]; then
                DebugMsg "ALLOWIP6Ping start"
                ip6tables -t filter -w -I FORWARD -i $NEW_IPV6MODE -p icmpv6 --icmpv6-type echo-request -j ACCEPT
            else
                DebugMsg "ALLOWIP6Ping stop"
                ip6tables -t filter -w -I FORWARD -i $NEW_IPV6MODE -p icmpv6 --icmpv6-type echo-request -j DROP
            fi
            UpdateCurrentConfig ALLOWIPV6PING $NEW_ALLOWIPV6PING
        fi
    fi
fi

if [ "$FUNC" == "CF8" ]; then
    if [ ! -z $NEW_XAGENT ]; then
	if [ "$CUR_XAGENT" != "$NEW_XAGENT" ]; then
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
fi
