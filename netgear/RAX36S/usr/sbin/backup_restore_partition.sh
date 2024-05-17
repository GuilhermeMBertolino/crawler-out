#!/bin/sh

. /lib/functions.sh

partition="$1"
partition_bak="$2"

export PATH=$PATH:/usr/sbin/

backup_restore_partition()
{
	# $1 is the source partition
	# $2 is the dest partition
	# Will use the source partition's data cover the destination partition

	source_partition=$1
	dest_partition=$2

	local mtdblock=""
	local mtdblock_bak=""

	local mtdblock_bak=$(part_dev $source_partition)
	local mtdblock=$(part_dev $dest_partition)

	local apdk="/tmp"

	if [ -z "$mtdblock" ]; then
		# read from mmc
		mtdblock=$(find_mmc_part $source_partition)
	fi

	if [ -z "$mtdblock_bak" ]; then
		# read from mmc
		mtdblock_bak=$(find_mmc_part $dest_partition)
	fi

	[ -n "$mtdblock" -a -n "$mtdblock_bak" ] || return

	flash_type=$(/bin/mtdinfo $mtdblock | grep Type | awk '{print $2}')
	if [ "x$flash_type" = "xnand" -o "x$flash_type" = "xubi" ];then
		flash_type=NAND_FLASH
	elif [ "x$flash_type" = "xnor" ];then
		flash_type=NOR_FLASH
	else
		flash_type=EMMC
	fi

	echo "Starting write $mtdblock_bak to $mtdblock ..." > /dev/console
	echo "=============================================" > /dev/console
	# load board.bin
	if [ "x$flash_type" == "xEMMC" ];then
		/sbin/mtd erase $mtdblock
		dd if=$mtdblock_bak of=$mtdblock
	elif [ "x$flash_type" == "xNOR_FLASH" -o "x$flash_type" == "xNOR" ];then
		/sbin/mtd erase $mtdblock
		dd if=$mtdblock_bak of=$mtdblock
	elif [ "x$flash_type" == "xNAND_FLASH" -o "x$flash_type" == "xNAND" ];then
		/bin/nanddump $(echo $mtdblock_bak | sed 's,block,,') -l 131072 -f $apdk/partition_data.bin
		/bin/flash_erase $(echo $mtdblock | sed 's,block,,') 0 0
		/bin/nandwrite $(echo $mtdblock | sed 's,block,,') $apdk/partition_data.bin
		rm -f $apdk/partition_data.bin
	fi

	sleep 1
}


main()
{
	echo "=============================================" > /dev/console
	echo "Start to handle the backup action, $1 | $2 ...." > /dev/console

	if [ "x$1" = "x" -o "x$2" = "x"  ];then
		echo "Please enter the origin partition and backup partition name..."  > /dev/console
        	echo "Such as: backup_partition.sh boarddata1 boarddata1.bak"
        	return
    	fi


	origin_partition="$1"
	backup_partition="$2"

	local mtd_name=$(part_dev $origin_partition)

	if [ -z "$mtd_name" ]; then
		# read from mmc
		mtd_name=$(find_mmc_part $origin_partition)
	fi

	flash_type_t=$(/bin/mtdinfo $mtd_name | grep Type | awk '{print $2}')
	if [ "x$flash_type_t" != "xnand" -a "x$flash_type_t" != "xubi" ];then
		echo "This is not nand flash type, will not do backup action for $1 partition !!!" >/dev/console
		echo "=============================================" > /dev/console
		return
	fi

	local mtd_bak=$(part_dev $backup_partition)
	if [ -z "$mtd_bak" ]; then
		# read from mmc
		mtd_bak=$(find_mmc_part $backup_partition)
	fi

	if [ "x$mtd_name" = "x/dev/" -o "x$mtd_bak" = "x/dev/" ];then
		echo "Not found the mtd partition $origin_partition or $backup_partition !!!" > /dev/console
		echo "=============================================" > /dev/console
		return
	fi

	[ -n "$mtd_name" -a -n "$mtd_bak" ] || (echo "Partition not found !" ; return)

	origin_checksum_result=$(/usr/sbin/dni_block_chksum -n $origin_partition -c)
	backup_checksum_result=$(/usr/sbin/dni_block_chksum -n $backup_partition -c)

	# the origin partition has been modified, will re-calculate the md5 for normal partition and recover the backup partition by normal partition
	if [ "x$origin_checksum_result" == "xChecksum_empty" ];then

		echo "The data in $origin_partition has been modified, will re-calculate checksum and backup the $backup_partition by $origin_partition" > /dev/console
		/usr/sbin/dni_block_chksum -n $origin_partition -u
		backup_restore_partition $origin_partition $backup_partition
		return

	# the origin partition is bad, will recover it by backup partition
	elif [ "x$origin_checksum_result" == "xData_empty" ];then
		if [ "x$backup_checksum_result" == "xChecksum_pass" ];then
			
			echo "The data in $origin_partition is bad, will restore it by $backup_partition" > /dev/console
			backup_restore_partition $backup_partition $origin_partition
		else
			echo "Both the data of origin and backup partition are empty, please set the correct the data !!!" > /dev/console
		fi
	# if origin_partition's checksum is not same as backup_partition, will use origin_partition data cover backup_partition
	elif [ "x$origin_checksum_result" == "xChecksum_pass" ];then
		if [ "x$backup_checksum_result" == "xChecksum_pass" ];then
			
			checksum=$(/usr/sbin/dni_block_chksum -n $origin_partition -g | awk -F = '{print $2}')
			checksum_bak=$(/usr/sbin/dni_block_chksum -n $backup_partition -g | awk -F = '{print $2}')
			if [ "x$checksum" != "x$checksum_bak" ];then
				echo "The data in $backup_partition is too old, will backup it by $origin_partition" > /dev/console
				backup_restore_partition $origin_partition $backup_partition
			else
				echo "Both the data of origin and backup partition are good !!" > /dev/console
			fi
		else
			echo "The data in $backup_partition is bad, will backup it by $origin_partition" > /dev/console
			backup_restore_partition $origin_partition $backup_partition
		fi
	elif [ "x$origin_checksum_result" == "xChecksum_fail" ];then
		if [ "x$backup_checksum_result" == "xChecksum_pass" ];then
			echo "The data in $origin_partition is bad, will restore it by $backup_partition" > /dev/console
			backup_restore_partition $backup_partition $origin_partition
		else
			echo "Both the data of origin and backup partition are bad, please set the correct the data !!!" > /dev/console
		fi
	fi
}


main $partition $partition_bak
