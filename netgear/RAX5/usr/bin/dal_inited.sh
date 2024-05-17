#!/bin/sh
if [ ! -e /tmp/dal_inited ];then
	touch /tmp/dal_inited
fi

#hook DAL callback functions
sh -c "/bin/pudilcb &"

#DIL HUA function
#ToDo
#/bin/puhttpsniff &

#Create download folder for CFU
mkdir /tmp/fw

#Force to update DAL WAN status
/usr/bin/dal_update_wan.sh

#AutoFW check schedule
/sbin/pufwUpgrade -s &
