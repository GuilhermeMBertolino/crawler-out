LuaQ               &õ      H@    À@"@  H@ " A   b   ÈÀ ¢ Á   â  HA "  B" A Á b @ÃA b  È ¢ Á Â â  H " A B b  È ¢ Á Ã â  H " A C b  ÈÃ  HD  ÆÄFH E â ÙD    È ÅF ÈÅ " E     FÅFÈ F b YE    H ÅF HÆ ¢ E    	 ÆÅFH F	 â ÙE    È	 ÆF ÈÆ	 " F    
 HF
 
 ÈÆ
  HG  á       !H    a       B aÈ  BÈ a      	 	  
B aH     BH a     B aÈ      	  
   BÈ a  B aH    BH a    	  
    B aÈ     BÈ a ¡H     ¡   H ¡È    ¡  È ¡H        	   ¡      H ¡È  H Å  I  AI I Ä	 I  A I Ä	¡ÈÅH  I  A I Ä	¢È¡ÅH  I  AI I ÄÈ¢Å I  A	 I Ä£I  AI I Ä	¤I  A I Ä¤I  AÉ I Ä	¥È£ÅH  I  A	 I Ä	¦È¥á        ÂH áH    Â á ÂÈ #  P      module    luci.controller.admin.easymesh    package    seeall    require    luci.model.controller    nixio    luci.tools.debug    luci.model.crypto    luci.model.uci    cursor    luci.model.asycrypto    Crypto    rsa 	   luci.sys    luci.controller.admin.system    luci.tools.datatypes "   luci.controller.admin.timesetting    luci.model.uuid 
   luci.json    luci.model.wireless    luci.model.easy_mesh    1234567890abcdefonemesh        onemesh    tmp_account    onemesh_pri_sync    wifi-iface    get_profile 	   wireless    wireless_mesh_ifname_2g    ath03    wireless_mesh_ifname_5g    ath13    wireless_mesh_config_2g    ath04    wireless_mesh_config_5g    ath14    wireless_sta_config_2g    ath02    wireless_sta_config_5g    ath12    easymesh_client    device    /tmp/onemesh_master_rsa_pub     /tmp/onemesh_sync_wifi_tmp_json    /var/run/onmesh_rsapub.lck    master_generate_group_id    generate_random_string    master_generate_backhaul_wcfg    get_dev_info    wireless_status_all    sync_wifi_all    do_leave_easymesh    read_easymesh_settings    write_easymesh_settings    search_operation_monitor    search_slave_router_start    search_slave_router_stop    search_slave_router_cancel    search_slave_router_check    close_sta_vap    master_set_slave_mac    set_slave_mac_func    easymesh_enable    read    cb    write    slave_info    set_slave_mac    device_info    search_slave    start    stop    cancel    check 
   close_sta    close 	   dispatch    _index    index        7   :       J  @ À   È@    b C   J   FÀÀ     È  Ù@    È@ b@#        open    w 	X     flock    ex    sh                     <   ?        
    @ "@       #        close                     A   N        
    @   Ê  A  "@   #  J  @ÀÀ b     A
 J  ÅA  ÄA¢@    A
 ¢@#        get    role    slave    generate_random    section 	   group_id    commit                     P   i     7   H   @  Á  ÀÀÀâ  ¢  Á  À@Á HÁ â HA Ù   @ÂÂ ¢  Ã¢A A ÈÁ B Ã ÁÂ ÀÄ [âQÀÁýA DÛ ¢A A Û  B B ÂDÈ ¢ [  ÆBE[  â WÁÁüc #     	    	   tostring    os    time    io    open    /dev/urandom    rb ?   abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789        read 	      close 	   	      string    byte    math    randomseed    random 	>      sub                     k        S       @
 J A  ¢M@  #  ÁÀ   â  ÁÀ   â [ Ê   Æ@ÁJ  Ê   Bâ@ ÁÀ   â  ÁÀ   â [ Ê   Æ@ÁJ  Ê    Bâ@ Ê   Æ ÂHA  â Ù@    ÈÀ  Ã 
  BA ÈA " A     AÁ   b  AÁ   b [ J  FAÁÊ 
 [    BbA 
  ÁC "A#        get    role    master    generate_random_string 	      section    ssid    psk_key    get_profile 	   wireless    support_triband    no    yes    wireless_mesh_ifname_5g_2    wl24    commit                               E      @@È  ¢ @    À  D    @@È@ ¢ @    À  D   ÀA HA ¢ @     D c  #        deviceModel    exec    getfirm MODEL     
   deviceMac    getfirm MAC    deviceType    get_profile    global    device_type    WirelessRouter                        ¤       J   F À È@    b Y@    HÀ     ÀÀ @Å   HA ß@  @Å  HA  ß@ Ê  ÀÀÁ â Æ Âä  ã   #  	      get_profile 	   wireless    support_triband    no    wireless_2g    wireless_5g    wireless_5g_2    Apcfg    read                     ¦         
    @ @  È  " @    À  J   F Á È@ A H bY@    HÀ     AA  HA   ¢@    @ Ê   Æ ÁHA  A  È âÙ@    ÈÀ À@ @ÀÁ À @B@ MÀÂ@ 	  # 
  @ ÈA " A     AÁ b Y    Û¢ M@DÀ DÈÁ ¢A C   AEAE[  Á  AEAEAÅ[   Ê  ÆÀH  â ÙA    ÈA 
  @ È " B    Â J  FÇÈ b   G [ ¢ Ê  ÆÁH CÇÈ âÙB    ÈÂ 
  A ÀCG "C    Ã EÃ ÈDCÈDÈC    Ã DÉDCÉDÉDÃÉDÊDCÊC    
 D ÀÅ¢ D ÀÅ¢ DÂ@B M@Â  C    Ã DCÌ@B  C    Ã D  GD  J  ¢D  GD  J  ¢DÃ ÀHÃÀCHÃÀHÙC    ÈÃ ÃÀIÃÀCIÃÀIÃÀÃIÃÀJÃÀCJÙC    È
 ÃÁ  Åâ ÃÁ  Åâ ÃÀB@Â M@B È ÙC    ÈÃ ÃÀCL@Â È ÙC    ÈÃ ÃÊ  ÆÇHD  È âÃÊ  ÆÇHD  È âÃAÀ@ÀÊ  ÆÀH  â ÙC    ÈÃ 
  @ È " D    D J  FÇÈ  b   A	 @EÇ ¢D    Ä Å  ÈÄ EÈÄ ÈE    Å Ä ÉÄ EÉÄ ÉÄ ÅÉÄ ÊÄ EÊE    
 Ä @ÅÅ" Ä Â@B
 M@B	  E    Å Ä EÌ@B
  E    Å Ä
  G
E  Û "Ä
  G
E  Û "ÄÁÊ ÀÃÎ â   DOJ"D   ÄOJ "FDPÛbDFPbD E  D¡DDQ¢ ÈÄ ¢ ÀR	â EÒ	 ÈÅ "EEÒ	 ÈE   "EÐ	"E 	 # #  N      get_profile    onemesh    onemesh_support    yes    get    sysmode    mode    router    enable    on    role    master 	   wireless    support_triband    no    wireless_status_all    type    table    print    cannot get the wireless status    wireless_2g_current_channel 	ÿÿÿÿ   wireless_5g_current_channel    wireless_5g_2_current_channel    wireless_ifname_2g    ath0    wireless_ifname_5g    ath1    get_all    device 	   disabled    off    ssid    encryption    psk_key 	   12345678    psk_version    psk_cipher 	   wep_mode    wep_format1 
   wep_type1 	   wep_key1    1234567890    channel 	   tonumber    current_channel 	   	    
   hide_ssid    hidden    backhaul_ssid    backhaul_key    2.4G    5G    wireless_mesh_ifname_5g_2    wl24    wireless_ifname_5g_2    wl21    5G2    encode    os    remove    io    open    w    write    close    load    timeout 	      require    ubus    connect    call    meshd 
   sync_wifi    map    wifi_reload                                 J   @ À @  b@À@A  bÀBÁAÃ H ¢ BB¢ Ê  ÀÂ  âB ^  @ü#        api_arrange_mesh_clients 	   
   operation    unlink    pairs    mac    gsub    :    -    upper    manage_available_mesh_dev                        )          J   @ À b Y@    E     @Á  HÁ  A  ¢@        @A HÁ ¢ @      Ö  ÏÂÑÀ#  #        get_sclient_list_all    enable    get    meshd    on    get_profile    global    wls_reboot_time 	      time 	                       +  \   
   E    @ Ê   Æ@ÀH    ÈÁ  âÙ@    È  M@A

  A  È    [ "A 
  A  Ê   [ "A 
  A  Ê   [ "A 
  AÁ ÈÁ   [ "A 
  AÁ ÈÁ  [ "A 
  AÁ ÈÁ B [ "A @
 BHÁ "A 	  # 
  C  "A
  ACÁ "AA    D À @ÀC "A 
  ADH "A 
  ADHÁ "A 
  ADH "A  
  ADHA "A 
  ADH "A 
  ADH "A ÀÁ  F" CFAFÈÁ  EB  DÇbA@FAFÈÁ  EB  DBÇbAFGbA c  #        enable    get    onemesh    role    master     set    meshd    enableonemesh    enableeasymesh    printf    enable is nil    commit_without_write_flash    commit    on    off    do_leave_easymesh 
   fork_exec    wifi onemesh +   killall easymesh-controller; killall meshd    apsd_mesh_switch off;    apsd_mesh_switch on;    meshd &    ubus    connect    call    onemesh_auto_attach_master 	   wantJoin 	   	       close                     ^  k          J   @@À   È   b@@ À@  J  @ Á @ b@ ü   üJ  @ Á À b@   ú#  #     	    
   nanosleep 	   	x   
   fork_exec    wifi search stop 	,     wifi search cancel                     m  x       A   @@À   Û   Á   b   Y    Æ@Á â  ÆÁ â@ @      ÁÀ  ä  ã   #        io    popen    ps wwwww | grep  #    | grep -v grep | awk '{print $1}' 	       read    close 	   tonumber                     z         
   H   " J   @  b @ @   £    @À   AÈ@   × ¢@   AÈÀ ¢@   £  #        '/sbin/wifi search start'    'lock /var/run/wifi.lock' 	       os    execute 	   kill -9  
   fork_exec    wifi search start                              
     @ H@  "@ 	  #  #     
   fork_exec    wifi search stop                              
     @ H@  "@ 	  #  #     
   fork_exec    wifi search cancel                              	  E   D@@   @Û  ¢ @       Ú     Û  ã  #        device_type    WirelessRouter    get_available_mesh_dev_list                       ª    *   
    @ @  Ê    "J   F À È@  
 H  bÀ@  ÀÀ   #      AA  J ÅA  ÄÁ@¢@     AA  J ÅA  ÄÁ@¢@    @AA  ¢@  AÈÀ ¢@ #        get 	   wireless    enable    off    section    commit 
   fork_exec    killall wpa_supplicant                     ¬  È   
   É   
  @ Ê !          "A@À@ 	 # 
  @ Ê  E  DDB "A 
  AA "A	 # #        foreach    section    mac    joined    commit        ±  ¹      @ @ Y    @ @      @@@     I  C  #  @@ C #        mac    joined    .name                                 Ê  Ô       @ @ M@À  @@ @À @ I   c  @@ MÀÀ  @@ M Á @ I   c  A@  @ À@ d c   #     	   slaveMac     joined    1    0    master_set_slave_mac                     ì  ü      a   
      @Ê    EA  DA¤  £   #     	   dispatch 
   post_hook        í  ù   %      À À     @  À À ¢ @ÀÀ  À À Ö ÐÀÀÁ     AÀÀ ÀA¢A @þ   @AÀ À  À  À ¢@ À    @AÀ À ¢@   £  #        cmd    type    table 	   
   fork_call 
   fork_exec                                 þ          
     @ A@  $  #   #        _index 	   dispatch                                  E  @  È  _@ À  È  ¢  "  Á#        entry    admin 	   easymesh    call    _index    leaf                             