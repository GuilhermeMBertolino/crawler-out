LuaQ               '¬      H@    À@"@  H@ " A   b   ÈÀ ¢ Á   â  HA " A  b  ÈÁ ¢ Á  â  HB " A  b  ÈÂ ¢ ÀÄâ  CD[ È C " Ã H C È Ä H D È Å G á   
   !F   
a      ¡Æ    á !G a ¡Ç          á    !H  a  ¡È  á  !I   a    ¡É                     	 ¡	               I ¡I  ¡       É ¡É       	 ¡	      I ¡I  ¡ É ¡É  		 ¡	 I	 ¡I    	 ¡  	       	  
  É	 ¡É   	
 ¡	    I
 ¡I      
 #  +      module    luci.model.one_mesh    package    seeall    require 	   luci.sys    luci.tools.debug 
   luci.json    luci.model.uci    ubus    luci.model.nwcache    luci.tools.form    bit    luci.model.wireless    nixio    luci.tools.datatypes    cursor    Form    mac    client_mgmt    /tmp/client_list.json %   /tmp/sync-server/onemesh_client_list ,   /tmp/sync-server/onemesh_dev_available_list    /var/run/one_mesh_file.lck    /var/run/client_list_json.lck     /tmp/onemesh_sync_wifi_tmp_json    0x1003    0x1004    api_arrange_mesh_clients    api_timeout_called    api_get_mesh_clients    get_sclient_list_all    get_available_mesh_dev_list    get_mesh_topology    get_device_detail    get_all_re_detail    set_device_detail    get_result_available_mesh_dev    wireless_status_all    manage_available_mesh_dev    get_fdb_sta    get_wireless_sta    get_slave_client_info        ,   /       J  @ À   È@    b C   J   FÀÀ     È  Ù@    È@ b@#        open    w 	X     flock    ex    sh                     1   4        
    @ "@       #        close                     6   9       J  @ À   È@    b C   J   FÀÀ     È  Ù@    È@ b@#        open    w 	X     flock    ex    sh                     ;   >        
    @ "@       #        close                     A   H        [      @@Û    HÁ  ¢ [     @@Û   HÁ  ¢ [     @AÛ   ¢  ÀA ¢   #  #        string    gsub    -        :    match    %w+    upper                     J   R          @ I  c  A@     b @   £ ^  ÀþI  c  #         pairs                     T   ]        H      c    Û   ¢   QÀÀ    ÿc  #     	        pairs 	                       `   p    $      É  ¢@    @@Û     ¢   Æ AHA âA"A 
  ÁA[" [  
 [ "   @
H   ÈA WÁ"A Ê  â@ c  #  
      io    open    r     read    *all    close    decode -   
[error]luci.json.decode return nil! file :     
                     r   |    "   A@     b @ ÀA     b @  Û Â  A  b ×A¢A A  À ¢    ÈA  H ×A¢A  À ¢A ^  Àù#        table    type    pairs     =  	   tostring    
data[    ] is table                     ~           
     @ " F@@ È  b  @ ÀÀ ¢ Æ Aâ AÁ ÈÁ " B$ #  #  	      init    get_network    lan    get_interface    mac    gsub    :    -    upper                                
     @ " F@@ È  b  @ ÀÀ ¢ £  #        init    get_network    lan    ipaddr                                   J   F À È@    a  
      b@#  #        foreach    onemesh_client    device                  J   F À È@   @ HÁ  bF Á È@  b FÀÁ b   Ê   Æ ÂHA  @ â À   @ @#  	      get    onemesh_client    .name    mac    gsub    :    -    upper    get_all                                    £           @A  H  ¡       
   ¢@c  #        foreach    history_list    list                   J    @  J  F@À È   Á@ H bC  #        mac    get    history_list    .name 	   nickname                                 ¥   º     *      A@  @À À  È  bY@      @AÈ ¢@ #  ÀÁ  ¢@    #  Á  À@Ã H â@Á B A Â@ Á MÀÃÁÀ MÀÃÀ Á   â  Æ@Ä â@ #  #     	       io    open    /proc/uptime    r    printf    /proc/uptime is null    read    *l    _    uptime 	   idletime    string    find    (%d+%.%d+)%s+(%d+%.%d+)  	   tonumber    close                     ¼   Ö    
,   @  @
   @HA  "A 	  #    Á@FA ÈA  b FÁÁb  ÈA " A  @Â Û bMÀÂ   CÛ B [¢    CÁCÛ ¢ Û  A    £ #        print +   get_name_by_mac_oui can not accept nil mac    string    sub    gsub    -        upper 	   	      find     match 
   %S*#(%S*)    bin 
   b64decode                     Û   0   :  E      Å     J  @Àb A  @ÈÁ   ¢ÇBÁ È C  "AB  b @A  b   ÀÃÂÆÃHD  â ÆÃÃâ  Ä@D ÄÀ ÄD "Û 
 ["M@E  D ÅÃ ÄÅ Æ DÆ Æ ÄÆ DÆ ÇMD@  Ç DÇMG  DÇD     Ä DÄD^   ñH   Å    E  Ê ¢ ÆCHâC Û  [ ãÊâ Û HÁC  â MÀÆCHâC Û  [ ãÊ ÆÃÈH	 D	 â ÙC    È	  [ " Q@ÅI
@ÅÂ
FÃ
ÈE  b FÅÃ
b 
 EJÛ

 ¢ÄÄ
DÄ
Å   ÆI
 EÄ FM  F EM  F EM   F EÄÄE ÆI
 FKF    
Ä ÆI
 KF    
ÄÀË@ ÆI
 LF    
Ä FËCF È " ÆC" @ËFÃÈF  b FÆÃb ÄDÄÄDDDÄÆI
LÄÆI
FFÄÄÍÆI
FMÄÆI
MÄÆI
ÆMÄÀË ÆI
NÄÆI
FNÄÆI
NÀÆI
ÀÆÎÀ@ÆI
NÀËÀÀÆI
ÀÏMÄÀÀÆI
ÀÏ ÇI
 N @ ÀÆI
Ï@ ÄÅO	 @ ÄEP¡@ ÄÅPÄQ ÆI
ÆNÀËÀÀÆI
ÀÏMÄÀÀÆI
ÀÏ ÇI
 ÇN @ ÀÆI
Ï@ ÄÅO ¢@ ÄEP ¡@ ÄÅP  ÄQFÌÄÄG£FMÀFÆGMÀ FÆGF    FÌÄFQMÀ FQF     Ä£ÄÑ£ÄQ¤  Ä¤  Ä¥ÂFÍ FÍZB ÀÿÆR
MD@Á  âÀ ÈÂCH È " ÈC" @ÅM@ @Å@ @ÈÇ@@@ÈÇ@ @M@@@@ E  ÅDÈÇDÈÇM@D ÈÇÀJ ÄÀ ÈD	 ¢Û  Û 	¢M@E  DM@EM EDÈGM ÈGDDÓM@S ÓS@ DÓ@ÓMÀS Ó T@ DÔ@ÓM@T ÓT@ DÔ@ÓÀT@ DÈÔ  DÈÊÈI
ÈBDªÈI
ÈBDªÈI
HMD«ÈI
HMD«DCDD@Ä@ @DHV¬Þ  @â   ®  ÄV" Jb   Ê 	 âD ÁD  ÀÀ	
H âMÀ ÅÄ	 "FEÈ	bE J @×
 
b 
AE  	b M@@ E  

"E  [ EA [ "À?@GM@ ?@ÇBFÃÈG  b FÇÃb  Û ¢À;ÀÈIÀÈÂÆÃHI  â ÆÈÃâ À@9 ÉRH	 	 Å	  
  E
  MD 4 Û
 ¢
2ÀËBÆÃHL  â ÆËÃâ 
  LJ[
 "@M@@@LÍÌILM@ @ÌM@@@Ì@LÕ@@@Ì@VQÈÄQ	ÈE  DJ@ÌM@@(@Ì@ÅM@@'@ÌED &I   Û ¢Á
 ÀMÊ KH
 âMÀÁ
 ÀMÊ NKH
 âÀ  I   û@Å  ÌM@ÌLU@Ì ÌÀ ÌV@VÀ
 LJÛ
 ¢ÀÌÀÌÅË¦ÀÌÀÅËÁL ÙL  @ ÀÌÀÌÇËÖ ÑÈ	HÅ  DÊÅ   Í EÄÄÌM M  @  Í ÍGÄ ÄÄ Í ÍEÄ F  M M     FÄ Í   M  @  Í MFÄ Í	M   Í	 FÄ Æ  ÍMD Í FM     Ä  Ä Í	M   Í	 GÄ Ç  ÍMD Í GM    Ä  ÄL ÍÆ  ÍMD Í ÍFM     Ä  ÄÑÀÄÀ  Ì

 JJÛ

 ¢À
ÄJ	¤À
Ä£À
ÄÊ¤À
Ä

¥  @Ã  @¿¾EH"E  [  Û##  _      connect    io    open    /etc/MAC_OUI.map    r    call    get_hist_list    request_type    table    type    pairs    mac    gsub    :    -    upper 	   hostname    network device     read    *all     ip 
   wire_type    guest    device_type    access_time    connect_status    access_uptime 	   nickname        name 	      close    onemesh_client_list    get_profile 	   wireless    support_6g    no    device    string    sub 	
      UNKNOWN    0.0.0.0    mac_5g    mac_24g    yes    mac_6g    model    product_name    status 
   connected    level    link_speed_24g    link_speed_5g    link_speed_6g    bridge_mode    signal_strength_24g    signal_strength_5g    signal_strength_6g 	Îÿÿÿ   signal_strength 	   	·ÿÿÿ	   	¦ÿÿÿ	   	    	µÿÿÿ	   location    mesh_nclient_num    mesh_sclient_num    mesh_sclient_list    mesh_nclient_list    StationGrid    connection_type    2.4GHz    2.4G    5GHz    5G    6GHz    6G    wired    config_RE_mac    parent_RE_mac    config_RE_level    parent_RE_level    not_in_allclist    os    time    decode 
   NON_GUEST    unknown                     3           A   @  b@J  @À b  É ¢A Á  AÊ ¢A A AÊ Â ¢M ÆAB[âAÆBâA ÊâA Ê â Â A  b@1CÃ0  ÀÃÃÆÄâ ÃÀCÄÃÁ ÀÃMÀ Á ÀÃÀCÄMÀÀ Á ÀÃÀCÄÃÀÄM ÂÀÀÄMÀÄ ÀÄÆÅHD  â ÆÄâ ÃÊÆÃÅH D Û âÙ    B  ÀÆM Â@ÀÆMÀÄÀÆÆÅHD  â ÆÄâ ÃÊÆÃÅH D Û âÂÃ ÁÃ Ù    B  ÀÃÃM Â@ÀÃÃMÀÄÀÃÃÆÅHD  â ÆÄâ ÃÊÆÃÅH D Û âÂÃ ÁÃ Ù    B  ÀÇÀÁ  DÇâ   @ÅÃ	FÄ
b E@EÄ	E@ÅÃ	@EM@ @ÅÃ	@E@EÄ
M@À @ÅÃ	@E@EÄ
E@Ä	M Â
@@Ä	MÀÄ
@Ä	FÅ
ÈE  b FÄ
b EJFÅÅ
È F [ 
bBÅ AÅ Y    B  @Æ	M Â
À@Æ	MÀÄ
 @Æ	FÅ
ÈE  b FÄ
b EJFÅÅ
È F [ 
bY    B  @ÅÃ	M Â
@@ÅÃ	MÀÄ
@ÅÃ	FÅ
ÈE  b FÄ
b EJFÅÅ
È F [ 
bBÅ AÅ Y    B  Þ   è^  ÀÍ ÀJ FÇÈ bBJ FÈÈ C H bBÂ J FÈÈ C H	 bBÂ AÂ @ÉAÂ ÉÀ J@ÂÉ
 bB # #  )      api_arrange_mesh_clients 	      encode    os    remove    io    open    w     write    close 	       pairs    level 	   real_mac    mac    upper    name    mac_24g        gsub    -    :    insert    access_control    white_list    mac_5g    ret    mesh_sclient_num    mesh_sclient_list    commit_without_write_flash    access_control_enable    get 	   settings    enable    access_control_mode    access_mode    on    white 
   fork_exec "   /etc/init.d/access_control reload                       §           " A     b M@@ E   c  #  #        api_timeout_called    table    type                     ª  Ñ    S      E      Å   
  " [  
 J " Û  À @  # @ÀÁ  [ " M   #   [ " E  BAAÂA HC ¢ B¢ DÀBAÀÃDÂÀÂÂDÂÀBAÀÃDÂÀBAÀÄÆÂâ À@ DÄ  DÂÄÀ MÀÀÀ ÀBÃMÀÀ À ÀBÃÙB    ÀÂÂDÂÀ ÀÅÀ ÈB ÙB  @ À ÀÅDÂÖ  ÑÅ@   ò#  #         onemesh_client_list    table    type    pairs    device    mac    gsub    :    -    upper    model    product_name    name    device_type    DISCONNECT    connection_type    status    disconnected 
   connected 	   location     	                       Ó            E      Ê   À@Àâ ÀÁ  È   " @ Gc J b  ÀA¢   Á Û Â   Á  A Câ@Ä ["  À Ã DB M   DB  DCM À  DB  DC Ã@A  ÄÃ@A@ Ä@A  DÄM@A ÃD       ÄÃD       ÄM@A  ÄD       DÄD       Ä ÄÄ Å DÅ Å ÄÅ
FD È " D    Ä  GÀ@DÇM@ @DÇ À@ ÇÀ@DÇ@@ È@DÇ@@ È@@DÇ@@ É  ÀÞ  ÀåÖ  ÑÂÁAã#  #  %   	       connect    call 
   tdpServer    onemesh_available_devices     onemesh_dev_available_list 	      pairs    mac    table    type    model    name    ch_2g    ch_5g    ch_5g2    ch_6g    device_type    ip 	   ssid_24g    password_24g    ssid_5g    password_5g    get_profile    onemesh    onemesh2_support    no    yes    signal_strength 	ÿÿÿÿ	Îÿÿÿ	   	µÿÿÿ	   	¦ÿÿÿ	                         1    I      A   @  b@AÁ   b M@  #  E   Û ¢@ÁÅ  ÂÖÑBÀD  Àý  Û¢ @ AB H Â ¢ ABB H  ¢ Ä ¢ ¢   Û ¢   Á  Û ¢  Û ¢ ÀE  E  C@Ä   þ#  #        api_arrange_mesh_clients 	      table    type    pairs    mesh_sclient_num 	       mesh_sclient_list    name    get    system 	   hostname    model    locale    sysinfo    device_type    WirelessRouter    mac    ip    mesh_nclient_num    mesh_nclient_list                     3  8    	   A   @  b@F@ ÈÁ   b FAÁb  ÁAÛ ¢À ã #  	      api_arrange_mesh_clients 	      gsub    :    -    upper    string    sub 	
                       :  =           H@  "@#  #        api_arrange_mesh_clients 	                        ?  T   
   E    @ À@@  @ J  FÁÀÈ B a    
      bAJ  FÁÈ bAAÁ  b [ c  #        mac    name 	   location    foreach    onemesh_client    device    commit    get_device_detail        F  O      J      @A  @@ Á  ¢ ÀJ  M Á J  F@Á È@   @ H  b@ J M Á J  F@Á È@   @ HÁ b@ #        get    onemesh_client    .name    mac     set    name 	   location                                 V  Z           #  #                          \  p   
B   J   F À È@    b Y@    HÀ      @A  H ¢ @    À  Ê   Æ ÀHA  A â Ù@    ÈÀ    À@ÀÀÀ @E  ÈÁ _A ÀÀE ÈÁ  _A@E ÈÁ B _AE  ÈÁ  HB _A J @Â b FÁÂd c  #        get_profile 	   wireless    support_triband    no    support_fourband    support_6g    wireless_2g    wireless_5g    wireless_5g_2    wireless_6g    Apcfg    read                     r  0        Å     @@ M@À @@ @À@ I  c @@ ÀÀqJ   J FÁÈA  b YA    HÁ  AB H ¢ A    Á Ê ÆÁHB B â ÙA    ÈÁ  "    AÂ  b M Ã J @BÃ bB ÀA ÀÁ E  DÄDÄÀÀÁ@EÂ  DÄDÄDDÀEÂ  DÄDÄDÄ@E DÄDÄDDDÄE   AC H ¢ B    B Ê ÆÁHC  â ÙB    ÈÂ 
 FC Û " J FÆÈC b  AD HD ¢ C     Ê ÆÁHD Ä â ÙC    È Ä @DGD@GD@ÄGYD    H D@DHD@HD@ÄHD@ID@DID@IYD    HÄ	 DJ FÆÈD E
 H
 bDAÄ
 ÄCb D@K@Ë H YD    HÄ D@DL@Ë H YD    HÄ DJ FÆÈÄ  HE bDJ FÆÈÄ  HÅ bDEÄ DÇDÇDÄÇD     DDÈDÈDÄÈDÉDDÉDÉD    Ä	 D F	E HE 
 ¢DÄ
 ÀDD¢ DË@K	  D    Ä DDÌ@K	  D    Ä D F	Å [E ¢D F	Å [Å ¢DDDBM NÀ  ÎÀÁ  A	E HE ¢ D     Ê ÆÁ	HE Å â ÙD    È   E   FF [	¢   ÀEG
ÅÀG
ÅÀÅG
ÙE    È ÅÀEH
ÅÀH
ÅÀÅH
ÅÀI
ÅÀEI
ÅÀI
ÙE    ÈÅ	 ÅÁÅ
  Dâ ÅÀK
@Ë È ÙE    ÈÅ ÅÀEL
@Ë È ÙE    ÈÅ ÅÊ ÆÆHÆ  	ÈF âÅÊ ÆÆHÆ  	ÈÆ âÅ[ DBM NÀ  Î@ ÎÀ A	E H ¢ D     Ê ÆÁ	HE Å â ÙD    È 
 F
E Û	" J FEÐ
ÈE  P
HÆ bYE    H  ÀEG
ÅÀG
ÅÀÅG
ÙE    È ÅÀEH
ÅÀH
ÅÀÅH
ÅÀI
ÅÀEI
ÅÀI
ÙE    ÈÅ	 ÅÁÅ
  ÆDâ ÅÀK
@Ë M@Ë
 È ÙE    ÈÅ ÅÀEL
@Ë È ÙE    ÈÅ ÅÊ ÆÆHÆ  	ÈF âÅÊ ÆÆHÆ  	ÈÆ âÅD¢Q	Û¢ ÁÄ ÀÒ	
 âD ÁD ÀÒ	
 HÅ âÓ	 	"EEÓ	"E 
 Ä §Ä Ô§@@ @Ô@ J @ I  c E  DÁT©Ä@ ª@ ÄªÄÀU«Ä@¬ AV¢ ÆVHÂ  Ûâ@À@ 	  #  B×@@@ I  c J FÁÈÂ  b YB    HÂ  Ö  BCÀ@ À@   Î@ VÄ H  ¢Cü@X@   £  Û£#  b   
   operation     mac    link    get_profile 	   wireless    support_triband    no    support_fourband    support_6g    wireless_status_all    type    table    print    cannot get the wireless status    wireless_2g_current_channel 	ÿÿÿÿ   wireless_5g_current_channel    wireless_5g_2_current_channel    wireless_6g_current_channel    wireless_ifname_2g    wl13    wireless_ifname_5g    wl03    get_all    wireless_mesh_ifname_2g    wl14    wireless_mesh_ifname_5g    wl04    ssid    encryption    psk_key 	   12345678    psk_version    psk_cipher 	   wep_mode    wep_format1 
   wep_type1 	   wep_key1    1234567890    channel    wifi0    current_channel 	   tonumber    enable    on 	   	    
   hide_ssid    hidden    backhaul_ssid    onemesh    backhaul_key    wifi1    2.4G    5G    yes    wireless_mesh_ifname_5g_2    wl24    wireless_ifname_5g_2    wl21    5G2    wireless_mesh_ifname_6g    wireless_ifname_6g    wl01    get    device 	   disabled    off    6G    encode    os    remove    io    open    w    write    close    load    timeout 	      unlink    params        opcode 
   target_id    target_include_all_sbuf    data    connect    call    sync    request 	   mac_list    onemesh2_support 
   tdpServer    onemesh_clean_specified_device                      2  N    	1         Á@    â ÀÀÀ  â [ Y   ÀÇ   FÁ ÈA bÛ Ù@     AÁ @ÂÈA  b B J  @ÁÂ b Y  úA FÃÈA  b FÁÃb AV QAÂ ÷Ä "A £  #     h   brctl showmacs br-lan | grep -n 'no' | grep -v 'is local' | grep '..:..:..:..:..:..' | awk '{print $3}'    require    io    popen    read    *l    mac    string    sub 	   	      macaddr    gsub    :    -    upper    close                     P     r   Å   
  @A  È  " A    Á   A@A @ H   HÀ A A b @Â b     G  ÆÁBH â[YA     Á ÀÁÃH B â ÂA Ê ÀÄB â Ù  úÁA ÆÁÄH B â ÆÅâ ÁÖÑÄÄ÷ÁE¢A @@A @ H    H@ A A b @Â b     ÀG  ÆÁBH â[YA     Á ÀÁÃH Â â ÂA Ê ÀÄB â Ù  úÁA ÆÁÄH B â ÆÅâ ÁÖÑÄÄ÷ÁE¢A ã  #        get_profile    global    model    other    QCA_IPQ50XX    2g G   wlanconfig ath0 list sta | grep '..:..:..:..:..:..' | awk '{print $1}' G   wlanconfig ath1 list sta | grep '..:..:..:..:..:..' | awk '{print $1}'    require    io    popen    read    *l    mac    string    sub 	   	      macaddr    gsub    :    -    upper    close    wl -i wl1.1 assoclist    wl -i wl0.1 assoclist 	   	                         Å    y   
     @ " F@@ Ê    EA  DÁb   Å     E    Å   HÂ " B  H " Û  B " [ Â [ "    [ "E  CCCÄ H ¢ CD¢ ÀDDÃDDÀCEDÃÁ ÀÃÅ H â
 [" ZD   @FDCÄA  ø AB " @CC@CM@ V QÁCC   ý [" @CC@CM@ V QÁCC   ý ["@CC@CM@@CC@C@ÅY  @@CC@C@Å Ç V QÁCC  ú£ #        connect    call    get_hist_list    request_type 	      sta_wireless_2G    get_wireless_sta    2g    5g    get_fdb_sta    table    type    pairs    mac    gsub    :    -    upper    ip 
   proxy_mac    connection_type 
   wire_type    string    sub 	
      name 	   hostname     wired                             