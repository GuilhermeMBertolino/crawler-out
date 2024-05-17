#!/bin/sh

. /usr/share/libubox/jshn.sh

SSL_KEY_PATH=/etc/persistent/blebr.key
SSL_CERT_PATH=/etc/persistent/blebr.cert

name=$(basename $0)

usage()
{
	echo "Usage $name: <cfg file> <share dir> <ble-conn share dir>"
	exit 1
}

[ $# -eq 3 ] || usage

SHARE_DIR=$2
BLECONN_SHARE_DIR=$3

JSON_AWK=${BLECONN_SHARE_DIR}/JSON.awk
JSHN_AWK=${BLECONN_SHARE_DIR}/jshn.awk
BLECONN_CFG=${BLECONN_SHARE_DIR}/cfg.template.json

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

to_jshn()
{
	# Print content of JSON file to stdout in JSHN format
	local file="$1"
	[ -f "$file" ] || return 1
	ctx=$(awk STREAM=0 -f "$JSHN_AWK" -f "$JSON_AWK" "$file" 2>/dev/null)
	[ $? -eq 0 ] || return 1
	[ -n "$ctx" ] || return 1
	echo "$ctx"
	return 0
}

jshn_md5sum()
{
	ctx=$(to_jshn $@)
	[ $? -eq 0 ] || return 1
	sum=$(echo "$ctx" | md5sum)
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

save_json()
{
	local file="$1"
	json_dump | sed 's|\\/|/|g' > "$file" 2>/dev/null
	return $?
}

open_json_object()
{
    local key="$1"
    local status=$2
    if json_select "$key" >/dev/null; then
        eval "$status=0"
    elif json_add_object "$key"; then
        eval "$status=1"
    else
        return 1;
    fi
}

close_json_object()
{
    local status=$1
    if [ $status -eq 0 ]; then
        json_select ".."
    elif [ $status -eq 1 ]; then
        json_close_object
    else
        return 1
    fi
}

check_ssl_cert_key_pair()
{
	local cert="$1"
	local key="$2"

	# Check if files exists
	[ -f "$key" ] || return 1
	[ -f "$cert" ] || return 2

	# Check if a private key and a certificate are valid
	openssl rsa -noout -in "$key" || return 3
	openssl x509 -noout -in "$cert" || return 4

	# Check whether a private key matches a certificate
	local pubkey1=$(openssl pkey -in "$key" -pubout -outform pem | base64)
	local pubkey2=$(openssl x509 -in "$cert" -pubkey -noout -outform pem | base64)
	[ "$pubkey1" == "$pubkey2" ] || return 5

	# Check whether certificate is already expired or less than 180 days are left
	openssl x509 -checkend 15552000 -noout -in "$cert" || return 6

	return 0
}

generate_new_cert_key_pair()
{
	local cert="$1"
	local key="$2"

	openssl req -x509 -newkey rsa:2048 -days 3650 -keyout "$key" -out "$cert" -nodes -subj '/CN=localhost' 2>/dev/null || return 1

	return 0
}

check_uuid()
{
	local uuid="$1"
	[ "00000000-0000-0000-0000-000000000000" != "$uuid" ] || return 1
	echo "$uuid" | grep -q -E "^[[:xdigit:]]{8}-[[:xdigit:]]{4}-[[:xdigit:]]{4}-[[:xdigit:]]{4}-[[:xdigit:]]{12}$"
	return $?
}

# === Base check ===
[ -d "$SHARE_DIR" ] || error "Share dir [$SHARE_DIR] must be accessible"
[ -f "$CFG_TEMPLATE" ] || error "Missing cfg template file [$CFG_TEMPLATE]"
check_json "$CFG_TEMPLATE" || error "Invalid json format [$CFG_TEMPLATE]"
echo "$CFG" | grep -q "^\/etc\/persistent\/" || error "Cfg file \"$CFG\" must be placed in \"/etc/persistent\""
[ -d "$CFG_DIR" ] || mkdir -p "$CFG_DIR" || error "Failed to create cfg dir [$CFG_DIR]"
CNT=$(ps | grep -q "$CFG" | wc -l)

# === Parse ble-connectivity config ===
BLE_CONN_PORT=$(jsonfilter -i "$BLECONN_CFG" -e '$["api-server"]["port"]')
echo "$BLE_CONN_PORT" | grep -qE "^[0-9]+$" || error "Failed to get port of BLE-Connectivity [$BLE_CONN_PORT]"

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

# === host cfg ===
open_json_object "host" host_obj_st || error "Failed to open [host]"

json_get_var OLD_ID id
if ! check_uuid "$OLD_ID"; then
	NEW_ID=$(cat /proc/sys/kernel/random/uuid)
	check_uuid "$NEW_ID" || error "Failed to generate UUID"
	json_add_string "id" $NEW_ID || error "Failed to set [id]"
fi

close_json_object $host_obj_st || error "Failed to close [host]"

# === bluetooth cfg ===
open_json_object "bluetooth" bluetooth_obj_st || error "Failed to open [bluetooth]"

json_add_string "host" "127.0.0.1" || error "Failed to set [bt-host]"
json_add_int "port" $BLE_CONN_PORT || error "Failed to set [bt-port]"

close_json_object $bluetooth_obj_st || error "Failed to close [bluetooth]"

# === SSL cfg ===
open_json_object "ssl" ssl_obj_st || error "Failed to open [ssl]"

json_get_var KEY_PATH key-path
json_get_var CERT_PATH cert-path

SSL_UPDATED=0
if ! check_ssl_cert_key_pair "$CERT_PATH" "$KEY_PATH"; then
	warn "Failed to check SSL cert \"$CERT_PATH\" and key \"$KEY_PATH\", let's try generate new SSL cert/key pair"
	generate_new_cert_key_pair "$SSL_CERT_PATH" "$SSL_KEY_PATH" || error "Failed to generate SSL cert/key pair"

	SSL_UPDATED=1

	json_add_string "key-path" $SSL_KEY_PATH || error "Failed to set [key-path]"
	json_add_string "cert-path" $SSL_CERT_PATH || error "Failed to set [cert-path]"
fi

close_json_object $ssl_obj_st || error "Failed to close [ssl]"

# === Save cfg/SSL if changed ===

CFG_SUM=$(jshn_md5sum "$CFG")

save_json "$CFG_BAK" || error "Failed to save updated cfg [$CFG_BAK]"
mv "$CFG_BAK" "$CFG" || error "Failed to move [$CFG_BAK] to [$CFG]"

FINAL_CFG_SUM=$(jshn_md5sum "$CFG")
[ $? -eq 0 ] || error "Can't calculate final cfg [$CFG] sum"

if [ "$CFG_SUM" != "$FINAL_CFG_SUM" ] || [ $SSL_UPDATED -eq 1 ]; then
	debug "Start preservation of cfg and/or SSL cert/key"
	syswrapper.sh save-config || error "Failed to complete preservation"
	debug "Finish preservation"
fi

debug "Finish cfg [${CFG}] check"
