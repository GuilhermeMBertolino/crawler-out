LuaQ               ´      H@    À@"@  H@ " A   b   ÈÀ ¢ Á   â  HA " A  b  Á Â â  @BCb  ÂCBDÂDBEÂEBFÂFBGÈ ÃÇ ÈC " C     a    ¡C  á      ÂÃ áÃ             Â	 á    !D    a              BD	 aÄ  ¡ áD     	 !   		 !Å   	Å	 !  
 !E  E
 !    
 !Å        Å
 !     E @EC 
b ¡E     ¡   Å ¡Å  ¡      E ¡E       ¡  Å ¡Å    ¡       E ¡E  ¡              Å ¡Å        ¡              E #  :      module    luci.model.tm_clientmgmt    package    seeall    require 	   luci.sys    luci.tools.debug    luci.model.uci 
   luci.json    ubus    luci.model.one_mesh    luci.model.client_mgmt    client_mgmt    cursor    0    other    1    pc    2    phone    3    laptop    4    tablet    5    entertainment    6    printer    7    iot_device    /proc/pctl/devices    get_profile    onemesh    onemesh_support    no    init    get_client_list_qos    get_client_list_dev    set_client_info    batch_set_client_info    remove_client_list_for    get_client_list_by    get_devices_mac    get_devices_name    get_devices_family    /tmp/tmp-device-config    get_client_type_list    get_client_type    qos_schedule_to_byte    get_access_client_list_qos    get_access_client_list    client_house_keeping    remove_client_list    get_ARP    get_ip_by_mac    get_access_device_list    set_client_nickname *   get_access_device_list_with_access_uptime        +   4       [      @@Û    HÁ  ¢ [      A   @@Û  A HÁ  ¢ [     AÛ  Á ¢   B ¢   #  #  	      string    gsub    -        yes    :    match    %w+    upper                     6   =        [      @@Û    HÁ  ¢ [     @@Û   HÁ  ¢ [     @AÛ   ¢  ÀA ¢   #  #        string    gsub    -        :    match    %w+    upper                     @   B        
    @ "    #        connect                     F   n     K   
   @   
    @ " E     @@  @¢ [  À@ 
 H A  Á¢[     ÁÀ  â À
 Â   AÂ  bM@ Â @DCBÂÀÂMÀ ÂÀB@ ÂÄ^  û@ÂY  JÂb  CC [¢     ÄAB@ÂY   V QÁÀÞ  @ô£  #        connect    yes    api_get_mesh_clients    call    get_hist_list    request_type 	      ipairs    mac  	   hostname    UNKNOWN    get_all 
   blacklist                     p   ~        
     @ H@  " H  À  Á  À@ÁÀÁÀÀÁâ  ¢      ÀBÀ @ @@B@   ýc  #  
      getenv    REMOTE_ADDR        ipairs    luci    sys    net 	   arptable    IP address    HW address                            	   E       @¢ Ê  â Æ@ÀH  Á  â Æ Áâ AA Û  !       "Ac  #        cursor    gsub    -    :    upper    foreach    access_control               2   J         @Ê  Æ@ÀH  Á@ â DÀ J        @    Ê   Ö À  A@A HÁ ¢  B¢ D J        @    Ê   Ö À  AÊ  Æ@ÁH Á â Æ Ââ À   @    À D#     	      get_all    access_control    .name    mac    gsub    :    -    upper    host    HOST 	   NON_HOST                                    Î     u   
   @   
    @ " @@ @ E   c  E      Ê  ÀÀÊ À ÁA â@[  BÁ  Á  ÂÀ  Ê ÀÁâ@ ÆÀA J  ÅA  ÄAÁâ[ Ê  â 
 ÁB ÈA  "A    Á E   Û ¢@ÀBDÙ    [ "M  @DDÀ@DÀ@DDM @DÀÄ@ @DB  û CD  
@CD" J FÅÈC  b Y    BÀ ÃEC    C  FC [" @DDDD  BA   þ CD   FD  Àïc #        connect     yes    _    api_arrange_mesh_clients 	       api_get_mesh_clients    call    get_hist_list    request_type    black_list    get    access_control 	   settings    enable    off    pairs    mac 	   hostname    UNKNOWN    get_all 
   blacklist    online    connect_status    on    ipairs 	                       Ð   Ó     
   
    @ @  È  " @    À  #  #        get_profile    client_mgmt    max_dev    64                     Õ   ×           À@@ ¢ Á    AÀ â KÀ   @    £  #     	   tonumber    access_time                     Û   ü    3      ¢ Å   
 @A  È  !   "AAÁ   b    AA[ "A ÁJ FÁÁÈA   BbA 
@AB " J FÂÈA    [   bA I MÀÂ @ M Ã @ ÀÂ   ACB  ¢[ c #        foreach    client_mgmt    client 	   tonumber    table    sort 	      delete    .name    mac    section     commit        â   ç       [      Ê   Ö Ñ À@#     	                                   þ      &   @ @ M@À  @@ M@À @AÀ  @  AA H ¢ ÀA¢ À @ b@I       BA H ¡       
   ¢@Y       ÀBA ¢£    Û   ¢ £  #        name     mac    set_client_nickname    gsub    -        upper    foreach    client_mgmt    client    commit                J   Y@  @J  @ À  @   I  C   J  F@À È  Á  @A  b@ #        mac    section    client_mgmt    client    .name                                   .      I      Û   ¢  I   Ê  ÆAÀH  Â  á      
   âAY@  À Ê  I  âA`     û    A  ¤ £   #        pairs    foreach    client_mgmt    client    commit           %      J   Y@  @J  @ À  @   I  C   J  F@À È  Á  @A  b@ #        mac    section    client_mgmt    client    .name                                 1  D      A   @@À b   Ê   ÆÀÀH A á       
     â@A Ê   ÆÀÁH ä ã   #        os    time 	       foreach    client_mgmt    client 	      commit        5  >   "   J    @   @@@ MÀ AÀ  @@ b M Á ÀAÀ  @@ b    @J  F@Á È  ÁA b@ J  F Â È  ÁA H  A b@ H C #     	   owner_id 
   prio_time  	   tonumber 	ÿÿÿÿ   delete    client_mgmt    .name    set     	                                   F  V      E       @A  H  ¡       ¢@c  #        foreach    client_mgmt    client        I  S      @ @     ÀE   @ D @ D À@ D@A D A D   Ê  Ö ÑÀÁ@#     	   owner_id 
   device_id    .name    mac    client_type    type    name 	                                   X  i      E      Ê   Æ ÀHA    á         â@Ê  ÀÀÀ â@ c  #        foreach    client_mgmt    client 
   dumptable        \  e      @ @ M@À  @ @      E   @ @    À@ Ê  ÀÀ Ê  
  AÄ Ê    Ä #     	   owner_id  	   real_mac    mac 	                                   k     
   E       @¢ Ê  A  â   J FÀÈÁ   a            
 bAJ @AÁ bA c  #        api_get_mesh_clients    black_list    foreach    client_mgmt    client 
   dumptable        q     	<   @ @ M@À À@ @     À@@ Y@    @À@   Ê  À@À
   Á  
 â   ÂÀ@ @   @ Þ   þÁ@ 
â   ÂÀ@ @    @ Þ   þAÊ  
  ÁAJ@Â b YA  À @AB YA    H Ä@Ê    Ä  #     	   owner_id  	   real_mac    mac    pairs    ipairs 	      match_history_list    name    UNKNOWN                                   ¢          E       @A  H  ¡       ¢@  À@Û   ¢@ #  #        foreach    client_mgmt    client 
   dumptable                @ @ Y   À@ @ @À  E   @ @    À@ Ê   ÀÀ  Ê  
  AAÄ Ê     Ä #        family    on 	   real_mac    mac  	                                   ©  ¹    	#      A   @@À    È  bY   @ÀÀ ¢ @ ÁAÛ ¢ÁÂA   ÁA À@  Àü@Â ¢@   BÈÀ 
  H ×@¢@ #  #        io    open    r    lines    device_mac    device_type    string    match    ([^,;%s]+) (%d+)    close    print    open  	   failed.
                     »  Â   
     M @À Ê   Àã  @ È@  ã  #         other                     Å  Ô    *   M @ @ @@ @ H  c  @À@    È  b È@  HÁ  ÈA  HÂ @È   [ "@A  bÀ@@C CÈÃ D¢Ñ^  @ý  Àûã  #          	       split         Sun    Mon    Tue    Wed    Thu    Fri    Sat    ipairs    math    pow 	   	                       ×  \    ?     E      ¢ Á@  ÀÀâ   AÁ  b    A  AAÈ ¢   Ê ÆÁÁH B â ÙA    È Â [ "CA @CÃCÈÃ bFÄÈC  b FÃÄb    A C@?  Ê Câ ÃÀEÃÀCÃÀFM@Æ ÀFÙC    ÀFÃÊ ÆÇHD ÀC¢ È âMÀÇ@Ê ÆÇHD ÀC¢ È âÙC  À Á  C[âÃÀCHÃÀHÙC    ÈC ÃÀÃHÃÁC	 
 GD ÀDE	 "â  ÙC    È	 ÃÊ ÆÇHD DEÈÄ	 âÙC    ÀÃIÃÊ ÆÇHD DEÈ
 âÙC    ÈC
 ÃÊ ÆÇHD DEÈ
 âÙC    ÈC ÃÊ ÆÇHD DEÈÄ
 âÙC    È ÃÊ ÆÇH Ä ÀI¢ ÈÄ âÙC    ÈC ÃÊ ÆÇHD DEÈ âA  A L@ ÃL  M Á@Å  
 GD ÀDEE "D    D J FÇÈD  EEH bYD    HD  G	E @EEÅ ¢D    D Á ÀÎ	 HE â Î	@ÅÎ	M Å M@Æ NÛF ¢Û @ÅÎ	M E
@M@F
ÀM Å
@M@Æ
À ECÛ 
 HÆ ¢ ÈE   FC[ 
 "H  FCÛ
 HÇ ¢ ÈF   GC[
 "Ä  ÄCÆ GF @FEF ¢E    E
 Ä Û 	¢ ÄÃ GF @FE ¢E    E   GF @FE ¢E    E
 ¡Ö  ÑÎÀCEDÌ  »
 ÂPB È !    
 
     
      "B#  #  E      get_client_list_dev    os    time    get_client_type_list    yes    api_arrange_mesh_clients 	       get_profile    qos    qos_schedule_support    no    ipairs    string    sub    mac 	
      gsub    :    -    upper  
   device_id    ip    name 	   nickname     	   hostname    client_type    get    client_mgmt    type    other    get_client_type 
   wire_type    guest    online 	   owner_id 	   tonumber 	ÿÿÿÿ   access_time    prio    off 
   prio_time    time_period    -1    owner_name    parental_control_v2 	   tostring    client_type_changed    false    true     slots    slots_next_day    repeats    split      	   	   	þÿÿÿ   status    qos_schedule_to_byte    time_schedule 
   time_mode    period    schedule_enable    foreach    client        #  V   å   A   @@À @ ÈÀ  bF Á È@  b FÀÁ b    Ê   @ â À M B@4@B B3  ÀBÀ  @  À1   Ê   @ â ÀÀC À À@ À ÀÀC Ù@    È  ÀÀD Ù@    È  ÀÀÀD Ù@    È  ÀÅ ÆÀ@F Ù@   Á ÀÀÆâ ÀÁ@  G â Ù@    È À Ê  Æ ÈHA G A     ÈÁ âÙ@    È  ÀÀ@B Ù@    È ÀÀÀH Ù@    È  ÀÀ I Ù@    È@	 À ÀI  Â@ ÀI   JÊ ÀÂ@Å   
 HA
 ÀAC
 "A     J FÈÈA
  BCHÂ
 bYA    H  HB
 @BC ¢A     Á  ÀAË H â ÂË@ÌM Ã M Å  BKÛ ¢Û @ÌM C@M EÀM Ã@M ÅÀ  B@Û Ã H ¢ ÈB    C@[ C "H   C@ÛÄ H ¢ ÈC    D@[D "Ä  Ä E HC
 @CC ¢B     ÄÂ Û ¢ ÄÀ  HC
 @CCC ¢B      HC
 @CCÃ ¢B     Ê  
  ÁKÄ #  8      string    sub    mac 	
      gsub    :    -    upper    true    prio    on    yes  
   device_id    ip    name    UNKNOWN    client_type    type    guest     
   wire_type    offline    online 	       access_time    os    time 	   owner_id 	   tonumber 	ÿÿÿÿ   owner_name    get    parental_control_v2    off 
   prio_time    time_period    -1    client_type_changed     client_mgmt    slots    slots_next_day    repeats    split      	   	   	þÿÿÿ   status    qos_schedule_to_byte    time_schedule 
   time_mode    period    schedule_enable                                 `            E      ¢ Á@  ÀÀâ Á  " E     A  AAÈ ¢ [ Á Û ¢ÀÁ ÀBÂ BHÃ âÆÃHC  â ÆÂÃâ 
   A  Ã   J Bb C@BC@ÃDM Å @ÃDYC    @CECJFÃÅÈ 
 @B" HD bYC  À A BÛ bCA ÃE @DDÄ ¢b  YC    H CJFÃÅÈ  DDHD bYC    H CJFÃÅÈ  DDHÄ bYC    H CJFÃÅÈ  DDH bYC    HC C@HCV  QÃÈ @CDD É  @çAI H	 ¡    
  
       ¢A#  #  '      get_client_list_dev    os    time    get_client_type_list    yes    api_arrange_mesh_clients 	       ipairs    string    sub    mac 	
      gsub    :    -    upper  
   device_id    name 	   nickname     	   hostname    client_type    get    client_mgmt    type    get_client_type 	   owner_id 	   tonumber    prio    off 
   prio_time    time_period    -1    online 	      true    foreach    client             F   A   @@À @ ÈÀ  bF Á È@  b FÀÁ b    Ê   @ â À M B  @BÀ  @  À
   Ê   @ â ÀÀ@ À À C Ù@    È@ À ÀÀC Ù@    È@ À Á@  D â Ù@    È À ÀÀD Ù@    È  ÀÀ@E Ù@    È ÀÀE Ù@    ÈÀ À Ê  
  FÄ #        string    sub    mac 	
      gsub    :    -    upper    true    yes  
   device_id    name    UNKNOWN    client_type    type 	   owner_id 	   tonumber        prio    off 
   prio_time    time_period    -1 	                                     ¸           @@ " H     À@ HA ¡     
     ¢@Á À    ÀA ¢@#        os    time 	       foreach    client_mgmt    client 	      commit           ³   <   [    À @@À @@À ÀÀ @@  #  À M@@  ÀÀ ¢ M@AÀ	  ÀÀ ¢ Ê   À @Á @@À  ÀA @AÂ ¢@      ÀB @AÂ Á  È ¢@   ÀB @AÂ   È ¢@   ÀB @AÂ   È ¢@    #        prio  
   prio_time    time_period 	   tonumber 	ÿÿÿÿ	   owner_id    delete    client_mgmt    .name 	      set                                     º  Ñ   A      @@¢ È  Y   @Á  [ "@J   b  AC [ ¢Ê ÆÁHC ÈÃ â [ "   @M@Â@ [" MB ["  @
 ÃBC Û"C 
 CC Û HD "C È   ÀóÃÀ 
 ÁCA "A#        os    time 	       ipairs    get    client_mgmt 	   owner_id 
   prio_time 	   tonumber  	ÿÿÿÿ   delete    set     	      commit                     Ô  Û       
   @   
    @ "    
   @@     #  
   @   ÈÀ    $ #   #        connect     call    get_ARP                     Ý  å       A   b Y@    E   @  Û  ¢  À@ @ ÀÁ@ã    þ  £  #        get_ARP    pairs    mac    ip                     é     ª      Å     " J  YA   J @AÀb   Å  
 @@
 A[  "BÂ  BÂ  Â  
 AHB " Û Á ÈÂ C   " 
BB ÈÂ  "JFBÂÈ Ã HC bC@ÀÃÀD HC ¡   
  ¢B Û ¢@ÁÃ ÀÅ DEH âÆÃÅH D â ÆÆâ 
 @  Ä    JDEb D@DGD@DED@GD@HM@È @HYD    @HDJFDÂÈ	 
@EE" HE	 bYD  À A	 DEÛ bD@ÄID@JDJFDÂÈ	  GHE
 bDJFDÂÈ	  GH
 bYD    HÄ
 DJFDÂÈ	  GH bYD    HD DJFDÂÈ	  GH bYD    HD DJ DEb @DÀË  ÌV QDÌ   Àå£  #  2      get_client_type_list    connect    yes    _    api_arrange_mesh_clients 	       call    get_hist_list    request_type    get    access_control 	   settings    enable    access_mode    on    black    foreach    black_list    pairs    string    sub    mac 	
      gsub    :    -    upper  
   device_id    ip    access_time    name 	   nickname     	   hostname    client_type    client_mgmt    type    get_client_type 
   wire_type    guest 	   owner_id    prio    off 
   prio_time 	ÿÿÿÿ   time_period    true    0.0.0.0 	          þ         J     À @ ¢ D@@#        mac    true                                    #         @      @¢ Æ@@J   Å  ÄAÄ â@#        connect    call    set_dev_nickname 	   nickname    device_mac                     &  ]   °      Å     E    ¢ Ê  ÙA   Ê ÀAÀâ   E   @@AÛ  ¢BÃ  ÂÂ  Â  AÈB ¢ [ Á
 HÃ C   ¢ BB HÃ  ¢ÊÆBÂH Ã ÈC âC@ÀÃÀ
D ÈC !   
  "C [ "@AÄ @ÅDEÈ bFÄÅÈ E b FÆb  @	 D   Ê EEâ ÄÀDGÄÀDEÄÀGÄÁ  ÅGâ ÄÀHMÀÈ	 ÀHÙD    ÀIÄÊÆDÂ	H	 ÀEE¢ ÈÅ	 âÙD  À Á
  EE[ âÄÀDJÄÀJÄÊÆDÂ	H	 G	ÈÅ
 âÄÊÆDÂ	H	 G	È âÙD    ÈD ÄÊÆDÂ	H	 G	È âÙD    ÈÄ ÄÊÆDÂ	H	 G	È âÙD    ÈÄ ÄÊ  EE	â ÀÄ@Ì	  ÌÖ ÑÄÌ		  Àä£  #  4      get_client_type_list    connect    yes    _    api_arrange_mesh_clients 	       call    get_hist_list    request_type    get    access_control 	   settings    enable    access_mode    on    black    foreach    black_list    pairs    string    sub    mac 	
      gsub    :    -    upper  
   device_id    ip    access_time    access_uptime 	   tonumber    name 	   nickname     	   hostname    client_type    client_mgmt    type    get_client_type 
   wire_type    guest 	   owner_id    prio    off 
   prio_time 	ÿÿÿÿ   time_period    true    0.0.0.0 	          <  >      J     À @ ¢ D@@#        mac    true                                         