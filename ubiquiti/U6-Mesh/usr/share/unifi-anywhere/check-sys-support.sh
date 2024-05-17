#!/bin/sh

name=$(basename $0)

usage()
{
	echo "Usage $name: <share dir>"
	exit 1
}

[ $# -eq 1 ] || usage

SHARE_DIR=$1

SYS_ID=$(awk -F= '{if ($1 ~ "^systemid$") {printf "%s", $2; exit 0}}' /proc/ubnthal/system.info)
grep -qE "^$SYS_ID\>" ${SHARE_DIR}/sys-db.txt
