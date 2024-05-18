#!/bin/sh
#**************************************************************************** 
#  Copyright(c) 2016-2017 Shenzhen TP-LINK Technologies Co.Ltd. 
#  All Rights Reserved 
#  Zhuyu <zhuyu@tp-link.net> 
#***i************************************************************************
. /lib/fs/fs_common.sh

case "$1" in
    mount_tpdata)	
	mount_ubi_fs tp_data /tp_data "-o sync"
	mount_ubi_fs radio /radio "-o sync"
	mount_ubi_fs data /data
	exit 0
	;;
	
    unmount_tpdata)
	unmount_ubi_fs tp_data
	unmount_ubi_fs data
	exit 0
	;;

    *)
	echo "$0: unrecognized option $1"
	;;

esac
