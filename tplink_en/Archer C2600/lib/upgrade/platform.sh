#!/bin/sh
RAMFS_COPY_DATA_PLAT="/lib/*.so* /usr/lib/liblua.so* /usr/lib/libifaddrs.so /etc/init.d/logd /etc/rc.common"
RAMFS_COPY_DIR_PLAT="/usr/lib/lua /etc/config /etc/profile.d /var /lib/functions"
RAMFS_COPY_BIN_PLAT="/usr/sbin/logd /usr/bin/lua /usr/sbin/logreset /sbin/start-stop-daemon /usr/bin/nvrammanager /usr/sbin/cloud_cleanFwInfo /sbin/getfirm"

platform_check_image() {
	echo "Platform image check OK ..."
	return 0
}

platform_do_upgrade() {
	if type 'platform_upgrading_hook' >/dev/null 2>/dev/null; then
		echo "Call platform upgrading hook ..."
		platform_upgrading_hook 
	fi
	echo "Perform nvrammanager upgrading ..."
	nvrammanager -u $@
}
