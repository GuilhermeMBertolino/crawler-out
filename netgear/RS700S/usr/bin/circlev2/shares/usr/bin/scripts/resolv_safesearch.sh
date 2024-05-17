#!/bin/sh

#uncomment this for local testing
#CIRCLE_TMP=/tmp

if [ -z $CIRCLE_TMP ]; then
        echo "env variable CIRCLE_TMP not set"
        exit 1
fi

HOSTS=$CIRCLE_TMP/circle_hosts
CIRCLE_RUNNING_FLAG=$CIRCLE_TMP/status/circle_running

removehost() {
        HOSTNAME=$1
        if [ -n "$(grep -q $HOSTNAME $HOSTS)" ] ; then
                echo "$HOSTNAME Found in file $HOSTS, Removing now...";
                sed -i "/$HOSTNAME/d" $HOSTS
        else
                echo "$HOSTNAME was not found in your $HOSTS";
        fi
}

addhost() {
        HOSTNAME=$1
        IP=$2
        HOSTS_LINE="$IP $HOSTNAME"
        if [ -n "$(grep -q $IP $HOSTS)" ]; then
                echo "$IP already exists : $(grep -q $IP $HOSTS)"
        else
                echo "Adding $IP to file $HOSTS";
                echo "$HOSTS_LINE" >> $HOSTS;

                if [ -n "$(grep $IP $HOSTS)" ]; then
                        echo "$IP was added succesfully, $(grep -q $IP $HOSTS)";
                else
                        echo "Failed to Add $IP, Try again!";
                fi
        fi
}

containsElement() {
        local e match="$1"
        shift
        for e; do [ "$e" = "$match" ] && return 1; done
        return 0
}

is_ipv4() {
	ip=$1
	ipreg="^([0-9]{1,3})[.]([0-9]{1,3})[.]([0-9]{1,3})[.]([0-9]{1,3})$"
	#echo "checking ip address: $ip"
	echo $ip | grep -Eq $ipreg
	result=$?
	#echo $result
	if [ $result -eq 0 ]; then
	#       echo "Successed"
	        return 0
	else
	#       echo "Failed"
		return 1
	fi
}

SAFE_SEARCH_RESOLVE_RESULTS=/tmp/safe_search_resolve_results
SAFE_SEARCH_HOSTS=/tmp/safe_search_hosts
ss_hosts="safe.duckduckgo.com forcesafesearch.google.com restrictmoderate.youtube.com strict.bing.com"
host_count=`echo $ss_hosts | wc -w`
dns="8.8.8.8"
# resolve safe.duckduckgo.com
if [ -f $SAFE_SEARCH_RESOLVE_RESULTS ]; then
        rm $SAFE_SEARCH_RESOLVE_RESULTS
fi
touch $SAFE_SEARCH_RESOLVE_RESULTS

for host in $ss_hosts; do
	echo "ss_host: $host" >> $SAFE_SEARCH_RESOLVE_RESULTS
	nslookup -q=A $host $dns >> $SAFE_SEARCH_RESOLVE_RESULTS
	echo "ss_host: $host" >> $SAFE_SEARCH_RESOLVE_RESULTS
	nslookup -q=AAAA $host $dns >> $SAFE_SEARCH_RESOLVE_RESULTS
done

if [ ! -f $SAFE_SEARCH_HOSTS ]; then
        touch $SAFE_SEARCH_HOSTS
else
	rm $SAFE_SEARCH_HOSTS
	touch $SAFE_SEARCH_HOSTS
fi

while read -r line; do
        found_name=0
        if echo $line | grep -q "ss_host:"; then
                name=$(echo $line | cut -d ' ' -f 2)
		address=""
        fi
        if echo $line | grep -q $dns; then
                continue
        fi
        #some shell contains "Address:", and some contains "Address 1:"
        if echo $line | grep -q "Address "; then
                address=$(echo $line | cut -d ' ' -f 3)
		if [ -z $address ]; then
			continue
		fi
                echo $address $name >> $SAFE_SEARCH_HOSTS
        fi
        if echo $line | grep -q "Address:"; then
                address=$(echo $line | cut -d ' ' -f 2)
		if [ -z $address ]; then
			continue
		fi
                echo $address $name >> $SAFE_SEARCH_HOSTS
        fi
	if echo $line | grep -q "AAAA address"; then
		address=$(echo $line | cut -d ' ' -f 5)
		if [ -z $address ]; then
			continue
		fi
		echo $address $name >> $SAFE_SEARCH_HOSTS
	fi
done < $SAFE_SEARCH_RESOLVE_RESULTS

file_size=0
# get file size
[ -s $SAFE_SEARCH_HOSTS ] && {
        file_size=$(ls -al /tmp | grep $SAFE_SEARCH_HOSTS | tr -s " " | cut -d ' ' -f 5)
}

# check file size
echo "check output file... $file_size "
if [ $((file_size)) -lt 0 ]; then
        echo "no safe search server resolved, quit..."
        exit 1
fi

#compose new hosts file
#echo "checking ip addresses..."
echo "127.0.0.1 localhost" > $HOSTS.new
echo "0.0.0.0 null.meetcircle.co" >> $HOSTS.new
echo "fd22:9464:dfb8::1 device.meetcircle.co" >> $HOSTS.new
echo "10.123.234.1 device.meetcircle.co" >> $HOSTS.new
echo "10.123.234.1 meetcircle.local" >> $HOSTS.new
ipv4_count=0
while read -r line; do
        address=$(echo $line | cut -d ' ' -f 1)
        host=$(echo $line | cut -d ' ' -f 2)
        if containsElement $hosts $line; then
		if [ -n $address ]; then
			echo $line >> $HOSTS.new
		fi
		if is_ipv4 $address ; then
			ipv4_count=$(($ipv4_count+1))
		fi
        fi
done < $SAFE_SEARCH_HOSTS
echo "ipv4 addresses: $ipv4_count, host count: $host_count"
if [ $ipv4_count -lt $host_count ]; then
	echo "missing ipv4, ipv4 addr count: $ipv4_count"
	exit 1
fi

cp $HOSTS.new $HOSTS

# restart dnsmasq service
[ -f $CIRCLE_RUNNING_FLAG ] && [ -d /var/service/dnsmasq ] && {
	${CIRCLE_ROOT}/sv restart dnsmasq
}
