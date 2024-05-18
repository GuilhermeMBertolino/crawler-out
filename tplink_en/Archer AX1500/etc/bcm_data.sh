#!/bin/sh
#**************************************************************************** 
#  Copyright(c) 2016-2017 Shenzhen TP-LINK Technologies Co.Ltd. 
#  All Rights Reserved 
#  Zhuyu <zhuyu@tp-link.net> 
#***************************************************************************

MTD_DATA_PARTITION=data
DIR_DATA=/data

MSG_FATAL_MISCPARTITION=$(cat <<-END
    ***  Cannot find $MTD_DATA_PARTITION partitiont ***.

    Make sure that '$MTD_DATA_PARTITION' partition size in CFEROM image embedded data
    has been configured.
    Tf so, then make sure that '$MTD_DATA_PARTITION' partition size is specifed in CFEROM
    on the NANAD flash.
    Use CFERAM 'c' command to specify $MTD_DATA_PARTITION partition size in CFEROM
    NVRAM on the NANAD flash.
END
)

#
# Handling a fatal error by printing optional error
# message specified as a first argument.
# Entering shell for diagnostic purpose.
# After exiting the shell with 'exit' command do the
# system reboot.
#
mfg_fatal()
{
    echo $'\n\n'"$1"$'\n\n'
}


