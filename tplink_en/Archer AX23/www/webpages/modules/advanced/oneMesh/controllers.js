!function(r){r.su.moduleManager.define("oneMesh",{services:["ajax"],stores:["meshAvailableStore","deviceMeshStore","meshLocation","clientsList"],models:["meshEnableModel","meshDeviceEditModel","statusAll"],views:["oneMeshView"],deps:["main"],listeners:{"ev_on_launch":function(e,s,n,t,i,o,a){s.unRegisterAutoSaveData([t.meshEnableModel]),t.meshEnableModel.load()}},init:function(t,i,n,o,a,c){this.configViews({id:"oneMeshView",items:[{id:"grid-mesh-availableList",configs:[{type:"logo",dataIndex:"deviceType"},{type:"deviceName",dataIndex:"name",renderer:function(e,s){return s.model}},{type:"ip",dataIndex:"ip",renderer:function(e,s){return s.mac}},{type:"mac",dataIndex:"mac",renderer:function(e,s){s='<div class="container widget-container button-container" mac='+s.mac+">";return s+'<div class="widget-wrap-outer button-wrap-outer">'+'<div class="widget-wrap button-wrap">'+'<a href="javascript:void(0);" class="button-button" type="button" title="SAVE">'+'<span class="button-button-before"></span>'+('<span class="text button-text">'+r.su.CHAR.OPERATION.ADD_UPPERCASE+"</span>")+'<span class="icon button-loading"></span>'+'<span class="button-moire"></span>'+"</a>"+"</div>"+"</div>"}}]},{id:"grid-mesh-devicesList",configs:[{type:"logo",dataIndex:"deviceType"},{type:"deviceName",dataIndex:"name",renderer:function(e,s){var n="";return s.location?(n=s.location.toUpperCase(),e+" ("+(n=r.su.CHAR.ONE_MESH[n]||r.su.CHAR.ONE_MESH.OTHER)+")"):e+" "+n}},{type:"ip",dataIndex:"ip",renderer:function(e,s){return s.mac}},{type:"mac",dataIndex:"mac",renderer:function(e,s){var n,t='<div class="signal-level-container widget-container">';return"object"===r.type(s)&&(n=s.clientNum,t=(t+="<span class='icon icon-signal-"+s.signal+"'></span>")+'<div class="link">'+n+" "+r.su.CHAR.ONE_MESH.CLIENTS+"</div>"),t+="</div>"}}]},{id:"grid-mesh-clientsList",configs:{columns:[{text:r.su.CHAR.GRID.ID,xtype:"rownumberer",width:"10%"},{dataIndex:"name",width:"40%",text:r.su.CHAR.ONE_MESH.DEVICE_NAME},{dataIndex:"ip",text:r.su.CHAR.ONE_MESH.IP_ADDRESS+"/"+r.su.CHAR.ONE_MESH.MAC_ADDRESS,renderer:function(e,s){var n="";return(n+='<div class="mac">'+s.mac+"</div>")+('<div class="ip">'+s.ip+"</div>")}}]}}]}),this.listen({"stores.meshAvailableStore":{"ev_loaded":function(){0<o.meshAvailableStore.getData().length?(i.oneMeshView.meshAvailablePanel.setInstruction(o.meshAvailableStore.getData().length+" "+r.su.CHAR.ONE_MESH.AVAILABLE_ONE_MESH_DEVICES),i.oneMeshView.meshAvailablePanel.show()):i.oneMeshView.meshAvailablePanel.hide()}},"models.meshEnableModel":{"ev_loaded":function(e,s){var n;"on"==s.enable?(i.oneMeshView.meshDeviceView.show(),this.initPage()):(i.oneMeshView.meshDeviceView.hide(),i.oneMeshView.noMeshView.show(),r("#no-mesh-device-note").hide(),n=.4629*r(".onemesh-pic-container").width()+"px",r(".onemesh-bg-left").height(n),r(".onemesh-bg-right").height(n)),s.time&&(t.waitTime=s.time)}}}),this.control({"#mesh-enable":{"ev_view_will_change":function(e,s){s.preventDefault(),s="on"==n.meshEnableModel.enable.getValue()?r.su.CHAR.ONE_MESH.MESH_OFF_TEXT:r.su.CHAR.ONE_MESH.MESH_ON_TEXT,i.oneMeshView.meshEnableMsg.setContent(s),i.oneMeshView.meshEnableMsg.show()}},"#mesh-enable-msg":{"ev_msg_ok":function(e,s){"on"==n.meshEnableModel.enable.getValue()?n.meshEnableModel.enable.setValue("off"):n.meshEnableModel.enable.setValue("on"),n.meshEnableModel.submit({success:function(e,s){n.meshEnableModel.load({success:function(){i.oneMeshView.meshProbarMsg.show(function(){i.oneMeshView.meshProgress.animate({duration:1e3*t.waitTime,percentageStart:0,percentageEnd:100,callback:function(){i.oneMeshView.meshProbarMsg.hide()}})})}})}})}},"#grid-mesh-devicesList":{"ev_item_click":function(e,s){c.ajax.request({proxy:"meshInfoProxy",method:"read",data:{mac:s.mac},success:function(e){r(".devicesList-container .item-selected").removeClass("item-selected"),"l"==r.su.widgetSize||"xl"==r.su.widgetSize?(i.oneMeshView.meshInfo.show(),i.oneMeshView.meshClient.show()):(r(".tab-container .tab").removeClass("selected"),i.oneMeshView.meshInfo.hide(),i.oneMeshView.meshClient.hide(),r(".tab-container .tab:first-child").click()),r("#manage-device-link").attr("href","http://"+e.ip),i.oneMeshView.deviceMeshInfoMsg.setTitle(e.model),n.meshDeviceEditModel.loadData(e),i.oneMeshView.signal.setHtml('<div class="signal-level-container widget-container"><span class=\'icon icon-signal-'+e.signal_strength+"'></span></div>"),i.oneMeshView.go.setHtml("<a href='http://"+e.ip+"' class='link'>"+r.su.CHAR.ONE_MESH.MANAGE_DEVICE+"</a>"),i.oneMeshView.speed.setValue(t.convertSpeed(e.link_speed_24g)+" ("+r.su.CHAR.ONE_MESH.HZ_24G+") "+t.convertSpeed(e.link_speed_5g)+" ("+r.su.CHAR.ONE_MESH.HZ_5G+")"),o.clientsList.loadData(e.mesh_nclient_list),i.oneMeshView.deviceMeshInfoMsg.show()}})}},"#leave-device":{"ev_button_click":t.showRemoveConfirmMsg},"#leave-device-m":{"ev_button_click":t.showRemoveConfirmMsg},"#save-device-info":{"ev_button_click":function(){c.ajax.request({proxy:"meshInfoProxy",method:"write",data:n.meshDeviceEditModel.getData(),success:function(e){t.refreshDeviceList(),i.oneMeshView.deviceMeshInfoMsg.close()}})}},"#save-device-info-s":{"ev_button_click":function(){c.ajax.request({proxy:"meshInfoProxy",method:"write",data:n.meshDeviceEditModel.getData(),success:function(e){t.refreshDeviceList(),i.oneMeshView.deviceMeshInfoMsg.close()}})}},"#grid-mesh-availableList=>.button-container":{"click":function(e,s){setTimeout(function(){r(".devicesList-container .item-selected").removeClass("item-selected")},200),t.currentMAC=r(e.currentTarget).attr("mac"),i.oneMeshView.deviceMeshAddMsg.show()}},"#add-mesh-msg":{"ev_msg_ok":function(e,s){s.preventDefault(),t.showProgressMsg({text:r.su.CHAR.ONE_MESH.ADDING}),c.ajax.request({proxy:"meshManageProxy",method:"write",data:{operation:"link",mac:t.currentMAC},success:function(e){t.completeProgress(!0,function(){i.oneMeshView.deviceMeshAddMsg.close(),a.main.showNotice(r.su.CHAR.COMMON.SAVED)})},fail:t.completeProgress,error:t.completeProgress})}},"#mesh-msg":{"ev_msg_ok":t.showRemoveConfirmMsg},".tab-container .tab":{"click":function(e){r(".tab-container .tab").removeClass("selected"),i.oneMeshView.meshInfo.hide(),i.oneMeshView.meshClient.hide(),r(e.target).addClass("selected"),(r(e.target).hasClass("first")?i.oneMeshView.meshInfo:i.oneMeshView.meshClient).show()}}})}},function(n,t,i,o,a,e){var c="<h3 style='font-size:16px;margin-bottom:15px;'>"+r.su.CHAR.ONE_MESH.REMOVE_DEVICE+"</h3>";return c+=r.su.CHAR.ONE_MESH.LEAVE_ONEMESH_MSG_INTRODUCTION,{currentMAC:"",waitTime:1,initPage:function(){this.checkMesh(),i.statusAll.load({success:function(){var e=i.statusAll.getData(),s=e.wireless2gEnable,n=e.wireless5gEnable,e=e.wireless5g2Enable;"on"===s?t.oneMeshView.reconnect2g.show():t.oneMeshView.reconnect2g.hide(),"on"===n?t.oneMeshView.reconnect5g1.show():t.oneMeshView.reconnect5g1.hide(),"on"===e?t.oneMeshView.reconnect5g2.show():t.oneMeshView.reconnect5g2.hide()}})},checkMesh:function(){e.ajax.request({proxy:"meshTopoProxy",method:"read",success:function(e){var s=e;o.deviceMeshStore.load({data:{operation:"read"}}),o.meshAvailableStore.load({data:{operation:"read"},success:function(e){0<s.mesh_sclient_list.length||0<e.length?t.oneMeshView.noMeshView.hide():(t.oneMeshView.noMeshView.show(),r("#no-mesh-device-note").show(),e=.4629*r(".onemesh-pic-container").width()+"px",r(".onemesh-bg-left").height(e),r(".onemesh-bg-right").height(e))}})}})},refreshDeviceList:function(){o.deviceMeshStore.load({data:{operation:"read"}}),o.meshAvailableStore.load({data:{operation:"read"}})},convertSpeed:function(e){var s=r.su.CHAR.ONE_MESH.KBPS;return 1e3<=(e=e||0)&&(e/=1e3,s=r.su.CHAR.ONE_MESH.MBPS),""+parseInt(e,10)+s},showRemoveConfirmMsg:function(e,s){s&&s.preventDefault(),a.main.confirm(c.replace("%model%",i.meshDeviceEditModel.model.getValue()),n.confirmCallback,null,r.su.CHAR.OPERATION.REMOVE_UPPERCASE)},confirmCallback:function(){n.showProgressMsg({text:r.su.CHAR.ONE_MESH.REMOVING}),e.ajax.request({proxy:"meshManageProxy",method:"write",data:{operation:"unlink",mac:i.meshDeviceEditModel.mac.getValue()},success:function(){n.completeProgress(!0,function(){t.oneMeshView.deviceMeshInfoMsg.close(),a.main.showNotice(r.su.CHAR.COMMON.SAVED)})},fail:n.completeProgress,error:n.completeProgress})},completeProgress:function(e,s){e&&t.oneMeshView.meshProgress.setValue(100),setTimeout(function(){n.hideProgressMsg(),n.refreshDeviceList(),s&&s()},1150)},showProgressMsg:function(e){t.oneMeshView.meshProgressNote.setText(e.text),t.oneMeshView.meshProgressMsg.show(function(){t.oneMeshView.meshProgress.animate({duration:15e3,percentageStart:0,percentageEnd:100,callback:function(){n.hideProgressMsg(),n.refreshDeviceList(),a.main.showNotice(r.su.CHAR.COMMON.SAVED)}})})},hideProgressMsg:function(){t.oneMeshView.meshProgressMsg.hide(),t.oneMeshView.meshProgress.reset()}}})}(jQuery);