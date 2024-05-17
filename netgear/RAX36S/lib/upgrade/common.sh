#!/bin/sh

RAM_ROOT=/tmp/root

[ -x /usr/bin/ldd ] || ldd() { LD_TRACE_LOADED_OBJECTS=1 $*; }
libs() { /bin/ldd $* 2>/dev/null | sed -r 's/(.* => )?(.*) .*/\2/'; }

install_file() { # <file> [ <file> ... ]
	for file in "$@"; do
		dest="$RAM_ROOT/$file"
		[ -f $file -a ! -f $dest ] && {
			dir="$(dirname $dest)"
			mkdir -p "$dir"
			cp $file $dest
		}
	done
}

install_bin() { # <file> [ <symlink> ... ]
	src=$1
	files=$1
	[ -x "$src" ] && files="$src $(libs $src)"
	install_file $files
	shift
	for link in "$@"; do {
		dest="$RAM_ROOT/$link"
		dir="$(dirname $dest)"
		mkdir -p "$dir"
		[ -f "$dest" ] || ln -s $src $dest
	}; done
}

supivot() { # <new_root> <old_root>
	/bin/mount | grep "on $1 type" 2>&- 1>&- || /bin/mount -o bind $1 $1
	mkdir -p $1$2 $1/proc $1/sys $1/dev $1/var $1/mnt $1/overlay && \
	/bin/mount -o noatime,move /proc $1/proc && \
	pivot_root $1 $1$2 || {
		/bin/umount -l $1 $1
		return 1
	}

	/bin/mount -o noatime,move $2/sys /sys
	/bin/mount -o noatime,move $2/dev /dev
	/bin/mount -o noatime,move $2/mnt /mnt
    /bin/mount -o noatime,move $2/var /var
	/bin/mount -o noatime,move $2/overlay /overlay 2>&-
	#/bin/mount -o move $2/mnt /mnt
    #/bin/mount -o move $2/var /var
	#/bin/mount -o move $2/overlay /overlay 2>&-
	return 0
}

