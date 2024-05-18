#!/bin/sh

INPUT_FIFO='/var/run/steer_cmd_input'
OUTPUT_FIFO='/var/run/steer_cmd_output'
RET_PATH='/var/run/steer_cmd_ret'

TEMP_PATH='/var/run/steer_cmd.temp'
LOCK_PATH='/var/run/steer_cmd.lock'

# wait for the lock up to 50*100ms
LOCK_WAIT_TIME=50
# wait for the output up to 50*100ms
CMD_WAIT_TIME=50

cat_pid=0
echo_pid=0

print_err() {
    echo "Error: $@" >&2
}

lockfile_lock() {
    touch "$TEMP_PATH"
    if ln -s "$TEMP_PATH" "$LOCK_PATH" >/dev/null 2>&1; then
        return 0
    fi

    return 1
}

lockfile_wait_lock() {
    local check_cnt=0

    while [ "$check_cnt" -lt "$LOCK_WAIT_TIME" ]; do
        check_cnt=$((check_cnt + 1))

        if lockfile_lock; then
            return 0
        fi
        usleep 100000
    done

    return 1
}

lockfile_unlock() {
    if rm "$LOCK_PATH"; then
        return 0
    fi

    return 1
}

is_running() {
    local pid=$1
    local tasks=`jobs -l`

    if echo "$tasks" | grep "$pid" | grep -iq "running"; then
        return 0
    fi

    return 1
}

clean_up() {
    [ "$cat_pid" -gt 1 ] && is_running "$cat_pid" && {
        kill "$cat_pid" >/dev/null 2>&1
    }

    [ "$echo_pid" -gt 1 ] && is_running "$echo_pid" && {
        kill "$echo_pid" >/dev/null 2>&1
    }

    lockfile_unlock
}

wait_tasks() {
    local wait_cnt=0

    while [ "$wait_cnt" -lt "$CMD_WAIT_TIME" ]; do
        wait_cnt=$((wait_cnt + 1))

        if is_running "$cat_pid" || is_running "$echo_pid"; then
            usleep 100000
            continue
        fi
        return 0
    done

    return 1
}

[ -p "$INPUT_FIFO" ] || {
    print_err "'$INPUT_FIFO' doesn't exist, is steerd running?"
    exit 1
}

[ -p "$OUTPUT_FIFO" ] || {
    print_err "'$OUTPUT_FIFO' doesn't exist, is steerd running?"
    exit 1
}

lockfile_wait_lock || {
    print_err "Require lock failed. You can remove '$LOCK_PATH' manuallly, if no other '$0' is running."
    exit 1
}

trap 'print_err "Aborted by signal"; clean_up; exit 1' SIGINT SIGTERM

echo '' >$RET_PATH

# `cat` must be before `echo`, otherwise steerd might fail to open "$OUTPUT_FIFO"
cat $OUTPUT_FIFO &
cat_pid=$!

# sleep to ensure `cat` opens earlier than `echo` did
usleep 50000

echo "$@" > $INPUT_FIFO &
echo_pid=$!

wait_tasks || {
    print_err "Command timeout, maybe steerd crashed"
    clean_up
    exit 1
}

ret=`cat $RET_PATH`
clean_up

[ "$ret" = 0 ] || {
    exit 1
}

exit 0
