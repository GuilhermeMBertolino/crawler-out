#!/bin/sh
# Copyright (C) 2006-2014 OpenWrt.org
# Copyright (C) 2006 Fokus Fraunhofer <carsten.tittel@fokus.fraunhofer.de>
# Copyright (C) 2010 Vertical Communications


find_mmc_part() {
	local DEVNAME PARTNAME

	if grep -q "$1" /proc/mtd; then
		echo "" && return 0
	fi

	for DEVNAME in /sys/block/mmcblk0/mmcblk*p*; do
		PARTNAME=$(grep PARTNAME ${DEVNAME}/uevent | cut -f2 -d'=')
		[ "$PARTNAME" = "$1" ] && echo "/dev/$(basename $DEVNAME)" && return 0
	done
}

debug () {
	${DEBUG:-:} "$@"
}

# newline
N="
"

_C=0
NO_EXPORT=1
LOAD_STATE=1
LIST_SEP=" "

append() {
	local var="$1"
	local value="$2"
	local sep="${3:- }"

	eval "export ${NO_EXPORT:+-n} -- \"$var=\${$var:+\${$var}\${value:+\$sep}}\$value\""
}

list_contains() {
	local var="$1"
	local str="$2"
	local val

	eval "val=\" \${$var} \""
	[ "${val%% $str *}" != "$val" ]
}

config_load() {
	[ -n "$IPKG_INSTROOT" ] && return 0
	uci_load "$@"
}

reset_cb() {
	config_cb() { return 0; }
	option_cb() { return 0; }
	list_cb() { return 0; }
}
reset_cb

package() {
	return 0
}

config () {
	echo "not support uci config $1 $2"
}

option () {
	echo "not support uci option"
}

list() {
	echo "not support uci list"
}

config_unset() {
	echo "not support uci unset"
}

# config_get <variable> <section> <option> [<default>]
# config_get <section> <option>
config_get() {
	echo "not support uci config_get"
}

# config_get_bool <variable> <section> <option> [<default>]
config_get_bool() {
	echo "not support uci config_get_bool"
}

config_set() {
	echo "not support uci config_set"
}

config_foreach() {
	echo "not support uci config_foreach"
}

config_list_foreach() {
	echo "not support uci config_list_foreach"
}

insert_modules() {
	for m in $*; do
		if [ -f /etc/modules.d/$m ]; then
			sed 's/^[^#]/insmod &/' /etc/modules.d/$m | ash 2>&- || :
		else
			modprobe $m
		fi
	done
}

load_modules() {
	[ -d /etc/modules.d ] && {
		cd /etc/modules.d
		sed 's/^[^#]/insmod &/' $* | ash 2>&- || :
	}
}

default_prerm() {
	local name
	name=$(basename ${1%.*})
	[ -f /usr/lib/opkg/info/${name}.prerm-pkg ] && . /usr/lib/opkg/info/${name}.prerm-pkg
	for i in `cat /usr/lib/opkg/info/${name}.list | grep "^/etc/init.d/"`; do
		$i disable
		$i stop
	done
}

default_postinst() {
	local pkgname rusers ret
	ret=0
	pkgname=$(basename ${1%.*})
	rusers=$(grep "Require-User:" ${IPKG_INSTROOT}/usr/lib/opkg/info/${pkgname}.control)
	[ -n "$rusers" ] && {
		local user group uid gid
		for a in $(echo $rusers | sed "s/Require-User://g"); do
			user=""
			group=""
			for b in $(echo $a | sed "s/:/ /g"); do
				local ugname ugid

				ugname=$(echo $b | cut -d= -f1)
				ugid=$(echo $b | cut -d= -f2)

				[ -z "$user" ] && {
					user=$ugname
					uid=$ugid
					continue
				}

				gid=$ugid
				[ -n "$gid" ] && {
					group_exists $ugname || group_add $ugname $gid
				}

				[ -z "$gid" ] && {
					group_add_next $ugname
					gid=$?
				}

				[ -z "$group" ] && {
					user_exists $user || user_add $user "$uid" $gid
					group=$ugname
					continue
				}

				group_add_user $ugname $user
			done
		done
	}

	if [ -f ${IPKG_INSTROOT}/usr/lib/opkg/info/${pkgname}.postinst-pkg ]; then
		( . ${IPKG_INSTROOT}/usr/lib/opkg/info/${pkgname}.postinst-pkg )
		ret=$?
	fi
	[ -n "${IPKG_INSTROOT}" ] || rm -f /tmp/luci-indexcache 2>/dev/null

	[ "$PKG_UPGRADE" = "1" ] || for i in `cat ${IPKG_INSTROOT}/usr/lib/opkg/info/${pkgname}.list | grep "^/etc/init.d/"`; do
		[ -n "${IPKG_INSTROOT}" ] && $(which bash) ${IPKG_INSTROOT}/etc/rc.common ${IPKG_INSTROOT}$i enable; \
		[ -n "${IPKG_INSTROOT}" ] || {
			$i enable
			$i start
		}
	done
	return $ret
}