run_ramfs() { # <command> [...]
	#clean some functions
	killall smbd proftpd afpd minidlna luns_scan.sh detcable send_wol check_time_machine
	killall check_status.sh netconn.sh ping-netgear button_detect miniupnpd icqm adt_start
	killall traffic_meter
	/etc/init.d/netscan stop &
	rm /tmp/rae.tar.gz -rf &

	install_bin /bin/busybox /bin/ash /bin/sh /bin/ls /bin/mount \
		/bin/umount /sbin/pivot_root /sbin/reboot /bin/sync /bin/sleep \
		/bin/cat /bin/echo /sbin/ifconfig /bin/rm /usr/bin/killall /usr/bin/fuser \
		/bin/ps bin/df /bin/ln /sbin/init /usr/bin/lsof /usr/sbin/chroot bin/grep /bin/cp \
		/usr/bin/expr /usr/bin/which /usr/sbin/rdev /bin/bash /usr/bin/sha256sum 

	install_bin /bin/config
	install_bin /bin/ubiattach
	install_bin /bin/ubiblock
	install_bin /bin/ubicrc32
	install_bin /bin/ubidetach
	install_bin /bin/ubiformat
	install_bin /bin/ubimkvol
	install_bin /bin/ubinfo
	install_bin /bin/ubinize
	install_bin /bin/ubirename
	install_bin /bin/ubirmvol
	install_bin /bin/ubirsvol
	install_bin /bin/ubiupdatevol
	install_bin /bin/flash_erase
	install_bin /sbin/artmtd
	install_bin /usr/sbin/part_dev
	install_bin /bin/nandwrite /usr/sbin/nandwrite
	install_bin /usr/sbin/net-cgi
	install_bin /usr/sbin/lighttpd
	install_bin /etc/init.d/fwupg_flashing.sh
	install_bin /etc/get_rootfs_dev.sh
	#install_bin /usr/sbin/burn-image
	install_bin /bin/bcm_boot_launcher
	install_bin /bin/bcm_flasher       
	install_bin /bin/bcmmcastctl
	install_bin /bin/bcm_bootstate      
	install_bin /bin/bcm_flashutil   
	install_bin /bin/wdtctl  
	install_bin /bin/bcmmserver
	install_file /www/languages-en.js
	install_file /www/languages-gr.js
	install_file /www/languages-pt.js
	install_file /www/languages-ru.js
	install_file /www/liteblue.gif /www/style/form.css /www/pls_wait.html /www/help.css /www/help.htm /www/upload.gif /www/funcs.js /www/UPG_process.htm /www/upg_get_status.htm /www/spacer.gif /www/menublue.gif /www/rbullet.gif /www/MNU_menu.htm /www/MNU_menu_nolink.htm /www/MNU_menu_wds.htm /www/MNU_menu_wds_nolink.htm /www/AUTO_upgrade_process.htm
	install_file /etc/resolv.conf
	install_file /lib/libcrypto.so.1.1 /lib/libgcc_s.so.1 /lib/libc.so.6 /usr/lib/libiconv.so.2.4.0 /usr/lib/libiconv.so /usr/lib/libiconv.so.2 /lib/libconfig.so

	install_bin /sbin/mtd
	install_bin /sbin/mount_root
	install_bin /sbin/snapshot
	install_bin /sbin/snapshot_tool
	install_bin /bin/bcmbusybox
	install_file /lib/libbcm_flashutil.so
	install_file /lib/libbcm_boardctl.so
	install_file /lib/libbcm_util.so
	install_file /lib/libsys_util.so
	install_file /lib/libgen_util.so
	install_file /lib/librt.so.1
	install_file /lib/libdl.so.2
	install_file /lib/libpthread.so.0
	install_file /lib/ld-linux.so.3


	for file in $RAMFS_COPY_BIN; do
		install_bin ${file//:/ }
	done
	install_file /etc/resolv.conf /lib/*.sh /lib/functions/*.sh /lib/upgrade/*.sh $RAMFS_COPY_DATA

	[ -L "/lib64" ] && ln -s /lib $RAM_ROOT/lib64
	#inittab in new rootfs
	#echo '::sysinit:/bin/sh -l -c "/data/fwupg_flashing.sh"' > $RAM_ROOT/etc/inittab
	echo '::sysinit:/bin/sh -l -c "/etc/init.d/fwupg_flashing.sh"' > $RAM_ROOT/etc/inittab
	echo '::shutdown:/bin/sh -l -c "bcm_boot_launcher stop"' >> $RAM_ROOT/etc/inittab
	sync


#	mkdir /oldroot
#	mkdir /overlay
	supivot $RAM_ROOT /oldroot || {
		echo "Failed to switch over to ramfs. Please reboot."
		exit 1
	}

	/bin/mount -o remount,ro /oldroot
	#/bin/umount -l /oldroot

	grep /overlay /proc/mounts > /dev/null && {
		/bin/mount -o noatime,remount,ro /overlay
		/bin/umount -l /overlay
	}

	# spawn a new shell from ramdisk to reduce the probability of cache issues
	#exec /bin/busybox ash -c "$*"
	rm /tmp
	ln -s /var/tmp /tmp
	cp /bin/busybox /tmp
	ln -sf /tmp/busybox /tmp/sh
	exec /tmp/sh -c 'echo $$; kill -QUIT 1' </dev/console >/dev/console 2>&1
}

kill_remaining() { # [ <signal> ]
	local sig="${1:-TERM}"
	echo -n "Sending $sig to remaining processes ... "

	local my_pid=$$
	local my_ppid=$(cut -d' ' -f4  /proc/$my_pid/stat)
	local my_ppisupgraded=
	grep -q upgraded /proc/$my_ppid/cmdline >/dev/null && {
		local my_ppisupgraded=1
	}
	
	local stat
	for stat in /proc/[0-9]*/stat; do
		[ -f "$stat" ] || continue

		local pid name state ppid rest
		read pid name state ppid rest < $stat
		name="${name#(}"; name="${name%)}"

		local cmdline
		read cmdline < /proc/$pid/cmdline

		# Skip kernel threads
		[ -n "$cmdline" ] || continue

		if [ $$ -eq 1 ] || [ $my_ppid -eq 1 ] && [ -n "$my_ppisupgraded" ]; then
			# Running as init process, kill everything except me
			if [ $pid -ne $$ ] && [ $pid -ne $my_ppid ]; then
				echo -n "$name "
				kill -$sig $pid 2>/dev/null
			fi
		else 
			case "$name" in
				# Skip essential services
				*upgraded*|*procd*|*ash*|*init*|*watchdog*|*ssh*|*dropbear*|*telnet*|*login*|*hostapd*|*wpa_supplicant*|*nas*) : ;;

				# Killable process
				*)
					if [ $pid -ne $$ ] && [ $ppid -ne $$ ]; then
						echo -n "$name "
						kill -$sig $pid 2>/dev/null
					fi
				;;
			esac
		fi
	done
	echo ""
}

