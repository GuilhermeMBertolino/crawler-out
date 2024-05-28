!function(r){r.su.moduleManager.define("wds",{models:["wds24g","wds5g1","wds5g2","guestNetworkAdv24g","guestNetworkAdv5g1","guestNetworkAdv5g2"],stores:["wdsEncryptionStore","wepTypeStore","wepKeyFormatStore","wdsModeStore","dwdsModeStore","wds24gSurveyStore","wds5g1SurveyStore","wds5g2SurveyStore"],services:["ajax","device"],views:["wdsView"],listeners:{"ev_on_launch":function(e,d,s,i,t,n,a){this.deviceConfigs=a.device.getConfig();var w=r.Deferred();a.ajax.request({proxy:"wireless2gProxy",method:"read",success:function(e){if(void 0!==e&&d.isRunning()){var s=d.wdsGuestCompatible=e.extinfo.wdsGuestCompatible||"no";"on"===e.disabledAll?d.wds24gDisableStep2=!0:"no"===s?i.guestNetworkAdv24g.load({success:function(){"on"===i.guestNetworkAdv24g.enable.getValue()&&(d.wds24gDisableStep3=!0),w.resolve()}}):w.resolve()}}}),w.then(function(){i.wds24g.load()});var o=r.Deferred();if(a.ajax.request({proxy:"wireless5gProxy",method:"read",success:function(e){if(void 0!==e&&d.isRunning()){var s=d.wdsGuestCompatible=e.extinfo.wdsGuestCompatible||"no";"on"===e.disabledAll?d.wds5g1DisableStep2=!0:"no"===s?i.guestNetworkAdv5g1.load({success:function(){"on"===i.guestNetworkAdv5g1.enable.getValue()&&(d.wds5g1DisableStep3=!0),o.resolve()}}):o.resolve()}}}),o.then(function(){i.wds5g1.load()}),this.deviceConfigs.isTriband){s.wdsView.wds5g1Panel.setTitle(r.su.CHAR.WDS.WDS_TITLE_5G_1),s.wdsView.wds5g2Panel.show();var g=r.Deferred();a.ajax.request({proxy:"wireless5g2Proxy",method:"read",success:function(e){if(void 0!==e&&d.isRunning()){var s=d.wdsGuestCompatible=e.extinfo.wdsGuestCompatible||"no";"on"===e.disabledAll?d.wds5g2DisableStep2=!0:"no"===s?i.guestNetworkAdv5g2.load({success:function(){"on"===i.guestNetworkAdv5g2.enable.getValue()&&(d.wds5g2DisableStep3=!0),g.resolve()}}):g.resolve()}}}),g.then(function(){i.wds5g2.load()})}else s.wdsView.wds5g1Panel.setTitle(r.su.CHAR.WDS.WDS_TITLE_5G),s.wdsView.wds5g2Panel.hide()}},init:function(e,i,o,t,s,d){this.configViews({id:"wdsView",items:[{id:"wds24g-survey-grid",configs:{columns:[{text:r.su.CHAR.WDS.SSID,dataIndex:"ssid",width:130},{text:r.su.CHAR.WDS.MAC_ADDRESS,dataIndex:"mac",width:140},{text:r.su.CHAR.WDS.SIGNAL,dataIndex:"signal",renderer:function(e){var s="";return s+='<div class="signal-level-container widget-container">',s+='<span class="icon icon-signal-'+e+'"></span>',s+="</div>"}},{text:r.su.CHAR.WDS.CHANNEL,dataIndex:"channel"},{text:r.su.CHAR.WDS.SECURITY,dataIndex:"encryption",renderer:function(e){return e&&e.toUpperCase()}},{xtype:"actioncolumn",text:r.su.CHAR.WDS.OPERATION,renderer:function(){var e='<a href="javascript:void(0)" class="grid-content-btn-choose">';return e+='<span class="text">'+r.su.CHAR.WDS.CHOOSE+"</span>",e+="</a>"}}]}},{id:"wds5g1-survey-grid",configs:{columns:[{text:r.su.CHAR.WDS.SSID,dataIndex:"ssid",width:130},{text:r.su.CHAR.WDS.MAC_ADDRESS,dataIndex:"mac",width:140},{text:r.su.CHAR.WDS.SIGNAL,dataIndex:"signal",renderer:function(e){var s="";return s+='<div class="signal-level-container widget-container">',s+='<span class="icon icon-signal-'+e+'"></span>',s+="</div>"}},{text:r.su.CHAR.WDS.CHANNEL,dataIndex:"channel"},{text:r.su.CHAR.WDS.SECURITY,dataIndex:"encryption",renderer:function(e){return e&&e.toUpperCase()}},{xtype:"actioncolumn",text:r.su.CHAR.WDS.OPERATION,renderer:function(){var e='<a href="javascript:void(0)" class="grid-content-btn-choose">';return e+='<span class="text">'+r.su.CHAR.WDS.CHOOSE+"</span>",e+="</a>"}}]}},{id:"wds5g2-survey-grid",configs:{columns:[{text:r.su.CHAR.WDS.SSID,dataIndex:"ssid",width:130},{text:r.su.CHAR.WDS.MAC_ADDRESS,dataIndex:"mac",width:140},{text:r.su.CHAR.WDS.SIGNAL,dataIndex:"signal",renderer:function(e){var s="";return s+='<div class="signal-level-container widget-container">',s+='<span class="icon icon-signal-'+e+'"></span>',s+="</div>"}},{text:r.su.CHAR.WDS.CHANNEL,dataIndex:"channel"},{text:r.su.CHAR.WDS.SECURITY,dataIndex:"encryption",renderer:function(e){return e&&e.toUpperCase()}},{xtype:"actioncolumn",text:r.su.CHAR.WDS.OPERATION,renderer:function(){var e='<a href="javascript:void(0)" class="grid-content-btn-choose">';return e+='<span class="text">'+r.su.CHAR.WDS.CHOOSE+"</span>",e+="</a>"}}]}}]}),this.control({"#wds24g-survey-button":{"ev_button_click":function(){t.wds24gSurveyStore.load(),i.wdsView.wds24gSurveyMsg.show()}},"#wds24g-survey-grid => .grid-content-btn-choose":{"ev_grid_action_click":function(e,s){var d=t.wds24gSurveyStore.getModelByKey(s).getData();o.wds24g.ssid.setValue(d.ssid),o.wds24g.mac.setValue(d.mac),i.wdsView.wds24gSurveyMsg.hide()}},"#wds24g-survey-grid":{"ev_grid_tbar_refresh":function(e){t.wds24gSurveyStore.load()}},"#wds5g1-survey-button":{"ev_button_click":function(){t.wds5g1SurveyStore.load(),i.wdsView.wds5g1SurveyMsg.show()}},"#wds5g1-survey-grid => .grid-content-btn-choose":{"ev_grid_action_click":function(e,s){var d=t.wds5g1SurveyStore.getModelByKey(s).getData();o.wds5g1.ssid.setValue(d.ssid),o.wds5g1.mac.setValue(d.mac),i.wdsView.wds5g1SurveyMsg.hide()}},"#wds5g1-survey-grid":{"ev_grid_tbar_refresh":function(e){t.wds5g1SurveyStore.load()}},"#wds5g2-survey-button":{"ev_button_click":function(){t.wds5g2SurveyStore.load(),i.wdsView.wds5g2SurveyMsg.show()}},"#wds5g2-survey-grid => .grid-content-btn-choose":{"ev_grid_action_click":function(e,s){var d=t.wds5g2SurveyStore.getModelByKey(s).getData();o.wds5g2.ssid.setValue(d.ssid),o.wds5g2.mac.setValue(d.mac),i.wdsView.wds5g2SurveyMsg.hide()}},"#wds5g2-survey-grid":{"ev_grid_tbar_refresh":function(e){t.wds5g2SurveyStore.load()}}}),this.listen({"models.wds24g":{"ev_model_submit":function(e,s){this.wds24gLoadedHandler(e,s),"off"===o.wds5g1.enable.getValue()&&o.wds5g1.disableWds(),this.deviceConfigs.isTriband&&"off"===o.wds5g2.enable.getValue()&&o.wds5g2.disableWds()},"ev_loaded":this.wds24gLoadedHandler,"ev_will_auto_save":function(e,s){var d=o.wds24g.enable.getValue(),i=o.wds24g.dwdsMode.getValue(),t=o.wds24g.ssid.getValue(),n=o.wds24g.mac.getValue();if("on"===d&&"ap"!==i){if(!t&&!n)return o.wds24g.mac.setError(r.su.CHAR.ERROR["00000040"]),s.preventDefault(),!1;if("wep"==o.wds24g.encryption.getValue()){var a=o.wds24g.wepFormat1.getValue(),w=o.wds24g.wepKey1.getValue();if("asic"==a&&!/^([A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\ ]{5}|[A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\ ]{13})$/.test(w))return o.wds24g.wepKey1.setError(r.su.CHAR.ERROR["00000120"]),s.preventDefault(),!1;if("hex"==a&&!/^([0-9a-fA-F]{10}|[0-9a-fA-F]{26})$/.test(w))return o.wds24g.wepKey1.setError(r.su.CHAR.ERROR["00000121"]),s.preventDefault(),!1}}}},"models.wds24g.enable":{"ev_value_change":function(e,s,d){o.wds24g.enable.isDisabled()||"off"===s?(i.wdsView.wds24gFieldset.hide(),this.deviceConfigs.supportDwds&&(o.wds24g.dwdsMode.hide(),o.wds24g.dwdsMode.disable(),o.wds24g.dwdsMode.reset())):this.deviceConfigs.supportDwds?(o.wds24g.dwdsMode.show(),o.wds24g.dwdsMode.enable(),o.wds24g.dwdsMode.setValue(o.wds24g.dwdsMode.getValue())):i.wdsView.wds24gFieldset.show(),this.initEnable()}},"models.wds24g.encryption":{"ev_value_change":function(e,s){switch(i.wdsView.psk24gFieldset.hide(),i.wdsView.wep24gFieldset.hide(),s){case"psk":i.wdsView.psk24gFieldset.show();break;case"wep":i.wdsView.wep24gFieldset.show()}}},"models.wds5g1":{"ev_model_submit":function(e,s){this.wds5g1LoadedHandler(e,s),"off"===o.wds24g.enable.getValue()&&o.wds24g.disableWds(),this.deviceConfigs.isTriband&&"off"===o.wds5g2.enable.getValue()&&o.wds5g2.disableWds()},"ev_loaded":this.wds5g1LoadedHandler,"ev_will_auto_save":function(e,s){var d=o.wds5g1.enable.getValue(),i=o.wds5g1.dwdsMode.getValue(),t=o.wds5g1.ssid.getValue(),n=o.wds5g1.mac.getValue();if("on"===d&&"ap"!==i){if(!t&&!n)return o.wds5g1.mac.setError(r.su.CHAR.ERROR["00000040"]),s.preventDefault(),!1;if("wep"==o.wds5g1.encryption.getValue()){var a=o.wds5g1.wepFormat1.getValue(),w=o.wds5g1.wepKey1.getValue();if("asic"==a&&!/^([A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\ ]{5}|[A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\ ]{13})$/.test(w))return o.wds5g1.wepKey1.setError(r.su.CHAR.ERROR["00000120"]),s.preventDefault(),!1;if("hex"==a&&!/^([0-9a-fA-F]{10}|[0-9a-fA-F]{26})$/.test(w))return o.wds5g1.wepKey1.setError(r.su.CHAR.ERROR["00000121"]),s.preventDefault(),!1}}}},"models.wds5g1.enable":{"ev_value_change":function(e,s,d){o.wds5g1.enable.isDisabled()||"off"===s?(i.wdsView.wds5g1Fieldset.hide(),this.deviceConfigs.supportDwds&&(o.wds5g1.dwdsMode.hide(),o.wds5g1.dwdsMode.disable(),o.wds5g1.dwdsMode.reset())):this.deviceConfigs.supportDwds?(o.wds5g1.dwdsMode.show(),o.wds5g1.dwdsMode.enable(),o.wds5g1.dwdsMode.setValue(o.wds5g1.dwdsMode.getValue())):i.wdsView.wds5g1Fieldset.show(),this.initEnable()}},"models.wds5g1.encryption":{"ev_value_change":function(e,s){switch(i.wdsView.psk5g1Fieldset.hide(),i.wdsView.wep5g1Fieldset.hide(),s){case"psk":i.wdsView.psk5g1Fieldset.show();break;case"wep":i.wdsView.wep5g1Fieldset.show()}}},"models.wds5g2":{"ev_model_submit":function(e,s){this.wds5g2LoadedHandler(e,s),"off"===o.wds24g.enable.getValue()&&o.wds24g.disableWds(),"off"===o.wds5g1.enable.getValue()&&o.wds5g1.disableWds()},"ev_loaded":this.wds5g2LoadedHandler,"ev_will_auto_save":function(e,s){if(this.deviceConfigs.isTriband){var d=o.wds5g2.enable.getValue(),i=o.wds5g2.dwdsMode.getValue(),t=o.wds5g2.ssid.getValue(),n=o.wds5g2.mac.getValue();if("on"===d&&"ap"!==i){if(!t&&!n)return o.wds5g2.mac.setError(r.su.CHAR.ERROR["00000040"]),s.preventDefault(),!1;if("wep"==o.wds5g2.encryption.getValue()){var a=o.wds5g2.wepFormat1.getValue(),w=o.wds5g2.wepKey1.getValue();if("asic"==a&&!/^([A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\ ]{5}|[A-Za-z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\;\:\'\"\\\|\/\?\.\,\<\>\ ]{13})$/.test(w))return o.wds5g2.wepKey1.setError(r.su.CHAR.ERROR["00000120"]),s.preventDefault(),!1;if("hex"==a&&!/^([0-9a-fA-F]{10}|[0-9a-fA-F]{26})$/.test(w))return o.wds5g2.wepKey1.setError(r.su.CHAR.ERROR["00000121"]),s.preventDefault(),!1}}}else s.preventDefault()}},"models.wds5g2.enable":{"ev_value_change":function(e,s,d){o.wds5g2.enable.isDisabled()||"off"===s?(i.wdsView.wds5g2Fieldset.hide(),this.deviceConfigs.supportDwds&&(o.wds5g2.dwdsMode.hide(),o.wds5g2.dwdsMode.disable(),o.wds5g2.dwdsMode.reset())):this.deviceConfigs.supportDwds?(o.wds5g2.dwdsMode.show(),o.wds5g2.dwdsMode.enable(),o.wds5g2.dwdsMode.setValue(o.wds5g2.dwdsMode.getValue())):i.wdsView.wds5g2Fieldset.show(),this.initEnable()}},"models.wds5g2.encryption":{"ev_value_change":function(e,s){switch(i.wdsView.psk5g2Fieldset.hide(),i.wdsView.wep5g2Fieldset.hide(),s){case"psk":i.wdsView.psk5g2Fieldset.show();break;case"wep":i.wdsView.wep5g2Fieldset.show()}}}})}},function(e,d,i,s,t,n){return{wds24gDisableStep1:!1,wds24gDisableStep2:!1,wds24gDisableStep3:!1,wds5g1DisableStep1:!1,wds5g1DisableStep2:!1,wds5g1DisableStep3:!1,wds5g2DisableStep1:!1,wds5g2DisableStep2:!1,wds5g2DisableStep3:!1,wds2gWds5gCompatible:"no",wdsGuestCompatible:"no",is24gDisabled:function(e){if(this.wds24gDisableStep2)return r.su.CHAR.WDS.ENABLE_TIPS;if("no"===this.wdsGuestCompatible&&this.wds24gDisableStep3)return r.su.CHAR.ERROR["00000113"];if("no"===this.wds2gWds5gCompatible){if("on"===i.wds5g1.enable.getValue())return this.deviceConfigs.isTriband?r.su.CHAR.WDS.WDS_BAND_NOTICE_2:r.su.CHAR.WDS.WDS_BAND_NOTICE;if("on"===i.wds5g2.enable.getValue())return this.deviceConfigs.isTriband?r.su.CHAR.WDS.WDS_BAND_NOTICE_2:r.su.CHAR.WDS.WDS_BAND_NOTICE}return!1},is5g1Disabled:function(e){if(this.wds5g1DisableStep2)return r.su.CHAR.WDS.ENABLE_TIPS;if("no"===this.wdsGuestCompatible&&this.wds5g1DisableStep3)return r.su.CHAR.ERROR["00000113"];if("no"===this.wds2gWds5gCompatible){if("on"===i.wds24g.enable.getValue())return this.deviceConfigs.isTriband?r.su.CHAR.WDS.WDS_BAND_NOTICE_2:r.su.CHAR.WDS.WDS_BAND_NOTICE;if("on"===i.wds5g2.enable.getValue())return this.deviceConfigs.isTriband?r.su.CHAR.WDS.WDS_BAND_NOTICE_2:r.su.CHAR.WDS.WDS_BAND_NOTICE}return!1},is5g2Disabled:function(e){if(!this.deviceConfigs.isTriband)return!0;if(this.wds5g2DisableStep2)return r.su.CHAR.WDS.ENABLE_TIPS;if("no"===this.wdsGuestCompatible&&this.wds5g2DisableStep3)return r.su.CHAR.ERROR["00000113"];if("no"===this.wds2gWds5gCompatible){if("on"===i.wds24g.enable.getValue())return this.deviceConfigs.isTriband?r.su.CHAR.WDS.WDS_BAND_NOTICE_2:r.su.CHAR.WDS.WDS_BAND_NOTICE;if("on"===i.wds5g1.enable.getValue())return this.deviceConfigs.isTriband?r.su.CHAR.WDS.WDS_BAND_NOTICE_2:r.su.CHAR.WDS.WDS_BAND_NOTICE}return!1},initEnable:function(){var e;!1!==(e=this.is24gDisabled())?(i.wds24g.enable.disable(),d.wdsView.wds24gFieldset.hide(),i.wds24g.enable.setTips(e),i.wds24g.dwdsMode.hide()):(i.wds24g.enable.enable(),i.wds24g.enable.setTips("")),!1!==(e=this.is5g1Disabled())?(i.wds5g1.enable.disable(),d.wdsView.wds5g1Fieldset.hide(),i.wds5g1.enable.setTips(e),i.wds5g1.dwdsMode.hide()):(i.wds5g1.enable.enable(),i.wds5g1.enable.setTips("")),!1!==(e=this.is5g2Disabled())?(i.wds5g2.enable.disable(),d.wdsView.wds5g2Fieldset.hide(),i.wds5g2.enable.setTips(e),i.wds5g2.dwdsMode.hide()):(i.wds5g2.enable.enable(),i.wds5g2.enable.setTips(""))},wds24gLoadedHandler:function(e,s){this.initEnable(),"2G"!==s.supportBand&&"none"!==s.supportBand||d.wdsView.wds5g1Panel.hide(),this.deviceConfigs.supportWdsDualmode&&(i.wds24g.wdsMode.disable(),i.wds24g.wdsMode.hide()),this.deviceConfigs.supportDwds||(i.wds24g.dwdsMode.disable(),i.wds24g.dwdsMode.hide())},wds5g1LoadedHandler:function(e,s){this.initEnable(),this.deviceConfigs.supportWdsDualmode&&(i.wds5g1.wdsMode.disable(),i.wds5g1.wdsMode.hide())},wds5g2LoadedHandler:function(e,s){this.deviceConfigs.isTriband&&(this.initEnable(),this.deviceConfigs.supportWdsDualmode&&(i.wds5g2.wdsMode.disable(),i.wds5g2.wdsMode.hide()))},showDwdsFields:function(e,s){(s=!!s)?d.wdsView["wds"+e+"Fieldset"].show():d.wdsView["wds"+e+"Fieldset"].hide()}}})}(jQuery);