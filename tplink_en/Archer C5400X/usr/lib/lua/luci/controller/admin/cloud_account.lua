LuaQ               b     H@    À@"@  H@ " A   b   ÈÀ ¢ Á   â  HA " A  b  ÈÁ ¢ C¢ Á B â  H " A Â b  È ¢ Á C â ÀÄÃ â  HC  È ÃÛ Ä × H D[ D W È Ä	Û Å ×	 H E
HE  ÈÅ !   aF    B a       	 BF aÆ     
   B a   BÆ aF      
   B	 a BF	 aÆ     	   B	 a      BÆ	 aF    B
 a   BF
 aÆ  B
 a      BÆ
 aF      B a    BF aÆ     
B a     
  BÆ aF      B a      BF aÆ    
    B a         BÆ aF B a    
BF aÆ   B a   BÆ aF   B a BF aÆ       B a   BÆ H F áF   Â á          ÂÆ áÆ         Â á   ÂF Å G  EG   D¡G¡ÄG  EG  G D¡G¡ÄG  EG  Ç D¡G¡ÄÇ  EG   D¡G¢EG  Ç D¡G¡EG   D¡G£Ä¢G  EG   D¡G¡ÄG  EG  G D¡G¡ÄG  EG   D¡G¡ÄG  EG   D¡G¡ÄG  EG  Ç D¡G£Ä  EG  G	 D¡G¡EG  
 D¡G£ÄG  EG   D¡G£ÄG  EG  	 D¡G¡ÄG  EG  	 D¡G¡Ä¤G  EG  Ç	 D¡G¡Ä EG   D¡G¥EG  G D¡G¥EG   D¡G¦EG  Ç D¡G¦EG   D¡G§EG  G D¡G§Ä¤G  EG  G D¡G£Ä!G     !   G !Ç  #  S      module $   luci.controller.admin.cloud_account    package    seeall    require    nixio 	   luci.sys    luci.tools.debug    io    luci.model.controller    cloud_req.cloud_comm    luci.model.uci    cursor    luci.sys.config    luci.model.accountmgnt    cloud_req.cloud_account 
   luci.json    luci.model.asycrypto    Crypto    rsa    /tmp/cloud/    /tmp/cloud_up.bin    last_download_url    cloud_dl.pid    cloud_dl.head    cloud_fw.length    illegal    cloud_token    login_status    cloud_config    cloud_status &   /usr/lib/lua/luci/model/tpFileVer.lua    check_internet    check_device    check_connection    check_cloud_connection    check_login 
   read_keys    get_device_token    get_deviceInfo    user_login    cloud_check_tpfile_support    cloud_upload_feature    cloud_bind_and_login    cloud_unbind    modify_cloud_pwd    load_fw_list    get_fw_list    get_download_status    get_download_progress    cloud_fw_upgrade    get_download_detail    detect_upgrade_status    check_upgrade    check_cloud_version    set_show_flag    tmp_bind_owner    tmp_unbind_owner    tmp_get_dev_info    tmp_set_dev_info    /tmp/cloud_data_cache/ 	Ð     save_cache    read_cache    tmp_cloud_pass_through    tmp_get_devID    read    cb    cloud_upgrade    load    upgrade    write 
   get_token    tmp_cmd    bind_owner    unbind_owner    get_dev_info    set_dev_info    cloud_pass_through 
   get_devID 	   dispatch    _index    index $          +           @@J   @À    ÈÀ   bÀ M@Á @ È ã  ÈÀ ã  #        method    a    send_request_sync 	Ð  	   	       offline    online                     -   9        	   A   @  b À ¢ ÆÀ@H â@Ê   À@Á â MÀÁ@ 	     	  Æ Bâ@ #  #  	      require    socket    tcp    settimeout 	è     call    online-test 	       close                     ;   M        
     @  @@ J  " @  @ 	  #    E     À@Ê   ¢   ÀÆ@AH âÙ      ÁA"A É     [ ã  #        fs    access    1    open    r    read    *line    close                     O   e     (   J   F À Ê  A  H  bÀÀ    ¢  A É  ã  @ É   ã   @AÅ   ß@ ÒÀ ¢    @ÆÀAH â Æ@Bâ@ B  É  ã  @ É   ã  #        get    upgrade_info    download_url     online    popen M   curl -s --head -g '%s' --connect-timeout 3 | grep -w HTTP | awk '{print $2}'    read    *line    close    200                     g   n     
   
   "  @  I  c  @ I   c  #        online                     p        	+      G     @@@Ê  ¢    À  À@Ê   ¢[  @Á  ¢  ÀÁ ¢@   Û   ¢ @B   ÀBÁ@ ÀÃ
ÁC ÈA  "â  À £  @  D£  #        0    fs    access    open    r    read    *line    close 	   tonumber 	   
   islogined 	   username    string    lower    get    cloud_config    login                                 A   @  b @À À  b  Á ¢ Å   AA@Aß@   ÂÁ# #  
      require    luci.model.asycrypto    Crypto    rsa    read_pubkey    n    e 	   username     	   password                             *      H     Ê   À@ÀÀÀ
 â Ù@  À Ê  ÀÀÀ â@ Ê   À@ÀÀÀ
 â Ù   ÀÊ À@Á
 H â ÆÀAH â ÆÀAH â[ Æ@Bâ@ Å  Ä  Ä@ã  #            fs    access    call    cloud_getDevToken    open    r    read    *line    close    token    origin_url                        °     	;      J   F À È@    HÁ  bY@    H    @AÈ ¢ ÁÀ â  Â@B  A   Á [ "  
  AAH "   Â@B  A     ÁÃ 
  ADJ @AÁ b "   
  @A  È Â "A      #  #        get    cloud_config    login    role    0    exec    getfirm MODEL    check_login 
   islogined  	    	   tonumber    model    cloudUserName     	   username    mac    TrimStr    getfirm MAC    alias    info                     ²   Æ    
*   @ @ @@ MÀ @ @ Ê   ÀÀÀ â@ É   	  EA  DÁã  Ê  ÀÀÁ â  @  @ É   ã  Á   [ âÀ@ÂÀI    ÅA   [ " Äc [ c#     	   username 	   password     print )   [user login] username or passwor is nil. 
   errorcode    -20107    decrypt    cloud_bind_and_login  	   tostring                     É   Î        
    @ @  È  Á  "   @ M A  I   @ I@  I  c  #        get    profile    tpfile_diff    tpfile_support    yes                     Ñ   ç     &      E      Á@  â Ù   Á  ÀÀÀÀ Á
  â Ù   ÀÁÁÀ  â  Â"    ÀÂD ÁÀ A â  Ã[ "   Á [  "  @Àÿ#  #     	       cloud_check_tpfile_support    luci    fs    access    enable    require    luci.model.tpFileVer 	   comp_ver    getTpFileVer     tpfile_data    cloud_req.device_manage    save_deviceFeatureInfo 	   tonumber                     é         Ê   Æ ÀHA    ÈÁ  â [" M@A 
  A[   "   [ " MÀA 	  [ # "    [ " MÀA 	  [ #
  AB[   "  
  B" A  b ÀÂÀ  @A  b @Ã @AAYA    [    CB  H  Â  ÈÂ ¢A   DB  ¢A  AD HÂ ¢A   D ¢A AÛ   ¢   Û ¢ MÀA   Û £ ¢    Û ¢ MÀA   Û £ ABÛ   ¢  A  b MÀÁÀ I   cÀ I A   c#        get    cloud_config    device_status    bind_status 	   tonumber 	      bind_device 	       cloud_upload_feature    account_login    get_cloud_username 	¯ÿÿ   type    table    set    0    commit    delete_all    accountmgnt    cloud_account 	   username                       <    
A       @A  H  Á  ¢Ê   Æ ÀHA    È â
  AA" A  @I    ÅA  ÄÁAc  A  b @Â @BZ@  [  ÀBJ @Ã Ûb AA  b ÁÃÛ ¢   A   b M@Ä I    ÅA   [  " Äc @ I c #        get    cloud_config    login    role 	   username    get_cloud_username 
   errorcode    -10000    type    table 	      1    remove_deviceUser    require    cloud_req.device_manage    unbind_deviceWithFeatureInfo 	   tonumber 	    	   tostring                     >  O   '   @ @    @@Û  ¢ [  Y@  @    £    Ê  ÀÀâ Ù@  @	  I  A  Á#  A [" A  ÁÁ@    
  B[  "A	 # #  	   	   password    decrypt    get_cloud_username 
   errorcode    -10000    type    table 	      set_cloudAccount                     Q  g    
:   
     @ H@  " E  D  D ÁDÁD Â@ BÛ   Á ¢À
 C ÈA  "  @D J FÃÊ B HÂ bYA    H D@D ÂAA @Â ÈÁ bÁÁ â  [ "  ÀÁ  â  [" M   DÁc  #        getsysinfo    SOFTVERSION    latest_version    detail        latest_flag 
   note_flag     string    match    (%d+)%.(%d+)%.    get    upgrade_info    version    release_log 	   tonumber                     i      >   
     @ H@  " EÀ  D  D ÁDÁ  ÀA
 H A ¢    D Ê  ÆÀÁJ  È âÙ@    È  DÀDÀÂÊ À ÃA â@ Á Á â À Äâ Ã  Ê  ÆÀÁJ  ÈA â    ÀD Ê  ÆÀÁJ  È âÙ@    È  DÀDÀÂc  #        getsysinfo    SOFTVERSION    latest_version    detail        latest_flag    get    upgrade_info    version    release_log     call    cloud_getFwList    require    luci.model.uci    cursor                           %       @@@Ê  ¢      @Ê  Á  ¢[   Á A ¢  Á ¢@     @@@Å    ß@ ÒÀ¢       £  @    £     £  #        fs    access    open    r    read    *line    close    /proc/%s/status                       §   ,   H      È    J  @AÀ@À b Y  J @ÁÀ È bFAAÈ b FÁAbA J  @AÀ@À  b Y  ÀJ  @AÀ@Â  b @@ÂA @ÁÂÃ  b Û ã  #     	       fs    access    open    r    read    *line    close    stat    size    math    floor 	d                       ©  ¶       
    @   È@    "À@  I     c J  @@Á    b   J @Á   Û   
 @ b@ I  c  #        get    upgrade_info    download_url     illegel download url    downloadurl_escape 
   fork_exec    cloud_download "%s" "%s"                     ¸  Ï   ;      ¢ Á@  
  â 
  @HÁ   "A
  @H "A@A [" ÀA@H  	  [ A  Á #  ["  À   @
  AB BJ  "    
  @HÁ "A 
 CHA "A @ 	  # H   Á A# #        get_download_status    get_download_progress    print    status    percent  	   tonumber 	d      -20701    fs    access    begin upgrade firmware... 
   fork_exec    sleep 1;/sbin/cloudupgrade    0 	   err_code                     Ñ  Ó           I  $  #   #        get_download_detail                     Õ  Ý       
    @   È@    "À@  E@  D@Ac  E@  D  c  #        get    new_firmware    fw_new_notify     update_number    0                     ß  î       J   F À È@    HÁ  b    @A  H   ¢@A@ @  Á @   ÀÁ @ À   @ Å@  Ä  ã  #  	      get    cloud_config    info    tcsp_status 
   show_flag    1    2    3    type                     ð  ô       
    @ @  È  Á  H "@ 
   @A @  "@	  #  #        set    cloud_config    info 
   show_flag    1    commit                     ø     '   A   @  b    @ÈÀ   A × ¢@    @È@  A × ¢@ ÀÁ À A  A ¢Á   â M@Â@ É   ã  Á â  Á   â M@Â@ É   ã  É  ã  #        require    cloud_req.cloud_account    print    bind_owner email :    email    bind_owner pwd :    pwd    bind_device 	   tonumber 	       cloud_upload_feature                       !       H   @  È  ¢ ÀÀ@ â [ Á@  â  À@ É  ã  É   ã  #     	       require    cloud_req.device_manage    unbind_deviceWithFeatureInfo 	   ownerAcc 	   tonumber                     #  4   
8   A   @  b    È  ¢ Á   Á  â   @AÁ   AÈÁ ¢ b  AJ b A@ÂÁ b YA    H AJ FÃÈÁ  HB bYA    H A@Ä b @ÁÄA@AÁ   AÈA ¢ b  A@ÁEb YA    H A# #        require    cloud_req.cloud_comm    luci.model.accountmgnt    luci.sys.config 	   deviceId    TrimStr    exec    getfirm DEV_ID    status    deviceName    getsysinfo    device_name        alias    get    cloud_config    info    deviceModel    get_device_model_ver    device_model 
   deviceMac    getfirm MAC    ownerAccount    get_last_cloud_account                     6  G   	   A   @  b    È  ¢ Á   Á  â   H " E  AA    ÀA âA Ê  ÀÁÁ âA É ã #  	      require    cloud_req.cloud_comm    luci.model.accountmgnt    luci.sys.config    cloud_req.cloud_account    alias    update_alias    print    tmp_set_dev_info                      N  S         Û   À Ê  À À HA  âÀ "AÁÀ"A #        open    w    write    close                     U  n   B    À Ê     × 
  A@[  "FÁ@È b AAAÛ¢ A  @   £   ÆÁAâA ABÁÁ ÀÃâ ÐAÃ
ÎÁÁÁ ÀÁÃJOBQBÃBCÊÂâ ÁÀÄ ÁÀÀ ÁÁÁ ÀÃ Câ @Â@ É  ã Ê ÀAÄ AÂ @b BâA £ #        currentSerialNumber    open    r    read    *a    fs    access    close    startSerialNumber 	       endSerialNumber    string    len 	   	   response    sub    method    print    read_cache2  	   tostring                     p     <   A   @  b    @À@Ê  ¢ @  @   AÈ@ 
 × ¢@  ÀÀA ¢ M B @ ÀB   ¤ £      À À ÀB À À Ê À@Ã C â À Ã ÁÀ Á H ¢À M@D@ 	  #  @B ÁDÛ¢ "A  @ÄA @B   $#  #        require    cloud_req.cloud_comm    fs    access    call    mkdir  	   tonumber    currentSerialNumber 	ÿÿÿÿ   read_cache    method    req    params    decode    send_request_sync 	  	   	       save_cache    encode                             A   @  b    È  ¢ Á   Á  â   @AÁ   AÈÁ ¢ b  A# #        require    cloud_req.cloud_comm    luci.model.accountmgnt    luci.sys.config 	   deviceId    TrimStr    exec    getfirm DEV_ID                     Ï  Ñ      J   @ À   Û   d c   #     	   dispatch                     Ó  Õ       
     @ A@  $  #   #        _index 	   dispatch                     ×  Ù           E  @  È  _@ À  È  ¢  "  Á#        entry    admin    cloud_account    call    _index    leaf                             