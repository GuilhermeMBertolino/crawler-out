#!/bin/sh

. /usr/share/libubox/jshn.sh

name=$(basename $0)

usage()
{
	echo "Usage $name: <cfg file> <share dir>"
	exit 1
}

[ $# -eq 2 ] || usage

SHARE_DIR=$2

. ${SHARE_DIR}/bluetooth-cfg.sh
. ${SHARE_DIR}/bleconn-utils.sh

# TODO: create OpenWRT feed for https://github.com/step-/JSON.awk
JSON_AWK=${SHARE_DIR}/JSON.awk
JSHN_AWK=${SHARE_DIR}/jshn.awk
PRESERVE_CFG=${SHARE_DIR}/bleconn-cfg-savior.sh
SYS_DB=${SHARE_DIR}/bleconn-sys-db.txt

CFG_TEMPLATE=${SHARE_DIR}/cfg.template.json
CFG=$1
CFG_BAK=${CFG}.bak
CFG_DIR=$(dirname $CFG)
CFG_NAME=$(basename $CFG)

LOCK_FILE="/tmp/${name}.lock"
LOCK_TIMEOUT=60
IS_LOCKED=0

trap on_exit EXIT
on_exit()
{
    [ $IS_LOCKED -eq 1 ] && flock -u 200
}

error()
{
	logger -t "$name" -p user.err "$@"
	exit 1
}

warn()
{
	logger -t "$name" -p user.warn "$@"
}

debug()
{
	logger -t "$name" -p user.debug "$@"
}

jshn_awk()
{
	awk STREAM=0 -f "$JSHN_AWK" -f "$JSON_AWK" $@
}

to_jshn()
{
	# Print content of JSON file to stdout in JSHN format
	local file=$1
	[ -f "$file" ] || return 1
	local ctx=$(jshn_awk "$file" 2>/dev/null)
	[ $? -eq 0 ] || return 1
	[ -n "$ctx" ] || return 1
	echo "$ctx"
	return 0
}

jshn_md5sum()
{
	local ctx=$(to_jshn $@)
	[ $? -eq 0 ] || return 1
	local sum=$(echo "$ctx" | md5sum)
	[ $? -eq 0 ] || return 1
	echo "$sum" | awk '{print $1}'
	return 0
}

check_json()
{
	to_jshn $@ > /dev/null || return 1
	return 0
}

load_json()
{
	# Do not use json_load it will change key value if it contains "-" or ":"
	ctx=$(to_jshn $@)
	[ $? -eq 0 ] || return 1
	eval "$ctx"
	return $?
}

dump_json()
{
	json_dump | sed 's|\\/|/|g'
}

save_json()
{
	file=$1
	dump_json > "$file" 2>/dev/null
	return $?
}

refresh_json()
{
	local json_payload=$(dump_json 2>/dev/null)
	[ $? -eq 0 ] || return 1
	[ -n "$json_payload" ] || return 1
	json_cleanup || return 1
	local ctx=$(echo "$json_payload" | jshn_awk 2>/dev/null)
	[ $? -eq 0 ] || return 1
	[ -n "$ctx" ] || return 1
	eval "$ctx"
	return $?
}

# === Base check ===

[ -d "$SHARE_DIR" ] || error "Share dir [$SHARE_DIR] must be accessible"
[ -x "$PRESERVE_CFG" ] || error "Cfg preserver [$PRESERVE_CFG] must be executable"
[ -f "$CFG_TEMPLATE" ] || error "Missing cfg template file [$CFG_TEMPLATE]"
check_json "$CFG_TEMPLATE" || error "Invalid json format [$CFG_TEMPLATE]"
echo "$CFG" | grep -q "^\/etc\/persistent\/" || error "Cfg file \"$CFG\" must be placed in \"/etc/persistent\""
[ -d "$CFG_DIR" ] || mkdir -p "$CFG_DIR" || error "Failed to create cfg dir [$CFG_DIR]"

# === Parse system info ===
SYSTEM_ID=$(awk -F= '{if ($1 ~ /systemid/) {print $2; exit 0}}' /proc/ubnthal/system.info)
[ -n "$SYSTEM_ID" ] || error "Failed to get systemid"

BT_MAC=$(awk -F= '{if ($1 ~ "^bt0.macaddr$") {print $2; exit 0}}' /proc/ubnthal/system.info)
echo "$BT_MAC" | grep -qE "^([a-fA-F0-9]{2}:){5}[a-fA-F0-9]{2}$" || error "Failed to get Bluetooth MAC address [${BT_MAC}]"

HOSTNAME="$(cat /proc/sys/kernel/hostname)"
[ -n "$HOSTNAME" ] || error "Failed to get hostname"

# === Parse DB ===
BT_DRIVER=$(bleconn_get_sys_driver "$SYS_DB" "$SYSTEM_ID")
[ -n "$BT_DRIVER" ] || error "Failed to get BT driver"
BT_VENDOR=$(bleconn_get_sys_vendor "$SYS_DB" "$SYSTEM_ID")
[ -n "$BT_VENDOR" ] || error "Failed to get BT chip vendor"
BT_PART=$(bleconn_get_sys_part "$SYS_DB" "$SYSTEM_ID")
[ -n "$BT_PART" ] || error "Failed to get BT part"
BT_ADV_MAX_CNT=$(bleconn_get_sys_max_adv_cnt "$SYS_DB" "$SYSTEM_ID")
[ -n "$BT_ADV_MAX_CNT" ] || error "Failed to get BT ADV MAX count"
BT_CONN_MAX_CNT=$(bleconn_get_sys_max_conn_cnt "$SYS_DB" "$SYSTEM_ID")
[ -n "$BT_CONN_MAX_CNT" ] || error "Failed to get MAX count of BT connections"
BT_MAX_MTU=$(bleconn_get_sys_max_mtu "$SYS_DB" "$SYSTEM_ID")
[ -n "$BT_MAX_MTU" ] || error "Failed to get BT MAX MTU"
BT_MAX_ATT_SIZE=$(bleconn_get_sys_max_att_size "$SYS_DB" "$SYSTEM_ID")
[ -n "$BT_MAX_ATT_SIZE" ] || error "Failed to get BT MAX ATT size"
BT_SCAN_PHYS=$(bleconn_get_sys_scan_phys "$SYS_DB" "$SYSTEM_ID")
[ -n "$BT_SCAN_PHYS" ] || error "Failed to get BT scan PHYs"
BT_CONN_PHYS=$(bleconn_get_sys_conn_phys "$SYS_DB" "$SYSTEM_ID")
[ -n "$BT_CONN_PHYS" ] || error "Failed to get BT connection PHYs"
BT_ADV_PHYS=$(bleconn_get_sys_adv_phys "$SYS_DB" "$SYSTEM_ID")
[ -n "$BT_ADV_PHYS" ] || error "Failed to get BT ADV PHYs"

BT_DRIVER_ARGS=$(bleconn_get_sys_driver_arg "$SYS_DB" "$SYSTEM_ID")

# === Lock ===
exec 200>$LOCK_FILE
flock -w $LOCK_TIMEOUT 200 || error "Failed to start check of cfg [${CFG}]: Lock timeout"
IS_LOCKED=1

# === Load cfg and update ===
debug "Start cfg [${CFG}] check"

if ! load_json "$CFG"; then
	warn "Failed to load cfg [$CFG], let's try load cfg bakcup [$CFG_BAK]"
	if ! load_json "$CFG_BAK"; then
		warn "Failed to load cfg backup [$CFG_BAK], let's try generate new cfg"
		load_json "$CFG_TEMPLATE" || error "Can't load cfg or generate new one"
	fi
fi

# === bluetooth cfg ===
json_add_object "bluetooth" || error "Failed to add [bluetooth]"
json_close_object || error "Failed to close [bluetooth]"

# if jshn object/array is added second time it can't exceed size of 1
# so we can't properly remove object/array without refresh
refresh_json || error "Failed to refresh json"

json_select "bluetooth" || error "Failed to select [bluetooth]"

if [ "$BT_DRIVER" == "blue_gecko" ]; then
	fill_blue_gecko_bt_json_object "$BT_VENDOR" "$BT_PART" \
		$BT_ADV_MAX_CNT $BT_CONN_MAX_CNT $BT_MAX_MTU $BT_MAX_ATT_SIZE \
		"$BT_SCAN_PHYS" "$BT_CONN_PHYS" "$BT_ADV_PHYS" \
		"$BT_MAC" "$SHARE_DIR" $BT_DRIVER_ARGS || error "Failed to set [bluetooth]"
elif [ "$BT_DRIVER" == "mt7915" ]; then
	fill_mt7915_bt_json_object "$BT_VENDOR" "$BT_PART" \
		$BT_ADV_MAX_CNT $BT_CONN_MAX_CNT $BT_MAX_MTU $BT_MAX_ATT_SIZE \
		"$BT_SCAN_PHYS" "$BT_CONN_PHYS" "$BT_ADV_PHYS" \
		"$BT_MAC" $BT_DRIVER_ARGS || error "Failed to set [bluetooth]"
elif [ "$BT_DRIVER" == "bluetopia" ]; then
	fill_bluetopia_bt_json_object "$BT_VENDOR" "$BT_PART" \
		$BT_ADV_MAX_CNT $BT_CONN_MAX_CNT $BT_MAX_MTU $BT_MAX_ATT_SIZE \
		"$BT_SCAN_PHYS" "$BT_CONN_PHYS" "$BT_ADV_PHYS" \
		"$HOSTNAME" "$SHARE_DIR" $BT_DRIVER_ARGS || error "Failed to set [bluetooth]"
else
	error "Got unknown BT driver [$BT_DRIVER]"
fi

json_select ".."

# === Save cfg if changed ===

CFG_SUM=$(jshn_md5sum "$CFG")

save_json "$CFG_BAK" || error "Failed to save updated cfg [$CFG_BAK]"
mv "$CFG_BAK" "$CFG" || error "Failed to move [$CFG_BAK] to [$CFG]"

FINAL_CFG_SUM=$(jshn_md5sum "$CFG")
[ $? -eq 0 ] || error "Can't calculate final cfg [$CFG] sum"

if [ "$CFG_SUM" != "$FINAL_CFG_SUM" ]; then
	debug "Config updated"
	$PRESERVE_CFG "$CFG" || error "Failed to preserve cfg [$CFG]"
fi

debug "Finish cfg [${CFG}] check"
