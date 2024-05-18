#!/bin/sh /etc/rc.common
#
# Copyright (C) 2017 Tp-link.com
# Author: Weng Kaiping <wengkaiping@tp-link.net>
# Date: 30Mar17
#


WLAN_DEVICES=
WLAN_DEVICE_NUM=
ALL_DEVICES=
local maclist=""

__nrd_get_wlan_ifaces() {
    local config="$1"
    local ssid_to_match="$2"
    local device iface disabled mode ssid network

    config_get radio "$config" radio
    config_get vaps "$config" vaps
    
    for iface in "$vaps"; do
        WLAN_DEVICES="${WLAN_DEVICES}${WLAN_DEVICES:+","}${radio}:${iface}"
    done
    
}

# __nrd_get_wlan_interface()
# output: $1 List of all WLAN interfaces matching the SSID provided
# input: $2 The desired SSID. If it is null string, then get all WLAN
#        interfaces; otherwise, get all that matches this SSID
__nrd_get_wlan_interface() {
    WLAN_DEVICES=""
    
    config_load nrd
    config_foreach __nrd_get_wlan_ifaces wlanif $2

    eval "$1='${WLAN_DEVICES}'"
}


# Append a config parameter to the file
# input: $1 - parameter string to append (key and value)
# input: $2 - filename to append to
__nrd_cfg_append() {
	echo "$1" >> "$2"
}

# Append a config parameter to the file preceded by a newline
# input: $1 - parameter string to append (key and value)
# input: $2 - filename to append to
__nrd_cfg_nl_append() {
	echo "" >> "$2"
	echo "$1" >> "$2"
}

# __nrd_cfg_add_str <section> <option> <filename>
__nrd_cfg_add_str() {
	local key="$2"
	local section="$1"
	local option="$2"
	local filename="$3"

	config_get val "${section}" "${option}"
	[ -n "${val}" ] && __nrd_cfg_append "${key}=${val}" $filename
}

# Add a string to the config file where the key in the UCI config is
# different from the config in the generated config.
# input: $1 - section name in UCI
# input: $2 - parameter name in UCI
# input: $3 - parameter name in the generated configuration
# input: $4 - output filename
__nrd_cfg_add_str_new_key() {
	local section="$1"
	local option="$2"
	local newkey="$3"
	local filename="$4"

	config_get val "${section}" "${option}"
	[ -n "${val}" ] && __nrd_cfg_append "${newkey}=${val}" $filename
}

# Add AP Steering threshold. If band specific parameter is present
# use that, else use generic steering threshold.
# input: $1 - section name in UCI
# input: $2 - band specific steering parameter
# input: $2 - generic steering parameter
# input: $3 - parameter name in the generated configuration
# input: $4 - output filename
__nrd_cfg_add_ap_steering_thresh() {
	local section="$1"
	local band_option="$2"
	local gen_option="$3"
	local newkey="$4"
	local filename="$5"
	local val

	config_get val "${section}" "${band_option}"
	if [ -n "${val}" ]; then
		__nrd_cfg_add_str_new_key "${section}" "${band_option}" "${newkey}" $filename
	else
		__nrd_cfg_add_str_new_key "${section}" "${gen_option}" "${newkey}" $filename
	fi
}

# Given two (section, key) pairs, subtract the second value from the first
# to arrive at an RSSI value and use that for the key being generated.
# This is meant to convert an RSSI on one band to an RSSI on the
# other band, albeit in such a way that is the mirror image of the estimates
# performed by nrd.
# To prevent value underflow/overflow, use 0 for the key if the base value
# is smaller than the adjust value; use 255 if the base value subtracts the
# adjust value is greater than 255
#
# The last parameter is the file to output.
__nrd_cfg_add_rssi_est_str() {
	local basevalsection="$1"
	local basevalkey="$2"
	local adjvalsection="$3"
	local adjvalkey="$4"
	local newkey="$5"
	local filename="$6"

	config_get baseval "${basevalsection}" "${basevalkey}"
	config_get adjval  "${adjvalsection}" "${adjvalkey}"
	if [ -n "${baseval}" ] && [ -n "${adjval}" ]; then
		if [ "${baseval}" -gt "${adjval}" ] && \
		   [ "${baseval}" -lt "$((255 + $adjval))" ]; then
			val="$(($baseval - $adjval))"
		elif [ "${baseval}" -le "${adjval}" ]; then
			val="0"
		elif [ "${baseval}" -ge "$((255 + $adjval))" ]; then
			val="255"
		fi
	fi

	[ -n "${val}" ] && __nrd_cfg_append "${newkey}=${val}" $filename
}



