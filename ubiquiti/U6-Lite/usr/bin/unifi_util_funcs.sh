# Include once
[ "${UNIFI_UTIL_FUNCS_INCLUDED:-}" != yes ] || return
UNIFI_UTIL_FUNCS_INCLUDED=yes

lock_mac_table() {
	local TIMEOUT=$1
	local LOCKNAME=$2.lock

	until dotlockfile -l -p -r 0 "$LOCKNAME"; do
		if [ $TIMEOUT -le 0 ]; then
			return 1
		fi
		TIMEOUT=$((TIMEOUT - 1))
		logger "lock_mac_table $TIMEOUT"
		sleep 1
	done
	return 0
}

unlock_mac_table() {
	local LOCKNAME=$1.lock

	dotlockfile -u "$LOCKNAME"
}

# ARGS: FILE MAC
add_mac() {
	local FILE="$1"
	local MAC="$2"

	if ! lock_mac_table 60 "$FILE"; then
		log "Error: unable to lock file $FILE"
		return 1
	fi

	[ -f "$FILE" ] || touch "$FILE"
	awk -v found=0 "{ if (\$0 ~ /^$MAC/) {if (!found) print; found=1} else {print}}
			END{if (!found) print \"$MAC\"}" "$FILE" > "$FILE.tmp"
	mv "$FILE.tmp" "$FILE"

	unlock_mac_table $FILE
	return 0
}

# ARGS: FILE MAC
del_mac() {
	local FILE="$1"
	local MAC="$2"

	if ! lock_mac_table 60 "$FILE"; then
		log "Error: unable to lock file $FILE"
		return 1
	fi

	[ -f "$FILE" ] && sed -i "/^$MAC/d" "$FILE"
	unlock_mac_table $FILE
	return 0
}

handle_dyn() {
	local CMD_TYPE=$1
	local ACTION=$2
	shift 2

	local HOSTAPD_CONFIG_DIR="/etc/hostapd"
	local HOSTAPD_RUN_DIR="/var/run/hostapd"
	local RADIO_NAME=
	local PSK=
	local MAC=
	local KEYID=
	local VLANID=

	local APPLY_IT=true
	local DEFAULT_MAC_ADD=

	local FILE_SUFFIX
	local OPTLIST
	local OPT
	local RELOAD_CMD
	case "$CMD_TYPE" in
		psk)
			FILE_SUFFIX=psk
			OPTLIST="i:k:m:np:v:"
			REQUIRED_PARAMS_ADD="RADIO_NAME PSK"
			## default add wildcard mac
			DEFAULT_MAC_ADD=00:00:00:00:00:00
			RELOAD_CMD=reload_wpa_psk
			;;
		accept-mac)
			FILE_SUFFIX=accept
			OPTLIST="i:m:nv:"
			REQUIRED_PARAMS_ADD="RADIO_NAME MAC"
			RELOAD_CMD=reload_accept_mac
			;;
		*)
			log "Error: handle_dyn illegal type $CMD_TYPE"
			return 1
			;;
	esac

	while getopts "$OPTLIST" OPT; do
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
				log "Error: handle_dyn $CMD_TYPE illegal option"
				return 1
				;;
		esac
	done

	local REQUIRED_PARAMS=
	case "$ACTION" in
		add)
			REQUIRED_PARAMS=$REQUIRED_PARAMS_ADD
			if [ -z "$MAC" -a -n "$DEFAULT_MAC_ADD" ]; then
				MAC="$DEFAULT_MAC_ADD"
			fi
			;;
		del|apply)
			;;
		*)
			log "Error: handle_dyn $CMD_TYPE unknown action $ACTION"
			return 1
	esac

	local REQUIRED_PARAM
	for REQUIRED_PARAM in $REQUIRED_PARAMS; do
		if eval "[ -z \"\$$REQUIRED_PARAM\" ]"; then
			log "Error: handle_dyn $CMD_TYPE $ACTION: missing required param $REQUIRED_PARAM"
			return 1
		fi
	done

	if [ -z "$RADIO_NAME" ]; then
		# do action for all radios for commands that allow it
		for RADIO_NAME in $(find "$HOSTAPD_CONFIG_DIR" -name "*.$FILE_SUFFIX" 2> /dev/null); do
			RADIO_NAME=$(basename "${RADIO_NAME%.${FILE_SUFFIX}}")
			handle_dyn $CMD_TYPE $ACTION "$@" -i "$RADIO_NAME"
		done
		return
	fi

	local FILE="$HOSTAPD_CONFIG_DIR/$RADIO_NAME.$FILE_SUFFIX"
	local FILE_DYN="$HOSTAPD_RUN_DIR/$RADIO_NAME.dyn.$FILE_SUFFIX"
	if ! [ -f "$FILE" ] ; then
		log "Error: $CMD_TYPE $ACTION radio $RADIO_NAME has no $FILE_SUFFIX file"
		return 1
	fi

	dyn_get_entry() {
		local IS_PATTERN=$1
		local ADD_SPACE=""
		local SED_COMMAND="s/^//" # null operation

		if $IS_PATTERN; then
			SED_COMMAND="s|[$.*[\\^]|\\\\\0|g" # escape sed chars
		fi
		case "$CMD_TYPE" in
			psk)
				set -- "keyid=" "$KEYID" "vlanid=" "$VLANID" "" "$MAC" "" "$PSK"
				;;
			accept-mac)
				set -- "" "$MAC" "" "$VLANID"
				;;
		esac
		while [ $# -ge 2 ]; do
			local PREFIX=$1
			local VALUE=$2
			shift 2
			if [ $# -eq 0 ]; then
				case "$CMD_TYPE" in
					psk)
						# PSK always has a space in front
						ADD_SPACE=" "
						;;
					accept-mac)
						# VLANID is optional but always has a space in front
						ADD_SPACE=" "
						[ -n "$VALUE" ] || ADD_SPACE=""
						;;
				esac
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

	ensure_dyn_file() {
		# Check existing dyn file. Must match both radio and ssid,
		# otherwise the VAP has changed sufficiently that we can't
		# reuse existing values
		local SSID_MARK="# SSID="
		local CFG_SSID=$(get_config_value "$HOSTAPD_CONFIG_DIR/$RADIO_NAME.cfg" ssid)
		local DYN_SSID=$(sed -n "s/^$SSID_MARK//p;q" "$FILE_DYN" 2>/dev/null)
		[ "$DYN_SSID" = "$CFG_SSID" ] || echo "$SSID_MARK$CFG_SSID" > "$FILE_DYN"
	}

	if [ $ACTION = apply ]; then
		ensure_dyn_file
		APPLY_IT=true
	else
		[ -f "$FILE_DYN" ] || ensure_dyn_file
		local SED_PATTERN=$(dyn_get_entry true)
		sed -i -e '/^#/{p;d}' -e "/^$SED_PATTERN\$/d" "$FILE_DYN"
		if [ $ACTION = add ]; then
			dyn_get_entry false >> "$FILE_DYN"
		fi
	fi

	if $APPLY_IT; then
		local DYN_MARK="# Dynamic entries below here"
		sed -i "/^$DYN_MARK/,\$d" "$FILE"
		{ echo "$DYN_MARK"; cat "$FILE_DYN"; } >> "$FILE"
		if [ -e "$HOSTAPD_RUN_DIR/$RADIO_NAME" ]; then
			hostapd_cli -i "$RADIO_NAME" $RELOAD_CMD
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

