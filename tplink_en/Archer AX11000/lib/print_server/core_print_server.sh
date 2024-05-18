# Copyright(c) 2011-2014 Shenzhen TP-LINK Technologies Co.Ltd.

. /lib/config/uci.sh
. /lib/print_server/printer_driver.sh
transform_for_space()
{
	echo \"$@\"
}

get_ifname()
{
	local interface="$1"
	
	. /usr/share/libubox/jshn.sh
	json_init
	json_load "`ubus call network.interface.$interface status`"
	json_get_var device device
	
	echo $device
}

start_print_server() {
	config_load usbshare
	config_get printer "global" printer "on"

	local lanif="$(get_ifname lan)"
	local model="$(uci get system.@system[0].hostname)"
	
	if [ "$printer" = "on" ]
	then
		model=$(transform_for_space "$model")
		start_printer_driver "$lanif" "$model"
	fi
}

stop_print_server() {
	config_load usbshare
	config_get printer global printer "off"

	if [ "$printer" = "off" ]
	then
		stop_printer_driver
	fi
}

