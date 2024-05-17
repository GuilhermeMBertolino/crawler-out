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

function setFlowControl()
{
    echo "Setting flow control enable:"

    is1GEn="`getdb -g Device.X_PEGATRON_COM_EthernetSetting.InternetPort_1G_FlowCtrl_Enable`"
    echo "  InternetPort_1G_FlowCtrl_Enable = " ${is1GEn}
    if [ ${is1GEn} = "1" ]; then
        ethswctl -c pause -n 0 -p 0 -v 2
    else
        ethswctl -c pause -n 0 -p 0 -v 0
    fi

    isMultiGEn="`getdb -g Device.X_PEGATRON_COM_EthernetSetting.InternetPort_MultiG_FlowCtrl_Enable`"
    echo "  InternetPort_MultiG_FlowCtrl_Enable = " ${isMultiGEn}
    if [ ${isMultiGEn} = "1" ]; then
        ethswctl -c pause -n 0 -p 5 -v 2
    else
        ethswctl -c pause -n 0 -p 5 -v 0
    fi

    echo "  External 53134 = 1"
    ethswctl -c pause -n 0 -p 6 -v 2

    isLan1En="`getdb -g Device.X_PEGATRON_COM_EthernetSetting.LanPort_1_FlowCtrl_Enable`"
    echo "  LanPort_1_FlowCtrl_Enable = " ${isLan1En}
    if [ ${isLan1En} = "1" ]; then
        ethswctl -c pause -n 1 -p 3 -v 2
    else
        ethswctl -c pause -n 1 -p 3 -v 0
    fi

    isLan2En="`getdb -g Device.X_PEGATRON_COM_EthernetSetting.LanPort_2_FlowCtrl_Enable`"
    echo "  LanPort_2_FlowCtrl_Enable = " ${isLan2En}
    if [ ${isLan2En} = "1" ]; then
        ethswctl -c pause -n 1 -p 2 -v 2
    else
        ethswctl -c pause -n 1 -p 2 -v 0
    fi

    isLan3En="`getdb -g Device.X_PEGATRON_COM_EthernetSetting.LanPort_3_FlowCtrl_Enable`"
    echo "  LanPort_3_FlowCtrl_Enable = " ${isLan3En}
    if [ ${isLan3En} = "1" ]; then
        ethswctl -c pause -n 1 -p 1 -v 2
    else
        ethswctl -c pause -n 1 -p 1 -v 0
    fi

    isLan4En="`getdb -g Device.X_PEGATRON_COM_EthernetSetting.LanPort_4_FlowCtrl_Enable`"
    echo "  LanPort_4_FlowCtrl_Enable = " ${isLan4En}
    if [ ${isLan4En} = "1" ]; then
        ethswctl -c pause -n 1 -p 0 -v 2
    else
        ethswctl -c pause -n 1 -p 0 -v 0
    fi
}

case "$1" in
    start)
        echo "PEGA post initial..."
        # Set the max ethernet frame to 1518 (no jombo frame)
        ethswctl -c regaccess -v 0x4005 -l 2 -d 1518 -n 1
        ethswctl -c pmdioaccess -x 0x4005 -l 2 -d 1518

        ledCli POR MSG_LED_POWER_READY; sleep 1

        wl -i wl0 ledbh 13 13
        wl -i wl1 ledbh 12 0
        wl -i wl2 ledbh 10 0

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

	# Disable BCM6715 AVS function for RAXE300
	wl -i wl0 avs_disable

	# Convert US country rev to country code in firmware.
	country_code_fw="639"
	country_code=`nvram get wl0_country_code`
	country_rev=`nvram get wl0_country_rev`
	if [ $country_code == "US" ] && [ $country_rev != $country_code_fw ]; then
		echo "Covert US country code rev to $country_code_fw....."
		nvram set wl0_country_rev=$country_code_fw
		nvram set wl1_country_rev=$country_code_fw
		nvram set wl2_country_rev=$country_code_fw
		nvram commit;nvram commit
		sleep 10
		nvram restart
	fi

        # Add wl2_txbcn_timeout to pass CBP tests
        txbcn_timeout=`nvram get wl2_txbcn_timeout`
        if [ $country_code == "US" ] && [ -z "$txbcn_timeout" ]; then
            echo "Add wl2_txbcn_timeout"
            nvram set wl2_txbcn_timeout=0
            nvram commit;nvram commit
            sleep 10
            nvram restart
        fi

        blank="`getdb -g Device.X_PEGATRON_COM_DeviceInfo.BlankState`"
        echo "IS BLANK = " ${blank}

        if [ ${blank} = "1" ]; then
            sleep 10

            if [ -f "/tmp/WanNeedChange" ]; then
                echo "/tmp/WanNeedChange exist"
                wansetting eth1 &
            fi
        else
            ip6tables -w -t filter -D OUTPUT -p icmpv6 -j DROP
        fi

        setFlowControl

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

