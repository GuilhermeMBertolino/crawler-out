LuaQ               �      H@  "@    H�  "@    H�  "@    A  �@ ��A��A� B� � b  ���A ��A��A�AB���� �A ����������� �B � [ ��B �E�  DB���� � �� D���D��@^�  ��A  �@ �� � � � H " b�  B� A� D�ŊA� D�ŋA� F@� ��   b� B  A  F � �@ A A� �� b b�  B� A  F � �@ A A� � b b�  B� A  F � �� � A� �	 b b�  B@ A@ �      D���A@ �@     D� �A  F � �� �	 A� �
 b b�  B�	 A�	 D�ʔA�	 ��     D� �A  F � �� �
 A� � b b�  B�
 A�
 D@˔A�
 ��	 ��ID� �A  F � �� � A� �� b b�  B� A� D ̔A� ��	 ��ID� �A  �� �� � � � H " b�  B@ A@ F�� ��  b� B@ A@ D�ΜA@ D ϝA@ ��  D���A@ �  D� �A� �@ c �# � ?      require    luci.fs 	   luci.sys 
   luci.util    ipairs    luci    sys    init    names    index    enabled 	�      %02i.%s    name 	   tostring    m    SimpleForm    initmgr 
   translate    Initscripts �   You can enable or disable installed init scripts here. Changes will applied after a device reboot.<br /><strong>Warning: If you disable essential init scripts like "network", your device might become inaccesable!</strong>    reset     submit    s    section    Table    i    option    DummyValue    Start priority    n    Initscript    e    Button 
   endisable    Enable/Disable    render    write    start    Start    inputstyle    apply    restart    Restart    reload    stop    Stop    remove    f    rc    Local Startup �   This is the content of /etc/rc.local. Insert your own commands here (in front of 'exit 0') to execute them at the end of the boot process.    t    field 
   TextValue    rcs    rmempty    rows 	   	   cfgvalue    handle        2   <       �   �@�� ��   @���  �  � ���@A� ���  � � ����A��  �@�  [� � �@ # � 
      enabled    title 
   translate    Enabled    inputstyle    save 	   Disabled    reset    Button    render                     >   F       �   �@ � @�    ��   �@ �@@���  ��@� A�@A�   �@�����  �   ���   �@ ��A���  ��@� A� B�   �@�����  �   # � 	      enabled     luci    sys    init    disable    name    enable                     K   M       �   �@@��@�  
   A  A@AA �@ �����@ # �       luci    sys    call    /etc/init.d/%s %s >/dev/null    name    option                     `   b      
       @@  �@ H�  "� @    �  #  # �       luci    fs 	   readfile    /etc/rc.local                         d   k     	   �   ��  ��@@�   @���  ���� �A @A@F����  b �@  � � �  # � 	      FORM_VALID    rcs    luci    fs 
   writefile    /etc/rc.local    gsub    
    
                             