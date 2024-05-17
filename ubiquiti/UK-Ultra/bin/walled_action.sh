#!/bin/sh

# skip models without ebtables
if ! command -v ebtables >/dev/null 2>&1; then
    return
fi

if [ $# -ne 2 ]; then
    echo "setup ebtables chains to restrict or allow sites. Need exact two files as params"
    echo "example usage: (either file or both files can be non-existing or empty)."
    echo "   $0 /tmp/allowed.1.txt /tmp/restricted.1.txt"
    exit
fi
#set -x

allowed_in=ALLOWED_DOMAIN_IN
allowed_out=ALLOWED_DOMAIN_OUT
restricted_in=RESTRICTED_DOMAIN_IN

sites_allowed=$1
sites_restricted=$2

# flush all 3 chains
ebtables -t nat -F ${allowed_in}
ebtables -t nat -F ${allowed_out}
ebtables -t nat -F ${restricted_in}

if [ -f ${sites_allowed} ]; then
    ip_compl_list=""
    # run twice so we don't miss any ip, note {1..2} is not supported on AP
    for i in 1 2; do
        while read -r site; do
            [ -z "$site" ] && continue
            nslookup ${site} >> /dev/null
            if [ $? -ne 0 ]; then
                echo "nslookup failed: ${site}" >> /tmp/walled_action.log
                continue
            fi
            ip_list=$(nslookup ${site} | awk '/Name:/{n=1;next}n' | awk '/^Address/{gsub(/Address ([0-9]+):/,""); print $1}' | grep -Eo '[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}')
            for ip in ${ip_list}; do
                echo ${ip_compl_list} | grep -e ${ip}\$ -o -e "${ip} " > /dev/null
                 [ $? -eq 0 ] || ip_compl_list="${ip_compl_list} ${ip}"
            done
        done < "${sites_allowed}"
    done
    for ip in ${ip_compl_list}; do
        ebtables -t nat -A ${allowed_in} -p IPv4 --ip-dst ${ip} -j ACCEPT
        ebtables -t nat -A ${allowed_out} -p IPv4 --ip-src ${ip} -j ACCEPT
    done
fi

if [ -f ${sites_restricted} ]; then
    ip_compl_list=""
    for i in 1 2; do
        while read -r site; do
            [ -z "$site" ] && continue
            nslookup ${site} >> /dev/null
            if [ $? -ne 0 ]; then
                echo "nslookup failed: ${site}" >> /tmp/walled_action.log
                continue
            fi
            ip_list=$(nslookup ${site} | awk '/Name:/{n=1;next}n' | awk '/^Address/{gsub(/Address ([0-9]+):/,""); print $1}' | grep -Eo '[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}')
            for ip in ${ip_list}; do
                echo ${ip_compl_list} | grep -e ${ip}\$ -o -e "${ip} " > /dev/null
                [ $? -eq 0 ] || ip_compl_list="${ip_compl_list} ${ip}"
            done
        done < "${sites_restricted}"
    done
    for ip in ${ip_compl_list}; do
        ebtables -t nat -A ${restricted_in} -p IPv4 --ip-dst ${ip} -j DROP
    done
fi
