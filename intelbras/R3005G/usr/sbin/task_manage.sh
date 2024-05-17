#!/bin/sh

while [ 1 ]
do
	if [ -x "/tmp/task_manage" ]; then
		/tmp/task_manage;
	else
		task_manage;
	fi

	sleep 60;
done
