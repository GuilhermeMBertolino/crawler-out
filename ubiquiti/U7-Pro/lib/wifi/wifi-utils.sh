#
# Copyright (c) 2023 Qualcomm Technologies, Inc.
# All Rights Reserved.
# Confidential and Proprietary - Qualcomm Technologies, Inc.
#

. /lib/functions.sh

is_cert_enabled() {
        local enable
        config_load sigma-dut
        config_get_bool enable global enable 0
        echo "$enable"
}

get_wpad_var_run() {
	[ -f /tmp/sysinfo/board_name  ] && {
	        board_name=ap$(cat /tmp/sysinfo/board_name | awk -F 'ap' '{print$2}')
	}

	case "$board_name" in
	ap-sdxpinn*)
		# If certification is enabled, default to standard path;
		# default to ujail path, otherwise
		local cert_enabled="$(is_cert_enabled)"
		if [ "${cert_enabled}" -eq 0 ]; then
		        WPAD_VARRUN=/var/run/wpad
		else
			WPAD_VARRUN=/var/run
		fi
	;;
	*)
	        WPAD_VARRUN=/var/run
	;;
	esac

	echo "$WPAD_VARRUN"
}

get_ap_sdxpinn_ko_path() {
	release=$(uname -r | awk -F '.' '{print $1,$2}' | tr ' ' '.')
	if [ -d /lib/modules/$release-debug ]; then
		echo "/lib/modules/$release-debug/extra"
	elif [ -d /lib/modules/$release-perf ]; then
		echo "/lib/modules/$release-perf/extra"
	else
		echo ""
	fi
}

