LuaQ               ,�     H@  "� A   ��  b� �   ��  �� �    �   HA "� A  �� b� �� � B  �B�A��  �� �� �   �  B�"�� A  �� b� �� �  E D�ĈDŉD�ŊDƋ� �Cƈ��Ɖ��Ŋ�Ƌ� �CƈăƉ��Ɗ�Ƌ ǈǉDǊƋE D�ǈD�ǉD�ŊDƋ� �Ȉ�Dȉ�DǊ�Ƌ� ĄȈĄȉĄŊ�Ƌ �Ȉɉ�ŊƋE D�ǈDEɉD�ɊDƋ� ��ǈ��ɉ�ʊ�Ƌ� �EʈąʉąŊ�Ƌ �ʈˉFˊ�ˋE D�ʈDˉD�ˊD�ˋ� ��ʈ�ˉ�̊��ˋ� ��ʈ�F̉Ć̊Ćˋ �ʈG̉̊�ˋE D�ʈDG̉DGˊD�ˋ� ��ʈ�G̉��̊��ˋ� ��ʈ�G̉��ˊćˋ �ʈH̉͊�ˋE D�ʈDH̉DH͊D�ˋ� ��ʈ�H̉��͊��ˋ� ��ʈ�H̉��͊Ĉˋ	 �ʈỈ	Ί�ˋE	 D�ʈDỈDIΊD�ˋ�	 ��ʈ�Ỉ��Ί��ˋ�	 ��ʈ�Ỉ��Ίĉˋ
 
ψ
ˉJϊ�ˋE
 D
ψD
ˉD�ϊD�ˋ�
 ��ʈ�J̉��ϊ��ˋ�
 ĊȈĊȉ�
