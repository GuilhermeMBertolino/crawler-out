LuaQ               <É     H@    À@"@  H@ " A   b   ÈÀ ¢ Á   â  HA " A  b  ÈÁ ¢ Á  â  HB " @Ã b Â È C H C È Ä H D È Å H E È Æ H F È Ç H G È È H È È 	 HI I È		 J	 H	 Ê	 È Ë H Ë È L H
 L
 È
 Í
 H ¡    áM  ÂM á  Â áÍ      ÂÍ á    Â áM    ÂM á        Â áÍ  ÂÍ á  Â áM    ÂM á    Â áÍ     ÂÍ á     Â áM     ÂM á  Â áÍ     ÂÍ á Â áM     ÂM á Â áÍ ÂÍ á  Â áM ÂM á    Â áÍ    
  	  
    ÂÍ á    Â áM        ÂM á        Â áÍ ÂÍ á          Â áM  ÂM á    Â áÍ                 ÂÍ á               Â áM            ÂM á   Â áÍ    ÂÍ á	          Â áM	 !	 N !Î	        !
  Î !N
    !
   N !Î
    !   Î !N   	        !   	               N !Î   ! Î !N  !    N !Î     !     Î N EN N  Á Î±D°N  ÁÎ Î±D±N  ÁN Î±D²N  ÁÎ Î±D²N  Á Î±D³N  Á Î±D³  ÁN Î±Ú´D´  ÁÎ Î±Ú´DµN  Á Î±D¶N°E  N  Á Î±D°N  ÁÎ Î±D±N¶E  N  Á Î±D°N  Á Î±D±N·E   Á Î±ÁN Î¸D¸  ÁÎ Î±ÁN Î¸D¹  Á Î±ÁN Î¸D¹  ÁN Î±ÁN Î¸DºN·EN  N  Á Î±D¸NºE  N  ÁÎ Î±D°N  Á Î±D±N»E  N  ÁÎ Î±D°N  Á Î±D±N»EN  N  ÁN Î±D¼N¼E  N  Á Î±D°N  ÁÎ Î±D±N½aN    BÎ a  B aÎ BN #  ~      module %   luci.controller.admin.administration    package    seeall    require    nixio    luci.model.uci    luci.tools.datatypes    luci.model.checktypes    luci.tools.debug    luci.model.controller 
   luci.json 	   luci.sys    ubus    cursor    administration    accountmgnt 	   	    	  	  	  	3   	4   	5   	6   	7   	8   	9   	:   	;   	<   	e   	f   	g   	h   	   	Ë   	Ì   	Í   	   	ø  	ù  	½  	¾     compact_account_data    account_read    session_update    recovery_cfg_read    recovery_cfg_update    recovery_cfg_check    local_dev_data_check    remote_cfg_check    remote_cfg_read    remote_cfg_update    account_update    account_mobile_update    account_set    app_restart_wportal    account_appset    account_appget    account_mcu_write    account_mcu_read    account_mcu_check    recovery_read    email_check    email_update    recovery_update    local_mgnt_read    local_enable_all    local_enable_partial    get_host_mac    local_mgnt_write    local_max_devs    local_devs_read    local_devs_insert    local_devs_update    local_devs_remove    local_devs_view    local_mgnt_https_read    local_mgnt_https_write    remote_mgnt_read_without_https    remote_mgnt_read_with_https    remote_mgnt_read    remote_del_entry    remote_add_entry    remote_del_entry_with_https    remote_add_entry_with_https     remote_mgnt_write_without_https    remote_mgnt_write_with_https    remote_mgnt_write    get_ip 	   check_ip    recovery_testmail    login_read    login_write    account    read    cb    write    set    appset    appget 	   mcu_read 
   mcu_write    args  
   mcu_check    mobile_write 	   recovery    mode    local    load    others    insert    update    remove    view    https    remote 	   testmail    .super    login 	   dispatch    _index    index 8       V   Y    
   J      b@ A   @@À @À    d  c   #        luci    sys 
   fork_call                     [   c        EA D DAD DÁDc #        old_acc    old_pwd    new_acc    new_pwd    cfm_pwd                     h   n     
   A   @  b @À À  b  Á ¢ Å   AA@Aß@ Á H È [$ #  #  	      require    luci.model.asycrypto    Crypto    rsa    read_pubkey    n    e    compact_account_data                         t       
1      È@  ¢ @Ê   ¢ Á   Á  â   H "  AA A@ÁÁ b Y   ÂM  @ @B À Ê ¢A ÂÛ B @ÂÂB@ÃBB @BÃB@ÃB@ÂÃB@ÄB@BÄB@ÄB¢A#        require    luci.model.log    Log    luci.sauth    luci.dispatcher    context    authsession    read    user     write    addr    remote    token    secret    hash    aeskey    aesiv    seqnum                            9   EÀ    @@
 H  Á  ¢D    @@
 H  A ¢D    @@
 H   ¢D    @@
 H  Á ¢D   @@
 H   ¢D    @@
 H  A ¢D   À   @@
 H   ¢@      D c  #        enable_rec    get    account 	   recovery    enable_auth    authentication    from    to    smtp 	   username 	   password                        ¬    >   J   F À Ê  A  H  Á@ b@ J   F À Ê  A  H AA b@ @À@ Á @	J   F À Ê  A  HÁ ÁA b@ J   F À Ê  A  H B b@ J   F À Ê  A  HA AB b@ @@A Á @J   F À Ê  A  H B b@ J   F À Ê  A  HÁ ÁB b@ J   F Ã Ê  b@I  c  #        set    account 	   recovery    enable_rec    authentication    enable_auth    on    from    to    smtp 	   username 	   password    commit                     ±   É    O   J   @ À @@ b Y   @J   @ À @ b Y@  @ I   c  @@@ ÀÀ J   @ Á @A Ê  
 b Y   ÀJ   @ Á A Ê  
 b Y   ÀJ   @ Á ÀA Ê  
 b Y@  @ I   c  @@ ÀÀ @J   @ Á  B Ê 
 b Y   ÀJ   @ Á @B Ê 
 b Y   ÀJ   @Â  B b Y   @J   @Â @B b Y@  @ I   c  I  c  #        check_onoff    enable_rec    enable_auth    on    check_rangelen    from    to    smtp 	   username 	   password    check_ascii_visible                     Î   Ö           A      b @À ÀJ   @À À@ b Y   @J   @ Á @A b Y@  @ I   c  I  c  #        type    table 
   check_mac    mac    check_onoff    enable                     Û   ð    1   J   @ À @@ Å   HÁ   ß@bY@  @ I   c  @@@  Á @J   @@Á A b Y   @J   @ÀÁ A b Y   @ I   c  @@@ MÀ  J   @ Â @B È Á b Y@   @@B M Ã @ I   c  I  c  #     	   check_in    enable    off    all    partial    check_unicast_ipv4    ipaddr    check_ip_in_lan    check_range    port 	   	ÿÿ     80                     õ   û        À  J   F@À Ê    H  b@ J   F@À Ê    HÁ  b@J   F@À Ê    H b@ #  #        enable    get    remote    port    ipaddr                        	       J   F À Ê  A  H  @ b@ @@ MÀÀ  J   F À Ê  A  H A b@ @@ @Á J   F À Ê  A  H A b@ J   FÀÁ Ê  b@#        set    remote    enable    off    port    partial    ipaddr    commit                       <   b   A   @  b @À    b    ÈÀ  ¢ Á    â À@Á â A @ÁA YA    H A@AB YA    H A@B YA    H A@ÁB YA    H A@C YA    H A@ÁA Â @ACb Y   C@ Ã@B Â@ @ÁAA@ÁÃÁBb YA    H ÁÃÀC¢ A     @ÀD B@ÂBÂAÀBBâÙ  @Û 
 @BâAÁA  ÂA@BâAÉ ã Û 
 @BâAÉ   ã#        require    luci.model.log    Log    luci.model.accountmgnt    luci.model.asycrypto    Crypto    rsa    old_acc        old_pwd    new_acc    new_pwd    cfm_pwd 	   get_name 	      decrypt    update    session_update    update account failed                     B  X   
6   A   @  b @À    b    ÈÀ  ¢ Á    â À@Á â  ÁÁ@B " @ABB ÀB  ÂB @C bY  À[  ÀB bAAA ÁB ÀB bAEA ÁB DC DB DB DC Dc [  ÀB bAI  Á c#        require    luci.model.log    Log    luci.model.accountmgnt    luci.model.asycrypto    Crypto    rsa    decrypt    new_pwd    update    new_acc    old_acc    old_pwd    session_update    cfm_pwd    update account failed                     ^  s   	?   A   @  b @À    b    ÈÀ  ¢ Á    â À@Á â  ÁÁ@B " @ABB ÀB bY  ÀAÁ   ÀB bA@Cb YA    A Á Û¢  D AÄA    A A A     A  Ê  B ¢A £ [  bA I   c#        require    luci.model.log    Log    luci.model.accountmgnt    luci.model.asycrypto    Crypto    rsa    decrypt    new_pwd    set    new_acc    session_update 	   get_name    old_acc    admin    type    table 	      Set account failed                     v  z       
     @ H@  "@ 
     @ H  "@ 
     @ HÀ  "@ #     
   fork_exec    wportalctrl -c "   echo "stop" > /tmp/wportal/status     /etc/hotplug.d/iface/99-wportal                          
3   A   @  b @À    b    ÈÀ  ¢ Ç  A" A  @ È@ ÀA  b ÀÁ @BÚ@  Û  Ù@    È@ [AB ÀB[ âÙ  ÀÛ 
 [âAÁÁ âA É ã Û 
 âA É   ã#        require    luci.model.log    Log    luci.model.accountmgnt 	   get_name    admin    type    table 	      new_pwd    set_no_encrypt    app_restart_wportal    Set account failed                     ¥  ´    #   A   @  b À ¢ ÁÀ   â  Á À@AÙ@    Û  Ù@    È  ÁÁ "     Â " Û   AÂ [" A     E  DÁ Dc #        require    luci.model.accountmgnt 	   get_name    type    table 	      admin    cloud_account_exist    get_last_cloud_account    get_password 	   username 	   password                     º  Ö   A      È@  ¢ @Ê   ¢ Á   Á  â  A @AA A ÀÁA Y@  @ Â" AB  b Â @ÂBA A    [    BÃ[Û  "   J "B	 # À Ã["  @ J "B	 #  J "B 	  HÂ ##        require    luci.model.log    Log    luci.model.accountmgnt    old_acc    new_acc    old_pwd    new_pwd 	   get_name    type    table 	      admin    update_no_encrypt    set_no_encrypt    Set account failed                     Ü  å       A   @  b À ¢ ÀÀÀ  Aâ   @AAÁ # #        require    luci.model.accountmgnt 	   get_name    get_password 	      acc    pwd                     ç  ö          È@  ¢ À@  Á@ Y@   @Ab A Û¢ A ÁÁÚ@  Ú@  È  @ABÛ bY  @ I c I  c #  
      require    luci.model.accountmgnt    old_acc    old_pwd 	   get_name    type    table 	      admin    check_no_encrypt                     û     	   A   @  b @À À  b  Á ¢ Å   AA@Aß@ Á I  " Á J  FÂÈÁ B b YA    H A# #        require    luci.model.asycrypto    Crypto    rsa    read_pubkey    n    e    recovery_cfg_read 	   password    hide_password_recovery    get_profile    administration    no                           A   @ @ @À @@ V  KÀÀ À@@ V  K@ À@@A V  KÀÀ À@@A V  K@ À@A V  KÀÀ À @A V  @ @ I   c  @ÀA @À @@ B V  KÀÀ À@ B V  K@ À@@B V  KÀÀ À@@B V  K@ À@ B FÂ ÈÀ bY@  @@@B FÂ ÈÀ bY   @ I   c  I  c  #        enable_rec    on    from 	   	       to    smtp    enable_auth 	   username 	   password    find    [%s%c]                        2   H   @ @ M@À @J   FÀ Ê  Á  H @ b@ J   FÀ Ê  Á  HA A b@ J   FÀ Ê  Á  HÁ ÁA b@ J   FÀ Ê  Á  H B b@ J   FÀ Ê  Á  HA AB b@ J   FÀ Ê  Á  H B b@ @A ÀÂ ÀJ   FÀ Ê  Á  H C b@ J   FÀ Ê  Á  H A  b@ J   F@Ã Ê  b@I  c  I   c  #        enable_rec        set    account 	   recovery    authentication    enable_auth    from    to    smtp 	   username    on 	   password    commit                     8  Q   A   A   @  b @À    b    ÈÀ  ¢  AÈ@ ¢ ÀÀA A â Ù@    È  À Á@   â Ù   @Á   â Ù    ÀÀB  ÃÛ  
 @AC C â@ Û  
 â@ ÀÀC  ÃÀ Û  
â@ Û  
 â@  Û  
â@ Á  	  ä  ã   Û  
 â@ É   A ã #        require    luci.model.log    Log    luci.model.asycrypto    Crypto    rsa 	   password    decrypt        recovery_cfg_check    recovery_cfg_update    enable_rec    on    from    to    enable_auth    recovery_cfg_read    email check failed                     V  X      E@     @@
 H    ¢@    À  D c  #        mode    get    local    all                     ]  k       
   H   "@ 
  @@   È  !  
 
   "@#        fw unload_local_mgnt    foreach    device        c  i      J   @ À @@ @Á  H ¢  b  Y   À@@A Á  J  À À@@ À b@ #        macaddr    mac    gsub    %-    :    enable    on    fw del_local_mgnt                                  p  ~       
   H   "@ 
  @@   È  !  
 
   "@#        fw load_local_mgnt    foreach    device        v  |      J   @ À @@ @Á  H ¢  b  Y   À@@A Á  J  À À@@ À b@ #        macaddr    mac    gsub    %-    :    enable    on    fw add_local_mgnt                                                @@  @  À@ " A   @ Á @@Á  b À Û   ¢ ÀÀB@ ÁA ÀÂ ÂBCB È " ä  ã    @ü   £  #        luci    sys    net 	   arptable    http    getenv    REMOTE_ADDR    pairs    IP address    string    upper    HW address    gsub    :    %-                       ¶   a   A   @  b @À    b À@ @      Ê  Æ@ÁJ  ÈÁ  âÙ@    È  MÀ À A 
 ÁA È Â  [ "A 
 B "AA "A  J"A  BÁ " A @AÃ@ÃÁ b  DÛ¢   @Á  ÁDAEÁ   â ÀÁÅ
 â Æ ÈB  E C _C "B  ÁA
 H Â  Û ¢A  B
 ¢A ¢A  Ê¢A 
  ÁFH "A A  # #        require    luci.model.log    Log    mode    all    get    local    set    commit    local_enable_all    partial    get_host_mac    luci    http    getenv    REMOTE_ADDR    check_ip_in_lan    mac    description        enable    on    luci.tools.form    Form    insert    device    local_enable_partial 
   fork_exec t   [ -f /usr/bin/wportalctrl ] && wportalctrl -c && echo stop > /tmp/wportal/status && /etc/hotplug.d/iface/99-wportal                     »  ½       @  J   F@À È  Á  b Y@    H  @ #  #     
   max_rules    get_profile    local_mgnt    max_dev 	                        Â  Ò      A   b    Ê   Æ@ÀJ   á      â@£  #        get_host_mac    foreach    device        Ç  Ï   &   A   @@À    Å@  @ Ä  @ J @  A  À  Á@ A    A Ä  A Ä  @ BA ÈA " Ä  @ J @   	  @ 	A  	 Ä b@#        table    insert    mac    description 	   Your PC!        enable    key    gsub    [^%w]    host                                 Ø    
 r   A   @  b @À    b   À@ HA ¢ @     Ê  ÀÀÁ B â A [" A  @ J"A 	  H #  HÁ "  CJ " FACÈ Â b YA    H  ÁDÀAÄ¢ ÄÅA    A ÄÅEÂ H ¢ ÄF
 HÂ Å C ßB ¢ A   Ê BÄ¢A  ÈA £ F
 ¢A Ê  BÄ¢AÁÆ G ÈA  BÄ×¢A ÁGÀAÄÆAÈH B â ÁÊ ÀÁÈ	 âA £ @ Ê¢A   ÈA	 £#  &      require    luci.model.log    Log    get_profile    local_mgnt    max_dev 	       decode    new    local_dev_data_check    Invalid MAC address!    luci.tools.form    Form    count    administration    device 	       mac    string    upper    description        sub 	      insert    Insert failed!    commit    enable    on    fw add_local_mgnt     host     key    gsub    [^%w] 
   fork_exec t   [ -f /usr/bin/wportalctrl ] && wportalctrl -c && echo stop > /tmp/wportal/status && /etc/hotplug.d/iface/99-wportal !   Device's number is out of range!                       ?  	 u   A   @  b @À    b   À@À A ¢ Ê  ÀÀÀ AA â  [ "   @ ["     ÁÁA b @@ J "A 	  HA #  ÁB@ÁA"    ÁB@ÁÁ" Ä @CÄ@C CA    A   CÁC ÈA "    H "  ÁDJ" FEÊ B [ Å Ã ßB bYA  [ ÀÁAbAI   cJFÁÅÊ bAJ  ÀÁÁÁbA @AFÆ J Á ÀÁAÁbA [ ÀÁAbA[ DGÁAGÂ HB ¢ D HÈA ¢A c #  "      require    luci.model.log    Log    decode    new    old    local_dev_data_check    mac    get_host_mac    Invalid MAC address!    string    upper    host        description    sub 	   	       luci.tools.form    Form    update    device    Update failed!    commit    fw del_local_mgnt     enable    on    fw add_local_mgnt      key    gsub    [^%w] 
   fork_exec t   [ -f /usr/bin/wportalctrl ] && wportalctrl -c && echo stop > /tmp/wportal/status && /etc/hotplug.d/iface/99-wportal                     E        A   @  b @À    b À@ À A    @ Ù@  @ J "A 	  HA # [ " ÀA@ A   [ A A b ÀÁ@ ZA E _A  ¢ AB HÂ ¢ Ç A  b À Ã CCÛ ¢CÃ CCÛ  ¢C@ ^  ûE   C
HÃ ¡   ¢B  È ¢ BDÊ ¢ ÆDJÃ Û â ÙB  @ J "C 	  HÃ #
 E"C	  A b DÅ  @È Å @Á" F
 ×	¢D 	  Ê Å @Á" F
 ¢D^   ú  @  @Ù  ÀAÃ @CÆÅÃ  ÄÄÃÄÆbCJ@ÃÆ bC ã @[  bC I  C c#        require    luci.model.log    Log    key    index    Invalid http value!    type    table    get_host_mac    gsub    [^%w]        pairs    remove    foreach    device    luci.tools.form    Form    delete    Delete failed!    commit    success    fw del_local_mgnt  	   tonumber 	      insert  
   fork_exec t   [ -f /usr/bin/wportalctrl ] && wportalctrl -c && echo stop > /tmp/wportal/status && /etc/hotplug.d/iface/99-wportal    Delete failed!!        b  d      J         @À@@ DÀ #     	      mac                                      )   A   @  b @À    b    ÈÀ  ¢ À Aâ Ù@  @ J "A 	  HA #  A b  ÂAÅÂ   ÂÄ CÂÄ ÃÂC     ÄÁ^   ü# #        require    luci.model.log    Log    luci.model.client_mgmt    get_client_list_dev    No device data!    pairs 	      mac    ip    name 	   hostname    network device                     ¤  ¦      E@     @@
 H    ¢@    À  D c  #        https_enable    get    local    off                     ­  É   C   A   @  b @À    b À@ @      Ê  Æ@ÁJ  ÈÁ  âÙ@    È  MÀ @

 ÁA" FBÈA  EB  DbY  ÀÁÂ    ÀÁÂ¢ M@C   È £ ÁC
 H Â  Û ¢A  D
 ¢A@DÀ  Ê ¢A   Ê¢A A  # #        require    luci.model.log    Log    https_enable    off    get    local    connect    call    uhttpd    local_update    re 	   tonumber 	       reload uhttpd failed!    set    commit    on                     Ë  Þ     $      H@  "  @ " E  À  È  _@   AA  b A ¢     ÂA¢ Û  B¢  Ù        ã  ^   ûHA c #  
      require    luci.model.nwcache    init 	   internet    wan    ipairs    get_network    ipaddr    netmask    0.0.0.0                     ã  å       A   d  c   #        remote_cfg_read                     ê     E   J   @ À @  b   @Û  ¢   Å   
 Á@È B "A     ÀA Ä ÂÄÀÁB Ä ÂÄÀÂ@ ÄÁÄÀÁJ b  Á@
H  ¢A    A Å [ ßA ÒÁÄÀÊ ÆÁÀJ ÈB âÙA    È ÄÀÄÊ ÆÁÀJ ÈÂ âÄÀÄ ã  #        getenv    REMOTE_ADDR    check_ip_in_lan    get    remote    enable    off    all    on 	   managers    partial 
   specified    https_port    443    web_address    https://%s:%s 
   http_port    port    80    ipaddr                             E       @A  H  ¢ @    À   A Á@   â [ À Á   â [ c  #        get_profile    https_mgnt    https_support    no    yes    remote_mgnt_read_with_https    remote_mgnt_read_without_https                       +      Y     @ @Ê   A  [ Aâ@     @ Ê   A  [ Á  Û Áâ@ É  ã  É   ã  #        all    fw del_remote_mgnt port     partial     ip                      1  =      Y     @ @Ê   A  [ Aâ@     @ Ê   A  [ Á  Û Áâ@ É  ã  É   ã  #        all    fw add_remote_mgnt port     partial     ip                      D  R   ,   Y   	    	 @ @
  HA   È   W"A 
  HÁ  "A 
  H "A Ù    @A 
  HA   È   H W"A 
  HÁ  "A 
  H "A 	 # 	  # #        all )   fw del_remote_mgnt_with_https http_port      https_port     nat del http    nat del https    partial     ip                      Y  g   <   Y        @ À
  HA   È   W"A 
  HÁ   È WÁ"A 
  HA  È WÁ"A  Ù   A  
  HA   È   HÂ W"A 
  H ÈA  H WA"A 
  H ÈA  H WA"A 	 # 	  # #        all )   fw add_remote_mgnt_with_https http_port      https_port      nat add http { 255.255.255.255      } !   nat add https { 255.255.255.255     partial     ip     nat add http {          nat add https {                      m     
<   A   @  b @À    b À@ À A  AA A b Á Û  ¢ A  @ Ê ¢A   È £A Û  ¢A  ÀÁÀ Á@BÁ¢A MÀB  C  Ê ¢A  Ê [¢A  Ê ¢A A Û [ ¢A   Ê¢A  ¤ £  #        require    luci.model.log    Log    enable    port    ipaddr    remote_cfg_read    remote_cfg_check    Invalid ip or port!    remote_cfg_update    remote_del_entry    off    all    remote_add_entry                       ñ     A   @  b @À    b À@ @      À@A Ù@    È  ÁA A     @B YA    HA B A     Ê ÆÁÂJ  ÈÂ  âÙA    È 
 ÂB È C "B     J FÂÂÊ  HÃ bYB    HÂ  ÂB
 H  ¢ D @Ä È ÂÂ   D ÈB ÂÂ  @ È ÂÂ  ÁÂ  M ÁÀÁÂ  Ä@MA@ÊÀÂ â Ù  ÀÊ ÀÂÄ â ÙB  @Ê ÀÅ â ÙB  @Û 
âB É  C ãÁ â Ú@  È Á  â A   MÁ@ÀÅ@  Æ@ ÀÛ 
âB É   ãÀMAÀMÀ @ÀE@ ÀF@  @Û 
âB É   ãÊ ÀBÇâ   AÃ  CAÃ  M Á@ ÃFÇÈÃ  [ bY  ÀCÈ    ÀCÈ¢ MH   ÈÃ £ I
 H Ä  ÁÄ  ¢C Ã  M AÀ I
 H D Û¢C  I
 H Ä Û ¢C Ã  D I
 H  Û ¢C  CI
 ¢C ÃB	 H	 Ä	 ¢C     Á
 ÀCÊ H
 âÙC  @ÈÃ
  Ê ÆÉH	 	 ÈÄ	  âC Ê ÆCÉH	 âCÁ [ Û âCÁÃ  M Á ÁÃ  @Â@Û 
[ âC @Û 
 [ Û âCÛ 
âC ÁC Ä  [ Û âC Û 
 âC Á ä ã  #  /      require    luci.model.log    Log    enable    off 
   http_port        https_port 	   managers    all    ipaddr    get    remote    port    80    443    on 
   specified    partial    check_ip_in_lan    check_unicast_ipv4    Invalid ip! 	   tonumber 	   	P   	ÿÿ     Invalid http port! 	»     Invalid https port!    connect    call    uhttpd    remote_update    re 	       reload uhttpd failed!    set    commit    nat    norder    string    find    https    https     remote_del_entry_with_https    remote_add_entry_with_https    remote_mgnt_read_with_https                     ö        E       @A  H  ¢ @    À   A Á@   â [ À Á   â [ c  #        get_profile    https_mgnt    https_support    no    yes    remote_mgnt_write_with_https     remote_mgnt_write_without_https                              A   @  b @À b ÀÀ   ¢Æ Aä  ã   #        require    luci.model.network    init    get_network    ipaddr                       $    .    @  Á@    â  @@ À Á@    â  ÈÀ  Á  H A È ]AFAÈÂ Áb Û FÁ ÈÂ Ab \ýFÂ È  b B [¢  I c @ I  c #  	      lan    get_ip    wan 	    	   	      find    %.    sub                     )  4          H@  " J   FÀ Ê  Á  H bY@    H@ MÁ     ÈÀ £   È@ À ÀB  ä  ã   #        require    luci.model.passwd_recovery    get    account 	   recovery    off    on    recovery enable is off '   Please do not reply to this email.

    This is a testing mail.

    vercode_send                     6  ;    
   @  J   F@À Ê    H  b@ #  #        preempt    get    login                     =  J      @ @    @@Û  ¢ @      È  £ À  ¢  @M@    A
 HA   Û ¢@   A
 ¢@@  @ £  #        preempt    check_onoff    invalid args    login_read    set    login    commit                     {  }      J   @ À   Û   d c   #     	   dispatch                              
     @ A@  $  #   #        _index 	   dispatch                                  E  @  È  _@ À  È  ¢  "  Á#        entry    admin    administration    call    _index    leaf                             