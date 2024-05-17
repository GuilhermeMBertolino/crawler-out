#!/bin/sh

mca_dump="mca-ctrl -t dump"
out="/tmp/mca_dump.out"

usage() {
    cat << EOF
Usage: $0 [options] <args...>
    mca-dump     : dump all reporting stat
    mca-sta <mac>: show stat for sta

options:
    -h: help
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
		-*)
			shift
	esac
done


while [ 1 ] ; do
	case $cmd in
	mca-dump)
		${mca_dump}
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

