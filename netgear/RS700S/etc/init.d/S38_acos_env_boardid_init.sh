#!/bin/sh
echo "=============S38 create env boardid on /tmp"

cp -f /proc/environment/boardid /tmp/env_boardid
echo "[env_boardid] to copy uboot env boardid to /tmp/env_boardid done"
value_boardid=$(cat /tmp/env_boardid)
if [ -z $value_boardid ]; then
    echo "[env_boardid] /tmp/env_boardid not exist!"
else
    echo "[env_boardid] set uboot env boardid into nvram env_boardid"
    nvram set env_boardid=${value_boardid}
fi

