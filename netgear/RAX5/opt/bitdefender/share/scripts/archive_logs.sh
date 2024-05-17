#!/bin/sh

BDROOT="/opt/bitdefender"
BDLOGS="bitdefender_logs"
WORKING_DIR="/tmp/$BDLOGS"
ARCHIVE_FILE="$BDLOGS.tar.gz"

mkdir -p "$WORKING_DIR" && cd "$WORKING_DIR" || exit 1

ln -s "$BDROOT/config.json" .
[ -d "$BDROOT/log" ] && ln -s "$BDROOT/log" .
[ -d "/tmp/bitdefender/log" ] && ln -s "/tmp/bitdefender/log" tmp_log
[ -f "$BDROOT/storage.json" ] && ln -s "$BDROOT/storage.json" .
[ -f "$BDROOT/failed.ver" ] && ln -s "$BDROOT/failed.ver" .

"$BDROOT/bdi_watcher" -v > version.txt
"$BDROOT/stable/bdi_agent" service -v >> version.txt
"$BDROOT/iptables.sh" list -6 > iptables.txt

find -L "$BDROOT" -maxdepth 1 -type f -iname "*.dump" -exec ln -s {} . \;
find -L "$BDROOT" -maxdepth 1 -type f -iname "*.report" -exec ln -s {} . \;

ps > ps.txt
dmesg > dmesg.txt
top -b -n 1 > top.txt
uptime > uptime.txt
date -R > date.txt
df -h > df.txt

cd ..

# Create the archive.
tar -chzf "$ARCHIVE_FILE" -C "$WORKING_DIR" .
rm -rf "$WORKING_DIR"

"$BDROOT/stable/bdi_agent" encrypt "$ARCHIVE_FILE" "$ARCHIVE_FILE.enc"
rm -f "$ARCHIVE_FILE"

tar -czf "$ARCHIVE_FILE" "$ARCHIVE_FILE.enc"
rm -f "$ARCHIVE_FILE.enc"
