#!/bin/sh

ans=""
for i in 0 1 2 3;do
num=$(($RANDOM%16))

if [ $num -eq 10 ];then
num=a
ans=${ans}a
elif [ $num -eq 11 ];then
num=b
ans=${ans}b
elif [ $num -eq 12 ];then
num=c
ans=${ans}c
elif [ $num -eq 13 ];then
num=d
ans=${ans}d
elif [ $num -eq 14 ];then
num=e
ans=${ans}e
elif [ $num -eq 15 ];then
num=f
ans=${ans}f
else
ans=${ans}${num}
fi
cp /usr/www/ca_$num.gif /var/ca$i.gif
done
wrcsman "0x80010400 \"$ans"

echo $ans