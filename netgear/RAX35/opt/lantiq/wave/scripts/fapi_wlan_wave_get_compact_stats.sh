#!/bin/sh
# Print compact statistics per radio or vap

IFS_ORIG=$IFS
TMP_dir=/tmp
#TMP_dir=.
TMP_iwconfig=$TMP_dir/iwConfig
TMP_StaList=$TMP_dir/StaList
TMP_ChannelInfo=$TMP_dir/ChannelInfo
TMP_PeerFlowStatus=$TMP_dir/PeerFlowStatus
TMP_PeerFlowStatusRSSI=$TMP_dir/PeerFlowStatusRSSI
TMP_PeerRatesInfo=$TMP_dir/PeerRatesInfo
TMP_PeerRatesInfoDownlink=$TMP_dir/PeerRatesInfoDownlink
EEPROMInfo=/opt/lantiq/wave/confs/eeprom_info

usage()
{
	printf "\nPrint compact statistics per radio or vap\n"
	printf "\tUsage: $0 <wlan_intf | wlan_vap> <mac_of_sta_device | all>\n"
	printf "\tE.g.:  $0 wlan0 A0:39:F7:02:F4:7D\n"
	printf "\t       $0 wlan2.0 all\n\n"
}

display_for_single_sta()
{
	local MAC_ADDR=$1
	local WLAN_VAP=$2
	local WLAN_INTF=$3

	# Parse PeerFlowStatus
	dwpal_cli $WLAN_VAP PeerFlowStatus $MAC_ADDR > $TMP_PeerFlowStatus 2>&1
	if [ `grep -c "Peer packets flow statistics:" $TMP_PeerFlowStatus` != "1" ]; then
		printf "Error: [ $MAC_ADDR ] isn't connected to $WLAN_VAP\n\n"
		return
	fi
	RX_RATE=`grep "LastDataUplinkRate" "$TMP_PeerFlowStatus" | awk '{print $1}'`
	let RX_RATE=$RX_RATE/1000

	#cat $TMP_PeerFlowStatus | grep -A4 "ShortTermRSSI" > $TMP_PeerFlowStatusRSSI
	sed '1,/ShortTermRSSI/d' $TMP_PeerFlowStatus > $TMP_PeerFlowStatusRSSI # remove all lines before pattern "ShortTermRSSI"
	sed -i '/: SNR/,$d' $TMP_PeerFlowStatusRSSI # remove all lines after pattern ": SNR"

	ANT_LIST="0 1 2 3" # default case: 2.4/5 GHz 4x4 (WAV614/WAV624)
	[ "$hw_revision" = "0x45" ] && [ "$WLAN_INTF" = "wlan0" ] && ANT_LIST="0 2" # case of 2.4 GHz 2x2 (WAV654)
	[ "$hw_revision" = "0x45" ] && [ "$WLAN_INTF" = "wlan2" ] && ANT_LIST="1 3" # case of 5 GHz 2x2 (WAV654)
	RSSI_SUM=0
	RSSI_STR=""
	ANT_NUM=0
	IFS=' '
	for index in $ANT_LIST
	do
		let RSSI_${index}=`grep "\[${index}\]" "$TMP_PeerFlowStatusRSSI" | awk '{print $1}'`
		let RSSI_CUR=RSSI_$index
		let RSSI_SUM=RSSI_SUM+RSSI_$index
		let ANT_NUM=ANT_NUM+1
		RSSI_STR="$RSSI_STR RSSI_$index=$RSSI_CUR dBm"
	done
	let RSSI_AVG=$RSSI_SUM/$ANT_NUM
	AIRTIME_USAGE=`grep "AirtimeUsage" "$TMP_PeerFlowStatus" | awk '{print $1}'`
	STA_ID=`grep "StationID" "$TMP_PeerFlowStatus" | awk '{print $1}'`
	let AID=STA_ID+1

	# Parse PeerRatesInfo
	dwpal_cli $WLAN_VAP PeerRatesInfo $MAC_ADDR > $TMP_PeerRatesInfo 2>&1
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

	HEADER="STA:"
	[ -n "$MAC_ADDR" ] && HEADER="$HEADER MAC=$MAC_ADDR"
	[ -n "$AID" ] && HEADER="$HEADER AID=$AID"
	
	TX_INFO="TX: "
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
	[ -n "$RSSI_STR" ] && RX_INFO="$RX_INFO $RSSI_STR"
	#[ -n "$RSSI_AVG" ] && RX_INFO="$RX_INFO RSSI_AVG=$RSSI_AVG dBm"
	[ -n "$AIRTIME_USAGE" ] && RX_INFO="$RX_INFO AirtimeUsage=$AIRTIME_USAGE%%"
	[ -n "$RX_RATE" ] && RX_INFO="$RX_INFO RX_RATE=$RX_RATE Mbps"

	printf "$HEADER\n$TX_INFO\n$RX_INFO\n\n"
}

