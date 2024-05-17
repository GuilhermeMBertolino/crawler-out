#!/bin/sh
echo "=======================S37 Init acos NVRAM system!"

if [ -f /data/use_brcm_nvram ]; then
    echo "Use BRCM NVRAM system!";
    #cp /lib/libnvram_brcm.so /tmp/libnvram.so
    #cp /bin/nvram_brcm /tmp/nvram
else
    echo "Use ACOS NVRAM system!";
    #cp /lib/libacos_nvram.so /tmp/libnvram.so
    #cp /bin/acos_nvram /tmp/nvram
    nvram init
if [ -f "/data/psi" ]; then
    echo "psi exists."
else
    echo "psi does not exists."
    cp -f /etc/psi_default /data/psi
fi

    #ls -l /data > /dev/console
    cat /data/psi | grep compressed > /tmp/psi_compressed_size
    size=$(wc -c < /tmp/psi_compressed_size)
    #echo "****$size"
    rm /tmp/psi_compressed_size
    
if [ $size -eq 0 ]; then
    echo "psi is empty, create new psi!"
    cp -f /etc/psi_default /data/psi
else
    echo "psi checking is ok!"
fi

fi
