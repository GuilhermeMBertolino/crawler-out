#!/bin/sh

add_iptable_global_reject(){

	local found

	found=$( /usr/sbin/iptables --list INPUT | grep -e "REJECT.*tcp.*dpt:20001.*reject-with.*tcp-reset" | wc -l)

	if [ "$found" -eq "0" ]; then
		echo [add] /usr/sbin/iptables -I INPUT 1 -p tcp --dport 20001 -j REJECT --reject-with tcp-reset
		/usr/sbin/iptables -I INPUT 1 -p tcp --dport 20001 -j REJECT --reject-with tcp-reset
		/usr/sbin/ip6tables -I INPUT 1 -p tcp --dport 20001 -j REJECT --reject-with tcp-reset
	fi
}

remove_iptable_global_reject(){
	local found
	local client_ip_list

	client_ip_list=$( iptables --list INPUT | grep -e "ACCEPT.*tcp.*dpt:20001" | awk '{print $4}')

	for client_ip in $client_ip_list
	do	
		echo [remove] /usr/sbin/iptables -D INPUT -s $client_ip -p tcp --dport 20001 -j ACCEPT
		/usr/sbin/iptables -D INPUT -s $client_ip -p tcp --dport 20001 -j ACCEPT
	done

	found=$( /usr/sbin/iptables --list INPUT | grep -e "REJECT.*tcp.*dpt:20001.*reject-with.*tcp-reset" | wc -l)

	if [ "$found" -ne "0" ]; then
		echo [remove] /usr/sbin/iptables -D INPUT -p tcp --dport 20001 -j REJECT --reject-with tcp-reset
		/usr/sbin/iptables -D INPUT -p tcp --dport 20001 -j REJECT --reject-with tcp-reset
	fi
}

add_iptable_client_accept(){
	local client_ip
	local found

	client_ip="$1"
	found=$( /usr/sbin/iptables --list-rules INPUT | grep -e ".*$client_ip/.*tcp.*dport 20001" | wc -l)

	if [ "$found" -eq "0" ]; then
		echo [add] /usr/sbin/iptables -I INPUT 1 -s $client_ip -p tcp --dport 20001 -j ACCEPT
		/usr/sbin/iptables -I INPUT 1 -s $client_ip -p tcp --dport 20001 -j ACCEPT
	fi
}

remove_iptable_client_accept(){
	local client_ip
	local found

	client_ip="$1"
	found=$( /usr/sbin/iptables --list-rules INPUT | grep -e ".*$client_ip/.*tcp.*dport 20001" | wc -l)

	if [ "$found" -ne "0" ]; then
		echo [add] /usr/sbin/iptables -I INPUT 1 -s $client_ip -p tcp --dport 20001 -j ACCEPT
		/usr/sbin/iptables -D INPUT -s $client_ip -p tcp --dport 20001 -j ACCEPT
	fi
}

remove_iptable_all_client_accept(){
	local found
	local client_ip_list

	client_ip_list=$( iptables --list INPUT | grep -e "ACCEPT.*tcp.*dpt:20001" | awk '{print $4}')

	for client_ip in $client_ip_list
	do	
		echo [remove] /usr/sbin/iptables -D INPUT -s $client_ip -p tcp --dport 20001 -j ACCEPT
		/usr/sbin/iptables -D INPUT -s $client_ip -p tcp --dport 20001 -j ACCEPT
	done
}

# the script is only for SG
local country=`getfirm COUNTRY`
if [ "$country" != "SG" ]; then
	return
fi

case "$1" in
	start) add_iptable_global_reject;;
	stop) remove_iptable_global_reject;;
	add) add_iptable_client_accept $2;;
	remove) remove_iptable_client_accept $2;;
	remove_all) remove_iptable_all_client_accept;;
	restart) remove_iptable_global_reject; add_iptable_global_reject;;
	*) echo "[error] Undefined function.";;
esac
