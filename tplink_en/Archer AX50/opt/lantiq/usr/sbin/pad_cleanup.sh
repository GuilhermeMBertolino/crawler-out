#!/bin/sh

path=$1
max=$2

total=`ls -tr $path/logger_*.zip | wc -l`

if [ $total -gt $max ]; then
	echo "total=$total, max=$max - deleting oldest $((total-max)) logs"
	count=0
	for f in `ls -tr $path/logger_*.zip`; do
		if [[ $count == $((total-max)) ]]; then break; fi
		echo "$0: #$count: removing ${f%.*}*"
		rm ${f%.*}*
		let count=count+1
	done
fi
