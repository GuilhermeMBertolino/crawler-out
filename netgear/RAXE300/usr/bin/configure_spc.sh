#!/bin/sh

compare_version () {
    if [ $1 == $2 ]; then
        return 0
    fi

    local i ver1=$1 ver2=$2

    for i in 1 2 3 4
    do
        a=`echo $1 | cut -d '.' -f $i`
        if [ ${#a} -eq 0 ]; then
            a=0
        fi
        b=`echo $2 | cut -d '.' -f $i`
        if [ ${#b} -eq 0 ]; then
            b=0
        fi

        if [ $a -gt $b ]; then
            return 1
        fi

        if [ $a -lt $b ]; then
            return 2
        fi
    done

    return 0
}

# Disable SPC at PR SKU
sku=$(cat /proc/environment/sku)
if [ "$sku" = "PR" ]; then
    rm -rf /data/circle
    exit 0
fi

# create necessary directories
mkdir -p /data/circle/data/
mkdir -p /tmp/circle/db/ /tmp/circle/log/
mkdir -p /tmp/spc_loader/
touch /tmp/spc_loader_log

echo "Checking Netgear SPC..."

# checking config file
if [ ! -f "/data/circle/config.ini" ]; then
    echo "Copy Netgear SPC default config file..."
    cp /etc/ntgr_spc_config.ini /data/circle/config.ini
fi

# checking agent
INSTALL_NTGR_SPC=0
SPC_DATA_VER=`circlectl version | grep 'Circle Agent Version' | awk {'printf $4'}`
SPC_AGENT_SRC_FILE=`ls /etc/ntgr_spc_agent.*.tar.gz | tr '\n' ' '`
SPC_FW_VER=`echo $SPC_AGENT_SRC_FILE  | awk -F '.' {'printf $2'} | tr '_' '.'`
if [ ${#SPC_DATA_VER} -eq 0 ]; then
    # There is No SPC agent
    rm -rf /data/circle/shares
    INSTALL_NTGR_SPC=1
else
    compare_version $SPC_DATA_VER $SPC_FW_VER
    if [ $? -eq 2 ]; then
        #FW's built-in agent is newer, then upgrade to it
        INSTALL_NTGR_SPC=1
    fi
fi

if [ $INSTALL_NTGR_SPC -eq 1 ]; then
    echo "Installing Netgear SPC Agent..."
    rm -rf /data/circle/shares
    tar -xzf $SPC_AGENT_SRC_FILE -C /data/circle
    # If using built-in agent, then using built-in ini file either
    cp /etc/ntgr_spc_config.ini /data/circle/config.ini
    echo "Netgear SPC Agent V$SPC_FW_VER is installed..."
else
    echo "Netgear SPC Agent V$SPC_DATA_VER has been installed..."
fi
