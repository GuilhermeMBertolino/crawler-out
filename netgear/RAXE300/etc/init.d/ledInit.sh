#/bin/sh

sleep 10

/bin/ledSer > /dev/null 2>&1 &
sleep 2
ledCli POR MSG_LED_POWER_ON_ING; sleep 1

