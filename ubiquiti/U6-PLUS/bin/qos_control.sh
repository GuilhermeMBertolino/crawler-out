#!/bin/sh

[ -f /etc/marks.cfg ] && . /etc/marks.cfg

CUSTOM_QOS_STA_SCRIPT="/var/run/qos.custom_rates.sh"

qos_control_log()
{
	logger -s -t qos_control.sh "$@"
}

qos_control_err()
{
	qos_control_log -p err "$@"
}

tc_log()
{
	local ERR
	ERR=$(tc "$@" 2>&1)
	local STATUS=$?
	if [ $STATUS -ne 0 ] ; then
		qos_control_err "Failed command: tc $@: error=$ERR"
		return $STATUS
	fi
}

show()
{
	local DEV
	local ACT
	local OPTS=
	if [ "-s" = "$1" ]; then
		OPTS=$1
		shift
	fi
	for DEV in "$@"; do
		valid_dev "$DEV" || continue
		echo "==================== $DEV ===================="
		for ACT in qdisc class filter; do
			if [ $ACT != filter ]; then
				echo "....................$ACT"
				tc $OPTS $ACT show dev "$DEV"
			else
				local FILTERS="$(tc qdisc show dev "$DEV" | cut -d ' ' -f 3 | sort)"
				for F in $FILTERS; do
					echo "....................Filters for $F"
					tc $ACT show dev "$DEV" parent $F
				done
			fi
		done
	done
}

calc_hex()
{
	printf "%x" $(( $@ ))
}

calc_hex_pad()
{
	printf "%#010x" $(( $@ ))
}

calc_mark_mask()
{
	local NAME=$1
	local DEF_BITS=$2
	local DEF_SHIFT=$3

	eval "${NAME}_bits=\${${NAME}_bits:-${DEF_BITS}}"
	eval "${NAME}_shift=\${${NAME}_shift:-${DEF_SHIFT}}"
	eval "${NAME}_mask=\$(calc_hex_pad \"(1 << ${NAME}_bits) - 1\" )"
	eval "${NAME}_mask_shifted=\$(calc_hex_pad \"${NAME}_mask << ${NAME}_shift\" )"
	eval "${NAME}_location=\${${NAME}_location:-skb}"
}

rate_helper()
{
	if ! echo "$1" | grep -q 'bit$'; then
		echo "${1}bit"
	else
		echo "$1"
	fi
}

# If mark bits are not given, then use the old defaults.
# The VAPID skb mark uses 5 bits and is shifted by 12 bits
# The ASSOCID skb mark uses 12 bits and is shifted 0 bits
# This provides a conflict since the tc major/minor numbers can only use
# 16 bits each, so 12 + 5 = 17 doesn't fit, so we throw away the highest order
# AID bit and use 11 bits instead.
# We do it this way for backwards compatibility with ACE since it uses 12 bit shift
# to mark packets using ebtables.
calc_mark_mask vapid 5 12
calc_mark_mask associd 11 0


# UDM shares TC with other processes and uses 12 bits for AID and VAP and thus
# must have a high bit major number. This works because all 12 bits will fit
# in the lower order bits of the major (for the final qdisc)
WIFI_MAJOR_UDM=1000
# UAP owns all TC operation and uses 16 bits for AID and VAP and thus we set a
# low bit major number. This works because VAP0 is not allowed and that leaves
# the lower major bits available since the 0x0AAA (for the final qdisc) can't
# happen
WIFI_MAJOR_UAP=100
if [ $((associd_bits + vapid_bits)) -eq 12 ]; then
	WIFI_MAJOR=${WIFI_MAJOR_UDM}
else
	WIFI_MAJOR=${WIFI_MAJOR_UAP}
fi

