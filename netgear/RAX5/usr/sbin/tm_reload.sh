#!/bin/sh

if [ -f /tmp/tmd.pid ]; then
    echo "Force reload TmHandleConfigUpdate()"
    kill -USR1 `cat /tmp/tmd.pid`
    sleep 2
    echo "Force reload tm_db_WriteStatistics()"
    kill -USR2 `cat /tmp/tmd.pid`
fi
