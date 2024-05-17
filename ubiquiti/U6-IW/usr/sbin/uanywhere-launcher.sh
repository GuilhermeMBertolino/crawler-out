#!/bin/sh

name=$(basename $0)

usage()
{
	echo "Usage $name: <app name> <path to init file> <-|iface|ifaces separated by pipe> <min OK state duration> <min NOK state duration> <NOK count>"
	exit 1
}

[ $# -eq 6 ] || usage

APP_NAME="$1"
APP_INIT_FILE="$2"
IFACES="$3"
MIN_STATE_OK_DURATION=$4
MIN_STATE_NOK_DURATION=$5
MAX_STATE_OK_FAILS=$6

POOLING_INTERVAL=5
APP_START_TIMEOUT=60
APP_STOP_TIMEOUT=11

PROCESS_TIMEOUT=0
PROCESS_TIMEOUT_SET_TIME=0
IS_STATE_OK=false
LAST_STATE_TIME=0
STATE_OK_FAILS=0
STOP_APP_ASAP=true

error()
{
    logger -t "$name[$$]" -p user.err "$@"
    exit 1
}

warn()
{
    logger -t "$name[$$]" -p user.warn "$@"
}

debug()
{
    logger -t "$name[$$]" -p user.debug "$@"
}

is_adopted()
{
    grep -qiE "^mgmt.is_default\s*=\s*false$" /etc/persistent/cfg/mgmt 2>/dev/null
}

need_iface_state_check()
{
    [ -n "$IFACES" -a "$IFACES" != "-" ]
}

is_state_ok()
{
    ! need_iface_state_check || ip link show | grep -qE "^[0-9]+:\s+($IFACES):\s+.*\sstate\s+(UP|UNKNOWN)\s" || return 1
    ip route | grep -q "^default\>"
}

is_app_running()
{
    pidof $APP_NAME >/dev/null
}

start_app()
{
    $APP_INIT_FILE start 2>/dev/null
    local it=0
    while ! is_app_running && [ $it -le $APP_START_TIMEOUT ]; do
        let "it = it + 1"
        sleep 1
    done
    is_app_running
}

stop_app()
{
    $APP_INIT_FILE stop 2>/dev/null
    local it=0
    while is_app_running && [ $it -le $APP_STOP_TIMEOUT ]; do
        let "it = it + 1"
        sleep 1
    done
    ! is_app_running
}

process() {
    local curr_state_time=$(date +%s)
    local process_timeout_duration=$(($curr_state_time - $PROCESS_TIMEOUT_SET_TIME))
    PROCESS_TIMEOUT_SET_TIME=$curr_state_time
    if [ $PROCESS_TIMEOUT -gt $process_timeout_duration ]; then
        PROCESS_TIMEOUT=$(($PROCESS_TIMEOUT - $process_timeout_duration))
    else
        PROCESS_TIMEOUT=0
    fi
    local state_duration=$(($curr_state_time - $LAST_STATE_TIME))
    local is_curr_state_ok=false
    is_state_ok && local is_curr_state_ok=true
    local is_prev_state_ok=$IS_STATE_OK
    IS_STATE_OK=$is_curr_state_ok
    local need_stop_app=false
    local need_start_app=false
    if [ $is_curr_state_ok != $is_prev_state_ok ]; then
        LAST_STATE_TIME=$curr_state_time
        [ $is_curr_state_ok == true ] && debug "Status OK" || debug "Status NOK"
    fi

    if [ $is_curr_state_ok == true ]; then
        if [ $STOP_APP_ASAP == true ]; then
            STATE_OK_FAILS=0
            local need_stop_app=true
        elif [ $is_curr_state_ok == $is_prev_state_ok ]; then
            if [ $state_duration -ge $MIN_STATE_OK_DURATION ]; then
                STATE_OK_FAILS=0
                local need_stop_app=true
            fi
        else
            PROCESS_TIMEOUT=$MIN_STATE_OK_DURATION
        fi
    else
        if [ $is_curr_state_ok == $is_prev_state_ok ]; then
            if [ $state_duration -ge $MIN_STATE_NOK_DURATION ]; then
                STATE_OK_FAILS=0
                local need_start_app=true
            fi
        else
            PROCESS_TIMEOUT=$MIN_STATE_NOK_DURATION
            STOP_APP_ASAP=false
            if [ $state_duration -ge $MIN_STATE_OK_DURATION ]; then
                STATE_OK_FAILS=0
            else
                STATE_OK_FAILS=$(($STATE_OK_FAILS + 1))
                if [ $STATE_OK_FAILS -ge $MAX_STATE_OK_FAILS ]; then
                    STATE_OK_FAILS=0
                    PROCESS_TIMEOUT=0
                    local need_start_app=true
                fi
            fi
        fi
    fi

    if [ $need_start_app == true ] && ! is_app_running; then
        debug "Starting app [$APP_NAME]"
        if start_app; then
            debug "App [$APP_NAME] started"
        else
            warn "Can't start app [$APP_NAME]"
            return 1
        fi
    elif [ $need_stop_app == true ] && is_app_running; then
        debug "Stopping app [$APP_NAME]"
        if stop_app; then
            debug "App [$APP_NAME] stopped"
        else
            warn "Can't stop app [$APP_NAME]"
            return 1
        fi
    fi

    return 0
}

monitor_state() {
    while true; do
        process || break
        if [ $PROCESS_TIMEOUT -gt 0 ]; then
            read -t $PROCESS_TIMEOUT -r line
        else
            read -r line
        fi
    done
    kill $$
}

do_pooling() {
    while true; do
        process || break
        if [ $PROCESS_TIMEOUT -gt 0 ] && [ $PROCESS_TIMEOUT -lt $POOLING_INTERVAL ]; then
            sleep $PROCESS_TIMEOUT
        else
            sleep $POOLING_INTERVAL
        fi
    done
}

trap on_term SIGTERM SIGINT
on_term()
{
    debug "Termination"
    [ -z "$PID_OF_CHILD_MONITOR_STATE" ] || kill $PID_OF_CHILD_MONITOR_STATE 2>/dev/null
    [ -z "$PID_OF_CHILD_IP_MONITOR_ROUTE" ] || kill $PID_OF_CHILD_IP_MONITOR_ROUTE 2>/dev/null
    [ -z "$PID_OF_CHILD_IP_MONITOR_LINK" ] || kill $PID_OF_CHILD_IP_MONITOR_LINK 2>/dev/null
    exit 0
}

trap on_exit EXIT
on_exit()
{
    debug "Exit"
    [ -d "$TMP_DIR" ] && rm -rf "$TMP_DIR" 2>/dev/null
    ! is_app_running || stop_app
}

debug "Started"

! is_app_running || stop_app || error "Can't stop app [$APP_NAME]"

if ! is_adopted; then
    debug "Starting app [$APP_NAME]"
    start_app || error "Can't start app [$APP_NAME]"
    debug "Wait till adoption"
    while sleep 1; do
        is_adopted && break
    done
    debug "Adoption done"
    stop_app || error "Can't stop app [$APP_NAME]"
fi

is_state_ok || start_app || error "Can't start app [$APP_NAME]"

is_state_ok && IS_STATE_OK=true && STOP_APP_ASAP=false
LAST_STATE_TIME=$(date +%s)
PROCESS_TIMEOUT=$(($APP_STOP_TIMEOUT + 1))

if ip monitor help 2>&1 | grep -q "\<ip monitor\>"; then
    debug "Start status monitoring"
    TMP_DIR=$(mktemp -d -t "${name}-tmp.XXXXXXXXXX")
    [ -n "$TMP_DIR" ] || error "Can't create tmp dir"
    [ -d "$TMP_DIR" ] || error "Can't create tmp dir [$TMP_DIR]"
    BUFF="$TMP_DIR/buff"
    mkfifo "$BUFF" || error "Can't create buffer [$BUFF]"
    if need_iface_state_check; then
        ip monitor link >"$BUFF" &
        PID_OF_CHILD_IP_MONITOR_LINK=$!
    fi
    ip monitor route >"$BUFF" &
    PID_OF_CHILD_IP_MONITOR_ROUTE=$!
    cat "$BUFF" | monitor_state &
    PID_OF_CHILD_MONITOR_STATE=$!
    wait $PID_OF_CHILD_MONITOR_STATE 2>/dev/null
else
    debug "Start status polling"
    do_pooling
fi

debug "Stopped"
