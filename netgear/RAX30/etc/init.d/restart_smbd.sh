sleep 25
killall nmbd
killall smbd
nice -n -5 /bin/smbd
smbd -s /var/samba/smb.conf
nmbd -s /var/samba/smb.conf
#killall smbd;smbd -s /var/samba/smb.conf ;nmbd -s /var/samba/smb.conf

