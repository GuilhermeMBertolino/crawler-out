#!/bin/sh 
echo ===== wl ver ======
wl -i wl1 ver
echo ===== wl country ======
wl -i wl1 country
sleep 3

wl msglevel +assoc +error +apsta +time

while :
do
    sleep 3
    date +"%Y%m%d %H:%M:%S"
    echo ====================================================START=================================================
    echo ===== wl -i wl1.1 assoclist ======
    wl -i wl1.1 assoclist

    echo ===== wl -i wl1 macmode ======
    wl -i wl1 macmode

    echo ===== wl -i wl1 chanim_stats ======
    wl -i wl1 chanim_stats

    echo ===== wl -i wl1 rssi ======
    wl -i wl1 rssi

    echo ===== wl -i wl1 dump ampdu ======
    wl -i wl1 dump ampdu
    echo ===== wl -i wl1 dump_clear ampdu ======
    wl -i wl1 dump_clear ampdu

    echo ===== wl -i wl1.1 bs_data ======
    wl -i wl1.1 bs_data

    echo ===== wl -i wl1 dump pktq_stats ======
    wl -i wl1 pktq_stats C: A: P:

    echo ===== wl -i wl1 counters ======
    wl -i wl1 counters
    echo ===== wl -i wl1 reset_cnts ======
    wl -i wl1 reset_cnts

    echo ====================================================END=================================================
done
