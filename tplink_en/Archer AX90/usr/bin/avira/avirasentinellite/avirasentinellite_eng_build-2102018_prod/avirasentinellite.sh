#!/bin/sh
export LD_LIBRARY_PATH=/usr/lib/avira/:$LD_LIBRARY_PATH
/usr/bin/avira/avirasentinellite/avirasentinellite_eng_build-2102018_prod/avirasentinellite "$@"