if [ "$#" -ne 2 ] ||
	[ "$1" = "--help" ] ||
	[ "$1" = "-h" ]; then
	usage
	exit
fi

WLAN_INTF=${1%.*}
WLAN_VAP_NUM=${1#*.}
WLAN_VAP=$WLAN_INTF
MAC_ADDR=$2

if [ "$WLAN_INTF" = "$1" ]; then
	# Master VAP case
	WLAN_VAP_NUM=
else
	# Secondary VAP case
	WLAN_VAP=$WLAN_INTF.$WLAN_VAP_NUM
fi

if [ "$WLAN_INTF" != "wlan0" ] &&
	[ "$WLAN_INTF" != "wlan2" ]; then
	printf "Error: illegal param1 [$1]\n\n"
	IFS=$IFS_ORIG
	exit
fi

iwconfig $WLAN_VAP > $TMP_iwconfig 2>&1
if [ `grep -c "No such device" $TMP_iwconfig` != "0" ]; then
	printf "Error: device $WLAN_VAP not exist\n\n"
	IFS=$IFS_ORIG
	exit
fi

# Get hw revision in order to consider the nof antennas
#hw_revision="X" # set default value
hw_revision=`cat $EEPROMInfo | grep "(E)" | grep -m 1 "HW revision" |  awk '{print $4}'`
[ "$hw_revision" != "0x45" ] && [ "$WLAN_INTF" = "wlan0" ] && hw_revision=`cat $EEPROMInfo | grep "(A)" | grep -m 1 "HW revision" |  awk '{print $4}'`
[ "$hw_revision" != "0x45" ] && [ "$WLAN_INTF" = "wlan2" ] && hw_revision=`cat $EEPROMInfo | grep "(B)" | grep -m 1 "HW revision" | awk '{print $4}'`
#hw_revision=0x41
#hw_revision=0x42
#hw_revision=0x45

# Parse channel info
cat /proc/net/mtlk/$WLAN_INTF/channel > $TMP_ChannelInfo
CHAN=`grep "primary_channel:" $TMP_ChannelInfo | awk '{print $2}'`

if [ "$MAC_ADDR" = "all" ]; then
	cat /proc/net/mtlk/$WLAN_VAP/Debug/sta_list > $TMP_StaList
	sed -i '/Driver Statistics/d' $TMP_StaList # remove lines with specific pattern
	sed -i '/-----/d' $TMP_StaList # remove lines with specific pattern
	sed -i '/MAC/d' $TMP_StaList # remove lines with specific pattern
	sed -i '/^$/d' $TMP_StaList # remove empty lines
	MAC_ADDR_LIST=`cat $TMP_StaList| awk '{print $1}' | tr  "\n" ","`
	MAC_ADDR_LIST="${MAC_ADDR_LIST%%,}" # remove trailing ','
	printf "All Peers statistics:\n\n"
else
	MAC_ADDR_LIST=$MAC_ADDR
	printf "\n"
fi

if [ "$MAC_ADDR_LIST" != "," ]; then
	IFS=,
	for addr in $MAC_ADDR_LIST
	do
		display_for_single_sta $addr $WLAN_VAP $WLAN_INTF
	done
else
	printf "Error: illegal MAC_ADDR_LIST [$MAC_ADDR_LIST]\n\n"
fi

IFS=$IFS_ORIG
