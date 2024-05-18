# Copyright (C) 2009-2010 OpenWrt.org
# Copyright (C) 2009 Malte S. Stretz <http://msquadrat.de>
#
# This is a temporary file, I hope to have some of this stuff merged into
# /lib/functions.sh (without the fw_ prefix of course) one day.

. /lib/config/uci.sh

fw_config_append() { # <package>
	CONFIG_APPEND=1 config_load "$@"
	unset CONFIG_APPEND
}

fw_config_once() { # <function> <type>
	local func=$1
	local type=$2
	shift 2

	local config=cfg00nil
	fw_config__once() {
		config=$1
	}
	config_foreach fw_config__once "$type"

	$func $config "$@"
}

fw_config_get_section() { # <config> <prefix> <type> <name> <default> ...
	local config=$1
	local prefix=$2
	shift 2

	[ -n "$config" ] || return 1
	[ -n "$prefix" ] && {
		prefix="${prefix}_"
		export ${NO_EXPORT:+-n} -- "${prefix}NAME"="${config}"
		config_get "${prefix}TYPE" "$config" TYPE
	}

	local enabled
	config_get_bool enabled "$config" enabled 1
	[ $enabled -eq 1 ] || return 1

	[ "$1" == '{' ] && shift
	while [ $# -ge 3 ]; do
		local type=$1
		local name=$2
		local dflt=$3
		shift 3
		# TODO: Move handling of defaults to /lib/functions.sh
		# and get replace the case block with the following 
		# two lines:
		# type=${type#string}
		# config_get${type:+_${type}} "${prefix}${name}" "$config" "$name" "$dflt" || return
		case "$type" in
			string)
				local tmp
				config_get tmp "$config" "$name" || return
				[ -z "$tmp" ] && tmp=$dflt
				export ${NO_EXPORT:+-n} -- "${prefix}${name}=${tmp}"
				continue
			;;
			boolean)
				type=bool
			;;
		esac;
		
		local cmd=${prefix}config_get_${type}
		type $cmd > /dev/null || {
			cmd=config_get_${type} 
		}
		type $cmd > /dev/null || {
			echo "config type $type (for $name) not supported" >&2
			return 1
		}
		$cmd "${prefix}${name}" "$config" "$name" "$dflt" || return
	done
}

csl_config_get_client(){
    fw_config_get_section "$1" client { \
        string mac               "" \
        string enable            "off" \
        string up_band           "" \
        string down_band         "" \
        string old_mark          "" \
        string mark              "" \
        string need_reload       "off" \
    } || return
}

csl_config_get_qos(){
	# $1 should be qos_v2 section "settings"
	# keep the old mark value to delete the rule
    fw_config_get_section "settings" qos { \
        string enable           "off" \
        string up_band          "" \
        string down_band        "" \
        string high             "90" \
        string low              "10" \
        string percent          "92" \
        string up_unit          "mbps" \
        string down_unit        "mbps" \
        string rUpband          "" \
        string rDownband        "" \
    } || return   
}
