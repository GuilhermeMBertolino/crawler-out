LuaQ                    H@  "@    H�  "� A   ��  b� �   � �  AA H� "� [ �@�� �  AA H� "� [ �@�� �  AA H "� [ �@�� �  AA HA "� [ �@��   � [ "��A� �C ƂCH� ₀���� b� ��� �� �BD΂��� Ā�  �� HA �� �� � "�  �   AF �F"�� A� F��A  A� �� b b�  B� A� F��� B A� �� b b�   �A� F��� 	 A� �B	 b b�  B� A� F��� �	 A� ��	 b b�  B�	 A�	 �    D��A� F��� B
 A� ��
 b b�  BA
 AA
 �A    D��A� F�� �
 A� �� b� �� �B � b�  B�
 A�
 D�K�A�
 D�K�A�
 D�̘A�
 � �M�AMȁ �� D���A�
 ��  D���A�
 F��� B A� �� b b�  DϝA�
 F��� � A� �� b b�  BA AA ��   �D��A�
 F���  A� �B	 b b�  B� A� � D��A�
 F��� B A� �� b b�   �aA @�A�
 F��� � A� � b b�  B� A� �� D��A�
 F��� � A� �� b b�  BA AA �� D��A�
 F��� B A� �� b b�  B A � D��A� F�� � H �� �B � b�  B� A� D�K�A� D�K�A� D�̘A� � �M�AMȁ �� D���A� �A D���A� F��� B A� �� b b�  DϝA� F��� � A� �� b b�  BA AA ��  �D��A� c # � O      require    luci.tools.webadmin 	   nixio.fs    nixio.util    consume    glob 	   /dev/sd* 	   /dev/hd* 
   /dev/scd* 
   /dev/mmc*    ipairs 	   tonumber 	   readfile    /sys/class/block/%s/size    sub 	      math    floor 	      m    Map    fstab 
   translate    Mount Points    luci    sys    mounts    v    section    Table    Mounted file systems    option    DummyValue    fs    Filesystem    mp    mountpoint    Mount Point    avail 
   Available 	   cfgvalue    used    Used    mount    TypedSection V   Mount Points define at which point a memory device will be attached to the filesystem 
   anonymous 
   addremove 	   template    cbi/tblsection    extedit    dispatcher 
   build_url    admin/system/fstab/mount/%s    create    Flag    enabled    Enabled    rmempty     dev    device    Device    target    fstype    op    options    Options    rf 
   is_rootfs    Root    ck    enabled_fsck    Check    swap    SWAP ]  If your physical memory is insufficient unused data can be temporarily swapped to a swap-device resulting in a higher amount of usable <abbr title="Random Access Memory">RAM</abbr>. Be aware that swapping data is a very slow process as the swap-device cannot be accessed with the high datarates of the <abbr title="Random Access Memory">RAM</abbr>.    admin/system/fstab/swap/%s        ,   2        �   �@@��@��@�  
   A  AA� �@    �Ȁ ����� �     A@ �@ �@A �  �A �ABb� YA    �H� O��"� � �  # � 
      luci    tools 	   webadmin    byte_format 	   tonumber 
   available 	    	       /     blocks                     5   :       �   �@ � @�@    ��@  Ȁ  �   A AA �AA� �  �A �Bb� YA    �HA O��"� H� �@�  # �       percent    0%     (    luci    tools 	   webadmin    byte_format 	   tonumber    used 	    	      )                     D   J        A   @@� �   b�  Y   ����  ��@� A�@ ����@��@ # � # �       TypedSection    create    luci    http 	   redirect    mount    extedit                     P   [    /   �   �@�ƀ�H�  �� �  � ��   @ �Ҁ���  �   �@�ƀ�H�  �� ȁ  � ��   @ �Ҁ���  �  �@�  [�  �@�  ��� �   ����   ���   J  @���@ �����@    ��  �  # �       m    uci    get    fstab    uuid 	   UUID: %s    label 
   Label: %s    Value 	   cfgvalue    ?    %s (%s MB)                     ^   d        �   �@@��@�  [� � ���@A� ��� �   ��� � B�   � ����@    ��@ �  # � 
      m    uci    get    fstab 
   is_rootfs    1 	   /overlay    Value 	   cfgvalue    ?                     g   i     
   �   �@@�   � ����@    ���  �  # �       Value 	   cfgvalue    ?                     l   n     
   �   �@@�   � ����@    ���  �  # �       Value 	   cfgvalue 	   defaults                     q   t        �   �@@�   � ����@ ���  �  �� �@  � ���  �@ �� �  # �       Value 	   cfgvalue    1 
   translate    yes    no                     w   z        �   �@@�   � ����@ ���  �  �� �@  � ���  �@ �� �  # �       Value 	   cfgvalue    1 
   translate    yes    no                     �   �        A   @@� �   b�  Y   ����  ��@� A�@ ����@��@ # � # �       TypedSection    create    luci    http 	   redirect    swap    extedit                     �   �    /   �   �@�ƀ�H�  �� �  � ��   @ �Ҁ���  �   �@�ƀ�H�  �� ȁ  � ��   @ �Ҁ���  �  �@�  [�  �@�  ��� �   ����   ���   J  @���@ �����@    ��  �  # �       m    uci    get    fstab    uuid 	   UUID: %s    label 
   Label: %s    Value 	   cfgvalue    ?    %s (%s MB)                             