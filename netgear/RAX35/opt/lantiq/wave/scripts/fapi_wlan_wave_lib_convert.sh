#!/bin/sh
# Library script to convert from DB values to hostapd/driver values.

[ ! "$LIB_COMMON_SOURCED" ] && . /tmp/fapi_wlan_wave_lib_common.sh

# Get DB network mode and frequency band and set hw_mode.
# If network mode is 11b, set hw_mode=b.
# If not 11b, set hw_mode=g for 2.4Ghz and hw_mode=a for 5Ghz.
convert_hw_mode()
{
	# Define local parameters
	local freq_band network_mode hw_mode

	freq_band=$1
	network_mode=$2
	
	# Check if mode is b only
	network_mode=${network_mode//,/}
	if [ "$network_mode" = "b" ]
	then
		hw_mode=b
	elif [ "$freq_band" = "2.4GHz" ]
	then
		hw_mode=g
	else
		hw_mode=a
	fi
	echo $hw_mode
}

# Preamble values in DB are short, long
# Preamble values in hostapd are 1=short, 0=long
convert_preamble()
{
	# Define local parameters
	local interface_index preamble

	interface_index=$1
	preamble=`db2fapi_convert regular PreambleType $interface_index`
	case "$preamble" in
		"short")
			preamble=1
			;;
		"long")
			preamble=0
			;;
	esac

	echo $preamble
}

# Read DB power level value (in percentage) and convert to driver value (in db).
convert_power_level()
{
	# Define local parameters
	local interface_index power_level

	interface_index=$1

	power_level=`db2fapi_convert regular TransmitPower $interface_index`
	case "$power_level" in
		"12")
			power_level=9
			;;
		"25")
			power_level=6
			;;
		"50")
			power_level=3
			;;
		"100")
			power_level=0
			;;
	esac

	echo $power_level
}

convert_protection_mode()
{
	# Define local parameters
	local interface_index protection_mode

	interface_index=$1

	protection_mode=`db2fapi_convert regular Dot11nProtection $interface_index`
	case "$protection_mode" in
		"Disabled")
			protection_mode=0
			;;
		"Enabled")
			protection_mode=1
			;;
		"RTS/CTS")
			protection_mode=2
			;;
		"CTS2Self")
			protection_mode=3
			;;
	esac
	echo "$protection_mode"
}

convert_extension_channel()
{
	# Define local parameters
	local interface_index channel secondary_channel

	interface_index=$1
	channel=$2

	secondary_channel=`db2fapi_convert regular ExtensionChannel $interface_index`

	# When secondary_channel is Auto, select secondary above, unless value must be secondary below
	if [ "$secondary_channel" = "Auto" ]
	then
		secondary_channel="AboveControlChannel"
		case "$channel" in
			"8"|"9"|"10"|"11"|"12"|"13"|"40"|"48"|"56"|"64"|"104"|"112"|"120"|"128"|"136"|"144"|"153"|"161")
				secondary_channel="BelowControlChannel"
				;;
		esac
	fi

	echo "$secondary_channel"
}

# Read DB values for ht capabilities and create string for hostapd.
# Flags set in the ht_capab are:
# [HT40+]/[HT40-]
# [SMPS-STATIC]
# [SHORT-GI-20]
# [SHORT-GI-40]
# [TX-STBC]
# [RX-STBC1]
# [40-INTOLERANT] currently not set
# [LDPC]
# [MAX-AMSDU-]
convert_ht_capab()
{
	# Define local parameters
	local interface_index interface_name channel_bonding secondary_channel auto_channel auto_coc\
	phy_name driver_ldpc driver_tx_stbc driver_rx_stbc driver_stbc \
	channel_width  short_gi stbc ldpc max_amsdu intolerant_40 smps_static ht_capab_value

	interface_index=$1
	interface_name=$2
	channel_bonding=$3
	secondary_channel=$4
	auto_channel=$5
	auto_coc=$6

	# Read driver capabilities values
	phy_name=`find_phy_from_interface_name $interface_name`

	# LDPC
	driver_ldpc=""
	driver_ldpc=`iw phy $phy_name info | grep LDPC`
	[ -n "$driver_ldpc" ] && driver_ldpc="[LDPC]"
	
	# STBC
	driver_tx_stbc=""
	driver_rx_stbc=""
	driver_no_tx_stbc=`iw phy $phy_name info | grep "No TX STBC"`
	driver_no_rx_stbc=`iw phy $phy_name info | grep "No RX STBC"`
	[ -z "$driver_no_tx_stbc" ] && driver_tx_stbc="[TX-STBC]"
	[ -z "$driver_no_rx_stbc" ] && driver_rx_stbc="[RX-STBC1]"
	driver_stbc="${driver_tx_stbc}${driver_rx_stbc}"
	
	# Read DB values for channel bonding and secondary channel and set:
	# [HT40-] = both 20 MHz and 40 MHz with secondary channel below the primary channel.
	# [HT40+] = both 20 MHz and 40 MHz with secondary channel above the primary channel.
	# When no value is set, 20 MHz is configured.
	# If HT40 needs to be set and ACS is enabled, only [HT40+] can be set.
	channel_width=""
	if [ "$channel_bonding" != "20MHz" ]
	then
		if [ "$auto_channel" = "1" ]
		then
			channel_width="[HT40+]"
		else
			case "$secondary_channel" in
			"AboveControlChannel")
				channel_width="[HT40+]"
			;;
			"BelowControlChannel")
				channel_width="[HT40-]"
			;;
			esac
		fi
	fi

	# Read parameters from DB
	# For short-GI parameters, in DB: 400nsec=short (1), 800nsec=long (0)
	# The value in DB sets short-GI for both 20Mhz and 40Mhz.
	short_gi=`db2fapi_convert regular GuardInterval $interface_index`
	if [ "$short_gi" = "400nsec" ]
	then
		short_gi=1
	elif [ "$short_gi" = "800nsec" ]
	then
		short_gi=0
	fi

	stbc=`db2fapi_convert boolean HtSTBCenabled $interface_index`
	ldpc=`db2fapi_convert boolean HtLDPCenabled $interface_index`
	max_amsdu=`db2fapi_convert regular HtAMSDUlen $interface_index`
	#intolerant_40=`db2fapi_convert boolean Coex40IntoleranceEnabled $interface_index`

	# SMPS depends on the auto coc
	smps_static="$auto_coc"
	
	# Build the value string
	ht_capab_value="$channel_width"
	if [ "$smps_static" = "1" ]
	then
		ht_capab_value="${ht_capab_value}[SMPS-STATIC]"
	fi
	if [ "$short_gi" = "1" ]
	then
		ht_capab_value="${ht_capab_value}[SHORT-GI-20]"
		[ "$channel_bonding" != "20MHz" ] && ht_capab_value="${ht_capab_value}[SHORT-GI-40]"
	fi
	if [ "$stbc" -gt "0" ]
	then
		ht_capab_value="${ht_capab_value}${driver_stbc}"
	fi
	#if [ "$intolerant_40" ]
	#then
	#	ht_capab_value="${ht_capab_value}[40-INTOLERANT]"
	#fi
	if [ "$ldpc" = "1" ]
	then
		ht_capab_value="${ht_capab_value}${driver_ldpc}"
	fi
	ht_capab_value="${ht_capab_value}[MAX-AMSDU-${max_amsdu}]"

	echo "$ht_capab_value"
}

# Get the channel number, channel width and secondary channel (if needed) and find the center channel for VHT.
# For 20MHz, return the channel.
# For 40MHz, check the secondary channel and return channel+2 for secondary upper or channel-2 for secondary lower.
# For 80MHz, return the center channel according to the list:
# 36,40,44,48 - return 42
# 52,56,60,64 - return 58
# 100,104,108,112 - return 106
# 116,120,124,128 - return 122
# 132,136,140,144 - return 138
# 149,153,157,161 - return 155
# For 160MHz (or AX auto), return the center channel according to the list:
# 36,40,44,48,52,56,60,64 - return 50
# 100,104,108,112,116,120,124,128 - return 114
convert_center_freq()
{
	# Define local parameters
	local channel channel_width secondary_channel center_freq auto_channel

	channel=$1
	channel_width=$2
	secondary_channel=$3
	auto_channel=$4
	chip_id=$5

	if [ "$auto_channel" = "1" ]
	then
		center_freq=0
	else
		[ "$chip_id" = "$GEN5B_CHIP_ID" ] && [ "$channel_width" = "Auto" ] && channel_width="80MHz" 
		case "$channel_width" in
			"20MHz")
				center_freq="$channel"
			;;
			"40MHz")
				[ "$secondary_channel" = "AboveControlChannel" ] && center_freq=$((channel+2))
				[ "$secondary_channel" = "BelowControlChannel" ] && center_freq=$((channel-2))
			;;
			"80MHz")
				case "$channel" in
					36|40|44|48) center_freq=42 ;;
					52|56|60|64) center_freq=58 ;;
					100|104|108|112) center_freq=106 ;;
					116|120|124|128) center_freq=122 ;;
					132|136|140|144) center_freq=138 ;;
					149|153|157|161) center_freq=155 ;;
				esac
			;;
			"160MHz"|"Auto")
				case "$channel" in
					36|40|44|48|52|56|60|64) center_freq=50 ;;
					100|104|108|112|116|120|124|128) center_freq=114 ;;
				esac
			;;
		esac
	fi
	echo "$center_freq"
}

