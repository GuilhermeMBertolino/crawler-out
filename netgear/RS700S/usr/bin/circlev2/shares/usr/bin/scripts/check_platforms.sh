#!/bin/sh
# Copyright (c) 2018-2020 Circle Media Labs Inc.
# Copyright (c) 2022 Aura Company

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

VER=""
[ -s ${CIRCLE_DATA}/platforms.ver ] && {
	VER=$(cat ${CIRCLE_DATA}/platforms.ver)
}

rm -f ${CIRCLE_TMP}/platforms.tgz
${CURL} ${CURLOPTS} --max-time 30 -o ${CIRCLE_TMP}/platforms.tgz -H "Authorization: Bearer ${CLOUD_TOKEN}" -A "Netgear-Agent ${FIRMWARE_VER}" "$DOWNLOAD_API_URL_20/getplatforms?$DOWNLOAD_TAG&VER=$VER" || {
	echo "Failed downloading platforms.tgz"
	exit 1
}

[ -s ${CIRCLE_TMP}/platforms.tgz ] && {
	echo "Unpacking to ${CIRCLE_TMP}"
	gunzip -c ${CIRCLE_TMP}/platforms.tgz | tar xf - -C ${CIRCLE_TMP}/ circle-customized.txt platforms.xml platforms.ver doh_blacklist || {
		gunzip -c ${CIRCLE_TMP}/platforms.tgz | tar xf - -C ${CIRCLE_TMP}/ circle-customized.txt platforms.xml platforms.ver || {
			echo "Failed decompressing platform database"
			exit 1
		}
	}

	echo "Updating PlatformDB from ${VER} to $(cat ${CIRCLE_TMP}/platforms.ver)"

        [ -s ${CIRCLE_TMP}/circle-customized.txt ] && mv -f ${CIRCLE_TMP}/circle-customized.txt ${CIRCLE_DATA}/
        [ -s ${CIRCLE_TMP}/platforms.xml ] && mv -f ${CIRCLE_TMP}/platforms.xml ${CIRCLE_TMP}/platforms.ver ${CIRCLE_DATA}/
        [ -s ${CIRCLE_TMP}/doh_blacklist ] && mv -f ${CIRCLE_TMP}/doh_blacklist ${CIRCLE_DATA}/

	rm -f ${CIRCLE_TMP}/platforms.tgz
	${CIRCLE_ROOT}/sv restart timetracker
}
