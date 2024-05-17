#!/bin/sh

# Boot Bluetooth SoC into Device Firmware Upgrade mode

set -e

name=$(basename $0)

debug()
{
	logger -t "$name" -p user.debug "$@"
}

RST_PIN_NR=13
BOOT_PIN_NR=14
GPIO="/sys/class/gpio"

export_pin() {
	[ -d "$GPIO/gpio$1" ] || echo $1 > $GPIO/export
}

set_pin_direction() {
	echo "$2" > $GPIO/gpio$1/direction
}

set_pin_value() {
	echo "$2" > $GPIO/gpio$1/value
}

unexport_pin() {
	echo $1 > $GPIO/unexport
}

debug "Prepare RST ($RST_PIN_NR) and BOOT ($BOOT_PIN_NR) pins"
export_pin $RST_PIN_NR
export_pin $BOOT_PIN_NR
set_pin_direction $RST_PIN_NR "out"
set_pin_direction $BOOT_PIN_NR "out"

debug "Hold reset state (to enter bootloader)"
set_pin_value $BOOT_PIN_NR 0
set_pin_value $RST_PIN_NR 0
sleep 1

debug "Release from reset"
set_pin_value $RST_PIN_NR 1
sleep 1
set_pin_value $BOOT_PIN_NR 1

debug "Cleanup RST ($RST_PIN_NR) and BOOT ($BOOT_PIN_NR) pins"
unexport_pin $RST_PIN_NR
unexport_pin $BOOT_PIN_NR