usage ()
{
	echo "Usage: $(basename $0) (cmd) <args...>"
	echo "  CMDS:"
	echo "    show        [-s] DEVS..."
	echo "    add-root    DEV RATE"
	echo "    del-root    DEV"
	echo "    has-root    DEV"
	echo "    add-vap     DEV VAPID RATE_MIN RATE_MAX"
	echo "    del-vaps    DEV"
	echo "    add-sta     DEV VAPID AID RATE_MIN RATE_MAX"
	echo "    change-sta  DEV VAPID AID RATE_MIN RATE_MAX"
	echo "    replace-sta DEV VAPID AID RATE_MIN RATE_MAX"
	echo "    del-sta     DEV VAPID AID"
}

require_params()
{
	local NEED=$1
	local HAVE=$2
	if [ $HAVE -lt $NEED ]; then
		qos_control_err "$CMD: requires $NEED params, but only given $HAVE"
		return 1
	fi
}

regex()
{
	echo "$1" | grep -q "$2"
}

valid_dev()
{
	local DEV="$1"
	if [ -z "$DEV" ] || regex "$DEV" '[[:space:]]\|/'; then
		qos_control_err "$CMD $ARGS... invalid dev '$DEV'"
		return 1;
	fi
}

valid_rate()
{
	local RATE="$1"
	if ! regex "$RATE" '^[0-9]\+[kmgtKMGT]\?\(bit\)\?$'; then
		qos_control_err "$CMD $ARGS... invalid rate '$RATE'"
		return 1;
	fi
}

valid_vap()
{
	local VAP="$1"
	if ! regex "$VAP" '^[0-9]\+$' || [ $VAP = 0 ]; then
		qos_control_err "$CMD $ARGS... invalid vap '$VAP'"
		return 1
	fi
}

valid_aid()
{
	local AID="$1"
	if ! regex "$AID" '^[0-9]\+$' || [ $AID = 0 ]; then
		qos_control_err "$CMD $ARGS... invalid aid '$AID'"
		return 1
	fi
}

get_quantum()
{
	local DEV="$1"
	local QUANTUM="$(cat /sys/class/net/$DEV/mtu)"
	if [ -n "$QUANTUM" ] ; then
		printf "quantum $QUANTUM"
	fi
}

add_root()
{
	require_params 2 $# || return $?
	local DEV="$1"
	local RATE=$(rate_helper "$2")
	valid_dev  "$DEV" || return $?
	valid_rate "$RATE" || return $?

	local QUANTUM="$(get_quantum "$DEV")"

	tc_log qdisc add dev "$DEV" root handle 1: htb default 10
	tc_log class add dev "$DEV" parent 1: classid 1:1 htb rate ${RATE} ${QUANTUM}
	tc_log class add dev "$DEV" parent 1:1 classid 1:10 htb rate 512kbit ceil ${RATE} ${QUANTUM}
	tc_log qdisc add dev "$DEV" parent 1:10 handle 10: fq_codel limit 1000 noecn
}

del_root()
{
	require_params 1 $# || return $?
	local DEV="$1"
	valid_dev "$DEV" || return $?
	tc_log qdisc del dev "$DEV" root
}

has_root()
{
	require_params 1 $# || return $?
	local DEV="$1"
	valid_dev "$DEV" || return $?
	tc_log qdisc show dev "$DEV" | awk -v root=0 -v default=0 \
'{
	if ($0 ~ "htb 1: root.*default 10")
		root=1;
	if ($0 ~ "fq_codel 10: parent 1:10")
		default=1;
	if (root && default) exit;
}
END { exit !(root && default) }'
	return $?
}

has_wifi_root()
{
	local DEV="$1"

	tc_log class show dev "$DEV" classid 1:${WIFI_MAJOR} | grep -q "leaf ${WIFI_MAJOR}:"
	return $?
}

get_sta_class_minor()
{
	local VAP=$1
	local AID=$2
	calc_hex "(VAP << associd_bits) + AID"
}

