bleconn_get_sys_entry() {
    [ $# -lt 2 ] && return 1
    [ $# -gt 3 ] && return 1
    local DB="$1"
    local SYSTEM_ID="$2"
    local COLUMN=0
    [ $# -eq 3 ] && local COLUMN=$3

    awk 'BEGIN{IGNORECASE=1;ec = 1};{if (NF > 2 && $1 == "'$SYSTEM_ID'") {print $'$COLUMN'; ec = 0; exit}};END{exit ec}' "$DB"
}

bleconn_get_sys_vendor() {
    [ $# -ne 2 ] && return 1
    bleconn_get_sys_entry "$1" "$2" 2
}

bleconn_get_sys_part() {
    [ $# -ne 2 ] && return 1
    bleconn_get_sys_entry "$1" "$2" 3
}

bleconn_get_sys_max_adv_cnt() {
    [ $# -ne 2 ] && return 1
    bleconn_get_sys_entry "$1" "$2" 4
}

bleconn_get_sys_max_conn_cnt() {
    [ $# -ne 2 ] && return 1
    bleconn_get_sys_entry "$1" "$2" 5
}

bleconn_get_sys_max_mtu() {
    [ $# -ne 2 ] && return 1
    bleconn_get_sys_entry "$1" "$2" 6
}

bleconn_get_sys_max_att_size() {
    [ $# -ne 2 ] && return 1
    bleconn_get_sys_entry "$1" "$2" 7
}

bleconn_get_sys_scan_phys() {
    [ $# -ne 2 ] && return 1
    bleconn_get_sys_entry "$1" "$2" 8 | sed 's/|/ /g'
}

bleconn_get_sys_conn_phys() {
    [ $# -ne 2 ] && return 1
    bleconn_get_sys_entry "$1" "$2" 9 | sed 's/|/ /g'
}

bleconn_get_sys_adv_phys() {
    [ $# -ne 2 ] && return 1
    bleconn_get_sys_entry "$1" "$2" 10 | sed 's/|/ /g'
}

bleconn_get_sys_driver() {
    [ $# -ne 2 ] && return 1
    bleconn_get_sys_entry "$1" "$2" 11
}

bleconn_get_sys_driver_arg() {
    [ $# -lt 2 ] && return 1
    [ $# -gt 3 ] && return 1
    local DB="$1"
    local SYSTEM_ID="$2"
    local ARG=0
    local FIRST_DR_ARG_POS=12
    [ $# -eq 3 ] && local ARG=$3
    local OUTPUT=$(awk 'BEGIN{IGNORECASE=1};{if (NF >= '$FIRST_DR_ARG_POS' && $1 == "'$SYSTEM_ID'") {for (i = '$FIRST_DR_ARG_POS'; i <= NF; i++) {printf "%s ", $i}; printf "\n"; exit}};' "$DB")

    if [ $ARG -eq 0 ]; then
	echo $OUTPUT
    else
	echo $OUTPUT | xargs -n1 | sed -n ${ARG}p
    fi
}

bleconn_check_sys_support_by_ssid() {
    [ $# -ne 2 ] && return 1
    local DB="$1"
    local SYSTEM_ID="$2"
    awk 'BEGIN{IGNORECASE=1;ec = 1};{if (NF > 2 && $1 == "'$SYSTEM_ID'") {ec = 0; exit}};END{exit ec}' "$DB"
}

bleconn_check_sys_support() {
    [ $# -ne 1 ] && return 1
    local DB="$1"
    local SYSTEM_INFO_FILE="/proc/ubnthal/system.info"
    ! grep -qE "^radio1.name=(MT7915)$" "$SYSTEM_INFO_FILE" || [ "$(get_fw_env is_ble_stp)" = "true" ] || return 1
    local SYSTEM_ID=$(awk -F= 'BEGIN{IGNORECASE=1};{if ($1 == "systemid") print $2}' "$SYSTEM_INFO_FILE")
    bleconn_check_sys_support_by_ssid "$DB" "$SYSTEM_ID"
}
