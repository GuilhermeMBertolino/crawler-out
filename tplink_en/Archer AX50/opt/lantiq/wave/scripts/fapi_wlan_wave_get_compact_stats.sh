#!/bin/sh
# Print one compact line of selected statistics

IFS_ORIG=$IFS

usage()
{
	printf "\nPrint one compact line of selected statistics\n"
	printf "\tUsage: $0 <WLAN_INTF> <MAC_OF_STA_DEVICE>\n"
	printf "\tE.g.:  $0 wlan2 A0:39:F7:02:F4:7D\n\n"
}

if [ "$#" -ne 2 ] ||
	[ "$1" == "--help" ] ||
	[ "$1" == "-h" ]; then
	usage
	exit
fi

if [ "$1" != "wlan0" ] &&
	[ "$1" != "wlan2" ]; then
	printf "Error: illegal param1 [$1]\n\n"
	exit
fi

WLAN_INTF=$1
MAC_ADDR=$2

TMP_dir=/tmp
#TMP_dir=.
TMP_ChannelInfo=$TMP_dir/ChannelInfo
TMP_PeerFlowStatus=$TMP_dir/PeerFlowStatus
TMP_PeerFlowStatusRSSI=$TMP_dir/PeerFlowStatusRSSI
TMP_PeerRatesInfo=$TMP_dir/PeerRatesInfo
TMP_PeerRatesInfoDownlink=$TMP_dir/PeerRatesInfoDownlink
EEPROMInfo=/opt/lantiq/wave/confs/eeprom_info

# Get hw revision in order to consider the nof antennas
hw_revision="X" # set default value
hw_revision=`cat $EEPROMInfo | grep "(E)" | grep -m 1 "HW revision" |  awk '{print $4}'`
[ "$hw_revision" != "0x45" ] && [ "$WLAN_INTF" = "wlan0" ] && hw_revision=`cat $EEPROMInfo | grep "(A)" | grep -m 1 "HW revision" |  awk '{print $4}'`
[ "$hw_revision" != "0x45" ] && [ "$WLAN_INTF" = "wlan2" ] && hw_revision=`cat $EEPROMInfo | grep "(B)" | grep -m 1 "HW revision" | awk '{print $4}'`
#hw_revision=0x41
#hw_revision=0x42
#hw_revision=0x45

# Parse channel info
cat /proc/net/mtlk/$WLAN_INTF/channel > $TMP_ChannelInfo
CHAN=`grep "primary_channel:" $TMP_ChannelInfo | awk '{print $2}'`

# Parse PeerFlowStatus
mtdump $WLAN_INTF PeerFlowStatus $MAC_ADDR > $TMP_PeerFlowStatus 2>&1
if [ `grep -c "isn't connected to wlan" $TMP_PeerFlowStatus` = "1" ]; then
	printf "Error: [ $MAC_ADDR ] isn't connected to $WLAN_INTF\n\n"
	exit
fi
RX_RATE=`grep "LastDataUplinkRate" "$TMP_PeerFlowStatus" | awk '{print $1}'`
let RX_RATE=$RX_RATE/1000

#cat $TMP_PeerFlowStatus | grep -A4 "ShortTermRSSI" > $TMP_PeerFlowStatusRSSI
sed '1,/ShortTermRSSI/d' $TMP_PeerFlowStatus > $TMP_PeerFlowStatusRSSI

ANT_LIST="0 1 2 3" # default case: 2.4/5 GHz 4x4 (WAV614/WAV624)
[ "$hw_revision" = "0x45" ] && [ "$WLAN_INTF" = "wlan0" ] && ANT_LIST="0 2" # case of 2.4 GHz 2x2 (WAV654)
[ "$hw_revision" = "0x45" ] && [ "$WLAN_INTF" = "wlan2" ] && ANT_LIST="1 3" # case of 5 GHz 2x2 (WAV654)
RSSI_SUM=0
RSSI_STR=""
ANT_NUM=0
for index in $ANT_LIST
do
	let RSSI_${index}=`grep "\[${index}\]" "$TMP_PeerFlowStatusRSSI" | awk '{print $1}'`
	let RSSI_CUR=RSSI_$index
	let RSSI_SUM=RSSI_SUM+RSSI_$index
	let ANT_NUM=ANT_NUM+1
	RSSI_STR="$RSSI_STR RSSI_$index=$RSSI_CUR"
