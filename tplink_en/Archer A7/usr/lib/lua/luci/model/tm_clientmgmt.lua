LuaQ               ~      H@    À@"@  H@ " A   b   ÈÀ ¢ Á   â  HA " A  b  Á Â â  @BCb  ÂCBDÂDBEÂEBFÂFBGÈ !  aC      BÃ a          B aÃ     ¡   áC           ÂC á  !Ä a        ¡D     ¡   Ä ¡Ä  	 ¡    D	 	 ÀDC 	â !E    Å	 !   
 !Å     E
 !     
 !E  Å
 !     !Å       E !  #  /      module    luci.model.tm_clientmgmt    package    seeall    require 	   luci.sys    luci.tools.debug    luci.model.uci 
   luci.json    ubus    luci.model.one_mesh    luci.model.client_mgmt    client_mgmt    cursor    0    other    1    pc    2    phone    3    laptop    4    tablet    5    entertainment    6    printer    7    iot_device    /proc/pctl/devices    init    get_client_list_qos    get_client_list_dev    set_client_info    batch_set_client_info    remove_client_list_for    get_client_list_by    /tmp/tmp-device-config    get_client_type_list    get_client_type    get_access_client_list_qos    get_access_client_list    client_house_keeping    remove_client_list    get_ARP    get_ip_by_mac        *   1        [      @@Û    HÁ  ¢ [     @@Û   HÁ  ¢ [     @AÛ   ¢  ÀA ¢   #  #        string    gsub    -        :    match    %w+    upper                     5   7        
    @ "    #        connect                     ;   ^     >   
   @   
    @ " J  @@À b    Á   â À
 ÂÀ   A   bM@ ÃÀ @DÁCÁÀCÁMÀ CÁA@ CÁÄ^  û@ÂÀY  JÂÀb  ÂA [¢     ÄÁ@ÂÀY   V QBÂÀÞ  @ô£  #  
      connect    api_get_mesh_clients    ipairs    mac  	   hostname    UNKNOWN    get_all 
   blacklist 	                       `   n        
     @ H@  " H  À  Á  À@ÁÀÁÀÀÁâ  ¢      ÀBÀ @ @@B@   ýc  #  
      getenv    REMOTE_ADDR        ipairs    luci    sys    net 	   arptable    IP address    HW address                     q       *   E     À   @@  HÁ   ¢@    @ Ê   Æ@ÀH  Á  È âM@ À  c    ¢  BA H ¢ ÀB¢ Ê   Æ ÃH    á    
     â@c  #        black_list    get    access_control 	   settings    enable    off    access_mode    white    gsub    -    :    upper    foreach        ~       2   J         @Ê  Æ@ÀH  Á@ â DÀ J        @    Ê   Ö À  A@A HÁ ¢  B¢ D J        @    Ê   Ö À  AÊ  Æ@ÁH Á â Æ Ââ À   @    À D#     	      get_all    access_control    .name    mac    gsub    :    -    upper    host    HOST 	   NON_HOST                                    Ä     x   
   @   
    @ " @@ @ E   c  J  @À À  b@J @Áb ÈA ¢ Å   [ "@ÃAY    Û ¢M ÀÄA	@	@DÀÀB B	M 	 ÀB@Â	@ ÀB	Ã  ûÃA   ÀÃA¢ ÊÆÂHÄ  â Ù    CÀÃ@ Û¢ ÀÄA ÅA	 	  CC   þ Û ¢ ÀÄA	 ÅA 	  Ã@   þÃA  Ã DÀÃAD HD ¢ Á Ä â  ÅAD  È bD ÈÄ  ¢"  @CM@@   VQDÃÄ  èã #        connect     api_arrange_mesh_clients 	       api_get_mesh_clients    black_list    pairs    mac 	   hostname    UNKNOWN    get_all 
   blacklist    online 	      ipairs    string    sub 	      require    bit    band 	   tonumber 	      2                     Æ   É     
   
    @ @  È  " @    À  #  #        get_profile    client_mgmt    max_dev    64                     Ë   Í           À@@ ¢ Á    AÀ â KÀ   @    £  #     	   tonumber    access_time                     Ñ      Z      ¢ Å     J FÀÈA    a  
     bAV Á  Û ¢ @ÀA @AÁ Ê bA@A  Ö ÑÁ ÂÁÀÂÙA    ÀAÂ
 @B  È  !C  
     "B [ " J FÃÂÈC   bC    þ`  JAB b  CB  H  Û  ¢A  ACÀAB ÆÃHÂ  â ÆAÄâ  D ¢A MÀÄ @ M Å @ ÀÄ  Ê ÆAÅHB  â£ #        foreach    client_mgmt    client 	   tonumber    table    sort 	      .name 	   real_mac    mac    pairs    delete    section    set_client_nickname    gsub    -        upper    name     commit        Ù   à       [       @A  @@ Á  ¢@  @    @A  @@  ¢Ê  ÀÀÀÊ    Ä Ê  
  AÄ@ #        get    client_mgmt    .name 	   real_mac    mac  	                       ë   ð       J   F À È@   @ HÁ  bY@  @J   F À È@   @ H b  @ @  Ê  Ö Ñ@Á @  #        get    client_mgmt    .name 	   real_mac    mac 	                                           I       @A  H  ¡       
   
  ¢@Y       À@A  ¢£    Û   ¢ £  #        foreach    client_mgmt    client    commit        
     	%   @ @ @@ @     @ Ê   À ÀÉ  Ã  Ê  ÆÀHÁ   ÀAA 
  â@ Ê  ÆÁHÁ  AA È   â@ Ê ÀÀÁÂ A È " ÁB" J  @Ãâ@#        mac 	   real_mac    section    client_mgmt    client    .name    set    set_client_nickname    gsub    -        upper    name                                 !  5      I      Û   ¢  I   Ê  ÆAÀH  Â  á      
   âAY@  À Ê  I  âA`     û    A  ¤ £   #        pairs    foreach    client_mgmt    client    commit        '  ,      J   Y@  @J  @ À  @   I  C   J  F@À È  Á  @A  b@ #        mac    section    client_mgmt    client    .name                                 8  K      A   @@À b   Ê   ÆÀÀH A á       
     â@A Ê   ÆÀÁH ä ã   #        os    time 	       foreach    client_mgmt    client 	      commit        <  E   "   J    @   @@@ MÀ AÀ  @@ b M Á ÀAÀ  @@ b    @J  F@Á È  ÁA b@ J  F Â È  ÁA H  A b@ H C #     	   owner_id 
   prio_time  	   tonumber 	ÿÿÿÿ   delete    client_mgmt    .name    set     	                                   M  b      E      Ê   Æ ÀHA    á       
    â@c  #        foreach    client_mgmt    client        Q  _   !   @ @     ÀE   @@ @    @ Ê  ÀÀÀÊ   â DÀ À @ DÀ D ÀA DÀÀÀA DÀÊ 
 BÄ@ Ê    Ä #  	   	   owner_id 	   real_mac    mac  
   device_id    client_type    type    name 	                                   j  z    	#      A   @@À    È  bY   @ÀÀ ¢ @ ÁAÛ ¢ÁÂA   ÁA À@  Àü@Â ¢@   BÈÀ 
  H ×@¢@ #  #        io    open    r    lines    device_mac    device_type    string    match    ([^,;]+) (%d+)    close    print    open  	   failed.
                     |     
     M @À Ê   Àã  @ È@  ã  #         other                       Û    Ù      E      ¢ Á@  ÀÀâ Á  " J  @Áb   AAÈ ¢ ÁÁ  â@+  CB@ÂÃ "CC È " ÃC" @@À'E   ÀÂ¢ DÂDÂCD H ¢ ÃC¢ DÃÄDÅCD H ¢ ÃC¢ D EÄ @DÄD ¢C    ÆDC Û¢ÀÅ E	 	ÀB	ÆÃ	HE  â ÆÄÃ	â DÃÀDE	DÃ@   û EÄ @DÄÄ ¢M GÀ EÄ @DÄÄ ¢C  À C ÀÂ ¢DÇDÃÇC     DCÈDÃ Ê ÆÅHÄ DÄÈ â¢  C    	 D EÄ @DÄD	 ¢C    CÉD EÄ @DÄ	 ¢C    Ã	 D EÄ @DÄ
 ¢C     D EÄ @DÄD
 ¢C    
 D E AD Èb D ¢C     D M@ CH @  @Þ  ÀÓÊ ÆËHÂ Â á     
  
  âAÅ  B [  " VQÌÄ  þã #  1      get_client_list_dev    os    time    get_client_type_list    api_get_mesh_clients    api_arrange_mesh_clients 	       ipairs    string    sub    mac 	
      gsub    :    -    upper  
   device_id    key    ip    config_proxy_mac    name    get    client_mgmt 	   hostname    pairs    client_type    type    other    get_client_type 
   wire_type    guest        online 	   owner_id 	   tonumber 	ÿÿÿÿ   access_time    prio    off 
   prio_time    time_period    -1    owner_name    parental_control_v2 	   tostring    foreach    client 	          ¼  Ó   
W   @ @ Y@    @@@ FÀ ÈÀ   b F@Á b @@ @Á  H ¢ @A¢ Á ÀÀÁ H â @
   Á  @  J  b AA @AC A@ÁC A@D YA    HA AÁDAE@E AA ÁE b YA    HA AJ FÁÆÈ  ÂE B    B HB bYA    HA A@AG YA    H A@ÁG YA    HA A@H YA    HA AJ  D#  "   	   real_mac    mac    gsub    :    -    upper    string    sub 	
    
   device_id    key    config_proxy_mac    name    client_type    type    guest     
   wire_type    offline    online 	       access_time 	   owner_id 	   tonumber 	ÿÿÿÿ   owner_name    get    parental_control_v2    prio    off 
   prio_time    time_period    -1                                 ß  7    Ú      E      ¢ Á@  ÀÀâ Á  " J  @Áb   AAÈ ¢AÂ Û ¢+Á ÀCÂ BHÄ âÆÃHD  â ÆÃÃâ  Ä  (  J Bb D@DDA @DÂBÈÄ  b D È ¢ ÀF	E [ "AE Å È bâ  ÄÀBÆÃ	HE  â ÆÄÃ	â ÄÀGÆÃ	HE  â ÆÄÃ	â ÄÊ ÆÇ	HÅ  ÀB¢ ÈE âÙD    ÀHÄÁD â G@Ç@ ÂCF È " ÆC"  FÇ@ Þ  ûÊ ÆÇ	HÅ  ÀB¢ ÈÅ âM É	@Ê ÆÇ	HÅ  ÀB¢ ÈÅ âÙD  À ÁD	  B[ âÄÁD 
 G
Å ÀED	 "â  ÙD    ÈÄ	 ÄÊ ÆÇ	HÅ EDÈ
 âÙD    ÈD
 ÄÊ ÆÇ	HÅ EDÈ
 âÙD    ÈÄ	 ÄÊ ÆÇ	HÅ EDÈÅ
 âÙD    È ÄÀDÄÀDDD@Ë	ÀÄ MÀ@ÀDÀ@  @ÀÄEÀ       Ó KÃ HÃ ¡       
  ¢B  ÁB   â  ÄDÂÞ  þ£ #  0      get_client_list_dev    os    time    get_client_type_list    api_get_mesh_clients    api_arrange_mesh_clients 	       ipairs    string    sub    mac 	
      gsub    :    -    upper  
   device_id    online 	   	      require    bit    isProxyMac    band 	   tonumber 	      2    config_proxy_mac    name    get    client_mgmt 	   hostname    pairs    client_type    type    other    get_client_type 	   owner_id        prio    off 
   prio_time    time_period    -1    true    foreach    client          /   ;   @ @ Y@    @@@ @@ Á  ÀÀÀ H â
   Á  À
 @

 J  b  AMA  J  b AA @AB A@ÁB AAA C b YA    H A@ÁC YA    H A@AD YA    H A@D YA    HÁ AJ  D#     	   real_mac    mac    string    sub 	
       true 
   device_id    config_proxy_mac    name    client_type    type 	   owner_id 	   tonumber        prio    off 
   prio_time    time_period    -1                                 9  W           @@ " H     À@ HA ¡     
     ¢@Á À    ÀA ¢@#        os    time 	       foreach    client_mgmt    client 	      commit        ?  R   <   [    À @@À @@À ÀÀ @@  #  À M@@  ÀÀ ¢ M@AÀ	  ÀÀ ¢ Ê   À @Á @@À  ÀA @AÂ ¢@      ÀB @AÂ Á  È ¢@   ÀB @AÂ   È ¢@   ÀB @AÂ   È ¢@    #        prio  
   prio_time    time_period 	   tonumber 	ÿÿÿÿ	   owner_id    delete    client_mgmt    .name 	      set                                     Y     Y      @@¢ È  Y   @Á  [ "@E   Ê  ÆÁHC  á  
      âBÊ  â 
  ÃAC Û "J  FÃÁÈC HD b Û ¢  @	MÀÂ@ Û¢ M C  Û¢  ÀC Û¢ Ê  ÆÃ	HE  	âD    þ C Û¢Ê  ÆÄÃ	HE  	È  âD   ýÈ@ `    Àí@ÄÀ 
  DA "A#        os    time 	       ipairs    foreach    client_mgmt    client    get 	   owner_id 
   prio_time 	   tonumber  	ÿÿÿÿ   pairs    delete    set     	      commit        b  g      J   F À È@   @ HÁ  bY@  @J   F À È@   @ H b  @ @  Ê  Ö Ñ@Á @  #        get    client_mgmt    .name 	   real_mac    mac 	                                            
   @   
    @ "    
   @@     #  
   @   ÈÀ    $ #   #        connect     call    get_ARP                              A   b Y@    E   @  Û  ¢  À@ @ ÀÁ@ã    þ  £  #        get_ARP    pairs    mac    ip                             