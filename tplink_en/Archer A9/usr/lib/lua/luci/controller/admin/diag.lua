LuaQ                     H@    À@"@  H@ " A   b   ÈÀ ¢ Á   â  HA " A  b  ÈÁ ¢ È B H Â È 	 a  ¡C    á    !Ä   a   ¡D                 á     ÂD áÄ Â á ÂÄ áD Â á                  !Å   	 	a    ¡E          
 á    
    !Æ    a    
   ¡F     á      G  E G  DG  DG  ÇDG  DGaÇ    BÇ a  B aG BG #        module    luci.controller.admin.diag    package    seeall    require    luci.tools.debug    ubus    io 
   luci.util    luci.model.uci    luci.model.controller    luci.tools.datatypes    /tmp/diagnostic/luci_ping    /tmp/diagnostic/luci_trace    /tmp/diagnostic/luci_FIN    /tmp/diagnostic    /tmp/diagnostic/luci_TIME    check_network    lua_string_split 
   formatfix    formatModify    diag    start    cb    stop    read 	   continue 	   dispatch    _index    index        !   ,     	     B ÂBÂ# #        type    ipaddr    count    pktsize    timeout    ttl    finish    result                     .   6     *   
     @ " E  @ Á  H A ¢@     D@ Á  H  ¢@    @ D@ Á  H Á ¢@      D @ Á  H  ¢@    À Dc  #        cursor 	   my_count    get    diagnostic    params    count 	      my_pkt    pktsize 	@      my_timeout    timeout 	      my_ttl    ttl 	                       8   ?       
   @" FA@È  Â  H   bA FA@È  Â  HB  bA FA@È  Â  H  bA FA@È  Â  HÂ bA FBÈ  bA#  	      cursor    set    diagnostic    params    count    pktsize    timeout    ttl    commit                     A   C        
   H   @  È  Á  "@#     	   	@   	   	                       E   O       H      @@Û   ¢    @Æ@HÁ  â[ Æ Aâ@ c  #             open    read    *all    close                     T   8   )Ï  J   @ À b @@ @      ÀÀ@ Ù@    È   A A      @AA YA    H  A A      ÆÁÁ H B È âÙA    ÈÁ  AB  b B Û¢ Ù   eÆÃHÃ âÙ  @d@ÀÆÂÁ H C È âA   B   ÆÂÁ H C ÈC âB  B ÁB  â  D   YB  @ÆÂÁ H C È âA  Á H @@NBÅÁ ÀÂÅâ [  H Ê  [ ÛâBÁ ÀBÆÀÆÃ J CâB Á ÀBÇÀÇ
