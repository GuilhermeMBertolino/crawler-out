#!/bin/sh
	echo 384 > /proc/sys/vm/min_free_kbytes
	echo 1048576 > /proc/sys/net/core/rmem_max
	echo 1048576 > /proc/sys/net/core/wmem_max
	echo "4096 108544 4194304" > /proc/sys/net/ipv4/tcp_rmem
	echo "4096 108544 4194304" > /proc/sys/net/ipv4/tcp_wmem
	echo 0 >/proc/sys/net/ipv4/tcp_moderate_rcvbuf
	echo 10000  >/proc/sys/vm/vfs_cache_pressure
	echo 5 >/proc/sys/vm/dirty_background_ratio
	echo 100 >/proc/sys/vm/dirty_writeback_centisecs
	exit 0