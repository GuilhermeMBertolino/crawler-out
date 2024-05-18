[ ! "$LIB_COMMON_SOURCED" ] && . /opt/lantiq/wave/scripts/fapi_wlan_wave_lib_common.sh
cd /tmp
cp -s /opt/lantiq/lib/modules/3.10.104/net/mtlkroot.ko /tmp/
cp -s /opt/lantiq/bin/fw_scd_file.scd /tmp/
cp -s /opt/lantiq/bin/hw_scd_file.scd /tmp/
cp -s /opt/lantiq/lib/modules/3.10.104/net/mtlk.ko /tmp/
cp -s /opt/lantiq/wave/images/* /tmp/
ln -sf /opt/lantiq/wave/confs /tmp/
if [ -d /nvram/etc/wave_overlay ]
then
	for f in /nvram/etc/wave_overlay/*
	do
		echo "NOTE:  Overriding  ${f#/nvram/etc/wave_overlay/}" with file from wave_overlay
		cp -s $f /tmp
	done
fi
echo /opt/lantiq/sbin/hotplug > /proc/sys/kernel/hotplug
udevd_running=`is_process_running udevd`
[ $udevd_running -eq 1 ] || udevd --daemon
export COUNTRY=00
crda
touch /tmp/wlan_wave/crda_executed
insmod mtlkroot.ko
cp -s /opt/lantiq/bin/logserver /tmp/
/tmp/logserver -f /tmp/dev/mtlkroot0 -s /tmp/fw_scd_file.scd &
if [ ! -e /tmp/cal_wlan0.bin ]
then
	read_img wlanconfig /tmp/eeprom.tar.gz
	tar xzf /tmp/eeprom.tar.gz -C /tmp/
	tar xzf /tmp/eeprom.tar.gz -C /lib/firmware/
	cp /opt/lantiq/wave/images/* /lib/firmware
fi
[ -z $(pgrep -x ${USRSBINDIR}/fapi_wave_recoveryd) ] && ${USRSBINDIR}/fapi_wave_recoveryd &
rcvry_timeout=0
while [ -z $(pgrep -x ${USRSBINDIR}/fapi_wave_recoveryd) ] && [ $rcvry_timeout -lt 15 ]
do
echo "RCVRY:FAPI SOCKET INIT in progress wait $rcvry_timeout of 15" >>/dev/console
let rcvry_timeout=$((rcvry_timeout+1))
done
insmod mtlk.ko  fastpath=1,1 ahb_off=1 loggersid=255,255  dual_pci=1,0 rcvry_on=1,1
head -8 cat /proc/net/mtlk/version
iw wlan0 iwlwav gEEPROM > /opt/lantiq/wave/confs/eeprom_info
. /tmp/wlan_wave/fapi_wlan_wave_discover.txt
[ $TOTAL_WLAN_COUNT -ge 2 ] && iw wlan2 iwlwav gEEPROM >> /opt/lantiq/wave/confs/eeprom_info
cd - > /dev/null
