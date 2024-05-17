#!/bin/sh
	
  n=0
  until [ "$n" -ge 30 ]
  do
     echo "${n}"
     ping -t 64 -c 1 -w 1 -W 1 8.8.8.8 
     n=$((n+1)) 
     sleep 1
  done
  
