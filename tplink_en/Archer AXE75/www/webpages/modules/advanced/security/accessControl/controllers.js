!function(S){S.su.moduleManager.define("accessControl",{models:["accessControl","addAccessControl","accessControlEnableM"],stores:["accessModeStore","blacklistGridStore","whitelistGridStore","addDeviceStore","blacklistOnlineStore","whitelistOnlineStore","portForwardingConnectedDevicesStore"],services:["ajax"],views:["accessControlView"],listeners:{ev_on_launch:function(e,t,a,s,n,o,i){s.accessControl.load(),s.accessControlEnableM.load()}},init:function(C,n,v,h,e,g){this.configViews({id:"accessControlView",items:[{id:"grid-blacklist",configs:{minLines:0,paging:{},columns:[{text:S.su.CHAR.ACCESS_CONTROL.DEVICE_NAME,dataIndex:"name",cls:"xl-hide l-hide"},{text:S.su.CHAR.ACCESS_CONTROL.DEVICE_TYPE,dataIndex:"deviceType",cls:"icon40 access-control-icon40",renderer:function(e,t){e!==undefined&&null!==e||(e="pc");var a="";return(a+='<div class="device-type-container widget-container">')+('<span class="icon '+S.su.getDeviceTypeIcon(e)+' "></span>')+"</div>"}},{text:S.su.CHAR.ACCESS_CONTROL.DEVICE_NAME,dataIndex:"name",cls:"s-hide m-hide"},{text:S.su.CHAR.ACCESS_CONTROL.MAC_ADDRESS,dataIndex:"mac"},{xtype:"actioncolumn",text:S.su.CHAR.ACCESS_CONTROL.MODIFY,renderer:function(e,t){var a='<a href="javascript:void(0)" class="grid-content-btn grid-content-btn-delete btn-delete">';a+='<span class="icon"></span>';return'<a href="javascript:void(0)" class="grid-content-btn grid-content-btn-delete btn-delete"><span class="icon"></span><span class="text"></span></a>'}}]}},{id:"grid-whitelist",configs:{minLines:0,paging:{},columns:[{text:S.su.CHAR.ACCESS_CONTROL.DEVICE_NAME,dataIndex:"name",cls:"xl-hide l-hide"},{text:S.su.CHAR.ACCESS_CONTROL.DEVICE_TYPE,dataIndex:"deviceType",cls:"icon40 access-control-icon40",renderer:function(e,t){e!==undefined&&null!==e||(e="pc");var a="";return(a+='<div class="device-type-container widget-container">')+('<span class="icon '+S.su.getDeviceTypeIcon(e)+' "></span>')+"</div>"}},{text:S.su.CHAR.ACCESS_CONTROL.DEVICE_NAME,dataIndex:"name",cls:"s-hide m-hide"},{text:S.su.CHAR.ACCESS_CONTROL.MAC_ADDRESS,dataIndex:"mac"},{xtype:"actioncolumn",text:S.su.CHAR.ACCESS_CONTROL.MODIFY,renderer:function(e,t){t='<a href="javascript:void(0)" class="grid-content-btn grid-content-btn-delete btn-delete '+("HOST"===t.host?"disabled":"")+'">';return(t+='<span class="icon"></span>')+'<span class="text"></span>'+"</a>"}}]}},{id:"grid-blacklist-online",host:{name:"host",setted:!0},configs:[{type:"logo",dataIndex:"deviceType"},{type:"deviceName",dataIndex:"name"},{type:"mac",dataIndex:"mac"},{type:"ip",dataIndex:"ipaddr"}]},{id:"grid-whitelist-online",host:{name:"host",setted:!0},configs:[{type:"logo",dataIndex:"deviceType"},{type:"deviceName",dataIndex:"name"},{type:"mac",dataIndex:"mac"},{type:"ip",dataIndex:"ipaddr"}]},{id:"add-blacklist-msg"},{id:"add-whitelist-msg"}]});var o="black";this.control({"#access-control-enable":{"ev_view_change":function(e,t){v.accessControlEnableM.submit()}},"#grid-blacklist":{"ev_grid_tbar_add":function(e,t){h.blacklistOnlineStore.load({success:function(e){e=C.convertDeviceStore(h.blacklistOnlineStore.getData()),h.blacklistOnlineStore.loadData(e),0===e.length||1===e.length&&"HOST"===e[0].host?n.accessControlView.addBlacklistMsg.disableButton("ok"):n.accessControlView.addBlacklistMsg.enableButton("ok"),n.accessControlView.addBlacklistMsg.setPosition("center","center")}}),n.accessControlView.addBlacklistMsg.show()}},"#grid-whitelist":{"ev_grid_tbar_add":function(e,t){v.addAccessControl.addDeviceMethod.setValue(0),h.whitelistOnlineStore.load({success:function(e){e=C.convertDeviceStore(h.whitelistOnlineStore.getData()),h.whitelistOnlineStore.loadData(e),0===v.addAccessControl.addDeviceMethod.getValue()&&(0===e.length||1===e.length&&"HOST"===e[0].host)?n.accessControlView.addWhitelistMsg.disableButton("ok"):n.accessControlView.addWhitelistMsg.enableButton("ok"),n.accessControlView.addWhitelistMsg.setPosition("center","center")}}),n.accessControlView.addWhitelistMsg.show()}},"#add-blacklist-msg":{"ev_msg_ok":function(e,t){var a=h.blacklistGridStore.getData(),s=h.blacklistOnlineStore,n=v.addAccessControl.addDeviceMethod.getValue();if(0===n)if(0===(r=s.getSelected()).length)t.preventDefault();else{(u={})["data"]=JSON.stringify(r),u["operation"]="block";for(var o=0;o<r.length;o++)u["index"]=o,u["key"]=r[o].key;g.ajax.request({data:u,url:S.su.url("/admin/access_control?form=black_devices"),success:function(e){h.blacklistGridStore.load({success:function(){var e=C.convertDeviceStore(h.blacklistGridStore.getData());h.blacklistGridStore.loadData(e)}})}})}else if(1===n){var i=v.addAccessControl.newMac.getValue(),c=h.blacklistOnlineStore.getData(),l=!1,d=!1;if(v.accessControl.validate()){for(var r={name:"",mac:i},o=0;o<a.length;o++)i==a[o].mac&&(l=!0);for(var u,o=0;o<c.length;o++)i==c[o].mac&&"HOST"==c[o].host&&(d=!0);l?(t.preventDefault(),v.addAccessControl.newMac.setError(S.su.CHAR.ERROR["00000051"])):d?(t.preventDefault(),v.addAccessControl.newMac.setError(S.su.CHAR.ERROR["00000064"])):((u={operation:"insert",key:"add",old:"add",index:0})["new"]=JSON.stringify(r),g.ajax.request({data:u,url:S.su.url("/admin/access_control?form=black_list"),success:function(e){h.blacklistGridStore.load({success:function(){var e=C.convertDeviceStore(h.blacklistGridStore.getData());h.blacklistGridStore.loadData(e)}}),v.addAccessControl.newMac.setValue()}}))}else t.preventDefault()}}},"#add-whitelist-msg":{"ev_msg_ok":function(e,t){var a,s=h.whitelistGridStore.getData(),n=h.whitelistOnlineStore,o=v.addAccessControl.addDeviceMethod.getValue();if(0===o)0===(a=n.getSelected()).length?t.preventDefault():((u={})["new"]=JSON.stringify(a[0]),u["operation"]="insert",u["old"]="add",u["key"]="add",u["index"]=a.length-1,g.ajax.request({data:u,url:S.su.url("/admin/access_control?form=white_list"),success:function(e){h.whitelistGridStore.load({success:function(){var e=C.convertDeviceStore(h.whitelistGridStore.getData());h.whitelistGridStore.loadData(e)}})}}));else if(1===o){var i=v.addAccessControl.newMac.getValue(),n=v.addAccessControl.name.getValue(),c=h.whitelistOnlineStore.getData(),l=!1,d=!1;if(v.accessControl.validate()&&v.addAccessControl.validate()){a={name:n,mac:i};for(var r=0;r<s.length;r++)i==s[r].mac&&(l=!0);for(var u,r=0;r<c.length;r++)i==c[r].mac&&"HOST"==c[r].host&&(d=!0);l?(t.preventDefault(),v.addAccessControl.newMac.setError(S.su.CHAR.ERROR["00000051"])):d?(t.preventDefault(),v.addAccessControl.newMac.setError(S.su.CHAR.ERROR["00000064"])):((u={operation:"insert",key:"add",index:0,old:"add"})["new"]=JSON.stringify(a),g.ajax.request({data:u,url:S.su.url("/admin/access_control?form=white_list"),success:function(e){h.whitelistGridStore.load({success:function(){var e=C.convertDeviceStore(h.whitelistGridStore.getData());h.whitelistGridStore.loadData(e)}}),v.addAccessControl.newMac.setValue(),v.addAccessControl.name.setValue()}}))}else t.preventDefault()}}},".index-common-save-btn":{"ev_will_auto_save":function(e,t){t.preventDefault();t={operation:"write"};t["access_mode"]=v.accessControl.accessMode.getValue(),g.ajax.request({url:S.su.url("/admin/access_control?form=mode"),data:t,success:function(e){v.accessControl.load()}})}}}),this.listen({"models.accessControlEnableM.enable":{"ev_value_change":function(e,t){"off"===t?n.accessControlView.accessControlContent.hide():n.accessControlView.accessControlContent.show()}},"models.accessControl.accessMode":{"ev_value_change":function(e,t){var a=t===o?"blacklistGridStore":"whitelistGridStore",s=t===o?"whitelistGridStore":"blacklistGridStore";h[a].load({success:function(){var e=C.convertDeviceStore(h[a].getData());h[a].loadData(e),h[a].show(),h[s].hide()}})}},"models.addAccessControl.addDeviceMethod":{"ev_value_change":function(e,t,a){var s;v.accessControl.accessMode.getValue();0===t?(s=h.whitelistOnlineStore.getData(),h.whitelistOnlineStore.show(),v.addAccessControl.newMac.hide(),v.addAccessControl.name.hide(),0===s.length||1===s.length&&"HOST"===s[0].host?n.accessControlView.addWhitelistMsg.disableButton("ok"):n.accessControlView.addWhitelistMsg.enableButton("ok")):1===t&&(h.whitelistOnlineStore.hide(),v.addAccessControl.newMac.show(),v.addAccessControl.name.show(),n.accessControlView.addWhitelistMsg.enableButton("ok"))}},"stores.whitelistOnlineStore":{"ev_loaded":function(e,t){for(var a=h.whitelistOnlineStore.getData(),s=0;s<a.length;s++)"HOST"==a[s].host&&h.whitelistOnlineStore.disable(a[s].key)}},"stores.blacklistOnlineStore":{"ev_loaded":function(e,t){for(var a=h.blacklistOnlineStore.getData(),s=0;s<a.length;s++)"HOST"==a[s].host&&h.blacklistOnlineStore.disable(a[s].key)}}})}},function(e,t,a,n,s,o){return{convertDeviceStore:function(e){var s=e.slice();return n.portForwardingConnectedDevicesStore.load({ajax:{"async":!1},success:function(e){for(var t=0;t<s.length;t++)for(var a=0;a<e.length;a++)s[t].mac===e[a].macAddress&&(s[t].deviceType=e[a].deviceType)}}),s}}})}(jQuery);