# Read from driver if beamforming is supported and from DB if explicit beamforming is enabled.
# If so, set the ht_tx_bf_capab flags (flags are hardcoded and cannot be set from web/cli).
convert_ht_tx_bf_capab()
{
	# Define local parameters
	local interface_index interface_name num_antennas\
	ht_tx_bf_capab_value driver_bf_support explicit_bf comps_bf_ant \
	phy_name num_tx_antennas

	interface_index=$1
	interface_name=$2
	num_antennas=$3

	ht_tx_bf_capab_value=""
	driver_bf_support=`iw $interface_name iwlwav gBfExplicitCap`
	driver_bf_support=`echo ${driver_bf_support##*:}`

	explicit_bf=`db2fapi_convert boolean WaveExplicitBeamforming $interface_index`
	if [ "$driver_bf_support" = "1" ] && [ "$explicit_bf" = "1" ]
	then
		# Read driver capabilities values
		phy_name=`find_phy_from_interface_name $interface_name`
		# Number of TX antennas
		num_tx_antennas=`iw phy $phy_name info | grep "Available Antennas"`
		num_tx_antennas=${num_tx_antennas##*TX 0x}
		num_tx_antennas=${num_tx_antennas:0:1}
		num_tx_antennas=`convert_num_ants $num_tx_antennas`
		comps_bf_ant=`db2fapi_convert regular NumOfAntennas $interface_index`
		# Compare between number of TX antennas and value set in DB and set the lowest.
		[ "$num_tx_antennas" -lt "$comps_bf_ant" ] && comps_bf_ant=$num_tx_antennas
		# read number of antennas
		comps_bf_ant=$((num_antennas-1))
		ht_tx_bf_capab_value="[IMPL-TXBF-RX][EXPL-COMPR-STEER][EXPL-COMPR-FB-FBACK-IMM][MIN-GROUP-124][CSI-BF-ANT-1][NONCOMPS-BF-ANT-1][COMPS-BF-ANT-${comps_bf_ant}][CSI-MAX-ROWS-BF-1][CHE-SPACE-TIME-STR-1][TX-NDP][RX-NDP]"
	fi
	echo "$ht_tx_bf_capab_value"
}

# Read DB values for vht capabilities and create string for hostapd.
# Flags set in the vht_capab are:
# [MAX-MPDU-]
# [RXLDPC]
# [SHORT-GI-80]
# [TX-STBC-2BY1]
# [RX-STBC-1]
# [SU-BEAMFORMER]
# [SOUNDING-DIMENSION-]
# [SU-BEAMFORMEE]
# [BF-ANTENNA-]
# [MU-BEAMFORMER]
# [VHT-TXOP-PS]
# [MAX-A-MPDU-LEN-EXP]
# [EXT-NSS-BW1] or [EXT-NSS-BW2] or [EXT-NSS-BW3]
convert_vht_capab()
{
	# Define local parameters
	local interface_index interface_name is_wave500 channel_bandwidth phy_name driver_ldpc driver_tx_stbc driver_rx_stbc driver_no_tx_stbc driver_no_rx_stbc \
	num_tx_antennas	mpdu_len vht_capab_value rx_ldpc vht_short_gi vht_tx_stbc vht_rx_stbc \
	su_beamformer su_beamformee beamformer_antenna ugw_beamformer_antenna sounding_dimestion ugw_sounding_dimestion \
	vht_txop_ps ampdu_max_len_exp bf_mode is_wave600b ext_nss_bwx index is_wave600d2

	interface_index=$1
	interface_name=$2

	is_wave500=""
	is_wave600b=""
	is_wave600d2=""

	chip_id=`check_wave_chip_id $interface_name`

	[ "$chip_id" = "$GEN5B_CHIP_ID" ] && is_wave500="yes"        # gen5b only
	[ $(is_gen6b $interface_name) = "1" ] && is_wave600b="yes"   # gen6b only
	[ $(is_gen6d2 $interface_name) = "1" ] && is_wave600d2="yes" # gen6d2 only

	channel_bandwidth=""
	channel_bandwidth=`db2fapi_convert regular OperatingChannelBandwidth $interface_index`

	# Read driver capabilities values
	phy_name=`find_phy_from_interface_name $interface_name`
	
	# LDPC
	driver_ldpc=""
	driver_ldpc=`iw phy $phy_name info | grep LDPC`
	[ -n "$driver_ldpc" ] && driver_ldpc="[RXLDPC]"
	
	# TX-STBC
	driver_tx_stbc=""
	driver_rx_stbc=""
	driver_no_tx_stbc=`iw phy $phy_name info | grep "No TX STBC"`
	driver_no_rx_stbc=`iw phy $phy_name info | grep "No RX STBC"`
	[ -z "$driver_no_tx_stbc" ] && driver_tx_stbc="[TX-STBC-2BY1]"
	[ -z "$driver_no_rx_stbc" ] && driver_rx_stbc="[RX-STBC-1]"

	# Number of TX antennas
	num_tx_antennas=`iw phy $phy_name info | grep "Available Antennas"`
	num_tx_antennas=${num_tx_antennas##*TX 0x}
	num_tx_antennas=${num_tx_antennas:0:1}
	num_tx_antennas=`convert_num_ants $num_tx_antennas`

	# Check value for MPDU max length
	mpdu_len=`db2fapi_convert regular VhtMPDUlen $interface_index`
	vht_capab_value="[MAX-MPDU-${mpdu_len}]"

	# Check value for RX-LDPC.
	rx_ldpc=`db2fapi_convert boolean VhtLDPCenabled $interface_index`
	[ "$rx_ldpc" = "1" ] && vht_capab_value="${vht_capab_value}${driver_ldpc}"

	# Check value for VHT Short-GI.
	vht_short_gi=`db2fapi_convert boolean VhtGuardInterval $interface_index`
	if [ "$vht_short_gi" = "1" ]; then
		 vht_capab_value="$vht_capab_value[SHORT-GI-80]"
		 if ([ "$channel_bandwidth" = "160MHz" ] || [ "$channel_bandwidth" = "Auto" ]); then
			vht_capab_value="$vht_capab_value[SHORT-GI-160]"
		 fi
	fi

	# Check value for VHT TX STBC.
	vht_tx_stbc=`db2fapi_convert boolean VhtSTBCtxEnabled $interface_index`
	[ "$vht_tx_stbc" = "1" ] && vht_capab_value="${vht_capab_value}${driver_tx_stbc}"

	# Check value for VHT RX STBC. Currently, support is for 1 spatial stream.
	vht_rx_stbc=`db2fapi_convert boolean VhtSTBCrxEnabled $interface_index`
	[ "$vht_rx_stbc" = "1" ] && vht_capab_value="${vht_capab_value}${driver_rx_stbc}"

	# Get value for Single User beamformer.
	su_beamformer=`db2fapi_convert boolean VhtSUbeamformerEnabled $interface_index`
	# Get value for Single User beamformee.
	su_beamformee=`db2fapi_convert boolean VhtSUbeamformeeEnabled $interface_index`

	beamformer_antenna=4
	vht_capab_value="$vht_capab_value[BF-ANTENNA-${beamformer_antenna}]"

	# Check value for Sounding dimension if SU-beamformer is supported.
	# Compare between number of TX antennas and values set in DB and set the lowest.
	if [ "$su_beamformer" = "1" ]
	then

		sounding_dimestion=$num_tx_antennas
		sounding_dimension_db=`db2fapi_convert regular VhtSoundingDimension $interface_index`
		[ "$sounding_dimension_db" -lt "$sounding_dimestion" ] && sounding_dimestion=$sounding_dimension_db
		vht_capab_value="$vht_capab_value[SOUNDING-DIMENSION-${sounding_dimestion}]"
	fi

	# Check value for VHT TXOP power save.
	vht_txop_ps=`db2fapi_convert boolean VhtTXOPpowerSaveEnabled $interface_index`
	[ "$vht_txop_ps" = "1" ] && vht_capab_value="$vht_capab_value[VHT-TXOP-PS]"

	bf_mode=`db2fapi_convert regular WaveBfMode $interface_index`
	if [ "$bf_mode" != "Disabled" ]
	then
		# WLANRTSYS-7762 SU-BEAMFORMER enalbe for all chipsets.
		[ "$su_beamformer" = "1" ] && vht_capab_value="$vht_capab_value[SU-BEAMFORMER]"

		# WLANRTSYS-7762 SU-BEAMFORMEE only gen6a No.
		([ "$is_wave500" = "yes" ] || [ "$is_wave600b" = "yes" ] || [ "$is_wave600d2" = "yes" ]) && [ "$su_beamformee" = "1" ] && vht_capab_value="$vht_capab_value[SU-BEAMFORMEE]"

		# WLANRTSYS-7762 MU-BEAMFORMER only gen6a NO.
		([ "$is_wave500" = "yes" ] || [ "$is_wave600b" = "yes" ] || [ "$is_wave600d2" = "yes" ]) && vht_capab_value="${vht_capab_value}[MU-BEAMFORMER]"

		# WLANRTSYS-7762 MU-BEAMFORMEE disable for all chipsets.
		# vht_capab_value="${vht_capab_value}[MU-BEAMFORMEE]"
	fi

	# Check value for A-MPDU max length exponent.
	ampdu_max_len_exp=`db2fapi_convert regular VhtAMPDUlenExponent $interface_index`
	vht_capab_value="${vht_capab_value}[MAX-A-MPDU-LEN-EXP${ampdu_max_len_exp}]"
	# Only for GEN6 ( Driver support 160MHz only on GEN6)
	if [ "$channel_bandwidth" = "160MHz" ] || [ "$channel_bandwidth" = "Auto" ]; then
		# Driver support 160MHz only for GEN6
		[ "$is_wave500" != "yes" ] && vht_capab_value="${vht_capab_value}[VHT160]"
	fi

	# only one can be set , user must make sure one is set.
	for index in 1 2 3
	do
		ext_nss_bwx=`db2fapi_convert boolean VhtExtNssBw$index $interface_index`
		[ "$ext_nss_bwx" = "1" ] &&  break
	done
	[ "$ext_nss_bwx" = "1" ] && vht_capab_value="$vht_capab_value[EXT-NSS-BW$index]"

	echo "$vht_capab_value"
}

convert_operation_channel_width()
{
	local interface_index channel_bw he_op_vht_channel_width freq_band

	interface_index=$1
	channel_bw=$2
	freq_band=$3
	chip_id=$4
	he_op_vht_channel_width=""

	if [ "$freq_band" = "2.4GHz" ]; then
		he_op_vht_channel_width="0"
	else
		[ "$chip_id" = "$GEN5B_CHIP_ID" ] && [ "$channel_bw" = "Auto" ] && channel_bw="80MHz" 
		case "$channel_bw" in
			"40MHz"|"20MHz") he_op_vht_channel_width="0" ;;
			"80MHz") he_op_vht_channel_width="1" ;;
			"160MHz"|"Auto") he_op_vht_channel_width="2" ;;
			"80+80Mhz") he_op_vht_channel_width="3" ;;
		esac
	fi
	echo "$he_op_vht_channel_width"
}

