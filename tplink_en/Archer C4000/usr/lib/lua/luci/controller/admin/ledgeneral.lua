LuaQ               
3      H@    ΐ@"@  H@ " A   b   Θΐ ’ Α   β  HA " H ‘       Α ‘A         A  Ε  B  AΒ BΔB  A BΔΑα     ΒA αΑ   Β α ΒΑ #        module !   luci.controller.admin.ledgeneral    package    seeall    require    luci.model.uci    luci.tools.datatypes 	   luci.sys    luci.model.controller    luci.model.subprocess    /etc/init.d/ledgeneral reload    get    set    setting    read    cb    write 	   dispatch    _index    index           2     	W   
     @ " F@@ Θ  Α  b Y@    H  @Α  
 Κ  ΐΐΑ β  MAΑ@ ΐΒ HΑ  β  @CΐΕ  ΔΐCA@ A Θ " A     Δ γ   Ε  Δ@CA@ A Θ " A     Δ γ     ΐAΘΐ ’ Εΐ  E A ΘA  "A    Α Δ A@ A Θ " A     Δ ΑE "   A A     Δ γ  #        cursor    get_profile    lp5523    message 
   chip-down    chip-on        exec 4   [ -f /tmp/led_nightMode ] && cat /tmp/led_nightMode    string    sub 	    	      on    enable    off    ledst_support    ledctrl    no 2   [ -f /tmp/ledpm_enable ] && cat /tmp/ledpm_enable    get    GENERAL 	   time_set    find    1    yes                     4   i    M   J   @ ΐ b @ΐ   HΑ  ’ @      @A 
Θ 
  ΑAH " Ϋ  MΑA  B[Α Θ " Ϋ  @Γΐ
  ΑAH "A 
  ΑCH "A A  AΓ# 
  ΑAH "A 
  ΑCHΑ "A A  Ε# Α@ β A @AΔ@Γ   FΕ ΘΑ  HB  bA FAΖ ΘΑ bAJ @ΑΓ bA AA d c  #        cursor    get_profile    lp5523    message 
   chip-down    chip-on        exec 4   [ -f /tmp/led_nightMode ] && cat /tmp/led_nightMode    string    sub 	    	      on     echo 'off' > /tmp/led_nightMode 
   fork_exec 1   ubus send leds '{"action" : "4","status" : "0"}'    enable    echo 'on' > /tmp/led_nightMode 1   ubus send leds '{"action" : "4","status" : "1"}'    off    get    set    ledctrl    GENERAL    commit                     r   t       J   @ ΐ   Ϋ   d c   #     	   dispatch                     v   x        
     @ A@  $  #   #        _index 	   dispatch                     z   |            E  @  Θ  _@ ΐ  Θ  ’  "  Α#        entry    admin    ledgeneral    call    _index    leaf                             