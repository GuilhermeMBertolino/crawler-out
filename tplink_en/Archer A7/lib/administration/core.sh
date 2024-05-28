# Copyright (C) 2009-2010 OpenWrt.org

syslog() {
    local log_id=$2
    local model_id=$1
    shift
    logx -p $$ $model_id $log_id "$@"
}

add_device() {
    local lenable
    local lmac
    config_get lenable $1 enable "off"
    config_get lmac $1 mac "0"

    # Process firewall rule for each device.
    if [ $lenable == 'on' ]; then
        if [ $lmac != '0' ]; then
            fw add_local_mgnt $lmac
            echo fw add_local_mgnt $lmac
        fi
    fi
}

del_device() {
    local lenable
    local lmac
    config_get lenable $1 enable "off"
    config_get lmac $1 mac "0"

    # Process firewall rule for each device.
    if [ $lenable == 'on' ]; then
        if [ $lmac != '0' ]; then
            fw del_local_mgnt $lmac
            echo fw del_local_mgnt $lmac
        fi
    fi
}

start_without_https() {
    echo "loading without https"

    config_load 'administration'

    # Local management, getting config.
    local lmode
    config_get lmode 'local' mode 'all'

    # Process the local management firewall rules.
    if [ "$lmode" == 'all' ]; then
        fw unload_local_mgnt
        echo fw unload_local_mgnt
    elif [ "$lmode" == 'partial' ]; then
        fw load_local_mgnt
        echo fw load_local_mgnt
        config_foreach add_device device
    fi

    # Remote management, getting config.
    local lenable
    local lport
    local lip
    config_get lenable 'remote' enable 'off'
    config_get lport 'remote' port '80'
    config_get lip 'remote' ipaddr '0.0.0.0'

    # Process the remote management firewall rules.
    if [ "$lenable" != "off" ]; then
        syslog 282 504
        if [ "$lenable" == "all" ]; then
            fw add_remote_mgnt port "$lport"
            echo fw add_remote_mgnt port "$lport" 
            nat add http { 255.255.255.255 "$lport" }
            echo nat add http { 255.255.255.255 "$lport" }
        elif [ "$lenable" == "partial" ]; then
            fw add_remote_mgnt port "$lport" ip "$lip"
            echo fw add_remote_mgnt port "$lport" ip "$lip"
            nat add http { "$lip" "$lport" }
            echo nat add http { "$lip" "$lport" }
        fi       
    else
        fw del_remote_mgnt port 80
    fi
}

stop_without_https() {
    echo "stopping without https"

    config_load 'administration'

    # Unload the local management firewall rules.
    fw unload_local_mgnt
    echo fw unload_local_mgnt
    config_foreach del_device device

    local lenable
    local lport
    local lip
    config_get lenable 'remote' enable 'off'
    config_get lport 'remote' port '80'
    config_get lip 'remote' ipaddr '0.0.0.0'

    # Unload the remote management firewall rules.
    if [ "$lenable" == "all" ]; then
        fw del_remote_mgnt port "$lport" 
        echo fw del_remote_mgnt port "$lport"
    elif [ "$lenable" == "partial" ]; then
        fw del_remote_mgnt port "$lport" ip "$lip"
        echo fw del_remote_mgnt port "$lport" ip "$lip"
    fi
    syslog 282 505
    nat del http
    echo nat del http
}

start_with_https() {
    echo "loading with https"

    config_load 'administration'

    # Local management, getting config.
    local lmode
    local lhttps_enable
    config_get lmode 'local' mode 'all'
    config_get lhttps_enable 'local' https_enable 'off'

    # Process the local management firewall rules.
    if [ "$lmode" == 'all' ]; then
        fw unload_local_mgnt
        echo fw unload_local_mgnt
    elif [ "$lmode" == 'partial' ]; then
        fw load_local_mgnt
        echo fw load_local_mgnt
        config_foreach add_device device
    fi
    
    # block local https access, move to uhttpd
    #if [ "$lhttps_enable" == "off" ]; then
    #	fw add_local_https
    #	echo fw add_local_https
    #fi

    # Remote management, getting config.
    local lenable
    local lport
    local lsport
    local lip
    config_get lenable 'remote' enable 'off'
    config_get lport 'remote' port '80'
    config_get lsport 'remote' https_port '433'
    config_get lip 'remote' ipaddr '0.0.0.0'

    # Process the remote management firewall rules.
    if [ "$lenable" != "off" ]; then
        syslog 282 504
        if [ "$lenable" == "all" ]; then
            fw add_remote_mgnt_with_https http_port "$lport" https_port "$lsport"
            echo fw add_remote_mgnt_with_https http_port "$lport" https_port "$lsport"
            nat add http { 255.255.255.255 "$lport" }
            echo nat add http { 255.255.255.255 "$lport" }
            nat add https { 255.255.255.255 "$lsport" }
            echo nat add https { 255.255.255.255 "$lsport" }
        elif [ "$lenable" == "partial" ]; then
            fw add_remote_mgnt_with_https http_port "$lport" https_port "$lsport" ip "$lip"
            echo fw add_remote_mgnt_with_https http_port "$lport" https_port "$lsport" ip "$lip"
            nat add http { "$lip" "$lport" }
            echo nat add http { "$lip" "$lport" }
            nat add https { "$lip" "$lsport" }
            echo nat add https { "$lip" "$lsport" }
        fi       
    else
        fw del_remote_mgnt_with_https http_port 80 https_port 433
    fi
}

stop_with_https() {
    echo "stopping with https"

    config_load 'administration'

    # Unload the local management firewall rules.
    fw unload_local_mgnt
    echo fw unload_local_mgnt
    config_foreach del_device device

	# Local https 
    #local lhttps_enable    
    #config_get lhttps_enable 'local' https_enable 'off'
    
    # unblock local https access, move to uhttpd
    #if [ "$lhttps_enable" == "off" ]; then
    #	fw del_local_https
    #	echo fw del_local_https
    #fi
    
    local lenable
    local lport
    local lsport
    local lip
    config_get lenable 'remote' enable 'off'
    config_get lport 'remote' port '80'
    config_get lsport 'remote' https_port '443'
    config_get lip 'remote' ipaddr '0.0.0.0'

    # Unload the remote management firewall rules.
    if [ "$lenable" == "all" ]; then
        fw del_remote_mgnt_with_https http_port "$lport" https_port "$lsport" 
        echo fw del_remote_mgnt_with_https http_port "$lport" https_port "$lsport"
    elif [ "$lenable" == "partial" ]; then
        fw del_remote_mgnt_with_https http_port "$lport" https_port "$lsport" ip "$lip"
        echo fw del_remote_mgnt_with_https http_port "$lport" https_port "$lsport" ip "$lip"
    fi
    syslog 282 505
    nat del http
    echo nat del http
    nat del https
    echo nat del https
}

administration_start() {
    echo "loading administration management"

	local https_support="$(uci -c /etc/profile.d get profile.@https_mgnt[0].https_support)"	
    
    if [ "$https_support" == "yes" ]; then
    	start_with_https
    else
    	start_without_https
    fi    
}

administration_stop() {
    echo "stopping administration management"

    local https_support="$(uci -c /etc/profile.d get profile.@https_mgnt[0].https_support)"	
    
    if [ "$https_support" == "yes" ]; then
    	stop_with_https
    else
    	stop_without_https
    fi
}

administration_restart() {
    administration_stop 
    administration_start
}
