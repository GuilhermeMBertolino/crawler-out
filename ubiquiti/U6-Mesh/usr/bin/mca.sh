#!/bin/sh

mca_dump="mca-ctrl -t dump"
out="/tmp/mca_dump.out"

usage() {
    cat << EOF
Usage: $0 [options] <args...>
    mca-dump     : dump all reporting stat
    mca-dump     : dump all wireless scan stat
    mca-sta <mac>: show stat for sta

options:
    -h: help
    -f: force dump stat
    -l: loop
EOF
    exit 0
}

show_sta() {
	${mca_dump} > ${out}
	start=`grep $1 -n ${out} | cut -d : -f 1`
	if [ -z "$start" ] ; then
		echo "not found"
	else
		end=`expr $start + 20`
		cat ${out} | sed -n "$start,$end s/^[ \t]*/   /p"
	fi
}


cmd=`basename $0`

# find the options
for o in $* ; do
	case $o in
		-l)
			loop="yes"
			shift
			;;
		-f)
			killall -usr2 inform-collector
			while [ 1 ] ; do
				sleep 1
				[ -d "/var/run/stats-collector" ] && break
			done
			shift
			;;
		-*)
			shift
	esac
done


while [ 1 ] ; do
	case $cmd in
	mca-dump)
		${mca_dump}
		;;
	mca-scan)
		mca-ctrl -t scan
		;;
	mca-sta)
		if [ "$1" = "" ] ; then
			usage
		fi

		show_sta $1
		;;
	*)
	usage
	esac

	[ -z "$loop" ] && exit
	echo "---------------------------------------"

	sleep 1
done

