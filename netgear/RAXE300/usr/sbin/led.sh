#!/bin/bash
# RAXE300 led.sh

EXE="/usr/sbin/gpioctl.sh"

Set_power(){
    echo "Set_power"
    GPIO=3
    ACTION=$1
    VAL=$2
    ${EXE} GPIO_SetData ${GPIO} ${VAL}
}

Set_thermal(){
    echo "Set_thermal"
    GPIO=5
    ACTION=$1
    VAL=$2
    ${EXE} GPIO_SetData ${GPIO} ${VAL}
}

Set_wan_white(){
    echo "Set_wan_white"
    GPIO=0
    ACTION=$1
    VAL=$2
    if [ ${ACTION} == "func" ] || [ ${ACTION} == "blink" ]; then
        ${EXE} GPIO_SetPinmux ${GPIO} func
    elif [ ${ACTION} == "gpio" ]; then
        ${EXE} GPIO_SetPinmux ${GPIO} gpio
        ${EXE} GPIO_SetDir ${GPIO} out
        ${EXE} GPIO_SetData ${GPIO} ${VAL}
    fi
}

Set_wan_amber(){
    echo "Set_wan_amber"
    GPIO=18
    ACTION=$1
    VAL=$2
    if [ ${ACTION} == "func" ] || [ ${ACTION} == "blink" ]; then
        ${EXE} GPIO_SetPinmux ${GPIO} func
    elif [ ${ACTION} == "gpio" ]; then
        ${EXE} GPIO_SetPinmux ${GPIO} gpio
        ${EXE} GPIO_SetDir ${GPIO} out
        ${EXE} GPIO_SetData ${GPIO} ${VAL}
    fi
}

Set_wifi2g(){
    echo "Set_wifi2g"
    wlif="wl1"
    GPIO=12
    ACTION=$1
    VAL=$2
    if [ ${ACTION} == "func" ] || [ ${ACTION} == "blink" ]; then
        wl -i ${wlif} ledbh ${GPIO} 13
    elif [ ${ACTION} == "gpio" ]; then
        if [ ${VAL} == "0" ]; then
            wl -i ${wlif} ledbh ${GPIO} 0
        elif [ ${VAL} == "1" ]; then
            wl -i ${wlif} ledbh ${GPIO} 22
        fi
    fi
}

Set_wifi5g(){
    echo "Set_wifi5g"
    wlif="wl0"
    GPIO=13
    ACTION=$1
    VAL=$2
    if [ ${ACTION} == "func" ] || [ ${ACTION} == "blink" ]; then
        wl -i ${wlif} ledbh ${GPIO} 13
    elif [ ${ACTION} == "gpio" ]; then
        if [ ${VAL} == "0" ]; then
            wl -i ${wlif} ledbh ${GPIO} 0
        elif [ ${VAL} == "1" ]; then
            wl -i ${wlif} ledbh ${GPIO} 22
        fi
    fi
}

Set_wifi6g(){
    echo "Set_wifi6g"
    wlif="wl2"
    GPIO=11
    ACTION=$1
    VAL=$2
    if [ ${ACTION} == "func" ] || [ ${ACTION} == "blink" ]; then
        wl -i ${wlif} ledbh ${GPIO} 13
    elif [ ${ACTION} == "gpio" ]; then
        if [ ${VAL} == "0" ]; then
            wl -i ${wlif} ledbh ${GPIO} 0
        elif [ ${VAL} == "1" ]; then
            wl -i ${wlif} ledbh ${GPIO} 22
        fi
    fi
}

Set_lan1(){
    echo "Set_lan1"
}

Set_lan5_white(){
    echo "Set_lan5_white"
    GPIO=23
    ACTION=$1
    VAL=$2
    if [ ${ACTION} == "func" ] || [ ${ACTION} == "blink" ]; then
        ${EXE} GPIO_SetPinmux ${GPIO} func
    elif [ ${ACTION} == "gpio" ]; then
        ${EXE} GPIO_SetPinmux ${GPIO} gpio
        ${EXE} GPIO_SetDir ${GPIO} out
        ${EXE} GPIO_SetData ${GPIO} ${VAL}
    fi
}

Set_lan5_amber(){
    echo "Set_lan5_amber"
    GPIO=10
    ACTION=$1
    VAL=$2
    if [ ${ACTION} == "func" ] || [ ${ACTION} == "blink" ]; then
        ${EXE} GPIO_SetPinmux ${GPIO} func
    elif [ ${ACTION} == "gpio" ]; then
        ${EXE} GPIO_SetPinmux ${GPIO} gpio
        ${EXE} GPIO_SetDir ${GPIO} out
        ${EXE} GPIO_SetData ${GPIO} ${VAL}
    fi
}

Set_wifionoff(){
    echo "Set_wifionoff"
    GPIO=7
    ACTION=$1
    VAL=$2
    ${EXE} GPIO_SetData ${GPIO} ${VAL}
}

Set_usb(){
    echo "Set_usb"
    GPIO=15
    ACTION=$1
    VAL=$2
    ${EXE} GPIO_SetData ${GPIO} ${VAL}
}

Set_wps(){
    echo "Set_wps"
    GPIO=14
    ACTION=$1
    VAL=$2
    ${EXE} GPIO_SetData ${GPIO} ${VAL}
}

Set_allctl(){
    echo "Set_allctl"
    GPIO=39
    ACTION=$1
    VAL=$2
    ${EXE} GPIO_SetData ${GPIO} ${VAL}
}


#LEDName="Power"
#LEDAction="gpio" // func(blink)
#LEDVal="1"

LEDName=$1
LEDAction=$2
LEDVal=$3

echo ${LEDName} ${LEDAction} ${LEDVal}

