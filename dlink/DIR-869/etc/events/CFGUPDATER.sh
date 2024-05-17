#!/bin/sh
echo "$0: $#($@)"

cfg_filename="$1"
do_reboot="$2"

fwupdater -i "$cfg_filename" -t "CONFIG"

if [ "$do_reboot" != "0" ]; then
	event REBOOT
fi
