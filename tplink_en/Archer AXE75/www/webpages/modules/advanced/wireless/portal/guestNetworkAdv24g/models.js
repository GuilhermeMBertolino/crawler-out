!function(e){e.su.modelManager.define("guestNetworkAdv24g",{type:"model",fields:[{name:"enable",defaultValue:"off"},{name:"ssid",vtype:"string_visible_allow_blank",maxLength:32,allowBlank:!1},{name:"hidden",defaultValue:"off"},{name:"encryption",defaultValue:1},{name:"password",maxLength:64,allowBlank:!1},{name:"duration",defaultValue:0},{name:"time"}],convert:function(e){var a={};return a.enable=e.guest_2g_enable,a.ssid=e.guest_2g_ssid,a.hidden=e.guest_2g_hidden,a.encryption=e.encryption||1,a.duration=e.duration||0,a.time=e.time||86400,a},proxy:{url:e.su.url("/admin/wireless?form=guest_2g&form=guest_5g&form=guest_5g_2&form=guest_2g5g")}}),e.su.define("wireless2gProxy",{extend:"IPFProxy",url:e.su.url("/admin/wireless?form=wireless_2g"),readFilter:function(e){return{disabled:e.data.disabled,disabledAll:e.data.disabled_all,extinfo:{wdsGuestCompatible:e.data.extinfo&&e.data.extinfo.wds_guest_compatible}}}}),e.su.define("wireless2gParameterProxy",{extend:"IPFProxy",url:e.su.url("/admin/wireless?form=syspara_2g"),readFilter:function(e){return{enable:e.data.enable}}})}(jQuery);