lockdir=/tmp/.ledctrl.lock
lockcnt=1

while [ -e ${lockdir} ];
do
    usleep 100
    lockcnt=$(( ${lockcnt} + 1 ))

    if [ ${lockcnt} -ge 10 ]; then
        break
    fi
done

touch ${lockdir}

if [ ${LEDName} == "power" ]; then
    echo "power"
    if [ ${LEDVal} == "0" ] || [ ${LEDVal} == "1" ]; then
        Set_power ${LEDAction} ${LEDVal}
    fi
elif [ ${LEDName} == "thermal" ]; then
    echo "thermal"
    if [ ${LEDVal} == "0" ] || [ ${LEDVal} == "1" ]; then
        Set_thermal ${LEDAction} ${LEDVal}
    fi
elif [ ${LEDName} == "wanwhite" ]; then
    echo "wanwhite"
    if [ ${LEDAction} == "func" ] || [ ${LEDAction} == "blink" ] || [ ${LEDAction} == "gpio" ]; then
        if [ ${LEDVal} == "0" ] || [ ${LEDVal} == "1" ]; then
            Set_wan_white ${LEDAction} ${LEDVal}
        fi
    fi
elif [ ${LEDName} == "wanamber" ]; then
    echo "wanwhite"
    if [ ${LEDAction} == "func" ] || [ ${LEDAction} == "blink" ] || [ ${LEDAction} == "gpio" ]; then
        if [ ${LEDVal} == "0" ] || [ ${LEDVal} == "1" ]; then
            Set_wan_amber ${LEDAction} ${LEDVal}
        fi
    fi
elif [ ${LEDName} == "wifi2g" ]; then
    echo "wifi2g"
    if [ ${LEDAction} == "func" ] || [ ${LEDAction} == "blink" ]; then
        Set_wifi2g ${LEDAction} ${LEDVal}
    elif [ ${LEDAction} == "gpio" ]; then
        if [ ${LEDVal} == "0" ] || [ ${LEDVal} == "1" ]; then
            Set_wifi2g ${LEDAction} ${LEDVal}
        fi
    fi
elif [ ${LEDName} == "wifi5g" ]; then
    echo "wifi5g"
    if [ ${LEDAction} == "func" ] || [ ${LEDAction} == "blink" ]; then
        Set_wifi5g ${LEDAction} ${LEDVal}
    elif [ ${LEDAction} == "gpio" ]; then
        if [ ${LEDVal} == "0" ] || [ ${LEDVal} == "1" ]; then
            Set_wifi5g ${LEDAction} ${LEDVal}
        fi
    fi
elif [ ${LEDName} == "wifi6g" ]; then
    echo "wifi6g"
    if [ ${LEDAction} == "func" ] || [ ${LEDAction} == "blink" ]; then
        Set_wifi6g ${LEDAction} ${LEDVal}
    elif [ ${LEDAction} == "gpio" ]; then
        if [ ${LEDVal} == "0" ] || [ ${LEDVal} == "1" ]; then
            Set_wifi6g ${LEDAction} ${LEDVal}
        fi
    fi
elif [ ${LEDName} == "lan5white" ]; then
    echo "lan5white"
    if [ ${LEDAction} == "func" ] || [ ${LEDAction} == "blink" ] || [ ${LEDAction} == "gpio" ]; then
        if [ ${LEDVal} == "0" ] || [ ${LEDVal} == "1" ]; then
            Set_lan5_white ${LEDAction} ${LEDVal}
        fi
    fi
elif [ ${LEDName} == "lan5amber" ]; then
    echo "lan5amber"
    if [ ${LEDAction} == "func" ] || [ ${LEDAction} == "blink" ] || [ ${LEDAction} == "gpio" ]; then
        if [ ${LEDVal} == "0" ] || [ ${LEDVal} == "1" ]; then
            Set_lan5_amber ${LEDAction} ${LEDVal}
        fi
    fi
elif [ ${LEDName} == "wifionoff" ]; then
    echo "wifionoff"
    if [ ${LEDVal} == "0" ] || [ ${LEDVal} == "1" ]; then
        Set_wifionoff ${LEDAction} ${LEDVal}
    fi
elif [ ${LEDName} == "usb" ]; then
    echo "usb"
    if [ ${LEDVal} == "0" ] || [ ${LEDVal} == "1" ]; then
        Set_usb ${LEDAction} ${LEDVal}
    fi
elif [ ${LEDName} == "wps" ]; then
    echo "wps"
    if [ ${LEDVal} == "0" ] || [ ${LEDVal} == "1" ]; then
        Set_wps ${LEDAction} ${LEDVal}
    fi
elif [ ${LEDName} == "allctl" ]; then
    echo "allctl"
    if [ ${LEDVal} == "0" ] || [ ${LEDVal} == "1" ]; then
        Set_allctl ${LEDAction} ${LEDVal}
    fi
else
    echo "led.sh power gpio 0/1"
    echo "led.sh thermal gpio 0/1"
    echo "led.sh wanwhite func 0"
    echo "led.sh wanwhite gpio 0/1"
    echo "led.sh wanamber func 0"
    echo "led.sh wanamber gpio 0/1"
    echo "led.sh wifi5g blink"
    echo "led.sh wifi5g gpio 0/1"
    echo "led.sh lan5white func 0"
    echo "led.sh lan5white gpio 0/1"
    echo "led.sh lan5amber func 0"
    echo "led.sh lan5amber gpio 0/1"
    echo "led.sh wifionoff gpio 0/1"
    echo "led.sh usb gpio 0/1"
    echo "led.sh wps gpio 0/1"
    echo "led.sh allctl gpio 0/1"
fi

rm -f ${lockdir}

