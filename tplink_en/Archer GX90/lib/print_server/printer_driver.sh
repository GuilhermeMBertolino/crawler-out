#!/bin/sh

start_printer_driver() {
	local lanif="$1"
	local model="$2"

	insmod GPL_NetUSB
	#insmod NetUSB bndev="$lanif" localID="$model" moduleName="$model"
	insmod NetUSB bndev="$lanif"	# "model" is written in KO
	. /lib/print_server/printer_discovery.sh
	scan_printers
}

stop_printer_driver() {
	rmmod NetUSB
	rmmod GPL_NetUSB
}
