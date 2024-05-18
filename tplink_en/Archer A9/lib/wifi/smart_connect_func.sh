#!/bin/sh
. /lib/debug/dbg
. /lib/functions/service.sh
. /lib/functions/lbd-config.sh

SMARTC_CONFIG_FILE="/tmp/smartconnect.conf"
SMARTC_PATH="/usr/sbin/lbd"
SMARTC_RUN_FILE="/var/run/.smartconnect"

check_wifi_status() {
	local wifi_idx disabled_all band disabled
	wifi_idx=$1
	config_get disabled_all "$wifi_idx" disabled_all
	config_get band "$wifi_idx" band
	config_get disabled "$wifi_idx" disabled

	if [ "$band" = "2g" ];then
		if [ "$disabled_all" = "on" -o "$disabled" = "on" ];then
			band_24g=0
		else
			band_24g=1
		fi
	fi

	if [ "$band" = "5g" ];then
		if [ "$disabled_all" = "on" -o "$disabled" = "on" ];then
			band_5g=0
		else
			band_5g=1
		fi
	fi
}

check_bands() {
	config_foreach check_wifi_status wifi-device
	if [ "$band_24g" = "1" ] && [ "$band_5g" = "1" ]; then
		dual_bands=1
	else
		dual_bands=0
	fi
}

wifi_smart_stop() {
	service_stop ${SMARTC_PATH}

	# Workaround, sometimes service_stop does not kill lbd
	start-stop-daemon -K -x ${SMARTC_PATH} -s SIGKILL > /dev/null
	rm -rf "$SMARTC_RUN_FILE" "$SMARTC_CONFIG_FILE"
}

wifi_smart_start() {
	wifi_smart_stop

	check_bands
	if [ "$dual_bands" -ne "1" ]; then
		echo "require both 2.4 GHz and 5 GHz to be configured. Aborting start."
		return 1
	fi

	# Create configuration file and start lbd 
	[ -f "$SMARTC_RUN_FILE" ] && return
	lbd_create_config $SMARTC_CONFIG_FILE 0 # second param indicates running in single AP mode
	service_start ${SMARTC_PATH} -C "$SMARTC_CONFIG_FILE"
	touch $SMARTC_RUN_FILE                                                                                   
}
