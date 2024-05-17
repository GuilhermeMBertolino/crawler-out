#!/bin/sh

# Move below commands into boot script to collect more console log
echo 1 > /sys/devices/platform/periph/ff812000.serial0/console
/sbin/console_log.sh &
/bin/config set netscan_debug=1
/bin/nvram set ceventd_log_console=1
/bin/nvram commit
killall ceventd
/bin/ceventd &

/sbin/basic_log.sh &
/sbin/wlandebug.sh &
/sbin/usbdebug.sh &
/sbin/capture_packet.sh 
/sbin/debug_circle.sh &
/opt/bitdefender/share/scripts/archive_logs.sh &
/sbin/firewall_debug.sh &
