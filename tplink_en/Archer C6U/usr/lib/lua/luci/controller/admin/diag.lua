LuaQ               ,³      H@    À@"@  H@ " A   b   ÈÀ ¢ Á   â  HA " A  b  ÈÁ ¢ È B H Â È 	 E  DÄDÅ  ÄCÅÅ  ÄÄÄÅÄ H ¡  áD    !    aÅ    
¡   áE     
               	!     F !Æ     
                	a    ¡F    á              	!Ç           	a    ¡G          	á      !È    
  	a   ¡H   á   !É   a	 ¡I   á         !Ê             E  
 ÅJ  ÄJÊÅJ  ÄÊÊÅJ  Ä
Ê
ÅJ  ÄJÊD
  ÅJ  ÄJÊ
ÅJ  Ä

ÊD
¡
    ¡J  Ê ¡ 
	 #  %      module    luci.controller.admin.diag    package    seeall    require    luci.tools.debug    ubus    io 
   luci.util    luci.model.uci    luci.model.controller    luci.tools.datatypes    /tmp/diagnostic/luci_ping    /tmp/diagnostic/luci_trace    /tmp/diagnostic/luci_FIN    /tmp/diagnostic    /tmp/diagnostic/luci_TIME    page 	      reg 	   	   	      0x8000    0x0    check_network    diag    start    cb    stop    read 	   continue    port_mirror    write 	   dispatch    _index    index        2   =     	     B ÂBÂ# #        type    ipaddr    count    pktsize    timeout    ttl    finish    result                     ?   G     *   
     @ " E  @ Á  H A ¢@     D@ Á  H  ¢@    @ D@ Á  H Á ¢@      D @ Á  H  ¢@    À Dc  #        cursor 	   my_count    get    diagnostic    params    count 	      my_pkt    pktsize 	@      my_timeout    timeout 	      my_ttl    ttl 	                       I   P       
   @" FA@È  Â  H   bA FA@È  Â  HB  bA FA@È  Â  H  bA FA@È  Â  HÂ bA FBÈ  bA#  	      cursor    set    diagnostic    params    count    pktsize    timeout    ttl    commit                     R   T        
   H   @  È  Á  "@#     	   	@   	   	                       V   `       H      @@Û   ¢    @Æ@HÁ  â[ Æ Aâ@ c  #             open    read    *all    close                     e   D   )Ä  J   @ À b @@ @      ÀÀ@ Ù@    È   A A      @AA YA    H  A A      ÆÁÁ H B È âÙA    ÈÁ  AB  b B Û¢ Ù   ÀbÆÃHÃ âÙ  a@ÀÆÂÁ H C È âA   B   ÆÂÁ H C ÈC âB  B ÁB  â  D   YB  @ÆÂÁ H C È âA  Á H @@NBÅÁ ÀÂÅâ [  H Ê  [ ÛâBÁ ÀBÆÀÆÃ J CâB Á ÀBÇÀÇ
