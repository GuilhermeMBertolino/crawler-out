LuaQ               �      H@  "�  �@ "�� A   ��  b� @�� b�� �   �  �� �   A � ���   HA �� �� � "�  � � AA @��@��� b� A�� �Ĉ� E�A ȁ � H� "� A� � �B ��b "�  � � �F�� � "A � A� @��Y  ��H �� ��G�AH� H� �� W��A��� AI�� E��	 �
 � HB
 " "�  �	 � E��
 � � HB " "�  �
 � E��	 �� � H " "�  � � AL�� �� "A � AL� �A "A � �F�A  ��M�"A�� E�A � � HB " "�  � � �F��  ��M��͗"A�� E�A �� � H " "�  � � �Ϟ� П� �Р� E�A � � HB " "�  � � �ў� П� �Р��� �R � �  
��BR� �   	���	 �B�F�Rb� ��R� �B  �S� �B  @���
 Ƃ�H
 ��R� �B  �BS� �B  ���� Ƃ�E�  DG���R�� D���B��� Ƃ�E�  D�M���R�� D���B���   ���	 �       �����	 �A       ������ � # � P      require    luci.model.network    init    luci.model.firewall 
   luci.util    luci.model.uci    cursor    m    SimpleForm    network 
   translate    Create Interface 	   redirect    luci    dispatcher 
   build_url    admin/network/network    reset     newnet    field    Value 	   _netname    Name of the new interface A   The allowed characters are: <code>A-Z</code>, <code>a-z</code>,  $   <code>0-9</code> and <code>_</code>    depends    _attach        default    arg 	      net_    gsub    [^%w_]+    _ 	   datatype    uciname 	   newproto 
   ListValue 
   _netproto    Protocol of the new interface 
   netbridge    Flag    _bridge 6   Create a bridge or a bonding over multiple interfaces    devtype 	   _devtype '   Interface type to use for this network    value    bridge    Bridge    bonding    Bonding    1    bondingifname    _bondingifname +   Name of bonding interface, example : bond0    sifname    _ifname    Cover the following interface    widget    radio 	   template    cbi/network_ifacelist 
   nobridges    mifname 	   _ifnames    Cover the following interfaces 	   checkbox    ipairs    get_protocols    is_installed    proto 	   get_i18n    is_virtual    is_floating 	   validate    write        I   c    i   �   �@�[  �   � ���@��  �@� � B � "A   �� �A��"��  ��  �@� �  � "A  A A@� "���B��� A@� "�� C@�A A@� "��  � �V �� �AA F���  H� " bA  G�c 
  �C�� "��   	�FDb� YA   �AA FA�� b��M��  �IA  I� Y  @��A �A@ ����A  � ��� �A@ ����� ��� �  �c  �A   ��� H " �  c  # �       newnet 
   formvalue 	    
   add_error 
   translate    No network name specified    m    get %   The given network name is not unique 
   netbridge    1    devtype    bonding    bondingifname $   No bonding interface name specified    get_protocol    is_floating    mifname    sifname    imatch .   The selected protocol needs a device assigned                     e   ~    W   �   �@�[�  �   ��� � ��  A@�� "�� A@�A A@�� "��A    � J  F�����  ����b� Y   �� �� �A�  @�� B@�� "��B  � �� B@�� "��� � C� ��B�[ �B�� �Ƃ�[ �B��A   � C���� �A�[� ⁀����"B��  ��HB �A��  ��H� �A��� �E�AE�� ������ [����A  # �       newnet 
   formvalue 	    
   netbridge    1    devtype    add_network    proto    type    imatch    mifname    sifname    bonding    add_slaves    add_interface    bondingifname    save    network 	   wireless    luci    http 	   redirect    dispatcher 
   build_url    admin/network/network                             