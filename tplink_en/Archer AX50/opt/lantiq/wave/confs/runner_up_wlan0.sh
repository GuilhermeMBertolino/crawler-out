[ ! "$LIB_COMMON_SOURCED" ] && . /tmp/fapi_wlan_wave_lib_common.sh
### Wlan logger commands ###
ifconfig rtlog0 hw ether AC:9A:96:F4:20:30
brctl addif br-lan rtlog0
ifconfig rtlog0 up
switch_cli dev=1 GSW_MAC_TABLE_ENTRY_ADD nFId=0 nPortId=9 nSubIfId=255 bStaticEntry=1 nMAC=00:00:00:00:00:10
### Wlan logger commands ###
ifconfig rtlog0 hw ether AC:9A:96:F4:20:30
brctl addif br-lan rtlog0
ifconfig rtlog0 up
switch_cli dev=1 GSW_MAC_TABLE_ENTRY_ADD nFId=0 nPortId=9 nSubIfId=255 bStaticEntry=1 nMAC=00:00:00:00:00:10
##### fapi_wlan_wave_up commands #####
### AccessPoint pre-up commands ###
iw wlan0 iwlwav sPowerSelection 0
iw wlan0 iwlwav sCoCAutoCfg 10 50 50 50 1000 5000 5000 5000 5000 5000
echo 8 cdebug=0 > /proc/net/mtlk_log/debug
iw wlan0 iwlwav sScanParams 100 20 3 5 10 2
iw wlan0 iwlwav sScanParamsBG 100 20 1 1 1 1000
iw wlan0 iwlwav sScanModifFlags 48
iw wlan0 iwlwav sScanCalCwMasks 0 0
iw wlan0 iwlwav sScanExpTime 90
iw wlan0 iwlwav sFWRecovery 5 3 3600 5
iw wlan0 iwlwav sQAMplus 1
iw wlan0 iwlwav sNumMsduInAmsdu 7 5 7
iw wlan0 iwlwav sMaxMpduLen 11000
iw wlan0 iwlwav sBfMode 0xff
iw wlan0 iwlwav sInterfDetThresh -68 -68 -68 -68 5 -68
iw wlan0 iwlwav sMuOperation 0
iw wlan0 iwlwav sDmrConfig 0
iw wlan0 iwlwav sSetRxTH -82
echo 262144 > /proc/sys/net/core/rmem_max

### Start hostapd ###
cp -s /opt/lantiq/bin/hostapd /tmp/hostapd_wlan0
echo "/opt/lantiq/wave/scripts/fapi_wlan_wave_up: Start hostapd_wlan0" > /dev/console
/tmp/hostapd_wlan0 -B -e /tmp/hostapd_ent_wlan0 /opt/lantiq/wave/confs/hostapd_wlan0.conf
sleep 1
cp -s /opt/lantiq/bin/hostapd_cli /tmp/hostapd_cli_wlan0
/tmp/hostapd_cli_wlan0 -iwlan0 -a/opt/lantiq/wave/scripts/fapi_wlan_wave_events_hostapd.sh -B

### Start drvhlpr ###
cp -s /opt/lantiq/bin/drvhlpr /tmp/drvhlpr_wlan0
drvhlpr_running=`is_process_running drvhlpr_wlan0`
[ $drvhlpr_running -eq 0 ] && (. /opt/lantiq/wave/scripts/fapi_wlan_wave_drvhlpr.sh wlan0 &)

### Wait for hostapd_cli state to be ENABLED or ACS_DONE ###
loop=0
echo -n "Waiting for hostapd radio interface to be ready."
while [ $loop -lt 100 ]
do
	[ $((loop%10)) -eq 0 ] && echo -ne "\n Waiting for wlan0 to be ready"
	[ $loop -eq 99 ] && echo "hostapd_cli state didn't change to ENABLED or ACS_DONE for wlan0'!, hostapd may not be up!"
	found_enabled=`hostapd_cli -iwlan0 status 2>/dev/null | grep state=ENABLED -c`
	found_acs_done=`hostapd_cli -iwlan0 status 2>/dev/null | grep state=ACS_DONE -c`
	hstate=`hostapd_cli -iwlan0 status 2>/dev/null | grep state`
	[ "$hstate_prv" != "$hstate" ] && echo  "Waiting ...hostapd $hstate";hstate_prv="$hstate"
	found=$((found_enabled+found_acs_done))
	if [ $found -eq 1 ]
	then
		loop=100
		hostapd_conf_debug wlan0 OK
	else
		sleep 1
		loop=$((loop+1))
		hostapd_running=`is_process_running hostapd_wlan0`
		if [ $hostapd_running -eq 0 ]; then
			echo "/opt/lantiq/wave/scripts/fapi_wlan_wave_up: ERROR hostapd_wlan0" > /dev/console
			hostapd_conf_debug wlan0 ERROR
			exit 1
		fi
	fi
done

### AccessPoint post-up commands ###
ppacmd addlan -i wlan0.0
iw wlan0.0 iwlwav sAPforwarding 1
hs_cli AP_ISO -O DISABLE -I wlan0.0
iw wlan0.0 iwlwav sReliableMcast 1
iw wlan0.0 iwlwav sBridgeMode 0
iw wlan0.0 iwlwav sFourAddrMode 0
iw wlan0.0 iwlwav sAggrConfig 1 1 0
iw wlan0.0 iwlwav s11nProtection 1
ppacmd addlan -i wlan0.0
ppacmd addlan -i wlan0
iw wlan0 iwlwav sCoCPower 0 2 2
iw wlan0 iwlwav sEnableRadio 1
iw wlan0 iwlwav sTxopConfig 511 2
iw wlan0 iwlwav sAcsUpdateTo 0
iw wlan0 iwlwav sRTSmode 0 0
iw wlan0 iwlwav sFixedRateCfg 511 1 1 0 1 7 1
iw wlan0 iwlwav sInterfDetThresh -68 -68 -68 -68 5 -68
iw wlan0 iwlwav sCcaAdapt 10 5 -30 10 5 30 60
iw wlan0 iwlwav sFastDrop 0
iw wlan0 iwlwav sFixedLtfGi 1 0
iw wlan0 iwlwav sMuStatPlanCfg 0 32000 1 0 0 0 0 0 5400 26 2 2 2 2 2 3334 3 0 0
iw wlan0 iwlwav sHeMuOperation 0
iw wlan0 iwlwav sEnableTestBus 1
iw wlan0 iwlwav s11hRadarDetect 0
echo 8 rdebug=0 > /proc/net/mtlk_log/debug
iw wlan0 iwlwav sAPforwarding 1
hs_cli AP_ISO -O DISABLE -I wlan0
iw wlan0 iwlwav sReliableMcast 1
iw wlan0 iwlwav sBridgeMode 0
iw wlan0 iwlwav sFourAddrMode 0
iw wlan0 iwlwav sAggrConfig 1 1 0
iw wlan0 iwlwav s11nProtection 0
ppacmd addlan -i wlan0
exit 0