include() {
	local file

	for file in $(ls $1/*.sh 2>/dev/null); do
		. $file
	done
}

find_mtd_index() {
	local PART="$(grep "\"$1\"" /proc/mtd | awk -F: '{print $1}')"
	local INDEX="${PART##mtd}"

	echo ${INDEX}
}

find_mtd_part() {
	local INDEX=$(find_mtd_index "$1")
	local PREFIX=/dev/mtdblock

	[ -d /dev/mtdblock ] && PREFIX=/dev/mtdblock/
	echo "${INDEX:+$PREFIX$INDEX}"
}

group_add() {
	local name="$1"
	local gid="$2"
	local rc
	[ -f "${IPKG_INSTROOT}/etc/group" ] || return 1
	[ -n "$IPKG_INSTROOT" ] || lock /var/lock/group
	echo "${name}:x:${gid}:" >> ${IPKG_INSTROOT}/etc/group
	rc=$?
	[ -n "$IPKG_INSTROOT" ] || lock -u /var/lock/group
	return $rc
}

group_exists() {
	grep -qs "^${1}:" ${IPKG_INSTROOT}/etc/group
}

group_add_next() {
	local gid gids
	gid=$(grep -s "^${1}:" ${IPKG_INSTROOT}/etc/group | cut -d: -f3)
	[ -n "$gid" ] && return $gid
	gids=$(cat ${IPKG_INSTROOT}/etc/group | cut -d: -f3)
	gid=100
	while [ -n "$(echo $gids | grep $gid)" ] ; do
	        gid=$((gid + 1))
	done
	group_add $1 $gid
	return $gid
}

group_add_user() {
	local grp delim=","
	grp=$(grep -s "^${1}:" ${IPKG_INSTROOT}/etc/group)
	[ -z "$(echo $grp | cut -d: -f4 | grep $2)" ] || return
	[ -n "$(echo $grp | grep ":$")" ] && delim=""
	[ -n "$IPKG_INSTROOT" ] || lock /var/lock/passwd
	sed -i "s/$grp/$grp$delim$2/g" ${IPKG_INSTROOT}/etc/group
	[ -n "$IPKG_INSTROOT" ] || lock -u /var/lock/passwd
}

user_add() {
	local name="${1}"
	local uid="${2}"
	local gid="${3}"
	local desc="${4:-$1}"
	local home="${5:-/var/run/$1}"
	local shell="${6:-/bin/false}"
	local rc
	[ -z "$uid" ] && {
		uids=$(cat ${IPKG_INSTROOT}/etc/passwd | cut -d: -f3)
		uid=100
		while [ -n "$(echo $uids | grep $uid)" ] ; do
		        uid=$((uid + 1))
		done
	}
	[ -z "$gid" ] && gid=$uid
	[ -f "${IPKG_INSTROOT}/etc/passwd" ] || return 1
	[ -n "$IPKG_INSTROOT" ] || lock /var/lock/passwd
	echo "${name}:x:${uid}:${gid}:${desc}:${home}:${shell}" >> ${IPKG_INSTROOT}/etc/passwd
	echo "${name}:x:0:0:99999:7:::" >> ${IPKG_INSTROOT}/etc/shadow
	rc=$?
	[ -n "$IPKG_INSTROOT" ] || lock -u /var/lock/passwd
	return $rc
}

user_exists() {
	grep -qs "^${1}:" ${IPKG_INSTROOT}/etc/passwd 2>/dev/null
}

[ -z "$IPKG_INSTROOT" -a -f /lib/config/uci.sh ] && . /lib/config/uci.sh
