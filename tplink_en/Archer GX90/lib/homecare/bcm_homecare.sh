#!/bin/sh /etc/rc.common

accel_support_enable() {
    # only for bcm fcache now
    [ -e /proc/fcache/ ] && {
        # modify cpu affinity
        if [[ x"$(uci_get_state system system homecare)" != x"enable" ]]; then
            uci_revert_state system system homecare
            uci_set_state system system homecare "enable"
            if [[ -f /etc/init.d/bcm_cpu_affinity ]]; then
                /etc/init.d/bcm_cpu_affinity start
            fi
        fi    
    }
}

accel_support_disable() {
    # only for bcm fcache now
    [ -e /proc/fcache/ ] && {
        # modify cpu affinity
        if [[ x"$(uci_get_state system system homecare)" = x"enable" ]]; then
            uci_revert_state system system homecare
            if [[ -f /etc/init.d/bcm_cpu_affinity ]]; then
                /etc/init.d/bcm_cpu_affinity start
            fi
        fi
    }
}

start() {
	fc config --hw-iqos-accel 0
	fc flush
	accel_support_enable
}

stop() {
	fc config --hw-iqos-accel 1
	fc flush
	accel_support_disable
}