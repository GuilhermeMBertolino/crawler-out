#!/bin/sh
BDPATH=/opt/bitdefender
BDNC_PATH=$BDPATH/etc/bdnc.ini
START=0

stop_services_if_running(){
if [ "$(pidof procd)" == "" ]
        then        
                $BDPATH/bin/bd stop > /dev/null 2>&1
                START=1
        else
                $BDPATH/bin/bd_procd stop > /dev/null 2>&1
                START=1               
fi
}

start_if_needed(){
if [ $START -eq "1" ] 
        then
        if [ "$(pidof procd)" == "" ]
                then        
                        $BDPATH/bin/bd start > /dev/null 2>&1
                else
                        $BDPATH/bin/bd_procd start > /dev/null 2>&1
        fi    
fi
}

get_server(){
        case "$(LD_LIBRARY_PATH=/opt/bitdefender/lib /opt/bitdefender/bin/bdsett -get-key /nimbus/entrypoints/default)" in 
        "nimbus.bitdefender.net")
                echo "Production server"
                ;;
        "beta.nimbus.bitdefender.net")
                echo "QA server"
                ;;
        *)
                echo "Unknown server"
                ;;
        esac
}

set_server(){
if [ $1 = "production" ]; then
        LD_LIBRARY_PATH=/opt/bitdefender/lib /opt/bitdefender/bin/bdsett -set-key /nimbus/entrypoints/default -to-string nimbus.bitdefender.net
        stop_services_if_running
        echo "Changed config file to use production server"
        start_if_needed
elif [ $1 = "qa" ]; then
        LD_LIBRARY_PATH=/opt/bitdefender/lib /opt/bitdefender/bin/bdsett -set-key /nimbus/entrypoints/default -to-string beta.nimbus.bitdefender.net
        stop_services_if_running
        echo "Changed config file to use QA server"
        start_if_needed
else
        echo "Invalid command"
fi
}

if [ -z "$1" ]; then
        echo "Usage:"
        echo "  set_server <qa/production>      -> configures agent to use specified server"
        echo "  get_server                      -> returns the value of the server that is in use"
else

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
