LuaQ                     H@  " @@ b ‘   α@      Βΐ  #        require    luci.model.uci    cursor    run                   [    ΐ @ @  ΐ  ΐ@Ϋ   HA  ’ [    @AΫ   ’   @ @ @   ΐA ’   #  #             string    gsub    -    match    %w+    upper                        :     z      H@  " A     b    Θΐ  ’ Ε     J  FΑΘA  HΒ bYA    H   AB H B ’B@Α CΐAC  β Β H ’ [    AB H Β ’ZA   H  ΐAC B β ’   ΐAC Β β ’   ΐAC B β ’   ΐAC Β β ’  Α CΐAC B β Β H ’ F’ ΐGΑΐGΑΑΑ ΐΓ BC H " HΒ  β ΑAΘΚ  ΖΑΘH	 B	 β MΙ@ Β@ΐΚ β ΩA    Θ ΑΚ  BC H
 " β  ΑΔ ΛΔ γ  #  .      require 	   luci.sys    luci.model.accountmgnt    cloud_req.cloud_comm    get    cloud_config    info    alias        alias_changed    false    string    gsub    exec    getfirm HOSTNAME_UNDERLINE    %c 
   deviceMac    getfirm MAC 	   deviceId    getfirm DEV_ID    hwId    getfirm HW_ID    fwId    getfirm FW_ID    deviceName    getfirm MODEL    get_device_model_ver    deviceModel    device_model    deviceHwVer 	   hard_ver    fwVer    getfirm SOFTVERSION    tcspVer    1.1    get_profile    cloud    https_client 	      cloudUserName    get_last_cloud_account    oemId    getfirm OEM_ID    method    helloCloud    params                             