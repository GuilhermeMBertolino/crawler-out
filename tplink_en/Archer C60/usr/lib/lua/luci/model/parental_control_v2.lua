LuaQ                k     H@    À@"@  H@ " A   b   ÈÀ ¢ Á   â  HA " A  b  ÈÁ ¢ Á  â  HB " A  b  ÈÂ ¢ ÀDâ  CÄ" @CÄ b Ã È D H 	E EÅ  ÈE  HÆ ED ÈE  HÆ  ÈF  E D  DEEÅ   ÈE  E D È E D  DEEÅ   ÈE  E D  D  DEEÅ    D  D  DEEÅ  ÈE  HÆ F È Ç H G È ED  D  DE@EJb B
 a    B
 aE      ¡      áÅ      ! aF   	 	     
¡     áÆ     !     aG   
 á   	 	    Ç
 áÇ       Ç
 á   
Ç
 áG  
   Ç
 á       Ç
 áÇ   	  	     
 Ç
 á       Ç
 áG          Ç
 á     Ç
 áÇ         Ç
 á         Ç
 áG        Ç
 á     Ç
 áÇ  Ç
 á   Ç
 áG          
   Ç
 á     	  	     
   Ç
 áÇ        Ç
 á       Ç
 áG       Ç
 á       Ç
 áÇ     Ç 
 á       Ç 
 áG     Ç¡
 á       Ç¡
 áÇ     Ç¢
 á	 Ç¢
 áG	 Ç£
 á	 Ç£
 áÇ	     Ç¤
 á
   
 Ç¤
 áG
       Ç¥
 á
     Ç¥
 áÇ
            Ç¦#  M      module    luci.model.parental_control_v2    package    seeall    require    ubus    nixio    string 	   luci.sys 
   luci.util    luci.model.uci    luci.tools.debug 
   luci.json    luci.model.tm_clientmgmt    luci.model.one_mesh    luci.model.nat 	   NAT_INST    cursor    /tmp/tmp-device-config    /proc/pctl/ $   /etc/init.d/parental_control reload    parental_control_v2    /etc/init.d/qos restart &    tyke    categories_list    adult_content 	   gambling    sex_education    prefilter_list    online_communications    social_network    pay_to_surf    media 	   download    games    website_list 	   pre_teen    teen    adult    all 
   Parentctl    class    _print_tbl 	   __init__    commit    get_default_filter    get_default_limit    get_owner_list    insert_owner    update_owner    remove_owner    block_owner    get_insights    get_insight_history    add_clients    filter_website    get_default_website    get_client_list    tmp_get_owner_list    tmp_insert_owner    tmp_remove_owner    tmp_get_time_limit    tmp_set_time_limit    tmp_get_filter    tmp_set_filter    tmp_edit_owner    tmp_get_client_list    tmp_add_client_list    tmp_del_client_list    tmp_get_insights    tmp_get_history    tmp_clear_history    tmp_block_website    tmp_get_default_filter    tmp_get_website    tmp_set_website    tmp_set_clientV2 ,       v          A      b @À A     b    Á@Û  AB  b ×A¢A   À ¢ @@  À ¢A ^   û#        type    table    pairs    print     =  	   tostring    _print_tbl                                
    @   È@  " @      AÀ     d  c   #        get_profile 
   max_owner    4 	   tonumber                                
    @   È@  " @      AÀ     d  c   #        get_profile    max_dev    8 	   tonumber                                
    @   È@  " @      AÀ     d  c   #        get_profile    max_key    32 	   tonumber                                A   @@À   Û   À b@ #        os    execute    echo f > /proc/pctl/                        ª           J   Y@  E   C   E   C  J  F À Ê A  a  
  
    
   
  b@J   V    ¢ Ð@ ã  #        foreach    owner           ¢    !   J   F À Ê   A@ H  bY@  @J   F À Ê   A@ HÁ  b  @  @  Å   À    Ê 
 AAÄ Ê   @ÁA " Ä B#  	      get    .name 	   real_mac    mac  	   	   tonumber    id                                 ¬   ¶           @
 [  A  ¢    Ö  À @ÈÀ   HÁ  Ý À@@ É ã Ü@þÉ   ã  #        get    website 	    	                       ¸   ä    \      Å     ÇY    B  [ " M@  ÀÀ £  
   A[ Â "B[ ÛB     [ "  @@  À@   BBÛ Â¢Ê  ÀÂÂ H â  J   Û bDÄVQÂÄ Þ  üÀ Y  @ ["     HÂ  Â  CDH Ã"A @CÄ Á ÀÅâ b  @  Âû [ ##     	       type    string    spend_online    website_list    _    find    ^(%d+);(%d+); 	   tonumber    sub 	      gfind    ([^,;]+),(%d+);    website    block 	      os    date    %x 	Q    time                     æ   ý    &      Ç Y      [ " M@@  £    [ "ÀG Ê  ÀÂÀ H â  ÄJ   Û bDV QÂ Þ  ü  @ú£  #  	      type    table    ipairs    gfind    ([^,;]+),(%d+);    website    access_timestamp    block 	                       ÿ       5      E     AA  @ÀÁ  È bYA     Û £AÁ ¢  ÁÁ¢A   BÛ B ¢  Û   Û  ¢  @   Û £ Ê  ÀÁÂ H â Å  Ä CDÀÞA   þÛ   ã#     	       io    open #   /tmp/tm-shn/list_pc_filter_apps.db    r    read    *all    close    find    ^Version: (%d+)
 	   tonumber    gfind    %d+,%d+,%d+,([^,
]+)
    name 	                         ,      E   C   E   C  J  F À Ê A  a  
   
  b@#        foreach    owner        %  )      [      Ê   Ö Ñ À@  Á@   @ â ÀÀ#     	   	   tonumber 	   owner_id                                 .  8      J   F À Ê  bY@      È@  £   @Ê ¢@ c  #        commit    Parentctl commit failed. 
   fork_exec                     :  G   	   E      Ê   ¢ Å  ÄA @Ä Â@Ä AÄ BADÀ  üc  #        pairs    filter_level    categories_list    prefilter_list    website_list 	                       I  Q      E      ¢ D   ¢ D  ¢ D c  #        profile_len    devices_len    category_len                     S        E       @
 HA  ¡  
    ¢@c  #        foreach    owner        W     _   E    @ D  @ D@ D À@  A@ DÁ  DÀÁ@B @       D B  AÀ DÁ@C D @DÀÁ@C @     D ÀC  AÀ DAD D@DÀAD @     DÀD  A@DAE D F DDÀAE @    @ D F @     DÀF  A@DAG D H DDÀAG @    @ D H @     D   HÀ À ¢ D  Ê  Ö ÑÀÈ@#  $   	   owner_id    key    name    blocked    1    internet_blocked     website_list    website    workday_limit    enable_workday_time_limit    workday_daily_time    workday_time    120    weekend_limit    enable_weekend_time_limit    weekend_daily_time    weekend_time    workday_bedtime    enable_workday_bed_time    workday_bed_time_begin    workday_begin    workday_bed_time_end    workday_end    1320    420    weekend_bedtime    enable_weekend_bed_time    weekend_bed_time_begin    weekend_begin    weekend_bed_time_end    weekend_end    client_list    get_client_list_by 	                                     
       À À@À    Á@ A[" A  ÀAA  b MÁ EA  DÂc J  b @Â   È £  Ê ÙA  Å  Ã Å  Ã ÊÆÁÂJ  á  
 
    
  
  âAÊâ   HB CB  ÀÀ@ BB  À B ÂÃ@ QBÂ ü  ÀCÂÀDÂÆBD [ âÂÙB   [ c@DB@ÃDÀÃ@ BE  E@ÃEY  À   BCFÀC@ BE  EGCGÀC@ BE  EHCHÀC@ BE  EIIÃIÀC@ BE  EJKCK
 H CÛ ¢ C   Û  ãÆÃK â   @Ê ÆÌâC ÆCL ä ã  #  2      key    new    luci    json    decode    type    table 
   errorcode    invalid new params 	       owner num exceeds max num limit    foreach    owner 	    	   owner_id    client_list    add_clients    name    internet_blocked    blocked    1    0    website_list    website    enable_workday_time_limit    workday_limit    workday_time    workday_daily_time    enable_weekend_time_limit    weekend_limit    weekend_time    weekend_daily_time    enable_workday_bed_time    workday_bedtime    workday_begin    workday_bed_time_begin    workday_end    workday_bed_time_end    enable_weekend_bed_time    weekend_bedtime    weekend_begin    weekend_bed_time_begin    weekend_end    weekend_bed_time_end    section    uci section failed    commit    sync_hnat_status    get_owner_list        ¦  ®   !   J   F À Ê   A@ H  bY@  @J   F À Ê   A@ HÁ  b  @  @  Å   À    Ê 
 AAÄ Ê   @ÁA " Ä B#  	      get    .name 	   real_mac    mac  	   	   tonumber    id                                   ]   v    À À@À    Á@ A[" A  ÀAA  b MÁ EA  DÂc E  ABDBDÁB   C  ¢A  AC
 @BÂ ¢AÁC  À Ö À  DÀADÙ   Ê ÀÄ BBâA Å   BBÄ BDÄÂD "ÂB    Û£ÀE@Å@ DÁE  DFÀFDÁÀÁF@Å@ DÁE  DFÀGDÁÀÁG@Å@ DÁE  DFÀHDÁÀIDÁÀAI@Å@ DÁE  DFÀJDÁÀJDÁÊ  ÆÁÊJ  ÀBÂâ ÙA   HB #K " Û Ù   ÂK $ #  #  0      key    new    luci    json    decode    type    table 
   errorcode    invalid new params 	   owner_id    name    internet_blocked    block_owner    delete    website    website_list 	       client_list    remove_client_list_for    add_clients    enable_workday_time_limit    workday_limit    1    0    workday_time    workday_daily_time    enable_weekend_time_limit    weekend_limit    weekend_time    weekend_daily_time    enable_workday_bed_time    workday_bedtime    workday_begin    workday_bed_time_begin    workday_end    workday_bed_time_end    enable_weekend_bed_time    weekend_bedtime    weekend_begin    weekend_bed_time_begin    weekend_end    weekend_bed_time_end    section    owner    uci section failed    commit    get_owner_list                     _  x       À Ê   À@À â@ Ê  ÆÀJ  â@ Ê  â@ ÆÀ@ â Ù   À
 A"A A  EÁ  DÁAÀ DÂ DA# #  	      key    remove_client_list_for    delete    commit    sync_hnat_status 	      success    index                     {     
       @
 @AÀ   ¢ÀÀÀ MÀ Å    AÀ Ä  ÁÀ  A@ Ä@A  ÄA
  ÁA È  BÀ["A AB $ #  É  ã  #  
   	   get_bool 	   owner_id    blocked    internet_blocked    1    0    section    owner    commit                       ¾   f      @ Å   A   @J   WÁ  "   H A È ]E    ÆAHÃ â
  ÃB[ " BC   D A    FAÈÄ b ÄB	Û ¢DBE  ÂÄ  Ä  Û Å ¢  A		CùC  E[ ¡  "C  @C  F[  "CýDÄ@\AðFFbA @J@ÁÆ Ê   HB AbA H A È ]E  DÇ  DÄ@\AþÀ£  #      	   owner_id    io    open    r 	   	      read    *line 
   h_minutes    h_timestamp    num    match    (%d+) (%d+) (%d+)    spend_online    _    url 
   d_minutes    d_timestamp    (%d+) ([^,;]+) (%d+) (%d+)    website    block    table    sort 	
      remove    website_list    close    print    open  	   failed.
 	    	   insights        ª  ª          À@@ ¢ Á    AÀ â K  @    £  #     	   tonumber    spend_online                                 À  Þ   H      @ Å   A   @J   WÁ  "   H A È ]
FAÈÂ b ÂBÛ ¢ ÂB   Á    ÆAHÄ â
  ÄB[D "DÂ Ä B D  
 [  " AÄBù\AõFAEbA ÀJ@ÅÁ Ê   H AbA À£  #     	   owner_id    io    open    r 	   	      read    *line 
   h_minutes    h_timestamp    num    match    (%d+) (%d+) (%d+)    _    url 
   d_minutes    d_timestamp    (%d+) ([^,;]+) (%d+) (%d+)    website    block    access_timestamp    close    print    open  	   failed.
    history                     à     Z    À Á@  ÀÀâ Á  [ " E  AB     ÆAHÃ  â ÆBÂâ DÂÆAHÃ  â ÆBÂâ DÂÀÂ DÂÀÂBDÂÀBCDÂDÂ Ê  ÀÂÃâÂ ÙB  @J  bC [ cJ @CÄb  Û¢@Û
 ÅD
@EÁ "×	Á	Å È " EB
" D EÁ@ÁM@
À
   ÅC
["Å E  @ ÈE ¢E  
Û
£  À÷   ì	 # #        client_list    os    time    ipairs    mac 	   real_mac    gsub    :    -    upper 	   owner_id    name    type    client_type    access_time    set_client_info >   [!!error][parental_control_v2]:add_clients() real_mac error!!    api_get_proxy_mac_list    pairs    sub 		   ?   [!!error][parental_control_v2]:add_clients() proxy_mac error!!                          
/      Ê   Æ ÀJ AÀ È  âÁ  VÁ  Á Â@À M@À  Â@@Â@ý Á @AÀ  Á@@À @
  A ÀAÀ   "A MÀA
  B ÀAÀ   [ "A AB $ #  #  
   	   get_list 	   owner_id    website 	      blocked_status    true    delete 	    	   set_list    commit                       #      E     Ê   âÀ [   c  #                          &  )      J   @ À d  c   #        get_access_client_list                     ,  q   '      À@À ¢ Á    À â Á  E    Å  
  A ÈB !       
     
  "BÁ
 " 
" 
 " £ #     	   tonumber    start_index    amount 	       foreach    owner    owner_list 
   owner_max    filter_website_max    client_per_owner_max    sum        @  d   L   E      Ê     Ê  
 Ñ À  @  À @ ¢ D  À@ AÀ@ ¢ D @  ÀA ¢ D  ÀA @ ¢   À BA  @AÂ@Â" D   DÀBÀ C DÀ À@C Ã Á@   D â DÀ  D@ÄÀD Ã Á@   E â DÀ  D@ÄÊ À@Å @À " â  D 
 J VQAÂA   @B   #     	   owner_id 	   tonumber    name    bin 
   b64encode    internet_blocked    blocked    get_insights 	   insights 	      spend_online 	       filter_level    workday_limit    1    workday_daily_time    workday_time 	ÿÿÿÿ   weekend_limit    weekend_daily_time    weekend_time    get_client_list_by 	   tostring    client_num                                 s  ù  	 ¢      Å     E    ÁA   À â DÁÀÀ DÁÁA   ÂÀ â DÁÀÁ DÁÁA   BÁ â ÁÀÁ ÁÀÁÁ ÁÁA   Â â ÁÀAÂ ÁÀÂ ÁÀÁÂ ÀÀÃ À@Ê  â ÀÃ
  DHB "B 	  HB #  J YB  E  CE  C J FÄÊÃ a  
  
   
 
  bBJ b   È  CEC  À@@
  ÃC  À Â
 Å@ ÑÂÃ ü
 ÃE F@ÃB"  CÀC@ Æ  ÂÆ CC@@ÀÃÀ F@@B  ÂF@Ã@ÀÃÀ F@AB  ÂF@CCÁÀC@FÁÃÁ  ÂFÂÀC@ÆCÂÂ  ÂÆÂI J
HÄ D
 ÀDE¢ Û ¢ C   Û 
 ãÆÃJ âC Ê ÆËâC ÀCEÁ# #  -      enable_workday_time_limit 	   tonumber    workday_daily_time    enable_weekend_time_limit    weekend_daily_time    enable_workday_bed_time    workday_bed_time_begin    workday_bed_time_end    enable_weekend_bed_time    weekend_bed_time_begin    weekend_bed_time_end    name    internet_blocked    time_limits 	   bed_time 	      print     owner num exceeds max num limit    foreach    owner 	    	   owner_id    bin 
   b64decode    blocked    1    0    workday_limit    workday_time    weekend_limit    weekend_time    workday_bedtime    workday_begin    workday_end    weekend_bedtime    weekend_begin    weekend_end    filter_level    adult    section 	   tostring    uci section failed    commit    sync_hnat_status        ¢  ª   !   J   F À Ê   A@ H  bY@  @J   F À Ê   A@ HÁ  b  @  @  Å   À    Ê 
 AAÄ Ê   @ÁA " Ä B#  	      get    .name 	   real_mac    mac  	   	   tonumber    id                                 û          Á   À@ÀÀÀ Á@â  [" J  @BÁ bB J FÁÊ  bB    ýÁA "A 
B"A   E  c #  	      luci    json    decode    owner_list    ipairs    remove_client_list_for    delete    commit    sync_hnat_status                       j   
K     Å     @A@" J  @À bA J FÁÀÊ  a    
    bAE  ÁAAÀA  A    A DÁBDÁÁBÀA  A    A DÁCDÃACÀA  A    A DÃÁCDÃDDÃADÀA  A    A DÃDDÃÁDDc #     	   tonumber 	   owner_id 
   dumptable    foreach    owner    enable_workday_time_limit    time_limits 	   	       workday_daily_time    enable_weekend_time_limit    weekend_daily_time    enable_workday_bed_time 	   bed_time    workday_bed_time_begin    workday_bed_time_end    enable_weekend_bed_time    weekend_bed_time_begin    weekend_bed_time_end        *  T   S   A   @@ b     ÀE     @È@  ¢@ À@  AÀ DÁ B D@D@Â B @     DÀB  AÀ DAC D@D@BC @     D  @   À D  Á@ÁÀÀD À À@E À @ÂÀÀD Ù@    È À À@E Ù@    ÈÀ À À F  Á@ÁÀÀF À À@G À @ÂÀÀF Ù@    È À À@G Ù@    ÈÀ À Ê  Ä #     	   tonumber 	   owner_id    print    workday_limit    1    enable_workday_time_limit    workday_daily_time    workday_time     120    weekend_limit    enable_weekend_time_limit    weekend_daily_time    weekend_time    time_limits    workday_bedtime    enable_workday_bed_time    workday_bed_time_begin    workday_begin    workday_bed_time_end    workday_end    1320    420    weekend_bedtime    enable_weekend_bed_time    weekend_bed_time_begin    weekend_begin    weekend_bed_time_end    weekend_end 	   bed_time                                 l  ¹   ^     Å    @Ä 
   A@[ "A   E  Á  À@¢ AÁ  ÀAA¢ AÁ  ÀÁA¢ DBDABDÁ  ÀB¢ DÁBDCD@@CÀ ÄÀCAÄ  Ä@DAA@CÀ ÄÀCAÄ  Ä@DÁÁ@C@ÄÀCÂÄAÂÄ  Ä@DÂ@C@ÄÀÃÁÂÄÃÄ  Ä@Ä F
 HÂ  ÀÀ¢ Û¢ A   Û B ãÆG âA Å    # #     	   owner_id 
   dumptable    enable_workday_time_limit 	   tonumber    workday_daily_time    enable_weekend_time_limit    weekend_daily_time    enable_workday_bed_time    workday_bed_time_begin    workday_bed_time_end    enable_weekend_bed_time    weekend_bed_time_begin    weekend_bed_time_end 	      workday_limit    1    workday_time    0    weekend_limit    weekend_time    workday_bedtime    workday_begin    workday_end    weekend_bedtime    weekend_begin    weekend_end    section    owner 	   tostring    uci section failed    commit                     »  ô   %     À @ A@@@Á  Å    E    A
 HC ¡          ¢BDÂ DDD BBBÛ¢ D ÂBÛ¢B c #     	   owner_id    start_index    amount 	       foreach    owner    sum    filter_website_list    luci    json    encode 
   dumptable        Î  ä   
.   A   @@ b     	@@   ÀÀ@ À   A@  ÀA Ù@    Å   ÀY   ÀÀ Û  ¢ @Ê
 ÀÊ
 J B  Ê
 BÄÊÑÂÃ  Àú#  	   	   tonumber 	   owner_id    website    filter_level 	       filter_categories_list 	   category    ipairs 	                                   ö  (   j     À @ A@@ @Á@Y     A
 AB b Â  Û¢A AÖ À Ê  ÆÁÁJ B Û¢ È âAÊ  ÆAÂJ B Û¢ È  âA ÀBÙ   À
  ÂA ÁB â Ã "B
  BB ÁB â Ã ["B @	J  FÃÊ B [" HÂ bBÈA  HB ÝÁ ÖÑBÃ DÜþÖMÀ Ê  ÆÁÁJ B Û¢ ÈÂ âAÊ  ÆAÂJ B Û¢ ÈÂ  âA FÁC bA E    £ #     	   owner_id    start_index 	       filter_level    set 	   tostring    filter_categories_list    delete 	   category 	   set_list    filter_website_list    website 	   get_list 	      new_website    commit                     *  M   
$     Å    @Ä 
   @ Á@@A@" Ä  @AA" A@ Ä Â  Ä@Â
 B ÈÁ  À[" A   [  cFAC bA E    £ #     	   owner_id    name    bin 
   b64decode 	   tonumber    internet_blocked 	      blocked    1    0    section    owner    uci section failed    commit                     O  u   /     Á    A@â   @@" HÁ    Å   AE    BAÁ  â ¢  ÁÂ  â@À  
  DB B@Â" ÄÄBDÂQÁÂÞ  ûÄÄÁÖÄÁÄAÄAã #     	   tonumber    start_index    amount 	    	   owner_id    get_client_list_by 	   tostring    ipairs    name    bin 
   b64encode 	      sum    client_list                     w     *     Ê   À À â@ Å    A@Ä    Á@ A@AA" A  b@ BBBÀÂÁ¢ D^  ÀýÄ FB ÛbÁYA   Û ãÊ ÀÁÂ
âA Å    # #     
   dumptable 	   owner_id    luci    json    decode    client_list    ipairs    name    bin 
   b64decode    add_clients 
   fork_exec                     ¡  ¾        Á    A@â    Á@ A@AA" Ù      J  @ÁÛ bAJ @ÁÁ bA E    £ #     	   tonumber 	   owner_id    luci    json    decode    clientmac_list    remove_client_list 
   fork_exec                     À  ò    7     Å     @@A@ ¢À@  AÂ  bÀ  ÀÁÃÀCÁ AÄ  b  ÈÅ  Â
HF Á
È Ä
  ÈÅ Ä^   üV Ã@ CÃÀ [  WCV QÄÃ^  @öA# #     	   owner_id    get_insights 	   insights    ipairs    spend_online    website_list    [    {"    website    ",    }    , 	    	   [{"",0}]    ] 	                       ô  /    >     Á    A@â   @@" A  Á@b  Å    E    ÆBA @Ã@â@AÅ  Ã A bÀ DB	ÄB	 È  ÅÂH EÃÈ Ã	DB	  ÈÄ Ã	AB^  ù[  BÂVB# #     	   tonumber    start_index    amount 	   owner_id 	       get_insight_history    history    [    ipairs 	      {"    website    ",    access_timestamp    }    ,    ]    sum                     1  C         À @  E  c #     	   owner_id                     E  j   3     À @ A@E    @
 [B  ¢ÈÁ   HÂ  ÝÀM À ÖÑÂÀ DÜÁýÖÑÁÀDÊ  ÆÁJ B Û¢ ÈB  âAÖMÁ Ê  ÆÁÁJ B Û¢ ÈB  âA ÆB âA Å    # #  	   	   owner_id    website 	   get_list 	      delete 	   tostring 	    	   set_list    commit                     l           Å     A    b   Å   ÀÄ ÃÀÄ ÁÄÂ A^   üJ b Ä@Ä@BÄ ã  #        pairs    filter_level    categories_list    prefilter_list    website_list    filter_level_detail 	      filter_website_file_ver    filter_website_file_path #   /tmp/tm-shn/list_pc_filter_apps.db    filter_level_list                       ¯   5     Å     @A@" A  @b   ÀÁ@¢ Ê  ÆÁJ  ÈB â  H  ÂAÛ ¢B  Û¢ @@ÑÀ Ö ÑCÂQBÂ   ýÄ Ä@ ÄÄ@ BCCÛ ¢ ÄÄ ÄÄ Äã  #     	   tonumber 	   owner_id    start_index    amount 	   get_list    website 	    
   dumptable    ipairs 	      sum    filter_website_list    luci    json    encode    filter_level        filter_categories_list                     ²  Ñ   !     À @A   @ Á@@A" J  FAÁÊ  [" HÂ bAV M Â J  FAÂÊ  [" HÂ  bA FB bA E    £ #     	   owner_id    luci    json    decode    filter_website_list    delete 	   tostring    website 	    	   set_list    commit                     Ó     l      Å   
   @[ "A A  @À " À@ @AA  @Á "   AMÀA@A  B" AA  Ab OÁÂA @ C C @CCC Ä AD ÈÁ " E"   ÁC 
  E ÁE@AÅ "   AÆ  A  @Æ "  
  ÁF[ "Á A     È ¢A AG¢ Á  â J @ÃÇÃCÈ bCFCDÈ Ä b FÅb @@ÃCDM J @ÃÆ bÃ YC   Ê  D âC Þ  øÊÀÈ
 âA # #  #   
   dumptable 	   tonumber    enable_priority 	      prio    on    time_period   àÿÿÿïA
   prio_time    os    time 	  	ÿÿÿÿ   off     	   real_mac    mac    gsub    :    -    upper    name    bin 
   b64decode    type    client_type 	   owner_id    set_client_info C   [!!error][parental_control_v2]:tmp_set_clientV2() real_mac error!!    api_get_proxy_mac_list    pairs    sub 		   D   [!!error][parental_control_v2]:tmp_set_clientV2() proxy_mac error!! 
   fork_exec                             