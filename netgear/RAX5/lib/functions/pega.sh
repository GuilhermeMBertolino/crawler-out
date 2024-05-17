#!/bin/sh
#
# Copyright (C) 2010-2013 OpenWrt.org
#

. /lib/functions.sh

SECOND_FIRMWARE_NAME="firmware2"
BOOTENV_PART=Config
PDATA_PART=PDATA
BACKUP_PART=Backup
FIXED_PART=fixed_data
DATA_PART=rootfs_data
# backup list exclude /etc/config
BACKUP_LIST="/etc/group /etc/passwd /etc/shadow
	/etc/wireless/l1profile.dat /etc/wireless/mediatek/DBDC_card0.dat
	/etc/wireless/mediatek/mt7915.dbdc.b0.dat /etc/wireless/mediatek/mt7915.dbdc.b1.dat"
# exclude list in /etc/config
BACKUP_EXCLUDE="/etc/config/dropbear /etc/config/fstab /etc/config/luci /etc/config/mtkhnat
	/etc/config/netgear /etc/config/ubootenv /etc/config/ucitrack /etc/config/uhttpd"

getField() {
	# $1 = line to process.
	# $2 = delimiter.
	# $3 = field number
	# $4 = Variable name.
	
	field=0; start=0; next_start=0
	for off in $(seq 1 ${#1} );
	do
		if [ "$2" = "${1:${off}:1}" ]; then
			start=$next_start
			field=$((field+1))
			next_start=$((off+1))
		fi
		[ $field -eq $3 ] && break
	done
	if [ $off -eq ${#1} ]; then
		# last field
		start=$next_start
		field=$((field+1))
	fi
	[ $field -ne $3 ] && var="" || {
		# remove the front space of $var
		while [ $start -lt $((off+1)) ];
		do
			var="${1:$start:1}"
			[ "$var" = " " ] && start=$((start+1)) || break
		done
		var=${1:$start:$((off-start))}
	}
	eval export ${NO_EXPORT:+-n} -- "${4}='${var}'"
}

# for customized backup list
pega_add_uci_conffiles() {
	local file="$1"
	# list all files in /etc/config/
	find /etc/config/ -type f > /tmp/backup_files
	# add files in BACKUP_LIST
	for f in $BACKUP_LIST; do
		echo $f >> /tmp/backup_files
	done
	# exclude files in BACKUP_EXCLUDE
	for f in $BACKUP_EXCLUDE; do
		# keep files in reserved folder
		cat /tmp/backup_files | grep -v "$f" > /tmp/backup_tmp
		mv /tmp/backup_tmp /tmp/backup_files
	done
	mv /tmp/backup_files $file
	return 0
}

# for patching database to older backup archive
pega_post_restore() {
	# get current database version
	cur_ver=$(uci -q -P /var/state get netgear.db.cur_ver)
	# get database version form backup archive
	config_ver=$(cat /tmp/config_check_result | grep 'Image Version:' | cut -d ' ' -f 3)
	old_format=$(echo $config_ver | grep 'V1.0')
	[ -n "$old_format" ] && config_ver=0
	uci -P /var/state set netgear.db.config_ver="$config_ver"
	# If database version of backup archive is less then current firmware,
	# copy patch_db from /rom, ex: config_ver=3, cur_ver=5,
	# it will copy patch_db-4 and patch_db-5 to /etc/pega-defaults and execute in next boot
	cd /rom/etc/pega-defaults || return 0
	if [ $config_ver -lt $cur_ver ]; then
		i=$config_ver
		while [ $i -lt $cur_ver ]; do
			i=$((i+1))
			[ -e patch_db-$i ] && {
				# Copy Method
				cp patch_db-$i /etc/pega-defaults/
			} 
		done
		sync
	fi
	return 0
}

pega_check_image() {
	sph=$(fw_printenv -n sph 2> /dev/null)
	[ "$sph" = "1" ] && {
		# Set fake fw new_ver as sph=1 for GUI checking
		cur_ver=$(uci -q -P /var/state get netgear.fw.cur_ver)
		uci -P /var/state set netgear.fw.new_ver="$cur_ver"
		return 0
	}

	[ ! -f /usr/bin/mkpegaimg ] && {
		echo "mkpegaimg is not existed!" > /tmp/check_image_result 2>&1
		return 1
	}
	mkpegaimg -d $1 > /tmp/check_image_result 2>&1
	[ "$?" != 0 ] && {
		return 1
	} || {
		model=$(uci -q -P /var/state get netgear.board.model)
		fw_model=$(cat /tmp/check_image_result | grep 'Model:' | cut -d ' ' -f 2)
		[ "$model" = "$fw_model" ] || {
			echo "Model mismatch ($model != $fw_model)" >> /tmp/check_image_result 2>&1
			return 1
		}
		fw_ver=$(cat /tmp/check_image_result | grep 'Image Version:' | cut -d ' ' -f 3)
		uci -P /var/state set netgear.fw.new_ver="$fw_ver"
		return 0
	}
}

# Flash firmware to MTD partition
#
# $(1): path to image
# $(2): (optional) pipe command to extract firmware, e.g. dd bs=n skip=m
pega_do_upgrade() {
	# Use dual image if $SECOND_FIRMWARE_NAME is existed
	dual_image=$( find_mtd_part "$SECOND_FIRMWARE_NAME" )
	# There is no /var/lock folder in ramfs, use /tmp/lock for lock node of fw_printenv
	active=$(fw_printenv -l /tmp/lock -n active_firmware 2> /dev/null)
	# For daul image
	[ -n "$dual_image" ] && {
		echo "pega_do_upgrade: active_firmware=$active" > /dev/console
		[ -z "$active" -o "$active" -ne "2" ] && PART_NAME=$SECOND_FIRMWARE_NAME
	}
	echo "pega_do_upgrade: [$1] [$2], PART_NAME=$PART_NAME, SAVE_CONFIG=$SAVE_CONFIG" > /dev/console
	sync
	get_image "$1" "$2" | mtd write - "${PART_NAME:-image}"
	if [ "$SAVE_CONFIG" -eq 0 ]; then
		/usr/sbin/factory_reset.sh all
	fi
	# For daul image
	[ -n "$dual_image" ] && {
		[ "$active" -eq "2" ] && next_fw=1 || next_fw=2
		# There is no /var/lock folder in ramfs, use /tmp/lock for lock node of fw_setenv
		fw_setenv -l /tmp/lock active_firmware $next_fw
		echo "pega_do_upgrade: switch active_firmware to $next_fw" > /dev/console
	}
}

# handle restoredefault request from NMRP
pega_preinit_restoredefault() {
	[ -f /etc/fw_env.config ] || return

	restoredefault=$(fw_printenv -n restoredefault 2>/dev/null)
	echo "pega_preinit_restoredefault: restoredefault=$restoredefault" > /dev/console
	[ "$restoredefault" = "1" ] && {
		# clear restoredefault
		fw_setenv restoredefault

		# pega_preinit_restoredefault called before mount_root will use mtd erase
		/usr/sbin/factory_reset.sh
	}
}

pega_attach_fixed_data() {
	local mtdnum=$( find_mtd_index "$FIXED_PART" )
	local mtd_type=$(identify /dev/mtd$mtdnum)
	local ubidev
	local result=0
	if [ "$mtd_type" = "ubi" ]; then
		ubiattach -m "$mtdnum"
		result=$?
	fi
	if [ "$mtd_type" != "ubi" -o "$result" != "0" ]; then
		mtd erase /dev/mtd$mtdnum
		ubiformat /dev/mtd$mtdnum -y
		ubiattach -m "$mtdnum"
		result=$?
	fi
	sync
	ubidev=$( nand_find_ubi "$FIXED_PART" )
	#echo "ubidev=$ubidev"
	local data_ubivol=$( nand_find_volume $ubidev $DATA_PART )
	if [ "$result" = "0" -a ! "$data_ubivol" ];then
		ubimkvol /dev/$ubidev -N $DATA_PART -m
		sync
		data_ubivol=$( nand_find_volume $ubidev $DATA_PART )
	fi
}

pega_set_wan_mac() {
	opmode=$(uci -q get network.@opmode[0].mode)
	[ "$opmode" = "router" ] || return
	mac_clone_mode=$(uci -q get network.inet_global.mac_clone)
	wan_ifname=$(uci -q get network.wan.ifname)
	wan_mac=""
	if [ "$mac_clone_mode" = "default" ]; then
		wan_mac=$(uci -q -P /var/state get netgear.board.wan_mac)
	else
		wan_mac=$(uci -q get network.inet_global.mac_addr)
	fi
	[ -n "$wan_ifname" -a -n "$wan_mac" ] && {
		echo "Set $wan_ifname MAC to $wan_mac ..." > /dev/console
		ifconfig $wan_ifname down
		ifconfig $wan_ifname hw ether "$wan_mac" up
	}
}

pega_set_opmode() {
    opmode=$(uci -q get network.@opmode[0].mode)
    [ "$opmode" != "router" ] && {
        echo -e "\n\033[31mSet /proc/router_opmode to 1\033[0m\n" > /dev/console
        # DNS Hijack
        echo 1 > /proc/router_opmode
    }
}

#input NMRP region number(Hex string) and return sku name for caller.
pega_get_skuName_by_nmrpRegionNo() {
    region_no=$1
    sku=""
    case "$region_no" in
        "0x0001")    sku=NA ;;
        "0x0002")    sku=WW ;;
        "0x0003")    sku=GR ;;
        "0x0004")    sku=PR ;;
        "0x0005")    sku=RU ;;
        "0x0006")    sku=BZ ;;
        "0x0007")    sku=IN ;;
        "0x0008")    sku=KO ;;
        "0x0009")    sku=JP ;;
        "0x000A")    sku=AU ;;
        "0x000B")    sku=CA ;;
        "0x000C")    sku=US ;;
        "0x000D")    sku=MX ;;
        "0x000E")    sku=AP ;;
        "0x000F")    sku=PA ;;
        *)
            ;;
    esac
    echo $sku
}

mtd_get_erase_size() {
	local part_name=$1
	local first dev size erasesize name
	while read dev size erasesize name; do
		name=${name#'"'}; name=${name%'"'}
		if [ "$name" = "$part_name" ]; then
			echo "0x""$erasesize"
			break
		fi
	done < /proc/mtd
}

# conver 001122334455 => 00:11:22:33:44:55
macToString()
{
	mac=$1
	for off in 0 2 4 6 8 10;do
		str="${str}${mac:${off}:2}"
		if [ $off -ne 10 ]; then
			str="$str:"
		fi
	done
	echo $str
}

and_op () {
	result=$(( $1 & $2 ))
	echo $result
}

or_op () {
	result=$(( $1 | $2 ))
	echo $result
}