# Bandwidth 40MHz on 2.4GHz band: he_phy_channel_width_set=1 (B0)
# Bandwidth 40MHz and 80MHz on 5GHz bands: he_phy_channel_width_set=2 (B1)
# Bandwidth 160MHz on 5GHz band: he_phy_channel_width_set=4 (B2)
# Bandwidth 160(80+80)MHz on 5GHz band: he_phy_channel_width_set=8 (B3) 
convert_he_phy_channel_width()
{
	local interface_index channel_bw he_phy_channel_width freq_band he_phy_channel_width_db net_mode

	interface_index=$1
	channel_bw=$2
	freq_band=$3
	net_mode=$4
	he_phy_channel_width=""

	# default is from DB.
	he_phy_channel_width=`db2fapi_convert regular HePhyChannelWidthSet $interface_index`

	case "$channel_bw" in
		"20MHz")
			he_phy_channel_width="0"
		;;
		"40MHz")
			[ "$freq_band" = "2.4GHz" ] && he_phy_channel_width="1"
			[ "$freq_band" = "5GHz" ] && he_phy_channel_width="2"
		;;
		"80MHz")
			[ "$freq_band" = "5GHz" ] && he_phy_channel_width="2"
		;;
		"160MHz")
			[ "$freq_band" = "5GHz" ] && he_phy_channel_width="4"
		;;
		"80+80Mhz")
			[ "$freq_band" = "5GHz" ] && he_phy_channel_width="8"
		;;
		"Auto")
			print2log $radio_index INFO "### he_phy_channel_width handle Auto mode ###"
		;;
		*)
			print2log $radio_index ALERT "### he_phy_channel_width NOT DEFINED default from DB ###"
		;;
	esac

	if [ "$channel_bw" = "Auto" ]; then
		net_mode=`echo $net_mode | sed 's/\,//g'`
		case "$net_mode" in
			"bgnax")
				he_phy_channel_width="1"
			;;
			"anacax")
				he_phy_channel_width="4"
			;;
			*)
				print2log $radio_index ALERT "### he_phy_channel_width NOT DEFINED default from DB ###"
			;;
		esac
	fi

	echo "$he_phy_channel_width"

}

# Get DB value for auto_coc and number of antennas .
# If auto_coc value is 0, set num_antennas value for tx and rx.
# If auto_coc value is 1, set value 1 (auto).
convert_auto_coc()
{
	# Define local parameters
	local auto_coc_enabled num_antennas auto_coc_driver

	auto_coc_enabled=$1
	num_antennas=$2

	if [ "$auto_coc_enabled" = "0" ]
	then
		auto_coc_driver="$auto_coc_enabled $num_antennas $num_antennas"
	else
		auto_coc_driver=1
	fi
	echo $auto_coc_driver
}

# Read DB CoC parameters and generate CoC auto config string.
convert_coc_auto_config()
{
	# Define local parameters
	local interface_index limit_antennas antenna ugw_value coc_config limit1_high limit2_low limit2_high limit3_low limit3_high limit4_low

	interface_index=$1

	AutoCoC1x1TimerInterval=`db2fapi_convert regular WaveAutoCoC1x1TimerInterval $interface_index`
	AutoCoC2x2TimerInterval=`db2fapi_convert regular WaveAutoCoC2x2TimerInterval $interface_index`
	AutoCoC3x3TimerInterval=`db2fapi_convert regular WaveAutoCoC3x3TimerInterval $interface_index`
	AutoCoC4x4TimerInterval=`db2fapi_convert regular WaveAutoCoC4x4TimerInterval $interface_index`
	AutoCoC1x1HighLimit=`db2fapi_convert regular WaveAutoCoC1x1HighLimit $interface_index`
	AutoCoC2x2LowLimit=`db2fapi_convert regular WaveAutoCoC2x2LowLimit $interface_index`
	AutoCoC2x2HighLimit=`db2fapi_convert regular WaveAutoCoC2x2HighLimit $interface_index`
	AutoCoC3x3LowLimit=`db2fapi_convert regular WaveAutoCoC3x3LowLimit $interface_index`
	AutoCoC3x3HighLimit=`db2fapi_convert regular WaveAutoCoC3x3HighLimit $interface_index`
	AutoCoC4x4LowLimit=`db2fapi_convert regular WaveAutoCoC4x4LowLimit $interface_index`

	echo "$AutoCoC1x1TimerInterval $AutoCoC2x2TimerInterval $AutoCoC3x3TimerInterval $AutoCoC4x4TimerInterval $AutoCoC1x1HighLimit $AutoCoC2x2LowLimit $AutoCoC2x2HighLimit $AutoCoC3x3LowLimit $AutoCoC3x3HighLimit $AutoCoC4x4LowLimit"
}

# Read DB Power CoC parameters and generate PCoC auto config string.
convert_power_coc_auto_config()
{
	local interface_index pcocLow2high pcocHigh2low pcocLimUpper pcocLimLower

	interface_index=$1

	pcocLow2high=`db2fapi_convert regular WavePowerCocLow2High $interface_index`
	pcocHigh2low=`db2fapi_convert regular WavePowerCocHigh2Low $interface_index`
	pcocLimUpper=`db2fapi_convert regular WavePowerCocLimitUpper $interface_index`
	pcocLimLower=`db2fapi_convert regular WavePowerCocLimitLower $interface_index`

	echo "${pcocLow2high} ${pcocHigh2low} ${pcocLimLower} ${pcocLimUpper}"
}

