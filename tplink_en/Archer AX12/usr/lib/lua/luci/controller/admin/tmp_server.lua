LuaQ               BT     H@    À@"@  H@ " A   b   ÈÀ ¢ Á   â  HA " A  b  ÈÁ ¢ C¢ Á B â ÀÃâ  HÂ "  D" A B b @Äb  ÈÂ ¢ Á  â  HC " A  b @Åb  È ¢ ÃE¢ Á  â Ä ÆÇÇÈÈÉÉa    BÄ	 aD  ¡  áÄ       !      aE      ¡      áÅ      !      aF      ¡      áÆ      !      aG      ¡      áÇ      !      aH      ¡      áÈ     !	     aI     ¡     áÉ     !
     aJ     ¡     áÊ     !      aK      ¡      áË      !      aL     ¡     áÌ     !	     aM	     ¡	     áÍ	     !
     aN
     ¡
     áÎ
      !       aO      	   ¡   
 ¡Ï    O
 ¡   
 ¡O   Ï
 ¡    ¡Ï    O ¡     ¡O    Ï ¡    ¡Ï   O ¡    ¡E   á   ¡Ï   Ï ¡    ¡O   O ¡    ¡Ï   Ï á   !H   a   ¡Ï    ¡   O ¡O     ¡    Ï  Å P  ÐÄP  ÄP  PÄ P  Ä P  ÐÄ¡P  Ä¡P  PÄ¢P  Ä¢P  ÐÄ£P  Ä£P  PÄ¤P  Ä¤P  ÐÄ¥P  Ä¥P  PÄ¦P  Ä¦ÏÅO P  ÐÄ§P  	Ä¨P  P	Ä¨P  	Ä©P  Ð	Ä©P  
