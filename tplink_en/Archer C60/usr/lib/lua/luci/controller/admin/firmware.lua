LuaQ               )�      H@  ��  ��@"@�  H@ "� A  �� b� �  �� �� �   �  HA "� A �� b� � �� �� �  �  HB "� A �� b� � �� �� �D ₀ C �Ĉŉ�ŊƋ�ƌH� � �C  ��H� "� D    � a     �BD aD     �B� a�  ��   � � !E a�   B� a�  �  �  ��E  ��	 �  ��E	 �� 	 � ��	 �E �
 �  ��E
 ��  �    
 � ��
 �E � �  �!�  �a     �F  �  �  �  !�  �  a  � ��G �    � �  �G ��  �  �   �  �� �G    �� �   �G ��  ��  HH � �� �H       � ��� ��    �     �� �� �	 �H �H	  �     �	  ��� ��	  �� �H  	D "�� �O�� �	 "� I    �I a	
  �   �  BI aI
    �   � � �	 � �              	B� E�  ��  �I  
 �	����	��I  J �	����	�D�����  �I  � �	����	��I  
 �	���ɉ��I  J �	����	�D�����
      ��� ��
 �	 # � M      module    luci.controller.admin.firmware    package    seeall    require    luci.model.uci 
   luci.http    luci.tools.debug    luci.tools.parttbl 	   luci.sys    nixio    luci.model.controller    luci.sys.config 
   luci.util $   luci.controller.admin.cloud_account    luci.fs    cursor    success    747401    file_size_failed    747402    file_content_failed    747403    resore_success    747404    locking    747405    /tmp/firmware_laststatus.log    /tmp/firmware.lock    /tmp/firmware.success    getsysinfo    product_name    TL-WR842v3    delCloudCfgfrom    replaceCloudCfgfor 
   clean_mem    ltn12_popen 
   fork_exec    fork_reboot    file_flash    update_fwuppercent    mtd_update_all    mtd_update_sep    find_default_ip    find_userconfig_ip    config_factory    hard_reset    config_backup    tmp_reboot    tmp_factory    clean_firmware_inf    0    1    -1    GetShortName    tmp_get_firmware_info    get_upgrade_detail    set_download_inf    fw_check_loop    fw_upgrade    tmp_upgrade_firmware 	K      get_profile    global    reboot_time    tmp_get_upgrade_info    firmware_index    config    reboot    cb    factory    tmp_cmd    get_firmware_info    upgrade_firmware    get_upgrade_info 	   dispatch    index ,          8    
