#!/bin/sh
#
# Script to defined on the first boot the root password; to able users login.
# Developed by: Marcelo Araujo <araujo@intelbras.com.br>
# 03/06/2011 - An issue reported by 0800.
#
GETMIB="flash get"
SETMIB="flash set"
eval `$GETMIB SSH_PASSWD1`
eval `$GETMIB SSH_PASSWD2`

if [ "$SSH_PASSWD1" = "" ] && [ "$SSH_PASSWD2" = "" ]; then
	echo "====> Set the password for root."
	$SETMIB SSH_PASSWD1 "root:\$1\$\$CoERg7ynjYLsj2j4glJ34.:0:0:root:/:/bin/sh"
	$SETMIB SSH_PASSWD2 "nobody:x:99:99:Nobody:/:"
else
	echo "====> root password is ok for ssh."
fi
