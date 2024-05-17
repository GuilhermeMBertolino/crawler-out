#!/bin/sh

name=$(basename $0)

usage()
{
    echo "Usage $name: <cfg file> <share dir> <ble-conn share dir>"
    exit 1
}

[ $# -eq 3 ] || usage

SHARE_DIR=$2
BLECONN_SHARE_DIR=$3

BLECONN_CFG=${BLECONN_SHARE_DIR}/cfg.template.json
SYS_DB=${SHARE_DIR}/sys-db.txt
SHADOW_EXE=${SHARE_DIR}/shadow.sh

CFG=$1
CFG_BAK=${CFG}.bak

LOCK_FILE="/tmp/${name}.lock"
LOCK_TIEMOUT=60
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

debug()
{
    logger -t "$name" -p user.debug "$@"
}

is_adopted()
{
    grep -qiE "^mgmt.is_default\s*=\s*false$" /etc/persistent/cfg/mgmt 2>/dev/null
}

get_wired_uplink_iface()
{
    [ -f "/var/run/uplink_eth" ] && cat "/var/run/uplink_eth" 2>/dev/null && return 0
    echo "eth0"
}

get_wireless_uplink_iface()
{
    [ -f "/var/run/uplink_wds" ] && cat "/var/run/uplink_wds" 2>/dev/null
}

get_bridge_iface()
{
    [ -f "/var/run/uplink_bridge" ] && cat "/var/run/uplink_bridge" 2>/dev/null && return 0
    echo "br0"
}

# === Set values ===
if is_adopted; then
    BRIDGE_IFACE=$(get_bridge_iface)
    IFACES="\"$(get_wired_uplink_iface)\",\"$BRIDGE_IFACE\""
    WIRELESS_UPLINK_IFACE=$(get_wireless_uplink_iface)
    [ -z "$WIRELESS_UPLINK_IFACE" ] || IFACES="$IFACES,\"$WIRELESS_UPLINK_IFACE\""
    SYS_STATE_CHECK="{\"enabled\":true,\"ifaces\":[$IFACES],\"static-ifaces\":[\"$BRIDGE_IFACE\"]}"
    GATTS_SRVC_UUID_COLUMN=3
    ADV_INTERVAL=700
else
    SYS_STATE_CHECK='{"enabled":true, "ifaces":["eth0","br0"], "static-ifaces":["br0"], "priorities-iface":false}'
    GATTS_SRVC_UUID_COLUMN=2
    ADV_INTERVAL=200
fi

# === Base check ===
[ -d "$SHARE_DIR" ] || error "Share dir [$SHARE_DIR] must be accessible"
[ -f "$BLECONN_CFG" ] || error "Missing bleconnd cfg file [$BLECONN_CFG]"
[ -f "$SYS_DB" ] || error "Missing DB [$SYS_DB]"
[ -f "$SHADOW_EXE" ] || error "Missing shadow exe [$SHADOW_EXE]"
[ -x "$SHADOW_EXE" ] || error "Shadow exe should be executable [$SHADOW_EXE]"

# === Parse ble-connectivity config ===
BLE_CONN_PORT=$(jsonfilter -i "$BLECONN_CFG" -e '$["api-server"]["port"]')
echo "$BLE_CONN_PORT" | grep -qE "^[0-9]+$" || error "Failed to get port of BLE-Connectivity [$BLE_CONN_PORT]"

# === Parse system info ===
MAC=$(awk -F= '{if ($1 ~ "^serialno$") {print $2; exit 0}}' /proc/ubnthal/system.info)
echo "$MAC" | grep -qE "^[a-fA-F0-9]{12}$" || error "Failed to get MAC address [${MAC}]"

SYS_ID=$(awk -F= '{if ($1 ~ "^systemid$") {printf "%s", $2; exit 0}}' /proc/ubnthal/system.info)
echo "$SYS_ID" | grep -qE "^[0-9a-f]+$" || error "Failed to get systemid [$SYS_ID]"

# === Parse system db ===
SYS_ENTRY=$(awk '{if ($1 == "'$SYS_ID'") print $0}' "$SYS_DB")
[ -n "$SYS_ENTRY" ] || error "Failed to find system entry [$SYS_ID]"

BOARD_NAME=$(echo "$SYS_ENTRY" | awk '{print $4}')
[ -n "$BOARD_NAME" ] || error "Failed to get board name"

GATTS_SRVC_UUID=$(echo "$SYS_ENTRY" | awk '{print $'$GATTS_SRVC_UUID_COLUMN'}')
echo "$GATTS_SRVC_UUID" | grep -qE "^[0-9a-f\-]+$" || error "Failed to get UUID of GATTS service [$GATTS_SRVC_UUID] from column [$GATTS_SRVC_UUID_COLUMN]"

MAX_INCOMING_CONN=$(echo "$SYS_ENTRY" | awk '{print $5}')
echo "$MAX_INCOMING_CONN" | grep -qE "^[0-9]+$" || error "Failed to get max allowed count of incoming connections [$MAX_INCOMING_CONN]"

# === Lock ===
exec 200>$LOCK_FILE
flock -w $LOCK_TIEMOUT 200 || error "Failed to start check of cfg [${CFG}]: Lock timeout"
IS_LOCKED=1

# === Generate config ===
debug "Start cfg [${CFG}] generation"

echo '{
  "bluetooth": {
    "ctrl": {
      "host":"127.0.0.1",
      "port":'$BLE_CONN_PORT'
    },
    "gatts": {
      "service": "'$GATTS_SRVC_UUID'"
    },
    "adv": {
      "tx-pow": 0,
      "interval": '$ADV_INTERVAL',
      "data": {
        "module": {
          "name": "unifi-network",
          "cfg": {
            "gatts-service-uuid": "'$GATTS_SRVC_UUID'",
            "mac": "'$MAC'",
            "name": "'$BOARD_NAME'",
            "uptime-refresh-interval": 1,
            "state-check": '$SYS_STATE_CHECK'
          }
        }
      }
    },
    "conn": {
      "max-cnt": '$MAX_INCOMING_CONN'
    }
  },
  "service": {
    "client-credentials-exe": "'$SHADOW_EXE'",
    "max-process-cnt-per-client": 8
  },
  "log": {
    "level": "debug"
  }
}' > "$CFG_BAK"

mv "$CFG_BAK" "$CFG" || error "Failed to move [$CFG_BAK] to [$CFG]"


debug "Finish cfg [${CFG}] generation"