â Ù   Á ÀBÇÀÂÇ
âB Á ÀBÆÀÆ AC @Èb  C âB Á ÀBÆÀÆÃ JCâB È 	 H   È  H  È J @EÉ
b É
Æ	 ¢ÆÊ
âE @J  @,ÑÅÊÀÊ[ ÛFâ Ù   $ J @FÉÈ bYF  @ FIÊ ¢[  ÈF ¢F ÀüKÛ¢ ÇÇ [ "@ Å 	 ÅFCÈ bY  ÀFHÌÛ  ×bHFCÈÈ bE  @FCÈ bY  @FHÌÈH bH  @ FHÌÈH bH  FCÈ bY  ÀFÈMÈ bY   FCÈH bC ¢Û  EÃÈ OÈH 	 
[	 	Û	
	¢  FCÈ bÈÄ  EÃÈ OÈ 	 
[	 	Û	
	¢ FHÌÛ  ×bHE	  @FÈMÈ bY   FHÌÈH bH @   Àä E@M EÀ GÌ "GQÅÊ"G  E  @F [	" Û F [ "  À  Û	 	  	ÀÀÐ  @ÐA @EÆ
@Æ
Å ÊÅbE D G
  ÇÆ [ "@ Û  ÀþNÃ
  FIJ "[ YE  @
  FIJ "[ 
 HF "F ÀüFÌ
Æ ¢"FFÌ
 Û 	[ÑÇF ¢"FFÌ
Û [F£"FÊ
"F   EIÊ ¢[ YE  @ EIÊ ¢[  ÈE ¢E ÀüEÌ
Æ ¢¢EEÌ
 [ 	ÛÑÇF ¢¢EÊ
¢E Ê
â Ê  [ Û  [ Û äã  #  I      cursor    type        ipaddr    count    pktsize    timeout    get    diagnostic    params    ttl 	        	   tonumber    match    ^[a-zA-Z0-9%-%.:_]+$ 	   	@   	    	   	   	è     math    floor    luci    sys 
   fork_call    mkdir     nixio    fs    access    remove    echo %d > %q    os    time    echo 'START' >  	?B    open    read    *l    close    FINISH    exec    ping -c 2 -W %d -s %d %q 2>&1    a    no file open    split    pairs    ^PING    write    
    .*%((.*)%).*    ^ping I   There is no response from DNS.
    please check the domain name or DNS.
    bytes from    find    time=    .*ttl=(%d+) time.*    .*time=([%d%.]+) ms.*    string    format 7   Reply from %s:  bytes=%d  ttl=%d  seq=%d  time=%.3f ms    .*ttl=(%d+).*    0.1 7   Reply from %s:  bytes=%d  ttl=%d  seq=%d  time<%.3f ms :   Network is unreachable.
    please check the ip address.
    Request timed out!
    echo 'FINISH' >     
--- Ping Statistic %q ---
 6   Packets: Sent=%d, Received=%d, Lost=%d (%.2f%% loss)
 	d   ,   Round-trip min/avg/max = %.3f/%.3f/%.3f ms
    1                     G  U    #   
     @ " J  @@À b @ Á  H A ¢@     Y   ÀÆÀÁ H A Å  âÙ       @  B  @ 	 # É   ã  #        cursor    connect    get    network    wan    ifname    eth0    call    network.device    status    link                     X  È  
   J   @ À b @@ @      ÀÀ@ Ù@    È  Á A È Â "A     FÁ ÈA  HB bYA    H Á B H Â ¢A     ÀAC ÙA    È   HÂ  ÈB ¢ ÀDâ ÀÄ@0Ù   À ÅC "  MÀ@ [" KÀC  ["  ÀÁ C È D "ÚA   È 
 [ Û "CC  F ÃFH  W"C  CG GJ"   À  CG ÃGJ"C C  F ÃFE C H¢ Ê _C RC"C 
 ÃHE Û_C RC"   FCIÈ	 bÀÃ Y   ÃÉ
 ¢  À Ã@Û¢   CÊ
 H  ¢ [   HÃ
 HÂ Y   ÃÉ ¢    HC KÊÄ ¢C  @ÊÀË
HÄ âÊ âC ÀüÆCL[ WâCÆÃLâC  ñ  ðFÃLbC 
 J" B     FÃIÈC bY  @  ÀFÃIÈÃ bY  @   FÃIÈC bY  @  @FÃIÈÃ bY     J@ËÈÃ bYC  @KÊÄ ¢[ È ¢C ÀüCÌ ¢CÃÌ¢C  Û Â  CO["C 
[ Û [ È  $#  #  ?      cursor    type        ipaddr    get    diagnostic    params    count 	      pktsize 	@      timeout 	      ttl      	      require    nixio    fork 	       match    ^[a-zA-Z0-9%-%.:_]+$ 	   tonumber 	   	      luci    sys 
   fork_call    mkdir     fs    access    remove    echo %d > %q    os    time    popen !   traceroute -I -w 1 -m %d %q 2>&1    read    *l    find    traceroute to    gsub     %(.*%)    BAD ADDRESS    Network is unreachable     1 *  *  *  !N    open    a    no file open    write    
    close    Trace Complete.
    !H    Host is Unreachable.
    !N    Network is Unreachable.
    !P    Protocol is Unreachable.
    !S    Source Route Failed.
    waitpid    1                     Î  Ù      @ @ Y@    H@    À  Ê     â  @ÀÀ À Ê    â  Ú@   É   ã  #        type        0    1                     Û  ô   
,   J   @ À  b    Ç Y   @À Á  "A    @J @Á b J @AÁ È Â I bÛ @ÂY  @úAÂ [  B¢  øÀÂ  À÷Ã "A £  #        popen    ps | grep %q    read    *l    trim    split     + 	c   	      match    ^ 	      close                     ÷  !   m   J   @ À b @@ @      ÀÀ@ Ù@    È   AA A   Á Á È B "@AB YA   FÁ ÈÁ  HB bB A   Á Â H  ¢ÀÁB ÙA   ÆÁ HÂ  ÈÂ â HB  CÊ ¢ ÆÂCH âCD"C Ä@ H  Àÿ
J " AÃ @Åb C Û ¢ PÊ¢ B    @  CHB Ã FCFÈ 
 ×¢C  ÈÃ ¢    ÁÃ ÀÆÀÇâC  Û [ Û [ ¤£  #        cursor    type 	       ipaddr        count    get    diagnostic    params    pktsize    timeout    ttl      	      open    read    *l    close    START    os    time 	   tonumber 	      luci    sys 
   fork_call    echo 'FINISH' >     ping    call    kill -9 %q I   There is no response from DNS.
    please check the domain name or DNS.
                     &  G   T   J   @ À b @@ @      ÀÀ@ Ù@    È   AA A   Á Á È B "@AB YA   FÁ ÈÁ  HB bB A   Á Â H  ¢ÀÁB ÙA   ÆÁ HÂ  ÈÂ â H   ÈB ¢   @ H ÀÿÊ 
â B   ÆÂCH âÙ   H     ÁB ÀÄÀÂÄâB B Ê  [ Û [Û äã  #        cursor    type 	      ipaddr        count    get    diagnostic    params    pktsize    timeout    ttl         traceroute 	       find    BAD ADDRESS    luci    sys    call    kill -9 %q J   There are no response from DNS.
    please check the domain name or DNS.
                     L  X      @ @ Y@    H@    À  Ê     â  @ÀÀ À Ê    â  Ú@   É   ã  #        type        0    1                     _     c   Ê   À Àâ  A@ A      @Á@ YA   FÁÈA  HÂ  bÁA A   ÁB H Â ¢ÀB ÙA   ÆÁHB  È â BB B   ÁB È C "@B YB    H  Â  Ã Ê  â Ù   C  C ÃCRÃ"C @Ä  ÁB ÀÃÀÄÃ J CâB Ê  â Ù   C  C ÃCRÃ"C Ê â ÀB  B Û  H BÊ [ Û [ Ä Û äã  #        cursor    ipaddr        count    get    diagnostic    params    pktsize    timeout    ttl    type         traceroute    luci    sys    call    kill -9 %q    ping 
   fork_call    echo 'FINISH' >     kill -2 %q J   There are no response from DNS.
    please check the domain name or DNS.
     is stopped. 
    1                             @ @ Y@    H@    À Ê     HÁ   â  À Á @Ê     HA  â  £  #        type        0    ping    1    traceroute                       ¤   9   J   @ À b   ¢@ @À   HÁ   ¢@    @ Æ@À H  Á  È âÙ@    ÈÀ AÀ   ÈÁ   "A    A FAÀ È  Â  H bYA    HÁ AÀ   HÂ   ¢A    A Ê  [  Û [C ÈÃ äã  #        cursor    get    diagnostic    params    count 	      pktsize 	@      timeout 	      ttl 	      ipaddr     	       The Router is ready.
                     ¦  ²    E   
     @ " EÀ @ Á  H A  ¢@    @ D@ Á  H Á ¢@      D @ Á  H  ¢@      D@ Á  H  ¢@      D@ Á  H  ¢@      D@ Á  H  ¢@      D@ Á  H  ¢@    À Dc  #        cursor    enable    get    diagnostic    port_mirror    off    wan    mirror_port_wan    0    lan1    mirror_port_lan1    lan2    mirror_port_lan2    lan3    mirror_port_lan3    lan4    mirror_port_lan4    mirroring_port    monitor_port    1                     ´  ¾   
1   Ê   À Àâ AÀ  ÈÁ   [  "A AÀ  ÈÁ  B @Á "A AÀ  ÈÁ  Â @Â "A AÀ  ÈÁ  B @Â "A AÀ  ÈÁ  Â @Ã "A AÀ  ÈÁ  B @Ã "A AÀ  ÈÁ  Â [ "A Ä  "A#        cursor    set    diagnostic    port_mirror    enable    mirror_port_wan 	      mirror_port_lan1 	      mirror_port_lan2 	      mirror_port_lan3 	      mirror_port_lan4 	      monitor_port    commit                     À  Ç       À  @@E À  È   H  _@@ ÀÀJ    @ À@  AA d  c   #        enabled    off    mirror_port    1    0    monitor_port                     É  Ì       
   "@ 
  $  #   #                          Î  Ù       H      Á@  ÀÀ  â À ÁÀAA  @ÁÁÀb Û AA  @AÁ Û bOAQ@ ÀAûc  #     	       math    abs 	      floor    pow 	
   	                       Û  ä      Ê   À À[   Û Aâ@ Ê   À À [   A â 
 [ " FÁÀÛ bY  @ #   I   c#        exec    et robowr 0x%x 0x%x 0x%x 2>&1    et robord 0x%x 0x%x 2>&1    match    set register fail                     æ  î       
   H     ¢@   Ê À@À
 @[  ¢@   Ê  À@À
  @[ ¢@   Ê À@À
 @[ ¢@ #     	       page    reg                     ð     \   @ @ Y@    H@   À@ Ù@    ÈÀ   A A    Á  @AA YA    HÁ  A A    Á  ÀÁA ÙA    ÈÁ  @À B Ù@    È@ @À À

  Á H  ÁÁ  â@À@Â@ ÓQÁACÞA  ÀýH Ê  [ âA Ê 
 ÂCJ@Ä âA Ê 
  ÂCJ @ÄâA Ê 
 ÂCJ@ÄâA ÀÃ @
 [  Û"A À @Ä @ 
 "A 
$ #  #        enable        wan    0    lan1    lan2    lan3    lan4    mirroring_port    1 	       pairs 	   	      on    page    reg    off                     %  '      J   @ À   Û   d c   #     	   dispatch                     )  +       
     @ A@  $  #   #        _index 	   dispatch                     .  0           E  @  È  _@ À  È  ¢  "  Á#        entry    admin    diag    call    _index    leaf                             