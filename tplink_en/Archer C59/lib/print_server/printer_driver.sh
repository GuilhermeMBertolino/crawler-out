#!/bin/sh
start_printer_driver() {	
	local lanif="$1"
	local kcodes_dir=/lib/modules/kcodes
	insmod ${kcodes_dir}/GPL_NetUSB.ko
	insmod ${kcodes_dir}/NetUSB.ko bndev="$lanif"
}

stop_printer_driver() {
	rmmod GPL_NetUSB
	rmmod NetUSB
}
