LuaQ               
3      H@    ΐ@"@  H@ " A   b   Θΐ ’ Α   β  HA " H ‘       Α ‘A         A  Ε  B  AΒ BΔB  A BΔΑα     ΒA αΑ   Β α ΒΑ #        module !   luci.controller.admin.ledgeneral    package    seeall    require    luci.model.uci    luci.tools.datatypes 	   luci.sys    luci.model.controller    luci.model.subprocess    /etc/init.d/ledgeneral reload    get    set    setting    read    cb    write 	   dispatch    _index    index           3     
X   
     @ " J   @@ΐ b @ Α  H ’ @    @ A 
Θΐ 
  BHA " Ϋ  MΐΑ  ΑB[ ΘA " Ϋ  Γΐ  ΔF@ Θ B b YA    HΑ A# 
  ΓF@ Θ B b YA    HΑ A# Ζ Ε HA  ΘΑ βΑ  FE Θ  HΒ bYA    H AF@ Θ B b YA    HΑ AΖ HΑ YA    HΑ A# #        cursor    cursor_state    get_profile    lp5523    message 
   chip-down    chip-on        exec 4   [ -f /tmp/led_nightMode ] && cat /tmp/led_nightMode    string    sub 	    	      on    enable    off    ledst_support    ledctrl    no    get    systime    core    sync    GENERAL 	   time_set    1    yes                     5   j    M   J   @ ΐ b @ΐ   HΑ  ’ @      @A 
Θ 
  ΑAH " Ϋ  MΑA  B[Α Θ " Ϋ  @Γΐ
  ΑAH "A 
  ΑCH "A A  AΓ# 
  ΑAH "A 
  ΑCHΑ "A A  Ε# Α@ β A @AΔ@Γ   FΕ ΘΑ  HB  bA FAΖ ΘΑ bAJ @ΑΓ bA AA d c  #        cursor    get_profile    lp5523    message 
   chip-down    chip-on        exec 4   [ -f /tmp/led_nightMode ] && cat /tmp/led_nightMode    string    sub 	    	      on     echo 'off' > /tmp/led_nightMode 
   fork_exec 1   ubus send leds '{"action" : "4","status" : "0"}'    enable    echo 'on' > /tmp/led_nightMode 1   ubus send leds '{"action" : "4","status" : "1"}'    off    get    set    ledctrl    GENERAL    commit                     s   u       J   @ ΐ   Ϋ   d c   #     	   dispatch                     w   y        
     @ A@  $  #   #        _index 	   dispatch                     {   }            E  @  Θ  _@ ΐ  Θ  ’  "  Α#        entry    admin    ledgeneral    call    _index    leaf                             