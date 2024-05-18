#!/bin/sh

echo "Set RPS by net_config"

NPROCS="$(grep -c "^processor.*:" /proc/cpuinfo)"
[ "$NPROCS" -gt 1 ] || exit

PROC_MASK="$(( (1 << $NPROCS) - 1 ))"

find_irq_cpu() {
	local dev="$1"
	local match="$(grep -m 1 "$dev" /proc/interrupts)"
	local cpu=0
	local i=0

	[ -n "$match" ] && {
		for val in $match
		do
			if [ $i -ge 1 -a $i -le $NPROCS ]; then
				if [ $val -gt 0 ]; then
					cpu=$((i - 1))
					break
				fi
			fi
			let "i+=1"
		done
	}

	echo "$cpu"
}

set_hex_val() {
	local file="$1"
	local val="$2"
	val="$(printf %x "$val")"
	[ -n "$DEBUG" ] && echo "$file = $val"
	echo "$val" > "$file"
}

for dev in /sys/class/net/*; do
	[ -d "$dev" ] || continue

	# ignore virtual interfaces
	[ -n "$(ls "${dev}/" | grep '^lower_')" ] && continue
	[ -d "${dev}/device" ] || continue

	device="$(ls ${dev}/device -l  | awk -F "/" '{print $NF}')"

	irq_cpu="$(find_irq_cpu "$device")"
	irq_cpu_mask="$((1 << $irq_cpu))"

	for q in ${dev}/queues/rx-*; do
		# RM#8294 fix interrupt (wifi->gmac) on cpu2
		gmacinterrupt="$(echo $device | grep gmac)"
		if [ $gmacinterrupt ];then
			set_hex_val "$q/rps_cpus" "4"
		else
			set_hex_val "$q/rps_cpus" "$(($PROC_MASK & ~$irq_cpu_mask))"
		fi
		wifilbinterrupt="$(echo $device | grep wifi-lb)"
		if [ $wifilbinterrupt ];then
			set_hex_val "$q/rps_cpus" "4"
		fi
		wifihbinterrupt="$(echo $device | grep wifi-hb)"
		if [ $wifihbinterrupt ];then
			set_hex_val "$q/rps_cpus" "2"
		fi
	done

	idx=$(($irq_cpu + 1))
	for q in ${dev}/queues/tx-*; do
		set_hex_val "$q/xps_cpus" "$((1 << $idx))"
		let "idx = idx + 1"
		[ "$idx" -ge "$NPROCS" ] && idx=0
	done
done

steerd_enable=$(cfm get steerd.enable)
if [ ${steerd_enable} -eq 1 ]; then
	echo 0 > /proc/fast_l2/br_enable 
else
	echo 1 > /proc/fast_l2/br_enable
fi
