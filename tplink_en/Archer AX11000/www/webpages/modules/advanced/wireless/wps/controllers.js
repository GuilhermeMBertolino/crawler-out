!function(E){E.su.moduleManager.define("wps",{deps:["navigatorController"],services:["ajax","device"],models:["wps","routerPIN","wpsPIN"],stores:["wpsPINStore"],views:["wpsView"],listeners:{"ev_on_launch":function(e,n,p,s,t,i,w){p.wpsView.wpsContentWrapper.hide(),p.wpsView.routerPinFieldset.hide(),p.wpsView.clientPinFieldset.show(),p.wpsView.wpsClientConnectStatus.reset(),p.wpsView.wpsClientConnectStatus.hide(),p.wpsView.routerPINLock.hide(),s.wps.wps.enable(),n.init(),s.wps.load({success:function(e){n.wait_time=parseInt(e.wait_time)||0}}),s.routerPIN.load(),s.wpsPIN.load({success:function(){var e=s.wpsPIN.getData();p.wpsView.routerPINNote.setText(E.su.CHAR.WPS.ROUTER_PIN_NOTE.replace("%s",e.wpsPin))}}),n.control({"#wps-enable":{"ev_view_change":function(){s.wps.submit()}},"#router-pin-enable":{"ev_view_change":function(){s.routerPIN.submit({success:function(){n.pin_lock_flag?p.wpsView.routerPINLock.show():p.wpsView.routerPINLock.hide()}})}},"#personal-device-PIN":{"ev_textbox_blur":function(){var e=p.wpsView.personalDevicePIN.getValue(),e=n.checkClientPIN(e);1!=e&&p.wpsView.personalDevicePIN.setError(e)},"ev_textbox_focus":function(){p.wpsView.wpsClientConnectStatus.reset(),p.wpsView.wpsClientConnectStatus.hide(),p.wpsView.personalDevicePIN.setNormal()}},"#wps-client-connect-btn":{"ev_button_click":function(){p.wpsView.wpsClientConnectStatus.reset(),p.wpsView.wpsClientConnectStatus.hide();var e=p.wpsView.personalDevicePIN.getValue(),s=n.checkClientPIN(e);1!=s?p.wpsView.personalDevicePIN.setError(s):(p.wpsView.wpsClientConnectBtn.hide(),p.wpsView.wpsClientCancelBtn.show(),p.wpsView.wpsClientConnectStatus.setLoading(E.su.CHAR.WPS.CONNECTING),p.wpsView.wpsClientConnectStatus.show(),w.ajax.request({proxy:"wpsPinStartProxy",data:{wpsPin:e},success:function(e){e=e.wpsTimeout;n.connect1(e)},fail:function(e){"error"==e.wpsStatus&&p.wpsView.wpsClientConnectStatus.setFailed(E.su.CHAR.WPS.CLIENT_PIN_ERROR)}}))}},"#wps-client-cancel-btn":{"ev_button_click":function(){n.pinInterval&&clearInterval(n.pinInterval),w.ajax.request({proxy:"wpsPinCancelProxy"}),p.wpsView.wpsClientCancelBtn.hide(),p.wpsView.wpsClientConnectStatus.reset(),p.wpsView.wpsClientConnectStatus.hide(),p.wpsView.wpsClientConnectBtn.show()}},"#wps-router-get-new-pin-btn":{"ev_button_click":function(){p.wpsView.wpsGetNewPINBtn.loading(!0),s.wpsPIN.getProxy().generate({success:function(e,s){n.pin_lock_flag=!1,p.wpsView.routerPINLock.hide(),p.wpsView.wpsGetNewPINBtn.loading(!1),p.wpsView.routerPINNote.setText(E.su.CHAR.WPS.ROUTER_PIN_NOTE.replace("%s",e.wpsPin))}})}},"#wps-router-default-btn":{"ev_button_click":function(){p.wpsView.wpsDefaultPINBtn.loading(!0),s.wpsPIN.getProxy().getDefault({success:function(e,s){p.wpsView.wpsDefaultPINBtn.loading(!1),p.wpsView.routerPINNote.setText(E.su.CHAR.WPS.ROUTER_PIN_NOTE.replace("%s",e.wpsPin))}})}},"#wps-button":{"ev_wps_button_click":function(e,s){"start"==s.clickType?w.ajax.request({proxy:"wpsButtonStartProxy",success:function(e){n.connect2()}}):(n.pbcInterval&&clearInterval(n.pbcInterval),w.ajax.request({proxy:"wpsPinCancelProxy"}),p.wpsView.wpsButton.reset(),p.wpsView.wpsButtonConnectStatus.reset(),p.wpsView.wpsButtonConnectStatus.hide())}},"#wps-note => #go-to-wireless-settings":{"click":function(){i.navigatorController.goTo("wirelessSettingsAdv")}}}),n.listen({"models.wps.wps":{"ev_value_change":function(e,s,t){"on"==s?p.wpsView.wpsContentWrapper.show():(p.wpsView.wpsContentWrapper.hide(),clearInterval(n.pinInterval),clearInterval(n.pbcInterval)),null!=t&&0<n.wait_time&&(p.wpsView.wpsEnableTipMsg.show(),p.wpsView.wpsEnableTipProbar.animate({duration:1e3*n.wait_time,percentageStart:0,percentageEnd:100,callback:function(){p.wpsView.wpsEnableTipMsg.hide()}}))}},"views.wpsView.wpsPinType":{"ev_value_change":function(e,s,t){"client"==s?(p.wpsView.routerPinFieldset.hide(),p.wpsView.clientPinFieldset.show()):(p.wpsView.clientPinFieldset.hide(),p.wpsView.routerPinFieldset.show(),n.pin_lock_flag?p.wpsView.routerPINLock.show():p.wpsView.routerPINLock.hide())}}}),p.wpsView.personalDevicePIN.setMaxLength(8),p.wpsView.wpsPinType.setValue("client"),p.wpsView.wpsClientCancelBtn.hide()},"ev_before_destroy":function(){this.beforeDestroy()}},init:function(e,s,t,n,p,i){}},function(S,P,_,e,s,I){var N;return{wait_time:0,"pin_lock_flag":!1,"init":function(){P.wpsView.wpsNote.setText(""),P.wpsView.wpsNote.hide();var c,r="",l="",u="",C="";I.ajax.request({proxy:"wpsPinProxyAsync",ajax:{"async":!1},success:function(e){r=e.lock2g,l=e.lock5g,u=e.lock5g2,C=e.wpsLabel}}),I.ajax.request({proxy:"wpsReadProxy",ajax:{"async":!1},success:function(e){var s,t,n,p,i,w,a;function o(e){return("off"==p.enable||"on"==p.hidden||"psk"!=p.encryption||"psk"==p.encryption&&"tkip"==p.pskCipher)&&(a+=1,e+='<p class="wps-disable-note-title">'+E.su.CHAR.WPS.WPS_DISABLE_NOTE_TITLE_24G+"</p>","off"==p.enable&&(e+='<p><span>-</span><span class="wps-disable-note-step">'+E.su.CHAR.WPS.WPS_DISABLE_NOTE_STEP1+"</span></p>"),"on"==p.hidden&&(e+='<p><span>-</span><span class="wps-disable-note-step">'+E.su.CHAR.WPS.WPS_DISABLE_NOTE_STEP2+"</span></p>"),"psk"!=p.encryption&&(e+='<p><span>-</span><span class="wps-disable-note-step">'+E.su.CHAR.WPS.WPS_DISABLE_NOTE_STEP3_2+"</span></p>"),"psk"==p.encryption)&&"tkip"==p.pskCipher&&(e+='<p><span>-</span><span class="wps-disable-note-step">'+E.su.CHAR.WPS.WPS_DISABLE_NOTE_STEP3_1+"</span></p>"),("off"==i.enable||"on"==i.hidden||"psk"!=i.encryption||"psk"==i.encryption&&"tkip"==i.pskCipher)&&(a+=1,e+='<p class="wps-disable-note-title">'+(I.device.getIsTriband()?E.su.CHAR.WPS.WPS_DISABLE_NOTE_TITLE_51G:E.su.CHAR.WPS.WPS_DISABLE_NOTE_TITLE_5G)+"</p>","off"==i.enable&&(e+='<p><span>-</span><span class="wps-disable-note-step">'+E.su.CHAR.WPS.WPS_DISABLE_NOTE_STEP1+"</span></p>"),"on"==i.hidden&&(e+='<p><span>-</span><span class="wps-disable-note-step">'+E.su.CHAR.WPS.WPS_DISABLE_NOTE_STEP2+"</span></p>"),"psk"!=i.encryption&&(e+='<p><span>-</span><span class="wps-disable-note-step">'+E.su.CHAR.WPS.WPS_DISABLE_NOTE_STEP3_2+"</span></p>"),"psk"==i.encryption)&&"tkip"==i.pskCipher&&(e+='<p><span>-</span><span class="wps-disable-note-step">'+E.su.CHAR.WPS.WPS_DISABLE_NOTE_STEP3_1+"</span></p>"),e}void 0!==e&&(N=e.wpsTimeout,P.wpsView.wpsButton.setTimeLeft(parseInt(N/1e3)),c=e.available,e.disabled,c?"lock"!=r&&"lock"!=l&&"lock"!=u||"on"==C&&(S.pin_lock_flag=!0,P.wpsView.routerPINLock.show()):(s=E.Deferred(),t=E.Deferred(),n=E.Deferred(),I.ajax.request({proxy:"wpsWireless2gProxy",ajax:{"async":!1},success:function(e){p=e,s.resolve()}}),I.ajax.request({proxy:"wpsWireless5gProxy",ajax:{"async":!1},success:function(e){i=e,t.resolve()}}),I.device.getIsTriband()&&I.ajax.request({proxy:"wpsWireless5g2Proxy",ajax:{"async":!1},success:function(e){w=e,n.resolve()}}),a=0,I.device.getIsTriband()?E.when(s,t,n).done(function(){var e=o(e=(e="")+("<span>"+E.su.CHAR.WPS.WPS_DISABLE_NOTE+"</span>")+'<div class="step">');("off"==w.enable||"on"==w.hidden||"psk"!=w.encryption||"psk"==w.encryption&&"tkip"==w.pskCipher)&&(a+=1,e+='<p class="wps-disable-note-title">'+E.su.CHAR.WPS.WPS_DISABLE_NOTE_TITLE_52G+"</p>","off"==w.enable&&(e+='<p><span>-</span><span class="wps-disable-note-step">'+E.su.CHAR.WPS.WPS_DISABLE_NOTE_STEP1+"</span></p>"),"on"==w.hidden&&(e+='<p><span>-</span><span class="wps-disable-note-step">'+E.su.CHAR.WPS.WPS_DISABLE_NOTE_STEP2+"</span></p>"),"psk"!=w.encryption&&(e+='<p><span>-</span><span class="wps-disable-note-step">'+E.su.CHAR.WPS.WPS_DISABLE_NOTE_STEP3_2+"</span></p>"),"psk"==w.encryption)&&"tkip"==w.pskCipher&&(e+='<p><span>-</span><span class="wps-disable-note-step">'+E.su.CHAR.WPS.WPS_DISABLE_NOTE_STEP3_1+"</span></p>"),e+="</div>",3===a?(P.wpsView.wpsNote.setText(e),P.wpsView.wpsNote.show(),_.wps.wps.disable(),P.wpsView.wpsContentWrapper.disable()):_.wps.wps.enable()}):E.when(s,t).done(function(){var e=o(""+("<span>"+E.su.CHAR.WPS.WPS_DISABLE_NOTE+"</span>")+'<div class="step">');e+="</div>",2===a?(P.wpsView.wpsNote.setText(e),P.wpsView.wpsNote.show(),_.wps.wps.disable(),P.wpsView.wpsContentWrapper.disable()):_.wps.wps.enable()})))}})},"checkClientPIN":function(e){return""==e?E.su.CHAR.VTYPETEXT.BLANKTEXT:/[0-9]+/.test(e)?8==e.length||E.su.CHAR.WPS.PIN_8_NOTE:E.su.CHAR.VTYPETEXT.INVALIDTEXT},"connect1":function(s){var t=this,n=0,e=(t.pinInterval&&clearInterval(t.pinInterval),function(){I.ajax.request({proxy:"wpsPinConnectProxy",success:function(e){n++,void 0!==e&&("success"==e.wpsStatus?(clearInterval(t.pinInterval),P.wpsView.wpsClientConnectStatus.setSuccess(E.su.CHAR.WPS.CLIENT_CONNECTED_SUCCESS.replace("%s",e.mac)),P.wpsView.wpsClientCancelBtn.hide(),P.wpsView.wpsClientConnectBtn.show()):"ok"!=e.wpsStatus&&("error"==e.wpsStatus&&(P.wpsView.personalDevicePIN.setError(E.su.CHAR.WPS.CLIENT_PIN_ERROR),P.wpsView.wpsClientConnectStatus.reset(),P.wpsView.wpsClientConnectStatus.hide()),"failed"==e.wpsStatus&&P.wpsView.wpsClientConnectStatus.setFailed(E.su.CHAR.WPS.CLIENT_CONNECTED_ERROR),"overlap"==e.wpsStatus&&P.wpsView.wpsClientConnectStatus.setFailed(E.su.CHAR.WPS.CLIENT_CONNECTED_OVERLAP),"timeout"==e.wpsStatus&&P.wpsView.wpsClientConnectStatus.setFailed(E.su.CHAR.WPS.CLIENT_CONNECTED_TIMEOUT),"na"==e.wpsStatus&&P.wpsView.wpsClientConnectStatus.setFailed(E.su.CHAR.WPS.CLIENT_CONNECTED_INACT),clearInterval(t.pinInterval),P.wpsView.wpsClientCancelBtn.hide(),P.wpsView.wpsClientConnectBtn.show()),s/1e3<=n)&&t.pinInterval&&(clearInterval(t.pinInterval),n=0,P.wpsView.wpsClientConnectStatus.setFailed(E.su.CHAR.WPS.CLIENT_CONNECTED_NOT_FOUND),P.wpsView.wpsClientCancelBtn.hide(),P.wpsView.wpsClientConnectBtn.show())}})});e(),t.pinInterval=setInterval(e,1e3)},"connect2":function(){var s=this,t=0,e=(s.pbcInterval&&clearInterval(s.pbcInterval),function(){I.ajax.request({proxy:"wpsButtonConnectProxy",success:function(e){t++,void 0!==e&&("success"==e.wpsStatus?(clearInterval(s.pbcInterval),P.wpsView.wpsButton.reset(),P.wpsView.wpsButtonConnectStatus.setSuccess(E.su.CHAR.WPS.CLIENT_CONNECTED_SUCCESS.replace("%s",e.mac)),P.wpsView.wpsButtonConnectStatus.show(),setTimeout(function(){P.wpsView.wpsButtonConnectStatus.reset(),P.wpsView.wpsButtonConnectStatus.hide()},3e3)):"ok"!=e.wpsStatus&&("error"==e.wpsStatus&&P.wpsView.wpsButtonConnectStatus.setFailed(E.su.CHAR.WPS.CLIENT_PIN_ERROR),"failed"==e.wpsStatus&&P.wpsView.wpsButtonConnectStatus.setFailed(E.su.CHAR.WPS.CLIENT_CONNECTED_ERROR),"overlap"==e.wpsStatus&&P.wpsView.wpsButtonConnectStatus.setFailed(E.su.CHAR.WPS.CLIENT_CONNECTED_OVERLAP),"timeout"==e.wpsStatus&&P.wpsView.wpsButtonConnectStatus.setFailed(E.su.CHAR.WPS.CLIENT_CONNECTED_TIMEOUT),"na"==e.wpsStatus&&P.wpsView.wpsButtonConnectStatus.setFailed(E.su.CHAR.WPS.CLIENT_CONNECTED_INACT),clearInterval(s.pbcInterval),P.wpsView.wpsButton.reset(),P.wpsView.wpsButtonConnectStatus.show(),setTimeout(function(){P.wpsView.wpsButtonConnectStatus.reset(),P.wpsView.wpsButtonConnectStatus.hide()},3e3)),N/1e3<=t)&&s.pbcInterval&&(clearInterval(s.pbcInterval),t=0,P.wpsView.wpsButton.reset(),P.wpsView.wpsButtonConnectStatus.setFailed(E.su.CHAR.WPS.CLIENT_CONNECTED_NOT_FOUND),P.wpsView.wpsButtonConnectStatus.show(),setTimeout(function(){P.wpsView.wpsButtonConnectStatus.reset(),P.wpsView.wpsButtonConnectStatus.hide()},3e3))}})});e(),s.pbcInterval=setInterval(e,1e3)},"beforeDestroy":function(){clearInterval(S.pinInterval),clearInterval(S.pbcInterval)}}})}(jQuery);