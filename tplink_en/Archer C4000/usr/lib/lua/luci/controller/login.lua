LuaQ               Â      H@    À@"@  H@ " A   b   ÈÀ ¢ Á   â  HA " A  b  ÈÁ ¢ Ç HB  ÈÂ  H " A C b @ÄÃ b  È ¢ ÀCEâ !       aD   ¡        áÄ          !    aE   	  
  	  B a BÅ aÅ  B a  BE aE  B a   BÅ aÅ  B a     	  
   	BE aE   	  
   	  B a    BÅ aÅ  B a BE aE  B EE   ÅE   ÄÅÅE  Æ ÄÅDE  ÅE   ÄÅD  ÅE  F ÄÅÅE   ÄÅDE  ÅE  Æ ÄÅDE  ÅE  F ÄÅD  ÅE  Æ ÄÅÅE   ÄÅDE  ÅE  Æ ÄÅDE  ÅE   ÄÅDE  ÅE   ÄÅD¡     
 ¡Å    E ¡  #  /      module    luci.controller.login    package    seeall    require    luci.model.controller    nixio 	   nixio.fs 	   luci.sys 
   luci.util    luci.model.passwd_recovery    luci.tools.debug    /var/run/luci-attempts.lock    /tmp/luci-attempts 	   	
      luci.model.accountmgnt    luci.model.asycrypto    Crypto    rsa    luci.model.uci    cursor    login 
   read_keys    read_recovery    read_vercode    check_vercode    check_factory_default    restart_wportal    set_initial_pwd    cloud_login    get_device_token    get_deviceInfo    kickoff_app    get_sysmode    cb    read 	   password    vercode    write    initial_login 
   get_token    sysmode    .super 	   dispatch    _index    index           !       J  @ À   È@    b C   J   FÀÀ     È  Ù@    È@ b@#        open    w 	X     flock    ex    sh                     #   &        
    @ "@       #        close                     (   6     %   
     @ J  @  "@  @    #  
  "@ 
    @ J  " J b@ AÀ     b   Û    ¢@  ¢ Á@  [ " MÀA  	A  	 â@ £  #        access    r 	   readfile    loadstring    setfenv    assert    type    table                     8   >       J     b@ J  @ À   È@    b ÀÀ 
 A[  " ¢@  @Á ¢@   ¢@ #        open    w 	X  	   writeall    get_bytecode    close                     @   F       A      b  AÀÊ  ÁÊ ÀÀâ À  À@^   ý#        pairs    ltime    uptime                      H   ­    Ó   E      È@  ¢ Á     â   HÁ  " @A YA    HA A ÀÁA ÙA    È  BÂH " GÂBÛ ¢  Á   â B  À CÃ[ " [  [Ã "C  @ C   J  b  Û¢C C  @ C  CDÀD
 ÀÀÅ  [ ÀDDÀÊ  DÐDÀÉ   [ ã Á  D â ÀÅ[ "Ä   DÃEÛ¢D DF	Æ¢ DÛ¢D   [  	DD ÀDÄ	DD@  È  £ DGÛ  ¢D  À@ÅG
D@@EH
D@@EH
Y   @ÅH
D@À@ÅH
D@@EÉ	 ÀÉ bY  À ÅÉ
DEÊ
D ÂÀ I  
 Å  c @ÅÊ b Ù   EKÛ	¢E ÅÊÈ ¢ Û KÛ	F FF@ÆÊ b F¢E  ÈE ¢ ÀLâE Á  Æ â  ÍHF  Û	Ç @GÂ b FF    F "FD@Æ J @Ï@FÏ b Y  ÀÏ@AÆ bF @ÐF bF À I  
 Å  c c  #  B      require    luci.sauth 	   luci.sys    luci.model.checktypes 	   username    admin 	   password    confirm    false    getenv    REMOTE_ADDR    check_ip_in_lan    luci.model.client_mgmt    get_mac_by_ip    assert    lan mac is nil! 	   attempts 	       failureCount    attemptsAllowed    exceeded max attempts    luci.model.accountmgnt    check  	      ltime    uptime 
   errorcode    login failed    limit    logined_user    user    logined_remote    remote    logined_ip    addr    logined_mac    get_client_by    mac    ip    logined_host 	   hostname    user conflict 	   uniqueid 	      kill    write    token    secret    luci.controller.domain_login    tips_cancel 
   luci.http    header    Set-Cookie 	   sysauth=    ;path=    SCRIPT_NAME        stok    /tmp/applogin_flag    fs    access    true    kickoff_app    call    rm -f /tmp/applogin_flag                     ¯   ·        A   @  b @À À  b  Á ¢ Å   AA@Aß@   ÂÁ# #  
      require    luci.model.asycrypto    Crypto    rsa    read_pubkey    n    e 	   username     	   password                     ¹   »       J   @ À d  c   #        recovery_read                     ½   ¿       J   @ À d  c   #        vercode_get                     Á   Ã       J   @ À @@ d  c   #        vercode_check    vercode                     Å   Ç          J   @@À b @ J   @ÀÀ b @ #  #        is_default    is_dft_cfg    cloud_ever_login    cloud_account_exist                     É   Í        
     @ H@  "@ 
     @ H  "@ 
     @ HÀ  "@ #     
   fork_call    wportalctrl -c "   echo "stop" > /tmp/wportal/status     /etc/hotplug.d/iface/99-wportal                     Ï   5   Ù   E       @¢ @@@  ¢@    ÈÀ   £    È@ ¢ Á   â  HÁ " @ÂA b  ÀBâ Õ HÂ " ÙA  À@Cb AB  È bBÙ  @ ZB  [ ÂCÛ¢B  @	@CDD@@ÃDD@@ÃDY   @CED@À@CED@@ÃE ÀÅ bY  À CÆDÃÆDA  b @CÇb ÇÄ H D ¢HÀ É  Ä [ ã J b  Û¢C CC  @ C  CIÀI
ÀÀÅ  [ ÀIDÀÊ IÐDÀÉ  
 [ ã Å ÄÊÄÊ DK D     Ä L Ä
  DL@Ë" D     @ÄËY    L	ÀÄÊ Ë¢D  @IÄL	DÍ¢ DÛ¢D   [  	IDÀIÄ	D  È  £ ÄÍÈ ¢ Ù   ÀDNâD ÀÄÍ â Û	ÀNEE DEDÅÅÊDDÅÍÈ ¢ DâDÁ E â  Ï	"E  HÅ " @P
E È HÆ ÂÈ ¢ ×ÙE    È bED¢A  bE c  #  F      is_dft_cfg     restart_wportal 	   have set    require    luci.sauth 	   luci.sys    luci.model.checktypes    getenv    REMOTE_ADDR    check_ip_in_lan    luci.model.client_mgmt    get_mac_by_ip    assert    lan mac is nil!    limit    logined_user    user    logined_remote    remote    logined_ip    addr    logined_mac    get_client_by    mac    ip    logined_host 	   hostname    luci.model.uci    cursor    get    administration    login    preempt    off    user conflict 	   attempts 	       failureCount    attemptsAllowed    exceeded max attempts    old_acc    admin    new_acc    new_pwd 	   password     	   cfm_flag    confirm    decrypt    set 	      ltime    uptime    login failed 	   uniqueid 	      kill    write    token    secret    luci.controller.domain_login    tips_cancel 
   luci.http    header    Set-Cookie 	   sysauth=    ;path=    SCRIPT_NAME    stok                     7  ·    %  E      È@  ¢ Á     â   HÁ  " @A AA ÀA ÙA    ÈÁ  ÂHB " GBÛ ¢  Á  Ã â B  À Ã[ " [ C [ "C  @ C   J  b  Û¢C C  @ C  ÄÀÃC
 ÀÀÅ  [ ÀÃCDÀÊ  ÄCÐDÀÉ  Ä [ ã ÊÀÅ â A  @ É  ã Á  D â   H "  ÄE" FFÈD E H b 	ÀÆ@   @ÀDÇ[ âÄ 	G	ÀÁ  Å â  È	AE  b MÈ
AE  b MÀÈ
@AE  b M É
 AE  b M@É
ÀAE  b MÉ
AE  b MÀÉ
@AE  b M Ê
 
[ 
Û bÅY   DCJÊ âE @	ÀÅCÑÊÃÀËâ ÃDÊ âE Å  [ ÀÅCDÀÊ  ÆCÐDÀDÀÅË	â ÙE    È DÀÉ  F [ ã ÀI  E ÅE   A " Äc ÀÄL [ âÙD  ÀEÍ
DÅÍ
DÅÍ
   EÎ
DÀEÎ
DÅÎÈ  Î ¢  À ÀEODÀÀÅODÀÀÁÀ   È   £ EÐÈ ¢    ÀÅP 
âE ÀEÐ â ÀQ 
EF DDDFD¢FÐÈ ¢ D£âEÁ  Æ â  Ò"F   HF " @RÆ È  
HG ÂÈ ¢ ×ÙF    È bFD§H FTTÛ¢   ÀÀÔ@ ¢F FÕÈ ¢F À   È   £ c  #  W      require    luci.sauth 	   luci.sys    luci.model.checktypes 	   username 	   password    confirm    false    getenv    REMOTE_ADDR    check_ip_in_lan    luci.model.client_mgmt    get_mac_by_ip    assert    lan mac is nil! 	   attempts 	       failureCount    attemptsAllowed    exceeded max attempts    decrypt $   luci.controller.admin.cloud_account    luci.model.uci    cursor    get    sysmode    mode    ap 	   err_code    cloud_bind_and_login     luci.model.accountmgnt    cloud_acc_check 	   tonumber 	¯ÿÿ	¯ÿÿ	±ÿÿ	y¯ÿÿ	¯ÿÿ	K¯ÿÿ	¯ÿÿ 	      ltime    uptime 
   errorcode    ownerAccount    get_last_cloud_account        login failed 	   tostring    limit    logined_user    user    logined_remote    remote    logined_ip    addr    logined_mac    get_client_by    mac    ip    logined_host 	   hostname    user conflict 	   uniqueid 	      kill    write    token    secret    luci.controller.domain_login    tips_cancel 
   luci.http    header    Set-Cookie 	   sysauth=    ;path=    SCRIPT_NAME    stok    /tmp/applogin_flag    fs    access    true    kickoff_app    call    rm -f /tmp/applogin_flag                     ¹  Ì    .      [   @  W   È   J  @ÁÀ@Á b YA  À J @AÁ bA J  @ÁÀ@Á b Y  ÀAÁ @Â ÈA bFBÈÁ b FBÈÁ bÛ FCbA E  DDÁ c #        /tmp/cloud/    cloud_token        fs    access    call    cloud_getDevToken    io    open    r    read    *line    close    token    origin_url                     Î  Ö    !      H@  "  @ " FÀ@ È  A H bÀ@  HA Á ¢Á    â  AÂJ  @ÂÁ b "  EÁ  DA A Û ¢ DDc #        require    luci.model.uci    cursor    get    cloud_config    login 	   username    role    cloud_req.cloud_comm    TrimStr    exec    getfirm MODEL    cloudUserName 	   tonumber    model                     í  ø     	&      H@  " @@ b À  ÅÀ  Ä@AÄ@Ä ÂAÂ  È "A ÃACÂÁCÛ  AÂ  È "A ÄACÂADÛ  AÂ  È "A#        require    ubus    connect 	   PFClient    type    tmp_app    method    token !   c9c9c9c9c9c9c9c9c9c9c9c9c9c9c9c9    call    passthrough    sn    0 	   transfer 	   raw_data 	   AQABAA==    1 )   AQACAAEABQAACAAAAAAAAAKejGoBAQYAAAAAAA==                     ú  
       E      @@  H  Á  ¢ @ D Á   @@  H  Á  ¢D   @@  H  A ¢  M  @ D   DÁc  #         get    sysmode    support    no    mode    router                     -  /      J   @ À   Û   d c   #     	   dispatch                     1  3       
     @ A@  $  #   #        _index 	   dispatch                     5  7     
      E  @  _@   ÈÀ  ¢  "  @A#        entry    login    call    _index    leaf                             