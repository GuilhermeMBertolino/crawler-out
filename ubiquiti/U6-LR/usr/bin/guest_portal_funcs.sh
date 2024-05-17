UNIFI_UTIL_FUNCS=${UNIFI_UTIL_FUNCS:-/usr/bin/unifi_util_funcs.sh}
. "$UNIFI_UTIL_FUNCS"

IPSET="${IPSET:-ipset}"
LOGGER="${LOGGER:-logger}"

GUEST_IPTABLES_PREROUTING=${GUEST_IPTABLES_PREROUTING:-PREROUTING}
GUEST_IPTABLES_REDIRECTOR=${GUEST_IPTABLES_REDIRECTOR:-REDIRECTOR}

GUEST_ROOT_DIR="${GUEST_ROOT_DIR:-/var/run/guest}"
GUEST_SUBDIR_ID=id
GUEST_SUBDIR_PORTAL=portal
GUEST_DIR_ID="$GUEST_ROOT_DIR/$GUEST_SUBDIR_ID"
GUEST_DIR_PORTAL="$GUEST_ROOT_DIR/$GUEST_SUBDIR_PORTAL"

GUEST_DEPRECATED_NAME=unspecified
GUEST_FNAME_AUTHORIZED=authorized
GUEST_FNAME_DEVNAMES=devnames
GUEST_FNAME_IPSET=ipset
GUEST_FNAME_PORTAL=$GUEST_SUBDIR_PORTAL

REDIRECTOR_CFG=${REDIRECTOR_CFG:-/var/run/redirector.cfg}

# Locking should be implemented to make sure guest file updates are atomic

guest_log() {
	$LOGGER -t "guest_portal" "$@"
}

guest_debug() {
	guest_log -p user.debug "$@"
}

guest_error() {
	guest_log -s -p user.error "$@"
}

if ! type guest_portal_enabled | grep -q "function"; then
	guest_error "guest_portal_enabled should be defined"
	# default guest_portal_enabled true
	guest_portal_enabled() {
		true
	}
fi

guest_portal_file() {
	local PORTAL="${1:-$GUEST_DEPRECATED_NAME}"
	local FILE="${2:-}"
	local DIR="${GUEST_ROOT_DIR}/portal/${PORTAL}"

	if [ ! -d "$DIR" ]; then
		DIR="${GUEST_ROOT_DIR}/${PORTAL}"
	fi
	if [ ! -d "$DIR" ]; then
		guest_error "portal '$1' does not exist"
		return 1
	fi

	[ -n "$FILE" ] && FILE="/$FILE"
	echo "${DIR}${FILE}"
	return 0
}

guest_authorized_file() {
	guest_portal_file "$1" $GUEST_FNAME_AUTHORIZED
}

guest_ipset_file() {
	guest_portal_file "$1" $GUEST_FNAME_IPSET
}

guest_devnames() {
	local FILE
	FILE="$(guest_portal_file "$1" $GUEST_FNAME_DEVNAMES)" || return 1
	cat "$FILE" | sed "s/,/ /g"
}

guest_ipset_name() {
	local PORTAL="$1"

	local FILE
	if FILE="$(guest_ipset_file "$PORTAL")"; then
		if [ -f "$FILE" ]; then
			cat "$FILE" && return $?
		fi
	else
		guest_error "Cannot get ipset name for portal '$PORTAL'"
	fi
	if [ -n "${DEFAULT_GUEST_IPSET:-}" ]; then
		echo "${DEFAULT_GUEST_IPSET}"
	else
		guest_error "Cannot get ipset name: must specify PORTAL or DEFAULT_GUEST_IPSET"
		return 1
	fi
}

ipset_exists() {
	$IPSET -q list "$1" >/dev/null 2>&1
}

iptable_chain_exists() {
	iptables-save | awk "/$1/,/COMMIT/" | grep -q "^:$2 "
}

# ARGS: [PORTAL]
guest_is_deprecated_portal() {
	local PORTAL="${1:-}"
	local FILE="$(guest_portal_file "$PORTAL" $GUEST_FNAME_PORTAL)"
	if [ -f "$FILE" ]; then
		[ "$(cat "$FILE")" = "$GUEST_DEPRECATED_NAME" ]
		return $?
	else
		return 1
	fi
}