# This function checks if all VLAN interfaces associated with the given interface name are part of a bridge.
# Input parameters:
# 	$1: interface_name - The network interface name to be checked.
# Return value:
# 	0: If all associated VLAN interfaces are part of a bridge.
# 	1: If any associated VLAN interface is not part of a bridge.
#
are_all_vlan_interfaces_in_bridge() {
	local interface_name="$1"
	local vlan_interfaces=$(ip -d link show type vlan | grep "@${interface_name}" | awk '{print $2}' | cut -f1 -d'@')

	for vlan_interface in ${vlan_interfaces}; do
		if ! iface_is_in_bridge "${vlan_interface}"; then
			return 1
		fi
	done

	return 0
}

# ARGS: IFACE
iface_is_create_vlan() {
	local var=$(grep vlan_naming /etc/hostapd/$1.cfg | awk -F '=' '{print $2}')
	if [ "$var" = 1 ]; then
		return 0
	fi
	return 1
}

sanitize_cfg() {
	local PREFIX="resolv.host.1.name"
	local CFG=${1:-"/tmp/system.cfg"}
	local HOST=$(get_config_value $CFG $PREFIX)

	# sanitize the hostname
	CLEANED=$(echo ${HOST} | sed 's/[^a-zA-Z0-9_. -]//g')

	# use a default hostname if the cleaned one is blank
	if [ -z "$CLEANED" ]; then
		CLEANED="UBNT"
	fi

	# replace original hostname with sanitized one
	sed -i 's/'${PREFIX}'=.*/'"${PREFIX}=${CLEANED}"'/' $CFG
}

get_fw_env() {
	local val
	local ret
	if [ -f /var/run/fw_env ]; then
		val=$(awk -F= -v name="$1" '$0 ~ name {print $2}' /var/run/fw_env)
		if [ -z $val ]; then
			val="ENODATA"
		fi
	elif [ -n "$(which fw_printenv)" ]; then
		val=$(fw_printenv -n "$1" 2>&1)
		ret=$?
		if [ $ret -ne 0 ]; then
			val="ENOTSUP"
		fi
	else
		val="ENOEXEC"
	fi
	echo $val
}

get_mgmt_cfg() {
	echo $(awk -F= -v name="$1" '$0 ~ name {print $2}' /etc/persistent/cfg/mgmt)
}

set_fw_env() {
	fw_setenv "$1" "$2"
	local val=$(get_fw_env $1)
	if [ "$val" != "" ]; then
			[ -f /var/run/fw_env ] && sed -i -e "s/$1=$val/$1=$2/g" "/var/run/fw_env"
	else
			echo "$1=$2" >> "/var/run/fw_env"
	fi
}
