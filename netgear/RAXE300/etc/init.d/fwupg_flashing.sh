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


echo "===== fwupg_flashing.sh ==" >> /data/fwupg_single.log

PPIDS=`fuser -m /old-root`
echo "kill process who is still using /old-root: $PPIDS" >> /data/fwupg_single.log


for pp in $PPIDS
do
#echo "pp is $pp"
echo "killing pid $pp" >> /data/fwupg_single.log
kill -9 $pp
done
sync
sleep 1
lsof

# umount usb disk
umount -l /old-root/mnt/disk*
umount -l /old-root/var/samba/share/*
umount -l /old-root/var/samba/ftp/shares/*

OLDFS="/old-root/mnt/defaults /old-root/mnt/pot /old-root/proc /old-root/data /old-root/dev/pts /old-root/sys/kernel/debug /old-root/sys /old-root/var /old-root/mnt /old-root/dev"
for FF in $OLDFS
do
  umount -f $FF
  ret=$?
  echo "umount -f $FF ret $ret " >> /data/fwupg_single.log
done

#<<PEGA JYang, RAXE300 switch FW download will lock filesystem
# and cause single image FW upgrade failure. Lazy umount /old-root/var to workaround
umount -l /old-root/var

umount /old-root

ret=$?
if [ "$ret" != 0 ]
then
  echo "Error while umounting /old-root. rebooting" >> /data/fwupg_single.log
  fuser -m /old-root
  mount
  reboot
  exit
else
  echo "Umount /old-root success !! " >> /data/fwupg_single.log
fi

sync
sleep 1
echo "Check again who is still using /old-root" >> /data/fwupg_single.log
ps >> /data/fwupg_single.log
lsof >> /data/fwupg_single.log

if [ -f /old-root ]
then 
echo "ERROR!! /old-root still exist " >> /data/fwupg_single.log
fi

/bin/bcm_flasher /tmp/upload_file 1
sync

echo "rebooting " >> /data/fwupg_single.log
reboot


