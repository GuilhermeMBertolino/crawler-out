#!/bin/sh
export PATH=/sbin:/bin:/usr/sbin:/usr/bin:/usr/sbin/scripts

UTC=yes

/usr/etc/mount.sh

# init reg so that led_hw can work
# init reg kernel_module led_booting interface switch all in board_init
/sbin/rc_app/rc_board_init

# for retrain margin the rc.sh is generate in rc/Makefile
#/usr/sbin/rc.sh

/usr/sbin/rc_app/rc_init

/usr/sbin/rc_app/rc_start

# adjust it after wlan up instead of reg_init since no wlan driver loaded
/bin/echo run smp wifi  
/etc/mtk/mt7621_smp.sh wifi
/bin/echo run smp wifi done

/usr/sbin/rc_app/rc_proc_init


/usr/sbin/scfgmgr &
#/bin/sh