L    @  �J   @@� ��  b@ # � A�  @ � @@� �� b@ A�  @ � @@� �� �    � b@ A�  @ � @@� �@ b@ J � @�� �� �  b@�E  �@ Ȁ _@ �� � � � ����  ���A� [ B�A ��  ����  � A�@A�@ �@ � � ��D�� � �@���  � A�@A�  �@ ��  � A�@A�@   � ��@ ��  � A�@AȀ �@ # � # �        printf    error backupCfg is needed    luci    sys    exec    mkdir -p /tmp/backupcfg    mv      /tmp/user-config.tar 4   tar -xzf /tmp/user-config.tar -C /  >/dev/null 2>&1 
   xmlToFile    /tmp/user-config.xml    /tmp/backupcfg    accountmgnt    cloud_config    ipairs    rm -f /tmp/backupcfg/config/ 0   rm -f /tmp/user-config.xml /tmp/user-config.tar    convertFileToXml    /tmp/backupcfg/config D   tar -czf /tmp/user-config.tar /tmp/user-config.xml  >/dev/null 2>&1    mv /tmp/user-config.tar  +   rm -rf /tmp/backupcfg /tmp/user-config.xml                     :   Z    h    @  �J   @@� ��  b@ # � A�  @ � @@� �� b@ A�  @ � @@� �� �    � b@ A�  @ � @@� �@ b@ J � @�� �� �  b@�A�  @ � @@� �@ b@ A�  @ � @@� �� b@ J � @�� �  �  b@�A�  @ � @@� �@ b@ J � @�� �� �@ b@�A�  @ � @@� �@ b@ E  �� ��  HA _@ �� � � � ����  ���A�� [ � ��A ��  @�� � �@FȀ � �@���  � A�@A�� �@ ��  � A�@A�    � ��@ ��  � A�@A�@ �@ # � # �        printf    error backupCfg is needed    luci    sys    exec )   mkdir -p /tmp/restorecfg /tmp/userconfig    mv      /tmp/user-config.tar 4   tar -xzf /tmp/user-config.tar -C /  >/dev/null 2>&1 
   xmlToFile    /tmp/user-config.xml    /tmp/restorecfg 0   rm -f /tmp/user-config.tar /tmp/user-config.xml D   nvrammanager -r /tmp/user-config.tar -p user-config >/dev/null 2>&1 
   decryfile    /tmp/user-config.tar    /tmp/userconfig    accountmgnt    cloud_config    cloud_status 
   cloud_svr    ipairs    cp -f /tmp/userconfig/config/     /tmp/restorecfg/config/    convertFileToXml    /tmp/restorecfg/config D   tar -czf /tmp/user-config.tar /tmp/user-config.xml  >/dev/null 2>&1    mv /tmp/user-config.tar  <   rm -rf /tmp/restorecfg /tmp/userconfig /tmp/user-config.xml                     \   d         @   �@ H�  �  �� ����W�� "� M  �  �	@  	 � #  # �    	       os    execute    . /lib/functions.sh;     include /lib/upgrade;  #   platform_check_image %q >/dev/null 
   image_tmp                     f   i    	   J   @ � �@  b@ J   @�� �   b@ # �       prepare_content 
   text/html    write_json                     k   m        ��  �  ��@��Ā ��  # �       success 
   errorcode    data                     o   {     	   A   �@  b� ��  ��@�  �� �@AH�  �@  @ � #  �� [�� �   �"��  �� �� [��A $�#  @�# � 
      require    string    io    input 
   /proc/mtd    read    *line    match    %"    mtd%d+                     }   �     q   
     @ H@  "@ �   �@ H  "@ �   �@ H@ "@ �   �@ H� "@ �   �@ H� "@ �   �@ H  "@ �   �@ H@ "@ �   �@ H� "@ �   �@ H� "@ �   �@ H  "@ �   �@ H@ "@ �   �@ H� "@ �   �@ H� "@ �   �@ H  "@ �   �@ H@ "@ �   �@ H� "@ �   �@ H� "@ �   �@ H  "@ �   �@ H@ "@ �   �@ H� "@ �   �@ H� "@ �   �@ H  "@ �   �@ H@ "@ �   �@ H@ "@ �   �@ H� "@ �   �@ H� "@ �   �@ H  "@ �   �@ H@ "@ # �       printf    clean memory ...    os    execute J   ps | grep hotplug2 >/dev/null 2>&1 && killall -9 hotplug2 >/dev/null 2>&1 B   ps | grep tddp >/dev/null 2>&1 && killall -9 tddp >/dev/null 2>&1 B   ps | grep dosd >/dev/null 2>&1 && killall -9 dosd >/dev/null 2>&1 J   ps | grep dropbear >/dev/null 2>&1 && killall -9 dropbear >/dev/null 2>&1 T   ps | grep factory_reset >/dev/null 2>&1 && killall -9 factory_reset >/dev/null 2>&1 H   ps | grep improxy >/dev/null 2>&1 && killall -9 improxy >/dev/null 2>&1 B   ps | grep logd >/dev/null 2>&1 && killall -9 logd >/dev/null 2>&1 D   ps | grep klogd >/dev/null 2>&1 && killall -9 klogd >/dev/null 2>&1 F   ps | grep logger >/dev/null 2>&1 && killall -9 logger >/dev/null 2>&1 H   ps | grep openvpn >/dev/null 2>&1 && killall -9 openvpn >/dev/null 2>&1 D   ps | grep pptpd >/dev/null 2>&1 && killall -9 pptpd >/dev/null 2>&1 B   ps | grep imbd >/dev/null 2>&1 && killall -9 imbd >/dev/null 2>&1 D   ps | grep radvd >/dev/null 2>&1 && killall -9 radvd >/dev/null 2>&1 F   ps | grep dhcp6s >/dev/null 2>&1 && killall -9 dhcp6s >/dev/null 2>&1 F   ps | grep dhcp6c >/dev/null 2>&1 && killall -9 dhcp6c >/dev/null 2>&1 E   [ -f /usr/sbin/miniupnpd ] && rm /usr/sbin/miniupnpd >/dev/null 2>&1 L   ps | grep miniupnpd >/dev/null 2>&1 && killall -9 miniupnpd >/dev/null 2>&1 A   [ -f /usr/sbin/sysmond ] && rm /usr/sbin/sysmond >/dev/null 2>&1 H   ps | grep sysmond >/dev/null 2>&1 && killall -9 sysmond >/dev/null 2>&1 D   ps | grep crond >/dev/null 2>&1 && killall -9 crond >/dev/null 2>&1 F   ps | grep tsched >/dev/null 2>&1 && killall -9 tsched >/dev/null 2>&1 B   ps | grep ntpd >/dev/null 2>&1 && killall -9 ntpd >/dev/null 2>&1 X   ps | grep wireless_button >/dev/null 2>&1 && killall -9 wireless_button >/dev/null 2>&1 R   ps | grep cloud-client >/dev/null 2>&1 && killall -9 cloud-client >/dev/null 2>&1 L   ps | grep cloud-brd >/dev/null 2>&1 && killall -9 cloud-brd >/dev/null 2>&1 "   echo 3 > /proc/sys/vm/drop_caches                     �   �    �   A   �@  b� �   ��@��@�   �� �   �"��  �@A��A�� �@ �  �@A��A�    HA �@��@ �  �@A��AȀ   H� �@��@ �  �@A��A�  �@ �  �@A�@CȀ �� M�C��� � � �A A� � b� A�@ �  �@����� �@ �   �  � � � � �@ �@� � H�   � [��A "A�
�  DH� "A   AA ACH� "� �  M�C �
�  DH � W��"A   AA �AH� "A 	  # 
�  DHA "A 
   �@ �@H� "�   ��  AA ACH� "� �  �C��  AA �AH "A 	� # ��
�  DHA �� � �� W��"A   AA �AH� "A 	  # ��
�  DH� "A   AA �AH� "A 	  # # � #      require    luci.model.crypto    fs    access    luci    sys    exec    mkdir /tmp/check    tail -c +34      > /tmp/check/check.cry    head -c 32      > /tmp/check/check.md5 6   echo "  /tmp/check/check.cry" >> /tmp/check/check.md5 
   fork_call /   md5sum -c /tmp/check/check.md5 >/dev/null 2>&1 	       printf    error:check first md5 failed: 	   tostring !   rm /tmp/check -rf >/dev/null 2&1    decry 	   dec_file    /tmp/check/check.cry    777    dump_to_file    /tmp/check/check.tar    untar =   tar -xvf /tmp/check/check.tar -C /tmp/check/ >/dev/null 2>&1    error:untar fail:    image_check    /tmp/check/check 3   cd /tmp/check;md5sum -c check >/dev/null 2>&1;cd - )   rm /tmp/check/check* -rf >/dev/null 2>&1    result:    error:no target file                     �   �     >      J   @@� @�� ��  b� Y    �A  @@� ��  b  �F�A�� bA�M B@ �@B@�A� � �� b�� �@�^@   ���J   @@� @�� �  b� Y   ��A  @@� �  b  �F�A�A bA��  ��  @�F�AȂ b��YB   �A� ��b� ��@ �^@   �#  # �    	       fs    access 
   /proc/mtd    io    lines    match -   ^([^%s]+)%s+([^%s]+)%s+([^%s]+)%s+"([^%s]+)"    linux 	   firmware 	   tonumber 	      /proc/partitions (   ^%s*(%d+)%s+(%d+)%s+([^%s]+)%s+([^%s]+)    [0-9] 	                       �      &   J   @ � b�� �   �@�  � ����@"A  a   � 
    �  c    @�����
   A[ �  �AA"A��� "A �@"A 
   �AH� � �  "A # � 	      pipe    fork 	       close    dup    stdout    exec    /bin/sh    -c        �   �     "   
    @ �@  "��J � @�� �  ��  b��� ��@  @�Y   � � A@ �� � � �    ��   ���@ �#  ��� ��    ��   ƀ��@ � ��  # �       read 	      waitpid    nohang    exited 	       close                                      3   J   @ � b�� @��@ �# � �
�@�  
��   ��@��  �@ �   � A�@ � ����   ���   ��� J  @��@��   ��� J  @A��@��   ��� J  @���@���B� � �@ ��@C�@ �   ���� H �  �@ # �       fork 	       chdir    /    open 
   /dev/null    w+    dup    stderr    stdout    stdin    fileno 	      close    exec    /bin/sh    -c                                  H@  "@ # �    
   fork_exec    sleep 1;reboot -f                       $          A@H�  ��  "��H �AA�  �A[��  ��  [�" �A  �B�A # � 	      io    open    /tmp/firmware_status.lua    w R   check_status = {success = %s, errorcode = "%s", data = {totaltime=%d, ops="%s"}}
    write    string    format    close                     &  +          A@H�  ��  "��H �AA�  �A[��  ��  [�" �A  �B�A # � 	      io    open    /tmp/firmware_status.lua    w P   check_status = {success = %s, errorcode = "%s", data = {percent=%d, ops="%s"}}
    write    string    format    close                     -  =   6   H   ��  �@  ��  � A � @	��AAƁ�H� � � B��� "��� � @C�BC P��"� J  @��@��� ����b� Y  ��AB @������ b�� ���[� �B ��� H� � � W����  ��� � �@ W� � � �@  � �# �    H   echo 'updating...' >/dev/console;cd /tmp/check;mtd erase flash_ipq806x;    needreboot 	      ipairs    part    name    gsub    0:        match 	   ([%w_]+) 	   tostring    offset    boardinfo_end    fs    access    /tmp/check/    string    find 	   parttbl      mtd write      flash_ipq806x     -n -p     ; R   mtd erase parttbl;mtd write parttbl parttbl;echo 'reboot...' >/dev/console;reboot                     ?  Z   R   E ��   �@  �  H�  � �A � H� � _@��@ � � � ���  ������ [ B� �  @�ȁ �A �� ��� [ �B � � [ �� � ��A ��  ���   ��B��B�  �� �   @��  �@EȀ �@ �� �@ � � ��C�  �@ �  �@E�@ �@ �@ �C@��  �@EȀ �@ �� �@� �  �C@��@ Ȁ � A �A �@��@ �  # � "   
   boardinfo    profile    defconf 	   softinfo 	   userconf    HLOS    extern    webpage    log    ipairs    fs    access    /tmp/check/    needreboot 	   
   fork_exec    mtd erase     ;mtd write /tmp/check/          -q -n;rm /tmp/check/    /tmp/check/rootfs    printf    upgrade rootfs 	    d   cd /tmp/check;mtd erase rootfs;mtd write rootfs rootfs -q -n; echo 'reboot...' >/dev/console;reboot    upgrade end 
   reboot...    fork_reboot    checkerror    file_flash    false 
   err_check    total    reboot                     \  q     6     HA  "� A�  @��� bA A�  @���A bA A� @��� �A b������ ���  ���A ��  ��@�A �A H� �� �A ��D�  � H� � ����  � � H  �@ �A ��D��� H� � ����  � � �  # �       require    luci.model.crypto    os    execute L   nvrammanager -r /tmp/default-config.tar -p  default-config  >/dev/null 2>&1 ;   tar -xzf /tmp/default-config.tar -C /tmp/  >/dev/null 2>&1    io    open    /tmp/default-config.xml    r    read    *a    close _   rm -f /tmp/default-config.cry  /tmp/default-config.tar /tmp/default-config.xml >/dev/null 2>&1    <interface name="lan">    </interface>    _    string    find    (.-) 	   <ipaddr> 
   </ipaddr>                     s  �     <      A@H�  "A �   AHA �� "��F�A� b�� �FABbA A  @A��� bA G �� H  �@ �� ���  [� � � W� �� �� [�M@���@D  � �H� �� �� ����[� � � W��� � � M@�@��  ����� # �       os    execute F   nvrammanager -r /tmp/user-config.xml -p  user-config  >/dev/null 2>&1    io    open    /tmp/user-config.xml    r    read    *a    close +   rm -f /tmp/user-config.xml >/dev/null 2>&1 	       <interface name="lan">    </interface>    string    find    (.-)  	   <ipaddr> 
   </ipaddr>    _                     �  �      A   @@� �   Ȁ  b����  �   ��  A ��@�   H� A�@���� �@ # �       io    open    w    type    string    write    
    close                     �  �          A@  @�� �   ��  b��M@ �� ��@� � ���  #  # �           io    open    r     read    *line                     �  �           @@ J   ��  "��M�@ ��F A � � A � �b@�F�A b@ # �       io    open    w     write    
    close                     �  �       
     @  @@ J � "�    � �	 � #  @ �	   #  # �       fs    access                     �  �       
     @  @@ J � "�     �
     @  �@ J � "@ # �       fs    access    unlink                     �  �           @@ J   ��  "��M�@ ��F A � � A � �b@�F�A b@ # �       io    open    w     write    
    close                     �  �       
     @  @@ J � "�    � �	 � #  @ �	   #  # �       fs    access                     �  �    N   H   �@  ��  ��� [� A�@ �@ ���� H�  M� ���A��� "��M �@�G �� �� [  ���� [�M@���M��@��A � G��  �C[ ��"���A� @���� bĀ� 	[�M@�@�M����A� @���� b���	�D BD A� ��b� � ��  ��M �@ ���� ��   �@H� �� W��"A �  # �       /tmp/partition.txt 	       os    execute    nvrammanager -s >     io    open    r     read    *line    string    find    (.-),()    size%s*=%s*(.-)%s*Bytes    gfind    size    _ 	   tonumber    rm                      �  O   6  J   @ � �@  b@ J   @ � ��  b@ A�  @ � @@� �� b@ A� �  b� @@� b�� �� Ȁ �� � �	� G����  HB �� ����A    �� ��� H �B �� ⁀�A    �� �� � �B C "��B    � F�� ��  b� YB    �HB M�E @ ��E @ �� �   ��   �  �F�B ��B���@���  �A��F� �B ���B ���� M@E ��B � �� @E� ��� ��G�B� �� � �� �BB��� [  ���  HC �� ����A   �� ���  HC �C ���B   � ���  HC �� ����A   �� �B ���� M@E ��B � �� @E��@�� ��  @ �	   �M@�����G��� �  ��� M ����B  � ��� ��BEZA�  �[ Y    �	  � Ƃ� H� �	 � �B    ��B	 ������ ��	 �
 D
 "���B   �� C [ "� � 
  �J"C� �� ��
 � "� C    � M�E �J�@C�� ȃ b���A� � b �M����� �DL	Ȅ �H� �D�	�D ^�   �A�  @�@C�� bC A�  @�@���C bC J @��bC� A� � b� @C�b�� [ �����A�  @�@���� bC F� � D H� ��bC F� � D HD � bC @����  @�F� � D H� � bC FC� � bC����F �F� � D HD �� bC @� ��  ��F� � D H� � bC  �@�N���C� ��bC FC� � bC������BEF� ��	 
 HD
 �� � � bC  FC� ��	 bC�J  @��� bC A bC� # � A      printf    reset to factory config    erase usb...    luci    sys 
   fork_call    nvrammanager -e -p usb-config    require    luci.model.uci    cursor    luci.model.accountmgnt    get    cloud_config    device_status 
   accountid    bind_status    0    need_unbind    get_profile    cloud    https_client 	       true    print    complete_flag:     call 0   cp /etc/config/accountmgnt /tmp/accountmgnt_bak 	   tonumber    cloud_unbind    get_cloudAccount 	       type    table    ifttt    ifttt_support    no    yes    ifttt_trigger    ifttt_config    factory_id    resetconfig    backup_restore    extern_partition    split         ipairs    os    execute    nvrammanager -e -p      >/dev/null 2>&1 !   /etc/init.d/logd stop ; logreset ,   [ -f /sbin/board_factory ] && board_factory    reloadconfig 0   cp /tmp/accountmgnt_bak /etc/config/accountmgnt    set    commit    1    set_cloudAccount 	   username 	   password 	   tostring 
   reboot...    fork_reboot                     Q  S           H@  "@ # �       config_factory    true                     U  y    h   
    @ �@  Ȁ  "� @    �   M�@ ��J � @ � �   �@ b�� � A� @�� �  b@ A@ �   b ��M��@��� ��B�C�A �H� ���� ����A ^�  @�A� @�� @ � �  b@ J  @@� �� Ȁ b@�A� �� b@ A� @�� �  b@ A� @�� @ � �@ b@  �A� @�� @ � �� b@ J  @@� �� �� b@�A� �� b@ J �@ � �@ b@ A� �� b� � � �� A H� �@ �� �� �� � H�@ �� �� ���� �� �@ �� ���� �� �@ �  # � $      get_profile    backup_restore    extern_partition     split         os    execute (   mkdir /tmp/backupfolder >/dev/null 2>&1    ipairs    luci    sys    exec .   nvrammanager -r /tmp/backupfolder/ori-backup- 	   .bin -p      >/dev/null 2>&1 \   nvrammanager -r /tmp/backupfolder/ori-backup-user-config.bin -p user-config >/dev/null 2>&1 
   decryfile -   /tmp/backupfolder/ori-backup-user-config.bin    delCloudCfgfrom ;   tar -cf /tmp/backup -C /tmp/backupfolder . >/dev/null 2>&1 )   rm -rf /tmp/backupfolder >/dev/null 2>&1 ;   nvrammanager -r /tmp/backup -p user-config >/dev/null 2>&1    /tmp/backup    printf    encry    require    luci.model.crypto 	   enc_file    /tmp/backup.cry    0123456789abcdef        io    popen    cat /tmp/backup.cry    rm /tmp/backup    rm /tmp/backup.cry                     {  �       
     @ H@  "@ �  H�  "�   A "�� J � @@� @�� �� b� Y   � �F B �@ b@�A� b@� # �       printf 
   reboot...    require    luci.model.uci    cursor    fs    access    /etc/config/history_list    commit    history_list    fork_reboot                     �  �       
     @ H@  "@ �  H�  "@ # �       printf    reset to factory config    config_factory    true                     �  �     -      H@  "�  �@ "�� F�@ �  A b@ F�@ �  � b@ F�A �  A H b@�F�A �  � HA b@�F�A Ȁ � H �A b@ F�A Ȁ � H� �� b@ F�A �   HA �� b@ F�D �  b@�# �       require    luci.model.uci    cursor    delete    cloud_config    new_firmware    upgrade_info    set    cloud_push    cloud_reply    wportal    upgrade    enable    yes    time    0    info 
   show_flag    commit                     �  �    k   M @ @ � �   �# � �     E  ���A   @  ���� �  [ ��  ��  CA[���"��HC   ��� ��A@ �H�   � ��� � B@ �HC �� �� ��B@ �H�   � �� �@C@ �H� �� ��� � D@ �HC  � �� ��D  �H � @��@�� �C��[��D���@	� ���C����@��������� ����[ �C��� ��� H�  �C����� @� H�  ��  ���  ���� �C��@  �� ��CQ������ �B �#  # �     	    	   	      string    byte 	   	�   	�   	   	�   	�   	�   	�   	   	�   	�   	   	�   	�   	      sub    table    insert        ...                     �  �   S   A   �@@ b� ��  ��  ��  � � ��   �@�� �@ �   
�  �A"�� J @A��� b� YA    �H� �@�FACȁ � H b��YA    �H� �@�@�����J @A�� b� YA    �H� �@�FACȁ � HB b��YA    �H� �� ��� ���[ ���AE��E���� Ā��AC� H �B ����A    ��� Ā���AC� H� � ����A    ��� Ā���  # �    	   tonumber    needToCheck    require $   luci.controller.admin.cloud_account 	      call    cloud_getFwList    cursor    name    getsysinfo    product_name        version    get    cloud_config    upgrade_info    SOFTVERSION    release_log    GetShortName 	      releaseNote    bin 
   b64encode 	   isLatest    new_firmware    fw_new_notify    0    upgradeLevel    type                     �     L   �   �@  �� ��@  �  F�� B E  b��� M���
����� B J  � Ȃ �A��� �����B � �   ��� B �A A� � ���  ������   @�� �A�� �A �� �A� � �A� �A ���A�� �A ��  �� �� �A�� �A �  J �B Ȃ �A����A�� �A �  � ��# �       require    ubus    connect    nvram_ubus    call    getFwupPercent     percent    update_fwuppercent    true    flash    fs    access    /tmp/firmware_status.lua    dofile    check_status 	d      printf    upgrade true    clean_firmware_inf 
   reboot... 
   fork_exec    sleep 1;reboot    upgrade false    false 	       ledcli STATUS_ON    err_failed                              A   �@  b� ��� �   �� �@  � ���  	  � �� A	� � �# �       require $   luci.controller.admin.cloud_account    get_download_detail 	       percent                        .    8   A   �@  b� @�� b�� ��  �   �� � � ��@� � H� �@ �@� � H �@ �@� � H� �� �@��@� � H �� �@��@�  HA �� �� �@ �@�  HA � �A �@ �@� � H� �� �A �@ �@� � H� � �A �@ �@� � �@�# �       require    luci.model.uci    cursor 	   tonumber 	d      delete    cloud_config    new_firmware    upgrade_info    set    cloud_push    cloud_reply    wportal    upgrade    enable    yes    time    0    info 
   show_flag    tcsp_status    commit                     0  P    M   
     @ H@  ��  "��   ��J   @�� �   �   � �b@�J   @�� �   �   �@�b@�J   @�� �   �   ���b@�F�A b� @ �@ �F@B b@ H� � � � � ��� �@ �  	  �� �  [ �@C  �# � �� � � ��� �� � ��� �@  �� � ��� �@  �� � ��� �@ �  � �@ Ȁ �@ � � ���� AA A�  �   # �       open 
   /dev/null    w+    dup    stderr    stdout    stdin    fileno 	      close    0    call    sleep 3  	   tonumber 	d      set_download_inf 	   filename    /tmp/cloud_up.bin    /sbin/sysupgrade                      Y  h          H@  "� @�@ b�� @ �� �I   �  c �@@A �� b� �   ��A���  B@ ��@ �@� � � � � �# � 
      require $   luci.controller.admin.cloud_account     cloud_fw_upgrade    illegel download url    get_download_progress    /tmp/cloud_up.bin    fork 	       fw_check_loop                     j  q       
     @ "�� @@ @ �I   c  A�  @�� �  b@ A@ d � c   # �       check_internet     os    execute    touch /tmp/tether_up    fw_upgrade                     u  �    	+      H@  �   �   ���	  � ������ �A�A �A �  ��@�  �[ ��  �@  ���� �����  B� �@ H@   �� �� ����� [  �  ��@��� ����������  # �       idle    0    get_download_detail     call    sleep 1 	   tonumber    percent 	d      fail    downloading 	   tostring    status    process    upgradeTime    rebootTime                     �  �    �      H@  ��  ��   � B H � �� �����!  
             �  �   �
 � 
  �B �� ����B�� � �  �A CBH� "� EC �C  
 �  
   �
 �
  D����  
 � �
 �D�����    
  
 � �
 �   D���  �
 �
  D����C  �
 �D���� 
 �
 �
  
  
 � 
  D����� 
 �
 � �
   � 
  
 �
   �
 �
 � 
  D��� 
  
 �   
   �
 �
 � 
  D����C 
 � �
 �
  
     
 �
  D��������  D H� �� [  ��Â�  � �� �C� ����	  H� �D  ���� [��� @�� �CFȃ  ���C M@��� �� ���C # �       /tmp/firmware.bin    /tmp/config.bin 	�   	_   	    	    luci    http    setfilehandler 
   formvalue 
   operation    form    read    check    fwup_check    reboot    factory    backup    restore 	   firmware 
   checklast    file size exceeds     
   not exist    os    execute    rm   
       �  �   L   �     �@  ��� � �@  ���   A  H�  � ��  �@�   @�� A @�� ��  � �@ �� �� ��� ���
�H  � � �@ �  Y    	��  � � ��  �  
� � �� � ƀ�[� �@����  ��� �� �
  �B�@ � � � ��@ �@ ���� J�A�@ �� ���
�H  � � �  �  �   � �� � � ��@ # �       file_flash    true        upload    name    image    io    open    w 	       write    file_size_failed    close    os    execute    rm  	                       �  �    |   
    @ �@  �@  �"� J   F�� �@    H�  b��Y@    �H  �   ��@A  [  �A ����@    ��� �   ƀ�H� � �A  M��� ��   @ ��@  � � 
� M�B� �
�  C@�A  �CH� � � W��"A 
 I� �A � 
� �DH "� ��
� �DH� "� H� � �BF������ � �B    ���  HC �� Ȃ ��������ā �"� �@��	�
  �H�� � B H� "A 
  I�� "A���
� M@I� �
� �I��A  �CH� � � W��"A 
 I� �A �A  �A �"� �@�
 I  ��	 �A "� �# � (   
   get_first    system    get    restore_time    130    firmwareUp_time    140    quicksetup    quick_setup    to_show    true    upgrade    save_upgrade    os    execute    rm -f      >/dev/null 2>&1        hardware_version    getsysinfo    HARDVERSION    firmware_version    SOFTVERSION    (    string    sub    special_id    null 	   	      )    is_default 
   totaltime    set    false    commit    config    config_multipart 
   not exist                     �  �       
     @  @@ H�  "�    @��  H�  "@    � ��
  I � �@ �@ "�  � # � # �       fs    access    /tmp/firmware_status.lua    dofile    check_status                         �      �      H@  "� @�@ b�� ��  � � [ �A �   M���� ��  
   � �
�  ABH� �  W��"A � H �A �  � "A�
�  ABH� "A 
  D ADH� "�   @�
�  ABH� "A  H� "A A �@�
�  ABH� "A 
 I� �A �A "� �# � @�
�  ABH� "A 
 I  � �A "� �
  @F@�
�  ABH� "A   H� "�  G"�� J @�@A���b� YA  �
�J� @A��� bA FAGȁ � bA FAGȁ  bA FAHȁ � H� bA�FAHȁ  H� bA�FAH�	 B	 H�	 ��	 bA FAH�	 B	 H
 �B
 bA FAHȁ �
 H�
 �B
 bA FKȁ bA�J� @A��A bA @�
 I  �� �A "� �# � /      require    ubus    connect    nvram_ubus    call    getFwupPercent     percent 	       printf &   =======fwup_check==========percent =     update_fwuppercent    true        flash    1    fs    access    /tmp/firmware_status.lua    2    dofile    check_status    3    4 	   err_form 	d      upgrade true    luci.model.uci    cursor    delete    cloud_config    new_firmware    upgrade_info    set    cloud_push    cloud_reply    wportal    upgrade    enable    yes    time    0    info 
   show_flag    commit 
   reboot...    permission denied                              
 � I � �   � � "�    
   @@ H�  "@ �  "@� # �           printf 
   reboot...    fork_reboot                        &          "�� J � � � �@  A   �b� C   A�  �  �@A��A�� �  b@  # �       find_default_ip        default_ip    config_factory    luci    http 
   formvalue    all                     '  J    �   
    @ �@  Ȁ  "� @    �   M�@ ��J � @ � �   �@ b�� � A� @�� �  b@ A@ �   b ��M��@��� ��B�C�A �H� ���� ����A ^�  @�A� @�� @ � �  b@ J  @@� �� Ȁ b@�A� �� b@ A� @�� �  b@ A� @�� @ � �@ b@  �A� @�� @ � �� b@ J  @@� �� �� b@�A� �� b@ J �@ � �@ b@ A� �� b� � � �� A H� �@ �� �  �� �� �@����� E� �� ��B�AI��� �� ����	 � _A  RA��@��� �@�� �A
 �@ �� ������� � A� @A�@A��@��� ���� �� �@ �� ���� �� �@ �  
� L�@ # � # � 1      get_profile    backup_restore    extern_partition     split         os    execute (   mkdir /tmp/backupfolder >/dev/null 2>&1    ipairs    luci    sys    exec .   nvrammanager -r /tmp/backupfolder/ori-backup- 	   .bin -p      >/dev/null 2>&1 \   nvrammanager -r /tmp/backupfolder/ori-backup-user-config.bin -p user-config >/dev/null 2>&1 
   decryfile -   /tmp/backupfolder/ori-backup-user-config.bin    delCloudCfgfrom ;   tar -cf /tmp/backup -C /tmp/backupfolder . >/dev/null 2>&1 )   rm -rf /tmp/backupfolder >/dev/null 2>&1 ;   nvrammanager -r /tmp/backup -p user-config >/dev/null 2>&1    /tmp/backup    printf    encry    require    luci.model.crypto 	   enc_file    /tmp/backup.cry    0123456789abcdef        ltn12_popen    cat /tmp/backup.cry    http    header    Content-Disposition (   attachment; filename="backup-%s-%s.bin" 	   hostname    date 	   %Y-%m-%d    prepare_content    application/x-bin    ltn12    pump    all    write    rm /tmp/backup    rm /tmp/backup.cry    success                     K  �    .     H@  "� H�  ��  �  
  AA�� �� "� A    � M B ,�J� @A�� ȁ b���J �� &�J�@��A bA @�C � �� � bA A @A��� bA A @A��� ��  �bA AA � b�
�M �@
�����E�� �H �B��� �BF� �� �� �����  G CGH� ���� WÃ"C �  G CGH ���C �H� WC�"C ���  G CGH� ���� WÃ"C ^�  @�A� �� bA J � b� ����E�� �� �AF���
��AF@��	�����	 �A �� ���A�B	 �A ������ H� �A��� ���A��	 �A ����
 �A ��	� HB
 �B
 � � � 
� �J�A �����
 �A � �A� @���	  HB �B
 � � � 
� �K�A ����� �A �� ���A� [� B�A �� ���A�B �A ��J��  ȁ B
 b� C J ����LbA J�@�� bA ��J � b� � �A�������C�A �A ��C � � H� �A �� �� �A ����E�� �� �AF��@��AF@��
�����	 �A �� ���A�B	 �A ������ [� �A��� ���A�� [� �� ��A ����
 �A ��	� HB
 �B
 � � � 
� �J�A �����
 �A � �A� @���	  HB �B
 � � � 
� �K�A ����� �A �� ���A� [� B�A @����  � HB
 �� � � ������A ���C� �A # � 8      require    luci.model.crypto    /tmp/backup    user%-config    user-config    get_profile    backup_restore    extern_partition     split      	�'	    printf    decry 	   dec_file    0123456789abcdef        os    execute #   mkdir /tmp/restore >/dev/null 2>&1 	   tar -xf  !    -C /tmp/restore >/dev/null 2>&1    ipairs    stat    /tmp/restore/ori-backup-    .bin    size 	       luci    sys    exec    nvrammanager -e -p      >/dev/null 2>&1 )   nvrammanager -w /tmp/restore/ori-backup- 	   .bin -p     replaceCloudCfgfor (   /tmp/restore/ori-backup-user-config.bin    restore 2   nvrammanager -e -p  user-config   >/dev/null 2>&1 
   encryfile [   nvrammanager -w  /tmp/restore/ori-backup-user-config.bin -p  user-config   >/dev/null 2>&1    restore configs        resore_success 
   reboot...    fork_reboot    file content error    file_content_failed    Decry file failed    rm     rm -rf /tmp/restore    file size exceeds    file_size_failed $   Upload file is too large, plz check 	      nvrammanager -w  #    -p  user-config   >/dev/null 2>&1                     �  �    2   
     @ H@  "@ 
 �  �@  �@ J  "�    ��
     @ H  "@    J �@@� �� �  � � b�  � M B  �J ��   �@ � b� C  # �  �
     @ H� "@ # � 
  J �@ � "@ 
 �I � �� Ȁ "�   # �       printf    upgrade firmware...    fs    access    true 
   fork_call    nvrammanager -c      >/dev/console 2>&1 	    	   err_form        false    success                     �  �    c   
   "�� M  �@ � ����J  �   Ȁ  A  b� C � ��J �@��  � @�J  @ � �@ � �� � b@ J  � � �@  A  b� C �  �J �@��  � @�A  b�� �  � � A  EA  DA���� � � �	�J �@��  � ��J  �   �� A  b� C � ��J �@ �  � ��J  �   �@ A  b� C �  �J �@��  � ��J  �   Ȁ A  b� C � @�J  �   �� A  b� C � J  @ � @@� � �b� Y   ��A� @�� �  � �A � b@ # �            permission denied    success 
   fork_exec    /sbin/sysupgrade     > /dev/console 2>&1    resore_success    find_userconfig_ip    default_ip    file_size_failed    file size exceeds    file_content_failed    file content error    locking    unknown error    fs    access    os    execute    rm -f      >/dev/null 2>&1                                 �  �      a   
   � � � @�    EA  DA���  �   # �    	   dispatch 
   post_hook        �  �         ��� � �   � ��   �@@� � �@ � � �  # �       cmd 
   fork_exec                                 �  �           E  �@  Ȁ  _@ ��  �  �  "�  ���# �       entry    admin 	   firmware    call    firmware_index    leaf                             