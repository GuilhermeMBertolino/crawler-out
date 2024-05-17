#!/bin/sh

#
# For debug test, put local server url to /data/bdupd_url and touch /data/bdupd_insecure
# It would download the bdagent.tar from local server
#

LOG_FILE="/tmp/bdupd_run.log"

set_bdupd_server()
{
    if [ -f /data/bdupd_url ]; then
        # use user defined url for debug/test only
        bdaDownloadPath="url=$(cat /data/bdupd_url)";
    else
        # use default one
        model=$(d2 -s general[0].DeviceModel | awk '{printf tolower($1)}');
        # The BD Agent version would only get <major>.<minor>.<sprint>. Don't include <build>
        bdaVersion=$(cat /opt/bitdefender/bitdefender-release | grep VERSION | awk -F '[=-]' '{printf $2}');
        bdaDownloadPath="url=https://http.fw.updates1.netgear.com/sw-apps/armor/$model/$bdaVersion/bdagent.tar";
    fi

    echo "[bdupd_run] update the bdupd server to $bdaDownloadPath" >> $LOG_FILE
    echo $bdaDownloadPath > /opt/bitdefender/etc/bdupd.server

    if [ -f /data/bdupd_insecure ]; then
        echo "insecure=1" >> /opt/bitdefender/etc/bdupd.server
    fi
}

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

do_update()
{
    bdupd_check=`/opt/bitdefender/bin/bdupd check-update | awk '{printf $2}' | cut -d } -f 1`
    if [ $bdupd_check == "true" ]; then #check_update is true
        d2 -c armorcfg.bdUpgradeState "true"
        bdagent_stop

        echo "[bdupd_run] update_available is true and will apply update" >> $LOG_FILE

        bdupd_apply=`/opt/bitdefender/bin/bdupd apply-update | awk '{printf $2}' | cut -d } -f 1`
        if [ $bdupd_apply == "false" ]; then #apply-update is false
            echo "[bdupd_run] apply-update is $bdupd_apply" >> $LOG_FILE

            bdupd_consistent=`/opt/bitdefender/bin/bdupd check-consistency | awk '{printf $2}' | cut -d } -f 1`
            if [ $bdupd_consistent == "false" ]; then #consistent is false
                echo "[bdupd_run] remove all file in /opt/bitdefender and use built-in bdagent" >> $LOG_FILE
                reinstall_bdagent
            fi
        else
            echo "[bdupd_run] apply-update successfully" >> $LOG_FILE
        fi

        d2 -c armorcfg.bdUpgradeState "false"
        bdagent_start

    else
        echo "[bdupd_run] update_available is false and try to check next time" >> $LOG_FILE
    fi
}

reinstall_bdagent()
{
    echo "[bdupd_run] Installing bitdefender..." >> $LOG_FILE

    # backup storage.data
    cp -f /data/bitdefender/etc/storage.data /data/storage.data

    rm -rf /data/bitdefender
    tar -xzf /etc/armor_bdagent.tar.gz -C /data/
    chmod +x /opt/bitdefender/guster/scripts/create_chain.sh

    ##Actually it will create /data/bitdefender/lib/ path.
    mkdir -p /opt/bitdefender/lib
    sync;sleep 1
    ln -fs /lib/libbdbroker.so /opt/bitdefender/lib/libbdbroker.so
    ln -fs bdleases-ng /data/bitdefender/bin/bdleases

    # restore storage.data
    [ -f /data/storage.data ] && mv /data/storage.data /data/bitdefender/etc/storage.data

    touch /data/bitdefender/.installed
    sync

    echo "[bdupd_run] bitdefender installed..." >> $LOG_FILE
}

