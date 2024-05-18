#!/bin/sh
export LD_LIBRARY_PATH=/usr/lib/avira/:$LD_LIBRARY_PATH
/usr/bin/avira/avirawatchdog/avirawatchdog_eng_build-2102018_prod/avirawatchdog "$@"