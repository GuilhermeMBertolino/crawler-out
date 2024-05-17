#!/bin/ash

echo "SHUTDOWN_ON" > /var/run/led.fifo

#ed xxx	//將來要加在ed中, 移除wireless module, unmount all device
sleep 3
halt
