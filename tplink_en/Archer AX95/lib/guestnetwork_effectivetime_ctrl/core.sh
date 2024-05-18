# Copyright (C) 2009-2010 OpenWrt.org

PC_LIBDIR=${PC_LIBDIR:-/lib/guestnetwork_effectivetime_ctrl}
include /lib/network

for file in $PC_LIBDIR/core_*.sh; do
	. $file
done

gec_start() {
	echo "loading gec"
	gec_load
}

gec_stop() {
	echo "exiting qos"
	gec_exit
}

gec_restart() {
	gec_stop
	gec_start
}

gec_check() {
	# start check time
	gec_check_time
}
