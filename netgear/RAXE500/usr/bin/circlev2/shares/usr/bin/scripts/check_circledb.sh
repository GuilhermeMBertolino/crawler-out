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

if [ -z ${CIRCLE_DB_PATH} ]; then
	echo "env variable CIRCLE_DB_PATH not set"
	exit 1
fi

check_versions()
{
    local extra_tag=$1
    echo "sending checkversion request to ${DOWNLOAD_CLOUD}"
    rm -f ${CIRCLE_TMP}/versions;
    ${CURL} ${CURLOPTS} -m 30 -o ${CIRCLE_TMP}/versions -H "Authorization: Bearer ${CLOUD_TOKEN}" -A "Netgear-Agent ${FIRMWARE_VER}" "${DOWNLOAD_API_URL}/checkversion?${DOWNLOAD_TAG}${extra_tag}"
    if [ -f ${CIRCLE_TMP}/versions ] ; then
        echo "checkversion successful"
        return 0
    fi
    echo "checkversion failed"
    return 1
}

c=$0
EXEC_NAME=${c##*/}
LOCKFILE=${CIRCLE_TMP}/$EXEC_NAME.lock
[ -e $LOCKFILE ] && kill -0 $(cat $LOCKFILE) && {
    echo "$EXEC_NAME already running"
    exit 0
}
# Make sure the lockfile is removed when we exit and then claim it
trap "rm -f $LOCKFILE; exit" INT TERM EXIT
echo $$ > $LOCKFILE

export SSL_CERT_FILE=${CIRCLE_ROOT}/trusted-US-cas.pem

my_database_ver="0.0"
[ -s ${CIRCLE_DB_PATH}/DATABASE_VERSION ] && {
        my_database_ver=$(cat ${CIRCLE_DB_PATH}/DATABASE_VERSION)
} || {
        [ -s ${CIRCLE_ROOT}/db/DATABASE_VERSION ] && {
                my_database_ver=$(cat ${CIRCLE_ROOT}/db/DATABASE_VERSION)
        }
}

#download database
if [ ! -f ${CIRCLE_DB_PATH}/circle.db ]; then

    echo "${CIRCLE_DB_PATH}/circle.db not found"
    if [ ! -d  ${CIRCLE_DB_PATH} ]; then
        mkdir -p  ${CIRCLE_DB_PATH}
    fi

    echo "Downloading new circle db to ${CIRCLE_DB_PATH}"
    ${CURL} ${CURLOPTS} --max-time 200 -o ${CIRCLE_TMP}/database.tar.gz -H "Authorization: Bearer ${CLOUD_TOKEN}" -A "Netgear-Agent ${FIRMWARE_VER}" https://$DOWNLOAD_CLOUD/api/v1.0/firmware/v2/getdatabase
    if [ -f ${CIRCLE_TMP}/database.tar.gz ]; then
        ${FWVERIFY} ${CIRCLE_TMP}/database.tar.gz | gunzip -c | tar xf - -C ${CIRCLE_DB_PATH}/
        rm -f ${CIRCLE_TMP}/database.tar.gz
    else
        echo "Circle database not downloaded"
        exit 1
    fi
    echo "Circle database download successfully"
    ${CIRCLE_ROOT}/sv restart timetracker

else
    echo "Circle database already downloaded, checking version"
    CHECKVERSION_TAGS="&FVER=$my_firmware_ver&DBVER=$my_database_ver"
    check_versions ${CHECKVERSION_TAGS}
    database_ver=$(awk '/database_ver/{print $2}' ${CIRCLE_TMP}/versions);
    firmware_ver=$(awk '/firmware_ver/{print $2}' ${CIRCLE_TMP}/versions);
    # Update database
    if [ "$database_ver" != "0.0" -a "$my_database_ver" != "$database_ver" ] ; then
        ${CURL} ${CURLOPTS} --max-time 200 -o ${CIRCLE_TMP}/database.tar.gz -H "Authorization: Bearer ${CLOUD_TOKEN}" -A "Netgear-Agent ${FIRMWARE_VER}" https://$DOWNLOAD_CLOUD/api/v1.0/firmware/v2/getdatabase
        if [ -f ${CIRCLE_TMP}/database.tar.gz ]; then
            ${FWVERIFY} ${CIRCLE_TMP}/database.tar.gz | gunzip -c | tar xf - -C ${CIRCLE_DB_PATH}/
            rm -f ${CIRCLE_TMP}/database.tar.gz
        else
            echo "Circle database not downloaded"
            exit 1
        fi
        echo "Circle database download successfully"
        ${CIRCLE_ROOT}/sv restart timetracker
    else
        echo "not updating database: database_ver=$database_ver my_database_ver=$my_database_ver"
    fi
fi

rm -rf $LOCKFILE
exit
