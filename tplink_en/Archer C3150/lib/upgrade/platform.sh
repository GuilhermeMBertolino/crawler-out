#!/bin/sh
RAMFS_COPY_DATA_PLAT="/lib/*.so*"
RAMFS_COPY_DIR_PLAT="/bin /usr/bin /usr/sbin /sbin /etc /lib"
RAMFS_COPY_BIN_PLAT="/sbin/writeflash /sbin/nvram /usr/bin/tftp /sbin/getty /bin/login"

platform_check_image() {
	echo "Platform image check OK ..."
	return 0
}

platform_do_upgrade() {
	if type 'platform_upgrading_hook' >/dev/null 2>/dev/null; then
		echo "Call platform upgrading hook ..."
		platform_upgrading_hook 
	fi
	echo "Perform writeflash upgrading ..."
	writeflash -u /tmp/firmware_upgrade.bin
}
