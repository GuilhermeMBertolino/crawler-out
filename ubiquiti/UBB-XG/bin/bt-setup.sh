#!/bin/sh

usage () {
	echo "$1 is for Bluetooth initialization."
	echo "Usage: $1 { load [ -n NAME ] [ -m MAC ] | unload }"
	echo " load"
	echo "  -n      : device name. (default: eth0 mac address)"
	echo "  -m      : hci mac address"
	echo " unload"
	echo ""
	echo "$1 version - 20200826"
}

SYSTEM_CFG="/tmp/system.cfg"
BOARD_INFO="/etc/board.info"
BT_RUN_LOCK="/var/run/bt_executed"
BT_DIABLED_FLAG="/var/run/bt_disabled"

UUID_FACTORY_KEY="uuid.factory.default"
BOARD_MODEL_FULL_KEY="board.name"
BOARD_MODEL_SHORT_KEY="board.shortname"

if [ "$1" = "load" ]; then
	if [ -f ${BT_RUN_LOCK} ]; then
		exit 1
	fi

	if [ -f ${BT_DIABLED_FLAG} ]; then
		rm ${BT_DIABLED_FLAG}
	fi

	shift
	while [ $# -gt 0 ]
	do
		key="$1"
		case $key in
			-n|--name)
				NAME="$2"
				shift
				;;
			-m|--mac)
				MAC="$2"
				shift
				;;
			-h|--help)
				usage $0
				exit 0
				;;
			*)
				# unknown option
				;;
		esac
		shift
	done

	BLE_SERVICE_UUID_FACTORY_DEFAULT=`grep "${UUID_FACTORY_KEY}" "${BOARD_INFO}" | awk -F'=' '{print $2}'`

	if [ "$BLE_SERVICE_UUID_FACTORY_DEFAULT" = "0" -o -z $BLE_SERVICE_UUID_FACTORY_DEFAULT ]; then
		echo "No Bluetooth support on this device"
		exit 1
	fi

	BLE_FAST_CHECK=`hciconfig | grep hci | wc -l`

	if [ "${BLE_FAST_CHECK}" -eq "0" ]; then
		echo "Bluetooth device is not found"
		exit 1
	fi

	if [ ! -z ${MAC} ] && [ "${MAC}" != "$(hcitool dev | grep -o "[[:xdigit:]:]\{11,17\}")" ]; then
		echo "Setting BT MAC address "${MAC}
		btmgmt -i hci0 power on
		bdaddr -i hci0 -rt "$MAC" > /dev/null 2>&1

		sleep 1

		# restart BLE device
		btmgmt -i hci0 power off
		#btmgmt -i hci0 power on
	fi

	BLE_DEVICE_NAME=`grep "${BOARD_MODEL_FULL_KEY}" "${BOARD_INFO}" | awk -F'=' '{print $2}'`
	BLE_DEVICE_SHORT_NAME=`grep "${BOARD_MODEL_SHORT_KEY}" "${BOARD_INFO}" | awk -F'=' '{print $2}'`

	echo "Setting BT device name "${BLE_DEVICE_NAME}"/"${BLE_DEVICE_SHORT_NAME}

	btmgmt -i hci0 name "${BLE_DEVICE_NAME}" "${BLE_DEVICE_SHORT_NAME}"
	btmgmt -i hci0 le on
	btmgmt -i hci0 bredr off
	btmgmt -i hci0 connectable off

	btmgmt -i hci0 power on

	touch ${BT_RUN_LOCK}

elif [ "$1" = "unload" ]; then
	if [ -f ${BT_RUN_LOCK} ]; then
		rm /${BT_RUN_LOCK}
	fi

	if [ -f ${BT_DIABLED_FLAG} ]; then
		rm ${BT_DIABLED_FLAG}
	fi

	btmgmt -i hci0 power off
elif [ "$1" = "disable" ]; then
	if [ -f ${BT_DIABLED_FLAG} ]; then
		exit 1
	fi

	if [ -f ${BT_RUN_LOCK} ]; then
		rm /${BT_RUN_LOCK}
	fi

	btmgmt -i hci0 power off

	touch ${BT_DIABLED_FLAG}
else
	usage $0
	exit 0
fi
