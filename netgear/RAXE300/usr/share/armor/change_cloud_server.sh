#!/bin/sh
BDPATH=/opt/bitdefender
#BDNC_PATH=$BDPATH/etc/bdnc.ini
BDNC_PATH=$BDPATH/va/self_scan/bdnc.ini
START=0

create_bdnc_qa(){
        cat > /tmp/bdnc.ini <<EOF
BootstrapServer = beta.nimbus.bitdefender.net
CADir = /opt/bitdefender/etc/certs
RandomizeDNSNames = 1
CertificateValidation = true
UseSecureConnection = 1
EOF
}

create_bdnc_prod(){
        cat > /tmp/bdnc.ini <<EOF
BootstrapServer = nimbus.bitdefender.net
CADir = /opt/bitdefender/etc/certs
RandomizeDNSNames = 1
CertificateValidation = true
UseSecureConnection = 1
EOF
}

check_protection_env(){
if [ -h $BDPATH/lib/guster/bdnc/bdnc.ini ]; then
        rm /opt/bitdefender/lib/guster/bdnc/bdnc.ini
        create_bdnc_prod
        mv /tmp/bdnc.ini /opt/bitdefender/lib/guster/bdnc/bdnc.ini
fi

if [ $(grep -c "beta.nimbus.bitdefender.net" $BDPATH/lib/guster/bdnc/bdnc.ini) -eq 1 ]; then
        rm /opt/bitdefender/lib/guster/bdnc/bdnc.ini
        create_bdnc_prod
        mv /tmp/bdnc.ini /opt/bitdefender/lib/guster/bdnc/bdnc.ini
fi
}

stop_services_if_running(){
# pidof guster > /dev/null 2>&1
# if [ $? -eq 0 ]; then
#         $BDPATH/bin/bd stop > /dev/null 2>&1
#         START=1
# fi
        $BDPATH/bin/bd stop > /dev/null 2>&1
        START=1
}

start_if_needed(){
if [ $START -eq "1" ]; then
        $BDPATH/bin/bd start > /dev/null 2>&1
fi
}

get_server(){
grep -Fq "beta.nimbus.bitdefender.net" $BDNC_PATH > /dev/null 2>&1
if [ $? -eq 0  ]
        then
                echo "QA server"
        else
                grep -qF "nimbus.bitdefender.net" $BDNC_PATH > /dev/null 2>&1
                if [ $? -eq 0 ]
                        then
                                echo "Production server"
                        else
                                echo "Unknown server"
                        fi
        fi
}

set_server(){
if [ $1 = "production" ]; then
        stop_services_if_running
        check_protection_env
        rm /opt/bitdefender/etc/bdnc.ini
        create_bdnc_prod
        mv /tmp/bdnc.ini /opt/bitdefender/etc/bdnc.ini
        echo "Changed config file to use production server"
        start_if_needed
elif [ $1 = "qa" ]; then
        stop_services_if_running
        check_protection_env
        rm /opt/bitdefender/etc/bdnc.ini
        create_bdnc_qa
        mv /tmp/bdnc.ini /opt/bitdefender/etc/bdnc.ini
        echo "Changed config file to use QA server"
        start_if_needed
else
        echo "Invalid command"
fi

#<<PEGA JYang, flush flow cache to restart bd service
fc flush
}

if [ -z "$1" ]; then
        echo "Usage:"
        echo "  set_server <qa/production>      -> configures agent to use specified server"
        echo "  get_server                      -> returns the value of the server that is in use"
else
        if [ ! -f  $BDNC_PATH ]; then
                echo "Configuration file does not exist. Please check if path is configured correctly."
                exit 1
        fi
        if [ $1 = "get_server" ]; then
                get_server
        elif [ $1 = "set_server" ]; then
                if [ $2 = "qa" ]; then
                        set_server qa
                elif [ $2 = "production" ]; then
                        set_server production
                else
                        echo "Invalid command"
                fi
        else
                echo "Invalid command"
        fi
fi
