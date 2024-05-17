#!/bin/bash

TUN_ST_FILE=/tmp/openvpn/openvpn_tun.status
TAP_ST_FILE=/tmp/openvpn/openvpn_tap.status
ST_FILE=/tmp/openvpn/VPN_Client.total
LIST_FILE=/tmp/openvpn/VPN_Client.list
JSON_FILE=/tmp/openvpn/VPN_Client_json

PID_FILE=/tmp/openvpn/Gen_Client_Script.pid

if [ -f $PID_FILE ]; then

    PID=$(cat $PID_FILE)

    ps -p $PID > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo "This script is already running!"
        exit 1
    fi
fi

echo $$ > $PID_FILE

if [ $? -ne 0 ]; then
  echo "Could not create PID file."
  exit 1
fi



rm -rf ${ST_FILE} ${LIST_FILE} ${JSON_FILE}

if [ -f ${TUN_ST_FILE} ]; then

    cat ${TUN_ST_FILE}

    first_line=`grep -n 'Virtual Address' ${TUN_ST_FILE} | awk -F":" '{print $1}'`
    last_line=`grep -n 'GLOBAL STATS' ${TUN_ST_FILE} | awk -F":" '{print $1}'`
    start_line=$((${first_line}+1))
    end_line=$((${last_line}-1))

    echo "first_line = " ${first_line} " last_line  = " ${last_line}
    echo "start_line = " ${start_line} " end_line   = " ${end_line}

    if [ ${start_line} -le ${end_line} ]; then
        sed -n "${start_line},${end_line}p" ${TUN_ST_FILE} > ${LIST_FILE}
    fi

    cat ${TUN_ST_FILE} >> ${ST_FILE}
fi

if [ -f ${TAP_ST_FILE} ]; then

    cat ${TAP_ST_FILE}

    first_line=`grep -n 'Virtual Address' ${TAP_ST_FILE} | awk -F":" '{print $1}'`
    last_line=`grep -n 'GLOBAL STATS' ${TAP_ST_FILE} | awk -F":" '{print $1}'`
    start_line=$((${first_line}+1))
    end_line=$((${last_line}-1))

    echo "first_line = " ${first_line} " last_line  = " ${last_line}
    echo "start_line = " ${start_line} " end_line   = " ${end_line}

    if [ ${start_line} -le ${end_line} ]; then
        if [ -f ${LIST_FILE} ]; then
            sed -n "${start_line},${end_line}p" ${TAP_ST_FILE} >> ${LIST_FILE}
        else
            sed -n "${start_line},${end_line}p" ${TAP_ST_FILE} >  ${LIST_FILE}
        fi
    fi

    cat ${TAP_ST_FILE} >> ${ST_FILE}
fi


if [ -f ${LIST_FILE} ]; then
    sed -i -E 's/,/,/g' /tmp/openvpn/VPN_Client.list
    echo "========================================================="
    cat ${LIST_FILE}

    echo "========================================================="
    #Virtual Address,Common Name,Real Address,Last Ref
    echo -e "[" > ${JSON_FILE}
    cat ${LIST_FILE} | while read -r line
    do
        va=`echo ${line} | awk -F',' '{print $1}' | sed -e 's/^[ ]*//g' | sed -e 's/[ ]*$//g'`
        cn=`echo ${line} | awk -F',' '{print $2}' | sed -e 's/^[ ]*//g' | sed -e 's/[ ]*$//g'`
        ra=`echo ${line} | awk -F',' '{print $3}' | sed -e 's/^[ ]*//g' | sed -e 's/[ ]*$//g'`
        lr=`echo ${line} | awk -F',' '{print $4}' | sed -e 's/^[ ]*//g' | sed -e 's/[ ]*$//g'`
        cs=`cat ${ST_FILE} | grep ${ra} | head -n1 | awk -F',' '{print $5}' | sed -e 's/^[ ]*//g' | sed -e 's/[ ]*$//g'`

        if [ ${va:2:1} = ":" ]; then
            MAC=${va}
            TAPVA=`arp -a | grep ${MAC} | cut -d '(' -f 2 | cut -d ')' -f 1`; echo ${TAPVA}

            if [ -n "${TAPVA}" ]; then
                va=${TAPVA}
            fi
        fi

        NBT=`nbtscan -q -e -r ${va} | awk '{print $2}'`; echo ${NBT}
        if [ -n "${NBT}" ]; then
            cn=${NBT}
        fi

        echo -n -e '{"Virtual Address":"'${va}'",' >> ${JSON_FILE}
        echo -n -e '"Common Name":"'${cn}'",'      >> ${JSON_FILE}
        echo -n -e '"Real Address":"'${ra}'",'     >> ${JSON_FILE}
        echo    -e '"Last Ref":"'${cs}'"},'        >> ${JSON_FILE}
    done
    sed -i '$s/,$//' ${JSON_FILE}
    echo -e "]" >> ${JSON_FILE}

    cat ${JSON_FILE}
else
    echo "NOT Found " ${LIST_FILE} " !!"
fi


rm -f ${PID_FILE}

