!function(c){c.su.moduleManager.define("vpnClient",{services:["ajax","vtype","timer"],stores:["vpnClientGridStore","vpnTypeStore","wanStore","pptpEncryptionStore","deviceListGridStore","addDeviceListStore","addOnlineListStore","addOfflineListStore"],models:["vpnClientModel","vpnServerListModel"],views:["vpnClientView"],listeners:{ev_on_launch:function(e,t,n,s,i,r,a){s.vpnClientModel.load(),i.deviceListGridStore.load(),i.addDeviceListStore.load(),t.startRefreshServerList()}},init:function(a,o,i,d,e,s){this.configViews({id:"vpnClientView",items:[{id:"grid-client",configs:{minLines:0,popEditor:{addTitle:c.su.CHAR.VPN_CLIENT.ADD_PROFILE,content:"#grid-client-popEditor",fields:[{name:"username"},{name:"password"},{name:"des"},{name:"type"},{name:"psk"},{name:"encryption"}]},paging:{},columns:[{text:c.su.CHAR.VPN_CLIENT.DESCRIPTION,dataIndex:"des"},{text:c.su.CHAR.VPN_CLIENT.VPN_TYPE,dataIndex:"type",renderer:function(e){return c.su.CHAR.VPN_CLIENT["TYPE_"+e.toUpperCase()]}},{text:c.su.CHAR.VPN_CLIENT.STATUS,dataIndex:"statusFlag",renderer:function(e,t){return"connected"==e?'<span class="vpn-status-value">'+c.su.CHAR.VPN_CLIENT.CONNECTED+'</span><div id="conn"></div>':"disconnected"==e?c.su.CHAR.VPN_CLIENT.DISCONN:"connecting"==e?c.su.CHAR.VPN_CLIENT.CONNECTING:void 0}},{text:c.su.CHAR.VPN_CLIENT.ENABLE,dataIndex:"enable",xtype:"customWidget",widgetName:"switch",cls:"status",settings:{trueValue:"on",falseValue:"off"}},{xtype:"actioncolumn",text:c.su.CHAR.VPN_CLIENT.MODIFY,renderer:function(e,t){var n='<a href="javascript:void(0)" class="grid-content-btn grid-content-btn-edit btn-edit">';n+='<span class="icon"></span>';return'<a href="javascript:void(0)" class="grid-content-btn grid-content-btn-edit btn-edit"><span class="icon"></span><span class="text"></span></a><a href="javascript:void(0)" class="grid-content-btn btn-delete"><span class="icon"></span><span class="text"></span></a>'}}]}},{id:"grid-device-list",configs:{minLines:0,paging:{},columns:[{text:c.su.CHAR.VPN_CLIENT.TYPE,dataIndex:"clientType",cls:"s-hide",width:"12%",renderer:function(e,t){var n="",s="";switch(e=e.toLowerCase()){case"pc":n="icon-pc";break;case"phone":n="icon-phone";break;case"pad":n="icon-pad";break;case"camera":n="icon-camera";break;case"printer":n="icon-printer";break;case"other":n="icon-other";break;default:n="icon-"+e}return s+'<div class="device-type-container widget-container">'+('<span class="icon '+n+' "></span></div>')}},{text:c.su.CHAR.VPN_CLIENT.DEVICE_NAME,dataIndex:"name",width:"32%"},{text:c.su.CHAR.VPN_CLIENT.MAC_ADDRESS,dataIndex:"mac",width:"25%"},{text:c.su.CHAR.VPN_CLIENT.VPN_ACCESS,dataIndex:"access",xtype:"customWidget",widgetName:"switch",cls:"status s-hide m-hide",settings:{trueValue:"on",falseValue:"off"}},{xtype:"actioncolumn",text:c.su.CHAR.VPN_CLIENT.MODIFY,renderer:function(e,t){var n='<a href="javascript:void(0)" class="grid-content-btn  btn-delete">';n+='<span class="icon"></span>';return'<a href="javascript:void(0)" class="grid-content-btn  btn-delete"><span class="icon"></span><span class="text"></span></a>'}}]}},{id:"grid-device-online-list",configs:{paging:{items:[{name:"5",value:5,selected:!0}]},columns:[{xtype:"checkcolumn"},{text:c.su.CHAR.VPN_CLIENT.DEVICE_TYPE,cls:"center-td",dataIndex:"clientType",width:120,renderer:function(e,t){return'<span class="icon '+e+'"></span>'}},{text:c.su.CHAR.VPN_CLIENT.DEVICE_NAME,dataIndex:"name"},{text:c.su.CHAR.VPN_CLIENT.MAC_ADDRESS,dataIndex:"mac",width:"25%"}]}},{id:"grid-device-offline-list",configs:{paging:{items:[{name:"5",value:5,selected:!0}]},columns:[{xtype:"checkcolumn"},{text:c.su.CHAR.VPN_CLIENT.DEVICE_TYPE,cls:"center-td",dataIndex:"clientType",width:120,renderer:function(e,t){return'<span class="icon '+e+'"></span>'}},{text:c.su.CHAR.VPN_CLIENT.DEVICE_NAME,dataIndex:"name"},{text:c.su.CHAR.VPN_CLIENT.MAC_ADDRESS,dataIndex:"mac",width:"25%"}]}}]}),this.listen({"models.vpnClientModel.enable":{ev_value_change:function(e,t){"on"==t?(o.vpnClientView.serverListPanel.show(),o.vpnClientView.deviceListPanel.show()):(o.vpnClientView.serverListPanel.hide(),o.vpnClientView.deviceListPanel.hide())}},"models.vpnServerListModel.type":{ev_value_change:function(e,t,n){var s=i.vpnServerListModel;s.psk.hide(),s.encryption.hide(),s.server.hide(),s.psk.disable(),s.encryption.disable(),s.server.disable(),s.username.hide(),s.username.disable(),s.password.hide(),s.password.disable(),s.opvn_username.hide(),s.opvn_username.disable(),s.opvn_password.hide(),s.opvn_password.disable(),s.file.hide(),s.file.disable(),"pptpvpn"===t?(s.username.show(),s.username.enable(),s.password.show(),s.password.enable(),s.encryption.enable(),s.server.enable(),s.encryption.show(),s.server.show()):"l2tpvpn"===t?(s.username.show(),s.username.enable(),s.password.show(),s.password.enable(),s.psk.enable(),s.server.enable(),s.psk.show(),s.server.show()):"openvpn"===t&&(s.opvn_username.show(),s.opvn_username.enable(),s.opvn_password.show(),s.opvn_password.enable(),s.file.show(),s.file.enable())}},"stores.vpnClientGridStore":{ev_data_change:function(e,t,n){a.stopRefreshServerList();var s,i,r=d.vpnClientGridStore.checkDataChange().update;for(i in r)s=r[i].model.des;t.value!=t.oldValue&&"enable"==n.getName()&&(1==a.enabledFlag?(o.vpnClientView.changeVpnWarn.setText(c.su.CHAR.VPN_CLIENT.CHANGE_TIP.replace("%name%",s)),o.vpnClientView.otherVpnWarn.setText(c.su.CHAR.VPN_CLIENT.CHANGE_CLOSE_TIP.replace("%name%",a.oldVpnName)),o.vpnClientView.otherVpnWarn.show(),o.vpnClientView.vpnChangeWarnMsg.setButtonText("yes",c.su.CHAR.VPN_CLIENT.CHANGE)):(o.vpnClientView.changeVpnWarn.setText(c.su.CHAR.VPN_CLIENT.ENABLE_TIP.replace("%name%",s)),o.vpnClientView.otherVpnWarn.hide(),o.vpnClientView.vpnChangeWarnMsg.setButtonText("yes",c.su.CHAR.VPN_CLIENT.ENABLE)),o.vpnClientView.vpnChangeWarnMsg.show())},ev_store_data_load_success:function(e,t,n){}},"stores.deviceListGridStore":{ev_data_change:function(e,t,n){t.value!=t.oldValue&&"access"==n.getName()&&d.deviceListGridStore.sync()}}}),this.control({"#vpn-config-file":{ev_file_change:function(e,t){i.vpnServerListModel;var n=o.vpnClientView;i.vpnServerListModel.file.setTips(),i.vpnServerListModel.file.setNormal(),""!==t&&(!0===this.checkFileName(t,"ovpn")?(n.certProgressbar.show(),n.certProgressbar.reset(),n.certProgressbar.animate({percentageStart:0,percentageEnd:100,duration:5e3}),s.ajax.upload({proxy:"vpnClientUploadProxy",fileId:"vpn-config-file",timeout:5e3,success:function(){n.certProgressbar.setValue(100),setTimeout(function(){n.certProgressbar.hide(),i.vpnServerListModel.file.setTips(c.su.CHAR.VPN_CLIENT.UPLOAD_SUCCESS_TIPS),i.vpnServerListModel.file.setValue(t)},1e3)},fail:function(){n.certProgressbar.stop(),n.certProgressbar.hide(),i.vpnServerListModel.file.setError(c.su.CHAR.VPN_CLIENT.UPLOAD_FAIL_TIPS)},error:function(){n.certProgressbar.stop(),n.certProgressbar.hide(),i.vpnServerListModel.file.setError(c.su.CHAR.VPN_CLIENT.UPLOAD_FAIL_TIPS)}})):n.fileTypeMsg.show())}},"#grid-client":{ev_grid_before_edit:function(e,t){a.stopRefreshServerList(),i.vpnServerListModel.file.resetFile(),i.vpnServerListModel.file.setNormal(),i.vpnServerListModel.file.setTips("")}},"#grid-client_popEditor-msg":{ev_msg_close:function(){a.startRefreshServerList()}},"#grid-client-cancel-button":{ev_button_click:function(){a.startRefreshServerList()}},"#grid-client-save-button":{ev_button_click:function(){i.vpnServerListModel.validate()&&a.startRefreshServerList()}},"#device-client-add":{ev_button_click:function(){d.addDeviceListStore.load({success:function(){for(var e=d.addDeviceListStore.getData(),t=[],n=[],s=0;s<e.length;s++)("1"==e[s].online?t:n).push(e[s]);d.addOnlineListStore.loadData(t),d.addOfflineListStore.loadData(n),o.vpnClientView.gridDeviceList.show()}})}},"#grid-device-list":{},"#vpn-switch-on-msg":{ev_msg_ok:function(){d.vpnClientGridStore.sync({success:function(){a.startRefreshServerList()}})},ev_msg_no:function(){d.vpnClientGridStore.reset()}},"#grid-device-list => a.btn-delete":{ev_grid_action_click:function(e,t){var t=d.deviceListGridStore.getIndex(t),n=d.deviceListGridStore.getDataByIndex(t).name;a.currentDeviceIndex=t,o.vpnClientView.removeDeviceName.dom().find("div.paragraph-wrap-outer").text(c.su.CHAR.VPN_CLIENT.DEVICE_REMOVE_NAME.replace("%name%",n)),o.vpnClientView.deviceDelMsg.show()}},"#device-del-msg":{ev_msg_ok:function(){d.deviceListGridStore.removeDataByIndex(a.currentDeviceIndex),d.deviceListGridStore.sync()},ev_msg_no:function(){}},"#grid-client => a.btn-delete":{ev_grid_action_click:function(e,t){a.stopRefreshServerList();var t=d.vpnClientGridStore.getIndex(t),n=d.vpnClientGridStore.getDataByIndex(t).des;a.currentServerIndex=t,o.vpnClientView.deleteServerVpnTip.setText(c.su.CHAR.VPN_CLIENT.SERVER_DELETE_NAME.replace("%name%",n)),o.vpnClientView.serverVpnDelMsg.show()}},"#server-vpn-del-msg":{ev_msg_ok:function(){d.vpnClientGridStore.removeDataByIndex(a.currentServerIndex),d.vpnClientGridStore.sync({success:function(){a.startRefreshServerList()}})},ev_msg_no:function(){a.startRefreshServerList()}},"#grid-device-list-popEditor":{ev_msg_ok:function(){var e=[],t=d.addOnlineListStore.getSelectedStoreData(),n=d.addOfflineListStore.getSelectedStoreData(),e=e.concat(t,n);e=d.addDeviceListStore.storeSerialize(e),d.deviceListGridStore.load({data:{operation:"insert",list:JSON.stringify(e)}}),o.vpnClientView.gridDeviceList.hide()}}}),new c.su.widgets.toolTip({id:"conn",tipText:"xxxx"}).render()}},function(r,a,e,t,n,s){var i,r=this;return{checkFileName:function(e,t){return s.vtype.validate(e,{vtype:"string_file",extension:t})},startRefreshServerList:function(){clearInterval(i),i=s.timer.setInterval(r,function(){r.enabledFlag=!1,t.vpnClientGridStore.load({success:function(e,t){if(a.vpnClientView.serverListPanel.setInstruction(c.su.CHAR.VPN_CLIENT.SERVER_LIST_INTRO.replace("#No.#",t.others.maxRules)),c("#conn")!=undefined){for(var n,s,i=0;i<e.length;i++)"connected"==e[i].statusFlag&&(n=e[i].server,s=e[i].dns),"on"==e[i].enable&&(r.enabledFlag=!0,r.oldVpnName=e[i].des);t='<p class="vpn-status-tip"><label>'+c.su.CHAR.VPN_CLIENT.SERVER_IP+":</label><span>"+n+"</span></p>";t+='<p class="vpn-status-tip"><label>'+c.su.CHAR.VPN_CLIENT.DNS+":</label><span>"+s+"</span></p>",new c.su.widgets.toolTip({id:"conn",tipText:t}).render()}}})},2e3,!0)},stopRefreshServerList:function(){clearInterval(i)},beforeDestroy:function(){r.stopRefreshServerList()}}})}(jQuery);