#!/bin/sh
# Copyright (C) 2021, Broadcom. All Rights Reserved.
#
# Permission to use, copy, modify, and/or distribute this software for any
# purpose with or without fee is hereby granted, provided that the above
# copyright notice and this permission notice appear in all copies.
#
# THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
# WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
# MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
# SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
# WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
# OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
# CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
#
# <<Broadcom-WL-IPTag/Proprietary,Open:.*>>
#


echo "===== fwupg_flashing.sh =="

/bin/wdtctl -d -t 30 start &

PPIDS=`fuser -m /oldroot`
echo "kill process who is still using /old-root: $PPIDS"


for pp in $PPIDS
do
#echo "pp is $pp"
echo "killing pid $pp"
kill -9 $pp
done

sync
sleep 1

#sync
#sleep 1
#echo "Check again who is still using /old-root"
#ps

umount /mnt/defaults
#umount /data
umount /oldroot/data
umount /sys/kernel/debug
umount /mnt
umount /oldroot/rom
umount /oldroot
sync
sleep 1

/bin/bcm_flasher /tmp/uhttp-upgrade.img 1
ret="$?"
sync
sleep 2
reboot -f

sh




