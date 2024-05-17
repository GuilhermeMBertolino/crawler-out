# Include once
[ "${UNIFI_UTIL_FUNCS_INCLUDED:-}" != yes ] || return
UNIFI_UTIL_FUNCS_INCLUDED=yes

# ARGS: FILE MAC
add_mac() {
	local FILE="$1"
	local MAC="$2"

	if [ ! -f "$FILE" ]; then
		echo "$MAC" >> "$FILE"
		return
	fi
	local CNT=$(grep -c "^$MAC" "$FILE")
	[ $CNT -eq 1 ] && return # already there
	[ $CNT -gt 1 ] && del_mac "$FILE" "$MAC"
	echo "$MAC" >> "$FILE"
}

# ARGS: FILE MAC
del_mac() {
	local FILE="$1"
	local MAC="$2"

	[ ! -f "$FILE" ] && return
	sed -i "/^$MAC/d" "$FILE"
}

handle_psk() {
	local ACTION=$1
	shift

	local HOSTAPD_CONFIG_DIR="/etc/hostapd"
	local HOSTAPD_RUN_DIR="/var/run/hostapd"
	local RADIO_NAME=
	local PSK=
	local MAC=
	local KEYID=
	local VLANID=

	local APPLY_IT=true

	local OPT
	while getopts "i:k:m:np:s:v:" OPT; do
		case "$OPT" in
			i)
				RADIO_NAME="$OPTARG"
				;;
			k)
				KEYID="$OPTARG"
				;;
			m)
				MAC="$OPTARG"
				;;
			n)
				APPLY_IT=false
				;;
			p)
				PSK="$OPTARG"
				;;
			v)
				VLANID="$OPTARG"
				;;
			*)
				log "Error: handle_psk illegal option"
				return 1
				;;
		esac
	done

	local REQUIRED_PARAMS=
	case "$ACTION" in
		add)

			REQUIRED_PARAMS="RADIO_NAME PSK"
			## default to wildcard mac
			[ -n "$MAC" ] || MAC="00:00:00:00:00:00"
			;;
		del|apply-dyn)
			;;
		*)
			log "Error: handle_psk unknown action $ACTION"
			return 1
	esac

	local REQUIRED_PARAM
	for REQUIRED_PARAM in $REQUIRED_PARAMS; do
		if eval "[ -z \"\$$REQUIRED_PARAM\" ]"; then
			log "Error: $ACTION-psk missing required param $REQUIRED_PARAM"
			return 1
		fi
	done

	if [ -z "$RADIO_NAME" ]; then
		# do action for all radios for commands that allow it
		for RADIO_NAME in $(find "$HOSTAPD_CONFIG_DIR" -name "*.psk" 2> /dev/null); do
			RADIO_NAME=$(basename "${RADIO_NAME%.psk}")
			handle_psk $ACTION "$@" -i "$RADIO_NAME"
		done
		return
	fi

	local PSK_FILE="$HOSTAPD_CONFIG_DIR/$RADIO_NAME.psk"
	local PSK_FILE_DYN="$HOSTAPD_RUN_DIR/$RADIO_NAME.dyn.psk"
	if ! [ -f "$PSK_FILE" ] ; then
		log "Error: $ACTION-psk radio $RADIO_NAME has no psk file"
		return 1
	fi

	psk_get_entry() {
		local IS_PATTERN=$1
		local ADD_SPACE=""
		local SED_COMMAND="s/^//" # null operation
		if $IS_PATTERN; then
			SED_COMMAND="s|[$.*[\\^]|\\\\\0|g" # escape sed chars
		fi
		set -- "keyid=" "$KEYID" "vlanid=" "$VLANID" "" "$MAC" "" "$PSK"
		while [ $# -ge 2 ]; do
			local PREFIX=$1
			local VALUE=$2
			shift 2
			if [ $# -eq 0 ]; then
				# PSK always has a space in front
				ADD_SPACE=" "
			fi
			if [ -n "$VALUE" ]; then
				echo -n "$ADD_SPACE$PREFIX$VALUE" | sed "$SED_COMMAND"
				ADD_SPACE=" "
			elif $IS_PATTERN; then
				echo -n "$ADD_SPACE.*"
				ADD_SPACE=""
			fi
		done
		# add newline for text entry
		$IS_PATTERN || echo ''
	}

	psk_ensure_dyn_file() {
		# Check existing dyn file. Must match both radio and ssid,
		# otherwise the VAP has changed sufficiently that we can't
		# reuse existing PSKs
		local SSID_MARK="# SSID="
		local CFG_SSID=$(get_config_value "$HOSTAPD_CONFIG_DIR/$RADIO_NAME.cfg" ssid)
		local DYN_SSID=$(sed -n "s/^$SSID_MARK//p;q" "$PSK_FILE_DYN" 2>/dev/null)
		[ "$DYN_SSID" = "$CFG_SSID" ] || echo "$SSID_MARK$CFG_SSID" > "$PSK_FILE_DYN"
	}

	if [ $ACTION = apply-dyn ]; then
		psk_ensure_dyn_file
		APPLY_IT=true
	else
		[ -f "$PSK_FILE_DYN" ] || psk_ensure_dyn_file
		local SED_PATTERN=$(psk_get_entry true)
		sed -i -e '/^#/{p;d}' -e "/^$SED_PATTERN\$/d" "$PSK_FILE_DYN"
		if [ $ACTION = add ]; then
			psk_get_entry false >> "$PSK_FILE_DYN"
		fi
	fi

	if $APPLY_IT; then
		local DYN_MARK="# Dynamic entries below here"
		sed -i "/^$DYN_MARK/,\$d" "$PSK_FILE"
		{ echo "$DYN_MARK"; cat "$PSK_FILE_DYN"; } >> "$PSK_FILE"
		if [ -e "$HOSTAPD_RUN_DIR/$RADIO_NAME" ]; then
			hostapd_cli -i "$RADIO_NAME" reload_wpa_psk
		fi
	fi
}

get_config_regex_value() {
	local CFG="$1"
	local REGEX="$2"
	local DEF="${3:-}"

	if [ ! -f "$CFG" ]; then
		echo "$DEF"
		return
	fi

	local LINE
	if ! LINE="$(grep -m 1 "^${REGEX}=" "$CFG" )"; then
		echo "$DEF"
		return
	fi

	echo "$LINE" | sed "s/[^=]*=//"
}

escape_for_regex() {
	echo -n "$1" | sed 's/\./\\./g'
}

# ARGS: CONF_FILE KEY [DEFAULT]
get_config_value() {
	get_config_regex_value "$1" "$(escape_for_regex "$2")" "${3:-}"
}

# ARGS: VALUE
config_value_is_enabled() {
	case "$1" in
		on|enabled|1|enable|active|true)
			return 0
			;;
		*)
			return 1
			;;
	esac
}

# ARGS: CONF_FILE KEY [DEFAULT]
get_config_enabled() {
	config_value_is_enabled "$(get_config_value "$1" "$2" "${3:-}")"
}

# ARGS: IFACE
iface_is_bridge() {
	[ -e "/sys/class/net/$1/bridge" ]
}

# ARGS: IFACE
iface_is_in_bridge() {
	[ -e "/sys/class/net/$1/brport" ]
}