#create ubi data partition writen by zhuyu
create_data_ubi_fs()
{
 	# Creating UBI volume
	MTD=$1; #MTD Number	
	echo "[BCM_DATA]: Formating $MTD_DATA_PARTITION partition is on MTD devide $MTD"

	ubiformat /dev/mtd$MTD -y || error_exit "$0: ubiformat failed"
	
	echo "[BCM_DATA]: Attaching MTD device $MTD to UBI device"
	
	if UBI=`ubiattach -m "$MTD"`; 	# try to attach data partition mtd to ubi, will format automatically if empty, 
						# will attach if UBI, will fail if not empty with no UBI 
						# (i.e. JFFS2 has previously mounted this partition and written something)
	then
		UBI=${UBI##*"number "}; # cut all before "number ", still need to get rid of leading space
		UBI=${UBI%%,*}; # cut all after ","
		DATA_PNAME=`ubinfo /dev/ubi"$UBI" -a | grep -o data`;
		# if data partition already exists, do not invoke ubimkvol
		if [ "$DATA_PNAME" != "data" ]; then
			echo ">>>>> Creating ubi volume ubi$UBI:data <<<<<"
			ubimkvol /dev/ubi"$UBI" -m -N data || error_exit "[BCMDATA]: ubimkvol failed"; 
		fi
		echo "[BCM_DATA]: Mounting brcm data UBI volume"
		sleep 1
		mount -t ubifs ubi"$UBI":data $DIR_DATA -o sync || error_exit "[BCMDATA]: mount failed";
	else # otherwise mount as JFFS2
		echo ">>>>> Mounting brcm data partition Fail. <<<<<"
	fi

	echo "[BCM_DATA]: Create data Done."
		
	return 0
}

#
# Mounts misc2 UBI FS on dedicated MTD partition.
# ["-r"] option mounts the filesystem read-only.
#
mount_data_ubi_fs()
{
    FS_ACCESS_TYPE="read/write"
   
    if MTD=`grep $MTD_DATA_PARTITION /proc/mtd | grep -v tp_data`;
    then
		MTD=${MTD/mtd/}; # replace "mtd" with nothing
		MTD=${MTD/:*/}; # replace ":*" (trailing) with nothing
		echo "[BCM_DATA]: Found $MTD_DATA_PARTITION partition on MTD devide $MTD, attach it."
		
		if UBI=`ubiattach -m "$MTD"`; 	# try to attach data partition mtd to ubi, will format automatically if empty, 
							# will attach if UBI, will fail if not empty with no UBI 
							# (i.e. JFFS2 has previously mounted this partition and written something)
		then # ubiattach was successful, mount UBI
			echo "[BCM_DATA]: MTD$MTD attach succ."

			UBI=${UBI##*"number "}; # cut all before "number ", still need to get rid of leading space
			UBI=${UBI%%,*}; # cut all after ","
			
			DATA_PNAME=`ubinfo /dev/ubi"$UBI" -a | grep -o data`;
			# if data partition already exists, do not invoke ubimkvol&ubiformat
			if [ "$DATA_PNAME" == "data" ];then
				echo "[BCM_DATA]: Mounting data UBI volume as UBIFS"
				sleep 1
				mount -t ubifs ubi"$UBI":data $DIR_DATA -o sync;
			else
				echo "[BCM_DATA] bcm data do not have nvramfile, first use, do format data."
				ubidetach -m $MTD				
				create_data_ubi_fs $MTD				
			fi
			
		else # otherwise mount as JFFS2
			echo "[BCM_DATA]:>>>>> ubiattach bcm data partition Fail. <<<<<"
			create_data_ubi_fs $MTD	
		fi

		echo "[BCM_DATA]: Mount bcm data Done."
		
		return 0
	else
		mfg_fatal "[BCM_DATA]: $MSG_FATAL_MISCPARTITION"
	fi
}

umount_data_ubi_fs()
{
    echo "[BCM_DATA]: Un-Mounting manufacturing default NVRAM fs on MTD partition $MTD_NVRAM_PARTITION..."

    if MTD=`grep $MTD_DATA_PARTITION /proc/mtd`;
    then
		MTD=${MTD/mtd/}; # replace "mtd" with nothing
		MTD=${MTD/:*/}; # replace ":*" (trailing) with nothing
		echo "[BCM_DATA]: $MTD_DATA_PARTITION is on MTD devide $MTD"

		echo "[BCM_DATA]: Un-mounting data UBI volume"
		umount $DIR_DATA
		
		echo "[BCM_DATA]: Detaching MTD device $MTD from UBI"
		ubidetach -m $MTD
	else
		echo  "*** ERROR $0: $MTD_NVRAM_PARTITION partition does not exist"
		return 1
    fi

    echo "[BCM_DATA]: umount_data_ubi_fs Done"
	
    return 0
}

mount_data_jff2_fs()
{
	MFG_NVRAM_PARTITION="data"
    if MTD=`grep $MFG_NVRAM_PARTITION /proc/mtd`;
    then
        MTD=${MTD/mtd/}; # replace "mtd" with nothing
        MTD=${MTD/:*/}; # replace ":*" (trailing) with nothing
    fi

    if [ "$MTD" != "" ] 
    then
        echo "[BCMDATA]: $MFG_NVRAM_PARTITION partition is on MTD devide $MTD"
        mount -t jffs2 mtd:$MFG_NVRAM_PARTITION $DIR_DATA || error_exit "$0: mount failed"

        return 0
    else
        echo "[BCMDATA]: mount data as jffs2 failed"
        echo "[BCMDATA]: mount data as tmpfs"
        mount -t tmpfs -o size=4m tmpfs /data
        return 1
    fi
}

umount_data_jff2_fs()
{
    echo "[BCMDATA]: Un-mounting data volume"
    # Unmounting and detaching data volume.
    umount $DIR_DATA || error_exit "$0: umount failed"
    return 0
}

if [ -e /dev/root ]; then 
    FLASHTYPE="NOR"
    FSTYPE=jffs2
else
    FLASHTYPE="NAND"
    FSTYPE=ubifs
fi

case "$1" in
    mount_data)

	if [ "$FLASHTYPE" == "NOR" ]; then
		mount_data_jff2_fs	
	else
	 	mount_data_ubi_fs
	fi	

	if [ "$?" != "0" ]; then
		echo "*** ERROR $0: moun data failed"
		exit 0
	fi	

	exit 0
	;;
	
    unmount_data)
		if [ "$FLASHTYPE" == "NOR" ]; then
		umount_data_ubi_fs
		else
			umount_data_jff2_fs
		fi
		
		if [ "$?" != "0" ]; then
			echo "*** ERROR $0: umount data failed"
			exit 0
	    fi
	exit 0
	;;

    *)
	echo "$0: unrecognized option $1"
	;;

esac