# ARGS: [PORTAL]
guest_portal_id() {
	local PORTAL="${1:-}"
	local PORTAL_DIR
	if PORTAL_DIR="$(guest_portal_file "$PORTAL")"; then
		basename "$(readlink -f "$PORTAL_DIR")"
	else
		return 1
	fi
	return 0
}

guest_ipset_reload() {
	local FILE="$1"
	local IPSET_NAME="$2"

	if ! guest_portal_enabled; then
		$IPSET flush "$IPSET_NAME"
		return
	fi
	if ipset_exists "$IPSET_NAME"; then
		$IPSET flush "$IPSET_NAME"
	else
		$IPSET create "$IPSET_NAME" hash:mac
	fi

	# no file means no macs to add
	[ ! -f "$FILE" ] && return

	local MAC
	# read through all macs and add them to ipset
	while read -r MAC; do
		$IPSET add "$IPSET_NAME" "$MAC"
	done < "$FILE"
}

guest_mac_action() {
	local ACTION="$1"
	local MAC="$2"
	local PORTAL="$3"

	case "$ACTION" in
		add|del)
			# Allowed actions
			;;
		*)
			guest_error "unknown guest_mac_action: '$ACTION'"
			return
			;;
	esac

	local IPSET_NAME FILE
	IPSET_NAME="$(guest_ipset_name "$PORTAL")" || return 1
	FILE="$(guest_authorized_file "$PORTAL")" || return 1

	${ACTION}_mac "$FILE" "$MAC"

	if ipset_exists $IPSET_NAME; then
		$IPSET $ACTION "$IPSET_NAME" "$MAC"
	else
		guest_ipset_reload "$FILE" "$IPSET_NAME"
	fi
}

# ARGS: MAC PORTAL
guest_authorize() {
	guest_portal_enabled || return
	guest_mac_action add "$1" "${2:-}"
}

# ARGS: MAC PORTAL
guest_unauthorize() {
	guest_portal_enabled || return
	guest_mac_action del "$1" "${2:-}"
}

# ARGS: FUNC [EXTRA_ARGS...]
# Will pass PORTAL as the first ARG followed by all others
for_each_guest_portal() {
	local FUNC="$1"
	shift
	local PORTAL_DIR
	for PORTAL_DIR in "$GUEST_DIR_PORTAL/"*; do
		local PORTAL="$(basename "$PORTAL_DIR")"
		[ "$PORTAL" = '*' ] && continue
		$FUNC "$PORTAL" "$@"
	done
}

# ARGS: [PORTAL]
guest_authorized_reload() {
	local PORTAL="${1:-}"
	if [ -z "$PORTAL" ]; then
		for_each_guest_portal guest_authorized_reload
		return
	fi
	local IPSET_NAME FILE
	IPSET_NAME="$(guest_ipset_name "$PORTAL")" || return 1
	FILE="$(guest_authorized_file "$PORTAL")" || return 1
	if ! guest_portal_enabled; then
		rm -f "$FILE"
	fi
	guest_ipset_reload "$FILE" "$IPSET_NAME"
}

# ARGS: [PORTAL]
guest_authorized_flush() {
	local PORTAL="${1:-}"
	local FILE

	if [ -z "$PORTAL" ]; then
		for_each_guest_portal guest_authorized_flush
		return
	fi
	FILE="$(guest_authorized_file "$PORTAL")" || return 1
	rm -f "$FILE"
	guest_authorized_reload "$PORTAL"
}

get_redirector_cfg() {
	local PORTAL="${1:-}"
	local SUBKEY="$2"
	local DEF="${3:-}"
	local ID
	if guest_is_deprecated_portal "$PORTAL"; then
		ID=""
	else
		ID=".$(guest_portal_id "$PORTAL")" || {
			echo -n "$DEF"
			return
		}
	fi

	get_config_value "$REDIRECTOR_CFG" "redirector${ID}.${SUBKEY}" "$DEF"
}

get_redirector_cfg_enabled() {
	config_value_is_enabled "$(get_redirector_cfg "${1:-}" "$2" "${3:-}")"
}

guest_redirector_iptables_chain() {
	local ID
	ID=$(guest_portal_id "$PORTAL") || return $?
	echo "${GUEST_IPTABLES_REDIRECTOR}_${ID}"
}

