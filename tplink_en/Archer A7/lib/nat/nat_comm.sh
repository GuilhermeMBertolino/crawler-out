# Copyight(c) 2011-2013 Shenzhen TP-LINK Technologies Co.Ltd.
# file     nat_comm.sh
# bief    
# autho   Guo Dongxian
# vesion  1.0.0
# date     26Feb14
# history   arg 1.0.0, 26Feb14, Guo Dongxian, Ceate the file

nat_true=0
nat_false=1

nat_ip_reg="((([0-9]{1,2})|(1[0-9]{2,2})|(2[0-4][0-9])|(25[0-5]))\.){3,3}(([0-9]{1,2})|(1[0-9]{2,2})|(2[0-4][0-9])|(25[0-5]))"

#config_load "network" # Load network config

nat_integer() 
{
    [ -n "$(echo $1|sed -n "/^[0-9]\+$/p")" ] && return $nat_true
    
    return $nat_false
}

nat_port() 
{
    nat_integer $1 && [ $1 -ge 1 -a $1 -le 65535 ] && {
        return $nat_true
    }

    return $nat_false
}

nat_check_mod() 
{
    config_load "nat"

    config_get nat_order "nat" "norder"    
    config_get nat_zone_order "nat" "nzorder"

    list_contains nat_order $1 || list_contains nat_zone_order $1 || return 1
    
    [ "$1" == "vs" -o "$1" == "pt" ] && return 1

    config_clear

    return 0
}

# Remote management nat rule which can converts the webserver port
NAT_HTTP_DFT_PORT=80
nat_http_param_to_rule()
{
    local param="$1"
    local ip=
    local port=

    http_rule=""

    if [ -z "$param" ]; then
        http_rule=""
    else
        for p in $param; do
            local res=$(echo "$p"|grep -Eo "$nat_ip_reg")
            [ -n "$res" ] && {
                ip=$res            
            }
            res=$(echo "$p"|grep -o "[0-9]\+")
            [ -n "$res" ] && {
                port=$res
            }             
        done
    fi

    [ -n "$ip" -a -n "$port" ] && {
        if [ "$ip" == "0.0.0.0" ]; then
            http_rule="-s 255.255.255.255/32"
        else
            fw flush 4 n "prerouting_rule_http"
            local ifaces="mobile internet wan"
            local wan_ip=
            for i in $ifaces; do
                wan_ip=""
                network_get_ipaddr wan_ip "$i"
            
                [ -n "$wan_ip" -a "$wan_ip" != "0.0.0.0" ] && {
                    fw add 4 n "prerouting_rule_http" "DNAT" "$" { "-d ${wan_ip}/32 -p tcp -m tcp --dport $port --to-destination ${wan_ip}:${NAT_HTTP_DFT_PORT}" }
                }
            done
        fi
    }

    echo "$http_rule"
}

nat_http_target()
{
    if [ -z "$1" ]; then
        echo "ACCEPT"
    else
        case "$1" in
            "-s 255.255.255.255/32") echo "ACCEPT" ;;
            *) echo "DNAT" ;;
        esac
    fi
}

NAT_HTTPS_DFT_PORT=443
nat_https_param_to_rule()
{
    local param="$1"
    local ip=
    local port=

    https_rule=""

    if [ -z "$param" ]; then
        https_rule=""
    else
        for p in $param; do
            local res=$(echo "$p"|grep -Eo "$nat_ip_reg")
            [ -n "$res" ] && {
                ip=$res            
            }
            res=$(echo "$p"|grep -o "[0-9]\+")
            [ -n "$res" ] && {
                port=$res
            }             
        done
    fi

    [ -n "$ip" -a -n "$port" ] && {
        if [ "$ip" == "0.0.0.0" ]; then
            https_rule="-s 255.255.255.255/32"
        else
            fw flush 4 n "prerouting_rule_https"
            local ifaces="mobile internet wan"
            local wan_ip=
            for i in $ifaces; do
                wan_ip=""
                network_get_ipaddr wan_ip "$i"
            
                [ -n "$wan_ip" -a "$wan_ip" != "0.0.0.0" ] && {
                    fw add 4 n "prerouting_rule_https" "DNAT" "$" { "-d ${wan_ip}/32 -p tcp -m tcp --dport $port --to-destination ${wan_ip}:${NAT_HTTPS_DFT_PORT}" }
                }
            done
        fi
    }

    echo "$https_rule"
}

nat_https_target()
{
    if [ -z "$1" ]; then
        echo "ACCEPT"
    else
        case "$1" in
            "-s 255.255.255.255/32") echo "ACCEPT" ;;
            *) echo "DNAT" ;;
        esac
    fi
}


# DNS proxy nat rule which converts to dns server ip address
nat_dns_param_to_rule()
{
    local param="$1"
    local lan_addr
    local dns_server
	local protocol

    dnsproxy_rule=''
    if [ -z "$param" ]; then
        dnsproxy_rule=""  
    else
		protocol=${param%% *}
        lan_addr=${param% *}
		lan_addr=${lan_addr#* }
        dns_server=${param##* }
        
        if [ -z "$lan_addr" -o "$lan_addr" = "0.0.0.0" -o -z "$dns_server" -o "$dns_server" = "0.0.0.0" -o -z "$protocol" ]
        then
            dnsproxy_rule=""
        else
            dnsproxy_rule="-d ${lan_addr}/32 -p $protocol -m $protocol --dport 53 --to-destination $dns_server"
        fi
    fi

    echo "$dnsproxy_rule"
}

nat_dns_target()
{
    echo "DNAT"
}

# FTP Server nat rule which accept the request of dut ftp server, nat table do not convert it
# The nat rule maybe contain multi-rules, so it will create rule one by one by fw command
# Return null, it means that don't need to create rule by nat command
NAT_FTP_SERVER_PORT=21
nat_ftp_param_to_rule()
{
    local param="$1"
    local ftp_ctl_port=
    local ftp_data_port="50000:60000"
    local interfaces="internet wan mobile"

    nat_port $param && ftp_ctl_port=$param

    ftpsvr_rule=''
    if [ -z "$param" ]; then
        ftpsvr_rule=""
    else
        fw flush 4 n prerouting_rule_ftp
        for iface in $interfaces; do
            local wan_ip
            network_get_ipaddr wan_ip "$iface"

            [ -n "$wan_ip" -a "$wan_ip" != "0.0.0.0" -a -n "$ftp_ctl_port" ] && {
                fw add 4 n prerouting_rule_ftp DNAT $ { "-d ${wan_ip}/32 -p tcp -m tcp --dport $ftp_ctl_port --to-destination ${wan_ip}:$NAT_FTP_SERVER_PORT" }
                fw add 4 n prerouting_rule_ftp ACCEPT $ { "-d ${wan_ip}/32 -p tcp -m tcp --dport $ftp_data_port" }
            }
        done
    fi

    echo "$ftpsvr_rule"
}

nat_ftp_target()
{
    echo "REDIRECT"
}

