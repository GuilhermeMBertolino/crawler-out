LuaQ               A     H@    À@"@  H@ " A   b ÀÁ ¢ Á   â  HA " A  b  ÈÁ ¢ Á  â  HB " H Â È C H Ã È D H Ä È E H 
ÈÅ ÅÛ
 ×F H Æ È G H Ç È	 H	 H	  ÈÈ	 		Û 	
 [	×H	 HI
 		[	 
 Û	WÉ	 ÈÉ
 
	
Û	 
 [
×I
 HJ 

[
  Û
WÊ
 ÈÊ 
Û
  [×J HK [  ÛWË ÈË Û  [×KL H Ì È M H Í È !  aN      BN a           B aÎ          BÎ a        B aN    BN a    B aÎ   	        BÎ a    B aN   BN a    B aÎ   BÎ a   B aN            ¡              áÎ                ÂN á   
!O             a      ¡Ï     á   Â áO      ÂÏ á Â áÏ                     ÂO á   Â áO      ÂÏ á      Â áÏ           ÂO á   Â áO      ÂÏ á       Â áÏ       ÂO á   Â áO   ÂÏ á   Â áÏ   ÂO á	   Â áO	   ÂÏ á	 Â áÏ	         ÂO á
          Â áO
                 ÂÏ á
   Â áÏ
      ÂO ÅO P Ä ÄÐ Ä ÄP ÄÂ á     ÂÏ áO                 Â á          	 	ÂO áÏ           Â á                ÂÏ áO           Â á        ÂO áÏ       Â á   ÂÏ #  l      module $   luci.model.offline_download_monitor    package    seeall    require    luci.fs    luci.model.uci    cursor    ubus    luci.tools.debug 	   luci.sys    nixio    bit    luci.model.offline_download 	    	   	      /tmp/offline_download    /usr/bin/amuled    /offline_download    /offline_download/.amule    /offline_download/.aria2    /offline_download/tmp    /offline_download/tmp/amule    /offline_download/tmp/aria2 &   /tmp/offline_download/tmp_rt_ar_items    /etc/init.d/aria2     start     stop 	   complete    error    waiting    active    paused    removed "   {"jsonrpc":"2.0","method":"aria2.    ","id":    ,"params":[    ]}
    addTorrent    addUri    remove    forceRemove    pause    unpause    tellStatus    getGlobalStat    tellActive    tellWaiting    tellStopped    changeGlobalOption    purgeDownloadResult    removeDownloadResult Q   ",["gid","status","completedLength","totalLength","downloadSpeed","uploadSpeed"] y   ",["gid","status","completedLength","totalLength","downloadSpeed","bittorrent","numSeeders","uploadSpeed","connections"]    0    1    2    3 	   00000000 	   00000001    amule_get_runtime_items    amule_add_runtime_task    amule_set_savedkey    amule_add_server    amule_port_open    amule_port_close    amule_set_conf    amule_enable    amule_disable    is_amule_enable    is_amule_item_completed    amule_process    aria2_add_runtime_task    is_aria2_enable    is_aria2_item_completed    aria2_update_torrent_path    aria2_process_exception    aria2_process    create_cfg_file    truncate_cfg_file    add_runtime_cfg_item    del_runtime_cfg_item    update_runtime_cfg_item    check_active_num    add_runtime_task    del_runtime_task    del_runtime_task_result    pause_runtime_task    resume_runtime_task    is_task_completed    is_seeding_enable    check_item_del_cond    process_active    process_paused    process_waiting    process_finished    process_error    CFG_STATE_TBL    process_item    do_process 	   init_dir    check_type    check_enable    monitor    start_monitor    update_status 
   stop_apps 5       S   U        #                          \   j        
   H   "@    J  @@À   Å   bÀY@   É     ã       À@Ê    â@ É    ã #        amule_get_runtime_items: start    amule_send_message    dload_queue    amule_table    amule_get_runtime_items: stop                     o       	>   J      b@ M@@  @@ @À @ I   c  I      Å    Á@ J @@
  A@@ "Á @AY   ÁÀA@B ÄAB ÄB ÄÄI     Á@ J @ 
Ä      
  ÁBH A ÀC "A
  HÁ "A  [ ##        amule_add_runtime_task: start     url 
   needAdded    amule_add_item 
   errorcode 	       gid    type 
   timestamp    item_tmpconf_update_spec    download_item    item    .name    amule_add_runtime_task: stop                        Ñ          Ç  È  B  @  @ I  c [    È  WÂ Â@Û¢ B    AÛ	 ¢B BA HÃ  ¢Û  Ù@  B BÛÃ [×B ¢  @ÆBCH â  ÀÊ ÆÂÃH Ã È  âB   ÆDâB  @Ä B BÛÃ [×B ¢   ÆÂD[âBÆDâB  BA HÃ  ¢[ YA  B BÛÃ [ ×B ¢  @
ÊÀBÅÀÅCC "â    ÀÊ ÆÂÃH Ã È  âB   ÆDâB  @Ä B BÛÃ [ ×B ¢   ÆÂDJ@CÅ@ÃÅb âB  ÆDâB @DÀ  F ¢B £ #        cryptkey.dat    preferences.dat    /config    isdirectory    mkdir    get    offline_download    amule 	   cryptkey    io    open    /    r    read    *a    set    close    w+    write    userid    bin 
   b64encode 
   b64decode    commit                     Ö   ø     j   
     @ " @@   ÈÀ   "J   @ À b F@À È  Á  HA b  H  ÁA¢ È 
 HB   È  W"B    ÀY   @Â  CJB W "   FÂCÈ b FÂCÈ bÛ J B Û  [BbB FDbB FÂDÛE  D  Û ¢ DbMÀE@F@ÆÀ  @ MÀ ÀAÂ @ÃÈB ÂÈ bY  ÂÆ  H  ¢B ÈB   H  ×¢B Ä¢B 	 # #        cursor    get    offline_download    amule 	   serverip    serverport    amule_ubus    connect    amuleServerAdd    amule_add_server     .    io    open    /amule_server    r    read    *l    amule_add_server read     close    call    ip    port 	   tonumber  
   errorcode 	       w+    write    
    amule_add_server write                      ý       6   
     @ " @@   ÈÀ   "J   @ À b F@À È  Á  HA b   Ö  ÑÁÀÁ   Ö  ÑÁ [  A Ö  ÑÁA A   b QÁÂA Y   @Ö  ÑÁA [ A Ê  À ÃA  C[ Á "â@  #        cursor    get    offline_download    amule    tcpport    udpport 	   /   . /lib/offline_download/offline_download_op.sh    offl_fw_access tcp     offl_fw_access udp  	   tonumber 	   
   fork_call    table    concat    ;                       $    6   
     @ " @@   ÈÀ   "J   @ À b F@À È  Á  HA b   Ö  ÑÁÀÁ   Ö  ÑÁ [  A Ö  ÑÁA A   b QÁÂA Y   @Ö  ÑÁA [ A Ê  À ÃA  C[ Á "â@  #        cursor    get    offline_download    amule    tcpport    udpport 	   /   . /lib/offline_download/offline_download_op.sh    offl_fw_block tcp     offl_fw_block udp  	   tonumber 	   
   fork_call    table    concat    ;                     )  _      @  @ I   c  [      W    Ê  À Ê  À À â Ù   @Ê  À À â Ù@  @ É   ã  Û   
HA  ×@
  @[" A   
  @[ "AÁ   A[A W "A  @ I  c FÁAÈ bAJ @AÂb FÂÈÁ  HB b AB¢ BÂ H  ¢Ê ÀAÂâ ÆÂHÂ Â È â
  BB" BÂ ÈÂ C "J @BÂb FÂÈÂ Ã H bY  @ÂAÃ [ ¢B  @ÂAC [  ¢BÙ  @ÂA [ ¢B  @ÂAÃ [  ¢BY  @ÂA [ ¢BÂAC [  ¢BÂA [  ¢BÂF¢B  £ #        isdirectory    /config    mkdir    io    open    /amule.conf    w+    write 	   [eMule]
    cursor    get    offline_download 	   advanced    max_upload    max_download    amule    tcpport    udpport    max_concurrent_downloads    MaxUpload=    
    MaxDownload=    Port= 	   UDPPort=    MaxConcurrentDownloads= 	   TempDir=    IncomingDir=    close                     d     =      ¢@ @  Û   	 ¢[  MÀ @    £     À@È  
 × ¢ [  @Á @   £   Û   ¢ [  MÀ @    £     ÁÀ À Â  HA  â  ÁB C ÁBHA  È J Â W@
   Á@A @AÄ È b"A  	 # #        amule_port_open    amule_set_savedkey 
   fork_call +   . /lib/functions/service.sh;service_check  	       amule_set_conf    string    gsub '   [% %&%'%@%#%!%~%$%%%^%*%(%)%+%{%}%[%]]    \%1 	      . /lib/functions/service.sh    service_start      -c     /config -f    table    concat    ;                          !   E      ¢@   @@D@  @@ÈÀ  
  × DÀ   @@È  
  × DÀ   @AÁ ÀÀÁ H â ¢@  @ Û   	  ¢@  £  #  
      amule_port_close 	      . /lib/functions/service.sh    service_check     [ $? = 0 ] && service_stop  
   fork_call    table    concat    ;    amule_set_savedkey                             J   @ À    Ê  b      I   @ I@  I  c  #        band                     £  ª      J   @ À @  Å@  Ä  bÀ    ÀÀ@ Á@ É  ã  É   ã  #        amule_send_message    is_file_complete    hash    file_completed    yes                     ¯  Ç   (      È   ¢@    Á@   â    @ÂÀB@BÁB@ÂÁB@BÂB@ÂÂB@BÃB@ÂÃB@BÄBÂDA   Û b@Å    Þ   ùÊ    â@ £  #        amule_process: start    ipairs    gid 
   file_hash    status    file_status 
   completed    file_completed    size 
   file_size    connections    file_sourceall    numSeeders    file_sourcexfer    downloadSpeed    file_dlspeed    uploadSpeed    file_upspeed    type    amule    process_item    amule_process: stop                     Í  ê   T   Ê    âA Û  
 WÈA  H  WAÈÁ   Á H  AÀAÁ MÁ ÀAÁ ÀÁÀ
Ç A @BÂÂ ÈÂ bÛ Ã I  B cJ   Û ÂbB H   ÂCDÆBÄH â¢  ÈÂ ÂFÅbB [ B Û [ Ã J@Æ Û bÂÛ   ÀÈA  Æ HÂ ×AHB ÈÂ Á
 FJ "ÂÛ   Û ã#        aria2_send_add_message: start    "dir":"    "    "gid":"    gid    type    pc    usb    io    open    torrent    r     torrent file open failed.    add torrent:     bin 
   b64encode    read    *a    ",[]    close    ,{    ,    }    aria2_send_message    ["    url    "]                     ï  &   
q     H  A  Ê    âA ÀÁ@ M Á ÀÁ@ @ÁÀÊ ÀÁ J âÁÛ   Ê ÀÁ JâÁÛ   MÀA Â  ÀAPAÀÊ ÀAÂ H âA@÷ÊÁAÊ ÁÂÀC MÀÃÀÁ  C â  ÂÀAÄÙ  À ÀAÄÀÄÁ@ ÀC ÁÀÁ@ M Á ÀÁ@ @Á ÀAÄÀÁÄÙ  @ÀAÄÀÁÄÀÅÙ   ÀAÄÀÁÄÀÅÀÅÁÀC 
  ÀAÄÀÁÅMÀÃ ÀAÄÀÁÅM ÆÀ ÀAÄÀÁÅÁ ÀAF Á@Á ÀÁÆ G HB âÁÊ   âA # #     	   	      aria2_get_item_info: start    type    pc    usb    aria2_get_status 	    
   nanosleep    status    gid 
   needAdded 
   completed    size  	   tonumber    result    totalLength    bittorrent    info    file    name    btFile        torrent    string    match    url    .+/([^/]*%.%w+)$    aria2_get_item_info: stop                     +  l  
 {      È   ¢@    É   M@@  M@À   À @@ 	  G# À @ÁÀ   ÀÀ ÁÊ ÀÀJ ÊÀÁ À âA ÁA  À âA Ê   [ âÁJ   bB ÀÁ@J   bB   À @BBY     ABJ @@JAJ A J@@J  Â bB J  Û b@Ã A  É  À  @@BCY  J   bB J  BCÂCbB H À ÈB WÂ ÀBCÀÂÃÀ ÊÁÉ  ÀBCÀÂÃ@ ÊÁÉ  ÀÁJ@ÂÄ ÈB  Å [ bBJ  Â bB [ Û c #        aria2_add_runtime_task: start     gid 
   needAdded    aria2_del_item    del_runtime_cfg_item    aria2_send_add_message: stop 0   ========add ok, try to get item info===========    result    status +   aria2_send_add_message: -----NEED_ADD-----    torrent    error    add error:     message    GID      is not unique.    Bencode decoding failed    item_tmpconf_update_spec    download_item    item    .name    aria2_add_runtime_task: stop                     q     R   A   @@À    È  bY   @À  À A ¢ @A    ÀÁ  A H A¢@ÀÁ  A H A¢@ ÀÁ  A HA A¢@À  ÀB ¢ @ÀB    ÀÁ  B H A¢@ÀÁ  ÁB H A¢@ ÀÁ  B HA A¢@À  À C ¢ @@C    ÀÁ  C H A¢@ÀÁ  AC H A¢@ ÀÁ  C HA A¢@Ã ¢@ #        io    open    w 	   tonumber 
   numActive 	       active    write    
    

    numWaiting    waiting    numStopped    stopped    close                       â    ª      E     È  B  J    bB À@J @Á ÈB bÂ [Á ÐAÀJ@ÂÁB  ÈÂ  bB@û  ÀúM Â I   cA ÂBBBb @A ÂBCb @A ÂBBCb @@BB ÀÀ@C ÀÀÀ @BC ÀÀ  Â  @BB @J @Á È 	 bÂ  [A @BÄ@Ä b @ÀB@   AB È@   @@ÂB@ÂD@@@Ñ@ÀÀý@BC @ÀJ @ÁÈÂ  CC H ×B	 bÂ  [A @BÄ@Ä b @BB @À@BB BC È@   @@ÂB@ÂD@@@Ñ@ÀÀý@C @ÀJ @Á ÈÂ  C H ×B	 bÂ  [A @BÄ@Ä b @BB BC Q@À@BB BC QC È@   @@ÂB@ÂD@@@Ñ@ÀÀýJ  Â bB I  Û c #     	   	   '   [Debug] aria2_get_runtime_items: start 	       aria2_send_message      
   nanosleep 
   numActive 	   tonumber    result    numStopped    numWaiting r   ["gid","files","status","downloadSpeed","uploadSpeed","connections","numSeeders","completedLength","totalLength"]    active    luci    json    decode    0, :   ,["gid","files","status","completedLength","totalLength"]    waiting    stopped &   [Debug] aria2_get_runtime_items: stop                     ç  ð       
    @ @  È  Á  " A J   F@Á È@    HÁ   b@ J   FÀÁ È@  b@J  @ Â   b@ #  	      get    offline_download    aria2    enable    off    set    on    commit 
   fork_call                     õ  þ       
    @ @  È  Á  " A J   F@Á È@    HÁ   b@ J   FÀÁ È@  b@J  @ Â   b@ #  	      get    offline_download    aria2    enable    on    set    off    commit 
   fork_call                             J   @ À    Ê  b      I   @ I@  I  c  #        band                     
     	    À À Ù   Á@   À â MÀ@ÀÀ@A  @À "  ÀÊ   À Á  J A ÀÁ Â â Ù@     É   @ É@  É  ã  #        size 	   tonumber 	    
   completed    isfile    /    file    .aria2                              È   A   @@ÁÀ "AA  @À  ÛbM@ÀA  AÀÁÀ [B ¢  £  #        /mnt/sd[%a]+    string    match    torrent    gsub 	                       !  `  
        @Ê  A  × ¢ @  @   £     @Ê  A  × ¢@   À@È  A G É  ¢ É    [ "@@ÂAM Â@ÂAM@Â @ÂAÂÀ@ÂBMÀA   Û bM@Ã@  BÊ ÀÂÃ HC DÛ âBÉ  @ÂB ÀE  BDDD D ÂCÈ C @D¢BÉ   
@ÂB 	I Y   À Û ¢@ÀCD DD @ I  @   ÀýÀÄÀ È  CDHC ÃB×¢B   ÀBDÂÊÂÊ ÀÂÃ HC DÛ âBÉ    ÀèÀÄ 
  EH  "A	 # #        isfile    /exception    unlink    item_tmpconf_getall    download_item    item    ipairs    type    amule    pc    usb    status    aria2_update_torrent_path     torrent    item_tmpconf_update_spec    .name    gid 
   needAdded    aria2_check_cfg_items:           item_tmpconf_commit                     f  ~   (      È   ¢@    Á@   â    @ÀB@ÂÀB@BÁB@ÂÁB@ÂB@BÂB@ÂB@ÂÂBBCA   Û bÀÃ    Þ   ùÊ    â@ £  #        aria2_process: start    ipairs    gid    status 
   completed    completedLength    size    totalLength    connections    numSeeders    downloadSpeed    uploadSpeed    type    aria2    process_item    aria2_process: stop                             J      Û   WÀ Y     @@Û  ¢ @     À@Û   ¢   @ Æ@Aâ@ #        /    isfile    io    open    w+    close                             J      Û   WÀ Y     @@Û  ¢       À@Û   ¢   @ Æ@Aâ@ #        /    isfile    io    open    w+    close                       ¸   >   J      b@ J  @@À   È  À b Y@   AÀ    b@ J @@Á   È A  @ÁA AE Á _A bM Â @    £     À@B ÀÀB À ÀÀA ÀÊ  À@C@C@Ã@C@Ã@CÊ ÀÀÄ H  Çâ@Ê À Å I  â@Ê   A â@ É  ã  #     )   add_runtime_cfg_item: runtime_item start    isfile    /runtime_item    create_cfg_file    runtime_item    item_tmpconf_find    item    gid     type 
   timestamp    status 
   completed 	       downloadSpeed    uploadSpeed    connections    numSeeders    size    item_tmpconf_insert    item_tmpconf_commit (   add_runtime_cfg_item: runtime_item stop                     ¼  Ç   )   J   @ À @  È  A  E Á  _A   b Y        AÈ@  	  ¢@   @AÈ@    EA  D ÈÁ  A ¢MA@Ê   ÀÀÁA  @Bâ@Ê   À ÁA  I  â@#  	      item_tmpconf_delete_cond    runtime_item    item    gid    item_tmpconf_commit    item_tmpconf_find     item_tmpconf_delete_spec    .name                     Ì  è   ;      É   
   @HA    Ç I  "   V @ÀA  b@BÁ     AÈB    @ÃÁ ¢BÉ    ÂÊ À@  BBÈB   ÃÁ¢BÉ  ^  ÀùB@Â   AÁ  bA Ù    J  @ÃA  É  bA#        item_tmpconf_getall    runtime_item    item 	       ipairs    gid    item_tmpconf_update_spec    .name    status    item_tmpconf_delete_spec     add_runtime_cfg_item    item_tmpconf_commit                     í  ô    &   
     @ H@    Ç  I  "     V   Y@    HÀ     A¢ @A HÁ  ¢Ê  A [ Aâ@ Á  â À    É   @ É@  É  ã  #        item_tmpconf_getall    runtime_item    item 	       cursor    get    offline_download 	   advanced    max_active_num    runtime_item_num:  	   tonumber                     ø  $   _      È   ¢@ @@ @    £    ¢ À@ Ê    â@ É   ã  Ê  À@Á HÁ 	  â @À@ 	  # 	  I   Á â
 CÂJ M@	 [ "     ÃÂ C@C ["Ã [ @ [ "     ÃÂM C@Ã [  " [     D  @  DÄ@D  @ Þ  ô@ÄÀÊ ÀÄ I âAÊ  Â âA Ê   âA É ã #        add_runtime_task: start     check_active_num  3   add_runtime_task: ------maximum active tasks------    item_tmpconf_getall    download_item    item    ipairs 
   needAdded    is_amule_enable    type    amule    amule_add_runtime_task    is_aria2_enable    aria2_add_runtime_task    gid    item_tmpconf_commit '   add_runtime_task: commit download_item    add_runtime_task: stop                     (  3      M @ @  À @    £  @@     @Û  ¢@ À    À@Û  ¢@   £  #         amule    amule_del_item    aria2_del_item                     7  ?      M @ @  À @    £  M@@ À    @Û  ¢@   £  #         amule    aria2_del_item_result                     C  P      M @ @  À @    £  @@     @Û  ¢@ À    À@Û  ¢@   Û  ¢@   £  #         amule    amule_pause_item    aria2_del_item    del_runtime_cfg_item                     T  _      M @ @  À @    £  @@     @Û  ¢@ À    À@Û  ¢@   £  #         amule    amule_resume_item    aria2_resume_item                     c  q      É    @J  @@ 	 #  AÀ @@ É   @Á  [   Û " Û  ã  #        status    type    amule    is_aria2_item_completed                     t  z       
     @ " @@   ÈÀ   "   À @A @ I  c  I   c  #        cursor    get    offline_download 	   advanced    seed_enable    on                     ~         A   b @À À@@ MÀÀ  @@ M Á @ I   c  I  c  #        is_seeding_enable    type    http    ftp                       ª   O   Å    @Ä  A@Ä  @Ä  Á@Ä  AÄ  AAÄ  [   Û "   @ÄÀA
  Ä  A@Ä A [ "    @ÁÂ C"AA @C"A  BJ @ 
 Ä À BJ @ 
 Ä   BJ@ 
 Ä @ BJ @@ 
 Ä  ÂJ @À ÁÂ MC  ÁÂ ÀC@  ÀÄ ã  #     
   completed    size    connections    numSeeders    downloadSpeed    uploadSpeed    is_task_completed 	       status    check_item_del_cond    del_runtime_task    type    gid    del_runtime_cfg_item    http    ftp                     ®  Ñ   V   Å    @Ä  A@Ä ÄÀ@ÄÀ@ÄÀÀÄÀ@Á [   Û "    
  Ä  A@Ä A [ "    @ÁÂ C"AA @C"A 	 BJ @
 Ä  @ÁÂ C"AÀ BJ@
 Ä  @ÁÂ C"A  BJ @ 
 Ä @ BJ@@
 Ä Á @ÁÂ C"A ÂJ @À ÁÂ M D  ÁÂ @D@  ÀÄ ã  #     
   completed    size    connections 	       numSeeders    downloadSpeed    uploadSpeed    is_task_completed    status    check_item_del_cond    del_runtime_task    type    gid    del_runtime_cfg_item    pause_runtime_task    del_runtime_task_result    http    ftp                     Õ    	 
w   Å    @Ä  A@Ä  @Ä  Á@Ä  AÄ  AAÄ  [   Û "    
  Ä  A@Ä À ÁAJ @ 
 Ä   ÁAJ @ 
 Ä  Â @B Â J@Á "  C 
 Ä  A @Â C"AÀ ÁAJ@
 Ä Á @Â C"A 	 ÁAJ @ 
 Ä @ ÁAJ @@Ä DÄ ÄÄ DÄ Ä
 Ä 
 AD[   È  ÂÄ H WA"    
 AE[   È  ÂÄ H WA"A  ÁÁJ @À Â ME  Â ÀE@  ÀÄ ã  #     
   completed    size    connections    numSeeders    downloadSpeed    uploadSpeed    is_task_completed    status    type    amule 
   needAdded    check_active_num     resume_runtime_task    gid    del_runtime_task_result 	       isfile    /    file    .aria2    unlink    http    ftp                          )   Å    @Ä  A@Ä  @Ä  Á@Ä  AÄ  AAÄ  [   Û "   ÄÀA AAÄ  A@Ä 
  Ä A [ "    @ÁÂ C"AA @C"A ã  #     
   completed    size    connections    numSeeders    downloadSpeed    uploadSpeed    is_task_completed 	       status    check_item_del_cond    del_runtime_task    type    gid    del_runtime_cfg_item                        5   '   Å    @Ä  A@Ä  @Ä  Á@Ä  AÄ  AAÄ  AÄ  AJ  M@À  AJ @@ 
 Ä  ÁJ @À ÁÁ M B  ÁÁ @B@  ÀÄ ã  #  
   
   completed    size    connections    numSeeders    downloadSpeed    uploadSpeed    status    type    http    ftp                     B  m   p      Ê   À ÀA  H  A  ÀÁÀ ÁÅ Â  ßA â  ÁJ A bA A ÁÀ bA AÁ Â ÀÁÀ bAJ A ÀÂÂ bA J  ÀÂ Â bA AA Â@Y  @Û  [ ¢  M A@ÁÀ A@ÂA@ÃAAÁ ÁÀ Û bAGD  ÀDM@D D  @Ä  DÁÁ  Äâ ÁÀDNÁBÀÂÀ@DÁÁ  Äâ ÀÀ Y   @  ÀBÁÀDÁÀDÁÊ  ÀAÅB  H  ÅÛ âA  £  #        item_tmpconf_find    download_item    item    gid  !   process_item: config item is nil    del_runtime_cfg_item    del_runtime_task    type +   process_item: config item status: --------    status 	   -------- ,   process_item: runtime item status: --------    CFG_STATE_TBL 
   timestamp    update_runtime_cfg_item    size 	    
   completed 	   tonumber ©?   item_tmpconf_update_spec    .name                     r  ß  	 â      È   ¢@    Å   	  I  A  Á  Â  âA Á  â Ù  @É  B [  "B  "B Â "Â  Û Ù   [   "  Ê ÀAÂÂ  H B  ÃÅ Ã ßB 	  â Ù   
  BCHÂ    "B [  "B ÁÁ  â Ù  @É  
 "B 
[  " Û Û Ù  !
  H "B @DÀ
  DHÂ  Ç I  " I   Û ¢ÀÃBM ÃÀÀÃBM@Å ÀÃBÅÀÀÃE
 M ÀÁ   [ âM@Æ@  ÄJ @ÄÆÄ È  G[ bDI ÀÃE
    ÀÃE
   
É D    AD " @G
G
 É  AÅ PEÀ
BÅ @    ý ÈÀ
  HD GÈ  ÅEW"D   @GDJDJ @ÄÆÄ È  G[ bDI   ë È  BCÈÂ 	 ¢B	 [  "BB	 [  "[ ÀÊ ÀAÂÂ  H B  ÃÅ Ã ßB 	 â Ù   
  BCHÂ    "B
 "B A  @ Y  ÀÊ  	 âA Ê ÀAÃÂ I âAÁÁ	   [ âAÊ  
 âA #  )      do_process: start 	      create_cfg_file    runtime_item    is_amule_enable    amule_enable    amule_add_server    amule_get_runtime_items    amule_process    item_tmpconf_delete_cond    item    type    amule    item_tmpconf_commit    amule_disable    is_aria2_enable O   -----------aria2_process_exception(usbdir, aria2_runtime_items)--------------- 	       item_tmpconf_getall    download_item    ipairs    pc    usb    status    aria2_update_torrent_path     torrent    item_tmpconf_update_spec    .name    runtime_items    gid    runtime_item_num    aria2_check_cfg_items:        
   needAdded    aria2_process_exception    aria2_process /   -----------commit download_item---------------    add_runtime_task    do_process: stop                     ä  ê   $   J   @ À    Ê  À É  b@J   @ À    Ê  À É  b@J   @ À    Ê À É  b@J   @ À    Ê  À É  b@J   @ À    Ê À É  b@#        mkdir                     ð      
;   
   J      ¢     
  J  À	 @@È  Á  G É  ¢    Á   â   BÁJ M@  ÁÀA@ 
  À ÁM BÀ ÁM@B  ÁMB@ ÁMÀB  Á C  J  Þ   ù È@   H  ×¢@ @  £  #        is_seeding_enable    item_tmpconf_getall    download_item    item    ipairs    status    type    amule    pc    usb    ftp    http    bt_url    [Debug] check_type: amule=     aria2=                       2   U   J   @ À b F@À È  Á  H b@Á @   £    A¢À 
M  
 M @
HÁ "A 
  BJA W"   @
  BJA W"A Á  CJA W "  @ FÁCbA J c    
  D[  "    A [  "A 
  D[  " MÀD J @@J @Å  bA  
HA "A 
 #  $ #  #        cursor    get    offline_download    global    enable    off 	   scan_dir    scan_dir is not ok    isfile    /download_item    unlink    io    open    /exception    w+    close    isdirectory 	   init_dir    item_tmpconf_check     item_tmpconf_reload "   check enable: check usbdir failed    check_type                     7  Q    6   
     @ " @@   #  @ @	J  @ÀÀ   b Y@   J  @ Á   É  b@J @@Á b  Û  ¢ Ê  MÀ  ÁÀ  [ â@ Á  A â@ Á â@ Ê   ÀÀÂ HA  ä  ã      J   @ÀÃ    b@ #  #        fork  	       isdirectory    mkdir    get_curdir    check_enable    do_process    truncate_cfg_file    runtime_item 
   stop_apps    exec    /bin/sh    -c    sleep 3    waitpid                     V  f    -       @@ H  À  "M A    F@A È bMÀÁ @J   @ Â   b Y@   J   @@Â   É  b@A   @@À   È À ÈÀ bY   @  Ã ¢@ J  @@Ã  È b@AÀ b@ Àý#        io    open    /tmp/boot_done    r     read 	      1    isdirectory    mkdir    /exception    w+    close 
   nanosleep 	       monitor                     m      e   Á   À@À   @A  @ÁÀ  Ê  ÀÁB H 	  â Ù   À Y  @ A  @ 	  # 
  ÂAH "B 
   BBHB " B  @
  BHÂ "B 	  # Ù   [" @CCÀ@@C 
@ÃCM@À	E  DC À CDDDÃD DDDD DDDÃDCDCCDED  CEÈC  @E¢C  ÃEÈC 	 ¢C @    ó
  BHÂ "B £ #        arg 	   	   	      item_tmpconf_getall    download_item    item 
   fork_call ,   . /etc/init.d/offline_download;stop_monitor    is_usb_config_exist 
   fork_exec -   . /etc/init.d/offline_download;start_monitor    ipairs    type    gid    status 
   completed    size    downloadSpeed 	    
   timestamp    item_tmpconf_update_spec    .name    item_tmpconf_commit                     ¥  ¨          "@ 
   "@ #        amule_disable                             