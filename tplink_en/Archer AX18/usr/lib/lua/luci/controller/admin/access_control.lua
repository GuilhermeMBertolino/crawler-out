LuaQ                    H@    À@"@  H@ " A   b   ÈÀ ¢ Á   â  HA " A  b  ÈÁ ¢ ÀC â  BÃ[ È B "Û   HÂ "B !    aB  ¡    áÂ   !   aC     ¡     áÃ   !  aD      B a    BD aÄ    B a  BÄ aD  B a        BD aÄ  B a     BÄ aD  B a         BD aÄ      B a       BÄ aD   B a  BD aÄ  B a         BÄ aD         B a     BD aÄ  B a  BÄ aD  B	 EÄ   ÅD  E ÄÄÅ   ÄÄÊÄD  ÅD  Å ÄÄÅ   ÄÄÊÄDÄ  ÅD  ÄÄÅD  ÄÄÄÅ  E ÄÄÊÄDD  ÅD  ÄÄD Å   Ä ÄÄÅD  Å ÄÄÅD  	 ÄÄÅ  Å ÄÄÊÄÅ  E ÄÄÊÄÅ   ÄÄÊÄÅ   ÄÄÊÄÅ  E ÄÄÊÄD Å   Ä ÄÄÅ   ÄÄÊÄÅ  Å ÄÄÊÄÅ  E ÄÄÊÄD  ÅD   ÄÄÅ  Å ÄÄÊÄD¡       ¡Ä   Ä ¡  #  =      module %   luci.controller.admin.access_control    package    seeall    require    luci.model.uci    luci.model.controller 	   luci.sys    luci.tools.form    luci.tools.debug    luci.model.client_mgmt    luci.model.checktypes    cursor    Form    mac 
   luci.json    check_access_control_mode    read_access_control_settings    write_access_control_settings    read_access_control_mode    update_access_control_mode    insert_black_devices    load_black_list    tmp_load_black_list    get_max_dev    insert_black_list    tmp_insert_black_list    update_black_list    remove_black_list    tmp_remove_black_list    load_white_list    insert_white_list    update_white_list    remove_white_list    read_guest_enable    write_guest_enable    tmp_load_basic    enable    read    cb    write    cmd "   /etc/init.d/access_control reload    mode    black_devices    load 	   tmp_load    block    white_devices    black_list    others    update    insert    tmp_insert    remove    tmp_remove    white_list    guest_network 	   dispatch    _index    index !          )     	   
     @ H@  " H  À   A@AA¢ ÀA@ È  ã  Á   â      BÂ  @ @Â@ Þ  ýc  #        getenv    REMOTE_ADDR        luci    sys    net 	   arptable     ipairs    IP address    HW address                     +   1           À@ @ Y    @ @ F@À È  Á  b F Á b @ #  I   c  #        mac    gsub    :    -    upper                     3   7       J   F À È@    b   À@A  [  ¢ K@   É@  É  ã  #        get_profile    access_control    max_dev    count                     9   =    	   E      @@  [  ¢ D c  #     
   max_rules    get_profile    access_control                     ?   C       F @ È@    b FÀÀ b   J   b F À È@    b FÀÀ b @    @    £  #        gsub    -    :    upper                     E   Q       E      ¢  @A  H  ¢ À@¢ Ê  Æ ÁHA   á    
    
  â@c  #        gsub    -    :    upper    foreach    access_control        I   N    F   J         @Ê  Æ@ÀH  Á@ â DÀ J        @    Ê   Ö À  A@A HÁ ¢  B¢ D J        @    Ê   Ö À  AÊ  Æ@ÁH Á â Æ Ââ À   @    À DJ        @  @CÊ   
   À À Á¢ @      Ê   Ö À  CD #     	      get_all    access_control    .name    mac    gsub    :    -    upper    host    HOST 	   NON_HOST    name    match_history_list                                 S        r      H@  " @@ b@ @À@ b    Ê   â Æ ÁHA  â ÆÀÁâ 
 BA È Â "J FÂÈA  H b ÈA ¢ Ê  â 	 Y   AÂ  b   ÀCÄÃÀÃÄÃÀÅÆÁHD  â ÆÃÁâ ÃÀÅÀÅ ÈÃ ÙC    È ÃÀCÆÃÀÆÃÀÅÃÀEÀ@ CG  GÀG  È 	 ÁÃ  â  Å	@E@
  	  Þ   þ@@ÈÀ	  ÁÃ â  Å	@E@
  	 Þ   þH Ö ÑÃÈ^   î£  #  $      require    luci.model.client_mgmt    init    get_client_list    gsub    :    -    upper    get    access_control 	   settings    enable    access_mode    black_list    white_list    ipairs    name 	   hostname    ipaddr    ip    mac 
   conn_type 
   wire_type    wired 	   wireless    guest    active    raw_conn_type    host    HOST 	   NON_HOST    on    black    white 	                          £     .   
   " A      b ÀAÀ@@ DÀAÀ A@ DAÁ@AÀA@ DÁÁ AÀ B@ DAÂÀ AÀB  DÁÂÃ@CÀ ÁÀÈ ÁDDÄDÄDÅDÅDÅ^  @ö#  #        ipairs    raw_conn_type    wired 
   conn_type    2.4G    wireless_2g    5G    wireless_5g    5G_2    wireless_5g_2    6G    wireless_6g    guest    GUEST    _guest    online    on    blocked    off    type        traffic_up 	       traffic_down                     ¥   Í    _      @Y   À    @ Ù@  @ I  c A   b @À@ ZA  E  _A   Û¢ @@@ A  ÛA Å  
  @  Û !   "B  AÂ   bÀ
  A  QDÁ@D¢ ÀAÆÃÁH D â ÆÂâ ÃÀA @ÅÃ   ÄÄCÄÃ ÅÃ   ÄÄC
  ÄC  ÑDÁÀÄ"      	  @ 	D  	 Ä DAÂ^  @ôJ  FÄÛ  bB# #        type    table    foreach    ipairs    get_all 	      mac    gsub    -    :    upper    key    index    success     delete    commit        °   ²       J         @À@@ DÀ #     	      .name                                 Ï   /     A   @  b    Ê     â   ZA    H @@Á@@Á:@Á bA @ÁÁ b Y   9 BB H ¢ Ê ÆÁÂHB  â 
  H " E    ÁB âÀ	  AD  b@ÃÅC HF ¢ D¢ ÀÃ
