#!/bin/sh

CONFIG=/bin/config
board_hw_id="$(/sbin/artmtd -r board_hw_id | cut -f 2 -d ":" | awk -F'+' '{print $NF}')"
common_hw_id="$(/sbin/artmtd -r board_hw_id | cut -f 2 -d ":" | cut -f -4 -d "+")"
common_model_id="$(/sbin/artmtd -r board_model_id | cut -f 2 -d ":")"

/sbin/artmtd -r region
firmware_region=`cat /tmp/firmware_region | awk '{print $1}'`

reset_module_name()
{
	MODULE_NAME="$1"
	COMMON_MODULE_NAME="$2"

	echo "$MODULE_NAME" > /module_name
	echo "$MODULE_NAME" > /hardware_version

	if [ "x$($CONFIG get board_region_default)" = "x1" ]; then
		$CONFIG set wan_hostname="$MODULE_NAME"
		$CONFIG set netbiosname="$MODULE_NAME"
		$CONFIG set Device_name="$MODULE_NAME"
		$CONFIG set upnp_serverName="$MODULE_NAME"
	fi

	[ `$CONFIG get ap_netbiosname` != "$MODULE_NAME" ] && $CONFIG set ap_netbiosname="$MODULE_NAME"
	[ `$CONFIG get bridge_netbiosname` != "$MODULE_NAME" ] && $CONFIG set bridge_netbiosname="$MODULE_NAME"

	# zebra configure
	sed -i "s/$COMMON_MODULE_NAME/$MODULE_NAME/g" /etc/zebra.conf
	sed -i "s/$COMMON_MODULE_NAME/$MODULE_NAME/g" /etc/ripngd.conf

	# net-cgi configure
	$CONFIG set dgc_upg_mod="$common_model_id"
	$CONFIG set dgc_hw_id="$common_hw_id"
}

#When board_model_id on HW board data area is RAX70
if [ "$board_hw_id" = "RAX70" ];then
	reset_module_name "RAX70" "RAX7xseries"
fi

#When board_model_id on HW board data area is RAX78
if [ "$board_hw_id" = "RAX78" ];then
	reset_module_name "RAX78" "RAX7xseries"
fi

if [ "$board_hw_id" = "RAX10" ];then
	reset_module_name "RAX10" "RAX1xseries"
fi

if [ "$board_hw_id" = "RAX10v2" ];then
	reset_module_name "RAX10v2" "RAX1xseries"
fi

if [ "$board_hw_id" = "RAX36S" ];then
	reset_module_name "RAX36S" "RAX1xseries"
fi

if [ "$board_hw_id" = "R6700AXv2" ];then
	reset_module_name "R6700AXv2" "RAX1xseries"
fi
