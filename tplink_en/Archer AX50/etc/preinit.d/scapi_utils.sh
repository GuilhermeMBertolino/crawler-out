#!/bin/sh 

if [ ! "$CONFIGLOADED" ]; then
        if [ -r /etc/rc.d/config.sh ]; then
                . /etc/rc.d/config.sh 2>/dev/null
                CONFIGLOADED="1"
        fi
fi

scapi_utils_init()
{
	local file="/opt/lantiq/etc/.certchk"
	local fwfile="/opt/lantiq/etc/csd/fwboot"

#create certificate for lighthttpd on first boot.
if [ ! -s $file ] ; then
	key=`scapiutil get_key`
fi

#check whether fw boot or normal boot
if [ -f $fwfile ] ; then

	#find last running configuration
	file=`cat /opt/lantiq/etc/csd/csdswap`
        _lastmodified=`echo $file | cut -d \= -f 2`

	if [[ $_lastmodified -eq 1 ]] ; then
		csdutil merge /opt/lantiq/config/.run-data.xml /rom/etc/datacfg /rom/etc/ctrlcfg
	else
		csdutil merge /opt/lantiq/config/.run-data-swp.xml /rom/etc/datacfg /rom/etc/ctrlcfg
	fi

	#remove fwboot
	[ -e $fwfile ] && rm $fwfile
fi

#create log soft link under /tmp directory for procd log on boot.

# The source directory and target directories.
target_location="/tmp/debug_level" # Contains the working location of file.
source_location="/opt/lantiq/etc/debug_level" # file location. 

if [ ! -s $source_location ] ; then
	echo '2' > $source_location
	echo '#Auto generated file for procd debug level(1-5)' >> $source_location
fi

ln -s "$source_location" "$target_location"

}

scapi_utils_init

