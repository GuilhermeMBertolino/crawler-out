#!/bin/sh
echo "===================S43 Acos previous init once!"

#mount misc2 and misc3
echo "mount misc2"
ubiattach /dev/ubi_ctrl -m 9
mount -t ubifs ubi2_0 /misc2
echo "mount misc3"
ubiattach /dev/ubi_ctrl -m 8
mount -t ubifs ubi3_0 /misc3

#create /misc2/.bd_data if not exist
if [ -e /misc2/.bd_data ]; then
    echo "Acos init once: bd is ready!";
else
    echo "Acos init once: create /misc2/.bd_data!"
    echo "" > /misc2/.bd_data;
fi

acos_pre_init_once
