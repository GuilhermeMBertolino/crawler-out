LuaQ               <2     H@    À@"@  H@ " A   b   ÈÀ ¢ Á   â  HA " A  b  ÈÁ ¢ C¢ Á B â ÀÃâ  HÂ "  D" A B b @Äb  ÈÂ ¢ Á  â  HC " A  b @Åb  È ¢ ÃE¢ Á  â Ä ÆÇÇÈÈÉÉa    BÄ	 aD  ¡  áÄ       !      aE      ¡      áÅ      !      aF      ¡      áÆ      !      aG      ¡      áÇ      !      aH      ¡      áÈ     !	     aI     ¡     áÉ     !
     aJ     ¡     áÊ     !    
 !K      a      ¡Ë      á      !L      a     ¡Ì     á	     !M	     a	      ¡Í	       á
      	   !N
   N
 !
    
 !Î
   Î
 !    !N   N !     !Î    Î !     !N   N !    !Î   Î ¡   áE   !    !Î   N !    !N   Î !    áÇ   !   aH   !   N !Î    !    Î !N      E N  ÎDN  D N  ND N  D¡N  ÎD¡N  D¢N  ND¢N  D£N  ÎD£N  D¤N  ND¤N  D¥N  ÎD¥N  D¦N  ND¦N  D§NE N  ÎD¨N  D¨N  ND©N  D©N  ÎDªN  DªN  ND«N  D«N  ÎD¬N  Á
 ÎD¬N§EN N  D­N  ND®N  D®N  ÎD¯N  D¯N­E N  ND°N  D±N  ÎD¥N  D¦N°EN  N  ND²N±E  N  D³N  ÎD³N²E  N  ÁN
 ÎD´N  Á
 ÎDµN´E  N  Á ÎD¶N  ÁN ÎD¶NµEÎ  N  Á ÎD·N  ÁÎ ÎD¸N  Á ÎD¸N·E  N  D¹N  ÎDºN¹EÎ  N  ÁN ÎD»N  Á ÎD»N  ÁÎ ÎD¼NºEN  N  Á ÎD½N¼EÎ  N  ÁN ÎD¾N  Á ÎD¾N  ÁÎ ÎD¿N½EÎ  N  Á ÎDÀN  ÎDÀN  DÁN¿EÎ  N  NDÂN  ÁN ÎDÂN  Á ÎDÃNÁE  N  ÁÎ ÎDÄN  Á ÎDÄNÃa    B" aÎ  BÎ" a B# #        module !   luci.controller.admin.tmp_server    package    seeall    require    nixio    luci.model.uci 
   luci.util 	   luci.sys    luci.tools.debug    luci.model.controller    luci.model.parental_control 
   Parentctl    luci.model.qos 	   QOS_INST    luci.model.security    SECURITY_INST    luci.model.speed_test    SPEED_TEST_INST    luci.model.app_timesetting    luci.controller.admin.reboot    luci.model.tm_clientmgmt    cursor    cursor_state    cloud_req.cloud_https    Mon 	      Tues 	      Wed 	      Thur 	      Fri 	      Sat 	      Sun 	      _print_tbl    remove_offline_client_v2    tmp_get_client_list_v2    tmp_set_client_info_v2    tmp_set_client_v2    tmp_get_clients_speed    tmp_get_speed_bymac    tmp_get_owners_list    tmp_insert_owners    tmp_remove_owners    tmp_get_filters    tmp_set_filters    tmp_get_default_filters    tmp_modify_owner    tmp_get_clients_list    tmp_set_clients_list    tmp_del_clients_list    l_tmp_get_insights    tmp_get_website    tmp_set_website    tmp_expired_info_get    tmp_pay_firmware_check 
   tmp_tm_pc    get_ownerlist    cb 
   add_owner 
   del_owner    get_timelimit    set_timelimit    get_filter    set_filter    edit_owner    get_clientlist    add_clientlist    del_clientlist    get_insights    get_history    clear_history    block_website    get_defaultfilter    tmp_tm_qos    get_qos    set_qos    get_qos_v2    set_qos_enable    set_qos_bandwidth    get_devlist    set_devinfo    get_devspeed    get_devinfo    remove_dev_v2    tmp_tm_sec    get_sec    set_sec    get_log 
   clear_log 	   get_file    tmp_speed_test    start_test    get_result    tmp_sync_time    update_dst    tmp_timing_reboot    get    set    tmp_client_v2    getClientListV2    setClientV2    tmp_get_speed    getClientSpeedList    getClientSpeedbyMac    tmp_owner_list    getOwnerList    insert    remove    tmp_time_op    getTimelimit    setTimelimit    tmp_filter_op 
   getFilter 
   setFilter    getdeffilter    tmp_owner_op    modifyowner    tmp_client_list_op    getClientList    setClientList    delClientList    tmp_history_op    getinsights    gethistory    clearhistory    tmp_website_op    blockWebsiteByid    getWebsiteByid    setWebsiteByid    tmp_homecare_transitionB    expired_info_get    pay_firmware_check    tmp_server_dispatch    tmp_server_index    index E       "   +       A      b @À A     b    Á@Û  AB  b ×A¢A   À ¢ @@  À ¢A ^   û#        type    table    pairs    print     =  	   tostring    _print_tbl                     -   0        @       I      c #        invalid args                     2   <           Û  ¢ [  @  Û   ¢     c   þ#     	   tonumber    pairs                     @   G       @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_get_owner_list                     I   P       @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_insert_owner                     R   Y       @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_remove_owner                     [   b       @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_get_time_limit                     d   k       @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_set_time_limit                     m   t       @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_get_filter                     v   }       @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_set_filter                               @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_edit_owner                               @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_get_client_list                               @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_add_client_list                        ¡       @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_del_client_list                     £   ª       @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_get_insights                     ¬   ³       @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_get_history                     µ   ¼       @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_clear_history                     ¾   Å       @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_block_website                     Ç   Î       @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_get_default_filter                     Ó   Ú       @  J   @ À @  b@ J  d  c   J  FÀ d  c   #        print    invalid_args    tmp_get_mode                     Ü   ã       @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_set_mode                     å   ì       @  J   @ À @  b@ J  d  c   J  FÀ d  c   #        print    invalid_args    tmp_get_mode_v2                     î   õ       @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_set_qos_enable_mode                     ÷   þ       @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_set_bandwidth                              @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_get_dev_list                     	        @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_set_dev_info                             @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_get_dev_speed                       "      @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_get_dev_info                     $  +      @  J   @ À @  b@ J  d  c   A  À  b @ Á    d  c   #        print    invalid_args    require    luci.model.client_mgmt    remove_offline_client_v2                     0  7      @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_get_info                     9  @      @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_set_info                     B  I      @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_get_history                     K  R      @  J   @ À @  b@ J  d  c   J  FÀ d  c   #        print    invalid_args    clear_history                     T  [      @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    get_db_file                     _  k      @  J   @ À @  b@ J  d  c   J  FÀ b@ E      Á  À@ÁÀÁ â DÀc  #        print    invalid_args 
   start_spt    result    luci    json    encode                     m  w      @  J   @ À @  b@ J  d  c   E     @¢ Á  À@ÁÀÁ â DÀc  #        print    invalid_args    get_spt_result    result    luci    json    encode                     y        @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_get_speedtest_history                             @  J   @ À @  b@ J  d  c   J  FÀ b@ E      Á  À@ÁÀÁ â DÀc  #        print    invalid_args    clear_spt_history    result    luci    json    encode                             @  J   @ À @  b@ J  d  c   A  À   A@AÀA ¢  b    ÀAÛ   ¤ £   #  	      print    invalid_args 	   tostring    luci    json    decode    data    ts_update_dst    tether                       »   
