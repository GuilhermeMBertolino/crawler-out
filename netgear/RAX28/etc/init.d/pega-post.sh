#!/bin/sh

#process_iQoS() {
#other process will hande bcmiqosd start when booting. Don't dublicate this action.
#    DL_BW="$(getdb -g Device.X_PEGATRON_COM_IQOS.DownloadSpeed)";
#    UL_BW="$(getdb -g Device.X_PEGATRON_COM_IQOS.UploadSpeed)";
#    speed_method="$(getdb -g Device.X_PEGATRON_COM_IQOS.SpeedMode)";
#    iQoS_enabled="$(getdb -g getdb -g Device.X_PEGATRON_COM_IQOS.Enable)";
#echo "DL_BW=$DL_BW";
#echo "UL_BW=$UL_BW";
#echo "speed_method=$speed_method";
#echo "iQoS_enabled=$iQoS_enabled";
#    #For now, no matter manually key-in the bandwidth or it's the result from speed test API. We all saved it in data model.
#    #if [ "$speed_method" = "manually" ]; then
#        sed -i "/ceil_down/c ceil_down=${DL_BW}kbps" /data/iqos/qos.conf
#        sed -i "/ceil_up/c ceil_up=${UL_BW}kbps" /data/iqos/qos.conf
#    #fi
#    if [ "$iQoS_enabled" = "1" ]; then
#        /usr/sbin/setup.sh eth4.1;
#        sleep 2; #Sleep 2 seconds to avoid tc rule create failed.
#        /usr/sbin/bcmiqosd start;
#    fi
#}

function setProtectionEngine()
{
    isEnable="`getdb -g Device.X_PEGATRON_COM_ProtectionEngine.Enable`"
    echo "Router Protection Engine = " ${isEnable}
    if [ ${isEnable} = "1" ]; then
        d2 -c featuresVersion.routerProtection "on"
        getdb --bd_rpe_enable
    else
        getdb --bd_rpe_disable
        d2 -c featuresVersion.routerProtection "off"
    fi
}

case "$1" in
    start)
        echo "PEGA post initial..."
        # Set the max ethernet frame to 1518 (no jombo frame)
        ethswctl -c regaccess -l 2 -n 0 -v 0x4005 -d 1518

        # Enable all LEDs
        #echo 1 > /sys/class/leds/led_all_control/brightness

        # Enable power white led
        #echo 1 > /sys/class/leds/led_power/brightness

        ledCli POR MSG_LED_POWER_READY; sleep 1

        #Initial check usb is puluin
        USBPATH=`mount | grep 'mnt/disk' | awk '{print $3}'`
        if [ -d "$USBPATH" ]; then
            ledCli USB MSG_LED_USB_PLUGIN
        fi

        AllLed_Status="`getdb -g Device.X_PEGATRON_COM_DeviceInfo.AllLedOnOff`"
        echo "AllLed_Status = " ${AllLed_Status}
        if [ ${AllLed_Status} = "0" ]; then
            ledCli ALLSW MSG_LED_ALL_SW_OFF
        else
            ledCli ALLSW MSG_LED_ALL_SW_ON
        fi

        # Enable LED message process
        ledCli WAN MSG_LED_WAN_RUN

        # Change the console only show log level > 4 
	# To prevent much port forwarding log at console and impact Endurence test script
	echo 4 > /proc/sys/kernel/printk

	# Disable BCM5710 AVS function for RAX30
	wl -i wl1 avs_disable

	# Convert US country rev from 665 to 657
	country_code=`nvram get wl0_country_code`
	country_rev=`nvram get wl0_country_rev`
	if [ $country_code == "US" ] && [ $country_rev != "657" ]; then
		echo "Covert US country code rev to 657....."
		nvram set wl0_country_rev=657
		nvram set wl1_country_rev=657
		nvram commit;nvram commit
		sleep 10
		nvram restart
	fi

	# Convert 2.4G Max assoc to 128
	bss_maxassoc=`nvram get wl0_bss_maxassoc`
	if [ $bss_maxassoc == "64" ]; then
		echo "Covert wl0_bss_maxassoc from 64 to 128....."
		nvram set wl0_bss_maxassoc=128
		nvram commit;nvram commit
		sleep 10
		nvram restart
	fi

        # [JIRA#RAXE300-98] DUT always fail to detect Comcast DHCP cable internet
        blank="`getdb -g Device.X_PEGATRON_COM_DeviceInfo.BlankState`"
        echo "IS BLANK = " ${blank}

        if [ ${blank} != "1" ]; then
            ip6tables -w -t filter -D OUTPUT -p icmpv6 -j DROP
        fi

        setProtectionEngine

	debug_boot.sh

        echo "Drop caches first..."
        echo 3 > /proc/sys/vm/drop_caches

        exit 0
        ;;

    stop)
        echo "Unconfig PEGA post initial not implemented..."
        exit 1
        ;;

    *)
        echo "$0: unrecognized option $1"
        exit 1
        ;;

    esac

