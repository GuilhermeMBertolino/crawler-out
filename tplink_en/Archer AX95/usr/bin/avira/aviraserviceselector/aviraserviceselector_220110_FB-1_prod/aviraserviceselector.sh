#!/bin/sh
export LD_LIBRARY_PATH=/usr/lib/avira/:$LD_LIBRARY_PATH
/usr/bin/avira/aviraserviceselector/aviraserviceselector_220110_FB-1_prod/aviraserviceselector "$@"