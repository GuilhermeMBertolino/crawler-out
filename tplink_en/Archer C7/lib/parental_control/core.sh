# Copyright (C) 2009-2010 OpenWrt.org

PC_LIBDIR=${PC_LIBDIR:-/lib/parental_control}

include /lib/network
# check firewall
fw_is_loaded() {
    local bool=$(uci_get_state firewall.core.loaded)
    return $((! ${bool:-0}))
}


fw_init() {
    [ -z "$PC_INITIALIZED" ] || return 0

    . $PC_LIBDIR/config.sh

    # export the parental_control config
	fw_config_append client_mgmt
    fw_config_append parental_control_v2

    for file in $PC_LIBDIR/core_*.sh; do
        . $file
    done
    
    PC_INITIALIZED=1
    return 0
}

fw_start() {	
    # make sure firewall is loaded
    fw_is_loaded || {
        echo "firewall is not loaded" >&2
        exit 1
    }

    # check the hook and chains

    # init
    fw_init

    #parental control optimize
    local support_pctl_v2_optimize=$(uci get profile.@parental_control_v2[0].support_pctl_v2_optimize -c "/etc/profile.d" -q)
    if [ "$support_pctl_v2_optimize" = "yes" ]; then
        #The value of parental_control_v2.settings,enable determines whether to turn it on or not
        if [ "$(config_get settings enable)" != "on" ]; then
            exit 1
        fi
    fi

    # ready to load rules from uci config
    echo "loading parental_control"
    fw_load_parental_ctrl 
    syslog $LOG_INF_SERVICE_START
}

fw_stop() {
    # make sure firewall is loaded
    fw_is_loaded || {
        echo "firewall is not loaded" >&2
        exit 1
    }
    # check the hook and chains

    # init
    fw_init

    # ready to exit rules from uci config
    echo "exiting parental_control"
    fw_exit_parental_ctrl
    syslog $LOG_INF_SERVICE_STOP
}

fw_restart() {
    fw_stop
    fw_start
}

fw_reload() {
    fw_restart
}