guest_iptables_redirect() {
	local CHAIN=$1
	local PROTO=$2
	local DPORT=$3
	local TO_PORTS=$4
	iptables -t nat -A $CHAIN -p $PROTO --dport $DPORT -j REDIRECT --to-ports $TO_PORTS
}

# ARGS: [PORTAL]
guest_redirector_init_iptables() {
	local PORTAL="${1:-}"
	if [ -z "$PORTAL" ]; then
		for_each_guest_portal guest_redirector_init_iptables
		return
	fi
	local REDIRECT_CHAIN
	REDIRECT_CHAIN=$(guest_redirector_iptables_chain "$PORTAL") || return $?

	# If the rule exists, it might be stale from program crash,
	# remove it and reinitialize
	iptable_chain_exists nat $REDIRECT_CHAIN && guest_redirector_deinit_iptables "$PORTAL"

	if ! iptable_chain_exists nat $GUEST_IPTABLES_REDIRECTOR ||
		! iptables -t nat -S | grep -q -- "-j $GUEST_IPTABLES_REDIRECTOR\>"; then
		[ -f /etc/marks.cfg ] && . /etc/marks.cfg
		guest_bits=${guest_bits:-1}
		guest_shift=${guest_shift:-31}
		local REDIRECT_MARK_MASK=$(( ( (1 << guest_bits) - 1) << guest_shift ))
		iptables -t nat -N $GUEST_IPTABLES_REDIRECTOR
		# Loop for CNT = 0 ... (guest_bits - 1)
		local CNT=0
		while [ $CNT -lt $guest_bits ]; do
			local REDIRECT_MARK=$(( ( 1 << CNT ) << guest_shift ))
			local IPTABLE_MARK="-m mark --mark $REDIRECT_MARK/$REDIRECT_MARK_MASK"
			iptables -t nat -I $GUEST_IPTABLES_PREROUTING 1 $IPTABLE_MARK \
				-j $GUEST_IPTABLES_REDIRECTOR
			CNT=$(( CNT + 1 ))
		done
	fi

	iptables -t nat -N $REDIRECT_CHAIN
	if guest_is_deprecated_portal "$PORTAL"; then
		iptables -t nat -I $GUEST_IPTABLES_REDIRECTOR -j $REDIRECT_CHAIN
	else
		local DEV
		for DEV in $(guest_devnames "$PORTAL"); do
			# Skip interfaces in bridge as the bridge device will be the
			# one to intercept packets in iptables.
			iface_is_in_bridge $DEV && continue
			iptables -t nat -A $GUEST_IPTABLES_REDIRECTOR -i $DEV -j $REDIRECT_CHAIN
		done
	fi

	local HTTP_PORT="$(get_redirector_cfg "$PORTAL" "port" ${DEFAULT_REDIRECTOR_HTTP_PORT:-80})"
	guest_iptables_redirect $REDIRECT_CHAIN tcp 80 $HTTP_PORT
	local RESERVED_PATTERN="$(get_redirector_cfg "$PORTAL" redirect_pattern)"
	local RESERVED_PORT="$(echo "$RESERVED_PATTERN" |
		sed -n "s/^http:\/\/[^:]\+:\([0-9]*\).*/\1/p")"
	if [ -n "$RESERVED_PORT" ]; then
		guest_iptables_redirect $REDIRECT_CHAIN tcp $RESERVED_PORT $HTTP_PORT
	fi
	if get_redirector_cfg_enabled "$PORTAL" "https.status"; then
		local HTTPS_PORT="$(get_redirector_cfg "$PORTAL" "port_https" ${DEFAULT_REDIRECTOR_HTTPS_PORT:-443})"
		guest_iptables_redirect $REDIRECT_CHAIN tcp 443 $HTTPS_PORT
	fi
	guest_iptables_redirect $REDIRECT_CHAIN tcp 53 53
	guest_iptables_redirect $REDIRECT_CHAIN udp 53 53
	guest_authorized_reload "$PORTAL"
}

