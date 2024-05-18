!function(n){n.su.moduleManager.define("portal",{services:["moduleLoader","ajax","device","vtype"],models:["guestPermissionAdv","portalAuthAdv","portalAuthCfg","wireless24g"],stores:["securityStore","portalAuthTypeStore","portalAuthDurationStore"],views:["guestNetworkAdvView"],listeners:{"ev_on_launch":function(e,i,s,r,t,o,u){i=this;"ap"===u.device.getCurrentMode()&&(s.guestNetworkAdvView.guestPermissionsPanel.hide(),s.guestNetworkAdvView.guestNetworkPanel.hide()),this.control({"#login-page-edit-btn":{"ev_button_click":function(e){s.guestNetworkAdvView.logoBrowse.setNormal(),s.guestNetworkAdvView.loginPageEditMsg.show();var t=r.portalAuthAdv.authType.getValue();"simple"==(localStorage.authType=t)?s.guestNetworkAdvView.portalLoginPreview.showPassword():s.guestNetworkAdvView.portalLoginPreview.hidePassword(),r.portalAuthCfg.load({success:function(){var e=r.portalAuthCfg.getData();e.title||r.portalAuthCfg.title.setValue(n.su.CHAR.GUEST_NETWORK.WELCOME),e.content||r.portalAuthCfg.content.setValue(n.su.CHAR.GUEST_NETWORK.TERMS_OF_USE_NOTE),s.guestNetworkAdvView.portalLoginPreview.setTitle(r.portalAuthCfg.title.getValue())}})}},"#restore-default-image":{"ev_button_click":function(e){s.guestNetworkAdvView.portalLoginPreview.restoreDefault()}},"#full-screen-preview":{"ev_button_click":function(e){window.open("./portalPreview.html")}},"#logo-browse":{"ev_file_change":function(e,t){if(s.guestNetworkAdvView.logoBrowse.setNormal(),100<s.guestNetworkAdvView.logoBrowse.getFileSize())return s.guestNetworkAdvView.logoBrowse.setError(n.su.CHAR.GUEST_NETWORK.FILE_SIZE_EXCEEDED),!1;var o=s.guestNetworkAdvView.logoBrowse.getFileName(),r=u.vtype.validate(o,{vtype:"string_file",extension:["png","jpg"]});if(1!=r)return s.guestNetworkAdvView.logoBrowse.setError(r),!1;u.ajax.upload({proxy:"portalLogoUploadProxy",fileId:"logo-browse",success:function(e){i.preView(s.guestNetworkAdvView.logoBrowse.getFile(),"logo-imge")}})}},"#background-browse":{"ev_file_change":function(e,t){if(s.guestNetworkAdvView.backgroundBrowse.setNormal(),2048<s.guestNetworkAdvView.backgroundBrowse.getFileSize())return s.guestNetworkAdvView.backgroundBrowse.setError(n.su.CHAR.GUEST_NETWORK.FILE_SIZE_EXCEEDED),!1;var o=s.guestNetworkAdvView.backgroundBrowse.getFileName(),r=u.vtype.validate(o,{vtype:"string_file",extension:["png","jpg"]});if(1!=r)return s.guestNetworkAdvView.backgroundBrowse.setError(r),!1;u.ajax.upload({proxy:"portalBackgroundUploadProxy",fileId:"background-browse",success:function(e){i.preView(s.guestNetworkAdvView.backgroundBrowse.getFile(),"background-imge")}})}},"#portal-submit-button":{"ev_button_click":function(e){r.portalAuthCfg.submit({success:function(){s.guestNetworkAdvView.loginPageEditMsg.hide()}})}},"#portal-cancel-button":{"ev_button_click":function(e){s.guestNetworkAdvView.loginPageEditMsg.hide()}},"#facebook-config-btn":{"ev_button_click":function(e){s.guestNetworkAdvView.facebookCfgCfmMsg.show(),window.open("https://www.facebook.com")}},"#facebook-cfg-cfm-msg":{"ev_msg_ok":function(){location.reload()},"ev_msg_no":function(e,t){t.preventDefault(),window.open("https://www.facebook.com")}}}),this.listen({"models.portalAuthAdv.authType":{"ev_value_change":function(e,t,o){"none"==t?(s.guestNetworkAdvView.portalAuthTypeSimple.show(),s.guestNetworkAdvView.portalAuthTypeFacebook.hide(),r.portalAuthAdv.password.disable(),r.portalAuthAdv.password.hide()):"simple"==t?(s.guestNetworkAdvView.portalAuthTypeSimple.show(),s.guestNetworkAdvView.portalAuthTypeFacebook.hide(),r.portalAuthAdv.password.enable(),r.portalAuthAdv.password.show()):(s.guestNetworkAdvView.portalAuthTypeSimple.hide(),s.guestNetworkAdvView.portalAuthTypeFacebook.show())}},"models.portalAuthCfg.title":{"ev_value_change":function(e,t,o){s.guestNetworkAdvView.portalLoginPreview.setTitle(t),localStorage.title=t}},"models.portalAuthAdv.redirect":{"ev_value_change":function(e,t,o){"on"==t?(r.portalAuthAdv.redirectUrl.enable(),r.portalAuthAdv.redirectUrl.show()):(r.portalAuthAdv.redirectUrl.disable(),r.portalAuthAdv.redirectUrl.hide())}}}),r.guestPermissionAdv.load({success:function(e){"ap"===u.device.getCurrentMode()&&r.guestPermissionAdv.accessLocal.hide()}}),r.portalAuthAdv.load()}},init:function(e,t,o,r,i,s){}},function(e,i,t,o,r,s){var u="off",a="off",l="off";return{preView:function(e,t){var o=e.files[0];if(!o)return!1;var r=new FileReader;r.readAsDataURL(o),r.onload=function(e){"logo-imge"==t&&(i.guestNetworkAdvView.portalLoginPreview.changeLogo(this.result),localStorage.logo=this.result),"background-imge"==t&&(i.guestNetworkAdvView.portalLoginPreview.changeBackground(this.result),localStorage.background=this.result)}},showNote:function(e,t){switch(0===e.disableBy?i.guestNetworkAdvView.guestNetworkNote.setText(n.su.CHAR.GUEST_NETWORK.SWITCH_NOTICE1):i.guestNetworkAdvView.guestNetworkNote.setText(n.su.CHAR.GUEST_NETWORK.SWITCH_NOTICE2),t){case"24G":u=e.disabled;break;case"51G":a=e.disabled;break;case"52G":l=e.disabled}s.device.getIsTriband()?"on"===u&&"on"===a&&"on"===l?i.guestNetworkAdvView.guestNetworkNote.show():i.guestNetworkAdvView.guestNetworkNote.hide():"on"===u&&"on"===a?i.guestNetworkAdvView.guestNetworkNote.show():i.guestNetworkAdvView.guestNetworkNote.hide()}}})}(jQuery);