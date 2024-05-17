#!/bin/sh
# generates download server related variables
# Copyright (c) 2018-2021 Circle Media Labs Inc.

MY_MAC=""
[ -e ${CIRCLE_TMP}/MAC ] && {
	MY_MAC=$(cat ${CIRCLE_TMP}/MAC)
}

CURL=${CIRCLE_ROOT}/curl

AESCRYPT=${CIRCLE_ROOT}/aescrypt
FWVERIFY=${CIRCLE_ROOT}/fwverify

# Get Cloud Info
CLOUD_DOMAIN=$(cat ${CIRCLE_BASE}/CLOUD_DOMAIN)
# Non-prod clouds need to add the cloud environment into the download domian
CLOUD_ENV=""
[ -s ${CIRCLE_DATA}/cloudenv ] && {
	cloudenv="$(cat ${CIRCLE_DATA}/cloudenv)"
	if [ "$cloudenv" != "prod" -a "$cloudenv" != "" ] ; then
		CLOUD_ENV=".${cloudenv}";
	fi
}
CLOUD_TOKEN=""
[ -s ${CIRCLE_DATA}/cloudtoken ] && {
	CLOUD_TOKEN="$(cat ${CIRCLE_DATA}/cloudtoken)"
}
FIRMWARE_VER="2.0.0"
[ -s ${CIRCLE_BASE}/VERSION ] && {
	FIRMWARE_VER="$(cat ${CIRCLE_BASE}/VERSION)"
}
CURLOPTS="-s --connect-timeout 20 --retry 1 --retry-delay 10 --cacert ${CIRCLE_ROOT}/trusted-US-cas.pem"
DOWNLOAD_CLOUD="download${CLOUD_ENV}.${CLOUD_DOMAIN}"
DOWNLOAD_API_URL="https://${DOWNLOAD_CLOUD}/api/v1.0/firmware/v2"
DOWNLOAD_API_URL_20="https://$DOWNLOAD_CLOUD/api/v2.0/firmware/v2"
DOWNLOAD_TAG="DEVID=${MY_MAC}&HWVER=2"
