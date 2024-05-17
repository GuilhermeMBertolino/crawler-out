#!/bin/sh

key=$(cat /etc/shadow|grep admin|awk -F : '{print $2}')
if [ $key == 'x' ];then
	key=$(cat /etc/shadow|grep root|awk -F : '{print $2}')
fi
echo "admin:$key" > /var/user.htpasswd
