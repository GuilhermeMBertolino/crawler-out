LuaQ               �      H@  ��  ��@"@�  H@ "� A  �� b� �  �� �� �   �  HA "� A �� b� � �� �� �  �  HB "� @�C b�� � �� �B ��C H� �� �B    ��� � C H� �� �F�C �� �� ��� � � H �� ��ǎ�ȏ��Ȑ�ɑ��ɒ�ʓ��ʔ�˕��˖�̗�   � �D �D   �    �� ��    � � �D �D  � � �� �� � � �D �D  � �� �� � �   �D �D    � �� ��    � � �  � �    �   �    �D �D    �        � �   ��� ��   � �    ��D �D  � �        � ��� ��  �  	  � �  �   �  �D �D    � �    �   ��� ń  � EE  �E D��E��EE  �� D��E��EE  � D��E�E�  �E D��D�T�E��EE  �� D��E�EE  �� D��E�����  EE  � D��E��EE  �E D��E��E�  �� D��D�T�E���!�  � � �	E !    �   � �   �� !E � # � \      module    luci.controller.admin.firmware    package    seeall    require    luci.model.uci 
   luci.http    luci.tools.debug 	   luci.sys    nixio    luci.model.controller    luci.fs    luci.model.log 
   luci.util    cursor 
   luci.json    get_profile    global    reboot_time 	<      /tmp/firmware.bin    /tmp/read-backup-userconf.bin $   /tmp/read-backup-userconf-merge.bin    os    execute 7   nvrammanager -s | grep default-config2 >/dev/null 2>&1 4   nvrammanager -s | grep user-config2 >/dev/null 2>&1    /tmp/mergeconfig_lock    /tmp/mergeconfig_done 	   00000000    UN 	   55530000    5553 	   45550000    4555 	   43410000    4341 	   4B520000    4B52 	   42520000    4252 	   4A500000    4A50 	   41550000    4155 	   52550000    5255 	   54570000    5457    write_json 
   mcu_reset    has_mcu    has_ledctrl    sysled_twinkle    fork_reboot    file_flash    update_fwuppercent    restore_error    make_common_config    set_common_config    find_default_ip    config_read    config_check    md5_product_name    config_backup    config_restore    config_reboot    config_factory    parse_merge_config    load_old_config    update_section    mergeconfig    upgrade_read    upgrade_fwup_check    stop_unused_process    upgrade_firmware    config    read    cb    check    backup    restore    own_response    reboot    factory    upgrade    fwup_check 	   firmware 	   dispatch    _index    index        4   7    	   J   @ � �@  b@ J   @�� �   b@ # �       prepare_content 
   text/html    write_json                     9   <      	       @@ H�  "@     @@ H�  "@ # �       os    execute .   echo 0 > /sys/class/leds/mcu_reset/brightness .   echo 1 > /sys/class/leds/mcu_reset/brightness                     >   C        
     @ H@  "�    @ �	 � #  	   #  # �       isfile %   /sys/class/leds/mcu_reset/brightness                     E   J        
     @ H@  "�    @ �	 � #  	   #  # �       isfile    /usr/bin/ledctrl                     L   Q            "��    � �@   �@ H�  "@ 	 � #  # �       has_ledctrl    os    execute    ledcli STATUS_SAN                     S   _           H@  "�  �@ "�� F�@ �  A b� Y@    �H� �� � ��   � B�@ �@ �� ��� �   @ ��� �@� �   � C�@ �@ # �       require    luci.model.uci    cursor    get_profile    cloud    cloud_support    no    yes 
   fork_call    /etc/init.d/cloud_client stop    has_mcu 
   mcu_reset 
   fork_exec    sleep 2;reboot                     a   f     
   �   �@@Ȁ  �  ����  AA�� ��A��  [� � "A  B"A # � 	      io    open    /tmp/firmware_status.lua    w )   check_status = {totaltime=%d, ops="%s"}
    write    string    format    close                     h   m     
   �   �@@Ȁ  �  ����  AA�� ��A��  [� � "A  B"A # � 	      io    open    /tmp/firmware_status.lua    w '   check_status = {percent=%d, ops="%s"}
    write    string    format    close                     o   t     
   �   �@@Ȁ  �  ����  AA�� ��A��  [� � "A  B"A # � 	      io    open    /tmp/firmware_status.lua    w ,   check_status = {error_code="%s", ops="%s"}
    write    string    format    close                     v   �         �  @@��@�A  @@� �� �� b���  �   � ���A� [��� � � W��A���  ��� � �@ # �       image_boot    0    device_mode    router    io    open     /tmp/save-backup-commonconf.bin    w    pairs    write    =         close                     �   �      3       @@ H�  ��  "��F A �@ b����A �@ �� � B� � A ����� � �� H�  M�B� �M C  ��� M@� �M��� �M��  ��@   ADH� � �� W��"A   ADH ���� W��"A   ADHA "A # �       io    open     /tmp/read-backup-commonconf.bin    r    read    *all    close    string    match    image_boot=(%d)     device_mode=(%a+)     0    1    router    ap 	   repeater    os    execute    nvram set image_boot=     >/dev/null 2>&1    nvram set device_mode=    nvram commit >/dev/null 2>&1                     �   �      6      A@H�  "A �  H "� @AA�� �� bA�A @A��� ȁ b����� ���  �A��A �  �A@ȁ �A H� �  �� ��D�  � H � ����  �A �A H@ �� �� ��D��� H � ����  �A �A �  # �       os    execute J   nvrammanager -r /tmp/default-config.bin -p default-config >/dev/null 2>&1    require    luci.model.crypto    dec_file_entry    /tmp/default-config.bin    /tmp/default-config.xml    io    open    r    read    *all    close F   rm -f /tmp/default-config.xml /tmp/default-config.bin >/dev/null 2>&1    <interface name="lan">    </interface>    _    string    find    (.-) 	   <ipaddr> 
   </ipaddr>                     �   �       E@  �   D� �c  # �    
   totaltime                     �   �       �   � @�@@Ȁ  �� �   ����  Ȁ  �@ A  �@� �A@��� � B�@ �@ �   ��� � �@ �� � �  c  # �       fs    access    /tmp/firmware_status.lua    dofile    check_status    ops    restore    os    execute /   rm -f /tmp/firmware_status.lua >/dev/null 2>&1    error_code                     �   �      $      H@  "� @�@ ��  b� Y@    �H  �@ ��A��  ����@B[� �@�ƀB�@ �� � ��@�� � �  C ACH� "A   AD[��� $�#  # �       require    luci.sys.config    getsysinfo    product_name        io    open    /tmp/product_name    w    write    close    luci    sys    exec    md5sum /tmp/product_name    rm -f /tmp/product_name    string    match 
   %x%x%x%x+                     �   =   `  J    � �4�J �  � �3�A@  @�� @�� �  b@ A@  @�� @�� �@ b@ A� b@� A� @ � �@ Ȁ b���� � B�� � ����� � � H�  �  BHA �� "��F�� � b����C ������H ⁀B  �DH� �� C ��"�  AB @���� �EHC ��b�  �B ��D�� ��C "���  ƂE[��B�ƂE[ �B�ƂE[��B���� �B ��E�B ����B ��E�B �B  ������ � C  CF[��� "��A� @��� ȃ b���C �G� D �� ��� ����	Ƅ�AE @��
� 	b �D  �C   ��C �G��D �� ��� ����	Ƅ�AE @��
� 	b �D  �C   ��C �G� D �� ��� ����	Ƅ�AE @��
� 	b �D  �C   ��C �G� D �� ��� ����	Ƅ�AE @��
� 	b �D  �C   ������C���� �C������C�����C � �H�C �� �C  ������	 HD	 �C��C  �������	 �C �C  ���C���� AD  @��@���C��C  �������
 �C �C  ������ �C �!�A@ b�� �� � BȀ � ����@ � �� HA � � �ȁ  ���E�B ��G��� "B  �@   ���E�@ � ����H �A � �@    �� �M���
�
  �L[�� "���  A  �MH� "A  [�"��M�L@�AB  @��@���B � � [ �� ��bB �  @�A   �@ �@H "A A  �MHA "A A   �@ �@H� "A  �A   �@ �@H� "A A   �@ �@H "A A H� "� @�P� �A bA�J @��� b� �A  ��H��H�	 � AB  @��@�b�� �B �BRȂ � B  ���A��A  ��H��I��	 �A �A  �J�AJ��J��B   �H �E�A��A  ��@��@�� �A I � c  # � L   	       luci    sys    exec O   nvrammanager -r /tmp/save-backup-userconf1.bin -p user-config1 >/dev/null 2>&1 O   nvrammanager -r /tmp/save-backup-userconf2.bin -p user-config2 >/dev/null 2>&1    make_common_config    io    open    /tmp/save-backup-userconf1.bin    r    /tmp/save-backup-userconf2.bin     /tmp/save-backup-commonconf.bin )   /tmp/save-backup-userconf-temp-merge.bin    w    read    *all    string    format    %08x    seek    end    write    close 0   md5sum /tmp/save-backup-userconf-temp-merge.bin    match 
   %x%x%x%x+ $   /tmp/save-backup-userconf-merge.bin    gmatch    %x%x    0x    char    ltn12_popen (   cat /tmp/save-backup-userconf-merge.bin    http    header    Content-Disposition "   attachment; filename="config.bin"    prepare_content    application/octet-stream    ltn12    pump    all p   rm -f /tmp/save-backup-userconf1.bin;rm -f /tmp/save-backup-userconf2.bin;rm -f /tmp/save-backup-commonconf.bin Y   rm -f /tmp/save-backup-userconf-temp-merge.bin;rm -f /tmp/save-backup-userconf-merge.bin    md5_product_name    /tmp/product_name_md5_file    get_profile    backup_restore    extern_partition     split         os    execute "   mkdir /tmp/backup >/dev/null 2>&1    ipairs (   nvrammanager -r /tmp/backup/ori-backup- 	   .bin -p      >/dev/null 2>&1 V   nvrammanager -r /tmp/backup/ori-backup-user-config.bin -p user-config >/dev/null 2>&1 F   tar -cf /tmp/ori-backup-userconf.bin -C /tmp/backup . >/dev/null 2>&1 #   rm -rf /tmp/backup >/dev/null 2>&1 L   nvrammanager -r /tmp/ori-backup-userconf.bin -p user-config >/dev/null 2>&1 [   cat /tmp/product_name_md5_file /tmp/ori-backup-userconf.bin > /tmp/mid-backup-userconf.bin    require    luci.model.crypto    enc_file_entry    /tmp/mid-backup-userconf.bin    /tmp/save-backup-userconf.bin "   cat /tmp/save-backup-userconf.bin (   attachment; filename="backup-%s-%s.bin" 	   hostname    date 	   %Y-%m-%d �   rm -f /tmp/save-backup-userconf.bin; rm -f /tmp/product_name_md5_file; rm -f /tmp/mid-backup-userconf.bin; rm -f /tmp/ori-backup-userconf.bin                     ?  L   �  J    �  a�J �  � @`�A@  @�� ��  �  b���@� � ����@� H� �@� B ��@� �@ �� ���� �A �@ �� � H �@�� � �  �   A H� �A A��� �B "��A @B��� � ��� � b�  ���BD�@�  AF[�"� A� �� � ��b� �  �A � HB �A���� HC ₀  CEH� � ��E��� "�  V QC������ �A� � � H� ��W��"� E  �B Ȃ C �B���� D ���� �C�� A @��� b �  �DDD���� �BF���� �� � [ C�   HC � �C ]C�F�� �D b��� �DE	Ȅ   �E
[�" ��  � �D�	��	\�A @C�� b� �C����� �� �CGȃ �C  �� �CG�� �C �C� �C �� ��B�C�C �C �� ��  �C��� � ��� ������� [ ⃀�� ��"��FD� bD AD  @��� �D b���D  ��@	Ȅ E ����D  ���	� HE ℀E   �@
H	 �E "��M ���M@I@�F��� bE�F�I
� bE�M @��M@�@�F�I	��bE�F�I
��bE�M ���M@I@�F��	� bE�F�I
� bE�FE�bE FEB	bE FE�	bE FEB
bE A� @��
@�
��	 b� � �J��
F
 ���@ �� �E��
 �E ��� �E��
 �E �� ����� �E �� �����F �E �� � H �E��� � M ���M@I@��� � �  �H �F "F�F   �@HF � "��F�DȆ b������FFBbF A� � b� �F��F � �F��� ��B�C�� �F � �FG� �F ��FFBbF A� @��@��� bF A� @��@�� bF A� @��@��F bF J @F��F bF A� �� � bF�I� c A� @��@��� bF A� @��@��� bF  ��� ������ �E M @ �M@����� ����� �E �� �����F �E  ��� ����� �E �� �E� �� ����� �E �� �����F �E �S�A� �� b� �@  ��@��  ����@AH�  AB"A  ����  �B CH "A � H� � "A�	� # A "�� @� �� ȁ bA�AA  @���� � b���� ��B�C� �A �  �A  HB �����HC ₀@� �C�"C �  �B CH� "C � H� � "C�	� #   CEH� � ��E��� "�  V QC����A�� �A� � B�"B � �
  BGH�
 "B ��
  BGH�
 "B �  �B CH� "B � H� � "B�	� # �  �B CH "B �  �B CH� "B 
�BQ�� �� "� B    � M@I�"�J @�� �B b���A� @��� bB A� @���B bB A� � b�	�M@� 	�����S� �HD �C��� ��T @ ��� ������ [�� ��C @��� ������ [�� ��C �� �����D [��� �� �C ^�  ��@� �� � bB�AB  @��� � b������ ����L���B��B �� � �� �BM H� �B��� �����C �B � �B�� �B ���B��B �� ��B�C�B �B �� ��B�C�� �B �� ��B�C� �B � �BG� �B �� ��  �B��� � �� ��B�C�B �B �� ��B�CȂ �B �� ��B�C�� �B �� ��B�C� �B @�@� �� �� bB�AB  @���� � b������ ����L���B��B �� � �� �BM� H� �B��� ����� �B � �B�� �B @��B��B �� ��B�C� �B �� ��B�C� �B � �BG� �B �� ��  �B��� � �� ��B�C�B �B �� ��B�C�B �B �� ��B�C� �B A� @�� @�� �� b@ J  @@� �  b@ A@ b@� I � c  # � f   	       io    open $   /tmp/read-backup-userconf-merge.bin    r    seek    end    set 	      close    luci    sys    exec *   rm -f /tmp/read-backup-userconf-merge.bin    restore_error    err_failed    restore 	   	      read    string    format    %02x    byte    table    concat 	   tonumber    0x 	      printf    length check success    length check failed    /tmp/read-backup-userconf1.bin    w    /tmp/read-backup-userconf2.bin     /tmp/read-backup-commonconf.bin )   /tmp/read-backup-userconf-temp-merge.bin     write 0   md5sum /tmp/read-backup-userconf-temp-merge.bin    match 
   %x%x%x%x+    md5 check success    md5 check failed p   rm -f /tmp/read-backup-userconf1.bin;rm -f /tmp/read-backup-userconf2.bin;rm -f /tmp/read-backup-commonconf.bin Y   rm -f /tmp/read-backup-userconf-temp-merge.bin;rm -f /tmp/read-backup-userconf-merge.bin    require    luci.model.crypto    dec_file_entry    /tmp/read-backup-userconf1.xml 	      <?xml     luci.sys.config 
   xmlToFile    /tmp %   rm -f /tmp/read-backup-userconf1.xml    decrypt userconfig1 success    decrypt userconfig1 failed 0   nvrammanager -e -p user-config1 >/dev/null 2>&1 O   nvrammanager -w /tmp/read-backup-userconf1.bin -p user-config1 >/dev/null 2>&1 0   nvrammanager -e -p user-config2 >/dev/null 2>&1 O   nvrammanager -w /tmp/read-backup-userconf2.bin -p user-config2 >/dev/null 2>&1    set_common_config    /tmp/read-backup-userconf.bin $   rm -f /tmp/read-backup-userconf.bin    md5_product_name    /tmp/tmp-backup-userconf.bin #   rm -f /tmp/tmp-backup-userconf.bin R   dd if=/tmp/tmp-backup-userconf.bin of=/tmp/read-backup-userconf.bin ibs=1 skip=16    get_profile    backup_restore    extern_partition    split         os    execute #   mkdir /tmp/restore >/dev/null 2>&1 F   tar -xf /tmp/read-backup-userconf.bin -C /tmp/restore >/dev/null 2>&1    ipairs    stat    /tmp/restore/ori-backup-    .bin    size    nvrammanager -e -p      >/dev/null 2>&1 )   nvrammanager -w /tmp/restore/ori-backup- 	   .bin -p  (   /tmp/restore/ori-backup-user-config.bin    /tmp/ori-backup-userconf.xml #   rm -f /tmp/ori-backup-userconf.xml    decrypt userconfig success $   rm -rf /tmp/restore >/dev/null 2>&1    decrypt userconfig failed /   nvrammanager -e -p user-config >/dev/null 2>&1 W   nvrammanager -w /tmp/restore/ori-backup-user-config.bin -p user-config >/dev/null 2>&1    /tmp/read-backup-userconf.xml $   rm -f /tmp/read-backup-userconf.xml M   nvrammanager -w /tmp/read-backup-userconf.bin -p user-config >/dev/null 2>&1    call ,   [ -f /sbin/board_restore ] && board_restore 
   reboot...    fork_reboot                     N  R   	   J   @ � �@  b@ A�  b@� I � c  # �       printf 
   reboot...    fork_reboot                     T  |   U   J   @ � �@  b@ A�  � � ��  b@�A  �@ b� ��� �@� �  �A��� ��A� ��  �@BȀ �@ �  �@B�� �� �A���   � � �@ �  �@�A �@ �  ƀ�H� � � �@    �� �M@� �
� �D[��� "���   [�" �M@D��A @B��B � � �bB �   �
  �E"A�   AF �FH� "A 
   @H "A A "A� 	� # # �       printf    reset to factory config    file_flash    factory    require    luci.sys.config    resetconfig 	       os    execute 0   nvrammanager -e -p user-config2 >/dev/null 2>&1 7   nvrammanager -s | grep -wq certificate >/dev/null 2>&1    erase certificate /   nvrammanager -e -p certificate >/dev/null 2>&1    get_profile    backup_restore    extern_partition     split         ipairs    nvrammanager -e -p      >/dev/null 2>&1    reset_and_die    luci    sys    call ,   [ -f /sbin/board_factory ] && board_factory 
   reboot...    fork_reboot                     ~  �    <   A   @@� ��  b@ J   @�� �  b� @@� �� @ �	 �  
��� �  �� �@B H� �@��� � �� HA  ��@ �	 �  ���� "��@D ���"A    A@H� "A � H "� @AE�� ȁ b���� �	 � � ���"A 	 � �   �@@�  �@ #  # �       os    execute F   nvrammanager -r /tmp/merge-config.cry -p merge-config >/dev/null 2>&1    stat    /tmp/merge-config.cry    size 	       require    luci.model.crypto    dec_file_entry    /tmp/merge-config.xml    io    open    r     read 	      <?xml     close #   rm -rf /tmp/config >/dev/null 2>&1    luci.sys.config 
   xmlToFile    /tmp  B   rm -f /tmp/merge-config.cry /tmp/merge-config.xml >/dev/null 2>&1                     �  �       �   � � �� �   
   @[ "�   ��
� A@�� "A�
� �@� "A�
� �@�� "���@ @ �  �  
� A@�� "A��  # �       isfile    unload    load    get_all                     �  �   G   �   A   �  � @�B@��  "��B   ��  [�"�  A 	�
  BA�  ��  "��A  ��b���� ��A�B� �����C  � �� �CBB^�  ��J  F���  � [ bB�J  F���  � [ � bB ��
  C�  ��  "��@C��
  �C�  ��  [�"B ހ  ��# �       pairs    find    ^%.    type    table 	   get_list    luci    util 	   contains 	      delete 	   set_list    get     set                     �  �    �      H@  "� A�  @�� @ � �   b� Y@  ��J � @@� �� b@ J � @@� �� b@ A�  @ � @@� �� �   �� b@ A� b��  �  �� � �@A�@ �@ �  ��C�� �� �  A   �  �  �B��� "��B  ��
  AH� ��W��"�  E���   B BBHB ��W��"B � H� ��"��A �B   ��  b ��� ����  F@��C��  ������F�@����   ����G�[ �� �C  @����CG�[ ����C��� �� [��C ^�   �J�F����bB�ހ   ���  � B�@B�  �@ ��  � B�@BȀ 
 � ��@ � � �@A�@ �@ � � �@AȀ �@ # � "      require    luci.sys.config    luci    fs    isfile    printf T   -----------------------------------------------------------------------------------    mergeconfig() begin    sys    call    touch     parse_merge_config     =====do merge config=====    dir    /tmp/config/    pairs    find    ^%.    /etc/config/     touch /etc/config/    load_old_config    type    table    .anonymous    add    .type    get    set    update_section    commit    rm -rf /tmp/config    mergeconfig() end                     �  �   	7   A   �@  b� �   ��@�  H �� �@  ��� � �@� � � �� �@    ��� �   ƀ�H�  � � �@  � ��@� A � � @A� �� b� A�� �@A� �� b� A��@� b�� A��J A��J  F���� � b� YA    �H A����# # �       require    luci.sys.config    get_profile    global    assign_special_swid    getsysinfo    special_id    0000    assign_special_hwver    HARDVERSION    model    product_name    hardware_version    firmware_version    SOFTVERSION    is_default    isdftconfig 
   totaltime    multi_progressbar    firmware_upgrade    no    region                     �  3   y   �   �@  �� ��@  �  F�� B E  b��M��������� ��  B���A �A� �� ��B�C�  �� �A  @ ��A �� �� �� � �A��� ��B�D�A �� �   ��� �A �A A� @ ��� � ��  B ��  � �� �AE��� ƁEH� � � �A    ��A ���
��F� �B "B �F� Ȃ "B �G� �B  "B��G� Ȃ C "B��G�� �� 	 H� "B �G�� �� C	 H�	 "B �G� ��	 
 H�	 "B BJ� "B�
  �JH�
 "B 
� KHB "B 
  �KH� "B c  � ��  � ��# � 1      require    ubus    connect    nvram_ubus    call    getFwupPercent     percent 	d      mergeconfig    luci    fs    isfile 	c      update_fwuppercent    flash    access    /tmp/firmware_status.lua    dofile    check_status    luci.model.uci    cursor    get_profile    cloud    cloud_support    no    yes    delete    cloud_config    new_firmware    upgrade_info    set    cloud_push    cloud_reply    wportal    upgrade    enable    time    0    info 
   show_flag    commit 
   fork_call    /etc/init.d/cloud_client stop    printf 
   reboot... 
   fork_exec    sleep 1;reboot    err_failed                     5  T    w   
   H   "@ 
 �  @@ H�  "@ 
 �  @@ H�  "@ 
 �  @@ H  "@ 
 �  @@ H@ "@ 
 �  @@ H� "@ 
 �  @@ H� "@ 
 �  @@ H  "@ 
 �  @@ H@ "@ 
 �  @@ H� "@ 
 �  @@ H� "@ 
 �  @@ H  "@ 
 �  @@ H@ "@ 
 �  @@ H� "@ 
 �  @@ H� "@ 
 �  @@ H  "@ 
 �  @@ H@ "@ 
 �  @@ H� "@ 
 �  @@ H� "@ 
 �  @@ H  "@ 
 �  @@ H@ "@ 
 �  @@ H� "@ 
 �  @@ H� "@ 
 �  @@ H  "@ 
 �  @@ H@ "@ 
 �  @@ H� "@ 
 �  @@ H� "@ 
 �  @@ H  "@ 
 �  @@ H@ "@ 
   H� "@ # �    !   ########## killall process start 
   fork_call    killall -9 netifd    killall -9 dropbear    killall -9 ledctrl    killall -9 smartdhcp_monitor    killall -9 wpa_cli    killall -9 wpa_supplicant    killall -9 switch_led    killall -9 klogd    killall -9 ntpd    killall -9 hostapd_cli    killall -9 hostapd    killall -9 logd    killall -9 client_mgmt    killall -9 wireless_button    killall -9 ubusd    killall -9 sysmond    killall -9 imbd    killall -9 miniupnpd    killall -9 crond    killall -9 tmpServer    killall -9 tsched    killall -9 hotplug2    killall -9 tddp    killall -9 dnsmasq    killall -9 dosd    killall -9 factory_reset    killall -9 sh    killall -9 uhttpd     ########## killall process done                     V  j   3   J   @ � �@  b@ J � @�� ��  b@ J � @ � �@ b@ J  @�� @�� � �b� Y    �A  @@� �� � ��� b� �� ���  �@� �@ �@� � � � A�@ �@ � � ��@Ȁ 
�� ��@ @��   � @�� �@ �   �  I � c  # �       printf    upgrade firmware... 
   fork_exec ?   cp /bin/busybox /tmp/busybox; ln -sf /tmp/busybox /sbin/reboot 
   fork_call %   echo 1 > /proc/sys/vm/compact_memory    fs    access    os    execute    nvrammanager -c  	       sysled_twinkle    stop_unused_process    nvrammanager -u  8   upgrade firmware failed. Please check the upgrade image                     }  �      a   
   � � � @�    EA  DA���  �   # �    	   dispatch 
   post_hook        ~  �         ��� � �   � ��   �@@� � �@ � � �  # �       cmd 
   fork_exec                                 �  �       A   @@� @�� �      
   
 � 
  
 �
  
 �b@ J  @�� �  d  c   # �       luci    http    setfilehandler    _index 	   dispatch        �  �   2   �   �@  ���   
� HA  �@�   @���@ �����  �@�
 H�  �   ��� ���@��  �����  �@�
�H�  �   @��  �@�
 H�  �   Y   � ��   � �[� �@��   � ��   �@��@ # � 
      file_flash    upload    name    image    io    open    w 	       write    close                                 �  �           E  �@  Ȁ  _@ ��  �  �  "�  ���# �       entry    admin 	   firmware    call    _index    leaf                             