# Read DB values for the scan parameters and generate the config string.
convert_scan_params()
{
	# Define local parameters
	local interface_index passiveScanTime activeScanTime numProbeReqs probeReqInterval passiveScanValidTime activeScanValidTime

	interface_index=$1

	PassiveScanTime=`db2fapi_convert regular WavePassiveScanTime $interface_index`
	ActiveScanTime=`db2fapi_convert regular WaveActiveScanTime $interface_index`
	NumProbeReqs=`db2fapi_convert regular WaveNumProbeReqs $interface_index`
	ProbeReqInterval=`db2fapi_convert regular WaveProbeReqInterval $interface_index`
	PassiveScanValidTime=`db2fapi_convert regular WavePassiveScanValidTime $interface_index`
	ActiveScanValidTime=`db2fapi_convert regular WaveActiveScanValidTime $interface_index`
	
	echo "$PassiveScanTime $ActiveScanTime $NumProbeReqs $ProbeReqInterval $PassiveScanValidTime $ActiveScanValidTime"
}

# Read DB values for the background scan parameters and generate the config string.
convert_bg_scan_params()
{
	# Define local parameters
	local interface_index passiveScanTimeBG activeScanTimeBG numProbeReqsBG probeReqIntervalBG numChansInChunkBG chanChunkIntervalBG

	interface_index=$1

	PassiveScanTimeBG=`db2fapi_convert regular WavePassiveScanTimeBG $interface_index`
	ActiveScanTimeBG=`db2fapi_convert regular WaveActiveScanTimeBG $interface_index`
	NumProbeReqsBG=`db2fapi_convert regular WaveNumProbeReqsBG $interface_index`
	ProbeReqIntervalBG=`db2fapi_convert regular WaveProbeReqIntervalBG $interface_index`
	NumChansInChunkBG=`db2fapi_convert regular WaveNumChansInChunkBG $interface_index`
	ChanChunkIntervalBG=`db2fapi_convert regular WaveChanChunkIntervalBG $interface_index`
	
	echo "$PassiveScanTimeBG $ActiveScanTimeBG $NumProbeReqsBG $ProbeReqIntervalBG $NumChansInChunkBG $ChanChunkIntervalBG"
}

# Read DB values for the calibration channel width for scan and generate the config string.
convert_calibration_chan_width_for_scan()
{
	# Define local parameters
	local interface_index chanWidthMask2 chanWidthMask5

	interface_index=$1

	chanWidthMask2=`db2fapi_convert regular WaveChannelWidthMask24 $interface_index`
	chanWidthMask5=`db2fapi_convert regular WaveChannelWidthMask5 $interface_index`

	echo "$chanWidthMask2 $chanWidthMask5"
}

# Read DB FW recovery parameters and generate FW recovery setting.
convert_fw_recovery()
{
	# Define local parameters
	local interface_index fast_recovery fast_recovery_limit full_recovery full_recovery_limit complete_recovery recovery_timer \
	auto_recovery_dumps recovery_num_of_dumps fw_recovery cards_recovery_enable

	interface_index=$1

	local_db_source WIFI

	if [ "$(is_certifiction)" = "1" ]; then
		cards_recovery_enable="00"
		print2log $interface_index ATTENTION "fw_recovery setting:cards_recovery_enable[$cards_recovery_enable]"
	else
		cards_recovery_enable=""
	fi

	[ "$cards_recovery_enable" = "" ] && cards_recovery_enable=`db2fapi_convert regular WaveRecoveryEnabled 0`
	fast_recovery=`db2fapi_convert boolean WaveFastRecoveryEnabled $interface_index`
	fast_recovery_limit=`db2fapi_convert regular WaveFastRecoveryLimit $interface_index`
	full_recovery=`db2fapi_convert boolean WaveFullRecoveryEnabled $interface_index`
	full_recovery_limit=`db2fapi_convert regular WaveFullRecoveryLimit $interface_index`
	# removed TBD-need to remove from DB.
	#complete_recovery=`db2fapi_convert boolean WaveCompleteRecoveryEnabled $interface_index`
	recovery_timer=`db2fapi_convert regular WaveRecoveryTimer $interface_index`
	auto_recovery_dumps=`db2fapi_convert boolean WaveAutoRecoveryDumpsEnabled $interface_index`
	recovery_num_of_dumps=`db2fapi_convert regular WaveRecoveryNumOfDumps $interface_index`
	if [ "$fast_recovery" = "0" ]
	then
		fw_recovery="$fast_recovery"
	else
		fw_recovery="$fast_recovery_limit"
	fi

	if [ "$full_recovery" = "0" ]
	then
		fw_recovery="${fw_recovery} ${full_recovery}"
	else
		fw_recovery="${fw_recovery} ${full_recovery_limit}"
	fi

	[ "$cards_recovery_enable" = "00" ] && cards_recovery_enable="0"
	[ "$cards_recovery_enable" = "10" ] || [ "$cards_recovery_enable" = "11" ] && cards_recovery_enable="1"
	fw_recovery="${cards_recovery_enable} ${fw_recovery} 1 ${recovery_timer}"

	echo "$fw_recovery"
}

convert_num_msdu_in_amsdu()
{
	# Define local parameters
	local interface_index num_msdu_in_amsdu ht_num_msdu vht_num_msdu he_num_msdu
	
	interface_index=$1

	num_msdu_in_amsdu=""
	ht_num_msdu=`db2fapi_convert regular WaveHtNumMsdusInAmsdu $interface_index`
	vht_num_msdu=`db2fapi_convert regular WaveVhtNumMsdusInAmsdu $interface_index`
	he_num_msdu=`db2fapi_convert regular WaveHeNumMsdusInAmsdu $interface_index`

	num_msdu_in_amsdu="$ht_num_msdu $vht_num_msdu $he_num_msdu"

	echo "$num_msdu_in_amsdu"
}

convert_txop_enbale()
{
	# Define local parameters
	local interface_index mode sta_id chip_id

	interface_index=$1
	# for cases which are not gen5 or gen6 take id from DB.
	sta_id=`db2fapi_convert boolean WaveTxOpStaId $interface_index`
	mode=`db2fapi_convert regular WaveTxOpMode $interface_index`

	chip_id=`check_wave_chip_id wlan$radio_index`
	[ "$chip_id" = "$GEN5B_CHIP_ID" ] && sta_id=255
	[ "$chip_id" = "$GEN6_CHIP_ID" ] || [ "$chip_id" = "$GEN6D2_CHIP_ID" ] && sta_id=511

	if [ "$mode" = "Disabled" ]
	then
		mode="0"
	elif [ "$mode" = "Forced" ]
	then
		mode="1"
	else
		mode="2"
	fi

	echo "$sta_id $mode"
}

# Read DB value for radarSimulationEna.
# If radarSimulationEna is 1, read and set value in radarSimulationChannel
# If radarSimulationEna is 0, set empty value
convert_radar_simulation_debug_channel()
{
	# Define local parameters
	local interface_index radar_simulation_enabled radar_simulation_channel
	
	interface_index=$1
	radar_simulation_channel=""

	radar_simulation_enabled=`db2fapi_convert boolean WaveRadarSimulationChannelEnabled $interface_index`
	[ "$radar_simulation_enabled" = "1" ] && radar_simulation_channel=`db2fapi_convert regular WaveRadarSimulationChannel $interface_index`

	echo "$radar_simulation_channel"
}

# Read DB value for WaveBfMode and convert as follow:
# Auto = 0xff
# Explicit = 0
# Implicit = 1
# STBC1x2 = 2
# STBC2x4 = 3
# Disabled = 4
convert_bf_mode()
{
	# Define local parameters
	local interface_index bf_mode sBfMode

	interface_index=$1

	bf_mode=`db2fapi_convert regular WaveBfMode $interface_index`

	case "$bf_mode" in
		"Auto") sBfMode="0xff" ;;
		"Explicit") sBfMode="0" ;;
		"Implicit") sBfMode="1" ;;
		"STBC1x2") sBfMode="2" ;;
		"STBC2x4") sBfMode="3" ;;
		"Disabled") sBfMode="4" ;;
	esac

	echo "$sBfMode"
}

convert_rts_signaling_bw()
{
	# Define local parameters
	local interface_index sRTSmode rts_signaling_bw

	interface_index=$1

	sRTSmode=""
	rts_signaling_bw=`db2fapi_convert regular WaveRtsSignalingBw $interface_index`

	case "$rts_signaling_bw" in
		"Legacy") sRTSmode="0 0" ;;
		"Dynamic") sRTSmode="1 0" ;;
		"Static") sRTSmode="0 1" ;;
	esac

	echo "$sRTSmode"
}

