[ ! "$LIB_COMMON_SOURCED" ] && . /tmp/fapi_wlan_wave_lib_common.sh
##### fapi_wlan_wave_up commands #####
### AccessPoint pre-up commands ###
iw wlan2 iwlwav sPowerSelection 0
iw wlan2 iwlwav sCoCAutoCfg 10 50 50 50 1000 5000 5000 5000 5000 5000
echo 8 cdebug=0 > /proc/net/mtlk_log/debug
iw wlan2 iwlwav sScanParams 100 20 3 5 10 2
iw wlan2 iwlwav sScanParamsBG 100 20 1 1 1 1000
iw wlan2 iwlwav sScanModifFlags 48
iw wlan2 iwlwav sScanCalCwMasks 0 0
iw wlan2 iwlwav sScanExpTime 90
iw wlan2 iwlwav sNumMsduInAmsdu 7 5 7
iw wlan2 iwlwav sMaxMpduLen 11000
iw wlan2 iwlwav sBfMode 0xff
iw wlan2 iwlwav sInterfDetThresh -68 -68 -68 -68 5 -68
iw wlan2 iwlwav sMuOperation 0
iw wlan2 iwlwav sDmrConfig 0
iw wlan2 iwlwav sSetRxTH -82
echo 262144 > /proc/sys/net/core/rmem_max

### Start hostapd ###
cp -s /opt/lantiq/bin/hostapd /tmp/hostapd_wlan2
echo "/opt/lantiq/wave/scripts/fapi_wlan_wave_up: Start hostapd_wlan2" > /dev/console
/tmp/hostapd_wlan2 -B -e /tmp/hostapd_ent_wlan2 /opt/lantiq/wave/confs/hostapd_wlan2.conf
sleep 1
cp -s /opt/lantiq/bin/hostapd_cli /tmp/hostapd_cli_wlan2
/tmp/hostapd_cli_wlan2 -iwlan2 -a/opt/lantiq/wave/scripts/fapi_wlan_wave_events_hostapd.sh -B

### Start drvhlpr ###
cp -s /opt/lantiq/bin/drvhlpr /tmp/drvhlpr_wlan2
drvhlpr_running=`is_process_running drvhlpr_wlan2`
[ $drvhlpr_running -eq 0 ] && (. /opt/lantiq/wave/scripts/fapi_wlan_wave_drvhlpr.sh wlan2 &)

### Wait for hostapd_cli state to be ENABLED or ACS_DONE ###
loop=0
echo -n "Waiting for hostapd radio interface to be ready."
while [ $loop -lt 100 ]
do
	[ $((loop%10)) -eq 0 ] && echo -ne "\n Waiting for wlan2 to be ready"
	[ $loop -eq 99 ] && echo "hostapd_cli state didn't change to ENABLED or ACS_DONE for wlan2'!, hostapd may not be up!"
	found_enabled=`hostapd_cli -iwlan2 status 2>/dev/null | grep state=ENABLED -c`
	found_acs_done=`hostapd_cli -iwlan2 status 2>/dev/null | grep state=ACS_DONE -c`
	hstate=`hostapd_cli -iwlan2 status 2>/dev/null | grep state`
	[ "$hstate_prv" != "$hstate" ] && echo  "Waiting ...hostapd $hstate";hstate_prv="$hstate"
	found=$((found_enabled+found_acs_done))
	if [ $found -eq 1 ]
	then
		loop=100
		hostapd_conf_debug wlan2 OK
	else
		sleep 1
		loop=$((loop+1))
		hostapd_running=`is_process_running hostapd_wlan2`
		if [ $hostapd_running -eq 0 ]; then
			echo "/opt/lantiq/wave/scripts/fapi_wlan_wave_up: ERROR hostapd_wlan2" > /dev/console
			hostapd_conf_debug wlan2 ERROR
			exit 1
		fi
	fi
done

### AccessPoint post-up commands ###
ppacmd addlan -i wlan2.0
iw wlan2.0 iwlwav sAPforwarding 1
hs_cli AP_ISO -O DISABLE -I wlan2.0
iw wlan2.0 iwlwav sReliableMcast 1
iw wlan2.0 iwlwav sBridgeMode 0
iw wlan2.0 iwlwav sFourAddrMode 0
iw wlan2.0 iwlwav sAggrConfig 1 1 0
iw wlan2.0 iwlwav s11nProtection 1
ppacmd addlan -i wlan2.0
ppacmd addlan -i wlan2
iw wlan2 iwlwav sCoCPower 0 2 2
iw wlan2 iwlwav sEnableRadio 1
iw wlan2 iwlwav sTxopConfig 511 2
iw wlan2 iwlwav sRadarRssiTh -64
iw wlan2 iwlwav sAcsUpdateTo 0
iw wlan2 iwlwav sRTSmode 0 0
iw wlan2 iwlwav sFixedRateCfg 511 1 2 3 1 7 1
iw wlan2 iwlwav sInterfDetThresh -68 -68 -68 -68 5 -68
iw wlan2 iwlwav sCcaAdapt 10 5 -30 10 5 30 60
iw wlan2 iwlwav sFastDrop 0
iw wlan2 iwlwav sFixedLtfGi 1 0
iw wlan2 iwlwav sMuStatPlanCfg 0 32000 1 2 0 0 0 0 5400 26 2 2 2 2 2 3334 3 0 0
iw wlan2 iwlwav sHeMuOperation 0
iw wlan2 iwlwav s11hRadarDetect 1
echo 8 rdebug=0 > /proc/net/mtlk_log/debug
iw wlan2 iwlwav sAPforwarding 1
hs_cli AP_ISO -O DISABLE -I wlan2
iw wlan2 iwlwav sReliableMcast 1
iw wlan2 iwlwav sBridgeMode 0
iw wlan2 iwlwav sFourAddrMode 0
iw wlan2 iwlwav sAggrConfig 1 1 0
iw wlan2 iwlwav s11nProtection 0
ppacmd addlan -i wlan2
exit 0