get_sta_q_major()
{
	local VAP=$1
	local AID=$2

	local MAJOR_MARK=0
	if [ ${WIFI_MAJOR} = ${WIFI_MAJOR_UDM} ]; then
		# UDM shares TC with udapi, so we mark our sta qdisc major
		MAJOR_MARK=${WIFI_MAJOR}
	fi

	calc_hex "0x${MAJOR_MARK} + 0x$(get_sta_class_minor $VAP $AID)"
}

perform_vap()
{
	local ACT="$1"
	local DEV="$2"
	local VAP="$3"
	local MIN=$(rate_helper "$4")
	local MAX=$(rate_helper "$5")
	valid_dev "$DEV" || return $?

	local WIFI_CLASS="1:${WIFI_MAJOR}"

	local VAP_CLASS_CMD="tc_log class $ACT dev \"$DEV\" parent 1:1 classid ${WIFI_CLASS}"

	case $ACT in
		del)
			# need to remove all filters before the class
			local FILTERS="$(tc filter show dev "$DEV" | grep "classid ${WIFI_CLASS}" | sed -n 's/.*pref \([0-9]\+\).*/\1/p')"
			local FILTER
			for FILTER in $FILTERS; do
				tc_log filter del dev "$DEV" parent 1: pref $FILTER
			done
			eval $VAP_CLASS_CMD
			;;
		add)
			valid_vap  "$VAP" || return $?
			valid_rate "$MIN" || return $?
			valid_rate "$MAX" || return $?

			local VAP_MARK="$(calc_hex_pad "VAP << vapid_shift")/${vapid_mask_shifted}"
			local STA_MASK_ID="$(get_sta_class_minor $VAP 0)"
			local ASSOCID_MASK="${associd_mask_shifted}/${associd_shift}"
			local FW_FLAGS=

			if [ "$associd_location" != "$vapid_location" ]; then
				qos_control_err "associd (${associd_location}) and" \
					"vapid (${vapid_location}) should have the same location"
			fi

			if [ "$vapid_location" = "ubnt" ]; then
				FW_FLAGS=ubnt_mark
			fi

			if ! has_wifi_root $DEV; then
				local QUANTUM_CEIL="ceil ${MAX} $(get_quantum $DEV)"
				local QUANTUM_RATE="rate ${MIN} ${QUANTUM_CEIL}"
				local DEFAULT_QUEUE=$(calc_hex "0x${WIFI_MAJOR} + 0x10")
				eval $VAP_CLASS_CMD htb ${QUANTUM_RATE}
				tc_log qdisc $ACT dev "$DEV" parent ${WIFI_CLASS} handle ${WIFI_MAJOR}: htb default 10
				tc_log class $ACT dev "$DEV" parent ${WIFI_MAJOR}: classid ${WIFI_MAJOR}:1 htb ${QUANTUM_RATE}
				tc_log class $ACT dev "$DEV" parent ${WIFI_MAJOR}:1 classid ${WIFI_MAJOR}:10 htb rate 512kbit ${QUANTUM_CEIL}
				tc_log qdisc $ACT dev "$DEV" parent ${WIFI_MAJOR}:10 handle ${DEFAULT_QUEUE}: fq_codel limit 1000 noecn
			fi

			tc_log filter $ACT dev "$DEV" parent 1: handle ${VAP_MARK} fw classid ${WIFI_CLASS} ${FW_FLAGS}
			tc_log filter $ACT dev "$DEV" parent ${WIFI_MAJOR}: handle ${VAP_MARK} \
				fw mask ${ASSOCID_MASK} classid ${WIFI_MAJOR}:${STA_MASK_ID} ${FW_FLAGS}

			;;
	esac
}

add_vap()
{
	require_params 4 $# || return $?
	perform_vap add "$@"
}

del_vaps()
{
	require_params 1 $# || return $?
	perform_vap del "$@"
}

remove_custom_sta_rate()
{
	local DEV="$1"
	local VAP="$2"
	local AID="$3"
	if [ -e ${CUSTOM_QOS_STA_SCRIPT} ]; then
		sed -i "/${DEV} ${VAP} ${AID}/ d" ${CUSTOM_QOS_STA_SCRIPT}
	fi
}

