#!/bin/sh
echo "Acos service start!"

IS_DEFAULT=$(nvram get blank_state)

if ( test $IS_DEFAULT = "1" ); then
    echo "[Loaddefault] remove string tables and reload from image.";\
    rm -f /data/string_table_*;\
    ls -al /data
fi

if [ ! -e /data/string_table_24 ] && [ -e /etc/TU_string_table ]; then
    echo "Migrate to 24 kinds of preload string tables.";\
    rm -f /data/string_table_*;\
    ls -al /data
fi

if [ ! -e /data/string_table_1 ]; then
    cp /etc/Eng_string_table /data/string_table_1
fi
if [ ! -e /data/string_table_2 ]; then
    cp /etc/FR_string_table /data/string_table_2
fi
if [ ! -e /data/string_table_3 ]; then
    cp /etc/GR_string_table /data/string_table_3
fi
if [ ! -e /data/string_table_4 ]; then
    cp /etc/IT_string_table /data/string_table_4
fi
if [ ! -e /data/string_table_5 ]; then
    cp /etc/JP_string_table /data/string_table_5
fi
if [ ! -e /data/string_table_6 ]; then
    cp /etc/KO_string_table /data/string_table_6
fi
if [ ! -e /data/string_table_7 ]; then
    cp /etc/NL_string_table /data/string_table_7
fi
if [ ! -e /data/string_table_8 ]; then
    cp /etc/PR_string_table /data/string_table_8
fi
if [ ! -e /data/string_table_9 ]; then
    cp /etc/PT_string_table /data/string_table_9
fi
if [ ! -e /data/string_table_10 ]; then
    cp /etc/RU_string_table /data/string_table_10
fi
if [ ! -e /data/string_table_11 ]; then
    cp /etc/SP_string_table /data/string_table_11
fi
if [ ! -e /data/string_table_12 ]; then
    cp /etc/SV_string_table /data/string_table_12
fi
if [ ! -e /data/string_table_13 ]; then
    cp /etc/CH_string_table /data/string_table_13
fi
if [ ! -e /data/string_table_14 ]; then
    cp /etc/CS_string_table /data/string_table_14
fi
if [ ! -e /data/string_table_15 ]; then
    cp /etc/DA_string_table /data/string_table_15
fi
if [ ! -e /data/string_table_16 ]; then
    cp /etc/EL_string_table /data/string_table_16
fi
if [ ! -e /data/string_table_17 ]; then
    cp /etc/FI_string_table /data/string_table_17
fi
if [ ! -e /data/string_table_18 ]; then
    cp /etc/HU_string_table /data/string_table_18
fi
if [ ! -e /data/string_table_19 ]; then
    cp /etc/NO_string_table /data/string_table_19
fi
if [ ! -e /data/string_table_20 ]; then
    cp /etc/PL_string_table /data/string_table_20
fi
if [ ! -e /data/string_table_21 ]; then
    cp /etc/RO_string_table /data/string_table_21
fi
if [ ! -e /data/string_table_22 ]; then
    cp /etc/SK_string_table /data/string_table_22
fi
if [ ! -e /data/string_table_23 ]; then
    cp /etc/SL_string_table /data/string_table_23
fi
if [ ! -e /data/string_table_24 ]; then
    cp /etc/TU_string_table /data/string_table_24
fi

/sbin/acos_init
acos_service start 
