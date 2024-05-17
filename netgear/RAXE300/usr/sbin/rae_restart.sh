#! /bin/bash
killall ntgr_ra_iot
while [ "$(pidof ntgr_ra_iot)" != "" ]; do
    sleep 1
done
ntgr_ra_iot -m 0 -M 0 -C&