perform_sta()
{
	local ACT="$1"
	local DEV="$2"
	local VAP="$3"
	local AID="$4"
	local MIN=$(rate_helper "$5")
	local MAX=$(rate_helper "$6")

	valid_dev "$DEV" || return $?
	valid_vap "$VAP" || return $?
	valid_aid "$AID" || return $?
	case $ACT in
		change|replace|add)
			valid_rate "$MIN" || return $?
			valid_rate "$MAX" || return $?
			;;
	esac

	local STA_CLASS=${WIFI_MAJOR}:$(get_sta_class_minor $VAP $AID)

	local STA_CLASS_CMD="tc_log class $ACT dev \"$DEV\" parent ${WIFI_MAJOR}:1 classid ${STA_CLASS}"
	local QUANTUM_RATE="rate ${MIN} ceil ${MAX} $(get_quantum "$DEV")"

	case $ACT in
		del)
			remove_custom_sta_rate ${DEV} ${VAP} ${AID}
			eval ${STA_CLASS_CMD}
			;;
		change)
			remove_custom_sta_rate ${DEV} ${VAP} ${AID}
			echo "$0 ${CMD} ${ARGS}" >> ${CUSTOM_QOS_STA_SCRIPT}
			eval ${STA_CLASS_CMD} htb ${QUANTUM_RATE}
			;;
		replace)
			local CURR_STA="$(tc class show dev ${DEV} parent ${WIFI_MAJOR}:1 classid ${STA_CLASS})"
			local RATE="$(echo $CURR_STA | awk '{print $11}' | sed 's/Mbit/000kbit/' | sed 's/Kbit/kbit/')"
			local CEIL="$(echo $CURR_STA | awk '{print $13}' | sed 's/Mbit/000kbit/' | sed 's/Kbit/kbit/')"
			if [ "$RATE" != "$MIN" ] || [ "$CEIL" != "$MAX" ]; then
				remove_custom_sta_rate ${DEV} ${VAP} ${AID}
				echo "$0 ${CMD} ${ARGS}" >> ${CUSTOM_QOS_STA_SCRIPT}
				eval ${STA_CLASS_CMD} htb ${QUANTUM_RATE}
				local STATUS=$?
				if [ $STATUS -ne 0 ] ; then
					return $STATUS
				fi
				if [ -z "$RATE" ]; then
					local STA_Q_MAJOR=$(get_sta_q_major $VAP $AID)
					tc_log qdisc add dev "$DEV" parent ${STA_CLASS} handle ${STA_Q_MAJOR}: fq_codel limit 100 flows 64 quantum 300 noecn
				fi
			fi
			;;
		add)
			local STA_Q_MAJOR=$(get_sta_q_major $VAP $AID)
			eval ${STA_CLASS_CMD} htb ${QUANTUM_RATE}
			tc_log qdisc add dev "$DEV" parent ${STA_CLASS} handle ${STA_Q_MAJOR}: fq_codel limit 100 flows 64 quantum 300 noecn
			;;
	esac
}

add_sta()
{
	require_params 5 $# || return $?
	perform_sta add "$@"
}

change_sta()
{
	require_params 5 $# || return $?
	perform_sta change "$@"
}

replace_sta()
{
	require_params 5 $# || return $?
	perform_sta replace "$@"
}

del_sta()
{
	require_params 3 $# || return $?
	perform_sta del "$@"
}

CMD=$1
shift
ARGS="$@"
case $CMD in
	""|help)
		usage
		;;
	show | \
	add-root | \
	has-root | \
	del-root | \
	add-vap | \
	del-vaps | \
	add-sta | \
	change-sta | \
	replace-sta | \
	del-sta)
		CMD=$(echo "$CMD" | sed "s/-/_/g")
		${CMD} "$@"
		exit $?
		;;
	*)
		usage
		exit 1
		;;
esac
