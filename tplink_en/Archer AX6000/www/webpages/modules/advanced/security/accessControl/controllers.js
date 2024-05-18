!function(S){S.su.moduleManager.define("accessControl",{models:["accessControl","addAccessControl","accessControlEnableM"],stores:["accessModeStore","blacklistGridStore","whitelistGridStore","addDeviceStore","blacklistOnlineStore","whitelistOnlineStore","portForwardingConnectedDevicesStore"],services:["ajax"],views:["accessControlView"],listeners:{ev_on_launch:function(e,t,a,s,n,o,c){s.accessControl.load(),s.accessControlEnableM.load()}},init:function(h,n,C,v,e,g){this.configViews({id:"accessControlView",items:[{id:"grid-blacklist",configs:{minLines:0,paging:{},columns:[{text:S.su.CHAR.ACCESS_CONTROL.DEVICE_NAME,dataIndex:"name",cls:"xl-hide l-hide"},{text:S.su.CHAR.ACCESS_CONTROL.DEVICE_TYPE,dataIndex:"deviceType",cls:"icon40 access-control-icon40",renderer:function(e,t){var a="",s="";switch(e=(e=e!==undefined&&null!==e?e:"pc").toLowerCase()){case"pc":a="icon-pc";break;case"phone":a="icon-phone";break;case"pad":a="icon-pad";break;case"camera":a="icon-camera";break;case"printer":a="icon-printer";break;case"other":a="icon-other";break;default:a="icon-"+e}return(s+='<div class="device-type-container widget-container">')+('<span class="icon '+a+' "></span>')+"</div>"}},{text:S.su.CHAR.ACCESS_CONTROL.DEVICE_NAME,dataIndex:"name",cls:"s-hide m-hide"},{text:S.su.CHAR.ACCESS_CONTROL.MAC_ADDRESS,dataIndex:"mac"},{xtype:"actioncolumn",text:S.su.CHAR.ACCESS_CONTROL.MODIFY,renderer:function(e,t){var a='<a href="javascript:void(0)" class="grid-content-btn grid-content-btn-delete btn-delete">';a+='<span class="icon"></span>';return'<a href="javascript:void(0)" class="grid-content-btn grid-content-btn-delete btn-delete"><span class="icon"></span><span class="text"></span></a>'}}]}},{id:"grid-whitelist",configs:{minLines:0,paging:{},columns:[{text:S.su.CHAR.ACCESS_CONTROL.DEVICE_NAME,dataIndex:"name",cls:"xl-hide l-hide"},{text:S.su.CHAR.ACCESS_CONTROL.DEVICE_TYPE,dataIndex:"deviceType",cls:"icon40 access-control-icon40",renderer:function(e,t){var a="",s="";switch(e=(e=e!==undefined&&null!==e?e:"pc").toLowerCase()){case"pc":a="icon-pc";break;case"phone":a="icon-phone";break;case"pad":a="icon-pad";break;case"camera":a="icon-camera";break;case"printer":a="icon-printer";break;case"other":a="icon-other";break;default:a="icon-"+e}return(s+='<div class="device-type-container widget-container">')+('<span class="icon '+a+' "></span>')+"</div>"}},{text:S.su.CHAR.ACCESS_CONTROL.DEVICE_NAME,dataIndex:"name",cls:"s-hide m-hide"},{text:S.su.CHAR.ACCESS_CONTROL.MAC_ADDRESS,dataIndex:"mac"},{xtype:"actioncolumn",text:S.su.CHAR.ACCESS_CONTROL.MODIFY,renderer:function(e,t){t='<a href="javascript:void(0)" class="grid-content-btn grid-content-btn-delete btn-delete '+("HOST"===t.host?"disabled":"")+'">';return(t+='<span class="icon"></span>')+'<span class="text"></span>'+"</a>"}}]}},{id:"grid-blacklist-online",host:{name:"host",setted:!0},configs:[{type:"logo",dataIndex:"deviceType"},{type:"deviceName",dataIndex:"name"},{type:"mac",dataIndex:"mac"},{type:"ip",dataIndex:"ipaddr"}]},{id:"grid-whitelist-online",host:{name:"host",setted:!0},configs:[{type:"logo",dataIndex:"deviceType"},{type:"deviceName",dataIndex:"name"},{type:"mac",dataIndex:"mac"},{type:"ip",dataIndex:"ipaddr"}]},{id:"add-blacklist-msg"},{id:"add-whitelist-msg"}]});var o="black";this.control({"#access-control-enable":{"ev_view_change":function(e,t){C.accessControlEnableM.submit()}},"#grid-blacklist":{"ev_grid_tbar_add":function(e,t){v.blacklistOnlineStore.load({success:function(e){e=h.convertDeviceStore(v.blacklistOnlineStore.getData()),v.blacklistOnlineStore.loadData(e),0===e.length||1===e.length&&"HOST"===e[0].host?n.accessControlView.addBlacklistMsg.disableButton("ok"):n.accessControlView.addBlacklistMsg.enableButton("ok"),n.accessControlView.addBlacklistMsg.setPosition("center","center")}}),n.accessControlView.addBlacklistMsg.show()}},"#grid-whitelist":{"ev_grid_tbar_add":function(e,t){C.addAccessControl.addDeviceMethod.setValue(0),v.whitelistOnlineStore.load({success:function(e){e=h.convertDeviceStore(v.whitelistOnlineStore.getData()),v.whitelistOnlineStore.loadData(e),0===C.addAccessControl.addDeviceMethod.getValue()&&(0===e.length||1===e.length&&"HOST"===e[0].host)?n.accessControlView.addWhitelistMsg.disableButton("ok"):n.accessControlView.addWhitelistMsg.enableButton("ok"),n.accessControlView.addWhitelistMsg.setPosition("center","center")}}),n.accessControlView.addWhitelistMsg.show()}},"#add-blacklist-msg":{"ev_msg_ok":function(e,t){var a=v.blacklistGridStore.getData(),s=v.blacklistOnlineStore,n=C.addAccessControl.addDeviceMethod.getValue();if(0===n)if(0===(d=s.getSelected()).length)t.preventDefault();else{(u={})["data"]=JSON.stringify(d),u["operation"]="block";for(var o=0;o<d.length;o++)u["index"]=o,u["key"]=d[o].key;g.ajax.request({data:u,url:S.su.url("/admin/access_control?form=black_devices"),success:function(e){v.blacklistGridStore.load({success:function(){var e=h.convertDeviceStore(v.blacklistGridStore.getData());v.blacklistGridStore.loadData(e)}})}})}else if(1===n){var c=C.addAccessControl.newMac.getValue(),i=v.blacklistOnlineStore.getData(),l=!1,r=!1;if(C.accessControl.validate()){for(var d={name:"",mac:c},o=0;o<a.length;o++)c==a[o].mac&&(l=!0);for(var u,o=0;o<i.length;o++)c==i[o].mac&&"HOST"==i[o].host&&(r=!0);l?(t.preventDefault(),C.addAccessControl.newMac.setError(S.su.CHAR.ERROR["00000051"])):r?(t.preventDefault(),C.addAccessControl.newMac.setError(S.su.CHAR.ERROR["00000064"])):((u={operation:"insert",key:"add",old:"add",index:0})["new"]=JSON.stringify(d),g.ajax.request({data:u,url:S.su.url("/admin/access_control?form=black_list"),success:function(e){v.blacklistGridStore.load({success:function(){var e=h.convertDeviceStore(v.blacklistGridStore.getData());v.blacklistGridStore.loadData(e)}}),C.addAccessControl.newMac.setValue()}}))}else t.preventDefault()}}},"#add-whitelist-msg":{"ev_msg_ok":function(e,t){var a,s=v.whitelistGridStore.getData(),n=v.whitelistOnlineStore,o=C.addAccessControl.addDeviceMethod.getValue();if(0===o)0===(a=n.getSelected()).length?t.preventDefault():((u={})["new"]=JSON.stringify(a[0]),u["operation"]="insert",u["old"]="add",u["key"]="add",u["index"]=a.length-1,g.ajax.request({data:u,url:S.su.url("/admin/access_control?form=white_list"),success:function(e){v.whitelistGridStore.load({success:function(){var e=h.convertDeviceStore(v.whitelistGridStore.getData());v.whitelistGridStore.loadData(e)}})}}));else if(1===o){var c=C.addAccessControl.newMac.getValue(),n=C.addAccessControl.name.getValue(),i=v.whitelistOnlineStore.getData(),l=!1,r=!1;if(C.accessControl.validate()&&C.addAccessControl.validate()){a={name:n,mac:c};for(var d=0;d<s.length;d++)c==s[d].mac&&(l=!0);for(var u,d=0;d<i.length;d++)c==i[d].mac&&"HOST"==i[d].host&&(r=!0);l?(t.preventDefault(),C.addAccessControl.newMac.setError(S.su.CHAR.ERROR["00000051"])):r?(t.preventDefault(),C.addAccessControl.newMac.setError(S.su.CHAR.ERROR["00000064"])):((u={operation:"insert",key:"add",index:0,old:"add"})["new"]=JSON.stringify(a),g.ajax.request({data:u,url:S.su.url("/admin/access_control?form=white_list"),success:function(e){v.whitelistGridStore.load({success:function(){var e=h.convertDeviceStore(v.whitelistGridStore.getData());v.whitelistGridStore.loadData(e)}}),C.addAccessControl.newMac.setValue(),C.addAccessControl.name.setValue()}}))}else t.preventDefault()}}},".index-common-save-btn":{"ev_will_auto_save":function(e,t){t.preventDefault();t={operation:"write"};t["access_mode"]=C.accessControl.accessMode.getValue(),g.ajax.request({url:S.su.url("/admin/access_control?form=mode"),data:t,success:function(e){C.accessControl.load()}})}}}),this.listen({"models.accessControlEnableM.enable":{"ev_value_change":function(e,t){"off"===t?n.accessControlView.accessControlContent.hide():n.accessControlView.accessControlContent.show()}},"models.accessControl.accessMode":{"ev_value_change":function(e,t){var a=t===o?"blacklistGridStore":"whitelistGridStore",s=t===o?"whitelistGridStore":"blacklistGridStore";v[a].load({success:function(){var e=h.convertDeviceStore(v[a].getData());v[a].loadData(e),v[a].show(),v[s].hide()}})}},"models.addAccessControl.addDeviceMethod":{"ev_value_change":function(e,t,a){var s;C.accessControl.accessMode.getValue();0===t?(s=v.whitelistOnlineStore.getData(),v.whitelistOnlineStore.show(),C.addAccessControl.newMac.hide(),C.addAccessControl.name.hide(),0===s.length||1===s.length&&"HOST"===s[0].host?n.accessControlView.addWhitelistMsg.disableButton("ok"):n.accessControlView.addWhitelistMsg.enableButton("ok")):1===t&&(v.whitelistOnlineStore.hide(),C.addAccessControl.newMac.show(),C.addAccessControl.name.show(),n.accessControlView.addWhitelistMsg.enableButton("ok"))}},"stores.whitelistOnlineStore":{"ev_loaded":function(e,t){for(var a=v.whitelistOnlineStore.getData(),s=0;s<a.length;s++)"HOST"==a[s].host&&v.whitelistOnlineStore.disable(a[s].key)}},"stores.blacklistOnlineStore":{"ev_loaded":function(e,t){for(var a=v.blacklistOnlineStore.getData(),s=0;s<a.length;s++)"HOST"==a[s].host&&v.blacklistOnlineStore.disable(a[s].key)}}})}},function(e,t,a,n,s,o){return{convertDeviceStore:function(e){var s=e.slice();return n.portForwardingConnectedDevicesStore.load({ajax:{"async":!1},success:function(e){for(var t=0;t<s.length;t++)for(var a=0;a<e.length;a++)s[t].mac===e[a].macAddress&&(s[t].deviceType=e[a].deviceType)}}),s}}})}(jQuery);