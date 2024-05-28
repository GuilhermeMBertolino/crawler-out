# Copyright(c) 2011-2013 Shenzhen TP-LINK Technologies Co.Ltd.
# file     nat_fr6.sh
# brief    
# author   Wu Zexuan
# version  1.0.0
# date     2Apr21
# history  arg 1.0.0, 2Apr21, Wu Zexuan, Create the file

fr6_filter_chains=
nat_config_rule_fr6() {
    nat_config_get_section "$1" rule_fr6 { \
        string name "" \
        string enable "" \
        string port "" \
        string protocol "" \
        string ip "" \
    } || return
}

nat_load_rule_fr6() {
    local proto="all tcp udp"
    echo "nat_load_rule_fr6 in"
    nat_config_rule_fr6 "$1"


    [ -z "$rule_fr6_ip" -o "$rule_fr6_ip" == "::" ] && {
        echo "Host addr is not set"
        return 1
    }

    [ -n "$rule_fr6_protocol" ] && {
        rule_fr6_protocol=$(echo $rule_fr6_protocol|tr '[A-Z]' '[a-z]')
    }

    nat__do_fr6_rule() {
        local proto=$1
    
        [ -z "$rule_fr6_port" ] && return

        for fr6_chain in $fr6_filter_chains; do
            [ -z "$fr6_chain" ] && continue

            local dup=$(fw list 6 f $fr6_chain | grep "\-d $rule_fr6_ip/128 \-p $proto \-m $proto \--dport ${rule_fr6_port} ")
            [ -z "$dup" ] && {
                fw add 6 f ${fr6_chain} ACCEPT $ { -p ${proto} --dport ${rule_fr6_port} -d ${rule_fr6_ip} }
            }
            done
    }

    if [ "$rule_fr6_enable" == "on" ]; then
        #nat_syslog 54 "$rule_fr6_external_port" "$rule_fr6_ip" "$rule_fr6_internal_port" "$rule_fr6_protocol"
        list_contains proto $rule_fr6_protocol && {
            case $rule_fr6_protocol in
                tcp)
                    nat__do_fr6_rule "tcp"
                ;;
                udp)
                    nat__do_fr6_rule "udp"
                ;;
                *)
                    nat__do_fr6_rule "tcp"
                    nat__do_fr6_rule "udp"
                ;;
            esac
        }   
    fi
}

nat_rule_fr6_operation() {
    [ -n "$nat_filter_chains_v6" ] && {
        for fc in $nat_filter_chains_v6; do
            local fr6=$(echo "$fc"|grep 'fr6$')
            [ -n "$fr6" ] && {
                append fr6_filter_chains $fr6
                fw flush 6 f $fr6
            }
        done
    }
    fw flush 6 n ${nat_rule_chains}_${NAT_N_fr6_chain}

    config_foreach nat_load_rule_fr6 rule_fr6
    unset fr6_filter_chains
}

