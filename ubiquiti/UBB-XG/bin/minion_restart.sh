#!/bin/sh

CMD="$1"

LOG_PATH="/var/log/e2e"
LOG_PATH_OLD="/var/log/e2e/old"
NUM_OLD_FILES=4

log_rotate()
{
    res=$(ls $LOG_PATH/log_* | wc -l)
    if [ "$res" -gt 1 ]; then
        l=$((res - 1))
        $(cd $LOG_PATH; ls -t log_* | tail -$l | xargs rm)
    fi
    res=$(ls $LOG_PATH_OLD | wc -l)
    if [ $res -gt $NUM_OLD_FILES ]; then
        limit=$((res - $NUM_OLD_FILES))
        f_list=$(cd $LOG_PATH; ls -t log_*);
        e2e_pid=$(pidof e2e_minion)
        list_res=$(ls $LOG_PATH_OLD/$f_list | grep -e "$e2e_pid" -v) #List not matching files, keep one older log file with diff pid
        if [ "$list_res" != '' ]; then
            res=$(cd $LOG_PATH_OLD; ls -t $list_res | wc -l)
            [ "$res" -gt 0 ] && $(cd $LOG_PATH_OLD; ls -t -r $list_res | tail -2 | xargs touch)
        fi
        $(cd $LOG_PATH_OLD; ls -t log_* | tail -$limit | xargs rm)
    fi
}

restart_minion()
{
    gzip -c /var/log/e2e/e2e_minion.INFO > /var/log/e2e/old/e2e_minion.INFO.gz
    killall e2e_minion 2>&1 > /dev/null
    log_rotate
}

case "$CMD" in
        "log_rotate")
             log_rotate
         ;;
         *)
             restart_minion
         ;;
esac
