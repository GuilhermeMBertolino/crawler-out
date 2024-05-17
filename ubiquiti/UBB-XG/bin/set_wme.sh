#!/bin/sh

CWMIN=$1
CWMAX=$2
AIFS=$3
TXOP=$4
IFACE=$5

iwpriv $IFACE cwmin 0 0 $CWMIN
iwpriv $IFACE cwmin 0 1 $CWMIN
iwpriv $IFACE cwmin 1 0 $CWMIN
iwpriv $IFACE cwmin 1 1 $CWMIN
iwpriv $IFACE cwmin 2 0 $CWMIN
iwpriv $IFACE cwmin 2 1 $CWMIN
iwpriv $IFACE cwmin 3 0 $CWMIN
iwpriv $IFACE cwmin 3 1 $CWMIN

iwpriv $IFACE cwmax 0 0 $CWMAX
iwpriv $IFACE cwmax 0 1 $CWMAX
iwpriv $IFACE cwmax 1 0 $CWMAX
iwpriv $IFACE cwmax 1 1 $CWMAX
iwpriv $IFACE cwmax 2 0 $CWMAX
iwpriv $IFACE cwmax 2 1 $CWMAX
iwpriv $IFACE cwmax 3 0 $CWMAX
iwpriv $IFACE cwmax 3 1 $CWMAX

iwpriv $IFACE aifs 0 0 $AIFS
iwpriv $IFACE aifs 0 1 $AIFS
iwpriv $IFACE aifs 1 0 $AIFS
iwpriv $IFACE aifs 1 1 $AIFS
iwpriv $IFACE aifs 2 0 $AIFS
iwpriv $IFACE aifs 2 1 $AIFS
iwpriv $IFACE aifs 3 0 $AIFS
iwpriv $IFACE aifs 3 1 $AIFS

iwpriv $IFACE txoplimit 0 0 $TXOP
iwpriv $IFACE txoplimit 0 1 $TXOP
iwpriv $IFACE txoplimit 1 0 $TXOP
iwpriv $IFACE txoplimit 1 1 $TXOP
iwpriv $IFACE txoplimit 2 0 $TXOP
iwpriv $IFACE txoplimit 2 1 $TXOP
iwpriv $IFACE txoplimit 3 0 $TXOP
iwpriv $IFACE txoplimit 3 1 $TXOP
