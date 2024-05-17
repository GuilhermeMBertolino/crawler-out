#!/bin/sh
# Copyright (c) 2018-2021 Circle Media Labs Inc.

if [ -z ${CIRCLE_TMP} ]; then
	echo "env variable CIRCLE_TMP not set"
	exit 1
fi
if [ -z ${CIRCLE_ROOT} ]; then
	echo "env variable CIRCLE_ROOT not set"
	exit 1
fi
if [ -z ${CIRCLE_DATA} ]; then
	echo "env variable CIRCLE_DATA not set"
	exit 1
fi
if [ -z ${CIRCLE_BASE} ]; then
	echo "env variable CIRCLE_BASE not set"
	exit 1
fi

. ${CIRCLE_ROOT}/scripts/dlvars.sh

if [ ! -f ${CIRCLE_DATA}/cloudtoken ]; then
	echo "Error: Missing token file '${CIRCLE_DATA}/cloudtoken'"
	exit 1
fi

VER=""
if [ -f ${CIRCLE_TMP}/whitelist.ver ]; then
	VER=$(cat ${CIRCLE_TMP}/whitelist.ver)
fi

TOKEN=$(cat ${CIRCLE_DATA}/cloudtoken)
WHITELIST_TGZ="${CIRCLE_TMP}/whitelist.tgz"

echo "Current Whitelist version: ${VER:-N/A}"
echo "Attempting to connect to cloud server ${DOWNLOAD_CLOUD}"

${CURL} ${CURLOPTS} --max-time 30 -o ${WHITELIST_TGZ} -H "Authorization: Bearer ${CLOUD_TOKEN}" -A "Netgear-Agent ${FIRMWARE_VER}" "${DOWNLOAD_API_URL}/getwhitelist?DEVID=${MY_MAC}&VER=${VER}" | xargs ${CURL}

if [ -s ${WHITELIST_TGZ} ]; then
	echo "Decompressing archive ${WHITELIST_TGZ} ..."
	tar -zxvf ${WHITELIST_TGZ} -C ${CIRCLE_TMP}/ || {
		echo "Error while decompressing archive"
		rm -rf ${WHITELIST_TGZ}
		exit 1
	}
	if [ -f ${CIRCLE_TMP}/whitelist-domains.txt -o -f ${CIRCLE_TMP}/whitelist-ips.txt ]; then
		echo "Copying whiltelist files to ${CIRCLE_DATA} ..."
		cp ${CIRCLE_TMP}/whitelist-domains.txt ${CIRCLE_DATA}/
		cp ${CIRCLE_TMP}/whitelist-ips.txt ${CIRCLE_DATA}/

		echo "Restarting Timetracker ..."
		${CIRCLE_ROOT}/sv restart timetracker
	else
		echo "Error: Unexpected content of compressed archive"
		rm -rf ${WHITELIST_TGZ}
		exit 1
	fi
fi
rm -rf ${WHITELIST_TGZ}
