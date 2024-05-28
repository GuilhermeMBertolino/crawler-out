!function(l){l.su.moduleManager.define("wol",{models:[],stores:["wolDeviceListStore","wolConnectedDevicesListStore"],services:["ajax"],views:["wolAdvView"],listeners:{"ev_on_launch":function(e,t,n,i,a,o,c){this.unRegisterAutoSaveData([a.wolDeviceListStore]),a.wolDeviceListStore.load()}},init:function(e,i,t,d,n,a){this.configViews({id:"wolAdvView",items:[{id:"grid-wol-device-list",configs:{tbar:{add:{text:l.su.CHAR.OPERATION.ADD,index:0}},popEditor:{addTitle:l.su.CHAR.WOL.ADD_DEVICE,editTitle:l.su.CHAR.WOL.EDIT_DEVICE,content:"#grid-wol-device-editor",fields:[{name:"name"},{name:"mac"}]},paging:{},columns:[{text:l.su.CHAR.WOL.DEVICE_NAME,dataIndex:"name"},{text:l.su.CHAR.WOL.MAC_ADDRESS,dataIndex:"mac"},{xtype:"actioncolumn",text:l.su.CHAR.WOL.WAKE_UP_2,cls:"status grid-wol-wake-up-column",renderer:function(e,t){return'<a href="javascript:void(0)" class="grid-content-btn btn-wakeup"><span class="icon"></span><span class="text"></span></a>'}},{xtype:"actioncolumn",text:l.su.CHAR.GRID.MODIFY,renderer:function(e,t){var n='<a href="javascript:void(0)" class="grid-content-btn grid-content-btn-edit btn-edit">';n+='<span class="icon"></span>';return'<a href="javascript:void(0)" class="grid-content-btn grid-content-btn-edit btn-edit"><span class="icon"></span><span class="text"></span></a><a href="javascript:void(0)" class="grid-content-btn grid-content-btn-delete btn-delete"><span class="icon"></span><span class="text"></span></a>'}}]}},{id:"connected-wol-device-list",configs:[{type:"logo",dataIndex:"deviceType"},{type:"deviceName",dataIndex:"name"},{type:"mac",dataIndex:"mac"}]}]}),this.control({"#grid-wol-device-list => .btn-wakeup":{"ev_grid_action_click":function(e,t){t=d.wolDeviceListStore.getModelByKey(t).getData();a.ajax.request({url:l.su.url("/admin/wol?form=device"),data:{operation:"wakeup",data:JSON.stringify(t)}})}},"#connected-wol-device-button":{"ev_button_click":function(e){d.wolConnectedDevicesListStore.load(),i.wolAdvView.connectedDeviceMsg.show()}},"#connected-wol-device-list":{"ev_item_click":function(e,t){var n=d.wolDeviceListStore.getEditingModel();n.name.setValue(t.name),n.mac.setValue(t.mac),i.wolAdvView.connectedDeviceMsg.hide()}},"#grid-wol-device-list":{"ev_grid_before_save":function(e,t){for(var n=d.wolDeviceListStore.getEditingModel(),i=d.wolDeviceListStore.getData(),a=n.mac.getValue(),o=n.key.getValue(),c=0,s=i.length;c<s;c++)if(i[c].key!==o&&i[c].mac===a)return n.mac.setError(l.su.CHAR.ERROR["00000051"]),t.preventDefault(),!1;return!0}}}),this.listen({})}},function(e,t,n,i,a,o){return{}})}(jQuery);