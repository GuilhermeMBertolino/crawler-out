#!/bin/sh
# wait for xl2tp process complete up...
sleep 1
echo 'c l2tpCVPN' > /var/run/xl2tpd/l2tp-control
