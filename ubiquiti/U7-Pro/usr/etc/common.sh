#!/bin/sh

RAM_ROOT=/tmp/root

ldd() { LD_TRACE_LOADED_OBJECTS=1 $*; }
libs() { ldd $* | awk '{print $3}'; }

cat_file() {
  [ -f "$1" ] && cat "$1"
}

install_file() { # <file> [ <file> ... ]
    for file in "$@"; do
        dest="$RAM_ROOT/$file"
        [ -f $file -a ! -f $dest ] && {
            dir="$(dirname $dest)"
            mkdir -p "$dir"
            cp $file $dest
        }
    done
}

install_bin() { # <file> [ <symlink> ... ]
    src=$1
    files=$1
    [ -x "$src" ] && files="$src $(libs $src)"
    install_file $files
    [ -e /lib/ld.so.1 ] && {
        install_file /lib/ld.so.1
    }
    dir="$(dirname $src)"
    srcfile="$(basename $src)"
    shift
    for link in "$@"; do {
        [ -f "$link" ] || ln -s $srcfile $RAM_ROOT/$dir/$link
    }; done
}

pivot() { # <new_root> <old_root>
    mount | grep "on $1 type" 2>&- 1>&- || mount -o bind $1 $1
    mkdir -p $1$2 $1/proc $1/dev $1/var && \
    mount -o move /proc $1/proc && \
    pivot_root $1 $1$2 || {
        umount $1 $1
        return 1
    }
    cd /
    mount -o move $2/dev /dev
    mount -o move $2/var /var
    return 0
}

run_ramfs() { # <command> [...]
    mkdir -p $RAM_ROOT/bin $RAM_ROOT/lib $RAM_ROOT/usr
    install_bin /bin/busybox
    (for i in `ls -l /bin | awk '/-> busybox/{print $9}'`; do ln -s busybox $RAM_ROOT/bin/$i; done)
    install_bin /bin/ubntbox fwupdate.real
    install_bin /lib/version

    mkdir $RAM_ROOT/usr/etc
    cp /usr/etc/inittab $RAM_ROOT/usr/etc
    cp /usr/etc/common.sh $RAM_ROOT/usr/etc
    cp /usr/etc/platdep_funcs.sh $RAM_ROOT/usr/etc
    cp /usr/etc/syswrapper.sh $RAM_ROOT/usr/etc
    cp /usr/etc/led_locate.sh $RAM_ROOT/usr/etc

    ln -s var/tmp $RAM_ROOT/tmp
    ln -s var/etc $RAM_ROOT/etc
    ln -s bin $RAM_ROOT/sbin
    ln -s ../bin $RAM_ROOT/usr/bin
    ln -s ../sbin $RAM_ROOT/usr/sbin
    ln -s ../lib $RAM_ROOT/usr/lib

    echo "Switching to ramdisk"

    pivot $RAM_ROOT /mnt || {
        echo "Failed to switch over to ramfs. Reboot."
        reboot
    }

    mount -o remount,ro /mnt
    umount -l /mnt

    exec /bin/busybox ash -c "$*"
}

