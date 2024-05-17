#!/bin/bash
# RAXE300 gpioctl.sh

GPIO_SetPinmux(){

    GPIO=$1
    FUNC=$2
    PINMUX=4
    
    GPIO=`printf '%02X' ${GPIO}` ; echo ${GPIO}

    if [ ${FUNC} == "gpio" ]; then
        PINMUX=5
    elif [ ${FUNC} == "func" ]; then
        PINMUX=3
    else
        exit 1
    fi
    
    val=`echo 0x${PINMUX}0${GPIO}`; echo ${val}
    
    echo "Run GPIO_SetPinmux()"
    sw 0xff800554 0; sw 0xff800558 ${val}; sw 0xff80055c 0x21
    
    sw 0xff800554 0; sw 0xff800558 ${GPIO}; sw 0xff80055c 0x23; dw 0xff800560
}

GPIO_SetDir(){

    GPIO=$1
    dirAddr=0xff800500
    INOUT=$2
    SETRUN=0
    
    if [ "${GPIO}" -ge 0 ] && [ "${GPIO}" -le 31 ]; then
        dirAddr=0xff800500
    elif [ "${GPIO}" -ge 32 ] && [ "${GPIO}" -le 63 ]; then
        GPIO=`echo $((GPIO-32))`
        dirAddr=0xff800504
    else
        exit 1
    fi
    
    echo ${GPIO} ${dirAddr} ${INOUT}
    
    bit=`printf '0x%08x' $((0x1 << ${GPIO}))` ; echo ${bit}
    val=`dw ${dirAddr} | awk '{printf $3}'` ; val=`echo "0x${val}"`; echo ${val}
    
    if [ ${INOUT} == "in" ]; then
        ret=$((val&~bit)) ; ret=`printf '0x%x' ${ret}`; echo ${ret}
        SETRUN=1
    elif [ ${INOUT} == "out" ]; then
        ret=$((val|bit)) ; ret=`printf '0x%x' ${ret}`; echo ${ret}
        SETRUN=1
    else
        exit 1
    fi
    
    if [ ${SETRUN} == "1" ]; then
        echo "Run GPIO_SetDir()"
        sw ${dirAddr} ${ret}
    fi
}

GPIO_SetData(){

    GPIO=$1
    dataAddr=0xff800520
    DATA=$2
    SETRUN=0
    
    if [ "${GPIO}" -ge 0 ] && [ "${GPIO}" -le 31 ]; then
        dataAddr=0xff800520
    elif [ "${GPIO}" -ge 32 ] && [ "${GPIO}" -le 63 ]; then
        GPIO=`echo $((GPIO-32))`
        dataAddr=0xff800524
    else
        exit 1
    fi
    
    echo ${GPIO} ${dataAddr} ${DATA}
    
    bit=`printf '0x%08x' $((0x1 << ${GPIO}))` ; echo ${bit}
    val=`dw ${dataAddr} | awk '{printf $3}'` ; val=`echo "0x${val}"`; echo ${val}
    
    if [ ${DATA} == "1" ]; then
        ret=$((val&~bit)) ; ret=`printf '0x%x' ${ret}`; echo ${ret}
        SETRUN=1
    elif [ ${DATA} == "0" ]; then
        ret=$((val|bit)) ; ret=`printf '0x%x' ${ret}`; echo ${ret}
        SETRUN=1
    else
        exit 1
    fi
    
    if [ ${SETRUN} == "1" ]; then
        echo "Run GPIO_SetData()"
        sw ${dataAddr} ${ret}
    fi
}


#GPIO_SetPinmux 14 gpio
#GPIO_SetPinmux 14 func
#GPIO_SetDir 14 in
#GPIO_SetDir 14 out
#GPIO_SetData 14 1
#GPIO_SetData 14 0

ParaFunc=$1
ParaGpio=$2
ParaArg=$3

lockdir=/tmp/.gpioctrl.lock
lockcnt=1

while [ -e ${lockdir} ];
do
    usleep 100
    lockcnt=$(( ${lockcnt} + 1 ))

    if [ ${lockcnt} -ge 10 ]; then
        break
    fi
done

if [ "${ParaGpio}" -ge 0 ] && [ "${ParaGpio}" -le 63 ]; then
    echo "ParaGpio : " ${ParaGpio}
else
    echo "ParaGpio : " ${ParaGpio} "Error!! [0-63]"
    exit 1
fi

if [ ${ParaFunc} == "GPIO_SetPinmux" ]; then
    if [ ${ParaArg} == "gpio" ] || [ ${ParaArg} == "func" ]; then
        GPIO_SetPinmux ${ParaGpio} ${ParaArg}
    fi
elif [ ${ParaFunc} == "GPIO_SetDir" ]; then
    if [ ${ParaArg} == "in" ] || [ ${ParaArg} == "out" ]; then
        GPIO_SetDir ${ParaGpio} ${ParaArg}
    fi
elif [ ${ParaFunc} == "GPIO_SetData" ]; then
    if [ ${ParaArg} == "1" ] || [ ${ParaArg} == "0" ]; then
        GPIO_SetData ${ParaGpio} ${ParaArg}
    fi
else
    echo "Parameter is error!!!"
    exit 1
fi


rm -f ${lockdir}

