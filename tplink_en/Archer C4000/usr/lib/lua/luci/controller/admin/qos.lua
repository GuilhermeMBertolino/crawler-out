LuaQ               V     H@    À@"@  H@ " A   b   ÈÀ ¢ Á   â  HA " A  b  ÈÁ ¢ Á  â  BÃ " FCÈÂ  b YB    HB ÄÀÂÄÛ H C È Ä H D È Å H C¢Û   ÂÄÛ H C È Ä H D È C¢Û   ÈB ¢B  ÈÂ !  aC  ¡  áÃ  !     aD     ¡ áÄ !    !E  E !   !Å   Å !         	 !E      E	 ÄÀ!     	 !Å    Å	 !     	
 !E    	E
 !   
 !Å        Å
 Ä!     !E    E !     !Å    Å !     !E   E !     !Å    Å !     !E E !    !Å   Å !    !E     E !      !Å Å  E  E  Á ÅD  Á	 ÅEP DEEE    ÁÅ
 ÅÅP D¡E¡EÅ    ÁE	 ÅÁ
 Å¢D  ÁÅ ÅÅP D£  Á ÅÅP D£E¢EE  E  Á ÅD¤E¤E  E  ÁE ÅDE  Á ÅDE¥EÅ  E  ÁÅ ÅD  Á ÅÅP D¦  ÁÅ ÅÅS§D¦E¥ÄÀEE   Á
 ÅÁ	 Å¢D¤  Á
 ÅÁ	 Å¢DÅ  Á ÅÁ	 Å¢EP D¨Å  Á ÅÁ	 Å¢EP D£Å  Á ÅÁ	 Å¢EP D©E¨E   ÁE
 ÅÁÅ	 Å¢D¤Å  ÁE ÅÁÅ	 Å¢ÅP D¨Å  ÁÅ ÅÁÅ	 Å¢ÅP D£Å  Á ÅÁÅ	 Å¢ÅP D©E©a	      
