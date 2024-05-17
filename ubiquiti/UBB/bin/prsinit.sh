#!/bin/sh

WIFIMODE=$1
WIFIMODE=${WIFIMODE:=none}
IFNAME='wlan0'

log()
{
    echo "PRS_INT - $@"
    logger -t PRS_INIT "$@"
}


if [ "${WIFIMODE}" = "mon" ]; then
    insmod /lib/modules/$(uname -r)/prs_falcon.ko PRS_SNIFFER_MODE_ENABLE=1
    log "PRS MONITOR MODE ENABLED"
    ip link set dev ${IFNAME} up
    exit 0;
fi

insmod /lib/modules/$(uname -r)/prs_falcon.ko PRS_BRIDGE_MODE_ENABLE=1

PRS_INIT_CONF=/usr/etc/01-init.conf
PRS_DEVPATH=$(find /sys -name prs_attrs)/..
SYS_NETPATH=/sys/devices/virtual/net/

conf_LINENUM=0
while read conf ; do
    conf_LINENUM=$((conf_LINENUM+1))
    if [ -z "${conf}" ] || [ ${conf:0:1} = \# ] ; then
	continue
    fi

    # Parse the configuration line
    conf_TYPE=$(echo $conf | awk '{print $1}')
    conf_VALUE=0
    conf_HANDLE=
    if [  "${conf_TYPE}" = "mib" ] ; then
	mib_CLASS=$(echo $conf | awk '{print $2}')
	mib_GROUP=$(echo $conf | awk '{print $3}')
	mib_ROW=$(echo $conf | awk '{print $4}')
	mib_ENTRY=$(echo $conf | awk '{print $5}')
	mib_VALUE=$(echo $conf | awk '{print $6}')
	conf_VALUE=${mib_VALUE}
	conf_HANDLE=${PRS_DEVPATH}/mib/${mib_CLASS}/${mib_GROUP}/${mib_ROW}/${mib_ENTRY}

    elif [ "${conf_TYPE}" = "attr" ] ; then
	attr_NAME=$(echo $conf | awk '{print $2}')
	attr_VALUE=$(echo $conf | awk '{print $3}')
	conf_VALUE=${attr_VALUE}
	conf_HANDLE=${PRS_DEVPATH}/prs_attrs/${attr_NAME}
    elif [ "${conf_TYPE}" = "irq" ] ; then
	irq_NUMBER=$(echo $conf | awk '{print $2}')
	irq_AFFINITY=$(echo $conf | awk '{print $3}')
	conf_VALUE=${irq_AFFINITY}
	conf_HANDLE=/proc/irq/${irq_NUMBER}/smp_affinity
    else
	log "Unrecognized configuration type ${conf_TYPE}, line ${conf_LINENUM}:${conf}"
	continue
    fi

    log "Setting ${conf_HANDLE}=${conf_VALUE}"

    # Passing configuration done, we need to esure that we can write the configurarion
    if [ -f "${conf_HANDLE}" ] ; then
	if [ -w "${conf_HANDLE}" ] ; then
	    conf_RESULT=$(echo ${conf_VALUE} > "${conf_HANDLE}")
	    if ! [ -z "${conf_RESULT}" ] ; then
		log "$conf_RESULT"
	    fi
	else
	    og "Write on configuration handle not supported: ${conf_HANDLE}"
	fi
    else
	log "Configuration handle does not exist: ${conf_HANDLE}"
    fi
done < ${PRS_INIT_CONF}

log "prs initialization done"


if [ ${WIFIMODE} = "ap" ]; then
	/usr/bin/hostapd_60g -B /usr/etc/hostapd_60g.cfg
else
	/usr/bin/wpa_supplicant_60g -B -D nl80211 -i ${IFNAME} -c /usr/etc/wpa_60g.cfg
fi
