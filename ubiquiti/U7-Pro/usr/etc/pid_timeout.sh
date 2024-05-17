#!/bin/sh

# First argument: PID
# Second argument: Timeout
pid_timeout() {
    # Get process start time (Field 22) to check for PID recycling
    start_time="$(cut -d ' ' -f 22 "/proc/$1/stat")"

    for _ in $(seq 1 "$2");
    do
        # check if the command finish before timeout
        if [ ! -f "/proc/$1/stat" ] || [ "$(cut -d ' ' -f 22 "/proc/$1/stat")" != "$start_time" ]; then
            return
        fi
        sleep 1
    done
    # Make sure that the PID was not reused by another process
    # that started at a later time
    if [ -f "/proc/$1/stat" ] && [ "$(cut -d ' ' -f 22 "/proc/$1/stat")" = "$start_time" ]; then
        # Kill process with SIGKILL
        kill -9 "$1"
    fi
}
