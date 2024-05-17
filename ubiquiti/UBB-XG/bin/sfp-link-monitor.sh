#!/bin/sh

SFP_LINK_MON_HANDLE="/proc/net/sfp-gearbox-link-changed"
INTERFACE_TO_RESTART="ueth1"
MODULE="IFMon"
IF_8P8C="ueth0"
IF_SFP="ueth1"

deactivate_interfaces() {
    vppctl set int state ${IF_SFP} down
    vppctl set int state ${IF_8P8C} down
}

set_8p8c_active() {
    vppctl set int state ${IF_SFP} down
    vppctl set int state ${IF_8P8C} up
}

set_sfp_active() {
    vppctl set int state ${IF_8P8C} down
    vppctl set int state ${IF_SFP} up
}

signal_term_handler() {
    deactivate_interfaces
    echo 0 > /proc/net/sfp
    exit
}

trap signal_term_handler SIGTERM
trap signal_term_handler SIGINT

vpp_is_ready=0

logger -st "${MODULE}" "SFP/8P8C port monitor"
while [ ${vpp_is_ready} -eq 0 ]; do 
    if vppctl show bond | grep -q BondEthernet3; then
        vpp_is_ready=1
    else
        sleep 1
    fi
done
logger -st "${MODULE}" "VPP is ready to monitor port status"

echo 1 > /proc/net/sfp
set_sfp_active

while :; do
    link_changed=$(awk -F: '/retimer updated/ { print $3}' /proc/net/sfp)
	link_changed_gbox=$(cat ${SFP_LINK_MON_HANDLE})
    if ! grep -q 'not found' /proc/net/sfp; then

        state_8p8c=$(vppctl show int ${IF_8P8C} | awk '/'"${IF_8P8C}"'/ { print $3 }')

            if [[ $link_changed -eq 1 || "$link_changed_gbox" -eq "1" ]]; then
                logger -st "${MODULE}" "SFP changed rate"
                vppctl set int state ${IF_SFP} down
                vppctl set int state ${IF_SFP} up
                if [ "${state_8p8c}" == "up" ]; then
                    vppctl set int state ${IF_8P8C} down
                fi
            fi
            state_sfp=$(vppctl show int ${IF_SFP} | awk '/'"${IF_SFP}"'/ { print $3 }')

            if grep -q 'signal: detected' /proc/net/sfp; then
                if [ "${state_sfp}" == "down" ]; then
                    logger -st "${MODULE}" "set SFP as active"
                    set_sfp_active
                fi
            else
                if [ "${state_sfp}" == "up" ]; then
                    logger -st "${MODULE}" "SFP signal error, set 8P8C as active"
                    set_8p8c_active
                fi
            fi
    else
        if vppctl show int ${IF_8P8C} | awk '/'"${IF_8P8C}"'/ { print $3 }' | grep -q down; then
            logger -st "{MODULE}" "8P8C set as active"
            set_8p8c_active
        fi

    fi
    sleep 1
done

