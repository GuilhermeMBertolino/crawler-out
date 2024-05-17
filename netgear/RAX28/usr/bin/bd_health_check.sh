#!/bin/sh

LOG_FILE="/tmp/bd_health_check.log"
BD_CHECK="true"

bdagent_start()
{
    /opt/bitdefender/bin/bd start
    chmod +x /opt/bitdefender/guster/scripts/create_chain.sh
    /opt/bitdefender/guster/scripts/create_chain.sh 0
    sleep 10
    fc flush #clean Brcm's flow cache.

    /etc/init.d/ASH start
}

bdagent_stop()
{
    /etc/init.d/ASH stop
    /opt/bitdefender/bin/bd stop
}

install_bdagent()
{
    echo "[BDAgent Health] Installing bitdefender..." >> $LOG_FILE

    rm -rf /data/bitdefender
    tar -xzf /etc/armor_bdagent.tar.gz -C /data/
    chmod +x /opt/bitdefender/guster/scripts/create_chain.sh
    ##Actually it will create /data/bitdefender/lib/ path.
    mkdir -p /opt/bitdefender/lib
    sync;sleep 1
    ln -fs /lib/libbdbroker.so /opt/bitdefender/lib/libbdbroker.so
    ln -fs bdleases-ng /data/bitdefender/bin/bdleases

    touch /data/bitdefender/.installed
    sync

    echo "[BDAgent Health] bitdefender installed..." >> $LOG_FILE
}

routerprotection_setup()
{
    isEnable="`getdb -g Device.X_PEGATRON_COM_ProtectionEngine.Enable`"
    echo "[BDAgent Health] Router Protection Engine = " ${isEnable}
    if [ ${isEnable} = "1" ]; then
        getdb --bd_rpe_enable
    else
        getdb --bd_rpe_disable
    fi
}

op_mode=$(getdb -r)
echo "op_mode=$op_mode";
if [ "$op_mode" != "router" ]; then
    echo "[BDAgent Health] Don't run bdupd in $op_mode....." >> $LOG_FILE
    exit 0
fi

run_health_check()
{
    if [ ! -f /opt/bitdefender/.installed ]; then
        echo "[BDAgent Health] unzip BDAgent packet is incomplete" >> $LOG_FILE

        # backup storage.data
        cp -f /data/bitdefender/etc/storage.data /data/storage.data

        bdagent_stop
        sleep 2
        install_bdagent
        sleep 2

        [ -f /data/storage.data ] && mv /data/storage.data /data/bitdefender/etc/storage.data

        bdagent_start
        routerprotection_setup
    fi

    bd_ver=`getdb --bd_ver`
    BD_CHECK="true"
    if [ "$bd_ver" == "-1" ]; then
        echo "[BDAgent Health] can't get the BD Agent version, restart BD Agent" >> $LOG_FILE
        bdagent_stop
        sleep 2
        bdagent_start

        bd_ver=`getdb --bd_ver`
        if [ "$bd_ver" == "-1" ]; then
            echo "[BDAgent Health] can't get the BD Agent version, reinstall BD Agent" >> $LOG_FILE
            bdagent_stop
            sleep 2
            install_bdagent
            sleep 2
            bdagent_start
            routerprotection_setup
            BD_CHECK="true"
        else
            BD_CHECK="false"
        fi
    else
	BD_CHECK="false"
    fi
}

case "$1" in
    "checker")
        if [ -f /opt/bitdefender/.stop_bd ]; then
            echo "[BDAgent Health] BD Agent resarting, waiting..." >> $LOG_FILE
            sleep 60 #wait 1min for WAN restart BDAgent
        fi

        if [ -f /opt/bitdefender/.bdupd ]; then
            echo "[BDAgent Health] BD Agent is updating, waiting..." >> $LOG_FILE
            sleep 300 #wait 5min for BDAgent update
        fi

        #date_time=`date`
        #echo "[BDAgent Health] restart BDAgent every 30min at $date_time" >> $LOG_FILE
        /opt/bitdefender/bin/bd start
        ;;
    "boot")
        echo "[BDAgent Health] start booting health check...." >> $LOG_FILE
        run_health_check
        if [ $BD_CHECK == "true" ]; then
            echo "[BDAgent Health] BD Agent health check error, check again...." >> $LOG_FILE
            sleep 5
            run_health_check
        fi
        echo "[BDAgent Health] finish booting health check, result is $BD_CHECK" >> $LOG_FILE
        ;;
    *)
        echo "[BDAgent Health] Unknow command" >> $LOG_FILE
        echo "[BDAgent Health] Usage: $0 [checker | boot]" >> $LOG_FILE
	;;
esac