run_hooks() {
	local arg="$1"; shift
	for func in "$@"; do
		eval "$func $arg"
	done
}

ask_bool() {
	local default="$1"; shift;
	local answer="$default"

	[ "$INTERACTIVE" -eq 1 ] && {
		case "$default" in
			0) echo -n "$* (y/N): ";;
			*) echo -n "$* (Y/n): ";;
		esac
		read answer
		case "$answer" in
			y*) answer=1;;
			n*) answer=0;;
			*) answer="$default";;
		esac
	}
	[ "$answer" -gt 0 ]
}

v() {
	[ "$VERBOSE" -ge 1 ] && echo "$@"
}

rootfs_type() {
	/bin/mount | awk '($3 ~ /^\/$/) && ($5 !~ /rootfs/) { print $5 }'
}

get_image() { # <source> [ <command> ]
	local from="$1"
	local conc="$2"
	local cmd

	case "$from" in
		http://*|ftp://*) cmd="wget -O- -q";;
		*) cmd="cat";;
	esac
	if [ -z "$conc" ]; then
		local magic="$(eval $cmd \"$from\" 2>/dev/null | dd bs=2 count=1 2>/dev/null | hexdump -n 2 -e '1/1 "%02x"')"
		case "$magic" in
			1f8b) conc="zcat";;
			425a) conc="bzcat";;
		esac
	fi

	eval "$cmd \"$from\" 2>/dev/null ${conc:+| $conc}"
}

get_magic_word() {
	(get_image "$@" | dd bs=2 count=1 | hexdump -v -n 2 -e '1/1 "%02x"') 2>/dev/null
}

get_magic_long() {
	(get_image "$@" | dd bs=4 count=1 | hexdump -v -n 4 -e '1/1 "%02x"') 2>/dev/null
}

jffs2_copy_config() {
	if grep rootfs_data /proc/mtd >/dev/null; then
		# squashfs+jffs2
		mtd -e rootfs_data jffs2write "$CONF_TAR" rootfs_data
	else
		# jffs2
		mtd jffs2write "$CONF_TAR" rootfs
	fi
}

# Flash firmware to MTD partition
#
# $(1): path to image
# $(2): (optional) pipe command to extract firmware, e.g. dd bs=n skip=m
default_do_upgrade() {
	sync
	if [ "$SAVE_CONFIG" -eq 1 ]; then
		get_image "$1" "$2" | mtd $MTD_CONFIG_ARGS -j "$CONF_TAR" write - "${PART_NAME:-image}"
	else
		get_image "$1" "$2" | mtd write - "${PART_NAME:-image}"
	fi
}

do_upgrade() {
	v "Performing system upgrade..."
	if type 'platform_do_upgrade' >/dev/null 2>/dev/null; then
		platform_do_upgrade "$ARGV"
	else
		default_do_upgrade "$ARGV"
	fi

	if [ "$SAVE_CONFIG" -eq 1 ] && type 'platform_copy_config' >/dev/null 2>/dev/null; then
		platform_copy_config
	fi

	v "Upgrade completed"
	[ -n "$DELAY" ] && sleep "$DELAY"
	ask_bool 1 "Reboot" && {
		v "Rebooting system..."
		sleep 2
		reboot -f
		sleep 5
		echo b 2>/dev/null >/proc/sysrq-trigger
	}
}
