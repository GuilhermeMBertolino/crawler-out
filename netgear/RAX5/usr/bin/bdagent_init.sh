#!/bin/sh

#Project Specify.
model=$(uci -P /var/state -n get netgear.board.model)
if [ $model == "RAX5" ]; then
    getdb="/usr/bin/getdb.sh"
    sku=$(uci -P /var/state -n get netgear.board.sku) #get sku method for RAX5 project.
    is_ArmorAir="1";
else #Implementation for RAX30.
    getdb="getdb"
    sku=$(cat /proc/environment/sku) #get sku method for RAX30 project.
    is_ArmorAir="0";
fi

if [ "$sku" = "PR" ]; then
    rm -rf /data/bitdefender
    exit 0
fi

# Armor Specify
if [ $is_ArmorAir == "1" ]; then
    armor_agent_runtime_config_FILEPATH="/opt/bitdefender/storage.json";
    backup_armor_config_FILEPATH="/etc/bitdefender_backup/storage.json";
else
    armor_agent_runtime_config_FILEPATH="/data/bitdefender/etc/storage.data";
    backup_armor_config_FILEPATH="/data/storage.data";
fi

op_mode=$($getdb -r)
if [ "$op_mode" = "router" ]; then
    echo -e "\033[35mStarting BDAgent...\033[0m" > /dev/console;
    # Check current bdagent version is same as FW bdagent version
    # if the version is different, update it
    if [ $is_ArmorAir == "1" ]; then
        fw_bdagent=`cat /rom/opt/bitdefender/bitdefender-release | grep VERSION`
    else
        tar -xzf /etc/armor_bdagent.tar.gz -C /tmp/
        fw_bdagent=`cat /tmp/bitdefender/bitdefender-release | grep VERSION`
    fi
    fw_ver=$(echo $fw_bdagent | tr "=.-" " ") #split version to VERSION 2 2 65 3~61f979c75
    set -- $fw_ver
    fw_ver_sum=$(($2+$3+$4))

    if [ -f /opt/bitdefender/bitdefender-release ]; then
        cur_bdagent=`cat /opt/bitdefender/bitdefender-release | grep VERSION`
        cur_ver=$(echo $cur_bdagent | tr "=.-" " ") #split version to VERSION 2 2 65 3~61f979c75
        set -- $cur_ver
        cur_ver_sum=$(($2+$3+$4))
    else
        cur_bdagent="empty"
        cur_ver_sum=0
    fi
    echo "FW BDAgent version is $fw_bdagent, current BDAgent version is $cur_bdagent" > /dev/console

    if [ $fw_ver_sum -gt $cur_ver_sum ]; then
        echo "BDAgent version is not consist, update it..." > /dev/console
        # backup storage.data
        cp -f $armor_agent_runtime_config_FILEPATH $backup_armor_config_FILEPATH 

        # update the bdagent as FW version
        if [ $is_ArmorAir == "1" ]; then
            chmod +x /opt/bitdefender/iptables.sh
        else #Implementation for RAX30.
            cp -af /tmp/bitdefender/ /data/
            chmod +x /opt/bitdefender/guster/scripts/create_chain.sh
        fi

        mkdir -p /opt/bitdefender/lib
        sync;sleep 1

        if [ $is_ArmorAir == "1" ]; then
            ln -fs /usr/lib/libbdbroker.so /opt/bitdefender/lib/libbdbroker.so
            #ln -fs bdleases-ng /data/bitdefender/bin/bdleases #No such file in Armor Air Agent release.
        else #Implementation for RAX30.
            ln -fs /lib/libbdbroker.so /opt/bitdefender/lib/libbdbroker.so
            ln -fs bdleases-ng /data/bitdefender/bin/bdleases
        fi

        # restore storage.data
        [ -f $backup_armor_config_FILEPATH ] && mv $backup_armor_config_FILEPATH $armor_agent_runtime_config_FILEPATH

        if [ $is_ArmorAir == "1" ]; then
            echo "no need to remove old bdagent on RAX5 project."
        else
            #Implementation for RAX30.
            # remove old armor bdagent install flag
            # if FW downgrade to V70 or older version, it would force update bdagent binary
            rm -f /data/bitdefender/.rax30Installed
            touch /data/bitdefender/.installed
        fi
    fi
    rm -rf /tmp/bitdefender/
    sync


    if [ $is_ArmorAir == "1" ]; then
        mkdir -p /opt/bitdefender/lib
        sync;sleep 1
        ln -fs /usr/lib/libbdbroker.so /opt/bitdefender/lib/libbdbroker.so
        #ln -fs bdleases-ng /data/bitdefender/bin/bdleases #No such file in Armor Air Agent release.
    fi

    # Run bdupd check-consistency befroe launch bdagent
    if [ $is_ArmorAir == "1" ]; then
        echo "For now, Armor Air Agent does not provide run-time update method."
    else #Implementation for RAX30.
        /usr/bin/bdupd_run.sh boot
    fi

    /etc/init.d/ASH stop

    /opt/bitdefender/bin/bd start;
    if [ $is_ArmorAir == "1" ]; then
        #/opt/bitdefender/iptables.sh init
        echo "Init BD_FILTER chain by \"bd start\", it will call iptables.sh init."
    else
        /opt/bitdefender/guster/scripts/create_chain.sh 0;
    fi
    sleep 10;
    if [ $is_ArmorAir == "1" ]; then
        ftnl -F; #Flush connections out of MTK fast-path acceleration.
    else #Implementation for RAX30.
        fc flush; #clean Brcm's flow cache.
    fi

    /etc/init.d/ASH start

    #/usr/bin/bd_health_check.sh boot

    # Generate the random number to set the crond periodically
    if [ $is_ArmorAir == "1" ]; then
        rand=$(awk 'BEGIN{srand();print int(rand()*1000%180)}')
    else #Implementation for RAX30.
        rand=`shuf -i 0-179 -n 1`
    fi
    hour=$(($rand/60 + 1))
    min=$(($rand%60))

    if [ $is_ArmorAir == "1" ]; then
        min=$(($rand%30))
        min2=$(($min+30))
        echo "$min,$min2 * * * * /usr/bin/bdagent_restart.sh" > /var/spool/cron/crontabs/bdrestart
        echo "bdrestart" > /var/spool/cron/crontabs/cron.update
    else #Implementation for RAX30.
        echo "$min $hour * * * /usr/bin/bdupd_run.sh daily" > /var/spool/cron/crontabs/bdupd
        echo "bdupd" > /var/spool/cron/crontabs/cron.update
    fi

    #/usr/bin/bd_health_check.sh checker &
else
    echo -e "\033[35mDon't starting BDAgent, not supported...\033[0m" > /dev/console;
fi
