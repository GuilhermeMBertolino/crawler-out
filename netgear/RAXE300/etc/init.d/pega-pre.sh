#!/bin/sh

case "$1" in
    start)
        echo "PEGA pre initial..."
        # Create rabin directory for router analytics
        if [ ! -d "/data/rabin" ]; then
            mkdir /data/rabin
        fi
        # Copy RAE binary and policy to /data/rabin/
        if [ ! -f "/data/rabin/ntgr_ra_iot" ]; then
            echo "Copy RAE binary file to /data/rabin/"
            cp /etc/ntgr_ra_iot /data/rabin/
            chmod +x /data/rabin/ntgr_ra_iot
        fi
        if [ ! -f "/data/rabin/raePolicy.json" ]; then
            echo "Copy RAE default policy to /data/rabin/"
            cp /etc/raePolicy.json /data/rabin/
        fi
        if [ ! -f "/data/rabin/ra_nvram" ]; then
            echo "generate default ra nvram"
            /bin/ra_nvram restore
        fi
        if [ ! -f "/tmp/ra_nvram_run" ]; then
            echo "generate ra_nvram_run"
            /bin/ra_nvram init
        fi

        # The RA_enable will not have any value when upgrade from
        # no opt-in/opt-out support to opt-in/opt-out supported.
        # Then by default WW and GR sku RA_enable is 0, other sku RA_enable is 1.
        RA_enable=`ra_nvram get RA_enable`
        if [ -z "$RA_enable" ]; then
            sku=`cat /proc/environment/sku`
            if [ $sku == "WW" ] || [ $sku == "GR" ]; then
                ra_nvram set RA_enable=0
            else
                ra_nvram set RA_enable=1
            fi
        fi

        # KKHuang: Create for RA Event
        if [ ! -d "/data/event_ra_flash" ]; then
            mkdir /data/event_ra_flash
        fi

	#JYang, enable RA debug log by default
	touch /data/rabin/enable_ra_log

        #KKHuang, Netgear SPC
        if [ -f "/etc/ntgr_spc_config.ini" ]; then
            echo "Checking Netgear SPC..."
            /usr/bin/configure_spc.sh
        fi

        # Ian: Disable all ipv6 to avoid send LAN Mac icmpv6 packet on boot
        echo 1 > /proc/sys/net/ipv6/conf/eth0/disable_ipv6
        echo 1 > /proc/sys/net/ipv6/conf/eth1/disable_ipv6
        echo 1 > /proc/sys/net/ipv6/conf/eth2/disable_ipv6
        echo 1 > /proc/sys/net/ipv6/conf/eth3/disable_ipv6
        echo 1 > /proc/sys/net/ipv6/conf/eth4/disable_ipv6
        echo 1 > /proc/sys/net/ipv6/conf/eth5/disable_ipv6

        # KKHuang: Disable bridge-nf-call-ip6tables to make IPv6 Passthrough workable
        echo 0 > /proc/sys/net/bridge/bridge-nf-call-ip6tables

        # Run ledSer
        echo "======== Run ledSer...==========="
        /etc/init.d/ledInit.sh > /dev/null 2>&1 &
        #/bin/ledSer > /dev/null 2>&1 &
        #sleep 2
        #ledCli POR MSG_LED_POWER_ON_ING; sleep 1
        #ledCli WAN MSG_LED_WAN_OFF; sleep 1
        #ledCli ALLSW MSG_LED_ALL_SW_OFF; sleep 1

        # To fix rex and rax naming issues
        if [ ! -f "/data/.cert/client_win/rax-client.crt" ]; then
            rm -rf /data/.cert
        fi

        if [ -f "/data/.cert/genkey-done" ]; then
            CHK_KEY_DONE=`cat /data/.cert/genkey-done | head -n 1`
            CHK_KEY=`tail -n 2 /data/.cert/keys/server/ta.key | head -n 1`

            echo "Check Openvpn Key ...."
            echo "CHK_KEY_DONE : "${CHK_KEY_DONE}
            echo "CHK_KEY      : "${CHK_KEY}

            if [ ! "${CHK_KEY_DONE}" == "${CHK_KEY}" ]; then
                echo "Check Openvpn Key error, Regenkey again."
                rm -rf /data/.cert
            fi
        else
            rm -rf /data/.cert
        fi

        if [ ! -d "/data/.cert" ]; then
            echo "Start to gen Openvpn Key."
            /usr/sbin/genkey.sh > /dev/null 2>&1 &
        fi

        # Create iqos directory and default qos.conf after restore default.
        if [ ! -d "/data/iqos" ]; then
            mkdir -p /data/iqos
            cp -f /usr/sbin/qos.conf /data/iqos/
        fi

        exit 0
        ;;

    stop)
        echo "Unconfig PEGA pre initial not implemented..."
        exit 1
        ;;

    *)
        echo "$0: unrecognized option $1"
        exit 1
        ;;

    esac

