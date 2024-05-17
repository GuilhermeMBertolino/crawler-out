#mount -t ramfs mdev /dev
#mkdir /dev/pts
#mount -t devpts devpts /dev/pts

#mdev -s

echo "/sbin/mdev" > /proc/sys/kernel/hotplug

