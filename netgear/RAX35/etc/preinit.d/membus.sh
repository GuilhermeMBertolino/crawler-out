#!/bin/sh
# Copyright (C) 2013 Lantiq Deutschland GmbH

echo "preinit start membus" > /tmp/membus.log

#cat /etc/passwd
#md5sum /etc/passwd

if [ ! -e /etc/passwd ]; then

    echo "preinit convert all membus " >> /tmp/membus.log
    pu_int-de /etc/membus /etc/passwd
    pu_int-de /etc/membus1 /etc/passwd_production    
    pu_int-de /etc/membus2 /etc/passwd_pullDownAdmin  
    pu_int-de /etc/membus3 /ramdisk_copy/etc/passwd    
    pu_int-de /etc/lighttpd/interleaved-lighttpd_rm.pem /etc/lighttpd/lighttpd_rm.pem
    pu_int-de /etc/lighttpd/interleaved-lighttpd.pem /etc/lighttpd/lighttpd.pem    
    
    #ls -l /etc/passwd
    #cat /etc/passwd

fi

if [ ! -e /etc/lighttpd/lighttpd_rm.pem ]; then

    echo "preinit /etc/lighttpd/lighttpd_rm.pem " >> /tmp/membus.log
    pu_int-de /etc/lighttpd/interleaved-lighttpd_rm.pem /etc/lighttpd/lighttpd_rm.pem

fi

if [ ! -e /etc/lighttpd/lighttpd.pem ]; then

    echo "preinit /etc/lighttpd/lighttpd.pem " >> /tmp/membus.log
    pu_int-de /etc/lighttpd/interleaved-lighttpd.pem /etc/lighttpd/lighttpd.pem    

fi

if [ ! -e /etc/passwd_production ]; then

    echo "preinit /etc/passwd_production " >> /tmp/membus.log
    pu_int-de /etc/membus1 /etc/passwd_production 

fi

if [ ! -e /etc/passwd_pullDownAdmin ]; then

    echo "preinit /etc/passwd_pullDownAdmin " >> /tmp/membus.log
    pu_int-de /etc/membus2 /etc/passwd_pullDownAdmin 

fi

if [ ! -e /ramdisk_copy/etc/passwd ]; then

    echo "preinit /ramdisk_copy/etc/passwd " >> /tmp/membus.log
    pu_int-de /etc/membus3 /ramdisk_copy/etc/passwd  
    
fi






