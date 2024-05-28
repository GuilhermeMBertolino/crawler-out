[ ! "$LIB_COMMON_SOURCED" ] && . /tmp/fapi_wlan_wave_lib_common.sh
echo $script_name DUT APP is killed if exist > /dev/console
dut_apps=
[ $dut_apps !=  ] && for dut_app in $dut_apps; do kill $dut_app; done
echo $script_name killall hostapds > /dev/console
killall hostapd 2>/dev/null
hostapd_running=`is_process_running hostapd`
while [ $hostapd_running -eq 1 ]; do sleep 1; hostapd_running=`is_process_running hostapd`; echo hostapd kill wait > /dev/console; done
echo $script_name killall drvhlprs > /dev/console
killall drvhlpr 2>/dev/null
drvhlpr_running=`is_process_running drvhlpr`
while [ $drvhlpr_running -eq 1 ]; do sleep 1; drvhlpr_running=`is_process_running drvhlpr`; echo drvhlpr kill wait > /dev/console; done
echo $script_name rmmod mtlk > /dev/console
echo 22  > /opt/lantiq/wave/confs/mtlk_genl_family_id_file
rmmod mtlk
ifconfig rtlog0 down
brctl delif br-lan rtlog0
echo $script_name killall logserver / killall mtdump / rmmod mtlkroot > /dev/console
killall mtdump 2>/dev/null
killall logserver 2>/dev/null
rmmod mtlkroot
cd /tmp/
rm -rf mtlk*.ko *_scd_file.scd /opt/lantiq/wave/confs/* /tmp/wlan_wave/crda_executed /tmp/wlan_fapi_mapping /tmp/wlan_wave/fapi_wlan_wave_logger_configured `cd /opt/lantiq/wave/images/; ls *; cd - > /dev/null`
