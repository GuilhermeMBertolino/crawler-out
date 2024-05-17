#!/bin/sh

killall -SIGUSR1 pucb_dil
/usr/bin/pucb_dil &

killall -SIGUSR1 pucb_ac
/usr/bin/pucb_ac &

killall -SIGUSR1 pucb_conndev
/usr/bin/pucb_conndev &
