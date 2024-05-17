#!/bin/sh

# folder or file name to reserve, MUST NOT end with /
RESERVE_PATH="/etc/reserve-data"
[ -n "$1" -a "$1" = "all" ] && RESERVE_PATH=""

. /lib/functions/pega.sh

setlighttpdcertificate() {

	[ -f /etc/key/lighttpd.pem ] && rm -f /etc/key/lighttpd.pem 
	key=`head -200 /dev/urandom | md5sum | cut -f1 -d "-"`
	[ ! -d "/etc/reserve-data/" ] && {
		mkdir /etc/reserve-data
	}

	if [ -f /tmp/ntp_sync ]; then
		echo "Time Synchronized,  generate new certificate"
		openssl req -x509 -config /etc/ssl.conf -sha256 -newkey rsa:2048 -passin pass:$key -keyout /var/key.pem -out /var/cert.pem -days 3650 -nodes -passout pass:$key
		cat /var/key.pem /var/cert.pem > /tmp/lighttpd.pem
		interleave /tmp/lighttpd.pem  /etc/reserve-data/interleaved-lighttpd.pem
		touch /etc/reserve-data/facotryResetCertificateCheck
		
	else
		echo "Time UnSynchronized, copy default certificate"
		cp -a /etc/lighttpd/interleaved-lighttpd-default.pem /etc/reserve-data/interleaved-lighttpd.pem
	fi

	sync;sync;sync

}

echo "FACTORY RESET" > /dev/console
# Skip factoru reset in MFG mode
[ -f /tmp/mfg ] && return 0

# factory reset should re-generate certificate (Request by Netgear SQA)
setlighttpdcertificate

mtd_backup=$( find_mtd_part "$BACKUP_PART" )
[ -n "$mtd_backup" ] && {
	# TODO: only remove files not erase "Backup" partition
	umount "$mtd_backup" 2> /dev/null
	mtd erase $BACKUP_PART
}
OVERLAY="$( grep ' /overlay ' /proc/mounts )"
[ -n "$OVERLAY" ] && {
	# list the files in /overlay/upper/
	find /overlay/upper/ -type f > /tmp/rm_files
	# the files in /overlay/upper/etc/uci-defaults/ is type 'c' not 'f'
	find /overlay/upper/ -type c >> /tmp/rm_files
	# list the dirs in /overlay/upper/ but not include /overlay/upper/ (-mindepth 1)
	find /overlay/upper/ -type d -depth -mindepth 1 > /tmp/rm_dirs
	for reserved in $RESERVE_PATH; do
		# keep files in reserved folder
		cat /tmp/rm_files | grep -v "/overlay/upper${reserved}" > /tmp/rm_tmp
		mv /tmp/rm_tmp /tmp/rm_files
		parent=$(dirname $reserved) # ex: /etc
		# keep folder matched reserved and it's dirname (parent)
		cat /tmp/rm_dirs | grep -v "/overlay/upper${reserved}" | grep -v -x -w "/overlay/upper${parent}" > /tmp/rm_tmp
		mv /tmp/rm_tmp /tmp/rm_dirs
	done
	echo -n "Remove files and dirs in overlay" > /dev/console
	[ -n "$RESERVE_PATH" ] && echo " except path $RESERVE_PATH" > /dev/console || echo > /dev/console
	cat /tmp/rm_files | xargs rm -f
	cat /tmp/rm_dirs | xargs rm -rf
	sync
} || {
	mtdnum=$( find_mtd_index "$FIXED_PART" )
	[ -n "$mtdnum" ] && {
		mtd erase $FIXED_PART
		ubiformat /dev/mtd$mtdnum -y
	} || {
		mtd erase $DATA_PART
	}
}

