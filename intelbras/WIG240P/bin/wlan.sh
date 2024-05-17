#!/bin/sh
#
# script file to start WLAN
#
if [ $# -lt 1 ]; then echo "Usage: $0 wlan_interface";  exit 1 ; fi

GETMIB="flash get $1"
SETMIB="flash set $1"
SET_WLAN="iwpriv $1"
SET_WLAN_PARAM="$SET_WLAN set_mib"
SET_DNS1="flash set DNS1"
SET_OFDM="flash set HW_WLAN0_TX_POWER_OFDM" 
GET_DNS1="flash get DNS1"
IFCONFIG=ifconfig
START_WLAN_APP=wlanapp.sh
MAX_WDS_NUM=8

## Set of currently DNS.
# By - Araujo
if [ "$GET_DNS1" = "DNS1=168.95.1.1" ]; then
	$SET_DNS1 "0.0.0.0"
fi


## Disable WLAN MAC driver and shutdown interface first ##
$IFCONFIG $1 down

# shutdown all WDS interface
num=0
while [ $num -lt $MAX_WDS_NUM ]
do
	$IFCONFIG $1-wds$num down
	num=`expr $num + 1`
done

## kill wlan application daemon ##
$START_WLAN_APP kill $1

eval `$GETMIB HW_RF_TYPE`
eval `$GETMIB WLAN_DISABLED`
if [ "$WLAN_DISABLED" = '1' -o "$HW_RF_TYPE" = '0' ]; then
	exit 1
fi

## Set parameters to driver ##
eval `$GETMIB HW_REG_DOMAIN`
$SET_WLAN_PARAM regdomain=$HW_REG_DOMAIN

eval `$GETMIB OP_MODE`
eval `$GETMIB WLAN_MAC_ADDR`
if [ "$WLAN_MAC_ADDR" = "000000000000" ]; then
	eval `$GETMIB HW_WLAN_ADDR`
	WLAN_MAC_ADDR=$HW_WLAN_ADDR
fi
# ifconfig all wlan interface when not in WISP
# ifconfig wlan1 later interface when in WISP mode, the wlan0  will be setup in WAN interface
eval `$GETMIB WISP_WAN_ID`
if [ "$OP_MODE" != '2' ] || [ $1 != "wlan$WISP_WAN_ID" ] ;then
	$IFCONFIG $1 hw ether $WLAN_MAC_ADDR
fi

eval `$GETMIB HW_LED_TYPE`
$SET_WLAN_PARAM led_type=$HW_LED_TYPE

## set AP/client/WDS mode ##
eval `$GETMIB SSID`
$SET_WLAN_PARAM ssid="$SSID"

eval `$GETMIB MODE`
if [ "$MODE" = '1' ]; then
## client mode
	eval `$GETMIB NETWORK_TYPE`
	if  [ "$NETWORK_TYPE" = '0' ]; then
		$SET_WLAN_PARAM opmode=8
	else
		$SET_WLAN_PARAM opmode=32
		eval `$GETMIB DEFAULT_SSID`
		$SET_WLAN_PARAM defssid="$DEFAULT_SSID"
	fi
else
## AP mode
	$SET_WLAN_PARAM opmode=16
fi

if [ "$MODE" = '2' ]; then
## WDS only
	$SET_WLAN_PARAM wds_pure=1
else
	$SET_WLAN_PARAM wds_pure=0
fi

# set RF parameters
$SET_WLAN_PARAM RFChipID=$HW_RF_TYPE

eval `$GETMIB HW_ANT_DIVERSITY`
$SET_WLAN_PARAM Diversity=$HW_ANT_DIVERSITY

eval `$GETMIB HW_TX_ANT`
$SET_WLAN_PARAM DefaultAnt=$HW_TX_ANT

eval `$GETMIB HW_INIT_GAIN`
$SET_WLAN_PARAM initialGain=$HW_INIT_GAIN
#eval `$GETMIB HW_CCA_MODE`
#$SET_WLAN_PARAM CSMethod=$HW_CCA_MODE

eval `$GETMIB HW_TX_POWER_CCK`

eval `$GETMIB HW_TX_POWER_OFDM`
####eval `$GETMIB HW_TX_POWER_CCK`

# Changed By Araujo.
#$SET_WLAN_PARAM TxPowerCCK=$HW_TX_POWER_CCK
#$SET_WLAN_PARAM TxPowerOFDM=$HW_TX_POWER_OFDM
$SET_OFDM 20
# Show the CCK Power in DBM - By Araujo
if [ "$HW_TX_POWER_CCK" = "1b1b1b1b1b1b1b1b1b1b1b1b1b1b" ];then
	dbm=26
elif [ "$HW_TX_POWER_CCK" = "1212121212121212121212121212" ];then
	dbm=25
elif [ "$HW_TX_POWER_CCK" = "1010101010101010101010101010" ];then
	dbm=24
elif [ "$HW_TX_POWER_CCK" = "0f0f0f0f0f0f0f0f0f0f0f0f0f0f" ];then
	dbm=23
elif [ "$HW_TX_POWER_CCK" = "0c0c0c0c0c0c0c0c0c0c0c0c0c0c" ];then
	dbm=22
elif [ "$HW_TX_POWER_CCK" = "0a0a0a0a0a0a0a0a0a0a0a0a0a0a" ];then
	dbm=20
elif [ "$HW_TX_POWER_CCK" = "0808080808080808080808080808" ];then
	dbm=18
elif [ "$HW_TX_POWER_CCK" = "0707070707070707070707070707" ];then
	dbm=17
elif [ "$HW_TX_POWER_CCK" = "0505050505050505050505050505" ];then
	dbm=15
elif [ "$HW_TX_POWER_CCK" = "0202020202020202020202020202" ];then
	dbm=12 
#else
#	dbm=0
fi

echo "===> Configurando o Tx Power(802.11b) em $dbm dbm."
echo "===> Configurando o Tx Power(802.11g) em 20 dbm."

if [ "$HW_TX_POWER_CCK" = "26" ];then
	echo "1"
	$SET_WLAN_PARAM TxPowerCCK=1b1b1b1b1b1b1b1b1b1b1b1b1b1b
elif [ "$HW_TX_POWER_CCK" = "25" ];then
	echo "2"
	$SET_WLAN_PARAM TxPowerCCK=1212121212121212121212121212
elif [ "$HW_TX_POWER_CCK" = "24" ]; then
	echo "3"
	$SET_WLAN_PARAM TxPowerCCK=1010101010101010101010101010
elif [ "$HW_TX_POWER_CCK" = "23" ];then
	echo "4"
	$SET_WLAN_PARAM TxPowerCCK=0f0f0f0f0f0f0f0f0f0f0f0f0f0f
elif [ "$HW_TX_POWER_CCK" = "22" ];then
	echo "5"
	$SET_WLAN_PARAM TxPowerCCK=0c0c0c0c0c0c0c0c0c0c0c0c0c0c
elif [ "$HW_TX_POWER_CCK" = "20" ];then
	echo "6"
	$SET_WLAN_PARAM TxPowerCCK=0a0a0a0a0a0a0a0a0a0a0a0a0a0a
elif [ "$HW_TX_POWER_CCK" = "18" ];then
	echo "7"
	$SET_WLAN_PARAM TxPowerCCK=0808080808080808080808080808
elif [ "$HW_TX_POWER_CCK" = "17" ];then
	echo "8"
	$SET_WLAN_PARAM TxPowerCCK=0707070707070707070707070707
elif [ "$HW_TX_POWER_CCK" = "15" ];then
	echo "9"
	$SET_WLAN_PARAM TxPowerCCK=0505050505050505050505050505
elif [ "$HW_TX_POWER_CCK" = "12" ];then
	echo "10"
	$SET_WLAN_PARAM TxPowerCCK=0202020202020202020202020202
else
	$SET_WLAN_PARAM TxPowerCCK=$HW_TX_POWER_CCK
fi

eval `$GETMIB BEACON_INTERVAL`
$SET_WLAN_PARAM bcnint=$BEACON_INTERVAL

eval `$GETMIB CHANNEL`
$SET_WLAN_PARAM channel=$CHANNEL

eval `$GETMIB BASIC_RATES`
$SET_WLAN_PARAM basicrates=$BASIC_RATES

eval `$GETMIB SUPPORTED_RATES`
$SET_WLAN_PARAM oprates=$SUPPORTED_RATES

eval `$GETMIB RATE_ADAPTIVE_ENABLED`
if [ "$RATE_ADAPTIVE_ENABLED" = '0' ]; then
	$SET_WLAN_PARAM autorate=0
	eval `$GETMIB FIX_RATE`
	$SET_WLAN_PARAM fixrate=$FIX_RATE
else
	$SET_WLAN_PARAM autorate=1
fi

eval `$GETMIB RTS_THRESHOLD`
$SET_WLAN_PARAM rtsthres=$RTS_THRESHOLD

eval `$GETMIB FRAG_THRESHOLD`
$SET_WLAN_PARAM fragthres=$FRAG_THRESHOLD

eval `$GETMIB INACTIVITY_TIME`
$SET_WLAN_PARAM expired_time=$INACTIVITY_TIME

eval `$GETMIB PREAMBLE_TYPE`
$SET_WLAN_PARAM preamble=$PREAMBLE_TYPE

eval `$GETMIB HIDDEN_SSID`
$SET_WLAN_PARAM hiddenAP=$HIDDEN_SSID

eval `$GETMIB DTIM_PERIOD`
$SET_WLAN_PARAM dtimperiod=$DTIM_PERIOD

$SET_WLAN_PARAM longretry=6
$SET_WLAN_PARAM shortretry=6

$SET_WLAN_PARAM aclnum=0
eval `$GETMIB MACAC_ENABLED`
$SET_WLAN_PARAM aclmode=$MACAC_ENABLED
if [ "$MACAC_ENABLED" != '0' ]; then
	eval `$GETMIB MACAC_NUM`
	if [ "$MACAC_NUM" != 0 ]; then
		num=1
		while [ $num -le $MACAC_NUM ]
		do
			AC_TBL=`$GETMIB MACAC_ADDR | grep MACAC_ADDR$num`
			addr_comment=`echo $AC_TBL | cut -f2 -d=`
			addr=`echo $addr_comment | cut -f1 -d,`
			$SET_WLAN_PARAM acladdr=$addr
			num=`expr $num + 1`
		done
	fi
fi

eval `$GETMIB AUTH_TYPE`
eval `$GETMIB ENCRYPT`
if [ "$AUTH_TYPE" = '1' ] && [ "$ENCRYPT" != '1' ]; then
	# shared-key and not WEP enabled, force to open-system
	AUTH_TYPE=0
fi
$SET_WLAN_PARAM authtype=$AUTH_TYPE

if [ "$ENCRYPT" = '0' ]; then
	$SET_WLAN_PARAM encmode=0
elif [ "$ENCRYPT" = '1' ]; then
	### WEP mode ##
	eval `$GETMIB WEP`
	if [ "$WEP" = '1' ]; then
		eval `$GETMIB WEP64_KEY1`
		eval `$GETMIB WEP64_KEY2`
		eval `$GETMIB WEP64_KEY3`
		eval `$GETMIB WEP64_KEY4`
		eval `$GETMIB WEP_DEFAULT_KEY`
		$SET_WLAN_PARAM encmode=1
		$SET_WLAN_PARAM wepkey1=$WEP64_KEY1
		$SET_WLAN_PARAM wepkey2=$WEP64_KEY2
		$SET_WLAN_PARAM wepkey3=$WEP64_KEY3
		$SET_WLAN_PARAM wepkey4=$WEP64_KEY4
		$SET_WLAN_PARAM wepdkeyid=$WEP_DEFAULT_KEY
	else
		eval `$GETMIB WEP128_KEY1`
		eval `$GETMIB WEP128_KEY2`
		eval `$GETMIB WEP128_KEY3`
		eval `$GETMIB WEP128_KEY4`
		eval `$GETMIB WEP_DEFAULT_KEY`
		$SET_WLAN_PARAM encmode=5
		$SET_WLAN_PARAM wepkey1=$WEP128_KEY1
		$SET_WLAN_PARAM wepkey2=$WEP128_KEY2
		$SET_WLAN_PARAM wepkey3=$WEP128_KEY3
		$SET_WLAN_PARAM wepkey4=$WEP128_KEY4
		$SET_WLAN_PARAM wepdkeyid=$WEP_DEFAULT_KEY
	fi
else
        ## WPA mode ##
	$SET_WLAN_PARAM encmode=2
fi

## Set 802.1x flag ##
_ENABLE_1X=0
if [ $ENCRYPT -lt 2 ]; then
	eval `$GETMIB ENABLE_1X`
	eval `$GETMIB MAC_AUTH_ENABLED`
	if [ "$ENABLE_1X" != 0 ] || [ "$MAC_AUTH_ENABLED" != 0 ]; then
		_ENABLE_1X=1
	fi
else
	_ENABLE_1X=1
fi
$SET_WLAN_PARAM 802_1x=$_ENABLE_1X

## set WDS ##
eval `$GETMIB WDS_ENABLED`
eval `$GETMIB WDS_NUM`
$SET_WLAN_PARAM wds_num=0
if [ "$MODE" = 2 -o "$MODE" = 3 ] && [ "$WDS_ENABLED" != 0 ] && [ "$WDS_NUM" != 0 ]; then
	num=1
	while [ $num -le $WDS_NUM ]
	do
		WDS_TBL=`$GETMIB WDS | grep WDS$num`
		addr_comment=`echo $WDS_TBL | cut -f2 -d=`
		addr=`echo $addr_comment | cut -f1 -d,`
		$SET_WLAN_PARAM wds_add=$addr
		num=`expr $num - 1`
		$IFCONFIG $1-wds$num hw ether $WLAN_MAC_ADDR
		num=`expr $num + 2`
	done
	$SET_WLAN_PARAM wds_enable=$WDS_ENABLED	
else
	$SET_WLAN_PARAM wds_enable=0
fi

if [ "$MODE" = 2 -o "$MODE" = 3 ] && [ "$WDS_ENABLED" != '0' ]; then
	eval `$GETMIB WDS_ENCRYPT`
	if [ "$WDS_ENCRYPT" = '0' ]; then
		$SET_WLAN_PARAM wds_encrypt=0
	elif [ "$WDS_ENCRYPT" = '1' ]; then
		eval `$GETMIB WDS_WEP_KEY`
		$SET_WLAN_PARAM wds_encrypt=1
		$SET_WLAN_PARAM wds_wepkey=$WDS_WEP_KEY
	elif [ "$WDS_ENCRYPT" = '2' ]; then
		eval `$GETMIB WDS_WEP_KEY`
		$SET_WLAN_PARAM wds_encrypt=5
		$SET_WLAN_PARAM wds_wepkey=$WDS_WEP_KEY	
	elif [ "$WDS_ENCRYPT" = '3' ]; then		
		$SET_WLAN_PARAM wds_encrypt=2			
	else	
		$SET_WLAN_PARAM wds_encrypt=4
	fi
fi

# enable/disable the notification for IAPP
eval `$GETMIB IAPP_DISABLED`
if [ "$IAPP_DISABLED" = 0 ]; then
	$SET_WLAN_PARAM iapp_enable=1
else
	$SET_WLAN_PARAM iapp_enable=0
fi

#set band
eval `$GETMIB BAND`
eval `$GETMIB WIFI_SPECIFIC`
if [ "$MODE" != '1' ] && [ "$WIFI_SPECIFIC" = 1 ] &&  [ "$BAND" = '2' ] ; then
	BAND=3
fi
$SET_WLAN_PARAM band=$BAND

#set nat2.5 disable when client and mac clone is set
eval `$GETMIB MACCLONE_ENABLED`
if [ "$MACCLONE_ENABLED" = '1' -a "$MODE" = '1' ]; then
	$SET_WLAN_PARAM nat25_disable=1
	$SET_WLAN_PARAM macclone_enable=1
else
	$SET_WLAN_PARAM nat25_disable=0
	$SET_WLAN_PARAM macclone_enable=0
fi
# set nat2.5 disable and macclone disable when wireless isp mode
if [ "$OP_MODE" = '2' ] ;then
	$SET_WLAN_PARAM nat25_disable=1
	$SET_WLAN_PARAM macclone_enable=0
fi

# set 11g protection mode
eval `$GETMIB PROTECTION_DISABLED`
if  [ "$PROTECTION_DISABLED" = '1' ] ;then
	$SET_WLAN_PARAM disable_protection=1
else
	$SET_WLAN_PARAM disable_protection=0
fi

# set block relay
eval `$GETMIB BLOCK_RELAY`
$SET_WLAN_PARAM block_relay=$BLOCK_RELAY

# set WiFi specific mode
eval `$GETMIB WIFI_SPECIFIC`
$SET_WLAN_PARAM wifi_specific=$WIFI_SPECIFIC

# set turbo mode
eval `$GETMIB TURBO_MODE`
if [ "$RATE_ADAPTIVE_ENABLED" != 0 ]; then
	$SET_WLAN_PARAM turbo_mode=$TURBO_MODE
else
	$SET_WLAN_PARAM turbo_mode=2
fi

# set repeater interface
if [ $1 = 'wlan0' ]; then
	eval `$GETMIB REPEATER_ENABLED1`
	ifconfig wlan0-vxd down
	if  [ "$REPEATER_ENABLED1" != 0 ] ;then
		eval `flash get REPEATER_SSID1`		
		iwpriv wlan0-vxd set_mib ssid=$REPEATER_SSID1	
		$IFCONFIG wlan0-vxd hw ether $WLAN_MAC_ADDR
		VXD_1X_ENABLED=0
		if [ "$ENCRYPT" = '0' ]; then
			iwpriv wlan0-vxd set_mib encmode=0		
		elif [ "$ENCRYPT" = '1' ]; then		
			if [ "$_ENABLE_1X" = 0 ]; then		
				if [ "$WEP" = '1' ]; then		
					iwpriv wlan0-vxd set_mib encmode=1
				else
					iwpriv wlan0-vxd set_mib encmode=5			
				fi				
			else
				iwpriv wlan0-vxd set_mib encmode=0
			fi				
		else
			eval `flash get WPA_AUTH`	
			if [ "$WPA_AUTH" = '2' ]; then		
				iwpriv wlan0-vxd set_mib encmode=2
				VXD_1X_ENABLED=1
			else
				iwpriv wlan0-vxd set_mib encmode=0
			fi
		fi		
		iwpriv wlan0-vxd set_mib 802_1x=$VXD_1X_ENABLED			
	fi
fi

if [ "$1" = 'wlan1' ]; then
	eval `$GETMIB REPEATER_ENABLED2`
	ifconfig wlan1-vxd down
	if  [ "$REPEATER_ENABLED2" != 0 ] ;then
		eval `flash get REPEATER_SSID2`		
		iwpriv wlan1-vxd set_mib ssid=$REPEATER_SSID2	
		$IFCONFIG wlan1-vxd hw ether $WLAN_MAC_ADDR	
		VXD_1X_ENABLED=0
		if [ "$ENCRYPT" = '0' ]; then
			iwpriv wlan1-vxd set_mib encmode=0		
		elif [ "$ENCRYPT" = '1' ]; then		
			if [ "$_ENABLE_1X" = 0 ]; then		
				if [ "$WEP" = '1' ]; then		
					iwpriv wlan1-vxd set_mib encmode=1
				else
					iwpriv wlan1-vxd set_mib encmode=5			
				fi				
			else
				iwpriv wlan1-vxd set_mib encmode=0
			fi				
		else
			eval `flash get wlan1 WPA_AUTH`	
			if [ "$WPA_AUTH" = '2' ]; then		
				iwpriv wlan1-vxd set_mib encmode=2		
				VXD_1X_ENABLED=1
			else
				iwpriv wlan1-vxd set_mib encmode=0
			fi
		fi				
		iwpriv wlan0-vxd set_mib 802_1x=$VXD_1X_ENABLED				
	fi
fi

#
# following settings is used when driver WPA module is included
#
#eval `$GETMIB WPA_AUTH`
#if [ $ENCRYPT -ge 2 ] && [ $WPA_AUTH = 2 ]; then
#	if [ $ENCRYPT = 2 ]; then
#		ENABLE=1	
#	elif [ $ENCRYPT = 4 ]; then
#		ENABLE=2	
#	elif [ $ENCRYPT = 6 ]; then		
#		ENABLE=3		
#	else
#		echo "invalid ENCRYPT value!"; exit
#	fi	
#	$SET_WLAN_PARAM psk_enable=$ENABLE
#	
#	if [ $ENCRYPT = 2 ] || [ $ENCRYPT = 6 ]; then
#		eval `$GETMIB WPA_CIPHER_SUITE`
#		if [ $WPA_CIPHER_SUITE = 1 ]; then
#			CIPHER=2
#		elif [ $WPA_CIPHER_SUITE = 2 ]; then
#			CIPHER=8
#		elif [ $WPA_CIPHER_SUITE = 3 ]; then		
#			CIPHER=10
#		else
#			echo "invalid WPA_CIPHER_SUITE value!"; exit 1		
#		fi	
#	fi
#	$SET_WLAN_PARAM wpa_cipher=$CIPHER
#	
#	if [ $ENCRYPT = 4 ] || [ $ENCRYPT = 6 ]; then
#		eval `$GETMIB WPA2_CIPHER_SUITE`
#		if [ $WPA2_CIPHER_SUITE = 1 ]; then
#			CIPHER=2
#		elif [ $WPA2_CIPHER_SUITE = 2 ]; then
#			CIPHER=8
#		elif [ $WPA2_CIPHER_SUITE = 3 ]; then		
#			CIPHER=10
#		else
#			echo "invalid WPA2_CIPHER_SUITE value!"; exit 1		
#		fi	
#	fi
#	$SET_WLAN_PARAM wpa2_cipher=$CIPHER	
#	
#	eval `$GETMIB WPA_PSK`
#	$SET_WLAN_PARAM passphrase=$WPA_PSK		
#else
#	$SET_WLAN_PARAM psk_enable=0
#fi
$SET_WLAN_PARAM show_hidden_bss=1