ÄªP  P
ÄªP  
Ä«P  Ð
Ä«Ï§ÅO P  Ä¬P  PÄ­P  Ä­P  ÐÄ®P  Ä®Ï¬Å P  PÄ¯P  Ä°P  ÐÄ°P  PÄ±P  Ä±P  PÄ²P  Ä²P  Ä¥P  ÐÄ³P  Ä¥Ï¯ÅO  P  ÐÄ´Ï³Å  P  ÄµP  PÄµÏ´Å  P  A
 PÄ¶P  AP
 PÄ·Ï¶Å  P  AÐ
 PÄ¸P  A PÄ¸Ï·ÅÏ  P  AP PÄ¹P  A PÄºP  AÐ PÄºÏ¹Å  P  Ä»P  ÐÄ¼Ï»ÅÏ  P  A PÄ½P  AP PÄ½P  A PÄ¾Ï¼ÅO  P  AÐ PÄ¿Ï¾ÅÏ  P  A PÄÀP  AP PÄÀP  A PÄÁÏ¿ÅÏ  P  AÐ PÄÂP  ÐÄÂP  ÄÃÏÁÅÏ  P  PÄÄP  A PÄÄP  AP PÄÅÏÃÅ  P  A PÄÆP  AÐ PÄÆÏÅáÏ    Â# á  ÂÏ# áO Â$ #        module !   luci.controller.admin.tmp_server    package    seeall    require    nixio    luci.model.uci 
   luci.util 	   luci.sys    luci.tools.debug    luci.model.controller    luci.model.parental_control 
   Parentctl    luci.model.qos 	   QOS_INST    luci.model.security    SECURITY_INST    luci.model.speed_test    SPEED_TEST_INST    luci.model.app_timesetting    luci.controller.admin.reboot    luci.model.tm_clientmgmt    cursor    cursor_state    cloud_req.cloud_https    Mon 	      Tues 	      Wed 	      Thur 	      Fri 	      Sat 	      Sun 	      _print_tbl    tmp_get_client_list_v2    tmp_set_client_info_v2    tmp_set_client_v2    tmp_get_clients_speed    tmp_get_speed_bymac    tmp_get_owners_list    tmp_insert_owners    tmp_remove_owners    tmp_get_filters    tmp_set_filters    tmp_get_default_filters    tmp_modify_owner    tmp_get_clients_list    tmp_set_clients_list    tmp_del_clients_list    l_tmp_get_insights    tmp_get_website    tmp_set_website    tmp_expired_info_get    tmp_pay_firmware_check 
   tmp_tm_pc    get_ownerlist    cb 
   add_owner 
   del_owner    get_timelimit    set_timelimit    get_filter    set_filter    edit_owner    get_clientlist    add_clientlist    del_clientlist    get_insights    get_history    clear_history    block_website    get_defaultfilter    tmp_tm_qos    get_qos    set_qos    get_qos_v2    set_qos_enable    set_qos_bandwidth    get_devlist    set_devinfo    get_devspeed    get_devinfo    tmp_tm_sec    get_sec    set_sec    get_log 
   clear_log 	   get_file    tmp_speed_test    start_test    start_test_v2 
   stop_test    get_servers    get_result    get_result_v2    get_summary_v2    get_history_v2    tmp_sync_time    update_dst    tmp_timing_reboot    get    set    tmp_client_v2    getClientListV2    setClientV2    tmp_get_speed    getClientSpeedList    getClientSpeedbyMac    tmp_owner_list    getOwnerList    insert    remove    tmp_time_op    getTimelimit    setTimelimit    tmp_filter_op 
   getFilter 
   setFilter    getdeffilter    tmp_owner_op    modifyowner    tmp_client_list_op    getClientList    setClientList    delClientList    tmp_history_op    getinsights    gethistory    clearhistory    tmp_website_op    blockWebsiteByid    getWebsiteByid    setWebsiteByid    tmp_homecare_transitionB    expired_info_get    pay_firmware_check    tmp_server_dispatch    tmp_server_index    index J       "   +       A      b @À A     b    Á@Û  AB  b ×A¢A   À ¢ @@  À ¢A ^   û#        type    table    pairs    print     =  	   tostring    _print_tbl                     -   0        @       I      c #        invalid args                     2   <           Û  ¢ [  @  Û   ¢     c   þ#     	   tonumber    pairs                     @   G       @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_get_owner_list                     I   P       @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_insert_owner                     R   Y       @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_remove_owner                     [   b       @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_get_time_limit                     d   k       @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_set_time_limit                     m   t       @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_get_filter                     v   }       @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_set_filter                               @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_edit_owner                               @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_get_client_list                               @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_add_client_list                        ¡       @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_del_client_list                     £   ª       @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_get_insights                     ¬   ³       @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_get_history                     µ   ¼       @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_clear_history                     ¾   Å       @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_block_website                     Ç   Î       @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_get_default_filter                     Ó   Ú       @  J   @ À @  b@ J  d  c   J  FÀ d  c   #        print    invalid_args    tmp_get_mode                     Ü   ã       @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_set_mode                     å   ì       @  J   @ À @  b@ J  d  c   J  FÀ d  c   #        print    invalid_args    tmp_get_mode_v2                     î   õ       @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_set_qos_enable_mode                     ÷   þ       @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_set_bandwidth                              @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_get_dev_list                     	        @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_set_dev_info                             @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_get_dev_speed                       "      @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_get_dev_info                     '  .      @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_get_info                     0  7      @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_set_info                     9  @      @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_get_history                     B  I      @  J   @ À @  b@ J  d  c   J  FÀ d  c   #        print    invalid_args    clear_history                     K  R      @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    get_db_file                     V  d      @  J   @ À @  b@ J  d  c   A  @ÀÀ @ Á @A b  Ê  ÆÀÁ[  â@ Å     A  @ÁÀ@AÂ b Ä@ã  #  
      print    invalid_args    luci    json    decode    data 
   tether_v1 
   start_spt    result    encode                     f  t      @  J   @ À @  b@ J  d  c   A  @ÀÀ @ Á @A b  Ê  ÆÀÁ[  â@ Å     A  @ÁÀ@AÂ b Ä@ã  #  
      print    invalid_args    luci    json    decode    data 
   tether_v2 
   start_spt    result    encode                     v        @  J   @ À @  b@ J  d  c   J  FÀ ÁÀ  b@E      Á@ ÀÁÀÀÁ â DÀ c  #        print    invalid_args 	   stop_spt    data    result    luci    json    encode                             @  J   @ À @  b@ J  d  c   E     @¢ Á  À@ÁÀÁ â DÀc  #        print    invalid_args    get_spt_result    result    luci    json    encode                             @  J   @ À @  b@ J  d  c   E     @¢ Á  À@ÁÀÁ â DÀc  #        print    invalid_args    get_spt_result_v2    result    luci    json    encode                       £      @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_get_speedtest_history                     ¥  ¬      @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_get_speedtest_history_v2                     ®  µ      @  J   @ À @  b@ J  d  c   J  FÀ d  c   #        print    invalid_args    tmp_get_speedtest_summary_v2                     ·  ¾      @  J   @ À @  b@ J  d  c   J  FÀ Û   d c   #        print    invalid_args    tmp_get_spt_servers                     À  Ì      @  J   @ À @  b@ J  d  c   J  FÀ b@ E      Á  À@ÁÀÁ â DÀc  #        print    invalid_args    clear_spt_history    result    luci    json    encode                     Î  Ö      @  J   @ À @  b@ J  d  c   A  À   A@AÀA ¢  b    ÀAÛ   ¤ £   #  	      print    invalid_args 	   tostring    luci    json    decode    data    ts_update_dst    tether                     Ø  ù   
O   @  J   @ À @  b@ J  d  c   E      Ê  ÀÀâ  ÁÀ A@ @Á  ÁÁ  B@AÂ "Á Û ¢ ACÁ â Á  ÁÃ D CÄ ÁÃÀD CÅÄ   CÁ 
@Ä Bâ Á ÁÃE@CÁÅÄ   CÁ  Äâ ÁA FÁFÛ ¢ Dc  #        print    invalid_args    get_auto_reboot    enable    on     string    match    time    (%d+):(%d+)    reboot_time 	   tonumber 	<      repeat_rule    cycle    day    mode 
   every_day    week    every_week    mode_detail    month    every_month    result    luci    json    encode                     û  ,   t       @ @ Y@  J   @@À   b@ J  d  c   AÀ  @ Á @@Á  @ b Y@  À Û  ¢ MÀA   @@È  ¢@ @  Â£     À  Ã @C À C@ À ÀC  @DÀÄ ÎÀÄ¢  E È@   ÀÄ ÒÀÄ Å A [×@Á [ Á ÛWÁA Æ  AFF Á ÇÀ Æ  AF@G@Á Ç Æ  ÁG  @Á J ÀÆ ÀÁÇbA@ Æ  AF H@Á AÈ Æ  ÁG  À Á @Æ @ÁÇA  J @ÈÁ b Á  AIÛ¢ # #  %      data    print    invalid_args    luci    json    decode    type    table    invalid data 
   errorcode    invalid new params    form    enable    on    off    math    floor    reboot_time 	<   	
   	       time    :    repeat_rule    mode 
   every_day    cycle    day    every_week    week    mode_detail    every_month    month    set_auto_reboot    result    encode                     3  ;      @   J   d  c   J  F À b@ J  F@À Û   d c   #        update_device_status    tmp_get_dev_list                     =  C      @   J   d  c   J  F À Û   d c   #        tmp_set_clientV2                     E  K      @   J   d  c   J  F À Û   d c   #        tmp_set_dev_speed                     M  S      @   J   d  c   J  F À Û   d c   #        tmp_get_dev_speed                     U  [      @   J   d  c   J  F À Û   d c   #        tmp_get_dev_info                     ]  c      @   J   d  c   J  F À Û   d c   #        tmp_get_owner_list                     e  k      @   J   d  c   J  F À Û   d c   #        tmp_insert_owner                     m  s      @   J   d  c   J  F À Û   d c   #        tmp_remove_owner                     u  x      J   F À Û   d c   #        tmp_get_filter                     z  }      J   F À Û   d c   #        tmp_set_filter                             J   F À Û   d c   #        tmp_get_default_filter                             J   F À Û   d c   #        tmp_get_time_limit                             J   F À Û   d c   #        tmp_set_time_limit                             J   F À Û   d c   #        tmp_edit_owner                             J   F À Û   d c   #        tmp_get_client_list                             J   F À Û   d c   #        tmp_add_client_list                              J   F À Û   d c   #        tmp_del_client_list                     ¢  ¥      J   F À Û   d c   #        tmp_get_insights                     §  ª      J   F À Û   d c   #        tmp_get_history                     ¬  ¯      J   F À Û   d c   #        tmp_clear_history                     ±  ´      J   F À Û   d c   #        tmp_block_website                     ¶  ¹      J   F À Û   d c   #        tmp_get_website                     »  ¿      J   F À Û   d c   #        tmp_set_website                     Á  ê   M   E      È   	  J  FAÀÈ  Â  H b@Á@ 	  Á@ 	  A@  HÂ  ¢@B@ 	    	   A@  HÂ   ¢A    Á ÀBÀÀ    ÁA ÀÃÂ âA Á B â ÀÄâ Ã  Ê  ÆAÀH  Â  È âA  Á ÑÀÄ@ùÁ  â  À  BF F[ " D c  #     	       get 	   homecare    tm_transitionB    inFreeTrial    yes    no    tm_homecare    enable    on    trialExpiredTimeStamp    0 	      os    execute    sleep 1    require    luci.model.uci    cursor_state 	   	   tonumber 
   isExpired    expiredTimeStamp    result    luci    json    encode                     ì     ;   E      É   
   @HA  "Á @ Á  Û¢ M A@ AAÈ ¢A  Á Á  Û¢ M A@   [ ÂM@B ÂMB@ AAÈÁ ¢A  Á Á   @ É   @Â@B@ É    É   À  ÁCDÛ ¢ Dc  #     #   get_homecareTransition_payFirmware 	   	       type    table    print    tmp_data error... 	   hasError    hasFirmware     tmp_data.hasFirmware error...    hasPayFirmware    result    luci    json    encode                     x  z      J   @ À   Û   d c   #     	   dispatch                     |  ~       
     @ A@  $  #   #        _index    tmp_server_dispatch                                  E  @  È  _@ À  È  ¢  "  Á#        entry    admin    tmp_server    call    tmp_server_index    leaf                             