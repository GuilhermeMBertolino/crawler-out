LuaQ               	;      H@    ΐ@"@  H@ " A   b   Θΐ ’ Α   β  AB " FBΘΑ  b YA    HA  α    ΒΑ αA     Β α    ΒA αΑ    Β α ΒΑ αA  Β α ΒA αΑ  Β α ΒΑ αA        Β #        module    luci.model.fmup    package    seeall    require    luci.model.uci    luci.tools.debug 	   luci.sys    luci.fs    cursor    get_profile    global 
   small_mem    no    /tmp/firmware_lock.lua    upgrade_type    load_old_config 
   clean_mem    update_cloud_config 
   mcu_reset    has_mcu    mcu_confirm    has_ledctrl    sysled_twinkle    upd_fm 
                 A   @@ΐ    Θ  bΐ  Ζ Α AA @Α Ϋ  bβ@  ΖΐΑ β@ #        io    open    w    upgrade_type = "%s"
    write    string    format    close                        (           Ϋ  ΐ Ε   
   @[ "   ΐ
 A@ "A
 @ "A
 Α@ "Ϊ@ @   Ϋ  
 A@ "Aγ  #        isfile    unload    load    get_all                     *   F     i   
     @ H@  "@    ΐ@ H  "@    ΐ@ H@ "@    ΐ@ H "@    ΐ@ Hΐ "@    ΐ@ H  "@    ΐ@ H@ "@    ΐ@ H "@    ΐ@ Hΐ "@    ΐ@ H  "@    ΐ@ H@ "@    ΐ@ H "@    ΐ@ Hΐ "@    ΐ@ H  "@    ΐ@ H@ "@    ΐ@ H "@    ΐ@ Hΐ "@    ΐ@ H  "@    ΐ@ H@ "@    ΐ@ H "@    ΐ@ Hΐ "@    ΐ@ H  "@    ΐ@ H@ "@    ΐ@ H@ "@    ΐ@ H "@    ΐ@ Hΐ "@ #        printf    clean memory ...    os    execute J   ps | grep hotplug2 >/dev/null 2>&1 && killall -9 hotplug2 >/dev/null 2>&1 B   ps | grep tddp >/dev/null 2>&1 && killall -9 tddp >/dev/null 2>&1 B   ps | grep dosd >/dev/null 2>&1 && killall -9 dosd >/dev/null 2>&1 J   ps | grep dropbear >/dev/null 2>&1 && killall -9 dropbear >/dev/null 2>&1 T   ps | grep factory_reset >/dev/null 2>&1 && killall -9 factory_reset >/dev/null 2>&1 H   ps | grep improxy >/dev/null 2>&1 && killall -9 improxy >/dev/null 2>&1 B   ps | grep logd >/dev/null 2>&1 && killall -9 logd >/dev/null 2>&1 D   ps | grep klogd >/dev/null 2>&1 && killall -9 klogd >/dev/null 2>&1 F   ps | grep logger >/dev/null 2>&1 && killall -9 logger >/dev/null 2>&1 H   ps | grep openvpn >/dev/null 2>&1 && killall -9 openvpn >/dev/null 2>&1 D   ps | grep pptpd >/dev/null 2>&1 && killall -9 pptpd >/dev/null 2>&1 B   ps | grep imbd >/dev/null 2>&1 && killall -9 imbd >/dev/null 2>&1 D   ps | grep radvd >/dev/null 2>&1 && killall -9 radvd >/dev/null 2>&1 F   ps | grep dhcp6s >/dev/null 2>&1 && killall -9 dhcp6s >/dev/null 2>&1 F   ps | grep dhcp6c >/dev/null 2>&1 && killall -9 dhcp6c >/dev/null 2>&1 E   [ -f /usr/sbin/miniupnpd ] && rm /usr/sbin/miniupnpd >/dev/null 2>&1 L   ps | grep miniupnpd >/dev/null 2>&1 && killall -9 miniupnpd >/dev/null 2>&1 A   [ -f /usr/sbin/sysmond ] && rm /usr/sbin/sysmond >/dev/null 2>&1 H   ps | grep sysmond >/dev/null 2>&1 && killall -9 sysmond >/dev/null 2>&1 D   ps | grep crond >/dev/null 2>&1 && killall -9 crond >/dev/null 2>&1 F   ps | grep tsched >/dev/null 2>&1 && killall -9 tsched >/dev/null 2>&1 B   ps | grep ntpd >/dev/null 2>&1 && killall -9 ntpd >/dev/null 2>&1 X   ps | grep wireless_button >/dev/null 2>&1 && killall -9 wireless_button >/dev/null 2>&1 "   echo 3 > /proc/sys/vm/drop_caches                     H   W     :      H@  "  @ " Fΐ@ Θ  A b Y@    H ΐΑ 
 B A H ’@  B A HΑ ’@  C A H A ’@ C A HΑ  ’@ C Α H A ΘΑ ’@  C Α H  ΘΑ ’@  C A H A ΘΑ ’@ E A ’@   ΐEΘ  ’@ #        require    luci.model.uci    cursor    get_profile    cloud    cloud_support    no    yes    delete    cloud_config    new_firmware    upgrade_info    set    cloud_push    cloud_reply    wportal    upgrade    enable    time    0    info 
   show_flag    commit 
   fork_call    /etc/init.d/cloud_client stop                     Y   \      	       @@ H  "@     @@ Hΐ  "@ #        os    execute .   echo 0 > /sys/class/leds/mcu_reset/brightness .   echo 1 > /sys/class/leds/mcu_reset/brightness                     ^   c        
     @ H@  "    @ 	  #  	   #  #        isfile %   /sys/class/leds/mcu_reset/brightness                     e   w      )   A   b Y@  @ I  c  A@  @ΐ ΐ  b@ A@  @ΐ   b@ A@ b@ H ΐ Θ ] AA  @ΐ b  M@B @AA  @ΐ bA I c AA  @ΐΑ bA \@ϋI   c  #        has_mcu    os    execute &   nvram unset upgrade_flag;nvram commit    nvram set upgrade_flag=1 
   mcu_reset 	   	   ,   nvram get upgrade_flag | grep 1 > /dev/null 	       killall mcud    sleep 1                     y   ~        
     @ H@  "    @ 	  #  	   #  #        isfile    /usr/bin/ledctrl                                    "    ΐ @   @ Hΐ  "@ 	  #  #        has_ledctrl    os    execute    ledcli STATUS_SAN                            .   J   @ ΐ  b ΐ ΐ  ΐ@Θ  ’@ @ Θ ’ ΐΐA  β@ Κ   Β@ Α@ β@ Α β@ Αΐ β@ Κ  ΐΐΐ β@ Κ   ΐ@Γ β@ ΐ  D@DΘ 
Χ ’@   ΐ@Θΐ ’@ #     
   fork_call    nvrammanager -c "%s" 	       printf    firmware check OK    require    luci.sys.config    mergeconfig    yes 
   clean_mem    mcu_confirm    sysled_twinkle    upgrade firmware... 
   fork_exec    nvrammanager -u "%s"    luci    sys    call    rm -f     firmware check fail                             