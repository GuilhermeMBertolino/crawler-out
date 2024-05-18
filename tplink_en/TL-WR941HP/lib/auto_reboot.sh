#/*
#* Assumption 1: auto_reboot.sh is always executed by root.
#* Assumption 2: Only auto_reboot.sh writes "reboot" string into /etc/crontabs/root.
#* By Zoey Hsiao, 14Oct15
#*/

autoreboot_start()
{
    config_load auto_reboot
    config_get enable settings enable
    
    autoreboot_stop
	
	detect_time_set
    
    if [ "$enable" == "on" ]; then 
	config_get days settings days
	config_get time settings time

        time_hour=$(echo $time|awk -F ':' '{print $1}')
        time_min=$(echo $time|awk -F ':' '{print $2}')

	echo $time_min $time_hour "* *" $days reboot >> /etc/crontabs/root
    fi

    return 0	
}

autoreboot_stop()
{
   sed -i '/ reboot$/d' /etc/crontabs/root
   return 0
}

detect_time_set()
{
	while true
	do
		[ -f /tmp/time_set ] && break
		sleep 3
	done
	
	return 0
}