ЊĊˋC�E 	� ��Ĉ�ŉ��Ŋ�Ƌ� �CƈăƉăŊ�Ƌ Dƈ�Ɖ�ƊƋE DǈDǉDDǊDƋ� ��ǈ��ǉ��Ŋ�Ƌ� �Ȉ�Dȉ�DǊ�Ƌ �Ȉ�ȉ�ŊƋE D�ȈDɉD�ŊDƋ� ��ǈ�Eɉ��Ɋ�Ƌ� ��ǈ��ɉ�ʊ�Ƌ Fʈ�ʉ�ŊƋE D�ʈDˉDFˊD�ˋ� ��ʈ�ˉ��ˊ��ˋ� ��ʈ�ˉ�̊Ćˋ �ʈG̉�̊�ˋE DψDˉDGϊD�ˋ� �ψ�ˉ��ϊ��ˋ� ��ʈ�G̉��ϊćˋ �Ȉ�ȉЊ�ˋ_C�	���C ��ʈ�ˉ�CˊăˋăРD �ʈˉ�ˊ�ˋ�РE D�ʈDˉDDΊD�ˋ�D ��ʈ�ˉ�̊��ˋ�Ѡ�D ��ʈ�D̉Ą̊Ąˋ�Ϡ ψˉEϊ�ˋEE DψDˉD�ϊD�ˋDEѠ�E ��ʈ�Ẻ��ϊ��ˋ��Ѡ�E ąȈąȉ�Њąˋ��Ѡ�C��   � � �C   �   �  ��C �   �   ��   � �� �   � �C      �C �    �� �� �   � �C �C �  ��      �  �� �      �    � �C   �C �     ��       � �  �� �    � �� D  ED  �D D��D�����D  ED  �� D��D����D  ED  � D��D����D  ED  �� D��D����D  ED  �� D��D�����D  ED  �D D��D�����D  ED  �� D��D���!D    �� !�    !� D # � b      require    luci.tools.debug 	   luci.sys    luci.controller.admin.wireless    luci.fs    luci.model.crypto    luci.sys.config    module    luci.controller.admin.system    package    seeall    luci.model.controller    luci.model.uci    cursor    luci.model.log 	  	8      MODULE    administration    SECTION    remote    PARAM    enable    TYPE    reverse    nat    nat_global 
   hw_enable    pptpd    enabled    tfstats    switch    openvpn    server    iptv    offline_download    aria2    lan_agg    enable_agg 	   addl_wan    addl_wan_enable    access_control 	   settings    network    lan    ipaddr    backup    netmask    ifname    wan    proto    mtu 
   conn_mode    connectable    auto    dns    keepup    gateway    macaddr 	   wan_type    dhcp    dhcp_option    ignore    type    igmp_snooping_enable    DFT    192.168.0.254    255.255.255.0    eth1 eth2 eth3 eth4 eth5 eth0    2        off    kickoff_web    logout    reboot    do_sync    get_sysmode    set_sysmode_old    set_sysmode    sysmode    get_globalpara    globalpara    check_support    change_IP_old    change_config_old    quicksetup_reset    change_config    sync_mode_files    switch_mode_oldway    .super    cb    kick    sync    do    read 	   dispatch    _index    index        b   i        
     @ H@  "� M�@  �A�  @ � �   �@ � b�  � A� �  b� �@� �   �@ # � 
      exec    basename /tmp/luci-sessions/*    *
    string    sub 	   	����   require    luci.sauth    kill                     k   z     $      H@  "�  �@  �@ A   �  b� �   �@A� � �� �  ���� �  � [�"� A  � � J���"A�   @�  HA "� @�B�  bA 	� # # �       require    luci.dispatcher    context    authsession    luci.model.checktypes    Log    getenv    REMOTE_ADDR    check_ip_in_lan    luci.sauth    kill                     |   �     "      H@  "� E@  D�@��   � A��� �@A� H�  �� �@    ���  D� ��� � B�@BȀ �� �   � �� � ��B �@��@ �@� ��C �� �@ c  # �       require 	   luci.sys    reboot_time 	K      cursor    get_profile    global    nixio    fs    access    /etc/config/history_list    commit    history_list    do_sync 
   fork_exec    sleep 2; reboot                     �   �        
     @ H@  "@ 	 � #  # �    
   fork_call    sync                     �   �    !   E   �   �@@�  H�  ��  ���� �� �D ��D������   �@@�  H�  ��  ���D����   �@@�  H�  �A ���  M  �@ �D ��  �D���c  # �        get    sysmode    support    no    mode    router                     �   �    &   @ @ M@� ��M��  �M�� � ��   �  ���   �  �@ � � �@A� ����@  � ��   �  ���� � � �� � @�   �   �  �@ �@ �   �@ �� � � �  �   # � 
      mode    router    ap 	   repeater *   ---------set sysmode old:start-----------    commit_without_write_flash    sysmode    get_sysmode 6   ---------set sysmode old:change config old-----------    change_config_old                     �   �       @ @ �   M@� ��M��  �M�� � ��   �  ���  � �@ �   ƀ�H� �� �A  �����@ ��  # �       mode    router    ap 	   repeater    change_config    support    get    sysmode                     �   �        @ @ @�  ���  �   �  �   ���� � ��  � � �   @ ��   �  # �    
   operation    write    set_sysmode    read    get_sysmode                     �   �           J   F � �@  �  b� Y@    �H�  @ �#  # �       get_profile    usb    usb_support    yes                     �   �     
   @ @ @� � ���  � � �   @ ��   �  # �    
   operation    read    get_globalpara                     �   �            H@  "�  �@ "�� E@  � A A H�  �� �@    ��� D���c  # �       require    luci.model.uci    cursor    cloud_support    get_profile    cloud    no                     �   =   �   @ @ �  �   �@�H�  ��  � �@    ��    @�@ �
�   �
 �� @�A� ��b��� @�����C @���C ����� ���C @���B��  ��H�  �� � ₀M@���
  �C����� ��[�"C 
  �C��"C�@� �M@C��
  �C����� ��@�"C 
  �C��"C�^�  @�J  F�ȁ  � HB b���@���J  F�ȁ � H b��� ���@� @�@�@�J  F��ȁ � H bA�A� � b 	��� C��F �@��� �HC ����C  ���� � �HC �����
  C��  �C  "��� M@���
  �C����� ��[�"C 
  �C��"C�^�   �J  F��ȁ � H bA�J  F��ȁ � HB bA�J  F��ȁ bA�J  F�ȁ  B HB b��� �J  F��ȁ bA�M@C��A� � b� �� �A� [ �A�A� bA� I� c # � #      mode    get_profile    sysmode 	   type_msp 	    	      ap    pairs    MODULE    _    SECTION    PARAM    get     set    commit_without_write_flash    DFT    network_ipaddr    network    lan    ipaddr    router    section 
   interface    wan    TYPE    backup    delete    gateway    dns    commit    require    luci.controller.admin.dhcps    dhcp_opt_update    do_sync                     A  �     J   F � �@  �  b� Y@    �H�  �    � @ �� �   ��  @A @���  � ��
  �A���B� ��"��M�B��@�@���@��� �B�W�  ��CC  H ��� �B M@D@ ��D���  ��C �@C����ȃ �B ���  ��C �@C������  �B �  ��D ��B� �G� � ����Ȃ  C�H� ���W�� ���Ȃ  ��W�  ��CC  H ��� �B ހ  ���   ���HA  �@� �  ��   � �HA �� �@ �   ���HA �@��   � ƋĀƌ
� �F[��� "��J  F���A   H �GbA J  F���A   HB �BGbA ĀǌĀĎ�@D�J�@������ bA�J  F���A  bA� D  #��   ���HA �� �  �@    ��@ 
  �A�� �� � "��A    �A A� � b ��  ��A �@C�������M�B ����M � ����M@�@����M��� �������� J� ����M����@�@����M �@����M@�� ������ ��� � �� �H� �C�ȃ  ���� � �H� ���ׂ
  �C�C  �C �[ "C ^�   �J  F���A  bA�A� � b���� �@C�� �H� �C���
  �A�C  �  "��� M����
  �C���C� ��[�"C 
  �D��"C�^�  @�E  DƋD�ǌ�  ��AB  H �B ���D����  ��AB  H � ���D������F��	� �A�� � �  # � *      get_profile    sysmode 	   type_msp 	    	      ap    pairs    get    MODULE    SECTION    PARAM     TYPE    reverse    _    set    router    on    off    commit_without_write_flash    delete    network    wan    form    guest 
   operation    read    wireless_predefined_forms    access    isolate    write    lan 	   lan_type        dhcp    ignore    ipaddr    netmask    gateway    dhcp_option    0    static                     �  �       
    @ �@  �@  �  "��@    ��  �@ ��J   F � �@  A  H�  �A b@ J   F�� �@  b@�# �       get    quicksetup    to_show    false    set    true    commit                     �  �      A   b@� @@ ��J   ��  b@ A�  @ � �@ b@ �A ��J   �� b@ A�  @ � �  b@ I � c  # � 	      quicksetup_reset    ap /   --------------------sys is ap-----------------    os    execute '   /sbin/switch_mode rtoa >/dev/null 2>&1    router 2   -------------------sys is router----------------- '   /sbin/switch_mode ator >/dev/null 2>&1                     �  �    |   
   H   "@ @   �@ H�  "@    @A  �A H� "@ 
 �   B H@ �� "@�   @A  �A H� "@ 
    C H� �@ "��M  � �J �@�� �  b� �  �@D� H� �   � 
  �@��  � E� �@�`   J  F@� Ȁ � H� b�� � ���  �@F� H� � �A �@ �  � E� �@�� �Ȁ � H� � �A � H� �� �	 �@��@	  �  �
  H�	 ��W��"B   BA �AH�	 ���
 W"B ހ   ��  �@����A
 �@ �  ����
 H� �@�� � � �� HA �@��  �@����A �@ �  �@����� �@ �   � �@ # � 0   -   ------------sync mode files-----------------    os    execute #   mkdir /tmp/newmode >/dev/null 2>&1    luci    sys    exec X   nvrammanager -r /tmp/newmode/ori-newmode-user-config.bin -p user-config >/dev/null 2>&1    dec_file_entry )   /tmp/newmode/ori-newmode-user-config.bin    /tmp/tmp-newmode-userconf.xml    mkdir -p /tmp/newmodecfg 
   xmlToFile    /tmp/newmodecfg     cursor    /tmp/newmodecfg/config/    foreach 	   wireless    wifi-iface    commit_without_write_flash    get    sysmode    mode    router    set    administration    remote    enable    off    accountmgnt    system    locale 	   usbshare    cloud_config    systime    history_list    ipairs &   ------------cp files-----------------    cp -f /etc/config/       /tmp/newmodecfg/config/ S   rm -f /tmp/newmode/ori-newmode-user-config.bin;rm -f /tmp/tmp-newmode-userconf.xml    convertFileToXml    /tmp/newmodecfg/config    enc_file_entry X   nvrammanager -w /tmp/newmode/ori-newmode-user-config.bin -p user-config >/dev/null 2>&1 O   rm -rf /tmp/newmodecfg;rm -f /tmp/tmp-newmode-userconf.xml;rm -rf /tmp/newmode 1   -------------sync mode files end----------------        �  �      @ @ Y   ��J   F@� Ȁ   �@ H b��M@����� � ��A�  @�@ � �� �@ # �       guest    get 	   wireless    .name    access     set                                 �  �          "�� @@@ ��  �J   ��  b@  ����@@@  � � �J   �@ b@ ���A� �   b@ A� �   b@ # �       get_sysmode    mode    ap    ---------mode is ap-----------    router #   ---------mode is router-----------    set_sysmode_old    change_IP_old                             J   @ � � � �   d �c   # �    	   dispatch                              
     @ A@  $  #   # �       _index 	   dispatch                                  E  �@  Ȁ  _@ ��  �  �  "�  ���# �       entry    admin    system    call    _index    leaf                             