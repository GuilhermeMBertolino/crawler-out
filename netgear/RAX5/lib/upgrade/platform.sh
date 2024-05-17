#
# Copyright (C) 2010 OpenWrt.org
#

. /lib/ramips.sh
. /lib/functions/pega.sh

PART_NAME=firmware
RAMFS_COPY_DATA="/lib/ramips.sh /etc/fw_env.config"
# PEGA: add to ramfs
RAMFS_COPY_BIN="/usr/sbin/fw_printenv /usr/sbin/fw_setenv /usr/sbin/factory_reset.sh /usr/bin/dirname /usr/bin/xargs"

# PEGA: add platform_add_uci_conffiles for customized backup list
platform_add_uci_conffiles() {
	pega_add_uci_conffiles $1
}

# PEGA: add platform_restore for patching database to older backup archive
platform_post_restore() {
	pega_post_restore
}

platform_check_image() {
	local board=$(ramips_board_name)
	local magic="$(get_magic_long "$1")"

	[ "$#" -gt 1 ] && return 1

	case "$board" in
	# PEGA: remove unused boards, and add pega-ramips
	pega-ramips)
		pega_check_image "$1"
		return $?;
		;;
	esac

	echo "Sysupgrade is not yet supported on $board."
	return 1
}

platform_nand_pre_upgrade() {
	# PEGA: remove unused boards
	return
}

platform_pre_upgrade() {
	# PEGA: remove unused boards
	return
}

platform_do_upgrade() {
	local board=$(ramips_board_name)

	case "$board" in
	# PEGA: add pega-ramips
	pega-ramips)
		pega_do_upgrade "$ARGV"
		;;
	*)
		default_do_upgrade "$ARGV"
		;;
	esac
}

disable_watchdog() {
	killall watchdog
	( ps | grep -v 'grep' | grep '/dev/watchdog' ) && {
		echo 'Could not disable watchdog'
		return 1
	}
}

blink_led() {
	. /etc/diag.sh; set_state upgrade
}

append sysupgrade_pre_upgrade disable_watchdog
append sysupgrade_pre_upgrade blink_led
