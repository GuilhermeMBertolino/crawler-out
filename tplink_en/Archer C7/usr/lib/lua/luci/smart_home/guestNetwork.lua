LuaQ               F      H@    À@"@  H@ " A   b   ÈÀ ¢ Á   â  HA " E    Å Â H ßA ÁÃÅ  HÂ  ÈB BÄÄÃ!  D!B    Â !           !Â        a ¡B B Â  ÅB  ÄÂÅB  ÄBÂÅB  C ÄÂá   DÁc #        module    luci.smart_home.guestNetwork    package    seeall    require    luci.controller.admin.wireless 	   luci.sys 
   luci.json    luci.tools.debug    luci.model.uci    form    wireless_2g    wireless_5g 
   operation    read    guest 	   guest_2g 	   guest_5g    version    report    setGuestNetwork    execute_setGuestNetwork    query    cb    execute 	   dispatch                       #  #        1.0                        '        
     @ " F@@ È  Á  b Y@    H  Y   @@Á À ÈÀ ¢ À B ABH "A#        cursor    get_profile    smart_home    support    no    yes    require #   cloud.smart_home.smart_home_upload    VOICE    upload_property_change    guestNetwork                     )       s   E    @ À@@  @ @Á@   É   H @ @A@     Â@ @A@ H   H   Ê  ÀÂÁ
 â 
   ÃAJ " J@Âb CÂB A CÂÃB A  A  Á D@Cc  @ DCc  ÀC CÂBM A CBDMÀCÄ HÄ  Û ¢C    D@CÀÃ CÂÃBM A CBCEMÀCÄ H  Û¢C É   D@CÃÅ ¢CÀC@ CFFÈÃ ¢C D GÀÃ@ CFFÈC ¢C D GMÀC@ ÀÃ@  ¢C c  #     
   change_2G 
   change_5G 
   enable_2G 
   enable_5G    off     on    wireless_dispatch    cursor    data    wireless_2g_enable    wireless_5g_enable    error_code 	   	¨ûÿÿ   guest_2g_enable    set 	   wireless    ath01    enable    guest_5g_enable    ath11    commit    luci    sys 
   fork_exec    sleep 1;/sbin/wifi vap ath01 	       sleep 1;/sbin/wifi vap ath11    report                        ¨    N   E     Ê   À À
 â 
   @J " @AÀ@ÀMÀÀ@@A@@ÁMÀÀ@        E  D@@AÁ D @AÁ A@BD@AÁ A@BÀB  A  @ A@ACD@AÀ@ÃMÀÀ@@A@@ÁÃMÀÀ@        E  D@@Ä D @Ä A@ADD@Ä A@DÀB  A  @ A@ÁDDE  DA Å    DÅc #        wireless_dispatch    data    wireless_2g_enable    off    guest_2g_enable    band2G    enabled    ssid    guest_2g_ssid 	   password    guest_2g_encryption    none        guest_2g_psk_key    wireless_5g_enable    guest_5g_enable    band5G    guest_5g_ssid    guest_5g_encryption    guest_5g_psk_key    result    error_code 	                        «   Õ     /   E   @  @ D@@c     À@ Ù    ÁÀ@ À@ÁM ÁÀ@ À@ÁMÁ D@@c   À@ À@ÁÀÀ B Ù    ÁÀ B À@ÁM ÁÀ B À@ÁMÁ D@@c   À B À@ÁÀ ÁÀ  ä  ã   #        error_code 	³ûÿÿ   band2G 
   change_2G    enabled  
   enable_2G    band5G 
   change_5G 
   enable_5G    setGuestNetwork                     ×   ÿ     7   E   @  @ D@@c     Ç  @   À  @ Á@" Û  M Á@M@ÁÀ MÁ@ DÀAc   B M@B  B MB@ D@@c  @ÁÀ  B  @B@ÁÀ  B  @BÀ Á@ B  @B B  @BÁ [ $ #  #        error_code 	³ûÿÿ   band    upper    ALL    2G    5G 	Kûÿÿ   enabled  
   enable_2G 
   change_2G 
   enable_5G 
   change_5G    setGuestNetwork                             E   @  @ D@@c  @    À   À@ À ÀÀ@ A â [   D@@c  #        error_code 	³ûÿÿ   method    cb    params                             