LuaQ               ´      H@    À@"@  H@ " A   b   ÈÀ ¢ Á   â  HA " A  b  ÈÁ ¢ Ç HB  ÈÂ  H " A C b @ÄÃ b ¡       áC   !        aÄ          ¡    áD     	    Â á ÂD áÄ  Â á  ÂÄ áD  Â á   ÂD áÄ  Â á       	   ÂÄ áD     	     Â á    ÂD áÄ  Â á ÂÄ Å   EE   DEEE  E DEÄE  EE   DEÄ  EE  Å DEEE   DEÄE  EE  E DEÄE  EE  Å DEÄ  EE  E DEEE   DEÄE  EE  E DEÄE  EE   DEÄ!E     	Å	 !    
 !Å E
 #  *      module    luci.controller.login    package    seeall    require    luci.model.controller    nixio 	   nixio.fs 	   luci.sys 
   luci.util    luci.model.passwd_recovery    luci.tools.debug    /var/run/luci-attempts.lock    /tmp/luci-attempts 	   	
      luci.model.accountmgnt    luci.model.asycrypto    Crypto    rsa    login 
   read_keys    read_recovery    read_vercode    check_vercode    check_factory_default    restart_wportal    set_initial_pwd    cloud_login    get_device_token    get_deviceInfo    kickoff_app    cb    read 	   password    vercode    write    initial_login 
   get_token 	   dispatch    _index    index                  J  @ À   È@    b C   J   FÀÀ     È  Ù@    È@ b@#        open    w 	X     flock    ex    sh                     !   $        
    @ "@       #        close                     &   4     %   
     @ J  @  "@  @    #  
  "@ 
    @ J  " J b@ AÀ     b   Û    ¢@  ¢ Á@  [ " MÀA  	A  	 â@ £  #        access    r 	   readfile    loadstring    setfenv    assert    type    table                     6   <       J     b@ J  @ À   È@    b ÀÀ 
 A[  " ¢@  @Á ¢@   ¢@ #        open    w 	X  	   writeall    get_bytecode    close                     >   D       A      b  AÀÊ  ÁÊ ÀÀâ À  À@^   ý#        pairs    ltime    uptime                      F   §    Ð   E      È@  ¢ Á     â   HÁ  " @A YA    HA A ÀÁA ÙA    È  BÂH " GÂBÛ ¢  Á   â B  À CÃ[ " [  [Ã "C  @ C   J  b  Û¢C C  @ C  CDÀD
 ÀÀÅ  [ ÀDDÀÊ  DÐDÀÉ   [ ã Á  D â ÀÅ[ "   DÃE
["D @ DF Æ" D
["D   [   DD 
 @DDD 	  HÄ  #  G[  "D  ÀG	DÀÀH	DÀÀH	Ù   ÀH	DÀÀÀH	DÀÀÉE	 @ÅÈ âÙ  À  É	D  Ê	D  Â É  E
 ãÀÊÅ
 â Y    K["E  ÊHÅ
 " [ 
 EK[E EÅÀÊÆ
 â Å"E  H " @EL
bE A   b ÅÌ
È F [ ÀFÂÇ â ÆF     ¢EDÀ Ê ÀÅÎÀÏ â Ù  @Ï@Á âE ÀÅÏ âE  É  F
 ãc  #  A      require    luci.sauth 	   luci.sys    luci.model.checktypes 	   username    admin 	   password    confirm    false    getenv    REMOTE_ADDR    check_ip_in_lan    luci.model.client_mgmt    get_mac_by_ip    assert    lan mac is nil! 	   attempts 	       failureCount    attemptsAllowed    exceeded max attempts    luci.model.accountmgnt    check  	      ltime    uptime    login failed    limit    logined_user    user    logined_remote    remote    logined_ip    addr    logined_mac    get_client_by    mac    ip    logined_host 	   hostname    user conflict 	   uniqueid 	      kill    write    token    secret    luci.controller.domain_login    tips_cancel 
   luci.http    header    Set-Cookie 	   sysauth=    ;path=    SCRIPT_NAME        stok    /tmp/applogin_flag    fs    access    true    kickoff_app    call    rm -f /tmp/applogin_flag                     ©   ±        A   @  b @À À  b  Á ¢ Å   AA@Aß@   ÂÁ# #  
      require    luci.model.asycrypto    Crypto    rsa    read_pubkey    n    e 	   username     	   password                     ³   µ       J   @ À d  c   #        recovery_read                     ·   ¹       J   @ À d  c   #        vercode_get                     »   ½       J   @ À @@ d  c   #        vercode_check    vercode                     ¾   À          J   @@À b @ J   @ÀÀ b @ #  #        is_default    is_dft_cfg    cloud_ever_login    cloud_account_exist                     Â   Æ        
     @ H@  "@ 
     @ H  "@ 
     @ HÀ  "@ #     
   fork_exec    wportalctrl -c "   echo "stop" > /tmp/wportal/status     /etc/hotplug.d/iface/99-wportal                     È   1   ß   E       @¢ @@À   ¢@    £  À  È  ¢ ÁÀ  A â Á  H " @ÁÁ b  ÀABâ ÕÂ  H " ÙA  À@ÂBb A  ÈB bBÙ  @ ZB  [ CÛ¢B  @	@DD@@DD@@DY   @ED@À@ED@@EÃ ÀCÅ bY  À ÆDÆDAÃ  Ã b @Çb CÇ HÄ  ¢@HÀ É   [ ã J b  Û¢C CC  @ C  ÉÀÃH
ÀÀÅ  [ ÀÃHDÀÊ ÄHÐDÀÉ  Ä	 [ ã Å ÄCJÄCJ K D    D Ä ÄK Ä
  L@ÄÊ" D    D @ËY    DL	ÀÊ ÅÊ¢D  @ÄHL	Í¢ DÛ¢D   [  	ÄHDÀÄHÄ	D  ÈD  £ Ä  È ¢ ÀÄM	 Ê@Ê âD ÀÎE â Ù    N["E  ÎHE " Û 
 ÅN[E EÅÀÊÅÅÀÎF â Å"EÅ  H " @ÅO
bE AÅ   b EÐ
È Æ [ ÀÆÁG â ÆF    F ¢EDÀ£  ¢E c  #  G      is_dft_cfg     restart_wportal    require    luci.sauth 	   luci.sys    luci.model.checktypes    getenv    REMOTE_ADDR    check_ip_in_lan    luci.model.client_mgmt    get_mac_by_ip    assert    lan mac is nil!    limit    logined_user    user    logined_remote    remote    logined_ip    addr    logined_mac    get_client_by    mac    ip    logined_host 	   hostname    luci.model.uci    cursor    get    administration    login    preempt    off    user conflict 	   attempts 	       failureCount    attemptsAllowed    exceeded max attempts    old_acc    admin    new_acc    new_pwd 	   password     	   cfm_flag    confirm    decrypt    set 	      ltime    uptime    login failed %   luci.controller.admin.administration    usbshare_update 	   uniqueid 	      kill    write    token    secret    luci.controller.domain_login    tips_cancel 
   luci.http    header    Set-Cookie 	   sysauth=    ;path=    SCRIPT_NAME    stok                     3  ¬     E      È@  ¢ Á     â   HÁ  " @A AA ÀA ÙA    ÈÁ  ÂHB " GBÛ ¢  Á  Ã â B  À Ã[ " [ C [ "C  @ C   J  b  Û¢C C  @ C  ÄÀÃC
 ÀÀÅ  [ ÀÃCDÀÊ  ÄCÐDÀÉ  Ä [ ã ÊÀÅ â A  @ É  ã Á  D â  Å[ "ÄÀEÀ  È ¢ ÀDF	 [" MÀF
 [" M G
@ [" M@G
  [" MG
À [" MÀG
 [" M H
@ [" M@H
 
	[ "Å   DH Û¢E @	ÅCÅHEÉ¢ D Û¢E   [  ÅCD ÀÅCÅDD@J	¢ E    E
 D  È
  £ À	  H
 E  ÁÅ
 â Å# KÛ  ¢D  À@K
D@@L
D@@L
Y   @L
D@À@L
D@@ÍE ÀÅÌ bY  À Í
DÎ
DÀÁÀ I  E Å  c @ÎÅ b Ù   OÛ	¢E ÎÈÅ ¢ Û EOÛ	F FF@ÎÆ b F¢E  È ¢ ÀEPâE Á   â  ÆÐH F Û	 @ÂÇ b FF    F
 "FD@¤F J@Ò@ÆÒ b Y  À Ó@AF bF @ÓÆ bF À I  F Å  c c  #  P      require    luci.sauth 	   luci.sys    luci.model.checktypes 	   username 	   password    confirm    false    getenv    REMOTE_ADDR    check_ip_in_lan    luci.model.client_mgmt    get_mac_by_ip    assert    lan mac is nil! 	   attempts 	       failureCount    attemptsAllowed    exceeded max attempts    decrypt $   luci.controller.admin.cloud_account    cloud_bind_and_login     luci.model.accountmgnt    cloud_acc_check 	   tonumber 	¯ÿÿ	¯ÿÿ	±ÿÿ	y¯ÿÿ	¯ÿÿ	K¯ÿÿ	¯ÿÿ 	      ltime    uptime 
   errorcode    ownerAccount    get_last_cloud_account        login failed 	   tostring    limit    logined_user    user    logined_remote    remote    logined_ip    addr    logined_mac    get_client_by    mac    ip    logined_host 	   hostname    user conflict 	   uniqueid 	      kill    write    token    secret    luci.controller.domain_login    tips_cancel 
   luci.http    header    Set-Cookie 	   sysauth=    ;path=    SCRIPT_NAME    stok    /tmp/applogin_flag    fs    access    true    kickoff_app    call    rm -f /tmp/applogin_flag                     ®  Ã    3      [   @  W   È   J  @ÁÀ@Á b YA  À J @AÁ bA J  @ÁÀ@Á b YA   I    ÅA  ÄÂc AA @Â ÈÁ bFCÈA b FCÈA bÛ FCbA E  DDÁ c #        /tmp/cloud/    cloud_token        fs    access    call    cloud_getDevToken 
   errorcode    -20571    io    open    r    read    *line    close    token    origin_url                     Å  Í    !      H@  "  @ " FÀ@ È  A H bÀ@  HA Á ¢Á    â  AÂJ  @ÂÁ b "  EÁ  DA A Û ¢ DDc #        require    luci.model.uci    cursor    get    cloud_config    login 	   username    role    cloud_req.cloud_comm    TrimStr    exec    getfirm MODEL    cloudUserName 	   tonumber    model                     å  ð     	&      H@  " @@ b À  ÅÀ  Ä@AÄ@Ä ÂAÂ  È "A ÃACÂÁCÛ  AÂ  È "A ÃACÂDÛ  AÂ  È "A#        require    ubus    connect 	   PFClient    type    tmp_app    method    token !   c9c9c9c9c9c9c9c9c9c9c9c9c9c9c9c9    call    passthrough    sn 	    	   transfer 	   raw_data 	   AQABAA== )   AQACAAEABQAACAAAAAAAAAKejGoBAQYAAAAAAA==                             J   @ À   Û   d c   #     	   dispatch                              
     @ A@  $  #   #        _index 	   dispatch                            
      E  @  _@   ÈÀ  ¢  "  @A#        entry    login    call    _index    leaf                             