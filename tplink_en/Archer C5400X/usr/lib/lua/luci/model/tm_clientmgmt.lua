LuaQ               {      H@    À@"@  H@ " A   b   ÈÀ ¢ Á   â  HA " G ÀÁBâ  BCÂCBDÂCÅBÄÂCÂÃBFÂCÇÂÃÂCÂÃEÂÃEÂÃÂCÅÂIGÅEBÃBDBÄBCÌÂÉEÂÉÂCÅBFÅEa  ¡B     B ¡   áÂ  !      aC    B a    BÃ aÃ  B HC ÃBÛ¢ á     Â áC        ÂÃ á        Â áÃ   ÂC á      Â áC      ÂÃ #  D      module    luci.model.tm_clientmgmt    package    seeall    require 	   luci.sys    luci.tools.debug    luci.model.uci 
   luci.json    ubus    client_mgmt    cursor    Desktop/Laptop    pc    Router    other    VoIP Phone    phone    Miscellaneous    IPTV    entertainment    Smartphone    UPS    Wireless Router    IP Network Camera    iot_device    VoIP Gateway    Printer    printer    Wireless Access Point    Switch    Wireless Controller    Media Link Controller    Network Diagnostics    Game Console    NAS    PDA    Multimedia Device    eBook Reader    tablet    Scanner    Video Conferencing    DVR    Thin Client    Phone    Video Phone    Workstation    Apple iOS Device    laptop    Tablet    SmartTV    Android Device    Smart Switch 
   Projector    Wireless Lighting    SmartWatch    Walkman    init    set_client_info    batch_set_client_info    remove_client_list_for    /tmp/tmp-device-config    get_client_type_from_tm    get_access_device_list    client_mgmt_synch_from_history    remove_client_list    set_client_nickname    set_client_devtype        D   K        [      @@Û    HÁ  ¢ [     @@Û   HÁ  ¢ [     @AÛ   ¢  ÀA ¢   #  #        string    gsub    -        :    match    %w+    upper                     O   Q        
    @ "    #        connect                     S   V     
   
    @ @  È  " @    À  #  #        get_profile    client_mgmt    max_dev    128                     X   Z           À@@ ¢ Á    AÀ â KÀ   @    £  #     	   tonumber    access_time                     ^       3      ¢ Å   
 @A  È  !   "AAÁ   b    AA[ "A ÁJ FÁÁÈA   BbA 
@AB " J FÂÈA    [   bA I MÀÂ @ M Ã @ ÀÂ   ACB  ¢[ c #        foreach    client_mgmt    client 	   tonumber    table    sort 	      delete    .name    mac    section     commit        e   j       [      Ê   Ö Ñ À@#     	                                          #   I      À @ À À@@ ÀÀ@ À ÀÀ@ ÀÀ A À Ê   Æ@ÁH Á á      
   â@Y    Ê   Æ ÂH âã  Á@ â@ Ê   â ã  #  
      mac 	   owner_id    prio 
   prio_time    time_period    foreach    client_mgmt    client    commit    client_mgmt_synch_from_history                  J   Y@  @J  @ À  @   I  C   J  F@À È  Á  @A  b@ #        mac    section    client_mgmt    client    .name                                    ´       I      Û   ¢  I   Ê  ÆAÀH  Â  á      
   âAY@  À Ê  I  âA`     û    A  ¤ £   #        pairs    foreach    client_mgmt    client    commit        ¦   «       J   Y@  @J  @ À  @   I  C   J  F@À È  Á  @A  b@ #        mac    section    client_mgmt    client    .name                                 ·   Å       A   @@À b    @Á  H ¡       
   ¢@   @AÁ  ¤ £   #        os    time    foreach    client_mgmt    client    commit        º   Â    $   A      b    À@@ ¢  @@ MÀÀ A   @ b M Á ÀA   @ b    @J  F@Á È  ÁA b@ J  F Â È  ÁA HA  A b@ #  
   	   tonumber 	   owner_id 
   prio_time  	ÿÿÿÿ   delete    client_mgmt    .name    set                                     Í   Ù       H      @@  HÁ  ¡       
  ¢@c  #        other    foreach    shn_dev_info    device        Ñ   Õ       J    @  J  @@ @ Y@    H  C  #        dev_mac 	   dev_type    other                                 Ü         M À @ @  ¢@    Å   
  A   
  @" FÁ@Ê  EB  DbAÂ H B ¢ÊÆÁHÂ  È âÀB@ ÃÀ
BCÂ È !   
  "BÂ ["@E   ÀCD¢ DDDCDDÃDDCEME CEC    ÃEDF   FM@F@FME FDÀ Ã ÀCD¢ DGDCGDAÄ @Ä ¢DAÄ @Ä ¢C    C DAÄ @Ä ¢C    Ã DAÄ @Ä	 ¢C    Ã D ÀCÄ¢ @I  DI ÃI@  Àé£  #  (      speed    client_mgmt_synch_from_history    connect    call    get_hist_list    request_type    get    access_control 	   settings    enable    access_mode    on    black    foreach    black_list    ipairs 
   device_id    mac    ip    access_time    name 	   nickname     	   hostname    device_type    unknown    client_type    get_client_type_from_tm 
   wire_type    guest 	   owner_id    client_mgmt    prio    off 
   prio_time 	ÿÿÿÿ   time_period    true    0.0.0.0 	          ì   î       J     À @ ¢ D@@#        mac    true                                   0    E       @@ " J   FÀ ÈÀ   HA bY   À Û  ¢    Û  ¢ ÀA    #    @      B¢ Æ@BJ ÅA  ÄÃâ  AA bÀ  ÀÃ¢ ÁC^  @þJ  FÄÈÁ  B a    
  
      bAJ  FÄÈÁ   HB   bA J  FÁÄÈÁ  dc  #        os    time    get    client_mgmt    info    synch_time 	   tonumber 	<      connect    call    get_hist_list    request_type 	       ipairs    mac    true    foreach    client    set    commit          +   :   J     À @ ¢ @ M@À @J  FÀ ÈÀ   A b@ À
@@A MÁ AÀ @A b M Â ÀAÀ @A b   @@@B Á @J  FÀ ÈÀ   A b@  J  FÂ ÈÀ   A HÁ  b@ J  FÂ ÈÀ   A HA  b@ J  FÂ ÈÀ   A HA  b@ #        mac    true    delete    client_mgmt    .name 
   prio_time  	   tonumber 	ÿÿÿÿ	   owner_id    set    time_period        prio                                 2  C   =      @@¢ Y   Á   â  
  [" J FÂÀÈ  HC b Â@ [  ¢ÁÂ â À  M B@ÁÂ  â M@ÂÁÂ  â @Ê ÆÂH  âB Ê ÆÂÂH  ÈC  âB Þ   ôÊ  Æ@ÃH â@#        os    time    ipairs    get    client_mgmt 	   owner_id 
   prio_time 	   tonumber  	ÿÿÿÿ   delete    set        commit                     E  H         @      @¢ Æ@@J   Å  ÄAÄ â@#        connect    call    set_dev_nickname 	   nickname    device_mac                     J  M         @      @¢ Æ@@J   Å  ÄAÄ â@#        connect    call    set_dev_type    device_type    device_mac                             