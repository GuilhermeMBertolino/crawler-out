LuaQ                     H@  " A  Ā  Á  A â  H " b  ĀÁ  HA ĸ ĀB@Cá      Ā á@     Āc  #        require 	   nixio.fs    SimpleForm 	   firewall 
   translate    Firewall - Custom Rules ę   Custom rules allow you to execute arbritary iptables commands 
		which are not otherwise covered by the firewall framework. 
		The commands are executed after each firewall restart, right after 
		the default ruleset has been loaded.    field    Value    _custom 	   template    cbi/tvalue    rows 	   	   cfgvalue    write                      @Č@  ¤  Ŗ   #     	   readfile    /etc/firewall.user                     !   $       Æ @HA    â  Ę   ĀĀĀ [ â@#        gsub    
?    
 
   writefile    /etc/firewall.user                             