done
let RSSI_AVG=$RSSI_SUM/$ANT_NUM
AIRTIME_USAGE=`grep "AirtimeUsage" "$TMP_PeerFlowStatus" | awk '{print $1}'`

# Parse PeerRatesInfo
mtdump $WLAN_INTF PeerRatesInfo $MAC_ADDR > $TMP_PeerRatesInfo 2>&1
#cat $TMP_PeerRatesInfo | grep -A13 "Data downlink rate info:" > $TMP_PeerRatesInfoDownlink
sed '1,/Data downlink rate info:/d' $TMP_PeerRatesInfo > $TMP_PeerRatesInfoDownlink

INFO_VALID=`grep "Rate info is valid" "$TMP_PeerRatesInfoDownlink" | awk '{print $1}'`
if [ "$INFO_VALID" = "True" ]; then
	PHY_MODE=`grep "Network (Phy) Mode" "$TMP_PeerRatesInfoDownlink" | awk '{print $1}'`
	BW=`grep "BW \[MHz\]" "$TMP_PeerRatesInfoDownlink" | awk '{print $1}'`
	SGI=`grep "SGI" "$TMP_PeerRatesInfoDownlink" | awk '{print $1}'`
	MCS=`grep "MCS index" "$TMP_PeerRatesInfoDownlink" | awk '{print $1}'`
	NSS=`grep "NSS" "$TMP_PeerRatesInfoDownlink" | awk '{print $1}'`
	TX_RATE=`grep "Last data downlink rate" "$TMP_PeerRatesInfoDownlink" | awk '{print $1}'`
	BF_MODE=`grep "Beamforming mode" "$TMP_PeerRatesInfoDownlink" | awk '{print $1}'`
	STBC_MODE=`grep "STBC mode" "$TMP_PeerRatesInfoDownlink" | awk '{print $1}'`
	TX_POWER=`grep "TX power for current rate" "$TMP_PeerRatesInfoDownlink" | awk '{print $1}'`
fi

# Print one compact line of selected statistics
# Statistics line format example:
# TX: CHAN=36 BW=80 MHz MODE=802.11ac SGI=0 NSS=1 MCS=6 TX_POWER=25.00 dBm TX_RATE=263.3 Mbps
# RX: [dBm:] RSSI_0=-59 RSSI_1=-54 RSSI_2=-51 RSSI_3=-50 AirtimeUsage=0% RX_RATE=6 Mbps

TX_INFO="TX:"
[ -n "$CHAN" ] && TX_INFO="$TX_INFO CHAN=$CHAN"
[ -n "$BW" ] && TX_INFO="$TX_INFO BW=$BW MHz"
[ -n "$PHY_MODE" ] && TX_INFO="$TX_INFO MODE=$PHY_MODE"
[ -n "$SGI" ] && TX_INFO="$TX_INFO SGI=$SGI"
[ -n "$NSS" ] && TX_INFO="$TX_INFO NSS=$NSS"
[ -n "$MCS" ] && TX_INFO="$TX_INFO MCS=$MCS"
#[ -n "$BF_MODE" ] && TX_INFO="$TX_INFO BF=$BF_MODE"
#[ -n "$STBC_MODE" ] && TX_INFO="$TX_INFO STBC=$STBC_MODE"
[ -n "$TX_POWER" ] && TX_INFO="$TX_INFO TX_POWER=$TX_POWER dBm"
[ -n "$TX_RATE" ] && TX_INFO="$TX_INFO TX_RATE=$TX_RATE Mbps"

RX_INFO="RX:"
[ -n "$RSSI_STR" ] && RX_INFO="$RX_INFO [dBm:]$RSSI_STR"
#[ -n "$RSSI_AVG" ] && RX_INFO="$RX_INFO RSSI_AVG=$RSSI_AVG dBm"
[ -n "$AIRTIME_USAGE" ] && RX_INFO="$RX_INFO AirtimeUsage=$AIRTIME_USAGE%%"
[ -n "$RX_RATE" ] && RX_INFO="$RX_INFO RX_RATE=$RX_RATE Mbps"

printf "$TX_INFO\n$RX_INFO\n\n"

IFS=$IFS_ORIG