ÆÅÃH F â ÆÄâ À@ 	 @ ^  ÀúD  VQÄÄ  DV@DDÅDV@DÃÄC	 HE ¢ D	¢ D@V QÄÄ  V @DDÅDV @DÃÄC	 HE ¢ D	¢ DÞ  @ïÖÀÖÑÂÁB â   @ÅD@ÃFÄÃÈ E b FÄb DJ FÅÈD  [ bDÞ   ûÖ @Ã @ÃJ FÃÅÈC  bC VQÃÄ ÈÃ ]ÃVQÄÄ  DV@D	E	DV@D	C	ÄC	 HE ¢ D	¢ D\ùAC  bÀ	  ÁD â@ ÃÆC ÈF " D" @ÃFÆÃÈ G b FÄb @@  @ Þ  ÀúD   ÑÂÄÀÄ ÅÄÀÄ ÃÅC
 ÈE " D
" Ä^  @õ[ Ã È ]E  E	DC	ÄC	 HE ¢ D	¢ D E	E H ¢D\Ãú@Á@ ÁAA b ÀÃ¢ @FÀ FC H  ¡    ¢B ÂFC @¢B ^   ûJ FÇÈA bA£  #        require    luci.model.client_mgmt    black_list    access_mode    black    white    init    get_client_list    get_profile    access_control    max_dev    count    white_list    ipairs    mac    gsub    -    :    upper 	      name 	   hostname    insert    delete_all 	ÿÿÿÿ    foreach    delete    commit        $  &      J         @À@@ DÀ #     	      .name                                 3  8          J   F@À È  Á  H  bY@    H  @ J  b FÁ ÈÀ  b F@Â b @#  #  
      enable    get    access_control 	   settings    off 	   host_mac    gsub    :    -    upper                     :  I   	%   E    @ Ê   Æ@ÀH  Á  È   â@ Ê   Æ ÁH  â@Ú@   È@ DÀ Ê  â ÆÀÁH A â ÆÂâ DÀ À À ÀÂ@Á  A â@ Á   â@ c  #        enable    set    access_control 	   settings    commit    off 	   host_mac    gsub    :    -    upper    on    check_access_control_mode    white    black                     O  S          J   F@À È  Á  H  bY@    H  @ #  #        access_mode    get    access_control 	   settings    black                     U  f   	   E    @ Ê   Æ@ÀH  Á  È   â@ Ú@   È  DÀ À À @Á Á A â@ À À  Á Á  â@ Ê   ÆÀÁH  â@c  #        access_mode    set    access_control 	   settings    black    white    check_access_control_mode    commit                     j  ~   8   E    @ Á@  ÀÀÀÀÀ â  Á   â À  Á@ÂÁB@ÂFBÂÈ Ã b FÃb ÄAJ  Âb Y  ÀJ B b Y  J FÃÈÂ C [bJ b V QÄD Þ  @öÊ  Æ@ÄHÁ â@c  #        data    luci    json    decode    ipairs    success     key    mac    gsub    -    :    upper    black_list    insert    access_control 	      commit                              
   H   $  #   #        black_list                           	-   
    @ @  È  Á  "@      J   F À È@    HA bY@    H ÀÁ  A    È  ¢ Á@  â @ÄAÄÁÁÄACÄACÄÄÄÄÞ  Àý£     È ¢@    £  #        get    access_control 	   settings    access_mode    black    enable    off    on    black_list    ipairs    online    blocked    type     
   conn_type    traffic_up 	       traffic_down )   access_control off or in white list mode                              
   H   $  #   #        max_dev                     ¡  ®   4   E      @@@ÀÀ@ ¢ À AÆ@ÁH Á â Æ Ââ À Ê    Aâ Ù   Ê  A â Ù   @Ê  ÀÂ AAAÁ ÈÁ " B" @Câ@Ê Æ@ÃH A Û â[ Ê   â [ Ê ÆÀÃH â@c  #        luci    json    decode    new    mac    gsub    -    :    upper    black_list    set_client_nickname        name    insert    access_control    commit                     °  Á   /   E    @ @@  HÁ  ¢  A¢ D DÁ   ÈÀ ¢       @B HÁ  ¢    Á  ¢    ÀB H A È ¢@  ÀB H Á È ¢@  @D ¢@  £  #        mac    gsub    -    :    upper    name    network device    black_list    ret    insert    access_control    set 	   settings    enable    on    access_mode    black    commit                     Ã  Ò   E   E      @@@ÀÀ@ ¢ Á   À@ÀÀÀ A â  AÁAÁ È " AB" Ä  AAAÁ È " AB"  
  @AÁ"   
  B@AÁFÁÈ Â b FAÂb Ã"A
 AC ÈÁ   @CB@BABE  ÃDBÁD" [  