# Add the list of managed interfaces to the configuration file.
# input: $1 - the name of the config file to write to
__nrd_cfg_add_interface() {
	local filename="$1"
	local section="config"
	local option="MatchingSSID"

	config_get ssid "${section}" "${option}"

	local all_wlan_ifaces

	# Get a list of wlan interfaces, seperated by comma
	__nrd_get_wlan_interface all_wlan_ifaces $ssid
	__nrd_cfg_append 'WlanInterfaces='$all_wlan_ifaces $filename
}

# Add the list of blacklist to the configuration file.
# input: $1 - the name of the config file to write to
__nrd_cfg_add_blacklist() {
    local filename="$1"
    local count=0
    local mac
    config_load nrd_blacklist
    config_foreach __nrd_cfg_append_blacklist  client

    for mac in $maclist; do
        __nrd_cfg_append "BlackMac""$count""="$mac $filename
        count=`expr $count + 1`
	done;
    __nrd_cfg_append "BlacklistCount=""$count" $filename

}

__nrd_cfg_append_blacklist() {
	local section="$1"
    local mac
	config_get mac "$section" mac
	mac=${mac//-/:}
    append maclist "$mac "

}




nrd_create_config() {
	local filename=$1
	local device_type=$2
	
    echo "" > "$filename"
	
	config_load 'nrd'

	__nrd_cfg_nl_append '[WLANIF]' $filename
	__nrd_cfg_add_interface $filename

	__nrd_cfg_nl_append '[WLANIF2G]' $filename
	__nrd_cfg_add_str_new_key	IdleSteer	NormalInactTimeout	InactIdleThreshold $filename
	__nrd_cfg_add_str_new_key	IdleSteer	OverloadInactTimeout	InactOverloadThreshold $filename
	__nrd_cfg_add_str	IdleSteer	InactCheckInterval $filename
	__nrd_cfg_add_str   IdleSteer   AuthAllow $filename
	__nrd_cfg_add_rssi_est_str	IdleSteer	RSSISteeringPoint_UG	Estimator_Adv	RSSIDiff_EstW5FromW2	InactRSSIXingHighThreshold $filename
	__nrd_cfg_add_str	SteerExec_Adv	LowRSSIXingThreshold $filename
	__nrd_cfg_add_str	Estimator_Adv	BcnrptActiveDuration $filename
	__nrd_cfg_add_str	Estimator_Adv	BcnrptPassiveDuration $filename
	__nrd_cfg_add_str_new_key	ActiveSteer	TxRateXingThreshold_UG	HighTxRateXingThreshold $filename
	__nrd_cfg_add_str_new_key	ActiveSteer	RateRSSIXingThreshold_UG	HighRateRSSIXingThreshold $filename
	__nrd_cfg_add_ap_steering_thresh	APSteer	LowRSSIAPSteerThreshold_CAP_W2	LowRSSIAPSteerThreshold_CAP	LowRSSIAPSteeringThreshold	$filename
	__nrd_cfg_add_str	SteerExec_Adv	Delay24GProbeRSSIThreshold $filename
	__nrd_cfg_add_str	SteerExec_Adv	Delay24GProbeTimeWindow $filename
	__nrd_cfg_add_str	SteerExec_Adv	Delay24GProbeMinReqCount $filename

	__nrd_cfg_nl_append '[WLANIF5G]' $filename
	__nrd_cfg_add_str_new_key	IAS	Enable_W5 InterferenceDetectionEnable $filename
	__nrd_cfg_add_str_new_key	IdleSteer	NormalInactTimeout	InactIdleThreshold $filename
	__nrd_cfg_add_str_new_key	IdleSteer	OverloadInactTimeout	InactOverloadThreshold $filename
	__nrd_cfg_add_str	IdleSteer	InactCheckInterval $filename
	__nrd_cfg_add_str   IdleSteer   AuthAllow $filename
	__nrd_cfg_add_str_new_key	IdleSteer	RSSISteeringPoint_UG	InactRSSIXingHighThreshold $filename
	__nrd_cfg_add_rssi_est_str	IdleSteer	RSSISteeringPoint_DG	Estimator_Adv	RSSIDiff_EstW2FromW5	InactRSSIXingLowThreshold $filename
	__nrd_cfg_add_str	SteerExec_Adv	LowRSSIXingThreshold $filename
	__nrd_cfg_add_str	Estimator_Adv	BcnrptActiveDuration $filename
	__nrd_cfg_add_str	Estimator_Adv	BcnrptPassiveDuration $filename
	__nrd_cfg_add_str_new_key	ActiveSteer	TxRateXingThreshold_DG	LowTxRateXingThreshold $filename
	__nrd_cfg_add_str_new_key	ActiveSteer	RateRSSIXingThreshold_DG	LowRateRSSIXingThreshold $filename
	__nrd_cfg_add_ap_steering_thresh	APSteer	LowRSSIAPSteerThreshold_CAP_W5	LowRSSIAPSteerThreshold_CAP	LowRSSIAPSteeringThreshold	$filename	
	
	__nrd_cfg_nl_append '[NETDB]' $filename
	__nrd_cfg_add_str   NetDB       DiscoverByScan $filename
	__nrd_cfg_add_str   NetDB       ScanFrequency $filename
	__nrd_cfg_add_str   NetDB       MinChannelTime $filename
	__nrd_cfg_add_str   NetDB       MaxChannelTime $filename 
	__nrd_cfg_add_str   NetDB       AgeFrequency $filename    	
	__nrd_cfg_add_str   NetDB       RemoteBSSMaxAge $filename 
    
	__nrd_cfg_nl_append '[STADB]' $filename
	__nrd_cfg_add_str	StaDB		IncludeOutOfNetwork $filename
	__nrd_cfg_add_str	StaDB       AgingSizeThreshold $filename
	__nrd_cfg_add_str	StaDB       AgingFrequency $filename
	__nrd_cfg_add_str	StaDB       PollFrequency $filename	
	__nrd_cfg_add_str	StaDB       OutOfNetworkMaxAge $filename	
	__nrd_cfg_add_str	StaDB       InNetworkMaxAge $filename
	__nrd_cfg_add_str	StaDB       NumRemoteBSSes		$filename
	__nrd_cfg_add_str	StaDB		MarkAdvClientAsDualBand $filename
	__nrd_cfg_add_str	StaDB       PopulateNonServingPHYInfo $filename
	__nrd_cfg_add_str_new_key       config_Adv  AgeLimit    ProbeMaxInterval $filename
	__nrd_cfg_add_str_new_key   IdleSteer   NormalInactTimeout  InactIdleThreshold $filename    
    __nrd_cfg_add_blacklist $filename

	__nrd_cfg_nl_append '[TRIGGERMON]' $filename
	__nrd_cfg_add_str	TriggerMonitor	RSSIMeasureSamples_W2 $filename
	__nrd_cfg_add_str	TriggerMonitor	RSSIMeasureSamples_W5 $filename
	__nrd_cfg_add_str    TriggerMonitor  ThresholdEstimator $filename	
	__nrd_cfg_add_str	config_Adv	AgeLimit $filename
	__nrd_cfg_add_str_new_key	ActiveSteer	TxRateXingThreshold_UG	HighTxRateXingThreshold $filename
	__nrd_cfg_add_str_new_key	ActiveSteer	RateRSSIXingThreshold_UG	HighRateRSSIXingThreshold $filename
	__nrd_cfg_add_str_new_key	ActiveSteer	TxRateXingThreshold_DG	LowTxRateXingThreshold $filename
	__nrd_cfg_add_str_new_key	ActiveSteer	RateRSSIXingThreshold_DG	LowRateRSSIXingThreshold $filename
    if [ "$device_type" = 'AP' ]; then
        __nrd_cfg_add_ap_steering_thresh    APSteer LowRSSIAPSteerThreshold_CAP_W2  LowRSSIAPSteerThreshold_CAP LowRSSIAPSteeringThreshold_W2   $filename
        __nrd_cfg_add_ap_steering_thresh    APSteer LowRSSIAPSteerThreshold_CAP_W5  LowRSSIAPSteerThreshold_CAP LowRSSIAPSteeringThreshold_W5   $filename
        __nrd_cfg_append 'RunOnCAP=1' $filename           
    else
        __nrd_cfg_add_ap_steering_thresh    APSteer LowRSSIAPSteerThreshold_RE_W2   LowRSSIAPSteerThreshold_RE  LowRSSIAPSteeringThreshold_W2   $filename
        __nrd_cfg_add_ap_steering_thresh    APSteer LowRSSIAPSteerThreshold_RE_W5   LowRSSIAPSteerThreshold_RE  LowRSSIAPSteeringThreshold_W5   $filename
        __nrd_cfg_append 'RunOnCAP=0' $filename          
    fi 

	__nrd_cfg_nl_append '[ESTIMATOR]' $filename
	__nrd_cfg_add_str   config_Adv  AgeLimit $filename
	__nrd_cfg_add_str   Estimator_Adv   RSSIDiff_EstW5FromW2 $filename
	__nrd_cfg_add_str   Estimator_Adv   RSSIDiff_EstW2FromW5 $filename
	__nrd_cfg_add_str   Estimator_Adv   ProbeCountThreshold $filename
	__nrd_cfg_add_str   Estimator_Adv   11kProhibitTimeShort $filename
	__nrd_cfg_add_str   Estimator_Adv   11kProhibitTimeLong $filename

	__nrd_cfg_nl_append '[STEEREXEC]' $filename
	__nrd_cfg_add_str	SteerExec_Adv	SteeringProhibitTime $filename
	__nrd_cfg_add_str	SteerExec_Adv	TSteering $filename
	__nrd_cfg_add_str	SteerExec_Adv	InitialAuthRejCoalesceTime $filename
	__nrd_cfg_add_str	SteerExec_Adv	AuthRejMax $filename
	__nrd_cfg_add_str	SteerExec_Adv	SteeringUnfriendlyTime $filename
	__nrd_cfg_add_str	SteerExec_Adv	MaxSteeringUnfriendly $filename
	__nrd_cfg_add_str_new_key	SteerExec_Adv	LowRSSIXingThreshold	LowRSSIXingThreshold_W2 $filename
	__nrd_cfg_add_str_new_key	SteerExec_Adv	LowRSSIXingThreshold	LowRSSIXingThreshold_W5 $filename
	__nrd_cfg_add_str	SteerExec_Adv	TargetLowRSSIThreshold_W2 $filename
	__nrd_cfg_add_str	SteerExec_Adv	TargetLowRSSIThreshold_W5 $filename
	__nrd_cfg_add_str	SteerExec_Adv	BlacklistTime $filename
	__nrd_cfg_add_str	SteerExec_Adv	BTMResponseTime $filename
	__nrd_cfg_add_str	SteerExec_Adv	BTMAssociationTime $filename
	__nrd_cfg_add_str	SteerExec_Adv	BTMAlsoBlacklist $filename
	__nrd_cfg_add_str	SteerExec_Adv	BTMUnfriendlyTime $filename
	__nrd_cfg_add_str	SteerExec_Adv	BTMSteeringProhibitShortTime $filename
	__nrd_cfg_add_str	SteerExec_Adv	MaxBTMUnfriendly $filename
	__nrd_cfg_add_str	SteerExec_Adv	MaxBTMActiveUnfriendly $filename
	__nrd_cfg_add_str	config_Adv	AgeLimit $filename
	__nrd_cfg_add_str	SteerExec_Adv	MinRSSIBestEffort $filename
	__nrd_cfg_add_str	SteerExec_Adv	StartInBTMActiveState $filename
	__nrd_cfg_add_str	SteerExec_Adv	MaxConsecutiveBTMFailuresAsActive $filename

	__nrd_cfg_nl_append '[STEERALG]' $filename
	__nrd_cfg_add_str_new_key	IdleSteer	RSSISteeringPoint_DG	InactRSSIXingThreshold_W2 $filename
	__nrd_cfg_add_str_new_key	IdleSteer	RSSISteeringPoint_UG	InactRSSIXingThreshold_W5 $filename
	__nrd_cfg_add_str_new_key	ActiveSteer	TxRateXingThreshold_UG	HighTxRateXingThreshold $filename
	__nrd_cfg_add_str_new_key	ActiveSteer	RateRSSIXingThreshold_UG	HighRateRSSIXingThreshold $filename
	__nrd_cfg_add_str_new_key	ActiveSteer	TxRateXingThreshold_DG	LowTxRateXingThreshold $filename
	__nrd_cfg_add_str_new_key	ActiveSteer	RateRSSIXingThreshold_DG	LowRateRSSIXingThreshold $filename
	__nrd_cfg_add_str	SteerAlg_Adv	MinTxRateIncreaseThreshold $filename
	__nrd_cfg_add_str	config_Adv	AgeLimit $filename
	__nrd_cfg_add_str	config		PHYBasedPrioritization $filename
	__nrd_cfg_add_str	SteerAlg_Adv	MaxSteeringTargetCount $filename
    #if [ "$device_type" = 'AP' ]; then
        __nrd_cfg_add_str   APSteer APSteerToLeafMinRSSIIncThreshold    $filename
    #else
        # TODO: only consider star topology, so no more than one hop RE
        __nrd_cfg_add_str   APSteer APSteerToRootMinRSSIIncThreshold    $filename
        __nrd_cfg_add_str   APSteer APSteerToPeerMinRSSIIncThreshold    $filename
    #fi
    __nrd_cfg_add_str   APSteer DownlinkRSSIThreshold_W5    $filename


}
