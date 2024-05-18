#/bin/bash
if test $1 = del_all_user
then
iptables -t mangle -D PREROUTING -i ppp$2 -m conntrack --ctstate ESTABLISHED,RELATED -j CONNMARK --restore-mark
elif test $1 = renew_user_record
then
ip route replace table wan1 $2 src $3 dev ppp$4
if [ $5 -gt 1 ];
then
ip route replace table wan2 $2 src $3 dev ppp$4
elif [ $5 -gt 2 ];
then
ip route replace table wan3 $2 src $3 dev ppp$4
elif [ $5 -gt 3 ];
then
ip route replace table wan4 $2 src $3 dev ppp$4
fi
iptables -t mangle -A PREROUTING -i ppp$4 -m conntrack --ctstate ESTABLISHED,RELATED -j CONNMARK --restore-mark
elif test $1 = clear_user_record
then
iptables -t mangle -D PREROUTING -i ppp$2 -m conntrack --ctstate ESTABLISHED,RELATED -j CONNMARK --restore-mark
else
echo "noting"
fi