#!/bin/sh
. /usr/bin/unifi_util_funcs.sh

name=$(basename $0)

usage()
{
	echo "Usage $name: <share dir>"
	exit 1
}

[ $# -eq 1 ] || usage

SHARE_DIR=$1

. ${SHARE_DIR}/bleconn-utils.sh

bleconn_check_sys_support ${SHARE_DIR}/bleconn-sys-db.txt