convert_fixed_rate()
{
	# Define local parameters
	local interface_index sFixedRateCfg station_index auto_rate band_width bw phy_mode phym nss mcs cp_mode dcm partial_bw_data partial_bw_mng change_type changetype chip_id

	interface_index=$1

	sFixedRateCfg=""
	# for cases which are not gen5 or gen6 take index from DB.
	station_index=`db2fapi_convert regular WaveFRStationIndex $interface_index`
	auto_rate=`db2fapi_convert boolean WaveFRAutoRate $interface_index`
	band_width=`db2fapi_convert regular WaveFRBandwidth $interface_index`
	phy_mode=`db2fapi_convert regular WaveFRPhyMode $interface_index`
	nss=`db2fapi_convert regular WaveFRNss $interface_index`
	mcs=`db2fapi_convert regular WaveFRMcs $interface_index`
	cp_mode=`db2fapi_convert regular WaveFRCpMode $interface_index`
	dcm=`db2fapi_convert boolean WaveFRDcm $interface_index`
	partial_bw_data=`db2fapi_convert boolean WaveFRHeExtPartialBwData $interface_index`
	partial_bw_mng=`db2fapi_convert boolean WaveFRHeExtPartialBwMng $interface_index`
	change_type=`db2fapi_convert regular WaveFRChangeType $interface_index`

	chip_id=`check_wave_chip_id wlan$radio_index`
	[ "$chip_id" = "$GEN5B_CHIP_ID" ] && station_index=255
	[ "$chip_id" = "$GEN6_CHIP_ID" ] || [ "$chip_id" = "$GEN6D2_CHIP_ID" ] && station_index=511
	
	case "$band_width" in
		"20MHz") bw="0" ;;
		"40MHz") bw="1" ;;
		"80MHz") bw="2" ;;
		"160MHz") bw="3" ;;
	esac

	case "$phy_mode" in
		"a")  phym="0" ;;
		"b")  phym="1" ;;
		"n")  phym="2" ;;
		"ac") phym="3" ;;
		"ax") phym="4" ;;
		"ax_su_ext") phym="5" ;;
	esac

	case "$change_type" in
		"DATA_MANAGEMENT") changetype="1" ;;
		"DATA_ONLY") changetype="2" ;;
		"MANAGEMENT_ONLY") changetype="3" ;;
	esac

	sFixedRateCfg="$station_index $auto_rate $bw $phym $nss $mcs $cp_mode $dcm $partial_bw_data $partial_bw_mng $changetype"

	echo "$sFixedRateCfg"
}

convert_atf_type()
{
	# Define local parameters
	local interface_index interface_name atf_type atf_enabled chipId
	interface_index=$1
	interface_name=$2
	atf_enabled=$3

	atf_type=`db2fapi_convert regular WaveAtfDistributionType $interface_index`
	[ $atf_enabled != "0" ] && chipId=`check_wave_chip_id $interface_name`
	[ $atf_enabled = "0" ] || [ "$chipId" = "07E0" ] && atf_type="Disable"
	# For GEN4(07E0) ATF is not supported.
	if [ "$chipId" = "07E0" ]; then
		build_wlan_notification "servd" "NOTIFY_WIFI_UPDATE_PARAM" "Name:$interface_name Object:${RADIO_VENDOR_OBJECT} WaveAtfEnabled:false"
		build_wlan_notification "servd" "NOTIFY_WIFI_UPDATE_PARAM" "Name:$interface_name Object:${RADIO_VENDOR_OBJECT} WaveAtfDistributionType:Disable"
	fi

	case "$atf_type" in
		"Disable") atf_type="0" ;;
		"Dynamic") atf_type="1" ;;
		"Static") atf_type="2" ;;
	esac

	echo "$atf_type"
}

convert_atf_algorithm()
{
	# Define local parameters
	local interface_index atf_algorithm

	interface_index=$1

	atf_algorithm=`db2fapi_convert regular WaveAtfAlgoType $interface_index`

	case "$atf_algorithm" in
		"Global") atf_algorithm="0" ;;
		"Weighted") atf_algorithm="1" ;;
	esac

	echo "$atf_algorithm"
}

convert_atf_stations_and_weights()
{
	# Define local parameters
	local pid interface_name hostapd_atf_conf_name atf_stations_and_weights station_mac station_weight sta orig_ifs
	pid=$1
	interface_name=$2
	hostapd_atf_conf_name=$3
	atf_stations_and_weights=$4

	orig_ifs=$IFS
	IFS=,
	for v in $atf_stations_and_weights
	do
		let index=index+1
		if [ $(( $index % 2 )) -eq 1 ]; then
			station_mac=$v
		else
			# driver needs the weights * 100
			station_weight=$(( $v * 100 ))
			sta_val="$station_mac,$station_weight"
			set_conf_param $hostapd_atf_conf_name atf otf $pid $interface_name sta "$sta_val"
		fi
	done

	[ "$atf_stations_and_weights" = "" ] && set_conf_param $hostapd_atf_conf_name atf otf $pid $interface_name sta "$atf_stations_and_weights"

	IFS=$orig_ifs
}

# Read DB value for driver debug level and create string to set in proc.
# Driver debug level is set for console (cdebug) and for remote (rdebug)
convert_driver_debug_level()
{
	# Define local parameters
	local interface_index component driver_debug_value driver_debug_level

	interface_index=$1
	component=$2
	driver_debug_value=""

	if [ "$component" = "cdebug" ]
	then
		driver_debug_level=`db2fapi_convert regular WaveDriverDebugLevelConsole $interface_index`
	elif [ "$component" = "rdebug" ]
	then
		driver_debug_level=`db2fapi_convert regular WaveDriverDebugLevel $interface_index`
	fi
	[ -n "$driver_debug_level" ] && driver_debug_value="8 $component=$driver_debug_level"
	echo "$driver_debug_value"
}

# Read DB value for SSIDAdvertisementEnabled
# Value in hostapd is XOR of the DB value
convert_ignore_broadcast_ssid()
{
	# Define local parameters
	local interface_index ssid_advertise ignore_broadcast_ssid

	interface_index=$1

	ssid_advertise=`db2fapi_convert boolean SSIDAdvertisementEnabled $interface_index`
	ignore_broadcast_ssid=$((ssid_advertise^1))
	echo $ignore_broadcast_ssid
}

# Get ap_isolate value.
# Set 1->ENABLE, 0->DISABLE
convert_ap_iso()
{
	# Define local parameters
	local ap_isolate ap_iso

	ap_isolate=$1

	case "$ap_isolate" in
		"0")
			ap_iso="DISABLE"
			;;
		"1")
			ap_iso="ENABLE"
			;;
	esac
	echo "$ap_iso"
}

# Read the network mode and if mode is ANAC, set value to 1
convert_opmode_notif()
{
	# Define local parameters
	local radio_index opmode_notif network_mode ieee80211ac

	radio_index=$1

	opmode_notif="0"

	network_mode=`db2fapi_convert regular OperatingStandards $radio_index`
	ieee80211ac=`db2fapi_convert_ieee80211 $network_mode ac`

	[ "$ieee80211ac" = "1" ] && opmode_notif=1
	echo "$opmode_notif"
}

# Set the WDS ap key index.
# When no WDS security is set, key index is 0
# When WDS security is set, key index is 1
convert_peer_ap_key_index()
{
	# Define local parameters
	local interface_index wds_security key_index

	interface_index=$1

	wds_security=`db2fapi_convert regular WaveWDSSecurityMode $interface_index`

	if [ "$wds_security" != "None" ]
	then
		key_index="1"
	else
		key_index="0"
	fi
	echo "$key_index"
}

# Set the WEP key when configuring WDS.
# Read the WEP key from DB.
convert_wds_wep_keys()
{
	# Define local parameters
	local interface_index wep_key

	interface_index=$1

	wep_key=`db2fapi_convert regular WaveWDSKey $interface_index`
	if [ "$wep_key" != "" ]
	then
		wep_key="1 $wep_key"
	fi
	echo "$wep_key"
}