# ARGS: [PORTAL]
guest_redirector_deinit_iptables() {
	local PORTAL="${1:-}"
	if [ -z "$PORTAL" ]; then
		if iptable_chain_exists nat $GUEST_IPTABLES_REDIRECTOR; then
			iptables-save | grep -v $GUEST_IPTABLES_REDIRECTOR | iptables-restore -c
		fi
		return
	fi
	local REDIRECT_CHAIN
	REDIRECT_CHAIN=$(guest_redirector_iptables_chain "$PORTAL") || return $?

	if iptable_chain_exists nat $REDIRECT_CHAIN; then
		iptables-save | grep -v $REDIRECT_CHAIN | iptables-restore -c
	fi

	local RULES="$(iptables -t nat -S $GUEST_IPTABLES_REDIRECTOR | grep -v -- "-N")"
	if [ -z "$RULES" ]; then
		# No more rules, let remove the main redirect chain
		iptables-save | grep -v $GUEST_IPTABLES_REDIRECTOR | iptables-restore -c
	fi
}

ebtable_chain_containing() {
	local TABLE="$1"
	local REGEX="$2"

	ebtables -t $TABLE -L | awk -F '[ ,]' \
		"/^Bridge chain:/{ chain = \$3 }
		/$REGEX/ { print chain; exit; }"
}

ebtable_guest_jump_target() {
	local TABLE="$1"
	local CHAIN="$2"
	local REGEX="$3"

	ebtables -t $TABLE -L $CHAIN | sed -n "/$REGEX/s/.* -j \([^ ]\+\).*/\1/p" | head -n 1
}

guest_ebtable_auth_chain() {
	local PORTAL="${1:-}"
	local IPSET_NAME CHAIN
	IPSET_NAME="$(guest_ipset_name "$PORTAL")" || return 1
	CHAIN="$(ebtable_chain_containing nat "--set $IPSET_NAME .* -j ACCEPT")"
	if [ -z "$CHAIN" ]; then
		guest_error "Could not find ebtable chain for portal '$PORTAL' ipset $IPSET_NAME"
		return 1
	fi
	echo "$CHAIN"
}

# ARGS: [PORTAL] BYPASS
guest_bypass_ebtables_authorized() {
	local PORTAL="${1:-}"
	local BYPASS="$2" # true or false
	if [ -z "$PORTAL" ]; then
		for_each_guest_portal guest_bypass_ebtables_authorized "$BYPASS"
		return
	fi
	local CHAIN
	CHAIN="$(guest_ebtable_auth_chain "$PORTAL")"
	if [ -z "$CHAIN" ]; then
		guest_error "guest_bypass_ebtables_authorized faile to get chain"
		return 1
	fi
	local RULE1="$(ebtables -t nat -L $CHAIN | sed -n "/^Bridge chain: $CHAIN/{n;p;}")"

	local BYPASSED=$(echo "$RULE1" | grep -q "^-j ACCEPT" && echo true || echo false)
	# check if bypass state already correct
	[ "$BYPASS" = "$BYPASSED" ] && return 0

	# The first rule determines bypassing. Either add it to bypass or
	# remove it for normal operation using authorized_guests_x ipset
	if $BYPASS; then
		ebtables -t nat -I $CHAIN 1 -j ACCEPT
	else
		ebtables -t nat -D $CHAIN 1
	fi
}

# ARGS: [PORTAL] BYPASS
guest_bypass_iptables_authorized() {
	local PORTAL="${1:-}"
	local BYPASS="$2" # true or false
	if [ -z "$PORTAL" ]; then
		for_each_guest_portal guest_bypass_iptables_authorized "$BYPASS"
		return
	fi
	local IPSET_NAME CHAIN
	IPSET_NAME="$(guest_ipset_name "$PORTAL")" || return 1
	CHAIN_JUMP="$(iptables -S | sed -n "s/-A \([a-zA-Z0-9_]\+\) -m set --match-set $IPSET_NAME src .* -j \(RETURN\|ACCEPT\)/\1 \2/p" | head -n 1)"
	if [ -z "$CHAIN_JUMP" ]; then
		guest_error "Could not find iptable chain for portal '$PORTAL' ipset $IPSET_NAME"
		return 1
	fi
	local CHAIN="$(echo "$CHAIN_JUMP" | cut -d ' ' -f 1)"
	local JUMP="$(echo "$CHAIN_JUMP" | cut -d ' ' -f 2)"

	local RULE1="$(iptables -S $CHAIN | sed -n "/^-A $CHAIN /{p;q;}")"

	local BYPASSED=$(echo "$RULE1" | grep -q "^-A $CHAIN -j $JUMP" && echo true || echo false)
	# check if bypass state already correct
	[ "$BYPASS" = "$BYPASSED" ] && return 0

	# The first rule determines bypassing. Either add it to bypass or
	# remove it for normal operation using authorized_guests_x ipset
	if $BYPASS; then
		iptables -I $CHAIN 1 -j $JUMP
	else
		iptables -D $CHAIN 1
	fi
}

