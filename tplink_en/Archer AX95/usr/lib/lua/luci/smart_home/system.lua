LuaQ               f      H@  " A     b    ÈÀ  ¢ Á    â   HA " A   b   ÈÁ ¢ Á   â   HB " A   b Â ÀÃâ  CÃ" E   ÈÃ D DDÄDDEÄEDFa  DCaD   ¡      áÄ       !         aE          ¡     Å  @FÇ FÆÈÄF @FÇ FÆÆÈÆÄF  ÄF  FÄ!Æ        Dc #  '      require !   luci.model.smart_home_controller    luci.controller.admin.system 	   luci.sys $   luci.controller.admin.cloud_account    luci.controller.admin.firmware    luci.tools.debug 
   luci.json    nixio    ubus    luci.model.uci    /tmp/firmware_lock.lua    cursor_state    cursor    /tmp/cloud_up.bin    sysmode    has_been_set 	   
   no_new_fw 	Pûÿÿ   invalid_params 	³ûÿÿ   switch_sys_mode_fail 	Mûÿÿ   check_fw_fail 	Jûÿÿ   version    query    ctl_dispatch 	   dispatch    form    oper    read    cb    execute    write 	   pre_hook    reboot 	   updateFw        %   '            #  #        1.0                     )   2           @@   ÈÀ   "@A @J    b@ I  c   J   À b@ I   c  #        uci_t    get    systime    core    sync    1    NTP is ready    NTP is NOT ready yet                     4   K    F   J   @ À @  Ê  ÀÀ  â À b@ MÀ@ @ A MÀÀ À @ A @@Á ÀÀ @ A c  @ A    À@Á ÆÀÁâ ÀÊ  Æ ÂHA  ÈÁ âÙ@   
  H "A   AA @Ãb Û ÁÄJ FAÄÈA  H  bA J FÄÈA bAÁ ["  
   @H  @Û ¢ W"A £  #        printf    [query_system]data:    encode     data    mode    invalid_params    lower    get    smart_home    system    lastFwUpdateTime    generate lastFwUpdateTime...    os    time    needUpload 	       section    commit 	   tonumber    [query_system]result:                     M   S       J   @ À @  Ê  ÀÀ  â À b@ @À@ M Á À J  @@Á  c #  #        printf    [execute_system enter]data:    encode    success    switch_sys_mode_fail    new mode is invalid!                     U   q    M   J   @ À @  Ê  ÀÀ  â À b@ HÀ  M A  @A  AÀ   AÈÀ £  B    À@ À B ¢    @ À B ¢   @ À B ¢ [    PÀÀ @ Û  ¢  Å   H A Ä Ä Ã
 C" ÀC J  @À @ÀB ¢ bA AA @Ä bA J @ÁÄbA AA @ÅA bA @ HÁ c #        printf    [reboot_system]data:    encode 	    
   deviceMac    invalid_params 2   invalid params for reboot_system...(no MAC found)    delayS 	   tonumber 	   sleep %d    form    reboot 
   operation    fork 	    .   [reboot] the system will reboot in %s seconds    os    execute 	   dispatch    exit 	                       s   ¯       J   @ À @  Ê  ÀÀ  â À b@ HÀ     Ç  A À 
  AAH # ÁA    @ÁA "   @ @ÁA "     [  
 ABH "A   E  _A AÃG ÈÁ Â  HÂ ÝÁÊ ÀÄ â [Ê  ÀÀC J @Àb CâB ÀÄÙ   ÀÄÀÂÄA   M A@  EÊÀBÂ âB ÊÀBÂC âB     ÜöÅ   H Â B ÄÄÃ
  D[" J  @À Ê ÀÀ â ÂbB @BFMÆ J @ÂÆc @D@ÇM Á A DGb @Ç J @Çc J@ÂÇb @Ç BBÈ ¢B @ B £ #  !      printf    [upgrade_firmware]data:    encode 	       invalid_params $   invalid params for upgrade_firmware    delayS 	   tonumber 
   fork_exec    cloud_getFwList    form    cloud_upgrade 
   operation    read 	   	   dispatch     [upgrade_firmware]ret_check_fw:    data    detail        sleep 1    check_upgrade    check_device    [upgrade_firmware]ret_check:    success    check_fw_fail    update_number 	    
   no_new_fw    fork    /usr/sbin/smart_home_upgrade                     ±   Á    +   E    @ Ê   Æ@ÀH    È  âÙ@    ÈÀ       [ " M@A   ÁA# B"   MÀ@ÀM@B@MBÀ 
  ÁB# À 
  C#   D c  #        mode    get    sysmode    router    type    string    RROR_CODE_SYSTEM    invalid_params    lower    ap 	   repeater    switch_sys_mode_fail    has_been_set                     Ù   Þ       J   @ À @  Ê  ÀÀ  â À b@ J  @ÀÀ  Û   b    @È  
  @[ " × ¢@ c  #        printf    [system_dispatch]form:    encode 	   dispatch    [system_dispatch]ret:                             