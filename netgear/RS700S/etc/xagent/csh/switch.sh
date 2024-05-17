#!/bin/sh

source ./csh.$1.env || exit 1

d2 -c CircleCfg[0].cloudhost ${CLOUDHOST}

/etc/init.d/CSH restart


