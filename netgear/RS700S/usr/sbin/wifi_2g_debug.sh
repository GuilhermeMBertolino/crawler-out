#!/bin/sh 
echo ===== wl ver ======
wl ver
echo ===== wl country ======
wl country
sleep 3

wl msglevel +assoc +error +apsta +time

while :
do
    sleep 3
    date +"%Y%m%d %H:%M:%S"
    echo ====================================================START=================================================
    echo ===== wl -i wl0 assoclist ======
    wl -i wl0 assoclist

    echo ===== wl -i wl0 macmode ======
    wl -i wl0 macmode

    echo ===== wl -i wl0 chanim_stats ======
    wl -i wl0 chanim_stats

    echo ===== wl -i wl0 rssi ======
    wl -i wl0 rssi

    echo ===== wl -i wl0 dump ampdu ======
    wl -i wl0 dump ampdu
    echo ===== wl -i wl0 dump_clear ampdu ======
    wl -i wl0 dump_clear ampdu

    echo ===== wl -i wl0 bs_data ======
    wl -i wl0 bs_data

    echo ===== wl -i wl0 dump pktq_stats ======
    wl -i wl0 pktq_stats C: A: P:

    echo ===== wl -i wl0 counters ======
    wl -i wl0 counters
    echo ===== wl -i wl0 reset_cnts ======
    wl -i wl0 reset_cnts

    echo ====================================================END=================================================
done
