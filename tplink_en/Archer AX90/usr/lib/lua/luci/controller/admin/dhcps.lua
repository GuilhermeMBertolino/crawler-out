LuaQ               ¸      H@  " A     b    ÈÀ  ¢ Á    â   HA " A   b   ÈÁ ¢ Á   â  BB" A   b ÂB ¢ Á C A @ÃÃâBÈ C H ÃB ¢ ÀÃD â  á     !D       a     ¡Ä    á     	  Â áD   ÂD á   Â áÄ    ÂÄ á     	  Â áD     ÂD á        Â áÄ    ÂÄ á   Â áD   ÂD á        Â áÄ     ÂÄ á   Â áD    ÂD á Â ÅÄ    EE   DEE  E DDEEÄE  EE  Å DEÄE E   DÅ DEEÅ   DÅ DDEEEÅ   DÅ DDEEEÅ  Å DÅ DDEEEE   DEÄ!Å    HE " a   
B aE       
 	BÅ #  4      require    luci.model.uci 	   luci.sys    luci.tools.form    luci.tools.datatypes    luci.model.nwcache    luci.ip    luci.model.imb    luci.model.checktypes 	   IMB_INST    luci.tools.debug    cursor    module    luci.controller.admin.dhcps    package    seeall 	       /etc/init.d/dnsmasq    reload    Form    dhcp_opt_update    is_match_static_entry    load_static_leases    load_active_leases    get_dhcp_settings    set_dhcp_settings    update_static_lease    get_max_static_lease    static_lease_max_check    change_lease_items    insert_static_lease    remove_static_lease    remove_all_static_lease !   disable_all_invalid_static_lease    dhcplease_check_dup    setting    read    cb    write    cmd    client    load    reservation    others    insert    update    remove    clear    index    luci.model.controller    dhcp_index    dhcp_dispatch        &   C    W   J   F À È@    HÁ  b    @A  H   ¢Ê  À@Á [ âÆ@Àâ 
  AA[  "A" Ù   @ A   I  c AÁ Á BBb M@Â@PÁ Á ÀÂÀÂ¢ PBÂ  H   ÁB H  B È ¢A   ÁB H   Û¢A  £ @ @J  FÁÂÈ   HB  bA J  FÁÂÈ   H B bA I c I  c #        get    network    lan    ipaddr    netmask    IPv4 
   broadcast 	   tonumber 	   	ÿ   	       set    dhcp    start    limit 	d   	                       E   m     ^   
    @ @  È@    "@    À  G  À@  Ê  À Áâ AÁ "FÁAb [ FBb  À@B @Ê   Æ ÀH  ÈÁ â[ Ê   Æ ÀH  È â Ê   Æ ÀHÁ  È â
  @Á È B "J @Ã Û bFÂb YA     £ ÀÁ Û¢ ÇÂ [ "  @Â [ " BDÑÀ Â [ " Ñ  FÂDb BFÂÄb B# #        get    sysmode    mode    router    init    get_network    lan    ipaddr    netmask    ap    network    dhcp    start    limit    IPv4 	   tonumber 	    	      startip    string    endip                     o       [       @A  H  Á  ¢Ê   Æ ÀHA    È â
  AA[ "A@" J @AÁ ÛbFÁb  AAÛ  ¢Ê ÀAÁ [âB@" ÂA" FÂAb @ÀBÀ" ÂA" FÂAb M@@ 	  # Â  B[ B "AÂ @ÂÂÁ¢ ÈB b Û ¢ Á â @   £ Ð  @ ÙB  @ 	  #  ÃÂ ÃBC@ÃB@ÃÂ c#        get    network    lan    ipaddr    netmask    IPv4 
   broadcast    string    match    .(%d+)$ 	   tonumber 	   	                          ­     H   
    @ @  È  Á  "J   F À È   HA bY@    H    @  @ É   ã  ÁÀ   â  ÂB "BÀFÂÈ bYB    HB @ÀC FÂÈÂ bÂÅ [ ßB À @DFÂÈ bYB    HB @Þ   ÷ÀÄ  Ê   Æ ÀH   ÈÁ âM@Å  À£  #        get    dhcp    lan    dhcp_option    sysmode    mode    router    ipairs    match    (%d+),    3    gateway    ,(.+)        6    ,(.+),%s*(.+)    dns    15    domain    ap    network    255.255.255.255                     °   Ï    Z       @Û   ¢ @  @    £    Û  ¢ Ê  â Ù   À AÀM   
@Á  È B "A
AÁ  È B HÂ   W"A  Â  @ÂAB  À ÂABA    ÂÁB  À ÂÁBZA   H B@ MÂAÂ  H B È  HC ×¢A  Ã   
AÁ  È B HÂ ÃW"A      À 
DÁ  "A#        ipaddr    gateway    delete    dhcp    lan    dhcp_option 	   set_list    3,    dns 	      0.0.0.0 	      6,    ,    domain    15,    commit                     Ñ   ç       I      Ê   Æ ÀHA    á    
   â@ÁÀ   â À ÁBA ÈÂ " @Â@ÂÀ   @ I  @ Þ  @üc  #  
      foreach    dhcp    host    ipairs    mac    gsub    :    -    enable    on        ×   Ù       J         @Ê  Æ@ÀH  Á@ â DÀ #     	      get_all    dhcp    .name                                 ê       Q      E       @A  H  ¡    
   ¢@   À@ ¢È@  HA ÝÀÁ  â@ ÃÁ@ @ÃÁFÂÈC  b FÃÂb @  @CÃYC    @ÃC@ Þ  ÀúÜùÁ  â @  @ÂÁFÂÈB Ã b ÄÂÂ¢ ÃB     ÄÀD Â B     ÃB      Þ  À÷#  #        foreach    dhcp    host    get_all    history_list 	      pairs    mac    gsub    :        upper 	   hostname 	   nickname    ipairs    -    ip    comment    enable    on    off        ð   ò       J         @Ê  Æ@ÀH  Á@ â DÀ #     	      get_all    dhcp    .name                                   <          A   @  b À ¢ Ê   ÆÀÀH A â Ù@    È 
  ÁA ÈA  "J  FÁÁÈ B HÂ b  CB ¢È  H ÝÁÂ  â Ä@@DÄFÄÈÄ  b FDÅb @À @ÄÅYD  @ @@ÅD@ Þ  úÜAùÁ  â  @CÄFÄÈÃ D b CÅ¢ ÅC    Ã ÂÇ@G@ ÃGÀ CHÀÇÎÈ¢ Á ÀCÈ ÇÄHâ ÄHÐ ÇOHDOÄÈD[ Ä ÛÅ [ WDC ÉBM@I  IÛ  B[¢      C    Þ  ï#  #  '      require    luci.tools.status    dhcp_leases    get_profile 	   wireless    ffs    no    get    network    lan    ipaddr    netmask    get_all    history_list 	      pairs    mac    macaddr    gsub    :        upper 	   hostname 	   nickname    ipairs    -    name    --    expires 	    
   leasetime 
   Permanent    math    floor 	  	<      yes     check_same_network                     >  j    p   
   " J  b    Ê  Æ ÀHA    ÈÁ  âÁA "ÁÁÀ Á Û ¢ BA Û ¢ ÁB AC Y   Ã    Ã A    Á Ä    Ä A    Á AÄ    	AÄ ÁD  À AÄ ÁDA    Á D E Á A    DAÄ E  À AÄ EA    Á AE E Á A    AEÀCÀÃÀ ÀCÀCÀCÀÃ @B  H  Â ¢@ Æ@  Ç   Ç£  #        get    dhcp    lan 
   leasetime    match    (%d+)(%l)$    h 	   tonumber 	<   	   tostring    ipaddr_start    startip    ipaddr_end    endip    gateway        domain    dns    pri_dns 	      0.0.0.0    snd_dns 	      ignore    0    enable    on    1    off    2    auto                     l  ¦   Ç   @ @ Y@    H@  @ ÀÀ@ Ù@    Û   A A    A  @AA A ÀÁA ÙA    È  BB B     B@J  FÂÂÈ C H Ã bB J  FÄÈ bBAB d c  @   D I  Â cJ  ÛbÂYB   É   ãÁB  â ÀÂÅ â @FH "C 
  ÃB ÈC  HÄ "C @H "C 
  ÃB ÈC  HD "C  [ "    Z@ Àÿ
  ÃB ÈC   [ D W"C 
  ÃB ÈC  ["C 
  ÃB ÈC Ä [ "C 
  ÃB ÈC 	 HÄ "C 
  CI ÈC 	 "C
  ÃI["    
  J ÈC 	 HD
 W"C @À  ÚA Àÿ@@  B Àÿ
  ÃI["    
  ÃI[ "   
  J ÈC 	 H
 ÈÄ
  W"C 
  K[ "    
  J ÈC 	 HD  W"C 
  D "CC $ #  #  .   
   leasetime        ipaddr_start    ipaddr_end    enable    gateway    domain    pri_dns    0.0.0.0    snd_dns    auto    set    dhcp    lan    ignore    2    commit    get_dhcp_settings    on    Start ip can not blank    Ip address pool is invalid    require    luci.model.log    Log 	Ô      off 	ù     1 	ø     0 	   tonumber 	@     2880    m    start    limit    dynamicdhcp    delete    dhcp_option    ipaddr 	   set_list    3,    6,    ,    host    15,                     ©  Ö      @ @ @@ Á  ÀÀÀÀ Á â    Á@ A[ " A   AA  b ÁÙ@  ÀAA b MÁ EA  DÂc A @ÁÂAÂC¢ ÈA  b Ä@A @ÁÂABC¢ ÈA  b AJ  @ÁÃABb Y  @J  @ÄADb YA   EA  DÄc @ÁD Å J FAÅÛ bY   I   cJ FÁÅÈ B [ Å C HC ßB bY   ÁBÀAÂ HB ¢ DY  @FÂ ¢Á  âÀ CÂ@CÂFÃÂÈC D b FÃb @@ ÃÇC     ÇD@ Þ  @ûY  @H ¢Ac    ÈA £#  "      old    new    luci    json    decode    type    table 
   errorcode    invalid new params    mac    string    gsub    upper    -    :    macaddr    ipaddr    ip    mac or ip address is invalid    enable    on    arplist_check_dup    imb duplication    update    dhcp    host    get_all    history_list    pairs     	   hostname 	   nickname    commit    modify item failed                     Ø  Ú       @  J   F@À È  Á  b Y@    J  @ #  #     
   max_rules    get_profile    dhcps    max_rsvd_host                     Ü  å          " J   F@À È  Á  b  A @ @    £    £  #        get_max_static_lease    count    dhcp    host 
   max_rules                     ç     o   À@ B  [" @@ B  [B AÂ   b BÁ¢ È   J  FÃÁÈ D a    bCA  b   ÄB	 QÃ@EE ¢[  	 Û ¢ÀCÀ ÀÁÅ ÀÄHF âÙ  ÄÆ " A  @Å"F 	  HF #  [ " Û  Æ  F["   Å"F 
  ÆB ÈF  "ZA   HÁ   FG[ "[  [" Q @FH ÛÇ 	  FI[ "F   ï^   ìI c #  &      index    type    table    require    luci.tools.status    dhcp_leases    /proc/uptime    foreach    dhcp    host    ipairs    get 	      ip    ipaddr    io    open    r    read    *n    close    read uptime failed 	   tonumber    math    floor    lan 
   leasetime    120m    string    match    (%d+) 	<      awk '{if (/    macaddr    /) {$1= r   }print}' /var/dhcp.leases > /var/dhcp.leases.tmp;cp /var/dhcp.leases.tmp /var/dhcp.leases;rm /var/dhcp.leases.tmp    os    execute        ñ  ó      J         @À@@ DÀ #     	      .name                                   =   v   @ @ @  @À@Û  ¢ @  ÀÁ   â M@Á Å@  ÄÀAã  Á  â Ù@   Å@  Ä@Bã  ÁÀ À Ã BAC" H Á â À Ê   À Ä Bâ Ù   @Ê   À@Ä Dâ Ù@   Å@  ÄÀDã  À E@Å Ê  ÆÅ[ âÙ    É   Á ã Ê  Æ ÆHA  Û  H  B â Ù   Á  C@ÂÁ È " Ä Ù   @
ÁF "AA  bÀÂÀÂÆÃH  â ÆBÃâ À@ÈB    BÈÄ@ ^  @ûÙ   @
HA "Aã   	  HÁ ##  $      new    luci    json    decode    type    table 
   errorcode    invalid new params    static_lease_max_check    reach max items    mac    string    gsub    upper    -    :    macaddr    ipaddr    ip    mac or ip address is invalid    enable    on    arplist_check_dup    imb duplication    insert    dhcp    host    get_all    history_list    pairs        comment 	   nickname 	   hostname    commit    insert new items failed                     @  O   	   @ @ @@ Á    â@ Ê   ÆÀÀH A Û  â Ù   @
 A "Aã   	  HÁ ##        key    index    change_lease_items    delete    dhcp    host    commit    remove static lease failed                     R  c    
      J   F À È@    a     b@AÀ     b    AB  [¢A ^   þJ   F@Á È@  b@I  c  #        foreach    dhcp    host    ipairs    delete    commit        V  Y      J         @À@@ DÀ #     	      .name                                 l     !   @      @A  H  Á  ¢  Y@      @A  H   ¢[     @A HÁ ¡  
       
   ¢@    B ¢@#  	      get    network    lan    ipaddr    netmask    foreach    dhcp    host    commit        t     
   @ @    @@Û  
 ¢@¢ Ê   À@À
 J âÆÀâ ÁÀ" FÁ@b M@
AA ÀA Â H "A #  	      ip    IPv4    network    string    set    dhcp    .name    enable    off                                       -   A   b @À @ 	À  ¢ @  @ É   ã  Á   â   BÀ@@ BA @ÁM@À ÂA BB È " ÂB" @ÂÁFÂÈB  b FÂÂb @@ 	 # Þ   ù   £  #        get_dhcp_settings    enable    on    load_static_leases    ipairs    ipaddr    ip    mac    gsub    -    :    upper                     °  ²           E  @  È  _@ À  È  ¢  "  Á#        entry    admin    dhcps    call    dhcp_index    leaf                     ¶  ¸       
     @ A@  "@ #        _index    dhcp_dispatch                     º  Â      a   
   
     @Ê   EA  DA¤  £   #     	   dispatch 
   post_hook        »  À         @ À     À M@@À   @Å  
 @À ß@ ÒÀ¢@   £  #        cmd     
   fork_exec    %s %s                                         