O   @  J   @ À @  b@ J  d  c   E      Ê  ÀÀâ  ÁÀ A@ @Á  ÁÁ  B@AÂ "Á Û ¢ ACÁ â Á  ÁÃ D CÄ ÁÃÀD CÅÄ   CÁ 
@Ä Bâ Á ÁÃE@CÁÅÄ   CÁ  Äâ ÁA FÁFÛ ¢ Dc  #        print    invalid_args    get_auto_reboot    enable    on     string    match    time    (%d+):(%d+)    reboot_time 	   tonumber 	<      repeat_rule    cycle    day    mode 
   every_day    week    every_week    mode_detail    month    every_month    result    luci    json    encode                     ½  î   t       @ @ Y@  J   @@À   b@ J  d  c   AÀ  @ Á @@Á  @ b Y@  À Û  ¢ MÀA   @@È  ¢@ @  Â£     À  Ã @C À C@ À ÀC  @DÀÄ ÎÀÄ¢  E È@   ÀÄ ÒÀÄ Å A [×@Á [ Á ÛWÁA Æ  AFF Á ÇÀ Æ  AF@G@Á Ç Æ  ÁG  @Á J ÀÆ ÀÁÇbA@ Æ  AF H@Á AÈ Æ  ÁG  À Á @Æ @ÁÇA  J @ÈÁ b Á  AIÛ¢ # #  %      data    print    invalid_args    luci    json    decode    type    table    invalid data 
   errorcode    invalid new params    form    enable    on    off    math    floor    reboot_time 	<   	
   	       time    :    repeat_rule    mode 
   every_day    cycle    day    every_week    week    mode_detail    every_month    month    set_auto_reboot    result    encode                     õ  ý      @   J   d  c   J  F À b@ J  F@À Û   d c   #        update_device_status    tmp_get_dev_list                     ÿ        @   J   d  c   J  F À Û   d c   #        tmp_set_clientV2                             @   J   d  c   J  F À Û   d c   #        tmp_set_dev_speed                             @   J   d  c   J  F À Û   d c   #        tmp_get_dev_speed                             @   J   d  c   J  F À Û   d c   #        tmp_get_dev_info                       %      @   J   d  c   J  F À Û   d c   #        tmp_get_owner_list                     '  -      @   J   d  c   J  F À Û   d c   #        tmp_insert_owner                     /  5      @   J   d  c   J  F À Û   d c   #        tmp_remove_owner                     7  :      J   F À Û   d c   #        tmp_get_filter                     <  ?      J   F À Û   d c   #        tmp_set_filter                     A  D      J   F À Û   d c   #        tmp_get_default_filter                     F  I      J   F À Û   d c   #        tmp_get_time_limit                     K  N      J   F À Û   d c   #        tmp_set_time_limit                     P  S      J   F À Û   d c   #        tmp_edit_owner                     U  X      J   F À Û   d c   #        tmp_get_client_list                     Z  ]      J   F À Û   d c   #        tmp_add_client_list                     _  b      J   F À Û   d c   #        tmp_del_client_list                     d  g      J   F À Û   d c   #        tmp_get_insights                     i  l      J   F À Û   d c   #        tmp_get_history                     n  q      J   F À Û   d c   #        tmp_clear_history                     s  v      J   F À Û   d c   #        tmp_block_website                     x  {      J   F À Û   d c   #        tmp_get_website                     }        J   F À Û   d c   #        tmp_set_website                       ¬   M   E      È   	  J  FAÀÈ  Â  H b@Á@ 	  Á@ 	  A@  HÂ  ¢@B@ 	    	   A@  HÂ   ¢A    Á ÀBÀÀ    ÁA ÀÃÂ âA Á B â ÀÄâ Ã  Ê  ÆAÀH  Â  È âA  Á ÑÀÄ@ùÁ  â  À  BF F[ " D c  #     	       get 	   homecare    tm_transitionB    inFreeTrial    yes    no    tm_homecare    enable    on    trialExpiredTimeStamp    0 	      os    execute    sleep 1    require    luci.model.uci    cursor_state 	   	   tonumber 
   isExpired    expiredTimeStamp    result    luci    json    encode                     ®  Ñ   ;   E      É   
   @HA  "Á @ Á  Û¢ M A@ AAÈ ¢A  Á Á  Û¢ M A@   [ ÂM@B ÂMB@ AAÈÁ ¢A  Á Á   @ É   @Â@B@ É    É   À  ÁCDÛ ¢ Dc  #     #   get_homecareTransition_payFirmware 	   	       type    table    print    tmp_data error... 	   hasError    hasFirmware     tmp_data.hasFirmware error...    hasPayFirmware    result    luci    json    encode                     5  7      J   @ À   Û   d c   #     	   dispatch                     9  ;       
     @ A@  $  #   #        _index    tmp_server_dispatch                     =  ?           E  @  È  _@ À  È  ¢  "  Á#        entry    admin    tmp_server    call    tmp_server_index    leaf                             