LuaQ               «      H@  " A     b    ÈÀ  ¢ Á    â   HA " A   b   ÈÁ ¢ ÀBâ   HB " A Â Á ÀBÃbBH Â È  CD " @D b  a     ¡C       á     !Ä    a       BÄ aD   B a BD aÄ       B a     BÄ aD       B a    BD aÄ   B a       BÄ aD     B a   BD aÄ    B a BÄ EÄ    ÅD   ÄÄÅ  Å ÄÄÄÄDD  ÅD  E ÄÄDD Å   ÄE ÄÄÅÄ  Å ÄE ÄÄÄÄÅÄ   ÄE ÄÄÄÄÅÄ   ÄE ÄÄÄÄÅD  E ÄÄD¡D D   È ¢ á   	ÂÄ áÄ       	 Â #  1      require    luci.model.uci 	   luci.sys    luci.tools.form    luci.tools.datatypes    luci.model.nwcache    luci.ip    luci.model.imb 	   IMB_INST    luci.tools.debug    module    luci.controller.admin.dhcps    package    seeall 	       /etc/init.d/dnsmasq    reload    cursor    Form    dhcp_opt_update    load_static_leases    load_active_leases    get_dhcp_settings    set_dhcp_settings    update_static_lease    get_max_static_lease    static_lease_max_check    insert_static_lease    remove_static_lease    remove_all_static_lease !   disable_all_invalid_static_lease    dhcplease_check_dup    setting    read    cb    write    cmd    client    load    reservation    others    insert    update    remove    clear    index    luci.model.controller    dhcp_index    dhcp_dispatch        #   >     U   
    @ @  È  Á  "J   F À È@    H b  @AÛ    ¢@@¢ Ê  À@Á  [ âÆÁâ    @ Ù@   	  #  Á P@Â@Â" M@B@AÁ BBb ÂB   J  FÁÂÈ   HB  bA J  FÁÂÈ   H  bA I c À
  ÁB È  B HÂ "A 
  ÁB È   HÂ "A 	 # 	  # #        get    network    lan    ipaddr    netmask    IPv4 
   broadcast 	   tonumber 	   	ÿ   	       set    dhcp    start    limit 	d                       @   _     ?   
     @ " F@@ È  bÀÀ ¢ Æ Á â 
 AA È  Â "J FAÁÈ   H b ABÛ ¢B¢ A   É  ã ÀÁÁ  â ÑÁ AÂ b @@AÂ b PBÃBÀ AÂ b BE  ÂÃ¢ DÂC¢ Dc #        init    get_network    lan    ipaddr    netmask    get    dhcp    start    limit    IPv4    network 	   tonumber 	    	      startip    string    endip                     a       [       @A  H  Á  ¢Ê   Æ ÀHA    È â
  AA[ "A@" J @AÁ ÛbFÁb  AAÛ  ¢Ê ÀAÁ [âB@" ÂA" FÂAb @ÀBÀ" ÂA" FÂAb M@@ 	  # Â  B[ B "AÂ @ÂÂÁ¢ ÈB b Û ¢ Á â @   £ Ð  @ ÙB  @ 	  #  ÃÂ ÃBC@ÃB@ÃÂ c#        get    network    lan    ipaddr    netmask    IPv4 
   broadcast    string    match    .(%d+)$ 	   tonumber 	   	                               4   
    @ @  È  Á  "E   @  @    £    Û   ¢  ÆAAH âÀÁÀBAB "B     D ÀÀÂ BA "Â Û B D ÃBAB "B     D    ÷c  #        get    dhcp    lan    dhcp_option    ipairs    match    (%d+),    3    gateway    ,(.+)        6    ,(.+),%s*(.+)    dns    15    domain                        ¹    Y   J   @ À    b Y@  @ I   c  J  b   ¢    ÀÀ@@MÀ   Ê ÆÀHÁ   ÈA â@Ê ÆÁHÁ   ÈA Â [  Bâ@ À BÙ   @Ç  @B@AÂY  À @B@AÂÚ@  È @B@ÁÂY  À @B@ÁÂA   Â@ MBJFÁÈÁ   HB  ÛC [ BbA ÀCÙ    Ê ÆÁHÁ   ÈA Â @CBâ@ I  Y   À Ê Æ ÄHÁ  â@#        ipaddr    gateway    delete    dhcp    lan    dhcp_option 	   set_list    3,    dns 	      0.0.0.0 	      6,    ,    domain    15,    commit                     ¼   Ò     (      E       @A  H  ¡    
   ¢@À  Û  ¢ @Å   ABA ÈÂ " @BÄAFBBb ÄA@BÄA@ÂB Ã H YB    HB ÄAÀ  Àù#  #        foreach    dhcp    host    ipairs    mac    gsub    :    -    ip    upper    comment    enable    on    off        Â   Ä       J         @Ê  Æ@ÀH  Á@ â DÀ #     	      get_all    dhcp    .name                                 Õ   î      <      A   @  b À ¢ ÁÀ   â @  @ÁFBÁÈ Ã b Â¢ ÂB    Â ÃBÃC@ ÄÀB DÀBÃÎÂÄ¢ ÁB ÀÄ CÃEâ EÐ CÃOÃDCOÅC[  Û [ WCB Þ  Àó#  #        require    luci.tools.status    dhcp_leases    ipairs    macaddr    gsub    :    -    upper    name 	   hostname    --    ipaddr    expires 	    
   leasetime 
   Permanent    math    floor 	  	<                       ð       l   
   " J  b    Ê  Æ ÀHA    ÈÁ  âÁA "ÁÁÀ Á Û ¢ BA Û ¢ ÁB AC Y   Ã    Ã A    Á Ä    Ä A    Á AÄ    	AÄ ÁD  À AÄ ÁDA    Á D E Á A    DAÄ E  À AÄ EA    Á AE E Á A    AEÀCÀÃÀ ÀCÀCÀCÀÃ @B  H  B ¢  A    Á £  #        get    dhcp    lan 
   leasetime    match    (%d+)(%l)$    h 	   tonumber 	<   	   tostring    ipaddr_start    startip    ipaddr_end    endip    gateway        domain    dns    pri_dns 	      0.0.0.0    snd_dns 	      enable    1    ignore    off    on                       P   µ   @ @ Y@    H@  @ ÀÀ@ Ù@    Û   A A    A  @AA A ÀÁA ÙA    È  BB B     @   I   cJ   ÛbÂYB   É  Ã ãÁ C â ÀÃÃ â  DHC "C 
 DÃ È D H "C @HÃ "C 
 DÃ È D H "C C [ "   Ã Z@ Àÿ
 DÃ È   [  W"C 
 DÃ È D ["C 
 DÃ È  [ "C 
 DÃ È Ä H "C 
 HÃ È D "C
  H["    
 ÃHÃ È D H	 W"C @À  ÚA Àÿ@@  B Àÿ
  H["    
  H[ "   
 ÃHÃ È D HD	 È	  W"C 
  ÃI[ "    
 ÃHÃ È D H
  W"C 
 CJÃ "C
 $ #  #  +   
   leasetime        ipaddr_start    ipaddr_end    enable    gateway    domain    pri_dns    0.0.0.0    snd_dns    Start ip can not blank    Ip address pool is invalid    require    luci.model.log    Log 	Ô      off 	ù     set    dhcp    lan    ignore    1 	ø     0 	   tonumber 	@     2880    m    start    limit    dynamicdhcp    delete    dhcp_option    ipaddr 	   set_list    3,    6,    ,    host    15,    commit    get_dhcp_settings                     S  t   j   @ @ @@ Á  ÀÀÀÀ Á â    Á@ A[ " A   AA  b ÁÙ@  ÀAA b MÁ EA  DÂc A @ÁÂAÂC¢ ÈA  b Ä@A @ÁÂABC¢ ÈA  b AJ  @ÁÃABb Y  @J  @ÄADb YA   EA  DÄc @ÁD Å J FAÅÛ bY   I   cJ FÁÅÈ B [ Å C HC ßB bY   ÁBÀAÂ HB ¢ DY  @F ¢Ac    ÈÁ £#        old    new    luci    json    decode    type    table 
   errorcode    invalid new params    mac    string    gsub    upper    -    :    macaddr    ipaddr    ip    mac or ip address is invalid    enable    on    arplist_check_dup    imb duplication    update    dhcp    host    commit    modify item failed                     v  x       @  J   F@À È  Á  b Y@    J  @ #  #     
   max_rules    get_profile    dhcps    max_rsvd_host                     z            " J   F@À È  Á  b  A @ @    £    £  #        get_max_static_lease    count    dhcp    host 
   max_rules                       ¦   Z   @ @ @  @À@Û  ¢ @  ÀÁ   â M@Á Å@  ÄÀAã  Á  â Ù@   Å@  Ä@Bã  ÁÀ À Ã BAC" H Á â À Ê   À Ä Bâ Ù   @Ê   À@Ä Dâ Ù@   Å@  ÄÀDã  À E@Å Ê  ÆÅ[ âÙ    É   Á ã Ê  Æ ÆHA  Û  H  B â Ù   Á  C@ÂÁ È " Ä Ù   @
ÁFA "Aã   	  H ##        new    luci    json    decode    type    table 
   errorcode    invalid new params    static_lease_max_check    reach max items    mac    string    gsub    upper    -    :    macaddr    ipaddr    ip    mac or ip address is invalid    enable    on    arplist_check_dup    imb duplication    insert    dhcp    host    commit    insert new items failed                     ©  ¶   	   @ @ @@ Ê   ÆÀHÁ   Û  â Ù   @
 AAÁ  "Aã   	  H ##        key    index    delete    dhcp    host    commit    remove static lease failed                     ¹  Ê    
      J   F À È@    a     b@AÀ     b    AB  [¢A ^   þJ   F@Á È@  b@I  c  #        foreach    dhcp    host    ipairs    delete    commit        ½  À      J         @À@@ DÀ #     	      .name                                 Ó  ð   !   @      @A  H  Á  ¢  Y@      @A  H   ¢[     @A HÁ ¡  
       
   ¢@    B ¢@#  	      get    network    lan    ipaddr    netmask    foreach    dhcp    host    commit        Û  ì   
   @ @    @@Û  
 ¢@¢ Ê   À@À
 J âÆÀâ ÁÀ" FÁ@b M@
AA ÀA Â H "A #  	      ip    IPv4    network    string    set    dhcp    .name    enable    off                                 ò      -   A   b @À @ 	À  ¢ @  @ É   ã  Á   â   BÀ@@ BA @ÁM@À ÂA BB È " ÂB" @ÂÁFÂÈB  b FÂÂb @@ 	 # Þ   ù   £  #        get_dhcp_settings    enable    on    load_static_leases    ipairs    ipaddr    ip    mac    gsub    -    :    upper                                  E  @  È  _@ À  È  ¢  "  Á#        entry    admin    dhcps    call    dhcp_index    leaf                              
     @ A@  "@ #        _index    dhcp_dispatch                     !  )      a   
   
     @Ê   EA  DA¤  £   #     	   dispatch 
   post_hook        "  '         @ À     À M@@À   @Å  
 @À ß@ ÒÀ¢@   £  #        cmd     
   fork_exec    %s %s                                         