# Generate list of MACs from driver.
# If list type is wds, read gPeerAPs
# If list type is four_addr, read gFourAddrStas
get_wds_driver_list()
{
	# Define local parameters
	local interface_name list_type driver_list iw_name

	interface_name=$1
	list_type=$2
	driver_list=""

	[ "$list_type" = "wds" ] && iw_name="gPeerAPs"
	[ "$list_type" = "four_addr" ] && iw_name="gFourAddrStas"

	driver_list=`iw $interface_name iwlwav $iw_name`
	# Remove prefix from MACs list (list is in the format of "wlan0 gPeerAPs:" followed by the MACs) and remove leading spaces from list.
	driver_list=${driver_list#*:}
	driver_list=`echo $driver_list`
	# If the list is empty, the text "No any address" appears.
	[ "$driver_list" = "No any address" ] && driver_list=""
	echo "$driver_list"
}

# Generate the list of WDS MACs from DB.
# List is comma separated, replace with spaces
# If list type is wds, read WaveWDSPeers
# If list type is four_addr, read Wave4AddressesStaList
get_wds_db_list()
{
	# Define local parameters
	local interface_index list_type param_name db_macs

	interface_index=$1
	list_type=$2

	[ "$list_type" = "wds" ] && param_name="WaveWDSPeers"
	[ "$list_type" = "four_addr" ] && param_name="Wave4AddressesStaList"

	db_macs=`db2fapi_convert regular $param_name $interface_index`
	db_macs="${db_macs//,/ }"
	echo "$db_macs"
}

# Update the WDS list.
# If list type is wds, use sDelPeerAP and sAddPeerAP to update the driver
# If list type is four_addr, use sDelFourAddrSta and sAddFourAddrSta to update the driver
# Generate 2 new parameters: list of MACs in DB and list of MACs in driver.
# Go over the list of MACs from driver:
# For each MAC, try to "remove" it from DB list. If DB list after "removal" is same as before, the MAC doesn't exist in DB and needs to be deleted from driver (using appropriate iw).
##########
# Example:
# DB list: 11:11:11:11:11:11 22:22:22:22:22:22
# driver list: 11:11:11:11:11:11 33:33:33:33:33:33
# When we try to "remove" 11:11:11:11:11:11 from DB list, we get new list and nothing needs to be done.
# When we try to "remove" 33:33:33:33:33:33 from DB list, we get the same list, hence this MAC doesn't appear in DB and needs to be removed from driver.
##########
# Go over the list of MACs from DB and add them to driver (using appropriate iw, when adding an existing MAC, nothing changes).
update_wds_list()
{
	# Define local parameters
	local interface_name list_type pid driver_list db_list iw_add iw_del

	interface_name=$1
	pid=$2
	list_type=$3
	driver_list=$4
	db_list=$5

	[ "$list_type" = "wds" ] && iw_add="sAddPeerAP" && iw_del="sDelPeerAP"
	[ "$list_type" = "four_addr" ] && iw_add="sAddFourAddrSta" && iw_del="sDelFourAddrSta"
	# Go over MACs in driver and see if a MAC appears in DB. If not, delete this MAC from driver
	for driver_mac in $driver_list
	do
		[ "$db_list" = "${db_list/$driver_mac/}" ] && set_conf_param $DRIVER_SINGLE_CALL_CONFIG_FILE iw otf $pid $interface_name "$iw_del" "$driver_mac"
	done

	# Go over list of MACs in DB and add them to driver
	for db_mac in $db_list
	do
		set_conf_param drv_config_post_up iw otf $pid $interface_name "$iw_add" "$db_mac"
	done
}

# Read from DB the value of Wave4AddressesMode and convert to driver value:
# Disabled = 0
# Static = 1
# Dynamic = 2
# List = 3
convert_four_addresses_mode()
{
	# Define local parameters
	local interface_index sFourAddrMode

	interface_index=$1

	sFourAddrMode=`db2fapi_convert regular Wave4AddressesMode $interface_index`
	case "$sFourAddrMode" in
		"Disabled") sFourAddrMode="0" ;;
		"Static") sFourAddrMode="1" ;;
		"Dynamic") sFourAddrMode="2" ;;
		"List") sFourAddrMode="3" ;;
	esac

	echo "$sFourAddrMode"
}

# Read from DB the values of WaveAmsduEnabled and WaveBaAgreementEnabled and concatenate to 1 string
convert_aggregation_config()
{
	# Define local parameters
	local interface_index amsdu_mode ba_mode sAggrConfig window_size

	amsdu_mode=`db2fapi_convert boolean WaveAmsduEnabled $interface_index`
	ba_mode=`db2fapi_convert boolean WaveBaAgreementEnabled $interface_index`
	window_size=`db2fapi_convert regular WaveBaWindowSize $interface_index`
	[ "$window_size" = "Default" ] && window_size="64"

	sAggrConfig="${amsdu_mode} ${ba_mode} ${window_size}"
	echo "$sAggrConfig"
}

# Read from DB the MACAddressControlMode value and set macaddr_acl in hostapd.
# In the hostapd:
# 	0 = accept unless in deny list
#	1 = deny unless in accept list
#	2 = use external RADIUS server (accept/deny lists are searched first).
# DB values:
#	Allow
#	Deny
#	Disabled
convert_macaddr_acl()
{
	# Define local parameters
	local acl_db macaddr_acl

	acl_db=$1

	macaddr_acl=""
	case "$acl_db" in
		"Disabled")
			macaddr_acl=0
			;;
		"Allow")
			macaddr_acl=1
			;;
		"Deny")
			macaddr_acl=0
			;;
	esac

	echo "$macaddr_acl"
}