â Ù   Á ÀBÇÀÂÇ
âB Á ÀBÆÀÆ AC @Èb  C âB Á ÀBÆÀÆÃ JCâB È 	 H   È  H  È J @EÉ
b É
Æ	 ¢ÆÊ
âE @J   /ÑÅÊÀÊ[ ÛFâ Ù  À& J @FÉÈ bYF  @ FIÊ ¢[  ÈF ¢F ÀüKÛ¢ ÇÇ [ "  Å 	 ÅFCÈ bY  ÀFHÌÛ  ×bHFCÈÈ bE  @FCÈ bY  @FHÌÈH bH À@ FHÌÈH bH ÀFCÈ bY  FÈMÈ bY   FCÈH bC ¢Û  EÃÈ OÈH 	 
[	 	Û	
	¢  FCÈ bÈÄ  EÃÈ OÈ 	 
[	 	Û	
	¢ FHÌÛ  ×bHE	 AH 	b @ÐÀAH @ÐÈ È ÈbH  @FÈMÈ bY   FHÌÈ bH @    â E@M EÀ GÌG "GQÅÊ"G  E  @F [	" Û F [ "  À  Û	 	  	À Î  ÍA @EÆ
@Æ
 ÊÅbE D G
  ÇÆ [ "@ Û  ÀþNÃ
  FIJ "[ YE  @
  FIJ "[ 
 HF "F ÀüFÌ
Æ£"FFÌ
 Û 	[GÒÇF ¤"FFÌ
Û [F¥"FÊ
"F   EIÊ ¢[ YE  @ EIÊ ¢[  ÈE ¢E ÀüEÌ
Æ£¢EEÌ
 [ 	ÛGÒÇF ¤¢EÊ
¢E Ê
â Ê  [ Û  [Ä Û äã  #  L      cursor    type        ipaddr    count    pktsize    timeout    get    diagnostic    params    ttl 	        	   tonumber    match    ^[a-zA-Z0-9%-%.:_]+$ 	   	@   	    	   	   	è     math    floor    luci    sys 
   fork_call    mkdir     nixio    fs    access    remove    echo %d > %q    os    time    echo 'START' >  	?B    open    read    *l    close    FINISH    exec    ping -c 1 -W %d -s %d %q 2>&1    a    no file open    split    pairs    ^PING    write    
    .*%((.*)%).*    ^ping J   There is no response from DNS .
    please check the domain name or DNS.
    bytes from    find    time=    .*ttl=(%d+) time.*    .*time=([%d%.]+) ms.*    string    format 7   Reply from %s:  bytes=%d  ttl=%d  seq=%d  time=%.3f ms    .*ttl=(%d+).*    0.1 7   Reply from %s:  bytes=%d  ttl=%d  seq=%d  time<%.3f ms 	È      execute    sleep  ;   Network is unreachable .
    please check the ip address.
    Request timed out !
    echo 'FINISH' >     
--- Ping Statistic %q ---
 6   Packets: Sent=%d, Received=%d, Lost=%d (%.2f%% loss)
 	d   ,   Round-trip min/avg/max = %.3f/%.3f/%.3f ms
    1                     ;  I    #   
     @ " J  @@À b @ Á  H A ¢@     Y   ÀÆÀÁ H A Å  âÙ       @  B  @ 	 # É   ã  #        cursor    connect    get    network    wan    ifname    eth0    call    network.device    status    link                     K  `    
5      Á   À@À  [ âÙ@     Á@[ " A  @Á ÑAA  bA À   A[  A ÐAÁ" MÀAÀM B@A  @ÁÀ b   AÛ BÁ[ ¢A A  @AÂ  b   AÛ  BÁ[¢   @ó£  #  
      string    find    table    getn    insert 	      sub             len                     b  e       A   @@À   Û   b  #  #        string    format 	   %-20.25s                     g       »   H   @  Û     ¢ÁÀ  À Á â   HA A È  HB  ÁÂ ÀÂC @Bâ[ ÈÂ H ÝÀÆÃHD âÙ  ÀÁÃ  ÀÁ â QÂÁÃ  ÀÃ [ âC  ÀÆÃHÄ âÙC  ÀÆÃH âÙC   ÀÆÃHD âÙC  ÀÆÃH âÙC   ÑBÀÆÃHÄ âÙ    Á  â ÁÃ ÀÂD [  â [ À ÀÃÆÃH âÙ  ÁÃ ÀÂÄ @Äâ Á  â ÁÃ ÀÂD [  â [ ÀÀÆÃH âÙC  @ H  ÀÆÃH âÙ  ÀÿÜÂåBÀÁÂ ÀÂ [ C â [  ÂÀÁÂ ÀÂÃ [ Bâ ÁÂ ÀÂ [  â [ @ ÁÂ ÀÂÃ @B@CÃBâ ÁÂ ÀÂ [  â [ ÀÁÂ ÀÂ [ Bâ [ c  #            lua_string_split         table    getn 	    	      string    format    %-10s  	   	      find    .*%..*%..*    insert    !H    !N    !P    !S    %* 
   formatfix    %s %s    ms    %s%s 	   %s %-25s    Request timed out                     £  %  
 !  J   @ À b @@ @      ÀÀ@ Ù@    È  Á A È Â "A     FÁ ÈA  HB bYA    H Á B H Â ¢A     ÀAC ÙA    È   HÂ  ÁB  â  ÃÄ"  D 8Ù   +FÅÈC bY  @*MÀ@A b KÀÃ A b @ÀFÁ ÈC  HD bÚA  È J  Û [bCAC @Æ@ÃÆ Ê ÃbC @CÇ@Çb Y  À @CÇ@ÃÇbC AC @Æ@ÃÆ ÁC ÀÈâ 
 C bC J@ÃÈ ÛC b  Y   ÆCÉH	 âÀÃ Ù   ÄÉ
 "  À
  Ä@["   DÊ
 È  " Û   ÈÃ
 H Ù  ÄÉ "    ÈC  DÄÉ "  @ Â ÀÄÉÄ "  @   ÄÉD "  @  @ÄÉÄ "     ÀC@
["D  [" Û 
["D Ã 
 DMJ "D  @J@DÍÈ bJÄ bD ÀüFNÛE ×	bDFNbD æ   æÆÎâC J b B   HÃ ÀC@ H  L@ HC L@ H   B  HÃ CMÊ ¢C  @ÊÀCÍ
H âÊÄ âC ÀüÆN[âCÆNâC Û  @Ð bC J Û [ ÛE [ dc  #  B      cursor    type        ipaddr    get    diagnostic    params    count 	      pktsize 	@      timeout 	      ttl      	   	       require    nixio    fork    match    ^[a-zA-Z0-9%-%.:_]+$ 	   tonumber 	   	      luci    sys 
   fork_call    mkdir     fs    access    remove    echo %d > %q    os    time    popen !   traceroute -I -w 1 -m %d %q 2>&1    read    *l    find    traceroute to    gsub     %(.*%)    BAD ADDRESS    Network is unreachable     1 *  *  *  !N    !H    !N 	      !P 	      !S    formatModify    open    a    no file open    write    
    close    Trace Complete.
    Host is Unreachable.
    Network is Unreachable.
    Protocol is Unreachable.
    Source Route Failed.
    waitpid    1                     +  6      @ @ Y@    H@    À  Ê     â  @ÀÀ À Ê    â  Ú@   É   ã  #        type        0    1                     8  Q   
,   J   @ À  b    Ç Y   @À Á  "A    @J @Á b J @AÁ È Â I bÛ @ÂY  @úAÂ [  B¢  øÀÂ  À÷Ã "A £  #        popen    ps | grep %q    read    *l    trim    split     + 	c   	      match    ^ 	      close                     T  ~   m   J   @ À b @@ @      ÀÀ@ Ù@    È   AA A   Á Á È B "@AB YA   FÁ ÈÁ  HB bB A   Á Â H  ¢ÀÁB ÙA   ÆÁ HÂ  ÈÂ â HB  CÊ ¢ ÆÂCH âCD"C Ä@ H  Àÿ
J " AÃ @Åb C Û ¢ PÊ¢ B    @  CHB Ã FCFÈ 
 ×¢C  ÈÃ ¢    ÁÃ ÀÆÀÇâC  Û [ Û [ ¤£  #        cursor    type 	       ipaddr        count    get    diagnostic    params    pktsize    timeout    ttl      	      open    read    *l    close    START    os    time 	   tonumber 	      luci    sys 
   fork_call    echo 'FINISH' >     ping    call    kill -9 %q J   There is no response from DNS .
    please check the domain name or DNS.
                       ¤   T   J   @ À b @@ @      ÀÀ@ Ù@    È   AA A   Á Á È B "@AB YA   FÁ ÈÁ  HB bB A   Á Â H  ¢ÀÁB ÙA   ÆÁ HÂ  ÈÂ â H   ÈB ¢   @ H ÀÿÊ 
â B   ÆÂCH âÙ   H     ÁB ÀÄÀÂÄâB B Ê  [ Û [Û äã  #        cursor    type 	      ipaddr        count    get    diagnostic    params    pktsize    timeout    ttl         traceroute 	       find    BAD ADDRESS    luci    sys    call    kill -9 %q K   There are no response from DNS .
    please check the domain name or DNS.
                     ©  µ      @ @ Y@    H@    À  Ê     â  @ÀÀ À Ê    â  Ú@   É   ã  #        type        0    1                     ¼  ä   c   Ê   À Àâ  A@ A      @Á@ YA   FÁÈA  HÂ  bÁA A   ÁB H Â ¢ÀB ÙA   ÆÁHB  È â BB B   ÁB È C "@B YB    H  Â  Ã Ê  â Ù   C  C ÃCRÃ"C @Ä  ÁB ÀÃÀÄÃ J CâB Ê  â Ù   C  C ÃCRÃ"C Ê â ÀB  B Û  H BÊ [ Û [ Ä Û äã  #        cursor    ipaddr        count    get    diagnostic    params    pktsize    timeout    ttl    type         traceroute    luci    sys    call    kill -9 %q    ping 
   fork_call    echo 'FINISH' >     kill -2 %q K   There are no response from DNS .
    please check the domain name or DNS.
     is stopped. 
    1                     ç  ó      @ @ Y@    H@    À Ê     HÁ   â  À Á @Ê     HA  â  £  #        type        0    ping    1    traceroute                     õ     9   J   @ À b   ¢@ @À   HÁ   ¢@    @ Æ@À H  Á  È âÙ@    ÈÀ AÀ   ÈÁ   "A    A FAÀ È  Â  H bYA    HÁ AÀ   HÂ   ¢A    A Ê  [  Û [C ÈÃ äã  #        cursor    get    diagnostic    params    count 	      pktsize 	@      timeout 	      ttl 	      ipaddr     	       The Router is ready.
                             J   @ À   Û   d c   #     	   dispatch                              
     @ A@  $  #   #        _index 	   dispatch                                  E  @  È  _@ À  È  ¢  "  Á#        entry    admin    diag    call    _index    leaf                             