#!/bin/sh

LED_RED="37"
LED_OFF="0"
LED_BLINK_TIMES="1"

result=`grep 'V30\|V03\|v30\|v03' /proc/version |awk -F '#' '/AC1200/{printf $2}'`
if [ "$?" == "0" ];then
	LED_GREEN="41"
else
	LED_GREEN="57"
fi

echo "led test" > /tmp/led_test.txt
sleep 1
echo ${LED_RED} ${LED_OFF} ${LED_BLINK_TIMES} > /proc/led_ctrl
echo ${LED_GREEN} ${LED_OFF} ${LED_BLINK_TIMES} > /proc/led_ctrl
