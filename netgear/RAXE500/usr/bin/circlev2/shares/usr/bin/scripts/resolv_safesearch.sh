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
        for e; do [[ "$e" == "$match" ]] && return 1; done
        return 0
}
SAFE_SEARCH_RESOLVE_RESULTS=/tmp/safe_search_resolve_results
SAFE_SEARCH_HOSTS=/tmp/safe_search_hosts
ss_hosts="safe.duckduckgo.com forcesafesearch.google.com restrictmoderate.youtube.com strict.bing.com"
dns="8.8.8.8"
# resolve safe.duckduckgo.com
if [ -f $SAFE_SEARCH_RESOLVE_RESULTS ]; then
        rm $SAFE_SEARCH_RESOLVE_RESULTS
fi
touch $SAFE_SEARCH_RESOLVE_RESULTS

for host in $ss_hosts; do
	echo "ss_host: $host" >> $SAFE_SEARCH_RESOLVE_RESULTS
	nslookup $host $dns >> $SAFE_SEARCH_RESOLVE_RESULTS
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
        fi
        if echo $line | grep -q $dns; then
                continue
        fi
        #some shell contains "Address:", and some contains "Address 1:"
        if echo $line | grep -q "Address "; then
                address=$(echo $line | cut -d ' ' -f 3)
                echo $address $name >> $SAFE_SEARCH_HOSTS
        fi
        if echo $line | grep -q "Address:"; then
                address=$(echo $line | cut -d ' ' -f 2)
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
echo "checking ip addresses..."
echo "127.0.0.1 localhost" > $HOSTS
echo "0.0.0.0 null.meetcircle.co" >> $HOSTS
echo "fd22:9464:dfb8::1 device.meetcircle.co" >> $HOSTS
echo "10.123.234.1 device.meetcircle.co" >> $HOSTS

while read -r line; do
        address=$(echo $line | cut -d ' ' -f 1)
        host=$(echo $line | cut -d ' ' -f 2)
        if containsElement $hosts $line; then
                echo $line >> $HOSTS
        fi
done < $SAFE_SEARCH_HOSTS

# restart dnsmasq service
[ -f $CIRCLE_RUNNING_FLAG ] && [ -d /var/service/dnsmasq ] && {
	${CIRCLE_ROOT}/sv restart dnsmasq
}
