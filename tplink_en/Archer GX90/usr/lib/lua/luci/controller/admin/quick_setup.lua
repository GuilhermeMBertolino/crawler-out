LuaQ               ~     H@  ��  ��@"@�  H@ "� A  �� b� �  �� �� �   �  HA "� A �� b� ������ �CHB �� �� ⁀�A    �� C�B Ȃ C "��B    � F�D��  b� YB    �H �  �B �B     �� �� �B �  [ �� W��C��ǍE� ��  ��G��CH�_C� C���� [ �� W��C��ǍCI�E ��  ��I���I��CJ���  ăJ���J��K��  DK��K��K�E�  DL�DDL�D�L���  ��L��M��DM���  ĄM���M��N��  EN��N��N�E�  DO�DEO�D�O���  ��O��P��EP�Ņ  ąP���J��  �P�Q�E�  DFQ�D�Q�_C C�����  [ � W��C��CҍE���  ��R���R��CS��C ăS���S��CS��T��CT��  �T��T�DS�E�  DU�DDU���  ��U���U�_C�C������  [ �C W��C��ǍE� ��  ��V���V�_C� C�����  [ �C W��C��ǍE ��  ��W���W�Ń  �X��CX�_C C�����  [ �� W��C��ǍE� ��  ��X��Y�_C� C��E�  ��  � � ���Ã��Ǎ�� �  �G�DH��C� �Ã�D��� � � ���Ã��Ǎ�CI�� �  �I��I�DJ�E�  D�J�D�J�DK���  �DK���K���K���  �L��DL�ĄL��  �L�M�EM�E�  D�M�D�M�DN���  ��P��Q�Ņ  �EQ�ąQ��C �Ã�D����  �  ���Ã��Cҍ���  �R��R�DS�ED D�S�D�S�DDS�DT�DDT���  ��T���T��DS��D  �U��  �U��U��C��Ã�D����C  ��   H D����Cҍ�E�  D�R�D�R�DDS��D ��S���S��DS��T��DT���  ĄT���T��DS��  U�EU�E�  D�U�D�U�D�����Ã��   � �   �  �C ��   � � �     � �      �   �� �C   � �    �C ��  � �  ED  �D D��D��ED  �� D��D�����  ED  �� D��D��ED  � D��D����D  ED  �D D��D����D  ED  �� D��D���!    � !D   � !�  # � q      module "   luci.controller.admin.quick_setup    package    seeall    require 	   luci.sys 
   luci.util    luci.model.controller    luci.tools.debug    luci.controller.locale    luci.model.uci    cursor    get    profile    profile_diff    dslite_support    no    v6plus_support    get_profile    firmware_upgrade    auto_update_support    updateonly_and_prefix    get_wire_type    luci.controller.admin    time    controller    .timesetting    target 	   dispatch    forms    form 	   settings    prefix    time_    network 	   .network 
   limit_key    network_conntype    wan_ipv4_status 	   network_    limit    status    wan_ipv4_dynamic    network_dhcp_    dhcp    wan_ipv4_staticip    network_static_    static    wan_ipv4_pppoe    network_pppoe_    pppoe    wan_ipv4_l2tp    network_l2tp_    l2tp    wan_ipv4_pptp    network_pptp_    pptp    wan_ipv4_dslite    network_dslite_    dslite    wan_ipv4_v6plus    network_v6plus_    v6plus    wan_ipv4_ocn    network_ocn_    ocn    mac_clone_advanced    wan_ipv4_preisp    network_preisp_    wan_port_status    network_port_ 	   wireless 
   .wireless    wireless_dispatch    wireless_2g    wireless_2g_    gather    wireless_5g    wireless_5g_    wireless_5g_region_enable    on    wireless_5g_2    wireless_5g_2_    smart_connect    smart_connect_    region    region_    iptv    .iptv    setting    isp_special_    modem 
   .usbmodem 	   modemset 
   usbmodem_    working_mode_set    working_mode_ 
   .firmware    auto_upgrade    auto_upgrade_    read    write    read_ap 	   write_ap    check_internet    check_router    quick_setup    cb 	   ap_setup    .super    _index    index           $        �@    ��   �   ��A  [�" �[ � W���� ���   �@��  [� "� �[ ��W�� ��  @�# �           ipairs    pairs                     &   /        
     @ H@  "� A�  ��  b� @ � b�� �@ � � � ����A �����A �� �� �A    ��A � ��  ���  �  # � 
      getenv    REMOTE_ADDR    require    luci.model.client_mgmt    get_client_list    ipairs    ip 
   wire_type    wired 	   wireless                     �   �    O   E   �@  ��� D� �� � �   �� ���  � �
� J �@��@ 
� � ��� @��"� @� BAB � b� ��  �@ �	B  	�   �	�AB ���b@���@C� ���M�@  �����M�C� ����C� �� M�@  � ���  �������Ĉ�  �  ��  @� [� �D����"D   ��   ^�  ��ހ  ���    �� � �  # �    
   wire_type    get_wire_type    yes    table    insert    pairs    require    controller    target    type 	   function    forms    limit    dslite    v6plus    ocn    form 
   operation    read    success    updateonly_and_prefix    data    prefix                     �   ;  	   E   � � � � @ @@@ ��     �� � 
 �@ ��   A[���"A� AA A    �� A� � b� @A�b�� ���� H �� �A    ��A �@@�Ɓ�H� �� � � ��� ��C H�  "B ���� "B��� �� 0�� @C�"� @� C � A "� �E@ � @ �	C  	�   F � C�J �C W��M@@� C�J �� W��@ �
� �FH "C @'�   �&��  E  C���G�I  �� ������DH	��	� �� M��	  ����DH	M��	� ��DH	 �	� ���M��	  �@��A@��D�
 HE	 E
 �	���DG	��	 ������	�	 �D @��J	�D    ��� EG	@J
  ���	 EG	�J
  ���	�  � � EH	@� @
�� �J	M K
 
��  @EG	E���G�I� �� �  ����F�@�K	RG�ↀ�  @ ���I  ��  @�M �
@��EG	M@L� ��EG	�L@�� � 
�� ��L�  @�� � @FM��K	�E @��   ��I�  EG@EGV�
QE�
�EG	��
� [  "��FF���K	���b��Y    ���  ����  �� ���� � �� ��L�  ����  DG� �� @�"��@FG@�	� �A �� �FMbF��  ��ރ   �  ��   ށ   ����H �B Ȃ ⁀�A    ���  �� �
  BOH� "B    �� # # � ?   	   ismobile 	      yes    table    insert    working_mode_wan_3g4g_switch    cable    require    luci.model.uci    cursor    get_profile    region    support_please_select    no 
   get_first    system    set    quicksetup    commit    pairs    target    controller    type 	   function    3g4g 	   .network    .iptv    print    just continue    form 
   operation    write    forms    limit    dslite    v6plus    ocn 
   .usbmodem 	   modemset    cable mode skip usbmode 
   limit_key    wan_ipv4_preisp    wan_port_status    gather    match 	   ^%s(.*)$    prefix     wan_ipv4_v6plus    wan_ipv4_ocn    success    updateonly_and_prefix    data    ipairs    get 
   bluetooth    B1    enable    donot_support    on 
   fork_exec    /etc/rc.d/S49bluetooth stop                     =  X   6   E   �@  ��� D� �� � ��  
  � @	��  @�"� @B� BA� � b� ��  �@ �	B  	�   ��A�  ��b ���  �C��Ã���B��  �  �  @�D [� ������"D   ��   ^�   �ހ  ���    �� � �  # �    
   wire_type    get_wire_type    pairs    require    controller    target    type 	   function    forms    form 
   operation    read    success    updateonly_and_prefix    data    prefix                     Z  �   �   E   � � �   A  � ���  ��� �A "� A    �� �A@�F��A B G b� ���B [��� �� �A ��B �A�AA �  b���  ����� ������� � �� �� @D@ ��� @ ��B  �� �� �� �  ����  �  ����ŉ�  C @C�"��@�EYD    �@��Y  � ���E�D �	@��FM@F	����  ��D����ŉ�D   ����F�G����"��    ���ބ  ����  	�  E�	  @�� [� ���	�G"E @��   ���� ��D��D��	��	 �D��	�D �  ���ƅ�
@GRF��⅀�    ����
��  ���  @�@���� [ "� @CGY  ��AC ��Db ��D �D������D��� ��� � @�G�E���  ��^�   �  ��   ^�  ��Z   �[� c # � "      require    luci.model.uci    cursor    get_profile    region    support_please_select    no    yes 
   get_first    system    set    quicksetup    commit    pairs    target    controller    type 	   function    form 
   operation    write    forms 
   limit_key    limit    gather    match 	   ^%s(.*)$    prefix    success    updateonly_and_prefix    data 	      ipairs                     �  �   	   H   �@  Ȁ   H  � ��  ��� � [ �@ �@ �@�� ��  ���B �A �@�M@ �  ��@  � � �  # �    	   	   	       call    online-test    sleep 2                     �  �    %   A   �@  b� @�� b�� �   ��  �� � A��� �@AH� �� �  @����� ���� �A � ��� �� � �  @ ��   �  ��� � M �  ��@  � � �  # �       require    luci.model.internet 	   Internet    luci.model.uci    cursor    get    modem 
   modemconf    mode    3g4g    luci    sys    call O   ubus call network.interface.mobile status | grep state |grep -w -q 'connected' 	       status 
   connected                     �  �      J   @ � � � �   d �c   # �    	   dispatch                               
     @ A@  $  #   # �       _index 	   dispatch                                  E  �@  Ȁ  _@ ��  �  �  "�  ���# �       entry    admin    quick_setup    call    _index    leaf                             