#!/bin/ash

echo "SHUTDOWN_ON" > /var/run/led.fifo

#ed xxx	//�N�ӭn�[�bed��, ����wireless module, unmount all device
sleep 3
halt
