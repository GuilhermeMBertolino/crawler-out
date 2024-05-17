#!/bin/sh

# check blank state
blank_state=$(uci get netgear.system.blank_state)
if [ $blank_state == "1" ]; then
    echo -e "\033[35mRestarting armor air...exit in blank_state\033[0m" > /dev/console;
    exit
fi

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

# Armor Specify
if [ $is_ArmorAir == "1" ]; then
    echo -e "\033[35mRestarting armor air...$(date)\033[0m" > /dev/console;
    #Per Armor doc, don't need to stop just execute start
    #/opt/bitdefender/bin/bd stop;
    /opt/bitdefender/bin/bd start;
    sleep 2;
    echo -e "\033[35m$(bd_tool --bd_ver)\033[0m" > /dev/console;
fi
