LuaQ               )Ù      H@  " A     b    ÈÀ  ¢ Á    â   HA " A   b   ÈÁ ¢ Á   â   HB " A   b Â È C  C¢BÂC ¢ ÅB ÄBDÄÂDÄBEÄÂEÄBF HÃ  ÀCÇ â ÙC    ÈÃ !   !D  D !   !Ä  a   ¡D á !Å   Å !    aE  ¡  	 ¡Å  E	 ¡ 	 ¡E Å	 ¡ 
 ¡Å  E
 ¡      
 ¡E Å
 ¡  ¡Å   á   !F   a   ¡Æ   á    !G    a ¡Ç      G ¡  ¡G            	       Ç ¡    ¡Ç      G ¡  Ç È H aH B a       BÈ aÈ         B A  È  b ¡	 áH	       ÂH á	  Â áÈ	  ÂÈ È I a	
     B E    ÅI  
 Ä	 É	 ÅI  J Ä	 É	¡DÉ  ÅI  Ê Ä	 É	¢ÅI  Ê Ä	 É¢ÅI   Ä	 É	£D¡¡I
      É #  H      require    luci.model.uci 
   luci.http    luci.tools.debug    luci.tools.parttbl 	   luci.sys    nixio    luci.model.controller    luci.sys.config 
   luci.util $   luci.controller.admin.cloud_account    module    luci.controller.admin.firmware    package    seeall    cursor    success    747401    file_size_failed    747402    file_content_failed    747403    resore_success    747404    locking    747405    /tmp/firmware_laststatus.log    /tmp/firmware.lock    /tmp/firmware.success    getsysinfo    product_name    TL-WR842v3    remove_cloud_config    merge_cloud_config    index 
   clean_mem    ltn12_popen 
   fork_exec    fork_reboot    file_flash    update_fwuppercent    mtd_update_all    mtd_update_sep    find_default_ip    find_userconfig_ip    config_factory    hard_reset    firmware_index    tmp_reboot    tmp_factory    clean_firmware_inf    0    1    -1    GetShortName    tmp_get_firmware_info    get_upgrade_detail    fw_check_loop    fw_upgrade    tmp_upgrade_firmware 	<   	F      tmp_get_upgrade_info    config    reboot    cb    factory    tmp_cmd    get_firmware_info    upgrade_firmware    get_upgrade_info 	   dispatch *          ;     R    @   #  A@    b @  ÈÀ  ¢ È  M @  A  AHÁ   È WÁ"A A  B ÁBH   W"A  AC[ "AA  B ÁBHÁ W"A  H A È Â A A  bB BÂBÈB ×¢B ^  ý@EÁ ÛbAAA @Â@ÁÂ bA AA @ÁA Û   [Â bA AA @Â@ÁÂÁ ÛÁbA #         require    luci.model.crypto    luci.sys.config    /tmp/user-config.xml    os    execute 
   tar -xzf      -C /  >/dev/null 2>&1    luci    sys    exec     mkdir -p /tmp/backupcfg; rm -f  
   xmlToFile    /tmp/backupcfg    rm -f     accountmgnt    cloud_config    cloud_status 
   cloud_svr    ipairs    rm -f /tmp/backupcfg/config/    convertFileToXml    /tmp/backupcfg/config    rm -rf /tmp/backupcfg 
   tar -czf            >/dev/null 2>&1                     =   [     h    @   #  A@    b @  ÈÀ  ¢ È  A  AHÁ   È WÁ"A A  B ÁBH "A  AC[ "AA  B ÁBHÁ È   W"A A  B ÁBHA   È WÁ"A A  AHÁ   È WÁ"A  AC[Á "AA  B ÁBHÁ È   W"A  H A È Â A A  bÀB BÂBÈB H ×B¢B ^  @ý@ÁF ÛbAAA @ÁA Û   [Â bA AA @Â@ÁÂ ÛÁbA #  !       require    luci.model.crypto    luci.sys.config    /tmp/user-config.xml    os    execute 
   tar -xzf      -C /  >/dev/null 2>&1    luci    sys    exec )   mkdir -p /tmp/restorecfg /tmp/userconfig 
   xmlToFile    /tmp/restorecfg    rm -f  	   ; rm -f     nvrammanager -r       -p user-config >/dev/null 2>&1    /tmp/userconfig    accountmgnt    cloud_config    cloud_status 
   cloud_svr    ipairs    cp -f /tmp/userconfig/config/     /tmp/restorecfg/config/    convertFileToXml    /tmp/restorecfg/config 
   tar -czf            >/dev/null 2>&1 (   rm -rf /tmp/restorecfg /tmp/userconfig                      _   a            E  @  È  _@ À  È  ¢  "  Á#        entry    admin 	   firmware    call    firmware_index    leaf                     c   k         @   @ HÀ    Á ÒÀWÀ " M    	@  	  #  #     	       os    execute    . /lib/functions.sh;     include /lib/upgrade;  #   platform_check_image %q >/dev/null 
   image_tmp                     m   p    	   J   @ À @  b@ J   @À    b@ #        prepare_content 
   text/html    write_json                     r   t        ÅÀ  Ä  Ä@Ä ã  #        success 
   errorcode    data                     v        	   A   @  b   À@È  ¢ Æ@AH âÙ@  @  #  ÁÁ [ Û   "  Àû ÁÁ [A $#  @ú#  
      require    string    io    input 
   /proc/mtd    read    *line    match    %"    mtd%d+                        ¢     q   
     @ H@  "@    À@ H  "@    À@ H@ "@    À@ H "@    À@ HÀ "@    À@ H  "@    À@ H@ "@    À@ H "@    À@ HÀ "@    À@ H  "@    À@ H@ "@    À@ H "@    À@ HÀ "@    À@ H  "@    À@ H@ "@    À@ H "@    À@ HÀ "@    À@ H  "@    À@ H@ "@    À@ H "@    À@ HÀ "@    À@ H  "@    À@ H@ "@    À@ H@ "@    À@ H "@    À@ HÀ "@    À@ H  "@    À@ H@ "@ #        printf    clean memory ...    os    execute J   ps | grep hotplug2 >/dev/null 2>&1 && killall -9 hotplug2 >/dev/null 2>&1 B   ps | grep tddp >/dev/null 2>&1 && killall -9 tddp >/dev/null 2>&1 B   ps | grep dosd >/dev/null 2>&1 && killall -9 dosd >/dev/null 2>&1 J   ps | grep dropbear >/dev/null 2>&1 && killall -9 dropbear >/dev/null 2>&1 T   ps | grep factory_reset >/dev/null 2>&1 && killall -9 factory_reset >/dev/null 2>&1 H   ps | grep improxy >/dev/null 2>&1 && killall -9 improxy >/dev/null 2>&1 B   ps | grep logd >/dev/null 2>&1 && killall -9 logd >/dev/null 2>&1 D   ps | grep klogd >/dev/null 2>&1 && killall -9 klogd >/dev/null 2>&1 F   ps | grep logger >/dev/null 2>&1 && killall -9 logger >/dev/null 2>&1 H   ps | grep openvpn >/dev/null 2>&1 && killall -9 openvpn >/dev/null 2>&1 D   ps | grep pptpd >/dev/null 2>&1 && killall -9 pptpd >/dev/null 2>&1 B   ps | grep imbd >/dev/null 2>&1 && killall -9 imbd >/dev/null 2>&1 D   ps | grep radvd >/dev/null 2>&1 && killall -9 radvd >/dev/null 2>&1 F   ps | grep dhcp6s >/dev/null 2>&1 && killall -9 dhcp6s >/dev/null 2>&1 F   ps | grep dhcp6c >/dev/null 2>&1 && killall -9 dhcp6c >/dev/null 2>&1 E   [ -f /usr/sbin/miniupnpd ] && rm /usr/sbin/miniupnpd >/dev/null 2>&1 L   ps | grep miniupnpd >/dev/null 2>&1 && killall -9 miniupnpd >/dev/null 2>&1 A   [ -f /usr/sbin/sysmond ] && rm /usr/sbin/sysmond >/dev/null 2>&1 H   ps | grep sysmond >/dev/null 2>&1 && killall -9 sysmond >/dev/null 2>&1 D   ps | grep crond >/dev/null 2>&1 && killall -9 crond >/dev/null 2>&1 F   ps | grep tsched >/dev/null 2>&1 && killall -9 tsched >/dev/null 2>&1 B   ps | grep ntpd >/dev/null 2>&1 && killall -9 ntpd >/dev/null 2>&1 X   ps | grep wireless_button >/dev/null 2>&1 && killall -9 wireless_button >/dev/null 2>&1 R   ps | grep cloud-client >/dev/null 2>&1 && killall -9 cloud-client >/dev/null 2>&1 L   ps | grep cloud-brd >/dev/null 2>&1 && killall -9 cloud-brd >/dev/null 2>&1 "   echo 3 > /proc/sys/vm/drop_caches                     ¤   Ö       A   @  b    @À@Û   ¢    "  @AAÈÀ ¢@   @AAÈ    HA ×@¢@   @AAÈ   HÁ ×@¢@   @AAÈ  ¢@   @A@CÈ ¢ MÀCÊ  À ÄA A  b Aâ@ Á  À@ÁÀÁÁ â@ É   ã  Ê  À Ä â@ À@Å  HÁ â Æ [A "A
  DH "A   AA ACHÁ "   MÀC 
  DH  W"A   AA AHÁ "A 	  # 
  DHA "A 
   @ Á@H "   À  AA ACHÁ "   ÀCÀ  AA AH "A 	 # 
  DHA  Û ¢ W"A   AA AHÁ "A 	  # 
  DH "A   AA AHÁ "A 	  # #  #      require    luci.model.crypto    fs    access    luci    sys    exec    mkdir /tmp/check    tail -c +34      > /tmp/check/check.cry    head -c 32      > /tmp/check/check.md5 6   echo "  /tmp/check/check.cry" >> /tmp/check/check.md5 
   fork_call /   md5sum -c /tmp/check/check.md5 >/dev/null 2>&1 	       printf    error:check first md5 failed: 	   tostring !   rm /tmp/check -rf >/dev/null 2&1    decry 	   dec_file    /tmp/check/check.cry    777    dump_to_file    /tmp/check/check.tar    untar =   tar -xvf /tmp/check/check.tar -C /tmp/check/ >/dev/null 2>&1    error:untar fail:    image_check    /tmp/check/check 3   cd /tmp/check;md5sum -c check >/dev/null 2>&1;cd - )   rm /tmp/check/check* -rf >/dev/null 2>&1    result:    error:no target file                     Ø   ì     >      J   @@À @À À  b Y    A  @@Á À  b  FAÈÁ bAM B@ @B@A  ÈÂ b @^@   üJ   @@À @À   b Y   ÀA  @@Á   b  FAÈA bAÙ  À  @FAÈ bYB   A b ÀÃ@ ^@   û#  #     	       fs    access 
   /proc/mtd    io    lines    match -   ^([^%s]+)%s+([^%s]+)%s+([^%s]+)%s+"([^%s]+)"    linux 	   firmware 	   tonumber 	      /proc/partitions (   ^%s*(%d+)%s+(%d+)%s+([^%s]+)%s+([^%s]+)    [0-9] 	                       ð      &   J   @ À bÀ Ê   À@Àâ À Á@"A  a    
      c    @ÀÀ
   A[   AA"AÁÀ "A Á@"A 
   AHÁ  Û  "A #  	      pipe    fork 	       close    dup    stdout    exec    /bin/sh    -c        ø       "   
    @ @  "J  @À   ÈÀ  bÀÊ Ù@  @Y   À  A@ É  Ã     Ö   À@ #  ÀÊ Ù    Ê   ÆÁâ@ Ç ã  #        read 	      waitpid    nohang    exited 	       close                                   $   3   J   @ À b @@ #  
@À  
   @ÈÀ  ¢@     AÈ@  ¢   ÀÊ   ÀÀÁ J  @Ââ@Ê   ÀÀÁ J  @AÂâ@Ê   ÀÀÁ J  @Ââ@ÆÀBâ À @ Æ@Câ@ Ê   ÀÃÁ H   â@ #        fork 	       chdir    /    open 
   /dev/null    w+    dup    stderr    stdout    stdin    fileno 	      close    exec    /bin/sh    -c                     &  (           H@  "@ #     
   fork_exec    sleep 1;reboot -f                     *  /          A@H  Á  "H AA  ÂA[  Û  [" ¢A  B¢A #  	      io    open    /tmp/firmware_status.lua    w R   check_status = {success = %s, errorcode = "%s", data = {totaltime=%d, ops="%s"}}
    write    string    format    close                     1  6          A@H  Á  "H AA  ÂA[  Û  [" ¢A  B¢A #  	      io    open    /tmp/firmware_status.lua    w P   check_status = {success = %s, errorcode = "%s", data = {percent=%d, ops="%s"}}
    write    string    format    close                     8  H   6   H     @  À  À A ¢ @	ÀAAÆÁHÂ  â BÂ "Û Â @CBC P" J  @Ã@ÂÃ ÛÂb Y  AB @ÄÈÂ b ÅÀ[ B Û HÃ  È WÀ  Àõ  È@ WÀ   Á@  £ #     H   echo 'updating...' >/dev/console;cd /tmp/check;mtd erase flash_ipq806x;    needreboot 	      ipairs    part    name    gsub    0:        match 	   ([%w_]+) 	   tostring    offset    boardinfo_end    fs    access    /tmp/check/    string    find 	   parttbl      mtd write      flash_ipq806x     -n -p     ; R   mtd erase parttbl;mtd write parttbl parttbl;echo 'reboot...' >/dev/console;reboot                     J  e   R   E    È@    HÁ   ÈA  HÂ  _@@ Û  ¢ Ê  ÀÂÀÁÂ [ Bâ Ù  @È ÂA Ê ÀÁÃ [ B Û  [ Ã Û ÂâA   ù   BÀBÈ  ¢    @  @EÈ ¢@ À @   ÀCÈ  ¢@   @EÈ@ ¢@ @ C@  @EÈ ¢@ À ¢@   C@@ È Á A A ¢@@ £  #  "   
   boardinfo    profile    defconf 	   softinfo 	   userconf    HLOS    extern    webpage    log    ipairs    fs    access    /tmp/check/    needreboot 	   
   fork_exec    mtd erase     ;mtd write /tmp/check/          -q -n;rm /tmp/check/    /tmp/check/rootfs    printf    upgrade rootfs 	    d   cd /tmp/check;mtd erase rootfs;mtd write rootfs rootfs -q -n; echo 'reboot...' >/dev/console;reboot    upgrade end 
   reboot...    fork_reboot    checkerror    file_flash    false 
   err_check    total    reboot                     g  }     6     HA  " A  @ÁÀ bA A  @ÁÀA bA A @ÁÁ ÈA bÂÂ ¢  Ã¢A   Á@ÈA ¢A H À A DÛ   HÂ  ¢Û  Â  H  @ A DÛ HÂ  ¢Û  Â  ã  #        require    luci.model.crypto    os    execute L   nvrammanager -r /tmp/default-config.tar -p  default-config  >/dev/null 2>&1 ;   tar -xzf /tmp/default-config.tar -C /tmp/  >/dev/null 2>&1    io    open    /tmp/default-config.xml    r    read    *a    close _   rm -f /tmp/default-config.cry  /tmp/default-config.tar /tmp/default-config.xml >/dev/null 2>&1    <interface name="lan">    </interface>    _    string    find    (.-) 	   <ipaddr> 
   </ipaddr>                            <      A@H  "A Á   AHA  "FÁAÈ b FABbA A  @AÀ bA G Á H  @ Á ÀÁÃ  [  Û WÂ âÛ  [M@ÄÀ@D   H À Á ÀÁÃ[  Û WÂâÛ  Â M@Ä@÷ã  ÀöÇã #        os    execute F   nvrammanager -r /tmp/user-config.xml -p  user-config  >/dev/null 2>&1    io    open    /tmp/user-config.xml    r    read    *a    close +   rm -f /tmp/user-config.xml >/dev/null 2>&1 	       <interface name="lan">    </interface>    string    find    (.-)  	   <ipaddr> 
   </ipaddr>    _                       ¢      A   @@À    È  bÀ  Û   ¢  A @Á   H A¢@ÀÁ ¢@ #        io    open    w    type    string    write    
    close                     ¤  «          A@  @À    ÈÀ  bM@ À @Á  ¢  #  #            io    open    r     read    *line                     ­  ³           @@ J     "MÀ@ F A Ê  A × b@FA b@ #        io    open    w     write    
    close                     µ  »       
     @  @@ J  "     	  #  @ 	   #  #        fs    access                     ½  Á       
     @  @@ J  "     
     @  @ J  "@ #        fs    access    unlink                     Ã  É           @@ J     "MÀ@ F A Ê  A × b@FA b@ #        io    open    w     write    
    close                     Ë  Ñ       
     @  @@ J  "     	  #  @ 	   #  #        fs    access                     Ó  ï    N   H   @  Á  ÀÀÀ [ Aâ@ Á@ ÀÁ HÁ âMÀ AÂ "M @G ÁÁ ÀÃ [  âÁ [M@ÀM@ÈA  GÃ  ÃC[ "AÄ @ÃÈ bÄ 	[M@@MÀAÄ @ÃÛ bÛ	D BD A b    ùM @  ò   Á@HÁ  W"A £  #        /tmp/partition.txt 	       os    execute    nvrammanager -s >     io    open    r     read    *line    string    find    (.-),()    size%s*=%s*(.-)%s*Bytes    gfind    size    _ 	   tonumber    rm                      ñ  >   Ñ   A   @  b    @ÈÀ  ¢@   @AAÈÀ ¢@    @È  ¢@   @AAÈ@ ¢@    È ¢ ÀB¢ Á    â  I BC ÈÂ  "FBCÈ Ã HC bMD @ ÀD @ 	   	    EÈB  ¢BE@ BAÂEÈ ¢B  B Û ¢ MF B Û¢ F  ÂF¢B   È ¢ ÂB¢   BC HÃ  ¢ BC HÃ C ¢[ B Û ¢ MF B Û¢ FÀÇ¢ ÁB  â Ç ÀFA   ÀÂÇ â ÛI  È ¢B BH HÃ ¢ B     MD Ê ÀÉ HC	 âÁ	  â MÄÄ	  JHD
 È
 WÄ"D Þ   ýÁ ÀBÁÀÁÃ
 âB Á ÀBÁÀÂÅ âB ÀBË âB Á   â ÀÂÂâ  EÁ ÀBÁÀÂÅ âB ÆÂKH Ã È  âB ÆLH âBÅ ÆÂKH Ã ÈC D âB ÆLH âBÀÌ [âBÊ  ÀÀÃ âB Á C âB #  6      require    luci.sys.config    printf    reset to factory config    luci    sys 
   fork_call    ledcli led_all_on    erase usb...    nvrammanager -e -p usb-config    luci.model.uci    cursor    luci.model.accountmgnt    get    cloud_config    device_status    bind_status    need_unbind     true    print    complete_flag:     call 0   cp /etc/config/accountmgnt /tmp/accountmgnt_bak 	   tonumber 	      cloud_unbind    get_cloud_username    type    table    get_password    resetconfig    get_profile    backup_restore    extern_partition    split         ipairs    os    execute    nvrammanager -e -p      >/dev/null 2>&1 !   /etc/init.d/logd stop ; logreset ,   [ -f /sbin/board_factory ] && board_factory    reloadconfig 0   cp /tmp/accountmgnt_bak /etc/config/accountmgnt    set    commit    1    set_cloudAccount 
   reboot... 
   fork_exec    sleep 1;reboot                     @  B           H@  "@ #        config_factory    true                     D  ð    ¥      H@  " A     b    À@ AÈ@ ¢ Á ÀÀÁ â M@Â  É@  É   HÁ  ÈA  HÂ  HC  ÈC  AD @Ä@ÄÄ¡  
               
  
 bD AD @Ä@ÅD b D D	E	È ¢ Á  Å â E aE  
    	
  
   	Ea  
    
  EaÅ    
 
    
    Ea  
  
 EaE  
  Ea 
  
  
 
  
 EaÅ 
  
   
  
  
  
  
 Ea 
 
         
  
  
 EaE 
   
  
      
   
 E@J   ÈE  b Û
 @E
Y   
¢E  É  Æ EF  DF¢ Û  @A @ÅÁ
	 Û ÅbE MÀ JbE #  &      require 	   luci.sys    luci.fs    fs    access    /lib/upgrade/platform.sh    os    execute /   grep '"rootfs_data"' /proc/mtd >/dev/null 2>&1 	       tar -xzC/ >/dev/null 2>&1 )   sysupgrade --create-backup - 2>/dev/null    /tmp/firmware.bin    /tmp/config.bin 	È   	_   	    luci    http    setfilehandler 
   formvalue 
   operation    form    luci.sys.config    read    check    fwup_check    reboot    factory    backup    restore 	   firmware 
   checklast    file size exceeds     
   not exist    rm   
       `     L   Ê   â Ù@  Ê  Ù@  ÀÁ   A  H   ÈÁ  â@   @À A @Á Ê  Ã @ Ê Ã Á ÀÀÁ
H âÃ  È@ Ã  Y    	Ê   Ñ Ã  Ê  
  Ê  ÆÂ[ â@ÀÊ  À Ê 
  ÁBâ@ Ê  Æ Ãâ@ Á@ ÀÃÁ JAâ@ Á ÀÀÁ
H âÃ  È  Ã      Ê  Æ Ãâ@ #        file_flash    true        upload    name    image    io    open    w 	       write    file_size_failed    close    os    execute    rm  	                         ³    _   
    @ @  È@  " J   FÀ È@    HÁ  b   @A  [   ¢Ê  @Á Á ÀÀÁ J A â@ Ê  	 H  ÊÀÃB â ÁÊÀÃÂ â ÁÊ  ÆÀHB  ÈÂ âM Å É  @ ÉA  É Áâ Ã Ê   ÆÅHA  ÈÁ Â â@ Ê   Æ ÆHA â@ÀÊ  @ÆÁ ÀÀÁ J A â@ Ê  	 H A  Aâ Ã @Ê  	  H  â Ã #     
   get_first    system    get    restore_time    firmwareUp_time    upgrade    os    execute    rm -f      >/dev/null 2>&1        hardware_version    getsysinfo    HARDVERSION    firmware_version    SOFTVERSION    is_default    quicksetup    quick_setup    to_show    true 
   totaltime    set    false    commit    config 
   not exist                     ´  ¼       
     @  @@ H  "    @À  H  "@     
  I  @ È@ "   #  #        fs    access    /tmp/firmware_status.lua    dofile    check_status                         ½  î          H@  " @@ b À  Æ Á [ A Å  âMÁ ÁÁ  
    
  ABH   W"A Á H A Ê   "A
  ABHÁ "A 
  D ADH "   @
  ABHÁ "A  H "A A @
  ABH "A 
 I A ÈA " #  @
  ABHÁ "A 
 I   ÈA " 
  @F@
  ABH "A   HÁ "  G" J @Ä@AÄb YA  
J @AÂÁ bA FAGÈ Â bA FAGÈ  bA FAHÈ Â H bAFAHÈ  HÂ bAFAHÈ	 B	 H	 Â	 bA FAHÈ	 B	 H
 B
 bA FAHÈ 
 HÂ
 B
 bA FKÈ bAJ @AÂA bA @
 I   ÈA " #  /      require    ubus    connect    nvram_ubus    call    getFwupPercent     percent 	       printf &   =======fwup_check==========percent =     update_fwuppercent    true        flash    1    fs    access    /tmp/firmware_status.lua    2    dofile    check_status    3    4 	   err_form 	d      upgrade true    luci.model.uci    cursor    delete    cloud_config    new_firmware    upgrade_info    set    cloud_push    cloud_reply    wportal    upgrade    enable    yes    time    0    info 
   show_flag    commit 
   reboot...    permission denied                     ï  ó       
  I     É  "    
   @@ H  "@ À  "@ #            printf 
   reboot...    fork_reboot                     ô  û          " J    È@  A   b C   AÀ    @AAÈÀ ¢  b@  #        find_default_ip        default_ip    config_factory    luci    http 
   formvalue    all                     ü  "    }   
    @ @  È  " @       MÀ@ @J  @ Á    È@ b  A @ÀÁ   b@ A@    b ÀMÀÀ@ ÁBCÈA H ÈÂ ×Á¢A ^  @üA @ÀÂ @ Ã   b@ A@  b@ A @ÀÁ À b@ A @ÀÂ @ Ã   b@ ÀA @ÀÂ @ Ã @ b@ A@  b@ J  @ÀÅ   b@ A@  b ÀÆ È  HA ¢@  ÈÀ ¢ Á À ÈÀ@È E  ÁBI¢ Á ÀAÉ	 â _A  RAâ@Á À ÈÀÀÉ
 â@ Á À@ÊÀÊÀÀÊ A @È@Ëâ@Á ÀÀÂÀ ÃA â@ Á ÀÀÂÀ Ã â@ Ê 
  ÁKâ@ #  #  0      get_profile    backup_restore    extern_partition     split         os    execute (   mkdir /tmp/backupfolder >/dev/null 2>&1    ipairs    luci    sys    exec .   nvrammanager -r /tmp/backupfolder/ori-backup- 	   .bin -p      >/dev/null 2>&1 \   nvrammanager -r /tmp/backupfolder/ori-backup-user-config.bin -p user-config >/dev/null 2>&1    remove_cloud_config -   /tmp/backupfolder/ori-backup-user-config.bin ;   tar -cf /tmp/backup -C /tmp/backupfolder . >/dev/null 2>&1 )   rm -rf /tmp/backupfolder >/dev/null 2>&1 ;   nvrammanager -r /tmp/backup -p user-config >/dev/null 2>&1    /tmp/backup    printf    encry    require    luci.model.crypto 	   enc_file    /tmp/backup.cry    0123456789abcdef        ltn12_popen    cat /tmp/backup.cry    http    header    Content-Disposition (   attachment; filename="backup-%s-%s.bin" 	   hostname    date 	   %Y-%m-%d    prepare_content    application/x-bin    ltn12    pump    all    write    rm /tmp/backup    rm /tmp/backup.cry    success                     #  |  
  $     H@  " A     b À  È  A J  FÁÈÁ  b YA    GM@Â@* BÛÂ ¢[   C@$ACÈ ¢A ÁC Ê  H ¢A A DÈÁ ¢A A DÈ  HB ×A¢A  Û¢
M@B 
ÀÂÅ  [ C â ÀÆ
[ " À  A @CÇ@ÇÃ Û  bC A @CÇ@ÇC Û  [  bC ÀA @CÇ@ÇÃ Û  bC   ôÁ È	 ¢A Û¢ ÀÁÅ 	 â  Æ @	 Æ
 BCHB	 "B   BG GH	 "B   BG GHÂ	 "B 
 BCH
 "B 
I B
 ÈB
 "  
 J@Ê"B 
 BCHÂ
 "B  "B @
I  B ÈB
 "  
 J@Ë"B 
 BCHÂ "B   BG GH  W"B   BG GHB "B  É   HB
 ¢   ÊÀÁÌ¢A ACÈ ¢A @Û¢ Ê BM  ÊÀAÃ âA ÀÁC 
 [  âA ÁÁ  âA ÀÁÅ  â  Æ  
 Æ@	
 BCHB	 "B   BG GH	 "B   BG GH  ÈÂ WÂ"B 
 BCH
 "B 
I B
 ÈB
 "  
 J@Ê"B 
 BCHÂ
 "B  "B @
I  B ÈB
 "  
 J@Ë"B 
 BCHÂ "B   BG GH  W"B @Ê	  H B
 â Ã Ê 
 ÂLâA ÊÀAÃ âA #  8      require    luci.model.crypto    luci.fs    /tmp/backup    user%-config    user-config    get_profile    backup_restore    extern_partition     split      	À'	    printf    decry 	   dec_file    0123456789abcdef        os    execute #   mkdir /tmp/restore >/dev/null 2>&1 	   tar -xf  !    -C /tmp/restore >/dev/null 2>&1    ipairs    stat    /tmp/restore/ori-backup-    .bin    size 	       luci    sys    exec    nvrammanager -e -p      >/dev/null 2>&1 )   nvrammanager -w /tmp/restore/ori-backup- 	   .bin -p     merge_cloud_config (   /tmp/restore/ori-backup-user-config.bin    restore 2   nvrammanager -e -p  user-config   >/dev/null 2>&1 [   nvrammanager -w  /tmp/restore/ori-backup-user-config.bin -p  user-config   >/dev/null 2>&1    restore configs        resore_success 
   reboot...    fork_reboot    file content error    file_content_failed    Decry file failed    rm     rm -rf /tmp/restore    file size exceeds    file_size_failed $   Upload file is too large, plz check 	      nvrammanager -w  #    -p  user-config   >/dev/null 2>&1                     ~  À    2   
     @ H@  "@ 
   @  À@ J  "    
     @ H  "@    J @@Á  Ê  Á  b   M B  J    È@  b C  #   
     @ HÀ "@ #  
  J @ Ã "@ 
 I   È "   #        printf    upgrade firmware...    fs    access    true 
   fork_call    nvrammanager -c      >/dev/console 2>&1 	    	   err_form        false    success                     Â  Ø    c   
   " M  @  J     È  A  b C  J @ÀÀ   @J  @ Á @ Ê   b@ J    È@  A  b C   J @ÀÁ   @A  b   É  A  EA  DA¢   	J @Â   J     ÈÀ A  b C  ÀJ @ Ã   J     È@ A  b C   J @Ã   J     È A  b C  @J     ÈÀ A  b C  J  @ Ä @@Ä  b Y   A @ÀÄ   Ê A  b@ #             permission denied    success 
   fork_exec    /sbin/sysupgrade     > /dev/console 2>&1    resore_success    find_userconfig_ip    default_ip    file_size_failed    file size exceeds    file_content_failed    file content error    locking    unknown error    fs    access    os    execute    rm -f      >/dev/null 2>&1                                 ò  õ       
     @ H@  "@   "@ #        printf 
   reboot...    fork_reboot                     ÷  E    Ü   
     @ H@  "@    À@   A H@ "@  HÀ " J   @ À   b@ A  @ÀÀ @ Á @ b@ A  b @ÀÂ b  È  ¢ Ç 	 G ÆAÃ H Â È âBÃ  ÈÂ C "A MÀÄÀ A @ÅÀÄ@ É  @A MÀÄ@A @Å@Å@ É    É   J  @ÅÂ ÛbB Æ@A  @ÂÀ@BÆ bB  AÂ b M Ç AÂ  b  Ç J @BÇbB A  b @ÂÂb [ FBÃ È Ã H bÛFBÃ È Ã HC bAÂ b M Ç AÂ  b  ÇÀ@Gb Â Û¢  H ÇZA   [BHÛ¢  	  @H bB FÂÈ È	 C	 b YB    GMÀÄ  IÛÃ	 ¢[ 
 Û¢ MÀDÁC
 ÀÊÄ
 [  âC    ý  Â@AÈB ¢B   Â@BFÈ ¢B ÂK ¢B  È ¢ ÂB¢ [   Æ  Â@BFÈ ¢B BÌ  HÃ  Û¢B Ì  ¢B F BÌ  HÃ C ÈÃ ¢B Ì  ¢BMÛ ¢B  @ÈB ¢B  ¢B #  7      printf    reset to factory config    luci    sys 
   fork_call    ledcli led_all_on    require    luci.sys.config    erase usb...    nvrammanager -e -p usb-config    luci.model.uci    cursor    luci.model.accountmgnt    get    cloud_config    device_status    bind_status    need_unbind    form     all    true    print    complete_flag:     call 0   cp /etc/config/accountmgnt /tmp/accountmgnt_bak 	   tonumber 	      cloud_unbind    get_cloud_username    type    table    get_password    resetconfig    get_profile    backup_restore    extern_partition    split         ipairs    os    execute    nvrammanager -e -p      >/dev/null 2>&1 !   /etc/init.d/logd stop ; logreset ,   [ -f /sbin/board_factory ] && board_factory    reloadconfig 0   cp /tmp/accountmgnt_bak /etc/config/accountmgnt    set    commit    1    set_cloudAccount 
   reboot...    fork_reboot                     G  S     -      H@  "  @ " FÀ@ È  A b@ FÀ@ È   b@ FÀA È  A H b@FÀA È   HA b@FÀA È Á H A b@ FÀA È Á H Á b@ FÀA È   HA Á b@ FD È  b@#        require    luci.model.uci    cursor    delete    cloud_config    new_firmware    upgrade_info    set    cloud_push    cloud_reply    wportal    upgrade    enable    yes    time    0    info 
   show_flag    commit                     X      k   M @ @  À   #  Û     E  ÈA   @  À Â  [ Â    CA["HC   À A@ HÃ    À  B@ HC  À ÀB@ H    À @C@ H  À  D@ HC    ÀD  H  @@Á ÀCÅ[DÄ@	â ÑCÐÂÀ@ÑÁÀÁ ÀÃÅ[ âCÁ ÀÃÅ HÄ  âCÂîÀ @ H  Â  ÖÃ  Â ÀCÂ@   CQý ÈB À#  #      	    	   	      string    byte 	   	À   	ß   	   	à   	ï   	ð   	÷   	   	ø   	û   	   	ü   	ý   	      sub    table    insert        ...                       ®   T   A   @@ b   ÈÀ  ¢  Á À Ê   À@Á â@ Å   
  ÁA" A   b ÂÈÁ ¢ A     ÄCÂ H B ¢A     ÄAÃ CÂÈA ¢ A     ÄCÂ H  ¢A     ÁÁ  H âÊ ÀÅÀÁÅ â ÄÀÆCHÂ B È âÙA    ÈÁ ÄÀÆCHÂ  ÈB âÙA    ÈÁ ÄÀã  #     	   tonumber    needToCheck    require $   luci.controller.admin.cloud_account 	      call    cloud_getFwList    cursor    luci.sys.config    name    getsysinfo    product_name        version    get    cloud_config    upgrade_info    SOFTVERSION    release_log    GetShortName 	      releaseNote    bin 
   b64encode 	   isLatest    new_firmware    fw_new_notify    0    upgradeLevel    type                     °  Ô   L      È@  ¢ À@â Á  FÁÛ B E  b MÁÀ
ÁÁÁ B J   È âAÊ ÀÁÂÀÃB â Ù   Á B âA AÀ  É  ãÀ   @Ê ÀAÄ âA ÁÁ âA Ê ÀAÄ âA ÊÀAÅ âA Û  ã Ê ÀAÄÂ âA Á  J B È âAÊÀAÅ âA É  Â ã#        require    ubus    connect    nvram_ubus    call    getFwupPercent     percent    update_fwuppercent    true    flash    fs    access    /tmp/firmware_status.lua    dofile    check_status 	d      printf    upgrade true    clean_firmware_inf 
   reboot... 
   fork_exec    sleep 1;reboot    upgrade false    false 	       ledcli STATUS_ON    err_failed                     Ù  à       A   @  b À Û   ¢ @   ÈÀ  	  ã À A	 ã #        require $   luci.controller.admin.cloud_account    get_download_detail 	       percent                     â       N   
     @ H@    "   ÀJ   @ÀÀ    Ê   À Áb@J   @ÀÀ    Ê   À@Áb@J   @ÀÀ    Ê   ÀÁb@FÀA b @ @ F@B b@ H   Ê  ÀÀÂ â@ Ê  	  âÀ   [ @C  #  Á  â À Ê  À Ä â@  Ê  À Ä â@  úÊ À@Ä â@ Ê  À Ä â@ ÈÀ Â Ê  À Ä A Aä  ã   #        open 
   /dev/null    w+    dup    stderr    stdout    stdin    fileno 	      close    0 
   fork_call    sleep 3  	   tonumber 	d      call    set_download_inf 	   filename    /tmp/cloud_up.bin    /sbin/sysupgrade                      	            H@  " @À@ b @  I     c @@A  b    ÀA¢  B Á@ â@  É   ã #  
      require $   luci.controller.admin.cloud_account     cloud_fw_upgrade    illegel download url    get_download_progress    /tmp/cloud_up.bin    fork 	       fw_check_loop                       $       
     @ " @@ @ I   c  A  @ÀÀ   b@ A@ d  c   #        check_internet     os    execute    touch /tmp/tether_up    fw_upgrade                     (  <          H@     Ê   ÀÀ	  â Ù@  ÀÁ  ÀÁ¢ @A  H@   À  ÀÁ¢ [   @   £  #        idle    0    get_download_detail 	   tonumber    percent 	d      fail    downloading 	   tostring    status    process    upgradeTime    rebootTime                     L  T      a   
      @Ê    EA  DA¤  £   #     	   dispatch 
   post_hook        M  R          À    À    @@À À ¢@   £  #        cmd 
   fork_exec                                         