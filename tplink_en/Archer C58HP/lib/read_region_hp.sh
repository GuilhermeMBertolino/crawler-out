#!/bin/sh

hp_file=/etc/region_hp.config

get_Region_Limit() {
	local find=0
	local index=0
	
	index=0
	line=`grep $1 ${hp_file}`	
	
	if [ -z "${line}" ]
	then
	    tp_default_ctldisable=0
	    tp_default_powerlvl=high
	    tp_high_ctldisable=0
	else
	    for item in $line
	    do
            if [ "${find}" == "0" ]
            then
                if [ "${item}" == "$1" ]
                then
                find=1
                country=${item}
                else
                find=0
                fi
	       else
	            case "${index}" in
                    "1") tp_default_ctldisable="${item}";;                    	
                    "2") tp_default_powerlvl="${item}";;
                    "3") tp_high_ctldisable="${item}"; break;;
	            esac
	       fi
	       index=`expr ${index} + 1`
	    done
	fi
}