guest_portal_has_devname() {
	local PORTAL="${1:-}"
	local DEV="$2"

	if guest_devnames "$PORTAL" | grep -q "\<$DEV\>"; then
		echo "$PORTAL"
	fi
}

guest_portal_from_devname() {
	local DEV="$1"

	for_each_guest_portal guest_portal_has_devname "$DEV"
}

# ARGS: ACTION IFACE
guest_update_interface_ebtables() {
	local ACTION="$1"
	local IFACE="$2"

	local EB_ACTION
	case "$ACTION" in
		add)
			EB_ACTION=A
			;;
		del)
			EB_ACTION=D
			;;
		*)
			guest_error "guest_update_interface_ebtables: unknown action $ACTION"
			return 1
			;;
	esac

	local VLAN_PARENT="$(echo "$IFACE" | sed 's/\.[0-9]*$//')"
	local MARK_FILE="/var/run/mark_info.$VLAN_PARENT"
	if [ -f "$MARK_FILE" ]; then
		local MARK=$(cat "$MARK_FILE")
		ebtables --concurrent -t nat -$EB_ACTION PREROUTING -i $IFACE -j mark $MARK --mark-target CONTINUE
		[ $? -eq 0 ] || guest_error "Failed to $ACTION ebtables mark -i $IFACE: '$MARK'"
		ebtables --concurrent -t nat -$EB_ACTION POSTROUTING -o $IFACE -j mark $MARK --mark-target CONTINUE
		[ $? -eq 0 ] || guest_error "Failed to $ACTION ebtables mark -o $IFACE: '$MARK'"
	fi

	if [ "$(cat /var/run/vapusage.$VLAN_PARENT)" != "guest" ]; then
		return 0
	fi

	local PORTAL GUESTIN GUESTOUT CHAINS_GOOD=false
	PORTAL=$(guest_portal_from_devname "$VLAN_PARENT")
	while ! $CHAINS_GOOD; do
		if [ -z "$PORTAL" ]; then
			break
		fi

		local AUTH_CHAIN
		if ! AUTH_CHAIN="$(guest_ebtable_auth_chain "$PORTAL")"; then
			guest_error "guest_update_interface_ebtables failed to get auth chain"
			break
		fi
		if ! GUESTIN="$(ebtable_chain_containing nat "-j ${AUTH_CHAIN}\>")" ||
			[ -z "$GUESTIN" ]; then
			guest_error "guest_update_interface_ebtables failed to get guestin chain"
			break
		fi

		GUESTOUT=$(echo "$GUESTIN" | sed -n 's/IN/OUT/p')
		if [ -z "$GUESTOUT" ]; then
			guest_error "guest_update_interface_ebtables failed to get guestout chain"
			break
		fi

		CHAINS_GOOD=true
		break
	done

	while ! $CHAINS_GOOD; do
		GUESTIN=$(ebtable_guest_jump_target nat PREROUTING "-i $VLAN_PARENT -j")
		if [ -z "$GUESTIN" ]; then
			guest_error "guest_update_interface_ebtables cannot find GUESTIN jump chain"
			GUESTIN=GUESTIN
		fi

		GUESTOUT=$(ebtable_guest_jump_target nat POSTROUTING "-o $VLAN_PARENT -j")
		if [ -z "$GUESTOUT" ]; then
			guest_error "guest_update_interface_ebtables cannot find GUESTOUT jump chain"
			GUESTOUT=GUESTOUT
		fi
		CHAINS_GOOD=true
		break
	done
	if $CHAINS_GOOD; then
		ebtables --concurrent -t nat -$EB_ACTION PREROUTING -i $IFACE -j $GUESTIN
		[ $? -eq 0 ] || guest_error "Failed to $ACTION ebtables jump -i $IFACE to $GUESTIN"
		ebtables --concurrent -t nat -$EB_ACTION POSTROUTING -o $IFACE -j $GUESTOUT
		[ $? -eq 0 ] || guest_error "Failed to $ACTION ebtables jump -o $IFACE to $GUESTOUT"
	fi
}
# TODO: USG iptables