# Update the acl list with mac addresses from DB.
update_acl_list()
{
	# Define local parameters
	local list_type interface_index pid interface_name radio_name empty_list \
	acl_file tmp_acl_file current_list_populated i new_list_populated db_acl_list mac mac_exist tmp_mac acl_mac in_db

	list_type=$1
	interface_index=$2
	pid=$3
	interface_name=$4
	radio_name=$5
	empty_list=$6

	eval acl_file=${CONF_DIR}/\${${list_type}_ACL_FILE}.${interface_name}.conf
	eval tmp_acl_file=${CONF_DIR}/\${${list_type}_ACL_FILE}.${interface_name}_${pid}.conf
	cat /dev/null > $tmp_acl_file

	# Get the current list of MACs and compare to new list to see if changes were made.
	# The sed command has 3 steps. Showing example for the MAC 00:11:22:33:44:55 in DENY list:
	# Step 1: Add list type value before all the MACs in the file: DENY_00:11:22:33:44:55
	# Step 2: Add ="1" at the end of each line: DENY_00:11:22:33:44:55="1"
	# Step 3: Replace colon with underscore to allow sourcing of parameters: DENY_00_11_22_33_44_55="1"
	if [ -e "$acl_file" ]
	then
		sed -e 's/^/'${list_type}'_/' -e 's/$/=\"1\"/' -e 's/:/_/g' $acl_file > ${CONF_DIR}/acl_params_${interface_name}
		. ${CONF_DIR}/acl_params_${interface_name}
	fi
	# Check if current list is populated
	current_list_populated=""
	[ -s "${CONF_DIR}/acl_params_${interface_name}" ] && current_list_populated=1
	rm -f ${CONF_DIR}/acl_params_${interface_name}

	# If acl is set to disabled, files will remain empty.
	# If current list has macs in it, set restart flag
	if [ "$empty_list" ]
	then
		if [ "$current_list_populated" ]
		then
			set_restart_and_reconfigure $interface_name $radio_name
		fi
		return
	fi

	# Go over list of MACs is DB and write MACs to ACL file
	i=0
	new_list_populated=""
	db_acl_list=`db2fapi_convert regular MACAddressControlList $interface_index`
	db_acl_list="${db_acl_list//,/ }"
	
	if [ -n "$db_acl_list" ]
	then
		for mac in $db_acl_list
		do
			mac_exist=""
			new_list_populated=1
			tmp_mac=${mac//:/_}
			eval mac_exist=\${${list_type}_${tmp_mac}}
			if [ -z "$mac_exist" ]
			then
				set_restart_and_reconfigure $interface_name $radio_name
			fi
			echo "$mac" >> $tmp_acl_file
			# Write the new MAC to the list of DB MACs
			echo "CONF_${tmp_mac}=1" >> ${CONF_DIR}/conf_macs
			i=$((i+1))
		done
	fi

	# If no MACs appear in the DB, clear the hostapd MAC list
	if [ -z "$new_list_populated" ]
	then
		cat /dev/null > $acl_file
		set_restart_and_reconfigure $interface_name $radio_name
		rm -f ${CONF_DIR}/conf_macs
		return
	fi
	. ${CONF_DIR}/conf_macs
	rm -f ${CONF_DIR}/conf_macs
	
	# Go over the list of MACs in the current list (if populated) and check if MAC in the list is also in the DB
	if [ "$current_list_populated" ]
	then
			while read acl_mac
			do
				acl_mac=${acl_mac//:/_}
				eval in_db=\${CONF_${acl_mac}}
				[ "$in_db" != "1" ] && set_restart_and_reconfigure $interface_name $radio_name
			done < $acl_file
	fi
}

# Get values from DB of security mode, pmf_enabled and pmf_required.
# The wpa_key_mgmt is set to WPA-PSK for personal and WPA-EAP for Radius.
# If security is WPA2-CCMP and PMF is enabled and required, the suffix -SHA256 is added to the wpa_key_mgmt.
# If fast transition is enabled and fast transition key_mgmt is set, add it to the parameter
convert_wpa_key_mgmt()
{
	# Define local parameters
	local security_mode security_type auth_type pmf_enabled pmf_required wpa_key_mgmt

	security_mode=$1
	security_type=$2
	auth_type=$3
	pmf_enabled=$4
	pmf_required=$5
	fast_transition_support=$6
	fast_transition_key_mgmt=$7

	# Init parameter as personal WPA
	wpa_key_mgmt=WPA-PSK
	# RADIUS is set
	[ "$auth_type" = "Enterprise" ] && wpa_key_mgmt=WPA-EAP
	# Add -SHA256 if PMF is set as required
	[ "$security_type" = "WPA2" ] && [ "$pmf_enabled" = "1" ] && [ "$pmf_required" = "1" ] && wpa_key_mgmt=${wpa_key_mgmt}-SHA256

	# Add support for FT mode
	[ "$fast_transition_support" = "1" ] && [ "$fast_transition_key_mgmt" != "Open" ] && wpa_key_mgmt="$fast_transition_key_mgmt $wpa_key_mgmt"

	echo "$wpa_key_mgmt"
}

# Check in DB if WPS is enabled.
# if WPS is enabled, check if AP is configured or not
# hostapd values: 0=disabled, 1=enabled, AP un-configured, 2=enabled, AP configured.
convert_wps_state()
{
	# Define local parameters
	local interface_index wps_interface_radio_index wps_action wps_enable wps_config_state

	interface_index=$1
	wps_interface_radio_index=$2
	wps_action=$3

	wps_enable=`db2fapi_convert boolean Enable $interface_index`
	# WPS is disabled
	[ "$wps_enable" = "0" ] && echo 0 && return
	# WPS is enabled, set hostapd value according to AP state (configured/un-configured).
	if [ "$wps_enable" = "1" ]
	then
		wps_config_state=1
		# In WPS, WPS parameters are under radio object
		if [ `db2fapi_convert regular ConfigState $wps_interface_radio_index` = "Configured" ] && [ "$wps_action" != "ResetWPS" ]
		then
			wps_config_state=2
		fi
	fi
	echo "$wps_config_state"
}

# Read DB frequency and decide wps_rf_bands.
convert_wps_rf_bands()
{
	# Define local parameters
	local interface_index radio_index freq_band wps_rf_bands wps_state_wlan0 wps_state_wlan1 wps_state_wlan2 wps_state_vap

	interface_index=$1
	radio_index=$2

	frequency_band=`db2fapi_convert regular OperatingFrequencyBand $radio_index`
	
	wps_config_state=`convert_wps_state $interface_index $radio_index`
	
	if [ "$frequency_band" = "5GHz" ]
	then
		wps_rf_bands="a"
	else
		wps_rf_bands="g"
	fi
	echo $wps_rf_bands
}

db2fapi_convert_ipaddr()
{
	ipaddr4_type_availability_conf=`db2fapi_convert regular IPv4AddressType $interface_index`
	ipaddr6_type_availability_conf=`db2fapi_convert regular IPv6AddressType $interface_index`

	if [ -n "$ipaddr4_type_availability_conf" ]
	then
		#(ipv4_type & 0x3f) << 2 | (ipv6_type & 0x3)
		let "masked=$ipaddr4_type_availability_conf&63"
		echo "masked=$masked" > /dev/null
		let "shifted=$masked<<2"
		echo "shifted=$shifted" > /dev/null
		let "masked_6=$ipaddr6_type_availability_conf&3"
		echo "masked_6=$masked_6" > /dev/null
		let "val=$shifted | $masked_6"
		echo "val=$val" > /dev/null
		val=`echo $val | awk '{printf "0%-X\n", $0}'`
		echo $val
	fi
}

db2fapi_convert_osu_ssid()
{
	interface_index=$1
	osu_ssid=`db2fapi_convert regular OsuSsid $interface_index`
	if [ -n "$osu_ssid" ]
	then
		echo "\"$osu_ssid\""
	else
		echo
	fi
}

convert_static_planner_common()
{
	# Define local parameters
	local interface_index sMuStaticPlann_common txop_com_max_tx_op_duration sequence_type txop_com_start_bw_limit dl_com_phases_format		\
		dl_com_num_of_participating_stations dl_com_mu_type dl_com_number_of_phase_repetitions dl_com_maximum_ppdu_transmission_time_limit	\
		dl_com_rf_power dl_com_he_cp dl_com_he_ltf ul_com_he_cp ul_com_he_ltf rcr_com_tf_hegi_and_ltf rcr_com_tf_length tf_com_psdu_rate	\
		rcr_com_he_sig_a_spatial_reuse rcr_com_stbc operation_mode nfrp_start_aid nfrp_multiplexingFlag nfrp_feedbackType

	interface_index=$1

	sMuStaticPlann_common=""

	operation_mode=`db2fapi_convert boolean WaveSPEnable $interface_index`
	txop_com_max_tx_op_duration=`db2fapi_convert regular WaveSPTxopComMaxTxOpDuration $interface_index`
	sequence_type=`db2fapi_convert regular WaveSPSequenceType $interface_index`
	txop_com_start_bw_limit=`db2fapi_convert regular WaveSPTxopComStartBwLimit $interface_index`
	dl_com_phases_format=`db2fapi_convert regular WaveSPDlComPhasesFormat $interface_index`
	dl_com_num_of_participating_stations=`db2fapi_convert regular WaveSPDlComNumOfParticipatingStations $interface_index`
	dl_com_mu_type=`db2fapi_convert regular WaveSPDlComMuType $interface_index`
	dl_com_number_of_phase_repetitions=`db2fapi_convert regular WaveSPDlComNumberOfPhaseRepetitions $interface_index`
	dl_com_maximum_ppdu_transmission_time_limit=`db2fapi_convert regular WaveSPDlComMaximumPpduTransmissionTimeLimit $interface_index`
	dl_com_rf_power=`db2fapi_convert regular WaveSPDlComRfPower $interface_index`
	dl_com_he_cp=`db2fapi_convert regular WaveSPDlComHeCp $interface_index`
	dl_com_he_ltf=`db2fapi_convert regular WaveSPDlComHeLtf $interface_index`
	ul_com_he_cp=`db2fapi_convert regular WaveSPUlComHeCp $interface_index`
	ul_com_he_ltf=`db2fapi_convert regular WaveSPUlComHeLtf $interface_index`
	rcr_com_tf_hegi_and_ltf=`db2fapi_convert regular WaveSPRcrComTfHegiAndLtf $interface_index`
	rcr_com_tf_length=`db2fapi_convert regular WaveSPRcrComTfLength $interface_index`
	tf_com_psdu_rate=`db2fapi_convert regular WaveSPTfComPsduRate $interface_index`
	rcr_com_he_sig_a_spatial_reuse=`db2fapi_convert regular WaveSPRcrComHeSigASpatialReuse $interface_index`
	rcr_com_stbc=`db2fapi_convert regular WaveSPRcrComStbc $interface_index`
	nfrp_start_aid=`db2fapi_convert regular WaveSPNfrpComStartAID $interface_index`
	nfrp_multiplexingFlag=`db2fapi_convert boolean WaveSPNfrpComMultiplexingFlag $interface_index`
	nfrp_feedbackType=`db2fapi_convert regular WaveSPNfrpComFeedbackType $interface_index`

	sMuStaticPlann_common="$operation_mode $txop_com_max_tx_op_duration $sequence_type $txop_com_start_bw_limit $dl_com_phases_format"
	sMuStaticPlann_common="$sMuStaticPlann_common $dl_com_num_of_participating_stations $dl_com_mu_type $dl_com_number_of_phase_repetitions"
	sMuStaticPlann_common="$sMuStaticPlann_common $dl_com_maximum_ppdu_transmission_time_limit $dl_com_rf_power $dl_com_he_cp $dl_com_he_ltf $ul_com_he_cp"
	sMuStaticPlann_common="$sMuStaticPlann_common $ul_com_he_ltf $rcr_com_tf_hegi_and_ltf $rcr_com_tf_length $tf_com_psdu_rate $rcr_com_he_sig_a_spatial_reuse $rcr_com_stbc"
	sMuStaticPlann_common="$sMuStaticPlann_common $nfrp_start_aid $nfrp_multiplexingFlag $nfrp_feedbackType"

	echo "$sMuStaticPlann_common"
}

convert_static_planner_user()
{
	# Define local parameters
	local interface_index user_param_index sMuStaticPlannUser dl_usr_usp_station_indexes dl_usr_psdu_rate_per_usp dl_usr_tid_alloc_bitmap 			\
		dl_usr_ul_psdu_rate_per_usp dl_usr_bf_type dl_usr_sub_band_per_usp dl_usr_start_ru_per_usp dl_usr_ru_size_per_usp \
		tf_usr_tf_starting_ss tf_usr_tf_mpdu_mu_spacing_factor tf_usr_tf_padding rcr_tf_usr_target_rssi rcr_tf_usr_ldpc rcr_tf_usr_psdu_rate \
		rcr_tf_usr_sub_band rcr_tf_usr_start_ru rcr_tf_usr_ru_size rcr_tf_usr_ss_allocation rcr_tf_usr_coding_type_bcc_or_lpdc

	interface_index=$1
	user_param_index=$2

	sMuStaticPlannUser=""

	# User
	dl_usr_usp_station_indexes=`db2fapi_convert regular WaveSPDlUsrUspStationIndexes$user_param_index $interface_index`
	dl_usr_psdu_rate_per_usp=`db2fapi_convert regular WaveSPDlUsrPsduRatePerUsp$user_param_index $interface_index`
	dl_usr_tid_alloc_bitmap=`db2fapi_convert regular WaveSPDlUsrTidAllocBitmap$user_param_index $interface_index`
	dl_usr_ul_psdu_rate_per_usp=`db2fapi_convert regular WaveSPDlUsrUlPsduRatePerUsp$user_param_index $interface_index`
	dl_usr_bf_type=`db2fapi_convert regular WaveSPDlUsrBfType$user_param_index $interface_index`
	dl_usr_sub_band_per_usp=`db2fapi_convert regular WaveSPDlUsrSubBandPerUsp$user_param_index $interface_index`
	dl_usr_start_ru_per_usp=`db2fapi_convert regular WaveSPDlUsrStartRuPerUsp$user_param_index $interface_index`
	dl_usr_ru_size_per_usp=`db2fapi_convert regular WaveSPDlUsrRuSizePerUsp$user_param_index $interface_index`
	tf_usr_tf_starting_ss=`db2fapi_convert regular WaveSPTfUsrTfStartingSs$user_param_index $interface_index`
	tf_usr_tf_mpdu_mu_spacing_factor=`db2fapi_convert regular WaveSPTfUsrTfMpduMuSpacingFactor$user_param_index $interface_index`
	tf_usr_tf_padding=`db2fapi_convert regular WaveSPTfUsrTfPadding$user_param_index $interface_index`
	rcr_tf_usr_target_rssi=`db2fapi_convert regular WaveSPRcrTfUsrTargetRssi$user_param_index $interface_index`
	rcr_tf_usr_ldpc=`db2fapi_convert regular WaveSPRcrTfUsrLdpc$user_param_index $interface_index`
	rcr_tf_usr_psdu_rate=`db2fapi_convert regular WaveSPRcrTfUsrPsduRate$user_param_index $interface_index`
	rcr_tf_usr_sub_band=`db2fapi_convert regular WaveSPRcrTfUsrSubBand$user_param_index $interface_index`
	rcr_tf_usr_start_ru=`db2fapi_convert regular WaveSPRcrTfUsrStartRu$user_param_index $interface_index`
	rcr_tf_usr_ru_size=`db2fapi_convert regular WaveSPRcrTfUsrRuSize$user_param_index $interface_index`
	rcr_tf_usr_ss_allocation=`db2fapi_convert regular WaveSPRcrTfUsrSsAllocation$user_param_index $interface_index`
	rcr_tf_usr_coding_type_bcc_or_lpdc=`db2fapi_convert regular WaveSPRcrTfUsrCodingTypeBccOrLpdc$user_param_index $interface_index`


	sMuStaticPlannUser=" $dl_usr_usp_station_indexes $dl_usr_psdu_rate_per_usp $dl_usr_tid_alloc_bitmap"
	sMuStaticPlannUser="$sMuStaticPlannUser $dl_usr_ul_psdu_rate_per_usp $dl_usr_bf_type $dl_usr_sub_band_per_usp $dl_usr_start_ru_per_usp $dl_usr_ru_size_per_usp"
	sMuStaticPlannUser="$sMuStaticPlannUser $tf_usr_tf_starting_ss $tf_usr_tf_mpdu_mu_spacing_factor $tf_usr_tf_padding $rcr_tf_usr_target_rssi $rcr_tf_usr_ldpc $rcr_tf_usr_psdu_rate $rcr_tf_usr_sub_band"
	sMuStaticPlannUser="$sMuStaticPlannUser $rcr_tf_usr_start_ru $rcr_tf_usr_ru_size $rcr_tf_usr_ss_allocation $rcr_tf_usr_coding_type_bcc_or_lpdc"

	echo "$sMuStaticPlannUser"
}

# param enum values rls date:15-01-2018
# isAuto: 0=fixed, 1=Auto (default)
# ltfAndGi value from the following enumeration (0-5):
# typedef enum
# {
#	CP_MODE_SHORT_CP_SHORT_LTF,	// 0 - HT/VHT: 0.4us CP;	HE: 0.8us CP, 1x LTF = HtVht0p4usCP
#	CP_MODE_MED_CP_SHORT_LTF,	// 1 - HT/VHT: 0.8us CP;	HE: 1.6us CP, 1x LTF = HtVht0p8usCP
#	CP_MODE_SHORT_CP_MED_LTF,	// 2 - HT/VHT: invalid;	   	HE: 0.8us CP, 2x LTF = He0p8usCP2xLTF
#	CP_MODE_MED_CP_MED_LTF,		// 3 - HT/VHT: invalid;		HE: 1.6us CP, 2x LTF = He1p6usCP2xLTF
#	CP_MODE_SHORT_CP_LONG_LTF,	// 4 - HT/VHT: invalid;		HE: 0.8us CP, 4x LTF = He0p8usCP4xLTF
#	CP_MODE_LONG_CP_LONG_LTF,	// 5 - HT/VHT: invalid;		HE: 3.2us CP, 4x LTF = He3p2usCP4xLTF
#	CP_NUM_OF_MODES,
#	CP_MODE_INVALID = 0xFF
# }CyclicPrefixMode_e;

convert_fixed_ltf_gi()
{
	local interface_index is_auto ltf_and_gi_value sFixedLtfGi

	interface_index=$1
	sFixedLtfGi=""

	is_auto=`db2fapi_convert regular WaveltfAndGiFixedRate $interface_index`
	ltf_and_gi_value=`db2fapi_convert regular WaveltfAndGiValue $interface_index`

	case "$is_auto" in
		"Auto")
			is_auto="1"
			;;
		"Fixed")
			is_auto="0"
	esac

	case "$ltf_and_gi_value" in
		"HtVht0p4usCP")
			ltf_and_gi_value="0"
			;;
		"HtVht0p8usCP")
			ltf_and_gi_value="1"
			;;
		"He0p8usCP2xLTF")
			ltf_and_gi_value="2"
			;;
		"He1p6usCP2xLTF")
			ltf_and_gi_value="3"
			;;
		"He0p8usCP4xLTF")
			ltf_and_gi_value="4"
			;;
		"He3p2usCP4xLTF")
			ltf_and_gi_value="5"
			;;
	esac

	sFixedLtfGi="$is_auto $ltf_and_gi_value"

	echo "$sFixedLtfGi"
}

convert_max_mcs_per_nss()
{
	local num_of_antenas db_mcs_per_nss max_mcs_per_nss

	num_of_antenas=$1
	db_mcs_per_nss=$2

	case "$num_of_antenas" in
		"1")
			max_mcs_per_nss="65534"
			;;
		"2")
			max_mcs_per_nss="65530"
			;;
		"3")
			max_mcs_per_nss="65514"
			;;
		"4")
			max_mcs_per_nss="65450"
			;;
	esac
	if [ $max_mcs_per_nss -lt $db_mcs_per_nss ]
	then
		max_mcs_per_nss=$db_mcs_per_nss
	fi

	echo "$max_mcs_per_nss"
}

LIB_CONVERT_SOURCED="1"
