#!/bin/sh
export LD_LIBRARY_PATH=/usr/lib/avira/:$LD_LIBRARY_PATH
/usr/bin/avira/avirasentinellite/avirasentinellite_rel-210604-2_prod/avirasentinellite "$@"