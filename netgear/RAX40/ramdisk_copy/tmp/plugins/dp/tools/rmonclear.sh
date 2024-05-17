#!/bin/sh

for port in 0 1 2 3 4 5 6
do
   switch_cli dev=0 GSW_RMON_CLEAR nRmonId=$port
done

for port in 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
do
   switch_cli dev=1 GSW_RMON_CLEAR nRmonId=$port
done

echo c -1 > /proc/tmu/eqt
