LuaQ               h      H@    ΐ@"@  H@ " A   b   Θΐ ’ Α   β  AB " EA DΑBDACDΑCDADDΑDDAEDΑEDAFDΑF ΘA A Ε HB  ίA HB B EΒ Θ Γ HC  ΘΓ 	 HD	 	 ΘΔ	 
 HE
 
 ΘΕ
  _B ΘB B Ε Γ ίB  HC C E Γ _C ‘       C ‘C     ‘              Γ C  ΕC  D  AΔ DΔΓαΓ     ΒΓ α  Β αC ΒC #  6      module    luci.controller.admin.region    package    seeall    require    luci.model.uci 	   luci.sys    luci.tools.debug    luci.model.controller    cursor 	   00000000    UN 	   55530000    US 	   45550000    EU 	   4B520000    KR 	   42520000    BR 	   4A500000    JP 	   43410000    CA 	   41550000    AU 	   52550000    RU    BZ    DE    GB    AR    BO    CL    CO    CR    EC    GT    MX    PA    PE    PY    SV    UY    VE    getCountryCode    regions    read_regions    region    .super    cb 	   dispatch    _index    index        @   W     	:   
     @ H@  "@    ΐ@ H  @ "@   J   b@ Hΐ c  F B b ΐFABΘ bMΐΒFABΘ bΑA B FΑCΑA ΡΔ b B J  @BA FD bA J  @ΑΔ bA AA c ^@  @ψFD b@ J   @ ΐ   b@ Hΐ c  #        call 1   nvrammanager -r /tmp/productInfo -p product-info    io    open    /tmp/productInfo    r    product info file open failed    UN    lines    find    special_id:     _    i    sid    sub 	      ret    close    exec    rm -f /tmp/productInfo                     Y   d     	   !   J   F ΐ Θ@    b ΐ  #  #        get_profile    region    country 	           Z   c     
   Q ΐ @     Ζ@@H  β ΐΐ   G@ IA  I  Ϋ [£#     	      match    ^([^:]*):([^:]*):([^:]*)$    y                                 f        H      E      ’ @@@ J   @@ J  ΐ@@ J   A@ J @A@ J  A@ J ΐA@ J    B  J @B Α β    ΒBΕΒ  ΔΒΔΔBΐή  ύΐΑ β  Β Ϋ ’ ΐΦ  ΡΓΒΔ  ΔD    ύή  ϋ#  #        getCountryCode    US    EU    KR    BR    JP    CA    AU    RU    UN    regions 	      value    name    no_autodetect    pairs                               J   @ ΐ   Ϋ   d c   #     	   dispatch                         ’        
     @ A@  $  #   #        _index 	   dispatch                     €   ¦            E  @  Θ  _@ ΐ  Θ  ’  "  Α#        entry    admin    region    call    _index    leaf                             