daily_check()
{
    echo "[bdupd_run] Daily check new bdagent...." >> $LOG_FILE

    set_bdupd_server

    touch /opt/bitdefender/.bdupd

    bdupd_consistent=`/opt/bitdefender/bin/bdupd check-consistency | awk '{printf $2}' | cut -d '}' -f 1`
    if [ $bdupd_consistent == "false" ]; then #consistent is false
        echo "[bdupd_run] consistent_result is false, will restore built-in bdagent, and download the bdagent again" >> $LOG_FILE
        bdagent_stop

        reinstall_bdagent

        bdagent_start

	do_update
    else
        echo "[bdupd_run] consistent_result is true and try to download the bdagent" >> $LOG_FILE
	do_update
    fi

    rm -rf /opt/bitdefender/.bdupd
}

boot_check()
{
    echo "[bdupd_run] Booting check new bdagent...." >> $LOG_FILE

    set_bdupd_server

    bdupd_consistent=`/opt/bitdefender/bin/bdupd check-consistency | awk '{printf $2}' | cut -d '}' -f 1`
    if [ $bdupd_consistent == "false" ]; then #consistent is false
        echo "[bdupd_run] consistent_result is false, it will restore built-in bdagent and download the bdagent again" >> $LOG_FILE
        reinstall_bdagent

        # In boot, it will try 1 times to avoid block boot sequcene
        bdupd_check=`/opt/bitdefender/bin/bdupd check-update | awk '{printf $2}' | cut -d '}' -f 1`
        if [ $bdupd_check == "true" ]; then #check_update is true
            d2 -c armorcfg.bdUpgradeState "true"

            echo "[bdupd_run] update_available is true and will apply update" >> $LOG_FILE

            bdupd_apply=`/opt/bitdefender/bin/bdupd apply-update | awk '{printf $2}' | cut -d '}' -f 1`
            if [ $bdupd_apply == "false" ]; then #apply-update is false
                echo "[bdupd_run] apply-update is $bdupd_apply" >> $LOG_FILE

                bdupd_consistent=`/opt/bitdefender/bin/bdupd check-consistency | awk '{printf $2}' | cut -d '}' -f 1`
                if [ $bdupd_consistent == "false" ]; then #consistent is false
                    echo "[bdupd_run] remove all file in /opt/bitdefender and use built-in bdagent" >> $LOG_FILE
		    reinstall_bdagent
                fi
            else
                echo "[bdupd_run] apply-update successfully" >> $LOG_FILE
            fi

            d2 -c armorcfg.bdUpgradeState "false"
       fi 
    else
        echo "[bdupd_run] consistent_result is true and finsh bdupd boot check" >> $LOG_FILE
    fi
}

op_mode=$(getdb -r)
echo "op_mode=$op_mode";
if [ "$op_mode" != "router" ]; then
    echo "[bdupd_run] Don't run bdupd in $op_mode....."
    exit 0
fi

case "$1" in
    "daily")
        if [ ! -z $(ps | grep pufwUpgrade | grep -v grep) ]; then
            echo "[bdupd_run] pufwUpgrade is running, don't run bdagent update...." >> $LOG_FILE
            exit 0
        fi

        if [ -f /tmp/bdupd_running ]; then
            echo "[bdupd_run] bdupd_run.sh is running, don't run bdagent update...." >> $LOG_FILE
            exit 0
        fi

        echo "[bdupd_run] Daily checking bdagent update at $(date)" >> $LOG_FILE
        touch /tmp/bdupd_running
        daily_check
        rm -f /tmp/bdupd_running
    ;;
    "boot")
        if [ ! -z $(ps | grep pufwUpgrade | grep -v grep) ]; then
            echo "[bdupd_run] pufwUpgrade is running, don't run bdagent update...." >> $LOG_FILE
            exit 0
        fi

        if [ -f /tmp/bdupd_running ]; then
            echo "[bdupd_run] bdupd_run.sh is running, don't run bdagent update...." >> $LOG_FILE
            exit 0
        fi

        echo "[bdupd_run] Boot checking bdagent update at $(date)" >> $LOG_FILE
        touch /tmp/bdupd_running
        boot_check
        rm -f /tmp/bdupd_running
    ;;
    *)
        echo "[bdupd_run] Unknow command" >> $LOG_FILE
        echo "[bdupd_run] Usage: $0 [dayily | boot]" >> $LOG_FILE
	;;
esac


