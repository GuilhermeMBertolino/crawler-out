#!/bin/sh

#x_uid="root"
#x_pid="cs2012"
x_uid=`flash get TELNET_HOST | cut -d '"' -f2`
x_pid=`flash get TELNET_PASSWORD | cut -d '"' -f2`
h_name=`flash get HOST_NAME | cut -d '"' -f2`

while true;do
read -p "$h_name:" USERNAME
read -s -p "password:" PASSWORD
#echo your username="$USERNAME" password="$PASSWORD"

if [ "$USERNAME" = "$x_uid" -a "$PASSWORD" = "$x_pid" ]; then
	exec /bin/ash --login
else
	echo "Login failed."
fi
done;