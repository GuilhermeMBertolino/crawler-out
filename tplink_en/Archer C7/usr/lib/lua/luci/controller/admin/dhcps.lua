LuaQ               ¶      H@  " A     b    ÈÀ  ¢ Á    â   HA " A   b   ÈÁ ¢ Á   â   HB " @Bb   ÈÂ ¢ Á C A @ÃÃâBÈ C H ÃD ¢ ÀE â  á     !D       a     ¡Ä    á     	  ÂD áD   Â á      ÂÄ áÄ     	  Â á     ÂD áD        Â á    ÂÄ áÄ   Â á        ÂD áD     Â á   ÂÄ áÄ    Â á ÂD ÅÄ    EE   DEE  E DDEEÄE  EE  Å DEÄE E   DÅ DEEÅ  E DÅ DDEEEÅ   DÅ DDEEEÅ   DÅ DDEEEE  Å DEÄ!E Å   H " a   
BE aÅ       
 	B #  3      require    luci.model.uci 	   luci.sys    luci.tools.form    luci.tools.datatypes    luci.model.nwcache    luci.ip    luci.model.imb    luci.model.one_mesh    luci.model.checktypes 	   IMB_INST    luci.tools.debug    module    luci.controller.admin.dhcps    package    seeall 	       /etc/init.d/dnsmasq    reload    cursor    Form    dhcp_opt_update    load_static_leases    load_active_leases    get_dhcp_settings    set_dhcp_settings    update_static_lease    get_max_static_lease    static_lease_max_check    insert_static_lease    remove_static_lease    remove_all_static_lease !   disable_all_invalid_static_lease    dhcplease_check_dup    setting    read    cb    write    cmd    client    load    reservation    others    insert    update    remove    clear    index    luci.model.controller    dhcp_index    dhcp_dispatch        %   A    W   J   F À È@    HÁ  b    @A  H   ¢Ê  À@Á [ âÆ@Àâ 
  AA[  "A" Ù   @ A   I  c AÁ Á BBb M@Â@PÁ Á ÀÂÀÂ¢ PBÂ  H   ÁB H  B È ¢A   ÁB H   Û¢A  £ @ @J  FÁÂÈ   HB  bA J  FÁÂÈ   H B bA I c I  c #        get    network    lan    ipaddr    netmask    IPv4 
   broadcast 	   tonumber 	   	ÿ   	       set    dhcp    start    limit 	d   	                       C   k     ^   
    @ @  È@    "@    À  G  À@  Ê  À Áâ AÁ "FÁAb [ FBb  À@B @Ê   Æ ÀH  ÈÁ â[ Ê   Æ ÀH  È â Ê   Æ ÀHÁ  È â
  @Á È B "J @Ã Û bFÂb YA     £ ÀÁ Û¢ ÇÂ [ "  @Â [ " BDÑÀ Â [ " Ñ  FÂDb BFÂÄb B# #        get    sysmode    mode    router    init    get_network    lan    ipaddr    netmask    ap    network    dhcp    start    limit    IPv4 	   tonumber 	    	      startip    string    endip                     m       [       @A  H  Á  ¢Ê   Æ ÀHA    È â
  AA[ "A@" J @AÁ ÛbFÁb  AAÛ  ¢Ê ÀAÁ [âB@" ÂA" FÂAb @ÀBÀ" ÂA" FÂAb M@@ 	  # Â  B[ B "AÂ @ÂÂÁ¢ ÈB b Û ¢ Á â @   £ Ð  @ ÙB  @ 	  #  ÃÂ ÃBC@ÃB@ÃÂ c#        get    network    lan    ipaddr    netmask    IPv4 
   broadcast    string    match    .(%d+)$ 	   tonumber 	   	                          £     4   
    @ @  È  Á  "E   @  @    £    Û   ¢  ÆAAH âÀÁÀBAB "B     D ÀÀÂ BA "Â Û B D ÃBAB "B     D    ÷c  #        get    dhcp    lan    dhcp_option    ipairs    match    (%d+),    3    gateway    ,(.+)        6    ,(.+),%s*(.+)    dns    15    domain                     ¦   Å    Z       @Û   ¢ @  @    £    Û  ¢ Ê  â Ù   À AÀM   
@Á  È B "A
AÁ  È B HÂ   W"A  Â  @ÂAB  À ÂABA    ÂÁB  À ÂÁBZA   H B@ MÂAÂ  H B È  HC ×¢A  Ã   
AÁ  È B HÂ ÃW"A      À 
DÁ  "A#        ipaddr    gateway    delete    dhcp    lan    dhcp_option 	   set_list    3,    dns 	      0.0.0.0 	      6,    ,    domain    15,    commit                     È   ß     +      E       @A  H  ¡    
   ¢@À  Û  ¢  Å   AB     BAFAÈÂ  b BBÄÂ¢ ÄÂBÄC@C B B     ÄÀ   ù#  #        foreach    dhcp    host    ipairs 	   real_mac    mac    gsub    :    -    ip    upper    comment    enable    on    off        Î   Ð       J         @Ê  Æ@ÀH  Á@ â DÀ #     	      get_all    dhcp    .name                                 â   "    ±      A   @  b À ¢ Ê   ÆÀÀH A â Ù@    È 
  ÁA ÈA  "J  FÁÁÈ B HÂ b  CB ¢È  H ÝÁÂ  â Ä@@DÄFÄÈÄ  b FDÅb @À @ÄÅYD  @ @@ÅD@ Þ  úÜAùÊ ÀÆâ 
  BFH "B [ "@E    ÀDDÆÄ	HÅ Å â ÆDÅ	â DÄ EE    E D BDÅ [" @GÀ@@DFÄÈÆ Ç b FFÅb DD @    ü   EH
[	 "@Y   @@Ä
FÄ
ÈÅ Æ b FEÅ
b DD ÅH I
@ DÉÀÅ	  J
@ÅHNEÊ
" AÅ	 @Ê
ÅHJb J
P
ÅHÏEJ
ÅÏÊ
ÅÛ 
Æ [
Æ Û ×ÅDÄÀÊ ÂM K
 
  EK
[ ÂÛ"      C
@
  @  Àå#  #  .      require    luci.tools.status    dhcp_leases    get_profile 	   wireless    ffs    no    get    network    lan    ipaddr    netmask    get_all    history_list 	      pairs    mac    macaddr    gsub    :        upper 	   hostname 	   nickname    api_get_mesh_clients    api_arrange_mesh_clients    ipairs    -    name    --    config_proxy_mac     string    sub 	
      expires 	    
   leasetime 
   Permanent    math    floor 	  	<      yes     check_same_network                     $  P    r   
   " J  b    Ê  Æ ÀHA    ÈÁ  âÁA "ÁÁÀ Á Û ¢ BA Û ¢ ÁB AC Y   Ã    Ã A    Á Ä    Ä A    Á AÄ    	AÄ ÁD  À AÄ ÁDA    Á D E Á A    DAÄ E  À AÄ EA    Á AE E Á A    AEÀCÀÃÀ ÀCÀCÀCÀÃ @B  H  Â ¢M@ @ Æ@  Ç   Ç£  #        get    dhcp    lan 
   leasetime    match    (%d+)(%l)$    h 	   tonumber 	<   	   tostring    ipaddr_start    startip    ipaddr_end    endip    gateway        domain    dns    pri_dns 	      0.0.0.0    snd_dns 	      ignore    0    enable    on    1    off    2    auto                     R     Ç   @ @ Y@    H@  @ ÀÀ@ Ù@    Û   A A    A  @AA A ÀÁA ÙA    È  BB B     B@J  FÂÂÈ C H Ã bB J  FÄÈ bBAB d c  @   D I  Â cJ  ÛbÂYB   É   ãÁB  â ÀÂÅ â @FH "C 
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
   leasetime        ipaddr_start    ipaddr_end    enable    gateway    domain    pri_dns    0.0.0.0    snd_dns    auto    set    dhcp    lan    ignore    2    commit    get_dhcp_settings    on    Start ip can not blank    Ip address pool is invalid    require    luci.model.log    Log 	Ô      off 	ù     1 	ø     0 	   tonumber 	@     2880    m    start    limit    dynamicdhcp    delete    dhcp_option    ipaddr 	   set_list    3,    6,    ,    host    15,                       Æ   ¬   @ @ @@ Á  ÀÀÀÀ Á â    Á@ A[ " A   AA  b ÁÙ@  ÀAA b MÁ EA  DÂc A @ÁÂAÂC¢ ÈA  b Ä@@AÂÄ@A @ÁÂABC¢ ÈA  b AA @ÁÂABC¢ ÈA  b AJ  @Äb ABÁB HB ¢ C¢ ÀMÀ ÀÀÄÆÁÂHB  â ÆÃâ ÁÊ ÀÁÄ BBâ Ù  @Ê ÀÅ BEâ ÙA   ÅA  ÄÅã ÀÁE Æ Ê ÆAÆ[ âÙ   É   ãÇ
ÂF ÈB E C ÈÃ _C " M @   JFÂÇÈ C [ Å D HD ßC bÛÀJFÂÇÈ C [ Å D HÄ ßC bÛÙ  @ÂÃYB    @BÂ ÂBÛ HC ¢ ÄÙ  @J FÈÈ bBã  I  B c#  "      old    new    luci    json    decode    type    table 
   errorcode    invalid new params    mac    string    gsub    upper    -    : 	   real_mac    api_get_mesh_clients     config_proxy_mac    macaddr    ipaddr    ip    mac or ip address is invalid    enable    on    arplist_check_dup    imb duplication    _find_item    dhcp    host     update    commit    modify item failed                     È  Ê       @  J   F@À È  Á  b Y@    J  @ #  #     
   max_rules    get_profile    dhcps    max_rsvd_host                     Ì  Õ          " J   F@À È  Á  b  A @ @    £    £  #        get_max_static_lease    count    dhcp    host 
   max_rules                     Ø     w   @ @ @  @À@Û  ¢ @  ÀÁ   â M@Á Å@  ÄÀAã  Á  â Ù@   Å@  Ä@Bã  ÁÀ À Ã BAC" H Á â À Ê   À Ä Bâ Ù   @Ê   À@Ä Dâ Ù@   Å@  ÄÀDã  À E@Å Ê  ÆÅ[ âÙ    É   Á ã Ê  À Æâ  BCÁ È " AC" FCÈ Â b @@AF@@M@ @@ÁÆFÃÈ Â b FAÃb @JFÇÈA  [  È  B b Y  Á CÀAÆÂ H ¢ DY  @ ÁGB ¢Ac    È £#  !      new    luci    json    decode    type    table 
   errorcode    invalid new params    static_lease_max_check    reach max items    mac    string    gsub    upper    -    :    macaddr    ipaddr    ip    mac or ip address is invalid    enable    on    arplist_check_dup    imb duplication    api_get_mesh_clients 	   real_mac     config_proxy_mac    insert    dhcp    host    commit    insert new items failed                          	   @ @ @@ Ê   ÆÀHÁ   Û  â Ù   @
 AAÁ  "Aã   	  H ##        key    index    delete    dhcp    host    commit    remove static lease failed                       %    
      J   F À È@    a     b@AÀ     b    AB  [¢A ^   þJ   F@Á È@  b@I  c  #        foreach    dhcp    host    ipairs    delete    commit                J         @À@@ DÀ #     	      .name                                 .  K   !   @      @A  H  Á  ¢  Y@      @A  H   ¢[     @A HÁ ¡  
       
   ¢@    B ¢@#  	      get    network    lan    ipaddr    netmask    foreach    dhcp    host    commit        6  G   
   @ @    @@Û  
 ¢@¢ Ê   À@À
 J âÆÀâ ÁÀ" FÁ@b M@
AA ÀA Â H "A #  	      ip    IPv4    network    string    set    dhcp    .name    enable    off                                 M  ^    -   A   b @À @ 	À  ¢ @  @ É   ã  Á   â   BÀ@@ BA @ÁM@À ÂA BB È " ÂB" @ÂÁFÂÈB  b FÂÂb @@ 	 # Þ   ù   £  #        get_dhcp_settings    enable    on    load_static_leases    ipairs    ipaddr    ip    mac    gsub    -    :    upper                     r  t           E  @  È  _@ À  È  ¢  "  Á#        entry    admin    dhcps    call    dhcp_index    leaf                     x  z       
     @ A@  "@ #        _index    dhcp_dispatch                     |        a   
   
     @Ê   EA  DA¤  £   #     	   dispatch 
   post_hook        }           @ À     À M@@À   @Å  
 @À ß@ ÒÀ¢@   £  #        cmd     
   fork_exec    %s %s                                         