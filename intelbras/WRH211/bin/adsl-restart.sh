#!/bin/sh

#�Ѽ�1: �n���s�Ұʪ� UI_NO


echo	Stop PPPoE UINO=$1
adsl-stop $1

sleep 2

echo	Start PPPoE UINO=$1
adsl-start $1

