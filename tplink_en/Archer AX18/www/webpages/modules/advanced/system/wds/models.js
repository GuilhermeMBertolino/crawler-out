!function(a){function n(e){e=Math.floor(parseInt(e,10)/10);return e<=5?e:5}function e(e){var a={};return a.enable=e.enable,a.ssid=e.ssid,a.hidden=e.hidden,a.encryption="none"==e.encryption?0:1,a.password=e.psk_key,a.duration=e.duration||0,a.time=e.time||86400,a}function s(e){var a={};return a.enable=e.enable,a.ssid=e.ssid,a.hidden=e.hidden,a.encryption="0"==e.encryption?"none":"wpa",a.psk_key=e.password,a}a.su.modelManager.define("wds24g",{type:"model",fields:[{name:"enable"},{name:"ssid",vtype:"string_visible_allow_blank",allowBlank:!1,maxLength:32},{name:"wdsMode",mapping:"wds_mode"},{name:"dwdsMode",mapping:"dwds_mode",defaultValue:"ap"},{name:"mac",mapping:"bssid",vtype:"mac",allowBlank:!1},{name:"encryption"},{name:"pskKey",mapping:"psk_key",maxLength:64,allowBlank:!1,validator:function(e){return!!/^([A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\ ]{8,63}|[0-9a-fA-F]{8,64})$/.test(e)||a.su.CHAR.ERROR["00000066"]}},{name:"wepKey1",mapping:"wep_key1",maxLength:32,allowBlank:!1},{name:"wepFormat1",mapping:"wep_format1"},{name:"wepSelect",mapping:"wep_select"},{name:"wepMode",mapping:"wep_mode"},{name:"supportBand",mapping:"support_band",disabled:!0},{name:"wds2gWds5gCompatible",mapping:"wds2g_wds5g_compatible",disabled:!0}],convert:function(e){return a.extend(e,e.extinfo),e.wep_key1=e["wep_key"+e.wep_select],e.wep_format1=e["wep_format"+e.wep_select],e},serialize:function(e){return 1!==parseInt(e.wep_select,10)&&(e["wep_key"+e.wep_select]=e.wep_key1,e["wep_format"+e.wep_select]=e.wep_format1,delete e.wep_key1,delete e.wep_format1),e},proxy:{url:a.su.url("/admin/wireless?form=syspara_2g")},methods:{disableWds:function(e){(e=e||{}).data=e.data||{},e.data.enable="off",this.getProxy().write(e)}}}),a.su.modelManager.define("wds5g1",{type:"model",fields:[{name:"enable"},{name:"ssid",vtype:"string_visible_allow_blank",allowBlank:!1,maxLength:32},{name:"wdsMode",mapping:"wds_mode"},{name:"dwdsMode",mapping:"dwds_mode",defaultValue:"ap"},{name:"mac",mapping:"bssid",vtype:"mac",allowBlank:!1},{name:"encryption"},{name:"pskKey",mapping:"psk_key",maxLength:64,allowBlank:!1,validator:function(e){return!!/^([A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\ ]{8,63}|[0-9a-fA-F]{8,64})$/.test(e)||a.su.CHAR.ERROR["00000066"]}},{name:"wepKey1",mapping:"wep_key1",maxLength:32,allowBlank:!1},{name:"wepFormat1",mapping:"wep_format1"},{name:"wepSelect",mapping:"wep_select"},{name:"wepMode",mapping:"wep_mode"},{name:"supportBand",mapping:"support_band",disabled:!0},{name:"wds2gWds5gCompatible",mapping:"wds2g_wds5g_compatible",disabled:!0}],convert:function(e){return a.extend(e,e.extinfo),e.wep_key1=e["wep_key"+e.wep_select],e.wep_format1=e["wep_format"+e.wep_select],e},serialize:function(e){return 1!==parseInt(e.wep_select,10)&&(e["wep_key"+e.wep_select]=e.wep_key1,e["wep_format"+e.wep_select]=e.wep_format1,delete e.wep_key1,delete e.wep_format1),e},proxy:{url:a.su.url("/admin/wireless?form=syspara_5g")},methods:{disableWds:function(e){(e=e||{}).data=e.data||{},e.data.enable="off",this.getProxy().write(e)}}}),a.su.modelManager.define("wds5g2",{type:"model",fields:[{name:"enable"},{name:"ssid",vtype:"string_visible_allow_blank",allowBlank:!1,maxLength:32},{name:"wdsMode",mapping:"wds_mode"},{name:"dwdsMode",mapping:"dwds_mode",defaultValue:"ap"},{name:"mac",mapping:"bssid",vtype:"mac",allowBlank:!1},{name:"encryption"},{name:"pskKey",mapping:"psk_key",maxLength:64,allowBlank:!1,validator:function(e){return!!/^([A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\ ]{8,63}|[0-9a-fA-F]{8,64})$/.test(e)||a.su.CHAR.ERROR["00000066"]}},{name:"wepKey1",mapping:"wep_key1",maxLength:32,allowBlank:!1},{name:"wepFormat1",mapping:"wep_format1"},{name:"wepSelect",mapping:"wep_select"},{name:"wepMode",mapping:"wep_mode"},{name:"supportBand",mapping:"support_band",disabled:!0},{name:"wds2gWds5gCompatible",mapping:"wds2g_wds5g_compatible",disabled:!0}],convert:function(e){return a.extend(e,e.extinfo),e.wep_key1=e["wep_key"+e.wep_select],e.wep_format1=e["wep_format"+e.wep_select],e},serialize:function(e){return 1!==parseInt(e.wep_select,10)&&(e["wep_key"+e.wep_select]=e.wep_key1,e["wep_format"+e.wep_select]=e.wep_format1,delete e.wep_key1,delete e.wep_format1),e},proxy:{url:a.su.url("/admin/wireless?form=syspara_5g_2")},methods:{disableWds:function(e){(e=e||{}).data=e.data||{},e.data.enable="off",this.getProxy().write(e)}}}),a.su.modelManager.define("guestNetworkAdv24g",{type:"model",fields:[{name:"enable",defaultValue:"off"},{name:"ssid",vtype:"string_visible_allow_blank",maxLength:32,allowBlank:!1},{name:"hidden",defaultValue:"off"},{name:"encryption",defaultValue:1},{name:"password",maxLength:64,allowBlank:!1},{name:"duration",defaultValue:0},{name:"time"}],convert:e,serialize:s,proxy:{url:a.su.url("/admin/wireless?form=guest_2g")}}),a.su.modelManager.define("guestNetworkAdv5g1",{type:"model",fields:[{name:"enable",defaultValue:"off"},{name:"ssid",vtype:"string_visible_allow_blank",maxLength:32,allowBlank:!1},{name:"hidden",defaultValue:"off"},{name:"encryption",defaultValue:1},{name:"password",maxLength:64,allowBlank:!1},{name:"duration",defaultValue:0},{name:"time"}],convert:e,serialize:s,proxy:{url:a.su.url("/admin/wireless?form=guest_5g")}}),a.su.modelManager.define("guestNetworkAdv5g2",{type:"model",fields:[{name:"enable",defaultValue:"off"},{name:"ssid",vtype:"string_visible_allow_blank",maxLength:32,allowBlank:!1},{name:"hidden",defaultValue:"off"},{name:"encryption",defaultValue:1},{name:"password",maxLength:64,allowBlank:!1},{name:"duration",defaultValue:0},{name:"time"}],convert:e,serialize:s,proxy:{url:a.su.url("/admin/wireless?form=guest_5g_2")}}),a.su.storeManager.define("wdsEncryptionStore",{fields:[{name:"name"},{name:"value"}],data:[{name:a.su.CHAR.WDS.NO_SECURITY,value:"none"},{name:a.su.CHAR.WDS.PSK,value:"psk"},{name:a.su.CHAR.WDS.WEP,value:"wep"}]}),a.su.storeManager.define("wdsModeStore",{fields:[{name:"name"},{name:"value"}],data:[{name:a.su.CHAR.WDS.AUTO,value:"2"},{name:a.su.CHAR.WDS.WDS1,value:"1"},{name:a.su.CHAR.WDS.WDS2,value:"0"}]}),a.su.storeManager.define("dwdsModeStore",{fields:[{name:"name"},{name:"value"}],data:[{name:a.su.CHAR.WDS.ROUTER_MODE,value:"ap"},{name:a.su.CHAR.WDS.STATION,value:"sta"}]}),a.su.storeManager.define("wds24gSurveyStore",{fields:[{name:"ssid"},{name:"mac",mapping:"bssid"},{name:"signal"},{name:"channel"},{name:"encryption"}],convert:function(e){return a.each(e,function(e,a){a.signal=n(a.signal)}),e},proxy:{url:a.su.url("/admin/wireless?form=survey_2g")}}),a.su.storeManager.define("wds5g1SurveyStore",{fields:[{name:"ssid"},{name:"mac",mapping:"bssid"},{name:"signal"},{name:"channel"},{name:"encryption"}],convert:function(e){return a.each(e,function(e,a){a.signal=n(a.signal)}),e},proxy:{url:a.su.url("/admin/wireless?form=survey_5g")}}),a.su.storeManager.define("wds5g2SurveyStore",{fields:[{name:"ssid"},{name:"mac",mapping:"bssid"},{name:"signal"},{name:"channel"},{name:"encryption"}],convert:function(e){return a.each(e,function(e,a){a.signal=n(a.signal)}),e},proxy:{url:a.su.url("/admin/wireless?form=survey_5g_2")}})}(jQuery);