#!/bin/sh

#burnhwver 2> /tmp/test
#model_name=`cat /tmp/test | sed 's/HW Version - //g' | tr 'A-Z' 'a-z'`
#rm /tmp/test

model_name=`d2 -s general[0].DeviceModel | tr 'A-Z' 'a-z'`
version_name=`nvram get bd_version`
set_bdagent_url()
{
    bdagent_url=`nvram get bdagent_url`
    if [ "x$bdagent_url" = "x" ]; then  
        # nvram bdagent_url is not exist, use default one
        echo "url=https://http.fw.updates1.netgear.com/sw-apps/armor/${model_name}/${version_name}/bdagent.tar" > /opt/bitdefender/etc/bdupd.server
    else
        echo "url=$bdagent_url" > /opt/bitdefender/etc/bdupd.server
    fi

    bdagent_insecure=`nvram get bdagent_insecure`
    if [ "x$bdagent_insecure" != "x" ] && [ $bdagent_insecure == "1" ]; then
        echo "insecure=1" >> /opt/bitdefender/etc/bdupd.server
    fi
}

check_bdupd_exist()
{
    if [ ! -d "/opt/bitdefender" ];then
        echo "[bdupd] /opt/bitdefender folder not exist!!" > /dev/console
        mkdir /opt/bitdefender
    else
        echo "[bdupd] /opt/bitdefender folder exist!!" > /dev/console
    fi

    #Per NETGEAR Richard's request, we don't need to untar bdupd tarball
    #bdupd_untar_finish=`nvram get bdupd_untar_finish`
    #if [ ! -e "/opt/bitdefender/bin/bdupd" ] || [ "x${bdupd_untar_finish}" != "x1" ];then
    #     echo "[bdupd] /opt/bitdefender/bin/bdupd not exist!!" > /dev/console
    #     cp /opt/bit/phase2-upd.tar.gz  /opt/bitdefender
    #     cd /opt/bitdefender
    #     tar zxf phase2-upd.tar.gz
    #     rm phase2-upd.tar.gz
    #     cd /
    #     nvram set bdupd_untar_finish=1    
    #     nvram commit
    #else
    #    echo "[bdupd] /opt/bitdefender/bin/bdupd exist!!" > /dev/console
    #fi

    set_bdagent_url
}

stop_bd()
{
    /etc/init.d/ASH stop
    /opt/bitdefender/bin/bd stop
}

start_bd()
{
    /opt/bitdefender/bin/bd start
    /etc/init.d/ASH start
}

downBD_first()
{
    dbg_url=`cat /opt/bitdefender/etc/bdupd.server`
    echo "[bdupd] /opt/bitdefender/etc/bdupd.server is $dbg_url" > /dev/console

    check_result=`/opt/bitdefender/bin/bdupd check-update | grep false`
    num=0	
    maxnum=5
    while [ "x${check_result}" != "x" ] && [ $num -lt ${maxnum} ]
    do
        echo "[bdupd] ${check_result}, wait 20 minuters, will check-update again" > /dev/console
        sleep 1200
        num=$(( $num + 1 ))
        check_result= `/opt/bitdefender/bin/bdupd check-update | grep false`
    done

    if [ $num -eq $maxnum ]; then
        echo "[bdupd]have 5 times retry for check-update, will try again next day" >/dev/console
        exit 2
    fi

    echo "[bdupd] {\"update_available\": true}, will apply update" > /dev/console
    #apply-check
    apply_result=`/opt/bitdefender/bin/bdupd apply-update | grep false`
    num=0
    while [ "x${apply_result}" != "x" ] && [ $num -lt $maxnum ] 
    do
        echo "[bdupd] ${apply_result}, wait 20 minuter, will apply-update again" > /dev/console
        sleep 1200
        num=$(( $num + 1 ))
        apply_result=`/opt/bitdefender/bin/bdupd apply-update | grep false` 
    done	
    if [ $num -eq $maxnum ]; then
        echo "[bdupd]have 5 times retry for apply-update, will try again next day" >/dev/console
        exit 2
    fi

    echo "[bdupd] update successfully" > /dev/console

    consistent_result=`/opt/bitdefender/bin/bdupd check-consistency` 
    echo "[bdupd] ${consistent_result}" > /dev/console
	touch /opt/bitdefender/first_download_done
}

deal_inconsistency()
{
    echo "[bdupd]remove all file in /opt/bitdefender" > /dev/console
    rm -r -f /tmp/media/nand/bitdefender
    mkdir /tmp/media/nand/bitdefender
    tar -xvf /opt/bit/bitdefender.tar -C /tmp/media/nand/
    cd /

    set_bdagent_url
    downBD_first
}

day_check()
{
    echo "[bdupd] day_check..." > /dev/console	

    check_bdupd_exist
    consistent_result=`/opt/bitdefender/bin/bdupd check-consistency | grep false`
    if [ "x${consistent_result}" != "x" ];then    #consistent false
        echo "[bdupd] consistent_result = ${consistent_result}, will remove the all file, and download the BDagent again" > /dev/console
        stop_bd
        deal_inconsistency
        start_bd
    else
        check_result=`/opt/bitdefender/bin/bdupd check-update |grep true`
        if [ "x${check_result}" != "x" ];then
            d2 -c armorcfg.bdUpgradeState "true"
            stop_bd

            echo "[bdupd] {\"update_available\": true}, will apply update" > /dev/console
            apply_result=`/opt/bitdefender/bin/bdupd apply-update | grep false`
            if [ "x${apply_result}" != "x" ];then
                echo "[bdupd] ${apply_result}" > /dev/console
                consistent_result=`/opt/bitdefender/bin/bdupd check-consistency | grep false`
                if [ "x${consistent_result}" != "x" ];then    #consistent false
                    echo "[bdupd] ${consistent_result}, will remove the all file, and download the BDagent again" > /dev/console	
                    deal_inconsistency	
                fi
            else
                echo "[bdupd] apply-update successfully" > /dev/console
            fi
            d2 -c armorcfg.bdUpgradeState "false"
            start_bd
        else
            echo "[bdupd] {\"update_available\": false}, try to check next day" > /dev/console
        fi
    fi
}

case "$1" in
    "day-check")
        day_check
    ;;
    *)
        echo "Unknow command" >/dev/console
        echo "Usage: $0 day-check" > /dev/console
	;;
esac

