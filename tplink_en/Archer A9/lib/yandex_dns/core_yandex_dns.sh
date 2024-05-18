# Copyright (C) 2009-2010 OpenWrt.org


fw_config_get_global(){
    fw_config_get_section "$1" global { \
        string enable       "off" \
        string mode  "basic" \
    } || return   
}

fw_config_get_device(){
    fw_config_get_section "$1" device { \
        string mode             "" \
        string mac              "" \
        string note             "" \
    } || return
}

fw_load_yandex_dns(){
    fw_config_once fw_load_global global    
}

fw_exit_yandex_dns(){

    fw flush 4 n PREROUTING_YANDEXDNS
  
    local rule_udp="-i br-lan -p udp -m udp --dports 53"
    local jump

    case $global_mode in
	basic)
	    jump="DNAT --to-destination 77.88.8.8";;
        safe)
	    jump="DNAT --to-destination 77.88.8.88";;
	home)
	    jump="DNAT --to-destination 77.88.8.7";;
	*)
	    echo "filter mode is wrong" || exit;; 
    esac

    fw s_del 4 n PREROUTING_YANDEXDNS "$jump" { "$rule_udp" }

    fw del 4 n PREROUTING_YANDEXDNS
}

fw_load_global() {
    fw_config_get_global "$1"

    # tcp 53也是合法的dns报文
    local rule_udp="-i br-lan -p udp -m udp --dport 53"
    local jump

    fw add 4 f FORWARD_YANDEXDNS

    fw add 4 n PREROUTING_YANDEXDNS
    fw s_add 4 n PREROUTING PREROUTING_YANDEXDNS 1

    if [[ "$global_enable" == "on" ]]; then
        # fw "<command>" "<family>" "<table>" "<chain>" "<target>" "{" "<rules>" "}"
        case $global_mode in
	basic)
	    jump="DNAT --to-destination 77.88.8.8";;
        safe)
	    jump="DNAT --to-destination 77.88.8.88";;
	child)
	    jump="DNAT --to-destination 77.88.8.7";;
	*)
	    echo "filter mode is wrong" || exit;;
	esac

        fw s_add 4 n PREROUTING_YANDEXDNS "$jump" { "$rule_udp" }

        config_foreach fw_load_device device
        conntrack -F
        syslog $LOG_NTC_FLUSH_CT_SUCCESS
        syslog $LOG_INF_FUNCTION_ENABLE
    else
        syslog $LOG_INF_FUNCTION_DISABLE
    fi
}

fw_load_device() {
    fw_config_get_device "$1"
    local mac=$(echo $device_mac | tr [a-z] [A-Z])
    local jump

    case $device_mode in
    basic)
	jump="DNAT --to-destination 77.88.8.8";;
    safe)
	jump="DNAT --to-destination 77.88.8.88";;
    child)
	jump="DNAT --to-destination 77.88.8.7";;
    *)
	echo "filter mode is wrong" || exit;;
    esac
    fw s_add 4 n PREROUTING_YANDEXDNS "$jump" 1 { "-i br-lan -p udp -m udp --dport 53 -m mac --mac-source ${mac//-/:}" }
}
