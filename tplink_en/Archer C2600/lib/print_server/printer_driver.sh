#!/bin/sh

start_printer_driver() {
	local lanif="$1"
	local kcodes_dir=/lib/modules/kcodes

	[ -d /sys/module/GPL_NetUSB ] || insmod ${kcodes_dir}/GPL_NetUSB.ko
	[ -d /sys/module/NetUSB ] || insmod ${kcodes_dir}/NetUSB.ko bndev="$lanif"
}

stop_printer_driver() {
	[ -d /sys/module/NetUSB ] && rmmod NetUSB
	[ -d /sys/module/GPL_NetUSB ] && rmmod GPL_NetUSB
}

