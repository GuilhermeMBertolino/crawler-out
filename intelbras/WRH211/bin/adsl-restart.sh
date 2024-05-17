#!/bin/sh

#參數1: 要重新啟動的 UI_NO


echo	Stop PPPoE UINO=$1
adsl-stop $1

sleep 2

echo	Start PPPoE UINO=$1
adsl-start $1

