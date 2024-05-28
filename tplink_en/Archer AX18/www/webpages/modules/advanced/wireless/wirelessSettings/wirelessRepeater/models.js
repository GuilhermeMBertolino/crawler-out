$.su.modelManager.define("extendedNetworkM",{type:"model",autoReload:!0,fields:[{name:"enable2g",mapping:"enable_2g"},{name:"bcastSsid2g",mapping:"hidden_2g"},{name:"ssid2g",mapping:"ssid_2g",vtype:{vtype:"ssid_string_length_count_byte",max:32},allowBlank:!1},{name:"encryption2g",mapping:"encryption_2g"},{name:"password2g",mapping:"psk_key_2g"},{name:"enable5g",mapping:"enable_5g"},{name:"bcastSsid5g",mapping:"hidden_5g"},{name:"ssid5g",mapping:"ssid_5g",vtype:{vtype:"ssid_string_length_count_byte",max:32},allowBlank:!1},{name:"encryption5g",mapping:"encryption_5g"},{name:"password5g",mapping:"psk_key_5g"}],proxy:{url:$.su.url("/admin/wireless?form=wireless_extended_network")}}),$.su.modelManager.define("hostNetworkM",{type:"model",autoReload:!0,fields:[{name:"mode",mapping:"bandSelected"},{name:"bridgeEnabled2g",mapping:"enable_2g"},{name:"lockToAp2g",mapping:"locktoap_2g"},{name:"bridgedSsid2g",mapping:"ssid_2g",vtype:{vtype:"ssid_string_length_count_byte",max:32},allowBlank:!1},{name:"bridgedBssid2g",mapping:"bssid_2g",vtype:"mac",maxLength:17,allowBlank:!1},{name:"securityType2g",mapping:"encryption_2g",allowBlank:!1},{name:"pskVersion2g",mapping:"psk_version_2g"},{name:"pskCipher2g",mapping:"psk_cipher_2g"},{name:"password2g",mapping:"psk_key_2g",vtype:"psk_password",maxLength:64,allowBlank:!1},{name:"bridgeEnabled5g",mapping:"enable_5g"},{name:"lockToAp5g",mapping:"locktoap_5g"},{name:"bridgedSsid5g",mapping:"ssid_5g",vtype:{vtype:"ssid_string_length_count_byte",max:32},allowBlank:!1},{name:"bridgedBssid5g",mapping:"bssid_5g",vtype:"mac",maxLength:17,allowBlank:!1},{name:"securityType5g",mapping:"encryption_5g",allowBlank:!1},{name:"pskVersion5g",mapping:"psk_version_5g"},{name:"pskCipher5g",mapping:"psk_cipher_5g"},{name:"password5g",mapping:"psk_key_5g",vtype:"psk_password",maxLength:64,allowBlank:!1}],proxy:{url:$.su.url("/admin/wireless?form=wireless_connect_to_network")}}),$.su.storeManager.define("hostSecurityStore",{type:"store",fields:[{name:"name"},{name:"value"}],data:[{value:"none",name:$.su.CHAR.WIRELESS_SETTINGS.NO_SECURITY},{value:"psk",name:$.su.CHAR.WIRELESS_SETTINGS.WPA_WPA2_PERSONAL},{value:"psk_sae",name:$.su.CHAR.WIRELESS_SETTINGS.WPA2_WPA3_PERSONAL}]}),$.su.storeManager.define("wdsScanStore",{type:"store",fields:[{name:"ssid"},{name:"bssid"},{name:"encryption"},{name:"psk_version"},{name:"psk_cipher"},{name:"signal"}]}),$.su.storeManager.define("wdsScan5gStore",{type:"store",fields:[{name:"ssid"},{name:"bssid"},{name:"encryption"},{name:"psk_version"},{name:"psk_cipher"},{name:"signal"}]}),$.su.storeManager.define("hostNetworkModeStore",{type:"store",fields:[{name:"value"},{name:"boxlabel"}],data:[{value:"2g",boxlabel:$.su.CHAR.WIRELESS_SETTINGS.MODE_2G},{value:"5g",boxlabel:$.su.CHAR.WIRELESS_SETTINGS.MODE_5G}]}),$.su.define("wlanScanProxy",{extend:"IPFProxy",url:$.su.url("/admin/wireless?form=survey_2g"),writeFilter:function(e){return $.extend({operation:"load"},e)}}),$.su.define("wlanScan5gProxy",{extend:"IPFProxy",url:$.su.url("/admin/wireless?form=survey_5g"),writeFilter:function(e){return $.extend({operation:"load"},e)}});