LuaQ               �      H@  "� A�  �  �@ � � A H� " b�  B�  A�  F@� �� � H b��B  A  D�ÆA  D ćA  F�� �� A AA � b b�  B@ A@ D ĊA  F�� �� � AA �� b b�  B� A� D ĊA  �   D� �A�  �@  D���@�F �� b� Y    (�A�  �@ �@ � � A H� " b�  B  A  F@� �� A AA � b b�  B  A  D ćA  D ĆA  F�� �� � AA �� b� �A �� � b�  B@ A@ D@I�A@ D D�A@ D ēA  F�� �� A
 AA �A
 b� �A ȁ
 � b�  B 
 A 
 D ˕A 
 D�˖A  F�� �  A AA �� b� �A �� � b�  B� A� D@M�A� D�M�A� �� � MD���A� D�C�A  F�� �  � AA �� b� �A � � b�  B@ A@ D@M�A@ D�M�A@ �@ � MD���A  F�� �  � AA �� b� �A � � b�  B@ A@ D@M�A@ D�M�A@ �@ ��MD���A  F@� �� � AA �� b� �A �� � b�  B@ A@ D�ÆA@ D ćA@ D Q�A@ ��  D� �A@ F�� �� � H b��B@ A@ D�M�A@ D�ҤA@ D�C�A@ ��     D���A@ �     D� �A�  �  c �# � M      require 	   nixio.fs    m    Map    system 
   translate    Router Password <   Changes the administrator password for accessing the device    s    section    TypedSection    _dummy     
   addremove  
   anonymous    pw1    option    Value 	   Password 	   password    pw2    Confirmation    cfgsections 
   on_commit    access    /etc/config/dropbear    m2 	   dropbear    SSH Access �   Dropbear offers <abbr title="Secure Shell">SSH</abbr> network shell access and an integrated <abbr title="Secure Copy">SCP</abbr> server    Dropbear Instance    ni 
   Interface >   Listen only on the given interface or, if unspecified, on all 	   template    cbi/network_netlist 	   nocreate    unspecified    pt    Port @   Specifies the listening port of this <em>Dropbear</em> instance 	   datatype    port    default 	      pa    Flag    PasswordAuth    Password authentication D   Allow <abbr title="Secure Shell">SSH</abbr> password authentication    enabled    on 	   disabled    off    rmempty    ra    RootPasswordAuth     Allow root logins with password 4   Allow the <em>root</em> user to login with password    gp    GatewayPorts    Gateway ports ;   Allow remote hosts to connect to local SSH forwarded ports    s2 	   SSH-Keys U   Here you can paste public SSH-Keys (one per line) for SSH public-key authentication.    cbi/tblsection    keys 
   TextValue    _data    wrap    rows 	   	   cfgvalue    write           !          � H   @� #  # �       _pass                     #   2     2   A   F@� Ȁ  b����  �@@�  ���Y   �	��    	�� � � �@��  � ����� ���@ ������� �A  AB �B �B[�   �@��  � H� "� � �����  � H "� � �� ��  � HA "� � ��# �       pw1 
   formvalue    _pass    pw2 	       luci    sys    user 
   setpasswd    dispatcher    context 	   authuser    m    message 
   translate    Password successfully changed! %   Unknown Error, password not changed! A   Given password confirmation did not match, password not changed!                     m   o          � H   @� #  # �       _keys                     v   x     	   
     @ H@  "� @    ��  #  # �    	   readfile    /etc/dropbear/authorized_keys                         z   ~    	   �   ���   � �A  F�@��   b �@  # �    
   writefile    /etc/dropbear/authorized_keys    gsub    
    
                             