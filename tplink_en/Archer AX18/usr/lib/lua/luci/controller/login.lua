LuaQ               #¡     H@    À@"@  H@ " A   b   ÈÀ ¢ Á   â  HA " A  b  ÈÁ ¢ Á  â  HB  ÈÂ  HC  È ¢ Á Ä â ÀÅD â  H " @ÄEb  È ¢ Á E â  HÅ  È ¢ ÈE  a       ¡F    á         !Ç           a   ¡G  	      
              	Ç ¡  ¡Ç  G ¡   ¡G  Ç ¡  	 ¡Ç   G	 ¡  	 ¡G  	       
           Ç	 ¡  	     
        	    
 ¡Ç G
 ¡    
 
 ¡G  	     
          Ç
 ¡  	     
         	  ¡Ç  G ¡     ¡G    Ç ¡   ¡Ç G ¡   ¡G   	Ç ¡  ¡Ç G G ÅG  H  A HÄÇÅ  H  AÈ HÄH  A HÄÇÅ  H  AH HÄH  A HÄÇÅ  H  AÈ HÄH  A	 HÄÇÅG  H  AH	 HÄÇÅG  H  AÈ	 HÄÇÅ  H  A HÄH  A
 HÄÇÅG  H  A HÄÇÅG  H  A HÄÇÅG  H  A HÄÇÅG  H  AÈ HÄÇ ÅG  H  A HÄÇÅG  H  AH HÄÇÅ H  EH   DHÄ  EH  È DHEH   DHÄ  EH  H DHEH   DHÄ  EH  È DHEH  	 DHÄH  EH  H	 DHÄH  EH  È	 DHÄÈ  EH   DHEH   DHEH  È
 DH ÄH  EH  H
 DHÄ¡H  EH  H DHÄH  EH  È DHÄH  EH   DHÄH  EH   DHÄH  EH  È DHÄ H  EH   DHÄ!       È !H     ! H #  F      module    luci.controller.login    package    seeall    require    luci.model.controller    nixio 	   nixio.fs 	   luci.sys 
   luci.util    luci.model.passwd_recovery    luci.tools.debug    luci.ltn12    /var/run/luci-attempts.lock    /tmp/luci-attempts 	   	   	
      luci.model.accountmgnt    luci.model.asycrypto    Crypto    rsa    luci.model.uci    cursor    luci.service    luci.model.log    /tmp/auto_update_lock.lua     /usr/sbin/cloud_setupTMHomecare    luci.controller.admin.onemesh 	  	7      login 
   read_keys    read_recovery    write_recovery    read_vercode    check_vercode    check_factory_default    restart_wportal    set_initial_pwd    cloud_login    cloud_get_bind_status    cloud_set_status_bind    cloud_login_bind    cloud_login_check    login_check_internet    get_device_token    get_eweb_url    get_deviceInfo    kickoff_app    get_sysmode    handshake_getkey    get_firmware_info    check_internet    keys    read    cb 	   password    write    vercode    initial_login 
   get_token    sysmode    .super    auth    bind    cloud_bind_status 	   dispatch    _index    index        +   .       J  @ À   È@    b C   J   FÀÀ     È  Ù@    È@ b@#        open    w 	X     flock    ex    sh                     0   3        
    @ "@       #        close                     5   C     %   
     @ J  @  "@  @    #  
  "@ 
    @ J  " J b@ AÀ     b   Û    ¢@  ¢ Á@  [ " MÀA  	A  	 â@ £  #        access    r 	   readfile    loadstring    setfenv    assert    type    table                     E   K       J     b@ J  @ À   È@    b ÀÀ 
 A[  " ¢@  @Á ¢@   ¢@ #        open    w 	X  	   writeall    get_bytecode    close                     M   S       A      b  AÀÊ  ÁÊ ÀÀâ À  À@^   ý#        pairs    ltime    uptime                      U      ,¢  E       @Ê  ¢ Á@    â A  HÁ  " AA   b A  ÈA ¢ ÀA ÙA    ÈÁ  B @BB YB    H ÂBÈ ¢ Ç CÃ[ "  J FÃÈÃ Ä H bYC    H C  ÈC ¢ C  ÀÀD â ÛÁÃ H âC  @ ÚC   Û
 DEJ  "  À 	  HÄ   # 
" J  bD @ÄYD  @ ED  DDFÆÊ	   [  	ÆDÀÆÄ	D  È  £ @@ÇÀÇMÀG	 ÇÊ Ä	ÀHâ Ä	 Å  [ 	ÀÆDÀÊ ÆÐ	DÀDÉ   [ ã D  ÈÄ ¢ I	Û 	[ âÄÙ   ÄÇJ bE À@ÆQEÉ
DD@Hb DDDJ bE E  [ 
@ÆD@JÆP
D@@Ç J D@  D I   Û c @ÅÉÛ bYE  À FÊD  ÆÊD  ÆÊ    FËD À FËD  ÆKH Ë "  À @FLD@@ÆLD@ÂÀ 	  H   #  FMH "    @ÆÍ bF J @Î b  @Ç ÀFN H G HÇ WâÆÆÎH âÀÀFN HG G HÇ WâÆÆÎH âÁF   â  ÇÏ" @Ðb GMÈ ¢  GÐÛ H ÈÈ¡@HM b H¡¢   @QYH    GH¢   @RYH    GH£H¤¢GG  È ¢ ÀÇRâG ÀÓH H  ÈÈ  ÉBH	 " WYH    HH âGD ©ÈÇ 
 U HE["   À@Ç@H "H  UHÈ "H À 	  H   # 
 C ÈH  "J FÃÈ I HÉ bYH    H  C	 HI  ¢H    È  W W Á 	â QHÉÊ ÆHØH	 I ÈÉ  [
"
 âH  Ê ÆÈØH	 âH  À Û 
	 [	 âHÊÀÙâH ÁH  I â ÀÙâ ÉÙ	 ÈI  "IIØ	 ÈI  [
 "I ÉÚ	 "II  HI "  	[" FCÈI  HÊ bY	  M Ü IXJ H Ê È
 ¢I ÉXJ ¢Ic  #  q      Log    require    luci.sauth 	   luci.sys    luci.model.checktypes    luci.model.subprocess 	   username    admin 	   password    confirm    false    getenv    REMOTE_ADDR    check_ip_in_lan    get    system    rsa2048_enable    luci.model.client_mgmt    get_mac_by_ip    assert    lan mac is nil!    access    r    auto upgrading 	   attempts 	       failureCount    attemptsAllowed    exceeded max attempts    true    ltime     uptime    remainTime    login failed    luci.model.accountmgnt    check 	   
   errorcode    limit    logined_user    user    logined_remote    remote    logined_ip    addr    logined_mac    get_client_by    mac    ip    logined_host 	   hostname    user conflict 	   uniqueid 	      kill    decrypt    call_output 
   sha256sum    match    %x+    md5sum 
   luci.http    get_aeskey    get_seqnum    write    token    secret    hash    aeskey    key    aesiv    iv    seqnum    luci.controller.domain_login    tips_cancel    header    Set-Cookie 	   sysauth=    ;path=    SCRIPT_NAME        stok    /tmp/applogin_flag    fs    kickoff_app    call    rm -f /tmp/applogin_flag    cloud_config    new_firmware    remind_later    login_count    1    upgrade_info    type    0 	   tonumber    set 	   tostring    commit    remove_seqnum    luci.model.uci    cursor_state    revert    administration    login    sig    save    cursor    factory    agileconfig    enable    no                           -   A   @  b @À À  b    È  ¢ @A¢ ÀÁ â  @ÁÁÂA E  DÂDCB H ¢ ÀC DB HB  ¢ÆDHB B È âMÀ@ @ DAE  Dc #        require    luci.model.asycrypto    Crypto    rsa    luci.model.uci    cursor    read_pubkey    n    e 	   username     	   password    get_profile    cloud    https_client 	      get    sysmode    mode     support    router                             J   @ À d  c   #        recovery_read                             J   @ À    d  c   #        recovery_write                              J   @ À d  c   #        vercode_get                     "  $      J   @ À @@ d  c   #        vercode_check    vercode                     &  7    ;      H@  "  @ " FÀ@ È   HA bY@    H À@ Á HÁ  ¢@    @ ÆÀ@ H Á È â@BMÁ  @Ã A  ÁC# D A È " MÀD  J  @Åb AJ  @Åb A# @A  J  @Åb A# #        require    luci.model.uci    cursor    get    onemesh    role    master    sysmode    mode    router    accountmgnt    admin 	   password     is_default    get_profile    cloud    https_client 	      is_dft_cfg    cloud_ever_login    cloud_account_exist                     9  =       
     @ H@  "@ 
     @ H  "@ 
     @ HÀ  "@ #     
   fork_call    wportalctrl -c "   echo "stop" > /tmp/wportal/status     /etc/hotplug.d/iface/99-wportal                     ?  É   "J  E       @Ê  ¢ Ê  À@Àâ À@ÁÀ  â@ É    [ ã  Á@  â A HÁ " AA  b A ÈA ¢ ÀBÂ â  @Ãb UB ÈB ¢ YB  ÀÀCâ ÁÂ  H âBY  @ ÚB  Û 
 CDJ  "  À 	  HÃ   #  Å["C  @	ÀEDÀÀFDÀÀFÙ   ÀFDÀÀÀFDÀÀGD @ÄÆ âÙ  À  ÇD  ÈD ÁC D â ÀÈâ ÄÈ	 ÈD	 	 "ÀIÀ I  
 Û c Êâ 
 ["D  ÄD  @ D  Ê@DJ@	ÀE  [ @DJD@JDJPD@I  D Û c E DÄKDÄKL D    Ä DDM D M	ÀDÌ¢ D    Ä ÀÍÙ  
  ÅM
@ÌEÌ"E  @ EJN
 N" Ä
["E   [  
 EJD 
@EJE
D 	  HÅ  #  OHE " Y   @ÏbE G
 ÅHÆ HÆ  ¢E    E P ÀÅP H F HÆ  	WâÆEÑH â[ÀÀÅP HÆ F HÆ  	WâÆEÑH â[ÁE  â  FÒ" @Òb OÈF ¢ [ ÆÒÛG ÇG@ÌG¦@OG b G¦G§   @TYG    GG§   @TYG    GG¨G©¢FF È ¢ ÀFUâF ÀÕÇ H ÈG  BH " WYG    HÇ âFD ­ÁÆ  âF Y  À Û 
[âFÁF G â À×â G×	 ÈG	  "GÇÍ	 ÈG	  [
"G Ç×	 "G
 XG È " G    Ç  Y J @GÙbG c  #  f      Log    is_dft_cfg     restart_wportal 	   have set    require    luci.sauth 	   luci.sys    luci.model.checktypes    luci.model.subprocess    getenv    REMOTE_ADDR    check_ip_in_lan    luci.model.client_mgmt    get_mac_by_ip    assert    lan mac is nil!    access    r    auto upgrading    limit    logined_user    user    logined_remote    remote    logined_ip    addr    logined_mac    get_client_by    mac    ip    logined_host 	   hostname    luci.model.uci    cursor    get    administration    login    preempt    off    user conflict 	   attempts 	       failureCount    attemptsAllowed    exceeded max attempts    old_acc    admin    new_acc    new_pwd 	   password     	   cfm_flag    confirm    decrypt    set 	      ltime    uptime    login failed 	   uniqueid 	      kill    system    rsa2048_enable    false    true    call_output 
   sha256sum    match    %x+    md5sum 
   luci.http    get_aeskey    get_seqnum    write    token    secret    hash    aeskey    key    aesiv    iv    seqnum    luci.controller.domain_login    tips_cancel    header    Set-Cookie 	   sysauth=    ;path=    SCRIPT_NAME    stok    cursor_state    revert    sig    save    get_profile    onemesh    onemesh2_support    no    yes    close_sta_vap                     Ë  f   (y  E       @Ê  ¢ Á@    â A  HÁ  " AA   b AA ÀA  ÂA B     @BB b  ÀÂÂâ ÕC  H " ÙB  À@CCb A  ÈÃ bCÙ  @ ZC  [  DÊD ¢  À   È   £  ¢ Ê âC ÀCÙC  @ ÅC  ÄÅ ÄÄJ  À  [   ÄÄD 
 @ÄÄDD 	  HÄ  # 
 F[" Û ÙA  @ 	  # D  HD " AD   b @ÄÆb ÇE HE  ¢Ç	ÀG	@ É  @ EH[ "ÅB Û 
È	ÀE  HÅ " @I
E	 Á ¢ MIE	 Á ¢ MÀI@E	 Á ¢ M J E	 Á ¢ M@JÀE	 Á ¢ MJE	 Á ¢ MÀJ@E	 Á ¢ M K 

Û ¢Å   CË
 [ "F @	 ÆÄKÄ L" ÄÃ
 [ "F   [   ÆÄD 
 @ÆÄFD DÀ ÆL
" F     D 	  HF  # À  ÈE F  A  b F£  ÅÍ["E  ÀÀENDÀÀÅNDÀÀÅNÙ   ÀEODÀÀÀEODÀÀÅO @Ï âÙ  À  FÐD  ÆÐD ¡ BÀ É   E  ã ÀEQ â Y    ÆÑ[
"F F  H " J@FÒb R¢ ÀÆRâ  GQH " [  Ó[
G GÇÇ¦ÀGQ â Ç§G§   ÀGTÙG    ÇÇ¨   ÀÇTÙG    ÇÇ©Çª"GG  HG " @UbG @ÇU ÈG 
H HBÈÈ ¢ ×ÙG    È bGDÀ®HG  WDÛ¢   ÀÀW@ ¢G GXÈ ¢G À   È   £ ÇÈ H H ¢ÆÇHÈ  È âÙG    ÈÇ ÇÈ È I "H     ÀY ÀYAH	 b ÑËFÈÚÈÈ 	 H  Û	¢	 bH  FÛÈÈ bHÙ  À [ ÛbHc  #  m      Log    require    luci.sauth 	   luci.sys    luci.model.checktypes 	   username 	   password    confirm    false    getenv    REMOTE_ADDR    check_ip_in_lan    luci.model.client_mgmt    get_mac_by_ip    assert    lan mac is nil!    access    r    auto upgrading 	   attempts 	       failureCount    attemptsAllowed    exceeded max attempts    decrypt $   luci.controller.admin.cloud_account    luci.model.uci    cursor    get    sysmode    mode    ap 	   err_code    cloud_bind_and_login     luci.model.accountmgnt    cloud_acc_check 	   tonumber 	¯ÿÿ	¯ÿÿ	±ÿÿ	y¯ÿÿ	¯ÿÿ	K¯ÿÿ	¯ÿÿ 	      ltime    uptime 
   errorcode    ownerAccount    get_last_cloud_account        login failed 	   tostring    limit    logined_user    user    logined_remote    remote    logined_ip    addr    logined_mac    get_client_by    mac    ip    logined_host 	   hostname    user conflict 	   uniqueid 	      kill 
   luci.http    get_user_hash    get_aeskey    get_seqnum    write    token    secret    hash    aeskey    key    aesiv    iv    seqnum    luci.controller.domain_login    tips_cancel    header    Set-Cookie 	   sysauth=    ;path=    SCRIPT_NAME    stok    /tmp/applogin_flag    fs    true    kickoff_app    call    rm -f /tmp/applogin_flag    cloud_config    new_firmware    remind_later    login_count    1    upgrade_info    type    0    set    commit                     h  s       A   @  b @À b ÀÀ  HA  ¢ÆÀÀ H A ÈÁ â	  A  b M@Â A b @Â  	 EA  Dc #        require    luci.model.uci    cursor    get    cloud_config    device_status    bind_status    need_unbind 	   tonumber 	      isbind                     u      	A      H@  "  @ " FÀ@ È  A H bÀ@  HA Á ¢Á   â @Â Á   â @Â 	ÆB H A È Â â@ ÆB H A ÈÁ  â@ Æ@C H â@Ê   ÀÃÀÀÃ
 â Ù   ÆB H A È Â â@ Æ@C H â@Ê  À Å
 HA Aâ@ É  ã  #        require    luci.model.uci    cursor    get    cloud_config    device_status    bind_status    need_unbind 	   tonumber 	      set    1    0    commit    fs    access 	   homecare    tm_homecare    enable    on 
   fork_exec 	    forceOn                          '=  E       @Ê  ¢ Á@    â A  HÁ  " AA   b A  ÈA ¢ ÀA ÙA    ÈÁ  B @BB B B    Â ÀCC â  @Ãb UYB     ÈÃ D  DD£ C  È ¢ YC  ÀÀÃDâ Á  HD âCY  @ ÚC  Û 
  EJÄ "  À 	  H   # 
 " J bD @ÄYD  @ ED  DÆDÆÊ 	À  [  	DÆD ÀDÆÄ	D  ÈD  £ D  È ¢ ÄG	Û 	[ âÙ   ÈÊ âD @ÀDÆÑDÈ	DÄÀÄHâ DÄDÊ âD Å  [ 	ÀDÆDÀÊ  EÆÐ	DÀÉ  	 [ ã ÀDÉ[âÙD  ÀÅÉ
DEÊ
DEÊ
   ÅÊ
DÀÅÊ
DEKÈ  Ë ¢  À ÀÅKDÀÀELDÀÀBÀ   È   £ Å Ê ÀÍÀÅ â Ù   @MÁ âE Ê ÀÅÍ âE À É   E  ã ÀNâ MÆÀ	  HÆ F  ÁF â Æ# DF ÆNH "    @FÏ 
bF AF   b ÆÏ¢ ÀÐâ  GÐ" @ÇN b @Ð 
ÅG ÄÇÄGÄÇÄ ÈNH " Ä¡Ä¢Ù    ÑH     Ä¢Ù    ÒH     Ä£Ä¤bGAG   b ÇÒ¢G ÓÈG  [ 
È ÀC	 â ÈH    H ¢GD ©Y  À  Ê¢G ÇT HH ¢ G     Å  ÀU
 V ÈH  "H     AÈ  b M@È ÄGH­ÄGH®J FH×È  HI 	bH J FÈ×È bHc  #  `      Log    require    luci.sauth 	   luci.sys    luci.model.checktypes    cloud_req.cloud_account 	   username    admin 	   password    token    confirm    false    getenv    REMOTE_ADDR    check_ip_in_lan    bind failed 
   errorcode    -10000    luci.model.client_mgmt    get_mac_by_ip    assert    lan mac is nil!    access    r    auto upgrading 	   attempts 	       failureCount    attemptsAllowed    exceeded max attempts    luci.model.accountmgnt    check  	      ltime    uptime    login failed    limit    logined_user    user    logined_remote    remote    logined_ip    addr    logined_mac    get_client_by    mac    ip    logined_host 	   hostname    user conflict    /tmp/applogin_flag    fs    true    kickoff_app    unlink    bind_device 	   tostring    role 	   uniqueid 	      kill 
   luci.http 	   get_hash    get_aeskey    get_seqnum    write    secret    hash    aeskey    key    aesiv    iv    seqnum    luci.controller.domain_login    tips_cancel    header    Set-Cookie 	   sysauth=    ;path=    SCRIPT_NAME        stok    get_profile 
   telemetry    support    no    yes    get    cloud_info    tp_id_collect_flag 	   tonumber    is_id_login    section    global    commit_without_write_flash                           ')  E       @Ê  ¢ Á@    â A  HÁ  " AA   b A  ÈA ¢ ÀA ÙA    ÈÁ  B @BB B B    Â ÀCC â  @Ãb UYB     ÈÃ D  DD£ C  È ¢ YC  ÀÀÃDâ Á  HD âCY  @ ÚC  Û 
  EJÄ "  À 	  H   # 
 " J bD @ÄYD  @ ED  DÆDÆÊ 	À  [  	DÆD ÀDÆÄ	D  ÈD  £ ÇÛ¢D  À@H
D@@H
D@@H
Y   @I
D@À@I
D@@IÅ	 ÀEÉ bY  À Ê
DÊ
DÀBÀ I  Å
 Å  c H EKEÛ
¢    KÅ ¢E  LÛ
¢E À   ÈÅ
   £ ELÛ¢Å MFÀ	  HÆ F  Á  â Æ#  ÆÌMFÀ ÆÌM M 	  HÆ F  FM#  "F  ÆÌD  ÆMH " Ù   @FÎ	bF AF   b ÆÎ¢ ÀÏâ  GÏ" @ÇM b Û@Ï	ÅG ÄÇÄGÄÇÄ ÈMH " ÄÄ Ù    ÐH     Ä Ù    ÑH     Ä¡Ä¢bGAG   b ÇÑ¢G ÒÈG  [	È ÀC	 â ÈH    H ¢GD §Y  À  Ê ¢GÇS¢G  TH H ¢ G    Ç Å   U
 HUH È É "H     A  b M Í ÄÍ«ÄÍ¬J FÖÈH É H 	bH J F×ÈH bHc  #  ]      Log    require    luci.sauth 	   luci.sys    luci.model.checktypes    cloud_req.cloud_account 	   username    admin 	   password    token    confirm    false    getenv    REMOTE_ADDR    check_ip_in_lan    bind check failed 
   errorcode    -10000    luci.model.client_mgmt    get_mac_by_ip    assert    lan mac is nil!    access    r    auto upgrading 	   attempts 	       failureCount    attemptsAllowed    exceeded max attempts    limit    logined_user    user    logined_remote    remote    logined_ip    addr    logined_mac    get_client_by    mac    ip    logined_host 	   hostname    user conflict    /tmp/applogin_flag    fs    true    kickoff_app    unlink    get_accountRole 	   tostring    role 	      -20580    cloud_set_status_bind 	   uniqueid 	      kill 
   luci.http 	   get_hash    get_aeskey    get_seqnum    write    secret    hash    aeskey    key    aesiv    iv    seqnum    luci.controller.domain_login    tips_cancel    header    Set-Cookie 	   sysauth=    ;path=    SCRIPT_NAME        stok    remove_seqnum    get_profile 
   telemetry    support    no    yes    get    cloud_info    tp_id_collect_flag 	   tonumber    is_id_login    section    global    commit_without_write_flash                     ¢  ®       	   A   @  b À ¢ ÆÀ@H â@Ê   À@Á â MÀÁ@ 	     	  Æ Bâ@ #  #  	      require    socket    tcp    settimeout 	è     call    online-test 	       close                     °  Ã    .      [   @  W   È   J  @ÁÀ@Á b YA  À J @AÁ bA J  @ÁÀ@Á b Y  ÀAÁ @Â ÈA bFBÈÁ b FBÈÁ bÛ FCbA E  DDÁ c #        /tmp/cloud/    cloud_token_eweb        fs    access    call    cloud_getDevToken    io    open    r    read    *line    close    token    origin_url                     Å  Ø    -      [   @  W   È   J  @ÁÀ@Á b YA  À J @AÁ bA J  @ÁÀ@Á b Y  ÀAÁ @Â ÈA bFBÈÁ b FBÈÁ bÛ FCbA EA  DÁc #        /tmp/cloud/    cloud_token_eweb        fs    access    call    cloud_getDevToken    io    open    r    read    *line    close    origin_url                     Ú  æ    .      H@  "  @ " AÀ  @ Á    @AÈ ¢ ÈÀ  b @B  HÁ ¢ M C@@C  HÁ  ¢Æ@C H Á ÈA â  H " EÁ  D Û¢ DDAc  @  @£  #        require    luci.model.uci    cursor    string    gsub    exec    getfirm MODEL    
        get_profile    cloud    https_client 	      get    cloud_config    login 	   username    role    cloud_req.cloud_comm    cloudUserName 	   tonumber    model                     þ  	     	&      H@  " @@ b À  ÅÀ  Ä@AÄ@Ä ÂAÂ  È "A ÃACÂÁCÛ  AÂ  È "A ÄACÂADÛ  AÂ  È "A#        require    ubus    connect 	   PFClient    type    tmp_app    method    token !   c9c9c9c9c9c9c9c9c9c9c9c9c9c9c9c9    call    passthrough    sn    0 	   transfer 	   raw_data 	   AQABAA==    1 )   AQACAAEABQAACAAAAAAAAAKejGoBAQYAAAAAAA==                              E      @@  H  Á  ¢ @ D Á   @@  H  Á  ¢D   @@  H  A ¢  M  @ D   DÁc  #         get    sysmode    support    no    mode    router                       )      J   @ À b Y@      È@  £    Å   ÁÀ @Á ß@ À Ê   ÀÁâ À£  #        read_rsakey    no valid rsa key    key    n    e    seq    gen_seqnum                     +  3           H@  " EÀ  À@ È  ¢ D À@ È ¢ DÀ@ È  ¢ È@   ÁB@Á@  b A È " HÁ @Dc  #        require    luci.sys.config    model    getsysinfo    product_name    hardware_version    HARDVERSION    firmware_version    SOFTVERSION    (    string    sub    special_id 	   	      )                     5  8           H@  " @@ d  c   #        require    luci.controller.admin.status    get_internet_status                       ¡      A   @  b @À b ÀÀ  HA ¢ MA   ÀAÊ    ¤ £   @   ÀAÊ    ¤ £   #        require    luci.model.uci    cursor    get_profile    cloud    https_client 	   	   dispatch                     £  ¥       
     @ A@  $  #   #        _index 	   dispatch                     §  ©     
      E  @  _@   ÈÀ  ¢  "  @A#        entry    login    call    _index    leaf                             