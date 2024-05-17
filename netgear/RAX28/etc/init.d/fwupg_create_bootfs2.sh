#BOOTFS2_UBI_FILE=/data/brcm_simple.itb
BOOTFS2_UBI_FILE=/etc/bootfs/brcm_simple.itb
# bootfs2 volume pre-defined to be volume 5 

if [ -e /dev/ubi0_5 ]
then
echo "ubi0_5 exist"
exit
else
echo "ubi0_5 not exist. Try creating bootfs2"
fi

if [ -e $BOOTFS2_UBI_FILE ]
then
ubimkvol /dev/ubi0 -n 5 -s 5000000 -N bootfs2 -t static
sleep 1
ubiupdatevol /dev/ubi0_5 $BOOTFS2_UBI_FILE
#commit and valid image-2
bcm_bootstate +2

#commit and valid image-1 back
bcm_bootstate +1

else
echo "Missing bootfs file $BOOTFS2_UBI_FILE"
fi
