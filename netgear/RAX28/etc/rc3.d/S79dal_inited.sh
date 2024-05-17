#!/bin/sh
if [ ! -e /tmp/dal_inited ];then
	touch /tmp/dal_inited
fi

#hook DAL callback functions
sh -c "/bin/pudilcb &"

#DIL HUA function
/bin/puhttpsniff &

#firmware download usage
mkdir /tmp/fw
#RA download usage
mkdir /tmp/ra

#Check internet status
#/bin/dal_update_wan.sh

#CFU boot notify
#CFU spec v2.8 change boot notify to internet ready
#/bin/pucfu -d -l -r &

#AutoFW check schedule
/bin/pufwUpgrade -s &
