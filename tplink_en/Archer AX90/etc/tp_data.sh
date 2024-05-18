#!/bin/sh
#**************************************************************************** 
#  Copyright(c) 2016-2017 Shenzhen TP-LINK Technologies Co.Ltd. 
#  All Rights Reserved 
#  Zhuyu <zhuyu@tp-link.net> 
#***************************************************************************

MTD_TPDATA_PARTITION=misc2
DIR_TPDATA=/tp_data

MSG_FATAL_MISCPARTITION=$(cat <<-END
    ***  Cannot find $MTD_TPDATA_PARTITION partitiont ***.

    Make sure that '$MTD_TPDATA_PARTITION' partition size in CFEROM image embedded misc2
    has been configured.
    Tf so, then make sure that '$MTD_TPDATA_PARTITION' partition size is specifed in CFEROM
    on the NANAD flash.
    Use CFERAM 'c' command to specify $MTD_TPDATA_PARTITION partition size in CFEROM
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


#create ubi tpdata partition writen by zhuyu
create_tpdata_ubi_fs()
{
 	# Creating UBI volume
	MTD=$1; #MTD Number	
	echo "[TPDATA]: Formating $MTD_TPDATA_PARTITION partition is on MTD devide $MTD"

	ubiformat /dev/mtd$MTD -y || error_exit "$0: ubiformat failed"
	
	echo "[TPDATA]: Attaching MTD device $MTD to UBI device"
	
	if UBI=`ubiattach -m "$MTD"`; 	# try to attach data partition mtd to ubi, will format automatically if empty, 
						# will attach if UBI, will fail if not empty with no UBI 
						# (i.e. JFFS2 has previously mounted this partition and written something)
	then
		UBI=${UBI##*"number "}; # cut all before "number ", still need to get rid of leading space
		UBI=${UBI%%,*}; # cut all after ","
		DATA_PNAME=`ubinfo /dev/ubi"$UBI" -a | grep -o tp_data`;
		# if data partition already exists, do not invoke ubimkvol
		if [ "$DATA_PNAME" != "tp_data" ]; then
			echo ">>>>> Creating ubi volume ubi$UBI:tp_data <<<<<"
			ubimkvol /dev/ubi"$UBI" -m -N tp_data || error_exit "TPDATA: ubimkvol failed"; 
		fi
		echo "[TPDATA]: Mounting tp_data UBI volume"
		sleep 1
		mount -t ubifs ubi"$UBI":tp_data $DIR_TPDATA -o sync || error_exit "TPDATA: mount failed";
	else # otherwise mount as JFFS2
		mount -t jffs2 mtd:tp_data $DIR_TPDATA 
		echo ">>>>> Mounting tp_data partition as JFFS2. <<<<<"
	fi

	echo "[TPDATA]: Create tpdata Done."
		
	return 0
}

#
# Mounts misc2 UBI FS on dedicated MTD partition.
# ["-r"] option mounts the filesystem read-only.
#
mount_tpdata_misc2_ubi_fs()
{
    FS_ACCESS_TYPE="read/write"
   
    if MTD=`grep $MTD_TPDATA_PARTITION /proc/mtd`;
    then
		MTD=${MTD/mtd/}; # replace "mtd" with nothing
		MTD=${MTD/:*/}; # replace ":*" (trailing) with nothing
		echo "[TPDATA]: Found $MTD_TPDATA_PARTITION partition on MTD devide $MTD, attach it."
		
		if UBI=`ubiattach -m "$MTD"`; 	# try to attach data partition mtd to ubi, will format automatically if empty, 
							# will attach if UBI, will fail if not empty with no UBI 
							# (i.e. JFFS2 has previously mounted this partition and written something)
		then # ubiattach was successful, mount UBI
			echo "[TPDATA]: MTD$MTD attach succ."

			UBI=${UBI##*"number "}; # cut all before "number ", still need to get rid of leading space
			UBI=${UBI%%,*}; # cut all after ","
			
			DATA_PNAME=`ubinfo /dev/ubi"$UBI" -a | grep -o tp_data`;
			# if data partition already exists, do not invoke ubimkvol&ubiformat
			if [ "$DATA_PNAME" == "tp_data" ];then
				echo "[TPDATA]: Mounting tp_data UBI volume as UBIFS"
				sleep 1
				mount -t ubifs ubi"$UBI":tp_data $DIR_TPDATA -o sync;
			else
				echo "[TPDATA] tp_data do not have nvramfile, first use, do format misc2."
				ubidetach -m $MTD				
				create_tpdata_ubi_fs $MTD				
			fi
			
		else # otherwise mount as JFFS2
			echo "[TPDATA]:>>>>> ubiattach tp_data partition Fail. <<<<<"
			create_tpdata_ubi_fs $MTD	
		fi

		echo "[TPDATA]: Mount tp_data Done."
		
		return 0
	else
		mfg_fatal "[TPDATA]: $MSG_FATAL_MISCPARTITION"
	fi
}

umount_tpdata_misc2_ubi_fs()
{
    echo "[TPDATA]: Un-Mounting manufacturing default NVRAM fs on MTD partition $MTD_NVRAM_PARTITION..."

    if MTD=`grep $MTD_TPDATA_PARTITION /proc/mtd`;
    then
		MTD=${MTD/mtd/}; # replace "mtd" with nothing
		MTD=${MTD/:*/}; # replace ":*" (trailing) with nothing
		echo "[TPDATA]: $MTD_TPDATA_PARTITION is on MTD devide $MTD"

		echo "[TPDATA]: Un-mounting tpdata UBI volume"
		umount $DIR_TPDATA
		
		echo "[TPDATA]: Detaching MTD device $MTD from UBI"
		ubidetach -m $MTD
		
	else
		echo  "*** ERROR $0: $MTD_NVRAM_PARTITION partition does not exist"
		return 1
    fi

    echo "[TPDATA]: umount_tpdata_misc2_ubi_fs Done"
	
    return 0
}


mount_tpdata_jff2_fs()
{
	MFG_NVRAM_PARTITION="tp_data"
    if MTD=`grep $MFG_NVRAM_PARTITION /proc/mtd`;
    then
        MTD=${MTD/mtd/}; # replace "mtd" with nothing
        MTD=${MTD/:*/}; # replace ":*" (trailing) with nothing
    fi

    if [ "$MTD" != "" ] 
    then
        echo "[TPDATA]: $MFG_NVRAM_PARTITION partition is on MTD devide $MTD"
        mount -t jffs2 mtd:$MFG_NVRAM_PARTITION $DIR_TPDATA || error_exit "$0: mount failed"

        return 0
    else
        echo "[TPDATA]: mount tp_data as jffs2 failed"
        return 1
    fi
}

umount_tpdata_jff2_fs()
{
    echo "[TPDATA]: Un-mounting tp_data volume"
    # Unmounting and detaching data volume.
    umount $DIR_TPDATA || error_exit "$0: umount failed"
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
    mount_tpdata)

	if [ "$FLASHTYPE" == "NOR" ]; then
		mount_tpdata_jff2_fs
	else
	mount_tpdata_misc2_ubi_fs	
	fi

	if [ "$?" != "0" ]; then
		echo "*** ERROR $0: mount tp_data failed"
		exit 0
	fi	

	exit 0
	;;
	
    unmount_tpdata)

		if [ "$FLASHTYPE" == "NOR" ]; then
			umount_tpdata_jff2_fs
		else
		umount_tpdata_misc2_ubi_fs
		fi

		if [ "$?" != "0" ]; then
			echo "*** ERROR $0: umount tp_data failed"
			exit 0
	    fi
	exit 0
	;;

    *)
	echo "$0: unrecognized option $1"
	;;

esac