B aE	  BE a	 B #  W      module    luci.controller.admin.qos    package    seeall    require    ubus    luci.model.uci 	   luci.sys    luci.tools.form    luci.tools.debug    luci.model.controller    luci.model.client_mgmt    luci.model.qos    cursor    get_profile    qos    dscp_support    no    yes    Form    mac    proto    port    ipaddr    phy    app    type    qName    DSCPNumber 
   luci.json 	   	@      read_qos_settings    read_privacy    write_privacy    calRealBandwidth    write_qos_settings 
   load_rule    get_max_qos_queue    get_max_qos_dscp    load_queue 
   load_dscp    get_max_dev    insert_rule    insert_queue    insert_dscp    update_queue    update_dscp    remove_queue    remove_all_queue    remove_dscp    remove_rule    update_rule    uci_to_app    load_list_app    read_db_version    database_check    db_create_config 
   db_update 
   db_upload 	   settings    read    cb    write    cmd    /etc/init.d/qos restart    add    /etc/init.d/qos reload    list    others    del    update    applist    load    check_privicy    upgrade    check 	   database    own_response 	   qosQueue    insert    remove    qosDSCP 	   dispatch    _index    index '       #   $        #                          &   7     $   F @ È@    b FÀÀ b   A  @ b Á ¢@ ÀÁ ¢     Á   â  BÂ@B  È  " Â@"   @ @Âc Þ  üÈÀ ã  #        gsub    -    :    lower    require    luci.model.client_mgmt    init    get_client_list    ipairs    mac    ip    none                     :   Y     @   F @ È@  b  Ç  " Û  MÀÀÀMÀ@À "[ b  ¢ MÀ@@ @  ÁA  â ÁA â [@@Û  H À Û   Û H  Û â Û MÀÀÀóMÀ@óÛ Â  @ò£  #        gfind    [0-9-]+         [0-9]+ 	   tonumber    :    ,                     [   z     @   F @ È@  b  Ç  " Û  MÀÀÀMÀ@À "[ b  ¢ MÀ@@ @  ÁA  â ÁA â [@@Û  H À Û   Û H  Û â Û MÀÀÀóMÀ@óÛ Â  @ò£  #        gfind    [0-9:]+         [0-9]+ 	   tonumber    -    ,                     |   £    ?   À  @@À@ À  ÁÀ@A ÁÀÀ @Á × À À@B À ÀB À MÀÂ @M@À ÀM Ã @@ÀÀ @ × À Ê   ÆÀÃH A á  
       â@ Ã @À @A × À ÀD À À E ÀÀ@E ÀÊ   Dâ À À@A Å@À @Á × À ÀE À £  #        type     	   priority    enable    on    method    device    mac  	   dev_name    device_name    mac     custom    app    app     foreach    qos    custom     port    name    custom_name    proto    phy    phy                   J   F À È@   @ b À   AÊ   AÁ ¢MA  Ê  ÀÀÁ Â HA ×@À#  
      get_all    qos    .name    string    find    id     app    name                                      ¥   Ñ    X   E  D@@@ D  @ MÀ@  @AÀ @  ¢MÀ@ DÀAA D @B D    ÀA ¢ D   @AÀ @ Á ¢MÀ@ D CÀB D  @AÀ @ A ¢MÀ@D@CD@À@C MÀ@@  CÁ HA ¡  
       ¢@@Ã M@@@@Ã MÀ@   DÀ@Ã A H ¢ D  @AÀ @ Á ¢MÀ@ÀD@CD Å B D @E D C D   À Ã ¢ D c  #        type     	   priority     string    find    mac    device    name 	   dev_name    ip    phy    port    app    foreach    qos    sub 	   	þÿÿÿ   custom    on    proto        ¸   ½       J   F À È@   @ b À   AÊ  À@Á Á HÁ A¢M B  Ê  À@Á AÂ H ×@À#        get_all    qos    .name    string    find    app    name          id    ,                                 Ó   Ö     	   EÀ   @ D @@ D@ D c  #        qName 	   qMaxRate 	   qMinRate                     Ø   Ü     	   EÀ   @ D @@ D@ D c  #        DSCPNumber    qCOS 
   queueName                     ß   î     ~      J   F@À È  Á  H  bY@    H  @ J   F@À È  Á  HA bY@    H @J   F@À È  Á  HÁ bY@    H @J   F@À È  Á  H bY@    H@ @ J   F@À È  Á  H bY@    H@ @ J   F@À È  Á  HÁ bY@    H  @J   F@À È  Á  HA bY@    H @J   F@À È  Á  HÁ bY@    H  @J   F@À È  Á  HA bY@    H  @J   FÀÄ È   b M@Å  H Y@    H  @ J   FÀÄ È   b M@Å  H Y@    H  @J   FÀÄ È  A b Y@    H @#  #        enable    get    qos 	   settings    off    up_band     
   down_band    up_unit    kbps 
   down_unit    high    60    middle    30    low    10    time    enable_phy    get_profile    by_phy 	       on    enable_app    by_app    qos_iptv_compatible    no                     ð   ô        
     @ " F@@ d  c   #     	   QOS_INST    spt_read_privacy                     ö         @   A   d  c   J   @@À b À   ¢@    £  ÆÀÀ ä  ã   #        invalid_args 	   QOS_INST    spt_write_privacy    spt_read_privacy                          3   A   @@ b    À@ ¢ Û   @Á@  Á@AA @ÁÁÁ b Û  AA @ÁÂ b Û @AB  Á@AA @ÁÁAb  AA @ÁBb J  FÂÈÁ  HB bA J  FÂÈÁ  H  bA #     	   tonumber    up_band 
   down_band    up_unit    mbps    math    floor 	è        ð?
   down_unit    set    qos 	   settings    rUpband 
   rDownband                       [      E     È   A  H  Á  È B H Â @ Ç  J   Â@J FAÂÈ Â HB  bÚ@  È  J FAÂÈ Â HÂ  bA  A A  b@B MÀCÊ ÆÄH Ã Û âB ^  ÀüJ   Â AA b D  OÁÄA ÀA@ ¢ ÀÁ@ Ä  ÁDM@@Å  B @B@ " @Â@ Ä  ÂDH  ÈB  HÃ Ã È  H  B È 
 H ÝBÀÏÃ [ DÄÄ  H  WDÄJFDÇÈ  [ Å F ßE bY   ÄG	È  ×	¢D @ ÄG	ÈD ¢D H	 H  ¢[ 	YD    ÄG	ÈÄ  ×	¢D   È	 £ÜòAA	   bA J FÉÈ bAAÁ	 d c  #  (      enable    up_band 
   down_band    up_unit 
   down_unit    high    middle    low    yes    get    qos 	   settings    1000    kbps    ipairs     set 	   tonumber    mbps 	   	   Ù?É?¹?©?   qName    Queue 	   qMinRate 	   qMaxRate    update    queue    printf 	   success     update error    insert    error     modify item failed    calRealBandwidth    commit    read_qos_settings                     _  s          J   F À È@    a     
   
  
  b@V   ÀÀ     #  #        foreach    qos    rule 	       []        c  j   @   J         @Ê  Æ@ÀH  Á@ â DÀ J        @ @ Á M@Á ÀJ        @    Ê   Ö À  AAÁ H ¢ @B¢ D J        @   ÀBÊ   
   À À Á¢ @      Ê   Ö À BD J        Ê 
  J  V Aâ DÀ #     	      get_all    qos    .name    mac     gsub    :    -    upper 	   dev_name    match_history_list                                 w  y       @  J   F@À È  Á  b Y@    J  @ #  #     
   max_rules    get_profile    qos 
   max_queue                     {  }       @  J   F@À È  Á  b Y@    J  @ #  #     
   max_rules    get_profile    qos 	   max_dscp                                 J   F À È@    a     
   
  b@V   ÀÀ @ E     #  #        foreach    qos    queue 	                   J         @Ê  Æ@ÀH  Á@ â DÀ J        Ê  
  J  V Aâ DÀ #     	      get_all    qos    .name                                   ¡          J   F À È@    a     
   
  b@V   ÀÀ @ E     #  #        foreach    qos 	   dscprule 	                   J         @Ê  Æ@ÀH  Á@ â DÀ J        Ê  
  J  V Aâ DÀ #     	      get_all    qos    .name                                 ¤  ©          J   F@À È    b Y@    HÀ  @ #  #     
   max_rules    get_profile    qos    32                     «  â      E      À @M@ÀÀ @ÆÀHÁ   â Æ@Áâ À Ê   ÀÁ @@ ÈÁ " AA" @Bâ@Ê  Æ@ÂH Á â 
 C ÈA " E  CÀC DMÀAÀDM@@ A DÁDÀD ¢ÁA  â MÀÁ EDÁÞ   þÁEMÀA@FMÀAAFMÀAÀÁEM@@ FM@@@AFM@@EDF EDÁAA Û¢   Ê [ â[ Ê ÆÂÆH Ã Û â[ Y@   É  ã @ É  ã    ú G ¢A@M@@À@@ HÂ  ¢ AA¢ A ¤ £  #        mac     gsub    -    :    upper    set_client_nickname        device_name    count    qos    rule    get_profile 
   max_rules    method    app 	   rule_app    luci    util    split    ,    ipairs 	      custom_name    port    proto    custom    insert    commit 
   load_rule                     å  õ   	   E    @ Á@  ÀÀÀÀÀ â 
  AA È "[  Y@  @ 	  # 
 ÁAA "Aã  #        new    luci    json    decode    insert    qos    queue    commit                     ÷     	   E    @ Á@  ÀÀÀÀÀ â 
  AA È "[  Y@  @ 	  # 
 ÁAA "Aã  #        new    luci    json    decode    insert    qos 	   dscprule    commit                     	     "   @ @ @@ Á  ÀÀÀÀ Á â    Á@ A[ " J  FAÁÈ Â [ Å  ßB bY  @ AB ¢Ac    È £#        old    new    luci    json    decode    update    qos    queue    qName    commit    modify item failed                       '   "   @ @ @@ Á  ÀÀÀÀ Á â    Á@ A[ " J  FAÁÈ Â [ Å  ßB bY  @ AB ¢Ac    È £#        old    new    luci    json    decode    update    qos 	   dscprule    DSCPNumber    commit    modify item failed                     )  6   	   @ @ @@ Ê   ÆÀHÁ   Û  â Ù   @
 AAÁ  "Aã   	  H ##        key    index    delete    qos    queue    commit    remove static lease failed                     9  J    
      J   F À È@    a     b@AÀ     b    AB  [¢A ^   þJ   F@Á È@  b@I  c  #        foreach    qos    queue    ipairs    delete    commit        =  @      J         @À@@ DÀ #     	      .name                                 L  Y   	   @ @ @@ Ê   ÆÀHÁ   Û  â Ù   @
 AAÁ  "Aã   	  H ##        key    index    delete    qos 	   dscprule    commit    remove static lease failed                     \  f   
   E    @ @    @  À@ 
  Á@ ÈA  [" [  
 A "AÁ $ #  #        key    default    index    delete    qos    rule    commit 
   load_rule                     h     M   E      @@@ÀÀ@ ¢ Á   À@ÀÀÀ A â  AA A  ÁÁBA È " ÁB" Ä  ÁABA È " ÁB"  
  CA È  [ ÈÂ Ã B "[  @ AA  D DHA A  ÄHA AÄ 
  CA È  [ È B "[  Y@  @ 	  # 
 DA "AÁ $ #  #        luci    json    decode    old    new    method    device    mac    gsub    -    :    upper    update    qos    rule 	   priority    app         commit 
   load_rule                              E    @ D @@ D@ MÀ@@ @ D  A MÀ@@  A D c  #        name    id 	   tcp_port  	   udp_port                       ª         EÀ  D@@DÀ@   D @ E      @A HÁ ¡    
      ¢@#  #        name    APP    id 	   	   children    foreach    qos    app        ¢  ¦      J         @Ê  Æ@ÀH  Á@ â DÀ J  @ À @ Á    @ AÊ  À ÀÀ ÁÖ Ñ ÀA J     @"  #     	      get_all    qos    .name 	   children    uci_to_app                                 ¬  ²          J   F À È@    HÁ  bY@    H   Û  À  Â#  #  	      get    qos 	   settings    version    unknown    firmware_version    Qos database  
   totaltime    5                     ´  å      A   @  b   À@ AÛ   ¢    !@ AÀAÈ  ¢@ @ AÀAÈ@   H ×@¢@ @ AÀAÈÀ   H ×@¢@ @ AÀAÈ@ ¢@ @ ACÈÀ ¢ M DÊ   À@Ä AÁ  b Aâ@ Á@ ÀÁÀÀÁ â@ É   ã  Ê   À@ÄA â@ ÀÅ Á H â@Ê   À@ÄA â@ Á@ ÀÁÀÃ â  M D Ê   À@ÄÁ [ Aâ@ Á@ ÀÁÀÀÁ â@ É   ã  Ê   À@Ä â@ Á  ÀÀÀÀ ÁA â Ù   ÀÁ@ ÀÁÀÃ â   DÀÁ@ ÀÁÀÀÁÁ â@ É  ã  Ê   À@Ä AÁ  b Aâ@ Á@ ÀÁÀÀÁ â@ É   ã  Ê   À@ÄA â@ Á@ ÀÁÀÀÁ â@ É   ã     £  #  "      require    luci.model.crypto    nixio    fs    access    luci    sys    exec    mkdir /tmp/check    tail -c +34      > /tmp/check/check.cry    head -c 32      > /tmp/check/check.md5 6   echo "  /tmp/check/check.cry" >> /tmp/check/check.md5    call /   md5sum -c /tmp/check/check.md5 >/dev/null 2>&1 	       printf    error:check first md5 failed: 	   tostring !   rm /tmp/check -rf >/dev/null 2&1    decry    dec_file_entry    /tmp/check/check.cry    /tmp/check/check.tar    untar =   tar -xvf /tmp/check/check.tar -C /tmp/check/ >/dev/null 2>&1    error:untar fail:    image_check    /tmp/check/check 3   cd /tmp/check;md5sum -c check >/dev/null 2>&1;cd - W   cp /tmp/check/database.bin /tmp;rm /tmp/database.tar;rm /tmp/check -rf >/dev/null 2>&1    result:    error:no target file                     ç      f    @ À J   @@À   b@ I     @@ÈÀ   HA ×@¢@  ÀA BÈ@ ¢    @ ÀBÈ@ ¢  @ É   ã  È  
 AC ÈÁ !  
  "A
 AC ÈÁ !B   "A Å  DB " 
 D ÈÂ  [ "B DB " A    @B  E[ Â "Â[ M ÀÀûM @@ûÑ Æ Â ÇBÛ 
 BG ÈÂ  ["B ÷
 G "B
   ÂGH "B       £  #  !       exec ,   nvrammanager -r /tmp/database.bin -p qos-db    iqos-db-parser     /tmp/database.bin     /tmp/db_id_name    nixio    fs    access    /tmp/db_id_name    io    input 	       foreach    qos    app    read    *line    set 	   settings    version    string    match    (%d+):([%w%s_]+) 	      name    id    custom    appid    section    commit_without_write_flash 
   fork_exec    rm /tmp/db_id_name        ú  þ      @ @ @À À@@ MÀÀ  J   F Á È@  @ b@ #        custom    appid    name     delete    qos                             A   @@ b    @ À A   @@ b C   #     	   tonumber    id                                 "  5       	  A   @  b À  I   À  c A  @ b   J   FÁ ÈÀ  b@ A@ @Â @ÀÂ @ b Y   À J  @ Ã @ b@ #  #        database_check    /tmp/database.tar  
   err_check    db_create_config    /tmp/database.bin    delete_all    qos    rule    nixio    fs    access 
   fork_exec    cd /tmp/; nvrammanager -e -p qos-db; 
        nvrammanager -w database.bin -p qos-db; rm database.bin; 
        echo 'qos database upgrade' > /dev/console;                     7  9        	  #  #                          t  |      a   
      @Ê    EA  DA¤  £   #     	   dispatch 
   post_hook        u  z          À    À    @@À À ¢@   £  #        cmd 
   fork_exec                                 ~         H   @  @À@á        ¢@     AÁ@ ¤  £   #        /tmp/database.tar    luci    http    setfilehandler    _index 	   dispatch                Ê   Ù@  @Á   À@À
 H  âÃ   Y   À Ê   ÆÀÀ[ â@    Ê   Æ Áâ@ #        io    open    w    write    close                                              E  @  È  _@ À  È  ¢  "  Á#        entry    admin    qos    call    _index    leaf                             