LuaQ               	ΰ      H@  "@ ΐ  H  @ Θ ’ Α@ Α H Aβ  "    @  B  ΐB   C " A   @ b   ΐC HA A Θ ’ ’     Ε  Ε ΐE @F HΑ A Θ ’ ’    @ @GGΐGΑ  ’@  @FA H A ΘΑ ’ ΑA 	 β ’      Ι   Κ @FA H
 A ΘΑ
 ’ ΑA  β ’  @
 @
 Λ@
 Ι@
  Ε @FA H A ΘA ’ ’  ΐ ΐ Ιΐ  Ε @FA H A ΘΑ ’ ’     Ν @Ν  Ε @FA H A ΘΑ ’ ’     Ξ @Ξ  Ε      ΐC H A ΘΑ ’ ’     Ε  Ε ΐE @F HΑ A Θ ’ ’    @ @GGΐGΑ  ’@  @FA H A ΘΑ ’ ΑA  β ’      @Ο   Κ @FA H A Θ ’ ’  ΐ ΐ @Οΐ  Ε @FA H A ΘΑ ’ ’     Ν ΐΟ  Ε @FA H A ΘΑ ’ ’     Ξ @Ξ  Ε  £  #  @      require    luci.tools.webadmin    m    Map    network 
   translate    Routes K   Routes specify over which interface and gateway a certain host or network     can be reached.    luci    sys    net    routes6    bit    s    section    TypedSection    route    Static IPv4 Routes 
   addremove 
   anonymous 	   template    cbi/tblsection    iface    option 
   ListValue 
   interface 
   Interface    tools 	   webadmin    cbi_add_networks    t    Value    target    Target B   Host-<abbr title="Internet Protocol Address">IP</abbr> or Network 	   datatype    ip4addr    rmempty     n    netmask >   <abbr title="Internet Protocol Version 4">IPv4</abbr>-Netmask    if target is a network    placeholder    255.255.255.255    g    gateway >   <abbr title="Internet Protocol Version 4">IPv4</abbr>-Gateway    metric    Metric 	       range(0,255)    mtu    MTU 	ά     range(64,9000)    route6    Static IPv6 Routes P   <abbr title="Internet Protocol Version 6">IPv6</abbr>-Address or Network (CIDR)    ip6addr >   <abbr title="Internet Protocol Version 6">IPv6</abbr>-Gateway    range(0,65535)                 