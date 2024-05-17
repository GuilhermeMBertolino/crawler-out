#!/bin/sh

source ./remGenie.$1.env || exit 1

/etc/init.d/remGenie stop

d2 -c xagentcfg[0].genie_remote_url ${RGENIE_REMOTE_URL}

/etc/init.d/remGenie start
