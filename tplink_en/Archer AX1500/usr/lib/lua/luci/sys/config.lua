LuaQ                k     A@    b @ A@  À  b @  È  ¢ Á@  A â  Á" AA  Á b A  È ¢ ÁA  B â B  H " AB  Â b   á  ÂÁB  AÃ  ÁC  AD  Ä Á E A Å È ¢E ¡E       	    
á     HF  ÈÆ FE ÈF  _F¡Æ   	    Æ ¡   	    ¡F          	 	  F ¡          	 	   ¡Æ   	  á  	   
!G            Ç !  
   	 !Ç  
   G	 !  	 !G  Ç	 !      
 !Ç           G
 !        
 !G       	     Ç
 !      !Ç          
G !    !G   Ç !     !Ç        G !       	     !G       Ç !    !Ç        G !      aG             B a        BÇ aÇ          B a    BG aG   B a       BÇ aÇ     	B a	       BG aG	       B a	           	 BÇ aÇ	         B a
           BG aG
         B a
       BÇ aÇ
              	B a  ¡G  á     ÂG áÇ      Â á      ÂÇ áG       Â á     ÂG áÇ      Â á        
   	        ÂÇ áG        Â #  M      sys    require 	   luci.sys 
   luci.util    luci.fs    luci.model.uci    cursor    luci.model.accountmgnt    nixio    luci.model.checktypes 
   luci.json    bit    printf    type    os    string    io 	   tostring 	   tonumber    pairs    ipairs    table    pcall    module    luci.sys.config    &    <    >    amp;    lt;    gt; 
   toEscaped    toOrig 
   fileToXml    convertFileToXml    old_xmlToFile 
   xmlToFile    restoreXmlToFile    switch_mode_locked    reset_factory_locked    factory_saveconfig    saveconfig    get_remodel_para    resetconfig    eraseconfig    isdftconfig 
   isupgrade    clear_upgrade_flag    load_old_config    parse_merge_config    merge_country_profile    get_mf_wifi_channel    get_pin    merge_mfconfig    reloadconfig    getsysinfo    reload_profile    get_config    get_option    merge_country_config 	   set_SSID    get_default_config    revert_country_config    reload_country_profile    merge_config_by_country    merge_onemesh_config    merge_rtor_wireless_config    remodel_ap_merge    merge_old_config_onemesh_v2    login_validity_check    wirelesskey_validity_check    wireless_ssid_check    static_ip_validity_check    static_mask_validity_check    pppoe_validity_check    agile_config_encryptFileName    agile_saveconfig 6                  A   @@À   ÈÀ  b Á A [  " ¢@   Á  ¢@ÀÁ ¢@ #        io    open    /dev/console    w    write 	   tostring    
    close                     %   7    0   Y@  @    [      @Û   ¢ @Ê  ÀÀÁ  â@ Ç ã  Ê   â ÀM Á@M@ÁÀ  H J  @ÂÁ b Y   J Û bB J @Â ÛbBÞ  @ùc  #  	      dir     printf (   [getfilenames] error : filetable is nil    .    ..    \    isdirectory    insert                     9   D    	   J      b   @@È  ¢ ÆÀ@H âÙ@  @  #  AÁ [ Û   "  Àû AÁ [Á $#  @ú#        string    input 
   /proc/mtd    read    *line    match    "    mtd%d+                     I   T        @ @ H@  c  [      Ê  ¢  Ê ÀÀ HÂ   È WÂB ÊÀBÂâ [    üc  #             gsub    (    )    &                     V   n    E   [      Ç 
   A@[   "Û  Ù    À J  @Á ÈA BÁb @
   A[ AÁ"[  
 J "ÀJ  @BÀ È  ×bÂÂ B A Y  ÀJ  @Á ÁÂ ÑBÁb[ [ Â@   @ù
   A@[   "Û   ò [ @£  #  	          find    & 	       sub 	      xx    yy    ^                     p   ®    #Á   J      b   @@¢ À  Ê  ÀÀÀ â@ #  @  Ê  ÀÀÀA â@ #  Ê ÀÁ  HÁ âÀ
  Á@H   W"A #  AÂ "AAÂÁ "A
 [ " #FCÛ bY  ÀBÂC A  b Ã ¢B  Ê â  ÄDDÂÞ  þÊ â Ä   DÂD Á  ÅÄâ Å 	"DÀDÂD Á  ÅÄâ  A EÅb  	"D
 [" J  
b ÀÅ
 FEÂÈ bEJ 
bÀFÂG A 	b G Á â  A 	b È ¢F^  @ûFEÂÈÅ bEJ	b FÇ
b M@Ç
ÀFEÂÈE  [	" HF  Û 
¢ È  [	" HÇ ×EbE   ñDÂ Á  ÅÄâ Å 	"DÞ  çÆBÂH  Û ¢ ÈÃ WÃâBÀBÂC A  b  ¢B   ÜAÂÁ "AÈ"A #  !      /etc/config    cursor     printf !   [fileToXml] error : files is nil    error xmlpath is needed    open    w+    error open file failed:    write (   <?xml version="1.0" encoding="utf-8"?>
 
   <config>
    get_all    < 
   toEscaped    >
    .index 	      .anonymous    .type     name="    .name    ">
    table    <list>
    >    </ 	   </list>
    byte 	.      />
 
   </config>    close                     ±   ö    %Î   Ê   À Àâ M@À @ @@  
  @HÁ  "A #  
  A[ A "@@J @À Û ÁbA #  J  b  @@J @ÀÁ Û  ÁbA #  FBÈA bAFBÈ bAJ  b %ÂÂ¢ ÆÃ[  âBÆBÃ[âÃ "CÙ  ÀB ÁÃ â  "C  J b DÄD	C	^  þJ bÄÄ   B AÅ Åb  
¢DÀB AÅ Åb E ÁÅ  Åâ Æ 
¢D Û¢ Ê  â  Æ ÆBHF âEÊ âÀB ÁÇ 
â  AÈ b È ÁÈ 	
â 	 	"GÞ  @ûÆBH âEÊ
â ÆEÇâ MÇÀÆBH Æ Û
¢ È Ç [ " HÇ Ç Û
¢ È WÆâE   ñBÅ AÅ Åb  
¢D^  çFBÈÃ Ä [" H ×CbCÀB ÁÃ â Ä "C^   ÚFBÈ bAFAHbA #  "      cursor     printf    error xmlpath is needed    open    w+    error open file failed:    error get files in filepath:     write (   <?xml version="1.0" encoding="utf-8"?>
 
   <config>
    get_confdir    set_confdir    get_all    < 
   toEscaped    >
    .index 	      .anonymous    .type     name="    .name    ">
    table    <list>
    >    </ 	   </list>
    byte 	.      />
 
   </config>    close                     ù      j   E     È@    HÁ  _@   È  A H Á @ Ê   À Â  HA  â  Ê   À Â  HÁ  â  Ê   À Â  HA  â  Ê   À Â  H  â  Ê   â  
   ÂC[  "  @@ @À 	J  @ÂÃ  È b  ÂCÛ  C ¢ÀÅ  Ã @ " ÄÃ J  @Â  ÈC  b "  Äã Ê ÀÂÅ [  CâB Çã @E  Â À ¢ DÂ Û ¢ Dc Þ   ñÇ ã  #        empty    single    end    new    <(.+)/>    <(.-)>(.-)</(.+)>    </(.+)>    <(.+)>    gsub    (')    '\''     modify="no"         merge="no"     remodel_%a+="%d"    match    <(.-)>.-</.+>    <.->.-</(.+)>    key    toOrig    value    <(.-)>(.-)</(.-)>    %1 '%2'    printf    error line.                       S      [    È   A  H  Á  È @Å A H Á ß@ Ê  â@
  B[ "  @B  FÂ ÈC bÊ ÀÄÂ	 [ âDÊ ÀÄÂ	 [âDÊ ÀÄÂ	 [ 	âD^Ã  û@CBM Ã@CCM ÃÀ @CBCCM@ I  c J   b  B	ÀDB¢  @   £ ^   ýI c CÀ
  ÃC[ C È " [ 
  [ " J @ÂÛ bY  @ I  c    ý	 # @CÀ
  ÃC[  È "  
  [ " J @Â Û bY  @ I  c    ý	 # 	 # Þ  ÀâÉ  ã #        |    %.%.    ;    &    '    <(.+)>(.+)</(.+)> 
   ^</(.+)>$ 	   ^<(.+)>$    match 	      gmatch    insert  	   	      sub 	þÿÿÿ                    U     ²   Ê   À À  HA  â  G   À Y   @ Ù@  @ 	  # C a  
       CaC    
      
      Ca    
    
  CaÃ        
  Ca   
  CEC ¡C 
  D¡    
  D¡Ã       
  D¡      
  D¡C       
  D á     ÃáÃ    Ãá     ÃáC     ÃÈÃ  I Ã¢À   ECÈ 
×¢E  
ÀC  Û
¢ Û  Ä ECÈE 
×¢E ÈÃ Ä Û
¢ [ Y  @ÅÄÀÅ¢     ECÈE 
×¢E    
È D  @óA  @B  À YB  @   @ DC	È 
 [ " J  b  Û¢ Ê  â ×Ä	¢D I  ÄÅ¢D c #        open    r    dir    file    config    option    list    empty    end    single    new 	       lines    printf    error unkown line:      find error illegal line:  	      key    value    error operation failed:  8   error:config is not finish(filefp,file,config,option):     close        b  h          @È@  
 H    ×¢@   Y   @ À   #        execute    mkdir     /    file                     i  x                 @È@    × ¢@   £  Y    À        AÊ A J A Ê×À ¢         Àÿ#        printf     error last file is still open.  	      config    open    /    w                     y     F         @   Ê   Æ ÀHA  â@Ê  ÀÀ  HÁ  âÙ   
  @ Ê ÀAÁ  H Â â B  "A
  @[   "  
  @ Û  B  "AY   @A  
  
  BHÁ È   W"A A # @ À  BÈ   × ¢@ @ £  #        write    
    match    name="(.+)"    config     gsub    (.+) name="(.+)"    %1 '%2'    (.+) name=".+"    option    printf    error     config not closed. new:  	       error:no file is open, config:                                    @Y   À        À   @@  [  Á  ¢@À  AÈ@   × ¢@  £  #        list    write        option     
    printf     error:no file is open, option:  	                          §      J   Y   ÀJ   F À È@    H  ×@b@ÀJ  @ÀÀ   Û   À b@ H@ c  #        write 
       list     
    printf    error:no file is open, list:  	                       ¬  ®      J   @ À @  b@ #        printf    error where to go ?                     ¯  »      J   @   H   C  G  C   ÀJ  @@À   Û   À b@ HÀ  c  #        dir    printf    error dir end. 	                       ¼  Æ      J   @   J  Y   @J  F À b@ G  C  G  C   H@  C  ÀJ @À À  Û   À b@ H  c  #        close    file    printf    error file end. 	                       Ç  Ï      J   @  ÀJ  Y    H   C  G  C   @J @@À   Û   Á  J  @b@ H  c  #        config    printf    error config end.      !=  	                       Ð  Ø      J   @  ÀJ  Y    H   C  G  C   ÀJ @@À   Û   À b@ HÀ  c  #        option    printf    error option end. 	                       Ü  Þ      J     @    É   d c   #                          ß  á      J     @    d  c   #                          â  ä      J     @    É   d c   #                          å  ç      J     @    É  d c   #                                                  Á     [   ¢À   @ ã  @
  A@H   Û¢ W"A 	  # #        old_xmlToFile    printf %   error:xml file is bad,error info is                      "  *         Á     [  ¢À   @ ã  @
  A@H   Û¢ W"A 	  # #        old_xmlToFile    printf %   error:xml file is bad,error info is                      ,  0    
      J   @  b À À@Û   ¤  £   #        /var/run/switch_mode.lock    nixio    fs    access                     2  6    
      J   @  b À À@Û   ¤  £   #        /var/run/reset_factory.lock    nixio    fs    access                     9  J    	3   
   H   "  @@ " @ HÀ     È  WÀ À  Û   A  È  HÁ ×@ [ A Û  J  Á b  CÈA ¢A  Û ¢A ÁÃÛ  ¢A DÛ¢A  DÛ ¢A  CÈA ¢A #        socket    gettime 	'     /tmp/save-userconf.    .xml    .cry    nvrammanager -w       -p user-config >/dev/null 2>&1    rm -f           >/dev/null 2>&1    luci.model.crypto    printf    factory saveconfig() begin 
   fileToXml    enc_file_entry    execute    factory saveconfig() end                     L  r    e      "     
    @@ H  "@ #  À  "     
    @@ H  "@ #  
  H@ "  A " ÀA H     È@ WÀ   Û     ÈÀ  H ×@A [  Û Â J FÄÈA  b  ÈÁ ¢ Ê  ÀAÀ âA @Å È 
 ÂE F[" @F  	B  	 B   J@ÂÅ@Æ bB Ê ÀÁÆ âA ÁA  âA ÀG [ âAÊ ÀÁÆâA Ê ÀÁÆ âA Ê ÀÁÆÂ âA Ê  ÀAÀ âA #  !      switch_mode_locked    printf ;    ======= SWITCH MODE LOCKED, saveconfig() abort =========     reset_factory_locked =    ======= RESET FACTORY LOCKED, saveconfig() abort =========     socket    gettime 	'     /tmp/save-userconf.    .xml    .cry    nvrammanager -w       -p user-config >/dev/null 2>&1    rm -f           >/dev/null 2>&1    get_profile 
   ledmatrix    message    luci.model.crypto    saveconfig() begin    chip-on N  pid=$$;result=0;get_led_matrix_pid=$(ps|grep /usr/bin/ledmatrix|grep -v grep|awk '{print $1}');while true;do get_ppid=$(cat /proc/$pid/status|grep PPid|awk '{print $2}');ppid=$get_ppid;if [ $ppid == $get_led_matrix_pid ]; then result=$get_led_matrix_pid;break;fi;if [ $ppid == 1 ]; then break;else pid=$ppid;fi;done;printf "$result";    sys    exec    0 :   ubus call led_matrix event '{"configuration_complete":0}'    execute $   touch /tmp/auto_saveconfig_lock.lua 
   fileToXml    enc_file_entry $   rm -f /tmp/auto_saveconfig_lock.lua    saveconfig() end                     t      G      H@   
   @HÁ  "A 
  AHÁ  "ÁBA   @B 
  BAA "A @ ÁB¢ÀCÛ
 CCH  "¢   CÛ
 CCH   "¢  [       Y    Û    ÀÙ   @ ÂC¢B  Û£A  @ö ÁC¢A  # #        product_ver    product_name    execute D   nvrammanager  -r /tmp/productinfo -p  product-info  >/dev/null 2>&1    fp    err    open    /tmp/productinfo    r     printf    lines    match    format    %s:(.+)    close                       Ç    |   
     @ H@  "@ 
   @ " FÀ@ È  A b Y@    G  MÁ    ÀAÛ   ¢[   Û  ¢  MAÊ ÀAÂ [ Â âA    ýÀ@  HA ¢ @     ÀCÀÊ  À@Â â@ Ê À@Ä â ÀÀÄ Å 
  ABHA "A À Ê  À@ÂA â@ Ç  FÁ@ È Â b YA    H ÀÃ  ¢Á Û  MÁ@ A  H  ÈA ¢ ÀF HÂ âAÁ B â ÀÃ@G Û Ã ["B ÂG Â Û"B  HHÂ  "B
  BBHB "B 
  BBH "B 
   @HÂ "B #  $      printf    resetconfig() begin    cursor    get_profile    backup_restore    extern_partition     split         execute    nvrammanager -e -p      >/dev/null 2>&1    agile_config    support    no    yes F   nvrammanager -r /tmp/reset-defconfig.cry -p ag-config >/dev/null 2>&1    stat    /tmp/reset-defconfig.cry    size 	    K   nvrammanager -r /tmp/reset-defconfig.cry -p default-config >/dev/null 2>&1    remodel_switch    enable    get_remodel_para    luci.model.crypto    dec_file_entry    /tmp/reload-userconf.xml    getsysinfo    country    remodel    reset_merge_local    enc_file_entry H   nvrammanager -w /tmp/reset-defconfig.cry -p user-config >/dev/null 2>&1 H   rm -f /tmp/reset-defconfig.cry /tmp/reload-userconf.xml >/dev/null 2>&1    resetconfig() end                     É  Í       
     @ H@  "@ 
   @ HÀ  "@ 
     @ H  "@ #        printf    eraseconfig() begin:    execute 2   nvrammanager -e  -p  user-config  >/dev/null 2>&1    eraseconfig() end:                     Ï  ü    a   
   @HB  "B 
 H  " @Â@ ÈB bBJ @ÁB ÈÂ bÂC ¢  Â¢B   @ÈÂ ¢B È  A ÂCÛ H  ¢[ Â  È@  ÂCÛH  ¢[ Â   ÂD¢    EÛ ¢   ÊÀÅ â  Â C@   @þ@   £ @   ÂEÛ  ¢ [   Æ   £    £ @   £ #        execute J   nvrammanager -r /tmp/default-config.cry -p default-config >/dev/null 2>&1    luci.model.crypto    dec_file_entry    /tmp/default-config.cry    /tmp/default-config.xml    open    r    read    *a    close F   rm -f /tmp/default-config.xml /tmp/default-config.cry >/dev/null 2>&1    <accountmgnt>    </accountmgnt>    _    find    (.-)    <username>    </username> 	   get_name    getn 	    	      get_password    admin                     þ         J   @ À @  È  bÀÀ     £  À Á A ¢  Á ¢@ ÀA  ¢      £  @    £     £  #  	      open    /tmp/isupgrade    r     read    *a    close    match    [.]*true[.]*                              
     @ H@  "@ #        execute    rm -f /tmp/isupgrade                       "         Û  À Å   
   @" J @AÀ b Y  ÀF@Û bAFÁ@Û bAFAÛ bÚ@@ E  Û F@Û bAã  #        cursor    isfile    unload    load    get_all                     $  E   D       @È@  ¢@         @Ò  ¢@ À     @ÈÀ  ¢@    AÈ@ ¢ AÀA@ I  @	Ê   â  AÂHA  "A
 ÁBH  "@C@ I  @FCÈÁ b Ä@FADbA J  @À bA AÁ  È b@Å I   FADbA I  Ê   À À â@ c  #        execute !   mkdir /tmp/merge >/dev/null 2>&1 N   nvrammanager -d "%s" -r /tmp/merge-config.cry -p merge-config >/dev/null 2>&1 F   nvrammanager -r /tmp/merge-config.cry -p merge-config >/dev/null 2>&1    stat    /tmp/merge-config.cry    size 	       luci.model.crypto    dec_file_entry    /tmp/merge-config.xml    open    r     read 	      <?xml     close $   rm -rf /tmp/merge/* >/dev/null 2>&1 
   xmlToFile    /tmp/merge  B   rm -f /tmp/merge-config.cry /tmp/merge-config.xml >/dev/null 2>&1                     G  t      J   @ À b   È@  ¢ ÆÀ HÁ   ÈA â HA " MÀÁ !@BA Û Áb Y  @J @ÂÁ Û  bA @ACA Û  b ÚA  Å  ¢@ÀCÀÈB Â ÀDÃ [ Câ  Å Ê ÀBÅÀÅÃ [ CâB È Â ÁB C [  [ â
ZC  E  " J b Æ@ÄFY  ÀFÇ Û  EGb ÛH B  FÀ Û b YD  FÇ Û @EGbDH B JD     bÀÅG
 ¢E  À  [ 
¢M@ÀÇ  [ 
Û
¢E   ^  @ú   ñ  F CÈ  "C  Àæ BÈÁ  H ×A¢A #  #      cursor    luci.fs    get    locale    sysinfo    country    getsysinfo     isdirectory    /tmp/merge/    printf     ===== merge profile of country      begin ====    dir    /    profile    update 	       isfile    /etc/config/     sys    call    touch /etc/config/ 	      load_old_config    table    .anonymous    add    .type    set    find    ^%.    commit 
    end ====                     v     E   J      b    È@  @  @  # 
  @HÁ    W"A 
  AHA  "  FÁAÈ bA È B ÂÊÀÂÂ[âÑÀÁýÃ AC¢A @Ã   bA @Ä A È b@@Ä  ÈA bOÂ@J @À ÀÁCÁbA J @ÀÁ ÀÁDÁbA £  #        math 	       printf    get_mf_wifi_channel:seed:    open    /dev/urandom    rb    read 	   	   	      byte 	    close    randomseed    m2g    random 	   	
      m5g 		   	      2g channel:    5g channel:                              
     @ H@  "     @@ c  @ G  c  #        execl    getfirm PIN 	                         ×    ¢   
     @ " G 
 HB  " F@ ÈÂ   HC b@   MÀA  #  A b [ J @BÂ Û ÂbB J @BÂÂ bB M Ã @ @Ã   H AÂ Û ¢ b  D C H ¢ B    B MÀD@M EÀ M@E@ EÆD HÃ  â A  A ÆD HÃ  â ÚA  ÈÁ ÆD HÃ  â Û ÆD HÃ C â ÆD HÃ  â [Æ@ HÃ ÈÃ âÆ@ HÃ  ÈÃ âÛÆ@ HÃ   ÈC âÙB    ÈB Y  @ÀÁÀ
  H@ÃH	 b C	 ÈC " C  ÃHHÃ	 " 	 C HC
 	 È
 Ã
 ÃJ Ã ÛD A
 "C K Ã "CY    CË  @ÃJ Ã Û  @DË"C  ÃË  @ÃJ Ã Û @ÄË"C K Ã "C#  0      cursor 	   luci.sys    get    factory    factorymode    enable    no    yes    get_pin    printf    pin:    set MF channel      	   03717660    get_mf_wifi_channel    get_profile    global    model 	   MTK_762X 	   MTK_798x    QCA_IPQ50XX    QCA_IPQ95XX 	   wireless    wifi_device_2g    wifi0    wifi_device_5g    wifi1    wireless_ifname_2g    wireless_ifname_5g    wireless_ifname_6g    device    random_ssid    ssid    gsub    exec    getfirm SSID    
    mac_suffix 6   getfirm MAC|awk -F '-' '{printf $5$6}'|tr 'a-f' 'A-F'    ssid_6g    _MF_    _6G    set    commit_without_write_flash    m2g    channel    m5g                     Ù  æ    !   
     @ H@  "@ 
   @ HÀ  "   A @A @J   @ À  b@ I  c  J  À b  Â ÈÀ  A ¢@    @È ¢@     @ÈÀ ¢@ #        execute E   nvrammanager -r /tmp/openvpn-cert.cry -p certificate >/dev/null 2>&1    stat    /tmp/openvpn-cert.cry    size 	    ,   rm -f /tmp/openvpn-cert.cry >/dev/null 2>&1    luci.model.crypto    dec_file_entry    /tmp/openvpn-cert.tar ?   tar -xzf /tmp/openvpn-cert.tar -C /etc/openvpn >/dev/null 2>&1 C   rm -f /tmp/openvpn-cert.cry  /tmp/openvpn-cert.tar >/dev/null 2>&1                     è  ²    /  
     @ " J  @  b   È  Á  H " G ÆAA H Â â ÙA    È @Â  "Â [ MÀÂ@ ÀB  È 
  CHB "B 
  CH "B 
"B 
  ÂCH "B 
 BDH "  ÂD@  J @ÃB bB A bB J @ÂÃÂ bB @Æ  ÈB bBJ@BÄB b  ÂÄ@  J @Ã bB A bB J @ÂÃÂ bB @Æ  ÈB bB EÀJ @Ã bB FBG ÈB  b Û ÇÀ'J @ÃÂ bB &J @Ã bB J @ÃB bB J @ÈB ÈÂ bÂÀÂ Ê ÀÃ âB À	ÆÉHC	 âÉÀÆÂÉâB Ê ÀÂÃ
 âB ÁB
 C H
 âÀÊ   "C 
  ÃCHÃ "C  Æ H C "CÆÂÉâB   Ê ÀÂÃÃ âB ÀÆ  HC âBÊ ÀÃ âB  EÀÆBG HC  â Û Ç@Ê ÀÃÃ âB  Ê ÀÂÃC âB ÆK HÃ Ã È âMÀÂ
  CHC È WÃ"C ÀÌ 
  ÃCH "C @Í 
  ÃCH "C À 
  ÃCHÃ "C  Æ H C "C@Â
  CH ÈÃ  H WC"C CO Û D [ "C O C ÈC  "Û  ÇÀ 
  CHÃ "C 
  ÃCH "C Ê ÀÃC âB J @ÂÃ
 bB AB
 B È
 bÀÊÀ  CÈ ¢B  ÂCÈÂ ¢B  ÅÀ  CÈ ¢B B ¢B BA  HÃ ¢ B     @B@ Á âB Ê ÀÃC âB #  J      cursor    luci.model.crypto 	       getsysinfo    country    get_profile    remodel_switch    enable    no    yes    get_remodel_para     printf    reloadconfig() begin K   ................................load openvpn cert.........................    execute Y   mkdir /tmp/etc ; nvrammanager -r /tmp/reload-userconf.cry -p user-config >/dev/null 2>&1    stat    /tmp/reload-userconf.cry    size 	      user-config file size 0    resetconfig i   rm -f /tmp/reload-userconf.cry ; nvrammanager -r /tmp/reload-userconf.cry -p user-config >/dev/null 2>&1    dec_file_entry    /tmp/reload-userconf.xml    user-config xml file size 0 g   rm -f /tmp/reload-userconf.* ; nvrammanager -r /tmp/reload-userconf.cry -p user-config >/dev/null 2>&1 N   ................................reset, then localize.........................    reset_merge_local 	ÿÿÿÿ#   call uci_r:reset_merge_local error X   ................................start of merge user and default........................ X   ................................parse userconf to get mode.............................    open    r    read 	      <?xml     close .   rm -rf /etc/config /tmp/etc/* >/dev/null 2>&1 
   xmlToFile 	   /tmp/etc  X   ................................end of parse userconf.................................. ,   cp -r /tmp/etc/config /etc/ >/dev/null 2>&1    get    sysmode    mode (   ................................mode :      ...............................    ap K   nvrammanager -r /tmp/reload-defconfig.cry -p ap-def-config >/dev/null 2>&1 	   repeater K   nvrammanager -r /tmp/reload-defconfig.cry -p re-def-config >/dev/null 2>&1 L   nvrammanager -r /tmp/reload-defconfig.cry -p default-config >/dev/null 2>&1    /tmp/reload-defconfig.cry    /tmp/reload-defconfig.xml 7   ................................remodel defaulconfig:          ..........    remodel    merge    call uci_r:merge error .   rm -f /tmp/reload-defconfig.* >/dev/null 2>&1 X   ................................end of merge user and default..........................    error xmlToFile(userconf.xml) W   cp -r /tmp/etc/config /etc/ ; rm -rf /tmp/reload-userconf.* /tmp/etc/* >/dev/null 2>&1 X   ................................new configs merged.....................................    merge_mfconfig    onemesh    onemesh2_support    merge_old_config_onemesh_v2    reloadconfig() end                     ´     Î    @ @
È@  
   @HÁ  "A 
  AHA  "Á [  ÀÁ  
  B[ "A  FAÂ bJ@Â ÊÀÂÂ [âb     FBÃ bB # ^A  ûFAÃ bA C ÀÈÀ  G Ê  ÀÀB âA Ê ÀÁ H âÁ  [ ÀÁ  Ê ÀÂ âA Ç FBÂ bJ@Â ÊÀÃÂ [ âb  ÛJ@Â ÊÀÃÂ [âb  Ù    [  J@ÃÄ b  ÅÀJ@CÅ È Ä b    Y     FCÃ bC [ Û WÃc ^B  òFBÃ bB @F ÀÊ   ÀÀ â@ Ê  À ÁÁ H âÀ  [ ÀÁ  Ê  À Â â@ @Ç AÂ "@Û Ù    BÃ "B ã  A  ÀýAÃ "A     
Ê   ÀÀA â@ Ê  À Á H âÀ  [ ÀÁ  Ê  À Â â@ Ç AÂ "
 B[ÂBÈ   ¢"  Û  Ù    BÃ "B ã  A  ûAÃ "A Ç ã  #        SOFTVERSION 	   soft_ver    execute D   nvrammanager  -r /tmp/softversion -p  soft-version  >/dev/null 2>&1    open    /tmp/softversion    r     printf    lines    match    format    %s:(.+)    close    HARDVERSION    product_ver    product_name D   nvrammanager  -r /tmp/productinfo -p  product-info  >/dev/null 2>&1    /tmp/productinfo    len 	      sub 	   	ýÿÿÿ    v    PIN 3   nvrammanager  -r /tmp/pin -p  pin  >/dev/null 2>&1 	   /tmp/pin                       S    °   
     @ H@  "@ 
   @ HÀ  "@ 
    A H@ "  A ÀA ÀJ  @À   b@ J  @À À  b@ J @ b Â È@ Á ¢@   CÈÀ A ¢ÀC 
   @["A  ÁC "@DÀ	D"A 
  @HÁ "A  HÁ A "EJ @ÀÁ bA J @ÀÁ  bA JA b ÂÈA Â ¢A @ÈÁ ¢A  ÈÁ B ¢AJ @À bA ÀD"A 
  @HÁ "A 
  @HÁ  "A 
HA " @BA ÈÁ bAJ @ÃÁ ÈA bÁÃ Ê  ÀÀ âA ÆÁÃH â@ÄÀ	ÆÄâA Ê ÀÀÂ âA Á Â HB âÅ
  @HÂ "B 
  @HÂ  "B 
HB " @BB ÈÂ bBJ @ÀÂ bB A Â ÈB bB
  @H "B @ÆÄâA Ê  ÀÀB âA 
  @HÁ "A 
   @H "A #        printf    reloadprofile() begin    execute C   nvrammanager -r /tmp/reload-profile.cry -p profile >/dev/null 2>&1    stat    /tmp/reload-profile.cry    size 	    .   rm -f /tmp/reload-profile.cry >/dev/null 2>&1    luci.model.crypto    dec_file_entry    /tmp/reload-profile.xml    open    r     read 	      <?xml     close &   rm -rf /etc/profile.d >/dev/null 2>&1 
   xmlToFile    /etc  F   rm -f /tmp/reload-profile.xml /tmp/reload-profile.cry >/dev/null 2>&1 ,   chmod -R 444 /etc/profile.d >/dev/null 2>&1    error no profile    reloadprofile() end                     U  c   2   Ê   À Àâ 
 [  " M@@@  # Á@  ÈA "     MA@  # 
  ÁA[   "@B@J @ÁÀ  ÈÁ  b B FAÃÛ  G b  J @ÁÀ  ÑA b  £  #        cursor    string    head    sub 	   	      config    find    '  	   cfg_name 	   	ÿÿÿÿ
   get_first 	þÿÿÿ                    e  n   
+   J    b M À@ G cJ @AÀ  È  bÁ Û MÀÀ@ À@@ G cJ @AÀ  È b AAÛ  APÁ¢ [   AAÛ  ÂÁH ¢    Û £#  	      string    find    option     '    sub 	   	   	þÿÿÿ                    p     _   J   @ À b @  Û   À Ê  ÀÀ â ÁÀ "HA A Ê ÀÁ HÂ â  B   Ê ÀAÂ [Bâ 
  ÂBH   ÈB W "Â BÀ ÂCÛ¢B D¢@CÂ HD ¢ D@ Û¢Ã @M@ÅÀ Û¢Ã ÂÃ  Ã M BÀ M B Ã M B@CÆ AÄ  ÁÄ ¢C B  ÀöÆ ¢B ÂFÛ ¢B QB ì#        cursor    ls /tmp/merge/    popen    read    *all 	       find    
     sub 	      open    /tmp/merge/    /    r    printf    lines 	      config    config_name    get_config    nil    option_name    option_value    get_option    set    commit    close                       Ú   !Î   J      b   @@¢ È    ×  ÁÀ [" FAb FAAÈ bÁÛ ×
  HÂ " @BB Å  HC ßB bÂÂ¢ Å   CC CÄ D CÄ D CÄ E CÄCE ÈÃ " C     FCEÈ D b YC    H CE H ¢ C     ÀFÀÀFÀCGÀÃÄÂÀÃGÀÃÄÂ ÀCHÀÃÄÂÀÃHÀÃÄÂ@ÀÆÀÀCGÀÃÄÂÀÃGÀÃÄÂÀCHÀÃÄÂÀÃHÀÃÄÂÇ H	 D	 È	 EEÅ	 È
 " E     ÀF
 ÈC
 
 @ ÈÃ
  J b ÆFKH âMÀË@ÆFKH âMÀË Û[	F ÆFKHG âMÀË Û[ 	FÆFKH âMÀË Û[F 	Û ÆFKH âMÀË Û[	FÆFKHG âMÀË Û [ 	F ÆFKH âMÀË Û [F Û ÆÆLH È  âF ^  ëFEMÈ bE#  6   	   luci.sys    cursor    network_get_firm     exec    upper    match    (..)-(..)%c$    luci.model.wireless    Apcfg    wps_pin 
   wps_label    scan_driver    hst2g 	   	      hst5g 	      gst2g 	      gst5g 	      get_profile 	   wireless    support_triband    no    support_fourband    support_6g    yes    hst6g 	I      gst6g 	O      hst52_g 	      gst52_g 	%      _5G    _52G    _6G    tplink    TPLINK_TPLink 	   TP-Link_    TP-Link_GUEST_ 	   TP-LINK_    TP-LINK_GUEST_    find    hst     6g    52_g    5g    set    ssid    commit                     Ü  û   d   J   @ À b @  Û   À Ê  ÀÀ â ÁÀ "HA A Å  
  A[ Â Û"   B  À
  BB[ ÐB" J @ÂÂ Û  C [ BÈ bÂ ÂÀ ÊÀÂÃ âB Å  ÄÁÆÄâ@	ÆCBH D â Ä@Á  [ âÂÃ ÀÄ E  ÄC@M@EÀÁ  âÃ Ä Â ÁÃ M ÂÀÁ M Â ÁÃ M Â@ÀÄ À AÄ ÄCÞB  ÀõÊ ÀBÆâB QB@ëã #        cursor    ls /tmp/merge/    popen    read    *all 	       find    
     sub 	      open    /tmp/merge/    /    r    printf    lines 	      config    config_name    get_config    nil    option_name    option_value    get_option    close                     ý     f   J   @ À b @  Û   À Ê  ÀÀ â ÁÀ "HA A Å   HÂ " Û 
  B[ B Û"  B  @
  ÂB[ ÐC" J @BÃ Û  Ã [ BÈ bÂÂÀ ÊÀBÄ âB ÆÄâ@	ÆÃBH Ä â  Å@Á  [ âÂC @MÀEÀÁ  âÃ D Â ÁC MÂÀÁ MÂ ÁC MÂ@ÆÃÆ [ D Á  AE  E
A  E
âC ÞB  ÀõÊ ÀÇâB QCÀëã #        cursor    ls /tmp/merge/    popen    read    *all 	       get_default_config    UN    find    
     sub 	      open    /tmp/merge/    /    r    printf    lines 	      config    config_name    get_config    nil    option_name    option_value    get_option    set    close                       A      J   @ À b @  È  ¢ Ê  ÀÀÀ  [ Aâ Ù   Ê  À ÁA [  â@ Ê ÀÀÁÀ ÂA [   â@ Ê  ÀÀÂ  [  â 
 ZA  E  "@C J @ÃÂ Û Âb  ÄJ@ÂÁ@ÂB Û ÂbB A   Û  Û b ÚB  Å  ¢Ê â ÀÄ ÀEÙ  @ÆCÅ [ Eâ [ÆÃÅ [ â ÙC   ÆÆ [ ÀEâCÊ D     â@EF	 "E   ÅÅ  Û 	"MÀ
@Æ  Û 	[	"E Þ  Àú  ò  êÁÆ A "A
  AHA  È WÁ"A #        cursor    getsysinfo    country    isdirectory    printf !   ===== reload profile of country      begin ====    sys    call    cp  ,   config/profile /etc/config/ >/dev/null 2>&1    dir    /    profile    isfile    /etc/config/     touch /etc/config/    load_old_config    table    .anonymous    add    .type    get    set    find    ^%.    commit 
    end ====                     C  u      J   @ À @  b@ J  @À b ÀÀ  HA  ¢ÁÀ  â 	  Ù@  @J  @À bA J  @ÀA bA #  @   @    @ 	 À J  @À bA J @ÁÂ bA FÁÀ ÈA B H bÀÃ  ÁBÈ ¢A @Ä  ÁBÈ ¢A À  ÁBÈÁ ¢A È ¢ ÀAE HÂ âAÊ ÀÆÂ HB âÁÆ J  @À bB FÂÆÈ b@Ç@FÇbB J @ÂÂÂ bB A Â ÈB bMH  MF  AÂ   bB   À A	 bB  AB	 	 bB J @ÂÂÂ	 bB  Ê AB
 
 bB J  @ÀÂ
 bB #  ,      printf    mergeconfigbycountry() begin    cursor    get    locale    sysinfo    country    getsysinfo    no country in productinfo &   mergeconfigbycountry() do nothing end '   user has set country, to check profile    execute !   mkdir /tmp/merge >/dev/null 2>&1    sysmode    mode    ap E   nvrammanager -r /tmp/merge-conf.cry -p ap-def-config >/dev/null 2>&1 	   repeater E   nvrammanager -r /tmp/merge-conf.cry -p re-def-config >/dev/null 2>&1 F   nvrammanager -r /tmp/merge-conf.cry -p default-config >/dev/null 2>&1    luci.model.crypto    dec_file_entry    /tmp/merge-conf.cry    /tmp/merge-conf.xml    open    r     read 	      <?xml     close $   rm -rf /tmp/merge/* >/dev/null 2>&1 
   xmlToFile    /tmp/merge    no_country    revert_country_config    merge_country_config    reload_country_profile    /tmp/merge/ "   rm -rf /tmp/merge >/dev/null 2>&1    PL 	   set_SSID    wan    mergeconfigbycountry() end                     w  ¾    £   
     @ " I      Æ@@ H  Á  â Ù@    È  @Á 
  AHÁ "A B   ÈA  "ÀB@J @Á bA FAC È   HB B  ÂCbA FD È  bAA@ A È " A      A J @ÁÁ bA #  J @Å@AÅ b YA   J @ÁÁ bA I  J @Å@AÅ b YA   J @ÁA bA   Æ F J @ÁÁ bA #  J @Á bA J@AÇ bA J@AÇÁ bA J  b AÈÈ Â ¢AIÈA	 	 ¢ÁÀB 
  A["B ÂI
 "@J@J"B 
 BGHÂ
 "B  HB	 B "Ë @
 BGHÂ "B 
 BGH "B D B "BD B "BK
 BGH "B D Â "B
  AH "B #  #  5      cursor    get_profile 	   wireless    smart_connect    no    yes    printf    support smart connect    get    smart    smart_enable      smart connect config does exsit    section    smart-connect    off    commit    onemesh    onemesh_support &   Does not support onemesh, just return    fs    access    /etc/config/onemesh    config not found: onemesh    /etc/config/nrd    config not found: nrd  %   Already merged, no need to merge now    merge onemesh config start...    execute !   mkdir /tmp/merge >/dev/null 2>&1 L   nvrammanager -r /tmp/default-config.cry -p  default-config  >/dev/null 2>&1    luci.model.crypto    dec_file_entry    /tmp/default-config.cry (   /tmp/default-config.xml >/dev/null 2>&1    open    /tmp/default-config.xml    r    read 	      <?xml     close $   rm -rf /tmp/merge/* >/dev/null 2>&1 
   xmlToFile    /tmp/merge 9   cp /tmp/merge/config/onemesh /etc/config >/dev/null 2>&1 @   cp /tmp/merge/config/onemesh_client /etc/config >/dev/null 2>&1    onemesh_client 5   cp /tmp/merge/config/nrd /etc/config >/dev/null 2>&1    nrd    merge onemesh config end                     Á  õ    
h   
     @ " J  @  b   @ÈÀ  ¢@   AÈ@ ¢@   AÈ ¢@ ÀÁ È  A ¢@  BÈ@ Á ¢À C 
  @["A AC "ÀC@D"A 
 AHA "A  HA Á "A M @
   @H " FÁE È B a       bAFÁE È  aB       bAFÁF È bA   
 AH "A 
 AHA "A 
 AH "A Á H A "A È HA Á "A
 AH	 "A 
  @HA	 "A #  #  &      cursor    luci.model.crypto    printf >   -------------merge_rtor_wireless_config begin----------------    execute $   mkdir /tmp/re-merge >/dev/null 2>&1 N   nvrammanager -r /tmp/re-default-config.cry -p  re-def-config  >/dev/null 2>&1    dec_file_entry    /tmp/re-default-config.cry    /tmp/re-default-config.xml    open    r     read 	      <?xml     close '   rm -rf /tmp/re-merge/* >/dev/null 2>&1 
   xmlToFile    /tmp/re-merge     ret    /tmp/re-merge/config/    foreach 	   wireless    wifi-iface    wifi-device    commit_without_write_flash 0   cp -f /etc/config/wireless /tmp/re-merge/config /   cp -f /etc/config/onemesh /tmp/re-merge/config -   cp -f /etc/config/meshd /tmp/re-merge/config    convertFileToXml    /tmp/re-merge/config    /tmp/re-merge-userconf.xml    enc_file_entry    /tmp/re-merge-userconf.bin :   nvrammanager -w /tmp/re-merge-userconf.bin -p user-config <   -------------merge_rtor_wireless_config end----------------        ×  Þ      @ @ Y   J   F@À È   Á@ H bM@  A  @Á@  Û ¢@ #        guest    get 	   wireless    .name    access     set                     â  ç      J   F À È@   @ HÁ  bM@   @AA  @@ Á  Û ¢@ #        get 	   wireless    .name    htmode     set                                 ÷      ?   
     @ " J  @  b   ÈÀ  ¢ Ç  FA ÈA  b YA    HÁ ÀÁ  #   BÈA ¢A  ¢Á Û  ÁBÈ ¢A AÃ È Â ¢AD [ Â Û ¢A AÄ ÈÁ  ¢AÁBÈ ¢A ÁBÈÁ ¢A ÁBÈ ¢A  BÈA ¢A #        cursor    luci.model.crypto    getsysinfo    country    get_profile    remodel_switch    enable    no    printf $   merge remodel info to ap mode begin    get_remodel_para    execute J   nvrammanager -r /tmp/reset-defconfig.cry -p ap-def-config >/dev/null 2>&1    dec_file_entry    /tmp/reset-defconfig.cry    /tmp/reload-userconf.xml    remodel    enc_file_entry H   nvrammanager -w /tmp/reset-defconfig.cry -p user-config >/dev/null 2>&1 F   nvrammanager -w /tmp/reset-defconfig.cry -p ap-config >/dev/null 2>&1 H   rm -f /tmp/reset-defconfig.cry /tmp/reload-userconf.xml >/dev/null 2>&1 "   merge remodel info to ap mode end                       ¬    :þ  
     @ " J  @  b @ Á  HÁ   ¢@    @ Æ@ H Á  ÈÁ âÙ@    È  @ A ÈA  "A    Á J @ÃÛ  [AbA MCJ b K@@Jb K@ J @Äb @  #  J @ÃÁ bA FE È B b YA    H E  HÂ ¢ A     ÆE H B â ÙA    È E  ÈÂ " B     FBG È b BG  [ ¢ ÆE H  â ÙB    ÈÂ E  È " C    C G ÆH H Ä á        âCÚC  È	 D   D	 FDG È b DG  [ ¢ ÆDG H Éâ EG  ÀI" FE È Æ	 b YE    H
 E  HF
 ¢ E    
 Ç FH È Ç aG   
     bFZF  H F    Æ@ H Ç
 È âÙF    ÈF @  ÈÇ
  "G    G F@ È È H bYG    H @  HH  ¢G     Æ@ H  ÈÈ âÙG    È @ È  ÈÈ  	 "H    H F@ ÈÈ  É  H bYH    HÈ E  H	 ¢ H    H ÆE H  â ÙH    ÈÈ IG É  Û	 " FIG ÈÉ  
b 	 	È	 J H Ê È
 K H Ë È L H Ì È M H Í È N H I	Å	Ê H
 J È Ë H  ÈK  HÌ  ÈL  HÍ  ÈM  ßI
HÊ  ÈJ K H K È Ì H  È JJ
@JØ bJ J
@JØÊ bJ @
Ù J È bJJ
 @ÊÙ È
 bÊ@Ú Ê
 À
Ã âJ ÆÚHË â Û@ÆJÛâJ Ê
ÀJØ âJ ÁÊ  H âÊ
ÀJØK âJ Ê
ÀJØ âJ Ê
  À
Àâ  Ê
 â
@ Ì	M ´@Ì\  ÀÉ@Í	"L  Ì
M ´@Ì\  ÀI@Í
"L Þ  ÀúÊ
â
@ ÌM ´@Ì\  Û@Í"L  ÌM ´@Ì\  Û @Í"L Þ  ÀúÊ
 â
@ ÌM ´@Ì\  Û@Í"L  Ì	M ´@Ì\  Û @Í	"L Þ  ÀúÆÊ\ H È  âJ ÆÊ\ H  È  âJ ÆÊ\ H Ë
 È âJ ÆÊ\ H Ë
 È  âJ ÆÊ\ H Ë È âJ ÆÊ\ H K È  âJ ÆÊ\ H  ÈË âJ Æ
] H âJÆÊ\ HË  Ë  È  âJ ÆÊ\ HË  Ë  È  âJ ÆÊ\ HË  Ë  È âJ ÆJ] HË  Ë Û  âJ ÆJ] HË  Ë ÛâJ Æ
] HË  âJÊ
 À
Ã âJ #  w      cursor    luci.model.crypto    get    onemesh    update    0 	   wireless    version    1    sysmode    mode    router    printf 6   mode %s,onemesh_update %s,wireless_onemesh_version %s 	   repeater 	    	      is_dft_cfg ?   -------------merge_old_config_onemesh_v2 begin----------------    get_profile    wireless_ifname_2g_old    wl11    wireless_ifname_5g_old    wl01    wireless_ifname_2g    wl13    wireless_ifname_5g    wl03    get_all    wireless_guest_ifname_2g    wl1.3    wireless_guest_ifname_5g    wl0.3    foreach    wifi-iface    wl12    wl02    device    wireless_mesh_sta_2g    wl1    wireless_mesh_sta_5g    wl0    filter    action    deny    enable    ofdma    off    twt    smart    smart_enable 	   group_id    -1    onemesh_enable    on    wireless_mesh_ifname_2g    wl14    wireless_mesh_ifname_5g    wl04 	   disabled    disabled_all    disabled_by    frag    wpa_group_rekey    isolate    zerowait_dfs    shortgi    airtime_fairness    mu_mimo    wmm    htmode    beacon_int    dtim_period    channel    rts    txpower    hwmode    band    wps_timeout    wpa_cipher 
   wps_label    hidden    psk_version    wps_pbc    wpa_version    port    wps    wds    psk_cipher 
   wps_state    wps_pin    ssid    encryption    psk_key    access    passwd_cycle    execute )   mkdir /tmp/default-merge >/dev/null 2>&1 R   nvrammanager -r /tmp/onemesh-default-config.cry -p default-config >/dev/null 2>&1    dec_file_entry     /tmp/onemesh-default-config.cry     /tmp/onemesh-default-config.xml    open    r     read 	      <?xml     close ,   rm -rf /tmp/default-merge/* >/dev/null 2>&1 
   xmlToFile    /tmp/default-merge 5   cp -f /tmp/default-merge/config/wireless /etc/config 4   cp -f /tmp/default-merge/config/onemesh /etc/config    set    commit_without_write_flash    section =   -------------merge_old_config_onemesh_v2 end----------------        0  6      @ @     @@@@ Y@    H  C   @ @     @@@ Y@    HÀ  C #        ifname    .name    wl12    wl02                     F  L      @ @     @@@@ Y@    H  C   @ @     @@@ Y@    HÀ  C #        ifname    .name    wl11    wl01                                 ¯  Ê   <      @  @ @ I   c  H@  @  È@    H    È  ]ÁJ  @ÂÀ  Û bK Á@ @@   £ @À ÀÁ@ QÀ @@ L@ÂÀ @À ÀÂ@ @  ÑÀ\ø@À @ M@@À@À @ M@ÀÀ @@À @À@ I  c I c #         	    	      byte 	!   	~   	0   	9   	A   	Z   	a   	z                       Ì  Ù   	      @  @ @ I   c  H@  @  Ö   A    @Û  ¢KÀ@@ @ É  ã Àü  £  #         	      byte 	    	~                       Û  æ      H   @    @     K À   KÀ@    Û   ¢ @    H    @AAÅ   ß@ ÒÀ¢@ c  #     	        	    	   	      sys    call    echo %d                     è  ó      H   @    @     K À   KÀ@    Û   ¢ @    H    @AAÅ   ß@ ÒÀ¢@ c  #     	        	?   	   	      sys    call    echo %d                     õ  ÿ      H   @    @     K À   KÀ@    Û   ¢ @    HÀ     A@AÅ   ß@ ÒÀ ¢@ c  #     	        	    	      sys    call    echo %d                             H   @    @     @ÈÀ    × ¢@    AÛ   ¢ @    H@   AÀAÅ   ß@ ÒÀ ¢@ c  #  	   	           printf    ip is     check_unicast_ipv4 	      sys    call    echo %d                             H   @    @     @Û   ¢ @    HÀ     A@AÅ   ß@ ÒÀ ¢@ c  #     	           check_netmask 	      sys    call    echo %d                       $      H   @    @     K À   KÀ@    Û   ¢ @    HÀ     A@AÅ   ß@ ÒÀ ¢@ c  #     	        	ÿ   	      sys    call    echo %d                     &  h  
 »       @È@  
  @[  " × ¢@     @ÈÀ  
  @[ " × ¢@   á   
  !A  
 J @AÁb  È Â H B È Ã H C È Ä H D È Å H E A Û â 
["ÀPÅRÃÅ ÆÀ FCFb FFb J @ÃÆ b PÅCJ @Ç b Ä  @ù [" [    Û ÂÈB  H ×B
  ÃG[" FHÈC b HÛ HÄ ¢ [  IÛ¢ Ûâ   H  Û  DEÑÅÀÅÅ
QÄÅþ  Ç
 Û  ÅÀF ¢Û  FIÛ		 ¢  ÆIÛ 

 ¢  ÆIÛ	
 ¢[ ÆÅEÑE
ÀÆÄÆÅÑÅ
ÀÆÄ÷ Û 	¢ E
 E
 Û  ÅÊ  ÀÀ
 J @À b FâE ÊÀÅÊÀË [ F âE £ #  .      printf    localFileName:         encode    wanMac:      	      cursor    0    1    2    3    4    5    6    7    8    9    A    B    C    D    E    F 	   	   	       upper    lower    byte    char 
   echo -n "    " | md5sum | cut -d ' ' -f 1    popen    read    *all    sub 	       len    rshift 	      band 	      md5Str    remoteFileName:         sys    call    echo %s        +  2      J   @ À    b    È@   HA  ÝÊ  ÀÀ  [  â ÀÜÀý£  #        len 	      sub                     4  7      J   @ À    b c  #        concat                                 j      V      "     
    @@ H  "@ #  
  HÀ  "   A " @A H    ÈÀ WÀ  Û     È@  ×  [ Á H  È WÁA Û  [ Â Ê  â 
   B@HB "B 
  D["B  ÂÄ[  "B
 E[ "  BEEJ  @BÀÂ Û ÂbB #  J @Ä bB J @ÄbB J @Ä bB J  @BÀ bB #        switch_mode_locked    printf ;    ======= SWITCH MODE LOCKED, saveconfig() abort =========     socket    gettime 	'     /tmp/save-userconf.    .xml    .cry *   cp /tmp/agile_config/tmp/user-config.xml     nvrammanager -w       -p user-config >/dev/null 2>&1     -p ag-config >/dev/null 2>&1    rm -f           >/dev/null 2>&1    luci.model.crypto    save agile config() begin    execute    enc_file_entry    stat    size 	(#      agile save config size illegal!    saveagile config() end                             