[ " [  
 D "Ac  #        luci    json    decode    old    new    mac    gsub    -    :    upper    set_client_nickname        name    update    access_control    black_list    commit                     Ô  Û   	   @ @ @@ Ê   ÆÀHÁ   Û  â 
 AAÁ  "Aã  #        key    index    delete    access_control    black_list    commit                     Ý  è      @ @ F@À È  Á  b F Á b @ J   F@Á È Á a  
      b@J   F Â È b@I  c  #  	      mac    gsub    :    -    upper    delete_all    access_control    black_list    commit        à  ä      J   F@À È   Á@ b B   A       A@A HÁ ¢  B¢ D A   @ Á    AM   I@  I  c  #  	      old_dev    get_all    access_control    .name    mac    gsub    :    -    upper                                 ì  î       
   H   $  #   #        white_list                     ð     8   E      @@@ÀÀ@ ¢ Ê   À Á AAâ Ù@   É    ã À@AÆÀÁH A â ÆÂâ ÀÊ  Á â Ù   @Ê  À Ã AAÁAA ÈA " B" @Câ@Ê ÆÀÃH Á Û â[ Ê   â [ Ê Æ@ÄH â@c  #        luci    json    decode    new 
   check_mac    mac    invalid new params    gsub    -    :    upper    white_list    set_client_nickname        name    insert    access_control    commit                          `   E      @@@ÀÀ@ ¢ Á   À@ÀÀÀ A â 
   AA@A" A   	  HÁ #
   AA@Á" A   	  HÁ #
 " BA È " ÁB" @AFÂÈA  b FÁÂb @@ÁFÂÈA  b FÁÂb Ä@@A  @Á J @ÃÁB HB ¢ ÁB¢ ÀÃbAJFÁÃÈ B E  CDAD  ÀÃÂÀÁÂb [ J  b [ JFÄÈ bAc  #        luci    json    decode    old    new 
   check_mac    mac    invalid new params    gsub    -    :    upper    set_client_nickname        name    update    access_control    white_list    commit                       "   
   @ @ @@ Ê   â ÆÀHÁ   â Æ@Áâ 
 H Á Û  [$ #  #        key    index    gsub    -    :    upper    access_control    white_list                     $  (          J   F@À È  Á  H bY@    H@ @ #  #        enable    get    access_control 	   settings    guest_enable    off                     *  /      @ @ Y@    H@     @Á  H A Û ¢@    AÁ  ¢@À ¤  £   #        enable    off    set    access_control 	   settings    guest_enable    commit    read_guest_enable                     2  6   	   E      @@  HÁ  ¢ D c  #        max_client    get_profile    access_control    max_dev                     u  }      a   
      @Ê    EA  DA¤  £   #     	   dispatch 
   post_hook        v  {          À    À    @@À À ¢@   £  #        cmd 
   fork_exec                                          
     @ A@  $  #   #        _index 	   dispatch                                  E  @  È  _@ À  È  ¢  "  Á#        entry    admin    access_control    call    _index    leaf                             