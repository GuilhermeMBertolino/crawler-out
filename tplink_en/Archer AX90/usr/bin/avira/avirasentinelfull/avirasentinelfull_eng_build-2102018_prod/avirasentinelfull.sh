#!/bin/sh
export LD_LIBRARY_PATH=/usr/lib/avira/:$LD_LIBRARY_PATH
/usr/bin/avira/avirasentinelfull/avirasentinelfull_eng_build-2102018_prod/avirasentinelfull "$@"